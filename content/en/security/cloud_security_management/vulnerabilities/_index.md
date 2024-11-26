---
title: Cloud Security Management Vulnerabilities
aliases:
    - /security/infrastructure_vulnerabilities/
    - /security/vulnerabilities/
further_reading:
- link: "/security/cloud_security_management/setup/csm_pro/?tab=aws#configure-the-agent-for-containers"
  tag: "Documentation"
  text: "Setting up container image vulnerabilities"
- link: "/security/cloud_security_management/setup/csm_enterprise/?tab=aws#hosts"
  tag: "Documentation"
  text: "Setting up host vulnerabilities"
- link: "/infrastructure/containers/container_images"
  tag: "Documentation"
  text: "Viewing Container Images"
- link: "/security/cloud_security_management/troubleshooting/vulnerabilities"
  tag: "Documentation"
  text: "Troubleshooting CSM Vulnerabilities"
- link: "https://www.datadoghq.com/blog/csm-vulnerability-management/"
  tag: "Blog"
  text: "Mitigate infrastructure vulnerabilities with Datadog Cloud Security Management"
- link: "https://www.datadoghq.com/blog/datadog-container-image-view/"
  tag: "Blog"
  text: "Enhance your troubleshooting workflow with Container Images in Datadog Container Monitoring"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Cloud Security Management Vulnerabilities is not supported for your selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

## Overview

Cloud Security Management Vulnerabilities (CSM Vulnerabilities) helps you improve your security posture and achieve compliance, by continuously scanning container images, hosts, host images, and serverless functions for vulnerabilities, from CI/CD pipelines to live production. Leveraging runtime observability, it helps you prioritize and remediate exploitable vulnerabilities in your daily workflows, all in a single view, and without any dependencies on other Datadog products.

**Note**: For vulnerability management in application libraries, see [Software Composition Analysis][5] and for application code, see [Code Security][10].

**Note 2**: CSM Vulnerabilities is available without any dependencies with other Datadog products.

## Use-cases

- Vulnerability Management program, from CI/CD pipelines to production resources
- Pass compliance audit (SOC2, PCI, HIPAA, CIS, FedRamp,..)
- Emerging vulnerabilities (0-day CVEs)

## Key capabilities

Deployment via Agentless or unified Datadog Agent
: Quickly scan your entire infrastructure for vulnerabilities via Agentless or by using the unified Datadog Agent you already deployed.

Inventory of cloud resources, in real-time
: Real time inventory of container images, hosts, serverless functions and all packages deployed in your infrastructure. SBOM export.

Continuous vulnerability detection 
: Scan updates pushed and new CVE published. Across running container images, host, host images and serverless. Identify container image layer that is vulnerable.

Prioritization of exploitable vulnerabilities, using runtime observability
: Based on CVSS, combining intel: CISA KEV, EPSS, Public exploit availability. Runtime observability: production, exposure to attack, processing sensitive data, priviledged access.

Guided remediation
: Impacted layer, image suggestion, vulnerability lifecycle management

Automation and Integration
: Automate creation of JIRA tickets, implement SLAs. Export vulnerabilities, coverage and SBOMs via public API.

Reporting
: OOTB dashboard

## Getting started

### Enable CSM Vulnerabilities
Get started with CSM Vulnerabilities now and cover your infrastructure in minutes, using:
- [Agentless scanning][11]
- [Unified Datadog agent][12]

You can also use both deployment methods to leverage the unified Datadog Agent where already deployed and Agentless elsewhere.

Once enabled, your resources are continuously scanned and prioritized vulnerabilities will start being reported in your [CSM Vulnerability Explorer][1] within an hour. 

Below is the table to help you define which solution to start with: 
| Feature                         | Agentless              | Unified Datadog Agent     |
|---------------------------------|------------------------|---------------------------|
| Time to deploy accross your infrastrcture       | Minutes | Hours to weeks           |
| Vulnerability prioritization                    | Yes | Yes, with runtime context    |
| Vulnerability scanning frequency                | 12 hours | Real-time               |
| Vulnerability detection scope |
| Host and Host image           | OS packages and App packages, mapped to image | OS packages |
| Container image               | OS packages and App packages, mapped to image | OS packages |
| High-level Compatibility - [see detailed compatibility][13] |
| Cloud Provider                | AWS, Azure (preview)        | AWS, Azure, GCP, on-prem,... |
| Operating System              | Linux                       | Linux, Windows               |
| Serverless                    | AWS Lambda                  | -                            |
| Container Registries          | AWS ECR (preview)           | -                            |

If you need any assistance, check our [Troubleshooting guide][14] or reach out to support@datadog.com.




## Explore vulnerabilities
The [Vulnerabilities Explorer][1] shows a complete list of vulnerabilities detected across your infrastructure, ordering them based on their severity, offering grouping, filtering, and triaging capabilities so you can investigate, assign, and remediate problems.

{{< img src="security/vulnerabilities/csm_vulnerabilities_3.png" alt="The CSM Vulnerability page sorting by unique vulnerabilities with side panel" width="100%">}}

Select a specific vulnerability to see its details, including which containers and hosts are affected, severity breakdown score, and recommended remediation steps.
The severity of a vulnerability is modified from the base score to take into account the following:

- Whether the underlying infrastructure is running and how wide-spread the impact is.
- The environment in which the underlying infrastructure is running. For example, if the environment is not production, the severity is downgraded.
- Whether there is an active exploit for a given vulnerability from sources such as [CISA KEV catalog][9].

{{< img src="security/vulnerabilities/container_vulnerability_3.png" alt="Details of a specific vulnerability, highlighting next steps and severity breakdown" width="100%">}}

You can also view vulnerabilities in your container images on the [container images][2] page. Sort by **source**, **image tag**, **repo digest**, and more. View additional details about any vulnerability by clicking the container image and reviewing the **Vulnerabilities** tab.

{{< img src="security/vulnerabilities/container_images.png" alt="The Container Images tab highlighting vulnerabilities and container column sort feature" width="100%">}}

On the details explorer, you can also view impacted resources in CSM to gain better insights to your overall risk.

{{< img src="security/vulnerabilities/container_vulnerability_side_panel.png" alt="The Container Images side panel details on the vulnerabilities tab" width="100%">}}

All vulnerabilities include a collection of links and references to websites or information sources that help you understand the context behind each vulnerability.

## Triage and remediate

The [Vulnerabilities Explorer][1] also offers triaging options for detected vulnerabilities that enable you to change the status of a vulnerability, and assign it to individual members for remediation and tracking.

**Note**: To help you focus on the vulnerabilities that truly matter, vulnerabilities are auto-closed for infrastructure that is either no longer running, or contains the remediated fixed version of the previously-vulnerable package.

{{< img src="security/vulnerabilities/csm_remediate.png" alt="Details explorer of a specific vulnerability highlighting the ability to remediate and assign to team member" width="100%">}}

## Video walkthrough

The following video provides an overview of how to enable and use CSM Vulnerabilities:

{{< img src="security/csm/how-to-use-csm-vulnerabilities.mp4" alt="Video that provides an overview of how to install and use CSM Vulnerabilities" video=true >}}

[1]: https://app.datadoghq.com/security/csm/vm
[2]: https://app.datadoghq.com/containers/images
[3]: https://app.datadoghq.com/security/csm
[4]: https://app.datadoghq.com/security/infra-vulnerability?query=asset_type%3AHost&group=none
[5]: /security/application_security/software_composition_analysis/
[6]: https://www.datadoghq.com/product/infrastructure-monitoring/
[9]: https://www.cisa.gov/known-exploited-vulnerabilities-catalog
[10]: /security/application_security/code_security/
[11]: /security/cloud_security_management/setup/agentless_scanning/
[12]: /security/cloud_security_management/setup/agent
[13]: /security/cloud_security_management/vulnerabilities/hosts_containers_compatibility
[14]: /security/cloud_security_management/troubleshooting/vulnerabilities/


## Further reading

{{< partial name="whats-next/whats-next.html" >}}
