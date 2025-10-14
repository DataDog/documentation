---
further_reading:
- link: /data_jobs
  tag: Documentación
  text: Data Jobs Monitoring
title: Data Jobs Monitoring para Spark en Kubernetes
---

[Data Jobs Monitoring][6] ofrece visibilidad del rendimiento y la fiabilidad de las aplicaciones Apache Spark en Kubernetes.

## Ajustes
<div class="alert alert-info">Data Jobs Monitoring requiere el <a href="https://github.com/DataDog/datadog-agent/releases" target="_blank">Datadog Agent versión</a> 7.55.0 o posterior y el <a href="https://github.com/DataDog/dd-trace-java/releases" target="_blank">rastreador de Java</a> versión 1.38.0 o posterior.</div>

Sigue estos pasos para habilitar Data Jobs Monitoring para Spark en Kubernetes.

1. [Instalar el Datadog Agent](#install-the-datadog-agent-on-your-kubernetes-cluster) en tu clúster de Kubernetes.
2. [Inyectar la instrumentación de Spark](#inject-spark-instrumentation).


### Instalar el Datadog Agent en tu clúster de Kubernetes

Si ya has [instalado el Datadog Agent en tu clúster de Kubernetes][1], asegúrate de que has habilitado el [Datadog Admission Controller][2]. A continuación, puedes ir al siguiente paso, [Inyectar la instrumentación de Spark](#inject-spark-instrumentation).

Puedes instalar el Datadog Agent utilizando el [Datadog Operador][3] o [Helm][4].

{{< tabs >}}
{{% tab "Datadog Operator" %}}
#### Requisitos previos
- Clúster de Kubernetes versión v1.20.X+
- [`Helm`][1]
- La [CLI de `kubectl`][2]

#### Instalación
1. Instala el Datadog Operator ejecutando los siguientes comandos:
   ```shell
   helm repo add datadog https://helm.datadoghq.com
   helm install my-datadog-operator datadog/datadog-operator
   ```
1. Crea un [secreto de Kubernetes][3] para almacenar tu clave de API de Datadog.
   ```shell
   kubectl create secret generic datadog-secret --from-literal api-key=<DATADOG_API_KEY>
   ```
   Sustituye `<DATADOG_API_KEY>` por tu [clave de API de Datadog][4].
1. Crea un archivo, `datadog-agent.yaml`, que contenga la siguiente configuración:

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
       # (Optional) Uncomment the next three lines to enable logs collection
       # logCollection:
         # enabled: true
         # containerCollectAll: true
     global:
       site: <DATADOG_SITE>
       credentials:
         apiSecret:
           secretName: datadog-secret
           keyName: api-key
     override:
       nodeAgent:
         image:
           tag: <DATADOG_AGENT_VERSION>
   ```
   Sustituye `<DATADOG_SITE>` por tu [sitio de Datadog][5]. Tu sitio es {{< region-param key="dd_site" code="true" >}}. (Asegúrate de seleccionar el SITIO correcto a la derecha).

   Sustituye `<DATADOG_AGENT_VERSION>` por la versión `7.55.0` o posterior.

   **Opcional**: Anula los comentarios de la sección `logCollection` para comenzar a recopilar logs de aplicación que se correlacionarán con las trazas de ejecución del trabajo de Spark. Una vez habilitados, los logs se recopilan de todos los contenedores detectados por defecto. Consulta la [documentación de recopilación d elogs de Kubernetes][7] para más detalles sobre el proceso de configuración.
1. Despliega el Datadog Agent con el archivo de configuración anterior:
   ```shell
   kubectl apply -f /path/to/your/datadog-agent.yaml
   ```
[1]: https://helm.sh
[2]: https://kubernetes.io/docs/tasks/tools/install-kubectl/
[3]: https://kubernetes.io/docs/concepts/configuration/secret/
[4]: https://app.datadoghq.com/organization-settings/api-keys
[5]: /es/getting_started/site
[7]: /es/containers/kubernetes/log/?tab=datadogoperator#log-collection
{{% /tab %}}
{{% tab "Helm" %}}

1. Crea un [secreto de Kubernetes][1] para almacenar tu clave de API de Datadog.
   ```shell
   kubectl create secret generic datadog-secret --from-literal api-key=<DATADOG_API_KEY>
   ```
   Sustituye `<DATADOG_API_KEY>` por tu [clave de API de Datadog][2].
1. Crea un archivo, `datadog-values.yaml`, que contenga la siguiente configuración:
   ```yaml
   datadog:
     apiKeyExistingSecret: datadog-secret
     site: <DATADOG_SITE>
     apm:
       portEnabled: true
       port: 8126
     # (Optional) Uncomment the next three lines to enable logs collection
     # logs:
       # enabled: true
       # containerCollectAll: true

   agents:
     image:
       tag: <DATADOG_AGENT_VERSION>

   clusterAgent:
     admissionController:
       enabled: true
       muteUnlabelled: false
   ```
   Sustituye `<DATADOG_SITE>` por tu [sitio de Datadog][4]. Tu sitio es {{< region-param key="dd_site" code="true" >}}. (Asegúrate de seleccionar el SITIO correcto a la derecha).

   Sustituye `<DATADOG_AGENT_VERSION>` por la versión `7.55.0` o posterior.

   **Opcional**: Anula los comentarios de la sección de logs para comenzar a recopilar logs de aplicación que se correlacionarán con las trazas de ejecución del trabajo de Spark. Una vez habilitados, los logs se recopilan de todos los contenedores detectados por defecto. Consulta la [documentación de recopilación d elogs de Kubernetes][5] para más detalles sobre el proceso de configuración.
1. Ejecuta el siguiente comando:
   ```shell
   helm install <RELEASE_NAME> \
    -f datadog-values.yaml \
    --set targetSystem=<TARGET_SYSTEM> \
    datadog/datadog
   ```

   - Sustituye `<RELEASE_NAME>` por el nombre de tu versión. Por ejemplo, `datadog-agent`.

   - Sustituye `<TARGET_SYSTEM>` por el nombre de tu sistema operativo. Por ejemplo, `linux` o `windows`.

[1]: https://kubernetes.io/docs/concepts/configuration/secret/
[2]: https://app.datadoghq.com/organization-settings/api-keys
[4]: /es/getting_started/site
[5]: /es/containers/kubernetes/log/?tab=helm#log-collection
{{% /tab %}}
{{< /tabs >}}

### Inyectar la instrumentación de Spark

Cuando ejecutes tu trabajo de Spark, utiliza las siguientes configuraciones:

`spark.kubernetes.{driver,executor}.label.admission.datadoghq.com/enabled` (obligatorio)
: `true`

`spark.kubernetes.{driver,executor}.annotation.admission.datadoghq.com/java-lib.version` (obligatorio)
: `latest`

`spark.{driver,executor}.extraJavaOptions`
: `-Ddd.data.jobs.enabled=true` (obligatorio)
   : `true`

   `-Ddd.service` (opcional)
   : tu nombre de servicio. Debido a que esta opción establece el _nombre de trabajo_ en Datadog, es recomendado que utilices un nombre legible por humanos.

   `-Ddd.env` (opcional)
   : tu entorno, como `prod` o `dev`.

   `-Ddd.version` (opcional)
   : tu versión.

   `-Ddd.tags` (opcional)
   Otras etiquetas que desees añadir, en el formato `<KEY_1>:<VALUE_1>,<KEY_2:VALUE_2>`.


#### Ejemplo: spark-submit

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

#### Ejemplo: AWS start-job-run

```shell
aws emr-containers start-job-run \
--virtual-cluster-id <EMR_CLUSTER_ID> \
--name myjob \
--execution-role-arn <EXECUTION_ROLE_ARN> \
--release-label emr-6.10.0-latest \
--job-driver '{
  "sparkSubmitJobDriver": {
    "entryPoint": "s3://BUCKET/spark-examples.jar",
    "sparkSubmitParameters": "--class <MAIN_CLASS> --conf spark.kubernetes.driver.label.admission.datadoghq.com/enabled=true --conf spark.kubernetes.executor.label.admission.datadoghq.com/enabled=true --conf spark.kubernetes.driver.annotation.admission.datadoghq.com/java-lib.version=latest --conf spark.kubernetes.executor.annotation.admission.datadoghq.com/java-lib.version=latest --conf spark.driver.extraJavaOptions=\"-Ddd.data.jobs.enabled=true -Ddd.service=<JOB_NAME> -Ddd.env=<ENV> -Ddd.version=<VERSION> -Ddd.tags=<KEY_1>:<VALUE_1>,<KEY_2:VALUE_2>\"  --conf spark.executor.extraJavaOptions=\"-Ddd.data.jobs.enabled=true -Ddd.service=<JOB_NAME> -Ddd.env=<ENV> -Ddd.version=<VERSION> -Ddd.tags=<KEY_1>:<VALUE_1>,<KEY_2:VALUE_2>\""
  }
}

```
## Validación

En Datadog, consulta la página [Data Jobs Monitoring][5] para ver una lista de todos tus trabajos de procesamiento de datos.

## Configuración avanzada

### Etiquetar tramos (spans) en tiempo de ejecución

{{% djm-runtime-tagging %}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/containers/kubernetes/installation/?tab=operator
[2]: /es/containers/cluster_agent/admission_controller/?tab=operator
[3]: /es/containers/datadog_operator
[4]: https://helm.sh
[5]: https://app.datadoghq.com/data-jobs/
[6]: /es/data_jobs