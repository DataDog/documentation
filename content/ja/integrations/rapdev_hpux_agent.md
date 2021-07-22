---
"assets":
  "dashboards": {}
  "metrics_metadata": metadata.csv
  "monitors": {}
  "service_checks": assets/service_checks.json
"author":
  "homepage": "https://www.rapdev.io"
  "name": RapDev.io
"categories":
- マーケットプレイス
"creates_events": false
"ddtype": "check"
"dependencies": []
"display_name": "RapDev Solaris Agent"
"draft": false
"git_integration_title": "rapdev_hpux_agent"
"guid": "34529abf8-de7a-461e-83ef-0272a07d1ab8"
"integration_id": "rapdev-hpux-agent"
"integration_title": "RapDev Solaris Agent"
"is_public": true
"kind": "integration"
"maintainer": "integrations@rapdev.io"
"manifest_version": "1.0.0"
"metric_prefix": "rapdev.hpux_agent."
"metric_to_check": "datadog.marketplace.rapdev.hpux_agent"
"name": "rapdev_hpux_agent"
"pricing":
- "billing_type": tag_count
  "metric": datadog.marketplace.rapdev.hpux_agent
  "tag": ホスト
  "unit_label": HP-UX Agent
  "unit_price": !!float "40.0"
"public_title": "RapDev Solaris Agent"
"short_description": "hppa と itanium の両方の HP-UX 11.31 メトリクスを提供するシステム Agent"
"support": "パートナー"
"supported_os": []
"terms":
  "eula": assets/EULA.pdf
  "legal_email": ddsales@rapdev.io
---


## 概要

HP-UX Agent を使用すると、Datadog 内のシステムメトリクスを収集してレポートできます。このインテグレーションは、PA-RISC と Itanium アーキテクチャの両方で HP-UX 11.31 をサポートします。HP-UX Agent はデフォルトの HP-UX Perl システムディストリビューションを使用し、追加のライブラリ依存関係を必要としないため、インストールと互換性が簡素化されます。

HP-UX Agent は、Datadog インフラストラクチャーリストをサポートするために必要なホストメタデータを提供し、組織が他のサポートされている Datadog ホストオペレーティングシステムと同様の HP-UX ホストシステムで作業できるようにします。

HP-UX Agent は、ネイティブ Agent と同じ URL とポートを使用します。HP-UX Agent は現在、コアインフラストラクチャーメトリクスとログ追跡をサポートしています。Agent チェック、インテグレーション、またはサービスチェックはサポートしていません。

### HP-UX Agent のスクリーンショット

{{< img src="marketplace/rapdev_hpux_agent/images/1.png" alt="スクリーンショット 1" >}}

{{< img src="marketplace/rapdev_hpux_agent/images/2.png" alt="スクリーンショット 2" >}}

{{< img src="marketplace/rapdev_hpux_agent/images/3.png" alt="スクリーンショット 3" >}}

## サポート

サポートまたは機能リクエストをご希望の場合は、以下のチャンネルから RapDev.io にお問い合わせください。

 - メール: integrations@rapdev.io 
 - チャット: [RapDev.io/products](https://rapdev.io/products)
 - 電話: 855-857-0222 

---
ボストンより ❤️ を込めて

*お探しのインテグレーションが見つかりませんか？組織に役立つ重要なツールの導入をお考えですか？[こちら](mailto:integrations@rapdev.io)からメッセージをお送りいただければ、導入をサポートいたします！*

---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。このアプリケーションを購入するには、[こちらをクリック](https://app.datadoghq.com/marketplace/app/rapdev-hpux-agent/pricing) してください。

