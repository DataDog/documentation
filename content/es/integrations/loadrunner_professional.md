---
app_id: loadrunner-professional
app_uuid: e6b5ab52-139d-4dde-a4ad-94fedeac7f29
assets:
  dashboards:
    loadrunner_professional_overview: assets/dashboards/loadrunner_professional_overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check:
      - loadrunner.vusers.running
      - loadrunner.vusers.ready
      - loadrunner.vusers.finished
      - loadrunner.vusers.error
      - loadrunner.total.transactions.passed.per.sec
      - loadrunner.transaction.response_time
      - loadrunner.transaction.passed
      - loadrunner.transaction.failed
      - loadrunner.transaction.stopped
      metadata_path: metadata.csv
      prefix: loadrunner.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 8492858
    source_type_name: LoadRunner Professional
  logs:
    source: loadrunner
author:
  homepage: https://www.microfocus.com/en-us/products/loadrunner-professional/overview
  name: OpenText
  sales_email: dmcleish@opentext.com
  support_email: MFI-Supportline@opentext.com
categories:
- tests
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/loadrunner_professional/README.md
display_on_public_website: true
draft: false
git_integration_title: loadrunner_professional
integration_id: loadrunner-professional
integration_title: LoadRunner Professional
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: loadrunner_professional
public_title: LoadRunner Professional
short_description: Envía métricas e información de LoadRunner Professional sobre la
  ejecución de escenarios a Datadog
supported_os:
- windows
- linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Windows
  - Supported OS::Linux
  - Category::Testing
  - Offering::Integration
  - Submitted Data Type::Metrics
  - Submitted Data Type::Logs
  configuration: README.md#Setup
  description: Envía métricas e información de LoadRunner Professional sobre la ejecución
    de escenarios a Datadog
  media:
  - caption: Pestaña de diseño del controlador
    image_url: images/controller_design.png
    media_type: imagen
  - caption: Pestaña de diseño del controlador
    image_url: images/controller_run.png
    media_type: imagen
  - caption: Informe de resumen del análisis
    image_url: images/analysis_summary.png
    media_type: imagen
  - caption: Nuevo script de Vugen
    image_url: images/vugen_new.png
    media_type: imagen
  - caption: Ventana de configuración de Datadog
    image_url: images/datadog_configuration_window.png
    media_type: imagen
  overview: README.md#Overview
  support: README.md#Support
  title: LoadRunner Professional
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-extras -->


## Información general

OpenText LoadRunner Professional es una solución de tests de carga que te permite testear el rendimiento de diversos tipos de aplicaciones para identificar y resolver problemas antes de que las aplicaciones salgan al mercado.

El controlador de LoadRunner es una herramienta para crear y controlar escenarios de LoadRunner Professional. Un escenario define los eventos que se producen durante cada sesión de tests. Controla el número de usuarios a emular (usuarios virtuales, o Vusers), las acciones que realizan y las máquinas en las que ejecutan sus emulaciones. Los escenarios se utilizan para crear tests de carga para comprobar la fiabilidad y resistencia de tus servidores.

Con esta integración, el controlador envía métricas en tiempo real y los datos de las ejecuciones del escenario a Datadog.

|   |   |
|---|---|
|__Enviar información del escenario__| Envía información sobre la ejecución del escenario, como la hora de inicio y detención, la duración y los scripts incluidos en forma de logs.
|__Enviar métricas de ejecución__| Envía métricas desde la ejecución del escenario, como el estado de Vuser y los tiempos de respuesta de las transacciones. |

## Configuración

Configura el controlador de LoadRunner para enviar datos a Datadog. Puedes elegir entre enviar información del escenario, ejecutar métricas, o ambos. Una vez configurada, este integración proporciona un dashboard de Datadog para ver los datos en widgets preconfigurados.

1.  Controlador abierto.
2.  En la barra de herramientas del controlador, selecciona __Tools > Datadog Configuration__ (Herramientas > Configuración de Datadog).
3.  En el campo __Site__ (Sitio), selecciona tu [sitio de Datadog][1].
4.  En el campo __API key__ (Clave de API), introduce la [clave de API][2] generada por Datadog.
5.  Haz clic en __Test Connection__ (Testear conexión).
6.  Una vez establecida la conexión, elige si deseas enviar información sobre el escenario, ejecutar métricas, o ambas cosas a Datadog.
7.  Si habilitas el controlador para enviar información del escenario, el pipeline de logs incluido con esta integración automáticamente procesa tus logs y añade etiquetas (tags) pertinentes. Para obtener más información sobre el pipeline, ve a Logs > Pipelines en Datadog.
8.  En Datadog, el __Dashboard de LoadRunner Professional__ se instalará automáticamente con la integración. El dashboard incluye widgets que muestra la ejecución de métricas y la información del escenario (según los datos que el controlador esté configurado para enviar).

Una vez que el controlador se ha configurado para enviar datos a Datadog, los datos se envían cada vez que se ejecuta un escenario en el controlador. Para impedir que el controlador envíe datos a Datadog, selecciona __Tools > Datadog Configuration__ (Herramientas > Configuración de Datadog) y borra los campos del cuadro de diálogo de configuración de Datadog.

![Ventana de configuración de Datadog][3]

## Datos recopilados

### Métricas
{{< get-metrics-from-git "loadrunner-professional" >}}


### Checks de servicio

LoadRunner Professional no incluye ningún check de servicio.

### Eventos

LoadRunner Professional no incluye ningún evento.

## Resolución de problemas

¿Necesitas ayuda? Consulta los [documentos de LoadRunner Professional][5] o ponte en contacto con el [soporte de Datadog][6].


[1]: https://docs.datadoghq.com/es/getting_started/site/
[2]: https://docs.datadoghq.com/es/account_management/api-app-keys/#add-an-api-key-or-client-token
[3]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/loadrunner_professional/images/datadog_configuration_window.png
[4]: https://github.com/DataDog/integrations-extras/blob/master/loadrunner_professional/metadata.csv
[5]: https://admhelp.microfocus.com/lr
[6]: https://docs.datadoghq.com/es/help/