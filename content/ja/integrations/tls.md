---
assets:
  dashboards:
    TLS Overview: assets/dashboards/overview.json
  logs: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - ネットワーク
  - web
  - オートディスカバリー
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/tls/README.md'
display_name: TLS
git_integration_title: tls
guid: 4e27a211-a034-42dd-9939-9ef967b1da50
integration_id: tls
integration_title: TLS
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: tls.
metric_to_check: tls.seconds_left
name: tls
public_title: Datadog-TLS インテグレーション
short_description: プロトコルバージョン、証明書の有効期限と有効性などについて TLS を監視します。
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

このチェックは、[TLS][1] プロトコルバージョン、証明書の有効期限と有効性などを監視します。

**注**:

1. TCP のみがサポートされています。
2. リーフ/エンドユーザー証明書のみが検証されます (中間証明書およびルート証明書は検証されません)。

## セットアップ

### インストール

TLS チェックは [Datadog Agent][2] パッケージに含まれています。
サーバーに追加でインストールする必要はありません。

### 構成

#### ホスト

ホストで実行中の Agent でこのチェックを構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[コンテナ化](#コンテナ化)セクションを参照してください。

1. TLS データの収集を開始するには、Agent の構成ディレクトリのルートにある `conf.d/` フォルダーの `tls.d/conf.yaml` ファイルを編集します。使用可能なすべての構成オプションの詳細については、[サンプル tls.d/conf.yaml][3] を参照してください。

2. [Agent を再起動します][4]。

#### コンテナ化

コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][5]のガイドを参照して、次のパラメーターを適用してください。

| パラメーター            | 値                                  |
| -------------------- | -------------------------------------- |
| `<インテグレーション名>` | `tls`                                  |
| `<初期コンフィギュレーション>`      | 空白または `{}`                          |
| `<インスタンスコンフィギュレーション>`  | `{"server": "%%host%%", "port":"443"}` |

### 検証

[Agent の status サブコマンドを実行][6]し、Checks セクションで `tls` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "tls" >}}


### イベント

TLS には、イベントは含まれません。

### サービスのチェック

このインテグレーションによって提供されるサービスチェックのリストについては、[service_checks.json][8] を参照してください。

- `tls.can_connect` - 監視対象のエンドポイントに Agent が接続できない場合は、`CRITICAL` を返します。それ以外の場合は、`OK` を返します。
- `tls.version` - 許可されていないプロトコルバージョンで接続が行われた場合は `CRITICAL` を返します。それ以外の場合は、`OK` を返します。
- `tls.cert_validation` - 証明書の形式が正しくない場合、またはサーバーのホスト名と一致しない場合は `CRITICAL` を返します。それ以外の場合は、`OK` を返します。
- `tls.cert_expiration` - 証明書の有効期限が切れているか、有効期限が `days_critical`/`seconds_critical` 未満の場合は `CRITICAL` を返し、有効期限が `days_warning`/`seconds_warning` 未満の場合は `WARNING` を返します。それ以外の場合は、`OK` を返します。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][9]までお問い合わせください。

[1]: https://en.wikipedia.org/wiki/Transport_Layer_Security
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://github.com/DataDog/integrations-core/blob/master/tls/datadog_checks/tls/data/conf.yaml.example
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/tls/metadata.csv
[8]: https://github.com/DataDog/integrations-core/blob/master/tls/assets/service_checks.json
[9]: https://docs.datadoghq.com/ja/help/