---
aliases:
- /ja/security/cloud_security_management/guide/ebpf-free-agent
disable_toc: false
title: eBPF をサポートしない Linux 環境の脅威検出
---

このガイドでは、AWS Fargate のような eBPF が無効な環境向けの Workload Protection eBPF 非対応ソリューションのセットアップ方法について説明します。eBPF 非対応ソリューションでは、ptrace ベースの Datadog Agent を使用します。

このガイドでは、ptrace ソリューションの利点についても説明します。

<div class="alert alert-info">eBPF 非対応の Linux 環境の脅威検出はプレビュー中です。登録をご希望の場合は、Datadog の担当者にお問い合わせください。</div>


## Agent オプションの概要

Workload Protection には、脅威の検出と対応のために 2 つの Agent オプションが用意されています。

- eBPF ソリューション
- ptrace による eBPF 非対応ソリューション: このバージョンは eBPF が利用できない場合 (Linux カーネルバージョン 3.4 から 4.14) のみ利用可能です。

{{% collapse-content title="eBPF ソリューション" level="h4" %}}

Datadog は、すべてのセキュリティ製品を [eBPF (extended Berkeley Packet Filter)][1] を中心に構築しています。eBPF の利点には次のようなものがあります。

- eBPF は、Linux カーネルベリファイアを通じて各プログラムを検証することで、安全性を向上させます。これにより、プログラムがクラッシュしたり、無限ループに陥ったり、システムに損害を与えたりする可能性がなくなります。
- eBPF は JIT (Just In Time) コンパイルされ、出力されたバイトコードはeBPF VM サンドボックス上で実行されます。これにより、カーネルのクラッシュを防ぎ、競争力のあるパフォーマンスを提供します。
- デバッグとメンテナンスが容易で、プログラムを動的にロードでき、ユーザー空間をトレースするのに必要なすべての情報にアクセスできます。

Datadog eBPF Agent のコードは[完全にオープンソース][2]です。

{{% /collapse-content %}}

{{% collapse-content title="ptrace を利用した eBPF 非対応ソリューション" level="h4" %}}
一部の環境では、eBPF をまったく持たない古いカーネルのインスタンスが使用されています。ptrace ソリューションはこうした環境用に提供されています。

以下のメトリクスは、eBPF 非対応 Agent では使用できません。

- 以下の機能を提供するセキュリティプロファイル
  - 異常検知
  - シグナルトリアージのための通常動作の自動抑制
  - マルウェアの検出
- ネットワークの検出

<div class="alert alert-info">現在の実装は amd64 と arm64 のアーキテクチャと ABI をサポートしていますが、32 ビット ABI にも拡張可能です。</div>

### ptrace ソリューションの利点

ptrace ベースのソリューションは、堅牢な脅威検知と揺るぎないサービス可用性のバランスを実現します。ptrace ベースのソリューションには以下のような利点があります。

- 正確なプロセス制御: ptraceは、メモリとレジスタの詳細な検査機能を提供し、重要なアプリケーションワークロードを保護します。この詳細な可視性は、高度な脅威を特定するのに不可欠です。Datadog procfs (Process Filesystem) スキャナーは、システム全体の実行をすべて監視し、悪意のあるプロセスを正確に終了させることが可能になります。これらのツールを組み合わせることで、悪意のあるアクティビティから保護されます。
- 運用の安定性: ユーザー空間で動作する ptrace は、カーネル空間の複雑さとリスクを回避し、より安全で管理しやすいアプローチを提供します。障害が発生した場合、ptrace ベースの Agent は OS レイヤーでフェイルオープン状態にデフォルト設定され、アプリケーションがハングアップしてもシステムは影響を受けません。
- パフォーマンス効率: Datadog のエンジニアリングチームが実施した最近のベンチマークでは、Datadog の ptrace ベースの実装がカーネルベースのソリューションに匹敵する性能を示すことが実証されています。具体的には、PostgreSQL ワークロードでは約 3% という最小限のオーバーヘッドしか発生せず、Redis のオペレーションでは無視できる程度の影響しかないため、ほとんどのユースケースで非常に効率的です。
- オープンソースによる検証: Datadog は、ptrace ベースと eBPF のAgent をオープンソース化し、クライアントとセキュリティコミュニティがその安全性と有効性を自ら検証できるようにし、ソリューションの透明性と信頼を育んでいます。
{{% /collapse-content %}}


## eBPF 非対応 Agent のセットアップ

eBPF 非対応 Agent は、Docker、Linux ホストを含むさまざまなプラットフォーム上でセットアップできます。

このセクションは、Docker および Linux ホストを対象としています。eBPF が無効な Amazon Fargate 環境のセットアップ手順については、[Datadog Security を使用するための AWS Fargate 構成ガイド][3]を参照してください。

### eBPF 非対応 Agent の要件

- eBPF 非対応 Agent は、eBPF が無効な環境向けに設計されており、ランタイムセキュリティに ptrace を使用し、arm64/amd64 アーキテクチャをサポートしています。
- eBPF 非対応 Agent をデプロイするには、カスタムのインストールコマンドと構成が必要です。このセクションでは、Docker および Linux ホストのインストールについて具体的な手順を説明します。

eBPF 非対応ソリューションには、アプリケーションのトレースモードが 2 つ用意されています。

- ラップモード: アプリケーションを最初からトレースします。
- アタッチモード: すでに実行されているアプリケーションにアタッチしますが、パフォーマンスのオーバーヘッドと制限が増えます。

### eBPF 非対応のセットアップ手順

{{< tabs >}}
{{% tab "Docker" %}}
Docker に追加の環境変数が必要です。Docker のインストールコマンドに以下の行を追加します。

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
Linux ホストに Agent をインストールするには、以下のインストールスクリプトを使用してカスタムビルドをインストールします。

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

あるいは、`.deb/.rmp` 提供のカスタムビルドパッケージを手動でインストールするには、`/etc/datadog-agent/system-probe.yaml` ファイルを次のように変更して、CWS と eBPF 非対応モードを有効にします。

{{< code-block lang="java" filename="system-probe.yaml" disable_copy="false" collapsible="true" >}}
runtime_security_config:
  enabled: true
  ebpfless:
    enabled: true
{{< /code-block >}}
{{% /tab %}}

{{< /tabs >}}





## eBPF 非対応 Agent のデプロイ

Agent をデプロイする前に、以下の構成要件を必ず実行します。

1. インストールを進める前に、[Agent インストール手順][5]をカスタマイズします。
2. [Workload Protection を有効化][4]した状態で Agent をインストールまたは更新します。
3. 前記の **eBPF 非対応 Agent のセットアップ**セクションの追加構成を指定して、カスタムバージョンをインストールし、eBPF 非対応モードを有効にします。


## セットアップの検証

Agent のインストールとセットアップを検証するには、Linux ホストまたはDocker コンテナに接続して次のコマンドを実行します。

```shell
sudo /opt/datadog-agent/embedded/bin/system-probe config|grep -A 1 ebpfless
```

次の出力が表示されるはずです。

```
  ebpfless:
    enabled: true
```

## eBPF 非対応 Agent を使ったアプリケーショントレーシングのセットアップ

eBPF 非対応Agent がインストールされ、eBPF-Free モードを使用するように設定された後、アプリケーションのトレース方法を設定することができます。このセクションでは、2つの異なる方法を提供します：

- **ラップモード:** (推奨) このモードでは、アプリケーションは Datadog ラッパーによって起動され、ptrace を使って最初からトレースされます。
  - 生成された子もすべてトレースされます。
  - seccomp プロファイルが適用され、ptracing のオーバーヘッドが大幅に削減されます。
- **アタッチモード:** このモードでは、アプリケーションプロセスにアタッチする PID のリストを指定することができます。指定が完了するまでは ptrace によるアプリケーションプロセスのトレースは行われないため、すばやく指定を行う必要があります。
  - このモードでは、seccomp プロファイルは適用できません。その結果、ptrace によるトレーシングに若干のオーバーヘッドが発生します。

どちらのモードでも、Datadog Agent にパッケージ化された **cws-instrumentation** バイナリが使用されます。これは `/opt/datadog-agent/embedded/bin/cws-instrumentation` にあります。

<div class="alert alert-info">
このトレーサーは、ポート 5678 を使用して localhost 上のシステムプローブ (Datadog Agent の一部) と通信します。システムプローブのアドレスは cws-instrumentation の <code>--probe-addr=host:port</code> オプションで設定できます。サーバー側のアドレスは、Agent の構成ファイル <code>/etc/datadog-agent/system-probe.yaml</code> の runtime_security_config.ebpfless.socket オプションで更新できます。
</div>

{{< tabs >}}
{{% tab "ラップ・モード" %}} 
ラップモードでは、Datadog ラッパーがアプリケーションを起動します。以下にサンプルコードを示します。

```shell
sudo /opt/datadog-agent/embedded/bin/cws-instrumentation trace -- /usr/bin/your_application
```

アプリケーションを非ルートで実行する場合は、uid/gid を数値で指定します。

```shell
sudo /opt/datadog-agent/embedded/bin/cws-instrumentation trace --uid 100 --gid 100 -- /usr/bin/your_application
```

<div class="alert alert-info">アプリケーションは、cws-instrumentation が Datadog Agent との接続を初期化するまで開始されません。</div>

以下の例では、トレーサーをさまざまなデプロイメントタイプのアプリケーション内にどのように統合できるかを示しています。

<div class="alert alert-info">古い 3.4 のカーネルでは、seccomp プロファイルは利用できないので、<code>-disable-seccomp</code> オプションで無効にする必要があります。</div>

#### Linux systemd を使ったサービス

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
### 初期化情報の開始
# Provides:           my_app
# Required-Start:     $network
# Required-Stop:      $network
# Default-Start:      2 3 4 5
# Default-Stop:       0 1 6
# Short-Description:  My application
# Description: My application
### 初期化情報の終了

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

Docker を使ってアプリケーションをデプロイしている場合は、Dockerfile　を修正して、アプリケーションを次のようにラップする必要があります。

```shell
FROM gcr.io/datadoghq/agent:7 AS datadogagent

FROM ubuntu:latest

COPY --from=datadogagent /opt/datadog-agent/embedded/bin/cws-instrumentation .

ENTRYPOINT ["/cws-instrumentation", "trace", "--"]

CMD ["/bin/bash", "-c", "while true; do sleep 1; echo my app is running; done"]
```

Docker アプリケーションを実行する際には、`docker run` コマンドに`--cap-add=SYS_PTRACE` を追加して、追加機能を与えることが重要です。

また、次のいずれかの方法で、コンテナをポート 5678 で Datadog に接続する必要があります。

- 両方のコンテナを `--network` host オプションで起動する。
- [Docker ネットワーク][6]機能を使用して、両方のコンテナを同じブリッジネットワーク上で実行する。

{{% /tab %}}

{{% tab "アタッチモード" %}}
アタッチモードには以下の制限があるため、ラップモードが推奨されています。

- Datadog がアタッチされるまで、アプリケーションによって行われる初期化がすべて監視対象外となる。
- - アタッチする際、Datadog は seccomp プロファイルを設定できない。
- パフォーマンスのオーバーヘッドが増える。
- トレース対象のアプリケーションが再起動した場合、Datadog も必ずトレサーを再起動しなければならない。

アタッチモードはラップモードとは異なり、次のようにすでに実行中のアプリケーションにトレーサーを直接アタッチします。

```shell
sudo /opt/datadog-agent/embedded/bin/cws-instrumentation trace --pid 2301
```

一度に複数の PID をアタッチすることができます。

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

アプリケーションを実行している Docker イメージにラッパーをアタッチするには、次の Docker ファイルを使用します。

```shell
FROM gcr.io/datadoghq/agent:7

ENTRYPOINT ["/opt/datadog-agent/embedded/bin/cws-instrumentation", "trace", "--pid", "$PID"]
```

次に、Docker に接続するためのホスト PID を環境変数として指定します。

アプリケーションにアタッチするには、以下の作業が必要です。

- Docker アプリケーションを実行する際に、`docker run` コマンドに `--cap-add=SYS_PTRACE` を追加して、必要な機能を追加する。
- 以下のいずれかの方法で、アプリケーションコンテナがポート 5678 で Datadog コンテナに到達できることを確認する。
  - 両方のコンテナを `--network` host オプションで起動する。
  - [Docker ネットワーク][6]機能を使用して、両方のコンテナを同じブリッジネットワーク上で実行する。
- アプリケーションコンテナが (Datadog Agent と同じように) 確実にホストの pid 上で実行されるように、以下のオプションを追加します: `--cgroupns host --pid host`
{{% /tab %}}
{{< /tabs >}}



[1]: https://ebpf.io/what-is-ebpf/
[2]: https://github.com/DataDog/datadog-agent
[3]: /ja/security/guide/aws_fargate_config_guide/?tab=amazonecs
[4]: https://app.datadoghq.com/security/configuration/workload/setup
[5]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
[6]: https://docs.docker.com/network/