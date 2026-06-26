---
description: Más información sobre cómo asignar el gasto de Cloud Cost Management
  en toda tu organización con BigQuery Cost Allocation.
further_reading:
- link: /cloud_cost_management/
  tag: Documentación
  text: Más información sobre Cloud Cost Management
title: Asignación de costes de BigQuery
---

## Información general

Datadog Cloud Cost Management (CCM) asigna automáticamente los costes de tus recursos de Google BigQuery a consultas y cargas de trabajo individuales. Utiliza métricas de costes enriquecidas con etiquetas (tags) de consultas, proyectos y reservas para visualizar los costes de las cargas de trabajo de BigQuery en el contexto de toda tu factura en la nube.

CCM muestra los costes de los recursos, incluidos el análisis a nivel de consulta, el almacenamiento y la transferencia de datos en el [dashboard de BigQuery][1].

## Opciones de precios de BigQuery

BigQuery ofrece diferentes opciones de precios y CCM se centra en los costes de procesamiento relacionados con consultas.

### Consultas a la carta

Con este modelo de precios, se paga por consulta en función de la cantidad de datos procesados.
- Los costes se atribuyen directamente a las consultas individuales en función de los bytes procesados.
- Incluye etiquetas (tags) a nivel de consulta para la atribución detallada de costes.

### Consultas basadas en reservas
Con las consultas basadas en reservas, adquieres capacidad de procesamiento exclusiva (slots) por adelantado a un coste fijo. Varias consultas pueden compartir esta funcionalidad reservada, lo que hace que la atribución de costes sea más compleja, pero potencialmente más rentable para cargas de trabajo constantes.
- Los costes de los slots reservados se asignan proporcionalmente a las consultas que los utilizan.
- Asignación basada en el consumo de slots (`total_slot_ms`) por consulta
- Incluye el cálculo del coste de inactividad de la funcionalidad de reserva no utilizada.

### Otros costes de BigQuery

BigQuery ofrece diversos servicios adicionales más allá del procesamiento de consultas que contribuyen a tus costes totales:

| Servicio | Descripción |
|---|---|
| **Almacenamiento** | Cargos por datos almacenados en tablas BigQuery (almacenamiento activo y a largo plazo) |
| **Transmisión** | Costes de ingestión de datos en tiempo real mediante inserciones de transmisiones |
| **Transferencia de datos** | Cargos por transferir datos entre regiones o exportar datos |
| **BI Engine** | Costes de aceleración del análisis en memoria |
| **Otros servicios** | Formación en ML, ejecuciones rutinarias y funciones adicionales de BigQuery |

CCM asigna y enriquece los costes de ambos [modelos de precios] de procesamiento de consultas[2], proporcionando una atribución de costes y un etiquetado detallados para tus cargas de trabajo de análisis de BigQuery.

Más información sobre [optimización del rendimiento y los costes de BigQuery][3].

## Requisitos previos

La siguiente tabla presenta la lista de funciones recopiladas y los requisitos mínimos para desbloquear distintos niveles de visibilidad y atribución de costes de BigQuery en Datadog:

| Función | Requisitos |
|---|---|
| Recuperar etiquetas (tags) de otras etiquetas (labels) de una consulta | Los costes de GCP CCM deben configurarse. Compatible sin monitorización ni reservas. |
| Atribución de costes a nivel de consulta | Monitorización de BigQuery activada |
| Asignación de costes de reserva | Reservas de BigQuery configuradas |

1. Configura la integración de Google Cloud Cost Management en la [página de configuración de Cloud Cost][4].
2. [Habilita la monitorización BigQuery][5] en tu proyecto Google Cloud.
3. (Opcional) Para la asignación de costes de reserva, [configura reservas de BigQuery][6] en tu proyecto. Esta estrategia suele ser más rentable para cargas de trabajo predecibles o de gran volumen, en comparación con los precios a la carta, como se explica en esta [guía de Google Cloud][7].

## Asignación de costes

### Cálculo

Los costes se asignan a los siguientes tipos de gastos:

| Tipo de gasto | Descripción |
|---|---|
| `allocated_spend_type:usage` | Coste de la ejecución de consultas en función de los bytes procesados (a la carta) o del consumo de slots (reserva). |
| `allocated_spend_type:borrowed_slot_usage` | Coste de las consultas que han utilizado slots inactivos prestados de otras reservas dentro del proyecto de administrador. |
| `allocated_spend_type:cluster_idle` | Coste de los slots reservados en un proyecto pero no utilizados por ninguna consulta.|

### Extracción de etiquetas (tags) a nivel de consulta

Cuando está activada la [integración de Datadog con Google BigQuery][5], CCM extrae las siguientes etiquetas (tags) para añadirlas a los costes de consulta:

| Etiqueta (tag) | Descripción |
|---|---|
| `reservation_id` | Grupo de reserva que ha proporcionado los recursos informáticos. |
| `user_email` | Cuenta de usuario o servicio que ha ejecutado la consulta. |
| `query_signature` | Hash del texto SQL lógico de una consulta. Esta firma permite agrupar y analizar consultas similares.|
| `dts_config_id` | Identificador de consultas programadas y transferencias de datos. |

#### Identificación de los cronogramas de BigQuery

Puedes identificar los cronogramas de BigQuery para ayudar a conectar los costes con cargas de trabajo programadas específicas, lo que permite una mejor atribución de costes y una optimización de los trabajos recurrentes de procesamiento de datos.

Para identificar a qué cronograma de BigQuery se refiere un `DTS_CONFIG_ID`:

1.  Ve a **BigQuery** en la [**Consola de GCP**][8].
2.  Ve a **Transfers > Schedules** (Transferencias > Cronogramas).
3.  Utiliza la **barra de búsqueda** o **Ctrl+F** para localizar el `DTS_CONFIG_ID`.
4.  Haz clic en la entrada correspondiente para ver detalles del cronograma de consultas, incluidos la fuente, la frecuencia y el conjunto de datos de destino.

#### Etiquetas (tags) adicionales de análisis de costes

CCM también añade las siguientes etiquetas (tags) para el análisis de costes:

| Etiqueta (tag) | Descripción |
|---|---|
| `allocated_spend_type` | Categoriza los costes como `usage` (ejecución activa de consultas), `borrowed_slot_usage` (consultas que utilizan slots inactivos de otras reservas con capacidad extra de slot) o `cluster_idle` (capacidad de reserva no utilizada). |
| `allocated_resource` | Indica el tipo de medición de recursos - `slots` para consultas basadas en reservas o `bytes_processed` para consultas a la carta. |
| `orchestrator` | Configurar en `BigQuery` para todos los registros relacionados con consultas de BigQuery. |

Las siguientes etiquetas (tags) se etiquetan automáticamente a partir de los datos de facturación que procesa CCM y pueden ser especialmente útiles en el análisis de costes de BigQuery: 

| Etiqueta (tag) | Descripción |
|---|---|
| `project_id` | ID de proyecto GCP donde se encuentra el recurso o el trabajo de BigQuery |
| `google_location` | La región o zona específica de Google Cloud donde se despliegan los recursos de BigQuery (por ejemplo, `us-central1`, `europe-west1`, `asia-southeast1`) |
| `resource_name` | Identificador de recursos de Google Cloud completo |

### Uso de etiquetas (labels) de BigQuery para la atribución de costes

Las etiquetas (labels) de BigQuery son pares clave-valor que puedes adjuntar a recursos BigQuery. Cuando se añaden etiquetas (labels) a consultas o trabajos, automáticamente pasan a estar disponibles como etiquetas (tags) en CCM, lo que permite filtrar y agrupar costes por estas dimensiones personalizadas. 

Utiliza etiquetas (labels) para clasificar tus cargas de trabajo de BigQuery por equipo, proyecto, aplicación o cualquier dimensión personalizada que definas, lo que permite una atribución específica de los costes y una mejor gestión de estos.

#### Añadir etiquetas (labels) a consultas

Puede añadir etiquetas (labels) a las consultas de BigQuery para que aparezcan en CCM utilizando el indicador `--label` con la herramienta de línea de comandos `bq`:

```bash
bq query --label department:engineering --label environment:production 'SELECT * FROM dataset.table'
```
#### Añadir etiquetas (labels) en sesiones SQL

Si ejecutas varias consultas relacionadas en una misma sesión y quieres aplicar una atribución de costes coherente a todas ellas, puedes aplicar el etiquetado a nivel de sesión. Esta estrategia ahorra tiempo en comparación con la adición de etiquetas (labels) a cada consulta individual y garantiza un etiquetado coherente para las cargas de trabajo relacionadas.

Los casos de uso más comunes son:

- **Atribución a equipos**: Etiqueta las consultas con los nombres de los equipos para realizar un seguimiento del gasto de BigQuery por departamento.
- **Seguimiento del entorno**: Separa los costes de desarrollo, staging y producción.
- **Asignación de aplicaciones**: Asocia costes a aplicaciones o servicios específicos.
- **Categorización de proyectos**: Agrupa los costes por iniciativas empresariales o proyectos de clientes.

Para las consultas dentro de una sesión, puedes definir etiquetas (labels) que se apliquen a todas las consultas posteriores. Las etiquetas (labels) añadidas a los recursos de BigQuery aparecen automáticamente como etiquetas (tags) en CCM, lo que permite poderosas funciones de análisis de costes y devolución de cargos.

Para definir etiquetas (labels) que se apliquen a todas las consultas posteriores:

```sql
SET @@query_label = "team:data_science,cost_center:analytics";
```

Más información sobre el [añadido de etiquetas (labels) de BigQuery][9].

### Asignación a nivel de consulta

La asignación de costes divide los costes de BigQuery de GCP en consultas individuales y cargas de trabajo asociadas a estas. Estos costes divididos se enriquecen con etiquetas (tags) de consultas, proyectos y reservas, para que puedas desglosar los costes por cualquier dimensión asociada. 

Para los costes de BigQuery basados en reservas, CCM asigna los costes proporcionalmente en función del uso de slots. El coste de cada consulta viene determinado por su parte del uso total de slots dentro de las reservas del proyecto. Por ejemplo, si una consulta utiliza el 25% del total de slots consumidos en una reserva de proyecto durante un periodo determinado, se le asigna el 25% del coste total de la reserva de ese proyecto para ese periodo. El coste por consulta se calcula mediante la siguiente fórmula:

```
cost_per_query = (query_slot_usage / total_slot_usage) * total_project_reservation_cost
```

Donde:
- `query_slot_usage`: Número de segundos de slot consumidos por una consulta individual
- `total_slot_usage`: Total de segundos de slot utilizados en todas las consultas de las reservas del proyecto
- `total_project_reservation_cost`: Coste total de las reservas en un determinado proyecto para el período de tiempo

Cualquier diferencia entre el coste total de reserva facturado y la suma de los costes de consultas asignados se clasifica como coste de inactividad del proyecto, que representa la capacidad de reserva no utilizada. Estos costes se etiquetan con `allocated_spend_type:cluster_idle`, mientras que los costes reales de ejecución de consultas (tanto de reserva como a la carta) se etiquetan con `allocated_spend_type:usage`.

### Comprender los costes de inactividad

Los costes de inactividad representan la parte de la capacidad de reserva pagada pero no utilizada por las consultas. Estos costes se generan cuando la capacidad de los slots reservados supera el uso real durante un periodo de facturación.

#### Compartir slots inactivos

El uso compartido de slots inactivos de BigQuery es una función de asignación de costes que redistribuye la capacidad de reserva no utilizada entre los proyectos que necesitan slots adicionales. Por ejemplo, si la Reserva A tiene slots inactivos adicionales, las consultas en el Proyecto B podrían utilizar los slots del Proyecto A, además de las del Proyecto B.

Si tu organización ha activado el uso compartido de slots inactivos entre reservas, el cálculo del coste de inactividad refleja cómo se distribuye la capacidad no utilizada entre los proyectos. Con la opción para compartir slots inactivos activada:
- Proyectos contribuyentes: Los proyectos cuya capacidad de reserva no utilizada se comparta se etiquetarán como costes `borrowed_slot_usage`, lo que representa el valor que han aportado a las consultas de otros proyectos.
- Atribución de costes: El coste total se conserva en toda la organización. Los costes se redistribuyen de la capacidad inactiva al uso prestado, pero no se pierden costes ni se contabilizan dos veces.
- El proyecto original sigue pagando todos los costes de reserva según la facturación de Google Cloud.
- Los costes compartidos de slots inactivos ayudan a las organizaciones a comprender el verdadero valor y uso de sus reservas de BigQuery.

Más información sobre cómo [activar la opción para compartir slots inactivos para tus reservas][10].

### Almacenamiento

Los costes de almacenamiento se clasifican en:

| Tipo de gasto | Descripción |
|---|---|
| `google_usage_type: Active Logical Storage` | Incluye cualquier tabla o partición de tabla que haya sido modificada en los últimos 90 días. |
| `google_usage_type: Long Term Logical Storage` | Incluye cualquier tabla o partición de tabla que no se haya modificado durante 90 días consecutivos. El precio del almacenamiento para esa tabla baja automáticamente aproximadamente un 50%. No hay diferencia de rendimiento, durabilidad o disponibilidad entre el almacenamiento activo y el almacenamiento a largo plazo. |

Más información sobre el [almacenamiento de BigQuery y las prácticas recomendadas][11].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/dash/integration/32017/bigquery-allocation?fromUser=false&refresh_mode=sliding&from_ts=1751740562723&to_ts=1754418962723&live=true
[2]: https://cloud.google.com/bigquery/pricing
[3]: https://cloud.google.com/bigquery/docs/best-practices-performance-overview
[4]: /es/cloud_cost_management/setup/google_cloud/
[5]: /es/integrations/google-cloud-bigquery/
[6]: https://cloud.google.com/bigquery/docs/reservations-get-started
[7]: https://cloud.google.com/bigquery/docs/reservations-intro
[8]: https://console.cloud.google.com
[9]: https://cloud.google.com/bigquery/docs/adding-labels
[10]: https://cloud.google.com/bigquery/docs/reservations-tasks
[11]: https://cloud.google.com/bigquery/docs/best-practices-storage