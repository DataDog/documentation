---
further_reading:
- link: /reference_tables/
  tag: Documentación
  text: Tablas de referencia
title: Consultas de métricas compuestas
---

## Información general

Las consultas de métricas compuestas aumentan las capacidades de monitorización y de análisis, ya que permiten el etiquetado dinámico de métricas en el momento de la consulta. Esto simplifica el proceso de añadir nuevas etiquetas (tags) a tus métricas y no requiere cambios en el código. Utiliza las consultas de métricas compuestas para obtener información más significativa y práctica de tus datos de métricas.

Con el uso de las consultas de métricas compuestas puedes lograr lo siguiente:

- **Crear dashboards ricos en contexto**. Utiliza [tablas de referencia][1] para añadir etiquetas más contextuales, como `team` o `organization`, a tus métricas.
- **Simplificar la resolución de problemas**. Los alias adaptan los valores de las etiquetas (por ejemplo, ID o códigos) y los vuelven legibles por humanos, lo que reduce el esfuerzo cognitivo y el tiempo de resolución.<br /><br />
   {{< img src="metrics/nested_queries/composite_metrics_queries/composite_metric_query_example.mp4" alt="Configurar consultas de métricas compuestas en la interfaz de usuario" video=true style="width:100%" >}}

## Configuración

1. Crea cualquier consulta de métrica con [agregación espacial][2] (se seleccionan una o más etiquetas con las que agrupar).
2. Selecciona el botón **Join** (Unir) (junto al botón **Formulas** (Fórmulas)), como se muestra a continuación:

   {{< img src="metrics/nested_queries/composite_metrics_queries/reference_table_join.png" alt="Opción para unir con una tabla de referencia en una consulta de métricas" style="width:100%" >}}

3. Especifica el tipo de unión y la tabla de referencia que quieres unir con tus métricas.
4. Define la condición de unión con la etiqueta existente de tu consulta (por ejemplo, `team`) y la columna de tu tabla de referencia que se utilizará para la unión.
5. Selecciona columnas de la tabla de referencia para representar las etiquetas nuevas o con alias que quieres añadir a la consulta existente.

   {{< img src="metrics/nested_queries/composite_metrics_queries/reference_table_example.png" alt="Consulta de métricas configurada para unirse con una tabla de referencia" style="width:100%" >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/reference_tables/
[2]: /es/metrics/#space-aggregation