---
description: Filtra tus datos para reducir el contexto de las métricas devueltas.
further_reading:
- link: /getting_started/search/
  tag: Documentación
  text: Introducción a la búsqueda en Datadog
- link: /metrics/explorer/
  tag: Documentación
  text: Metrics Explorer
- link: /metrics/summary/
  tag: Documentación
  text: Metrics Summary
- link: /metrics/distributions/
  tag: Documentación
  text: Distribuciones de métricas
- link: /logs/explorer/search_syntax/
  tag: Documentación
  text: Filtro de consulta de registros y sintaxis de búsqueda
- link: /dashboards/functions/exclusion/
  tag: Documentación
  text: Funciones de exclusión
title: Filtrado avanzado
---
## Resumen {#overview}

Al usar el Metrics Explorer, seguimientos o tableros para consultar datos de métricas, puedes filtrar los datos para limitar el contexto de las series temporales devueltas. Cualquier métrica puede ser filtrada por etiqueta(s) usando el campo **de** a la derecha de la métrica. 

También puedes realizar filtrado avanzado con filtros de valores de etiqueta booleanos o de Wildcard. Para consultas fuera de los datos de métricas, como registros, trazas, Network Monitoring, Real User Monitoring, Sintéticos o Seguridad, consulta la documentación de [Sintaxis de Búsqueda de Registros][1] para la configuración.

## Consultas filtradas booleanas {#boolean-filtered-queries}

La siguiente sintaxis es compatible para consultas de métricas filtradas booleanas: 

- `!`
- `,`
- `NOT`, `not`
- `AND`, `and`
- `OR`, `or`
- `IN`, `in`
- `NOT IN`, `not in`

Al incluir o excluir múltiples etiquetas:
* Include usa la lógica `AND`
* Exclude usa la lógica `OR`

Para más información sobre etiquetas, consulte la guía [Introducción al uso de etiquetas][2].

**Nota:** La sintaxis booleana simbólica (`!`, `,`) no se puede usar con operadores de sintaxis funcional (`NOT`, `AND`, `OR`, `IN`, `NOT IN`). La siguiente consulta se considera _inválida_: 
`avg:mymetric{env:prod AND !region:us-east}`

### Ejemplos de consultas filtradas booleanas {#boolean-filtered-query-examples}

Para usar los ejemplos a continuación, haga clic en el ícono de código `</>` para ver el editor de consultas en la interfaz de usuario, y luego copie y pegue el ejemplo de consulta en el editor de consultas.

```
avg:system.cpu.user{env:staging AND (availability-zone:us-east-1a OR availability-zone:us-east-1c)} by {availability-zone}
```

{{< img src="metrics/advanced-filtering/graph_editor_code_option.mp4" alt="Haga clic en el ícono de código para ver la consulta en bruto" video=true >}}

```
avg:system.cpu.user{env:shop.ist AND availability-zone IN (us-east-1a, us-east-1b, us-east4-b)} by {availability-zone}
```

{{< img src="metrics/advanced-filtering/boolean_and_in.png" alt="Ejemplo booleano AND IN" style="width:100%;" >}}

```
avg:system.cpu.user{env:prod AND location NOT IN (atlanta,seattle,las-vegas)}
```

{{< img src="metrics/advanced-filtering/boolean_not_in.png" alt="Ejemplo booleano NOT IN" style="width:100%;" >}}

## Consultas filtradas con Wildcard {#wildcard-filtered-queries}

Se admiten filtros de etiquetas mediante Wildcard de prefijo, sufijo y subcadena: 
-  `pod_name: web-*` 
-  `cluster:*-trace`
-  `node:*-prod-*`

### Ejemplos de consultas filtradas por Wildcard {#wildcard-filtered-query-examples}

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

Agrega una [función de exclusión][3] a tu consulta para: 
- Excluir valores N/A.
- Aplicar un valor mínimo o máximo a las métricas que cumplen con el umbral.
- Excluir valores que están por encima o por debajo de los valores umbral.

Las funciones no eliminan puntos de datos de Datadog, pero sí eliminan puntos de datos de tus visualizaciones.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/logs/explorer/search_syntax/
[2]: /es/getting_started/tagging/using_tags/
[3]: /es/dashboards/functions/exclusion/