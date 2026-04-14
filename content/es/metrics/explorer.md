---
aliases:
- /es/graphing/metrics/explorer/
description: Explora todas tus métricas y realiza análisis.
further_reading:
- link: /metrics/summary/
  tag: Documentación
  text: Resumen de métricas
- link: /metrics/distributions/
  tag: Documentación
  text: Distribuciones de métricas
- link: /dashboards/guide/quick-graphs/
  tag: Documentación
  text: Quick Graphs
title: Explorador de métricas
---

## Información general

El [Explorador de métricas][1] es una interfaz básica para examinar tus métricas en Datadog. Para opciones más avanzadas, crea un [notebook][2] o dashboard [screenboard][3], o un [timeboard][4]).

## Consultas en lenguaje natural

{{< callout url="https://www.datadoghq.com/product-preview/natural-language-querying-for-metrics/">}}
La consulta en lenguaje natural (NLQ) en el Metrics Explorer está en fase de vista previa. Si estás interesado en esta función, haz clic en <strong>Solicitar acceso</strong> y rellena el formulario.
{{< /callout >}}


Utiliza consultas en lenguaje natural (NLQ) para describir lo que buscas en inglés sencillo. Datadog traduce automáticamente tu solicitud en una consulta estructurada de métricas, comprendiendo el contexto, como tus servicios, atributos y etiquetas. Esto facilita la exploración de métricas sin necesidad de escribir una sintaxis compleja.

Para acceder a esta función, haz clic en **Ask** (Preguntar) en el campo de búsqueda y escribe tu consulta.

{{< img src="/metrics/explorer/metrics_nlq_example_10152025.mp4" alt="Consulta de lenguaje natural en el Metrics Explorer que muestra cómo buscar métricas usando frases en inglés sencillo" video=true >}}

Para desactivar NLQ para tu organización, debes tener [permisos org_management][11]. Ve a **Organization Settings > Preferences** (Configuración de la organización > Preferencias) y desactiva la función de consultas en lenguaje natural.

## Creación de gráficos

Utiliza el editor de consultas para personalizar el gráfico que aparece en la página del Explorador de métricas.

Puedes especificar el intervalo de tiempo en la esquina superior derecha de la página. El valor predeterminado es **Más de 1 hora**.

{{< img src="metrics/explorer/metrics_explorer.png" alt="Explorador de métricas que muestra dos consultas en una barra de gráficos" style="width:80%;" >}}

Las métricas que no se han notificado en las últimas 24 horas no aparecen en el editor de consultas. Puedes añadir estas métricas a tus gráficos manualmente, introduciendo el nombre de la métrica o la consulta completa.

### Contexto

Define un contexto de filtrado con el cuadro de texto **desde**, seleccionando o buscando valores de etiquetas (tags). Por ejemplo, puedes utilizar el cuadro de texto **desde** para filtrar valores específicos de métricas de un host, clúster, entorno o región.

### Agregación de espacio

Define la [agregación de espacio][5] utilizada para combinar los valores de una métrica.

Las opciones posibles son:

* Media de los valores notificados (por defecto)
* Máximo de valores notificados
* Mínimo de valores notificados
* Suma de los valores notificados

**Nota**: Las opciones pueden variar en función del tipo de métrica seleccionado.

### Funciones y fórmulas

También puedes añadir funciones a tu consulta utilizando el botón de función. No todas las funciones están disponibles para todos los tipos de métricas. Para obtener más información, consulta la documentación sobre [consultas][6]. 

### Gráfica dividida

Utiliza el botón **Split Graph** (Gráfico dividido) para ver los datos divididos en gráficos individuales por valores de etiquetas como región, servicio o entorno.

### Exportar

Utiliza el botón **Export** (Exportar) (<i class="icon-export"></i>) para exportar tu gráfico:

- Copia un enlace al gráfico para compartirlo
- Añádelo a un [incidente][8]
- Crea un [monitor][9]
- Guárdalo en un [dashboard][10]
- Guárdalo en un [notebook][2] 

### Quick Graphs

Con Quick Graphs, tienes más opciones para visualizar tus datos, sin necesidad de crear un [dashboard][4] o [notebook][2]. Estos gráficos son útiles para entender y solucionar problemas cuestiones sin crear dashboards permanentes o configuraciones de visualización complejas.

Para más información, consulta la documentación de [Quick Graphs][7].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/metric/explorer
[2]: /es/notebooks/
[3]: /es/dashboards/#screenboards
[4]: /es/dashboards/#get-started
[5]: /es/metrics/introduction/#space-aggregation
[6]: /es/dashboards/querying/#advanced-graphing
[7]: /es/dashboards/guide/quick-graphs/
[8]: /es/service_management/incident_management/
[9]: /es/monitors/
[10]: /es/dashboards/
[11]: /es/account_management/rbac/permissions/#access-management