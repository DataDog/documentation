---
aliases:
- /ja/agent/faq/agent-check-directory-structure
- /ja/agent/faq/install-core-extra
- /ja/logs/faq/can-the-datadog-agent-be-used-to-send-only-logs
- /ja/agent/faq/the-datadog-agent-for-logs-or-traces-only
- /ja/agent/basic_agent_usage/
- /ja/guides/basic_agent_usage/
- /ja/agent/faq/where-is-the-configuration-file-for-the-agent/
- /ja/agent/faq/log-location
cascade:
- _target:
    lang: en
    path: /agent/basic_agent_usage/chef
  tags:
  - uninstall
- _target:
    lang: en
    path: /infrastructure/**/*
  algolia:
    rank: 80
    tags:
    - agent
description: データ収集のための Agent のインストールと設定
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
- link: /agent/faq/why-should-i-install-the-agent-on-my-cloud-instances/
  tag: Documentation
  text: クラウドインスタンスに Agent をインストールする理由
- link: https://www.datadoghq.com/blog/dont-fear-the-agent/
  tag: Blog
  text: Agent を恐れる必要はありません
title: Agent
---
<div class="alert alert-info">
Agent v7 が利用可能です。<a href="/agent/versions/upgrade_to_agent_v7">最新バージョンにアップグレード</a>して、すべての新機能を利用してください。
</div>

## 概要 {#overview}

Datadog Agent は、ホスト上で動作するソフトウェアです。ホストからイベントとメトリクスを収集して Datadog に送信します。Datadog 上でモニタリングおよびパフォーマンスデータを分析できます。Datadog Agent はオープンソースであり、そのソースコードは GitHub の [DataDog/datadog-agent][1] で公開されています。

<br>

{{< partial name="platforms/platforms.html" links="platforms" >}}

<div class="alert alert-info"><p>
Datadog では、マイナーリリースやパッチリリースのたびに、あるいは少なくとも毎月、Datadog Agent を更新することをお勧めしています。</p>
<p>
最新の Agent 機能と修正を入手するためにサポートされている唯一の方法は、Datadog Agent をメジャーバージョンにアップグレードし、常に最新の状態に保つことです。</p>
<p><em>Agent をフルインストールすることをお勧めします。</em>ただし、Amazon Linux、CentOS、Debian、Fedora、Red Hat、SUSE、Ubuntu では、スタンドアロンの DogStatsD パッケージを利用できます。このパッケージは、DogStatsD がサイドカーとして動作するコンテナ環境や、フル機能の Agent を使用せずに DogStatsD サーバーを実行する環境で使用されます。</p>
</div>

## Agent の管理 {#managing-the-agent}

### Fleet Automation による Agent の管理 (推奨) {#managing-the-agent-with-fleet-automation-recommended}
[Fleet Automation][15] は、Datadog Agent のインストール、アップグレード、設定、トラブルシューティングを大規模に行うための、主要なアプリ内ワークフローです。

{{< img src="/agent/basic_agent_usage/basic_agent_2_july_25.png" alt="Fleet Automation ビューを使用すると、Datadog Agent を 1 か所で一元管理できます。" style="width:100%;">}}


- **設定と履歴の表示**: フリート内のすべての Agent、そのバージョン、有効な製品、設定ファイル、および変更履歴を単一のページで表示します。
- **[古い Agent のアップグレード][13]**: 数回クリックするだけで Agent のリモートアップグレードを実行し、フリートを最新の状態に保ちます。
- **[サポートへのフレアの送信][14]**: ホストの [Support] (サポート) タブから、コマンドラインを使用せずにフレアを生成し、既存または新規のサポートケースに添付します。
- **API キー使用状況の監査**: 特定の API キーを使用している Agent を特定し、安全にキーをローテーションします。


###Datadog Agent Manager GUI {#datadog-agent-manager-gui}

<div class="alert alert-info">Agent GUI は 32 ビットの Windows プラットフォームではサポートされていません。</div>

Datadog Agent Manager GUI を使用して下記の操作ができます。
- Agent のステータス情報の表示
- 実行中のすべてのチェックの表示
- Agent ログの表示
- Agent 設定ファイル (`datadog.yaml`) の編集
- Agent チェックの追加または編集
- フレアの送信

Datadog Agent Manager GUI は Windows と macOS ではデフォルトで有効になっており、ポート `5002` で動作します。`datadog-agent launch-gui` コマンドを使用して、デフォルトの Web ブラウザで GUI を開きます。

GUI のデフォルトポートは、`datadog.yaml` 設定ファイルで変更できます。GUI を無効にするには、ポートの値を `-1` に設定します。Linux では、GUI はデフォルトで無効になっています。

GUI の要件:
- ブラウザで Cookie が有効になっている必要があります。GUI はブラウザ内にトークンを生成して保存します。このトークンは GUI サーバーとのすべての通信の認証に使用されます。
-GUI を起動するには、ユーザーに必要な権限が必要です。`datadog.yaml` を開くことができれば、GUI を使用できます。
-セキュリティ上の理由から、GUI にはローカルネットワークインターフェイス (`localhost`/`127.0.0.1`) から**のみ**アクセスできます。そのため、Agent が動作しているホスト上で操作する必要があります。VM やコンテナ上で Agent を実行し、それをホストマシンからアクセスすることはできません。

###コマンドラインインターフェイス {#command-line-interface}

Agent 6 以降、Agent のコマンドラインインターフェイスはサブコマンドに基づいています。Agent サブコマンドの全リストについては、[Agent コマンド][2]を参照してください。

##Datadog Agent の詳細情報 {#getting-further-with-the-datadog-agent}

### Agent の更新 {#update-the-agent}

特定のホスト上で Datadog Agent コアを 2 つのマイナーバージョン間で手動更新するには、[使用しているプラットフォームに対応するインストールコマンド][7]を実行します。

**注**: 特定の Agent インテグレーションを手動で更新する場合は、[インテグレーション管理ガイド][8]を参照してください。

###設定ファイル {#configuration-files}

[Agent 設定ファイルのドキュメント][9]を参照してください。

###Datadog サイト {#datadog-site}

[Agent のメイン設定ファイル][10]である `datadog.yaml` を編集して、`site` パラメーター (デフォルトは `datadoghq.com`) を設定します。

```yaml
site: {{< region-param key="dd_site" >}}
```

**注**: `site` パラメーターの詳細については、[Datadog サイトの概要ドキュメント][11]を参照してください。

###ログの場所 {#log-location}

[Agent ログファイルのドキュメント][12]を参照してください。

##Agent のオーバーヘッド {#agent-overhead}

Datadog Agent のリソース消費量の例を下記に示します。テストは Amazon EC2 マシン `c5.xlarge` インスタンス (4 VCPU、8GB RAM) で行われ、同様のリソースを持つ ARM64 ベースのインスタンスでも同等のパフォーマンスが確認されました。バニラ状態の `datadog-agent` は、Agent 自体をモニタリングするためのプロセスチェックが実行されている状態で動作していました。有効にするインテグレーションを増やすと、Agent のリソース消費量が増加する可能性があります。
JMX チェックを有効にすると、モニタリング対象の JVM によって公開される Bean の数に応じて、Agent がより多くのメモリを使用するようになります。Trace Agent や Process Agent を有効にすることでも、リソース消費量は増加します。

*Agent テストバージョン: 7.34.0
* CPU: 平均で約 0.08% の CPU 使用率
* メモリ: 約 130MB の RAM 使用量 (RSS メモリ)
* ネットワーク帯域幅: 約 140 B/s ▼ | 800 B/s ▲
* ディスク:
  * Linux: ディストリビューションに応じて 830MB ～ 880MB
  * Windows: 870MB

**ログ収集**:

次の結果は、[HTTP フォワーダー][6]を有効にした状態で、ファイルから毎秒 *110KB のログ*を収集した際に得られたものです。利用可能なさまざまな圧縮レベルにおけるリソース使用率の変化を示しています。

{{< tabs >}}
{{% tab "HTTP 圧縮レベル 6" %}}

* Agent テストバージョン: 6.15.0
* CPU: 平均で約 1.5% の CPU 使用率
* メモリ: 約 95MB の RAM 使用量。
*ネットワーク帯域幅: 約 14 KB/s ▲

{{% /tab %}}
{{% tab "HTTP 圧縮レベル 1" %}}

* Agent テストバージョン: 6.15.0
* CPU: 平均で約 1% の CPU 使用率
* メモリ: 約 95MB の RAM 使用量。
*ネットワーク帯域幅: 約 20 KB/s ▲

{{% /tab %}}
{{% tab "HTTP 非圧縮" %}}

* Agent テストバージョン: 6.15.0
* CPU: 平均で約 0.7% の CPU 使用率
* メモリ: 約 90MB の RAM 使用量 (RSS メモリ)
* ネットワーク帯域幅: 約 200 KB/s ▲
 
{{% /tab %}}
{{< /tabs >}}


## その他のリソース {#additional-resources}
{{< whatsnext desc="このセクションでは、下記のトピックについて説明します。">}}
  {{< nextlink href="/agent/kubernetes">}}<u>Kubernetes</u>: Kubernetes への Datadog Agent のインストールと構成。{{< /nextlink >}}
  {{< nextlink href="/agent/cluster_agent">}}<u>Cluster Agent</u>: Kubernetes 用 Cluster Agent のインストールと構成。オーケストレーションされたクラスター全体からモニタリングデータを効率的に収集するために構築された Datadog Agent のバージョンです。{{< /nextlink >}}
  {{< nextlink href="/agent/amazon_ecs">}}<u>Amazon ECS</u>: Amazon ECS への Datadog Agent のインストールと構成。{{< /nextlink >}}
  {{< nextlink href="integrations/ecs_fargate/">}}<u>AWS Fargate</u>: AWS Fargate 上の Amazon ECS への Datadog Agent のインストールと構成{{< /nextlink >}}
  {{< nextlink href="/agent/iot">}}<u>IoT</u>: Datadog IoT Agent のインストールと構成。IoT デバイスや組み込みアプリケーションのモニタリングに最適化された Datadog Agent のバージョンです。{{< /nextlink >}}
  {{< nextlink href="/agent/logs">}}<u>ログ収集</u>: Datadog Agent でのログ収集の有効化と設定。{{< /nextlink >}}
  {{< nextlink href="/agent/configuration/proxy">}}<u>プロキシ</u>: ネットワーク設定でアウトバウンドトラフィックが制限されている場合は、Agent トラフィックにプロキシを使用します。{{< /nextlink >}}
  {{< nextlink href="/agent/versions/">}}<u>バージョン</u>: Agent 7 は Datadog Agent の最新のメジャーバージョンです。Agent のメジャーバージョン間の変更点とアップグレード方法について説明します。{{< /nextlink >}}
  {{< nextlink href="/agent/troubleshooting">}}<u>トラブルシューティング</u>: Datadog Agent のトラブルシューティング情報について説明します。{{< /nextlink >}}
  {{< nextlink href="/agent/guide">}}<u>ガイド</u>: Agent を使用するための詳細なステップバイステップのチュートリアルです。{{< /nextlink >}}
  {{< nextlink href="/agent/security">}}<u>セキュリティ</u>: 環境の安全を確保するために利用可能な、主なセキュリティ機能と機能に関する情報です。{{< /nextlink >}}
  {{< nextlink href="/getting_started/observability_pipelines">}}<u>Observability Pipelines と Datadog の設定</u>: Observability Pipelines Worker をアグリゲーターとしてデプロイし、すべてのログとメトリクスを収集、変換して、任意の宛先にルーティングします。{{< /nextlink >}}
{{< /whatsnext >}}

## その他の参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/datadog-agent
[2]: /ja/agent/configuration/agent-commands/
[6]: /ja/agent/logs/log_transport/?tab=https#enforce-a-specific-transport
[7]: https://app.datadoghq.com/account/settings/agent/latest
[8]: /ja/agent/guide/integration-management/
[9]: /ja/agent/configuration/agent-configuration-files/
[10]: /ja/agent/configuration/agent-configuration-files/#agent-main-configuration-file
[11]: /ja/getting_started/site/
[12]: /ja/agent/configuration/agent-log-files/
[13]: /ja/agent/fleet_automation/remote_management/#remotely-upgrade-your-agents
[14]: /ja/agent/troubleshooting/send_a_flare/?tab=agent#send-a-flare-from-the-datadog-site
[15]: /ja/agent/fleet_automation