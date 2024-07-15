---
further_reading:
- link: /logs/explorer/
  tag: Documentación
  text: Aprende a explorar tus logs
title: Enviar logs de Azure con el recurso de Datadog
---

{{< site-region region="us3" >}}

## Información general

Utiliza esta guía para configurar y gestionar el registro directamente desde tus suscripciones de Azure a Datadog a través del recurso [Datadog en Azure][7]. Puedes gestionar la recopilación de tres tipos de logs de Azure. Encontrarás instrucciones y detalles adicionales en las secciones siguientes:

   - [Logs de actividad](#activity-logs)
   - [Logs de recurso de Azure](#azure-resource-logs)
   - [Logs de Azure Active Directory (Azure AD)](#azure-active-directory-azure-ad-logs)

**Nota**: El recurso de Datadog en Azure solo está disponible para organizaciones de Datadog en el sitio US3 de Datadog. Si utilizas cualquier otro [sitio de Datadog][5], consulta la guía [Enviar logs de Azure a Datadog][6] para conocer las opciones de configuración.

## Logs de actividad

Brinda información sobre las operaciones en tus recursos en el [plano de control][1]. También se incluyen actualizaciones sobre los eventos de estado del servicio. Utiliza el log de actividad para determinar el qué, el quién y el cuándo de cualquier operación de escritura (`PUT`, `POST`, `DELETE`).

Para enviar los logs de actividad a Datadog, selecciona **Send subscription activity logs** (Enviar logs de actividad de suscripción). Si esta opción se deja sin marcar, no se enviará ninguno de los logs de actividad a Datadog.

<div class="alert alert-warning">Cuando se habilita la recopilación de logs, el recurso de Datadog modifica automáticamente las configuraciones de registro de los <a href="https://learn.microsoft.com/azure/app-service/">servicios de aplicación</a>. Azure activa un <strong>reinicio</strong> para los servicios de aplicación cuando cambian sus configuraciones de registro.</div>

## Logs de recursos de Azure

Brinda información sobre las operaciones realizadas en los recursos de Azure en el [plano de datos][1]. Por ejemplo, obtener un secreto de una bóveda de claves o realizar una solicitud a una base de datos son operaciones del plano de datos. El contenido de los logs de recursos varía según el servicio de Azure y el tipo de recurso.

Para enviar los logs de recursos de Azure a Datadog, selecciona **Send Azure resource logs for all defined resources** (Enviar logs de recursos de Azure para todos los recursos definidos). Los tipos de logs de recursos de Azure se enumeran en las [categorías Log de recursos de monitor de Azure][2]. Cuando seleccionas esta opción, todos los logs de recursos se envían a Datadog, incluidos los nuevos recursos creados en la suscripción.

Opcionalmente, puedes filtrar el conjunto de recursos de Azure al enviar logs a Datadog utilizando las etiquetas de recurso de Azure.

### Reglas de etiqueta para el envío de logs

- Los recursos de Azure con etiquetas `include` envían logs a Datadog.
- Los recursos de Azure con etiquetas `exclude` no envían logs a Datadog.
- Si hay un conflicto entre las normas de inclusión y exclusión, la exclusión tiene prioridad.

Por ejemplo, la captura de pantalla siguiente muestra una regla de etiqueta en la que solo las máquinas virtuales, los conjuntos a escala de máquinas virtuales y los planes de servicio de aplicaciones etiquetados como `Datadog = True` envían métricas y logs a Datadog.

{{< img src="integrations/azure/azure-us3-create-dd-resource3.png" alt="Azure US3 crea logs de recursos de Datadog " responsive="true" style="width:90%;">}}

## Logs de Azure Active Directory (Azure AD)

Los logs de Azure AD contienen el historial de la actividad de inicio de sesión y un rastro de auditoría de los cambios realizados en Azure AD para un inquilino concreto. Para enviar estos logs a Datadog, primero completa el proceso para crear un recurso de Datadog. Una vez que tengas un recurso de Datadog en Azure, sigue los pasos de configuración de la guía [Datadog en el Portal de Azure][3].

[1]: https://docs.microsoft.com/en-us/azure/azure-resource-manager/management/control-plane-and-data-plane
[2]: https://docs.microsoft.com/en-us/azure/azure-monitor/essentials/resource-logs-categories
[3]: https://docs.datadoghq.com/es/integrations/guide/azure-portal/#azure-active-directory-logs
[4]: https://portal.azure.com/#blade/HubsExtension/BrowseResource/resourceType/Microsoft.Datadog%2Fmonitors
[5]: /es/getting_started/site/
[6]: /es/logs/guide/azure-logging-guide
[7]: https://learn.microsoft.com/en-us/azure/partner-solutions/datadog/
{{< /site-region >}}

{{< site-region region="us,eu,us5,gov,ap1" >}}

<div class="alert alert-info">El recurso de Datadog en Azure solo está disponible para organizaciones en el sitio US3 de Datadog. Si utilizas un sitio de Datadog diferente, consulta la guía <a href="https://docs.datadoghq.com/logs/guide/azure-logging-guide/" target="_blank">Enviar logs de Azure a Datadog</a> para conocer las opciones de configuración. Si estás utilizando el sitio US3 de Datadog, <a href="?site=us3" target="_blank">cambia el selector de sitio</a> a la derecha de esta página.</div>

{{< /site-region >}}

## Leer más

{{< partial name="whats-next/whats-next.html" >}}