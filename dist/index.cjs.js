'use strict';

var catalogModel = require('@backstage/catalog-model');
var qs = require('qs');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var qs__default = /*#__PURE__*/_interopDefaultCompat(qs);

const ROOTLY_ANNOTATION_ORG_ID = "rootly.com/organization-id";
const ROOTLY_ANNOTATION_SERVICE_ID = "rootly.com/service-id";
const ROOTLY_ANNOTATION_SERVICE_SLUG = "rootly.com/service-slug";
const ROOTLY_ANNOTATION_SERVICE_AUTO_IMPORT = "rootly.com/service-auto-import";
const ROOTLY_ANNOTATION_FUNCTIONALITY_ID = "rootly.com/functionality-id";
const ROOTLY_ANNOTATION_FUNCTIONALITY_SLUG = "rootly.com/functionality-slug";
const ROOTLY_ANNOTATION_FUNCTIONALITY_AUTO_IMPORT = "rootly.com/functionality-auto-import";
const ROOTLY_ANNOTATION_TEAM_ID = "rootly.com/team-id";
const ROOTLY_ANNOTATION_TEAM_SLUG = "rootly.com/team-slug";
const ROOTLY_ANNOTATION_TEAM_AUTO_IMPORT = "rootly.com/team-auto-import";

class RootlyApi {
  apiProxyPath;
  apiToken;
  constructor(opts) {
    this.apiProxyPath = opts.apiProxyPath;
    this.apiToken = opts.apiToken;
  }
  async fetch(input, init) {
    const apiUrl = await this.apiProxyPath;
    const authedInit = await this.addAuthHeaders(init || {});
    const rootlyEndpoint = "/rootly/api";
    const resp = await fetch(`${apiUrl}${rootlyEndpoint}${input}`, authedInit);
    if (!resp.ok) {
      throw new Error(`Request failed with ${resp.status} ${resp.statusText}`, { cause: { status: resp.status, statusText: resp.statusText } });
    }
    return await resp.json();
  }
  async call(input, init) {
    const apiUrl = await this.apiProxyPath;
    const authedInit = await this.addAuthHeaders(init || {});
    const rootlyEndpoint = "/rootly/api";
    const resp = await fetch(`${apiUrl}${rootlyEndpoint}${input}`, authedInit);
    if (!resp.ok)
      throw new Error(`Request failed with ${resp.status}: ${resp.statusText}`, { cause: { status: resp.status, statusText: resp.statusText } });
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
    const params = qs__default.default.stringify(opts, { encode: false });
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
    const params = qs__default.default.stringify(opts, { encode: false });
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
    const params = qs__default.default.stringify(opts, { encode: false });
    const response = await this.fetch(
      `/v1/teams?${params}`,
      init
    );
    return response;
  }
  async getIncidents(opts) {
    const init = { headers: { "Content-Type": "application/vnd.api+json" } };
    const params = qs__default.default.stringify(opts, { encode: false });
    const response = await this.fetch(
      `/v1/incidents?${params}`,
      init
    );
    return response;
  }
  async getServiceIncidentsChart(service, opts) {
    const init = { headers: { "Content-Type": "application/vnd.api+json" } };
    const params = qs__default.default.stringify(opts, { encode: false });
    const response = await this.fetch(
      `/v1/services/${service.id}/incidents_chart?${params}`,
      init
    );
    return response;
  }
  async getFunctionalityIncidentsChart(functionality, opts) {
    const init = { headers: { "Content-Type": "application/vnd.api+json" } };
    const params = qs__default.default.stringify(opts, { encode: false });
    const response = await this.fetch(
      `/v1/functionalities/${functionality.id}/incidents_chart?${params}`,
      init
    );
    return response;
  }
  async getTeamIncidentsChart(team, opts) {
    const init = { headers: { "Content-Type": "application/vnd.api+json" } };
    const params = qs__default.default.stringify(opts, { encode: false });
    const response = await this.fetch(
      `/v1/teams/${team.id}/incidents_chart?${params}`,
      init
    );
    return response;
  }
  async importServiceEntity(entity) {
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
          type: "services",
          attributes: {
            name: entity.metadata.name,
            description: entity.metadata.description,
            backstage_id: entityTriplet,
            pagerduty_id: entity.metadata.annotations?.["pagerduty.com/service-id"]
          }
        }
      })
    };
    const response = this.fetch(`/v1/services`, init);
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
    const init2 = {
      method: "PUT",
      headers: { "Content-Type": "application/vnd.api+json" },
      body: JSON.stringify({
        data: {
          type: "services",
          attributes: {
            name: entity.metadata.name,
            description: entity.metadata.description,
            backstage_id: entityTriplet,
            pagerduty_id: entity.metadata.annotations?.["pagerduty.com/service-id"]
          }
        }
      })
    };
    const response = this.fetch(`/v1/services/${service.id}`, init2);
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
            name: entity.metadata.name,
            description: entity.metadata.description,
            backstage_id: entityTriplet,
            pagerduty_id: entity.metadata.annotations?.["pagerduty.com/service-id"]
          }
        }
      })
    };
    const response = this.fetch(`/v1/functionalities`, init);
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
            name: entity.metadata.name,
            description: entity.metadata.description,
            backstage_id: entityTriplet,
            pagerduty_id: entity.metadata.annotations?.["pagerduty.com/service-id"]
          }
        }
      })
    };
    const response = this.fetch(`/v1/functionalities/${functionality.id}`, init2);
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
            name: entity.metadata.name,
            description: entity.metadata.description,
            backstage_id: entityTriplet,
            pagerduty_id: entity.metadata.annotations?.["pagerduty.com/service-id"]
          }
        }
      })
    };
    const response = this.fetch(`/v1/teams`, init);
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
            name: entity.metadata.name,
            description: entity.metadata.description,
            backstage_id: entityTriplet,
            pagerduty_id: entity.metadata.annotations?.["pagerduty.com/service-id"]
          }
        }
      })
    };
    const response = this.fetch(`/v1/teams/${team.id}`, init2);
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
  static getCreateIncidentURL() {
    return `https://rootly.com/account/incidents/new`;
  }
  static getListIncidents() {
    return `https://rootly.com/account/incidents`;
  }
  static getListIncidentsForServiceURL(service) {
    const params = qs__default.default.stringify(
      { filter: { filters: ["services"], services: [service.id] } },
      { arrayFormat: "brackets" }
    );
    return `https://rootly.com/account/incidents?${params}`;
  }
  static getListIncidentsForFunctionalityURL(functionality) {
    const params = qs__default.default.stringify(
      { filter: { filters: ["functionalities"], groups: [functionality.id] } },
      { arrayFormat: "brackets" }
    );
    return `https://rootly.com/account/incidents?${params}`;
  }
  static getListIncidentsForTeamURL(team) {
    const params = qs__default.default.stringify(
      { filter: { filters: ["groups"], groups: [team.id] } },
      { arrayFormat: "brackets" }
    );
    return `https://rootly.com/account/incidents?${params}`;
  }
  static getServiceDetailsURL(service) {
    return `https://rootly.com/account/services/${service.attributes.slug}`;
  }
  static getFunctionalityDetailsURL(functionality) {
    return `https://rootly.com/account/functionalities/${functionality.attributes.slug}`;
  }
  static getTeamDetailsURL(team) {
    return `https://rootly.com/account/teams/${team.attributes.slug}`;
  }
}

exports.ROOTLY_ANNOTATION_FUNCTIONALITY_AUTO_IMPORT = ROOTLY_ANNOTATION_FUNCTIONALITY_AUTO_IMPORT;
exports.ROOTLY_ANNOTATION_FUNCTIONALITY_ID = ROOTLY_ANNOTATION_FUNCTIONALITY_ID;
exports.ROOTLY_ANNOTATION_FUNCTIONALITY_SLUG = ROOTLY_ANNOTATION_FUNCTIONALITY_SLUG;
exports.ROOTLY_ANNOTATION_ORG_ID = ROOTLY_ANNOTATION_ORG_ID;
exports.ROOTLY_ANNOTATION_SERVICE_AUTO_IMPORT = ROOTLY_ANNOTATION_SERVICE_AUTO_IMPORT;
exports.ROOTLY_ANNOTATION_SERVICE_ID = ROOTLY_ANNOTATION_SERVICE_ID;
exports.ROOTLY_ANNOTATION_SERVICE_SLUG = ROOTLY_ANNOTATION_SERVICE_SLUG;
exports.ROOTLY_ANNOTATION_TEAM_AUTO_IMPORT = ROOTLY_ANNOTATION_TEAM_AUTO_IMPORT;
exports.ROOTLY_ANNOTATION_TEAM_ID = ROOTLY_ANNOTATION_TEAM_ID;
exports.ROOTLY_ANNOTATION_TEAM_SLUG = ROOTLY_ANNOTATION_TEAM_SLUG;
exports.RootlyApi = RootlyApi;
//# sourceMappingURL=index.cjs.js.map