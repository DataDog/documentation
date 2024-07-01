---
title: Datadog Service Catalog
kind: documentation
aliases:
  - /tracing/faq/service_catalog/
  - /tracing/services/services_list/
  - /tracing/visualization/services_list/
  - /tracing/service_catalog/
further_reading:
- link: /tracing/service_catalog/service_definition_api/
  tag: Documentation
  text: Registering Services with the Service Definition API
- link: "https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/service_definition_yaml"
  tag: External Site
  text: Create and manage service definitions with Terraform
- link: /tracing/service_catalog/guides/understanding-service-configuration
  tag: Guide
  text: Understanding Your Service Configuration
- link: /tracing/service_catalog/guides/upstream-downstream-dependencies
  tag: Guide
  text: See Upstream and Downstream Dependencies During an Active Incident
- link: "https://www.datadoghq.com/blog/manage-service-catalog-categories-with-service-definition-json-schema/"
  tag: Blog
  text: Manage Service Catalog entries with the Service Definition JSON Schema
- link: "https://www.datadoghq.com/blog/apm-security-view/"
  tag: Blog
  text: Gain visibility into risks, vulnerabilities, and attacks with APM Security View
- link: "https://www.datadoghq.com/blog/service-catalog-setup/"
  tag: Blog
  text: Easily add tags and metadata to your services using the simplified Service Catalog setup
- link: "https://www.datadoghq.com/blog/github-actions-service-catalog/"
  tag: Blog
  text: I use GitHub Ac­tions for Data­dog's Service Catalog, and you should, too
- link: "https://www.datadoghq.com/blog/shift-left-datadog-service-catalog/"
  tag: Blog
  text: Improve your shift-left observability with the Datadog Service Catalog
- link: "https://www.datadoghq.com/blog/service-ownership-best-practices-datadog/"
  tag: Blog
  text: Best practices for end-to-end service ownership with Datadog Service Catalog
algolia:
  tags: [service catalog]
---

{{< img src="tracing/service_catalog/service_catalog_updated.mp4" video=true alt="Navigating around the Service Catalog" style="width:100%;" >}}

## Overview

Datadog [Service Catalog][1] provides a consolidated view of your services, combining ownership metadata, performance insights, security analysis, cost allocation, and much more. It makes it easy for organizations to achieve end-to-end service ownership at scale, get real-time performance insights, detect and address reliability and security risks, and manage application dependencies all in one place. 

### Use cases

#### Service discovery
- Datadog Service Catalog includes all discovered services from APM, USM, and RUM by default. If you are using any of these products, your catalog is pre-populated with entries.
- As you instrument more applications across your environments, they are automatically added to the Service Catalog.

#### Dependencies mapping and management 
- Document and track all of your upstream and downstream dependencies automatically with application telemetries collected by APM, USM, and RUM.
- Manually declare dependency relationships across components (available through [metadata schema v3.0][8]).
- Understand and assess performance impacts across teams and services.

#### Governance and optimization
- Providing engineering leadership with a high-level view of best practices across teams and services through [Service Scorecards][9].
- Reducing application risks by finding and fixing known security vulnerabilities in the dependencies of your services.
- Understanding trends and identifying inefficiencies in the costs related to your services.

#### Knowledge sharing 
- Locate information without navigating through numerous repos, channels, or documentation pages.
- Save time searching for runbooks or wiki pages when onboarding new team members.
- Leverage real-time, automatically-generated topology maps to understand system architecture.

#### Evaluate monitoring coverage  
- Detecting which services aren’t reporting observability data or having that data monitored.
- Facilitating [tagging best practices][6] and checking for recommended setup configurations to optimize [cross-telemetry insights][7].
- Spotting issues like missing SLOs, monitors, or services without ownership.

#### Streamline collaboration during incidents
- Improving the on-call experience for everyone by establishing correct ownership information and communication channels, alongside streamlined access to monitoring and troubleshooting details.
- Embedding links to solutions and troubleshooting tools such as runbooks and documentation directly in the observability tooling engineers are already using.
- Speeding incident recovery by increasing confidence and simplifying locating owners of upstream and downstream services and dependencies.


## Getting started

{{< whatsnext desc="Explore what Service Catalog has to offer:" >}}
    {{< nextlink href="/service_catalog/navigating/" >}}Navigating the Service Catalog{{< /nextlink >}}
    {{< nextlink href="/service_catalog/investigating" >}}Investigating a service{{< /nextlink >}}
{{< /whatsnext >}}

## Role based access and permissions

For general information, see [Role Based Access Control][2] and [Role Permissions][3].
### Read permission

The Service Catalog read permission allows a user to read service catalog data, which enables the following features:
- Service Catalog list
- Discover UI
- Service Definition endpoint: `/api/v2/services/definition/<service_name>`

The permission is enabled by default in the **Datadog Read Only Role** and **Datadog Standard Role**.

### Write permission

The Service Catalog write permission allows a user to modify service catalog data. The write permission is required for the following features:
- Inserting or Updating a Service Definition with the `POST /api/v2/services/definitions` endpoint
- Deleting a Service Definition with the `DELETE /api/v2/services/definition/<service_name>` endpoint
- Completing the onboarding process in the Discover Services UI
- Updating service metadata in the UI

The permission is enabled by default in the **Datadog Admin Role** and **Datadog Standard Role**.

## Services types

Every monitored service is associated with a type. Datadog automatically determines this type based on the `span.type` attribute attached to incoming spans data. The type specifies the name of the application or framework that the Datadog Agent is integrating with.

For example, if you use the official Flask Integration, the `Type` is set to "Web". If you are monitoring a custom application, the `Type` appears as "Custom".

The type of the service can be one of:

*  Cache
*  Custom
*  DB
*  Serverless function
*  Web

Some integrations alias to types. For example, Postgres, MySQL, and Cassandra map to the type "DB". Redis and Memcache integrations map to the type "Cache".

## Data retention
The services and resources statistics, and span summaries on the **Service List** and **Service Page** are retained for up to 30 days. For customized queries on APM trace metrics, use Metric Explorer. [Learn more about data retention for APM][4].


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/services
[2]: /account_management/rbac/
[3]: /account_management/rbac/permissions/
[4]: /developers/guide/data-collection-resolution-retention/
[5]: /tracing/service_catalog/adding_metadata#service-definition-schema-v22
[6]: https://www.datadoghq.com/blog/tagging-best-practices/#assign-owners-to-services-with-tags
[7]: /tracing/other_telemetry/
[8]: /service_catalog/add_metadata#metadata-schema-v30-beta
[9]: /service_catalog/scorecards/
