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

- Agent が Docker 環境の外部にあるホスト
- コンテナ化された Agent の Docker 環境へのデプロイ

次に、環境コンテナからすべてのログを収集することも、コンテナイメージ名またはコンテナラベルで絞り込んで、収集するログを選別することもできます。本ドキュメントでは、実行中のすべてのコンテナからログを収集する方法と共に、オートディスカバリーを活用しログインテグレーションを有効にする方法を紹介します。

## ワンステップインストレーション

まず最初に、Agent（コンテナバージョンおよび直接ホストバージョンともに） のインストレーションと、すべてのコンテナのログ収集を有効にします。

{{< tabs >}}
{{% tab "Container Installation" %}}

Datadog Agent を埋め込みホストを監視する [Docker コンテナ][1] を実行するには、次のコマンドを使用します。

```shell
docker run -d --name datadog-agent \
           -e DD_API_KEY="<DATADOG_API_KEY>" \
           -e DD_LOGS_ENABLED=true \
           -e DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL=true \
           -e DD_CONTAINER_EXCLUDE="name:datadog-agent" \
           -v /var/run/docker.sock:/var/run/docker.sock:ro \
           -v /proc/:/host/proc/:ro \
           -v /opt/datadog-agent/run:/opt/datadog-agent/run:rw \
           -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
           gcr.io/datadoghq/agent:latest
```

**注**: Windows システムでは、このコマンドをボリュームマウントなしで実行します。つまり以下のようになります。

```shell
docker run -d --name datadog-agent \
           -e DD_API_KEY="<DATADOG_API_KEY>" \
           -e DD_LOGS_ENABLED=true \
           -e DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL=true \
           -e DD_CONTAINER_EXCLUDE="name:datadog-agent" \
           -v \\.\pipe\docker_engine:\\.\pipe\docker_engine \
           gcr.io/datadoghq/agent:latest
```

最新版の Datadog Agent の使用が推奨されます。Docker Hub で利用できる [Agent v6 のイメージ][2]リストを参照してください。

ログ収集に関連するコマンド：

| コマンド                                               | 説明                                                                                                                                                      |
| ----------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `-e DD_LOGS_ENABLED=true`                             | `true` に設定すると、ログ収集が有効になります。Agent は構成ファイルのログ命令を探します。                                                          |
| `-e DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL=true`        | すべてのコンテナのログ収集を有効にするログコンフィギュレーションを追加します。                                                                                         |
| `-v /opt/datadog-agent/run:/opt/datadog-agent/run:rw` | 再起動の際やネットワークで問題が生じた際でもコンテナログを紛失しないよう、このディレクトリ内の各コンテナのために収集された最後のログ行は、ホストに保存されます。     |
| `-e DD_CONTAINER_EXCLUDE="name:datadog-agent"`               | Datadog Agent が自身のログやメトリクスを収集したり送信するのを防ぎます。Datadog Agent ログやメトリクスを収集したい場合は、このパラメータを削除します。このパラメーター値は正規表現をサポートしています。 |
| `-v /var/run/docker.sock:/var/run/docker.sock:ro`     | ログは Docker ソケットの `stdout/stderr` コンテナから収集されます。                                                                                        |

[1]: https://github.com/DataDog/datadog-agent/tree/master/Dockerfiles/agent
[2]: https://gcr.io/datadoghq/agent
{{% /tab %}}
{{% tab "Host Installation" %}}

ホストに[最新版の Agent 6][1] をインストールします。Agent は [ホスト上のファイル][2] または `stdout`/`stderr` コンテナからログを収集できます。

デフォルトの状態では、Datadog Agent でのログ収集は _無効_ になっています。有効にするには、`datadog.yaml` 構成ファイルに次の行を加えます。

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

[Agent を再起動][3] し、Datadog のコンテナログを確認します。


[1]: /ja/agent/basic_agent_usage/
[2]: /ja/agent/logs/#custom-log-collection
[3]: /ja/agent/guide/agent-commands/#restart-the-agent
{{% /tab %}}
{{< /tabs >}}

**重要**:

- Datadog Agent 6.8 以降では、`source` や `service` の初期値は `short_image` タグの値となります。下で説明するように、ソースやサービスの値はオートディスカバリーで上書きすることができます。`source` 値をインテグレーション名に設定すると、ログをパースして関連情報を抽出するインテグレーション Pipelines がインストールされます。

- コンテナ `Stderr` からのログは `Error` の状態がデフォルトとなります。

- Docker のデフォルトである json-file ログドライバーではなく _journald_ ログドライバーを使用する場合は、コンテナ環境の設定に関するドキュメント [journald インテグレーション][1] をご覧ください。フィルタリング対象のパラメーターについての詳細は、[journald フィルターユニット][1]のドキュメントを参照してください。

## ログインテグレーション

Datadog Agent 6.8 以降では、`source` や `service` の初期値は `short_image` タグの値となります。これにより、Datadog は各コンテナのログソースを特定でき、対応するインテグレーションを自動的にインストールできます。

コンテナのショートイメージ名とカスタムイメージのインテグレーション名が一致しない場合があります。アプリケーションにふさわしい名前に上書きするには、[Datadog オートディスカバリー][2] や [Kubernetes ポッドアノテーション][3] またはコンテナラベルを使います。

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

`<LOG_CONFIG>` がログ収集コンフィギュレーションの場合、インテグレーション構成ファイルにあります。[詳細は、ログ収集コンフィギュレーションを参照してください][4]。

**注**: Datadog では、Dockerラベルを使い `service` 値を設定する際のベストプラクティスとして、統合サービスタグ付けの使用をお勧めしています。統合サービスタグ付けは `env`、`service`、`version` の 3 つの標準タグを使用して、ログを含むすべての Datadog テレメトリーと結合します。ご使用環境で統合タグ付けを構成する方法に関する詳細は、[統合サービスタグ付け][5]ドキュメントをご参照ください。

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


[1]: /ja/agent/logs/advanced_log_collection/#multi-line-aggregation
{{% /tab %}}
{{< /tabs >}}

**注**: オートディスカバリー機能は、`DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL` 環境変数の有無にかかわらず使用できます。次のオプションの中から 1 つを選択してください。

- コンテナラベルまたはポッドアノテーションを使い、ログを収集するコンテナを選択します。
- 環境変数を使いすべてのコンテナからログを集め、デフォルトの `source` 値と `service` 値を上書きします。
- 必要とする一部のコンテナの処理規則を追加します。

## 高度なログの収集

オートディスカバリーログラベルを使用し、高度なログ収集の処理ロジックを適用します。たとえば、

- [Datadog へ送信する前にログを絞り込む][6]。
- [ログの機密データのスクラビング][7]。
- [複数行の集約の実行][8]。

## コンテナを絞り込む

ログの収集元となるコンテナを管理することができます。これは、たとえば Datadog Agent のログを収集しないようにするのに役立ちます。詳細については[コンテナのディスカバリー管理][9]を参照してください。

## 存続期間が短いコンテナ

Docker 環境では、Agent は Docker イベントによりコンテナのアップデートをリアルタイムに受け取ります。Agent は 1 秒ごとにコンテナラベル（オートディスカバリー）からコンフィギュレーションを抽出しアップデートします。

Agent v6.14 以降、Agent はすべてのコンテナ（実行中かは問わず）のログを収集します。つまり、直近の 1 秒間に開始し停止した存続期間の短いコンテナのログは、削除されるまで収集されます。

Kubernetes 環境には、[Kubernetes 存続期間が短いコンテナのドキュメント][10]を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/integrations/journald/
[2]: /ja/agent/docker/integrations/
[3]: /ja/agent/kubernetes/integrations/?tab=kubernetespodannotations#configuration
[4]: /ja/agent/logs/#custom-log-collection
[5]: /ja/getting_started/tagging/unified_service_tagging
[6]: /ja/agent/logs/advanced_log_collection/?tab=docker#filter-logs
[7]: /ja/agent/logs/advanced_log_collection/?tab=docker#scrub-sensitive-data-from-your-logs
[8]: /ja/agent/logs/advanced_log_collection/?tab=docker#multi-line-aggregation
[9]: /ja/agent/guide/autodiscovery-management/
[10]: /ja/agent/kubernetes/log/#short-lived-containers