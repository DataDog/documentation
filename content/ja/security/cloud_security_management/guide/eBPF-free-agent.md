---
disable_toc: false
title: eBPF 非対応の Linux 環境の脅威検知
---

このガイドでは、AWS Fargate のような eBPF が無効な環境向けの Workload Protection eBPF 非対応ソリューションのセットアップ方法について説明します。eBPF 非対応ソリューションでは、ptrace ベースの Datadog Agent を使用します。

このガイドでは、ptrace ソリューションの利点についても説明します。

<div class="alert alert-info">eBPF 非対応の Linux 環境の脅威検知はプレビュー中です。登録をご希望の場合は、Datadog の担当者にお問い合わせください。</div>


## Agent オプションの概要

Workload Protection には、脅威の検知と対応のための Agent オプションが 2 つ用意されています。

- eBPF ソリューション
- ptrace を使った eBPF 非対応ソリューション: このバージョンは eBPF がサポートされない環境 (Linux カーネル 3.4～4.14) でのみ利用可能です。

{{% collapse-content title="eBPF ソリューション" level="h4" %}}

Datadog は、すべてのセキュリティ製品を [eBPF (extended Berkeley Packet Filter)][1] を基本として構築しています。eBPF の利点には次のようなものがあります。

- eBPF は、Linux カーネル ベリファイアを通じて各プログラムを検証することで、安全性を向上させます。これにより、プログラムがクラッシュしたり、無限ループに陥ったり、システムに悪影響を与えたりしないことを保証します。
- eBPF は JIT (Just In Time) コンパイルされ、出力されたバイトコードは eBPF VM サンドボックス上で実行されます。これにより、カーネルのクラッシュを防ぎ、高いパフォーマンスを提供します。
- デバッグとメンテナンスが容易で、プログラムを動的にロードでき、ユーザー空間をトレースするのに必要なすべての情報にアクセスできます。

Datadog eBPF Agent のコードは [完全にオープン ソース][2] です。

{{% /collapse-content %}}

{{% collapse-content title="ptrace を利用した eBPF 非対応ソリューション" level="h4" %}}
一部の環境では、eBPF をまったくサポートしない古いカーネルのインスタンスが使用されています。ptrace ソリューションはこうした環境向けに提供されています。

以下の機能は、eBPF 非対応 Agent では使用できません。

- セキュリティ プロファイル: 以下を提供
  - 異常検知
  - シグナルのトリアージのための通常動作イベントの自動サプレッション
  - マルウェア検知
- ネットワーク検知

<div class="alert alert-info">現在の実装は amd64 と arm64 のアーキテクチャと ABI をサポートしていますが、32 ビット ABI にも拡張可能です。</div>

### ptrace ソリューションの利点

ptrace ベースのソリューションは、堅牢な脅威検知と揺るぎないサービス可用性のバランスを実現します。ptrace ベースのソリューションには以下のような利点があります。

- 正確なプロセス制御: ptrace は、メモリとレジスタを詳細に検査し、重要なアプリケーション ワークロードを保護します。このきめ細かな可視性は、高度な脅威を特定するために不可欠です。Datadog の procfs (Process Filesystem) スキャナーは、システム全体の実行を監視し、悪意のあるプロセスをピンポイントで終了させることを可能にします。これらのツールを組み合わせることで、悪意のあるアクティビティから保護できます。
- 運用の安定性: ユーザー空間で動作する ptrace は、カーネル空間の複雑さとリスクを回避し、より安全で管理しやすいアプローチを提供します。障害が発生した場合、ptrace ベースの Agent は OS レイヤーでデフォルトでフェイル オープンとなり、アプリケーションがハング アップしてもシステムは影響を受けません。
- パフォーマンス効率: Datadog のエンジニアリング チームが実施した最近のベンチマークでは、Datadog の ptrace ベースの実装がカーネル ベースのソリューションに匹敵する性能を示すことが確認されています。具体的には、PostgreSQL ワークロードでのオーバーヘッドは約 3% にとどまり、Redis の操作への影響はごくわずかで、ほとんどのユースケースで非常に効率的です。
- オープン ソースによる検証: Datadog は、ptrace ベース Agent と eBPF Agent をオープン ソース化し、顧客とセキュリティ コミュニティが自ら安全性と有効性を検証できるようにすることで、ソリューションの透明性と信頼を高めています。
{{% /collapse-content %}}


## eBPF 非対応 Agent のセットアップ

eBPF 非対応 Agent は、Docker、Linux ホストを含むさまざまなプラットフォーム上でセットアップできます。

このセクションは、Docker および Linux ホストを対象としています。eBPF が無効な Amazon Fargate 環境のセットアップ手順については、[Datadog Security を使用するための AWS Fargate 構成ガイド][3]を参照してください。

### eBPF 非対応 Agent の要件

- eBPF 非対応 Agent は、eBPF が無効な環境向けに設計されており、ランタイム セキュリティに ptrace を使用し、arm64 と amd64 のアーキテクチャをサポートしています。
- eBPF 非対応 Agent をデプロイするには、カスタム インストール コマンドと構成が必要です。このセクションでは、Docker および Linux ホストでのインストール手順を具体的に説明します。

eBPF 非対応ソリューションには、アプリケーション向けのトレーシング モードが 2 つ用意されています。

- ラップ モード: アプリケーションを最初からトレーシングします。
- アタッチ モード: すでに実行中のアプリケーションにアタッチしますが、より大きなパフォーマンスのオーバーヘッドと制約を伴います。

### eBPF 非対応 Agent のセット アップ手順

{{< tabs >}}
{{% tab "Docker" %}}
Docker では追加の環境変数が必要です。docker run コマンドに次の行を追加してください。

```shell
-e DD_RUNTIME_SECURITY_CONFIG_EBPFLESS_ENABLED=true
```

対応するコマンドは次のようになります。

```shell
docker run -d --name dd-agent \
  --cgroupns host \
  --pid host \
  --security-opt apparmor:unconfined \
  --cap-add SYS_ADMIN \
  --cap-add SYS_RESOURCE \
  --cap-add SYS_PTRACE \
  --cap-add NET_ADMIN \
  --cap-add NET_BROADCAST \
  --cap-add NET_RAW \
  --cap-add IPC_LOCK \
  --cap-add CHOWN \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  -v /proc/:/host/proc/:ro \
  -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
  -v /etc/passwd:/etc/passwd:ro \
  -v /etc/group:/etc/group:ro \
  -v /:/host/root:ro \
  -v /sys/kernel/debug:/sys/kernel/debug \
  -v /etc/os-release:/etc/os-release \
  -e DD_COMPLIANCE_CONFIG_ENABLED=true \
  -e DD_COMPLIANCE_CONFIG_HOST_BENCHMARKS_ENABLED=true \
  -e DD_RUNTIME_SECURITY_CONFIG_ENABLED=true \
  -e DD_RUNTIME_SECURITY_CONFIG_REMOTE_CONFIGURATION_ENABLED=true \
  -e DD_RUNTIME_SECURITY_CONFIG_EBPFLESS_ENABLED=true \
  -e HOST_ROOT=/host/root \
  -e DD_API_KEY=<API KEY> \
  gcr.io/datadoghq/agent:7
```
{{% /tab %}}

{{% tab "Linux ホスト" %}}
Linux ホストに Agent を導入するには、以下のインストール スクリプトを使用してカスタム ビルドをインストールしてください。

```shell
DD_API_KEY=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX DD_SITE="datadoghq.com" \
DD_RUNTIME_SECURITY_CONFIG_ENABLED=true \
bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
```

次に、CWS と eBPF 非対応モードを有効にするために、`/etc/datadog-agent/system-probe.yaml` ファイルを次のように変更します。

{{< code-block lang="java" filename="system-probe.yaml" disable_copy="false" collapsible="true" >}}
runtime_security_config:
  enabled: true
  ebpfless:
    enabled: true
{{< /code-block >}}

あるいは、提供されている `.deb/.rpm` のカスタム ビルド パッケージを手動でインストールする場合は、`/etc/datadog-agent/system-probe.yaml` を次のように変更して、CWS と eBPF 非対応モードを有効にしてください。

{{< code-block lang="java" filename="system-probe.yaml" disable_copy="false" collapsible="true" >}}
runtime_security_config:
  enabled: true
  ebpfless:
    enabled: true
{{< /code-block >}}
{{% /tab %}}

{{< /tabs >}}





## eBPF 非対応 Agent のデプロイ

Agent をデプロイする前に、次の要件を満たしていることを確認してください。

1. インストールに進む前に、[Agent インストール手順][5]を環境に合わせてカスタマイズしてください。
2. Cloud Security を有効にした状態で Agent をインストールまたは更新してください。手順は [Agent での Cloud Security のセット アップ][4] を参照してください。
3. 前述の **eBPF 非対応 Agent のセット アップ** セクションにある追加の構成を指定して、カスタム バージョンをインストールし、eBPF 非対応モードを有効にしてください。


## セットアップの検証

Agent のインストールとセットアップを検証するには、Linux ホストまたは Docker コンテナに接続して次のコマンドを実行します。

```shell
sudo /opt/datadog-agent/embedded/bin/system-probe config|grep -A 1 ebpfless
```

次の出力が表示されるはずです。

```
  ebpfless:
    enabled: true
```

## eBPF 非対応 Agent を使ったアプリケーション トレーシングのセット アップ

eBPF 非対応 Agent をインストールし、eBPF 非対応モードを有効にしたら、アプリケーションのトレーシング方法を設定できます。このセクションでは、2 通りの方法を説明します。

- **ラップ モード:** (推奨) このモードでは、アプリケーションは Datadog ラッパーによって起動され、ptrace を用いて開始時点からトレーシングされます。
  - 生成された子プロセスもすべてトレーシングされます。
  - seccomp プロファイルを適用して、ptrace のオーバーヘッドを大幅に削減します。
- **アタッチ モード:** このモードでは、アプリケーション プロセスにアタッチする PID のリストを指定できます。これを行うまではアプリケーションは ptrace によるトレーシングが行われないため、速やかに指定してください。
  - このモードでは seccomp プロファイルは適用できません。そのため、ptrace のオーバーヘッドがわずかに発生します。

どちらのモードでも、Datadog Agent に同梱されている **cws-instrumentation** バイナリを使用します。場所は `/opt/datadog-agent/embedded/bin/cws-instrumentation` です。

<div class="alert alert-info">
このトレーサーは、localhost 上でポート 5678 を使用して system-probe（Datadog Agent の一部）と通信します。system-probe のアドレスは、cws-instrumentation の <code>--probe-addr=host:port</code> オプションで設定できます。サーバー側アドレスは、Agent の設定ファイル <code>/etc/datadog-agent/system-probe.yaml</code> の runtime_security_config.ebpfless.socket オプションで設定できます。
</div>

{{< tabs >}}
{{% tab "ラップ モード" %}}
ラップ モードでは、Datadog ラッパーがアプリケーションを起動します。例:

```shell
sudo /opt/datadog-agent/embedded/bin/cws-instrumentation trace -- /usr/bin/your_application
```

アプリケーションを非ルートで実行する場合は、uid/gid を数値で指定します。

```shell
sudo /opt/datadog-agent/embedded/bin/cws-instrumentation trace --uid 100 --gid 100 -- /usr/bin/your_application
```

<div class="alert alert-info">アプリケーションは、cws-instrumentation が Datadog Agent との接続を初期化するまで開始されません。</div>

以下の例では、トレーサーを各種デプロイメント タイプのアプリケーションにどのように統合できるかを示します。

<div class="alert alert-info">3.4 系の古いカーネルでは seccomp プロファイルは利用できないため、<code>--disable-seccomp</code> オプションで無効化してください。</div>

#### Linux の systemd サービス

すでに init スクリプトがある場合に、必要な変更を行うための簡単な例を以下に示します。

```shell
   [Unit]
   Description=My application
   After=datadog-agent-sysprobe.service

   [Service]
   ExecStart=/opt/datadog-agent/embedded/bin/cws-instrumentation trace -- /usr/bin/myapp
   Restart=on-failure

   [Install]
   WantedBy=multi-user.target
```

#### Linux sysvinit を使ったサービス

すでに init スクリプトがある場合に、必要な変更を行うための簡単な例を以下に示します。

```shell
#!/bin/sh
set -e
### BEGIN INIT INFO
# Provides:           my_app
# Required-Start:     $network
# Required-Stop:      $network
# Default-Start:      2 3 4 5
# Default-Stop:       0 1 6
# Short-Description:  My application
# Description: My application
### END INIT INFO

# サービスを開始する
start() {
        echo "Starting my app"
        /opt/datadog-agent/embedded/bin/cws-instrumentation trace -- /usr/bin/myapp &
}


# サービスを停止する
stop() {
       echo "Stopping my app"
    pkill -f /usr/bin/myapp
}

### メインロジック ###
case "$1" in
  start)
        start
        ;;
  stop)
        stop
        ;;
  restart)
        stop
        start
        ;;
  *)
        echo $"Usage: $0 {start|stop|restart}"
        exit 1
esac

exit 0
```

#### Docker

Docker を使ってアプリケーションをデプロイしている場合は、Dockerfile を修正して、アプリケーションを次のようにラップする必要があります。

```shell
FROM gcr.io/datadoghq/agent:7 AS datadogagent

FROM ubuntu:latest

COPY --from=datadogagent /opt/datadog-agent/embedded/bin/cws-instrumentation .

ENTRYPOINT ["/cws-instrumentation", "trace", "--"]

CMD ["/bin/bash", "-c", "while true; do sleep 1; echo my app is running; done"]
```

Docker アプリケーションを実行する際は、`docker run` に `--cap-add=SYS_PTRACE` を付与して、必要なケーパビリティを有効化することが重要です。

また、次のいずれかの方法で、コンテナをポート 5678 で Datadog に接続する必要があります。

- 両方のコンテナを `--network host` オプションで起動します。
- [Docker network][6] 機能を使って、両方のコンテナを同じブリッジ ネットワーク上で実行します。

{{% /tab %}}

{{% tab "アタッチモード" %}}
アタッチモードには以下の制限があるため、ラップモードが推奨されています。

- Datadog がアタッチするまで、アプリケーションの初期化処理はすべてトレーシングされません。
- - アタッチ時は、Datadog は seccomp プロファイルを設定できません。
- パフォーマンス オーバーヘッドが大きい。
- トレーシング対象のアプリケーションが再起動した場合は、トレーサーも再起動されるよう Datadog 側で確実に制御する必要があります。

アタッチモードはラップモードとは異なり、次のようにすでに実行中のアプリケーションにトレーサーを直接アタッチします。

```shell
sudo /opt/datadog-agent/embedded/bin/cws-instrumentation trace --pid 2301
```

同時に複数の PID を指定してアタッチできます。

```shell
sudo /opt/datadog-agent/embedded/bin/cws-instrumentation trace --pid 2301 --pid 2302 --pid 2303
```

以下の例では、トレーサーをさまざまなデプロイメントタイプのアプリケーション内にどのように統合できるかを示しています。

#### Linux systemd を使ったサービス

すでに init スクリプトがある場合に、新しい systemd サービスを使ってラッパーを統合する方法の一例を以下に示します。

```shell
[Unit]
Description=Datadog CWS instrumentation attach to my application
After=datadog-agent-sysprobe.service my-app.service

[Service]
ExecStart=/bin/bash -c "/opt/datadog-agent/embedded/bin/cws-instrumentation trace $(for pid in $(pidof myapp); do echo --pid $pid; done)"
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

#### Linux sysvinit を使ったサービス

すでに init スクリプトがある場合に、新しい sysvinit サービスを使ってトレーサーを統合する方法の一例を以下に示します。

```shell
#!/bin/sh
set -e
### 初期化情報の開始
# Provides:           dd_tracing_my_app
# Required-Start:     $network
# Required-Stop:      $network
# Default-Start:      2 3 4 5
# Default-Stop:       0 1 6
# Short-Description:  Datadog tracing of my application
# Description: Datadog tracing of my application
### 初期化情報の終了

# サービスを開始する
start() {
        echo "Starting tracing my app"
        /opt/datadog-agent/embedded/bin/cws-instrumentation trace $(for pid in $(pidof myapp); do echo --pid $pid; done) &
}


# サービスを停止する
stop() {
       echo "Stopping my app"
    pkill -f /opt/datadog-agent/embedded/bin/cws-instrumentation
}

### メインロジック ###
case "$1" in
  start)
        start
        ;;
  stop)
        stop
        ;;
  restart)
        stop
        start
        ;;
  *)
        echo $"Usage: $0 {start|stop|restart}"
        exit 1
esac

exit 0
```

#### Docker

アプリケーションを実行中の Docker イメージにラッパーをアタッチするには、次の Dockerfile を使用します。

```shell
FROM gcr.io/datadoghq/agent:7

ENTRYPOINT ["/opt/datadog-agent/embedded/bin/cws-instrumentation", "trace", "--pid", "$PID"]
```

次に、Docker 接続用のホスト PID を環境変数として指定してください。

アプリケーションにアタッチするには、以下の作業が必要です。

- Docker アプリケーションを実行する際に、`docker run` コマンドに `--cap-add=SYS_PTRACE` を追加して、必要な機能を追加する。
- 以下のいずれかの方法で、アプリケーションコンテナがポート 5678 で Datadog コンテナに到達できることを確認する。
  - 両方のコンテナを `--network` host オプションで起動する。
  - [Docker ネットワーク][6]機能を使用して、両方のコンテナを同じブリッジネットワーク上で実行する。
- アプリケーション コンテナが（Datadog Agent と同様に）ホストの PID ネームスペースで動作するよう、次のオプションを追加してください: `--cgroupns host --pid host`
{{% /tab %}}
{{< /tabs >}}



[1]: https://ebpf.io/what-is-ebpf/
[2]: https://github.com/DataDog/datadog-agent
[3]: /ja/security/guide/aws_fargate_config_guide/?tab=amazonecs
[4]: /ja/security/cloud_security_management/setup/agent
[5]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
[6]: https://docs.docker.com/network/