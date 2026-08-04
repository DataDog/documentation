---
description: Pasos para configurar de manera manual la integración de Azure con Datadog
further_reading:
- link: https://docs.datadoghq.com/agent/faq/why-should-i-install-the-agent-on-my-cloud-instances/
  tag: Documentación
  text: ¿Por qué debería instalar el Datadog Agent en mis instancias de nube?
- link: https://docs.datadoghq.com/integrations/guide/azure-portal/
  tag: Documentación
  text: Datadog en Azure Portal
- link: https://www.datadoghq.com/blog/azure-government-monitoring-datadog/
  tag: Blog
  text: Monitorizar Azure Government con Datadog
- link: https://www.datadoghq.com/blog/azure-container-apps/
  tag: Blog
  text: Monitorizar Azure Container Apps con Datadog
- link: https://www.datadoghq.com/blog/how-to-monitor-microsoft-azure-vms/
  tag: Blog
  text: Cómo monitorizar máquinas virtuales de Microsoft Azure
- link: https://www.datadoghq.com/blog/azure-app-service-datadog-serverless-view/
  tag: Blog
  text: Explorar Azure App Service con la vista serverless de Datadog
title: Guía de configuración manual de la integración de Azure
---

## Información general

Usa esta guía a fin de configurar de manera manual la [integración de Azure con Datadog][1] a través de un registro de aplicaciones con permisos de lectura para las suscripciones monitorizadas.

**Todos los sitios**: todos los sitios de Datadog pueden usar los pasos de esta página a fin de completar el proceso de credenciales de registro de aplicaciones para la recopilación de métricas de Azure y la configuración del centro de eventos para enviar logs de la plataforma de Azure.

**US3**: si tu organización se encuentra en el sitio US3 de Datadog, puedes usar la integración nativa de Azure para optimizar la gestión y la recopilación de datos para tu entorno de Azure. Datadog recomienda usar este método cuando sea posible. La configuración implica la creación de un [recurso de Datadog en Azure][12] para vincular tus suscripciones de Azure a tu organización de Datadog. Esto reemplaza el proceso de credenciales de registro de aplicaciones para la recopilación de métricas y la configuración del centro de eventos para el reenvío de logs. Consulta la guía de [configuración manual nativa de Azure][13] para obtener más información.

## Configuración

{{% collapse-content title="Permisos necesarios para la configuración de la integración" level="h4" expanded=false id="required-permissions" %}}

#### En Azure

Tu usuario de Microsoft Entra ID necesita los siguientes permisos:

##### Permiso para crear un registro de aplicación

**Una** de las siguientes condiciones debe ser cierta para el usuario:

- `Users can register applications` se ha fijado en `Yes`
- El usuario tiene el rol de [desarrollador de aplicaciones][17]

##### Roles administrativos en tus suscripciones

Dentro de las suscripciones que deseas monitorizar, debes tener:

- El rol de **Propietario**
- Tanto los roles **Contributor** como **User Access Admin**.

##### Permiso para añadir y conceder consentimiento para permisos de Graph API

El [rol de administrador privilegiado][15] contiene los permisos necesarios.

#### En Datadog

El `Datadog Admin Role`, o cualquier otro rol con el permiso `azure_configurations_manage`.

{{% /collapse-content %}} 

### Integración a través de la CLI de Azure

Para integrar Datadog con Azure mediante la CLI de Azure, Datadog recomienda usar [Azure Cloud Shell][7].

{{< tabs >}}
{{% tab "Azure CLI" %}}

En primer lugar, inicia sesión en la cuenta de Azure que quieres integrar con Datadog:

```shell
az login
```

Crea una entidad de servicio y configura su acceso a los recursos de Azure:

```shell
az ad sp create-for-rbac
```

Muestra una lista de suscripciones para que puedas copiar y pegar el `subscription_id`:

```shell
az account list --output table
```

Crea una aplicación como entidad de servicio con el formato:

```shell
az ad sp create-for-rbac --role "Monitoring Reader" --scopes /subscriptions/{subscription_id}
```

Resultado de ejemplo:
```text
{
  "appId": "4ce52v13k-39j6-98ea-b632-965b77d02f36",
  "displayName": "azure-cli-2025-02-23-04-27-19",
  "password": "fe-3T~bEcFxY23R7NHwVS_qP5AmxLuTwgap5Dea6",
  "tenant": "abc123de-12f1-82de-97bb-4b2cd023bd31"
}
```

- Este comando le otorga a la entidad de servicio el rol `monitoring reader` (lector de monitorización) para la suscripción que quieres monitorizar.
- El `appID` generado a partir de este comando se debe ingresar en el [cuadro de integración de Azure con Datadog][1] en **Client ID** (ID de cliente).
- Ingresa el valor `Tenant ID` (ID de inquilino) generado en el [cuadro de integración de Azure con Datadog][1] en **Tenant name/ID** (Nombre/ID del inquilino).
- `--scopes` puede admitir varios valores y puedes añadir varias suscripciones o grupos de gestión a la vez. Consulta los ejemplos en la documentación de **[az ad sp][2]**.
- Añade `--name <CUSTOM_NAME>` para usar un nombre seleccionado de manera manual; de ​​lo contrario, Azure genera uno único. El nombre no se usa en el proceso de configuración.
- Añade `--password <CUSTOM_PASSWORD>` para usar una contraseña seleccionada de manera manual. De lo contrario, Azure genera una contraseña única. Esta contraseña se debe ingresar en el [cuadro de integración de Azure con Datadog][1] en **Client Secret** (Secreto de cliente).

El grupo de gestión es una opción válida y recomendada para el contexto. Por ejemplo:

```shell
az account management-group entities list --query "[?inheritedPermissions!='noaccess' && permissions!='noaccess'].{Name:displayName,Id:id}" --output table
```

- En este comando se muestran todas las suscripciones y grupos de gestión a los que tiene acceso un usuario.
- Une los IDs y crea la entidad de servicio. Puedes ejecutar este comando para crear un usuario y asignar roles a cada grupo de gestión o suscripción.

[1]: https://app.datadoghq.com/integrations/azure
[2]: https://learn.microsoft.com/cli/azure/ad/sp?view=azure-cli-latest
{{% /tab %}}
{{% tab "CLI de Azure clásica" %}}

Primero, inicia sesión en la cuenta de Azure que quieres integrar con Datadog:

```text
azure login
```

Ejecuta el comando de visualización de cuenta:

```text
az account show
```

Ingresa el valor `Tenant ID` (ID de inquilino) generado en el [cuadro de integración de Azure con Datadog][1] en **Tenant name/ID** (Nombre/ID del inquilino).

Crea un nombre y contraseña:

```text
azure ad sp create -n <NAME> -p <PASSWORD>
```

- El `<NAME>` NO se usa, pero es necesario como parte del proceso de configuración.
- La `<PASSWORD>` que elijas se debe ingresar en el [cuadro de integración de Azure con Datadog][1] en **Client Secret** (Secreto de cliente).
- El `Object Id` (ID de objeto) que devuelve este comando se usa en lugar de `<OBJECT_ID>` en el siguiente comando.

Crea una aplicación como entidad de servicio con el formato:

```text
azure role assignment create --objectId <OBJECT_ID> -o "Monitoring Reader" -c /subscriptions/<SUBSCRIPTION_ID>/
```

- Este comando le otorga a la entidad de servicio el rol `monitoring reader` (lector de monitorización) para la suscripción que quieres monitorizar.
- El `Service Principal Name` (Nombre de entidad de servicio) generado a partir de este comando se debe ingresar en el [cuadro de integración de Azure con Datadog][1] en **Client ID** (ID de cliente).
- `<SUBSCRIPTION_ID>` es la suscripción de Azure que quieres monitorizar y aparece como `ID` con `azure account show` (visualización de cuenta de azure) o en el portal.

[1]: https://app.datadoghq.com/integrations/azure
{{% /tab %}}
{{< /tabs >}}

### Integración a través de Azure Portal

{{< tabs >}}
{{% tab "Plantilla de ARM" %}}

1. En el cuadro de integración de Azure, selecciona **Configuration** > **New App Registration** > **Using Azure Portal** (Configuración > Registro de aplicación nueva > Con Azure Portal).

2. Selecciona **Management Group (Auto-Discover)** (Grupo de gestión [detección automática]) o **Individual Subscriptions** (Suscripciones individuales).
   - Si seleccionas el grupo de gestión, Datadog detecta y monitoriza de manera automática todas las suscripciones en ese contexto seleccionado, incluidas las suscripciones que se creen en el futuro. Debes tener seleccionado el rol de propietario en el grupo de gestión.
   - Si seleccionas las suscripciones individuales, debes tener el rol de propietario en todas las suscripciones que quieras monitorizar.

3. Haz clic en **Open Template** (Abrir plantilla).

{{< img src="integrations/guide/azure_manual_setup/azure_tile_arm_template.png" alt="El cuadro de Azure en la página de integraciones de Datadog con las opciones Con Azure Portal y Grupo de gestión seleccionadas" popup="true" style="width:80%;" >}}

4. Selecciona la **Region** (Región), **Subscription** (Suscripción) y **Resource Group** (Grupo de recursos) para la plantilla que se desplegará.

   **Nota**: La selección de región, suscripción y grupo de recursos solo define dónde se despliega esta plantilla. No tiene ningún efecto en las suscripciones que monitoriza Datadog.

5. Haz clic en **Siguiente**.

6. Selecciona la opción _Create new_ (Crear nuevo) en **Service principal type** (Tipo de entidad de servicio). 
7. Haz clic en el enlace **Change selection** (Cambiar selección) en **Service principal** (Entidad de servicio).
Aparece un formulario para crear un registro de aplicaciones nuevo:

{{< img src="integrations/guide/azure_manual_setup/arm_template_service_principal.png" alt="La página de la entidad de servicio en la plantilla de Azure ARM con la opción Crear nuevo seleccionada y el enlace Cambiar selección resaltado" popup="true" style="width:80%;" >}}

8. Ingresa un nombre para el registro de aplicaciones, selecciona los tipos de cuentas admitidos y haz clic en **Register** (Registrar).

9. Se abrirá una página para crear un secreto de cliente. Haz clic en **+ New client secret** (+ Secreto de cliente nuevo) para añadir un secreto de cliente.

10. Copia el valor del secreto de cliente y haz clic en el botón de cerrar **(X)** en la esquina superior derecha de la pantalla.

11. Pega el valor del secreto de cliente en el campo correspondiente de la plantilla y haz clic en **Next** (Siguiente).

12. Proporciona una clave de API de Datadog y un valor de clave de aplicación de Datadog en los campos correspondientes. Si iniciaste la plantilla desde la página de la integración de Azure en Datadog, puedes copiar las claves que se proporcionan allí. De lo contrario, puedes encontrar las claves de API y de aplicación en la sección de Acceso de los parámetros de organización.

    **Nota**: Si has elegido monitorizar suscripciones individuales en lugar de un grupo de gestión, selecciona las suscripciones a monitorizar en el menú desplegable **Subscriptions to monitor** (Suscripciones a monitorizar).

13. Selecciona tu sitio de Datadog, así como cualquier otra opción de configuración de la integración, como filtros de host y si deseas recopilar recursos para [Cloud Security][17].

14. Haz clic en **Review + create** (Revisar + crear) y, a continuación, en **Create** (Crear).

15. Una vez finalizado el despliegue, haz clic en **Done** (Hecho) en la página de integración de Azure en Datadog para actualizar la lista y revisar el registro de la aplicación recién añadida.

[17]: /es/security/cloud_security_management/
{{% /tab %}}
{{% tab "Manual" %}}

1. [Crea un registro de aplicación](#create-an-app-registration) en tu Active Directory.
2. [Otorga a la aplicación acceso de lectura](#give-read-permissions-to-the-application) a las suscripciones que desees monitorizar.
3. [Configura las credenciales de la aplicación](#complete-the-integration) en Datadog.

#### Crear un registro de aplicación

1. En **Microsoft Entra ID**, ve a **App registrations** (Registros de aplicaciones).
2. Haz clic en **New registration** (Nuevo registro).
3. Proporciona un nombre y confirma que los **Supported account types** (Tipos de cuenta admitidos) están configuradod en `Accounts in this organizational directory only`.
4. Haz clic en **Register** (Registrar).

{{< img src="integrations/guide/azure_manual_setup/azure_app_registration.png" alt="La pantalla en el portal de Azure para el registro de una aplicación" popup="true" style="width:80%;" >}}

#### Dar permisos de lectura a la aplicación

1. Asigna el acceso a nivel de suscripción individual o de grupo de gestión. 
   - Para asignar el acceso a nivel de suscripción, ve a **Subscriptions** (Suscripciones) a través del cuadro de búsqueda o de la barra lateral izquierda.
   - Para asignar el acceso a nivel de grupo de gestión, ve a **Management Groups** (Grupos de gestión) y selecciona el grupo de gestión que contiene el conjunto de suscripciones a monitorizar.<br />
   **Nota**: La asignación de acceso a nivel de grupo de gestión significa que cualquier nueva suscripción que se añada al grupo será detectada y supervisada automáticamente por Datadog.

2. Haz clic en la suscripción o grupo de gestión que desees monitorizar.
3. Selecciona **Access control (IAM)** (Control de acceso (IAM)) en el menú de suscripción y haz clic en **Add role assignment** (Añadir asignación de roles):

    {{< img src="integrations/guide/azure_manual_setup/azure-add-role.png" alt="Añadir asignación de rol" popup="true" style="width:80%">}}

4. En la pestaña **Role** (Rol), selecciona **Reader** (Lector). 
5. En la pestaña **Members** (Miembros), haz clic en **Select members** (Seleccionar miembros).
6. Introduce la aplicación creada en la sección [crear un registro de aplicación](#create-an-app-registration).
7. Haz clic en **Review + assign** (Revisar + asignar) para completar la creación.
8. Repite este proceso para las suscripciones o grupos de gestión adicionales que desees monitorizar con Datadog.

**Notas**: 
   - Los usuarios de Azure Lighthouse pueden añadir suscripciones de arrendatarios de clientes.
   - Los diagnósticos deben estar habilitados para que las máquinas virtuales desplegadas en ARM recopilen métricas, consulta [Habilitar diagnósticos][11].

#### Completar la integración

1. En **App Registrations** (Registros de aplicaciones), selecciona la aplicación que creaste, copia el **Application (client) ID** (ID de aplicación (cliente)) y el **Directory (tenant) ID** (ID de directorio (inquilino)), y pega los valores en el [cuadro de integración de Azure con Datadog][10] en **Client ID** (ID de cliente) y **Tenant ID** (ID de inquilino).
2. Para la misma aplicación, dirígete a **Manage** > **Certificates and secrets** (Gestionar > Certificados y secretos).
3. Haz clic en **+ New client secret**: (+ Nuevo secreto de cliente):
   1. Opcionalmente, proporciona una descripción.
   2. Selecciona un plazo de expiración en el campo **Expires** (Expiración).
   3. Haz clic en **Add** (Añadir).

    {{< img src="integrations/guide/azure_manual_setup/add_client_secret.png" alt="Secreto de cliente de Azure" popup="true" style="width:80%">}}

4. Cuando se muestre el valor de la clave, copia y pega el valor en el [cuadro de integración de Datadog y Azure][10] en **Client Secret** (Secreto de cliente).
5. Haz clic en **Create Configuration** (Crear configuración).

**Nota**: Las actualizaciones de la configuración de Azure pueden tardar hasta 20 minutos en reflejarse en Datadog.

[10]: https://app.datadoghq.com/integrations/azure
[11]: /es/integrations/guide/azure-troubleshooting/#enable-diagnostics
{{% /tab %}}
{{< /tabs >}}

### Configuración

A fin de limitar la recopilación de métricas para los hosts basados ​​en Azure, abre el cuadro de integración de Azure. Selecciona la pestaña **Configuration** (Configuración) y, a continuación, abre **App Registrations** (Registros de aplicaciones). Ingresa una lista de etiquetas (tags) en el cuadro de texto debajo de **Metric Collection Filters** (Filtros de recopilación de métricas).

Esta lista de etiquetas en formato `<KEY>:<VALUE>` se encuentra separada por comas y define un filtro que se usa al recopilar métricas. También se pueden usar comodines como `?` (para caracteres individuales) y `*` (para varios caracteres).

Solo las VMs que coinciden con una de las etiquetas definidas se importan a Datadog. El resto se ignoran. Las VMs que coinciden con una etiqueta determinada también se pueden excluir al añadir `!` antes de la etiqueta. Por ejemplo:

```text
datadog:monitored,env:production,!env:staging,instance-type:c1.*
```

### Monitorizar el estado de la integración

Una vez que se haya configurado la integración, Datadog comienza a ejecutar una serie continua de llamadas a las APIs de Azure para recopilar datos de monitorización críticos de tu entorno de Azure. A veces, estas llamadas devuelven errores (por ejemplo, si las credenciales proporcionadas han expirado). Estos errores pueden inhibir o bloquear la capacidad de Datadog para recopilar datos de monitorización.

Cuando se detectan errores críticos, la integración de Azure genera eventos en el explorador de eventos de Datadog y los vuelve a publicar cada cinco minutos. Puedes configurar un monitor de eventos para que se active cuando se detecten estos eventos y notifique al equipo correspondiente.

Datadog proporciona una plantilla de monitor para ayudarte a empezar. Para utilizar la plantilla de monitor:

1. En Datadog, ve a **Monitors** (Monitores) y haz clic en **Browse Templates** (Buscar plantillas).
2. Busca y selecciona la plantilla de monitor titulada [Errores de integración de [Azure]][8].
3. Realiza las modificaciones que quieras en la consulta de búsqueda o en las condiciones de alerta. De manera predeterminada, el monitor se activa cuando se detecta un error nuevo y se resuelve cuando no se ha detectado el error durante los últimos 15 minutos.
4. Actualiza los mensajes de notificación y notificación nueva según lo consideres. Ten en cuenta que los eventos en sí contienen información relevante sobre el evento y se incluyen en la notificación de manera automática. Esto incluye información detallada sobre el contexto, la respuesta a errores y los pasos comunes para solucionarlos.
5. [Configura notificaciones][9] a través de tus canales preferidos (correo electrónico, Slack, PagerDuty u otros) para asegurarte de que tu equipo esté alerta sobre los problemas que afectan la recopilación de datos de Azure.

### Recopilación de métricas

Una vez que se haya configurado el cuadro de integración, un rastreador recopila las métricas. Para recopilar métricas adicionales, despliega el Datadog Agent en tus VMs:

### Instalación del Agent

Puedes usar la extensión de Azure para instalar el Datadog Agent en VMs de Windows, Linux x64 y Linux basadas en ARM. También puedes usar la extensión del clúster de AKS para desplegar el Agent en tus clústeres de AKS.

{{< tabs >}}
{{% tab "Extensión de VM" %}}

1. En [Azure Portal][4], selecciona la VM adecuada.
2. En la barra lateral izquierda, en **Settings** (Configuración), selecciona **Extensions + applications (Extensiones + aplicaciones).
3. Haz clic en **+ Add** (+ Añadir).
4. Busca y selecciona la extensión `Datadog Agent`.
5. Haz clic en **Siguiente**.
6. Ingresa tu [clave de API de Datadog][2] y [sitio de Datadog][1], y haz clic en **OK** (Aceptar).

Para instalar el Agent en función del sistema operativo o herramienta de CI y CD, consulta las [instrucciones de instalación del Datadog Agent][3].

**Nota**: Los controladores de dominio no son compatibles al instalar el Datadog Agent con la extensión de Azure.

[1]: /es/getting_started/site/
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://portal.azure.com
{{% /tab %}}

{{% tab "Extensión del clúster de AKS" %}}

La extensión del clúster de AKS de Datadog te permite desplegar el Datadog Agent de manera nativa en Azure AKS, lo que evita la complejidad de las herramientas de gestión de terceros. Para instalar el Datadog Agent con la extensión del clúster de AKS:

1. Dirígete a tu clúster de AKS en Azure Portal.
2. En la barra lateral izquierda del clúster de AKS, selecciona **Extensions + applications** (Extensiones + aplicaciones) en **Settings** (Configuración).
3. Busca y selecciona `Datadog AKS Cluster Extension` (Extensión del clúster de AKS de Datadog).
4. Haz clic en **Create** (Crear) y sigue las instrucciones del cuadro con tus [credenciales de Datadog][1] y el [sitio de Datadog][2].

[1]: /es/account_management/api-app-keys/
[2]: /es/getting_started/site/
{{% /tab %}}
{{< /tabs >}}

#### Envío de Logs

Consulta la [guía de registro de Azure][5] para configurar el reenvío de logs desde tu entorno de Azure a Datadog.

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/integrations/azure/
[2]: https://us3.datadoghq.com/signup
[3]: /es/integrations/guide/azure-portal/
[4]: https://portal.azure.com/#blade/HubsExtension/BrowseResource/resourceType/Microsoft.Datadog%2Fmonitors
[5]: /es/logs/guide/azure-logging-guide
[6]: /es/integrations/guide/azure-native-manual-setup/
[7]: https://learn.microsoft.com/azure/cloud-shell/get-started/
[8]: https://app.datadoghq.com/monitors/templates?q=Azure%20%22integration%20errors%22&origination=all&p=1
[9]: /es/monitors/notify/#configure-notifications-and-automations
[12]: https://learn.microsoft.com/azure/partner-solutions/datadog/overview
[13]: /es/integrations/guide/azure-native-manual-setup/
[15]: https://learn.microsoft.com/entra/identity/role-based-access-control/permissions-reference#privileged-role-administrator
[17]: https://learn.microsoft.com/entra/identity/role-based-access-control/permissions-reference#application-developer