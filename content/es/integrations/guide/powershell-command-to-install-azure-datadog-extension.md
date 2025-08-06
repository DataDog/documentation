---
aliases:
- /es/integrations/faq/powershell-command-to-install-azure-datadog-extension
further_reading:
- link: https://www.datadoghq.com/blog/migrate-to-azure-with-the-microsoft-cloud-adoption-framework/
  tag: Blog
  text: Migrar con éxito a Azure con Microsoft Cloud Adoption Framework y Datadog
- link: https://www.datadoghq.com/blog/azure-arc-integration/
  tag: Blog
  text: Monitorizar tu infraestructura híbrida Azure Arc con Datadog
title: Comandos para instalar la extensión Azure en Datadog
---

## Instalar en Azure

Datadog proporciona una extensión Azure para ayudar a desplegar el Agent en instancias Azure:

* [Presentación del despliegue en Datadog de la monitorización Azure con un solo clic][1]
* [Integración nativa Azure][2] _Sólo US3_
* [Integración estándar Azure][7] _Todos los sitios_

Una alternativa a la instalación GUI es la línea de comandos.
Para ejecutar el Datadog Agent en tus instancias Azure como una extensión, utiliza el comando que coincide con tu entorno. Sustituye `<SITE_PARAMETER>` por el valor del **parámetro de sitio** de tu cuenta Datadog en la página de [sitios Datadog][3], y `<DATADOG_API_KEY>` por tu [clave de API Datadog][4].

{{< tabs >}}
{{% tab "Windows" %}}

{{< code-block lang="powershell" >}}
Set-AzVMExtension -Name "DatadogAgent" -Publisher "Datadog.Agent" -Type "DatadogWindowsAgent" -TypeHandlerVersion "7.0" -Settings @{"site" = "<SITE_PARAMETER>"; "agentVersion" = "latest"} -ProtectedSettings @{"api_key" = "<DATADOG_API_KEY>"} -DisableAutoUpgradeMinorVersion
{{< /code-block >}}

Encontrarás más información sobre la sintaxis para configurar extensiones de instancias Azure en la [documentación Set-AzVMExtension de la extensión Azure][1].

La extensión Azure puede aceptar tanto parámetros normales como protegidos.

Los parámetros normales incluyen:

| Variable | Tipo | Descripción  |
|----------|------|--------------|
| `site` | Cadena | Definir el sitio de ingesta de Datadog, por ejemplo: `SITE=`{{< region-param key="dd_site" code="true">}} |
| `agentVersion` | Cadena | La versión del Agent a instalar, siguiendo el formato `x.y.z` o `latest` |
| `agentConfiguration` | URI | (Opcional) URI al blob Azure que contiene la configuración del Agent como archivo zip. |
| `agentConfigurationChecksum` | Cadena | La suma de comprobación SHA256 del archivo zip de configuración del Agent, obligatoria si se define `agentConfiguration`. |

Los parámetros protegidos incluyen:

| Variable | Tipo | Descripción  |
|----------|------|--------------|
| `api_key`| Cadena | Añade la clave de API de Datadog al archivo de configuración. |

**Nota**: Si `agentConfiguration` y `api_key` se definen al mismo tiempo, la clave de API que se encuentra en `agentConfiguration` tiene prioridad. Ten en cuenta también que si se define una clave de API en la máquina de destino, no es posible modificarla con `Set-AzVMExtension`.

### Definición de un URI de configuración 
Este ejemplo muestra cómo definir una configuración para que la utilice el Datadog Agent .
El URI de configuración del Datadog Agent debe ser un URI de almacenamiento de blobs Azure.
La extensión Azure del Datadog Agent para Windows comprobará que el URI `agentConfiguration` provenga del dominio `.blob.core.windows.net`.
La configuración del Datataog Agent debe crearse desde la carpeta `%PROGRAMDATA%\Datadog`.

{{< code-block lang="powershell" >}}
Set-AzVMExtension -Name "DatadogAgent" -Publisher "Datadog.Agent" -Type "DatadogWindowsAgent" -TypeHandlerVersion "7.0" -Settings @{"site" = "<SITE_PARAMETER>"; "agentConfiguration" = "https://<CONFIGURATION_BLOB>.blob.core.windows.net/<FILE_PATH>.zip"; "agentConfigurationChecksum" = "<SHA256_CHECKSUM>"} -DisableAutoUpgradeMinorVersion
{{< /code-block >}}

**Nota**: Una vez instalado el Datadog Agent, la configuración sólo podrá cambiarse al actualizar a una versión más reciente.

### Configurar una versión específica del Agent
Este ejemplo muestra cómo especificar una versión del Agent para instalar. Por defecto, la extensión Azure del Datadog Agent para Windows instalará la última versión del Datadog Agent.

**Nota**: Las versiones anteriores *no* son compatibles, por lo que no es posible instalar una versión del Datadog Agent *anterior* a la instalada actualmente en la máquina de destino. Para instalar una versión menos reciente del Datadog Agent, desinstala primero la versión anterior eliminando la extensión Azure del Datadog Agent para Windows en el equipo de destino. La eliminación de la extensión Azure del Datadog Agent para Windows no elimina la configuración del Datadog Agent.

{{< code-block lang="powershell" >}}
Set-AzVMExtension -Name "DatadogAgent" -Publisher "Datadog.Agent" -Type "DatadogWindowsAgent" -TypeHandlerVersion "7.0" -Settings @{"site" = "<SITE_PARAMETER>"; "agentVersion" = "latest"} -ProtectedSettings @{"api_key" = "<DATADOG_API_KEY>"} -DisableAutoUpgradeMinorVersion
{{< /code-block >}}

[1]: https://learn.microsoft.com/en-us/powershell/module/az.compute/set-azvmextension
{{% /tab %}}
{{% tab "Linux" %}}

{{< code-block lang="bash" >}}
az vm extension set --publisher "Datadog.Agent" --name "DatadogLinuxAgent" --version 7.0 --settings '{"site":"datadoghq.com", "agentVersion":"latest"}' --protected-settings '{"api_key":"<DATADOG_API_KEY>"}' --no-auto-upgrade-minor-version
{{< /code-block >}}
Encontrarás más información sobre la sintaxis para configurar extensiones de instancias Azure en la [referencia de la CLI de la extensión Azure][1].

La extensión Azure puede aceptar tanto parámetros normales como protegidos.

Los parámetros normales incluyen:

| Variable | Tipo | Descripción  |
|----------|------|--------------|
| `site` | Cadena | Definir el sitio de ingesta de Datadog, por ejemplo: `SITE=`{{< region-param key="dd_site" code="true">}} |
| `agentVersion` | Cadena | La versión del Agent a instalar, siguiendo el formato `x.y.z` o `latest` |
| `agentConfiguration` | URI | (Opcional) URI al blob Azure que contiene la configuración del Agent como archivo zip. |
| `agentConfigurationChecksum` | Cadena | La suma de comprobación SHA256 del archivo zip de configuración del Agent, obligatoria si se define `agentConfiguration`. |

Los parámetros protegidos incluyen:

| Variable | Tipo | Descripción  |
|----------|------|--------------|
| `api_key`| Cadena | Añade la clave de API de Datadog al archivo de configuración. |

**Nota**: Si `agentConfiguration` y `api_key` se definen al mismo tiempo, la clave de API que se encuentra en `agentConfiguration` tiene prioridad. Ten en cuenta también que si se define una clave de API en la máquina de destino, no es posible modificarla con `api_key`.

### Definición de un URI de configuración 
Este ejemplo muestra cómo especificar una configuración para que la utilice el Datadog Agent.
- El URI de configuración del Datadog Agent debe ser un URI de almacenamiento de blobs Azure.
- La extensión Azure del Datadog Agent para Linux comprueba que el URI `agentConfiguration` proviene del dominio `.blob.core.windows.net`.
- La configuración del Datataog Agent debe crearse a partir de la carpeta `/etc/datadog-agent/`.

{{< code-block lang="bash" >}}
az vm extension set --publisher "Datadog.Agent" --name "DatadogLinuxAgent" --version 7.0 --settings '{"site":"datadoghq.com", "agentVersion":"latest", "agentConfiguration":"https://<CONFIGURATION_BLOB>.blob.core.windows.net/<FILE_PATH>.zip", "agentConfigurationChecksum":"<SHA256_CHECKSUM>"}' --protected-settings '{"api_key":"<DATADOG_API_KEY>"}' --no-auto-upgrade-minor-version
{{< /code-block >}}


[1]: https://learn.microsoft.com/en-us/cli/azure/vm/extension
{{% /tab %}}
{{< /tabs >}}

## Instalar en Azure Arc

Para ejecutar el Datadog Agent en tus instancias [Azure Arc][5] como una extensión, utiliza el comando que coincide con tu entorno.

{{< tabs >}}
{{% tab "Windows" %}}

{{< code-block lang="powershell" >}}
az connectedmachine extension create --name <NAME> --machine-name <MACHINE_NAME> -g <RESOURCE_GROUP> --publisher Datadog.Agent --type DatadogWindowsAgent --location <LOCATION> --settings '{"site":"<SITE_PARAMETER>"}' --protected-settings '{"api_key":"<DATADOG_API_KEY>"}'
{{< /code-block >}}

{{% /tab %}}
{{% tab "Linux" %}}

{{< code-block lang="bash" >}}
az connectedmachine extension create --name <NAME> --machine-name <MACHINE_NAME> -g <RESOURCE_GROUP> --publisher Datadog.Agent --type DatadogLinuxAgent --location <LOCATION> --settings '{"site":"<SITE_PARAMETER>"}' --protected-settings '{"api_key":"<DATADOG_API_KEY>"}'
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

Encontrarás más información sobre la sintaxis para configurar extensiones `connectedmachine` Azure en la página de la [extensión az connectedmachine][6].

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/blog/introducing-azure-monitoring-with-one-click-datadog-deployment
[2]: /es/integrations/guide/azure-native-manual-setup/#deploy-the-datadog-agent
[3]: /es/getting_started/site/#access-the-datadog-site
[4]: /es/account_management/api-app-keys/#api-keys
[5]: /es/integrations/azure_arc/
[6]: https://learn.microsoft.com/en-us/cli/azure/connectedmachine/extension
[7]: /es/integrations/guide/azure-manual-setup/#agent-installation