---
further_reading:
- link: /real_user_monitoring/explorer/search/
  tag: Documentación
  text: Búsqueda de tus eventos
title: Sintaxis de búsqueda
---

## Información general

Una consulta se compone de términos y operadores.

Existen dos tipos de términos:

* Un **término único** es una sola palabra como `test` o `hello`.

* Una **secuencia** es un grupo de palabras rodeadas de comillas dobles, como `"hello dolly"`.

Para combinar varios términos en una consulta compleja, puedes utilizar cualquiera de los siguientes operadores booleanos:

| **Operador** | **Descripción**                                                                                       |
|--------------|-------------------------------------------------------------------------------------------------------|
| `AND`        | **Intersección**: Ambos términos están en las vistas seleccionadas (si no se añade nada, se toma AND por defecto). |
| `OR`         | **Unión**: Cualquiera de los términos está contenido en las vistas seleccionadas.                                             |
| `-`          | **Exclusión**: El siguiente término no está en la vista.                                                  |

## Autocompletar

Utiliza la función de autocompletar de la barra de búsqueda para completar tus consultas con valores existentes:

{{< img src="real_user_monitoring/explorer/search/search_bar_autocomplete2.png" alt="Autocompletar la barra de búsqueda" style="width:90%;" >}}

## Escape de caracteres especiales

La búsqueda en un valor de faceta que contenga caracteres especiales requiere un escape o comillas dobles. Los siguientes caracteres se consideran especiales: `?`, `>`, `<`, `:`, `=`,`"`, `~`, `/` y `\` requiere escapar con el carácter `\`.

La misma lógica se aplica a los espacios en los nombres de las facetas de vistas. Las facetas de vistas no deben contener espacios, pero si los contienen, deben escaparse. 

Por ejemplo, si una faceta se llama `user.first name`, realiza una búsqueda de faceta escapando el espacio: `@user.first\ name:myvalue`.

## Comodines

Para realizar una búsqueda con comodín de varios caracteres, utiliza el símbolo `*`. Por ejemplo, `@http.url:https:\/\/*` coincide con todas las vistas que tienen una URL que empieza por `https://`.

## Valores numéricos

Utiliza `<`,`>`, `<=` o `>=` para realizar una búsqueda por atributos numéricos. Por ejemplo, recupera todas las sesiones con más de cinco errores: `@session.error.count:>5`.

Puedes buscar por un atributo numérico dentro de un rango específico. Por ejemplo, recupera todas las sesiones con un recuento de errores entre tres y diez: `@session.error.count:[3 TO 10]`.

## Ejemplos de búsquedas

`@view.url_path:"/department/sofas"`
: Busca todas las vistas que contienen `/department/sofas` en el atributo `@view.path`.

`@view.url_path:\/department\/sofas\/*`
: Busca todas las vistas que contienen un valor en el atributo `view.path` que empieza por `/department/sofas/`.

`@view.loading_time:[1s TO 3s] @view.url_path:\/department\/sofas\/*`
: Busca todas las vistas con un `loading_time` entre uno y tres segundos, con un valor en el atributo `@view.url_path` que empieza por `/department/sofas/`.

## Búsquedas guardadas

Las [Vistas guardadas][1] contienen tu consulta de búsqueda, columnas, orden de clasificación, rango temporal y facetas.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/real_user_monitoring/explorer/saved_views