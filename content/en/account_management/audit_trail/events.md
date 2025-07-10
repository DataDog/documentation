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
- [App Builder](#app-builder-events)
- [Application Performance Monitoring (APM)](#application-performance-monitoring-apm-events)
- [App and API Protection (AAP)](#app-and-api-protection)
- [Audit Trail](#audit-trail-events)
- [CI Visibility](#ci-visibility-events)
- [Quality Gates](#quality-gates-events)
- [Cloud Security Platform](#cloud-security-platform-events)
- [Dynamic Instrumentation](#dynamic-instrumentation-events)
- [Error Tracking](#error-tracking-events)
- [Infrastructure Monitoring](#infrastructure-monitoring)
- [Log Management](#log-management-events)
- [LLM Observability](#llm-observability)
- [Metrics](#metrics-events)
- [Real User Monitoring](#real-user-monitoring-events)
- [Security Notification events](#security-notification-events)
- [Sensitive Data Scanner](#sensitive-data-scanner-events)
- [Service Level Objectives](#service-level-objectives-slo-events)
- [Sheets](#sheets-events)
- [Synthetic Monitoring](#synthetic-monitoring-events)
- [Reference Tables](#reference-table-events)
- [Workflows](#workflow-events)
- [App Datastore](#app-datastore)
- [Event Management](#event-management)
- [Private Action Runners](#private-action-runners)
- [Observability Pipelines](#observability-pipelines)
- [On-Call](#on-call)
- [Network Device Monitoring](#network-device-monitoring)


See the [Audit Trail documentation][2] for more information on setting up and configuring Audit Trail.

## Audit Events

### Access management events

| Name        | Description of audit event                                          | Query in audit explorer                           |
| ----------- | ------------------------------------------------------------------- | --------------------------------------------------|
| [Application key][3] (Service account user) | A user created, modified, or deleted an application key for a service account user. | `@evt.name:"Access Management" @asset.type:application_key` |
| [Authentication methods][4] (Org) | A user modified the allowed authentication methods for an org and what the previous and new values are. | `@evt.name:"Access Management" @asset.type:identity_provider` |
| [Email][5]       | An email is added, disabled, or verified on the Datadog account as a user in the account. | `@evt.name:"Access Management" @asset.type:user` |
| [Password][9] | A user modified their password in the org. Password update events are delivered to all orgs that user is active in, even if the org does not have password authentication configured.| `@evt.name:"Access Management" @asset.type:password @action:modified` |
| [Role modified][6]  | A role is modified and what the previous and new permissions are. | `@evt.name:"Access Management" @asset.type:role @action:modified` |
| [Role created or deleted][7] | A role is created or deleted in the org. | `@evt.name:"Access Management" @asset.type:role @action:(created OR deleted)` |
| [Role access request][8] | A user created, responded to, or deleted an access request for a role, and the value of the access request. | `@evt.name:"Access Management" @asset.type:role_request` |
| [User's role][6] | A user is added or deleted from a role in the org. | `@evt.name:"Access Management" @asset.type:role @action:modified` |
| [Restriction policy][10] | A restriction policy is modified for a resource. | `@evt.name:"Access Management" @asset.type:restriction_policy @action:(modified OR deleted)` |
| [Email update (Support)][11] | A user's email was updated by Datadog Support. | `@evt.name:"Access Management" @evt.actor.type:SUPPORT_USER @asset.type:user @action:modified` |
| [User invite (Support)][12] | A user was invited to the org by Datadog Support. | `@evt.name:"Access Management" @evt.actor.type:SUPPORT_USER @asset.type:user @action:created` |
| [User's role (Support)][100] | A user was added or deleted from a role in the org by Datadog Support. | `@evt.name:"Access Management" @evt.actor.type:SUPPORT_USER @asset.type:role @action:modified` |
| [Role modified (Support)][101] | A role was modified by Datadog Support, and what the previous and new permissions are. | `@evt.name:"Access Management" @evt.actor.type:SUPPORT_USER @asset.type:role @action:modified` |
| [IP Allowlist Modified (Support)][115] | A new IP was added to the org's IP allowlist by Datadog Support. | `@evt.name:"Access Management" @evt.actor.type:SUPPORT_USER @asset.type:ip_allowlist @action:modified` |

### Agent

| Name                                    | Description of audit event                          | Query in audit explorer                                             |
|-----------------------------------------| --------------------------------------------------  | ------------------------------------------------------------------- |
| [Agent configuration updated][15]      | A Datadog Agent configuration was updated.          | `@evt.name:"Datadog Agent" @action:modified`                        |
| [Agent enabled][13]                    | A new Datadog Agent was enabled.                    | `@evt.name:"Datadog Agent" @action:created`                         |
| [Agent flare created][14]               | Datadog Agent flare is created for support tickets. | `@evt.name:"Datadog Agent" @action:created @asset.type:agent_flare` |
| [Agent API key updated][166]                    | A Datadog Agent API key was changed.                    | `@evt.name:"Datadog Agent" @metadata.event_name:"Agent API Key Updated"`                         |
| [Agent upgrade succeeded][167]                    | A Datadog Agent was successfully upgraded.                    | `@evt.name:"Datadog Agent" @metadata.event_name:"Agent Upgrade Succeeded"`                         |
| [Agent upgrade failed][168]                    | A Datadog Agent remote upgrade attempt failed.                    | `@evt.name:"Datadog Agent" @metadata.event_name:"Agent Upgrade Failed"`  

### API request events

| Name  | Description of audit event                          | Query in audit explorer              |
|-------------| --------------------------------------------------  | ------------------------------------ |
| [API Request][16] | An API Request is made across the Datadog platform. | `@evt.name:Request @action:accessed` |

### App Builder events

| Name                 | Description of audit event | Query in audit explorer              |
|----------------------| -------------------------  | ------------------------------------ |
| [App][109]           | A user accessed, created, modified, deleted, reverted, or unpublished an app.| `@evt.name:"App Builder" @asset.type:app @action:(accessed OR created OR modified OR published OR deleted OR reverted OR unpublished)`|
| [Query started][107] | A user started a query.    | `@evt.name:"App Builder" @asset.type:query @action:started` |
| [Query executed][108]| A user executed a query.   | `@evt.name:"App Builder" @asset.type:query @action:executed`|

### Application Performance Monitoring (APM) events
| Name | Description of audit event                                          | Query in audit explorer                           |
| ---- | ------------------------------------------------------------------- | --------------------------------------------------|
| [Retention filter][17] | A user created, modified, or deleted a [retention filter][18] and the previous and/or new values for the retention filter configuration. | `@evt.name:APM @asset.type:retention_filter` |
| [Span-based metric][19] | A user created, modified, or deleted a [span-based metric][20] and the previous and/or new values for the metric configuration. | `@evt.name:APM @asset.type:custom_metrics` |
| [Custom metrics][113] | A user created, modified, or deleted a custom metric | `@evt.name:APM @action:(created OR modified OR deleted) @asset.type:custom_metrics` |
| [Facet][21] | A user created, modified, or deleted a [facet][22] and the previous and/or new values for the facet configuration. | `@evt.name:APM @asset.type:facet` |
| [Primary operation name][23] | A user created, modified, or deleted the [primary operation name][24] of a service and the previous and/or new values for the configuration. | `@evt.name:APM @asset.type:service_operation_name` |
| [Second primary tag][25] | A user added, modified, or deleted the [second primary tag][26] and the previous or new values for the configuration.  | `@evt.name:APM @asset.type:second_primary_tag` |
| [Sampling rates remotely configured][27] | A user remotely configured the APM sampling rates.  | `@evt.name:APM @asset.type:samplerconfig` |
| [Saved view][112] | A user created, modified, or deleted a saved view. | `@evt.name:APM @action:(created OR modified OR deleted) @asset.type:saved_view` |

### App and API Protection

{{% audit-trail-asm %}}

### Audit Trail events

| Name  | Description of audit event                          | Query in audit explorer              |
|-------------| --------------------------------------------------  | ------------------------------------ |
| [Audit Trail settings][76] | A user modified Audit Trail settings and what the previous and new settings are. | `@evt.name:"Organization Management" @asset.type:audit_logs_settings` |
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
| [Exclusion filters][36]         | The exclusion filters have been modified.                    | `@evt.name:"CI Visibility" @asset.type:ci_app_exclusion_filters @action:modified`                                     |
| [Repository default branch][33] | A user modified the default branch of a repository.          | `@evt.name:"CI Visibility" @asset.type:ci_app_repository @action:modified`                                            |
| [GitHub account settings][35]   | A user has modified the GitHub account settings.             | `@evt.name:"CI Visibility" @asset.type:github_opt_ins (@action:modified OR @action:deleted)`                          |

### Quality Gates events
| Name                            | Description of audit event                                   | Query in audit explorer                                                                                               |
|---------------------------------|--------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------|
| [Quality gates rule][37]        | A user has created, modified, or deleted a quality gate rule. | `@evt.name:"Quality Gates" @asset.type:ci_app_quality_gates (@action:created OR @action:modified OR @action:deleted)` |

### Cloud Security Platform events

{{% audit-trail-security-platform %}}

### Dashboard events

| Name               | Description of audit event                                                                        | Query in audit explorer                                               |
| -------------------| ------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------   |
| [Dashboard created][38] | A dashboard is created and the new JSON value for the dashboard.                                    | `@evt.name:Dashboard @asset.type:dashboard @action:created`             |
| [Dashboard embedded][40] (Roadie) | A Datadog dashboard is embedded into a third party ([Roadie][41]) and a user views the dashboard.                      | `@evt.name:Dashboard @asset.type:embed @action:accessed`                |
| [Dashboard modified][42] | A dashboard is modified. Also provides the previous and new JSON values for the dashboard.                   | `@evt.name:Dashboard @asset.type:dashboard @action:modified`            |
| [Dashboard deleted][39] | A dashboard is deleted. Also provides the previous JSON value for the dashboard.                              | `@evt.name:Dashboard @asset.type:dashboard @action:deleted`             |
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
| [Create or Modify inclusion filter][51] | A user has added or modified an inclusion filter. | `@evt.name:"Error Tracking" @asset.type:error_tracking_inclusion_filter` |
| [Error Tracking for Logs activation][50] | A user has enabled or disabled Error Tracking for the Logs product. | `@evt.name:"Error Tracking" @action:(created OR deleted) @asset.type:error_tracking_logs` |

### Integration events

| Name     | Description of audit event                                          | Query in audit explorer                           |
| -------- | ------------------------------------------------------------------- | --------------------------------------------------|
| [Resource][52] | Anytime a resource (channel, service, webhook, account, instance, and so on) is added, modified, or deleted from an integration, and the previous and new values for the configuration. | `@evt.name:Integration @asset.type:integration` |

### Log Management events
| Name | Description of audit event                                          | Query in audit explorer                           |
| ---- | ------------------------------------------------------------------- | --------------------------------------------------|
| [Archive configuration][53] | A user created, modified, or deleted the configuration of an archive and the previous and new values for the configuration. | `@evt.name:"Log Management" @asset.type:archive` |
| [Archiving order modified][105] | A user modified the order of archives. | `@evt.name:"Log Management" @action:modified @asset.type:archive_list` |
| [Custom metric][54] | A user created, modified, or deleted a custom metric for logs and the previous and new values for the custom metric configuration. | `@evt.name:"Log Management" @asset.type:"custom metric"` |
| [Exclusion filter configuration][55] | A user created, modified, or deleted the configuration of an exclusion filter and the previous and new values for the configuration. | `@evt.name:"Log Management" @asset.type:"exclusion filter"` |
| [Index configuration][58] | A user created, modified, or deleted the configuration of an index and the previous and new values for the configuration. | `@evt.name:"Log Management" @asset.type:index` |
| [Index order modified][104] | A user modified the order of indexes. | `@evt.name:"Log Management" @action:modified @asset.type:index_list` |
| [Log pipeline][59] | A user created, modified, or deleted a log pipeline or nested pipeline and the previous and new values for the configuration. | `@evt.name:"Log Management" @asset.type:pipeline` |
| [Processor][60] | A user created, modified, or deleted a processor within a pipeline and the previous and new values for the configuration. | `@evt.name:"Log Management" @asset.type:pipeline_processor` |
| [Facet][56] | A user created, modified, or deleted a facet in the Log Explorer and the previous and new values for the facet configuration.| `@evt.name:"Log Management" @asset.type:facet` |
| [Standard attribute configuration][63] | A user created, modified, or deleted the configuration of a standard attribute in logs and the previous and new values for the configuration. | `@evt.name:"Log Management" @asset.type:standard_attribute` |
| [Query][61] (Public Beta)| A user ran a Log Management List query either in Log Explorer, Dashboards or through the Public API. | `@evt.name:"Log Management" @asset.type:logs_query` |
| [Restriction query configuration][62] | A user created, modified, or deleted the configuration of a restriction query in logs and the previous and new values for the configuration. | `@evt.name:"Log Management" @asset.type:restriction_query` |
| [Download as CSV][64] | A user exports list of logs as CSV | `@evt.name:"Log Management" @asset.type:logs_csv` |
| [Historical view][57] | A user created, modified, aborted, or deleted a historical view for logs and the previous and new values for the historical view configuration. | `@evt.name:"Log Management" @asset.type:historical_view` |
| [Saved view][106] | A user created, modified, or deleted a saved view. | `@evt.name:"Log Management" @action:(created OR modified OR deleted) @asset.type:saved_view` |
| [Log forwarding][103] | A user created, modified, or deleted a custom destination. | `@evt.name:"Log Management" @action:(created OR modified OR deleted) @asset.type:log_forwarding` |

### LLM Observability

| Name                      | Description of audit event                                                                                                                           | Query in audit explorer                           |
|---------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------| --------------------------------------------------|
| [Evaluation Metrics][164] | A user has enabled, disabled, or modified the configuration (for example, set sample rate) of an [out-of-the-box evaluation][165] metric for an application. | `@evt.name:"LLM Observability" @action:(enabled OR modified OR disabled) @asset.type:evaluations` |

### Metrics events
| Name | Description of audit event                                          | Query in audit explorer                           |
| ---- |------------------------------------------------------------------- | --------------------------------------------------|
| [Custom metric created][65] | A user created a custom metric and the new value for the custom metric configuration. | `@evt.name:Metrics @asset.type:metric @action:created` |
| [Custom metric modified][67] | A user modified a custom metric and the previous and new values for the custom metric configuration. | `@evt.name:Metrics @asset.type:metric @action:modified` |
| [Custom metric deleted][66] | A user deleted a custom metric. Also provides the previous value for the custom metric configuration. | `@evt.name:Metrics @asset.type:metric @action:deleted` |

### Monitor events

| Name             | Description of audit event                                           | Query in audit explorer                                  |
| ---------------- | -------------------------------------------------------------------- | ---------------------------------------------------------|
| [Monitor created][68]  | A monitor is created and the new JSON value for the monitor.                 | `@evt.name:Monitor @asset.type:monitor @action:created`  |
| [Monitor modified][70] | A monitor is modified and the previous and new JSON values for the monitor. | `@evt.name:Monitor @asset.type:monitor @action:modified` |
| [Monitor deleted][69]  | A monitor is deleted. Also provides the previous JSON value for the monitor.           | `@evt.name:Monitor @asset.type:monitor @action:deleted`  |
| [Monitor resolved][71] | A monitor is resolved.                                               | `@evt.name:Monitor @asset.type:monitor @action:resolved` |

### Notebook events

| Name              | Description of audit event                                            | Query in audit explorer                                     |
| ----------------- | --------------------------------------------------------------------- | ----------------------------------------------------------- |
| [Notebook created][72]  | A notebook is created and the new JSON value for the notebook.                 | `@evt.name:Notebook @asset.type:notebook @action:created`   |
| [Notebook modified][74] | A notebook is modified and the previous and new JSON values for the notebook. | `@evt.name:Notebook @asset.type:notebook @action:modified`  |
| [Notebook deleted][73]  | A notebook is deleted and the previous JSON value for the notebook.           | `@evt.name:Notebook @asset.type:notebook @action:deleted`   |

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
| [Login method override][82] | Datadog has detected a user login method override that is different from the default login methods set for the organization.| `@evt.name:"Security Notification" @asset.type:user @action:notification` |
| [Token leaked][81] | Datadog has detected a leaked Datadog API or Application Key that should be revoked.| `@evt.name:"Security Notification" @asset.type:(api_key OR application_key) @action:notification` |
| [Unusual login][83] | Datadog has detected a unusual login event.| `@evt.name:"Security Notification" @asset.type:unusual_login @action:notification` |
| [User invited with throwaway email][102] | Datadog has detected that a user with an email from a free or disposable email provider was invited to the organization.| `@evt.name:"Security Notification" @asset.type:user_invite @action:notification` |

### Sensitive Data Scanner events
| Name | Description of audit event                                          | Query in audit explorer                           |
| ---- | ------------------------------------------------------------------- | --------------------------------------------------|
| [Scanning group][84] | A user created, modified, or deleted a scanning group in Sensitive Data Scanner and the previous and new values for the configuration. | `@evt.name:"Sensitive Data Scanner" @asset.type:sensitive_data_scanner_scanning_group` |
| [Scanning group order modified][114] | A user modified the order of scanning groups. | `@evt.name:"Sensitive Data Scanner" @asset.type:sensitive_data_scanner_scanning_group_list` |
| [Scanning rule][85] | A user created, modified, or deleted a scanning rule within a scanning group in Sensitive Data Scanner and the previous and new values for the configuration. | `@evt.name:"Sensitive Data Scanner" @asset.type:sensitive_data_scanner_scanning_rule` |

### Service Level Objectives (SLO) events

| Name          | Description of audit event                                                                       | Query in audit explorer                  |
| ------------- | ------------------------------------------------------------------------------------------------ | -----------------------------------------|
| [SLO][86]           | A user creates, modifies, or deletes an SLO and the previous and new values for the SLO.| `@evt.name:SLO @asset.type:slo`            |
| [SLO correction][87]| A user creates, modifies, or deletes an SLO correction and the previous and new values for the SLO correction. | `@evt.name:SLO @asset.type:slo_correction` |

### Sheets events

| Name               | Description of audit event                                         | Query in audit explorer                                                                         |
|--------------------|--------------------------------------------------------------------|-------------------------------------------------------------------------------------------------|
| [Spreadsheet][169] | A user creates, modifies, deletes, or accesses a spreadsheet.      | `@evt.name:Sheets @asset.type:spreadsheet @action:(created OR modified OR deleted OR accessed)` |
| [Table][170]       | A user creates, modifies, or deletes a table within a spreadsheet. | `@evt.name:Sheets @asset.type:table @action:(created OR modified OR deleted)`                   |
| [Pivot][171]       | A user creates, modifies, or deletes a pivot within a spreadsheet. | `@evt.name:Sheets @asset.type:pivot @action:(created OR modified OR deleted)`                   |

### Synthetic Monitoring events
| Name                     | Description of audit event                                          | Query in audit explorer                           |
| ------------------------ | ------------------------------------------------------------------- | --------------------------------------------------|
| [Private location][88] | A user created or deleted a private location for Synthetic tests. | `@evt.name:"Synthetics Monitoring" @asset.type:synthetics_private_location` |
| [Synthetic settings][92] | A user modified Synthetic settings (quotas, PL access) and the previous and new setting values. | `@evt.name:"Synthetics Monitoring" @asset.type:synthetics_settings @action:modified` |
| [Synthetic test created or deleted][89] | A user created or deleted a Synthetic test. | `@evt.name:"Synthetics Monitoring" @asset.type:synthetics_test @action:(created OR deleted)` |
| [Synthetic test modified][90] | A user modified a Synthetic test and the previous and new values for the configuration. | `@evt.name:"Synthetics Monitoring" @asset.type:synthetics_test @action:modified` |
| [Synthetic variable][91] | A user created, modified, or deleted a Synthetic variable. | `@evt.name:"Synthetics Monitoring" @asset.type:synthetics_variable` |

### Reference Table events
| Name                     | Description of audit event                                          | Query in audit explorer                           |
| ------------------------ | ------------------------------------------------------------------- | --------------------------------------------------|
| [Reference Table][93] | A user created, deleted, or modified a reference table. | `@evt.name:"Reference Tables" @asset.type:reference_table @action:(created OR deleted OR modified)` |
| [Reference Table File][94] | A user uploaded a file or imported a file with a cloud provider for a reference table. | `@evt.name:"Reference Tables" @asset.type:reference_table_file @action:(uploaded OR imported)` |                                                      |

### Teams Management events
| Name                     | Description of audit event                                          | Query in audit explorer                           |
| ------------------------ | ------------------------------------------------------------------- | --------------------------------------------------|
| [Teams Management][95] | A user created, deleted, or modified a team or team association. | `@evt.name:"Teams Management" @action:(created OR deleted OR modified)` |

### Test Optimization events
| Name                            | Description of audit event                                   | Query in audit explorer                                                                                               |
|---------------------------------|--------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------|
| [Test Optimization settings][172]     | A user modified or deleted the settings of a repository or a service.   | `@evt.name:"Test Optimization" @asset.type:test_optimization_settings (@action:modified OR @action:deleted)`            |
| [Test Optimization default settings][173]     | A user modified or deleted the default settings.   | `@evt.name:"Test Optimization" @asset.type:test_optimization_default_settings (@action:modified OR @action:deleted)`            |
| [Flaky Test Status][174]     | A user modified the status of a flaky test.   | `@evt.name:"Test Optimization" @asset.type:"test_optimization_management" @action:modified `            |

### Workflow events
| Name                     | Description of audit event                                          | Query in audit explorer                           |
| ------------------------ | ------------------------------------------------------------------- | --------------------------------------------------|
| [Workflow][96] | A user created, deleted, or modified a workflow, or a workflow executed. | `@evt.name:"Workflows" @asset.type:workflow @action:(created OR deleted OR modified OR executed)` |
| [Workflow Schedule][97] | A user created, deleted, or modified a schedule for a workflow. | `@evt.name:"Workflows" @asset.type:workflow_schedule @action:(created OR deleted OR modified)` |
| [Workflow Action][98] | A user responded to a Slack prompt during the execution of a workflow. | `@evt.name:"Workflows" @asset.type:workflow_action @action:(responded)` |
| [Notifications][111] | A notification configuration was created, modified, or deleted for a workflow.| `@evt.name:Workflows @action:(created OR modified OR deleted) @asset.type:workflow_notifications` |
| [Custom Connection][99] | A user created, deleted, or modified a connection. | `@evt.name:"Custom Connections" @asset.type:custom_connection @action:(created OR deleted OR modified)` |
| [Step completed][110] | A step was completed. | `@evt.name:Workflows @action:completed @asset.type:step`|

### App Datastore
| Name                     | Description of audit event                                          | Query in audit explorer                           |
| ------------------------ | ------------------------------------------------------------------- | --------------------------------------------------|
| [Datastore][116] | A user created, deleted, queried, or listed datastores. | `@evt.name:"Apps Datastore" @asset.type:(datastore OR datastore_list) @action:(queried OR created OR deleted)` |
| [Datastore item][117] | A user created, modified, deleted, or queried datastore items. | `@evt.name:"Apps Datastore" @asset.type:(item OR item_query) @action:(created OR deleted OR modified OR queried)` |

### Event Management
| Name                     | Description of audit event                                          | Query in audit explorer                           |
| ------------------------ | ------------------------------------------------------------------- | --------------------------------------------------|
| [Correlation pattern][118] | A user created a correlation pattern. | `@evt.name:"Event Management" @asset.type:event_correlation` |
| [Custom metrics][119] | A user created modified or deleted a custom metric. | `@evt.name:"Event Management" @asset.type:custom_metrics` |

### Private Action Runners
| Name                     | Description of audit event                                          | Query in audit explorer                           |
| ------------------------ | ------------------------------------------------------------------- | --------------------------------------------------|
| [Private action runner][120] | A user successfully accessed, created, deleted, or modified a runner, or a user attached a runner to a connection. | `@evt.name:"Private Action Runners" @asset.type:private_action_runner @action:(accessed OR created OR deleted OR modified OR attached)` |
| [Query intent][121] | A user successfully created a query intent, or a runner successfully validated a query intent. | `@evt.name:"Private Action Runners" @asset.type:query_intent @action:(validated OR created)` |
| [Runner enrollment token][122] | A user successfully created a runner enrollment token, or a runner successfully completed enrollment. | `@evt.name:"Private Action Runners" @asset.type:runner_enrollment @action:(completed OR created)` |

### Observability Pipelines
| Name                     | Description of audit event                                          | Query in audit explorer                           |
| ------------------------ | ------------------------------------------------------------------- | --------------------------------------------------|
| [Create draft pipeline][123] | A user created a draft pipeline. | `@evt.name:"Observability Pipelines" @asset.type:pipelines_draft @action:created` |
| [Modify draft pipeline][124] | A user modified a draft pipeline. | `@evt.name:"Observability Pipelines" @asset.type:pipelines_draft @action:modified` |
| [Access Pipeline configuration][125] | A user accessed the pipeline configuration for a specific pipeline by ID. | `@evt.name:"Observability Pipelines" @asset.type:pipelines_configuration @action:accessed` |
| [Modify Pipeline ][126] | A user modified an existing pipeline configuration. | `@evt.name:"Observability Pipelines" @asset.type:pipelines_configuration @action:modified` |
| [Create pipeline][127] | A user created a pipeline. | `@evt.name:"Observability Pipelines" @asset.type:pipelines_configuration @action:created` |
| [Delete pipeline][128] |  A user deleted a pipeline. | `@evt.name:"Observability Pipelines" @asset.type:pipelines_configuration @action:deleted` |
| [Access pipeline configuration list][129] | A user accessed the pipeline configuration list. | `@evt.name:"Observability Pipelines" @asset.type:pipelines_configuration_list @action:accessed` |
| [Access pipeline][130] | A user accessed a pipeline. | `@evt.name:"Observability Pipelines" @asset.type:obs_pipelines @action:accessed` |
| [Access worker version list][131] | A user accessed the worker versions list. | `@evt.name:"Observability Pipelines" @asset.type:pipeline @action:accessed @asset.name:"worker versions list"` |
| [Access configuration count][132] | A user accessed the configuration count for a pipeline. | `@evt.name:"Observability Pipelines" @asset.type:pipeline @action:accessed @asset.name:"configuration count"` |
| [Access pipeline list][133] | A user accessed the pipeline list. | `evt.name:"Observability Pipelines" @asset.type:pipeline @action:accessed @asset.name:"pipeline list"` |
| [Access pipeline by ID][134] | A user accessed a specific pipeline by ID. | `@evt.name:"Observability Pipelines" @asset.type:pipeline @action:accessed @asset.name:"pipeline"` |
| [Validate worker configuration component][135] | A user successfully validated the worker configuration component. | `@evt.name:"Observability Pipelines" @asset.type:pipeline @action:accessed @asset.name:"worker configuration component"` |
| [Access version hash list][136] | A user accessed the version hash list for a pipeline. | `@evt.name:"Observability Pipelines" @asset.type:pipeline @action:accessed @asset.name:"version hash list"` |
| [Access worker component list][137] | A user accessed the worker component list for a pipeline. | `@evt.name:"Observability Pipelines" @asset.type:pipeline @action:accessed @asset.name:"worker component list"` |
| [Access deployment list][138] | A user accessed the deployment list for a pipeline. | `@evt.name:"Observability Pipelines" @asset.type:deployment` |
| [Access pipeline draft][139] | A user accessed a draft pipeline.  | `@evt.name:"Observability Pipelines" @asset.type:draft` |

### On-Call
| Name                               | Description of audit event            | Query in audit explorer                                              |
|------------------------------------|---------------------------------------|----------------------------------------------------------------------|
| [Create a schedule][140]           | A user created a schedule.            | `@evt.name:"On-Call" @asset.type:schedule @action:created`           |
| [Modify a schedule][141]           | A user modified a schedule.           | `@evt.name:"On-Call" @asset.type:schedule @action:modified`          |
| [Delete a schedule][142]           | A user deleted a schedule.            | `@evt.name:"On-Call" @asset.type:schedule @action:deleted`           |
| [Create an escalation policy][143] | A user created an escalation policy.  | `@evt.name:"On-Call" @asset.type:escalation_policy @action:created`  |
| [Modify an escalation policy][144] | A user modified an escalation policy. | `@evt.name:"On-Call" @asset.type:escalation_policy @action:modified` |
| [Delete an escalation policy][145] | A user deleted an escalation policy.  | `@evt.name:"On-Call" @asset.type:escalation_policy @action:deleted`  |
| [Create team rules][146]           | A user created team rules.            | `@evt.name:"On-Call" @asset.type:team_rules @action:created`         |
| [Modify team rules][147]           | A user modified team rules.           | `@evt.name:"On-Call" @asset.type:team_rules @action:modified`        |
| [Create a schedule override][148]  | A user created a schedule override.   | `@evt.name:"On-Call" @asset.type:override @action:created`           |
| [Modify a schedule override][149]  | A user modified a schedule override.  | `@evt.name:"On-Call" @asset.type:override @action:modified`          |
| [Delete a schedule override][150]  | A user deleted a schedule override.   | `@evt.name:"On-Call" @asset.type:override @action:deleted`           |

### Infrastructure Monitoring
| Name                                  | Description of audit event              | Query in audit explorer                                                                               |
|---------------------------------------|-----------------------------------------|-------------------------------------------------------------------------------------------------------|
| [Enable Container Image Trends][151]  | A user enabled Container Image Trends.  | `@evt.name:"Infrastructure Monitoring" @asset.type:configure_container_image_trends @action:enabled`  |
| [Disable Container Image Trends][152] | A user disabled Container Image Trends. | `@evt.name:"Infrastructure Monitoring" @asset.type:configure_container_image_trends @action:disabled` |

### Network Device Monitoring
| Name                                  | Description of audit event                | Query in audit explorer                                                                    |
|---------------------------------------|-------------------------------------------|--------------------------------------------------------------------------------------------|
| [Modify NetFlow port mappings][153]   | A user modified NetFlow port mappings.    | `@evt.name:"Network Device Monitoring" @asset.type:netflow_port_mappings @action:modified` |
| [Delete NetFlow port mappings][154]   | A user deleted NetFlow port mappings.     | `@evt.name:"Network Device Monitoring" @asset.type:netflow_port_mappings @action:deleted`  |
| [Access network device profiles][155] | A user accessed network device profiles.  | `@evt.name:"Network Device Monitoring" @asset.type:network_device @action:accessed`        |
| [Access network device details][156]  | A user accessed network device details.   | `@evt.name:"Network Device Monitoring" @asset.type:network_device @action:accessed`        |
| [Access network interfaces][157]      | A user accessed network interfaces.       | `@evt.name:"Network Device Monitoring" @asset.type:network_device @action:accessed`        |
| [Access network devices list][158]    | A user accessed the network devices list. | `@evt.name:"Network Device Monitoring" @asset.type:network_device @action:accessed`        |
| [Access network device facets][159]   | A user accessed network device facets.    | `@evt.name:"Network Device Monitoring" @asset.type:network_device @action:accessed`        |
| [Access network device groups][160]   | A user accessed network device groups.    | `@evt.name:"Network Device Monitoring" @asset.type:network_device @action:accessed`        |
| [Access network device tags][161]     | A user accessed network device tags.      | `@evt.name:"Network Device Monitoring" @asset.type:network_device_tags @action:accessed`   |
| [Modify network device tags][162]     | A user modified network device tags."     | `@evt.name:"Network Device Monitoring" @asset.type:network_device_tags @action:modified`   |
| [Access network MIB leaves][163]      | A user accessed network MIB leaves.       | `@evt.name:"Network Device Monitoring" @asset.type:network_device @action:accessed`        |


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
[37]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Quality%20Gates%22%20%40asset.type%3Aci_app_quality_gates%20%28%40action%3Acreated%20OR%20%40action%3Amodified%20OR%20%40action%3Adeleted%29
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
[103]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Log%20Management%22%20%40action%3A%28created%20OR%20modified%20OR%20deleted%29%20%40asset.type%3Alog_forwarding%20
[104]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Log%20Management%22%20%40action%3Amodified%20%40asset.type%3Aindex_list%20
[105]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Log%20Management%22%20%40action%3Amodified%20%40asset.type%3Aarchive_list%20
[106]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Log%20Management%22%20%40action%3A%28created%20OR%20modified%20OR%20deleted%29%20%40asset.type%3Asaved_view%20
[107]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22App%20Builder%22%20%40asset.type%3Aquery%20%40action%3Astarted%20
[108]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22App%20Builder%22%20%40asset.type%3Aquery%20%40action%3Aexecuted%20
[109]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22App%20Builder%22%20%40asset.type%3Aapp%20%40action%3A%28accessed%20OR%20created%20OR%20modified%20OR%20published%20OR%20deleted%20OR%20reverted%20OR%20unpublished%29%20
[110]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AWorkflows%20%40action%3Acompleted%20%40asset.type%3Astep%20
[111]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AWorkflows%20%40action%3A%28created%20OR%20modified%20OR%20deleted%29%20%40asset.type%3Aworkflow_notifications%20
[112]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AAPM%20%40action%3A%28created%20OR%20modified%20OR%20deleted%29%20%40asset.type%3Asaved_view%20
[113]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AAPM%20%40action%3A%28created%20OR%20modified%20OR%20deleted%29%20%40asset.type%3Acustom_metrics%20
[114]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Sensitive%20Data%20Scanner%22%20%40action%3Amodified%20%40asset.type%3Asensitive_data_scanner_scanning_group_list%20
[115]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Access%20Management%22%20%40evt.actor.type%3ASUPPORT_USER%20%40asset.type%3Aip_allowlist%20%40action%3Amodified
[116]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Apps%20Datastore%22%20%40asset.type%3A%28datastore%20OR%20datastore_list%29%20%40action%3A%28queried%20OR%20created%20OR%20deleted%29&agg_m=count&agg_m_source=base&agg_q=%40evt.name&agg_q_source=base&agg_t=count&cols=log_usr.id%2Clog_action%2Clog_evt.name&fromUser=true&messageDisplay=expanded-md&refresh_mode=sliding&stream_sort=desc&top_n=10&top_o=top&viz=stream&x_missing=true&from_ts=1740047181634&to_ts=1740048081634&live=true
[117]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Apps%20Datastore%22%20%40asset.type%3A%28item%20OR%20item_query%29%20%40action%3A%28created%20OR%20deleted%20OR%20modified%20OR%20queried%29&agg_m=count&agg_m_source=base&agg_q=%40evt.name&agg_q_source=base&agg_t=count&cols=log_usr.id%2Clog_action%2Clog_evt.name&fromUser=true&messageDisplay=expanded-md&refresh_mode=sliding&stream_sort=desc&top_n=10&top_o=top&viz=stream&x_missing=true&from_ts=1740047539454&to_ts=1740048439454&live=true
[118]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Event%20Management%22%20%40asset.type%3Aevent_correlation&agg_m=count&agg_m_source=base&agg_q=%40evt.name&agg_q_source=base&agg_t=count&cols=log_usr.id%2Clog_action%2Clog_evt.name
[119]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Event%20Management%22%20%40asset.type%3Acustom_metrics&agg_m=count&agg_m_source=base&agg_q=%40evt.name
[120]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Private%20Action%20Runners%22%20%40asset.type%3Aprivate_action_runner%20%40action%3A%28accessed%20OR%20created%20OR%20deleted%20OR%20modified%20OR%20attached%29&agg_m=count&agg_m_source=base&agg_q=%40evt.name
[121]:https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Private%20Action%20Runners%22%20%40asset.type%3Aquery_intent%20%40action%3A%28validated%20OR%20created%29&agg_m=count&agg_m_source=base&agg_q=%40evt.name
[122]:https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Private%20Action%20Runners%22%20%40asset.type%3Arunner_enrollment%20%40action%3A%28completed%20OR%20created%29
[123]:https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Observability%20Pipelines%22%20%40asset.type%3Apipelines_draft%20%40action%3Acreated
[124]:https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Observability%20Pipelines%22%20%40asset.type%3Apipelines_draft%20%40action%3Amodified
[125]:https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Observability%20Pipelines%22%20%40asset.type%3Apipelines_configuration%20%40action%3Aaccessed
[126]:https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Observability%20Pipelines%22%20%40asset.type%3Apipelines_configuration%20%40action%3Amodified
[127]:https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Observability%20Pipelines%22%20%40asset.type%3Apipelines_configuration%20%40action%3Acreated
[128]:https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Observability%20Pipelines%22%20%40asset.type%3Apipelines_configuration%20%40action%3Adeleted
[129]:https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Observability%20Pipelines%22%20%40asset.type%3Apipelines_configuration_list%20%40action%3Aaccessed
[130]:https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Observability%20Pipelines%22%20%40asset.type%3Aobs_pipelines%20%40action%3Aaccessed
[131]:https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Observability%20Pipelines%22%20%40asset.type%3Apipeline%20%40action%3Aaccessed%20%40asset.name%3A%22worker%20versions%20list%22
[132]:https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Observability%20Pipelines%22%20%40asset.type%3Apipeline%20%40action%3Aaccessed%20%40asset.name%3A%22configuration%20count%22
[133]:https://app.datadoghq.com/audit-trail?query=evt.name%3A%22Observability%20Pipelines%22%20%40asset.type%3Apipeline%20%40action%3Aaccessed%20%40asset.name%3A%22pipeline%20list%22
[134]:https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Observability%20Pipelines%22%20%40asset.type%3Apipeline%20%40action%3Aaccessed%20%40asset.name%3A%22pipeline%22
[135]:https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Observability%20Pipelines%22%20%40asset.type%3Apipeline%20%40action%3Aaccessed%20%40asset.name%3A%22worker%20configuration%20component%22
[136]:https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Observability%20Pipelines%22%20%40asset.type%3Apipeline%20%40action%3Aaccessed%20%40asset.name%3A%22version%20hash%20list%22
[137]:https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Observability%20Pipelines%22%20%40asset.type%3Apipeline%20%40action%3Aaccessed%20%40asset.name%3A%22worker%20component%20list%22
[138]:https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Observability%20Pipelines%22%20%40asset.type%3Adeployment&agg_m=count
[139]:https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Observability%20Pipelines%22%20%40asset.type%3Adraft&agg_m=count&agg_m_source=base
[140]:https://app.datadoghq.com/audit-trail?query=%40evt.name%3AOn-Call%20%40action%3Acreated%20%40asset.type%3Aschedule
[141]:https://app.datadoghq.com/audit-trail?query=%40evt.name%3AOn-Call%20%40action%3Amodified%20%40asset.type%3Aschedule
[142]:https://app.datadoghq.com/audit-trail?query=%40evt.name%3AOn-Call%20%40action%3Adeleted%20%40asset.type%3Aschedule
[143]:https://app.datadoghq.com/audit-trail?query=%40evt.name%3AOn-Call%20%40action%3Acreated%20%40asset.type%3Aescalation_policy
[144]:https://app.datadoghq.com/audit-trail?query=%40evt.name%3AOn-Call%20%40action%3Amodified%20%40asset.type%3Aescalation_policy
[145]:https://app.datadoghq.com/audit-trail?query=%40evt.name%3AOn-Call%20%40action%3Adeleted%20%40asset.type%3Aescalation_policy
[146]:https://app.datadoghq.com/audit-trail?query=%40evt.name%3AOn-Call%20%40action%3Acreated%20%40asset.type%3Ateam_rules
[147]:https://app.datadoghq.com/audit-trail?query=%40evt.name%3AOn-Call%20%40action%3Amodified%20%40asset.type%3Ateam_rules
[148]:https://app.datadoghq.com/audit-trail?query=%40evt.name%3AOn-Call%20%40action%3Acreated%20%40asset.type%3Aoverride
[149]:https://app.datadoghq.com/audit-trail?query=%40evt.name%3AOn-Call%20%40action%3Amodified%20%40asset.type%3Aoverride
[150]:https://app.datadoghq.com/audit-trail?query=%40evt.name%3AOn-Call%20%40action%3Adeleted%20%40asset.type%3Aoverride
[151]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Infrastructure%20Monitoring%22%20%40asset.type%3Aconfigure_container_image_trends%20%40action%3Aenabled
[152]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Infrastructure%20Monitoring%22%20%40asset.type%3Aconfigure_container_image_trends%20%40action%3Adisabled
[153]:https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Network%20Device%20Monitoring%22%20%40asset.type%3Anetflow_port_mappings%20%40action%3Amodified
[154]:https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Network%20Device%20Monitoring%22%20%40asset.type%3Anetflow_port_mappings%20%40action%3Adeleted
[155]:https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Network%20Device%20Monitoring%22%20%40asset.type%3Anetwork_device%20%40action%3Aaccessed
[156]:https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Network%20Device%20Monitoring%22%20%40asset.type%3Anetwork_device%20%40action%3Aaccessed
[157]:https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Network%20Device%20Monitoring%22%20%40asset.type%3Anetwork_device%20%40action%3Aaccessed
[158]:https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Network%20Device%20Monitoring%22%20%40asset.type%3Anetwork_device%20%40action%3Aaccessed
[159]:https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Network%20Device%20Monitoring%22%20%40asset.type%3Anetwork_device%20%40action%3Aaccessed
[160]:https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Network%20Device%20Monitoring%22%20%40asset.type%3Anetwork_device%20%40action%3Aaccessed
[161]:https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Network%20Device%20Monitoring%22%20%40asset.type%3Anetwork_device_tags%20%40action%3Aaccessed
[162]:https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Network%20Device%20Monitoring%22%20%40asset.type%3Anetwork_device_tags%20%40action%3Amodified
[163]:https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Network%20Device%20Monitoring%22%20%40asset.type%3Anetwork_device%20%40action%3Aaccessed
[164]:https://app.datadoghq.com/audit-trail?query=%20%40evt.name%3A"LLM%20Observability"%20%40action%3A%28enabled%20OR%20modified%20OR%20disabled%29%20%40asset.type%3Aevaluations
[165]:/llm_observability/evaluations/ootb_evaluations
[166]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Datadog%20Agent%22%20%40metadata.event_name%3A%22Agent%20API%20Key%20Updated%22
[167]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Datadog%20Agent%22%20%40metadata.event_name%3A%22Agent%20Upgrade%20Succeeded%22
[168]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Datadog%20Agent%22%20%40metadata.event_name%3A%22Agent%20Upgrade%20Failed%22
[169]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ASheets%20%40asset.type%3Aspreadsheet%20%40action%3A%28created%20OR%20modified%20OR%20deleted%20OR%20accessed%29
[170]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ASheets%20%40asset.type%3Atable%20%40action%3A%28created%20OR%20modified%20OR%20deleted%29
[171]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ASheets%20%40asset.type%3Apivot%20%40action%3A%28created%20OR%20modified%20OR%20deleted%29
[172]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Test%20Optimization%22%20%40asset.type%3Atest_optimization_settings%20%28%40action%3Acreated%20OR%20%40action%3Amodified%20OR%20%40action%3Adeleted%29
[173]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Test%20Optimization%22%20%40asset.type%3Atest_optimization_default_settings%20%28%40action%3Acreated%20OR%20%40action%3Amodified%20OR%20%40action%3Adeleted%29
[174]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Test%20Optimization%22%20%40asset.type%3A%22test_optimization_management%22%20%40action%3Amodified
