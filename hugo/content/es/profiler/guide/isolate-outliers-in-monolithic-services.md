---
further_reading:
- link: /profiler
  tag: Documentación
  text: Datadog Continuous Profiler
- link: /profiler/compare_profiles/
  tag: Documentación
  text: Comparación de perfiles
title: Aislar outliers en servicios monolíticos
---

## Información general

Cuando se investiga el rendimiento de una aplicación monolítica, es decir, un servicio único que tiene varios usos, normalmente es necesario averiguar qué partes del código base utilizan más recursos. La página de servicios APM que muestra los principales endpoints podría ser el primer lugar lógico donde buscar, aunque esos datos corresponden al número de solicitudes y su duración, no al impacto que esas solicitudes tienen en los recursos de computación disponibles en tu backend. 

En este caso, conviene utilizar el Continuous Profiler para filtrar los gráficos de llamas por uso de endpoint. Esto permite identificar los endpoints que consumen más recursos y examinar qué funciones utilizan más recursos para cada endpoint concreto.

Esta guía describe cómo utilizar el Datadog Continuous Profiler para investigar este tipo de problemas.

## Ráfagas de CPU

El primer paso en una investigación de rendimiento es identificar anomalías en el uso de recursos a lo largo del tiempo. Observa el siguiente gráfico de uso de la CPU durante la última hora para el servicio `product-recommendation`:

{{< img src="profiler/guide-monolithic-outliers/1-outliers-monolith-cpu-usage-2.png" alt="" style="width:100%;" >}}

Aquí no se muestra la causa raíz exacta, pero puedes ver picos anómalos en el uso de la CPU. 

Selecciona el menú desplegable **Mostrar - Promedio de** (resaltado en la imagen anterior) y cambia el gráfico para que muestre `CPU Cores for Top Endpoints`. Este gráfico muestra cómo contribuyen las diferentes partes de la aplicación al uso general de la CPU:

{{< img src="profiler/guide-monolithic-outliers/2-outliers-monolith-cpu-top-endpoints-2.png" alt="" style="width:100%;" >}}


Los picos amarillos indican que el endpoint `GET /store_history` tiene un uso intermitente que corresponde a las anomalías identificadas anteriormente. Sin embargo, los picos podrían deberse a diferencias en el tráfico hacia ese endpoint. Para saber si los perfiles pueden proporcionar más información, cambia la métrica por `CPU - Average Time Per Call for Top Endpoints`:

{{< img src="profiler/guide-monolithic-outliers/3-outliers-monolith-cpu-avg-time-per-call-2.png" alt="" style="width:100%;" >}}

El gráfico actualizado revela que hay un pico intermitente de uso de la CPU en el que cada llamada a `GET /store_history` requiere una media de tres segundos de tiempo de CPU. Esto sugiere que los picos no se deben a un aumento del tráfico, sino a un aumento del uso de la CPU por solicitud.


## Aislar el impacto de los endpoints

Para determinar la causa del aumento del uso de la CPU cada vez que se llama a `GET /store_history`, examina el gráfico de llamas de generación de perfiles para este endpoint durante uno de los picos. Selecciona un intervalo de tiempo en el que `GET /store_history` muestre un mayor uso de la CPU y delimita la página de generación de perfiles a ese intervalo de tiempo. A continuación, cambia a la visualización **Gráfico de llamas** para ver qué métodos utilizan la CPU en ese momento:

{{< img src="profiler/guide-monolithic-outliers/4-outliers-monolith-flame-graph-2.png" alt="Descripción de tu imagen" style="width:100%;" >}}

Para entender mejor por qué el endpoint `GET /store_history` está utilizando más CPU, consulta la tabla resaltada en la imagen anterior, donde el endpoint es el segundo elemento empezando por la parte superior. Selecciona esa fila para enfocar el gráfico de llamas en el uso de la CPU generado por el endpoint `GET /store_history`. 

Puesto que estás investigando el uso de recursos por solicitud, cambia también el valor en el desplegable de la parte superior de la tabla a `CPU Time per Endpoint Call`. Esto muestra el uso medio de recursos por llamada a ese endpoint, en lugar del uso medio de recursos por minuto.

## Comparación de gráficos de llamas

Con el gráfico que muestra los datos de la hora y el endpoint correctos, debería haber suficiente información para determinar qué está causando el pico en el uso de la CPU. Si aun así no es suficiente, se puede comparar el gráfico de llamas del pico con un momento en que el uso sea sido más aceptable.

Para ver si hay diferencias en los métodos que utilizan mucho tiempo de CPU entre un pico y un uso normal, haz clic en **Comparar** (junto al campo de búsqueda) y selecciona `Previous 15 minutes`. Se abrirá la vista de comparación. 

La vista muestra dos gráficos, denominados **A** y **B**, cada uno de los cuales representa un intervalo de tiempo de uso de la CPU por llamada a `GET /store_history`. Ajusta el selector de tiempo para **A** de modo que se aplique a un periodo con bajo uso de CPU por llamada:

{{< img src="profiler/guide-monolithic-outliers/5-outliers-monolith-compare-flame-graphs-2.png" alt="Descripción de tu imagen" style="width:100%;" >}}

La comparación revela los diferentes métodos que generan un uso de la CPU durante el pico (intervalo de tiempo **B**) y que no se utilizan durante el uso normal de la CPU (intervalo de tiempo **A**). Como se muestra en la imagen anterior, `Product.loadAssets(int)` está generando los picos.

Para solucionar el problema, optimiza el método. Si observas el código del método, verás que la firma es `Product(int id, String name, boolean shouldLoadAssets)` y que no necesitas cargar recursos para la respuesta al endpoint `GET /store_history`. Esto significa que hay un error más arriba en el stack tecnológico de llamadas que indica incorrectamente al constructor `Product` que debe cargar recursos.

Corrige este error y comprueba que los picos desaparecen. Para ello, utiliza los gráficos de series temporales mencionados anteriormente.

## Aislar el impacto de las operaciones (Java)

Existen otros atributos disponibles en el generador de perfiles. Por ejemplo, puedes filtrar y agrupar un gráfico de llamas por nombres de operación, en lugar de por funciones o hilos. Para aplicaciones monolíticas, esto puede ayudar a identificar más claramente los recursos con un uso intensivo de la CPU, incluso si son compartidos entre endpoints.

El atributo APM `Trace operation` permite filtrar y agrupar un gráfico de llamas con la misma especificidad que las trazas (traces) para los endpoints seleccionados. Se trata de un buen equilibrio entre la elevada especificidad de los hilos o los métodos y la baja especificidad de los endpoints completos. Para aislar operaciones, selecciona `Trace Operation` en el desplegable **Tiempo de CPU por**: 

{{< img src="profiler/guide-monolithic-outliers/7-outliers-monolith-trace-operation-2.png" alt="Descripción de tu imagen" style="width:100%;" >}}

En la imagen anterior, observa que la operación `ModelTraining` está consumiendo más tiempo de CPU que su uso principal en el endpoint `GET /train`, por lo que debe estar en uso en otro lugar. Haz clic en el nombre de la operación para determinar en qué otro lugar se está utilizando. En este caso, `ModelTraining` también es utilizado por `POST /update_model`.


## Aísla tu propia lógica empresarial

El aislamiento de endpoints y operaciones está disponible en tus perfiles de forma predeterminada, pero es posible que necesites aislar una parte diferente de la lógica. Por ejemplo, si el monolito es sensible a clientes específicos, puedes añadir un filtro personalizado a los perfiles:

{{< programming-lang-wrapper langs="java,go" >}}
{{< programming-lang lang="java">}}


Definir un valor de contexto para el nombre del cliente:

```java
try (var scope = Profiling.get().newScope()) {
   scope.setContextValue("customer_name", <the customer name value>);
   <logic goes here>
}
```

Para especificar las claves de etiqueta que quieres utilizar para el filtrado, define la configuración de `profiling.context.attributes` utilizando una de las siguientes opciones:
* Variable de entorno: `DD_PROFILING_CONTEXT_ATTRIBUTES=customer_name`
* Configuración del sistema: `-Ddd.profiling.context.attributes=customer_name`

Si tienes varias claves de contexto, utiliza una cadena separada por comas en la configuración (por ejemplo, `-Ddd.profiling.context.attributes=customer_name,customer_group`).

A continuación, abre los perfiles de tiempo de CPU, de excepciones o de tiempo real para tu servicio y selecciona el valor `customer_name` que te interese en el menú desplegable `CPU time by`.

{{< /programming-lang >}}
{{< programming-lang lang="go">}}

El generador de perfiles Go admite anotaciones personalizadas para tu lógica empresarial a partir de la versión v1.60.0. Para añadir anotaciones, utiliza las [etiquetas del generador de perfiles][1]:

```go
pprof.Do(ctx, pprof.Labels("customer_name", <value>), func(context.Context) {
  /* customer-specific logic here */
})
```

Para especificar qué claves de etiqueta (label) deseas utilizar para el filtrado, añade la opción [WithCustomProfilerLabelKeys][3] (o [WithCustomProfilerLabelKeys v1][2]) al iniciar el generador de perfiles:

```go
profiler.Start(
  profiler.WithCustomProfilerLabelKeys("customer_name"),
  /* other options */
)
```

A continuación, abre los perfiles de CPU o goroutine de tu servicio y selecciona el valor `customer_name` que te interese en el menú desplegable `CPU time by`.

[1]: https://pkg.go.dev/runtime/pprof#Do
[2]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/profiler#WithCustomProfilerLabelKeys
[3]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/v2/profiler#WithCustomProfilerLabelKeys
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}


## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}