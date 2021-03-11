---
"assets":
  "dashboards": {}
  "metrics_metadata": metadata.csv
  "monitors":
    "Trek10 AWS Coverage Advisor - New Unmonited Metric Available": assets/monitors/monitor_new.json
    "Trek10 AWS Coverage Advisor - New Unmonitored Metric Discovered": assets/monitors/monitor_existing.json
  "saved_views": {}
  "service_checks": assets/service_checks.json
"author":
  "homepage": "https://www.trek10.com"
  "name": Trek10
"categories":
- マーケットプレイス
- AWS
"creates_events": true
"ddtype": "crawler"
"dependencies": []
"description": "Coverage Advisor は Datadog アカウント内の重要な AWS CloudWatch メトリクスを監視し、業務の効率化をサポートします。インフラストラクチャーの進化に伴い、新しい推奨事項があるとアラートを送信し、新たに利用する AWS サービスを確実に監視します。また、監視が推奨されたメトリクスの種類とその理由についての詳細なレポートをいつでも出力することができます。レポートにはクラウドネイティブのインフラストラクチャーモニタリングで長年の経験を有する Trek10 の知見が生かされた、使用方法についてのメモも記載されます。"
"display_name": "Trek10 AWS Coverage Advisor"
"draft": false
"git_integration_title": "trek10_coverage_advisor"
"guid": "785bbfd8-e95c-44ce-863f-29b0e092c6b0"
"integration_id": "trek10-coverage-advisor"
"integration_title": "Trek10 AWS Coverage Advisor"
"is_public": true
"kind": "integration"
"maintainer": "trek10-coverage-advisor@trek10.com"
"manifest_version": "1.0.0"
"metric_prefix": "trek10.coverage"
"metric_to_check": "trek10.coverage.aws_metric_count"
"name": "trek10_coverage_advisor"
"pricing":
- "billing_type": flat_fee
  "unit_price": !!int "100"
"public_title": "Trek10 AWS Coverage Advisor"
"short_description": "120 種類の AWS メトリクスをチェックしてカバレッジのギャップを確認。"
"support": "パートナー"
"supported_os":
- linux
- mac_os
- windows
"terms":
  "eula": assets/eula.pdf
  "legal_email": signup-trek10-coverage-advisor@trek10.com
---



## 概要
Coverage Advisor は Datadog アカウントの重要な AWS CloudWatch メトリクスを監視します。継続的にアップデートされ、推奨事項を監視する Trek10 のデータベース上に構築されており、Datadog と AWS でクラウドネイティブの運用を実施する長年の経験が生かされたツールです。カバレッジレポート、ダッシュボード、新しい推奨事項のアラートにより、AWS インフラストラクチャーの進化具合に合わせてモニターを最新の状態に保つことができます。

サインアップすると、このインテグレーションはダッシュボードをお使いの Datadog アカウントにコピーし、Datadog の推奨モニターページに 2 つのイベントモニターを表示します。

ダッシュボードでは Datadog アカウントのモニタリングステータスのビューを閲覧できるほか、監視対象または監視対象外のメトリクスについてのレポートを生成することができます。1 つ目のイベントモニターは Trek10 が新たに重要な AWS CloudWatch メトリクス (対応するモニターがないもの) を発見した場合にアラートを送信します。2 つ目のイベントモニターは、使用中の AWS サービスとマッチする新たな CloudWatch メトリクスを推奨事項リストに追加します。

{{< img src="marketplace/trek10_coverage_advisor/images/maindashview.png" alt="" >}}


*Datadog のツールに関して特別なリクエストがおありですか？Datadog 上に構築したプラットフォームで年中無休で稼働する、AWS の管理型サービスをお探しですか？AWS または Datadog に関する専門知識をお求めですか？セールスチーム[sales team](trek10.com/contact)がお客様のご要望に対応いたしますので、お気軽にお問い合わせください。*

### メトリクス
* Trek10 は毎晩、(メトリクスに対するモニターを持たない) Datadog アカウントに現在取り込まれているメトリクスの数を計算するメトリクス trek10.coverage.aws_metric_count をプッシュします。このメトリクスにはタグ `metric_type` が含まれており、`all_metrics`、`metrics_monitored`、`monitoring_recommendations` という値に絞り込むことができます。
{{< img src="marketplace/trek10_coverage_advisor/images/metric_image.png" alt="" >}}

### イベント
* Trek10 はまた、監視されていないサービスを見つけた際にイベントをプッシュします。このイベントはプライマリ ダッシュボードにリンクするため、最新の推奨事項を確認したり、レポートを生成したりすることができます。
{{< img src="marketplace/trek10_coverage_advisor/images/event_image.png" alt="" >}}

### モニター
* Trek10 は 2 つのモニターを提供し、監視されていないサービスがある場合にアラートを送信します。

### ダッシュボード
* Trek10 には一元化された高度なダッシュボードが搭載されており、監視されていないメトリクスの数や直近の推奨事項の確認、すべての推奨事項に関する PDF 形式のレポートの生成、またインテグレーションを通じてお使いのアカウントを毎晩チェックし、新しい推奨事項を確認するかどうかなどの制御を行うことができます。


## サポート
* セットアップ時に、ダッシュボードおよびモニターをお使いのアカウントに複製します。セットアップでは提供された API キーを使用します。API キーのローテーションを行う場合は trek10-coverage-advisor@trek10.com までお問い合わせください。同様に、インテグレーションについて何か問題やご質問がある場合は、trek10-coverage-advisor@trek10.com までメールを送信して (その後、メールでお送りする手順に従って) チケットを作成してください。
* また、AWS の運用、モニタリング、開発に関するご質問も受け付けています。以下までお問い合わせください。
    * メールアドレス (サポート): trek10-coverage-advisor@trek10.com
    * メールアドレス (その他のご質問): info@trek10.com
    * ウェブサイト: https://www.trek10.com/contact

---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。このアプリケーションを購入するには、[こちらをクリック](https://app.datadoghq.com/marketplace/app/trek10-coverage-advisor/pricing)してください。






## 使用方法
このインテグレーションでは、アカウントで保有する AWS メトリクスのうち、対応するモニターがないものをすばやく確認することができます。毎週ダッシュボードにチェックインしてレポートを生成したり、モニターをセットアップして毎日アラートを送信したりと、使いやすい方法で運用することができます。

## ベンダー情報
* Trek10 
* 会社紹介: Trek10 はテクノロジーとシステム構築を心から愛するメンバーの集まりです。AWS と Datadog を長年活用してきた経験から、これまで多くの企業の専門サービスの導入やトレーニングを支援してきました。社内では主に、AWS 向け管理型サービスのツールとして Datadog を使用しています。クライアントのアカウントにモニターを追加する必要がある場合に通知を送信する内部ツールを、お客様が使いやすいよう変更して提供しています。
* ウェブサイト: trek10.com

