---
aliases:
- /es/logs/guide/azure-logging-guide/
- /es/logs/guide/azure-automated-logs-architecture/
further_reading:
- link: https://www.datadoghq.com/blog/monitoring-azure-platform-logs/
  tag: Blog
  text: Mejores prácticas para monitorear los registros de la plataforma Microsoft
    Azure
title: Configuración de reenvío automático de registros de Azure
---
## Descripción general {#overview}

Utiliza esta guía para configurar y gestionar el reenvío automático de registros de Azure. Puedes configurar el reenvío de registros directamente en Datadog o implementarlo con una plantilla de Azure Resource Manager (ARM).

La plantilla de ARM implementa recursos de una serie de servicios de Azure (cuentas de almacenamiento y aplicaciones de función) en tus suscripciones, que recopilan y reenvían registros a Datadog. Estos servicios se escalan automáticamente hacia arriba o hacia abajo para coincidir con el volumen de registros. El escalado es gestionado por un plano de control, que es un conjunto de aplicaciones de función implementadas en una suscripción y región de su elección. Las cuentas de almacenamiento y las aplicaciones de función se implementan en cada una de las suscripciones que reenvían registros a Datadog.

**Todos los sitios**: El reenvío automático de registros está disponible para usar en todos los [sitios de Datadog][4].

**Entornos de Azure compatibles**: El reenvío automático de registros solo es compatible con la nube comercial (pública) de Azure. Azure Government y Azure China no son compatibles. Si utiliza sitios gubernamentales de Datadog, solo puede usar esta función con cargas de trabajo en la nube comercial de Azure.

## Cómo elegir entre la configuración automática y manual {#how-to-choose-between-automated-and-manual-setup}

Elija el método de configuración manual si desea:
   - aplicar etiquetas personalizadas a sus recursos

Utilice el método de configuración automática si desea:
   - automatizar la implementación a través del portal de Azure
   - gestionar su infraestructura a través de plantillas declarativas
   - controlar centralmente el acceso, las etiquetas y la facturación
   - redistribuir sus recursos en el orden correcto y de manera consistente
   - ahorrar costos utilizando una cuenta de almacenamiento en lugar de un hub de eventos

## Configurar {#setup}

### Configurar el reenvío de registros {#configure-log-forwarding}

Utilice el flujo de **Configurar el reenvío de registros** para configurar nuevos o gestionar Forwarders existentes directamente en Datadog. Puede utilizar este flujo para implementar el reenvío automático de registros desde cero o actualizar una configuración existente, como agregar o eliminar suscripciones o modificar filtros de registros.

1. In Datadog, navegue a [{{< ui >}}Integrations > Azure{{< /ui >}}][16].
1. Haga clic en {{< ui >}}Configure Log Forwarding{{< /ui >}}.
1. Elija implementar una nueva configuración o actualizar una existente.
1. Copie el comando proporcionado y péguelo en su Azure Cloud Shell.
1. Seleccione las suscripciones de las que desea reenviar registros.
1. Opcionalmente, agregue o elimine filtros de registros.
1. Haga clic en {{< ui >}}Confirm{{< /ui >}}.

### Plantilla ARM {#arm-template}

Alternativamente, puede implementar el reenvío automático de registros con una [plantilla ARM pública de Azure][1]. Las secciones a continuación proporcionan instrucciones para completar cada página de la plantilla.

#### Conceptos básicos {#basics}

1. Bajo {{< ui >}}Project details{{< /ui >}}, seleccione el grupo de administración. Esto es necesario para que la plantilla ARM otorgue permisos a las suscripciones que seleccione para el reenvío automático de registros.
2. Bajo {{< ui >}}Instance details{{< /ui >}}, seleccione valores para:
   - {{< ui >}}Region{{< /ui >}}. Aquí es donde se despliega el plano de control.
   - {{< ui >}}Subscriptions to Forward Logs{{< /ui >}}. Estas son las suscripciones que se configurarán para el reenvío de registros.
   - {{< ui >}}Control Plane Subscription{{< /ui >}}. Esta es la suscripción a la que se despliega el plano de control.
   - {{< ui >}}Resource Group Name{{< /ui >}}. Este es el grupo de recursos que utilizará el plano de control. Se recomienda elegir un nombre de grupo de recursos nuevo y no utilizado para simplificar la gestión de los servicios del plano de control.

{{< img src="logs/guide/azure-automated-log-forwarding/deployment_basics.png" alt="La página de conceptos básicos de la plantilla ARM para el reenvío automatizado de registros de Azure" popup="true" style="width:100%">}}

3. Haga clic en {{< ui >}}Next{{< /ui >}}.

#### Configuración de Datadog {#datadog-configuration}

1. Ingrese su valor de [clave de API de Datadog][2].
2. Seleccione su [sitio de Datadog][4].

{{< img src="logs/guide/azure-automated-log-forwarding/deployment_datadog_configuration_2025-02-18.png" alt="La página de configuración de Datadog de la plantilla ARM para el reenvío automatizado de registros de Azure" popup="true" style="width:100%">}}

3. Haga clic en {{< ui >}}Next{{< /ui >}}.

#### Despliegue {#deployment}

1. Marque la casilla para reconocer las advertencias de despliegue.
2. Haga clic en {{< ui >}}Review + create{{< /ui >}}.

#### Revisar + crear {#review-create}

1. Revise los detalles de implementación finalizados.
2. Haga clic en {{< ui >}}Create{{< /ui >}}.

## Filtrado de etiquetas de recursos {#resource-tag-filtering}

Puede usar filtros de etiquetas para controlar qué recursos de Azure tienen sus registros reenviados a Datadog. Para la sintaxis de filtros de etiquetas, soporte de comodines y ejemplos, consulte [Filtrado de etiquetas de recursos][21] en la guía de inicio de Azure.

## Espacios de trabajo de Log Analytics {#log-analytics-workspaces}

Puede reenviar registros desde los Espacios de trabajo de Log Analytics de Azure (LAWs) a Datadog a través del reenvío automático de registros. Anteriormente, Datadog solo admitía registros de [configuración de diagnóstico][13] de LAWs. Con [reglas de exportación de datos][17], también puede reenviar registros desde las Tablas de Registros de LAW a Datadog.

### Restricciones {#restrictions}

- Solo puede configurar el reenvío para recursos de LAW dentro de la misma región que el reenvío de registros.
- Puede tener un máximo de 10 reglas de exportación de datos en un LAW. Si el LAW no tiene capacidad restante para una Regla de Exportación de Datos, elimine una regla existente para hacer espacio.
- No todas las tablas de registros pueden ser exportadas. Consulte la lista de Microsoft de [tablas no admitidas][18].

### Reenvíe registros desde un Espacio de trabajo de Log Analytics {#forward-logs-from-a-log-analytics-workspace}

1. Si aún no ha creado un Forwarder de registros automático, siga las instrucciones de [Configuración](#setup). Si ya tiene un Forwarder de registros, asegúrese de que esté actualizado a la última versión.
2. En el [Portal de Azure][19], navegue hasta el Espacio de trabajo de Log Analytics deseado.
3. Bajo {{< ui >}}Settings{{< /ui >}}, haga clic en {{< ui >}}Data export{{< /ui >}}.
4. Haga clic en {{< ui >}}New export rule{{< /ui >}}.
5. Asigne un nombre a la regla, verifique {{< ui >}}Enable upon creation{{< /ui >}} y haga clic en {{< ui >}}Next{{< /ui >}}.
6. Seleccione las tablas para exportar. Puede modificar esta selección más tarde editando la regla de exportación de datos. Haga clic en {{< ui >}}Next{{< /ui >}}.
7. Para {{< ui >}}Destination type{{< /ui >}}, seleccione {{< ui >}}Storage Account{{< /ui >}}. Seleccione la suscripción que contiene su Forwarder de registros y elija una cuenta de almacenamiento para el Forwarder de registros. Estas cuentas típicamente tienen el prefijo `ddlogstorage`. Haga clic en {{< ui >}}Next{{< /ui >}}.
8. Revise la regla y haga clic en {{< ui >}}Create{{< /ui >}}. Los registros del LAW comienzan a aparecer en Datadog en unos minutos.

### Solución de problemas {#troubleshooting}

#### Los registros no están apareciendo en Datadog {#logs-are-not-appearing-in-datadog}

Si ha creado una regla de exportación de datos pero no ve registros en Datadog:

1. Verifique que la regla de exportación de datos esté habilitada.
1. Verifique que la cuenta de almacenamiento de destino sea una creada por el Forwarder de registros automatizado (el nombre típicamente comienza con `ddlogstorage`).
1. En la cuenta de almacenamiento, inspeccione los contenedores. Los contenedores con el prefijo `am-` indican exportaciones de LAW. Si solo ve contenedores con el prefijo `insights-`, la regla de exportación de datos puede estar configurada incorrectamente.
1. Verifique que el LAW haya recopilado nuevos registros en las últimas dos horas.

Consulte la [FAQ de solución de problemas de exportación de datos de Microsoft][20] para obtener información adicional.

#### Seleccionando qué registros se exportan {#selecting-which-logs-are-exported}

La regla de exportación de datos le permite especificar qué tablas de registros de su espacio de trabajo de Log Analytics se exportan. Edite la regla de exportación de datos para agregar o eliminar tablas.

#### Latencia esperada {#expected-latency}

Los registros de LAW generalmente aparecen en Datadog dentro de dos a cinco minutos, pero pueden tardar hasta 20 minutos en aparecer por primera vez. Los registros de LAW pueden tener propiedades diferentes a los registros que no son de LAW.

## Arquitectura {#architecture}

### Servicios utilizados {#services-used}

- [Azure Function][15] apps se utilizan para descubrir recursos en sus suscripciones de Azure, escalar los Forwarders y configurar ajustes de diagnóstico en los recursos detectados.
- Las [Azure Container Apps][8] se utilizan para recopilar registros de recursos generados por ajustes de diagnóstico, rastrear qué registros ya han sido procesados y enviarlos a Datadog.
- Las [Azure Storage Accounts][9] se utilizan para almacenar registros generados por sus recursos, así como un pequeño caché de metadatos como IDs de suscripción, IDs de recursos y regiones.

### Arquitectura de alto nivel {#high-level-architecture}

{{<img src="/logs/guide/azure_automated_logs_architecture/high_level_architecture_06-13-2025.png" alt="Diagrama de arquitectura que muestra tres componentes principales del reenvío automático de registros de Azure: plano de control y Forwarder de registros (desplegado por Datadog en entornos de clientes) conectándose a recursos de Azure." style="width:100%">}}

La plantilla de implementación configura un [plano de control](#control-plane) y [reenviadores de registros](#log-forwarders) en sus suscripciones seleccionadas.

#### Plano de control {#control-plane}

El plano de control es un conjunto de aplicaciones de Azure Function y una cuenta de almacenamiento para almacenamiento en caché. Un plano de control se despliega en su suscripción seleccionada y realiza las siguientes tareas:
- Descubrimiento de recursos en sus suscripciones seleccionadas que pueden generar registros mediante ajustes de diagnóstico.
- Configuración automática de los ajustes de diagnóstico en los recursos descubiertos para enviar registros a una cuenta de almacenamiento que los reenviadores de registros están rastreando.
- Escalado de los reenviadores de registros en las regiones donde se encuentran sus recursos, permitiéndoles adaptarse dinámicamente al volumen de registros.

#### Reenviadores de registros {#log-forwarders}

Los reenviadores de registros consisten en un trabajo de Azure Container Apps y una cuenta de almacenamiento para registros. Son desplegados por el plano de control en cada suscripción que seleccione para el reenviador de registros. El número de reenviadores de registros desplegados por suscripción escala según el volumen de registros generados por sus recursos. Los reenviadores de registros realizan las siguientes tareas:
- Almacenar temporalmente los registros generados por los ajustes de diagnóstico de sus recursos en una cuenta de almacenamiento.
- Procesar los registros almacenados y reenviarlos a Datadog.

En Azure, los ajustes de diagnóstico de un recurso solo pueden dirigirse a cuentas de almacenamiento dentro de la misma región. Por lo tanto, los reenviadores se inician en cada región donde existen recursos con ajustes de diagnóstico.

Consulte la página de Azure [Ajustes de diagnóstico en Azure Monitor][13] para más información.

### Arquitectura detallada {#detailed-architecture}

{{<img src="/logs/guide/azure_automated_logs_architecture/detailed_architecture.png" alt="Diagrama de flujo que muestra el reenvío automatizado de registros en Azure: el plano de control descubre recursos, escala los reenviadores de registros a través de regiones, configura los ajustes de diagnóstico para enviar registros a cuentas de almacenamiento, y luego Container Apps verifican y reenvían nuevos registros a Datadog Log Management." style="width:100%">}}

### Seguridad y permisos {#security-and-permissions}

La plantilla ARM otorga al plano de control solo los permisos necesarios para gestionar los reenviadores y establecer los ajustes de diagnóstico en sus recursos. Para lograr esto, se crean grupos de recursos y se otorgan permisos durante el despliegue de la plantilla ARM. Después de esto, puede agregar permisos para más suscripciones volviendo a desplegar la plantilla ARM.

#### Permisos utilizados {#permissions-used}

- [Monitoring Contributor][10] rol a nivel de **suscripción** para las suscripciones seleccionadas.
   - Esto es necesario para descubrir recursos con configuraciones de diagnóstico disponibles y habilitar la salida de registros a almacenamiento.

- [Contributor][11] rol a nivel del **grupo de recursos** para los grupos de recursos de reenviadores de registros en las suscripciones seleccionadas.
   - Esto es necesario para gestionar (crear y eliminar) las cuentas de almacenamiento para los reenviadores y los Container Apps jobs.

- [Website Contributor][12] rol a nivel del **grupo de recursos del plano de control** para actualizar las Function Apps del plano de control.

No se exporta información sobre sus recursos. Datadog solo solicita la información necesaria para habilitar la salida de registros, y la única salida de esta arquitectura son los registros enviados a Datadog.

**Nota**: Opcionalmente, puede habilitar el plano de control para enviar sus propias métricas de salud, registros y eventos a Datadog con fines de depuración. Para hacer esto, establezca la variable de entorno `DD_TELEMETRY=true` en cualquier Function App o Container App en el plano de control.

{{% azure-log-archiving %}}

## Desinstalar {#uninstall}

Comience abriendo un [Azure Cloud Shell][5], y asegúrese de que esté ejecutándose en Azure CLI/Bash, no en PowerShell.

Descargue y ejecute el script de desinstalación:
{{< code-block lang="bash" >}}
wget https://ddazurelfo.blob.core.windows.net/uninstall/uninstall.py
python uninstall.py
{{< /code-block >}}

El script primero descubre cualquier instancia que se esté ejecutando en cada suscripción, luego le solicita que seleccione la(s) instancia(s) para desinstalar. Confirme las eliminaciones de recursos y espere a que los recursos sean eliminados.

## Lectura adicional {#further-reading}

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
[15]: https://learn.microsoft.com/azure/azure-functions/
[16]: https://app.datadoghq.com/integrations/azure
[17]: https://learn.microsoft.com/azure/azure-monitor/logs/logs-data-export?tabs=portal
[18]: https://learn.microsoft.com/azure/azure-monitor/logs/logs-data-export?tabs=portal#unsupported-tables
[19]: https://portal.azure.com
[20]: https://learn.microsoft.com/troubleshoot/azure/azure-monitor/log-analytics/workspaces/workspace-data-export-faq
[21]: /es/getting_started/integrations/azure/#resource-tag-filtering-for-logs