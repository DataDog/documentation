---
kind: ドキュメント
title: シングルステップのインスツルメンテーションを使用した Code Security の有効化
---

<div class="alert alert-info">シングルステップのインスツルメンテーションを使用した Code Security の有効化はベータ版です。</div>


## 要件

- **最小 Agent バージョン 7.53.0**
- **最小 Datadog Helm チャートバージョン 3.62.0** (Kubernetes デプロイ用)
- **言語とアーキテクチャ**: Code Security のシングルステップインスツルメンテーションは、`x86_64` および `arm64` アーキテクチャでの Java、Node.js、.NET Core サービスのトレースのみをサポートしており、Python はプライベートベータ版でサポートされています。
- **オペレーティングシステム**: Linux VM (Debian、Ubuntu、Amazon Linux、CentOS/Red Hat、Fedora)、Docker、Kubernetes クラスター (Linux コンテナ)

## ワンステップで有効化

If you [install or update a Datadog Agent][1] with the **Enable Code Security** option selected, the Agent is installed and configured to enable detection of code-level vulnerabilities in your applications. This allows you to automatically instrument your application, without any additional installation or configuration steps. Restart services for this instrumentation to take effect.


{{< img src="/security/application_security/single_step/asm_single_step_code_security.png" alt="APM インスツルメンテーションと ASM for Code Security を有効にするためのトグルをハイライトしたアカウント設定の Ubuntu セットアップページ" style="width:100%;" >}}

以下の例では、各インフラストラクチャーのタイプでどのように動作するかを示しています。

{{< tabs >}}
{{% tab "Linux host or VM" %}}

1 つのコマンドで Agent のインストール、構成、起動ができ、同時に Application Security オプションでサービスをインスツルメンテーションできます。

Ubuntu ホストの場合

1. 1 行のインストールコマンドを実行します。

   ```shell
   DD_API_KEY=<YOUR_DD_API_KEY> DD_SITE="<YOUR_DD_SITE>" DD_APM_INSTRUMENTATION_ENABLED=host DD_IAST_ENABLED=true bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
   ```

   a. `<YOUR_DD_API_KEY>` を自分の [Datadog API キー][4]に置き換えます。

   b. `<YOUR_DD_SITE>` を自分の [Datadog サイト][3]に置き換えます。
   <div class="alert alert-info">
      You can also optionally configure the following:
      <ul>
         <li><a href="#lib-linux">Specifying tracing library versions.</a></li>
         <li><a href="#env-linux">Tagging observability data by environment.</a></li>
      </ul>
   </div>
2. 現在のシェルセッションを終了します。
3. 新しいシェルセッションを開始します。
4. Restart the services on the host or VM.
5. [Datadog でサービスのパフォーマンス可観測性を調べます][5]。

**注**: Code Security と Threat Protection の**両方**のシングルステップを構成するには、`DD_IAST_ENABLED=true` と `DD_APPSEC_ENABLED=true` の**両方**の環境変数を 1 行のインストールコマンドに追加します。

### トレーシングライブラリのバージョン指定 {#lib-linux}

デフォルトでは、サーバーで APM を有効にすると、Java、Node.js、.NET Core、Python サービスのサポートがインストールされます。これらの言語で実装されたサービスしかない場合は、1 行のインストールコマンドで `DD_APM_INSTRUMENTATION_LIBRARIES` を設定します。

```shell
DD_APM_INSTRUMENTATION_LIBRARIES="java:1.25.0,python" DD_API_KEY=<YOUR_DD_API_KEY> DD_SITE="<YOUR_DD_SITE>" DD_APM_INSTRUMENTATION_ENABLED=host DD_IAST_ENABLED=true  DD_ENV=staging bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
```

言語名の後にコロンを置き、トレーシングライブラリのバージョンを指定することで、オプションでトレーシングライブラリのバージョン番号を指定できます。バージョンを指定しない場合、デフォルトは最新バージョンになります。言語名はカンマ区切りです。

サポートされている言語は以下の通りです。

- Java (`java`)
- Node.js (`js`)
- .NET (`dotnet`)
- Python (`python`)

**注**: Node.js のトレーシングライブラリについては、Node.js のバージョンによって互換性があります。詳細は [Datadog/dd-trace-js: JavaScript APM トレーサー][6]を参照してください。

### 環境による可観測性データのタグ付け {#env-linux}

Agent を通過するインスツルメンテーションされたサービスやその他のテレメトリーに、特定の環境を自動的にタグ付けするには、Linux 用の 1 行インストールコマンドで `DD_ENV` を設定します。例えば、Agent がステージング環境にインストールされている場合、`DD_ENV=staging` を設定して可観測性データを `staging` に関連付けます。

For example:

```shell
DD_API_KEY=<YOUR_DD_API_KEY> DD_SITE="<YOUR_DD_SITE>" DD_APM_INSTRUMENTATION_ENABLED=host DD_IAST_ENABLED=true DD_ENV=staging bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
```

[2]: /ja/agent/remote_config
[3]: /ja/getting_started/site/
[4]: https://app.datadoghq.com/organization-settings/api-keys
[5]: /ja/service_catalog/
[6]: https://github.com/DataDog/dd-trace-js?tab=readme-ov-file#version-release-lines-and-maintenance

{{% /tab %}}

{{% tab "Docker" %}}

Docker Linux コンテナの場合

1. Install the library injector:
   ```shell
   bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_docker_injection.sh)"
   ```
2. Configure the Agent in Docker:
   ```shell
   docker run -d --name dd-agent \
     -e DD_API_KEY=${YOUR_DD_API_KEY} \
     -e DD_APM_ENABLED=true \
     -e DD_IAST_ENABLED=true \
     -e DD_APM_NON_LOCAL_TRAFFIC=true \
     -e DD_DOGSTATSD_NON_LOCAL_TRAFFIC=true \
     -e DD_APM_RECEIVER_SOCKET=/opt/datadog/apm/inject/run/apm.socket \
     -e DD_DOGSTATSD_SOCKET=/opt/datadog/apm/inject/run/dsd.socket \
     -v /opt/datadog/apm:/opt/datadog/apm \
     -v /var/run/docker.sock:/var/run/docker.sock:ro \
     gcr.io/datadoghq/agent:7
   ```
   `<YOUR_DD_API_KEY>` を自分の [Datadog API][5] に置き換えます。
   <div class="alert alert-info">
      You can also optionally configure the following:
      <ul>
         <li><a href="#lib-docker">Specifying tracing library versions.</a></li>
         <li><a href="#env-docker">Tagging observability data by environment.</a></li>
      </ul>
   </div>
3. Restart the Docker containers.
4. [Datadog でサービスのパフォーマンス可観測性を調べます][6]。

### トレーシングライブラリのバージョン指定 {#lib-docker}

デフォルトでは、サーバーで APM を有効にすると、Java、Python、Node.js、.NET サービスのサポートがインストールされます。これらの言語の一部で実装されたサービスしかない場合は、インストールスクリプトを実行するときに `DD_APM_INSTRUMENTATION_LIBRARIES` を設定します。

例えば、Java トレーシングライブラリの v1.25.0 と最新の Python トレーシングライブラリのみのサポートをインストールするには、インストールコマンドに以下を追加します。

```shell
DD_APM_INSTRUMENTATION_LIBRARIES="java:1.25.0,python" bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_docker_injection.sh)"
```

言語名の後にコロンを置き、トレーシングライブラリのバージョンを指定することで、オプションでトレーシングライブラリのバージョン番号を指定できます。バージョンを指定しない場合、デフォルトは最新バージョンになります。言語名はカンマ区切りです。

サポートされている言語は以下の通りです。

- Java (`java`)
- Node.js (`js`)
- .NET (`dotnet`)
- Python (`python`)

**注**: Node.js のトレーシングライブラリについては、Node.js のバージョンによって互換性があります。詳細は [Datadog/dd-trace-js: JavaScript APM トレーサー][7]を参照してください。

### 環境による可観測性データのタグ付け {#env-docker}

Agent を通過するインスツルメンテーションされたサービスやその他のテレメトリーに、自動的に特定の環境をタグ付けするには、Docker 用のライブラリインジェクタのインストールコマンドで `DD_ENV` を設定します。例えば、Agent がステージング環境にインストールされている場合、`DD_ENV=staging` を設定して可観測性データを `staging` に関連付けます。

For example:

{{< highlight shell "hl_lines=5" >}}
docker run -d --name dd-agent \
  -e DD_API_KEY=${YOUR_DD_API_KEY} \
  -e DD_APM_ENABLED=true \
  -e DD_IAST_ENABLED=true \ 
  -e DD_ENV=staging \
  -e DD_APM_NON_LOCAL_TRAFFIC=true \
  -e DD_DOGSTATSD_NON_LOCAL_TRAFFIC=true \
  -e DD_APM_RECEIVER_SOCKET=/opt/datadog/apm/inject/run/apm.socket \
  -e DD_DOGSTATSD_SOCKET=/opt/datadog/apm/inject/run/dsd.socket \
  -v /opt/datadog/apm:/opt/datadog/apm \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  gcr.io/datadoghq/agent:7
{{< /highlight >}}

[5]: https://app.datadoghq.com/organization-settings/api-keys
[6]: /ja/service_catalog/
[7]: https://github.com/DataDog/dd-trace-js?tab=readme-ov-file#version-release-lines-and-maintenance


{{% /tab %}}

{{% tab "Kubernetes" %}}

Datadog Helm チャートで Agent をインストールすることで、APM を有効にすることができます。これにより、Datadog Agent が DaemonSet で Linux ベースの Kubernetes クラスターの全ノードにデプロイされます。

<div class="alert alert-info">シングルステップのインスツルメンテーションでは、Datadog Agent をインストールしたネームスペースのアプリケーションはインスツルメンテーションされません。アプリケーションを実行しないクラスター内の別のネームスペースに Agent をインストールすることをお勧めします。</div>

### Requirements

- [Helm][13] がインストールされていることを確認します。

### Installation

Helm でシングルステップのインスツルメンテーションを有効にするには

1. Helm Datadog リポジトリを追加します。
   ```bash
    helm repo add datadog https://helm.datadoghq.com
    helm repo update
    ```
2. Datadog の [API キー][10]を保存する Kubernetes Secret を作成します。
   ```bash
   kubectl create secret generic datadog-secret --from-literal api-key=$DD_API_KEY
   ```
3. `datadog-values.yaml` を作成し、以下の構成を追加します。
   ```
   datadog:
    apiKeyExistingSecret: datadog-secret
    site: <DATADOG_SITE>
    apm:
      instrumentation:
         enabled: true
    asm:
      iast:
        enabled: true
   ```
   `<DATADOG_SITE>` を自分の [Datadog サイト][12]に置き換えます。

4. Run the following command:
   ```bash
   helm install datadog-agent -f datadog-values.yaml datadog/datadog
   ```
5. インスツルメンテーションを有効にするために、アプリケーションの段階的再起動を行います。

Kubernetes のシングルステップインスツルメンテーションの詳細については、以下を参照してください:

* [ネームスペースによるシングルステップインスツルメンテーションの有効化または無効化][15]
* [インスツルメンテーションライブラリのバージョンの指定][16]
* [特定のデプロイでのインスツルメンテーションの削除][17]

[7]: https://v3.helm.sh/docs/intro/install/
[8]: https://kubernetes.io/docs/tasks/tools/install-kubectl/
[9]: https://github.com/DataDog/helm-charts/tree/master/charts/datadog-operator
[10]: https://app.datadoghq.com/organization-settings/api-keys
[11]: https://app.datadoghq.com/organization-settings/application-keys
[12]: /ja/getting_started/site
[13]: https://v3.helm.sh/docs/intro/install/
[14]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/values.yaml
[15]: /ja/tracing/trace_collection/automatic_instrumentation/single-step-apm/?tab=kubernetes#enabling-or-disabling-instrumentation-for-namespaces
[16]: /ja/tracing/trace_collection/automatic_instrumentation/single-step-apm/?tab=kubernetes#specifying-tracing-library-versions
[17]: /ja/tracing/trace_collection/automatic_instrumentation/single-step-apm/?tab=kubernetes#removing-instrumentation-for-specific-services

{{% /tab %}}
{{< /tabs >}}

## Agent からのシングルステップ APM とアプリケーションセキュリティのインスツルメンテーションの削除

特定のサービス、ホスト、VM、コンテナのトレースデータを収集したくない場合は、次の手順を実行します。

### Removing instrumentation for specific services

Run the following commands and restart the service to stop injecting the library into the service and stop producing traces from that service.

{{< tabs >}}
{{% tab "Linux host or VM" %}}

1. サービス起動コマンドに環境変数 `DD_INSTRUMENT_SERVICE_WITH_APM` を追加します。

   ```shell
   DD_INSTRUMENT_SERVICE_WITH_APM=false <service_start_command>
   ```
2. Restart the service.

3. Code Security を無効にするには、アプリケーション構成から `DD_IAST_ENABLED=true` 環境変数を削除して、サービスを再起動します。



{{% /tab %}}

{{% tab "Docker" %}}

1. サービス起動コマンドに環境変数 `DD_INSTRUMENT_SERVICE_WITH_APM` を追加します。
   ```shell
   docker run -e DD_INSTRUMENT_SERVICE_WITH_APM=false <service_start_command>
   ```
2. Restart the service.

3. Code Security を無効にするには、アプリケーション構成から `DD_IAST_ENABLED=true` 環境変数を削除して、サービスを再起動します。
{{% /tab %}}

{{% tab "Kubernetes" %}}

1. ポッド仕様の `admission.datadoghq.com/enabled:` ラベルを `"false"` に設定します。

   ```yaml
   spec:
     template:
       metadata:
         labels:
           admission.datadoghq.com/enabled: "false"

<div class="alert alert-info"> <code>DD_IAST_ENABLED=false</code> 環境変数をデプロイに追加することで、APM を維持したまま Code Security を無効にすることができます。</div>

{{% /tab %}}

{{< /tabs >}}

### Removing APM for all services on the infrastructure

トレースの生成を停止するには、ライブラリインジェクタを削除し、インフラストラクチャーを再起動します。

{{< tabs >}}
{{% tab "Linux host or VM" %}}

1. Run:
   ```shell
   dd-host-install --uninstall
   ```
2. Restart your host.

{{% /tab %}}

{{% tab "Docker" %}}

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

{{% tab "Kubernetes" %}}

1. `apm:` の下で、`datadog-values.yaml` 内の `instrumentation:` と以下の構成を削除します。
2. `asm:` の下で、`datadog-values.yaml` 内の `iast:` と以下の構成を削除します。
3. Run the following command:

    ```bash
   helm upgrade datadog-agent -f datadog-values.yaml datadog/datadog

{{% /tab %}}

{{< /tabs >}}

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: /ja/agent/remote_config