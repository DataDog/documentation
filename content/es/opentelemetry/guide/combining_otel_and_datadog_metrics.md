---
further_reading:
- link: /metrics/
  tag: Documentación
  text: Documentación de métricas
private: true
title: Combinación de métricas de OpenTelemetry y Datadog
---

## Información general

{{< callout url="#" btn_hidden="true" header="¡Obtén la vista previa!">}}
La función <code>equiv_otel()</code> se encuentra en vista previa. Si tienes algún comentario relacionado con esta función, ponte en contacto con el equipo de tu cuenta.
{{< /callout >}}

Datadog y OpenTelemetry (OTel) utilizan convenciones de nomenclatura diferentes para métricas de integración. Esta guía explica cómo combinar métricas de ambos sistemas en una única consulta mediante la función `equiv_otel` de Datadog.

## Retos a la hora de combinar métricas

Cuando se trabaja tanto con métricas de Datadog como de OTel, surgen dos retos principales. Examinémoslos utilizando como ejemplo la conexión de monitorización NGINX:

### Diferentes convenciones de nomenclatura

Datadog y OTel manejan las mismas medidas de forma diferente:
- Datadog: `nginx.net.connections` (una métrica específica para las conexiones activas)
- OTel: `nginx.connections_current` (captura todos los estados de conexión en una única métrica)
  - Requiere filtrado con `state:active` para que coincida con la métrica de conexiones activas de Datadog

### Limitaciones de la agregación

La simple combinación de consultas de métricas separadas puede dar lugar a resultados incorrectos. Por ejemplo, si intentas combinar estas consultas:
```
avg:nginx.net.connections
avg:nginx.connections_current{state:active}
```
Se obtiene una media de medias, no la media real de todas las series temporales. Esto ocurre porque las [funciones de métricas][1] tradicionales combinan los resultados de consultas separadas en lugar de tratar los datos como una única métrica.

## Combinación de métricas con la función equiv_otel

La función `equiv_otel` combina automáticamente las métricas equivalentes de Datadog y OTel en una sola consulta. Realiza lo siguiente:

- Gestiona automáticamente la traducción de nombres de métrica
- Agrega correctamente todas las series temporales como una sola métrica
- Funciona bidireccionalmente (Datadog a OTel u OTel a Datadog)
- Preserva la semántica de agregación de consultas

### Conversión de Datadog a OTel

Para incluir el equivalente de métricas de OTel en tu consulta, envuelve tu consulta de Datadog en `equiv_otel`:

```
equiv_otel(avg:nginx.net.connections)
```
Esta consulta:
1. Identifica la métrica equivalente de OTel (`nginx.connections_current{state:active}`)
2. Combina las series temporales de ambas métricas
3. Aplica la agregación (`avg`) a todos los puntos de datos

### Conversión de OTel a Datadog

Lo mismo funciona para incluir métricas de Datadog en una consulta de OTel:

```
equiv_otel(avg:nginx.connections_current{state:active})
```
La función sirve de la misma manera a la inversa, incluye automáticamente la métrica equivalente de Datadog (`nginx.net.connections`).

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}



[1]: /es/dashboards/functions