import { Entity } from '@backstage/catalog-model';

/** @public */
interface RootlyService {
    id: string;
    type: string;
    attributes: {
        name: string;
        slug: string;
        description: string | undefined;
        public_description: string | undefined;
        color: string;
        notify_emails: string[];
        slack_channels: object[];
        slack_aliases: object[];
        backstage_id: string | undefined;
        pagerduty_id: string | undefined;
        incidents_count: BigInteger;
        created_at: string;
        updated_at: string;
    };
}
/** @public */
interface RootlyFunctionality {
    id: string;
    type: string;
    attributes: {
        name: string;
        slug: string;
        description: string | undefined;
        public_description: string | undefined;
        color: string;
        user: {
            data: RootlyUser;
        } | undefined;
        severity: {
            data: RootlySeverity;
        } | undefined;
        notify_emails: string[];
        slack_channels: object[];
        slack_aliases: object[];
        backstage_id: string | undefined;
        pagerduty_id: string | undefined;
        incidents_count: BigInteger;
        created_at: string;
        updated_at: string;
    };
}
/** @public */
interface RootlyTeam {
    id: string;
    type: string;
    attributes: {
        name: string;
        slug: string;
        description: string | undefined;
        color: string;
        backstage_id: string | undefined;
        pagerduty_service_id: string | undefined;
        created_at: string;
        updated_at: string;
    };
}
/** @public */
interface RootlyRelationship {
    id: string;
    type: string;
    data: [{
        id: string;
        type: string;
    }];
}
/** @public */
interface RootlyUser {
    id: string;
    type: string;
    attributes: {
        name: string;
        email: string;
        full_name: string;
    };
}
/** @public */
interface RootlyIncidentType {
    id: string;
    type: string;
    attributes: {
        name: string;
        slug: string;
        description: string | undefined;
        color: string;
        created_at: string;
        updated_at: string;
    };
}
/** @public */
interface RootlyEnvironment {
    id: string;
    type: string;
    attributes: {
        name: string;
        slug: string;
        description: string | undefined;
        color: string;
        created_at: string;
        updated_at: string;
    };
}
/** @public */
interface RootlySeverity {
    id: string;
    attributes: {
        name: string;
        slug: string;
        description: string | undefined;
        severity: string | undefined;
        color: string;
        created_at: string;
        updated_at: string;
    };
}
/** @public */
interface RootlyResponderRef {
    id: string;
    type: string;
}
/** @public */
interface RootlyIncident {
    id: string;
    type: string;
    attributes: {
        title: string;
        slug: string;
        summary: string | undefined;
        status: string;
        labels: string[];
        severity: {
            data: RootlySeverity;
        } | undefined;
        user: {
            data: RootlyUser;
        } | undefined;
        url: string;
        created_at: string;
        updated_at: string;
    };
    relationships: {
        services: RootlyRelationship | undefined;
        functionalities: RootlyRelationship | undefined;
        incident_types: RootlyRelationship | undefined;
        environments: RootlyRelationship | undefined;
        groups: RootlyRelationship | undefined;
    };
    included: [
        {
            id: string;
            type: string;
            attributes: RootlyTeam | RootlyEnvironment | RootlyService | RootlyFunctionality | RootlyIncidentType;
        }
    ];
}
/** @public */
interface RootlyCatalog {
    id: string;
    type: string;
    attributes: {
        name: string;
        slug: string;
        description: string | undefined;
        position: number | undefined;
        created_at: string;
        updated_at: string;
    };
}
/** @public */
interface RootlyCatalogEntity {
    id: string;
    type: string;
    attributes: {
        name: string;
        slug: string;
        description: string | undefined;
        catalog_id: string;
        position: number | undefined;
        backstage_id: string | undefined;
        properties: Array<{
            catalog_property_id: string;
            value: any;
        }> | undefined;
        created_at: string;
        updated_at: string;
    };
}
/** @public */
interface RootlyEntity extends Entity {
    rootlyKind: string | undefined;
    linkedService: RootlyService | undefined;
    linkedFunctionality: RootlyFunctionality | undefined;
    linkedTeam: RootlyTeam | undefined;
    linkedCatalogEntity: RootlyCatalogEntity | undefined;
}

/** @public */
declare const ROOTLY_ANNOTATION_ORG_ID = "rootly.com/organization-id";
/** @public */
declare const ROOTLY_ANNOTATION_SERVICE_ID = "rootly.com/service-id";
/** @public */
declare const ROOTLY_ANNOTATION_SERVICE_NAME = "rootly.com/service-name";
/** @public */
declare const ROOTLY_ANNOTATION_SERVICE_SLUG = "rootly.com/service-slug";
/** @public */
declare const ROOTLY_ANNOTATION_SERVICE_AUTO_IMPORT = "rootly.com/service-auto-import";
/** @public */
declare const ROOTLY_ANNOTATION_FUNCTIONALITY_NAME = "rootly.com/functionality-name";
/** @public */
declare const ROOTLY_ANNOTATION_FUNCTIONALITY_ID = "rootly.com/functionality-id";
/** @public */
declare const ROOTLY_ANNOTATION_FUNCTIONALITY_SLUG = "rootly.com/functionality-slug";
/** @public */
declare const ROOTLY_ANNOTATION_FUNCTIONALITY_AUTO_IMPORT = "rootly.com/functionality-auto-import";
/** @public */
declare const ROOTLY_ANNOTATION_TEAM_ID = "rootly.com/team-id";
/** @public */
declare const ROOTLY_ANNOTATION_TEAM_NAME = "rootly.com/team-name";
/** @public */
declare const ROOTLY_ANNOTATION_TEAM_SLUG = "rootly.com/team-slug";
/** @public */
declare const ROOTLY_ANNOTATION_TEAM_AUTO_IMPORT = "rootly.com/team-auto-import";
/** @public */
declare const ROOTLY_ANNOTATION_CATALOG_ENTITY_ID = "rootly.com/catalog-entity-id";
/** @public */
declare const ROOTLY_ANNOTATION_CATALOG_ENTITY_NAME = "rootly.com/catalog-entity-name";
/** @public */
declare const ROOTLY_ANNOTATION_CATALOG_ENTITY_SLUG = "rootly.com/catalog-entity-slug";
/** @public */
declare const ROOTLY_ANNOTATION_CATALOG_ENTITY_AUTO_IMPORT = "rootly.com/catalog-entity-auto-import";
/** @public */
declare const ROOTLY_ANNOTATION_CATALOG_ID = "rootly.com/catalog-id";
/** @public */
declare const ROOTLY_ANNOTATION_CATALOG_SLUG = "rootly.com/catalog-slug";

type RootlyServicesFetchOpts = {
    page?: {
        number?: number;
        size?: number;
    };
    filter?: object;
    include?: string;
};
type RootlyFunctionalitiesFetchOpts = {
    page?: {
        number?: number;
        size?: number;
    };
    filter?: object;
    include?: string;
};
type RootlyTeamsFetchOpts = {
    page?: {
        number?: number;
        size?: number;
    };
    filter?: object;
    include?: string;
};
type RootlyIncidentsFetchOpts = {
    page?: {
        number?: number;
        size?: number;
    };
    filter?: object;
    include?: string;
};
type RootlyCatalogsFetchOpts = {
    page?: {
        number?: number;
        size?: number;
    };
    filter?: object;
    include?: string;
};
type RootlyCatalogEntitiesFetchOpts = {
    page?: {
        number?: number;
        size?: number;
    };
    filter?: object;
    include?: string;
};
interface Rootly {
    getService(id_or_slug: String): Promise<RootlyServiceResponse>;
    getServices(opts?: RootlyServicesFetchOpts): Promise<RootlyServicesResponse>;
    getFunctionality(id_or_slug: String): Promise<RootlyFunctionalityResponse>;
    getFunctionalities(opts?: RootlyFunctionalitiesFetchOpts): Promise<RootlyFunctionalitiesResponse>;
    getTeam(id_or_slug: String): Promise<RootlyTeamResponse>;
    getTeams(opts?: RootlyTeamsFetchOpts): Promise<RootlyTeamsResponse>;
    getIncidents(opts?: RootlyIncidentsFetchOpts): Promise<RootlyIncidentsResponse>;
    importServiceEntity(entity: RootlyEntity): Promise<RootlyServiceResponse>;
    updateServiceEntity(entity: RootlyEntity, service: RootlyService, old_service?: RootlyService): Promise<RootlyServiceResponse>;
    deleteServiceEntity(service: RootlyService): Promise<void>;
    importFunctionalityEntity(entity: RootlyEntity): Promise<RootlyFunctionalityResponse>;
    updateFunctionalityEntity(entity: RootlyEntity, functionality: RootlyFunctionality, old_functionality?: RootlyFunctionality): Promise<RootlyFunctionalityResponse>;
    deleteFunctionalityEntity(functionality: RootlyFunctionality): Promise<void>;
    importTeamEntity(entity: RootlyEntity): Promise<RootlyTeamResponse>;
    updateTeamEntity(entity: RootlyEntity, functionality: RootlyTeam, old_functionality?: RootlyTeam): Promise<RootlyTeamResponse>;
    deleteTeamEntity(team: RootlyTeam): Promise<void>;
    getCatalogs(opts?: RootlyCatalogsFetchOpts): Promise<RootlyCatalogsResponse>;
    getCatalogEntity(id_or_slug: String): Promise<RootlyCatalogEntityResponse>;
    getCatalogEntities(catalog_id: String, opts?: RootlyCatalogEntitiesFetchOpts): Promise<RootlyCatalogEntitiesResponse>;
    importCatalogEntityEntity(entity: RootlyEntity, catalogId: string): Promise<RootlyCatalogEntityResponse>;
    updateCatalogEntityEntity(entity: RootlyEntity, catalogEntity: RootlyCatalogEntity, old_catalogEntity?: RootlyCatalogEntity): Promise<RootlyCatalogEntityResponse>;
    deleteCatalogEntityEntity(catalogEntity: RootlyCatalogEntity): Promise<void>;
    findOrCreateCatalog(nameOrSlug: string): Promise<RootlyCatalogResponse>;
    getCatalogEntityDetailsURL(catalogEntity: RootlyCatalogEntity, catalogSlug: string): string;
    getCreateIncidentURL(): string;
    getListIncidents(): string;
    getListIncidentsForServiceURL(service: RootlyService): string;
    getServiceDetailsURL(service: RootlyService): string;
    getServiceIncidentsChart(service: RootlyService, opts?: {
        period: string;
    }): Promise<{
        data: object;
    }>;
    getListIncidentsForFunctionalityURL(functionality: RootlyFunctionality): string;
    getFunctionalityDetailsURL(functionality: RootlyFunctionality): string;
    getFunctionalityIncidentsChart(functionality: RootlyFunctionality, opts?: {
        period: string;
    }): Promise<{
        data: object;
    }>;
    getListIncidentsForTeamURL(team: RootlyTeam): string;
    getTeamDetailsURL(team: RootlyTeam): string;
    getTeamIncidentsChart(team: RootlyTeam, opts?: {
        period: string;
    }): Promise<{
        data: object;
    }>;
}
interface RootlyServiceResponse {
    data: RootlyService;
}
interface RootlyServicesResponse {
    meta: {
        total_count: number;
        total_pages: number;
    };
    data: RootlyService[];
}
interface RootlyFunctionalityResponse {
    data: RootlyFunctionality;
}
interface RootlyFunctionalitiesResponse {
    meta: {
        total_count: number;
        total_pages: number;
    };
    data: RootlyFunctionality[];
}
interface RootlyTeamResponse {
    data: RootlyTeam;
}
interface RootlyTeamsResponse {
    meta: {
        total_count: number;
        total_pages: number;
    };
    data: RootlyTeam[];
}
interface RootlyIncidentsResponse {
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
interface RootlyCatalogResponse {
    data: RootlyCatalog;
}
interface RootlyCatalogsResponse {
    meta: {
        total_count: number;
        total_pages: number;
    };
    data: RootlyCatalog[];
}
interface RootlyCatalogEntityResponse {
    data: RootlyCatalogEntity;
}
interface RootlyCatalogEntitiesResponse {
    meta: {
        total_count: number;
        total_pages: number;
    };
    data: RootlyCatalogEntity[];
}
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
    apiToken: Promise<{
        token?: string | undefined;
    }>;
    /**
     * apiHost for Rootly web UI links
     * Example: https://rootly.com or https://staging.rootly.com
     */
    apiHost?: string;
};
/**
 * API to talk to Rootly.
 */
declare class RootlyApi {
    private readonly apiProxyUrl;
    private readonly apiProxyPath;
    private readonly apiToken;
    private readonly apiHost;
    constructor(opts: Options);
    private removeEmptyAttributes;
    private fetch;
    private call;
    private addAuthHeaders;
    getService(id_or_slug: String): Promise<RootlyServiceResponse>;
    getServices(opts?: RootlyServicesFetchOpts): Promise<RootlyServicesResponse>;
    getFunctionality(id_or_slug: String): Promise<RootlyFunctionalityResponse>;
    getFunctionalities(opts?: RootlyFunctionalitiesFetchOpts): Promise<RootlyFunctionalitiesResponse>;
    getTeam(id_or_slug: String): Promise<RootlyTeamResponse>;
    getTeams(opts?: RootlyTeamsFetchOpts): Promise<RootlyTeamsResponse>;
    getIncidents(opts?: RootlyIncidentsFetchOpts): Promise<RootlyIncidentsResponse>;
    getServiceIncidentsChart(service: RootlyService, opts?: {
        period: string;
    }): Promise<{
        data: object;
    }>;
    getFunctionalityIncidentsChart(functionality: RootlyFunctionality, opts?: {
        period: string;
    }): Promise<{
        data: object;
    }>;
    getTeamIncidentsChart(team: RootlyTeam, opts?: {
        period: string;
    }): Promise<{
        data: object;
    }>;
    private resolveOwnerGroupIds;
    importServiceEntity(entity: RootlyEntity): Promise<RootlyServiceResponse>;
    updateServiceEntity(entity: RootlyEntity, service: RootlyService, old_service?: RootlyService): Promise<RootlyServiceResponse>;
    deleteServiceEntity(service: RootlyService): Promise<void>;
    importFunctionalityEntity(entity: RootlyEntity): Promise<RootlyFunctionalityResponse>;
    updateFunctionalityEntity(entity: RootlyEntity, functionality: RootlyFunctionality, old_functionality?: RootlyFunctionality): Promise<RootlyFunctionalityResponse>;
    deleteFunctionalityEntity(functionality: RootlyFunctionality): Promise<void>;
    importTeamEntity(entity: RootlyEntity): Promise<RootlyTeamResponse>;
    updateTeamEntity(entity: RootlyEntity, team: RootlyTeam, old_team?: RootlyTeam): Promise<RootlyTeamResponse>;
    deleteTeamEntity(team: RootlyTeam): Promise<void>;
    getCatalogs(opts?: RootlyCatalogsFetchOpts): Promise<RootlyCatalogsResponse>;
    findOrCreateCatalog(nameOrSlug: string): Promise<RootlyCatalogResponse>;
    getCatalogEntity(id_or_slug: String): Promise<RootlyCatalogEntityResponse>;
    getCatalogEntities(catalog_id: String, opts?: RootlyCatalogEntitiesFetchOpts): Promise<RootlyCatalogEntitiesResponse>;
    importCatalogEntityEntity(entity: RootlyEntity, catalogId: string): Promise<RootlyCatalogEntityResponse>;
    updateCatalogEntityEntity(entity: RootlyEntity, catalogEntity: RootlyCatalogEntity, old_catalogEntity?: RootlyCatalogEntity): Promise<RootlyCatalogEntityResponse>;
    deleteCatalogEntityEntity(catalogEntity: RootlyCatalogEntity): Promise<void>;
    getCreateIncidentURL(): string;
    getListIncidents(): string;
    getListIncidentsForServiceURL(service: RootlyService): string;
    getListIncidentsForFunctionalityURL(functionality: RootlyFunctionality): string;
    getListIncidentsForTeamURL(team: RootlyTeam): string;
    getServiceDetailsURL(service: RootlyService): string;
    getFunctionalityDetailsURL(functionality: RootlyFunctionality): string;
    getTeamDetailsURL(team: RootlyTeam): string;
    getCatalogEntityDetailsURL(catalogEntity: RootlyCatalogEntity, catalogSlug?: string): string;
}

export { ROOTLY_ANNOTATION_CATALOG_ENTITY_AUTO_IMPORT, ROOTLY_ANNOTATION_CATALOG_ENTITY_ID, ROOTLY_ANNOTATION_CATALOG_ENTITY_NAME, ROOTLY_ANNOTATION_CATALOG_ENTITY_SLUG, ROOTLY_ANNOTATION_CATALOG_ID, ROOTLY_ANNOTATION_CATALOG_SLUG, ROOTLY_ANNOTATION_FUNCTIONALITY_AUTO_IMPORT, ROOTLY_ANNOTATION_FUNCTIONALITY_ID, ROOTLY_ANNOTATION_FUNCTIONALITY_NAME, ROOTLY_ANNOTATION_FUNCTIONALITY_SLUG, ROOTLY_ANNOTATION_ORG_ID, ROOTLY_ANNOTATION_SERVICE_AUTO_IMPORT, ROOTLY_ANNOTATION_SERVICE_ID, ROOTLY_ANNOTATION_SERVICE_NAME, ROOTLY_ANNOTATION_SERVICE_SLUG, ROOTLY_ANNOTATION_TEAM_AUTO_IMPORT, ROOTLY_ANNOTATION_TEAM_ID, ROOTLY_ANNOTATION_TEAM_NAME, ROOTLY_ANNOTATION_TEAM_SLUG, type Rootly, RootlyApi, type RootlyCatalog, type RootlyCatalogEntitiesFetchOpts, type RootlyCatalogEntitiesResponse, type RootlyCatalogEntity, type RootlyCatalogEntityResponse, type RootlyCatalogResponse, type RootlyCatalogsFetchOpts, type RootlyCatalogsResponse, type RootlyEntity, type RootlyEnvironment, type RootlyFunctionalitiesFetchOpts, type RootlyFunctionalitiesResponse, type RootlyFunctionality, type RootlyFunctionalityResponse, type RootlyIncident, type RootlyIncidentType, type RootlyIncidentsFetchOpts, type RootlyIncidentsResponse, type RootlyRelationship, type RootlyResponderRef, type RootlyService, type RootlyServiceResponse, type RootlyServicesFetchOpts, type RootlyServicesResponse, type RootlySeverity, type RootlyTeam, type RootlyTeamResponse, type RootlyTeamsFetchOpts, type RootlyTeamsResponse, type RootlyUser };
