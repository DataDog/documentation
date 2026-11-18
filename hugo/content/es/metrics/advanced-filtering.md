---
description: Filtre sus datos para reducir el contexto de las métricas devueltas.
further_reading:
- link: /getting_started/search/
  tag: Documentación
  text: Introducción a la búsqueda en Datadog
- link: /metrics/explorer/
  tag: Documentación
  text: Metrics Explorer
- link: /metrics/summary/
  tag: Documentación
  text: Metrics Catalog
- link: /metrics/distributions/
  tag: Documentación
  text: Distribución de métricas
- link: /logs/explorer/search_syntax/
  tag: Documentación
  text: Sintaxis de búsqueda y filtro de consultas de registros
- link: /dashboards/functions/exclusion/
  tag: Documentación
  text: Funciones de exclusión
title: Filtrado avanzado
---
## Descripción general {#overview}

Al utilizar Metrics Explorer, los monitores o Dashboards para consultar datos de métricas, puede filtrar los datos para reducir el contexto de las series temporales devueltas. Cualquier métrica se puede filtrar por etiqueta(s) utilizando el campo {{< ui >}}from{{< /ui >}} a la derecha de la métrica. 

También puede realizar filtrado avanzado con filtros booleanos o Wildcard para valores de etiquetas. Para consultas fuera de los datos de métricas, como registros, trazas, Network Monitoring, Real User Monitoring, Synthetics o Security, consulte la documentación de [Sintaxis de búsqueda de registros][1] para la configuración.

## Consultas con filtros booleanos {#boolean-filtered-queries}

Se admite la siguiente sintaxis para consultas de métricas con filtros booleanos: 

- `!`
- `,`
- `NOT`, `not`
- `AND`, `and`
- `OR`, `or`
- `IN`, `in`
- `NOT IN`, `not in`

Al incluir o excluir varias etiquetas:
* Incluir usa lógica `AND`
* Excluir usa lógica `OR`

Para obtener más información sobre las etiquetas, consulte la guía [Introducción al uso de etiquetas][2].

**Nota:** La sintaxis booleana simbólica (`!`, `,`) no se puede utilizar con operadores de sintaxis funcional (`NOT`, `AND`, `OR`, `IN`, `NOT IN`). La siguiente consulta se considera _inválida_: 
`avg:mymetric{env:prod AND !region:us-east}`

### Ejemplos de consultas con filtros booleanos {#boolean-filtered-query-examples}

Para usar los ejemplos a continuación, haga clic en el icono de código {{< ui >}}</>{{< /ui >}} para ver el editor de consultas en la interfaz de usuario y, luego, copie y pegue el ejemplo de consulta en el editor de consultas.

```
avg:system.cpu.user{env:staging AND (availability-zone:us-east-1a OR availability-zone:us-east-1c)} by {availability-zone}
```

{{< img src="metrics/advanced-filtering/graph_editor_code_option.mp4" alt="Haga clic en el icono de código para ver la consulta sin procesar" video=true >}}

```
avg:system.cpu.user{env:shop.ist AND availability-zone IN (us-east-1a, us-east-1b, us-east4-b)} by {availability-zone}
```

{{< img src="metrics/advanced-filtering/boolean_and_in.png" alt="Ejemplo booleano AND IN" style="width:100%;" >}}

```
avg:system.cpu.user{env:prod AND location NOT IN (atlanta,seattle,las-vegas)}
```

{{< img src="metrics/advanced-filtering/boolean_not_in.png" alt="Ejemplo booleano NOT IN" style="width:100%;" >}}

## Consultas filtradas con Wildcard {#wildcard-filtered-queries}

Se admite el filtrado de etiquetas con Wildcard de prefijo, sufijo y subcadena: 
-  `pod_name: web-*` 
-  `cluster:*-trace`
-  `node:*-prod-*`

### Ejemplos de consultas filtradas con Wildcard {#wildcard-filtered-query-examples}

```
avg:system.disk.in_use{!device:/dev/loop*} by {device}
```

{{< img src="metrics/advanced-filtering/wildcard_suffix_example.png" alt="Wildcard utilizado como sufijo" style="width:100%;" >}}

```
sum:kubernetes.pods.running{service:*-canary} by {service}
```

{{< img src="metrics/advanced-filtering/wildcard_prefix_example.png" alt="Wildcard utilizado como prefijo" style="width:100%;" >}}

```
avg:system.disk.utilized{region:*east*} by {region}
```

{{< img src="metrics/advanced-filtering/wildcard_infix.png" alt="Wildcard utilizado como infijo" style="width:100%;" >}}

## Funciones de exclusión {#exclusion-functions}

Agregue una [función de exclusión][3] a su consulta para: 
- Excluir valores N/A.
- Aplicar un valor mínimo o máximo a las métricas que cumplen con el umbral.
- Excluir valores que están por encima o por debajo de los valores de umbral.

Las funciones no eliminan puntos de datos de Datadog, pero sí los eliminan de sus visualizaciones.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/logs/explorer/search_syntax/
[2]: /es/getting_started/tagging/using_tags/
[3]: /es/dashboards/functions/exclusion/