---
app_id: kubevirt-api
app_uuid: 6b760149-4a9f-4ec7-a5bf-081fcd1d75b0
assets:
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check:
      - kubevirt_api.process.cpu_seconds.count
      - kubevirt_api.proceso.open_fds
      metadata_path: metadata.csv
      prefix: kubevirt_api.
    process_signatures:
    - virt-api
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 21556836
    source_type_name: KubeVirt API
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- rastreo
- Kubernetes
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/kubevirt_api/README.md
display_on_public_website: true
draft: false
git_integration_title: kubevirt_api
integration_id: kubevirt-api
integration_title: KubeVirt API
integration_version: 1.2.0
is_public: true
manifest_version: 2.0.0
name: kubevirt_api
public_title: KubeVirt API
short_description: Recopila métricas clave para monitorizar el estado de tu servicio
  KubeVirt API.
supported_os:
- linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Containers
  - Categoría::Kubernetes
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Sistema operativo compatible::macOS
  - Oferta::Integración
  - Submitted Data Type::Metrics
  configuration: README.md#Configuración
  description: Recopila métricas clave para monitorizar el estado de tu servicio KubeVirt
    API.
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: KubeVirt API
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-core -->


<div class="alert alert-warning">
Esta integración se encuentra en fase beta pública y debe activarse en cargas de trabajo de producción con precaución.
</div>

## Información general

Este check monitoriza [KubeVirt API][1] a través del Datadog Agent.

## Configuración

Sigue las instrucciones a continuación para instalar y configurar este check para un Agent que se ejecuta en un host. Para entornos en contenedores, consulta las [plantillas de integración de Autodiscovery][2] para obtener orientación sobre la aplicación de estas instrucciones.

### Instalación

El check de KubeVirt API está incluido en el paquete del [Datadog Agent][3].
No es necesaria ninguna instalación adicional en tu servidor.

### Configuración

El caso de uso principal para ejecutar el check `kubevirt_api` es como [check a nivel de clúster][4].

Para ello, tendrás que actualizar algunos permisos RBAC para proporcionar al servicio `datadog-agent` acceso de sólo lectura a los recursos `KubeVirt`, siguiendo los pasos que se indican a continuación:

1. Vincula el ClusterRole `kubevirt.io:view` a la cuenta de servicio `datadog-agent`:

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: datadog-agent-kubevirt
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: kubevirt.io:view
subjects:
  - kind: ServiceAccount
    name: datadog-agent
    namespace: <DD_NAMESPACE>
```

Sustituye `<DD_NAMESPACE>` por el espacio de nombres donde instalaste la cuenta de servicio del `Datadog-Agent`.

2. Anota la plantilla de pods de tu despliegue `virt-api` parcheando el recurso `KubeVirt` como se indica a continuación:

```yaml
apiVersion: kubevirt.io/v1
kind: KubeVirt
metadata:
  name: kubevirt
  namespace: kubevirt
spec:
  certificateRotateStrategy: {}
  configuration: {}
  customizeComponents:
    patches:
      - resourceType: Deployment
        resourceName: virt-api
        patch: '{"spec":{"template":{"metadata":{"annotations":{"ad.datadoghq.com/virt-api.check_names":"[\"kubevirt_api\"]","ad.datadoghq.com/virt-api.init_configs":"[{}]","ad.datadoghq.com/virt-api.instances":"[{\"kubevirt_api_metrics_endpoint\":\"https://%%host%%:%%port%%/metrics\",\"kubevirt_api_healthz_endpoint\":\"https://%%host%%:%%port%%/healthz\",\"kube_namespace\":\"%%kube_namespace%%\",\"kube_pod_name\":\"%%kube_pod_name%%\",\"tls_verify\":\"false\"}]"}}}}}'
        type: strategic
```

### Validación

[Ejecuta el subcomando `clusterchecks` del Cluster Agent][5] dentro de tu contenedor del Cluster Agent y busca el check `kubevirt_api` en la sección Checks.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "kubevirt_api" >}}


### Eventos

La integración KubeVirt API no incluye eventos.

### Checks de servicio

La integración KubeVirt API no incluye checks de servicios.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][7].

[1]: https://docs.datadoghq.com/es/integrations/kubevirt_api
[2]: https://docs.datadoghq.com/es/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://docs.datadoghq.com/es/containers/cluster_agent/clusterchecks/?tab=datadogoperator
[5]: https://docs.datadoghq.com/es/containers/troubleshooting/cluster-and-endpoint-checks/#dispatching-logic-in-the-cluster-agent
[6]: https://github.com/DataDog/integrations-core/blob/master/kubevirt_api/metadata.csv
[7]: https://docs.datadoghq.com/es/help/