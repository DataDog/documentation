---
categories:
- cloud
- compliance
- cost management
- security
custom_kind: インテグレーション
dependencies: []
description: CloudHealth が Datadog からインスタンスごとのメトリクスを取得できるように支援。
doc_link: https://docs.datadoghq.com/integrations/cloudhealth/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/monitor-cloudhealth-assets-datadog/
  tag: ブログ
  text: 'CloudHealth + Datadog: クラウドアセットを効果的に管理'
git_integration_title: cloudhealth
has_logo: true
integration_id: cloudhealth
integration_title: Cloudhealth
integration_version: ''
is_public: true
manifest_version: '1.0'
name: cloudhealth
public_title: Datadog-Cloudhealth Integration
short_description: 'Help CloudHealth help you: give it per-instance metrics from Datadog.'
team: web-integrations
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

If you use both CloudHealth and Datadog, you can configure your CloudHealth account to collect per-instance resource usage metrics from Datadog. This helps CloudHealth gives you more accurate recommendations for adjusting your cloud resources.

This integration does **NOT** pull anything from CloudHealth into Datadog. It just helps CloudHealth poll your Datadog account for metrics.

## セットアップ

### 構成

If you have not yet started optimizing your cloud with CloudHealth, first sign up for a [risk-free 14 day trial][1]. For existing CloudHealth customers, all you need to do is take these four simple steps to setup your Datadog integration in CloudHealth and to improve visibility across every dimension of their cloud environment.

1. In the CloudHealth Platform, Go to Setup -> Accounts -> Datadog and click New Account button on the top right corner.
   {{< img src="integrations/cloudhealth/cloudhealth_config_2.png" alt="CloudHealth Config 2" popup="true">}}

2. Fill out the form with information from the Datadog account that you want to integrate:

    - **Name** - friendly name, you can update this at any time.
    - **API Key** - API keys are unique to your organization.
    - **Application Key** - Application keys, in conjunction with your organization's API key, give access to Datadog's API. CloudHealth only queries Datadog for host and metric information, and does not write anything to Datadog.
    - **Import Tags** - This allows you to import Datadog tags into the platform

3. Allowed tags - if "Import tags" is toggled on, tags are actively collected and you are provided an additional field to allow specific tags to be imported into CloudHealth. Select the tags that should be allowed to imported within the CloudHealth platform.
   {{< img src="integrations/cloudhealth/cloudhealth_config_1.png" alt="CloudHealth Config 1" popup="true">}}

## 収集データ

### メトリクス

The CloudHealth integration does not include metrics.

### イベント

The CloudHealth integration pushes Catchpoint events to your Datadog event stream.

### サービスチェック

The CloudHealth integration does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog support][2].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.cloudhealthtech.com
[2]: https://docs.datadoghq.com/ja/help/