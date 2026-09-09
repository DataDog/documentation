---
algolia:
  tags:
  - grok
  - grok parser
  - logs parsing
  - Extracting Attributes
  - Remapping attributes
  - parsing
aliases:
- /es/logs/parsing/
- /es/logs/processing/parsing
description: Analice sus registros usando el procesador Grok
further_reading:
- link: /logs/log_configuration/processors
  tag: Documentación
  text: Aprenda a procesar sus registros
- link: /logs/logging_without_limits/
  tag: Documentación
  text: Controle el volumen de registros indexados por Datadog
- link: /logs/faq/how-to-investigate-a-log-parsing-issue/
  tag: PREGUNTAS FRECUENTES
  text: ¿Cómo investigar un problema de parseo de registros?
- link: /logs/guide/log-parsing-best-practice/
  tag: PREGUNTAS FRECUENTES
  text: 'Parseo de registros: mejores prácticas'
- link: https://learn.datadoghq.com/courses/log-pipelines
  tag: Centro de aprendizaje
  text: Aprenda a crear y modificar canalizaciones de registros
- link: https://learn.datadoghq.com/courses/debugging-log-pipelines
  tag: Centro de aprendizaje
  text: Depuración de canalizaciones de registros
- link: https://www.datadoghq.com/blog/detect-http2-abuse-apache-web-server-logs/
  tag: Blog
  text: Cómo detectar abusos de HTTP/2 en los registros del servidor web Apache
- link: https://www.youtube.com/watch?v=AwW70AUmaaQ&list=PLdh-RwQzDsaM9Sq_fi-yXuzhmE7nOlqLE&index=3
  tag: Video
  text: 'Consejos y trucos de Datadog: utilice el parseo de Grok para extraer campos
    de los registros'
title: Parseo
---
{{< learning-center-callout header="Pruebe el parseo de Grok en el Centro de aprendizaje" btn_title="Inscríbase ahora" btn_url="https://learn.datadoghq.com/courses/log-pipelines">}}
  Aprenda a crear y modificar canalizaciones de registros, adminístrelas con el Pipeline Scanner y estandarice los nombres de los atributos estándar en los registros procesados para lograr coherencia.
{{< /learning-center-callout >}}

## Resumen {#overview}

Datadog analiza automáticamente los registros con formato JSON. Para otros formatos, Datadog le permite enriquecer sus registros con la ayuda de Grok Parser.
La sintaxis de Grok proporciona una forma más sencilla de analizar registros que las expresiones regulares puras. El Grok Parser le permite extraer atributos de mensajes de texto semiestructurados.

Grok viene con patrones reutilizables para analizar números enteros, direcciones IP, nombres de servidor, etc. Estos valores deben enviarse al Grok Parser como cadenas.

Puede escribir reglas de parseo con la sintaxis `%{MATCHER:EXTRACT:FILTER}`:

* **Coincidencia**: Una regla (posiblemente una referencia a otra regla de token) que describe qué esperar (número, palabra, noEspacio, etc.).

* **Extracción** (opcional): Un identificador que representa el destino de captura para el fragmento de texto que coincide con la *Coincidencia*.

* **Filtro** (opcional): Un posprocesador de la coincidencia para transformarla.

Ejemplo para un registro clásico no estructurado:

```text
john connected on 11/08/2017
```

Con la siguiente regla de parseo:

```text
MyParsingRule %{word:user} connected on %{date("MM/dd/yyyy"):date}
```

Después del procesamiento, se genera el siguiente registro estructurado:

```json
{
  "user": "john",
  "date": 1575590400000
}
```

**Nota**:

* Si tiene varias reglas de parseo en un solo Grok Parser:
  * Solo una puede coincidir con cualquier registro dado. La primera que coincida, de arriba hacia abajo, es la que realiza el parseo.
  * Cada regla puede hacer referencia a reglas de parseo definidas por encima de sí misma en la lista.
* Debe tener nombres de regla únicos dentro del mismo Grok Parser.
* El nombre de la regla debe contener solo: caracteres alfanuméricos, `_` y `.`. Debe comenzar con un carácter alfanumérico.
* Las propiedades con valores nulos o vacíos no se muestran.
* Debe definir su regla de parseo para que coincida con toda la entrada de registro, ya que cada regla se aplica desde el principio hasta el final del registro.
* Ciertos registros pueden producir grandes espacios en blanco. Use `\n` y `\s+` para tener en cuenta los saltos de línea y los espacios en blanco.

### Coincidencia y filtro {#matcher-and-filter}

<div class="alert alert-danger">Las funciones de parseo Grok disponibles en <em>tiempo de consulta</em> (en el <a href="/logs/explorer/calculated_fields/">Log Explorer</a>) admiten un subconjunto limitado de coincidencias (<strong>datos</strong>, <strong>entero</strong>, <strong>sinEspacio</strong>, <strong>número</strong> y <strong>palabra</strong>) y filtros (<strong>número</strong> y <strong>entero</strong>).<br><br>
El siguiente conjunto completo de coincidencias y filtros es específico para la funcionalidad del <em>Grok Parser</em> en <a href="/logs/log_configuration/processors/grok_parser/">tiempo de ingesta</a>.</div>

Esta es una lista de todas las coincidencias y filtros implementados de forma nativa por Datadog:

{{< tabs >}}
{{% tab "Coincidencias" %}}

**Coincidencias en tiempo de consulta y tiempo de ingesta:**

Las siguientes coincidencias están disponibles tanto para el parseo en tiempo de consulta (Log Explorer) como para el parseo en tiempo de ingesta (Grok Parser):

`word`
: Coincide con una _palabra_, que comienza con un límite de palabra; contiene caracteres de a-z, A-Z, 0-9, incluido el carácter `_` (guion bajo); y termina con un límite de palabra. Equivalente a `\b\w+\b` en regex.

`notSpace`
: Coincide con cualquier cadena hasta el siguiente espacio.

`number`
: Coincide con un número decimal de punto flotante y lo analiza como un número de doble precisión.

`integer`
: Coincide con un número entero y lo analiza como un número entero.

`data`
: Coincide con cualquier cadena, incluyendo espacios y saltos de línea. Equivalente a `.*` en regex. Úselo cuando ninguno de los patrones anteriores sea apropiado.

**Coincidencias solo durante la ingesta:**

Las siguientes coincidencias solo están disponibles para el parseo durante la ingesta con el procesador Grok Parser y no se pueden usar en el Log Explorer:

`date("pattern"[, "timezoneId"[, "localeId"]])`
: Coincide con una fecha con el patrón especificado y la analiza para producir una marca de tiempo Unix. [Consulte los ejemplos del Matcher de fecha](#parsing-dates).

`regex("pattern")`
: Coincide con una expresión regular. [Verifique los ejemplos del comparador de expresiones regulares](#regex).

`boolean("truePattern", "falsePattern")`
: Coincide y analiza un valor booleano, definiendo opcionalmente los patrones verdadero y falso (los valores predeterminados son `true` y `false`, ignorando mayúsculas y minúsculas).

`numberStr`
: Coincide con un número decimal de punto flotante y lo analiza como una cadena.

`numberExtStr`
: Coincide con un número de punto flotante (con soporte para notación científica) y lo analiza como una cadena.

`numberExt`
: Coincide con un número de punto flotante (con soporte para notación científica) y lo analiza como un número de doble precisión.

`integerStr`
: Coincide con un número entero y lo analiza como una cadena.

`integerExtStr`
: Coincide con un número entero (con soporte para notación científica) y lo analiza como una cadena.

`integerExt`
: Coincide con un número entero (con soporte para notación científica) y lo analiza como un número entero.

`doubleQuotedString`
: Coincide con una cadena entre comillas dobles.

`singleQuotedString`
: Coincide con una cadena entre comillas simples.

`quotedString`
: Coincide con una cadena entre comillas dobles o simples.

`uuid`
: Coincide con un UUID.

`mac`
: Coincide con una dirección MAC.

`ipv4`
: Coincide con una dirección IPv4.

`ipv6`
: Coincide con una dirección IPv6.

`ip`
: Coincide con una IP (v4 o v6).

`hostname`
: Coincide con un nombre de servidor.

`ipOrHost`
: Coincide con un nombre de servidor o una IP.

`port`
: Coincide con un número de puerto.

{{% /tab %}}
{{% tab "Filtros" %}}

**Filtros de tiempo de consulta y tiempo de ingesta:**

Los siguientes filtros están disponibles tanto para el parseo en tiempo de consulta (Log Explorer) como para el parseo en tiempo de ingesta (Grok Parser):

`number`
: Analiza una coincidencia como un número de doble precisión.

`integer`
: Analiza una coincidencia como un número entero.

**Filtros solo para tiempo de ingesta:**

Los siguientes filtros solo están disponibles para el parseo en tiempo de ingesta con el procesador Grok Parser y no se pueden usar en el Log Explorer:

`boolean`
: Analiza cadenas 'true' y 'false' como booleanos ignorando mayúsculas y minúsculas.

`nullIf("value")`
: Devuelve nulo si la coincidencia es igual al valor proporcionado.

`json`
: Analiza JSON con formato correcto.

`rubyhash`
: Analiza un hash de Ruby con formato correcto como `{name => "John", "job" => {"company" => "Big Company", "title" => "CTO"}}`

`useragent([decodeuricomponent:true/false])`
: Analiza un user-agent y devuelve un objeto JSON que contiene el dispositivo, el sistema operativo y el navegador representados por el Agent. [Consulte el procesador de User Agent][1].

`querystring`
: Extrae todos los pares clave-valor en una cadena de consulta de URL coincidente (por ejemplo, `?productId=superproduct&promotionCode=superpromo`).

`decodeuricomponent`
: Decodifica componentes de URI. Por ejemplo, transforma `%2Fservice%2Ftest` en `/service/test`.

`lowercase`
: Devuelve la cadena en minúsculas.

`uppercase`
: Devuelve la cadena en mayúsculas.

`keyvalue([separatorStr[, characterAllowList[, quotingStr[, delimiter]]]])`
: Extrae el patrón de clave-valor y devuelve un objeto JSON. Consulte los [ejemplos de filtro de clave-valor](#key-value-or-logfmt).

`xml`
: Analiza XML correctamente formateado. Consulte los [ejemplos de filtro XML](#parsing-xml).

`csv(headers[, separator[, quotingcharacter]])`
: Analiza líneas de CSV o TSV correctamente formateadas. Consulte los [ejemplos de filtro CSV](#parsing-csv).

`scale(factor)`
: Multiplica el valor numérico esperado por el factor proporcionado.

`array([[openCloseStr, ] separator][, subRuleOrFilter)`
: Realiza el parseo de una secuencia de tokens de cadena y la devuelve como una matriz. Consulte el ejemplo de [lista a arreglo](#list-to-array).

`url`
: Analiza una URL y devuelve todos los miembros tokenizados (dominio, parámetros de consulta, puerto, etc.) en un objeto JSON. [Más información sobre cómo analizar URLs][2].

[1]: /es/logs/log_configuration/processors/user_agent_parser/
[2]: /es/logs/log_configuration/processors/url_parser/
{{% /tab %}}
{{< /tabs >}}

## Configuración avanzada {#advanced-settings}

Utilice la sección {{< ui >}}Advanced Settings{{< /ui >}} en la parte inferior de su procesador Grok para analizar un atributo específico en lugar del atributo `message` predeterminado, o para definir reglas auxiliares que reutilicen patrones comunes en múltiples reglas de análisis.

### Parseo de un atributo de texto específico {#parsing-a-specific-text-attribute}

Utilice el campo {{< ui >}}Extract from{{< /ui >}} para aplicar su procesador Grok a un atributo de texto determinado en lugar del atributo `message` predeterminado.

Por ejemplo, considere un registro que contiene un atributo `command.line` que debe analizarse como clave-valor. Extraiga de `command.line` para realizar el parseo de su contenido y crear atributos estructurados a partir de los datos del comando.

{{< img src="/logs/processing/parsing/grok_advanced_settings_extract.png" alt="Configuración avanzada con el ejemplo del atributo Extract from command.line" style="width:80%;">}}

### Uso de reglas auxiliares para reutilizar patrones comunes {#using-helper-rules-to-reuse-common-patterns}

Utilice el campo {{< ui >}}Helper Rules{{< /ui >}} para definir tokens para sus reglas de parseo. Las reglas auxiliares le permiten reutilizar patrones Grok comunes en sus reglas de parseo. Esto es útil cuando tiene varias reglas en el mismo analizador Grok que utilizan los mismos tokens.

Ejemplo para un registro clásico no estructurado:

```text
john id:12345 connected on 11/08/2017 on server XYZ in production
```

Utilice la siguiente regla de parseo:

```text
MyParsingRule %{user} %{connection} %{server}
```

Con los siguientes ayudantes:

```text
user %{word:user.name} id:%{integer:user.id}
connection connected on %{date("MM/dd/yyyy"):connect_date}
server on server %{notSpace:server.name} in %{notSpace:server.env}
```

## Ejemplos {#examples}

Algunos ejemplos que demuestran cómo usar analizadores:

* [Clave-valor o logfmt](#key-value-or-logfmt)
* [Parseo de fechas](#parsing-dates)
* [Patrones alternos](#alternating-pattern)
* [Atributo opcional](#optional-attribute)
* [JSON anidado](#nested-json)
* [Regex](#regex)
* [Listas y arreglos](#list-to-array)
* [ Formato Glog](#glog-format)
* [XML](#parsing-xml)
* [CSV](#parsing-csv)

### Clave-valor o logfmt {#key-value-or-logfmt}

Este es el filtro principal de clave-valor: `keyvalue([separatorStr[, characterAllowList[, quotingStr[, delimiter]]]])` donde:

* `separatorStr`: define el separador entre claves y valores. El valor predeterminado es `=`.
* `characterAllowList`: define caracteres de valor adicionales sin escape además del `\\w.\\-_@` predeterminado. Se utiliza solo para valores sin comillas (por ejemplo, `key=@valueStr`).
* `quotingStr`: define comillas, reemplazando la detección de comillas predeterminada: `<>`, `""`, `''`.
* `delimiter`: define el separador entre los diferentes pares de clave-valor (por ejemplo, `|` es el delimitador en `key1=value1|key2=value2`). El valor predeterminado es ` ` (espacio normal), `,` y `;`.

Utilice filtros como `keyvalue` para asignar cadenas a atributos de forma más sencilla para formatos keyvalue o logfmt:

**Registro:**

```text
user=john connect_date=11/08/2017 id=123 action=click
```

**Regla:**

```text
rule %{data::keyvalue}
```

No necesita especificar el nombre de sus parámetros, ya que estos ya están contenidos en el registro.
Si agrega un atributo **extract** `my_attribute` en su patrón de regla, verá:

```json
{
  "my_attribute": {
    "user": "john",
    "id": 123,
    "action": "click"
  }
}
```

Si `=` no es el separador predeterminado entre su clave y sus valores, agregue un parámetro en su regla de parseo con un separador.

**Registro:**

```text
user: john connect_date: 11/08/2017 id: 123 action: click
```

**Regla:**

```text
rule %{data::keyvalue(": ")}
```

Si los registros contienen caracteres especiales en el valor de un atributo, como `/` en una URL por ejemplo, agréguelo a la lista de permitidos en la regla de parseo:

**Registro:**

```text
url=https://app.datadoghq.com/event/stream user=john
```

**Regla:**

```text
rule %{data::keyvalue("=","/:")}
```

Otros ejemplos:

| **Cadena sin procesar**               | **Regla de parseo**                                      | **Resultado**                            |
|:-----------------------------|:------------------------------------------------------|:--------------------------------------|
| key=valueStr                 | `%{data::keyvalue}`                                   | {\"key\": \"valueStr\"}                   |
| key=\\<valueStr>              | `%{data::keyvalue}`                                   | {\"key\": \"valueStr\"}                   |
| \"key\"=\"valueStr\"             | `%{data::keyvalue}`                                   | {\"key\": \"valueStr\"}                   |
| key:valueStr                 | `%{data::keyvalue(":")}`                              | {\"key\": \"valueStr\"}                   |
| key:\"/valueStr\"              | `%{data::keyvalue(":", "/")}`                         | {\"key\": \"/valueStr\"}                  |
| /key:/valueStr               | `%{data::keyvalue(":", "/")}`                         | {\"/key\": \"/valueStr\"}                 |
| key:={valueStr}              | `%{data::keyvalue(":=", "", "{}")}`                   | {\"key\": \"valueStr\"}                   |
| key1=value1\\|key2=value2     | <code>%{data::keyvalue(&quot;=&quot;, &quot;&quot;, &quot;&quot;, &quot;&#124;&quot;)}</code> | {\"key1\": \"value1\", \"key2\": \"value2\"}  |
| key1=\"value1\"\\|key2=\"value2\" | <code>%{data::keyvalue(&quot;=&quot;, &quot;&quot;, &quot;&quot;, &quot;&#124;&quot;)}</code> | {\"key1\": \"value1\", \"key2\": \"value2\"}  |

**Ejemplo de Multiple QuotingString**: Cuando se definen múltiples cadenas de comillas, el comportamiento predeterminado se reemplaza por un carácter de comillas definido.
El par clave-valor siempre coincide con las entradas sin ningún carácter de comillas, independientemente de lo que se especifique en `quotingStr`. Cuando se utilizan caracteres de comillas, se ignora `characterAllowList` ya que se extrae todo lo que se encuentra entre los caracteres de comillas.

**Registro:**

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

* Los valores vacíos (`key=`) o `null` (`key=null`) no se muestran en el JSON de salida.
* Si define un filtro *keyvalue* en un objeto `data`, y este filtro no coincide, entonces se devuelve un JSON `{}` vacío (por ejemplo, entrada: `key:=valueStr`, regla de parseo: `rule_test %{data::keyvalue("=")}`, salida: `{}`).
* Definir `""` como `quotingStr` mantiene la configuración predeterminada para las comillas.

### Parseo de fechas {#parsing-dates}

El comparador de fechas transforma su marca de tiempo al formato EPOCH (unidad de medida **milisegundo**).

| **Cadena sin procesar**                       | **Regla de parseo**                                          | **Resultado**              |
|:-------------------------------------|:----------------------------------------------------------|:------------------------|
| 14:20:15                             | `%{date("HH:mm:ss"):date}`                                | {\"date\": 51615000}      |
| 02:20:15 PM                          | `%{date("hh:mm:ss a"):date}`                              | {\"date\": 51615000}      |
| 11/10/2014                           | `%{date("dd/MM/yyyy"):date}`                              | {\"date\": 1412978400000} |
| Thu Jun 16 08:29:03 2016             | `%{date("EEE MMM dd HH:mm:ss yyyy"):date}`                | {\"date\": 1466065743000} |
| Tue Nov 1 08:29:03 2016              | `%{date("EEE MMM d HH:mm:ss yyyy"):date}`                 | {\"date\": 1466065743000} |
| 06/Mar/2013:01:36:30 +0900           | `%{date("dd/MMM/yyyy:HH:mm:ss Z"):date}`                  | {\"date\": 1362501390000} |
| 2016-11-29T16:21:36.431+0000         | `%{date("yyyy-MM-dd'T'HH:mm:ss.SSSZ"):date}`              | {\"date\": 1480436496431} |
| 2016-11-29T16:21:36.431+00:00        | `%{date("yyyy-MM-dd'T'HH:mm:ss.SSSZZ"):date}`             | {\"date\": 1480436496431} |
| 06/Feb/2009:12:14:14.655             | `%{date("dd/MMM/yyyy:HH:mm:ss.SSS"):date}`                | {\"date\": 1233922454655} |
| 2007-08-31 19:22:22.427 ADT          | `%{date("yyyy-MM-dd HH:mm:ss.SSS z"):date}`               | {\"date\": 1188598942427} |
| Jue Jun 16 08:29:03 2016<sup>1</sup> | `%{date("EEE MMM dd HH:mm:ss yyyy","Europe/Paris"):date}` | {\"date\": 1466058543000} |
| Jue Jun 16 08:29:03 2016<sup>1</sup> | `%{date("EEE MMM dd HH:mm:ss yyyy","UTC+5"):date}`        | {\"date\": 1466047743000} |
| Jue Jun 16 08:29:03 2016<sup>1</sup> | `%{date("EEE MMM dd HH:mm:ss yyyy","+3"):date}`           | {\"date\": 1466054943000} |

<sup>1</sup>Utilice el parámetro `timezone` si realiza sus propias localizaciones y sus marcas de tiempo _no_ están en UTC.
El formato admitido para las zonas horarias es:

* `GMT`, `UTC`, `UT` o `Z`
* `+hh:mm`, `-hh:mm`, `+hhmm`, `-hhmm`. El rango máximo admitido es de +18:00 a -18:00 inclusive.
* Zonas horarias que comienzan con `UTC+`, `UTC-`, `GMT+`, `GMT-`, `UT+` o `UT-`. El rango máximo admitido es de +18:00 a -18:00 inclusive.
* IDs de zona horaria extraídos de la base de datos TZ. Para obtener más información, consulte [TZ database names][2].

**Nota**: El parseo de una fecha **no** establece su valor como la fecha oficial del registro. Para esto, utilice el [Log Date Remapper][3] en un procesador posterior.

### Patrón alterno {#alternating-pattern}

Si tiene registros con dos formatos posibles que difieren solo en un atributo, establezca una única regla usando alternancia con `(<REGEX_1>|<REGEX_2>)`. Esta regla es equivalente a un OR booleano.

**Registro**:

```text
john connected on 11/08/2017
12345 connected on 11/08/2017
```

**Regla**:
Tenga en cuenta que "id" es un número entero y no una cadena.

```text
MyParsingRule (%{integer:user.id}|%{word:user.firstname}) connected on %{date("MM/dd/yyyy"):connect_date}
```

**Resultados**:<br>
`%{integer:user.id}`

```json
{
  "user": {
    "id": 12345
  },
  "connect_date": 1510099200000
}
```
`%{word:user.firstname}`

```json
{
  "user": {
    "firstname": "john"
  },
  "connect_date": 1510099200000
}
```

### Atributo opcional {#optional-attribute}

Algunos registros contienen valores que solo aparecen parte del tiempo. En este caso, haga que la extracción de atributos sea opcional con `()?`.

**Registro**:

```text
john 1234 connected on 11/08/2017
john connected on 11/08/2017
```

**Regla**:

```text
MyParsingRule %{word:user.firstname} (%{integer:user.id} )?connected on %{date("MM/dd/yyyy"):connect_date}
```

**Nota**: Una regla no coincidirá si incluye un espacio después de la primera palabra en la sección opcional.

**Resultado**:<br>
`(%{integer:user.id} )?`

```json
{
  "user": {
    "firstname": "john",
    "id": 1234
  },
  "connect_date": 1510099200000
}
```

`%{word:user.firstname} (%{integer:user.id} )?`

```json
{
  "user": {
    "firstname": "john",
  },
  "connect_date": 1510099200000
}
```

### JSON anidado {#nested-json}

Use el filtro `json` para analizar un objeto JSON anidado después de un prefijo de texto sin formato:

**Registro**:

```text
Sep 06 09:13:38 vagrant program[123]: server.1 {"method":"GET", "status_code":200, "url":"https://app.datadoghq.com/logs/pipelines", "duration":123456}
```

**Regla**:

```text
parsing_rule %{date("MMM dd HH:mm:ss"):timestamp} %{word:vm} %{word:app}\[%{number:logger.thread_id}\]: %{notSpace:server} %{data::json}
```

**Resultado**:

```json
{
  "timestamp": 1567761218000,
  "vm": "vagrant",
  "app": "program",
  "logger": {
    "thread_id": 123
  },
  "server": "server.1",
  "method": "GET",
  "status_code": 200,
  "url": "https://app.datadoghq.com/logs/pipelines",
  "duration": 123456
}
```

### Regex {#regex}

**Registro**:

```text
john_1a2b3c4 connected on 11/08/2017
```

**Regla**:

```text
MyParsingRule %{regex("[a-z]*"):user.firstname}_%{regex("[a-zA-Z0-9]*"):user.id} .*
```

**Resultado**:

```json
{
  "user": {
    "firstname": "john",
    "id": "1a2b3c4"
  }
}
```

### Lista a matriz {#list-to-array}

Use el filtro `array([[openCloseStr, ] separator][, subRuleOrFilter)` para extraer una lista en una matriz en un solo atributo. El `subRuleOrFilter` es opcional y acepta estos [filtros][4].

**Registro**:

```text
Users [John, Oliver, Marc, Tom] have been added to the database
```

**Regla**:

```text
myParsingRule Users %{data:users:array("[]",",")} have been added to the database
```

**Resultado**:

```json
{
  "users": [
    "John",
    " Oliver",
    " Marc",
    " Tom"
  ]
}
```

**Registro**:

```text
Users {John-Oliver-Marc-Tom} have been added to the database
```

**Regla**:

```text
myParsingRule Users %{data:users:array("{}","-")} have been added to the database
```

**Regla usando `subRuleOrFilter`**:

```text
myParsingRule Users %{data:users:array("{}","-", uppercase)} have been added to the database
```

### Glog format {#glog-format}

Los componentes de Kubernetes a veces generan registros en el formato `glog`; este ejemplo proviene del elemento Kube Scheduler en la Biblioteca de canalizaciones.

Línea de registro de ejemplo:

```text
W0424 11:47:41.605188       1 authorization.go:47] Authorization is disabled
```

Regla de parseo:

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

### Parseo de XML {#parsing-xml}

El analizador XML transforma los mensajes con formato XML en JSON.

**Registro:**

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

* Si el XML contiene etiquetas que tienen tanto un atributo como un valor de cadena entre las dos etiquetas, se genera un atributo `value`. Por ejemplo: `<title lang="en">Harry Potter</title>` se convierte en `{"title": {"lang": "en", "value": "Harry Potter" } }`
* Las etiquetas repetidas se convierten automáticamente en matrices. Por ejemplo: `<bookstore><book>Harry Potter</book><book>Everyday Italian</book></bookstore>` se convierte en `{ "bookstore": { "book": [ "Harry Potter", "Everyday Italian" ] } }`

### Parseo de CSV {#parsing-csv}

Utilice el filtro `csv` para asignar cadenas a atributos con mayor facilidad cuando estén separados por un carácter determinado (`,` de forma predeterminada).

El filtro CSV se define como `csv(headers[, separator[, quotingcharacter]])` donde:

* `headers`: Define el nombre de las claves separado por `,`. Los nombres de las claves deben comenzar con un carácter alfabético y pueden contener cualquier carácter alfanumérico además de `_`.
* `separator`: Define los separadores utilizados para separar los diferentes valores. Solo se acepta un carácter. Predeterminado: `,`. **Nota**: Utilice `tab` para el `separator` para representar el carácter de tabulación para TSV.
* `quotingcharacter`: Define el carácter de comilla. Solo se acepta un carácter. Predeterminado: `"`

**Nota**:

* Los valores que contienen un carácter separador deben estar entre comillas.
* Los valores entre comillas que contengan un carácter de comilla deben escaparse con caracteres de comilla. Por ejemplo, `""` dentro de un valor entre comillas representa `"`.
* Si el registro no contiene el mismo número de valores que el número de claves en el encabezado, el analizador CSV coincidirá con los primeros.
* Los números enteros y dobles se convierten automáticamente si es posible.

**Registro**:

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

| **Cadena sin procesar**               | **Regla de parseo**                                                         | **Resultado**                                      |
|:-----------------------------|:-------------------------------------------------------------------------|:------------------------------------------------|
| `John,Doe`                   | `%{data::csv("firstname,name")}`                                         | {\"firstname\": \"John\", \"name\":\"Doe\"}             |
| `"John ""Da Man""",Doe`      | `%{data::csv("firstname,name")}`                                         | {\"firstname\": \"John \\\"Da Man\\\"\", \"name\":\"Doe\"}  |
| `'John ''Da Man''',Doe`      | `%{data::csv("firstname,name",",","'")}`                                 | {\"firstname\": \"John 'Da Man'\", \"name\":\"Doe\"}    |
| <code>John&#124;Doe</code>   | <code>%{data::csv(&quot;firstname,name&quot;,&quot;&#124;&quot;)}</code> | {\"firstname\": \"John\", \"name\":\"Doe\"}             |
| `value1,value2,value3`       | `%{data::csv("key1,key2")}`                                              | {\"key1\": \"value1\", \"key2\":\"value2\"}             |
| `value1,value2`              | `%{data::csv("key1,key2,key3")}`                                         | {\"key1\": \"value1\", \"key2\":\"value2\"}             |
| `value1,,value3`             | `%{data::csv("key1,key2,key3")}`                                         | {\"key1\": \"value1\", \"key3\":\"value3\"}             |
| <code>Value1&nbsp;&nbsp;&nbsp;&nbsp;Value2&nbsp;&nbsp;&nbsp;&nbsp;Value3</code> (TSV)      | `%{data::csv("key1,key2,key3","tab")}` | {\"key1\": \"value1\", \"key2\": \"value2\", \"key3\":\"value3\"} |

### Utilice el comparador de datos para descartar texto innecesario {#use-data-matcher-to-discard-unneeded-text}

Si tiene un registro donde, después de haber hecho el parseo necesario y saber que el texto después de ese punto es seguro descartarlo, puede utilizar el comparador de datos para hacerlo. Para el siguiente ejemplo de registro, puede utilizar el comparador `data` para descartar el `%` al final.

**Registro**:

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

### Caracteres de control ASCII {#ascii-control-characters}

Si sus registros contienen caracteres de control ASCII, estos se serializan al momento de la ingesta. Estos pueden manejarse escapando explícitamente el valor serializado dentro de su analizador grok.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/google/re2/wiki/Syntax
[2]: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
[3]: /es/logs/log_configuration/processors/log_date_remapper/
[4]: /es/logs/log_configuration/parsing/?tab=filters&tabs=filters#matcher-and-filter