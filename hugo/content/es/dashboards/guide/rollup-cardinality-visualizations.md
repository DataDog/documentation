---
description: Aprende cómo afecta la función de rollup a la cardinalidad en las visualizaciones
  y cómo interpretar correctamente los resultados.
further_reading:
- link: /dashboards/functions/rollup/
  tag: Documentación
  text: Más información sobre la función de rollup
title: Comprender la función de rollup y la cardinalidad en visualizaciones
---

{{< jqmath-vanilla >}}

## Información general

Las visualizaciones en el análisis de datos a menudo se basan en funciones de agregación para resumir los datos a lo largo del tiempo. Un problema habitual surge cuando la función de rollup y las medidas de cardinalidad distintas o únicas interactúan entre sí, lo que provoca resultados inesperados al visualizar los datos.

Combinando las expectativas con la naturaleza de los resultados de rollup y empleando consultas claras puedes obtener información valiosa sobre tus datos. En este documento se explica el mecanismo de la función de rollup, especialmente en el contexto de la cardinalidad, y se proporcionan prácticas recomendadas para interpretar con precisión los resultados de las visualizaciones.

## Comprender la cardinalidad en las series temporales

Supongamos que realizas un seguimiento de los usuarios que visitan un sitio web. Cada día observas a 100 usuarios, lo que te lleva a suponer que en siete días obervarás a un total de 700 usuarios. Sin embargo, el número real de usuarios **únicos** a lo largo de la semana podría ser de 400, ya que muchos usuarios visitan el sitio web varios días. Esta discrepancia se debe a que cada periodo de tiempo (por ejemplo, cada día) cuenta de forma independiente los usuarios únicos, lo que infla el total en comparación con un periodo de tiempo de rollup único y más largo.

Este resultado contraintuitivo se debe a la cardinalidad, que se refiere a cómo se cuentan los elementos únicos de un conjunto de datos. La cardinalidad de cada bucket temporal puede ser compleja. Al analizar los usuarios, considera la siguiente pregunta: "¿Cuántos usuarios *únicos* visitaron el sitio cada día de esta semana?". Si un usuario visita el sitio dos días distintos, cuenta como único para cada día.

### Cómo afecta el rollup a los promedios

La función de [rollup][1] también influye significativamente en la forma en que se calculan y muestran los promedios en las visualizaciones:

- **Efecto suavizante**:
   - Los periodos de tiempo más cortos (rollups de 5 minutos) muestran picos y variaciones más detallados.
   - Los periodos de tiempo más largos (rollups de 30 minutos) crean gráficos más suaves.

- **Cálculos de promedios**:
   - En periodos de tiempo más cortos, los promedios pueden ser más bajos, ya que Datadog solo capta a los usuarios en ese momento exacto.
   - En periodos de tiempo más largos, los promedios pueden ser más altos, ya que Datadog capta más casos de usuarios que utilizan distintos dispositivos.

## Ejemplo: Cómo afecta el rollup al recuento de usuarios únicos

Las visualizaciones muestran la suma de valores en diferentes intervalos, lo que puede crear confusión cuando se comparan totales a lo largo de periodos de tiempo. Por ejemplo, un gráfico puede mostrar diferentes totales para la misma métrica cuando se visualiza en diferentes escalas de tiempo (como intervalos de 5 minutos frente a intervalos de 30 minutos). Esta diferencia se produce porque los usuarios pueden contarse varias veces en intervalos de tiempo más cortos, pero solo una vez en intervalos de tiempo más largos.

Esta sección presenta un ejemplo que demuestra cómo interactúan en la práctica las funciones rollup y la cardinalidad. Consideremos un sitio web que realiza un seguimiento de las sesiones de usuarios en móviles y ordenadores.

Cuando se toma un promedio de sesiones en móviles y se procede a su rollup cada 30 minutos, se obtiene una versión suavizada del gráfico. Este efecto de suavizado es un resultado natural de la función de rollup, que facilita la interpretación de las tendencias a largo plazo.

{{< img src="/dashboards/guide/rollup-cardinality-visualizations/pct_total_mobile_sessions.png" alt="Gráfico de líneas que muestra el porcentaje de sesiones totales en móviles con un rollup cada 5 minutos (línea púrpura), en comparación con 30 minutos (línea rosada). La línea púrpura presenta picos, mientras que la línea rosada es pareja y se superpone con la línea azul." style="width:100%;" >}}

{{% collapse-content title="Configuración" level="h4" expanded=false %}}
{{< img src="/dashboards/guide/rollup-cardinality-visualizations/pct_total_mobile_sessions_config.png" alt="Configuración que muestra los parámetros de consulta del procentaje de sesiones móviles totales con la función de rollupt aplicada" style="width:100%;" >}}
{{% /collapse-content %}}

Sin embargo, cuando se agrupan por usuarios, los dos gráficos no se superponen: el gráfico de 30 minutos es significativamente superior al de 5 minutos. Esto puede parecer un error a primera vista, pero en realidad está mostrando cómo interactúan los usuarios con el servicio en distintos periodos de tiempo.

{{< img src="/dashboards/guide/rollup-cardinality-visualizations/pct_unique_users_mobile.png" alt="Gráfico de líneas que muestra el porcentaje de usuarios únicos en móviles con un rollup cada 5 minutos (línea púrpura), en comparación con 30 minutos (línea rosada). La línea rosada pareja es más alta que la línea púrpura con picos" style="width:100%;" >}}

{{% collapse-content title="Configuration" level="h4" expanded=false %}}
{{< img src="/dashboards/guide/rollup-cardinality-visualizations/pct_unique_users_mobile_config.png" alt="Configuración que muestra los parámetros de consulta del procentaje de usuarios únicos en móviles con la función de rollupt de 5 y 30 minutos aplicada" style="width:100%;" >}}
{{% /collapse-content %}}

El siguiente gráfico muestra los rollups de 5 minutos en comparación con los de 30 minutos para usuarios en móviles distintos y usuarios totales distintos. Como los rollups de 30 minutos son naturalmente mayores que los de 5 minutos, este gráfico muestra los rollups de 30 minutos reducidos por un factor de 0,75. Para el total de usuarios distintos, los rollups de 5 y 30 minutos coinciden aproximadamente. Sin embargo, para los usuarios en móviles distintos, el rollup de 30 minutos es significativamente mayor que el rollup de 5 minutos. ¿Por qué?

{{< img src="/dashboards/guide/rollup-cardinality-visualizations/count_total_mobile_users.png" alt="Gráfico de líneas que muestra cuatro líneas: usuarios totales distintos (rollup de 5 minutos), usuarios totales distintos (rollup de 30 minutos), usuarios en móviles distintos (rollup de 5 minutos), usuarios en móviles distintos (rollup de 30 minutos)." style="width:100%;" >}}

{{% collapse-content title="Configuration" level="h4" expanded=false %}}
{{< img src="/dashboards/guide/rollup-cardinality-visualizations/count_total_mobile_users_config.png" alt="Configuración de la comparación de rollups escalados" style="width:100%;" >}}
{{% /collapse-content %}}

Esto ocurre porque cuando un usuario aparece varias veces durante un periodo de rollup, aparece una vez en el denominador pero varias veces en el numerador.

$$\text"cardinality:@usr.name[@type:session @device.type:Mobile]" / \text"cardinality:@usr.name[@type:session]" * 100\$$

Otra forma de entenderlo es que cuando un usuario aparece varias veces en un periodo, cada aparición representa una oportunidad de aparecer en el numerador. En un periodo de tiempo más largo, cada usuario aparecerá más veces, creando más oportunidades de (en este caso) ver la página en el móvil.

Para ilustrar esto de forma concreta, imaginemos que los usuarios consultan el sitio web en el ordenador durante el día y solo lo hacen en el móvil durante sus trayectos matutinos o verpertinos. Si la mitad lo consulta por la mañana, la otra mitad por la tarde y la otra mitad en ambos casos (lo que deja una cuarta parte que no lo consulta en el móvil):

* Un rollup de 12 horas mostraría que el 50% de los usuarios consultan el móvil de medianoche a mediodía (trayecto matutino) y el 50% de mediodía a medianoche (trayecto vespertino).

* Un rollup de 24 horas mostraría que el 75% de los usuarios consultan el móvil (en ambos trayectos).

Del mismo modo, un rollup de 1 hora puede mostrar que el 10-20% de los usuarios consultan el móvil durante sus horas de trayecto y <1% durante las horas que no están en ningún trayecto. Este porcentaje es mucho menor que el de los periodos más largos, pero sigue siendo correcto.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/dashboards/functions/rollup/