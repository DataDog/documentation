---
disable_toc: false
further_reading:
- link: /tracing/guide/inferred-service-opt-in
  tag: Documentación
  text: Optar por la representación del nuevo servicio
title: Sobreescritura de servicios
---

## Información general

Los [servicios inferidos][1] mejoran la forma en que Datadog representa las dependencias de servicios. Este documento explica los cambios y cómo adaptar tu configuración.

### Antes de los servicios inferidos

Datadog solía cambiar los nombres de servicios de tramos (spans) de clientes (`span.kind:client`) para representar bases de datos, colas y dependencias de terceros. Por ejemplo, una llamada de cliente desde el servicio `A` a una base de datos PostgreSQL sería etiquetada como `service:postgres` o `service:A-postgres`. Cambiar los nombres de servicios de tramos se denomina [**sobreescritura de servicios**](#service-override) en el resto de esta guía. El nombre inicial del servicio se denomina [**servicio base**](#base-service).

Con esta estrategia, un tramo que representa una llamada del cliente desde un servicio `auth-dotnet` a una base de datos PostgreSQL sería etiquetada como `service:auth-dotnet-postgres`. En los mapas de servicios, estas dependencias se representaban como servicios separados, como se muestra a continuación:

{{< img src="/tracing/guide/service_overrides/old_service_rep.png" alt="Repesentación del antiguo servicio" style="width:80%;">}}

### Con servicios inferidos

Las dependencias se infieren automáticamente a partir de los atributos de tramo recopilados en tramos de clientes (por ejemplo, `db.system`, `db.name`). El tramo del cliente conserva el nombre del servicio base y la base de datos se infiere utilizando otros atributos. Como resultado, ya no es necesario cambiar el atributo `service` en el tramo del cliente.

Utilizando el ejemplo anterior, el tramo del cliente ahora sería etiquetado con el nombre del servicio base `auth-dotnet`  y la base de datos se inferiría a partir de atributos como `db.name:user-db` y `db.system:postgres`. La representación del mapa de servicios tendría el siguiente aspecto:

{{< img src="/tracing/guide/service_overrides/new_service_rep.png" alt="Representación del nuevo servicio" style="width:70%;">}}


### Impacto en la sobreescritura de servicios

Con las dependencias de servicios inferidas, las sobreescrituras de servicios podrían contaminar las listas y los mapas de servicios. En los mapas de servicios, verías los siguientes nodos en orden:
1. El nodo del servicio base, por ejemplo: `auth-dotnet`.
1. El nodo de la sobreescritura de servicios, por ejemplo: `auth-dotnet-postgres`.
1. El nodo del nuevo servicio inferido, por ejemplo: `user-db`.

{{< img src="/tracing/guide/service_overrides/service_overrides_new_service_rep.png" alt="Sobreescrituras de servicios" style="width:100%;">}}

La sobreescritura de servicios (`auth-dotnet-postgres`) rompe la conexión directa entre el servicio base y el servicio inferido. Ya no es útil, ya que la dependencia de la base de datos está ahora representada correctamente por el servicio inferido.

## Configuración de las sobreescrituras de servicios

#### Sobreescrituras de servicios en integraciones

Las bibliotecas de rastreo de Datadog define automáticamente diferentes nombres de servicios en tramos de clientes para representar bases de datos, colas o dependencias de servicios de terceros en integraciones. Este tipo de sobreescrituras de servicios se denominan **sobreescrituras de servicios en integraciones** en el resto de la guía.

#### Sobreescrituras personalizadas de servicios

Los nombres de servicios también pueden ser definidos manualmente por los usuarios, por ejemplo, para tener una visibilidad de componentes específicos de un servicio (bibliotecas compartidas, capas de middleware). Este tipo de sobreescrituras de servicios se denominan **sobreescrituras personalizadas de servicios** en el resto de la guía.

## Representación de las sobreescrituras de servicios en Datadog

Para conceder menos importancia a las sobreescrituras de servicios, estas se tratan visualmente de forma diferente en diversas páginas de productos APM.

#### En páginas de servicio y recursos

Los servicios que son sobreescrituras de servicios se marcan como tales en el encabezado de la página de servicios. Pasa el cursor por encima y busca la lista de servicios base donde se sobreescribe el nombre del servicio, de forma [personalizada](#custom-service-overrides), o como la configuración por defecto de la [integración](#integration-service-overrides).

{{< img src="/tracing/guide/service_overrides/service_overrides_service_page.png" alt="Sobreescrituras de páginas de servicios" style="width:70%;">}}

#### En mapas de servicios

En los mapas de servicios, las sobreescrituras de servicios se representan como parte del extremo que va desde el servicio base y el servicio inferido.

{{< img src="/tracing/guide/service_overrides/service_overrides_service_map.png" alt="Sobreescrituras de maás de servicios" style="width:80%;">}}

#### En trazas (traces)

En el panel lateral de trazas, la cabecera del tramo del cliente representa la llamada que va de el servicio base al servicio inferido. La parte superior de la sección de información general también muestra información sobre el nombre del servicio base, el nombre del servicio sobreescrito y el nombre de la entidad inferida.

{{< img src="/tracing/guide/service_overrides/service_overrides_traces.png" alt="Sobreescrituras de servicios del panel lateral de trazas" style="width:80%;">}}


## Eliminar las sobreescrituras de servicios

Para eliminar las *sobreescrituras de servicios en integraciones*, define la variable de entorno:

```sh
DD_TRACE_REMOVE_INTEGRATION_SERVICE_NAMES_ENABLED=true
```

Esto garantiza que el atributo `service` utilice siempre el nombre del servicio base en lugar de añadir el nombre de la integración (por ejemplo,`*-postgres`, `*-http-client`).

<div class="alert alert-warning">La eliminación de las sobreescrituras de servicios es un <b>cambio de último momento</b>. Las consultas de métricas, monitores o dashboards basadas en el nombre del servicio sobreescrito dejarán de coincidir.</div>

Se recomienda eliminar la sobreescritura de servicios progresivamente, procediendo servicio por servicio, para asegurar que ningún recurso crítico (como dashboards, monitores, filtros de conservación, etc.) se vea afectado por el cambio. Para garantizar una transición fluida al nuevo modelo, consulta las [instrucciones detalladas](#remove-service-overrides-progressively).

### Ejemplos 

Por ejemplo:

- Llamadas gRPC a etiquetas de .NET como `service:<DD_SERVICE>-grpc-client`
- Llamadas gRPC a etiquetas de Python como `service:grpc-client`

Con la opción `DD_TRACE_REMOVE_INTEGRATION_SERVICE_NAMES_ENABLED` definida como `true`, todas las bibliotecas de rastreo compatibles etiquetan tramos de clientes, capturando la llamada del servicio siguiente con el nombre del servicio llamante, `service:<DD_SERVICE>`. Esto garantiza que todos los tramos se etiqueten siempre con el *nombre de servicio predeterminado* que emite el tramo. Los atributos [`peer.*`][6] se utilizan para describir la dependencia llamada (por ejemplo, base de datos o cola).

| Escenario | Nombre de servicio | Atributos `peer.*` adicionales |
|----------|--------------|--------------------------------|
| *Sin* servicios inferidos y *con* sobreescrituras de servicios | `service:my-service-grpc-client` o `service:grpc-client` | Ningún atributo `peer.*` definido |
| *Con* servicios inferidos y *sin* sobreescrituras de servicios | `service:myservice` | `@peer.service:otherservice` (donde `otherservice` es el nombre del servicio remoto al que se llama con gRPC) |

Del mismo modo, para un tramo que representa una llamada a una base de datos mySQL:

| Escenario | Nombre de servicio | Atributos `peer.*` adicionales |
|----------|--------------|--------------------------------|
| *Sin* servicios inferidos y *con* sobreescrituras de servicios | `service:my-service-mysql` o `service:mysql` | Ninguna etiqueta `peer.*` configurada |
| *Con* servicios inferidos y *sin* sobreescrituras de servicios | `service:myservice` | `@peer.db.name:user-db`, `@peer.db.system:mysql` |

### Eliminar progresivamente las sobreescrituras de servicios

1. Identifica la sobreescritura de servicio que quieres eliminar y ve a su **página de servicios**.
2. Pase el ratón por encima de la píldora de sobreescritura de servicios en el encabezado de la página y observa los nombres de servicios base subyacentes. Estos son los servicios originales que emiten tramos con modificaciones. Es necesario actualizar la configuración de estos servicios instrumentados.

{{< img src="/tracing/guide/service_overrides/service_overrides_service_page.png" alt="Sobreescrituras de páginas de servicios" style="width:70%;">}}

3. Examina los activos existentes que puedan contener consultas que utilicen el nombre de la sobreescritura del servicio:

   - Cualquier consultas de monitores, dashboards o notebooks consultas basadas en [métricas de rastreo de APM][5]
   - [Métricas APM de tramos][2]
   - [Monitores de análisis de trazas][3] (basados en tramos indexados)
   - [Filtros de conservación][4]
   - Pipelines de Sensitive Data Scanner

4. Actualiza estas consultas para que utilicen el nombre del servicio base (`service:<DD_SERVICE>`). Esto permite que las consultas sigan coincidiendo cuando se eliminan las sobreescrituras de servicios.

5. Define `DD_TRACE_REMOVE_INTEGRATION_SERVICE_NAMES_ENABLED=true` para las sobreescrituras de servicios en integraciones.

**Nota**: La configuración anterior sólo elimina [sobreescrituras de servicios en integraciones](#integration-service-overrides). Las sobreescrituras personalizadas de servicios deben eliminarse directamente en el código.

## Glosario

##### Sobreescritura de servicios
Nombre de servicio definido para un tramo que difiere del nombre por defecto `DD_SERVICE`. Puede ser definido [automáticamente](#integration-service-overrides) por algunas integraciones Datadog o [manualmente](#custom-service-overrides), por los usuarios.

##### Servicio base
Nombre `DD_SERVICE` por defecto.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/guide/inferred-service-opt-in
[2]: /es/tracing/trace_pipeline/generate_metrics
[3]: /es/monitors/types/apm/?tab=traceanalytics
[4]: /es/tracing/trace_pipeline/trace_retention/#retention-filters
[5]: /es/tracing/metrics/metrics_namespace/
[6]: https://docs.datadoghq.com/es/tracing/guide/inferred-service-opt-in/#list-of-newly-introduced-peer-tags