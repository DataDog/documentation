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
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/powerdns_recursor/README.md'
display_name: PowerDNS Recursor
git_integration_title: powerdns_recursor
guid: ae533b67-a2af-45ce-8e23-235acb3a3893
integration_id: powerdns
integration_title: Power DNS Recursor
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: powerdns.
metric_to_check: powerdns.recursor.questions
name: powerdns_recursor
process_signatures:
  - pdns_server
  - systemctl start pdns@
public_title: Datadog-Power DNS Recursor インテグレーション
short_description: PowerDNS Recursor の異常な送受信トラフィックを常に監視
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

PowerDNS Recursor のパフォーマンスを追跡し、異常または気掛かりなトラフィックを監視します。この Agent チェックは、Recursor から以下のような豊富なメトリクスを収集します。

* クエリ回答時間 - 1ms 未満、10ms 未満、100ms 未満、1s 未満、および 1s 以上の時間がかかった応答の数を確認します。
* クエリタイムアウト
* キャッシュヒット数とキャッシュミス数
* 回答のタイプごとの割合 - SRVFAIL、NXDOMAIN、NOERROR
* 無視および削除されたパケット数

その他にも多数あります。

## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][1]のガイドを参照してこの手順を行ってください。

### インストール

PowerDNS Recursor チェックは [Datadog Agent][2] パッケージに含まれています。Recursor に追加でインストールする必要はありません。

### コンフィグレーション
#### PowerDNS の準備

このチェックは、pdns_recursor の統計 API からパフォーマンス統計を収集します。4.1 より前のバージョンの pdns_recursor は、デフォルトで統計 API が有効ではありません。古いバージョンを実行している場合は、Recursor 構成ファイル (たとえば `/etc/powerdns/recursor.conf`) に次の行を追加して有効にしてください。

   ```
   webserver=yes
   api-key=changeme             # バージョン 4.0 以降でのみ使用可能
   webserver-readonly=yes       # デフォルトは no
   #webserver-port=8081         # デフォルトは 8082
   #webserver-address=0.0.0.0   # デフォルトは 127.0.0.1
   ```

pdns_recursor 3.x を実行している場合は、これらのオプション名の前に `experimental-` を付けてください。たとえば、`experimental-webserver=yes` とします。

pdns_recursor 4.1 以上を実行している場合は、`api-key` のみを設定します。

Recursor を再起動すると、統計 API が有効になります。

#### Agent の接続

1. [Agent の構成ディレクトリ][3]のルートにある `conf.d/` フォルダーの `powerdns_recursor.d/conf.yaml` ファイルを編集します。
    使用可能なすべての構成オプションの詳細については、[サンプル powerdns_recursor.d/conf.yaml][4] を参照してください。

    ```yaml
        init_config:

        instances:
        - host: 127.0.0.1
            port: 8082
            api_key: changeme
            version: 4 # omit this line if you're running pdns_recursor version 3.x
    ```

2. [Agent を再起動][5]すると、Datadog への PowerDNS Recursor メトリクスの送信が開始されます。

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

[1]: https://docs.datadoghq.com/ja/agent/autodiscovery/integrations
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[4]: https://github.com/DataDog/integrations-core/blob/master/powerdns_recursor/datadog_checks/powerdns_recursor/data/conf.yaml.example
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/powerdns_recursor/metadata.csv
[8]: https://docs.datadoghq.com/ja/help


{{< get-dependencies >}}