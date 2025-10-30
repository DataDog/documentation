---
aliases:
- /es/agent/faq/dogstream
private: true
title: Dogstream
---

<div class="alert alert-warning">
Se trata de una función obsoleta del Agent 5. Se interrumpen las nuevas versiones de funciones.
<br>
</div>

Los archivos de logs contienen toneladas de valiosos datos  de aplicaciones y de negocios.
Lamentablemente, a menudo este valor nunca se aprovecha porque los archivos de logs se ignoran.
El Datadog Agent puede ayudar a remediarlo mediante el análisis de métricas y eventos desde
logs, de modo que los datos que contienen puedan representarse gráficamente en tiempo real, todo el tiempo.

## Análisis de métricas

El Datadog Agent puede leer métricas directamente desde tus archivos de logs:

- desde el formato canónico de log de Datadog, sin necesidad de programación adicional
- desde cualquier otro formato de log con una función personalizada de análisis de logs 

### Formato de log canónico de Datadog 

Los logs de Datadog tienen el siguiente formato:

    metric unix_timestamp value [attribute1=v1 attributes2=v2 ...]

Por ejemplo, imaginando que el contenido de `/var/log/web.log` es:

    me.web.requests 1320786966 157 metric_type=counter unit=request
    me.web.latency 1320786966 250 metric_type=gauge unit=ms

Entonces, todo lo que se necesita para que Datadog lea métricas es añadir esta línea a tu archivo de configuración del Agent (normalmente en `/etc/dd-agent/datadog.conf`):

    dogstreams: /var/log/web.log

También puedes especificar varios archivos de logs de esta forma:

    dogstreams: /var/log/web.log, /var/log/db.log, /var/log/cache.log

### Análisis de formatos de logs personalizados 

Si deseas analizar un formato de log diferente, por ejemplo, para un software proveedor o legacy, puedes utilizar una función personalizada de Python para extraer los campos adecuados del archivo de log especificando tu archivo de log en tu archivo de configuración del Agent con el siguiente formato:

    dogstreams: /var/log/web.log:parsers:parse_web

La parte `parsers:parse_web` indica que la función personalizada de Python está en un paquete llamado `parsers` en `PYTHONPATH` del Agent y el paquete de `parsers` tiene una función llamada `parse_web`. `PYTHONPATH` del Agent se configura en el script de inicio del Agent, `/etc/init.d/datadog-agent`, en la configuración de supervisor de la versión del Agent.

Si tu analizador **no** está en `PYTHONPATH` del Agent, puedes utilizar una sintaxis alternativa para configurar tu analizador de líneas:

    dogstreams: /path/to/log1:/path/to/my/parsers_module.py:custom_parser

En este formato, el Agent intenta importar una función llamada `custom_parser` desde `/path/to/my/parsers_module.py`.

Si tu analizador personalizado de logs no funciona, el primer check que debes hacer son los logs del recopilador del Agent:

* Si el Agent no puede importar tu función, busca `Could not load Dogstream line parser`.

* Si todo va bien deberías ver `dogstream: parsing {filename} with {function name} (requested {config option text})`.

<div class="alert alert-danger">
Para comprobar que los dogstreams funcionan, añade una línea (no edites una existente) a cualquier archivo de log que hayas configurado para ser monitorizado por el Agent. El Agent solo <a href="/glossary/#tail">sigue</a> el final de cada archivo de log, por lo que no detecta los cambios que haces en otras partes del archivo.
</div>

### Funciones de análisis de escritura

Las funciones de análisis personalizadas deben:

- tomar dos parámetros: un objeto registrador Python (para depuración) y un parámetro de cadena de la línea actual que se debe analizar.
- devolver una tupla o lista de tuplas de la forma:

     `(metric (str), timestamp (unix timestamp), value (float), attributes (dict))`

  Donde los atributos deben contener al menos la clave metric_type, que especifica si la métrica dada es un contador o un gauge.

  Si la línea no coincide, en su lugar, devuelve `None`.

### Recopilación de métricas

Imagina que estás recopilando métricas de logs que no tienen un formato canónico, pero que están delimitados de forma inteligente por un carácter único, registrado como el siguiente:

```text
user.crashes|2016-05-28 20:24:43.463930|24|LotusNotes,Outlook,Explorer
```

Podrías configurar un analizador de logs como el siguiente para recopilar un métrica de estos datos registrados en tu cuenta Datadog:

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

Y luego, configurarías tu `datadog.conf` para incluir la opción dogstream de la siguiente manera:

```text
dogstreams: /path/to/mylogfile.log:/path/to/mylogparser.py:my_log_parser
# (N.B., Windows users should replace each "/" with the escaped "\\")
```

Este ejemplo recopilaría una métrica de tipo gauge llamada "user.crashes" con un valor de 24 y etiquetada con las 3 aplicaciones nombradas al final.

Una advertencia: hay un límite en el número de veces que se puede recopilar la misma métrica en el mismo paso de log; de hecho, el Agent empieza a sobrescribir las métricas registradas con los envíos posteriores de la misma métrica, incluso si tienen atributos diferentes (como etiquetas (tags)). Esto se puede mitigar en cierta medida si las métricas recopiladas de logs tienen marcas de tiempo suficientemente diferentes, pero generalmente se recomienda solo enviar una métrica a los logs para su recopilación una vez cada 10 segundos aproximadamente. Esta sobreescritura no es un problema para métricas recopiladas con nombres diferentes.

## Análisis de eventos

El análisis de eventos se realiza a través de las mismas funciones de análisis personalizado descritas anteriormente, excepto que si devuelves un
`dict` (o un `list` de `dict`) desde tu función de análisis personalizado, Datadog la trata como un evento en lugar de una métrica.

Estos son los campos de eventos (la negrita significa que el campo es obligatorio):

| Campo           | Tipo        | Valor                                                                                                                                                                                                                             |
|-----------------|-------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **msg_title**   | cadena      | Título del evento, se indexa en la búsqueda de texto completo.                                                                                                                                                                         |
| **timestamp**   | entero     | Marca de tiempo Unix. Si se omite, el valor predeterminado es la hora a la que el Agent analizó evento.                                                                                                                                        |
| **msg_text**    | cadena      | Cuerpo del evento, se indexan mediante la búsqueda por el texto completo.                                                                                                                                                                           |
| alert_type      | cadena enum | Indica la gravedad de la evento. Debe ser una de las siguientes: `error`, `warning`, `success` o `info`. Si se omite, el valor predeterminado es `info`. Se puede buscar por `alert_type:value`                                                                  |
| event_type      | cadena      | Describe qué tipo de evento es. Se utiliza como parte de la clave de agregación                                                                                                                                                         |
| aggregation_key | cadena      | Describe a qué afecta este evento, si es que afecta a algo. Se utiliza como parte de la clave de agregación                                                                                                                                              |
| host            | cadena      | Nombre del host del que procede este evento. El evento se etiqueta automáticamente con cualquier etiqueta (tag) que le hayas dado a este host usando la página [etiquetado][1] o la [api de etiquetado][2]. El valor del host se utiliza como parte de la clave de agregación. |
| **priority**    | cadena      | Determina si el evento está a la vista u oculto de modo predeterminado en el flujo (stream). Debe ser uno de `low` o `normal`                                                                                                                      |

Los eventos que tengan la misma clave de agregación dentro de una franja de tiempo de 24 horas se agrupan en el flujo.
La clave de agregación es una combinación de los siguientes campos:

- event_type
- aggregation_key
- host

Para ver un ejemplo de un analizador de eventos, consulta el [analizador de eventos de compactación de Cassandra][3] que se incluye con el Agent.

### Recopilación de eventos

Imagina que deseas recopilar eventos de registro donde tienes suficiente control para añadir todo tipo de información relevante, delimitada de forma inteligente por un carácter único, registrada como el siguiente:

```text
2016-05-28 18:35:31.164705|Crash_Report|Windows95|A terrible crash happened!|A crash was reported on Joe M's computer|LotusNotes,Outlook,InternetExplorer
```

Podrías configurar un analizador de logs como el siguiente para crear un evento a partir de estos datos registrados en tu [explorador de eventos][4] de Datadog:

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

Y luego configurarías tu `datadog.conf` para incluir la opción Dogstream de la siguiente manera:

```text
dogstreams: /path/to/mylogfile.log:/path/to/mylogparser.py:my_log_parser
# (N.B., Windows users should replace each "/" with the escaped "\\")
```

Esta línea de log específica analizada con este analizador creó el siguiente evento en Datadog:

{{< img src="Agent/FAQ/log_event_in_dd.jpg" alt="Evento de log en Datadog" style="width:70%;">}}

## Enviar parámetros adicionales a tu función de parseo personalizada

Una vez que hayas configurado tu analizador personalizado para enviar métricas o eventos a tu plataforma, deberías tener algo como esto en tu `datadog.conf`:

```text
dogstreams: /path/to/log1:/path/to/my/parsers_module.py:custom_parser
```

Y en tu parsers_module.py una función definida como:

```python
def custom_parser(logger, line)
```

Puedes cambiar la paridad de tu función para tomar un parámetro adicional como se muestra en este [ejemplo del Agent][5].

Así que si cambias tu archivo configuración a:

```text
dogstreams: /path/to/log1:/path/to/my/parsers_module.py:custom_parser:customvar1:customvar2
```

Y tu función de análisis como:

```python
def custom_parser(logger, line, parser_state, *parser_args):
```

Tienes un parámetro de tupla en **parser_args** como (`<CUSTOM_VAR_1>`, `<CUSTOM_VAR_2>`) que está listo para usar en tu código utilizando parser_args[0] y parser_args[1].

**Nota**: El parámetro **parser_state** no se debe utilizar, pero tiene que estar en la firma de la función. Y si solo tienes un parámetro, tienes que usar **parser_args[1]** para obtenerlo.

Como ejemplo, si tienes el mismo analizador que en la documentación, pero esta vez no deseas extraer el nombre de la métrica del log, sino configurarlo gracias a este parámetro:

En el archivo de configuración tendrías:

```text
dogstreams: /Users/Documents/Parser/test.log:/Users/Documents/Parser/myparser.py:parse_web:logmetric
```

## Solucionar problemas

Los errores ocurren, por lo que es importante poder ver el rastreo de tus analizadores de logs. Puedes hacer esto si estás ejecutando el Agent con sus [logs del Agent][6] en el nivel "DEBUG". El nivel de log del Agent se puede configurar en el `datadog.conf` quitando los comentarios y editando esta [línea][7] y luego [reiniciando el Agent][8]. Una vez que esté configurado correctamente, el rastreo resultante de errores en tu analizador de logs personalizado se puede encontrar en el archivo `collector.log` y, por lo general incluye la cadena checks.collector(datadog.py:278) | Error mientras analiza la línea en ellos (consulta el [código del Agent][9] donde es probable que se lance el error).

**Nota**: Cada vez que realices un cambio en tu parseador de logs personalizado, [reinicia el Agent][8] para que se aplique ese cambio.

Si sospechas que se está produciendo algún error más allá del ámbito de tu función de analizador de logs personalizado, no dudes en [ponerte en contacto con soporte técnico][10], pero primero configura el nivel de log del Agent en "DEBUG", ejecuta el Agent durante unos minutos mientras te aseguras de que se estén añadiendo nuevos logs a tus archivos y luego [ejecuta el comando flare][11] desde tu Agent. Esto proporciona al equipo de soporte la información necesaria para solucionar el problema de forma eficaz.

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