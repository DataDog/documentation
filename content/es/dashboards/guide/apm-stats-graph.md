---
aliases:
- /es/dashboards/querying/#configuring-an-apm-stats-graph
disable_toc: false
further_reading:
- link: /dashboards/querying/
  tag: Documentación
  text: Aprender a consultar gráficos
kind: guía
title: Configuración de un gráfico de estadísticas en APM
---

## Información general

Para configurar tu gráfico con los datos estadísticos de APM sigue los siguientes pasos:

1. Selecciona tu visualización entre los [widgets][1] disponibles.
2. [Elige tu nivel de detalle](#level-of-detail).
3. [Elige tus parámetros](#apm-stats-parameters).
4. Titula el gráfico (igual que para las métricas).

### Nivel de detalle
Elige el nivel de detalle para visualizar estadísticas: uno o más servicios, recursos o tramos (spans). No todos ellos están disponibles para cada tipo de widget.

### Parámetros de estadísticas de APM
Selecciona los siguientes parámetros en el editor de gráficos: Environment (Entorno) (`env`), Primary tag (Etiqueta primaria) (`primary_tag`), Service (Servicio) (`service`), y Operation name (Nombre de la operación) (`name`).

Si tu nivel de detalle es `resource` o `span`, algunos tipos de widgets también requieren que selecciones un Resource name (Nombre de recurso) (`resource`) para acotar el alcance de tu consulta.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/dashboards/widgets/