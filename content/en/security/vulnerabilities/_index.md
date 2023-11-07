---
title: Cloud Security Management Vulnerabilities
kind: documentation
further_reading:
- link: "/security/cloud_security_management/setup"
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

## Overview

Cloud Security Management Vulnerabilities (CSM Vulnerabilities) offers real-time threat detection, continuous configuration audits, and identity risk assessments to help you gain insights and manage vulnerabilities in your cloud infrastructure. Details are shown on the CSM [Vulnerability Explorer][1] identifying the severity, affected containers and hosts, and remediation instructions to solve the most impacted infrastructure.

**Note**: If you're looking for vulnerability management for your application libraries and custom application code, see [Application Vulnerability Management][5].

## Explore vulnerabilities
The CSM Vulnerability Explorer shows a complete list of vulnerabilities detected across your infrastructure, ordering them based on their severity, and offering grouping and filtering capabilities so you can investigate and prioritize problems. 

(update screen shot when beta tags are removed)

{{< img src="security/vulnerabilities/CSM_Vulnerabilities.png" alt="The CSM Vulnerability page sorting by unique vulnerabilities" width="100%">}}

## Manage container vulnerabilities

View your container images on the [container images][2] page. 
Observe the number of vulnerabilities that exist in the container images (column name **vulnerabilities**). Additionally, sort by **source**, **image tag**, **repo digest**, and more.

{{< img src="security/vulnerabilities/container_images_tab.png" alt="The Container Images tab highlighting vulnerabilities and container column sort feature" width="100%">}}

View additional details about any vulnerability by clicking the container image and reviewing the **Vulnerabilities** tab.

Select a specific vulnerability to see its details, including which containers and hosts are affected, severity breakdown score, and recommended remediation steps. On the details explorer, you can also view impacted resources in CSM to gain better insights to your overall risk.

{{< img src="security/vulnerabilities/container_vulnerability_2.png" alt="Container Images overview page highlighting the vulnerabilities tab" width="100%">}}

Within CSM, the severity of a vulnerability is modified from the base score to take into account the business sensitivity of the environment where the vulnerability is detected. For example, if no production environment is detected, the severity is reduced.

The Datadog Adjusted Vulnerability Score includes the full context of each impacted container or host:

- The original vulnerability severity
- Environment the infrastructure is running in
- Known public exploit

In addition to the Datadog Adjusted Severity score, the [Security Inbox][6] adds additional intelligence to surface the vulnerabilities along with any other cloud security risk needing your attention in the form of correlated security issues. 

This further enables you to identify if the underlying infrastructure is publicly exposed, and if there are other issues such as [misconfiguration][7] or [identity risks][8] with your underlying infrastructure.

## Review and remediate

View a consolidated list of vulnerabilities on the [Vulnerabilities][1] page in [Cloud Security Management][3]. Prioritize them for remediation using available facets, such as context-based **severity**, **resource type**, and **library**.</br>

The vulnerabilities explorer also offers remediation recommendations for detected vulnerabilities that enable you to change the status of a vulnerability, and assign it to a team for further review. It also includes a collection of links and references to websites or information sources that help you understand the context behind each vulnerability.

**Note**: CSM vulnerabilities are auto-closed for infrastructure that is either no longer running, or contains the remediation to the vulnerability.

{{< img src="security/vulnerabilities/CSM_vulnerabilities_assign_team.png" alt="CSM vulnerabilities explorer page highlighting the assign a team option" width="100%">}}

[1]: https://app.datadoghq.com/security/infra-vulnerability
[2]: https://app.datadoghq.com/containers/images
[3]: https://app.datadoghq.com/security/csm
[4]: https://app.datadoghq.com/security/infra-vulnerability?query=asset_type%3AHost&group=none
[5]: /security/application_security/vulnerability_management/
[6]: https://app.datadoghq.com/security/issues
[7]: /security/misconfigurations/
[8]: /security/identity_risks/

## Further reading

{{< partial name="whats-next/whats-next.html" >}}