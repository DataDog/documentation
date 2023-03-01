---
app_id: ping
app_uuid: 841c9313-628f-4861-ad0b-2d12c37ee571
assets:
  integration:
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: network.ping.response_time
      metadata_path: metadata.csv
      prefix: ネットワーク。
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: Ping
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: コミュニティ
  sales_email: jim.stanton@datadoghq.com
  support_email: jim.stanton@datadoghq.com
categories:
- network
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/ping/README.md
display_on_public_website: true
draft: false
git_integration_title: ping
integration_id: ping
integration_title: Ping
integration_version: 1.0.2
is_public: true
kind: インテグレーション
manifest_version: 2.0.0
name: ping
oauth: {}
public_title: Ping
short_description: リモートホストへの接続を監視
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::Network
  configuration: README.md#Setup
  description: リモートホストへの接続を監視
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Ping
---



## 概要

このチェックでは、システムの [ping][1] コマンドを使用して、ホストの到達可能性をテストします。
また、オプションで、チェックから宛先ホストに送信されるメッセージの往復時間を測定します。

Ping は、インターネット制御メッセージプロトコル（ICMP）エコー要求パケットをターゲットホストに送信し、ICMP エコー応答を待機することで動作します。

ICMP パケットの作成には raw ソケットが必要であるため、このチェックでは ICMP エコー要求自体を生成するのではなく、システムの ping コマンドを使用します。raw ソケットの作成には Agent にないルート権限が必要です。ping コマンドは、`setuid` アクセスフラグを使用して昇格した権限で実行し、この問題を回避します。

**Windows をお使いの方への注意事項**: インストールされている Windows の言語が英語に設定されていない場合、このチェックが正しく行われないことがあります。

## セットアップ

Ping チェックは [Datadog Agent][2] パッケージに含まれていないため、お客様自身でインストールする必要があります。

### APM に Datadog Agent を構成する

Agent v7.21 / v6.21 以降の場合は、下記の手順に従い Ping チェックをホストにインストールします。Docker Agent または 上記バージョン以前の Agent でインストールする場合は、[コミュニティインテグレーションの使用][3]をご参照ください。

1. 以下のコマンドを実行して、Agent インテグレーションをインストールします。

   ```shell
   # Linux
   datadog-agent integration install -t datadog-ping==<INTEGRATION_VERSION>

   # Windows
   agent.exe integration install -t datadog-ping==<INTEGRATION_VERSION>
   ```
2. お使いの OS に合わせて、`ping` バイナリをインストールします。例えば、Ubuntu の場合、以下のコマンドを実行します。
   ```shell
   apt-get install iputils-ping
   ```

3. コアの[インテグレーション][4]と同様にインテグレーションを構成します。

### コンフィギュレーション

1. ping のパフォーマンスデータの収集を開始するには、Agent のコンフィギュレーションディレクトリのルートにある `conf.d/` フォルダーの `ping.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル ping.d/conf.yaml][5] を参照してください。

2. [Agent を再起動します][6]。

### 検証

[Agent の status サブコマンド][7]を実行し、Checks セクションで `ping` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "ping" >}}


### イベント

Ping チェックには、イベントは含まれません。

### サービスのチェック
{{< get-service-checks-from-git "ping" >}}


## トラブルシューティング

### `SubprocessOutputEmptyError: get_subprocess_output expected output but had none` エラー
Ping インテグレーションを実行中に、以下のようなエラーが表示されることがあります。

```
      Traceback (most recent call last):
        File "/opt/datadog-agent/embedded/lib/python3.8/site-packages/datadog_checks/base/checks/base.py", line 1006, in run
          self.check(instance)
        File "/opt/datadog-agent/embedded/lib/python3.8/site-packages/datadog_checks/ping/ping.py", line 65, in check
          lines = self._exec_ping(timeout, host)
        File "/opt/datadog-agent/embedded/lib/python3.8/site-packages/datadog_checks/ping/ping.py", line 48, in _exec_ping
          lines, err, retcode = get_subprocess_output(
        File "/opt/datadog-agent/embedded/lib/python3.8/site-packages/datadog_checks/base/utils/subprocess_output.py", line 56, in get_subprocess_output
          out, err, returncode = subprocess_output(cmd_args, raise_on_empty_output, env=env)
      _util.SubprocessOutputEmptyError: get_subprocess_output expected output but had none.
```

Ping インテグレーションは Agent にデフォルトで含まれていないため、`ping` バイナリも Agent に含まれていません。インテグレーションを正常に実行するためには、自分で `ping` バイナリをインストールする必要があります。


ご不明な点は、[Datadog のサポートチーム][10]までお問合せください。


[1]: https://en.wikipedia.org/wiki/Ping_%28networking_utility%29
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/ja/agent/guide/use-community-integrations/
[4]: https://docs.datadoghq.com/ja/getting_started/integrations/
[5]: https://github.com/DataDog/integrations-extras/blob/master/ping/datadog_checks/ping/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#service-status
[8]: https://github.com/DataDog/integrations-extras/blob/master/ping/metadata.csv
[9]: https://github.com/DataDog/integrations-extras/blob/master/ping/assets/service_checks.json
[10]: https://docs.datadoghq.com/ja/help/