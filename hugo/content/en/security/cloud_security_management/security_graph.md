---
title: Investigate attack paths with Security Graph
further_reading:
  - link: "https://www.datadoghq.com/blog/datadog-security-graph/"
    tag: "Blog"
    text: "Visualize cloud security relationships with Datadog Security Graph"
  - link: https://www.datadoghq.com/blog/security-graph-attack-paths
    tag: Blog
    text: Trace exposure routes between resources with Datadog Cloud Security
---

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Security Graph is not available in the selected site ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

Security Graph supports AWS and Azure. It visualizes the resources and relationships associated with attack-path findings. Use the **Context Graph** in a finding's side panel to understand how exposure, vulnerabilities, and permissions contribute to the detected risk.

The graph shows context for the selected finding. The resources and relationships shown depend on the detection rule and available cloud data.

{{< img src="security/csm/security_graph.png" alt="Graph showing relationships between AWS EC2 instances, IAM roles, and S3 buckets" width="100%">}}

## Open an attack path's context graph

1. Open [Security Inbox][1].
1. Filter the findings by the **Attack Path** finding type.
1. Select a finding to open its side panel.
1. Open **Context Graph** to inspect the resources and relationships associated with the finding.
1. Select a resource in the graph to view its details.

## Investigate the detected risk

Follow the relationships shown in the graph to understand the finding. For example, an AWS attack path can identify a publicly accessible EC2 instance with high or critical vulnerabilities that can read sensitive data in an S3 bucket. Its graph provides context for the exposure and access relationships involved in that finding.

Review the finding's description and remediation guidance alongside the graph to determine which resource configuration, permission, or vulnerability to address.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/security_inbox/
