---
app_id: meraki
app_uuid: c34bd865-7ddf-4336-9cf2-02e1a2f05bbd
assets:
  dashboards:
    meraki: assets/dashboards/meraki_overview.json
  integration:
    auto_install: false
    metrics:
      check:
      - meraki.port.usageInKb.recv
      - snmp.devStatus
      metadata_path: metadata.csv
      prefix: ''
    source_type_id: 602
    source_type_name: Meraki
  monitors:
    '[Meraki] A Meraki Device Uplink is Failing': assets/monitors/uplink_device_is_failing.json
    '[Meraki] A Meraki Device is in an Alerting State': assets/monitors/device_is_in_alert_state.json
    '[Meraki] Abnormally High Latency on a Meraki Uplink': assets/monitors/high_latency_on_uplink.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- ネットワーク
- ログの収集
- security
- snmp
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: meraki
integration_id: meraki
integration_title: Cisco Meraki
integration_version: ''
is_public: true
kind: インテグレーション
manifest_version: 2.0.0
name: meraki
oauth: {}
public_title: Cisco Meraki
short_description: NDM メトリクス、ログ、Cloud SIEM を使用して Cisco Meraki プラットフォームを監視する
supported_os:
- any
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Network
  - Category::Log Collection
  - Category::Security
  - Category::SNMP
  - Submitted Data Type::Logs
  - Submitted Data Type::Metrics
  - Supported OS::Any
  configuration: README.md#Setup
  description: NDM メトリクス、ログ、Cloud SIEM を使用して Cisco Meraki プラットフォームを監視する
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Cisco Meraki
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 概要

このインテグレーションは、[ネットワークデバイスモニタリング][1]のメトリクス、ネットワークイベントログ、そして [Cloud SIEM][2] 用のセキュリティイベントログを収集することで、Cisco Meraki プラットフォームの包括的な可視性を提供します。ログ、メトリクス、推奨モニター、インテグレーションダッシュボードの詳細については、[Meraki インテグレーションタイル][3]を参照してください。

**ネットワークデバイスモニタリング**

潜在的なボトルネックに対する洞察を得て、デバイス構成を最適化し、ネットワークインフラストラクチャー全体の健全性が標準に達していることを保証します。

このインテグレーションは、以下のデバイスのメトリクスを収集します。

* _MR (ワイヤレスアクセスポイント):_ クライアント数、接続ステータス、スループットなどのメトリクスを追跡します。
* _MS (スイッチ):_ ポートステータス、トラフィック、エラーレートなどのスイッチパフォーマンスメトリクスを監視します。
* _MX (セキュリティアプライアンス):_ VPN のステータス、ファイアウォールルール、デバイス全体のパフォーマンスに関するメトリクスを収集します。

デバイスのタグ付けにより、Datadog でデータをフィルタリングして整理する機能が強化され、特定のデバイスグループ、ロケーション、またはデバイスタイプに深く分析することができます。これにより、すぐに使えるダッシュボードを使用しながら、トラブルシューティング、パフォーマンスの最適化、およびレポート作成を支援することができます。

**セキュリティイベントログ**

[セキュリティイベントログ][4]では、以下のイベントを特定することができます。

* _侵入検知_: Meraki セキュリティアプライアンスによって検出された潜在的なセキュリティ脅威を特定し、対応します。
* _ファイアウォールルールの違反_: ネットワークセキュリティを維持するために、ファイアウォールルールの違反を監視し、アクションを起こします。
* _マルウェア脅威の検出_: アラートを受信し、Meraki ネットワーク内のマルウェア脅威に対して予防措置を講じます。

独自のルールを作成したり、[すぐに使える Cloud SIEM ルール][5]を活用して、リアルタイムの脅威検出とインシデント対応を実現します。

**ネットワークイベントログ**

[ネットワークイベントログ][6]は、以下のトピックの追跡に役立ちます。

* _構成変更:_ ネットワーク構成の変更を追跡し、コンプライアンスを確保し、接続の問題をトラブルシューティングします。
* _クライアントアソシエーション:_ ワイヤレスアクセスポイントとのクライアントアソシエーションを監視し、ユーザーの接続性を把握します。
* _ネットワーク健全性イベント:_ 特定のスイッチでパケットロスが多いなど、ネットワークの健全性に影響する問題を特定し、対処します。

ネットワーク管理者は、過去のネットワークイベントを分析し、問題のトラブルシューティングを効率的に行うことができます。このインテグレーションに含まれる推奨モニターに加えて、重要なイベントを管理者に通知する追加モニターを構成することができ、プロアクティブなネットワーク管理が可能になります。

さらに、Meraki Cloud Controller からメトリクスを収集するために Meraki プロファイルで [SNMP インテグレーション][7]を構成します。

## 計画と使用

### インフラストラクチャーリスト

1. アプリで [Meraki インテグレーションタイル][3]を開きます。
1. **+ Add Account** をクリックします。
1. Meraki アカウントの名前を選択します。
1. Meraki API キーを追加します。Meraki API キーの生成方法については、[Cisco Meraki Dashboard API][8] の手順を参照してください。

### Meraki API キーを生成する

1. Meraki のダッシュボードを開きます。
2. Organization > Settings > Dashboard API access で API アクセスを有効化します。
3. Meraki ダッシュボードの My Profile ページを開いてキーを生成します。

### メトリクスの収集

NDM メトリクスの収集を構成するには、Meraki の API キーが必要です。

#### デバイスタグフィルター

デバイスタグフィルターでは、NDM 内で監視するデバイスを指定できます。カンマで区切って複数のタグを指定できます。タグを指定しない場合は、すべてのデバイスが監視されます。

### 収集データ

ネットワークイベントログとセキュリティイベントログの収集を構成するには、Meraki の API キーが必要です。

詳細については、[Cisco Meraki Dashboard API][9] を参照してください。

## リアルユーザーモニタリング

### データセキュリティ

<div class="alert alert-info">ネットワークデバイスモニタリングの Meraki デバイス (MR、MS、MX) のデータ (ネットワークレベル、デバイスレベル、アップリンクレベル、インターフェイス (スイッチポート) レベルのメトリクスとタグを含む) はベータ版です。</div>

Meraki デバイスからメトリクスを収集できるよう、Meraki プロファイルで [SNMP インテグレーション][7]を構成します。

{{< get-metrics-from-git "meraki" >}}

### ヘルプ

Meraki インテグレーションには、イベントは含まれません。

### ヘルプ

Meraki インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][10]までお問合せください。

## その他の参考資料

お役に立つドキュメント、リンクや記事:

- [ネットワークデバイスモニタリング][11]
- [Datadog で Cisco Meraki を監視する][12]

[1]: https://app.datadoghq.com/devices
[2]: https://app.datadoghq.com/security/home
[3]: https://app.datadoghq.com/integrations/meraki
[4]: https://developer.cisco.com/meraki/api/get-network-appliance-security-events/
[5]: https://app.datadoghq.com/logs/pipelines?search=meraki
[6]: https://developer.cisco.com/meraki/api/get-network-events/
[7]: https://docs.datadoghq.com/ja/integrations/snmp/
[8]: https://documentation.meraki.com/zGeneral_Administration/Other_Topics/The_Cisco_Meraki_Dashboard_API
[9]: https://documentation.meraki.com/General_Administration/Other_Topics/Cisco_Meraki_Dashboard_API#Enable_API_access
[10]: https://docs.datadoghq.com/ja/help/
[11]: https://docs.datadoghq.com/ja/network_monitoring/devices/
[12]: https://www.datadoghq.com/blog/monitor-meraki/