---
title: New to Datadog
further_reading:
  - link: "/tracing/software_catalog/setup/"
    tag: "Documentation"
    text: "Setting Up Software Catalog"
---

If you're new to Datadog, you can add components to Software Catalog by doing one of the following:

-  Manually creating service definitions through the API, Terraform, or a GitHub integration
-  Importing existing services from sources like ServiceNow or Backstage

These services are by default not associated with any Datadog telemetry, but you can link telemetries from Datadog or external sources manually using entity definition YAML files.

## Build your first Software Catalog

### Manually create your service definition

#### Edit `service.datadog.yaml` or `entity.datadog.yaml`

To create a user-defined component, name your component in the `dd-service` (if using schema version v2.2 or prior) or `name` field (if using schema version v3.0 or later) in a `service.datadog.yaml` or `entity.datadog.yaml` file. You must use one of the supported metadata schema versions. 

For example: 

{{< code-block lang="yaml" filename="service.datadog.yaml" collapsible="true" >}}
schema-version: v2.2
dd-service: my-unmonitored-cron-job
team: e-commerce
lifecycle: production
application: shopping-app
description: important cron job for shopist backend
tier: "2"
type: web
contacts:
 - type: slack
   contact: https://datadogincidents.slack.com/archives/XXXXX
links:
 - name: Common Operations
   type: runbook
   url: https://datadoghq.atlassian.net/wiki/
 - name: Disabling Deployments
   type: runbook
   url: https://datadoghq.atlassian.net/wiki/
tags: []
integrations:
 pagerduty:
   service-url: https://datadog.pagerduty.com/service-directory/XXXXXXX
External Resources (Optional)
{{< /code-block >}}

You can register multiple services in one YAML file by separating each definition with three dashes (`---`).

#### Create the service definition in-app

Instead of editing `service.datadog.yaml` or `entity.datadog.yaml` directly, you can create your service definition in-app:

1. Navigate to the [Software Catalog Setup & Config page][1].
2. Click **Create a New Entry**.
3. Select the **Code** tab.
4. Paste the schema content.

### Validate service definitions

A mistake in a service definition file could cause you to create a service with invalid data or introduce an error into the metadata of an existing service. 

To prevent this, validate your service definition files in one of the following ways:

#### Validate through the Datadog app

If creating your service definition in-app, the UI will automatically flag invalid data. 

#### Validate with an IDE extension

Built-in validation mechanisms prevent you from sending incorrect metadata into Software Catalog. 

{{< img src="tracing/software_catalog/software_catalog_definition_yaml.png" alt="Service metadata editor showing sample service definition." >}}

#### Validate with Datadog Event Management and Github Integration

To validate your service definitions ingested by Datadog's Github integration, you can view events when services or updated or when there is an error. You can view validation errors in [Event Management][2] by filtering by `source:software_catalog` and `status:error`. Adjust the timeframe as needed.

{{< img src="tracing/software_catalog/github_error_event.png" alt="Github event showing error message from service definition." >}}

## Import Entries from Backstage

{{< img src="/tracing/software_catalog/software-catalog-backstage-import.png" alt="Service panel highlighting backstage metadata, links and definition" style="width:90%;" >}}

If you already have data or services registered in Backstage, you can import these services into Datadog directly. 

If you use API or Terraform, replace the YAMLs in your requests. 

If you use GitHub integration, directly save your Backstage YAMLs to a repo with Datadog read permission. Datadog scans for files named [`catalog-info.yaml`][1] located at the root folder of a repo.

Upon import, the following occurs:
- Datadog recognizes `kind:component` and `kind:system` in Backstage YAML; `kind:component` in Backstage is recognized as a service in Datadog
- `metadata.name` gets mapped to `dd-service`
- `metadata.namespace` gets mapped to a custom tag with the format `namespace:${metadata.namespace}`
- `spec.lifecycle` gets mapped to `lifecycle`
- `spec.owner` gets mapped to `team`
- `metadata.links` gets mapped to `links`
  - The annotation `github.com/project-slug` maps to a link with `type=repo` and `url=https://www.github.com/${github.com/project-slug}`
  - The annotations `pagerduty.com/service-id` and `pagerduty.com/account` are combined and map to `integration.pagerduty`
- `metadata.description` gets mapped to `description`
- `spec.system` gets mapped to `application`
- `spec.dependsOn` gets mapped to `dependsOn`
- Other `spec` values get mapped to custom tags

**Note**: The Software Catalog processes the entire YAML file as a whole. If any section of the YAML file does not have `kind:component` or `kind:system`, the entire `catalog-info.yaml file` is rejected. Schema version v3.0 is required to use kind:system and the `dependsOn` field.

### Example YAML for catalog-info.yaml
{{< code-block lang="yaml" filename="catalog-info.yaml" collapsible="true" >}}
apiVersion: backstage.io/v1alpha1
kind: Component
metadata:
  name: artist-web
  description: The place to be, for great artists
spec:
  type: service
  lifecycle: production
  owner: artist-relations-team
  system: artist-engagement-portal
  dependsOn:
    - service:email-service
{{< /code-block >}}

## Import Entries from ServiceNow

To populate your Datadog Software Catalog with services from your ServiceNow CMDB, use the Service Ingestion feature in the [Datadog-ServiceNow integration][3].

{{< img src="integrations/servicenow/service-metadata.jpg" alt="Screenshot of the Service Configuration panel showing metadata populated from ServiceNow" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/services/settings/get-started
[2]: https://app.datadoghq.com/event/explorer?query=source%3Asoftware_catalog%20status%3Aerror&cols=&messageDisplay=expanded-lg&options=&refresh_mode=sliding&sort=DESC&view=all&from_ts=1736452185424&to_ts=1736453085424&live=true
[3]: /integrations/servicenow/#service-ingestion


