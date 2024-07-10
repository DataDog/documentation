---
app_id: amazon-eks-blueprints
app_uuid: 4c0828d6-0c41-47d0-aa20-c174773e2bda
assets:
  integration:
    configuration: {}
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: amazon_eks_blueprints
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- AWS
- 構成 & デプロイ
- コンテナ
- orchestration
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/amazon_eks_blueprints/README.md
display_on_public_website: true
draft: false
git_integration_title: amazon_eks_blueprints
integration_id: amazon-eks-blueprints
integration_title: Datadog Blueprints アドオン
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: amazon_eks_blueprints
public_title: Datadog Blueprints アドオン
short_description: Amazon EKS Blueprints は、クラスター構成とデプロイツールを統合します。
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::AWS
  - Category::Configuration & Deployment
  - Category::Containers
  - Category::Orchestration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Amazon EKS Blueprints は、クラスター構成とデプロイツールを統合します。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Datadog Blueprints アドオン
---



## 概要

Amazon Elastic Kubernetes Service (EKS) は、あらゆる標準的な Kubernetes 環境のデプロイとメンテナンスの特定の側面を自動化する、マネージド Kubernetes サービスです。

Amazon EKS Blueprints は、クラスター構成とデプロイツールを統合するフレームワークです。

Datadog Blueprints アドオンでは、Blueprints を使用して Amazon EKS に Datadog Agent をデプロイします。

## セットアップ

### インストール

```
npm install @datadog/datadog-eks-blueprints-addon
```

### 使用方法

#### 既存の Kubernetes シークレットを使用する

```js
import * as cdk from 'aws-cdk-lib';
import * as blueprints from '@aws-quickstart/eks-blueprints';
import { DatadogAddOn } from '@datadog/datadog-eks-blueprints-addon';
const app = new cdk.App();
const addOns: Array<blueprints.ClusterAddOn> = [
    new DatadogAddOn({
        // Datadog API キーを保持する Kubernetes シークレット
        // この値は secret オブジェクトの `api-key` キーで設定する必要があります。
        apiKeyExistingSecret: '<secret name>'
    })
];
const account = '<aws account id>'
const region = '<aws region>'
const props = { env: { account, region } }
new blueprints.EksBlueprint(app, { id: '<eks cluster name>', addOns}, props)
```

#### AWS Secrets Manager の使用
AWS Secrets Manager を使用して、Datadog API キーを保存します。

```
aws secretsmanager create-secret --name <secret name> --secret-string <api_key> --region <aws region>
```

`apiKeyAWSSecret` で事前に作成したシークレットを参照します。

```js
import * as cdk from 'aws-cdk-lib';
import * as blueprints from '@aws-quickstart/eks-blueprints';
import { DatadogAddOn } from '@datadog/datadog-eks-blueprints-addon';
const app = new cdk.App();
const addOns: Array<blueprints.ClusterAddOn> = [
    new DatadogAddOn({
        apiKeyAWSSecret: '<secret name>'
    })
];
const account = '<aws account id>'
const region = '<aws region>'
const props = { env: { account, region } }
new blueprints.EksBlueprint(app, { id: '<eks cluster name>', addOns}, props)
```

### 構成

#### オプション

| オプション                  |説明                                          | デフォルト                       |
|-------------------------|-----------------------------------------------------|-------------------------------|
| `apiKey`                | Datadog API キー                                | ""                            |
| `appKey`                | Datadog アプリキー                                | ""                            |
| `apiKeyExistingSecret`  | API キーを保存している既存の Kubernetes Secret      | ""                            |
| `appKeyExistingSecret`  | アプリキーを保存している既存の Kubernetes Secret      | ""                            |
| `apiKeyAWSSecret`       | API キーを保存している AWS Secrets Manager の Secret   | ""                            |
| `appKeyAWSSecret`       | アプリキーを保存している AWS Secrets Manager の Secret   | ""                            |
| `namespace`             | Datadog Agent をインストールするためのネームスペース              | "デフォルト"                     |
| `version`               | Datadog Helm チャートのバージョン                   | "2.28.13"                     |
| `release`               | Helm のリリース名                            | "datadog"                     |
| `repository`            | Helm チャートのリポジトリ                        | "https://helm.datadoghq.com"  |
| `values`                | チャートに渡される構成値。[オプションを参照してください][1]。 | {}                            |


すべての Agent の構成オプションについては、[Datadog Helm チャート][1]を参照してください。これらの値は `values` オプションを使用して渡すことができます。

### メトリクスの収集

EKS を監視するには、以下の Datadog インテグレーションのいずれかを設定する必要があります。

- [Kubernetes][2]
- [AWS][3]
- [AWS EC2][4]

[ELB][5] など、EKS で実行している他の AWS サービスのインテグレーション設定も行ってください。

## 収集データ


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][6]までお問合せください。

[1]: https://github.com/DataDog/helm-charts/tree/main/charts/datadog#all-configuration-options
[2]: https://docs.datadoghq.com/ja/integrations/kubernetes/
[3]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[4]: https://docs.datadoghq.com/ja/integrations/amazon_ec2/
[5]: https://docs.datadoghq.com/ja/integrations/amazon_elb/
[6]: https://docs.datadoghq.com/ja/help/