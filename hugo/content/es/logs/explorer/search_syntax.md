---
aliases:
- /es/logs/search-syntax
- /es/logs/search_syntax/
description: Busque en todos sus registros.
further_reading:
- link: /getting_started/search/
  tag: Documentación
  text: Introducción a la búsqueda en Datadog
- link: /logs/explorer/#visualize
  tag: Documentación
  text: Aprenda a visualizar registros
- link: /logs/explorer/#patterns
  tag: Documentación
  text: Detecte patrones dentro de sus registros
- link: /logs/log_configuration/processors
  tag: Documentación
  text: Aprenda a procesar sus registros
- link: /logs/explorer/saved_views/
  tag: Documentación
  text: Obtenga información sobre Saved Views
- link: /logs/explorer/calculated_fields/formulas
  tag: Documentación
  text: Obtenga más información sobre Calculated Fields Formulas
- link: https://learn.datadoghq.com/courses/log-explorer
  tag: Centro de aprendizaje
  text: Introducción a Log Explorer
title: Sintaxis de búsqueda de registros
---
## Descripción general {#overview}

Un filtro de consulta se compone de términos y operadores.

Existen dos tipos de términos:

* Un **término único** es una sola palabra como `test` o `hello`.

* Una **secuencia** es un grupo de palabras entre comillas dobles, como `"hello dolly"`.

Para combinar varios términos en una consulta compleja, puede usar cualquiera de los siguientes operadores booleanos que distinguen entre mayúsculas y minúsculas:

|              |                                                                                                        |                              |
|--------------|--------------------------------------------------------------------------------------------------------|------------------------------|
| **Operador** | **Descripción**                                                                                        | **Ejemplo**                  |
| `AND`        | **Intersección**: ambos términos están en los eventos seleccionados (si no se agrega nada, se toma AND de forma predeterminada) | authentication AND failure   |
| `OR`         | **Unión**: cualquiera de los términos está contenido en los eventos seleccionados                                             | authentication OR password   |
| `-`          | **Exclusión**: el siguiente término NO está en el evento (se aplica a cada búsqueda de texto sin formato individual)                                                  | authentication AND -password |

## Búsqueda de texto completo {#full-text-search}

<div class="alert alert-danger">La función de búsqueda de texto completo solo está disponible en Log Management y funciona en consultas de monitor, dashboard y notebook. La sintaxis de búsqueda de texto completo no se puede utilizar para definir filtros de índice, filtros de archivo, filtros de canalización de registros, filtros de rehidratación, filtros de métricas basados en registros o en Live Tail. </div>

Utilice la sintaxis `*:search_term` para realizar una búsqueda de texto completo en todos los atributos de registro, incluido el mensaje de registro.

### Ejemplo de término único {#single-term-example}

| Sintaxis de búsqueda | Tipo de búsqueda | Descripción                                               |
| ------------- | ----------- | --------------------------------------------------------- |
| `*:hello`     | Texto completo   | Busca en todos los atributos de registro la cadena exacta `hello`. |
| `hello`       | Texto libre   | Busca solo en los atributos `message`, `@title`, `@error.message` y `@error.stack` la cadena exacta `hello`.       |

### Ejemplo de término de búsqueda con Wildcard {#search-term-with-wildcard-example}

| Sintaxis de búsqueda | Tipo de búsqueda | Descripción                                                                                 |
| ------------- | ----------- | ------------------------------------------------------------------------------------------- |
| `*:hello`     | Texto completo   | Busca en todos los atributos de registro la cadena exacta `hello`.                                   |
| `*:hello*`    | Texto completo   | Busca en todos los atributos de registro cadenas que comiencen con `hello`. Por ejemplo, `hello_world`.  |

### Ejemplo de términos múltiples con coincidencia exacta {#multiple-terms-with-exact-match-example}

| Sintaxis de búsqueda       | Tipo de búsqueda | Descripción                                                                                        |
| ------------------- | ----------- |--------------------------------------------------------------------------------------------------- |
| `*:"hello world"`   | Texto completo   | Busca en todos los atributos de registro la cadena exacta `hello world`.                                    |
| `hello world`       | Texto libre   | Busca solo en el mensaje de registro las palabras `hello` y `world`. Por ejemplo `hello beautiful world`.  |

## Escape caracteres especiales y espacios {#escape-special-characters-and-spaces}

Los siguientes caracteres se consideran especiales y requieren escape con el carácter `\`: `-` `!` `&&` `||` `>` `>=` `<` `<=` `(` `)` `{` `}` `[` `]` `"` `*` `?` `:` `\` `#` y espacios.
- `/` no se considera un carácter especial y no necesita ser escapado.
- `@` no se puede usar en consultas de búsqueda dentro de Log Explorer porque está reservado para [Attribute Search](#attributes-search).

No puede buscar caracteres especiales en un mensaje de registro. Puede buscar caracteres especiales cuando están dentro de un atributo.

Para buscar caracteres especiales, analícelos en un atributo con el [Grok Parser][1] y busque registros que contengan ese atributo.

## Búsqueda de atributos {#attributes-search}

Para buscar en un atributo específico, agregue `@` para especificar que está buscando en un atributo.

Por ejemplo, si el nombre de su atributo es **url** y desea filtrar por el valor **url** `www.datadoghq.com`, ingrese:

```
@url:www.datadoghq.com
```

### Reserved attributes {#reserved-attributes}

Los [Reserved attributes][8] como `host`, `source`, `status`, `service`, `trace_id` y `message` no requieren el prefijo `@`. Puede buscar estos atributos directamente:

```
service:web-app
status:error
host:i-1234567890abcdef0
```

**Notas**:

1. No**es** necesario definir una faceta para buscar en atributos y etiquetas.

2. Las búsquedas de atributos distinguen entre mayúsculas y minúsculas. Use [búsqueda de texto completo](#full-text-search) para obtener resultados que no distingan entre mayúsculas y minúsculas. Otra opción es usar el filtro `lowercase` con su [Grok Parser] durante el parseo para obtener resultados que no distingan entre mayúsculas y minúsculas durante la búsqueda.

3. La búsqueda de un valor de atributo que contiene caracteres especiales requiere escape o comillas dobles.
    - Por ejemplo, para un atributo `my_attribute` con el valor `hello:world`, busque usando: `@my_attribute:hello\:world` o `@my_attribute:"hello:world"`.
    - Para coincidir con un solo carácter especial o espacio, utilice el Wildcard `?`. Por ejemplo, para un atributo `my_attribute` con el valor `hello world`, realice la búsqueda utilizando: `@my_attribute:hello?world`.

Ejemplos:

| Consulta de búsqueda                                                         | Descripción                                                                                                                                                         |
|----------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `@http.url_details.path:"/api/v1/test"`                              | Busca todos los registros que coincidan con `/api/v1/test` en el atributo `http.url_details.path`.                                                                               |
| `@http.url:/api\-v1/*`                                             | Busca todos los registros que contengan un valor en el atributo `http.url` que comience con `/api-v1/`                                                                             |
| `@http.status_code:[200 TO 299] @http.url_details.path:/api\-v1/*` | Busca todos los registros que contengan un valor `http.status_code` entre 200 y 299, y que contengan un valor en el atributo `http.url_details.path` que comience con `/api-v1/` |
| `-@http.status_code:*`                                                | Busca todos los registros que no contengan el atributo `http.status_code` |

### Realice la búsqueda utilizando la notación CIDR {#search-using-cidr-notation}
El enrutamiento entre dominios sin clases (CIDR) es una notación que permite a los usuarios definir un rango de direcciones IP (también llamadas bloques CIDR) de forma sucinta. CIDR se utiliza más comúnmente para definir una red (como una VPC) o una subred (como una subred pública/privada dentro de una VPC).

Los usuarios pueden utilizar la función `CIDR()` para consultar atributos en registros utilizando la notación CIDR. A la función `CIDR()` se le debe pasar un atributo de registro como parámetro para filtrar, seguido de uno o varios bloques CIDR.

#### Ejemplos {#examples}
- `CIDR(@network.client.ip,13.0.0.0/8)` coincide y filtra los registros que tienen direcciones IP en el campo `network.client.ip` que se encuentran dentro del bloque CIDR 13.0.0.0/8.
- `CIDR(@network.ip.list,13.0.0.0/8, 15.0.0.0/8)` coincide y filtra los registros que tienen cualquier dirección IP en un atributo de matriz `network.ip.list` que se encuentren dentro de los bloques CIDR 13.0.0.0/8 o 15.0.0.0/8.
- `source:pan.firewall evt.name:reject CIDR(@network.client.ip, 13.0.0.0/8)` coincidiría y filtraría los eventos de rechazo del firewall de Palo Alto que se originan en la subred 13.0.0.0/8
- `source:vpc NOT(CIDR(@network.client.ip, 13.0.0.0/8)) CIDR(@network.destination.ip, 15.0.0.0/8)` mostrará todos los registros de VPC que no se originen en la subred 13.0.0.0/8 pero que estén designados para la subred de destino 15.0.0.0/8 porque desea analizar el tráfico de red en sus entornos entre subredes

La función `CIDR()` admite notaciones CIDR tanto de IPv4 como de IPv6 y funciona en Log Explorer, Live Tail, log widgets en Dashboards, log monitors y log configurations.

## Comodines {#wildcards}

Puede usar Wildcards con la búsqueda de texto libre. Sin embargo, solo busca términos en el mensaje de registro, el texto en la columna `content` en Log Explorer. Consulte [Búsqueda de texto completo](#full-text-search) si desea buscar un valor en un atributo de registro.

### Multi-character Wildcard {#multi-character-wildcard}

Para realizar una búsqueda con Multi-character Wildcard en el mensaje de registro (la columna `content` en Log Explorer), utilice el símbolo `*` de la siguiente manera:

* `service:web*` coincide con cada mensaje de registro que tiene un servicio que comienza con `web`.
* `web*` coincide con todos los mensajes de registro que comienzan con `web`.
* `*web` coincide con todos los mensajes de registro que terminan con `web`.

**Nota**: Wildcards solo funcionan como Wildcards fuera de las comillas dobles. Por ejemplo, `"*test*"` coincide con un registro que tiene la cadena `*test*` en su mensaje. `*test*` coincide con un registro que tiene la cadena test en cualquier parte de su mensaje.

Las búsquedas con Wildcard funcionan dentro de tags y atributos (con faceta o sin ella) con esta sintaxis. Esta consulta devuelve todos los servicios que terminan con la cadena `mongo`:
<p> </p>
<p></p>

```
service:*mongo
```

Las búsquedas con Wildcard también se pueden usar para buscar en el texto sin formato de un registro que no sea parte de un atributo de registro. Por ejemplo, esta consulta devuelve todos los registros con contenido (mensaje) que contengan la cadena `NETWORK`:

```
*NETWORK*
```

Sin embargo, este término de búsqueda no devuelve registros que contengan la cadena `NETWORK` si se encuentra en un atributo de registro y no forma parte del mensaje de registro.

### Wildcard de búsqueda {#search-wildcard}

Al buscar un valor de atributo o etiqueta que contenga caracteres especiales o que requiera secuencias de escape o comillas dobles, utilice el Wildcard `?` para coincidir con un solo carácter especial o espacio. Por ejemplo, para buscar un atributo `my_attribute` con el valor `hello world`: `@my_attribute:hello?world`.
<p> </p>

## Valores numéricos {#numerical-values}

Para buscar en un atributo numérico, primero [agréguelo como faceta][2]. Luego puede usar operadores numéricos (`<`, `>`, `<=` o `>=`) para realizar una búsqueda en facetas numéricas.
Por ejemplo, recupere todos los registros que tengan un tiempo de respuesta superior a 100ms con:
<p> </p>

```
@http.response_time:>100
```

Puede buscar un atributo numérico dentro de un rango específico. Por ejemplo, recupere todos sus errores 4xx con:

```
@http.status_code:[400 TO 499]
```

## Etiquetas {#tags}

Sus registros heredan etiquetas de [hosts][3] e [integraciones][4] que los generan. También se pueden usar en la búsqueda y como facetas:

* `test` está buscando la cadena "test".
* `env:(prod OR test)` coincide con todos los registros con la etiqueta `env:prod` o la etiqueta `env:test`
* `(env:prod AND -version:beta)` coincide con todos los registros que contienen la etiqueta `env:prod` y que no contienen la etiqueta `version:beta`

Si sus etiquetas no siguen las [mejores prácticas de etiquetas][5] y no utilizan la sintaxis `key:value`, utilice esta consulta de búsqueda:

* `tags:<MY_TAG>`

## Matrices {#arrays}

En el siguiente ejemplo, al hacer clic en el valor `Peter` en la faceta se devuelven todos los registros que contienen un atributo `users.names`, cuyo valor es `Peter` o una matriz que contiene `Peter`:

{{< img src="logs/explorer/search/array_search.png" alt="Matriz y facetas" style="width:80%;">}}

**Nota**: La búsqueda también se puede utilizar en atributos de matriz que no son de faceta mediante una sintaxis equivalente.

En el siguiente ejemplo, los registros de CloudWatch para Windows contienen una matriz de objetos JSON bajo `@Event.EventData.Data`. No puede crear una faceta en una matriz de objetos JSON, pero puede realizar búsquedas utilizando la siguiente sintaxis.

* `@Event.EventData.Data.Name:ObjectServer` coincide con todos los registros con la clave `Name` y el valor `ObjectServer`.

{{< img src="logs/explorer/search/facetless_query_json_arrray2.png" alt="Consulta sin facetas en una matriz de objetos JSON" style="width:80%;">}}

### Búsqueda de matriz anidada {#nested-array-search}

Para buscar un campo anidado en un atributo de matriz, utilice el prefijo `@` con la ruta completa del atributo. Log Explorer coincide con cualquier elemento de la matriz:

* `@network.ip.attributes.ip:2a02\:1810*` coincide con todos los registros donde al menos un elemento en la matriz `network.ip.attributes` tiene un campo `ip` que comienza con `2a02:1810`.

Para buscar coincidencias en registros donde una matriz contiene varios valores específicos, enumere los valores entre paréntesis:

* `@user_perms:(4 6)` coincide con todos los registros donde la matriz `user_perms` contiene tanto `4` como `6`.

Para buscar coincidencias en registros donde una matriz contiene cualquier valor dentro de un rango, utilice una consulta de rango:

* `@user_perms:[2 TO 6]` coincide con todos los registros donde la matriz `user_perms` contiene al menos un valor entre `2` y `6`.

## Campos calculados {#calculated-fields}

Los campos calculados funcionan como atributos de registro y se pueden utilizar para búsquedas, agregaciones, visualizaciones y para definir otros campos calculados. Utilice el prefijo `#` para hacer referencia a los nombres de los campos calculados.

{{< img src="logs/explorer/calculated_fields/calculated_field.png" alt="Un campo calculado llamado request_duration utilizado para filtrar resultados en Log Explorer" style="width:100%;" >}}

## Búsquedas guardadas {#saved-searches}

Los [Saved Views][6] contienen su consulta de búsqueda, columnas, horizonte temporal y faceta.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/logs/log_configuration/parsing
[2]: /es/logs/explorer/facets/
[3]: /es/infrastructure/
[4]: /es/integrations/#cat-log-collection
[5]: /es/getting_started/tagging/#tags-best-practices
[6]: /es/logs/explorer/saved_views/
[7]: /es/logs/explorer/facets/#facet-panel
[8]: /es/logs/log_configuration/attributes_naming_convention/#reserved-attributes