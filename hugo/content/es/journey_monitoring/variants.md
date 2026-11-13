---
aliases:
- /es/journey_monitoring/details_report/variants/
description: Defina y compare las rutas que siguen los usuarios entre los eventos
  de inicio y fin de un recorrido.
further_reading:
- link: /journey_monitoring/
  tag: Documentación
  text: Obtenga información sobre Journey Monitoring
- link: /journey_monitoring/configuring_journeys/
  tag: Documentación
  text: Configure recorridos
- link: /journey_monitoring/details_report/
  tag: Documentación
  text: Obtenga información sobre el informe de detalles del recorrido.
title: Variantes de recorrido
---
<div class="alert alert-info">Las variantes de recorrido requieren una prueba activa o una suscripción paga a <a href="/product_analytics/">Product Analytics</a>.</div>

## Descripción general {#overview}

Una **variante** representa una ruta específica entre los [eventos de inicio y fin][8] de un recorrido. Utilice variantes para comparar [indicadores clave de desempeño (KPI)][3] y datos de telemetría para rutas comunes a través del mismo recorrido.

## Crear una variante {#create-a-variant}

Agregue variantes cuando cree un recorrido o edite un recorrido existente:

1. Ingrese un nombre único.
2. Agregue al menos un [evento de acción o vista][9] intermedio entre los eventos de inicio y fin del recorrido.
3. Opcionalmente, agregue [filtros de atributos][10] para limitar la variante a una cohorte específica.
4. Guarde el recorrido.

El [embudo][4] se actualiza a medida que agrega eventos intermedios. Muestra el volumen, la tasa de conversión y el tiempo promedio de conversión para cada paso.

### Variantes sugeridas {#suggested-variants}

Datadog analiza las secuencias comunes de eventos de acción y vista intermedios y sugiere variantes basadas en esas rutas. Las variantes sugeridas aparecen cuando crea un recorrido manualmente, crea uno a partir de un [recorrido sugerido][1] o edita un recorrido existente.

{{< img src="journey_monitoring/journey-monitoring-details-report-variants.png" alt="El informe de detalles de Journey Monitoring muestra el panel de variantes a la izquierda y una visualización de embudo con métricas de conversión para cada paso de la variante." style="width:100%;" >}}

## Analizar variantes {#analyze-variants}

Seleccione una variante en el [informe de detalles del recorrido][2] para filtrar sus métricas y datos de telemetría de modo que solo se muestren los correspondientes a esa ruta. Utilice los datos filtrados para comparar el volumen, la tasa de conversión, el tiempo promedio de conversión, [errores de frontend][5], [operaciones RUM][6] y [cobertura de pruebas Synthetic][7] entre rutas.

## Eliminar una variante {#delete-a-variant}

En el informe de detalles del recorrido, coloque el cursor sobre la variante y haga clic en el icono de eliminar.

## Lecturas adicionales {#further-reading}
{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/journey_monitoring/suggested_journeys/
[2]: /es/journey_monitoring/details_report/
[3]: /es/journey_monitoring/details_report/#traffic-and-conversion-trends
[4]: /es/product_analytics/charts/funnel_analysis/
[5]: /es/error_tracking/
[6]: /es/real_user_monitoring/operations_monitoring/
[7]: /es/journey_monitoring/configuring_journeys/#step-3-add-synthetic-test-coverage
[8]: /es/journey_monitoring/configuring_journeys/#define-start-and-end-conditions
[9]: /es/product_analytics/data_collected/
[10]: /es/journey_monitoring/configuring_journeys/#attribute-filters