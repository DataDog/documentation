---
further_reading:
- link: https://www.datadoghq.com/blog/datadog-cluster-agent/
  tag: Blog
  text: Introducción al Datadog Cluster Agent
- link: /containers/guide/cluster_agent_autoscaling_metrics
  tag: Documentación
  text: Escala automáticamente tus cargas de trabajo de Kubernetes con cualquier métrica
    de Datadog
kind: Documentación
title: Solucionar problemas del Custom Metrics Server y del HPA
---

## Estado y flare del Cluster Agent

Si tienes problemas con el Custom Metrics Server:

* Asegúrate de que tienes la capa de agregación y los certificados configurados.
* Asegúrate de que las métricas que quieres escalar automáticamente están disponibles. Cuando creas el HPA, el Datadog Cluster Agent analiza el manifiesto y consulta a Datadog para intentar obtener las métricas. Si hay un problema tipográfico con el nombre de tu métrica o si tu métrica no existe en tu cuenta de Datadog, se produce el siguiente error:

    ```text
    2018-07-03 13:47:56 UTC | ERROR | (datadogexternal.go:45 in queryDatadogExternal) | Returned series slice empty
    ```

Ejecuta el comando `agent status` para ver el estado del proceso del proveedor externo de métricas:

```text
  Custom Metrics Provider
  =======================
  External Metrics
  ================
    ConfigMap name: datadog-hpa
    Number of external metrics detected: 2
```

Los errores del proceso del proveedor externo de métricas se muestran con este comando. Si quieres ver una salida más detallada, ejecuta el comando flare: `agent flare`.

El comando flare genera un archivo zip que contiene el `custom-metrics-provider.log`, donde se puede ver el resultado de la siguiente manera:

```text
  Custom Metrics Provider
  =======================
  External Metrics
  ================
    ConfigMap name: datadog-hpa
    Number of external metrics detected: 2

    hpa:
    - name: nginxext
    - namespace: default
    labels:
    - cluster: eks
    metricName: redis.key
    ts: 1532042322
    valid: false
    value: 0

    hpa:
    - name: nginxext
    - namespace: default
    labels:
    - dcos_version: 1.9.4
    metricName: docker.mem.limit
    ts: 1.532042322
    valid: true
    value: 268435456
```

Si el indicador `Valid` de la métrica se establece como `false`, la métrica no se tendrá en cuenta en el pipeline de HPA.

## Descripción del manifiesto HPA

Si aparece el siguiente mensaje al describir el manifiesto HPA:

```text
Conditions:
  Type           Status  Reason                   Message
  ----           ------  ------                   -------
  AbleToScale    True    SucceededGetScale        the HPA controller was able to get the target's current scale
  ScalingActive  False   FailedGetExternalMetric  the HPA was unable to compute the replica count: unable to get external metric default/nginx.net.request_per_s/&LabelSelector{MatchLabels:map[string]string{kube_container_name: nginx,},MatchExpressions:[],}: unable to fetch metrics from external metrics API: the server could not find the requested resource (get nginx.net.request_per_s.external.metrics.k8s.io)

```

Entonces es probable que no cuentes con la configuración del control de acceso basado en roles (RBAC) o la conectividad de servicio adecuados para el proveedor de métricas. Asegúrate de que `kubectl get apiservices` aparece:

```text
% kubectl get apiservices
NAME                                   SERVICE                                     AVAILABLE   AGE
...
v1beta1.external.metrics.k8s.io        default/datadog-cluster-agent-metrics-api   True        57s
```

El servicio API de métricas externas aparece con `true` disponible si el servicio API, el servicio y la asignación de puertos en el pod coinciden, así como si el Cluster Agent tiene los permisos RBAC correctos. Asegúrate de haber creado los recursos desde el paso [Registrar el proveedor externo de métricas][1].

Si aparece el siguiente error al describir el manifiesto HPA:

```text
Warning  FailedComputeMetricsReplicas  3s (x2 over 33s)  horizontal-pod-autoscaler  failed to get nginx.net.request_per_s external metric: unable to get external metric default/nginx.net.request_per_s/&LabelSelector{MatchLabels:map[string]string{kube_container_name: nginx,},MatchExpressions:[],}: unable to fetch metrics from external metrics API: the server is currently unable to handle the request (get nginx.net.request_per_s.external.metrics.k8s.io)
```

Asegúrate de que el Datadog Cluster Agent se está ejecutando y de que el servicio que expone el puerto `8443`, cuyo nombre está registrado en el servicio de API, está activo.

## Diferencias de valor entre Datadog y Kubernetes

A medida que Kubernetes escala automáticamente tus recursos, el HPA toma una decisión de escalado basada en el valor de métrica proporcionado por Cluster Agent. El Cluster Agent consulta y almacena el valor exacto de métrica devuelto por la API de Datadog. Si tu HPA está utilizando un objetivo con `type: Value`, este valor exacto de métrica se proporciona al HPA. Si tu HPA está utilizando `type: AverageValue`, este valor de métrica se divide por el número actual de réplicas.

Es por esta razón que puedes ver valores devueltos como los siguientes:

```text
% kubectl get datadogmetric
NAME             ACTIVE   VALID   VALUE   REFERENCES                UPDATE TIME
example-metric   True     True    7       hpa:default/example-hpa   21s

% kubectl get hpa
NAME          REFERENCE          TARGETS         MINPODS   MAXPODS   REPLICAS   AGE
example-hpa   Deployment/nginx   3500m/5 (avg)   1         3         2          24
```

Ya que el valor de `7` se ha dividido por las réplicas `2` para dar ese promedio `3.5`. Ambos tipos son compatibles con el HPA, sólo ten en cuenta el tipo al configurar tu consulta y valor objetivo. Consulta la [guía del Cluster Agent para la configuración de ejemplos][2].

*Advertencia*: Por defecto, el Datadog Cluster Agent procesa las métricas establecidas en los diferentes manifiestos HPA y consulta a Datadog para obtener valores cada 30 segundos. Por defecto, Kubernetes consulta al Datadog Cluster Agent cada 30 segundos. Debido a que este proceso se realiza de forma asíncrona, no debes esperar que la regla anterior se verifique en todo momento, especialmente si la métrica varía. Sin embargo, es posible configurar ambas frecuencias para atenuar cualquier problema.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/containers/guide/cluster_agent_autoscaling_metrics
[2]: /es/containers/guide/cluster_agent_autoscaling_metrics/?tab=helm#value-vs-averagevalue-for-the-target-metric