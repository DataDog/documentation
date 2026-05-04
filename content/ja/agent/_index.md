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
description: Agent をインストールしてデータ収集するよう構成する
further_reading:
- link: /logs/
  tag: よくあるご質問
  text: ログの収集
- link: /infrastructure/process/
  tag: よくあるご質問
  text: プロセスの収集
- link: /tracing/
  tag: よくあるご質問
  text: トレースの収集
- link: /agent/faq/why-should-i-install-the-agent-on-my-cloud-instances/
  tag: よくあるご質問
  text: クラウドインスタンスに Agent をインストールする理由
- link: https://www.datadoghq.com/blog/dont-fear-the-agent/
  tag: 英語ブログ
  text: Agent を怖がらないでください
title: Agent
---
<div class="alert alert-info">
Agent v7 が利用可能です。<a href="/agent/versions/upgrade_to_agent_v7">最新バージョンにアップグレード</a></a>して、すべての新機能を利用してください。
</div>

概要

Datadog Agent はホスト上で動作するソフトウェアです。ホストからイベントとメトリクスを収集し、それらを Datadog に送信します。そこで、モニタリングとパフォーマンスデータを分析できます。Datadog Agent はオープンソースであり、そのソースコードは GitHub の [DataDog/datadog-agent][1] で入手できます。

<br>

{{< partial name="platforms/platforms.html" links="platforms" >}}

<div class="alert alert-info"><p>
Datadog は、マイナーおよびパッチリリースごとに Datadog Agent を更新すること、または最低でも月に一度は更新することを推奨しています。</p>
<p>
Datadog Agent のメジャーバージョンにアップグレードし、それを最新の状態に保つことが、最新の Agent 機能と修正を得るための唯一のサポートされた方法です。</p>
<p> Agent をフルでインストールすることをお勧めします。しかし、Amazon Linux、CentOS、Debian、Fedora、Red Hat、SUSE、および Ubuntu 用のスタンドアロンの DogStatsD パッケージもあります。このパッケージは、DogStatsD がサイドカーとして動作するコンテナ化された環境や、完全な Agent 機能がない DogStatsD サーバーを実行している環境で使用されます。</p>
</div>

Agent の管理

### Fleet Automation を使用した Agent の管理 (推奨)
[Fleet Automation][15] は、大規模に Datadog Agent をインストール、アップグレード、構成、トラブルシューティングするための主要なアプリ内ワークフローです。

{{< img src="/agent/basic_agent_usage/basic_agent_2_july_25.png" alt="Fleet Automation ビューでは、Datadog Agent を一か所で一元管理できます。" style="width:100%;">}}


- **{{< ui >}}View configuration & history{{< /ui >}}**: フリート内のすべての Agent、そのバージョン、有効な製品、構成ファイル、および履歴の変更を 1 ページで表示します。
 **[古い Agent をアップグレード][13]**: 数回のクリックで、Agent のリモートアップグレードをトリガーして、フリートを最新の状態に保ちます。
- **[サポートのためにフレアを送信][14]**: ホストの {{< ui >}}Support{{< /ui >}} タブから、フレアを生成し、コマンドラインを使用せずに既存または新しいサポートケースに添付します。
- **API キーの使用状況の監査**: 特定の API キーを使用している Agent を特定し、安全にキーをローテーションします。


###Datadog Agent Manager GUI

<div class="alert alert-info">Agent GUI は 32 ビット Windows プラットフォームではサポートされていません。</div>

Datadog Agent Manager GUI を使用して、次のことを行います。
Agent のステータス情報を表示する
すべての実行中のチェックを表示する
Agent ログを表示する
- Agent 構成ファイル (`datadog.yaml`) を編集する
Agent チェックの追加と編集
フレアの送信

Datadog Agent Manager GUI は、Windows および macOS でデフォルトで有効になっており、ポート `5002` で実行されます。デフォルトのウェブブラウザで GUI を開くには `datadog-agent launch-gui` コマンドを使用します。

`datadog.yaml` 構成ファイルで GUI のデフォルトポートを変更できます。GUI を無効にするには、ポートの値を `1` に設定します。Linux では、GUI はデフォルトで無効になっています。

GUI の要件:
 ブラウザで Cookie が有効でなければなりません。GUI は、ブラウザにトークンを生成して保存します。トークンは GUI サーバーとのすべての通信を認証するために使用されます。
-GUI を開始するには、ユーザーが必要な権限を持っている必要があります。`datadog.yaml` を開くことができれば、GUI を使用することができます。
-セキュリティ上の理由から、GUI はローカルネットワークインターフェース (`localhost`/`127.0.0.1`) から**のみ**アクセス可能であるため、ユーザーは Agent が実行されているホストにいる必要があります。Agent を VM またはコンテナで実行し、ホストマシンからアクセスすることはできません。

###コマンドラインインターフェイス

Agent 6 以降、Agent のコマンドラインインターフェースはサブコマンドに基づいています。Agent のサブコマンドの全一覧は、[Agent のコマンド][2]を参照してください。

##Datadog Agent の次のステップ

Agent の更新

特定のホスト上で実行されている Datadog Agent のコアを手動でマイナーバージョンにアップデートするには、[ご使用のプラットフォームに対応するインストールコマンド][7]を実行します。

**注**: 特定の Agent インテグレーションを手動でアップデートするには、[インテグレーション管理ガイド][8]を参照してください。

###構成ファイル

[Agent 構成ファイルに関するドキュメント][9]を参照してください。

###Datadog サイト

[Agent のメイン構成ファイル][10]、`datadog.yaml` を編集して `site` パラメーターを設定します (デフォルトは `datadoghq.com` です)。

```yaml
site: {{< region-param key="dd_site" >}}
```

**注**: `site` パラメーターの詳細については、[Datadog サイトの概要ドキュメント][11]を参照してください。

###ログの場所

[Agent ログファイルに関するドキュメント][12]を参照してください。

##Agent のオーバーヘッド

Datadog Agent のリソース消費の例を下記に示します。テストは、Amazon EC2 マシン `c5.xlarge` インスタンス (4 VCPU/ 8GB RAM) で行われ、同様のリソースを持つ ARM64 ベースのインスタンスでも同等のパフォーマンスが見られました。バニラ `datadog-agent` は、Agent 自体をモニターするためのプロセスチェックで実行されていました。より多くのインテグレーションを有効にすると、Agent のリソース消費が増加する可能性があります。
JMX チェックを有効にすると、モニター対象の JVM によって公開されるビーンの数に応じて、Agent が使用するメモリが増加します。トレースとプロセスを有効にすると、Agent のリソース消費も増加します。

*Agent テストのバージョン: 7.34.0
CPU: 平均で CPU の約 0.2% を使用
メモリ: 約 130 MB の RAM を使用 (RSS メモリ)
ネットワーク帯域幅: 約 140 B/秒 ▼ | 800 B/秒 ▲
"Disk"
  Linux: ディストリビューションによって 830 MB ～ 880 MB
  Windows: 870 MB

ログの収集

下記の結果は、[HTTP フォワーダー][6] が有効なファイルからの*毎秒 110KB のログの収集*から取得したものです。異なる圧縮レベルにおけるリソース使用率の推移を示しています。

{{< tabs >}}
{{% tab "HTTP 圧縮レベル 6" %}}

Agent テストのバージョン: `7.53.0`
CPU: 平均で CPU の約 0.2% を使用
メモリ: 約 95 MB の RAM 使用。
*ネットワーク帯域幅: 約 14KB/秒 ▲

{{% /tab %}}
{{% tab "HTTP 圧縮レベル 1" %}}

Agent テストのバージョン: `7.53.0`
CPU: 平均で CPU の約 0.2% を使用
メモリ: 約 95 MB の RAM 使用。
*ネットワーク帯域幅: 約 20KB/秒 ▲

{{% /tab %}}
{{% tab "HTTP 非圧縮" %}}

Agent テストのバージョン: `7.53.0`
CPU: 平均で CPU の約 0.2% を使用
メモリ: 約 90 MB の RAM を使用 (RSS メモリ)
ネットワーク帯域幅: 約 20KB/秒 ▲
 
{{% /tab %}}
{{< /tabs >}}


###### 追加リソース
{{< whatsnext desc="このセクションには下記のトピックが含まれています。">}}
  {{< nextlink href="/agent/kubernetes">}}<u></u><u>Kubernetes: Kubernetes 上に Datadog Agent をインストールして構成します。{{< /nextlink >}}
  {{< nextlink href="/agent/cluster_agent">}}<u></u><u>Cluster Agent: オーケストレーションされたクラスター全体からモニタリングデータを効率的に収集するために構築された Datadog Agent のバージョンである Cluster Agent for Kubernetes をインストールして構成します。{{< /nextlink >}}
  {{< nextlink href="/agent/amazon_ecs">}}<u></u><u>Amazon ECS: Amazon ECS 上に Datadog Agent をインストールして構成します。{{< /nextlink >}}
  {{< nextlink href="integrations/ecs_fargate/">}}<u></u><u>AWS Fargate: AWS Fargate 上の Amazon ECS で Datadog Agent をインストールして構成します。{{< /nextlink >}}
  {{< nextlink href="/agent/iot">}}<u></u><u>IoT: IoT デバイスおよび組み込みアプリケーションのモニターに最適化された Datadog Agent のバージョンである Datadog IoT Agent をインストールして構成します。{{< /nextlink >}}
  {{< nextlink href="/agent/logs">}}<u></u><u>ログ収集: Datadog Agent でのログ収集を有効にして設定します。{{< /nextlink >}}
  {{< nextlink href="/agent/configuration/proxy">}}<u></u><u>プロキシ: ネットワーク構成がアウトバウンドトラフィックを制限している場合、Agent トラフィックにプロキシを使用します。{{< /nextlink >}}
  {{< nextlink href="/agent/versions/">}}<u></u><u>バージョン: Agent 7 は Datadog Agent の最新のメジャーバージョンです。Agent のメジャーバージョン間の変更点とアップグレード方法について学びます。{{< /nextlink >}}
  {{< nextlink href="/agent/troubleshooting">}}<u></u><u>トラブルシューティング: Datadog Agent のトラブルシューティング情報を見つけます。{{< /nextlink >}}
  {{< nextlink href="/agent/guide">}}<u>ガイド</u>: Agent の使用に関する詳細なステップバイステップのチュートリアルです。{{< /nextlink >}}
  {{< nextlink href="/agent/security">}}<u></u><u>セキュリティ: 環境を安全に保つためにお客様が利用できる主なセキュリティ機能と特徴に関する情報。{{< /nextlink >}}
  {{< nextlink href="/getting_started/observability_pipelines">}}<u></u><u>Observability Pipelines と Datadog の構成: すべてのログとメトリクスを収集し、変換し、任意の宛先にルーティングするアグリゲーターとして Observability Pipelines Worker をデプロイします。{{< /nextlink >}}
{{< /whatsnext >}}

参考資料

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