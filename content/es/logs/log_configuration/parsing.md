---
aliases:
- /es/logs/parsing/
- /es/logs/processing/parsing
description: Analizar tus logs con el procesador grok
further_reading:
- link: /logs/log_configuration/processors
  tag: Documentación
  text: Aprender a procesar tus logs
- link: /logs/faq/how-to-investigate-a-log-parsing-issue/
  tag: FAQ
  text: ¿Cómo investigar un problema de análisis de logs?
- link: /logs/guide/log-parsing-best-practice/
  tag: FAQ
  text: Análisis de logs - Prácticas recomendadas
- link: /logs/logging_without_limits/
  tag: Documentación
  text: Controlar el volumen de logs indexados por Datadog
title: Análisis
---

## Información general

Datadog analiza automáticamente logs con formato JSON. Para otros formatos, Datadog te permite enriquecer tus logs con la ayuda del analizador grok.
La sintaxis grok proporciona una forma más sencilla de analizar logs que las expresiones regulares puras. El analizador grok permite extraer atributos de mensajes de texto semiestructurados.

Grok viene con patrones reutilizables para analizar números enteros, direcciones IP, nombres de host, etc. Estos valores deben enviarse al analizador grok como cadenas.

Puedes escribir reglas de análisis con la sintaxis `%{MATCHER:EXTRACT:FILTER}`:

* **Matcher** (Emparejador): una regla (posiblemente una referencia a otra regla de token) que describe qué esperar (número, palabra, no espacio, etc.).

* **Extract** (Fragmento) (opcional): un identificador que representa el destino del fragmento de texto que coincide con el *Matcher* (Emparejador).

* **Filter** (Filtro) (opcional): un postprocesador de la coincidencia para transformarla.

Ejemplo de un log clásico no estructurado:

```text
john connected on 11/08/2017
```

Con la siguiente regla de análisis:

```text
MyParsingRule %{word:user} connected on %{date("MM/dd/yyyy"):date}
```

Después de procesar, se genera el siguiente log estructurado:

{{< img src="logs/processing/processors/_parser.png" alt="Ejemplo de análisis 1" style="width:80%;">}}

**Nota**:

* Si tienes varias reglas de análisis en un único analizador grok:
  * Sólo una puede coincidir con cualquier log. La primera que coincida, de arriba abajo, es la que ejecuta el análisis.
  * Cada regla puede hacer referencia a reglas de análisis definidas por encima de ella en la lista.
* Debes tener nombres de regla únicos dentro del mismo analizador grok.
* El nombre de la regla sólo debe contener: caracteres alfanuméricos, `_` y `.`. Debe comenzar con un carácter alfanumérico.
* Las propiedades con valores nulos o vacíos no se muestran.
* El emparejador de regex aplica un `^` implícito, para hacer coincidir el inicio de una cadena, y un `$`, para hacer coincidir el final de la cadena.
* Algunos logs pueden generar grandes espacios en blanco. Utiliza `\n` y `\s+` para tener en cuenta las nuevas líneas y los espacios en blanco.

### Emparejador y filtro

En esta lista encontrarás todos los emparejadores y filtros implementados de forma nativa por Datadog:

{{< tabs >}}
{{% tab "Matchers" (Emparejadores) %}}

`date("pattern"[, "timezoneId"[, "localeId"]])` 
: Empareja una fecha con el patrón especificado y la analiza para producir una marca de tiempo Unix. [Consulta los ejemplos del emparejador de fechas](#parsing-dates).

`regex("pattern")`
: Empareja un regex. [Verifica los ejemplos del emparejador de regex](#regex).

`notSpace`
: Empareja cualquier cadena hasta el siguiente espacio.

`boolean("truePattern", "falsePattern")`
: Empareja un booleano y lo analiza, definiendo de manera opcional los patrones true (verdaderos) y false (falsos) (por defecto `true` y `false`, ignorando mayúsculas y minúsculas).

`numberStr`
: Empareja un número decimal de coma flotante y lo analiza como una cadena.

`number`
: Empareja un número decimal de coma flotante y lo analiza como un número de doble precisión.

`numberExtStr`
: Empareja un número de coma flotante (con soporte de notación científica) y lo analiza como una cadena.

`numberExt`
: Empareja un número de coma flotante (con soporte de notación científica) y lo analiza como un número de doble precisión.

`integerStr`
: Empareja un número entero y lo analiza como una cadena.

`integer`
: Empareja un número entero y lo analiza como un número entero.

`integerExtStr`
: Empareja un número entero (con soporte de notación científica) y lo analiza como una cadena.

`integerExt`
: Empareja un número entero (con soporte de notación científica) y lo analiza como un número entero.

`word`
: Empareja una palabra que comienza con un límite de palabra; es decir, contiene caracteres a-z, A-Z, 0-9, incluido el carácter `_` (guión bajo), y termina con un límite de palabra. Equivale a `\b\w+\b` en regex.

`doubleQuotedString`
: Empareja una cadena entre comillas dobles.

`singleQuotedString`
: Empareja una cadena entre comillas simples.

`quotedString`
: Empareja una cadena entre comillas dobles o simples.

`uuid`
: Empareja un UUID.

`mac`
: Empareja una dirección MAC.

`ipv4`
: Empareja un IPV4.

`ipv6`
: Empareja un IPV6.

`ip`
: Empareja un IP (v4 o v6).

`hostname`
: Empareja un nombre de host.

`ipOrHost`
: Empareja un nombre de host o IP.

`port`
: Empareja un número de puerto.

`data`
: Empareja cualquier cadena, incluidos espacios y líneas nuevas. Equivale a `.*` en regex. Utilízalo cuando ninguno de los patrones anteriores sea apropiado.

{{% /tab %}}
{{% tab "Filters" (Filtros) %}}

`number`
: Analiza una coincidencia como un número de doble precisión.

`integer`
: Analiza una coincidencia como un número entero.

`boolean`
: Analiza cadenas 'true' (verdadero) y 'false' (falso) como booleanos, ignorando mayúsculas y minúsculas.

`nullIf("value")`
: Devuelve un valor nulo, si la coincidencia es igual al valor proporcionado.

`json`
: Analiza un JSON con el formato adecuado.

`rubyhash`
: Analiza un hash de Ruby con el formato adecuado, como por ejemplo `{name => "John", "job" => {"company" => "Big Company", "title" => "CTO"}}`

`useragent([decodeuricomponent:true/false])`
: Analiza un agente de usuario y devuelve un objeto JSON que contiene el dispositivo, el sistema operativo y el navegador representado por el Agent. [Verifica el procesador de Agents de usuario][1].

`querystring`
: Extrae todos los pares clave-valor de una cadena de consulta de URL coincidente (por ejemplo, `?productId=superproduct&promotionCode=superpromo`).

`decodeuricomponent`
: Descodifica los componentes de URI. Por ejemplo, transforma `%2Fservice%2Ftest` en `/service/test`.

`lowercase`
: Devuelve la cadena en minúsculas.

`uppercase`
: Devuelve la cadena en mayúsculas.

`keyvalue([separatorStr[, characterAllowList[, quotingStr[, delimiter]]]])`
: Extrae el patrón de clave-valor y devuelve un objeto JSON. Consulta los [ejemplos de filtros de clave-valor](#key-value-or-logfmt).

`xml`
: Analiza un XML con formato adecuado. Consulta los [ejemplos de filtros de XML](#parsing-xml).

`csv(headers[, separator[, quotingcharacter]])`
: Analiza líneas CSV o TSV con formato adecuado. Consulta los [ejemplos de filtros de CSV](#parsing-csv).

`scale(factor)`
: Multiplica el valor numérico esperado por el factor proporcionado.

`array([[openCloseStr, ] separator][, subRuleOrFilter)`
: Analiza una secuencia de cadena de tokens y la devuelve como una matriz. Consulta el ejemplo de [lista a matriz](#list-to-array).

`url`
: Analiza una URL y devuelve todos los miembros tokenizados (dominio, parámetros de consulta, puerto, etc.) en un objeto JSON. [Obtener más información sobre cómo analizar las URL][2].

[1]: /es/logs/log_configuration/processors/#user-agent-parser
[2]: /es/logs/log_configuration/processors/#url-parser
{{% /tab %}}
{{< /tabs >}}

## Configuración avanzada

En la parte inferior de los cuadros de tu procesador grok se encuentra la sección **Advanced Settings** (Configuración avanzada):

{{< img src="logs/processing/parsing/advanced_settings.png" alt="Configuración avanzada style="width:80%;">}}

### Análisis de un atributo con texto específico

Utiliza el campo **Extract from** (Extraer de) para aplicar tu procesador grok en un atributo con texto determinado, en lugar del atributo `message` predeterminado.

Por ejemplo, considera un log que contiene un atributo `command.line` que debe analizarse como un valor clave. Podrías analizar este log de la siguiente manera:

{{< img src="logs/processing/parsing/parsing_attribute.png" alt="Análisis de una línea de comando" style="width:80%;">}}

### Uso de las reglas de ayuda para factorizar varias reglas de análisis

Utiliza el campo **Helper Rules** (Reglas de ayuda) para definir tokens para tus reglas de análisis. Las reglas de ayuda te permiten factorizar patrones grok en las reglas de análisis. Esto es útil cuando tienes varias reglas en el mismo analizador grok que utilizan los mismos tokens.

Ejemplo de un log clásico no estructurado:

```text
john id:12345 connected on 11/08/2017 on server XYZ in production
```

Utiliza la siguiente regla de análisis:

```text
MyParsingRule %{user} %{connection} %{server}
```

Con las siguientes reglas de ayuda:

```text
user %{word:user.name} id:%{integer:user.id}
connection connected on %{date("MM/dd/yyyy"):connect_date}
server on server %{notSpace:server.name} in %{notSpace:server.env}
```

{{< img src="logs/processing/parsing/helper_rules.png" alt="Reglas de ayuda" style="width:80%;">}}

## Ejemplos

Algunos ejemplos que demuestran cómo utilizar los analizadores:

* [Clave-valor o logfmt](#key-value-or-logfmt)
* [Análisis de fechas](#parsing-dates)
* [Alternancia de patrones](#alternating-pattern)
* [Atributo opcional](#optional-attribute)
* [JSON anidado](#nested-json)
* [Regex](#regex)
* [Lista a matrices](#list-to-array)
* [Formato glog](#glog-format)
* [XML](#parsing-xml)
* [CSV](#parsing-csv)

### Valor clave o logfmt

Este es el filtro principal de clave-valor: `keyvalue([separatorStr[, characterAllowList[, quotingStr[, delimiter]]]])`, donde:

* `separatorStr`: define el separador entre la clave y los valores. Por defecto es `=`.
* `characterAllowList`: define caracteres de valor de no escape, además de los caracteres `\\w.\\-_@` predeterminados. Sólo se utiliza para valores que no están entre comillas (por ejemplo, `key=@valueStr`).
* `quotingStr`: define las comillas y sustituye la detección de comillas predeterminada: `<>`, `""`, `''`.
* `delimiter`: define el separador entre los distintos pares clave-valor (por ejemplo, `|` es el delimitador en `key1=value1|key2=value2`). Por defecto es ` ` (normal space), `,` and `.

Utiliza filtros como **keyvalue** a fin de asignar con mayor facilidad cadenas a atributos para formatos keyvalue o logfmt:

**Log:**

```text
user=john connect_date=11/08/2017 id=123 action=click
```

**Regla:**

```text
rule %{data::keyvalue}
```

{{< img src="logs/processing/parsing/parsing_example_2.png" alt="Ejemplo de análisis 2" style="width:80%;">}}

No es necesario que especifiques el nombre de tus parámetros, ya que están incluidos en el log.
Si añades un atributo **extract** `my_attribute` en tu patrón de reglas, verás lo siguiente:

{{< img src="logs/processing/parsing/parsing_example_2_bis.png" alt="Ejemplo de análisis 2 bis" style="width:80%;">}}

Si `=` no es el separador predeterminado entre la clave y los valores, añade un parámetro a la regla de análisis con un separador.

**Log:**

```text
user: john connect_date: 11/08/2017 id: 123 action: click
```

**Regla:**

```text
rule %{data::keyvalue(": ")}
```

{{< img src="logs/processing/parsing/key_value_parser.png" alt="Analizador de clave-valor" style="width:80%;" >}}

Si los logs contienen caracteres especiales en un valor de atributo, como por ejemplo `/` en una URL, añádelo a la lista de permisos en la regla de análisis:

**Log:**

```text
url=https://app.datadoghq.com/event/stream user=john
```

**Regla:**

```text
rule %{data::keyvalue("=","/:")}
```

{{< img src="logs/processing/parsing/key_value_allowlist.png" alt="Lista de permisos de clave-valor" style="width:80%;" >}}

Otros ejemplos:

| **Cadena sin formato**               | **Regla de análisis**                                      | **Resultado**                            |
|:-----------------------------|:------------------------------------------------------|:--------------------------------------|
| key=valueStr                 | `%{data::keyvalue}`                                   | {"key": "valueStr"}                   |
| key=\<valueStr>              | `%{data::keyvalue}`                                   | {"key": "valueStr"}                   |
| "key"="valueStr"             | `%{data::keyvalue}`                                   | {"key": "valueStr"}                   |
| key:valueStr                 | `%{data::keyvalue(":")}`                              | {"key": "valueStr"}                   |
| key:"/valueStr"              | `%{data::keyvalue(":", "/")}`                         | {"key": "/valueStr"}                  |
| /key:/valueStr               | `%{data::keyvalue(":", "/")}`                         | {"/key": "/valueStr"}                 |
| key:={valueStr}              | `%{data::keyvalue(":=", "", "{}")}`                   | {"key": "valueStr"}                   |
| key1=value1\|key2=value2     | <code>%{data::keyvalue(&quot;=&quot;, &quot;&quot;, &quot;&quot;, &quot;&#124;&quot;)}</code> | {"key1": "value1", "key2": "value2"}  |
| key1="value1"\|key2="value2" | <code>%{data::keyvalue(&quot;=&quot;, &quot;&quot;, &quot;&quot;, &quot;&#124;&quot;)}</code> | {"key1": "value1", "key2": "value2"}  |

**Ejemplo de varias cadenas de comillas**: cuando se definen varias cadenas de comillas, el comportamiento predeterminado se sustituye por un carácter de comillas definido.
La clave-valor siempre coincide con las entradas sin caracteres de comillas, independientemente de lo que se especifique en `quotingStr`. Cuando se utilizan caracteres de comillas, se ignora `characterAllowList`, ya que se extrae todo lo que se encuentra entre los caracteres de comillas.

**Log:**

  ```text
  key1:=valueStr key2:=</valueStr2> key3:="valueStr3"
  ```

**Regla:**

  ```text
  rule %{data::keyvalue(":=","","<>")}
  ```

**Resultado:**

  ```json
  {"key1": "valueStr", "key2": "/valueStr2"}
  ```

**Nota**:

* Los valores vacíos (`key=`) o los valores `null` (`key=null`) no se muestran en el JSON de salida.
* Si defines un filtro *keyvalue* en un objeto `data` y este filtro no coincide, se devuelve un JSON `{}` vacío (por ejemplo, entrada: `key:=valueStr`, regla de análisis: `rule_test %{data::keyvalue("=")}`, salida: `{}`).
* Definir `""` como `quotingStr` conserva la configuración predeterminada para las comillas.

### Análisis de fechas

El emparejador de fechas transforma tu marca de tiempo en el formato EPOCH (unidad de medida en **milisegundos**).

| **Cadena sin formato**                       | **Regla de análisis**                                          | **Resultado**              |
|:-------------------------------------|:----------------------------------------------------------|:------------------------|
| 14:20:15                             | `%{date("HH:mm:ss"):date}`                                | {"date": 51615000}      |
| 02:20:15 PM                          | `%{date("hh:mm:ss a"):date}`                              | {"date": 51615000}      |
| 10/11/2014                           | `%{date("dd/MM/yyyy"):date}`                              | {"date": 1412978400000} |
| Jueves 16 de junio de 2016 08:29:03             | `%{date("EEE MMM dd HH:mm:ss yyyy"):date}`                | {"date": 1466065743000} |
| Martes 16 de noviembre de 2016 08:29:03              | `%{date("EEE MMM d HH:mm:ss yyyy"):date}`                 | {"date": 1466065743000} |
| 6/Mar/2013:01:36:30 +0900           | `%{date("dd/MMM/yyyy:HH:mm:ss Z"):date}`                  | {"date": 1362501390000} |
| 29-11-2016T16:21:36.431+0000         | `%{date("yyyy-MM-dd'T'HH:mm:ss.SSSZ"):date}`              | {"date": 1480436496431} |
| 29-11-2016T16:21:36.431+00:00        | `%{date("yyyy-MM-dd'T'HH:mm:ss.SSSZZ"):date}`             | {"date": 1480436496431} |
| 06/Feb/2009:12:14:14.655             | `%{date("dd/MMM/yyyy:HH:mm:ss.SSS"):date}`                | {"date": 1233922454655} |
| 31-08-2007 19:22:22.427 ADT          | `%{date("yyyy-MM-dd HH:mm:ss.SSS z"):date}`               | {"date": 1188598942427} |
| Jueves 16 de junio 08:29:03 2016<sup>1</sup> | `%{date("EEE MMM dd HH:mm:ss yyyy","Europe/Paris"):date}` | {"date": 1466058543000} |
| Jueves 16 de junio 08:29:03 2016<sup>1</sup> | `%{date("EEE MMM dd HH:mm:ss yyyy","UTC+5"):date}`        | {"date": 1466047743000} |
| Jueves 16 de junio 08:29:03 2016<sup>1</sup> | `%{date("EEE MMM dd HH:mm:ss yyyy","+3"):date}`           | {"date": 1466054943000} |

<sup>1</sup> Utiliza el parámetro `timezone` si realizas tus propias localizaciones y tus marcas de tiempo no están en UTC.
Los formatos compatibles para las zonas horarias son:

* `GMT`, `UTC`, `UT` o `Z`
* `+h`, `+hh`, `+hh:mm`, `-hh:mm`, `+hhmm`, `-hhmm`, `+hh:mm:ss`, `-hh:mm:ss`, `+hhmmss` or `-hhmmss`. El rango máximo admitido es de +18:00 a -18:00.
* Zonas horarias que comienzan por `UTC+`, `UTC-`, `GMT+`, `GMT-`, `UT+` o `UT-`. El rango máximo admitido es de +18:00 a -18:00.
* Los ID de zona horaria extraídos de la base de datos TZ. Para obtener más información, consulta la [lista de nombres de bases de datos TZ][2].

**Nota**: Analizar una fecha **no** configura su valor como fecha oficial del log. Para hacerlo, utiliza el [Reasignador de fechas de logs][3] en un procesador posterior.

### Alternancia de patrones

Si tiene logs con dos formatos posibles que sólo difieren en un atributo, configura una única regla alternando con `(<REGEX_1>|<REGEX_2>)`. Esta regla equivale a un OR booleano.

**Log:**

```text
john connected on 11/08/2017
12345 connected on 11/08/2017
```

**Regla**:
ten en cuenta que "id" es un número entero y no una cadena.

```text
MyParsingRule (%{integer:user.id}|%{word:user.firstname}) connected on %{date("MM/dd/yyyy"):connect_date}
```

**Resultados**:

{{< img src="logs/processing/parsing/parsing_example_4.png" alt="Ejemplo de análisis 4" style="width:80%;" >}}

{{< img src="logs/processing/parsing/parsing_example_4_bis.png" alt="Ejemplo de análisis 4 bis" style="width:80%;" >}}

### Atributo opcional

Algunos logs contienen valores que sólo aparecen una parte del tiempo. En este caso, haz que la extracción de atributos sea opcional con `()?`.

**Log:**

```text
john 1234 connected on 11/08/2017
```

**Regla**:

```text
MyParsingRule %{word:user.firstname} (%{integer:user.id} )?connected on %{date("MM/dd/yyyy"):connect_date}
```

**Nota**: Una regla no coincidirá si incluyes un espacio después de la primera palabra en la sección opcional.

{{< img src="logs/processing/parsing/parsing_example_5.png" alt="Ejemplo de análisis 5" style="width:80%;" >}}

{{< img src="logs/processing/parsing/parsing_example_5_bis.png" alt="Ejemplo de análisis 5 bis" style="width:80%;" >}}

### JSON anidado

Utiliza el filtro `json` para analizar un objeto JSON anidado después de un prefijo de texto sin formato:

**Log:**

```text
Sep 06 09:13:38 vagrant program[123]: server.1 {"method":"GET", "status_code":200, "url":"https://app.datadoghq.com/logs/pipelines", "duration":123456}
```

**Regla**:

```text
parsing_rule %{date("MMM dd HH:mm:ss"):timestamp} %{word:vm} %{word:app}\[%{number:logger.thread_id}\]: %{notSpace:server} %{data::json}
```

{{< img src="logs/processing/parsing/nested_json.png" alt="Ejemplo de análisis de un JSON anidado" style="width:80%;" >}}

### Expresión regular

**Log:**

```text
john_1a2b3c4 connected on 11/08/2017
```

**Regla**:

```text
MyParsingRule %{regex("[a-z]*"):user.firstname}_%{regex("[a-zA-Z0-9]*"):user.id} .*
```

{{< img src="logs/processing/parsing/regex_parsing.png" alt="Ejemplo de análisis 6" style="width:80%;" >}}

### Lista a matriz

Utiliza el filtro `array([[openCloseStr, ] separator][, subRuleOrFilter)` para extraer una lista en una matriz en un solo atributo. El `subRuleOrFilter` es opcional y acepta estos [filtros][4].

**Log:**

```text
Los usuarios [John, Oliver, Marc, Tom] se han añadido a la base de datos
```

**Regla**:

```text
myParsingRule Los usuario %{data:users:array("[]",",")} se han añadido a la base de datos
```

{{< img src="logs/processing/parsing/array_parsing.png" alt="Ejemplo de análisis 6" style="width:80%;" >}}

**Log:**

```text
Los usuarios {John-Oliver-Marc-Tom} se han añadido a la base de datos
```

**Regla**:

```text
myParsingRule Los usuarios %{data:users:array("{}","-")} se han añadido a la base de datos
```

**Regla que utiliza `subRuleOrFilter`**:

```text
myParsingRule Los usuarios %{data:users:array("{}","-", uppercase)} se han añadido a la base de datos
```

### Formato glog

A veces los componentes de Kubernetes gestionan logs en el formato `glog`. Este ejemplo es del elemento del programador de Kubernetes en la biblioteca de pipelines.

Ejemplo de línea de log:

```text
W0424 11:47:41.605188       1 authorization.go:47] Authorization is disabled
```

Regla de análisis:

```text
kube_scheduler %{regex("\\w"):level}%{date("MMdd HH:mm:ss.SSSSSS"):timestamp}\s+%{number:logger.thread_id} %{notSpace:logger.name}:%{number:logger.lineno}\] %{data:msg}
```

Y JSON extraído:

```json
{
  "level": "W",
  "timestamp": 1587728861605,
  "logger": {
    "thread_id": 1,
    "name": "authorization.go"
  },
  "lineno": 47,
  "msg": "Authorization is disabled"
}
```

### Análisis de XML

El analizador de XML transforma los mensajes con formato XML en JSON.

**Log:**

```text
<book category="CHILDREN">
  <title lang="en">Harry Potter</title>
  <author>J K. Rowling</author>
  <year>2005</year>
</book>
```

**Regla:**

```text
rule %{data::xml}
```

**Resultado:**

  ```json
{
  "book": {
    "year": "2005",
    "author": "J K. Rowling",
    "category": "CHILDREN",
    "title": {
      "lang": "en",
      "value": "Harry Potter"
    }
  }
}
  ```

**Notas**:

* Si el XML contiene etiquetas (tags) que tienen un atributo y un valor de cadena entre las dos etiquetas, se genera un atributo `value`. Por ejemplo: `<title lang="en">Harry Potter</title>` se convierte en `{"title": {"lang": "en", "value": "Harry Potter" } }`
* Las etiquetas repetidas se convierten automáticamente en matrices. Por ejemplo: `<bookstore><book>Harry Potter</book><book>Everyday Italian</book></bookstore>` se convierte en `{ "bookstore": { "book": [ "Harry Potter", "Everyday Italian" ] } }`

### Análisis de CSV

Utiliza el filtro **CSV** para asignar cadenas a atributos con mayor facilidad cuando estén separadas por un carácter determinado (`,` por defecto).

El filtro CSV se define como `csv(headers[, separator[, quotingcharacter]])` donde:

* `headers`: define el nombre de las claves separadas por `,`. Los nombres de las claves deben empezar por un carácter alfabético y pueden contener cualquier carácter alfanumérico además de `_`.
* `separator`: define los separadores que se utilizan para separar los distintos valores. Sólo se acepta un carácter. Por defecto: `,`. **Nota**: Utiliza `tab` para que el `separator` represente el carácter de tabulación para los TSV.
* `quotingcharacter`: define el carácter de comillas. Sólo se acepta un carácter. Por defecto: `"`

**Nota**:

* Los valores que contienen un carácter separador se deben colocar entre comillas.
* Los valores entre comillas que contienen un carácter de comillas deben tener caracteres de escape entre comillas. Por ejemplo, `""` dentro de un valor entre comillas representa `"`.
* Si el log no contiene el mismo número de valores que el número de claves del encabezado, el analizador de CSV coincidirá con los primeros.
* Los números enteros y dobles se convierten de manera automática, si es posible.

**Log:**

{{< code-block lang="text" >}}
John,Doe,120,Jefferson St.,Riverside
{{< /code-block >}}

**Regla**:

{{< code-block lang="text" >}}
myParsingRule %{data:user:csv("first_name,name,st_nb,st_name,city")}
{{< /code-block >}}

**Resultado:**

{{< code-block lang="json" >}}
{
  "user": {
    "first_name": "John",
    "name": "Doe",
    "st_nb": 120,
    "st_name": "Jefferson St.",
    "city": "Riverside"
  }
}
{{< /code-block >}}

Otros ejemplos:

| **Cadena sin formato**               | **Regla de análisis**                                                         | **Resultado**                                      |
|:-----------------------------|:-------------------------------------------------------------------------|:------------------------------------------------|
| `John,Doe`                   | `%{data::csv("firstname,name")}`                                         | {"firstname": "John", "name":"Doe"}             |
| `"John ""Da Man""",Doe`      | `%{data::csv("firstname,name")}`                                         | {"firstname": "John \"Da Man\"", "name":"Doe"}  |
| `'John ''Da Man''',Doe`      | `%{data::csv("firstname,name",",","'")}`                                 | {"firstname": "John 'Da Man'", "name":"Doe"}    |
| <code>John&#124;Doe</code>   | <code>%{data::csv(&quot;firstname,name&quot;,&quot;&#124;&quot;)}</code> | {"firstname": "John", "name":"Doe"}             |
| `value1,value2,value3`       | `%{data::csv("key1,key2")}`                                              | {"key1": "value1", "key2":"value2"}             |
| `value1,value2`              | `%{data::csv("key1,key2,key3")}`                                         | {"key1": "value1", "key2":"value2"}             |
| `value1,,value3`             | `%{data::csv("key1,key2,key3")}`                                         | {"key1": "value1", "key3":"value3"}             |
| <code>Value1&nbsp;&nbsp;&nbsp;&nbsp;Value2&nbsp;&nbsp;&nbsp;&nbsp;Value3</code> (TSV)      | `%{data::csv("key1,key2,key3","tab")}` | {"key1": "value1", "key2": "value2", "key3":"value3"} |

### Uso del emparejador de datos para descartar el texto innecesario

Si tienes un log en el que, tras haber analizado lo necesario sabes que es seguro descartar el texto después de ese punto, puedes utilizar el emparejador de datos para hacerlo. En el siguiente ejemplo de log, puedes utilizar el emparejador `data` para descartar el `%` del final.

**Log:**

```
Usage: 24.3%
```

**Regla**:

```
MyParsingRule Usage\:\s+%{number:usage}%{data:ignore}
```

**Resultado**:

```
{
  "usage": 24.3,
  "ignore": "%"
}
```

### Caracteres de control ASCII

Si tus logs contienen caracteres de control ASCII, se serializarán en el momento del consumo. Estos se pueden gestionar escapando de manera explícita del valor serializado dentro de tu analizador grok.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/google/re2/wiki/Syntax
[2]: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
[3]: /es/logs/log_configuration/processors/#log-date-remapper
[4]: /es/logs/log_configuration/parsing/?tab=filters&tabs=filters#matcher-and-filter