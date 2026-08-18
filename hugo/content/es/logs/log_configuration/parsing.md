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
description: Analiza tus registros utilizando el Procesador Grok
further_reading:
- link: https://learn.datadoghq.com/courses/log-pipelines
  tag: Centro de Aprendizaje
  text: Aprende a construir y modificar canalizaciones de registros
- link: /logs/log_configuration/processors
  tag: Documentación
  text: Aprende a procesar tus registros
- link: https://www.youtube.com/watch?v=AwW70AUmaaQ&list=PLdh-RwQzDsaM9Sq_fi-yXuzhmE7nOlqLE&index=3
  tag: Video
  text: 'Consejos y Trucos de Datadog: Usa el análisis Grok para extraer campos de
    los registros'
- link: /logs/faq/how-to-investigate-a-log-parsing-issue/
  tag: PREGUNTAS FRECUENTES
  text: ¿Cómo investigar un problema de análisis de registros?
- link: /logs/guide/log-parsing-best-practice/
  tag: PREGUNTAS FRECUENTES
  text: Análisis de Registros - Mejores Prácticas
- link: /logs/logging_without_limits/
  tag: Documentación
  text: Controla el volumen de registros indexados por Datadog
- link: https://learn.datadoghq.com/courses/debugging-log-pipelines
  tag: Centro de Aprendizaje
  text: Depuración de canalizaciones de registros
title: Análisis
---
{{< learning-center-callout header="Prueba el análisis Grok en el Centro de Aprendizaje" btn_title="Inscríbete Ahora" btn_url="https://learn.datadoghq.com/courses/log-pipelines">}}
  Aprende a construir y modificar canalizaciones de registros, gestionarlas con el Escáner de Canalizaciones y estandarizar los nombres de atributos en los registros procesados para mantener la consistencia.
{{< /learning-center-callout >}}

## Resumen {#overview}

Datadog analiza automáticamente los registros en formato JSON. Para otros formatos, Datadog te permite enriquecer tus registros con la ayuda del Analizador Grok.
La sintaxis Grok proporciona una forma más fácil de analizar registros que las expresiones regulares puras. El Analizador Grok te permite extraer atributos de mensajes de texto semiestructurados.

Grok viene con patrones reutilizables para analizar enteros, direcciones IP, nombres de host, etc. Estos valores deben enviarse al analizador grok como cadenas.

Puedes escribir reglas de análisis con la sintaxis `%{MATCHER:EXTRACT:FILTER}`:

* **Matcher**: Una regla (posiblemente una referencia a otra regla de token) que describe qué esperar (número, palabra, noEspacio, etc.).

* **Extract** (opcional): Un identificador que representa el destino de captura para el fragmento de texto coincidente con el *Matcher*.

* **Filter** (opcional): Un post-procesador de la coincidencia para transformarla.

Ejemplo de un registro no estructurado clásico:

```text
john connected on 11/08/2017
```

Con la siguiente regla de análisis:

```text
MyParsingRule %{word:user} connected on %{date("MM/dd/yyyy"):date}
```

Después de procesar, se genera el siguiente registro estructurado:

```json
{
  "user": "john",
  "date": 1575590400000
}
```

**Nota**:

* Si tienes múltiples reglas de análisis en un solo analizador Grok:
  * Solo una puede coincidir con cualquier registro dado. La primera que coincida, de arriba hacia abajo, es la que realiza el análisis.
  * Cada regla puede hacer referencia a reglas de análisis definidas por encima de sí misma en la lista.
* Debes tener nombres de regla únicos dentro del mismo analizador Grok.
* El nombre de la regla debe contener solo: caracteres alfanuméricos, `_`, y `.`. Debe comenzar con un carácter alfanumérico.
* Las propiedades con valores nulos o vacíos no se muestran.
* Debes definir tu regla de análisis para que coincida con toda la entrada del registro, ya que cada regla se aplica desde el principio hasta el final del registro.
* Ciertos registros pueden producir grandes espacios en blanco. Utiliza `\n` y `\s+` para contabilizar saltos de línea y espacios en blanco.

### Matcher y filtro {#matcher-and-filter}

<div class="alert alert-danger">Las características de parseo Grok disponibles en <em>tiempo de consulta</em> (en el <a href="/logs/explorer/calculated_fields/">Explorador</a>) admiten un subconjunto limitado de matchers (<strong>data</strong>, <strong>integer</strong>, <strong>notSpace</strong>, <strong>number</strong> y <strong>word</strong>) y filtros (<strong>number</strong> y <strong>integer</strong>).<br><br>
El siguiente conjunto completo de matchers y filtros es específico para <em>tiempo de ingestión</em> <a href="/logs/log_configuration/processors/grok_parser/">funcionalidad del Analizador Grok</a>.</div>

Aquí hay una lista de todos los matchers y filtros implementados nativamente por Datadog:

{{< tabs >}}
{{% tab "Matchers" %}}

**Matchers de tiempo de consulta y tiempo de ingestión:**

Los siguientes matchers están disponibles tanto para el parseo en tiempo de consulta (explorador) como para el parseo en tiempo de ingestión (Analizador Grok):

`word`
: Coincide con una _palabra_, que comienza con un límite de palabra; contiene caracteres de a-z, A-Z, 0-9, incluyendo el `_` (carácter de subrayado); y termina con un límite de palabra. Equivalente a `\b\w+\b` en regex.

`notSpace`
: Coincide con cualquier cadena hasta el siguiente espacio.

`number`
: Coincide con un número decimal de punto flotante y lo analiza como un número de doble precisión.

`integer`
: Coincide con un número entero y lo analiza como un número entero.

`data`
: Coincide con cualquier cadena, incluidos espacios y saltos de línea. Equivalente a `.*` en regex. Utilice cuando ninguno de los patrones anteriores sea apropiado.

**Coincidencias solo de tiempo de ingestión:**

Los siguientes coincidencias solo están disponibles para el parseo de tiempo de ingestión con el procesador Grok Parser y no se pueden usar en el explorador:

`date("pattern"[, "timezoneId"[, "localeId"]])`
: Coincide con una fecha con el patrón especificado y la analiza para producir un timestamp Unix. [Vea los ejemplos de Matcher de fecha](#parsing-dates).

`regex("pattern")`
: Coincide con una expresión regular. [Verifique los ejemplos de Matcher de regex](#regex).

`boolean("truePattern", "falsePattern")`
: Coincide y analiza un Booleano, definiendo opcionalmente los patrones de verdadero y falso (por defecto son `true` y `false`, ignorando mayúsculas y minúsculas).

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
: Coincide con un IPV4.

`ipv6`
: Coincide con un IPV6.

`ip`
: Coincide con una IP (v4 o v6).

`hostname`
: Coincide con un nombre de host.

`ipOrHost`
: Coincide con un nombre de host o IP.

`port`
: Coincide con un número de puerto.

{{% /tab %}}
{{% tab "Filtros" %}}

**Filtros de tiempo de consulta y de tiempo de ingestión:**

Los siguientes filtros están disponibles tanto para el parseo de tiempo de consulta (Explorador de Registros) como para el parseo de tiempo de ingestión (Procesador Grok):

`number`
: Analiza una coincidencia como un número de doble precisión.

`integer`
: Analiza una coincidencia como un número entero.

**Filtros solo de tiempo de ingestión:**

Los siguientes filtros solo están disponibles para el parseo de tiempo de ingestión con el procesador Grok y no se pueden usar en el Explorador de Registros:

`boolean`
: Analiza las cadenas 'true' y 'false' como booleanos ignorando mayúsculas y minúsculas.

`nullIf("value")`
: Devuelve nulo si la coincidencia es igual al valor proporcionado.

`json`
: Analiza JSON correctamente formateado.

`rubyhash`
: Analiza un hash de Ruby correctamente formateado como `{name => "John", "job" => {"company" => "Big Company", "title" => "CTO"}}`

`useragent([decodeuricomponent:true/false])`
: Analiza un agente de usuario y devuelve un objeto JSON que contiene el dispositivo, el sistema operativo y el navegador representado por el Agente. [Consulta el procesador de Agente de Usuario][1].

`querystring`
: Extrae todos los pares clave-valor en una cadena de consulta de URL que coincida (por ejemplo, `?productId=superproduct&promotionCode=superpromo`).

`decodeuricomponent`
: Decodifica componentes de URI. Por ejemplo, transforma `%2Fservice%2Ftest` en `/service/test`.

`lowercase`
: Devuelve la cadena en minúsculas.

`uppercase`
: Devuelve la cadena en mayúsculas.

`keyvalue([separatorStr[, characterAllowList[, quotingStr[, delimiter]]]])`
: Extrae el patrón de clave-valor y devuelve un objeto JSON. Consulta los [ejemplos de filtro de clave-valor](#key-value-or-logfmt).

`xml`
: Analiza XML correctamente formateado. Consulta los [ejemplos de filtro XML](#parsing-xml).

`csv(headers[, separator[, quotingcharacter]])`
: Analiza líneas de CSV o TSV correctamente formateadas. Consulta los [ejemplos de filtro CSV](#parsing-csv).

`scale(factor)`
: Multiplica el valor numérico esperado por el factor proporcionado.

`array([[openCloseStr, ] separator][, subRuleOrFilter)`
: Parsea una secuencia de cadenas de tokens y la devuelve como un arreglo. Consulta el ejemplo de [lista a array](#list-to-array).

`url`
: Analiza una URL y devuelve todos los miembros tokenizados (dominio, parámetros de consulta, puerto, etc.) en un objeto JSON. [Más información sobre cómo analizar URLs][2].

[1]: /es/logs/log_configuration/processors/user_agent_parser/
[2]: /es/logs/log_configuration/processors/url_parser/
{{% /tab %}}
{{< /tabs >}}

## Configuraciones avanzadas {#advanced-settings}

Utiliza la sección de **Configuraciones Avanzadas** al final de tu procesador Grok para analizar un atributo específico en lugar del atributo `message` por defecto, o para definir reglas auxiliares que reutilicen patrones comunes en múltiples reglas de parseo.

### Parseo de un atributo de texto específico {#parsing-a-specific-text-attribute}

Utiliza el campo de **Extraer de** para aplicar tu procesador Grok en un atributo de texto dado en lugar del atributo `message` por defecto.

Por ejemplo, considera un registro que contiene un atributo `command.line` que debe ser parseado como un par clave-valor. Extrae de `command.line` para analizar su contenido y crear atributos estructurados a partir de los datos del comando.

{{< img src="/logs/processing/parsing/grok_advanced_settings_extract.png" alt="Configuraciones Avanzadas con ejemplo de Extraer del atributo command.line" style="width:80%;">}}

### Uso de reglas auxiliares para reutilizar patrones comunes {#using-helper-rules-to-reuse-common-patterns}

Utiliza el campo de **Reglas Auxiliares** para definir tokens para tus reglas de parseo. Las reglas auxiliares te permiten reutilizar patrones comunes de Grok en tus reglas de análisis. Esto es útil cuando tienes varias reglas en el mismo procesador Grok que utilizan los mismos tokens.

Ejemplo de un registro no estructurado clásico:

```text
john id:12345 connected on 11/08/2017 on server XYZ in production
```

Utiliza la siguiente regla de parseo:

```text
MyParsingRule %{user} %{connection} %{server}
```

Con los siguientes auxiliares:

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
* [Expresiones regulares](#regex)
* [Lista y arrays](#list-to-array)
* [ Formato Glog](#glog-format)
* [XML](#parsing-xml)
* [CSV](#parsing-csv)

### Clave-valor o logfmt {#key-value-or-logfmt}

Este es el filtro central de clave-valor: `keyvalue([separatorStr[, characterAllowList[, quotingStr[, delimiter]]]])` donde:

* `separatorStr`: define el separador entre clave y valores. Por defecto es `=`.
* `characterAllowList`: define caracteres de valor adicionales no escapados además del valor por defecto `\\w.\\-_@`. Se usa solo para valores no entrecomillados (por ejemplo, `key=@valueStr`).
* `quotingStr`: define comillas, reemplazando la detección de comillas por defecto: `<>`, `""`, `''`.
* `delimiter`: define el separador entre los diferentes pares de clave-valor (por ejemplo, `|` es el delimitador en `key1=value1|key2=value2`). Por defecto es ` ` (espacio normal), `,` y `;`.

Usa filtros como **keyvalue** para mapear más fácilmente cadenas a atributos para formatos de clave-valor o logfmt:

**Registro:**

```text
user=john connect_date=11/08/2017 id=123 action=click
```

**Regla:**

```text
rule %{data::keyvalue}
```

No es necesario especificar el nombre de tus parámetros ya que ya están contenidos en el registro.
Si agregas un atributo **extract**`my_attribute` en tu patrón de regla, verás:

```json
{
  "my_attribute": {
    "user": "john",
    "id": 123,
    "action": "click"
  }
}
```

Si `=` no es el separador predeterminado entre tu clave y valores, agrega un parámetro en tu regla de parseo con un separador.

**Registro:**

```text
user: john connect_date: 11/08/2017 id: 123 action: click
```

**Regla:**

```text
rule %{data::keyvalue(": ")}
```

Si los registros contienen caracteres especiales en un valor de atributo, como `/` en una URL, agrégalo a la lista de permitidos en la regla de parseo:

**Registro:**

```text
url=https://app.datadoghq.com/event/stream user=john
```

**Regla:**

```text
rule %{data::keyvalue("=","/:")}
```

Otros ejemplos:

| **Cadena cruda**               | **Regla de parseo**                                      | **Resultado**                            |
|:-----------------------------|:------------------------------------------------------|:--------------------------------------|
| clave=valorStr                 | `%{data::keyvalue}`                                   | {"clave": "valorStr"}                   |
| clave=\<valorStr>              | `%{data::keyvalue}`                                   | {"clave": "valorStr"}                   |
| "clave"="valorStr"             | `%{data::keyvalue}`                                   | {"clave": "valorStr"}                   |
| clave:valorStr                 | `%{data::keyvalue(":")}`                              | {"clave": "valorStr"}                   |
| clave:"/valorStr"              | `%{data::keyvalue(":", "/")}`                         | {"clave": "/valorStr"}                  |
| /clave:/valorStr               | `%{data::keyvalue(":", "/")}`                         | {"/clave": "/valorStr"}                 |
| clave:={valorStr}              | `%{data::keyvalue(":=", "", "{}")}`                   | {"clave": "valorStr"}                   |
| clave1=valor1\|clave2=valor2     | <code>%{data::keyvalue(&quot;=&quot;, &quot;&quot;, &quot;&quot;, &quot;&#124;&quot;)}</code> | {"clave1": "valor1", "clave2": "valor2"}  |
| clave1="valor1"\|clave2="valor2" | <code>%{data::keyvalue(&quot;=&quot;, &quot;&quot;, &quot;&quot;, &quot;&#124;&quot;)}</code> | {"clave1": "valor1", "clave2": "valor2"}  |

**Ejemplo de cadena con múltiples comillas**: Cuando se definen múltiples cadenas entre comillas, el comportamiento predeterminado se reemplaza por un carácter de comillas definido.
La clave-valor siempre coincide con las entradas sin ningún carácter de comillas, independientemente de lo que se especifique en `quotingStr`. Cuando se utilizan caracteres de comillas, se ignora el `characterAllowList` ya que todo lo que está entre los caracteres de comillas se extrae.

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

* Los valores vacíos (`key=`) o los valores `null` (`key=null`) no se muestran en el JSON de salida.
* Si defines un filtro de *keyvalue* en un `data` objeto, y este filtro no coincide, entonces se devuelve un JSON vacío `{}` (por ejemplo, entrada: `key:=valueStr`, regla de parseo: `rule_test %{data::keyvalue("=")}`, salida: `{}`).
* Definir `""` como `quotingStr` mantiene la configuración predeterminada para las comillas.

### Parseo de fechas {#parsing-dates}

El comparador de fechas transforma tu marca de tiempo en el formato EPOCH (unidad de medida **milisegundo**).

| **Cadena cruda**                       | **Regla de parseo**                                          | **Resultado**              |
|:-------------------------------------|:----------------------------------------------------------|:------------------------|
| 14:20:15                             | `%{date("HH:mm:ss"):date}`                                | {"date": 51615000}      |
| 02:20:15 PM                          | `%{date("hh:mm:ss a"):date}`                              | {"date": 51615000}      |
| 11/10/2014                           | `%{date("dd/MM/yyyy"):date}`                              | {"date": 1412978400000} |
| Jue Jun 16 08:29:03 2016             | `%{date("EEE MMM dd HH:mm:ss yyyy"):date}`                | {"date": 1466065743000} |
| Mar Nov 1 08:29:03 2016              | `%{date("EEE MMM d HH:mm:ss yyyy"):date}`                 | {"date": 1466065743000} |
| 06/Mar/2013:01:36:30 +0900           | `%{date("dd/MMM/yyyy:HH:mm:ss Z"):date}`                  | {"date": 1362501390000} |
| 2016-11-29T16:21:36.431+0000         | `%{date("yyyy-MM-dd'T'HH:mm:ss.SSSZ"):date}`              | {"date": 1480436496431} |
| 2016-11-29T16:21:36.431+00:00        | `%{date("yyyy-MM-dd'T'HH:mm:ss.SSSZZ"):date}`             | {"date": 1480436496431} |
| 06/Feb/2009:12:14:14.655             | `%{date("dd/MMM/yyyy:HH:mm:ss.SSS"):date}`                | {"date": 1233922454655} |
| 2007-08-31 19:22:22.427 ADT          | `%{date("yyyy-MM-dd HH:mm:ss.SSS z"):date}`               | {"date": 1188598942427} |
| Jue Jun 16 08:29:03 2016<sup>1</sup> | `%{date("EEE MMM dd HH:mm:ss yyyy","Europe/Paris"):date}` | {"date": 1466058543000} |
| Jue Jun 16 08:29:03 2016<sup>1</sup> | `%{date("EEE MMM dd HH:mm:ss yyyy","UTC+5"):date}`        | {"date": 1466047743000} |
| Jue Jun 16 08:29:03 2016<sup>1</sup> | `%{date("EEE MMM dd HH:mm:ss yyyy","+3"):date}`           | {"date": 1466054943000} |

<sup>1</sup> Utiliza el `timezone` parámetro si realizas tus propias localizaciones y tus marcas de tiempo _no_ están en UTC.
El formato soportado para zonas horarias es:

* `GMT`, `UTC`, `UT` o `Z`
* `+hh:mm`, `-hh:mm`, `+hhmm`, `-hhmm`. El rango máximo soportado es de +18:00 a -18:00 inclusive.
* Zonas horarias que comienzan con `UTC+`, `UTC-`, `GMT+`, `GMT-`, `UT+` o `UT-`. El rango máximo soportado es de +18:00 a -18:00 inclusive.
* IDs de zona horaria extraídos de la base de datos TZ. Para más información, consulte [nombres de la base de datos TZ][2].

**Nota**: El parseo de una fecha **no** establece su valor como la fecha oficial del registro. Para esto, utiliza el [Remapeador de Fecha de Registro][3] en un procesador posterior.

### Patrón alternante {#alternating-pattern}

Si tiene registros con dos formatos posibles que difieren en solo un atributo, establezca una única regla utilizando alternancia con `(<REGEX_1>|<REGEX_2>)`. Esta regla es equivalente a un operador booleano OR.

**Registro**:

```text
john connected on 11/08/2017
12345 connected on 11/08/2017
```

**Regla**:
Tenga en cuenta que "id" es un entero y no una cadena.

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

Utilice el filtro `json` para analizar un objeto JSON anidado después de un prefijo de texto sin procesar:

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
  }
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

### Lista a array {#list-to-array}

Utilice el filtro `array([[openCloseStr, ] separator][, subRuleOrFilter)` para extraer una lista en un array en un solo atributo. El `subRuleOrFilter` es opcional y acepta estos [filtros][4].

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

### Formato Glog {#glog-format}

Los componentes de Kubernetes a veces registran en el formato `glog`; este ejemplo es del elemento Kube Scheduler en la Biblioteca de canalización.

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

### Parseo XML {#parsing-xml}

El analizador XML transforma mensajes en formato XML a JSON.

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
* Las etiquetas repetidas se convierten automáticamente en arrays. Por ejemplo: `<bookstore><book>Harry Potter</book><book>Everyday Italian</book></bookstore>` se convierte en `{ "bookstore": { "book": [ "Harry Potter", "Everyday Italian" ] } }`

### Parseo CSV {#parsing-csv}

Utilice el filtro **CSV** para mapear más fácilmente cadenas a atributos cuando están separadas por un carácter dado (`,` por defecto).

El filtro CSV se define como `csv(headers[, separator[, quotingcharacter]])` donde:

* `headers`: Define los nombres de las claves separados por `,`. Los nombres de las claves deben comenzar con un carácter alfabético y pueden contener cualquier carácter alfanumérico además de `_`.
* `separator`: Define los separadores utilizados para separar los diferentes valores. Solo se acepta un carácter. Predeterminado: `,`. **Nota**: Utilice `tab` para el `separator` para representar el carácter de tabulación para TSVs.
* `quotingcharacter`: Define el carácter de comillas. Solo se acepta un carácter. Predeterminado: `"`

**Nota**:

* Los valores que contienen un carácter separador deben estar entre comillas.
* Los valores entre comillas que contienen un carácter de comillas deben ser escapados con caracteres de comillas. Por ejemplo, `""` dentro de un valor entre comillas representa `"`.
* Si el registro no contiene el mismo número de valores que el número de claves en el encabezado, el analizador CSV emparejará los primeros.
* Los enteros y dobles se convierten automáticamente si es posible.

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

| **Cadena cruda**               | **Regla de parseo**                                                         | **Resultado**                                      |
|:-----------------------------|:-------------------------------------------------------------------------|:------------------------------------------------|
| `John,Doe`                   | `%{data::csv("firstname,name")}`                                         | {"firstname": "John", "name":"Doe"}             |
| `"John ""Da Man""",Doe`      | `%{data::csv("firstname,name")}`                                         | {"firstname": "John \"Da Man\"", "name":"Doe"}  |
| `'John ''Da Man''',Doe`      | `%{data::csv("firstname,name",",","'")}`                                 | {"firstname": "John 'Da Man'", "name":"Doe"}    |
| <code>John&#124;Doe</code>   | <code>%{data::csv(&quot;firstname,name&quot;,&quot;&#124;&quot;)}</code> | {"firstname": "John", "name":"Doe"}             |
| `value1,value2,value3`       | `%{data::csv("key1,key2")}`                                              | {"key1": "value1", "key2":"value2"}             |
| `value1,value2`              | `%{data::csv("key1,key2,key3")}`                                         | {"key1": "value1", "key2":"value2"}             |
| `value1,,value3`             | `%{data::csv("key1,key2,key3")}`                                         | {"key1": "value1", "key3":"value3"}             |
| <code>Value1&nbsp;&nbsp;&nbsp;&nbsp;Value2&nbsp;&nbsp;&nbsp;&nbsp;Value3</code> (TSV)      | `%{data::csv("key1,key2,key3","tab")}` | {"key1": "value1", "key2": "value2", "key3":"value3"} |

### Utilice el comparador de datos para descartar texto innecesario {#use-data-matcher-to-discard-unneeded-text}

Si tiene un registro donde, después de haber parseado lo necesario, y sabiendo que el texto posterior es seguro para descartar, puede usar el comparador de datos para ello. Para el siguiente ejemplo de registro, puede usar el `data` comparador para descartar el `%` al final.

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

Si sus registros contienen caracteres de control ASCII, se serializan al ser ingeridos. Estos pueden ser manejados escapando explícitamente el valor serializado dentro de su analizador grok.

## Lectura adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/google/re2/wiki/Syntax
[2]: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
[3]: /es/logs/log_configuration/processors/log_date_remapper/
[4]: /es/logs/log_configuration/parsing/?tab=filters&tabs=filters#matcher-and-filter