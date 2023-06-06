---
aliases:
- /ja/guides/basic_agent_usage/docker/
- /ja/agent/docker
- /ja/agent/basic_agent_usage/docker/
- /ja/integrations/docker_daemon/
- /ja/docker/
further_reading:
- link: https://app.datadoghq.com/release-notes?category=Container%20Monitoring
  tag: リリースノート
  text: Datadog Containers の最新リリースをチェック！ (アプリログインが必要です)。
- link: /agent/docker/log/
  tag: ドキュメント
  text: アプリケーションログの収集
- link: /agent/docker/apm/
  tag: ドキュメント
  text: アプリケーショントレースの収集
- link: /agent/docker/prometheus/
  tag: ドキュメント
  text: Prometheus メトリクスの収集
- link: /agent/docker/integrations/
  tag: ドキュメント
  text: アプリケーションのメトリクスとログを自動で収集
- link: /agent/guide/autodiscovery-management/
  tag: ドキュメント
  text: データ収集をコンテナのサブセットのみに制限
- link: /agent/docker/tag/
  tag: ドキュメント
  text: コンテナから送信された全データにタグを割り当て
kind: documentation
title: Docker、containerd、Podman に対応した Docker Agent
---

## 概要

Datadog Docker Agent は、ホスト [Agent][1] をコンテナ化したバージョンです。Docker Agent は、Docker、containerd、Podman のランタイムをサポートしています。公式の [Docker イメージ][2]は Docker Hub、GCR 、および ECR-Public からご利用いただけます。

<div class="alert alert-warning">2023 年 7 月 10 日、Docker Hub は Datadog の Docker Hub レジストリへのダウンロードレート制限を実施するようになります。これらのレジストリからのイメージのプルは、レート制限割り当てにカウントされます。<br/><br/>

Datadog は、Datadog Agent と Cluster Agent の構成を更新して、レート制限が適用されない他のレジストリからプルすることを推奨しています。手順については、<a href="/agent/guide/changing_container_registry">コンテナレジストリを変更する</a>を参照してください。</div>

64-bit x86 および Arm v8 アーキテクチャ用のイメージをご用意しています。

| ECR-Public                                                           | GCR                                                             | Docker Hub                                             |
|----------------------------------------------------------------------|-----------------------------------------------------------------|--------------------------------------------------------|
| [Agent v6+][4]<br>`docker pull public.ecr.aws/datadog/agent`         | [Agent v6+][3]<br>`docker pull gcr.io/datadoghq/agent`          | [Agent v6+][2]<br>`docker pull datadog/agent`          | 
| [Agent v5][7]<br>`docker pull public.ecr.aws/datadog/docker-dd-agent`| [Agent v5][6]<br>`docker pull gcr.io/datadoghq/docker-dd-agent` | [Agent v5][5]<br>`docker pull datadog/docker-dd-agent` |


このページの CLI コマンドは Docker ランタイム用です。containerd ランタイムは `docker` を `nerdctl` に、Podman ランタイムは `podman` に置き換えてください。

## セットアップ

Docker Agent をまだインストールしていない場合は、以下の手順または[アプリ内のインストール手順][8]を参照してください。[サポートされるバージョン][9]については、Agent のドキュメントを参照してください。ワンステップインストールコマンドを使用し、`<YOUR_DATADOG_API_KEY>` を [Datadog API キー][10]と置き換えてください。

{{< tabs >}}
{{% tab "標準" %}}

```shell
docker run -d --cgroupns host --pid host --name dd-agent -v /var/run/docker.sock:/var/run/docker.sock:ro -v /proc/:/host/proc/:ro -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro -e DD_API_KEY=<DATADOG_API_KEY> gcr.io/datadoghq/agent:7
```

ECR-Public の場合:

```shell
docker run -d --cgroupns host --pid host --name dd-agent -v /var/run/docker.sock:/var/run/docker.sock:ro -v /proc/:/host/proc/:ro -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro -e DD_API_KEY=<DATADOG_API_KEY> public.ecr.aws/datadog/agent:7
```

**注**: GCR または ECR-Public 以外の別のレジストリを使用している場合は、必ずイメージを更新してください。

**注**: ネットワークモニタリング、セキュリティエージェント、oom_kill チェックなど system-probe が提供するいくつかの機能では、 `/etc/os-release` ファイルを `-v /etc/os-release:/host/etc/os-release:ro` でマウントする必要があります。Linux ディストリビューションに `/etc/os-release` ファイルがない場合は、 `/etc/redhat-release` や `/etc/fedora-release` などの同等のファイルをマウントしてください。

{{% /tab %}}
{{% tab "Amazon Linux" %}}

Amazon Linux < v2 の場合:

```shell
docker run -d --name dd-agent -v /var/run/docker.sock:/var/run/docker.sock:ro -v /proc/:/host/proc/:ro -v /cgroup/:/host/sys/fs/cgroup:ro -e DD_API_KEY=<DATADOG_API_KEY> gcr.io/datadoghq/agent:7
```
ECR-Public の場合:

```shell
docker run -d --cgroupns host --pid host --name dd-agent -v /var/run/docker.sock:/var/run/docker.sock:ro -v /proc/:/host/proc/:ro -v /cgroup/:/host/sys/fs/cgroup:ro -e DD_API_KEY=<DATADOG_API_KEY> public.ecr.aws/datadog/agent:7
```

Amazon Linux v2 の場合:

```shell
docker run -d --cgroupns host --pid host --name dd-agent -v /var/run/docker.sock:/var/run/docker.sock:ro -v /proc/:/host/proc/:ro -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro -e DD_API_KEY=<DATADOG_API_KEY> gcr.io/datadoghq/agent:7
```
ECR-Public の場合:

```shell
docker run -d --cgroupns host --pid host --name dd-agent -v /var/run/docker.sock:/var/run/docker.sock:ro -v /proc/:/host/proc/:ro -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro -e DD_API_KEY=<DATADOG_API_KEY> public.ecr.aws/datadog/agent:7
```

{{% /tab %}}
{{% tab "Windows" %}}

Datadog Agent は、Windows Server 2019 (LTSC) と Windows Server 2022 (LTSC) でサポートされています。

```shell
docker run -d --name dd-agent -e DD_API_KEY=<API_KEY> -v \\.\pipe\docker_engine:\\.\pipe\docker_engine gcr.io/datadoghq/agent
```

ECR-Public の場合:

```shell
docker run -d --name dd-agent -e DD_API_KEY=<API_KEY> -v \\.\pipe\docker_engine:\\.\pipe\docker_engine public.ecr.aws/datadog/agent
```

{{% /tab %}}
{{% tab "非特権" %}}

(オプション) 非特権インストールを実行するには、インストールコマンドに `--group-add=<DOCKER_GROUP_ID>` を追加します。次に例を示します。

```shell
docker run -d --name dd-agent -v /var/run/docker.sock:/var/run/docker.sock:ro -v /proc/:/host/proc/:ro -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro -e DD_API_KEY=<DATADOG_API_KEY> gcr.io/datadoghq/agent:7 --group-add=<DOCKER_GROUP_ID>
```
ECR-Public の場合:


```shell
docker run -d --name dd-agent -v /var/run/docker.sock:/var/run/docker.sock:ro -v /proc/:/host/proc/:ro -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro -e DD_API_KEY=<DATADOG_API_KEY> public.ecr.aws/datadog/agent:7 --group-add=<DOCKER_GROUP_ID>
```

{{% /tab %}}
{{< /tabs >}}

**注**: Docker Compose については、[Compose と Datadog Agent][11] を参照してください。

## インテグレーション

クラスター内で Agent を起動し、実行したら、[Datadog のオートディスカバリー機能][12]を使ってアプリケーションコンテナからメトリクスとログを自動的に収集します。


## 環境変数

Agent の [メインコンフィギュレーションファイル][13]は `datadog.yaml` です。Docker Agent の場合、`datadog.yaml` コンフィギュレーションオプションは環境変数で渡されます。

### グローバルオプション

| 環境変数         | 説明                                                                                                                                                                                                                                                                                                                                      |
|----------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_API_KEY`         | Datadog API キー (**必須**)                                                                                                                                                                                                                                                                                                              |
| `DD_ENV`             | 出力されるすべてのデータにグローバル `env` タグを設定します。                                                                                                                                                                                                                                                                                                  |
| `DD_HOSTNAME`        | メトリクスに使用するホスト名 (自動検出が失敗した場合)                                                                                                                                                                                                                                                                                             |
| `DD_HOSTNAME_FILE`        | 環境によっては、ホスト名の自動検出がうまくいかず、環境変数で値を設定できない場合があります。このような場合、ホスト上のファイルを使って適切な値を提供することができます。もし `DD_HOSTNAME` が空でない値に設定されている場合、このオプションは無視されます。                                              |
| `DD_TAGS`            | スペース区切りのホストタグ。例: `key1:value1 key2:value2`                                                                                                                                                                                                                                                                 |
| `DD_SITE`            | メトリクス、トレース、ログの送信先サイト。Datadog サイトを `{{< region-param key="dd_site" >}}` に設定します。デフォルトは `datadoghq.com` です。                                                                                                                                                                                                |
| `DD_DD_URL`          | メトリクス送信用 URL を上書きします。設定は任意です。                                                                                                                                                                                                                                                                                      |
| `DD_URL` (6.36+/7.36+)            | `DD_DD_URL` のエイリアス。すでに `DD_DD_URL` が設定されている場合は無視されます。                                                                                                                                                                                                                                                                                    |
| `DD_CHECK_RUNNERS`   | Agent はデフォルトですべてのチェックを同時に実行します (デフォルト値は `4` ランナーです)。チェックを順次実行する場合は、値を `1` に設定してください。ただし、多数のチェック (または時間のかかるチェック) を実行する必要がある場合、`collector-queue` コンポーネントが遅延して、ヘルスチェックに失敗する可能性があります。ランナーの数を増やすと、チェックを並行して実行できます。 |
| `DD_APM_ENABLED`             | トレース収集を有効にします。デフォルトは `true` です。トレース収集の追加環境変数について詳しくは、[Docker アプリケーションのトレース][14]をご覧ください。   |
| `DD_LOGS_CONFIG_EXPECTED_TAGS_DURATION` | 環境によっては、ホストからの最初のログに正しいタグが含まれないことがあります。新しいホストのタグがログに含まれていない場合は、この環境変数を含めて `"10m"` に設定してください。|

### プロキシ設定

Agent v6.4.0 (トレース Agent の場合は v6.5.0) より、以下の環境変数を使用して Agent のプロキシ設定を上書きできるようになりました。

| 環境変数        | 説明                                                       |
|---------------------|-------------------------------------------------------------------|
| `DD_PROXY_HTTP`     | `http` リクエスト用のプロキシとして使用する HTTP URL です。                |
| `DD_PROXY_HTTPS`    | `https` リクエスト用のプロキシとして使用する HTTPS URL です。              |
| `DD_PROXY_NO_PROXY` | プロキシを使用すべきではない場合に必要となる、URL をスペースで区切ったリストです。 |

プロキシ設定の詳細については、[Agent v6 プロキシのドキュメント][15]を参照してください。

### オプションの収集 Agent

セキュリティまたはパフォーマンス上の理由により、オプションの収集 Agent はデフォルトで無効になっています。このエージェントを有効にするには、以下の環境変数を使用します。

| 環境変数               | 説明                                                                                                                                                                                                                                                      |
|----------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_APM_NON_LOCAL_TRAFFIC` | [他のコンテナからのトレース][16]時に非ローカルなトラフィックを許可します。       |
| `DD_LOGS_ENABLED`          | ログ Agent による[ログの収集][17]を有効にします。                                                                                                                                                                                                                 |
| `DD_PROCESS_AGENT_ENABLED` | プロセス Agent による[ライブプロセスの収集][18]を有効にします。Docker ソケットがある場合、[ライブコンテナービュー][19]はすでにデフォルトで有効になっています。`false` に設定すると、[ライブプロセスの収集][18]と[ライブコンテナービュー][19]が無効になります。 |

### DogStatsD (カスタムメトリクス)

カスタムメトリクスを [StatsD プロトコル][20]で送信します。

| 環境変数                     | 説明                                                                                                                                                |
|----------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_DOGSTATSD_NON_LOCAL_TRAFFIC` | 他のコンテナからの DogStatsD パケットをリスニングします (カスタムメトリクスの送信に必要)。                                                                       |
| `DD_HISTOGRAM_PERCENTILES`       | 計算するヒストグラムのパーセンタイル (スペース区切り)。デフォルトは `0.95` です。                                                                         |
| `DD_HISTOGRAM_AGGREGATES`        | 計算するヒストグラムの集計 (スペース区切り)。デフォルトは "max median avg count" です。                                                          |
| `DD_DOGSTATSD_SOCKET`            | リスニングする UNIX ソケットのパス。`rw` でマウントされたボリューム内にある必要があります。                                                                                    |
| `DD_DOGSTATSD_ORIGIN_DETECTION`  | UNIX ソケットのメトリクス用にコンテナの検出とタグ付けを有効にします。                                                                                            |
| `DD_DOGSTATSD_TAGS`              | この DogStatsD サーバーが受信するすべてのメトリクス、イベント、サービスのチェックに付加する追加タグ。たとえば `"env:golden group:retrievers"` のように追加します。 |
| `DD_USE_DOGSTATSD`           | DogStatsD ライブラリからのカスタムメトリクスの送信を有効または無効にします。                                                                                                |
詳しくは、[Unix ドメインソケット上の DogStatsD][21] を参照してください。

### タグ付け

ベストプラクティスとして、Datadog はタグを割り当てるときに[統合サービスタグ付け][22]を使用することをお勧めします。

Datadog は Docker、Kubernetes、ECS、Swarm、Mesos、Nomad、Rancher から一般的なタグを自動的に収集します。さらに多くのタグを抽出するには、次のオプションを使用します。

| 環境変数                  | 説明                                                                                             |
|-------------------------------|---------------------------------------------------------------------------------------------------------|
| `DD_CONTAINER_LABELS_AS_TAGS` | コンテナラベルを抽出します。この環境は、古い `DD_DOCKER_LABELS_AS_TAGS` 環境と同等です。             |
| `DD_CONTAINER_ENV_AS_TAGS`    | コンテナ環境変数を抽出します。この環境は、古い `DD_DOCKER_ENV_AS_TAGS` 環境と同等です。 |
| `DD_COLLECT_EC2_TAGS`         | AWS インテグレーションを使用せずに、カスタム EC2 タグを抽出します。                                              |

詳細については、[Docker タグの抽出][23]ドキュメントを参照してください。

### シークレットファイルの使用

インテグレーションの資格情報を Docker や Kubernetes のシークレットに格納し、オートディスカバリーテンプレートで使用できます。詳細については、[シークレット管理のドキュメント][24]を参照してください。

### コンテナの無視

ログの収集、メトリクスの収集、オートディスカバリーからコンテナを除外します。Datadog はデフォルトで Kubernetes と OpenShift の `pause` コンテナを除外します。これらの許可リストとブロックリストはオートディスカバリーにのみ適用されます。トレースと DogStatsD は影響を受けません。これらの環境変数の値は、正規表現をサポートしています。

| 環境変数                   | 説明                                                                                                                                                                                                                                                                                                               |
|--------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_CONTAINER_INCLUDE`         | 処理対象に入れるコンテナの許可リスト (スペース区切り)。すべてを対象に入れる場合は、`.*` を使用します。例: `"image:image_name_1 image:image_name_2"`、`image:.*` OpenShift 環境内で ImageStreams を使用する場合は、イメージの代わりにコンテナ名を使用してください。例: "name:container_name_1 name:container_name_2", name:.* |
| `DD_CONTAINER_EXCLUDE`         | 処理対象から除外するコンテナのブロックリスト (スペース区切り)。すべてを対象から除外する場合は、`.*` を使用します。例: `"image:image_name_3 image:image_name_4"` (**注**: この変数はオートディスカバリーに対してのみ有効)、`image:.*`                                                                                                        |
| `DD_CONTAINER_INCLUDE_METRICS` | メトリクスを含めたいコンテナの許可リスト。                                                                                                                                                                                                                                                                |
| `DD_CONTAINER_EXCLUDE_METRICS` | メトリクスを除外したいコンテナのブロックリスト。                                                                                                                                                                                                                                                                |
| `DD_CONTAINER_INCLUDE_LOGS`    | ログを含めたいコンテナの許可リスト。                                                                                                                                                                                                                                                                   |
| `DD_CONTAINER_EXCLUDE_LOGS`    | ログを除外したいコンテナのブロックリスト。                                                                                                                                                                                                                                                                   |
| `DD_AC_INCLUDE`                | **非推奨**: 処理対象に入れるコンテナの許可リスト (スペース区切り)。すべてを対象に入れる場合は、`.*` を使用します。例: `"image:image_name_1 image:image_name_2"`、`image:.*`                                                                                                                                                     |
| `DD_AC_EXCLUDE`                | **非推奨**: 処理対象から除外するコンテナのブロックリスト (スペース区切り)。すべてを対象から除外する場合は、`.*` を使用します。例: `"image:image_name_3 image:image_name_4"` (**注**: この変数はオートディスカバリーに対してのみ有効)、`image:.*`                                                                                        |

その他の例は[コンテナのディスカバリー管理][25]ページでご確認いただけます。

**注**: `kubernetes.containers.running`、`kubernetes.pods.running`、`docker.containers.running`、`.stopped`、`.running.total`、`.stopped.total` の各メトリクスは、この設定の影響を受けません。すべてのコンテナを対象とします。なお、これらはコンテナの課金に影響しません。

**注**: containerd を使用する場合、`DD_CONTAINERD_NAMESPACES` と `DD_CONTAINERD_EXCLUDE_NAMESPACES` を使用すると、ネームスペースでコンテナを無視することが可能です。どちらもスペースで区切られたネームスペースのリストです。`DD_CONTAINERD_NAMESPACES` が設定されている場合、Agent はリストに存在するネームスペースに属するコンテナのデータを報告します。`DD_CONTAINERD_EXCLUDE_NAMESPACES` が設定されている場合、Agent はリストのネームスペースに属するものを除く、すべてのコンテナのデータをレポートします。

### その他

| 環境変数                        | 説明                                                                                                                                                     |
|-------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_PROCESS_AGENT_CONTAINER_SOURCE` | コンテナソースの自動検出を上書きして、1 つのソースに制限します (`"docker"`、`"ecs_fargate"`、`"kubelet"` など)。Agent v7.35.0 以降、不要になりました。 |
| `DD_HEALTH_PORT`                    | これを `5555` に設定すると、Agent のヘルスチェックをポート `5555` で公開します。                                                                                             |

リスナーおよび構成プロバイダーを追加するには、`DD_EXTRA_LISTENERS` と `DD_EXTRA_CONFIG_PROVIDERS` の環境変数を使用します。これらは `datadog.yaml` 構成ファイルの `listeners` セクションと `config_providers` セクションに定義する変数に追加されます。

## コマンド

すべての Docker Agent コマンドは [Agent コマンドガイド][26]でご確認いただけます。

## 収集データ

### メトリクス

デフォルトで、Docker Agent はメトリクスを以下の主要なチェックのために収集します。他のテクノロジーからメトリクスを収集するには、[インテグレーション](#インテグレーション)のセクションを参照してください。

| チェック       | メトリクス       |
|-------------|---------------|
| コンテナ   | [Metrics][27]
| CPU         | [System][28]  |
| ディスク        | [Disk][29]    |
| Docker      | [Docker][30]  |
| ファイル処理 | [System][28]  |
| IO          | [System][28]  |
| ロード        | [System][28]  |
| メモリ      | [System][28]  |
| ネットワーク     | [Network][31] |
| NTP         | [NTP][32]     |
| アップタイム      | [System][28]  |

### イベント

Agent の起動または再起動の際に、Docker Agent はイベントを Datadog に送信します。

### サービスチェック

**datadog.agent.up**: <br>
Agent が Datadog に接続できない場合は、`CRITICAL` を返します。それ以外の場合は、`OK` を返します。

**datadog.agent.check_status**: <br>
Agent チェックが Datadog にメトリクスを送信できない場合は、`CRITICAL` を返します。それ以外の場合は、`OK` を返します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/agent/
[2]: https://hub.docker.com/r/datadog/agent
[3]: https://console.cloud.google.com/gcr/images/datadoghq/GLOBAL/agent
[4]: https://gallery.ecr.aws/datadog/agent
[5]: https://hub.docker.com/r/datadog/docker-dd-agent
[6]: https://console.cloud.google.com/gcr/images/datadoghq/GLOBAL/docker-dd-agent?gcrImageListsize=30
[7]: https://gallery.ecr.aws/datadog/docker-dd-agent
[8]: https://app.datadoghq.com/account/settings#agent/docker
[9]: /ja/agent/basic_agent_usage/#supported-os-versions
[10]: https://app.datadoghq.com/organization-settings/api-keys
[11]: /ja/agent/guide/compose-and-the-datadog-agent/
[12]: /ja/agent/docker/integrations/
[13]: /ja/agent/guide/agent-configuration-files/#agent-main-configuration-file
[14]: /ja/agent/docker/apm/
[15]: /ja/agent/proxy/#agent-v6
[16]: /ja/agent/docker/apm/#tracing-from-other-containers
[17]: /ja/agent/docker/log/
[18]: /ja/infrastructure/process/
[19]: /ja/infrastructure/livecontainers/
[20]: /ja/developers/dogstatsd/
[21]: /ja/developers/dogstatsd/unix_socket/
[22]: /ja/getting_started/tagging/unified_service_tagging/
[23]: /ja/agent/docker/tag/
[24]: /ja/agent/guide/secrets-management/?tab=linux
[25]: /ja/agent/guide/autodiscovery-management/
[26]: /ja/agent/guide/agent-commands/
[27]: /ja/integrations/container/
[28]: /ja/integrations/system/#metrics
[29]: /ja/integrations/disk/#metrics
[30]: /ja/agent/docker/data_collected/#metrics
[31]: /ja/integrations/network/#metrics
[32]: /ja/integrations/ntp/#metrics