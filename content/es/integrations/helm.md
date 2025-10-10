---
app_id: helm
categories:
- configuración y despliegue
- contenedores
custom_kind: integración
description: Seguimiento de los despliegues de Helm con Datadog
further_reading:
- link: https://www.datadoghq.com/blog/monitor-helm-kubernetes-with-datadog/
  tag: blog
  text: Monitoriza tus aplicaciones de Kubernetes gestionadas por Helm con Datadog
integration_version: 1.0.0
media: []
supported_os:
- Linux
- macOS
- Windows
title: Check de Helm
---
## Información general

Este check monitoriza los despliegues de Helm a través del Datadog Agent.

Helm admite múltiples backends de almacenamiento. En la versión 3, Helm utiliza por defecto secretos Kubernetes, y en la versión 2, Helm utiliza por defecto ConfigMaps. Este check es compatible con ambas opciones.

## Configuración

### Instalación

El check de Helm está incluido en el paquete del [Datadog Agent](https://docs.datadoghq.com/agent/kubernetes/integrations/).
No es necesaria ninguna instalación adicional en tu servidor.

### Configuración

{{< tabs >}}

{{% tab "Helm" %}}

Este es un check de clúster. Puedes activar este check añadiendo `datadog.helmCheck.enabled` a tu Helm chart.

**Nota**: Si no se requiere ninguna configuración, se puede pasar un `conf.d` vacío.

Para obtener más información, consulta la [Documentación sobre el check de clústeres](https://docs.datadoghq.com/agent/cluster_agent/clusterchecks/).

{{% /tab %}}

{{% tab "Operator (v1.5.0+)" %}}

Este es un check de clúster. Puedes activar este check añadiendo `spec.features.helmCheck.enabled` a la configuración del despliegue de tu `DatadogAgent`.

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  features:
    helmCheck:
      enabled: true
```

{{% /tab %}}

{{% tab "Operator (below v1.5.0)" %}}

Este es un check de clúster. Puedes activar este check proporcionando un archivo de configuración `helm.yaml` al Cluster Agent en la configuración del despliegue de tu `DatadogAgent`.

```
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  [...]
  override:
    clusterAgent:
      [...]
      extraConfd:
        configDataMap:
          helm.yaml: |-
            init_config:
            instances:
            - collect_events: false
```

Este check requiere permisos adicionales, vinculados a la cuenta de servicio Kubernetes, utilizada por el pod del Cluster Agent para acceder a las versiones almacenadas por Helm.

```
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: datadog-helm-check
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: datadog-helm-check
subjects:
  - kind: ServiceAccount
    name: datadog-cluster-agent
    namespace: default
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: datadog-helm-check
rules:
- apiGroups:
  - ""
  resources:
  - secrets
  - configmaps
  verbs:
  - get
  - list
  - watch
```

**Nota**: El tema `ServiceAccount` es un ejemplo con la instalación en el espacio de nombres `default`. Ajusta `name` y `namespace` en función de tu despliegue.

{{% /tab %}}

{{< /tabs >}}

### Validación

[Ejecuta el subcomando de estado del Agent] (https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `helm` en la sección Checks.

## Datos recopilados

### Métricas

Este check informa de un gauge, `helm.release`, configurado en 1 para cada versión desplegada
en el clúster. La métrica tiene tags (etiquetas) que identifican la versión de Helm como el nombre, la versión de la aplicación, la versión del gráfico y la revisión.

| | |
| --- | --- |
| **helm.release** <br>(gauge) | una versión de Helm|

### Eventos

Este check emite eventos cuando la opción `collect_events` se configura como `true`. El valor predeterminado es `false`.

Cuando la opción está activada, el check emite eventos si:

- Se despliega una nueva versión.
- Se elimina una versión.
- Se actualiza una versión (nueva revisión).
- Hay un cambio de estado, por ejemplo de desplegado a sustituido.

### Checks de servicio

**helm.release_state**

Devuelve `CRITICAL` para una versión cuando su última revisión está en estado fallido. En caso contrario, devuelve `OK`.

_Estados: ok, crítico_

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con [asistencia técnica de Datadog](https://docs.datadoghq.com/help/).

## Referencias adicionales

Documentación útil adicional, enlaces y artículos:

- [Blog: monitoriza tus aplicaciones de Kubernetes gestionadas por Helm con Datadog](https://www.datadoghq.com/blog/monitor-helm-kubernetes-with-datadog/)