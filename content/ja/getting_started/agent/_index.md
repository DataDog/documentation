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

{{< tabs >}}
{{% tab "Datadog US Site" %}}

Agent の[メイン構成ファイル][1]は `datadog.yaml` です。必須パラメーターは [Datadog API キー][2]だけで、Agent のデータをオーガニゼーションに関連付けるために使用されます。使用可能なすべての構成オプションの詳細については、[config_template.yaml のサンプル][3]を参照してください。

[Container Agent][4] では、`datadog.yaml` 構成オプションは[環境変数][5]で渡されます。たとえば、Datadog API キーの環境変数は `DD_API_KEY` です。

[1]: /ja/agent/guide/agent-configuration-files/#agent-main-configuration-file
[2]: https://app.datadoghq.com/account/settings#api
[3]: https://github.com/DataDog/datadog-agent/blob/master/pkg/config/config_template.yaml
[4]: https://github.com/DataDog/datadog-agent/tree/master/Dockerfiles/agent
[5]: https://github.com/DataDog/datadog-agent/tree/master/Dockerfiles/agent#environment-variables
{{% /tab %}}
{{% tab "Datadog EU Site" %}}

Agent の[メイン構成ファイル][1]は `datadog.yaml` です。必須パラメーターは [Datadog API キー][2]で、これを使用して Agent のデータをオーガニゼーションと Datadog サイト (`datadoghq.eu`) に関連付けます。使用可能なすべての構成オプションの詳細については、[config_template.yaml のサンプル][3]を参照してください。

[Container Agent][4] では、`datadog.yaml` 構成オプションは[環境変数][5]で渡されます。たとえば以下のとおりです。

* `DD_API_KEY` は Datadog API キー用
* `DD_SITE` は Datadog サイト用

[1]: /ja/agent/guide/agent-configuration-files/#agent-main-configuration-file
[2]: https://app.datadoghq.eu/account/settings#api
[3]: https://github.com/DataDog/datadog-agent/blob/master/pkg/config/config_template.yaml
[4]: https://github.com/DataDog/datadog-agent/tree/master/Dockerfiles/agent
[5]: https://github.com/DataDog/datadog-agent/tree/master/Dockerfiles/agent#environment-variables
{{% /tab %}}
{{< /tabs >}}

### 検証

インストールを検証するには、Agent の[ステータスコマンド][9]を実行します。

### コマンド

Agent を[起動][11]、[停止][12] または [再起動][13]する方法については、[Agent のコマンド][10]ページを参照してください。

## 収集データ

### メトリクス

#### Agent

Agent v6 で使用できるメトリクスを下記に示します。Agent v5 については、[Agent メトリクス][14]インテグレーションを参照してください。

| メトリクス                           | 説明                                                                                                          |
|----------------------------------|----------------------------------------------------------------------------------------------------------------------|
| **datadog.agent.python.version** | Agent が現在 Datadog に報告中の場合は、値 `1` が表示されます。メトリクスには `python_version` がタグ付けされています。 |
| **datadog.agent.running**        | Agent が現在 Datadog に報告中の場合は、値 `1` が表示されます。                                                 |
| **datadog.agent.started**        | Agent 起動時に値 `1` で送信されるカウント (v6.12 以上で使用可能)。                                        |

#### Checks

一部のプラットフォームの Agent では、メトリクスを収集するいくつかのコアチェックがデフォルトで有効になっています。

| Check       | メトリクス       | プラットフォーム          |
|-------------|---------------|--------------------|
| CPU         | [システム][15]  | すべて                |
| Disk        | [ディスク][16]    | すべて                |
| Docker      | [Docker][17]  | Docker             |
| ファイルハンドル | [システム][15]  | Mac 以外のすべて     |
| IO          | [システム][15]  | すべて                |
| Load        | [システム][15]  | Windows 以外のすべて |
| メモリ      | [システム][15]  | すべて                |
| ネットワーク     | [ネットワーク][18] | すべて                |
| NTP         | [NTP][19]     | すべて                |
| アップタイム      | [システム][15]  | すべて                |
| Winproc     | [システム][15]  | Windows            |

他のテクノロジーからメトリクスを収集する方法については、[インテグレーション][20]のページを参照してください。

### イベント

Agent の起動または再起動の際に、Agent はイベントを Datadog に送信します。

### サービスのチェック

**datadog.agent.up**:
Agent が Datadog に接続できない場合は、`CRITICAL` を返します。それ以外の場合は、`OK` を返します。

**datadog.agent.check_status**:
Agent チェックが Datadog にメトリクスを送信できない場合は、`CRITICAL` を返します。それ以外の場合は、`OK` を返します。

## トラブルシューティング

Agent のトラブルシューティングに関するヘルプ

* [Agent のトラブルシューティング][21]ページにアクセスしてください。
* [Agent のログファイル][22]を確認してください。
* [Datadog のサポートチーム][23]までお問合せください。

## その他の参考資料


{{< partial name="whats-next/whats-next.html" >}}
<p>

## 次のステップ

{{< whatsnext desc="After the Agent is installed:" >}}
    {{< nextlink href="/getting_started/integrations" tag="Documentation" >}}インテグレーションについて{{< /nextlink >}}
    {{< nextlink href="/getting_started/application" tag="Documentation" >}}Datadog UI について{{< /nextlink >}}
{{< /whatsnext >}}

[1]: /ja/integrations
[2]: /ja/developers/metrics/dogstatsd_metrics_submission
[3]: /ja/api
[4]: /ja/infrastructure/process
[5]: /ja/logs
[6]: /ja/tracing
[7]: https://www.datadoghq.com
[8]: https://github.com/DataDog/datadog-agent/tree/master/Dockerfiles/agent
[9]: /ja/agent/guide/agent-commands/#agent-status-and-information
[10]: /ja/agent/guide/agent-commands
[11]: /ja/agent/guide/agent-commands/#start-the-agent
[12]: /ja/agent/guide/agent-commands/#stop-the-agent
[13]: /ja/agent/guide/agent-commands/#restart-the-agent
[14]: /ja/integrations/agent_metrics
[15]: /ja/integrations/system/#metrics
[16]: /ja/integrations/disk/#metrics
[17]: /ja/integrations/docker_daemon/#metrics
[18]: /ja/integrations/network/#metrics
[19]: /ja/integrations/ntp/#metrics
[20]: /ja/getting_started/integrations
[21]: /ja/agent/troubleshooting
[22]: /ja/agent/guide/agent-log-files
[23]: /ja/help