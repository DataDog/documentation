---
title: Manage a Component
aliases:
  - /tracing/service_catalog/investigating
  - /service_catalog/investigating/
  - /tracing/service_catalog/guides/understanding-service-configuration
  - /service_catalog/guides/understanding-service-configuration/
  - /api_catalog/add_metadata
  - /api_catalog/owners_and_tags
further_reading:
- link: "/tracing/service_catalog/service_definition_api/"
  tag: "Documentation"
  text: "Registering Services with the Service Definition API"
- link: "/tracing/service_catalog/guides/upstream-downstream-dependencies"
  tag: "Guide"
  text: "See Upstream and Downstream Dependencies During an Active Incident"
- link: "https://www.datadoghq.com/blog/manage-service-catalog-categories-with-service-definition-json-schema/"
  tag: "Blog"
  text: "Manage Service Catalog entries with the Service Definition JSON Schema"
- link: "https://www.datadoghq.com/blog/apm-security-view/"
  tag: "Blog"
  text: "Gain visibility into risks, vulnerabilities, and attacks with APM Security View"
- link: "https://www.datadoghq.com/blog/service-catalog-setup/"
  tag: "Blog"
  text: "Easily add tags and metadata to your services using the simplified Service Catalog setup"
- link: "https://www.datadoghq.com/blog/github-actions-service-catalog/"
  tag: "Blog"
  text: "I use GitHub Actions for Data­dog's Service Catalog, and you should, too"
- link: "/tracing/service_catalog/"
  tag: "Documentation"
  text: "Datadog Service Catalog"
algolia:
  tags: ['service catalog']
---
`Service` is the only component type in Service Catalog schema versions v2, v2.1, and v2.2. [v3.0][10] and above supports multiple kinds of components, including `kind:system`, `kind:service`, `kind:queue`, `kind:api`, and `kind:datastore`.

## Assigning an owner 

You can assign a `team` to entries in the Service Catalog either in the UI or by creating a [Service Definition][4]. Datadog recommends that you set up [Datadog Teams][5] so that you can specify individual members of the team and take advantage of *Teams* filters across common views like Dashboards and Notebook lists. 

## Determining and communicating criticality 
Not all instances of observability carry the same level of importance. Some are mission-critical, while others are less so. By identifying the service tier, lifecycle, and the application ecosystem they belong to, you can determine if the observability coverage is adequate and quickly assess the severity of issues. 

## Understanding your service configuration

Following monitoring best practices such as tracing, logging, and code profiling helps you ensure that you have all the data you need during incident triage. Service Catalog provides automatic checks for these recommended setups. It helps you detect any monitoring gaps and helps you connect all available data for a service.

To view the configuration completeness for a service, click the service in the [Service Catalog][7], then find the **Setup Guidance** tab:

{{< img src="tracing/service_catalog/service-catalog-setup-guidance.png" alt="Service Catalog with the Setup Guidance tab highlighted." >}}

Alternatively, on the [*Service* page][8], click **Service Config** on the lower-left side:

{{< img src="tracing/service_catalog/service-page-service-config.png" alt="Service page with the Service Config link highlighted." >}}

In the Setup Guidance section, you can see the ownership, PagerDuty, and related links information you've specified for the service in its [service definition][9].

You can also find which Datadog features you are actively using for a given service, to help you find and close gaps in your monitoring completeness. 

{{< img src="tracing/service_catalog/svc_cat_completeness1.png" alt="Service configuration page showing configuration completeness." >}}

This table does not necessarily reflect billing for individual products, but rather activity for the service you are presently examining. For example, if the service does not emit infrastructure metrics for a long time, `Infrastructure Monitoring` might have `Not Detected` specified, even if you have hosts or containers running infrastructure monitoring. 

## Investigating infrastructure
From the **Performance** tab, find the service you are investigating. In the **Infrastructure** column, click the resources related to this service to **View in Service Context Map**.

{{< img src="tracing/service_catalog/access_service_context_map.png" alt="Access the Service Context Map from the Service Catalog Performance tab, highlighting the Infrastructure column" style="width:90%;" >}}

The Service Context Map provides an overview of the relationships and dependencies between services and related infrastructure. Use this view to analyze the source of an issue by looking at upstream and downstream services and infrastructure.

Click a service in Service Catalog to open the side panel with the following details: 

### Service details by views

- **Ownership information** from the [Service Definition][4], such as links to team, contacts, source code, and supplemental information like documentation and dashboards.
- **Reliability information** including deployment status, SLOs, ongoing incidents, and error information.
- **Performance graphs** showing requests, errors, latency, and time spent by downstream services.
- **Security information** including known vulnerabilities exposed in the service's libraries, the timeline and type of attacks, identity of attackers, and security threats impacting your services.
- **Costs information** showing the cloud spend for a service, broken down by resource types.
- **Pre-production information** regarding your software delivery process, such as the average build duration and success rate of CI pipelines related to your service, along with static analysis results from CI.

### Configuration details 
- **Setup completeness status** for Datadog products that can collect data for the service.
- **External libraries used** which includes the ability to download the Inventory of Libraries.
- **Service definition** in YAML with a link to the service's source code.
- An interactive service map displaying services upstream and downstream from this service.
- **Defined and Related Dashboards** showing a list of pre-defined and Watchdog recommended dashboards when available. 
- **Service Scorecards** showing a snapshot of the service's scores and last evaluation timestamp.
- **Active library configuration** for Java and .NET services with the latest Agent configured with [Remote Configuration][1] enabled, you can adjust the [trace sampling rate][3] (from 0.0 to 1.0), enable [Log Injection][2] to correlate traces and logs data, and specify HTTP header tags to be applied to all traces coming into Datadog from this service. In the Setup Guidance tab, beside **Active Library Configuration**, click **Edit** to change these settings and immediately apply them without restarting the service.

  {{< img src="tracing/service_catalog/service_details_remote_config.png" alt="Configuration options for the service in the Datadog UI" style="width:80%;" >}}

Click **View Related** and select a page from the dropdown menu to navigate into related pages in Datadog, such as the [APM Service Page][6] and service map for this service, or related telemetry data pages, such as for distributed tracing, infrastructure, network performance, Log Management, RUM, and Continuous Profiler.

## Add metadata to endpoints

You can add metadata to APIs through the Datadog UI or [API][13], or use automated pipelines through the [GitHub integration][14] or [Terraform][15].

### Metadata structure and supported versions

API Catalog supports OpenAPI 2 and 3 as the format for defining APIs. 

Combine [metadata schema v3.0][10] with OpenAPI definitions by setting `kind: api` and specifying the `owner` field:

```yaml
apiVersion: v3
kind: api
metadata:
  name: API Name
  description: API Description 
  displayName: API Name
  owner: dd-team
spec:
  type: openapi
  interface:
    definition:
      info:
        title: API Name
      openapi: 3.0.2
      paths:
        /api/v2/customers/{id}:
          get:
            summary: get customer information
            operationId: getCustomerInfo
            tags:
              - public
              - important
            parameters:
              - in: path
                name: id
            responses:
              '200':
                description: Successful operation
                content:
                  application/vnd.api+json:
                    schema:
                      type: object
                      properties:
                        data:
                          type: array
                          description: Contains customer information
              '400':
                description: Invalid arguments
              '401':
                description: Unauthorized operation
              '500':
                description: Internal server error
```

### Import API metadata from GitHub

Use the Datadog GitHub integration to import API definitions and keep them updated. After connecting, the API automatically updates whenever the file content changes in the repository.

{{< img src="tracing/api_catalog/add-metadata.png" alt="Service Catalog modal showing how to add API metadata." style="width:100%;" >}}

To import an OpenAPI or Swagger file using the GitHub integration:

1. Set up the [Datadog GitHub integration][12].
1. Navigate to API Catalog.
1. Select **Setup & Config** > **Create New Entry**.
1. Select **API** from the **Kind** dropdown.
1. Select your repository and OpenAPI/Swagger file.
1. Click **Save Entry**.

{{< img src="tracing/api_catalog/api-catalog-create-from-github2.png" alt="API Catalog modal showing how to create a new API from GitHub" style="width:100%;" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/remote_config/
[2]: /tracing/other_telemetry/connect_logs_and_traces/
[3]: /tracing/trace_pipeline/ingestion_mechanisms/#head-based-sampling
[4]: /service_catalog/service_definitions/
[5]: /account_management/teams/
[6]: /tracing/services/service_page/
[7]: https://app.datadoghq.com/services
[8]: /tracing/services/service_page/
[9]: /tracing/service_catalog/service_definition_api/
[10]: /service_catalog/service_definitions/v3-0/
[11]: https://app.datadoghq.com/apis/catalog
[12]: /tracing/service_catalog/
[13]: /api/latest/software-catalog/#create-or-update-entities
[14]: /service_catalog/service_definitions/#store-and-edit-definitions-in-github
[15]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/software_catalog