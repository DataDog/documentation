---
description: Conoce las diferencias entre las versiones más recientes (V2) y legacy
  (V1) de integraciones basadas en OpenMetrics.
title: Versiones más reciente y legacy para integraciones basadas en OpenMetrics
---

## Información general

Algunas de las integraciones basadas en Datadog OpenMetrics, incluida la integración genérica de OpenMetrics, admiten dos modos de funcionamiento: más reciente y legacy. Estos dos modos vienen con diferentes valores por defecto y parámetros de configuración.

Última versión
: Datadog recomienda utilizar la versión `latest` y hacer referencia a la versión `latest` de la documentación al configurar desde cero una integración basada en OpenMetrics en la última versión del Agent.

Legacy
: la versión `legacy` se mantiene solo por razones de compatibilidad con versiones anteriores, principalmente para permitir que integraciones sigan funcionando después de una actualización de Agent sin que sea necesario un cambio en la configuración. </br></br> Si has configurado una integración basada en OpenMetrics en el pasado, es posible que estés utilizando la versión antigua, en cuyo caso puedes utilizar el ejemplo de configuración `legacy` enlazado desde la documentación como referencia. Datadog recomienda migrar a la versión `latest` cuando sea posible.

## Métricas dependientes del modo

Las integraciones con los modos `latest` y `legacy` pueden producir diferentes subconjuntos de métricas, indicados en la documentación y en las descripciones de métricas dentro de la aplicación como OpenMetrics V2 (`latest`) y OpenMetrics V1 (`legacy`).

En el modo `latest`, las métricas se envían de forma más precisa por defecto y se comporta de forma más parecida a los tipos de métricas de Prometheus. Por ejemplo, las métricas de Prometheus que terminan en `_count` y `_sum` se envían por defecto como `monotonic_count`.

Cuando busques nombres de métrica en el sitio de Datadog o configures [dashboards][3] y [monitores][4], asegúrate de utilizar métricas apropiadas para tu versión de la integración.

## Modos de integración basada en OpenMetrics

Aunque puede variar para cada integración basada en OpenMetrics, puedes activar el modo `latest` de cualquiera de las siguientes maneras:

* Establecer `openmetrics_endpoint` en un endpoint de destino.
* Establecer `use_openmetrics` en true.

## Historial de las últimas versiones y legacy

<div class="alert alert-info">Datadog evita en la medida de lo posible introducir cambios de ruptura en las integraciones, para que los clientes puedan actualizar el Datadog Agent sin necesidad de realizar grandes cambios en la configuración. Este compromiso con la compatibilidad reversa dificulta la resolución de los problemas de diseño existentes en la configuración y el comportamiento por defecto.</div>

Dado que el formato de OpenMetrics se utiliza habitualmente para exportar métricas, muchas integraciones se basan en él. Estas integraciones comparten un conjunto de opciones de configuración y un comportamiento predeterminado. Datadog se compromete a ofrecer una experiencia mejorada en la versión `latest` y a mantener la experiencia original en la versión `legacy`.  

Para más información, consulta la documentación correspondiente de la integración basada en OpenMetrics.

[3]: /es/dashboards/
[4]: /es/monitors/