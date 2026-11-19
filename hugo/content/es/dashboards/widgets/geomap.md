---
aliases:
- /es/graphing/widgets/geomap/
description: Visualice datos geográficos con regiones sombreadas o puntos para mostrar
  métricas y patrones basados en la ubicación.
further_reading:
- link: /dashboards/graphing_json/
  tag: Documentación
  text: Creación de tableros mediante JSON
- link: /notebooks/
  tag: Documentación
  text: Notebooks
title: Widget Geomap
widget_type: geomap
---
El widget Geomap visualiza datos geográficos con regiones sombreadas o puntos. Se puede utilizar para:
- Ver sesiones de usuario por país.
- Filtrar para ver una lista de todas las sesiones en una pestaña nueva.
- Ver sesiones de usuario filtradas por empleado.
- Monitorear métricas de rendimiento como el tiempo de carga, Core Web Vitals y el porcentaje de vistas con errores.
- Monitorear el estado de ubicaciones físicas, como tiendas o dispositivos, trazando métricas en un mapa.

{{< img src="/dashboards/widgets/geomap/geomap_zoom_region.mp4" alt="Acercar a una región en el widget Geomap" video=true >}}

## Configuración {#setup}

{{< img src="dashboards/widgets/geomap/geomap_setup3.png" alt="Sección Graph your data de la configuración del widget Geomap">}}

### Configuración {#configuration}
1. Elija la capa de visualización:
    * {{< ui >}}Regions{{< /ui >}}: Agregue medidas a nivel de país o subdivisiones de país.
    * {{< ui >}}Points{{< /ui >}}: Superponga eventos como puntos en el mapa para mostrar datos de eventos geográficos.

2. Elija los datos para graficar: <br>
  **Nota**: La compatibilidad con fuentes de datos varía según la capa de visualización que seleccione.
  {{< tabs >}}
  {{% tab "Regions" %}}
  |  Fuente de datos    | Notas    |
  | --------------  | -------- |
  |Log Events   | La etiqueta de agrupación debe incluir un código ISO de país (formato ISO alfa-2) o un código ISO de subdivisión de país (formato ISO-3166-2). Puede usar el [GeoIP Processor][1] para hacer esto, o incluir manualmente las [etiquetas durante la ingesta][2]. Consulte la [documentación de búsqueda de registros][3] para configurar una consulta de eventos de registro.|
  |Métrica   | La etiqueta de agrupación debe incluir un código ISO de país (formato ISO alfa-2) o un código ISO de subdivisión de país (formato ISO-3166-2). Puede [generar métricas a partir de registros ingeridos][4], o incluir manualmente las [etiquetas durante la ingesta][2]. Consulte la [documentación de consultas][5] para configurar una consulta de métricas.|
  |RUM   | Consulte la [documentación de RUM][6] para configurar una consulta de RUM. |
  |SLO | Consulte la [documentación de búsqueda de SLO][7] para configurar una consulta de SLO. |
  |Security Signals <br> App and API Protection <br> Audit Trail | Consulte la [documentación de búsqueda de registros][3] para configurar una consulta. |

  [1]: /logs/log_configuration/processors/geoip_parser/
  [2]: /getting_started/tagging/#define-tags
  [3]: /logs/search_syntax/
  [4]: /logs/logs_to_metrics/
  [5]: /dashboards/querying/
  [6]: /real_user_monitoring/explorer/search_syntax/
  [7]: /service_level_objectives/#searching-slos
  {{% /tab %}}

  {{% tab "Points" %}}
  |  Fuente de datos | Notas |
  | -----------  | ----- |
  |Log Events   | La etiqueta de agrupación debe incluir un código ISO de país que siga el formato ISO alfa-2. Puede usar el [GeoIP Processor][1] para hacer esto, o incluir manualmente las [etiquetas durante la ingesta][2]. Consulte la [documentación de búsqueda de registros][3] para configurar una consulta de eventos de registro. |
  |RUM   | Consulte la [documentación de RUM][4] para configurar una consulta de RUM. |
  |Métrica   | Las consultas de métricas no incluyen coordenadas geográficas. Para graficar métricas, una su consulta con una Reference Table que proporcione coordenadas de latitud y longitud. Consulte [Graficar métricas con una Reference Table](#plot-metrics-with-a-reference-table). |

  **Nota**: La capa Points muestra un máximo de 100,000 eventos a la vez.
  
  [1]: /logs/log_configuration/processors/geoip_parser/
  [2]: /getting_started/tagging/#define-tags
  [3]: /logs/search_syntax/
  [4]: /real_user_monitoring/explorer/search_syntax/
  {{% /tab %}}
  {{< /tabs >}}

3. (Opcional) En {{< ui >}}Visual Options{{< /ui >}}, use el menú desplegable {{< ui >}}Set widget default view{{< /ui >}} para seleccionar dónde enfocar inicialmente el mapa. Seleccione {{< ui >}}Custom{{< /ui >}} para definir una región personalizada o busque el nombre de un país, estado o provincia.

### Graficar métricas con una Reference Table {#plot-metrics-with-a-reference-table}

Las consultas de métricas no incluyen coordenadas geográficas. Para graficar métricas en una capa {{< ui >}}Points{{< /ui >}}, una su consulta de métricas con una [Reference Table][10] que proporcione coordenadas de latitud y longitud. La Reference Table también puede proporcionar metadatos, como nombres de ubicaciones, para mostrar en el mapa.

Antes de comenzar, configure lo siguiente:
- Una métrica etiquetada con un valor que identifique cada ubicación, como `store_id`.
- Una Reference Table con una columna cuyos valores coincidan con esa etiqueta, además de una columna de latitud y una columna de longitud para cada ubicación. Los nombres de las columnas no necesitan seguir un formato específico porque usted los asigna en el editor de widgets.

Para graficar métricas con una Reference Table:

1. Agregue un widget Geomap a un dashboard y seleccione la capa {{< ui >}}Points{{< /ui >}}.
1. En el selector de fuentes, elija {{< ui >}}Metrics{{< /ui >}} y escriba su consulta de métrica.
1. Especifique el tipo de unión y la Reference Table con la que desea unir sus métricas. El widget Geomap ofrece dos tipos de unión: {{< ui >}}All locations{{< /ui >}} (left join) y {{< ui >}}Locations with data only{{< /ui >}} (inner join).
1. Defina la condición de unión con la etiqueta de la métrica, como `store_id`, y la columna correspondiente de la Reference Table. Para obtener más información sobre las uniones, consulte [Reference Table Joins with Metrics][11].
1. Para {{< ui >}}latitude{{< /ui >}} y {{< ui >}}longitude{{< /ui >}}, seleccione las columnas de la Reference Table que contienen las coordenadas de cada ubicación.
1. (Opcional) Agregue reglas de formato condicional para colorear los puntos según sus valores de métrica. Por ejemplo, defina umbrales que vuelvan los puntos verdes, amarillos o rojos para resaltar el estado.
1. (Opcional) En {{< ui >}}Tooltip Fields{{< /ui >}}, seleccione columnas adicionales de la Reference Table, como el nombre de una tienda, para mostrarlas en la información sobre herramientas del punto.

### Opciones {#options}

#### Enlaces de contexto {#context-links}

Los [enlaces de contexto][7] están habilitados de forma predeterminada; puede activarlos o desactivarlos. Los enlaces de contexto conectan los widgets del dashboard con otras páginas (en Datadog o de terceros).

#### Reglas de formato visual {#visual-formatting-rules}

Personalice el color de las regiones o los puntos en su widget Geomap con reglas condicionales.

## API {#api}

Este widget se puede utilizar con la **[Dashboards API][8]**. Consulte la siguiente tabla para ver la [definición del esquema JSON del widget][9]:

{{< dashboards-widgets-api >}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/logs/log_configuration/processors/geoip_parser/
[2]: /es/getting_started/tagging/#define-tags
[3]: /es/logs/search_syntax/
[4]: /es/logs/logs_to_metrics/
[5]: /es/dashboards/querying/
[6]: /es/real_user_monitoring/explorer/search_syntax/
[7]: /es/dashboards/guide/context-links/
[8]: /es/api/latest/dashboards/
[9]: /es/dashboards/graphing_json/widget_json/
[10]: /es/reference_tables/
[11]: /es/metrics/reference_table_joins_with_metrics/