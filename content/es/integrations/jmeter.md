---
app_id: jmeter
app_uuid: be62a333-998e-4fea-b0e4-dd4a45b859b4
assets:
  dashboards:
    JMeter Overview: assets/dashboards/JMeterOverview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: jmeter.responses_count
      metadata_path: metadata.csv
      prefix: jmeter.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10164
    source_type_name: JMeter
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- recopilación de logs
- tests
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/jmeter/README.md
display_on_public_website: true
draft: false
git_integration_title: jmeter
integration_id: jmeter
integration_title: JMeter
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: jmeter
public_title: JMeter
short_description: Un complemento de Datadog para Apache JMeter
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::Log Collection
  - Category::Testing
  - Offering::Integration
  configuration: README.md#Setup
  description: Un complemento de Datadog para Apache JMeter
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: Blog
    url: https://www.datadoghq.com/blog/monitor-jmeter-test-results-datadog/
  support: README.md#Support
  title: JMeter
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-core -->


## Información general

Datadog Backend Listener para Apache JMeter es un complemento de JMeter de código abierto utilizado para enviar los resultados de los tests a la plataforma de Datadog. Proporciona informes en tiempo real de las métricas de test como la latencia, el número de bytes enviados y recibidos, etc. También puedes enviar a Datadog los resultados completos de los tests como entradas de log.

## Configuración

### Instalación

El complemento Datadog Backend Listener debe instalarse manualmente. Consulta la última versión y las instrucciones de instalación más actualizadas en tu [repositorio de GitHub][1].

#### Instalación manual

1. Descarga el archivo JAR del complemento de Datadog desde la [página de la versión][2].
2. Coloca el JAR en el directorio `lib/ext` dentro de tu instalación de JMeter.
3. Inicia JMeter (o sal de la aplicación y vuelve a abrirla).

#### Administrador de complementos de JMeter

1. Si aún no está configurado, descarga el [JAR de administrador de complementos de JMeter][3].
2. Una vez completada la descarga, coloca `.jar` en el directorio `lib/ext` dentro de tu instalación de JMeter. 
3. Inicia JMeter (o sal de la aplicación y vuelve a abrirla). 
4. Visita `Options > Plugins Manager > Available Plugins`. 
5. Busca "Datadog Backend Listener".
6. Haz clic en la casilla situada junto al complemento Datadog Backend Listener.
7. Haz clic en "Apply Changes and Restart JMeter" (Aplicar cambios y reiniciar JMeter).

### Configuración

Para empezar a informar métricas a Datadog:

1. Haz clic con el botón derecho del ratón en el grupo de subprocesos o en el plan de tests para el que deseas enviar métricas a Datadog.
2. Visita `Add > Listener > Backend Listener`.
3. Modifica la `Backend Listener Implementation` y selecciona `org.datadog.jmeter.plugins.DatadogBackendClient` en el menú desplegable. 
4. Establece la variable `apiKey` en [tu clave de API de Datadog][4].
5. Ejecuta tu test y valida que las métricas han aparecido en Datadog.

El complemento dispone de las siguientes opciones de configuración:

| Nombre       | Obligatorio | Valor por defecto | descripción|
|------------|:--------:|---------------|------------|
|apiKey | true | NA | Tu clave de API de Datadog.|
|datadogUrl | false | https://api.datadoghq.com/api/ | Puedes configurar un endpoint diferente, por ejemplo https://api.datadoghq.eu/api/ si tu instancia de Datadog se encuentra en la UE.|
|logIntakeUrl | false | https://http-intake.logs.datadoghq.com/v1/input/ | Puedes configurar un endpoint diferente, por ejemplo: https://http-intake.logs.datadoghq.eu/v1/input/ si tu instancia de Datadog se encuentra en la UE.|
|metricsMaxBatchSize|false|200|Las métricas se envían cada 10 segundos en lotes de tamaño `metricsMaxBatchSize`.|
|logsBatchSize|false|500|Los logs se envían en lotes de tamaño `logsBatchSize` en cuanto se alcanza este tamaño.|
|sendResultsAsLogs|false|false|Por defecto, sólo se informan métricas a Datadog. Para notificar resultados de tests individuales como eventos de logs, configura este campo como `true`.|
|includeSubresults|false|false|Un subresultado se produce, por ejemplo, cuando una solicitud HTTP individual tiene que seguir redirecciones. Por defecto, los subresultados se ignoran.|
|excludeLogsResponseCodeRegex|false|`""`| Si seleccionas `sendResultsAsLogs`, todos los resultados se enviarán por defecto como logs a Datadog. Esta opción permite excluir los resultados cuyo código de respuesta coincida con una expresión regular determinada. Por ejemplo, puedes establecer esta opción en `[123][0-5][0-9]` para enviar sólo los errores.|
|samplersRegex|false|.*|Una expresión regular opcional para filtrar los muestreadores a monitorizar.|
|customTags|false|`""`|Lista de etiquetas (tags) separada por comas para añadir a cada métrica

## Datos recopilados

### Métricas
{{< get-metrics-from-git "jmeter" >}}


### Checks de servicio

JMeter no incluye ningún check de servicio.

### Eventos

JMeter no incluye ningún evento.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][6].

## Referencias adicionales

Más enlaces, artículos y documentación útiles:

  - [Monitorizar resultados de pruebas de JMeter con Datadog][7]

[1]: https://github.com/DataDog/jmeter-datadog-backend-listener
[2]: https://github.com/DataDog/jmeter-datadog-backend-listener/releases
[3]: https://jmeter-plugins.org/wiki/PluginsManager/
[4]: https://app.datadoghq.com/account/settings#api
[5]: https://github.com/DataDog/integrations-core/blob/master/jmeter/metadata.csv
[6]: https://docs.datadoghq.com/es/help/
[7]: https://www.datadoghq.com/blog/monitor-jmeter-test-results-datadog/