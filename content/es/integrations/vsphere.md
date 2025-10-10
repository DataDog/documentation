---
"app_id": "vsphere"
"app_uuid": "d9b9104f-ffd1-42be-8e18-d8a3aa289b98"
"assets":
  "dashboards":
    "VMware vSphere - Property Metrics": "assets/dashboards/vmware_vsphere-_property_metrics.json"
    "VMware vSphere TKG - Overview": "assets/dashboards/vmware_vsphere_tkg_-_overview.json"
    "vsphere-overview": "assets/dashboards/vsphere_overview.json"
  "integration":
    "auto_install": true
    "configuration":
      "spec": "assets/configuration/spec.yaml"
    "events":
      "creates_events": true
    "metrics":
      "check":
      - "vsphere.cpu.usage.avg"
      - "vsphere.vm.count"
      "metadata_path": "metadata.csv"
      "prefix": "vsphere"
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_id": !!int "85"
    "source_type_name": "vSphere"
"author":
  "homepage": "https://www.datadoghq.com"
  "name": "Datadog"
  "sales_email": "info@datadoghq.com"
  "support_email": "help@datadoghq.com"
"categories":
- "cloud"
- "network"
"custom_kind": "integración"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/vsphere/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "vsphere"
"integration_id": "vsphere"
"integration_title": "vSphere"
"integration_version": "8.3.0"
"is_public": true
"manifest_version": "2.0.0"
"name": "vsphere"
"public_title": "vSphere"
"short_description": "Comprende cómo afecta a tu aplicación el uso de recursos vSphere"
"supported_os":
- "linux"
- "windows"
- "macos"
"tile":
  "changelog": "CHANGELOG.md"
  "classifier_tags":
  - "Category::Nube"
  - "Category::Red"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  - "Offering::Integración"
  "configuration": "README.md#Configuración"
  "description": "Comprende cómo afecta a tu aplicación el uso de recursos vSphere"
  "media": []
  "overview": "README.md#Información general"
  "resources":
  - "resource_type": "blog"
    "url": "https://www.datadoghq.com/blog/unified-vsphere-app-monitoring-datadog/#auto-discovery-across-vm-and-app-layers"
  "support": "README.md#Soporte"
  "title": "vSphere"
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


![Gráfico de Vsphere][1]

## Información general

Este check recopila métricas del uso de recursos de clúster, CPU, disco, memoria y uso de red de tu vSphere. También vigila los eventos de tu servidor vCenter y los envía a Datadog.

## Configuración

### Instalación

El check de vSphere está incluido en el paquete del [Datadog Agent][2], por lo que no necesitas instalar nada más en tus servidores de vSphere.

### Configuración

En la sección **Administración** de vCenter, añade un usuario de sólo lectura llamado `datadog-readonly` y aplica los permisos de usuario de sólo lectura a los recursos que necesiten monitorización. Para monitorizar todos los objetos secundarios de la jerarquía de recursos, selecciona la opción "Propagate to children" (Propagar a objetos secundarios).

A continuación, edita el archivo `vsphere.d/conf.yaml` que se encuentra en la carpeta `conf.d/` en la raíz del [directorio de configuración de tu Agent][3]. Para conocer todas las opciones de configuración disponibles, consulta el [vsphere.d/conf.yaml de ejemplo][4].

[Reinicia el Agent][5] para empezar a enviar métricas y eventos de vSphere a Datadog.

**Nota**: No es necesario que el Agent esté en el mismo servidor que el software de dispositivo vSphere. Un Agent con el check de vSphere habilitado puede configurarse para apuntar a un servidor de dispositivo vSphere. Actualiza tu `<HOSTNAME>` para cada instancia en consecuencia. Sólo necesitas configurar la integración de vSphere una vez para recopilar métricas sobre todo tu vCenter.

### Compatibilidad

A partir de la versión 5.0.0 del check, incluida en el paquete del Agent v6.18.0/7.18.0, se introdujo una nueva implementación que requería cambios en el archivo de configuración. Para preservar la compatibilidad con versiones anteriores, se introdujo temporalmente un parámetro de configuración denominado `use_legacy_check_version`.
Si estás actualizando desde una versión anterior de la integración, este parámetro no está definido en la configuración y obliga al Agent a utilizar la implementación anterior.
Si estás configurando la integración por primera vez o si quieres aprovechar las nuevas características (como la recopilación de etiquetas (tags) y las opciones avanzadas de filtrado), consulta el archivo de configuración [vsphere.d/conf.yaml de ejemplo][4]. En particular, asegúrate de configurar `use_legacy_check_version: false`.

### Validación

Ejecuta el [subcomando de estado del Agent][6] y busca `vsphere` en la sección **Checks**.

## Datos recopilados

Dependiendo del valor `collection_level` que definas en la configuración de tu check, no se recopilarán todas las métricas siguientes. Para ver las métricas recopilados para una recopilación determinada, consulta [Niveles de recopilación de datos][7].

### Métricas
{{< get-metrics-from-git "vsphere" >}}


#### Recopilación de métricas por instancia

**Nota**: La integración vSphere tiene la capacidad de recopilar métricas tanto por recurso (como aquellas relacionadas con las CPU), como por instancia (como aquellas relacionadas con los núcleos de CPU). De esta forma, hay métricas que sólo se recopilan por recurso, por instancia o ambos. 
Un recurso constituye una representación física o virtual de una máquina. En vSphere, esto puede representarse por máquina virtual, host, almacén de datos, clúster.
Una instancia representa entidades individuales que se encuentran dentro de un recurso. Para obtener más información sobre los recursos de vSphere, consulta la [documentación técnica con información general sobre la infraestructura de la arquitectura de VMWare][9].

Por defecto, la integración vSphere sólo recopila métricas por recurso, lo que provoca que algunas métricas que son por instancia se ignoren. Estas pueden ser configuradas utilizando la opción `collect_per_instance_filters`. Consulta un ejemplo a continuación:

```
collect_per_instance_filters:
  host:
    - 'disk\.totalLatency\.avg'
    - 'disk\.deviceReadLatency\.avg'
```

Las métricas `disk` son específicas de cada disco en el host, por lo tanto estas métricas necesitan ser habilitadas utilizando `collect_per_instance_filters` para poder ser recopiladas.

#### Recopilación de métricas de propiedades

La integración vSphere también puede recopilar métricas basadas en propiedades. Se trata de propiedades de configuración, como si un host está en modo de mantenimiento o si un clúster está configurado con DRS.

Para habilitar las métricas de propiedades, configura la siguiente opción:
```
collect_property_metrics: true
```

Las métricas de propiedades llevan el prefijo del nombre del recurso. Por ejemplo, las métricas de propiedades de host llevan el prefijo `vsphere.host.*` y las métricas de propiedades de máquina virtual llevan el prefijo `vsphere.vm.*`. Consulta todas las métricas de propiedades posibles en [metadata.csv][8].


### Eventos

Este check vigila eventos en el Gestor de eventos de vCenter y los envía a Datadog. Por defecto, el check envía los siguientes tipos de eventos:

- AlarmStatusChangedEvent
- VmBeingHotMigratedEvent
- VmReconfiguredEvent
- VmPoweredOnEvent
- VmMigratedEvent
- TaskEvent
- VmMessageEvent
- VmSuspendedEvent
- VmPoweredOffEvent

Utiliza la sección de parámetros `include_events` en el [vsphere.d/conf.yaml de ejemplo][4] para recopilar eventos adicionales de la clase `vim.event`.

### Checks de servicio
{{< get-service-checks-from-git "vsphere" >}}


## Solucionar problemas

- [Solucionar problemas de duplicación de hosts con vSphere][11]

### Limitación de máquinas virtuales

Puedes limitar el número de máquinas virtuales extraídas con la integración VMWare utilizando el archivo `vsphere.d/conf.yaml`. Consulta la sección de parámetros `resource_filters` en el [vsphere.d/conf.yaml de ejemplo][4].

## Facturación

- [Facturación de integración de vSphere][12]

## Monitorización de vSphere Tanzu Kubernetes Grid (TKG)

La integración de vSphere en Datadog recopila métricas y eventos de tus máquinas virtuales [TKG][13] y del plano de control automáticamente. Para recopilar información más detallada sobre tu clúster de TKG, incluyendo métricas de nivel de contenedor, pod y nodo, puedes instalar el [Datadog Agent][14] en tu clúster. Para ver ejemplos de archivos de configuración específicos de TKG, consulta la [documentación de la distribución][15].

## Referencias adicionales

- [Monitorizar vSphere con Datadog][16]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/vsphere/images/vsphere_graph.png
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory
[4]: https://github.com/DataDog/integrations-core/blob/master/vsphere/datadog_checks/vsphere/data/conf.yaml.example
[5]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[7]: https://docs.vmware.com/en/VMware-vSphere/7.0/com.vmware.vsphere.monitoring.doc/GUID-25800DE4-68E5-41CC-82D9-8811E27924BC.html
[8]: https://github.com/DataDog/integrations-core/blob/master/vsphere/metadata.csv
[9]: https://www.vmware.com/pdf/vi_architecture_wp.pdf
[10]: https://github.com/DataDog/integrations-core/blob/master/vsphere/assets/service_checks.json
[11]: https://docs.datadoghq.com/integrations/faq/troubleshooting-duplicated-hosts-with-vsphere/
[12]: https://docs.datadoghq.com/account_management/billing/vsphere
[13]: https://tanzu.vmware.com/kubernetes-grid
[14]: https://docs.datadoghq.com/containers/kubernetes/installation/?tab=operator
[15]: https://docs.datadoghq.com/containers/kubernetes/distributions/?tab=operator#TKG
[16]: https://www.datadoghq.com/blog/unified-vsphere-app-monitoring-datadog/#auto-discovery-across-vm-and-app-layers

