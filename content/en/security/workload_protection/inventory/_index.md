---
title: Assess Coverage
description: Review where the Datadog Agent is deployed, which protections are enabled, and where coverage gaps remain.
disable_toc: false
further_reading:
  - link: "security/workload_protection/setup"
    tag: "Documentation"
    text: "Set up Workload Protection"
  - link: "security/detection_rules/#mitre-attck-map"
    tag: "Documentation"
    text: "MITRE ATT&CK map"
---

Workload Protection {{< ui >}}Inventory{{< /ui >}} shows where the Datadog Agent is deployed, which protections are enabled, and where coverage gaps remain. Use it to find unprotected workloads, confirm that rules and policies loaded as expected, and act on resources that need attention.

Inventory consists of three views:

- **[Coverage][1]**: Shows the deployment status of Agent rules and policies on each resource. Use it to find rules that failed to load, review Agent deployment coverage across your infrastructure, and map detection coverage to MITRE ATT&CK tactics and techniques.
- **[Hosts and Containers][2]**: Shows every active Agent running on a host or as a container, including hosts where Workload Protection is disabled. Use it to verify which security features are enabled per host, identify outdated Agent versions, and reach remediation guidance for missing protections.
- **[Serverless][3]**: Shows security posture for serverless workloads such as AWS Fargate ECS tasks, listing each task ARN, Agent version, cluster, and enabled features. Use it to catch instrumentation drift across clusters and CI/CD pipelines.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/workload_protection/inventory/coverage
[2]: /security/workload_protection/inventory/hosts_and_containers
[3]: /security/workload_protection/inventory/serverless
