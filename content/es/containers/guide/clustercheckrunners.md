---
aliases:
- /es/agent/cluster_agent/clusterchecksrunner
- /es/containers/cluster_agent/clusterchecksrunner
further_reading:
- link: https://www.datadoghq.com/blog/datadog-cluster-agent/
  tag: Blog
  text: Presentación del Datadog Cluster Agent
- link: https://www.datadoghq.com/blog/autoscale-kubernetes-datadog/
  tag: Blog
  text: Autoescalar sus cargas de trabajo Kubernetes con cualquier métrica Datadog
- link: /containers/cluster_agent/clusterchecks/
  tag: Documentación
  text: Checks de clúster (Cluster Checks)
kind: documentación
title: Cluster Check Runners
---

El Cluster Agent puede enviar dos tipos de checks: [checks de endpoint][1] y [checks de clúster][2]. Los checks son ligeramente diferentes. 

Los checks de endpoint se envían específicamente al Datadog Agent regular en el mismo nodo que los endpoints del pod de aplicación. La ejecución de los checks de endpoint en el mismo nodo que el endpoint de la aplicación permite el correcto etiquetado de las métricas.

Los checks de clúster monitorizan servicios de Kubernetes internos, así como servicios externos como bases de datos gestionadas y dispositivos de red, y pueden despacharse con mucha más libertad.
El uso de Cluster Check Runners es opcional. Cuando se utiliza Cluster Check Runners, un pequeño conjunto dedicado de Agents ejecuta los checks de clúster, dejando los checks de endpoint a los Agents normales. Esta estrategia puede ser útil para controlar el envío de checks de clúster, en especial cuando aumenta la escala de tus checks de clúster.

## Configuración

En primer lugar, [despliega el Cluster Agent][3].

A continuación, despliega el Cluster Check Runner utilizando [Datadog Operator][4] o [Helm][5]:

{{< tabs >}}
{{% tab "Operator" %}}

Con el Operador, puedes lanzar y gestionar todos estos recursos con un único manifiesto. Por ejemplo:

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>
      appKey: <DATADOG_APP_KEY>
    clusterAgentToken: <DATADOG_CLUSTER_AGENT_TOKEN>
  features:
    clusterChecks:
      enabled: true
      useClusterChecksRunners: true
  override:
    clusterAgent:
      replicas: 2
```

Despliega estos recursos en tu clúster:

```
kubectl apply -f datadog-agent-with-dca-clusterchecksrunner.yaml
```

Si ves el siguiente resultado, confirma que la configuración se ha aplicado correctamente:

```
datadogagent.datadoghq.com/datadog created
```

Consulta el [repositorio de Datadog Operator][1] para obtener más información sobre Datadog Operator.


[1]: https://github.com/DataDog/datadog-operator
{{% /tab %}}
{{% tab "Helm" %}}

Puedes actualizar las secciones pertinentes del gráfico para habilitar checks de clúster, el Cluster Agent y el Cluster Check Runner al mismo tiempo. Por ejemplo:

```yaml
datadog:
  clusterChecks:
    enabled: true
  #(...)

clusterAgent:
  enabled: true
  #(...)

clusterChecksRunner:
  enabled: true
  replicas: 2
```


{{% /tab %}}
{{< /tabs >}}

**Nota**: Tanto Datadog Operator como la tabla de Helm utilizan `podAntiAffinity` para evitar tener múltiples Cluster Check Runners en el mismo nodo. Esto es importante porque el Cluster Agent identifica los Cluster Check Runners por sus nombres de nodo. Usar `podAntiAffinity` evita tener nombres repetidos.


[1]: https://docs.datadoghq.com/es/agent/cluster_agent/endpointschecks/
[2]: https://docs.datadoghq.com/es/agent/cluster_agent/clusterchecks/
[3]: https://docs.datadoghq.com/es/agent/cluster_agent/setup/
[4]: https://github.com/DataDog/datadog-operator
[5]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/values.yaml