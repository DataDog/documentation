---
aliases:
- /es/integrations/faq/azure-troubleshooting
further_reading:
- link: /integrations/azure/
  tag: Documentación
  text: Integración de Azure
title: Solucionar problemas de Azure
---

## Encuentra el nombre de tu inquilino

1. Navega a [portal.azure.com][1].
2. En la barra lateral izquierda, selecciona **Azure Active Directory**.
3. En **Basic information**, encuentra el valor **Name**.

## No se puede iniciar sesión

Si experimentas un error al iniciar sesión mientras intentas instalar la integración de Azure, comunícate con el [equipo de asistencia de Datadog][3]. Cuando sea posible, adjunta una captura de pantalla.

## Métricas faltantes

Asegúrate de haber completado el proceso de instalación, que incluye otorgar permisos de lectura a la aplicación de Azure para las suscripciones que deseas monitorizar.

En el caso de las máquinas virtuales desplegadas con ARM, también debes activar los diagnósticos y seleccionar las métricas de la VM que deseas recopilar. Consulta **Habilitar diagnósticos** para obtener instrucciones.

Para otras métricas faltantes, comunícate con el [equipo de asistencia de Datadog][3] con la siguiente información sobre la métrica:
- dimensiones
- grupo de recursos
- nombre del recurso
- ID o nombre de la suscripción 

Adjunta una captura de pantalla de un gráfico de Azure Monitor que muestre un gráfico de la métrica. **Importante**: Grafica los puntos de datos de 1 minuto en la captura de pantalla.


### Habilitar diagnósticos

Al activar los diagnósticos, las máquinas virtuales desplegadas en ARM pueden recopilar información de logs que incluye métricas de CPU, red, etc. Sigue estas instrucciones:

1. Ve al [portal de Azure][1] y localiza tu máquina virtual.
2. Haz clic en **Diagnostics settings** en la sección **Monitoring**.
3. Selecciona una cuenta de almacenamiento y haz clic en **Enable guest-level monitoring**.
4. De forma predeterminada, las métricas y los logs básicos están habilitados. Ajústalos según tus preferencias.
5. Haz clic en **Save** para guardar los cambios.

    {{< img src="integrations/guide/azure_troubleshooting/azure_enable_diagnostics.png" alt="Información general de la configuración de los diagnósticos de Azure que aparece con No storage account highlighted en Pick a storage account and enable guest level monitoring habilitado" style="width:70%">}}

## Recopilación de logs automatizada

### Conflictos de denominación

Si tienes recursos de Azure con el mismo nombre de recurso que uno de los parámetros predeterminados, esto puede generar conflictos de nombres. Azure no permite que los recursos compartan nombres de recursos dentro de una suscripción individual. Datadog recomienda cambiar el nombre del parámetro predeterminado con un nombre único que no exista en tu entorno.

Por ejemplo, usa el indicador -EventhubName para cambiar el nombre predeterminado del recurso Eventhub, si ya posees un Eventhub llamado `datadog-eventhub`.

{{< code-block lang="powershell" filename="Ejemplo" >}}

./resource_deploy.ps1 -ApiKey <your_api_key> -SubscriptionId <your_subscription_id> -EventhubName <new-name>

{{< /code-block >}}

**Nota:** Ve a la sección [Parámetros opcionales][4] para encontrar la lista de parámetros configurables.

**Nota:** Si vuelves a ejecutar el script debido a esta falla, también se recomienda eliminar todo el grupo de recursos para crear una nueva ejecución.

### Proveedor de recursos no registrados

Si la ejecución de tu script falla debido al error **The subscription is not registered to use namespace 'Microsoft.EventHub'**:

Azure tiene proveedores de recursos para cada uno de sus servicios, por ejemplo: `Microsoft.EventHub` para Azure EventHub. Si tu suscripción de Azure no está registrada en un proveedor de recursos requerido, el script falla. Puedes solucionar este problema registrándote en el proveedor de recursos. Ejecuta este comando en CloudShell.

{{< code-block lang="powershell" filename="Ejemplo" >}}

az provider register --namespace Microsoft.EventHub

{{< /code-block >}}

### Exceder la cuota de logs

¿Instalaste el script exitosamente, pero aún no ves logs de actividad/plataforma dentro del Explorador de logs?

Asegúrate de no haber excedido tu [cuota diaria][5] para la retención de logs.

**Nota:** Se recomienda que tomes al menos cinco minutos después de la ejecución del script para comenzar a buscar logs en el Explorador de logs.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://portal.azure.com
[2]: https://manage.windowsazure.com
[3]: /es/help/
[4]: /es/integrations/azure/?tab=azurecliv20#optional-parameters
[5]: /es/logs/indexes/#set-daily-quota