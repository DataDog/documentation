---
app_id: tls
app_uuid: 347d6721-fe59-4215-a4f6-415feb4dda0c
assets:
  dashboards:
    TLS Overview: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: tls.seconds_left
      metadata_path: metadata.csv
      prefix: tls.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10058
    source_type_name: TLS
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- developer tools
- ネットワーク
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/tls/README.md
display_on_public_website: true
draft: false
git_integration_title: tls
integration_id: tls
integration_title: TLS
integration_version: 2.16.1
is_public: true
kind: インテグレーション
manifest_version: 2.0.0
name: tls
public_title: TLS
short_description: プロトコルバージョン、証明書の有効期限と有効性などについて TLS を監視します。
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Developer Tools
  - Category::Network
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: プロトコルバージョン、証明書の有効期限と有効性などについて TLS を監視します。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: TLS
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

このチェックは、[TLS][1] プロトコルバージョン、証明書の有効期限と有効性などを監視します。

**注**:

1. TCP のみがサポートされています。
2. リーフ/エンドユーザー証明書のみが検証されます (中間証明書およびルート証明書は検証されません)。

## 計画と使用

### インフラストラクチャーリスト

TLS チェックは [Datadog Agent][2] パッケージに含まれています。
サーバーに追加でインストールする必要はありません。

### ブラウザトラブルシューティング

{{< tabs >}}
{{% tab "ホスト" %}}

#### メトリクスベース SLO

ホストで実行中の Agent に対してこのチェックを構成するには

1. TLS データの収集を開始するには、Agent のコンフィギュレーションディレクトリのルートにある `conf.d/` フォルダーの `tls.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションの詳細については、[サンプル tls.d/conf.yaml][1] を参照してください。

2. [Agent を再起動します][2]。

[1]: https://github.com/DataDog/integrations-core/blob/master/tls/datadog_checks/tls/data/conf.yaml.example
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "コンテナ化" %}}

#### コンテナ化

コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][1]のガイドを参照して、次のパラメーターを適用してください。

| パラメーター            | 値                                  |
| -------------------- | -------------------------------------- |
| `<INTEGRATION_NAME>` | `tls`                                  |
| `<INIT_CONFIG>`      | 空白または `{}`                          |
| `<INSTANCE_CONFIG>`  | `{"server": "%%host%%", "port":"443"}` |

**注**: よく知られた信頼できる CA からのものではない内部証明書を使用している場合、特定のメトリクスが Datadog にレポートされない場合があります。インテグレーションテンプレートで `tls_verify: false` を使用して、このインスタンスのすべてのメトリクスをレポートします。

[1]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
{{% /tab %}}
{{< /tabs >}}

### 検証

[Agent の status サブコマンドを実行][3]し、Checks セクションで `tls` を探します。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "tls" >}}


### ヘルプ

TLS には、イベントは含まれません。

### ヘルプ
{{< get-service-checks-from-git "tls" >}}


## ヘルプ

ご不明な点は、[Datadog のサポートチーム][4]までお問合せください。



[1]: https://en.wikipedia.org/wiki/Transport_Layer_Security
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.datadoghq.com/ja/help/