---
aliases:
- /es/synthetics/dashboards
description: Explora dashboards Synthetic predefinidos para aprender más sobre los
  tests Synthetic.
further_reading:
- link: /synthetics/
  tag: Documentación
  text: Más información sobre la monitorización Synthetic
- link: /continuous_testing/explorer/
  tag: Documentación
  text: Más información sobre la Monitorización Synthetic y el Explorador de resultados
    de tests
- link: /continuous_testing/explorer/saved_views
  tag: Documentación
  text: Información sobre las vistas guardadas
title: Dashboards Synthetic
---

## Información general

Cuando se crea un test Synthetic, Datadog [recopila datos][1] y genera dashboards sobre tu stack tecnológico, las aplicaciones de navegador o el rendimiento general de los tests, localizaciones privadas y eventos.

Accede a tu dashboard Synthetic filtrando por `Synthetics` en la consulta de búsqueda de la [**lista de dashboards**][2] o haciendo clic en el menú desplegable en [**Dashboards**][3], en la [página de monitorización Synthetic y tests continuos][4].

{{< img src="synthetics/dashboards/dashboards_homepage_blurred.png" alt="Dashboards de monitorización Synthetic en la página web Monitorización Synthetic y tests continuos" style="width:100%;">}}

{{< whatsnext desc="Puedes explorar los siguientes dashboards Synthetic predefinidos:" >}}
  {{< nextlink href="/synthetics/dashboards/api_test" >}}<u>Rendimiento de tests de API</u>: Monitoriza tus endpoints y servicios. {{< /nextlink >}}
  {{< nextlink href="/synthetics/dashboards/browser_test" >}}<u>Rendimiento de tests de navegador</u>: Visualiza el rendimiento en la web de tests de navegador, información de proveedores externos y Core Web Vitals. {{< /nextlink >}}
  {{< nextlink href="/synthetics/dashboards/test_summary" >}}<u>Información general sobre tests</u>: Visualiza información sobre tus tests Synthetic por región, entorno o equipo. {{< /nextlink >}}
{{< /whatsnext >}}

## Personalizar tus dashboards Synthetic

Puedes clonar [dashboards][5] y personalizarlos por equipo, entorno, o región utilizando variables de plantilla. También puedes personalizar tu vista y crear una [vista guardada][6] de tu dashboard clonado.

### Editar variables de plantilla

Los dashboards Synthetic generados contienen automáticamente un conjunto de variables de plantilla predeterminadas. Utiliza los menús desplegables de las variables de plantilla para delimitar los datos mostrados en el dashboard. Por ejemplo, puedes filtrar por un tipo de navegador específico con la variable de plantilla `Browser`. Para obtener más información, consulta la documentación [Variables de plantilla][7]. Para clonar tu .dashboard Synthetic, haz clic en el botón **Clone** (Clonar) situado junto al icono **Configure** (Configurar).

{{< img src="synthetics/dashboards/clone.png" alt="Clonar un dashboard" style="width:100%;">}}

El dashboard Synthetic tiene una vista por defecto que puedes ajustar. Haz clic en el icono **Edit** (Editar) para entrar en el modo de edición y personalizar tus variables de plantilla.

{{< img src="synthetics/dashboards/synthetics_template_variable_edit.png" alt="Editar variables de plantilla en un dashboard Synthetic" style="width:100%;">}}

### Crear una vista guardada

Una vez que hayas terminado con la edición, haz clic en **Done** (Listo) y selecciona **Save selections as view** (Guardar selecciones como vista) en el menú desplegable de la izquierda. 

{{< img src="synthetics/dashboards/saved_view.png" alt="Crear una vista guardada en un dashboard Synthetic" style="width:60%;">}}

Introduce un nombre para la vista guardada y haz clic en **Save** (Guardar).

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/synthetics/metrics/
[2]: https://app.datadoghq.com/dashboard/lists
[3]: https://app.datadoghq.com/synthetics/tests/
[4]: https://app.datadoghq.com/synthetics/tests
[5]: /es/dashboards/
[6]: /es/continuous_testing/explorer/saved_views/
[7]: /es/dashboards/template_variables/