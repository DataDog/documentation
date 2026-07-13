---
aliases:
- /es/logs/processing/attributes_naming_convention/
description: Aprenda sobre los atributos y cómo soportar una convención de nombres
further_reading:
- link: logs/log_configuration/pipelines
  tag: Documentación
  text: Descubra Datadog Pipelines
- link: logs/log_configuration/processors
  tag: Documentación
  text: Consulte la lista completa de procesadores disponibles
- link: logs/logging_without_limits
  tag: Documentación
  text: Registro sin límites
- link: logs/explorer
  tag: Documentación
  text: Aprenda cómo explorar sus registros
- link: https://www.datadoghq.com/blog/cidr-queries-datadog-log-management/
  tag: Blog
  text: Utilice consultas en notación CIDR para filtrar los registros de tráfico de
    su red
title: Atributos y Alias
---
## Resumen {#overview}

Centralizar registros de diversas tecnologías y aplicaciones puede generar decenas o cientos de atributos diferentes en un entorno de Log Management, especialmente cuando muchos equipos están trabajando en el mismo entorno

Por ejemplo, la IP del cliente puede tener diversos atributos de registro, como `clientIP`, `client_ip_address`, `remote_address`, `client.ip` y así sucesivamente El tiempo de ejecución de una solicitud puede denominarse `exec_time`, `request_latency`, `request.time_elapsed` y así sucesivamente

Utilice **atributos** y **aliasing** para unificar su entorno de registros

## Tipos de atributos y aliasing {#attribute-types-and-aliasing}

Los atributos prescriben [facetas de registros][1] y [etiquetas][2], que se utilizan para filtrar y buscar en el Explorador de Registros.

  * [**Atributos reservados**](#reserved-attributes) son ingeridos automáticamente.

  * [**Atributos estándar**](#standard-attributes) son la columna vertebral de la convención de nombres para su organización Hay un conjunto predeterminado de atributos estándar disponibles en [la aplicación][3]. Sin embargo, esta lista puede ser personalizada para crear una **convención de nombres** para su equipo

  * Utilice [**aliasing**](#aliasing) una vez que haya implementado una convención de nombres con atributos estándar o si está tratando de crear una faceta estándar única a partir de múltiples fuentes de registro Por ejemplo, siga a los clientes más afectados por latencias en una infraestructura híbrida de [Apache][4] y [Amazon Cloud Front][5], utilizando la faceta estándar `Network Client IP` junto con la estándar `duration` El aliasing permite implementar una convención de nombres sin tener que cambiar la pila técnica de un equipo

## Atributos reservados {#reserved-attributes}

A continuación se presenta una lista de atributos reservados que se ingieren automáticamente con los registros.

**Nota**: Si también está recopilando trazas o métricas, se recomienda configurar unified service tagging Esta configuración une la telemetría de Datadog a través del uso de tres etiquetas estándar: `env`, `service` y `version`. Consulte la documentación dedicada a unified service tagging para más información

| Atributo | Descripción                                                                                                                                                                                                                                |
|-----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `host`    | El nombre del host de origen según se define en las métricas. Datadog recupera automáticamente las etiquetas de host correspondientes del host coincidente en Datadog y las aplica a sus registros El Agente establece este valor automáticamente.                          |
| `source`  | Esto corresponde al nombre de la integración, la tecnología de la cual se originó el registro. Cuando coincide con un nombre de integración, Datadog instala automáticamente los analizadores y facetas correspondientes. Por ejemplo, `nginx`, `postgresql`, y así sucesivamente. |
| `status`  | Esto corresponde al nivel/severidad de un registro. Se utiliza para definir [patrones][7] y tiene un diseño dedicado en la interfaz de usuario de registros de Datadog.                                                                                                     |
| `service` | El nombre de la aplicación o servicio que genera los eventos de registro. Se utiliza para cambiar de Registros a APM, así que asegúrese de definir el mismo valor cuando utilice ambos productos                                                                |
| `trace_id` | Esto corresponde al ID de traza utilizado para las trazas. Se utiliza para [correlacionar su registro con su traza][8]                                                                                                                                 |
| `message` | Por defecto, Datadog ingiere el valor del atributo `message` como el cuerpo de la entrada de registro. Ese valor se resalta y se muestra en Live Tail, donde se indexa para búsqueda de texto completo.                                    |

## Atributos estándar {#standard-attributes}

Las integraciones de registro dependen nativamente de un [conjunto predeterminado][9] de atributos estándar.

La tabla de atributos estándar viene con un conjunto de [atributos estándar predefinidos](#default-standard-attribute-list). Puede agregar a esa lista sus propios atributos, y editar o eliminar los atributos estándar existentes

### Cree un nuevo atributo estándar {#create-a-new-standard-attribute}
**Los usuarios administradores** pueden curar la lista de atributos estándar:
1. Navegue a la [página de configuración de atributos estándar][3]
1. Haga clic en {{< ui >}}New Standard Attribute{{< /ui >}}
1. Defina el atributo estándar:
    - {{< ui >}}Path{{< /ui >}}: La ruta de los atributos estándar como la encontraría en su JSON (por ejemplo, network.client.ip)
    - {{< ui >}}Type{{< /ui >}}: (`string`, `integer`, `double`, `boolean`): El tipo del atributo, que se utiliza para convertir elementos de la lista de remapeo.
    - {{< ui >}}Description{{< /ui >}}: Descripción legible por humanos del atributo.
    - (Opcional) {{< ui >}}Remapping list{{< /ui >}}: Lista separada por comas de atributos no conformes que deben ser remapeados al atributo estándar.

### Lista de atributos estándar por defecto {#default-standard-attribute-list}

Consulte la lista completa de [Log Management Default Standard Attributes][9], que se divide en los dominios funcionales:
  
| Atributo Estándar               | Descripción                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
|----------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [Red/comunicaciones][10]     | Estos atributos están relacionados con los datos utilizados en la comunicación de red. Todos los campos y métricas están precedidos por `network`.                                                                                                                                                                                                                                                                                                                                                                             |
| [Geolocalización][11]                | Estos atributos están relacionados con la geolocalización de direcciones IP utilizadas en la comunicación de red. Todos los campos están precedidos por `network.client.geoip` o `network.destination.geoip`.                                                                                                                                                                                                                                                                                                                     |
| [Solicitudes HTTP][12]              | Estos atributos están relacionados con datos comúnmente utilizados en solicitudes y accesos HTTP. Todos los atributos están precedidos por `http`. Las integraciones típicas que dependen de estos atributos incluyen [Apache][4], Rails, [AWS CloudFront][13], servidores de aplicaciones web, y así sucesivamente. Los atributos de detalles de URL están precedidos por `http.url_details`. Estos atributos proporcionan detalles sobre las partes analizadas de la URL HTTP. Son generados por el [analizador de URL][14].                             |
| [Código fuente][15]                | Estos atributos están relacionados con los datos utilizados cuando se genera un registro o un error utilizando un registrador en una aplicación personalizada. Todos los atributos están precedidos ya sea por `logger` o `error`. Las integraciones típicas que dependen de estos atributos son Java, Node.js, .NET, Golang, Python, y así sucesivamente.                                                                                                                                                                        |
| [Base de datos][16]                   | Las integraciones típicas que dependen de estos atributos son [Cassandra][17], [MySQL][18], [RDS][19], [Elasticsearch][20], y así sucesivamente.                                                                                                                                                                                                                                                                                                                                                                         |
| [Rendimiento][21]                | Estos atributos están relacionados con métricas de rendimiento. Datadog recomienda [reasignar][22] cualquier duración dentro de sus registros en este atributo, ya que se muestran y utilizan como una [medida][1] predeterminada para la [búsqueda de trazas][23].                                                                                                                                                                                                                                                                           |
| [Atributos relacionados con el usuario][24]    | Todos los atributos y medidas están precedidos por `usr`.                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| [Syslog y agentes de envío de registros][25]    | Estos atributos están relacionados con los datos añadidos por un syslog o un agente de envío de registros. Todos los campos y métricas están precedidos por `syslog`. Las integraciones que dependen de estos incluyen [Rsyslog][26], [NxLog][27], [Syslog-ng][28], [Fluentd][29], y [Logstash][30].                                                                                                                                                                                                                                              |
| [DNS][31]                        | Todos los atributos y medidas están precedidos por `dns`.                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| [Events][32]                     | Todos los atributos están precedidos por `evt`                                                                                                                                                                                                                                                                                                                                                                                                                                                               |

## aliasing {#aliasing}

Crear un alias para un atributo de origen que se mapea a un atributo de destino permite que los registros contengan tanto los atributos de origen como los de destino.

Los usuarios pueden interactuar tanto con el atributo alias (origen) como con el atributo estándar (destino) Sin embargo, se recomienda que los usuarios utilicen la faceta estándar en lugar del atributo alias Esto proporciona orientación sobre la convención de nombres y desalienta a los usuarios de crear activos (como vistas guardadas o dashboards) basados en contenido no estándar

**Detalles adicionales sobre aliasing**:

- El aliasing ocurre después de que los registros son procesados por los pipelines. Cualquier atributo extraído o procesado puede ser utilizado como fuente para el aliasing.
- Datadog aplica el tipo de un atributo asignado como alias. Si esto no es posible, se omite el aliasing.
- En el caso de un registro que ya contiene el atributo de destino, el aliasing sobrescribe el valor de ese registro.
- Para un atributo estándar al que se le asignan múltiples atributos, si un registro contiene varios de estos atributos de fuente, solo uno de estos atributos de fuente se asigna como alias.
- Cualquier actualización o adición a los atributos estándar solo se aplica a los registros recién ingeridos.
- Los atributos estándar no pueden ser asignados como alias.
- Los atributos solo pueden ser asignados como alias a atributos estándar.
- Para respetar la estructura JSON de los registros, no es posible tener un atributo estándar como hijo de otro (por ejemplo, `user` y `user.name` no pueden ser ambos atributos estándar).

Consulte [Alias Facets][34] para información adicional.

## Lectura adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/logs/explorer/facets/
[2]: /es/logs/search_syntax/#tags
[3]: https://app.datadoghq.com/logs/pipelines/standard-attributes
[4]: /es/integrations/apache/
[5]: /es/integrations/amazon_cloudfront/
[6]: /es/getting_started/tagging/unified_service_tagging/
[7]: /es/logs/explorer/patterns/
[8]: /es/tracing/other_telemetry/connect_logs_and_traces/
[9]: /es/standard-attributes/?product=log+management
[10]: /es/standard-attributes/?product=log+management&search=network
[11]: /es/standard-attributes/?product=log+management&search=geolocation
[12]: /es/standard-attributes/?search=http.&product=log+management
[13]: /es/integrations/amazon_elb/
[14]: /es/logs/log_configuration/processors/url_parser/
[15]: /es/standard-attributes/?search=logger+error&product=log+management
[16]: /es/standard-attributes/?search=db&product=log+management
[17]: /es/integrations/cassandra/
[18]: /es/integrations/mysql/
[19]: /es/integrations/amazon_rds/
[20]: /es/integrations/elastic/
[21]: /es/standard-attributes/?search=duration&product=log+management
[22]: /es/logs/log_configuration/processors/remapper/
[23]: /es/tracing/app_analytics/search/
[24]: /es/standard-attributes/?search=usr&product=log+management
[25]: /es/standard-attributes/?search=syslog&product=log+management
[26]: /es/integrations/rsyslog/
[27]: /es/integrations/nxlog/
[28]: /es/integrations/syslog_ng/
[29]: /es/integrations/fluentd/
[30]: /es/integrations/logstash/
[31]: /es/standard-attributes/?search=dns&product=log+management
[32]: /es/standard-attributes/?search=evt&product=log+management
[33]: /es/logs/explorer/facets/#aliased-facets
[34]: /es/logs/explorer/facets/#alias-facets