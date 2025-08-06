---
app_id: exim
app_uuid: c84e4868-f96b-49b6-8243-2031dde179af
assets:
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: exim.queue.count
      metadata_path: metadata.csv
      prefix: exim.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10291
    source_type_name: exim
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Comunidad
  sales_email: JeanFred1@gmail.com
  support_email: JeanFred1@gmail.com
categories:
- colas de mensajes
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/exim/README.md
display_on_public_website: true
draft: false
git_integration_title: exim
integration_id: exim
integration_title: Exim
integration_version: 1.0.0
is_public: true
manifest_version: 2.0.0
name: exim
public_title: Exim
short_description: Integración Exim para monitorizar colas de correo electrónico
supported_os:
- Linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Colas de mensajes
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Sistema operativo compatible::macOS
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Integración Exim para monitorizar colas de correo electrónico
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: Exim
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-extras -->


## Información general

Este check monitoriza [Exim][1] a través del Datadog Agent.

## Configuración

Sigue las siguientes instrucciones para instalar y configurar este check para un Agent que se ejecuta en un host. Para entornos en contenedores, consulta las [plantillas de integración de Autodiscovery][2] para obtener orientación sobre la aplicación de estas instrucciones.

### Instalación

Para el Agent v7.21/v6.21 o posteriores, sigue las instrucciones a continuación para instalar el check de Exim en tu host. Para instalarlo con el Agent Docker o versiones anteriores del Agent, consulta [Uso de integraciones de la comunidad][3].

1. Ejecuta el siguiente comando para instalar la integración del Agent:

   ```shell
   datadog-agent integration install -t datadog-exim==<INTEGRATION_VERSION>
   ```

2. Configura tu integración como si fuese una [integración][4] de base.

### Configuración

1. Edita el archivo `exim.d/conf.yaml`, en la carpeta `conf.d/` en la raíz de tu directorio de configuración del Agent para comenzar a recopilar tus datos de rendimiento de Exim. Consulta [el ejemplo de exim.d/conf.yaml][5] para ver todas las opciones de configuración disponibles.

2. [Reinicia el Agent][6].

### Validación

[Ejecuta el subcomando de estado del Agent][7] y busca `exim` en la sección Checks.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "exim" >}}


### Eventos

La integración Exim no incluye eventos.

### Checks de servicio
{{< get-service-checks-from-git "exim" >}}


## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [equipo de asistencia de Datadog][10].


[1]: https://www.exim.org/
[2]: https://docs.datadoghq.com/es/agent/kubernetes/integrations/
[3]: https://docs.datadoghq.com/es/agent/guide/use-community-integrations/
[4]: https://docs.datadoghq.com/es/getting_started/integrations/
[5]: https://github.com/DataDog/integrations-extras/blob/master/exim/datadog_checks/exim/data/conf.yaml.example
[6]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-extras/blob/master/exim/metadata.csv
[9]: https://github.com/DataDog/integrations-extras/blob/master/exim/assets/service_checks.json
[10]: https://docs.datadoghq.com/es/help/