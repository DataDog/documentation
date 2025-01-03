---
title: Managing and Mapping Dependencies
aliases:
  - /tracing/service_catalog/guides/dependency_management
  - /service_catalog/use_cases/dependency_management
  - /service_catalog/guides/dependency_management
  - /tracing/service_catalog/use_cases/dependency_management
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

Datadog’s Service Catalog provides robust dependency mapping capabilities, helping teams document, track, and assess upstream and downstream relationships. These features combine automatic discovery with manual definition options to offer flexibility and accuracy in representing your system architecture.

## Automatic Dependency Mapping and Entity Discovery

Automatic Discovery:

- Datadog Service Catalog includes all discovered services from APM, USM, and RUM by default.
- As you instrument more applications across your environments, their dependencies are automatically added to the catalog.

Telemetry Integration:

- Dependency relationships are auto-detected using application telemetry collected by APM, USM, and RUM.
- Teams gain an immediate, real-time overview of service relationships and performance impacts across teams and services.

{{< img src="tracing/service_catalog/dependency-mgmt-use-case-auto-discovery.png" alt="The Dependencies tab in the side panel for a service, showing a flow chart of service dependencies, ." >}}

## Manual Dependency Definition in Service Catalog Schema v3.0

Enhanced Relationship Mapping:
- Service Catalog schema v3.0 allows teams to manually define relationships to supplement auto-detected topologies.
- This feature lets teams represent dependencies that reflect institutional knowledge and team collaboration, ensuring a more complete view of system relationships.

{{< img src="tracing/service_catalog/dependency-mgmt-use-case-relationship-mapping.png" alt="A hierarchical relationships diagram showing a service's dependencies." >}}


Keys for Manual Dependency Definition:
- Teams can specify relationships in the spec section of the entity definition using these keys:

  - dependsOn: Specifies dependencies (e.g., service A depends on service B).
  - ownedBy: Assigns ownership to a team or group (e.g., service A is owned by Team A).
  - partOf: Groups components under a system (e.g., service A is part of System A).

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

UI Display:

- When "Include Detected" is disabled: Only manually defined dependencies are shown.
- When "Include Detected" is enabled: Manually added dependencies are shown above auto-detected ones, providing a clear distinction.

{{< img src="tracing/service_catalog/dependency-mgmt-use-case-include-detected.png" alt="A diagram showing the dependencies of a service, where 'Include Detected' is disabled." >}}

## Benefits of Manual Dependency Definition

- Improved Accuracy: Ensures the catalog reflects shared team knowledge, avoiding gaps left by automated tools.
- Enhanced Collaboration: Promotes better alignment and understanding during incident response and architecture planning.
- Contextual Knowledge: Helps developers and new team members quickly grasp complex system architectures and dependencies.


## Further reading

{{< partial name="whats-next/whats-next.html" >}}
