---
aliases:
- /es/dashboards/ddsql_editor/reference/aggregation_functions
- /es/dashboards/ddsql_editor/reference/scalar_functions/
- /es/ddsql_editor/reference/scalar_functions
- /es/ddsql_editor/reference/aggregation_functions
- /es/ddsql_editor/reference/functions
private: true
title: Funciones de DDSQL (Vista previa)
---

## Funciones de agregación

Las funciones de agregación calculan un único resultado a partir de un conjunto de valores de entrada, normalmente se utilizan junto con una afirmación `GROUP BY`.

### avg
| Nombre | Tipos de argumentos | Tipo de devolución | Descripción |
|------|----------------|-------------|-------------|
| avg(expr *e*) | numérico | numérico | Calcula la media (media aritmética) de todos los valores de entrada no nulos. |

### max
| Nombre | Tipos de argumentos | Tipo de devolución | Descripción |
|------|----------------|-------------|-------------|
| max(expr *e*) | variable | variable | Calcula el máximo de los valores de entrada no nulos. Los tipos de valores de entrada deben ser comparables. |

### min
| Nombre | Tipos de argumentos | Tipo de devolución | Descripción |
|------|----------------|-------------|-------------|
| min(expr *e*) | variable | variable | Calcula el mínimo de los valores de entrada no nulos. Los tipos de valores de entrada deben ser comparables. |

### sum
| Nombre | Tipos de argumentos | Tipo de devolución | Descripción |
|------|----------------|-------------|-------------|
| sum(expr *e*) | numérico | numérico | Calcula la suma de los valores de entrada no nulos. |

### count
| Nombre | Tipos de argumentos | Tipo de devolución | Descripción |
|------|----------------|-------------|-------------|
| count(expr *e*) | numérico | entero | Calcula el número de filas de entrada en las que el valor de entrada no es nulo. |
| count(distinct expr *e1*, *e2* ...) | | entero | Calcula el número de valores de entrada en los que el valor de entrada no es nulo. |
| count(*) | | entero | Calcula el número de filas de entrada. |

### string_agg
| Nombre | Tipos de argumentos | Tipo de devolución | Descripción |
|------|----------------|-------------|-------------|
| string_agg(expr *e*, delimiter *e*) | string, string | cadena | Concatena los valores de entrada, separados por un delimitador. |

### array_agg
| Nombre | Tipos de argumentos | Tipo de devolución | Descripción |
|------|----------------|-------------|-------------|
| string_agg(expr *e*) | variable | array<variable> | Concatena los valores de entrada en una matriz. |


## Funciones escalares

Estas funciones devuelven un valor por fila.

### Funciones y operadores de cadena

| Nombre | Tipo de devolución | Descripción |
|------|-------------|-------------|
| upper(text *s*) | texto | Convierte *s* en mayúsculas. |
| lower(text *s*) | texto | Convierte *s* en minúsculas. |
| length(text *s*) | entero | Cuenta el número de caracteres de *s*. |
| concat(expr *x*, *y*, ...) | texto | Concatena las expresiones proporcionadas. |
| substr(expr *s*, numeric *start*, numeric *numChars*) | texto | Devuelve una subcadena de *s* desde *start* hasta un máximo de *numChars*, si se proporciona. *start* es un índice basado en 1, por lo que `substr('hello', 2)` devuelve `'ello'`. Si start es menor que 1, se trata como si fuera 1. El resultado se calcula tomando el rango de caracteres `[start, start+numChars]`, donde si algún valor es menor que 1, se trata como si fuera 1. Esto significa que `substr('hello', -2, 4)` devuelve `'h'`. |
| replace(text *s*, text *from*, text *to*) | texto | Sustituye todas las apariciones de *s* de la subcadena *from* por la subcadena *to*. |
| regexp_replace(text *s*, text *pattern*, text *replacement*) | texto | Reemplaza las subcadenas en *s* que coinciden con la expresión regular POSIX *pattern* con *replacement*. Admite la [sintaxis de expresiones regulares][1] de Go. |
 reverse(expr *text*)  | cadena  | Revierte la cadena (brown → nworb). |
| md5(expr *text*) | cadena  | Calcula el hash MD5 de una cadena y devuelve el resultado en hexadecimal. |
| char_length(str *text*) | entero | Devuelve la cantidad de caracteres en cadena. |
| left(str *text*, *n* int) | texto | Devuelve los primeros caracteres *n* en la cadena. Cuando *n* es negativo, devuelve todo menos los últimos caracteres \|n\|. |
| right(str *text*, *n* int) | texto    | Devuelve los últimos caracteres *n* en la cadena. Cuando *n* es negativo, devuelve todo menos los primeros caracteres \|n\|. |
| ltrim(str *text* [, characters text]) | texto | Elimina la cadena más larga que contiene solo los caracteres de caracteres (un espacio por defecto) desde el inicio de la cadena. |
| rtrim(str *text* [, characters text])| texto | Elimina la cadena más larga que contiene solo los caracteres de caracteres (un espacio por defecto) desde el final de la cadena |
| trim([leading \| trailing \| both] [characters] from str) | texto | Elimina la cadena más larga que contiene solo los caracteres (un espacio por defecto) desde el inicio/final/ambos extremos de la cadena. |
| sort_order_ip(ip text) | texto | Devuelve una cadena que representa un orden en el rango de IPv4 e IPv6. |


### Funciones y operadores matemáticos

| Nombre | Tipo de devolución | Descripción |
|------|-------------|-------------|
| abs(numeric *n*) | entero | Devuelve el valor absoluto de *n*. |
| round(numeric *n*, [*s*]) | numérico | Redondea *n* a *s* decimales. |
| mod(numeric *x*, numeric *y*) | entero | Devuelve el resto de `x / y`. |
| floor(numeric *n*) | numérico | Devuelve el entero más cercano que sea menor o igual que *n*. |
| ceil(numeric *n*) | numérico | Devuelve el entero más cercano que sea mayor o igual que *n*. |
| power(numeric *n*, numeric *s*) | numérico | Eleva *n* a la potencia *s*. |
| ln(numeric *n*) | numérico | Calcula el logaritmo natural de *n*. |
| log(numeric *n*)  | numérico | Calcula el logaritmo en base 10 de *n*. |
| log2(numeric *n*) | numérico | Calcula el logaritmo en base 2 de *n*. |
| exp(numeric *n*) | numérico | Devuelve la constante matemática e, elevada a la potencia de *n*. |
| sqrt(numeric *n*) | numérico | Calcula la raíz cuadrada de *n*. |


### Funciones y operadores matriz
| Nombre | Tipo de devolución | Descripción |
|------|-------------|-------------|
| array_length(array *a*) | entero | Devuelve la longitud de la matriz *a* para cada fila. |
| array_contains(array *a*, expr *e*) | booleano | Devuelve true si el valor evaluado por la expresión *e* está en la matriz *a* para cada fila. |
| array_cat(array *a*, array *b*) | matriz | Devuelve una nueva matriz que contiene los elementos combinados de las matrices *a* y *b*.  |
| array_append(array *a*, expr *e*) | matriz | Devuelve una nueva matriz que incluye todos los elementos originales de la matriz de entrada seguidos del elemento añadido. |
| string_to_array(text *s*, delimiter, [,nullString]) | matriz | Devuelve una matriz de subcadenas obtenidas al dividir la cadena de entrada *s*, utilizando el delimitador especificado. El tercer argumento, nullString, es opcional y especifica las subcadenas que se sustituyen por `NULL`. |
| array_to_string(array *a*, delimiter, [,nullString]) | cadena | Concatena los elementos de la matriz utilizando el delimitador suministrado y la cadena nula opcional. |
| unnest(array *a*) | variable | Devuelve cada elemento de la matriz <strong>como una fila independiente</strong>. El tipo de devolución es el tipo de elemento de la matriz.<br>`unnest` solo puede utilizarse en la cláusula `SELECT` de una consulta. Si otras columnas son `SELECT`ed no anidadas, el valor en cada fila de la tabla se repite en cada fila de salida con cada elemento no anidado. Si no se están anidando varias columnas, todas las columnas no anidadas se comprimen juntas, con `NULL` rellenando los valores de salida para matrices más cortas. |

### Funciones y operadores de fecha/hora

| Nombre | Tipo de devolución | Descripción |
|------|-------------|-------------|
| date_trunc(string *precision*, timestamp *t*) | marca de tiempo | Trunca la marca temporal a la *precisión* elegida ("segundo", "minuto", "hora", "día", "semana", "mes" o "año"). |
| date_diff(string *precision*, timestamp *t*, timestamp *t*) | entero | Devuelve la diferencia entre dos fechas, con la precisión especificada. |
| to_timestamp(numeric *n*) | marca de tiempo | Transforma *n* en una marca temporal, considerando *n* como el tiempo en segundos.|

### Expresiones condicionales

| Nombre | Tipo de devolución | Descripción |
|------|-------------|-------------|
| coalesce(expr *x*, *y*, ...) | variable | Devuelve la primera expresión no nula. |
| nullif(expr *x*, expr *y*) | variable | Devuelve `NULL` si ambos argumentos son iguales. En caso contrario, devuelve *x*. |

### Funciones y operadores JSON

| Nombre | Tipo de devolución | Descripción |
|------|-------------|-------------|
| json_extract_path_text(text json, text path...) | texto | Extrae el subobjeto JSON en JSON como texto, definido por la ruta. Su comportamiento es equivalente al de una [función postgres con el mismo nombre][2]. Por ejemplo, `json_extract_path_text(col, ‘forest')` devuelve el valor de la clave `forest` para cada objeto JSON en `col`. Consulta el ejemplo siguiente para ver la sintaxis de una matriz JSON.|
| json_extract_path(text json, text path...) | json | Misma funcionalidad que `json_extract_path_text`, pero devuelve una columna de tipo JSON en lugar de tipo texto.|
| json_build_object(key1 text, value1 json/text/int/float, key2 text, value2 json/text/int/float, ... ) | json | Compila un objeto JSON basado en los parámetros pasados. Los parámetros de función son las claves/valores del objeto JSON que se está compilando, alternando entre clave y valor asignados a cada clave.|
| row_to_json(table) | json | Devuelve una representación JSON de cada fila de una tabla como un valor JSON. Las claves JSON son los nombres de las columnas, y los valores son los valores bajo cada fila en cada columna. <br><br> <strong>Nota</strong>: row_to_json toma un nombre de tabla, NO una columna, por ejemplo, `SELECT row_to_json(<table>) FROM <table>`. |

#### Matriz JSON
  Devuelve el valor de la clave `forest` en el elemento 0 de una matriz JSON para cada objeto o fila JSON en `col`.

```json
[{
"forest": "trees"
}]

```

```
json_extract_path_text(col, ‘0', ‘forest')
```


[1]: https://pkg.go.dev/regexp/syntax
[2]: https://www.postgresql.org/docs/current/functions-json.html