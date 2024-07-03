---
algolia:
  tags:
  - uninstall
  - uninstalling
aliases:
- /ja/guides/basic_agent_usage/source/
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
platform: ソース
title: Basic Agent Usage for Source Installation
---
## 概要

このページでは、Datadog Agent の基本的な機能について説明します。Agent をまだインストールしていない場合は、[Datadog Agent インテグレーションのページ][1]で手順を参照してください。

デフォルトでは、Agent は `~/.datadog-agent` にある独自のサンドボックスにインストールされます。このフォルダーは、任意の場所に移動できます。ただし、ここでは、Agent がデフォルトの場所にインストールされていることを前提としているため、場所を移動した場合は、それに応じて手順を変更してください。

## コマンド

Datadog Agent に含まれるコマンドのうち、`start`/`stop`/`restart`/`status` などの_ライフサイクルコマンド_だけは `sudo` で実行する必要があります。

{{< tabs >}}
{{% tab "Agent v6 & v7" %}}

| 説明                   | コマンド                                 |
| ----------------------------- | --------------------------------------- |
| Agent の起動                   | `sudo ./bin/agent/agent start`          |
| Agent の停止                    | `sudo ./bin/agent/agent stop`          |
| 実行中の Agent のステータスページ  | `sudo ./bin/agent/agent info`          |
| フレアの送信                    | `sudo ./bin/agent/agent flare`         |
| コマンドの使用方法の表示         | `sudo ./bin/agent/agent help`          |

{{% /tab %}}
{{% tab "Agent v5" %}}

| 説明                   | コマンド                                 |
| ----------------------------- | --------------------------------------- |
| Agent の起動                   | `sudo ~/.datadog-agent/bin/agent start` |
| Agent の停止                    | `sudo ~/.datadog-agent/bin/agent stop`  |
| 実行中の Agent のステータスページ  | `sudo ~/.datadog-agent/bin/agent info`  |
| フレアの送信                    | `sudo ~/.datadog-agent/bin/agent flare` |
| コマンドの使用方法の表示         | `sudo ~/.datadog-agent/bin/agent help`  |

{{% /tab %}}
{{< /tabs >}}

## 構成

{{< tabs >}}
{{% tab "Agent v6 & v7" %}}
Agent の構成ファイルおよびフォルダーの場所:

* `/etc/datadog-agent/datadog.yaml`

[インテグレーション][1]用構成ファイルの場所

* `/etc/datadog-agent/conf.d/`

[1]: /ja/integrations/
{{% /tab %}}
{{% tab "Agent v5" %}}

Agent の構成ファイルおよびフォルダーの場所

* `/etc/dd-agent/datadog.conf`

[インテグレーション][1]用構成ファイルの場所

* `/etc/dd-agent/conf.d/`

[1]: /ja/integrations/
{{% /tab %}}
{{< /tabs >}}

## トラブルシューティング

[Agent のトラブルシューティングに関するドキュメント][2]を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=source
[2]: /ja/agent/troubleshooting/