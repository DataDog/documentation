---
description: Conoce el Asistente de seguimiento de errores.
further_reading:
- link: /monitors/types/error_tracking
  tag: Documentación
  text: Más información sobre el uso del contexto de ejecución en el seguimiento de
    errores
- link: /tracing/error_tracking
  tag: Documentación
  text: Más información sobre el seguimiento de errores para los servicios de backend
is_beta: true
kind: documentación
private: true
title: Asistente de seguimiento de errores
---

{{< beta-callout url="#" btn_hidden="true" >}}
El Asistente de seguimiento de errores para el seguimiento de errores de APM está en la versión beta privada. Para solicitar acceso, comunícate con Soporte en support@datadoghq.com.
{{< /beta-callout >}}

## Información general

El Asistente de seguimiento de errores en el seguimiento de errores de APM proporciona un resumen de los errores y te ayuda a resolverlos con casos de tests y correcciones sugeridos.

{{< img src="tracing/error_tracking/error_tracking_assistant.mp4" video="true" alt="Contexto de ejecución de Error Tracking Explorer" style="width:100%" >}}

## Requisitos y configuración
Lenguajes admitidos
: Python, Java

El Asistente de seguimiento de errores requiere [integración de código fuente][3]. Para activar la integración de código fuente:

1. Ve a **Integrations** (Integraciones) y elige **Link Source Code** (Enlazar código fuente) en la barra de navegación superior.
2. Sigue los pasos para asociar un commit a tu telemetría y configurar tu repositorio de GitHub.

{{< img src="tracing/error_tracking/apm_source_code_integration.png" alt="Configuración de la integración del código fuente de APM" style="width:80%" >}}

### Configuración adicional recomendada
- A fin de mejorar las sugerencias para Python proporcionando valores de variables de producción reales al asistente, inscríbete en [Contexto de ejecución de Python Beta][1].
- Para enviar casos de test y correcciones a tu IDE, haz clic en **Apply in VS Code** (Aplicar en VS Code) en cualquier sugerencia generada y sigue la configuración guiada para instalar la extensión de Datadog para VS Code.

## Empezando
1. Ve a [**APM** > **Error Tracking** (Seguimiento de errores)][4].
2. Haz clic en cualquier problema del seguimiento de errores para ver la nueva sección **Generate test & fix** (Generar test y corrección).

{{< img src="tracing/error_tracking/error_tracking_assistant.png" alt="Asistente de seguimiento de errores" style="width:80%" >}}

## Solucionar problemas

Si no ves las sugerencias generadas:

1. Asegúrate de que [la integración del código fuente][2] con la integración de GitHub esté correctamente configurada.
2. Mejora las sugerencias del Asistente de seguimiento de errores inscribiéndote en [Contexto de ejecución de Python Beta][1].

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/error_tracking/executional_context
[2]: https://app.datadoghq.com/source-code/setup/apm
[3]: /es/integrations/guide/source-code-integration
[4]: https://app.datadoghq.com/apm/error-tracking