---
title: Investigating a Service
kind: documentation
aliases:
  - /tracing/service_catalog/investigating
further_reading:
- link: "/tracing/service_catalog/service_definition_api/"
  tag: "Documentation"
  text: "Registering Services with the Service Definition API"
- link: "/tracing/service_catalog/guides/understanding-service-configuration"
  tag: "Guide"
  text: "Understanding Your Service Configuration"
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
  text: "I use GitHub Ac­tions for Data­dog's Service Catalog, and you should, too"
algolia:
  tags: ['service catalog']
---

Clicking on a service opens a side panel with details including two main sections: 

## Service overview by views:

- **Ownership information** from the service definition such as links to team contacts, source code, and supplemental information like documentation and dashboards.
- **Reliability information** including deployment status, SLOs, ongoing incidents, and error information.
- **Performance graphs** showing requests, errors, latency, and time spent by downstream services.
- **Pre-production information** regarding your software delivery process, such as the average build duration and success rate of CI pipelines related to your service, along with static analysis results from CI.
- **Costs information** showing the cloud spends for a service, broken down by resource types.
- **Security information** including known vulnerabilities exposed in the service's libraries, the timeline and type of attacks, identity of attackers, security threats impacting your services.

## Configuration details 

- **External libraries used** which includes the ability to download the Software Bill of Materials (SBOM).
  {{< img src="tracing/service_catalog/libraries_sbom.png" alt="Showing an individual service from Service Catalog, highlighting the libraries tab and ability to download the SBOM" style="width:100%;" >}}
- **Configuration completeness status** for Datadog products that can collect data for the service.
- **Service definition** in YAML with a link to the service's source code.
- An interactive service map displaying services upstream and downstream from this service.
- **Service Scorecards** showing a snapshot of the service's scores and last evaluation timestamp.
- **Beta: Active library configuration** for Java and .NET services with the latest Agent configured with [Remote Configuration][1] enabled, you can adjust the [trace sampling rate][3] (from 0.0 to 1.0), enable [Log Injection][2] to correlate traces and logs data, and specify HTTP header tags to be applied to all traces coming into Datadog from this service. In the Setup Guidance tab, beside **Active Library Configuration**, click **Edit** to change these settings and immediately apply them without restarting the service.

  {{< img src="tracing/service_catalog/service_details_remote_config.png" alt="Configuration options for the service in the Datadog UI" style="width:80%;" >}}

Click **View Related** and select a page from the dropdown menu to navigate into related pages in Datadog, such as the APM Service page and service map for this service, or related telemetry data pages, such as Distributed Tracing, Infrastructure, Network Performance, Log Management, RUM, and Continuous Profiler.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/remote_config/
[2]: /tracing/other_telemetry/connect_logs_and_traces/
[3]: /tracing/trace_pipeline/ingestion_mechanisms/#head-based-sampling
