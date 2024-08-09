---
aliases:
- /es/agent/faq/dogstream
private: true
title: Dogstream
---

<div class="alert alert-danger">
Esta es una función obsoleta del Agent 5. No se lanzarán más actualizaciones de esta función.
<br>
¡El Agent v6 ya está disponible! <a href="https://github.com/DataDog/datadog-agent/blob/master/docs/agent/upgrade.md">Pásate a la última versión</a> para acceder a las nuevas funciones.
</div>

Los archivos de logs contienen un montón de datos valiosos sobre la aplicación y la empresa.
Sin embargo, no suele aprovecharse este valor añadido porque estos archivos pasan desapercibidos.
El Datadog Agent puede ser muy útil para remediar esta situación, ya que parsea las métricas y eventos
de los logs para que los datos que contienen se puedan representar gráficamente en cualquier momento y en tiempo real.

## Cómo parsear las métricas

El Datadog Agent puede leer directamente las métricas de tus archivos de logs:

- a partir del formato de log canónico de Datadog, sin necesidad de programar nada más;
- a partir de cualquier otro formato de log, con una función personalizada de parseo de logs.

### Formato de log canónico de Datadog

Los logs de Datadog tienen el siguiente formato:

    metric unix_timestamp value [attribute1=v1 attributes2=v2 ...]

Por ejemplo, imaginemos que el contenido de `/var/log/web.log` es:

    me.web.requests 1320786966 157 metric_type=counter unit=request
    me.web.latency 1320786966 250 metric_type=gauge unit=ms

En este caso, lo único que necesitas para que Datadog lea las métricas es añadir esta línea al archivo de configuración de tu Agent (normalmente, se encuentra en `/etc/dd-agent/datadog.conf`):

    dogstreams: /var/log/web.log

También puedes definir varios archivos de logs del siguiente modo:

    dogstreams: /var/log/web.log, /var/log/db.log, /var/log/cache.log

### Cómo parsear formatos de log personalizados

Si quieres parsear un formato de log diferente (por ejemplo, para un proveedor o la versión legacy de un software), puedes utilizar una función personalizada de Python para extraer los campos adecuados del log; para ello, define el archivo de logs en el archivo de configuración de tu Agent con el siguiente formato:

    dogstreams: /var/log/web.log:parsers:parse_web

El fragmento `parsers:parse_web` indica que la función personalizada de Python se encuentra en un paquete llamado `parsers`, en la ruta `PYTHONPATH` del Agent, y que este paquete `parsers` tiene una función llamada `parse_web`. La ruta `PYTHONPATH` del Agent se establece en el script de inicio del Agent, `/etc/init.d/datadog-agent`, en la configuración del supervisor de la versión del Agent.

Si tu parseador **no** se encuentra en la ruta `PYTHONPATH` del Agent, puedes utilizar una sintaxis alternativa para configurar tu parseador de líneas:

    dogstreams: /path/to/log1:/path/to/my/parsers_module.py:custom_parser

En este formato, el Agent intenta importar una función llamada `custom_parser` desde `/path/to/my/parsers_module.py`.

Si el parseador de logs personalizado no funciona, lo primero que hay que comprobar son los logs del Collector del Agent:

* Si el Agent no puede importar tu función, busca `Could not load Dogstream line parser`.

* Si todo va bien, deberías ver esto:`dogstream: parsing {filename} with {function name} (requested {config option text})`.

<div class="alert alert-warning">
Para comprobar que los dogstreams funcionan, añade una línea, y no edites una ya existente, a cualquier archivo de log que hayas configurado para que el Agent vigile. El Agent solo <a href="/Glosario/#tail">sigue</a> el final de cada archivo de log, por lo que no se da cuenta de los cambios que haces en otras partes del archivo.
</div>

### Cómo redactar funciones de parseo

Las funciones de parseo personalizadas deben:

- incluir dos parámetros: un objeto que genere logs de Python (para depurar errores) y un parámetro de cadena de la línea actual que se va a parsear;
- devolver una tupla o lista de tuplas con el siguiente formato:

     `(metric (str), timestamp (unix timestamp), value (float), attributes (dict))`

    Esto se aplica siempre que los atributos deban contener, al menos, la clave metric_type, que indica si la métrica en cuestión es un contador o un gauge.

    Si la línea no coincide, devolverá el siguiente mensaje: `None`.

### Recopilación de métricas

Imagina que estás recopilando métricas de logs que no tienen un formato canónico, sino que están delimitados de forma inteligente por un carácter único de la siguiente manera:

```text
user.crashes|2016-05-28 20:24:43.463930|24|LotusNotes,Outlook,Explorer
```

Podrías configurar un parseador de logs como el siguiente para recopilar una métrica a partir de los datos registrados en tu cuenta de Datadog:

```python

import time
from datetime import datetime
...
def my_log_parser(logger, test):
    metric_name, date, metric_value, extras = line.split('|')
    # Convert the iso8601 date into a unix timestamp, assuming the timestamp
    # string is in the same timezone as the machine that's parsing it.
    date = datetime.strptime(date, "%Y-%m-%d %H:%M:%S.%f")
    tags = extras.split(',')
    date = time.mktime(date.timetuple())
    metric_attributes = {
        'tags': tags,
        'metric_type': 'gauge',
    }
    return (metric_name, date, metric_value, metric_attributes)
```

Luego, tendrías que configurar tu `datadog.conf` para incluir la opción del dogstream del siguiente modo:

```text
dogstreams: /path/to/mylogfile.log:/path/to/mylogparser.py:my_log_parser
# (N.B., Windows users should replace each "/" with the escaped "\\")
```

De acuerdo con este ejemplo, se recopilaría una métrica de tipo gauge denominada "user.crashes", cuyo valor sería 24 y que estaría etiquetada con las 3 aplicaciones que se mencionan al final.

Pero atención: el número de veces que se puede recopilar la misma métrica en un pase de logs determinado es limitado; de hecho, una vez superado el límite, el Agent anulará las métricas registradas y los envíos subsiguientes de dichas métricas, aunque tengan atributos diferentes (como pueden ser las etiquetas). Esta incidencia puede mitigarse en cierta medida si las métricas recopiladas de los logs presentan marcas de tiempo lo suficientemente diferentes entre sí. Sin embargo, en general, se recomienda que solo se envíe una métrica a los logs para que la recopilación se efectúe, aproximadamente, una vez cada 10 segundos. Dicha anulación no supone ningún problema en el caso de las métricas recopiladas con nombres diferentes.

## Cómo parsear eventos

El parseo de eventos se realiza a través de las mismas funciones de parseo personalizadas que se describen más arriba. La diferencia es que, si se devuelve un 
`dict` (o una `list` de `dict`) desde la función de parseo personalizada, Datadog lo tratará como un evento en lugar de una métrica.

Estos son los campos de eventos (la negrita implica que se trata de un campo obligatorio):

| Campo           | Tipo        | Valor                                                                                                                                                                                                                             |
|-----------------|-------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **msg_title**   | cadena      | Título del evento, se indexa en la búsqueda de texto completo.                                                                                                                                                                         |
| **timestamp**   | entero     | Marca de tiempo Unix Epoch. Si se omite, se establece por defecto en la hora a la que el Agent parseó el evento.                                                                                                                                        |
| **msg_text**    | cadena      | Cuerpo del evento. Se indexa en la búsqueda de texto completo.                                                                                                                                                                           |
| alert_type      | cadena enum | Indica la gravedad del evento, a saber: `error`, `warning`, `success` o `info`. Si se omite, se establece por defecto como `info`. Se puede buscar por `alert_type:value`.                                                                  |
| event_type      | cadena      | Describe qué tipo de evento es. Se utiliza como parte de la clave de agregación.                                                                                                                                                         |
| aggregation_key | cadena      | Describe a qué ha afectado este evento, si es que lo ha hecho. Se utiliza como parte de la clave de agregación.                                                                                                                                              |
| host            | cadena      | Nombre del host del que procede este evento. El evento se etiqueta automáticamente con cualquier etiqueta que le hayas dado a este host mediante la página de [etiquetado][1] o la [API de etiquetado][2]. El valor del host se utiliza como parte de la clave de agregación. |
| **priority**    | cadena      | Determina si el evento está visible u oculto por defecto en el flujo (stream). Debe ser `low` (baja) o `normal`.                                                                                                                      |

Los eventos que tengan la misma clave de agregación dentro de una franja de tiempo de 24 horas se agrupan en el flujo.
La clave de agregación es una combinación de los siguientes campos:

- event_type
- aggregation_key
- host

Para ver un ejemplo de un parseador de eventos, consulta el [parseador de eventos de compactación de Cassandra][3] que viene incluido con el Agent.

### Recopilación de eventos

Imagina que quieres recopilar eventos procedentes de logs en los que tienes suficiente control como para añadir todo tipo de información relevante, delimitada de forma inteligente por un carácter único, de la siguiente manera:

```text
2016-05-28 18:35:31.164705|Crash_Report|Windows95|A terrible crash happened!|A crash was reported on Joe M's computer|LotusNotes,Outlook,InternetExplorer
```

Podrías configurar un parseador de logs como el siguiente para crear un evento a partir de los datos registrados en tu [navegador de eventos][4] de Datadog:

```python

import time
from datetime import datetime
...
def my_log_parser(logger, line):

    # Split the line into fields
    date, report_type, system, title, message, extras = line.split('|')
    # Further split the extras into tags
    tags = extras.split(',')
    # Convert the iso8601 date into a unix timestamp, assuming the timestamp
    # string is in the same timezone as the machine that's parsing it.
    date = datetime.strptime(date, "%Y-%m-%d %H:%M:%S.%f")
    date = time.mktime(date.timetuple())
    logged_event = {
        'msg_title': title,
        'timestamp': date,
        'msg_text': message,
        'priority': 'normal',
        'event_type': report_type,
        'aggregation_key': system,
        'tags': tags,
        'alert_type': 'error'
    }
    return logged_event
```

Luego, tendrías que configurar tu `datadog.conf` para incluir la opción del dogstream del siguiente modo:

```text
dogstreams: /path/to/mylogfile.log:/path/to/mylogparser.py:my_log_parser
# (N.B., Windows users should replace each "/" with the escaped "\\")
```

Esta línea de log concreta, parseada con este parseador, crea el siguiente evento en Datadog:

{{< img src="agent/faq/log_event_in_dd.jpg" alt="Evento de logs en Datadog" style="width:70%;">}}

## Enviar parámetros adicionales a tu función de parseo personalizada

Una vez que hayas configurado tu parseador personalizado para enviar métricas o eventos a tu plataforma, deberías ver algo como esto en tu `datadog.conf`:

```text
dogstreams: /path/to/log1:/path/to/my/parsers_module.py:custom_parser
```

Además de una función con la siguiente definición en tu parsers_module.py:

```python
def custom_parser(logger, line)
```

Puedes modificar la paridad de tu función para que tome un parámetro adicional, tal y como se muestra en este [ejemplo del Agent][5].

Por tanto, si cambias tu archivo de configuración a:

```text
dogstreams: /path/to/log1:/path/to/my/parsers_module.py:custom_parser:customvar1:customvar2
```

Y defines tu función de parseo como:

```python
def custom_parser(logger, line, parser_state, *parser_args):
```

Tendrás un parámetro tupla en **parser_args** (como `<CUSTOM_VAR_1>` o `<CUSTOM_VAR_2>`) que estará listo para usarse en tu código con parser_args[0] y parser_args[1].

**Nota**: No es imprescindible usar el parámetro **parser_state**, pero tiene que estar en la firma de la función. Si solo tienes un parámetro, usa **parser_args[1]** para obtenerlo.

Por ejemplo, si tienes el mismo parseador que el que utilizamos en la documentación, pero no quieres extraer el nombre de la métrica del log, sino establecerlo mediante este parámetro:

En el archivo de configuración, deberías tener:

```text
dogstreams: /Users/Documents/Parser/test.log:/Users/Documents/Parser/myparser.py:parse_web:logmetric
```

## Solucionar problemas

Los errores ocurren, por lo que es importante poder acceder al rastreo de tus parseadores de logs. Sin embargo, solo podrás hacerlo si el Agent se ejecuta con los [logs del Agent][6] definidos en el nivel "DEBUG" (depuración). Este nivel se puede establecer en `datadog.conf` de la siguiente manera: quita la marca de comentario y edita esta [línea][7]; a continuación, [reinicia el Agent][8]. Tras establecerlo, podrás encontrar el rastreo de los errores de tu parseador de logs personalizado en el archivo `collector.log`, que generalmente incluirá la cadena checks.collector(datadog.py:278) | Error while parsing line. Consulta el [código del Agent][9], dado que es probable que el error aparezca allí.

**Nota**: Cada vez que realices un cambio en tu parseador de logs personalizado, [reinicia el Agent][8] para que se aplique ese cambio.

Si sospechas que se está produciendo algún error fuera del contexto de la función de tu parseador de logs personalizado, no dudes en [contactar con el equipo de asistencia][10]. Sin embargo, antes de nada, establece el nivel del log del Agent en "DEBUG", ejecuta el Agent durante unos minutos para asegurarte de que se están añadiendo nuevos logs a tus archivos y, luego, [ejecuta el comando flare][11] desde tu Agent. De este modo, el equipo de asistencia dispondrá de la información necesaria para solucionar el problema como es debido.

[1]: https://app.datadoghq.com/infrastructure#tags
[2]: /es/api/v1/tags/
[3]: https://github.com/DataDog/dd-agent/blob/master/dogstream/cassandra.py
[4]: /es/events/
[5]: https://github.com/DataDog/dd-agent/blob/5.13.x/checks/datadog.py#L210
[6]: /es/agent/configuration/agent-log-files/
[7]: https://github.com/DataDog/dd-agent/blob/5.7.x/datadog.conf.example#L211
[8]: /es/agent/configuration/agent-commands/
[9]: https://github.com/DataDog/dd-agent/blob/5.7.x/checks/datadog.py#L278
[10]: /es/help/
[11]: /es/agent/troubleshooting/send_a_flare/