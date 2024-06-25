06462314-
aliases:
- /ja/tracing/trace_collection/admission_controller/
- /ja/tracing/trace_collection/library_injection/
description: インスツルメンテーションライブラリのアプリケーションへの挿入
kind: documentation
title: ライブラリのローカル挿入
---

## 概要

アプリケーションのインスツルメンテーションを行うには、
* このページで説明されているように、インスツルメンテーションライブラリをローカル (Agent) で挿入する、または
* [Datadog からリモートでインスツルメンテーションライブラリを挿入する][5] (ベータ版)、または
* [アプリケーションでインスツルメンテーションライブラリを手動で追加する][1]。

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
* Ruby の場合、ライブラリ挿入のサポートはベータ版です。インスツルメンテーションは、現時点では Ruby on Rails または Hanami アプリケーションに対してのみサポートされています。
* サポートされているアーキテクチャを持つ Linux 上にデプロイされた Java、JavaScript、Python、.NET、または Ruby のアプリケーション。言語ごとにサポートされているアーキテクチャの完全なリストについては、[対応するコンテナレジストリ](#container-registries)を確認してください。

## コンテナレジストリ

<div class="alert alert-warning">2023 年 7 月 10 日、Docker Hub は Datadog の Docker Hub レジストリへのダウンロードレート制限を実施するようになります。これらのレジストリからのイメージのプルは、レート制限割り当てにカウントされます。<br/><br/>

Datadog は、Datadog Agent と Cluster Agent の構成を更新して、レート制限が適用されない他のレジストリからプルすることを推奨しています。手順については、<a href="/agent/guide/changing_container_registry">コンテナレジストリを変更する</a>を参照してください。</div>

Datadog は、インスツルメンテーションライブラリのイメージを gcr.io、Docker Hub、AWS ECR で公開しています。
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

1. Datadog Admission Controller を有効にして、ポッドを変異させます。
2. ポッドにアノテーションを付けて、どのインスツルメンテーションライブラリを挿入するか選択します。
3. 統合サービスタグ付けにより、ポッドにタグを付け、Datadog のテレメトリーを結び付け、一貫したタグでトレース、メトリクス、ログをシームレスにナビゲートします。
4. 新しい構成を適用します。

<div class="alert alert-info">ライブラリを挿入するために、新しいアプリケーションイメージを生成する必要はありません。ライブラリの挿入はインスツルメンテーションライブラリの追加で行われるため、アプリケーションイメージの変更は必要ありません。</div>

### ステップ 1 - Datadog Admission Controller を有効にして、ポッドを変異させます

デフォルトでは、Datadog Admission Controller は、特定のラベルでラベル付けされたポッドのみを変異させます。ポッドの変異を有効にするには、ポッドのスペックにラベル `admission.datadoghq.com/enabled: "true"` を追加します。

**注**: Datadog Admission Controller で、Cluster Agent で `clusterAgent.admissionController.mutateUnlabelled` (または `DD_ADMISSION_CONTROLLER_MUTATE_UNLABELLED`) を `true` に設定すると、このポッドラベルがなくても挿入設定を有効にすることが可能です。

構成方法の詳細については、[Datadog Admission Controller のページ][1]をご覧ください。

例:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    ...
...
template:
  metadata:
    labels:
        admission.datadoghq.com/enabled: "true" # Admission Controller を有効にしてこのデプロイメントに含まれる新しいポッドを変異させます
  containers:
  -  ...
```

### ステップ 2 - ライブラリ挿入のためにポッドにアノテーションを付ける

ライブラリ挿入用のポッドを選択するには、ポッドの仕様で、アプリケーション言語に対応する以下のアノテーションを付けます。

| 言語   | ポッドアノテーション                                              |
|------------|-------------------------------------------------------------|
| Java       | `admission.datadoghq.com/java-lib.version: "<CONTAINER IMAGE TAG>"`   |
| JavaScript | `admission.datadoghq.com/js-lib.version: "<CONTAINER IMAGE TAG>"`     |
| Python     | `admission.datadoghq.com/python-lib.version: "<CONTAINER IMAGE TAG>"` |
| .NET       | `admission.datadoghq.com/dotnet-lib.version: "<CONTAINER IMAGE TAG>"` |
| Ruby       | `admission.datadoghq.com/ruby-lib.version: "<CONTAINER IMAGE TAG>"` |

利用可能なライブラリのバージョンは、各コンテナレジストリ、および各言語のトレーサーソースレジストリに記載されています。
- [Java][16]
- [Javascript][17]
- [Python][18]
- [.NET][19]
  - **注**: .NET ライブラリ挿入の場合、アプリケーションコンテナが musl ベースの Linux ディストリビューション (Alpine など) を使用している場合は、ポッドアノテーションに `-musl` というサフィックスを持つタグを指定する必要があります。例えば、ライブラリバージョン `v2.29.0` を使用する場合は、コンテナタグ `v2.29.0-musl` を指定します。
- [Ruby][20]

**注**: ライブラリのバージョン X を使用してインストルメンテーションを行ったアプリケーションで、ライブラリ挿入を使用して同じトレーサーライブラリのバージョン Y を使用してインストルメンテーションを行う場合、トレーサーは中断されません。むしろ、最初にロードされたライブラリのバージョンが使用されます。ライブラリ挿入は実行前にアドミッションコントローラレベルで行われるため、手動で構成されたライブラリよりも優先されます。

<div class="alert alert-warning"><strong>注</strong>: <code>最新の</code>タグを使用することはサポートされていますが、主要なライブラリのリリースでは、壊れるような変更が導入されることがあるので、注意して使用してください。</div>

例えば、Java ライブラリを挿入するには

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    ...
...
template:
  metadata:
    labels:
        admission.datadoghq.com/enabled: "true" # Admission Controller を有効にしてこのデプロイメントに含まれる新しいポッドを変異させます
    annotations:
        admission.datadoghq.com/java-lib.version: "<CONTAINER IMAGE TAG>"
  containers:
  -  ...
```

### ステップ 3 - 統合サービスタグ付けによるポッドへのタグ付け

[統合サービスタグ付け][21]を使用すると、Datadog のテレメトリーを結びつけ、一貫したタグでトレース、メトリクス、ログをシームレスにナビゲートすることができます。デプロイメントオブジェクトとポッドテンプレートの両方の仕様に、統合サービスタグ付けを設定します。
以下のラベルを使用して、統合サービスタグを設定します。

```yaml
...
    metadata:
        labels:
            tags.datadoghq.com/env: "<ENV>"
            tags.datadoghq.com/service: "<SERVICE>"
            tags.datadoghq.com/version: "<VERSION>"
...
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
...
template:
  metadata:
    labels:
        tags.datadoghq.com/env: "prod" # 統合サービスタグ - ポッド環境タグ
        tags.datadoghq.com/service: "my-service" # 統合サービスタグ - ポッドサービスタグ
        tags.datadoghq.com/version: "1.1" # 統合サービスタグ - ポッドバージョンタグ
        admission.datadoghq.com/enabled: "true" # Admission Controller を有効にしてこのデプロイメントに含まれる新しいポッドを変異させます
    annotations:
        admission.datadoghq.com/java-lib.version: "<CONTAINER IMAGE TAG>"
  containers:
  -  ...
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
{{% /tab %}}

{{% tab "Host" %}}

<div class="alert alert-info">ホスト上のトレーシングライブラリ挿入はベータ版です。</a></div>

Agent とお客様のサービスの両方が、現実または仮想のホスト上で実行されている場合、Datadog は `execve` の呼び出しをオーバーライドするプリロードライブラリを使用することで、トレーシングライブラリを挿入します。新しく開始されたプロセスは全て傍受され、指定されたインスツルメンテーションライブラリがサービスに挿入されます。

## 要件

- 最近の [Datadog Agent v7][1] のインストール

**注**: arm64 での挿入、Alpine Linux のコンテナイメージでの `musl` による挿入はサポートされていません。
## プリロードライブラリのインストール

1. [Agent が実行している][2]ことを確認します。

2. 次のコマンド セットのいずれかを使用してライブラリをインストールします。ここで、`<LANG>` は `java`、`js`、`dotnet`、`python` または `all` のいずれかです。

   **Ubuntu、Debian、またはその他の Debian ベースの Linux ディストリビューションの場合:**
   ```sh
   sudo apt-get update
   sudo apt-get install datadog-apm-inject datadog-apm-library-<LANG>
   ```
   **CentOS、RedHat、または yum/RPM を使用するその他のディストリビューションの場合:**
   ```sh
   sudo yum makecache
   sudo yum install datadog-apm-inject datadog-apm-library-<LANG>
   ```

3. コマンド `dd-host-install` を実行します。

4. 終了して新しいシェルを開き、プリロードライブラリを使用します。


## 言語とアプリをインストールする

1. Java アプリケーションの場合、JDK または JRE がインストールされていることを確認します。
   ```sh
   sudo apt install openjdk-17-jdk -y
   ```
   NodeJS アプリケーションの場合、NodeJS がインストールされていることを確認します。
   ```sh
   curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash -
   sudo apt install nodejs -y
   ```
   .NET アプリケーションの場合、[.NET ランタイムがインストールされていること][3]を確認します。

   Python アプリケーションの場合、Python がインストールされていることを確認します。
   ```sh
   sudo apt install python -y
   ```

2. まだの場合は、アプリをインストールします。

## 挿入の構成

以下の環境変数がライブラリの挿入を構成します。これらはコマンドラインから `export` (`export DD_CONFIG_SOURCES=BASIC`) やシェルの構成、あるいは起動コマンドで渡すことができます。


`DD_CONFIG_SOURCES`
: ライブラリ挿入のオン・オフを切り替え、構成を読み込む場所を指定します。オプションで、複数の値をセミコロンで区切って、複数の可能な場所を示します。エラーにならずに戻ってきた最初の値が使用されます。構成は、構成ソースにまたがってマージされることはありません。有効な値は次のとおりです。
  - `BLOB:<URL>` - `<URL>` にある Blob ストア (S3 互換) から構成を読み込みます。
  - `LOCAL:<PATH>` - ローカルファイルシステム上の `<PATH>` にあるファイルから読み込みます。
  - `BASIC` - エクスポートされた値またはデフォルト値を使用します。
  - `OFF` - デフォルト。挿入を行いません。<br>
`BLOB` または `LOCAL` の設定について詳しくは、[構成ソースの供給](#supplying-configuration-source-host)を参照してください。

`DD_LIBRARY_INJECT`
: `FALSE` に設定すると、ライブラリ挿入を完全にオフにすることができます。<br>
**デフォルト**: `TRUE`

`DD_INJECT_DEBUG`
: デバッグ情報をログに記録する場合は `TRUE` または `1` に設定します。<br>
**デフォルト**: `FALSE`

`DD_OUTPUT_PATHS`
: デバッグログを書き込む場所をカンマで区切ったリスト。<br>
**デフォルト**: `stderr`

<a id="supplying-configuration-source-host"></a>

### 構成ソースの供給

`BLOB` または `LOCAL` を構成ソースに指定した場合は、`etc/<APP_NAME>/config.json` または `.yaml` に JSON または YAML ファイルを作成し、JSON として:

```json
{
    "version": 1,
    "service_language": "<LANG>",
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

または YAML として構成を提供します:
```yaml
---
version: 1
service_language: <LANG>
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

`service_language` に以下のいずれかの値を設定します。
- `java`
- `node`
- `dotnet`
- `python`

このコンフィギュレーションファイルでは、`version` の値は常に `1` です。これは、コンテンツのバージョンではなく、使用する構成スキーマのバージョンを指しています。

次の表は、挿入構成値が対応する[トレーシングライブラリ構成オプション][4]にどのように対応するかを示しています。

| 挿入可否 | Java トレーサー | NodeJS トレーサー | .NET トレーサー | Python トレーサー |
| --------- | ----------- | ------------- | ----------- | ------------- |
| `tracing_enabled` | `dd.trace.enabled` | `DD_TRACE_ENABLED` | `DD_TRACE_ENABLED` |  `DD_TRACE_ENABLED` |
| `log_injection_enabled` | `dd.logs.injection` | `DD_LOGS_INJECTION` | `DD_LOGS_INJECTION` |  `DD_LOGS_INJECTION` |
| `health_metrics_enabled` | `dd.trace.health.metrics.enabled` |    非該当   |    非該当  | 非該当 |
| `runtime_metrics_enabled` | `dd.jmxfetch.enabled` | `DD_RUNTIME_METRICS_ENABLED` | `DD_RUNTIME_METRICS_ENABLED` | `DD_RUNTIME_METRICS_ENABLED` |
| `tracing_sampling_rate` | `dd.trace.sample.rate` | `DD_TRACE_SAMPLE_RATE` | `DD_TRACE_SAMPLE_RATE` | `DD_TRACE_SAMPLE_RATE`  |
| `tracing_rate_limit` | 非該当       | `DD_TRACE_RATE_LIMIT` | `DD_TRACE_RATE_LIMIT` | `DD_TRACE_RATE_LIMIT` |
| `tracing_tags` | `dd.tags` | `DD_TAGS` | `DD_TAGS` | `DD_TAGS` |
| `tracing_service_mapping` | `dd.service.mapping` | `DD_SERVICE_MAPPING` | `DD_TRACE_SERVICE_MAPPING` | `DD_SERVICE_MAPPING` |
| `tracing_agent_timeout` | `dd.trace.agent.timeout` |  非該当 | 非該当 | 非該当 |
| `tracing_header_tags` | `dd.trace.header.tags` |    非該当    | `DD_TRACE_HEADER_TAGS` | `DD_TRACE_HEADER_TAGS` |
| `tracing_partial_flush_min_spans` | `dd.trace.partial.flush.min.spans` | `DD_TRACE_PARTIAL_FLUSH_MIN_SPANS` | `DD_TRACE_PARTIAL_FLUSH_ENABLED ` | 非該当 |
| `tracing_debug` | `dd.trace.debug` | `DD_TRACE_DEBUG` | `DD_TRACE_DEBUG` | `DD_TRACE_DEBUG` |
| `tracing_log_level` | `datadog.slf4j.simpleLogger.defaultLogLevel` | `DD_TRACE_LOG_LEVEL` |   非該当    | 非該当 |

挿入構成に記載されていないトレーサーライブラリの構成オプションは、プロパティや環境変数を通して、通常の方法で使用することができます。

### 基本構成設定

構成ソースに `BASIC` を指定した場合、以下の YAML 設定と同等となります。

```yaml
---
version: 1
tracing_enabled: true
log_injection_enabled: true
health_metrics_enabled: true
runtime_metrics_enabled: true
tracing_sampling_rate: 1.0
tracing_rate_limit: 1
```

## サービスの起動

起動コマンドでプリロードライブラリの構成を指定し、サービスを起動します。

**Java アプリの例**:
```sh
DD_CONFIG_SOURCES=BASIC java -jar <SERVICE_1>.jar &
DD_CONFIG_SOURCES=LOCAL:/etc/<SERVICE_2>/config.yaml;BASIC java -jar <SERVICE_2>.jar &
```

**Node アプリの例**:
```sh
DD_CONFIG_SOURCES=BASIC node index.js &
DD_CONFIG_SOURCES=LOCAL:/etc/<SERVICE_2>/config.yaml;BASIC node index.js &
```

**.NET アプリの例**:
```sh
DD_CONFIG_SOURCES=BASIC dotnet <SERVICE_1>.dll &
DD_CONFIG_SOURCES=LOCAL:/etc/<SERVICE_2>/config.yaml;BASIC dotnet <SERVICE_2>.dll &
```
**Python アプリの例**:
```sh
DD_CONFIG_SOURCES=BASIC python <SERVICE_1>.py &
DD_CONFIG_SOURCES=LOCAL:/etc/<SERVICE_2>/config.yaml;BASIC python <SERVICE_2>.py &
```

アプリケーションを実行すると、テレメトリーデータが生成され、[APM のトレース][5]として見ることができます。


[1]: https://app.datadoghq.com/account/settings#agent/overview
[2]: /ja/agent/guide/agent-commands/?tab=agentv6v7#start-the-agent
[3]: https://learn.microsoft.com/en-us/dotnet/core/install/linux-ubuntu
[4]: /ja/tracing/trace_collection/library_config/
[5]: https://app.datadoghq.com/apm/traces
{{% /tab %}}

{{% tab "ホスト上の Agent、コンテナ内のアプリ" %}}

<div class="alert alert-info">ホストとコンテナ上のトレーシングライブラリ挿入はベータ版です。</a></div>


Agent がホスト上で実行しており、サービスがコンテナで実行している場合、Datadog はコンテナ作成を傍受し、Docker コンテナを構成することでトレーシングライブラリを挿入します。

新しく開始されたプロセスはすべて傍受され、指定されたインスツルメンテーションライブラリがサービスに挿入されます。

## 要件

- 最近の [Datadog Agent v7][1] のインストール
- [Docker Engine][2]

**注**: arm64 での挿入、Alpine Linux のコンテナイメージでの `musl` による挿入はサポートされていません。

## プリロードライブラリのインストール

1. [Agent が実行している][3]ことを確認します。

2. 次のコマンド セットのいずれかを使用してライブラリをインストールします。ここで、`<LANG>` は `java`、`js`、`dotnet`、`python` または `all` のいずれかです。

   **Ubuntu、Debian、またはその他の Debian ベースの Linux ディストリビューションの場合:**
   ```sh
   sudo apt-get update
   sudo apt-get install datadog-apm-inject datadog-apm-library-<LANG>
   ```
   **CentOS、RedHat、または yum/RPM を使用するその他のディストリビューションの場合:**
   ```sh
   sudo yum makecache
   sudo yum install datadog-apm-inject datadog-apm-library-<LANG>
   ```

3. コマンド `dd-host-container-install` を実行します。


## Docker 挿入の構成

`/etc/datadog-agent/inject/docker_config.yaml` を編集し、以下の挿入用の YAML 構成を追加します。

```yaml
---
config_sources: BASIC
library_inject: true
log_level: debug
output_paths:
- stderr
```

`config_sources`
: ライブラリ挿入のオン・オフを切り替え、構成が保存される場所をセミコロンで区切った順序付きリストで指定します。エラーにならずに戻ってきた最初の値が使用されます。構成は、構成ソースにまたがってマージされることはありません。有効な値は次のとおりです。
  - `BLOB:<URL>` - `<URL>` にある Blob ストア (S3 互換) から構成を読み込みます。
  - `LOCAL:<PATH>` - ローカルファイルシステム上の `<PATH>` にあるファイルから読み込みます。
  - `BASIC` - デフォルトのプロパティセットを使用し、追加の構成の検索を停止します。
  - `OFF` - デフォルト。挿入を行いません。<br>
`BLOB` または `LOCAL` の設定について詳しくは、[構成ソースの供給](#supplying-configuration-source-hc)を参照してください。

`library_inject`
: `false` に設定すると、ライブラリの挿入を完全に無効にすることができます。<br>
**デフォルト**: `true`

`log_level`
: 何が起こっているかについての詳細な情報をログに記録する場合は `debug` に、それよりもはるかに少ない情報をログに記録する場合は `info` に設定します。

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
    "service_language": "<LANG>",
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

または YAML として構成を提供します:
```yaml
---
version: 1
service_language: <LANG>
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

`service_language` に以下のいずれかの値を設定します。
- `java`
- `node`
- `dotnet`
- `python`

このコンフィギュレーションファイルでは、`version` の値は常に `1` です。これは、コンテンツのバージョンではなく、使用する構成スキーマのバージョンを指しています。

次の表は、挿入構成値が対応する[トレーシングライブラリ構成オプション][4]にどのように対応するかを示しています。

| 挿入可否 | Java トレーサー | NodeJS トレーサー | .NET トレーサー | Python トレーサー |
| --------- | ----------- | ------------- | ----------- | ------------- |
| `tracing_enabled` | `dd.trace.enabled` | `DD_TRACE_ENABLED` | `DD_TRACE_ENABLED` |  `DD_TRACE_ENABLED` |
| `log_injection_enabled` | `dd.logs.injection` | `DD_LOGS_INJECTION` | `DD_LOGS_INJECTION` |  `DD_LOGS_INJECTION` |
| `health_metrics_enabled` | `dd.trace.health.metrics.enabled` |    非該当   |    非該当  | 非該当 |
| `runtime_metrics_enabled` | `dd.jmxfetch.enabled` | `DD_RUNTIME_METRICS_ENABLED` | `DD_RUNTIME_METRICS_ENABLED` | `DD_RUNTIME_METRICS_ENABLED` |
| `tracing_sampling_rate` | `dd.trace.sample.rate` | `DD_TRACE_SAMPLE_RATE` | `DD_TRACE_SAMPLE_RATE` | `DD_TRACE_SAMPLE_RATE`  |
| `tracing_rate_limit` | 非該当       | `DD_TRACE_RATE_LIMIT` | `DD_TRACE_RATE_LIMIT` | `DD_TRACE_RATE_LIMIT` |
| `tracing_tags` | `dd.tags` | `DD_TAGS` | `DD_TAGS` | `DD_TAGS` |
| `tracing_service_mapping` | `dd.service.mapping` | `DD_SERVICE_MAPPING` | `DD_TRACE_SERVICE_MAPPING` | `DD_SERVICE_MAPPING` |
| `tracing_agent_timeout` | `dd.trace.agent.timeout` |  非該当 | 非該当 | 非該当 |
| `tracing_header_tags` | `dd.trace.header.tags` |    非該当    | `DD_TRACE_HEADER_TAGS` | `DD_TRACE_HEADER_TAGS` |
| `tracing_partial_flush_min_spans` | `dd.trace.partial.flush.min.spans` | `DD_TRACE_PARTIAL_FLUSH_MIN_SPANS` | `DD_TRACE_PARTIAL_FLUSH_ENABLED ` | 非該当 |
| `tracing_debug` | `dd.trace.debug` | `DD_TRACE_DEBUG` | `DD_TRACE_DEBUG` | `DD_TRACE_DEBUG` |
| `tracing_log_level` | `datadog.slf4j.simpleLogger.defaultLogLevel` | `DD_TRACE_LOG_LEVEL` |   非該当    | 非該当 |

挿入構成に記載されていないトレーサーライブラリの構成オプションは、プロパティや環境変数を通して、通常の方法で使用することができます。

### 基本構成設定

構成ソースに `BASIC` を指定した場合、以下の YAML 設定と同等となります。

```yaml
---
version: 1
tracing_enabled: true
log_injection_enabled: true
health_metrics_enabled: true
runtime_metrics_enabled: true
tracing_sampling_rate: 1.0
tracing_rate_limit: 1
```

## コンテナへの統合サービスタグ付けの指定

環境変数 `DD_ENV`、`DD_SERVICE`、`DD_VERSION` がサービスコンテナイメージで指定されている場合、それらの値はコンテナからのテレメトリーにタグ付けするために使用されます。

指定がない場合は、`DD_ENV` は `/etc/datadog-agent/inject/docker_config.yaml` コンフィギュレーションファイルに設定されている `env` 値を使用します (もしある場合)。`DD_SERVICE` と `DD_VERSION` は、Docker イメージの名前から取得します。`my-service:1.0` という名前のイメージは、`DD_SERVICE` が `my-service` で、 `DD_VERSION` が `1.0` でタグ付けされています。

## サービスの起動

Agent を起動し、通常通りコンテナ化されたサービスを起動します。

アプリケーションを実行すると、テレメトリーデータが生成され、[APM のトレース][5]として見ることができます。



[1]: https://app.datadoghq.com/account/settings#agent/overview
[2]: https://docs.docker.com/engine/install/ubuntu/
[3]: /ja/agent/guide/agent-commands/?tab=agentv6v7#start-the-agent
[4]: /ja/tracing/trace_collection/library_config/
[5]: https://app.datadoghq.com/apm/traces
{{% /tab %}}

{{% tab "別々のコンテナ内の Agent とアプリ" %}}

<div class="alert alert-info">コンテナ内のトレーシングライブラリ挿入はベータ版です。</a></div>

Agent とサービスが同じホストの別々の Datadog コンテナで実行している場合、Datadog はコンテナ作成を傍受し、Docker コンテナを構成することでトレーシングライブラリを挿入します。

新しく開始されたプロセスはすべて傍受され、指定されたインスツルメンテーションライブラリがサービスに挿入されます。

## 要件

- [Docker Engine][1]

**注**: arm64 での挿入、Alpine Linux のコンテナイメージでの `musl` による挿入はサポートされていません。

## プリロードライブラリのインストール

**Ubuntu、Debian、またはその他の Debian ベースの Linux ディストリビューションの場合:**

1. Datadog の deb リポジトリをシステムにセットアップし、Datadog のアーカイブキーリングを作成します。
   ```sh
   sudo sh -c "echo 'deb [signed-by=/usr/share/keyrings/datadog-archive-keyring.gpg] https://apt.datadoghq.com/ stable 7' > /etc/apt/sources.list.d/datadog.list"
   sudo touch /usr/share/keyrings/datadog-archive-keyring.gpg
   sudo chmod a+r /usr/share/keyrings/datadog-archive-keyring.gpg

   curl https://keys.datadoghq.com/DATADOG_APT_KEY_CURRENT.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
   curl https://keys.datadoghq.com/DATADOG_APT_KEY_382E94DE.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
   curl https://keys.datadoghq.com/DATADOG_APT_KEY_F14F620E.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
   ```
2. ローカルの apt リポジトリを更新し、ライブラリをインストールします。
   ```sh
   sudo apt-get update
   sudo apt-get install datadog-apm-inject datadog-apm-library-<LANG>
   ```
   ここで `<LANG>` は `java`、`js`、`dotnet`、`python` または `all` のいずれかです。

3. コマンド `dd-container-install` を実行します。

**CentOS、RedHat、または yum/RPM を使用するその他のディストリビューションの場合:**

1. 以下の内容で `/etc/yum.repos.d/datadog.repo` と呼ばれるファイルを作成して、システム上に Datadog の Yum リポジトリをセットアップします。
   ```
   [datadog]
   name = Datadog, Inc.
   baseurl = https://yum.datadoghq.com/stable/7/x86_64/
   enabled=1
   gpgcheck=1
   repo_gpgcheck=1
   gpgkey=https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public https://keys.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public
   ```
   **注**: [dnf のバグ][2]により、RedHat/CentOS 8.1 では `1` の代わりに `repo_gpgcheck=0` を設定してください。

2. yum キャッシュを更新して、ライブラリをインストールします。
   ```sh
   sudo yum makecache
   sudo yum install datadog-apm-inject datadog-apm-library-<LANG>
   ```
   ここで `<LANG>` は `java`、`js`、`dotnet`、`python` または `all` のいずれかです。

3. コマンド `dd-container-install` を実行します。

## Docker 挿入の構成

`/etc/datadog-agent/inject/docker_config.yaml` を編集し、以下の挿入用の YAML 構成を追加します。

```yaml
---
library_inject: true
log_level: debug
output_paths:
- stderr
config_sources: BASIC
```

`config_sources`
: ライブラリ挿入のオン・オフを切り替え、構成が保存される場所をセミコロンで区切った順序付きリストで指定します。エラーにならずに戻ってきた最初の値が使用されます。構成は、構成ソースにまたがってマージされることはありません。有効な値は次のとおりです。
  - `BLOB:<URL>` - `<URL>` にある Blob ストア (S3 互換) から構成を読み込みます。
  - `LOCAL:<PATH>` - ローカルファイルシステム上の `<PATH>` にあるファイルから読み込みます。
  - `BASIC` - デフォルトのプロパティセットを使用し、追加の構成の検索を停止します。
  - `OFF` - デフォルト。挿入を行いません。<br>
`BLOB` または `LOCAL` の設定について詳しくは、[構成ソースの供給](#supplying-configuration-source-c)を参照してください。

`library_inject`
: `false` に設定すると、ライブラリの挿入を完全に無効にすることができます。<br>
**デフォルト**: `true`

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
    "service_language": "<LANG>",
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

または YAML として構成を提供します:
```yaml
---
version: 1
service_language: <LANG>
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

`service_language` に以下のいずれかの値を設定します。
- `java`
- `node`
- `dotnet`
- `python`

このコンフィギュレーションファイルでは、`version` の値は常に `1` です。これは、コンテンツのバージョンではなく、使用する構成スキーマのバージョンを指しています。

次の表は、挿入構成値が対応する[トレーシングライブラリ構成オプション][3]にどのように対応するかを示しています。

| 挿入可否 | Java トレーサー | NodeJS トレーサー | .NET トレーサー | Python トレーサー |
| --------- | ----------- | ------------- | ----------- | ------------- |
| `tracing_enabled` | `dd.trace.enabled` | `DD_TRACE_ENABLED` | `DD_TRACE_ENABLED` |  `DD_TRACE_ENABLED` |
| `log_injection_enabled` | `dd.logs.injection` | `DD_LOGS_INJECTION` | `DD_LOGS_INJECTION` |  `DD_LOGS_INJECTION` |
| `health_metrics_enabled` | `dd.trace.health.metrics.enabled` |    非該当   |    非該当  | 非該当 |
| `runtime_metrics_enabled` | `dd.jmxfetch.enabled` | `DD_RUNTIME_METRICS_ENABLED` | `DD_RUNTIME_METRICS_ENABLED` | `DD_RUNTIME_METRICS_ENABLED` |
| `tracing_sampling_rate` | `dd.trace.sample.rate` | `DD_TRACE_SAMPLE_RATE` | `DD_TRACE_SAMPLE_RATE` | `DD_TRACE_SAMPLE_RATE`  |
| `tracing_rate_limit` | 非該当       | `DD_TRACE_RATE_LIMIT` | `DD_TRACE_RATE_LIMIT` | `DD_TRACE_RATE_LIMIT` |
| `tracing_tags` | `dd.tags` | `DD_TAGS` | `DD_TAGS` | `DD_TAGS` |
| `tracing_service_mapping` | `dd.service.mapping` | `DD_SERVICE_MAPPING` | `DD_TRACE_SERVICE_MAPPING` | `DD_SERVICE_MAPPING` |
| `tracing_agent_timeout` | `dd.trace.agent.timeout` |  非該当 | 非該当 | 非該当 |
| `tracing_header_tags` | `dd.trace.header.tags` |    非該当    | `DD_TRACE_HEADER_TAGS` | `DD_TRACE_HEADER_TAGS` |
| `tracing_partial_flush_min_spans` | `dd.trace.partial.flush.min.spans` | `DD_TRACE_PARTIAL_FLUSH_MIN_SPANS` | `DD_TRACE_PARTIAL_FLUSH_ENABLED ` | 非該当 |
| `tracing_debug` | `dd.trace.debug` | `DD_TRACE_DEBUG` | `DD_TRACE_DEBUG` | `DD_TRACE_DEBUG` |
| `tracing_log_level` | `datadog.slf4j.simpleLogger.defaultLogLevel` | `DD_TRACE_LOG_LEVEL` |   非該当    | 非該当 |

挿入構成に記載されていないトレーサーライブラリの構成オプションは、プロパティや環境変数を通して、通常の方法で使用することができます。

### 基本構成設定

構成ソースに `BASIC` を指定した場合、以下の YAML 設定と同等となります。

```yaml
---
version: 1
tracing_enabled: true
log_injection_enabled: true
health_metrics_enabled: true
runtime_metrics_enabled: true
tracing_sampling_rate: 1.0
tracing_rate_limit: 1
```

## Agent の構成

コンテナを起動する Docker コンポーズファイルでは、Agent に以下の設定を使用し、`${DD_API_KEY}` に自分の Datadog API キーをしっかり設定します。

```yaml
    container_name: dd-agent
    image: datadog/agent:7
    environment:
      - DD_API_KEY=${DD_API_KEY}
      - DD_APM_ENABLED=true
      - DD_APM_NON_LOCAL_TRAFFIC=true
      - DD_LOG_LEVEL=TRACE
      - DD_DOGSTATSD_NON_LOCAL_TRAFFIC=true
      - DD_AC_EXCLUDE=name:datadog-agent
      - DD_SYSTEM_PROBE_ENABLED=true
      - DD_PROCESS_AGENT_ENABLED=true
      - DD_APM_RECEIVER_SOCKET=/opt/datadog/apm/inject/run/apm.socket
    volumes:
      - /opt/datadog/apm:/opt/datadog/apm
      - /var/run/docker.sock:/var/run/docker.sock:ro
      - /proc/:/host/proc/:ro
      - /sys/fs/cgroup/:/host/sys/fs/cgroup:ro
      - /sys/kernel/debug:/sys/kernel/debug
    cap_add:
      - SYS_ADMIN
      - SYS_RESOURCE
      - SYS_PTRACE
      - NET_ADMIN
      - NET_BROADCAST
      - NET_RAW
      - IPC_LOCK
      - CHOWN
    security_opt:
      - apparmor:unconfined
```

## コンテナへの統合サービスタグ付けの指定

環境変数 `DD_ENV`、`DD_SERVICE`、`DD_VERSION` がサービスコンテナイメージで指定されている場合、それらの値はコンテナからのテレメトリーにタグ付けするために使用されます。

指定がない場合は、`DD_ENV` は `/etc/datadog-agent/inject/docker_config.yaml` コンフィギュレーションファイルに設定されている `env` 値を使用します (もしある場合)。`DD_SERVICE` と `DD_VERSION` は、Docker イメージの名前から取得します。`my-service:1.0` という名前のイメージは、`DD_SERVICE` が `my-service` で、 `DD_VERSION` が `1.0` でタグ付けされています。

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
{{% /tab %}}


{{< /tabs >}}


## ライブラリの構成

トレーシングライブラリのサポートされる機能や構成オプションは、他のインストール方法と同様に、ライブラリ挿入でも環境変数で設定することが可能です。詳しくは、お使いの言語の [Datadog ライブラリの構成ページ][2]をお読みください。

例えば、[Application Security Monitoring][3] や [Continuous Profiler][4] をオンにすることができ、それぞれ請求の影響が出る可能性があります。

- **Kubernetes** の場合は、`DD_APPSEC_ENABLED` または `DD_PROFILING_ENABLED` コンテナ環境変数に `true` を設定します。

- **ホストとコンテナ**の場合は、`DD_APPSEC_ENABLED` または `DD_PROFILING_ENABLED` コンテナ環境変数を `true` に設定するか、[挿入構成](#supplying-configuration-source)で次の YAML 例のように `additional_environment_variables` セクションを指定します。

  ```yaml
  additional_environment_variables:
  - key: DD_PROFILING_ENABLED
    value: true
  - key: DD_APPSEC_ENABLED
    value: true
  ```

  挿入構成ソースの `additional_environment_variables` セクションに設定できるのは、`DD_` で始まる構成キーのみです。


[1]: /ja/tracing/trace_collection/
[2]: /ja/tracing/trace_collection/library_config/
[3]: /ja/security/application_security/enabling/java/?tab=kubernetes#get-started
[4]: /ja/profiler/enabling/java/?tab=environmentvariables#installation
[5]: /ja/tracing/trace_collection/library_injection_remote/
