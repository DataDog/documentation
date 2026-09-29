---
description: Prediga los costos futuros de la nube y tome decisiones informadas con
  los pronósticos de Cloud Cost Management.
further_reading:
- link: /cloud_cost_management/planning/budgets
  tag: Documentación
  text: Obtenga información sobre los presupuestos de Cloud Cost Management
- link: /cloud_cost_management/reporting/
  tag: Documentación
  text: Obtenga información sobre los informes de Cloud Cost Management
- link: /cloud_cost_management/
  tag: Documentación
  text: Cloud Cost Management
- link: https://www.datadoghq.com/blog/cloud-cost-management-budget-forecasting/
  tag: Blog
  text: Proyecte y administre el gasto en la nube con la previsión presupuestaria
    de Datadog
title: Pronóstico
---
## Descripción general {#overview}

Los pronósticos de Cloud Cost Management (CCM) le ayudan a predecir los costos futuros de la nube basados en patrones de gasto históricos. Utilice los pronósticos para anticipar tendencias de costos, planificar presupuestos de manera más efectiva y tomar decisiones basadas en datos sobre la asignación de recursos.

Los pronósticos están disponibles en:
- [**Informes**](#view-forecasts-in-reports): Active el interruptor de pronóstico en los informes de costos y los informes de presupuesto para visualizar los costos previstos.
- [**Presupuestos**](#view-forecasts-in-budgets): Vea los costos pronosticados directamente en las tarjetas de presupuesto para ver si tiene una proyección de exceder el presupuesto.

Con los pronósticos, usted puede:

- Anticipar **tendencias de gasto** basadas en sus datos históricos para predecir costos futuros.
- Visualizar **costos proyectados** junto con el gasto real para identificar patrones y comprender las tendencias de costos.
- Utilizar datos de pronóstico para establecer **objetivos presupuestarios realistas** y evitar sobrecostos.
- Ver si los costos pronosticados tienen una proyección de **exceder sus objetivos** presupuestarios para realizar un seguimiento de la salud del presupuesto.

## Cómo funciona el pronóstico {#how-forecasting-works}

Cloud Cost Management utiliza algoritmos de pronóstico para generar predicciones de costos. El modelo de pronóstico analiza sus datos históricos de gasto para identificar patrones y tendencias en los costos de su nube, incluyendo:

- Costos recurrentes que ocurren en un **cronograma predecible** (como ciclos semanales o mensuales).
- Si sus costos están **aumentando, disminuyendo o manteniéndose estables** a lo largo del tiempo.
- Cambios en el gasto que corresponden a **períodos o eventos específicos**.

### Opciones de pronóstico flexibles {#flexible-forecasting-options}

Puede generar pronósticos para varios horizontes temporales e intervalos de acumulación para satisfacer sus necesidades de planificación:

- {{< ui >}}Forecast periods{{< /ui >}}: Prediga los costos para el próximo período de facturación, el mes actual, el año actual o un rango de fechas personalizado basado en sus datos históricos de gasto.
- {{< ui >}}Rollup intervals{{< /ui >}}: Visualización de pronósticos en intervalos diarios o mensuales según sus requisitos de análisis.

### Requisitos de datos {#data-requirements}

Para generar pronósticos precisos, CCM requiere:

- **Al menos 64 días consecutivos de datos de costos**: Esto ayuda a garantizar que el modelo tenga suficiente información para identificar patrones significativos. Si hay menos días disponibles, el modelo completa los días restantes con ceros para generar un pronóstico.
- **El modelo utiliza hasta los últimos 64 días de su historial de gasto para generar predicciones.**

## Bits y pronósticos personalizados {#bits-and-custom-forecasts}

El pronóstico que Datadog genera automáticamente a partir de su gasto histórico se denomina **pronóstico de Bits**. Debido a que se basa en tendencias, proyecta patrones pasados hacia el futuro, pero no puede tener en cuenta eventos comerciales planificados, como el lanzamiento de un producto, una migración o la demanda estacional.

En [presupuestos][3], puede anular el pronóstico de Bits con sus propios valores mensuales, denominados **pronóstico personalizado**. Datadog superpone su pronóstico personalizado al pronóstico de Bits, por lo que sus anulaciones tienen prioridad dondequiera que las establezca. Los presupuestos y los monitores de presupuesto utilizan el pronóstico con sus anulaciones de forma predeterminada.

Para establecer valores de pronóstico personalizados, consulte [Personalizar su pronóstico de presupuesto][4].

## Ver pronósticos en informes {#view-forecasts-in-reports}

Navegue a [**Cloud Cost > Analyze > Reports**][1] en Datadog para habilitar los pronósticos en los informes de Cloud Cost y los informes de presupuesto.

### Informes de Cloud Cost {#cost-reports}

1. Abra o cree un informe{{< ui >}}Cost{{< /ui >}}.
2. En el panel izquierdo, active {{< ui >}}Show forecast{{< /ui >}} para habilitar la previsión.
3. Seleccione el período de previsión en el menú desplegable {{< ui >}}Until end of{{< /ui >}} (período siguiente, mes actual, año actual o un rango personalizado).
4. Elija un intervalo de resumen (diario, semanal o mensual).

{{< img src="cloud_cost/forecasts/cost-report-with-forecast.png" alt="Informe de Cloud Cost que muestra el toggle \"Show Forecast\" en el panel izquierdo y los costos previstos mostrados junto a los datos históricos con un patrón de rayas." style="width:100%;" >}}

El informe muestra:
- {{< ui >}}Forecast toggle and controls{{< /ui >}}: Habilite la previsión, seleccione el período de tiempo y elija el intervalo de resumen.
- {{< ui >}}Historical costs{{< /ui >}}: Sus gastos reales mostrados en colores sólidos.
- {{< ui >}}Forecasted costs{{< /ui >}}: Costos previstos mostrados con un patrón de rayas.
- {{< ui >}}Forecast summary card{{< /ui >}}: Muestra el costo total previsto para el período seleccionado.

### Informes de presupuesto {#budget-reports}

1. Cree un informe o abra un informe {{< ui >}}Budget{{< /ui >}} existente.
2. En el panel izquierdo, active {{< ui >}}Show forecast{{< /ui >}} para habilitar la previsión.
3. Seleccione el período de previsión en el menú desplegable {{< ui >}}Until end of{{< /ui >}} (período siguiente, mes actual, año actual o un rango personalizado).

{{< img src="cloud_cost/forecasts/budget_report_forecast-2.png" alt="Informe de presupuesto que muestra el forecast toggle en el panel izquierdo y los costos previstos mostrados con datos históricos." style="width:100%;" >}}

El informe muestra:
- {{< ui >}}Forecast toggle and controls{{< /ui >}}: Ubicado en el panel izquierdo para habilitar la previsión y seleccionar el período de tiempo.
- {{< ui >}}Historical costs{{< /ui >}}: Sus gastos reales mostrados en colores sólidos.
- {{< ui >}}Forecasted costs{{< /ui >}}: Costos previstos mostrados con un patrón de rayas.
- {{< ui >}}Forecast summary card{{< /ui >}}: Muestra el costo total previsto para el período seleccionado.

## Ver pronósticos en presupuestos {#view-forecasts-in-budgets}

Navegue a [**Cloud Cost > Plan > Budgets**][2] en Datadog para ver las previsiones en sus resúmenes de presupuesto.

Las tarjetas de presupuesto muestran automáticamente información de pronóstico cuando está disponible, mostrando los costos proyectados para cada período presupuestario.

Si se proyecta que los costos pronosticados excedan su presupuesto, el estado del presupuesto indica {{< ui >}}Projected Over{{< /ui >}} para ayudarle a tomar medidas antes de exceder el presupuesto.

{{< img src="cloud_cost/forecasts/budget-list-with-forecast.png" alt="Lista de presupuestos que muestra los valores de previsión en las tarjetas de presupuesto" style="width:100%;" >}}

Para ver información detallada de la previsión:

1. Desde la página de Presupuestos, haga clic en {{< ui >}}View Performance{{< /ui >}} en cualquier presupuesto para abrir la vista detallada del presupuesto.
2. En la vista de rendimiento del presupuesto, active {{< ui >}}Show Forecast{{< /ui >}} para habilitar la previsión.
3. El gráfico de rendimiento del presupuesto muestra:
   - {{< ui >}}Actual costs{{< /ui >}}: Su gasto actual se muestra en colores sólidos.
   - {{< ui >}}Forecasted costs{{< /ui >}}: Los costos previstos se muestran con un patrón de rayas que se extiende más allá de sus costos reales.
   - {{< ui >}}Forecasted Past{{< /ui >}}: Una línea vertical que indica dónde comienza el pronóstico.

{{< img src="cloud_cost/forecasts/updated_budget_status_forecast-1.png" alt="Visualización de rendimiento del presupuesto que muestra el forecast toggle y los costos previstos mostrados con un patrón de rayas." style="width:100%;" >}}

De forma predeterminada, Datadog combina el pronóstico automático de Bits con cualquier valor de pronóstico personalizado que establezca en los presupuestos. Para anular el pronóstico de Bits con sus propios valores mensuales, consulte [Personalice su pronóstico presupuestario][4].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/cost/analyze/reports
[2]: https://app.datadoghq.com/cost/plan/budgets
[3]: /es/cloud_cost_management/planning/budgets
[4]: /es/cloud_cost_management/planning/budgets#customize-your-budget-forecast