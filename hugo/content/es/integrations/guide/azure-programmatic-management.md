---
description: Pasos para gestionar de manera programática la integración de Azure con
  Datadog
further_reading:
- link: https://docs.datadoghq.com/integrations/azure/
  tag: Documentación
  text: Integración de Azure
- link: https://www.datadoghq.com/blog/azure-log-forwarding/
  tag: Blog
  text: Envía logs de Azure a Datadog más rápida y fácilmente con el reenvío automatizado
    de logs
title: Guía de gestión programática de la integración de Azure
---

## Información general

 En esta guía se demuestra cómo gestionar mediante programación la integración de Azure con Datadog, así como otros recursos de Azure, como la extensión de máquina virtual (VM) del Datadog Agent. Esto te permite gestionar la observabilidad en varias cuentas a la vez.

**Todos los sitios**: Todos los [sitios de Datadog][3] pueden utilizar los pasos de esta page (página) para finalizar el proceso de credenciales de registro de aplicaciones para la recopilación de métricas de Azure. Consulta la [guía Azure Logging][18] para conocer las opciones de configuración de reenvío automatizado y manual de logs.

**US3**: si tu organización se encuentra en el sitio US3 de Datadog, puedes usar la integración nativa de Azure para optimizar la gestión y la recopilación de datos para tu entorno de Azure. Datadog recomienda usar este método cuando sea posible. La configuración implica la creación de un [recurso de Datadog en Azure][14] para vincular tus suscripciones de Azure a tu organización de Datadog. Esto reemplaza el proceso de credenciales de registro de aplicaciones para la recopilación de métricas y la configuración del centro de eventos para el reenvío de logs. Consulta la [guía de gestión de la integración nativa de Azure][1] para obtener más información.

## Integración de Azure con Datadog

La integración estándar de Azure usa un proceso de credenciales de registro de aplicaciones para implementar la recopilación de métricas y una configuración de centro de eventos de Azure a fin de enviar logs de la plataforma de Azure. Crea el registro de aplicaciones en Azure antes de integrar Datadog con tu entorno de Azure y configúralo con el permiso de **lector de monitorización** para que Datadog monitorice el contexto proporcionado (suscripciones o grupos de gestión). Si aún no has creado un registro de aplicaciones, consulta la [integración a través de Azure Portal][6] o la [integración a través de la CLI de Azure][4] para obtener instrucciones de configuración.

**Nota**: Puedes asignar permisos de lectura en el nivel del grupo de gestión al crear el registro de aplicaciones en Azure, para monitorizar varias suscripciones y hacer que las suscripciones nuevas en el grupo de gestión se monitoricen de manera automática.

### Terraform

Sigue estos pasos para desplegar la integración a través de [Terraform][13].

1. Configura el [proveedor de Terraform de Datadog][15] para interactuar con la API de Datadog a través de una configuración de Terraform.

2. Configura tu archivo de ajustes de Terraform utilizando el siguiente ejemplo como plantilla base. Asegúrate de actualizar los siguientes parámetros antes de aplicar los cambios:
    * `tenant_name`: tu ID de Azure Active Directory.
    * `client_id`: tu ID de aplicación (cliente) de Azure.
    * `client_secret`: tu clave secreta de aplicación web de Azure.

   Consulta la página de [Recursos de la integración de Azure con Datadog][17] en el registro de Terraform para obtener más ejemplos de uso y la lista completa de parámetros opcionales, así como recursos adicionales de Datadog.

{{< code-block lang="hcl" filename="" disable_copy="false" collapsible="false" >}}

resource "datadog_integration_azure" "sandbox" {
  tenant_name   = "<AZURE_TENANT_NAME>"
  client_id     = "<AZURE_CLIENT_ID>"
  client_secret = "<AZURE_CLIENT_SECRET_KEY>"
}

{{< /code-block >}}

3. Ejecuta `terraform apply`. Espera hasta 10 minutos para que comiencen a recopilarse los datos y, a continuación, consulta el dashboard de información general de Azure listo para usar a fin de ver las métricas enviadas por tus recursos de Azure.

#### Gestión de varias suscripciones o inquilinos

Puedes usar varios bloques de proveedores con alias para gestionar recursos de Terraform en varias suscripciones o inquilinos. Lee la [configuración del proveedor][9] para obtener más información.

### Monitorizar el estado de la integración

Una vez que se haya configurado la integración, Datadog comienza a ejecutar una serie continua de llamadas a las APIs de Azure para recopilar datos de monitorización críticos de tu entorno de Azure. A veces, estas llamadas devuelven errores (por ejemplo, si las credenciales proporcionadas han expirado). Estos errores pueden inhibir o bloquear la capacidad de Datadog para recopilar datos de monitorización.

Cuando se detectan errores críticos, la integración de Azure genera eventos en el explorador de eventos de Datadog y los vuelve a publicar cada cinco minutos. Puedes configurar un monitor de eventos para que se active cuando se detecten estos eventos y notifique al equipo correspondiente.

Datadog proporciona una plantilla de monitor (noun) para ayudarte a empezar. Para utilizar la plantilla de monitor (noun):

1. En Datadog, ve a **Monitors** (Monitores) y haz clic en el botón **Browse Templates** (Buscar plantillas).
2. Busca y selecciona la plantilla de monitor (noun) titulada [Errores de integración de [Azure]][19].
3. Realiza las modificaciones que quieras en la consulta de búsqueda o en las condiciones de alerta. De manera predeterminada, el monitor se activa cuando se detecta un error nuevo y se resuelve cuando no se ha detectado el error durante los últimos 15 minutos.
4. Actualiza los mensajes de notificación y notificación nueva según lo consideres. Ten en cuenta que los eventos en sí contienen información relevante sobre el evento y se incluyen en la notificación de manera automática. Esto incluye información detallada sobre el contexto, la respuesta a errores y los pasos comunes para solucionarlos.
5. [Configura notificaciones][20] a través de tus canales preferidos (correo electrónico, Slack, PagerDuty u otros) para asegurarte de que tu equipo esté alerta sobre los problemas que afectan la recopilación de datos de Azure.

#### Envío de Logs

Consulta la [guía de registro de Azure][18] para configurar el reenvío de logs desde tu entorno de Azure a Datadog.

## Extensión de VM de Azure con Datadog

### Terraform

Puedes usar Terraform para crear y gestionar la extensión del Datadog Agent. Sigue estos pasos para instalar y configurar el Agent en una sola máquina y, a continuación, carga un archivo de configuración comprimido en el almacenamiento de blobs para que se haga referencia a él en el bloque de Terraform de la extensión de VM.

{{< tabs >}}
{{% tab "Windows" %}}
1. [Instala el Agent][100].
2. Aplica las [Configuraciones del Agent][101] que desees.
3. Ve a `%ProgramData%\Datadog`. Elimina cualquier archivo o artefacto de instalación adicional que pueda estar presente. Asegúrate de que la carpeta contenga solo:
    -  `datadog.yaml`
    -  carpeta `conf.d` que contiene las configuraciones de integración
4. Guarda la carpeta `%ProgramData%\Datadog` desinfectada como archivo zip.
5. Genera un hash de la carpeta comprimida mediante el comando de PowerShell `Get-FileHash %ProgramData%\Datadog.zip -Algorithm SHA256`. Haz referencia a este hash en el bloque Terraform con el parámetro `agentConfigurationChecksum`.
6. Carga el archivo al almacenamiento de blobs.
7. Haz referencia a la URL del almacenamiento de blobs en el bloque de Terraform con el parámetro `agentConfiguration` para crear la extensión de VM.

[100]: https://app.datadoghq.com/account/settings/agent/latest
[101]: /es/agent/guide/agent-configuration-files/?tab=agentv6v7
{{% /tab %}}
{{% tab "Linux" %}}
1. [Instala el Agent][200].
2. Aplica las [configuraciones del Agent][201] que desees.
3. Guarda la carpeta `/etc/datadog-agent` como archivo zip, utilizando el comando `zip -r datadog_config.zip /etc/datadog-agent`.
4. Genera un hash de la carpeta comprimida utilizando el comando `sha256sum datadog_config.zip`. Haz referencia a este hash en el bloque Terraform con el parámetro `agentConfigurationChecksum`.
5. Carga el archivo al almacenamiento de blobs.
6. Haz referencia a la URL del almacenamiento de blobs en el bloque de Terraform con el parámetro `agentConfiguration` para crear la extensión de VM.

[200]: https://app.datadoghq.com/account/settings/agent/latest
[201]: /es/agent/guide/agent-configuration-files/?tab=agentv6v7
{{% /tab %}}
{{< /tabs >}}

#### Configuración de la extensión

La extensión Azure puede aceptar tanto parámetros normales como protegidos.

Los parámetros normales incluyen:

| Variable | Tipo | Descripción  |
|----------|------|--------------|
| `site` | Cadena | Definir el sitio de ingesta de Datadog, por ejemplo: `SITE=`{{< region-param key="dd_site" code="true">}} |
| `agentVersion` | Cadena | La versión del Agent a instalar, siguiendo el formato `x.y.z` o `latest` |
| `agentConfiguration` | URI | (Opcional) URL al blob de Azure que contiene la configuración del Agent como un archivo zip. |
| `agentConfigurationChecksum` | Cadena | La suma de comprobación SHA256 del archivo zip de configuración del Agent, obligatoria si se define `agentConfiguration`. |

Los parámetros protegidos incluyen:

| Variable | Tipo | Descripción  |
|----------|------|--------------|
| `api_key`| Cadena | Añade la clave de API de Datadog al archivo de configuración. |

**Nota**: Si `agentConfiguration` y `api_key` se especifican a la vez, tiene prioridad la clave de API que se encuentra en `agentConfiguration`.

{{< tabs >}}
{{% tab "Windows" %}}

```
  resource "azurerm_virtual_machine_extension" "example" {
  name                 = "DDAgentExtension"
  virtual_machine_id   = azurerm_virtual_machine.example.id
  publisher            = "Datadog.Agent"
  type                 = "DatadogWindowsAgent"
  type_handler_version = "7.0"
  settings = jsonencode({
    site = "<DATADOG_SITE>"
  })
  protected_settings = jsonencode({
    api_key = "<DATADOG_API_KEY>"
  })
```
{{% /tab %}}
{{% tab "Linux" %}}

```
  resource "azurerm_virtual_machine_extension" "example" {
  name                 = "DDAgentExtension"
  virtual_machine_id   = azurerm_virtual_machine.example.id
  publisher            = "Datadog.Agent"
  type                 = "DatadogLinuxAgent"
  type_handler_version = "7.0"
  settings = jsonencode({
    site = "<DATADOG_SITE>"
  })
  protected_settings = jsonencode({
    api_key = "<DATADOG_API_KEY>"
  })
```
{{% /tab %}}
{{< /tabs >}}

Consulta el [recurso de la extensión de máquina virtual][10] en el registro de Terraform para obtener más información sobre los argumentos disponibles.

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://docs.datadoghq.com/es/integrations/guide/azure-portal/
[2]: https://learn.microsoft.com/en-us/cli/azure/datadog?view=azure-cli-latest
[3]: /es/getting_started/site/
[4]: /es/integrations/guide/azure-manual-setup/?tab=azurecli#integrating-through-the-azure-cli
[5]: /es/integrations/azure/
[6]: /es/integrations/guide/azure-manual-setup/?tab=azurecli#integrating-through-the-azure-portal
[9]: https://developer.hashicorp.com/terraform/language/providers/configuration
[10]: https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/virtual_machine_extension
[11]: https://app.datadoghq.com/account/settings/agent/latest
[12]: /es/agent/guide/agent-configuration-files/?tab=agentv6v7
[13]: https://www.terraform.io
[14]: https://learn.microsoft.com/en-us/azure/partner-solutions/datadog/overview
[15]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs
[17]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_azure
[18]: /es/logs/guide/azure-logging-guide
[19]: https://app.datadoghq.com/monitors/templates?q=Azure%20%22integration%20errors%22&origination=all&p=1
[20]: /es/monitors/notify/#configure-notifications-and-automations