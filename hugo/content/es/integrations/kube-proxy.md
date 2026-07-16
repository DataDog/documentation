---
aliases:
- /es/integrations/kube_proxy
app_id: kube-proxy
categories:
- rastreo
- kubernetes
- red
custom_kind: integración
description: Monitoriza Kube Proxy con Datadog.
integration_version: 9.0.0
media: []
supported_os:
- linux
- windows
- macos
title: Kube Proxy
---
## Información general

Obtén métricas del servicio kube_proxy en tiempo real para:

- Visualizar y monitorizar estados de kube_proxy
- Recibe notificaciones sobre fallos y eventos de kube_proxy.

## Configuración

### Configuración

La integración se basa en la opción `--metrics-bind-address` del kube-proxy, por defecto está vinculada a `127.0.0.1:10249`. Inicia el Agent en la red host si el kube-proxy también está en la red host (por defecto) o inicia el kube-proxy con `--metrics-bind-address=0.0.0.0:10249`

Edita el archivo `kube_proxy.d/conf.yaml` para que apunte a tu servidor y puerto, configura los maestros para monitorizar

**Nota**: Si editas el espacio de nombres y el nombre de la métrica, o añades cualquier otra métrica, se considerarán personalizados.

Contribuye a la integración si quieres añadir una métrica relevante.

### Validación

[Ejecuta el subcomando `status` del Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `kube_proxy` en la sección Checks.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **kubeproxy.cpu.time** <br>(gauge) | Tiempo total de CPU del usuario y del sistema transcurrido en segundos.<br>_Se muestra en segundos_ |
| **kubeproxy.mem.resident** <br>(gauge) | Tamaño de la memoria residente en bytes.<br>_Se muestra en bytes_ |
| **kubeproxy.mem.virtual** <br>(gauge) | Tamaño de la memoria virtual en bytes.<br>_Se muestra en bytes_ |
| **kubeproxy.rest.client.exec_plugin.certificate.rotation** <br>(gauge) | Histograma del número de segundos que ha durado el último certificado de cliente de complemento auth exec antes de ser rotado. Si los certificados de cliente del complemento auth exec no se utilizan, el histograma no contendrá datos.<br>_Se muestra como segundo_ |
| **kubeproxy.rest.client.exec_plugin.ttl** <br>(gauge) | Indicador del TTL (tiempo de vida) más corto de los certificados de cliente gestionados por el complemento auth exec. El valor se expresa en segundos hasta que caduque el certificado (negativo si ya ha caducado). Si los complementos auth exec no se utilizan o no gestionan certificados TLS, el valor será +INF. (alfa)<br>_Se muestra como segundo_ |
| **kubeproxy.rest.client.request.duration** <br>(gauge) | Latencia de la solicitud en segundos. Desglosada por verbo y URL.<br>_Se muestra en segundos_ |
| **kubeproxy.rest.client.requests** <br>(gauge) | Número de solicitudes HTTP divididas por método de código de estado y host<br>_Se muestra como solicitud_ |
| **kubeproxy.sync_proxy.rules.duration** <br>(gauge) | Latencia de SyncProxyRules en segundos (alfa)<br>_Se muestra como segundo_ |
| **kubeproxy.sync_proxy.rules.endpoint_changes.pending** <br>(gauge) | Cambios de endpoint pendientes de reglas de proxy (alfa)|
| **kubeproxy.sync_proxy.rules.endpoint_changes.total** <br>(gauge) | Cambios de endpoint acumulados por reglas de proxy (alfa)|
| **kubeproxy.sync_proxy.rules.iptables** <br>(gauge) | Número de reglas proxy iptables programadas (alfa)|
| **kubeproxy.sync_proxy.rules.iptables.restore_failures** <br>(gauge) | Fallos acumulados de restauración de proxy iptables (alfa)|
| **kubeproxy.sync_proxy.rules.last_queued_timestamp** <br>(gauge) | La última vez que se puso en cola una sincronización de reglas proxy (alfa)<br>_Se muestra como segundo_ |
| **kubeproxy.sync_proxy.rules.last_timestamp** <br>(gauge) | La última vez que se sincronizaron correctamente las reglas proxy (alfa)<br>_Se muestra como segundo_ |
| **kubeproxy.sync_proxy.rules.latency.count** <br>(gauge) | Recuento de latencia de SyncProxyRules (alfa)|
| **kubeproxy.sync_proxy.rules.latency.sum** <br>(gauge) | Suma de latencia de SyncProxyRules (alfa)<br>_Se muestra como microsegundo_ |
| **kubeproxy.sync_proxy.rules.service_changes.pending** <br>(gauge) | Cambios en el servicio pendientes de reglas de proxy (alfa)|
| **kubeproxy.sync_proxy.rules.service_changes.total** <br>(gauge) | Cambios en el servicio acumulados por reglas de proxy (alfa)|

### Eventos

Kube Proxy no incluye ningún evento.

### Checks de servicio

**kubeproxy.up**

Devuelve `CRITICAL` si Kube Proxy no está en buen estado.

_Estados: ok, critical_

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).