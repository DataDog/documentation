---
"algolia":
  "subcategory": Marketplace Integrations
"app_id": "fairwinds-insights"
"app_uuid": "a488d774-fd45-4765-b947-e48792c6ab32"
"assets":
  "dashboards":
    "Insights Overview": assets/dashboards/overview.json
  "integration":
    "auto_install": false
    "configuration": {}
    "events":
      "creates_events": true
    "metrics":
      "check": fairwinds.insights.action_items
      "metadata_path": metadata.csv
      "prefix": fairwinds.insights.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10112"
    "source_type_name": Fairwinds Insights
"author":
  "homepage": "https://www.fairwinds.com"
  "name": Fairwinds
  "sales_email": datadog-marketplace@fairwinds.com
  "support_email": insights@fairwinds.com
  "vendor_id": fairwinds
"categories":
- containers
- cost management
- kubernetes
- marketplace
- provisioning
- security
"custom_kind": "integration"
"dependencies": []
"display_on_public_website": true
"draft": false
"git_integration_title": "fairwinds_insights"
"integration_id": "fairwinds-insights"
"integration_title": "Fairwinds Insights"
"integration_version": ""
"is_public": true
"legal_terms":
  "eula": assets/eula.pdf
"manifest_version": "2.0.0"
"name": "fairwinds_insights"
"pricing":
- "billing_type": tag_count
  "includes_assets": true
  "metric": datadog.marketplace.fairwinds.insights
  "product_id": insights
  "short_description": Kubernetes security and governance software
  "tag": insights_node
  "unit_label": Kubernetes Node
  "unit_price": !!int "100"
"public_title": "Fairwinds Insights"
"short_description": "Protects and optimizes your mission critical Kubernetes applications"
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Containers"
  - "Category::Cost Management"
  - "Category::Kubernetes"
  - "Category::Marketplace"
  - "Category::Provisioning"
  - "Category::Security"
  - "Offering::Integration"
  - "Offering::Software License"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  - "Submitted Data Type::Metrics"
  - "Submitted Data Type::Events"
  "configuration": "README.md#Setup"
  "description": Protects and optimizes your mission critical Kubernetes applications
  "media":
  - "caption": Fairwinds Insights is Kubernetes governance and security software that offers security alerting, guardrails and compliance findings and cost optimization advice. Fairwinds Insights integrates with Datadog so you have a single location to view all of your reports.
    "image_url": images/Video_Front_Cover.png
    "media_type": video
    "vimeo_id": !!int "619368230"
  - "caption": The Fairwinds Insights Admission Controller runs every time a new resource is added to the cluster. If the resource violates your organization’s policies, the Admission Controller will reject it and notify the client.
    "image_url": images/Fairwinds_Insights_Admission_Controller_Image_v1.png
    "media_type": image
  - "caption": Fairwinds Insights continuously monitors multiple clusters against security configurations to reduce risk and ensure best practices are followed. Insights pinpoints your container and Kubernetes risks, prioritizes risks, provides remediation guidance and status tracking.
    "image_url": images/Fairwinds_Insights_Automate_Kubernetes_Policies_Image_v1.png
    "media_type": image
  - "caption": Teams can build and enforce customized policies via OPA and integrate into every part of Fairwinds Insights including CI/CD pipelines, the admission controller and the in-cluster agent. Insights includes a library of OPA templates.
    "image_url": images/Fairwinds_Insights_Customize_Open_Policy_Agent_Image_v1.png
    "media_type": image
  - "caption": Insights monitors CPU and memory usage to provide recommendations on resource limits and requests. Maximize the efficiency of CPU and memory utilization for your Kubernetes workloads.
    "image_url": images/Fairwinds_Insights_Optimize_Kubernetes_Resources_Image_v1.png
    "media_type": image
  - "caption": Fairwinds Insights tightly integrates into your CI/CD pipeline to shift security left. DevOps teams can prevent misconfigurations throughout CI/CD and provide remediation advice to developers, free from manual intervention. Developers are free to develop with safety nets in place.
    "image_url": images/Fairwinds_Insights_Shift_Left_Security_Image_v1.png
    "media_type": image
  - "caption": Fairwinds Insights delivers container runtime monitoring and integrates into the CI/CD process. Insights tracks known vulnerabilities in containers, prioritizes findings by severity and offers remediation. It integrates with ticketing and assignment workflows for status tracking of remediation.
    "image_url": images/Fairwinds_Insights_VulnerabilityScanning_Image_v1.png
    "media_type": image
  "overview": "README.md#Overview"
  "resources":
  - "resource_type": blog
    "url": "https://www.datadoghq.com/blog/fairwinds-insights-datadog-marketplace/"
  - "resource_type": documentation
    "url": "https://insights.docs.fairwinds.com/"
  "support": "README.md#Support"
  "title": Fairwinds Insights
  "uninstallation": "README.md#Uninstallation"
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## Overview

Software to protect and optimize your mission-critical Kubernetes applications

#### Streamline handoffs from development to operations

* Define and control custom policies across multiple clusters
* Enforce guardrails and best practices with an admission controller
* Integration container scanning and deployment validation into CI/CD workflows

#### Monitor and optimize Kubernetes costs

* Gain visibility into workload resource usage and estimated costs
* Determine the right CPU and memory settings for your workloads

#### Save time

* Integrate Kubernetes configuration recommendations with your existing Datadog dashboards
* Improve collaboration with Slack integration

#### Reduce risk

* Monitor containers for known vulnerabilities
* Validate Kubernetes deployment configurations

## Data Collected

### Metrics

Action Items from Fairwinds Insights will appear in Datadog with tags so that you can perform any analysis you need.

### Service Checks

Fairwinds Insights does not include any service checks.

### Events

* An initial Event will appear when you first setup the integration
* Event per new Action Item in Fairwinds Insights
* Event per event fixed Aciton Item in Fairwinds Insights

## Support

For support or requests, contact Fairwinds through the following channels:

- Phone: +1 617-202-3659 
- Email: [sales@fairwinds.com][2]

### Frequently Asked Questions

**How does Fairwinds Insights work?**

Fairwinds Insights provides a unified, multi-cluster view into three categories of Kubernetes configuration issues: security, efficiency, and reliability. Fairwinds Insights makes it easy to deploy multiple open-source tools through a single helm installation. This one-time install helps engineers avoid custom work for installing and configuring each tool. The software also adds policy management capabilities so engineering teams can define and enforce guardrails for deployments into Kubernetes clusters.

**What’s a plugin?**

Fairwinds Insights refers to the tools integrated with the software as ‘plugins.’

**What’s an Agent?**

Fairwinds Insights refers to the included helm chart as the ‘Fairwinds Insights Agent.’

**What happens to my data?**

Fairwinds Insights aggregates findings from each plugin and publishes it into a multi-cluster view for easy consumption, prioritization, and issue tracking.

**What plugins does Fairwinds Insights include?**

Fairwinds Insights provides integrations for a variety of great open source tools you use today, including [Polaris](https://github.com/FairwindsOps/polaris), [Goldilocks](https://github.com/FairwindsOps/goldilocks/), [Open Policy Agent](https://www.openpolicyagent.org/), and [Trivy Container Scanning](https://github.com/aquasecurity/trivy). For the complete list, please visit the [Fairwinds Insights documentation center](https://insights.docs.fairwinds.com/). Just a few of the example findings are listed below:

* Container vulnerabilities
* Security issues with Kubernetes deployments (e.g., deployments configured to run as root)
* Cluster-level weaknesses (e.g., exposed pods, information disclosures, etc.)
* Kubernetes CVEs
* Automated notification of Helm charts that are out of date
* Custom Kubernetes policies and configuration checks

### Refund Policy

Insights Cancellation and Refund Policy:

Fairwinds Insights is provided as a month-to-month subscription that you, the customer, may discontinue at any time in the ways made available to you through your DataDog Marketplace account. If you discontinue your subscription, you will be billed only for the remainder of the monthly billing period then in effect. Insights does not provide refunds of any fees already paid.

### Further Reading

Additional helpful documentation, links, and articles:

- [Monitor Kubernetes with Fairwinds Insights' offering in the Datadog Marketplace][2]
- [Fairwinds Insights Documentation][3]

[1]: https://insights.fairwinds.com
[2]: https://www.datadoghq.com/blog/fairwinds-insights-datadog-marketplace/
[3]: https://insights.docs.fairwinds.com/
---
This application is made available through the Marketplace and is supported by a Datadog Technology Partner. <a href="https://app.datadoghq.com/marketplace/app/fairwinds-insights" target="_blank">Click Here</a> to purchase this application.
