---
further_reading:
- link: /cloudprem/configure/ingress/
  tag: Documentación
  text: Configuración de entrada de CloudPrem
title: Red
---

{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="CloudPrem está en vista previa" >}}
  Únete a la vista previa de CloudPrem para acceder a las nuevas funciones de gestión de logs autoalojadas.
{{< /callout >}}

Este documento proporciona una visión general de cómo CloudPrem y Datadog se comunican entre sí.

### Comportamiento por defecto: CloudPrem inicia la conexión

Por defecto, CloudPrem inicia una conexión de WebSocket connection con Datadog utilizando tu clave de API, sin necesidad de añadir un registro DNS y configurar una entrada pública. Esta configuración es útil para entornos con políticas de red estrictas que no permiten solicitudes entrantes.


### Comportamiento opcional: utilizar una entrada pública

Es posible configurar CloudPrem para desplegar una entrada pública para que Datadog pueda establecer una conexión.

La entrada pública permite que el plano de control y el servicio de consulta de Datadog gestionen y consulten los clústeres de CloudPrem a través de la Internet pública. Proporciona acceso seguro a la API gRPC de CloudPrem mediante autenticación mTLS. Puedes encontrar más información sobre la entrada de CloudPrem en su [página de configuración](/cloudprem/configure/ingress/).

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}