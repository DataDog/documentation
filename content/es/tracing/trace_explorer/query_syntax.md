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
description: Búsqueda global de todas tus trazas (traces) con etiquetas (tags)
further_reading:
- link: /getting_started/search/
  tag: Documentación
  text: Empezando con las búsquedas en Datadog
- link: /tracing/trace_collection/
  tag: Documentación
  text: Aprender a configurar el rastreo de APM con tu aplicación
- link: /tracing/trace_explorer/trace_view/
  tag: Documentación
  text: Comprender cómo leer una traza de Datadog
- link: /tracing/software_catalog/
  tag: Documentación
  text: Descubrir y catalogar los servicios que informan a Datadog
- link: /tracing/services/service_page/
  tag: Documentación
  text: Más información sobre servicios en Datadog
- link: /tracing/services/resource_page/
  tag: Documentación
  text: Profundizar en el rendimiento de tus recursos y trazas (traces)
title: Sintaxis de consulta
---

## Consulta de búsqueda

Todos los parámetros de búsqueda se incluyen en la url de la página, lo que puede ser útil para compartir tu vista.

### Sintaxis de búsqueda

Una consulta se compone de *términos* y *operadores*.

Existen dos tipos de *términos*:

* **Atributo de tramo**: contenido del tramo (span), recopilado con instrumentación automática o manual en la aplicación.
* **Etiqueta de tramo**: mejoras de contexto relacionados con el tramo. Por ejemplo, etiquetas de host o contenedor que describen la infraestructura en la que se ejecuta el servicio.

Para combinar varios *términos* en una consulta compleja, utiliza cualquiera de los siguientes operadores booleanos:

| **Operador** | **Descripción**                                                                                        | **Ejemplo**                  |
|:-------------|:-------------------------------------------------------------------------------------------------------|:-----------------------------|
| `AND`        | **Intersección**: ambos términos están en los eventos seleccionados (si no se añade nada, se toma AND por defecto). | autenticación Y fallo   |
| `OR`         | **Unión**: cualquiera de los términos está en los eventos seleccionados.                                            | autenticación O contraseña   |
| `-`          | **Exclusión**: el término siguiente NO figura en el evento                                                  | autenticación Y contraseña |

### Búsqueda de atributo

Para buscar un atributo de span (tramo), debes añadir `@` al principio de la clave del atributo.

Por ejemplo, si deseas acceder a un tramo con el siguiente atributo a continuación, puedes utilizar:

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

Los atributos de spans (tramos) son visibles en la pestaña **Información general** del panel lateral de traces (trazas).

**Nota:** No es necesario utilizar `@` en los [atributos reservados][17]: `env`, `operation_name`, `resource_name`, `service`, `status`, `span_id`, `timestamp`, `trace_id`, `type`, `link`

### Búsqueda por etiquetas

Tus spans (tramos) heredan etiquetas de hosts e integraciones que los generan.

Por ejemplo:

| Consulta                                                        | Coincidencia                                                                                             |
|:-------------------------------------------------------------|:--------------------------------------------------------------------------------------------------|
| `(hostname:web-server OR env:prod)`                          | Todas las trazas con la etiqueta de infraestructura `hostname:web-server` o el atributo reservado `env:prod` |
| `(availability-zone:us-east OR container_name:api-frontend)` | Todas las trazas con cualquiera de estas etiquetas de infraestructura                                               |
| `(service:api AND -kube_deployment:canary)`                  | Todas las trazas del servicio `api` que no están desplegados en el despliegue `canary`                 |

Las etiquetas de spans (tramos) son visibles en la pestaña **Infraestructura** del panel lateral de trazas.

#### Formatos de etiquetas no estándar

Si tus etiquetas no siguen las [prácticas recomendadas de etiquetas][2], no utilices la sintaxis `key:value`. En su lugar, utiliza la siguiente consulta de búsqueda:

`tags:<MY_TAG>`

Por ejemplo, esta etiqueta no sigue las prácticas recomendadas:  
`auto-discovery.cluster-autoscaler.k8s.io/daffy`

Para buscar en esta etiqueta, utiliza la siguiente consulta:  
`tags:"auto-discovery.cluster-autoscaler.k8s.io/daffy"`

### Comodines

Para realizar una búsqueda con un comodín de varios caracteres, utiliza el símbolo `*` como se indica a continuación:

* `service:web*` coincide con cada traza que tenga un servicio que empiece por `web`
* `@url:data*` coincide con cada traza que tenga una `url` que empiece por `data`.

### Valores numéricos

Utiliza `<`,`>`, `<=`, o `>=` para realizar una búsqueda sobre atributos numéricos. Por ejemplo, recupera todas las trazas que tengan un tiempo de respuesta superior a 100 ms con:

`@http.response_time:>100`

También es posible buscar atributos numéricos dentro de un rango específico. Por ejemplo, recupera todos tus errores 4xx con:

`@http.status_code:[400 TO 499]`

### Autocompletar

Escribir una consulta compleja puede ser engorroso. Utiliza la función de autocompletar de la barra de búsqueda para completar tu consulta utilizando los valores existentes:

{{< img src="tracing/app_analytics/search/search_bar_autocomplete.png" alt="barra de búsqueda de autocompletar " style="width:60%;">}}

### Caracteres especiales de escape

Los siguientes atributos se consideran especiales: `?`, `>`, `<`, `:`, `=`,`"`, `~`, `/`, y `\` requieren escape.
Por ejemplo, para buscar trazas que contengan `user=JaneDoe` en su `url` debe introducirse la siguiente búsqueda:

`@url:*user\=JaneDoe*`

La misma lógica debe aplicarse a los espacios dentro de los atributos de traza. No es recomendado tener espacios en los atributos de traza, pero en tales casos, los espacios requieren un escape.
Si un atributo se llama `user.first name`, realiza una búsqueda en este atributo con un espacio de escape:

`@user.first\ name:myvalue`

### Búsquedas guardadas

No pierdas tiempo creando las mismas vistas todos los días. Las búsquedas guardadas contienen tu consulta de búsqueda, columnas y horizonte temporal. Están disponibles en la barra de búsqueda gracias a la coincidencia de autocompletar, ya sea por nombre de búsqueda o consulta.

{{< img src="tracing/app_analytics/search/saved_search.png" alt="Búsqueda guardada" style="width:80%;">}}

Para eliminar una búsqueda guardada, haz clic en el icono de la papelera situado bajo el menú desplegable Buscar traza.

### Buscar servicios y entidades 

{{< site-region region="ap1,ap2,us3,us5,eu,us" >}}
Para buscar un servicio, utiliza el atributo `service`. Para buscar otro [tipo de entidad][20] (por ejemplo, una base de datos, una cola o un proveedor externo), recurre a otros [atributos de pares][21] que Datadog utiliza para describir dependencias que no están instrumentadas con APM. Por ejemplo, para encontrar spans (tramos) que representen llamadas a una tabla `users` desde una base de datos postgres, utiliza la siguiente consulta: `@peer.db.name:users @peer.db.system:postgres`

**Nota**: La etiqueta `service` del tramo representa el servicio **emitiendo** el tramo si migraste a la [nomenclatura del servicio global][22] configurando `DD_TRACE_REMOVE_INTEGRATION_SERVICE_NAME_ENABLED=true`.

[20]: /es/tracing/services/inferred_services
[21]: /es/tracing/services/inferred_services#peer-tags
[22]: /es/tracing/services/inferred_services#migrate-to-global-default-service-naming
{{< /site-region >}}

## Rango de tiempo

El intervalo de tiempo te permite visualizar trazas dentro de un periodo determinado. Cambia rápidamente el intervalo de tiempo seleccionando un intervalo preestablecido en el menú desplegable (o [introduciendo un intervalo de tiempo personalizado][3]):

{{< img src="tracing/app_analytics/search/time_frame2.png" style="width:50%;" alt="Seleccionar el marco temporal" >}}

## Tabla de tramo

La tabla de tramo es la lista de tramos que coinciden con el contexto seleccionado. Un contexto se define mediante un filtro de [barra de búsqueda](#search-bar) y un [intervalo de tiempo](#time-range).

{{< site-region region="ap1,ap2,us3,us5,eu,us" >}}
### La columna de servicio

Por defecto, la columna de servicio muestra el atributo reservado `service` del tramo.

{{< img src="tracing/app_analytics/search/span_table_service.png" style="width:60%;" alt="Columna de servicio de la tabla de tramos" >}}

Cuando el tramo representa una llamada de cliente desde un servicio instrumentado a un servicio inferido, la columna de servicio muestra:
- el **servicio**, identificado por el atributo reservado `service`.
- el **[servicio inferido][4]**: nombre de la entidad inferida a la que llama el servicio base, identificada por uno de los [atributos de pares][5]

{{< img src="tracing/app_analytics/search/span_table_inferred_service.png" style="width:90%;" alt="Columna de servicio de tabla de tramos con servicio inferido" >}}

Cuando el nombre del servicio es una modificación del nombre del servicio base, aparece la columna de servicio:
- el **[servicio base][2]**: servicio desde el que se emite el tramo, identificado por el atributo `@base_service`.
- la **[anulación del servicio][3]**: nombre del servicio, diferente del nombre de servicio base, establecido automáticamente en integraciones de Datadog o cambiado a través de la API programática. La anulación del servicio se identifica mediante el atributo reservado `service`.

{{< img src="tracing/app_analytics/search/span_table_service_override.png" style="width:80%;" alt="Columna de servicio de la tabla de tramos con anulación de servicio" >}}

[2]: /es/tracing/guide/service_overrides#base-service
[3]: /es/tracing/guide/service_overrides
[4]: /es/tracing/services/inferred_services
[5]: /es/tracing/services/inferred_services#peer-tags
{{< /site-region >}}

### Visualización de una traza completa

Haz clic en cualquier tramo para ver los detalles sobre la traza asociada:

{{< img src="tracing/app_analytics/search/trace_in_tracestream.png" alt="Traza en el flujo de trazas" style="width:80%;">}}

### Columnas

Para añadir otras [etiquetas de tramo o atributos][23] como columnas a la lista, pulsa el botón **Options** (Opciones) y selecciona cualquier dimensión que desees añadir:

{{< img src="tracing/app_analytics/search/trace_list_with_column.png" alt="Lista de trazas con columnas" style="width:80%;">}}

### Grupos de rastreo

Agrupa la consulta por cualquier etiqueta o atributo de tramo para observar los recuentos de solicitudes, las tasas de error y las distribuciones de latencia en la vista de lista. Puedes seleccionar hasta cuatro dimensiones en la cláusula **Agrupar por**.

{{< img src="/tracing/trace_explorer/trace_groups/group_by_clause.png" alt="Cláusula Agrupar por" style="width:90%;" >}}

#### Consultas 'Agrupar por' avanzadas

Después de seleccionar una dimensión para la agrupación, puedes especificar de dónde obtener los valores de la dimensión utilizando el desplegable **desde**: 
- **Tramo**: Agrupa utilizando la dimensión del tramo consultado (por defecto). Por ejemplo, `a`.
- **Tramo principal**: Agrupa utilizando la dimensión especificada del tramo principal de los tramos que coinciden con la consulta. Por ejemplo, para visualizar el rendimiento de un endpoint de API en función del servicio que lo llama, agrupa por `service` desde `parent(a)`.
- **Tramo raíz**: Agrupa utilizando la dimensión especificada del tramo raíz de la traza. Por ejemplo, para analizar patrones de solicitudes de backend en función de las páginas de frontend desde las que se originan las solicitudes, agrupa por `@view.name` desde `root`.

{{< img src="/tracing/trace_explorer/trace_groups/group_by_root.png" alt="Agrupar por, desde la raíz" style="width:90%;" >}}

#### Ver grupos de rastreo en la lista de grupos

Los grupos de rastreo se muestran como valores únicos de la dimensión seleccionada. Cada grupo se muestra con tres métricas clave:
- **SOLICITUDES**: Recuento de tramos dentro del grupo.
- **ERRORES**: Tasa de error y recuento de errores.
- **Latencia P95**: Latencia p95 de los tramos.

Para ver estas métricas agregadas en el tramo principal o raíz, en lugar de en el tramo consultado, selecciona `parent(a)` o `root` en la sentencia **Mostrar métricas desde**.

Además, `Latency Breakdown` muestra el tiempo que transcurre entre diferentes servicios dentro de las solicitudes de cada grupo, lo que permite detectar visualmente los cuellos de botella de latencia de determinados grupos.

{{< img src="/tracing/trace_explorer/trace_groups/group_list.png" alt="Lista de grupos" style="width:90%;" >}}

Para realizar un análisis más profundo, haz clic en cualquier grupo para examinar los eventos individuales de tramos que conforman las métricas agregadas.

## Facetas

Una faceta muestra todos los valores distintos de un atributo o una etiqueta, además de proporcionar algunos análisis básicos, como la cantidad de trazas representada. También sirve para filtrar los datos.

Las facetas permiten girar o filtrar los conjuntos de datos en función de un atributo determinado. Ejemplos de facetas pueden incluir usuarios, servicios, etc...

{{< img src="tracing/app_analytics/search/facets_demo.png" alt="Demostración de facetas" style="width:80%;">}}

### Medidas

Las medidas son el tipo específico de facetas para valores cuantitativos.

Usa las medidas cuando necesites:
* Añadir valores de distintas trazas. Por ejemplo, crear una medida sobre el número de filas en Cassandra y visualizar los p95 o referenciadores superiores por la suma del tamaño de archivo solicitado.
* Calcular numéricamente los servicios con latencia más alta, por ejemplo, para valores del carrito de la compra superiores a $1000.
* Filtrar valores continuos, por ejemplo, el tamaño en bytes de cada segmento de carga útil en un flujo de vídeo.

**Tipos**

Las medidas vienen con un valor entero (largo) o doble, para capacidades equivalentes.

**Unidades**

Las medidas admiten unidades (tiempo en segundos o tamaño en bytes) para manejar órdenes de magnitud en el tiempo de consulta y el tiempo de visualización. La unidad es una propiedad de la propia medida, no del campo. Por ejemplo, considera una medida de duración en nanosegundos: tiene una etiqueta de tramo de `service:A` donde `duration:1000` representa `1000 milliseconds`, y otra etiqueta de tramo de `service:B` donde `duration:500` representa `500 microseconds`:
Escala la duración en nanosegundos para todas las etiquetas de tramo que fluyen con el procesador aritmético. Utiliza un multiplicador `*1000000` en las etiquetas de tramo desde `service:A`, y un multiplicador `*1000` en etiquetas de tramo desde `service:B`.
Utiliza `duration:>20ms` (consulta la sintaxis de búsqueda como referencia) para consultar sistemáticamente etiquetas de tramo desde ambos servicios a la vez, y ve un resultado agregado de un minuto como máximo.

### Crear una faceta

Para empezar a utilizar un atributo como faceta o en la búsqueda, haz clic en él y añádelo como faceta:

{{< img src="tracing/app_analytics/search/create_facet.png" style="width:50%;" alt="Crear faceta" style="width:50%;">}}

Después de crear una nueva faceta, está disponible en el panel de facetas para el filtrado y el análisis básico.

### Panel de facetas

Utilice facetas para filtrar en tus trazas. La barra de búsqueda y la url reflejan automáticamente tus selecciones.

{{< img src="tracing/app_analytics/search/facet_panel.png" alt="Panel de faceta" style="width:30%;">}}

## Visualizaciones

Selecciona un tipo de visualización de Analytics mediante el selector de Analytics:

* [Timeseries](#timeseries)
* [Lista de principales](#top-list)
* [Tabla](#table)

### Series temporales

Visualiza la evolución de la métrica `Duration` (o una faceta de recuento único de valores) en un marco temporal seleccionado, y (opcionalmente) divide por una faceta disponible.

La siguiente serie temporal Analytics muestra la evolución de la **duración** **pc99** por pasos de **5min** para cada **servicio**

{{< img src="tracing/app_analytics/analytics/timeserie_example.png" alt="ejemplo de serie temporal" style="width:90%;">}}

### Lista principal

Visualiza los valores principales de una faceta según su `Duration` (o un recuento único de valores de la faceta).

La siguiente lista de principales de Analytics muestra los valores principales de **duración** **pc99** del **servicio**:

{{< img src="tracing/app_analytics/analytics/top_list_example.png" alt="ejemplo de lista principal" style="width:90%;">}}

### Tabla

Visualiza los valores principales de una faceta según una [medida][9] elegida (la primera medida que elijas en la lista), y visualiza el valor de las medidas adicionales de los elementos que aparecen en esta lista de principales. Actualiza la consulta de búsqueda o investiga los logs correspondientes a cualquiera de las dimensiones.

* Cuando hay múltiples dimensiones, los valores máximos se determinan según la primera dimensión, luego según la segunda dimensión dentro de los valores máximos de la primera dimensión, luego según la tercera dimensión dentro de los valores máximos de la segunda dimensión.
* Cuando haya varias medidas, la lista superior o inferior se determina en función de la primera medida.
* El subtotal puede diferir de la suma real de valores de un grupo, ya que solo se muestra un subconjunto (principal o inferior). Los eventos con un valor nulo o vacío para esta dimensión no se muestran como subgrupo.

**Nota**: Una visualización de tabla utilizada para una sola medida y una sola dimensión es lo mismo que una lista, solo que con una visualización diferente.

La siguiente tabla de log de Analytics muestra la evolución de los **códigos de estado principales** en función de su **rendimiento**, junto con el número de **IPs de cliente** únicos, y durante los últimos 15 minutos:

{{< img src="tracing/app_analytics/analytics/trace_table_example.png" alt="ejemplo de lista de principales" style="width:90%;">}}

## Trazas relacionadas

Selecciona o haz clic en una sección del gráfico para ampliarlo o ver la página de lista de [trazas][10] correspondiente a tu selección:

{{< img src="tracing/app_analytics/analytics/view_traces.png" alt="Vista de trazas" style="width:40%;">}}

## Exportar

{{< img src="tracing/app_analytics/analytics/export_button.png" alt="Botón Exportar tu Analytics" style="width:40%;">}}

Exporta tus consultas:

* Al [monitor][11]
* Al [dashboard][12]
* Al [notebook][18]

También puedes generar una nueva métrica para la consulta.

**Nota**: Las consultas de APM en dashboards y notebooks se basan en todos los [tramos indexados][14]. Las consultas de APM en monitores se basan únicamente en tramos indexados por [filtros de retención personalizados][19].

## Referencias adicionales

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