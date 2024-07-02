---
aliases:
- /es/monitors/monitor_types/process
- /es/monitors/create/types/process/
description: Comprobar si un proceso se está ejecutando en un host
further_reading:
- link: /monitors/notify/
  tag: Documentación
  text: Configurar las notificaciones de tu monitor
- link: /monitors/downtimes/
  tag: Documentación
  text: Programar un tiempo de inactividad para silenciar un monitor
- link: /monitors/manage/status/
  tag: Documentación
  text: Comprobar el estado de tu monitor
- link: https://www.datadoghq.com/blog/monitor-fargate-processes/
  tag: Blog
  text: Monitorizar los procesos que se ejecutan en AWS Fargate con Datadog
title: Monitor de procesos en directo
---

## Información general

Los monitores de procesos en directo se basan en los datos recopilados por el [Agente de procesos][1]. Crea monitores que avisen o alerten basándose en el recuento de cualquier grupo de procesos en hosts o etiquetas (tags).

Los monitores de procesos en directo tienen una mayor utilidad en los siguientes casos:

- Asegurar que se están ejecutando suficientes instancias de un proceso de larga duración no contenedorizado.
- Indicar cuando un proceso específico se está ejecutando.

**Nota**: Sólo los procesos de larga duración son recopilados por el Agent. Los monitores en procesos que duran menos de 20 segundos pueden ser defectuosos.

## Creación de un monitor

Hay dos formas de crear un monitor de procesos en directo:

- Utilizar la navegación principal: **Monitors --> New Monitor --> Live Process* (Monitores > Nuevo monitor > Proceso en directo).
- En la [página de procesos en directo][4], busca un proceso que quieras monitorizar. A continuación, haz clic en el menú desplegable situado junto a **+New Metric** (+Nueva métrica) y haz clic en **Create monitor* (Crear monitor)*.

### Seleccionar procesos

Puedes utilizar etiquetas o un texto de búsqueda impreciso para filtrar todos los procesos de tu infraestructura. Los procesos y recuentos coincidentes se muestran debajo de la búsqueda:

{{< img src="monitors/monitor_types/process/select_processes.png" alt="Procesos seleccionados" style="width:90%;">}}

Después de definir tu búsqueda, se muestra un gráfico sobre las entradas de las búsquedas, con una aproximación del número total de procesos encontrados. Se recomienda que el monitor se limite a unos pocos miles de procesos. Utiliza etiquetas adicionales para reducir la búsqueda o considera la posibilidad de dividir un monitor en varios, si es necesario. Para obtener datos más específicos, consulta la [página de procesos en directo][4].

#### Búsqueda de etiquetas

Filtra los procesos que quieres monitorizar por etiquetas. Datadog recomienda intentar filtrar procesos por sus etiquetas antes de utilizar la búsqueda de texto completo.

#### Búsqueda de texto completo

Si no puedes delimitar un proceso para lograr la especificidad que buscas utilizando etiquetas, puedes utilizar un texto de búsqueda para filtrar por líneas de comando y nombres de usuarios. La búsqueda se realiza por coincidencias parciales e imprecisas en todos los procesos de tu infraestructura. Se admiten los operadores de búsqueda `AND`, `OR` y `NOT`. Para obtener más detalles, consulta la [documentación de monitorización de procesos en directo][3].

##### Ejemplos

| Ejemplo de consulta | Explicación |
|---|---|
| `foo AND bar` | Coincide con cualquier proceso cuya línea de comandos contenga `foo` y `bar` |
| `foo AND NOT bar` | Coincide con cualquier proceso cuya línea de comandos contenga `foo` pero no `bar`. |
| `foo OR bar` | Coincide con cualquier proceso que contenga `foo` o `bar`. |
| `foo or NOT bar` | Coincide con cualquier proceso que contenga `foo` o que no contenga `bar`. |

#### Agrupación de alertas

`Simple Alert` (por defecto): agrega alertas de todas las fuentes de información. Recibirás una alerta cuando el valor agregado cumple las condiciones establecidas.

`Multi Alert`: aplica la alerta a cada fuente en función de tus parámetros de grupo. Recibirás una alerta por cada grupo que cumple las condiciones establecidas.

### Definir tus condiciones de alerta

- La posición del recuento del proceso fue `above`, `above or equal to`, `below` o `below or equal to`
- del umbral durante los últimos `5 minutes`, `15 minutes`, `1 hour` o mayor. Además, puedes utilizar `custom` para establecer un valor entre 5 minutos y 24 horas.

En este caso, el recuento del proceso se refiere al número de todos las procesos coincidentes que estuvieron vivos durante el intervalo de tiempo.

Utiliza umbrales para establecer un valor numérico que active una alerta. Datadog tiene dos tipos de notificaciones: alerta y advertencia. Los monitores de procesos en vivo se recuperan automáticamente en función del umbral de alerta o advertencia.

#### Prácticas recomendadas para la selección de periodos de tiempo

Los monitores de procesos en directo utilizan una [ventana temporal móvil][7] para evaluar el recuento de procesos. En otras palabras, cada minuto, el monitor analiza los últimos X minutos y se activa si se cumple la condición de alerta. Se desaconseja el uso de ventanas de evaluación de menos de 5 minutos para evitar falsos positivos debidos a interrupciones esporádicas de la red entre el Agent del proceso y Datadog.

### Condiciones de alerta avanzadas

Para obtener instrucciones detalladas sobre las opciones avanzadas de alerta (resolución automática, retraso en la evaluación, etc.), consulta la página [Configuración de monitores][5].

### Notificaciones

Para obtener instrucciones detalladas sobre la sección **Configurar notificaciones y automatizaciones**, consulta la página [Notificaciones][6].

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/infrastructure/process/
[2]: https://app.datadoghq.com/monitors#create/live_process
[3]: /es/infrastructure/process/#search-syntax
[4]: https://app.datadoghq.com/process
[5]: /es/monitors/configuration/#advanced-alert-conditions
[6]: /es/monitors/notify/
[7]: /es/monitors/configuration/?tab=thresholdalert#evaluation-window