---
description: Investigar la Vista de rutas de Network Path
further_reading:
- link: /network_monitoring/network_path/setup
  tag: Documentación
  text: Configurar Network Path
- link: https://www.datadoghq.com/blog/cloud-network-monitoring-datadog/
  tag: Blog
  text: Monitorizar arquitecturas y dependencias de aplicaciones en la nube con Datadog
    NPM
title: Vista de rutas
---
{{< site-region region="gov" >}}
<div class="alert alert-danger">Network Path para Datadog Cloud Network Monitoring no es compatible con tu <a href="/getting_started/site">sitio Datadog</a> seleccionado ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

<div class="alert alert-info">Network Path para Datadog Cloud Network Monitoring tiene disponibilidad limitada. Para inscribirte, ponte en contacto con tu representante de Datadog.</div>

## Información general

La sección Vista de rutas en Network Path permite un examen detallado de una ruta concreta, lo que ayuda a resolver los posibles problemas que puedan ocurrir entre el origen y el destino. Ofrece datos exhaustivos tanto de la latencia de extremo a extremo como de la pérdida de paquetes a lo largo de la ruta.

Para acceder a la página de la vista de rutas, haz clic en una ruta desde la [vista de lista][2]. En esta página, puedes cambiar los colores del umbral de latencia y consultar el estado de cada salto.

{{< img src="network_performance_monitoring/network_path/path_view_3.png" alt="Vista de rutas en Network Path donde se resalta una ruta seleccionada desde el origen hasta el destino" >}}

Haz clic en cualquier ruta del salto entre el origen y el destino para ver detalles adicionales como `Hop TTL`, `Hop Latency` y `Traversed count`. A continuación, haz clic en **View Device Details** (Ver detalles del dispositivo) para ir a los detalles del dispositivo seleccionado en [NDM][3].

{{< img src="network_performance_monitoring/network_path/path_details.png" alt="Vista de rutas en Network Path donde se resaltan detalles de la ruta." style="width:50%;" >}}

## Leyenda

La leyenda proporciona detalles adicionales del estado de cada salto.

{{< img src="network_performance_monitoring/network_path/legend.png" alt="Vista de rutas en Network Path donde se muestra la leyenda." style="width:50%;" >}}

Recuento transversal 
: Número de `traceroutes` que atravesaron el salto.

Finalización transversal 
: Indica si `traceroute` logró o no llegar al destino.

Accesibilidad
: El nivel de pérdida de paquetes que experimenta el destino.

Latencia 
: El tiempo que tarda `traceroute` en llegar de un origen a su destino.

**Nota**: La latencia salto a salto puede mostrar `N/A` para los saltos que estaban incompletos.

## Barra de estado

Arrastra la barra de estado de latencia y accesibilidad para observar un snapshot de la latencia de extremo a extremo y de la pérdida de paquetes de extremo a extremo en un intervalo de tiempo específico a lo largo de la ruta.

**Nota**: Cambiar la barra de estado no afecta al intervalo de tiempo global en la parte superior de la página.

{{< img src="network_performance_monitoring/network_path/latency_health_bar_2.mp4" alt="Vídeo de la ruta de red, donde se selecciona la barra de estado de latencia y se arrastra a un periodo de tiempo." video="true" >}}

## Gráficos

La sección inferior de la página de la vista de rutas ofrece información adicional sobre cada ruta a través de una serie de gráficos.  

### Gráfico de métricas de extremo a extremo

El gráfico de métricas de extremo a extremo presenta una representación visual de la latencia de extremo a extremo y de la pérdida de paquetes de extremo a extremo en cada ruta, lo que te permite compararlas y analizarlas eficazmente.


{{< img src="network_performance_monitoring/network_path/end-to-end-metrics-graph.png" alt="Página de la vista de rutas que muestra un gráfico de métricas de extremo a extremo." >}}

### Gráfico de latencia salto a salto

El gráfico de latencia salto a salto ofrece una visión detallada de la latencia de cada salto a lo largo de la ruta, lo que facilita la identificación de posibles cuellos de botella o áreas problemáticas.


{{< img src="network_performance_monitoring/network_path/hop-to-hop-latency-graph_2.png" alt="Página de la vista de rutas que muestra un gráfico de latencia salto a salto." >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/network/path
[2]: /es/network_monitoring/network_path/list_view
[3]: /es/network_monitoring/devices