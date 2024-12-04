---
aliases:
- /ja/tracing/trace_collection/admission_controller/
- /ja/tracing/trace_collection/library_injection/
description: インスツルメンテーションライブラリのアプリケーションへの挿入
title: ライブラリのローカル挿入
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
* Java、Python、Node.js については Datadog [Cluster Agent v7.40+][3]、.NET、Ruby については Datadog [Cluster Agent v7.44+][3]。
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


#### TLS issues

##### `tls: protocol version not supported`

- **Problem**: Since Cluster Agent v1.20, the API is only served using TLS v1.3 by default. If the Kubernetes cluster is configured with TLS v1.2 or older, library injection fails.

- **Solution**: Set `DD_CLUSTER_AGENT_ALLOW_LEGACY_TLS` to `true` for Cluster Agent.


[1]: /ja/containers/cluster_agent/admission_controller/
[2]: https://kubernetes.io/docs/reference/access-authn-authz/admission-controllers/
[3]: /ja/containers/kubernetes/installation/?tab=helm
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
[21]: /ja/getting_started/tagging/unified_service_tagging/
[22]: https://app.datadoghq.com/apm/traces
[23]: http://gcr.io/datadoghq/dd-lib-ruby-init
[24]: http://hub.docker.com/r/datadog/dd-lib-ruby-init
[25]: http://gallery.ecr.aws/datadog/dd-lib-ruby-init
[26]: /ja/tracing/trace_collection/dd_libraries/python/
{{% /tab %}}

{{% tab "Host" %}}

<div class="alert alert-info">Tracing Library Injection on a host is in beta.</div>

When both the Agent and your services are running on a host, real or virtual, Datadog injects the tracing library by using a preload library that overrides calls to `execve`. Any newly started processes are intercepted and the specified instrumentation library is injected into the services.

**Note**: Injection on arm64 is not supported.

## Install both library injection and the Datadog Agent

**要件**: Linux が動作するホスト。

ホストにまだ Datadog Agent がインストールされていない場合、または Datadog Agent のインストールをアップグレードしたい場合は、Datadog Agent インストールスクリプトを使用して、挿入ライブラリと Datadog Agent の両方をインストールします。

```shell
DD_APM_INSTRUMENTATION_ENABLED=host DD_APM_INSTRUMENTATION_LIBRARIES=java:1,python:2,js:5,dotnet:2,ruby:2 DD_API_KEY=<YOUR KEY> DD_SITE="<YOUR SITE>" bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
```

By default, running the script installs support for Java, Node.js, Python, Ruby, and .NET all pinned to the latest major version. If you want to specify which language support is installed, also set the `DD_APM_INSTRUMENTATION_LIBRARIES` environment variable. The valid values are `java`, `js`, `python`, `ruby`, and `dotnet`. Use a comma-separated list to specify more than one language:

```shell
DD_APM_INSTRUMENTATION_LIBRARIES=java:1,js:5 DD_APM_INSTRUMENTATION_ENABLED=host DD_API_KEY=<YOUR KEY> DD_SITE="<YOUR SITE>" bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
```

Exit and open a new shell to use the injection library.

## 次のステップ

まだインストールしていない場合は、アプリと、そのアプリが必要とするサポート言語やライブラリをインストールしてください。

When an app that is written in a supported language is launched, it is automatically injected with tracing enabled.

## Configure the injection

Configure host injection in one of the following ways:
- 起動するプロセスに環境変数を設定します。

環境変数の値は、プロセスごとにコンフィギュレーションファイルの設定をオーバーライドします。

### 構成ファイル

| プロパティ名 | 目的 | デフォルト値 | 有効な値 |
| --------- | ----------- | ------------- | ----------- |
|`log_level`  | ロギングレベル|`off`|`off`、`debug`、`info`、`warn`、`error`|
|`output_paths`|The location where log output is written|`stderr`|`stderr` または `file://` URL|
|`env`|The default environment assigned to a process|なし|非該当|


#### 例

```yaml
---
log_level: debug
output_paths:
  - file:///tmp/host_injection.log
env: dev
```

### 環境変数

The following environment variables configure library injection. You can pass these in by `export` through the command line (`export DD_CONFIG_SOURCES=BASIC`), shell configuration, or launch command.

構成ファイルの各フィールドは環境変数に対応しています。この環境変数は起動中のプロセスの環境変数から読み込まれ、現在起動中のプロセスのみに影響を与えます。

|構成ファイルのプロパティ|環境変数|
| --------- | ----------- |
|`log_level`|`DD_APM_INSTRUMENTATION_DEBUG`|
|`output_paths`|`DD_APM_INSTRUMENTATION_OUTPUT_PATHS`|
|`env`|`DD_ENV`|

The `DD_APM_INSTRUMENTATION_DEBUG` environment variable is limited to the values `true` and `false` (default value `false`). Setting it to `true` sets `log_level` to `debug` and setting it to `false` (or not setting it at all) uses the `log_level` specified in the configuration file. The environment variable can only set the log level to `debug`, not any other log level values.

The `DD_INSTRUMENT_SERVICE_WITH_APM` environment variable controls whether or not injection is enabled. It defaults to `TRUE`. Set it to `FALSE` to turn off library injection altogether.

### Default configuration

デフォルトでは、インスツルメンテーションプロセスでは以下の設定が有効になっています。
- トレーシング
- Log injection, assuming the application uses structured logging (usually JSON). For traces to appear in non-structured logs, you must change your application’s log configuration to include placeholders for trace ID and span ID. See [Connect Logs and Traces][6] for more information.
- 健全性メトリクス
- ランタイムメトリクス


アプリケーションを実行すると、テレメトリーデータが生成され、[APM のトレース][5]として見ることができます。


[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
[2]: /ja/agent/configuration/agent-commands/?tab=agentv6v7#start-the-agent
[3]: https://learn.microsoft.com/en-us/dotnet/core/install/linux-ubuntu
[4]: /ja/tracing/trace_collection/library_config/
[5]: https://app.datadoghq.com/apm/traces
[6]: /ja/tracing/other_telemetry/connect_logs_and_traces/
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

By default, running the script installs support for Java, Node.js, Python, Ruby, and .NET. If you want to specify which language support is installed, also set the `DD_APM_INSTRUMENTATION_LIBRARIES` environment variable. The valid values are `java`, `js`, `python`, `ruby`, and `dotnet`. Use a comma-separated list to specify more than one language:

```shell
DD_APM_INSTRUMENTATION_LIBRARIES=java:1,js:5 DD_APM_INSTRUMENTATION_ENABLED=all DD_API_KEY=<YOUR KEY> DD_SITE="<YOUR SITE>" bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
```

## コンテナへの統合サービスタグ付けの指定

環境変数 `DD_ENV`、`DD_SERVICE`、`DD_VERSION` がサービスコンテナイメージで指定されている場合、それらの値はコンテナからのテレメトリーにタグ付けするために使用されます。

指定がない場合は、`DD_ENV` は `/etc/datadog-agent/inject/docker_config.yaml` コンフィギュレーションファイルに設定されている `env` 値を使用します (もしある場合)。`DD_SERVICE` は、Docker イメージの名前から取得します。`my-service:1.0` という名前のイメージは、`my-service` の `DD_SERVICE` でタグ付けされます。

## サービスの起動

Agent を起動し、通常通りコンテナ化されたサービスを起動します。

アプリケーションを実行すると、テレメトリーデータが生成され、[APM のトレース][5]として見ることができます。

[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
[2]: https://docs.docker.com/engine/install/ubuntu/
[3]: /ja/agent/configuration/agent-commands/?tab=agentv6v7#start-the-agent
[4]: /ja/tracing/trace_collection/library_config/
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

Use the `install_script_agent7.sh` shell script to automatically install Docker injection support. Docker must already be installed on the host machine.

```shell
DD_APM_INSTRUMENTATION_ENABLED=docker DD_NO_AGENT_INSTALL=true bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
```

This installs language libraries for all supported languages. To install specific languages, set the `DD_APM_INSTRUMENTATION_LIBRARIES` variable. The valid values are `java`, `js`, `python`, `ruby`, and `dotnet`:

```shell
DD_APM_INSTRUMENTATION_LIBRARIES="java:1,js:5" DD_APM_INSTRUMENTATION_ENABLED=docker DD_NO_AGENT_INSTALL=true bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
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
      - DD_APM_RECEIVER_SOCKET=/var/run/datadog/apm.socket
      - DD_DOGSTATSD_SOCKET=/var/run/datadog/dsd.socket
    volumes:
      - /var/run/datadog:/var/run/datadog
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
[3]: /ja/tracing/trace_collection/library_config/
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

- For **hosts and containers**, set the `DD_APPSEC_ENABLED` or `DD_PROFILING_ENABLED` container environment variables to `true`.


[1]: /ja/tracing/trace_collection/
[2]: /ja/tracing/trace_collection/library_config/
[3]: /ja/security/application_security/threats/setup/threat_detection/java/
[4]: /ja/profiler/enabling/java/?tab=environmentvariables#installation
[5]: /ja/tracing/trace_collection/automatic_instrumentation/
[6]: /ja/tracing/trace_collection/single-step-apm
[7]: /ja/tracing/trace_collection/dd_libraries/