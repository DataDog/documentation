---
further_reading:
- link: /serverless/step_functions/installation
  tag: Documentación
  text: Instalar la monitorización serverless para AWS Step Functions
- link: /serverless/step_functions/merge-step-functions-lambda
  tag: Documentación
  text: Fusión de trazas de Step Functions y Lambda
- link: /serverless/step_functions/enhanced-metrics
  tag: Documentación
  text: Métricas mejoradas para AWS Step Functions
- link: /serverless/step_functions/redrive
  tag: Documentación
  text: Ejecuciones de Redrive
- link: /serverless/step_functions/distributed-maps
  tag: Documentación
  text: Rastreo de estados de mapa distribuido
- link: /serverless/step_functions/troubleshooting
  tag: Documentación
  text: Soluciionar problemas de monitorización serverless de AWS Step Functions
title: Monitorización serverless para AWS Step Functions
---

AWS Step Functions es un servicio de orquestación sin servidor que permite a los desarrolladores crear y gestionar procesos de aplicaciones de múltiples pasos. Además de obtener métricas de CloudWatch de la integración de [AWS Step Functions][2] de Datadog, Datadog también proporciona rastreo, logs y [métricas mejoradas][3] de AWS Step Functions a través de la recopilación de logs de CloudWatch.

{{< img src="serverless/step_functions/overview_725.png" alt="Una pestaña de información general de AWS Step Function." style="width:100%;" >}}

### Cómo funciona
La monitorización de Datadog AWS Step Functions utiliza las métricas de CloudWatch de la [integración de AWS Step Functions][2] y los logs de CloudWatch enviados a través de Datadog Forwarder o Amazon Data Firehose. Tanto Forwarder como Firehose se ejecutan en tu entorno. El envío de logs de CloudWatch proporciona rastreo y [métricas mejoradas][3].

<!-- {{< img src="serverless/step_functions/how_it_works.png" alt="Diagrama que muestra dos componentes de la monitorización de Datadog AWS Step Function: las métricas de Cloudwatch enviadas mediante la integración de AWS Step Functions y logs, trazas y métricas mejoradas enviadas mediante el Datadog Lambda Forwarder o Amazon Data Firehose." style="width:100%;" >}} -->

### Monitor del mantenimiento general de Step Functions en la vista serverless
La vista serverless muestra métricas clave para tu Step Functions en un solo lugar para proporcionar fácilmente una snapshot del mantenimiento de tu Step Functions. Puedes acceder a una vista detallada de cada Step Function para consultar todas las métricas, logs, y trazas asociados dentro de un intervalo de tiempo determinado y configurar monitors para ejecuciones problemáticas.

{{< img src="serverless/step_functions/overview_trace_725.png" alt="Una visualización de AWS Step Function con span tags." style="width:100%;" >}}


### Visualiza trazas de AWS Step Function en un mapa de máquina de estados
Cuando el [rastreo de Step Function está activado][1], puedes utilizar una representación visual de una ejecución de AWS Step Function a través de un mapa de máquina de estados. Obtén una visión general de si una ejecución correcta o incorrecta siguió la ruta esperada a través de la máquina de estados. Profundiza en las ejecuciones anómalas para identificar qué estados son problemáticos o tienen una alta latencia.

{{< img src="serverless/step_functions/traceview_725.png" alt="Un tramo de AWS Step Function en una visualización de gráfica de llamas." style="width:100%;" >}}


### Reduce el tiempo de depuración de Step Function con trazas de una ejecución detallada
Puedes ver trazas de principio a fin para una sola ejecución de Step Function y sus logs, errores y métricas asociados, lo cual te permite identificar problemas en tu lógica de Step Function. Los tramos de Step Function también contienen metadatos detallados para entradas y salidas de pasos, trazas Lambda asociadas y una duración de los pasos que te ayuda a reproducir errores y solucionar cuellos de botella.

Para empezar, sigue las [instrucciones de instalación][1].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/serverless/step_functions/installation
[2]: /es/integrations/amazon_step_functions/
[3]: /es/serverless/step_functions/enhanced-metrics
