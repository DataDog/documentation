---
further_reading:
- link: https://www.datadoghq.com/blog/bits-ai-for-incident-management/
  tag: Blog
  text: Mantente al día con las últimas incidencias con Bits AI
- link: bits_ai/
  tag: Documentación
  text: Descripción general de Bits AI
- link: bits_ai/getting_started
  tag: Documentación
  text: Empezando
- link: bits_ai/query_examples
  tag: Documentación
  text: Ejemplos de consultas en lenguaje natural
kind: guía
title: Gestión de incidencias
---

## Información general

<div class="alert alert-warning">Las siguientes funciones forman parte del producto <a href="https://www.datadoghq.com/product/incident-management/">Datadog Incident Management</a>.</div>

Bits AI simplifica los procesos de gestión de incidencias, mejora la colaboración y proporciona un valioso apoyo a los responsables de la respuesta a incidencias, lo que la convierte en una herramienta útil para la resolución eficaz de incidencias.

## Requisitos previos

- Tu cuenta de Datadog debe estar conectada a Slack. Ejecutar el comando `/dd` connect inicia automáticamente este proceso, que puede completarse siguiendo las indicaciones.
- En **[Incident > Settings > Integrations][3] (Incidencia > Configuración > Integraciones) > Slack**, habilita las funciones **Push Slack channel messages to the incident timeline** (Enviar mensajes del canal de Slack a la línea temporal de la incidencia) y **Activate Bits AI features in incident Slack channels for your organization** (Activar las funciones de Bits AI en los canales de Slack de la incidencia para tu organización). Esto permite a Datadog introducir conversaciones de Slack en la línea temporal de la incidencia para generar resúmenes y análisis retrospectivos. **Nota: Un espacio de trabajo de Slack solo puede tener Bits AI activado para una organización de Datadog.   
- Los canales de incidencias que quieras que funcionen con Bits AI deben llevar el prefijo `#incident-`.
- Para hacer preguntas a Bits AI sobre incidencias desde cualquier canal de Slack, debes invitar a Bits AI a ese canal. Ejecuta el comando `@Datadog` y sigue las instrucciones que aparecen en pantalla.

{{< img src="bits_ai/managing_incidents/bitsai_slack_prerequisites.png" alt="Configuración de la integración de Slack en Datadog" style="width:90%;">}}

## Ver resúmenes de incidencias

Cuando te unes a un canal de incidencias en Slack, recibes automáticamente un resumen de la incidencia. El canal debe estar conectado a la Gestión de incidencias y **tener al menos diez mensajes**. El resumen, que solo es visible para ti, no persiste entre recargas, entre aplicaciones de escritorio y móviles, ni entre sesiones.

En cualquier momento puedes solicitar un nuevo resumen en `@Datadog Give me a summary of this incident`.

## Buscar en todo tu historial de incidencias y hacer preguntas

Puedes pedir a Bits AI que encuentre las incidencias que estás buscando. Por ejemplo:
- `@Datadog How many incidents are currently ongoing?`
- `@Datadog Show me all Sev-1 incidents that occurred in the past week`

A continuación, puedes investigar más en detalle y hacer preguntas sobre esas incidencias, como `@Datadog What was the root cause of incident-123?` o `@Datadog What remediation actions did the responders take in incident-123?`

Bits AI también puede realizar búsquedas semánticas de incidencias relacionadas. Si estás respondiendo a una incidencia, puedes pedirle a Bits AI que busque otras incidencias activas que parezcan similares a la tuya (`@Datadog Are there any related incidents?`). Bits AI busca incidencias que hayan estado activas en las últimas dos horas. También puedes especificar el periodo de tiempo en el que quieres que Bits AI busque. Si dices `@Datadog Find me incidents related to DDOS attacks from the past month`, Bits AI devuelve tanto las incidencias de DDOS activas como las resueltas del último mes.

O, si sospechas que hay un problema antes incluso de que se declare una incidencia, puedes hacer una pregunta a Bits AI como `@Datadog A customer is unable to check out. Is there an incident?` o `@Datadog Are there any incidents now impacting the payments service?`.

**Nota**: La búsqueda de incidencias está limitada a los últimos 120 días.

## Gestionar las incidencias

Sin entrar en la aplicación web de Datadog, puedes pedirle a Bits AI en Slack que:
- Abra una incidencia: `@Datadog Declare an incident`
- Cambie el nivel de gravedad de una incidencia: `@Datadog Update this incident to SEV-3`
- Cambie el estado de una incidencia: `@Datadog Mark this incident as stable`

## Generar un primer borrador de un análisis retrospectivo

<div class="alert alert-info">El borrador de un análisis retrospectivo asistido por IA está en fase beta privada.</div>

Para generar un borrador de un análisis retrospectivo asistido por IA:

1. Navega hasta la página de la incidencia en Datadog. Por ejemplo, para ver la incidencia 2679, puedes buscar `2679` en la página [**Incidents**][2] (Incidencias) y hacer clic en la coincidencia correspondiente.
1. Asegúrate de que la incidencia está resuelta y de que la línea temporal tiene diez o más mensajes.
1. Haz clic en el botón **Generate Postmortem** (Generar análisis retrospectivo).
1. Selecciona la plantilla de IA.
1. Espera hasta un minuto para que se genere el análisis retrospectivo. No cierres la pestaña durante este tiempo.
1. Revisa el análisis retrospectivo generado. Los análisis retrospectivos generados por IA sirven como primer borrador para ayudar a los encargados de la resolución de incidencias, y que requieren revisiones humanas.

## Sustituir un análisis retrospectivo existente

Si una incidencia ya tiene un análisis retrospectivo vinculado, puedes desvincularlo antes de [generar uno nuevo](#generate-a-first-draft-of-a-postmortem). Todos los análisis retrospectivos siguen siendo accesibles en el notebook de la incidencia.

1. Navega hasta la página de la incidencia en Datadog. Por ejemplo, para ver la incidencia 2679, puedes buscar `2679` en la página [**Incidents**][2] (Incidencias) y hacer clic en la coincidencia correspondiente.
1. Haz clic en **Postmortem** (Análisis retrospectivo).
1. Haz clic en el icono de la papelera.

## Personalizar la plantilla del análisis retrospectivo

1. Navega a [**Service Mgmt > Incident > Settings > Postmortems**][1] (Gestión de servicio > Incidencia > Configuración > Análisis retrospectivo).
1. Haz clic en **New Postmortem Template** (Nueva plantilla de análisis retrospectivo) y personaliza tu plantilla utilizando las variables de incidencia proporcionadas.
    - Las variables con el prefijo `ai`, como `incident.ai_action_items`, proporcionan contenido generado por IA en lugar de valores fijos.
    - Debes utilizar un encabezado antes de cada variable.
1. Guarda tu plantilla para que esté disponible como opción de plantilla durante la [generación de análisis retrospectivos](#generate-a-first-draft-of-a-postmortem).


## Leer más

{{< nombre parcial="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/incidents/settings#Postmortems
[2]: https://app.datadoghq.com/incidents
[3]: https://app.datadoghq.com/incidents/settings#Integrations