---
title: Cloud Security Vulnerabilities
aliases:
    - /security/infrastructure_vulnerabilities/
    - /security/vulnerabilities/
further_reading:
- link: "/infrastructure/containers/container_images/#enable-sbom-collection"
  tag: "Documentation"
  text: "Enable SBOM collection in Cloud Security Vulnerabilities"
- link: "/security/cloud_security_management/setup/csm_enterprise/?tab=aws#hosts"
  tag: "Documentation"
  text: "Setting up host vulnerabilities"
- link: "/infrastructure/containers/container_images"
  tag: "Documentation"
  text: "Viewing Container Images"
- link: "/security/cloud_security_management/troubleshooting/vulnerabilities"
  tag: "Documentation"
  text: "Troubleshooting Cloud Security Vulnerabilities"
- link: "https://www.datadoghq.com/blog/datadog-container-image-view/"
  tag: "Blog"
  text: "Enhance your troubleshooting workflow with Container Images in Datadog Container Monitoring"
---

## Overview

Cloud Security Vulnerabilities helps you improve your security posture and achieve compliance, by continuously scanning container images, hosts, host images, and serverless functions for vulnerabilities, from CI/CD pipelines to live production. Leveraging runtime observability, it helps you prioritize and remediate exploitable vulnerabilities in your daily workflows, all in a single view, and without any dependencies on other Datadog products.

With Cloud Security Vulnerabilities, you can manage your cloud security management strategy, all in one place:

- Create a vulnerability management program, from CI/CD pipelines to production resources
- Pass compliance audits (such as SOC2, PCI, HIPAA, CIS, and FedRamp)
- Remediate emerging vulnerabilities (0-day CVEs)

**Note**: For vulnerability management in application libraries, see [Software Composition Analysis][5]. For application code, see [Code Security][10].

## Key capabilities

Deploy using Agentless or unified Datadog Agent
: Quickly scan your entire infrastructure for vulnerabilities, either using Agentless, or by using the unified Datadog Agent you already have deployed.

Inventory cloud resources, in real-time
: Inventory container images, hosts, serverless functions, and all packages deployed in your infrastructure, in real time, and export your SBOM.

Detect vulnerabilities continuously
: Scan recent updates and newly published CVEs, across running container images from hosts and registries, host, host images, and serverless, and identify vulnerable container image layers.

Prioritize exploitable vulnerabilities, using runtime observability
: Leverage Datadog's security scoring, which is based on CVSS, by incorporating intel from CISA KEV, EPSS, and public exploit availability. With runtime observability, you can monitor production, exposure to attacks, sensitive data processing, and privileged access.

Take advantage of guided remediation
: See which layers are impacted, get suggestions specific to each image, and action on your vulnerability lifecycle management.

Implement automation and integrations
: Automate the creation of Jira tickets and implement SLAs. Use Datadog's public API to export vulnerabilities, coverage, and SBOMs.

Explore reports
: View and monitor vulnerability data in your dashboards.

## Deployment methods

Get started with Cloud Security Vulnerabilities and cover your infrastructure in minutes, using:
- [Agentless Scanning][11]
- [Unified Datadog Agent][12]

You can also use both deployment methods to use the unified Datadog Agent where you already have it deployed, and Agentless elsewhere.

After you've enabled it, Datadog starts scanning your resources continuously, and starts reporting prioritized vulnerabilities in your [Cloud Security Vulnerabilities Findings page][1] within an hour. 

Use these tables to decide which solution to start with: 
| Feature                                   | Agentless                                     | Unified Datadog Agent          |
|-------------------------------------------|-----------------------------------------------|--------------------------------|
| Time to deploy across your infrastructure | Minutes                                       | Hours to weeks                 |
| Vulnerability prioritization              | Yes                                           | Yes, with runtime context      |
| Vulnerability scanning frequency          | 12 hours                                      | Real-time                      |

| Vulnerability detection scope             | Agentless                                     | Unified Datadog Agent          |
|-------------------------------------------|-----------------------------------------------|--------------------------------|
| Host and host image                       | OS packages and app packages, mapped to image | OS packages                    |
| Container image                           | OS packages and app packages, mapped to image | OS packages                    |
| Cloud provider                            | AWS, [Azure (Preview)][15]                    | AWS, Azure, GCP, on-prem, etc. |
| Operating system                          | Linux                                         | Linux, Windows                 |
| Serverless                                | AWS Lambda, AWS ECS Fargate                   | Not applicable                 |
| Container registries                      | Amazon ECR                                    | Not applicable                 |

For more information on compatibility, see [Cloud Security Vulnerabilities Hosts and Containers Compatibility][13]. If you need any assistance, see the [troubleshooting guide][14], or reach out to support@datadoghq.com.

## Continuously detect, prioritize, and remediate exploitable vulnerabilities
The [Cloud Security Vulnerabilities Findings page][1] helps you investigate vulnerabilities detected across your container images, host images, running hosts, and serverless functions using filtering and grouping capabilities.

Focus on exploitable vulnerabilities first, using the Datadog Severity Score, combining the base CVSS score with many risk factors, including sensitive data, environment sensitivity, exposure to attacks, exploit availability, or threat intelligence sources.

For vulnerabilities with available fixes, the Findings page provides guided remediation steps to assist Dev and Ops teams in resolving issues more quickly and effectively. You can also triage, mute, comment, and assign vulnerabilities to manage their lifecycle.

{{< img src="security/vulnerabilities/csm-vm-explorer-actionability-2.png" alt="The Cloud Security Vulnerabilities Findings page displaying a vulnerability and the actions a user can take to remediate it" width="100%">}}

In [Container Images][7], you can trace vulnerabilities found in an image to specific layers, so you can pinpoint and remediate your security risks faster.

{{< img src="infrastructure/containerimages/image_layer_vulnerabilities.png" alt="A list of vulnerabilities associated with each layer of an image" width="100%">}}

## Automation and Jira integration
Make Cloud Security Vulnerabilities part of your daily workflow by setting up [security notification rules][17] and [automation pipelines (in Preview)][20]:
- Get alerted upon detection of an exploitable vulnerability for your scope
- Automatically create Jira tickets
- Configure SLAs to remediate vulnerabilities

{{< img src="security/vulnerabilities/csm-notifications.png" alt="The notification rule setup screen" width="100%">}}

## Tracking and reporting
Use the out-of-the-box [Cloud Security Vulnerabilities dashboard][18] to track and report progress to stakeholders. Clone and modify it as needed to fit your unique needs.

{{< img src="security/vulnerabilities/csm-vm-reporting.png" alt="The Cloud Security Vulnerabilities dashboard" width="100%">}}

## Explore infrastructure packages

The [Infrastructure Packages Catalog][19] provides a real-time inventory of all packages across hosts, host images, and container images deployed in your infrastructure. It offers an interface you can use to investigate your SBOMs, enriched with vulnerability and runtime context.

Quickly assess the impact of a critical emerging vulnerability by searching for affected package versions and identifying all of the resources that use it.

{{< img src="security/vulnerabilities/csm_package_explorer_3.png" alt="The inventory of packages deployed in the infrastructure with vulnerability context and pivot to resources using them" width="100%">}}

[1]: https://app.datadoghq.com/security/csm/vm
[2]: https://app.datadoghq.com/containers/images
[3]: https://app.datadoghq.com/security/csm
[4]: https://app.datadoghq.com/security/infra-vulnerability?query=asset_type%3AHost&group=none
[5]: /security/code_security/software_composition_analysis/
[6]: https://www.datadoghq.com/product/infrastructure-monitoring/
[7]: https://app.datadoghq.com/container-images
[9]: https://www.cisa.gov/known-exploited-vulnerabilities-catalog
[10]: /security/code_security/iast/
[11]: /security/cloud_security_management/setup/agentless_scanning/
[12]: /security/cloud_security_management/setup/agent
[13]: /security/cloud_security_management/vulnerabilities/hosts_containers_compatibility
[14]: /security/cloud_security_management/troubleshooting/vulnerabilities/
[15]: https://www.datadoghq.com/product-preview/agentless-vulnerability-scanning-for-azure/
[16]: https://www.datadoghq.com/product-preview/ecr-vulnerability-scanning/
[17]: https://app.datadoghq.com/security/configuration/notification-rules
[18]: https://app.datadoghq.com/dash/integration/csm_vulnerabilities?fromUser=true&refresh_mode=sliding&from_ts=1733323465252&to_ts=1733928265252&live=true
[19]: https://app.datadoghq.com/security/catalog/libraries
[20]: https://www.datadoghq.com/product-preview/security-automation-pipelines/

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
