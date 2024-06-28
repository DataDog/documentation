---
app_id: lambdatest
app_uuid: 8d4556af-b5e8-4608-a4ca-4632111931c1
assets:
  dashboards:
    LambdaTest: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: lambdatest.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10243
    source_type_name: LambdaTest
  logs:
    source: lambdatest
  oauth: assets/oauth_clients.json
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: LambdaTest
  sales_email: prateeksaini@lambdatest.com
  support_email: prateeksaini@lambdatest.com
categories:
- 自動化
- コンテナ
- インシデント
- 問題追跡
- テスト
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/lambdatest/README.md
display_on_public_website: true
draft: false
git_integration_title: lambdatest
integration_id: lambdatest
integration_title: LambdaTest
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: lambdatest
public_title: LambdaTest
short_description: 最も強力な自動テストプラットフォーム
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Automation
  - Category::Containers
  - Category::Incidents
  - Category::Issue Tracking
  - Category::Testing
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: 最も強力な自動テストプラットフォーム
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: LambdaTest
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

LambdaTest と統合することで、チームのコラボレーションと効率的なテストが可能になります。LambdaTest はクラウドベースのテストプラットフォームで、2000 以上のブラウザ、ブラウザバージョン、OS に対応した Web サイトや Web アプリケーションで手動テストと自動テストを実行することが可能です。

LambdaTest は、手動および Selenium、Cypress、TestCafe などの様々な自動テストフレームワークをサポートしています。

LambdaTest インテグレーションでは、LambdaTest プラットフォームを使用して Web サイト (および Web アプリ) のクロスブラウザテストを実行しながら、バグを記録します。LambdaTest は、ブラウザのバージョン、OS、解像度、コメント、スクリーンショットなど、テスト環境からの詳細を自動的に Datadog に取り込みます。

LambdaTest でできることは以下の通りです。

- クラウドベースのインフラストラクチャーでホストされた 2000 以上のブラウザと実機によるライブインタラクティブテスト。
- オンライン自動テストグリッドが、あらゆる CI/CD パイプラインで QA チームが高品質のビルドを迅速に検証し出荷できるよう支援する、Selenium と Cypress のテストをサポートします。
- パフォーマンスとレスポンスに優れたウェブサイトをスピーディーに構築できる、開発者に優しい次世代ブラウザ。
- プロジェクト管理、コミュニケーション、コードレス自動化、CI/CD などのためのサードパーティツールとの 100 以上のインテグレーション。
- 24 時間 365 日のチャットサポートで、いつでもヘルプを受けることができます。
- プラットフォームへの生涯無料アクセス、自動化テスト 100 分無料。

## 計画と使用

構成はすべて LambdaTest ダッシュボード上で行われます。[LambdaTest-Datadog インテグレーション][1]セットアップドキュメントを参照してください。

### ブラウザトラブルシューティング

LambdaTest を使用して Datadog でインシデントを追跡する方法を紹介します。

1. LambdaTest の Login ページから LambdaTest インテグレーションの認可を開始するには、**Connect Accounts** をクリックします。
2. LambdaTest の Web サイトで LambdaTest のアカウントにログインすると、Datadog の認可ページにリダイレクトされます。
3. **Authorize** をクリックし、インテグレーションを完了します。
4. インテグレーション構成が完了すると、確認メールが送信されます。
5. Datadog が LambdaTest アカウントと統合されたら、バグのログを取り、クロスブラウザテストを開始します。

## アンインストール

このインテグレーションをアンインストールすると、それまでの認可はすべて取り消されます。

さらに、このインテグレーションに関連するすべての API キーが無効になっていることを、[API キー管理ページ][2]でインテグレーション名を検索して確認してください。

## Agent

サポートまたは機能リクエストをご希望の場合は、以下のチャンネルから LambdaTest にお問い合わせください。

メール: support@lambdatest.com
電話: +1-(866)-430-7087
Web サイト: https://www.lambdatest.com/

[1]: https://www.lambdatest.com/support/docs/datadog-integration/
[2]: https://app.datadoghq.com/organization-settings/api-keys?filter=LambdaTest