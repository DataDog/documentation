---
description: Agregue desgloses de facetas para dividir su consulta de Product Analytics
  en múltiples valores.
title: Agrupar eventos de Product Analytics
---
Una consulta sin desglose devuelve un solo valor, como un conteo total de vistas. Agregue un *desglose* para dividir ese valor en categorías. Por ejemplo, dada una consulta de vistas totales, usted podría agregar un desglose por país para que pueda ver de dónde provienen las vistas.

## Agregar un desglose{#add-a-breakdown}

Haga clic en {{< ui >}}Add breakdown{{< /ui >}} para agregar hasta cuatro desgloses a una sola consulta. Cada desglose aparece como una fila debajo de {{< ui >}}compared by{{< /ui >}} en el generador de consultas.

Cada desglose que usted agrega divide los resultados en valores cada vez más pequeños. Por ejemplo, una consulta desglosada tanto por navegador como por país devuelve un grupo para cada combinación de navegador y país en sus datos, como Chrome/Estados Unidos y Chrome/Alemania.

{{< img src="product_analytics/analytics/group/analytics-breakdown-1.png" alt="Una consulta desglosada por navegador y país en el generador de gráficos de Analytics." style="width:90%;" >}}

## Elija una medida{#choose-a-measure}

De forma predeterminada, una consulta mide el conteo de {{< ui >}}All events{{< /ui >}}.

{{< img src="product_analytics/analytics/group/analytics-measure-count-1.png" alt="El conteo predeterminado de todos los eventos en el generador de gráficos de Analytics." style="width:90%;" >}}

Cambie {{< ui >}}All events{{< /ui >}} a un valor diferente para ver un conteo único del valor especificado. Por ejemplo, seleccionar {{< ui >}}Browser Name{{< /ui >}} devuelve el número de navegadores distintos que vieron una página.

{{< img src="product_analytics/analytics/group/analytics-measure-count-unique-1.png" alt="Un conteo único por navegador en el generador de gráficos de Analytics." style="width:90%;" >}}

Cambie la medida a una agregación estadística de una faceta numérica, como el tiempo de carga. Elija promedio, mínimo, máximo, mediana, suma o un percentil (75, 90, 95, 98 o 99).

{{< img src="product_analytics/analytics/group/analytics-measure-statistical-1.png" alt="Opciones de agregación estadística para el tiempo de carga en el generador de gráficos de Analytics." style="width:90%;" >}}