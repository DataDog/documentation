---
app_id: aspdotnet
app_uuid: 7d801e88-1fad-433e-81d9-07449fd45e13
assets:
  dashboards:
    ASP.NET - Overview: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: aspdotnet.request.wait_time
      metadata_path: metadata.csv
      prefix: aspdotnet.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10039
    source_type_name: ASP.NET
  logs:
    source: iis
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- languages
- log collection
- windows
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/aspdotnet/README.md
display_on_public_website: true
draft: false
git_integration_title: aspdotnet
integration_id: aspdotnet
integration_title: ASP.NET
integration_version: 4.0.0
is_public: true
manifest_version: 2.0.0
name: aspdotnet
public_title: ASP.NET
short_description: Rastrea las métricas de tu servicio ASP.NET en tiempo real
supported_os:
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Lenguajes
  - Category::Recopilación de logs
  - Category::Windows
  - Supported OS::Windows
  - Offering::integración
  configuration: README.md#Configuración
  description: Rastrea las métricas de tu servicio ASP.NET en tiempo real
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: ASP.NET
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Información general

Obtén métricas de ASP.NET en tiempo real para:

- Visualizar y monitorizar estados de ASP.NET
- Recibir notificaciones sobre fallos y eventos de ASP.NET

## Configuración

### Instalación

El check de ASP.NET está incluido en el paquete del [Datadog Agent][1], por lo que no necesitas instalar nada más en tus servidores.

### Configuración

1. Edita el archivo `aspdotnet.d/conf.yaml`, que se encuentra en la carpeta `conf.d/` en la raíz del [directorio de configuración de tu Agent][2], para empezar a recopilar los datos de rendimiento de tu ASP.NET. Para conocer todas las opciones de configuración disponibles, consulta el [aspdotnet.d/conf.yaml de ejemplo][3].

2. [Reiniciar el Agent][4]

**Nota**: Las versiones 1.9.0 o posteriores de este check utilizan una nueva implementación para la recopilación de métricas, que requiere Python 3. Para los hosts que no pueden utilizar Python 3, o si quieres utilizar una versión heredada de este check, consulta la siguiente [configuración][5].

#### Colección de logs

ASP.NET utiliza los logs de IIS. Sigue las [instrucciones de configuración de IIS][6] para ver los logs relacionados con las solicitudes y los errores de ASP.NET.

Las excepciones y los eventos de nivel 500 no controlados relacionados con tu aplicación ASP.NET se pueden ver con el Log de eventos de la aplicación de Windows.

### Validación

[Ejecuta el subcomando de `status` del Agent][7] y busca `aspdotnet` en la sección Checks.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "aspdotnet" >}}


### Eventos

El check de ASP.NET no incluye eventos.

### Checks de servicios

El check de ASP.NET no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? [Consulta el servicio de asistencia de Datadog][9].

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.datadoghq.com/es/agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: https://github.com/DataDog/integrations-core/blob/master/aspdotnet/datadog_checks/aspdotnet/data/conf.yaml.example
[4]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://github.com/DataDog/integrations-core/blob/7.33.x/aspdotnet/datadog_checks/aspdotnet/data/conf.yaml.example
[6]: https://docs.datadoghq.com/es/integrations/iis/?tab=host#setup
[7]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-core/blob/master/aspdotnet/metadata.csv
[9]: https://docs.datadoghq.com/es/help/