---
aliases:
- /es/tracing/live_debugger/debug-with-bits/
description: Utilice Bits Code para crear y administrar sesiones de Live Debugger
  a través de una interfaz conversacional.
further_reading:
- link: /bits_ai/bits_code/
  tag: Documentación
  text: Bits Code
- link: /tracing/live_debugger/
  tag: Documentación
  text: Live Debugger
- link: /dynamic_instrumentation/sensitive-data-scrubbing/
  tag: Documentación
  text: Depuración de datos confidenciales
- link: https://www.datadoghq.com/blog/live-debugger/
  tag: Blog
  text: Depure código de producción en vivo sin volver a implementar con Datadog Live
    Debugger
title: Bits Live Debugger
---
{{< beta-callout url="https://www.datadoghq.com/product-preview/debug-with-bits/" >}}
Bits Live Debugger está en vista previa. Solicite acceso para unirse a la lista de espera.
{{< /beta-callout >}}

## Descripción general {#overview}

Bits Live Debugger incorpora una interfaz conversacional a Live Debugger para investigar servicios en ejecución mediante lenguaje natural. Describa lo que desea investigar y Bits colocará puntos de registro, recuperará instantáneas de variables e interpretará los resultados. Después de que Bits identifica una causa raíz, puede sugerir correcciones de código.

Toda la actividad de depuración se ejecuta a través de [Live Debugger][1], por lo que se aplican los mismos [permisos][2], límites de frecuencia, comportamiento de caducidad automática y [depuración de datos confidenciales][3].

La funcionalidad de Bits Live Debugger solo es accesible desde la página de Live Debugger.

<div class="alert alert-info">
Bits Live Debugger utiliza <a href="/bits_ai/bits_code/">Bits Code</a> como agente subyacente. Durante la fase de vista previa de Bits Live Debugger, no se cobran créditos de IA de Bits Code cuando las sesiones se inician a través de Live Debugger.
</div>

## Requisitos previos {#prerequisites}

Antes de usar Bits Live Debugger:

- [Live Debugger][1] debe estar habilitado para el servicio de destino. Consulte [Habilitar Live Debugger][7] para obtener más detalles.
- Su cuenta debe tener los [permisos][2] necesarios para usar Live Debugger, incluidos los permisos de lectura, escritura y captura de variables para el entorno de destino.
- [Bits Code][5] debe estar disponible en su organización.
- [Integración de código fuente][6] debe configurarse para el servicio de destino.

## Acciones disponibles {#available-actions}

Bits puede realizar las siguientes acciones de Live Debugger durante una sesión de depuración:

| Acción | Descripción |
|--------|-------------|
| Descubrir servicios | Encuentre y valide los servicios disponibles para la depuración en un entorno determinado. |
| Crear puntos de registro | Agregue puntos de registro a un servicio en ejecución en una ubicación de código específica. |
| Listar puntos de registro de sesión | Muestre los puntos de registro activos en una sesión de depuración. |
| Deshabilitar puntos de registro | Deshabilite todos los puntos de registro en una sesión de depuración. |
| Recuperar datos de instantáneas | Obtenga los valores de las variables capturadas y el contexto de ejecución de un punto de registro activo. |

Los puntos de registro creados por Bits siguen las mismas reglas que los puntos de registro creados manualmente. Son de solo lectura, no bloqueantes y caducan automáticamente después del límite de tiempo configurado (de 10 minutos a 2 días; predeterminado: 60 minutos). Bits no puede modificar el estado de la aplicación ni alterar el flujo de control.

## Iniciar una sesión de depuración {#start-a-debugging-session}

1. Vaya a [Live Debugger][4] en Datadog.
1. En el cuadro de chat de Bits Live Debugger, describa el problema que desea investigar. Seleccione el servicio y el entorno de destino antes de enviar la solicitud.

   Luego, Bits realiza la investigación automáticamente:
   - Analiza las rutas de código relevantes en el repositorio de código fuente conectado y puede hacer preguntas de seguimiento para formar una hipótesis.
   - Configura y activa hasta 5 puntos de registro en ubicaciones de código relevantes para capturar los datos específicos que necesita.
   - Recupera y analiza los registros y las instantáneas de variables de los puntos de registro activos para validar su hipótesis y formular su respuesta.

1. Revise la respuesta de Bits y, opcionalmente, explore los detalles de los puntos de registro, los datos capturados y cualquier corrección de código sugerida. Responda en el chat para continuar la investigación según sea necesario.
1. Para deshabilitar los puntos de registro en cualquier momento, pregúntele a Bits o haga clic en el botón {{< ui >}}Disable{{< /ui >}} en un punto de registro individual o en la sesión.

**Nota**: Bits normalmente deshabilita los puntos de registro que crea tan pronto como recupera los datos que necesita. Los puntos de registro también caducan automáticamente después del límite de tiempo configurado.

## Comportamiento y limitaciones {#behavior-and-limitations}

**Entornos de versiones múltiples**: Cuando se implementan varias versiones de código en el entorno de destino, el archivo de destino puede diferir entre versiones. En ese caso, Bits le pide que confirme la versión de destino antes de colocar un punto de registro. Esto evita que los puntos de registro se coloquen en números de línea incorrectos.

**Compatibilidad de lenguaje**: Algunas funciones varían según el lenguaje. Por ejemplo, las expresiones de condición no son compatibles con todos los entornos de ejecución. Bits le notifica cuando una función solicitada no está disponible para el lenguaje del servicio de destino.

**Datos confidenciales**: El comportamiento de [depuración de datos confidenciales][3] que se aplica a los puntos de registro creados manualmente también se aplica a los puntos de registro creados por Bits. En entornos de producción, los valores capturados que no son numéricos ni booleanos se redactan de forma predeterminada.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/live_debugger/
[2]: /es/tracing/live_debugger/#permissions
[3]: /es/dynamic_instrumentation/sensitive-data-scrubbing/
[4]: https://app.datadoghq.com/debugging/
[5]: /es/bits_ai/bits_code/
[6]: /es/source_code/source-code-management/
[7]: /es/tracing/live_debugger/#enable-live-debugger