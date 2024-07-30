---
algolia:
  subcategory: Marketplace インテグレーション
app_id: trek10-coverage-advisor
app_uuid: 2faacd70-a192-4a28-8b36-e55298d7b3b4
assets:
  integration:
    auto_install: false
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: trek10.coverage.aws_metric_count
      metadata_path: metadata.csv
      prefix: trek10.coverage
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10114
    source_type_name: Trek10 AWS Coverage Advisor
  monitors:
    Trek10 AWS Coverage Advisor - New Unmonited Metric Available: assets/monitors/monitor_new.json
    Trek10 AWS Coverage Advisor - New Unmonitored Metric Discovered: assets/monitors/monitor_existing.json
author:
  homepage: https://www.trek10.com
  name: Trek10
  sales_email: signup-trek10-coverage-advisor@trek10.com
  support_email: trek10-coverage-advisor@trek10.com
  vendor_id: trek10
categories:
- マーケットプレイス
- AWS
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: trek10_coverage_advisor
integration_id: trek10-coverage-advisor
integration_title: Trek10 AWS Coverage Advisor
integration_version: ''
is_public: true
custom_kind: integration
legal_terms:
  eula: assets/eula.pdf
manifest_version: 2.0.0
name: trek10_coverage_advisor
pricing:
- billing_type: flat_fee
  includes_assets: true
  product_id: coverage-advisor
  short_description: Trek10 AWS Coverage Advisor の定額制
  unit_price: 100
public_title: Trek10 AWS Coverage Advisor
short_description: 120 種類の AWS メトリクスをチェックしてカバレッジのギャップを確認
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::Marketplace
  - Category::AWS
  - Offering::Integration
  - Submitted Data Type::Metrics
  - Submitted Data Type::Events
  configuration: README.md#Setup
  description: 120 種類の AWS メトリクスをチェックしてカバレッジのギャップを確認
  media:
  - caption: Trek10 ダッシュボード
    image_url: images/1600px-900px_maindashview_trek10_DDG_image.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Trek10 AWS Coverage Advisor
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 概要
Coverage Advisor は Datadog アカウントの重要な AWS CloudWatch メトリクスを監視します。継続的にアップデートされ、推奨事項を監視する Trek10 のデータベース上に構築されており、Datadog と AWS でクラウドネイティブの運用を実施する長年の経験が生かされたツールです。カバレッジレポート、ダッシュボード、新しい推奨事項のアラートにより、AWS インフラストラクチャーの進化具合に合わせてモニターを最新の状態に保つことができます。

サインアップすると、このインテグレーションはダッシュボードをお使いの Datadog アカウントにコピーし、Datadog の推奨モニターページに 2 つのイベントモニターを表示します。

ダッシュボードでは Datadog アカウントのモニタリングステータスのビューを閲覧できるほか、監視対象または監視対象外のメトリクスについてのレポートを生成することができます。1 つ目のイベントモニターは Trek10 が新たに重要な AWS CloudWatch メトリクス (対応するモニターがないもの) を発見した場合にアラートを送信します。2 つ目のイベントモニターは、使用中の AWS サービスとマッチする新たな CloudWatch メトリクスを推奨事項リストに追加します。



*Datadog のツールに関して特別なリクエストがおありですか？Datadog 上に構築したプラットフォームで年中無休で稼働する、AWS の管理型サービスをお探しですか？AWS または Datadog に関する専門知識をお求めですか？セールスチーム[sales team](https://trek10.com/contact)がお客様のご要望に対応いたしますので、お気軽にお問い合わせください。*

### データセキュリティ
* Trek10 は毎晩、(メトリクスに対するモニターを持たない) Datadog アカウントに現在取り込まれているメトリクスの数を計算するメトリクス trek10.coverage.aws_metric_count をプッシュします。このメトリクスにはタグ `metric_type` が含まれており、`all_metrics`、`metrics_monitored`、`monitoring_recommendations` という値に絞り込むことができます。


### ヘルプ
* Trek10 はまた、監視されていないサービスを見つけた際にイベントをプッシュします。このイベントはプライマリ ダッシュボードにリンクするため、最新の推奨事項を確認したり、レポートを生成したりすることができます。


### ログ管理
* Trek10 は 2 つのモニターを提供し、監視されていないサービスがある場合にアラートを送信します。

### ライブラリ
* Trek10 には一元化された高度なダッシュボードが搭載されており、監視されていないメトリクスの数や直近の推奨事項の確認、すべての推奨事項に関する PDF 形式のレポートの生成、またインテグレーションを通じてお使いのアカウントを毎晩チェックし、新しい推奨事項を確認するかどうかなどの制御を行うことができます。

### API
このインテグレーションでは、アカウントで保有する AWS メトリクスのうち、対応するモニターがないものをすばやく確認することができます。毎週ダッシュボードにチェックインしてレポートを生成したり、モニターをセットアップして毎日アラートを送信したりと、使いやすい方法で運用することができます。

### ベンダー情報
* Trek10 
* 会社紹介: Trek10 はテクノロジーとシステム構築を心から愛するメンバーの集まりです。AWS と Datadog を長年活用してきた経験から、これまで多くの企業の専門サービスの導入やトレーニングを支援してきました。社内では主に、AWS 向け管理型サービスのツールとして Datadog を使用しています。クライアントのアカウントにモニターを追加する必要がある場合に通知を送信する内部ツールを、お客様が使いやすいよう変更して提供しています。
* ウェブサイト: trek10.com

## Agent
* セットアップ時に、ダッシュボードおよびモニターをお使いのアカウントに複製します。セットアップでは提供された API キーを使用します。API キーのローテーションを行う場合は trek10-coverage-advisor@trek10.com までお問い合わせください。同様に、インテグレーションについて何か問題やご質問がある場合は、trek10-coverage-advisor@trek10.com までメールを送信して (その後、メールでお送りする手順に従って) チケットを作成してください。
* また、AWS の運用、モニタリング、開発に関するご質問も受け付けています。以下までお問い合わせください。
    * メールアドレス (サポート): trek10-coverage-advisor@trek10.com
    * メールアドレス (その他のご質問): info@trek10.com
    * ウェブサイト: https://www.trek10.com/contact








---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。このアプリケーションを購入するには、<a href="https://app.datadoghq.com/marketplace/app/trek10-coverage-advisor" target="_blank">こちらをクリック</a>してください。