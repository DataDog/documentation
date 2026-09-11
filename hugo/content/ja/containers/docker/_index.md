---
aliases:
- /ja/guides/basic_agent_usage/docker/
- /ja/agent/docker
- /ja/agent/basic_agent_usage/docker/
- /ja/integrations/docker_daemon/
- /ja/docker/
description: Docker コンテナおよびコンテナランタイム用の Datadog Agent をインストールして構成する
further_reading:
- link: https://app.datadoghq.com/release-notes?category=Container%20Monitoring
  tag: リリースノート
  text: Datadog コンテナの最新リリースをチェックしてください。(アプリログインが必要です)
- link: /agent/docker/log/
  tag: よくあるご質問
  text: アプリケーションログの収集
- link: /agent/docker/apm/
  tag: よくあるご質問
  text: アプリケーショントレースの収集
- link: /agent/docker/prometheus/
  tag: よくあるご質問
  text: Prometheus メトリクスの収集
- link: /agent/docker/integrations/
  tag: よくあるご質問
  text: アプリケーションのメトリクスとログを自動的に収集する
- link: /agent/guide/autodiscovery-management/
  tag: よくあるご質問
  text: データ収集をコンテナのサブセットのみに制限
- link: /agent/docker/tag/
  tag: よくあるご質問
  text: コンテナから送信された全データにタグを割り当て
- link: https://learn.datadoghq.com/courses/agent-on-docker
  tag: ラーニングセンター
  text: Docker 上の Agent
title: Docker、containerd、Podman に対応した Docker Agent
---
## 概要 {#overview}

Datadog Docker Agent は、Docker、containerd、Podman ランタイムに対応した [Datadog Agent][1] です。サポートされている Docker バージョンについては、[サポート対象のプラットフォーム][2] を参照してください。

## Datadog Docker Agent をインストールする {#install-the-datadog-docker-agent}
[Datadog のインアプリインストールのフロー][3] の手順に従います。これは推奨されるフローです。API キー、最小必要構成、およびさまざまな Datadog 機能のトグルを使用して `docker run` コマンドを作成するのに役立ちます。

{{< img src="/agent/basic_agent_usage/agent_install_docker.png" alt="Docker に Datadog Agent をインストールするためのアプリ内手順。" style="width:90%;">}}

## Datadog Docker Agent を手動で実行する {#manually-run-the-datadog-docker-agent}

Fleet Automation フローは、Datadog の推奨手順に従って Datadog Agent コンテナを構成するのに役立ちます。これを手動で構成する場合は、以下の例を参照してください。

モニターするホストごとに 1 回ずつ Agent を Docker コンテナとして実行するには、次のコマンドを使用します。`<DATADOG_API_KEY>` をご使用の Datadog API キーに置き換え、`<DATADOG_SITE>` をご使用の {{< region-param key=dd_site code="true" >}}に置き換えます。

{{< tabs >}}
{{% tab "Linux" %}}

```shell
docker run -d --cgroupns host --pid host --name dd-agent \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  -v /proc/:/host/proc/:ro \
  -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
  -e DD_SITE=<DATADOG_SITE> \
  -e DD_API_KEY=<DATADOG_API_KEY> \
  registry.datadoghq.com/agent:7
```
{{% /tab %}}
{{% tab "Windows" %}}
Datadog Agent は、Windows Server 2019 (LTSC) と Windows Server 2022 (LTSC) でサポートされています。次の PowerShell コマンドは Datadog Agent コンテナを実行します。

```powershell
docker run -d --name dd-agent `
  -v \\.\pipe\docker_engine:\\.\pipe\docker_engine `
  -e DD_SITE=<DATADOG_SITE> `
  -e DD_API_KEY=<DATADOG_API_KEY> `
  registry.datadoghq.com/agent:7
```
{{% /tab %}}
{{< /tabs >}}

**注**: Docker Compose については、[Compose と Datadog Agent][4] を参照してください。Podman に Datadog Agent をデプロイする手順については、[Podman コンテナランタイムとの Docker インテグレーションの使用][5] を参照してください。

## インテグレーション {#integrations}

Datadog Docker Agent が起動し、実行状態になったら、[Datadog インテグレーションを構成][6] して、アプリケーションコンテナからメトリクスとログを自動的に収集できます。Datadog の [コンテナ Autodiscovery][7] を使用すると、コンテナ化されたシステムの動的リソースに対するモニター構成を定義できます。

## Datadog Docker Agent の構成オプション {#configuration-options-for-the-datadog-docker-agent}

### コンテナレジストリ {#container-registries}

イメージは 64-bit x86 と Arm v8 アーキテクチャで利用可能です。Datadog では、Datadog コンテナレジストリ、GAR (Google Artifact Registry)、Amazon ECR、Azure ACR、および Docker Hub にコンテナイメージを公開しています。

{{% container-images-table %}}

デフォルトでは、上記の手順は Datadog コンテナレジストリ (`registry.datadoghq.com`) からイメージをプルします。このレジストリを使用する場合は、ファイアウォールで `us-docker.pkg.dev/datadog-prod/public-images` へのトラフィックが許可されていることを確認してください。これは、レジストリがこの URL にリクエストをリダイレクトすることがあるためです。

<div class="alert alert-warning">Docker Hub はイメージプルレート制限の対象です。Docker Hub をご利用でない場合は、別のレジストリから取得するように構成を更新することをお勧めします。その手順については、<a href="/agent/guide/changing_container_registry">コンテナのレジストリを変更する</a>を参照してください。</div>

### 環境変数 {#environment-variables}

コンテナ化されていない環境では、Datadog Agent の構成オプションは [`datadog.yaml`][8] で設定されます。Datadog Docker Agent の場合は、環境変数を使用して `datadog.yaml` 構成オプションを設定できます。

#### グローバルオプション {#global-options}

`DD_API_KEY`
: ご使用の Datadog API キー (**必須**)。

`DD_ENV`
: 出力されるすべてのデータにグローバルタグの `env` を設定します。

`DD_HOSTNAME`
: メトリクスに使用するホスト名 (自動検出が失敗した場合)。

`DD_HOSTNAME_FILE`
: 環境によっては、ホスト名の自動検出では十分でなく、環境変数で値を設定できない場合があります。そのような場合、ホスト上のファイルを使用して適切な値を提供することができます。`DD_HOSTNAME` が空でない値に設定されている場合、このオプションは無視されます。

`DD_TAGS`
: ホストタグはスペースで区切ります。例: : `key1:value1 key2:value2`

`DD_SITE`
: メトリクス、トレース、およびログの送信先サイト。Datadog サイトを以下に設定します: `{{< region-param key="dd_site" >}}`. Defaults to `datadoghq.com`

`DD_DD_URL`
: メトリクス送信用 URL を上書きするためのオプションの設定。

`DD_URL`(6.36+/7.36+)
: `DD_DD_URL` のエイリアス。`DD_DD_URL` がすでに設定されている場合は無視されます。

`DD_CHECK_RUNNERS`
: Agent はデフォルトですべてのチェックを同時に実行します (デフォルト値は `4` ランナーです)。チェックを順次実行する場合は、値を `1` に設定します。多数のチェック (または時間のかかるチェック) を実行する必要がある場合、`collector-queue` コンポーネントが遅延して、ヘルスチェックに失敗する可能性があります。ランナーの数を増やすと、チェックを並行して実行できます。

`DD_APM_ENABLED`
: トレース収集を有効にします。デフォルトは `true` です。トレース収集の追加環境変数について詳しくは、[Docker アプリケーションのトレース][9] をご覧ください。

`DD_LOGS_CONFIG_EXPECTED_TAGS_DURATION`
: 環境によっては、ホストからの最初のログに正しいタグが含まれないことがあります。新しいホストのタグがログに含まれていない場合は、この環境変数を含めて `"10m"` に設定してください。

#### プロキシ設定 {#proxy-settings}

Agent v6.4.0 (トレース Agent の場合は v6.5.0) より、以下の環境変数を使用して Agent のプロキシ設定を上書きできるようになりました。

`DD_PROXY_HTTP`
: `http` リクエスト用のプロキシとして使用する HTTP URL です。

`DD_PROXY_HTTPS`
: `https` リクエスト用のプロキシとして使用する HTTPS URL です。

`DD_PROXY_NO_PROXY`
: プロキシを使用すべきではない場合に必要となる、URL をスペースで区切ったリストです。

プロキシ設定の詳細については、[Agent v6 Proxy のドキュメント][10] を参照してください。

#### オプションの収集 Agent {#optional-collection-agents}

セキュリティまたはパフォーマンス上の理由により、オプションの収集 Agent はデフォルトで無効になっています。有効にするには、以下の環境変数を使用します。

`DD_APM_NON_LOCAL_TRAFFIC`
: [他のコンテナからのトレース][11] 時に非ローカルなトラフィックを許可します。

`DD_LOGS_ENABLED`
: ログ Agent による [ログの収集][12] を有効にします。

`DD_PROCESS_CONFIG_PROCESS_COLLECTION_ENABLED`
: プロセスエージェントで [ライブプロセスの収集][13] を有効にします。Docker ソケットが利用可能な場合、[ライブコンテナビュー][14] はデフォルトですでに有効になっています。

#### DogStatsD (Custom Metrics) {#dogstatsd-custom-metrics}

Custom Metrics を [StatsD プロトコル][15] を使用して送信します。

`DD_DOGSTATSD_NON_LOCAL_TRAFFIC`
: ほかのコンテナからの DogStatsD パケットをリスニングします (Custom Metrics の送信に必要)。

`DD_HISTOGRAM_PERCENTILES`
: 計算するヒストグラムのパーセンタイル (スペース区切り)。デフォルトは `0.95` です。

`DD_HISTOGRAM_AGGREGATES`
: 計算するヒストグラムの集計 (スペース区切り)。デフォルトは `"max median avg count"` です。

`DD_DOGSTATSD_SOCKET`
: リスニングする UNIX ソケットのパス。`rw` でマウントされたボリューム内にある必要があります。

`DD_DOGSTATSD_ORIGIN_DETECTION`
: UNIX ソケットのメトリクス用にコンテナの検出とタグ付けを有効にします。

`DD_DOGSTATSD_TAGS`
: この DogStatsD サーバーが受信するすべてのメトリクス、イベント、サービスのチェックに付加する追加タグ。例: : `"env:golden group:retrievers"`

`DD_USE_DOGSTATSD`
: DogStatsD ライブラリからの Custom Metrics の送信を有効または無効にします。
詳しくは、[Unix ドメインソケット上の DogStatsD][16] を参照してください。

#### タグ付け {#tagging}

Datadog ではベストプラクティスとして、タグを割り当てるときに [unified service tagging][17] を使用することをお勧めします。

Datadog は Docker、Kubernetes、ECS、Swarm、Mesos、Nomad、Rancher から一般的なタグを自動的に収集します。さらに多くのタグを抽出するには、次のオプションを使用します。

`DD_CONTAINER_LABELS_AS_TAGS`
: コンテナラベルを抽出します。この環境は `DD_DOCKER_LABELS_AS_TAGS` と同等です。

`DD_CONTAINER_ENV_AS_TAGS`
: コンテナ環境変数を抽出します。この環境は `DD_DOCKER_ENV_AS_TAGS` と同等です。

`DD_COLLECT_EC2_TAGS`
: AWS インテグレーションを使用せずに、カスタム EC2 タグを抽出します。

詳細については、[Docker タグの抽出][18] ドキュメントを参照してください。

#### シークレットファイルの使用 {#using-secret-files}

インテグレーションの資格情報を Docker や Kubernetes のシークレットに格納し、Autodiscovery テンプレートで使用できます。詳細については、[機密情報管理のドキュメント][19] を参照してください。

#### コンテナの無視 {#ignore-containers}

ログの収集、メトリクスの収集、Autodiscovery からコンテナを除外します。Datadog はデフォルトで Kubernetes と OpenShift の `pause` コンテナを除外します。これらの許可リストとブロックリストは Autodiscovery にのみ適用され、トレースと DogStatsD には影響しません。これらの環境変数の値には、正規表現を使用できます。

`DD_CONTAINER_INCLUDE`
: 処理対象に含めるコンテナの許可リスト (スペース区切り)。すべてを含める場合は `.*` を使用します。例: : `"image:image_name_1 image:image_name_2"`、`image:.*`。OpenShift 環境内で ImageStreams を使用する場合は、イメージの代わりにコンテナ名を使用してください。例: : `"name:container_name_1 name:container_name_2"`、`name:.*`

`DD_CONTAINER_EXCLUDE`
: 処理対象から除外するコンテナのブロックリスト (スペース区切り)。すべてを除外する場合は `.*` を使用します。例: : `"image:image_name_3 image:image_name_4"`、`image:.*` (**注**: この変数は Autodiscovery に対してのみ有効です。)

`DD_CONTAINER_INCLUDE_METRICS`
: メトリクスを含めるコンテナの許可リスト。

`DD_CONTAINER_EXCLUDE_METRICS`
: メトリクスを除外するコンテナのブロックリスト。

`DD_CONTAINER_INCLUDE_LOGS`
: ログを含めるコンテナの許可リスト。

`DD_CONTAINER_EXCLUDE_LOGS`
: ログを除外するコンテナのブロックリスト。

`DD_AC_INCLUDE`
: **非推奨**:処理対象に含めるコンテナの許可リスト (スペース区切り)。すべてを含める場合は `.*` を使用します。例: : `"image:image_name_1 image:image_name_2"`、`image:.*`

`DD_AC_EXCLUDE`
: **非推奨**:処理対象から除外するコンテナのブロックリスト (スペース区切り)。すべてを除外する場合は `.*` を使用します。例: `"image:image_name_3 image:image_name_4"`、`image:.*` (**注**: この変数は Autodiscovery に対してのみ有効です。)

その他の例は [コンテナのディスカバリー管理][20] ページでご確認いただけます。

**注**: `kubernetes.containers.running`、`kubernetes.pods.running`、`docker.containers.running`、`.stopped`、`.running.total`、および `.stopped.total` メトリクスはこれらの設定の影響を受けません。すべてのコンテナを対象とします。これは、コンテナ単位の課金には影響しません。

**注**: containerd を使用する場合、`DD_CONTAINERD_NAMESPACES` と `DD_CONTAINERD_EXCLUDE_NAMESPACES` を使用すると、ネームスペースでコンテナを無視することができます。どちらもスペース区切りのネームスペースのリストです。`DD_CONTAINERD_NAMESPACES` が設定されている場合、Agent はリストに存在するネームスペースに属するコンテナのデータを報告します。`DD_CONTAINERD_EXCLUDE_NAMESPACES` が設定されている場合、Agent はリストのネームスペースに属するものを除く、すべてのコンテナのデータをレポートします。

#### Autodiscovery {#autodiscovery}

`DD_LISTENERS`
: 実行する Autodiscovery リスナー。

`DD_EXTRA_LISTENERS`
: 実行する追加の Autodiscovery リスナー。これは `datadog.yaml` 構成ファイルの `listeners` セクションで定義された変数に加えて追加されます。

`DD_CONFIG_PROVIDERS`
: Agent がチェック構成を収集するために呼び出す必要があるプロバイダー。デフォルトのプロバイダーは `docker` です。Docker プロバイダーはコンテナラベルに埋め込まれたテンプレートを処理します。

`DD_EXTRA_CONFIG_PROVIDERS`
: 使用する追加の Autodiscovery 構成プロバイダー。これは `datadog.yaml` 構成ファイルの `config_providers` セクションで定義された変数に加えて追加されます。

#### その他 {#miscellaneous}

`DD_PROCESS_AGENT_CONTAINER_SOURCE`
: コンテナソースの自動検出を上書きして、1 つのソースに制限します。たとえば、`"docker"`、`"ecs_fargate"`、`"kubelet"` です。Agent v7.35.0 以降では不要になりました。

`DD_HEALTH_PORT`
: これを `5555` に設定すると、Agent のヘルスチェックをポート `5555` で公開します。

## コマンド {#commands}

すべての Docker Agent コマンドは [Agent コマンドガイド][21] でご確認いただけます。

## 収集データ {#data-collected}

### メトリクス {#metrics}

デフォルトで、Docker Agent はメトリクスを以下の主要なチェックで収集します。ほかのテクノロジーからメトリクスを収集する方法については、[インテグレーション](#integrations)セクションを参照してください。

| チェック       | メトリクス       |
| ----------- | ------------- |
| コンテナ   | [メトリクス][22] |
| CPU         | [システム][23]  |
| ディスク        | [ディスク][24]    |
| Docker      | [Docker][25]  |
| ファイルハンドル | [システム][23]  |
| IO          | [システム][23]  |
| 負荷        | [システム][23]  |
| メモリ      | [システム][23]  |
| ネットワーク     | [ネットワーク][26] |
| NTP         | [NTP][27]     |
| アップタイム      | [システム][23]  |

### イベント {#events}

Agent の起動または再起動の際に、Docker Agent はイベントを Datadog に送信します。

### サービスチェック {#service-checks}

**datadog.agent.up** <br>
Agent が Datadog に接続できない場合は `CRITICAL` を返し、それ以外の場合は `OK` を返します。

**datadog.agent.check_status** <br>
Agent チェックが Datadog にメトリクスを送信できない場合は `CRITICAL` を返し、それ以外の場合は `OK` を返します。

## Single Step APM Instrumentation のアンインストール {#uninstall-single-step-apm-instrumentation}

Single Step APM Instrumentation とともに Datadog Docker Agent をインストールしていて、Agent をアンインストールする場合は、APM Instrumentation をアンインストールするために [追加のコマンドを実行][28] する必要があります。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/agent/
[2]: /ja/agent/supported_platforms/?tab=cloudandcontainers
[3]: https://app.datadoghq.com/account/settings/agent/latest?platform=docker
[4]: /ja/containers/guide/compose-and-the-datadog-agent/
[5]: /ja/containers/guide/podman-support-with-docker-integration/
[6]: /ja/containers/docker/integrations/
[7]: /ja/getting_started/containers/autodiscovery
[8]: /ja/agent/configuration/agent-configuration-files/#agent-main-configuration-file
[9]: /ja/containers/docker/apm/
[10]: /ja/agent/configuration/proxy/#agent-v6
[11]: /ja/containers/docker/apm/?tab=linux#tracing-from-other-containers
[12]: /ja/containers/docker/log/
[13]: /ja/infrastructure/process/
[14]: /ja/infrastructure/livecontainers/
[15]: /ja/extend/dogstatsd/
[16]: /ja/extend/dogstatsd/unix_socket/
[17]: /ja/getting_started/tagging/unified_service_tagging/?tab=docker
[18]: /ja/containers/docker/tag
[19]: /ja/agent/configuration/secrets-management/?tab=linux
[20]: /ja/containers/guide/container-discovery-management/?tab=containerizedagent
[21]: /ja/agent/configuration/agent-commands/
[22]: /ja/integrations/container/
[23]: /ja/integrations/system/#metrics
[24]: /ja/integrations/disk/#metrics
[25]: /ja/containers/docker/data_collected/#metrics
[26]: /ja/integrations/network/#metrics
[27]: /ja/integrations/ntp/#metrics
[28]: /ja/tracing/trace_collection/automatic_instrumentation/single-step-apm/docker/#remove-single-step-apm-instrumentation-from-your-agent