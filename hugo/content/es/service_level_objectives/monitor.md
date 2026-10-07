---
aliases:
- /es/monitors/service_level_objectives/monitor/
- /es/service_management/service_level_objectives/monitor/
description: Utilice monitores para definir el Service Level Objective
further_reading:
- link: /monitors/
  tag: Documentación
  text: Más información sobre los monitores
- link: https://www.datadoghq.com/blog/define-and-manage-slos/#monitor-based-slo
  tag: Blog
  text: Mejores prácticas para administrar sus SLO con Datadog
- link: https://www.datadoghq.com/blog/slo-synthetic-monitoring/
  tag: Blog
  text: Mejore la precisión y el rendimiento de los SLO con Datadog Synthetic Monitoring.
- link: https://learn.datadoghq.com/courses/understanding-slos
  tag: Centro de aprendizaje
  text: Comprender los Service Level Objectives (SLOs)
title: SLO basados en monitores
---
## Descripción general {#overview}
Para crear un SLO a partir de los monitores de Datadog nuevos o existentes, cree un SLO basado en monitores. Al utilizar un SLO basado en monitores, puede calcular el Indicador de Nivel de Servicio (SLI) dividiendo el tiempo en que su sistema muestra un buen comportamiento entre el tiempo total.

<div class="alert alert-info">Los SLO de fragmentos de tiempo son otra forma de crear SLOs con un cálculo de SLI basado en el tiempo. Con los SLO de fragmentos de tiempo, puede crear un SLO de tiempo de actividad sin utilizar un monitor, por lo que no tiene que crear y mantener tanto un monitor como un SLO.</div>

{{< img src="service_level_objectives/monitor/monitor_slo_side_panel.png" alt="ejemplo de SLO basado en monitores" >}}

## Requisitos previos {#prerequisites}

Para crear un SLO basado en monitores, necesita un monitor de Datadog existente. Para configurar un nuevo monitor, vaya a la [página de creación de monitores][1].

Los SLO basados en monitores de Datadog admiten los siguientes tipos de monitores:
- Tipos de monitor de métricas (Métrica, Integración, Métrica de APM, Anomalía, Pronóstico, Valor anómalo)
- Synthetic
- Verificaciones de servicio

## Configuración {#setup}

En la [página de estado de SLO][2], haga clic en {{< ui >}}\+ New SLO{{< /ui >}}. Luego, seleccione {{< ui >}}By Monitor Uptime{{< /ui >}}.

### Definir consultas {#define-queries}


En el cuadro de búsqueda, comience a escribir el nombre de un monitor. Aparece una lista de monitores coincidentes. Haga clic en el nombre de un monitor para añadirlo a la fuente.

**Notas**:

- Si está utilizando un único monitor de alerta múltiple en un SLO, puede seleccionar opcionalmente "Calcular en grupos seleccionados" y elegir hasta 20 grupos. 
- Si está añadiendo múltiples monitores a su SLO, la selección de grupos no es compatible. Puede añadir hasta 20 monitores.

### Establezca sus objetivos de SLO {#set-your-slo-targets}

Seleccione un {{< ui >}}target{{< /ui >}} porcentaje, {{< ui >}}time window{{< /ui >}} y un nivel {{< ui >}}warning{{< /ui >}} opcional.

El porcentaje objetivo especifica la porción de tiempo en la que el monitor o los monitores subyacentes del SLO no deben estar en estado de alerta. La ventana de tiempo especifica el período continuo en el que el SLO ejecuta su cálculo.

Dependiendo del valor del SLI, la interfaz de usuario de Datadog muestra el estado del SLO en un color diferente:
- Mientras el SLI permanezca por encima del objetivo, la interfaz de usuario muestra el estado del SLO en verde.
- Cuando el SLI cae por debajo del objetivo, la interfaz de usuario muestra el estado del SLO en rojo.
- Si incluyó un nivel de advertencia y el SLI cae por debajo de la advertencia, pero por encima del nivel objetivo, la interfaz de usuario muestra el estado del SLO en amarillo.

La ventana de tiempo que elija cambia la precisión disponible para sus SLO basados en monitores:
- Las ventanas de tiempo de 7 y 30 días permiten hasta dos decimales.
- Las ventanas de tiempo de 90 días permiten hasta tres decimales.

En la interfaz de detalles del SLO, Datadog muestra dos decimales para los SLO configurados con ventanas de tiempo de 7 y 30 días, y tres decimales para los SLO configurados con ventanas de tiempo de 90 días.

El siguiente ejemplo demuestra por qué Datadog muestra un número limitado de decimales para los cálculos de SLO. Un objetivo del 99.999% para una ventana de tiempo de 7 o 30 días resulta en un presupuesto de error de 6 segundos o 26 segundos, respectivamente. Los monitores se evalúan cada minuto, por lo que la granularidad de un SLO basado en monitores también es de 1 minuto. Por lo tanto, una alerta consumiría completamente y excedería el presupuesto de error de 6 o 26 segundos en el ejemplo anterior. En la práctica, los equipos no pueden cumplir con presupuestos de error tan pequeños.

Si necesita una granularidad más fina que la evaluación del monitor una vez por minuto, considere usar [SLO basados en métricas][3] en su lugar.

### Agregar nombre y etiquetas {#add-name-and-tags}

Elija un nombre y una descripción extendida para su SLO. Seleccione las etiquetas que desea asociar con su SLO. Seleccione {{< ui >}}Create{{< /ui >}} o {{< ui >}}Create & Set Alert{{< /ui >}} para guardar su nuevo SLO.

## Cálculo de estado {#status-calculation}

{{< img src="service_level_objectives/monitor/monitor_slo_overall_status.png" alt="SLO basados en monitores con grupos" >}}

Datadog calcula el estado general del SLO como el porcentaje de tiempo de actividad en todos los monitores o grupos de monitores, a menos que se hayan seleccionado grupos específicos:
- Si se han seleccionado grupos específicos (hasta 20), el estado del SLO se calcula solo con esos grupos. La interfaz de usuario muestra todos los grupos seleccionados. 
- Si no se seleccionan grupos específicos, el estado del SLO se calcula en *todos* los grupos. La interfaz de usuario muestra todos los grupos subyacentes del SLO. 

**Nota:** Para los SLO basados en monitores con grupos, se pueden mostrar todos los grupos para cualquier SLO que contenga hasta 5,000 grupos. Para los SLO que contienen más de 5,000 grupos, el SLO se calcula en función de todos los grupos, pero no se muestra ningún grupo en la interfaz de usuario.

Los SLO basados en monitores tratan el estado `WARN` como `OK`. La definición de un SLO requiere una distinción binaria entre el buen y el mal comportamiento. Los cálculos de SLO tratan `WARN` como buen comportamiento, ya que `WARN` no es lo suficientemente grave como para indicar un mal comportamiento.

Considere el siguiente ejemplo para un SLO basado en monitores que contiene 3 monitores. El cálculo para un SLO basado en monitores, utilizando un único monitor de alerta múltiple, sería similar.

| Monitor            | t1 | t2 | t3    | t4 | t5    | t6 | t7 | t8 | t9    | t10 | Estado |
|--------------------|----|----|-------|----|-------|----|----|----|-------|-----|--------|
| Monitor 1          | OK | OK | OK    | OK | ALERTA | OK | OK | OK | OK    | OK  | 90%    |
| Monitor 2          | OK | OK | OK    | OK | OK    | OK | OK | OK | ALERTA | OK  | 90%    |
| Monitor 3          | OK | OK | ALERTA | OK | ALERTA | OK | OK | OK | OK    | OK  | 80%    |
| **Estado general** | OK | OK | ALERTA | OK | ALERTA | OK | OK | OK | ALERTA | OK  | 70%    |

En este ejemplo, el estado general es inferior al promedio de los estados individuales.

Silenciar un monitor no afecta el cálculo del SLO. Para excluir períodos de tiempo de un cálculo de SLO, utilice la función [correcciones de estado de SLO][5].

### Excepciones para pruebas Synthetic {#exceptions-for-synthetic-tests}
En ciertos casos, existe una excepción en el cálculo del estado para los SLO basados en monitores que se componen de una prueba Synthetic agrupada. Las pruebas Synthetic tienen condiciones de alerta especiales opcionales que cambian el comportamiento de cuándo la prueba entra en estado de ALERTA y, en consecuencia, afectan el tiempo de actividad general:

- Espere hasta que los grupos fallen durante un número específico de minutos (predeterminado: 0)
- Espere hasta que un número específico de grupos fallen (predeterminado: 1)
- Reintente un número específico de veces antes de que la prueba de una ubicación se considere fallida (predeterminado: 0)

Si cambia cualquiera de estas condiciones a algo distinto de sus valores predeterminados, el estado general de un SLO basado en seguimiento que utiliza una prueba Synthetic podría parecer mejor que los estados agregados de los grupos individuales de la prueba Synthetic.

Para obtener más información sobre las condiciones de alerta de las pruebas Synthetic, consulte [Synthetic Monitoring][4].

### Datos faltantes {#missing-data}
#### Seguimientos de métricas {#metric-monitors}
Cuando crea un seguimiento de métricas, elige [cómo manejará el seguimiento los datos faltantes][6]. Esta configuración afecta cómo el cálculo de un SLO basado en seguimiento interpreta los datos faltantes:

| Configuración del seguimiento     | Cálculo de SLO de datos faltantes |
|---------------------------|---------------------------------|
| `Evaluate as zero`        | Depende del umbral de alerta del seguimiento <br> Por ejemplo, un umbral de `> 10` resultaría en tiempo de actividad (ya que el estado del seguimiento sería `OK`), mientras que un umbral de `< 10` resultaría en tiempo de inactividad.                             |
| `Show last known status`  | Mantener el último estado del SLO          |
| `Show NO DATA`            | Tiempo de actividad                          |
| `Show NO DATA and notify` | Tiempo de inactividad                        |
| `Show OK`                 | Tiempo de actividad                          |

#### Otros tipos de seguimientos {#other-monitor-types}
Cuando crea un seguimiento de verificación de servicio, elige si envía una alerta cuando faltan datos. Esta configuración afecta cómo el cálculo de SLO basado en seguimientos interpreta los datos faltantes. Para los seguimientos configurados para ignorar los datos faltantes, los periodos de tiempo con datos faltantes son tratados como OK (tiempo de actividad) por el SLO. Para los seguimientos configurados para alertar sobre datos faltantes, los periodos de tiempo con datos faltantes son tratados como ALERT (tiempo de inactividad) por el SLO.

Si pausa una prueba Synthetic, el SLO elimina el periodo de tiempo con datos faltantes de su cálculo. En la interfaz de usuario, estos periodos de tiempo están marcados en gris claro en la barra de estado del SLO.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors/create
[2]: https://app.datadoghq.com/slo
[3]: /es/service_level_objectives/metric/
[4]: /es/synthetics/api_tests/?tab=httptest#alert-conditions
[5]: /es/service_level_objectives/#slo-status-corrections
[6]: /es/monitors/configuration/#no-data