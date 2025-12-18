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
description: 'Configuración y arquitectura avanzadas de la integración de Azure en
  Datadog '
further_reading:
- link: /integrations/azure/
  tag: Documentación
  text: Integración Azure
title: Configuración avanzada de Azure
---

## Información general

Esta guía proporciona opciones de configuración avanzadas y arquitecturas de referencia para los usuarios que configuran la integración de Azure en Datadog, así como opciones de configuración alternativas para casos de uso específicos.

### Arquitecturas de referencia

Los diagramas de esta guía proporcionan una representación visual del proceso de configuración y el resultado cuando se siguen los pasos de [Empezando con Azure][1]. Esta guía proporciona una descripción detallada de la interacción de Datadog con tu entorno Azure y responde a preguntas comunes sobre seguridad, cumplimiento y gobernanza.

### Configuraciones alternativas

Los procesos de configuración documentados en [Empezando con Azure][1] son los pasos recomendados y facilitan la configuración ideal para la mayoría de los usuarios. Las opciones de configuración alternativas en este documento pueden ser preferibles para ciertos casos de uso. Cualquier compensación en el rendimiento, las funciones o la facilidad de gestión se describen según sea necesario.

## Recopilación de métricas y datos

Al habilitar la integración de Azure de Datadog, Datadog puede:

  - Descubrir y monitorizar todos los recursos en todas las suscripciones dentro del contexto determinado
  - Actualizar de manera automática las definiciones de métrica detectadas para garantizar que se recopilen todas las métricas disponibles en Azure Monitor
  - Ingerir una serie de metadatos generales y específicos de recursos (incluidas etiquetas [tags] de Azure personalizadas) y aplicarlos a las métricas de recursos asociadas en Datadog como etiquetas
  - Consultar las APIs de metadatos de Azure y usar las respuestas para [generar métricas útiles en Datadog][2] a fin de obtener información que no admite Azure Monitor

Las APIs de Azure que se usan y los datos recopilados son idénticos independientemente de si usas la versión estándar o la nativa de Azure de la integración.

El siguiente diagrama describe el proceso y la arquitectura resultante de la configuración de la integración de Azure descrita en [Empezando con Azure][1].

{{< img src="integrations/guide/azure_architecture_and_configuration/app_registration_integration_setup.png" alt="Diagrama de flujo que muestra la configuración de la integración de Azure App Registration. Crea el registro de la aplicación con el principal de servicio y los secretos de cliente en Azure, asigna roles de lectura de monitorización a recursos de suscripción o gestión, luego configura la integración con filtros de etiquetas de métricas en el backend de Datadog." >}}

Una vez finalizado este proceso, la recopilación de datos comienza automáticamente. El registro de la aplicación permite a Datadog [solicitar un token de Azure Active Directory][3] (AD). Datadog utiliza este token como autorización para las llamadas a varias API de Azure, para detectar recursos dentro del ámbito proporcionado y recopilar datos. Este proceso continuo se ejecuta con intervalos de dos minutos por defecto y se utiliza para detectar y recopilar datos de tu entorno Azure. El proceso de recopilación de datos se muestra a continuación.

{{< img src="integrations/guide/azure_architecture_and_configuration/app_registration_metric_collection.png" alt="Diagrama de flujo que muestra el proceso de recopilación de métricas de Azure. El backend de Datadog lee la configuración, se autentica con Azure Active Directory a través del principal de servicio, recopila metadatos de suscripciones y recursos utilizando permisos de configuración del control de acceso basado en roles (RBAC), filtra recursos por etiquetas y luego recupera métricas de Azure Monitor para su ingesta en Datadog." >}}

## Recopilación de logs

El siguiente diagrama proporciona una arquitectura de referencia para el reenvío de logs desde Azure a Datadog, tal y como se describe en la [guía para el reenvío de logs del centro de datos][5].

{{< img src="integrations/guide/azure_architecture_and_configuration/manual_log_forwarding.png" alt="Diagrama de arquitectura que muestra la configuración manual del reenvío de logs de Azure en dos regiones en las que los recursos Azure utilizan parámetros de diagnóstico para enviar logs a través de centros de eventos y funciones de reenvío de logs hacia la ingesta de logs de Datadog." >}}

### Opciones de configuración alternativas para el reenvío de logs

La arquitectura predeterminada anterior es adecuada para la mayoría de los usuarios. Según la escala y la composición de tu entorno de Azure, así como los métodos que use tu organización para implementar esta arquitectura, en las siguientes secciones se detallan consideraciones adicionales que pueden ser relevantes.

#### Uso de las plantillas proporcionadas

El botón **Deploy to Azure** (Desplegar a Azure) en la [guía principal de generación de logs del centro de eventos][13] proporciona una plantilla para crear un par de funciones de centro de eventos y reenvío de logs. Además de utilizar esta plantilla para desplegar directamente, puedes utilizar las plantillas ARM subyacentes como punto de partida para tus propios despliegues de infraestructura como código.

Estas plantillas no añaden configuraciones de diagnóstico, excepto una configuración de diagnóstico opcional para los logs de actividad. En el caso de los logs de recursos, Datadog recomienda usar plantillas de ARM o Terraform para añadir configuraciones de diagnóstico a tus recursos de manera programática. Estas configuraciones de diagnóstico se deben añadir a cada recurso que necesite enviar logs de recursos a Datadog.

#### Consideraciones sobre la región

Las configuraciones de diagnóstico solo pueden enviar logs de recursos a los centros de eventos de la misma región que el recurso. Añade un par de funciones de reenvío y centro de eventos en cada región que contenga recursos para los que quieras enviar logs de recursos a Datadog.

Sin embargo, las configuraciones de diagnóstico no se limitan a enviar logs a los centros de eventos en la misma suscripción que el recurso. Si tienes varias suscripciones en tu inquilino de Azure, este puede compartir una única función de reenvío y centro de eventos de la misma región.

#### Consideraciones sobre logs de gran volumen

A medida que aumenta el volumen de logs, es posible que se produzcan cuellos de botella, que suelen surgir en los centros de eventos. Si planeas enviar grandes volúmenes de logs, puedes considerar añadir particiones adicionales o usar un nivel premium o dedicado.
Para volúmenes de logs especialmente altos, puedes considerar añadir pares de funciones de reenvío y centro de datos adicionales de la misma región y dividir el tráfico entre ellos.

{{% collapse-content title="Comandos para instalar la extensión Azure Datadog" level="h4" expanded=false id="azure-datadog-extension-commands" %}}
## Instalar en Azure

Datadog proporciona una extensión Azure para ayudar a desplegar el Agent en instancias Azure:

* [Introducción a la monitorización de Azure con un despliegue en Datadog con un solo clic][6]
* [Integración de Azure][10] _Todos los sitios_.
* [Integración nativa en Azure][7] _Solo US3_.

Una alternativa a la instalación con GUI es la línea de comandos.

Para ejecutar el Datadog Agent en tus instancias Azure como una extensión, utiliza el comando que corresponde a tu entorno. Sustituye `<SITE_PARAMETER>` por el valor del **parámetro de sitio** de tu cuenta Datadog en la [página de sitios Datadog][33], y `<DATADOG_API_KEY>` por tu [clave de API Datadog][9].
   **Nota**: Se requiere Python 3.9 o posterior para instalar el Agent versión 7 o posterior.

{{< tabs >}}
{{% tab "Windows" %}}

{{< code-block lang="powershell" >}}
Set-AzVMExtension -Name "DatadogAgent" -Publisher "Datadog.Agent" -Type "DatadogWindowsAgent" -TypeHandlerVersion "7.0" -Settings @{"site" = "<SITE_PARAMETER>"; "agentVersion" = "latest"} -ProtectedSettings @{"api_key" = "<DATADOG_API_KEY>"} -DisableAutoUpgradeMinorVersion
{{< /code-block >}}

Encontrarás más información sobre la sintaxis para configurar extensiones de instancias Azure en la [documentación Set-AzVMExtension de la extensión Azure][100].

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

Este ejemplo muestra cómo especificar una configuración para que la utilice el Datadog Agent .
El URI de configuración del Datadog Agent debe ser un URI de Azure Blob Storage.
La extensión de Azure Datadog Windows Agent comprueba que el URI `agentConfiguration` procede del dominio `.blob.core.windows.net`.
La configuración del Datataog Agent debe crearse desde la carpeta `%PROGRAMDATA%\Datadog`.

{{< code-block lang="powershell" >}}
Set-AzVMExtension -Name "DatadogAgent" -Publisher "Datadog.Agent" -Type "DatadogWindowsAgent" -TypeHandlerVersion "7.0" -Settings @{"site" = "<SITE_PARAMETER>"; "agentConfiguration" = "https://<CONFIGURATION_BLOB>.blob.core.windows.net/<FILE_PATH>.zip"; "agentConfigurationChecksum" = "<SHA256_CHECKSUM>"} -DisableAutoUpgradeMinorVersion
{{< /code-block >}}

**Nota**: Una vez instalado el Datadog Agent, la configuración solo puede modificarse al actualizar a una versión más reciente.

### Configurar una versión específica del Agent

Este ejemplo muestra cómo especificar una versión del Agent para instalar. Por defecto, la extensión de Azure Datadog Windows Agent instala la última versión del Datadog Agent.

**Nota**: Las versiones anteriores *no* son compatibles, por lo que no es posible instalar una versión del Datadog Agent *anterior* a la instalada actualmente en la máquina de destino. Para instalar una versión menos reciente del Datadog Agent, desinstala primero la versión anterior eliminando la extensión de Azure Datadog Windows Agent en el equipo de destino. La eliminación de la extensión de Azure Datadog Windows Agent no elimina la configuración del Datadog Agent.

{{< code-block lang="powershell" >}}
Set-AzVMExtension -Name "DatadogAgent" -Publisher "Datadog.Agent" -Type "DatadogWindowsAgent" -TypeHandlerVersion "7.0" -Settings @{"site" = "<SITE_PARAMETER>"; "agentVersion" = "latest"} -ProtectedSettings @{"api_key" = "<DATADOG_API_KEY>"} -DisableAutoUpgradeMinorVersion
{{< /code-block >}}

[100]: https://learn.microsoft.com/powershell/module/az.compute/set-azvmextension
{{% /tab %}}
{{% tab "Linux" %}}

{{< code-block lang="bash" >}}
az vm extension set --publisher "Datadog.Agent" --name "DatadogLinuxAgent" --version 7.0 --settings '{"site":"datadoghq.com", "agentVersion":"latest"}' --protected-settings '{"api_key":"<DATADOG_API_KEY>"}' --no-auto-upgrade-minor-version
{{< /code-block >}}

Encontrarás más información sobre la sintaxis para configurar las extensiones de instancias Azure en la [referencia de la CLI de la extensión Azure][200].

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
- El URI de configuración del Datadog Agent debe ser un URI de Azure Bob Storage.
- La extensión Azure del Datadog Agent para Linux comprueba que el URI `agentConfiguration` proviene del dominio `.blob.core.windows.net`.
- La configuración del Datataog Agent debe crearse a partir de la carpeta `/etc/datadog-agent/`.

{{< code-block lang="bash" >}}
az vm extension set --publisher "Datadog.Agent" --name "DatadogLinuxAgent" --version 7.0 --settings '{"site":"datadoghq.com", "agentVersion":"latest", "agentConfiguration":"https://<CONFIGURATION_BLOB>.blob.core.windows.net/<FILE_PATH>.zip", "agentConfigurationChecksum":"<SHA256_CHECKSUM>"}' --protected-settings '{"api_key":"<DATADOG_API_KEY>"}' --no-auto-upgrade-minor-version
{{< /code-block >}}

[200]: https://learn.microsoft.com/cli/azure/vm/extension
{{% /tab %}}
{{< /tabs >}}

## Instalar en Azure Arc

Para ejecutar el Datadog Agent en tus instancias [Azure Arc][11] como una extensión, utiliza el comando que corresponde a tu entorno.

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

Encontrarás más información sobre la sintaxis para configurar las extensiones de Azure `connectedmachine` en la página de la [extensión az connectedmachine][12].
{{% /collapse-content %}} 

{{% collapse-content title="Métricas de recuento de Azure" level="h4" expanded=false id="azure-count-metrics" %}}
Datadog genera una métrica adicional para cada recurso monitorizado con la [integración Azure][23]: `azure.*.count`. Por ejemplo, las máquinas virtuales de Azure monitorizadas por Datadog informan de `azure.vm.count`.

La métrica `azure.*.count` es una mejora con respecto a `azure.*.status`, que está obsoleta.

## Métrica de recuento

La métrica `azure.*.count` proporciona dos datos fundamentales:

- La cantidad de recursos de ese tipo.
- El estado de cada recurso según Azure.

La métrica `azure.*.count` se crea en el mismo espacio de nombres que las demás métricas para ese tipo de recurso, por ejemplo: `azure.network_loadbalancers.count`. Incluye las mismas etiquetas de metadatos que las demás métricas en ese espacio de nombres, además de una etiqueta adicional para `status`.

### Casos prácticos

Usa la métrica `azure.*.count` para:

- Crear una vista de la cantidad de máquinas virtuales desglosadas por su estado a lo largo del tiempo al graficar `azure.vm.count` sobre todo y sumar por `status`.
- Crear widgets de consulta en los dashboards para mostrar la cantidad de un tipo de recurso determinado. Usa las etiquetas disponibles para delimitar el recuento a una agregación relevante, como región, grupo de recursos, tipo o estado.
- Crear monitores para recibir alertas sobre el estado de diferentes recursos de Azure.

**Nota**: En algunos casos, la configuración de visualización predeterminada puede hacer que parezca que los recursos se cuentan dos veces de forma intermitente en gráficos o widgets de consulta. Esto no afecta a los monitores ni a los widgets asignados a un estado específico.
Puedes reducir este efecto desactivando la [interpolación][22] en los gráficos o widgets de consulta, definiendo Interpolación > ninguna, o utilizando `.fill(null)`.

Para la mayoría de los tipos de recursos, los posibles estados son:

- Running (En ejecución)
- Unavailable (No disponible)
- Unknown (Desconocido)
- Degraded (Degradado)
- Failed (Fallido)

Las máquinas virtuales tienen estados más detallados, incluido:

- Running (En ejecución)
- Stopped_deallocated
- Stopped (Detenido)
- Unknown (Desconocido)
- Unavailable (No disponible)
- Degraded (Degradado)
- Failed (Fallido)

Si ves un estado de `query_failed` necesitas habilitar el proveedor de Resource Health en Azure.
{{% /collapse-content %}} 

## Solucionar problemas de la integración Azure

{{% collapse-content title="Busca rel nombre de tu inquilino" level="h4" expanded=false id="troubleshooting-find-your-tenant-name" %}}
1. Ve a [portal.azure.com][24].
2. En la barra lateral izquierda, selecciona **Azure Active Directory**.
3. En **Basic information**, encuentra el valor **Name**.
{{% /collapse-content %}} 

{{% collapse-content title="No se puede iniciar sesión" level="h4" expanded=false id="troubleshooting-unable-to-login" %}}
Si experimentas un error al iniciar sesión mientras intentas instalar la integración Azure, ponte en contacto con el [servicio de asistencia de Datadog][36]. Cuando sea posible, adjunta una captura de pantalla.
{{% /collapse-content %}} 


{{% collapse-content title="Métricas faltantes" level="h4" expanded=false id="troubleshooting-missing-metrics" %}}
Asegúrate de haber finalizado el proceso de instalación, que incluye dar permisos de lectura a la aplicación Azure para las suscripciones que quieres monitorizar.

En el caso de las máquinas virtuales desplegadas con ARM, también debes activar los diagnósticos y seleccionar las métricas de la VM que deseas recopilar. Consulta **Habilitar diagnósticos** para obtener instrucciones.

Para otras métricas faltantes, ponte en contacto con el [servicio de asistencia de Datadog][36] con la siguiente información sobre la métrica:
- dimensiones
- grupo de recursos
- nombre del recurso
- ID o nombre de la suscripción 

Adjunta una captura de pantalla de un gráfico de Azure Monitor que muestre un gráfico de la métrica. **Importante**: Grafica puntos de datos de 1 minuto en la captura de pantalla.

#### Habilitar diagnósticos

Al activar los diagnósticos, las máquinas virtuales desplegadas en ARM pueden recopilar información de logs que incluye métricas de CPU, red, etc. Sigue estas instrucciones:

1. Ve al [portal Azure][24] y busca tu máquina virtual.
2. Haz clic en **Diagnostics settings** (Parámetros de diagnóstico) en la sección **Monitoring** (Monitorización).
3. Selecciona una cuenta de almacenamiento y haz clic en **Enable guest-level monitoring** (Habilitar monitorización a nivel de invitado).
4. De forma predeterminada, las métricas y los logs básicos están habilitados. Ajústalos según tus preferencias.
5. Haz clic en **Save** para guardar los cambios.

    {{< img src="integrations/guide/azure_troubleshooting/azure_enable_diagnostics.png" alt="Información general de la configuración de los diagnósticos de Azure que aparece con No storage account highlighted en Pick a storage account and enable guest level monitoring habilitado" style="width:70%">}}
{{% /collapse-content %}} 

{{% collapse-content title="Discrepancia entre tus datos en Azure y en Datadog" level="h4" expanded=false id="troubleshooting-metric-discrepancy" %}}
La integración Azure de Datadog recopila todas las métricas de [Azure Monitor][27]. Las métricas se recopilan con todas las dimensiones disponibles (que se asignan a etiquetas en Datadog), la mayor especificidad temporal y el tipo de agregación principal.

Las secciones siguientes describen dos distinciones importantes que hay que tener en cuenta, así como los pasos para [conciliar la discrepancia](#reconcile-the-discrepancy).

#### 1. Agregación temporal

Datadog muestra los datos sin procesar de Azure en valores por segundo, independientemente del intervalo de tiempo seleccionado en Azure. Esto puede hacer que el valor de Datadog parezca inferior al valor que muestra Azure. Consulta [Agregación temporal][15] en la documentación de la métrica para obtener más información.

#### 2. Agregación espacial

La [agregación espacial][28] en Datadog corresponde al [tipo de agregación primaria][17] de la métrica en Azure Monitor. Puedes encontrar el tipo de agregación primaria en la API de la [lista de definiciones de métricas][16] de Azure, en el campo `primaryAggregationType`.

#### Conciliar la discrepancia

1. Grafica la métrica en [Azure Monitor Metrics Explorer][18] o yendo al recurso en Azure y haciendo clic en **Monitoring** (Monitorización) y luego en **Metrics** (Métricas) en el panel izquierdo.
2. Grafica la métrica en [Datadog Metrics Explorer][31].
3. Confirma que la consulta en Azure tiene el mismo contexto que la consulta en Datadog:
   - Las dimensiones utilizadas en la consulta de métricas de Azure deben coincidir con las etiquetas utilizadas en la consulta de métricas de Datadog.
   - El tipo de agregación primaria utilizado en la consulta debe coincidir con el [agregador espacial][28] de Datadog.
   - El intervalo de tiempo debe coincidir con el del Datadog Metrics Explorer
4. Pasa el cursor por encima de un punto de datos en el gráfico para ver la marca de tiempo y el valor.

{{< img src="integrations/guide/azure_advanced_configuration/azure_metric_explorer.png" alt="El Azure Metrics Explorer con el cursor sobre un punto del gráfico, y el valor de la métrica y la marca de tiempo resaltados" >}}

5. Busca el mismo punto en el tiempo en el gráfico de Datadog y compara los valores. Si los valores son iguales, la discrepancia original se debe a diferencias en la agregación temporal o espacial entre los dos gráficos.
{{% /collapse-content %}} 

### Solucionar problemas de recopilación de logs

Para solucionar los problemas con el reenvío de logs, comienza por la [sección de solución general de problemas](#general-troubleshooting-applicable-to-all-setup-methods). Si estos pasos no resuelven tu problema, consulta la siguiente guía específica de configuración. 

- [Automatizado](#automated-log-forwarding-troubleshooting)
- [Almacenamiento blob](#blob-storage-log-forwarding-troubleshooting)
- [Integración nativa](#azure-native-integration-log-forwarding-troubleshooting)
- [Centro de eventos](#event-hub-log-forwarding-troubleshooting)

#### Solución general de problemas aplicable a todos los métodos de configuración

Superación de la cuota diaria de logs:
: Asegúrate de que no has superado tu [cuota diaria][20] de retención de logs.

Exclusión de logs con filtros de exclusión:
: Asegúrate de que tus logs no son excluidos por [filtros de exclusión][38].

Sintaxis incorrecta utilizada para buscar logs:
: Asegúrate de que has utilizado la [sintaxis de búsqueda][34] correcta y de que tu búsqueda contiene los atributos o etiquetas correctos.

Parámetro de diagnóstico ausente:
: Asegúrate de que se ha añadido un [parámetro de diagnóstico][8] a los recursos, logs de actividad y logs de Entra ID que quieres enviar a Datadog.

**Nota**: Puede buscar logs de Entra ID con la consulta `source:azure.activedirectory`.

#### Solución automatizada de problemas de reenvío de logs

{{% collapse-content title="Buscar conflictos de nombres" level="h4" expanded=false id="troubleshooting-logs-naming-conflicts" %}}
Si tienes recursos Azure con el mismo nombre de recurso que uno de los parámetros predeterminados, puedes generar conflictos de nomenclatura. Azure no permite que los recursos compartan nombres de recursos dentro de una suscripción individual. Datadog recomienda renombrar el parámetro por defecto con un nombre único que ya no exista en tu entorno.

**Nota**: Si vas a volver a ejecutar la plantilla debido a este fallo, Datadog recomienda eliminar también todo el grupo de recursos para crear un despliegue nuevo. 
{{% /collapse-content %}} 

{{% collapse-content title="Asegurarse de que el proveedor de recursos está registrado" level="h4" expanded=false id="troubleshooting-logs-unregistered-resource-provider" %}}
Si el despliegue de tu plantilla falla debido al error `The subscription is not registered to use namespace 'Microsoft.EventHub'`:

Azure tiene proveedores de recursos para cada uno de sus servicios, como `Microsoft.EventHub` para Centros de eventos Azure. Si tu suscripción de Azure no está registrada en un proveedor de recursos obligatorio, el script falla. 

Para solucionarlo, regístrate en el proveedor de recursos adecuado. Ejecuta el siguiente comando de ejemplo en CloudShell, sustituyendo <RESOURCE_PROVIDER_NAME> por el nombre del proveedor de recursos (por ejemplo, `Microsoft.EventHub`).

{{< code-block lang="shell" >}}

az provider register --namespace <RESOURCE_PROVIDER_NAME>

{{< /code-block >}}
{{% /collapse-content %}} 

{{% collapse-content title="Check DD_SITE and DD_API_KEY values" level="h4" expanded=false id="troubleshooting-logs-check-site-and-api-key-alf" %}}
Si faltan todos los logs, verifica tu [sitio Datadog][33] y tu clave de API:

1. En el grupo de recursos donde se desplegaron los recursos de reenvío automatizado de logs, ve a **Settings > Deployments** (Configuración > Despliegues).
2. Selecciona el despliegue más reciente.
3. Haz clic en **Redeploy** (Volver a desplegar) para comprobar y modificar los valores.
{{% /collapse-content %}} 

{{% collapse-content title="Verificar que los logs están presentes en el contenedor de la cuenta de almacenamiento" level="h4" expanded=false id="troubleshooting-logs-verify-logs-in-storage-account" %}}
Para los logs de recursos Azure faltantes, busca la cuenta de almacenamiento desplegada por ARM en la región del recurso y comprueba que los logs esperados están en el contenedor.
{{% /collapse-content %}} 

{{% collapse-content title="Inspeccionar los logs de la consola de Container App de los trabajos del reenviador" level="h4" expanded=false id="troubleshooting-logs-inspect-forwarder-job-logs" %}}
[Los logs de la consola de Container App][32] te ayudan a diagnosticar errores y excepciones de la aplicación. Para inspeccionar los logs, habilite la generación de logs en el entorno de Container App en la misma región de tus recursos a los que les faltan logs.
{{% /collapse-content %}} 

**Nota**: Cuando utilices el reenviador de logs automatizado para enviar logs, deberáa configurar manualmente los parámetros de diagnóstico de Microsoft Entra. Consulta [Configurar parámetros de diagnóstico de Microsoft Entra para logs de actividad][14] para obtener más información.

#### Solucionar problemas de reenvío de logs de Bob Storage

{{% collapse-content title="Check DD_SITE and DD_API_KEY values" level="h4" expanded=false id="troubleshooting-logs-check-site-and-api-key-bs" %}}
Si te faltan todos los logs, asegúrate de que:
   - El [sitio Datadog seleccionado][33] es correcto
   - La [clave de API][9] configurada pertenece a la organización Datadog correcta
{{% /collapse-content %}} 

{{% collapse-content title="Verificar la configuración del reenviador" level="h4" expanded=false id="troubleshooting-logs-verify-forwarder-config" %}}
Asegúrate de que el reenviador está utilizando la última versión, ejecutando Node.js 22 LTS o posterior en Windows OS. El código está disponible públicamente en [index.js][19]
{{% /collapse-content %}} 

{{% collapse-content title="Inspeccionar el activador blob" level="h4" expanded=false id="troubleshooting-logs-inspect-blob-trigger" %}}
Comprueba que el activador de Bob Storage está configurado con las siguientes opciones:

- **Tipo de vinculación**: `Azure Blob Storage`
- **Nombre del parámetro blob**: `blobContent`
- **Ruta**: La ruta a tus datos de logs dentro de la cuenta de almacenamiento.
- **Conexión de la cuenta de almacenamiento**: El nombre de la configuración de la aplicación que contiene la cadena de conexión de la cuenta de almacenamiento
{{% /collapse-content %}} 

{{% collapse-content title="Inspeccionar métricas de Bob Storage" level="h4" expanded=false id="troubleshooting-logs-inspect-blob-metrics" %}}
Asegúrate de que el Bob Storage está recibiendo datos:
: `azure.storage_storageaccounts_blobservices.ingress`

Asegúrate de que el Bob Storage está enviando datos:
: `azure.storage_storageaccounts_blobservices.egress`.

Asegúrate de que las solicitudes al Bob Storage se realizan correctamente:
: `azure.storage_storageaccounts_blobservices.transactions`.

Para la métrica `azure.storage_storageaccounts_blobservices.transactions`, puedes utilizar las siguientes consultas de métricas para ver el número de operaciones `PUT` exitosas o fallidas, respectivamente:

   - `azure.storage_storageaccounts_blobservices.transactions{responsetype:success , apiname:put*} by {apiname}`
   - `azure.storage_storageaccounts_blobservices.transactions{!responsetype:success , apiname:put*} by {responsetype}`
{{% /collapse-content %}} 

{{% collapse-content title="Inspeccionar métricas de función" level="h4" expanded=false id="troubleshooting-logs-inspect-function-metrics-bs" %}}
Comprueba si la aplicación de función tiene problemas de ejecución, recepción o transmisión de datos, o códigos de estado de error, inspeccionando las siguientes métricas:

Asegúrate de que la función está recibiendo datos:
: `azure.functions.bytes_received`

Asegúrate de que la función está enviando datos:
: `azure.functions.bytes_sent`

Asegúrate de que las solicitudes de función reciben códigos de estado correctos:
: `azure.functions.http2xx`

Asegúrate de que las solicitudes de función no reciben códigos de estado de error:
: `azure.functions.http4xx`
: `azure.functions.http5xx`
{{% /collapse-content %}} 

{{% collapse-content title="Los parámetros de diagnóstico no se añaden automáticamente a los recursos o a los logs de actividad" level="h4" expanded=false id="troubleshooting-logs-diagnostic-settings-not-added" %}}

Si una configuración de diagnóstico no se ha añadido automáticamente a tus recursos o logs de actividad, comprueba si:
   - Se ha alcanzado el [número máximo de parámetros de diagnóstico][25].
   - Existe un bloqueo sobre los recursos que impide modificaciones.
{{% /collapse-content %}} 

**Nota**: Cuando se añaden nuevos logs a un archivo Blob Storage, la función se activa para enviar el contenido completo del archivo, no solo las nuevas adiciones.

#### Solucionar problemas de reenvío de logs de la integración Azure Native

{{% collapse-content title="Comprobar reglas de las etiquetas de logs de recursos" level="h4" expanded=false id="troubleshooting-logs-check-resource-logs-tag-rules" %}}
Comprueba que las reglas de etiquetado de las configuración de recursos Datadog coinciden con las etiquetas definidas en tus logs de recursos.

Si no hay problemas con las reglas de etiquetado, ponte en contacto con el [servicio de asistencia de Datadog][36] y comparte la siguiente información:
   - **ID de inquilino**: Busca el valor de ID del inquilino en Entra ID, en **Basic information** (Información básica).
   - **ID de suscripción**: El ID de suscripción de las suscripciones de las que faltan logs.
   - **ID de recurso Datadog**: Busca el ID del recurso Datadog en **Settings > Properties** (Configuración > Propiedades) en la hoja de recursos Datadog. El ID del recurso utiliza este formato: `/subscriptions/<SUBSCRIPTION_ID>/resourceGroups/myresourcegroup/providers/Microsoft.Datadog/monitors/<DATADOG_RESOURCE_NAME`
   - **ID de recurso**: El ID de recurso de cualquier recurso del que falten logs, como aplicaciones web o bases de datos.
{{% /collapse-content %}} 

**Nota**: Cuando se utiliza el recurso Datadog en Azure para enviar logs, los parámetros de diagnóstico Entra ID deben definirse manualmente.

#### Solucionar problemas de reenvío de logs de Centros de eventos

{{% collapse-content title="Comprobar si el proveedor de recursos no está registrado" level="h4" expanded=false id="troubleshooting-logs-check-resource-provider-registration" %}}

Si el despliegue de la plantilla falla debido al error `The subscription is not registered to use namespace 'Microsoft.EventHub'`:

Azure tiene proveedores de recursos para cada uno de sus servicios, como `Microsoft.EventHub` para Centros de eventos Azure. Si tu suscripción de Azure no está registrada en un proveedor de recursos obligatorio, el script falla. 

Para solucionarlo, regístrate en el proveedor de recursos adecuado. Ejecuta el siguiente comando de ejemplo en CloudShell, sustituyendo <RESOURCE_PROVIDER_NAME> por el nombre del proveedor de recursos (por ejemplo, `Microsoft.EventHub`).

{{< code-block lang="shell" >}}

az provider register --namespace <RESOURCE_PROVIDER_NAME>

{{< /code-block >}}
{{% /collapse-content %}} 

{{% collapse-content title="Check DD_SITE and DD_API_KEY values" level="h4" expanded=false id="troubleshooting-logs-check-site-and-api-key-bs" %}}
Si te faltan todos los logs, asegúrate de que:
   - El [sitio Datadog seleccionado][33] es correcto
   - La [clave de API][9] configurada pertenece a la organización Datadog correcta

**Nota**: si el sitio Datadog y la clave de API se han configurado en los parámetros de la aplicación de la función, tu aplicación puede reiniciarse si se modifican. 
{{% /collapse-content %}} 

{{% collapse-content title="Identificar posibles cuellos de botella en el Centro de eventos" level="h4" expanded=false id="troubleshooting-logs-check-event-hub-bottlenecks" %}}
Un pico en los mensajes entrantes con una caída en los salientes sugiere un cuello de botella. Utiliza estas métricas para investigar:

Comprueba si hay mensajes entrantes:
: `azure.eventhub_namespaces.incoming_messages`.

Comprueba si hay datos entrantes:
: `azure.eventhub_namespaces.incoming_bytes`.

Comprueba si hay mensajes salientes:
: `azure.eventhub_namespaces.outgoing_messages`.

Comprueba si hay datos salientes:
: `azure.eventhub_namespaces.outgoing_bytes`.

Comprueba si hay solicitudes limitadas de Microsoft.EventHub:
: `azure.eventhub_namespaces.throttled_requests`.

Compruebe si hay errores en el servidor Microsoft.EventHub:
: `azure.eventhub_namespaces.server_errors`.

**Nota**: Aumentar los retrasos de logs puede provocar la pérdida de datos, ya que los [logs de más de 18 horas][4] se descartan.

Para solucionar el cuello de botella, puedes:

   - [Escalar tus particiones de tu Centro de eventos][26] para manejar un mayor rendimiento (máximo 32). Dado que el escalado in situ solo está disponible para los niveles Premium o Dedicated, debes crear un nuevo Centro de eventos con el número de particiones deseado y, a continuación, reconfigurar tus parámetros de diagnóstico y el activador del reenviador. Consulta la [asistencia de Azure][30] para ver consejos sobre escalado. 
   - Dividir el reenviador de logs en varios pipelines en Datadog, procesando cada uno de ellos un subconjunto específico de recursos en función de reglas como la prioridad. Esto aumenta el número de logs que pueden gestionarse simultáneamente.
{{% /collapse-content %}} 

{{% collapse-content title="Inspeccionar métricas de función" level="h4" expanded=false id="inspect-function-metrics-eh" %}
Asegúrate de que la aplicación de función se está ejecutando, observando las siguientes métricas de función:

Comprueba el recuento de ejecución de funciones:
: `azure.functions.function_execution_count`.

Comprueba que la función está recibiendo datos:
: `azure.functions.bytes_received`.

Comprueba que la función está enviando datos:
: `azure.functions.bytes_sent`.

Comprueba que las solicitudes de la función devuelven códigos de estado correctos:
: `azure.functions.http2xx`.

Comprueba que las solicitudes de la función no devuelven códigos de estado de error:
: `azure.functions.http4xx`
: `azure.functions.http5xx`.

**Notas**: 
   - El reenviador de logs utiliza el [modelo de programación Azure Functions V4][35], que se basa en paquetes y deshabilita la edición directa del código en el portal de Azure. Para actualizar o personalizar una función configurada previamente de forma manual, ponte en contacto con el [servicio de asistencia de Datadog][36] para obtener instrucciones.
   - Para una recopilación más fiable, eficiente y rentable de logs, cambia al [reenviador automatizado de logs][37]. Automatiza por completo el proceso de reenvío de logs de todos tus recursos de Azure a Datadog.
{{% /collapse-content %}} 

## Monitorización de múltiples varios registros de aplicaciones

Las suscripciones monitorizadas por varios registros de aplicaciones pueden introducir configuraciones de acceso superpuestas. Esta configuración no se recomienda y puede dar lugar a problemas con las integraciones o conflictos del sistema, además de aumentar los costes de Azure Monitor.

## Máquinas virtuales de Azure desactivadas en la lista de infraestructuras

Cuando apagas tus máquinas virtuales en Azure, la integración de Datadog Azure sigue recopilando la métrica `azure.vm.status` para esa máquina virtual. Esta métrica se etiqueta con `status:running`, `status:not_running` o `status:unknown`.

Esto es intencionado, pero hace que las máquinas virtuales permanezcan en tu lista de infraestructuras. Si tu máquina virtual solo informa de esta métrica, no cuenta para tu recuento de hosts facturables. Consulta la [sección de facturación][21] de Datadog para obtener más información sobre facturación.

Si destruyes tu máquina virtual de Azure, desaparecerá de tu lista de infraestructura en un plazo de 3 horas.

## Las máquinas virtuales de Azure aparecen en la aplicación sin métricas

Después de instalar correctamente la integración de Azure en Datadog, las métricas desde tus máquinas virtuales Azure y otrOs servicios deberían empezar a fluir en unos 15 minutos.

Si después de este tiempo ves máquinas virtuales Azure en tu lista de infraestructuras pero no se informan métricas, pueden estar ocurriendo un par de cosas.

1. Asegúrate de que buscas las métricas correctas.
   Las **clásicas** métricas de máquinas virtuales comienzan con el espacio de nombres azure.vm y las métricas de máquinas virtuales desplegadas en ARM comienzan con el  espacio de nombres `azure.compute_virtualmachines`.

2. Si ninguno de estos espacios de nombres devuelve métricas, asegúrate de que **Diagnostics** (Diagnósticos) está activado para las máquinas virtuales en el portal Azure. Solo se requieren los diagnósticos de arranque y las métricas básicas.
    * Para máquinas virtuales **clásicas**:
    {{< img src="integrations/guide/azure_vms_appearing_in_the_app_without_metrics/classic_vm.png" alt="Portal Azure que muestra la vista de los diagnósticos de una máquina virtual clásica con el estado activado" >}}

    * Para máquinas virtuales desplegadas en ARM:
    {{< img src="integrations/guide/azure_vms_appearing_in_the_app_without_metrics/arm_deployed_vm.png" alt="Portal Azure que muestra la vista de configuración de los diagnósticos de una máquina virtual clásica con el estado activado" >}}

3. Asegúrate de que la máquina virtual se esté ejecutando.
    La integración no recopila métricas de rendimiento para máquinas detenidas o desasignadas. Utiliza la métrica `azure.vm.count` y los valores de etiqueta `status` de `running`, `stopped` y `stopped_deallocated` para determinar el estado de tus hosts. Asegúrate de que el host en cuestión tiene `status:running` y se está ejecutando en el portal Azure.
    {{< img src="integrations/guide/azure_vms_appearing_in_the_app_without_metrics/azure_vm_running_2025-05-02.png" alt="A graph of the azure.vm.count metric from status:running" >}}

## Problemas con las métricas `azure.*.count`

Si tu integración de Azure informa de métricas pero no `azure.*.count`, o `azure.*.count` devuelve `status:query_failed`, tu suscripción Azure necesita registrar el proveedor de Resource Health en Azure.

Uso de la interfaz de línea de comandos de Azure:
```bash
azure login # Login to the Azure user associated with your Datadog account
azure config mode arm
azure provider register Microsoft.ResourceHealth
```

La métrica `azure.*.count` debería aparecer en Datadog en 5 a 10 minutos.

## Referencias adicionales

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
[30]: https://azure.microsoft.com/support
[31]: https://app.datadoghq.com/metric/explorer
[32]: https://learn.microsoft.com/azure/azure-monitor/reference/tables/containerappconsolelogs
[33]: /es/getting_started/site/#access-the-datadog-site
[34]: /es/logs/explorer/search_syntax/
[35]: https://techcommunity.microsoft.com/blog/appsonazureblog/azure-functions-node-js-v4-programming-model-is-generally-available/3929217
[36]: /es/help/
[37]: https://www.datadoghq.com/blog/azure-log-forwarding/
[38]: /es/logs/log_configuration/indexes/#exclusion-filters