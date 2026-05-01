import { stringifyEntityRef } from '@backstage/catalog-model';
import qs from 'qs';
import {
  RootlyEntity,
  RootlyIncident,
  RootlyService,
  RootlyFunctionality,
  RootlyTeam,
  RootlyCatalog,
  RootlyCatalogEntity,
} from './types';
import {
  ROOTLY_ANNOTATION_FUNCTIONALITY_NAME,
  ROOTLY_ANNOTATION_TEAM_NAME,
  ROOTLY_ANNOTATION_SERVICE_NAME,
  ROOTLY_ANNOTATION_CATALOG_ENTITY_NAME,
} from './constants';

export type RootlyServicesFetchOpts = {
  page?: {
    number?: number;
    size?: number;
  };
  filter?: object;
  include?: string;
};

export type RootlyFunctionalitiesFetchOpts = {
  page?: {
    number?: number;
    size?: number;
  };
  filter?: object;
  include?: string;
};

export type RootlyTeamsFetchOpts = {
  page?: {
    number?: number;
    size?: number;
  };
  filter?: object;
  include?: string;
};

export type RootlyIncidentsFetchOpts = {
  page?: {
    number?: number;
    size?: number;
  };
  filter?: object;
  include?: string;
};


export type RootlyCatalogsFetchOpts = {
  page?: {
    number?: number;
    size?: number;
  };
  filter?: object;
  include?: string;
};

export type RootlyCatalogEntitiesFetchOpts = {
  page?: {
    number?: number;
    size?: number;
  };
  filter?: object;
  include?: string;
};

export interface Rootly {
  getService(id_or_slug: String): Promise<RootlyServiceResponse>;
  getServices(opts?: RootlyServicesFetchOpts): Promise<RootlyServicesResponse>;
  getFunctionality(id_or_slug: String): Promise<RootlyFunctionalityResponse>;
  getFunctionalities(
    opts?: RootlyFunctionalitiesFetchOpts,
  ): Promise<RootlyFunctionalitiesResponse>;
  getTeam(id_or_slug: String): Promise<RootlyTeamResponse>;
  getTeams(opts?: RootlyTeamsFetchOpts): Promise<RootlyTeamsResponse>;
  getIncidents(
    opts?: RootlyIncidentsFetchOpts,
  ): Promise<RootlyIncidentsResponse>;

  importServiceEntity(entity: RootlyEntity): Promise<RootlyServiceResponse>;
  updateServiceEntity(
    entity: RootlyEntity,
    service: RootlyService,
    old_service?: RootlyService,
  ): Promise<RootlyServiceResponse>;
  deleteServiceEntity(service: RootlyService): Promise<void>;

  importFunctionalityEntity(
    entity: RootlyEntity,
  ): Promise<RootlyFunctionalityResponse>;
  updateFunctionalityEntity(
    entity: RootlyEntity,
    functionality: RootlyFunctionality,
    old_functionality?: RootlyFunctionality,
  ): Promise<RootlyFunctionalityResponse>;
  deleteFunctionalityEntity(functionality: RootlyFunctionality): Promise<void>;

  importTeamEntity(entity: RootlyEntity): Promise<RootlyTeamResponse>;
  updateTeamEntity(
    entity: RootlyEntity,
    functionality: RootlyTeam,
    old_functionality?: RootlyTeam,
  ): Promise<RootlyTeamResponse>;
  deleteTeamEntity(team: RootlyTeam): Promise<void>;


  getCatalogs(opts?: RootlyCatalogsFetchOpts): Promise<RootlyCatalogsResponse>;
  getCatalogEntity(id_or_slug: String): Promise<RootlyCatalogEntityResponse>;
  getCatalogEntities(
    catalog_id: String,
    opts?: RootlyCatalogEntitiesFetchOpts,
  ): Promise<RootlyCatalogEntitiesResponse>;

  importCatalogEntityEntity(
    entity: RootlyEntity,
    catalogId: string,
  ): Promise<RootlyCatalogEntityResponse>;
  updateCatalogEntityEntity(
    entity: RootlyEntity,
    catalogEntity: RootlyCatalogEntity,
    old_catalogEntity?: RootlyCatalogEntity,
  ): Promise<RootlyCatalogEntityResponse>;
  deleteCatalogEntityEntity(catalogEntity: RootlyCatalogEntity): Promise<void>;

  getCatalogEntityDetailsURL(catalogEntity: RootlyCatalogEntity, catalogSlug: string): string;

  getCreateIncidentURL(): string;
  getListIncidents(): string;

  getListIncidentsForServiceURL(service: RootlyService): string;
  getServiceDetailsURL(service: RootlyService): string;
  getServiceIncidentsChart(
    service: RootlyService,
    opts?: { period: string },
  ): Promise<{ data: object }>;

  getListIncidentsForFunctionalityURL(
    functionality: RootlyFunctionality,
  ): string;
  getFunctionalityDetailsURL(functionality: RootlyFunctionality): string;
  getFunctionalityIncidentsChart(
    functionality: RootlyFunctionality,
    opts?: { period: string },
  ): Promise<{ data: object }>;

  getListIncidentsForTeamURL(team: RootlyTeam): string;
  getTeamDetailsURL(team: RootlyTeam): string;
  getTeamIncidentsChart(
    team: RootlyTeam,
    opts?: { period: string },
  ): Promise<{ data: object }>;
}

export interface RootlyServiceResponse {
  data: RootlyService;
}

export interface RootlyServicesResponse {
  meta: {
    total_count: number;
    total_pages: number;
  };
  data: RootlyService[];
}

export interface RootlyFunctionalityResponse {
  data: RootlyFunctionality;
}

export interface RootlyFunctionalitiesResponse {
  meta: {
    total_count: number;
    total_pages: number;
  };
  data: RootlyFunctionality[];
}

export interface RootlyTeamResponse {
  data: RootlyTeam;
}

export interface RootlyTeamsResponse {
  meta: {
    total_count: number;
    total_pages: number;
  };
  data: RootlyTeam[];
}

export interface RootlyIncidentsResponse {
  meta: {
    total_count: number;
    total_pages: number;
  };
  data: RootlyIncident[];
  included: object[];
  links: {
    first: string;
    last: string;
    next?: string;
    prev?: string;
    self: string;
  };
}

export interface RootlyCatalogResponse {
  data: RootlyCatalog;
}

export interface RootlyCatalogsResponse {
  meta: {
    total_count: number;
    total_pages: number;
  };
  data: RootlyCatalog[];
}

export interface RootlyCatalogEntityResponse {
  data: RootlyCatalogEntity;
}

export interface RootlyCatalogEntitiesResponse {
  meta: {
    total_count: number;
    total_pages: number;
  };
  data: RootlyCatalogEntity[];
}

const DEFAULT_PROXY_PATH = '/rootly/api';

type Options = {
  /**
   * apiProxyUrl used to access Rootly API through proxy
   * Example: https://localhost:7021
   */
  apiProxyUrl: Promise<string>;

  /**
   * apiProxyPath used to access Rootly API through proxy
   * Example: /rootly/api
   */
  apiProxyPath: string | undefined;

  /**
   * apiToken used to access Backstage backend
   * Example: Bearer 12345678910
   */
  apiToken: Promise<{ token?: string | undefined }>;
};

/**
 * API to talk to Rootly.
 */
export class RootlyApi {
  private readonly apiProxyUrl: Promise<string>;
  private readonly apiProxyPath: string;
  private readonly apiToken: Promise<{ token?: string | undefined }>;

  constructor(opts: Options) {
    this.apiProxyUrl = opts.apiProxyUrl;
    this.apiProxyPath = opts.apiProxyPath ?? DEFAULT_PROXY_PATH;
    this.apiToken = opts.apiToken;
  }

  private removeEmptyAttributes<T>(obj: T): T {
    if (typeof obj !== 'object' || obj === null) {
      return obj; // Return the value if it's not an object
    }

    if (Array.isArray(obj)) {
      return obj.map(this.removeEmptyAttributes) as unknown as T; // Recursively apply to array elements
    }

    return Object.fromEntries(
      Object.entries(obj as Record<string, any>)
        .filter(
          ([_, value]) => value !== '' && value !== null && value !== undefined,
        )
        .map(([key, value]) => [key, this.removeEmptyAttributes(value)]),
    ) as T;
  }

  private async fetch<T = any>(input: string, init?: RequestInit): Promise<T> {
    const authedInit = await this.addAuthHeaders(init || {});

    const resp = await fetch(
      `${await this.apiProxyUrl}${this.apiProxyPath}${input}`,
      authedInit,
    );
    if (!resp.ok) {
      throw new Error(`Request failed with ${resp.status} ${resp.statusText}`, {
        cause: { status: resp.status, statusText: resp.statusText },
      });
    }

    return await resp.json();
  }

  private async call(input: string, init?: RequestInit): Promise<void> {
    const authedInit = await this.addAuthHeaders(init || {});

    const resp = await fetch(
      `${await this.apiProxyUrl}${this.apiProxyPath}${input}`,
      authedInit,
    );
    if (!resp.ok)
      throw new Error(
        `Request failed with ${resp.status}: ${resp.statusText}`,
        { cause: { status: resp.status, statusText: resp.statusText } },
      );
  }

  private async addAuthHeaders(init: RequestInit): Promise<RequestInit> {
    const headers = init.headers || {};
    const { token } = await this.apiToken;

    return {
      ...init,
      headers: {
        ...headers,
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    };
  }

  async getService(id_or_slug: String): Promise<RootlyServiceResponse> {
    const init = { headers: { 'Content-Type': 'application/vnd.api+json' } };
    const response = await this.fetch<RootlyServiceResponse>(
      `/v1/services/${id_or_slug}`,
      init,
    );
    return response;
  }

  async getServices(
    opts?: RootlyServicesFetchOpts,
  ): Promise<RootlyServicesResponse> {
    const init = { headers: { 'Content-Type': 'application/vnd.api+json' } };
    const params = qs.stringify(this.removeEmptyAttributes(opts), { encode: false });
    const response = await this.fetch<RootlyServicesResponse>(
      `/v1/services?${params}`,
      init,
    );
    return response;
  }

  async getFunctionality(
    id_or_slug: String,
  ): Promise<RootlyFunctionalityResponse> {
    const init = { headers: { 'Content-Type': 'application/vnd.api+json' } };
    const response = await this.fetch<RootlyFunctionalityResponse>(
      `/v1/functionalities/${id_or_slug}`,
      init,
    );
    return response;
  }

  async getFunctionalities(
    opts?: RootlyFunctionalitiesFetchOpts,
  ): Promise<RootlyFunctionalitiesResponse> {
    const init = { headers: { 'Content-Type': 'application/vnd.api+json' } };
    const params = qs.stringify(this.removeEmptyAttributes(opts), { encode: false });
    const response = await this.fetch<RootlyFunctionalitiesResponse>(
      `/v1/functionalities?${params}`,
      init,
    );
    return response;
  }

  async getTeam(id_or_slug: String): Promise<RootlyTeamResponse> {
    const init = { headers: { 'Content-Type': 'application/vnd.api+json' } };
    const response = await this.fetch<RootlyTeamResponse>(
      `/v1/teams/${id_or_slug}`,
      init,
    );
    return response;
  }

  async getTeams(opts?: RootlyTeamsFetchOpts): Promise<RootlyTeamsResponse> {
    const init = { headers: { 'Content-Type': 'application/vnd.api+json' } };
    const params = qs.stringify(this.removeEmptyAttributes(opts), { encode: false });
    const response = await this.fetch<RootlyTeamsResponse>(
      `/v1/teams?${params}`,
      init,
    );
    return response;
  }

  async getIncidents(
    opts?: RootlyIncidentsFetchOpts,
  ): Promise<RootlyIncidentsResponse> {
    const init = { headers: { 'Content-Type': 'application/vnd.api+json' } };
    const params = qs.stringify(this.removeEmptyAttributes(opts), { encode: false });
    const response = await this.fetch<RootlyIncidentsResponse>(
      `/v1/incidents?${params}`,
      init,
    );
    return response;
  }

  async getServiceIncidentsChart(
    service: RootlyService,
    opts?: { period: string },
  ): Promise<{ data: object }> {
    const init = { headers: { 'Content-Type': 'application/vnd.api+json' } };
    const params = qs.stringify(this.removeEmptyAttributes(opts), { encode: false });
    const response = await this.fetch<{ data: object }>(
      `/v1/services/${service.id}/incidents_chart?${params}`,
      init,
    );
    return response;
  }

  async getFunctionalityIncidentsChart(
    functionality: RootlyFunctionality,
    opts?: { period: string },
  ): Promise<{ data: object }> {
    const init = { headers: { 'Content-Type': 'application/vnd.api+json' } };
    const params = qs.stringify(this.removeEmptyAttributes(opts), { encode: false });
    const response = await this.fetch<{ data: object }>(
      `/v1/functionalities/${functionality.id}/incidents_chart?${params}`,
      init,
    );
    return response;
  }

  async getTeamIncidentsChart(
    team: RootlyTeam,
    opts?: { period: string },
  ): Promise<{ data: object }> {
    const init = { headers: { 'Content-Type': 'application/vnd.api+json' } };
    const params = qs.stringify(this.removeEmptyAttributes(opts), { encode: false });
    const response = await this.fetch<{ data: object }>(
      `/v1/teams/${team.id}/incidents_chart?${params}`,
      init,
    );
    return response;
  }

  // Resolves the Rootly team ID from the entity's spec.owner by name.
  private async resolveOwnerGroupIds(entity: RootlyEntity): Promise<string[]> {
    const owner = entity.spec?.owner as string | undefined;
    if (!owner) return [];

    // Extract the name part from refs like "group:default/platform-team" or "platform-team"
    const name = owner.includes('/') ? owner.split('/').pop() : owner;
    if (!name) return [];

    try {
      const teamsResponse = await this.getTeams({ filter: { name } });
      if (teamsResponse.data?.length > 0) return [teamsResponse.data[0].id];
    } catch (_e) {
      // team lookup failed, proceed without owner
    }

    return [];
  }

  async importServiceEntity(
    entity: RootlyEntity,
  ): Promise<RootlyServiceResponse> {
    const entityTriplet = stringifyEntityRef({
      namespace: entity.metadata.namespace,
      kind: entity.kind,
      name: entity.metadata.name,
    });
    const ownerGroupIds = await this.resolveOwnerGroupIds(entity);
    const init = {
      method: 'POST',
      headers: { 'Content-Type': 'application/vnd.api+json' },
      body: JSON.stringify({
        data: {
          type: 'services',
          attributes: {
            name:
              entity.metadata.annotations?.[ROOTLY_ANNOTATION_SERVICE_NAME] ||
              entity.metadata.name,
            description: entity.metadata.description,
            backstage_id: entityTriplet,
            pagerduty_id:
              entity.metadata.annotations?.['pagerduty.com/service-id'],
            owner_group_ids: ownerGroupIds.length > 0 ? ownerGroupIds : undefined,
          },
        },
      }),
    };

    const response = await this.fetch<RootlyServiceResponse>(`/v1/services`, init);
    return response;
  }

  async updateServiceEntity(
    entity: RootlyEntity,
    service: RootlyService,
    old_service?: RootlyService,
  ): Promise<RootlyServiceResponse> {
    const entityTriplet = stringifyEntityRef({
      namespace: entity.metadata.namespace,
      kind: entity.kind,
      name: entity.metadata.name,
    });

    if (old_service?.id) {
      const init1 = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/vnd.api+json' },
        body: JSON.stringify({
          data: {
            type: 'services',
            attributes: {
              backstage_id: null,
            },
          },
        }),
      };

      await this.call(`/v1/services/${old_service.id}`, init1);
    }

    const ownerGroupIds = await this.resolveOwnerGroupIds(entity);
    const init2 = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/vnd.api+json' },
      body: JSON.stringify({
        data: {
          type: 'services',
          attributes: {
            name:
              entity.metadata.annotations?.[ROOTLY_ANNOTATION_SERVICE_NAME] ||
              entity.metadata.name,
            description: entity.metadata.description,
            backstage_id: entityTriplet,
            pagerduty_id:
              entity.metadata.annotations?.['pagerduty.com/service-id'],
            owner_group_ids: ownerGroupIds.length > 0 ? ownerGroupIds : undefined,
          },
        },
      }),
    };

    const response = await this.fetch<RootlyServiceResponse>(
      `/v1/services/${service.id}`,
      init2,
    );
    return response;
  }

  async deleteServiceEntity(service: RootlyService): Promise<void> {
    const init = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/vnd.api+json' },
      body: JSON.stringify({
        data: {
          type: 'services',
          attributes: {
            backstage_id: null,
          },
        },
      }),
    };

    await this.call(`/v1/services/${service.id}`, init);
  }

  async importFunctionalityEntity(
    entity: RootlyEntity,
  ): Promise<RootlyFunctionalityResponse> {
    const entityTriplet = stringifyEntityRef({
      namespace: entity.metadata.namespace,
      kind: entity.kind,
      name: entity.metadata.name,
    });
    const init = {
      method: 'POST',
      headers: { 'Content-Type': 'application/vnd.api+json' },
      body: JSON.stringify({
        data: {
          type: 'functionalities',
          attributes: {
            name:
              entity.metadata.annotations?.[
                ROOTLY_ANNOTATION_FUNCTIONALITY_NAME
              ] || entity.metadata.name,
            description: entity.metadata.description,
            backstage_id: entityTriplet,
            pagerduty_id:
              entity.metadata.annotations?.['pagerduty.com/service-id'],
          },
        },
      }),
    };

    const response = await this.fetch<RootlyFunctionalityResponse>(
      `/v1/functionalities`,
      init,
    );
    return response;
  }

  async updateFunctionalityEntity(
    entity: RootlyEntity,
    functionality: RootlyFunctionality,
    old_functionality?: RootlyFunctionality,
  ): Promise<RootlyFunctionalityResponse> {
    const entityTriplet = stringifyEntityRef({
      namespace: entity.metadata.namespace,
      kind: entity.kind,
      name: entity.metadata.name,
    });

    if (old_functionality?.id) {
      const init1 = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/vnd.api+json' },
        body: JSON.stringify({
          data: {
            type: 'functionalities',
            attributes: {
              backstage_id: null,
            },
          },
        }),
      };

      await this.call(`/v1/functionalities/${old_functionality.id}`, init1);
    }

    const init2 = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/vnd.api+json' },
      body: JSON.stringify({
        data: {
          type: 'functionalities',
          attributes: {
            name:
              entity.metadata.annotations?.[
                ROOTLY_ANNOTATION_FUNCTIONALITY_NAME
              ] || entity.metadata.name,
            description: entity.metadata.description,
            backstage_id: entityTriplet,
            pagerduty_id:
              entity.metadata.annotations?.['pagerduty.com/service-id'],
          },
        },
      }),
    };

    const response = await this.fetch<RootlyFunctionalityResponse>(
      `/v1/functionalities/${functionality.id}`,
      init2,
    );
    return response;
  }

  async deleteFunctionalityEntity(
    functionality: RootlyFunctionality,
  ): Promise<void> {
    const init = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/vnd.api+json' },
      body: JSON.stringify({
        data: {
          type: 'functionalities',
          attributes: {
            backstage_id: null,
          },
        },
      }),
    };

    await this.call(`/v1/functionalities/${functionality.id}`, init);
  }

  async importTeamEntity(entity: RootlyEntity): Promise<RootlyTeamResponse> {
    const entityTriplet = stringifyEntityRef({
      namespace: entity.metadata.namespace,
      kind: entity.kind,
      name: entity.metadata.name,
    });
    const init = {
      method: 'POST',
      headers: { 'Content-Type': 'application/vnd.api+json' },
      body: JSON.stringify({
        data: {
          type: 'teams',
          attributes: {
            name:
              entity.metadata.annotations?.[ROOTLY_ANNOTATION_TEAM_NAME] ||
              entity.metadata.name,
            description: entity.metadata.description,
            backstage_id: entityTriplet,
            pagerduty_id:
              entity.metadata.annotations?.['pagerduty.com/service-id'],
          },
        },
      }),
    };

    const response = await this.fetch<RootlyTeamResponse>(`/v1/teams`, init);
    return response;
  }

  async updateTeamEntity(
    entity: RootlyEntity,
    team: RootlyTeam,
    old_team?: RootlyTeam,
  ): Promise<RootlyTeamResponse> {
    const entityTriplet = stringifyEntityRef({
      namespace: entity.metadata.namespace,
      kind: entity.kind,
      name: entity.metadata.name,
    });

    if (old_team?.id) {
      const init1 = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/vnd.api+json' },
        body: JSON.stringify({
          data: {
            type: 'teams',
            attributes: {
              backstage_id: null,
            },
          },
        }),
      };

      await this.call(`/v1/teams/${old_team.id}`, init1);
    }

    const init2 = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/vnd.api+json' },
      body: JSON.stringify({
        data: {
          type: 'teams',
          attributes: {
            name:
              entity.metadata.annotations?.[ROOTLY_ANNOTATION_TEAM_NAME] ||
              entity.metadata.name,
            description: entity.metadata.description,
            backstage_id: entityTriplet,
            pagerduty_id:
              entity.metadata.annotations?.['pagerduty.com/service-id'],
          },
        },
      }),
    };

    const response = await this.fetch<RootlyTeamResponse>(
      `/v1/teams/${team.id}`,
      init2,
    );
    return response;
  }

  async deleteTeamEntity(team: RootlyTeam): Promise<void> {
    const init = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/vnd.api+json' },
      body: JSON.stringify({
        data: {
          type: 'teams',
          attributes: {
            backstage_id: null,
          },
        },
      }),
    };

    await this.call(`/v1/teams/${team.id}`, init);
  }


  async getCatalogs(
    opts?: RootlyCatalogsFetchOpts,
  ): Promise<RootlyCatalogsResponse> {
    const init = { headers: { 'Content-Type': 'application/vnd.api+json' } };
    const params = qs.stringify(this.removeEmptyAttributes(opts), { encode: false });
    const response = await this.fetch<RootlyCatalogsResponse>(
      `/v1/catalogs?${params}`,
      init,
    );
    return response;
  }

  async getCatalogEntity(
    id_or_slug: String,
  ): Promise<RootlyCatalogEntityResponse> {
    const init = { headers: { 'Content-Type': 'application/vnd.api+json' } };
    const response = await this.fetch<RootlyCatalogEntityResponse>(
      `/v1/catalog_entities/${id_or_slug}`,
      init,
    );
    return response;
  }

  async getCatalogEntities(
    catalog_id: String,
    opts?: RootlyCatalogEntitiesFetchOpts,
  ): Promise<RootlyCatalogEntitiesResponse> {
    const init = { headers: { 'Content-Type': 'application/vnd.api+json' } };
    const params = qs.stringify(this.removeEmptyAttributes(opts), { encode: false });
    const response = await this.fetch<RootlyCatalogEntitiesResponse>(
      `/v1/catalogs/${catalog_id}/entities?${params}`,
      init,
    );
    return response;
  }

  async importCatalogEntityEntity(
    entity: RootlyEntity,
    catalogId: string,
  ): Promise<RootlyCatalogEntityResponse> {
    const entityTriplet = stringifyEntityRef({
      namespace: entity.metadata.namespace,
      kind: entity.kind,
      name: entity.metadata.name,
    });
    const init = {
      method: 'POST',
      headers: { 'Content-Type': 'application/vnd.api+json' },
      body: JSON.stringify({
        data: {
          type: 'catalog_entities',
          attributes: {
            name:
              entity.metadata.annotations?.[ROOTLY_ANNOTATION_CATALOG_ENTITY_NAME] ||
              entity.metadata.name,
            description: entity.metadata.description,
            backstage_id: entityTriplet,
          },
        },
      }),
    };

    const response = await this.fetch<RootlyCatalogEntityResponse>(
      `/v1/catalogs/${catalogId}/entities`,
      init,
    );
    return response;
  }

  async updateCatalogEntityEntity(
    entity: RootlyEntity,
    catalogEntity: RootlyCatalogEntity,
    old_catalogEntity?: RootlyCatalogEntity,
  ): Promise<RootlyCatalogEntityResponse> {
    const entityTriplet = stringifyEntityRef({
      namespace: entity.metadata.namespace,
      kind: entity.kind,
      name: entity.metadata.name,
    });

    if (old_catalogEntity?.id) {
      const init1 = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/vnd.api+json' },
        body: JSON.stringify({
          data: {
            type: 'catalog_entities',
            attributes: {
              backstage_id: null,
            },
          },
        }),
      };

      await this.call(`/v1/catalog_entities/${old_catalogEntity.id}`, init1);
    }

    const init2 = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/vnd.api+json' },
      body: JSON.stringify({
        data: {
          type: 'catalog_entities',
          attributes: {
            name:
              entity.metadata.annotations?.[ROOTLY_ANNOTATION_CATALOG_ENTITY_NAME] ||
              entity.metadata.name,
            description: entity.metadata.description,
            backstage_id: entityTriplet,
          },
        },
      }),
    };

    const response = await this.fetch<RootlyCatalogEntityResponse>(
      `/v1/catalog_entities/${catalogEntity.id}`,
      init2,
    );
    return response;
  }

  async deleteCatalogEntityEntity(
    catalogEntity: RootlyCatalogEntity,
  ): Promise<void> {
    const init = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/vnd.api+json' },
      body: JSON.stringify({
        data: {
          type: 'catalog_entities',
          attributes: {
            backstage_id: null,
          },
        },
      }),
    };

    await this.call(`/v1/catalog_entities/${catalogEntity.id}`, init);
  }

  static getCreateIncidentURL(): string {
    return `https://rootly.com/account/incidents/new`;
  }

  static getListIncidents(): string {
    return `https://rootly.com/account/incidents`;
  }

  static getListIncidentsForServiceURL(service: RootlyService): string {
    const params = qs.stringify(
      { filter: { filters: ['services'], services: [service.id] } },
      { arrayFormat: 'brackets' },
    );
    return `https://rootly.com/account/incidents?${params}`;
  }

  static getListIncidentsForFunctionalityURL(
    functionality: RootlyFunctionality,
  ): string {
    const params = qs.stringify(
      { filter: { filters: ['functionalities'], groups: [functionality.id] } },
      { arrayFormat: 'brackets' },
    );
    return `https://rootly.com/account/incidents?${params}`;
  }

  static getListIncidentsForTeamURL(team: RootlyTeam): string {
    const params = qs.stringify(
      { filter: { filters: ['groups'], groups: [team.id] } },
      { arrayFormat: 'brackets' },
    );
    return `https://rootly.com/account/incidents?${params}`;
  }

  static getServiceDetailsURL(service: RootlyService): string {
    return `https://rootly.com/account/services/${service.attributes.slug}`;
  }

  static getFunctionalityDetailsURL(
    functionality: RootlyFunctionality,
  ): string {
    return `https://rootly.com/account/functionalities/${functionality.attributes.slug}`;
  }

  static getTeamDetailsURL(team: RootlyTeam): string {
    return `https://rootly.com/account/teams/${team.attributes.slug}`;
  }

  static getCatalogEntityDetailsURL(
    catalogEntity: RootlyCatalogEntity,
    catalogSlug?: string,
  ): string {
    if (catalogSlug) {
      return `https://rootly.com/account/catalogs/${catalogSlug}/entities/${catalogEntity.attributes.slug}`;
    }
    return `https://rootly.com/account/catalogs`;
  }
}
