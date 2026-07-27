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
description: Agent をインストールして、データ収集のために構成する
further_reading:
- link: /logs/
  tag: ドキュメント
  text: ログの収集
- link: /infrastructure/process/
  tag: ドキュメント
  text: プロセスの収集
- link: /tracing/
  tag: ドキュメント
  text: トレースの収集
- link: /agent/faq/why-should-i-install-the-agent-on-my-cloud-instances/
  tag: ドキュメント
  text: クラウドインスタンスに Agent をインストールする理由
- link: https://www.datadoghq.com/blog/dont-fear-the-agent/
  tag: ブログ
  text: Agent を怖がらないでください
- link: https://learn.datadoghq.com/courses/agent-on-host
  tag: ラーニングセンター
  text: ホスト上の Agent
title: Agent
---
<div class="alert alert-info">
Agent v7 が利用可能です。<a href="/agent/versions/upgrade_to_agent_v7">最新バージョンにアップグレード</a>して、すべての新機能を利用しましょう。
</div>

## 概要 {#overview}

Datadog Agent はホスト上で動作するソフトウェアです。ホストからイベントとメトリクスを収集し、それらを Datadog に送信します。そこで、モニタリングとパフォーマンスデータを分析できます。Datadog Agent はオープンソースであり、そのソースコードは GitHub の [DataDog/datadog-agent][1] で入手できます。

<br>

{{< partial name="platforms/platforms.html" links="platforms" >}}

<div class="alert alert-info"><p>
Datadog は、マイナーおよびパッチリリースごとに Datadog Agent を更新すること、または最低でも月に一度は更新することを推奨しています。</p>
<p>
Datadog Agent のメジャーバージョンにアップグレードし、それを最新の状態に保つことが、最新の Agent 機能と修正を得るための唯一のサポートされた方法です。</p>
<p><em>Agent をフルでインストールすることをお勧めします。</em>しかし、Amazon Linux、CentOS、Debian、Fedora、Red Hat、SUSE、および Ubuntu 用のスタンドアロンの DogStatsD パッケージもあります。このパッケージは、DogStatsD がサイドカーとして動作するコンテナ化された環境や、完全な Agent 機能がない DogStatsD サーバーを実行している環境で使用されます。</p>
</div>

## Agent の管理 {#managing-the-agent}

### Fleet Automation を使用した Agent の管理 (推奨){#managing-the-agent-with-fleet-automation-recommended}
[Fleet Automation][15] は、大規模に Datadog Agent をインストール、アップグレード、構成、トラブルシューティングするための主要なアプリ内ワークフローです。

{{< img src="/agent/basic_agent_usage/basic_agent_2_july_25.png" alt="Fleet Automation ビューでは、Datadog Agent を一か所で一元管理できます。" style="width:100%;">}}


- **{{< ui >}}View configuration & history{{< /ui >}}**: フリート内のすべての Agent、そのバージョン、有効な製品、構成ファイル、および履歴の変更を 1 ページで表示します。
- **[古い Agent をアップグレード][13]**: 数回のクリックで、Agent のリモートアップグレードをトリガーして、フリートを最新の状態に保ちます。
- **[サポートのためにフレアを送信][14]**: ホストの {{< ui >}}Support{{< /ui >}} タブから、フレアを生成し、コマンドラインを使用せずに既存または新しいサポートケースに添付します。
- **API キーの使用状況の監査**: 特定の API キーを使用している Agent を特定し、安全にキーをローテーションします。


### Datadog Agent Manager GUI {#datadog-agent-manager-gui}

<div class="alert alert-info">Agent GUI は 32 ビット Windows プラットフォームではサポートされていません。</div>

Datadog Agent Manager GUI を使用して、次のことを行います。
- Agent のステータス情報を表示する
- すべての実行中のチェックを表示する
- Agent ログを表示する
- Agent 構成ファイル (`datadog.yaml`) を編集する
- Agent チェックを追加および編集する
- フレアを送信する

Datadog Agent Manager GUI は、Windows および macOS でデフォルトで有効になっており、ポート `5002` で実行されます。`datadog-agent launch-gui` コマンドを使用して、デフォルトのウェブブラウザで GUI を開きます。

`datadog.yaml` 構成ファイルで GUI のデフォルトポートを変更できます。GUI を無効にするには、ポートの値を `-1` に設定します。Linux では、GUI はデフォルトで無効になっています。

GUI の要件:
- ブラウザで Cookie を有効にする必要があります。GUI は、ブラウザにトークンを生成して保存します。トークンは GUI サーバーとのすべての通信を認証するために使用されます。
- GUI を開始するには、ユーザーが必要な権限を持っている必要があります。`datadog.yaml` を開くことができれば、GUI を使用することができます。
- セキュリティ上の理由から、GUI はローカルネットワークインターフェース (`localhost`/`127.0.0.1`) から**のみ**アクセス可能であるため、エージェントが実行されているホスト上にいる必要があります。Agent を VM またはコンテナで実行し、ホストマシンからアクセスすることはできません。

### コマンドラインインターフェイス {#command-line-interface}

エージェント 6 以降、エージェントのコマンドラインインターフェースはサブコマンドに基づいています。Agent のサブコマンドの全一覧は、[Agent のコマンド][2]を参照してください。

## Datadog Agent をさらに使いこなす {#getting-further-with-the-datadog-agent}

### エージェントのアップデート {#update-the-agent}

特定のホスト上で実行されている Datadog Agent のコアを手動でマイナーバージョンにアップデートするには、[プラットフォームの対応するインストールコマンド][7]を実行します。

**注**: 特定のエージェントインテグレーションを手動でアップデートするには、[インテグレーション管理ガイド][8]を参照してください。

### 構成ファイル {#configuration-files}

[Agent コンフィギュレーションファイルに関するドキュメント][9]を参照してください。

### Datadog サイト {#datadog-site}

[エージェントのメイン構成ファイル][10]、`datadog.yaml` を編集して `site` パラメーターを設定します (デフォルトは `datadoghq.com` です)。

```yaml
site: {{< region-param key="dd_site" >}}
```

**注**: `site` パラメーターの詳細については、[Datadog サイトの概要ドキュメント][11]を参照してください。

### ログの場所 {#log-location}

[Agent ログファイルに関するドキュメント][12]を参照してください。

## Agent のオーバーヘッド {#agent-overhead}

Datadog Agent のリソース消費の例を下記に示します。テストは、Amazon EC2 マシン `c5.xlarge` インスタンス (4 VCPU/ 8GB RAM) で行われ、同様のリソースを持つ ARM64 ベースのインスタンスでも同等のパフォーマンスが見られました。標準の `datadog-agent` は、エージェント自体をモニターするためのプロセスチェックで実行されていました。より多くのインテグレーションを有効にすると、Agent のリソース消費が増加する可能性があります。
JMX チェックを有効にすると、モニター対象の JVM によって公開されるビーンの数に応じて、Agent が使用するメモリが増加します。トレースとプロセスを有効にすると、Agent のリソース消費も増加します。

* エージェントテストのバージョン: 7.34.0
* CPU: 平均で CPU の約 0.08% を使用
* メモリ: 約 130MB の RAM を使用 (RSS メモリ)
* ネットワーク帯域幅: 約 140 B/秒 ▼ | 800 B/秒 ▲
* ディスク:
  * Linux: ディストリビューションによって 830MB ～ 880MB
  * Windows: 870MB

**ログ収集**:

下記の結果は、[HTTP フォワーダー][6] が有効なファイルからの*毎秒 110KB のログの収集*から取得したものです。異なる圧縮レベルにおけるリソース使用率の推移を示しています。

{{< tabs >}}
{{% tab "HTTP 圧縮レベル 6" %}}

* エージェントテストのバージョン: 6.15.0
* CPU: 平均で CPU の約 1.5% を使用
* メモリ: 約 95MB の RAM を使用。
* ネットワーク帯域幅: 約 14KB/秒 ▲

{{% /tab %}}
{{% tab "HTTP 圧縮レベル 1" %}}

* エージェントテストのバージョン: 6.15.0
* CPU: 平均で CPU の約 1% を使用
* メモリ: 約 95MB の RAM を使用。
* ネットワーク帯域幅: 約 20KB/秒 ▲

{{% /tab %}}
{{% tab "HTTP 非圧縮" %}}

* エージェントテストのバージョン: 6.15.0
* CPU: 平均で CPU の約 0.7% を使用
*  メモリ: 約 90MB の RAM を使用 (RSS メモリ)
* ネットワーク帯域幅: 約 200KB/秒 ▲
 
{{% /tab %}}
{{< /tabs >}}


## 追加リソース {#additional-resources}
{{< whatsnext desc="このセクションには下記のトピックが含まれています。">}}
  {{< nextlink href="/agent/kubernetes">}}<u>Kubernetes</u>: Kubernetes 上に Datadog Agent をインストールして構成します。{{< /nextlink >}}
  {{< nextlink href="/agent/cluster_agent">}}<u>Cluster Agent</u>: オーケストレーションされたクラスター全体からモニタリングデータを効率的に収集するために構築された Datadog Agent のバージョンである Cluster Agent for Kubernetes をインストールして構成します。{{< /nextlink >}}
  {{< nextlink href="/agent/amazon_ecs">}}<u>Amazon ECS</u>: Amazon ECS 上に Datadog Agent をインストールして構成します。{{< /nextlink >}}
  {{< nextlink href="integrations/ecs_fargate/">}}<u>AWS Fargate</u>: AWS Fargate 上の Amazon ECS で Datadog Agent をインストールして構成します。{{< /nextlink >}}
  {{< nextlink href="/agent/iot">}}<u>IoT</u>: IoT デバイスおよび組み込みアプリケーションのモニタリングに最適化された Datadog Agent のバージョンである Datadog IoT Agent をインストールして構成します。{{< /nextlink >}}
  {{< nextlink href="/agent/logs">}}<u>ログ収集</u>: Datadog Agent でのログ収集を有効にして設定します。{{< /nextlink >}}
  {{< nextlink href="/agent/configuration/proxy">}}<u>プロキシ</u>: ネットワーク構成がアウトバウンドトラフィックを制限している場合、Agent トラフィックにプロキシを使用します。{{< /nextlink >}}
  {{< nextlink href="/agent/versions/">}}<u>バージョン</u>: Agent 7 は Datadog Agent の最新のメジャーバージョンです。Agent のメジャーバージョン間の変更点とアップグレード方法について学びます。{{< /nextlink >}}
  {{< nextlink href="/agent/troubleshooting">}}<u>トラブルシューティング</u>: Datadog Agent のトラブルシューティング情報を見つけます。{{< /nextlink >}}
  {{< nextlink href="/agent/guide">}}<u>ガイド</u>: Agent の使用に関する詳細なステップバイステップのチュートリアルです。{{< /nextlink >}}
  {{< nextlink href="/agent/security">}}<u>セキュリティ</u>: 環境を安全に保つためにお客様が利用できる主なセキュリティ機能と特徴に関する情報。{{< /nextlink >}}
  {{< nextlink href="/getting_started/observability_pipelines">}}<u>Observability Pipelines と Datadog の構成</u>: すべてのログとメトリクスを収集し、変換し、任意の宛先にルーティングするアグリゲーターとして Observability Pipelines Worker をデプロイします。{{< /nextlink >}}
{{< /whatsnext >}}

## 参考資料 {#further-reading}

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