---
aliases:
- /es/integrations/guide/azure-architecture-and-configuration/
- /es/integrations/guide/powershell-command-to-install-azure-datadog-extension/
- /es/integrations/guide/azure-vms-appear-in-app-without-metrics/
- /es/integrations/guide/azure-troubleshooting/
- /es/integrations/guide/powered-down-azure-vm-on-infrastructure-list/
- /es/integrations/guide/azure-count-metric/
- /es/integrations/guide/azure-status-metric
- /es/integrations/faq/azure-vm-status-is-not-reporting
- /es/integrations/faq/azure-status-metric
- /es/integrations/faq/azure-count-metric
- /es/integrations/faq/azure-troubleshooting
- /es/integrations/faq/azure-vms-are-showing-up-in-the-app-but-not-reporting-metrics
- /es/integrations/faq/my-Azure-vm-is-powered-down-why-is-it-still-listed-in-my-infrastructure-list
- /es/integrations/faq/powershell-command-to-install-azure-datadog-extension
description: Configuración y arquitectura avanzadas de la integración de Azure de
  Datadog
further_reading:
- link: /integrations/azure/
  tag: Documentación
  text: Integración de Azure
title: Configuración avanzada de Azure
---
## Descripción general {#overview}

Esta guía proporciona opciones de configuración avanzadas y arquitecturas de referencia para los usuarios que configuran la integración de Azure de Datadog, así como opciones de configuración alternativas para casos de uso específicos.

### Arquitecturas de referencia {#reference-architectures}

Los diagramas de esta guía proporcionan una representación visual del proceso de configuración y el resultado al seguir los pasos en [Getting Started with Azure][1]. Esta guía proporciona una descripción general detallada de la interacción de Datadog con su entorno de Azure y responde a preguntas comunes sobre seguridad, cumplimiento y gobernanza.

### Configuraciones alternativas {#alternate-configurations}

Los procesos de configuración documentados en [Getting Started with Azure][1] son los pasos recomendados y dan como resultado la configuración ideal para la mayoría de los usuarios. Las opciones de configuración alternativas en este documento pueden ser preferibles para ciertos casos de uso. Cualquier compensación en rendimiento, características o facilidad de administración se describe según sea necesario.

## Recopilación de métricas y datos {#metric-and-data-collection}

Habilitar la integración de Azure de Datadog permite a Datadog:

  - Descubrir y hacer un seguimiento de todos los recursos en todas las suscripciones dentro del contexto determinado
  - Actualizar automáticamente las definiciones de métricas descubiertas, para garantizar que se recopilen todas las métricas disponibles de Azure Monitor
  - Ingestar una variedad de metadatos generales y específicos de recursos (incluidas las etiquetas personalizadas de Azure) y aplicarlos a las métricas de recursos asociadas en Datadog como etiquetas
  - Consultar las API de metadatos de Azure y utilizar las respuestas para [generar métricas útiles en Datadog][2] para obtener información que Azure Monitor no admite

Las API de Azure utilizadas y los datos recopilados son idénticos independientemente de si utiliza la versión estándar o la versión nativa de Azure de la integración.

El siguiente diagrama describe el proceso y la arquitectura resultante de la configuración de la integración de Azure descrita en [Getting Started with Azure][1].

{{< img src="integrations/guide/azure_architecture_and_configuration/app_registration_integration_setup.png" alt="Diagrama de flujo de trabajo que muestra la configuración de la integración de registro de aplicaciones de Azure: crear un registro de aplicación con una entidad de servicio y secretos de cliente en Azure, asignar el rol de lector de seguimiento a la suscripción o a los recursos de administración y, luego, configurar la integración con filtros de etiquetas de métricas en el backend de Datadog." >}}

Una vez completado esto, la recopilación de datos comienza automáticamente. El registro de la aplicación permite a Datadog [solicitar un token de Azure Active Directory][3] (AD). Datadog utiliza este token como autorización para llamadas a la API a varias API de Azure, para descubrir recursos dentro del contexto proporcionado y recopilar datos. Este proceso continuo se ejecuta con intervalos de dos minutos de forma predeterminada y se utiliza para descubrir y recopilar datos de su entorno de Azure. El proceso de recopilación de datos se muestra a continuación.

{{< img src="integrations/guide/azure_architecture_and_configuration/app_registration_metric_collection.png" alt="Diagrama de flujo de trabajo que muestra el proceso de recopilación de métricas de Azure: el backend de Datadog lee la configuración, se autentica a través de la entidad de servicio en Azure Active Directory, recopila metadatos de suscripción y recursos mediante permisos RBAC, filtra recursos por etiquetas y, luego, recupera métricas de Azure Monitor para su ingesta en Datadog." >}}

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
Los diagramas de recopilación de métricas y registros anteriores utilizan la autenticación con un secreto de cliente. Con **Autenticación sin secretos**, el registro de la aplicación confía en la identidad de Datadog a través de una credencial federada de Azure y la federación de identidad de carga de trabajo de OpenID Connect (OIDC). Esto reemplaza el secreto de cliente almacenado. Para mover un registro de aplicación existente a la Autenticación sin secretos, consulte [Migrar un registro de aplicación existente a la Autenticación sin secretos](/getting_started/integrations/azure/#secretless-migration-setup).
{{< /site-region >}}

## Recopilación de registros {#log-collection}

El siguiente diagrama proporciona una arquitectura de referencia para el reenvío de registros de Azure a Datadog mediante [reenvío automático de registros][29]. Un plano de control implementado en la suscripción que elija descubre recursos y configura sus ajustes de diagnóstico. Los reenviadores de registros, que consisten en un trabajo de Azure Container Apps y una cuenta de almacenamiento, se implementan en cada región donde sus recursos generan registros, y se escalan hacia arriba o hacia abajo para coincidir con el volumen de registros.

{{<img src="/logs/guide/azure_automated_logs_architecture/detailed_architecture.png" alt="Diagrama de flujo de trabajo que muestra el reenvío automático de registros de Azure: el plano de control descubre recursos, escala los reenviadores de registros entre regiones, configura los ajustes de diagnóstico para enviar registros a las cuentas de almacenamiento y, luego, las Container Apps verifican y reenvían nuevos registros a Datadog Log Management." style="width:100%">}}

Para obtener instrucciones de configuración, consulte la [guía de configuración de reenvío automático de registros de Azure][29].

{{% collapse-content title="Reenvío de registros de Event Hub (heredado)" level="h3" expanded=false id="legacy-event-hub-log-forwarding" %}}

La siguiente arquitectura de referencia se aplica a las configuraciones de reenvío de registros de Event Hub existentes. Para nuevas implementaciones, utilice [reenvío automático de registros][29] en su lugar.

{{< img src="integrations/guide/azure_architecture_and_configuration/manual_log_forwarding.png" alt="Diagrama de arquitectura que muestra la configuración manual de reenvío de registros de Azure en dos regiones donde los recursos de Azure utilizan ajustes de diagnóstico para enviar registros a través de Event Hubs y funciones de reenvío de registros a la ingesta de registros de Datadog." >}}

#### Uso de las plantillas proporcionadas {#using-the-provided-templates}

El botón **Implementar en Azure** en la [guía de registro de Event Hub][13] principal de Azure proporciona una plantilla para crear un par de Event Hub y función de reenvío. Además de usar esta plantilla para implementar directamente, puede usar las plantillas ARM subyacentes como punto de partida para sus propias implementaciones de infraestructura como código.

Estas plantillas no agregan configuraciones de diagnóstico, aparte de una configuración de diagnóstico opcional para los registros de actividad. Para los registros, Datadog recomienda utilizar plantillas ARM o Terraform para agregar configuraciones de diagnóstico a sus recursos mediante programación. Estas configuraciones de diagnóstico deben agregarse a cada recurso que necesite enviar registros a Datadog.

#### Consideraciones sobre la región {#region-considerations}

Las configuraciones de diagnóstico solo pueden enviar registros a Event Hubs en la misma región que el recurso. Agregue un par de Event Hub y función de reenvío en cada región que contenga recursos para los cuales desee enviar registros a Datadog.

Sin embargo, las configuraciones de diagnóstico no se limitan a enviar registros a Event Hubs en la misma suscripción que el recurso. Si tiene varias suscripciones dentro de su inquilino de Azure, pueden compartir un único Event Hub y una función de reenvío dentro de la misma región.

#### Consideraciones sobre el alto volumen de registros {#high-volume-log-considerations}

A medida que el volumen de registros aumenta, es posible que observe cuellos de botella, que generalmente surgen en Event Hubs. Si planea enviar grandes volúmenes de registros, es posible que desee considerar agregar particiones adicionales o usar un nivel Premium o Dedicado.
Para volúmenes de registros especialmente altos, puede considerar agregar pares adicionales de Event Hub y función de reenvío dentro de la misma región, y dividir el tráfico entre ellos.

{{% /collapse-content %}}

{{% collapse-content title="Comandos para instalar la extensión de Azure Datadog" level="h3" expanded=false id="azure-datadog-extension-commands" %}}
## Instalar en Azure {#install-on-azure}

Datadog proporciona una extensión de Azure para ayudar con la implementación del Datadog Agent en instancias de Azure:

* [Introducción al monitoreo de Azure con implementación de Datadog en un clic][6]
* [Integración de Azure][10] _Todos los sitios_
* [Integración nativa de Azure][7] _Solo US3_

Una alternativa a la instalación mediante la interfaz gráfica es la línea de comandos.

Para ejecutar el Datadog Agent en sus instancias de Azure como una extensión, utilice el comando que corresponda a su entorno. Reemplace `<SITE_PARAMETER>` con el valor de su **parámetro de sitio** de la cuenta de Datadog en la [página de sitios de Datadog][33], y `<DATADOG_API_KEY>` con su [clave de API de Datadog][9].
   **Nota**: Se requiere Python 3.9+ para instalar la versión 7+ del Datadog Agent.

{{< tabs >}}
{{% tab "Windows" %}}

{{< code-block lang="powershell" >}}
Set-AzVMExtension -Name "DatadogAgent" -Publisher "Datadog.Agent" -Type "DatadogWindowsAgent" -TypeHandlerVersion "7.0" -Settings @{"site" = "<SITE_PARAMETER>"; "agentVersion" = "latest"} -ProtectedSettings @{"api_key" = "<DATADOG_API_KEY>"} -DisableAutoUpgradeMinorVersion
{{< /code-block >}}

Puede encontrar más información sobre la sintaxis para establecer extensiones de instancia de Azure en la [documentación de Set-AzVMExtension de Azure][100].

La extensión de Azure puede aceptar tanto la configuración normal como la configuración protegida.

La configuración normal incluye:

| Variable | Tipo | Descripción  |
|----------|------|--------------|
| `site` | Cadena | Establece el sitio de ingesta de Datadog, por ejemplo: `SITE=`{{< region-param key="dd_site" code="true">}} |
| `agentVersion` | Cadena | La versión del Datadog Agent que se va a instalar, siguiendo el formato `x.y.z` o `latest` |
| `agentConfiguration` | URI | (opcional) URI al blob de Azure que contiene la configuración del Agent como un archivo ZIP. |
| `agentConfigurationChecksum` | Cadena | La suma de verificación SHA256 del archivo ZIP de configuración del Agent, obligatoria si se especifica `agentConfiguration`. |

La configuración protegida incluye:

| Variable | Tipo | Descripción  |
|----------|------|--------------|
| `api_key`| Cadena | Agrega la clave de Datadog API al archivo de configuración. |

**Nota**: Si se especifican `agentConfiguration` y `api_key` al mismo tiempo, la clave de API que se encuentra en `agentConfiguration` tiene prioridad. Tenga en cuenta también que si se establece una clave de API en la máquina de destino, no es posible cambiarla con `Set-AzVMExtension`.

### Especifique un URI de configuración {#specify-a-configuration-uri}

Este ejemplo muestra cómo especificar una configuración para que la utilice el Datadog Agent.
El URI de configuración del Datadog Agent debe ser un URI de almacenamiento de blobs de Azure.
La extensión de Azure del Datadog Windows Agent verifica que el URI `agentConfiguration` provenga del dominio `.blob.core.windows.net`.
La configuración del Datadog Agent debe crearse desde la carpeta `%PROGRAMDATA%\Datadog` (consulte el [archivo de configuración de ejemplo del Agent para Windows][101] para ver todas las opciones de configuración disponibles).

<div class="alert alert-info">
Para reutilizar la configuración de un Agent existente:

   1. Elimine cualquier artefacto o archivo de instalación adicional del Agent existente <code>%ProgramData%\Datadog</code> carpeta para que solo contenga el <code>datadog.yaml</code> el archivo y la <code>conf.d</code> carpeta con sus configuraciones de integración.
   1. Guarde la carpeta depurada <code>%ProgramData%\Datadog</code> Carpeta como un archivo ZIP.
</div>

#### Genere una suma de verificación SHA256 a partir del archivo de configuración del Agent {#generate-a-sha256-checksum-from-the-agent-configuration-file}

{{< code-block lang="powershell" >}}
Get-FileHash -Path "C:\path\to\yourfile.zip" -Algorithm SHA256
{{< /code-block >}}

#### Instale el Agent con su configuración personalizada {#install-the-agent-with-your-custom-configuration}

Haga referencia a la URL de almacenamiento de blobs con el parámetro `agentConfiguration` y a la suma de verificación con el parámetro `agentConfigurationChecksum` para crear la extensión de VM.

{{< code-block lang="powershell" >}}
Set-AzVMExtension -Name "DatadogAgent" -Publisher "Datadog.Agent" -Type "DatadogWindowsAgent" -TypeHandlerVersion "7.0" -Settings @{"site" = "<SITE_PARAMETER>"; "agentConfiguration" = "https://<CONFIGURATION_BLOB>.blob.core.windows.net/<FILE_PATH>.zip"; "agentConfigurationChecksum" = "<SHA256_CHECKSUM>"} -DisableAutoUpgradeMinorVersion
{{< /code-block >}}

**Nota**: Una vez instalado el Datadog Agent, la configuración solo puede cambiarse al actualizar a una versión más reciente.

### Establezca una versión específica del Agent {#set-a-specific-version-of-the-agent}

Este ejemplo muestra cómo especificar una versión del Agent para instalar. De forma predeterminada, la extensión de Azure del Datadog Windows Agent instala la versión más reciente del Datadog Agent.

**Nota**: Las versiones anteriores *no* son compatibles, por lo que no es posible instalar una versión *inferior* del Datadog Agent a la que está instalada actualmente en la máquina de destino. Para instalar una versión inferior del Datadog Agent, desinstale primero la versión anterior eliminando la extensión de Azure del Datadog Windows Agent en la máquina de destino. Eliminar la extensión de Azure del Datadog Windows Agent no elimina la configuración del Datadog Agent.

{{< code-block lang="powershell" >}}
Set-AzVMExtension -Name "DatadogAgent" -Publisher "Datadog.Agent" -Type "DatadogWindowsAgent" -TypeHandlerVersion "7.0" -Settings @{"site" = "<SITE_PARAMETER>"; "agentVersion" = "latest"} -ProtectedSettings @{"api_key" = "<DATADOG_API_KEY>"} -DisableAutoUpgradeMinorVersion
{{< /code-block >}}

[100]: https://learn.microsoft.com/powershell/module/az.compute/set-azvmextension
[101]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/example/datadog-agent_windows.yaml.example
{{% /tab %}}
{{% tab "Linux" %}}

{{< code-block lang="shell" >}}
az vm extension set --publisher "Datadog.Agent" --name "DatadogLinuxAgent" --version 7.0 --settings '{"site":"datadoghq.com", "agentVersion":"latest"}' --protected-settings '{"api_key":"<DATADOG_API_KEY>"}' --no-auto-upgrade-minor-version
{{< /code-block >}}

Puede encontrar más información sobre la sintaxis para configurar extensiones de instancia de Azure en la [referencia de la CLI de extensiones de Azure][200].

La extensión de Azure puede aceptar tanto la configuración normal como la configuración protegida.

La configuración normal incluye:

| Variable | Tipo | Descripción  |
|----------|------|--------------|
| `site` | Cadena | Establece el sitio de ingesta de Datadog, por ejemplo: `SITE=`{{< region-param key="dd_site" code="true">}} |
| `agentVersion` | Cadena | La versión del Datadog Agent que se va a instalar, siguiendo el formato `x.y.z` o `latest` |
| `agentConfiguration` | URI | (opcional) URI al blob de Azure que contiene la configuración del Agent como un archivo ZIP. |
| `agentConfigurationChecksum` | Cadena | La suma de verificación SHA256 del archivo ZIP de configuración del Agent, obligatoria si se especifica `agentConfiguration`. |

La configuración protegida incluye:

| Variable | Tipo | Descripción  |
|----------|------|--------------|
| `api_key`| Cadena | Agrega la clave de Datadog API al archivo de configuración. |

**Nota**: Si se especifican `agentConfiguration` y `api_key` al mismo tiempo, la clave de API que se encuentra en `agentConfiguration` tiene prioridad. Si se establece una clave de API en la máquina de destino, no es posible cambiarla con la configuración `api_key`.

### Especifique un URI de configuración {#specify-a-configuration-uri-1}

Este ejemplo muestra cómo especificar una configuración para que la utilice el Datadog Agent.
- El URI de configuración del Datadog Agent debe ser un URI de almacenamiento de blobs de Azure.
- La extensión de Azure del Datadog Linux Agent verifica que el URI `agentConfiguration` provenga del dominio `.blob.core.windows.net`.
- La configuración del Datadog Agent debe crearse desde la carpeta `/etc/datadog-agent/` (consulte el [archivo de configuración de ejemplo del Datadog Agent para Linux][201] para ver todas las opciones de configuración disponibles).

<div class="alert alert-info">
Para reutilizar la configuración de un Datadog Agent existente guardando su <code>/etc/datadog-agent</code> carpeta como un archivo ZIP:

<code>zip -r datadog_config.zip /etc/datadog-agent</code>.
</div>

#### Genere una suma de verificación SHA256 a partir del archivo de configuración del Agent {#generate-a-sha256-checksum-from-the-agent-configuration-file-1}

{{< code-block lang="shell" >}}
sha256sum <YOUR_FILENAME>.zip
{{< /code-block >}}

#### Instale el Agent con su configuración personalizada {#install-the-agent-with-your-custom-configuration-1}

Haga referencia a la URL de almacenamiento de blobs con el parámetro `agentConfiguration` y a la suma de verificación con el parámetro `agentConfigurationChecksum` para crear la extensión de VM.

{{< code-block lang="shell" >}}
az vm extension set --publisher "Datadog.Agent" --name "DatadogLinuxAgent" --version 7.0 --settings '{"site":"datadoghq.com", "agentVersion":"latest", "agentConfiguration":"https://<CONFIGURATION_BLOB>.blob.core.windows.net/<FILE_PATH>.zip", "agentConfigurationChecksum":"<SHA256_CHECKSUM>"}' --protected-settings '{"api_key":"<DATADOG_API_KEY>"}' --no-auto-upgrade-minor-version
{{< /code-block >}}


[200]: https://learn.microsoft.com/cli/azure/vm/extension
[201]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/example/datadog-agent_linux.yaml.example
{{% /tab %}}
{{< /tabs >}}

## Instale en Azure Arc {#install-on-azure-arc}

Para ejecutar el Datadog Agent en sus instancias de [Azure Arc][11] como una extensión, utilice el comando que corresponda a su entorno.

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

Puede encontrar más información sobre la sintaxis para configurar extensiones de Azure `connectedmachine` en la página de [az connectedmachine extension][12].
{{% /collapse-content %}} 

{{% collapse-content title="Métricas de recuento de Azure" level="h3" expanded=false id="azure-count-metrics" %}}
Datadog genera una métrica adicional para cada recurso supervisado con la [integración de Azure][23]: `azure.*.count`. Por ejemplo, las VM de Azure supervisadas por Datadog informan `azure.vm.count`.

La métrica `azure.*.count` es una mejora con respecto a `azure.*.status`, la cual está obsoleta.

## Métrica de recuento {#count-metric}

La métrica `azure.*.count` proporciona dos piezas fundamentales de información:

- El número de recursos de ese tipo.
- El estado de cada recurso según lo informado por Azure.

La métrica `azure.*.count` se crea en el mismo espacio de nombres que las otras métricas para ese tipo de recurso, por ejemplo: `azure.network_loadbalancers.count`. Incluye todas las mismas etiquetas de metadatos que las otras métricas en ese espacio de nombres, además de una etiqueta adicional para `status`.

### Casos de uso {#use-cases}

Utilice la métrica `azure.*.count` para:

- Visualice el número de máquinas virtuales desglosadas por su estado a lo largo del tiempo mediante la representación gráfica de `azure.vm.count` sobre todo y la suma por `status`.
- Crear widgets de consulta en paneles para mostrar el número de un tipo de recurso determinado. Utilice cualquier etiqueta disponible para definir el contexto del recuento en una agregación relevante, como región, grupo de recursos, tipo o estado.
- Cree monitores para alertarle sobre el estado de diferentes recursos de Azure.

**Nota**: En algunos casos, la configuración de visualización predeterminada puede hacer que parezca que los recursos se cuentan dos veces de forma intermitente en gráficos o widgets de consulta. Esto no afecta a los monitores ni a los widgets con un contexto específico de estado.
Puede reducir este efecto desactivando [interpolation][22] en los gráficos o widgets de consulta configurando Interpolation > none o utilizando `.fill(null)`.

Para la mayoría de los tipos de recursos, los estados posibles son:

- En ejecución
- No disponible
- Desconocido
- Degradado
- Fallido

Las máquinas virtuales tienen estados más detallados, que incluyen:

- En ejecución
- Detenido_desasignado
- Detenido
- Desconocido
- No disponible
- Degradado
- Fallido

Si ve un estado de `query_failed`, debe habilitar el proveedor de Resource Health en Azure.
{{% /collapse-content %}} 

## Solución de problemas de la integración de Azure {#azure-integration-troubleshooting}

{{% collapse-content title="Encuentre el nombre de su inquilino" level="h3" expanded=false id="troubleshooting-find-your-tenant-name" %}}
1. Navegue a [portal.azure.com][24].
2. En la barra lateral izquierda, seleccione **Azure Active Directory**.
3. En **Información básica**, busque el valor de **Nombre**.
{{% /collapse-content %}} 

{{% collapse-content title="No se puede iniciar sesión" level="h3" expanded=false id="troubleshooting-unable-to-login" %}}
Si experimenta un error al iniciar sesión mientras intenta instalar la integración de Azure, comuníquese con el [soporte de Datadog][36]. Cuando sea posible, adjunte una captura de pantalla.
{{% /collapse-content %}} 

{{% collapse-content title="Métricas faltantes" level="h3" expanded=false id="troubleshooting-missing-metrics" %}}
Asegúrese de haber completado el proceso de instalación, lo cual incluye otorgar permisos de lectura a la aplicación de Azure para las suscripciones que desea hacer un seguimiento.

Para máquinas virtuales implementadas con ARM, también debe activar los Diagnósticos y seleccionar las métricas de VM que desea recopilar. Consulte **Habilitar diagnósticos** a continuación para obtener instrucciones.

Para otras métricas faltantes, comuníquese con el [soporte de Datadog][36] con la siguiente información sobre la métrica:
- dimensiones
- grupo de recursos
- nombre del recurso
- ID de suscripción o nombre de suscripción 

Adjunte una captura de pantalla de un gráfico de Azure Monitor que muestre un gráfico de la métrica. **Importante**: Grafique puntos de datos de 1 minuto en la captura de pantalla.

#### Habilitar diagnósticos {#enable-diagnostics}

Activar los diagnósticos permite que las máquinas virtuales implementadas con ARM recopilen información de registro que incluye métricas para CPU, red, etc. Siga estas instrucciones:

1. Navegue al [portal de Azure][24] y localice su máquina virtual.
2. Haga clic en **Configuración de diagnósticos** en la sección **Seguimiento**.
3. Elija una cuenta de almacenamiento y haga clic en **Habilitar seguimiento a nivel de invitado**.
4. De forma predeterminada, las métricas y los registros básicos están habilitados. Ajuste según sus preferencias.
5. Haga clic en **Guardar** para guardar cualquier cambio.

    {{< img src="integrations/guide/azure_troubleshooting/azure_enable_diagnostics.png" alt="Descripción general de la configuración de diagnósticos de Azure mostrada con \"Sin cuenta de almacenamiento\" resaltado en \"Seleccionar una cuenta de almacenamiento\" y \"Habilitar seguimiento a nivel de invitado\" habilitado" style="width:70%">}}
{{% /collapse-content %}} 

{{% collapse-content title="Discrepancia entre sus datos en Azure y Datadog" level="h3" expanded=false id="troubleshooting-metric-discrepancy" %}}
La integración de Azure de Datadog recopila todas las métricas de [Azure Monitor][27]. Las métricas se recopilan con todas las dimensiones disponibles (que se asignan a etiquetas en Datadog), la granularidad de tiempo más alta y el tipo de agregación principal.

Las secciones a continuación describen dos distinciones importantes que debe tener en cuenta, así como los pasos para [conciliar la discrepancia](#reconcile-the-discrepancy).

#### 1. Desglose temporal {#1-time-aggregation}

Datadog muestra datos sin procesar de Azure en valores por segundo, independientemente del marco de tiempo seleccionado en Azure. Eso puede hacer que el valor de Datadog parezca más bajo que el valor que muestra Azure. Consulte [desglose temporal][15] en la documentación de métricas para obtener más información.

#### 2. Desglose espacial {#2-space-aggregation}

[Desglose espacial][28] en Datadog corresponde al [tipo de agregación principal][17] de la métrica en Azure Monitor. Puede encontrar el tipo de agregación principal en la API [Metric Definitions - List][16] de Azure, en el campo `primaryAggregationType`.

#### Concilie la discrepancia {#reconcile-the-discrepancy}

1. Grafique la métrica en [Azure Monitor Metrics Explorer][18], o yendo al recurso en Azure y haciendo clic en **Monitoring** y luego en **Metrics** en el panel izquierdo.
2. Grafique la métrica en el [Datadog Metrics Explorer][31].
3. Confirme que la consulta en Azure tenga el mismo alcance que la consulta en Datadog:
   - Cualquier dimensión utilizada en la consulta de métricas de Azure debe coincidir con las etiquetas utilizadas en la consulta de métricas de Datadog
   - El tipo de agregación principal utilizado en la consulta debe coincidir con el [agregador de desglose espacial][28] de Datadog
   - El marco de tiempo debe coincidir con el marco de tiempo en el Metrics Explorer de Datadog
4. Pase el cursor sobre un punto de datos en el gráfico para mostrar la marca de tiempo y el valor.

{{< img src="integrations/guide/azure_advanced_configuration/azure_metric_explorer.png" alt="El Metrics Explorer de Azure con el cursor sobre un punto en el gráfico, y el valor de la métrica y la marca de tiempo resaltados" >}}

5. Encuentre el mismo punto en el tiempo en el gráfico de Datadog y compare los valores. Si los valores son iguales, la discrepancia original se debió a diferencias en el desglose temporal o el desglose espacial entre los dos gráficos.
{{% /collapse-content %}} 

### Solución de problemas de recopilación de registros {#log-collection-troubleshooting}

Para solucionar problemas de reenvío de registros, comience con la [sección de solución de problemas general](#general-troubleshooting-applicable-to-all-setup-methods). Si esos pasos no resuelven su problema, consulte la siguiente guía específica de la configuración. 

- [Automatizado](#automated-log-forwarding-troubleshooting)
- [Blob Storage](#blob-storage-log-forwarding-troubleshooting)
- [Integración nativa](#azure-native-integration-log-forwarding-troubleshooting)
- [Event Hub](#event-hub-log-forwarding-troubleshooting)

#### Solución de problemas general aplicable a todos los métodos de configuración {#general-troubleshooting-applicable-to-all-setup-methods}

Superación de la cuota diaria de registro:
: Asegúrese de no haber excedido su [cuota diaria][20] para la retención de registros.

Exclusión de registros con filtros de exclusión:
: Asegúrese de que sus registros no estén excluidos por [filtros de exclusión][38].

Sintaxis incorrecta utilizada para buscar registros:
: Asegúrese de haber utilizado la [sintaxis de búsqueda][34] correcta y de que su búsqueda contenga los atributos o etiquetas correctos.

Configuración de diagnóstico no presente:
: Asegúrese de que se haya agregado una [configuración de diagnóstico][8] a los recursos, los registros de actividad y los registros de Entra ID que desea enviar a Datadog.

**Nota**: Puede buscar registros de Entra ID con la consulta `source:azure.activedirectory`.

#### Solución de problemas de reenvío automático de registros {#automated-log-forwarding-troubleshooting}

{{% collapse-content title="Comprobar si hay conflictos de nombres" level="h5" expanded=false id="troubleshooting-logs-naming-conflicts" %}}
Si tiene recursos de Azure con el mismo nombre de recurso que uno de los parámetros predeterminados, esto puede provocar conflictos de nombres. Azure no permite que los recursos compartan nombres de recursos dentro de una suscripción individual. Datadog recomienda cambiar el nombre del parámetro predeterminado por uno único que aún no exista en su entorno.

**Nota**: Si está volviendo a ejecutar la plantilla debido a este error, Datadog recomienda también eliminar todo el grupo de recursos para crear una implementación nueva. 
{{% /collapse-content %}} 

{{% collapse-content title="Asegúrese de que el proveedor de recursos esté registrado" level="h5" expanded=false id="troubleshooting-logs-unregistered-resource-provider" %}}
Si la implementación de su plantilla falla debido al error `The subscription is not registered to use namespace 'Microsoft.EventHub'`:

Azure cuenta con proveedores de recursos para cada uno de sus servicios, como `Microsoft.EventHub` para Azure Event Hubs. Si su suscripción de Azure no está registrada en un proveedor de recursos requerido, el script fallará. 

Solucione esto registrándose con el proveedor de recursos adecuado. Ejecute el comando de ejemplo a continuación en CloudShell, sustituyendo <RESOURCE_PROVIDER_NAME> por el nombre del proveedor de recursos (por ejemplo, `Microsoft.EventHub`).

{{< code-block lang="shell" >}}

az provider register --namespace <RESOURCE_PROVIDER_NAME>

{{< /code-block >}}
{{% /collapse-content %}} 

{{% collapse-content title="Verifique los valores de DD_SITE y DD_API_KEY" level="h5" expanded=false id="troubleshooting-logs-check-site-and-api-key-alf" %}}
Si faltan todos los registros, verifique su [sitio de Datadog][33] y su clave de API:

1. En el grupo de recursos donde se implementaron los recursos de reenvío de registros automatizado, vaya a **Configuración > Implementaciones**.
2. Seleccione la implementación más reciente.
3. Haga clic en **Volver a implementar** para verificar y modificar los valores.
{{% /collapse-content %}} 

{{% collapse-content title="Verifique que los registros estén presentes en el contenedor de la cuenta de almacenamiento" level="h5" expanded=false id="troubleshooting-logs-verify-logs-in-storage-account" %}}
Para los registros de recursos de Azure faltantes, busque la cuenta de almacenamiento implementada por ARM en la región del recurso y verifique el contenedor con los registros esperados.
{{% /collapse-content %}} 

{{% collapse-content title="Inspeccione los registros containerAppConsole de los trabajos del reenviador" level="h5" expanded=false id="troubleshooting-logs-inspect-forwarder-job-logs" %}}
Los [registros de la consola de Container App][32] le ayudan a diagnosticar errores y excepciones de la aplicación. Para inspeccionar los registros, habilite el registro dentro del entorno de Container Apps en la misma región que sus recursos a los que les faltan registros.
{{% /collapse-content %}} 

**Nota**: Al usar el reenviador de registros automatizado para enviar registros, debe configurar manualmente la configuración de diagnóstico de Microsoft Entra. Consulte [Configurar la configuración de diagnóstico de Microsoft Entra para registros de actividad][14] para obtener más información.

#### Solución de problemas de reenvío de registros de Blob Storage {#blob-storage-log-forwarding-troubleshooting}

{{% collapse-content title="Verifique los valores de DD_SITE y DD_API_KEY" level="h5" expanded=false id="troubleshooting-logs-check-site-and-api-key-bs" %}}
Si le faltan todos los registros, asegúrese de que:
   - El [sitio de Datadog seleccionado][33] sea correcto
   - La [clave de API][9] configurada pertenezca a la organización de Datadog correcta
{{% /collapse-content %}} 

{{% collapse-content title="Verifique la configuración del reenviador" level="h5" expanded=false id="troubleshooting-logs-verify-forwarder-config" %}}
Asegúrese de que el reenviador esté usando la versión más reciente, ejecutando Node.js 22 LTS o posterior en el sistema operativo Windows. El código está disponible públicamente en [index.js][19]
{{% /collapse-content %}} 

{{% collapse-content title="Inspeccione el disparador de Blob" level="h5" expanded=false id="troubleshooting-logs-inspect-blob-trigger" %}}
Verifique que el disparador de Blob Storage esté configurado con las siguientes opciones:

- **Tipo de enlace**: `Azure Blob Storage`
- **Nombre del parámetro de Blob**: `blobContent`
- **Ruta**: La ruta a sus datos de registro dentro de la cuenta de almacenamiento
- **Conexión de la cuenta de almacenamiento**: El nombre de la configuración de la aplicación que contiene la cadena de conexión de la cuenta de almacenamiento
{{% /collapse-content %}} 

{{% collapse-content title="Inspeccione las métricas de Blob Storage" level="h5" expanded=false id="troubleshooting-logs-inspect-blob-metrics" %}}
Asegúrese de que Blob Storage esté recibiendo datos:
: `azure.storage_storageaccounts_blobservices.ingress`

Asegúrese de que Blob Storage esté enviando datos:
: `azure.storage_storageaccounts_blobservices.egress` 

Asegúrese de que las solicitudes a Blob Storage sean exitosas:
: `azure.storage_storageaccounts_blobservices.transactions`

Para la métrica `azure.storage_storageaccounts_blobservices.transactions`, puede usar las siguientes consultas de métricas para ver la cantidad de operaciones `PUT` exitosas o fallidas, respectivamente:

   - `azure.storage_storageaccounts_blobservices.transactions{responsetype:success , apiname:put*} by {apiname}`
   - `azure.storage_storageaccounts_blobservices.transactions{!responsetype:success , apiname:put*} by {responsetype}`
{{% /collapse-content %}} 

{{% collapse-content title="Inspeccione las métricas de la función" level="h5" expanded=false id="troubleshooting-logs-inspect-function-metrics-bs" %}}
Verifique si la aplicación de funciones está experimentando problemas de ejecución, problemas de recepción o transmisión de datos, o códigos de estado de error inspeccionando las siguientes métricas:

Asegúrese de que la función esté recibiendo datos:
: `azure.functions.bytes_received`

Asegúrese de que la función esté enviando datos:
: `azure.functions.bytes_sent`

Asegúrese de que las solicitudes de la función estén recibiendo códigos de estado exitosos:
: `azure.functions.http2xx`

Asegúrese de que las solicitudes de la función no estén recibiendo códigos de estado de error:
: `azure.functions.http4xx`
: `azure.functions.http5xx`
{{% /collapse-content %}} 

{{% collapse-content title="Configuraciones de diagnóstico no agregadas automáticamente a los recursos o registros de actividad" level="h5" expanded=false id="troubleshooting-logs-diagnostic-settings-not-added" %}}

Si no se ha agregado automáticamente una configuración de diagnóstico a sus recursos o registros de actividad, verifique si:
   - Se ha alcanzado el [número máximo de configuraciones de diagnóstico][25]
   - Existe un bloqueo en los recursos que impide realizar modificaciones
{{% /collapse-content %}} 

**Nota**: Cuando se agregan nuevos registros a un archivo de Blob Storage, la función se activa para enviar el contenido completo del archivo, no solo las nuevas adiciones.

#### Solución de problemas de reenvío de registros de integración nativa de Azure {#azure-native-integration-log-forwarding-troubleshooting}

{{% collapse-content title="Verifique las reglas de etiquetas de los registros de recursos" level="h5" expanded=false id="troubleshooting-logs-check-resource-logs-tag-rules" %}}
Verifique que las reglas de etiquetas en la configuración del recurso de Datadog coincidan con las etiquetas establecidas en sus registros de recursos.

Si no hay problemas con las reglas de etiquetas, comuníquese con [Soporte de Datadog][36] y comparta la siguiente información:
   - **ID de inquilino**: Encuentre el valor del ID de inquilino en Entra ID, en **Información básica**
   - **ID de suscripción**: El ID de suscripción de cualquier suscripción a la que le falten registros
   - **ID de recurso de Datadog**: Encuentre el ID de recurso de Datadog yendo a **Configuración > Propiedades** en la hoja del recurso de Datadog. El ID de recurso utiliza este formato: `/subscriptions/<SUBSCRIPTION_ID>/resourceGroups/myresourcegroup/providers/Microsoft.Datadog/monitors/<DATADOG_RESOURCE_NAME`
   - **ID de recurso**: El ID de recurso de cualquier recurso al que le falten registros, como aplicaciones web o bases de datos
{{% /collapse-content %}} 

**Nota**: Al usar el recurso de Datadog en Azure para enviar registros, los ajustes de diagnóstico de Entra ID deben configurarse manualmente.

#### Solución de problemas de reenvío de registros de Event Hub {#event-hub-log-forwarding-troubleshooting}
   
{{% collapse-content title="Verifique si el proveedor de recursos no está registrado" level="h5" expanded=false id="troubleshooting-logs-check-resource-provider-registration" %}}

Si la implementación de su plantilla falla debido al error `The subscription is not registered to use namespace 'Microsoft.EventHub'`:

Azure cuenta con proveedores de recursos para cada uno de sus servicios, como `Microsoft.EventHub` para Azure Event Hubs. Si su suscripción de Azure no está registrada en un proveedor de recursos requerido, el script fallará. 

Solucione esto registrándose con el proveedor de recursos adecuado. Ejecute el comando de ejemplo a continuación en CloudShell, sustituyendo <RESOURCE_PROVIDER_NAME> por el nombre del proveedor de recursos (por ejemplo, `Microsoft.EventHub`).

{{< code-block lang="shell" >}}

az provider register --namespace <RESOURCE_PROVIDER_NAME>

{{< /code-block >}}
{{% /collapse-content %}} 

{{% collapse-content title="Verifique los valores de DD_SITE y DD_API_KEY" level="h5" expanded=false id="troubleshooting-logs-check-site-and-api-key-eh" %}}
Si le faltan todos los registros, asegúrese de que:
   - El [sitio de Datadog seleccionado][33] sea correcto
   - La [clave de API][9] configurada pertenezca a la organización de Datadog correcta

**Nota**: si el sitio y la clave de API de Datadog se han configurado en los ajustes de la aplicación de función, su aplicación podría reiniciarse si se modifican. 
{{% /collapse-content %}} 

{{% collapse-content title="Identifique posibles cuellos de botella en Event Hub" level="h5" expanded=false id="troubleshooting-logs-check-event-hub-bottlenecks" %}}
Un aumento en los mensajes entrantes con una caída en los salientes sugiere un cuello de botella. Utilice estas métricas para investigar:

Verifique los mensajes entrantes:
: `azure.eventhub_namespaces.incoming_messages`

Verifique los datos entrantes:
: `azure.eventhub_namespaces.incoming_bytes`

Verifique los mensajes salientes:
: `azure.eventhub_namespaces.outgoing_messages`

Verifique los datos salientes:
: `azure.eventhub_namespaces.outgoing_bytes`

Verifique las solicitudes limitadas de Microsoft.EventHub:
: `azure.eventhub_namespaces.throttled_requests`

Verifique los errores de servidor de Microsoft.EventHub:
: `azure.eventhub_namespaces.server_errors`

**Nota**: Aumentar los retrasos de registro puede causar pérdida de datos, ya que los [registros de más de 18 horas][4] se descartan. 

Para solucionar el cuello de botella, puede:

   - [Aumentar la escala de sus particiones de Event Hub][26] para manejar un mayor rendimiento (máximo 32). Debido a que el escalado en el lugar solo está disponible para los niveles Premium o Dedicado, debe crear un nuevo Event Hub con el número de particiones deseado y luego reconfigurar sus ajustes de diagnóstico y el activador del reenviador. Consulte al [soporte de Azure][30] para obtener asesoramiento sobre el escalado. 
   - Divida el reenviador de registros en múltiples canalizaciones en Datadog, donde cada una procese un subconjunto específico de recursos basado en reglas como la prioridad. Esto aumenta la cantidad de registros que se pueden manejar simultáneamente.
{{% /collapse-content %}} 

{{% collapse-content title="Inspeccione las métricas de la función" level="h5" expanded=false id="inspect-function-metrics-eh" %}}
Asegúrese de que la aplicación de funciones se esté ejecutando observando las siguientes métricas de función:

Verifique el recuento de ejecuciones de la función:
: `azure.functions.function_execution_count`

Verifique que la función esté recibiendo datos:
: `azure.functions.bytes_received`

Verifique que la función esté recibiendo datos:
: `azure.functions.bytes_sent`

Verifique que las solicitudes de la función devuelvan códigos de estado exitosos:
: `azure.functions.http2xx`

Verifique que las solicitudes de la función no devuelvan códigos de estado de error:
: `azure.functions.http4xx`
: `azure.functions.http5xx`

**Notas**: 
   - El reenviador de registros utiliza el [modelo de programación de Azure Functions V4][35], que se basa en paquetes y deshabilita la edición directa de código en el portal de Azure. Para actualizar o personalizar una función que se configuró manualmente anteriormente, comuníquese con el [soporte de Datadog][36] para obtener instrucciones.
   - Para una recopilación de registros más confiable, eficiente y rentable, realice la transición al [Automated Log Forwarder][37]. Automatiza completamente el proceso de reenvío de registros desde todos sus recursos de Azure a Datadog.
{{% /collapse-content %}} 

## Seguimiento de múltiples registros de aplicaciones {#monitoring-multiple-app-registrations}

Las suscripciones monitoreadas por múltiples registros de aplicaciones pueden introducir configuraciones de acceso superpuestas. Esta configuración no se recomienda y puede resultar en problemas de integración o conflictos del sistema, y también puede aumentar sus costos de Azure Monitor.

## Máquinas virtuales de Azure apagadas en la lista de infraestructura {#powered-down-azure-vms-on-the-infrastructure-list}

Cuando apaga sus máquinas virtuales en Azure, la integración de Datadog Azure sigue recopilando la métrica `azure.vm.status` para esa VM. Esta métrica está etiquetada con `status:running`, `status:not_running` o `status:unknown`.

Esto es intencional, pero hace que la VM permanezca en su lista de infraestructura. Si su VM informa solo esta métrica, no cuenta para su recuento de servidores facturables. Para obtener más información sobre facturación, consulte la [página de facturación][21] de Datadog.

Si destruye su VM de Azure, esta desaparecerá de su lista de infraestructura en un plazo de 3 horas.

## Las máquinas virtuales de Azure aparecen en la aplicación sin métricas {#azure-vms-appear-in-the-app-without-metrics}

Después de instalar correctamente la integración de Azure en Datadog, las métricas de sus máquinas virtuales de Azure y otros servicios deberían comenzar a fluir en unos 15 minutos.

Si después de este tiempo ve máquinas virtuales de Azure en su lista de infraestructura, pero no se reportan métricas, pueden estar ocurriendo algunas cosas.

1. Asegúrese de estar buscando las métricas correctas.
    **Las métricas de máquinas virtuales clásicas,** comienzan con el espacio de nombres azure.vm y las métricas de máquinas virtuales implementadas con ARM comienzan con el espacio de nombres `azure.compute_virtualmachines`.

2. Si ninguno de estos espacios de nombres devuelve métricas, asegúrese de que **Diagnósticos** esté activado para las máquinas virtuales dentro del portal de Azure. Solo se requieren diagnósticos de arranque y métricas básicas.
    * Para máquinas virtuales **clásicas**:
    {{< img src="integrations/guide/azure_vms_appearing_in_the_app_without_metrics/classic_vm.png" alt="El portal de Azure mostrando la vista de diagnóstico de una máquina virtual clásica con el estado configurado en activado" >}}

    * For ARM deployed VMs:
    {{< img src="integrations/guide/azure_vms_appearing_in_the_app_without_metrics/arm_deployed_vm.png" alt="El portal de Azure mostrando la vista de configuración de diagnóstico de una máquina virtual con el estado configurado en activado" >}}

3. Asegúrese de que la máquina virtual esté en ejecución.
    La integración no recopila métricas de rendimiento para máquinas detenidas o desasignadas. Utilice la métrica `azure.vm.count` y los valores de etiqueta `status` de `running`, `stopped` y `stopped_deallocated` para determinar el estado de sus servidores. Asegúrese de que el servidor en cuestión tenga `status:running` y se esté ejecutando en el portal de Azure.
    {{< img src="integrations/guide/azure_vms_appearing_in_the_app_without_metrics/azure_vm_running_2025-05-02.png" alt="Un gráfico de la métrica azure.vm.count desde status:running" >}}

## Problemas con las métricas de `azure.*.count` {#issues-with-azurecount-metrics}

Si su integración de Azure está reportando métricas pero no `azure.*.count`, o `azure.*.count` está devolviendo `status:query_failed`, su suscripción de Azure necesita registrar el proveedor de Azure Resource Health.

Usando la interfaz de línea de comandos de Azure:

```bash
azure login # Login to the Azure user associated with your Datadog account
azure config mode arm
azure provider register Microsoft.ResourceHealth
```

La métrica `azure.*.count` debería aparecer en Datadog en un plazo de 5 a 10 minutos.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/getting_started/integrations/azure/
[2]: https://www.datadoghq.com/blog/datadog-generated-metrics-azure/
[3]: https://learn.microsoft.com/azure/databricks/dev-tools/api/latest/aad/
[4]: /es/logs/troubleshooting/#missing-logs---timestamp-outside-of-the-ingestion-window
[5]: /es/logs/guide/azure-event-hub-log-forwarding
[6]: https://www.datadoghq.com/blog/introducing-azure-monitoring-with-one-click-datadog-deployment
[7]: /es/integrations/guide/azure-native-integration/#agent-extensions
[8]: https://learn.microsoft.com/azure/azure-monitor/platform/diagnostic-settings?tabs=portal
[9]: /es/account_management/api-app-keys/#api-keys
[10]: /es/getting_started/integrations/azure/#install-the-agent-for-greater-visibility-into-your-application
[11]: /es/integrations/azure_arc/
[12]: https://learn.microsoft.com/cli/azure/connectedmachine/extension
[13]: /es/logs/guide/azure-event-hub-log-forwarding/
[14]: https://learn.microsoft.com/entra/identity/monitoring-health/howto-configure-diagnostic-settings
[15]: /es/metrics/#time-aggregation
[16]: https://learn.microsoft.com/rest/api/monitor/metric-definitions/list?view=rest-monitor-2023-10-01
[17]: https://learn.microsoft.com/azure/azure-monitor/metrics/metrics-aggregation-explained#aggregation-types
[18]: https://portal.azure.com/#view/Microsoft_Azure_Monitoring/AzureMonitoringBrowseBlade/~/metrics
[19]: https://github.com/DataDog/datadog-serverless-functions/blob/master/azure/blobs_logs_monitoring/index.js
[20]: /es/logs/log_configuration/indexes/#set-daily-quota
[21]: /es/account_management/billing/
[22]: /es/metrics/guide/interpolation-the-fill-modifier-explained/
[23]: /es/integrations/azure/
[24]: https://portal.azure.com
[25]: https://learn.microsoft.com/troubleshoot/azure/partner-solutions/log-limitations#check-diagnostic-settings-limit
[26]: https://learn.microsoft.com/azure/event-hubs/event-hubs-scalability
[27]: https://learn.microsoft.com/azure/azure-monitor/reference/metrics-index
[28]: /es/metrics/#space-aggregation
[29]: /es/logs/guide/azure-automated-log-forwarding/
[30]: https://azure.microsoft.com/support
[31]: https://app.datadoghq.com/metric/explorer
[32]: https://learn.microsoft.com/azure/azure-monitor/reference/tables/containerappconsolelogs
[33]: /es/getting_started/site/#access-the-datadog-site
[34]: /es/logs/explorer/search_syntax/
[35]: https://techcommunity.microsoft.com/blog/appsonazureblog/azure-functions-node-js-v4-programming-model-is-generally-available/3929217
[36]: /es/help/
[37]: https://www.datadoghq.com/blog/azure-log-forwarding/
[38]: /es/logs/log_configuration/indexes/#exclusion-filters