---
aliases:
- /es/synthetics/explorer/search_syntax
- /es/continuous_testing/explorer/search_syntax/
description: Aprende a crear una consulta de búsqueda en el Explorador de monitorización
  Synthetic y de resultados de tests.
further_reading:
- link: /synthetics/explore/results_explorer
  tag: Documentación
  text: Más información sobre el Explorador de monitorización Synthetic y de resultados
    de tests
title: Sintaxis de búsqueda
---

## Información general

Una consulta se compone de términos y operadores. 

Existen dos tipos de términos:

- Un **término único** es una sola palabra como `test` o `hello`.
- Una **secuencia** es un grupo de palabras rodeadas de comillas dobles, como `"hello dolly"`.

Para combinar varios términos en una consulta compleja, puedes utilizar cualquiera de los siguientes operadores booleanos:

| Operador | Descripción                                                                                        |
|--------------|------------------------------------------------------------------------------------------------------- |
| `AND`        | **Intersección**: Ambos términos se encuentran en las vistas seleccionadas. Si no se utiliza ningún operador, se utiliza `AND` por defecto. |
| `OR`         | **Unión**: Cualquiera de los términos está contenido en las vistas seleccionadas.                                             |
| `-`          | **Exclusión**: El siguiente término no está en la vista.                                                  |

## Autocompletar

Utiliza la función de autocompletar de la barra de búsqueda para completar tus consultas con valores existentes:

## Valores numéricos

Puedes buscar un atributo numérico dentro de un rango específico. Por ejemplo, recupera todos los lotes con una duración media de entre dos y diez nanosegundos en la faceta **Duración**. La consulta de búsqueda se actualiza con `Duration:[2-10]`

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}