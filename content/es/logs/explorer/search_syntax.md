---
aliases:
- /es/logs/search-syntax
- /es/logs/search_syntax/
description: Busca a través de todos tus logs.
further_reading:
- link: /logs/explorer/#visualize
  tag: Documentación
  text: Aprende a visualizar logs
- link: /logs/explorer/#patterns
  tag: Documentación
  text: Detecta patrones dentro de tus logs
- link: /logs/log_configuration/processors
  tag: Documentación
  text: Aprende a procesar tus logs
- link: /logs/explorer/saved_views/
  tag: Documentación
  text: Información sobre las vistas guardadas
title: Sintaxis de búsqueda de logs
---

## Información general

Un filtro de consulta se compone de términos y operadores.

Existen dos tipos de términos:

* Un **término único** es una sola palabra, como `test` o `hello`.

* Una **secuencia** es un grupo de palabras delimitadas por comillas dobles, como `"hello dolly"`.

Para combinar varios términos en una consulta compleja, puedes utilizar cualquiera de los siguientes operadores booleanos que distinguen entre mayúsculas y minúsculas:

|              |                                                                                                        |                              |
|--------------|--------------------------------------------------------------------------------------------------------|------------------------------|
| **Operador** | **Descripción**                                                                                        | **Ejemplo**                  |
| `AND`        | **Intersección**: ambos términos están en los eventos seleccionados (si no se añade nada, se toma AND por defecto). | autenticación AND error   |
| `OR`         | **Unión**: cualquiera de los dos términos está en los eventos seleccionados.                                             | autenticación OR contraseña   |
| `-`          | **Exclusión**: el término siguiente NO figura en el evento (se aplica a cada búsqueda individual de texto sin formato).                                                  | autenticación AND -contraseña |

## Búsqueda de texto completo

<div class="alert alert-warning">La función de búsqueda de texto completo solo está disponible en Log Management y funciona en las consultas de monitor, dashboard y notebook. La sintaxis de búsqueda de texto completo no puede utilizarse para definir filtros de índice, filtros de archivo, filtros de pipeline de log ni en Live Tail. </div>

Utiliza la sintaxis `*:search_term` para realizar una búsqueda de texto completo en todos los atributos de log, incluido el mensaje de log.

### Ejemplo de término único

| Sintaxis de búsqueda | Tipo de búsqueda | Descripción                                           |
| ------------- | ----------- | ----------------------------------------------------- |
| `*:hello` | Texto completo   | Busca todos los atributos de log para el término `hello`.     |
| `hello`       | Texto libre   | Busca solo en el mensaje de log el término `hello`.   |

### Ejemplo de término de búsqueda con comodín

| Sintaxis de búsqueda | Tipo de búsqueda | Descripción                                                                                  |
| ------------- | ----------- | -------------------------------------------------------------------------------------------- |
| `*:hello` | Texto completo   | Busca en todos los atributos de log la cadena exacta `hello`.                                    |
| `*:hello*`| Texto completo   | Busca en todos los atributos de log cadenas que empiecen por `hello`. Por ejemplo, `hello_world`.|

### Ejemplo de términos múltiples con coincidencia exacta

| Sintaxis de búsqueda       | Tipo de búsqueda | Descripción                                            |
| ------------------- | ----------- |------------------------------------------------------- |
| `*:"hello world"` | Texto completo   | Busca todos los atributos de log para el término `hello world`. |
| `hello world`       | Texto libre   | Busca solo en el mensaje de log el término `hello`.     |

### Ejemplo de términos múltiples sin coincidencia exacta

La sintaxis de búsqueda de texto completo `*:hello world` es equivalente a `*:hello *:world`. Busca en todos los atributos de log los términos `hello` y `world`.

### Ejemplo de términos múltiples con un espacio en blanco

La sintaxis de búsqueda de texto completo `*:"hello world" "i am here"` es equivalente a `*:"hello world" *:"i am here"`. Busca en todos los atributos de log los términos `hello world` y `i am here`.

## Caracteres especiales de escape y espacios

Los siguientes caracteres, que se consideran especiales: `+` `-` `=` `&&` `||` `>` `<` `!` `(` `)` `{` `}` `[` `]` `^` `"` `“` `”` `~` `*` `?` `:` `\` `#` y los espacios que requieren ser de escape con el carácter `\`. 
`/` no se considera un carácter especial y no necesita ser de escape.

No se pueden buscar caracteres especiales en un mensaje de log. Puedes buscar caracteres especiales cuando están dentro de un atributo.

Para buscar caracteres especiales, analízalos en un atributo con el [Analizador Grok][1], y busca los logs que contengan ese atributo.


## Búsqueda de atributos

Para buscar en un atributo específico, añade `@` para especificar que estás buscando en un atributo.

Por ejemplo, si el nombre de tu atributo es **url** y quieres filtrar por el valor **url** `www.datadoghq.com`, introduce:

```
@url:www.datadoghq.com
```


**Notas**:

1. **No** es necesario definir una faceta para buscar en los atributos y etiquetas (tags).

2. Las búsquedas por atributos distinguen entre mayúsculas y minúsculas. Utiliza [búsqueda de texto completo](#full-text-search) para obtener resultados que no distingan entre mayúsculas y minúsculas. Otra opción es utilizar el filtro `lowercase` con tu Analizador Grok mientras haces un análisis para obtener resultados que no distingan entre mayúsculas y minúsculas durante la búsqueda.

3. La búsqueda de un valor de atributo que contenga caracteres especiales requiere un carácter de escape o comillas dobles.
    - Por ejemplo, para un atributo `my_attribute` con el valor `hello:world`, busca utilizando: `@my_attribute:hello\:world` o `@my_attribute:"hello:world"`.
    - Para que coincida con un único carácter especial o espacio, utiliza el comodín `?`. Por ejemplo, para un atributo `my_attribute` con el valor `hello world`, busca utilizando: `@my_attribute:hello?world`.

Ejemplos:

| Consulta de búsqueda                                                         | Descripción                                                                                                                                                         |
|----------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `@http.url_details.path:"/api/v1/test"`                              | Busca todos los logs que coincidan con `/api/v1/test` en el atributo `http.url_details.path`.                                                                               |
| `@http.url:/api\-v1/*`                                             | Busca todos los logs que contengan un valor en el atributo `http.url` que empiece por `/api-v1/`                                                                             |
| `@http.status_code:[200 TO 299] @http.url_details.path:/api\-v1/*` | Busca todos los logs que contengan un valor `http.status_code` entre 200 y 299, y que contengan un valor en el atributo `http.url_details.path` que empiece por `/api-v1/` |
| `-@http.status_code:*`                                                | Busca todos los logs que no contengan el atributo `http.status_code`  |

### Buscar utilizando la notación CIDR
Classless Inter Domain Routing (CIDR) es una notación que permite a los usuarios definir un rango de direcciones IP (también llamadas bloques de CIDR) de forma sucinta. CIDR se utiliza normalmente para definir una red (como una VPC) o una subred (como una subred pública/privada dentro de una VPC).

Los usuarios pueden utilizar la función `CIDR()` para consultar atributos en logs utilizando la notación CIDR. La función `CIDR()` necesita que se le pase un atributo de log como parámetro por el que filtrar, seguido de uno o varios bloques de CIDR.

#### Ejemplos
- `CIDR(@network.client.ip,13.0.0.0/8)` coincide y filtra logs que tengan direcciones IP en el campo `network.client.ip` que caen bajo el bloque de CIDR 13.0.0.0/8.
- `CIDR(@network.ip.list,13.0.0.0/8, 15.0.0.0/8)` coincide y filtra logs que tengan cualquier dirección IP en un atributo matriz `network.ip.list` que pertenezca a los bloques de CIDR 13.0.0.0/8 o 15.0.0.0/8.
- `source:pan.firewall evt.name:reject CIDR(@network.client.ip, 13.0.0.0/8)` coincidiría y filtraría eventos de rechazo desde el firewall de palo alto que se originan en la subred 13.0.0.0/8
- `source:vpc NOT(CIDR(@network.client.ip, 13.0.0.0/8)) CIDR(@network.destination.ip, 15.0.0.0/8)` mostrará todos los logs de VPC que no se originan en la subred 13.0.0.0/8, pero que están designados para la subred de destino 15.0.0.0/8 porque deseas analizar el tráfico de red en tus entornos entre subredes.

La función `CIDR()` es compatible con las notaciones CIDR de IPv4 e IPv6 y funciona en Log Explorer, Live Tail, widgets de log en dashboards, monitores de log y configuraciones de log.

## Comodines

Puedes utilizar comodines con la búsqueda de texto libre. Sin embargo, solo busca términos en el mensaje de log, el texto de la columna `content` en Log Explorer. Consulta [búsqueda de texto completo](#full-text-search) si deseas buscar un valor en un atributo de log.

### Comodín de varios caracteres

Para realizar una búsqueda de comodín de varios caracteres en el mensaje de log (la columna `content` en Log Explorer), utiliza el símbolo `*` como se indica a continuación:

* `service:web*` coincide con cada mensaje de log que tenga un servicio que empiece por `web`.
* `web*` coincide con todos los mensajes de log que empiecen con `web`.
* `*web` coincide con todos los mensajes de log que terminan con `web`.

**Nota**: Los comodines solo funcionan fuera de las comillas dobles. Por ejemplo, `"*test*"` coincide con un log que tenga la cadena `*test*` en su mensaje. `*test*` coincide con un log que tenga la test de cadena en cualquier parte de su mensaje.

Las búsquedas con comodines funcionan dentro de etiquetas y atributos (con o sin facetas) con esta sintaxis. Esta consulta devuelve todos los servicios que terminan con la cadena `mongo`:
<p> </p>
<p></p>

```
service:*mongo
```

Las búsquedas con comodines también pueden utilizarse para buscar en el texto sin formato de un log que no forme parte de un atributo de log. Por ejemplo, esta consulta devuelve todos los logs con contenido (mensaje) que contengan la cadena `NETWORK`:

```
*NETWORK*
```

Sin embargo, este término de búsqueda no devuelve logs que contengan la cadena `NETWORK` si se encuentra en un atributo de log y no forma parte del mensaje de log.

### Buscar comodín

Cuando busques un valor de atributo o etiqueta que contenga caracteres especiales o requiera caracteres de escape o comillas dobles, utiliza el comodín `?` para que coincida con un único carácter especial o espacio. Por ejemplo, para buscar un atributo `my_attribute` con el valor `hello world`: `@my_attribute:hello?world`.
<p> </p>

## Valores numéricos

Para buscar en un atributo numérico, primero [añádelo como faceta][2]. A continuación, puedes utilizar operadores numéricos (`<`,`>`, `<=`, o `>=`) para realizar una búsqueda sobre facetas numéricas.
Por ejemplo, recupera todos los logs que tengan un tiempo de respuesta superior a 100ms con:
<p> </p>

```
@http.response_time:>100
```

Puedes buscar atributos numéricos dentro de un rango específico. Por ejemplo, recupera todos tus errores 4xx con:

```
@http.status_code:[400 TO 499]
```

## Etiquetas

Tus logs heredan las etiquetas de los [hosts][3] y las [integraciones][4] que las generan. Pueden utilizarse para buscar y también como facetas:

* `test` está buscando la cadena "test".
* `env:(prod OR test)` coincide con todos los logs con la etiqueta `env:prod` o la etiqueta `env:test`
* `(env:prod AND -version:beta)` coincide con todos los logs que contengan la etiqueta `env:prod` y que no contengan la etiqueta `version:beta`

Si tus etiquetas no siguen las [prácticas recomendadas de etiqueta][5] y no utilizan la sintaxis `key:value`, utiliza esta consulta de búsqueda:

* `tags:<MY_TAG>`

## Matrices

En el ejemplo siguiente, al hacer clic en el valor `Peter` de la faceta, se devuelven todos los logs que contiene un atributo `users.names`, cuyo valor es `Peter` o una matriz que contiene `Peter`:

{{< img src="logs/explorer/search/array_search.png" alt="Matriz y facetas" style="width:80%;">}}

**Nota**: Buscar también puede utilizarse en atributos de matriz sin facetas utilizando una sintaxis equivalente.

En el siguiente ejemplo, los logs de CloudWatch para Windows contienen una matriz de objetos JSON bajo `@Event.EventData.Data`. No se puede crear una faceta sobre una matriz de objetos JSON, pero se puede buscar utilizando la siguiente sintaxis.

* `@Event.EventData.Data.Name:ObjectServer` coincide con todos los logs con la clave `Name` y el valor `ObjectServer`.

{{< img src="logs/explorer/search/facetless_query_json_arrray2.png" alt="Consulta sin facetas en una matriz de objetos JSON" style="width:80%;">}}
<p> </p>

## Búsquedas guardadas

Las [Vistas guardadas][6] contienen tu consulta de búsqueda, columnas, horizonte temporal y faceta.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/logs/log_configuration/parsing
[2]: /es/logs/explorer/facets/
[3]: /es/infrastructure/
[4]: /es/integrations/#cat-log-collection
[5]: /es/getting_started/tagging/#tags-best-practices
[6]: /es/logs/explorer/saved_views/
[7]: /es/logs/explorer/facets/#facet-panel