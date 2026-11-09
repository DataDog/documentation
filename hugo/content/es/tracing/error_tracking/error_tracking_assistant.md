---
description: Aprenda sobre el Error Tracking Assistant.
further_reading:
- link: /monitors/types/error_tracking
  tag: Documentación
  text: Aprenda a usar el contexto de ejecución en Error Tracking.
- link: /tracing/error_tracking
  tag: Documentación
  text: Obtenga información sobre Error Tracking para servicios backend
is_beta: true
private: true
title: Error Tracking Assistant
---
{{< callout url="#" btn_hidden="true" >}}
El Error Tracking Assistant para APM Error Tracking está en versión preliminar. Para solicitar acceso, comuníquese con Soporte en support@datadoghq.com.
{{< /callout >}}

## Descripción general {#overview}

El Error Tracking Assistant en APM Error Tracking proporciona un resumen de sus errores y le ayuda a resolverlos con casos de prueba y correcciones sugeridas. 

{{< img src="tracing/error_tracking/error_tracking_assistant.mp4" video="true" alt="Contexto de ejecución del Explorador de Error Tracking" style="width:100%" >}}

## Requisitos y configuración {#requirements-and-setup}
Idiomas admitidos
: Python, Java

El Error Tracking Assistant requiere [Integración de código fuente][3]. Para habilitar la Integración de código fuente:

1. Vaya a {{< ui >}}Integrations{{< /ui >}} y elija {{< ui >}}Link Source Code{{< /ui >}} en la barra de navegación superior.
2. Siga los pasos para asociar una confirmación con su telemetría y configurar su repositorio de GitHub.

{{< img src="tracing/error_tracking/apm_source_code_integration.png" alt="Configuración de la Integración de código fuente de APM" style="width:80%" >}}

### Configuración adicional recomendada {#recommended-additional-setup}
- Para mejorar las sugerencias para Python proporcionando valores de variables de producción reales al Asistente, inscríbase en la [Beta de contexto de ejecución de Python][1].
- Para enviar casos de prueba y correcciones a su IDE, haga clic en {{< ui >}}Apply in VS Code{{< /ui >}} en cualquier sugerencia generada y siga la configuración guiada para instalar la extensión de Datadog para VS Code.

## Primeros pasos {#getting-started}
1. Navegue a [{{< ui >}}APM{{< /ui >}} > {{< ui >}}Error Tracking{{< /ui >}}][4].
2. Haga clic en cualquier problema de Error Tracking para visualizar la nueva sección {{< ui >}}Generate test & fix{{< /ui >}}.

{{< img src="tracing/error_tracking/error_tracking_assistant.png" alt="Error Tracking Assistant" style="width:80%" >}}

## Solución de problemas {#troubleshooting}

Si no ve las sugerencias generadas:

1. Asegúrese de que la [Integración de código fuente][2] con la integración de GitHub esté configurada correctamente.
2. Mejore las sugerencias del Error Tracking Assistant inscribiéndose en la [Beta de contexto de ejecución de Python][1].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/error_tracking/executional_context
[2]: https://app.datadoghq.com/source-code/setup/apm
[3]: /es/integrations/guide/source-code-integration
[4]: https://app.datadoghq.com/apm/error-tracking