---
aliases:
- /es/service_management/events/pipelines_and_processors/grok_parser/
description: Crea reglas grok personalizadas para analizar el mensaje completo o atributos
  específicos de eventos en bruto en datos estructurados.
title: Analizador Grok
---
## Descripción general {#overview}

Crea reglas grok personalizadas para analizar el mensaje completo o un atributo específico de su evento en bruto. Como mejor práctica, se recomienda utilizar un máximo de 10 reglas de análisis dentro de un procesador grok.


{{< img src="service_management/events/grok-parser.png" alt="Ejemplo de análisis 1" style="width:80%;">}}


Haga clic en **Analizar Mis Eventos** para iniciar un conjunto de tres reglas de análisis para los eventos que fluyen a través de la canalización subyacente. Refine la nomenclatura de los atributos desde allí y agregue nuevas reglas para otros tipos de eventos si es necesario. Esta función requiere que los eventos correspondientes estén siendo indexados y fluyendo realmente; puede desactivar temporalmente o reducir los filtros de exclusión para que esto funcione para usted.

Seleccione una muestra haciendo clic en ella para activar su evaluación contra la regla de análisis y mostrar el resultado en la parte inferior de la pantalla.

Se pueden guardar hasta cinco muestras con el procesador, y cada muestra puede tener hasta 5000 caracteres de longitud. Todas las muestras muestran un estado (coincidencia o no coincidencia), lo que resalta si una de las reglas de parseo del analizador grok coincide con la muestra.


### Sintaxis Grok {#grok-syntax}

El Analizador Grok extrae atributos de mensajes de texto semiestructurados. Grok viene con patrones reutilizables para analizar enteros, direcciones IP, nombres de host y más. Estos valores deben ser enviados al analizador grok como cadenas.

Puede escribir reglas de análisis con la `%{MATCHER:EXTRACT:FILTER}` sintaxis:

* **Coincidente**: Una regla (posiblemente una referencia a otra regla de token) que describe qué esperar (número, palabra, no espacio, etc.).

* **Extraer** (opcional): Un identificador que representa el destino de captura para el fragmento de texto coincidente con el *Coincidente*.

* **Filtrar** (opcional): Un post-procesador de la coincidencia para transformarla.

Ejemplo de un evento clásico no estructurado:

```text
john connected on 11/08/2017
```

Con la siguiente regla de análisis:

```text
MyParsingRule %{word:user} connected on %{date("MM/dd/yyyy"):date}
```

Después de procesar, se genera el siguiente evento estructurado:

{{< img src="logs/processing/processors/_parser.png" alt="Ejemplo de análisis 1" style="width:80%;">}}

**Nota**:

* Si tiene múltiples reglas de análisis en un solo Analizador Grok:
  * Solo una puede coincidir con cualquier evento dado. La primera que coincida, de arriba hacia abajo, es la que realiza el análisis.
  * Cada regla puede hacer referencia a reglas de análisis definidas por encima de sí misma en la lista.
* Debe tener nombres de regla únicos dentro del mismo Analizador Grok.
* El nombre de la regla debe contener solo: caracteres alfanuméricos, `_`, y `.`. Debe comenzar con un carácter alfanumérico.
* Las propiedades con valores nulos o vacíos no se muestran.
* El comparador de regex aplica un `^` implícito, para coincidir con el inicio de una cadena, y un `$`, para coincidir con el final de una cadena.
* Ciertos eventos pueden producir grandes espacios en blanco. Utilice `\n` y `\s+` para tener en cuenta los saltos de línea y los espacios en blanco.

### Comparador y filtro {#matcher-and-filter}

Aquí hay una lista de todos los matchers y filtros implementados nativamente por Datadog:

{{< tabs >}}
{{% tab "Comparadores" %}}

`date("pattern"[, "timezoneId"[, "localeId"]])`
: Coincide con una fecha con el patrón especificado y analiza para producir un timestamp Unix. [Vea los ejemplos del Matcher de fecha](#parsing-dates).

`regex("pattern")`
: Coincide con una expresión regular. [Verifique los ejemplos del Matcher de expresión regular](#regex).

`notSpace`
: Coincide con cualquier cadena hasta el siguiente espacio.

`boolean("truePattern", "falsePattern")`
: Coincide y analiza un booleano, definiendo opcionalmente los patrones de verdadero y falso (por defecto son `true` y `false`, ignorando mayúsculas y minúsculas).

`numberStr`
: Coincide con un número decimal de punto flotante y lo analiza como una cadena.

`number`
: Coincide con un número decimal de punto flotante y lo analiza como un número de doble precisión.

`numberExtStr`
: Coincide con un número de punto flotante (con soporte para notación científica) y lo analiza como una cadena.

`numberExt`
: Coincide con un número de punto flotante (con soporte para notación científica) y lo analiza como un número de doble precisión.

`integerStr`
: Coincide con un número entero y lo analiza como una cadena.

`integer`
: Coincide con un número entero y lo analiza como un número entero.

`integerExtStr`
: Coincide con un número entero (con soporte para notación científica) y lo analiza como una cadena.

`integerExt`
: Coincide con un número entero (con soporte para notación científica) y lo analiza como un número entero.

`word`
: Coincide con caracteres de a-z, A-Z, 0-9, incluyendo el carácter _ (guion bajo).

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
: Coincide con una dirección IP (v4 o v6).

`hostname`
: Coincide con un nombre de host.

`ipOrHost`
: Coincide con un nombre de host o una dirección IP.

`port`
: Coincide con un número de puerto.

`data`
: Coincide con cualquier cadena, incluyendo espacios y saltos de línea. Equivalente a `.*` en regex. Utilícelo cuando ninguno de los patrones anteriores sea apropiado.

{{% /tab %}}
{{% tab "Filtros" %}}

`number`
: Analiza una coincidencia como un número de doble precisión.

`integer`
: Analiza una coincidencia como un número entero.

`boolean`
: Analiza las cadenas 'true' y 'false' como booleanos ignorando mayúsculas y minúsculas.

`nullIf("value")`
: Devuelve nulo si la coincidencia es igual al valor proporcionado.

`json`
: Analiza JSON correctamente formateado.

`rubyhash`
: Analiza un hash de Ruby correctamente formateado como `{name => "John", "job" => {"company" => "Big Company", "title" => "CTO"}}`

`useragent([decodeuricomponent:true/false])`
: Analiza un user-agent y devuelve un objeto JSON que contiene el dispositivo, el sistema operativo y el navegador representado por el Agent. [Consulta el procesador de user-agent][1].

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
: Analiza una secuencia de tokens en una cadena y la devuelve como un arreglo. Consulta el [ejemplo de lista a arreglo](#list-to-array).

`url`
: Analiza una URL y devuelve todos los miembros tokenizados (dominio, parámetros de consulta, puerto, etc.) en un objeto JSON.
{{% /tab %}}
{{< /tabs >}}

## Configuraciones avanzadas {#advanced-settings}

En la parte inferior de sus mosaicos del procesador Grok, hay una sección de **Configuraciones Avanzadas**:

{{< img src="logs/processing/parsing/advanced_settings.png" alt="Configuraciones Avanzadas" style="width:80%;">}}

### Analizando un atributo de texto específico {#parsing-a-specific-text-attribute}

Utilice el campo **Extraer de** para aplicar su procesador Grok a un atributo de texto dado en lugar del atributo predeterminado `message`.

Por ejemplo, considere un evento que contiene un atributo `command.line` que debe ser analizado como un par clave-valor. Podría analizar este evento de la siguiente manera:

{{< img src="logs/processing/parsing/parsing_attribute.png" alt="Análisis de la Línea de Comando" style="width:80%;">}}

### Usando reglas auxiliares para factorizar múltiples reglas de análisis {#using-helper-rules-to-factorize-multiple-parsing-rules}

Utilice el campo **Reglas Auxiliares** para definir tokens para sus reglas de análisis. Las reglas auxiliares le ayudan a factorizar patrones Grok en sus reglas de análisis. Esto es útil cuando tiene varias reglas en el mismo Analizador Grok que utilizan los mismos tokens.

Ejemplo de un evento clásico no estructurado:

```text
john id:12345 connected on 11/08/2017 on server XYZ in production
```

Utilice la siguiente regla de análisis:

```text
MyParsingRule %{user} %{connection} %{server}
```

Con los siguientes auxiliares:

```text
user %{word:user.name} id:%{integer:user.id}
connection connected on %{date("MM/dd/yyyy"):connect_date}
server on server %{notSpace:server.name} in %{notSpace:server.env}
```

{{< img src="logs/processing/parsing/helper_rules.png" alt="reglas auxiliares" style="width:80%;">}}

## Ejemplos {#examples}

Algunos ejemplos que demuestran cómo usar analizadores:

* [Clave valor o logfmt](#key-value-or-logfmt)
* [Parseo de fechas](#parsing-dates)
* [Patrones alternantes](#alternating-pattern)
* [Atributo opcional](#optional-attribute)
* [JSON anidado](#nested-json)
* [Expresión regular](#regex)
* [Listas y arreglos](#list-to-array)
* [ Formato Glog](#glog-format)
* [XML](#parsing-xml)
* [CSV](#parsing-csv)

### Clave-valor o logfmt {#key-value-or-logfmt}

Este es el filtro central de clave-valor: `keyvalue([separatorStr[, characterAllowList[, quotingStr[, delimiter]]]])` donde:

* `separatorStr`: define el separador entre claves y valores. Por defecto es `=`.
* `characterAllowList`: define caracteres adicionales de valor no escapados además del valor por defecto `\\w.\\-_@`. Se utiliza solo para valores no entrecomillados (por ejemplo, `key=@valueStr`).
* `quotingStr`: define comillas, reemplazando la detección de comillas por defecto: `<>`, `""`, `''`.
* `delimiter`: define el separador entre los diferentes pares de clave-valor (por ejemplo, `|` es el delimitador en `key1=value1|key2=value2`). Por defecto es ` ` (espacio normal), `,` y `;`.

Utilice filtros como **clave-valor** para mapear más fácilmente cadenas a atributos para formatos de clave-valor o logfmt:

**Evento:**

```text
user=john connect_date=11/08/2017 id=123 action=click
```

**Regla:**

```text
rule %{data::keyvalue}
```

{{< img src="logs/processing/parsing/parsing_example_2.png" alt="Ejemplo de parseo 2" style="width:80%;">}}

No es necesario especificar el nombre de sus parámetros ya que ya están contenidos en el evento.
Si agrega un **atributo de extracción** `my_attribute` en su patrón de regla, verá:

{{< img src="logs/processing/parsing/parsing_example_2_bis.png" alt="Ejemplo de parseo 2 bis" style="width:80%;">}}

Si `=` no es el separador predeterminado entre su clave y valores, agregue un parámetro en su regla de parseo con un separador.

**Evento:**

```text
user: john connect_date: 11/08/2017 id: 123 action: click
```

**Regla:**

```text
rule %{data::keyvalue(": ")}
```

{{< img src="logs/processing/parsing/key_value_parser.png" alt="Analizador de clave-valor" style="width:80%;" >}}

Si el evento contiene caracteres especiales en un valor de atributo, como `/` en una URL, agréguelo a la lista de permitidos en su regla de parseo:

**Evento:**

```text
url=https://app.datadoghq.com/event/stream user=john
```

**Regla:**

```text
rule %{data::keyvalue("=","/:")}
```

{{< img src="logs/processing/parsing/key_value_allowlist.png" alt="Lista de permitidos de clave-valor" style="width:80%;" >}}

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
| clave1=valor1\|clave2=valor2 | <code>%{data::keyvalue(&quot;=&quot;, &quot;&quot;, &quot;&quot;, &quot;&#124;&quot;)}</code> | {"clave1": "valor1", "clave2": "valor2"} |
| clave1="valor1"\|clave2="valor2" | <code>%{data::keyvalue(&quot;=&quot;, &quot;&quot;, &quot;&quot;, &quot;&#124;&quot;)}</code> | {"clave1": "valor1", "clave2": "valor2"} |

**Ejemplo de cadena de múltiples comillas**: Cuando se definen múltiples cadenas de comillas, el comportamiento predeterminado se reemplaza con un carácter de comillas definido.
La clave-valor siempre coincide con las entradas sin ningún carácter de comillas, independientemente de lo que se especifique en `quotingStr`. Cuando se utilizan caracteres de comillas, se ignora el `characterAllowList` ya que todo lo que está entre los caracteres de comillas se extrae.

**Evento:**

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
* Si define un filtro de *clave-valor* en un `data` objeto, y este filtro no coincide, entonces se devuelve un JSON vacío `{}` (por ejemplo, entrada: `key:=valueStr`, regla de parseo: `rule_test %{data::keyvalue("=")}`, salida: `{}`).
* Definir `""` como `quotingStr` mantiene la configuración predeterminada para las comillas.

### Parseo de fechas {#parsing-dates}

El comparador de fechas transforma su marca de tiempo en el formato EPOCH (unidad de medida **milisegundo**).

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
| Jue 16 de Jun 08:29:03 2016<sup>1</sup> | `%{date("EEE MMM dd HH:mm:ss yyyy","Europe/Paris"):date}` | {"date": 1466058543000} |
| Jue 16 de Jun 08:29:03 2016<sup>1</sup> | `%{date("EEE MMM dd HH:mm:ss yyyy","UTC+5"):date}`        | {"date": 1466047743000} |
| Jue 16 de Jun 08:29:03 2016<sup>1</sup> | `%{date("EEE MMM dd HH:mm:ss yyyy","+3"):date}`           | {"date": 1466054943000} |

<sup>1</sup> Utilice el `timezone` parámetro si realiza sus propias localizaciones y sus marcas de tiempo _no_ están en UTC.
El formato soportado para zonas horarias es:

* `GMT`, `UTC`, `UT` o `Z`
* `+h`, `+hh`, `+hh:mm`, `-hh:mm`, `+hhmm`, `-hhmm`, `+hh:mm:ss`, `-hh:mm:ss`, `+hhmmss` o `-hhmmss` . El rango máximo soportado es de +18:00 a -18:00 inclusive.
* Zonas horarias que comienzan con `UTC+`, `UTC-`, `GMT+`, `GMT-`, `UT+` o `UT-`. El rango máximo soportado es de +18:00 a -18:00 inclusive.
* IDs de zona horaria extraídos de la base de datos TZ. Para más información, consulte [nombres de la base de datos TZ][2].

**Nota**: El parseo de una fecha **no** establece su valor como la fecha oficial del evento. Para esto, utilice el [Remapeador de Fecha de Evento][3] en un Procesador posterior.

### Patrón alternante {#alternating-pattern}

Si tiene eventos con dos formatos posibles que difieren en solo un atributo, establezca una única regla utilizando alternante con `(<REGEX_1>|<REGEX_2>)`. Esta regla es equivalente a un OR booleano.

**Evento**:

```text
john connected on 11/08/2017
12345 connected on 11/08/2017
```

**Regla**:
Tenga en cuenta que "id" es un entero y no una cadena.

```text
MyParsingRule (%{integer:user.id}|%{word:user.firstname}) connected on %{date("MM/dd/yyyy"):connect_date}
```

**Resultados**:

{{< img src="logs/processing/parsing/parsing_example_4.png" alt="Ejemplo de parseo 4" style="width:80%;" >}}

{{< img src="logs/processing/parsing/parsing_example_4_bis.png" alt="Ejemplo de parseo 4 bis" style="width:80%;" >}}

### Atributo opcional {#optional-attribute}

Algunos eventos contienen valores que solo aparecen parte del tiempo. En este caso, haga que la extracción de atributos sea opcional con `()?`.

**Evento**:

```text
john 1234 connected on 11/08/2017
```

**Regla**:

```text
MyParsingRule %{word:user.firstname} (%{integer:user.id} )?connected on %{date("MM/dd/yyyy"):connect_date}
```

**Nota**: Una regla no coincidirá si incluye un espacio después de la primera palabra en la sección opcional.

{{< img src="logs/processing/parsing/parsing_example_5.png" alt="Ejemplo de parseo 5" style="width:80%;" >}}

{{< img src="logs/processing/parsing/parsing_example_5_bis.png" alt="Ejemplo de parseo 5 bis" style="width:80%;" >}}

### JSON anidado {#nested-json}

Utilice el filtro `json` para analizar un objeto JSON anidado después de un prefijo de texto sin procesar:

**Evento**:

```text
Sep 06 09:13:38 vagrant program[123]: server.1 {"method":"GET", "status_code":200, "url":"https://app.datadoghq.com/logs/pipelines", "duration":123456}
```

**Regla**:

```text
parsing_rule %{date("MMM dd HH:mm:ss"):timestamp} %{word:vm} %{word:app}\[%{number:logger.thread_id}\]: %{notSpace:server} %{data::json}
```

{{< img src="logs/processing/parsing/nested_json.png" alt="Ejemplo de parseo de JSON anidado" style="width:80%;" >}}

### Regex {#regex}

**Evento**:

```text
john_1a2b3c4 connected on 11/08/2017
```

**Regla**:

```text
MyParsingRule %{regex("[a-z]*"):user.firstname}_%{regex("[a-zA-Z0-9]*"):user.id} .*
```

{{< img src="logs/processing/parsing/regex_parsing.png" alt="Ejemplo de parseo 6" style="width:80%;" >}}

### Lista a arreglo {#list-to-array}

Utilice el filtro `array([[openCloseStr, ] separator][, subRuleOrFilter)` para extraer una lista en un arreglo en un solo atributo. El `subRuleOrFilter` es opcional y acepta estos [filtros][4].

**Evento**:

```text
Users [John, Oliver, Marc, Tom] have been added to the database
```

**Regla**:

```text
myParsingRule Users %{data:users:array("[]",",")} have been added to the database
```

{{< img src="logs/processing/parsing/array_parsing.png" alt="Ejemplo de parseo 6" style="width:80%;" >}}

**Evento**:

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

Los componentes de Kubernetes a veces registran en el formato `glog`; este ejemplo es del elemento Kube Scheduler en la Biblioteca de Canalización.

Ejemplo de Evento:

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

El analizador XML transforma mensajes formateados en XML a JSON.

**Evento:**

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
* Las etiquetas repetidas se convierten automáticamente en arreglos. Por ejemplo: `<bookstore><book>Harry Potter</book><book>Everyday Italian</book></bookstore>` se convierte en `{ "bookstore": { "book": [ "Harry Potter", "Everyday Italian" ] } }`

### Parseo CSV {#parsing-csv}

Utiliza el filtro **CSV** para mapear más fácilmente cadenas a atributos cuando están separadas por un carácter dado (`,` por defecto).

El filtro CSV se define como `csv(headers[, separator[, quotingcharacter]])` donde:

* `headers`: Define los nombres de las claves separados por `,`. Los nombres de las claves deben comenzar con un carácter alfabético y pueden contener cualquier carácter alfanumérico además de `_`.
* `separator`: Define los separadores utilizados para separar los diferentes valores. Solo se acepta un carácter. Predeterminado: `,`. **Nota**: Utilice `tab` para el `separator` para representar el carácter de tabulación para TSVs.
* `quotingcharacter`: Define el carácter de comillas. Solo se acepta un carácter. Predeterminado: `"`

**Nota**:

* Los valores que contienen un carácter separador deben estar entre comillas.
* Los valores entre comillas que contienen un carácter de comillas deben escaparse con un carácter de comillas. Por ejemplo, `""` dentro de un valor entre comillas representa `"`.
* Si el evento no contiene la misma cantidad de valores que la cantidad de claves en el encabezado, el analizador CSV emparejará los primeros.
* Los enteros y dobles se convierten automáticamente si es posible.

**Evento**:

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

### Utiliza el comparador de datos para descartar texto innecesario {#use-data-matcher-to-discard-unneeded-text}

Si tiene un evento en el que, después de haber parseado lo necesario y saber que el texto posterior es seguro descartar, puede utilizar el comparador de datos para ello. Para el siguiente ejemplo de evento, puede usar el `data` comparador para descartar el `%` al final.

**Evento**:

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

Si sus eventos contienen caracteres de control ASCII, se serializan al ser ingeridos. Estos pueden ser manejados escapando explícitamente el valor serializado dentro de su parser grok.


[1]: https://github.com/google/re2/wiki/Syntax
[2]: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
[3]: /es/events/pipelines_and_processors/date_remapper
[4]: /es/events/pipelines_and_processors/grok_parser/?tab=filters&tabs=filters#matcher-and-filter