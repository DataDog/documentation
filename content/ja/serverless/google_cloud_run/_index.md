---
further_reading:
- link: https://www.datadoghq.com/blog/instrument-cloud-run-with-datadog-sidecar/
  tag: GitHub
  text: 新しい Datadog Agent サイドカーを使用して Google Cloud Run アプリケーションをインスツルメントする
- link: https://www.datadoghq.com/blog/collect-traces-logs-from-cloud-run-with-datadog/
  tag: ブログ
  text: Cloud Run サービスからのトレース、ログ、カスタムメトリクスの収集
title: Google Cloud Run
---

## 概要

Google Cloud Run は、コンテナベースのアプリケーションをデプロイおよびスケーリングするためのフルマネージドのサーバーレスプラットフォームです。Datadog は [Google Cloud integration][1] を通じて、Cloud Run の監視およびログ収集を提供します。

<div class="alert alert-info">Google Cloud Run のアプリケーションを <code>serverless-init</code> でインスツルメントするには、<a href="/serverless/guide/gcr_serverless_init">serverless-init を使用して Google Cloud Run をインスツルメントする</a>を参照してください。</div> 

## セットアップ

### Application

{{< tabs >}}
{{% tab "Node.js" %}}
#### トレーシング

メインアプリケーションに `dd-trace-js` ライブラリを追加します。手順については [Node.js アプリケーションのトレーシング][1]を参照してください。 

`ENV NODE_OPTIONS="--require dd-trace/init"` を設定します。これは、Node.js プロセス開始時に `dd-trace/init` モジュールが必ず読み込まれるよう指定するものです。 

#### プロファイリング
プロファイラは Datadog のトレーシングライブラリ内に同梱されています。すでにアプリケーションのトレース収集 (APM) を行っている場合は、ライブラリを追加インストールする必要はなく、プロファイラの有効化に直接進めます。環境変数の追加方法については [Node.js プロファイラの有効化][5]を参照してください。

#### メトリクス
トレーシングライブラリはカスタムメトリクスも収集します。詳しくは[コード例][2]を参照してください。

#### ログ
Datadog のサイドカーは共有ボリュームを通じてログを収集します。メインコンテナからサイドカーにログを転送するには、以下の手順に従い、アプリケーションがすべてのログを `shared-volume/logs/*.log` のような場所に書き込むよう設定してください。GCP の UI で `DD_SERVERLESS_LOG_PATH` 環境変数と、メイン・サイドカー両方のコンテナに対する共有ボリュームマウントを追加する必要があります。YAML や Terraform を使ってデプロイする場合は、環境変数やヘルスチェック、ボリュームマウントがすでに追加されています。

アプリケーションでのログ設定方法については [Node.js ログ収集][3]を参照してください。トレースとログの相関を設定するには [Node.js のログとトレースの相関][4]を参照してください。

[1]: /ja/tracing/trace_collection/automatic_instrumentation/dd_libraries/nodejs/#getting-started
[2]: /ja/metrics/custom_metrics/dogstatsd_metrics_submission/#code-examples
[3]: /ja/logs/log_collection/nodejs/?tab=winston30
[4]: /ja/tracing/other_telemetry/connect_logs_and_traces/nodejs
[5]: https://docs.datadoghq.com/ja/profiler/enabling/nodejs?tab=environmentvariables

{{% /tab %}}
{{% tab "Python" %}}
#### トレーシング

メインアプリケーションに `dd-trace-py` ライブラリを追加します。手順については [Python アプリケーションのトレース][1]を参照してください。[チュートリアル: Python アプリケーションと Datadog Agent をコンテナで使用してトレースを有効化する][5]を利用することもできます。

#### プロファイリング
プロファイラは Datadog のトレーシングライブラリ内に同梱されています。すでにアプリケーションのトレース収集 (APM) を行っている場合は、ライブラリを追加インストールする必要はなく、プロファイラの有効化に直接進めます。環境変数の追加方法については [Python プロファイラの有効化][7]を参照してください。

#### メトリクス
トレーシングライブラリはカスタムメトリクスも収集します。詳しくは[コード例][2]を参照してください。

#### ログ
Datadog のサイドカーは共有ボリュームを通じてログを収集します。メインコンテナからサイドカーにログを転送するには、以下の手順に従い、アプリケーションがすべてのログを `shared-volume/logs/*.log` のような場所に書き込むよう設定してください。GCP の UI で `DD_SERVERLESS_LOG_PATH` 環境変数と、メイン・サイドカー両方のコンテナに対する共有ボリュームマウントを追加する必要があります。YAML や Terraform を使ってデプロイする場合は、環境変数やヘルスチェック、ボリュームマウントがすでに追加されています。

アプリケーションでのログ設定方法については [Python ログ収集][3]を参照してください。[Python ロギングのベストプラクティス][6]も役立ちます。トレースとログの相関を設定するには [Python のログとトレースの相関][4]を参照してください。

[1]: /ja/tracing/trace_collection/automatic_instrumentation/dd_libraries/python
[2]: /ja/metrics/custom_metrics/dogstatsd_metrics_submission/#code-examples
[3]: /ja/logs/log_collection/python
[4]: /ja/tracing/other_telemetry/connect_logs_and_traces/python
[5]: /ja/tracing/guide/tutorial-enable-python-containers/
[6]: https://www.datadoghq.com/blog/python-logging-best-practices/
[7]: https://docs.datadoghq.com/ja/profiler/enabling/python

{{% /tab %}}
{{% tab "Java" %}}
#### トレーシング

メインアプリケーションに `dd-trace-java` ライブラリを追加します。[Java アプリケーションのトレース][1]の手順に従うか、以下の例の Dockerfile を使用して、自動インストルメンテーション付きでトレーシングライブラリを追加・起動してください。

```dockerfile
FROM eclipse-temurin:17-jre-jammy
WORKDIR /app
COPY target/cloudrun-java-1.jar cloudrun-java-1.jar


# Datadog トレーサーを追加
ADD 'https://dtdg.co/latest-java-tracer' dd-java-agent.jar


EXPOSE 8080


# Datadog トレーサーを javaagent 引数付きで起動
ENTRYPOINT [ "java", "-javaagent:dd-java-agent.jar", "-jar", "cloudrun-java-1.jar" ]
```
#### プロファイリング
Datadog のトレーシングライブラリにはプロファイラが同梱されています。すでにアプリケーションのトレース収集 (APM) を行っている場合は、ライブラリを追加インストールする必要はなく、プロファイラの有効化に直接進めます。環境変数の追加方法については [Java プロファイラの有効化][5]を参照してください。

#### メトリクス
カスタムメトリクスを収集するには、[Java DogStatsD クライアントのインストール][2]を行ってください。

#### ログ
Datadog のサイドカーは共有ボリュームを通じてログを収集します。メインコンテナからサイドカーにログを転送するには、以下の手順に従い、アプリケーションがすべてのログを `shared-volume/logs/*.log` のような場所に書き込むよう設定してください。GCP の UI で `DD_SERVERLESS_LOG_PATH` 環境変数と、メインおよびサイドカー両方のコンテナへの共有ボリュームマウントを追加する必要があります。YAML や Terraform を使用する場合は、環境変数、ヘルスチェック、ボリュームマウントがすでに追加されています。

アプリケーションでのログ設定方法については [Java ログ収集][3]を、トレースとログの相関を設定するには [Java のログとトレースの相関][4]を参照してください。

[1]: /ja/tracing/trace_collection/automatic_instrumentation/dd_libraries/java/#getting-started
[2]: /ja/developers/dogstatsd/?tab=hostagent&code-lang=java#install-the-dogstatsd-client
[3]: /ja/logs/log_collection/java/?tab=winston30
[4]: /ja/tracing/other_telemetry/connect_logs_and_traces/java
[5]: https://docs.datadoghq.com/ja/profiler/enabling/java?tab=datadogprofiler

{{% /tab %}}
{{% tab "Go" %}}
#### トレーシング

メインアプリケーションに `dd-trace-go` ライブラリを追加します。手順については [Go アプリケーションのトレース][1]を参照してください。

#### プロファイリング
Datadog のトレーシングライブラリにはプロファイラが同梱されています。すでにアプリケーションのトレース収集 (APM) を行っている場合は、ライブラリを追加インストールする必要はなく、プロファイラの有効化に直接進めます。環境変数の追加方法については [Go プロファイラの有効化][5]を参照してください。

#### メトリクス
トレーシングライブラリはカスタムメトリクスも収集します。詳しくは[コード例][2]を参照してください。

#### ログ
Datadog のサイドカーは共有ボリュームを通じてログを収集します。メインコンテナからサイドカーにログを転送するには、以下の手順に従い、アプリケーションがすべてのログを `shared-volume/logs/*.log` のような場所に書き込むよう設定してください。GCP の UI で `DD_SERVERLESS_LOG_PATH` 環境変数と、メインおよびサイドカー両方のコンテナへの共有ボリュームマウントを追加する必要があります。YAML や Terraform を使用する場合は、環境変数、ヘルスチェック、ボリュームマウントがすでに追加されています。

アプリケーションでのログ設定方法については [Go ログ収集][3]を、トレースとログの相関を設定するには [Go のログとトレースの相関][4]を参照してください。

[1]: /ja/tracing/trace_collection/automatic_instrumentation/dd_libraries/go/
[2]: /ja/metrics/custom_metrics/dogstatsd_metrics_submission/#code-examples
[3]: /ja/logs/log_collection/go
[4]: /ja/tracing/other_telemetry/connect_logs_and_traces/go
[5]: https://docs.datadoghq.com/ja/profiler/enabling/go

{{% /tab %}}
{{% tab ".NET" %}}
#### トレーシング

メインアプリケーションに .NET トレーシングライブラリを追加します。手順については [.NET アプリケーションのトレース][1]を参照してください。

Dockerfile の例:

```dockerfile
FROM mcr.microsoft.com/dotnet/aspnet:8.0-jammy
WORKDIR /app
COPY ./bin/Release/net8.0/publish /app

ADD https://github.com/DataDog/dd-trace-dotnet/releases/download/v2.56.0/datadog-dotnet-apm_2.56.0_amd64.deb /opt/datadog/datadog-dotnet-apm_2.56.0_amd64.deb
RUN dpkg -i /opt/datadog/datadog-dotnet-apm_2.56.0_amd64.deb
RUN mkdir -p /shared-volume/logs/

ENV CORECLR_ENABLE_PROFILING=1
ENV CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
ENV CORECLR_PROFILER_PATH=/opt/datadog/Datadog.Trace.ClrProfiler.Native.so
ENV DD_DOTNET_TRACER_HOME=/opt/datadog/

ENV DD_TRACE_DEBUG=true

ENTRYPOINT ["dotnet", "dotnet.dll"]
```
#### プロファイリング
Datadog のトレーシングライブラリにはプロファイラが同梱されています。すでにアプリケーションのトレース収集 (APM) を行っている場合は、ライブラリを追加インストールする必要はなく、プロファイラの有効化に直接進めます。環境変数の追加方法については [.NET プロファイラの有効化][5]を参照してください。
上記の Dockerfile 例には、プロファイラのための環境変数も含まれています。

#### メトリクス
トレーシングライブラリはカスタムメトリクスも収集します。詳しくは[コード例][2]を参照してください。 

#### ログ
Datadog のサイドカーは共有ボリュームを通じてログを収集します。メインコンテナからサイドカーにログを転送するには、以下の手順に従い、アプリケーションですべてのログを `shared-volume/logs/*.log` のような場所に書き込むよう設定してください。GCP の UI で `DD_SERVERLESS_LOG_PATH` 環境変数と、メインコンテナおよびサイドカーの両方に対する共有ボリュームマウントを追加する必要があります。YAML や Terraform を使用してデプロイする場合、環境変数、ヘルスチェック、ボリュームマウントはすでに追加されています。

アプリケーションでのログ設定については [C# ログ収集][3]を、トレースとログの相関を設定するには [.NET のログとトレースの相関][4]を参照してください。

[1]: /ja/tracing/trace_collection/automatic_instrumentation/dd_libraries/dotnet-core/?tab=linux#enable-the-tracer-for-your-service
[2]: https://www.datadoghq.com/blog/statsd-for-net-dogstatsd/
[3]: /ja/log_collection/csharp/?tab=serilog
[4]: /ja/tracing/other_telemetry/connect_logs_and_traces/dotnet/?tab=serilog
[5]: https://docs.datadoghq.com/ja/profiler/enabling/dotnet?tab=nuget

{{% /tab %}}
{{% tab "PHP" %}}
メインアプリケーションに `dd-trace-php` ライブラリを追加します。手順については [PHP アプリケーションのトレース][1]を参照してください。

#### メトリクス
トレーシングライブラリはカスタムメトリクスも収集します。詳しくは[コード例][2]を参照してください。

#### ログ
Datadog のサイドカーは共有ボリュームを通じてログを収集します。メインコンテナからサイドカーにログを転送するには、以下の手順に従い、アプリケーションですべてのログを `shared-volume/logs/*.log` のような場所に書き込むよう設定してください。GCP の UI で `DD_SERVERLESS_LOG_PATH` 環境変数と、メインコンテナおよびサイドカーの両方に対する共有ボリュームマウントを追加する必要があります。YAML や Terraform を使用してデプロイする場合、環境変数、ヘルスチェック、ボリュームマウントはすでに追加されています。

アプリケーションでのログ設定については [PHP ログ収集][3]を、トレースとログの相関を設定するには [PHP のログとトレースの相関][4]を参照してください。

[1]: /ja/tracing/trace_collection/automatic_instrumentation/dd_libraries/php/
[2]: /ja/metrics/custom_metrics/dogstatsd_metrics_submission/#code-examples
[3]: /ja/logs/log_collection/php
[4]: /ja/tracing/other_telemetry/connect_logs_and_traces/php
{{% /tab %}}
{{< /tabs >}}

### コンテナ
{{< tabs >}}
{{% tab "GCR UI" %}}

#### サイドカーコンテナ

1. Cloud Run で **Edit & Deploy New Revision** を選択します。
1. ページ下部で **Add Container** を選択します。
1. **Container image URL** には `gcr.io/datadoghq/serverless-init:latest` を指定します。
1. **Volume Mounts** に移動し、ログ用のボリュームマウントを設定します。アプリケーションの書き込み先とパスが一致していることを確認してください。例: 
   {{< img src="serverless/gcr/volume_mount.png" width="80%" alt="Volume Mounts タブ。Mounted volumes の Volume Mount 1 で、Name 1 に 'shared-logs (In-Memory)' が選択され、Mount path 1 に '/shared-volume' が設定されている。">}}
1. **Settings** に移動し、スタートアップチェックを追加します。
   - **Select health check type**: Startup check
   - **Select probe type**: TCP
   - **Port**: ポート番号を入力します (次のステップで使用するためメモしておきます)。
1. **Variables & Secrets** に移動し、以下の環境変数を name-value ペアとして追加します。
   - `DD_SERVICE`: サービス名。例: `gcr-sidecar-test`
   - `DD_ENV`: 環境名。例: `dev`
   - `DD_SERVERLESS_LOG_PATH`: ログパス。例: `/shared-volume/logs/*.log`
   - `DD_API_KEY`: [Datadog API キー][1]
   - `DD_HEALTH_PORT`: 前のステップでスタートアップチェックに設定したポート番号

   追加のタグを含む全環境変数のリストについては、[環境変数](#environment-variables)を参照してください。

#### メインコンテナ

1. **Volume Mounts** に移動し、サイドカーコンテナと同じ共有ボリュームを追加します。
   **注**: **Done** を選択して変更内容を保存してください。最終ステップまでデプロイは行わないでください。
1. **Variables & Secrets** に移動し、サイドカーコンテナで設定したものと同じ `DD_SERVICE` 環境変数を追加します。
1. **Settings** に移動し、**Container start up order** のドロップダウンメニューでサイドカーを選択します。
1. メインアプリケーションをデプロイします。

[1]: https://app.datadoghq.com/organization-settings/api-keys

{{% /tab %}}
{{% tab "YAML デプロイ" %}}
Cloud Run サービスを YAML のサービス仕様でデプロイするには、以下のサンプル構成ファイルを使用します。

1. 次の内容を含む YAML ファイルを作成してください。

   ```yaml
   apiVersion: serving.knative.dev/v1
   kind: Service
   metadata:
     name: '<SERVICE_NAME>'
     labels:
       cloud.googleapis.com/location: '<LOCATION>'
   spec:
     template:
       metadata:
         annotations:
           autoscaling.knative.dev/maxScale: '100' # The maximum number of instances that can be created for this service. https://cloud.google.com/run/docs/reference/rest/v1/RevisionTemplate
           run.googleapis.com/container-dependencies: '{"run-sidecar-1":["serverless-init-1"]}' # Configure container start order for sidecar deployments https://cloud.google.com/run/docs/configuring/services/containers#container-ordering
           run.googleapis.com/startup-cpu-boost: 'true' # The startup CPU boost feature for revisions provides additional CPU during instance startup time and for 10 seconds after the instance has started. https://cloud.google.com/run/docs/configuring/services/cpu#startup-boost
       spec:
         containers:
           - env:
               - name: DD_SERVICE
                 value: '<SERVICE_NAME>'
             image: '<CONTAINER_IMAGE>'
             name: run-sidecar-1
             ports:
               - containerPort: 8080
                 name: http1
             resources:
               limits:
                 cpu: 1000m
                 memory: 512Mi
             startupProbe:
               failureThreshold: 1
               periodSeconds: 240
               tcpSocket:
                 port: 8080
               timeoutSeconds: 240
             volumeMounts:
               - mountPath: /shared-volume
                 name: shared-volume
           - env:
               - name: DD_SERVERLESS_LOG_PATH
                 value: shared-volume/logs/*.log
               - name: DD_SITE
                 value: '<DATADOG_SITE>'
               - name: DD_ENV
                 value: serverless
               - name: DD_API_KEY
                 value: '<API_KEY>'
               - name: DD_SERVICE
                 value: '<SERVICE_NAME>'
               - name: DD_VERSION
                 value: '<VERSION>'
               - name: DD_LOG_LEVEL
                 value: debug
               - name: DD_LOGS_INJECTION
                 value: 'true'
               - name: DD_HEALTH_PORT
                 value: '12345'
             image: gcr.io/datadoghq/serverless-init:latest
             name: serverless-init-1
             resources:
               limits:
                 cpu: 1000m
                 memory: 512Mi # Can be updated to a higher memory if needed
             startupProbe:
               failureThreshold: 3
               periodSeconds: 10
               tcpSocket:
                 port: 12345
               timeoutSeconds: 1
             volumeMounts:
               - mountPath: /shared-volume
                 name: shared-volume
         volumes:
           - emptyDir:
               medium: Memory
               sizeLimit: 512Mi
             name: shared-volume
     traffic: # make this revision and all future ones serve 100% of the traffic as soon as possible, overriding any established traffic split
       - latestRevision: true
         percent: 100
   ```
   この例では、環境変数、スタートアップヘルスチェック、ボリュームマウントがすでに追加されています。ログを有効にしたくない場合は、共有ボリュームを削除してください。メインコンテナのコンテナポートが Dockerfile/サービスで公開しているポートと同じであることを確認してください。
1. プレースホルダ値を置き換えてください。
   - `<SERVICE_NAME>`: サービス名。例: `gcr-sidecar-test` ([統合サービスタグ付け][2]を参照) 
   - `<LOCATION>`: サービスをデプロイするリージョン。例: `us-central`
   - `<DATADOG_SITE>`: 使用している [Datadog のサイト][3] ({{< region-param key="dd_site" code="true" >}}) 
   - `<API_KEY>`: [Datadog API キー][1]
   - `<VERSION>`: デプロイのバージョン番号 ([統合サービスタグ付け][2]を参照) 
   - `<CONTAINER_IMAGE>`: Cloud Run にデプロイするコードのイメージ。例: `us-docker.pkg.dev/cloudrun/container/hello`

1. 次を実行します。
   ```bash
   gcloud run services replace <FILENAME>.yaml
   ```

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /ja/getting_started/tagging/unified_service_tagging/
[3]: /ja/getting_started/site/

{{% /tab %}}
{{% tab "Terraform デプロイ" %}}
Terraform を使用して Cloud Run サービスをデプロイするには、以下のサンプル構成ファイルを使用します。この例では、環境変数、スタートアップヘルスチェック、ボリュームマウントがすでに追加されています。ログを有効にしたくない場合は、共有ボリュームを削除してください。メインコンテナのコンテナポートが Dockerfile/サービスで公開しているポートと同じであることを確認してください。パブリックアクセスを許可したくない場合は、IAM ポリシーのセクションを削除してください。

```
provider "google" {
  project = "<PROJECT_ID>"
  region  = "<LOCATION>"  # 例: us-central1
}

resource "google_cloud_run_service" "terraform_with_sidecar" {
  name     = "<SERVICE_NAME>"
  location = "<LOCATION>"

  template {
    metadata {
      annotations = {
        # 正しくフォーマットされた container-dependencies アノテーション
        "run.googleapis.com/container-dependencies" = jsonencode({main-app = ["sidecar-container"]})
      }
    }
    spec {
      # 共有ボリュームを定義
      volumes {
        name = "shared-volume"
        empty_dir {
          medium = "Memory"
        }
      }

      # メインアプリケーションコンテナ
      containers {
        name  = "main-app"
        image = "<CONTAINER_IMAGE>"

        # メインコンテナ用のポートを公開
        ports {
          container_port = 8080
        }
        # 共有ボリュームをマウント
        volume_mounts {
          name      = "shared-volume"
          mount_path = "/shared-volume"
        }

        # TCP ヘルスチェックのための Startup Probe
        startup_probe {
          tcp_socket {
            port = 8080
          }
          initial_delay_seconds = 0  # プローブ開始までの遅延
          period_seconds        = 10   # プローブ間隔
          failure_threshold     = 3   # 異常とみなすまでの失敗回数
          timeout_seconds       = 1  # タイムアウトまでの秒数
        }

        # メインコンテナの環境変数
        env {
          name  = "DD_SERVICE"
          value = "<SERVICE_NAME>"
        }

        # メインコンテナのリソース制限
        resources {
          limits = {
            memory = "512Mi"
            cpu    = "1"
          }
        }
      }

      # サイドカーコンテナ
      containers {
        name  = "sidecar-container"
        image = "gcr.io/datadoghq/serverless-init:latest"

        # 共有ボリュームをマウント
        volume_mounts {
          name      = "shared-volume"
          mount_path = "/shared-volume"
        }

        # TCP ヘルスチェックのための Startup Probe
        startup_probe {
          tcp_socket {
            port = 12345
          }
          initial_delay_seconds = 0  # プローブ開始までの遅延
          period_seconds        = 10   # プローブ間隔
          failure_threshold     = 3   # 異常とみなすまでの失敗回数
          timeout_seconds       = 1
        }

        # サイドカーコンテナの環境変数
        env {
          name  = "DD_SITE"
          value = "<DATADOG_SITE>"
        }
        env {
          name  = "DD_SERVERLESS_LOG_PATH"
          value = "shared-volume/logs/*.log"
        }
        env {
          name  = "DD_ENV"
          value = "serverless"
        }
        env {
          name  = "DD_API_KEY"
          value = "<API_KEY>"
        }
        env {
          name  = "DD_SERVICE"
          value = "<SERVICE_NAME>"
        }
        env {
          name  = "DD_VERSION"
          value = "<VERSION>"
        }
        env {
          name  = "DD_LOG_LEVEL"
          value = "debug"
        }
        env {
          name  = "DD_LOGS_INJECTION"
          value = "true"
        }
        env {
          name  = "DD_HEALTH_PORT"
          value = "12345"
        }

        # サイドカーコンテナのリソース制限
        resources {
          limits = {
            memory = "512Mi"
            cpu    = "1"
          }
        }
      }
    }
  }

  # トラフィックを分割する設定
  traffic {
    percent         = 100
    latest_revision = true
  }
}

# 公開アクセスを許可するための IAM メンバー (オプションで必要に応じて調整) 
resource "google_cloud_run_service_iam_member" "invoker" {
  service  = google_cloud_run_service.terraform_with_sidecar.name
  location = google_cloud_run_service.terraform_with_sidecar.location
  role     = "roles/run.invoker"
  member   = "allUsers"
}
```

プレースホルダ値を置き換えてください。
- `<PROJECT_ID>`: Google Cloud プロジェクト ID。
- `<LOCATION>`: サービスをデプロイするリージョン (例: `us-central1`)
- `<SERVICE_NAME>`: サービス名 (例: `gcr-sidecar-test`。[統合サービスタグ付け][2]を参照) 
- `<CONTAINER_IMAGE>`: Cloud Run にデプロイするコードのイメージ
- `<DATADOG_SITE>`: ご使用の [Datadog サイト][3] ({{< region-param key="dd_site" code="true" >}}) 
- `<API_KEY>`: [Datadog API キー][1]
- `<VERSION>`: デプロイのバージョン番号 ([統合サービスタグ付け][2]を参照) 

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /ja/getting_started/tagging/unified_service_tagging/
[3]: /ja/getting_started/site/
{{% /tab %}}
{{< /tabs >}}

## 環境変数

| 変数 | 説明 |
| -------- | ----------- |
|`DD_API_KEY`| [Datadog API key][4] - **必須**|
| `DD_SITE` | [Datadog サイト][5] - **必須** |
| `DD_LOGS_INJECTION`| true にすると、[Java][6]、[Node][7]、[.NET][8]、[PHP][9] のサポートされているロガーにトレースデータが付与されます。[Python][10]、[Go][11]、[Ruby][12] については追加ドキュメントを参照してください。 |
| `DD_SERVICE`      | [統合サービスタグ付け][13]を参照してください。                                  |
| `DD_VERSION`      | [統合サービスタグ付け][13]を参照してください。                                  |
| `DD_ENV`          | [統合サービスタグ付け][13]を参照してください。                                  |
| `DD_SOURCE`       | [統合サービスタグ付け][13]を参照してください。                                  |
| `DD_TAGS`         | [統合サービスタグ付け][13]を参照してください。 |

`DD_LOGS_ENABLED` 環境変数は使用しないでください。この変数は [serverless-init][14] インストール方法でのみ使用されます。

## アプリケーション例

以下の例は、単一のアプリにトレーシング、メトリクス、ログが設定されているサンプルです。

{{< tabs >}}
{{% tab "Node.js" %}}

```js
const tracer = require('dd-trace').init({
 logInjection: true,
});
const express = require("express");
const app = express();
const { createLogger, format, transports } = require('winston');

const logger = createLogger({
 level: 'info',
 exitOnError: false,
 format: format.json(),
 transports: [new transports.File({ filename: `/shared-volume/logs/app.log`}),
  ],
});

app.get("/", (_, res) => {
 logger.info("ようこそ！");
 res.sendStatus(200);
});

app.get("/hello", (_, res) => {
 logger.info("こんにちは！");
 metricPrefix = "nodejs-cloudrun";
 // 複数のメトリクスをテストするため、3 種類のメトリクスを送信します
 metricsToSend = ["sample_metric_1", "sample_metric_2", "sample_metric_3"];
 metricsToSend.forEach((metric) => {
   for (let i = 0; i < 20; i++) {
     tracer.dogstatsd.distribution(`${metricPrefix}.${metric}`, 1);
   }
 });
 res.status(200).json({ msg: "Datadog にメトリクスを送信します" });
});

const port = process.env.PORT || 8080;
app.listen(port);
```

{{% /tab %}}
{{% tab "Python" %}}

### app.py

```python
import ddtrace
from flask import Flask, render_template, request
import logging
from datadog import initialize, statsd

ddtrace.patch(logging=True)
app = Flask(__name__)
options = {
   'statsd_host':'127.0.0.1',
   'statsd_port':8125
}
FORMAT = ('%(asctime)s %(levelname)s [%(name)s] [%(filename)s:%(lineno)d] '
         '[dd.service=%(dd.service)s dd.env=%(dd.env)s dd.version=%(dd.version)s dd.trace_id=%(dd.trace_id)s dd.span_id=%(dd.span_id)s] '
         '- %(message)s')
logging.basicConfig(level=logging.DEBUG, filename='app.log', format=FORMAT)
logger = logging.getLogger(__name__)
logger.level = logging.INFO

ddlogs = []

@ddtrace.tracer.wrap(service="dd_gcp_log_forwader")
@app.route('/', methods=["GET"])
def index():
   log = request.args.get("log")
   if log != None:
       with tracer.trace('sending_logs') as span:
           statsd.increment('dd.gcp.logs.sent')
           span.set_tag('logs', 'nina')
           logger.info(log)
           ddlogs.append(log)
   return render_template("home.html", logs=ddlogs)

if __name__ == '__main__':
   tracer.configure(port=8126)
   initialize(**options)
   app.run(debug=True)
```

### Home.html
```html
<!DOCTYPE html>
<html lang="en">
<head>
   <meta charset="UTF-8">
   <meta http-equiv="X-UA-Compatible" content="IE=edge">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <title>Datadog Test</title>
</head>
<body>
   <h1>Welcome to Datadog!💜</h1>
   <form action="">
       <input type="text" name="log" placeholder="Enter Log">
       <button>Add Log</button>
   </form>
   <h3>Logs Sent to Datadog:</h3>
   <ul>
   {% for log in logs%}
       {% if log %}
       <li>{{ log }}</li>
       {% endif %}
   {% endfor %}
   </ul>
</body>
</html>
```
{{% /tab %}}
{{% tab "Java" %}}

```java
package com.example.springboot;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.timgroup.statsd.NonBlockingStatsDClientBuilder;
import com.timgroup.statsd.StatsDClient;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

@RestController
public class HelloController {
   Private static final StatsDClient Statsd = new NonBlockingStatsDClientBuilder().hostname("localhost").build();
   private static final Log logger = LogFactory.getLog(HelloController.class);
   @GetMapping("/")
   public String index() {
       Statsd.incrementCounter("page.views");
       logger.info("Hello Cloud Run!");
       return "💜 Hello Cloud Run! 💜";
   }
}
```

{{% /tab %}}
{{% tab "Go" %}}
```go
package main


import (
   "fmt"
   "log"
   "net/http"
   "os"
   "path/filepath"


   "github.com/DataDog/datadog-go/v5/statsd"
   "gopkg.in/DataDog/dd-trace-go.v1/ddtrace"
   "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
)


const logDir = "/shared-volume/logs"

var logFile *os.File
var logCounter int
var dogstatsdClient *statsd.Client

func handler(w http.ResponseWriter, r *http.Request) {
   log.Println("Yay!! Main container works")
   span := tracer.StartSpan("maincontainer", tracer.ResourceName("/handler"))
   defer span.Finish()
   logCounter++
   writeLogsToFile(fmt.Sprintf("received request %d", logCounter), span.Context())
   dogstatsdClient.Incr("request.count", []string{"test-tag"}, 1)
}

func writeLogsToFile(log_msg string, context ddtrace.SpanContext) {
   span := tracer.StartSpan(
       "writeLogToFile",
       tracer.ResourceName("/writeLogsToFile"),
       tracer.ChildOf(context))
   defer span.Finish()
   _, err := logFile.WriteString(log_msg + "\n")
   if err != nil {
       log.Println("Error writing to log file:", err)
   }
}

func main() {
   log.Print("Main container started...")

   err := os.MkdirAll(logDir, 0755)
   if err != nil {
       panic(err)
   }
   logFilePath := filepath.Join(logDir, "maincontainer.log")
   log.Println("Saving logs in ", logFilePath)
   logFileLocal, err := os.OpenFile(logFilePath, os.O_WRONLY|os.O_APPEND|os.O_CREATE, 0644)
   if err != nil {
       panic(err)
   }
   defer logFileLocal.Close()

   logFile = logFileLocal

   dogstatsdClient, err = statsd.New("localhost:8125")
   if err != nil {
       panic(err)
   }
   defer dogstatsdClient.Close()

   tracer.Start()
   defer tracer.Stop()

   http.HandleFunc("/", handler)
   log.Fatal(http.ListenAndServe(":8080", nil))
}
```
{{% /tab %}}
{{% tab ".NET" %}}
```csharp
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Serilog;
using Serilog.Formatting.Json;
using Serilog.Formatting.Compact;
using Serilog.Sinks.File;
using StatsdClient;


namespace dotnet.Pages;


public class IndexModel : PageModel
{
   private readonly static DogStatsdService _dsd;
   static IndexModel()
   {
       var dogstatsdConfig = new StatsdConfig
       {
           StatsdServerName = "127.0.0.1",
           StatsdPort = 8125,
       };


       _dsd = new DogStatsdService();
       _dsd.Configure(dogstatsdConfig);


       Log.Logger = new LoggerConfiguration()
           .WriteTo.File(new RenderedCompactJsonFormatter(), "/shared-volume/logs/app.log")
           .CreateLogger();
   }
   public void OnGet()
   {
       _dsd.Increment("page.views");
       Log.Information("Hello Cloud Run!");
   }
}
```
{{% /tab %}}
{{% tab "PHP" %}}

```php
<?php


require __DIR__ . '/vendor/autoload.php';


use DataDog\DogStatsd;
use Monolog\Logger;
use Monolog\Handler\StreamHandler;
use Monolog\Formatter\JsonFormatter;


$statsd = new DogStatsd(
   array('host' => '127.0.0.1',
         'port' => 8125,
    )
 );


$log = new logger('datadog');
$formatter = new JsonFormatter();


$stream = new StreamHandler('/shared-volume/logs/app.log', Logger::DEBUG);
$stream->setFormatter($formatter);


$log->pushHandler($stream);


$log->info("Hello Datadog!");
echo '💜 Hello Datadog! 💜';


$log->info("sending a metric");
$statsd->increment('page.views', 1, array('environment'=>'dev'));


?>
```

{{% /tab %}}
{{< /tabs >}}

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ja/integrations/google_cloud_platform/#log-collection
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://hub.docker.com/r/datadog/serverless-init
[4]: /ja/account_management/api-app-keys/#api-keys
[5]: /ja/getting_started/site/
[6]: /ja/tracing/other_telemetry/connect_logs_and_traces/java/?tab=log4j2
[7]: /ja/tracing/other_telemetry/connect_logs_and_traces/nodejs
[8]: /ja/tracing/other_telemetry/connect_logs_and_traces/dotnet?tab=serilog
[9]: /ja/tracing/other_telemetry/connect_logs_and_traces/php
[10]: /ja/tracing/other_telemetry/connect_logs_and_traces/python
[11]: /ja/tracing/other_telemetry/connect_logs_and_traces/go
[12]: /ja/tracing/other_telemetry/connect_logs_and_traces/ruby
[13]: /ja/getting_started/tagging/unified_service_tagging/
[14]: /ja/serverless/guide/gcr_serverless_init