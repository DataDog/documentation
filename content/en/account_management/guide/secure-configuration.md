---
title: Recommended Secure Configuration
description: Learn how to securely configure and manage the Datadog Admin Role, including
  permissions, API access, and recommended security practices.
further_reading:
- link: "account_management/rbac/permissions/"
  tag: "Documentation"
  text: "Datadog Role Permissions"
---

## Datadog Admin Role overview

The Datadog Admin Role is the highest-privileged managed role within a Datadog organization. It is designed for a limited number of trusted users with the following responsibilities:
- Organization-wide configuration
- Access control and identity management
- Security posture management
- Billing and usage oversight
- Governance and compliance configuration

The Admin Role is a managed role, which means it has the following properties:
- It is provided out-of-the-box in every Datadog organization.
- It automatically receives new permissions when new Datadog features are released.
- It inherits all permissions from lower-privilege managed roles (Standard and Read-Only).
- It cannot be deleted or decommissioned, but all users can be removed from the role.

Because of its breadth of access, Datadog Admin Role access should be tightly controlled and regularly reviewed.

## Datadog Admin Role capabilities

At a high level, Datadog Admin Role has the following capabilities:
- Manage users, roles, and authentication
- Configure organization-level settings
- Create, rotate, and delete API and application keys
- Control access to sensitive telemetry
- Configure billing, usage attribution, and notifications
- Enable and configure governance tooling
- Delete or retain logs and RUM data
- Configure APM ingestion and retention controls
- Manage fleet-wide agent upgrades and policies
- Configure Synthetic private locations
- Manage security pipelines and sensitive data scanning

## Security considerations

The Datadog Admin role can perform the following sensitive actions:
- Delete telemetry and monitoring data
- Modify ingestion and retention policies
- Control billing and subscription settings
- Change authentication and SSO configuration
- Create and rotate API keys
- Unmask sensitive data

Therefore, Datadog strongly recommends that customers take the following precautions:
- Limit Datadog Admin Role access to a small number of trusted users
- Use custom roles for day-to-day operational access
- Enable Audit Trail to monitor Datadog Admin Role activity
- Regularly review user access, including the Datadog Admin Role
- Separate duties wherever possible, assigning the least amount of privilege possible for associated job functions

## Datadog Admin Role permissions

The following permissions are assigned to the Datadog Admin Role by default. The Datadog Admin Role also inherits all Standard and Read-Only permissions.

### Access and organization management

| Permission                 | Description                                                                      |
|----------------------------|----------------------------------------------------------------------------------|
| `user_access_manage`       | Manage users, disable users. Manage roles, SAML mappings, and sensitive datasets |
| `service_account_write`    | Create and disable service accounts                                              |
| `org_management`           | Edit organization configuration and security settings                            |
| `org_connections_write`    | Manage organization connections                                                  |
| `governance_console_write` | Enforce governance policies through the Governance Console                       |

### API and application keys

| Permission           | Description                           |
|----------------------|---------------------------------------|
| `org_app_keys_write` | Manage application keys for all users |
| `api_keys_write`     | Create and rename API keys            |
| `api_keys_delete`    | Delete API keys                       |

### Billing and usage

| Permission                           | Description                             |
|--------------------------------------|-----------------------------------------|
| `billing_read`                       | View billing details                    |
| `billing_edit`                       | Manage subscription and payment methods |
| `usage_read`                         | View usage and attribution              |
| `usage_edit`                         | Manage usage attribution configuration  |
| `usage_notifications_read`           | View usage notification settings        |
| `usage_notifications_write`          | Configure usage notifications           |
| `cloud_cost_report_schedules_manage` | Manage cloud cost report schedules      |

### Audit and compliance

| Permission                       | Description                         |
|----------------------------------|-------------------------------------|
| `audit_logs_read`                | View Audit Trail                    |
| `audit_logs_write`               | Configure Audit Trail               |
| `data_scanner_read`              | View Sensitive Data Scanner results |
| `data_scanner_write`             | Configure Sensitive Data Scanner    |
| `data_scanner_unmask`            | Unmask sensitive data               |
| `disaster_recovery_status_write` | Update disaster recovery status     |

### Log Management

| Permission                    | Description                    |
|-------------------------------|--------------------------------|
| `logs_write_archives`         | Create and manage log archives |
| `logs_delete_data`            | Delete log data or indexes     |
| `logs_write_forwarding_rules` | Configure log forwarding rules |
| `flex_logs_config_write`      | Manage Flex Logs configuration |

### APM controls

| Permission                               | Description                       |
|------------------------------------------|-----------------------------------|
| `apm_retention_filter_write`             | Manage trace retention filters    |
| `apm_service_ingest_write`               | Configure APM ingestion settings  |
| `apm_apdex_manage_write`                 | Manage Apdex thresholds           |
| `apm_tag_management_write`               | Configure APM tag management      |
| `apm_primary_operation_write`            | Modify primary operations         |
| `apm_service_renaming_write`             | Manage service renaming           |
| `debugger_capture_variables`             | Configure dynamic instrumentation |
| `error_tracking_settings_write`          | Configure Error Tracking          |
| `error_tracking_exclusion_filters_write` | Configure error exclusion filters |

### Security Monitoring

| Permission                                    | Description                                   |
|-----------------------------------------------|-----------------------------------------------|
| `security_pipelines_write`                    | Manage Security Pipelines                     |
| `security_monitoring_cws_agent_rules_actions` | Manage Cloud Workload Security rules          |
| `bits_security_analyst_write`                 | Run Bits AI security investigations (Preview) |
| `bits_security_analyst_config_write`          | Configure Bits AI settings (Preview)          |
| `monitor_config_policy_write`                 | Manage monitor configuration policies         |

### Observability Pipelines and Fleet Automation

| Permission                       | Description                           |
|----------------------------------|---------------------------------------|
| `observability_pipelines_delete` | Delete observability pipelines        |
| `observability_pipelines_deploy` | Deploy observability pipelines        |
| `agent_upgrade_write`            | Upgrade agents using Fleet Automation |
| `fleet_policies_write`           | Create and deploy agent policies      |

### Synthetic Monitoring and RUM

| Permission                          | Description                         |
|-------------------------------------|-------------------------------------|
| `synthetics_private_location_write` | Manage Synthetic private locations  |
| `rum_delete_data`                   | Delete RUM data                     |
| `rum_extend_retention`              | Extend RUM session replay retention |
| `rum_settings_write`                | Configure RUM settings              |

### Software Delivery

| Permission                       | Description                         |
|----------------------------------|-------------------------------------|
| `ci_provider_settings_write`     | Configure CI provider settings      |
| `ci_ingestion_control_write`     | Configure CI ingestion filters      |
| `quality_gate_rules_write`       | Manage PR gate rules                |
| `static_analysis_settings_write` | Configure static analysis settings |

### Network Monitoring and Infrastructure Monitoring

| Permission                   | Description                  |
|------------------------------|------------------------------|
| `ndm_device_profiles_edit`   | Edit network device profiles |
| `ndm_geomap_locations_write` | Manage NDM geomap locations  |
| `ndm_device_config_read`     | Read device configurations   |

### On-call and Status Pages

| Permission                    | Description                           |
|-------------------------------|---------------------------------------|
| `on_call_admin`               | Manage advanced On-Call configuration |
| `status_pages_settings_write` | Configure Status Pages                |
| `status_pages_incident_write` | Publish status page notices           |

## API access to the Datadog Admin Role

Datadog provides a public REST API that allows organizations to programmatically view and adjust many security-related configurations associated with the Datadog Admin Role. The calling API key must have sufficient RBAC permissions (typically administrator-level access).

API access enables customers to implement automation, governance workflows, and policy-as-code controls.

### API authentication

All API requests require the following:
- API key: Identifies the organization
- Application key: Scoped to a user and governed by RBAC permissions

The API follows Datadog RBAC exactly as the UI does. If a key does not have admin permissions, it cannot modify admin-level settings.

### Manage the Datadog Admin Role through the API

#### View roles and permissions

You can list all roles in the organization (including the Datadog Admin Role):
{{< code-block lang="shell">}}
curl -X GET "https://api.datadoghq.com/api/v2/roles" \
 -H "DD-API-KEY: <api_key>" \
 -H "DD-APPLICATION-KEY: <app_key>"
{{< /code-block >}}

This endpoint allows organizations to:
- Audit the Datadog Admin Role
- Inspect assigned permissions
- Validate governance posture

#### Add or remove users from the Datadog Admin Role

User role assignments (including admin membership) can be managed through the API:
{{< code-block lang="shell">}}
curl -X PATCH "https://api.datadoghq.com/api/v2/users/<user_id>" \
 -H "DD-API-KEY: <api_key>" \
 -H "DD-APPLICATION-KEY: <app_key>" \
 -H "Content-Type: application/json" \
 -d '{
   "data": {
     "type": "users",
     "id": "<user_id>",
     "attributes": {
       "role_ids": ["<admin_role_id>"]
     }
   }
 }'
{{< /code-block >}}

This endpoint enables:
- Automated access reviews
- Just-in-time elevation workflows
- Removal of administrator access during offboarding

#### Manage API and application keys

Datadog administrators can create, rotate, or delete API and application keys through the API.

##### Create an application key
{{< code-block lang="shell">}}
curl -X POST "https://api.datadoghq.com/api/v1/application_key" \
 -H "DD-API-KEY: <api_key>" \
 -H "DD-APPLICATION-KEY: <app_key>" \
 -H "Content-Type: application/json" \
 -d '{
   "name": "Example Key"
 }'
{{< /code-block >}}

##### Delete an application key
{{< code-block lang="shell">}}
curl -X DELETE "https://api.datadoghq.com/api/v1/application_key/<app_key_id>" \
 -H "DD-API-KEY: <api_key>" \
 -H "DD-APPLICATION-KEY: <app_key>"
{{< /code-block >}}

These capabilities support:
- Automated key rotation
- Compliance-driven access controls
- Programmatic security hardening

#### Audit admin activity through the API
Audit Trail events can be searched programmatically:

{{< code-block lang="shell">}}
curl -X POST "https://api.datadoghq.com/api/v2/audit/events/search" \
 -H "DD-API-KEY: <api_key>" \
 -H "DD-APPLICATION-KEY: <app_key>" \
 -H "Content-Type: application/json" \
 -d '{
   "filter": {
     "query": "usr.role:admin"
   }
 }'
{{< /code-block >}}

This endpoint enables:
- Automated administrator activity review
- SIEM export workflows
- Governance reporting

## UI and IdP-managed security settings

Several authentication and identity settings must be managed through the Datadog UI or Identity Provider (IdP). You cannot manage the following settings through the API:

- SSO configuration
- MFA enforcement policy
- Password complexity policy
- SAML configuration

Typically, administrators manage these controls within the Datadog organization settings in the UI or through their identity provider (for example, Okta or Azure AD).

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
