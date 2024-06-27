---
kind: Documentación
title: Analizador de Grok
---


Crea reglas de Grok personalizadas para analizar el mensaje completo o un atributo específico de tu evento sin formato. Como práctica recomendada, se sugiere utilizar un máximo de 10 reglas de parseo en un procesador de Grok.


{{< img src="service_management/events/grok-parser.png" alt="Ejemplo de parseo 1" style="width:80%;">}}


Haz clic en **Parse My Events** (Analizar mis eventos) a fin de iniciar un conjunto de tres reglas de parseo para los eventos que fluyen a través del pipeline subyacente. Refina la denominación de atributos allí y añade reglas nuevas para otro tipo de eventos si es necesario. Esta característica requiere que los eventos correspondientes se indexen y realmente fluyan. Puedes desactivar o reducir de manera temporal los filtros de exclusión para que funcione.

Selecciona una muestra al hacer clic sobre ella para activar su evaluación con respecto a la regla de parseo y mostrar el resultado en la parte inferior de la pantalla.

Se pueden guardar hasta cinco muestras con el procesador, y cada muestra puede tener hasta 5000 caracteres de longitud. Todas las muestras presentan un estado (coincide o no coincide), que resalta si una de las reglas de parseo del analizador de Grok coincide con la muestra.


### Sintaxis de Grok

El analizador de Grok extrae atributos de mensajes de texto semiestructurados. Grok cuenta con patrones reutilizables para analizar enteros, direcciones IP, nombres de host y más. Estos valores se deben enviar al analizador de Grok como cadenas.

Puedes escribir reglas de parseo con la sintaxis `%{MATCHER:EXTRACT:FILTER}`:

* **Matcher** (Comparador): una regla (posiblemente una referencia a otra regla de token) que describe qué esperar (número, palabra, notSpace, etc.).

* **Extract** (Extracto, es opcional): identificador que representa el destino de captura del fragmento de texto coincidente con el *Matcher* (Comparador).

* **Filter** (Filtro, es opcional): un posprocesador de la coincidencia para transformarla.

Ejemplo de un evento clásico no estructurado:

```text
john connected on 11/08/2017
```

Con la siguiente regla de parseo:

```text
MyParsingRule %{word:user} connected on %{date("MM/dd/yyyy"):date}
```

Después del procesamiento, se genera el siguiente evento estructurado:

{{< img src="logs/processing/processors/_parser.png" alt="Ejemplo de parseo 1" style="width:80%;">}}

**Nota**:

* Si tienes varias reglas de parseo en un único analizador de Grok:
  * Solo una puede coincidir con cualquier evento. La primera que coincida, de arriba abajo, es la que realiza el parseo.
  * Cada regla puede hacer referencia a reglas de parseo definidas por encima de esta misma en la lista.
* Debes tener nombres de regla únicos dentro del mismo analizador de Grok.
* El nombre de la regla solo debe contener: caracteres alfanuméricos, `_` y `.`. Debe comenzar con un carácter alfanumérico.
* Las propiedades con valores nulos o vacíos no se muestran.
* El comparador de expresiones regulares aplica un `^` implícito, para hacer coincidir el inicio de una cadena, y un `$`, para el final.
* Algunos eventos pueden producir grandes espacios en blanco. Utiliza `\n` y `\s+` para tener en cuenta las líneas nuevas y los espacios en blanco.

### Comparador y filtro

En esta lista encontrarás todos los comparadores y filtros implementados de forma nativa por Datadog:

{{< tabs >}}
{{% tab "Comparadores" %}}

`date("pattern"[, "timezoneId"[, "localeId"]])` 
: Compara una fecha con el patrón especificado y la analiza para producir una marca de tiempo de Unix. [Consulta los ejemplos del comparador de fechas](#parsing-dates).

`regex("pattern")`
: Compara una expresión regular. [Verifica los ejemplos del comparador de expresiones regulares](#regex).

`notSpace`
: Compara cualquier cadena hasta el siguiente espacio.

`boolean("truePattern", "falsePattern")`
: Compara un booleano y lo analiza, definiendo de manera opcional los patrones true y false (por defecto `true` y `false`, ignorando mayúsculas y minúsculas).

`numberStr`
: Compara un número decimal de coma flotante y lo analiza como una cadena.

`number`
: Compara un número decimal de coma flotante y lo analiza como un número de doble precisión.

`numberExtStr`
: Compara un número de coma flotante (con soporte de notación científica) y lo analiza como una cadena.

`numberExt`
: Compara un número de coma flotante (con soporte de notación científica) y lo analiza como un número de doble precisión.

`integerStr`
: Compara un número entero y lo analiza como una cadena.

`integer`
: Compara un número entero y lo analiza como un número entero.

`integerExtStr`
: Compara un número entero (con soporte de notación científica) y lo analiza como una cadena.

`integerExt`
: Compara un número entero (con soporte de notación científica) y lo analiza como un número entero.

`word`
: Compara caracteres de a-z, A-Z, 0-9, incluido el carácter _ (guion bajo).

`doubleQuotedString`
: Compara una cadena entre comillas dobles.

`singleQuotedString`
: Compara una cadena entre comillas simples.

`quotedString`
: Compara una cadena entre comillas dobles o simples.

`uuid`
: Compara un UUID.

`mac`
: Compara una dirección MAC.

`ipv4`
: Compara un IPV4.

`ipv6`
: Compara un IPV6.

`ip`
: Compara un IP (v4 o v6).

`hostname`
: Compara un nombre de host.

`ipOrHost`
: Compara un nombre de host o IP.

`port`
: Compara un número de puerto.

`data`
: Compara cualquier cadena, incluidos espacios y líneas nuevas. Equivale a `.*` en la expresión regular. Utilízalo cuando ninguno de los patrones anteriores sea apropiado.

{{% /tab %}}
{{% tab "Filtros" %}}

`number`
: Analiza una coincidencia como un número de doble precisión.

`integer`
: Analiza una coincidencia como un número entero.

`boolean`
: Analiza cadenas 'true' y 'false' como booleanos ignorando mayúsculas y minúsculas.

`nullIf("value")`
: Devuelve un valor nulo si la coincidencia es igual al valor proporcionado.

`json`
: Analiza un JSON con el formato adecuado.

`rubyhash`
: Analiza un hash de Ruby con el formato adecuado, como por ejemplo `{name => "John", "job" => {"company" => "Big Company", "title" => "CTO"}}`

`useragent([decodeuricomponent:true/false])`
: Analiza un Agent de usuario y devuelve un objeto JSON que contiene el dispositivo, el sistema operativo y el navegador representado por el Agent. [Verifica el procesador de Agents de usuario][1].

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
: Analiza XML con formato adecuado. Consulta los [ejemplos de filtros de XML](#parsing-xml).

`csv(headers[, separator[, quotingcharacter]])`
: Analiza líneas CSV o TSV con formato adecuado. Consulta los [ejemplos de filtros de CSV](#parsing-csv).

`scale(factor)`
: Multiplica el valor numérico esperado por el factor proporcionado.

`array([[openCloseStr, ] separator][, subRuleOrFilter)`
: Analiza una secuencia de cadena de tokens y la devuelve como una matriz. Consulta el ejemplo de [lista a matriz](#list-to-array).

`url`
: Analiza una URL y devuelve todos los miembros tokenizados (dominio, parámetros de consulta, puerto, etc.) en un objeto JSON. 
{{% /tab %}}
{{< /tabs >}}

## Configuración avanzada

En la parte inferior de los cuadros de tu procesador de Grok, se encuentra la sección **Advanced Settings** (Configuración avanzada):

{{< img src="logs/processing/parsing/advanced_settings.png" alt="Configuración avanzada" style="width:80%;">}}

### Parseo de un atributo de texto específico

Utiliza el campo **Extract from** (Extraer de) para aplicar tu procesador de Grok en un atributo de texto determinado en lugar del atributo `message` predeterminado.

Por ejemplo, considera un evento que contiene un atributo `command.line` que se debe analizar como una clave-valor. Podrías analizar este evento de la siguiente manera:

{{< img src="logs/processing/parsing/parsing_attribute.png" alt="`Parseo de una línea de comando" style="width:80%;">}}

### Uso de las reglas de ayuda para factorizar varias reglas de parseo

Utiliza el campo **Helper Rules** (Reglas de ayuda) a fin de definir tokens para tus reglas de parseo. Las reglas de ayuda te permiten factorizar patrones de Grok en las reglas de parseo. Esto es útil cuando tienes varias reglas en el mismo analizador de Grok que utilizan los mismos tokens.

Ejemplo de un evento clásico no estructurado:

```text
john id:12345 connected on 11/08/2017 on server XYZ in production
```

Utiliza la siguiente regla de parseo:

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
* [Parseo de fechas](#parsing-dates)
* [Patrones alternados](#alternating-pattern)
* [Atributo opcional](#optional-attribute)
* [JSON anidado](#nested-json)
* [Expresión regular](#regex)
* [Lista y matrices](#list-to-array)
* [Formato Glog](#glog-format)
* [XML](#parsing-xml)
* [CSV](#parsing-csv)

### Clave-valor o logfmt

Este es el filtro principal de clave-valor: `keyvalue([separatorStr[, characterAllowList[, quotingStr[, delimiter]]]])` donde:

* `separatorStr`: define el separador entre la clave y los valores. Por defecto es `=`.
* `characterAllowList`: define caracteres de valor de no escape adicionales a los `\\w.\\-_@` predeterminados. Solo se utiliza para valores que no están entre comillas (por ejemplo, `key=@valueStr`).
* `quotingStr`: define las comillas y sustituye la detección de comillas predeterminada: `<>`, `""`, `''`.
* `delimiter`: define el separador entre los distintos pares clave-valor (por ejemplo, `|` es el delimitador en `key1=value1|key2=value2`). Por defecto es ` ` (normal space), `,` and `;`.

Utiliza filtros como **keyvalue** a fin de asignar con mayor facilidad cadenas a atributos para formatos keyvalue o logfmt:

**Evento:**

```text
user=john connect_date=11/08/2017 id=123 action=click
```

**Regla:**

```text
rule %{data::keyvalue}
```

{{< img src="logs/processing/parsing/parsing_example_2.png" alt="Ejemplo de parseo 2" style="width:80%;">}}

No es necesario que especifiques el nombre de tus parámetros, puesto que ya se encuentran en el evento.
Si añades un atributo de **extracción** `my_attribute` en tu patrón de reglas verás:

{{< img src="logs/processing/parsing/parsing_example_2_bis.png" alt="Ejemplo de parseo 2 bis" style="width:80%;">}}

Si `=` no es el separador predeterminado entre la clave y los valores, añade un parámetro en la regla de parseo con un separador.

**Evento:**

```text
user: john connect_date: 11/08/2017 id: 123 action: click
```

**Regla:**

```text
rule %{data::keyvalue(": ")}
```

{{< img src="logs/processing/parsing/key_value_parser.png" alt="Analizador de clave-valor" style="width:80%;" >}}

Si el evento contiene caracteres especiales en un valor de atributo, como `/` en una URL por ejemplo, añádelo a la lista de permitidos en la regla de parseo:

**Evento:**

```text
url=https://app.datadoghq.com/event/stream user=john
```

**Regla:**

```text
rule %{data::keyvalue("=","/:")}
```

{{< img src="logs/procesar/parseo/key_value_allowlist.png" alt="Lista de permitidos de clave-valor" style="width:80%;" >}}

Otros ejemplos:

| **Cadena sin formato**               | **Regla de parseo**                                      | **Resultado**                            |
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

**Ejemplo de varias cadenas de comillas**: cuando se definen varias cadenas de comillas, el comportamiento predeterminado se reemplaza con un carácter de comillas definido.
La clave-valor siempre coincide con las entradas sin comillas, independientemente de lo que se especifique en `quotingStr`. Cuando se utilizan caracteres de comillas, se ignora `characterAllowList` ya que se extrae todo lo que se encuentra entre los caracteres de comillas.

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
* Si defines un filtro *keyvalue* en un objeto `data`, y este filtro no coincide, se devuelve un JSON `{}` vacío (por ejemplo, entrada: `key:=valueStr`, regla de parseo: `rule_test %{data::keyvalue("=")}`, salida: `{}`).
* Definir `""` como `quotingStr` mantiene la configuración predeterminada para las citas.

### Parseo de fechas

El comparador de fechas transforma tu marca de tiempo en el formato EPOCH (unidad de medida en **milisegundos**).

| **Cadena sin formato**                       | **Regla de parseo**                                          | **Resultado**              |
|:-------------------------------------|:----------------------------------------------------------|:------------------------|
| 14:20:15                             | `%{date("HH:mm:ss"):date}`                                | {"date": 51615000}      |
| 02:20:15 PM                          | `%{date("hh:mm:ss a"):date}`                              | {"date": 51615000}      |
| 11/10/2014                           | `%{date("dd/MM/yyyy"):date}`                              | {"date": 1412978400000} |
| Thu Jun 16 08:29:03 2016             | `%{date("EEE MMM dd HH:mm:ss yyyy"):date}`                | {"date": 1466065743000} |
| Tue Nov 1 08:29:03 2016              | `%{date("EEE MMM d HH:mm:ss yyyy"):date}`                 | {"date": 1466065743000} |
| 06/Mar/2013:01:36:30 +0900           | `%{date("dd/MMM/yyyy:HH:mm:ss Z"):date}`                  | {"date": 1362501390000} |
| 2016-11-29T16:21:36.431+0000         | `%{date("yyyy-MM-dd'T'HH:mm:ss.SSSZ"):date}`              | {"date": 1480436496431} |
| 2016-11-29T16:21:36.431+00:00        | `%{date("yyyy-MM-dd'T'HH:mm:ss.SSSZZ"):date}`             | {"date": 1480436496431} |
| 06/Feb/2009:12:14:14.655             | `%{date("dd/MMM/yyyy:HH:mm:ss.SSS"):date}`                | {"date": 1233922454655} |
| 2007-08-31 19:22:22.427 ADT          | `%{date("yyyy-MM-dd HH:mm:ss.SSS z"):date}`               | {"date": 1188598942427} |
| Thu Jun 16 08:29:03 2016<sup>1</sup> | `%{date("EEE MMM dd HH:mm:ss yyyy","Europe/Paris"):date}` | {"date": 1466058543000} |
| Thu Jun 16 08:29:03 2016<sup>1</sup> | `%{date("EEE MMM dd HH:mm:ss yyyy","UTC+5"):date}`        | {"date": 1466047743000} |
| Thu Jun 16 08:29:03 2016<sup>1</sup> | `%{date("EEE MMM dd HH:mm:ss yyyy","+3"):date}`           | {"date": 1466054943000} |

<sup>1</sup> Utiliza el parámetro `timezone` si realizas tus propias localizaciones y tus marcas de tiempo _no_ están en UTC.
Los formatos compatibles para las zonas horarias son:

* `GMT`, `UTC`, `UT` o `Z`
* `+h`, `+hh`, `+hh:mm`, `-hh:mm`, `+hhmm`, `-hhmm`, `+hh:mm:ss`, `-hh:mm:ss`, `+hhmmss` o `-hhmmss` . El rango máximo admitido es de +18:00 a -18:00 inclusive.
* Zonas horarias que comienzan por `UTC+`, `UTC-`, `GMT+`, `GMT-`, `UT+` o `UT-`. El rango máximo admitido es de +18:00 a -18:00 inclusive.
* Los ID de zona horaria extraídos de la base de datos TZ. Para obtener más información, consulta los [Nombres de bases de datos TZ][2].

**Nota**: Analizar una fecha **no** establece su valor como la fecha oficial del evento. Para ello utiliza el [reasignador de fechas de eventos][3] en un procesador posterior.

### Patrón alternado

Si tienes eventos con dos formatos posibles que solo difieren en un atributo, establece una única regla alternando con `(<REGEX_1>|<REGEX_2>)`. Esta regla equivale a un OR booleano.

**Evento**:

```text
john connected on 11/08/2017
12345 connected on 11/08/2017
```

**Regla**:
ten en cuenta que «id» es un número entero y no una cadena.

```text
MyParsingRule (%{integer:user.id}|%{word:user.firstname}) connected on %{date("MM/dd/yyyy"):connect_date}
```

**Resultados**:

{{< img src="logs/processing/parsing/parsing_example_4.png" alt="Ejemplo de parseo 4" style="width:80%;" >}}

{{< img src="logs/processing/parsing/parsing_example_4_bis.png" alt="Ejemplo de parseo 4 bis" style="width:80%;" >}}

### Atributo opcional

Algunos eventos contienen valores que solo aparecen una parte del tiempo. En este caso, haz que la extracción de atributos sea opcional con `()?`.

**Evento**:

```text
john 1234 connected on 11/08/2017
```

**Regla**:

```text
MyParsingRule %{word:user.firstname} (%{integer:user.id} )?connected on %{date("MM/dd/yyyy"):connect_date}
```

**Nota**: Una regla no coincidirá si incluyes un espacio después de la primera palabra en la sección opcional.

{{< img src="logs/processing/parsing/parsing_example_5.png" alt="Ejemplo de parseo 5" style="width:80%;" >}}

{{< img src="logs/processing/parsing/parsing_example_5_bis.png" alt="Ejemplo de parseo 5 bis" style="width:80%;" >}}

### JSON anidado

Utiliza el filtro `json` para analizar un objeto JSON anidado tras un prefijo de texto sin formato:

**Evento**:

```text
Sep 06 09:13:38 vagrant program[123]: server.1 {"method":"GET", "status_code":200, "url":"https://app.datadoghq.com/logs/pipelines", "duration":123456}
```

**Regla**:

```text
parsing_rule %{date("MMM dd HH:mm:ss"):timestamp} %{word:vm} %{word:app}\[%{number:logger.thread_id}\]: %{notSpace:server} %{data::json}
```

{{< img src="logs/processing/parsing/nested_json.png" alt="Ejemplo de parseo de un JSON anidado" style="width:80%;" >}}

### Expresión regular

**Evento**:

```text
john_1a2b3c4 connected on 11/08/2017
```

**Regla**:

```text
MyParsingRule %{regex("[a-z]*"):user.firstname}_%{regex("[a-zA-Z0-9]*"):user.id} .*
```

{{< img src="logs/processing/parsing/regex_parsing.png" alt="Ejemplo de parseo 6" style="width:80%;" >}}

### Lista a matriz

Utiliza el filtro `array([[openCloseStr, ] separator][, subRuleOrFilter)` para extraer un lista en una matriz en un solo atributo. El `subRuleOrFilter` es opcional y acepta estos [filtros][4].

**Evento**:

```text
Users [John, Oliver, Marc, Tom] have been added to the database
```

**Regla**:

```text
myParsingRule Users %{data:users:array("[]",",")} have been added to the database
```

{{< img src="logs/processing/parsing/array_parsing.png" alt="Ejemplo de parseo 6" style="width:80%;" >}}

**Evento**:

```text
Users {John-Oliver-Marc-Tom} have been added to the database
```

**Regla**:

```text
myParsingRule Users %{data:users:array("{}","-")} have been added to the database
```

**Regla que utiliza `subRuleOrFilter`**:

```text
myParsingRule Users %{data:users:array("{}","-", uppercase)} have been added to the database
```

### Formato Glog

A veces los componentes de Kubernetes se registran en el formato `glog`; este ejemplo es del elemento del programador de Kubernetes en la biblioteca de pipelines.

Evento de ejemplo:

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

### Parseo de XML

El analizador de XML transforma los mensajes con formato XML en JSON.

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

* Si el XML contiene etiquetas que tienen un atributo y un valor de cadena entre las dos etiquetas, se genera un atributo `value`. Por ejemplo: `<title lang="en">Harry Potter</title>` se convierte en `{"title": {"lang": "en", "value": "Harry Potter" } }`
* Las etiquetas repetidas se convierten de manera automática en matrices. Por ejemplo: `<bookstore><book>Harry Potter</book><book>Everyday Italian</book></bookstore>` se convierte en `{ "bookstore": { "book": [ "Harry Potter", "Everyday Italian" ] } }`

### Parseo de CSV

Utiliza el filtro **CSV** para asignar cadenas a atributos con mayor facilidad cuando estén separadas por un carácter determinado (`,` por defecto).

El filtro CSV se define como `csv(headers[, separator[, quotingcharacter]])` donde:

* `headers`: define el nombre de las claves separadas por `,`. Los nombres de las claves deben empezar por un carácter alfabético y pueden contener cualquier carácter alfanumérico además de `_`.
* `separator`: define los separadores que se utilizan para separar los distintos valores. Solo se acepta un carácter. Por defecto: `,`. **Nota**: Utiliza `tab` a fin de que el `separator` represente el carácter de tabulación para los TSV.
* `quotingcharacter`: define el carácter de comillas. Solo se acepta un carácter. Por defecto: `"`

**Nota**:

* Los valores que contienen un carácter separador se deben colocar entre comillas.
* Los valores entre comillas que contienen un carácter de comillas deben tener caracteres de escape entre comillas. Por ejemplo, `""` dentro de un valor entre comillas representa `"`.
* Si el evento no contiene el mismo número de valores que el número de claves del encabezado, el analizador de CSV coincidirá con los primeros.
* Los números enteros y dobles se convierten de manera automática, si es posible.

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

| **Cadena sin formato**               | **Regla de parseo**                                                         | **Resultado**                                      |
|:-----------------------------|:-------------------------------------------------------------------------|:------------------------------------------------|
| `John,Doe`                   | `%{data::csv("firstname,name")}`                                         | {"firstname": "John", "name":"Doe"}             |
| `"John ""Da Man""",Doe`      | `%{data::csv("firstname,name")}`                                         | {"firstname": "John \"Da Man\"", "name":"Doe"}  |
| `'John ''Da Man''',Doe`      | `%{data::csv("firstname,name",",","'")}`                                 | {"firstname": "John 'Da Man'", "name":"Doe"}    |
| <code>John&#124;Doe</code>   | <code>%{data::csv(&quot;firstname,name&quot;,&quot;&#124;&quot;)}</code> | {"firstname": "John", "name":"Doe"}             |
| `value1,value2,value3`       | `%{data::csv("key1,key2")}`                                              | {"key1": "value1", "key2":"value2"}             |
| `value1,value2`              | `%{data::csv("key1,key2,key3")}`                                         | {"key1": "value1", "key2":"value2"}             |
| `value1,,value3`             | `%{data::csv("key1,key2,key3")}`                                         | {"key1": "value1", "key3":"value3"}             |
| <code>Value1&nbsp;&nbsp;&nbsp;&nbsp;Value2&nbsp;&nbsp;&nbsp;&nbsp;Value3</code> (TSV)      | `%{data::csv("key1,key2,key3","tab")}` | {"key1": "value1", "key2": "value2", "key3":"value3"} |

### Utilizar el comparador de datos para descartar el texto innecesario

Si tienes un evento en el que después de haber analizado lo que se necesita sabes que es seguro descartar el texto posterior a ese punto, puedes utilizar el comparador de datos para hacerlo. Para el siguiente ejemplo de evento, puedes utilizar el comparador de `data` a fin de descartar el `%` al final.

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

### Caracteres de control ASCII

Si tus eventos contienen caracteres de control ASCII, se serializarán al ingerirlos. Estos se pueden gestionar escapando de manera explícita del valor serializado dentro de tu analizador de Grok.


[1]: https://github.com/google/re2/wiki/Syntax
[2]: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
[3]: /es/service_management/events/pipelines_and_processors/date_remapper
[4]: /es/service_management/events/pipelines_and_processors/grok_parser/?tab=filters&tabs=filters#matcher-and-filter