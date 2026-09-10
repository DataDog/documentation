---
aliases:
- /es/cloudprem/introduction/network/
further_reading:
- link: /byoc-logs/configure/ingress/
  tag: Documentación
  text: Configuración de ingreso de BYOC Logs
title: Red
---
Este documento proporciona una descripción general de cómo BYOC Logs (Bring Your Own Cloud) y Datadog se comunican entre sí.

## Conexión inversa (predeterminada) {#reverse-connection-default}

De forma predeterminada, los pods **searcher** de BYOC Logs inician una conexión WebSocket saliente a Datadog utilizando su clave de API. Cada pod searcher mantiene su propia conexión a `wss://<DD_SITE>/api/unstable/cloudprem-connection-gateway/connect`.

Datadog recomienda esta configuración porque:
- **No es necesario abrir puertos de entrada** en su red.
- **No se requiere ningún registro DNS ni ingreso público.**
- La conexión se inicia desde su infraestructura, lo que simplifica las políticas de firewall y seguridad.

### Qué fluye a través de la conexión inversa {#what-flows-through-the-reverse-connection}

| Datos | Dirección | Descripción |
|------|-----------|-------------|
| Consultas de búsqueda | Datadog → BYOC Logs | Consultas desde Log Explorer, tableros, monitores |
| Resultados de la consulta | BYOC Logs → Datadog | Entradas de registro coincidentes devueltas para su visualización |
| Gestión de índices | Datadog → BYOC Logs | Creación, actualizaciones y eliminación de índices |

### Requisitos de red {#network-requirements}

Los pods searcher requieren acceso **HTTPS de salida (puerto 443)** a su sitio de Datadog (por ejemplo, `app.datadoghq.com`). No se requiere conectividad de entrada.

Si su entorno utiliza un proxy HTTP, BYOC Logs admite la configuración de proxy estándar con las variables de entorno `HTTPS_PROXY`, `ALL_PROXY` y `NO_PROXY`.

### ¿Qué pods se conectan a Datadog? {#which-pods-connect-to-datadog}

Solo los pods **searcher** establecen la conexión inversa. Los indexadores, el plano de control, el metastore y el janitor no inician ninguna conexión con Datadog.

<div class="alert alert-warning">Mantenga al menos un pod searcher en ejecución cuando utilice la conexión inversa. Si todos los pods searcher no están disponibles o se escalan a <code>0</code>, Datadog no puede enrutar consultas ni solicitudes de gestión de índices a través de la conexión inversa hasta que un pod searcher se inicie y se vuelva a conectar.</div>

## Ingreso público (opcional) {#public-ingress-optional}

También es posible configurar BYOC Logs para implementar un ingreso público de modo que Datadog pueda establecer la conexión en la otra dirección.

El ingreso público permite que el plano de control y el servicio de consultas de Datadog gestionen y consulten los clústeres de BYOC Logs a través de internet pública. Proporciona acceso seguro a la API de gRPC de BYOC Logs mediante autenticación mTLS. Puede encontrar más información sobre el ingreso de BYOC Logs en su [página de configuración](/byoc-logs/configure/ingress/).

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}