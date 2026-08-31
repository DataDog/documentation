---
aliases:
- /es/software_catalog/eng_reports/dora_metrics
further_reading:
- link: /dora_metrics
  tag: Documentación
  text: Datadog DORA Metrics
- link: dashboards/
  tag: Documentación
  text: Dashboards de Datadog
title: Métricas de DORA
---

## Información general

El informe DORA Metrics incluye una vista de toda la organización de la velocidad de desarrollo de software y las métricas de estabilidad, incluidas las tendencias históricas. Con este informe, puedes:
- Ver un desglose de las DORA Metrics por servicio, equipo o entorno.
- Explorar la información histórica y comprender qué servicios y equipos funcionan mejor o peor.
- Filtrar la información en función del servicio, el equipo, el identificador del repositorio, el entorno y otras etiquetas.
- Aprovechar las recomendaciones mensuales de Datadog para mejorar el rendimiento de la entrega de software de tu organización.

Accede al informe de DORA Metrics buscando "Informes de ingeniería" (o haciendo clic en la pestaña **Vista general** de IDP) y seleccionando **DORA Metrics** en el menú de la izquierda. 

{{< img src="tracing/eng_reports/dora-metrics-report.png" alt="Vista previa del informe Rendimiento de plantillas, con la subsección de Rendimiento por Plantilla visible" style="width:100%;" >}} 

## Interactúa con tu informe de DORA Metrics

### Ajusta la vista

Por defecto, el informe de Rendimiento de plantillas desglosa los datos por servicio, lo que te permite comprender el rendimiento de las DORA Metrics en todos tus servicios.

Puedes actualizar tu vista del informe de DORA Metrics de las siguientes maneras:

- **Cambiar el grupo de agregación**: ve las DORA Metrics de tu organización agrupadas por **Servicio**, **Equipo** o **Entorno** para identificar las áreas con mejores y peores resultados. 
- **Añadir filtros a los datos**: filtra por servicio, equipo, id de repositorio, entorno y otras etiquetas.

### Informes de horario

Configura informes programados para tus partes interesadas que se entregan como PDF a través de correo electrónico o Slack de forma recurrente.

Para los informes de horario, haz clic en **Schedule Report** (Informe de horario) en la esquina superior derecha (o **Manage Reports** (Gestionar informes) si ya has configurado informes). Consulta la [Documentación sobre informes programados][1] para obtener más información.

### Personalizar tu informe

En la esquina superior derecha del informe, haz clic en el menú de tres puntos y selecciona **Clone as a Dashboard** (Clonar como dashboard) para crear un dashboard con el contenido del informe de DORA Metrics. El dashboard refleja la vista agregada del "servicio". 

Para personalizar el dashboard, puedes:
- Cambiar el marco temporal de los widgets que muestran tendencias históricas
- Añadir widgets no incluidos en la vista por defecto
- Añadir filtros a los widgets existentes

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/es/dashboards/sharing/scheduled_reports/