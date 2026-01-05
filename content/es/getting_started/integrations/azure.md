---
aliases:
- /es/integrations/guide/azure-manual-setup/
- /es/integrations/guide/azure-programmatic-management/
description: Conecta Microsoft Azure con Datadog utilizando las opciones de integración
  de registro de aplicaciones de Azure. Configura la recopilación de métricas, el
  reenvío de logs y la instalación del Agent.
further_reading:
- link: https://www.datadoghq.com/blog/azure-integration-onboarding/
  tag: Blog
  text: AcelerA la configuración de la integración de Azure con una incorporación
    guiada
- link: https://docs.datadoghq.com/integrations/azure/#overview
  tag: Documentación
  text: Integración de Microsoft Azure
- link: https://docs.datadoghq.com/agent/guide/why-should-i-install-the-agent-on-my-cloud-instances/
  tag: Guía
  text: ¿Por qué debería instalar el Datadog Agent en mis instancias de la nube?
title: Empezando con Azure
---

## Información general

Datadog ofrece múltiples opciones de configuración para la integración con Azure. Esta guía ofrece una visión general de las distintas opciones disponibles para empezar a trabajar con Azure, con enlaces a recursos y tutoriales de Azure que abordan casos de uso específicos.

## Requisitos previos

Si aún no lo has hecho, crea una [cuenta de Datadog][2].

{{% collapse-content title="Permisos necesarios para la configuración de la integración" level="h4" expanded=false id="required-permissions" %}}

### En Azure

Tu usuario de Microsoft Entra ID necesita los siguientes permisos:

#### Permiso para crear un registro de aplicación

**Una** de las siguientes condiciones debe ser cierta para el usuario:

- `Users can register applications` se ha fijado en `Yes`
- El usuario tiene el rol [Desarrollador de aplicaciones][38]

##### Roles administrativos en tus suscripciones

Dentro de las suscripciones que deseas monitorizar, debes tener:

- El rol de **Propietario**
- Tanto los roles **Contributor** como **User Access Admin**.

#### Permiso para añadir y conceder consentimiento para permisos de Graph API

El [rol de administrador privilegiado][25] contiene los permisos necesarios.

### En Datadog

El `Datadog Admin Role`, o cualquier otro rol con el permiso `azure_configurations_manage`.

{{% /collapse-content %}}

{{< site-region region="us3" >}}

<div class="alert alert-danger"><a href="https://docs.datadoghq.com/cloud_cost_management/setup/azure/?tab=billingaccounts&site=us3#overview">Cloud Cost Management</a> y <a href="https://docs.datadoghq.com/logs/log_configuration/archives/?tab=azurestorage">Log Archives</a> requieren el método de configuración de registro de aplicaciones. Para las cuentas de Datadog que utilizan la integración de Azure Native, sigue los pasos de configuración en esta página para crear un registro de aplicación. Si una suscripción se conecta a través de ambos métodos, aparecerá una advertencia de redundancia en el cuadro de integración de Azure. Esta advertencia puede ignorarse con seguridad para Cloud Cost Management y Log Archives.
</div>

{{< /site-region >}}


## Instalación

Sigue las instrucciones de este página para configurar la **integración con Azure** a través de un registro de aplicación, disponible para todos los sitios de Datadog.

{{< img src="/getting_started/integrations/azure/GSwAzure_siteSelector.mp4" alt="Selector de sitios para sitios US3" video=true >}}

{{% collapse-content title="Inicio rápido (recomendado)" level="h4" expanded=false id="quickstart-setup" %}}

### Elige el método de instalación Inicio rápido si...

- Estás configurando Datadog por primera vez.
- Prefieres un proceso basado en la interfaz de usuario y deseas minimizar el tiempo que se tarda en crear una entidad principal de servicio con los permisos de monitorización necesarios.
- Deseas automatizar los pasos de configuración en scripts o pipelines de Continuous Integration Continuous Delivery.

### Instrucciones

1. En el cuadro de integración de Azure, haz clic en **+ Add New App registration** (+Añadir nuevo registro de aplicación) y, a continuación, selecciona **Quickstart** (Inicio rápido).
2. Copia el script de configuración y ejecútalo en el intérprete de comandos de Azure Cloud.
3. Vuelve a la interfaz de usuario de Datadog. Deberías ver **Connected** (CONECTADO) en la esquina superior derecha del script de configuración.
4. Selecciona las suscripciones y los grupos de gestión de los que recopilar datos.
5. Opcionalmente, haz clic en el conmutador de recopilación de métricas para desactivar toda la recopilación de métricas de Azure. También puedes ampliar el menú desplegable **Advanced Configuration** (Configuración avanzada) para filtrar las métricas por:
   - Proveedor de recursos
   - Etiquetas
   - Hosts
   - App Service Plans
   - Container Apps

También puedes hacer clic para activar la recopilación de métricas personalizadas de [Azure Application Insights][36] y desactivar la recopilación de métricas de uso.

6. Opcionalmente, haz clic en el conmutador de recopilación de recursos para desactivar la recopilación de información de configuración de tus recursos de Azure.
7. Habilita la recopilación de logs para establecer y configurar los servicios y parámetros de diagnóstico necesarios para reenviar logs a Datadog:
   1. Si ya existe un reenviador de logs en el inquilino, se modifica para ampliar su alcance. Los ajustes modificados se aplican tanto a las suscripciones o grupos de gestión existentes como a los recién seleccionados.
   2. Si estás creando un nuevo reenviador de log:
      1. Introduce un nombre de grupo de recursos para almacenar el plano de control del reenviador de log 
      2. Selecciona una suscripción de plano de control para la orquestación de reenvío de logs (LFO).
      3. Selecciona una región para el plano de control.<br>
   **Nota**: Los campos de nombre de grupo de recursos, suscripción del plano de control y región solo aparecen al crear un nuevo reenviador de log.
   3. Opcionalmente, abre **Log filtering options** (Opciones de filtrado de logs) para filtrar logs por etiquetas, o aplicar filtros para información específica (como PII) usando expresiones regulares.

   Consulta la [sección de Arquitectura][34] de la guía de reenvío automatizado de logs para obtener más información sobre esta arquitectura.

8. Haz clic en **Confirm** (Confirmar) para finalizar la configuración.

{{% /collapse-content %}}

{{% collapse-content title="Terraform" expanded=false level="h4" id="terraform-setup" %}}

### Elige el método de configuración de Terraform si...

- Gestionas la infraestructura como código y deseas mantener la integración de Azure en Datadog bajo control de versiones.
- Es necesario configurar varios inquilinos o suscripciones de forma coherente con bloques de proveedores reutilizables.
- Deseas un proceso de despliegue repetible y auditable que se adapte a tu entorno gestionado por Terraform.

### Instrucciones

Sigue estos pasos para desplegar la integración de Datadog y Azure a través de [Terraform][23].

{{< tabs >}}
{{% tab "Create an app registration" %}}

1. En el [cuadro de integración de Azure][100], haz clic en **+ Add New App registration** (+Añadir nuevo registro de aplicación) y, a continuación, selecciona **Terraform**.
2. Selecciona las suscripciones y los grupos de gestión de los que recopilar datos.
3. Opcionalmente, haz clic en el conmutador de recopilación de métricas para desactivar toda la recopilación de métricas de Azure. También puedes ampliar el menú desplegable **Advanced Configuration** (Configuración avanzada) para filtrar las métricas por:
   - Proveedor de recursos
   - Etiquetas
   - Hosts
   - App Service Plans
   - Container Apps

También puedes hacer clic para activar la recopilación de métricas personalizadas de [Azure Application Insights][101] y desactivar la recopilación de métricas de uso.

4. Opcionalmente, haz clic en el conmutador de recopilación de recursos para desactivar la recopilación de información de configuración de tus recursos de Azure.
5. Configurar la recopilación de logs:
   a. Si ya existe un reenviador de log en el inquilino, amplía su alcance para incluir las nuevas suscripciones o grupos de gestión.
   b. Si estás creando un nuevo reenviador de log:
      a. Introduce un nombre de grupo de recursos para almacenar el plano de control del reenviador de log.
      b. Selecciona una suscripción de plano de control para la orquestación de reenvío de logs (LFO).
      c. Selecciona una región para el plano de control.
   Consulta la [sección de Arquitectura][102] de la guía de reenvío automatizado de logs para obtener más información sobre esta arquitectura.

6. Copia y ejecuta el comando en **Initialize and apply the Terraform** (Inicializar y aplicar el Terraform).

[100]: https://app.datadoghq.com/integrations/azure/
[101]: https://learn.microsoft.com/azure/azure-monitor/app/app-insights-overview
[102]: /es/logs/guide/azure-automated-log-forwarding/#architecture
{{% /tab %}}

{{% tab "Use an existing app registration" %}}



- Ya tienes un registro de aplicación configurado con el rol **Monitoring Reader** para Datadog para monitorizar el ámbito proporcionado (suscripciones o grupos de gestión), y no deseas crear nuevos recursos.

1. Configura el proveedor de Terraform en Datadog][200] para interactuar con la API de Datadog a través de una configuración de Terraform.
2. Configura tu archivo de ajustes de Terraform utilizando el siguiente ejemplo como plantilla base. Asegúrate de actualizar los siguientes parámetros antes de aplicar los cambios:
    * `tenant_name`: tu ID de Azure Active Directory.
    * `client_id`: tu ID de aplicación (cliente) de Azure.
    * `client_secret`: tu clave secreta de aplicación web de Azure.

   Consulta la página de [Recursos de la integración de Azure con Datadog][201] en el registro de Terraform para obtener más ejemplos de uso y la lista completa de parámetros opcionales, así como recursos adicionales de Datadog.

{{< code-block lang="hcl" filename="" disable_copy="false" collapsible="false" >}}

resource "datadog_integration_azure" "sandbox" {
  tenant_name   = "<AZURE_TENANT_NAME>"
  client_id     = "<AZURE_CLIENT_ID>"
  client_secret = "<AZURE_CLIENT_SECRET_KEY>"
}

{{< /code-block >}}

3. Ejecuta `terraform apply`. Espera hasta 10 minutos para que comiencen a recopilarse los datos y, a continuación, consulta el dashboard de información general de Azure listo para usar a fin de ver las métricas enviadas por tus recursos de Azure.

[200]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs
[201]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_azure
{{% /tab %}}
{{< /tabs >}}

#### Gestión de varias suscripciones o inquilinos

Puedes usar varios bloques de proveedores con alias para gestionar recursos de Terraform en varias suscripciones o inquilinos. Lee la [configuración del proveedor][22] para obtener más información.

### Monitorizar el estado de la integración

Una vez que se haya configurado la integración, Datadog comienza a ejecutar una serie continua de llamadas a las APIs de Azure para recopilar datos de monitorización críticos de tu entorno de Azure. A veces, estas llamadas devuelven errores (por ejemplo, si las credenciales proporcionadas han expirado). Estos errores pueden inhibir o bloquear la capacidad de Datadog para recopilar datos de monitorización.

Cuando se detectan errores críticos, la integración de Azure genera eventos en el explorador de eventos de Datadog y los vuelve a publicar cada cinco minutos. Puedes configurar un monitor de eventos para que se active cuando se detecten estos eventos y notifique al equipo correspondiente.

Datadog proporciona una plantilla de monitor para ayudarte a empezar. Para utilizar la plantilla de monitor:

1. En Datadog, ve a **Monitors** (Monitores) y haz clic en el botón **Browse Templates** (Buscar plantillas).
2. Busca y selecciona la plantilla de monitor titulada [Errores de integración de [Azure]][26].
3. Realiza las modificaciones que quieras en la consulta de búsqueda o en las condiciones de alerta. De manera predeterminada, el monitor se activa cuando se detecta un error nuevo y se resuelve cuando no se ha detectado el error durante los últimos 15 minutos.
4. Actualiza los mensajes de notificación y notificación nueva según lo consideres. Ten en cuenta que los eventos en sí contienen información relevante sobre el evento y se incluyen en la notificación de manera automática. Esto incluye información detallada sobre el contexto, la respuesta a errores y los pasos comunes para solucionarlos.
5. [Configura notificaciones][27] a través de tus canales preferidos (correo electrónico, Slack, PagerDuty u otros) para asegurarte de que tu equipo esté alerta sobre los problemas que afectan la recopilación de datos de Azure.

{{% /collapse-content %}}

{{% collapse-content title="Usar un registro de aplicación existente" level="h4" expanded=false id="existing-app-registration-setup" %}}

### Elige el método de configuración de registro de aplicación existente si..

- Ya tienes un registro de aplicación configurado con el rol **Monitoring Reader** para Datadog para monitorizar el ámbito proporcionado (suscripciones o grupos de gestión), y no deseas crear nuevos recursos.

Si necesitas configurar un registro de aplicación para Datadog, consulta los métodos de configuración de [Quickstart](#quickstart-setup) o [Terraform](#terraform-setup).

### Instrucciones

1. En el [cuadro de integración de Datadog Azure][20], selecciona **Add Existing** (Añadir existente).
2. En el campo **Tenant ID (ID de inquilino), pega tu ID de directorio (inquilino).
3. En el campo **Client ID** (ID de cliente), pega el ID de la aplicación (cliente).
4. En el campo **Client Secret Value** (Valor del secreto del cliente), pega el valor del secreto del cliente del registro de la aplicación.
5. Opcionalmente, haz clic en el conmutador **Monitor Automuting** (Automatización del monitor) para desactivar la automatización del monitor.
6. Opcionalmente, haz clic en el conmutador de recopilación de métricas para desactivar toda la recopilación de métricas de Azure. También puedes ampliar el menú desplegable **Advanced Configuration** (Configuración avanzada) para filtrar las métricas por:
   - Proveedor de recursos
   - Etiquetas
   - Hosts
   - App Service Plans
   - Container Apps

También puedes hacer clic para activar la recopilación de métricas personalizadas de [Azure Application Insights][36] y desactivar la recopilación de métricas de uso.

6. Opcionalmente, haz clic en el conmutador de recopilación de recursos para desactivar la recopilación de información de configuración de tus recursos de Azure.
7. Haz clic en **Create Configuration** (Crear configuración).

{{% /collapse-content %}}

## Recopilación de métricas

La integración de Azure de Datadog está diseñada para recopilar todas las métricas del [monitor de Azure][8]. La [página de integraciones][9] muestra una lista de subintegraciones predefinidas que proporcionan dashboards y monitores adicionales para servicios de Azure específicos. Muchas de estas integraciones se instalan por defecto cuando Datadog reconoce los datos procedentes de tu cuenta de Azure. Sin embargo, Datadog puedes ingerir métricas de **cualquier recurso compatible con el monitor de Azure**, incluso si no tiene un cuadro de subintegración dedicado.

Puedes encontrar tus métricas de Azure en la página de resumen de métricas en la plataforma de Datadog navegando a `Metrics > Summary` y buscando `Azure`.

{{< img src="/getting_started/integrations/azure/GSwAzure_metricExplorer.png" alt="Imagen de resumen de métricas" style="width:100%;" >}}

## Activar la recopilación de log

Puedes utilizar la función de reenvío automatizado de logs para establecer y configurar los servicios y los parámetros de diagnóstico necesarios para reenviar logs a Datadog. Si ya existe un plano de control de reenvío automatizado de logs en el inquilino, este flujo lo modifica y amplía su alcance para incluir las suscripciones o los grupos de gestión seleccionados. Para obtener más detalles, consulta [Azure Automated Log Forwarding Setup][19].

Datadog recomienda utilizar el Agent o DaemonSet para enviar logs desde Azure. Si la transmisión directa no es posible, puedes utilizar una plantilla de Azure Resource Manager (ARM) para [automatizar la configuración de reenvío de logs][19] en todo tu entorno de Azure sin configuración manual. Esta función gestiona y escala automáticamente los servicios de reenvío de logs.

{{% collapse-content title="Automatizado (recomendado)" level="h4" expanded=false id="automated-log-forwarding-setup" %}}

### Elige el método de configuración de reenvío automatizado de logs si...

- Todavía no has configurado logs a través del [Método de configuración rápida](#azure-quickstart-setup).
- Prefieres un proceso basado en la interfaz de usuario y deseas minimizar el tiempo que se tarda en crear una entidad principal de servicio con los permisos de monitorización necesarios.
- Deseas automatizar los pasos de configuración en scripts o pipelines de Continuous Integration Continuous Delivery.

### Instrucciones

1. Abre la [plantilla ARM de reenvío automatizado de logs][29] en Azure.
2. Configura tu proyecto de Azure y los detalles de la instancia en la [pestaña Ajustes básicos][30].
3. Introduce tus credenciales de Datadog en la [pestaña de Configuración de Datadog][31].
4. Reconoce las advertencias de despliegue en la [pestaña de Despliegue][32].
5. Inicia el proceso de despliegue en la pestaña [Review + create][33] (Revisar + crear).

{{< site-region region="us3" >}}

<div class="alert alert-danger"><a href="https://docs.datadoghq.com/logs/log_configuration/archives/?tab=azurestorage">Los Log Archives</a> requieren el método de configuración de registro de aplicaciones. Para las cuentas de Datadog que utilizan la integración de Azure Native, sigue los pasos de esta página para crear un registro de aplicación.
</div>

{{< /site-region >}}

Consulta [Azure Automated Log Forwarding Architecture][34] para obtener más detalles.

{{% /collapse-content %}}

{{% collapse-content title="Container App" level="h4" expanded=false id="container-app-log-forwarding-setup" %}}

### Elige el método de reenvío de logs de Container App si...

- Es preferible configurar manualmente [ajustes de diagnóstico][53] en los recursos desde los que deseas reenviar logs.

## Instrucciones

1. Haz clic en el botón siguiente y rellena el formulario en el portal de Azure. Datadog despliega automáticamente los recursos de Azure necesarios para reenviar logs a tu cuenta de Datadog.

   [![Despliegue en Azure](https://aka.ms/deploytoazurebutton)][52]

2. Una vez finalizado el despliegue de la plantilla, configura la [configuración de diagnóstico][53] de cada fuente de logs para enviar logs de la plataforma de Azure (incluidos logs de recursos) a la cuenta de almacenamiento creada durante el despliegue.

**Nota**: Los recursos solo pueden transmitirse a una cuenta de almacenamiento en la misma región de Azure.

{{% /collapse-content %}}

{{% azure-log-archiving %}}

## Obtén más información de la plataforma de Datadog 

### Instala el Agent para obtener una mayor visibilidad de tu aplicación.

Después de configurar tu integración con Azure, los rastreadores de Datadog recopilan automáticamente las métricas de Azure, pero puedes obtener una mayor visibilidad de tus instancias de Azure con el [Datadog Agent][1]. La instalación del Datadog Agent en tu entorno te permite recopilar datos adicionales que incluyen, entre otros:
- **Estado de la aplicación**
- **Utilización del proceso**
- **Métricas a nivel de sistema**

También puedes utilizar el cliente StatsD incorporado para enviar métricas personalizadas desde tus aplicaciones, para correlacionar lo que está sucediendo con tus aplicaciones, usuarios y sistema. Consulta la guía sobre [_¿Por qué debería instalar el Datadog Agent en mis instancias en la nube?_][15] para obtener más información sobre las ventajas de instalar el Datadog Agent en tus instancias.

Utiliza la extensión de Azure para instalar el Datadog Agent en VMs de Windows, Linux x64 y Linux ARM. También puedes utilizar AKS Cluster Extension para desplegar el Agent en tus clústeres de AKS.

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

Datadog AKS Cluster Extension te permite desplegar el Datadog Agent de forma nativa en Azure AKS, evitando la complejidad de las herramientas de gestión de terceros. Para instalar el Datadog Agent con AKS Cluster Extension:

1. Dirígete a tu clúster de AKS en Azure Portal.
2. En la barra lateral izquierda del clúster de AKS, selecciona **Extensions + applications** (Extensiones + aplicaciones) en **Settings** (Configuración).
3. Busca y selecciona `Datadog AKS Cluster Extension` (Extensión del clúster de AKS de Datadog).
4. Haz clic en **Create** (Crear) y sigue las instrucciones del cuadro con tus [credenciales de Datadog][1] y el [sitio de Datadog][2].

[1]: /es/account_management/api-app-keys/
[2]: /es/getting_started/site/
{{% /tab %}}
{{< /tabs >}}

## Solucionar problemas

Consulta [Solución de problemas][16] en la guía de configuración avanzada de Azure.

¿Necesitas más ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][17].

## Referencias adicionales

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
[52]: https://portal.azure.com/#create/Microsoft.Template/uri/CustomDeploymentBlade/uri/https%3A%2F%2Fddazurelfo.blob.core.windows.net%2Ftemplates%2Fforwarder.json
[53]: https://learn.microsoft.com/azure/azure-monitor/platform/diagnostic-settings