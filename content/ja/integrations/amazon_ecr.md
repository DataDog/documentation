---
categories:
- cloud
- aws
custom_kind: インテグレーション
dependencies: []
description: Track key Amazon ECR metrics.
doc_link: https://docs.datadoghq.com/integrations/amazon_ecr/
draft: false
git_integration_title: amazon_ecr
has_logo: true
integration_id: ''
integration_title: Amazon ECR
integration_version: ''
is_public: true
manifest_version: '1.0'
name: amazon_ecr
public_title: Datadog-Amazon ECR Integration
short_description: Track key Amazon ECR metrics.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Amazon Elastic Container Registry (Amazon ECR) is a fully managed Docker container registry that makes it easy for developers to store, manage, and deploy Docker container images.

Enable this integration to see all your ECR metrics in Datadog.

## セットアップ

### インストール

If you haven't already, set up the [Amazon Web Services integration][1] first.

### Metric collection

1. In the [AWS integration tile][2], ensure that `ECR` is checked
   under metric collection.
2. Install the [Datadog - ECR integration][3].

## 収集データ

### メトリクス
{{< get-metrics-from-git "amazon_ecr" >}}


### イベント

The ECR integration does not include any events.

### サービスチェック

The ECR integration does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog support][5].

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-ecr
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_ecr/amazon_ecr_metadata.csv
[5]: https://docs.datadoghq.com/ja/help/