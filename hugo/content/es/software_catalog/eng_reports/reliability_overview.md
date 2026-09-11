---
further_reading:
- link: /service_management/service_level_objectives/
  tag: Documentación
  text: Objetivos de nivel de servicio (SLOs)
- link: service_management/incident_management/
  tag: Documentación
  text: Gestión de incidencias
- link: dashboards/
  tag: Documentación
  text: Dashboards de Datadog
title: Información general de fiabilidad
---

{{< callout url="https://www.datadoghq.com/product-preview/engineering-reports/" d_target="#signupModal" btn_hidden="false" header="Participa de la Vista previa de Engineering Reports" >}}
{{< /callout >}}

## Información general

El informe de Información general de fiabilidad ofrece vistas agregadas de los SLOs y los incidentes para ayudar a la dirección ejecutiva a comprender la fiabilidad de tu organización de un vistazo. 

Con este informe, podrás:
- Personalizar tus agrupaciones de SLO o incidentes para que se basen en el servicio, el equipo u otras etiquetas o propiedades que se hayan añadido a tus SLOs o incidentes.
- Utiliza una puntuación resumida, basada en el presupuesto para errores restante de los SLOs subyacentes, para comprender el rendimiento de los SLOs en diferentes grupos e identificar áreas de mejora.
- Explora las tendencias históricas de fiabilidad diarias, semanales y mensuales de los últimos 12 meses para comprender el rendimiento a lo largo del tiempo.

Accede al informe Información general de fiabilidad haciendo clic en la pestaña "Overview" (Información general) del Portal interno de desarrolladores (IDP) y seleccionando "Reliability Overview" (Información general de fiabilidad) en el menú de la izquierda. 

{{< img src="tracing/eng_reports/reliability-overview-landing2.png" alt="Vista predeterminada del informe de Información general de fiabilidad, que muestra los datos de rendimiento de SLO" style="width:100%;" >}} 

**Nota:** Si no has optado por la vista previa de IDP en Datadog, puedes acceder al informe de Información general de fiabilidad haciendo clic en la pestaña "Reports" (Informes) en la parte superior de la página de Software Catalog.

## Interactúa con tu informe de Información general de fiabilidad

### Ajusta la vista

{{< img src="tracing/eng_reports/reliability-overview-filtered2.png" alt="Página de Información general de fiabilidad con una flecha que marca las opciones correctas" style="width:100%;" >}} 

Puedes actualizar la vista del informe de Información general de fiabilidad de las siguientes formas:

- **Cambia la agregación entre "Servicio" o "Equipo"**: ve el rendimiento de SLO e incidentes de tu organización por agrupaciones de servicios/equipos para identificar las áreas con mejor y peor rendimiento. 

   **Nota**: Las agrupaciones de servicios/equipos se basan en la etiqueta **servicio** o **equipo** añadida a tus SLO, y en las propiedades **servicios** o **equipos** añadidas a tus incidentes.

- **Consulta información histórica diaria, semanal o mensual**: actualiza las tendencias de SLO e incidentes históricas con el nivel de detalle que desees.
- **Añade filtros para delimitar el alcance de los datos**: filtra por equipos, servicios y gravedad y estado del incidente.

### Informes de horario

Configura informes programados para tus partes interesadas que se entregan como PDF a través de correo electrónico o Slack de forma recurrente.

Para los informes de horario, haz clic en **Schedule Report** (Informe de horario) en la esquina superior derecha (o **Manage Reports** (Gestionar informes) si ya has configurado informes). Consulta la [Documentación sobre informes programados][1] para obtener más información.

### Personaliza tu informe 

En la esquina superior derecha del informe, haz clic en el menú desplegable y selecciona **Clone as a Dashboard** (Clonar como dashboard) para crear un dashboard con el contenido del informe de Información general de fiabilidad. 

Para personalizar el dashboard, puedes:
- Actualiza la tabla Información general de SLO para agrupar por cualquier etiqueta que hayas añadido a tus SLO (por ejemplo, puedes crear una vista agrupada por "recorrido del usuario").
- Añadir widgets no incluidos en la vista por defecto
- Añade filtros a los widgets existentes (por ejemplo, puedes filtrar los incidentes en función del "Método de detección").

## Utilizar la puntuación resumida del SLO

{{< img src="tracing/eng_reports/slo-summary-score2.png" alt="El widget de resumen del SLO, incluida la puntuación de resumen de SLO" style="width:100%;" >}}

El widget **Resumen de SLO** incluye una "puntuación". Se ha diseñado como una métrica resumida para que la dirección ejecutiva comprenda el rendimiento de un grupo de SLOs. La puntuación se calcula a partir del presupuesto para errores medio restante de los SLOs subyacentes, que luego se asigna a una puntuación entre 0 y 100:

- La puntuación es "aprobado" (verde/amarillo) cuando la mayoría de los SLO **no** se incumplen y tienen presupuesto para errores restante.
- La puntuación es "desaprobado" (rojo) cuando muchos SLOs están fuera del presupuesto para errores o unos pocos SLOs están muy fuera del presupuesto para errores.
- Los SLOs en estado "Sin datos" no se tienen en cuenta en la puntuación.

### Detalles del cálculo de la puntuación

La puntuación se calcula del siguiente modo:

{{< jqmath-vanilla >}}

$$
\text"Average Remaining Error Budget"
      = {∑_{i=0}^{n}\\text"[Remaining Error Budget]"_i} / n
$$

$$
\text"Score"
      = {max(\text"[Average Remaining Error Budget]"\,-200) + 200} / 300 * 100
$$


- Promedia el presupuesto para errores restante de los SLOs (el presupuesto para errores mínimo se fija en -200 %, por lo que cualquier SLO con un presupuesto para errores inferior se contará como -200 % en el promedio).
- Asigna el presupuesto para errores medio (entre -200 y 100) a una puntuación entre 0 y 100.
- Establece el color y el estado de la puntuación en función de los siguientes umbrales:
  - **Rojo:** 0 ≤ puntuación < 66,667
  - **Amarillo:** 66,667 ≤ puntuación < 80
  - **Verde:** 80 ≤ puntuación ≤ 100

**Nota**: Un presupuesto para errores medio restante del 0 % corresponde a un valor de puntuación de 66.667.


## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/dashboards/sharing/scheduled_reports/