---
aliases:
- /es/logs/guide/azure-logging-guide/
- /es/logs/guide/azure-automated-logs-architecture/
further_reading:
- link: https://www.datadoghq.com/blog/monitoring-azure-platform-logs/
  tag: Blog
  text: Prácticas recomendadas para monitorear los logs de la plataforma Microsoft
    Azure
title: Configuración del Log Forwarding automatizado de Azure
---
## Descripción general {#overview}

Utilice esta guía para configurar y administrar el reenvío automatizado de logs de Azure. Puede configurar el reenvío de logs directamente en Datadog o implementarlo con una plantilla de Azure Resource Manager (ARM).

La plantilla ARM implementa cuentas de almacenamiento y trabajos de Azure Container Apps en sus suscripciones. Estos recursos recopilan y reenvían logs a Datadog, y escalan automáticamente hacia arriba o hacia abajo para ajustarse al volumen de logs. El escalado es administrado por un plano de control, que es un conjunto de trabajos de Container Apps implementados en una suscripción y región de su elección. Las cuentas de almacenamiento y los trabajos de Container Apps se implementan en cada una de las suscripciones que reenvían logs a Datadog.

**Nota**: Desde el 3 de agosto de 2026, las nuevas implementaciones ejecutan el plano de control en trabajos de Azure Container Apps de forma predeterminada. Las implementaciones creadas antes de esa fecha mantienen su plano de control de Azure Function app, y actualizar una implementación no cambia su tipo de plano de control. El reenvío de logs funciona de la misma manera con cualquiera de los planos de control. Para migrar una implementación existente a trabajos de Container Apps, utilice el [script de migración][25].

**Entornos de Azure compatibles**: El reenvío automatizado de logs solo es compatible con la nube comercial (pública) de Azure. Azure Government y Azure China no son compatibles.

## Requisitos previos {#prerequisites}

Debe tener permisos en el grupo de administración para implementar el reenvío automatizado de logs con la plantilla ARM.

## Cómo elegir entre la configuración automatizada y la manual {#how-to-choose-between-automated-and-manual-setup}

Elija el método de configuración manual si desea:
   - aplicar etiquetas personalizadas a sus recursos

Utilice el método de configuración automatizada si desea:
   - automatizar la implementación a través del portal de Azure
   - administrar su infraestructura a través de plantillas declarativas
   - controlar centralmente el acceso, las etiquetas y la facturación
   - volver a implementar sus recursos en el orden correcto y de manera consistente
   - ahorrar costos mediante el uso de una cuenta de almacenamiento en lugar de un centro de eventos

## Configuración {#setup}

### Configure Log Forwarding {#configure-log-forwarding}

Utilice el flujo **Configure Log Forwarding** para configurar nuevos reenviadores de logs o administrar los existentes directamente en Datadog. Puede utilizar este flujo para implementar el reenvío automatizado de logs desde cero o actualizar una configuración existente, como agregar o eliminar suscripciones o modificar filtros de logs.

1. En Datadog, navegue a [{{< ui >}}Integrations > Azure{{< /ui >}}][16].
1. Haga clic en {{< ui >}}Configure Log Forwarding{{< /ui >}}.
1. Elija implementar una configuración nueva o actualizar una existente.
1. Copie el comando proporcionado y péguelo en su Azure Cloud Shell.
1. Seleccione las suscripciones desde las cuales reenviar registros.
1. Opcionalmente, agregue o elimine filtros de registros.
1. Haga clic en {{< ui >}}Confirm{{< /ui >}}.

### Plantilla ARM {#arm-template}

Alternativamente, puede implementar el reenvío automatizado de logs con una [plantilla ARM pública de Azure][1]. Las secciones a continuación proporcionan instrucciones para completar cada página de la plantilla.

#### Basics {#basics}

1. En {{< ui >}}Project details{{< /ui >}}, seleccione un grupo de administración. Este campo es obligatorio. La plantilla ARM utiliza el grupo de administración para otorgar permisos a las suscripciones que seleccione para el reenvío automatizado de logs.
2. En {{< ui >}}Instance details{{< /ui >}}, seleccione valores para:
   - {{< ui >}}Region{{< /ui >}}. Aquí es donde se implementa el plano de control.
   - {{< ui >}}Subscriptions to Forward Logs{{< /ui >}}. Estas son las suscripciones que se deben configurar para el reenvío de logs.
   - {{< ui >}}Control Plane Subscription{{< /ui >}}. Esta es la suscripción en la que se implementa el plano de control.
   - {{< ui >}}Resource Group Name{{< /ui >}}. Este es el grupo de recursos que utilizará el plano de control. Datadog recomienda elegir un nombre de grupo de recursos nuevo y sin usar para simplificar la gestión de los servicios del plano de control.

{{< img src="logs/guide/azure-automated-log-forwarding/deployment_basics.png" alt="La página Basics de la plantilla ARM para el reenvío automatizado de logs de Azure" popup="true" style="width:100%">}}

3. Haga clic en {{< ui >}}Next{{< /ui >}}.

#### Datadog configuration {#datadog-configuration}

1. Ingrese el valor de su [clave de API de Datadog][2].
2. Seleccione su [Datadog Site][4].

{{< img src="logs/guide/azure-automated-log-forwarding/deployment_datadog_configuration_2025-02-18.png" alt="La página Datadog Configuration de la plantilla ARM para el reenvío automatizado de logs de Azure" popup="true" style="width:100%">}}

3. Haga clic en {{< ui >}}Next{{< /ui >}}.

#### Deployment {#deployment}

1. Haga clic en la casilla de verificación para confirmar las advertencias de implementación.
2. Haga clic en {{< ui >}}Review + create{{< /ui >}}.

#### Review + create {#review-create}

1. Revise los detalles finales de la implementación.
2. Haga clic en {{< ui >}}Create{{< /ui >}}.

## Filtrado de etiquetas de recursos {#resource-tag-filtering}

Puede utilizar filtros de etiquetas para controlar de qué recursos de Azure se reenvían los logs a Datadog. Para conocer la sintaxis de los filtros de etiquetas, la compatibilidad con caracteres comodín y ejemplos, consulte [Filtrado de etiquetas de recursos][21] en la guía de introducción a Azure.

## Log Analytics Workspaces {#log-analytics-workspaces}

Puede reenviar logs desde Azure Log Analytics Workspaces (LAWs) a Datadog a través del reenviador automatizado de logs. Anteriormente, Datadog solo admitía logs de [configuración de diagnóstico][13] de LAW. Con las [reglas de exportación de datos][17], también puede reenviar logs desde LAW Log Tables a Datadog.

### Restricciones {#restrictions}

- Solo puede configurar el reenvío para recursos de LAW dentro de la misma región que el reenviador de logs.
- Puede tener un máximo de 10 reglas de exportación de datos en un LAW. Si el LAW no tiene capacidad para otra Data Export Rule, elimine una regla existente para liberar espacio.
- No todas las tablas de registros se pueden exportar. Consulte la lista de Microsoft de [tablas no admitidas][18].

### Reenviar logs desde un Log Analytics Workspace {#forward-logs-from-a-log-analytics-workspace}

1. Si aún no ha creado un reenviador automatizado de logs, siga las instrucciones de [Setup](#setup). Si ya tiene un reenviador de logs, asegúrese de que esté actualizado a la versión más reciente.
2. En [Azure Portal][19], navegue hasta el Log Analytics Workspace deseado.
3. En {{< ui >}}Settings{{< /ui >}}, haga clic en {{< ui >}}Data export{{< /ui >}}.
4. Haga clic en {{< ui >}}New export rule{{< /ui >}}.
5. Asigne un nombre a la regla, marque {{< ui >}}Enable upon creation{{< /ui >}} y haga clic en {{< ui >}}Next{{< /ui >}}.
6. Seleccione las tablas que desea exportar. Puede modificar esta selección más adelante editando la regla de exportación de datos. Haga clic en {{< ui >}}Next{{< /ui >}}.
7. Para {{< ui >}}Destination type{{< /ui >}}, seleccione {{< ui >}}Storage Account{{< /ui >}}. Seleccione la suscripción que contiene su reenviador de logs y elija una cuenta de almacenamiento para el reenviador de logs. Estas cuentas generalmente tienen el prefijo `ddlogstorage`. Haga clic en {{< ui >}}Next{{< /ui >}}.
8. Revise la regla y haga clic en {{< ui >}}Create{{< /ui >}}. Los logs del LAW comienzan a aparecer en Datadog en unos pocos minutos.

### Solución de problemas {#troubleshooting}

#### Los logs no aparecen en Datadog {#logs-are-not-appearing-in-datadog}

Si ha creado una regla de exportación de datos pero no ve los logs en Datadog:

1. Verifique que la regla de exportación de datos esté habilitada.
1. Verifique que la cuenta de almacenamiento de destino sea una creada por el reenviador automatizado de logs (el nombre generalmente comienza con `ddlogstorage`).
1. En la cuenta de almacenamiento, inspeccione los containers. Los containers con el prefijo `am-` indican exportaciones de LAW. Si solo ve containers con el prefijo `insights-`, es posible que la regla de exportación de datos esté configurada incorrectamente.
1. Verifique que el LAW haya recopilado nuevos logs en las últimas dos horas.

Consulte las [preguntas frecuentes sobre la solución de problemas de exportación de datos][20] de Microsoft para obtener información adicional.

#### Selección de los logs que se exportan {#selecting-which-logs-are-exported}

La regla de exportación de datos le permite especificar qué tablas de logs de su Log Analytics Workspace se exportan. Edite la regla de exportación de datos para agregar o eliminar tablas.

#### Latencia esperada {#expected-latency}

Los logs de LAW suelen aparecer en Datadog en un plazo de dos a cinco minutos, pero pueden tardar hasta 20 minutos en aparecer por primera vez. Los registros de LAW pueden tener propiedades diferentes a las de los registros que no son de LAW.

## Arquitectura {#architecture}

### Servicios utilizados {#services-used}

- Los trabajos de [Azure Container Apps][8] ejecutan el plano de control, que detecta recursos en sus suscripciones de Azure, ajusta la capacidad de los Forwarders de registros y configura los ajustes de diagnóstico en los recursos detectados.
- Los trabajos de Azure Container Apps también ejecutan los Forwarders de registros, que recopilan los registros de recursos generados por los ajustes de diagnóstico, rastrean qué registros se han procesado y los envían a Datadog.
- [Azure Storage Accounts][9] se utilizan para almacenar los registros generados por sus recursos, así como una pequeña caché de metadatos como ID de suscripción, ID de recursos y regiones.

### Arquitectura de alto nivel {#high-level-architecture}

{{<img src="/logs/guide/azure_automated_logs_architecture/high_level_architecture_06-13-2025.png" alt="Diagrama de arquitectura que muestra los tres componentes principales del reenvío automatizado de registros de Azure: el plano de control y el Forwarder de registros (implementados por Datadog en los entornos del cliente) conectados a los recursos de Azure" style="width:100%">}}

La plantilla de implementación configura un [plano de control](#control-plane) y varios [Forwarders de registros](#log-forwarders) en las suscripciones seleccionadas.

#### Plano de control {#control-plane}

El plano de control consiste en un conjunto de trabajos de Azure Container Apps y una cuenta de almacenamiento para el almacenamiento en caché. Se implementa un plano de control en la suscripción elegida y realiza las siguientes tareas:
- Detección de recursos en las suscripciones elegidas que pueden generar registros mediante los ajustes de diagnóstico.
- Configuración automática de los ajustes de diagnóstico en los recursos detectados para registrar los registros en una cuenta de almacenamiento que supervisan los Forwarders de registros.
- Escalado de los Forwarders de registros en las regiones donde se encuentran sus recursos, lo que les permite adaptarse al volumen de registros de forma dinámica.

#### Forwarders de registros {#log-forwarders}

Los Forwarders de registros consisten en un trabajo de Azure Container Apps y una cuenta de almacenamiento para los registros. Los Forwarders de registros son implementados por el plano de control en cada suscripción que seleccione para el reenvío de registros. La cantidad de Forwarders de registros implementados por suscripción se escala de acuerdo con el volumen de registros generados por sus recursos. Los Forwarders de registros realizan las siguientes tareas:
- Almacenar temporalmente los registros generados a partir de la configuración de diagnóstico de sus recursos en una cuenta de almacenamiento.
- Procesar los registros almacenados y enviarlos a Datadog.

En Azure, la configuración de diagnóstico de un recurso solo puede dirigirse a cuentas de almacenamiento dentro de la misma región. Por eso, los Forwarders se inician en cada región donde existen recursos con ajustes de diagnóstico.

Consulte la página [Configuración de diagnóstico en Azure Monitor][13] de Azure para obtener más información.

### Arquitectura detallada {#detailed-architecture}

{{<img src="/logs/guide/azure_automated_logs_architecture/detailed_architecture.png" alt="Diagrama de flujo de trabajo que muestra el reenvío automático de registros de Azure: el plano de control descubre recursos, escala los reenviadores de registros entre regiones, configura los ajustes de diagnóstico para enviar registros a las cuentas de almacenamiento y, luego, las Container Apps verifican y reenvían nuevos registros a Datadog Log Management." style="width:100%">}}

### Security y permisos {#security-and-permissions}

La plantilla de ARM otorga al plano de control solo los permisos necesarios para administrar los Forwarders y configurar los ajustes de diagnóstico en sus recursos. Para lograr esto, se crean grupos de recursos y se otorgan permisos durante la implementación de la plantilla de ARM. Después de esto, puede agregar permisos para más suscripciones volviendo a implementar la plantilla de ARM.

#### Permisos utilizados {#permissions-used}

- Rol [Monitoring Reader][22] a nivel de **suscripción** para las suscripciones seleccionadas.
   - Esto es necesario para enumerar los recursos en las suscripciones seleccionadas.

- Rol [Monitoring Contributor][10] a nivel de **suscripción** para las suscripciones seleccionadas.
   - Esto es necesario para descubrir recursos con configuración de diagnóstico disponible y habilitar la salida de registros al almacenamiento.

- Rol [Contributor][11] a nivel de **grupo de recursos**, para los grupos de recursos de reenvío de registros en las suscripciones seleccionadas.
   - Esto es necesario para administrar (crear y eliminar) las cuentas de almacenamiento de los Forwarders y los trabajos de Container Apps.

- Rol [Reader and Data Access][23] a nivel de **grupo de recursos**, para los grupos de recursos de reenvío de registros en las suscripciones seleccionadas.
   - Esto es necesario para crear ajustes de diagnóstico que envíen registros a las cuentas de almacenamiento de los Forwarders, lo cual requiere el permiso `listKeys` en esas cuentas de almacenamiento.

- Rol [Container Apps Jobs Contributor][24] a nivel de **grupo de recursos del plano de control**.
   - Esto es necesario para actualizar los trabajos de Container Apps del plano de control. Las implementaciones con un plano de control de Function app utilizan el rol [Website Contributor][12] en su lugar.

No se exporta información sobre sus recursos. Datadog solo solicita la información necesaria para habilitar la salida de registros, y la única salida de esta arquitectura son los registros enviados a Datadog.

**Nota**: Opcionalmente, puede habilitar el plano de control para que envíe sus propias métricas de estado, registros y eventos a Datadog con fines de depuración. Para hacer esto, establezca la variable de entorno `DD_TELEMETRY=true` en cualquier trabajo de Container Apps en el plano de control. Para un plano de control de Function app, establézcala en cualquier Function app.

{{% azure-log-archiving %}}

## Desinstalar {#uninstall}

Comience abriendo un [Azure Cloud Shell][5] y asegúrese de que se esté ejecutando en Azure CLI/Bash, no en PowerShell.

Descargue y ejecute el script de desinstalación:
{{< code-block lang="bash" >}}
wget https://ddazurelfo.blob.core.windows.net/uninstall/uninstall.py
python uninstall.py
{{< /code-block >}}

El script primero detecta cualquier instancia que se esté ejecutando en cada suscripción y, luego, le solicita que seleccione la(s) instancia(s) que desea desinstalar. Confirme la eliminación de los recursos y espere a que se eliminen.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://portal.azure.com/#create/Microsoft.Template/uri/CustomDeploymentBlade/uri/https%3A%2F%2Fraw.githubusercontent.com%2FDataDog%2Fintegrations-management%2Fmain%2Fazure%2Flogging_install%2Fdist%2Fazuredeploy.json/createUIDefinitionUri/https%3A%2F%2Fraw.githubusercontent.com%2FDataDog%2Fintegrations-management%2Fmain%2Fazure%2Flogging_install%2Fdist%2FcreateUiDefinition.json
[2]: https://app.datadoghq.com/organization-settings/api-keys
[4]: /es/getting_started/site/
[5]: https://learn.microsoft.com/en-us/azure/cloud-shell/overview
[8]: https://azure.microsoft.com/products/container-apps
[9]: https://learn.microsoft.com/azure/storage/common/storage-account-overview
[10]: https://learn.microsoft.com/azure/azure-monitor/roles-permissions-security#monitoring-contributor
[11]: https://learn.microsoft.com/azure/role-based-access-control/built-in-roles/privileged#contributor
[12]: https://learn.microsoft.com/azure/role-based-access-control/built-in-roles/web-and-mobile#website-contributor
[13]: https://learn.microsoft.com/azure/azure-monitor/essentials/diagnostic-settings
[14]: https://app.datadoghq.com/integrations/azure/add?config_azure-new-onboarding=true
[16]: https://app.datadoghq.com/integrations/azure
[17]: https://learn.microsoft.com/azure/azure-monitor/logs/logs-data-export?tabs=portal
[18]: https://learn.microsoft.com/azure/azure-monitor/logs/logs-data-export?tabs=portal#unsupported-tables
[19]: https://portal.azure.com
[20]: https://learn.microsoft.com/troubleshoot/azure/azure-monitor/log-analytics/workspaces/workspace-data-export-faq
[21]: /es/getting_started/integrations/azure/#resource-tag-filtering-for-logs
[22]: https://learn.microsoft.com/azure/role-based-access-control/built-in-roles/monitor#monitoring-reader
[23]: https://learn.microsoft.com/azure/role-based-access-control/built-in-roles/storage#reader-and-data-access
[24]: https://learn.microsoft.com/azure/role-based-access-control/built-in-roles/containers#container-apps-jobs-contributor
[25]: https://github.com/DataDog/integrations-management/tree/main/azure/lfo_container_app_migration