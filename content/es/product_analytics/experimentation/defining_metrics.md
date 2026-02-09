---
description: Define las métricas que quieres medir durante tu experimentación.
further_reading:
- link: https://www.datadoghq.com/blog/datadog-product-analytics/
  tag: Blog
  text: Tomar decisiones de diseño basadas en datos con el Análisis de productos
- link: /product_analytics/experimentation/reading_results
  tag: Documentación
  text: Resultados del experimento de lectura
title: Definición de métricas
---

## Información general

Define las métricas que quieres medir durante tu experimentación. Las métricas se pueden construir utilizando datos de Product Analytics y Real User Monitoring (RUM).

<div class="alert alert-info"> Para crear una métrica, debes tener instalado el SDK de cliente de Datadog en tu aplicación y capturar datos activamente.
</div>

## Creación de tu primera métrica

Para crear una métrica para tu experimento: 

1. Ve a la [página Métricas][1] en Datadog Product Analytics.
2. Haz clic en **+ Create Metric** (+ Crear métrica), en la esquina superior derecha.
3. Haz clic en **Select an Event** (Seleccionar un evento) para ver una lista de todas las acciones y vistas recopiladas del SDK de Datadog.
4. Añade un nombre para la métrica y, opcionalmente, una descripción. A continuación, haz clic en **Save** (Guardar).

{{< img src="/product_analytics/experiment/exp_create_metric1.png" alt="Página de la interfaz de usuario para crear una métrica." style="width:90%;" >}}

## Especifica la agregación de métrica

### Agregación de métricas por defecto 
Una vez seleccionado tu evento de interés, puedes especificar un método de agregación. Las métricas son por defecto es un **conteo de sujetos únicos** (a menudo usuarios) que han tenido al menos un evento. Sin embargo, también puede optar por _contar el número total_ de eventos, o _sumar una propiedad_ de ese evento:

{{< img src="/product_analytics/experiment/exp_default_metric_agg.png" alt="Menú desplegable para seleccionar un método de agregación de métricas." style="width:90%;" >}}


### Normalización de métricas por defecto 

Todas las métricas se normalizan por el número de sujetos inscritos. Por ejemplo, una métrica de **conteo de usuarios únicos** se calcula como: 

```

                      Número de usuarios con el evento especificado
                  -----------------------------------------------           
                      Número de usuarios inscritos en esta variante
```

Del mismo modo, una métrica **Suma de** se calcula como: 


```

                  Suma de la propiedad sobre los usuarios inscritos en esta variante
              --------------------------------------------------------           
                      Número de usuarios inscritos en esta variante
```

### Normalización de métricas personalizadas

También puedes optar por normalizar las métricas mediante un denominador diferente. Para ello, haz clic en una métrica
y luego en **Create ratio** (Crear ratio). Esto te permite normalizar tu métrica por otro evento, contando el número de sujetos con ese evento, el número total de eventos o la suma de una propiedad de evento.

{{< img src="/product_analytics/experiment/exp_create_ratio.png" alt="Botón utilizado para crear un ratio a partir de esa métrica." style="width:90%;" >}}

Por ejemplo, una empresa de comercio electrónico que desee medir el _Valor medio de los pedidos_ puede crear una métrica de ratio con la suma de los ingresos por compras como numerador y el recuento de eventos de compra como denominador. 

El motor estadístico de Datadog tiene en cuenta las correlaciones entre el numerador y el denominador mediante el [método delta][2].


## Añadir filtros
También puedes añadir filtros a tus métricas, de forma similar a otros [dashboards de Product Analytics][3]. Por ejemplo, es posible que quieras filtrar vistas de páginas en función de la URL de referencia o los parámetros UTM. Del mismo modo, es posible que quieras filtrar acciones a una página específica o al valor de un atributo personalizado. A medida que añadas filtros, podrás comprobar los valores de las métricas en tiempo real utilizando el gráfico de la derecha.


{{< img src="/product_analytics/experiment/exp_filter_by.png" alt="Flujo de filtrado para delimitar tu métrica por propiedades específicas." style="width:90%;" >}}



## Opciones avanzadas
Datadog admite varias opciones avanzadas específicas para la experimentación:

`Timeframe filters`
: - Por defecto, Datadog incluirá todos los eventos entre la primera exposición de un usuario y el final del experimento. Si quieres medir un valor de tiempo limitado, como "sesiones en un plazo de 7 días", puedes añadir un filtro de tiempo.
  - Si se selecciona, la métrica solo incluirá eventos del periodo de tiempo especificado, comenzando en el momento en que el usuario se inscribió por primera vez.

`Desired metric change`
: - Datadog resalta los resultados estadísticamente significativos.
  - Utiliza este parámetro para especificar si se busca un aumento o una disminución de esta métrica.

`outlier (valor atípico) handling`
Los datos del mundo real suelen incluir valores atípicos extremos que pueden afectar a los resultados de los experimentos. 
  - Utiliza este parámetro para definir un umbral en el que se truncan los datos. Por ejemplo, define un límite superior del 99% para truncar todos los resultados en el percentil 99 de la métrica.





## Referencias adicionales
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/product-analytics/experimentation-metrics
[2]: https://en.wikipedia.org/wiki/Delta_method
[3]: /es/product_analytics/dashboards