---
"assets":
  "dashboards": {}
  "logs": {}
  "metrics_metadata": metadata.csv
  "monitors": {}
  "saved_views": {}
  "service_checks": assets/service_checks.json
"author":
  "homepage": "https://www.statsig.com"
  "name": Statsig
"categories":
- マーケットプレイス
"creates_events": true
"ddtype": "crawler"
"dependencies": []
"display_name": "Statsig ライセンス"
"draft": false
"git_integration_title": "statsig-statsig"
"guid": "d9535bd9-569e-4da9-ba3c-47f4dd262007"
"integration_id": "statsig-statsig"
"integration_title": "Statsig"
"is_public": true
"kind": "integration"
"maintainer": "support@statsig.com"
"manifest_version": "1.0.0"
"metric_prefix": "statsig."
"metric_to_check": ""
"name": "statsig-statsig"
"pricing":
- "billing_type": tag_count
  "metric": datadog.marketplace.statsig.log
  "tag": イベント
  "unit_label": 1000 件の Statsig ログイベント
  "unit_price": !!float "0.1"
"public_title": "Statsig"
"short_description": "顧客が必要とする機能をすばやく構築、計測、そして納品。"
"support": "パートナー"
"supported_os":
- linux
- mac_os
- windows
"terms":
  "eula": assets/eula.pdf
  "legal_email": serviceadmin@statsig.com
---



## 概要

[Statsig](https://www.statsig.com) を使用すると、機能のリリース前に安全に AB テストを実施し、製品に関する議論や納品ミスによるコストロスを削減できます。さらに、Statsig はイベントのログを作成するだけで試験が自動的に実行され、追加のコンフィギュレーションなしですべての新機能による影響が表示されるという点が特徴です。他のプラットフォームでは、実行するそれぞれの試験についてメトリクスを作成しサンプルサイズおよびセグメントのユーザーを計算する必要があるため、機能のパフォーマンスの確認が困難ですが、Statsig なら面倒な作業を省いて自動的に AB テストが常に実行され、機能のパフォーマンスを常時確認できます。

Facebook のエンジニア経験者からなるチームにより、さまざまなチームが数千の機能を正確にローンチできる同等のインフラストラクチャーを提供できるよう、Statsig が作成されました。

マーケットプレイスでのご提供には、Statsig のプラットフォームへのアクセスが含まれています。すでに Statsig をご利用の場合は、[Datadog Statsig インテグレーション](https://app.datadoghq.com/account/settings#integrations/statsig)で アカウントを Datadog に接続してインテグレーションをセットアップできます。

{{< img src="marketplace/statsig-statsig/images/statsig_pulse.png" alt="Statsig Pulse" >}}

{{< img src="marketplace/statsig-statsig/images/statsig_gates.png" alt="Statsig Gates" >}}

{{< img src="marketplace/statsig-statsig/images/statsig_metrics.png" alt="Statsig メトリクス" >}}

## 収集データ

### メトリクス

このインテグレーションにより提供されるメトリクスのリストおよびそれぞれの説明については、[metadata.csv](https://github.com/DataDog/marketplace/blob/master/statsig/metadata.csv) をご参照ください。

### イベント

Statsig インテグレーションにより、Statsig でのコンフィギュレーション変更イベントが Datadog に送信されます（たとえば、新規または更新された機能ゲートまたは新しいインテグレーションが有効になった時）。

## サポート

ヘルプが必要な場合は、Statsig サポート（support@statsig.com）または[弊社までお問い合わせ](https://www.statsig.com/contact)ください。

