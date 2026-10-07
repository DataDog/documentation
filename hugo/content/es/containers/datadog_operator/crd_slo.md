---
title: CRD para SLO de Datadog
---

Para crear un [objetivo de nivel servicio][1] (SLO), puedes utilizar el Datadog Operator y la definición de recursos personalizados (CRD) `DatadogSLO`.

### Requisitos previos
- [Helm][2]
- [CLI `kubectl`][3]
- [Datadog Operator][4] v0.6 o posterior

### Configuración

1. Crea un archivo con las especificaciones de configuración de despliegue de tu `DatadogSLO`.

   **Ejemplo**: SLO [basado en un monitor][5]

   {{< code-block lang="yaml" filename="datadog-slo.yaml" collapsible="true" >}}
   apiVersion: datadoghq.com/v1alpha1
   kind: DatadogSLO
   metadata:
     name: example-slo-monitor3
     namespace: system 
   spec:
     name: example-slo-monitor3
     description: "This is an example monitor SLO from datadog-operator"
     monitorIDs:
       - 1234
     tags:
       - "service:example"
       - "env:prod"
     targetThreshold: "99.9"
     timeframe: "7d"
     type: "monitor"
   {{< /code-block >}}

   **Ejemplo**: SLO [basado en una métrica][6]

   {{< code-block lang="yaml" filename="datadog-slo.yaml" collapsible="true" >}}
   apiVersion: datadoghq.com/v1alpha1
   kind: DatadogSLO
   metadata:
     name: example-slo
     namespace: system 
   spec:
     name: example-slo
     description: "This is an example metric SLO from datadog-operator"
     query:
       denominator: "sum:requests.total{service:example,env:prod}.as_count()"
       numerator: "sum:requests.success{service:example,env:prod}.as_count()"
     tags:
       - "service:example"
       - "env:prod"
     targetThreshold: "99.9"
     timeframe: "7d"
     type: "metric"
   {{< /code-block >}}

   Para conocer todas las opciones de configuración disponibles, consulta la [referencia de la API para crear un nuevo SLO][4].

2. Despliega tu `DatadogSLO`:

   ```shell
   kubectl apply -f /path/to/your/datadog-slo.yaml
   ```

### Ejemplos adicionales
[SLO basado en una métrica con monitorización de servicio universal][8]

[1]: /es/service_management/service_level_objectives/
[2]: https://helm.sh/
[3]: https://kubernetes.io/docs/tasks/tools/install-kubectl/
[4]: /es/api/latest/service-level-objectives/#create-an-slo-object
[5]: /es/service_management/service_level_objectives/monitor/
[6]: /es/service_management/service_level_objectives/metric/
[7]: /es/api/latest/service-level-objectives/#create-an-slo-object
[8]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogslo/metric-usm-example.yaml