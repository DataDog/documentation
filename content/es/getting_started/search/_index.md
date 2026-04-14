---
description: Aprende los fundamentos de la búsqueda y el filtrado en los productos
  de Datadog
further_reading:
- link: /getting_started/search/product_specific_reference
  tag: Documentación
  text: Búsqueda por producto
title: Introducción a la búsqueda en Datadog
---

## Información general

Datadog proporciona capacidades de búsqueda potentes y flexibles en todos sus productos y funciones. Esta guía introduce los conceptos básicos de la sintaxis de búsqueda en Datadog, para entender cómo construir consultas eficaces a través de logs, métricas, APM y más.


## Comprender la búsqueda en Datadog 

Datadog ofrece una forma unificada de consultar datos de todos los productos mediante una sintaxis de búsqueda basada en texto. Todos los datos de Datadog pueden explorarse y filtrarse mediante consultas, pero la sintaxis y el comportamiento difieren según el tipo de datos con los que se trabaje. Existen dos formatos de consulta principales en Datadog:
- **Consultas basadas en métricas**: se utilizan en métricas y Cloud Cost Management (CCM).
- **Consultas basadas en eventos**: se utilizan en la mayoría de los demás productos, incluidos logs, APM, RUM, eventos y seguridad.

Aunque ambos tipos de consulta permiten filtrar y analizar datos, su sintaxis no es intercambiable. Cada una sigue su propia estructura, operadores y funciones compatibles, diseñadas para el tipo de datos que maneja.

### Consultas basadas en métricas

Las consultas basadas en métricas están diseñadas para recuperar y analizar datos numéricos de series temporales. Se basan en etiquetas para filtrar métricas y suelen combinar funciones y operaciones aritméticas para calcular y visualizar tendencias a lo largo del tiempo (por ejemplo, latencia media, tasa de error o coste a lo largo del tiempo).

### Consultas basadas en eventos

Las consultas basadas en eventos se utilizan en la mayoría de los productos de Datadog para explorar registros individuales como entradas de log, trazas o eventos del navegador. Estas consultas suelen admitir búsquedas de texto completo, filtrado por facetas y lógica booleana para ayudar a los usuarios a encontrar, agrupar y analizar eventos relevantes.

En comparación con las consultas de métricas, las búsquedas basadas en eventos se centran en detectar y filtrar registros individuales en lugar de agregar valores numéricos. Constituyen la base del análisis exploratorio, ya que te ayudan a identificar patrones, solucionar problemas y profundizar en datos específicos antes de pasar a las métricas o los dashboards para conocer las tendencias a largo plazo.

## Sintaxis específica del producto

Cada producto de Datadog proporciona su propia sintaxis de búsqueda, adaptada al tipo de datos que maneja. La referencia de búsqueda específica del producto destaca las capacidades clave y los operadores exclusivos disponibles en cada producto, como las facetas de búsqueda de logs, los filtros de trazas de APM o las funciones de agregación de métrica. Estas referencias te ayudarán a comprender en qué difiere la sintaxis de los distintos productos de Datadog.

Más información en [Búsqueda por producto][1].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/getting_started/search/product_specific_reference