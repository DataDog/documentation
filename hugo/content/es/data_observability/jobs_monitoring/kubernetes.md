---
aliases:
- /es/data_jobs/kubernetes
description: 'Configure Data Observability: Jobs Monitoring para aplicaciones de Apache
  Spark en clústeres de Kubernetes mediante el Datadog Agent y Single Step Instrumentation.'
further_reading:
- link: /data_jobs
  tag: Documentación
  text: 'Data Observability: Jobs Monitoring'
title: 'Data Observability: Jobs Monitoring para Spark en Kubernetes'
---
[Data Observability: Jobs Monitoring][6] ofrece visibilidad sobre el rendimiento y la confiabilidad de las aplicaciones de Apache Spark en Kubernetes.

## Configuración {#setup}

<div class="alert alert-info">Data Observability: Jobs Monitoring requiere la versión 7.64.0 o posterior del <a href="https://github.com/DataDog/datadog-agent/releases" target="_blank">Datadog Agent</a> y la versión 1.38.0 o posterior del <a href="https://github.com/DataDog/dd-trace-java/releases" target="_blank">rastreador de Java</a>.</div>

Siga estos pasos para habilitar Data Observability: Jobs Monitoring para Spark en Kubernetes.

1. [Instale el Datadog Agent](#install-the-datadog-agent-on-your-kubernetes-cluster) en su clúster de Kubernetes.
2. (Opcional) [Recopile el linaje de datos de Spark con OpenLineage](#optional-collect-spark-data-lineage-with-openlineage).
3. [Habilite Single Step Instrumentation](#enable-single-step-instrumentation).

### Instale el Datadog Agent en su clúster de Kubernetes {#install-the-datadog-agent-on-your-kubernetes-cluster}

Si ya ha [instalado el Datadog Agent en su clúster de Kubernetes][1], asegúrese de haber habilitado el [Datadog Admission Controller][2]. Luego puede pasar al siguiente paso, [Habilitar Single Step Instrumentation](#enable-single-step-instrumentation).

Puede instalar el Datadog Agent mediante el [Datadog Operator][3] o [Helm][4].

{{< tabs >}}
{{% tab "Datadog Operator" %}}
### Requisitos previos {#prerequisites}
- Versión del clúster de Kubernetes v1.20.X+
- [`Helm`][1]
- La [`kubectl` CLI][2]

### Instalación {#installation}
1. Instale el Datadog Operator ejecutando los siguientes comandos:
   ```shell
   helm repo add datadog https://helm.datadoghq.com
   helm install my-datadog-operator datadog/datadog-operator
   ```
1. Cree un [Kubernetes Secret][3] para almacenar su clave de API de Datadog.
   ```shell
   kubectl create secret generic datadog-secret --from-literal api-key=<DATADOG_API_KEY>
   ```
   Reemplace `<DATADOG_API_KEY>` con su [clave de API de Datadog][4].
1. Cree un archivo, `datadog-agent.yaml`, que contenga la siguiente configuración:

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
   Reemplace `<DATADOG_SITE>` con su [sitio de Datadog][5]. Su sitio es {{< region-param key="dd_site" code="true" >}}. (Asegúrese de que el SITE correcto esté seleccionado a la derecha).

   Reemplace `<DATADOG_AGENT_VERSION>` con la versión `7.64.0` o posterior.

   **Opcional**: Quite los comentarios de la sección `logCollection` para comenzar a recopilar logs de aplicaciones que se correlacionarán con los traces de ejecución de trabajos de Spark. Una vez habilitada, los logs se recopilan de todos los contenedores descubiertos de forma predeterminada. Consulte la [documentación de recopilación de logs de Kubernetes][7] para obtener más detalles sobre el proceso de configuración.
1. Implemente el Datadog Agent con el archivo de configuración anterior:
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

1. Cree un [Kubernetes Secret][1] para almacenar su clave de API de Datadog.
   ```shell
   kubectl create secret generic datadog-secret --from-literal api-key=<DATADOG_API_KEY>
   ```
   Reemplace `<DATADOG_API_KEY>` con su [clave de API de Datadog][2].
1. Cree un archivo, `datadog-values.yaml`, que contenga la siguiente configuración:
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
   Reemplace `<DATADOG_SITE>` con su [sitio de Datadog][4]. Su sitio es {{< region-param key="dd_site" code="true" >}}. (Asegúrese de que el SITE correcto esté seleccionado a la derecha).

   Reemplace `<DATADOG_AGENT_VERSION>` con la versión `7.64.0` o posterior.

   **Opcional**: Quite los comentarios de la sección de logs para comenzar a recopilar logs de aplicaciones que se correlacionarán con los traces de ejecución de trabajos de Spark. Una vez habilitada, los logs se recopilan de todos los contenedores descubiertos de forma predeterminada. Consulte la [documentación de recopilación de logs de Kubernetes][5] para obtener más detalles sobre el proceso de configuración.
1. Ejecute el siguiente comando:
   ```shell
   helm install <RELEASE_NAME> \
    -f datadog-values.yaml \
    --set targetSystem=<TARGET_SYSTEM> \
    datadog/datadog
   ```

   - Reemplace `<RELEASE_NAME>` con el nombre de su release. Por ejemplo, `datadog-agent`.

   - Reemplace `<TARGET_SYSTEM>` con el nombre de su sistema operativo. Por ejemplo, `linux` o `windows`.

[1]: https://kubernetes.io/docs/concepts/configuration/secret/
[2]: https://app.datadoghq.com/organization-settings/api-keys
[4]: /es/getting_started/site
[5]: /es/containers/kubernetes/log/?tab=helm#log-collection
{{% /tab %}}
{{< /tabs >}}

### (Opcional) Recopile el linaje de datos de Spark con OpenLineage {#optional-collect-spark-data-lineage-with-openlineage}

Data Observability: Jobs Monitoring puede recopilar el linaje de Spark a través de [OpenLineage][8], para que pueda ver las tablas ascendentes y descendentes de sus trabajos y visualizar pipelines completos de Spark. La configuración consta de dos pasos: instale el proveedor de OpenLineage Spark y luego habilite la función en el rastreador de Java.

<div class="alert alert-info">La recopilación de linaje de OpenLineage requiere la versión 1.48.0 o posterior del <a href="https://github.com/DataDog/dd-trace-java/releases" target="_blank">rastreador de Java</a>.</div>

1. **Instale el proveedor de OpenLineage Spark.** Haga que el JAR de `openlineage-spark` esté disponible en el classpath de su controlador y ejecutores de Spark, siguiendo la [guía de instalación de OpenLineage Spark][9]. Utilice la versión `1.29.0` o posterior de OpenLineage, que es la primera versión que admite las facetas de etiquetas de ejecución de las que depende Data Observability: Jobs Monitoring.

   No necesita establecer `spark.extraListeners` ni configurar ninguna opción de `spark.openlineage.transport.*`. Cuando la función está habilitada y el JAR está presente, el rastreador de Java de Datadog registra el listener de OpenLineage y enruta los eventos de linaje a través del Datadog Agent local.

2. **Habilite la recopilación de OpenLineage.** Establezca la variable de entorno `DD_DATA_JOBS_OPENLINEAGE_ENABLED` en `true` en el controlador de Spark.

   Si utiliza [Single Step Instrumentation](#enable-single-step-instrumentation), agréguela a la sección `ddTraceConfigs` del destino `spark-driver`:

   ```yaml
   ddTraceConfigs:
     - name: DD_DATA_JOBS_ENABLED
       value: "true"
     - name: DD_INTEGRATIONS_ENABLED
       value: "false"
     - name: DD_DATA_JOBS_OPENLINEAGE_ENABLED
       value: "true"
   ```

   Vuelva a aplicar su configuración y reinicie los pods seleccionados.

### Habilitar Single Step Instrumentation {#enable-single-step-instrumentation}

Single Step Instrumentation (SSI) inyecta el rastreador de Java en los pods del controlador y de los ejecutores de Spark al iniciarse. Funciona independientemente de si su controlador de Spark se ejecuta en **modo clúster** (como un pod de Kubernetes dedicado) o **modo cliente** (como un proceso dentro de su pod de envío; por ejemplo, un programador o trabajador de Airflow).

Spark establece automáticamente `spark-role: driver` en los pods de controlador y `spark-role: executor` en los pods de ejecutor. En modo cliente, reemplace `spark-role: driver` con las etiquetas que identifican a su pod de envío. Para encontrar esas etiquetas, ejecute:

```shell
kubectl get pod <SUBMITTER_POD_NAME> -n <NAMESPACE> --show-labels
```

{{< tabs >}}
{{% tab "Datadog Operator" %}}

Requiere la versión 1.13.0 o posterior de [Datadog Operator][100].

Agregue la sección `features.apm.instrumentation` a su `datadog-agent.yaml` y aplíquela:

```yaml
features:
  apm:
    instrumentation:
      enabled: true
      targets:
        - name: spark-driver
          namespaceSelector:
            matchNames:
              - <NAMESPACE>   # namespace where your Spark jobs run
          podSelector:
            matchLabels:
              spark-role: driver   # replace with your submitter pod labels if running in client mode
          ddTraceVersions:
            java: "latest"
          ddTraceConfigs:
            - name: DD_DATA_JOBS_ENABLED
              value: "true"
            - name: DD_INTEGRATIONS_ENABLED
              value: "false"   # in client mode, see the note below
        - name: spark-executor
          namespaceSelector:
            matchNames:
              - <NAMESPACE>
          podSelector:
            matchLabels:
              spark-role: executor
          ddTraceVersions:
            java: "latest"
          ddTraceConfigs:
            - name: DD_DATA_JOBS_ENABLED
              value: "true"
            - name: DD_INTEGRATIONS_ENABLED
              value: "false"
```

```shell
kubectl apply -f /path/to/your/datadog-agent.yaml
```

[100]: https://github.com/DataDog/datadog-operator/releases

{{% /tab %}}
{{% tab "Helm" %}}

Agregue lo siguiente a su `datadog-values.yaml` y aplíquelo:

```yaml
datadog:
  apm:
    instrumentation:
      enabled: true
      targets:
        - name: spark-driver
          namespaceSelector:
            matchNames:
              - <NAMESPACE>   # namespace where your Spark jobs run
          podSelector:
            matchLabels:
              spark-role: driver   # replace with your submitter pod labels if running in client mode
          ddTraceVersions:
            java: "latest"
          ddTraceConfigs:
            - name: DD_DATA_JOBS_ENABLED
              value: "true"
            - name: DD_INTEGRATIONS_ENABLED
              value: "false"   # in client mode, see the note below
        - name: spark-executor
          namespaceSelector:
            matchNames:
              - <NAMESPACE>
          podSelector:
            matchLabels:
              spark-role: executor
          ddTraceVersions:
            java: "latest"
          ddTraceConfigs:
            - name: DD_DATA_JOBS_ENABLED
              value: "true"
            - name: DD_INTEGRATIONS_ENABLED
              value: "false"
```

```shell
helm upgrade <RELEASE_NAME> datadog/datadog -f datadog-values.yaml
```

{{% /tab %}}
{{< /tabs >}}

Después de aplicar la configuración, reinicie los pods seleccionados. SSI inyecta el contenedor de inicialización en cada pod al iniciarse.

`DD_INTEGRATIONS_ENABLED=false` mantiene la instrumentación de Spark y deshabilita todas las demás integraciones del rastreador (por ejemplo, AWS SDK, JDBC o clientes HTTP) en los pods seleccionados, por lo que solo se envían datos de Jobs Monitoring. Elimínelo si también desea trazas de APM de estas integraciones.

<div class="alert alert-warning">En modo cliente, el <code>spark-driver</code> objetivo coincide con su pod de envío. Si ese pod también ejecuta una aplicación que envía sus propias trazas de APM, no configure <code>DD_INTEGRATIONS_ENABLED</code> a <code>false</code> en ese objetivo.</div>

## Validación {#validation}

En Datadog, vea la página [Data Observability: Jobs Monitoring][5] para ver una lista de todos sus trabajos de procesamiento de datos.

## Configuración avanzada{#advanced-configuration}

### Establecer etiquetas de servicio, entorno y versión {#set-service-environment-and-version-tags}

Para adjuntar etiquetas de servicio, entorno y versión a las trazas de sus trabajos, pase las siguientes opciones de JVM en su configuración de spark-submit o `spark-defaults.conf`:

```
spark.driver.extraJavaOptions=-Ddd.service=<JOB_NAME> -Ddd.env=<ENV> -Ddd.version=<VERSION>
spark.executor.extraJavaOptions=-Ddd.service=<JOB_NAME> -Ddd.env=<ENV> -Ddd.version=<VERSION>
```

### Etiquetar tramos en tiempo de ejecución {#tag-spans-at-runtime}

{{% djm-runtime-tagging %}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/containers/kubernetes/installation/?tab=operator
[2]: /es/containers/cluster_agent/admission_controller/?tab=operator
[3]: /es/containers/datadog_operator
[4]: https://helm.sh
[5]: https://app.datadoghq.com/data-jobs/
[6]: /es/data_jobs
[8]: https://openlineage.io/
[9]: https://openlineage.io/docs/integrations/spark/installation