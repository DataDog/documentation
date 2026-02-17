---
aliases:
- /es/integrations/cloud_foundry/
- /es/integrations/pivotal_platform/
categories:
- aprovisionamiento
- configuración y despliegue
- recopilación de logs
custom_kind: integración
dependencies:
- https://github.com/DataDog/documentation/blob/master/content/en/integrations/vmware_tanzu_application_service.md
description: Realiza un seguimiento del estado de tus máquinas virtuales de VMware
  Tanzu Application Service (anteriormente Pivotal Cloud Foundry) y de los trabajos
  que ejecutan.
doc_link: /integrations/vmware_tanzu_application_service/
further_reading:
- link: https://www.datadoghq.com/blog/pcf-monitoring-with-datadog/
  tag: Blog
  text: Monitorización de plataforma Pivotal con Datadog
- link: /integrations/guide/application-monitoring-vmware-tanzu/
  tag: documentación
  text: Monitorización de aplicaciones de Datadog para VMware Tanzu
- link: /integrations/guide/cluster-monitoring-vmware-tanzu/
  tag: documentación
  text: Monitorización de clústeres de Datadog para VMware Tanzu
integration_id: pivotal-platform
integration_title: VMware Tanzu Application Service
is_public: true
name: vmware_tanzu_application_service
newhlevel: true
public_title: Integración de Datadog y VMware Tanzu Application Service (Pivotal Cloud
  Foundry)
short_description: Realiza un seguimiento del estado de las máquinas virtuales de
  VMware Tanzu Application Service y de los trabajos que ejecutan.
updated_for_agent: 6.0
---

## Información general

Cualquier implementación de VMware Tanzu Application Service (anteriormente conocida como Pivotal Cloud Foundry, consulta el [anuncio de VMware][1] para obtener más información) puede enviar métricas y eventos a Datadog. Puedes realizar un seguimiento del estado y la disponibilidad de todos los nodos del despliegue, monitorizar los trabajos que ejecutan, recopilar métricas de Loggregator Firehose y mucho más.

Para obtener la mejor experiencia, utiliza esta página para configurar automáticamente la monitorización a través de Tanzu Ops Manager para tu aplicación en VMware Tanzu Application Service y tu clúster de VMware Tanzu Application Service. Para conocer los pasos de configuración manual, consulta la [Guía de configuración manual de VMware Tanzu Application Service][2].

Hay tres componentes principales para la integración de VMware Tanzu Application Service con Datadog. En primer lugar, el paquete de compilación se utiliza para recopilar las métricas personalizadas de tus aplicaciones. En segundo lugar, el BOSH Release recopila métricas de la plataforma. En tercer lugar, el Loggregator Firehose Nozzle recopila el resto de métricas de tu infraestructura. Lee la guía de [arquitectura de Datadog VMware Tanzu Application Service][3] para más información.

## Monitorizar tus aplicaciones

Utiliza la guía [de instalación y configuración de VMware Tanzu][4] para instalar la integración a través del Tanzu Ops Manager. Para los pasos de configuración manual, lee la sección [Monitorizar tus aplicaciones][5] de la guía de configuración manual.

### Configuración

#### Recopilación de métricas

Establece una clave de API en tu entorno para habilitar el paquete de compilación:

```shell
# set the environment variable
cf set-env <YOUR_APP> DD_API_KEY <DATADOG_API_KEY>
# restage the application to make it pick up the new environment variable and use the buildpack
cf restage <YOUR_APP>
```

#### Rastrear y recopilar perfiles

El Datadog Trace Agent (APM) está activado por defecto. Obtén más información sobre la configuración para tu lenguaje específico en [Configuración del APM][6] y [Configuración de perfiles][7].

#### Recopilación de logs

{{% site-region region="us3" %}}

La recopilación de logs no es compatible con este sitio.

{{% /site-region %}}

{{% site-region region="us,us5,eu,gov,ap1" %}}

##### Activar la recopilación de log

Para empezar a recopilar logs de tu aplicación en VMware Tanzu Application Service, el Agent contenido en el paquete de compilación debe estar activado y la recopilación de log habilitada.

```shell
cf set-env <YOUR_APP_NAME> DD_LOGS_ENABLED true
# Disable the Agent core checks to disable system metrics collection
cf set-env <YOUR_APP_NAME> DD_ENABLE_CHECKS false
# Redirect Container Stdout/Stderr to a local port so the Agent collects the logs
cf set-env <YOUR_APP_NAME> STD_LOG_COLLECTION_PORT <PORT>
# Configure the Agent to collect logs from the wanted port and set the value for source and service
cf set-env <YOUR_APP_NAME> LOGS_CONFIG '[{"type":"tcp","port":"<PORT>","source":"<SOURCE>","service":"<SERVICE>"}]'
# restage the application to make it pick up the new environment variable and use the buildpack
cf restage <YOUR_APP_NAME>
```

##### Configurar la recopilación de log

La siguiente tabla describe los parámetros anteriores y cómo pueden utilizarse para configurar la recopilación de log:

| Parámetro                 | Descripción                                                                                                                                |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `DD_LOGS_ENABLED`         | Selecciona `true` para activar la recopilación de log de Datadog Agent.                                                                                      |
| `DD_ENABLE_CHECKS`        | Establece en `false` para desactivar la recopilación de métricas de sistema del Agent a través de checks centrales.                                                       |
| `STD_LOG_COLLECTION_PORT` | Debe utilizarse cuando se recopilan logs de `stdout` o `stderr`. Redirige el flujo (stream) `stdout` o `stderr` al valor de puerto local correspondiente. |
| `LOGS_CONFIG`             | Utiliza esta opción para configurar el Agent escuche en un puerto TCP local y establece el valor de los parámetros `service` y `source`.          |

**Ejemplo:**

Una aplicación Java llamada `app01` se está ejecutando en VMware Tanzu Application Service. La siguiente configuración redirige el contenedor `stdout`/`stderr` al puerto local `10514`. A continuación, configura el Agent para recopilar logs de ese puerto y establece el valor adecuado para `service` y `source`:

```shell
# Redirect Stdout/Stderr to port 10514
cf set-env app01 STD_LOG_COLLECTION_PORT 10514
# Configure the Agent to listen to port 10514
cf set-env app01 LOGS_CONFIG '[{"type":"tcp","port":"10514","source":"java","service":"app01"}]'
```

##### Notificación en caso de configuración incorrecta de proxy

Para Agent versión 6.12 o posterior, cuando se utiliza una [configuración de proxy][101] con el paquete de compilación, se realiza un check si se puede establecer la conexión. La recopilación de log se inicia en función del resultado de este test.

Si la conexión no se establece y no se inicia la recopilación de log, aparecerá un evento como este en el [Event Explorer][102]. Configura un monitor para realizar un seguimiento de estos eventos y recibir una notificación cuando se despliegue un paquete de configuración mal configurado:

{{< img src="integrations/cloud_foundry/logs_misconfigured_proxy.png" alt="No se puede obtener un evento en Datadog con el título Endpoint de log - La recopilación de log no ha iniciado y hay un mensaje que indica que una conexión TCP no se pudo establecer" >}}

### Etiquetas (Tags)

Para añadir etiquetas (tags) personalizadas a tu aplicación, establece la variable de entorno `DD_TAGS` a través del archivo `manifest.yml` o del comando de la CLI CF:

```shell
# set the environment variable
cf set-env <YOUR_APP> DD_TAGS key1=value1,key2=value2
# restage the application to make it pick up the new environment variable and use the new tags
cf restage <YOUR_APP>
```

[101]: /es/agent/logs/proxy/
[102]: /es/events/explorer/

{{% /site-region %}}

### DogStatsD

Puedes utilizar [DogStatsD][10] para enviar métricas de aplicación personalizadas a Datadog. Consulta [Envío de métrica: DogStatsD][11] para obtener más información. Existe un lista de [bibliotecas de DogStatsD][12] compatible con una amplia gama de aplicaciones.

## Monitorizar tu clúster de VMware Tanzu Application Service

Utiliza la guía de [instalación y configuración de VMware Tanzu][13] para instalar la integración a través del Tanzu Ops Manager. Para los pasos de configuración manual, lee la sección [monitorizar tu clúster de VMware Tanzu Application Service][14] de la guía de configuración manual.

## Datos recopilados

### Métricas

Las siguientes métricas son enviadas por el Datadog Firehose Nozzle y llevan el prefijo `cloudfoundry.nozzle`. El Datadog Agent envía métricas desde cualquier check de Agent que configures en el tiempo de ejecución de Director y métricas [sistema][15], [red][16], [disco][17] y [NTP][18] por defecto.

El Datadog Firehose Nozzle solo recopila CounterEvents (como métricas, no eventos), ValueMetrics y ContainerMetrics; ignora LogMessages y Errors.

Tu lista específica de métricas puede variar en función de la versión de PCF y el despliegue. Datadog recopila métricas de recuento y gauge emitidas desde [Loggregator v2 API][19]. Consulta [Métricas de Cloud Foundry Component][20] para ver una lista de métricas emitidas por defecto.

{{< get-metrics-from-git "cloud-foundry">}}

[1]: https://tanzu.vmware.com/pivotal#:~:text=Pivotal%20Cloud%20Foundry%20%28PCF%29%20is%20now%20VMware%20Tanzu%20Application%20Service
[2]: /es/integrations/guide/pivotal-cloud-foundry-manual-setup
[3]: /es/integrations/faq/pivotal_architecture
[4]: /es/integrations/guide/application-monitoring-vmware-tanzu/
[5]: /es/integrations/guide/pivotal-cloud-foundry-manual-setup#monitor-your-applications
[6]: /es/tracing/setup/
[7]: /es/profiler/enabling/
[8]: /es/agent/logs/proxy/
[9]: /es/events/explorer/
[10]: /es/developers/dogstatsd/
[11]: /es/metrics/custom_metrics/dogstatsd_metrics_submission/
[12]: /es/libraries/
[13]: /es/integrations/guide/cluster-monitoring-vmware-tanzu/#installation
[14]: /es/integrations/guide/cloud-foundry-setup/#monitor-your-cloud-foundry-cluster
[15]: /es/integrations/system/#metrics
[16]: /es/integrations/network/#metrics
[17]: /es/integrations/disk/#metrics
[18]: /es/integrations/ntp/#metrics
[19]: https://github.com/cloudfoundry/loggregator-api
[20]: https://docs.cloudfoundry.org/running/all_metrics.html