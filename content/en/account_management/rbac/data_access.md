---
title: Data Access Control
description: Define a Restricted Dataset for access control
is_public: true
further_reading:
    - link: '/data_security/'
      tag: 'Documentation'
      text: 'Reducing Data Related Risks'
---

## Overview

Your data in Datadog may contain sensitive data, and should be handled carefully. If you are ingesting sensitive data into Datadog, Data Access Control enables administrators and access managers within a Datadog organization to regulate access to this data. Use Data Access Control to identify sensitive data with a query and restrict access to only specific [Teams][1] or [Roles][2].

When you define a _Restricted Dataset_, any data within the boundary of that dataset is restricted. Data outside of any Restricted Dataset remains unrestricted and accessible to users with appropriate permissions. Data Access Control provides an intuitive interface that allows access managers to grant only permitted users access to sensitive data enclosed within the datasets.

## Prerequisites

### Configure access controls

Data Access Control builds on your organization's existing Datadog access control configuration. Set up [Access Controls][3] first before configuring Data Access Control.

### Tag incoming data

Data Access Control relies on tags and attributes in your data that can be used to define an access boundary. If you do not have tags defined, consider [Getting Started with Tags][4] before configuring Data Access Control.

## Configure data access

Data Access Control allows you to create a Restricted Dataset, specifying data that only users in designated teams or roles can access.

To view all of your Restricted Datasets, navigate to [Organization Settings][6], and select [Data Access Controls][7] on the left, under the {{< ui >}}Access{{< /ui >}} heading.

### Datadog site

Log in as a user assigned the Datadog Admin role, or any user with a role in your organization with the [`user_access_manage` permission][5].

1. Navigate to [Organization Settings][6].
1. On the left side of the page, select [Data Access Controls][7].
1. Click {{< ui >}}New Restricted Dataset{{< /ui >}}.

In order to create a Restricted Dataset, identify the data to be restricted with a query.

{{< img src="/account_management/rbac/restricted_dataset-3.png" alt="Create a Restricted Dataset dialog. Selects data in RUM, APM, Logs, and Metrics matching the tag service:hr. Grants access to a Privileged access team.">}}

Name Dataset
: A descriptive name to help users understand what data is contained in the dataset.

Select data to be included in this Dataset
: The boundary definition that describes which data to restrict to a specific set of users. Boundaries are query statements with limitations that allow an access manager to define the scope of sensitive data to be protected. The [supported telemetry types][10] are custom metrics, RUM sessions, APM traces, logs, cloud costs, error tracking issues, Software Delivery repository info (CI Visibility pipelines), and Workload Protection Agent Events.

Grant access
: Select one or more teams or roles that may access the content bound in the Restricted Dataset. Any users who are not members of these groups are blocked from accessing this data.

You may create a maximum of 10 key:value pairs per Restricted Dataset. Consider defining an additional Restricted Dataset if you need additional pairs.

After completing all the fields to define the dataset, click {{< ui >}}Create Restricted Dataset{{< /ui >}} to apply it to your organization.

You may create a maximum of 100 Restricted Datasets under the Enterprise plan, and a maximum of 10 datasets otherwise. Enterprise customers using [Strict Mode](#strict-mode) may create up to 1,000 Restricted Datasets.

### Supported telemetry types {#supported-telemetry}

- Agent Observability traces
- APM traces
- Cloud costs
- Error Tracking issues
- Logs
- RUM sessions
- Software Delivery repository info (in CI Visibility pipelines)
- Workload Protection Agent Events

The following are available as a Preview upon request:
- Custom metrics
    - **Note:** Standard and OpenTelemetry (OTel) metrics are not supported

## Advanced configuration

### Strict Mode

By default, Data Access Control operates in _Standard Mode_, which means any data outside a Restricted Dataset remains visible to users with appropriate permissions. _Strict Mode_ inverts this for a specific telemetry type: once enabled, users see no data for that telemetry type unless they are explicitly granted access through a Restricted Dataset.

Strict Mode is useful for especially sensitive data, when:
- Telemetry tagging is inconsistent, so a Standard Mode boundary risks leaving sensitive records uncovered.
- New tag values are added frequently, and you cannot guarantee every new value is matched by an existing Restricted Dataset.
- Compliance posture requires a default-deny stance for a telemetry type.

Strict Mode is configured per telemetry type. A telemetry type must have at least one Restricted Dataset before it can be switched to Strict Mode. This prevents unintentional loss of access. If all Restricted Datasets are later deleted from a telemetry type in Strict Mode, only [Unrestricted User Groups](#unrestricted-user-groups) retain access until new datasets are created or the mode is switched back to Standard.

Restricted Datasets cannot be shared between Standard and Strict modes (each dataset belongs to one mode).

**Before enabling Strict Mode**, verify what data is _not_ already in a Restricted Dataset for that telemetry type. That data is hidden once Strict Mode is enabled. Review the existing Restricted Datasets on the [Data Access Controls][7] page to confirm coverage.

To change restriction mode for a telemetry type, navigate to [Data Access Controls][7]. Users must have the [`user_access_manage` permission][5] to change restriction modes.

### Unrestricted User Groups

Some users, such as high-privilege admins or central observability teams with access to data across the entire organization, need full visibility into a telemetry type regardless of any Restricted Datasets. Rather than adding these users to every Restricted Dataset individually, you can grant their team or role _unrestricted access_ for a specific telemetry type.

A team or role with unrestricted access for a telemetry type sees all data for that telemetry type, regardless of Restricted Dataset boundaries or restriction mode. Unrestricted access is granted to teams or roles (not individual users) and is configured per telemetry type. For example, a role can have unrestricted access to Logs without affecting access to RUM.

Unrestricted User Groups pair especially well with Strict Mode because they let designated admins keep working without being added to every dataset.

**Note:** Other access control methods (such as [Logs Restriction Queries][11] and [Permissions][3]) still apply to users in Unrestricted User Groups.

## Usage constraints

After you turn on Data Access Control, Datadog disables or limits other features to control access to sensitive data. See the list of affected features below to see how they are restricted.

### Real User Monitoring (RUM)

#### Session Replay: Extended Retention
By default, Session Replay data is retained for 30 days. To extend retention to 15 months, you can enable Extended Retention on individual session replays. When you create a restricted dataset for RUM, Datadog disables the option for Extended Retention.

#### Session Replay: Playlists

Playlists are collections of Session Replays you can aggregate in a folder-like structure. When you create a restricted dataset for RUM, Datadog disables Session Replay Playlists.

### Logs
Data Access Control is separate from the existing [Logs RBAC permissions][11] feature, also known as log restriction queries. Datadog recommends using a single solution to restrict logs data. If you limit user access using both Data Access Control and log restriction queries, both sets of restrictions apply.

### Monitors
Users can create monitors that query and alert on active telemetry. While the user can only directly query data they're allowed to access, the monitor operates as a system user with full access to data.

If you are concerned about unauthorized data access through monitors, Datadog recommends that you track the monitors your users create. Then, restrict access to the creation of monitors that read sensitive data.

### Software Delivery repository info (CI Visibility pipelines)

* **Supported telemetry**: Only CI Visibility pipelines are supported. Test Optimizations tests are not supported.
* **CI Logs**: CI Logs are stored in the Log Management product. To restrict access to CI Logs, create a Logs dataset.
* **Supported dataset tags**: Only the following tags are supported:
  * `@git.repository_url`
  * `@git.repository.id`
  * `@git.repository.id_v2`
  * `@gitlab.groups`

### Agent Observability

* **Supported telemetry**: Only Agent Observability traces are supported. Experiments, datasets, annotation queues, and managed prompts are not supported.
* **OpenTelemetry**: When using [OpenTelemetry instrumentation][13], some data sent to Agent Observability may also be written to APM traces, as well as metrics and monitors. If you are protecting sensitive data with a Restricted Dataset on Agent Observability, consider also configuring Restricted Datasets on APM, metrics, or monitors with matching data boundaries.


## Select tags for access

Each Restricted Dataset can control access to multiple types of data, such as metrics. You are free to use the same or different tags across multiple types of telemetry. Within each telemetry type, you must use a _single_ tag or attribute to define your access strategy.

If you have too many combinations of tags or attributes to fit within these constraints, consider [revisiting your tagging][4] to define a new tag that better reflects your access strategy.

### Supported example

#### Restricted Dataset 1
- Telemetry Type: RUM
   - Filters: `@application.id:ABCD`

#### Restricted Dataset 2
* Telemetry type: RUM
    * Filters: `@application.id:EFGH`
* Telemetry type: Custom Metrics
    * Filters: `env:prod`

### Not supported example

#### Restricted Dataset 1:
* Telemetry type: RUM
    * Filters: `@application.id:ABCD`

#### Restricted Dataset 2:
* Telemetry type: RUM
    * Filters: `env:prod`

Restricted Dataset 1 uses `@application.id` as the tag for RUM data, so a new Restricted Dataset can't change to a different tag. Instead, consider reconfiguring Restricted Dataset 2 to use `@application.id`, or changing all of your Restricted Datasets with RUM data to use another tag.

### Not supported example

#### Restricted Dataset 1:
* Telemetry type: RUM
    * Filters: `@application.id:ABCD`

#### Restricted Dataset 2:
* Telemetry type: RUM
    * Filters: `@application.id:IJKL` `env:prod`

This example correctly uses the `@application.id` tag for RUM, as was done for Restricted Dataset 1. However, the limit is one tag per telemetry type. Instead, consider creating a Restricted Dataset with _either_ `application.id` or `env`, or identify a different tag that better combines these attributes.

## Best practices

### Access strategy

Before configuring Data Access Control, it's important to evaluate your access strategy. Consider reviewing [Reducing Data Related Risks][8] as you consider your access strategy. Removing or reducing unnecessary or sensitive data before it reaches Datadog reduces the need for additional access setup.

#### Protecting known sensitive data

If you have already identified which data needs to be protected, you can build your Data Access Control configuration around only this specific data. This ensures that non-sensitive data is generally available to your users, allowing them to collaborate and understand ongoing issues or incidents.

For example, if you have a single application that is instrumented with Real User Monitoring (RUM) and captures sensitive inputs from users, consider creating a Restricted Dataset only for that application:
* {{< ui >}}Name dataset:{{< /ui >}} Restricted RUM data
* {{< ui >}}Select data to be included in this Dataset:{{< /ui >}}
    * Telemetry type: RUM
        * Filters: `@application.id:<rum-app-id>`
* {{< ui >}}Grant access:{{< /ui >}}
    * Teams or roles of users who can see this RUM data

This configuration example would protect the RUM data from this application, and keep other data from this application available to existing users in your organization.

#### Protecting all data from a service

If you are instead looking to protect data from a specific service, you can build your Data Access Control configuration around the `service:` tag.

For example, if you have a service `NewService` that is instrumented with Real User Monitoring (RUM) and capturing sensitive inputs from users, consider creating a Restricted Dataset only for that application:

* {{< ui >}}Name Dataset:{{< /ui >}} Restricted NewService data
* {{< ui >}}Select data to be included in this Dataset:{{< /ui >}}
    * Telemetry type: RUM
        * Filters: `@service:NewService`
    * Telemetry type: Custom Metrics
        * Filters: `@service:NewService`
    * Telemetry type: APM
        * Filters: `@service:NewService`
    * Telemetry type: Logs
        * Filters: `@service:NewService`
* {{< ui >}}Grant access:{{< /ui >}}
    * Team who owns the service

This configuration example protects all supported data from `NewService`.

### Teams and roles

Data Access Control supports granting access to users through Datadog roles or teams. When granting access, consider your existing access control configuration and access strategy. If you are pursuing a service-based approach and are already [customizing the Catalog][9], take advantage of the service ownership model by using Teams as part of your Data Access Control configuration.

**Note:** Teams used for Data Access Control must be configured such that adding or removing users can only be done by team members or an administrator, not `Anyone in the organization`.

## Access enforcement

Users in a Datadog organization with Data Access Control enabled can only see query results for data to which they have access, such as in a Dashboard, in an Explorer, or through the API. A Restricted Dataset removes access to the data defined in the Restricted Dataset for users who are not permitted, across all Datadog experiences and entry points.

### Data explorers

When exploring Datadog with restrictions enabled, users without permissions can still browse the list of asset names (applications or metrics), but they cannot see query results, top tags, or facet details restricted by datasets. For instance, querying a metric with restricted data returns a blank graph, making it appear as if the query does not match any data.

### Dashboards and Notebooks

Similar to exploring data in a data explorer like the RUM Explorer or Metrics Explorer, viewing data in dashboards in an organization that has Restricted Datasets enabled only shows the data the user can access. Since dashboards are shared objects that can be accessed by others, it is possible for two users who have different access to view the same dashboard or notebook at the same time and see different data.

**Note**: Viewers of [Shared Dashboards][12] see all telemetry data displayed in the Dashboard in accordance to the creator's permissions. Review your dashboard content before sharing to ensure no sensitive or confidential data is exposed.

### APIs

When querying data through Datadog APIs with restrictions enabled, users without permissions do **not** see query results that have been restricted by Restricted Datasets.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/teams/
[2]: /account_management/rbac/?tab=datadogapplication#role-based-access-control
[3]: /account_management/rbac/
[4]: /getting_started/tagging/
[5]: /account_management/rbac/permissions/#access-management
[6]: https://app.datadoghq.com/organization-settings/
[7]: https://app.datadoghq.com/organization-settings/data-access-controls/
[8]: /data_security/
[9]: /internal_developer_portal/catalog/set_up/
[10]: /account_management/rbac/data_access/#supported-telemetry
[11]: /logs/guide/logs-rbac/?tab=ui#restrict-access-to-logs
[12]: /dashboards/sharing/shared_dashboards/
[13]: /llm_observability/instrumentation/otel_instrumentation/
