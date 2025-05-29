---
title: Manage App and API Protection Posture Across Development Teams
aliases:
  - /tracing/software_catalog/guides/appsec_management
  - /software_catalog/guides/appsec_management
  - /tracing/software_catalog/use_cases/appsec_management  
  - /tracing/service_catalog/guides/appsec_management
  - /service_catalog/guides/appsec_management
  - /service_catalog/use_cases/appsec_management 
  - /tracing/service_catalog/use_cases/appsec_management  
  - /service_catalog/use_cases/application_security
  - /software_catalog/use_cases/appsec_management
further_reading:
  - link: "/security/application_security/"
    tag: "Documentation"
    text: "Datadog App and API Protection"
  - link: "https://www.datadoghq.com/blog/apm-security-view/"
    tag: "Blog"
    text: "Gain visibility into risks, vulnerabilities, and attacks with APM Security View"
---

The Software Catalog enables organizations to seamlessly incorporate security into every development stage, ensuring a strong security posture across teams, applications, and systems.

Software Catalog surfaces and centralizes security signals, enabling developers to prioritize actions and address vulnerabilities promptly. Meanwhile, managers can oversee risks, drive improvements, and ensure organizational compliance.

{{< img src="tracing/software_catalog/appsec-use-case.png" alt="The Security tab of the Software Catalog, showing vulnerability risk, attack exposure, and coverage for each service." >}}

## Build secure applications by design

Software Catalog provides default paths and guardrails to helps teams create, assess, and improve secure processes. Developers can [scaffold new services][1] or integrate cloud resources confidently, assured that security standards are enforced at every step. 

For services instrumented with APM, APM Security Views automatically detect services vulnerable to application attacks, such as SQL injections, SSRF, or Log4Shell attacks. You can use APM Security Views to investigate each service and type of attack your organization encounters, understand the associated security risks, and effectively manage your application attack surface with runtime context.

## Track third-party software and dependencies

Software Catalog organizes and highlights third-party dependencies, ranging from open-source libraries to programming languages. Teams can monitor versions, launch upgrades, and proactively address vulnerabilities.

- DevSecOps: Use Software Catalog to track dependencies and spearhead upgrade initiatives.
- Managers: Access real-time reports on upgrade progress and compliance.
- Developers: Incorporate dependency updates into daily workflows with minimal disruption.

## Configuration details

1. Click a service in Software Catalog to open the service side panel.
1. Select the **Performance** tab at the top of the panel.
1. Find the **Libraries** sub-tab, which lists all external libraries used and their versions.

{{< img src="tracing/software_catalog/appsec-use-case-libraries.png" alt="The Security tab of the Software Catalog, showing vulnerability risk, attack exposure, and coverage for each service." >}}


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/app-builder/apps/edit?activeTab=data&showActionCatalog=false&template=scaffolding&viewMode=edit&visibleDataItemId=triggerScaffoldNewServiceWorkflow-action
