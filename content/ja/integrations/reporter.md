---
"assets":
  "dashboards":
    "Reporter": assets/dashboards/reporter_dashboard.json
  "monitors": {}
  "saved_views": {}
  "service_checks": service_checks.json
"author":
  "homepage": "https://www.rapdev.io"
  "name": RapDev.io
"categories":
- マーケットプレイス
"creates_events": false
"ddtype": "crawler"
"dependencies": []
"display_name": "Reporter"
"draft": false
"git_integration_title": "reporter"
"guid": "d7478feb-3dc6-4e97-bb55-5c51462d0691"
"integration_id": "rapdev-reporter"
"integration_title": "Reporter"
"is_public": true
"kind": "integration"
"maintainer": "integrations@rapdev.io"
"manifest_version": "1.0.0"
"metric_prefix": ""
"metric_to_check": ""
"name": "reporter"
"pricing":
- "billing_type": flat_fee
  "unit_price": !!int "1000"
"public_title": "Reporter"
"short_description": "Datadog ダッシュボードのメールレポートを生成する"
"support": "パートナー"
"supported_os":
- linux
- windows
"terms":
  "eula": assets/EULA.pdf
  "legal_email": ddsales@rapdev.io
---



## 概要

[{{< img src="marketplace/reporter/images/video.png" alt="Reporter の紹介" >}}](https://www.youtube.com/watch?v=GK5cGDUr1CA)

Datadog Reporter を使用すると、レポートをスケジュールして、設定した間隔でメールで送信できます。既存のダッシュボードのいずれかを選択し、レポーター Web アプリケーションに URL を追加し、それを送信するためのメール間隔を設定できます。レポートは、ユーザーが開いて表示できる添付ファイルとしてユーザーにメールで送信されます。現在、生成および送信できるレポートの数に制限はありません。

このインテグレーションにより、**Datadog Reporter** と呼ばれる新しいダッシュボードが Datadog インスタンスにセットアップされます。ダッシュボードに移動し、その iFrame から新しいユーザーを作成することで、アプリケーションに直接アクセスできます。*Datadog アカウントは DD Reporter アプリケーションでは機能しません。別のアカウントを登録する必要があります*

### サンプルのメールレポート

{{< img src="marketplace/reporter/images/3.png" alt="スクリーンショット 1" >}}

### レポートコンフィギュレーションページ

{{< img src="marketplace/reporter/images/1.png" alt="スクリーンショット 1" >}}

## サポート

サポートまたは機能リクエストについては、以下のチャンネルで RapDev.io までお問い合わせください。

 - メールアドレス: integrations@rapdev.io 
 - チャット: [RapDev.io/products](https://rapdev.io/products)
 - 電話: 855-857-0222 

---
ボストンより ❤️ を込めて

*お探しのインテグレーションが見つかりませんか？組織に役立つ重要なツールの導入をお考えですか？[こちら](mailto:integrations@rapdev.io)からメッセージをお送りいただければ、Datadog が導入をサポートいたします！*

---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。このアプリケーションを購入するには、[こちらをクリック](https://app.datadoghq.com/marketplace/app/rapdev-reporter/pricing)してください。

