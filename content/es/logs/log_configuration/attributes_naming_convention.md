---
aliases:
- /es/logs/processing/attributes_naming_convention/
description: Obtener más información sobre atributos y compatibilidad de la convención
  de nomenclatura
further_reading:
- link: logs/log_configuration/pipelines
  tag: Documentación
  text: Descubrir los pipelines de Datadog
- link: logs/log_configuration/processors
  tag: Documentación
  text: Consultar la lista de todos los procesadores disponibles
- link: logs/logging_without_limits
  tag: Documentación
  text: Logging without Limits
- link: logs/explorer
  tag: Documentación
  text: Aprender a explorar tus logs
- link: https://www.datadoghq.com/blog/cidr-queries-datadog-log-management/
  tag: Blog
  text: Uso de consultas con notación de CIDR para filtrar tus logs de tráfico de
    red
kind: documentación
title: Atributos y alias
---

## Información general

Centralizar logs a partir de varias tecnologías y aplicaciones puede generar decenas o centenas de atributos diferentes en un entorno Log Management, especialmente cuando muchos equipos trabajan en el mismo entorno.

Por ejemplo, una IP de cliente puede tener varios atributos de logs, como `clientIP`, `client_ip_address`, `remote_address`, `client.ip`, etc. Es posible hacer referencia a un tiempo de ejecución como `exec_time`, `request_latency`, `request.time_elapsed`, etc.

Utiliza **atributos** y **alias** para unificar el entorno de tus logs.

## Tipos de atributos y alias

Los atributos imponen [facetas de logs][1] y [etiquetas (tags)][2] que se utilizan para filtrar y buscar en el Explorador de logs.

  * Los [**atributos reservados**](#reserved-attributes) se consumen automáticamente.

  * Los [**atributos estándar**](#standard-attributes) son la columna vertebral de la convención de nomenclatura de tu organización. Existe un conjunto predeterminado de atributos estándar disponibles en [la aplicación][3]. Sin embargo, esta lista puede personalizarse para crear una **convención de nomenclatura** para tu equipo.

  * Utiliza los [**alias**](#aliasing) una vez que hayas implementado una convención de nomenclatura con atributos estándar o si estás intentando crear una faceta estándar única a partir de múltiples fuentes de logs. Por ejemplo, realiza un seguimiento de los clientes más afectados por las latencias en una infraestructura híbrida [Apache][4] y [Amazon Cloud Front][5], utilizando la faceta estándar `Network Client IP` junto con la `duration` estándar. El uso de alias permite la implementación de una convención de nomenclatura sin tener que cambiar la pila técnica de un equipo.

## Atributos reservados

A continuación se muestra una lista de los atributos reservados que se consumen automáticamente con los logs.

**Nota**: Si también estás recopilando trazas o métricas, se recomienda configurar el etiquetado unificado de servicios. Esta configuración combina la telemetría de Datadog mediante el uso de tres etiquetas estándar: `env`, `service` y `version`. Para obtener más información, consulta la documentación específica del [etiquetado unificado de servicios][6].

| Atributo | Descripción                                                                                                                                                                                                                                |
|-----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `host`    | El nombre del host de origen tal y como se define en las métricas. Datadog recupera automáticamente las etiquetas de host correspondientes del host coincidente en Datadog y los aplica a tus logs. El Agent configura este valor automáticamente.                          |
| `source`  | Corresponde al nombre de la integración, la tecnología de la que procede el log. Cuando coincide con un nombre de integración, Datadog instala automáticamente los analizadores y las facetas correspondientes. Por ejemplo, `nginx`, `postgresql`, etc. |
| `status`  | Corresponde al nivel/a la severidad de un log. Se utiliza para definir [patrones][7] y tiene un diseño específico en la interfaz de usuario de los logs de Datadog.                                                                                                     |
| `service` | El nombre de la aplicación o del servicio que genera eventos de logs. Se utiliza para pasar de logs a APM, así que asegúrate de definir el mismo valor cuando utilices ambos productos.                                                                |
| `trace_id` | Corresponde al ID de rastreo utilizado para trazas. Se utiliza para [correlacionar tu log con su traza][8].                                                                                                                                 |
| `message` | Por defecto, Datadog consume el valor del atributo `message` como cuerpo de la entrada del log. Ese valor se resalta y se muestra en Live Tail, donde se indexa para el texto completo de la búsqueda.                                    |

## Atributos estándar

Las integraciones de logs se basan de forma nativa en un [conjunto predeterminado][9] de atributos estándar.

Los usuarios administradores de tu organización pueden gestionar la lista:

- Desde el [Explorador de logs][1]: **Promueve** atributos existentes como atributos estándar.
- Desde la [página de configuración][3] del atributo estándar: **Crea** nuevos atributos estándar.

{{< img src="logs/processing/attribute_naming_convention/standard_attribute_config.png" alt="Atributos estándar" style="width:60%;">}}

La tabla de atributos estándar viene con un conjunto de [atributos estándar predefinidos](#default-standard-attribute-list). Puedes añadir esa lista a tus propios atributos y editar o eliminar los atributos estándar existentes:

{{< img src="logs/processing/attribute_naming_convention/edit_standard_attributes.png" alt="Editar atributos estándar" style="width:80%;">}}

Un atributo estándar se define por su:

- `Path`: ruta del atributo **promocionado** como atributo estándar, tal y como lo encontrarías en tu JSON (por ejemplo, `network.client.ip`).
- `Type`(`string`, `integer`, `double`, `boolean`): tipo de atributo, que se utiliza para eliminar elementos de la lista de reasignación.
- `Aliasing list`: lista de atributos separada por comas que se debe utilizar para **solapar**.
- `Description`: descripción legible del atributo.

El panel de atributos estándar aparece cuando se añade un nuevo atributo estándar o se edita uno existente:

{{< img src="logs/processing/attribute_naming_convention/define_standard_attribute.png" alt="Definir atributos estándar" style="width:80%;">}}

### Lista de atributos estándar por defecto

Consulta la lista completa lista de [atributos estándar por defecto de Log Management][9], que se divide en los dominios funcionales:

- [Red/Comunicaciones][10]
  - Estos atributos están relacionados con los datos utilizados en la comunicación de red. Todos los campos y todas las métricas llevan el prefijo `network`.
- [Geolocalización][11]
  - Estos atributos están relacionados con la geolocalización de las direcciones IP utilizadas en la comunicación de red. Todos los campos llevan el prefijo `network.client.geoip` o `network.destination.geoip`.
- [Solicitudes HTTP][12]
  - Estos atributos están relacionados con datos utilizados habitualmente en las solicitudes y accesos HTTP. Todos los atributos llevan el prefijo `http`.
  - Las integraciones típicas que dependen de estos atributos incluyen servidores de aplicaciones web [Apache][4], Rails, [AWS CloudFront][13], etc.
  - Los atributos de detalles de URL llevan el prefijo `http.url_details`. Estos atributos proporcionan información sobre las partes analizadas de la URL HTTP. Son generados por el [Analizador URL][14].
- [Código fuente][15]
  - Estos atributos están relacionados con los datos que se utilizan cuando se genera un log o un error utilizando un creador de logs en una aplicación personalizada. Todos los atributos llevan el prefijo `logger` o `error`.
  - Las integraciones típicas que se basan en estos atributos son Java, NodeJS, .NET, Golang, Python, etc.
- [Base de datos] [16]
  - Las integraciones típicas que se basan en estos atributos son  [Cassandra][17], [MySQL][18], [RDS][19], [Elasticsearch][20], etc.
- [Rendimiento][21]
  - Estos atributos están relacionados con las métricas de rendimiento. Datadog recomienda [reasignar][22] cualquier duración de tus logs con este atributo, ya que se muestran y se utilizan como [medida][1] por defecto para la [búsqueda de trazas][23].
- [Atributos relacionados con el usuario][24]
  - Todos los atributos y todas las medidas llevan el prefijo `usr`.
- [Syslog y trasvasadores de logs][25]
  - Estos atributos están relacionados con los datos añadidos por un syslog o un agente trasvasador de logs. Todos los campos y todas las métricas llevan el prefijo `syslog`.
  - Las integraciones que se basan en ellos son [Rsyslog][26], [NxLog][27], [Syslog-ng][28], [FluentD][29] y [Logstash][30].
- [DNS][31]
  - Todos los atributos y todas las medidas llevan el prefijo `dns`.
- [Eventos][32]
  - Todos los atributos llevan el prefijo `evt`.

## Solapamiento

La creación de un alias para un atributo de origen que se asigna a un atributo de destino permite a los logs llevar tanto el atributo de origen como el de destino.

Los usuarios pueden interactuar tanto con el atributo con el alias (origen), como con el atributo estándar (destino). Sin embargo, se [invita][33] a los usuarios a utilizar la faceta estándar, en lugar de la del alias. De este modo, se orienta la convención de nomenclatura y se disuade a los usuarios de crear recursos (como vistas guardadas o dashboards) basados en contenido no estándar.

**Detalles adicionales sobre el solapamiento**:

- El aliasing se produce después de que los pipelines procesan logs. Cualquier atributo extraído o procesado puede utilizarse como fuente de aliasing.
- Datadog impone un tipo de atributo con alias. Si esto no es posible, se omite el aliasing.
- Cuando un log ya lleva el atributo de destino, el aliasing anula el valor de ese log.
- En el caso de un atributo estándar al que se alian varios atributos, si un log lleva varios de estos atributos de origen, sólo se aliasa uno de estos atributos de origen.
- Las actualizaciones o adiciones a los atributos estándar sólo se aplican a los logs recientemente consumidos.
- Los atributos estándar no pueden tener alias.
- Los atributos sólo pueden ser alias a atributos estándar.
- Para respetar la estructura JSON de los logs, no es posible tener un atributo estándar como elemento secundario de otro (por ejemplo, `user` y `user.name` no pueden ser ambos atributos estándar).

Para obtener más información, consulta [Facetas de alias][34].

## Leer más

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
[14]: /es/logs/log_configuration/processors/#url-parser
[15]: /es/standard-attributes/?search=logger+error&product=log+management
[16]: /es/standard-attributes/?search=db&product=log+management
[17]: /es/integrations/cassandra/
[18]: /es/integrations/mysql/
[19]: /es/integrations/amazon_rds/
[20]: /es/integrations/elastic/
[21]: /es/standard-attributes/?search=duration&product=log+management
[22]: /es/logs/log_configuration/processors/#remapper
[23]: /es/tracing/app_analytics/search/
[24]: /es/standard-attributes/?search=usr&product=log+management
[25]: /es/standard-attributes/?search=syslog&product=log+management
[26]: /es/integrations/rsyslog/
[27]: /es/integrations/nxlog/
[28]: integrations/syslog_ng/
[29]: /es/integrations/fluentd/
[30]: /es/integrations/logstash/
[31]: /es/standard-attributes/?search=dns&product=log+management
[32]: /es/standard-attributes/?search=evt&product=log+management
[33]: /es/logs/explorer/facets/#aliased-facets
[34]: /es/logs/explorer/facets/#alias-facets