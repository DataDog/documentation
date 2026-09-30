---
description: Monitorización de clústeres de Datadog para VMware Tanzu
further_reading:
- link: https://www.datadoghq.com/blog/collecting-pcf-logs/
  tag: Blog
  text: Recopilación de logs y métricas de la plataforma Pivotal
- link: https://www.datadoghq.com/blog/pcf-monitoring-with-datadog/
  tag: Blog
  text: Monitorización de plataforma Pivotal con Datadog
- link: /integrations/guide/application-monitoring-vmware-tanzu/
  tag: documentation
  text: Monitorización de aplicaciones de Datadog para VMware Tanzu
title: Monitorización de clústeres de Datadog para VMware Tanzu
---


## Información general

La Monitorización de clúster de Datadog para VMware Tanzu combina el [Datadog Firehose Nozzle][6] con el [Datadog Agent][7], y permite a los usuarios y administradores de VMware Tanzu monitorizar el estado y el rendimiento de tus clústeres de VMware Tanzu.
Consta de los tres componentes siguientes:

* El Datadog Firehose Nozzle
* El Datadog Agent
* El Datadog Cluster Agent

El Datadog Firehose Nozzle es un componente de [Cloud Foundry][8] que reenvía métricas desde el [Loggregator Firehose][14] a la plataforma de monitorización de Datadog a la plataforma. Cualquier implementación de Cloud Foundry puede enviar métricas y eventos a Datadog. Los datos te ayudan a realizar un seguimiento del estado y la disponibilidad de todos los nodos de tu implementación, monitorizar los trabajos que ejecutan, recopilar métricas de Loggregator Firehose y mucho más.

## Requisitos previos

La Monitorización de clúster de Datadog para VMware Tanzu tiene los siguientes requisitos:

* Debes tener o crear una [cuenta de Datadog][4] antes de configurar el cuadro.
* Debes generar una [clave de API de Datadog][3].

## Características principales

La Monitorización de clúster de Datadog para VMware Tanzu incluye las siguientes características clave:

* Visualización de todas las métricas operativas a nivel de clúster y KPIs.
* Alertas en el clúster de VMware Tanzu y el estado de los componentes.
* Monitorización de puestos de trabajo.
* Seguimiento e informes de eventos de BOSH.
* Autodiscovery de integraciones.

## Instalación

1. Descarga el archivo de producto **Datadog Cluster Monitoring for VMware Tanzu** (Monitorización de clúster de Datadog para VMware Tanzu) desde la [red de Pivotal][11].
1. Ve al dashboard de instalación de Tanzu Ops Manager y haz clic en **Import a Product** (Importar un producto) para cargar el archivo del producto.
1. Haz clic en **Import a Product** (Importar un producto) para cargar el archivo del producto.
1. Selecciona el archivo de producto descargado en el paso **1**. Esto añade el cuadro a tu área de preparación.
1. Haz clic en el nuevo cuadro **Datadog Cluster Monitoring for VMware Tanzu** (Monitorización de clúster de Datadog para VMware Tanzu) .
1. Introduce tu [clave de API de Datadog][3] en la sección **Datadog Config** (Configuración de Datadog). No modifiques la URL de la API de Datadog, a menos que [el soporte de Datadog][2] te indique lo contrario.
1. Crea una cuenta de cliente de UAA para Datadog utilizando la [CLI de UAA][12]. El Firehose Nozzle requiere acceso al Loggregator Firehose.
    ```sh
    $ uaac client add datadog-firehose-nozzle \
         --name datadog-firehose-nozzle \
         --scope doppler.firehose,cloud_controller.admin_read_only,oauth.login \
         --authorities doppler.firehose,cloud_controller.admin_read_only,openid,oauth.approvals \
         --authorized_grant_types client_credentials,refresh_token \
         --access_token_validity 1209600 \
         -s $CLIENT_SECRET
    ```

1. En la sección **Cloud Foundry Settings** (Configuración de Cloud Foundry), especifica un cliente de UAA y un secreto de UAA del paso anterior.
1. Si Ops Manager requiere que cargues una célula madre, [descarga una célula madre][13] de la línea 621 de lanzamientos. Cárgala en Ops Manager con el botón **Import Stemcell** (Importar célula madre).
1. La sección **Datadog Firehose Nozzle Config** (Configuración de Datadog Firehose Nozzle) contiene configuraciones opcionales para el Nozzle, y la sección **Datadog Agent Config** (Configuración del Datadog Agent) contiene configuraciones opcionales para el Agent. No es necesario configurar nada en ninguna de las dos secciones.
    <p class='note'><strong>Nota:</strong> Si utilizas una única cuenta de Datadog para monitorizar varias fundaciones, debes marcar la casilla <strong>Use UUID Hostname</strong> (Utilizar UUID de nombre de host).</p>
1. La sección **Datadog Cluster Agent Settings** (Configuración de Datadog Cluster Agent) contiene configuraciones para el [Datadog Cluster Agent][15] que proporciona Autodiscovery de integraciones y características de contenedor de aplicaciones.
Introduce un **Authentication token** (Token de autenticación) en **Datadog Cluster Agent Settings** (Configuración de Datadog Cluster Agent), una cadena de 32 caracteres o más. Este token se comparte tanto por el Cluster Agent como por Datadog Agents para asegurar la comunicación.
1. Vuelve al dashboard de instalación de Tanzu Ops Manager.
1. Selecciona todos los cuadros en los que quieres instalar el Agent.
1. Haz clic en **Apply Changes** (Aplicar cambios) para instalar Datadog Cluster Monitoring para el cuadro de VMware Tanzu.

## Ver métricas y dashboards

1. Revisa el dashboard de [Información general] de Cloud Foundry [18].

 {{< img src="/integrations/guide/vmware_tanzu/cloud-foundry-dashboard_2.png" alt="El dashboard de Información general de Cloud Foundry" >}}

2. Explora cada una de las métricas en la página [Metrics Explorer][19], busca métricas a partir de `cloudfoundry.nozzle`:

 {{< img src="/integrations/guide/vmware_tanzu/metrics-explorer-cloud-foundry.png" alt="Métricas de Cloud Foundry que empiezan con cloudfoundry.nozzle" >}}

3. [Crea alertas][16] para tus métricas de Cloud Foundry.
4. Consulta la [integración de Datadog Cloud Foundry][17] para ver los pasos a seguir para solucionar problemas.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[2]: /es/help/
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: https://app.datadoghq.com/signup
[5]: /es/integrations/pivotal_platform/#monitor-your-pivotal-platform-cluster/
[6]: https://github.com/DataDog/datadog-firehose-nozzle
[7]: /es/agent/
[8]: /es/integrations/guide/cloud-foundry-setup/
[10]: /es/integrations/cloud_foundry/#configure-the-datadog-plugin-for-bosh-health-monitor
[11]: https://network.pivotal.io/products/datadog/
[12]: https://docs.pivotal.io/application-service/uaa/uaa-user-management.html
[13]: https://network.pivotal.io/products/stemcells-ubuntu-xenial/#/releases/721399
[14]: https://www.datadoghq.com/blog/pivotal-cloud-foundry-architecture/#loggregator
[15]: https://github.com/DataDog/datadog-cluster-agent-boshrelease#datadog-cluster-agent-bosh-release
[16]: /es/guides/monitors/
[17]: /es/integrations/cloud_foundry/
[18]: https://app.datadoghq.com/screen/integration/cloudfoundry
[19]: https://app.datadoghq.com/metric/explorer