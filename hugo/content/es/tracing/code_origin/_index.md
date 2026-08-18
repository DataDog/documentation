---
aliases:
- /es/tracing/code_origins/
- /es/tracing/guide/code_origins/
description: Aprende a usar Code Origin para entender de dónde provienen tus tramos
  en tu base de código.
further_reading:
- link: /tracing/glossary/
  tag: Documentación
  text: Aprende sobre términos y conceptos de APM
- link: /tracing/trace_collection/
  tag: Documentación
  text: Aprende a configurar el trazado de APM con tu aplicación
- link: /tracing/services/service_page/
  tag: Documentación
  text: Aprende más sobre los servicios en Datadog
- link: /tracing/services/resource_page/
  tag: Documentación
  text: Profundiza en el rendimiento de tus recursos y trazas
- link: /tracing/live_debugger/
  tag: Documentación
  text: Aprende a depurar servicios en producción con Live Debugger
- link: /dynamic_instrumentation/
  tag: Documentación
  text: Aprende a agregar tramos personalizados con Instrumentación Dinámica
title: Code Origin para Tramos
---
## Resumen {#overview}

Code Origin captura las ubicaciones exactas en tu base de código donde se crean los tramos de APM. Cuando está habilitado en un servicio compatible, agrega automáticamente la ruta del archivo, el número de línea y el nombre de la función a cada [tramo de entrada del servicio][12], facilitando así:

- Depurar problemas de rendimiento
- Entender el flujo de ejecución del código
- Identificar cuellos de botella en el rendimiento

En Trace Explorer, selecciona un tramo de un servicio habilitado para ver los detalles de Code Origin en la pestaña Resumen:
{{< img src="tracing/code_origin/code_origin_details_spotlight.png" alt="Detalles de Code Origin" style="width:100%;">}}


## Introducción {#getting-started}

### Requisitos previos {#prerequisites}
- [Datadog APM][6] está configurado para capturar tramos.
- [Integración de código fuente][7] está habilitada (requerida para las vistas previas de código).
- Su servicio cumple con los [requisitos de compatibilidad](#compatibility-requirements).

### Requisitos de compatibilidad {#compatibility-requirements}

{{% tabs %}}

{{% tab "Java" %}}

| Versión del SDK | Frameworks |
|---|---|
| 1.47.0+ | Spring Boot/Data, servidores gRPC, Micronaut 4, consumidores de Kafka |

**Limitación:** En JDK 18 y versiones anteriores, las clases compiladas con la `-parameters` bandera pueden no ser compatibles. Spring 6+, Spring Boot 3+ y Scala utilizan esta bandera por defecto.

{{% /tab %}}

{{% tab "Python" %}}

| Versión del SDK | Frameworks |
|---|---|
| 2.15.0+ | Django, Flask, Starlette y derivados |

{{% /tab %}}

{{% tab "Node.js" %}}

| Versión del SDK | Frameworks |
|---|---|
| 4.49.0+ | Fastify |
| 5.54.0+ | Express |

**Nota:** NestJS no es compatible, aunque el marco subyacente sea Express o Fastify.

{{% /tab %}}

{{% tab ".NET" %}}

| Versión del SDK | Frameworks |
|---|---|
| 3.15.0+ | ASP.NET, ASP.NET Core |

{{% /tab %}}

{{% tab "PHP" %}}

| Versión del SDK | Frameworks |
|---|---|
| 1.11.0+ | Todos los frameworks web compatibles |

{{% /tab %}}

{{% /tabs %}}

### Habilitar origen de código {#enable-code-origin}

Ejecute su servicio con la siguiente variable de entorno:

```shell
export DD_CODE_ORIGIN_FOR_SPANS_ENABLED=true
```

<div class="alert alert-info">
  Para aplicaciones de Node.js transpileadas (por ejemplo, TypeScript), asegúrese de generar y publicar mapas del código fuente con la aplicación desplegada, ejecute Node.js con el <a href="https://nodejs.org/docs/latest/api/cli.html#--enable-source-maps"><code>--enable-source-maps</code></a>la bandera, y use la versión 5.59.0 o más reciente del rastreador de Node.js. De lo contrario, las vistas previas de código no funcionan. Consulte la documentación de <a href="/integrations/guide/source-code-integration/?tab=nodejs#setup">Integración de Código Fuente</a> de Node.js para más detalles.
</div>

## Usando el Origen de Código {#using-code-origin}

### En el Explorador de Trazas {#in-the-trace-explorer}

1. Navegue hasta el [Explorador de Trazas][1].
1. Busque "Service Entry Spans" de sus servicios habilitados para Origen de Código.

    {{< img src="tracing/code_origin/code_origin_service_entry_spans_filter.png" alt="Origen de Código - Buscar Service Entry Spans" style="width:100%;">}}

1. Haga clic en un tramo para ver sus detalles.
1. En el panel lateral de detalles de la traza, busque la sección "Origen de Código".

    {{< img src="tracing/code_origin/code_origin_details_spotlight.png" alt="Detalles del Origen de Código en el Explorador de Trazas" style="width:100%;">}}

1. Desde la sección de Origen de Código:
    - Inicie una sesión de [Depurador en Vivo][11] en el servicio en ejecución haciendo clic en "Iniciar Sesión de Depuración" para capturar registros en la ubicación del método de Origen de Código. O, seleccione un punto de interrupción en el margen de la vista previa de código para capturar registros en la línea de código seleccionada.

        {{< img src="tracing/code_origin/code_origin_start_debug_session.png" alt="Origen de Código - Iniciar Sesión de Depurador en Vivo" style="width:100%;">}}

     - Click on source code variables to add them as attributes to future spans with [Dynamic Instrumentation][5].

        {{< img src="tracing/code_origin/code_origin_add_span_tag_spotlight.png" alt="Origen de Código - Agregar etiqueta de tramo con Instrumentación Dinámica" style="width:100%;">}}


### En su IDE {#in-your-ide}

1. Configura tu [Integración de IDE de Datadog][4].
    - IDEs soportados: IntelliJ, VS Code
    - Lenguajes soportados: Java, Python
2. Visualiza métricas RED (Solicitudes, Errores y Duración) como anotaciones en línea sobre tus métodos de endpoint.

    {{< img src="tracing/code_origin/code_origin_ide_details.png" alt="Detalles de Origen del Código en IDE" style="width:100%;">}}

## Solución de problemas {#troubleshooting}

### Falta la sección de Origen del Código {#code-origin-section-is-missing}

- Verifica que el Origen del Código esté [habilitado](#enable-code-origin) en la configuración de tu SDK.
- Confirma que tu servicio cumpla con todos los [requisitos de compatibilidad](#compatibility-requirements) (es decir, lenguaje del servicio, frameworks soportados y versión mínima del tracer).
- Para la mayoría de los servicios, los datos de Origen del Código se capturan solo para [tramos de entrada del servicio][12]. Puedes filtrar a "Tramos de Entrada del Servicio" en el [Explorador de Trazas APM][1].

    {{< img src="tracing/code_origin/code_origin_service_entry_spans_filter.png" alt="Origen de Código - Buscar Service Entry Spans" style="width:100%;">}}

### La vista previa del código no es visible o el archivo no se encuentra {#code-preview-is-not-visible-or-the-file-is-not-found}

- Asegúrate de que se cumplan todos los requisitos de configuración de [Integración de Código Fuente][7], incluyendo que tus `DD_GIT_*` variables de entorno estén configuradas con los valores correctos.
- Para aplicaciones de Node.js transpileadas (por ejemplo, TypeScript), asegúrate de generar y publicar mapas del código fuente con la aplicación desplegada, ejecuta Node.js con la bandera [`--enable-source-maps`][10] y utiliza la versión 5.59.0 o más reciente del tracer de Node.js. De lo contrario, las vistas previas del código no funcionarán. Consulta la documentación de [Integración de Código Fuente][9] de Node.js para más detalles.
- El Origen del Código está diseñado para referenciar solo el código del usuario, pero en algunos casos, las referencias de código de terceros pueden pasar desapercibidas. Puedes reportar estos casos a [soporte de Datadog][13] y ayudar a mejorar estas referencias.

## Lectura Adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/apm/traces
[2]: /es/tracing/services/service_page/
[3]: /es/tracing/services/resource_page/
[4]: /es/ide_plugins/
[5]: /es/dynamic_instrumentation/
[6]: /es/tracing/trace_collection/
[7]: /es/integrations/guide/source-code-integration/
[8]: /es/tracing/trace_collection/compatibility/nodejs#web-framework-compatibility
[9]: /es/integrations/guide/source-code-integration/?tab=nodejs#setup
[10]: https://nodejs.org/docs/latest/api/cli.html#--enable-source-maps
[11]: /es/tracing/live_debugger/
[12]: /es/glossary/#service-entry-span
[13]: https://www.datadoghq.com/support/