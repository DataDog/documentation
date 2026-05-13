---
aliases:
- /es/tracing/search_syntax/
- /es/tracing/trace_search_analytics/
- /es/tracing/trace_search/
- /es/tracing/search
- /es/tracing/getting_further/apm_events/
- /es/tracing/trace_search_and_analytics/search/
- /es/tracing/search/
- /es/tracing/advanced/search/
- /es/tracing/app_analytics/search
- /es/tracing/live_search_and_analytics/search
- /es/tracing/trace_search_analytics/analytics
- /es/tracing/analytics
- /es/tracing/visualization/analytics
- /es/tracing/trace_search_and_analytics/analytics/
- /es/tracing/app_analytics/analytics
- /es/tracing/trace_search_and_analytics/query_syntax
- /es/tracing/trace_explorer/trace_groups
description: Búsqueda global de todas tus trazas con etiquetas
further_reading:
- link: /getting_started/search/
  tag: Documentación
  text: Introducción a la búsqueda en Datadog
- link: /tracing/trace_collection/
  tag: Documentación
  text: Aprende cómo configurar el rastreo APM con tu aplicación
- link: /tracing/trace_explorer/trace_view/
  tag: Documentación
  text: Entiende cómo leer una traza de Datadog
- link: /tracing/software_catalog/
  tag: Documentación
  text: Descubre y cataloga los servicios que reportan a Datadog
- link: /tracing/services/service_page/
  tag: Documentación
  text: Aprende más sobre los servicios en Datadog
- link: /tracing/services/resource_page/
  tag: Documentación
  text: Profundiza en el rendimiento de tus recursos y trazas
title: Sintaxis de consulta
---
## Consulta de búsqueda {#search-query}

Todos los parámetros de búsqueda están contenidos en la URL de la página, lo que puede ser útil para compartir tu vista.

### Sintaxis de búsqueda {#search-syntax}

Una consulta se compone de *términos* y *operadores*.

Hay dos tipos de *términos*:

* **Atributo de span**: Contenido del span, recopilado con instrumentación automática o manual en la aplicación.
* **Etiqueta de tramo**: Enriquecimientos de contexto relacionados con el tramo. Por ejemplo, etiquetas de servidor o contenedor que describen la infraestructura en la que se ejecuta el servicio.
  
Para combinar múltiples *términos* en una consulta compleja, utiliza cualquiera de los siguientes operadores booleanos:

| **Operador** | **Descripción**                                                                                        | **Ejemplo**                  |
|:-------------|:-------------------------------------------------------------------------------------------------------|:-----------------------------|
| `AND`        | **Intersección**: ambos términos están en los eventos seleccionados (si no se agrega nada, se toma AND por defecto) | autenticación Y fallo   |
| `OR`         | **Unión**: cualquiera de los términos está contenido en los eventos seleccionados | autenticación O contraseña |
| `-`          | **Exclusión**: el siguiente término NO está en el evento | autenticación Y -contraseña |

### Búsqueda de atributos {#attribute-search}

Para buscar un atributo de tramo, debes agregar `@` al inicio de la clave del atributo.

Por ejemplo, si deseas acceder a un tramo con el siguiente atributo, puedes usar:

`@git.commit.sha:12345`

```json
  "git": {
    "commit": {
      "sha": "12345"
    },
    "repository": {
      "id": "github.com/datadog/datadog"
    }
  }
```

Los atributos de tramo son visibles en la pestaña **Resumen** del panel lateral de trazas.

**Nota:** No necesitas usar `@` en los [atributos reservados][17]: `env`, `operation_name`, `resource_name`, `service`, `status`, `span_id`, `timestamp`, `trace_id`, `type`, `link`

### Búsqueda de etiquetas {#tags-search}

Tus tramos heredan etiquetas de servidores y de las integraciones que los generan.

Por ejemplo:

| Consulta | Coincidencia |
|:-------------------------------------------------------------|:--------------------------------------------------------------------------------------------------|
| `(hostname:web-server OR env:prod)`                          | Todas las trazas con la etiqueta de infraestructura `hostname:web-server` o el atributo reservado `env:prod` |
| `(availability-zone:us-east OR container_name:api-frontend)` | Todas las trazas con cualquiera de estas etiquetas de infraestructura |
| `(service:api AND -kube_deployment:canary)`                  | Todas las trazas del servicio `api` que no están desplegadas en el despliegue `canary` |

Las etiquetas de span son visibles en la pestaña **Infraestructura** del panel lateral de trazas.

#### Formatos de etiqueta no estándar {#non-standard-tag-formats}

Si tus etiquetas no siguen [las mejores prácticas de etiquetas][2], entonces no uses la sintaxis `key:value`. En su lugar, utiliza la siguiente consulta de búsqueda:

`tags:<MY_TAG>`

Por ejemplo, esta etiqueta no sigue las mejores prácticas:  
`auto-discovery.cluster-autoscaler.k8s.io/daffy`

Para buscar esta etiqueta, utiliza la siguiente consulta:  
`tags:"auto-discovery.cluster-autoscaler.k8s.io/daffy"`

### Wildcards {#wildcards}

Para realizar una búsqueda con comodines de múltiples caracteres, utiliza el símbolo `*` de la siguiente manera:

* `service:web*`  coincide con cada traza que tiene un servicio que comienza con `web`
* `@url:data*`  coincide con cada traza que tiene un `url` que comienza con `data`.

### Valores numéricos {#numerical-values}

Utiliza `<`,`>`, `<=`, o `>=` para realizar una búsqueda en atributos numéricos. Por ejemplo, recupera todas las trazas que tienen un tiempo de respuesta superior a 100ms con:

`@http.response_time:>100`

También es posible buscar atributos numéricos dentro de un rango específico. Por ejemplo, recupera todos tus errores 4xx con:

`@http.status_code:[400 TO 499]`

### Autocompletar {#autocomplete}

Escribir una consulta compleja puede ser engorroso. Utiliza la función de autocompletar de la barra de búsqueda para completar tu consulta utilizando valores existentes:

{{< img src="tracing/app_analytics/search/search_bar_autocomplete.png" alt="autocompletar de la barra de búsqueda " style="width:60%;">}}

### Escape de caracteres especiales {#escaping-of-special-characters}

Los siguientes atributos se consideran especiales: `?`, `>`, `<`, `:`, `=`,`"`, `~`, `/`, y `\` requieren escape.
Por ejemplo, para buscar trazas que contengan `user=JaneDoe` en su `url` se debe ingresar la siguiente búsqueda:

`@url:*user\=JaneDoe*`

La misma lógica debe aplicarse a los espacios dentro de los atributos de traza. No se recomienda tener espacios en los atributos de traza, pero en tales casos, los espacios requieren escape.
Si un atributo se llama `user.first name`, realiza una búsqueda en este atributo escapando el espacio:

`@user.first\ name:myvalue`

### Búsquedas guardadas {#saved-searches}

No pierdas tiempo construyendo las mismas vistas todos los días. Las búsquedas guardadas contienen tu consulta de búsqueda, columnas y horizonte de tiempo. Luego están disponibles en la barra de búsqueda gracias a la coincidencia de autocompletar, ya sea por el nombre de búsqueda o la consulta.

{{< img src="tracing/app_analytics/search/saved_search.png" alt="Búsqueda Guardada" style="width:80%;">}}

Para eliminar una búsqueda guardada, haz clic en el ícono de papelera bajo el menú desplegable de búsqueda de Trace.

### Buscar servicios y entidades {#search-for-services-and-entities}

{{< site-region region="ap1,ap2,us3,us5,eu,us" >}}
Para buscar un servicio, utiliza el atributo `service`. Para buscar otro [tipo de entidad][20] (por ejemplo, una base de datos, una cola o un proveedor externo), confía en otros [atributos de pares][21] que Datadog utiliza para describir dependencias que no están instrumentadas con APM. Por ejemplo, para encontrar tramos que representan llamadas a una tabla `users` de una base de datos postgres, utiliza la siguiente consulta: `@peer.db.name:users @peer.db.system:postgres`

**Nota**: La etiqueta `service` del tramo representa el servicio **que lo emite** el tramo si migraste al [naming global de servicios][22] configurando `DD_TRACE_REMOVE_INTEGRATION_SERVICE_NAME_ENABLED=true`.

[20]: /es/tracing/services/inferred_services
[21]: /es/tracing/services/inferred_services#peer-tags
[22]: /es/tracing/services/inferred_services#migrate-to-global-default-service-naming
{{< /site-region >}}

## Rango de tiempo {#time-range}

El rango de tiempo te permite mostrar trazas dentro de un período de tiempo determinado. Cambia rápidamente el rango de tiempo seleccionando un rango preestablecido del menú desplegable (o [ingresando un marco de tiempo personalizado][3]):

{{< img src="tracing/app_analytics/search/time_frame2.png" style="width:50%;" alt="Seleccionar marco de tiempo" >}}

## Tabla de tramos {#span-table}

La tabla de tramos es la lista de tramos que coinciden con el contexto seleccionado. Un contexto se define por un filtro de [barra de búsqueda](#search-bar) y un [rango de tiempo](#time-range).

{{< site-region region="ap1,ap2,us3,us5,eu,us" >}}
### La columna de servicio {#the-service-column}

Por defecto, la columna de servicio muestra el `service` atributo reservado del tramo.

{{< img src="tracing/app_analytics/search/span_table_service.png" style="width:60%;" alt="Columna de servicio de la tabla de tramos" >}}

Cuando el tramo representa una llamada de cliente desde un servicio instrumentado a un servicio inferido, la columna de servicio muestra:
- el **servicio**, identificado por el `service` atributo reservado.
- el **[servicio inferido][4]**: nombre de la entidad inferida que está siendo llamada por el servicio base, identificada por uno de los [atributos de pares][5]

{{< img src="tracing/app_analytics/search/span_table_inferred_service.png" style="width:90%;" alt="Columna de servicio de la tabla de tramos con servicio inferido" >}}

Cuando el nombre del servicio es una anulación del nombre del servicio base, la columna de servicio muestra:
- el **[servicio base][2]**: servicio desde el cual se emite el span, identificado por el `@base_service` atributo.
- el **[anulación de servicio][3]**: nombre del servicio, diferente del nombre del servicio base, establecido automáticamente en las integraciones de Datadog o cambiado a través de la API programática. La anulación de servicio está identificada por el `service` atributo reservado.

{{< img src="tracing/app_analytics/search/span_table_service_override.png" style="width:80%;" alt="Columna de servicio de la tabla de span con anulación de servicio" >}}

[2]: /es/tracing/guide/service_overrides#base-service
[3]: /es/tracing/guide/service_overrides
[4]: /es/tracing/services/inferred_services
[5]: /es/tracing/services/inferred_services#peer-tags
{{< /site-region >}}

### Mostrando una traza completa {#displaying-a-full-trace}

Haz clic en cualquier tramo para ver detalles sobre la traza asociada:

{{< img src="tracing/app_analytics/search/trace_in_tracestream.png" alt="Traza en tracestream" style="width:80%;">}}

### Columnas {#columns}

Para agregar otras [etiquetas de tramo o atributos][23] como columnas a la lista, haz clic en el botón **Opciones** y selecciona cualquier dimensión que desees agregar:

{{< img src="tracing/app_analytics/search/trace_list_with_column.png" alt="Lista de trazas con columnas" style="width:80%;">}}

### Grupos de trazas {#trace-groups}

Agrupa la consulta por cualquier etiqueta de tramo o atributo para observar los conteos de solicitudes, tasas de error y distribuciones de latencia en la vista de lista. Puede seleccionar hasta cuatro dimensiones en la cláusula **Agrupar por**.

{{< img src="/tracing/trace_explorer/trace_groups/group_by_clause.png" alt="Cláusula de agrupar por" style="width:90%;" >}}

#### Consultas 'Agrupar por' avanzadas {#advanced-group-by-queries}

Después de seleccionar una dimensión para agrupar, puedes especificar de dónde obtener los valores de la dimensión usando el menú desplegable **de**: 
- **Tramo**: Agrupa por la dimensión del tramo consultado (predeterminado). Por ejemplo, `a`.
- **Padre del tramo**: Agrupa por la dimensión especificada del tramo padre de los tramos que coinciden con la consulta. Por ejemplo, para visualizar cómo se desempeña un punto de conexión de API según el servicio que lo llama, agrupa por `service` de `parent(a)`.
- **Tramo raíz**: Agrupar por la dimensión especificada del tramo raíz de la traza. Por ejemplo, para analizar patrones de solicitudes del backend según las páginas del frontend de donde provienen las solicitudes, agrupa por `@view.name` de `root`.

{{< img src="/tracing/trace_explorer/trace_groups/group_by_root.png" alt="Agrupar desde la raíz" style="width:90%;" >}}

#### Ver grupos de traza en la lista de grupos {#view-trace-groups-in-the-group-list}

Los grupos de traza se muestran como valores únicos de la dimensión seleccionada. Cada grupo se muestra con tres métricas clave:
- **SOLICITUDES**: Conteo de tramos dentro del grupo.
- **ERRORES**: Tasa de error y conteo de errores.
- **Latencia P95**: latencia p95 de los tramos.

Para ver estas métricas agregadas sobre el tramo padre o raíz en lugar del tramo consultado, selecciona `parent(a)` o `root` en la declaración **Mostrar métricas de**.

Además, el `Latency Breakdown` muestra cómo se distribuye el tiempo entre los diferentes servicios involucrados en las solicitudes de cada grupo, permitiéndote identificar visualmente los cuellos de botella de latencia en cada grupo.

{{< img src="/tracing/trace_explorer/trace_groups/group_list.png" alt="Lista de grupos" style="width:90%;" >}}

Para un análisis más profundo, haz clic en cualquier grupo para examinar los eventos de tramo individuales que componen las métricas agregadas.

## Facetas {#facets}

Una Faceta muestra todos los valores distintos de un atributo o una etiqueta, así como proporciona algunas analíticas básicas como la cantidad de trazas representadas. Esto también es un interruptor para filtrar tus datos.

Las facetas te permiten pivotar o filtrar tus conjuntos de datos en función de un atributo dado. Por ejemplo, las facetas pueden incluir usuarios, servicios, etc...

{{< img src="tracing/app_analytics/search/facets_demo.png" alt="Facets demo" style="width:80%;">}}

### Medidas {#measures}

Las medidas son el tipo específico de facetas para valores cuantitativos.

Usa medidas cuando necesites:
* Agregar valores de múltiples trazas. Por ejemplo, crea una medida sobre el número de filas en Cassandra y visualiza el P95 o los referrers principales por la suma del tamaño del archivo solicitado.
* Calcula numéricamente los servicios con mayor latencia para valores de carrito de compras superiores a $1000.
* Filtrar valores continuos. Por ejemplo, el tamaño en bytes de cada fragmento de carga útil de un flujo de video.

**Tipos**

Las medidas vienen con un valor entero (largo) o doble, para capacidades equivalentes.

**Unidades**

Las medidas soportan unidades (tiempo en segundos o tamaño en bytes) para el manejo de órdenes de magnitud en el tiempo de consulta y el tiempo de visualización. La unidad es una propiedad de la medida misma, no del campo. Por ejemplo, considera una medida de duración en nanosegundos: tienes una etiqueta de tramo de `service:A` donde `duration:1000` representa `1000 milliseconds`, y otra etiqueta de tramo de `service:B` donde `duration:500` representa `500 microseconds`:
Escala la duración en nanosegundos para todas las etiquetas de tramo que fluyen con el procesador aritmético. Usa un multiplicador de `*1000000` en las etiquetas de tramo de `service:A`, y un multiplicador de `*1000` en las etiquetas de tramo de `service:B`.
Utiliza `duration:>20ms` (consulta la sintaxis de búsqueda para referencia) para consultar de manera consistente las etiquetas de tramo de ambos servicios a la vez y ver un resultado agregado de un máximo de un minuto.

### Crea una faceta {#create-a-facet}

Para comenzar a usar un atributo como una faceta o en la búsqueda, haz clic en él y agrégalo como una faceta:

{{< img src="tracing/app_analytics/search/create_facet.png" style="width:50%;" alt="Crea faceta" style="width:50%;">}}

Después de crear una nueva faceta, estará disponible en el panel de facetas para filtrado y análisis básico.

### Panel de facetas {#facet-panel}

Utiliza facetas para filtrar tus trazas. La barra de búsqueda y la URL reflejan automáticamente tus selecciones.

{{< img src="tracing/app_analytics/search/facet_panel.png" alt="Panel de facetas" style="width:30%;">}}

## Visualizaciones {#visualizations}

Selecciona un tipo de visualización de análisis utilizando el selector Analítico:

* [Series temporales](#timeseries)
* [Lista principal](#top-list)
* [Tabla](#table)

### Series temporales {#timeseries}

Visualiza la evolución de la métrica `Duration` (o un conteo único de valores de una faceta) a lo largo de un marco de tiempo seleccionado, y (opcionalmente) divide por una faceta disponible.

Las siguientes Analíticas de series temporales muestran la evolución de la **pc99** **duración** por intervalos de **5min** para cada **Servicio**

{{< img src="tracing/app_analytics/analytics/timeserie_example.png" alt="ejemplo de serie temporal" style="width:90%;">}}

### Lista principal {#top-list}

Visualiza los valores principales de una faceta de acuerdo a su `Duration` (o un conteo único de valores de una faceta).

El siguiente análisis de la lista principal muestra la **pc99** **duración** de **Servicio**:

{{< img src="tracing/app_analytics/analytics/top_list_example.png" alt="ejemplo de lista principal" style="width:90%;">}}

### Tabla {#table}

Visualiza los valores principales de una faceta de acuerdo a una [medida][9] elegida (la primera medida que elijas en la lista), y muestra el valor de medidas adicionales para los elementos que aparecen en esta lista principal. Actualiza la consulta de búsqueda o investiga los registros correspondientes a cualquiera de las dimensiones.

* Cuando hay múltiples dimensiones, los valores principales se determinan de acuerdo a la primera dimensión, luego de acuerdo a la segunda dimensión dentro de los valores principales de la primera dimensión, y luego de acuerdo a la tercera dimensión dentro de los valores principales de la segunda dimensión.
* Cuando hay múltiples medidas, la lista superior o inferior se determina de acuerdo a la primera medida.
* El subtotal puede diferir de la suma real de los valores en un grupo, ya que solo se muestra un subconjunto (superior o inferior). Los eventos con un valor nulo o vacío para esta dimensión no se muestran como un subgrupo.

**Nota**: Una visualización de tabla utilizada para una sola medida y una sola dimensión es lo mismo que una lista principal, solo que con una visualización diferente.

El siguiente análisis de registros de tabla muestra la evolución de los **códigos de estado de la lista principal** de acuerdo a su **rendimiento**, junto con el número de **IPs de cliente** únicas y durante los últimos 15 minutos:

{{< img src="tracing/app_analytics/analytics/trace_table_example.png" alt="ejemplo de lista principal" style="width:90%;">}}

## Trazas relacionadas {#related-traces}

Selecciona o haz clic en una sección del gráfico para acercar el gráfico o ver la lista de [trazas][10] correspondientes a tu selección:

{{< img src="tracing/app_analytics/analytics/view_traces.png" alt="ver Trazas" style="width:40%;">}}

## Exportar {#export}

{{< img src="tracing/app_analytics/analytics/export_button.png" alt="Exporta el botón de análisis" style="width:40%;">}}

Exporta tus consultas:

* Para [monitor][11]
* Para [dashboard][12]
* Para [notebook][18]

También puedes generar una nueva métrica para la consulta.

Las consultas de APM en dashboards y notebooks se basan en todos los [tramos indexados][14]. Las consultas de APM en monitors se basan únicamente en los tramos indexados por [filtros de retención personalizados][19].

## Lectura adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/setup/java/#integrations
[2]: /es/getting_started/tagging/#tags-best-practices
[3]: /es/dashboards/guide/custom_time_frames/
[4]: /es/tracing/trace_search_and_analytics/
[5]: /es/tracing/glossary/#apm-event
[6]: /es/tracing/glossary/#services
[7]: /es/tracing/trace_pipeline/trace_retention/#retention-filters
[8]: /es/tracing/trace_search_and_analytics/query_syntax/#facets
[9]: /es/tracing/trace_search_and_analytics/query_syntax/#measures
[10]: /es/tracing/glossary/#trace
[11]: /es/monitors/types/apm/
[12]: /es/dashboards/#get-started
[13]: /es/help/
[14]: /es/tracing/glossary/#indexed-span
[15]: /es/dashboards/
[16]: /es/dashboards/widgets/timeseries/
[17]: /es/monitors/notify/variables/?tab=is_alert#reserved-attributes
[18]: /es/notebooks/
[19]: /es/tracing/trace_pipeline/trace_retention/#retention-filters
[23]: /es/tracing/trace_explorer/span_tags_attributes