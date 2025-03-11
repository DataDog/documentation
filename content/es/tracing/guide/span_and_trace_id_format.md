---
aliases:
- /es/tracing/faq/span_and_trace_id_format/
further_reading:
- link: /tracing/other_telemetry/connect_logs_and_traces/
  tag: documentación
  text: Correlacionar logs y trazas
title: Formatos de ID de traza y tramo
---
{{< jqmath-vanilla >}}

Esta página detalla la compatibilidad de la biblioteca de rastreo de Datadog con los IDs de traza (trace) y tramo (span).

- **IDs generados**: oor defecto, todas las bibliotecas de rastreo generan IDs de traza de 128 bits e IDs de tramo de 64 bits.
- **IDs aceptados**: Datadog acepta IDs de traza de 128 o 64 bits, e IDs de tramo de 64 bits.

## Identificadores de traza de 128 bits

Los ID de traza de 128 bits se generan y aceptan por defecto en las últimas versiones de las bibliotecas de rastreo de Datadog:

- [Node.js][1]
- [Java][2]   
- [Go][3]     
- [Python][4] 
- [Ruby][5]   
- [.NET][6]   
- [PHP][7]    
- [C++][8]   

## IDs de traza y tramo de 64 bits

### IDs de traza

Por defecto, los IDs de traza se generan como 128 bits, y se aceptan como enteros de 128 o 64 bits. Para generar IDs de traza de 64 bits, ajusta la variable de entorno `DD_TRACE_128_BIT_TRACEID_GENERATION_ENABLED` en `false`.

### IDs de tramo

Los ID de tramo están limitados a 64 bits en Datadog.

| Lenguaje   | IDs generados            | IDs int de 64 bits válidos y aceptados |
| ---------- | ------------------------ | ----------------------------- |
| Node.js    | Sin signo [0, $2^63$]     | Con o sin signo            |
| Java       | Sin signo [1, $2^63-1$]   | Sin signo                      |
| Go         | Sin signo [0, $2^63-1$]   | Con o sin signo            |
| Python     | Sin signo [0, $2^64-1$]   | Sin signo                      |
| Ruby       | Sin signo [1, $2^62-1$]   | Sin signo                      |
| .NET       | Sin signo [0, $2^63-1$]   | Sin signo                      |
| PHP        | Sin signo [1, $2^64-1$]   | Sin signo                      |
| C++        | Sin signo [0, $2^63-1$]   | Sin signo                      |

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-js/releases
[2]: https://github.com/DataDog/dd-trace-java/releases
[3]: https://github.com/DataDog/dd-trace-go/releases
[4]: https://github.com/DataDog/dd-trace-py/releases
[5]: https://github.com/DataDog/dd-trace-rb/releases
[6]: https://github.com/DataDog/dd-trace-dotnet/releases
[7]: https://github.com/DataDog/dd-trace-php/releases
[8]: https://github.com/DataDog/dd-trace-cpp/releases