import { RootlyEntity, RootlyIncident, RootlyService, RootlyFunctionality, RootlyTeam } from '@rootly/backstage-plugin-common';
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
export interface Rootly {
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
type Options = {
    /**
     * apiProxyPath used to access Rootly API through proxy
     * Example: https://localhost:7021/rootly/api
     */
    apiProxyPath: Promise<string>;
    /**
     * apiToken used to access Rootly API through proxy
     * Example: Bearer 12345678910
     */
    apiToken: Promise<{
        token?: string | undefined;
    }>;
};
/**
 * API to talk to Rootly.
 */
export declare class RootlyApi {
    private readonly apiProxyPath;
    private readonly apiToken;
    constructor(opts: Options);
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
    importServiceEntity(entity: RootlyEntity): Promise<RootlyServiceResponse>;
    updateServiceEntity(entity: RootlyEntity, service: RootlyService, old_service?: RootlyService): Promise<RootlyServiceResponse>;
    deleteServiceEntity(service: RootlyService): Promise<void>;
    importFunctionalityEntity(entity: RootlyEntity): Promise<RootlyFunctionalityResponse>;
    updateFunctionalityEntity(entity: RootlyEntity, functionality: RootlyFunctionality, old_functionality?: RootlyFunctionality): Promise<RootlyFunctionalityResponse>;
    deleteFunctionalityEntity(functionality: RootlyFunctionality): Promise<void>;
    importTeamEntity(entity: RootlyEntity): Promise<RootlyTeamResponse>;
    updateTeamEntity(entity: RootlyEntity, team: RootlyTeam, old_team?: RootlyTeam): Promise<RootlyTeamResponse>;
    deleteTeamEntity(team: RootlyTeam): Promise<void>;
    static getCreateIncidentURL(): string;
    static getListIncidents(): string;
    static getListIncidentsForServiceURL(service: RootlyService): string;
    static getListIncidentsForFunctionalityURL(functionality: RootlyFunctionality): string;
    static getListIncidentsForTeamURL(team: RootlyTeam): string;
    static getServiceDetailsURL(service: RootlyService): string;
    static getFunctionalityDetailsURL(functionality: RootlyFunctionality): string;
    static getTeamDetailsURL(team: RootlyTeam): string;
}
export {};
