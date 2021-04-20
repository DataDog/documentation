---
title: 基本的な Agent の利用方法
kind: documentation
aliases:
  - /ja/guides/basic_agent_usage/
  - /ja/agent/faq/where-is-the-configuration-file-for-the-agent/
  - /ja/agent/faq/log-location
further_reading:
  - link: /agent/faq/how-datadog-agent-determines-the-hostname/
    tag: よくあるご質問
    text: Datadog が Agent ホスト名を決定する方法
  - link: /agent/guide/agent-commands/
    tag: よくあるご質問
    text: すべての Agent コマンド
  - link: /agent/guide/agent-configuration-files/
    tag: よくあるご質問
    text: すべての Agent 構成ファイルの場所
---
{{< partial name="platforms/platforms.html" links="platforms" >}}

## Agent アーキテクチャ

{{< tabs >}}
{{% tab "Agent v6 & v7" %}}

Agent v6 と v7は、インフラストラクチャーメトリクスとログの収集、そして [DogStatsD メトリクス][1]の受信を担当する 1 つのメインプロセスで構成されています。このプロセスの主なコンポーネントは次のとおりです。

* コレクター: チェックの実行とメトリクスの収集を行います。
* フォーワーダー: Datadog にペイロードを送信します。

`datadog.yaml` 構成ファイルで有効にすると、次の 2 つのオプションのプロセスが Agent によって生成されます。

* APM Agent: [トレース][2]を収集するプロセスです (デフォルトで有効になっています)。
* Process Agent: ライブプロセス情報を収集するプロセスです。デフォルトでは使用できるコンテナのみを収集し、その他に対しては無効になります。

Windows では、サービスは次のように一覧表示されます。

| サービス               | 説明             |
|-----------------------|-------------------------|
| DatadogAgent          | “Datadog Agent”         |
| datadog-trace-agent   | “Datadog Trace Agent”   |
| datadog-process-agent | “Datadog Process Agent” |

Agent がデフォルトでバインドする[ポート][3]は、Linux では 3 個、Windows と OSX では 4 個です。

| ポート | 説明                                                                                 |
|------|---------------------------------------------------------------------------------------------|
| 5000 | Agent に関するランタイムメトリクスを公開します。                                                    |
| 5001 | Agent の CLI と GUI で使用され、コマンドを送信して実行中の Agent から情報を取得します。 |
| 5002 | Windows と OSX で GUI サービスを提供します。                                                   |
| 8125 | DogStatsD サーバーで使用され、外部メトリクスを受信します。                                  |

### コレクター

コレクターは、15 秒ごとにすべての標準のメトリクスを収集します。Agent v6 埋め込みの Python2.7 インタープリターは、インテグレーションと[カスタムチェック][4]を実行します。

### Forwarder

Agent フォワーダーは、メトリクスを HTTPS 経由で Datadog に送信します。バッファリングを行うと、ネットワークスプリットがメトリクスの報告に影響を与えることを防ぐことができます。メトリクスは、処理待ちの送信リクエストのサイズまたは数が制限に達するまで、メモリにバッファされます。その後、フォワーダーのメモリのフットプリントを管理可能な範囲に保つために、最も古いメトリクスが破棄されます。ログは、SSL 暗号化 TCP 接続経由で Datadog に送信されます。

### DogStatsD

v6 の DogStatsD は、[Etsy の StatsD][5] メトリクス集計デーモンの Go 言語実装です。UDP または Unix ソケット経由で任意のメトリクスを受信してロールアップするために使用され、構成要素の一部としてカスタムコードを組み込んでもレイテンシーが発生しません。DogStatsD についての詳細は[こちら][6]でご確認いただけます。

[1]: /ja/developers/metrics/dogstatsd_metrics_submission/#metrics
[2]: /ja/tracing/guide/terminology/
[3]: /ja/agent/guide/network/#open-ports
[4]: /ja/developers/write_agent_check/
[5]: https://github.com/etsy/statsd
[6]: /ja/developers/metrics/dogstatsd_metrics_submission/
{{% /tab %}}
{{% tab "Agent v5" %}}

{{< img src="agent/agent5architecture.jpg" alt="Agent v5 アーキテクチャ" >}}

Agent v5 は、以下に示す主な 4 つのコンポーネントで構成され、それぞれ別のプロセスとして実行される Python で記述されます。

* **コレクター** (`agent.py`): コレクターは、現在のマシンで構成されている[インテグレーション][1]のチェックを実行し、メモリや CPU などのシステムメトリクスをキャプチャします。
* **DogStatsD** (`dogstatsd.py`): アプリケーションから[カスタムメトリクス][2]を送信できる StatsD 互換可能バックエンドサーバーです。
* **フォワーダー** (`ddagent.py`): フォワーダーは、DogStatsD とコレクターの両方からデータを取得し、クエリを実行し、Datadog に送信します。
* **SupervisorD**: 全体が 1 つのスーパーバイザープロセスで制御されます。すべての要素を実行しない場合に各アプリケーションのオーバーヘッドを制限するために、分離されています。ただし、原則としてすべての要素を実行することをお勧めします。

**注**: Windows の場合、4 つの Agent プロセスはいずれも `ddagent.exe` インスタンスとして、`DevOps' best friend` という説明とともに表示されます。

### 監督、特権、ネットワークポート

SupervisorD マスタープロセスは、`dd-agent` ユーザーとして実行され、分岐したすべてのサブプロセスは同じユーザーとして実行されます。これは、Datadog Agent によって開始されたシステムコール (`iostat`/`netstat`) にも適用されます。Agent 構成は、`/etc/dd-agent/datadog.conf` と `/etc/dd-agent/conf.d` にあります。すべての構成は、`dd-agent` によって読み取り可能である必要があります。構成ファイルには API キーとメトリクスにアクセスするために必要な他の証明書が含まれるので、推奨されるアクセス許可は 0600 です。

操作のために次の[ポート][3]が開かれています。

| ポート      | 説明                         |
|-----------|-------------------------------------|
| tcp/17123 | フォワーダーの通常操作 |
| tcp/17124 | graphite サポート用のフォワーダー  |
| udp/8125  | DogStatsD                           |

v3.4.1 以上の Agent では、すべてのリスニングプロセスはデフォルトで `127.0.0.1` と `::1` にバインドされます。以前のバージョンでは、`0.0.0.0` (すべてのインターフェイス) にバインドされます。プロキシから Agent を実行する詳細については、[Agent のプロキシ構成][4]を参照してください。許可される IP 範囲の詳細については、[ネットワークトラフィック][5]を参照してください。

ファイルディスクリプタを開く数は 1024 までにすることをお勧めします。この値は、コマンド `ulimit -a` で確認できます。Shell Fork Bomb Protection など、ハードウェアの制限でこの推奨値を下回る場合、たとえば `superisord.conf` に次の内容を追加することが一解決方法として考えられます。

```conf
[supervisord]
minfds = 100 # ハードウェア制限
```

[1]: /ja/integrations/
[2]: /ja/developers/metrics/custom_metrics/
[3]: /ja/agent/guide/network/?tab=agentv5v4#open-ports
[4]: /ja/agent/proxy/?tab=agentv5
[5]: /ja/agent/faq/network/
{{% /tab %}}
{{< /tabs >}}

## GUI

GUI が実行されるポートを `datadog.yaml` ファイルで構成できます。GUI を無効にするには、ポートの値を `-1` に設定します。
Windows および macOS では、GUI はデフォルトで有効になり、ポート `5002` で実行されます。Linux では、GUI はデフォルトで無効になります。

Agent の実行中は、`datadog-agent launch-gui` コマンドを使用して、デフォルトの Web ブラウザーで GUI を開きます。

**注**: Agent GUI は、32 ビット Windows プラットフォームではサポートされません。

### 要件

1. cookie をブラウザーで有効にする必要があります。GUI は、GUI サーバーとのすべての通信を認証するために使用されるトークンを生成し、ブラウザーに保存します。

2. GUI を起動するには、必要なアクセス許可を持っている必要があります。`datadog.yaml` を開くことができる場合は、GUI を使用できます。

3. セキュリティ上の理由から、GUI はローカルネットワークインターフェイス (`localhost`/`127.0.0.1`) から**のみ**アクセスできます。そのため、Agent を同じホストで実行する必要があります。したがって、Agent を VM やコンテナーで実行してホストマシンからアクセスすることはできません。

## サポート対象のプラットフォーム

{{< tabs >}}
{{% tab "Agent v6 & v7" %}}

| プラットフォーム                                 | サポートされるバージョン                                        |
|------------------------------------------|-----------------------------------------------------------|
| [Amazon Linux][1]                        | Amazon Linux 2                                            |
| [Debian][2] (systemd を使用)                 | Debian 7 (wheezy) 以上                                        |
| [Debian][2] (SysVinit を使用)                | Agent 6.6.0 以上では Debian 7 (wheezy) 以上                        |
| [Ubuntu][3]                              | Ubuntu 14.04 以上                                             |
| [RedHat/CentOS][4]                       | RedHat/CentOS 6 以上                                          |
| [Docker][5]                              | バージョン 1.12 以上                                             |
| [Kubernetes][6]                          | バージョン 1.3 以上                                              |
| [SUSE Enterprise Linux][7] (systemd を使用)  | SUSE 11 SP4 以上                                              |
| [SUSE Enterprise Linux][7] (SysVinit を使用) | Agent 7.16.0 以上では SUSE 11 SP4                              |
| [Fedora][8]                              | Fedora 26 以上                                                |
| [macOS][9]                               | macOS 10.12 以上                                              |
| [Windows Server][10]                     | Windows Server 2008 R2+ および Server Core (Nano Server 以外) |
| [Windows][10]                            | Windows 7 以上                                                |
| [Windows Azure Stack HCI OS][10]         | すべてのバージョン                                              |

**注**: 
- 64-bit x86 パッケージは、リスト上のすべてのプラットフォーム用でご利用いただけます。Arm v8 パッケージは、Windows および MacOS 以外の全プラットフォームでご利用いただけます。
- [ソース][11]インストールは、このリストにないオペレーティングシステムでも実行でき、ベストエフォートベースでサポートされている可能性があります。
- Datadog Agent v6+ は、最新の Windows Update がインストールされた Windows Server 2008 R2 をサポートします。Windows Server 2008 R2 に影響する[クロックドリフトと Go の既知の問題][12]もあります。

[1]: /ja/agent/basic_agent_usage/amazonlinux/
[2]: /ja/agent/basic_agent_usage/deb/
[3]: /ja/agent/basic_agent_usage/ubuntu/
[4]: /ja/agent/basic_agent_usage/redhat/
[5]: /ja/agent/docker/
[6]: /ja/agent/basic_agent_usage/kubernetes/
[7]: /ja/agent/basic_agent_usage/suse/
[8]: /ja/agent/basic_agent_usage/fedora/
[9]: /ja/agent/basic_agent_usage/osx/
[10]: /ja/agent/basic_agent_usage/windows/
[11]: /ja/agent/basic_agent_usage/source/
[12]: https://github.com/golang/go/issues/24489
{{% /tab %}}
{{% tab "Agent v5" %}}

| プラットフォーム                   | サポートされるバージョン     |
|----------------------------|------------------------|
| [Amazon Linux][1]          | Amazon Linux 2         |
| [Debian][2]                | Debian 7 (wheezy) 以上     |
| [Ubuntu][3]                | Ubuntu 12.04 以上          |
| [RedHat/CentOS][4]         | RedHat/CentOS 5 以上       |
| [Docker][5]                | バージョン 1.12 以上          |
| [Kubernetes][6]            | バージョン 1.3 ～ 1.8     |
| [SUSE Enterprise Linux][7] | SUSE 11 SP4 以上           |
| [Fedora][8]                | Fedora 26 以上             |
| [MacOS][9]                 | macOS 10.10 以上           |
| [Windows Server][10]       | Windows Server 2008r2 以上 |
| [Windows][10]              | Windows 7 以上             |

**注**:

- [ソース][11]インストールは、このリストにないオペレーティングシステムでも実行でき、ベストエフォートベースでサポートされている可能性があります。

[1]: /ja/agent/basic_agent_usage/amazonlinux/?tab=agentv5
[2]: /ja/agent/basic_agent_usage/deb/
[3]: /ja/agent/basic_agent_usage/ubuntu/
[4]: /ja/agent/basic_agent_usage/redhat/
[5]: /ja/agent/docker/
[6]: /ja/agent/basic_agent_usage/kubernetes/
[7]: /ja/agent/basic_agent_usage/suse/
[8]: /ja/agent/basic_agent_usage/fedora/
[9]: /ja/agent/basic_agent_usage/osx/
[10]: /ja/agent/basic_agent_usage/windows/
[11]: /ja/agent/basic_agent_usage/source/
[12]: https://github.com/golang/go/issues/24489
{{% /tab %}}
{{% tab "Unix Agent" %}}

| プラットフォーム | サポートされるバージョン                        |
|----------|-------------------------------------------|
| [AIX][1] | AIX 6.1 TL9 SP6, 7.1 TL5 SP3, 7.2 TL3 SP0 |

[1]: /ja/agent/basic_agent_usage/aix/
{{% /tab %}}
{{< /tabs >}}

## CLI

Agent v6 以上のコマンドラインインターフェイスはサブコマンドに基づいています。サブコマンドを実行するには、まず Agent バイナリを呼び出します。

```text
<AGENT_バイナリパス> <サブコマンド> <オプション>
```

| サブコマンド        | 注                                                                       |
|-------------------|-----------------------------------------------------------------------------|
| `check`           | 指定されたチェックを実行します。                                                    |
| `configcheck`     | 実行中の Agent のうち、ロード済みで解決済みの構成をすべて出力します。              |
| `diagnose`        | システムに対して接続診断を実行します。                              |
| `flare`           | [フレアを収集して Datadog に送信します][1]。                                |
| `health`          | 現在の Agent の状態を出力します。                                             |
| `help`            | 任意のコマンドのヘルプ。                                                     |
| `hostname`        | Agent が使用するホスト名を出力します。                                       |
| `import`          | 以前のバージョンの Agent から構成ファイルをインポートして変換します。 |
| `installservice`  | サービスコントロールマネージャー内で Agent をインストールします。                       |
| `launch-gui`      | Datadog Agent GUI を起動します。                                                |
| `regimport`       | レジストリ設定を `datadog.yaml` にインポートします。                           |
| `remove-service`  | サービスコントロールマネージャーから Agent を削除します。                          |
| `restart`         | [Agent を再起動します][2]。                                                     |
| `restart-service` | サービスコントロールマネージャー内で Agent を再起動します。                       |
| `start`           | [Agent を起動します][3]。                                                       |
| `start-service`   | サービスコントロールマネージャー内で Agent を起動します。                         |
| `status`          | [現在の Agent のステータスを出力します][4]。                                        |
| `stop`            | [Agentを 停止します][5]。                                                        |
| `stopservice`     | サービスコントロールマネージャー内で Agent を停止します。                          |
| `version`         | バージョン情報を出力します。                                                         |

**注**: 一部のオプションにはフラグのセットとオプションがあり、ヘルプメッセージで詳細に説明されています。たとえば、`check` サブコマンドの使用方法を表示するには、次のように実行します。

```text
<AGENT_バイナリパス> check --help
```

## Agent のオーバーヘッド

以下は、Datadog Agent リソース消費の例です。テストは、AWS EC2 マシンの `c5.xlarge` インスタンス (4 VCPU/ 8 GB RAM) で行われました。Agent 自体を監視するために、vanilla `datadog-agent` がプロセスチェックとともに実行されました。さらにインテグレーションを有効にすると、Agent リソースの消費が増えます。
JMX チェックを有効にすると、監視対象の JVM によって公開される Bean の数に応じて、Agent が使用するメモリの量が増えます。トレースとプロセスを有効にしても、Agents のリソース消費が増えます。

{{< tabs >}}
{{% tab "Agent v6 & v7" %}}

* Agent テストのバージョン: 6.7.0
* CPU: 平均で CPU の約 0.12 % を使用
* メモリ: 約 60 MB の RAM を使用 (RSS メモリ)
* ネットワーク帯域幅: 約 86 B/秒 ▼ | 260 B/秒 ▲
* ディスク:
  * Linux: ディストリビューションによって 350 MB ～ 400 MB
  * Windows: 260 MB

{{% /tab %}}
{{% tab "Agent v5" %}}

* Agent テストのバージョン: 5.24.0
* CPU: 平均で CPU の約 0.35% を使用
* メモリ: 約 115 MB の RAM 使用。
* ネットワーク帯域幅: 約 1900 B/秒 ▼ | 800 B/秒 ▲
* ディスク:
  * Linux 312MB
  * Windows: 295MB

<mrk mid="212" mtype="seg">**注**: コンテナ Agent v5.15 以降では、メモリキャッシュが増えているためコンテナリソースを 256 MB 以上に設定することをお勧めします。この制限を大きくすることは、ベースラインの使用量に対応するためではなく、一時的なスパイクに対応するためです。</mrk><mrk mid="213" mtype="seg">Agent 6 では、メモリのフットプリント制限が非常に厳しくなっています。</mrk>

{{% /tab %}}
{{< /tabs >}}

**ログ収集**:

以下は、[HTTP フォワーダー][6]が有効になっている状態で*毎秒 110KB のログが記録される*ファイルから得た結果です。これは、使用可能な圧縮レベルに応じてリソース使用量がどのように増加するかを示しています。

{{< tabs >}}
{{% tab "HTTP compression level 6" %}}

* Agent テストのバージョン: 6.15.0
* CPU: 平均で CPU の約 1.5% を使用
* メモリ: 約 95 MB の RAM 使用。
* ネットワーク帯域幅: 約 14KB/秒 ▲
* ディスク:
  * Linux: ディストリビューションによって 350 MB ～ 400 MB
  * Windows: 260 MB

{{% /tab %}}
{{% tab "HTTP compression level 1" %}}

* Agent テストのバージョン: 6.15.0
* CPU: 平均で CPU の約 1% を使用
* メモリ: 約 95 MB の RAM 使用。
* ネットワーク帯域幅: 約 20KB/秒 ▲
* ディスク:
  * Linux: ディストリビューションによって 350 MB ～ 400 MB
  * Windows: 260 MB

{{% /tab %}}
{{% tab "HTTP Uncompressed" %}}

* Agent テストのバージョン: 6.15.0
* CPU: 平均で CPU の約 0.7 % を使用
* メモリ: 約 90 MB の RAM を使用 (RSS メモリ)
* ネットワーク帯域幅: 約 200KB/秒 ▲
* ディスク:
  * Linux: ディストリビューションによって 350 MB ～ 400 MB
  * Windows: 260 MB

{{% /tab %}}
{{< /tabs >}}

## Datadog Agent の次のステップ

### Agent の更新

特定のホスト上で実行されている  Datadog Agent のコアを手動でマイナーバージョンにアップデートするには、[プラットフォームの対応するインストールコマンド][7]を実行します。

注: 特定の Agent インテグレーションを手動でアップデートするには、[インテグレーション管理ガイド][8]を参照してください。

### 構成ファイル

[Agent 構成ファイルガイドを参照してください][9]。

### Datadog サイト

[Agent のメインコンフィギュレーションファイル][10]、`datadog.yaml` を編集して、`site` パラメーターを設定します (デフォルトは `datadoghq.com`)。

```yaml
site: {{< region-param key="dd_site" >}}
```

### ログの場所

[Agent ログファイルに関するドキュメントを参照してください][11]

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/agent/troubleshooting/send_a_flare/
[2]: /ja/agent/guide/agent-commands/#restart-the-agent
[3]: /ja/agent/guide/agent-commands/#start-the-agent
[4]: /ja/agent/guide/agent-commands/#service-status
[5]: /ja/agent/guide/agent-commands/#stop-the-agent
[6]: /ja/agent/logs/log_transport/?tab=https#enforce-a-specific-transport
[7]: https://app.datadoghq.com/account/settings#agent
[8]: /ja/agent/guide/integration-management/
[9]: /ja/agent/guide/agent-configuration-files/
[10]: /ja/agent/guide/agent-configuration-files/#agent-main-configuration-file
[11]: /ja/agent/guide/agent-log-files/