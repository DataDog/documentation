---
aliases:
- /es/tracing/code_origins/
- /es/tracing/guide/code_origins/
description: Más información sobre cómo utilizar Code Origin para entender dónde
  se originan tus tramos en tu código base
further_reading:
- link: /tracing/glossary/
  tag: Documentación
  text: Más información sobre términos y conceptos de APM
- link: /tracing/trace_collection/
  tag: Documentación
  text: Aprende a configurar APM tracing con su aplicación
- link: /tracing/services/service_page/
  tag: Documentación
  text: Más información sobre servicios en Datadog
- link: /tracing/services/resource_page/
  tag: Documentación
  text: Profundizar en el rendimiento de tus recursos y trazas
- link: /tracing/live_debugger/
  tag: Documentación
  text: Más información sobre cómo depurar servicios de producción con Live Debugger
- link: /dynamic_instrumentation/
  tag: Documentación
  text: Más información sobre cómo añadir tramos personalizados con Dynamic Instrumentation
title: Code Origin para tramos (spans)
---

{{< beta-callout url="#" btn_hidden="true" >}}
Code Origin está actualmente en Vista previa. Para unirte a la vista previa, sigue las siguientes instrucciones para activar la función en tus servicios compatibles.

Para enviar preguntas, comentarios o solicitudes relacionadas con Code Origin, <a href="https://docs.google.com/forms/d/e/1FAIpQLScyeRsF2GJjYdf9bUyeDjt8_9id-gvqiBU1SHR3ioDGe5eF3g/viewform?usp=header">rellena este formulario</a> con tus datos.
{{< /beta-callout >}}

## Información general

Code Origin detecta las localizaciones exactas en tu código base donde se crean tramos APM. Cuando se activa en un servicio compatible, añade automáticamente la ruta del archivo, el número de la línea y el nombre de la función a cada [tramo de entrada de servicios][12], lo que facilita:

- Depurar problemas de rendimiento
- Entender el flujo de ejecución del código
- Identificar cuellos de botella en el rendimiento

En el Explorador de trazas, selecciona un tramo de un servicio habilitado para ver detalles de Code Origin en la pestaña Información general:
{{< img src="tracing/code_origin/code_origin_details_spotlight.png" alt="Detalles de Code Origin" style="width:100%;">}}


## Empezando

### Requisitos previos
- [Datadog APM][6] está configurado para capturar tramos.
- La [integración del código fuente][7] (necesaria para la vista previa del código) está habilitada.
- Tu servicio cumple los [requisitos de compatibilidad](#compatibility-requirements).

### Requisitos de compatibilidad

| Lenguaje en tiempo de ejecución | Versión de librería de rastreo | Marcos |
|---|---|---|
| Java | 1.47.0 o posterior | Spring Boot/Data, servidores gRPC, Micronaut 4, consumidores Kafka|
| Python | 2.15.0+ | Django, Flask, Starlette y derivados|
| Node.js | 4.49.0 o posterior | Fastify|
| .NET | 3.15.0 o posterior | ASP.NET, ASP.NET Core|

### Activar Code Origin

Ejecuta tu servicio con la siguiente variable de entorno:

```shell
export DD_CODE_ORIGIN_FOR_SPANS_ENABLED=true
```

<div class="alert alert-info">
  En aplicaciones Node.js transpiladas (por ejemplo, TypeScript), asegúrate de generar y publicar mapas de fuentes con la aplicación desplegada y de ejecutar Node.js con el marcador <a href="https://nodejs.org/docs/latest/api/cli.html#--enable-source-maps"><code>--enable-source-maps</code></a>. De lo contrario, las vistas previas del código no funcionarán. Para ver más detalles, consulta la documentación de la <a href="/integrations/guide/source-code-integration/?tab=nodejs#setup">integración del código fuente</a> de Node.js.
</div>

## Uso de Code Origin

### En el Explorador de trazas

1. Ve al [Explorador de trazas][1].
1. Busca "tramos de entrada de servicios" desde tus servicios habilitados para Code Origin.

    {{< img src="tracing/code_origin/code_origin_service_entry_spans_filter.png" alt="Code Origin - Buscar tramos de entrada de servicios" style="width:100%;">}}

1. Haz clic en un tramo para ver los detalles.
1. En el panel lateral de detalles de la traza, busca la sección "Code Origin".

    {{< img src="tracing/code_origin/code_origin_details_spotlight.png" alt="Detalles de Code Origin en el Explorador de trazas" style="width:100%;">}}

1. De la sección Code Origin:
    - Inicia una sesión de [Live Debugger][11] en el servicio en ejecución haciendo clic en "Start Debug Session" (Empezar la sesión de depuración), para capturar logs en la localización del método de Code Origin. O bien, selecciona un punto de interrupción en el gutter de la vista previa del código, para capturar logs en la línea de código seleccionada.

        {{< img src="tracing/code_origin/code_origin_start_debug_session.png" alt="Code Origin - Iniciar sesión de Live Debugger" style="width:100%;">}}

     - Haz clic en las variables del código fuente para añadirlas como atributos a tramos futuros con [Dynamic Instrumentation][5].

        {{< img src="tracing/code_origin/code_origin_add_span_tag_spotlight.png" alt="Code Origin - Añadir span tags con Dynamic Instrumentation" style="width:100%;">}}


### En tu IDE

1. Configura tu [integración Datadog IDE][4].
    - IDE compatibles: IntelliJ, VS Code
    - Lenguajes admitidos: Java, Python
2. Visualiza las métricas RED (Solicitudes, Errores y Duración) como anotaciones en línea de tus métodos de endpoint.

    {{< img src="tracing/code_origin/code_origin_ide_details.png" alt="Detalles de Code Origin en IDE" style="width:100%;">}}

## Solucionar problemas

### Falta sección Code Origin

- Verifica que Code Origin está [habilitado](#enable-code-origin) en la configuración de tu biblioteca de rastreo.
- Confirma que tu servicio cumple todos los [requisitos de compatibilidad](#compatibility-requirements) (es decir, lenguaje del servicio, marcos compatibles y versión mínima del rastreador).
- En la mayoría de los servicios, los datos de Code Origin se capturan sólo para [tramos de entrada de servicios][12]. Puedes filtrar por "tramos de entrada de servicios" en el [Explorador de trazas APM][1].

    {{< img src="tracing/code_origin/code_origin_service_entry_spans_filter.png" alt="Code Origin - Buscar tramos de entrada de servicios" style="width:100%;">}}

- Para buscar todos los tramos que incluyan Code Origin, utiliza la consulta `@_dd.code_origin.type:*` en el [Explorador de trazas APM][1].

### La vista previa del código no es visible o no se encuentra el archivo

- Asegúrate de que se cumplen todos los requisitos de configuración de la [integración del código fuente][7] y de que tus variables de entorno de `DD_GIT_*` están configuradas con los valores correctos.
- En aplicaciones Node.js transpiladas (por ejemplo, TypeScript), asegúrate de generar y publicar mapas de fuentes con la aplicación desplegada y de ejecutar Node.js con el marcador [`--enable-source-maps`][10]. De lo contrario, las vistas previas del código no funcionarán. Para ver más detalles, consulta la documentación de la [integración del código fuente][9] de Node.js.
- Code Origin está diseñado para referenciar únicamente códigos de usuario, pero en algunos casos pueden colarse referencias a códigos de terceros. Puedes informar de estos casos al [servicio de asistencia de Datadog][13] y ayudar a mejorar estas referencias.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/apm/traces
[2]: /es/tracing/services/service_page/
[3]: /es/tracing/services/resource_page/
[4]: /es/developers/ide_plugins/
[5]: /es/dynamic_instrumentation/
[6]: /es/tracing/trace_collection/
[7]: /es/integrations/guide/source-code-integration/
[8]: /es/tracing/trace_collection/compatibility/nodejs#web-framework-compatibility
[9]: /es/integrations/guide/source-code-integration/?tab=nodejs#setup
[10]: https://nodejs.org/docs/latest/api/cli.html#--enable-source-maps
[11]: /es/tracing/live_debugger/
[12]: /es/glossary/#service-entry-span
[13]: https://www.datadoghq.com/support/
