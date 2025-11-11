---
further_reading:
- link: https://www.datadoghq.com/blog/monitoring-azure-platform-logs/
  tag: Blog
  text: Prácticas recomendadas para monitorizar logs de la plataforma Microsoft Azure
private: true
title: Configuración del reenvío automatizado de logs de Azure
---

## Información general

Utiliza esta guía para automatizar la configuración del reenvío de logs de Azure con una plantilla de Azure Resource Manager (ARM).

La plantilla ARM despliega recursos de una serie de servicios Azure (cuentas de almacenamiento y aplicaciones de función) en tus suscripciones, que recopilan y reenvían logs a Datadog. Los escalados de estos servicios aumentan o disminuyen automáticamente para adaptarse al volumen de logs. El escalado se gestiona mediante un plano de control, que es un conjunto de aplicaciones de función desplegadas en una suscripción y región de tu elección. Las cuentas de almacenamiento y las aplicaciones de función se despliegan en cada una de las suscripciones que reenvían logs a Datadog.

**Todos los sitios**: El reenvío automatizado de logs está disponible en todos los [sitios Datadog][4].

## Configuración

Empieza abriendo la [plantilla Automated Log Forwarding ARM][1]. Las secciones siguientes ofrecen instrucciones para completar cada página de la plantilla.

### Conceptos básicos


1. En **Detalles del proyecto**, selecciona el grupo de gestión. Esto es necesario para que la plantilla ARM conceda permisos a las suscripciones que seleccionas para el reenvío automatizado de logs.
2. En **Detalles de la instancia**, selecciona valores para:
   - **Región**. Aquí es donde se despliega el plano de control.
   - **Suscripciones para el reenvío de logs**. Son las suscripciones que deben configurarse para el reenvío de logs.
   - **Suscripción del plano de control**. Es la suscripción en la que se despliega el plano de control.
   - **Nombre del grupo de recursos**. Es el grupo de recursos que utilizará el plano de control. Es recomendado elegir un nuevo nombre de grupo de recursos no utilizado para simplificar la gestión de servicios del plano de control.

{{< img src="logs/guide/azure-automated-log-forwarding/deployment_basics.png" alt="Página Elementos básicos de la plantilla ARM para el reenvío automatizado de logs de Azure" popup="true" style="width:100%">}}

3. Haz clic en **Next** (Siguiente).

### Configuración de Datadog

1. Introduce el valor de tu [clave de API Datadog][2].
2. Selecciona tu [sitio Datadog][4].

{{< img src="logs/guide/azure-automated-log-forwarding/deployment_datadog_configuration_2025-02-18.png" alt="Página Configuración de Datadog de la plantilla ARM para el reenvío automatizado de logs de Azure" popup="true" style="width:100%">}}

3. Haz clic en **Next** (Siguiente).

### Implementación

1. Haz clic en la casilla para confirmar que recibiste las advertencias del despliegue.
2. Haz clic en **Review + create** (Revisar + crear).

### Revisar + crear

1. Revisa los detalles del despliegue finalizado.
2. Haz clic en **Create** (Crear).

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://portal.azure.com/#create/Microsoft.Template/uri/CustomDeploymentBlade/uri/https%3A%2F%2Fraw.githubusercontent.com%2FDataDog%2Fintegrations-management%2Fmain%2Fazure%2Flogging_install%2Fdist%2Fazuredeploy.json/createUIDefinitionUri/https%3A%2F%2Fraw.githubusercontent.com%2FDataDog%2Fintegrations-management%2Fmain%2Fazure%2Flogging_install%2Fdist%2FcreateUiDefinition.json
[2]: https://app.datadoghq.com/organization-settings/api-keys
[4]: /es/getting_started/site/
