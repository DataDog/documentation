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

## Información general

La fórmula (o expresión) define el valor del campo calculado para cada evento de log. Puedes hacer referencia a atributos de log, a otros campos calculados y a funciones y operadores compatibles. Al escribir o editar una fórmula, el editor sugiere automáticamente los campos, funciones y operadores pertinentes.

## Sintaxis básica y constructos lingüísticos

| Constructo                                                                 | Sintaxis y notación                                                                                                                  |
| --------------------------------------------------------------------------| ------------------------------------------------------------------------------------------------------------------------------------ |
| Atributo reservado o etiqueta denominada `tag`                                     | `tag` (no requiere prefijo)<br>Para etiquetas que contengan guiones, puedes usar un carácter de escape con una barra invertida.<br>Ejemplo: `ci\-job\-id`                    |
| Atributo denominado `attr`                                                    | `@attr` (utiliza un prefijo `@` )                                                                                                          |
| Campo calculado denominado `field`                                            | `#field` (utiliza el prefijo `#` )                                                                                                          |
| Cadena literal (comillas)<br>Por ejemplo, `text` o `Quoted "text"`.         | `"text"`<br> `"Quoted \"text\""`<br>( <a href="https://docs.datadoghq.com/logs/explorer/search_syntax/"> Se aplica la sintaxis de búsqueda de logs</a>)|
| Literal numérico (número)<br>Por ejemplo, `ten`.                           | `10`                                                                                                                                 |
| Función denominada `func` con los parámetros `x` y `y`                         | `func(x, y)`                                                                                                                         |
| Operador<br>Por ejemplo, un operador binario `*` con operandos `x` y `y`. | `x*y`                                                                                                                                |

## Operadores

Los operadores disponibles por orden de precedencia:

| Operador | Descripción |
|----------|-------------|
| `()` | Una agrupación o llamada de función  |
| `!`, `NOT`, `-` | Una negación lógica o aritmética |
| `^`, `%` | Exponenciación, módulo|
| `*`, `/` | Multiplicación, división|
| `+`, `-` | Suma, resta |
| `<`, `<=`, `>`, `>=` | Menor que, menor o igual que, mayor que, mayor o igual que |
| `==`, `!=` | Coincide, no coincide |
| `&&`, `AND` | AND lógico |
| `\|\|`, `O` | OR lógico |

## Funciones

Las funciones disponibles se clasifican de la siguiente manera:
- [Aritmética](#arithmetic)
- [Cadena](#string)
- [Lógico](#logical)


### Aritmética

<h4>abs(<i>num</i> value)</h4>

Devuelve el valor absoluto de un número.

<details>
<summary>Ejemplo</summary>

| Ejemplo  | Fórmula | Resultado |
|----------|-------------|---------|
| Un evento de log tiene los siguientes atributos: <br> - `@client_latency` = 2 <br> - `@server_latency` = 3 | `#discrepancy = abs(@client_latency - @server_latency)` | `#discrepancy` = 1 |

</details>


<h4>ceil(<i>num</i> value)</h4>

Redondea el número al entero más próximo.

<details>
<summary>Ejemplo</summary>

| Ejemplo  | Fórmula | Resultado |
|----------|-------------|---------|
| Un evento de log tiene el siguiente atributo:<br>`@value` = 2.2 | `#rounded_up = ceil(@value)` | `#rounded_up` = 3 |

</details>


<h4>floor(<i>num</i> value)</h4>

Redondea el número al entero más próximo.

<details>
<summary>Ejemplo</summary>

| Ejemplo  | Fórmula | Resultado |
|----------|-------------|---------|
| Un evento de log tiene el siguiente atributo:<br>`@value` = 9.99 | `#rounded_down = floor(@value)` | `#rounded_down` = 9 |

</details>


<h4>max(<i>num</i> value, [ <i>num</i> value, ...])</h4>

Encuentra el valor máximo entre un conjunto de números.

<details>
<summary>Ejemplo</summary>

| Ejemplo  | Fórmula | Resultado |
|----------|-------------|---------|
| Un evento de log tiene el siguiente atributo:<br>`@CPU_temperatures` = [-1, 1, 5, 5] | `#highest_temp = max(@CPU_temperatures)` | `#highest_temp` = 5 |

</details>


<h4>min(<i>num</i> value, [<i>num</i> value, ...])</h4>

Encuentra el valor mínimo entre un conjunto de números.

<details>
<summary>Ejemplo</summary>

| Ejemplo  | Fórmula | Resultado |
|----------|-------------|---------|
| Un evento de log tiene el siguiente atributo:<br>`@CPU_temperatures` = [-1, 1, 5, 5] | `#lowest_temp = min(@CPU_temperatures)` | `#lowest_temp` = -1 |

</details>


<h4>round(<i>num</i> value, <i>int</i> precision)</h4>

Redondea un número. Opcionalmente, define cuántos decimales mantener.

<details>
<summary>Ejemplo</summary>

| Ejemplo  | Fórmula | Resultado |
|----------|-------------|---------|
| Un evento de log tiene el siguiente atributo:<br>`@value` = -1234.01 | `#rounded_to_tens = round(@value, -1)` | `#rounded_to_tens` = -1230 |

</details>

---

### Cadena

<h4>concat(<i>str</i> string [<i>str</i> string, <i>expr</i> value, ...])</h4>

Combina varios valores en una sola cadena.

<details>
<summary>Ejemplo</summary>

| Ejemplo  | Fórmula | Resultado |
|----------|-------------|---------|
| Un evento de log tiene los siguientes atributos: <br> - `@city` = "Paris" <br> - `@country` = "France" | `#region = concat(@city, ", ", @country)` | `#region` = "Paris, France" |

</details>


<h4>lower(<i>str</i> string)</h4>

Convierte la cadena a minúsculas.

<details>
<summary>Ejemplo</summary>

| Ejemplo  | Fórmula | Resultado |
|----------|-------------|---------|
| Un evento de log tiene el siguiente atributo:<br>`@first_name` = "Bob" | `#lower_name = lower(@first_name)` | `#lower_name` = "bob" |

</details>


<h4>left(<i>str</i> string, <i>int</i> num_chars)</h4>

Extrae un fragmento de texto del principio de una cadena.

<details>
<summary>Ejemplo</summary>

| Ejemplo  | Fórmula | Resultado |
|----------|-------------|---------|
| Un evento de log tiene el siguiente atributo:<br>`@price` = "USD10.50" | `#currency = left(@price, 3)` | `#currency` = "USD" |

</details>


<h4>proper(<i>str</i> string)</h4>

Convierte la cadena a mayúsculas o minúsculas.

<details>
<summary>Ejemplo</summary>

| Ejemplo  | Fórmula | Resultado |
|----------|-------------|---------|
| Un evento de log tiene el siguiente atributo:<br>`@address` = "123 main st" | `#formatted_address = proper(@address)` | `#formatted_address` = "123 Main St" |

</details>


<h4>split_before(<i>str</i> string, <i>str</i> separator, <i>int</i> occurrence)</h4>

Extrae el fragmento de texto que precede a un determinado patrón en una cadena.

<details>
<summary>Ejemplo</summary>

<table>
  <tr>
    <th>Ejemplo</th>
    <th>Fórmula</th>
    <th>Resultado</th>
  </tr>
  <tr>
    <td rowspan ="2">Un evento de log tiene el siguiente atributo:<br><code>@url</code> = "www.example.com/path/to/split"</td>
    <td><code>#url_extraction = split_before(@url, "/", 1)</code></td>
    <td><code>#url_extraction</code> = "www.example.com/path"</td>
  </tr>
  <tr>
    <td><code>#url_extraction = split_before(@url, "/", 2)</code></td>
    <td><code>#url_extraction</code> = "www.example.com/path/to"</td>
  </tr>
</table>

</details>


<h4>split_after(<i>str</i> string, <i>str</i> separator, <i>int</i> occurrence)</h4>

Extrae el fragmento de texto que sigue un determinado patrón en una cadena.

<details>
<summary>Ejemplo</summary>

<table>
  <tr>
    <th>Ejemplo</th>
    <th>Fórmula</th>
    <th>Resultado</th>
  </tr>
  <tr>
    <td rowspan ="2">Un evento de log tiene el siguiente atributo:<br><code>@url</code> = "www.example.com/path/to/split"</td>
    <td><code>#url_extraction = split_after(@url, "/", 0)</code></td>
    <td><code>#url_extraction</code> = "path/to/split"</td>
  </tr>
  <tr>
    <td><code>#url_extraction = split_after(@url, "/", 1)</code></td>
    <td><code>#url_extraction</code> = "to/split"
</table>

</details>


<h4>substring(<i>str</i> string, <i>int</i> start, <i>int</i> length)</h4>

Extrae un fragmento de texto del centro de una cadena.

<details>
<summary>Ejemplo</summary>

| Ejemplo  | Fórmula | Resultado |
|----------|-------------|---------|
| Un evento de log tiene el siguiente atributo:<br>`@price` = "USD10.50" | `#dollar_value = substring(@price, 2, 2)` | `#dollar_value` = "10" |


</details>


<h4>right(<i>str</i> string, <i>int</i> num_chars)</h4>

Extrae un fragmento de texto del final de una cadena.

<details>
<summary>Ejemplo</summary>

| Ejemplo  | Fórmula | Resultado |
|----------|-------------|---------|
| Un evento de log tiene el siguiente atributo:<br>`@price` = "USD10.50" | `#cent_value = right(@price, 2)` | `#cent_value` = "50" |

</details>


<h4>textjoin(<i>str</i> delimiter, <i>bool</i> ignore_empty, <i>str</i> string [<i>str</i> string, <i>expr</i> value, ...])</h4>

Combina varios valores en una sola cadena con un delimitador intermedio.

<details>
<summary>Ejemplo</summary>

| Ejemplo  | Fórmula | Resultado |
|----------|-------------|---------|
| Un evento de log tiene los siguientes atributos: <br> - `@city` = "Paris" <br> - `@country` = "France" | `#region = textjoin(", ", "false", @city, @country)` | `#region` = "Paris, France" |

</details>


<h4>upper(<i>str</i> string)</h4>

Convierte la cadena a mayúsculas.

<details>
<summary>Ejemplo</summary>

| Ejemplo  | Fórmula | Resultado |
|----------|-------------|---------|
| Un evento de log tiene el siguiente atributo: `@first_name` = "Bob" | `#upper_name = upper(@first_name)` | `#upper_name` = "BOB" |

</details>

---

### Lógico

<h4>if(<i>expr</i> condition, <i>expr</i> if_true, <i>expr</i> if_false)</h4>

Evalúa una condición y devuelve un valor en consecuencia.

<details>
<summary>Ejemplo</summary>

| Ejemplo  | Fórmula | Resultado |
|----------|-------------|---------|
| Un evento de log tiene los siguientes atributos: <br> - `@location` = "Paris, France" <br> - `@home` = "New York, USA" | `#abroad = if(@location == @home, "false", "true")` | `#abroad` = "true" |

</details>


<h4>is_null(<i>expr</i> value)</h4>

Comprueba si un atributo o expresión es nulo.

<details>
<summary>Ejemplo</summary>

| Ejemplo  | Fórmula | Resultado |
|----------|-------------|---------|
| Un evento de log tiene los siguientes atributos: <br> - `@users_online` = 5 <br> - `@max_capacity` = 0 | `is_null(@users_online / @max_capacity)` | "true" |

</details>


## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}