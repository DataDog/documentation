---
further_reading:
- link: service_management/service_level_objectives/
  tag: Documentación
  text: Visión general de Objetivos de nivel de servicio (SLOs)
title: Dashboard de rendimiento de los SLOs para directivos
---

{{< jqmath-vanilla >}}

## Información general

El dashboard de resumen del rendimiento de los SLOs permite obtener vistas agregadas de los SLOs para ayudar a los directores ejecutivos a comprender de un solo vistazo la fiabilidad de tu organización. Con este dashboard predefinido puedes:

- Personalizar tus agrupaciones de SLOs para que se basen en servicios, equipos, recorridos de usuarios o cualquier otra etiqueta (tag) que se haya añadido a tus SLOs.
- Utilizar una puntuación resumida, basada en el presupuesto de error restante de los SLOs subyacentes, para comprender el rendimiento de los SLOs en los diferentes grupos e identificar áreas de mejora.

<div class="alert alert-info">El dashboard de resumen del rendimiento de los SLOs está en Vista previa.</div>

Accede a tu dashboard de resumen del rendimiento de los SLOs predefinido filtrando por `SLO Performance Summary` en la consulta de búsqueda de la [**lista de dashboards**][1] o haciendo clic en el botón **Analytics** (Análisis) en la esquina superior derecha de la [página de estado de los SLOs][2].

{{< img src="service_management/service_level_objectives/ootb_dashboard/slo-ootb-dashboard.png" alt="Dashboard de SLOs predefinido por defecto por etiqueta de servicio" >}}

## Interactuar con tu dashboard de resumen del rendimiento de los SLOs

Por defecto, el dashboard de resumen del rendimiento de los SLOs se basa en la etiqueta de `service` añadida a tus SLOs. Esto te permite ver el rendimiento de los SLOs de tu organización por agrupaciones de servicios para entender qué servicios presentan un mejor o peor rendimiento.

### Puntuación global

El widget **Resumen de SLOs** en el dashboard predefinido incluye una "Puntuación". Fue diseñada como una métrica de resumen para que los directivos ejecutivos comprendan el rendimiento de un grupo de SLOs. La puntuación se calcula a partir del presupuesto de error medio restante de los SLOs subyacentes, que luego se asigna a una puntuación entre 0 y 100:

- La puntuación se "aprueba" (verde/amarillo) cuando la mayoría de los SLOs **no** se incumplen y tienen un presupuesto de error restante.
- La puntuación se "desaprueba" (rojo) cuando muchos SLOs están fuera del presupuesto de error o unos pocos SLOs están demasiado fuera del presupuesto de error.
- Los SLOs con el estado "Sin datos" no se tienen en cuenta en la puntuación.

#### Detalles del cálculo de la puntuación

La puntuación se calcula del siguiente modo:
- Promediando el presupuesto de error restante de los SLOs (el presupuesto de error mínimo se establece en -200%, por lo que cualquier SLO con un presupuesto de error inferior se contará como -200% en el promedio).
- El presupuesto de error medio (entre -200 y 100) se asigna a una puntuación entre 0 y 100
- El color y el estado de la puntuación se establecen en función de los siguientes umbrales.

Ten en cuenta que un presupuesto de error medio restante del 0% corresponde a un valor de puntuación de 66,667. El estado y el color de la puntuación se basan en los siguientes umbrales:
- **Rojo:** 0 ≤ puntuación < 66,667
- **Amarillo:** 66,667 ≤ puntuación < 80
- **Verde:** 80 ≤ puntuación ≤ 100

### Personalizar tu dashboard de resumen del rendimiento de los SLOs

Para personalizar tu dashboard de resumen del rendimiento de los SLOs, haz clic en **Configure** (Configurar) en el dashboard y selecciona **Clonar dashboard**. El dashboard por defecto está configurado basado en la etiqueta de `service` que se agregó a los SLOs. Puedes actualizar el dashboard para que se base en cualquier [etiqueta de SLO][3] siguiendo los siguientes pasos:

- Actualiza la configuración de cada widget en el dashboard por defecto para utilizar tu etiqueta elegida, en lugar de `service`.
- Añade una [variable de plantilla][4] basada en tu etiqueta elegida (o sustituye la variable de plantilla `service` existente).


Por ejemplo, si ha añadiste una etiqueta `journey` a tus SLOs, puedes clonar el dashboard de resumen del rendimiento de los SLOs y personalizarlo para que se base en la etiqueta de `journey`:

{{< img src="service_management/service_level_objectives/ootb_dashboard/slo-dashboard-flow.mp4" alt="Dashboard de SLOs predefinido por etiqueta de recorrido" video=true style="width:80%;" >}}



## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/dashboard/lists
[2]: https://app.datadoghq.com/slo
[3]: /es/service_management/service_level_objectives/#slo-tags
[4]: /es/dashboards/template_variables/#add-a-template-variable