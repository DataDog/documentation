---
title: Audit Trail Events
kind: documentation
aliases:
    - /account_management/audit_trail_events/
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
| [Application key][4] (Service account user) | A user created, modified, or deleted an application key for a service account user. | `@evt.name:"Access Management" @asset.type:application_key` |
| [Authentication methods][5] (Org) | A user modified the allowed authentication methods for an org and what the previous and new values are. | `@evt.name:"Access Management" @asset.type:identity_provider` |
| [Email][6]       | An email is added, disabled, or verified on the Datadog account as a user in the account. | `@evt.name:"Access Management" @asset.type:user` |
| [Role modified][7]  | A role is modified and what the previous and new permissions are. | `@evt.name:"Access Management" @asset.type:role @action:modified` |
| [Role created or deleted][8] | A role is created or deleted in the org. | `@evt.name:"Access Management" @asset.type:role @action:(created OR deleted)` |
| [Role access request][9] | A user created, responded to, or deleted an access request for a role, and the value of the access request. | `@evt.name:"Access Management" @asset.type:role_request` |
| [User's role][10] | A user is added or deleted from a role in the org. | `@evt.name:"Access Management" @asset.type:role @action:modified` |

### API request events

| Name  | Description of audit event                          | Query in audit explorer              |
|-------------| --------------------------------------------------  | ------------------------------------ |
| [API Request][11] | An API Request is made across the Datadog platform. | `@evt.name:Request @action:accessed` |

### Authentication events

| Name                    | Description of audit event                                                                    | Query in audit explorer                                 |
|--------------------------------| --------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| [API key][12] (Org settings)         | An API key is accessed, listed, created, or deleted in the Organization Settings page.        | `@evt.name:Authentication @asset.type:api_key`          |
| [Application key][13] (Org settings) | An application key is accessed, listed, created, or deleted in the Organization Settings page.| `@evt.name:Authentication @asset.type:application_key`  |
| [Public API key][14] (Org settings)  | A public API key is accessed, listed, created, or deleted in the Organization Settings page.  | `@evt.name:Authentication @asset.type:public_api_key`   |
| [User login][15]                     | A user logs into Datadog and the authentication method used.                                  | `@evt.name:Authentication @action:login`                |

### Cloud Security Platform events
| Name | Description of audit event                                          | Query in audit explorer                           |
| ---- | ------------------------------------------------------------------- | --------------------------------------------------|
| [CWS agent rule][16] | A user accessed (fetched) a CWS agent rule in the Cloud Security Platform.| `@evt.name:“Cloud Security Platform” @asset.type:cws_agent_rule @action:accessed` |
| [Notification profile][17] | A user created, updated, or deleted a notification profile in the Cloud Security Platform. | `@evt.name:"Cloud Security Platform" @asset.type:notification_profile` |
| [Security rule][18] | A user updated, deleted, or created a security rule and the previous and new values for the rule. | `@evt.name:"Cloud Security Platform" @asset.type:security_rule` |
| [Security signal][19] | A user modified the state of a signal or assigned the signal to a user, and the previous and new values for the signal. | `@evt.name:"Cloud Security Platform" @asset.type:security_signal @action:modified` |

### Dashboard events

| Name               | Description of audit event                                                                        | Query in audit explorer                                               |
| -------------------| ------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------   |
| [Dashboard created][20] | A dashboard is created and the new JSON value for the dashboard.                                    | `@evt.name:Dashboard @asset.type:dashboard @action:created`             |
| [Dashboard deleted][21] | A dashboard is deleted and the previous JSON value for the dashboard.                              | `@evt.name:Dashboard @asset.type:dashboard @action:deleted`             |
| [Dashboard embedded][22] (Roadie) | A Datadog dashboard is [embedded into a third party][3] and a user views the dashboard.                      | `@evt.name:Dashboard @asset.type:embed @action:accessed`                |
| [Dashboard modified][23] | A dashboard is modified and the previous and new JSON values for the dashboard.                   | `@evt.name:Dashboard @asset.type:dashboard @action:modified`            |
| [Dashboard user(s) added][24] | A user added user ID(s) that can access a dashboard and the list of new user IDs.                 | `@evt.name:Dashboard @asset.type:dashboard_share_acl @action:created`   |
| [Dashboard user(s) deleted][25] | A user deleted user ID(s) that can access a dashboard and the list of the deleted user ID(s).       | `@evt.name:Dashboard @asset.type:dashboard_share_acl @action:deleted`   |
| [Public URL accessed][26] | A public dashboard URL is accessed.                                                               | `@evt.name:Dashboard @asset.type:dashboard @action:accessed`            |
|[Public URL generated or deleted][27]  | A public URL to view a dashboard is generated or deleted.                             | `@evt.name:Dashboard @asset.type:dashboard_share_link`            |

### Integration events

| Name     | Description of audit event                                          | Query in audit explorer                           |
| -------- | ------------------------------------------------------------------- | --------------------------------------------------|
| [Resource][28] | Anytime a resource (channel, service, webhook, account, instance, and so on) is added, modified, or deleted from an integration, and the previous and new values for the configuration. | `@evt.name:Integration @asset.type:integration` |

### Log Management events
| Name | Description of audit event                                          | Query in audit explorer                           |
| ---- | ------------------------------------------------------------------- | --------------------------------------------------|
| [Archive configuration][29] | A user created, modified, or deleted the configuration of an archive and the previous and new values for the configuration. | `@evt.name:"Log Management" @asset.type:archive` |
| [Custom metric][30] | A user created, modified, or deleted a custom metric for logs and the previous and new values for the custom metric configuration. | `@evt.name:"Log Management" @asset.type:"custom metric"` |
| [Exclusion filter configuration][31] | A user created, modified, or deleted the configuration of an exclusion filter and the previous and new values for the configuration. | `@evt.name:"Log Management" @asset.type:"exclusion filter"` |
| [Facet][32] | A user created, modified, or deleted a facet in the log explorer and the previous and new values for the facet configuration.| `@evt.name:"Log Management" @asset.type:facet` |
| [Historical view][33] | A user created, modified, aborted, or deleted a historical view for logs and the previous and new values for the historical view configuration. | `@evt.name:"Log Management" @asset.type:historical_view` |
| [Index configuration][34] | A user created, modified, or deleted the configuration of an index and the previous and new values for the configuration. | `@evt.name:"Log Management" @asset.type:index` |
| [Log pipeline][35] | A user created, modified, or deleted a log pipeline or nested pipeline and the previous and new values for the configuration. | `@evt.name:"Log Management" @asset.type:pipeline` |
| [Processor][36] | A user created, modified, or deleted a processor within a pipeline and the previous and new values for the configuration. | `@evt.name:"Log Management" @asset.type:pipeline_processor` |
| [Restriction query configuration][37] | A user created, modified, or deleted the configuration of a restriction query in logs and the previous and new values for the configuration. | `@evt.name:"Log Management" @asset.type:restriction_query` |
| [Standard attribute configuration][38] | A user created, modified, or deleted the configuration of a standard attribute in logs and the previous and new values for the configuration. | `@evt.name:"Log Management" @asset.type:standard_attribute` |

### Metrics events
| Name | Description of audit event                                          | Query in audit explorer                           |
| ---- |------------------------------------------------------------------- | --------------------------------------------------|
| [Custom metric created][39] | A user created a custom metric and the new value for the custom metric configuration. | `@evt.name:Metrics @asset.type:metric @action:created` |
| [Custom metric deleted][40] | A user deleted a custom metric and the previous value for the custom metric configuration. | `@evt.name:Metrics @asset.type:metric @action:deleted` |
| [Custom metric modified][41] | A user modified a custom metric and the previous and new values for the custom metric configuration. | `@evt.name:Metrics @asset.type:metric @action:modified` |

### Monitor events

| Name             | Description of audit event                                           | Query in audit explorer                                  |
| ---------------- | -------------------------------------------------------------------- | ---------------------------------------------------------|
| [Monitor created][42]  | A monitor is created and the new JSON value for the monitor.                 | `@evt.name:Monitor @asset.type:monitor @action:created`  |
| [Monitor deleted][43]  | A monitor is deleted and the previous JSON value for the monitor.           | `@evt.name:Monitor @asset.type:monitor @action:deleted`  |
| [Monitor modified][44] | A monitor is modified and the previous and new JSON values for the monitor. | `@evt.name:Monitor @asset.type:monitor @action:modified` |
| [Monitor resolved][45] | A monitor is resolved.                                               | `@evt.name:Monitor @asset.type:monitor @action:resolved` |

### Notebook events

| Name              | Description of audit event                                            | Query in audit explorer                                     |
| ----------------- | --------------------------------------------------------------------- | ----------------------------------------------------------- |
| [Notebook created][46]  | A notebook is created and the new JSON value for the notebook.                 | `@evt.name:Notebook @asset.type:notebook @action:created`   |
| [Notebook deleted][47]  | A notebook is deleted and the previous JSON value for the notebook.           | `@evt.name:Notebook @asset.type:notebook @action:deleted`   |
| [Notebook modified][48] | A notebook is modified and the previous and new JSON values for the notebook. | `@evt.name:Notebook @asset.type:notebook @action:modified`  |

### OAuth events

| Name         | Description of audit event                                                                    | Query in audit explorer                  |
| ------------ | --------------------------------------------------------------------------------------------- | -----------------------------------------|
| [OAuth client][49] | A user created, modified, or deleted an OAuth client and the previous and new values for the OAuth client. | `@evt.name:OAuth @asset.type:oauth_client` |

### Organization management events

| Name                 | Description of audit event                                                       | Query in audit explorer                                           |
| -------------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------|
| [Audit Trail settings][50] | A user modified Audit Trail settings and what the previous and new settings are. | `@evt.name:"Organization Management" @asset.type:audit_logs_settings` |

### Real User Monitoring events
| Name | Description of audit event                                          | Query in audit explorer                           |
| ---- | ------------------------------------------------------------------- | --------------------------------------------------|
| [RUM application created][51] | A user created or deleted an application in RUM and the type of the application (Browser, Flutter, IOS, React Native, Android). | `@evt.name:"Real User Monitoring" @asset.type:real_user_monitoring_application @action:(created OR deleted)` |
| [RUM application modified][52] | A user modified an application in RUM, the new value of the application, and the type of the application (Browser, Flutter, IOS, React Native, Android). | `@evt.name:“Real User Monitoring” @asset.type:real_user_monitoring_application @action:modified` |

### Sensitive Data Scanner events
| Name | Description of audit event                                          | Query in audit explorer                           |
| ---- | ------------------------------------------------------------------- | --------------------------------------------------|
| [Scanning group][53] | A user created, modified, or deleted a scanning group in Sensitive Data Scanner and the previous and new values for the configuration. | `@evt.name:"Sensitive Data Scanner" @asset.type:sensitive_data_scanner_scanning_group` |
| [Scanning rule][54] | A user created, modified, or deleted a scanning rule within a scanning group in Sensitive Data Scanner and the previous and new values for the configuration. | `@evt.name:"Sensitive Data Scanner" @asset.type:sensitive_data_scanner_scanning_rule` |

### Service Level Objectives (SLO) events

| Name          | Description of audit event                                                                       | Query in audit explorer                  |
| ------------- | ------------------------------------------------------------------------------------------------ | -----------------------------------------|
| [SLO][55]           | A user creates, modifies, or deletes an SLO and the previous and new values for the SLO.| `@evt.name:SLO @asset.type:slo`            |
| [SLO correction][56]| A user creates, modifies, or deletes an SLO correction and the previous and new values for the SLO correction. | `@evt.name:SLO @asset.type:slo_correction` |

### Support administration events

| Name                 | Description of audit event                                          | Query in audit explorer                           |
| -------------------- | ------------------------------------------------------------------- | --------------------------------------------------|
| [Support admin access][57] | A Datadog support admin accesses the account and the reason for it. | `@evt.name:"Support Administration" @action:login`  |

### Synthetic Monitoring events
| Name                     | Description of audit event                                          | Query in audit explorer                           |
| ------------------------ | ------------------------------------------------------------------- | --------------------------------------------------|
| [Private location][58] | A user created or deleted a private location for synthetic tests. | `@evt.name:"Synthetics Monitoring" @asset.type:synthetics_private_location` |
| [Synthetic test created or deleted][59] | A user created or deleted a synthetic test. | `@evt.name:"Synthetics Monitoring" @asset.type:synthetics_test @action:(created OR deleted)` |
| [Synthetic test modified][60] | A user modified a synthetic test and the previous and new values for the configuration. | `@evt.name:"Synthetics Monitoring" @asset.type:synthetics_test @action:modified` |
| [Synthetic variable][61] | A user created, modified, or deleted a synthetic variable. | `@evt.name:"Synthetics Monitoring" @asset.type:synthetics_variable` |
| [Synthetic settings][62] | A user modified synthetic settings (quotas, PL access) and the previous and new setting values. | `@evt.name:"Synthetics Monitoring" @asset.type:synthetics_settings @action:modified` |

### Reference Table events
| Name                     | Description of audit event                                          | Query in audit explorer                           |
| ------------------------ | ------------------------------------------------------------------- | --------------------------------------------------|
| [Reference Table][63] | A user created, deleted, or modified a reference table. | `@evt.name:"Reference Tables" @asset.type:reference_table @action:(created OR deleted OR modified)` |
| [Reference Table File][64] | A user uploaded a file or imported a file with a cloud provider for a reference table. | `@evt.name:"Reference Tables" @asset.type:reference_table_file @action:(uploaded OR imported)` |

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/audit-trail
[2]: /account_management/audit_trail/
[3]: https://roadie.io/docs/integrations/datadog/
[4]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Access%20Management%22%20%40asset.type%3Aapplication_key
[5]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Access%20Management%22%20%40asset.type%3Aidentity_provider
[6]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Access%20Management%22%20%40asset.type%3Auser
[7]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Access%20Management%22%20%40asset.type%3Arole%20%40action%3Amodified
[8]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Access%20Management%22%20%40asset.type%3Arole%20%40action%3A%28created%20OR%20deleted%29
[9]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Access%20Management%22%20%40asset.type%3Arole_request
[10]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Access%20Management%22%20%40asset.type%3Arole%20%40action%3Amodified
[11]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ARequest%20%40action%3Aaccessed
[12]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AAuthentication%20%40asset.type%3Aapi_key
[13]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AAuthentication%20%40asset.type%3Aapplication_key
[14]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AAuthentication%20%40asset.type%3Apublic_api_key
[15]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AAuthentication%20%40action%3Alogin
[16]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%E2%80%9CCloud%20Security%20Platform%E2%80%9D%20%40asset.type%3Acws_agent_rule%20%40action%3Aaccessed
[17]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Cloud%20Security%20Platform%22%20%40asset.type%3Anotification_profile
[18]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Cloud%20Security%20Platform%22%20%40asset.type%3Asecurity_rule
[19]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Cloud%20Security%20Platform%22%20%40asset.type%3Asecurity_signal%20%40action%3Amodified
[20]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ADashboard%20%40asset.type%3Adashboard%20%40action%3Acreated
[21]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ADashboard%20%40asset.type%3Adashboard%20%40action%3Adeleted
[22]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ADashboard%20%40asset.type%3Aembed%20%40action%3Aaccessed
[23]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ADashboard%20%40asset.type%3Adashboard%20%40action%3Amodified
[24]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ADashboard%20%40asset.type%3Adashboard_share_acl%20%40action%3Acreated
[25]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ADashboard%20%40asset.type%3Adashboard_share_acl%20%40action%3Adeleted
[26]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ADashboard%20%40asset.type%3Adashboard%20%40action%3Aaccessed
[27]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ADashboard%20%40asset.type%3Adashboard_share_link
[28]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AIntegration%20%40asset.type%3Aintegration
[29]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Log%20Management%22%20%40asset.type%3Aarchive
[30]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Log%20Management%22%20%40asset.type%3A%22custom%20metric%22
[31]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Log%20Management%22%20%40asset.type%3A%22exclusion%20filter%22
[32]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Log%20Management%22%20%40asset.type%3Afacet
[33]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Log%20Management%22%20%40asset.type%3Ahistorical_view
[34]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Log%20Management%22%20%40asset.type%3Aindex
[35]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Log%20Management%22%20%40asset.type%3Apipeline
[36]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Log%20Management%22%20%40asset.type%3Apipeline_processor
[37]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Log%20Management%22%20%40asset.type%3Arestriction_query
[38]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Log%20Management%22%20%40asset.type%3Astandard_attribute
[39]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AMetrics%20%40asset.type%3Ametric%20%40action%3Acreated
[40]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AMetrics%20%40asset.type%3Ametric%20%40action%3Adeleted
[41]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AMetrics%20%40asset.type%3Ametric%20%40action%3Amodified
[42]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AMonitor%20%40asset.type%3Amonitor%20%40action%3Acreated
[43]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AMonitor%20%40asset.type%3Amonitor%20%40action%3Adeleted
[44]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AMonitor%20%40asset.type%3Amonitor%20%40action%3Amodified
[45]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AMonitor%20%40asset.type%3Amonitor%20%40action%3Aresolved
[46]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ANotebook%20%40asset.type%3Anotebook%20%40action%3Acreated
[47]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ANotebook%20%40asset.type%3Anotebook%20%40action%3Adeleted
[48]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ANotebook%20%40asset.type%3Anotebook%20%40action%3Amodified
[49]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AOAuth%20%40asset.type%3Aoauth_client
[50]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Organization+Management%22+%40asset.type%3Aaudit_logs_settings
[51]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Real%20User%20Monitoring%22%20%40asset.type%3Areal_user_monitoring_application%20%40action%3A%28created%20OR%20deleted%29
[52]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%E2%80%9CReal%20User%20Monitoring%E2%80%9D%20%40asset.type%3Areal_user_monitoring_application%20%40action%3Amodified
[53]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Sensitive%20Data%20Scanner%22%20%40asset.type%3Asensitive_data_scanner_scanning_group
[54]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Sensitive%20Data%20Scanner%22%20%40asset.type%3Asensitive_data_scanner_scanning_rule
[55]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ASLO%20%40asset.type%3Aslo
[56]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ASLO%20%40asset.type%3Aslo_correction
[57]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Support%20Administration%22%20%40action%3Alogin
[58]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Synthetics%20Monitoring%22%20%40asset.type%3Asynthetics_private_location
[59]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Synthetics%20Monitoring%22%20%40asset.type%3Asynthetics_test%20%40action%3A%28created%20OR%20deleted%29
[60]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Synthetics%20Monitoring%22%20%40asset.type%3Asynthetics_test%20%40action%3Amodified
[61]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Synthetics%20Monitoring%22%20%40asset.type%3Asynthetics_variable
[62]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Synthetics%20Monitoring%22%20%40asset.type%3Asynthetics_settings%20%40action%3Amodified
[63]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Reference%20Tables%22%20%40asset.type%3Areference_table%20%40action%3A%28created%20OR%20deleted%20OR%20modified%29
[64]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Reference%20Tables%22%20%40asset.type%3Areference_table_file%20%40action%3A%28uploaded%20OR%20imported%29
