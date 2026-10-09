---
aliases:
- /es/product_analytics/experimentation/
description: Utilice Datadog Experiments para medir la relación causal que las nuevas
  experiencias o funcionalidades tienen en los resultados de negocio, el comportamiento
  del usuario y el rendimiento de la aplicación.
further_reading:
- link: https://www.datadoghq.com/blog/experiments
  tag: Blog
  text: Mida el impacto comercial de cada cambio de producto con Datadog Experiments
- link: https://www.datadoghq.com/blog/datadog-product-analytics
  tag: Blog
  text: Tome decisiones de diseño basadas en datos con Product Analytics
title: Planifique y lance experimentos
---
## Descripción general {#overview}

Planifique y lance [experimentos][8] para medir cómo las nuevas funcionalidades afectan los resultados de negocio, el comportamiento del usuario y el rendimiento de la aplicación.

## Requisitos previos {#prerequisites}

<div class="alert alert-info">Debe tener los permisos adecuados de <a href="https://docs.datadoghq.com/account_management/rbac/permissions/#product-analytics">Product Analytics</a> y <a href="https://docs.datadoghq.com/account_management/rbac/permissions/#feature-flags">Feature Flags</a> para crear y lanzar experimentos.</div>

Antes de comenzar, asegúrese de tener:

- Un [Feature Flag][4] para implementar y gestionar las variantes de experimento que desea probar.
- Al menos una [métrica de experimento][2] para medir el resultado de su experimento.
- Un [tipo de sujeto][6] para establecer el nivel en el que Datadog aleatoriza su experimento.

## Planifique su experimento {#plan-your-experiment}

Asigne un nombre y una hipótesis a su experimento, luego defina la configuración.

### Redacte su experimento {#draft-your-experiment}

Para crear un borrador de experimento:

1. Navegue a [{{< ui >}}Experiments{{< /ui >}} > {{< ui >}}Experiment List{{< /ui >}}][1] en Datadog Product Analytics.
1. Haga clic en {{< ui >}}Create Experiment{{< /ui >}} para abrir el cuadro de diálogo, luego ingrese su {{< ui >}}Experiment name{{< /ui >}} y {{< ui >}}Hypothesis{{< /ui >}}.
1. Haga clic en {{< ui >}}Create Draft Experiment{{< /ui >}} para abrir la página de configuración del experimento y continúe a [Configure su experimento](#set-up-your-experiment).

{{< img src="/product_analytics/experiment/exp_plan_launch_create_experiment.png" alt="El cuadro de diálogo Crear nuevo borrador de experimento con un nombre de experimento de Nuevo experimento de fotos de productos, una hipótesis sobre que las fotos de productos de mayor resolución aumentan las conversiones de agregar al carrito, y un botón Crear borrador de experimento resaltado." style="width:80%;" >}}

También puede crear un experimento directamente desde la página de detalles de un Feature Flag:

1. Navegue a la página [{{< ui >}}Feature Flags{{< /ui >}}][7] y seleccione la pestaña {{< ui >}}Overview{{< /ui >}}.
1. Seleccione el Feature Flag que desea utilizar para su experimento para abrir su página de detalles.
1. En la sección {{< ui >}}Targeting rules & rollouts{{< /ui >}}, haga clic en {{< ui >}}Create New Experiment{{< /ui >}} para abrir el cuadro de diálogo.
1. En el cuadro de diálogo, haga clic en {{< ui >}}Create Experiment{{< /ui >}} para abrir la página de configuración del experimento.
1. En la página de configuración del experimento, Datadog completa previamente el {{< ui >}}Experiment name{{< /ui >}} con el nombre del Feature Flag. Edítela según sea necesario.
1. Ingrese su {{< ui >}}Hypothesis{{< /ui >}} y continúe a [Configurar su experimento](#set-up-your-experiment).

{{< img src="/product_analytics/experiment/exp_plan_launch_ff_new_experiment.png" alt="La página de detalles del Feature Flag para un Feature Flag llamado new_product_photos, que muestra las reglas de segmentación y los despliegues con una división 50/50 entre las variantes de control y tratamiento, y un botón Crear nuevo experimento resaltado en la parte inferior." style="width:80%;" >}}

### Configurar su experimento {#set-up-your-experiment}

Después de crear su experimento, defina las métricas, el Feature Flag y la configuración de aleatorización.

#### Establecer métricas de decisión {#set-decision-metrics}

Para definir las métricas que miden el resultado de su experimento:

1. Use el menú desplegable {{< ui >}}Calculate metrics by{{< /ui >}} para seleccionar el tipo de sujeto.
   - Para definir un tipo de sujeto personalizado, seleccione {{< ui >}}Create subject type{{< /ui >}} en el menú desplegable.
1. Haga clic en el botón {{< ui >}}Primary metric{{< /ui >}} para abrir el selector:
   1. Seleccione una métrica principal para el resultado que desea medir.
   1. (Opcional) Haga clic en la pestaña {{< ui >}}Certified{{< /ui >}} o {{< ui >}}Non-certified{{< /ui >}} para filtrar la lista.
   1. (Opcional) Haga clic en {{< ui >}}Create Metric{{< /ui >}} para definir una nueva métrica. Para obtener instrucciones de configuración, consulte [Create Experiment Metrics][2].
1. (Opcional) Haga clic en el botón {{< ui >}}Secondary metrics{{< /ui >}} para agregar métricas de protección, las cuales hacen un seguimiento de los efectos no deseados del experimento en otras áreas como el rendimiento, la participación o los ingresos.
1. Proceda a [Ejecutar un cálculo del tamaño de la muestra (opcional)](#run-a-sample-size-calculation-optional) o salte a [Agregar un Feature Flag](#add-a-feature-flag).

{{< img src="/product_analytics/experiment/exp_plan_launch_decision_metric.png" alt="La página de configuración del experimento que muestra la sección de métricas de decisión con un menú desplegable Calcular métricas por configurado en Usuario (@usr.id), una métrica principal configurada en Conversión de agregar al carrito y una sección de métricas secundarias." style="width:80%;" >}}

#### Ejecutar un cálculo del tamaño de la muestra (opcional) {#run-a-sample-size-calculation-optional}

La calculadora de tamaño de muestra estima el número de usuarios y la duración necesaria para detectar un efecto significativo. Usted elige un punto de entrada, el evento que asigna usuarios al experimento, y Datadog utiliza el volumen de tráfico hacia ese evento para producir la estimación.

Para ejecutar el cálculo:

1. En la sección {{< ui >}}Run a sample size calculation (optional){{< /ui >}}, haga clic en el enlace **calculadora de tamaño de muestra** para abrir el panel lateral.
1. Expanda {{< ui >}}Calculation details{{< /ui >}}. Sus métricas principales y secundarias aparecen bajo {{< ui >}}Metrics{{< /ui >}}.
1. Use el menú desplegable {{< ui >}}Entry point{{< /ui >}} para seleccionar el evento que asigna usuarios al experimento, como ver una página de pago o hacer clic en un botón de agregar al carrito. Datadog utiliza este evento para estimar el volumen de tráfico.
1. (Opcional) Bajo {{< ui >}}Filter entry point{{< /ui >}}, limite la audiencia del punto de entrada:
   1. Haga clic en {{< ui >}}\+ Filter{{< /ui >}} y seleccione una propiedad del selector. Si no ve la propiedad que necesita, escriba el nombre de la propiedad en el campo {{< ui >}}Custom property{{< /ui >}} y haga clic en {{< ui >}}Add{{< /ui >}}.
   1. En la fila de filtro que aparece, modifique el operador según sea necesario y seleccione un valor del menú desplegable.
   1. (Opcional) Haga clic en {{< ui >}}\+ Filter{{< /ui >}} para agregar más filas. Entre las filas, use el menú desplegable para seleccionar {{< ui >}}or{{< /ui >}} o {{< ui >}}and{{< /ui >}} para establecer cómo se combinan los filtros.
1. Establezca {{< ui >}}Number of variants{{< /ui >}} y {{< ui >}}Traffic exposure{{< /ui >}}.
1. Expanda {{< ui >}}Additional inputs{{< /ui >}}, luego elija la {{< ui >}}Power{{< /ui >}} estadística e ingrese una {{< ui >}}Target experiment duration{{< /ui >}} en semanas.
   - El valor {{< ui >}}Target experiment duration{{< /ui >}} debe ser 1 o un número par, ya que la calculadora estima los valores de MDE y el recuento esperado de usuarios en intervalos de 1, 2, 4, 6 y 8 semanas.
1. Haga clic en {{< ui >}}Run Calculation{{< /ui >}} para ver una estimación del **[Efecto mínimo detectable (MDE)][3] a lo largo del tiempo** para sus métricas.
1. Cierre el panel lateral y continúe con [Agregar un Feature Flag](#add-a-feature-flag).

{{< img src="/product_analytics/experiment/exp_plan_launch_sample_size.png" alt="El panel lateral de la Calculadora de tamaño de muestra que muestra los detalles del cálculo con la Conversión de agregar al carrito como métrica principal y el Número de vistas del carrito como métrica secundaria (de protección), un punto de entrada configurado para hacer clic en AGREGAR AL CARRITO, dos variantes con un 100% de exposición al tráfico y entradas adicionales para la potencia y la duración objetivo del experimento." style="width:80%;" >}}

#### Agregue un Feature Flag {#add-a-feature-flag}

Para agregar un Feature Flag para controlar cómo Datadog divide el tráfico entre las variantes del experimento:

1. En la sección {{< ui >}}Feature flag{{< /ui >}}, haga clic en el botón {{< ui >}}Add a feature flag{{< /ui >}} para abrir el selector.
1. Seleccione el Feature Flag para su experimento.
   - Si no ha creado un Feature Flag, haga clic en {{< ui >}}Create New Feature Flag{{< /ui >}}. Para obtener instrucciones de configuración, consulte [Cree su primer Feature Flag][9].
1. Continúe con [Configurar la aleatorización](#configure-randomization).

{{< img src="/product_analytics/experiment/exp_plan_launch_add_ff.png" alt="El selector de Feature Flags que muestra una lista de Feature Flags disponibles ordenados por fecha de creación, con new_product_photos seleccionado y sus detalles mostrados, incluida la clave de Feature Flag new-product-photos, tipo booleano y un enlace Crear nuevo Feature Flag en la parte inferior." style="width:80%;" >}}

#### Configurar la aleatorización {#configure-randomization}

Aleatorice a sus usuarios y divida el tráfico entre las variantes de su experimento.

Después de seleccionar un Feature Flag, Datadog completa previamente la configuración de aleatorización según la configuración del Feature Flag.

<div class="alert alert-info">La configuración de aleatorización que configure aquí tiene el siguiente efecto después de iniciar su experimento:<br><br><ul><li>Datadog agrega una regla de segmentación al Feature Flag seleccionado.</li><li>Si varios experimentos comparten el mismo Feature Flag, Datadog evalúa el tráfico según el orden de las reglas de segmentación del Feature Flag. Puede reordenar las reglas de segmentación en el cuadro de diálogo de confirmación antes de iniciar su experimento.</li></ul></div>

Para configurar la aleatorización:

1. Seleccione el {{< ui >}}Environment{{< /ui >}} para su experimento en el menú desplegable.
1. En {{< ui >}}Targeting rules{{< /ui >}}, configure un filtro para segmentar usuarios según atributos personalizados (por ejemplo, rol de usuario o nivel de suscripción) que haya establecido en su [contexto de evaluación][10]:
   1. Haga clic en {{< ui >}}Add Filter{{< /ui >}}. Para la fila `IF`, ingrese un atributo y un valor, y seleccione un operador en el menú desplegable.
   1. (Opcional) Refine su regla de segmentación:
      - Para agregar una fila `AND` dentro del mismo filtro, haga clic en {{< ui >}}Add Condition{{< /ui >}}.
      - Para agregar otro filtro unido por `OR`, haga clic en {{< ui >}}Add Filter{{< /ui >}}.
1. En {{< ui >}}Variants{{< /ui >}}, use el menú desplegable {{< ui >}}Randomize users and split traffic{{< /ui >}} para elegir {{< ui >}}Equally (recommended){{< /ui >}} o {{< ui >}}Custom{{< /ui >}}. Esto establece cómo Datadog divide el tráfico entre sus variantes. Cada usuario ve solo su variante asignada durante todo el experimento.
   - Si selecciona {{< ui >}}Custom{{< /ui >}}, ingrese un porcentaje para cada variante. Los porcentajes deben sumar 100%.
1. En {{< ui >}}Traffic exposure{{< /ui >}}, establezca el porcentaje de usuarios que cumplen con sus reglas de segmentación para incluirlos en el experimento.
1. (Opcional) [Programar un despliegue gradual](#schedule-a-staged-rollout), [Configurar ajustes adicionales](#additional-configs), o ambos.
1. Después de configurar su experimento, proceda a [Lanzar su experimento](#launch-your-experiment).

{{< img src="/product_analytics/experiment/exp_plan_launch_randomization_section.png" alt="La sección de aleatorización con el entorno configurado en prod, dos filtros de reglas de segmentación unidos por OR (cada uno con una condición IF y AND con un botón Agregar condición), un botón Agregar filtro debajo, una división equitativa 50/50 entre las variantes Control (true) y Tratamiento (false), y la exposición al tráfico configurada al 100% del tráfico segmentado con una opción Agregar pasos de despliegue." style="width:80%;" >}}

{{% collapse-content title="Configuraciones adicionales (opcional)" level="h4" expanded=false id="additional-configs" %}}

##### Programar un despliegue gradual {#schedule-a-staged-rollout}

Para aumentar gradualmente el tráfico del experimento en lugar de lanzarlo a todos los usuarios a la vez:

1. En la sección {{< ui >}}Randomization{{< /ui >}}, haga clic en {{< ui >}}Add Rollout Steps{{< /ui >}} y seleccione una configuración de pasos preestablecida en el menú desplegable (por ejemplo, 3 pasos del 5% al 100%).
1. Ajuste el porcentaje de {{< ui >}}Traffic exposure{{< /ui >}} para cada paso según sea necesario.
1. Junto a {{< ui >}}Scheduled rollout by holding between steps for{{< /ui >}}, use los dos menús desplegables para seleccionar un número y una unidad de tiempo (por ejemplo, {{< ui >}}1{{< /ui >}} y {{< ui >}}days{{< /ui >}}). Esto establece cuánto tiempo se ejecuta cada paso antes de avanzar.

En cada paso del despliegue, Datadog toma una muestra de un porcentaje de usuarios elegibles para incluirlos en el experimento. Los usuarios fuera de la muestra siguen viendo la experiencia predeterminada (control), pero Datadog no los incluye en los resultados del experimento.

##### Configurar notificaciones {#set-notifications}

Dirija las notificaciones a las personas adecuadas a medida que avanza el experimento.

En la sección {{< ui >}}Notifications{{< /ui >}}, utilice el menú desplegable {{< ui >}}Recipients{{< /ui >}} para seleccionar quién recibe notificaciones sobre los eventos del ciclo de vida del experimento, como cuando los resultados alcanzan significancia estadística o Datadog detecta un problema.

##### Elija un plan de análisis estadístico {#choose-a-statistical-analysis-plan}

Configure cómo Datadog calcula la significancia estadística para su experimento. Para obtener orientación sobre cómo elegir un método, consulte [Métodos de análisis][11].

Datadog copia la configuración de análisis estadístico predeterminada de su organización cuando crea un experimento. Si su organización ha configurado los valores predeterminados, aparecerá una insignia {{< ui >}}COMPANY DEFAULT{{< /ui >}}. Los cambios posteriores en los valores predeterminados de su organización se aplican a los experimentos recién creados y no cambian los experimentos existentes.

Para modificar el plan de análisis estadístico:

1. Expanda la sección {{< ui >}}Statistical analysis plan{{< /ui >}}.
1. Seleccione un método en el menú desplegable {{< ui >}}Confidence interval method{{< /ui >}}.
   - Si selecciona {{< ui >}}Bayesian{{< /ui >}}, elija un {{< ui >}}Standard Deviation of Prior{{< /ui >}} en el menú desplegable.
1. Seleccione un porcentaje en el menú desplegable {{< ui >}}Confidence level{{< /ui >}}.
1. Para deshabilitar [CUPED][12], desactive {{< ui >}}CUPED calculation{{< /ui >}}. CUPED está habilitado de forma predeterminada y utiliza datos previos al experimento de cada sujeto para reducir la varianza de la métrica y mejorar la sensibilidad del experimento.
1. Para controlar la tasa de error familiar, active {{< ui >}}Multiple testing correction{{< /ui >}}. Esta configuración se ajusta para comparaciones de múltiples métricas y variantes de tratamiento, lo que produce resultados más conservadores. Para obtener más detalles, consulte [Corrección de pruebas múltiples][13].
   - Esta configuración no está disponible cuando utiliza el método {{< ui >}}Bayesian{{< /ui >}}.
1. Haga clic en {{< ui >}}Reset to Default{{< /ui >}} para restaurar los valores predeterminados de análisis estadístico copiados cuando se creó el experimento, incluidos los valores predeterminados de la empresa vigentes en ese momento.

##### Agregue dimensiones de exploración de división por {#add-split-by-exploration-dimensions}

Segmente los resultados de su experimento por propiedades (también llamadas atributos) de su [contexto de evaluación][10].

Para configurar las dimensiones de división por:

1. Expanda la sección {{< ui >}}Split-by exploration dimensions{{< /ui >}}.
1. Seleccione propiedades del menú desplegable {{< ui >}}Properties to compute for dimensional analysis{{< /ui >}}. Las propiedades disponibles tienen el prefijo `context.`.
1. Si no ve la propiedad que necesita:
   1. Escriba el nombre de la propiedad en el campo desplegable, con el prefijo `context.` (por ejemplo, `context.team`). Luego, haga clic en {{< ui >}}Add custom property{{< /ui >}} para abrir el cuadro de diálogo {{< ui >}}Split-by exploration dimensions{{< /ui >}}.
   1. Verifique que el {{< ui >}}Column Name{{< /ui >}} coincida con el nombre de la propiedad que ingresó.
   1. Seleccione la propiedad {{< ui >}}Type{{< /ui >}} del menú desplegable.
   1. Haga clic en {{< ui >}}Save{{< /ui >}}. La propiedad personalizada aparece en el menú desplegable {{< ui >}}Properties to compute for dimensional analysis{{< /ui >}}.

{{% /collapse-content %}}

## Lanzar su experimento {#launch-your-experiment}

Para lanzar su experimento:

1. Haga clic en {{< ui >}}Start Experiment{{< /ui >}} para abrir el cuadro de diálogo {{< ui >}}Confirm starting the experiment{{< /ui >}}.
1. En el cuadro de diálogo, revise el entorno, el indicador de funciones y las reglas de segmentación del indicador para verificar su exactitud.
   - Si varios experimentos comparten el mismo indicador, use las flechas hacia arriba y hacia abajo en cada regla de segmentación para reordenarlos.
1. Haga clic en {{< ui >}}Start Experiment & Enable Flag{{< /ui >}} para iniciar el experimento.

Al iniciar el experimento se abre la página {{< ui >}}Flag & Exposures{{< /ui >}}. Verifique que su configuración esté activa:
- Revise {{< ui >}}Exposure balance check{{< /ui >}} para confirmar que sus variantes estén divididas en los porcentajes que configuró.
- Haga clic en {{< ui >}}View Exposures Log{{< /ui >}} para hacer un seguimiento de la inscripción de usuarios en tiempo real.

Consulte [Reading Experiment Results][5] para revisar sus datos.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/product-analytics/experiments
[2]: /es/experiments/defining_metrics
[3]: /es/experiments/statistics/minimum_detectable_effect
[4]: /es/getting_started/feature_flags
[5]: /es/experiments/reading_results
[6]: https://app.datadoghq.com/product-analytics/experiments/settings/subject-types
[7]: https://app.datadoghq.com/feature-flags
[8]: /es/experiments/
[9]: /es/getting_started/feature_flags/#create-your-first-feature-flag
[10]: https://docs.datadoghq.com/es/feature_flags/client#context-attribute-requirements
[11]: /es/experiments/statistics/analysis_methods
[12]: /es/experiments/statistics/cuped
[13]: /es/experiments/statistics/multiple_testing_correction