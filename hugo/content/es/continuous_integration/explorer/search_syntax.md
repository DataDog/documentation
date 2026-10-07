---
description: Aprende a buscar todas tus ejecuciones de pipelines en el Explorador
  de CI Visibility.
further_reading:
- link: /continuous_integration/search
  tag: Documentación
  text: Filtrar y agrupar pipelines
- link: /continuous_integration/explorer/facets
  tag: Documentación
  text: Más información sobre facetas
title: Sintaxis de búsqueda del Explorador de CI Visibility
---

## Información general

Un filtro de consulta se compone de términos y operadores.

Existen dos tipos de términos:

* Un **término único** es una sola palabra como `pipeline` o `hello`.

* Una **secuencia** es un grupo de palabras rodeadas de comillas dobles, como `"hello dolly"`.

Para combinar varios términos en una consulta compleja, puedes utilizar cualquiera de los siguientes operadores booleanos que distinguen entre mayúsculas y minúsculas:

| **Operador** | **Descripción**                                                                                        | **Ejemplo                  |
|--------------|--------------------------------------------------------------------------------------------------------|------------------------------|
| `AND`        | **Intersección**: ambos términos están en los eventos seleccionados (si no se añade nada, se toma AND por defecto). | autenticación Y fallo   |
| `OR`         | **Unión**: cualquiera de los dos términos está en los eventos seleccionados.                                             | autenticación O contraseña   |
| `-`          | **Exclusión**: el siguiente término NO figura en el evento (se aplica a cada búsqueda de texto sin formato individual).                                                  | autenticación Y contraseña |

## Buscar en atributos y etiquetas (tags)

No es obligatorio definir una faceta para buscar en atributos y etiquetas. Para buscar en un atributo específico, añade `@` para especificar que estás buscando en un atributo. Las búsquedas de atributos distinguen entre mayúsculas y minúsculas. Utiliza la búsqueda de texto sin formato para obtener resultados que no distingan entre mayúsculas y minúsculas. 

Por ejemplo, si te interesa el atributo `git.repository.id` y quieres filtrar por el valor `Datadog/documentation`, utiliza `@git.repository.id:"github.com/Datadog/documentation"`.

Para buscar un valor de atributo que contenga caracteres especiales, escápalo con una barra invertida o utiliza comillas dobles. Por ejemplo, para un atributo `my_attribute` con el valor `hello:world`, realiza la búsqueda utilizando: `@my_attribute:hello\:world` o `@my_attribute:"hello:world"`.

Para buscar una coincidencia con un único carácter especial o espacio, utiliza el comodín `?`. Por ejemplo, para un atributo `my_attribute` con los valores `hello world`, realiza la búsqueda utilizando: `@my_attribute:hello?world`.

Para obtener más información sobre etiquetas, consulta [Uso de etiquetas][2].

## Comodines

### Comodín de varios caracteres

Para realizar una búsqueda con un comodín de varios caracteres, utiliza el símbolo `*` como se indica a continuación:

* `service:web*` coincide con cada mensaje de log que tenga un servicio que empiece con `web`.
* `web*` coincide con todos los mensajes de log que empiecen con `web`.
* `*web` coincide con todos los mensajes de log que terminan con `web`.

**Nota**: Los comodines sólo funcionan fuera de las comillas dobles. Por ejemplo, `@ci.pipeline.name:"*test*"` coincide con un pipeline cuyo nombre contiene la cadena `*test*`, mientras que `@ci.pipeline.name:*test*` coincide con un pipeline cuyo nombre contiene la cadena `test`.

Las búsquedas con comodines funcionan dentro de etiquetas y atributos (facetados o no) con esta sintaxis. 

### Buscar comodín

Cuando busques un valor de atributo o etiqueta que contenga caracteres especiales o requiera caracteres de escape o comillas dobles, utiliza el comodín `?` para que coincida con un único carácter especial o espacio. Por ejemplo, para buscar un atributo `my_attribute` con el valor `hello world`: `@my_attribute:hello?world`.

## Valores numéricos

Para buscar en un atributo numérico, primero [añádelo como faceta][1]. A continuación, puedes utilizar operadores numéricos (`<`, `>`, `<=` o `>=`) para buscar en facetas numéricas.

Por ejemplo, para recuperar todas las ejecuciones de pipelines que tengan una duración superior a una semana, utiliza: `@duration:>=7days`.

## Etiquetas

Tus ejecuciones de pipelines heredan las etiquetas de los [hosts][3] y las [integraciones][4] que las generan. Se pueden utilizar en las búsquedas y también como facetas:

* `pipeline` busca la cadena "pipeline".
* `env:(prod OR pipeline)` coincide con todas las ejecuciones de pipelines con la etiqueta `env:prod` o la etiqueta `env:pipeline`.
* `(env:prod AND -version:beta)` coincide con todas las ejecuciones de pipelines con la etiqueta `env:prod`, pero sin la etiqueta `version:beta`.

Si tus etiquetas no siguen las [prácticas recomendadas para etiquetas][5] y no tienen la sintaxis `key:value`, utiliza esta consulta de búsqueda: `tags:<MY_TAG>`.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/continuous_integration/explorer/facets
[2]: /es/getting_started/tagging/using_tags
[3]: /es/infrastructure
[4]: /es/integrations
[5]: /es/getting_started/tagging/#define-tags