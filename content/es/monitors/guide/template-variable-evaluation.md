---
description: Modifica la salida de variables de plantilla en las notificaciones de
  monitor utilizando operaciones matemáticas, funciones y manipulación de cadenas
  con la sintaxis eval.
title: Evaluación de variables de plantilla
---

En los mensajes de notificación del monitor, puedes modificar la salida de variables de plantilla utilizando la sintaxis `eval`, que permite varias operaciones matemáticas diferentes y funciones en las variables de plantilla con un valor numérico o de cadena.

## Operadores

Los operadores de evaluación permiten realizar operaciones aritméticas básicas en una variable de plantilla numérica. La sintaxis utiliza el siguiente formato. **Nota**: Las expresiones deben ir entre comillas (`"`).

```text
{{eval "TEMPLATE_VARIABLE_NAME+1-2*3/4"}}
```

Se admiten los siguientes operadores:

| Operador | Descripción    |
|----------|----------------|
| +        | Suma       |
| -        | Resta    |
| *        | Multiplicación |
| /        | División       |
| ^        | Exponenciación |
| %        | Módulo         |

### Ejemplo

La variable de plantilla `{{last_triggered_at_epoch}}` devuelve la hora UTC en que se activó por última vez un monitor en formato de época en milisegundos.

### Enlaces de contexto a horarios específicos

Se pueden utilizar operadores de evaluación para restar 15 minutos (15 * 60 * 1000 milisegundos) con lo siguiente:

```
{{eval "last_triggered_at_epoch-15*60*1000"}}
```

Esto es útil para crear enlaces temporales en tu mensaje de notificación del monitor a otras páginas en Datadog u otras herramientas de flujo de trabajo. Por ejemplo, utiliza los operadores de evaluación en `{{last_triggered_at_epoch}}` para crear un enlace temporal al [Datadog Log Explorer][1]:

```
https://app.datadoghq.com/logs?from_ts={{eval "last_triggered_at_epoch-15*60*1000"}}&to_ts={{last_triggered_at_epoch}}&live=false
```

### Enrutamiento de notificaciones a diferentes equipos en función de la hora del día

Puedes combinar una evaluación modulo `%` de la variable `last_triggered_at_epoch` con `{{#is_exact_match}}{{/is_exact_match}}` para personalizar el enrutamiento de notificaciones en función de la hora del día (UTC):
```
{{#is_exact_match (eval "int(last_triggered_at_epoch / 3600000 % 24)") "8" "9" "10" "11" "12" "13"}}  
Handle that should receive notification if time is between 8AM and 2PM UTC
{{/is_exact_match}}
```

**Nota:** Si necesitas evaluar tu monitor en un cronograma, consulta [Cronogramas personalizados][2] en su lugar.

## Funciones

El valor de una variable de plantilla puede utilizarse como entrada para las funciones de evaluación para cambiar el formato de la variable de plantilla o realizar una operación matemática sobre el valor (si procede). La sintaxis utiliza el siguiente formato. **Nota**: Las expresiones deben ir entre comillas (`"`).

```text
{{eval "function(TEMPLATE_VARIABLE_NAME)"}}
```


{{< tabs >}}
{{% tab "Variable numérica" %}}


Las siguientes funciones cambian el formato del valor de una variable de plantilla numérica:

| Función            | Descripción|
|---------------------|--------------------------------------------------------------------------------------------------------------------------------------------|
| humanize_bytes(var) | Devuelve un formato legible para humanos de los bytes var|
| humanize_bits(var)  | Devuelve un formato legible de los bits var|
| abs(var)            | Devuelve el valor absoluto de var|
| int(var)            | Devuelve var como un entero con mínimo; es decir, los números a la izquierda del punto decimal. Por ejemplo: si var = 12,345, entonces `int(var)` devuelve 12.|
| float(var)          | Devuelve var como valor flotante|
| trunc(var)          | Devuelve var como un entero, un alias de la función int|
| dec(var)            | Devuelve los números a la derecha del punto decimal. Por ejemplo: si var = 12,345, `dec(var)` devuelve 0,345.|

En las siguientes funciones se utiliza el valor de una variable de plantilla numérica como entrada para una función matemática:

| Función            | Descripción|
|---------------------|--------------------------------------------------------------------------------------------------------------------------------------------|
| round(var)          | Devuelve var redondeado al entero más próximo|
| round(var, n)       | Devuelve var redondeado a un número especificado de dígitos (n).<br>Por ejemplo: round(12,376, 2) = 12,38|
| ceil(var)           | Devuelve el tope de var (el entero más pequeño que es mayor o igual que var)|
| floor(var)          | Devuelve el mínimo de var (el mayor entero que es menor o igual que var)|
| sgn(var)            | Devuelve el valor de la función signo evaluado en var:<br>sgn(var) = 1 si var > 0<br>sgn(var) = 0 si var = 0<br>sgn(var) = -1 si var < 0|
| to_bool(var)        | Devuelve true si var = 1<br>Devuelve false si var = 0|
| exp(var)            | Devuelve e (la base del logaritmo natural) elevado a la potencia de var|
| log10(var)          | Devuelve el logaritmo en base-10 de var|
| sin(var)            | Devuelve el seno de var en radianes|
| sinh(var)           | Devuelve el seno hiperbólico de var|
| asin(var)           | Devuelve el arco seno de var, en radianes|
| asinh(var)          | Devuelve el seno hiperbólico inverso de var|
| cos(var)            | Devuelve el coseno de var en radianes|
| cosh(var)           | Devuelve el coseno hiperbólico de var|
| acos(var)           | Devuelve el arco coseno de var, en radianes|
| acosh(var)          | Devuelve el coseno hiperbólico inverso de var|
| tan(var)            | Devuelve la tangente de var en radianes|
| tanh(var)           | Devuelve la tangente hiperbólica de var|
| atan(var)           | Devuelve la tangente de arco de var, en radianes|
| atan2(var1, var2)   | Devuelve atan(var1 / var2), en radianes|
| atanh(var)          | Devuelve la tangente hiperbólica inversa de var|

### Ejemplos

Si los decimales de la variable de plantilla `{{value}}` son innecesarios para tu caso de uso particular, utiliza la función int para evaluar `{{value}}` como un número entero a fin de mejorar la legibilidad y eliminar los decimales:

```
{{eval "int(value)"}}
```

Si `{{value}}` está evaluando a un gran número de bytes o bits, utiliza la función `humanize_bytes` o `humanize_bits` para convertir el número a una unidad de memoria superior diferente, como GB o MB, para mejorar la legibilidad:

```
{{eval "humanize_bytes(value)"}}

{{eval "humanize_bits(value)"}}
```

{{% /tab %}}


{{% tab "Variable de cadena" %}}

Las siguientes funciones pueden utilizarse para realizar determinadas operaciones con variables de cadena:

| Función            | Descripción|
|---------------------|--------------------------------------------------------------------------------------------------------------------------------------------|
| upper(var) | Devuelve una cadena convertida a mayúsculas|
| lower(var)  | Devuelve una cadena convertida a minúsculas|
| substring(var, start, end)            | Extrae caracteres de una cadena, entre dos índices especificados (start, end). El tercer parámetro es opcional.<br>Por ejemplo: substring("host:D", 5) = "D"|
| strip(var, characters)            | Elimina los caracteres iniciales y finales. Cuando el segundo parámetro es null, elimina los espacios al principio y al final de la cadena. Por ejemplo:<br>strip(" host:E ") = "host:E"<br>strip("abchost:Eabc", "abc") = "host:E"|


{{% /tab %}}

{{< /tabs >}}



[1]: /es/logs/explorer/
[2]: /es/monitors/guide/custom_schedules