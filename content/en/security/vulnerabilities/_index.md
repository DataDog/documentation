---
title: Cloud Security Management Vulnerabilities
kind: documentation
aliases:
    - /security/infrastructure_vulnerabilities
further_reading:
- link: "/security/infrastructure_vulnerabilities/setup"
  tag: "Documentation"
  text: "Setting up CSM Vulnerabilities"
- link: "https://www.datadoghq.com/blog/mitigate-identity-risks-and-infrastructure-vulnerabilities-with-datadog/"
  tag: "Blog"
  text: "Mitigate identity risks and infrastructure vulnerabilities with Datadog Cloud Security Management"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Cloud Security Management is not supported for your selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

<div class="alert alert-info">CSM Vulnerabilities is in beta.</div>

## Overview

Cloud Security Management Vulnerabilities (CSM Vulnerabilities) combines infrastructure observability with security insights to detect, prioritize, and manage vulnerabilities in your organization. It scans for vulnerabilities in the [container images][2] and [hosts][4] in your infrastructure.

## Review the health of your container images
CSM Vulnerabilities offers vulnerabilities in the container images on your hosts.

- View your container images on the [container images][2] page. 
- Observe the number of vulnerabilities that exist in the container images (column name `VULNERABILITIES`).

{{< img src="security/infrastructure_vulnerabilities/container_images_tab.png" alt="The Container Images tab highlighting vulnerabilities and container column sort feature" width="100%">}}

View additional details about any vulnerability by clicking the container image and reviewing the **Vulnerabilities** tab:

{{< img src="security/infrastructure_vulnerabilities/container_vulnerability.png" alt="Container Images overview page highlighting the vulnerabilities tab" width="100%">}}

## Identify impacted infrastructure

- Click any vulnerability to see more information. 
- Click **View Vulnerability in CSM** to view all related infrastructure impacted by this vulnerability.

This opens the CSM [Vulnerabilities][1] page which includes information about: 

- A description of the vulnerability.
- The date on which the vulnerability was last detected.
- Recommended remediation steps.
- Affected container images and hosts.

{{< img src="security/infrastructure_vulnerabilities/vulnerabilities_side_panel.png" alt="CSM Vulnerabilities side panel showing details of a vulnerability" width="100%">}}

## Review and remediate

View a consolidated list of vulnerabilities on the [Vulnerabilities][1] page in [Cloud Security Management][3]. Prioritize them for remediation using available facets, such as context-based **severity**, **resource type**, and **library**.

{{< img src="security/infrastructure_vulnerabilities/vulnerabilities_page.png" alt="A list of high severity vulnerabilities on the CSM Vulnerabilities page" width="100%">}}

[1]: https://app.datadoghq.com/security/infra-vulnerability
[2]: https://app.datadoghq.com/containers/images
[3]: https://app.datadoghq.com/security/csm
[4]: https://app.datadoghq.com/security/infra-vulnerability?query=asset_type%3AHost&group=none

## Further reading

{{< partial name="whats-next/whats-next.html" >}}