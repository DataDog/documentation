---
aliases:
- /es/observability_pipelines/search_syntax/
code_lang: logs
description: Aprenda a utilizar la sintaxis de búsqueda de registros para las consultas
  de filtro de sus procesadores de Observability Pipelines.
disable_toc: false
title: Sintaxis de búsqueda de registros
type: multi-code-lang
weight: 1
---
## Descripción general {#overview}

Cuando añade un procesador a una canalización, puede filtrar los registros para procesar solo un subconjunto definido. Este documento revisa la siguiente información:

- [Búsqueda de texto libre](#free-text-search): para buscar en el campo `message`
- [Búsqueda de atributos](#attribute-search): para buscar claves y valores de atributos
- [Matrices](#arrays): para buscar dentro de una matriz de valores anidados
- [Operadores booleanos](#boolean-operators)
- [Caracteres especiales y espacios que deben escaparse](#escape-special-characters-and-spaces)
- [Comodines](#wildcards)

**Nota**: La versión 2.11 del Worker y las posteriores utilizan una sintaxis de búsqueda actualizada. Después de actualizar el Worker a la versión 2.11, es posible que deba actualizar sus consultas de filtro para que coincidan con la nueva sintaxis. Consulte [Actualice sus consultas de filtro a la nueva sintaxis de búsqueda][1] para obtener más información.

## Sintaxis de búsqueda {#search-syntax}

Existen dos tipos de consultas de filtro que puede utilizar:

- [Texto libre](#free-text-search)
- [Atributo](#attribute-search)

### Búsqueda de texto libre {#free-text-search}

La búsqueda de texto libre solo busca en el campo `message` y no distingue entre mayúsculas y minúsculas. Se compone de términos y operadores. Existen dos tipos de términos:

- Un término único es una sola palabra como `test` o `hello`.
- Una secuencia es un grupo de palabras entre comillas dobles, como `"hello dolly"`.

Los siguientes son ejemplos de búsqueda de texto libre:

`hello`
: Busca la cadena exacta `hello`. Por ejemplo, `{"message": \"hello world\"}` es un registro coincidente.

`Hello world`
: Busca `hello` y `world`. Por ejemplo, `"hello beautiful world"` es un registro coincidente.
: Esta consulta también puede escribirse como `Hello AND world`.
: **Nota**: El mensaje debe contener tanto `hello` como `world` para coincidir.

`"hello world"`
: Busca una secuencia de palabras. Por ejemplo, `"hello world"`, `"hello-world"` y `"Hello, world"` son todas coincidencias.

### Búsqueda de atributos {#attribute-search}

Puede buscar claves y valores de atributos. Por ejemplo, si su clave de atributo es `url` y desea filtrar por el valor `url` `www.datadoghq.com`, ingrese : `url:www.datadoghq.com`.

**Nota**: Las búsquedas de atributos distinguen entre mayúsculas y minúsculas.

#### Filtrar por eventos con una clave de atributo específica {#filter-for-events-with-a-specific-attribute-key}

Para filtrar por eventos que tienen una clave de atributo específica, utilice la sintaxis `_exists_`. Por ejemplo, si usa la consulta `_exists_:service`, el evento `{"service": \"postgres\"}` coincide con la consulta, pero el evento `{"env": \"prod\"}` no coincide.

#### Filtrar por eventos que no tienen una clave de atributo específica {#filter-for-events-that-do-not-have-a-specific-attribute-key}

Para filtrar por eventos que no tienen una clave de atributo específica, use la sintaxis `_missing_`. Por ejemplo, si usa la consulta `_missing_:service`, el evento `{"env": \"prod\"}` coincide con la consulta, pero el evento `{"service": \"postgres\"}` no coincide.

#### Ejemplos de sintaxis de búsqueda de atributos {#attribute-search-syntax-examples}

Aquí hay algunos ejemplos de sintaxis de búsqueda de atributos y registros que coinciden con la sintaxis:

`status:ok service:flask-web-app`
: Coincide con registros con el estado `ok` de su servicio `flask-web-app`.
: Esta consulta también se puede escribir como: `status:ok AND service:flask-web-app`.

`user.status:inactive`
: Coincide con registros con el estado `inactive` anidado bajo el atributo `user`.

`http.url:/api-v1/*`
: Coincide con registros que contienen un valor en el atributo `http.url` que comienza con `/api-v1/`.

`http.status:[200 TO 299]`
: Coincide con registros que contienen un valor `http.status` que es mayor o igual a `200` y menor o igual a `299`.
: **Notas**:<br>- `[..]` Los corchetes significan que los rangos son inclusivos.<br>- Los rangos se pueden usar en cualquier atributo.

`http.status:{200 TO 299}`
: Coincide con registros que contienen un valor `http.status` que es mayor a `200` o menor a `299`.
: **Notas**:<br>- `{..}` Las llaves significan que los rangos son exclusivos.<br>- Los rangos se pueden usar en cualquier atributo.

`http.status_code:[200 TO 299] http.url_details.path:/api-v1/*`
: Coincide con registros que contienen ambos:<br>- Un valor `http.status_code` que sea mayor o igual a `200` y menor o igual a `299`<br>- Un valor en el atributo `http.url_details.path` que comience con `/api-v1/`.

`"service.status":disabled`
: Coincide con registros con `"service.status": "disabled"`. Esta sintaxis de filtro busca un `.` literal en la clave de atributo.
: Consulte [Notación de ruta](#path-notation) para obtener más información.

`_exists_:service`
: Coincide con registros con la clave de atributo `service`. Por ejemplo, la consulta coincide con `{"service": "postgres"}`, pero no coincide con `{"env": "prod"}`.

`_missing_:service`
: Coincide con registros que no tienen la clave de atributo `service`. Por ejemplo, la consulta coincide con `{"env": "prod"}`, pero no coincide con `{"service": "postgres"}`.

#### Notación de ruta {#path-notation}

{{% observability_pipelines/path_notation %}}

Si desea que la consulta busque un `.` literal en la clave de atributo, encierre la clave entre comillas escapadas en la consulta de búsqueda. Por ejemplo, la consulta de búsqueda `"service.status":disabled` coincide con el evento `{"service.status": \"disabled\"}`.

#### `ddsource` y `ddtags` {#ddsource-and-ddtags}

Las fuentes Datadog Agent, Datadog Lambda Forwarder y Datadog Lambda Extension envían registros y métricas etiquetados con `ddsource` y `ddtags`, no con `source` y `tags`. Cuando defina consultas de procesador o filtros para eventos de estas fuentes, utilice `ddsource` y `ddtags` en su lugar.

### Matrices {#arrays}

En el siguiente ejemplo, los registros de CloudWatch para Windows contienen una matriz de objetos JSON bajo `Event.EventData.Data`.

```
Event
{
EventData {
    Data [
        {"Name":"SubjectUserID1", "value":"12345"},
        {"Name":"SubjectUserID2", "value":"Admin"},
        {"Name":"ObjectServer", "value":"Security"}
	]
    }
}
```

Si utiliza la consulta de filtro `Event.EventData.Data.Name:ObjectServer`, el evento de registro anterior coincide porque contiene un objeto anidado con la clave de atributo `Name` y el valor `ObjectServer`.

### Operadores booleanos {#boolean-operators}

Puede utilizar los siguientes operadores booleanos que distinguen entre mayúsculas y minúsculas para combinar varios términos en una consulta de búsqueda.

| Operador     | Descripción                                            |
|--------------|--------------------------------------------------------|
| `AND`        | Intersección: ambos términos están en el evento.             |
| `OR`         | Unión: cualquiera de los términos está contenido en el evento.          |
| `-` o `NOT` | Exclusión: el siguiente término **no** está en el evento. |

A continuación se muestran ejemplos de consultas que utilizan operadores booleanos:

`NOT (status:debug)`
: Coincide con registros que no tienen el estado `DEBUG`.

`host:COMP-A9JNGYK OR host:COMP-J58KAS`
: Solo coincide con registros de esos hosts específicos.

`Hello AND World`
: Busca `hello` y `world`. Por ejemplo, `"hello beautiful world"` es un registro coincidente.
: Esta consulta también se puede escribir como: `Hello world`.
: **Nota**: El mensaje debe contener tanto `hello` como `world` para coincidir.

`hello AND status:info`
: Coincide con registros con un campo de mensaje que contiene `hello` y con `status:info`.

`-http.status_code:200`
: Coincide con registros donde http.status_code no es igual a 200

`service:(postgres OR datadog_agent)`
: Coincide con registros con los valores `postgres` o `datadog_agent` para el atributo `service`. Esta consulta también se puede escribir como: `service:postgres OR service:datadog_agent`

## Escape caracteres especiales y espacios {#escape-special-characters-and-spaces}

Los siguientes caracteres se consideran especiales y deben escaparse con una barra invertida (`\`): 

`-` `!` `&&` `||` `>` `>=` `<` `<=` `(` `)` `{` `}` `[` `]` `"` `*` `?` `:` `#`, y espacios.

**Notas**:

- `/` no se considera un carácter especial y no necesita ser escapado.
- Puede buscar caracteres especiales dentro de un atributo. Consulte [Buscar un atributo que contiene caracteres especiales](#search-an-attribute-that-contains-special-characters).
- Si desea coincidir con registros que contienen el carácter especial `!` en el campo `message`, utilice la sintaxis de búsqueda de atributos: `message:*!*`.
    - **Nota**: No puede utilizar consultas de búsqueda de texto libre para filtrar mensajes de registro con caracteres especiales.

### Buscar un atributo que contiene caracteres especiales {#search-an-attribute-that-contains-special-characters}

La búsqueda de un valor de atributo que contiene caracteres especiales requiere que se escape o el uso de comillas dobles. Por ejemplo, para buscar un atributo `my_app` con el valor `hello:world`, utilice la sintaxis: `my_app:hello\:world` o `my_app:"hello:world"`.

### Coincidir con un solo carácter especial o espacio {#match-a-single-special-character-or-space}

Para coincidir con un solo carácter especial o espacio, utilice el comodín `?`. Por ejemplo, para buscar un atributo `my_app` con el valor `hello world again`, utilice la sintaxis: `my_app:hello?world?again`.

### Ejemplos {#examples}

Para aprender cómo escapar caracteres especiales y espacios en una búsqueda, consulte el siguiente ejemplo de registro:

```
{
    "service": "postgres",
    "status": "INFO",
    "tags": [
        "env:prod",
        "namespace:something",
        "reader:logs",
        "my_app:hello world again"
    ]
}
```

Los siguientes son ejemplos de sintaxis de búsqueda que escapan caracteres especiales y espacios en el ejemplo de registro:

`tags:env*`
: Coincide con registros con un valor de atributo `tag` de `env`.

`tags:(env\:prod OR env\:test)`
: Coincide con registros con la etiqueta `env:prod` o `env:test` en la matriz `tags`.
: Esta consulta también puede escribirse como `tags:("env:prod" OR "env:test")`.

`tags:env\:prod AND -tags:version\:beta`
: Coincide con registros que tienen `env:prod` y no tienen `version:beta` en la matriz `tag`.
: Esta consulta también puede escribirse como `tags:"env:prod" AND -tags:"version:beta"`.

`my_app:hello\:world`
: Coincide con registros que contienen `my_app:hello:world`.
: Esta consulta también puede escribirse como `my_app:"hello:world"`.

`my_app:hello?world?again`
: Coincide con registros que contienen `"my_app":"hello world again"`.

## Comodines {#wildcards}

Puede usar `*` para búsquedas con comodines. Los siguientes son ejemplos de búsqueda con comodines:

`*network*`
: Coincide con registros con un valor de campo `message` que contiene `network`.

`web*`
: Coincide con registros con un valor de campo `message` que comienza con `web`.

`*web`
: Coincide con registros que tienen un valor de campo `message` que termina con `web`.

`service:*mongo`
: Coincide con registros con valores de atributo `service` que terminan con `mongo`.

`service:web*`
: Coincide con registros que tienen un valor de atributo `service` que comienza con `web`.

**Notas**:
- No puede utilizar comodines para buscar claves de atributo, como `*:app` o `service*:app`.
- Los comodines solo funcionan como comodines fuera de las comillas dobles.
    - Por ejemplo, `"*test*"` coincide con un registro que tiene la cadena `*test*` en su campo `message`, mientras que `*test*` coincide con un registro que tiene la cadena `test` en cualquier parte del campo `message`.

#### Buscar caracteres especiales o caracteres de escape {#search-for-special-characters-or-escaped-characters}

Al buscar un atributo que contenga caracteres especiales o que requiera escape o comillas dobles, utilice el comodín `?` para coincidir con un solo carácter especial o espacio. Por ejemplo, para buscar un atributo `my_attribute` con el valor `hello world`, utilice la sintaxis: `my_attribute:hello?world`.

[1]: /es/observability_pipelines/guide/upgrade_your_filter_queries_to_the_new_search_syntax/