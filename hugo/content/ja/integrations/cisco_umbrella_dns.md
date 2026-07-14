---
app_id: cisco-umbrella-dns
app_uuid: 9f98de10-9c98-4601-ae36-cbe25c4be018
assets:
  dashboards:
    Cisco Umbrella DNS - DNS Traffic: assets/dashboards/cisco_umbrella_dns_dns_traffic.json
    Cisco Umbrella DNS - Proxied Traffic: assets/dashboards/cisco_umbrella_dns_proxied_traffic.json
  integration:
    auto_install: false
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10441
    source_type_name: cisco_umbrella_dns
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- ログの収集
- ネットワーク
- security
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/cisco_umbrella_dns/README.md
display_on_public_website: true
draft: false
git_integration_title: cisco_umbrella_dns
integration_id: cisco-umbrella-dns
integration_title: Cisco Umbrella DNS
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: cisco_umbrella_dns
public_title: Cisco Umbrella DNS
short_description: Cisco Umbrella DNS のプロキシ化されたトラフィックと DNS トラフィックを可視化します。Cloud SIEM
  に接続します。
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Category::Network
  - Category::Security
  - Submitted Data Type::Logs
  - Offering::Integration
  configuration: README.md#Setup
  description: Cisco Umbrella DNS のプロキシ化されたトラフィックと DNS トラフィックを可視化します。Cloud SIEM に接続します。
  media:
  - caption: Cisco Umbrella DNS - DNS トラフィック
    image_url: images/cisco_umbrella_dns_dns_traffic.png
    media_type: image
  - caption: Cisco Umbrella DNS - プロキシ化トラフィック
    image_url: images/cisco_umbrella_dns_proxied_traffic.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Cisco Umbrella DNS
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

[Cisco Umbrella][1] はネットワーク DNS セキュリティ監視のリーディングプラットフォームです。Umbrella の DNS レイヤーセキュリティは、ネットワーク内外を問わずユーザーの可視性と保護を強化する、迅速で容易な方法を提供します。あらゆるポートやプロトコル経由の脅威をネットワークやエンドポイントに到達する前に阻止することで、Umbrella の DNS レイヤーセキュリティは 1 億人以上のユーザーに対して最も安全で信頼性が高く、かつ高速なインターネット環境を提供することを目指しています。

Cisco Umbrella DNS インテグレーションは DNS とプロキシのログを収集し、Datadog に送信します。標準のログパイプラインを使用することで、これらのログは解析・強化され、容易に検索や分析が可能になります。このインテグレーションには、合計 DNS リクエスト、許可/ブロックされたドメイン、ブロックされたカテゴリのトップ、時間ごとのプロキシトラフィックなどを可視化する複数のダッシュボードが含まれます。Datadog Cloud SIEM を利用している場合、Umbrella DNS ログは脅威インテリジェンスによって解析され、一般的な攻撃者の宛先と一致がないかチェックされます。また、DNS ログは他のソースからのログを補完する形で、脅威ハンティングや調査時にも有用です。

## セットアップ

### 構成

#### Cisco Umbrella DNS の設定

1. [**Umbrella**][2] にログインします。
2. 左側のパネルから **Admin** を選択します。
3. **API Keys** を選択します。
4. 新しい API Key を作成します。
5. 作成した API Key に `reports.aggregations:read` と `reports.granularEvents:read` のスコープを適用します。
6. 次の設定手順で使用するため、API Key と Key Secret をコピーします。

#### Cisco Umbrella DNS と Datadog のインテグレーション設定

Datadog のエンドポイントを設定し、Cisco Umbrella DNS のイベントをログとして Datadog に転送します。

1. `Cisco Umbrella DNS` に移動します。
2. Cisco Umbrella DNS のクレデンシャルを追加します。

| Cisco Umbrella DNS パラメーター | 説明                                                                |
| ----------------------------- | -------------------------------------------------------------------------- |
| API Key                       | Cisco Umbrella で取得した API Key です。                                           |
| Key Secret                    | Cisco Umbrella で取得した Key Secret です。                                        |

## 収集データ

### Logs

このインテグレーションは、Cisco Umbrella DNS および Proxy のログを収集し、Datadog に転送します。

### メトリクス

Cisco Umbrella DNS インテグレーションにはメトリクスは含まれていません。

### イベント

Cisco Umbrella DNS インテグレーションにはイベントは含まれていません。

## サポート

追加のサポートが必要な場合は、[Datadog サポート][3]にお問い合わせください。

[1]: https://umbrella.cisco.com/
[2]: https://login.umbrella.com/
[3]: https://docs.datadoghq.com/ja/help/