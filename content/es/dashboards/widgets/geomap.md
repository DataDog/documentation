---
aliases:
- /es/graphing/widgets/geomap/
further_reading:
- link: /dashboards/graphing_json/
  tag: Documentación
  text: Creación de dashboards con JSON
- link: /notebooks/
  tag: Documentación
  text: Notebooks
title: Widget Geomap
widget_type: geomap
---

El widget geomap visualiza datos geográficos con regiones o puntos sombreados. Puede utilizarse para:
- Ver las sesiones de usuario por país.
- Aplicar filtros para ver una lista de todas las sesiones en una nueva pestaña.
- Ver sesiones de usuario filtradas por empleado.
- Monitorizar las métricas de rendimiento como el tiempo de carga, los valores de estado de la web y el porcentaje de vistas con errores.

{{< img src="/dashboards/widgets/geomap/geomap-points.png" alt="Visualización de geomap con la superposición de puntos" >}}

## Configuración

{{< img src="dashboards/widgets/geomap/geomap_setup2.png" alt="Gráfico de geomap de tu sección de datos de la configuración de widget">}}

### Configuración
1. Elige la capa de visualización:
    * **Regiones**: medidas agregadas a nivel de país.
    * **Puntos**: superposición de eventos como puntos en el mapa para mostrar datos geográficos del evento.

2. Elige los datos a graficar: <br>
  **Nota**: La compatibilidad con las fuentes de datos varía en función de la capa de visualización seleccionada.
  {{< tabs >}}
  {{% tab "Regions" %}}
  | Fuente de datos | Notas | 
  | -------------- | -------- |
  |Eventos de log   | El grupo por etiqueta (tag) debe incluir un código ISO de país con el formato ISO alfa-2. Puedes utilizar el [Procesador GeoIP][1] para hacer esto, o puedes incluir de forma manual las [etiquetas en la incorporación][2]. Consulta la [documentación de búsqueda de logs][3] para configurar una consulta de eventos de log.|
  |Métrica   |  El grupo por etiqueta debe incluir un código ISO de país con el formato ISO alfa-2. Puedes [generar las métricas a partir de logs incorporados][4], o puedes incluir de forma manual las [etiquetas en la incorporación][2]. Consulta la [documentación de consulta][5] para configurar una consulta de métrica.|
  |RUM | Consulta la [documentación de RUM][6] para configurar una consulta de RUM. |
  |SLO | Consulta la [documentación de búsqueda de SLO][7] para configurar una consulta de SLO. |
  |Señales de seguridad <br> Application Security <br> Audit Trail | Consulta la [documentación de búsqueda de log][3] para configurar una consulta. |

  [1]: /logs/log_configuration/processors/#geoip-parser
  [2]: /getting_started/tagging/#define-tags
  [3]: /logs/search_syntax/
  [4]: /logs/logs_to_metrics/
  [5]: /dashboards/querying/
  [6]: /real_user_monitoring/explorer/search_syntax/
  [7]: /service_management/service_level_objectives/#searching-slos
  {{% /tab %}}

  {{% tab "Points" %}}
  |  Fuente de datos | Notas |
  | -----------  | ----- | 
  |Eventos de log   | El grupo por etiqueta debe incluir un código ISO de país con el formato ISO alfa-2. Puedes utilizar el [Procesador de GeoIP][1] para hacer esto, o puedes incluir de forma manual las [etiquetas en la incorporación][2]. Consulta la [documentación de búsqueda de logs][3] para configurar una consulta de evento de log. |
  |RUM   | Consulta la [documentación de RUM][4] para configurar una consulta de RUM. |

  [1]: /logs/log_configuration/processors/#geoip-parser
  [2]: /getting_started/tagging/#define-tags
  [3]: /logs/search_syntax/
  [4]: /real_user_monitoring/explorer/search_syntax/
  {{% /tab %}}
  {{< /tabs >}}

3. Opcional: configura tu cuadro de vista para especificar dónde quieres enfocar el mapa inicialmente.

### Opciones

#### Enlaces contextuales

Los [enlaces contextuales][7] se encuentran habilitados de manera predeterminada y se pueden activar o desactivar. Los enlaces contextuales conectan los widgets del dashboard con otras páginas (en Datadog, o de terceros).

## API

Este widget se puede usar con la **[API de dashboards][8]**. Consulta la siguiente tabla para obtener la [definición del esquema JSON del widget][9]:

{{< dashboards-widgets-api >}}

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/logs/log_configuration/processors/#geoip-parser
[2]: /es/getting_started/tagging/#define-tags
[3]: /es/logs/search_syntax/
[4]: /es/logs/logs_to_metrics/
[5]: /es/dashboards/querying/
[6]: /es/real_user_monitoring/explorer/search_syntax/
[7]: /es/dashboards/guide/context-links/
[8]: /es/api/latest/dashboards/
[9]: /es/dashboards/graphing_json/widget_json/