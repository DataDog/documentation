---
further_reading:
- link: /logs/explorer/
  tag: Documentación
  text: Aprender a explorar tus logs
- link: /logs/guide/reduce_data_transfer_fees
  tag: Guía
  text: Enviar logs a Datadog mientras se reducen los costes de transferencia de datos
private: true
title: Enviar logs de Azure a Datadog desde un Event Hub
---

## Información general

Utiliza esta guía para configurar el reenvío de logs desde un Azure Event Hub a cualquier sitio de Datadog.

## Configuración

{{% collapse-content title="Portal de Azure" level="h4" expanded=false id="azure-portal-setup" %}}
Haz clic en el botón de abajo y rellena el formulario del portal de Azure. Los recursos de Azure necesarios para que los logs de actividad se transmitan a tu cuenta de Datadog se despliegan para ti. Para reenviar los logs de actividad, establece la opción **Send Activity Logs** (Enviar logs de actividad) en true.

[![Desplegar en Azure](https://aka.ms/deploytoazurebutton)](https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2FDataDog%2Fdatadog-serverless-functions%2Frefs%2Fheads%2Fmaster%2Fazure%2Feventhub_log_forwarder%2Fparent_template.json)
{{% /collapse-content %}} 

{{% collapse-content title="Terraform" level="h4" expanded=false id="terraform-setup" %}}
Consulta el [repositorio terraform-azure-datadog-log-forwarder][3] para el código de Terraform para configurar los recursos de Azure necesarios para recopilar y reenviar los logs de recursos de Azure a Datadog.
{{% /collapse-content %}} 

### Logs de la plataforma Azure

Después de crear los recursos de Azure necesarios, configura los ajustes de diagnóstico para cada fuente de log para enviar logs de plataforma de Azure (incluidos los logs de recurso) al Events Hub creado.

**Nota**: Los recursos solo pueden transmitirse a Event Hubs de la misma región de Azure.

## Solucionar problemas

### Conflictos de denominación

Si tienes recursos de Azure con el mismo nombre de recurso que uno de los parámetros predeterminados, esto puede generar conflictos de nombres. Azure no permite que los recursos compartan nombres de recursos dentro de una suscripción individual. Datadog recomienda cambiar el nombre del parámetro predeterminado con un nombre único que no exista en tu entorno.

**Nota**: Si estás volviendo a ejecutar la plantilla debido a este fallo, también se aconseja que elimines todo el grupo de recursos para crear un nuevo despliegue. 

### Proveedor de recursos no registrados

Si el despliegue de la plantilla falla debido al error **The subscription is not registered to use namespace 'Microsoft.EventHub'** (**La suscripción no está registrada para usar el espacio de nombre 'Microsoft.EventHub'**:):

Azure tiene proveedores de recursos para cada uno de sus servicios, por ejemplo: `Microsoft.EventHub` para Azure EventHub. Si tu suscripción de Azure no está registrada en un proveedor de recursos requerido, el script falla. Puedes solucionar este problema registrándote en el proveedor de recursos. Ejecuta este comando en CloudShell.

{{< code-block lang="shell" filename="Example" >}}

az provider register --namespace Microsoft.EventHub

{{< /code-block >}}

### Exceder la cuota de logs

¿Instalaste el script exitosamente, pero aún no ves logs de actividad/plataforma dentro del Explorador de logs?

Asegúrate de que no has superado tu [cuota diaria][2] de retención de logs.

**Nota**: Se aconseja dedicar al menos cinco minutos después de la ejecución del script para empezar a buscar logs en el Logs Explorer.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}


[2]: /es/logs/indexes/#set-daily-quota
[3]: https://github.com/Azure-Samples/terraform-azure-datadog-log-forwarder