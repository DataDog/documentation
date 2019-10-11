---
title: macOS 用 Agent の基本的な使用方法
kind: documentation
platform: OS X
os: osx
aliases:
  - /ja/guides/basic_agent_usage/osx/
further_reading:
  - link: logs/
    tag: Documentation
    text: ログの収集
  - link: graphing/infrastructure/process
    tag: Documentation
    text: プロセスの収集
  - link: tracing
    tag: Documentation
    text: トレースの収集
---
## 概要

このページでは、macOS 用 Datadog Agent の基本的な機能について説明します。Agent をまだインストールしていない場合は、[Datadog Agent インテグレーションに関するドキュメント][1]で手順を参照してください。

他の Agent と異なり、macOS 用 Datadog Agent には、すぐに使用できる Agent トレース機能が含まれていません。この機能は、[Datadog の Github Agent リポジトリにある手順][2]に従って個別にインストールできます。

デフォルトでは、Agent は `/opt/datadog-agent` にあるサンドボックスにインストールされます。このフォルダーは任意の場所に移動できますが、ここでは、デフォルトのインストール場所を前提として説明します。

**注**: Agent v6 では macOS 10.12 以降が、Agent v5 では macOS 10.10 以降がサポートされます。

## コマンド

Agent v6 では、オペレーティングシステムから提供される `launchctl` サービスマネージャーが Agent のライフサイクルを担う一方で、他のコマンドは Agent バイナリから直接実行する必要があります。別の方法として、ライフサイクルコマンドを systray アプリで管理し、他のコマンドは Web GUI から実行することもできます。

{{< tabs >}}
{{% tab "Agent v6" %}}

| 説明                        | コマンド                                              |
| ---------------------------------- | --------------------------------------               |
| Agent をサービスとして起動           | `launchctl start com.datadoghq.agent` または systray アプリ |
| サービスとして実行中の Agent の停止    | `launchctl stop com.datadoghq.agent` または systray アプリ  |
| サービスとして実行中の Agent の再起動 | **run `stop` then `start`** または systray アプリ             |
| Agent サービスのステータス            | `launchctl list com.datadoghq.agent` または systray アプリ  |
| 実行中の Agent のステータスページ       | `datadog-agent status` または Web GUI                    |
| フレアの送信                         | `datadog-agent flare` または Web GUI                     |
| コマンドの使用方法の表示              | `datadog-agent --help`                               |
| チェックの実行                        | `datadog-agent check <check_name>`                   |


{{% /tab %}}
{{% tab "Agent v5" %}}

| 説明                        | コマンド                            |
| ---------------------------------- | ---------------------------------- |
| Agent をサービスとして起動           | `datadog-agent start`              |
| サービスとして実行中の Agent の停止    | `datadog-agent stop`               |
| サービスとして実行中の Agent の再起動 | `datadog-agent restart`            |
| Agent サービスのステータス            | `datadog-agent status`             |
| 実行中の Agent のステータスページ       | `datadog-agent info`               |
| フレアの送信                         | `datadog-agent flare`              |
| コマンドの使用方法の表示              | _not implemented_                  |
| チェックの実行                        | `datadog-agent check <check_name>` |

{{% /tab %}}
{{< /tabs >}}

## コンフィグレーション

{{< tabs >}}
{{% tab "Agent v6" %}}
Agent の構成ファイルおよびフォルダーの場所

* `~/.datadog-agent/datadog.yaml`

[インテグレーション][1]用構成ファイルの場所

* `~/.datadog-agent/conf.d/`


[1]: /ja/integrations
{{% /tab %}}
{{% tab "Agent v5" %}}

Agent の構成ファイルおよびフォルダーの場所

* `~/.datadog-agent/datadog.conf`

[インテグレーション][1]用構成ファイルの場所

* `~/.datadog-agent/conf.d/`


[1]: /ja/integrations
{{% /tab %}}
{{< /tabs >}}

## トラブルシューティング

[Agent のトラブルシューティングドキュメントは、こちらを参照してください][3]。

## 埋め込み Agent の使用

Agent には、埋め込み Python 環境が `/opt/datadog-agent/embedded/` に含まれています。`python`、`pip` などの共通バイナリは `/opt/datadog-agent/embedded/bin/` に含まれています。

詳細については、[埋め込み Agent へのパッケージの追加方法][4]の手順を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings#agent/mac
[2]: https://github.com/DataDog/datadog-agent/blob/master/docs/trace-agent/README.md#run-on-macos
[3]: /ja/agent/troubleshooting
[4]: /ja/developers/guide/custom-python-package