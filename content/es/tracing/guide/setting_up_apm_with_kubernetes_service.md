---
further_reading:
- link: /containers/kubernetes/apm/
  tag: Documentación
  text: Configurar la recopilación de trazas
- link: /containers/cluster_agent/admission_controller
  tag: Documentación
  text: Controlador de admisiones (Admission Controller)
title: Configurar APM con el servicio de Kubernetes
---

## Información general

En Kubernetes, los rastreadores de Datadog pueden enviar datos al Datadog Agent de tres formas: Unix Domain Socket (UDS), IP de host, o un servicio de Kubernetes. Cada opción asegura que cuando un pod de aplicación envía datos de APM, los datos llegan a un pod del Datadog Agent en el mismo nodo. Esta estrategia está pensada para equilibrar adecuadamente el tráfico y asegurar el correcto etiquetado de tus datos. Datadog recomienda que utilices UDS para enviar datos.

Sin embargo, si los volúmenes `hostPath` necesarios para UDS (y los puertos `hostPort` necesarios para utilizar IP de host) no están disponibles, puedes utilizar un servicio de Kubernetes como opción alternativa.

Esta guía describe cómo configurar mediante un servicio de Kubernetes para enviar datos al Datadog Agent.

## Configuración del servicio

En Kubernetes 1.22, la función [Política de tráfico interna][1] ofrece la opción de establecer la configuración `internalTrafficPolicy: Local` en un servicio. Cuando se configura, el tráfico de un pod de aplicación se dirige al pod de descarga del servicio *en el mismo nodo*.

Si has instalado el Datadog Agent utilizando la [Helm chart][3] de Datadog o [Datadog Operator][4] en clústeres con Kubernetes v1.22.0+, se te creará automáticamente un servicio para el Agent con `internalTrafficPolicy: Local`. Además, debes activar la opción de puerto de APM para tu Agent con la siguiente configuración.

### Configuración del Agent
{{< tabs >}}
{{% tab "Datadog Operator" %}}

Actualiza tu `datadog-agent.yaml` para establecer `features.apm.enabled` en `true`.

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  #(...)
  features:
    apm:
      enabled: true
```

{{% k8s-operator-redeploy %}}

{{% /tab %}}
{{% tab "Helm" %}}

Actualiza tu `datadog-values.yaml` para establecer `datadog.apm.portEnabled` en `true`.

```yaml
datadog:
  apm:
    portEnabled: true
```    

{{% k8s-helm-redeploy %}}

{{% /tab %}}
{{< /tabs >}}

## Configuración de la aplicación
Puedes configurar tu aplicación para utilizar el servicio de Kubernetes mediante el Controlador de admisión (Admission Controller) del Cluster Agent, o con una configuración manual.

### Controlador de admisión (Admission Controller) del Cluster Agent
El [Controlador de admisión (Admission Controller) del Cluster Agent][2] puedes inyectar la configuración para la conectividad de APM en tus contenedores. Las opciones son `hostip`, `socket` o `service`. Elige el modo `service` para que el Controlador de admisión (Admission Controller) añada la variable de entorno `DD_AGENT_HOST` para el nombre de DNS del servicio.

{{< tabs >}}
{{% tab "Datadog Operator" %}}
Actualiza tu `datadog-agent.yaml` con lo siguiente:

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  #(...)
  features:
    apm:
      enabled: true
    admissionController:
      enabled: true
      agentCommunicationMode: service
```

{{% k8s-operator-redeploy %}}

{{% /tab %}}
{{% tab "Helm" %}}

Actualiza tu `datadog-values.yaml` con lo siguiente:

```yaml
clusterAgent:
  admissionController:
    enabled: true
    configMode: service
```

{{% k8s-helm-redeploy %}}

{{% /tab %}}
{{< /tabs >}}

**Nota:** En entornos de nodo mixto (Linux/Windows), el Cluster Agent y su Controlador de admisión (Admission Controller) son relativos al despliegue de Linux. Esto puede inyectar las variables de entorno incorrectas para la conectividad del servicio en los pods de Windows.

### Configuración manual
Para la configuración manual, establece la variable de entorno `DD_AGENT_HOST` dentro de tu manifiesto de pod, con un valor de `<SERVICE_NAME>.<SERVICE_NAMESPACE>.svc.cluster.local`.

```yaml
    #(...)
    spec:
      containers:
      - name: "<CONTAINER_NAME>"
        image: "<CONTAINER_IMAGE>"
        env:
          - name: DD_AGENT_HOST
            value: <SERVICE_NAME>.<SERVICE_NAMESPACE>.svc.cluster.local
```

Sustituye `<SERVICE_NAME>` por el nombre de servicio y `<SERVICE_NAMESPACE>` por el espacio de nombres del servicio.

Por ejemplo, si tu definición del servicio tiene el siguiente aspecto:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: datadog
  namespace: monitoring
  labels:
    #(...)
spec:
  selector:
    app: datadog
  ports:
    - protocol: UDP
      port: 8125
      targetPort: 8125
      name: dogstatsdport
    - protocol: TCP
      port: 8126
      targetPort: 8126
      name: traceport
  internalTrafficPolicy: Local
```

A continuación, establece el valor de `DD_AGENT_HOST` en `datadog.monitoring.svc.cluster.local`.

```yaml
    #(...)
    spec:
      containers:
      - name: "<CONTAINER_NAME>"
        image: "<CONTAINER_IMAGE>"
        env:
          - name: DD_AGENT_HOST
            value: datadog.monitoring.svc.cluster.local
```

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://kubernetes.io/docs/concepts/services-networking/service-traffic-policy/
[2]: /es/containers/cluster_agent/admission_controller
[3]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/values.yaml
[4]: /es/containers/datadog_operator