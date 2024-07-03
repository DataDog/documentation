---
algolia:
  subcategory: Marketplace Integrations
app_id: cloudnatix-cloudnatix
app_uuid: 96ab2cb5-ce57-48ea-9a19-e065261c7430
assets: {}
author:
  homepage: https://cloudnatix.com/
  name: CloudNatix Inc.
  sales_email: sales@cloudnatix.com
  support_email: support@cloudnatix.com
  vendor_id: cloudnatix
categories:
- cloud
- kubernetes
- marketplace
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: cloudnatix_inc_cloudnatix
integration_id: cloudnatix-cloudnatix
integration_title: CloudNatix
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: cloudnatix_inc_cloudnatix
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.cloudnatix
  product_id: cloudnatix
  short_description: CloudNatix is priced per CPU Core per month and additional incentives
    are avaialble for larger commitments.
  tag: cpu_core
  unit_label: CPU Core
  unit_price: 37.96
public_title: CloudNatix
short_description: CloudNatix provides the insights on k8s cost, capacity, and spend
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Category::Cloud
  - Category::Kubernetes
  - Category::Marketplace
  - Offering::Software License
  configuration: README.md#Setup
  description: CloudNatix provides the insights on k8s cost, capacity, and spend
  media:
  - caption: CloudNatix dashboard
    image_url: images/cloudnatix-app-dashboard.png
    media_type: image
  - caption: CloudNatix workload
    image_url: images/cloudnatix-app-workload.png
    media_type: image
  - caption: CloudNatix workload autopilot
    image_url: images/cloudnatix-app-autopilot.png
    media_type: image
  - caption: CloudNatix cluster autopilot
    image_url: images/cloudnatix-app-cluster.png
    media_type: image
  - caption: dashboard
    image_url: images/cloudnatix-dashboard.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: CloudNatix
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## Overview

[CloudNatix][1] monitors the VMs, nodes, and workloads in k8s clusters, and provides insights upon operation optimization for their spendings, e.g. modifying configurations of CPU / memory requests or changing instance types for the nodes so that the total cost of the cluster can be reduced.

The out-of-the-box integration visualizes the monitored spendings and CloudNatix operational optimization insights in a dashboard.


## Support

For support or feature requests, contact CloudNatix through the following channels:

- Mail: [CloudNatix Support][4] 
- Slack: [CloudNatix Community][3]

[1]: https://cloudnatix.com/
[2]: mailto:support@cloudnatix.com
[3]: https://join.slack.com/t/a7t/shared_invite/zt-1fooygi86-wefZeBK_pGcBr_4_WhntnQ
[4]: mailto:support@cloudnatix.com
[5]: https://app.datadoghq.com/integrations/cloudnatix

---
This application is made available through the Marketplace and is supported by a Datadog Technology Partner. <a href="https://app.datadoghq.com/marketplace/app/cloudnatix-cloudnatix" target="_blank">Click Here</a> to purchase this application.