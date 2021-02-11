---
title: Agent の概要
kind: documentation
aliases:
  - /ja/getting_started/agent
further_reading:
  - link: /agent/basic_agent_usage/
    tag: ドキュメント
    text: 基本的な Agent の利用方法
  - link: /agent/faq/why-should-i-install-the-agent-on-my-cloud-instances/
    tag: よくあるご質問
    text: クラウドインスタンスに Datadog Agent をインストールした方がよいのはなぜですか
---
## 概要

Agent は軽量なソフトウェアで、ホストにインストールされます。[インテグレーション][1]、[DogStatsD][2]、または [API][3] を介して、ホストのメトリクスとイベントを Datadog に報告します。追加のセットアップを行うと、Agent から[ライブプロセス][4]、[ログ][5]、および[トレース][6]を報告できるようになります。

## セットアップ

[Datadog アカウント][7]をまだ作成していない場合は作成します。

### インストール

Agent はさまざまなプラットフォームにインストールでき、インストール方法には、ホストへの直接インストールと[コンテナバージョン][8]によるものがあります。ほとんどのシステムで、1 行のインストールオプションがあります。

{{< partial name="platforms/platforms.html" desc="Choose your platform to see installation instructions:" links="gs" >}}

### コンフィグレーション

Agent の[メインコンフィギュレーションファイル][9]は `datadog.yaml` です。必須パラメーターは [Datadog API キー][10]で、これを使用して Agent のデータをオーガニゼーションと Datadog サイト ({{< region-param key="dd_site" code="true" >}}) に関連付けます。使用可能なすべての構成オプションの詳細については、[config_template.yaml のサンプル][11]を参照してください。

[Container Agent][8] では、`datadog.yaml` 構成オプションは[環境変数][12]で渡されます。たとえば以下のとおりです。

- `DD_API_KEY` は Datadog API キー用
- `DD_SITE` は Datadog サイト用

### 検証

インストールを検証するには、Agent の[ステータスコマンド][13]を実行します。

### コマンド

Agent を[起動][14]、[停止][15] または [再起動][16]する方法については、[Agent のコマンド][17]ページを参照してください。

## 収集データ

### メトリクス

#### エージェント

Agent v6 で使用できるメトリクスを下記に示します。Agent v5 については、[Agent メトリクス][18]インテグレーションを参照してください。

| メトリクス                           | 説明                                                                                                          |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| **datadog.agent.python.version** | Agent が現在 Datadog に報告中の場合は、値 `1` が表示されます。メトリクスには `python_version` がタグ付けされています。 |
| **datadog.agent.running**        | Agent が現在 Datadog に報告中の場合は、値 `1` が表示されます。                                                 |
| **datadog.agent.started**        | Agent 起動時に値 `1` で送信されるカウント (v6.12 以上で使用可能)。                                        |

#### チェック

一部のプラットフォームの Agent では、メトリクスを収集するいくつかのコアチェックがデフォルトで有効になっています。

| チェック       | メトリクス       | プラットフォーム          |
| ----------- | ------------- | ------------------ |
| CPU         | [System][19]  | すべて                |
| ディスク        | [Disk][20]    | すべて                |
| Docker      | [Docker][21]  | Docker             |
| ファイル処理 | [System][19]  | Mac 以外のすべて     |
| IO          | [System][19]  | すべて                |
| ロード        | [System][19]  | Windows 以外のすべて |
| メモリ      | [System][19]  | すべて                |
| ネットワーク     | [Network][22] | すべて                |
| NTP         | [NTP][23]     | すべて                |
| アップタイム      | [System][19]  | すべて                |
| Winproc     | [System][19]  | Windows            |

他のテクノロジーからメトリクスを収集する方法については、[インテグレーション][24]のページを参照してください。

### イベント

Agent の起動または再起動の際に、Agent はイベントを Datadog に送信します。

### サービスチェック

**datadog.agent.up**:
Agent が Datadog に接続できない場合は、`CRITICAL` を返します。それ以外の場合は、`OK` を返します。

**datadog.agent.check_status**:
Agent チェックが Datadog にメトリクスを送信できない場合は、`CRITICAL` を返します。それ以外の場合は、`OK` を返します。

## トラブルシューティング

Agent のトラブルシューティングに関するヘルプ

- [Agent のトラブルシューティング][25]ページにアクセスしてください。
- [Agent のログファイル][26]を確認してください。
- [Datadog のサポートチーム][27]までお問合せください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

<p>

## 次のステップ

{{< whatsnext desc="Agent をインストールしたら、次のドキュメントを参照してください">}}
{{< nextlink href="/getting_started/integrations" tag="Documentation" >}}インテグレーションの詳細{{< /nextlink >}}
{{< nextlink href="/getting_started/application" tag="Documentation" >}}Datadog UI の詳細{{< /nextlink >}}
{{< /whatsnext >}}

[1]: /ja/integrations/
[2]: /ja/developers/metrics/dogstatsd_metrics_submission/
[3]: /ja/api/
[4]: /ja/infrastructure/process/
[5]: /ja/logs/
[6]: /ja/tracing/
[7]: https://www.datadoghq.com
[8]: https://github.com/DataDog/datadog-agent/tree/master/Dockerfiles/agent
[9]: /ja/agent/guide/agent-configuration-files/#agent-main-configuration-file
[10]: https://app.datadoghq.com/account/settings#api
[11]: https://github.com/DataDog/datadog-agent/blob/master/pkg/config/config_template.yaml
[12]: https://github.com/DataDog/datadog-agent/tree/master/Dockerfiles/agent#environment-variables
[13]: /ja/agent/guide/agent-commands/#agent-status-and-information
[14]: /ja/agent/guide/agent-commands/
[15]: /ja/agent/guide/agent-commands/#start-the-agent
[16]: /ja/agent/guide/agent-commands/#stop-the-agent
[17]: /ja/agent/guide/agent-commands/#restart-the-agent
[18]: /ja/integrations/agent_metrics/
[19]: /ja/integrations/system/#metrics
[20]: /ja/integrations/disk/#metrics
[21]: /ja/agent/docker/data_collected/#metrics
[22]: /ja/integrations/network/#metrics
[23]: /ja/integrations/ntp/#metrics
[24]: /ja/getting_started/integrations/
[25]: /ja/agent/troubleshooting/
[26]: /ja/agent/guide/agent-log-files/
[27]: /ja/help/