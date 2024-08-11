import { Entity as BackstageEntity } from '@backstage/catalog-model';

/** @public */
export interface RootlyService {
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
export interface RootlyFunctionality {
  id: string;
  type: string;
  attributes: {
    name: string;
    slug: string;
    description: string | undefined;
    public_description: string | undefined;
    color: string;
    user: { data: RootlyUser } | undefined;
    severity: { data: RootlySeverity } | undefined;
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
export interface RootlyTeam {
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
export interface RootlyRelationship {
  id: string;
  type: string;
  data: [{ id: string; type: string }];
}

/** @public */
export interface RootlyUser {
  id: string;
  type: string;
  attributes: {
    name: string;
    email: string;
    full_name: string;
  };
}

/** @public */
export interface RootlyIncidentType {
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
export interface RootlyEnvironment {
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
export interface RootlySeverity {
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
export interface RootlyResponderRef {
  id: string;
  type: string; // "team", "user"
}

/** @public */
export interface RootlyIncident {
  id: string;
  type: string;
  attributes: {
    title: string;
    slug: string;
    summary: string | undefined;
    status: string;
    labels: string[];
    severity: { data: RootlySeverity } | undefined;
    user: { data: RootlyUser } | undefined;
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
    },
  ];
}

/** @public */
export interface RootlyEntity extends BackstageEntity {
  linkedService: RootlyService | undefined;
  linkedFunctionality: RootlyFunctionality | undefined;
  linkedTeam: RootlyTeam | undefined;
}