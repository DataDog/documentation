---
title: Enabling ASM threat detection and protection using single step instrumentation
kind: documentation
---

<div class="alert alert-info">Enabling ASM threat detection and protection using single step instrumentation is in beta.</div>


## Requirements

- **最小 Agent バージョン 7.53.0**
- **Minimum Helm version 3.62.0** (For Kubernetes deployments)
- **Languages and architectures**: Single step ASM instrumentation only supports tracing Java, Python, Ruby, Node.js, and .NET Core services on `x86_64` and `arm64` architectures.
- **オペレーティングシステム**: Linux VM (Debian、Ubuntu、Amazon Linux、CentOS/Red Hat、Fedora)、Docker、Kubernetes クラスター (Linux コンテナ)

## ワンステップで有効化

If you [install or update a Datadog Agent][1] with the **Enable Threat Protection (new)** option selected, the Agent is installed and configured to enable ASM. This allows you to automatically instrument your application, without any additional installation or configuration steps. Restart services for this instrumentation to take effect.


{{< img src="/security/application_security/single_step/asm_single_step_threat_detection_2.png" alt="Account settings Ubuntu setup page highlighting the toggle for Enabling APM instrumentation and Threat Protection." style="width:100%;" >}}

以下の例では、各インフラストラクチャーのタイプでどのように動作するかを示しています。

{{< tabs >}}
{{% tab "Linux ホストまたは VM" %}}

With one command, you can install, configure, and start the Agent, while also instrumenting your services with ASM.

Ubuntu ホストの場合

1. 1 行のインストールコマンドを実行します。

   ```shell
   DD_API_KEY=<YOUR_DD_API_KEY> DD_SITE="<YOUR_DD_SITE>" DD_APM_INSTRUMENTATION_ENABLED=host DD_APPSEC_ENABLED=true bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
   ```

   a. `&lt;YOUR_DD_API_KEY&gt;` を自分の [Datadog API キー][4]に置き換えます。

   b. `&lt;YOUR_DD_SITE&gt;` を自分の [Datadog サイト][3]に置き換えます。
   <div class="alert alert-info">
      You can also optionally configure the following:
      <ul>
         <li><a href="#lib-linux">Specifying tracing library versions.</a></li>
         <li><a href="#env-linux">Tagging observability data by environment.</a></li>
      </ul>
   </div>
2. 現在のシェルセッションを終了します。
3. 新しいシェルセッションを開始します。
4. ホストまたは VM 上のサービスを再起動します。
5. [Datadog でサービスのパフォーマンス可観測性を調べます][5]。

**Note:** To configure single-step for both ASM Threat Protection and Code Security, add the environment variables `DD_APPSEC_ENABLED=true` _and_ `DD_IAST_ENABLED=true` to your one-line installation command.

### トレーシングライブラリのバージョン指定 {#lib-linux}

By default, enabling APM on your server installs support for Java, Python, Ruby, Node.js, and .NET Core services. If you only have services implemented in some of these languages, set `DD_APM_INSTRUMENTATION_LIBRARIES` in your one-line installation command:

```shell
DD_APM_INSTRUMENTATION_LIBRARIES="java:1.25.0,python" DD_API_KEY=<YOUR_DD_API_KEY> DD_SITE="<YOUR_DD_SITE>" DD_APM_INSTRUMENTATION_ENABLED=host DD_APPSEC_ENABLED=true DD_ENV=staging bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
```

言語名の後にコロンを置き、トレーシングライブラリのバージョンを指定することで、オプションでトレーシングライブラリのバージョン番号を指定できます。バージョンを指定しない場合、デフォルトは最新バージョンになります。言語名はカンマ区切りです。

サポートされている言語は以下の通りです。

- .NET (`dotnet`)
- Python (`python`)
- Java (`java`)
- Node.js (`js`)
- Ruby (`ruby`)

**注**: Node.js のトレーシングライブラリについては、Node.js のバージョンによって互換性があります。詳細は [Datadog/dd-trace-js: JavaScript APM トレーサー][6]を参照してください。

### 環境による可観測性データのタグ付け {#env-linux}

Agent を通過するインスツルメンテーションされたサービスやその他のテレメトリーに、特定の環境を自動的にタグ付けするには、Linux 用の 1 行インストールコマンドで `DD_ENV` を設定します。例えば、Agent がステージング環境にインストールされている場合、`DD_ENV=staging` を設定して可観測性データを `staging` に関連付けます。

例:

```shell
DD_API_KEY=<YOUR_DD_API_KEY> DD_SITE="<YOUR_DD_SITE>" DD_APM_INSTRUMENTATION_ENABLED=host DD_APPSEC_ENABLED=true DD_ENV=staging bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
```

[2]: /agent/remote_config
[3]: /getting_started/site/
[4]: https://app.datadoghq.com/organization-settings/api-keys
[5]: /service_catalog/
[6]: https://github.com/DataDog/dd-trace-js?tab=readme-ov-file#version-release-lines-and-maintenance

{{% /tab %}}

{{% tab "Docker" %}}

Docker Linux コンテナの場合

1. ライブラリインジェクターをインストールします。
   ```shell
   bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_docker_injection.sh)"
   ```
2. Docker で Agent を構成します。
   ```shell
   docker run -d --name dd-agent \
     -e DD_API_KEY=${YOUR_DD_API_KEY} \
     -e DD_APM_ENABLED=true \
     -e DD_APPSEC_ENABLED=true \
     -e DD_APM_NON_LOCAL_TRAFFIC=true \
     -e DD_DOGSTATSD_NON_LOCAL_TRAFFIC=true \
     -e DD_APM_RECEIVER_SOCKET=/opt/datadog/apm/inject/run/apm.socket \
     -e DD_DOGSTATSD_SOCKET=/opt/datadog/apm/inject/run/dsd.socket \
     -v /opt/datadog/apm:/opt/datadog/apm \
     -v /var/run/docker.sock:/var/run/docker.sock:ro \
     gcr.io/datadoghq/agent:7
   ```
   `&lt;YOUR_DD_API_KEY&gt;` を自分の [Datadog API][5] に置き換えます。
   <div class="alert alert-info">
      You can also optionally configure the following:
      <ul>
         <li><a href="#lib-docker">Specifying tracing library versions.</a></li>
         <li><a href="#env-docker">Tagging observability data by environment.</a></li>
      </ul>
   </div>
3. Docker コンテナを再起動します。
4. [Datadog でサービスのパフォーマンス可観測性を調べます][6]。

### トレーシングライブラリのバージョン指定 {#lib-docker}

By default, enabling APM on your server installs support for Java, Python, Ruby, Node.js, and .NET services. If you only have services implemented in some of these languages, set `DD_APM_INSTRUMENTATION_LIBRARIES` when running the installation script.

例えば、Java トレーシングライブラリの v1.25.0 と最新の Python トレーシングライブラリのみのサポートをインストールするには、インストールコマンドに以下を追加します。

```shell
DD_APM_INSTRUMENTATION_LIBRARIES="java:1.25.0,python" bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_docker_injection.sh)"
```

言語名の後にコロンを置き、トレーシングライブラリのバージョンを指定することで、オプションでトレーシングライブラリのバージョン番号を指定できます。バージョンを指定しない場合、デフォルトは最新バージョンになります。言語名はカンマ区切りです。

サポートされている言語は以下の通りです。

- .NET (`dotnet`)
- Python (`python`)
- Java (`java`)
- Node.js (`js`)
- Ruby (`ruby`)

**注**: Node.js のトレーシングライブラリについては、Node.js のバージョンによって互換性があります。詳細は [Datadog/dd-trace-js: JavaScript APM トレーサー][7]を参照してください。

### 環境による可観測性データのタグ付け {#env-docker}

Agent を通過するインスツルメンテーションされたサービスやその他のテレメトリーに、自動的に特定の環境をタグ付けするには、Docker 用のライブラリインジェクタのインストールコマンドで `DD_ENV` を設定します。例えば、Agent がステージング環境にインストールされている場合、`DD_ENV=staging` を設定して可観測性データを `staging` に関連付けます。

例:

{{< highlight shell "hl_lines=5" >}}
docker run -d --name dd-agent \
  -e DD_API_KEY=${YOUR_DD_API_KEY} \
  -e DD_APM_ENABLED=true \
  -e DD_APPSEC_ENABLED=true \
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
[6]: /service_catalog/
[7]: https://github.com/DataDog/dd-trace-js?tab=readme-ov-file#version-release-lines-and-maintenance


{{% /tab %}}

{{% tab "Kubernetes" %}}

Datadog Helm チャートで Agent をインストールすることで、APM を有効にすることができます。これにより、Datadog Agent が DaemonSet で Linux ベースの Kubernetes クラスターの全ノードにデプロイされます。

**Note**: Single step instrumentation doesn't instrument applications in the namespace where you install the Datadog Agent. It's recommended to install the Agent in a separate namespace in your cluster where you don't run your applications.

### 要件

- [Helm][13] がインストールされていることを確認します。

### インストール

Helm でシングルステップのインスツルメンテーションを有効にするには

1. Helm Datadog リポジトリを追加します。

    ```bash
    helm repo add datadog https://helm.datadoghq.com
    helm repo update
    ```
2. Datadog の [API キー][10]を保存する Kubernetes Secret を作成します。

   ```bash
   kubectl create secret generic datadog-secret --from-literal api-key=$DD_API_KEY

[7]: https://v3.helm.sh/docs/intro/install/
[8]: https://kubernetes.io/docs/tasks/tools/install-kubectl/
[9]: https://github.com/DataDog/helm-charts/tree/master/charts/datadog-operator
[10]: https://app.datadoghq.com/organization-settings/api-keys
[11]: https://app.datadoghq.com/organization-settings/application-keys
[12]: /getting_started/site
[13]: https://v3.helm.sh/docs/intro/install/
[14]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/values.yaml
[15]: /tracing/trace_collection/automatic_instrumentation/single-step-apm/?tab=kubernetes#enabling-or-disabling-instrumentation-for-namespaces
[16]: /tracing/trace_collection/automatic_instrumentation/single-step-apm/?tab=kubernetes#specifying-tracing-library-versions
[17]: /tracing/trace_collection/automatic_instrumentation/single-step-apm/?tab=kubernetes#removing-instrumentation-for-specific-services

{{% /tab %}}
{{< /tabs >}}

## Removing Single Step APM and ASM instrumentation from your Agent

特定のサービス、ホスト、VM、コンテナのトレースデータを収集したくない場合は、次の手順を実行します。

### 特定のサービスについてインスツルメンテーションを削除する

次のコマンドを実行し、サービスを再起動して、サービスに対するライブラリの挿入を停止し、当該サービスからのトレースの生成を停止します。

{{< tabs >}}
{{% tab "Linux ホストまたは VM" %}}

1. サービス起動コマンドに環境変数 `DD_INSTRUMENT_SERVICE_WITH_APM` を追加します。

   ```shell
   DD_INSTRUMENT_SERVICE_WITH_APM=false <service_start_command>
   ```
2. サービスを再起動します。

3. To disable ASM, remove the `DD_APPSEC_ENABLED=true` environment variable from your application configuration, and restart your service.



{{% /tab %}}

{{% tab "Docker" %}}

1. サービス起動コマンドに環境変数 `DD_INSTRUMENT_SERVICE_WITH_APM` を追加します。
   ```shell
   docker run -e DD_INSTRUMENT_SERVICE_WITH_APM=false <service_start_command>
   ```
2. サービスを再起動します。

3. To disable ASM, remove the `DD_APPSEC_ENABLED=true` environment variable from your application configuration, and restart your service.
{{% /tab %}}

{{% tab "Kubernetes" %}}

1. ポッド仕様の `admission.datadoghq.com/enabled:` ラベルを `"false"` に設定します。

   ```yaml
   spec:
     template:
       metadata:
         labels:
           admission.datadoghq.com/enabled: "false"

{{% /tab %}}

{{< /tabs >}}

### インフラストラクチャー上のすべてのサービスについて APM を削除する

トレースの生成を停止するには、ライブラリインジェクタを削除し、インフラストラクチャーを再起動します。

{{< tabs >}}
{{% tab "Linux ホストまたは VM" %}}

1. 次を実行します。
   ```shell
   dd-host-install --uninstall
   ```
2. ホストを再起動します。

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
2. Under `asm:`, remove `threats:` and all following configuration in`datadog-values.yaml`.
3. 次のコマンドを実行します。

   ```bash
   helm upgrade datadog-agent -f datadog-values.yaml datadog/datadog
{{% /tab %}}

{{< /tabs >}}

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: /agent/remote_config

