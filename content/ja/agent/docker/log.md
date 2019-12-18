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
  - link: logs/explorer/analytics
    tag: Documentation
    text: ログ分析の実行
  - link: logs/processing
    tag: Documentation
    text: ログの処理方法
  - link: logs/processing/parsing
    tag: Documentation
    text: パースの詳細
---
## 概要

Datadog Agent 6 以降は、コンテナからログを収集します。2 通りのインストレーション方法があります。

- Agent が Docker 環境の外部にあるホスト
- コンテナ化された Agent の Docker 環境へのデプロイ

環境コンテナからすべてのログを収集することも、コンテナイメージ名またはコンテナラベルで絞り込んで、収集するログを選別することもできます。

本ドキュメントでは、実行中のすべてのコンテナからログを収集する方法と共に、オートディスカバリーを活用しログインテグレーションを有効にする方法を紹介します。

## セットアップ

### コンテナログのすべてを収集するためのシングルステップインストール

まず最初に、Agent（コンテナバージョンおよび直接ホストバージョンともに） のインストレーションと、すべてのコンテナのログ収集を有効にします。

{{< tabs >}}
{{% tab "Container Installation" %}}

Datadog Agent を embed しホストを監視する [Docker コンテナ][1] を実行するには、次のコマンドを使用します。

```
docker run -d --name datadog-agent \
           -e DD_API_KEY=<API キー> \
           -e DD_LOGS_ENABLED=true \
           -e DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL=true \
           -e DD_AC_EXCLUDE="name:datadog-agent" \
           -v /var/run/docker.sock:/var/run/docker.sock:ro \
           -v /proc/:/host/proc/:ro \
           -v /opt/datadog-agent/run:/opt/datadog-agent/run:rw \
           -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
           datadog/agent:latest
```

最新版の Datadog Agent の使用が推奨されます。Docker Hub で利用できる [Agent v6 のイメージ][2]リストを参照してください。

ログ収集に関連するコマンド：

| コマンド                                               | 説明                                                                                                                                                  |
|-------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `-e DD_LOGS_ENABLED=true`                             | `true` に設定すると、ログ収集が有効になります。Agent は構成ファイルのログ命令を探します。                                                      |
| `-e DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL=true`        | すべてのコンテナのログ収集を有効にするログ構成を追加します。                                                                                     |
| `-v /opt/datadog-agent/run:/opt/datadog-agent/run:rw` | 再起動の際やネットワークで問題が生じた際でもコンテナログを紛失しないよう、このディレクトリ内の各コンテナのために収集された最後のログ行は、ホストに保存されます。 |
| `-e DD_AC_EXCLUDE="name:datadog-agent"`               | Datadog Agent が自身のログやメトリクスを収集したり送信するのを防ぎます。Datadog Agent ログやメトリクスを収集したい場合は、このパラメータを削除します。                    |
| `-v /var/run/docker.sock:/var/run/docker.sock:ro`     | ログは Docker ソケットの `stdout/stderr` コンテナから収集されます。                                                                                    |


[1]: https://github.com/DataDog/datadog-agent/tree/master/Dockerfiles/agent
[2]: https://hub.docker.com/r/datadog/agent/tags
{{% /tab %}}
{{% tab "Host Installation" %}}

ホストに[最新版の Agent 6][1] をインストールします。Agent は [ホスト上のファイル][2] または `stdout`/`stderr` コンテナからログを収集できます。

デフォルトの状態では、Datadog Agent でのログ収集は *無効* になっています。有効にするには、`datadog.yaml` 構成ファイルに次の行を加えます。

```
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


[1]: /ja/agent/basic_agent_usage
[2]: /ja/agent/logs/#custom-log-collection
[3]: /ja/agent/guide/agent-commands/#restart-the-agent
{{% /tab %}}
{{< /tabs >}}

**重要**:

* Datadog Agent 6.8 以降では、`source` や `service` の初期値は `short_image` タグの値となります。
下で説明するように、ソースやサービスの値はオートディスカバリーで上書きすることができます。`source` 値をインテグレーション名に設定すると、ログをパースして関連情報を抽出するインテグレーション Pipelines がインストールされます。

* コンテナ `Stderr` からのログは `Error` の状態がデフォルトとなります。

* Docker のデフォルトである json-file ログドライバーではなく、*journald* ログドライバーを使用する場合は、コンテナ環境の設定に関するドキュメント [journald インテグレーション][1] をご覧ください。

### インテグレーションのためのログ収集を有効にする

Datadog Agent 6.8 以降では、`source` や `service` の初期値は `short_image` タグの値となります。これにより、Datadog は各コンテナのログソースを特定でき、対応するインテグレーションを自動的にインストールできます。

コンテナのショートイメージ名とカスタムイメージのインテグレーション名が一致しない場合があります。アプリケーションにふさわしい名前に上書きするには、[Datadog オートディスカバリー][2] や [Kubernetes ポッドアノテーション][3] またはコンテナラベルを使います。

オートディスカバリーは、ファイルの種類に応じてラベルが以下の形式となることを前提とします。

{{< tabs >}}
{{% tab "Dockerfile" %}}

Dockerfile に以下の`LABEL` を追加します：

```
LABEL "com.datadoghq.ad.logs"='[<LOGS_CONFIG>]'
```

{{% /tab %}}
{{% tab "Docker-Compose" %}}

`docker-compose.yaml` ファイルに以下のラベルを追加します：

```
labels:
  com.datadoghq.ad.logs: '[<LOGS_CONFIG>]'
```

{{% /tab %}}
{{% tab "Run Command" %}}

実行コマンドとして次のラベルを追加します：

```
-l com.datadoghq.ad.logs='[<LOGS_CONFIG>]'
```

{{% /tab %}}
{{< /tabs >}}

`<LOG_CONFIG>` がログ収集構成の場合、インテグレーション構成ファイルにあります。[詳細は、ログ収集構成を参照してください。][4]

#### 例

{{< tabs >}}
{{% tab "NGINX Dockerfile" %}}

次の Dockerfile は対応するコンテナにおける NGINX ログインテグレーションを有効にします (`service` の値は変更できます)：

```
LABEL "com.datadoghq.ad.logs"='[{"source": "nginx", "service": "webapp"}]'
```

メトリクスとログ、両 NGINX インテグレーションを有効にする方法

```
LABEL "com.datadoghq.ad.check_names"='["nginx"]'
LABEL "com.datadoghq.ad.init_configs"='[{}]'
LABEL "com.datadoghq.ad.instances"='[{"nginx_status_url": "http://%%host%%:%%port%%/nginx_status"}]'
LABEL "com.datadoghq.ad.logs"='[{"source": "nginx", "service": "webapp"}]'
```

{{% /tab %}}
{{% tab "Java multi-line logs" %}}

スタックトレースのような複数行のログのため、Agent には複数の行を 1 行に集約する[複数行の処理規則][1]があります。

ログの一例 (Java スタックトレース):

```
2018-01-03T09:24:24.983Z UTC Exception in thread "main" java.lang.NullPointerException
        at com.example.myproject.Book.getTitle(Book.java:16)
        at com.example.myproject.Author.getBookTitles(Author.java:25)
        at com.example.myproject.Bootstrap.main(Bootstrap.java:14)
```

下にあるように、コンテナで `com.datadoghq.ad.logs` ラベルを使い、上記のログが正確に収集されているかを確かめます。

  ```
  labels:
    com.datadoghq.ad.logs: '[{"source": "java", "service": "myapp", "log_processing_rules": [{"type": "multi_line", "name": "log_start_with_date", "pattern" : "\\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])"}]}]'
  ```
[複数行の処理規則][1]には、他にもさまざまなパターンが記載されています。


[1]: /ja/agent/logs/advanced_log_collection/#multi-line-aggregation
{{% /tab %}}
{{% tab "Kubernetes" %}}

Kubernetes を実行している場合、ポッドアノテーションを利用できます。

```
apiVersion: apps/v1
kind: ReplicaSet
metadata:
  name: nginx
spec:
  selector:
    matchLabels:
      app: webapp
  template:
    metadata:
      annotations:
        ad.datadoghq.com/nginx.logs: '[{"source":"nginx","service":"webapp"}]'
      labels:
        app: webapp
      name: nginx
    spec:
      containers:
        - name: nginx
          image: nginx:latest

```

オートディスカバリーに関する手順、一例、詳細に関しては、[オートディスカバリーガイド][1]を参照してください。 


[1]: /ja/agent/autodiscovery/integrations/?tab=kubernetespodannotations#configuration
{{% /tab %}}
{{< /tabs >}}

**注**: オートディスカバリー機能は、`DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL` 環境変数の有無にかかわらず使用できます。次のオプションの中から 1 つを選択してください。

* コンテナラベルまたはポッドアノテーションを使い、ログを収集するコンテナを選択します。
* 環境変数を使いすべてのコンテナからログを集め、デフォルトの `source` 値と `service` 値を上書きします。
* 必要とする一部のコンテナの処理規則を追加します。

### コンテナを絞り込む

以下の方法で、ログ、メトリクス、オートディスカバリーの絞り込みができます。これにより、Datadog Agent ログの収集を防ぐことができます。

{{< tabs >}}
{{% tab "Environment variable" %}}

イメージまたはコンテナ名で絞り込んだコンテナ一覧を含めたり除く際に使える環境変数が 2 つあります。

* `DD_AC_INCLUDE`: 常に対象に入れるコンテナのホワイトリスト
* `DD_AC_EXCLUDE`: 除外するコンテナのブラックリスト

このオプションは、スペース区切り文字列形式です。たとえば、2 つのイメージのみをモニターして残りを除外したい場合、以下のようにします。

```
DD_AC_EXCLUDE = "image:.*"
DD_AC_INCLUDE = "image:cp-kafka image:k8szk"
```

特定のコンテナ名を除外するには、以下のようにします。

```
DD_AC_EXCLUDE = "name:datadog-agent"
```

{{% /tab %}}

{{% tab "Configuration File" %}}

`datadog.yaml` にパラメーターが 2 つあり、イメージまたはコンテナ名で絞り込まれたコンテナ一覧を含めたり除外できます。

* `ac_exclude`: 常に含めるコンテナのホワイトリスト
* `ac_include`: 除外するコンテナのブラックリスト

たとえば、2 つのイメージのみをモニターして残りを除外したい場合、以下のようにします。

```
ac_exclude: ["image:.*"]
ac_include: ["image:cp-kafka", "image:k8szk"]
```

Datadog Agent を除外するには、以下のようにします。

```
ac_exclude = ["name:datadog-agent"]
```

{{% /tab %}}
{{< /tabs >}}

## 存続期間が短いコンテナ

Docker 環境では、Agent は Docker イベントによりコンテナのアップデートをリアルタイムに受け取ります。Agent は 1 秒ごとにコンテナラベル（オートディスカバリー）から構成を抽出しアップデートします。

Agent v6.14 以降、Agent はすべてのコンテナ（実行中かは問わず）のログを収集します。つまり、直近の 1 秒間に開始し停止した存続期間の短いコンテナのログは、削除されるまで収集されます。

Kubernetes 環境には、[Kubernetes 存続期間が短いコンテナのドキュメント][5]を参照してください。

## その他の参考資料


{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/integrations/journald
[2]: /ja/agent/autodiscovery
[3]: /ja/agent/autodiscovery/integrations/?tab=kubernetespodannotations#configuration
[4]: /ja/agent/logs/#custom-log-collection
[5]: https://docs.datadoghq.com/ja/agent/kubernetes/daemonset_setup/?tab=k8sfile#short-lived-containers