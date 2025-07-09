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
title: Source Installation 用 Agent の基本的な使用方法
---
## 概要

このページでは、Datadog Agent の基本的な機能について説明します。Agent をまだインストールしていない場合は、[Datadog Agent インテグレーションのページ][1]で手順を参照してください。

デフォルトでは、Agent は `~/.datadog-agent` にある独自のサンドボックスにインストールされます。このフォルダーは、任意の場所に移動できます。ただし、ここでは、Agent がデフォルトの場所にインストールされていることを前提としているため、場所を移動した場合は、それに応じて手順を変更してください。

## コマンド

Datadog Agent に含まれるコマンドのうち、`start`/`stop`/`restart`/`status` などの_ライフサイクルコマンド_だけは `sudo` で実行する必要があります。

| 説明                   | コマンド                                 |
| ----------------------------- | --------------------------------------- |
| Agent の起動                   | `sudo ./bin/agent/agent start`          |
| Agent の停止                    | `sudo ./bin/agent/agent stop`          |
| 実行中の Agent のステータスページ  | `sudo ./bin/agent/agent info`          |
| フレアの送信                    | `sudo ./bin/agent/agent flare`         |
| コマンドの使用方法の表示         | `sudo ./bin/agent/agent help`          |

## 構成

Agent の構成ファイルおよびフォルダーの場所

* `/etc/datadog-agent/datadog.yaml`

[インテグレーション][2]用コンフィギュレーションファイルの場所

* `/etc/datadog-agent/conf.d/`

## トラブルシューティング

[Agent のトラブルシューティングに関するドキュメント][3]を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=source
[2]: /ja/integrations/
[3]: /ja/agent/troubleshooting/