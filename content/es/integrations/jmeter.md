---
app_id: jmeter
categories:
- recopilación de logs
- tests
custom_kind: integración
description: Un complemento de Datadog para Apache JMeter
further_reading:
- link: https://www.datadoghq.com/blog/monitor-jmeter-test-results-datadog/
  tag: blog
  text: Monitorizar resultados de tests JMeter con Datadog
integration_version: 1.0.0
media: []
supported_os:
- linux
- macos
- windows
title: JMeter
---
## Información general

Datadog Backend Listener para Apache JMeter es un complemento de JMeter de código abierto utilizado para enviar los resultados de los tests a la plataforma de Datadog. Proporciona informes en tiempo real de las métricas de test como la latencia, el número de bytes enviados y recibidos, etc. También puedes enviar a Datadog los resultados completos de los tests como entradas de log.

## Configuración

### Instalación

El complemento Datadog Backend Listener debe instalarse manualmente. Consulta la última versión y las instrucciones de instalación más actualizadas en su [repositorio de GitHub](https://github.com/DataDog/jmeter-datadog-backend-listener).

#### Instalación manual

1. Descarga el archivo JAR del complemento Datadog desde la [página de versiones](https://github.com/DataDog/jmeter-datadog-backend-listener/releases)
1. Coloca el JAR en el directorio `lib/ext` dentro de tu instalación de JMeter.
1. Inicia JMeter (o sal de la aplicación y vuelve a abrirla).

#### Administrador de complementos de JMeter

1. Si aún no está configurado, descarga el [JAR del gestor de complementos JMeter](https://jmeter-plugins.org/wiki/PluginsManager/).
1. Una vez completada la descarga, coloca `.jar` en el directorio `lib/ext` en tu instalación de JMeter.
1. Inicia JMeter (o sal de la aplicación y vuelve a abrirla).
1. Ve a `Options > Plugins Manager > Available Plugins` (Opciones > Gestor de complementos > Complementos disponibles).
1. Busca "Datadog Backend Listener".
1. Haz clic en la casilla situada junto al complemento Datadog Backend Listener.
1. Haz clic en "Apply Changes and Restart JMeter" (Aplicar cambios y reiniciar JMeter).

### Configuración

Para empezar a informar métricas a Datadog:

1. Haz clic con el botón derecho del ratón en el grupo de subprocesos o en el plan de tests del que quieras enviar métricas a Datadog.
1. Ve a `Add > Listener > Backend Listener` (Añadir > Listener > Backend Listener).
1. Modifica la `Backend Listener Implementation` y selecciona `org.datadog.jmeter.plugins.DatadogBackendClient` en el menú desplegable. 
1. Configura la variable `apiKey` en tu [clave de API Datadog](https://app.datadoghq.com/account/settings#api).
1. Ejecuta tu test y valida que las métricas han aparecido en Datadog.

El complemento dispone de las siguientes opciones de configuración:

| Nombre       | Obligatorio | Valor por defecto | descripción|
|------------|:--------:|---------------|------------|
|apiKey | verdadero | NA | Tu clave de API de Datadog.|
|datadogUrl | falso | https://api.datadoghq.com/api/ | Puedes configurar un endpoint diferente, por ejemplo https://api.datadoghq.eu/api/ si tu instancia de Datadog se encuentra en la UE.|
|logIntakeUrl | falso | https://http-intake.logs.datadoghq.com/v1/input/ | Puedes configurar un endpoint diferente, por ejemplo: https://http-intake.logs.datadoghq.eu/v1/input/ si tu instancia de Datadog se encuentra en la UE.|
|metricsMaxBatchSize|falso|200|Las métricas se envían cada 10 segundos en lotes de tamaño `metricsMaxBatchSize`.|
|logsBatchSize|falso|500|Los logs se envían en lotes de tamaño `logsBatchSize` en cuanto se alcanza este tamaño.|
|sendResultsAsLogs|falso|falso|Por defecto, solo se informan métricas a Datadog. Para notificar resultados de tests individuales como eventos de logs, configura este campo como `true`.|
|includeSubresults|falso|falso|Un subresultado se produce, por ejemplo, cuando una solicitud HTTP individual tiene que seguir redirecciones. Por defecto, los subresultados se ignoran.|
|excludeLogsResponseCodeRegex|falso|`""`| Si seleccionas `sendResultsAsLogs`, todos los resultados se enviarán por defecto como logs a Datadog. Esta opción permite excluir los resultados cuyo código de respuesta coincida con una expresión regular determinada. Por ejemplo, puedes establecer esta opción en `[123][0-5][0-9]` para enviar solo los errores.|
|samplersRegex|falso|.\*|Una expresión regular opcional para filtrar los muestreadores a monitorizar.|
|customTags|falso|`""`|Lista de etiquetas (tags) separada por comas para añadir a cada métrica

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **jmeter.byte_received.avg** <br>(gauge) | Valor medio del número de bytes recibidos.<br>_Se muestra como byte_ |
| **jmeter.byte_received.count** <br>(gauge) | Número de muestras utilizadas para calcular la distribución de bytes recibidos.<br>_Se muestra como solicitud_ |
| **jmeter.byte_received.max** <br>(gauge) | Valor máximo del número de bytes recibidos.<br>_Se muestra como byte_ |
| **jmeter.byte_received.min** <br>(gauge) | Valor mínimo del número de bytes recibidos.<br>_Se muestra como byte_ |
| **jmeter.byte_received.p90** <br>(gauge) | Valor del P90 del número de bytes recibidos.<br>_Se muestra como byte_ |
| **jmeter.byte_received.p95** <br>(gauge) | Valor del P95 del número de bytes recibidos.<br>_Se muestra como byte_ |
| **jmeter.byte_received.p99** <br>(gauge) | Valor del P99 del número de bytes recibidos.<br>_Se muestra como byte_ |
| **jmeter.byte_sent.avg** <br>(gauge) | Valor medio del número de bytes enviados.<br>_Se muestra como byte_ |
| **jmeter.byte_sent.count** <br>(gauge) | Número de muestras utilizadas para calcular la distribución de bytes enviados.<br>_Se muestra como solicitud_ |
| **jmeter.byte_sent.max** <br>(gauge) | Valor máximo del número de bytes enviados.<br>_Se muestra como byte_ |
| **jmeter.byte_sent.min** <br>(gauge) | Valor mínimo del número de bytes enviados.<br>_Se muestra como byte_ |
| **jmeter.byte_sent.p90** <br>(gauge) | Valor del P90 del número de bytes enviados.<br>_Se muestra como byte_ |
| **jmeter.byte_sent.p95** <br>(gauge) | Valor del P95 del número de bytes enviados.<br>_Se muestra como byte_ |
| **jmeter.byte_sent.p99** <br>(gauge) | Valor del P99 del número de bytes enviados.<br>_Se muestra como byte_ |
| **jmeter.latency.avg** <br>(gauge) | Valor medio de la latencia.<br>_Se muestra como segundo_ |
| **jmeter.latency.count** <br>(gauge) | Número de muestras utilizadas para calcular la distribución de la latencia.<br>_Se muestra como solicitud_ |
| **jmeter.latency.max** <br>(gauge) | Valor máximo de la latencia.<br>_Se muestra como segundo_ |
| **jmeter.latency.min** <br>(gauge) | Valor mínimo de la latencia.<br>_Se muestra como segundo_ |
| **jmeter.latency.p90** <br>(gauge) | Valor del P90 de la latencia.<br>_Se muestra como segundo_ |
| **jmeter.latency.p95** <br>(gauge) | Valor del P95 de la latencia.<br>_Se muestra como segundo_ |
| **jmeter.latency.p99** <br>(gauge) | Valor del P99 de la latencia.<br>_Se muestra como segundo_ |
| **jmeter.response_time.avg** <br>(gauge) | Valor medio del tiempo de respuesta.<br>_Se muestra como segundo_ |
| **jmeter.response_time.count** <br>(gauge) | Número de muestras utilizadas para calcular la distribución del tiempo de respuesta.<br>_Se muestra como solicitud_ |
| **jmeter.response_time.max** <br>(gauge) | Valor máximo del tiempo de respuesta.<br>_Se muestra como segundo_ |
| **jmeter.response_time.min** <br>(gauge) | Valor mínimo del tiempo de respuesta.<br>_Se muestra como segundo_ |
| **jmeter.response_time.p90** <br>(gauge) | Valor del P90 del tiempo de respuesta.<br>_Se muestra como segundo_ |
| **jmeter.response_time.p95** <br>(gauge) | Valor del P95 del tiempo de respuesta.<br>_Se muestra como segundo_ |
| **jmeter.response_time.p99** <br>(gauge) | Valor del P99 del tiempo de respuesta.<br>_Se muestra como segundo_ |
| **jmeter.responses_count** <br>(count) | Recuento del número de respuestas recibidas por muestreador y por estado.<br>_Se muestra como respuesta_ |

### Checks de servicio

JMeter no incluye ningún check de servicio.

### Eventos

JMeter no incluye ningún evento.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).

## Referencias adicionales

Documentación útil adicional, enlaces y artículos:

- [Monitorizar resultados de tests JMeter con Datadog](https://www.datadoghq.com/blog/monitor-jmeter-test-results-datadog/)