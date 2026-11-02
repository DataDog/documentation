---
aliases:
- /es/integrations/guide/azure-manual-setup/
- /es/integrations/guide/azure-programmatic-management/
description: Conecte Microsoft Azure con Datadog utilizando las opciones de integración
  de registro de aplicaciones de Azure. Configure la recopilación de métricas, el
  reenvío de registros y la instalación del Agent.
further_reading:
- link: https://docs.datadoghq.com/integrations/azure/#overview
  tag: Documentación
  text: Integración con Microsoft Azure
- link: https://docs.datadoghq.com/agent/guide/why-should-i-install-the-agent-on-my-cloud-instances/
  tag: Guía
  text: ¿Por qué debería instalar el Datadog Agent en mis instancias en la nube?
- link: https://www.datadoghq.com/blog/azure-integration-onboarding/
  tag: Blog
  text: Acelere la configuración de su integración con Azure con la incorporación
    guiada
- link: https://www.datadoghq.com/blog/azure-secretless-authentication/
  tag: Blog
  text: Evite la rotación de secretos de Azure con la autenticación sin secretos
title: Primeros pasos con Azure
---
## Descripción general {#overview}

Datadog ofrece múltiples opciones de configuración para la integración con Azure. Esta guía proporciona una descripción general de las diversas opciones disponibles para comenzar con Azure, con enlaces a recursos y tutoriales de Azure que abordan casos de uso específicos.

## Requisitos previos {#prerequisites}

Si aún no lo ha hecho, cree una [cuenta de Datadog][2].

{{% collapse-content title="Permisos necesarios para la configuración de la integración" level="h3" expanded=false id="required-permissions" %}}

### En Azure {#in-azure}

Su usuario de Microsoft Entra ID necesita los siguientes permisos:

#### Permiso para crear un registro de aplicación {#permission-to-create-an-app-registration}

**Una** de las siguientes condiciones debe cumplirse para el usuario:

- `Users can register applications` se ha establecido en `Yes`
- El usuario tiene el rol de [Application Developer][38]

##### Roles de administrador dentro de sus suscripciones {#admin-roles-within-your-subscriptions}

Dentro de las suscripciones que desea hacer un seguimiento, debe tener uno de los siguientes:

- El rol {{< ui >}}Owner{{< /ui >}}
- Tanto el rol {{< ui >}}Contributor{{< /ui >}} como el {{< ui >}}User Access Admin{{< /ui >}}

#### Permiso para agregar y otorgar consentimiento para los permisos de Graph API {#permission-to-add-and-grant-consent-for-graph-api-permissions}

El [rol de Administrador de roles con privilegios][25] contiene los permisos necesarios.

### En Datadog {#in-datadog}

El `Datadog Admin Role`, o cualquier otro rol con el permiso `azure_configurations_manage`.

{{% /collapse-content %}}

{{< site-region region="us3" >}}

<div class="alert alert-danger"><a href="https://docs.datadoghq.com/cloud_cost_management/setup/azure/?tab=billingaccounts&site=us3#overview">Cloud Cost Management</a> y <a href="https://docs.datadoghq.com/logs/log_configuration/archives/?tab=azurestorage">Archivos de registro</a> requieren el método de configuración de registro de aplicaciones. Para las cuentas de Datadog que utilizan la integración nativa de Azure, siga los pasos de configuración en esta página para crear un registro de aplicación. Si una suscripción está conectada a través de ambos métodos, aparece una advertencia de redundancia en el mosaico de integración de Azure. Esta advertencia se puede ignorar de forma segura para Cloud Cost Management y Archivos de registro.
</div>

{{< /site-region >}}


## Configuración {#setup}

Siga las instrucciones de esta página para configurar {{< ui >}}Azure integration{{< /ui >}} a través de un registro de aplicación, disponible para todos los sitios de Datadog. Durante la configuración, elija si el registro de aplicación se autentica con Datadog mediante **Secretless Auth** (recomendado) o un **Client Secret**.

{{< img src="/getting_started/integrations/azure/GSwAzure_siteSelector.mp4" alt="Selector de sitio para el sitio US3" video=true >}}

### Métodos de autenticación {#authentication-methods}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-info">Secretless Auth no es compatible con los sitios US1-FED y US2-FED. Utilice el método <strong>Client Secret</strong> para autenticarse.</div>
{{< /site-region >}}

<div class="alert alert-info">Secretless Auth no admite registros de aplicaciones en nubes soberanas de Azure, como Azure Government y Azure operado por 21Vianet (Azure China*). Para los inquilinos en estas nubes, utilice el método <strong>Client Secret</strong> para autenticarse.</div>

*{{% mainland-china-disclaimer %}}

La integración de Azure admite dos métodos de autenticación:

| Método | Cómo funciona | Qué administra |
|---|---|---|
| **Secretless Auth** (recomendado) | Datadog y Azure establecen una relación de identidad de confianza mediante una credencial federada de Azure y [federación de identidad de carga de trabajo][54] de OpenID Connect (OIDC). El registro de aplicación confía en la identidad OIDC de Datadog en lugar de un secreto almacenado, y Datadog nunca almacena un secreto. | No hay nada que rotar o renovar, lo que reduce el riesgo de brechas de ingesta por credenciales caducadas. |
| **Secreto de cliente** | Datadog almacena y se autentica con un secreto de cliente de su registro de aplicación. | Mantenga el secreto actualizado antes de que caduque. |

Usted selecciona el método de autenticación cuando crea o configura un registro de aplicación.

{{< img src="/getting_started/integrations/azure/GSwAzure_authenticationMethod.png" alt="El paso Método de autenticación en la configuración de la integración de Azure, que muestra las opciones recomendadas de Autenticación sin secretos y Secreto de cliente" style="width:100%;" >}}

{{% collapse-content title="Inicio rápido (recomendado)" level="h3" expanded=false id="quickstart-setup" %}}

### Elija el método de configuración de Inicio rápido si... {#choose-the-quickstart-setup-method-if}

- Está configurando Datadog por primera vez.
- Prefiere un flujo de trabajo basado en la UI y desea minimizar el tiempo necesario para crear un service principal con los permisos para hacer un seguimiento requeridos.
- Desea automatizar los pasos de configuración en scripts o canalizaciones de CI/CD.

### Instrucciones{#instructions}

1. En el mosaico de integración de Azure, haga clic en {{< ui >}}\+ Add New App registration{{< /ui >}}, luego seleccione {{< ui >}}Quickstart{{< /ui >}}.
2. Copie el script de configuración y ejecútelo en Azure Cloud Shell.
3. Regrese a la interfaz de usuario de Datadog. Debería ver {{< ui >}}CONNECTED{{< /ui >}} en la esquina superior derecha del script de configuración.
4. Seleccione las suscripciones y los grupos de administración de los cuales recopilar datos.
5. En {{< ui >}}Authentication Method{{< /ui >}}, seleccione {{< ui >}}Secretless Auth{{< /ui >}} (recomendado) para autenticarse con una credencial federada, o {{< ui >}}Client Secret{{< /ui >}} para almacenar y autenticarse con un secreto de cliente.
6. Opcionalmente, haga clic en el interruptor de recopilación de métricas para deshabilitar toda la recopilación de métricas de Azure. También puede expandir el menú desplegable {{< ui >}}Advanced Configuration{{< /ui >}} para filtrar las métricas por:
   - Proveedor de recursos
   - Etiquetas
   - Servidores
   - Planes de App Service
   - Container Apps

También puede hacer clic para habilitar la recopilación de métricas personalizadas desde [Azure Application Insights][36], y deshabilitar la recopilación de métricas de uso.

7. Opcionalmente, haga clic en el interruptor de recopilación de recursos para deshabilitar la recopilación de información de configuración de sus recursos de Azure.
8. Habilite la recopilación de registros para configurar los servicios y los ajustes de diagnóstico necesarios para reenviar registros a Datadog:
   1. Si ya existe un reenviador de registros en el inquilino, este se modifica para ampliar su contexto. Cualquier configuración modificada se aplica tanto a las suscripciones o grupos de administración existentes como a los recién seleccionados.
   2. Si está creando un nuevo reenviador de registros:
      1. Ingrese un nombre de grupo de recursos para almacenar el plano de control del reenviador de registros
      2. Seleccione una suscripción del plano de control para la orquestación de reenvío de registros (LFO).
      3. Seleccione una región para el plano de control.<br>
   **Nota**: Los campos de nombre del grupo de recursos, suscripción del plano de control y región solo aparecen al crear un nuevo reenviador de registros.
   3. Opcionalmente, abra {{< ui >}}Log filtering options{{< /ui >}} para filtrar registros por etiquetas, o aplique filtros para información específica (como PII) usando expresiones regulares.

   Consulte la [sección de Arquitectura][34] de la guía de reenvío automático de registros para obtener más información sobre esta arquitectura.

9. Haga clic en {{< ui >}}Confirm{{< /ui >}} para finalizar la configuración.

{{% /collapse-content %}}

{{% collapse-content title="Terraform" expanded=false level="h3" id="terraform-setup" %}}

### Elija el método de configuración de Terraform si... {#choose-the-terraform-setup-method-if}

- Usted administra la infraestructura como código y desea mantener la integración de Datadog con Azure bajo control de versiones.
- Necesita configurar varios inquilinos o suscripciones de manera consistente con bloques de proveedor reutilizables.
- Desea un proceso de implementación repetible y auditable que se ajuste a su entorno administrado por Terraform.

### Instrucciones{#instructions-1}

Siga estos pasos para implementar la integración de Datadog con Azure a través de [Terraform][23].

{{< tabs >}}
{{% tab "Crear un registro de aplicación" %}}

1. En el [mosaico de integración de Azure][100], haga clic en {{< ui >}}\+ Add New App registration{{< /ui >}}, luego seleccione {{< ui >}}Terraform{{< /ui >}}.
2. Seleccione las suscripciones y grupos de administración de los cuales recopilar datos.
3. En {{< ui >}}Authentication Method{{< /ui >}}, seleccione {{< ui >}}Secretless Auth{{< /ui >}} (recomendado) para autenticarse con una credencial federada, o {{< ui >}}Client Secret{{< /ui >}} para almacenar y autenticarse con un secreto de cliente.
4. Opcionalmente, haga clic en el interruptor de recopilación de métricas para deshabilitar toda la recopilación de métricas de Azure. También puede expandir el menú desplegable {{< ui >}}Advanced Configuration{{< /ui >}} para filtrar las métricas por:
   - Proveedor de recursos
   - Etiquetas
   - Servidores
   - Planes de App Service
   - Container Apps

   También puede hacer clic para habilitar la recopilación de métricas personalizadas desde [Azure Application Insights][101] y deshabilitar la recopilación de métricas de uso.
5. Opcionalmente, haga clic en el interruptor de recopilación de recursos para deshabilitar la recopilación de información de configuración de sus recursos de Azure.
6. Copie y ejecute el comando en {{< ui >}}Initialize and apply the Terraform{{< /ui >}}.

[100]: https://app.datadoghq.com/integrations/azure/
[101]: https://learn.microsoft.com/azure/azure-monitor/app/app-insights-overview
{{% /tab %}}

{{% tab "Utilizar un registro de aplicación existente" %}}



- Ya tiene un registro de aplicación configurado con el rol {{< ui >}}Monitoring Reader{{< /ui >}} para que Datadog haga un seguimiento del contexto proporcionado (suscripciones o grupos de administración) y no desea crear nuevos recursos.

1. Configure el [proveedor de Terraform de Datadog][200] para interactuar con la Datadog API a través de una configuración de Terraform.
2. Configure su archivo de configuración de Terraform utilizando el ejemplo a continuación como plantilla base. Actualice los siguientes parámetros antes de aplicar los cambios:
    * `tenant_name`: Su ID de Azure Active Directory.
    * `client_id`: Su ID de aplicación (cliente) de Azure.
    * `secretless_auth_enabled`: Establézcalo en `true` para autenticarse con una credencial federada en lugar de un secreto de cliente (recomendado). Para autenticarse con un secreto de cliente en su lugar, elimine este parámetro y establezca `client_secret` en el valor del secreto del registro de la aplicación.

   La autenticación sin secretos (Secretless Auth) requiere una credencial federada en el registro de la aplicación que confíe en la identidad de Datadog. Consulte [Métodos de autenticación](#authentication-methods).

   Consulte la página [Datadog Azure integration resource][201] en el registro de Terraform para ver más ejemplos de uso y la lista completa de parámetros opcionales, así como recursos adicionales de Datadog.

{{< code-block lang="hcl" filename="" disable_copy="false" collapsible="false" >}}

resource "datadog_integration_azure" "sandbox" {
  tenant_name             = "<AZURE_TENANT_NAME>"
  client_id               = "<AZURE_CLIENT_ID>"
  secretless_auth_enabled = true
}

{{< /code-block >}}

3. Ejecute `terraform apply`. Espere hasta 10 minutos para que los datos comiencen a recopilarse y, luego, visualice el panel de descripción general de Azure predeterminado para ver las métricas enviadas por sus recursos de Azure.

[200]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs
[201]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_azure
{{% /tab %}}
{{< /tabs >}}

#### Administración de varias suscripciones o inquilinos {#managing-multiple-subscriptions-or-tenants}

Puede usar varios bloques de proveedor con alias para administrar recursos de Terraform en varias suscripciones o inquilinos. Consulte [Configuración del proveedor][22] para obtener más información.

### Seguimiento del estado de la integración {#monitor-the-integration-status}

Después de configurar la integración, Datadog comienza a ejecutar una serie continua de llamadas a las API de Azure para recopilar datos de seguimiento críticos de su entorno de Azure. A veces, estas llamadas devuelven errores (por ejemplo, si las credenciales proporcionadas han caducado). Estos errores pueden inhibir o bloquear la capacidad de Datadog para recopilar datos de seguimiento.

Cuando se encuentran errores críticos, la integración de Azure genera eventos en el Explorador de eventos de Datadog y los vuelve a publicar cada cinco minutos. Puede configurar un monitor de eventos para que se active cuando se detecten estos eventos y notifique al equipo correspondiente.

Datadog proporciona una plantilla de monitor para ayudarle a comenzar. Para usar la plantilla de monitor:

1. En Datadog, vaya a {{< ui >}}Monitors{{< /ui >}} y haga clic en el botón {{< ui >}}Browse Templates{{< /ui >}}.
2. Busque y seleccione la plantilla de monitor titulada [[Azure] Integration Errors][26].
3. Realice las modificaciones deseadas en la consulta de búsqueda o en las condiciones de alerta. De forma predeterminada, el monitor se activa cada vez que se detecta un error nuevo y se resuelve cuando el error no se ha detectado durante los últimos 15 minutos.
4. Actualice los mensajes de notificación y renotificación según lo desee. Tenga en cuenta que los eventos en sí contienen información pertinente sobre el evento y se incluyen en la notificación automáticamente. Esto incluye información detallada sobre el contexto, la respuesta de error y los pasos comunes para remediar.
5. [Configure las notificaciones][27] a través de sus canales preferidos (correo electrónico, Slack, PagerDuty u otros) para asegurarse de que su equipo reciba una alerta sobre problemas que afecten la recopilación de datos de Azure.

{{% /collapse-content %}}

{{% collapse-content title="Utilizar un registro de aplicación existente" level="h3" expanded=false id="existing-app-registration-setup" %}}

### Elija el método de configuración de registro de aplicaciones existente si... {#choose-the-existing-app-registration-setup-method-if}

- Ya tiene un registro de aplicación configurado con el rol {{< ui >}}Monitoring Reader{{< /ui >}} para que Datadog haga un seguimiento del contexto proporcionado (suscripciones o grupos de administración) y no desea crear nuevos recursos.

Si necesita configurar un registro de aplicación para Datadog, consulte los métodos de configuración de [Quickstart](#quickstart-setup) o [Terraform](#terraform-setup).

### Instrucciones{#instructions-2}

1. En el [mosaico de integración de Datadog Azure][20], seleccione {{< ui >}}Add Existing{{< /ui >}}.
2. En el campo {{< ui >}}Tenant ID{{< /ui >}}, pegue su ID de directorio (inquilino).
3. En el campo {{< ui >}}Client ID{{< /ui >}}, pegue el ID de aplicación (cliente).
4. En el campo {{< ui >}}Client Secret Value{{< /ui >}}, pegue el valor del secreto de cliente del registro de la aplicación.
5. Opcionalmente, haga clic en el interruptor {{< ui >}}Monitor Automuting{{< /ui >}} para deshabilitar la automutación de monitor.
6. Opcionalmente, haga clic en el interruptor de recopilación de métricas para deshabilitar toda la recopilación de métricas de Azure. También puede expandir el menú desplegable {{< ui >}}Advanced Configuration{{< /ui >}} para filtrar las métricas por:
   - Proveedor de recursos
   - Etiquetas
   - Servidores
   - Planes de App Service
   - Container Apps

También puede hacer clic para habilitar la recopilación de métricas personalizadas desde [Azure Application Insights][36], y deshabilitar la recopilación de métricas de uso.

6. Opcionalmente, haga clic en el interruptor de recopilación de recursos para deshabilitar la recopilación de información de configuración de sus recursos de Azure.
7. Haga clic en {{< ui >}}Create Configuration{{< /ui >}}.

{{% /collapse-content %}}

{{% collapse-content title="Migre un registro de aplicación existente a Secretless Auth" level="h4" expanded=false id="secretless-migration-setup" %}}

Si ya conectó un registro de aplicación usando un secreto de cliente, puede migrarlo a Secretless Auth en el mismo lugar. No necesita volver a crear el registro de la aplicación. Secretless Auth no admite registros de aplicaciones en nubes soberanas de Azure. Consulte [Métodos de autenticación](#authentication-methods).

1. En el [mosaico de integración de Azure][20], en la pestaña {{< ui >}}Configuration{{< /ui >}}, seleccione el registro de la aplicación que desea migrar.
2. En la pestaña {{< ui >}}General{{< /ui >}}, bajo {{< ui >}}Authentication{{< /ui >}}, haga clic en {{< ui >}}Set Up Secretless Auth{{< /ui >}}.

   {{< img src="/getting_started/integrations/azure/GSwAzure_secretlessMigration.png" alt="La pestaña General de un registro de aplicación, con una llamada que recomienda Secretless Auth y un botón Set Up Secretless Auth" style="width:100%;" >}}

En el cuadro de diálogo {{< ui >}}Secretless Authentication Setup{{< /ui >}}, seleccione un método de configuración y luego complete los pasos para ese método:

{{< img src="/getting_started/integrations/azure/GSwAzure_secretlessSetupModal.png" alt="El cuadro de diálogo de configuración de Secretless Authentication con los métodos de configuración de Azure CLI, Terraform y Azure Portal, y los pasos para crear una credencial federada, verificarla y completar la configuración" style="width:100%;" >}}

{{< tabs >}}
{{% tab "CLI de Azure" %}}

1. Ejecute el comando `az ad app federated-credential create` proporcionado en una terminal con la CLI de Azure configurada para el inquilino correcto, o haga clic en {{< ui >}}Open Azure Cloud Shell{{< /ui >}}.
2. Haga clic en {{< ui >}}Verify Credential{{< /ui >}} para probar la autenticación.
3. Haga clic en {{< ui >}}Confirm{{< /ui >}}. Su secreto de cliente se elimina cuando la configuración se realiza correctamente.

{{% /tab %}}
{{% tab "Terraform" %}}

Este método requiere la versión `azuread` del proveedor 3.7.0 o posterior.

1. Agregue el recurso de credencial federada que se muestra en el cuadro de diálogo a la misma configuración que administra su integración de Azure con Datadog, luego aplíquelo. Copie los valores `issuer` y `subject` del cuadro de diálogo.

   {{< code-block lang="hcl" filename="" disable_copy="false" collapsible="false" >}}
resource "azuread_application_federated_identity_credential" "datadog_federated_credential" {
  # Reference the ID of this app registration
  application_id = azuread_application.datadog_app.id
  display_name   = "datadog"
  description    = "Federated credential that permits Datadog to authenticate without storing a client secret"
  audiences      = ["api://AzureADTokenExchange"]
  issuer         = "<ISSUER>"
  subject        = "<SUBJECT>"
}
   {{< /code-block >}}

2. Haga clic en {{< ui >}}Verify Credential{{< /ui >}} para probar la autenticación.
3. Modifique su recurso `datadog_integration_azure` para usar Secretless Auth:
   - Agregue el recurso de credencial federada a la lista de dependencias de la integración.
   - Reemplace la configuración `client_secret` con `secretless_auth_enabled = true`.
   - Aplique los cambios.

{{% /tab %}}
{{% tab "Azure Portal" %}}

1. En el Azure Portal, abra el registro de la aplicación y vaya a {{< ui >}}Certificates & secrets{{< /ui >}} > {{< ui >}}Federated credentials{{< /ui >}} > {{< ui >}}Add credential{{< /ui >}}.
2. Seleccione {{< ui >}}Other issuer{{< /ui >}}, luego ingrese los valores de {{< ui >}}Issuer{{< /ui >}}, {{< ui >}}Subject{{< /ui >}} y {{< ui >}}Audience{{< /ui >}} exactamente como se muestra en el cuadro de diálogo.
3. Haga clic en {{< ui >}}Verify Credential{{< /ui >}} para probar la autenticación.
4. Haga clic en {{< ui >}}Confirm{{< /ui >}}. Su secreto de cliente se elimina cuando la configuración se realiza correctamente.

{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}}

## Recopilación de métricas {#metric-collection}

La integración de Azure de Datadog está diseñada para recopilar todas las métricas de [Azure Monitor][8]. La [página de Integrations][9] muestra una lista seleccionada de subintegraciones predefinidas que proporcionan paneles y monitores adicionales listos para usar para servicios específicos de Azure. Muchas de estas integraciones se instalan de forma predeterminada cuando Datadog reconoce datos provenientes de su cuenta de Azure. Sin embargo, Datadog puede ingerir métricas de **cualquier recurso compatible con Azure Monitor**, incluso si no tiene un mosaico de subintegración dedicado.

Puede encontrar sus métricas de Azure en la página de resumen de métricas en la plataforma de Datadog navegando a `Metrics > Summary` y buscando `Azure`.

{{< img src="/getting_started/integrations/azure/GSwAzure_metricExplorer.png" alt="Imagen de resumen de métricas" style="width:100%;" >}}

### Filtrado de etiquetas de recursos para métricas {#resource-tag-filtering-for-metrics}

Utilice filtros de etiquetas para controlar qué recursos de Azure tienen sus métricas recopiladas por Datadog. Configure los filtros de etiquetas en la pestaña {{< ui >}}Configuration{{< /ui >}} del [mosaico de integración de Azure][20]. Un filtro de etiquetas es una lista separada por comas de etiquetas en el formato `key:value`. Solo los recursos que coinciden con al menos una etiqueta en el filtro tienen sus métricas recopiladas.

Puede utilizar comodines en sus filtros de etiquetas:
- `?` coincide con un solo carácter.
- `*` coincide con varios caracteres.

Para excluir recursos con una etiqueta determinada, anteponga `!` a la etiqueta. La exclusión tiene prioridad sobre la inclusión. Un recurso coincide con el filtro si coincide con cualquier etiqueta de la lista.

Por ejemplo: `datadog:monitored,env:production,!plan_tier:basic,instance-type:c1.*`

Este filtro recopila métricas de recursos etiquetados con `datadog:monitored` o `env:production`, excluye recursos etiquetados con `plan_tier:basic` e incluye recursos con una etiqueta `instance-type` que coincida con `c1.*`.

Si no se establece ningún filtro de etiquetas, Datadog recopila métricas de todos los recursos de Azure.

## Habilitar la recopilación de registros {#enable-log-collection}

Puede utilizar la función de reenvío automático de registros para configurar los servicios y los ajustes de diagnóstico necesarios para reenviar registros a Datadog. Si ya existe un plano de control de reenvío automático de registros en el inquilino, este flujo lo modifica y extiende su contexto para incluir las suscripciones o grupos de administración seleccionados. Para obtener más detalles, consulte [Azure Automated Log Forwarding Setup][19].

Datadog recomienda utilizar el Agent o DaemonSet para enviar registros desde Azure. Si la transmisión directa no es posible, utilice el flujo {{< ui >}}Configure Log Forwarding{{< /ui >}} en la [integración de Azure][20] para configurar y administrar el reenvío automático de registros directamente en Datadog. También puede implementar el reenvío de registros con una [plantilla de Azure Resource Manager (ARM)][19]. Ambos métodos administran y escalan automáticamente los servicios de reenvío de registros.

{{% collapse-content title="Automatizado (recomendado)" level="h3" expanded=false id="automated-log-forwarding-setup" %}}

### Elija el método de configuración de reenvío automático de registros si... {#choose-the-automated-log-forwarding-setup-method-if}

- Aún no ha configurado los registros mediante el método de [configuración rápida](#azure-quickstart-setup).
- Prefiere un flujo de trabajo basado en la UI y desea minimizar el tiempo necesario para crear un service principal con los permisos para hacer un seguimiento requeridos.
- Desea automatizar los pasos de configuración en scripts o canalizaciones de CI/CD.

### Instrucciones{#instructions-3}

#### Configurar el reenvío de registros (recomendado) {#configure-log-forwarding-recommended}

Utilice el flujo {{< ui >}}Configure Log Forwarding{{< /ui >}} para configurar nuevos reenviadores de registros o administrar los existentes directamente en Datadog:

1. En Datadog, navegue a [{{< ui >}}Integrations{{< /ui >}} > {{< ui >}}Azure{{< /ui >}}][20].
1. Haga clic en {{< ui >}}Configure Log Forwarding{{< /ui >}}.
1. Copie el comando proporcionado y péguelo en su Azure Cloud Shell.
1. Seleccione las suscripciones desde las cuales reenviar registros.
1. Opcionalmente, agregue o elimine filtros de registros.
1. Haga clic en {{< ui >}}Confirm{{< /ui >}}.

Para obtener más detalles, consulte [Azure Automated Log Forwarding Setup][19].

#### Plantilla ARM {#arm-template}

Como alternativa, implemente el reenvío de registros con una plantilla de Azure Resource Manager (ARM):

1. Abra la [Automated Log Forwarding ARM template][29] en Azure.
1. Configure los detalles de su proyecto e instancia de Azure en la [Basics tab][30].
1. Ingrese sus credenciales de Datadog en la [Datadog Configuration tab][31].
1. Acepte las advertencias de implementación en la [Deployment tab][32].
1. Inicie el proceso de implementación en la [Review + create tab][33].

{{< site-region region="us3" >}}

<div class="alert alert-danger"><a href="https://docs.datadoghq.com/logs/log_configuration/archives/?tab=azurestorage">Archivos de registros</a> requieren el método de configuración de registro de aplicaciones. Para las cuentas de Datadog que utilizan la integración nativa de Azure, siga los pasos de esta página para crear un registro de aplicaciones.
</div>

{{< /site-region >}}

Consulte [Azure Automated Log Forwarding Architecture][34] para obtener más detalles.

{{% /collapse-content %}}

{{% collapse-content title="Container App" level="h3" expanded=false id="container-app-log-forwarding-setup" %}}

### Elija el método de reenvío de registros de Container App si... {#choose-the-container-app-log-forwarding-method-if}

- Prefiere configurar manualmente los [ajustes de diagnóstico][53] en los recursos desde los cuales desea reenviar registros.

## Instrucciones{#instructions-4}

1. Haga clic en el botón a continuación y complete el formulario en el Portal de Azure. Datadog implementa automáticamente los recursos de Azure necesarios para reenviar registros a su cuenta de Datadog.

   [![Deploy to Azure](https://aka.ms/deploytoazurebutton)][52]

2. Una vez finalizada la implementación de la plantilla, configure los [ajustes de diagnóstico][53] para cada fuente de registro a fin de enviar los registros de la plataforma Azure (incluidos los registros de recursos) a la cuenta de almacenamiento creada durante la implementación.

**Nota**: Los recursos solo pueden transmitir datos a una cuenta de almacenamiento en la misma región de Azure.

{{% /collapse-content %}}

{{% azure-log-archiving %}}

### Filtrado de etiquetas de recursos para registros {#resource-tag-filtering-for-logs}

Utilice filtros de etiquetas para controlar qué recursos de Azure tienen sus registros reenviados a Datadog. Para configurar filtros de etiquetas para registros, haga clic en {{< ui >}}Configure Log Forwarding{{< /ui >}} en el [Azure integration tile][20] y siga el flujo. Un filtro de etiquetas es una lista separada por comas de etiquetas en el formato `key:value`. Solo los recursos que coinciden con al menos una etiqueta en el filtro tienen sus registros reenviados.

Puede utilizar comodines en sus filtros de etiquetas:
- `?` coincide con un solo carácter.
- `*` coincide con varios caracteres.

Para excluir recursos con una etiqueta determinada, anteponga `!` a la etiqueta. La exclusión tiene prioridad sobre la inclusión. Un recurso coincide con el filtro si coincide con cualquier etiqueta de la lista.

Por ejemplo: `datadog:monitored,env:production,!plan_tier:basic,instance-type:c1.*`

Este filtro reenvía registros de recursos etiquetados con `datadog:monitored` o `env:production`, excluye recursos etiquetados con `plan_tier:basic` e incluye recursos con una etiqueta `instance-type` que coincida con `c1.*`.

Si no se establece ningún filtro de etiquetas, Datadog reenvía los registros de todos los recursos de Azure.

## Obtenga más de la plataforma Datadog {#get-more-from-the-datadog-platform}

### Instale el Agent para obtener una mayor visibilidad de su aplicación {#install-the-agent-for-greater-visibility-into-your-application}

Después de configurar su integración de Azure, los rastreadores de Datadog recopilan automáticamente las métricas de Azure, pero puede obtener una visibilidad aún más profunda de sus instancias de Azure con el [Datadog Agent][1]. La instalación del Datadog Agent en su entorno le permite recopilar datos adicionales, incluidos, entre otros:
- **Estado de la aplicación**
- **Utilización de procesos**
- **Métricas a nivel de sistema**

También puede utilizar el cliente StatsD integrado para enviar métricas personalizadas desde sus aplicaciones, a fin de correlacionar lo que sucede con sus aplicaciones, usuarios y sistema. Consulte la guía sobre [_¿Por qué debería instalar el Datadog Agent en mis instancias en la nube?_][15] para obtener más información sobre los beneficios de instalar el Datadog Agent en sus instancias.

Utilice la extensión de Azure para instalar el Datadog Agent en VM Windows, VM Linux x64 y VM Linux basadas en ARM. También puede utilizar la extensión de AKS Clúster para implementar el Agent en sus clústeres de AKS.

{{< tabs >}}
{{% tab "Extensión de VM" %}}

1. En el [portal de Azure][4], seleccione la VM adecuada.
2. En la barra lateral izquierda, en {{< ui >}}Settings{{< /ui >}}, seleccione {{< ui >}}Extensions + applications{{< /ui >}}.
3. Haga clic en {{< ui >}}\+ Add{{< /ui >}}.
4. Busque y seleccione la {{< ui >}}Datadog Agent{{< /ui >}} extensión.
5. Haga clic en {{< ui >}}Next{{< /ui >}}.
6. Ingrese su [clave de Datadog API][2] y [sitio de Datadog][1], y haga clic en {{< ui >}}OK{{< /ui >}}.

Para instalar el Agent según el sistema operativo o la herramienta de CI y CD, consulte las [instrucciones de instalación de Datadog Agent][3].

**Nota**: Los controladores de dominio no son compatibles al instalar el Datadog Agent con la extensión de Azure.

[1]: /es/getting_started/site/
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://portal.azure.com
{{% /tab %}}

{{% tab "Extensión de clúster de AKS" %}}

La extensión de clúster de AKS de Datadog le permite implementar el Datadog Agent de forma nativa dentro de Azure AKS, evitando la complejidad de las herramientas de gestión de terceros. Para instalar el Datadog Agent con la extensión de clúster de AKS:

1. Vaya a su clúster de AKS en el portal de Azure.
2. En la barra lateral izquierda del clúster de AKS, seleccione {{< ui >}}Extensions + applications{{< /ui >}} en {{< ui >}}Settings{{< /ui >}}.
3. Busque y seleccione el {{< ui >}}Datadog AKS Cluster Extension{{< /ui >}}.
4. Haga clic en {{< ui >}}Create{{< /ui >}} y siga las instrucciones en el tile utilizando sus [credenciales de Datadog][1] y su [sitio de Datadog][2].

[1]: /es/account_management/api-app-keys/
[2]: /es/getting_started/site/
{{% /tab %}}
{{< /tabs >}}

## Solución de problemas {#troubleshooting}

Consulte [Solución de problemas][16] en la guía de Configuración avanzada de Azure.

¿Aún necesita ayuda? Comuníquese con el [soporte de Datadog][17].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/getting_started/agent/
[2]: https://www.datadoghq.com/
[5]: https://learn.microsoft.com/azure/event-hubs/event-hubs-create
[8]: https://learn.microsoft.com/azure/azure-monitor/reference/supported-metrics/metrics-index
[9]: /es/integrations/#cat-azure
[15]: /es/agent/guide/why-should-i-install-the-agent-on-my-cloud-instances/
[16]: /es/integrations/guide/azure-advanced-configuration/#azure-integration-troubleshooting
[17]: /es/help/
[19]: /es/logs/guide/azure-automated-log-forwarding/
[20]: https://app.datadoghq.com/integrations/azure
[21]: https://learn.microsoft.com/cli/azure/ad/sp?view=azure-cli-latest
[22]: https://developer.hashicorp.com/terraform/language/providers/configuration
[23]: https://www.terraform.io
[25]: https://learn.microsoft.com/entra/identity/role-based-access-control/permissions-reference#privileged-role-administrator
[26]: https://app.datadoghq.com/monitors/templates?q=Azure%20%22integration%20errors%22&origination=all&p=1
[27]: /es/monitors/notify/#configure-notifications-and-automations
[28]: /es/integrations/guide/azure-advanced-configuration/#enable-diagnostics
[29]: https://portal.azure.com/#create/Microsoft.Template/uri/CustomDeploymentBlade/uri/https%3A%2F%2Fraw.githubusercontent.com%2FDataDog%2Fintegrations-management%2Fmain%2Fazure%2Flogging_install%2Fdist%2Fazuredeploy.json/createUIDefinitionUri/https%3A%2F%2Fraw.githubusercontent.com%2FDataDog%2Fintegrations-management%2Fmain%2Fazure%2Flogging_install%2Fdist%2FcreateUiDefinition.json
[30]: /es/logs/guide/azure-automated-log-forwarding/#basics
[31]: /es/logs/guide/azure-automated-log-forwarding/#datadog-configuration
[32]: /es/logs/guide/azure-automated-log-forwarding/#deployment
[33]: /es/logs/guide/azure-automated-log-forwarding/#review--create
[34]: /es/logs/guide/azure-automated-log-forwarding/#architecture
[35]: /es/integrations/guide/azure-advanced-configuration/#automated-log-collection
[36]: https://learn.microsoft.com/azure/azure-monitor/app/app-insights-overview
[38]: https://learn.microsoft.com/entra/identity/role-based-access-control/permissions-reference#application-developer
[39]: https://azure.microsoft.com/services/storage/blobs/
[40]: https://docs.microsoft.com/azure/storage/blobs/storage-quickstart-blobs-portal
[41]: https://docs.microsoft.com/azure/storage/blobs/storage-quickstart-blobs-storage-explorer
[42]: https://docs.microsoft.com/azure/storage/blobs/storage-quickstart-blobs-cli
[43]: https://docs.microsoft.com/azure/storage/blobs/storage-quickstart-blobs-powershell
[44]: https://learn.microsoft.com/training/modules/store-app-data-with-azure-blob-storage/
[45]: https://portal.azure.com/#view/HubsExtension/BrowseResource/resourceType/Microsoft.Web%2Fsites/kind/functionapp
[46]: https://learn.microsoft.com/azure/azure-functions/functions-bindings-storage-blob-trigger?tabs=python-v2%2Cisolated-process%2Cnodejs-v4%2Cextensionv5&pivots=programming-language-csharp
[47]: https://learn.microsoft.com/azure/storage/common/storage-configure-connection-string#configure-a-connection-string-for-an-azure-storage-account
[48]: https://learn.microsoft.com/azure/azure-functions/functions-get-started
[49]: https://github.com/DataDog/datadog-serverless-functions/blob/master/azure/blobs_logs_monitoring/index.js
[51]: https://app.datadoghq.com/logs
[52]: https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2FDataDog%2Fintegrations-management%2Fmain%2Fazure%2Flogging_install%2Fdist%2Fforwarder.json/uiFormDefinitionUri/https%3A%2F%2Fraw.githubusercontent.com%2FDataDog%2Fintegrations-management%2Fmain%2Fazure%2Flogging_install%2Fdist%2FmanualForwarderUiDefinition.json
[53]: https://learn.microsoft.com/azure/azure-monitor/platform/diagnostic-settings
[54]: https://learn.microsoft.com/entra/workload-id/workload-identity-federation