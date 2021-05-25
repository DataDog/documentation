---
"assets":
  "configuration":
    "spec": assets/configuration/spec.yaml
  "dashboards":
    "Synthetic Email": assets/dashboards/synthetic_email.json
  "metrics_metadata": metadata.csv
  "monitors":
    "Hop-count change": assets/monitors/hop_count_change.json
    "Performance degraded": assets/monitors/performance_degraded.json
  "saved_views": {}
  "service_checks": assets/service_checks.json
"author":
  "homepage": "https://www.rapdev.io"
  "name": RapDev.io
"categories":
- マーケットプレイス
"creates_events": false
"ddtype": "check"
"dependencies": []
"display_name": "Synthetic Email"
"draft": false
"git_integration_title": "syntheticemail"
"guid": "53c7733b-f9b1-43e0-8b34-305e3a4c2c03"
"integration_id": "rapdev-syntheticemail"
"integration_title": "Synthetic Email"
"is_public": true
"kind": "integration"
"maintainer": "integrations@rapdev.io"
"manifest_version": "1.0.0"
"metric_prefix": "rapdev.syntheticemail."
"metric_to_check": "rapdev.syntheticemail.rtt"
"name": "syntheticemail"
"pricing":
- "billing_type": tag_count
  "metric": datadog.marketplace.rapdev.syntheticemail
  "tag": mailbox
  "unit_label": Mailbox
  "unit_price": !!float "250.0"
"public_title": "Synthetic Email インテグレーション"
"short_description": "世界中からのメールメールボックスのラウンドトリップパフォーマンスを監視する"
"support": "パートナー"
"supported_os":
- linux
- mac_os
- windows
"terms":
  "eula": assets/EULA.pdf
  "legal_email": ddsales@rapdev.io
---

## 概要

[{{< img src="marketplace/syntheticemail/images/video.png" alt="Synthetic Email の紹介" >}}](https://www.youtube.com/watch?v=IUCkv93oLNA)

このインテグレーションは、メールボックスを監視し、Synthetic メッセージの送受信配信を測定します。このインテグレーションでは、Synthetic メール配信に 3 つの地理的なソースの場所である、バージニア (US)、フランクフルト (EU)、シドニー (AP) を使用します。このチェックは、アドレス `probe@synth-rapdev.io` からテストメールを送信し、メールボックスからの自動返信を待つことで機能します。このインテグレーションでは、ホップ数、ラウンドトリップ時間、テスト結果 (合格/不合格) を測定します。

以下は、このインテグレーションに含まれているダッシュボードのスクリーンショットです。

### Synthetic Email と応答時間

{{< img src="marketplace/syntheticemail/images/1.png" alt="スクリーンショット 1" >}}

## サポート
サポートまたは機能リクエストについては、以下のチャンネルで RapDev.io までお問い合わせください。

 - メールアドレス: integrations@rapdev.io 
 - チャット: [RapDev.io/products](https://rapdev.io/products)
 - 電話: 855-857-0222 

---
ボストンより ❤️ を込めて

*お探しのインテグレーションが見つかりませんか？組織に役立つ重要なツールの導入をお考えですか？[こちら](mailto:integrations@rapdev.io)からメッセージをお送りいただければ、Datadog が導入をサポートいたします！*

---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。このアプリケーションを購入するには、[こちらをクリック](https://app.datadoghq.com/marketplace/app/rapdev-syntheticemail/pricing)してください。

