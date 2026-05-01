'use strict';

var catalogModel = require('@backstage/catalog-model');
var qs = require('qs');
var constants = require('./constants.cjs.js');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var qs__default = /*#__PURE__*/_interopDefaultCompat(qs);

const DEFAULT_PROXY_PATH = "/rootly/api";
class RootlyApi {
  apiProxyUrl;
  apiProxyPath;
  apiToken;
  apiHost;
  constructor(opts) {
    this.apiProxyUrl = opts.apiProxyUrl;
    this.apiProxyPath = opts.apiProxyPath ?? DEFAULT_PROXY_PATH;
    this.apiToken = opts.apiToken;
    this.apiHost = opts.apiHost ?? "https://rootly.com";
  }
  removeEmptyAttributes(obj) {
    if (typeof obj !== "object" || obj === null) {
      return obj;
    }
    if (Array.isArray(obj)) {
      return obj.map(this.removeEmptyAttributes);
    }
    return Object.fromEntries(
      Object.entries(obj).filter(
        ([_, value]) => value !== "" && value !== null && value !== void 0
      ).map(([key, value]) => [key, this.removeEmptyAttributes(value)])
    );
  }
  async fetch(input, init) {
    const authedInit = await this.addAuthHeaders(init || {});
    const resp = await fetch(
      `${await this.apiProxyUrl}${this.apiProxyPath}${input}`,
      authedInit
    );
    if (!resp.ok) {
      throw new Error(`Request failed with ${resp.status} ${resp.statusText}`, {
        cause: { status: resp.status, statusText: resp.statusText }
      });
    }
    return await resp.json();
  }
  async call(input, init) {
    const authedInit = await this.addAuthHeaders(init || {});
    const resp = await fetch(
      `${await this.apiProxyUrl}${this.apiProxyPath}${input}`,
      authedInit
    );
    if (!resp.ok)
      throw new Error(
        `Request failed with ${resp.status}: ${resp.statusText}`,
        { cause: { status: resp.status, statusText: resp.statusText } }
      );
  }
  async addAuthHeaders(init) {
    const headers = init.headers || {};
    const { token } = await this.apiToken;
    return {
      ...init,
      headers: {
        ...headers,
        ...token ? { Authorization: `Bearer ${token}` } : {}
      }
    };
  }
  async getService(id_or_slug) {
    const init = { headers: { "Content-Type": "application/vnd.api+json" } };
    const response = await this.fetch(
      `/v1/services/${id_or_slug}`,
      init
    );
    return response;
  }
  async getServices(opts) {
    const init = { headers: { "Content-Type": "application/vnd.api+json" } };
    const params = qs__default.default.stringify(this.removeEmptyAttributes(opts), { encode: false });
    const response = await this.fetch(
      `/v1/services?${params}`,
      init
    );
    return response;
  }
  async getFunctionality(id_or_slug) {
    const init = { headers: { "Content-Type": "application/vnd.api+json" } };
    const response = await this.fetch(
      `/v1/functionalities/${id_or_slug}`,
      init
    );
    return response;
  }
  async getFunctionalities(opts) {
    const init = { headers: { "Content-Type": "application/vnd.api+json" } };
    const params = qs__default.default.stringify(this.removeEmptyAttributes(opts), { encode: false });
    const response = await this.fetch(
      `/v1/functionalities?${params}`,
      init
    );
    return response;
  }
  async getTeam(id_or_slug) {
    const init = { headers: { "Content-Type": "application/vnd.api+json" } };
    const response = await this.fetch(
      `/v1/teams/${id_or_slug}`,
      init
    );
    return response;
  }
  async getTeams(opts) {
    const init = { headers: { "Content-Type": "application/vnd.api+json" } };
    const params = qs__default.default.stringify(this.removeEmptyAttributes(opts), { encode: false });
    const response = await this.fetch(
      `/v1/teams?${params}`,
      init
    );
    return response;
  }
  async getIncidents(opts) {
    const init = { headers: { "Content-Type": "application/vnd.api+json" } };
    const params = qs__default.default.stringify(this.removeEmptyAttributes(opts), { encode: false });
    const response = await this.fetch(
      `/v1/incidents?${params}`,
      init
    );
    return response;
  }
  async getServiceIncidentsChart(service, opts) {
    const init = { headers: { "Content-Type": "application/vnd.api+json" } };
    const params = qs__default.default.stringify(this.removeEmptyAttributes(opts), { encode: false });
    const response = await this.fetch(
      `/v1/services/${service.id}/incidents_chart?${params}`,
      init
    );
    return response;
  }
  async getFunctionalityIncidentsChart(functionality, opts) {
    const init = { headers: { "Content-Type": "application/vnd.api+json" } };
    const params = qs__default.default.stringify(this.removeEmptyAttributes(opts), { encode: false });
    const response = await this.fetch(
      `/v1/functionalities/${functionality.id}/incidents_chart?${params}`,
      init
    );
    return response;
  }
  async getTeamIncidentsChart(team, opts) {
    const init = { headers: { "Content-Type": "application/vnd.api+json" } };
    const params = qs__default.default.stringify(this.removeEmptyAttributes(opts), { encode: false });
    const response = await this.fetch(
      `/v1/teams/${team.id}/incidents_chart?${params}`,
      init
    );
    return response;
  }
  // Resolves the Rootly team ID from the entity's spec.owner by name.
  async resolveOwnerGroupIds(entity) {
    const owner = entity.spec?.owner;
    if (!owner) return [];
    const name = owner.includes("/") ? owner.split("/").pop() : owner;
    if (!name) return [];
    try {
      const teamsResponse = await this.getTeams({ filter: { name } });
      if (teamsResponse.data?.length > 0) return [teamsResponse.data[0].id];
    } catch (_e) {
    }
    return [];
  }
  async importServiceEntity(entity) {
    const entityTriplet = catalogModel.stringifyEntityRef({
      namespace: entity.metadata.namespace,
      kind: entity.kind,
      name: entity.metadata.name
    });
    const ownerGroupIds = await this.resolveOwnerGroupIds(entity);
    const init = {
      method: "POST",
      headers: { "Content-Type": "application/vnd.api+json" },
      body: JSON.stringify({
        data: {
          type: "services",
          attributes: {
            name: entity.metadata.annotations?.[constants.ROOTLY_ANNOTATION_SERVICE_NAME] || entity.metadata.name,
            description: entity.metadata.description,
            backstage_id: entityTriplet,
            pagerduty_id: entity.metadata.annotations?.["pagerduty.com/service-id"],
            owner_group_ids: ownerGroupIds.length > 0 ? ownerGroupIds : void 0
          }
        }
      })
    };
    const response = await this.fetch(`/v1/services`, init);
    return response;
  }
  async updateServiceEntity(entity, service, old_service) {
    const entityTriplet = catalogModel.stringifyEntityRef({
      namespace: entity.metadata.namespace,
      kind: entity.kind,
      name: entity.metadata.name
    });
    if (old_service?.id) {
      const init1 = {
        method: "PUT",
        headers: { "Content-Type": "application/vnd.api+json" },
        body: JSON.stringify({
          data: {
            type: "services",
            attributes: {
              backstage_id: null
            }
          }
        })
      };
      await this.call(`/v1/services/${old_service.id}`, init1);
    }
    const ownerGroupIds = await this.resolveOwnerGroupIds(entity);
    const init2 = {
      method: "PUT",
      headers: { "Content-Type": "application/vnd.api+json" },
      body: JSON.stringify({
        data: {
          type: "services",
          attributes: {
            name: entity.metadata.annotations?.[constants.ROOTLY_ANNOTATION_SERVICE_NAME] || entity.metadata.name,
            description: entity.metadata.description,
            backstage_id: entityTriplet,
            pagerduty_id: entity.metadata.annotations?.["pagerduty.com/service-id"],
            owner_group_ids: ownerGroupIds.length > 0 ? ownerGroupIds : void 0
          }
        }
      })
    };
    const response = await this.fetch(
      `/v1/services/${service.id}`,
      init2
    );
    return response;
  }
  async deleteServiceEntity(service) {
    const init = {
      method: "PUT",
      headers: { "Content-Type": "application/vnd.api+json" },
      body: JSON.stringify({
        data: {
          type: "services",
          attributes: {
            backstage_id: null
          }
        }
      })
    };
    await this.call(`/v1/services/${service.id}`, init);
  }
  async importFunctionalityEntity(entity) {
    const entityTriplet = catalogModel.stringifyEntityRef({
      namespace: entity.metadata.namespace,
      kind: entity.kind,
      name: entity.metadata.name
    });
    const init = {
      method: "POST",
      headers: { "Content-Type": "application/vnd.api+json" },
      body: JSON.stringify({
        data: {
          type: "functionalities",
          attributes: {
            name: entity.metadata.annotations?.[constants.ROOTLY_ANNOTATION_FUNCTIONALITY_NAME] || entity.metadata.name,
            description: entity.metadata.description,
            backstage_id: entityTriplet,
            pagerduty_id: entity.metadata.annotations?.["pagerduty.com/service-id"]
          }
        }
      })
    };
    const response = await this.fetch(
      `/v1/functionalities`,
      init
    );
    return response;
  }
  async updateFunctionalityEntity(entity, functionality, old_functionality) {
    const entityTriplet = catalogModel.stringifyEntityRef({
      namespace: entity.metadata.namespace,
      kind: entity.kind,
      name: entity.metadata.name
    });
    if (old_functionality?.id) {
      const init1 = {
        method: "PUT",
        headers: { "Content-Type": "application/vnd.api+json" },
        body: JSON.stringify({
          data: {
            type: "functionalities",
            attributes: {
              backstage_id: null
            }
          }
        })
      };
      await this.call(`/v1/functionalities/${old_functionality.id}`, init1);
    }
    const init2 = {
      method: "PUT",
      headers: { "Content-Type": "application/vnd.api+json" },
      body: JSON.stringify({
        data: {
          type: "functionalities",
          attributes: {
            name: entity.metadata.annotations?.[constants.ROOTLY_ANNOTATION_FUNCTIONALITY_NAME] || entity.metadata.name,
            description: entity.metadata.description,
            backstage_id: entityTriplet,
            pagerduty_id: entity.metadata.annotations?.["pagerduty.com/service-id"]
          }
        }
      })
    };
    const response = await this.fetch(
      `/v1/functionalities/${functionality.id}`,
      init2
    );
    return response;
  }
  async deleteFunctionalityEntity(functionality) {
    const init = {
      method: "PUT",
      headers: { "Content-Type": "application/vnd.api+json" },
      body: JSON.stringify({
        data: {
          type: "functionalities",
          attributes: {
            backstage_id: null
          }
        }
      })
    };
    await this.call(`/v1/functionalities/${functionality.id}`, init);
  }
  async importTeamEntity(entity) {
    const entityTriplet = catalogModel.stringifyEntityRef({
      namespace: entity.metadata.namespace,
      kind: entity.kind,
      name: entity.metadata.name
    });
    const init = {
      method: "POST",
      headers: { "Content-Type": "application/vnd.api+json" },
      body: JSON.stringify({
        data: {
          type: "teams",
          attributes: {
            name: entity.metadata.annotations?.[constants.ROOTLY_ANNOTATION_TEAM_NAME] || entity.metadata.name,
            description: entity.metadata.description,
            backstage_id: entityTriplet,
            pagerduty_id: entity.metadata.annotations?.["pagerduty.com/service-id"]
          }
        }
      })
    };
    const response = await this.fetch(`/v1/teams`, init);
    return response;
  }
  async updateTeamEntity(entity, team, old_team) {
    const entityTriplet = catalogModel.stringifyEntityRef({
      namespace: entity.metadata.namespace,
      kind: entity.kind,
      name: entity.metadata.name
    });
    if (old_team?.id) {
      const init1 = {
        method: "PUT",
        headers: { "Content-Type": "application/vnd.api+json" },
        body: JSON.stringify({
          data: {
            type: "teams",
            attributes: {
              backstage_id: null
            }
          }
        })
      };
      await this.call(`/v1/teams/${old_team.id}`, init1);
    }
    const init2 = {
      method: "PUT",
      headers: { "Content-Type": "application/vnd.api+json" },
      body: JSON.stringify({
        data: {
          type: "teams",
          attributes: {
            name: entity.metadata.annotations?.[constants.ROOTLY_ANNOTATION_TEAM_NAME] || entity.metadata.name,
            description: entity.metadata.description,
            backstage_id: entityTriplet,
            pagerduty_id: entity.metadata.annotations?.["pagerduty.com/service-id"]
          }
        }
      })
    };
    const response = await this.fetch(
      `/v1/teams/${team.id}`,
      init2
    );
    return response;
  }
  async deleteTeamEntity(team) {
    const init = {
      method: "PUT",
      headers: { "Content-Type": "application/vnd.api+json" },
      body: JSON.stringify({
        data: {
          type: "teams",
          attributes: {
            backstage_id: null
          }
        }
      })
    };
    await this.call(`/v1/teams/${team.id}`, init);
  }
  async getCatalogs(opts) {
    const init = { headers: { "Content-Type": "application/vnd.api+json" } };
    const params = qs__default.default.stringify(this.removeEmptyAttributes(opts), { encode: false });
    const response = await this.fetch(
      `/v1/catalogs?${params}`,
      init
    );
    return response;
  }
  async findOrCreateCatalog(nameOrSlug, description) {
    const init = { headers: { "Content-Type": "application/vnd.api+json" } };
    const params = qs__default.default.stringify({ filter: { slug: nameOrSlug } }, { encode: false });
    const listResponse = await this.fetch(
      `/v1/catalogs?${params}`,
      init
    );
    if (listResponse.data && listResponse.data.length > 0) {
      return { data: listResponse.data[0] };
    }
    try {
      const createInit = {
        method: "POST",
        headers: { "Content-Type": "application/vnd.api+json" },
        body: JSON.stringify({
          data: {
            type: "catalogs",
            attributes: {
              name: nameOrSlug,
              description
            }
          }
        })
      };
      const response = await this.fetch(
        `/v1/catalogs`,
        createInit
      );
      return response;
    } catch (_) {
      const retryResponse = await this.fetch(
        `/v1/catalogs?${params}`,
        init
      );
      if (retryResponse.data && retryResponse.data.length > 0) {
        return { data: retryResponse.data[0] };
      }
      throw new Error(`Catalog '${nameOrSlug}' not found and could not be created`);
    }
  }
  async getCatalogEntity(id_or_slug) {
    const init = { headers: { "Content-Type": "application/vnd.api+json" } };
    const response = await this.fetch(
      `/v1/catalog_entities/${id_or_slug}`,
      init
    );
    return response;
  }
  async getCatalogEntities(catalog_id, opts) {
    const init = { headers: { "Content-Type": "application/vnd.api+json" } };
    const params = qs__default.default.stringify(this.removeEmptyAttributes(opts), { encode: false });
    const response = await this.fetch(
      `/v1/catalogs/${catalog_id}/entities?${params}`,
      init
    );
    return response;
  }
  async importCatalogEntityEntity(entity, catalogId) {
    const entityTriplet = catalogModel.stringifyEntityRef({
      namespace: entity.metadata.namespace,
      kind: entity.kind,
      name: entity.metadata.name
    });
    const init = {
      method: "POST",
      headers: { "Content-Type": "application/vnd.api+json" },
      body: JSON.stringify({
        data: {
          type: "catalog_entities",
          attributes: {
            name: entity.metadata.annotations?.[constants.ROOTLY_ANNOTATION_CATALOG_ENTITY_NAME] || entity.metadata.name,
            description: entity.metadata.description,
            backstage_id: entityTriplet
          }
        }
      })
    };
    const response = await this.fetch(
      `/v1/catalogs/${catalogId}/entities`,
      init
    );
    return response;
  }
  async updateCatalogEntityEntity(entity, catalogEntity, old_catalogEntity) {
    const entityTriplet = catalogModel.stringifyEntityRef({
      namespace: entity.metadata.namespace,
      kind: entity.kind,
      name: entity.metadata.name
    });
    if (old_catalogEntity?.id) {
      const init1 = {
        method: "PUT",
        headers: { "Content-Type": "application/vnd.api+json" },
        body: JSON.stringify({
          data: {
            type: "catalog_entities",
            attributes: {
              backstage_id: null
            }
          }
        })
      };
      await this.call(`/v1/catalog_entities/${old_catalogEntity.id}`, init1);
    }
    const init2 = {
      method: "PUT",
      headers: { "Content-Type": "application/vnd.api+json" },
      body: JSON.stringify({
        data: {
          type: "catalog_entities",
          attributes: {
            name: entity.metadata.annotations?.[constants.ROOTLY_ANNOTATION_CATALOG_ENTITY_NAME] || entity.metadata.name,
            description: entity.metadata.description,
            backstage_id: entityTriplet
          }
        }
      })
    };
    const response = await this.fetch(
      `/v1/catalog_entities/${catalogEntity.id}`,
      init2
    );
    return response;
  }
  async deleteCatalogEntityEntity(catalogEntity) {
    const init = {
      method: "PUT",
      headers: { "Content-Type": "application/vnd.api+json" },
      body: JSON.stringify({
        data: {
          type: "catalog_entities",
          attributes: {
            backstage_id: null
          }
        }
      })
    };
    await this.call(`/v1/catalog_entities/${catalogEntity.id}`, init);
  }
  getCreateIncidentURL() {
    return `${this.apiHost}/account/incidents/new`;
  }
  getListIncidents() {
    return `${this.apiHost}/account/incidents`;
  }
  getListIncidentsForServiceURL(service) {
    const params = qs__default.default.stringify(
      { filter: { filters: ["services"], services: [service.id] } },
      { arrayFormat: "brackets" }
    );
    return `${this.apiHost}/account/incidents?${params}`;
  }
  getListIncidentsForFunctionalityURL(functionality) {
    const params = qs__default.default.stringify(
      { filter: { filters: ["functionalities"], groups: [functionality.id] } },
      { arrayFormat: "brackets" }
    );
    return `${this.apiHost}/account/incidents?${params}`;
  }
  getListIncidentsForTeamURL(team) {
    const params = qs__default.default.stringify(
      { filter: { filters: ["groups"], groups: [team.id] } },
      { arrayFormat: "brackets" }
    );
    return `${this.apiHost}/account/incidents?${params}`;
  }
  getServiceDetailsURL(service) {
    return `${this.apiHost}/account/services/${service.attributes.slug}`;
  }
  getFunctionalityDetailsURL(functionality) {
    return `${this.apiHost}/account/functionalities/${functionality.attributes.slug}`;
  }
  getTeamDetailsURL(team) {
    return `${this.apiHost}/account/teams/${team.attributes.slug}`;
  }
  getCatalogEntityDetailsURL(catalogEntity, catalogSlug) {
    if (catalogSlug) {
      return `${this.apiHost}/account/catalogs/${catalogSlug}/entities/${catalogEntity.attributes.slug}`;
    }
    return `${this.apiHost}/account/catalogs`;
  }
}

exports.RootlyApi = RootlyApi;
//# sourceMappingURL=api.cjs.js.map
