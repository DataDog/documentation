---
description: Aprende a buscar todas las ejecuciones de tests en el Explorador de visibilidad
  de tests.
further_reading:
- link: /tests/search
  tag: Documentación
  text: Filtrar y agrupar tests
- link: /tests/explorer/facets
  tag: Documentación
  text: Más información sobre las facetas
title: Sintaxis de búsqueda del Explorador de visibilidad de tests
---

## Información general

Un filtro de consulta se compone de términos y operadores.

Existen dos tipos de términos:

* Un **término único** es una sola palabra, como `test` o `hello`.

* Una **secuencia** es un grupo de palabras delimitadas por comillas dobles, como `"hello dolly"`.

Para combinar varios términos en una consulta compleja, puedes utilizar cualquiera de los siguientes operadores booleanos que distinguen entre mayúsculas y minúsculas:

| **Operador** | **Descripción**                                                                                        | **Ejemplo**                  |
|--------------|--------------------------------------------------------------------------------------------------------|------------------------------|
| `AND`        | **Intersección**: ambos términos están en los eventos seleccionados (si no se añade nada, se toma AND por defecto). | autenticación AND error   |
| `OR`         | **Unión**: cualquiera de los dos términos está en los eventos seleccionados.                                             | autenticación OR contraseña   |
| `-`          | **Exclusión**: el término siguiente NO figura en el evento (se aplica a cada búsqueda individual de texto sin formato).                                                  | autenticación AND -contraseña |

## Buscar en atributos y etiquetas

No es obligatorio definir una faceta para buscar en atributos y etiquetas (tags). Para buscar en un atributo específico, añade `@` para especificar que estás buscando en un atributo. Las búsquedas de atributos distinguen entre mayúsculas y minúsculas. Utiliza la búsqueda de texto libre para obtener resultados que no distingan entre mayúsculas y minúsculas. 

Por ejemplo, si te interesa el atributo `git.repository.name` y quieres filtrar por el valor `Datadog/documentation`, utiliza `@git.repository.id:"github.com/Datadog/documentation"`.

La búsqueda del valor de un atributo que contiene caracteres especiales requiere escapes o comillas dobles. Por ejemplo, para un atributo `my_attribute` con el valor `hello:world`, busca utilizando: `@my_attribute:hello\:world` o `@my_attribute:"hello:world"`.

Para que coincida con un único carácter especial o espacio, utiliza el comodín `?`. Por ejemplo, para un atributo `my_attribute` con el valor `hello world`, busca utilizando: `@my_attribute:hello?world`.

Para obtener más información sobre las etiquetas, consulta [Usar etiquetas (tags)][2].

## Comodines

### Comodín de varios caracteres

Para realizar una búsqueda con un comodín de varios caracteres, utiliza el símbolo `*` como se indica a continuación:

* `service:web*` coincide con cada mensaje de log que tenga un servicio que empiece con `web`.
* `web*` coincide con todos los mensajes de log que empiecen con `web`.
* `*web` coincide con todos los mensajes de log que terminan con `web`.

Las búsquedas con comodines funcionan dentro de etiquetas y atributos (con o sin facetas) con esta sintaxis. Esta consulta devuelve todos los servicios que terminan con la cadena `mongo`:
<p> </p>
<p></p>

```
test.service:*mongo
```

### Buscar comodín

Cuando busques un valor de atributo o etiqueta que contenga caracteres especiales o requiera escape o comillas dobles, utiliza el comodín `?` para que coincida con un único carácter especial o espacio. Por ejemplo, para buscar un atributo `my_attribute` con el valor `hello world`: `@my_attribute:hello?world`.
<p> </p>

## Valores numéricos

Para buscar en un atributo numérico, primero [añádelo como faceta][1]. A continuación, puedes utilizar operadores numéricos (`<`, `>`, `<=` o `>=`) para buscar en facetas numéricas.

Por ejemplo, para recuperar todos los tests que tengan una duración superior a una semana, utiliza: `@duration:>=7days`.

## Etiquetas

Las ejecuciones de tests heredan las etiquetas de los [hosts][3] y las [integraciones][4] que las generan. Pueden utilizarse para buscar y también como facetas:

* `test` busca la cadena "test".
* `env:(prod OR test)` coincide con todas las ejecuciones de tests que contienen la etiqueta `env:prod` o la etiqueta `env:test`.
* `(env:prod AND -version:beta)` coincide con todas las ejecuciones de tests que contienen la etiqueta `env:prod` y que no contienen la etiqueta `version:beta`.

Si tus etiquetas no siguen las [prácticas recomendadas de etiquetas][5] y no tienen la sintaxis `key:value`, utiliza esta consulta de búsqueda: `tags:<MY_TAG>`.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tests/explorer/facets
[2]: /es/getting_started/tagging/using_tags
[3]: /es/infrastructure
[4]: /es/integrations
[5]: /es/getting_started/tagging/#define-tags