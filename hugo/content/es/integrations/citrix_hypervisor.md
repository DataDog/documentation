---
app_id: citrix-hypervisor
app_uuid: cf4ad6ea-85ae-4f7d-8e79-7b8d36924425
assets:
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: citrix_hypervisor.host.cpu
      metadata_path: metadata.csv
      prefix: citrix_hypervisor.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10198
    source_type_name: Citrix Hypervisor
  monitors:
    CPU load is high: assets/monitors/host_cpu_high.json
    VM's CPU load is high: assets/monitors/vm_cpu_high.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- nube
- recopilación de logs
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/citrix_hypervisor/README.md
display_on_public_website: true
draft: false
git_integration_title: citrix_hypervisor
integration_id: citrix-hypervisor
integration_title: Citrix Hypervisor
integration_version: 5.1.1
is_public: true
manifest_version: 2.0.0
name: citrix_hypervisor
public_title: Citrix Hypervisor
short_description: Monitoriza el estado y el rendimiento de un host de Citrix Hypervisor.
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
  - Categoría::Nube
  - Categoría::Recopilación de logs
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Monitoriza el estado y el rendimiento de un host de Citrix Hypervisor.
  media: []
  overview: README.md#Información general
  resources:
  - resource_type: Blog
    url: https://www.datadoghq.com/blog/monitor-citrix-hypervisor-datadog/
  support: README.md#Soporte
  title: Citrix Hypervisor
---

<!--  FUENTE https://github.com/DataDog/integrations-core -->


## Información general

Este check monitoriza [Citrix Hypervisor][1] a través del Datadog Agent.

## Configuración

Sigue las instrucciones a continuación para instalar y configurar este check para un Agent que se ejecuta en un host. Para entornos en contenedores, consulta las [plantillas de integración de Autodiscovery][2] para obtener orientación sobre la aplicación de estas instrucciones.

### Instalación

El check de Citrix Hypervisor está incluido en el paquete del [Datadog Agent][3].
No se necesita ninguna instalación adicional en el servidor.
La forma recomendada de monitorizar los hipervisores de Citrix es instalar un Datadog Agent en cada hipervisor.

#### Usuario de Datadog

La integración de Citrix Hypervisor requiere un usuario con acceso de [`read-only`][4] como mínimo para monitorizar el servicio.

### Configuración

#### Host

1. Edita el archivo `citrix_hypervisor.d/conf.yaml`, que se encuentra en la carpeta `conf.d/` en la raíz del directorio de configuración de tu Agent, para empezar a recopilar los datos de rendimiento de Citrix Hypervisor. Consulta el [citrix_hypervisor.d/conf.yaml de ejemplo][5] para conocer todas las opciones de configuración disponibles.

2. [Reinicia el Agent][6].

#### Recopilación de logs

_Disponible para la versión 6.0 o posteriores del Agent_

1. La recopilación de logs está desactivada por defecto en el Datadog Agent. Actívala en `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

2. Añade este bloque de configuración a tu archivo `citrix_hypervisor.d/conf.yaml` para empezar a recopilar tus logs de Citrix Hypervisor:
    ```yaml
    logs:
    - type: file
      path: /var/log/xensource.log
      source: citrix_hypervisor
    ```
    Cambia el valor `path` y configúralo para tu entorno. Consulta el [archivo de muestra `citrix_hypervisor.d/conf.yaml`][5] para ver todas las opciones de configuración disponibles.

3. [Reinicia el Agent][6].

### Validación

[Ejecuta el subcomando de estado del Agent][7] y busca `citrix_hypervisor` en la sección de Checks.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "citrix_hypervisor" >}}


### Eventos

La integración de Citrix Hypervisor no incluye eventos.

### Checks de servicios
{{< get-service-checks-from-git "citrix_hypervisor" >}}


## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [equipo de asistencia de Datadog][10].

## Referencias adicionales

Documentación útil adicional, enlaces y artículos:

- [Monitorizar el rendimiento de Citrix Hypervisor con Datadog][11]

[1]: https://www.citrix.com/products/citrix-hypervisor/
[2]: https://docs.datadoghq.com/es/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://docs.citrix.com/en-us/xencenter/7-1/rbac-roles.html
[5]: https://github.com/DataDog/integrations-core/blob/master/citrix_hypervisor/datadog_checks/citrix_hypervisor/data/conf.yaml.example
[6]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-core/blob/master/citrix_hypervisor/metadata.csv
[9]: https://github.com/DataDog/integrations-core/blob/master/citrix_hypervisor/assets/service_checks.json
[10]: https://docs.datadoghq.com/es/help/
[11]: https://www.datadoghq.com/blog/monitor-citrix-hypervisor-datadog/