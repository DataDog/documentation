---
aliases:
- /es/integrations/guide/azure-portal/
- /es/integrations/guide/azure-native-programmatic-management/
- /es/integrations/guide/azure-native-manual-setup/
- /es/logs/guide/azure-native-logging-guide/
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
title: Configuración y referencia de la integración nativa de Azure
---

{{< site-region region="us3" >}}

Esta guía sirve para configurar y gestionar el recurso de monitor de Datadog en Azure, que conecta tu organización de Datadog y tu entorno de Azure. Elige este método de configuración de la integración si:

- Estás utilizando el [sitio US3][1]
- Deseas gestionar la integración de Datadog y Azure desde el portal de Azure

## Requisitos previos

- Tu cuenta de Datadog debe estar en el [sitio US3][1]
- Debes ser **propietario** de las suscripciones a Azure que desees vincular y **administrador** de la organización de Datadog a la que deseas vincularlas.

## Información general

El recurso de Datadog en Azure representa la conexión entre tu organización de Datadog y tu entorno de Azure. Puedes configurar un recurso de Datadog para vincular tantas suscripciones como desees monitorizar. 

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

Esta página describe la experiencia del portal de Azure. Si prefieres utilizar la CLI, consulta [Azure CLI para Datadog][3].

## Funciones no compatibles

Algunas funciones no pueden gestionarse a través del recurso de Datadog en Azure. Entre ellas se incluyen:

- Filtrado de métricas a nivel de **recursos**
- [Cloud Cost Management][8] (CCM)
- [Log Archiving][9]
- [Storage Management][7]

## Configuración

{{% collapse-content title="Portal de Azure" level="h4" expanded=false id="azure-portal-setup" %}}
Existen dos opciones cuando se crea un recurso de Datadog en el portal de Azure:

1. Vincular a una organización de Datadog existente. Esta es la acción más común. Úsala a fin de configurar tu organización de Datadog para que monitorice una suscripción de Azure que aún no se haya vinculado. Esta acción no afecta tu plan de facturación de Datadog.

2. Crear una organización de Datadog nueva. Este flujo es menos común. Úsalo si aún no tienes una organización de Datadog y quieres comenzar con un plan pago a través de Azure Marketplace. Este flujo crea una organización de Datadog nueva, te permite seleccionar un plan de facturación y vincula la suscripción de Azure asociada para la monitorización.

**Nota**: Las pruebas no se encuentran disponibles a través de la opción **Create a new Datadog organization** (Crear una organización de Datadog nueva) en Azure. Para comenzar con una prueba gratuita, primero [crea una organización de Datadog de prueba en el sitio US3][1]. Luego, usa el flujo de vinculación para añadir las suscripciones que quieras monitorizar.

Tras crear un recurso de Datadog, comienza la recopilación de datos para la suscripción asociada.

### Crear un recurso de Datadog

Para comenzar a supervisar una suscripción de Azure, navega hasta la [página de servicio de Datadog en Azure][2] y selecciona la opción para crear un nuevo recurso de Datadog:
{{< img src="integrations/azure/azure-us3-dd-service.png" alt="Azure US3 Datadog Service" responsive="true" style="width:90%;">}}

Selecciona **Link Azure subscription to an existing Datadog organization** (Vincular suscripción de Azure a una organización de Datadog existente) o **Create a new Datadog organization** (Crear una organización de Datadog nueva). La vinculación es la acción más común. Úsala para configurar la monitorización de una suscripción de Azure que aún no se haya vinculado. Solo elige el flujo **Create** (Crear) si aún no eres cliente de Datadog y quieres comenzar con un plan pago y nuevo.

{{< img src="integrations/azure/azure-us3-create-dd-resource1.png" alt="Azure US3 crea un recurso de Datadog" responsive="true" style="width:90%;">}}

**Nota**: Las nuevas organizaciones de Datadog creadas a través del portal de Azure tienen automáticamente la facturación consolidada en su factura de Azure. Este uso cuenta para el [MACC][3] de tu organización, si procede.

### Configuración de SSO

_(Opcional)_: puedes configurar el inicio de sesión único (SSO) durante el proceso de creación de una nueva organización de Datadog en Azure. También puedes configurar SSO más tarde. Para configurar el SSO durante la creación inicial, crea primero una aplicación de galería empresarial de Datadog.

### Configuración {#configuration-us3}

{{< tabs >}}
{{% tab "Vincular" %}}

#### Conceptos básicos {#basics-link}

Después de seleccionar la vinculación a una organización de Datadog existente, el portal muestra un formulario para crear el recurso de Datadog:
{{< img src="integrations/azure/azure-us3-link-sub.png" alt="Vincular una suscripción de Azure a una organización de Datadog existente" responsive="true" style="width:90%;">}}

Proporciona los siguientes valores:

| Propiedad             | Descripción                                                                                                                                                                                                                  |
|----------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Suscripción         | La suscripción de Azure que quieres monitorizar con Datadog. El recurso de Datadog existe en esta suscripción. Debes tener acceso de propietario.                                                                                       |
| Grupo de recursos       | Crea un grupo de recursos nuevo o usa uno existente. Un [grupo de recursos][2] es un contenedor que contiene recursos relacionados para una solución de Azure.                                                                                 |
| Nombre del recurso        | Especifica un nombre para el recurso de Datadog. La convención de nombres recomendada es: `subscription_name-datadog_org_name`.                                                                                                         |
| Localización             | La localización es Oeste US2, donde se encuentra alojado el sitio US3 de Datadog en Azure. Esto no afecta el uso que haces de Datadog. Como todos los [sitios de Datadog][1], el sitio US3 es completamente SaaS y admite la monitorización de todas las regiones de Azure, así como de otros proveedores de nube y hosts locales. |
| Organización de Datadog | Una vez que se complete el paso de autenticación, el nombre de la organización de Datadog se establece en el nombre de la organización de Datadog que se vincula. El sitio de Datadog se establece en US3.                                                                                                                                |

Haz clic en **Link to Datadog organization** (Vincular a la organización de Datadog) para abrir una ventana de autenticación de Datadog, luego inicia sesión en Datadog.

De manera predeterminada, Azure vincula tu organización de Datadog actual a tu recurso de Datadog. Si quieres vincular una organización diferente, selecciona la organización adecuada en la ventana de autenticación:

{{< img src="integrations/azure/azure-us3-select-org.png" alt="Seleccionar la organización de Datadog de Azure US3" responsive="true" style="width:90%;">}}

Cuando se complete el flujo de OAuth, verifica que el nombre de la organización de Datadog sea correcto.

[1]: /es/getting_started/site/
[2]: https://docs.microsoft.com/azure/azure-resource-manager/management/overview#resource-groups
{{% /tab %}}
{{% tab "Crear" %}}

#### Conceptos básicos {#basics-create}

Después de seleccionar la creación de una organización de Datadog nueva, el portal muestra un formulario para crear tanto el recurso de Datadog como la organización de Datadog nueva:
{{< img src="integrations/azure/azure-us3-create-dd-resource2.png" alt="Crear un recurso de Datadog de Azure US3" responsive="true" style="width:90%;">}}

Proporciona los siguientes valores:

| Propiedad             | Descripción                                                                                                                                                                                                                  |
|----------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Suscripción         | La suscripción de Azure que quieres monitorizar con Datadog. El recurso de Datadog existe en esta suscripción. Debes tener acceso de propietario.                                                                                       |
| Grupo de recursos       | Crea un grupo de recursos o utiliza uno existente. Un [grupo de recursos][2] es un contenedor que contiene recursos relacionados para una solución de Azure.                                                                                 |
| Nombre del recurso        | El nombre del recurso de Datadog. Este nombre se asigna a la organización de Datadog nueva.                                                                                                                                    |
| Localización             | La localización es Oeste US2, donde se encuentra alojado el sitio US3 de Datadog en Azure. Esto no afecta el uso que haces de Datadog. Como todos los [sitios de Datadog][1], el sitio US3 es completamente SaaS y admite la monitorización de todas las regiones de Azure, así como de otros proveedores de nube y hosts locales. |
| Organización de Datadog | El nombre de la organización de Datadog se establece en el nombre del recurso y el sitio de Datadog se establece en US3.                                                                                                                                |
| Plan de precios         | Una lista de los planes de precios de Datadog disponibles. Si tienes una oferta privada, se encontrará disponible en este menú desplegable.                                                                                                                 |
| Plazo de facturación         | Mensual.                                                                                                                                                                                                                      |
[1]: /es/getting_started/site/
[2]: https://docs.microsoft.com/azure/azure-resource-manager/management/overview#resource-groups
{{% /tab %}}
{{< /tabs >}}

[1]: /es/getting_started/site/
[2]: https://portal.azure.com/#blade/HubsExtension/BrowseResource/resourceType/Microsoft.Datadog%2Fmonitors
[3]: https://learn.microsoft.com/partner-center/marketplace-offers/azure-consumption-commitment-enrollment
{{% /collapse-content %}} 

{{% collapse-content title="Terraform" level="h4" expanded=false id="terraform-setup" %}}
1. Asegúrate de que has configurado el [proveedor Terraform Azure][1].

2. Utiliza las plantillas siguientes para crear el recurso `azurerm_datadog_monitor` y realizar la asignación de roles `Monitoring Reader` con Terraform:

#### Recurso de monitor Azure Datadog

{{< code-block lang="hcl" filename="" disable_copy="false" collapsible="false" >}}

resource "azurerm_resource_group" "example" {
  name     = "<NAME>"
  location = "<AZURE_REGION>"
}
resource "azurerm_datadog_monitor" "example" {
  name                = "<NAME>"
  resource_group_name = azurerm_resource_group.example.name
  location            = azurerm_resource_group.example.location
  datadog_organization {
    api_key         = "<DATADOG_API_KEY>"
    application_key = "<DATADOG_APPLICATION_KEY>"
  }
  user {
    name  = "<NAME>"
    email = "<EMAIL>"
  }
  sku_name = "Linked"
  identity {
    type = "SystemAssigned"
  }
}

{{< /code-block >}}

#### Rol de lector de la monitorización

{{< code-block lang="hcl" filename="" disable_copy="false" collapsible="false" >}}

data "azurerm_subscription" "primary" {}

data "azurerm_role_definition" "monitoring_reader" {
  name = "Lector de monitorización"
}

resource "azurerm_role_assignment" "example" {
  scope              = data.azurerm_subscription.primary.id
  role_definition_id = data.azurerm_role_definition.monitoring_reader.role_definition_id
  principal_id       = azurerm_datadog_monitor.example.identity.0.principal_id
}

{{< /code-block >}}

3. Ejecuta `terraform apply`.

[1]: https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs
{{% /collapse-content %}} 

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

## Recopilación de logs

Puedes gestionar la colección de tres tipos de logs de Azure. Encuentra instrucciones y detalles adicionales en las secciones siguientes:

   - [Logs de actividades](#activity-logs)
   - [Logs de recurso de Azure](#azure-resource-logs)
   - [Logs de Microsoft Entra ID](#microsoft-entra-id-logs)

**Nota**: El recurso de Datadog en Azure solo está disponible para organizaciones de Datadog en el sitio de Datadog US3. Si utilizas cualquier otro [sitio de Datadog][1], consulta la guía de [Reenvío de logs automatizado de Azure][12] para conocer las opciones de configuración.

## Logs de actividad

Proporciona información sobre las operaciones de tus recursos en el [plano de control][10]. También se incluyen actualizaciones sobre eventos de estado del servicio. Utiliza el log de actividad para determinar el qué, quién y cuándo de cualquier operación de escritura (`PUT`, `POST`, `DELETE`).

Para enviar los logs de actividad a Datadog, selecciona **Send subscription activity logs** (Enviar logs de actividad de suscripción). Si esta opción se deja sin marcar, no se enviará ninguno de los logs de actividad a Datadog.

<div class="alert alert-danger">Cuando se habilita la recopilación de logs, el recurso de Datadog modifica automáticamente las configuraciones de registro de <a href="https://learn.microsoft.com/azure/app-service/">App Services</a>. Azure activa un <strong>reinicio</strong> para App Services cuando cambian sus configuraciones de registro.</div>

## Logs de recursos de Azure

Proporciona información sobre las operaciones realizadas en los recursos de Azure en el [plano de datos][10]. Por ejemplo, obtener un secreto de una bóveda de claves o realizar una solicitud a una base de datos son operaciones del plano de datos. El contenido de los logs de recursos varía según el servicio de Azure y el tipo de recurso.

Para enviar los logs de recurso de Azure a Datadog, seleccione **Enviar recurso Azure logs para todos los recursos definidos**. Los tipos de logs de recursos de Azure se enumeran en las [categorías de log de recurso de monitor de Azure][11]. Cuando se selecciona esta opción, todos los logs de recurso se envían a Datadog, incluidos los nuevos recursos creados en la suscripción.

Opcionalmente, puedes filtrar el conjunto de recursos de Azure al enviar logs a Datadog utilizando las etiquetas de recurso de Azure.

### Reglas de etiqueta para el envío de logs

- Los recursos de Azure con etiquetas `include` envían logs a Datadog.
- Los recursos de Azure con etiquetas `exclude` no envían logs a Datadog.
- Si hay un conflicto entre las normas de inclusión y exclusión, la exclusión tiene prioridad.

Por ejemplo, la captura de pantalla siguiente muestra una regla de etiqueta en la que solo las máquinas virtuales, los conjuntos a escala de máquinas virtuales y los planes de servicio de aplicaciones etiquetados como `Datadog = True` envían métricas y logs a Datadog.

{{< img src="integrations/azure/azure-us3-create-dd-resource3.png" alt="Azure US3 crea logs de recursos de Datadog " responsive="true" style="width:90%;">}}

## Logs de Microsoft Entra ID

Los logs de Microsoft Entra ID contienen el historial de la actividad de inicio de sesión y una pista de auditoría de los cambios realizados en Microsoft Entra ID para un arrendatario en particular. Para enviar estos logs a Datadog, primero completa el proceso para crear un recurso de Datadog. A continuación, sigue estos pasos:

1. Navega a Microsoft Entra ID y selecciona **Diagnostic Settings** (Configuración de diagnóstico) en **Monitoring** (Monitorización) en la barra de navegación izquierda.
2. Haz clic en **Add diagnostic setting** (Añadir parámetro de diagnóstico).
3. Selecciona las categorías de logs que deseas enviar a Datadog. Datadog recomienda enviar todas las categorías.
4. En **Destination details**, selecciona **Send to a partner solution**.
5. Selecciona una suscripción. Escoge un recurso de Datadog del menú desplegable **Destination**.

Todos los logs de Microsoft Entra ID del inquilino se envían a la organización de Datadog vinculada al recurso de Datadog seleccionado. En los casos en los que tienes más de un recurso de Datadog que vincula suscripciones a la misma organización de Datadog, no importa qué recurso de Datadog esté seleccionado. Solo necesitas configurar esto una vez para cada inquilino de Azure.

## Utiliza el recurso de Datadog 

### Información general

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

### Activar

Para comenzar a enviar logs y métricas desde Azure a Datadog, selecciona **Enable** en la página de información general y luego haz clic en **OK**. Se recuperará y habilitará cualquier configuración previa de logs y métricas.

{{< img src="integrations/guide/azure_portal/enable.png" alt="La página de recursos de Datadog dentro del portal de Azure, con Overview seleccionado en la barra de navegación izquierda, la pestaña Enable resaltada y el botón OK resaltado" responsive="true" style="width:100%;">}}

### Borrar

Para borrar el recurso de Datadog, selecciona **Delete** en la página de información general. Escribe `yes` para confirmar la eliminación y haz clic en **Delete**.

{{< img src="integrations/guide/azure_portal/delete.png" alt="La página de recursos de Datadog dentro del portal de Azure, con Overview seleccionado en la barra de navegación izquierda, la pestaña Delete resaltada y un campo para confirmar la eliminación" responsive="true" style="width:100%;">}}

Para las organizaciones de Datadog que se facturan a través de Azure Marketplace:
- Si el recurso de Datadog eliminado es el único recurso de Datadog asignado a su organización de Datadog asociada, los logs y las métricas ya no se enviarán a Datadog y se detiene la facturación de Datadog a través de Azure. El soporte de Datadog se comunicará contigo para confirmar los próximos pasos para tu cuenta.
- Si hay recursos de Datadog adicionales asignados a la organización de Datadog asociada, eliminar un recurso de Datadog solo detiene el envío de logs y métricas para su suscripción de Azure asociada.

Si tu organización de Datadog **no** se factura a través de Azure Marketplace, la eliminación de un recurso de Datadog solo elimina la integración para esa suscripción de Azure.

### Cambiar plan

Selecciona **Change plan** en la página de información general para cambiar tu plan de facturación de Datadog.

{{< img src="integrations/guide/azure_portal/change-plan1.png" alt="La página de recursos de Datadog dentro del portal de Azure, con Overview seleccionado en la barra de navegación izquierda y la pestaña Change Plan resaltada" responsive="true" style="width:100%;">}}

El portal recupera todos los planes de Datadog disponibles para tu inquilino, incluidas las ofertas privadas. Selecciona el plan adecuado y haz clic en **Change Plan**.

{{% collapse-content title="Extensiones del Datadog Agent" level="h4" expanded=false id="agent-extensions" %}}

{{< tabs >}}
{{% tab "Extensión de VM" %}}

Para ver una lista de máquinas virtuales (VMs) en la suscripción, selecciona **Virtual machine agent** (Agent de máquina virtual) en la barra lateral izquierda. En esta página, puedes instalar el Datadog Agent en una VM como extensión.

{{< img src="integrations/guide/azure_native_manual_setup/azure_native_vm_extension.png" alt="El recurso de Datadog en Azure con el Agent de máquina virtual seleccionado y la opción Instalar extensión resaltada" responsive="true" style="width:90%;">}}

Para cada VM, se muestra la siguiente información:

| Columna               | Descripción                                                                                                                                                    |
|----------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Nombre del recurso        | El nombre de la VM                                                                                                                                                  |
| Estado del recurso      | Ya sea que la VM se encuentre detenida o en ejecución. El Datadog Agent solo se puede instalar en una VM en ejecución. Si la VM se encuentra detenida, la instalación del Datadog Agent se deshabilita. |
| Agent version        | El número de versión del Datadog Agent                                                                                                                               |
| Agent status         | Si el Datadog Agent se encuentra en ejecución en la VM.                                                                                                                |
| Integraciones habilitadas | Las métricas clave que recopilan las integraciones habilitadas en el Datadog Agent.                                                                                  |
| Método de instalación       | La herramienta específica que se usa para instalar el Datadog Agent, como Chef, la extensión de VM de Azure, etc.                                                                    |
| Envío de Logs         | Si el Datadog Agent envía logs a Datadog.                                                                                                          |

#### Instalar

Puedes instalar el Datadog Agent directamente en Azure con la extensión de VM. Para instalar el Datadog Agent: 

1. Selecciona la VM adecuada.
2. Haz clic en **Install Extension** (Instalar extensión). 
3. El portal solicita confirmación para instalar el Agent con la clave predeterminada. Selecciona **OK** (Aceptar) para comenzar la instalación. Azure muestra el estado `Installing` (Instalando) hasta que el Agent esté instalado y aprovisionado. Una vez instalado el Datadog Agent, el estado cambia a `Installed` (Instalado).

##### Desinstalar

Si el Datadog Agent se instaló con la extensión de VM de Azure:

1. Selecciona la VM adecuada.
2. Haz clic en **Uninstall Agent** (Desinstalar Agent).

Si el Agent se instaló con un método diferente, no puedes usar el recurso de Datadog para desplegar o eliminar el Agent, pero la información sobre el Agent seguirá reflejada en esta página.

{{% /tab %}}
{{% tab "Extensión del clúster de AKS" %}}

La extensión del clúster de AKS de Datadog te permite desplegar el Datadog Agent de manera nativa en Azure AKS, lo que evita la complejidad de las herramientas de gestión de terceros. 

#### Instalar

Para instalar el Datadog Agent con la extensión del clúster de AKS: 

1. Haz clic en tu clúster de AKS en la sección **Monitored Resources** (Recursos monitorizados) de la barra lateral izquierda.
2. En la barra lateral izquierda del clúster de AKS, selecciona **Extensions + applications** (Extensiones + aplicaciones) en **Settings** (Configuración).
3. Busca y selecciona `Datadog AKS Cluster Extension` (Extensión del clúster de AKS de Datadog).
4. Haz clic en **Create** (Crear) y sigue las instrucciones del cuadro con tus [credenciales de Datadog][1] y el [sitio de Datadog][2].

#### Desinstalar

1. Haz clic en tu clúster de AKS en la sección **Monitored Resources** (Recursos monitorizados) de la barra lateral izquierda.
2. En la barra lateral izquierda del clúster de AKS, selecciona **Extensions + applications** (Extensiones + aplicaciones) en **Settings** (Configuración).
3. Selecciona la extensión del clúster de AKS de Datadog (su **Type** [Tipo] es `Datadog.AKSExtension`).
4. Haz clic en **Uninstall** (Desinstalar).

[1]: /es/account_management/api-app-keys/
[2]: /es/getting_started/site/
{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}}

{{% collapse-content title="Extensión de App Service" level="h4" expanded=false id="app-service-extension" %}}

Selecciona **App Service extension** en la barra lateral izquierda para ver una lista de servicios de aplicaciones en la suscripción. En esta página, puedes instalar la extensión de Datadog en Azure App Service para habilitar el rastreo de APM y las métricas personalizadas.

Para cada servicio de aplicaciones, se muestra la siguiente información:

| Columna            | Descripción                                                                                                                                                                  |
|-------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Nombre del recurso     | El nombre de la aplicación                                                                                                                                                                 |
| Estado del recurso   | Si el servicio de aplicaciones está detenido o en ejecución. El servicio de aplicaciones debe estar en ejecución para iniciar la instalación. Si el servicio de aplicaciones está detenido, la instalación del Datadog Agent se deshabilita. |
| App service plan  | El plan específico configurado para el servicio de aplicaciones                                                                                                                             |
| Extension version | El número de versión de la extensión de Datadog                                                                                                                                         |

#### Instalar

Para instalar la [extensión de Datadog](#agent-extensions), selecciona la aplicación correspondiente y haz clic en **Install Extension** (Instalar extensión). El portal pide confirmación para instalar la extensión. Selecciona **OK** (Aceptar) para comenzar la instalación. Se reiniciará la aplicación y se añadirán los siguientes ajustes:

- `DD_API_KEY:<DEFAULT_API_KEY>`
- `DD_SITE:us3.datadoghq.com`

Azure muestra el estado `Installing` hasta que el Agent esté instalado y aprovisionado. Una vez instalado el Datadog Agent, el estado cambia a `Installed`.

**Nota**: Asegúrate de que estás añadiendo la extensión a aplicaciones con [tiempos de ejecución compatibles][1]. El recurso de Datadog no limita ni filtra la lista de aplicaciones.

#### Desinstalar

Para desinstalar la extensión de Datadog, selecciona la aplicación correspondiente y haz clic en **Uninstall Extension**.

[1]: /es/serverless/azure_app_services/#requirements
{{% /collapse-content %}} 

## Siguientes pasos

- Echa un vistazo al [dashboard de información general de Azure][5] para empezar a obtener información sobre tu entorno de Azure.
- Consulta [plantillas de monitor de Azure][6] para empezar a recibir alertas de los datos importantes para tu organización.

[1]: /es/getting_started/site/
[3]: https://docs.microsoft.com/cli/azure/datadog?view=azure-cli-latest
[5]: https://app.datadoghq.com/dash/integration/71/azure-overview
[6]: https://app.datadoghq.com/monitors/templates?q=azure
[7]: /es/infrastructure/storage_management/azure_blob_storage
[8]: /es/cloud_cost_management/setup/azure/
[9]: /es/logs/guide/azure-automated-log-forwarding/#log-archiving
[10]: https://docs.microsoft.com/azure/azure-resource-manager/management/control-plane-and-data-plane
[11]: https://docs.microsoft.com/azure/azure-monitor/essentials/resource-logs-categories
[12]: /es/logs/guide/azure-automated-log-forwarding
{{< /site-region >}}

{{< site-region region="us,eu,us5,gov,ap1,ap2" >}}

<div class="alert alert-info">El recurso de Datadog en Azure solo está disponible para organizaciones en el sitio US3 de Datadog. Si utilizas un sitio de Datadog diferente, consulta la guía de <a href="https://docs.datadoghq.com/logs/guide/azure-logging-guide/" target="_blank">Reenvío de logs de Azure automatizado</a> para conocer las opciones de configuración. Si estás utilizando el sitio US3 de Datadog, <a href="?site=us3" target="_blank">cambia el selector de sitio</a> a la derecha de esta página.</div>

{{< /site-region >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}