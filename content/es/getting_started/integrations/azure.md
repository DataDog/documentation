---
further_reading:
- link: https://docs.datadoghq.com/integrations/azure/#overview
  tag: Documentación
  text: Integración de Microsoft Azure
- link: https://docs.datadoghq.com/integrations/guide/azure-architecture-and-configuration/
  tag: Guía
  text: Arquitectura y configuración de la integración de Azure
- link: https://docs.datadoghq.com/agent/guide/why-should-i-install-the-agent-on-my-cloud-instances/
  tag: Guía
  text: ¿Por qué debería instalar el Datadog Agent en mis instancias de nube?
- link: https://docs.datadoghq.com/integrations/guide/azure-portal/?tab=vmextension
  tag: Guía
  text: Gestión de la integración nativa de Azure
- link: https://www.datadoghq.com/blog/azure-integration-configuration/
  tag: Blog
  text: Ajusta las configuraciones de observabilidad para todas tus integraciones
    de Azure en un solo lugar
title: Empezando con Azure
---



## Información general

Existen múltiples opciones de configuración a la hora de integrar Azure con Datadog. Esta guía proporciona información general sobre las distintas opciones disponibles para empezar a usar Azure, con enlaces a recursos y tutoriales de Azure que abordan casos de uso específicos.

## Requisitos previos

Si aún no lo has hecho, crea una [cuenta de Datadog][2].

## Decidir qué camino tomar 
<br>
{{< img src="/getting_started/integrations/azure/GSwAzure_addNewIntegration.mp4" alt="Añadir nueva integración" video=true >}}

Esta sección puede ayudarte a decidir qué opción de configuración se adapta mejor a tu organización y necesidades comerciales.

Si tu organización utiliza el [sitio US3][3], tienes la posibilidad de utilizar la **integración nativa de Azure** para optimizar la gestión y la recopilación de datos para tu entorno de Azure.

Si estás en [cualquiera de los sitios disponibles][3], incluido el sitio US3, puedes usar la **integración estándar de Azure** que requiere lo siguiente:
- El proceso de [credenciales de registro de aplicaciones][4] para desplegar la recopilación de métricas.
- La [configuración del centro de eventos][5] para enviar logs de la plataforma Azure.

También tienes la opción de configurar _manualmente_ o _programáticamente_ tu integración de Azure con Datadog.

Consulta la siguiente tabla para obtener un resumen de las distintas opciones de configuración disponibles por sitio de la organización:

| SITIO DE LA ORGANIZACIÓN | INTEGRACIÓN NATIVA DE AZURE | INTEGRACIÓN ESTÁNDAR DE AZURE | CONFIGURACIÓN MANUAL | CONFIGURACIÓN AUTOMÁTICA |
| --- | ---- |-------- |---| ----|
| Sitio US3   | Sí    |Sí    |Sí<br><br> Puedes crear el `Datadog resource in Azure`, desplegar el Datadog Agent directamente en Azure con la `VM extension` o la `AKS Cluster extension` y la configuración opcional del inicio de sesión único (SSO).|Sí<br><br> Puedes utilizar `Terraform` para configurar la integración nativa de Azure de Datadog con el recurso de Datadog en Azure.  |
| Todos los sitios   | No    | Sí    |Sí<br><br>Puedes utilizar `Azure portal` o `Azure CLI`, así como `deploying the Datadog Agent directly in Azure` con la extensión de VM o la extensión del clúster de AKS. |Sí<br><br> Puedes configurar la integración a través de `Terraform` o `Azure CLI`, desplegar el Datadog Agent de forma nativa en Azure a través de `Datadog Azure VM Extension` y ejecutar `automated scripts` para habilitar la recopilación de logs.|

Las configuraciones ***_Todos los sitios_** se pueden utilizar en las organizaciones de sitios US3, pero solo las organizaciones de sitios US3 pueden utilizar la integración nativa de Azure.

<div class="alert alert-danger"> <strong>Nota</strong>: La <a href="https://docs.datadoghq.com/cloud_cost_management/setup/azure/?tab=billingaccounts&site=us3#overview">gestión de costes en la nube</a> y los <a href="https://docs.datadoghq.com/logs/log_configuration/archives/?tab=azurestorage">archivos de log</a> solo son compatibles con el registro de aplicaciones. Para los sitios de US3 que han configurado la integración nativa de Azure de Datadog, debes crear un <a href="">registro de aplicaciones</a> para acceder a estas funcionalidades.
</div>

## Configuración

{{% site-region region="us,us5,eu,ap1,us-fed" %}}

Sigue las instrucciones de esta página para configurar la **Integración estándar de Azure**, que está disponible para todos los sitios de Datadog.

**Nota**: Si estás en el sitio US3, puedes usar la **integración nativa de Azure** para obtener una funcionalidad mejorada y una configuración optimizada. Cambia el selector de sitios ubicado en el lado derecho de esta página para obtener instrucciones sobre cómo configurarlo.

{{< img src="/getting_started/integrations/azure/GSwAzure_siteSelector.mp4" alt="Selector de sitios para sitios US3" video=true >}}

{{% /site-region %}}


{{% site-region region="us3" %}}

### Integración nativa de Azure

Para la configuración automática de la integración nativa de Azure a través de Terraform, consulta la [Guía de gestión programática de la integración nativa de Azure][201].

Para la configuración manual de la integración nativa de Azure a través de la creación del recurso de Datadog en Azure, consulta la [Guía de configuración manual de la integración nativa de Azure][202].

[201]: /es/integrations/guide/azure-native-programmatic-management/
[202]: /es/integrations/guide/azure-native-manual-setup/

{{% /site-region %}}



### integración estándar de Azure

Para la configuración automática de la integración estándar de Azure, consulta la [Guía de gestión programática de la integración estándar de Azure][6] para obtener instrucciones paso a paso.

Para la configuración manual de la integración estándar de Azure, consulta la [Guía de configuración manual de la integración estándar de Azure][7] a fin de obtener instrucciones específicas para el portal de Azure y la CLI.


## Recopilación de métricas
La integración de Azure de Datadog está diseñada para recopilar todas las métricas de [Azure Monitor][8]. Consulta la [página Integraciones][9] para obtener una lista completa de las subintegraciones disponibles. Muchas de estas integraciones se instalan de forma predeterminada cuando Datadog reconoce los datos que llegan desde tu cuenta de Azure.

Puedes encontrar tus métricas de Azure en la página de resumen de métricas en la plataforma de Datadog navegando a `Metrics > Summary` y buscando `Azure`.

{{< img src="/getting_started/integrations/azure/GSwAzure_metricExplorer.png" alt="Imagen de resumen de métricas" style="width:100%;" >}}



## Recopilación de logs
{{% site-region region="us,us5,eu,ap1,us-fed" %}}

Sigue las instrucciones de esta página para configurar la recopilación de logs a través de la **integración estándar de Azure**. 
Si estás en el sitio US3 y usas la integración nativa de Azure, utiliza el selector de sitios en el lado derecho de esta página para seleccionar `US3` a fin de obtener instrucciones sobre la [recopilación de logs mediante la integración nativa de Azure][18].

 {{% /site-region %}}

{{% site-region region="us3" %}}

### Integración nativa de Azure
Si estás utilizando la integración nativa de Azure, consulta la guía [Enviar logs de Azure con el recurso de Datadog][18] para obtener instrucciones sobre cómo enviar tus logs de _nivel de suscripción_, _recurso de Azure_ y _Azure Active Directory_ a Datadog.

<div class="alert alert-danger"> <strong>Nota</strong>: Los<a href="https://docs.datadoghq.com/logs/log_configuration/archives/?tab=azurestorage"> archivos de logs</a> solo son compatibles con el registro de aplicaciones. Para los sitios US3 que han configurado la integración nativa de Azure de Datadog, debes crear un <a href="https://docs.datadoghq.com/integrations/guide/azure-manual-setup/?tab=manual#creating-the-app-registration">registro de aplicaciones</a> para acceder a estas funcionalidades.
</div>

{{% /site-region %}}


### integración estándar de Azure
Si utilizas la integración estándar de Azure, consulta la [guía Enviar logs de Azure a Datadog][10] para obtener instrucciones sobre cómo enviar tus logs de Azure a Datadog con el centro de eventos. Puedes elegir entre un proceso automático o manual para habilitar la recopilación de logs.

Puedes encontrar tus logs de Azure en la página del Explorador de logs en la plataforma de Datadog navegando al Explorador de logs y consultando `source:azure*`.

{{< img src="/getting_started/integrations/azure/GSwAzure_logExplorer.png" alt="Imagen del Explorador de logs" style="width:100%;" >}}



## Obtén más información de la plataforma de Datadog

### Instalación del Agent para una mayor visibilidad de tu aplicación
Después de configurar tu integración de Azure, los rastreadores de Datadog recopilan automáticamente métricas de Azure, pero puedes obtener una visibilidad aún más profunda de tus instancias de Azure con el [Datadog Agent][1].

#### Instalación del Agent nativo de Azure

La forma más sencilla de instalar el Datadog Agent es directamente en Azure con la [extensión de VM][11] o [de forma nativa dentro de Azure AKS][12], evitando así la complejidad de las herramientas de gestión de terceros.

#### Instalación del Agent estándar de Azure

Puedes utilizar la [extensión de Azure para instalar el Datadog Agent en tus máquinas virtuales Windows y Linux][13] o utilizar la [extensión de clúster de AKS para desplegar el Agent en tus clústeres de AKS][14].

La instalación del Datadog Agent en tu entorno te permitirá recopilar datos adicionales que incluyen, entre otros:
- **estado de la aplicación**
- **utilización del proceso**
- **métricas a nivel de sistema**

También puedes utilizar el cliente StatsD integrado para enviar métricas personalizadas desde tu aplicación para correlacionar lo que sucede con tu aplicación, tus usuarios y tu sistema.

Consulta la guía sobre [_¿Por qué debería instalar el Datadog Agent en mis instancias de nube?_][15] para obtener más información sobre los beneficios de instalar el Datadog Agent en tus instancias.


## Solucionar problemas
Consulta la [Guía para solucionar problemas de Azure][16].

¿Necesitas más ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][17].


## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/es/getting_started/agent/
[2]: https://www.datadoghq.com/
[3]: https://docs.datadoghq.com/es/getting_started/site/#access-the-datadog-site
[4]: https://docs.datadoghq.com/es/integrations/guide/azure-manual-setup/?tab=manual#creating-the-app-registration
[5]: https://learn.microsoft.com/en-us/azure/event-hubs/event-hubs-create
[6]: https://docs.datadoghq.com/es/integrations/guide/azure-programmatic-management/?tab=windows
[7]: https://docs.datadoghq.com/es/integrations/guide/azure-manual-setup/?tab=azurecli
[8]: https://learn.microsoft.com/en-us/azure/azure-monitor/reference/supported-metrics/metrics-index
[9]: https://docs.datadoghq.com/es/integrations/#cat-azure
[10]: https://docs.datadoghq.com/es/logs/guide/azure-logging-guide/?tab=automatedinstallation
[11]: https://docs.datadoghq.com/es/integrations/guide/azure-portal/?tab=vmextension#install
[12]: https://docs.datadoghq.com/es/integrations/guide/azure-portal/?tab=aksclusterextension#install
[13]: https://docs.datadoghq.com/es/integrations/guide/azure-manual-setup/?tab=vmextension#agent-installation
[14]: https://docs.datadoghq.com/es/integrations/guide/azure-manual-setup/?tab=aksclusterextension#agent-installation
[15]: https://docs.datadoghq.com/es/agent/guide/why-should-i-install-the-agent-on-my-cloud-instances/
[16]: https://docs.datadoghq.com/es/integrations/guide/azure-troubleshooting/
[17]: https://docs.datadoghq.com/es/help/
[18]: https://docs.datadoghq.com/es/logs/guide/azure-native-logging-guide/