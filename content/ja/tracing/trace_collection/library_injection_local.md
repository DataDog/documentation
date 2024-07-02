---
title: Injecting Libraries Locally
description: "Inject instrumentation libraries into applications"
aliases:
 - /tracing/trace_collection/admission_controller/
 - /tracing/trace_collection/library_injection/
---

## 概要

To automatically instrument your application, you can:

- Use automatic instrumentation with local library injection, as described on this page.
- Use [Single Step Instrumentation][6].
- Use [Datadog libraries][7].

For more information, see [Automatic Instrumentation][5].

アプリケーションのコードに全く触れずにライブラリをローカル挿入する方法は、Agent とアプリケーションがインストールされている場所と方法によって異なります。お使いの環境を表すシナリオを選択してください。

{{< tabs >}}
{{% tab "Kubernetes" %}}

[Admission Controller][1] のアプローチでは、Agent は Kubernetes Admission Controller を使用して Kubernetes API へのリクエストをインターセプトし、指定されたインスツルメンテーションライブラリを挿入するために新しいポッドを変異させます。

<div class="alert alert-warning">ライブラリ挿入は新しいポッドにのみ適用され、実行中のポッドには影響を与えません。</div>

Kubernetes Admission Controller の詳細については、[Kubernetes Admission Controllers リファレンス][2]をご覧ください。

## 要件

* Kubernetes v1.14+
* Java、Python、NodeJS については Datadog [Cluster Agent v7.40+][3]、.NET、Ruby については Datadog [Cluster Agent v7.44+][3]。
* Datadog Admission Controller が有効になっている。**注**: Helm chart v2.35.0 以降では、Cluster Agent で Datadog Admission Controller がデフォルトでアクティブになります。
* Python の場合、現時点では uWSGI アプリケーションはサポートされていません。
* Ruby については、ライブラリ挿入のサポートはベータ版です。インスツルメンテーションは、Bundler のバージョンが 2.3 以上で、vendored gems (デプロイモードまたは `BUNDLE_PATH`) がない Ruby on Rails アプリケーションでのみサポートされています。
* サポートされているアーキテクチャを持つ Linux 上にデプロイされた Java、JavaScript、Python、.NET、または Ruby のアプリケーション。言語ごとにサポートされているアーキテクチャの完全なリストについては、[対応するコンテナレジストリ](#container-registries)を確認してください。

## コンテナレジストリ

<div class="alert alert-warning">Docker Hub にはイメージのプルレート制限があります。Docker Hub をご利用でない場合は、Datadog Agent および Cluster Agent の構成を更新して、GCR または ECR からプルすることをお勧めします。手順については、<a href="/agent/guide/changing_container_registry">コンテナレジストリの変更</a>を参照してください。</div>

Datadog publishes instrumentation libraries images on gcr.io, Docker Hub, and Amazon ECR:
| Language   | gcr.io                              | hub.docker.com                              | gallery.ecr.aws                            |
|------------|-------------------------------------|---------------------------------------------|-------------------------------------------|
| Java       | [gcr.io/datadoghq/dd-lib-java-init][4]   | [hub.docker.com/r/datadog/dd-lib-java-init][5]   | [gallery.ecr.aws/datadog/dd-lib-java-init][6]   |
| JavaScript | [gcr.io/datadoghq/dd-lib-js-init][7]     | [hub.docker.com/r/datadog/dd-lib-js-init][8]     | [gallery.ecr.aws/datadog/dd-lib-js-init][9]     |
| Python     | [gcr.io/datadoghq/dd-lib-python-init][10] | [hub.docker.com/r/datadog/dd-lib-python-init][11] | [gallery.ecr.aws/datadog/dd-lib-python-init][12] |
| .NET       | [gcr.io/datadoghq/dd-lib-dotnet-init][13] | [hub.docker.com/r/datadog/dd-lib-dotnet-init][14] | [gallery.ecr.aws/datadog/dd-lib-dotnet-init][15] |
| Ruby       | [gcr.io/datadoghq/dd-lib-ruby-init][23] | [hub.docker.com/r/datadog/dd-lib-ruby-init][24] | [gallery.ecr.aws/datadog/dd-lib-ruby-init][25] |

Datadog Cluster Agent の構成にある `DD_ADMISSION_CONTROLLER_AUTO_INSTRUMENTATION_CONTAINER_REGISTRY` 環境変数は、Admission Controller が使用するレジストリを指定します。デフォルト値は、`gcr.io/datadoghq` です。

ローカルコンテナレジストリでイメージをホストしている場合は、`docker.io/datadog`、`public.ecr.aws/datadog`、または他の URL に変更することで、別のレジストリからトレーシングライブラリを引き出すことができます。

## インスツルメンテーションライブラリの挿入の構成

Datadog にトレースを送信したい Kubernetes アプリケーションに対して、Java、JavaScript、Python、.NET または Ruby のインスツルメンテーションライブラリを自動的に挿入するように Datadog Admission Controller を構成します。大まかに言うと、これには次の手順が含まれます。詳細は以下で説明します。

1. Datadog Admission Controller を有効にして、ポッドのミュートを行います。
2. ポッドにアノテーションを付けて、どのインスツルメンテーションライブラリを挿入するか選択します。
3. 統合サービスタグ付けにより、ポッドにタグを付け、Datadog のテレメトリーを結び付け、一貫したタグでトレース、メトリクス、ログをシームレスにナビゲートします。
4. 新しい構成を適用します。

<div class="alert alert-info">ライブラリを挿入するために、新しいアプリケーションイメージを生成する必要はありません。ライブラリの挿入はインスツルメンテーションライブラリの追加で行われるため、アプリケーションイメージの変更は必要ありません。</div>

### ステップ 1 - Datadog Admission Controller を有効にして、ポッドのミュートを行います

デフォルトでは、Datadog Admission Controller は、特定のラベルでラベル付けされたポッドのみをミュートします。ポッドでミュートを有効にするには、ポッドの仕様にラベル `admission.datadoghq.com/enabled: "true"` を追加します。

**注**: Datadog Admission Controller で、Cluster Agent で `clusterAgent.admissionController.mutateUnlabelled` (または `DD_ADMISSION_CONTROLLER_MUTATE_UNLABELLED`) を `true` に設定すると、このポッドラベルがなくても挿入設定を有効にすることが可能です。

構成方法の詳細については、[Datadog Admission Controller のページ][1]をご覧ください。

例:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    # (...)
spec:
  template:
    metadata:
      labels:
        admission.datadoghq.com/enabled: "true" # Admission Controller を有効にしてこのデプロイメントに含まれる新しいポッドを変異させます
    spec:
      containers:
        - # (...)
```

### ステップ 2 - ライブラリ挿入のためにポッドにアノテーションを付ける

To select your pods for library injection, use the annotations provided in the following table within your pod spec:

| 言語   | ポッドアノテーション                                                        |
|------------|-----------------------------------------------------------------------|
| Java       | `admission.datadoghq.com/java-lib.version: "<CONTAINER IMAGE TAG>"`   |
| JavaScript | `admission.datadoghq.com/js-lib.version: "<CONTAINER IMAGE TAG>"`     |
| Python     | `admission.datadoghq.com/python-lib.version: "<CONTAINER IMAGE TAG>"` |
| .NET       | `admission.datadoghq.com/dotnet-lib.version: "<CONTAINER IMAGE TAG>"` |
| Ruby       | `admission.datadoghq.com/ruby-lib.version: "<CONTAINER IMAGE TAG>"`   |

利用可能なライブラリのバージョンは、各コンテナレジストリ、および各言語のトレーサーソースレジストリに記載されています。
- [Java][16]
- [JavaScript][17]
- [Python][18]
- [.NET][19]
  - **Note**: For .NET library injection, if the application container uses a musl-based Linux distribution (such as Alpine), you must specify a tag with the `-musl` suffix for the pod annotation. For example, to use library version `v2.29.0`, specify container tag `v2.29.0-musl`.
- [Ruby][20]

**Note**: If you already have an application instrumented using version X of the library, and then use library injection to instrument using version Y of the same tracer library, the tracer does not break. Rather, the library version loaded first is used. Because library injection happens at the admission controller level prior to runtime, it takes precedence over manually configured libraries.

<div class="alert alert-warning"><strong>注</strong>: <code>最新の</code>タグを使用することはサポートされていますが、主要なライブラリのリリースでは、壊れるような変更が導入されることがあるので、注意して使用してください。</div>

例えば、Java ライブラリを挿入するには

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    # (...)
spec:
  template:
    metadata:
      labels:
        admission.datadoghq.com/enabled: "true" # Admission Controller を有効にしてこのデプロイメントに含まれる新しいポッドを変異させます
      annotations:
        admission.datadoghq.com/java-lib.version: "<CONTAINER IMAGE TAG>"
    spec:
      containers:
        - # (...)
```

### ステップ 3 - 統合サービスタグ付けによるポッドへのタグ付け

[統合サービスタグ付け][21]を使用すると、Datadog のテレメトリーを結びつけ、一貫したタグでトレース、メトリクス、ログをシームレスにナビゲートすることができます。デプロイメントオブジェクトとポッドテンプレートの両方の仕様に、統合サービスタグ付けを設定します。
以下のラベルを使用して、統合サービスタグを設定します。

```yaml
  metadata:
    labels:
      tags.datadoghq.com/env: "<ENV>"
      tags.datadoghq.com/service: "<SERVICE>"
      tags.datadoghq.com/version: "<VERSION>"
```

**注**: ユニバーサルサービスタグ付けに必要な環境変数 (`DD_ENV`、`DD_SERVICE`、`DD_VERSION`) をポッドテンプレートの仕様で設定する必要はありません。これは、Admission Controller がライブラリにタグ値を挿入する際に環境変数として伝搬させるためです。

例:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    tags.datadoghq.com/env: "prod" # 統合サービスタグ - デプロイメント環境タグ
    tags.datadoghq.com/service: "my-service" # 統合サービスタグ - デプロイメントサービスタグ
    tags.datadoghq.com/version: "1.1" # 統合サービスタグ - デプロイメントバージョンタグ
  # (...)
spec:
 template:
  metadata:
    labels:
        tags.datadoghq.com/env: "prod" # 統合サービスタグ - ポッド環境タグ
        tags.datadoghq.com/service: "my-service" # 統合サービスタグ - ポッドサービスタグ
        tags.datadoghq.com/version: "1.1" # 統合サービスタグ - ポッドバージョンタグ
        admission.datadoghq.com/enabled: "true" # Admission Controller を有効にしてこのデプロイメントに含まれる新しいポッドを変異させます
    annotations:
        admission.datadoghq.com/java-lib.version: "<CONTAINER IMAGE TAG>"
   spec:
     containers:
       - # (...)
```

### ステップ 4 - 構成を適用する

新しい構成が適用されると、ポッドはインスツルメンテーションを受ける準備が整います。

<div class="alert alert-warning">ライブラリは新しいポッドにのみ挿入され、実行中のポッドには影響を与えません。</div>

## ライブラリ挿入が成功したことを確認する

ライブラリ挿入は、ポッド内の専用 `init` コンテナの挿入を利用します。
挿入が成功すると、ポッド内に `datadog-lib-init` という `init` コンテナが作成されるのが確認できます。

{{< img src="tracing/trace_collection/datadog-lib-init-container.jpg" alt="ポッド内の init コンテナを表示した Kubernetes 環境の詳細ページ。">}}

または、`kubectl describe pod <my-pod>` を実行すると、`datadog-lib-init` init コンテナがリストアップされます。

インスツルメンテーションは、Datadog へのテレメトリーの送信も開始します (例えば、[APM][22] へのトレースなど)。

### インストールに関する問題のトラブルシューティング

アプリケーションポッドの起動に失敗した場合、`kubectl logs <my-pod> --all-containers` を実行してログを出力し、以下の既知の問題と比較してください。

#### .NET のインストールに関する問題
##### `dotnet: error while loading shared libraries: libc.musl-x86_64.so.1: cannot open shared object file: No such file or directory`

- **問題**: dotnet ライブラリバージョンのポッドアノテーションには `-musl` サフィックスが含まれていたが、アプリケーションコンテナは glibc を使用する Linux ディストリビューションで実行されている。
- **解決策**: dotnet ライブラリのバージョンから `-musl` サフィックスを削除してください。

##### `Error loading shared library ld-linux-x86-64.so.2: No such file or directory (needed by /datadog-lib/continuousprofiler/Datadog.Linux.ApiWrapper.x64.so)`

- **問題**: アプリケーションコンテナは musl-libc を使用する Linux ディストリビューション (例えば Alpine) で動作するが、ポッドアノテーションに `-musl` というサフィックスが含まれていない。
- **解決策**: dotnet ライブラリのバージョンに `-musl` サフィックスを追加してください。


#### Python のインストールに関する問題

##### Noisy library logs

In Python `< 1.20.3`, Python injection logs output to `stderr`. Upgrade to `1.20.3` or above to suppress the logs by default. The logs can be enabled by setting the environment variable `DD_TRACE_DEBUG` to `1`.


##### 互換性のない Python のバージョン

The library injection mechanism for Python only supports injecting the Python library in Python v3.7+.

##### `user-installed ddtrace found, aborting`

- **Problem**: The `ddtrace` library is already installed on the system so the injection logic aborts injecting the library to avoid introducing a breaking change in the application.
- **Solution**: Remove the installation of `ddtrace` if library injection is desired. Otherwise, use the installed library ([see documentation][26]) instead of library injection.


[1]: /containers/cluster_agent/admission_controller/
[2]: https://kubernetes.io/docs/reference/access-authn-authz/admission-controllers/
[3]: /containers/kubernetes/installation/?tab=helm
[4]: http://gcr.io/datadoghq/dd-lib-java-init
[5]: http://hub.docker.com/r/datadog/dd-lib-java-init
[6]: http://gallery.ecr.aws/datadog/dd-lib-java-init
[7]: http://gcr.io/datadoghq/dd-lib-js-init
[8]: http://hub.docker.com/r/datadog/dd-lib-js-init
[9]: http://gallery.ecr.aws/datadog/dd-lib-js-init
[10]: http://gcr.io/datadoghq/dd-lib-python-init
[11]: http://hub.docker.com/r/datadog/dd-lib-python-init
[12]: http://gallery.ecr.aws/datadog/dd-lib-python-init
[13]: http://gcr.io/datadoghq/dd-lib-dotnet-init
[14]: http://hub.docker.com/r/datadog/dd-lib-dotnet-init
[15]: http://gallery.ecr.aws/datadog/dd-lib-dotnet-init
[16]: https://github.com/DataDog/dd-trace-java/releases
[17]: https://github.com/DataDog/dd-trace-js/releases
[18]: https://github.com/DataDog/dd-trace-py/releases
[19]: https://github.com/DataDog/dd-trace-dotnet/releases
[20]: https://github.com/DataDog/dd-trace-rb/releases
[21]: /getting_started/tagging/unified_service_tagging/
[22]: https://app.datadoghq.com/apm/traces
[23]: http://gcr.io/datadoghq/dd-lib-ruby-init
[24]: http://hub.docker.com/r/datadog/dd-lib-ruby-init
[25]: http://gallery.ecr.aws/datadog/dd-lib-ruby-init
[26]: /tracing/trace_collection/dd_libraries/python/
{{% /tab %}}

{{% tab "Host" %}}

<div class="alert alert-info">Tracing Library Injection on a host is in beta.</div>

When both the Agent and your services are running on a host, real or virtual, Datadog injects the tracing library by using a preload library that overrides calls to `execve`. Any newly started processes are intercepted and the specified instrumentation library is injected into the services.

**Note**: Injection on arm64 is not supported.

## Install both library injection and the Datadog Agent

**要件**: Linux が動作するホスト。

ホストにまだ Datadog Agent がインストールされていない場合、または Datadog Agent のインストールをアップグレードしたい場合は、Datadog Agent インストールスクリプトを使用して、挿入ライブラリと Datadog Agent の両方をインストールします。

```shell
DD_APM_INSTRUMENTATION_ENABLED=host DD_API_KEY=<YOUR KEY> DD_SITE="<YOUR SITE>" bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
```

デフォルトでは、スクリプトを実行すると Java、Node.js、Python、Ruby、.NET のサポートがインストールされます。インストールされる言語サポートを指定したい場合は、環境変数 `DD_APM_INSTRUMENTATION_LANGUAGES` も設定してください。有効な値は `java`、`js`、`python`、`ruby`、`dotnet` です。複数の言語を指定するには、カンマ区切りのリストを使用します。

```shell
DD_APM_INSTRUMENTATION_LANGUAGES=java,js DD_APM_INSTRUMENTATION_ENABLED=host DD_API_KEY=<YOUR KEY> DD_SITE="<YOUR SITE>" bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
```

Exit and open a new shell to use the injection library.

## 次のステップ

まだインストールしていない場合は、アプリと、そのアプリが必要とするサポート言語やライブラリをインストールしてください。

When an app that is written in a supported language is launched, it is automatically injected with tracing enabled.

## Configure the injection

Configure host injection in one of the following ways:
- 起動するプロセスに環境変数を設定します。
- Specify host injection configuration in the `/etc/datadog-agent/inject/host_config.yaml` file.

環境変数の値は、プロセスごとにコンフィギュレーションファイルの設定をオーバーライドします。

### 構成ファイル

| プロパティ名 | 目的 | デフォルト値 | 有効な値 | 
| --------- | ----------- | ------------- | ----------- | 
|`log_level`  | ロギングレベル|`off`|`off`、`debug`、`info`、`warn`、`error`|
|`output_paths`|ログ出力が書き込まれる場所|`stderr`|`stderr` または `file://` URL|
|`env`|The default environment assigned to a process|なし|非該当|
|`config_sources`|プロセスのデフォルト構成|`BASIC`|[構成ソース](#config-sources)を参照してください。|


#### 例

```yaml
---
log_level: debug
output_paths:
  - file:///tmp/host_injection.log
env: dev
config_sources: BASIC
```

### 環境変数

The following environment variables configure library injection. You can pass these in by `export` through the command line (`export DD_CONFIG_SOURCES=BASIC`), shell configuration, or launch command.

構成ファイルの各フィールドは環境変数に対応しています。この環境変数は起動中のプロセスの環境変数から読み込まれ、現在起動中のプロセスのみに影響を与えます。

|構成ファイルのプロパティ|環境変数|
| --------- | ----------- |  
|`log_level`|`DD_APM_INSTRUMENTATION_DEBUG`|
|`output_paths`|`DD_APM_INSTRUMENTATION_OUTPUT_PATHS`|
|`env`|`DD_ENV`|
|`config_sources`|`DD_CONFIG_SOURCES`|

The `DD_APM_INSTRUMENTATION_DEBUG` environment variable is limited to the values `true` and `false` (default value `false`). Setting it to `true` sets `log_level` to `debug` and setting it to `false` (or not setting it at all) uses the `log_level` specified in the configuration file. The environment variable can only set the log level to `debug`, not any other log level values.

The `DD_INSTRUMENT_SERVICE_WITH_APM` environment variable controls whether or not injection is enabled. It defaults to `TRUE`. Set it to `FALSE` to turn off library injection altogether.

### 構成ソース

デフォルトでは、インスツルメンテーションプロセスでは以下の設定が有効になっています。
- トレーシング
- Log injection, assuming the application uses structured logging (usually JSON). For traces to appear in non-structured logs, you must change your application’s log configuration to include placeholders for trace ID and span ID. See [Connect Logs and Traces][6] for more information.
- 健全性メトリクス
- ランタイムメトリクス

コンフィギュレーションファイルの `config_sources` プロパティを設定することで、インスツルメンテーションされている全てのプロセスに対してこれらの設定を変更することができます。また、プロセスの `DD_CONFIG_SOURCES` 環境変数を設定することで、1 つのプロセスに対してこれらの設定を変更することもできます。構成ソースの有効な設定は以下の通りです。

|構成ソース名|意味|
| --------- | ----------- |  
|`BASIC`|上記で指定した構成を適用します。構成ソースが指定されていない場合は、これがデフォルトです。|
|`LOCAL:PATH`|ローカルファイルシステム上の指定されたパスに構成を適用します。コンフィギュレーションファイルの形式は以下のとおりです。例: `LOCAL:/opt/config/my_process_config.yaml`|
|`BLOB:URL`| S3 互換のオブジェクトストアの指定されたパスに構成を適用します。接続 URL とコンフィギュレーションファイルのフォーマットは以下のとおりです。例: `BLOB:s3://config_bucket/my_process_config.yaml?region=us-east-1` |

`BASIC`、`LOCAL`、`BLOB` は大文字でなければなりません。

Config source values can be separated by semicolons to indicate multiple possible locations. The first configuration that returns without an error is used. Configuration is not merged from multiple configuration sources. The following example checks an S3 bucket for configuration, then checks the local file system, and finally uses the built-in default configuration: 

```yaml
DD_CONFIG_SOURCES=BLOB:s3://config_bucket/my_process_config.yaml?region=us-east-1;LOCAL:/opt/config/my_process_config.yaml;BASIC
```

#### Blob ストレージのサポート
サポートされている Blob ストレージソリューションは以下のとおりです。
- **Amazon S3** - Set the URL with the `s3://` prefix. If you have authenticated with the AWS CLI, it uses those credentials.
環境変数を使用した資格情報の構成については、[AWS SDK ドキュメント][7]を参照してください。
- **GCP GCS** - Set the URL with the `gs://` prefix. It uses Application Default Credentials. Authenticate with `gcloud auth application-default login`. See [the Google Cloud authentication documentation][8] for more information about configuring credentials using environment variables.
- **Azure Blob** - プレフィックス `azblob://` で URL を設定し、ストレージコンテナ名を指定します。これは `AZURE_STORAGE_ACCOUNT` にある資格情報 (つまり、バケット名) と `AZURE_STORAGE_KEY` と `AZURE_STORAGE_SAS_TOKEN` の少なくとも一方を使用します。`BLOB` や `LOCAL` の設定については、[構成ソースの提供](#supplying-configuration-source-host)を参照してください。

<a id="supplying-configuration-source-host"></a>

### 構成ソースの供給

`LOCAL` と `BLOB` のコンフィギュレーションファイルは JSON 形式にすることができます。

```json
{
    "version": 1,
    "tracing_enabled": true,
    "log_injection_enabled": true,
    "health_metrics_enabled": true,
    "runtime_metrics_enabled": true,
    "tracing_sampling_rate": 1.0,
    "tracing_rate_limit": 1,
    "tracing_tags": ["a=b", "foo"],
    "tracing_service_mapping": [
        { "from_key": "mysql", "to_name": "super_db"},
        { "from_key": "postgres", "to_name": "my_pg"}
    ],
    "tracing_agent_timeout": 1,
    "tracing_header_tags": [
        {"header": "HEADER", "tag_name":"tag"}
    ],
    "tracing_partial_flush_min_spans": 1,
    "tracing_debug": true,
    "tracing_log_level": "debug",
}
```

または YAML 形式にすることができます。

```yaml
---
version: 1
tracing_enabled: true
log_injection_enabled: true
health_metrics_enabled: true
runtime_metrics_enabled: true
tracing_sampling_rate: 1.0
tracing_rate_limit: 1
tracing_tags:
- a=b
- foo
tracing_service_mapping:
- from_key: mysql
  to_name: super_db
- from_key: postgres
  to_name: my_pg
tracing_agent_timeout: 1
tracing_header_tags:
- header: HEADER
  tag_name: tag
tracing_partial_flush_min_spans: 1
tracing_debug: true
tracing_log_level: debug
```

`version` の値は常に `1` です。これは、コンテンツのバージョンではなく、使用する構成スキーマのバージョンを指しています。

The following table shows how the injection configuration values map to the corresponding [tracing library configuration options][4]:

| 挿入可否 | Java トレーサー | NodeJS トレーサー | .NET トレーサー | Python トレーサー |
| --------- | ----------- | ------------- | ----------- | ------------- |
| `tracing_enabled` | `dd.trace.enabled` | `DD_TRACE_ENABLED` | `DD_TRACE_ENABLED` |  `DD_TRACE_ENABLED` |
| `log_injection_enabled` | `dd.logs.injection` | `DD_LOGS_INJECTION` | `DD_LOGS_INJECTION` |  `DD_LOGS_INJECTION` |
| `health_metrics_enabled` | `dd.trace.health.metrics.enabled` |    非該当   |    非該当  | 非該当 |
| `runtime_metrics_enabled` | `dd.jmxfetch.enabled` | `DD_RUNTIME_METRICS_ENABLED` | `DD_RUNTIME_METRICS_ENABLED` | `DD_RUNTIME_METRICS_ENABLED` |
| `tracing_sampling_rate` | `dd.trace.sample.rate` | `DD_TRACE_SAMPLE_RATE` | `DD_TRACE_SAMPLE_RATE` | `DD_TRACE_SAMPLE_RATE`  |
| `tracing_rate_limit` | `dd.trace.rate.limit`    | `DD_TRACE_RATE_LIMIT` | `DD_TRACE_RATE_LIMIT` | `DD_TRACE_RATE_LIMIT` |
| `tracing_tags` | `dd.tags` | `DD_TAGS` | `DD_TAGS` | `DD_TAGS` |
| `tracing_service_mapping` | `dd.service.mapping` | `DD_SERVICE_MAPPING` | `DD_TRACE_SERVICE_MAPPING` | `DD_SERVICE_MAPPING` |
| `tracing_agent_timeout` | `dd.trace.agent.timeout` |  非該当 | 非該当 | 非該当 |
| `tracing_header_tags` | `dd.trace.header.tags` |    非該当    | `DD_TRACE_HEADER_TAGS` | `DD_TRACE_HEADER_TAGS` |
| `tracing_partial_flush_min_spans` | `dd.trace.partial.flush.min.spans` | `DD_TRACE_PARTIAL_FLUSH_MIN_SPANS` | `DD_TRACE_PARTIAL_FLUSH_ENABLED ` | 非該当 |
| `tracing_debug` | `dd.trace.debug` | `DD_TRACE_DEBUG` | `DD_TRACE_DEBUG` | `DD_TRACE_DEBUG` |
| `tracing_log_level` | `datadog.slf4j.simpleLogger.defaultLogLevel` | `DD_TRACE_LOG_LEVEL` |   非該当    | 非該当 |

Tracer library configuration options that aren't mentioned in the injection configuration are still available for use through properties or environment variables the usual way.

### 基本構成設定

`BASIC` の構成設定は以下の YAML 設定と同等です。

```yaml
---
version: 1
tracing_enabled: true
log_injection_enabled: true
health_metrics_enabled: true
runtime_metrics_enabled: true
```

## サービスの起動

launch コマンドで preload ライブラリの構成を指定して、サービスを起動します。`DD_CONFIG_SOURCES` が指定されない場合、`/etc/datadog-agent/inject/host_config.yaml` コンフィギュレーションファイルの `config_sources` に指定された値が使用されます。`DD_CONFIG_SOURCES` のデフォルトは `BASIC` です。

**Java アプリの例**:
```sh
java -jar <SERVICE_1>.jar &
DD_CONFIG_SOURCES=LOCAL:/etc/<SERVICE_2>/config.yaml;BASIC java -jar <SERVICE_2>.jar &
```

**Node アプリの例**:
```sh
node index.js &
DD_CONFIG_SOURCES=LOCAL:/etc/<SERVICE_2>/config.yaml;BASIC node index.js &
```

**.NET アプリの例**:
```sh
dotnet <SERVICE_1>.dll &
DD_CONFIG_SOURCES=LOCAL:/etc/<SERVICE_2>/config.yaml;BASIC dotnet <SERVICE_2>.dll &
```
**Python アプリの例**:
```sh
python <SERVICE_1>.py &
DD_CONFIG_SOURCES=LOCAL:/etc/<SERVICE_2>/config.yaml;BASIC python <SERVICE_2>.py &
```

アプリケーションを実行すると、テレメトリーデータが生成され、[APM のトレース][5]として見ることができます。


[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
[2]: /agent/configuration/agent-commands/?tab=agentv6v7#start-the-agent
[3]: https://learn.microsoft.com/en-us/dotnet/core/install/linux-ubuntu
[4]: /tracing/trace_collection/library_config/
[5]: https://app.datadoghq.com/apm/traces
[6]: /tracing/other_telemetry/connect_logs_and_traces/
[7]: https://docs.aws.amazon.com/sdk-for-go/api/aws/session/
[8]: https://cloud.google.com/docs/authentication#service-accounts
{{% /tab %}}

{{% tab "ホスト上の Agent、コンテナ内のアプリ" %}}

<div class="alert alert-info">Tracing Library Injection on hosts and containers is in beta.</div>


When your Agent is running on a host, and your services are running in containers, Datadog injects the tracing library by intercepting container creation and configuring the Docker container.

Any newly started processes are intercepted and the specified instrumentation library is injected into the services.

**Note**: Injection on arm64 is not supported.

## Install both library injection and the Datadog Agent

**要件**:
- Linux が動作するホスト。
- [Docker Engine][2]。

ホストにまだ Datadog Agent がインストールされていない場合、または Datadog Agent のインストールをアップグレードしたい場合は、Datadog Agent インストールスクリプトを使用して、挿入ライブラリと Datadog Agent の両方をインストールします。

```shell
DD_APM_INSTRUMENTATION_ENABLED=all DD_API_KEY=<YOUR KEY> DD_SITE="<YOUR SITE>" bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
```

デフォルトでは、スクリプトを実行すると Java、Node.js、Python、Ruby、.NET のサポートがインストールされます。インストールされる言語サポートを指定したい場合は、環境変数 `DD_APM_INSTRUMENTATION_LANGUAGES` も設定してください。有効な値は `java`、`js`、`python`、`ruby`、`dotnet` です。複数の言語を指定するには、カンマ区切りのリストを使用します。

```shell
DD_APM_INSTRUMENTATION_LANGUAGES=java,js DD_APM_INSTRUMENTATION_ENABLED=all DD_API_KEY=<YOUR KEY> DD_SITE="<YOUR SITE>" bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
```

## Configure Docker injection {#configure-docker-injection-2}

If the default configuration doesn't meet your needs, you can edit `/etc/datadog-agent/inject/docker_config.yaml` and add the following YAML configuration for the injection:

```yaml
---
log_level: debug
output_paths:
- stderr
config_sources: BASIC
```

`config_sources`
: Turn on or off library injection and specify a semicolon-separated ordered list of places where configuration is stored. The first value that returns without an error is used. Configuration is not merged across configuration sources. The valid values are:
  - `BLOB:<URL>` - `<URL>` にある Blob ストア (S3 互換) から構成を読み込みます。
  - `LOCAL:<PATH>` - ローカルファイルシステム上の `<PATH>` にあるファイルから読み込みます。
  - `BASIC` - デフォルト値を使用します。`config_sources` が指定されていない場合は、この構成が使用されます。<br/>

`BASIC`、`LOCAL`、`BLOB` は大文字でなければなりません。

構成ソースの値は、セミコロンで区切って複数の可能性のある場所を示すことができます。エラーなしで返された最初の構成が使用されます。複数の構成ソースから構成がマージされることはありません。次の例では、S3 バケットをチェックして構成を確認し、次にローカルのファイルシステムをチェックして、最後に組み込みのデフォルト構成を使用します。

```yaml
config_sources: BLOB:s3://config_bucket/my_process_config.yaml?region=us-east-1;LOCAL:/opt/config/my_process_config.yaml;BASIC
```

`BLOB` または `LOCAL` の設定について詳しくは、[構成ソースの供給](#supplying-configuration-source-hc)を参照してください。

`log_level`
: 何が起こっているかについての詳細な情報をログに記録する場合は `debug` に、それよりもはるかに少ない情報をログに記録する場合は `info`、`warn`、または `error` に設定します。<br>
**デフォルト**: `info`

`output_paths`
: ログを書き込む 1 つまたは複数の場所のリスト。<br>
**デフォルト**: `stderr`

オプション: `env`
: Docker で動作するコンテナ、例えば `dev`、`prod`、`staging` などの `DD_ENV` タグを指定します。 <br>
**デフォルト** なし。

<a id="supplying-configuration-source-hc"></a>

### 構成ソースの供給

`BLOB` または `LOCAL` を構成ソースに指定した場合は、そこに JSON または YAML ファイルを作成し、JSON として:

```json
{
    "version": 1,
    "tracing_enabled": true,
    "log_injection_enabled": true,
    "health_metrics_enabled": true,
    "runtime_metrics_enabled": true,
    "tracing_sampling_rate": 1.0,
    "tracing_rate_limit": 1,
    "tracing_tags": ["a=b", "foo"],
    "tracing_service_mapping": [
        { "from_key": "mysql", "to_name": "super_db"},
        { "from_key": "postgres", "to_name": "my_pg"}
    ],
    "tracing_agent_timeout": 1,
    "tracing_header_tags": [
        {"header": "HEADER", "tag_name":"tag"}
    ],
    "tracing_partial_flush_min_spans": 1,
    "tracing_debug": true,
    "tracing_log_level": "debug",
}

```

または YAML 形式にすることができます。
```yaml
---
version: 1
tracing_enabled: true
log_injection_enabled: true
health_metrics_enabled: true
runtime_metrics_enabled: true
tracing_sampling_rate: 1.0
tracing_rate_limit: 1
tracing_tags:
- a=b
- foo
tracing_service_mapping:
- from_key: mysql
  to_name: super_db
- from_key: postgres
  to_name: my_pg
tracing_agent_timeout: 1
tracing_header_tags:
- header: HEADER
  tag_name: tag
tracing_partial_flush_min_spans: 1
tracing_debug: true
tracing_log_level: debug
```


The following table shows how the injection configuration values map to the corresponding [tracing library configuration options][4]:

| 挿入可否 | Java トレーサー | NodeJS トレーサー | .NET トレーサー | Python トレーサー |
| --------- | ----------- | ------------- | ----------- | ------------- |
| `tracing_enabled` | `dd.trace.enabled` | `DD_TRACE_ENABLED` | `DD_TRACE_ENABLED` |  `DD_TRACE_ENABLED` |
| `log_injection_enabled` | `dd.logs.injection` | `DD_LOGS_INJECTION` | `DD_LOGS_INJECTION` |  `DD_LOGS_INJECTION` |
| `health_metrics_enabled` | `dd.trace.health.metrics.enabled` |    非該当   |    非該当  | 非該当 |
| `runtime_metrics_enabled` | `dd.jmxfetch.enabled` | `DD_RUNTIME_METRICS_ENABLED` | `DD_RUNTIME_METRICS_ENABLED` | `DD_RUNTIME_METRICS_ENABLED` |
| `tracing_sampling_rate` | `dd.trace.sample.rate` | `DD_TRACE_SAMPLE_RATE` | `DD_TRACE_SAMPLE_RATE` | `DD_TRACE_SAMPLE_RATE`  |
| `tracing_rate_limit` | `dd.trace.rate.limit`       | `DD_TRACE_RATE_LIMIT` | `DD_TRACE_RATE_LIMIT` | `DD_TRACE_RATE_LIMIT` |
| `tracing_tags` | `dd.tags` | `DD_TAGS` | `DD_TAGS` | `DD_TAGS` |
| `tracing_service_mapping` | `dd.service.mapping` | `DD_SERVICE_MAPPING` | `DD_TRACE_SERVICE_MAPPING` | `DD_SERVICE_MAPPING` |
| `tracing_agent_timeout` | `dd.trace.agent.timeout` |  非該当 | 非該当 | 非該当 |
| `tracing_header_tags` | `dd.trace.header.tags` |    非該当    | `DD_TRACE_HEADER_TAGS` | `DD_TRACE_HEADER_TAGS` |
| `tracing_partial_flush_min_spans` | `dd.trace.partial.flush.min.spans` | `DD_TRACE_PARTIAL_FLUSH_MIN_SPANS` | `DD_TRACE_PARTIAL_FLUSH_ENABLED ` | 非該当 |
| `tracing_debug` | `dd.trace.debug` | `DD_TRACE_DEBUG` | `DD_TRACE_DEBUG` | `DD_TRACE_DEBUG` |
| `tracing_log_level` | `datadog.slf4j.simpleLogger.defaultLogLevel` | `DD_TRACE_LOG_LEVEL` |   非該当    | 非該当 |

Tracer library configuration options that aren't mentioned in the injection configuration are still available for use through properties or environment variables the usual way.

#### Blob ストレージのサポート
サポートされている Blob ストレージソリューションは以下のとおりです。
- **Amazon S3** - Set the URL with the `s3://` prefix. If you have authenticated with the AWS CLI, it uses those credentials.
環境変数を使用した資格情報の構成については、[AWS SDK ドキュメント][7]を参照してください。
- **GCP GCS** - Set the URL with the `gs://` prefix. It uses Application Default Credentials. Authenticate with `gcloud auth application-default login`. See [the Google Cloud authentication documentation][8] for more information about configuring credentials using environment variables.
- **Azure Blob** - プレフィックス `azblob://` で URL を設定し、ストレージコンテナ名を指定します。これは `AZURE_STORAGE_ACCOUNT` にある資格情報 (つまり、バケット名) と `AZURE_STORAGE_KEY` と `AZURE_STORAGE_SAS_TOKEN` の少なくとも一方を使用します。`BLOB` や `LOCAL` の設定については、[構成ソースの提供](#supplying-configuration-source-hc)を参照してください。

### 基本構成設定

`BASIC` の構成設定は以下の YAML 設定と同等です。

```yaml
---
version: 1
tracing_enabled: true
log_injection_enabled: true
health_metrics_enabled: true
runtime_metrics_enabled: true
```

## コンテナへの統合サービスタグ付けの指定

環境変数 `DD_ENV`、`DD_SERVICE`、`DD_VERSION` がサービスコンテナイメージで指定されている場合、それらの値はコンテナからのテレメトリーにタグ付けするために使用されます。

指定がない場合は、`DD_ENV` は `/etc/datadog-agent/inject/docker_config.yaml` コンフィギュレーションファイルに設定されている `env` 値を使用します (もしある場合)。`DD_SERVICE` は、Docker イメージの名前から取得します。`my-service:1.0` という名前のイメージは、`my-service` の `DD_SERVICE` でタグ付けされます。

## サービスの起動

Agent を起動し、通常通りコンテナ化されたサービスを起動します。

アプリケーションを実行すると、テレメトリーデータが生成され、[APM のトレース][5]として見ることができます。

[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
[2]: https://docs.docker.com/engine/install/ubuntu/
[3]: /agent/configuration/agent-commands/?tab=agentv6v7#start-the-agent
[4]: /tracing/trace_collection/library_config/
[5]: https://app.datadoghq.com/apm/traces
[7]: https://docs.aws.amazon.com/sdk-for-go/api/aws/session/
[8]: https://cloud.google.com/docs/authentication#service-accounts

{{% /tab %}}

{{% tab "別々のコンテナ内の Agent とアプリ" %}}

<div class="alert alert-info">Tracing Library Injection in containers is in beta.</div>

When your Agent and services are running in separate Docker containers on the same host, Datadog injects the tracing library by intercepting container creation and configuring the Docker container.

Any newly started processes are intercepted and the specified instrumentation library is injected into the services.

**要件**:
- [Docker Engine][1]。

**Note**: Injection on arm64 is not supported.

## プリロードライブラリのインストール

Use the `install_script_docker_injection` shell script to automatically install Docker injection support. Docker must already be installed on the host machine.

```shell
bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_docker_injection.sh)"
```

これにより、サポートされているすべての言語の言語ライブラリがインストールされます。特定の言語をインストールするには、`DD_APM_INSTRUMENTATION_LANGUAGES` 変数を設定します。有効な値は `java`、`js`、`python`、`ruby` および `dotnet` です。

```shell
DD_APM_INSTRUMENTATION_LANGUAGES=java,js bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_docker_injection.sh)"
```

## Configure Docker injection

Edit `/etc/datadog-agent/inject/docker_config.yaml` and add the following YAML configuration for the injection:

```yaml
---
log_level: debug
output_paths:
- stderr
config_sources: BASIC
```

`config_sources`
: Turn on or off library injection and specify a semicolon-separated ordered list of places where configuration is stored. The first value that returns without an error is used. Configuration is not merged across configuration sources. The valid values are:
  - `BLOB:<URL>` - `<URL>` にある Blob ストア (S3 互換) から構成を読み込みます。
  - `LOCAL:<PATH>` - ローカルファイルシステム上の `<PATH>` にあるファイルから読み込みます。
  - `BASIC` - デフォルト値を使用します。`config_sources` が指定されていない場合は、この構成が使用されます。<br/>

`BASIC`、`LOCAL`、`BLOB` は大文字でなければなりません。

Config source values can be separated by semicolons to indicate multiple possible locations. The first configuration that returns without an error is used. Configuration is not merged from multiple configuration sources. The following example checks an S3 bucket for configuration, then checks the local file system, and finally uses the built-in default configuration: 

```yaml
config_sources: BLOB:s3://config_bucket/my_process_config.yaml?region=us-east-1;LOCAL:/opt/config/my_process_config.yaml;BASIC
```


`BLOB` または `LOCAL` の設定について詳しくは、[構成ソースの供給](#supplying-configuration-source-c)を参照してください。

`log_level`
: 何が起こっているかについての詳細な情報をログに記録する場合は `debug` に、それよりもはるかに少ない情報をログに記録する場合は `info` に設定します。

`output_paths`
: ログを書き込む 1 つまたは複数の場所のリスト。<br>
**デフォルト**: `stderr`

オプション: `env`
: Docker で動作するコンテナ、例えば `dev`、`prod`、`staging` などの `DD_ENV` タグを指定します。 <br>
**デフォルト** なし。

<a id="supplying-configuration-source-c"></a>

### 構成ソースの供給

`BLOB` または `LOCAL` を構成ソースに指定した場合は、そこに JSON または YAML ファイルを作成し、JSON として:

```json
{
    "version": 1,
    "tracing_enabled": true,
    "log_injection_enabled": true,
    "health_metrics_enabled": true,
    "runtime_metrics_enabled": true,
    "tracing_sampling_rate": 1.0,
    "tracing_rate_limit": 1,
    "tracing_tags": ["a=b", "foo"],
    "tracing_service_mapping": [
        { "from_key": "mysql", "to_name": "super_db"},
        { "from_key": "postgres", "to_name": "my_pg"}
    ],
    "tracing_agent_timeout": 1,
    "tracing_header_tags": [
        {"header": "HEADER", "tag_name":"tag"}
    ],
    "tracing_partial_flush_min_spans": 1,
    "tracing_debug": true,
    "tracing_log_level": "debug",
}

```

または YAML 形式にすることができます。
```yaml
---
version: 1
tracing_enabled: true
log_injection_enabled: true
health_metrics_enabled: true
runtime_metrics_enabled: true
tracing_sampling_rate: 1.0
tracing_rate_limit: 1
tracing_tags:
- a=b
- foo
tracing_service_mapping:
- from_key: mysql
  to_name: super_db
- from_key: postgres
  to_name: my_pg
tracing_agent_timeout: 1
tracing_header_tags:
- header: HEADER
  tag_name: tag
tracing_partial_flush_min_spans: 1
tracing_debug: true
tracing_log_level: debug
```

このコンフィギュレーションファイルでは、`version` の値は常に `1` です。これは、コンテンツのバージョンではなく、使用する構成スキーマのバージョンを指しています。

The following table shows how the injection configuration values map to the corresponding [tracing library configuration options][3]:

| 挿入可否 | Java トレーサー | NodeJS トレーサー | .NET トレーサー | Python トレーサー |
| --------- | ----------- | ------------- | ----------- | ------------- |
| `tracing_enabled` | `dd.trace.enabled` | `DD_TRACE_ENABLED` | `DD_TRACE_ENABLED` |  `DD_TRACE_ENABLED` |
| `log_injection_enabled` | `dd.logs.injection` | `DD_LOGS_INJECTION` | `DD_LOGS_INJECTION` |  `DD_LOGS_INJECTION` |
| `health_metrics_enabled` | `dd.trace.health.metrics.enabled` |    非該当   |    非該当  | 非該当 |
| `runtime_metrics_enabled` | `dd.jmxfetch.enabled` | `DD_RUNTIME_METRICS_ENABLED` | `DD_RUNTIME_METRICS_ENABLED` | `DD_RUNTIME_METRICS_ENABLED` |
| `tracing_sampling_rate` | `dd.trace.sample.rate` | `DD_TRACE_SAMPLE_RATE` | `DD_TRACE_SAMPLE_RATE` | `DD_TRACE_SAMPLE_RATE`  |
| `tracing_rate_limit` | `dd.trace.rate.limit`       | `DD_TRACE_RATE_LIMIT` | `DD_TRACE_RATE_LIMIT` | `DD_TRACE_RATE_LIMIT` |
| `tracing_tags` | `dd.tags` | `DD_TAGS` | `DD_TAGS` | `DD_TAGS` |
| `tracing_service_mapping` | `dd.service.mapping` | `DD_SERVICE_MAPPING` | `DD_TRACE_SERVICE_MAPPING` | `DD_SERVICE_MAPPING` |
| `tracing_agent_timeout` | `dd.trace.agent.timeout` |  非該当 | 非該当 | 非該当 |
| `tracing_header_tags` | `dd.trace.header.tags` |    非該当    | `DD_TRACE_HEADER_TAGS` | `DD_TRACE_HEADER_TAGS` |
| `tracing_partial_flush_min_spans` | `dd.trace.partial.flush.min.spans` | `DD_TRACE_PARTIAL_FLUSH_MIN_SPANS` | `DD_TRACE_PARTIAL_FLUSH_ENABLED ` | 非該当 |
| `tracing_debug` | `dd.trace.debug` | `DD_TRACE_DEBUG` | `DD_TRACE_DEBUG` | `DD_TRACE_DEBUG` |
| `tracing_log_level` | `datadog.slf4j.simpleLogger.defaultLogLevel` | `DD_TRACE_LOG_LEVEL` |   非該当    | n/a |

Tracer library configuration options that aren't mentioned in the injection configuration are still available for use through properties or environment variables the usual way.

#### Blob ストレージのサポート
サポートされている Blob ストレージソリューションは以下のとおりです。
- **Amazon S3** - Set the URL with the `s3://` prefix. If you have authenticated with the AWS CLI, it uses those credentials.
環境変数を使用した資格情報の構成については、[AWS SDK ドキュメント][7]を参照してください。
- **GCP GCS** - Set the URL with the `gs://` prefix. It uses Application Default Credentials. Authenticate with `gcloud auth application-default login`. See [the Google Cloud authentication documentation][8] for more information about configuring credentials using environment variables.
- **Azure Blob** - プレフィックス `azblob://` で URL を設定し、ストレージコンテナ名を指定します。これは `AZURE_STORAGE_ACCOUNT` にある資格情報 (つまり、バケット名) と `AZURE_STORAGE_KEY` と `AZURE_STORAGE_SAS_TOKEN` の少なくとも一方を使用します。`BLOB` や `LOCAL` の設定については、[構成ソースの提供](#supplying-configuration-source-c)を参照してください。

### 基本構成設定

`BASIC` の構成設定は以下の YAML 設定と同等です。

```yaml
---
version: 1
tracing_enabled: true
log_injection_enabled: true
health_metrics_enabled: true
runtime_metrics_enabled: true
```

## Agent の構成

コンテナを起動する Docker コンポーズファイルでは、Agent に以下の設定を使用し、`${DD_API_KEY}` に自分の Datadog API キーをしっかり設定します。

```yaml
  dd-agent:
    container_name: dd-agent
    image: datadog/agent:7
    environment:
      - DD_API_KEY=${DD_API_KEY}
      - DD_APM_ENABLED=true
      - DD_APM_NON_LOCAL_TRAFFIC=true
      - DD_DOGSTATSD_NON_LOCAL_TRAFFIC=true
      - DD_APM_RECEIVER_SOCKET=/opt/datadog/apm/inject/run/apm.socket
      - DD_DOGSTATSD_SOCKET=/opt/datadog/apm/inject/run/dsd.socket
    volumes:
      - /opt/datadog/apm:/opt/datadog/apm
      - /var/run/docker.sock:/var/run/docker.sock:ro
```

## コンテナへの統合サービスタグ付けの指定

環境変数 `DD_ENV`、`DD_SERVICE`、`DD_VERSION` がサービスコンテナイメージで指定されている場合、それらの値はコンテナからのテレメトリーにタグ付けするために使用されます。

指定がない場合は、`DD_ENV` は `/etc/datadog-agent/inject/docker_config.yaml` コンフィギュレーションファイルに設定されている `env` 値を使用します (もしある場合)。`DD_SERVICE` は、Docker イメージの名前から取得します。`my-service:1.0` という名前のイメージは、`my-service` の `DD_SERVICE` でタグ付けされます。

##  Docker 上で Agent を起動する

`dd-agent` コンテナは、どのサービスコンテナよりも先に起動する必要があります。以下を実行します。

```sh
docker-compose up -d dd-agent
```

## サービスの起動

通常通り、コンテナ化されたサービスを起動します。

アプリケーションを実行すると、テレメトリーデータが生成され、[APM のトレース][4]として見ることができます。



[1]: https://docs.docker.com/engine/install/ubuntu/
[2]: https://bugzilla.redhat.com/show_bug.cgi?id=1792506
[3]: /tracing/trace_collection/library_config/
[4]: https://app.datadoghq.com/apm/traces
[7]: https://docs.aws.amazon.com/sdk-for-go/api/aws/session/
[8]: https://cloud.google.com/docs/authentication#service-accounts
{{% /tab %}}


{{< /tabs >}}

## Uninstall library injection

### Remove instrumentation for specific services

To stop producing traces for a specific service, run the following commands and restart the service:

{{< tabs >}}
{{% tab "ホスト" %}}

1. 環境変数 `DD_INSTRUMENT_SERVICE_WITH_APM` をサービス起動コマンドに追加します。

   ```shell
   DD_INSTRUMENT_SERVICE_WITH_APM=false <service_start_command>
   ```
2. サービスを再起動します。

{{% /tab %}}

{{% tab "別々のコンテナ内の Agent とアプリ" %}}

1. 環境変数 `DD_INSTRUMENT_SERVICE_WITH_APM` をサービス起動コマンドに追加します。
   ```shell
   docker run -e DD_INSTRUMENT_SERVICE_WITH_APM=false
   ```
2. サービスを再起動します。
{{% /tab %}}

{{< /tabs >}}

### Remove APM for all services on the infrastructure

トレースの生成を停止するには、ライブラリインジェクタを削除し、インフラストラクチャーを再起動します。


{{< tabs >}}
{{% tab "ホスト" %}}

1. 次を実行します。
   ```shell
   dd-host-install --uninstall
   ```
2. ホストを再起動します。

{{% /tab %}}

{{% tab "別々のコンテナ内の Agent とアプリ" %}}

1. ローカルライブラリインジェクションをアンインストールします。
   ```shell
   dd-container-install --uninstall
   ```
2. Docker を再起動します。
   ```shell
   systemctl restart docker
   ```
   または、環境に応じたコマンドを使用してください。

{{% /tab %}}

{{< /tabs >}}

## ライブラリの構成

The supported features and configuration options for the tracing library are the same for library injection as for other installation methods, and can be set with environment variables. Read the [Datadog library configuration page][2] for your language for more details.

例えば、[Application Security Monitoring][3] や [Continuous Profiler][4] をオンにすることができ、それぞれ請求の影響が出る可能性があります。

- **Kubernetes** の場合は、基底となるアプリケーションポッドのデプロイファイルで `DD_APPSEC_ENABLED` または `DD_PROFILING_ENABLED` 環境変数を `true` に設定します。

- For **hosts and containers**, set the `DD_APPSEC_ENABLED` or `DD_PROFILING_ENABLED` container environment variables to `true`, or in the [injection configuration](#supplying-configuration-source), specify an `additional_environment_variables` section like the following YAML example:

  ```yaml
  additional_environment_variables:
  - key: DD_PROFILING_ENABLED
    value: true
  - key: DD_APPSEC_ENABLED
    value: true
  ```

  Only configuration keys that start with `DD_` can be set in the injection config source `additional_environment_variables` section.


[1]: /tracing/trace_collection/
[2]: /tracing/trace_collection/library_config/
[3]: /security/application_security/enabling/tracing_libraries/threat_detection/java
[4]: /profiler/enabling/java/?tab=environmentvariables#installation
[5]: /tracing/trace_collection/automatic_instrumentation/
[6]: /tracing/trace_collection/single-step-apm
[7]: /tracing/trace_collection/dd_libraries/
