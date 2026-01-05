---
aliases:
- /es/tracing/software_catalog/integrations
- /es/tracing/service_catalog/integrations
- /es/service_catalog/integrations
further_reading:
- link: /tracing/software_catalog/service_definition_api/
  tag: Documentación
  text: Más información sobre la API de definición de servicio
- link: /integrations/opsgenie/
  tag: Documentación
  text: Más información sobre la integración de OpsGenie
- link: /integrations/pagerduty/
  tag: Documentación
  text: Más información sobre la integración de PagerDuty
title: Uso de integraciones con Software Catalog
---
{{% site-region region="gov" %}}
<div class="alert alert-danger">
Las integraciones de PagerDuty y OpsGenie para Software Catalog no son compatibles con el sitio {{< region-param key=dd_datacenter code="true" >}}.
</div>
{{% /site-region %}}

## Información general

Cuando configuras una cuenta de servicio para una [integración de Datadog][10], puedes incorporar metadatos de tus integraciones en definiciones de servicio en [Software Catalog][9]. También puedes utilizar las características de autocompletado y validación al editar una definición de servicio en un [entorno de desarrollo integrado (IDE)](#ide-integrations).

## Integración de PagerDuty

Puedes añadir metadatos de PagerDuty a un servicio para que Software Catalog muestre y vincule información como quién está de guardia y si hay incidentes de PagerDuty activos para el servicio. Dado que solo se puede mostrar un usuario de guardia, Datadog selecciona el primer usuario por nivel de escalado y, a continuación, alfabéticamente por correo electrónico.

### Configuración

Puedes conectar cualquier servicio de tu [Directorio de servicios de PagerDuty][1]. Puedes asignar un servicio de PagerDuty para cada servicio en Software Catalog.

1. Si todavía no lo hiciste, configura la [integración de PagerDuty con Datadog][2].

2. Obtén tu clave de acceso a la API de PagerDuty como se describe en su documentación [API Access Key][3] (Clave de acceso a la API).

3. Ingresa la clave de acceso a la API en la [Configuración de la integración de Pagerduty][4] para finalizar la configuración.

  {{< img src="tracing/software_catalog/pagerduty-token.png" alt="Copia y pega la clave de la API en la configuración de Pagerduty." style="width:100%;" >}}

4. Actualiza la definición de servicio con la información de PagerDuty. Por ejemplo, pasa las siguientes líneas de configuración de `integrations` dentro de la [definición de servicio][5] completa:

   ```
   ...
   integrations:
     pagerduty: https://www.pagerduty.com/service-directory/shopping-cart
   ...
   ```

## Integración de OpsGenie

Puedes añadir metadatos de OpsGenie a un servicio para que Software Catalog muestre y vincule información como quién está de guardia en el servicio.

### Configuración

1. Si todavía no lo hiciste, configura la [integración de OpsGenie con Datadog][12].
2. Obtén tu clave de acceso a la API de OpsGenie como se describe en su documentación [API Key Management][13] (Gestión de la clave de API). Esta clave de API requiere **acceso de configuración** y derechos de acceso de **lectura**.
3. Añade una cuenta en la sección **Accounts** (Cuentas) de la parte inferior del [cuadro de integración][14], pega tu clave de acceso a la API de OpsGenie y selecciona la región para tu cuenta de OpsGenie.

   {{< img src="tracing/software_catalog/create_account1.png" alt="El proceso Create New Account (Crear nueva cuenta) en el cuadro de integración de OpsGenie" style="width:80%;" >}}
   {{< img src="tracing/software_catalog/create_account2.png" alt="El proceso Create New Account (Crear nueva cuenta) en el cuadro de integración de OpsGenie" style="width:80%;" >}}

4. Actualiza la definición de servicio con la información de OpsGenie para vincular tu servicio de OpsGenie con tu servicio de Datadog. Por ejemplo, pasa las siguientes líneas de configuración de `integrations` dentro de la [definición de servicio][5] completa:

   ```yaml
   "integrations": {
     "opsgenie": {
           "service-url": "https://www.opsgenie.com/service/123e4567-x12y-1234-a456-123456789000",
           "region": "US"
     }
   }
   ```

Una vez que hayas completado estos pasos, aparecerá un cuadro de información **On Call** (De guardia) en la pestaña **Ownership** (Propiedad) de un servicio en Software Catalog.

{{< img src="tracing/software_catalog/oncall_information.png" alt="Cuadro de información On Call (De guardia) en el que se muestra información de OpsGenie en Software Catalog" style="width:85%;" >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://support.pagerduty.com/docs/service-directory
[2]: /es/integrations/pagerduty/
[3]: https://support.pagerduty.com/docs/api-access-keys
[4]: https://app.datadoghq.com/integrations/pagerduty
[5]: /es/tracing/software_catalog/service_definition_api/
[6]: http://json-schema.org/
[7]: https://www.schemastore.org/json/
[8]: https://raw.githubusercontent.com/DataDog/schema/main/service-catalog/version.schema.json
[9]: /es/tracing/software_catalog/
[10]: /es/integrations/
[11]: https://app.datadoghq.com/services
[12]: /es/integrations/opsgenie
[13]: https://support.atlassian.com/opsgenie/docs/api-key-management/
[14]: https://app.datadoghq.com/integrations/opsgenie