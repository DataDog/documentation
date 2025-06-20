---
further_reading:
- link: /data_jobs
  tag: ドキュメント
  text: Data Jobs Monitoring
title: Kubernetes 上の Spark の Data Jobs Monitoring
---

[Data Jobs Monitoring][6] は、Kubernetes 上の Apache Spark アプリケーションのパフォーマンスと信頼性を視覚化します。

## セットアップ
<div class="alert alert-info">Data Jobs Monitoring には、<a href="https://github.com/DataDog/datadog-agent/releases" target="_blank">Datadog Agent バージョン</a> 7.55.0 以降と <a href="https://github.com/DataDog/dd-trace-java/releases" target="_blank">Java トレーサー</a>バージョン 1.38.0 以降が必要です。</div>

以下の手順に従って、Kubernetes 上の Spark に対して Data Jobs Monitoring を有効にしてください。

1. Kubernetes クラスターに [Datadog Agent をインストール](#install-the-datadog-agent-on-your-kubernetes-cluster)します。
2. [Spark インスツルメンテーションを注入](#inject-spark-instrumentation)します。


### Datadog Agent を Kubernetes クラスターにインストールする

すでに [Datadog Agent を Kubernetes クラスターにインストール][1]している場合は、[Datadog Admission Controller][2] が有効になっていることを確認してください。 確認できたら、次の手順である [Spark インスツルメンテーションの注入](#inject-spark-instrumentation)に進みます。

Datadog Agent は、[Datadog Operator][3] または [Helm][4] を使用してインストールできます。

{{< tabs >}}
{{% tab "Datadog Operator" %}}
#### 前提条件
- Kubernetes クラスターバージョン v1.20.X 以降
- [`Helm`][1]
- The [`kubectl` CLI][2]

#### インストール
1. 次のコマンドを実行して、Datadog Operator をインストールします。
   ```shell
   helm repo add datadog https://helm.datadoghq.com
   helm install my-datadog-operator datadog/datadog-operator
   ```
1. Datadog の API キーを保存する [Kubernetes Secret][3] を作成します。
   ```shell
   kubectl create secret generic datadog-secret --from-literal api-key=<DATADOG_API_KEY> --from-literal app-key=<DATADOG_APP_KEY>
   ```
   - `<DATADOG_API_KEY>` を、ご使用の [Datadog API キー][4]に置き換えます。
   - `<DATADOG_APP_KEY>` を、ご使用の [Datadog アプリケーションキー][6]に置き換えます。
1. 次の構成を含むファイル、`datadog-agent.yaml` を作成します。

   ```yaml
   kind: DatadogAgent
   apiVersion: datadoghq.com/v2alpha1
   metadata:
     name: datadog
   spec:
     features:
       apm:
         enabled: true
         hostPortConfig:
           enabled: true
           hostPort: 8126
       admissionController:
         enabled: true
         mutateUnlabelled: false
     global:
       tags:
         - 'data_workload_monitoring_trial:true'
       site: <DATADOG_SITE>
       credentials:
         apiSecret:
           secretName: datadog-secret
           keyName: api-key
         appSecret:
           secretName: datadog-secret
           keyName: app-key
     override:
       nodeAgent:
         image:
           tag: <DATADOG_AGENT_VERSION>
         env:
           - name: DD_DJM_CONFIG_ENABLED
             value: "true"
   ```
   `<DATADOG_SITE>` を、ご使用の [Datadog サイト][5]に置き換えます。ご使用のサイトは {{< region-param key="dd_site" code="true" >}} です (右側で正しいサイトが選択されていることを確認してください)。

   `<DATADOG_AGENT_VERSION>` をバージョン `7.55.0` 以降に置き換えます。
1. 上記のコンフィギュレーションファイルを使用して Datadog Agent をデプロイします。
   ```shell
   kubectl apply -f /path/to/your/datadog-agent.yaml
   ```
[1]: https://helm.sh
[2]: https://kubernetes.io/docs/tasks/tools/install-kubectl/
[3]: https://kubernetes.io/docs/concepts/configuration/secret/
[4]: https://app.datadoghq.com/organization-settings/api-keys
[5]: /ja/getting_started/site
[6]: https://app.datadoghq.com/organization-settings/application-keys
{{% /tab %}}
{{% tab "Helm" %}}

1. Datadog の API キーを保存する [Kubernetes Secret][1] を作成します。
   ```shell
   kubectl create secret generic datadog-secret --from-literal api-key=<DATADOG_API_KEY> --from-literal app-key=<DATADOG_APP_KEY>
   ```
   - `<API_キー>` を、ご使用の [Datadog API キー][2]に置き換えます。
   - `<DATADOG_APP_KEY>` を、ご使用の [Datadog アプリケーションキー][3]に置き換えます。
1. 次の構成を含むファイル、`datadog-values.yaml` を作成します。
   ```yaml
   datadog:
     apiKeyExistingSecret: datadog-secret
     appKeyExistingSecret: datadog-secret
     site: <DATADOG_SITE>
     apm:
       portEnabled: true
       port: 8126
     tags:
       - 'data_workload_monitoring_trial:true'
     env:
       - name: DD_DJM_CONFIG_ENABLED
         value: "true"

   agents:
     image:
       tag: <DATADOG_AGENT_VERSION>

   clusterAgent:
     admissionController:
       enabled: true
       muteUnlabelled: false
   ```
   `<DATADOG_SITE>` を、ご使用の [Datadog サイト][4]に置き換えます。ご使用のサイトは {{< region-param key="dd_site" code="true" >}} です (右側で正しいサイトが選択されていることを確認してください)。

   `<DATADOG_AGENT_VERSION>` をバージョン `7.55.0` 以降に置き換えます。
1. 次のコマンドを実行します。
   ```shell
   helm install <RELEASE_NAME> \
    -f datadog-values.yaml \
    --set targetSystem=<TARGET_SYSTEM> \
    datadog/datadog
   ```

   - `<RELEASE_NAME>` をリリース名に置き換えます。例えば、`datadog-agent` とします’。

   - `<TARGET_SYSTEM>` を OS 名に置き換えます。例えば、`linux` または `windows` とします。

[1]: https://kubernetes.io/docs/concepts/configuration/secret/
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://app.datadoghq.com/organization-settings/application-keys
[4]: /ja/getting_started/site
{{% /tab %}}
{{< /tabs >}}

### Spark インスツルメンテーションの注入

Spark ジョブを実行する際には、以下の構成を使用します。

`spark.kubernetes.{driver,executor}.label.admission.datadoghq.com/enabled` (必須)
: `true`

`spark.kubernetes.{driver,executor}.annotation.admission.datadoghq.com/java-lib.version` (必須)
: `latest`

`spark.{driver,executor}.extraJavaOptions`
:  `-Ddd.data.jobs.enabled=true` (必須)
   : `true`

 `-Ddd.service` (オプション)
: サービス名です。このオプションは Datadog 内の_ジョブ名_を設定するため、人間が読める名前を使用することをお勧めします。

 `-Ddd.env` (オプション)
: `prod` や `dev` などの環境。

 `-Ddd.version` (Optional)
: お使いのバージョン。

`-Ddd.tags` (オプション)
: 追加したいその他のタグ。`<KEY_1>:<VALUE_1>,<KEY_2:VALUE_2>` の形式で入力してください。


#### 例: spark-submit

```shell
spark-submit \
  --class org.apache.spark.examples.SparkPi \
  --master k8s://<CLUSTER_ENDPOINT> \
  --conf spark.kubernetes.container.image=895885662937.dkr.ecr.us-west-2.amazonaws.com/spark/emr-6.10.0:latest \
  --deploy-mode cluster \
  --conf spark.kubernetes.namespace=<NAMESPACE> \
  --conf spark.kubernetes.authenticate.driver.serviceAccountName=<SERVICE_ACCOUNT> \
  --conf spark.kubernetes.authenticate.executor.serviceAccountName=<SERVICE_ACCOUNT> \
  --conf spark.kubernetes.driver.label.admission.datadoghq.com/enabled=true \
  --conf spark.kubernetes.executor.label.admission.datadoghq.com/enabled=true \
  --conf spark.kubernetes.driver.annotation.admission.datadoghq.com/java-lib.version=latest \
  --conf spark.kubernetes.executor.annotation.admission.datadoghq.com/java-lib.version=latest \
  --conf spark.driver.extraJavaOptions="-Ddd.data.jobs.enabled=true -Ddd.service=<JOB_NAME> -Ddd.env=<ENV> -Ddd.version=<VERSION> -Ddd.tags=<KEY_1>:<VALUE_1>,<KEY_2:VALUE_2>" \
  --conf spark.executor.extraJavaOptions="-Ddd.data.jobs.enabled=true -Ddd.service=<JOB_NAME> -Ddd.env=<ENV> -Ddd.version=<VERSION> -Ddd.tags=<KEY_1>:<VALUE_1>,<KEY_2:VALUE_2>" \
  local:///usr/lib/spark/examples/jars/spark-examples.jar 20
```

#### 例: AWS start-job-run

```shell
aws emr-containers start-job-run \
--virtual-cluster-id <EMR_CLUSTER_ID> \
--name myjob \
--execution-role-arn <EXECUTION_ROLE_ARN> \
--release-label emr-6.10.0-latest \
--job-driver '{
  "sparkSubmitJobDriver": {
    "entryPoint": "s3://BUCKET/spark-examples.jar",
    "sparkSubmitParameters": "--class <MAIN_CLASS> --conf spark.kubernetes.driver.label.admission.datadoghq.com/enabled=true --conf spark.kubernetes.executor.label.admission.datadoghq.com/enabled=true --conf spark.kubernetes.driver.annotation.admission.datadoghq.com/java-lib.version=latest --conf spark.kubernetes.executor.annotation.admission.datadoghq.com/java-lib.version=latest --conf spark.driver.extraJavaOptions=\"-Ddd.data.jobs.enabled=true -Ddd.service=<JOB_NAME> -Ddd.env=<ENV> -Ddd.version=<VERSION> -Ddd.tags=<KEY_1>:<VALUE_1>,<KEY_2:VALUE_2>  --conf spark.executor.extraJavaOptions=\"-Ddd.data.jobs.enabled=true -Ddd.service=<JOB_NAME> -Ddd.env=<ENV> -Ddd.version=<VERSION> -Ddd.tags=<KEY_1>:<VALUE_1>,<KEY_2:VALUE_2>\""
  }
}

```
## 検証

Datadog で [Data Jobs Monitoring][5] ページを表示すると、すべてのデータ処理ジョブのリストが表示されます。

## 高度な構成

### ランタイムでのタグスパン

{{% djm-runtime-tagging %}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/containers/kubernetes/installation/?tab=operator
[2]: /ja/containers/cluster_agent/admission_controller/?tab=operator
[3]: /ja/containers/datadog_operator
[4]: https://helm.sh
[5]: https://app.datadoghq.com/data-jobs/
[6]: /ja/data_jobs