---
aliases:
- /ja/guides/basic_agent_usage/docker/
- /ja/agent/docker
- /ja/agent/basic_agent_usage/docker/
- /ja/integrations/docker_daemon/
- /ja/docker/
description: Docker コンテナおよびコンテナランタイム用の Datadog Agent をインストールして構成します
further_reading:
- link: https://app.datadoghq.com/release-notes?category=Container%20Monitoring
  tag: リリースノート
  text: Datadog Containers の最新リリースをご覧ください！（アプリログインが必要です）。
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
  text: アプリケーションのメトリクスとログを自動的に収集します
- link: /agent/guide/autodiscovery-management/
  tag: よくあるご質問
  text: データ収集をコンテナのサブセットのみに制限
- link: /agent/docker/tag/
  tag: よくあるご質問
  text: コンテナから送信された全データにタグを割り当て
title: Docker、containerd、Podman に対応した Docker Agent
---
##  概要 {#overview}

Datadog Docker Agent は、Docker、containerd、および Podman ランタイムをサポートする [Datadog Agent][1] のバージョンです。サポートされている Docker バージョンについては、[サポートされているプラットフォーム][2] を参照してください。

##  Datadog Docker Agent をインストール {#install-the-datadog-docker-agent}
[Datadog のアプリ内インストールフロー][3] に従ってください。これは推奨されるフローで、API キー、必要な最小構成、およびさまざまな Datadog 機能のトグルを使用して `docker run` コマンドを作成するのに役立ちます。

{{< img src="/agent/basic_agent_usage/agent_install_docker.png" alt="Docker 上の Datadog Agent のアプリ内インストール手順。" style="width:90%;">}}

##  Datadog Docker Agent を手動で実行する {#manually-run-the-datadog-docker-agent}

Fleet Automation フローは、Datadog の推奨手順に従って Datadog Agent コンテナを構成するのに役立ちます。これを手動で構成するには、以下の例を参照してください。

監視したい各ホストで一度だけ Agent を Docker コンテナとして実行するには、次のコマンドを使用してください。`<DATADOG_API_KEY>` を Datadog API キーに、`<DATADOG_SITE>` をご自身の値に置き換えてください。 {{< region-param key=dd_site code="true" >}}です。

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
Datadog Agent は、Windows Server 2019 (LTSC) および Windows Server 2022 (LTSC) でサポートされています。次の PowerShell コマンドは、Datadog Agent コンテナを実行します：

```powershell
docker run -d --name dd-agent `
  -v \\.\pipe\docker_engine:\\.\pipe\docker_engine `
  -e DD_SITE=<DATADOG_SITE> `
  -e DD_API_KEY=<DATADOG_API_KEY> `
  registry.datadoghq.com/agent:7
```
{{% /tab %}}
{{< /tabs >}}

**注**: Docker Compose については、[Compose と Datadog Agent][4] を参照してください。Podman で Agent をデプロイするには、[Podman コンテナランタイムとの Docker 統合の使用][5] の手順を参照してください。

## 統合 {#integrations}

Datadog Docker Agent が起動している後は、アプリケーションコンテナからメトリクスとログを自動的に収集するために、[Datadog Integrations][6] を構成できます。Datadog の[Container Autodiscovery][7]により、コンテナ化されたシステムの動的リソースに対する監視設定を定義できます。

## Datadog Docker エージェントの設定オプション {#configuration-options-for-the-datadog-docker-agent}

### コンテナレジストリ {#container-registries}

イメージは 64-bit x86 と Arm v8 アーキテクチャで利用可能です。Datadog は、Datadog コンテナレジストリ、Google Artifact Registry (GAR)、Amazon ECR、Azure ACR、および Docker Hub にコンテナイメージを公開します:

{{% container-images-table %}}

デフォルトでは、上記の手順は Datadog コンテナレジストリ (`registry.datadoghq.com`) からイメージをプルします。このレジストリを使用する場合は、ファイアウォールが `us-docker.pkg.dev/datadog-prod/public-images` へのトラフィックを許可することを確認してください。レジストリはこの URL にリクエストをリダイレクトする可能性があります。

<div class="alert alert-warning">Docker Hub はイメージプルレート制限の対象です。Docker Hub の顧客でない場合、Datadog は別のレジストリからプルするように設定を更新することを推奨します。手順については、<a href="/agent/guide/changing_container_registry">コンテナレジストリの変更</a>を参照してください。</div>

### 環境変数 {#environment-variables}

コンテナ化されていない環境では、Datadog Agent の設定オプションは [`datadog.yaml`][8] に設定されます。Datadog Docker Agent の場合、環境変数を通じて `datadog.yaml` 設定オプションを設定できます。

#### グローバルオプション {#global-options}

`DD_API_KEY`
: あなたの Datadog API キー (**必須**)。

`DD_ENV`
: 出力されるすべてのデータにグローバル `env` タグを設定します。

`DD_HOSTNAME`
: メトリクスに使用するホスト名 (自動検出が失敗した場合)。

`DD_HOSTNAME_FILE`
: 一部の環境では、ホスト名の自動検出が不十分であり、環境変数で値を設定できません。このような場合、ホスト上のファイルを使用して適切な値を提供できます。`DD_HOSTNAME`が空でない値に設定されている場合、このオプションは無視されます。

`DD_TAGS`
: ホストタグはスペースで区切ります。たとえば: `key1:value1 key2:value2`。

`DD_SITE`
: メトリクス、トレース、ログの宛先サイト。Datadog サイトを設定します: `{{< region-param key="dd_site" >}}`. Defaults to `datadoghq.com`.

`DD_DD_URL`
: メトリクス送信用 URL を上書きするためのオプション設定です。

`DD_URL`(6.36+/7.36+)
: は`DD_DD_URL`のエイリアスです。`DD_DD_URL`がすでに設定されている場合は無視されます。

`DD_CHECK_RUNNERS`
: Agent はデフォルトで全てのチェックを同時に実行します（デフォルト値 = `4` ランナー）。チェックを順次実行するには、値を `1` に設定します。多数のチェック（または遅いチェック）を実行する必要がある場合、`collector-queue` コンポーネントが遅れ、ヘルスチェックに失敗する可能性があります。チェックを並行して実行するために、ランナーの数を増やすことができます。

`DD_APM_ENABLED`
: トレース収集を有効にします。デフォルトは `true` です。トレース収集の追加環境変数について詳しくは、[Docker アプリケーションのトレース][9]をご覧ください。

`DD_LOGS_CONFIG_EXPECTED_TAGS_DURATION`
: 一部の環境では、ホストからの初期ログに正しいタグが含まれていない場合があります。ログに新しいホストのタグが欠けている場合は、この環境変数を含めて `"10m"` に設定してください。

#### プロキシ設定 {#proxy-settings}

Agent v6.4.0 (トレース Agent の場合は v6.5.0) より、以下の環境変数を使用して Agent のプロキシ設定を上書きできるようになりました。

`DD_PROXY_HTTP`
: リクエストのプロキシとして使用する HTTP URL です。`http`

`DD_PROXY_HTTPS`
: リクエストのプロキシとして使用する HTTPS URL です。`https`

`DD_PROXY_NO_PROXY`
: プロキシを使用すべきではない URL のスペース区切りリストです。

プロキシ設定の詳細については、[Agent v6 プロキシのドキュメント][10]を参照してください。

#### オプションの収集エージェント {#optional-collection-agents}

オプションの収集エージェントは、セキュリティまたはパフォーマンスの理由からデフォルトで無効になっています。これらの環境変数を使用して有効にします:

`DD_APM_NON_LOCAL_TRAFFIC`
: 他のコンテナからのトレース時に非ローカルなトラフィックを許可します。[11]。

`DD_LOGS_ENABLED`
: Logs Agent による[ログの収集][12]を有効にします。

`DD_PROCESS_CONFIG_PROCESS_COLLECTION_ENABLED`
: Process Agent による[ライブプロセスの収集][13]を有効にします。Docker ソケットが利用可能な場合、[ライブコンテナビュー][14]はデフォルトで既に有効です。

#### DogStatsD (custom metrics) {#dogstatsd-custom-metrics}

カスタムメトリクスを [StatsD プロトコル][15]で送信します:

`DD_DOGSTATSD_NON_LOCAL_TRAFFIC`
: 他のコンテナからの DogStatsD パケットを受信します（カスタムメトリクスの送信に必要です）。

`DD_HISTOGRAM_PERCENTILES`
: 計算するヒストグラムのパーセンタイル (スペース区切り)。デフォルトは `0.95` です。

`DD_HISTOGRAM_AGGREGATES`
: 計算するヒストグラムの集計 (スペース区切り)。デフォルトは `"max median avg count"` です。

`DD_DOGSTATSD_SOCKET`
: 受信する UNIX ソケットへのパス。`rw`マウントされたボリューム内である必要があります。

`DD_DOGSTATSD_ORIGIN_DETECTION`
: UNIX ソケットのメトリクス用にコンテナの検出とタグ付けを有効にします。

`DD_DOGSTATSD_TAGS`
: この DogStatsD サーバーが受信するすべてのメトリクス、イベント、サービスのチェックに付加する追加タグ。たとえば: `"env:golden group:retrievers"`。

`DD_USE_DOGSTATSD`
: DogStatsD ライブラリからのカスタムメトリクスの送信を有効または無効にします。
詳しくは、[Unix ドメインソケット上の DogStatsD][16] を参照してください。

#### タグ付け {#tagging}

ベストプラクティスとして、Datadog はタグを割り当てる際に[unified service tagging][17]を使用することを推奨します。

Datadog は Docker、Kubernetes、ECS、Swarm、Mesos、Nomad、Rancher から一般的なタグを自動的に収集します。さらに多くのタグを抽出するには、次のオプションを使用してください:

`DD_CONTAINER_LABELS_AS_TAGS`
: コンテナラベルを抽出します。この env は `DD_DOCKER_LABELS_AS_TAGS` に相当します。

`DD_CONTAINER_ENV_AS_TAGS`
: コンテナ環境変数を抽出します。この env は `DD_DOCKER_ENV_AS_TAGS` に相当します。

`DD_COLLECT_EC2_TAGS`
: AWS インテグレーションを使用せずに、カスタム EC2 タグを抽出します。

詳細については、[Docker タグの抽出][18]のドキュメントを参照してください。

#### シークレットファイルの使用 {#using-secret-files}

統合の資格情報は、Docker または Kubernetes のシークレットに格納し、Autodiscovery テンプレートで使用できます。詳細については、[秘密情報管理のドキュメント][19]を参照してください。

#### コンテナを無視する {#ignore-containers}

ログ収集、メトリクス収集、Autodiscoveryからコンテナを除外します。Datadog はデフォルトで Kubernetes および OpenShift `pause` コンテナを除外します。これらの許可リストとブロックリストはAutodiscoveryにのみ適用されます。トレースとDogStatsDには影響しません。これらの環境変数の値は正規表現をサポートしています。

`DD_CONTAINER_INCLUDE`
: 含めるコンテナの許可リスト（スペースで区切る）。すべてを含めるには`.*`を使用してください。たとえば: `"image:image_name_1 image:image_name_2"`、`image:.*` OpenShift環境内でImageStreamsを使用する場合は、イメージの代わりにコンテナ名を使用してください。たとえば: `"name:container_name_1 name:container_name_2"`、`name:.*`

`DD_CONTAINER_EXCLUDE`
: 除外するコンテナのブロックリスト（スペースで区切る）。すべてを除外するには`.*`を使用してください。たとえば: `"image:image_name_3 image:image_name_4"`、`image:.*`（**注**: この変数はAutodiscoveryにのみ適用されます。）

`DD_CONTAINER_INCLUDE_METRICS`
: メトリクスを含めたいコンテナの許可リスト。

`DD_CONTAINER_EXCLUDE_METRICS`
: メトリクスを除外したいコンテナのブロックリスト。

`DD_CONTAINER_INCLUDE_LOGS`
: ログを含めたいコンテナの許可リスト。

`DD_CONTAINER_EXCLUDE_LOGS`
: ログを除外したいコンテナのブロックリスト。

`DD_AC_INCLUDE`
: **非推奨**。含めるコンテナの許可リスト（スペースで区切る）。すべてを含めるには`.*`を使用してください。たとえば: `"image:image_name_1 image:image_name_2"`、`image:.*`

`DD_AC_EXCLUDE`
: **非推奨**。除外するコンテナのブロックリスト（スペースで区切る）。すべてを除外するには`.*`を使用してください。例えば: `"image:image_name_3 image:image_name_4"`, `image:.*` (**注**: この変数はAutodiscoveryにのみ適用されます。)

その他の例は、[Container Discovery Management][20]ページでご確認いただけます。

**注**: `kubernetes.containers.running`, `kubernetes.pods.running`, `docker.containers.running`, `.stopped`, `.running.total`および`.stopped.total`のメトリクスはこれらの設定の影響を受けません。すべてのコンテナがカウントされます。これは、コンテナごとの請求には影響しません。

**注**: containerdを使用する場合、`DD_CONTAINERD_NAMESPACES`および`DD_CONTAINERD_EXCLUDE_NAMESPACES`を使用して名前空間によってコンテナを無視することが可能です。両方とも名前空間のスペース区切りリストです。`DD_CONTAINERD_NAMESPACES`が設定されている場合、エージェントはリストに存在する名前空間に属するコンテナのデータを報告します。`DD_CONTAINERD_EXCLUDE_NAMESPACES`が設定されている場合、エージェントはリストの名前空間に属するコンテナを除くすべてのコンテナのデータを報告します。

#### Autodiscovery {#autodiscovery}

`DD_LISTENERS`
: 実行するAutodiscoveryリスナー。

`DD_EXTRA_LISTENERS`
: 追加で実行するAutodiscoveryリスナー。これらは、`listeners`構成ファイルの`datadog.yaml`セクションで定義された変数に追加されます。

`DD_CONFIG_PROVIDERS`
: エージェントがチェック構成を収集するために呼び出すプロバイダー。デフォルトプロバイダーは`docker`です。Dockerプロバイダーは、コンテナラベルに埋め込まれたテンプレートを処理します。

`DD_EXTRA_CONFIG_PROVIDERS`
: 使用する追加のAutodiscovery構成プロバイダー。これらは、`config_providers`構成ファイルの`datadog.yaml`セクションで定義された変数に追加されます。

#### その他 {#miscellaneous}

`DD_PROCESS_AGENT_CONTAINER_SOURCE`
: コンテナソースの自動検出をオーバーライドして、単一のソースを強制します。例 `"docker"`, `"ecs_fargate"`, `"kubelet"`。これは、Agent v7.35.0 以降は不要です。

`DD_HEALTH_PORT`
: これを `5555` に設定すると、Agent のヘルスチェックをポート `5555` で公開します。

## コマンド {#commands}

すべての Docker Agent コマンドは [Agent コマンドガイド][21]でご確認いただけます。

## 収集データ {#data-collected}

### メトリクス {#metrics}

デフォルトでは、Docker Agent は以下のコアチェックでメトリクスを収集します。他のテクノロジーからメトリクスを収集する方法については、[Integrations](#integrations)セクションを参照してください。

| チェック       | メトリクス       |
| ----------- | ------------- |
| コンテナ   | [メトリクス][22] |
| CPU         | [System][23]  |
| ディスク        | [ディスク][24]    |
| Docker      | [Docker][25]  |
| ファイルハンドル | [システム][23]  |
| IO          | [System][23]  |
| 負荷        | [システム][23]  |
| メモリ      | [システム][23]  |
| ネットワーク     | [ネットワーク][26] |
| NTP         | [NTP][27]     |
| Uptime      | [System][23]  |

### イベント {#events}

Agent の起動または再起動の際に、Docker Agent はイベントを Datadog に送信します。

### サービスチェック {#service-checks}

**datadog.agent.up** <br>
Agent が Datadog に接続できない場合は `CRITICAL` を返し、それ以外の場合は `OK` を返します。

**datadog.agent.check_status** <br>
Agent チェックが Datadog にメトリクスを送信できない場合は `CRITICAL` を返し、それ以外の場合は `OK` を返します。

## Single Step APM Instrumentation のアンインストール {#uninstall-single-step-apm-instrumentation}

Single Step APM Instrumentation とともに Datadog Docker Agent をインストールしていて、Agent をアンインストールする場合は、APM Instrumentation をアンインストールするために[追加のコマンド][28]を実行する必要があります。

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