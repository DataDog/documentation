---
title: Application Security Management
aliases:
  - /tracing/service_catalog/guides/appsec_management
  - /service_catalog/guides/appsec_management
further_reading:
  - link: "/security/application_security/"
    tag: "Documentation"
    text: "Datadog Application Security Management"
---

With Service Catalog, organizations can seamlessly integrate security into every stage of development, ensuring a robust AppSec posture across teams and systems.

Service Catalog centralizes security signals and helps developers prioritize actions and remediate vulnerabilities. Developers gain immediate visibility into application security, while managers can monitor risks, drive improvements, and ensure compliance across the organization.

{{< img src="tracing/service_catalog/appsec-use-case.png" alt="The Security tab of the Service Catalog, showing vulnerability risk, attack exposure, and coverage for each service." >}}

## Make Applications Secure By Design

Service Catalog helps teams create secure-by-default processes using golden paths and guardrails. Developers can scaffold new services [link to scaffolding action] or add cloud resources confidently, knowing security standards are enforced at every step. The Security view provides multiple ways to assess and improve the security posture of your services. By using APM Security views, you can automatically identify which services are exposed to application attacks—such as SQL injections, SSRF, or log4Shell attacks—when those services are instrumented with APM.This allows you to drill down into each service and type of attack your organization is exposed to, understand the associated security risks, and effectively manage your application attack surface area with runtime context.

## Track Third-Party Software and Dependencies

Service Catalog makes third-party dependencies—from open-source libraries to programming languages—organized and visible. Teams can monitor versions, launch upgrades, and stay ahead of vulnerabilities.

- DevSecOps: Use the catalog to track all dependencies and drive upgrade initiatives.
- Managers: Access real-time reports on upgrade progress and compliance.
- Developers: Manage dependency updates as part of daily routines with minimal disruption.

## Configuration Details

Click a service in Service Catalog to open the service side panel, then select Active library configuration:


**Active library configuration** for Java and .NET services with the latest Agent configured with [Remote Configuration][1] enabled, you can adjust the [trace sampling rate][3] (from 0.0 to 1.0), enable [Log Injection][2] to correlate traces and logs data, and specify HTTP header tags to be applied to all traces coming into Datadog from this service. In the Setup Guidance tab, beside **Active Library Configuration**, click **Edit** to change these settings and immediately apply them without restarting the service.

  {{< img src="tracing/service_catalog/service_details_remote_config.png" alt="Configuration options for the service in the Datadog UI" style="width:80%;" >}}

Click **View Related** and select a page from the dropdown menu to navigate into related pages in Datadog, such as the [APM Service Page][6] and service map for this service, or related telemetry data pages, such as for distributed tracing, infrastructure, network performance, Log Management, RUM, and Continuous Profiler.


## Further reading

{{< partial name="whats-next/whats-next.html" >}}
