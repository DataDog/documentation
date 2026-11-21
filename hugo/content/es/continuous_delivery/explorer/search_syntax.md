---
description: Busque en todas sus ejecuciones de despliegue.
further_reading:
- link: /getting_started/search/
  tag: Documentación
  text: Introducción a la búsqueda en Datadog
- link: /continuous_delivery/explorer/facets
  tag: Documentación
  text: Obtenga más información sobre las facetas
title: Sintaxis de búsqueda del explorador de CD Visibility
---
{{< callout btn_hidden="true" header="false" >}}
CD Visibility está en visión preliminar. El acceso está limitado a las organizaciones ya inscritas.
{{< /callout >}}

## Descripción general {#overview}

Un filtro de consulta se compone de términos y operadores.

Existen dos tipos de términos:

* Un **término único** es una sola palabra como `test` o `hello`.

* Una **secuencia** es un grupo de palabras entre comillas dobles, como `"hello dolly"`.

Para combinar varios términos en una consulta compleja, puede usar cualquiera de los siguientes operadores booleanos que distinguen entre mayúsculas y minúsculas:

| **Operador** | **Descripción**                                                                                        | **Ejemplo**                  |
|--------------|--------------------------------------------------------------------------------------------------------|------------------------------|
| `AND`        | **Intersección**: ambos términos están en los eventos seleccionados (si no se agrega nada, se toma AND de forma predeterminada) | authentication AND failure   |
| `OR`         | **Unión**: cualquiera de los términos está contenido en los eventos seleccionados                                             | authentication OR password   |
| `-`          | **Exclusión**: el siguiente término NO está en el evento (se aplica a cada búsqueda de texto sin formato individual)       | authentication AND -password |

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}