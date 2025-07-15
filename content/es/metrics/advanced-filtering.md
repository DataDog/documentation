---
description: Filtra tus datos para acotar el contexto de las métricas devueltas.
further_reading:
- link: /metrics/explorer/
  tag: Documentación
  text: Explorador de métricas
- link: /metrics/summary/
  tag: Documentación
  text: Resumen de métricas
- link: /metrics/distributions/
  tag: Documentación
  text: Distribuciones de métricas
- link: /logs/explorer/search_syntax/
  tag: Documentación
  text: Filtro de búsqueda y sintaxis de búsqueda de logs
- link: /dashboards/functions/exclusion/
  tag: Documentación
  text: Funciones de exclusión
title: Filtrado avanzado
---

## Información general

Al utilizar el Explorador de métricas, los monitores o los dashboards para la consulta de métricas puedes filtrar los datos para acotar el contexto de las series temporales devueltas. Cualquier métrica puede filtrarse por etiqueta (tag) utilizando el campo **desde** a la derecha de la métrica. 

También puedes realizar filtrados avanzados con filtros de valores de etiquetas booleanos o comodines. Para realizar consultas fuera de los datos de métricas como logs, trazas (traces), Network Monitoring, Real User Monitoring, Synthetics o Seguridad, consulta la documentación de configuración [Sintaxis para la búsqueda de logs][1].

## Consultas booleanas filtradas

Se admite la siguiente sintaxis para las consultas de métricas con filtrado booleano:

- `!`
- `,`
- `NOT`, `not`
- `AND`, `and`
- `OR`, `or`
- `IN`, `in`
- `NOT IN`, `not in`

Cuándo incluir o excluir varias etiquetas:
* Para incluirlas, se emplea la lógica `AND`
* Para excluirlas, se emplea la lógica `OR`

Para más información sobre etiquetas, consulta la guía [Empezando con el uso de etiquetas][2].

**Nota:** La sintaxis booleana simbólica (`!`, `,`) no puede utilizarse con operadores de sintaxis funcional (`NOT`, `AND`, `OR`, `IN`, `NOT IN`). La siguiente consulta se considerar _inválida_: 
`avg:mymetric{env:prod AND !region:us-east}`

### Ejemplos de consultas con filtrado booleano

Para utilizar los siguientes ejemplos, haz clic en el icono de código `</>` para ver el editor de consultas en la interfaz de usuario y, a continuación, copia y pega el ejemplo de consulta en el editor de consultas.

```
avg:system.cpu.user{env:staging AND (availability-zone:us-east-1a OR availability-zone:us-east-1c)} by {availability-zone}
```

{{< img src="metrics/advanced-filtering/graph_editor_code_option.mp4" alt="Haz clic en el icono de código para ver la consulta sin procesar" video=true >}}

```
avg:system.cpu.user{env:shop.ist AND availability-zone IN (us-east-1a, us-east-1b, us-east4-b)} by {availability-zone}
```

{{< img src="metrics/advanced-filtering/boolean_and_in.png" alt="Ejemplo booleano AND IN" style="width:100%;" >}}
```
avg:system.cpu.user{env:prod AND location NOT IN (atlanta,seattle,las-vegas)}
```

{{< img src="metrics/advanced-filtering/boolean_not_in.png" alt="Ejemplo booleano NOT IN" style="width:100%;" >}}

## Consultas filtradas con comodín

Se admite el filtrado con etiquetas de prefijo, sufijo y comodín de subcadena: 
-  `pod_name: web-*` 
-  `cluster:*-trace`
-  `node:*-prod-*`

### Ejemplos de consultas filtradas con comodín

```
avg:system.disk.in_use{!device:/dev/loop*} by {device}
```

{{< img src="metrics/advanced-filtering/wildcard_suffix_example.png" alt="Comodín utilizado como sufijo" style="width:100%;" >}}

```
sum:kubernetes.pods.running{service:*-canary} by {service}
```

{{< img src="metrics/advanced-filtering/wildcard_prefix_example.png" alt="Comodín utilizado como prefijo" style="width:100%;" >}}

```
avg:system.disk.utilized{region:*east*} by {region}
```

{{< img src="metrics/advanced-filtering/wildcard_infix.png" alt="Comodín utilizado como infix" style="width:100%;" >}}

## Funciones de exclusión

Añade una [función de exclusión][3] a tu consulta para: 
- Excluye valores N/A.
- Aplica un valor mínimo o máximo a las métricas que lleguen al umbral.
- Excluye los valores que estén por encima o por debajo de los valores del umbral.

Las funciones no eliminan puntos de datos de Datadog, pero sí de tus visualizaciones.

## Para leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/logs/explorer/search_syntax/
[2]: /es/getting_started/tagging/using_tags/
[3]: /es/dashboards/functions/exclusion/