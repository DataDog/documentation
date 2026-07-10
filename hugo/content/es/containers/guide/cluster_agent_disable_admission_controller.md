---
description: Desactivar y eliminar de forma segura el Datadog Admission Controller
  de tu clúster Kubernetes utilizando el Cluster Agent
further_reading:
- link: https://www.datadoghq.com/blog/datadog-cluster-agent/
  tag: Blog
  text: Introducción al Datadog Cluster Agent
- link: /containers/cluster_agent/admission_controller/
  tag: Documentación
  text: Controlador de admisión de Datadog
- link: /agent/cluster_agent/troubleshooting/
  tag: Documentación
  text: Solucionar problemas del Datadog Cluster Agent
title: Desactiva el Datadog Admission Controller con el Cluster Agent
---

## Información general

El Datadog Cluster Agent gestiona el Datadog Admission Controller creando, actualizando y eliminando Admission Controllers según sea necesario.
Para desactivar Admission Controller o eliminar el Cluster Agent, primero debes desactivar las funciones del Admission Controller en la configuración del Cluster Agent y volver a desplegar el Cluster Agent.
Una vez eliminados los Admission Controllers, se puede eliminar el Cluster Agent de forma segura si es necesario.

## Requisitos previos

Datadog Cluster Agent v7.63+

## Pasos

{{< tabs >}}
{{% tab "Datadog Operator" %}}
Para desactivar los Admission Controllers con tu Cluster Agent gestionado por el Datadog Operador:
1. Configura `features.admissionController.enabled` como `false` en tu configuración del `DatadogAgent`.
2. Establece `features.admissionController.validation.enabled` en `false` en tu configuración del `DatadogAgent`.
3. Establece `features.admissionController.mutation.enabled` en `false` en tu configuración del `DatadogAgent`.

```yaml
  apiVersion: datadoghq.com/v2alpha1
  kind: DatadogAgent
  metadata:
    name: datadog
  spec:
    features:
      admissionController:
        enabled: false
        validation:
          enabled: false
        mutation:
          enabled: false
```


Después de volver a desplegar el Cluster Agent con la configuración actualizada, se eliminan los Admission Controllers.
{{% /tab %}}
{{% tab "Helm" %}}
Para desactivar los Admission Controllers con tu Cluster Agent gestionado por el Helm Chart de Datadog:
1. Configura `clusterAgent.admissionController.enabled` como `false`.
2. Configura `clusterAgent.admissionController.validation.enabled` en `false`.
3. Configura `clusterAgent.admissionController.mutation.enabled` en `false`.

```yaml
clusterAgent:
  enabled: true
  admissionController:
    enabled: false
    validation:
      enabled: false
    mutation:
      enabled: false
```
{{% /tab %}}
{{% /tabs %}}

Puedes confirmar que los Admission Controllers se han eliminado comprobando los recursos `ValidatingWebhookConfiguration` y `MutatingWebhookConfiguration` en tu clúster.

```shell
kubectl get validatingwebhookconfigurations.admissionregistration.k8s.io
```

```shell
kubectl get mutatingwebhookconfigurations.admissionregistration.k8s.io
```

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}