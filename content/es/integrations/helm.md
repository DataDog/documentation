---
app_id: helm
app_uuid: 754a061c-d896-4f3c-b54e-87125bb66241
assets:
  dashboards:
    Helm - Overview: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: helm.release
      metadata_path: metadata.csv
      prefix: helm.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10257
    source_type_name: Helm
  monitors:
    Release is failed: assets/monitors/monitor_failed_releases.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- configuración y despliegue
- contenedores
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/helm/README.md
display_on_public_website: true
draft: false
git_integration_title: helm
integration_id: helm
integration_title: Check de Helm
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: helm
public_title: Check de Helm
short_description: Seguimiento de los despliegues de Helm con Datadog
supported_os:
- Linux
- macOS
- Windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::macOS
  - Sistema operativo compatible::Windows
  - Categoría::Configuración y despliegue
  - Categoría::Contenedores
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Seguimiento de los despliegues de Helm con Datadog
  media: []
  overview: README.md#Información general
  resources:
  - resource_type: Blog
    url: https://www.datadoghq.com/blog/monitor-helm-kubernetes-with-datadog/
  support: README.md#Soporte
  title: Check de Helm
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Información general

Este check monitoriza los despliegues de Helm a través del Datadog Agent.

Helm soporta múltiples backends de almacenamiento. En la versión 3, Helm utiliza por defecto secretos Kubernetes, y en la versión 2, Helm utiliza por defecto ConfigMaps. Este check es compatible con ambas opciones.

## Configuración

### Instalación

El check de Helm está incluido en el paquete del [Datadog Agent][1].
No es necesaria ninguna instalación adicional en tu servidor.

### Configuración

{{< tabs >}}
{{% tab "Helm" %}}

Este es un check de clúster. Puedes activar este check añadiendo `datadog.helmCheck.enabled` a tu Helm chart.

**Nota**: Si no se requiere ninguna configuración, se puede pasar un `conf.d` vacío.

Para obtener más información, consulte la [documentación del check de clúster][1].

[1]: https://docs.datadoghq.com/es/agent/cluster_agent/clusterchecks/
{{% /tab %}}
{{% tab "Operator (v1.5.0 o posterior)" %}}

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
{{% tab "Operator (v1.5.0 o anterior)" %}}

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

[Ejecuta el subcomando de estado del Agent][2] y busca `helm` en la sección **Checks**.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "helm" >}}


### Eventos

Este check emite eventos cuando la opción `collect_events` se configura como `true`. El valor predeterminado es `false`.

Cuando la opción está activada, el check emite eventos si:
- Se despliega una nueva versión.
- Se elimina una versión.
- Se actualiza una versión (nueva revisión).
- Hay un cambio de estado, por ejemplo de desplegado a sustituido.

### Checks de servicio
{{< get-service-checks-from-git "helm" >}}


## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][3].

## Referencias adicionales

Más enlaces, artículos y documentación útiles:

- [Blog: Monitorización de tus aplicaciones Kubernetes gestionadas por Helm con Datadog][4]



[1]: https://docs.datadoghq.com/es/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[3]: https://docs.datadoghq.com/es/help/
[4]: https://www.datadoghq.com/blog/monitor-helm-kubernetes-with-datadog/