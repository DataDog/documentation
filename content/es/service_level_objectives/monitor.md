---
aliases:
- /es/monitors/service_level_objectives/monitor/
- /es/service_management/service_level_objectives/monitor/
description: 'Utiliza los monitores para definir el Objetivo de nivel servicio '
further_reading:
- link: /monitors/
  tag: Documentación
  text: Más información sobre Monitores
- link: https://www.datadoghq.com/blog/define-and-manage-slos/#monitor-based-slo
  tag: Blog
  text: Mejores prácticas para gestionar tus SLOs con Datadog
- link: https://www.datadoghq.com/blog/slo-synthetic-monitoring/
  tag: Blog
  text: Mejorar la precisión y el rendimiento de los SLOs con la monitorización Synthetic
    en Datadog
title: SLOs basados en monitores
---

## Información general
Para crear un SLO a partir de monitores de Datadog nuevos o existentes, crea un SLO basado en un monitor. Utilizando un SLO basado en un monitor, puedes calcular el Indicador de nivel de servicio (SLI) dividiendo la cantidad de tiempo que tu sistema muestra un buen comportamiento por el tiempo total.

<div class="alert alert-info">Los SLOs por intervalos de tiempo son otra forma de crear SLOs con un cálculo de SLI basado en el tiempo. Con los SLOs basados en el tiempo, puedes crear un SLO de tiempo de actividad sin pasar por un monitor, por lo que no tienes que crear ni mantener tanto un monitor como un SLO.</div>

{{< img src="service_management/service_level_objectives/monitor_slo_side_panel.png" alt="Ejemplo de SLO basado en un monitor" >}}

## Requisitos previos

Para crear un SLO basado en monitor, necesitas un monitor Datadog existente. Para crear un nuevo monitor, ve a la [monitor creation page (página de creación de monitor)][1].

Los SLOs basados en monitor Datadog soportan los siguientes tipos de monitores:
- Tipos de Monitores de métrica (métrica, integración, métrica APM, anomalía, predicción, outlier)
- Synthetic
- Checks de servicio

## Instalación

En la [página de estado de SLO][2], haz clic en **+ New SLO** (+ Nuevo SLO). A continuación, selecciona **By Monitor Uptime** (Por tiempo de actividad del monitor).

### Definir consultas


En la casilla Buscar, empieza a escribir el nombre de un monitor. Aparecerá una lista de monitores coincidentes. Haz clic en un nombre de monitor para añadirlo a la lista de fuentes.

**Notas**:

- Si utilizas un monitor único de múltiples alertas en un SLO, puedes seleccionar opcionalmente "Calculate on selected groups" (Calcular en grupos seleccionados) y elegir hasta 20 grupos.
- Si estás añadiendo varios monitores a tu SLO, no se admite la selección de grupos. Puedes añadir hasta 20 monitores.

### Establece tus objetivos SLO

Selecciona un porcentaje **target** (objetivo), **time window** (ventana de tiempo) y nivel opcional de **warning** (advertencia).

El porcentaje objetivo especifica el porcentaje de tiempo que los monitores subyacentes del SLO no deben estar en estado de ALERTA. La ventana de tiempo especifica el periodo continuo en el que el SLO ejecuta su cálculo.

Dependiendo del valor del SLI, la interfaz de usuario Datadog muestra el estado del SLO en un color diferente:
- Mientras el SLI se mantiene por encima del objetivo, la interfaz de usuario muestra el estado del SLO en verde.
- Cuando el SLI cae por debajo del objetivo, la interfaz de usuario muestra el estado del SLO en rojo.
- Si incluiste un nivel de advertencia, y el SLI cae por debajo de la advertencia, pero por encima del nivel objetivo, la interfaz de usuario muestra el estado de SLO en amarillo.

La ventana temporal que elijas cambia la precisión disponible para tus SLOs basados en monitor:
- Las ventanas de tiempo de 7 y 30 días permiten hasta dos decimales.
- Las ventanas de 90 días permiten hasta tres decimales.

En la IU de detalles del SLO, Datadog muestra dos decimales para los SLOs configurados con ventanas de tiempo de 7 y 30 días y tres decimales para los SLOs configurados con ventanas de tiempo de 90 días.

El siguiente ejemplo demuestra por qué Datadog muestra un número limitado de decimales para los cálculos de SLO. Un objetivo del 99,999% para una ventana de tiempo de 7 o 30 días da como resultado un presupuesto de error de 6 segundos o 26 segundos, respectivamente. Los monitores evalúan cada minuto, por lo que la granularidad de un SLO basado en monitor también es de 1 minuto. Por lo tanto, una alerta consumiría totalmente y gastaría en exceso el presupuesto de error de 6 segundos o 26 segundos del ejemplo anterior. En la práctica, los equipos no pueden satisfacer presupuestos de error tan pequeños.

Si necesitas una granularidad más fina que la evaluación de monitor de una vez por minuto, considera el uso de [metric-based SLOs (SLOs basados en métrica)][3] en su lugar.

### Añadir nombre y etiquetas (tags)

Elige un nombre y una descripción ampliada para tu SLO. Selecciona cualquier etiqueta que desees asociar con tu SLO. Selecciona **Create** (Crear) o **Create & Set Alert** (Crear y establecer alerta) para guardar tu nuevo SLO.

## Cálculo del estado

{{< img src="service_management/service_level_objectives/monitor_slo_overall_status.png" alt="SLO basado en un monitor con grupos" >}}

Datadog calcula el estado general de SLO como el porcentaje de tiempo de actividad en todos monitores o grupos de monitor, a menos que se hayan seleccionado grupos específicos:
- Si se han seleccionado grupos específicos (hasta 20), el estado SLO se calcula solo con esos grupos. La interfaz de usuario muestra todos los grupos seleccionados. 
- Si no se seleccionan grupos específicos, el estado del SLO se calcula en *todos* los grupos. La interfaz de usuario muestra todos los grupos subyacentes del SLO. 

**Nota:** Para los SLOs basados en monitor con grupos, se pueden mostrar todos los grupos para cualquier SLO que contenga hasta 5000 grupos. Para los SLOs que contengan más de 5000 grupos, el SLO se calcula en función de todos los grupos, pero no se muestra ningún grupo en la interfaz de usuario.

Los SLOs basados en monitor tratan el estado `ADVERTIR` como `OK`. La definición de un SLO requiere una distinción binaria entre buen y mal comportamiento. Los cálculos de SLO tratan `ADVERTIR` como buen comportamiento ya que `WARN` no es lo suficientemente grave como para indicar un mal comportamiento.

Considera el siguiente ejemplo para un SLO basado en monitor que contiene 3 monitores. El cálculo para un SLO basado en monitor basado en un monitor de una sola alerta múltiple sería similar.

| Monitor            | t1 | t2 | t3    | t4 | t5    | t6 | t7 | t8 | t9    | t10 | Estado |
|--------------------|----|----|-------|----|-------|----|----|----|-------|-----|--------|
| Monitor 1          | OK | OK | OK    | OK | ALERTA | OK | OK | OK | OK    | OK  | 90%    |
| Monitor 2          | OK | OK | OK    | OK | OK    | OK | OK | OK | ALERTA | OK  | 90%    |
| Monitor 3          | OK | OK | ALERTA | OK | ALERTA | OK | OK | OK | OK    | OK  | 80%    |
| **Overall Status** (Estado general) | OK | OK | ALERTA | OK | ALERTA | OK | OK | OK | ALERTA | OK  | 70%    |

En este ejemplo, el estado global es inferior a la media de los estados individuales.

Silenciar un monitor no afecta al cálculo de SLO. Para excluir periodos de un cálculo de SLO, utiliza la función [Correcciones de estado de SLO][5].

### Excepciones para las pruebas de Synthetic
En determinados casos, existe una excepción al cálculo del estado para las SLOs basadas en monitor que se componen de una prueba agrupada de Synthetic. Las pruebas de Synthetic tienen condiciones de alerta especiales opcionales que cambian el comportamiento de cuándo la prueba entra en estado de ALERTA y, en consecuencia, afectan al tiempo de actividad general:

- Esperar a que los grupos fallen durante un número especificado de minutos (por defecto: 0)
- Esperar a que falle un número especificado de grupos (por defecto: 1)
- Reintentar un número especificado de veces antes de que la prueba de localización se considere un fracaso (por defecto: 0)

Si cambias cualquiera de estas condiciones a algo distinto de sus valores predeterminados, el estado general de un SLO basado en monitor utilizando una prueba de Synthetic podría parecer mejor que los estados agregados de los grupos individuales de la prueba de Synthetic.

Para más información sobre las condiciones de alerta de la prueba de Synthetic, puedes ver [Synthetic Monitoring (monitor de Synthetic)][4].

### Datos faltantes 
#### Monitores de métrica
Cuando se crea un monitor de métrica, se elige [cómo tratará el monitor los datos que faltan][6]. Esta configuración afecta al modo en que un cálculo de SLO basado en un monitor interpreta los datos que faltan:

| Configuración del monitor     | Cálculo de SLO de los datos que faltan |
|---------------------------|---------------------------------|
| `Evaluate as zero`        | Depende del umbral de alerta del monitor <br> Por ejemplo, un umbral de `> 10` daría como resultado Uptime (Tiempo de actividad) (ya que el estado del monitor sería `OK`), mientras que un umbral de `< 10` daría como resultado Downtime (Caída del sistema).                             |
| `Show last known status`  | Mantener último estado de SLO          |
| `Show NO DATA`            | Tiempo de actividad                          |
| `Show NO DATA and notify` | Caída del sistema                        |
| `Show OK`                 | Tiempo de actividad                          |

#### Otros tipos de monitores
Cuando se crea un monitor de check de servicio, se elige si se envía una alerta cuando faltan datos. Esta configuración afecta a cómo un cálculo de SLO basado en un monitor interpreta los datos que faltan. Para monitores configurados para ignorar los datos que faltan, los periodos con datos que faltan son tratados como OK (tiempo de actividad) por el SLO. Para monitores configurados para alertar sobre datos faltantes, los periodos con datos faltantes son tratados como ALERT (caída del sistema) por el SLO.

Si pausas una prueba de Synthetic, el SLO elimina de su cálculo el período con datos faltantes. En la interfaz de usuario, estos períodos aparecen marcados en gris claro en la barra de estado del SLO.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors/create
[2]: https://app.datadoghq.com/slo
[3]: /es/service_level_objectives/metric/
[4]: /es/synthetics/api_tests/?tab=httptest#alert-conditions
[5]: /es/service_level_objectives/#slo-status-corrections
[6]: /es/monitors/configuration/#no-data