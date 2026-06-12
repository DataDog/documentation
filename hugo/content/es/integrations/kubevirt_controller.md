---
app_id: kubevirt-controller
app_uuid: f213050d-a54c-4a72-bf51-e9290a7d050c
assets:
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check:
      - kubevirt_controller.virt_controller.leading_status
      - kubevirt_controller.virt_controller.ready_status
      metadata_path: metadata.csv
      prefix: kubevirt_controller.
    process_signatures:
    - virt-controller
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 22545001
    source_type_name: KubeVirt Controller
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
- https://github.com/DataDog/integrations-core/blob/master/kubevirt_controller/README.md
display_on_public_website: true
draft: false
git_integration_title: kubevirt_controller
integration_id: kubevirt-controller
integration_title: KubeVirt Controller
integration_version: 1.1.0
is_public: true
manifest_version: 2.0.0
name: kubevirt_controller
public_title: KubeVirt Controller
short_description: Recopila métricas clave para monitorizar el estado de tu servicio
  KubeVirt Controller.
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
    Controller.
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: KubeVirt Controller
---

<!--  FUENTE https://github.com/DataDog/integrations-core -->


<div class="alert alert-danger">
Esta integración se encuentra en fase beta pública y debe activarse en cargas de trabajo de producción con precaución.
</div>

## Información general

Este check monitoriza [KubeVirt Controller]][1] a través del Datadog Agent.

## Configuración

Sigue las instrucciones a continuación para instalar y configurar este check para un Agent que se ejecuta en un host. Para entornos en contenedores, consulta las [plantillas de integración de Autodiscovery][2] para obtener orientación sobre la aplicación de estas instrucciones.

### Instalación

El check de KubeVirt Controller está incluido en el paquete del [Datadog Agent][3].
No es necesaria ninguna instalación adicional en tu servidor.

### Configuración

El caso de uso principal para ejecutar el check `kubevirt_controller` es como [check a nivel de clúster][4].

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
  namespace: default
```

2. Anote la plantilla de pods de tu despliegue `virt-controller` colocando un parche al recurso `KubeVirt` como se indica a continuación:

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
        resourceName: virt-controller
        patch: '{"spec": {"template":{"metadata":{"annotations":{ "ad.datadoghq.com/virt-controller.check_names": "[\"kubevirt_controller\"]", "ad.datadoghq.com/virt-controller.init_configs": "[{}]", "ad.datadoghq.com/virt-controller.instances": "[{ \"kubevirt_controller_metrics_endpoint\": \"https://%%host%%:%%port%%/metrics\",\"kubevirt_controller_healthz_endpoint\": \"https://%%host%%:%%port%%/healthz\", \"kube_namespace\":\"%%kube_namespace%%\", \"kube_pod_name\":\"%%kube_pod_name%%\", \"tls_verify\": \"false\"}]"}}}}}'
        type: strategic
```

Sustituye `<DD_CLUSTER_NAME>` por el nombre que hayas elegido para tu clúster.

### Validación

[Ejecuta el subcomando `clusterchecks` del Cluster Agent][5] dentro de tu contenedor del Cluster Agent y busca el check `kubevirt_controller` en la sección Checks.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "kubevirt-controller" >}}


### Eventos

La integración KubeVirt Controller no incluye eventos.

### Checks de servicio

La integración KubeVirt Controller no incluye checks de servicios.

## Resolución de problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][7].

[1]: https://docs.datadoghq.com/es/integrations/kubevirt_controller
[2]: https://docs.datadoghq.com/es/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://docs.datadoghq.com/es/containers/cluster_agent/clusterchecks/?tab=datadogoperator
[5]: https://docs.datadoghq.com/es/containers/troubleshooting/cluster-and-endpoint-checks/#dispatching-logic-in-the-cluster-agent
[6]: https://github.com/DataDog/integrations-core/blob/master/kubevirt_controller/metadata.csv
[7]: https://docs.datadoghq.com/es/help/