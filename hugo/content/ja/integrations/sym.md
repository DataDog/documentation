---
app_id: sym
app_uuid: d81d1dd3-d5e8-4373-98a6-f95b797b3f9d
assets:
  dashboards:
    Sym Overview: assets/dashboards/sym_overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: sym.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10396
    source_type_name: sym
  logs:
    source: sym
  oauth: assets/oauth_clients.json
author:
  homepage: https://symops.com/
  name: Sym
  sales_email: sales@symops.com
  support_email: support@symops.com
categories:
- セキュリティ
- 開発ツール
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/sym/README.md
display_on_public_website: true
draft: false
git_integration_title: sym
integration_id: sym
integration_title: Sym
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: sym
public_title: Sym
short_description: Sym の監査ログを Datadog に送信
supported_os:
- windows
- macos
- linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Windows
  - Supported OS::macOS
  - Supported OS::Linux
  - Category::Security
  - Category::Developer Tools
  - Offering::Integration
  - Submitted Data Type::Logs
  configuration: README.md#Setup
  description: Sym の監査ログを Datadog に送信
  media:
  - caption: Sym の概要ビデオ
    image_url: images/sym_video_thumbnail.jpg
    media_type: ビデオ
    vimeo_id: 846654213
  - caption: Sym は、ネイティブのプラットフォームエンジニアリングツールを使用して、アクセスと承認のワークフローを構築するのに役立ちます。
    image_url: images/home_hero_image.png
    media_type: image
  - caption: Terraform でアクセスルールを定義し、デプロイします。
    image_url: images/define_deploy.jpg
    media_type: image
  - caption: Slack のどこからでもリクエスト、承認、拒否が可能
    image_url: images/request_approve.jpg
    media_type: image
  - caption: Sym 概要ダッシュボードの例
    image_url: images/sym_overview_dashboard.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Sym
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

[Sym][1] は、ジャストインタイムのアクセスポリシーを簡単に操作できるワークフローに変換するシンプルな自動化を定義できるプラットフォームです。これらのワークフローは Slack で実行されます。Terraform でアクセスフローを定義し、コードを使ってカスタマイズおよび他のシステムと統合し、API または Slack App を使ってアクセスのリクエストや承認 / 拒否を行うことができます。

このインテグレーションにより、お客様は Sym 監査ログを Sym Log Destination を使用して直接 Datadog に送信できます。

これらのログは、Sym プラットフォームで処理されるすべてのイベント (`request` や `approve` など) に対してリアルタイムで送信されます。

## セットアップ

### インストール

Sym インテグレーションをセットアップするには
1. Sym Datadog インテグレーションタイルから "Connect Accounts" をクリックします。
2. Datadog は、OAuth 認可フローを開始するために Sym にリダイレクトします。Sym にログインするために、ここに Sym Org ID を入力してください。
3. 認可に成功すると、`sym_log_destination` Terraform リソースが表示されます。これをコピーして、Sym Terraform Configuration に貼り付けます。

### 構成

Terraform での Datadog Log Destination の構成に関する詳細は、[Sym ドキュメント][2]を参照してください。

### 検証

Terraform で Datadog Log Destination を設定した後、以下の `symflow` CLI コマンドでその存在を確認できます。
```
 symflow resources list sym_log_destination
```

## アンインストール

- インテグレーションタイルのアンインストールボタンをクリックして、インテグレーションをアンインストールします。
- このインテグレーションをアンインストールすると、それ以前に与えられた認可は全て取り消されます。
- また、API Keys ページでインテグレーション名を検索して、このインテグレーションに紐付けられたすべての API キーが無効になったことを確認してください。

## トラブルシューティング

お困りですか？[support@symops.com][3] までお問い合わせください。

[1]: https://symops.com/
[2]: https://docs.symops.com/docs/datadog
[3]: mailto:support@symops.com