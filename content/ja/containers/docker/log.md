---
aliases:
- /ja/logs/docker
- /ja/logs/languages/docker
- /ja/logs/log_collection/docker
- /ja/agent/docker/log
further_reading:
- link: logs/explorer
  tag: Documentation
  text: Learn how to explore your logs
- link: /agent/docker/apm/
  tag: Documentation
  text: Collect your application traces
- link: /agent/docker/prometheus/
  tag: Documentation
  text: Collect your Prometheus metrics
- link: /agent/docker/integrations/
  tag: Documentation
  text: Collect automatically your applications metrics and logs
- link: /agent/guide/autodiscovery-management/
  tag: Documentation
  text: Limit data collection to a subset of containers only
- link: /agent/docker/tag/
  tag: Documentation
  text: Assign tags to all data emitted by a container
title: Docker Log collection
---

## 概要

Datadog Agent 6 以降は、コンテナからログを収集します。2 通りのインストレーション方法があります。

ログ収集の構成は、現在の環境によって異なります。開始するには、次のいずれかのインストールを選択してください。

- ご使用の環境が**すべて**のログを `stdout`/`stderr` に書き込む場合は、[コンテナ化された Agent](?tab=containerized-agent#installation) のインストールに従ってください。

- コンテナ化された Agent をデプロイできず、コンテナが**すべて**のログを `stdout`/`stderr` に書き込む場合は、[ホスト Agent](?tab=hostagent#installation) のインストールに従って、Agent コンフィギュレーションファイル内でコンテナ化されたログを有効にします。 

- コンテナがログをファイルに書き込む場合 (ログを `stdout`/`stderr` に部分的にのみ書き込み、ログをファイルに書き込むか、ログをファイルに完全に書き込む)、[カスタムログ収集を使用するホスト Agent](?tab=hostagentwithcustomlogging#installation) のインストールまたは[コンテナ化された Agent](?tab=containerized-agent#installation) のインストール手順に従い、[オートディスカバリーコンフィギュレーションの例があるファイルからのログ収集](?tab=logcollectionfromfile#examples)を確認します。

このページの CLI コマンドは Docker ランタイム用です。containerd ランタイムは `docker` を `nerdctl` に、Podman ランタイムは `podman` に置き換えてください。containerd と Podman のログ収集のサポートは限定的です。

## インストール

{{< tabs >}}
{{% tab "Container Installation" %}}

Datadog Agent を埋め込みホストを監視する [Docker コンテナ][1] を実行するには、それぞれの OS で次のコマンドを使用します。

### Linux
For the following configuration, replace `<DD_SITE>` with {{< region-param key="dd_site" >}}:
{{< site-region region="us,eu,us3,us5,ap1,gov" >}}
```shell
docker run -d --name datadog-agent \
           --cgroupns host \
           --pid host \
           -e DD_API_KEY=<DATADOG_API_KEY> \
           -e DD_LOGS_ENABLED=true \
           -e DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL=true \
           -e DD_CONTAINER_EXCLUDE="name:datadog-agent" \
           -e DD_SITE=<DD_SITE>
           -v /var/run/docker.sock:/var/run/docker.sock:ro \
           -v /var/lib/docker/containers:/var/lib/docker/containers:ro \
           -v /proc/:/host/proc/:ro \
           -v /opt/datadog-agent/run:/opt/datadog-agent/run:rw \
           -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
           gcr.io/datadoghq/agent:latest
```
{{< /site-region >}}

### Windows
For the following configuration, replace `<DD_SITE>` with {{< region-param key="dd_site" >}}:
{{< site-region region="us,eu,us3,us5,ap1,gov" >}}
```shell
docker run -d --name datadog-agent \
           --cgroupns host \
           --pid host \
           -e DD_API_KEY=<DATADOG_API_KEY> \
           -e DD_LOGS_ENABLED=true \
           -e DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL=true \
           -e DD_CONTAINER_EXCLUDE="name:datadog-agent" \
           -e DD_SITE=<DD_SITE> \
           -v \\.\pipe\docker_engine:\\.\pipe\docker_engine \
           -v c:\programdata\docker\containers:c:\programdata\docker\containers:ro
           gcr.io/datadoghq/agent:latest
```
{{< /site-region >}}

### macOS
Docker Desktop -> Settings -> Resources -> File sharing に `/opt/datadog-agent/run` というパスを追加します。

For the following configuration, replace `<DD_SITE>` with {{< region-param key="dd_site" >}}:
{{< site-region region="us,eu,us3,us5,ap1,gov" >}}
```shell
docker run -d --name datadog-agent \
           --cgroupns host \
           --pid host \
           -e DD_API_KEY=<DATADOG_API_KEY> \
           -e DD_LOGS_ENABLED=true \
           -e DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL=true \
           -e DD_LOGS_CONFIG_DOCKER_CONTAINER_USE_FILE=true \
           -e DD_CONTAINER_EXCLUDE="name:datadog-agent" \
           -e DD_SITE=<DD_SITE> \
           -v /var/run/docker.sock:/var/run/docker.sock:ro \
           -v /var/lib/docker/containers:/var/lib/docker/containers:ro \
           -v /opt/datadog-agent/run:/opt/datadog-agent/run:rw \
           gcr.io/datadoghq/agent:latest
```
{{< /site-region >}}

最新版の Datadog Agent の使用が推奨されます。GCR で利用できる [Agent v6 のイメージ][2]リストを参照してください。

ログ収集に関連するコマンド：

`-e DD_LOGS_ENABLED=true`                                     
: `true` に設定すると、ログ収集が有効になります。これで、Agent はコンフィギュレーションファイルにあるログインストラクションを探します。

`-e DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL=true`                
: すべてのコンテナに対してログ収集を有効化するログコンフィギュレーションを追加します。

`-v /opt/datadog-agent/run:/opt/datadog-agent/run:rw`         
: 再起動中またはネットワーク障害発生時のコンテナログの紛失を回避します。このディレクトリで各コンテナについて収集されたログの最終行がホスト上に保存されます。

`-e DD_CONTAINER_EXCLUDE="name:datadog-agent"`                
: Datadog Agent がそれ自身のログとメトリクスを収集および送信することを回避します。Datadog Agent のログまたはメトリクスを収集する場合はこのパラメーターを削除してください。このパラメーター値は正規表現をサポートしています。

`-v /var/run/docker.sock:/var/run/docker.sock:ro`             
: Docker daemon に接続してコンテナを探し、Docker ソケットから `stdout/stderr` を収集します。

`-v /var/lib/docker/containers:/var/lib/docker/containers:ro` 
: ファイルからコンテナログを収集します。Datadog Agent 6.27.0/7.27.0 以降で利用可能です。

**注**: Docker Compose を使用する場合、`DD_CONTAINER_EXCLUDE` の値は引用符で囲んではいけません。以下の例のように、docker-compose.yaml ファイルに環境変数を構成してください。

```yaml
environment:
    - DD_CONTAINER_EXCLUDE=image:datadog/agent:*
```

[1]: https://github.com/DataDog/datadog-agent/tree/main/Dockerfiles/agent
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
3. **Windows 10 のみ**: Docker コンテナ作業のアクセス許可を得るには、Datadog Agent ユーザーが `docker-users` グループのメンバーである必要があります。管理者コマンドプロンプトから `net localgroup docker-users "ddagentuser" /ADD` を実行するか、[Docker ユーザーグループ][2]のコンフィギュレーション手順に従ってください。
4. [Agent を再起動][3]して、Datadog ですべてのコンテナログを確認します。

[1]: /ja/agent/basic_agent_usage/
[2]: https://docs.microsoft.com/en-us/visualstudio/containers/troubleshooting-docker-errors?view=vs-2019#docker-users-group
[3]: /ja/agent/configuration/agent-commands/#restart-the-agent
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

**注**: カスタムログ構成のコンテナによって生成されたログを Agent が収集するためには、ログがホストからアクセス可能なボリュームに書き込まれる必要があります。コンテナログは、自動的に収集できるように `stdout` と `stderr` に書き込むことをお勧めします。

[1]: /ja/agent/basic_agent_usage/
[2]: /ja/agent/logs/#custom-log-collection
[3]: /ja/agent/configuration/agent-configuration-files/
[4]: /ja/agent/configuration/agent-commands/#restart-the-agent
{{% /tab %}}
{{< /tabs >}}

**重要**:

- コンテナメタデータはカスタムログ収集では取得されないため、Agent はコンテナタグをログに自動的に割り当てません。[カスタムタグ][1]を使用してコンテナタグを作成します。

- Datadog Agent 6.8 以降では、`source` や `service` の初期値は `short_image` タグの値となります。下で説明するように、ソースやサービスの値はオートディスカバリーで上書きすることができます。`source` 値をインテグレーション名に設定すると、ログをパースして関連情報を抽出するインテグレーション Pipelines がインストールされます。

- コンテナ `Stderr` からのログは `Error` の状態がデフォルトとなります。

- Docker のデフォルトである json-file ログドライバーではなく _journald_ ログドライバーを使用する場合は、コンテナ環境の設定に関する[ドキュメント journald インテグレーション][2]をご覧ください。フィルタリング対象のパラメーターについての詳細は、[journald フィルターユニットのドキュメント][2]を参照してください。


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
{{% tab "Docker Compose" %}}

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

**注**: Datadog では、Dockerラベルを使い `service` 値を設定する際のベストプラクティスとして、統合サービスタグ付けの使用をお勧めしています。統合サービスタグ付けは `env`、`service`、`version` の 3 つの標準タグを使用して、ログを含むすべての Datadog テレメトリーと結合します。ご使用環境で統合タグ付けを構成する方法に関する詳細は、[統合サービスタグ付けのドキュメント][6]をご参照ください。

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

## ファイルからの Docker コンテナログ収集

Docker コンテナのログ収集は、Docker ソケット経由の収集の代わりに、ファイルからの収集が可能です。ファイルベースの収集は、ソケットベースの収集よりも優れたパフォーマンスを提供します。

バージョン 7.27.0/6.27.0+ では、Docker コンテナログをファイルから収集するように Agent を構成することができます。バージョン 6.33.0+/7.33.0+ では、Agent はデフォルトでファイルから Docker コンテナログを収集します。

ファイルベースの収集では、Docker コンテナログを格納するディレクトリを次の場所で Agent に公開する必要があります: `/var/lib/docker/containers` (Windows では `c:\programdata\docker\containers`)。詳細は、[Docker ログ収集トラブルシューティングガイド][10]を参照してください。

**注**:
- Docker ソケットベースのコンテナログ収集からファイルベースのログ収集に移行すると、新しいコンテナのみがそのファイルから追跡されるようになります。環境変数 `DD_LOGS_CONFIG_DOCKER_CONTAINER_FORCE_USE_FILE` を `true` に設定すると、Agent が全てのコンテナログをファイルから収集するよう強制することができます。Agent がファイルからすべてのコンテナログを収集するように強制すると、既存のコンテナのログが重複することがあります。
- Agent をコンテナファイルのログ収集から Docker ソケット経由の収集に戻した場合、既存のコンテナのログが重複して表示される可能性があります。

## コンテナを絞り込む

ログの収集元となるコンテナを管理することができます。これは、たとえば Datadog Agent のログを収集しないようにするのに役立ちます。詳細については[コンテナのディスカバリー管理][11]を参照してください。

## 存続期間が短いコンテナ

Docker 環境では、Agent は Docker イベントによりコンテナのアップデートをリアルタイムに受け取ります。Agent は 1 秒ごとにコンテナラベル（オートディスカバリー）からコンフィギュレーションを抽出しアップデートします。

Agent v6.14 以降、Agent はすべてのコンテナ（実行中かは問わず）のログを収集します。つまり、直近の 1 秒間に開始し停止した存続期間の短いコンテナのログは、削除されるまで収集されます。

Kubernetes 環境には、[Kubernetes 存続期間が短いコンテナのドキュメント][12]を参照してください。

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
[10]: /ja/logs/guide/docker-logs-collection-troubleshooting-guide/
[11]: /ja/agent/guide/autodiscovery-management/
[12]: /ja/agent/kubernetes/log/?tab=daemonset#short-lived-containers