---
further_reading:
- link: logs/log_configuration/attributes_naming_convention
  tag: Documentación
  text: Más información sobre los atributos estándar de Log Management
- link: /real_user_monitoring/browser/data_collected
  tag: Documentación
  text: Datos recopilados para el navegador RUM
- link: /tracing/trace_explorer/query_syntax/
  tag: Documentación
  text: Aprender a explorar tus trazas
title: Semántica de span tags
---

## Información general

Las [bibliotecas de rastreo de Datadog][1] proporcionan compatibilidad predefinida para instrumentar una variedad de librerías.
Estas instrumentaciones generan tramos (spans) para representar unidades lógicas de trabajo en sistemas distribuidos.
Cada tramo (span) consta de [etiquetas (tags) de tramo][2] para proporcionar información adicional sobre la unidad de trabajo que se realiza en el sistema. Las convenciones de nomenclatura describen el nombre y el contenido que puedes utilizar en eventos de tramo.

<div class="alert alert-info">Para encontrar una lista completa de todas las span tags, atributos reservados y convenciones de nomenclatura, consulta <a href="/standard-attributes/?product=apm">Atributos estándar por defecto.</a></div>

## Convenciones de nomenclatura de etiqueta de tramo

Existe una gran variedad de span tags para describir el trabajo que se realiza en el sistema. Por ejemplo, existen span tags para describir los siguientes ámbitos:

- **Reservados**: atributos que siempre están presentes en todos los tramos.
- **Principal**: instrumentación utilizada y el tipo de operación.
- **Comunicaciones de red**: unidades de trabajo correspondientes a comunicaciones de red.
- **Solicitudes HTTP**: tramos de cliente HTTP y servidor.
- **Base de datos**: tramos de base de datos.
- **Cola de mensajes**: tramos de sistema de mensajería.
- **Llamadas a procedimientos remotos**: tramos correspondiente a llamadas a procedimientos remotos, como RMI o gRPC.
- **Errores**: errores asociados a tramos.

Para más información, consulta [Atributos estándar por defecto][6].

## Etiquetas de tramo y atributos de tramo

Las span tags y los atributos de tramo son conceptos similares, pero distintos:

- Las [span tags](#span-tags) son el contexto alrededor del tramo.
- Los [atributos de tramo](#span-attributes) son el contenido del tramo.

### Etiquetas de tramo

Las span tags son el contexto que rodea al tramo. Algunos ejemplos son:

- **Etiquetas de host**: `hostname`, `availability-zone`, `cluster-name`
- **Etiquetas de contenedor**: `container_name`, `kube_deployment`, `pod_name`

Las etiquetas suelen enriquecerse a partir de otras fuentes de datos, como etiquetas procedentes de host, contenedor o catálogo de servicios. Estas etiquetas se añaden al tramo para describir el contexto. Por ejemplo, las etiquetas pueden describir las propiedades de host y contenedor de las que procede el tramo, o las propiedades de servicio de las que se emite el tramo.

Para encontrar span tags en Datadog, ve a la pestaña **Infrastructure** (Infraestructura) en el panel lateral Trace (traza):

{{< img src="/tracing/attributes/span-tags.png" alt="Etiquetas de tramo en la pestaña Infraestructura." style="width:100%;" >}}

### Atributos de tramo

Los atributos de tramo son el contenido del tramo. Algunos ejemplos son:

- `http.url`
- `http.status_code`
- `error.message`

Para consultar los atributos de tramo, utiliza el carácter `@` seguido del nombre del atributo en la casilla de búsqueda. Por ejemplo, `@http.url`.

Para encontrar los atributos de tramo en Datadog, ve a la pestaña **Info** (Información) en el panel lateral Trace (Traza):

{{< img src="/tracing/attributes/span-attributes.png" alt="Atributos de tramo en la pestaña Información." style="width:100%;" >}}

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/setup_overview/
[2]: /es/glossary/#span-tag
[3]: https://opentelemetry.io/docs/reference/specification/trace/api/#spankind
[4]: /es/tracing/setup_overview/configure_data_security/
[5]: /es/tracing/trace_collection/library_config/
[6]: /es/standard-attributes/?product=apm
