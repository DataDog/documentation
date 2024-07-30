---
title: Audit Trail Events
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
- [Agent](#agent)
- [API request](#api-request-events)
- [Authentication](#authentication-events)
- [Dashboard](#dashboard-events)
- [Integration](#integration-events)
- [Monitor](#monitor-events)
- [Notebook](#notebook-events)
- [OAuth](#oauth-events)
- [Organization management](#organization-management-events)
- [Security Notifications](#security-notification-events)
- [Teams management](#teams-management-events)

#### Product-Specific Events
- [Application Performance Monitoring (APM)](#application-performance-monitoring-apm-events)
- [Application Security Management (ASM)](#application-security-management)
- [Audit Trail](#audit-trail-events)
- [CI Visibility](#ci-visibility-events)
- [Cloud Security Platform](#cloud-security-platform-events)
- [Dynamic Instrumentation](#dynamic-instrumentation-events)
- [Error Tracking](#error-tracking-events)
- [Log Management](#log-management-events)
- [Metrics](#metrics-events)
- [Real User Monitoring](#real-user-monitoring-events)
- [Sensitive Data Scanner](#sensitive-data-scanner-events)
- [Service Level Objectives](#service-level-objectives-slo-events)
- [Synthetic Monitoring](#synthetic-monitoring-events)
- [Reference Tables](#reference-table-events)
- [Workflows](#workflow-events)


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
| [Password][9] | A user modified their password in the org. Password update events are delivered to all orgs that user is active in, even if the org does not have password authentication configured.| `@evt.name:"Access Management" @asset.type:password @action:modified` |
| [Restriction policy][10] | A restriction policy is modified for a resource. | `@evt.name:"Access Management" @asset.type:restriction_policy @action:(modified OR deleted)` |
| [Email update (Support)][11] | A user's email was updated by Datadog Support. | `@evt.name:"Access Management" @evt.actor.type:SUPPORT_USER @asset.type:user @action:modified` |
| [User invite (Support)][12] | A user was invited to the org by Datadog Support. | `@evt.name:"Access Management" @evt.actor.type:SUPPORT_USER @asset.type:user @action:created` |
| [User's role (Support)][100] | A user was added or deleted from a role in the org by Datadog Support. | `@evt.name:"Access Management" @evt.actor.type:SUPPORT_USER @asset.type:role @action:modified` |
| [Role modified (Support)][101] | A role was modified by Datadog Support, and what the previous and new permissions are. | `@evt.name:"Access Management" @evt.actor.type:SUPPORT_USER @asset.type:role @action:modified` |

### Agent

| Name                                    | Description of audit event                          | Query in audit explorer                                             |
|-----------------------------------------| --------------------------------------------------  | ------------------------------------------------------------------- |
| [Agent enabled][13]                    | A new Datadog Agent was enabled.                    | `@evt.name:"Datadog Agent" @action:created`                         |
| [Agent flare created][14]               | Datadog Agent flare is created for support tickets. | `@evt.name:"Datadog Agent" @action:created @asset.type:agent_flare` |
| [Agent configuration updated][15]      | A Datadog Agent configuration was updated.          | `@evt.name:"Datadog Agent" @action:modified`                        |


### API request events

| Name  | Description of audit event                          | Query in audit explorer              |
|-------------| --------------------------------------------------  | ------------------------------------ |
| [API Request][16] | An API Request is made across the Datadog platform. | `@evt.name:Request @action:accessed` |

### Application Performance Monitoring (APM) events
| Name | Description of audit event                                          | Query in audit explorer                           |
| ---- | ------------------------------------------------------------------- | --------------------------------------------------|
| [Retention filter][17] | A user created, modified, or deleted a [retention filter][18] and the previous and/or new values for the retention filter configuration. | `@evt.name:APM @asset.type:retention_filter` |
| [Span-based metric][19] | A user created, modified, or deleted a [span-based metric][20] and the previous and/or new values for the metric configuration. | `@evt.name:APM @asset.type:custom_metrics` |
| [Facet][21] | A user created, modified, or deleted a [facet][22] and the previous and/or new values for the facet configuration. | `@evt.name:APM @asset.type:facet` |
| [Primary operation name][23] | A user created, modified, or deleted the [primary operation name][24] of a service and the previous and/or new values for the configuration. | `@evt.name:APM @asset.type:service_operation_name` |
| [Second Primary tag][25] | A user added, modified, or deleted the [second primary tag][26] and the previous and/or new values for the configuration.  | `@evt.name:APM @asset.type:second_primary_tag` |
| [Sampling rates remotely configured][27] | A user remotely configured the APM sampling rates.  | `@evt.name:APM @asset.type:samplerconfig` |

### Application Security Management

{{% audit-trail-asm %}}

### Audit Trail events

| Name  | Description of audit event                          | Query in audit explorer              |
|-------------| --------------------------------------------------  | ------------------------------------ |
| [Download as CSV][28] | A user exports list of Audit Events as CSV | `@evt.name:Audit Trail @asset.type:audit_events_csv` |

### Authentication events

| Name                    | Description of audit event                                                                    | Query in audit explorer                                 |
|--------------------------------| --------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| [API key][29] (Org settings)         | An API key is accessed, listed, created, or deleted in the Organization Settings page.        | `@evt.name:Authentication @asset.type:api_key`          |
| [Application key][30] (Org settings) | An application key is accessed, listed, created, or deleted in the Organization Settings page.| `@evt.name:Authentication @asset.type:application_key`  |
| [Public API key][31] (Org settings)  | A public API key is accessed, listed, created, or deleted in the Organization Settings page.  | `@evt.name:Authentication @asset.type:public_api_key`   |
| [User login][32]                     | A user logs into Datadog and the authentication method used.                                  | `@evt.name:Authentication @action:login`                |

### CI Visibility events
| Name                            | Description of audit event                                   | Query in audit explorer                                                                                               |
|---------------------------------|--------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------|
| [Repository default branch][33] | A user modified the default branch of a repository.          | `@evt.name:"CI Visibility" @asset.type:ci_app_repository @action:modified`                                            |
| [Test service settings][34]     | A user created or modified the settings of a test service.   | `@evt.name:"CI Visibility" @asset.type:ci_app_test_service_settings (@action:created OR @action:modified)`            |
| [GitHub account settings][35]   | A user has modified the GitHub account settings.             | `@evt.name:"CI Visibility" @asset.type:github_opt_ins (@action:modified OR @action:deleted)`                          |
| [Exclusion filters][36]         | The exclusion filters have been modified.                    | `@evt.name:"CI Visibility" @asset.type:ci_app_exclusion_filters @action:modified`                                     |
| [Quality gates rule][37]        | A user has created, modified or deleted a quality gate rule. | `@evt.name:"CI Visibility" @asset.type:ci_app_quality_gates (@action:created OR @action:modified OR @action:deleted)` |

### Cloud Security Platform events

{{% audit-trail-security-platform %}}

### Dashboard events

| Name               | Description of audit event                                                                        | Query in audit explorer                                               |
| -------------------| ------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------   |
| [Dashboard created][38] | A dashboard is created and the new JSON value for the dashboard.                                    | `@evt.name:Dashboard @asset.type:dashboard @action:created`             |
| [Dashboard deleted][39] | A dashboard is deleted and the previous JSON value for the dashboard.                              | `@evt.name:Dashboard @asset.type:dashboard @action:deleted`             |
| [Dashboard embedded][40] (Roadie) | A Datadog dashboard is [embedded into a third party][41] and a user views the dashboard.                      | `@evt.name:Dashboard @asset.type:embed @action:accessed`                |
| [Dashboard modified][42] | A dashboard is modified and the previous and new JSON values for the dashboard.                   | `@evt.name:Dashboard @asset.type:dashboard @action:modified`            |
| [Dashboard user(s) added][43] | A user added user ID(s) that can access a dashboard and the list of new user IDs.                 | `@evt.name:Dashboard @asset.type:dashboard_share_acl @action:created`   |
| [Dashboard user(s) deleted][44] | A user deleted user ID(s) that can access a dashboard and the list of the deleted user ID(s).       | `@evt.name:Dashboard @asset.type:dashboard_share_acl @action:deleted`   |
| [Public URL accessed][45] | A public dashboard URL is accessed.                                                               | `@evt.name:Dashboard @asset.type:dashboard @action:accessed`            |
|[Public URL generated or deleted][46]  | A public URL to view a dashboard is generated or deleted.                             | `@evt.name:Dashboard @asset.type:dashboard_share_link`            |

### Dynamic Instrumentation events

| Name     | Description of audit event                                          | Query in audit explorer                           |
| -------- | ------------------------------------------------------------------- | --------------------------------------------------|
| [Logs Probe][47] | A user has successfully created, modified or deleted a logs probe with Dynamic Instrumentation. | `@evt.name:"Dynamic Instrumentation" @action:(created OR modified OR deleted) @asset.type:log_probe` |
| [Metrics Probe][48] | A user has successfully created, modified or deleted a metrics probe with Dynamic Instrumentation. | `@evt.name:"Dynamic Instrumentation" @action:(created OR modified OR deleted) @asset.type:span_probe` |
| [Spans Probe][49] | A user has successfully created, modified or deleted a spans probe with Dynamic Instrumentation. | `@evt.name:"Dynamic Instrumentation" @action:(created OR modified OR deleted) @asset.type:metric_probe` |

### Error Tracking events

| Name     | Description of audit event                                          | Query in audit explorer                           |
| -------- | ------------------------------------------------------------------- | --------------------------------------------------|
| [Error Tracking for Logs activation][50] | A user has enabled or disabled Error Tracking for Logs product. | `@evt.name:"Error Tracking" @action:(created OR deleted) @asset.type:error_tracking_logs` |
| [Create or Modify inclusion filter][51] | A user has added or modified an inclusion filter. | `@evt.name:"Error Tracking" @asset.type:error_tracking_inclusion_filter` |

### Integration events

| Name     | Description of audit event                                          | Query in audit explorer                           |
| -------- | ------------------------------------------------------------------- | --------------------------------------------------|
| [Resource][52] | Anytime a resource (channel, service, webhook, account, instance, and so on) is added, modified, or deleted from an integration, and the previous and new values for the configuration. | `@evt.name:Integration @asset.type:integration` |

### Log Management events
| Name | Description of audit event                                          | Query in audit explorer                           |
| ---- | ------------------------------------------------------------------- | --------------------------------------------------|
| [Archive configuration][53] | A user created, modified, or deleted the configuration of an archive and the previous and new values for the configuration. | `@evt.name:"Log Management" @asset.type:archive` |
| [Custom metric][54] | A user created, modified, or deleted a custom metric for logs and the previous and new values for the custom metric configuration. | `@evt.name:"Log Management" @asset.type:"custom metric"` |
| [Exclusion filter configuration][55] | A user created, modified, or deleted the configuration of an exclusion filter and the previous and new values for the configuration. | `@evt.name:"Log Management" @asset.type:"exclusion filter"` |
| [Facet][56] | A user created, modified, or deleted a facet in the log explorer and the previous and new values for the facet configuration.| `@evt.name:"Log Management" @asset.type:facet` |
| [Historical view][57] | A user created, modified, aborted, or deleted a historical view for logs and the previous and new values for the historical view configuration. | `@evt.name:"Log Management" @asset.type:historical_view` |
| [Index configuration][58] | A user created, modified, or deleted the configuration of an index and the previous and new values for the configuration. | `@evt.name:"Log Management" @asset.type:index` |
| [Log pipeline][59] | A user created, modified, or deleted a log pipeline or nested pipeline and the previous and new values for the configuration. | `@evt.name:"Log Management" @asset.type:pipeline` |
| [Processor][60] | A user created, modified, or deleted a processor within a pipeline and the previous and new values for the configuration. | `@evt.name:"Log Management" @asset.type:pipeline_processor` |
| [Query][61] (Public Beta)| A user ran a Log Management List query either in log explorer, Dashboards or through the Public API. | `@evt.name:"Log Management" @asset.type:logs_query` |
| [Restriction query configuration][62] | A user created, modified, or deleted the configuration of a restriction query in logs and the previous and new values for the configuration. | `@evt.name:"Log Management" @asset.type:restriction_query` |
| [Standard attribute configuration][63] | A user created, modified, or deleted the configuration of a standard attribute in logs and the previous and new values for the configuration. | `@evt.name:"Log Management" @asset.type:standard_attribute` |
| [Download as CSV][64] | A user exports list of logs as CSV | `@evt.name:"Log Management" @asset.type:logs_csv` |

### Metrics events
| Name | Description of audit event                                          | Query in audit explorer                           |
| ---- |------------------------------------------------------------------- | --------------------------------------------------|
| [Custom metric created][65] | A user created a custom metric and the new value for the custom metric configuration. | `@evt.name:Metrics @asset.type:metric @action:created` |
| [Custom metric deleted][66] | A user deleted a custom metric and the previous value for the custom metric configuration. | `@evt.name:Metrics @asset.type:metric @action:deleted` |
| [Custom metric modified][67] | A user modified a custom metric and the previous and new values for the custom metric configuration. | `@evt.name:Metrics @asset.type:metric @action:modified` |

### Monitor events

| Name             | Description of audit event                                           | Query in audit explorer                                  |
| ---------------- | -------------------------------------------------------------------- | ---------------------------------------------------------|
| [Monitor created][68]  | A monitor is created and the new JSON value for the monitor.                 | `@evt.name:Monitor @asset.type:monitor @action:created`  |
| [Monitor deleted][69]  | A monitor is deleted and the previous JSON value for the monitor.           | `@evt.name:Monitor @asset.type:monitor @action:deleted`  |
| [Monitor modified][70] | A monitor is modified and the previous and new JSON values for the monitor. | `@evt.name:Monitor @asset.type:monitor @action:modified` |
| [Monitor resolved][71] | A monitor is resolved.                                               | `@evt.name:Monitor @asset.type:monitor @action:resolved` |

### Notebook events

| Name              | Description of audit event                                            | Query in audit explorer                                     |
| ----------------- | --------------------------------------------------------------------- | ----------------------------------------------------------- |
| [Notebook created][72]  | A notebook is created and the new JSON value for the notebook.                 | `@evt.name:Notebook @asset.type:notebook @action:created`   |
| [Notebook deleted][73]  | A notebook is deleted and the previous JSON value for the notebook.           | `@evt.name:Notebook @asset.type:notebook @action:deleted`   |
| [Notebook modified][74] | A notebook is modified and the previous and new JSON values for the notebook. | `@evt.name:Notebook @asset.type:notebook @action:modified`  |

### OAuth events

| Name         | Description of audit event                                                                    | Query in audit explorer                  |
| ------------ | --------------------------------------------------------------------------------------------- | -----------------------------------------|
| [OAuth client][75] | A user created, modified, or deleted an OAuth client and the previous and new values for the OAuth client. | `@evt.name:OAuth @asset.type:oauth_client` |

### Organization management events

| Name                 | Description of audit event                                                       | Query in audit explorer                                           |
| -------------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------|
| [Audit Trail settings][76] | A user modified Audit Trail settings and what the previous and new settings are. | `@evt.name:"Organization Management" @asset.type:audit_logs_settings` |
| [Child org created][77] | A user created a new child organization for an existing Datadog organization. | `@evt.name:"Organization Management" @asset.type:organization @action:created` |

### Real User Monitoring events
| Name | Description of audit event                                          | Query in audit explorer                           |
| ---- | ------------------------------------------------------------------- | --------------------------------------------------|
| [RUM application created][78] | A user created or deleted an application in RUM and the type of the application (Browser, Flutter, iOS, React Native, Android). | `@evt.name:"Real User Monitoring" @asset.type:real_user_monitoring_application @action:(created OR deleted)` |
| [RUM application modified][79] | A user modified an application in RUM, the new value of the application, and the type of the application (Browser, Flutter, iOS, React Native, Android). | `@evt.name:"Real User Monitoring" @asset.type:real_user_monitoring_application @action:modified` |
| [Session replay viewed][80] | A user viewed a session replay. | `@evt.name:"Real User Monitoring" @asset.type:session_replay @action:accessed` |

### Security Notification events
| Name                 | Description of audit event                                                       | Query in audit explorer                                           |
| -------------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------|
| [Token leaked][81] | Datadog has detected leaked Datadog API or Application Key that should be revoked.| `@evt.name:"Security Notification" @asset.type:(api_key OR application_key) @action:notification` |
| [Login method override][82] | Datadog has detected a user login method override that is different from the default login methods set for the organization.| `@evt.name:"Security Notification" @asset.type:user @action:notification` |
| [Unusual login][83] | Datadog has detected a unusual login event.| `@evt.name:"Security Notification" @asset.type:unusual_login @action:notification` |
| [User invited with throwaway email][102] | Datadog has detected that a user with an email from a free or disposable email provider was invited to the organization.| `@evt.name:"Security Notification" @asset.type:user_invite @action:notification` |

### Sensitive Data Scanner events
| Name | Description of audit event                                          | Query in audit explorer                           |
| ---- | ------------------------------------------------------------------- | --------------------------------------------------|
| [Scanning group][84] | A user created, modified, or deleted a scanning group in Sensitive Data Scanner and the previous and new values for the configuration. | `@evt.name:"Sensitive Data Scanner" @asset.type:sensitive_data_scanner_scanning_group` |
| [Scanning rule][85] | A user created, modified, or deleted a scanning rule within a scanning group in Sensitive Data Scanner and the previous and new values for the configuration. | `@evt.name:"Sensitive Data Scanner" @asset.type:sensitive_data_scanner_scanning_rule` |

### Service Level Objectives (SLO) events

| Name          | Description of audit event                                                                       | Query in audit explorer                  |
| ------------- | ------------------------------------------------------------------------------------------------ | -----------------------------------------|
| [SLO][86]           | A user creates, modifies, or deletes an SLO and the previous and new values for the SLO.| `@evt.name:SLO @asset.type:slo`            |
| [SLO correction][87]| A user creates, modifies, or deletes an SLO correction and the previous and new values for the SLO correction. | `@evt.name:SLO @asset.type:slo_correction` |


### Synthetic Monitoring events
| Name                     | Description of audit event                                          | Query in audit explorer                           |
| ------------------------ | ------------------------------------------------------------------- | --------------------------------------------------|
| [Private location][88] | A user created or deleted a private location for Synthetic tests. | `@evt.name:"Synthetics Monitoring" @asset.type:synthetics_private_location` |
| [Synthetic test created or deleted][89] | A user created or deleted a Synthetic test. | `@evt.name:"Synthetics Monitoring" @asset.type:synthetics_test @action:(created OR deleted)` |
| [Synthetic test modified][90] | A user modified a Synthetic test and the previous and new values for the configuration. | `@evt.name:"Synthetics Monitoring" @asset.type:synthetics_test @action:modified` |
| [Synthetic variable][91] | A user created, modified, or deleted a Synthetic variable. | `@evt.name:"Synthetics Monitoring" @asset.type:synthetics_variable` |
| [Synthetic settings][92] | A user modified Synthetic settings (quotas, PL access) and the previous and new setting values. | `@evt.name:"Synthetics Monitoring" @asset.type:synthetics_settings @action:modified` |

### Reference Table events
| Name                     | Description of audit event                                          | Query in audit explorer                           |
| ------------------------ | ------------------------------------------------------------------- | --------------------------------------------------|
| [Reference Table][93] | A user created, deleted, or modified a reference table. | `@evt.name:"Reference Tables" @asset.type:reference_table @action:(created OR deleted OR modified)` |
| [Reference Table File][94] | A user uploaded a file or imported a file with a cloud provider for a reference table. | `@evt.name:"Reference Tables" @asset.type:reference_table_file @action:(uploaded OR imported)` |                                                      |

### Teams Management events
| Name                     | Description of audit event                                          | Query in audit explorer                           |
| ------------------------ | ------------------------------------------------------------------- | --------------------------------------------------|
| [Teams Management][95] | A user created, deleted, or modified a team or team association. | `@evt.name:"Teams Management" @action:(created OR deleted OR modified)` |

### Workflow events
| Name                     | Description of audit event                                          | Query in audit explorer                           |
| ------------------------ | ------------------------------------------------------------------- | --------------------------------------------------|
| [Workflow][96] | A user created, deleted, or modified a workflow, or a workflow executed. | `@evt.name:"Workflows" @asset.type:workflow @action:(created OR deleted OR modified OR executed)` |
| [Workflow Schedule][97] | A user created, deleted, or modified a schedule for a workflow. | `@evt.name:"Workflows" @asset.type:workflow_schedule @action:(created OR deleted OR modified)` |
| [Workflow Action][98] | A user responded to a Slack prompt during the execution of a workflow. | `@evt.name:"Workflows" @asset.type:workflow_action @action:(responded)` |
| [Custom Connection][99] | A user created, deleted, or modified a connection. | `@evt.name:"Custom Connections" @asset.type:custom_connection @action:(created OR deleted OR modified)` |

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
[9]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Access%20Management%22%20%40asset.type%3Apassword%20%40action%3Amodified
[10]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Access%20Management%22%20%40asset.type%3Arestriction_policy
[11]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Access%20Management%22%20%40evt.actor.type%3ASUPPORT_USER%20%40asset.type%3Auser%20%40action%3Amodified%20
[12]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Access%20Management%22%20%40evt.actor.type%3ASUPPORT_USER%20%40asset.type%3Auser%20%40action%3Acreated%20
[13]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Datadog%20Agent%22%20%40action%3Acreated%20
[14]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Datadog%20Agent%22%20%40asset.type%3Aagent_flare%20%40action%3Acreated
[15]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Datadog%20Agent%22%20%40action%3Amodified%20
[16]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ARequest%20%40action%3Aaccessed
[17]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22APM%22%20%40asset.type%3Aretention_filter
[18]: /tracing/trace_pipeline/trace_retention/#retention-filters
[19]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22APM%22%20%40asset.type%3Acustom_metrics
[20]: /tracing/trace_pipeline/generate_metrics/
[21]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22APM%22%20%40asset.type%3Afacet
[22]: /tracing/trace_explorer/facets/
[23]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22APM%22%20%40asset.type%3Aservice_operation_name
[24]: /tracing/guide/configuring-primary-operation/
[25]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22APM%22%20%40asset.type%3Asecond_primary_tag
[26]: /tracing/guide/setting_primary_tags_to_scope/#add-a-second-primary-tag-in-datadog
[27]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AAPM%20%40asset.type%3Asamplerconfig
[28]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Audit%20Trail%22%20%40asset.type%3Aaudit_events_csv
[29]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AAuthentication%20%40asset.type%3Aapi_key
[30]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AAuthentication%20%40asset.type%3Aapplication_key
[31]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AAuthentication%20%40asset.type%3Apublic_api_key
[32]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AAuthentication%20%40action%3Alogin
[33]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22CI%20Visibility%22%20%40asset.type%3Aci_app_repository%20%40action%3Amodified
[34]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22CI%20Visibility%22%20%40asset.type%3Aci_app_test_service_settings%20%28%40action%3Acreated%20OR%20%40action%3Amodified%29
[35]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22CI%20Visibility%22%20%40asset.type%3Agithub_opt_ins%20%28%40action%3Amodified%20OR%20%40action%3Adeleted%29
[36]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22CI%20Visibility%22%20%40asset.type%3Aci_app_exclusion_filters%20%40action%3Amodified
[37]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22CI%20Visibility%22%20%40asset.type%3Aci_app_quality_gates%20%28%40action%3Acreated%20OR%20%40action%3Amodified%20OR%20%40action%3Adeleted%29
[38]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ADashboard%20%40asset.type%3Adashboard%20%40action%3Acreated
[39]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ADashboard%20%40asset.type%3Adashboard%20%40action%3Adeleted
[40]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ADashboard%20%40asset.type%3Aembed%20%40action%3Aaccessed
[41]: https://roadie.io/docs/integrations/datadog/
[42]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ADashboard%20%40asset.type%3Adashboard%20%40action%3Amodified
[43]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ADashboard%20%40asset.type%3Adashboard_share_acl%20%40action%3Acreated
[44]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ADashboard%20%40asset.type%3Adashboard_share_acl%20%40action%3Adeleted
[45]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ADashboard%20%40asset.type%3Adashboard%20%40action%3Aaccessed
[46]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ADashboard%20%40asset.type%3Adashboard_share_link
[47]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Dynamic%20Instrumentation%22%20%40asset.type%3Alog_probe
[48]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Dynamic%20Instrumentation%22%20%40asset.type%3Ametric_probe
[49]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Dynamic%20Instrumentation%22%20%40asset.type%3Aspan_probe
[50]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Error%20Tracking%22%20%40asset.type%3Aerror_tracking_logs%20%40action%3A%28created%20OR%20deleted%29
[51]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Error%20Tracking%22%20%40asset.type%3Aerror_tracking_inclusion_filter
[52]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AIntegration%20%40asset.type%3Aintegration
[53]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Log%20Management%22%20%40asset.type%3Aarchive
[54]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Log%20Management%22%20%40asset.type%3A%22custom%20metric%22
[55]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Log%20Management%22%20%40asset.type%3A%22exclusion%20filter%22
[56]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Log%20Management%22%20%40asset.type%3Afacet
[57]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Log%20Management%22%20%40asset.type%3Ahistorical_view
[58]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Log%20Management%22%20%40asset.type%3Aindex
[59]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Log%20Management%22%20%40asset.type%3Apipeline
[60]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Log%20Management%22%20%40asset.type%3Apipeline_processor
[61]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Log%20Management%22%20%40asset.type%3Alogs_query
[62]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Log%20Management%22%20%40asset.type%3Arestriction_query
[63]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Log%20Management%22%20%40asset.type%3Astandard_attribute
[64]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Log%20Management%22%20%40asset.type%3Alogs_csv
[65]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AMetrics%20%40asset.type%3Ametric%20%40action%3Acreated
[66]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AMetrics%20%40asset.type%3Ametric%20%40action%3Adeleted
[67]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AMetrics%20%40asset.type%3Ametric%20%40action%3Amodified
[68]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AMonitor%20%40asset.type%3Amonitor%20%40action%3Acreated
[69]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AMonitor%20%40asset.type%3Amonitor%20%40action%3Adeleted
[70]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AMonitor%20%40asset.type%3Amonitor%20%40action%3Amodified
[71]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AMonitor%20%40asset.type%3Amonitor%20%40action%3Aresolved
[72]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ANotebook%20%40asset.type%3Anotebook%20%40action%3Acreated
[73]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ANotebook%20%40asset.type%3Anotebook%20%40action%3Adeleted
[74]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ANotebook%20%40asset.type%3Anotebook%20%40action%3Amodified
[75]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AOAuth%20%40asset.type%3Aoauth_client
[76]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Organization+Management%22+%40asset.type%3Aaudit_logs_settings
[77]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Organization%20Management%22%20%40asset.type%3Aorganization%20%40action%3Acreated
[78]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Real%20User%20Monitoring%22%20%40asset.type%3Areal_user_monitoring_application%20%40action%3A%28created%20OR%20deleted%29
[79]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%E2%80%9CReal%20User%20Monitoring%E2%80%9D%20%40asset.type%3Areal_user_monitoring_application%20%40action%3Amodified
[80]: https://app.datadoghq.com/audit-trail?query=%40asset.type%3Asession_replay%20%40evt.name%3A%22Real%20User%20Monitoring%22%20%40action%3Aaccessed%20
[81]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Security%20Notification%22%20%40asset.type%3A%28api_key%20OR%20application_key%29
[82]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Security%20Notification%22%20%40action%3Anotification%20%40asset.type%3Auser
[83]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Security%20Notification%22%20%40action%3Anotification%20%40asset.type%3Aunusual_login
[84]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Sensitive%20Data%20Scanner%22%20%40asset.type%3Asensitive_data_scanner_scanning_group
[85]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Sensitive%20Data%20Scanner%22%20%40asset.type%3Asensitive_data_scanner_scanning_rule
[86]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ASLO%20%40asset.type%3Aslo
[87]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ASLO%20%40asset.type%3Aslo_correction
[88]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Synthetics%20Monitoring%22%20%40asset.type%3Asynthetics_private_location
[89]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Synthetics%20Monitoring%22%20%40asset.type%3Asynthetics_test%20%40action%3A%28created%20OR%20deleted%29
[90]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Synthetics%20Monitoring%22%20%40asset.type%3Asynthetics_test%20%40action%3Amodified
[91]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Synthetics%20Monitoring%22%20%40asset.type%3Asynthetics_variable
[92]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Synthetics%20Monitoring%22%20%40asset.type%3Asynthetics_settings%20%40action%3Amodified
[93]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Reference%20Tables%22%20%40asset.type%3Areference_table%20%40action%3A%28created%20OR%20deleted%20OR%20modified%29
[94]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Reference%20Tables%22%20%40asset.type%3Areference_table%20%40action%3A%28uploaded%20OR%20imported%29
[95]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Teams%20Management%22%20%40action%3A%28created%20OR%20deleted%20OR%20modified%29
[96]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AWorkflows%20%40asset.type%3Aworkflow%20%40action%3A%28modified%20OR%20created%20OR%20deleted%20OR%20executed%29
[97]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AWorkflows%20%40asset.type%3Aworkflow_schedule%20%40action%3A%28modified%20OR%20created%20OR%20deleted%29
[98]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AWorkflows%20%40asset.type%3Aworkflow_action%20%40action%3Aresponded
[99]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Custom%20Connections%22%20%40asset.type%3Acustom_connection
[100]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Access%20Management%22%20%40evt.actor.type%3ASUPPORT_USER%20%40asset.type%3Arole%20%40action%3Amodified%20
[101]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Access%20Management%22%20%40evt.actor.type%3ASUPPORT_USER%20%40asset.type%3Arole%20%40action%3Amodified%20
[102]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Security%20Notification%22%20%40action%3Anotification%20%40asset.type%3Auser_invite
