---
app_id: sendmail
app_uuid: 8169d145-8d1f-4bb8-a4de-a0aa9aa84c0b
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: sendmail.queue.size
      metadata_path: metadata.csv
      prefix: sendmail.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10204
    source_type_name: Sendmail
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Comunidad
  sales_email: david.bouchare@datadoghq.com
  support_email: david.bouchare@datadoghq.com
categories:
- métricas
- red
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/sendmail/README.md
display_on_public_website: true
draft: false
git_integration_title: sendmail
integration_id: sendmail
integration_title: Sendmail
integration_version: 1.0.0
is_public: true
manifest_version: 2.0.0
name: sendmail
public_title: Sendmail
short_description: Integración de Sendmail para monitorizar colas de correos
supported_os:
- linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Metrics
  - Category::Network
  - Supported OS::Linux
  - Offering::Integration
  configuration: README.md#Setup
  description: Integración de Sendmail para monitorizar colas de correos
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Sendmail
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-extras -->


## Información general

Este check monitoriza [Sendmail][1] a través del Datadog Agent.

## Configuración

El check de Sendmail no está incluido en el paquete del [Datadog Agent][2], por lo que es necesario instalarlo.

### Instalación

En el caso de las versiones 7.21/6.21 o posteriores del Agent, sigue las siguientes instrucciones para instalar el check de Sendmail en tu host. Para instalarlo con el Docker Agent o versiones anteriores del Agent, consulta [Uso de integraciones de la comunidad][3].

1. Ejecuta el siguiente comando para instalar la integración del Agent:

   ```shell
   datadog-agent integration install -t datadog-sendmail==<INTEGRATION_VERSION>
   ```

2. Configura tu integración similar a las [integraciones][4] centrales.

### Configuración

1. Edita el archivo `sendmail.d/conf.yaml`, que se encuentra en la carpeta `conf.d/` en la raíz del directorio de configuración del Agent para empezar a recopilar tus datos de rendimiento de Sendmail. Para conocer todas las opciones de configuración disponibles, consulta el [archivo sendmail.d/conf.yaml de ejemplo][5].

2. [Reinicia el Agent][6].

### Validación

[Ejecuta el subcomando de estado del Agent][7] y busca `sendmail` en la sección Checks.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "sendmail" >}}


### Eventos

Sendmail no incluye eventos.

### Checks de servicio
{{< get-service-checks-from-git "sendmail" >}}


## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][10].


[1]: https://www.proofpoint.com/us/open-source-email-solution
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/es/agent/guide/use-community-integrations/
[4]: https://docs.datadoghq.com/es/getting_started/integrations/
[5]: https://github.com/DataDog/integrations-extras/blob/master/sendmail/datadog_checks/sendmail/data/conf.yaml.example
[6]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-extras/blob/master/sendmail/metadata.csv
[9]: https://github.com/DataDog/integrations-extras/blob/master/sendmail/assets/service_checks.json
[10]: https://docs.datadoghq.com/es/help/