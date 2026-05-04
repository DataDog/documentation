---
aliases:
- /es/logs/search-syntax
- /es/logs/search_syntax/
description: Busca en todos tus registros.
further_reading:
- link: /getting_started/search/
  tag: Documentación
  text: Introducción a la búsqueda en Datadog
- link: /logs/explorer/#visualize
  tag: Documentación
  text: Aprende cómo visualizar registros
- link: /logs/explorer/#patterns
  tag: Documentación
  text: Detecta patrones dentro de tus registros
- link: /logs/log_configuration/processors
  tag: Documentación
  text: Aprende cómo procesar tus registros
- link: /logs/explorer/saved_views/
  tag: Documentación
  text: Conoce las Vistas Guardadas
- link: /logs/explorer/calculated_fields/formulas
  tag: Documentación
  text: Aprende más sobre las Fórmulas de Campos Calculados
title: Sintaxis de Búsqueda de Registros
---
## Resumen {#overview}

Un filtro de consulta se compone de términos y operadores.

Hay dos tipos de términos:

* Un **término único** es una sola palabra como `test` o `hello`.

* Una **secuencia** es un grupo de palabras rodeadas por comillas dobles, como `"hello dolly"`.

Para combinar múltiples términos en una consulta compleja, puedes usar cualquiera de los siguientes operadores booleanos sensibles a mayúsculas y minúsculas:

|              |                                                                                                        |                              |
|--------------|--------------------------------------------------------------------------------------------------------|------------------------------|
| **Operador** | **Descripción**                                                                                        | **Ejemplo**                  |
| `AND`        | **Intersección**: ambos términos están en los eventos seleccionados (si no se agrega nada, se toma AND por defecto) | autenticación Y fallo   |
| `OR`         | **Unión**: cualquiera de los términos está contenido en los eventos seleccionados                                             | autenticación O contraseña   |
| `-`          | **Exclusión**: el siguiente término NO está en el evento (aplica a cada búsqueda de texto sin formato individual)                                                  | autenticación Y -contraseña |

## Búsqueda de texto completo {#full-text-search}

<div class="alert alert-danger">La función de búsqueda de texto completo solo está disponible en la Gestión de Registros y funciona en consultas de monitor, tablero y cuaderno. La sintaxis de búsqueda de texto completo no se puede utilizar para definir filtros de índice, filtros de archivo, filtros de canalización de registros, filtros de rehidratación, o en Live Tail. </div>

Utilice la sintaxis `*:search_term` para realizar una búsqueda de texto completo en todos los atributos de registro, incluyendo el mensaje del registro.

### Ejemplo de término único {#single-term-example}

| Sintaxis de búsqueda | Tipo de búsqueda | Descripción |
| ------------- | ----------- | --------------------------------------------------------- |
| `*:hello`     | Texto completo | Busca en todos los atributos de registro la cadena exacta `hello`. |
| `hello`       | Texto libre | Busca solo en los atributos `message`, `@title`, `@error.message` y `@error.stack` la cadena exacta `hello`.       |

### Ejemplo de término de búsqueda con comodín {#search-term-with-wildcard-example}

| Sintaxis de búsqueda | Tipo de búsqueda | Descripción |
| ------------- | ----------- | ------------------------------------------------------------------------------------------- |
| `*:hello`     | Texto completo | Busca en todos los atributos de registro la cadena exacta `hello`.                                   |
| `*:hello*`    | Texto completo | Busca en todos los atributos de registro cadenas que comienzan con `hello`. Por ejemplo, `hello_world`.  |

### Ejemplo de múltiples términos con coincidencia exacta {#multiple-terms-with-exact-match-example}

| Sintaxis de búsqueda | Tipo de búsqueda | Descripción |
| ------------------- | ----------- |--------------------------------------------------------------------------------------------------- |
| `*:"hello world"`   | Texto completo | Busca en todos los atributos de registro la cadena exacta `hello world`.                                    |
| `hello world`       | Texto libre | Busca solo en el mensaje del registro las palabras `hello` y `world`. Por ejemplo `hello beautiful world`.  |

## Escapar caracteres especiales y espacios {#escape-special-characters-and-spaces}

Los siguientes caracteres se consideran especiales y requieren ser escapados con el carácter `\`: `=` `-` `!` `&&` `||` `>` `>=` `<` `<=` `(` `)` `{` `}` `[` `]` `"` `*` `?` `:` `\` `#`, y espacios.
- `/` no se considera un carácter especial y no necesita ser escapado.
- `@` no se puede usar en consultas de búsqueda dentro de Logs Explorer porque está reservado para [Búsqueda de Atributos](#attributes-search).

No se puede buscar caracteres especiales en un mensaje de registro. Se pueden buscar caracteres especiales cuando están dentro de un atributo.

Para buscar caracteres especiales, conviértelos en un atributo con el [Grok Parser][1], y busca registros que contengan ese atributo.

## Búsqueda de atributos {#attributes-search}

Para buscar en un atributo específico, agrega `@` para especificar que estás buscando en un atributo.

Por ejemplo, si el nombre de tu atributo es **url** y deseas filtrar por el valor **url**, ingresa:

```
@url:www.datadoghq.com
```

### Atributos reservados {#reserved-attributes}

[Atributos reservados][8] como `host`, `source`, `status`, `service`, `trace_id` y `message` no requieren el prefijo `@`. Puedes buscar estos atributos directamente:

```
service:web-app
status:error
host:i-1234567890abcdef0
```

**Notas**:

1. No es **necesario** definir un facet para buscar en atributos y etiquetas.

2. Las búsquedas de atributos son sensibles a mayúsculas y minúsculas. Usa [búsqueda de texto completo](#full-text-search) para obtener resultados que no distingan entre mayúsculas y minúsculas. Otra opción es usar el `lowercase` filtro con tu parser Grok mientras analizas para obtener resultados que no distingan entre mayúsculas y minúsculas durante la búsqueda.

3. Buscar un valor de atributo que contenga caracteres especiales requiere escapar o usar comillas dobles.
    - Por ejemplo, para un atributo `my_attribute` con el valor `hello:world`, busca usando: `@my_attribute:hello\:world` o `@my_attribute:"hello:world"`.
    - Para coincidir con un solo carácter especial o espacio, usa el `?` comodín. Por ejemplo, para un atributo `my_attribute` con el valor `hello world`, busca usando: `@my_attribute:hello?world`.

Ejemplos:

| Consulta de búsqueda                                                         | Descripción                                                                                                                                                         |
|----------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `@http.url_details.path:"/api/v1/test"`                              | Busca en todos los registros que coincidan con `/api/v1/test` en el atributo `http.url_details.path`.                                                                               |
| `@http.url:/api\-v1/*`                                             | Busca en todos los registros que contengan un valor en el atributo `http.url` que comience con `/api-v1/`                                                                             |
| `@http.status_code:[200 TO 299] @http.url_details.path:/api\-v1/*` | Busca en todos los registros que contengan un valor `http.status_code` entre 200 y 299, y que contengan un valor en el atributo `http.url_details.path` que comience con `/api-v1/` |
| `-@http.status_code:*`                                                | Busca en todos los registros que no contengan el atributo `http.status_code` |

### Busca utilizando notación CIDR {#search-using-cidr-notation}
El Enrutamiento Inter-Dominio Sin Clase (CIDR) es una notación que permite a los usuarios definir un rango de direcciones IP (también llamadas bloques CIDR) de manera concisa. CIDR se utiliza comúnmente para definir una red (como una VPC) o una subred (como una subred pública/privada dentro de una VPC).

Los usuarios pueden usar la función `CIDR()` para consultar atributos en registros utilizando notación CIDR. La función `CIDR()` necesita recibir un atributo de registro como parámetro para filtrar, seguido de uno o múltiples bloques CIDR.

#### Ejemplos {#examples}
- `CIDR(@network.client.ip,13.0.0.0/8)` coincide y filtra registros que tienen direcciones IP en el campo `network.client.ip` que caen bajo el bloque CIDR 13.0.0.0/8.
- `CIDR(@network.ip.list,13.0.0.0/8, 15.0.0.0/8)` coincide y filtra registros que tienen cualquier dirección IP en un atributo de arreglo `network.ip.list` que caen bajo los bloques CIDR 13.0.0.0/8 o 15.0.0.0/8.
- `source:pan.firewall evt.name:reject CIDR(@network.client.ip, 13.0.0.0/8)` coincidiría y filtraría eventos de rechazo del firewall palo alto que se originan en la subred 13.0.0.0/8
- `source:vpc NOT(CIDR(@network.client.ip, 13.0.0.0/8)) CIDR(@network.destination.ip, 15.0.0.0/8)` mostrará todos los registros de VPC que no se originan en la subred 13.0.0.0/8 pero están designados para la subred de destino 15.0.0.0/8 porque desea analizar el tráfico de red en sus entornos entre subredes

La función `CIDR()` admite tanto notaciones CIDR IPv4 como IPv6 y funciona en Log Explorer, Live Tail, widgets de registro en Dashboards, monitores de registro y configuraciones de registro.

## Wildcards {#wildcards}

Puede usar comodines con búsqueda de texto libre. Sin embargo, solo busca términos en el mensaje de registro, el texto en la columna `content` en Log Explorer. Vea [Búsqueda de texto completo](#full-text-search) si desea buscar un valor en un atributo de registro.

### Comodín de múltiples caracteres {#multi-character-wildcard}

Para realizar una búsqueda con comodines de múltiples caracteres en el mensaje de registro (la columna `content` en Log Explorer), utiliza el símbolo `*` de la siguiente manera:

* `service:web*` coincide con cada mensaje de registro que tiene un servicio que comienza con `web`.
* `web*` coincide con todos los mensajes de registro que comienzan con `web`.
* `*web` coincide con todos los mensajes de registro que terminan con `web`.

**Nota**: Los comodines solo funcionan como comodines fuera de las comillas dobles. Por ejemplo, `"*test*"` coincide con un registro que tiene la cadena `*test*` en su mensaje. `*test*` coincide con un registro que tiene la cadena test en cualquier parte de su mensaje.

Las búsquedas con comodines funcionan dentro de etiquetas y atributos (facetados o no) con esta sintaxis. Esta consulta devuelve todos los servicios que terminan con la cadena `mongo`:
<p> </p>
<p></p>

```
service:*mongo
```

Las búsquedas con comodines también se pueden utilizar para buscar en el texto plano de un registro que no es parte de un atributo de registro. Por ejemplo, esta consulta devuelve todos los registros con contenido (mensaje) que contienen la cadena `NETWORK`:

```
*NETWORK*
```

Sin embargo, este término de búsqueda no devuelve registros que contienen la cadena `NETWORK` si está en un atributo de registro y no es parte del mensaje de registro.

### Buscar comodín {#search-wildcard}

Al buscar un valor de atributo o etiqueta que contenga caracteres especiales o que requiera escape o comillas dobles, utiliza el comodín `?` para coincidir con un solo carácter especial o espacio. Por ejemplo, para buscar un atributo `my_attribute` con el valor `hello world`: `@my_attribute:hello?world`.
<p> </p>

## Valores numéricos {#numerical-values}

Para buscar en un atributo numérico, primero [añádelo como un facetado][2]. Luego puedes usar operadores numéricos (`<`,`>`, `<=` o `>=`) para realizar una búsqueda en facetados numéricos.
Por ejemplo, recupera todos los registros que tienen un tiempo de respuesta superior a 100 ms con:
<p> </p>

```
@http.response_time:>100
```

Puedes buscar un atributo numérico dentro de un rango específico. Por ejemplo, recupera todos tus errores 4xx con:

```
@http.status_code:[400 TO 499]
```

## Etiquetas {#tags}

Tus registros heredan etiquetas de [hosts][3] y [integraciones][4] que las generan. Pueden ser utilizadas en la búsqueda y también como facetas:

* `test` está buscando la cadena "test".
* `env:(prod OR test)` coincide con todos los registros que tienen la etiqueta `env:prod` o la etiqueta `env:test`
* `(env:prod AND -version:beta)` coincide con todos los registros que contienen la etiqueta `env:prod` y que no contienen la etiqueta `version:beta`

Si tus etiquetas no siguen [las mejores prácticas de etiquetas][5] y no utilizan la sintaxis `key:value`, usa esta consulta de búsqueda:

* `tags:<MY_TAG>`

## Arreglos {#arrays}

En el siguiente ejemplo, al hacer clic en el valor `Peter` en la faceta, se devuelven todos los registros que contienen un atributo `users.names`, cuyo valor es `Peter` o un arreglo que contiene `Peter`:

{{< img src="logs/explorer/search/array_search.png" alt="Arreglo y Facetas" style="width:80%;">}}

**Nota**: La búsqueda también se puede utilizar en atributos de arreglo no facetados utilizando una sintaxis equivalente.

En el siguiente ejemplo, los registros de CloudWatch para Windows contienen un arreglo de objetos JSON bajo `@Event.EventData.Data`. No puedes crear una faceta en un arreglo de objetos JSON, pero puedes buscar utilizando la siguiente sintaxis.

* `@Event.EventData.Data.Name:ObjectServer` coincide con todos los registros que tienen la clave `Name` y el valor `ObjectServer`.

{{< img src="logs/explorer/search/facetless_query_json_arrray2.png" alt="Consulta sin facetas en un arreglo de objetos JSON" style="width:80%;">}}

### Búsqueda de arreglo anidado {#nested-array-search}

Para buscar un campo anidado en un atributo de arreglo, utiliza el prefijo `@` con la ruta completa del atributo. Log Explorer coincide con cualquier elemento en el arreglo:

* `@network.ip.attributes.ip:2a02\:1810*` coincide con todos los registros donde al menos un elemento en el arreglo `network.ip.attributes` tiene un campo `ip` que comienza con `2a02:1810`.

Para coincidir con registros donde un arreglo contiene múltiples valores específicos, enumere los valores entre paréntesis:

* `@user_perms:(4 6)` coincide con todos los registros donde el arreglo `user_perms` contiene tanto `4` como `6`.

Para coincidir con registros donde un arreglo contiene cualquier valor dentro de un rango, use una consulta de rango:

* `@user_perms:[2 TO 6]` coincide con todos los registros donde el arreglo `user_perms` contiene al menos un valor entre `2` y `6`.

## Campos calculados {#calculated-fields}

Los campos calculados funcionan como atributos de registro y pueden ser utilizados para búsqueda, agregación, visualización y definición de otros campos calculados. Use el prefijo `#` para hacer referencia a los nombres de los campos calculados.

{{< img src="logs/explorer/calculated_fields/calculated_field.png" alt="Un campo calculado llamado request_duration utilizado para filtrar resultados en el Explorador de Registros" style="width:100%;" >}}

## Búsquedas guardadas {#saved-searches}

[Vistas Guardadas][6] contienen su consulta de búsqueda, columnas, horizonte temporal y faceta.

## Lectura Adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/logs/log_configuration/parsing
[2]: /es/logs/explorer/facets/
[3]: /es/infrastructure/
[4]: /es/integrations/#cat-log-collection
[5]: /es/getting_started/tagging/#tags-best-practices
[6]: /es/logs/explorer/saved_views/
[7]: /es/logs/explorer/facets/#facet-panel
[8]: /es/logs/log_configuration/attributes_naming_convention/#reserved-attributes