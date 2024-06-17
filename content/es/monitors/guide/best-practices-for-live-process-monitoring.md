---
kind: Guía
title: Prácticas recomendadas para la monitorización de Live Processes
---

## Información general

Con el producto Live Processes, puedes monitorizar el número de procesos en ejecución en toda tu infraestructura. Los monitores de Live Processes son muy útiles para añadir observabilidad a procesos no contenedorizados.

Utiliza monitores de Live Processes para:

- Asegúrate de que dispone de suficientes réplicas de un proceso para atender a los clientes.
- Alerta cuando se ejecuta un proceso específico.

Un monitor mal configurado es propenso a falsos positivos. Esta guía abarca las prácticas recomendadas para crear un monitor de Live Processes fiable. Para una visión detallada del proceso de creación del monitor, consulta [Creación del monitor de Live Processes][3].

## Prácticas recomendadas

### Alcance del monitor

Datadog recomienda limitar el alcance del monitor a no más de unos pocos miles de procesos. Dado que la búsqueda de texto es difusa, las etiquetas (tags) son la forma más precisa de ajustar el contexto de tu monitor.

Ejemplo de flujo de trabajo:

1. Ve a la página [**Monitors > New Monitor > Live Process**][4] (Monitores > Monitor nuevo > Live Process).

2. Añade etiquetas al monitor en el campo **by tags** (por etiquetas).
    - Por ejemplo, utiliza `command:puma` para monitorizar procesos asociados al comando `puma`.

{{< img src="monitors/monitor_types/process/tag-scoped-process-monitor.png" alt="Un monitor de Live Processes que se ha limitado mediante una etiqueta" style="width:100%;" >}}

3. Opcionalmente, limita el contexto del monitor añadiendo texto de búsqueda en el campo **by text** (por texto). En el ejemplo siguiente, solo se incluyen procesos cuya línea de comandos coincide con `cluster worker`.

{{< img src="monitors/monitor_types/process/text-scoped-process-monitor.png" alt="Un monitor de Live Processes que se ha limitado mediante una búsqueda de texto" style="width:100%;" >}}

4. Si el contexto del monitor todavía supera unos pocos miles de procesos en total en todos los grupos de monitor, utiliza etiquetas adicionales para dividirlo en varios monitores.
    - Por ejemplo, puedes utilizar la etiqueta `env` para crear monitores independientes para `prod` y `staging`.

### Elegir un marco temporal

Una idea errónea muy común es que aumentar el intervalo de evaluación conlleva respuestas más lentas o alertas perdidas, pero un monitor evalúa continuamente los datos independientemente del intervalo de evaluación de la consulta que se elija. El intervalo de evaluación solo determina cuántos puntos de datos se utilizan para decidir si existe una anomalía.

Al aumentar el periodo de evaluación, puedes asegurarte de que solo se te avise si un comportamiento se está produciendo de forma constante, no de forma temporal.

- Para evitar falsos positivos, utiliza un intervalo mínimo de **5 minutos**.
- Si tu monitor utiliza etiquetas que provienen de la integración de un proveedor en la nube, utiliza un intervalo mínimo de **15 minutos**.
- Para evitar alertas retrasadas, utiliza un intervalo máximo de **1 hora**.

Para obtener directrices adicionales, consulta [Prácticas recomendadas para prevenir la fatiga por alerta][2].

[1]: https://app.datadoghq.com/process
[2]: https://www.datadoghq.com/blog/best-practices-to-prevent-alert-fatigue/#increase-your-evaluation-window
[3]: https://docs.datadoghq.com/es/monitors/types/process/#monitor-creation
[4]: https://app.datadoghq.com/monitors/create/live_process