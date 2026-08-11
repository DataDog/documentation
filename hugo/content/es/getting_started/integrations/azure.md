---
aliases:
- /es/integrations/guide/azure-manual-setup/
- /es/integrations/guide/azure-programmatic-management/
description: Conecte Microsoft Azure con Datadog utilizando las opciones de integración
  de registro de aplicación de Azure. Configure la recolección de métricas, el reenvío
  de registros y la instalación del Datadog Agent.
further_reading:
- link: https://www.datadoghq.com/blog/azure-integration-onboarding/
  tag: Blog
  text: Acelere la configuración de su integración de Azure con un proceso de incorporación
    guiado.
- link: https://docs.datadoghq.com/integrations/azure/#overview
  tag: Documentación
  text: Integración de Microsoft Azure
- link: https://docs.datadoghq.com/agent/guide/why-should-i-install-the-agent-on-my-cloud-instances/
  tag: Guía
  text: ¿Por qué debería instalar el Agente de Datadog en mis instancias en la nube?
title: Introducción a Azure
---
## Descripción general {#overview}

Datadog ofrece múltiples opciones de configuración para la integración de Azure. Esta guía proporciona una descripción general de las diversas opciones disponibles para comenzar con Azure, con enlaces a recursos y tutoriales de Azure que abordan casos de uso específicos.

## Requisitos previos {#prerequisites}

Si aún no lo ha hecho, cree una [cuenta de Datadog][2].

{{% collapse-content title="Permisos requeridos para la configuración de la integración" level="h4" expanded=false id="required-permissions" %}}

### En Azure {#in-azure}

Su usuario de Microsoft Entra ID necesita los siguientes permisos:

#### Permiso para crear un registro de aplicación {#permission-to-create-an-app-registration}

**Debe cumplirse una de las siguientes condiciones para el usuario:**

- `Users can register applications` ha sido establecido en `Yes`
- El usuario tiene el rol de [Desarrollador de Aplicaciones][38]

##### Roles de administrador dentro de sus suscripciones {#admin-roles-within-your-subscriptions}

Dentro de las suscripciones que desea monitorear, debe tener ya sea:

- El rol de {{< ui >}}Owner{{< /ui >}}
- Tanto el rol de {{< ui >}}Contributor{{< /ui >}} como el rol de {{< ui >}}User Access Admin{{< /ui >}}

#### Permiso para agregar y otorgar consentimiento para los permisos de la API de Graph {#permission-to-add-and-grant-consent-for-graph-api-permissions}

El rol de [Administrador de Roles Privilegiados][25] contiene los permisos requeridos.

### En Datadog {#in-datadog}

El `Datadog Admin Role`, o cualquier otro rol con el permiso de `azure_configurations_manage`.

{{% /collapse-content %}}

{{< site-region region="us3" >}}

<div class="alert alert-danger"><a href="https://docs.datadoghq.com/cloud_cost_management/setup/azure/?tab=billingaccounts&site=us3#overview">Cloud Cost Management</a> y <a href="https://docs.datadoghq.com/logs/log_configuration/archives/?tab=azurestorage">Log Archives</a> requieren el método de configuración de registro de aplicación. Para cuentas de Datadog que utilizan la integración nativa de Azure, siga los pasos de configuración en esta página para crear un registro de aplicación. Si una suscripción está conectada a través de ambos métodos, aparece una advertencia de redundancia en el mosaico de integración de Azure. Esta advertencia se puede ignorar de manera segura para Cloud Cost Management y Log Archives.
</div>

{{< /site-region >}}


## Configuración {#setup}

Siga las instrucciones en esta página para configurar el {{< ui >}}Azure integration{{< /ui >}} a través de un registro de aplicación, disponible para todos los sitios de Datadog.

{{< img src="/getting_started/integrations/azure/GSwAzure_siteSelector.mp4" alt="Selector de sitio para el sitio US3" video=true >}}

{{% collapse-content title="Inicio rápido (recomendado)" level="h4" expanded=false id="quickstart-setup" %}}

### Elija el método de configuración de inicio rápido si... {#choose-the-quickstart-setup-method-if}

- Está configurando Datadog por primera vez.
- Prefiere un flujo de trabajo basado en UI y desea minimizar el tiempo que se necesita para crear un principal de servicio con los permisos de monitoreo requeridos.
- Desea automatizar los pasos de configuración en scripts o en pipelines de CI/CD.

### Instrucciones {#instructions}

1. En el mosaico de integración de Azure, haga clic en {{< ui >}}+ Add New App registration{{< /ui >}}, luego seleccione {{< ui >}}Quickstart{{< /ui >}}.
2. Copie el script de configuración y ejecútelo en Azure Cloud Shell.
3. Regrese a la interfaz de usuario de Datadog. Deberá ver {{< ui >}}CONNECTED{{< /ui >}} en la esquina superior derecha del script de configuración.
4. Seleccione las suscripciones y los grupos de administración de los cuales desea recopilar datos.
5. Opcionalmente, haga clic en el interruptor de recopilación de métricas para deshabilitar toda la recopilación de métricas de Azure. También puede expandir el menú desplegable {{< ui >}}Advanced Configuration{{< /ui >}} para filtrar métricas por:
   - Proveedor de recursos
   - Etiquetas
   - Servidores
   - Planes de App Service
   - Container Apps

También puedes hacer clic para habilitar la recopilación de métricas personalizadas de [Azure Application Insights][36] y deshabilitar la recopilación de métricas de uso.

6. Opcionalmente, haz clic en el interruptor de recopilación de recursos para deshabilitar la recopilación de información de configuración de tus recursos de Azure.
7. Habilita la recopilación de registros para configurar y establecer los servicios y ajustes de diagnóstico necesarios para enviar registros a Datadog:
   1. Si ya existe un reenvío de registros en el inquilino, se modifica para ampliar su alcance. Cualquier configuración cambiada se aplica a las suscripciones o grupos de administración existentes, así como a los recién seleccionados.
   2. Si estás creando un nuevo reenvío de registros:
      1. Ingresa un nombre de grupo de recursos para almacenar el plano de control del reenvío de registros.
      2. Selecciona una suscripción del plano de control para la orquestación del reenvío de registros (LFO).
      3. Selecciona una región para el plano de control.<br>
   **Nota**: El nombre del grupo de recursos, la suscripción del plano de control y los campos de región solo aparecen al crear un nuevo reenvío de registros.
   3. Opcionalmente, abre {{< ui >}}Log filtering options{{< /ui >}} para filtrar registros por etiquetas, o aplica filtrado para información específica (como PII) usando regex.

   Consulta la [sección de Arquitectura][34] de la guía de reenvío automático de registros para más información sobre esta arquitectura.

8. Haz clic en {{< ui >}}Confirm{{< /ui >}} para finalizar la configuración.

{{% /collapse-content %}}

{{% collapse-content title="Terraform" expanded=false level="h4" id="terraform-setup" %}}

### Elija el método de configuración de Terraform si... {#choose-the-terraform-setup-method-if}

- Gestione infraestructura como código y mantenga la integración de Datadog Azure bajo control de versiones.
- Necesita configurar múltiples inquilinos o suscripciones de manera consistente con bloques de proveedor reutilizables.
- Desea un proceso de implementación repetible y auditable que se ajuste a su entorno gestionado por Terraform.

### Instrucciones {#instructions-1}

Siga estos pasos para implementar la integración de Datadog Azure a través de [Terraform][23].

{{< tabs >}}
{{% tab "Cree un registro de aplicación." %}}

1. En el [mosaico de integración de Azure][100], haga clic en {{< ui >}}+ Add New App registration{{< /ui >}}, luego seleccione {{< ui >}}Terraform{{< /ui >}}.
2. Seleccione las suscripciones y los grupos de administración de los cuales desea recopilar datos.
3. Opcionalmente, haga clic en el interruptor de recopilación de métricas para deshabilitar toda la recopilación de métricas de Azure. También puede expandir el menú desplegable {{< ui >}}Advanced Configuration{{< /ui >}} para filtrar métricas por:
   - Proveedor de recursos
   - Etiquetas
   - Servidores
   - App Service Plans
   - Aplicaciones de Contenedor

   También puede hacer clic para habilitar la recopilación de métricas personalizadas desde [Azure Application Insights][101], y deshabilitar la recopilación de métricas de uso.
4. Opcionalmente, haga clic en el interruptor de recopilación de recursos para deshabilitar la recopilación de información de configuración de sus recursos de Azure.
5. Configure la recopilación de registros:
   - Si ya existe un reenvío de registros en el inquilino, amplíe su alcance para incluir nuevas suscripciones o grupos de administración.
   - Si está creando un nuevo reenvío de registros:
     1. Ingrese un nombre de grupo de recursos para almacenar el plano de control del reenvío de registros.
     1. Seleccione una suscripción del plano de control para la orquestación de reenvío de registros (LFO).
     1. Seleccione una región para el plano de control.

   Consulte la [sección de Arquitectura][102] de la guía de reenvío de registros automatizado para obtener más información sobre esta arquitectura.
6. Copie y ejecute el comando bajo {{< ui >}}Initialize and apply the Terraform{{< /ui >}}.

[100]: https://app.datadoghq.com/integrations/azure/
[101]: https://learn.microsoft.com/azure/azure-monitor/app/app-insights-overview
[102]: /es/logs/guide/azure-automated-log-forwarding/#architecture
{{% /tab %}}

{{% tab "Utilice un registro de aplicación existente" %}}



- Ya tiene un registro de aplicación configurado con el rol {{< ui >}}Monitoring Reader{{< /ui >}} para que Datadog monitoree el alcance proporcionado (suscripciones o grupos de administración), y no desea crear nuevos recursos.

1. Configure el [proveedor de Datadog Terraform][200] para interactuar con la API de Datadog a través de una configuración de Terraform.
2. Configure su archivo de configuración de Terraform utilizando el ejemplo a continuación como plantilla base. Asegúrese de actualizar los siguientes parámetros antes de aplicar los cambios:
    * `tenant_name`: Su ID de Azure Active Directory.
    * `client_id`: Su ID de aplicación (cliente) de Azure.
    * `client_secret`: Su clave secreta de aplicación web de Azure.

   Consulte la página de [integración de Datadog con Azure][201] en el registro de Terraform para obtener más ejemplos de uso y la lista completa de parámetros opcionales, así como recursos adicionales de Datadog.

{{< code-block lang="hcl" filename="" disable_copy="false" collapsible="false" >}}

resource "datadog_integration_azure" "sandbox" {
  tenant_name   = "<AZURE_TENANT_NAME>"
  client_id     = "<AZURE_CLIENT_ID>"
  client_secret = "<AZURE_CLIENT_SECRET_KEY>"
}

{{< /code-block >}}

3. Ejecute `terraform apply`. Espere hasta 10 minutos para que los datos comiencen a ser recolectados, y luego visualice el Azure overview dashboard para ver las métricas enviadas por sus recursos de Azure.

[200]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs
[201]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_azure
{{% /tab %}}
{{< /tabs >}}

#### Gestionando múltiples suscripciones o inquilinos {#managing-multiple-subscriptions-or-tenants}

Puede usar múltiples bloques de proveedor con alias para gestionar recursos de Terraform a través de múltiples suscripciones o inquilinos. Lea [Configuración del Proveedor][22] para obtener más información.

### Monitoree el estado de la integración {#monitor-the-integration-status}

Después de que la integración esté configurada, Datadog comienza a efectuar una serie continua de llamadas a las APIs de Azure para recolectar datos críticos de monitoreo de su entorno de Azure. A veces, estas llamadas devuelven errores (por ejemplo, si las credenciales proporcionadas han expirado). Estos errores pueden inhibir o bloquear la capacidad de Datadog para recolectar datos de monitoreo.

Cuando se encuentran errores críticos, la integración de Azure genera eventos en el Explorador de Eventos de Datadog y los vuelve a publicar cada cinco minutos. Puedes configurar un Seguimiento de Eventos para que se active cuando se detecten estos eventos y notificar al equipo correspondiente.

Datadog proporciona una plantilla de seguimiento para ayudarte a comenzar. Para usar la plantilla de seguimiento:

1. En Datadog, ve a {{< ui >}}Monitors{{< /ui >}} y haz clic en el botón {{< ui >}}Browse Templates{{< /ui >}}.
2. Busca y selecciona la plantilla de seguimiento titulada [[Azure] Errores de Integración][26].
3. Realiza las modificaciones deseadas en la consulta de búsqueda o en las condiciones de alerta. Por defecto, el seguimiento se activa cada vez que se detecta un nuevo error y se resuelve cuando no se ha detectado el error en los últimos 15 minutos.
4. Actualiza los mensajes de notificación y re-notificación según lo desees. Ten en cuenta que los eventos en sí contienen información pertinente sobre el evento y se incluyen automáticamente en la notificación. Esto incluye información detallada sobre el contexto, la respuesta de error y los pasos comunes para remediar.
5. [Configura notificaciones][27] a través de tus canales preferidos (correo electrónico, Slack, PagerDuty u otros) para asegurarte de que tu equipo esté alerta sobre problemas que afecten la recolección de datos de Azure.

{{% /collapse-content %}}

{{% collapse-content title="Utilice un registro de aplicación existente" level="h4" expanded=false id="existing-app-registration-setup" %}}

### Elige el método de configuración de registro de aplicación existente si.. {#choose-the-existing-app-registration-setup-method-if}

- Ya tienes un registro de aplicación configurado con el rol {{< ui >}}Monitoring Reader{{< /ui >}} para que Datadog monitoree el alcance proporcionado (suscripciones o grupos de administración), y no deseas crear nuevos recursos.

Si necesitas configurar un registro de aplicación para Datadog, consulta los métodos de configuración [Guía Rápida](#quickstart-setup) o [Terraform](#terraform-setup).

### Instrucciones {#instructions-2}

1. En el [mosaico de integración de Datadog Azure][20], selecciona {{< ui >}}Add Existing{{< /ui >}}.
2. En el campo {{< ui >}}Tenant ID{{< /ui >}}, pega tu ID de Directorio (inquilino).
3. En el campo {{< ui >}}Client ID{{< /ui >}}, pega el ID de la aplicación (cliente).
4. En el campo {{< ui >}}Client Secret Value{{< /ui >}}, pega el valor del secreto del cliente del registro de la aplicación.
5. Opcionalmente, haz clic en el interruptor {{< ui >}}Monitor Automuting{{< /ui >}} para desactivar la automatización del seguimiento.
6. Opcionalmente, haz clic en el interruptor de recolección de métricas para desactivar toda la recolección de métricas de Azure. También puedes expandir el {{< ui >}}Advanced Configuration{{< /ui >}} menú desplegable para filtrar métricas por:
   - Proveedor de recursos
   - Etiquetas
   - Hosts
   - Planes de servicio de aplicaciones
   - Aplicaciones de contenedor

También puedes hacer clic para habilitar la recopilación de métricas personalizadas de [Azure Application Insights][36] y deshabilitar la recopilación de métricas de uso.

6. Opcionalmente, haz clic en el interruptor de colección de recursos para desactivar la recopilación de información de configuración de tus recursos de Azure.
7. Haz clic en {{< ui >}}Create Configuration{{< /ui >}}.

{{% /collapse-content %}}

## Recopilación de métricas {#metric-collection}

La integración de Azure de Datadog está diseñada para recopilar todas las métricas de [Azure Monitor][8]. La [página de Integraciones][9] muestra una lista curada de sub-integraciones predefinidas que proporcionan paneles y monitores adicionales listos para usar para servicios específicos de Azure. Muchas de estas integraciones se instalan por defecto cuando Datadog reconoce datos provenientes de tu cuenta de Azure. Sin embargo, Datadog puede ingerir métricas de **cualquier recurso compatible con Azure Monitor**, incluso si no tiene un mosaico de sub-integración dedicado.

Puedes encontrar tus métricas de Azure en la página de resumen de métricas en la plataforma de Datadog navegando a `Metrics > Summary` y buscando `Azure`.

{{< img src="/getting_started/integrations/azure/GSwAzure_metricExplorer.png" alt="Imagen de resumen de métricas" style="width:100%;" >}}

### Filtrado de etiquetas de recursos para métricas {#resource-tag-filtering-for-metrics}

Utiliza filtros de etiquetas para controlar qué recursos de Azure tienen sus métricas recopiladas por Datadog. Configura filtros de etiquetas en la pestaña {{< ui >}}Configuration{{< /ui >}} del [mosaico de integración de Azure][20]. Un filtro de etiquetas es una lista de etiquetas separadas por comas en la forma `key:value`. Solo los recursos que coinciden con al menos una etiqueta en el filtro tienen sus métricas recopiladas.

Puedes usar comodines en tus filtros de etiquetas:
- `?` coincide con un solo carácter.
- `*` coincide con múltiples caracteres.

Para excluir recursos con una etiqueta dada, antepón la etiqueta con `!`. La exclusión tiene prioridad sobre la inclusión. Un recurso coincide con el filtro si coincide con alguna etiqueta en la lista.

Por ejemplo: `datadog:monitored,env:production,!plan_tier:basic,instance-type:c1.*`

Este filtro recopila métricas de recursos etiquetados con `datadog:monitored` o `env:production`, excluye recursos etiquetados con `plan_tier:basic`, e incluye recursos con una etiqueta `instance-type` que coincida con `c1.*`.

Si no se establece un filtro de etiquetas, Datadog recopila métricas de todos los recursos de Azure.

## Habilitar la recopilación de registros {#enable-log-collection}

Puedes usar la función de reenvío automático de registros para configurar los servicios y los ajustes de diagnóstico necesarios para reenviar registros a Datadog. Si ya existe un plano de control de reenvío automático de registros en el inquilino, este flujo lo modifica y amplía su alcance para incluir las suscripciones o grupos de administración seleccionados. Para más detalles, consulta [Configuración de reenvío automático de registros de Azure][19].

Datadog recomienda usar el Agente o DaemonSet para enviar registros desde Azure. Si el streaming directo no es posible, usa el flujo {{< ui >}}Configure Log Forwarding{{< /ui >}} en la [integración de Azure][20] para configurar y gestionar el reenvío automático de registros directamente en Datadog. También puedes implementar el reenvío de registros con una [plantilla de Administrador de Recursos de Azure (ARM)][19]. Ambos métodos gestionan y escalan automáticamente los servicios de reenvío de registros.

{{% collapse-content title="Automatizado (recomendado)" level="h4" expanded=false id="automated-log-forwarding-setup" %}}

### Elige el método de configuración de reenvío automático de registros si... {#choose-the-automated-log-forwarding-setup-method-if}

- No has configurado ya los registros a través del método de configuración [Guía rápida](#azure-quickstart-setup).
- Prefieres un flujo de trabajo basado en la interfaz de usuario y deseas minimizar el tiempo que toma crear un principal de servicio con los permisos de monitoreo requeridos.
- Deseas automatizar los pasos de configuración en scripts o en pipelines de CI/CD.

### Instrucciones {#instructions-3}

#### Configura el reenvío de registros (recomendado) {#configure-log-forwarding-recommended}

Utiliza el flujo {{< ui >}}Configure Log Forwarding{{< /ui >}} para configurar nuevos o gestionar los reenvíos de registros existentes directamente en Datadog:

1. En Datadog, navega a [{{< ui >}}Integrations{{< /ui >}} > {{< ui >}}Azure{{< /ui >}}][20].
1. Haz clic en {{< ui >}}Configure Log Forwarding{{< /ui >}}.
1. Copia el comando proporcionado y pégalo en tu Azure Cloud Shell.
1. Selecciona las suscripciones de las cuales deseas reenviar registros.
1. Opcionalmente, agrega o quita filtros de registros.
1. Haz clic en {{< ui >}}Confirm{{< /ui >}}.

Para más detalles, consulta [Configuración de reenvío automático de registros de Azure][19].

#### Plantilla ARM {#arm-template}

Alternativamente, despliega el reenvío de registros con una plantilla de Administrador de Recursos de Azure (ARM):

1. Abre la [plantilla ARM de reenvío automático de registros][29] en Azure.
1. Configura los detalles de tu proyecto e instancia de Azure en la [pestaña Básicos][30].
1. Ingresa tus credenciales de Datadog en la [pestaña de Configuración de Datadog][31].
1. Reconoce las advertencias de despliegue en la [pestaña de Despliegue][32].
1. Inicia el proceso de despliegue en la [pestaña Revisar + crear][33].

{{< site-region region="us3" >}}

<div class="alert alert-danger"><a href="https://docs.datadoghq.com/logs/log_configuration/archives/?tab=azurestorage">Los Archivos de Registros</a> requieren el método de configuración de registro de aplicación. Para cuentas de Datadog que utilizan la integración nativa de Azure, sigue los pasos en esta página para crear un registro de aplicación.
</div>

{{< /site-region >}}

Consulte [Arquitectura de reenvío automático de registros de Azure][34] para más detalles.

{{% /collapse-content %}}

{{% collapse-content title="Aplicación de Contenedor" level="h4" expanded=false id="container-app-log-forwarding-setup" %}}

### Elija el método de reenvío de registros de la Aplicación de Contenedor si... {#choose-the-container-app-log-forwarding-method-if}

- Prefiere configurar manualmente los [ajustes de diagnóstico][53] en los recursos de los que desea reenviar registros.

## Instrucciones {#instructions-4}

1. Haz clic en el botón de abajo y completa el formulario en el Portal de Azure. Datadog despliega automáticamente los recursos de Azure necesarios para reenviar registros a tu cuenta de Datadog.

   [![Desplegar en Azure](https://aka.ms/deploytoazurebutton)][52]

2. Después de que finalice el despliegue de la plantilla, configure los [ajustes de diagnóstico][53] para cada fuente de registro para enviar registros de la plataforma de Azure (incluidos los registros de recursos) a la Cuenta de Almacenamiento creada durante el despliegue.

**Nota**: Los recursos solo pueden transmitir a una Cuenta de Almacenamiento en la misma región de Azure.

{{% /collapse-content %}}

{{% azure-log-archiving %}}

### Filtrado de etiquetas de recursos para registros {#resource-tag-filtering-for-logs}

Utilice filtros de etiquetas para controlar qué recursos de Azure tienen sus registros reenviados a Datadog. Para configurar filtros de etiquetas para registros, haga clic en {{< ui >}}Configure Log Forwarding{{< /ui >}} en el [mosaico de integración de Azure][20] y siga el flujo. Un filtro de etiquetas es una lista de etiquetas separadas por comas en la forma `key:value`. Solo los recursos que coinciden con al menos una etiqueta en el filtro tienen sus registros reenviados.

Puede usar comodines en sus filtros de etiquetas:
- `?` coincide con un solo carácter.
- `*` coincide con múltiples caracteres.

Para excluir recursos con una etiqueta dada, anteponga la etiqueta con `!`. La exclusión tiene prioridad sobre la inclusión. Un recurso coincide con el filtro si coincide con alguna etiqueta en la lista.

Por ejemplo: `datadog:monitored,env:production,!plan_tier:basic,instance-type:c1.*`

Este filtro reenvía registros de recursos etiquetados con `datadog:monitored` o `env:production`, excluye recursos etiquetados con `plan_tier:basic`, e incluye recursos con una etiqueta `instance-type` que coincida con `c1.*`.

Si no se establece ningún filtro de etiquetas, Datadog reenvía registros de todos los recursos de Azure.

## Obtenga más de la Plataforma de Datadog {#get-more-from-the-datadog-platform}

### Instale el Agente para obtener mayor visibilidad en su aplicación {#install-the-agent-for-greater-visibility-into-your-application}

Después de configurar su integración de Azure, los rastreadores de Datadog recopilan automáticamente métricas de Azure, pero puede obtener una visibilidad aún más profunda en sus instancias de Azure con el [Datadog Agent][1]. Instalar el Datadog Agent en su entorno le permite recopilar datos adicionales, incluyendo, pero no limitándose a:
- **Salud de la aplicación**
- **Utilización de procesos**
- **Métricas a nivel de sistema**

También puede utilizar el cliente StatsD integrado para enviar métricas personalizadas desde sus aplicaciones, para correlacionar lo que está sucediendo con sus aplicaciones, usuarios y sistema. Consulte la guía sobre [_¿Por qué debería instalar el Datadog Agent en mis instancias en la nube?_][15] para obtener más información sobre los beneficios de instalar el Datadog Agent en sus instancias.

Utilice la extensión de Azure para instalar el Datadog Agent en VMs de Windows, VMs de Linux x64 y VMs de Linux basadas en ARM. También puede utilizar la Extensión de Clúster AKS para desplegar el Datadog Agent en sus Clústeres AKS.

{{< tabs >}}
{{% tab "Extensión de VM" %}}

1. En el [portal de Azure][4], seleccione la VM apropiada.
2. Desde la barra lateral izquierda, bajo {{< ui >}}Settings{{< /ui >}}, seleccione {{< ui >}}Extensions + applications{{< /ui >}}.
3. Haga clic en {{< ui >}}+ Add{{< /ui >}}.
4. Busque y seleccione la extensión {{< ui >}}Datadog Agent{{< /ui >}}.
5. Haga clic en {{< ui >}}Next{{< /ui >}}.
6. Ingrese su [clave de API de Datadog][2] y [sitio de Datadog][1], y haga clic en {{< ui >}}OK{{< /ui >}}.

Para instalar el Datadog Agent según el sistema operativo o herramienta de CI o CD, consulte las [instrucciones de instalación del Datadog Agent][3].

**Nota**: Los controladores de dominio no son compatibles al instalar el Datadog Agent con la extensión de Azure.

[1]: /es/getting_started/site/
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://portal.azure.com
{{% /tab %}}

{{% tab "Extensión del Clúster AKS" %}}

La Datadog AKS Cluster Extension permite desplegar el Datadog Agent de manera nativa dentro de Azure AKS, evitando la complejidad de las herramientas de gestión de terceros. Para instalar el Datadog Agent con la Extensión del Clúster AKS:

1. Vaya a su clúster AKS en el portal de Azure.
2. Desde la barra lateral izquierda del clúster AKS, seleccione {{< ui >}}Extensions + applications{{< /ui >}} bajo {{< ui >}}Settings{{< /ui >}}.
3. Busque y seleccione el {{< ui >}}Datadog AKS Cluster Extension{{< /ui >}}.
4. Haga clic en {{< ui >}}Create{{< /ui >}}, y siga las instrucciones en el mosaico usando sus [credenciales de Datadog][1] y [sitio de Datadog][2].

[1]: /es/account_management/api-app-keys/
[2]: /es/getting_started/site/
{{% /tab %}}
{{< /tabs >}}

## Solución de Problemas {#troubleshooting}

Consulte [Solución de Problemas][16] en la guía de Configuración Avanzada de Azure.

¿Aún necesita ayuda? Contacte a [soporte de Datadog][17].

## Lectura Adicional {#further-reading}

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
[52]: https://portal.azure.com/#create/Microsoft.Template/uri/CustomDeploymentBlade/uri/https%3A%2F%2Fraw.githubusercontent.com%2FDataDog%2Fintegrations-management%2Fmain%2Fazure%2Flogging_install%2Fdist%2Fforwarder.json
[53]: https://learn.microsoft.com/azure/azure-monitor/platform/diagnostic-settings