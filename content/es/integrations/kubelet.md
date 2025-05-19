---
"app_id": "kubelet"
"app_uuid": "8afd5500-0b72-4574-95f9-81282e2bd535"
"assets":
  "integration":
    "configuration":
      "spec": "assets/configuration/spec.yaml"
    "events":
      "creates_events": false
    "metrics":
      "check": "kubernetes.cpu.usage.total"
      "metadata_path": "metadata.csv"
      "prefix": "Kubernetes."
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_name": "Kubelet"
"author":
  "homepage": "https://www.datadoghq.com"
  "name": "Datadog"
  "sales_email": "info@datadoghq.com"
  "support_email": "help@datadoghq.com"
"categories":
- "containers"
"custom_kind": "integración"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/kubelet/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "kubelet"
"integration_id": "kubelet"
"integration_title": "Kubelet"
"integration_version": "9.1.0"
"is_public": true
"manifest_version": "2.0.0"
"name": "kubelet"
"public_title": "Kubelet"
"short_description": "Recopilación de estadísticas de contenedor de kubelet."
"supported_os":
- "linux"
- "macos"
- "windows"
"tile":
  "changelog": "CHANGELOG.md"
  "classifier_tags":
  - "Supported OS::Linux"
  - "Supported OS::macOS"
  - "Supported OS::Windows"
  - "Category::Contenedores"
  - "Offering::Integración"
  "configuration": "README.md#Configuración"
  "description": "Recopilación de estadísticas de contenedor de kubelet."
  "media": []
  "overview": "README.md#Información general"
  "support": "README.md#Soporte"
  "title": "Kubelet"
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Información general

Esta integración obtiene métricas de contenedor de kubelet

- Visualización y monitorización de estadísticas kubelet
- Recibe notificaciones sobre fallos y eventos de kubelet.

## Configuración

### Instalación

El check de Kubelet está incluido en el paquete del [Datadog Agent][1], por lo que no necesitas instalar nada más en tus servidores.

### Configuración

Edita el archivo `kubelet.d/conf.yaml`, que se encuentra en la carpeta `conf.d/` en la raíz del [directorio de configuración del Agent][2]. Para ver todas las opciones de configuración disponibles, consulta el [ejemplo kubelet.d/conf.yaml][3].

### Validación

[Ejecuta el subcomando de estado del Agent][4] y busca `kubelet` en la sección Checks.

### Compatibilidad

El check de kubelet puede funcionar en dos modos:

- El modo Prometheus predeterminado es compatible con Kubernetes versión 1.7.6 o posterior.
- El modo cAdvisor (habilitado mediante la opción `cadvisor_port` ) debería ser compatible con las versiones 1.3 y posteriores. La constancia del etiquetado y el filtrado requieren al menos la versión 6.2 del Agent.

## Compatibilidad con OpenShift v3.7 o anterior

El puerto 4194 de cAdvisor está deshabilitado por defecto en OpenShift. Para habilitarlo, debes añadir
las siguientes líneas a tu [archivo node-config][5]:

```text
kubeletArguments:
  cadvisor-port: ["4194"]
```

Si no puedes abrir el puerto, deshabilita ambas fuentes de recopilación de métricas de contenedor, configurando:

- `cadvisor_port` en `0`
- `metrics_endpoint` en `""`

El check todavía puede recopilar:

- checks de servicio del estado de kubelet
- métricas de pods en ejecución/detenidas
- límites y solicitudes de pods
- métricas de capacidad del nodo

## Datos recopilados

### Checks de servicio
{{< get-service-checks-from-git "kubelet" >}}


### Contenedores excluidos

Para restringir los datos recopilados a un subconjunto de los contenedores desplegados, configura la [variable de entorno `DD_CONTAINER_EXCLUDE`][7]. No se incluyen los métricas de los contenedores especificados en esa variable de entorno.

En el caso de las métricas de red notificadas a nivel de pod, los contenedores no pueden excluirse basándose en `name` o `image name` ya que es posible que otros contenedores formen parte del mismo pod. De esta manera, si `DD_CONTAINER_EXCLUDE` se aplica a un espacio de nombres, las métricas a nivel de pod no se notifican si el pod está en ese espacio de nombres. Sin embargo, si `DD_CONTAINER_EXCLUDE` se refiere a un nombre de contenedor o a un nombre de imagen, las métrica a nivel de pod se notifican aunque las reglas de exclusión se apliquen a algunos contenedores del pod.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][8].


[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: https://github.com/DataDog/integrations-core/blob/master/kubelet/datadog_checks/kubelet/data/conf.yaml.default
[4]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[5]: https://docs.openshift.org/3.7/install_config/master_node_configuration.html#node-configuration-files
[6]: https://github.com/DataDog/integrations-core/blob/master/kubelet/assets/service_checks.json
[7]: https://docs.datadoghq.com/agent/guide/autodiscovery-management/?tab=containerizedagent
[8]: https://docs.datadoghq.com/help/

