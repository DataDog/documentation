---
title: Docker ログの収集
kind: documentation
aliases:
  - /ja/logs/docker
  - /ja/logs/languages/docker
  - /ja/logs/log_collection/docker
further_reading:
  - link: logs/explorer
    tag: Documentation
    text: ログの調査方法
  - link: /agent/docker/apm/
    tag: Documentation
    text: アプリケーショントレースの収集
  - link: /agent/docker/prometheus/
    tag: Documentation
    text: Prometheus メトリクスの収集
  - link: /agent/docker/integrations/
    tag: Documentation
    text: アプリケーションのメトリクスとログを自動で収集
  - link: /agent/guide/autodiscovery-management/
    tag: ドキュメント
    text: データ収集をコンテナのサブセットのみに制限
  - link: /agent/docker/tag/
    tag: ドキュメント
    text: コンテナから送信された全データにタグを割り当て
---
## 概要

Datadog Agent 6 以降は、コンテナからログを収集します。2 通りのインストレーション方法があります。

ログ収集の構成は、現在の環境によって異なります。開始するには、次のいずれかのインストールを選択してください。

- ご使用の環境が**すべて**のログを `stdout`/`stderr` に書き込む場合は、[コンテナ化された Agent](?tab=containerized-agent#installation) のインストールに従ってください。

- コンテナ化された Agent をデプロイできず、コンテナが**すべて**のログを `stdout`/`stderr` に書き込む場合は、[ホスト Agent](?tab=hostagent#installation) のインストールに従って、Agent コンフィギュレーションファイル内でコンテナ化されたログを有効にします。 

- コンテナがログをファイルに書き込む場合 (ログを `stdout`/`stderr` に部分的にのみ書き込み、ログをファイルに書き込むか、ログをファイルに完全に書き込む)、[カスタムログ収集を使用するホスト Agent](?tab=hostagentwithcustomlogging#installation) のインストールまたは[コンテナ化された Agent](?tab=containerized-agent#installation) のインストール手順に従い、[オートディスカバリーコンフィギュレーションの例があるファイルからのログ収集](?tab=logcollectionfromfile#examples)を確認します。

## インストール

{{< tabs >}}
{{% tab "Container Installation" %}}

Datadog Agent を埋め込みホストを監視する [Docker コンテナ][1] を実行するには、次のコマンドを使用します。

```shell
DOCKER_CONTENT_TRUST=1 docker run -d \
           --name datadog-agent \
           -e DD_API_KEY=<DATADOG_API_KEY> \
           -e DD_LOGS_ENABLED=true \
           -e DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL=true \
           -e DD_CONTAINER_EXCLUDE="name:datadog-agent" \
           -v /var/run/docker.sock:/var/run/docker.sock:ro \
           -v /proc/:/host/proc/:ro \
           -v /opt/datadog-agent/run:/opt/datadog-agent/run:rw \
           -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
           datadog/agent
```

**注**: Windows システムでは、このコマンドをボリュームマウントなしで実行します。つまり以下のようになります。

```shell
DOCKER_CONTENT_TRUST=1 docker run -d \
           --name datadog-agent \
           -e DD_API_KEY=<DATADOG_API_KEY> \
           -e DD_LOGS_ENABLED=true \
           -e DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL=true \
           -e DD_CONTAINER_EXCLUDE="name:datadog-agent" \
           -v \\.\pipe\docker_engine:\\.\pipe\docker_engine \
           datadog/agent
```

最新版の Datadog Agent の使用が推奨されます。GCR で利用できる [Agent v6 のイメージ][2]リストを参照してください。

ログ収集に関連するコマンド：

| コマンド                                               | 説明                                                                                                                                                      |
| ----------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `-e DD_LOGS_ENABLED=true`                             | `true` に設定すると、ログ収集が有効になります。Agent は構成ファイルのログ命令を探します。                                                          |
| `-e DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL=true`        | すべてのコンテナのログ収集を有効にするログコンフィギュレーションを追加します。                                                                                         |
| `-v /opt/datadog-agent/run:/opt/datadog-agent/run:rw` | 再起動の際やネットワークで問題が生じた際でもコンテナログを紛失しないよう、このディレクトリ内の各コンテナのために収集された最後のログ行は、ホストに保存されます。     |
| `-e DD_CONTAINER_EXCLUDE="name:datadog-agent"`               | Datadog Agent が自身のログやメトリクスを収集したり送信するのを防ぎます。Datadog Agent ログやメトリクスを収集したい場合は、このパラメータを削除します。このパラメーター値は正規表現をサポートしています。 |
| `-v /var/run/docker.sock:/var/run/docker.sock:ro`     | ログは Docker ソケットの `stdout/stderr` コンテナから収集されます。                                                                                        |

[1]: https://github.com/DataDog/datadog-agent/tree/master/Dockerfiles/agent
[2]: https://console.cloud.google.com/gcr/images/datadoghq/GLOBAL/agent
{{% /tab %}}
{{% tab "ホスト Agent" %}}

1. [最新バージョンの Agent][1] をホストにインストールします。
2. デフォルトの状態では、Datadog Agent でのログ収集は _無効_ になっています。有効にするには、`datadog.yaml` 構成ファイルに次の行を加えます。

    ```yaml
    logs_enabled: true
    listeners:
        - name: docker
    config_providers:
        - name: docker
          polling: true
    logs_config:
        container_collect_all: true
    ```

3. [Agent を再起動][2]し、Datadog のすべてのコンテナログを確認します。

[1]: /ja/agent/basic_agent_usage/
[2]: /ja/agent/guide/agent-commands/#restart-the-agent
{{% /tab %}}
{{% tab "カスタムログを使用するホスト Agent" %}}

1. [最新バージョンの Agent][1] をホストにインストールします。
2. [カスタムログ収集のドキュメント][2]に従って、ログのファイルを調整します。

   `<PATH_LOG_FILE>/<LOG_FILE_NAME>.log` に保存されているログを `<APP_NAME>` アプリケーションから収集するには、[Agent のコンフィギュレーションディレクトリ][3]のルートに以下の内容の `<APP_NAME>.d/conf.yaml` ファイルを作成します。

    ```yaml
    logs:
      - type: file
        path: "<PATH_LOG_FILE>/<LOG_FILE_NAME>.log"
        service: "<APP_NAME>"
        source: "<SOURCE>"
    ```

3. [Agent を再起動][4]し、Datadog のすべてのコンテナログを確認します。

[1]: /ja/agent/basic_agent_usage/
[2]: /ja/agent/logs/#custom-log-collection
[3]: /ja/agent/guide/agent-configuration-files/
[4]: /ja/agent/guide/agent-commands/#restart-the-agent
{{% /tab %}}
{{< /tabs >}}

**重要**:

- コンテナメタデータはカスタムログ収集では取得されないため、Agent はコンテナタグをログに自動的に割り当てません。[カスタムタグ][1]を使用してコンテナタグを作成します。

- Datadog Agent 6.8 以降では、`source` や `service` の初期値は `short_image` タグの値となります。下で説明するように、ソースやサービスの値はオートディスカバリーで上書きすることができます。`source` 値をインテグレーション名に設定すると、ログをパースして関連情報を抽出するインテグレーション Pipelines がインストールされます。

- コンテナ `Stderr` からのログは `Error` の状態がデフォルトとなります。

- Docker のデフォルトである json-file ログドライバーではなく _journald_ ログドライバーを使用する場合は、コンテナ環境の設定に関するドキュメント [journald インテグレーション][2]をご覧ください。フィルタリング対象のパラメーターについての詳細は、[journald フィルターユニット][2]のドキュメントを参照してください。

## ログインテグレーション

Datadog Agent 6.8 以降では、`source` や `service` の初期値は `short_image` タグの値となります。これにより、Datadog は各コンテナのログソースを特定でき、対応するインテグレーションを自動的にインストールできます。

コンテナのショートイメージ名とカスタムイメージのインテグレーション名が一致しない場合があります。アプリケーションにふさわしい名前に上書きするには、[Datadog オートディスカバリー][3]や [Kubernetes ポッドアノテーション][4]またはコンテナラベルを使います。

オートディスカバリーは、ファイルの種類に応じてラベルが以下の形式となることを前提とします。

{{< tabs >}}
{{% tab "Dockerfile" %}}

Dockerfile に以下の`LABEL` を追加します：

```text
LABEL "com.datadoghq.ad.logs"='[<ログコンフィギュレーション>]'
```

{{% /tab %}}
{{% tab "Docker-Compose" %}}

`docker-compose.yaml` ファイルに以下のラベルを追加します：

```yaml
labels:
    com.datadoghq.ad.logs: '["<LOGS_CONFIG>"]'
```

{{% /tab %}}
{{% tab "Run Command" %}}

実行コマンドとして次のラベルを追加します：

```text
-l com.datadoghq.ad.logs='[<ログコンフィギュレーション>]'
```

{{% /tab %}}
{{< /tabs >}}

`<LOG_CONFIG>` がログ収集コンフィギュレーションの場合、インテグレーション構成ファイルにあります。[詳細は、ログ収集コンフィギュレーションを参照してください][5]。

**注**: Datadog では、Dockerラベルを使い `service` 値を設定する際のベストプラクティスとして、統合サービスタグ付けの使用をお勧めしています。統合サービスタグ付けは `env`、`service`、`version` の 3 つの標準タグを使用して、ログを含むすべての Datadog テレメトリーと結合します。ご使用環境で統合タグ付けを構成する方法に関する詳細は、[統合サービスタグ付け][6]ドキュメントをご参照ください。

### 例

{{< tabs >}}
{{% tab "NGINX Dockerfile" %}}

次の Dockerfile は対応するコンテナにおける NGINX ログインテグレーションを有効にします (`service` の値は変更できます)：

```text
LABEL "com.datadoghq.ad.logs"='[{"source": "nginx", "service": "webapp"}]'
```

メトリクスとログ、両 NGINX インテグレーションを有効にする方法

```text
LABEL "com.datadoghq.ad.check_names"='["nginx"]'
LABEL "com.datadoghq.ad.init_configs"='[{}]'
LABEL "com.datadoghq.ad.instances"='[{"nginx_status_url": "http://%%host%%:%%port%%/nginx_status"}]'
LABEL "com.datadoghq.ad.logs"='[{"source": "nginx", "service": "webapp"}]'
```

{{% /tab %}}
{{% tab "Java multi-line logs" %}}

スタックトレースのような複数行のログのため、Agent には複数の行を 1 行に集約する[複数行の処理規則][1]があります。

ログの一例 (Java スタックトレース):

```text
2018-01-03T09:24:24.983Z UTC Exception in thread "main" java.lang.NullPointerException
        at com.example.myproject.Book.getTitle(Book.java:16)
        at com.example.myproject.Author.getBookTitles(Author.java:25)
        at com.example.myproject.Bootstrap.main(Bootstrap.java:14)
```

下にあるように、コンテナで `com.datadoghq.ad.logs` ラベルを使い、上記のログが正確に収集されているかを確かめます。

```yaml
labels:
    com.datadoghq.ad.logs: '[{"source": "java", "service": "myapp", "log_processing_rules": [{"type": "multi_line", "name": "log_start_with_date", "pattern" : "\\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])"}]}]'
```

[複数行の処理規則][1]には、他にもさまざまなパターンが記載されています。


[1]: /ja/agent/logs/advanced_log_collection/?tab=docker#multi-line-aggregation
{{% /tab %}}
{{% tab "From file" %}}

Agent v7.25.0 以降/6.25.0 以降では、コンテナのオートディスカバリーラベルに基づくファイルから直接ログを収集できます。このようなログを収集するには、以下のようにコンテナに `com.datadoghq.ad.logs` ラベルを使用して `/logs/app/prod.log` を収集します。

```yaml
labels:
    com.datadoghq.ad.logs: '[{"type":"file", "source": "sample_app", "service": "sample_service", "path": "/logs/app/prod.log"}]'
```

ファイルから収集されたログは、コンテナのメタデータとともにタグ付けされます。ログ収集はコンテナのライフサイクルにリンクされ、コンテナが停止するとそのファイルからのログ収集も停止します。


**注**:

- ファイルパスは Agent に**相対的**であるため、ファイルを含むディレクトリは、アプリケーションを実行しているコンテナと Agent コンテナの間で共有される必要があります。たとえば、コンテナが `/logs` をマウントする場合、ファイルにログを作成する各コンテナはログファイルが書き込まれる場所に `/logs/app` のようなボリュームをマウントすることがあります。

- このようなラベルをコンテナに使用する場合、その `stderr`/`stdout` ログは自動的に収集されません。`stderr`/`stdout` およびファイルの両方から収集する必要がある場合は、ラベルを使用して明示的に有効にします。たとえば、
```yaml
labels:
    com.datadoghq.ad.logs: '[{"type":"file", "source": "java", "service": "app", "path": "/logs/app/prod.log"}, {"type": "docker", "source": "app_container", "service": "app"}]'
```

- このような組み合わせを使用しているとき、`source` と `service` にデフォルト値はなく、オートディスカバリーのラベルで明示的に設定する必要があります。

{{% /tab %}}
{{< /tabs >}}

**注**: オートディスカバリー機能は、`DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL` 環境変数の有無にかかわらず使用できます。次のオプションの中から 1 つを選択してください。

- コンテナラベルまたはポッドアノテーションを使い、ログを収集するコンテナを選択します。
- 環境変数を使いすべてのコンテナからログを集め、デフォルトの `source` 値と `service` 値を上書きします。
- 必要とする一部のコンテナの処理規則を追加します。

## 高度なログの収集

オートディスカバリーログラベルを使用し、高度なログ収集の処理ロジックを適用します。たとえば、

- [Datadog へ送信する前にログを絞り込む][7]。
- [ログの機密データのスクラビング][8]。
- [複数行の集約の実行][9]。

## コンテナを絞り込む

ログの収集元となるコンテナを管理することができます。これは、たとえば Datadog Agent のログを収集しないようにするのに役立ちます。詳細については[コンテナのディスカバリー管理][10]を参照してください。

## 存続期間が短いコンテナ

Docker 環境では、Agent は Docker イベントによりコンテナのアップデートをリアルタイムに受け取ります。Agent は 1 秒ごとにコンテナラベル（オートディスカバリー）からコンフィギュレーションを抽出しアップデートします。

Agent v6.14 以降、Agent はすべてのコンテナ（実行中かは問わず）のログを収集します。つまり、直近の 1 秒間に開始し停止した存続期間の短いコンテナのログは、削除されるまで収集されます。

Kubernetes 環境には、[Kubernetes 存続期間が短いコンテナのドキュメント][11]を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/getting_started/tagging/assigning_tags/?tab=noncontainerizedenvironments#methods-for-assigning-tags
[2]: /ja/integrations/journald/
[3]: /ja/agent/docker/integrations/
[4]: /ja/agent/kubernetes/integrations/?tab=kubernetespodannotations#configuration
[5]: /ja/agent/logs/#custom-log-collection
[6]: /ja/getting_started/tagging/unified_service_tagging
[7]: /ja/agent/logs/advanced_log_collection/?tab=docker#filter-logs
[8]: /ja/agent/logs/advanced_log_collection/?tab=docker#scrub-sensitive-data-from-your-logs
[9]: /ja/agent/logs/advanced_log_collection/?tab=docker#multi-line-aggregation
[10]: /ja/agent/guide/autodiscovery-management/
[11]: /ja/agent/kubernetes/log/?tab=daemonset#short-lived-containers