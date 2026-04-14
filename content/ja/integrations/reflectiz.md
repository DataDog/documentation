---
app_id: reflectiz
app_uuid: 79767e7d-f5db-4528-aeea-1cd68649ccd8
assets:
  dashboards:
    web exposure alerts dashboard: assets/dashboards/WebExposureAlertsDashboard.json
    web exposure rating dashboard: assets/dashboards/WebExposureRatingDashboard.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: reflectiz.v1.rating.overall
      metadata_path: metadata.csv
      prefix: reflectiz.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 5421
    source_type_name: reflectiz
  oauth: assets/oauth_clients.json
author:
  contact_link: https://www.reflectiz.com/
  homepage: https://www.reflectiz.com/
  name: Reflectiz
  sales_email: inbound@reflectiz.com
  support_email: support@reflectiz.com
categories:
- security
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/reflectiz/README.md
display_on_public_website: true
draft: false
git_integration_title: reflectiz
integration_id: reflectiz
integration_title: Reflectiz
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: reflectiz
public_title: Reflectiz
short_description: Reflectiz のインテグレーションは、Web サイトのセキュリティに関する洞察を提供します。
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
  - Category::Security
  - Submitted Data Type::Metrics
  - Submitted Data Type::Logs
  - Offering::Integration
  configuration: README.md#Setup
  description: Reflectiz のインテグレーションは、Web サイトのセキュリティに関する洞察を提供します。
  media:
  - caption: Web Exposure Rating ダッシュボード
    image_url: images/dashboard_2.png
    media_type: image
  - caption: Web Exposure Alerts ダッシュボード
    image_url: images/dashboard_1.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Reflectiz
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->
## 概要

Reflectiz の革新的なエージェント レス ソリューションは、オンライン エコシステム内のファースト パーティ、サード パーティ、フォース パーティのすべてのアプリケーションを監視し、脆弱性を検出して、Web リスク エクスポージャへの完全な可視性を提供します。独自のエクスポージャ レーティング システムを用いて、リスクとコンプライアンス課題の優先順位付けと是正を効率的に行います。

このインテグレーションは、Datadog に **Web Exposure Rating** と **Web Exposure Alerts** を導入し、セキュリティ リスクの事前評価と軽減を可能にして、Web サイトのセキュリティを強化します。

評価とアラートの双方を支えるため、ログとメトリクスの組み合わせを提供します。

### 機能

- **Web Exposure Rating**: Web サイトのコンポーネントに対する明確かつ包括的なセキュリティ レーティングを得られます。Reflectiz の Rating 機能は、Web サイトのセキュリティ状況を一目で把握できる評価を提供し、現状と改善が必要な箇所を明確にします。
- **Web Exposure Alerts**: 潜在的なリスクや脆弱性をリアル タイムで把握できます。インテグレーションは、設定ミス、疑わしいアクティビティ、新たな脅威を通知する詳細なアラートを生成し、即時の対応を可能にします。
- **Datadog とのシームレスなインテグレーション**: Datadog 環境内で、Reflectiz Rating と Risk Alerts の両方を一元的に表示できます。パフォーマンスおよびインフラ メトリクスと並行して、Web サイトのセキュリティを監視できます。
- **重要なものを優先**: Reflectiz Rating と実行可能なアラートにより、最も重要なリスクを容易に特定して優先度を付け、注力すべき領域に努力を集中できます。

## セットアップ

### Datadog で

1. Datadog の **Integrations** タブに移動します。
2. **Reflectiz** タイルを見つけ、**Install Integration** をクリックします。
3. **Connect Accounts** をクリックして認可プロセスを開始します。Reflectiz プラットフォームにリダイレクトされます。

### Reflectiz プラットフォームで

1. Reflectiz の認証情報を入力してアカウントにアクセスします。
2. このインテグレーションに適切なライセンスを選択します。

このフローが完了すると、同梱のダッシュボード内で Web Exposure Alerts と Rating のデータが利用可能になります。

### Reflectiz サイトをホストにリンクする

データをより効率的かつ有意義にするために、各 Reflectiz サイトを Datadog のホストにリンクできます:

1. Datadog の [ホスト リスト][1] を開きます。
2. ホストを選択します。
3. **User tag** セクションでタグを追加します。タグは `reflectiz.host.site:{domain}` という形式に従ってください。ここで `domain` は、リンクしたい Reflectiz サイトのドメイン (形式: `example.com`) です。<br>1 つのホストに追加のサイトを紐付けたい場合は、`reflectiz.host.site.1:{domain}`、`reflectiz.host.site.2:{domain}` のように、番号付きの形式でタグを追加できます。

これらの手順を完了すると、すべてのメトリクスとログに適切なホストのタグが付与されます。


## アンインストール



1. Datadog で、**Integrations** に移動し、Reflectiz タイルを選択して、**Uninstall Integration** をクリックします。
2. さらに、[API Keys ページ][2] でインテグレーション名を検索し、このインテグレーションに関連付けられたすべての API キーが無効化されていることを確認してください。


## 収集データ

### ログ

Reflectiz インテグレーションは、サービスごとに関連付けられた複数種類のログを Datadog に送信します。これらのログはスキャン、アプリ リスク、ドメイン リスクに関する詳細な洞察を提供し、Web サイトのセキュリティ監視に役立ちます。

#### スキャン ログ
- **ログ サービス名**: `reflectiz.v1.scan`
- **タグ**:
  - `reflectiz.site`: スキャン対象のサイト。
  - `reflectiz.scan`: スキャンの識別子。
  - `reflectiz.scan.number`: スキャンの識別子を整数で表したもの (より柔軟なフィルタリングのため)。

これらのログは、Web サイトでスキャンが実行されるたびに生成されます。

#### アラート ログ
- **ログ サービス名**: `reflectiz.v1.alerts`
- **タグ**:
  - `reflectiz.site`: スキャン対象のサイト。
  - `reflectiz.scan`: スキャンの識別子。
  - `reflectiz.scan.number`: スキャンの識別子を整数で表したもの (より柔軟なフィルタリングのため)。
  - `reflectiz.app`: 該当する場合、アラートに関連するアプリ。
  - `reflectiz.domain`: 該当する場合、アラートに関連するドメイン。

これらのログは、サイトのスキャン中にトリガーされたアラートを記録します。


#### レーティング スキャン ログ
- **ログ サービス名**: `reflectiz.v1.scan`
- **タグ**:
  - `reflectiz.site`: スキャン対象のサイト。
  - `reflectiz.scan`: スキャンの識別子。
  - `reflectiz.scan.number`: スキャンの識別子を整数で表したもの (より柔軟なフィルタリングのため)。

これらのログは、Web サイトでスキャンが実行されレーティングが算出されるたびに生成され、レーティング データのフィルタリングに有用です。

#### アプリ リスク ログ
- **ログ サービス名**: `reflectiz.v1.rating.app.risks`
- **タグ**:
  - `reflectiz.site`: スキャン対象のサイト。
  - `reflectiz.scan`: スキャンの識別子。
  - `reflectiz.scan.number`: スキャンの識別子を整数で表したもの (より柔軟なフィルタリングのため)。
  - `reflectiz.app`: 評価対象のアプリケーション。

これらのログは、サイト上の特定アプリケーションに関連するリスクを強調し、脆弱性の特定に役立ちます。

#### ドメイン リスク ログ
- **ログ サービス名**: `reflectiz.v1.rating.domain.risks`
- **タグ**:
  - `reflectiz.site`: スキャン対象のサイト。
  - `reflectiz.scan`: スキャンの識別子。
  - `reflectiz.scan.number`: スキャンの識別子を整数で表したもの (より柔軟なフィルタリングのため)。
  - `reflectiz.domain`: 評価対象のドメイン。

これらのログは、ドメインに関連するリスクに焦点を当て、ドメイン固有の脆弱性を明確に把握できます。


### メトリクス
このインテグレーションで提供されるメトリクスの一覧は、[metadata.csv][3] を参照してください。

## サポート
サポートや機能リクエストについては、次の窓口から Reflectiz にお問い合わせください:

- サポート: [support@reflectiz.com][4]
- 営業: [inbound@reflectiz.com][5]
- Web サイト: [reflectiz.com][6]

[1]: https://app.datadoghq.com/infrastructure
[2]: https://app.datadoghq.com/organization-settings/api-keys?filter=Reflectiz
[3]: https://github.com/DataDog/integrations-extras/blob/master/reflectiz/metadata.csv
[4]: mailto:support@reflectiz.com
[5]: mailto:inbound@reflectiz.com
[6]: https://reflectiz.com