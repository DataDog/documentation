---
app_id: teleport
app_uuid: e47d5541-de7d-4ce6-8105-03c6dac5852a
assets:
  dashboards:
    Teleport Overview: assets/dashboards/teleport_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check:
      - teleport.common.process_state
      - teleport.common.rx
      - teleport.common.tx
      - teleport.common.teleport_build_info
      metadata_path: metadata.csv
      prefix: teleport.
    process_signatures:
    - teleport
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 7291105
    source_type_name: Teleport
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- nube
- seguridad
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/teleport/README.md
display_on_public_website: true
draft: false
git_integration_title: teleport
integration_id: teleport
integration_title: Teleport
integration_version: 2.3.0
is_public: true
manifest_version: 2.0.0
name: teleport
public_title: Teleport
short_description: Recopila métricas clave para monitorizar la salud de tu instancia
  Teleport.
supported_os:
- linux
- windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Sistema operativo compatible::macOS
  - Categoría::Nube
  - Categoría::Seguridad
  - Oferta::Integración
  - Tipo de datos enviados::Métricas
  - Tipo de datos enviados::Logs
  configuration: README.md#Configuración
  description: Recopila métricas clave para monitorizar la salud de tu instancia Teleport.
  media: []
  overview: README.md#Información general
  resources:
  - resource_type: documentación
    url: https://docs.datadoghq.com/integrations/teleport/
  - resource_type: Blog
    url: https://www.datadoghq.com/blog/teleport-integration/
  support: README.md#Soporte
  title: Teleport
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-core -->


## Información general

Esta integración monitoriza la salud y el rendimiento de [Teleport][1] a través del Datadog Agent. Habilite esta integración para:

- Entender rápidamente el estado operativo de tu clúster de Teleport, incluidos los servicios de autorización, proxy, SSH, bases de datos y Kubernetes.
- Consultar y auditar las sesiones de usuario que se conectan a servicios Kubernetes y de bases de datos para identificar a los usuarios malintencionados o en riesgo de tu organización.
- Agrupar logs en patrones para una investigación más rápida de accesos anómalos a la infraestructura, como un elevado número de inicios de sesión fallidos o intentos de acceder al mayor número posible de recursos en un breve periodo de tiempo.


## Configuración

Sigue las instrucciones a continuación para instalar y configurar este check para un Agent que se ejecuta en un host. Para entornos contenedorizados, consulta las [plantillas de integración de Autodiscovery][2] para obtener orientación sobre la aplicación de estas instrucciones.

### Instalación

La integración Teleport está incluida en el paquete del Datadog Agent. No es necesaria ninguna instalación adicional en tu servidor.

### Requisitos previos

El check de Teleport recopila métricas y datos de rendimiento de Teleport utilizando dos endpoints distintos:

- El [endpoint de salud][3] muestra el estado de salud general de tu instancia Teleport.
- El [endpoint de OpenMetrics][4] extrae métricas de la instancia Teleport y de los distintos servicios que operan dentro de esa instancia.

Estos endpoints no están activados por defecto. Para activar los endpoints HTTP de diagnóstico en tu instancia Teleport, consulta la [documentación][5] pública de Teleport.

### Configuración

##### Recopilación de métricas

1. Edita el archivo `teleport.d/conf.yaml`, en la carpeta `conf.d/` en la raíz del directorio de configuración de tu Agent para empezar a recopilar tus datos de rendimiento de Teleport. Para ver todas las opciones de configuración disponibles, consulta el [teleport.d/conf.yaml de ejemplo][6].

2. [Reinicia el Agent][7].

##### Recopilación de logs

1. La recopilación de logs está deshabilitada por defecto en el Datadog Agent. Habilítala en tu archivo `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

2. Edita la sección `logs` de tu archivo `teleport.d/conf.yaml` para empezar a recopilar tus logs de Teleport:

   ```yaml
   logs:
     - type: file
       path: /var/log/teleport/teleport.log
       source: teleport
       service: teleport-service
       log_processing_rules:
         - type: multi_line
         name: logs_start_with_date
         pattern: \d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])
   ```

3. [Reinicia el Agent][8].

### Validación

[Ejecuta el subcomando de estado del Agent][9] y busca `teleport` en la sección Checks.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "teleport" >}}


### Eventos

La integración Teleport no incluye eventos.

### Checks de servicio

La integración Teleport no incluye checks de servicios.

## Referencias adicionales

Más enlaces, artículos y documentación útiles:

- [Monitorizar Teleport con Datadog][11]

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con [el servicio de asistencia de Datadog][12].

[1]: https://goteleport.com/
[2]: https://docs.datadoghq.com/es/agent/kubernetes/integrations/
[3]: https://goteleport.com/docs/management/diagnostics/monitoring/#healthz
[4]: https://goteleport.com/docs/reference/metrics/#auth-service-and-backends
[5]: https://goteleport.com/docs/admin-guides/management/diagnostics/monitoring/
[6]: https://github.com/DataDog/integrations-core/blob/master/teleport/datadog_checks/teleport/data/conf.yaml.example
[7]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[8]: https://github.com/DataDog/integrations-core/blob/master/teleport/assets/service_checks.json
[9]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[10]: https://github.com/DataDog/integrations-core/blob/master/teleport/metadata.csv
[11]: https://www.datadoghq.com/blog/teleport-integration/
[12]: https://docs.datadoghq.com/es/help/