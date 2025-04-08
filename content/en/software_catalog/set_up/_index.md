---
title: Set Up Software Catalog
aliases:
  - /tracing/software_catalog/setup
  - /software_catalog/setup
  - /tracing/service_catalog/setup
  - /service_catalog/setup
---

Get started with Software Catalog with one of the following setup paths.

## New to Datadog 

{{< whatsnext desc=" " >}}
    {{< nextlink href="/software_catalog/set_up/new_to_datadog#build-your-first-software-catalog" >}}Build your first Software Catalog{{< /nextlink >}}
    {{< nextlink href="/software_catalog/set_up/new_to_datadog#import-entries-from-backstage" >}}Import entries from Backstage{{< /nextlink >}}
    {{< nextlink href="/software_catalog/set_up/new_to_datadog#import-entries-from-servicenow" >}}Import entries from ServiceNow{{< /nextlink >}}
{{< /whatsnext >}}

## Existing Datadog user

{{< whatsnext desc=" " >}}
    {{< nextlink href="/software_catalog/set_up/existing_datadog_user#automatic-discovery-with-apm-usm-and-rum" >}}APM, USM, and RUM Users{{< /nextlink >}}
    {{< nextlink href="/software_catalog/set_up/existing_datadog_user#discover-infrastructure-and-logs-services" >}}Infrastructure and Logs Users{{< /nextlink >}}
{{< /whatsnext >}}

## Role based access and permissions

For general information, see [Role Based Access Control][2] and [Role Permissions][3].
### Read permission

The Software Catalog read permission allows a user to read Software Catalog data, which enables the following features:
- Software Catalog list
- Discover UI
- Service Definition endpoint: `/api/v2/services/definition/<service_name>`

The permission is enabled by default in the **Datadog Read Only Role** and **Datadog Standard Role**.

### Write permission

The Software Catalog write permission allows a user to modify Software Catalog data. The write permission is required for the following features:
- Inserting or Updating a Service Definition with the `POST /api/v2/services/definitions` endpoint
- Deleting a Service Definition with the `DELETE /api/v2/services/definition/<service_name>` endpoint
- Completing the onboarding process in the Discover Services UI
- Updating service metadata in the UI

The permission is enabled by default in the **Datadog Admin Role** and **Datadog Standard Role**.
