---
further_reading:
- link: /serverless/step_functions/installation
  tag: Documentación
  text: Instalar la monitorización serverless para AWS Step Functions
- link: /serverless/step_functions/troubleshooting
  tag: Documentación
  text: Monitorización serverless de solución de problemas para AWS Step Functions
- link: /integrations/amazon_step_functions/
  tag: Documentación
  text: Integración de AWS Step Functions
- link: /serverless/aws_lambda/
  tag: Documentación
  text: Monitorización serverless para AWS Lambda
title: Monitorización serverless para AWS Step Functions
---

AWS Step Functions es un servicio de orquestación serverless que permite que los desarrolladores creen y administren flujos de trabajo de aplicaciones de varios pasos. Además de obtener métricas de CloudWatch de la [integración de AWS Step Functions][2] de Datadog, Datadog también proporciona la monitorización y el rastreo nativos de AWS Step Functions.

{{< img src="serverless/step_functions/overview1.png" alt="Una pestaña de información general de AWS Step Functions." style="width:100%;" >}}

### Cómo funciona
La  monitorización de AWS Step Functions recopila logs y métricas de la integración de AWS y utiliza logs ingeridos de AWS Step Functions para generar métricas y trazas (traces) mejoradas para tus ejecuciones de Step Functions.

### Monitor del estado general de Step Functions en la vista serverless 
La vista serverless muestra métricas clave para tu Step Functions en un solo lugar para proporcionar fácilmente una snapshot del estado de tu Step Functions. Puedes acceder a una vista detallada de cada Step Function para consultar todas las métricas, logs, y trazas asociados dentro de un intervalo de tiempo determinado y configurar monitors para ejecuciones problemáticas. 

{{< img src="serverless/step_functions/overview2.png" alt="Una visualización de AWS Step Function with etiquetas (tags) de tramos (spans)." style="width:100%;" >}}


###  Visualiza trazas de AWS Step Function en un mapa de máquina de estados
Cuando el [rastreo de Step Function está activado][1], puedes utilizar una representación visual de una ejecución de AWS Step Function a través de un mapa de la máquina de estados. Obtén una visión general de si una ejecución correcta o incorrecta siguió la ruta esperada a través de la máquina de estados. Profundiza en las ejecuciones anómalas para identificar qué estados son problemáticos o tienen una latencia elevada.

{{< img src="serverless/step_functions/overview3.png" alt="Un tramo de AWS Step Function mostrado en una visualización de gráfica de llamas" style="width:100%;" >}}


### Reduce el tiempo de depuración de Step Function con trazas de una ejecución detallada
Puedes ver trazas de principio a fin para una sola ejecución de Step Function y sus logs, errores y métricas asociados, lo cual te permite identificar problemas en tu lógica de Step Function. Los tramos (spans) de Step Function también contienen metadatos detallados para entradas y salidas de pasos, trazas Lambda asociadas y una duración de los pasos que te ayuda a reproducir errores y solucionar cuellos de botella.

Para empezar, sigue las [instrucciones de instalación][1].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/serverless/step_functions/installation
[2]: /es/integrations/amazon_step_functions/