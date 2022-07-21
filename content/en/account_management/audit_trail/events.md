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
- [APM](#apm-events)
- [Metrics](#metrics-events)
- [Real User Monitoring](#real-user-monitoring-events)
- [Sensitive Data Scanner](#sensitive-data-scanner-events)
- [Service Level Objectives](#service-level-objectives-slo-events)
- [Synthetic Monitoring](#synthetic-monitoring-events)
- [Reference Tables](#reference-table-events)
- [CI Visibility](#ci-visibility-events)

See the [Audit Trail documentation][2] for more information on setting up and configuring Audit Trail.

## Audit Events

### Access management events

| Name        | Description of audit event                                          | Query in audit explorer                           |
| ----------- | ------------------------------------------------------------------- | --------------------------------------------------|
| [Application key][3] (Service account user) | A user created, modified, or deleted an application key for a service account user. | `@evt.name:"Access Management" @asset.type:application_key` |
| [Authentication methods][4] (Org) | A user modified the allowed authentication methods for an org and what the previous and new values are. | `@evt.name:"Access Management" @asset.type:identity_provider` |
| [Email][5]       | An email is added, disabled, or verified on the Datadog account as a user in the account. | `@evt.name:"Access Management" @asset.type:user` |
| [Role modified][6]  | A role is modified and what the previous and new permissions are. | `@evt.name:"Access Management" @asset.type:role @action:modified` |
| [Role created or deleted][7] | A role is created or deleted in the org. | `@evt.name:"Access Management" @asset.type:role @action:(created OR deleted)` |
| [Role access request][8] | A user created, responded to, or deleted an access request for a role, and the value of the access request. | `@evt.name:"Access Management" @asset.type:role_request` |
| [User's role][6] | A user is added or deleted from a role in the org. | `@evt.name:"Access Management" @asset.type:role @action:modified` |

### API request events

| Name  | Description of audit event                          | Query in audit explorer              |
|-------------| --------------------------------------------------  | ------------------------------------ |
| [API Request][9] | An API Request is made across the Datadog platform. | `@evt.name:Request @action:accessed` |

### Authentication events

| Name                    | Description of audit event                                                                    | Query in audit explorer                                 |
|--------------------------------| --------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| [API key][10] (Org settings)         | An API key is accessed, listed, created, or deleted in the Organization Settings page.        | `@evt.name:Authentication @asset.type:api_key`          |
| [Application key][11] (Org settings) | An application key is accessed, listed, created, or deleted in the Organization Settings page.| `@evt.name:Authentication @asset.type:application_key`  |
| [Public API key][12] (Org settings)  | A public API key is accessed, listed, created, or deleted in the Organization Settings page.  | `@evt.name:Authentication @asset.type:public_api_key`   |
| [User login][13]                     | A user logs into Datadog and the authentication method used.                                  | `@evt.name:Authentication @action:login`                |

### Cloud Security Platform events
| Name | Description of audit event                                          | Query in audit explorer                           |
| ---- | ------------------------------------------------------------------- | --------------------------------------------------|
| [CWS agent rule][14] | A user accessed (fetched) a CWS agent rule in the Cloud Security Platform.| `@evt.name:“Cloud Security Platform” @asset.type:cws_agent_rule @action:accessed` |
| [Notification profile][15] | A user created, updated, or deleted a notification profile in the Cloud Security Platform. | `@evt.name:"Cloud Security Platform" @asset.type:notification_profile` |
| [Security rule][16] | A user updated, deleted, or created a security rule and the previous and new values for the rule. | `@evt.name:"Cloud Security Platform" @asset.type:security_rule` |
| [Security signal][17] | A user modified the state of a signal or assigned the signal to a user, and the previous and new values for the signal. | `@evt.name:"Cloud Security Platform" @asset.type:security_signal @action:modified` |

### Dashboard events

| Name               | Description of audit event                                                                        | Query in audit explorer                                               |
| -------------------| ------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------   |
| [Dashboard created][18] | A dashboard is created and the new JSON value for the dashboard.                                    | `@evt.name:Dashboard @asset.type:dashboard @action:created`             |
| [Dashboard deleted][19] | A dashboard is deleted and the previous JSON value for the dashboard.                              | `@evt.name:Dashboard @asset.type:dashboard @action:deleted`             |
| [Dashboard embedded][20] (Roadie) | A Datadog dashboard is [embedded into a third party][21] and a user views the dashboard.                      | `@evt.name:Dashboard @asset.type:embed @action:accessed`                |
| [Dashboard modified][22] | A dashboard is modified and the previous and new JSON values for the dashboard.                   | `@evt.name:Dashboard @asset.type:dashboard @action:modified`            |
| [Dashboard user(s) added][23] | A user added user ID(s) that can access a dashboard and the list of new user IDs.                 | `@evt.name:Dashboard @asset.type:dashboard_share_acl @action:created`   |
| [Dashboard user(s) deleted][24] | A user deleted user ID(s) that can access a dashboard and the list of the deleted user ID(s).       | `@evt.name:Dashboard @asset.type:dashboard_share_acl @action:deleted`   |
| [Public URL accessed][25] | A public dashboard URL is accessed.                                                               | `@evt.name:Dashboard @asset.type:dashboard @action:accessed`            |
|[Public URL generated or deleted][26]  | A public URL to view a dashboard is generated or deleted.                             | `@evt.name:Dashboard @asset.type:dashboard_share_link`            |

### Integration events

| Name     | Description of audit event                                          | Query in audit explorer                           |
| -------- | ------------------------------------------------------------------- | --------------------------------------------------|
| [Resource][27] | Anytime a resource (channel, service, webhook, account, instance, and so on) is added, modified, or deleted from an integration, and the previous and new values for the configuration. | `@evt.name:Integration @asset.type:integration` |

### Log Management events
| Name | Description of audit event                                          | Query in audit explorer                           |
| ---- | ------------------------------------------------------------------- | --------------------------------------------------|
| [Archive configuration][28] | A user created, modified, or deleted the configuration of an archive and the previous and new values for the configuration. | `@evt.name:"Log Management" @asset.type:archive` |
| [Custom metric][29] | A user created, modified, or deleted a custom metric for logs and the previous and new values for the custom metric configuration. | `@evt.name:"Log Management" @asset.type:"custom metric"` |
| [Exclusion filter configuration][30] | A user created, modified, or deleted the configuration of an exclusion filter and the previous and new values for the configuration. | `@evt.name:"Log Management" @asset.type:"exclusion filter"` |
| [Facet][31] | A user created, modified, or deleted a facet in the log explorer and the previous and new values for the facet configuration.| `@evt.name:"Log Management" @asset.type:facet` |
| [Historical view][32] | A user created, modified, aborted, or deleted a historical view for logs and the previous and new values for the historical view configuration. | `@evt.name:"Log Management" @asset.type:historical_view` |
| [Index configuration][33] | A user created, modified, or deleted the configuration of an index and the previous and new values for the configuration. | `@evt.name:"Log Management" @asset.type:index` |
| [Log pipeline][34] | A user created, modified, or deleted a log pipeline or nested pipeline and the previous and new values for the configuration. | `@evt.name:"Log Management" @asset.type:pipeline` |
| [Processor][35] | A user created, modified, or deleted a processor within a pipeline and the previous and new values for the configuration. | `@evt.name:"Log Management" @asset.type:pipeline_processor` |
| [Restriction query configuration][36] | A user created, modified, or deleted the configuration of a restriction query in logs and the previous and new values for the configuration. | `@evt.name:"Log Management" @asset.type:restriction_query` |
| [Standard attribute configuration][37] | A user created, modified, or deleted the configuration of a standard attribute in logs and the previous and new values for the configuration. | `@evt.name:"Log Management" @asset.type:standard_attribute` |

### APM events
| Name | Description of audit event                                          | Query in audit explorer                           |
| ---- | ------------------------------------------------------------------- | --------------------------------------------------|
| [Retention filter][38] | A user created, modified, or deleted a [retention filter][39] and the previous and/or new values for the retention filter configuration. | `@evt.name:APM @asset.type:retention_filter` |
| [Span-based metric][40] | A user created, modified, or deleted a [span-based metric][41] and the previous and/or new values for the metric configuration. | `@evt.name:APM @asset.type:custom_metrics` |
| [Facet][42] | A user created, modified, or deleted a [facet][43] and the previous and/or new values for the facet configuration. | `@evt.name:APM @asset.type:facet` |
| [Primary operation name][44] | A user created, modified, or deleted the [primary operation name][45] of a service and the previous and/or new values for the configuration. | `@evt.name:APM @asset.type:service_operation_name` |
| [Second Primary tag][46] | A user added, modified, or deleted the [second primary tag][47] and the previous and/or new values for the configuration.  | `@evt.name:APM @asset.type:second_primary_tag` |

### Metrics events
| Name | Description of audit event                                          | Query in audit explorer                           |
| ---- |------------------------------------------------------------------- | --------------------------------------------------|
| [Custom metric created][48] | A user created a custom metric and the new value for the custom metric configuration. | `@evt.name:Metrics @asset.type:metric @action:created` |
| [Custom metric deleted][49] | A user deleted a custom metric and the previous value for the custom metric configuration. | `@evt.name:Metrics @asset.type:metric @action:deleted` |
| [Custom metric modified][50] | A user modified a custom metric and the previous and new values for the custom metric configuration. | `@evt.name:Metrics @asset.type:metric @action:modified` |

### Monitor events

| Name             | Description of audit event                                           | Query in audit explorer                                  |
| ---------------- | -------------------------------------------------------------------- | ---------------------------------------------------------|
| [Monitor created][51]  | A monitor is created and the new JSON value for the monitor.                 | `@evt.name:Monitor @asset.type:monitor @action:created`  |
| [Monitor deleted][52]  | A monitor is deleted and the previous JSON value for the monitor.           | `@evt.name:Monitor @asset.type:monitor @action:deleted`  |
| [Monitor modified][53] | A monitor is modified and the previous and new JSON values for the monitor. | `@evt.name:Monitor @asset.type:monitor @action:modified` |
| [Monitor resolved][54] | A monitor is resolved.                                               | `@evt.name:Monitor @asset.type:monitor @action:resolved` |

### Notebook events

| Name              | Description of audit event                                            | Query in audit explorer                                     |
| ----------------- | --------------------------------------------------------------------- | ----------------------------------------------------------- |
| [Notebook created][55]  | A notebook is created and the new JSON value for the notebook.                 | `@evt.name:Notebook @asset.type:notebook @action:created`   |
| [Notebook deleted][56]  | A notebook is deleted and the previous JSON value for the notebook.           | `@evt.name:Notebook @asset.type:notebook @action:deleted`   |
| [Notebook modified][57] | A notebook is modified and the previous and new JSON values for the notebook. | `@evt.name:Notebook @asset.type:notebook @action:modified`  |

### OAuth events

| Name         | Description of audit event                                                                    | Query in audit explorer                  |
| ------------ | --------------------------------------------------------------------------------------------- | -----------------------------------------|
| [OAuth client][58] | A user created, modified, or deleted an OAuth client and the previous and new values for the OAuth client. | `@evt.name:OAuth @asset.type:oauth_client` |

### Organization management events

| Name                 | Description of audit event                                                       | Query in audit explorer                                           |
| -------------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------|
| [Audit Trail settings][59] | A user modified Audit Trail settings and what the previous and new settings are. | `@evt.name:"Organization Management" @asset.type:audit_logs_settings` |

### Real User Monitoring events
| Name | Description of audit event                                          | Query in audit explorer                           |
| ---- | ------------------------------------------------------------------- | --------------------------------------------------|
| [RUM application created][60] | A user created or deleted an application in RUM and the type of the application (Browser, Flutter, IOS, React Native, Android). | `@evt.name:"Real User Monitoring" @asset.type:real_user_monitoring_application @action:(created OR deleted)` |
| [RUM application modified][61] | A user modified an application in RUM, the new value of the application, and the type of the application (Browser, Flutter, IOS, React Native, Android). | `@evt.name:“Real User Monitoring” @asset.type:real_user_monitoring_application @action:modified` |

### Sensitive Data Scanner events
| Name | Description of audit event                                          | Query in audit explorer                           |
| ---- | ------------------------------------------------------------------- | --------------------------------------------------|
| [Scanning group][62] | A user created, modified, or deleted a scanning group in Sensitive Data Scanner and the previous and new values for the configuration. | `@evt.name:"Sensitive Data Scanner" @asset.type:sensitive_data_scanner_scanning_group` |
| [Scanning rule][63] | A user created, modified, or deleted a scanning rule within a scanning group in Sensitive Data Scanner and the previous and new values for the configuration. | `@evt.name:"Sensitive Data Scanner" @asset.type:sensitive_data_scanner_scanning_rule` |

### Service Level Objectives (SLO) events

| Name          | Description of audit event                                                                       | Query in audit explorer                  |
| ------------- | ------------------------------------------------------------------------------------------------ | -----------------------------------------|
| [SLO][64]           | A user creates, modifies, or deletes an SLO and the previous and new values for the SLO.| `@evt.name:SLO @asset.type:slo`            |
| [SLO correction][65]| A user creates, modifies, or deletes an SLO correction and the previous and new values for the SLO correction. | `@evt.name:SLO @asset.type:slo_correction` |

### Support administration events

| Name                 | Description of audit event                                          | Query in audit explorer                           |
| -------------------- | ------------------------------------------------------------------- | --------------------------------------------------|
| [Support admin access][66] | A Datadog support admin accesses the account and the reason for it. | `@evt.name:"Support Administration" @action:login`  |

### Synthetic Monitoring events
| Name                     | Description of audit event                                          | Query in audit explorer                           |
| ------------------------ | ------------------------------------------------------------------- | --------------------------------------------------|
| [Private location][67] | A user created or deleted a private location for Synthetic tests. | `@evt.name:"Synthetics Monitoring" @asset.type:synthetics_private_location` |
| [Synthetic test created or deleted][68] | A user created or deleted a Synthetic test. | `@evt.name:"Synthetics Monitoring" @asset.type:synthetics_test @action:(created OR deleted)` |
| [Synthetic test modified][69] | A user modified a Synthetic test and the previous and new values for the configuration. | `@evt.name:"Synthetics Monitoring" @asset.type:synthetics_test @action:modified` |
| [Synthetic variable][70] | A user created, modified, or deleted a Synthetic variable. | `@evt.name:"Synthetics Monitoring" @asset.type:synthetics_variable` |
| [Synthetic settings][71] | A user modified Synthetic settings (quotas, PL access) and the previous and new setting values. | `@evt.name:"Synthetics Monitoring" @asset.type:synthetics_settings @action:modified` |

### Reference Table events
| Name                     | Description of audit event                                          | Query in audit explorer                           |
| ------------------------ | ------------------------------------------------------------------- | --------------------------------------------------|
| [Reference Table][72] | A user created, deleted, or modified a reference table. | `@evt.name:"Reference Tables" @asset.type:reference_table @action:(created OR deleted OR modified)` |
| [Reference Table File][73] | A user uploaded a file or imported a file with a cloud provider for a reference table. | `@evt.name:"Reference Tables" @asset.type:reference_table_file @action:(uploaded OR imported)` |

### CI Visibility events
| Name                            | Description of audit event                                                                             | Query in audit explorer                                                                          |
|---------------------------------|--------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------|
| [Repository Default Branch][74] | A user modified the default branch of a repository, and the previous and new values for the default branch. | `@evt.name:"CI Visibility" @asset.type:ci_app_repository`                                                         |

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/audit-trail
[2]: /account_management/audit_trail/
[3]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Access%20Management%22%20%40asset.type%3Aapplication_key
[4]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Access%20Management%22%20%40asset.type%3Aidentity_provider
[5]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Access%20Management%22%20%40asset.type%3Auser
[6]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Access%20Management%22%20%40asset.type%3Arole%20%40action%3Amodified
[7]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Access%20Management%22%20%40asset.type%3Arole%20%40action%3A%28created%20OR%20deleted%29
[8]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Access%20Management%22%20%40asset.type%3Arole_request
[9]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ARequest%20%40action%3Aaccessed
[10]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AAuthentication%20%40asset.type%3Aapi_key
[11]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AAuthentication%20%40asset.type%3Aapplication_key
[12]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AAuthentication%20%40asset.type%3Apublic_api_key
[13]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AAuthentication%20%40action%3Alogin
[14]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%E2%80%9CCloud%20Security%20Platform%E2%80%9D%20%40asset.type%3Acws_agent_rule%20%40action%3Aaccessed
[15]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Cloud%20Security%20Platform%22%20%40asset.type%3Anotification_profile
[16]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Cloud%20Security%20Platform%22%20%40asset.type%3Asecurity_rule
[17]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Cloud%20Security%20Platform%22%20%40asset.type%3Asecurity_signal%20%40action%3Amodified
[18]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ADashboard%20%40asset.type%3Adashboard%20%40action%3Acreated
[19]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ADashboard%20%40asset.type%3Adashboard%20%40action%3Adeleted
[20]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ADashboard%20%40asset.type%3Aembed%20%40action%3Aaccessed
[21]: https://roadie.io/docs/integrations/datadog/
[22]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ADashboard%20%40asset.type%3Adashboard%20%40action%3Amodified
[23]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ADashboard%20%40asset.type%3Adashboard_share_acl%20%40action%3Acreated
[24]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ADashboard%20%40asset.type%3Adashboard_share_acl%20%40action%3Adeleted
[25]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ADashboard%20%40asset.type%3Adashboard%20%40action%3Aaccessed
[26]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ADashboard%20%40asset.type%3Adashboard_share_link
[27]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AIntegration%20%40asset.type%3Aintegration
[28]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Log%20Management%22%20%40asset.type%3Aarchive
[29]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Log%20Management%22%20%40asset.type%3A%22custom%20metric%22
[30]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Log%20Management%22%20%40asset.type%3A%22exclusion%20filter%22
[31]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Log%20Management%22%20%40asset.type%3Afacet
[32]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Log%20Management%22%20%40asset.type%3Ahistorical_view
[33]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Log%20Management%22%20%40asset.type%3Aindex
[34]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Log%20Management%22%20%40asset.type%3Apipeline
[35]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Log%20Management%22%20%40asset.type%3Apipeline_processor
[36]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Log%20Management%22%20%40asset.type%3Arestriction_query
[37]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Log%20Management%22%20%40asset.type%3Astandard_attribute
[38]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22APM%22%20%40asset.type%3Aretention_filter
[39]: /tracing/trace_pipeline/trace_retention/#retention-filters
[40]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22APM%22%20%40asset.type%3Acustom_metrics
[41]: /tracing/trace_pipeline/generate_metrics/
[42]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22APM%22%20%40asset.type%3Afacet
[43]: /tracing/trace_explorer/facets/
[44]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22APM%22%20%40asset.type%3Aservice_operation_name
[45]: /tracing/guide/configuring-primary-operation/
[46]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22APM%22%20%40asset.type%3Asecond_primary_tag
[47]: /tracing/guide/setting_primary_tags_to_scope/#add-a-second-primary-tag-in-datadog
[48]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AMetrics%20%40asset.type%3Ametric%20%40action%3Acreated
[49]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AMetrics%20%40asset.type%3Ametric%20%40action%3Adeleted
[50]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AMetrics%20%40asset.type%3Ametric%20%40action%3Amodified
[51]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AMonitor%20%40asset.type%3Amonitor%20%40action%3Acreated
[52]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AMonitor%20%40asset.type%3Amonitor%20%40action%3Adeleted
[53]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AMonitor%20%40asset.type%3Amonitor%20%40action%3Amodified
[54]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AMonitor%20%40asset.type%3Amonitor%20%40action%3Aresolved
[55]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ANotebook%20%40asset.type%3Anotebook%20%40action%3Acreated
[56]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ANotebook%20%40asset.type%3Anotebook%20%40action%3Adeleted
[57]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ANotebook%20%40asset.type%3Anotebook%20%40action%3Amodified
[58]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AOAuth%20%40asset.type%3Aoauth_client
[59]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Organization+Management%22+%40asset.type%3Aaudit_logs_settings
[60]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Real%20User%20Monitoring%22%20%40asset.type%3Areal_user_monitoring_application%20%40action%3A%28created%20OR%20deleted%29
[61]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%E2%80%9CReal%20User%20Monitoring%E2%80%9D%20%40asset.type%3Areal_user_monitoring_application%20%40action%3Amodified
[62]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Sensitive%20Data%20Scanner%22%20%40asset.type%3Asensitive_data_scanner_scanning_group
[63]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Sensitive%20Data%20Scanner%22%20%40asset.type%3Asensitive_data_scanner_scanning_rule
[64]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ASLO%20%40asset.type%3Aslo
[65]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ASLO%20%40asset.type%3Aslo_correction
[66]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Support%20Administration%22%20%40action%3Alogin
[67]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Synthetics%20Monitoring%22%20%40asset.type%3Asynthetics_private_location
[68]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Synthetics%20Monitoring%22%20%40asset.type%3Asynthetics_test%20%40action%3A%28created%20OR%20deleted%29
[69]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Synthetics%20Monitoring%22%20%40asset.type%3Asynthetics_test%20%40action%3Amodified
[70]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Synthetics%20Monitoring%22%20%40asset.type%3Asynthetics_variable
[71]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Synthetics%20Monitoring%22%20%40asset.type%3Asynthetics_settings%20%40action%3Amodified
[72]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Reference%20Tables%22%20%40asset.type%3Areference_table%20%40action%3A%28created%20OR%20deleted%20OR%20modified%29
[73]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Reference%20Tables%22%20%40asset.type%3Areference_table_file%20%40action%3A%28uploaded%20OR%20imported%29
[74]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22CI+Visibility%22+%40asset.type%3Aci_app_repository
