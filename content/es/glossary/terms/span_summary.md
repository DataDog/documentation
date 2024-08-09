---
core_product:
- apm
title: resumen de tramos (spans)
---

La tabla de resumen de tramos en APM muestra métricas para tramos agregados en todas las trazas (traces), incluida la frecuencia con la que aparece el tramo entre todas las trazas, el porcentaje de trazas que contiene el tramo, la duración promedio del tramo y su porcentaje típico del tiempo total de ejecución de las solicitudes. Esto te ayuda a detectar N+1 problemas en tu código para que puedas mejorar el rendimiento de la aplicación.

{{< img src="tracing/visualization/span-summary.png" alt="Tabla de resumen de tramos" style="width:50%" >}}

La tabla de resumen de tramos solo se encuentra disponible para los recursos que contienen tramos de entrada de servicios y cuentan con la siguiente información:

Tramos promedio por traza
: Número promedio de apariciones del tramo para las trazas, incluido el recurso actual, en el que el tramo está presente al menos una vez.

Porcentaje de trazas
: Porcentaje de trazas, incluido el recurso actual, en el que el tramo está presente al menos una vez.

Duración promedio
: Duración promedio del tramo para las trazas, incluido el recurso actual, en la que el tramo está presente al menos una vez.

Porcentaje promedio del tiempo de ejecución
: Porcentaje promedio del tiempo de ejecución durante el cual el tramo estuvo activo para las trazas, incluido el recurso actual, en el que el tramo está presente al menos una vez.

[1]: /es/glossary/#span