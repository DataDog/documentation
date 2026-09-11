---
aliases:
- /es/logs/faq/why-do-my-logs-not-have-the-expected-timestamp
further_reading:
- link: /logs/log_configuration/processors
  tag: Documentación
  text: Aprende a procesar tus logs
- link: /logs/log_configuration/parsing
  tag: Documentación
  text: Obtén más información sobre el parseo
- link: /logs/faq/how-to-investigate-a-log-parsing-issue/
  tag: FAQ
  text: ¿Cómo investigar un problema de parseo de logs?
title: Los logs no muestran la marca temporal prevista
---

Por defecto, cuando la API de entrada de Datadog recibe logs, se genera una marca temporal y se añade como atributo de fecha. Sin embargo, esta marca temporal predeterminada no siempre refleja la marca real que podría estar contenida en el propio log. En esta guía, aprenderás cómo anular la marca temporal predeterminada por la marca temporal real.

{{< img src="logs/guide/log_timestamp_1.png" alt="Panel del log que muestra la marca temporal del log, distinta de la marca temporal en el mensaje" style="width:70%;">}}

## Marca temporal indicada

La marca temporal del log se encuentra en la parte superior del panel del log. Las marcas temporales se almacenan en UTC y se muestran en la zona horaria local del usuario. En la captura de pantalla anterior, el perfil local está configurado en `UTC+1`, por lo que la hora a la que se recibió el log es `11:06:16.807 UTC`.

Es posible que la marca temporal no muestre el valor esperado porque la zona horaria está mal configurada. Para comprobar si este es el caso, ve a [Preferences][1] (Preferencias) y mira en la sección **Time zone** (Zona horaria).

Si la zona horaria es correcta, extrae la marca temporal del mensaje para anular la que se muestra en el log.

## Logs sin procesar

Si tus logs sin procesar no muestran la marca temporal correcta en Datadog, [extrae](#extract-the-timestamp-value-with-a-parser) la marca temporal correcta de los logs sin procesar y [reasígnala](#define-a-log-date-remapper).

#### Extraer el valor de la marca temporal con un analizador

1. Ve a [Pipelines de logs][2] y haz clic en el pipeline que procesa los logs.
2. Haz clic en **Add Processor** (Agregar procesador).
3. Selecciona el tipo de procesador **Grok Parser** (Analizador Grok).
4. Utiliza [date() matcher][3] para extraer la fecha y pasarla a un atributo de fecha personalizado. Consulta el siguiente ejemplo, así como [ejemplos de parseo de fechas][4], para obtener más detalles.

En un ejemplo de log como este:

```
2017-12-13 11:01:03 EST | INFO | (tagger.go:80 in Init) | starting the tagging system
```

Añade una regla de parseo como:

```
MyParsingRule %{date("yyyy-MM-dd HH:mm:ss z"):date} \| %{word:severity} \| \(%{notSpace:logger.name}:%{integer:logger.line}[^)]*\) \|.*
``` 

El resultado de la extracción de `MyParsingRule`:

```
{
  "date": 1513180863000,
  "logger": {
    "line": 80,
    "name": "tagger.go"
  },
  "severity": "INFO"
}
```

El atributo `date` almacena el valor `mytimestamp`.

#### Definir un reasignador de fecha de log

Añade un [Reasignador de fecha de log][5] para asegurarte de que el valor del atributo `date` anula la marca temporal actual del log.

1. Ve a [Pipelines de logs][2] y haz clic en el pipeline que procesa los logs.
2. Haz clic en **Add Processor** (Agregar procesador).
3. Selecciona **Date remapper** (Reasignador de fecha) como el tipo de procesador.
4. Introduce un nombre para el procesador.
5. Agrega **date** (fecha) a la sección Set date attribute(s) (Establecer atributos de fecha).
6. Haz clic en **Create** (Crear).

El siguiente log generado en `06:01:03 EST`, que corresponde a `11:01:03 UTC`, se visualiza correctamente como 12:01:03 (la zona horaria mostrada es UTC+1 en este caso).

{{< img src="logs/guide/log_timestamp_5.png" alt="Panel de log que muestra la marca temporal correcta" style="width:70%;" >}}

**Nota**: Cualquier modificación en un pipeline solo afecta a los nuevos logs, ya que todo el procesamiento se realiza en la ingesta.

## Logs de JSON

Los logs de JSON se analizan automáticamente en Datadog. Dado que el atributo `status` del log es un [atributo reservado][4], pasa por operaciones de preprocesamiento para los logs de JSON.

En el ejemplo siguiente, la marca temporal real del log es el valor del atributo `mytimestamp` y no la marca temporal del log `Dec 13, 2017 at 14:16:45.158`.

{{< img src="logs/guide/log_timestamp_6.png" alt="Panel del log que muestra la marca temporal del log que es distinta del valor del atributo mytimestamp en el mensaje" style="width:50%;">}}

### Formatos de fecha admitidos

Para asegurarte de que el valor del atributo `mytimestamp` anula la marca temporal actual del log que se está mostrando, debes añadirlo como atributo de fecha.

1. Ve a tu [Pipeline de logs][2]. 
2. Sitúate sobre Preprocessing for JSON Logs (Preprocesamiento para logs de JSON) y haz clic en el icono del lápiz.
3. Añade `mytimestamp` a la lista de atributos de fecha. El reasignador de fechas busca cada uno de los atributos reservados en el orden en que aparecen en la lista. Para asegurarte de que la fecha procede del atributo `mytimestamp`, colócalo en primer lugar en la lista.
4. Haz clic en **Save** (Guardar).

Hay formatos de fecha específicos que deben seguirse para que la reasignación funcione. Los formatos de fecha reconocidos son: [ISO8601][7], [UNIX (el formato EPOCH de milisegundos)][8] y [RFC3164][9].

Si utilizas un formato de fecha diferente, consulta [Formato de fecha personalizado](#custom-date-format).

**Nota**: Cualquier modificación en el pipeline solo afecta a los nuevos logs, ya que todo el procesamiento se realiza en la ingesta.

### Formato de fecha personalizado

Si el formato de fecha no es admitido por defecto por el reasignador, puedes analizar la fecha utilizando un [Analizador Grok][5] y luego convertirla a un formato compatible.

1. Ve al [Pipeline][2] que está procesando los logs. Si todavía no tienes un pipeline configurado para esos logs, crea un nuevo pipeline para ello.
2. Haz clic en **Add Processor** (Agregar procesador).
3. Selecciona el tipo de procesador **Grok Parser** (Analizador Grok).
4. Define la regla de parseo en función de tu formato de fecha. Consulta estos [ejemplos de parseo de fechas][4] para más detalles.
5. En la sección Advanced Settings (Configuración avanzada), añade `mytimestamp` a la sección `Extract from` para que este analizador se aplique únicamente al atributo personalizado `mytimestamp`.
6. Haz clic en **Create** (Crear).
7. Añade un [Reasignador de fecha de log][5] para asignar la marca temporal correcta a los nuevos logs.

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/preferences
[2]: https://app.datadoghq.com/logs/pipelines/
[3]: /es/logs/log_configuration/parsing
[4]: /es/logs/log_configuration/parsing/#parsing-dates
[5]: /es/logs/log_configuration/processors/?tabs=ui#log-date-remapper
[6]: /es/logs/log_configuration/pipelines/?tab=date#preprocessing
[7]: https://www.iso.org/iso-8601-date-and-time-format.html
[8]: https://en.wikipedia.org/wiki/Unix_time
[9]: https://www.ietf.org/rfc/rfc3164.txt