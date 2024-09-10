---
core_product:
- apm
title: tiempo de ejecución
---
En APM, el tiempo de ejecución es el tiempo total que un tramo (span) se considera activo o que no está esperando a que se complete un tramo secundario.

El tiempo de ejecución se calcula al sumar el tiempo que un tramo está activo, es decir, que no tiene tramos secundarios. En el caso del trabajo no simultáneo, esto es sencillo. En la siguiente imagen, el tiempo de ejecución del tramo 1 es $\D1 + \D2 + \D3$. El tiempo de ejecución para los tramos 2 y 3 son sus respectivos anchos.

{{< img src="tracing/visualization/execution-time1.png" style="width:50%;" alt="Tiempo de ejecución" >}}

Cuando los tramos secundarios son simultáneos, el tiempo de ejecución se calcula al dividir el tiempo de solapamiento por la cantidad de tramos activos en simultáneo. En la siguiente imagen, los tramos 2 y 3 son simultáneos (ambos son secundarios del tramo 1), solapándose durante lo que dura el tramo 3, por lo que el tiempo de ejecución del tramo 2 es $\D2 ÷ 2 + \D3$, y el tiempo de ejecución del tramo 3 es $\D2 ÷ 2$.

{{< img src="tracing/visualization/execution-time2.png" style="width:50%;" alt="Tiempo de ejecución para trabajos simultáneos" >}}