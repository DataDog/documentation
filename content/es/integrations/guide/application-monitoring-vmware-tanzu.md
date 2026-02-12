---
description: Datadog Application Monitoring para VMware Tanzu
further_reading:
- link: https://www.datadoghq.com/blog/monitor-tanzu-application-service/
  tag: Blog
  text: Monitorizar aplicaciones que se ejecutan en el servicio de la aplicación VMware
    Tanzu
- link: /integrations/guide/cluster-monitoring-vmware-tanzu/
  tag: documentation
  text: Datadog Cluster Monitoring para VMware Tanzu
- link: /tracing/
  tag: documentation
  text: Monitorizar el rendimiento de tu aplicación
- link: /developers/dogstatsd/
  tag: documentation
  text: Enviar métricas personalizadas a Datadog utilizando DogStatsD
title: Datadog Application Monitoring para VMware Tanzu
---


## Información general

Datadog Application Monitoring para VMWare Tanzu permite a los usuarios de VMware Tanzu monitorizar el estado y el rendimiento de tus aplicaciones.
Incluye los tres componentes siguientes:

* DogStatsD
* Trace Agent
* Container Agent

Puedes utilizar DogStatsD para introducir tus métricas de aplicación personalizadas en Datadog. DogStatsD es un servicio de agregación de métricas que implementa el protocolo StatsD y añade algunas extensiones específicas de Datadog. Para obtener más información, consulta la documentación de [DogStatsD][5]. Además, Datadog proporciona una lista de librerías DogStatsD que puedes utilizar para buscar las [bibliotecas][9] compatibles con tu aplicación.

Trace Agent es un servicio que recopila trazas (traces) de aplicaciones de varias fuentes y las reenvía a Datadog APM. Para obtener más información, consulta la documentación sobre [rastreo][7].

Container Agent es una versión más pequeña y ligera del [Datadog Agent][6] que puede reenviar métricas y logs a Datadog. Para obtener más información, consulta la documentación sobre [logs][8]. Cuando está habilitado, el comportamiento por defecto es que todos los logs de `stdout` y `stderr` sean recopilados y reenviados por TCP al Container Agent.

## Características principales
Datadog Application Monitoring para VMware Tanzu incluye las siguientes características principales:

* Monitorización del rendimiento de las aplicaciones
* Reenvío de métricas, logs y trazas a Datadog

## Requisitos previos
Datadog Application Monitoring para VMware Tanzu tiene los siguientes requisitos:

* Antes de configurar el cuadro, debes tener una [cuenta de Datadog][4] o crear una.
* Debes generar una [clave de API Datadog][3].

## Instalación

1. Descarga el archivo del producto para **Datadog Application Monitoring para VMware Tanzu** de la página de la [red Tanzu][10].
2. Ve al dashboard de instalación de Tanzu Ops Manager y haz clic en **Import a Product** (Importar un producto) para cargar el archivo del producto.
3. Selecciona el archivo del producto descargado en el paso **1**. Esto añade el cuadro a tu área de staging.
4. Haz clic en el cuadro de **Datadog Application Monitoring para VMware Tanzu** recién añadido.
5. Haz clic en **Save** (Guardar).
6. Vuelve a la instalación del dashboard de Tanzu Ops Manager y haz clic en **Apply changes** (Aplicar cambios) para el cuadro de Datadog Application Monitoring para VMware Tanzu.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[2]: /es/help
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: https://app.datadoghq.com/signup
[5]: /es/developers/dogstatsd/?tab=hostagent
[6]: /es/agent/
[7]: /es/tracing/
[8]: /es/logs/
[9]: /es/libraries/
[10]: https://network.pivotal.io/products/datadog-application-monitoring/
