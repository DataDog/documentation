---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards: {}
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
- ネットワーク
- モニタリング
creates_events: false
ddtype: check
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/zabbix/README.md
display_name: Zabbix
draft: false
git_integration_title: zabbix
guid: bf1fa08e-3df3-40b7-ab1d-1ba685c3057d
integration_id: zabbix
integration_title: zabbix
integration_version: 1.1.0
is_public: true
kind: integration
maintainer: KosukeKamiya@users.noreply.github.com
manifest_version: 1.0.0
metric_prefix: zabbix.
metric_to_check: zabbix.system.uptime
name: zabbix
public_title: zabbix
short_description: Zabbix API によりアイテムの履歴を収集し、メトリクスとして Datadog にレポート。
support: contrib
supported_os:
- linux
- mac_os
- windows
---



## 概要

Zabbix に接続して

- Datadog Agent を介して [Zabbix][1] を監視します。
- Zabbix アラートを Datadog に送信して、アラートを Datadog イベントストリームのイベントとして表示します。

## セットアップ

Zabbix チェックは [Datadog Agent][2] パッケージに含まれていないため、お客様自身でインストールする必要があります。

### インストール

Agent v7.21 / v6.21 以降の場合は、下記の手順に従い Zabbix チェックをホストにインストールします。Docker Agent または 上記バージョン以前の Agent でインストールする場合は、[コミュニティインテグレーションの使用][3]をご参照ください。

1. 以下のコマンドを実行して、Agent インテグレーションをインストールします。

   ```shell
   datadog-agent integration install -t datadog-zabbix==<INTEGRATION_VERSION>
   ```

2. コアの[インテグレーション][4]と同様にインテグレーションを構成します。

### コンフィギュレーション

1. Zabbix サーバーのタイムゾーンが UTC に設定されていることを確認してください。Zabbix のタイムゾーンの詳細については、[Zabbix ドキュメント][5]を参照してください。

2. Zabbix のパフォーマンスデータを収集するには、Agent のコンフィギュレーションディレクトリのルートにある `conf.d/` フォルダーの `zabbix.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル zabbix.d/conf.yaml][6] を参照してください。

3. [Agent を再起動します][7]。

#### イベント収集

##### Datadog メディアタイプを作成する

1. *Administration > Media Types > Create Media Type* に移動します。
2. Zabbix テンプレート変数を使用して、Webhook にパラメータを追加します。Datadog の api_key と以下の Zabbix テンプレート変数をパラメータとして追加します。

| パラメーター            | 値                                |
| -------------------- | ------------------------------------ |
| `api_key`            | `Your Datadog API key`               |
| `event_date`         | `{EVENT.DATE}`                       |
| `event_name`         | `{EVENT.NAME}`                       |
| `event_nseverity`    | `{EVENT.NSEVERITY}`                  |
| `event_tags`         | `{EVENT.TAGSJSON}`                   |
| `event_time`         | `{EVENT.TIME}`                       |
| `event_value`        | `{EVENT.VALUE}`                      |
| `item_name`          | `{ITEM.NAME}`                        |
| `alert_message`      | `{ALERT.MESSAGE}`                    |
| `alert_subject`      | `{ALERT.SUBJECT}`                    |


3. **Name** を `Datadog` に、**Type** を `Webhook` に設定し、次のコードを **Script** として入力します。
``` 
    try {
        Zabbix.Log(4, '[datadog webhook] received value=' + value);

        var params = JSON.parse(value);
        var req = new CurlHttpRequest();
        req.AddHeader('Content-Type: application/json');
        var webhook_url = 'https://app.datadoghq.com/intake/webhook/zabbix?api_key=' + params.api_key;
        var webhook_data = value;
        var resp = req.Post(webhook_url, webhook_data);
        if (req.Status() != 202) {
            throw 'Response code: '+req.Status();
        }
        Zabbix.Log(4, '[datadog webhook] received response with status code ' + req.Status() + '\n' + resp);
    } catch (error) {
        Zabbix.Log(4, '[datadog webhook] event creation failed json : ' + webhook_data)
        Zabbix.Log(4, '[datadog webhook] event creation failed : ' + error);
    }
    return JSON.stringify({});

```
4. "Test" ボタンを使用して、Webhook が正しく設定されていることを確認します。

##### Webhook メディアを既存のユーザーに割り当てます

1. Webhook メディアタイプを設定した後、*Administration > Users* に移動し、Webhook を表す専用の Zabbix ユーザーを作成します。たとえば、Datadog Webhook のエイリアス `Datadog` を使用します。このユーザーは Zabbix にログインしないため、メディアを除くすべての設定をデフォルトのままにしておくことができます。
2. ユーザープロファイルで、**Media** タブに移動し、必要な連絡先情報を含む Webhook を追加します。Webhook が送信先フィールドを使用しない場合は、サポートされている文字の任意の組み合わせを入力して、検証要件をバイパスします。
3. このユーザーに、アラートを送信する必要があるすべてのホストに少なくとも読み取りアクセス許可を付与します。

##### Webhook のアラートアクションを構成します

1. *Configuration > Actions* に移動します。
2. ページタイトルのドロップダウンから、必要なアクションタイプを選択します。
3. **Create Action** をクリックします。
4. アクションに名前を付けます。
5. 操作を実行する条件を選択します。
6. 実行する操作を選択します。

### 検証

[Agent のステータスサブコマンド][8]を実行し、Checks セクションで `zabbix` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "zabbix" >}}


### イベント

Zabbix アラートは Datadog イベントストリームのイベントとして収集されます。

### サービスのチェック
{{< get-service-checks-from-git "zabbix" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][11]までお問合せください。


[1]: https://www.zabbix.com/
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/ja/agent/guide/use-community-integrations/
[4]: https://docs.datadoghq.com/ja/getting_started/integrations/
[5]: https://www.zabbix.com/documentation/current/en/manual/web_interface/time_zone
[6]: https://github.com/DataDog/integrations-extras/blob/master/zabbix/datadog_checks/zabbix/data/conf.yaml.example
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[8]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[9]: https://github.com/DataDog/integrations-extras/blob/master/zabbix/metadata.csv
[10]: https://github.com/DataDog/integrations-extras/blob/master/zabbix/assets/service_checks.json
[11]: https://docs.datadoghq.com/ja/help/