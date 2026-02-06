---
aliases:
- /es/logs/guide/azure-logging-guide/
- /es/logs/guide/azure-automated-logs-architecture/
further_reading:
- link: https://www.datadoghq.com/blog/monitoring-azure-platform-logs/
  tag: Blog
  text: Prácticas recomendadas para monitorizar logs de la plataforma Microsoft Azure
title: Configuración del reenvío automatizado de logs de Azure
---

## Información general

Utiliza esta guía para automatizar la configuración de reenvío de logs de Azure con una plantilla de Azure Resource Manager (ARM).

La plantilla ARM despliega recursos de una serie de servicios Azure (cuentas de almacenamiento y aplicaciones de función) en tus suscripciones, que recopilan y reenvían logs a Datadog. Los escalados de estos servicios aumentan o disminuyen automáticamente para adaptarse al volumen de logs. El escalado se gestiona mediante un plano de control, que es un conjunto de aplicaciones de función desplegadas en una suscripción y región de tu elección. Las cuentas de almacenamiento y las aplicaciones de función se despliegan en cada una de las suscripciones que reenvían logs a Datadog.

**Todos los sitios**: El reenvío automatizado de logs está disponible en todos los [sitios Datadog][4].

## Cómo elegir entre la configuración automática y la manual

Elige el método de configuración manual si lo deseas:
   - aplica etiquetas personalizadas a tus recursos

Utiliza el método de configuración automática si lo deseas:
   - automatiza el despliegue a través del portal de Azure
   - gestiona tu infraestructura mediante plantillas declarativas
   - control centralizado de accesos, etiquetas y facturación
   - redistribuye tus recursos en el orden correcto y de forma coherente
   - ahorra costes utilizando una cuenta de almacenamiento en lugar de un centro de eventos

## Configuración

Comienza por abrir la plantilla Azure Log Forwarding ARM correspondiente a tu entorno de Azure, o haz clic en **+ Add Log Collection** (+ Añadir recopilación de logs) en el [cuadro de integración de Azure][14].

  - [Azure Public][1]
  - [Azure Government][6]
  - [Azure China][7]

Las secciones siguientes ofrecen instrucciones para cumplimentar cada página de la plantilla.

### Conceptos básicos

1. En **Detalles del proyecto**, selecciona el grupo de gestión. Esto es necesario para que la plantilla ARM conceda permisos a las suscripciones que seleccionas para el reenvío automatizado de logs.
2. En **Detalles de la instancia**, selecciona valores para:
   - **Región**. Aquí es donde se despliega el plano de control.
   - **Suscripciones para el reenvío de logs**. Son las suscripciones que deben configurarse para el reenvío de logs.
   - **Suscripción del plano de control**. Es la suscripción en la que se despliega el plano de control.
   - **Nombre del grupo de recursos**. Es el grupo de recursos que utilizará el plano de control. Es recomendado elegir un nuevo nombre de grupo de recursos no utilizado para simplificar la gestión de servicios del plano de control.

{{< img src="logs/guide/azure-automated-log-forwarding/deployment_basics.png" alt="Página Elementos básicos de la plantilla ARM para el reenvío automatizado de logs de Azure" popup="true" style="width:100%">}}

3. Haz clic en **Siguiente**.

### Configuración de Datadog

1. Introduce el valor de tu [clave de API Datadog][2].
2. Selecciona tu [sitio Datadog][4].

{{< img src="logs/guide/azure-automated-log-forwarding/deployment_datadog_configuration_2025-02-18.png" alt="Página Configuración de Datadog de la plantilla ARM para el reenvío automatizado de logs de Azure" popup="true" style="width:100%">}}

3. Haz clic en **Siguiente**.

### Implementación

1. Haz clic en la casilla para confirmar que recibiste las advertencias del despliegue.
2. Haz clic en **Review + create** (Revisar + crear).

### Revisar + crear

1. Revisa los detalles del despliegue finalizado.
2. Haz clic en **Create** (Crear).

## Arquitectura

### Servicios utilizados

- Las aplicaciones [Azure Function][15] se utilizan para detectar recursos en tus suscripciones de Azure, escalar reenviadores de logs y configurar ajustes de diagnóstico en los recursos detectados.
- Las [Azure Container Apps][8] se utilizan para recopilar logs de recursos generados por los parámetros de diagnóstico, realizar un seguimiento de los logs que ya se procesaron y enviarlos a Datadog.
- Las [cuentas de Azure Storage][9] se utilizan para almacenar logs generados por tus recursos, así como una pequeña caché de metadatos como los ID de suscripciones, los ID de recursos y las regiones.

### Arquitectura de alto nivel

{{<img src="/logs/guide/azure_automated_logs_architecture/high_level_architecture_06-13-2025.png" alt="Architecture diagram showing three main components of Azure automated log forwarding: Control Plane and Log Forwarder (deployed by Datadog to customer environments) connecting to Azure Resources" style="width:100%">}}

La plantilla de despliegue configura un [plano de control](#control-plane) y [reenviadores de logs](#log-forwarders) en las suscripciones seleccionadas.

#### Plano de control

El plano de control es un conjunto de aplicaciones Azure Function y una cuenta de almacenamiento para caché. Un plano de control se despliega en la suscripción elegida y realiza las siguientes tareas:
- Detección de recursos en las suscripciones elegidas que pueden generar logs a través de los parámetros de diagnóstico.
- Configuración automática de los parámetros de diagnóstico en los recursos detectados para enviar logs a una cuenta de almacenamiento que los reenviadores de logs están rastreando.
- Escalado de los reenviadores de logs en las regiones donde se encuentran tus recursos, lo que les permite adaptarse dinámicamente al volumen de logs.

#### Reenviadores de logs

Los reenviadores de logs consisten en un trabajo de Azure Container Apps y una cuenta de almacenamiento para logs. El plano de control los despliega en cada suscripción que selecciones para el reenvío de logs. El número de reenviadores de logs desplegados por suscripción varía en función del volumen de logs generado por tus recursos. Los reenviadores de logs realizan las siguientes tareas:
- Almacenan temporalmente logs generados a partir de los parámetros de diagnóstico de tus recursos en una cuenta de almacenamiento.
- Procesa los logs almacenados y los reenvía a Datadog.

En Azure, los parámetros de diagnóstico de un recurso solo pueden apuntar a cuentas de almacenamiento dentro de la misma región. Por lo tanto, los reenviadores se activan en cada región en la que existen recursos con parámetros de diagnóstico.

Consulta la página [Parámetros de diagnóstico en Azure Monitor][13] de Azure para obtener más información.

### Arquitectura detallada

{{<img src="/logs/guide/azure_automated_logs_architecture/detailed_architecture.png" alt="Workflow diagram showing Azure automated log forwarding: the Control Plane discovers resources, scales log forwarders across regions, configures diagnostic settings to send logs to storage accounts, and then Container Apps check for and forward new logs to Datadog Log Management." style="width:100%">}}

### Seguridad y permisos

La plantilla de ARM concede al plano de control solo los permisos necesarios para gestionar los reenviadores y colocar parámetros de diagnóstico en tus recursos. Para esto, se crean grupos de recursos y se conceden permisos durante el despliegue de la plantilla de ARM. Después, puedes añadir permisos para más suscripciones volviendo a desplegar la plantilla de ARM.

#### Permisos utilizados

- Rol de [Colaborador de monitorización][10] a nivel de **suscripción** para las suscripciones seleccionadas.
   - Esto es necesario para detectar recursos con parámetros de diagnóstico disponibles y habilitar la salida de los logs al almacenamiento.

- Rol de [Colaborador][11] a nivel de **grupo de recursos**, para los grupos de recursos de reenvío de logs de las suscripciones seleccionadas.
   - Esto es necesario para gestionar (crear y eliminar) cuentas de almacenamiento de reenviadores y trabajos de Container Apps.

- Rol de [Colaborador de sitio web][12] a nivel de **grupo de recursos del plano de control**, para actualizar las aplicaciones de función del plano de control.

No se exporta ninguna información sobre tus recursos. Datadog solo solicita la información necesaria para habilitar la salida de logs, y el único resultado de esta arquitectura son los logs enviados a Datadog.

**Nota**: Opcionalmente, puedes habilitar el plano de control para que envíe sus propias métricas de estado, logs y eventos a Datadog con fines de depuración. Para ello, establece la variable de entorno `DD_TELEMETRY=true` en cualquier Function App o Container App del plano de control.

{{% azure-log-archiving %}}

## Desinstalar

Comienza por abrir un [Azure Cloud Shell][5] y asegúrate de que se ejecuta en Azure CLI/Bash, no en PowerShell.

Descarga y ejecuta el script de desinstalación:
{{< code-block lang="bash" >}}
wget https://ddazurelfo.blob.core.windows.net/uninstall/uninstall.py
python uninstall.py
{{< /code-block >}}

El script detecta primero cualquier instancia que se esté ejecutando en cada suscripción y, a continuación, te pide que selecciones la(s) instancia(s) que deseas desinstalar. Confirma la eliminación de los recursos y espera a que se eliminen.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://portal.azure.com/#create/Microsoft.Template/uri/CustomDeploymentBlade/uri/https%3A%2F%2Fraw.githubusercontent.com%2FDataDog%2Fintegrations-management%2Fmain%2Fazure%2Flogging_install%2Fdist%2Fazuredeploy.json/createUIDefinitionUri/https%3A%2F%2Fraw.githubusercontent.com%2FDataDog%2Fintegrations-management%2Fmain%2Fazure%2Flogging_install%2Fdist%2FcreateUiDefinition.json
[2]: https://app.datadoghq.com/organization-settings/api-keys
[4]: /es/getting_started/site/
[5]: https://learn.microsoft.com/en-us/azure/cloud-shell/overview
[6]: https://portal.azure.us/#create/Microsoft.Template/uri/CustomDeploymentBlade/uri/https%3A%2F%2Fraw.githubusercontent.com%2FDataDog%2Fintegrations-management%2Fmain%2Fazure%2Flogging_install%2Fdist%2Fazuredeploy.json/createUIDefinitionUri/https%3A%2F%2Fraw.githubusercontent.com%2FDataDog%2Fintegrations-management%2Fmain%2Fazure%2Flogging_install%2Fdist%2FcreateUiDefinition.json
[7]: https://portal.azure.cn/#create/Microsoft.Template/uri/CustomDeploymentBlade/uri/https%3A%2F%2Fraw.githubusercontent.com%2FDataDog%2Fintegrations-management%2Fmain%2Fazure%2Flogging_install%2Fdist%2Fazuredeploy.json/createUIDefinitionUri/https%3A%2F%2Fraw.githubusercontent.com%2FDataDog%2Fintegrations-management%2Fmain%2Fazure%2Flogging_install%2Fdist%2FcreateUiDefinition.json
[8]: https://azure.microsoft.com/products/container-apps
[9]: https://learn.microsoft.com/azure/storage/common/storage-account-overview
[10]: https://learn.microsoft.com/azure/azure-monitor/roles-permissions-security#monitoring-contributor
[11]: https://learn.microsoft.com/azure/role-based-access-control/built-in-roles/privileged#contributor
[12]: https://learn.microsoft.com/azure/role-based-access-control/built-in-roles/web-and-mobile#website-contributor
[13]: https://learn.microsoft.com/azure/azure-monitor/essentials/diagnostic-settings
[14]: https://app.datadoghq.com/integrations/azure/add?config_azure-new-onboarding=true
[15]: https://learn.microsoft.com/azure/azure-functions/