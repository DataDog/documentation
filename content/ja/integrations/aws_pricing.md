---
"app_id": "aws-pricing"
"app_uuid": "74fb11c5-4dea-4b17-acac-2c2453ea6331"
"assets":
  "integration":
    "auto_install": true
    "configuration": {}
    "events":
      "creates_events": false
    "metrics":
      "check": aws.pricing.amazonecs
      "metadata_path": metadata.csv
      "prefix": aws.pricing.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10085"
    "source_type_name": AWS Pricing
"author":
  "homepage": "https://github.com/DataDog/integrations-extras"
  "name": Community
  "sales_email": tsein@brightcove.com
  "support_email": tsein@brightcove.com
"categories":
- aws
- cloud
- cost management
"custom_kind": "インテグレーション"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/aws_pricing/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "aws_pricing"
"integration_id": "aws-pricing"
"integration_title": "AWS Pricing"
"integration_version": "1.0.0"
"is_public": true
"manifest_version": "2.0.0"
"name": "aws_pricing"
"public_title": "AWS Pricing"
"short_description": "Collect AWS Pricing information for services by rate code."
"supported_os":
- linux
- macos
- windows
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Supported OS::Linux"
  - "Supported OS::macOS"
  - "Supported OS::Windows"
  - "Category::AWS"
  - "Category::Cloud"
  - "Category::Cost Management"
  "configuration": "README.md#Setup"
  "description": Collect AWS Pricing information for services by rate code.
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": AWS Pricing
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

This check pulls pricing information [published by AWS][1] to make it easier to measure cost of resource utilization within Datadog.

## セットアップ

The AWS Pricing check is not included in the [Datadog Agent][2] package, so you need to install it.

### インストール

For Agent v7.21+ / v6.21+, follow the instructions below to install the AWS Pricing check on your host. See [Use Community Integrations][3] to install with the Docker Agent or earlier versions of the Agent.

1. Run the following command to install the Agent integration:

   ```shell
   datadog-agent integration install -t datadog-aws_pricing==<INTEGRATION_VERSION>
   ```

2. Configure your integration similar to core [integrations][4].

### 構成

1. Edit the `aws_pricing.d/conf.yaml` file, in the `conf.d/` folder at the root of your Agent's configuration directory to start collecting AWS pricing data. See the sample [aws_pricing.d/conf.yaml][5] for all available configuration options.

2. [Restart the Agent][6].

### Validation

[Run the Agent's status subcommand][7] and look for `aws_pricing` under the Checks section.

## 収集データ

### メトリクス
{{< get-metrics-from-git "aws_pricing" >}}


### イベント

AWS Pricing does not include any events.

### サービスチェック
{{< get-service-checks-from-git "aws_pricing" >}}


## トラブルシューティング

Need help? Contact [Datadog support][10].


[1]: https://aws.amazon.com/pricing/
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/agent/guide/use-community-integrations/
[4]: https://docs.datadoghq.com/getting_started/integrations/
[5]: https://github.com/DataDog/integrations-extras/blob/master/aws_pricing/datadog_checks/aws_pricing/data/conf.yaml.example
[6]: https://docs.datadoghq.com/agent/guide/agent-commands/#restart-the-agent
[7]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-information
[8]: https://github.com/DataDog/integrations-extras/blob/master/aws_pricing/metadata.csv
[9]: https://github.com/DataDog/integrations-extras/blob/master/aws_pricing/assets/service_checks.json
[10]: https://docs.datadoghq.com/help/

