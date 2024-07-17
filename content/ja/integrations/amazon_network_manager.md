---
app_id: amazon-network-manager
app_uuid: 294d91c5-7746-40f1-a314-103f7b6ffd9f
assets:
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check:
      - aws.ec2.infrastructureperformance.aggregate_aws_network_performance
      - aws.networkmanager.bytes_drop_count_blackhole
      metadata_path: metadata.csv
      prefix: aws.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10414
    source_type_name: AWS Network Manager
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- aws
- metrics
- cloud
custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: amazon_network_manager
integration_id: amazon-network-manager
integration_title: AWS Network Manager
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: amazon_network_manager
public_title: AWS Network Manager
short_description: AWS Network Manager provides centralized monitoring for global
  networks.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::AWS
  - Category::Metrics
  - Category::Cloud
  configuration: README.md#Setup
  description: AWS Network Manager provides centralized monitoring for global networks.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: AWS Network Manager
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## Overview

AWS Network Manager is a centralized monitoring service for managing your AWS Cloud WAN core network and your AWS Transit Gateway network across AWS accounts, Regions, and on-premises locations. 

## Setup

### Installation

If you haven't already, set up the [Amazon Web Services integration][1] first.

### Configuration

1. In the [AWS integration page][2], ensure that Network Manager is enabled under the **Metric Collection** tab.
2. Install the [Datadog - Amazon Network Manager integration][3].

## Data Collected

### Metrics
{{< get-metrics-from-git "amazon_network_manager" >}}


### Service Checks

Amazon Network Manager does not include any service checks.

### Events

Amazon Network Manager does not include any events.

## Troubleshooting

Need help? Contact [Datadog support][5].

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-network-manager
[4]: https://github.com/DataDog/integrations-internal-core/blob/main/amazon_network_manager/metadata.csv
[5]: https://docs.datadoghq.com/ja/help/