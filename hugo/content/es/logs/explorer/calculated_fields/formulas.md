---
aliases:
- /es/logs/explorer/calculated_fields/expression_language
disable_toc: false
further_reading:
- link: /logs/explorer/calculated_fields/
  tag: Documentación
  text: Campos calculados
title: Fórmulas
---
## Descripción general {#overview}

La fórmula (o expresión) define el valor del campo calculado para cada evento de registro. Puede hacer referencia a atributos de registro, otros campos calculados y funciones y operadores compatibles. A medida que escribe o edita una fórmula, el editor sugiere automáticamente campos, funciones y operadores relevantes.

## Sintaxis básica y construcciones de lenguaje {#basic-syntax-and-language-constructs}

| Construcción                                                                 | Sintaxis y notación                                                                                                                  |
| --------------------------------------------------------------------------| ------------------------------------------------------------------------------------------------------------------------------------ |
| Atributo o etiqueta reservada con nombre `tag`                                     | `tag` (no se requiere prefijo)<br>Para etiquetas que contienen guiones, escápelos con una barra invertida.<br>Ejemplo: `ci\-job\-id`                    |
| Atributo con nombre `attr`                                                    | `@attr` (use un prefijo `@`)                                                                                                          |
| Campo calculado con nombre `field`                                            | `#field` (use un prefijo `#`)                                                                                                          |
| Literal de cadena (comillas)<br>Por ejemplo, `text` o `Quoted "text"`.         | `"text"`<br> `"Quoted \"text\""`<br>(se aplica <a href="https://docs.datadoghq.com/logs/explorer/search_syntax/">Sintaxis de búsqueda de registros</a>)|
| Literal numérico (número)<br>Por ejemplo, `ten`.                           | `10`                                                                                                                                 |
| Función con nombre `func` con parámetros `x` y `y`                         | `func(x, y)`                                                                                                                         |
| Operador<br>Por ejemplo, un operador binario `*` con operandos `x` y `y`. | `x*y`                                                                                                                                |

## Operadores {#operators}

Los operadores disponibles en orden de precedencia:

| Operador | Descripción |
|----------|-------------|
| `()` | Una agrupación o llamada a función |
| `!`, `NOT`, `-` | Una negación lógica o aritmética |
| `^`, `%` | Exponenciación, módulo|
| `*`, `/` | Multiplicación, división|
| `+`, `-` | Suma, resta |
| `<`, `<=`, `>`, `>=` | Menor que, menor o igual que, mayor que, mayor o igual que |
| `==`, `!=` | Coincide, no coincide |
| `&&`, `AND` | AND lógico |
| `\|\|`, `OR` | OR lógico |

## Funciones {#functions}

Las funciones disponibles se clasifican de la siguiente manera:
- [Aritmética](#arithmetic)
- [Cadena](#string)
- [Lógico](#logical)


### Aritmética {#arithmetic}

<h4>abs(<i>num</i> value)</h4>

Devuelve el valor absoluto de un número.

{{% collapse-content title="Ejemplo" level="h5" expanded=false %}}

| Ejemplo  | Fórmula | Resultado |
|----------|-------------|---------|
| Un evento de registro tiene los siguientes atributos: <br> - `@client_latency` = 2 <br> - `@server_latency` = 3 | `#discrepancy = abs(@client_latency - @server_latency)` | `#discrepancy` = 1 |

{{% /collapse-content %}}


<h4>ceil(<i>num</i> value)</h4>

Redondea el número hacia arriba al entero más cercano.

{{% collapse-content title="Ejemplo" level="h5" expanded=false %}}

| Ejemplo  | Fórmula | Resultado |
|----------|-------------|---------|
| Un evento de registro tiene el siguiente atributo:<br>`@value` = 2.2 | `#rounded_up = ceil(@value)` | `#rounded_up` = 3 |

{{% /collapse-content %}}


<h4>floor(<i>num</i> value)</h4>

Redondea el número hacia abajo al entero más cercano.

{{% collapse-content title="Ejemplo" level="h5" expanded=false %}}

| Ejemplo  | Fórmula | Resultado |
|----------|-------------|---------|
| Un evento de registro tiene el siguiente atributo:<br>`@value` = 9.99 | `#rounded_down = floor(@value)` | `#rounded_down` = 9 |

{{% /collapse-content %}}


<h4>max(<i>num</i> value, [ <i>num</i> value, …])</h4>

Encuentra el valor máximo entre un conjunto de números.

{{% collapse-content title="Ejemplo" level="h5" expanded=false %}}

| Ejemplo  | Fórmula | Resultado |
|----------|-------------|---------|
| Un evento de registro tiene el siguiente atributo:<br>`@CPU_temperatures` = [-1, 1, 5, 5] | `#highest_temp = max(@CPU_temperatures)` | `#highest_temp` = 5 |

{{% /collapse-content %}}


<h4>min(<i>num</i> value, [<i>num</i> value, …])</h4>

Encuentra el valor mínimo entre un conjunto de números.

{{% collapse-content title="Ejemplo" level="h5" expanded=false %}}

| Ejemplo  | Fórmula | Resultado |
|----------|-------------|---------|
| Un evento de registro tiene el siguiente atributo:<br>`@CPU_temperatures` = [-1, 1, 5, 5] | `#lowest_temp = min(@CPU_temperatures)` | `#lowest_temp` = -1 |

{{% /collapse-content %}}


<h4>round(<i>num</i> value, <i>int</i> precision)</h4>

Redondea un número. Opcionalmente, defina cuántos decimales mantener.

{{% collapse-content title="Ejemplo" level="h5" expanded=false %}}

| Ejemplo  | Fórmula | Resultado |
|----------|-------------|---------|
| Un evento de registro tiene el siguiente atributo:<br>`@value` = -1234.01 | `#rounded_to_tens = round(@value, -1)` | `#rounded_to_tens` = -1230 |

{{% /collapse-content %}}

---

### Cadena {#string}

<h4>concat(<i>str</i> cadena [<i>str</i> cadena, <i>expr</i> valor, …])</h4>

Combina varios valores en una sola cadena.

{{% collapse-content title="Ejemplo" level="h5" expanded=false %}}

| Ejemplo  | Fórmula | Resultado |
|----------|-------------|---------|
| Un evento de registro tiene los siguientes atributos: <br> - `@city` = "Paris" <br> - `@country` = "France" | `#region = concat(@city, ", ", @country)` | `#region` = "Paris, France" |

{{% /collapse-content %}}


<h4>lower(<i>str</i> cadena)</h4>

Convierte la cadena a minúsculas.

{{% collapse-content title="Ejemplo" level="h5" expanded=false %}}

| Ejemplo  | Fórmula | Resultado |
|----------|-------------|---------|
| Un evento de registro tiene el siguiente atributo:<br>`@first_name` = "Bob" | `#lower_name = lower(@first_name)` | `#lower_name` = "bob" |

{{% /collapse-content %}}


<h4>left(<i>str</i> cadena, <i>int</i> num_caracteres)</h4>

Extrae una porción de texto desde el principio de una cadena.

{{% collapse-content title="Ejemplo" level="h5" expanded=false %}}

| Ejemplo  | Fórmula | Resultado |
|----------|-------------|---------|
| Un evento de registro tiene el siguiente atributo:<br>`@price` = \"USD10.50\" | `#currency = left(@price, 3)` | `#currency` = \"USD\" |

{{% /collapse-content %}}


<h4>proper(<i>str</i> cadena)</h4>

Convierte la cadena a formato de mayúsculas y minúsculas.

{{% collapse-content title="Ejemplo" level="h5" expanded=false %}}

| Ejemplo  | Fórmula | Resultado |
|----------|-------------|---------|
| Un evento de registro tiene el siguiente atributo:<br>`@address` = \"123 main st\" | `#formatted_address = proper(@address)` | `#formatted_address` = \"123 Main St\" |

{{% /collapse-content %}}


<h4>split_before(<i>str</i> cadena, <i>str</i> separador, <i>int</i> ocurrencia)</h4>

Extrae la parte del texto que precede a un patrón determinado en una cadena.

{{% collapse-content title="Ejemplo" level="h5" expanded=false %}}

<table>
  <tr>
    <th>Ejemplo</th>
    <th>Fórmula</th>
    <th>Resultado</th>
  </tr>
  <tr>
    <td rowspan ="2">Un evento de registro tiene el siguiente atributo:<br><code>@url</code> = "www.example.com/path/to/split"</td>
    <td><code>#url_extraction = split_before(@url, "/", 1)</code></td>
    <td><code>#url_extraction</code> = "www.example.com/path"</td>
  </tr>
  <tr>
    <td><code>#url_extraction = split_before(@url, "/", 2)</code></td>
    <td><code>#url_extraction</code> = "www.example.com/path/to"</td>
  </tr>
</table>

{{% /collapse-content %}}


<h4>split_after(<i>str</i> cadena, <i>str</i> separador, <i>int</i> ocurrencia)</h4>

Extrae la porción de texto que sigue a un patrón determinado en una cadena.

{{% collapse-content title="Ejemplo" level="h5" expanded=false %}}

<table>
  <tr>
    <th>Ejemplo</th>
    <th>Fórmula</th>
    <th>Resultado</th>
  </tr>
  <tr>
    <td rowspan ="2">Un evento de registro tiene el siguiente atributo:<br><code>@url</code> = "www.example.com/path/to/split"</td>
    <td><code>#url_extraction = split_after(@url, "/", 0)</code></td>
    <td><code>#url_extraction</code> = "path/to/split"</td>
  </tr>
  <tr>
    <td><code>#url_extraction = split_after(@url, "/", 1)</code></td>
    <td><code>#url_extraction</code> = "to/split"
</table>

{{% /collapse-content %}}


<h4>substring(<i>str</i> cadena, <i>int</i> inicio, <i>int</i> longitud)</h4>

Extrae una porción de texto desde el medio de una cadena.

{{% collapse-content title="Ejemplo" level="h5" expanded=false %}}

| Ejemplo  | Fórmula | Resultado |
|----------|-------------|---------|
| Un evento de registro tiene el siguiente atributo:<br>`@price` = "USD10.50" | `#dollar_value = substring(@price, 2, 2)` | `#dollar_value` = "10" |

{{% /collapse-content %}}


<h4>right(<i>str</i> cadena, <i>int</i> num_caracteres)</h4>

Extrae una porción de texto del final de una cadena.

{{% collapse-content title="Ejemplo" level="h5" expanded=false %}}

| Ejemplo  | Fórmula | Resultado |
|----------|-------------|---------|
| Un evento de registro tiene el siguiente atributo:<br>`@price` = "USD10.50" | `#cent_value = right(@price, 2)` | `#cent_value` = "50" |

{{% /collapse-content %}}


<h4>textjoin(<i>str</i> delimitador, <i>bool</i> ignorar_vacíos, <i>str</i> cadena [<i>str</i> cadena, <i>expr</i> valor, …])</h4>

Combina múltiples valores en una sola cadena con un delimitador entre ellos.

{{% collapse-content title="Ejemplo" level="h5" expanded=false %}}

| Ejemplo  | Fórmula | Resultado |
|----------|-------------|---------|
| Un registro de evento tiene los siguientes atributos: <br> - `@city` = "Paris" <br> - `@country` = "France" | `#region = textjoin(", ", "false", @city, @country)` | `#region` = "Paris, France" |

{{% /collapse-content %}}


<h4>upper(<i>str</i> cadena)</h4>

Convierte una cadena a mayúsculas.

{{% collapse-content title="Ejemplo" level="h5" expanded=false %}}

| Ejemplo  | Fórmula | Resultado |
|----------|-------------|---------|
| Un registro de evento tiene el siguiente atributo: `@first_name` = "Bob" | `#upper_name = upper(@first_name)` | `#upper_name` = "BOB" |

{{% /collapse-content %}}

---

### Lógico {#logical}

<h4>if(<i>expr</i> condición, <i>expr</i> si_verdadero, <i>expr</i> si_falso)</h4>

Evalúa una condición y devuelve un valor en consecuencia.

{{% collapse-content title="Ejemplo" level="h5" expanded=false %}}

| Ejemplo  | Fórmula | Resultado |
|----------|-------------|---------|
| Un registro de evento tiene los siguientes atributos: <br> - `@location` = "París, Francia" <br> - `@home` = "Nueva York, EE. UU." | `#abroad = if(@location == @home, "false", "true")` | `#abroad` = "true" |

{{% /collapse-content %}}


<h4>is_null(<i>expr</i> valor)</h4>

Comprueba si un atributo o expresión es nulo.

{{% collapse-content title="Ejemplo" level="h5" expanded=false %}}

| Ejemplo  | Fórmula | Resultado |
|----------|-------------|---------|
| Un registro de evento tiene los siguientes atributos: <br> - `@users_online` = 5 <br> - `@max_capacity` = 0 | `is_null(@users_online / @max_capacity)` | "true" |

{{% /collapse-content %}}


## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}