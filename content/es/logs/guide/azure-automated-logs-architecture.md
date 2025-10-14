---
description: Guía de arquitectura y configuración del reenvío automatizado de logs
  de la integración Datadog Azure
further_reading:
- link: https://docs.datadoghq.com/integrations/azure/
  tag: Documentación
  text: Integración Azure
title: Arquitectura y configuración del reenvío automatizado de logs de Azure
---

## Información general

La configuración del reenvío automatizado de logs de Datadog para la integración Azure ofrece varias ventajas sobre otros métodos de configuración:

- **Configuración simplificada** de la infraestructura Azure necesaria en todas tus suscripciones y regiones, lo que te permite empezar a reenviar logs desde tu entorno Azure en pocos minutos. Los nuevos recursos añadidos a tu entorno en el futuro se configuran automáticamente para reenviar logs a Datadog.

- **Escalado automático** para coincidir con el volumen de logs en tu entorno Azure. Los nuevos reenviadores de logs se activan cuando es necesario para satisfacer la demanda y se eliminan automáticamente cuando esta disminuye.

- **Reducción de los costes de Azure** mediante el uso de servicios Azure más rentable y la reducción en periodos de bajo volumen.

Este método de reenvío de logs está disponible para todos los [sitios Datadog][5] y la mayoría de las regiones de Azure (cualquier región compatible con Container Apps). Datadog recomienda este método para configurar el reenvío de logs desde tu entorno Azure.

### Logs compatibles

Esta configuración admite el reenvío de cualquier log disponible a través de los parámetros de diagnóstico, incluyendo logs de actividad y de recursos. Para las plataformas que no sean de logs, Datadog recomienda utilizar el [Datadog Agent][6] para reenviar logs.

## Arquitectura

### Servicios utilizados

1. Las aplicaciones [Azure Function][7] se utilizan para detectar recursos en tus suscripciones de Azure, escalar reenviadores de logs y configurar parámetros de diagnóstico en los recursos detectados.
2. Las [Azure Container Apps][8] se utilizan para recopilar logs de recursos generados por los parámetros de diagnóstico, realizar un seguimiento de los logs que ya se procesaron y enviarlos a Datadog.
3. Las [cuentas de Azure Storage][9] se utilizan para almacenar logs generados por tus recursos, así como una pequeña caché de metadatos como los ID de suscripciones, los ID de recursos y las regiones.

### Arquitectura de alto nivel

{{<img src="/logs/guide/azure_automated_logs_architecture/high_level_architecture_06-13-2025.png" alt="A high-level representation of the automated log forwarding setup" style="width:100%">}}

La plantilla de despliegue configura un [plano de control](#control-plane) y [reenviadores de logs](#log-forwarders) en las suscripciones seleccionadas.

#### Plano de control 

El plano de control es un conjunto de aplicaciones Azure Function y una cuenta de almacenamiento para caché. Un plano de control se despliega en la suscripción elegida y realiza las siguientes tareas:
- Detección de recursos en las suscripciones elegidas que pueden generar logs a través de los parámetros de diagnóstico.
- Configuración automática de los parámetros de diagnóstico en los recursos detectados para enviar logs a una cuenta de almacenamiento que los reenviadores de logs están rastreando.
- Escalado de los reenviadores de logs en las regiones donde se encuentran tus recursos, lo que les permite adaptarse dinámicamente al volumen de logs.

#### Reenviadores de logs 

Los reenviadores de logs consisten en un trabajo de Azure Container Apps y una cuenta de almacenamiento para logs. El plano de control los despliega en cada suscripción que selecciones para el reenvío de logs. El número de reenviadores de logs desplegados por suscripción varía en función del volumen de logs generado por tus recursos. Los reenviadores de logs realizan las siguientes tareas:
- Almacenan temporalmente logs generados a partir de los parámetros de diagnóstico de tus recursos en una cuenta de almacenamiento.
- Procesan los logs almacenados y los reenvían a Datadog.

En Azure, los parámetros de diagnóstico de un recurso solo pueden apuntar a cuentas de almacenamiento dentro de la misma región. Por lo tanto, los reenviadores se activan en cada región en la que existen recursos con parámetros de diagnóstico.

Consulta la página [Parámetros de diagnóstico en Azure Monitor][13] de Azure para obtener más información.

### Arquitectura detallada

{{<img src="/logs/guide/azure_automated_logs_architecture/detailed_architecture.png" alt="A detailed representation of the automated log forwarding setup" style="width:100%">}}

## Configuración

La configuración se completa con una plantilla de [Azure Resource Manager][1] (ARM). Esta te permite actualizar las opciones de configuración, como la clave de API, el sitio Datadog o las suscripciones monitorizadas mediante nuevos despliegues con la misma plantilla.

Al acceder a la plantilla de ARM, selecciona el grupo de gestión, la región y las suscripciones en las que quieres automatizar el reenvío de logs. A continuación, la plantilla despliega un plano de control que, a su vez, despliega reenviadores de logs en cada una de las suscripciones seleccionadas.

Consulte la [guía de configuración del reenvío automatizado de logs de Azure][2] para obtener información paso a paso sobre el despliegue de la [plantilla de ARM][3] a través del Portal Azure.

## Seguridad y permisos

La plantilla de ARM concede al plano de control solo los permisos necesarios para gestionar los reenviadores y colocar parámetros de diagnóstico en tus recursos. Para esto, se crean grupos de recursos y se conceden permisos durante el despliegue de la plantilla de ARM. Después, puedes añadir permisos para más suscripciones volviendo a desplegar la plantilla de ARM.

### Permisos utilizados

- Rol de [Colaborador de monitorización][10] a nivel de **suscripción** para las suscripciones seleccionadas.
   - Esto es necesario para detectar recursos con parámetros de diagnóstico disponibles y habilitar la salida de los logs al almacenamiento.

- Rol de [Colaborador][11] a nivel de **grupo de recursos**, para los grupos de recursos de reenvío de logs de las suscripciones seleccionadas.
   - Esto es necesario para gestionar (crear y eliminar) cuentas de almacenamiento de reenviadores y trabajos de Container Apps.

- Rol de [Colaborador de sitio web][12] a nivel de **grupo de recursos del plano de control**, para actualizar las aplicaciones de función del plano de control.

No se exporta ninguna información sobre tus recursos. Datadog solo solicita la información necesaria para habilitar la salida de logs, y el único resultado de esta arquitectura son los logs enviados a Datadog.

**Nota**: Opcionalmente puedes generar métricas, logs, y eventos sobre la salud del plano de control y enviarlos a Datadog para propósitos de depuración. Esto se habilita a través de una marcador de función.

## Ayuda y comentarios

Para obtener ayuda o hacernos llegar tus comentarios, envía un correo electrónico a [azure-log-forwarding@datadoghq.com][4].

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://learn.microsoft.com/azure/azure-resource-manager/management/overview
[2]: /es/logs/guide/azure-automated-log-forwarding/
[3]: https://portal.azure.com/#create/Microsoft.Template/uri/CustomDeploymentBlade/uri/https%3A%2F%2Fddazurelfo.blob.core.windows.net%2Ftemplates%2Fazuredeploy.json/createUIDefinitionUri/https%3A%2F%2Fddazurelfo.blob.core.windows.net%2Ftemplates%2FcreateUiDefinition.json
[4]: mailto:azure-log-forwarding@datadoghq.com
[5]: /es/getting_started/site/
[6]: /es/agent/logs/
[7]: https://learn.microsoft.com/azure/azure-functions/
[8]: https://azure.microsoft.com/products/container-apps
[9]: https://learn.microsoft.com/azure/storage/common/storage-account-overview
[10]: https://learn.microsoft.com/azure/azure-monitor/roles-permissions-security#monitoring-contributor
[11]: https://learn.microsoft.com/azure/role-based-access-control/built-in-roles/privileged#contributor
[12]: https://learn.microsoft.com/azure/role-based-access-control/built-in-roles/web-and-mobile#website-contributor
[13]: https://learn.microsoft.com/azure/azure-monitor/essentials/diagnostic-settings