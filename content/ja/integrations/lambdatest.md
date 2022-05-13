---
assets:
  dashboards:
    LambdaTest: assets/dashboards/overview.json
  logs:
    source: lambdatest
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
- 問題の追跡
- 自動化
- テスト
- クラウド
- コラボレーション
- コンテナ
creates_events: false
ddtype: check
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/lambdatest/README.md
display_name: LambdaTest
draft: false
git_integration_title: lambdatest
guid: 082d56cc-f4f3-4de4-93d4-4601a0767c27
integration_id: lambdatest
integration_title: LambdaTest
integration_version: ''
is_public: true
kind: integration
maintainer: prateeksaini@lambdatest.com
manifest_version: 1.0.0
metric_prefix: lambdatest.
metric_to_check: ''
name: lambdatest
public_title: Datadog-LambdaTest インテグレーション
short_description: 最も強力な自動テストプラットフォーム
support: contrib
supported_os:
- linux
- mac_os
- windows
---



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

## セットアップ

構成はすべて LambdaTest ダッシュボード上で行われます。[LambdaTest-Datadog インテグレーション][1]セットアップドキュメントを参照してください。

### コンフィギュレーション

LambdaTest を使用して Datadog でインシデントを追跡する方法を紹介します。

1. LambdaTest の Web サイトで、LambdaTest のアカウントにログインします。
2. メニューバーから設定を選択します。
3. 設定の下にあるインテグレーションをクリックします。
4. Datadog を統合するには、Push to Datadog の隣にある install をクリックします。
5. [Datadog API とアプリケーションキー][2]を入力します。
6. 確認メールが送信されます。メールに記載されているインテグレーション内容を確認します。
7. Datadog が LambdaTest アカウントと統合されたら、バグのログを取り、クロスブラウザテストを開始します。

## サポート

サポートまたは機能リクエストをご希望の場合は、以下のチャンネルから LambdaTest にお問い合わせください。

メール: support@lambdatest.com
電話: +1-(866)-430-7087
Web サイト: https://www.lambdatest.com/

[1]: https://www.lambdatest.com/support/docs/datadog-integration/
[2]: https://docs.datadoghq.com/ja/account_management/api-app-keys/