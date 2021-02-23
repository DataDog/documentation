---
title: Datadog へのログの送信
kind: documentation
further_reading:
  - link: 'https://learn.datadoghq.com/enrol/index.php?id=15'
    tag: ラーニングセンター
    text: Datadog でのログ収集
  - link: /logs/log_collection/
    tag: ドキュメント
    text: ログの収集とインテグレーション
  - link: /getting_started/tagging/unified_service_tagging
    tag: Documentation
    text: 統合サービスタグ付けの構成方法を学ぶ
---
## 概要

Datadog ログ管理は、アプリケーションからログを収集するために使用されます。このページでは、ログを Datadog に取得する方法を説明します。はじめに、以下を確認してください。

1. [Datadog アカウント][1]を作成し、[Datadog ログ管理][2]を有効にします (まだ実行していない場合)。
2. 以下のコマンドを使用して [Vagrant Ubuntu 16.04 仮想マシン][3]を設定します。Vagrant の詳細については、[Getting Started][4] ページを参照してください。

    ```text
    vagrant init ubuntu/xenial64
    vagrant up
    vagrant ssh
    ```

確認したら、これ以降のセクションに従って以下の方法を学びます。

- [手動でログを送信する](#sending-logs-manually)
- [Agent を使用してファイルからログを送信する](#send-logs-from-a-file)

## 手動でのログの送信

手動でログを送信するには、Vagrant 仮想マシンで `telnet` コマンドと [Datadog API キー][5]を使用します。

ログは全文メッセージにすることができます。

セキュア TCP エンドポイントはポートが `{{< region-param key="tcp_endpoint_port_ssl" >}}` の telnet intake.logs.datadoghq.com (または非セキュア接続の場合はポート {{< region-param key="tcp_endpoint_port" code="true" >}}) です 。

```
telnet intake.logs.datadoghq.com 10516

<DATADOG_API_KEY> TCP 経由で送信されるプレーンテキストログ
```

これにより、[Log Explorer ページ][2]には以下の結果が生成されます。

{{< img src="getting_started/logs/plain_text_log.png" alt="カスタム Telnet" >}}

あるいは、Datadog によって自動的に解析される以下の JSON オブジェクトが生成されます。

{{< site-region region="us" >}}

```text
telnet intake.logs.datadoghq.com 10516

<DATADOG_API_キー> {"message":"TCP 経由で直接送信される JSON 形式ログ", "ddtags":"env:dev", "ddsource":"terminal", "hostname":"gs-hostame", "service":"user"}
```

{{< /site-region >}}

{{< site-region region="eu" >}}

```text
telnet tcp-intake.logs.datadoghq.eu 1883

<DATADOG_API_キー> {"message":"TCP 経由で直接送信される JSON 形式ログ", "ddtags":"env:dev", "ddsource":"terminal", "hostname":"gs-hostame", "service":"user"}
```

{{< /site-region >}}

これにより、[Log Explorer ページ][2]には以下の結果が生成されます。

{{< img src="getting_started/logs/json_log.png" alt="JSON ログ" >}}

## ファイルからのログの送信

### Agent のインストール

Vagrant ホストに Datadog Agent をインストールするには、[Datadog API キー][5]で更新した [1 行のインストールコマンド][6]を使用します。

{{< site-region region="us" >}}

```text
DD_API_KEY=<DATADOG_API_KEY>  bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script.sh)"
```

{{< /site-region >}}

{{< site-region region="eu" >}}

```text
DD_API_KEY=<DATADOG_API_KEY> DD_SITE="datadoghq.eu" bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script.sh)"
```

{{< /site-region >}}

#### 検証

[ステータスコマンド][7] `sudo datadog-agent status` を使用して、Agent が実行されていることを確認します。まだログ収集を有効にしていないので、以下のように表示されるはずです。

```text
==========
Logs Agent
==========

  Logs Agent is not running
```

**注**: 数分経過したら、Datadog で [Infrastructure List][8] をチェックして、Agent がアカウントに接続されていることを確認できます。

### ログ収集の有効化

Agent によるログ収集を有効にするには、`/etc/datadog-agent/datadog.yaml` にある `datadog.yaml` [構成ファイル][9]を編集し、`logs_enabled:true` と設定します。

```yaml
## @param logs_enabled - boolean - optional - default: false
## logs_enabled を true に設定して Datadog Agent ログ収集を有効化する。
#
logs_enabled: true
```

### カスタムファイルの監視

#### ログファイルの作成

カスタムファイルからログを収集するには、まずファイルを作成し、それに 1 行のログを追加します。

```shell
$ touch log_file_to_monitor.log

$ echo "ログの最初の行" >> log_file_to_monitor.log
```

#### Agent の構成

Agent がこのログファイルを監視するように指定するには、以下のようにします。

1. [Agent の構成ディレクトリ][10]内に新しい構成フォルダーを作成します。

    ```shell
    sudo mkdir /etc/datadog-agent/conf.d/custom_log_collection.d/
    ```

2. この新しい構成フォルダー内に構成ファイルを作成します。

    ```shell
    sudo touch /etc/datadog-agent/conf.d/custom_log_collection.d/conf.yaml
    ```

3. 以下の内容をコピーして、この `conf.yaml` ファイル内に貼り付けます。

    ```yaml
    logs:
        - type: file
          path: /home/ubuntu/log_file_to_monitor.log
          source: custom
          service: user
    ```

4. 次のように入力して Agent を再起動します。`sudo service datadog-agent restart`

##### 検証

ログ構成が正しければ、[ステータスコマンド][7] `sudo datadog-agent status` によって以下のように出力されます。

```text
==========
Logs Agent
==========
    LogsProcessed: 0
    LogsSent: 0

  custom_log_collection
  ---------------------
    Type: file
    Path: /home/ubuntu/log_file_to_monitor.log
    Status: OK
    Inputs: /home/ubuntu/log_file_to_monitor.log
```

### ファイルへの新しいログの追加

すべて適切に構成されたので、新しいエントリをログファイルに追加して、Datadog で確認します。

```shell
$ echo "ログファイルのログの新しい行" >> log_file_to_monitor.log
```

これにより、[Log Explorer ページ][2]には以下の結果が生成されます。

{{< img src="getting_started/logs/file_log_example.png" alt="ファイルログ例" >}}

**注**: Datadog Agent を使用している場合、256KB 以上のログイベントは複数のエントリに分割されます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com
[2]: https://app.datadoghq.com/logs
[3]: https://app.vagrantup.com/ubuntu/boxes/xenial64
[4]: https://www.vagrantup.com/intro/getting-started
[5]: https://app.datadoghq.com/account/settings#api
[6]: https://app.datadoghq.com/account/settings#agent/ubuntu
[7]: /ja/agent/guide/agent-commands/#agent-information
[8]: https://app.datadoghq.com/infrastructure
[9]: /ja/agent/guide/agent-configuration-files/#agent-main-configuration-file
[10]: /ja/agent/guide/agent-configuration-files/#agent-configuration-directory