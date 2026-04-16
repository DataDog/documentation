---
aliases:
- /ja/integrations/amazon_eks_blueprints
app_id: amazon-eks-blueprints
categories:
- aws
- 構成とデプロイ
- incident-teams
- オーケストレーション
custom_kind: integration
description: Amazon EKS Blueprints は、クラスター構成とデプロイツールを統合します。
integration_version: 1.0.0
media: []
supported_os:
- linux
- windows
- macos
title: Datadog Blueprints アドオン
---
## 概要

Amazon Elastic Kubernetes Service (EKS) は、標準的な Kubernetes 環境におけるデプロイと保守の一部を自動化するマネージド Kubernetes サービスです。

Amazon EKS Blueprints は、クラスター構成とデプロイツールを統合するフレームワークです。

Datadog Blueprints アドオンでは、Blueprints を使用して Amazon EKS に Datadog Agent をデプロイします。

## セットアップ

### インストール

```
npm install @datadog/datadog-eks-blueprints-addon
```

### Usage

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

| オプション                  |Description                                          | Default                       |
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
| `values`                | chart に渡す設定値です。[オプションを見る](https://github.com/DataDog/helm-charts/tree/main/charts/datadog#all-configuration-options)。 | {}                            |

すべての Agent 設定オプションについては、[Datadog Helm chart](https://github.com/DataDog/helm-charts/tree/main/charts/datadog#all-configuration-options) を参照してください。これらの値は `values` オプションを使って渡せます。

### メトリクスの収集

EKS を監視するには、以下の Datadog インテグレーションのいずれかを設定する必要があります。

- [Kubernetes](https://docs.datadoghq.com/integrations/kubernetes/)
- [AWS](https://docs.datadoghq.com/integrations/amazon_web_services/)
- [Amazon EC2](https://docs.datadoghq.com/integrations/amazon_ec2/)

EKS とあわせて利用している他の AWS サービスについても、必要に応じてインテグレーションを設定してください。たとえば [ELB](https://docs.datadoghq.com/integrations/amazon_elb/) などです。

## 収集データ

## トラブルシューティング

お問合せは、[Datadog サポート](https://docs.datadoghq.com/help/) まで。