---
disable_toc: false
title: eBPF サポートなしの Linux 向け脅威検知
---
このガイドでは、AWS Fargate など、eBPF が無効な環境向けに Workload Protection の eBPF-less ソリューションをセットアップする方法を説明します。eBPF-less ソリューションでは、ptrace ベースの Datadog Agent を使用します。

このガイドでは、ptrace ソリューションの利点についてもいくつか説明します。

## Agent オプションの概要 {#summary-of-agent-options}

Workload Protection には、脅威検知と対応のための 2 つの Agent オプションが含まれています。

- eBPF ソリューション
- ptrace を使用した eBPF-less ソリューション: このバージョンは、eBPF が使用できない環境 (Linux カーネルバージョン 3.4〜4.14) でのみ利用可能です。

{{% collapse-content title="eBPF ソリューション" level="h3" %}}

Datadog は、すべてのセキュリティ製品を [eBPF (拡張された Berkeley Packet Filter)][1] を中心に構築しています。eBPF の利点の一部を以下に示します。

- eBPF は、Linux カーネルベリファイアを通じて各プログラムを検証することで安全性を向上させます。これにより、プログラムがクラッシュしたり、無限ループに陥ったり、システムに損害を与えたりすることがなくなります。
- eBPF は JIT (Just In Time) コンパイルされ、出力されたバイトコードは eBPF VM サンドボックス上で実行されます。これにより、カーネルのクラッシュを防ぎ、競争力のあるパフォーマンスを提供します。
- デバッグと保守が容易で、プログラムを動的にロードでき、ユーザー空間をトレースするために必要なすべての情報にアクセスできます。

Datadog eBPF Agent のコードは [完全にオープンソース][2] です。

{{% /collapse-content %}}

{{% collapse-content title="ptrace を使用した eBPF-less ソリューション" level="h3" %}}
一部の環境では、eBPF をまったく搭載していない古いカーネルのインスタンスが使用されています。ptrace ソリューションは、これらの環境向けに提供されています。

以下の機能は eBPF-less Agent では使用できません。

- セキュリティプロファイル。提供内容:
  - 異常検知
  - シグナルトリアージのための通常動作の自動抑制
  - マルウェア検出
- ネットワーク検出

<div class="alert alert-info">現在の実装は amd64 および arm64 アーキテクチャと ABI をサポートしていますが、32 ビット ABI に拡張することも可能です。</div>

### ptrace ソリューションの利点 {#advantages-of-ptrace-solution}

ptrace ベースのソリューションは、堅牢な脅威検知と安定したサービス可用性のバランスを実現します。ptrace ベースのソリューションには、以下のような利点があります。

- 正確なプロセス制御: ptrace はメモリとレジスタの詳細な検査を提供し、重要なアプリケーションワークロードを保護します。このきめ細かい可視性は、高度な脅威を特定するために不可欠です。Datadog procfs (プロセスファイルシステム) スキャナーは、システム全体のすべての実行を監視し、悪意のあるプロセスをピンポイントで終了させることができます。これらのツールは連携して、悪意のあるアクティビティから保護します。
- 運用上の安定性: ユーザー空間で動作する ptrace は、カーネル空間の複雑さやリスクを回避し、より安全で管理しやすいアプローチを提供します。障害が発生した場合、ptrace ベースの Agent は OS レイヤーでデフォルトの fail-open 状態になり、アプリケーションがハングアップしてもシステムに影響を与えません。
- パフォーマンス効率: Datadog のエンジニアリングチームが実施した最近のベンチマークでは、Datadog の ptrace ベースの実装がカーネルベースのソリューションと同等のパフォーマンスを示すことが実証されています。具体的には、PostgreSQL ワークロードに対して約 3% という最小限のオーバーヘッドしか発生せず、Redis の操作に対する影響も無視できる程度であるため、ほとんどのユースケースで非常に効率的です。
- オープンソースによる検証: Datadog は ptrace ベースの Agent と eBPF Agent をオープンソース化しており、クライアントやセキュリティコミュニティがその安全性と有効性を自ら検証できるため、ソリューションの透明性と信頼性が高まります。
{{% /collapse-content %}}


## eBPF-less Agent のセットアップ {#ebpf-less-agent-setup}

eBPF-less Agent は、Docker や Linux ホストなど、さまざまなプラットフォームにセットアップできます。

このセクションでは、Docker および Linux ホストについて説明します。eBPF が無効になっている Amazon Fargate 環境をセットアップする手順については、[Datadog Security を使用するための AWS Fargate 構成ガイド][3] を参照してください。

### eBPF-less Agent の要件 {#ebpf-less-agent-requirements}

- eBPF-less Agent は、eBPF が無効な環境向けに設計されており、ランタイムセキュリティに ptrace を使用します。また、arm64/amd64 アーキテクチャをサポートしています。
- eBPF-less Agent をデプロイするには、カスタムインストールコマンドおよび構成が必要です。このセクションでは、Docker および Linux ホストへのインストールに関する具体的な手順を説明します。

eBPF-less ソリューションには、アプリケーション用に 2 つのトレーシングモードが含まれています。

- ラップモード: アプリケーションを最初からトレースします。
- アタッチモード: すでに実行中のアプリケーションにアタッチしますが、パフォーマンスのオーバーヘッドと制限が増加します。

### eBPF-less のセットアップ手順 {#ebpf-less-setup-steps}

{{< tabs >}}
{{% tab "Docker" %}}
Docker では追加の環境変数が必要です。Docker インストールコマンドに次の行を追加します。

```shell
-e DD_RUNTIME_SECURITY_CONFIG_EBPFLESS_ENABLED=true
```

対応するコマンドは次のとおりです。

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
  registry.datadoghq.com/agent:7
```
{{% /tab %}}

{{% tab "Linux ホスト" %}}
Linux ホストに Agent をインストールするには、次のインストールスクリプトを使用してカスタムビルドをインストールします。

```shell
DD_API_KEY=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX DD_SITE="datadoghq.com" \
DD_RUNTIME_SECURITY_CONFIG_ENABLED=true \
bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
```

次に、`/etc/datadog-agent/system-probe.yaml` ファイルを変更して、次のように CWS と eBPF-less モードを有効にします。

{{< code-block lang="java" filename="system-probe.yaml" disable_copy="false" collapsible="true" >}}
runtime_security_config:
  enabled: true
  ebpfless:
    enabled: true
{{< /code-block >}}

または、`.deb/.rmp` が提供するカスタムビルドパッケージを手動でインストールするには、`/etc/datadog-agent/system-probe.yaml` ファイルを変更して、次のように CWS と eBPF-less モードを有効にします。

{{< code-block lang="java" filename="system-probe.yaml" disable_copy="false" collapsible="true" >}}
runtime_security_config:
  enabled: true
  ebpfless:
    enabled: true
{{< /code-block >}}
{{% /tab %}}

{{< /tabs >}}





## eBPF-less Agent をデプロイする {#deploy-ebpf-less-agent}

Agent をデプロイする前に、以下の構成要件を満たしていることを確認してください。

1. [Agent インストール手順][5] をカスタマイズしてからインストールに進みます。
2. Cloud Security を有効にして Agent をインストール/更新します。手順については、[Agent での Cloud Security のセットアップ][4] を参照してください。
3. 前述の **eBPF-less Agent のセットアップ**セクションから追加構成を指定して、カスタムバージョンをインストールし、eBPF-less Agent モードを有効にします。


## セットアップを検証する {#verify-setup}

エージェントのインストールとセットアップを検証するには、Linux ホストまたは Docker コンテナに接続し、以下を実行します。

```shell
sudo /opt/datadog-agent/embedded/bin/system-probe config|grep -A 1 ebpfless
```

次のような出力が表示されるはずです。

```
  ebpfless:
    enabled: true
```

## eBPF-less Agent を使用してアプリケーショントレーシングをセットアップする {#set-up-application-tracing-with-ebpf-less-agent}

eBPF-less Agent がインストールされ、eBPF-Free モードを使用するようにセットアップされたら、アプリケーションのトレース方法をセットアップできます。このセクションでは、2 つの異なる方法を紹介します。

- **ラップモード:** (推奨) このモードでは、アプリケーションは Datadog ラッパーによって起動され、ptrace を使用して最初からトレースされます。
  - 生成されたすべての子プロセスもトレースされます。
  - seccomp プロファイルが適用され、ptracing のオーバーヘッドが大幅に削減されます。
- **アタッチモード:** このモードでは、アタッチするアプリケーションプロセスの PID リストを指定できます。これが完了するまでアプリケーションの ptrace は実行されないため、迅速に行う必要があります。
  - このモードでは、seccomp プロファイルを適用できません。その結果、少量の ptracing オーバーヘッドが発生します。

どちらのモードも、Datadog Agent にパッケージ化され、`/opt/datadog-agent/embedded/bin/cws-instrumentation` に配置されている **cws-インスツルメンテーション**バイナリを使用します。

<div class="alert alert-info">
このトレーサーは、ポート 5678 を使用して localhost 上の system-probe (Datadog Agent の一部) と通信します。system-probe のアドレスは、 <code>--probe-addr=host:port</code> cws-instrumentation オプションで構成できます。サーバーサイドのアドレスは、 <code>/etc/datadog-agent/system-probe.yaml</code> Agent 構成ファイルの runtime_security_config.ebpfless.socket オプションから更新できます。
</div>

{{< tabs >}}
{{% tab "ラップモード" %}}
ラップモードでは、Datadog ラッパーがアプリケーションを起動します。以下はその例です。

```shell
sudo /opt/datadog-agent/embedded/bin/cws-instrumentation trace -- /usr/bin/your_application
```

アプリケーションが non-root として実行される場合は、uid/gid を数値で指定してください。

```shell
sudo /opt/datadog-agent/embedded/bin/cws-instrumentation trace --uid 100 --gid 100 -- /usr/bin/your_application
```

<div class="alert alert-info">cws-instrumentation が Datadog Agent とのコネクションを初期化するまで、アプリケーションは起動しません。</div>

以下の例は、さまざまなデプロイタイプでトレーサーをアプリケーションに統合する方法を示しています。

<div class="alert alert-info">古い 3.4 カーネルでは、seccomp プロファイルは使用できないため、 <code>–disable-seccomp</code> オプションで無効にする必要があります。</div>

#### Linux systemd サービス {#linux-systemd-service}

すでに init スクリプトがある場合に必要な変更の簡単な例を以下に示します。

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

#### Linux sysvinit サービス {#linux-sysvinit-service}

すでに init スクリプトがある場合に必要な変更の簡単な例を以下に示します。

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

# Start the service
start() {
        echo "Starting my app"
        /opt/datadog-agent/embedded/bin/cws-instrumentation trace -- /usr/bin/myapp &
}


# Stop the service
stop() {
       echo "Stopping my app"
	pkill -f /usr/bin/myapp
}

### main logic ###
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

#### Docker {#docker}

Docker アプリケーションのデプロイでは、次のように Dockerfile を変更してアプリケーションをラップする必要があります。

```shell
FROM registry.datadoghq.com/agent:7 AS datadogagent

FROM ubuntu:latest

COPY --from=datadogagent /opt/datadog-agent/embedded/bin/cws-instrumentation .

ENTRYPOINT ["/cws-instrumentation", "trace", "--"]

CMD ["/bin/bash", "-c", "while true; do sleep 1; echo my app is running; done"]
```

Docker アプリケーションを実行する際は、`docker run` コマンドに `--cap-add=SYS_PTRACE` を追加して、追加の機能を付与することが重要です。

また、以下のいずれかの方法で、コンテナをポート 5678 で Datadog に接続する必要があります。

- 両方のコンテナを `--network` ホストオプションで起動します。
- [Docker ネットワーク][6] 機能を使用して、両方のコンテナを同じブリッジネットワーク上で実行します。

{{% /tab %}}

{{% tab "アタッチモード" %}}
アタッチモードには以下の制限があるため、ラップモードが推奨されます。

- Datadog がアタッチされるまでの間、アプリケーションによって行われたすべての初期化が欠落します。
- - アタッチ時、Datadog は seccomp プロファイルを設定できません。
- パフォーマンスのオーバーヘッドが増加します。
- トレース対象のアプリケーションが再起動する場合、Datadog はトレーサーも確実に再起動させる必要があります。

アタッチモードは、ラップモードとは異なり、以下のように実行中のアプリケーションにトレーサーを直接アタッチします。

```shell
sudo /opt/datadog-agent/embedded/bin/cws-instrumentation trace --pid 2301
```

複数の PID を一度にアタッチできます。

```shell
sudo /opt/datadog-agent/embedded/bin/cws-instrumentation trace --pid 2301 --pid 2302 --pid 2303
```

以下の例は、さまざまなデプロイタイプでトレーサーをアプリケーションに統合する方法を示しています。

#### Linux systemd サービス {#linux-systemd-service-1}

すでに init スクリプトがある場合に新しい systemd サービスを使用してラッパーを統合する例を以下に示します。

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

#### Linux sysvinit サービス {#linux-sysvinit-service-1}

すでに init スクリプトがある場合に新しい sysvinit サービスを使用してトレーサーを統合する例を以下に示します。

```shell
#!/bin/sh
set -e
### BEGIN INIT INFO
# Provides:           dd_tracing_my_app
# Required-Start:     $network
# Required-Stop:      $network
# Default-Start:      2 3 4 5
# Default-Stop:       0 1 6
# Short-Description:  Datadog tracing of my application
# Description: Datadog tracing of my application
### END INIT INFO

# Start the service
start() {
        echo "Starting tracing my app"
        /opt/datadog-agent/embedded/bin/cws-instrumentation trace $(for pid in $(pidof myapp); do echo --pid $pid; done) &
}


# Stop the service
stop() {
       echo "Stopping my app"
	pkill -f /opt/datadog-agent/embedded/bin/cws-instrumentation
}

### main logic ###
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

#### Docker {#docker-1}

アプリケーションを実行している Docker イメージにラッパーをアタッチするには、次の Dockerfile を使用します。

```shell
FROM registry.datadoghq.com/agent:7

ENTRYPOINT ["/opt/datadog-agent/embedded/bin/cws-instrumentation", "trace", "--pid", "$PID"]
```

次に、Docker に接続するためのホスト PID を環境変数として指定します。

アプリケーションにアタッチするには、以下が必要です。

- Docker アプリケーションを実行する際は、`docker run` コマンドに `--cap-add=SYS_PTRACE` を含めて、必要な権限を追加してください。
- 以下のいずれかの方法を使用して、アプリケーションコンテナからポート 5678 で Datadog コンテナにアクセスできるようにしてください。
  - 両方のコンテナを `--network` ホストオプションで起動します。
  - [Docker ネットワーク][6] 機能を使用して、両方のコンテナを同じブリッジネットワーク上で実行します。
- アプリケーションコンテナが (Datadog Agent と同様に) ホスト PID で実行されていることを確認するには、次のオプションを追加します。`--cgroupns host --pid host`。
{{% /tab %}}
{{< /tabs >}}



[1]: https://ebpf.io/what-is-ebpf/
[2]: https://github.com/DataDog/datadog-agent
[3]: /ja/security/guide/aws_fargate_config_guide/?tab=amazonecs
[4]: /ja/security/cloud_security_management/setup/agent
[5]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
[6]: https://docs.docker.com/network/