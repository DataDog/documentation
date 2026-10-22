---
title: Investigate attack paths with Security Graph
further_reading:
  - link: "/security/security_inbox/"
    tag: "Documentation"
    text: "Investigate findings in Security Inbox"
  - link: "/security/default_rules/?category=cat-attack-paths"
    tag: "Documentation"
    text: "Explore Attack Path detection rules"
---

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Security Graph is not available in the selected site ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

One of the most persistent challenges in cloud security is understanding the resources and relationships associated with attack-path findings. With Security Graph, which supports AWS and Azure, you can use the **Context Graph** in a finding's side panel to understand how exposure, vulnerabilities, and permissions contribute to the detected risk.

The graph shows context for the selected finding. The resources and relationships shown depend on the detection rule and available cloud data.

{{< img src="security/csm/security_graph.png" alt="Graph showing relationships between AWS EC2 instances, IAM roles, and S3 buckets" width="100%">}}

## Open an attack path's Context Graph

1. In Datadog, go to **Security** > [**Inbox**][1].
1. In the **Finding Type** list, beside **attack_path**, click **Only** to filter the Security Inbox findings.
1. Click a finding to view it in a side panel. If the Security Inbox has grouping applied, open a group, then click a finding in the group to view it.
1. Scroll to the **Context Graph** to inspect the resources and relationships associated with the finding.
1. Click a resource in the graph to view its details.

## Investigate the detected risk

Follow the relationships shown in the graph to understand the finding. For example, an AWS attack path can identify a publicly accessible EC2 instance with high or critical vulnerabilities that can read sensitive data in an S3 bucket. Its graph provides context for the exposure and access relationships involved in that finding.

Review the finding's description and remediation guidance alongside the graph to determine which resource configuration, permission, or vulnerability to address.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/issues
