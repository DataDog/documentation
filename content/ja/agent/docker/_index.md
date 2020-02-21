---
title: Docker Agent
kind: documentation
aliases:
  - /ja/guides/basic_agent_usage/docker/
  - /ja/agent/docker
  - /ja/agent/basic_agent_usage/docker/
further_reading:
  - link: '/integrations/java/?tab=docker#コンフィギュレーション'
    tag: ドキュメント
    text: Docker JMX
  - link: agent/docker/log
    tag: ドキュメント
    text: Docker ログの収集
  - link: /infrastructure/process
    tag: Documentation
    text: Docker プロセスの収集
  - link: agent/docker/apm
    tag: Documentation
    text: Docker トレースの収集
---
## 概要

Datadog Docker Agent は、ホスト [Agent][1] をコンテナ化したバージョンです。公式の [Docker イメージ][2]は Docker Hub からご利用いただけます。

64-bit x86 および Arm v8 アーキテクチャ用のイメージをご用意しています。

## セットアップ

Docker Agent をまだインストールしていない場合は、以下の手順または[アプリ内のインストール手順][3]を参照してください。[サポートされるバージョン][4]については、Agent のドキュメントを参照してください。

### インストール

次のワンステップインストールコマンドを使用します。`<DATADOG_API_キー>` は [Datadog API キー][5]に置き換えてください。

{{< tabs >}}
{{% tab "Standard" %}}

```shell
DOCKER_CONTENT_TRUST=1 \
docker run -d -v /var/run/docker.sock:/var/run/docker.sock:ro \
              -v /proc/:/host/proc/:ro \
              -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
              -e DD_API_KEY="<DATADOG_API_キー>" \
              datadog/agent:latest
```

{{% /tab %}}
{{% tab "Amazon Linux version <2" %}}

```shell
DOCKER_CONTENT_TRUST=1 \
docker run -d --name dd-agent -v /var/run/docker.sock:/var/run/docker.sock:ro \
                              -v /proc/:/host/proc/:ro \
                              -v /cgroup/:/host/sys/fs/cgroup:ro \
                              -e DD_API_KEY="<DATADOG_API_キー>" \
                              datadog/agent:latest
```

{{% /tab %}}
{{< /tabs >}}

**注**: Docker Compose については、[Compose と Datadog Agent][6] を参照してください。

### コンフィギュレーション

Agent の [メインのコンフィギュレーションファイル][7] は `datadog.yaml` です。Docker Agent の場合、`datadog.yaml` コンフィギュレーションオプションは環境変数で渡されます。

#### 環境変数

##### グローバルオプション

| 環境変数       | 説明                                                                                                                                                                                                                                                                                                                                      |
|--------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_API_KEY`       | Datadog API キー (**必須**)                                                                                                                                                                                                                                                                                                              |
| `DD_HOSTNAME`      | メトリクスに使用するホスト名 (自動検出が失敗した場合)                                                                                                                                                                                                                                                                                             |
| `DD_TAGS`          | スペース区切りのホストタグ。例: `simple-tag-0 tag-key-1:tag-value-1`                                                                                                                                                                                                                                                                 |
| `DD_SITE`          | メトリクス、トレース、およびログの送信先サイト。有効なオプションは、`datadoghq.com` (Datadog US サイト) および `datadoghq.eu` (Datadog EU サイト) です。                                                                                                                                                                                      |
| `DD_DD_URL`        | メトリクス送信用 URL を上書きします。設定は任意です。                                                                                                                                                                                                                                                                                      |
| `DD_CHECK_RUNNERS` | Agent はデフォルトですべてのチェックを同時に実行します (デフォルト値は `4` ランナーです)。チェックを順次実行する場合は、値を `1` に設定してください。ただし、多数のチェック (または時間のかかるチェック) を実行する必要がある場合、`collector-queue` コンポーネントが遅延して、ヘルスチェックに失敗する可能性があります。ランナーの数を増やすと、チェックを並行して実行できます。 |

##### プロキシ設定

Agent v6.4.0 (トレース Agent の場合は v6.5.0) より、以下の環境変数を使用して Agent のプロキシ設定を上書きできるようになりました。

| 環境変数        | 説明                                                       |
|---------------------|-------------------------------------------------------------------|
| `DD_PROXY_HTTP`     | `http` リクエスト用のプロキシとして使用する HTTP URL です。                |
| `DD_PROXY_HTTPS`    | `https` リクエスト用のプロキシとして使用する HTTPS URL です。              |
| `DD_PROXY_NO_PROXY` | プロキシを使用すべきではない場合に必要となる、URL をスペースで区切ったリストです。 |

プロキシ設定の詳細については、[Agent v6 プロキシのドキュメント][8]を参照してください。

##### オプションの収集 Agent

セキュリティまたはパフォーマンス上の理由により、オプションの収集 Agent はデフォルトで無効になっています。このエージェントを有効にするには、以下の環境変数を使用します。

| 環境変数               | 説明                                                                                                                                                                                                                                                      |
|----------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_APM_ENABLED`           | トレース Agent による [トレースの収集][9]を有効にします。                                                                                                                                                                                                               |
| `DD_LOGS_ENABLED`          | ログ Agent による[ログの収集][10]を有効にします。                                                                                                                                                                                                                 |
| `DD_PROCESS_AGENT_ENABLED` | プロセス Agent による[ライブプロセスの収集][11]を有効にします。Docker ソケットがある場合、[ライブコンテナービュー][12]は既にデフォルトで有効になっています。`false` に設定すると、[ライブプロセスの収集][11]と[ライブコンテナービュー][12]が無効になります。 |

##### DogStatsD (カスタムメトリクス)

カスタムメトリクスを [StatsD プロトコル][13]で送信します。

| 環境変数                     | 説明                                                                                                                                                |
|----------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_DOGSTATSD_NON_LOCAL_TRAFFIC` | 他のコンテナからの DogStatsD パケットをリスニングします (カスタムメトリクスの送信に必要)。                                                                       |
| `DD_HISTOGRAM_PERCENTILES`       | 計算するヒストグラムのパーセンタイル (スペース区切り)。デフォルトは "0.95" です。                                                                         |
| `DD_HISTOGRAM_AGGREGATES`        | 計算するヒストグラムの集計 (スペース区切り)。デフォルトは "max median avg count" です。                                                          |
| `DD_DOGSTATSD_SOCKET`            | リスニングする UNIX ソケットのパス。`rw` でマウントされたボリューム内にある必要があります。                                                                                    |
| `DD_DOGSTATSD_ORIGIN_DETECTION`  | UNIX ソケットのメトリクス用にコンテナの検出とタグ付けを有効にします。                                                                                            |
| `DD_DOGSTATSD_TAGS`              | この DogStatsD サーバーが受信するすべてのメトリクス、イベント、サービスのチェックに付加する追加タグ。たとえば `["env:golden", "group:retrievers"]` のように追加します。 |

詳しくは、[Unix ドメインソケット上の DogStatsD][14] を参照してください。

##### タグ付け

Datadog は [Docker][15]、[Kubernetes][16]、[ECS][17]、[Swarm、Mesos、Nomad、Rancher][15] からの一般的なタグを自動的に収集します。さらに多くのタグを抽出するには、次のオプションを使用します。

| 環境変数                            | 説明                                               |
|-----------------------------------------|-----------------------------------------------------------|
| `DD_DOCKER_LABELS_AS_TAGS`              | Docker コンテナラベルを抽出します                           |
| `DD_DOCKER_ENV_AS_TAGS`                 | Docker コンテナ環境変数を抽出します            |
| `DD_KUBERNETES_POD_LABELS_AS_TAGS`      | ポッドラベルを抽出します                                        |
| `DD_KUBERNETES_POD_ANNOTATIONS_AS_TAGS` | ポッドアノテーションを抽出します                                   |
| `DD_COLLECT_EC2_TAGS`                   | AWS インテグレーションを使用せずに、カスタム EC2 タグを抽出します |

マップキーはソース (`label/envvar`) 名、マップ値は Datadog タグ名です。たとえば次のようになります。

```shell
DD_KUBERNETES_POD_LABELS_AS_TAGS='{"app":"kube_app","release":"helm_release"}'
DD_DOCKER_LABELS_AS_TAGS='{"com.docker.compose.service":"service_name"}'
```

このほかの例を、[タグの割り当てと抽出][18] のページでご覧いただけます。

##### シークレットファイルの使用

インテグレーションの資格情報を Docker や Kubernetes のシークレットに格納し、オートディスカバリーテンプレートで使用できます。詳細については、[シークレット管理のドキュメント][19]を参照してください。

##### コンテナの無視

ログの収集、メトリクスの収集、オートディスカバリーからコンテナを除外します。Datadog はデフォルトで Kubernetes と OpenShift の `pause` コンテナを除外します。

| 環境変数    | 説明                                                                                                                                                                                                        |
|-----------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_AC_INCLUDE` | 処理対象に入れるコンテナのホワイトリスト (スペース区切り)。すべてを対象に入れる場合は、`.*` を使用します。例: `"image:image_name_1 image:image_name_2"`、`image:.*`                                                              |
| `DD_AC_EXCLUDE` | 処理対象から除外するコンテナのブラックリスト (スペース区切り)。すべてを対象から除外する場合は、`.*` を使用します。例: `"image:image_name_3 image:image_name_4"` (**注**: この変数はオートディスカバリーに対してのみ有効)、`image:.*` |

[コンテナのディスカバリー管理][20] のページで、その他の例をご覧いただけます。

**注**: `docker.containers.running`、`.stopped`、`.running.total`、`.stopped.total` の各メトリクスは、この設定の影響を受けません。すべてのコンテナを対象とします。コンテナごとの課金にも影響しません。

##### その他

| 環境変数                        | 説明                                                                                                      |
|-------------------------------------|------------------------------------------------------------------------------------------------------------------|
| `DD_PROCESS_AGENT_CONTAINER_SOURCE` | コンテナソースの自動検出を上書きして、1 つのソースに制限します (`"docker"`、`"ecs_fargate"`、`"kubelet"` など)。 |
| `DD_HEALTH_PORT`                    | これを `5555` に設定すると、Agent のヘルスチェックをポート `5555` で公開します。                                              |

**注**: コンテナ化されたランタイムを使用する場合、`DD_PROCESS_AGENT_CONTAINER_SOURCE="kubelet"` を設定すれば、コンテナページでコンテナを確認することができます。

リスナーおよび構成プロバイダーを追加するには、`DD_EXTRA_LISTENERS` と `DD_EXTRA_CONFIG_PROVIDERS` の環境変数を使用します。これらは `datadog.yaml` 構成ファイルの `listeners` セクションと `config_providers` セクションに定義する変数に追加されます。

### 検証

インストールを検証するには、Docker Agent の[ステータスコマンド](#コマンド) を実行してください。

### コマンド

これらのコマンドがホスト上で実行されます。

| 種類    | コマンド                                         |
|---------|-------------------------------------------------|
| 起動   | [インストールコマンド](#インストール)を使用してください。  |
| 停止    | `docker exec -it <コンテナ名> agent stop`   |
| 再起動 | [インストールコマンド](#インストール)を使用してください。  |
| ステータス  | `docker exec -it <コンテナ名> agent status` |

## 収集データ

### メトリクス

デフォルトで、Docker Agent はメトリクスを以下の主要なチェックのために収集します。他のテクノロジーからメトリクスを収集するには、[インテグレーション](#インテグレーション)のセクションを参照してください。

| チェック       | メトリクス       |
|-------------|---------------|
| CPU         | [System][21]  |
| ディスク        | [Disk][22]    |
| Docker      | [Docker][23]  |
| ファイル処理 | [System][21]  |
| IO          | [System][21]  |
| ロード        | [System][21]  |
| メモリ      | [System][21]  |
| ネットワーク     | [Network][24] |
| NTP         | [NTP][25]     |
| アップタイム      | [System][21]  |

### イベント

Agent の起動または再起動の際に、Docker Agent はイベントを Datadog に送信します。

### サービスのチェック

**datadog.agent.up**: <br>
Agent が Datadog に接続できない場合は、`CRITICAL` を返します。それ以外の場合は、`OK` を返します。

**datadog.agent.check_status**: <br>
Agent チェックが Datadog にメトリクスを送信できない場合は、`CRITICAL` を返します。それ以外の場合は、`OK` を返します。

## インテグレーション

Docker インテグレーションは Docker Agent を使用してメトリクスを自動的に送信します。その他のインテグレーションを構成するには、オートディスカバリーまたはマウントを使用します。

### オートディスカバリー

ワンステップインストールを使用して `/var/run/docker.sock` をマウントすると、Docker Agent のオートディスカバリーが有効になります。

オートディスカバリーを使用してインテグレーションを追加するには、[オートディスカバリーのインテグレーションテンプレート][26] のページを参照してください。

### conf.d のマウント

`/conf.d` フォルダーをマウントして Docker Agent を起動する場合に、インテグレーション構成ファイルを `/etc/datadog-agent/conf.d/` にコピーすることができます。

1. ホストに構成フォルダーを作成して YAML を入れます。

    ```shell
    mkdir /opt/datadog-agent-conf.d
    touch /opt/datadog-agent-conf.d/http_check.yaml
    ```

2. Docker Agent をインストールする際に、`-v /opt/datadog-agent-conf.d:/conf.d:ro` を追加してください。たとえば次のように追加します。

    ```shell
    DOCKER_CONTENT_TRUST=1 \
    docker run -d -v /var/run/docker.sock:/var/run/docker.sock:ro \
                  -v /proc/:/host/proc/:ro \
                  -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
                  -v /opt/datadog-agent-conf.d:/conf.d:ro \
                  -e DD_API_KEY=<YOUR_DATADOG_API_KEY> \
                  datadog/agent:latest
    ```

コンテナが起動すると、ホスト上の `/opt/datadog-agent-conf.d` にあるファイルで、`.yaml` の拡張子が付いたものがすべて `/etc/datadog-agent/conf.d/` にコピーされます。**注**: 新しい YAML ファイルを `/opt/datadog-agent-conf.d` に追加した場合は、Docker Agent を再起動してください。

`/checks.d` フォルダーでも同じことが可能です。Docker Agent の起動時に、`/checks.d` にあるすべての Python ファイルを `/etc/datadog-agent/checks.d/` に自動でコピーすることができます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/agent
[2]: https://hub.docker.com/r/datadog/agent
[3]: https://app.datadoghq.com/account/settings#agent/docker
[4]: /ja/agent/basic_agent_usage/#supported-os-versions
[5]: https://app.datadoghq.com/account/settings#api
[6]: /ja/integrations/faq/compose-and-the-datadog-agent
[7]: /ja/agent/guide/agent-configuration-files/#agent-main-configuration-file
[8]: /ja/agent/proxy/#agent-v6
[9]: /ja/tracing
[10]: /ja/logs
[11]: /ja/infrastructure/process
[12]: /ja/infrastructure/livecontainers
[13]: /ja/developers/dogstatsd
[14]: /ja/developers/dogstatsd/unix_socket
[15]: https://github.com/DataDog/datadog-agent/blob/master/pkg/tagger/collectors/docker_extract.go
[16]: https://github.com/DataDog/datadog-agent/blob/master/pkg/tagger/collectors/kubelet_extract.go
[17]: https://github.com/DataDog/datadog-agent/blob/master/pkg/tagger/collectors/ecs_extract.go
[18]: /ja/agent/autodiscovery/tag/?tab=containerizedagent
[19]: /ja/agent/guide/secrets-management/?tab=linux
[20]: /ja/agent/autodiscovery/management/?tab=containerizedagent
[21]: /ja/integrations/system/#metrics
[22]: /ja/integrations/disk/#metrics
[23]: /ja/integrations/docker_daemon/#metrics
[24]: /ja/integrations/network/#metrics
[25]: /ja/integrations/ntp/#metrics
[26]: /ja/agent/autodiscovery/integrations