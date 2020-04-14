---
aliases:
  - /ja/integrations/powerdns
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - web
  - network
  - autodiscovery
creates_events: false
ddtype: チェック
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/powerdns_recursor/README.md'
display_name: PowerDNS Recursor
git_integration_title: powerdns_recursor
guid: ae533b67-a2af-45ce-8e23-235acb3a3893
integration_id: powerdns
integration_title: Power DNS Recursor
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: powerdns.
metric_to_check: powerdns.recursor.questions
name: powerdns_recursor
process_signatures:
  - pdns_server
  - systemctl start pdns@
public_title: Datadog-Power DNS Recursor インテグレーション
short_description: PowerDNS Recursor の異常な送受信トラフィックを常に監視。
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

PowerDNS Recursor のパフォーマンスを追跡し、異常または注意が必要なトラフィックを監視します。この Agent チェックでは、Recursor から以下のような多様なメトリクスを収集することができます。

- クエリ回答時間: 1 ミリ秒、10 ミリ秒、100 ミリ秒、1 秒未満、および 1 秒以上の時間がかかった応答の数を確認します。
- クエリのタイムアウト
- キャッシュヒット数およびミス数
- タイプごとの回答率: SRVFAIL、NXDOMAIN、NOERROR
- 無視および削除されたパケット数

その他にも多数あります。

## セットアップ

### インストール

PowerDNS Recursor チェックは [Datadog Agent][1] パッケージに含まれています。Recursor に追加でインストールする必要はありません。

### コンフィギュレーション

#### PowerDNS の準備

このチェックは、PowerDNS Recursor の統計 API からパフォーマンス統計を収集します。4.1 より前のバージョンの pdns_recursor は、デフォルトで統計 API が有効ではありません。古いバージョンを実行している場合は、Recursor 構成ファイル (たとえば `/etc/powerdns/recursor.conf`) に次の行を追加して有効にしてください。

```conf
webserver=yes
api-key=changeme             # only available since ver 4.0
webserver-readonly=yes       # default no
#webserver-port=8081         # default 8082
#webserver-address=0.0.0.0   # default 127.0.0.1
```

pdns_recursor 3.x を実行している場合は、これらのオプション名の前に `experimental-` を付けてください。たとえば、`experimental-webserver=yes` とします。

pdns_recursor 4.1 以上を実行している場合は、`api-key` のみを設定します。

Recursor を再起動すると、統計 API が有効になります。

#### ホスト

ホストで実行されている Agent 用にこのチェックを構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[コンテナ化](#containerized)セクションを参照してください。

1. [Agent のコンフィギュレーションディレクトリ][2]のルートにある `conf.d/` フォルダーの `powerdns_recursor.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル powerdns_recursor.d/conf.yaml][3] を参照してください。

   ```yaml
   init_config:

   instances:
     ## @param host - string - required
     ## Host running the recursor.
     #
     - host: 127.0.0.1

       ## @param port - integer - required
       ## Recursor web server port.
       #
       port: 8082

       ## @param api_key - string - required
       ## Recursor web server api key.
       #
       api_key: "<POWERDNS_API_KEY>"

       ## @param version - integer - required - default: 3
       ## Version 3 or 4 of PowerDNS Recursor to connect to.
       ## The PowerDNS Recursor in v4 has a production ready web server that allows for
       ## statistics gathering. In version 3.x the server was marked as experimental.
       ##
       ## As the server was marked as experimental in version 3 many of the metrics have
       ## changed names and the API structure (paths) have also changed. With these changes
       ## there has been a need to separate the two concerns. The check now has a key value
       ## version: which if set to version 4 queries with the correct API path on the
       ## non-experimental web server.
       ##
       ## https://doc.powerdns.com/md/httpapi/api_spec/#url-apiv1serversserver95idstatistics
       #
       version: 3
   ```

2. [Agent を再起動します][4]。

#### コンテナ化

コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][5]のガイドを参照して、次のパラメーターを適用してください。

| パラメーター            | 値                                                                            |
| -------------------- | -------------------------------------------------------------------------------- |
| `<INTEGRATION_NAME>` | `powerdns_recursor`                                                              |
| `<INIT_CONFIG>`      | 空白または `{}`                                                                    |
| `<INSTANCE_CONFIG>`  | `{"host":"%%host%%", "port":8082, "api_key":"<POWERDNS_API_KEY>", "version": 3}` |

### 検証

[Agent の `status` サブコマンドを実行][6]し、Checks セクションで `powerdns_recursor` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "powerdns_recursor" >}}


### イベント

PowerDNS Recursor チェックには、イベントは含まれません。

### サービスのチェック

**`powerdns.recursor.can_connect`**:

Agent が Recursor の統計 API に接続できない場合は、CRITICAL を返します。それ以外の場合は、OK を返します。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][8]までお問合せください。

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: https://github.com/DataDog/integrations-core/blob/master/powerdns_recursor/datadog_checks/powerdns_recursor/data/conf.yaml.example
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/ja/agent/autodiscovery/integrations/
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/powerdns_recursor/metadata.csv
[8]: https://docs.datadoghq.com/ja/help