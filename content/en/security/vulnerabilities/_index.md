---
title: Cloud Security Management Vulnerabilities
kind: documentation
aliases:
    - /security/infrastructure_vulnerabilities
further_reading:
- link: "/security/cloud_security_management/setup/csm_pro?tab=aws#configure-csm-for-container-vulnerabilities"
  tag: "Documentation"
  text: "Setting up container vulnerabilities"
- link: "/security/cloud_security_management/setup/csm_enterprise/?tab=aws#configure-csm-for-vulnerabilities"
  tag: "Documentation"
  text: "Setting up host vulnerabilities"
- link: "https://www.datadoghq.com/blog/mitigate-identity-risks-and-infrastructure-vulnerabilities-with-datadog/"
  tag: "Blog"
  text: "Mitigate identity risks and infrastructure vulnerabilities with Datadog Cloud Security Management"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Cloud Security Management is not supported for your selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

## Overview

Cloud Security Management Vulnerabilities (CSM Vulnerabilities) helps you proactively secure your cloud infrastructure by detecting, prioritizing, and managing vulnerabilities across your container images and hosts. It leverages deep observability context and industry insights to help you remediate vulnerabilities that are most important to you at a given point in time. 

**Note**: If you're looking for vulnerability management for your application libraries and custom application code, see [Application Vulnerability Management][5].

## Explore vulnerabilities
The [Vulnerability Explorer][1] shows a complete list of vulnerabilities detected across your infrastructure, ordering them based on their severity, offering grouping, filtering, and triaging capabilities so you can investigate, assign, and remediate problems.

(update screen shot when beta tags are removed)

{{< img src="security/vulnerabilities/CSM_Vulnerabilities.png" alt="The CSM Vulnerability page sorting by unique vulnerabilities" width="100%">}}

Select a specific vulnerability to see its details, including which containers and hosts are affected, severity breakdown score, and recommended remediation steps.
The severity of a vulnerability is modified from the base score to take into account the following:

- If the underlying infrastructure is running and how wide-spread the impact is.
- The environment in which the underlying infrastructure is running. For example, if the environment is not production, the severity is downgraded.
- Known active exploits for a given vulnerability from sources such as [CISA KEV catalog][9].

On the details explorer, you can also click **See Impacted Resources in CSM** to gain better insights into your overall risk.

{{< img src="security/vulnerabilities/container_vulnerability_2.png" alt="Details of a specific vulnerability, highlighting next steps and severity breakdown" width="100%">}}

## Manage container vulnerabilities

(update screen shot when beta tags are removed)

The [container images][2] page shows a complete list of container-based vulnerabilities, allowing you to order them by vulnerability **status**, and sort by **source**, **image tag**, **repo digest**, and more. You can also view additional details about any container-based vulnerability by clicking the container image and reviewing the **Vulnerabilities** tab. 

{{< img src="security/vulnerabilities/container_images_tab.png" alt="The Container Images tab highlighting vulnerabilities and container column sort feature" width="100%">}}

## Triage and remediate

While on the [Vulnerability Explorer][1], you can change the status of a vulnerability, assign it to a team for further review, and view links and information sources to understand the context behind each vulnerability.

(Also needs new screenshot)
{{< img src="security/vulnerabilities/CSM_vulnerabilities_assign_team.png" alt="Details explorer of a specific vulnerability highlighting the ability to assign a team member" width="100%">}}

**Note**: CSM vulnerabilities are auto-closed when the infrastructure is either no longer running, or contains the remediated fix to the previously-vulnerable package(s).


[1]: https://app.datadoghq.com/security/csm/vm
[2]: https://app.datadoghq.com/containers/images
[3]: https://app.datadoghq.com/security/csm
[4]: https://app.datadoghq.com/security/infra-vulnerability?query=asset_type%3AHost&group=none
[5]: /security/application_security/vulnerability_management/
[9]: https://www.cisa.gov/known-exploited-vulnerabilities-catalog

## Further reading

{{< partial name="whats-next/whats-next.html" >}}