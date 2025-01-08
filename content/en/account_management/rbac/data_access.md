---
title: Data Access Control
description: Define a Restricted Dataset for access control
is_public: true
further_reading:
    - link: '/data_security/'
      tag: 'Documentation'
      text: 'Reducing Data Related Risks'
---
{{< callout url="https://www.datadoghq.com/product-preview/" header="Join the Preview!">}}
  Data Access Control is in Preview
{{< /callout >}}

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

### Datadog site

Log in as a user assigned the Datadog Admin role, or any user with a role in your organization with the [`user_access_manage` permission][5].

1. Navigate to [Organization Settings][6].
1. On the left side of the page, select [Data Access Controls][7].
1. Click **New Restricted Dataset**.

In order to create a Restricted Dataset, identify the data to be restricted with a query.

{{< img src="/account_management/rbac/restricted_dataset.png" alt="Create a Restricted Dataset dialog. Selects data in RUM, APM, Logs, and Metrics matching the tag service:hr. Grants access to a Privileged access team.">}}

Name Dataset
: A descriptive name to help users understand what data is contained in the dataset. 

Select data to be included in this Dataset
: The boundary definition that describes which data to restrict to a specific set of users. Boundaries are query statements with limitations that allow an access manager to define the scope of sensitive data to be protected. The supported telemetry types are custom metrics, RUM, APM traces, logs, and CI Visibility pipelines.

Grant access
: Select one or more teams or roles that may access the content bound in the Restricted Dataset. Any users who are not members of these groups are blocked from accessing this data.

You may create a maximum of 10 key:value pairs per Restricted Dataset. Consider defining an additional Restricted Dataset if you need additional pairs.

After completing all the fields to define the dataset, click **Create Restricted Dataset** to apply it to your organization.

You may create a maximum of 100 Restricted Datasets. If you need a higher limit, reach out to Support.

### API
The Data Access Control API is under development and should be considered unstable. Future versions may be backward incompatible. 

Terraform support will be announced after Data Access Control is generally available.

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
* Telemetry type: Metrics
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
* **Name dataset:** Restricted RUM data
* **Select data to be included in this Dataset:**
    * Telemetry type: RUM
        * Filters: `@application.id:<rum-app-id>`
* **Grant access:**
    * Teams or roles of users who can see this RUM data      

This configuration example would protect the RUM data from this application, and keep other data from this application available to existing users in your organization.

#### Protecting all data from a service

If you are instead looking to protect data from a specific service, you can build your Data Access Control configuration around the `service:` tag.

For example, if you have a service `NewService` that is instrumented with Real User Monitoring (RUM) and capturing sensitive inputs from users, consider creating a Restricted Dataset only for that application:

* **Name Dataset:** Restricted NewService data
* **Select data to be included in this Dataset:**
    * Telemetry type: RUM
        * Filters: `@service:NewService`
    * Telemetry type: Metrics
        * Filters: `@service:NewService`
    * Telemetry type: APM
        * Filters: `@service:NewService`
    * Telemetry type: Logs
        * Filters: `@service:NewService`
* **Grant access:**
    * Team who owns the service

This configuration example protects all supported data from `NewService`.

### Teams and roles

Data Access Control supports granting access to users through Datadog roles or teams. When granting access, consider your existing access control configuration and access strategy. If you are pursuing a service-based approach and are already [customizing the Service Catalog][9], take advantage of the service ownership model by using Teams as part of your Data Access Control configuration.

**Note:** Teams used for Data Access Control must be configured such that adding or removing users can only be done by team members or an administrator, not `Anyone in the organization`.

## Access enforcement

Users in a Datadog organization with Data Access Control enabled can only see query results for data to which they have access, such as in a Dashboard, in an Explorer, or through the API. A Restricted Dataset removes access to the data defined in the Restricted Dataset for users who are not permitted, across all Datadog experiences and entry points.

### Data explorers

When exploring Datadog with restrictions enabled, users without permissions can still browse the list of asset names (applications or metrics), but they cannot see query results, top tags, or facet details restricted by datasets. For instance, querying a metric with restricted data returns a blank graph, making it appear as if the query does not match any data.

### Dashboards and Notebooks

Similar to exploring data in a data explorer like the RUM Explorer or Metrics Explorer, viewing data in dashboards in an organization that has Restricted Datasets enabled only shows the data the user can access. Since dashboards are shared objects that can be accessed by others, it is possible for two users who have different access to view the same dashboard or notebook at the same time and see different data.

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
[9]: /service_catalog/customize/
