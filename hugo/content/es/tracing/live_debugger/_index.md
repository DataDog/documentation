---
further_reading:
- link: /dynamic_instrumentation/
  tag: Documentación
  text: Dynamic Instrumentation
- link: /dynamic_instrumentation/expression-language/
  tag: Documentación
  text: Lenguaje de expresión de Dynamic Instrumentation
- link: /developers/ide_plugins/idea/live_debugger/
  tag: Documentación
  text: Live Debugger para los IDE JetBrains
- link: /dynamic_instrumentation/sensitive-data-scrubbing/
  tag: Documentación
  text: Depuración de datos confidenciales
- link: /dynamic_instrumentation/symdb/
  tag: Documentación
  text: Autocompletar y buscar (Vista previa)
- link: /error_tracking/backend/exception_replay
  tag: Documentación
  text: Exception Replay
title: Live Debugger
---

{{< beta-callout-private url="https://www.datadoghq.com/product-preview/live-debugger/" >}}
    Live Debugger está en Vista previa limitada. Solicita acceso para unirte a la fila de espera.
    <br>
    Para enviar preguntas, comentarios o solicitudes relacionadas con Live Debugger, rellena <a href="https://docs.google.com/forms/d/e/1FAIpQLSdM9SV4fxrM_OvQ2CtI7CMl7evN0jasFb6X1QiPAbW6dPTQVQ/viewform?usp=header">este formulario</a> con la información.
    <br>
    En caso de problemas cronológicamente sensibles, ponte en contacto con el <a href="https://www.datadoghq.com/support/">servicio de asistencia de Datadog</a>.
{{< /beta-callout-private >}}

## Información general

Con Live Debugger, puedes depurar aplicaciones en ejecución en tiempo real, sin volver a desplegar el código ni interrumpir el servicio. Con la tecnología de [Dynamic Instrumentation][1] de Datadog, Live Debugger utiliza puntos de registro _de caducidad automática, "puntos de interrupción no rompibles"_ para recopilar información de las aplicaciones en ejecución sin detener la ejecución. Esto lo vuelve ideal para investigar problemas en entornos donde los métodos tradicionales de depuración no son prácticos.

{{< img src="tracing/live_debugger/live-debugger-demo-2025050702.mp4" alt="Demostración del producto Live Debugger" video="true" >}}

## Capacidades clave

Live Debugger proporciona:

- **Inspección en tiempo real** de estados de variables, argumentos de métodos y rutas de ejecución en código en ejecución.
- **Recopilación de datos no invasiva** que captura información de depuración sin detener las aplicaciones ni degradar el rendimiento.
- **Instrumentación de código** con puntos de registro que pueden añadirse en cualquier parte de tu código, incluyendo bibliotecas de terceros.
- **Puntos de registro de caducidad automática** que se desactivan automáticamente después de un tiempo determinado (por defecto: 48 horas).
- **Registro condicional** basado en criterios definidos por el usuario para capturar datos sólo cuando se cumplen determinadas condiciones.
- **[Depuración de datos confidenciales][3] integrada** para evitar la exposición de información personal, contraseñas y secretos.

## Empezando

### Requisitos previos

1. Se cumplen todos los [requisitos previos de Dynamic Instrumentation][16].
1. Has [creado un índice de logs][19] para almacenar información de depuración.
1. (Recomendado) Has activado la [integración del código fuente][20] para ver y seleccionar localizaciones de código específicas al añadir puntos de registro.

### Configurar Live Debugger

Activa y desactiva Live Debugger en un servicio utilizando uno de los siguientes métodos:

#### Activación con un solo clic (recomendado) ####

<div class="alert alert-info">Sólo los usuarios con los siguientes permisos pueden utilizar la activación con un clic: <b>Gestión de organización, Lectura de configuración remota de APM, Escritura de configuración remota de APM</b>.</div>

1. Selecciona el servicio y el entorno en la página de [parámetros de Live Debugger][18].
1. Comprueba que se cumplen todos los requisitos previos indicados en la página de Parámetros.
1. Haz clic en "Enable" o "Disable" (Activar o Desactivar):
    - En "Enable" (Activar), para permitir a los usuarios crear sesiones de depuración en el servicio y el entorno seleccionados.
    - En "Disable" (Desactivar) para desactivar sesiones de depuración activas y evitar que los usuarios creen más.

**Nota**: No es necesario reiniciar el servicio para que los cambios surtan efecto. Los administradores y los contactos de seguridad reciben notificaciones por correo electrónico cuando se activan o desactivan los servicios.

#### Activación manual ####
1. Selecciona el servicio y el entorno en la página de [parámetros de Live Debugger][18].
1. Sigue las instrucciones para activar Live Debugger.
1. Reinicia el servicio antes de utilizar Live Debugger.


## Live Debugger y Dynamic Instrumentation
Debido a la tecnología subyacente compartida, Live Debugger y Dynamic Instrumentation siempre se activan o desactivan juntos en el mismo servicio y entorno.

Al igual que Live Debugger, Dynamic Instrumentation permite a los usuarios crear puntos de registro (además de admitir otros instrumentos personalizados como tramos (spans), etiquetas (tags) de tramos y métricas. Sin embargo, los puntos de registro de Live Debugger expiran automáticamente tras un periodo de tiempo determinado, mientras que los de Dynamic Instrumentation permanecen activos hasta que se desactivan manualmente.

Al activar o desactivar Live Debugger, se aplica la misma acción a Dynamic Instrumentation para ese servicio y entorno. Cuando se desactiva, se detiene toda captura de datos, tanto de los puntos de registro de la sesión de depuración activa, como de las instrumentaciones dinámicas.

## Uso de Live Debugger

<div class="alert alert-info">Prueba Live Debugger desde tu IDE JetBrains. <a href="/developers/ide_plugins/idea/live_debugger/">Haz clic aquí</a> para obtener más información.</div>

### Creación y uso de una sesión de depuración

Las sesiones de depuración te permiten inspeccionar tu código en tiempo de ejecución con puntos de registro que expiran automáticamente. Para crear y utilizar una sesión de depuración:

1. Inicia una sesión de depuración desde una de las siguientes opciones:
    - En la [página de Live Debugger][14], haz clic en **Create Debug Session** (Crear sesión de depuración).
    - (Requiere la función Code Origin) En el [Explorador de trazas (traces)][22], haz clic en una traza para abrir el panel lateral, busca la sección Code Origin y haz clic en **Start Debug Session** (Iniciar sesión de depuración).
2. Añade el primer punto de registro para iniciar la sesión.
3. Añade, elimina y modifica puntos de registro dentro de la sesión.

Las sesiones de depuración caducan automáticamente a las 48 horas. Puedes desactivar y volver a activar manualmente tanto las sesiones como los puntos de registro individuales en cualquier momento.

### Creación de puntos de registro

Los puntos de registro son "puntos de interrupción no rompibles" que especifican en qué parte del código capturar información, qué datos incluir y en qué condiciones. Para añadir un punto de registro para depuración:

1. Ve a la [página de Live Debugger][14].
2. Haz clic en **Create Debug Session** (Crear sesión de depuración).
3. Elige tu servicio y entorno y luego selecciona en qué parte de tu código quieres colocar el primer punto de registro.
4. Define una plantilla de mensaje de punto de registro utilizando el [lenguaje de expresión de Dynamic Instrumentation][2].
5. (Opcional) Activa "Capturar variables" para recopilar todo el contexto de ejecución (esta función tiene un límite de 1 ejecución por segundo).
6. (Opcional) Define una condición para cuando los logs deben emitirse.

**Nota:** Pueden aplicarse algunas limitaciones dependiendo del lenguaje de ejecución del servicio. Para obtener más información, consulta la [documentación específica del lenguaje de tiempo de ejecución][17].

### Protección de datos confidenciales

Los datos de Live Debugger pueden contener información sensible, especialmente cuando se utiliza la opción "Capturar variables". Para proteger estos datos:

1. Utiliza los mecanismos integrados de [depuración de datos confidenciales][3].
2. Utiliza [Sensitive Data Scanner][15] para identificar y redactar información confidencial basándose en expresiones regulares.

## Impacto en el rendimiento y la facturación

Activar Live Debugger y Dynamic Instrumentation en un servicio no activa la captura de datos ni afecta al rendimiento. La captura de datos sólo se produce cuando hay sesiones de depuración o instrumentaciones dinámicas activas en ese servicio.

**Impacto en el rendimiento**: La instrumentación Datadog basada en el Agent garantiza un impacto mínimo en el rendimiento de la aplicación. La lógica de muestreo, los límites de frecuencia y los presupuestos incorporados evitan la captura desbocada de datos.

**Impacto en los precios**: Los logs capturados por Datadog se facturan todos de la misma manera, tanto si se generan desde Live Debugger, como si se trata de líneas de generadores de logs en tu código fuente. Con Live Debugger, los puntos de registro caducan automáticamente tras el periodo de tiempo definido, lo que limita la acumulación de datos y los costes innecesarios. Monitoriza tu [página del plan y el uso de Datadog[21] para detectar cualquier aumento inesperado al utilizar una nueva función.

## Limitaciones

Las siguientes restricciones se aplican al uso y configuración de Live Debugger:

- **Soporte de lenguajes:** Live Debugger está disponible para los mismos lenguajes de ejecución que [Dynamic Instrumentation][1], incluyendo: Java, Python, .NET, PHP (vista previa), Node.js (vista previa), Ruby (vista previa).
- **Ámbito de configuración:** Live Debugger y Dynamic Instrumentation se activan o desactivan juntos para el mismo servicio y entorno.
- **Límites de frecuencia**
   - Puntos de registro con captura variable: Limitado a 1 ejecución por segundo.
   - Puntos de registro sin captura de variables: Limitado a 5000 ejecuciones por segundo, por instancia de servicio.
- **Duración de la sesión:** Las sesiones de depuración expiran automáticamente después de 48 horas por defecto.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/dynamic_instrumentation/
[2]: /es/dynamic_instrumentation/expression-language/
[3]: /es/dynamic_instrumentation/sensitive-data-scrubbing/
[4]: /es/agent/
[5]: /es/remote_configuration
[6]: https://github.com/DataDog/dd-trace-java
[7]: https://github.com/DataDog/dd-trace-py
[8]: https://github.com/DataDog/dd-trace-dotnet
[9]: https://github.com/DataDog/dd-trace-js
[10]: https://github.com/DataDog/dd-trace-rb
[11]: https://github.com/DataDog/dd-trace-php
[12]: /es/getting_started/tagging/unified_service_tagging/
[13]: https://app.datadoghq.com/dynamic-instrumentation/setup
[14]: https://app.datadoghq.com/debugging/sessions
[15]: /es/dynamic_instrumentation/sensitive-data-scrubbing/#redact-based-on-variable-values-with-sensitive-data-scanner
[16]: /es/dynamic_instrumentation/#prerequisites
[17]: /es/dynamic_instrumentation/enabling
[18]: https://app.datadoghq.com/debugging/settings
[19]: /es/dynamic_instrumentation/#create-a-logs-index
[20]: /es/integrations/guide/source-code-integration/
[21]: https://app.datadoghq.com/account/billing
[22]: https://app.datadoghq.com/apm/traces
