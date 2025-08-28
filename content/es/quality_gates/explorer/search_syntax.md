---
description: Busca todas tus puertas de calidad o ejecuciones de reglas.
further_reading:
- link: /quality_gates/search
  tag: Documentación
  text: Filtrar y agrupar puertas de calidad
- link: /quality_gates/explorer/facets
  tag: Documentación
  text: Más información sobre facetas
title: Sintaxis de búsqueda del Explorador de puertas de calidad
---

{{< callout url="#" btn_hidden="true" header="¡Únete a la vista previa!" >}}
Puertas de calidad está en vista previa.
{{< /callout >}}

## Información general

Un filtro de consulta se compone de términos y operadores.

Existen dos tipos de términos:

* Un **término único** es una sola palabra como `test` o `hello`.

* Una **secuencia** es un grupo de palabras rodeadas de comillas dobles, como `"hello dolly"`.

Para combinar varios términos en una consulta compleja, puedes utilizar cualquiera de los siguientes operadores booleanos que distinguen entre mayúsculas y minúsculas:

| **Operador** | **Descripción**                                                                                        | **Ejemplo**                  |
|--------------|--------------------------------------------------------------------------------------------------------|------------------------------|
| `AND`        | **Intersección**: ambos términos están en el eventos seleccionado. `AND` es el valor por defecto si no se especifica ningún operador entre términos. | `authentication AND failure`   |
| `OR`         | **Unión**: cualquiera de los dos términos está en los eventos seleccionados.                                             | `authentication OR password`   |
| `-`          | **Exclusión**: el siguiente término NO figura en el evento (se aplica a cada búsqueda de texto sin formato individual).                                                  | `authentication AND -password` |

## Buscar en atributos y etiquetas (tags)

No es obligatorio definir una faceta para buscar en atributos y etiquetas. Para buscar en un atributo específico, añade `@` para especificar que estás buscando en un atributo. Las búsquedas de atributos distinguen entre mayúsculas y minúsculas. Utiliza la búsqueda de texto sin formato para obtener resultados que no distingan entre mayúsculas y minúsculas. 

Por ejemplo, si te interesa el atributo `git.repository.name` y quieres filtrar por el valor `Datadog/documentation`, utiliza `@git.repository.name:DataDog/documentation`.

Para buscar un valor de atributo que contenga caracteres especiales, escápalo con una barra invertida o utiliza comillas dobles. Por ejemplo, para un atributo `my_attribute` con el valor `hello:world`, realiza la búsqueda utilizando: `@my_attribute:hello\:world` o `@my_attribute:"hello:world"`.

Para buscar una coincidencia con un único carácter especial o espacio, utiliza el comodín `?`. Por ejemplo, para un atributo `my_attribute` con los valores `hello world`, `hello-world` o `hello_world`, realiza la búsqueda utilizando: `@my_attribute:hello?world`.

Para obtener más información sobre etiquetas, consulta [Uso de etiquetas][2].

## Comodines

### Comodín de varios caracteres

Para realizar una búsqueda con un comodín de varios caracteres, utiliza el símbolo `*` como se indica a continuación:

* `service:web*` coincide con cada mensaje de log que tenga un servicio que empiece con `web`.
* `web*` coincide con todos los mensajes de log que empiecen con `web`.
* `*web` coincide con todos los mensajes de log que terminan con `web`.

Las búsquedas con comodines funcionan dentro de etiquetas (tags) y atributos (facetados o no) con esta sintaxis. Esta consulta devuelve todas las ramas que empiezan con `feature-`:

```
branch:feature-*
```

### Buscar comodín

Cuando busques un atributo o un valor de etiqueta que contenga caracteres especiales o requiera escape o comillas dobles, utiliza el comodín `?` para que coincida con un único carácter especial o espacio. Por ejemplo, para buscar un atributo `my_attribute` con el valor `hello world`, `hello-world` o `hello_world`, utiliza `@my_attribute:hello?world`.
<p> </p>



## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/quality_gates/explorer/facets
[2]: /es/getting_started/tagging/using_tags
[3]: /es/infrastructure
[4]: /es/integrations