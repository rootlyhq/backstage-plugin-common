import { Entity } from '@backstage/catalog-model';
import * as _backstage_core_plugin_api from '@backstage/core-plugin-api';
import { DiscoveryApi, IdentityApi } from '@backstage/core-plugin-api';
import { RootlyEntity as RootlyEntity$1, RootlyService as RootlyService$1, RootlyFunctionality as RootlyFunctionality$1, RootlyTeam as RootlyTeam$1, RootlyIncident as RootlyIncident$1 } from '@rootly/backstage-plugin-common';

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
interface RootlyTeam {
    id: string;
    type: string;
    attributes: {
        name: string;
        slug: string;
        description: string | undefined;
        color: string;
        backstage_id: string | undefined;
        created_at: string;
        updated_at: string;
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
interface RootlyEntity extends Entity {
    linkedService: RootlyService | undefined;
    linkedFunctionality: RootlyFunctionality | undefined;
    linkedTeam: RootlyTeam | undefined;
}

/** @public */
declare const ROOTLY_ANNOTATION_SERVICE_ID = "rootly.com/service-id";
/** @public */
declare const ROOTLY_ANNOTATION_SERVICE_SLUG = "rootly.com/service-slug";
/** @public */
declare const ROOTLY_ANNOTATION_SERVICE_AUTO_IMPORT = "rootly.com/service-auto-import";
/** @public */
declare const ROOTLY_ANNOTATION_FUNCTIONALITY_ID = "rootly.com/functionality-id";
/** @public */
declare const ROOTLY_ANNOTATION_FUNCTIONALITY_SLUG = "rootly.com/functionality-slug";
/** @public */
declare const ROOTLY_ANNOTATION_FUNCTIONALITY_AUTO_IMPORT = "rootly.com/functionality-auto-import";
/** @public */
declare const ROOTLY_ANNOTATION_TEAM_ID = "rootly.com/team-id";
/** @public */
declare const ROOTLY_ANNOTATION_TEAM_SLUG = "rootly.com/team-slug";
/** @public */
declare const ROOTLY_ANNOTATION_TEAM_AUTO_IMPORT = "rootly.com/team-auto-import";

declare const RootlyApiRef: _backstage_core_plugin_api.ApiRef<RootlyApi>;
declare type RootlyServicesFetchOpts = {
    page?: {
        number?: number;
        size?: number;
    };
    filter?: object;
    include?: string;
};
declare type RootlyFunctionalitiesFetchOpts = {
    page?: {
        number?: number;
        size?: number;
    };
    filter?: object;
    include?: string;
};
declare type RootlyTeamsFetchOpts = {
    page?: {
        number?: number;
        size?: number;
    };
    filter?: object;
    include?: string;
};
declare type RootlyIncidentsFetchOpts = {
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
    importServiceEntity(entity: RootlyEntity$1): Promise<void>;
    updateServiceEntity(entity: RootlyEntity$1, service: RootlyService$1, old_service?: RootlyService$1): Promise<void>;
    deleteServiceEntity(service: RootlyService$1): Promise<void>;
    importFunctionalityEntity(entity: RootlyEntity$1): Promise<void>;
    updateFunctionalityEntity(entity: RootlyEntity$1, functionality: RootlyFunctionality$1, old_functionality?: RootlyFunctionality$1): Promise<void>;
    deleteFunctionalityEntity(functionality: RootlyFunctionality$1): Promise<void>;
    importTeamEntity(entity: RootlyEntity$1): Promise<void>;
    updateTeamEntity(entity: RootlyEntity$1, functionality: RootlyTeam$1, old_functionality?: RootlyTeam$1): Promise<void>;
    deleteTeamEntity(team: RootlyTeam$1): Promise<void>;
    getCreateIncidentURL(): string;
    getListIncidents(): string;
    getListIncidentsForServiceURL(service: RootlyService$1): string;
    getServiceDetailsURL(service: RootlyService$1): string;
    getServiceIncidentsChart(service: RootlyService$1, opts?: {
        period: string;
    }): Promise<{
        data: object;
    }>;
    getListIncidentsForFunctionalityURL(functionality: RootlyFunctionality$1): string;
    getFunctionalityDetailsURL(functionality: RootlyFunctionality$1): string;
    getFunctionalityIncidentsChart(functionality: RootlyFunctionality$1, opts?: {
        period: string;
    }): Promise<{
        data: object;
    }>;
    getListIncidentsForTeamURL(team: RootlyTeam$1): string;
    getTeamDetailsURL(team: RootlyTeam$1): string;
    getTeamIncidentsChart(team: RootlyTeam$1, opts?: {
        period: string;
    }): Promise<{
        data: object;
    }>;
}
interface RootlyServiceResponse {
    data: RootlyService$1;
}
interface RootlyServicesResponse {
    meta: {
        total_count: number;
        total_pages: number;
    };
    data: RootlyService$1[];
}
interface RootlyFunctionalityResponse {
    data: RootlyFunctionality$1;
}
interface RootlyFunctionalitiesResponse {
    meta: {
        total_count: number;
        total_pages: number;
    };
    data: RootlyFunctionality$1[];
}
interface RootlyTeamResponse {
    data: RootlyTeam$1;
}
interface RootlyTeamsResponse {
    meta: {
        total_count: number;
        total_pages: number;
    };
    data: RootlyTeam$1[];
}
interface RootlyIncidentsResponse {
    meta: {
        total_count: number;
        total_pages: number;
    };
    data: RootlyIncident$1[];
    included: object[];
    links: {
        first: string;
        last: string;
        next?: string;
        prev?: string;
        self: string;
    };
}
declare type Options = {
    discoveryApi: DiscoveryApi;
    identityApi: IdentityApi;
    /**
     * Domain used by users to access Rootly web UI.
     * Example: https://rootly.com
     */
    domain: string;
    /**
     * Path to use for requests via the proxy, defaults to /rootly/api
     */
    proxyPath?: string;
};
/**
 * API to talk to Rootly.
 */
declare class RootlyApi {
    private readonly discoveryApi;
    private readonly identityApi;
    private readonly proxyPath;
    private readonly domain;
    constructor(opts: Options);
    private fetch;
    private call;
    getService(id_or_slug: String): Promise<RootlyServiceResponse>;
    getServices(opts?: RootlyServicesFetchOpts): Promise<RootlyServicesResponse>;
    getFunctionality(id_or_slug: String): Promise<RootlyFunctionalityResponse>;
    getFunctionalities(opts?: RootlyFunctionalitiesFetchOpts): Promise<RootlyFunctionalitiesResponse>;
    getTeam(id_or_slug: String): Promise<RootlyTeamResponse>;
    getTeams(opts?: RootlyTeamsFetchOpts): Promise<RootlyTeamsResponse>;
    getIncidents(opts?: RootlyIncidentsFetchOpts): Promise<RootlyIncidentsResponse>;
    getServiceIncidentsChart(service: RootlyService$1, opts?: {
        period: string;
    }): Promise<{
        data: object;
    }>;
    getFunctionalityIncidentsChart(functionality: RootlyFunctionality$1, opts?: {
        period: string;
    }): Promise<{
        data: object;
    }>;
    getTeamIncidentsChart(team: RootlyTeam$1, opts?: {
        period: string;
    }): Promise<{
        data: object;
    }>;
    importServiceEntity(entity: RootlyEntity$1): Promise<void>;
    updateServiceEntity(entity: RootlyEntity$1, service: RootlyService$1, old_service?: RootlyService$1): Promise<void>;
    deleteServiceEntity(service: RootlyService$1): Promise<void>;
    importFunctionalityEntity(entity: RootlyEntity$1): Promise<void>;
    updateFunctionalityEntity(entity: RootlyEntity$1, functionality: RootlyFunctionality$1, old_functionality?: RootlyFunctionality$1): Promise<void>;
    deleteFunctionalityEntity(functionality: RootlyFunctionality$1): Promise<void>;
    importTeamEntity(entity: RootlyEntity$1): Promise<void>;
    updateTeamEntity(entity: RootlyEntity$1, team: RootlyTeam$1, old_team?: RootlyTeam$1): Promise<void>;
    deleteTeamEntity(team: RootlyTeam$1): Promise<void>;
    getCreateIncidentURL(): string;
    getListIncidents(): string;
    getListIncidentsForServiceURL(service: RootlyService$1): string;
    getListIncidentsForFunctionalityURL(functionality: RootlyFunctionality$1): string;
    getListIncidentsForTeamURL(team: RootlyTeam$1): string;
    getServiceDetailsURL(service: RootlyService$1): string;
    getFunctionalityDetailsURL(functionality: RootlyFunctionality$1): string;
    getTeamDetailsURL(team: RootlyTeam$1): string;
    private apiUrl;
    private addAuthHeaders;
}

export { ROOTLY_ANNOTATION_FUNCTIONALITY_AUTO_IMPORT, ROOTLY_ANNOTATION_FUNCTIONALITY_ID, ROOTLY_ANNOTATION_FUNCTIONALITY_SLUG, ROOTLY_ANNOTATION_SERVICE_AUTO_IMPORT, ROOTLY_ANNOTATION_SERVICE_ID, ROOTLY_ANNOTATION_SERVICE_SLUG, ROOTLY_ANNOTATION_TEAM_AUTO_IMPORT, ROOTLY_ANNOTATION_TEAM_ID, ROOTLY_ANNOTATION_TEAM_SLUG, type Rootly, RootlyApi, RootlyApiRef, type RootlyEntity, type RootlyEnvironment, type RootlyFunctionalitiesFetchOpts, type RootlyFunctionalitiesResponse, type RootlyFunctionality, type RootlyFunctionalityResponse, type RootlyIncident, type RootlyIncidentType, type RootlyIncidentsFetchOpts, type RootlyIncidentsResponse, type RootlyRelationship, type RootlyResponderRef, type RootlyService, type RootlyServiceResponse, type RootlyServicesFetchOpts, type RootlyServicesResponse, type RootlySeverity, type RootlyTeam, type RootlyTeamResponse, type RootlyTeamsFetchOpts, type RootlyTeamsResponse, type RootlyUser };
