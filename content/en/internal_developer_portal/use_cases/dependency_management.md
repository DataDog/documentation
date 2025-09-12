---
title: Manage and Map Dependencies
aliases:
  - /tracing/software_catalog/guides/dependency_management
  - /software_catalog/guides/dependency_management
  - /tracing/software_catalog/use_cases/dependency_management
  - /tracing/service_catalog/guides/dependency_management
  - /service_catalog/use_cases/dependency_management
  - /service_catalog/guides/dependency_management
  - /tracing/service_catalog/use_cases/dependency_management
  - /software_catalog/use_cases/dependency_management
further_reading:
  - link: "/tracing/"
    tag: "Documentation"
    text: "Datadog Application Performance Monitoring"
  - link: "/universal_service_monitoring/"
    tag: "Documentation"
    text: "Datadog Universal Service Monitoring"
  - link: "/real_user_monitoring"
    tag: "Documentation"
    text: "Datadog Real User Monitoring"
---

Datadog's Software Catalog offers powerful dependency mapping capabilities to help teams document, track, and assess upstream and downstream relationships. These features support both automatic discovery and manual definition so you can flexibly and accurately define your system architecture.

## Automatic dependency mapping and entity discovery

- **Automatic discovery:** By default, Software Catalog includes all discovered entities from APM, USM, and RUM. When you instrument additional applications across your environments, their dependencies are automatically added to the Catalog.

- **Telemetry integration:** Software Catalog auto-detects dependency relationships using application telemetry collected by APM, USM, and RUM, providing teams with real-time insights into service relationships and performance impacts.

{{< img src="tracing/software_catalog/dependency-mgmt-use-case-auto-discovery.png" alt="The Dependencies tab in the side panel for a service, showing a flow chart of service dependencies." >}}

## Manual dependency definition in Software Catalog schema v3.0

In [Software Catalog schema v3.0][2], teams can manually define relationships to supplement auto-detected topologies. This features is particularly helpful for defining dependencies that reflect institutional knowledge and team collaboration, ensuring a more complete view of system relationships.

{{< img src="tracing/software_catalog/dependency-mgmt-use-case-relationship-mapping.png" alt="A hierarchical relationships diagram showing a service's dependencies." >}}

### Configure a manual dependency 

To define a manual dependency, update the `spec` section of the relevant entity definition using the following keys:

  - `dependsOn`: Specifies dependencies (for example, Service A depends on Service B).
  - `ownedBy`: Assigns ownership to a team or group (for example, Service A is owned by Team A).
  - `partOf`: Groups components under a system (for example, Service A is part of System A).

Example YAML configuration:

```yaml
apiVersion: v3
kind: service
metadata:
  name: web-store
spec:
  dependsOn: 
    - service: cws-webapp
```

### View manual dependencies

To view manual dependencies in the Datadog app:

1. Navigate to [Software Catalog][1].
1. Select your service to open the side panel.
1. Find the Performance tab, then select the Dependencies sub-tab.

You can also open the full Service Page for a particular service and select the Dependencies section in the left-hand navigation. 

All dependencies, including manual dependencies, are shown. You can use the "Include Detected" feature to modify your view: 

- When **Include Detected** is disabled: Only manually defined dependencies are shown.
- When **Include Detected** is enabled: Manually added dependencies are shown above auto-detected ones to create a clear distinction.

{{< img src="tracing/software_catalog/dependency-mgmt-use-case-include-detected.png" alt="A diagram showing the dependencies of a service, where 'Include Detected' is disabled." >}}

### Benefits of manual dependency definitions

- Improved accuracy: By defining dependencies manually, teams can incorporate their specific understanding and insights into the Software Catalog, ensuring it accurately represents architectures of real-world systems that automated tools might miss.
- Enhanced collaboration: Manually defined dependencies support better communication and coordination by making relationships explicit, aiding in incident response efforts and strategic architecture planning.
- Contextual knowledge: Providing manual definitions helps developers and new team members quickly understand the complexities of system dependencies and architectures, facilitating smoother onboarding and knowledge transfer.


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/services
[2]: /software_catalog/service_definitions/v3-0/
