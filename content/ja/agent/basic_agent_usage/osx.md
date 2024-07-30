---
aliases:
- /ja/guides/basic_agent_usage/osx/
further_reading:
- link: /logs/
  tag: Documentation
  text: ログの収集
- link: /infrastructure/process/
  tag: Documentation
  text: プロセスの収集
- link: /tracing/
  tag: Documentation
  text: トレースの収集
- link: /agent/basic_agent_usage/#agent-architecture
  tag: Documentation
  text: Agent のアーキテクチャを詳しく見る
- link: /agent/configuration/network#configure-ports
  tag: Documentation
  text: インバウンドポートの構成
os: osx
platform: OS X
title: macOS 用 Agent の基本的な使用方法
---

## 概要

このページでは、macOS 用 Datadog Agent の基本的な機能について説明します。Agent をまだインストールしていない場合は、[Datadog Agent インテグレーションに関するドキュメント][1]で手順を参照してください。

デフォルトでは、Agent は `/opt/datadog-agent` にあるサンドボックスにインストールされます。このフォルダーは任意の場所に移動できますが、ここでは、デフォルトのインストール場所を前提として説明します。

## サポートされている macOS バージョン

| macOS バージョン       | サポートされている Agent バージョン                                            |
|---------------------|---------------------------------------------------------------------|
| macOS 10.10 & 10.11 | Agent v5                                                            |
| macOS 10.12         | Agent v5、Agent v6 (v6.34.0 まで)、Agent v7 (v7.34.0 まで)            |
| macOS 10.13         | Agent v5、Agent v6 (v6.38.2 まで)、Agent v7 (v7.38.2 まで)            |
| macOS 10.14+        | Agent v5、Agent v6、Agent v7                                        |

## コマンド

Agent v6 および v7 では、オペレーティングシステムから提供される `launchctl` サービスマネージャーが Agent のライフサイクルを担う一方で、他のコマンドは Agent バイナリから直接実行する必要があります。別の方法として、ライフサイクルコマンドを systray アプリで管理し、他のコマンドは Web GUI から実行することもできます。

{{< tabs >}}
{{% tab "Agent v6 & v7" %}}

| 説明                        | コマンド                                              |
|------------------------------------|------------------------------------------------------|
| Agent をサービスとして起動           | `launchctl start com.datadoghq.agent` または systray アプリ |
| サービスとして実行中の Agent の停止    | `launchctl stop com.datadoghq.agent` または systray アプリ  |
| サービスとして実行中の Agent の再起動 | **run `stop` then `start`** または systray アプリ             |
| Agent サービスのステータス            | `launchctl list com.datadoghq.agent` または systray アプリ  |
| 実行中の Agent のステータスページ       | `datadog-agent status` または Web GUI                    |
| フレアの送信                         | `datadog-agent flare` または Web GUI                     |
| コマンドの使用方法の表示              | `datadog-agent --help`                               |
| チェックの実行                        | `datadog-agent check <チェック名>`                   |

{{% /tab %}}
{{% tab "Agent v5" %}}

| 説明                        | コマンド                            |
|------------------------------------|------------------------------------|
| Agent をサービスとして起動           | `datadog-agent start`              |
| サービスとして実行中の Agent の停止    | `datadog-agent stop`               |
| サービスとして実行中の Agent の再起動 | `datadog-agent restart`            |
| Agent サービスのステータス            | `datadog-agent status`             |
| 実行中の Agent のステータスページ       | `datadog-agent info`               |
| フレアの送信                         | `datadog-agent flare`              |
| コマンドの使用方法の表示              | _not implemented_                  |
| チェックの実行                        | `datadog-agent check <チェック名>` |

{{% /tab %}}
{{< /tabs >}}

## コンフィギュレーション

{{< tabs >}}
{{% tab "Agent v6 & v7" %}}
Agent の構成ファイルおよびフォルダーの場所:

* `~/.datadog-agent/datadog.yaml`

[インテグレーション][1]用構成ファイルの場所

* `~/.datadog-agent/conf.d/`

[1]: /ja/integrations/
{{% /tab %}}
{{% tab "Agent v5" %}}

Agent の構成ファイルおよびフォルダーの場所

* `~/.datadog-agent/datadog.conf`

[インテグレーション][1]用構成ファイルの場所

* `~/.datadog-agent/conf.d/`

[1]: /ja/integrations/
{{% /tab %}}
{{< /tabs >}}

## Agent のアンインストール

{{< tabs >}}
{{% tab "Agent v6 と v7" %}}
**シングルユーザーインストール**

Agent とすべての Agent 構成ファイルを削除するには
1. トレイにある骨のアイコンで Datadog Agent を停止して閉じます。
2. Datadog アプリケーションをアプリケーションフォルダからゴミ箱にドラッグします。
3. 次のコマンドを実行します。
    ```shell
    sudo rm -rf /opt/datadog-agent
    sudo rm -rf /usr/local/bin/datadog-agent
    sudo rm -rf ~/.datadog-agent/** # to remove broken symlinks
    launchctl remove com.datadoghq.agent
    sudo rm -rf /var/log/datadog
    ```
4. マシンを再起動すると、変更が有効になります。

**システム全体の LaunchDaemon のインストール**

Agent とすべての Agent 構成ファイルを削除するには
1. Datadog アプリケーションをアプリケーションフォルダからゴミ箱にドラッグします。
2. 残りのファイルを削除するには、以下を実行します。
    ```shell
    sudo rm -rf /opt/datadog-agent
    sudo rm -rf /usr/local/bin/datadog-agent
    sudo rm -rf ~/.datadog-agent/** # to remove broken symlinks
    sudo launchctl disable system/com.datadoghq.agent && sudo launchctl bootout system/com.datadoghq.agent
    sudo rm /Library/LaunchDaemons/com.datadoghq.agent.plist
    sudo rm -rf /var/log/datadog
    ```
3. マシンを再起動すると、変更が有効になります。
{{% /tab %}}

{{% tab "Agent v5" %}}
1. トレイにある骨のアイコンで Datadog Agent を停止して閉じます。
2. Datadog アプリケーションをアプリケーションフォルダからゴミ箱にドラッグします。
3. 次を実行します。

```shell
sudo rm -rf /opt/datadog-agent
sudo rm -rf /usr/local/bin/datadog-agent
sudo rm -rf ~/.datadog-agent/** # 壊れたシンボリックリンクを削除するため
```

オプションのインストールコマンドを実行して、Agent を起動時に実行させた場合は、以下を実行してアンインストールを終了してください。

```shell
sudo launchctl unload -w /Library/LaunchDaemons/com.datadoghq.agent.plist
sudo rm /Library/LaunchDaemons/com.datadoghq.agent.plist
```

> この方法では、Agent とすべての Agent コンフィグレーションファイルが削除されます。
{{% /tab %}}
{{< /tabs >}}

## ヘルプ

[Agent のトラブルシューティングに関するドキュメント][2]を参照してください。

## 埋め込み Agent の使用

Agent には、埋め込み Python 環境が `/opt/datadog-agent/embedded/` に含まれています。`python`、`pip` などの共通バイナリは `/opt/datadog-agent/embedded/bin/` に含まれています。

詳細については、[埋め込み Agent へのパッケージの追加方法][3]の手順を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=macos
[2]: /ja/agent/troubleshooting/
[3]: /ja/developers/guide/custom-python-package/