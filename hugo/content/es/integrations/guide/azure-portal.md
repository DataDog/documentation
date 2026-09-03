---
further_reading:
- link: /integrations/azure/
  tag: Documentación
  text: Integración de Azure
- link: https://www.datadoghq.com/blog/azure-datadog-partnership
  tag: Blog
  text: La asociación con Microsoft integra Datadog de forma nativa en el portal de
    Azure
- link: https://www.datadoghq.com/blog/monitor-enterprise-azure-environments-with-datadog/
  tag: Blog
  text: Habilita la monitorización de entornos de Azure a escala empresarial en minutos
    con Datadog
title: Gestión de la integración nativa de Azure
---

<div class="alert alert-danger">
  Esta guía sirve para gestionar la integración nativa de Azure con el recurso Datadog.
</div>

Esta guía es para gestionar la integración entre Azure y Datadog en el portal de Azure mediante el recurso de Datadog. El recurso de Datadog en Azure representa la conexión entre tu organización de Datadog y tu entorno de Azure. Puedes configurar un recurso de Datadog para vincular tantas suscripciones como desees monitorizar. [Crea un recurso de Datadog][1] en Azure antes de continuar con esta guía.

Con el recurso de Datadog, puedes gestionar lo siguiente dentro de la suscripción de Azure asociada:
- Ver o modificar el contexto del recurso de Datadog para incluir las suscripciones que se monitorizarán
- Configurar la recopilación de métricas de Azure y logs de la plataforma
- Verificar los recursos de Azure que envían métricas y logs
- Ver las claves de API y configurar la clave predeterminada para los despliegues del Agent del recurso de Datadog
- Desplegar el Agent de la máquina virtual de Datadog en tus máquinas virtuales de Azure y consultar los detalles sobre los Agents en ejecución
- Desplegar la extensión .NET de Datadog en tus aplicaciones web de Azure y consultar los detalles sobre las extensiones instaladas
- Volver a configurar el inicio de sesión único
- Cambiar el plan de facturación para tu organización de Datadog (solo para Azure Marketplace)
- Habilitar o deshabilitar la integración de Azure
- Eliminar el recurso de Datadog

En esta página se describe la experiencia del portal de Azure. Si prefieres utilizar la CLI, consulta [CLI de Azure para Datadog][2].

## Información general

Selecciona **Overview** en la barra lateral izquierda para ver la información de tu recurso de Datadog.

{{< img src="integrations/guide/azure_portal/resource-overview.png" alt="El portal de Azure con Overview resaltado en la barra de navegación izquierda" responsive="true" style="width:100%;">}}

### Esenciales

La página de información general muestra información esencial sobre tu recurso de Datadog, incluidos el nombre del grupo de recursos, la ubicación (región), las suscripciones, las etiquetas (tags), el enlace de la organización de Datadog, el estado, el plan de precios y el periodo de facturación.

**Nota**: El enlace de la organización de Datadog es un enlace SAML si SSO está habilitado. Si la organización de Datadog se creó con Azure Marketplace, establece una contraseña la primera vez que uses este enlace.

### Enlaces

La página de información general contiene enlaces para ver dashboards, logs y mapas de host de Datadog.

### Resumen de recursos

La página de información general ofrece una tabla de resumen con los recursos que envían logs y métricas a Datadog. Esta tabla incluye las siguientes columnas:

| Columna             | Descripción                                                               |
|--------------------|---------------------------------------------------------------------------|
| Resource type      | El tipo de recurso de Azure                                                   |
| Total resources    | El recuento de todos los recursos para el tipo de recurso                          |
| Logs to Datadog    | El recuento de recursos que envían logs a Datadog a través de la integración    |
| Metrics to Datadog | El recuento de recursos que envían métricas a Datadog a través de la integración |

### Deshabilitar

Para dejar de enviar logs y métricas de Azure a Datadog, selecciona **Disable** en la página de información general y luego haz clic en **OK**.

{{< img src="integrations/guide/azure_portal/disable.png" alt="La página de recursos de Datadog dentro del portal de Azure con Overview seleccionado en la barra de navegación izquierda, la pestaña Disable resaltada y el botón OK resaltado" responsive="true" style="width:100%;">}}

**Nota**: Al deshabilitar el recurso de Datadog, se detiene el envío de métricas y logs de la plataforma a Datadog para las suscripciones asociadas. Los recursos de las suscripciones que envían datos directamente a Datadog a través del Agent o la extensión no se ven afectados.

### Habilitar

Para comenzar a enviar logs y métricas desde Azure a Datadog, selecciona **Enable** en la página de información general y luego haz clic en **OK**. Se recuperará y habilitará cualquier configuración previa de logs y métricas.

{{< img src="integrations/guide/azure_portal/enable.png" alt="La página de recursos de Datadog dentro del portal de Azure, con Overview seleccionado en la barra de navegación izquierda, la pestaña Enable resaltada y el botón OK resaltado" responsive="true" style="width:100%;">}}

### Borrar

Para borrar el recurso de Datadog, selecciona **Delete** en la página de información general. Escribe `yes` para confirmar la eliminación y haz clic en **Delete**.

{{< img src="integrations/guide/azure_portal/delete.png" alt="La página de recursos de Datadog dentro del portal de Azure, con Overview seleccionado en la barra de navegación izquierda, la pestaña Delete resaltada y un campo para confirmar la eliminación" responsive="true" style="width:100%;">}}

Para las organizaciones de Datadog que se facturan a través de Azure Marketplace:
- Si el recurso de Datadog eliminado es el único recurso de Datadog asignado a su organización de Datadog asociada, los logs y las métricas ya no se enviarán a Datadog y se detiene la facturación de Datadog a través de Azure. El soporte de Datadog se comunicará contigo para confirmar los próximos pasos para tu cuenta.
- Si hay recursos de Datadog adicionales asignados a la organización de Datadog asociada, eliminar un recurso de Datadog solo detiene el envío de logs y métricas para su suscripción de Azure asociada.

Si tu organización de Datadog **no** se factura a través de Azure Marketplace, eliminar un recurso de Datadog solo elimina la integración para esa suscripción de Azure.

### Cambiar plan

Selecciona **Change plan** en la página de información general para cambiar tu plan de facturación de Datadog.

{{< img src="integrations/guide/azure_portal/change-plan1.png" alt="La página de recursos de Datadog dentro del portal de Azure, con Overview seleccionado en la barra de navegación izquierda y la pestaña Change Plan resaltada" responsive="true" style="width:100%;">}}

El portal recupera todos los planes de Datadog disponibles para tu inquilino, incluidas las ofertas privadas. Selecciona el plan adecuado y haz clic en **Change Plan**.

## Configuraciones de la organización de Datadog

### Suscripciones monitorizadas

Selecciona **Monitored Subscriptions** en la barra lateral izquierda para ver o modificar el contexto del recurso de Datadog. Aparecerá una lista de las suscripciones monitorizadas actualmente. Usa esta vista para configurar el contexto del recurso de Datadog a fin de monitorizar tantas suscripciones como desees. La suscripción con el recurso de Datadog debe estar incluida en el contexto.

{{< img src="integrations/guide/azure_portal/azure-portal-multiple-subscriptions.png" alt="El recurso de Datadog en el portal de Azure con suscripciones monitorizadas seleccionadas en la sección de configuraciones de la organización de Datadog; se muestran dos suscripciones" responsive="true" style="width:100%;">}}

   - Para añadir suscripciones a monitorizar, haz clic en `+ Add Subscriptions`. La lista de suscripciones disponibles solo incluye las suscripciones para las que tienes asignado el rol `Owner`. Selecciona las suscripciones que desees monitorizar y haz clic en `Add`.
   - Para eliminar la monitorización de suscripciones con Datadog, selecciona las suscripciones cuya monitorización deseas eliminar y haz clic en `Remove Subscriptions`. Solo los usuarios con el rol `Owner` pueden eliminar suscripciones.

**Nota**: Los mismos parámetros (como filtros de host y reglas de recopilación de logs) se aplican en todas las suscripciones incluidas en el contexto. Para aplicar diferentes parámetros a diferentes suscripciones, crea diferentes recursos de Datadog.

### Métricas y logs

Selecciona **Metrics and logs** en la barra lateral izquierda para cambiar las reglas de configuración de métricas y logs. Todas las reglas se aplican de forma dinámica en toda la suscripción a medida que se añaden recursos o cambian las etiquetas.

Los cambios en los parámetros de configuración de métricas o logs deberían tener efecto en unos minutos.

#### Recopilación de métricas
Por defecto, Datadog recopila automáticamente métricas para todos los recursos de Azure dentro de cualquier suscripción vinculada.

De manera opcional, limita la recopilación de métricas para las máquinas virtuales de Azure y los planes de App Service mediante el uso de etiquetas de Azure que se adjuntan a tus recursos.

##### Reglas de etiquetas para enviar métricas

 * Las máquinas virtuales, los conjuntos de escala de máquinas virtuales y los planes de App Service con etiquetas `include` envían métricas a Datadog.
 * Las máquinas virtuales, los conjuntos de escala de máquinas virtuales y los planes de App Service con etiquetas `exclude` no envían métricas a Datadog.
 * Si hay un conflicto entre las reglas de inclusión y exclusión, la exclusión tiene prioridad.
 * No existe ninguna opción para limitar la recopilación de métricas para otros tipos de recursos.

#### Recopilación de logs

Existen tres tipos de logs que pueden emitirse desde Azure a Datadog utilizando el recurso de Datadog.

1. [Logs de actividades](#activity-logs)
2. [Logs de recursos](#resource-logs)
3. [Microsoft Entra ID](#microsoft-entra-id-logs)

##### Logs de actividades

Los logs de nivel de suscripción brindan información sobre las operaciones en tus recursos en el [plano de control][3]. También se incluyen actualizaciones sobre eventos de estado del servicio. Usa el log de actividad para determinar qué, quién y cuándo se realizan las operaciones de escritura (`PUT`, `POST` y `DELETE`).

Para enviar logs de nivel de suscripción a Datadog, selecciona **Send subscription activity logs**. Si esta opción no está marcada, no se enviará ninguno de los logs de nivel de suscripción a Datadog.

##### Logs de recursos

Los logs de recursos de Azure brindan información sobre las operaciones que se realizan en los recursos de Azure en el [plano de datos][3]. Por ejemplo, obtener un secreto de un almacén de claves o realizar una solicitud a una base de datos son operaciones del plano de datos. El contenido de los logs de recursos varía según el servicio de Azure y el tipo de recurso.

Para enviar logs de recursos de Azure a Datadog, selecciona **Send Azure resource logs for all defined resources**. Los tipos de logs de recursos de Azure se enumeran en las [categorías de logs de recursos de Azure Monitor][4]. Cuando se selecciona esta opción, todos los logs de recursos se envían a Datadog, incluidos los recursos nuevos creados en las suscripciones vinculadas.

Opcionalmente, puedes filtrar el conjunto de recursos de Azure al enviar logs a Datadog utilizando las etiquetas de recurso de Azure.

###### Reglas de etiqueta para el envío de logs

* Los recursos de Azure con etiquetas `include` envían logs a Datadog.
* Los recursos de Azure con etiquetas `exclude` no envían logs a Datadog.
* Si hay un conflicto entre las normas de inclusión y exclusión, la exclusión tiene prioridad.

Por ejemplo, la captura de pantalla a continuación muestra una regla de etiqueta donde solo las máquinas virtuales, los conjuntos de escala de máquinas virtuales y los planes de App Service etiquetados con `Datadog = True` envían métricas a Datadog. Los recursos (de todos los tipos) etiquetados con `Datadog = True` envían logs a Datadog.

{{< img src="integrations/guide/azure_portal/metrics-and-logs-tag-rules.png" alt="Una captura de pantalla que muestra una regla de etiqueta de métrica de Datadog=true establecida para máquinas virtuales, conjuntos de escala de máquinas virtuales y planes de App Service. La sección de logs también está configurada con la regla de etiqueta de Datadog=true" responsive="true" style="width:100%;">}}

##### Logs de Microsoft Entra ID

Los logs de Microsoft Entra ID contienen el historial de la actividad de inicio de sesión y un seguimiento de auditoría de los cambios realizados en Microsoft Entra ID para un arrendatario concreto. Para enviar logs de Microsoft Entra ID:

1. Navega a Microsoft Entra ID y selecciona **Diagnostic Settings** (Configuración de diagnóstico) en **Monitoring** (Monitorización) en la barra de navegación izquierda.
2. Haz clic en **Add diagnostic setting** (Añadir parámetro de diagnóstico).
3. Selecciona las categorías de logs que deseas enviar a Datadog. Datadog recomienda enviar todas las categorías.
4. En **Destination details**, selecciona **Send to a partner solution**.
5. Selecciona una suscripción. Escoge un recurso de Datadog del menú desplegable **Destination**.

Todos los logs de Microsoft Entra ID del inquilino se envían a la organización de Datadog vinculada al recurso de Datadog seleccionado. En los casos en los que tienes más de un recurso de Datadog que vincula suscripciones a la misma organización de Datadog, no importa qué recurso de Datadog esté seleccionado. Solo necesitas configurar esto una vez para cada inquilino de Azure.

### Recursos monitorizados

Selecciona **Monitored Resources** en la barra lateral izquierda para ver una lista de recursos que emiten logs y métricas para Datadog. Usa la búsqueda para filtrar la lista por nombre de recurso, tipo, grupo, ubicación, logs para Datadog o métricas para Datadog.

{{< img src="integrations/guide/azure_portal/monitored-resources.png" alt="La página de recursos de Datadog en el portal de Azure con Monitored Resources ​​resaltado en las configuraciones de la organización de Datadog" responsive="true" style="width:100%;">}}

La columna **Logs to Datadog** muestra `Sending` si el recurso está enviando logs a Datadog. En caso contrario, este campo indica por qué no se están enviando logs. Estas son los posibles motivos:

| Motivo                                    | Descripción                                                                                                             |
|-------------------------------------------|-------------------------------------------------------------------------------------------------------------------------|
| Resource doesn't support sending logs     | Solo los tipos de recursos con categorías de logs de monitorización se pueden configurar para enviar logs a Datadog.                           |
| Limit of five diagnostic settings reached | Cada recurso de Azure puede tener un máximo de cinco parámetros de diagnóstico. Para obtener más información, consulte [Parámetros de diagnóstico][5]. |
| Error                                     | El recurso está configurado para enviar logs a Datadog, pero está bloqueado por un error.                                         |
| Logs not configured                       | Solo los recursos de Azure con etiquetas de recursos adecuadas están configurados para enviar logs a Datadog.                             |
| Region not supported                      | El recurso de Azure se encuentra en una región que no admite el envío de logs a Datadog.                                         |
| Datadog Agent not configured              | Las máquinas virtuales sin el Datadog Agent instalado no emiten logs para Datadog.                                        |

### Extensiones del Datadog Agent

{{< tabs >}}
{{% tab "Extensión de máquinas virtuales" %}}

Para ver una lista de máquinas virtuales (VMs) en la suscripción, selecciona **Virtual machine agent** en la barra lateral izquierda. En esta página, puedes instalar el Datadog Agent en una máquina virtual como una extensión.

{{< img src="integrations/guide/azure_native_manual_setup/azure_native_vm_extension.png" alt="El recurso de Datadog en Azure con Virtual machine agent seleccionado y la opción Install extension resaltada" responsive="true" style="width:90%;">}}

Para cada máquina virtual, se muestra la siguiente información:

| Columna               | Descripción                                                                                                                                                    |
|----------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Resource name        | El nombre de la máquina virtual                                                                                                                                                  |
| Resource status      | Ya sea que la máquina virtual esté detenida o en ejecución. El Datadog Agent solo se puede instalar en una máquina virtual en ejecución. Si la máquina virtual está detenida, la instalación del Datadog Agent se deshabilita. |
| Agent version        | El número de versión del Datadog Agent                                                                                                                               |
| Agent status         | Si el Datadog Agent se está ejecutando en la máquina virtual.                                                                                                                |
| Integrations enabled | Las métricas clave que recopilan las integraciones habilitadas en el Datadog Agent.                                                                                  |
| Install method       | La herramienta específica utilizada para instalar Datadog Agent , como Chef, la extensión de máquinas virtuales de Azure, etc.                                                                    |
| Sending logs         | Si el Datadog Agent está enviando logs a Datadog.                                                                                                          |

#### Instalación

Puedes instalar el Datadog Agent directamente en Azure con la extensión de máquinas virtuales. Para instalar el Datadog Agent:

1. Selecciona la máquina virtual adecuada.
2. Haz clic en **Install Extension**.
3. El portal solicita confirmación para instalar el Agent con la clave predeterminada. Selecciona **OK** para comenzar la instalación. Azure muestra el estado como `Installing` hasta que el Agent esté instalado y aprovisionado. Una vez instalado el Datadog Agent, el estado cambia a `Installed`.

##### Desinstalar

Si el Datadog Agent se instaló con la extensión de máquinas virtuales de Azure:

1. Selecciona la máquina virtual adecuada.
2. Haz clic en **Uninstall Agent**.

Si el Agent se instaló utilizando un método diferente, no puedes usar el recurso de Datadog para desplegar o eliminar el Agent, pero la información sobre el Agent seguirá reflejada en esta página.

{{% /tab %}}
{{% tab "Extensión del clúster de AKS" %}}

La extensión del clúster de Datadog AKS te permite desplegar el Datadog Agent de forma nativa dentro de Azure AKS, lo que evita la complejidad de las herramientas de gestión de terceros.

#### Instalación

Para instalar el Datadog Agent con la extensión del clúster de AKS:

1. Haz clic en tu clúster de AKS en la sección **Monitored Resources** en la barra lateral izquierda.
2. En la barra lateral izquierda del clúster de AKS, selecciona **Extensions + applications** en **Settings**.
3. Busca y selecciona `Datadog AKS Cluster Extension`.
4. Haz clic en **Create** y sigue las instrucciones del cuadro utilizando tus [credenciales de Datadog][1] y el [sitio de Datadog][2].

#### Desinstalar

1. Haz clic en tu clúster de AKS en la sección **Monitored Resources** de la barra lateral izquierda.
2. En la barra lateral izquierda del clúster de AKS, selecciona **Extensions + applications** en **Settings**.
3. Selecciona la extensión del clúster de Datadog AKS (el valor de **Type** es `Datadog.AKSExtension`).
4. Haz clic en **Uninstall**.

[1]: /es/account_management/api-app-keys/
[2]: /es/getting_started/site/
{{% /tab %}}
{{< /tabs >}}

### Extensión de App Service

Selecciona **App Service extension** en la barra lateral izquierda para ver una lista de servicios de aplicaciones en la suscripción. En esta página, puedes instalar la extensión de Datadog en Azure App Service para habilitar el rastreo de APM y las métricas personalizadas.

Para cada servicio de aplicaciones, se muestra la siguiente información:

| Columna            | Descripción                                                                                                                                                                  |
|-------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Resource name     | El nombre de la aplicación                                                                                                                                                                 |
| Resource status   | Si el servicio de aplicaciones está detenido o en ejecución. El servicio de aplicaciones debe estar en ejecución para iniciar la instalación. Si el servicio de aplicaciones está detenido, la instalación del Datadog Agent se deshabilita. |
| App service plan  | El plan específico configurado para el servicio de aplicaciones                                                                                                                             |
| Extension version | El número de versión de la extensión de Datadog                                                                                                                                         |

#### Instalación

Para instalar la [extensión de Datadog][6], selecciona la aplicación adecuada y, a continuación, haz clic en **Install Extension**. El portal solicita confirmación para instalar la extensión. Selecciona **OK** para comenzar la instalación. Esto reinicia la aplicación y añade los siguientes parámetros:

- `DD_API_KEY:<DEFAULT_API_KEY>`
- `DD_SITE:us3.datadoghq.com`

Azure muestra el estado `Installing` hasta que el Agent esté instalado y aprovisionado. Una vez instalado el Datadog Agent, el estado cambia a `Installed`.

**Nota**: Asegúrese de añadir la extensión a las aplicaciones con [tiempos de ejecución compatibles][7]. El recurso de Datadog no limita ni filtra la lista de aplicaciones.

#### Desinstalar

Para desinstalar la extensión de Datadog, selecciona la aplicación correspondiente y haz clic en **Uninstall Extension**.

## Configuración
### Inicio de sesión único

Selecciona **Single sign-on** en la barra lateral izquierda para volver a configurar el inicio de sesión único.

Para activar el inicio de sesión único a través de Microsoft Entra ID, selecciona **Enable single sign-on** (Activar inicio de sesión único). El portal recupera la aplicación de Datadog correspondiente de Microsoft Entra ID. El nombre de la aplicación es el nombre de la aplicación empresarial que elegiste al configurar la integración. Selecciona el nombre de la aplicación de Datadog como se muestra a continuación.

{{< img src="integrations/guide/azure_portal/sso.png" alt="El portal de Azure con Habilitar inicio de sesión único a través de Microsoft Entra ID activado" responsive="true" style="width:100%;">}}

### Claves de API

Selecciona **Keys** en la barra lateral izquierda para ver una lista de claves de API para tu recurso de Datadog.

{{< img src="integrations/guide/azure_portal/api-keys.png" alt="La vista Keys dentro del portal de Azure que muestra una clave de API" responsive="true" style="width:100%;">}}

El portal de Azure ofrece una vista de solo lectura de las claves de API. Para gestionar las claves, selecciona el enlace "Datadog portal". Después de realizar cambios en Datadog, actualiza la vista del portal de Azure.

La integración de Azure de Datadog te permite instalar el Datadog Agent en una máquina virtual o un servicio de aplicaciones. Si no se selecciona ninguna clave predeterminada, se produce un error en la instalación del Datadog Agent.

### Cloud Security Misconfigurations

Selecciona `Cloud Security Posture Management` en la barra lateral izquierda para configurar [Errores de configuración de Cloud Security][8].

Por defecto, los errores de configuración de Cloud Security no están activado. Para activar los errores de configuración de Cloud Security, selecciona `Enable Datadog Cloud Security Posture Management` y haz clic en **Save** (Guardar). Esto habilita los errores de configuración de Datadog Cloud Security para cualquier suscripción asociada con el recurso de Datadog.

Para deshabilitarlo, desmarca la casilla y haz clic en **Save**.

{{< img src="integrations/guide/azure_portal/enable-CSPM.png" alt="La página Azure Portal con Cloud Security Posture Management seleccionado en la pestaña Settings" responsive="true" style="width:100%;">}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://docs.datadoghq.com/es/integrations/azure/?tab=link&site=us3#create-datadog-resource
[2]: https://docs.microsoft.com/en-us/cli/azure/datadog?view=azure-cli-latest
[3]: https://docs.microsoft.com/en-us/azure/azure-resource-manager/management/control-plane-and-data-plane
[4]: https://docs.microsoft.com/en-us/azure/azure-monitor/essentials/resource-logs-categories
[5]: https://docs.microsoft.com/en-us/azure/azure-monitor/essentials/diagnostic-settings
[6]: /es/serverless/azure_app_services
[7]: /es/serverless/azure_app_services/#requirements
[8]: /es/security/cloud_security_management/misconfigurations/