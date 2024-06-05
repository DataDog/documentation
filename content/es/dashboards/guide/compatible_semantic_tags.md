---
aliases:
- /es/dashboards/guide/semantic_colors
further_reading:
- link: /dashboards/guide/widget_colors/#categorical-palettes
  tag: Documentación
  text: Seleccionar colores adecuados para gráficos
kind: guía
title: Etiquetas (Tags) semánticas compatibles
---

## Información general

Para las series de datos compatibles, Datadog puede asignar colores según su significado. Cuando se detecta una etiqueta compatible, Datadog sugiere utilizar la paleta de colores semántica. Esta asigna automáticamente los datos a colores basados en el significado.

**Nota**: Para utilizar la paleta de colores semántica, una consulta debe agruparse con un único conjunto de etiquetas.

### Asignar etiquetas compatibles a colores según su significado

Por ejemplo, un código de estado de error se asigna al rojo, y uno de éxito, al verde.

{{< img src="/dashboards/guide/compatible_semantic_tags/semantic_option.png" alt="Opciones de colores semánticos en el editor de gráficos" style="width:100%;" >}}

### Asegurar la coherencia de los colores en todos los diagramas

Los gráficos con una paleta semántica utilizan el mismo color estable para cada etiquetar Esto te permite rastrear fácilmente una determinada etiqueta en diferentes gráficos.

### Comportamiento del agrupamiento

Se admiten consultas agrupadas con un único conjunto de etiquetas. Si se utilizan varios agrupadores con la paleta semántica, el uso de colores es coherente, pero no está basado en el significado.

{{< img src="/dashboards/guide/compatible_semantic_tags/multiple_tags.png" alt="Ejemplo de gráfico con varias etiquetas que utiliza la paleta semántica" style="width:100%;" >}}

Por ejemplo, consideremos una consulta que utiliza etiquetas tanto de `Status` como de`Service`. Aunque se seleccione la paleta semántica, los colores del diagrama ya no corresponderán a un significado específico (por ejemplo, el rojo ya no indica necesariamente "malo"). Sin embargo, cada combinación de estado/servicio conserva un uso de colores coherente para todos los diagramas.

## Claves de etiqueta compatibles

{{% semantic-color %}}

## Leer más

{{< partial name="whats-next/whats-next.html" >}}