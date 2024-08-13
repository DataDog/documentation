---
description: Aprende a utilizar RUM y Session Replay para monitorizar tendencias en
  el comportamiento de los usuarios y en la adopción de funciones.
further_reading:
- link: /real_user_monitoring/explorer/
  tag: Documentación
  text: Información sobre el Explorador RUM
- link: /real_user_monitoring/
  tag: Documentación
  text: Aprender a visualizar tus datos RUM
- link: /real_user_monitoring/browser/frustration_signals/
  tag: Documentación
  text: Más información sobre las señales de frustración
- link: /real_user_monitoring/session_replay
  tag: Documentación
  text: Más información sobre Session Replay
- link: /dashboards/guide/powerpacks-best-practices/
  tag: Documentación
  text: Más información sobre powerpacks
title: Uso de RUM y Session Replay para el análisis de productos
---

## Información general

[RUM & Session Replay][1] te permiten monitorizar tendencias en el comportamiento de los consumidores y descubrir respuestas sobre el uso de tus aplicaciones web y móviles.

En esta guía se analizan diversos casos de uso para enriquecer tus datos de RUM & Session Replay y responder a preguntas relacionadas con el análisis de productos.

## Configuración

Una vez que hayas configurado el SDK de RUM en Datadog, enriquezca los datos de tu [navegador][2] o de tus ([iOS][3] y [Android][4]) móviles con atributos para personalizar los datos según tu caso de uso. Por ejemplo, añadir información contextual te permite [identificar sesiones vinculadas a usuarios específicos][4].

## Monitorización del tráfico de páginas y del uso de funciones

Si te interesa saber en qué botones hacen más clic tus usuarios, puedes hacer un seguimiento del tráfico de la página y del uso de los botones de tu aplicación. 

1. En el [Explorador RUM][5], selecciona **Acciones** en el menú desplegable situado junto a la consulta de búsqueda. 
2. Introduce `@view.name:/cart` en la consulta de búsqueda y selecciona el tipo de visualización **Lista principal**.
3. En el campo `by` de la sección `Group into fields` anterior, selecciona **Nombre de la acción** en el menú desplegable del grupo.

Este ejemplo muestra las principales acciones en la página `/cart` de Shopist.

{{< img src="real_user_monitoring/guide/rum-for-product-analytics/actions_in_cart_page-2.png" alt="Consulta de búsqueda de acciones en la página del carro de compras de Shopist" style="width:90%;">}}

Para investigar qué usuarios hacen clic en estos botones, modifica la consulta de búsqueda seleccionando el tipo de visualización **Tabla** y haciendo clic en **+** para añadir otro campo `group` para `@user.name`.

{{< img src="real_user_monitoring/guide/rum-for-product-analytics/actions_by_user_name_in_cart_page-3.png" alt="Consulta de búsqueda de acciones agrupadas por nombre de usuario en la página del carro de compras de Shopist" style="width:90%;">}}

## Análisis de la tasa de conversión de los flujos (flows) de trabajo principales

Utiliza el [tipo de visualización de embudo][6] para realizar un seguimiento de la tasa de conversión en áreas cruciales de tu sitio web. 

Una vez que hayas creado un embudo basado en vistas o acciones en tu sitio web, puedes utilizarlo de las siguientes maneras:

* Crea una [vista guardada][7] para hacer referencia a ella en el RUM y Session Replay.
* [Expórtala][8] a un dashboard, donde podrá analizar la tasa de conversión en el contexto de los datos telemétricos adicionales.
* Haz clic en un paso del embudo para mostrar el [panel lateral](#view-funnel-analysis) del **Análisis de embudo**.

### Añadir una vista guardada

{{< img src="real_user_monitoring/guide/rum-for-product-analytics/explorer_saved_view.mp4" alt="Agregar una vista guardada en el Explorador RUM" video="true" width=90% >}}

### Exportar el embudo

{{< img src="real_user_monitoring/guide/rum-for-product-analytics/explorer_funnel_export.png" alt="Exportar una visualización de embudo en el Explorador RUM" style="width:90%;" >}}

### Ver análisis de embudo

El panel lateral contiene información detallada sobre el tiempo de carga de una vista individual, las tasas de conversión y abandono en función del país, el tipo de dispositivo, el navegador y la versión y los [problemas][9] pendientes que se produjeron en la página.

{{< img src="real_user_monitoring/guide/rum-for-product-analytics/funnel_analysis_side_panel.mp4" alt="Panel lateral del análisis de embudo que muestra las tasas de conversión, las tasas de abandono, el rendimiento de la página, los errores y el comportamiento del usuario" width=90%; vídeo="true" >}}

## Identificar a tus usuarios más frustrados

Las [Señales de frustración][10] indican los momentos en los que los usuarios expresan un comportamiento frustrado (un clic de rabia, un clic sin motivo o un clic por error) para que puedas abordar los problemas más acuciantes a los que se enfrentan los usuarios. Examina el comportamiento de los usuarios para identificar las áreas de tu sitio web en las que se atascan. 

1. En el [Explorador RUM][5], selecciona **Vistas** en el menú desplegable.
2. Introduce `@view.frustration.count:>=2` en la consulta de búsqueda y selecciona el tipo de visualización **Lista principal**.
3. En el campo `by` de la sección `Group into fields` anterior, selecciona **Nombre de la vista** en el menú desplegable del grupo.

Esta consulta busca las páginas principales en las que se han producido al menos dos señales de frustración.

{{< img src="real_user_monitoring/guide/rum-for-product-analytics/frustration_signal_query-1.png" alt="Consulta de búsqueda de las vistas que contienen más de dos señales de frustración en el Explorador RUM" style="width:90%;" >}}

Además de analizar las vistas principales, también conviene investigar los botones y elementos con los que los usuarios expresan frustración. 

1. Selecciona **Acciones** en el menú desplegable.
2. Introduce `@action.frustration.type:dead_click` en la consulta de búsqueda y selecciona el tipo de visualización **Tabla**.
3. Haz clic en la consulta de búsqueda y selecciona `@action.frustration.type:error_click` y ``@action.frustration.type:rage_click`` para incluir esos valores en tu consulta. El campo **buscar por** se actualiza a `Tipo de frustración de la acción:(3 términos)`.
4. En el campo `by` de la sección `Group into fields` siguiente, selecciona **Nombre de la acción** en el menú desplegable del grupo y haz clic en **+** para añadir otro campo `group` para **Tipo de frustración de la acción**.

Esta consulta enumera todas las veces que un usuario expresa cualquier tipo de señal de frustración y contabiliza las acciones únicas en las que se produjo la frustración.

{{< img src="real_user_monitoring/guide/rum-for-product-analytics/multi_group_frustration_type_search-3.png" alt="Consulta de búsqueda que enumera y contabiliza las acciones por las que un usuario ha expresado tres tipos de señales de frustración en la página del carro de compras de Shopist" style="width:90%;">}}

## Observar la experiencia del usuario en Session Replay

Puedes observar visualmente el impacto que tienen las experiencias de usuario deficientes en tus usuarios. Por ejemplo, si has creado un embudo y observas que la tasa de abandono es excepcionalmente alta entre los pasos, puedes ver una [grabación de Session Replay][11] para ver qué ha hecho un usuario antes de abandonar. 

En una visualización de embudo, puedes acceder al panel lateral **Análisis de embudo** y hacer clic en **Reproducir sesión de muestra** en las sesiones en las que los usuarios han continuado con otro paso o han abandonado.

{{< img src="real_user_monitoring/guide/rum-for-product-analytics/funnel_sample_session_replay-2.mp4" alt="Panel lateral del análisis de embudo que contiene enlaces a Session Replay" width=90%; video="true" >}}

Con Session Replay, puedes identificar qué partes de tu producto resultan confusas para los usuarios y deben mejorarse para aumentar la conversión. 

## Seguimiento de los patrones de uso de los powerpacks

Los [Powerpacks][12] son grupos de plantillas de widgets de dashboards para patrones de monitorización y de análisis de productos comunes. 

Utiliza el powerpack predefinido Uso de funciones RUM para comprender mejor los diferentes patrones de tráfico de una acción específica en tu aplicación.

1. Ve a [**Dashboard** > **Nuevo dashboard**][13] y haz clic en **+ Añadir widgets o powerpacks**. 
2. En la pestaña **Powerpacks**, busca powerpacks RUM introduciendo `tag:rum` en la barra de búsqueda y selecciona **Uso de funciones RUM**. Por defecto, los valores de `@view.name` y `@action.name` están configurados en `*`. 
3. Personaliza tu powerpack seleccionando valores en los menús desplegables y haz clic en **Añadir a dashboard** para utilizar un atributo como variable de plantilla.
4. Haz clic en **Confirmar** para añadir el powerpack a tu dashboard.

Este powerpack proporciona gráficos sobre el uso por país, acciones en una vista y acciones a lo largo del tiempo, además del recuento de acciones y el porcentaje de frecuencia de uso en la página del `/cart` de Shopist.

{{< img src="dashboards/guide/powerpacks_best_practices/configure_powerpack.png" alt="Powerpack Uso de funciones RUM para monitorizar la acción Aplicar cupón, en la página del carro de compras" style="width:100%;" >}} 

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/real_user_monitoring/
[2]: /es/real_user_monitoring/browser/advanced_configuration/?tab=npm#enrich-and-control-rum-data
[3]: /es/real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/ios/?tab=swift#enrich-user-sessions
[4]: /es/real_user_monitoring/android/advanced_configuration/?tab=kotlin#enrich-user-sessions
[5]: https://app.datadoghq.com/rum/explorer
[6]: /es/product_analytics/journeys/funnel_analysis
[7]: /es/real_user_monitoring/explorer/saved_views/
[8]: /es/real_user_monitoring/explorer/export/
[9]: /es/real_user_monitoring/error_tracking/
[10]: /es/real_user_monitoring/browser/frustration_signals/
[11]: /es/real_user_monitoring/session_replay/browser/
[12]: /es/dashboards/guide/powerpacks-best-practices/
[13]: https://app.datadoghq.com/dashboard/lists