---
app_id: pulumi
app_uuid: 7604c52b-dc07-4854-a5e4-799ab62798d8
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: pulumi.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10220
    source_type_name: Pulumi
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Pulumi
  sales_email: team@pulumi.com
  support_email: team@pulumi.com
categories:
- AWS
- 自動化
- クラウド
- 構成 & デプロイ
- developer tools
- orchestration
- プロビジョニング
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/pulumi/README.md
display_on_public_website: true
draft: false
git_integration_title: pulumi
integration_id: pulumi
integration_title: Pulumi
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: pulumi
public_title: Pulumi
short_description: 好きなプログラミング言語を使って、あらゆるクラウドに対応する Infrastructure as Code を実現
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::AWS
  - Category::Automation
  - Category::Cloud
  - Category::Configuration & Deployment
  - Category::Developer Tools
  - Category::Orchestration
  - Category::Provisioning
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: 好きなプログラミング言語を使って、あらゆるクラウドに対応する Infrastructure as Code を実現
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Pulumi
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

[Pulumi][1] は、クラウドエンジニアリングチームが好きなプログラミング言語を使って、あらゆるクラウド上のクラウドリソースを定義、デプロイ、管理できるようにする、最新の Infrastructure as Code プラットフォームです。

Pulumi インテグレーションは、Datadog で利用可能な任意のクラウドリソースをプロビジョニングするために使用されます。このインテグレーションは、Datadog でリソースをデプロイおよび更新するための認証情報を使って構成される必要があります。

## 計画と使用

### インフラストラクチャーリスト

[Pulumi と Datadog のインテグレーション][2]では、Datadog SDK を使用してリソースの管理およびプロビジョニングを行います。

### ブラウザトラブルシューティング

1. [無料または商用 Pulumi アカウントに登録します][3]

2. [Pulumi をインストールします][4]

3. 取得後、Datadog の認証トークンを Pulumi に設定するには、2 つの方法があります。


環境変数 `DATADOG_API_KEY` と `DATADOG_APP_KEY` を設定します。

```
export DATADOG_API_KEY=XXXXXXXXXXXXXX && export DATADOG_APP_KEY=YYYYYYYYYYYYYY
```

または、複数のユーザーが簡単にアクセスできるように、Pulumi スタックと一緒に保存したい場合は、コンフィギュレーションを使用して設定します。

```
pulumi config set datadog:apiKey XXXXXXXXXXXXXX --secret && pulumi config set datadog:appKey YYYYYYYYYYYYYY --secret
```

**注**: `datadog:apiKey` と `datadog:appKey` を設定する際に `--secret` を渡して、適切に暗号化されるようにします。

4. `pulumi new` を実行してインフラストラクチャースタックのプロジェクトディレクトリを初期化し、[API ドキュメント][5]に従って新しいメトリクス、モニター、ダッシュボード、その他のリソースを定義します。

5. クラウドのリソースをコードで定義したら、`pulumi up` を実行して、Pulumi プログラムで定義した新しいリソースを作成します。

## リアルユーザーモニタリング

### データセキュリティ

Pulumi には、メトリクスは含まれません。

### ヘルプ

Pulumi には、サービスのチェック機能は含まれません。

### ヘルプ

Pulumi には、イベントは含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][6]までお問合せください。

[1]: https://pulumi.com
[2]: https://www.pulumi.com/docs/intro/cloud-providers/datadog/
[3]: https://www.pulumi.com/pricing/
[4]: https://www.pulumi.com/docs/get-started/
[5]: https://www.pulumi.com/docs/reference/pkg/datadog/
[6]: https://docs.datadoghq.com/ja/help/