---
title: Audit Trail Events
kind: documentation
further_reading:
- link: "/account_management/audit_trail/"
  tag: "Documentation"
  text: "Learn more about Audit Trail"
---

## Overview

[Datadog Audit Trail][1] records more than 100 types of audit events from across the Datadog platform. These audit events are categorized into different product categories as event names.

#### Platform Events
- [Access management](#access-management-events)
- [API request](#api-request-events)
- [Authentication](#authentication-events)
- [Dashboard](#dashboard-events)
- [Integration](#integration-events)
- [Monitor](#monitor-events)
- [Notebook](#notebook-events)
- [OAuth](#oauth-events)
- [Organization management](#organization-management-events)
- [Support administration](#support-administration-events)

#### Product-Specific Events
- [Cloud Security Platform](#cloud-security-platform-events)
- [Log Management](#log-management-events)
- [Metrics](#metrics-events)
- [Real User Monitoring](#real-user-monitoring-events)
- [Sensitive Data Scanner](#sensitive-data-scanner-events)
- [Service Level Objectives](#service-level-objectives-slo-events)
- [Synthetic Monitoring](#synthetic-monitoring-events)
- [Reference Tables](#reference-table-events)

See the [Audit Trail documentation][2] for more information on setting up and configuring Audit Trail.

## Audit Events

### Access management events

| Name        | Description of audit event                                          | Query in audit explorer                           |
| ----------- | ------------------------------------------------------------------- | --------------------------------------------------|
| Application key (Service account user) | A user created, modified, or deleted an application key for a service account user. | `@evt.name:"Access Management" @asset.type:application_key` |
| Authentication methods (Org) | A user modified the allowed authentication methods for an org and what the previous and new values are. | `@evt.name:"Access Management" @asset.type:identity_provider` |
| Email       | An email is added, disabled, or verified on the Datadog account as a user in the account. | `@evt.name:"Access Management" @asset.type:user` |
| Role modified  | A role is modified and what the previous and new permissions are. | `@evt.name:"Access Management" @asset.type:role @action:modified` |
| Role created or deleted | A role is created or deleted in the org. | `@evt.name:"Access Management" @asset.type:role @action:(created OR deleted)` |
| Role access request | A user created, responded to, or deleted an access request for a role, and the value of the access request. | `@evt.name:"Access Management" @asset.type:role_request` |
| User's role | A user is added or deleted from a role in the org. | `@evt.name:"Access Management" @asset.type:role @action:modified` |

### API request events

| Name  | Description of audit event                          | Query in audit explorer              |
|-------------| --------------------------------------------------  | ------------------------------------ |
| API Request | An API Request is made across the Datadog platform. | `@evt.name:Request @action:accessed` |

### Authentication events

| Name                    | Description of audit event                                                                    | Query in audit explorer                                 |
|--------------------------------| --------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| API key (Org settings)         | An API key is accessed, listed, created, or deleted in the Organization Settings page.        | `@evt.name:Authentication @asset.type:api_key`          |
| Application key (Org settings) | An application key is accessed, listed, created, or deleted in the Organization Settings page.| `@evt.name:Authentication @asset.type:application_key`  |
| Public API key (Org settings)  | A public API key is accessed, listed, created, or deleted in the Organization Settings page.  | `@evt.name:Authentication @asset.type:public_api_key`   |
| User login                     | A user logs into Datadog and the authentication method used.                                  | `@evt.name:Authentication @action:login`                |

### Cloud Security Platform events
| Name | Description of audit event                                          | Query in audit explorer                           |
| ---- | ------------------------------------------------------------------- | --------------------------------------------------|
| CWS agent rule | A user accessed (fetched) a CWS agent rule in the Cloud Security Platform.| `@evt.name:“Cloud Security Platform” @asset.type:cws_agent_rule @action:accessed` |
| Notification profile | A user created, updated, or deleted a notification profile in the Cloud Security Platform. | `@evt.name:"Cloud Security Platform" @asset.type:notification_profile` |
| Security rule | A user updated, deleted, or created a security rule and the previous and new values for the rule. | `@evt.name:"Cloud Security Platform" @asset.type:security_rule` |
| Security signal | A user modified the state of a signal or assigned the signal to a user, and the previous and new values for the signal. | `@evt.name:"Cloud Security Platform" @asset.type:security_signal @action:modified` |

### Dashboard events

| Name               | Description of audit event                                                                        | Query in audit explorer                                               |
| -------------------| ------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------   |
| Dashboard created | A dashboard is created and the new JSON value for the dashboard.                                    | `@evt.name:Dashboard @asset.type:dashboard @action:created`             |
| Dashboard deleted | A dashboard is deleted and the previous JSON value for the dashboard.                              | `@evt.name:Dashboard @asset.type:dashboard @action:deleted`             |
| Dashboard embedded (Roadie) | A Datadog dashboard is [embedded into a third party][3] and a user views the dashboard.                      | `@evt.name:Dashboard @asset.type:embed @action:accessed`                |
| Dashboard modified | A dashboard is modified and the previous and new JSON values for the dashboard.                   | `@evt.name:Dashboard @asset.type:dashboard @action:modified`            |
| Dashboard user(s) added | A user added user ID(s) that can access a dashboard and the list of new user IDs.                 | `@evt.name:Dashboard @asset.type:dashboard_share_acl @action:created`   |
| Dashboard user(s) deleted | A user deleted user ID(s) that can access a dashboard and the list of the deleted user ID(s).       | `@evt.name:Dashboard @asset.type:dashboard_share_acl @action:deleted`   |
| Public URL accessed | A public dashboard URL is accessed.                                                               | `@evt.name:Dashboard @asset.type:dashboard @action:accessed`            |
|Public URL generated or deleted  | A public URL to view a dashboard is generated or deleted.                             | `@evt.name:Dashboard @asset.type:dashboard_share_link`            |

### Integration events

| Name     | Description of audit event                                          | Query in audit explorer                           |
| -------- | ------------------------------------------------------------------- | --------------------------------------------------|
| Resource | Anytime a resource (channel, service, webhook, account, instance, and so on) is added, modified, or deleted from an integration, and the previous and new values for the configuration. | `@evt.name:Integration @asset.type:integration` |

### Log Management events
| Name | Description of audit event                                          | Query in audit explorer                           |
| ---- | ------------------------------------------------------------------- | --------------------------------------------------|
| Archive configuration | A user created, modified, or deleted the configuration of an archive and the previous and new values for the configuration. | `@evt.name:"Log Management" @asset.type:archive` |
| Custom metric | A user created, modified, or deleted a custom metric for logs and the previous and new values for the custom metric configuration. | `@evt.name:"Log Management" @asset.type:"custom metric"` |
| Exclusion filter configuration | A user created, modified, or deleted the configuration of an exclusion filter and the previous and new values for the configuration. | `@evt.name:"Log Management" @asset.type:"exclusion filter"` |
| Facet | A user created, modified, or deleted a facet in the log explorer and the previous and new values for the facet configuration.| `@evt.name:"Log Management" @asset.type:facet` |
| Historical view | A user created, modified, aborted, or deleted a historical view for logs and the previous and new values for the historical view configuration. | `@evt.name:"Log Management" @asset.type:historical_view` |
| Index configuration | A user created, modified, or deleted the configuration of an index and  the previous and new values for the configuration. | `@evt.name:"Log Management" @asset.type:index` |
| Log pipeline | A user created, modified, or deleted a log pipeline or nested pipeline and the previous and new values for the configuration. | `@evt.name:"Log Management" @asset.type:pipeline` |
| Processor | A user created, modified, or deleted a processor within a pipeline and the previous and new values for the configuration. | `@evt.name:"Log Management" @asset.type:pipeline_processor` |
| Restriction query configuration | A user created, modified, or deleted the configuration of a restriction query in logs and the previous and new values for the configuration. | `@evt.name:"Log Management" @asset.type:restriction_query` |
| Standard attribute configuration | A user created, modified, or deleted the configuration of a standard attribute in logs and the previous and new values for the configuration. | `@evt.name:"Log Management" @asset.type:standard_attribute` |

### Metrics events
| Name | Description of audit event                                          | Query in audit explorer                           |
| ---- |------------------------------------------------------------------- | --------------------------------------------------|
| Custom metric created | A user created a custom metric and the new value for the custom metric configuration. | `@evt.name:Metrics @asset.type:metric @action:created` |
| Custom metric deleted | A user deleted a custom metric and the previous value for the custom metric configuration. | `@evt.name:Metrics @asset.type:metric @action:deleted` |
| Custom metric modified | A user modified a custom metric and the previous and new values for the custom metric configuration. | `@evt.name:Metrics @asset.type:metric @action:modified` |

### Monitor events

| Name             | Description of audit event                                           | Query in audit explorer                                  |
| ---------------- | -------------------------------------------------------------------- | ---------------------------------------------------------|
| Monitor created  | A monitor is created and the new JSON value for the monitor.                 | `@evt.name:Monitor @asset.type:monitor @action:created`  |
| Monitor deleted  | A monitor is deleted and the previous JSON value for the monitor.           | `@evt.name:Monitor @asset.type:monitor @action:deleted`  |
| Monitor modified | A monitor is modified and the previous and new JSON values for the monitor. | `@evt.name:Monitor @asset.type:monitor @action:modified` |
| Monitor resolved | A monitor is resolved.                                               | `@evt.name:Monitor @asset.type:monitor @action:resolved` |

### Notebook events

| Name              | Description of audit event                                            | Query in audit explorer                                     |
| ----------------- | --------------------------------------------------------------------- | ----------------------------------------------------------- |
| Notebook created  | A notebook is created and the new JSON value for the notebook.                 | `@evt.name:Notebook @asset.type:notebook @action:created`   |
| Notebook deleted  | A notebook is deleted and the previous JSON value for the notebook.           | `@evt.name:Notebook @asset.type:notebook @action:deleted`   |
| Notebook modified | A notebook is modified and the previous and new JSON values for the notebook. | `@evt.name:Notebook @asset.type:notebook @action:modified`  |

### OAuth events

| Name         | Description of audit event                                                                    | Query in audit explorer                  |
| ------------ | --------------------------------------------------------------------------------------------- | -----------------------------------------|
| OAuth client | A user created, modified, or deleted an OAuth client and the previous and new values for the OAuth client. | `@evt.name:OAuth @asset.type:oauth_client` |

### Organization management events

| Name                 | Description of audit event                                                       | Query in audit explorer                                           |
| -------------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------|
| Audit Trail settings | A user modified Audit Trail settings and what the previous and new settings are. | `@evt.name:"Organization Settings" @asset.type:audit_logs_settings` |

### Real User Monitoring events
| Name | Description of audit event                                          | Query in audit explorer                           |
| ---- | ------------------------------------------------------------------- | --------------------------------------------------|
| RUM application created | A user created or deleted an application in RUM and the type of the application (Browser, Flutter, IOS, React Native, Android). | `@evt.name:"Real User Monitoring" @asset.type:real_user_monitoring_application @action:(created OR deleted)` |
| RUM application modified | A user modified an application in RUM, the new value of the application, and the type of the application (Browser, Flutter, IOS, React Native, Android). | `@evt.name:“Real User Monitoring” @asset.type:real_user_monitoring_application @action:modified` |

### Sensitive Data Scanner events
| Name | Description of audit event                                          | Query in audit explorer                           |
| ---- | ------------------------------------------------------------------- | --------------------------------------------------|
| Scanning group | A user created, modified, or deleted a scanning group in Sensitive Data Scanner and the previous and new values for the configuration. | `@evt.name:Sensitive Data Scanner @asset.type:sensitive_data_scanner_scanning_group` |
| Scanning rule | A user created, modified, or deleted a scanning rule within a scanning group in Sensitive Data Scanner and the previous and new values for the configuration. | `@evt.name:Sensitive Data Scanner @asset.type:sensitive_data_scanner_scanning_rule` |

### Service Level Objectives (SLO) events

| Name          | Description of audit event                                                                       | Query in audit explorer                  |
| ------------- | ------------------------------------------------------------------------------------------------ | -----------------------------------------|
| SLO           | A user creates, modifies, or deletes an SLO and the previous and new values for the SLO.| `@evt.name:SLO @asset.type:slo`            |
| SLO correction| A user creates, modifies, or deletes an SLO correction and the previous and new values for the SLO correction. | `@evt.name:SLO @asset.type:slo_correction` |

### Support administration events

| Name                 | Description of audit event                                          | Query in audit explorer                           |
| -------------------- | ------------------------------------------------------------------- | --------------------------------------------------|
| Support admin access | A Datadog support admin accesses the account and the reason for it. | `@evt.name:"Support Administration" @action:login`  |

### Synthetic Monitoring events
| Name                     | Description of audit event                                          | Query in audit explorer                           |
| ------------------------ | ------------------------------------------------------------------- | --------------------------------------------------|
| Private location | A user created or deleted a private location for synthetic tests. | `@evt.name:"Synthetics Monitoring" @asset.type:synthetics_private_location` |
| Synthetic test created or deleted | A user created or deleted a synthetic test. | `@evt.name:"Synthetics Monitoring" @asset.type:synthetics_test @action:(created OR deleted)` |
| Synthetic test modified | A user modified a synthetic test and the previous and new values for the configuration. | `@evt.name:"Synthetics Monitoring" @asset.type:synthetics_test @action:modified` |
| Synthetic variable | A user created, modified, or deleted a synthetic variable. | `@evt.name:"Synthetics Monitoring" @asset.type:synthetics_variable` |
| Synthetic settings | A user modified synthetic settings (quotas, PL access) and the previous and new setting values. | `@evt.name:"Synthetics Monitoring" @asset.type:synthetics_settings @action:modified` |

### Reference Table events
| Name                     | Description of audit event                                          | Query in audit explorer                           |
| ------------------------ | ------------------------------------------------------------------- | --------------------------------------------------|
| Reference Table | A user created, deleted, or modified a reference table. | `@evt.name:"Reference Tables" @asset.type:reference_table @action:(created OR deleted OR modified)` |
| Reference Table File | A user uploaded a file or imported a file with a cloud provider for a reference table. | `@evt.name:"Reference Tables" @asset.type:reference_table_file @action:(uploaded OR imported)` |

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/audit-trail
[2]: /account_management/audit_trail/
[3]: https://roadie.io/docs/integrations/datadog/
