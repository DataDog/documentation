---
app_id: sleuth
app_uuid: 7923b3ef-2436-4315-bf2e-7631a6975886
assets:
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: sleuth.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10118
    source_type_name: Sleuth
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Sleuth
  sales_email: support@sleuth.io
  support_email: support@sleuth.io
categories:
- 構成 & デプロイ
- 問題追跡
- orchestration
- ソースコントロール
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/sleuth/README.md
display_on_public_website: true
draft: false
git_integration_title: sleuth
integration_id: sleuth
integration_title: Sleuth
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: sleuth
public_title: Sleuth
short_description: Sleuth Deployment Tracker
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Configuration & Deployment
  - Category::Issue Tracking
  - Category::Orchestration
  - カテゴリ::ソースコントロール
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Sleuth Deployment Tracker
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Sleuth
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->
## 概要

Sleuth は、DevOps スタック全体でソフトウェアのデプロイを追跡できるようにするデプロイ追跡ツールです。Datadog インテグレーションにより、Sleuth は洞察に満ちた有意義で実用的なリアルタイムデータを提供し、コードに加えた変更の影響を明確に確認できるようにします。

## 計画と使用

Datadog インテグレーションを追加するには

1. [Sleuth アカウント][1]にログインします。
2. サイドバーの **Integrations** をクリックします。
3. _Metric Trackers_ タブをクリックし、Datadog カードで**有効化**します。
4. Datadog API キーとアプリケーションキーを対応するフィールドに入力します。
5. Datadog サーバーが EU にある場合は、_My Datadog servers are in the EU_ チェックボックスをオンにします。不明な場合は、オフのままにします。
6. **Save** を押します。

> Datadog API キーとアプリケーションキーは、**Integrations** &gt; **API** にあります。または、Sleuth ダイアログボックスの **generate** リンクをクリックして (下図を参照)、Datadog コンソールの API/アプリケーションキー領域に移動できます。

![][2]

> Datadog インテグレーションのインストールが完了すると、**Datadog is connected** というメッセージが表示されます。

![][3]

### インフラストラクチャーリスト

Datadog Sleuth インテグレーションは、Sleuth アカウントからのみインストールされます。Sleuth で Datadog API とアプリケーションキーを指定する以外に、Datadog アカウントから行う必要がある設定や追加の構成はありません。

### ブラウザトラブルシューティング

- **Add metric** ドロップダウンをクリックし、受信した Datadog メトリクスを処理する Sleuth プロジェクトを選択します。Sleuth 組織内のすべてのプロジェクトがドロップダウンに表示されます。

![][4]

> インテグレーションは Sleuth 組織レベルで行われ、その組織内のすべてのプロジェクトで使用できます。インテグレーションの個々の設定は、プロジェクトレベルで行われます。

コンフィギュレーションが完了すると、Sleuth はデプロイで Datadog メトリクスを表示します。Sleuth のデプロイカードでメトリクスがどのように伝達されるかについて詳しくは、[**ダッシュボード**][5]を参照してください。


## リアルユーザーモニタリング

### データセキュリティ

Sleuth インテグレーションには、メトリクスは含まれません。

### ヘルプ

Sleuth インテグレーションには、サービスのチェック機能は含まれません。

### ヘルプ

Sleuth インテグレーションには、イベントは含まれません。

## 削除中

1. Sleuth ダッシュボードで、左側のサイドバーの **Integrations** をクリックし、**Metric Trackers** をクリックします。
2. Datadog インテグレーションカードで、**disable** をクリックします。

Datadog インテグレーションが切断され、その組織内のプロジェクトで使用できなくなります。Datadog インテグレーションに加えたプロジェクトレベルの変更はすべて失われます。

## ヘルプ

ご不明な点は、このインテグレーションの[メインテナー][6]までお問い合わせください。

[1]: https://app.sleuth.io/accounts/login/
[2]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/sleuth/images/datadog-integration-api-key.png
[3]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/sleuth/images/datadog-integration.png
[4]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/sleuth/images/datadog-enabled-metric-pick.png
[5]: https://help.sleuth.io/dashboard
[6]: https://github.com/DataDog/integrations-extras/blob/master/sleuth/manifest.json