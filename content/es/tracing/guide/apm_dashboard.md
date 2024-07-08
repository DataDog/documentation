---
further_reading:
- link: /tracing/guide/alert_anomalies_p99_database/
  tag: 3 minutos
  text: Alerta sobre latencia p99 anómala de un servicio de base de datos
- link: /tracing/guide/week_over_week_p50_comparison/
  tag: 2 minutos
  text: Compara la latencia de servicio con la de la semana anterior.
- link: /tracing/guide/slowest_request_daily/
  tag: 3 minutos
  text: Depurar el rastreo más lento en el punto final más lento de un servicio web
- link: /tracing/guide/
  tag: ''
  text: Todas las guías
title: Crear un dashboard para seguir y correlacionar métricas de APM
---

_4 minutos para completar_

{{< img src="tracing/guide/apm_dashboard/dashboard_7_cropped.mp4" alt="dashboard 7" video="true" style="width:90%;">}}

Datadog APM te permite crear dashboards basados ​​en tus prioridades comerciales y de métricas :
Puedes crear widgets en estos dashboards para realizar un seguimiento de cualquier infraestructura tradicional, logs y métricas personalizadas, como el uso de la memoria del host, junto con métricas APM fundamentales basadas en el rendimiento, la latencia y la tasa de error para la correlación.
Además, puedes realizar un seguimiento de la latencia de la experiencia del usuario de sus principales clientes o de las transacciones más importantes y, a la vez, realizar un seguimiento del rendimiento de tu servidor web principal antes de eventos importantes como el Black Friday.

Esta guía te enseña a agregar métricas de seguimiento a un dashboard, correlacionarlas con métricas de infraestructura y luego cómo exportar una consulta de Analytics. Esta guía cubre la adición de widgets al dashboard de tres maneras:

* Copiar un gráfico APM existente _( Paso 1. 2. & 3.)_
* Crearlo manualmente. _(Paso 4. & 5. )_
* Exportar una consulta de Analytics. _(Paso 7.)_

1. **Abre el [Catálogo de servicios][1]** y elige el servicio `web-store` .

2. **Busca el Gráfico de Solicitudes Totales** y haz clic en el botón `export` de la parte superior derecha para elegir `Export to Dashboard`. **Haz clic en `New Timeboard`**.

    {{< img src="tracing/guide/apm_dashboard/dashboard_2_cropped.png" alt="dashboard 2" style="width:90%;">}}

3. **Haz clic en `View Dashboard`** en el mensaje de tarea completada.

    En el nuevo dashboard, ya está disponible el gráfico `Hit/error count on service` para el servicio `web-store` . Muestra todo el rendimiento de este servicio, así como su cantidad total de errores.

    {{< img src="tracing/guide/apm_dashboard/dashboard_3_cropped.png" alt="dashboard 3" style="width:90%;">}}

    **Nota**: Puedes hacer clic en el icono del lápiz para editar este gráfico y ver qué métricas precisas se están utilizando.

4. **Haz clic en el cuadro marcador de posición `Add graph` ** en el espacio del dashboard y luego **Arrastra un `Timeseries` a este espacio**.

    Esta es la pantalla de edición de widgets del dashboard. Te permite crear cualquier tipo de visualización a través de todas los métricas disponibles. Consulta la [Documentación del widget Timeseries][2] para obtener más información.

5. **Haz clic en la casilla `system.cpu.user` ** y elige la métrica y los parámetros que te interesen, en este ejemplo:

    | Parámetro | Valor | Descripción |
    | ------    | -----                         | -----                                                                                                                |
    | `metric` | `trace.rack.requests.errors` | Conjunto total de solicitudes erróneas de Ruby Rack.                                                                       |
    | `from` | `service:web-store` | El servicio principal en esta pila de ejemplo es un servicio Ruby y toda la información del gráfico con proviene de él. |
    | `sum by` | `http.status_code` | Desglosando el gráfico por códigos de estado http.                                                                        |

    {{< img src="tracing/guide/apm_dashboard/dashboard_4.mp4" video="true" alt="dashboard 4" style="width:90%;">}}

    Este desglose específico es sólo un ejemplo de los muchos que se pueden elegir. Es importante tener en cuenta que cualquier métrica que empiece por `trace.` contiene información de APM. Consulta la documentación de [métricas APM para obtener más información][3].

6. **Arrastra otra serie de tiempo al cuadro marcador de posición**

    En este ejemplo, se añaden dos tipos diferentes de métricas a un gráfico, una `trace.*` y otra `runtime.*`. Combinadas, estos métricas permiten correlacionar la información entre las peticiones y el rendimiento en tiempo de ejecución del código. Concretamente, la latencia de un servicio se muestra junto al recuento de hilos, sabiendo que los picos de latencia podrían estar asociados a un aumento del recuento de hilos:

    1. En primer lugar, añade la métrica `trace.rack.requests.errors` al widget:

        | Parámetro | Valor | Descripción |
        | ------    | -----                                        | -----                                                                                                                |
        | `metric` | `trace.rack.request.duration.by.service.99p` | El percentil 99 de latencia de las peticiones en nuestro servicio.                                                           |
        | `from` | `service:web-store` | El servicio principal en esta pila de ejemplo es un servicio Ruby y toda la información del gráfico con proviene de él. |

    2. A continuación, haz clic en `Graph additional: Metrics` para añadir otra métrica al gráfico:

        | Parámetro | Valor | Descripción |
        | ------    | -----                       | -----                                                                                                                |
        | `metric` | `runtime.ruby.thread_count` | Recuento de hilos tomado del tiempo de ejecución de la métrica Ruby.                                                                    |
        | `from` | `service:web-store` | El servicio principal en esta pila de ejemplo es un servicio Ruby y toda la información del gráfico con proviene de él. |

        {{< img src="tracing/guide/apm_dashboard/dashboard_5.mp4" alt="dashboard_5" video="true" style="width:90%;">}}

    Esta configuración puede mostrar si un pico de latencia está asociado a un pico en el recuento de hilos de Ruby, señalando inmediatamente la causa de la latencia y permitiendo una resolución rápida.

7. **Ir a [Analytics][4]**.

    Este ejemplo muestra cómo consultar la latencia en la aplicación de ejemplo: desglosándola por comerciantes en la plataforma y viendo los 10 comerciantes con mayor latencia. Desde la pantalla Analytics, exporta el gráfico al dashboard y visualízalo allí:

    {{< img src="tracing/guide/apm_dashboard/dashboard_6_cropped.mp4" video="true" alt="dashboard 6" style="width:90%;">}}

8. **Vuelve a tu dashboard**.

    Ahora se pueden ver múltiples widgets, que proporcionan una profunda observabilidad de la aplicación de ejemplo desde una perspectiva tanto técnica como empresarial. Pero esto es sólo el principio de lo que se puede hacer: añadir infraestructura de métricas, utilizar múltiples tipos de visualizaciones y añadir cálculos y proyecciones.

    Con el dashboard, también puedes explorar <txprotected>eventos</txprotected>.

9. **Haz clic en el botón `Search Events or Logs`** y añade Buscar un explorador de eventos relevantes. **Nota**: en este ejemplo, se utiliza Ansible, tu [explorador de eventos][5] podría ser diferente.

    {{< img src="tracing/guide/apm_dashboard/dashboard_1_cropped.png" alt="dashboard 1" style="width:90%;">}}

    Aquí, junto a la vista de nuestro dashboard, se pueden ver los eventos recientes que han ocurrido (en Datadog o en servicios externos como Ansible, Chef, etc.) tales como: despliegues, finalización de tareas, o alertas de monitores. Estos eventos pueden correlacionarse con lo que está ocurriendo en la configuración de métricas en el dashboard.

    Por último, asegúrate de utilizar variables de plantilla. Se trata de un conjunto de valores, que controlan dinámicamente los widgets en el dashboards, que todos los usuarios pueden utilizar sin tener que editar los widgets. Para más información, consulta la documentación [Variable de plantilla][6].

10. Haz clic en **Añadir variable** en la cabecera. Elige la etiqueta que controlará la variable y configura su nombre, valor por defecto o valores disponibles.

    En este ejemplo, se añade una variable de plantilla para `Region` para ver cómo se comporta el dashboard en `us-east1` y `europe-west-4`, nuestras dos áreas principales de operación.

    {{< img src="tracing/guide/apm_dashboard/dashboard_add_template_variable_cropped.png" alt="Agregar ventana emergente de variable que muestre opciones de campo para agregar nombres de variables y etiquetas de variables (tags)" style="width:90%;">}}

    Ahora puedes añadir esta variable de plantilla a cada uno de los gráficos:

    {{< img src="tracing/guide/apm_dashboard/dashboard_dynamic_template_variable.png" alt="Agrega variables de plantilla dinámicas a tu consulta; este ejemplo muestra '$RG' para abarcar dinámicamente la variable de plantilla de región" style="width:90%;">}}

    Al seleccionar valores de variables de plantilla, todos los valores se actualizan en los widgets correspondientes del dashboard.

    Explora todas las métricas disponibles y aprovecha al máximo los 3 pilares de observabilidad de Datadog. Puedes convertir este dashboard básico en una herramienta poderosa que sea una solución única para el monitoreo y la observabilidad en tu organización.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/services
[2]: /es/dashboards/widgets/timeseries/
[3]: /es/tracing/metrics/metrics_namespace/
[4]: https://app.datadoghq.com/apm/traces?viz=timeseries
[5]: /es/events/
[6]: /es/dashboards/template_variables/