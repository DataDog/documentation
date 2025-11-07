---
aliases:
- /es/graphing/widgets/geomap/
description: Visualiza datos geográficos con regiones o puntos sombreados para mostrar
  métricas y patrones basados en ubicaciones.
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

{{< img src="/dashboards/widgets/geomap/geomap_zoom_region.mp4" alt="Haciendo zoom en una región con el widget Geomapa" video=true >}}

## Configuración

{{< img src="dashboard/widgets/geomap/geomap_setup3.png" alt="Grafica en geomapas tu sección de datos de configuración de widgets">}}

### Configuración
1. Elige la capa de visualización:
    * **Regiones**: Medidas agregadas a nivel de país o subdivisiones de país.
    * **Puntos**: superposición de eventos como puntos en el mapa para mostrar datos geográficos del evento.

2. Elige los datos a graficar: <br>
  **Nota**: La compatibilidad con las fuentes de datos varía en función de la capa de visualización seleccionada.
  {{< tabs >}}
  {{% tab "Regions" %}}
  | Origen de los datos | Notas |
  | -------------- | -------- |
  |Eventos de logs | El grupo por etiqueta (tag) debe incluir un código ISO de país (formato ISO alfa-2) o un código ISO de subdivisión de país (formato ISO-3166-2). Para ello, puedes utilizar el [Procesador GeoIP][1] o incluir manualmente las [etiquetas en la ingesta][2]. Consulta la [documentación sobre la búsqueda de logs][3] para configurar una consulta de eventos de logs.|
  |Métrica | El grupo por etiqueta debe incluir un código ISO de país (formato ISO alfa-2) o un código ISO de subdivisión de país (formato ISO-3166-2). Puedes [generar métricas a partir de la ingesta de logs][4] o incluir manualmente las [etiquetas en la ingesta][2]. Consulta la [documentación sobre consultas][5] para configurar una consulta de métricas.|
  |RUM | Consulta la [documentación de RUM][6] para configurar una consulta de RUM. |
  |SLO | Consulta la [documentación de búsqueda de SLO][7] para configurar una consulta de SLO. |
  |Señales de seguridad <br> Protección de aplicaciones y API <br> Audit Trail | Consulta la [documentación de búsqueda de logs][3] para configurar una consulta. |

  [1]: /logs/log_configuration/processors/#geoip-parser
  [2]: /getting_started/tagging/#define-tags
  [3]: /logs/search_syntax/
  [4]: /logs/logs_to_metrics/
  [5]: /dashboards/querying/
  [6]: /real_user_monitoring/explorer/search_syntax/
  [7]: /service_management/service_level_objectives/#searching-slos
  {{% /tab %}}

  {{% tab "Puntos" %}}
  |  Origen de los datos | Notas |
  | -----------  | ----- |
  | Eventos de logs | El grupo por etiqueta debe incluir un código ISO de país que siga el formato ISO alfa-2. Para ello, puedes utilizar el [Procesador GeoIP][1] o incluir manualmente las [etiquetas en la ingesta][2]. Consulta la [documentación sobre la búsqueda de logs][3] para configurar una consulta de eventos de logs. |
  | RUM | Consulta la [documentación de RUM][4] para configurar una consulta RUM. |

  **Nota**: La capa Puntos muestra un máximo de 100.000 eventos a la vez.

  [1]: /logs/log_configuration/processors/#geoip-parser
  [2]: /getting_started/tagging/#define-tags
  [3]: /logs/search_syntax/
  [4]: /real_user_monitoring/explorer/search_syntax/
  {{% /tab %}}
  {{< /tabs >}}

3. (Opcional) En **Visual Options** (Opciones visuales), utiliza el desplegable **Set widget default view** (Configurar vista por defecto del widget) para seleccionar dónde enfocar inicialmente el mapa. Selecciona **Custom* (Personalizar) para definir una región personalizada, o busca el nombre de un país, estado o provincia.

### Opciones

#### Enlaces contextuales

Los [enlaces contextuales][7] se encuentran habilitados de manera predeterminada y se pueden activar o desactivar. Los enlaces contextuales conectan los widgets del dashboard con otras páginas (en Datadog, o de terceros).

#### Reglas de formato visual

Personaliza el color de la capa de región de tu widget Geomap con reglas condicionales.

## API

Este widget puede utilizarse con la **[API de dashboards][8]**. Consulta la siguiente tabla para ver la [definición de widget del esquema JSON][9]:

{{< dashboards-widgets-api >}}

## Referencias adicionales

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