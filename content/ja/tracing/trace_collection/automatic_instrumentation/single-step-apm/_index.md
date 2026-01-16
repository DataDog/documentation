---
aliases:
- /ja/tracing/trace_collection/single-step-apm
further_reading:
- link: /tracing/metrics/runtime_metrics/
  tag: ドキュメント
  text: ランタイムメトリクスを有効にする
title: シングルステップ APM インスツルメンテーション
---
## 概要

Single Step Instrumentation (SSI) for APM は、Datadog Agent をインストールし、[アプリケーションをインスツルメント][4] する手順を 1 ステップにまとめたものです。追加の設定ステップは不要です。

## 互換性

対応する言語、オペレーティングシステム、アーキテクチャの要件については、[Single Step Instrumentation の互換性][6]を参照してください。

## アプリケーションで APM を有効化する

**Enable APM Instrumentation** オプションを選択して [Datadog Agent をインストールまたは更新][1]すると、APM を有効にするように Agent がインストールおよび構成されます。これにより、追加のインストールや構成手順なしでアプリケーションが自動的にインスツルメントされます。

以下の例は、それぞれのデプロイメントタイプでどのように動作するかを示します。

{{< tabs >}}
{{% tab "Linux ホストまたは VM" %}}

<div class="alert alert-danger">以前に Linux ホストで Single Step Instrumentation を使用していた場合は、<a href="/tracing/trace_collection/automatic_instrumentation/ssi-0-13-1">最新バージョンにアップデート</a>してください。</div>

Ubuntu ホストの場合

1. 1 行のインストールコマンドを実行します。

   ```shell
   DD_API_KEY=<YOUR_DD_API_KEY> DD_SITE="<YOUR_DD_SITE>" DD_APM_INSTRUMENTATION_ENABLED=host DD_APM_INSTRUMENTATION_LIBRARIES="java:1,python:3,js:5,dotnet:3" DD_ENV=<AGENT_ENV> bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
   ```

   `<YOUR_DD_API_KEY>` をお使いの [Datadog API キー][4]に、`<YOUR_DD_SITE>` をお使いの [Datadog サイト][3]に、`<AGENT_ENV>` を Agent がインストールされる環境 (例: `staging`) に置き換えてください。
   <div class="alert alert-info">その他のオプションについては、<a href=#advanced-options>高度なオプション</a>をご覧ください。</div>
2. 新しいシェルセッションを開始します。
3. ホストまたは VM 上のサービスを再起動します。

[3]: /ja/getting_started/site/
[4]: https://app.datadoghq.com/organization-settings/api-keys
[5]: /ja/tracing/service_catalog/
[7]: https://github.com/DataDog/dd-trace-java/releases
[8]: https://github.com/DataDog/dd-trace-js/releases
[9]: https://github.com/DataDog/dd-trace-py/releases
[10]: https://github.com/DataDog/dd-trace-dotnet/releases
[11]: https://github.com/DataDog/dd-trace-rb/releases

{{% /tab %}}

{{% tab "Docker" %}}

Docker Linux コンテナの場合

1. 1 行のインストールコマンドを実行します。
   ```shell
   DD_APM_INSTRUMENTATION_ENABLED=docker DD_APM_INSTRUMENTATION_LIBRARIES="java:1,python:3,js:5,dotnet:3" DD_NO_AGENT_INSTALL=true bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
   ```
2. Docker で Agent を構成します。
   ```shell
   docker run -d --name dd-agent \
     -e DD_API_KEY=<YOUR_DD_API_KEY> \
     -e DD_APM_ENABLED=true \
     -e DD_ENV=<AGENT_ENV> \
     -e DD_APM_NON_LOCAL_TRAFFIC=true \
     -e DD_DOGSTATSD_NON_LOCAL_TRAFFIC=true \
     -e DD_APM_RECEIVER_SOCKET=/var/run/datadog/apm.socket \
     -e DD_DOGSTATSD_SOCKET=/var/run/datadog/dsd.socket \
     -v /var/run/datadog:/var/run/datadog \
     -v /var/run/docker.sock:/var/run/docker.sock:ro \
     gcr.io/datadoghq/agent:7
   ```
   `<YOUR_DD_API_KEY>` をお使いの [Datadog API キー][5]に、`<AGENT_ENV>` を Agent がインストールされる環境 (例: `staging`) に置き換えてください。
   <div class="alert alert-info">その他のオプションについては、<a href=#advanced-options>高度なオプション</a>をご覧ください。</div>
3. Docker コンテナを再起動します。
4. [Datadog でサービスのパフォーマンス可観測性を調べます][6]。

[5]: https://app.datadoghq.com/organization-settings/api-keys
[6]: /ja/tracing/service_catalog/

{{% /tab %}}

{{% tab "Kubernetes (プレビュー)" %}}

Datadog Agent を以下のいずれかの方法でインストールすることで APM を有効にできます、

- Datadog Operator
- Datadog Helm chart

<div class="alert alert-info">Single Step Instrumentation は、Datadog Agent をインストールしたネームスペース内のアプリケーションをインスツルメントしません。アプリケーションを実行しない別のネームスペースを作成し、そこに Datadog Agent をインストールすることが推奨されます。</div>

### 要件

- Kubernetes v1.20+
- [`Helm`][1] (Datadog Operator をデプロイするため)
- [`Kubectl` CLI][2] (Datadog Agent をインストールするため)

{{< collapse-content title="Datadog Operator によるインストール" level="h4" >}}
Datadog Operator を使用してクラスター全体で Single Step Instrumentation を有効にする手順です。これにより、対応言語で書かれたクラスター内のすべてのアプリケーションのトレースが自動的に送信されます。

Datadog Operator で Single Step Instrumentation を有効にするには

1. Datadog Operator v1.5.0+ を Helm で[インストール][36]します。
   ```shell
   helm repo add datadog https://helm.datadoghq.com
   helm repo update
   helm install my-datadog-operator datadog/datadog-operator
   ```
2. お使いの Datadog [API キー][10]を保存する Kubernetes シークレットを作成します。
   ```shell
   kubectl create secret generic datadog-secret --from-literal api-key=$DD_API_KEY
   ```
3. Datadog Agent のデプロイ構成を含む `datadog-agent.yaml` を作成します。もっとも簡単な設定は以下のとおりです。
   ```yaml
   apiVersion: datadoghq.com/v2alpha1
   kind: DatadogAgent
   metadata:
     name: datadog
   spec:
     global:
       site: <DATADOG_SITE>
       tags:
         - env:<AGENT_ENV>
       credentials:
         apiSecret:
           secretName: datadog-secret
           keyName: api-key
     features:
       apm:
         instrumentation:
           enabled: true
           libVersions:
             java: "1"
             dotnet: "3"
             python: "2"
             js: "5"
   ```
   `<DATADOG_SITE>` をお使いの [Datadog サイト][12]に、`<AGENT_ENV>` を Agent がインストールされる環境 (例: `env:staging`) に置き換えてください。
   <div class="alert alert-info">その他のオプションについては、<a href=#advanced-options>高度なオプション</a>をご覧ください。</div>

4. 次のコマンドを実行します。
   ```shell
   kubectl apply -f /path/to/your/datadog-agent.yaml
   ```
5. Datadog Cluster Agent の変更が反映されるまで数分待ってから、アプリケーションを再起動します。
{{< /collapse-content >}}

{{< collapse-content title="Helm によるインストール" level="h4" >}}
Helm を使用してクラスター全体で Single Step Instrumentation を有効にする手順です。これにより、対応言語で書かれたクラスター内のすべてのアプリケーションのトレースが自動的に送信されます。

Helm で Single Step Instrumentation を有効にするには

1. Helm Datadog リポジトリを追加します。
   ```shell
    helm repo add datadog https://helm.datadoghq.com
    helm repo update
    ```
2. お使いの Datadog [API キー][10]を保存する Kubernetes シークレットを作成します。
   ```shell
   kubectl create secret generic datadog-secret --from-literal api-key=$DD_API_KEY
   ```
3. `datadog-values.yaml` を作成し、以下の構成を追加します。
   ```
   datadog:
    apiKeyExistingSecret: datadog-secret
    site: <DATADOG_SITE>
    tags:
         - env:<AGENT_ENV>
    apm:
      instrumentation:
         enabled: true
         libVersions:
            java: "1"
            dotnet: "3"
            python: "2"
            js: "5"
   ```
   `<DATADOG_SITE>` をお使いの [Datadog サイト][12]に、`<AGENT_ENV>` を Agent がインストールされる環境 (例: `env:staging`) に置き換えてください。

   <div class="alert alert-info">その他のオプションについては、<a href=#advanced-options>高度なオプション</a>をご覧ください。</div>

4. 次のコマンドを実行します。
   ```shell
   helm install datadog-agent -f datadog-values.yaml datadog/datadog
   ```
5. Datadog Cluster Agent の変更が反映されるまで数分待ってから、アプリケーションを再起動します。

{{< /collapse-content >}}

[1]: https://v3.helm.sh/docs/intro/install/
[2]: https://kubernetes.io/docs/tasks/tools/install-kubectl/
[9]: https://github.com/DataDog/helm-charts/tree/master/charts/datadog-operator
[10]: https://app.datadoghq.com/organization-settings/api-keys
[11]: https://app.datadoghq.com/organization-settings/application-keys
[12]: /ja/getting_started/site
[13]: https://v3.helm.sh/docs/intro/install/
[36]: https://github.com/DataDog/helm-charts/tree/master/charts/datadog-operator

{{% /tab %}}
{{< /tabs >}}

これらの手順を完了した後、[ランタイムメトリクス][2]を有効にしたり、[Service Catalog][3] でアプリケーションの可観測性データを確認したりすることができます。

## 高度なオプション

ワンラインのインストールコマンドを実行するとき、いくつかのオプションでカスタマイズが可能です。

{{< tabs >}}
{{% tab "Linux ホストまたは VM" %}}

### `DD_APM_INSTRUMENTATION_LIBRARIES` - APM ライブラリのカスタマイズ

`DD_APM_INSTRUMENTATION_ENABLED` が設定されている場合、デフォルトでは Java、Python、Ruby、Node.js、.NET Core の Datadog APM ライブラリがインストールされます。`DD_APM_INSTRUMENTATION_LIBRARIES` は、インストールするライブラリを上書きするために使用されます。値は、コロンで区切られたライブラリ名とバージョンのペアをカンマ区切りで並べた文字列です。

`DD_APM_INSTRUMENTATION_LIBRARIES` の例:

- `DD_APM_INSTRUMENTATION_LIBRARIES="java:1"` - Java の Datadog APM ライブラリのみを、メジャーバージョン 1 のリリースラインに固定してインストールします。
- `DD_APM_INSTRUMENTATION_LIBRARIES="java:1,python:3"` - Java と Python の Datadog APM ライブラリのみを、メジャーバージョンをそれぞれ 1 と 3 に固定してインストールします。
- `DD_APM_INSTRUMENTATION_LIBRARIES="java:1.38.0,python:2.10.5"` - Java と Python の Datadog APM ライブラリのみを、それぞれ特定のバージョン 1.38.0 と 2.10.5 に固定してインストールします。


利用可能なバージョンは、各言語のソースリポジトリに一覧があります。

- [Java][8] (`java`)
- [Node.js][9] (`js`)
- [Python][10] (`python`)
- [.NET][11] (`dotnet`)
- [Ruby][12] (`ruby`)


[2]: /ja/agent/remote_config
[6]: https://github.com/DataDog/dd-trace-js?tab=readme-ov-file#version-release-lines-and-maintenance
[8]: https://github.com/DataDog/dd-trace-java/releases
[9]: https://github.com/DataDog/dd-trace-js/releases
[10]: https://github.com/DataDog/dd-trace-py/releases
[11]: https://github.com/DataDog/dd-trace-dotnet/releases
[12]: https://github.com/DataDog/dd-trace-rb/releases

{{% /tab %}}

{{% tab "Docker" %}}


### `DD_APM_INSTRUMENTATION_LIBRARIES` - APM ライブラリのカスタマイズ

`DD_APM_INSTRUMENTATION_ENABLED` が設定されている場合、デフォルトでは Java、Python、Ruby、Node.js、.NET Core の Datadog APM ライブラリがインストールされます。`DD_APM_INSTRUMENTATION_LIBRARIES` は、インストールするライブラリを上書きするために使用されます。値は、コロンで区切られたライブラリ名とバージョンのペアをカンマ区切りで並べた文字列です。

`DD_APM_INSTRUMENTATION_LIBRARIES` の例:

- `DD_APM_INSTRUMENTATION_LIBRARIES="java:1"` - Java の Datadog APM ライブラリのみを、メジャーバージョン 1 のリリースラインに固定してインストールします。
- `DD_APM_INSTRUMENTATION_LIBRARIES="java:1,python:3"` - Java と Python の Datadog APM ライブラリのみを、メジャーバージョンをそれぞれ 1 と 3 に固定してインストールします。
- `DD_APM_INSTRUMENTATION_LIBRARIES="java:1.38.0,python:2.10.5"` - Java と Python の Datadog APM ライブラリのみを、それぞれ特定のバージョン 1.38.0 と 2.10.5 に固定してインストールします。


利用可能なバージョンは、各言語のソースリポジトリに一覧があります:

- [Java][8] (`java`)
- [Node.js][9] (`js`)
- [Python][10] (`python`)
- [.NET][11] (`dotnet`)
- [Ruby][12] (`ruby`)


[5]: https://app.datadoghq.com/organization-settings/api-keys
[7]: https://github.com/DataDog/dd-trace-js?tab=readme-ov-file#version-release-lines-and-maintenance
[8]: https://github.com/DataDog/dd-trace-java/releases
[9]: https://github.com/DataDog/dd-trace-js/releases
[10]: https://github.com/DataDog/dd-trace-py/releases
[11]: https://github.com/DataDog/dd-trace-dotnet/releases
[12]: https://github.com/DataDog/dd-trace-rb/releases

{{% /tab %}}

{{% tab "Kubernetes (プレビュー)" %}}

### ネームスペース単位でインスツルメンテーションを有効/無効にする

特定のネームスペース内のアプリケーションに対して、インスツルメンテーションを有効または無効にできます。enabledNamespaces と disabledNamespaces は同時に設定できません。

どのファイルを編集するかは、Datadog Operator か Helm で Single Step Instrumentation を有効にしたかによって異なります。

{{< collapse-content title="Datadog Operator" level="h4" >}}

特定のネームスペースでインスツルメンテーションを有効にするには、`datadog-agent.yaml` に `enabledNamespaces` を構成します。

{{< highlight yaml "hl_lines=5-7" >}}
   features:
     apm:
       instrumentation:
         enabled: true
         enabledNamespaces: # インスツルメントを有効にするネームスペースを追加
           - default
           - applications
{{< /highlight >}}

特定のネームスペースでインスツルメンテーションを無効にするには、`datadog-agent.yaml` に `disabledNamespaces` を構成します。

{{< highlight yaml "hl_lines=5-7" >}}
   features:
     apm:
       instrumentation:
         enabled: true
         disabledNamespaces: # インスツルメンテーションを無効にするネームスペースを追加
           - default
           - applications
{{< /highlight >}}

{{< /collapse-content >}}

{{< collapse-content title="Helm" level="h4" >}}

特定のネームスペースでインスツルメンテーションを有効にするには、`datadog-values.yaml` に `enabledNamespaces` を構成します。

{{< highlight yaml "hl_lines=5-7" >}}
   datadog:
      apm:
        instrumentation:
          enabled: true
          enabledNamespaces: # インスツルメントを有効にするネームスペースを追加
             - namespace_1
             - namespace_2
{{< /highlight >}}

特定のネームスペースでインスツルメンテーションを無効にするには、`datadog-values.yaml` に `disabledNamespaces` を構成します。

{{< highlight yaml "hl_lines=5-7" >}}
   datadog:
      apm:
        instrumentation:
          enabled: true
          disabledNamespaces: # インスツルメンテーションを無効にするネームスペースを追加
            - namespace_1
            - namespace_2
{{< /highlight >}}

{{< /collapse-content >}}

### トレースライブラリバージョンの指定

<div class="alert alert-info">Datadog Cluster Agent v7.52.0+ 以降では、指定したトレースライブラリに基づいて、一部のアプリケーションのみを自動的にインスツルメントできます。</div>

アプリケーションが使用する言語に対応する Datadog のトレースライブラリとそのバージョンを指定すると、その言語で書かれたアプリケーションを自動的にインスツルメントできます。構成方法は以下の 2 つがあり、優先順位は次の順序で適用されます。

1. [サービスレベルで指定](#specifying-at-the-service-level)、または
2. [クラスターレベルで指定](#specifying-at-the-cluster-level)

**デフォルト**: もしライブラリバージョンを一切指定せずに `apm.instrumentation.enabled=true` を設定した場合、サポートされている言語で書かれたアプリケーションは、最新のトレースライブラリバージョンを使用して自動的にインスツルメントされます。

#### サービスレベルでの指定

特定のポッドで動作するアプリケーションを自動的にインスツルメントするには、ポッドの spec にアプリケーション対応の言語アノテーションとライブラリバージョンを追加してください。

| 言語   | ポッドアノテーション                                                        |
|------------|-----------------------------------------------------------------------|
| Java       | `admission.datadoghq.com/java-lib.version: "<CONTAINER IMAGE TAG>"`   |
| Node.js    | `admission.datadoghq.com/js-lib.version: "<CONTAINER IMAGE TAG>"`     |
| Python     | `admission.datadoghq.com/python-lib.version: "<CONTAINER IMAGE TAG>"` |
| .NET       | `admission.datadoghq.com/dotnet-lib.version: "<CONTAINER IMAGE TAG>"` |
| Ruby       | `admission.datadoghq.com/ruby-lib.version: "<CONTAINER IMAGE TAG>"`   |

`<CONTAINER IMAGE TAG>` を、使用したいライブラリのバージョンに置き換えてください。利用可能なバージョンは、[Datadog コンテナレジストリ](#container-registries)と各言語のトレーサーのソースリポジトリに掲載されています。

- [Java][31]
- [Node.js][32]
- [Python][33]
- [.NET][34]
- [Ruby][35]

<div class="alert alert-danger">major バージョンのライブラリリリースでは後方互換性が壊れる変更が含まれる場合があるため、<code>latest</code> タグを使用する際は注意してください。</div>

例えば、Java アプリケーションを自動的にインスツルメントする場合は以下のようになります。

{{< highlight yaml "hl_lines=10" >}}
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    # ...
spec:
  template:
    metadata:
      annotations:
        admission.datadoghq.com/java-lib.version: "<CONTAINER IMAGE TAG>"
    spec:
      containers:
        - # ...
{{< /highlight >}}

#### クラスターレベルでの指定

ポッドごとにアノテーションを用いて自動インスツルメントを有効にしない場合は、Single Step Instrumentation の構成を使ってクラスター全体でどの言語をインスツルメントするか指定できます。`apm.instrumentation.libVersions` が設定されている場合、指定した言語のアプリケーションのみ、指定したライブラリバージョンでインスツルメントされます。

どのファイルを構成するかは、Datadog Operator か Helm を使って Single Step Instrumentation を有効にしたかによって異なります。

{{< collapse-content title="Datadog Operator" level="h4" >}}

例えば、.NET、Python、Node.js アプリケーションをインスツルメントする場合は、`datadog-agent.yaml` ファイルに以下の構成を追加します。

{{< highlight yaml "hl_lines=5-8" >}}
   features:
     apm:
       instrumentation:
         enabled: true
         libVersions: # 設定したいライブラリとバージョンを追加
            dotnet: "3.2.0"
            python: "1.20.6"
            js: "4.17.0"
{{< /highlight >}}

{{< /collapse-content >}}

{{< collapse-content title="Helm" level="h4" >}}

例えば、.NET、Python、Node.js アプリケーションをインスツルメントする場合は、`datadog-values.yaml` ファイルに以下の構成を追加します。

{{< highlight yaml "hl_lines=5-8" >}}
   datadog:
     apm:
       instrumentation:
         enabled: true
         libVersions: # 設定したいライブラリとバージョンを追加
            dotnet: "3.2.0"
            python: "1.20.6"
            js: "4.17.0"
{{< /highlight >}}

{{< /collapse-content >}}


#### コンテナレジストリ

Datadog は、以下の gcr.io、Docker Hub、Amazon ECR にインスツルメンテーションライブラリのイメージを公開しています。

| 言語   | gcr.io                              | hub.docker.com                              | gallery.ecr.aws                            |
|------------|-------------------------------------|---------------------------------------------|-------------------------------------------|
| Java       | [gcr.io/datadoghq/dd-lib-java-init][15]   | [hub.docker.com/r/datadog/dd-lib-java-init][16]   | [gallery.ecr.aws/datadog/dd-lib-java-init][17]   |
| Node.js  | [gcr.io/datadoghq/dd-lib-js-init][18]     | [hub.docker.com/r/datadog/dd-lib-js-init][19]     | [gallery.ecr.aws/datadog/dd-lib-js-init][20]     |
| Python     | [gcr.io/datadoghq/dd-lib-python-init][21] | [hub.docker.com/r/datadog/dd-lib-python-init][22] | [gallery.ecr.aws/datadog/dd-lib-python-init][23] |
| .NET       | [gcr.io/datadoghq/dd-lib-dotnet-init][24] | [hub.docker.com/r/datadog/dd-lib-dotnet-init][25] | [gallery.ecr.aws/datadog/dd-lib-dotnet-init][26] |
| Ruby       | [gcr.io/datadoghq/dd-lib-ruby-init][27] | [hub.docker.com/r/datadog/dd-lib-ruby-init][28] | [gallery.ecr.aws/datadog/dd-lib-ruby-init][29] |

Datadog Cluster Agent の構成にある `DD_ADMISSION_CONTROLLER_AUTO_INSTRUMENTATION_CONTAINER_REGISTRY` 環境変数は、Admission Controller が使用するレジストリを指定します。デフォルト値は、`gcr.io/datadoghq` です。

ローカルコンテナレジストリでイメージをホストしている場合は、`docker.io/datadog`、`public.ecr.aws/datadog`、または他の URL に変更することで、別のレジストリからトレーシングライブラリを引き出すことができます。

コンテナレジストリを変更する手順については、[コンテナレジストリの変更][30]を参照してください。

[1]: https://helm.sh/
[2]: https://kubernetes.io/docs/tasks/tools/
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: /ja/getting_started/site/
[5]: https://github.com/DataDog/helm-charts/tree/master/charts/datadog-operator
[6]: /ja/getting_started/site
[15]: http://gcr.io/datadoghq/dd-lib-java-init
[16]: http://hub.docker.com/r/datadog/dd-lib-java-init
[17]: http://gallery.ecr.aws/datadog/dd-lib-java-init
[18]: http://gcr.io/datadoghq/dd-lib-js-init
[19]: http://hub.docker.com/r/datadog/dd-lib-js-init
[20]: http://gallery.ecr.aws/datadog/dd-lib-js-init
[21]: http://gcr.io/datadoghq/dd-lib-python-init
[22]: http://hub.docker.com/r/datadog/dd-lib-python-init
[23]: http://gallery.ecr.aws/datadog/dd-lib-python-init
[24]: http://gcr.io/datadoghq/dd-lib-dotnet-init
[25]: http://hub.docker.com/r/datadog/dd-lib-dotnet-init
[26]: http://gallery.ecr.aws/datadog/dd-lib-dotnet-init
[27]: http://gcr.io/datadoghq/dd-lib-ruby-init
[28]: http://hub.docker.com/r/datadog/dd-lib-ruby-init
[29]: http://gallery.ecr.aws/datadog/dd-lib-ruby-init
[30]: /ja/containers/guide/changing_container_registry/
[31]: https://github.com/DataDog/dd-trace-java/releases
[32]: https://github.com/DataDog/dd-trace-js/releases
[33]: https://github.com/DataDog/dd-trace-py/releases
[34]: https://github.com/DataDog/dd-trace-dotnet/releases
[35]: https://github.com/DataDog/dd-trace-rb/releases

{{% /tab %}}
{{< /tabs >}}

## シングルステップ APM インスツルメンテーションを Agent から削除する

特定のサービス、ホスト、VM、またはコンテナでトレースデータを収集したくない場合は、以下の手順を実行してください。

### 特定のサービスについてインスツルメンテーションを削除する

特定のサービスの APM インスツルメンテーションを削除してトレース送信を停止する場合は、以下の手順に従ってください。

{{< tabs >}}
{{% tab "Linux ホストまたは VM" %}}

1. サービス起動コマンドに環境変数 `DD_INSTRUMENT_SERVICE_WITH_APM` を追加します。

   ```shell
   DD_INSTRUMENT_SERVICE_WITH_APM=false <service_start_command>
   ```
2. サービスを再起動します。

{{% /tab %}}

{{% tab "Docker" %}}

1. サービス起動コマンドに環境変数 `DD_INSTRUMENT_SERVICE_WITH_APM` を追加します。
   ```shell
   docker run -e DD_INSTRUMENT_SERVICE_WITH_APM=false <service_start_command>
   ```
2. サービスを再起動します。
{{% /tab %}}

{{% tab "Kubernetes" %}}

1. ポッド仕様の `admission.datadoghq.com/enabled:` ラベルを `"false"` に設定します。
   ```yaml
   spec:
     template:
       metadata:
         labels:
           admission.datadoghq.com/enabled: "false"
   ```
2. コンフィギュレーションを適用します。
   ```shell
   kubectl apply -f /path/to/your/deployment.yaml
   ```
3. インスツルメンテーションを削除したいサービスを再起動します。

{{% /tab %}}
{{< /tabs >}}

### インフラストラクチャー上のすべてのサービスについて APM を削除する

トレースの送信を停止するには、APM をアンインストールしてインフラストラクチャーを再起動してください:

{{< tabs >}}
{{% tab "Linux ホストまたは VM" %}}

1. 次を実行します。
   ```shell
   dd-host-install --uninstall
   ```
2. ホストまたは VM 上のサービスを再起動します。

{{% /tab %}}

{{% tab "Docker" %}}

1. 次を実行します。
   ```shell
   dd-container-install --uninstall
   ```
2. Docker を再起動します。
   ```shell
   systemctl restart docker
   ```
   または、環境に応じたコマンドを使用してください。

{{% /tab %}}

{{% tab "Kubernetes" %}}

どのファイルを構成するかは、Datadog Operator か Helm を使って Single Step Instrumentation を有効にしたかによって異なります。

{{< collapse-content title="Datadog Operator" level="h4" >}}

1. `datadog-agent.yaml` で `instrumentation.enabled=false` を設定します。
   ```yaml
   features:
     apm:
       instrumentation:
         enabled: false
   ```

2. 更新したコンフィギュレーションファイルで Datadog Agent をデプロイします。
   ```shell
   kubectl apply -f /path/to/your/datadog-agent.yaml
   ```
{{< /collapse-content >}}

{{< collapse-content title="Helm" level="h4" >}}

1. `datadog-values.yaml` で `instrumentation.enabled=false` を設定します。
   ```yaml
   datadog:
     apm:
       instrumentation:
         enabled: false
   ```

2. 次のコマンドを実行します。
   ```shell
   helm upgrade datadog-agent -f datadog-values.yaml datadog/datadog
   ```
{{< /collapse-content >}}

{{% /tab %}}
{{< /tabs >}}

## トラブルシューティング

### Single Step Instrumentation が有効にならない

Single Step Instrumentation は、アプリケーション内に [カスタムインスツルメンテーション][7]が検出されると自動的に無効になります。SSI を使用したい場合は、以下を行う必要があります:

1. 既存のカスタムインスツルメンテーションコードを削除します。
1. アプリケーションを再起動します。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: /ja/tracing/metrics/runtime_metrics/
[3]: /ja/tracing/service_catalog/
[4]: /ja/tracing/glossary/#instrumentation
[5]: /ja/containers/cluster_agent/admission_controller/
[6]: /ja/tracing/trace_collection/automatic_instrumentation/single-step-apm/compatibility
[7]: /ja/tracing/trace_collection/custom_instrumentation/