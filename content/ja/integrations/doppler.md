---
app_id: doppler
app_uuid: e22c8861-f652-42a9-9582-6470504b421f
assets:
  dashboards:
    Doppler: assets/dashboards/doppler_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 25660413
    source_type_name: doppler
  oauth: assets/oauth_clients.json
author:
  homepage: https://doppler.com
  name: Doppler
  sales_email: sales@doppler.com
  support_email: support@doppler.com
categories:
- security
- developer tools
- log collection
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/doppler/README.md
display_on_public_website: true
draft: false
git_integration_title: doppler
integration_id: doppler
integration_title: Doppler
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: doppler
public_title: Doppler
short_description: Doppler シークレット マネジメント
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
  - Category::Developer Tools
  - Category::Log Collection
  - Offering::Integration
  - Submitted Data Type::Logs
  configuration: README.md#Setup
  description: Doppler シークレット マネジメント
  media:
  - caption: シークレットをプロジェクト単位で整理
    image_url: images/projects.png
    media_type: image
  - caption: シークレットの可視性を設定して誤アクセスを防止
    image_url: images/secret-visibility.png
    media_type: image
  - caption: 既存のシークレットを提供するか、暗号学的にランダムな値を生成
    image_url: images/generate.png
    media_type: image
  - caption: 自動ローテーションを設定
    image_url: images/rotation.png
    media_type: image
  - caption: 各開発者がパーソナル コンフィグで値を上書きできます
    image_url: images/personal-config.png
    media_type: image
  - caption: すべてのシークレットの読み取りと書き込みを追跡
    image_url: images/version-history.png
    media_type: image
  - caption: アクティビティ パターンを分析
    image_url: images/dashboard.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Doppler
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

[Doppler][1] は、セキュリティと開発者の生産性を両立させるよう設計されたシークレット マネージャーです。
API キー、データベース資格情報などの機密値を安全に保存し、アプリケーションへ配信できます。

このインテグレーションは [Doppler][1] の Activity Log を Datadog に送信し、ワークプレースの変更をモニタリングできるようにします。これには次が含まれます。

- プロジェクト、環境、シークレットの変更
- 新しいメンバーの追加、役割変更、削除を含むチームの変更
- インテグレーションやセキュリティ機能を含むワークプレース設定の変更

Doppler は Datadog アカウントからデータを取得しません。

## セットアップ

### インストール

1. Doppler インテグレーション タイルで **Connect Accounts** をクリックし、Datadog と Doppler を接続します。
2. Doppler にログインするか、まだの場合はアカウントを作成します。
3. 設定したい Doppler ワークプレースを選択します。ワークプレースが 1 つしかない場合、この手順は自動的にスキップされます。
4. **Settings** をクリックしてワークプレース設定に移動します。
5. **Logging Services** > **Datadog** で **Connect** をクリックします。
6. ドロップダウンから Datadog サイトを選択します。
7. Datadog にログインします。すでにサインインしている場合、この手順はスキップされます。
8. Doppler に付与される Datadog 権限を確認し、**Authorize** をクリックします。

インストールが完了すると、Doppler Activity Log が自動的に Datadog に送信され始めます。

### 構成

このインテグレーションはすべての Doppler Activity Log を自動的に Datadog に送信します。追加の設定は現時点で利用できません。

### 検証

インストール中に Doppler がテスト ログを作成し、資格情報が正しく機能するかを検証します。ログにテスト ログが存在することを確認してください。

## 収集データ

Doppler は Datadog アカウントから情報を取得しません。

### アンインストール

- [Doppler ワークプレース設定][2] に移動し、Datadog インテグレーションを切断します。
- [Datadog API Keys ページ][3] でインテグレーション名を検索し、このインテグレーションに関連するすべての API キーを削除します。

### メトリクス

Doppler はメトリクスを報告しません。

### サービス チェック

Doppler はサービス チェックを提供しません。

### ログ

Doppler はワークプレースの [Doppler Activity Log][4] の各エントリごとにログを作成します。ログの種類および関連パラメーターはペイロードに含まれます。

### イベント

Doppler は Datadog イベントを生成しません。

## トラブルシューティング

お困りですか？ [Doppler サポート][5] にお問い合わせください。

[1]: https://www.doppler.com
[2]: https://dashboard.doppler.com/workplace/settings
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: https://docs.doppler.com/docs/workplace-logs
[5]: https://support.doppler.com