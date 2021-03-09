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
"git_integration_title": "rapdev_solaris_agent"
"guid": "3717994a-49c4-4693-902a-85c8123b699c"
"integration_id": "rapdev-solaris-agent"
"integration_title": "RapDev Solaris Agent"
"is_public": true
"kind": "integration"
"maintainer": "integrations@rapdev.io"
"manifest_version": "1.0.0"
"metric_prefix": "rapdev.solaris_agent."
"metric_to_check": ""
"name": "rapdev_solaris_agent"
"pricing":
- "billing_type": tag_count
  "metric": datadog.marketplace.rapdev.solaris_agent
  "tag": ホスト
  "unit_label": Solaris Agent
  "unit_price": !!float "40.0"
"public_title": "RapDev Solaris Agent"
"short_description": "sparc と i86pc の両方の Solaris 10 および 11 のメトリクスを提供するシステム Agent"
"support": "パートナー"
"supported_os": []
"terms":
  "eula": assets/EULA.pdf
  "legal_email": ddsales@rapdev.io
---


## 概要

Solaris Agent を使用すると、Datadog 内の Solaris システムメトリクスを収集してレポートできます。このインテグレーションは、Solaris 10 と 11 の両方、および SPARC と i86pc アーキテクチャをサポートします。Solaris Agent はデフォルトの Solaris Perl システムディストリビューションを使用し、追加のライブラリ依存関係を必要としないため、インストールと互換性が簡素化されます。

Solaris Agent は、Datadog インフラストラクチャーリストをサポートするために必要なホストメタデータを提供し、組織が他のサポートされている Datadog ホストオペレーティングシステムと同様の Solaris ホストシステムで作業できるようにします。

Solaris Agent は、ネイティブ Agent と同じ URL とポートを使用します。Solaris Agent は現在、コアインフラストラクチャーメトリクスのみをサポートしています。Agent チェック、インテグレーション、またはサービスチェックはサポートしていません。Agent の将来のバージョンでは、ログのサポートが追加される予定です。

### インフラストラクチャーリストの Solaris Agent

{{< img src="marketplace/rapdev_solaris_agent/images/1.png" alt="スクリーンショット 1" >}}

## サポート

サポートまたは機能リクエストをご希望の場合は、以下のチャンネルから RapDev.io にお問い合わせください。

 - メールアドレス: integrations@rapdev.io 
 - チャット: [RapDev.io/products](https://rapdev.io/products)
 - 電話: 855-857-0222 

---
ボストンより ❤️ を込めて

*お探しのインテグレーションが見つかりませんか？組織に役立つ重要なツールの導入をお考えですか？[こちら](mailto:integrations@rapdev.io)からメッセージをお送りいただければ、Datadog が導入をサポートいたします！*

---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。このアプリケーションを購入するには、[こちらをクリック](https://app.datadoghq.com/marketplace/app/rapdev-solaris-agent/pricing)してください。

