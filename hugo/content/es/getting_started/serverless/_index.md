---
description: Monitoriza aplicaciones sin servidor con métricas, trazas y logs de Lambda
  mejorados para solucionar problemas de rendimiento y errores.
further_reading:
- link: agent/
  tag: Documentación
  text: El Datadog Agent
- link: https://dtdg.co/fe
  tag: Habilitar los fundamentos
  text: Participa en una sesión interactiva para saber más sobre monitorización serverless.
title: Empezando con AWS Lambda Serverless Monitoring
---

## Información general

_Serverless_ es un modelo en el que los desarrolladores crean y ejecutan aplicaciones y servicios mediante un proveedor de soluciones en la nube en lugar de gestionar la infraestructura ellos mismos. La [monitorización serverless][1] de Datadog recopila métricas, logs y trazas (traces) de tu infraestructura serverless, lo que te permite supervisar el estado y el rendimiento de tu aplicación.

Esta guía hace uso de una [aplicación de ejemplo][2] serverless que puedes lanzar utilizando un lenguaje de programación e infraestructura como una herramienta de código (IaC) con la que estés familiarizado. Esta aplicación tiene la monitorización serverless preconfigurada. Sigue esta guía para ver cómo podrías solucionar un problema en tu aplicación de ejemplo, y qué tipos de visibilidad puede proporcionar la monitorización serverless.

### Despliegue de la aplicación de ejemplo

1. Clona el repositorio de [aplicaciones de ejemplo][3] en tu máquina local.
2. Elige el tiempo de ejecución y la herramienta de IaC que prefieras y sigue el enlace a las instrucciones específicas de despliegue
3. Busca tu [clave de API de Datadog][4] y [sitio de Datadog][5] ({{< region-param key="dd_site" code="true" >}}). Los necesitarás para el siguiente paso.
4. Sigue las instrucciones específicas de tiempo de ejecución e IaC para desplegar la aplicación de ejemplo.
5. Una vez completado el despliegue, puedes utilizar la colección de Postman en la raíz del repositorio o ejecutar la [prueba de carga][6].

Puedes [ver las funciones de tu aplicación de ejemplo en la Vista serverless][7].

{{< img src="getting_started/serverless/serverless_view_2024_2.png" alt="Monitorización serverless: vista serverless, una página del explorador" style="width:80%;">}}

## Vista Serverless

La vista serverless muestra la telemetría de todos los recursos sin servidor en tu entorno de AWS. Puedes usar esta página como punto de partida para monitorizar, depurar y optimizar tus aplicaciones.

La vista serverless agrupa tus recursos por `SERVICE_NAME`. Si has invocado tus funciones al menos una vez, verás un grupo de servicios separado para cada uno de los servicios backend individuales.

{{< img src="getting_started/serverless/functions_view_2.png" alt="Acercamiento de dos funciones" style="width:80%;">}}

### Información sobre Serverless
En la vista serverless, la columna situada más a la derecha se titula **Insights** (Información). Datadog destaca automáticamente los problemas potenciales de tus aplicaciones serverless, como [picos de errores][8] y [duración elevada][9]; estos problemas aparecen en la columna Insights (Información).

Para tu aplicación serverless de ejemplo, es probable que Datadog haya detectado un [arranque en frío][10]. Los arranques en frío se producen cuando la aplicación serverless recibe un aumento repentino de tráfico. Esto puede ocurrir si la función antes estaba recibiendo un número relativamente constante de solicitudes y de repente empieza a recibir más o, como en este caso, cuando la función estaba previamente inactiva y ha sido invocada por primera vez.

## Investigar errores

La aplicación de ejemplo genera errores periódicamente y tiene una respuesta lenta. Esto provoca tiempos de inactividad de Lambda en el servicio de fijación de precios de los productos.

{{< img src="getting_started/serverless/dd_serverless_view_error_2.png" alt="Acercamiento de dos funciones" style="width:80%;">}}

Observa que ambos servicios bajo `product-pricing-service` tienen errores. La sección Issues & Insights (Problemas e información) en la parte superior también identifica que uno de tus servicios tiene problemas con los tiempos de inactividad.

{{< img src="getting_started/serverless/insights_and_issues.png" alt="Vista Información y problemas en la vista serverless" style="width:80%;">}}

## Detalles de la función
Haz clic en tu función para ver más detalles sobre las invocaciones y despliegues recientes.

{{< img src="getting_started/serverless/details_error_2.png" alt="Acercamiento de dos funciones" style="width:80%;">}}

La vista detallada, como se muestra arriba, contiene tres gráficos. Puedes configurarlos para que muestren cualquier métrica disponible; por defecto, muestran tres [métricas mejoradas de Lambda][11]: invocaciones, errores y duración.

Datadog genera métricas de Lambda mejoradas predefinidas con baja latencia, granularidad de varios segundos y metadatos detallados para arranques en frío y etiquetas personalizadas. También puedes consultar el [dashboard de métricas mejoradas de Lambda][12].


### Invocaciones
La pestaña **Invocations** (Invocaciones) muestra las invocaciones recientes de tu función. 

Cada invocación está asociada a una traza. Haz clic en **Open Trace** (Abrir traza) para ver la traza correspondiente a cada invocación:

{{< img src="getting_started/serverless/dd_flame_graph_2.png" alt="Acercamiento de dos funciones" style="width:80%;">}}

La pestaña **Flame Graph** (Gráfica de llamas) muestra exactamente lo que ocurrió durante la duración de esta invocación, incluyendo cuáles servicios tuvieron el mayor porcentaje del tiempo total de ejecución. La gráfica de llamas muestra la solicitud a medida que se mueve desde APIGateway, a través de tu `create-product-function`. 

Si amplías la imagen, también podrás ver toda la traza de extremo a extremo a través de todos los  servicios descendentes.

{{< img src="getting_started/serverless/trace_map_2.png" alt="Acercamiento de dos funciones" style="width:80%;">}}

La pestaña **Trace Map** (Mapa de trazas) representa el flujo de tus servicios y cómo están conectados entre sí.

Si estás viendo una traza con un error, la mitad inferior de la vista detallada de la traza muestra los detalles:

```
Error: Failure generating prices
  at PricingService.calculate (/var/task/index.js:94382:13)
  at ProductUpdatedEventHandler.handle (/var/task/index.js:95826:51)
  at handler (/var/task/index.js:95854:34)
```

Debajo, también podrás examinar las cargas útiles de solicitud y respuesta de Lambda. Datadog recopila las cargas útiles de eventos en cada invocación de Lambda.

### Logs

La aplicación de muestreo serverless tiene los logs activados por defecto. Puedes consultar los logs de cada función en la pestaña **Logs**.

{{< img src="getting_started/serverless/dd_logs_view_2.png" alt="Acercamiento de dos funciones" style="width:80%;">}}

Puedes filtrar estos logs para ver sólo los errores, o verlos en el [Log Explorer][13].


[1]: /es/serverless
[2]: https://github.com/DataDog/serverless-sample-app
[3]: https://github.com/DataDog/serverless-sample-app?tab=readme-ov-file#implementations
[4]: https://app.datadoghq.com/organization-settings/api-keys
[5]: https://docs.datadoghq.com/es/getting_started/site
[6]: https://github.com/DataDog/serverless-sample-app/tree/main?tab=readme-ov-file#load-tests
[7]: https://app.datadoghq.com/functions?cloud=aws&text_search=product
[8]: https://docs.datadoghq.com/es/serverless/guide/insights/#high-errors
[9]: https://docs.datadoghq.com/es/serverless/guide/insights/#high-duration
[10]: https://docs.datadoghq.com/es/serverless/guide/insights/#cold-starts
[11]: https://docs.datadoghq.com/es/serverless/enhanced_lambda_metrics
[12]: https://app.datadoghq.com/screen/integration/30306?_gl=1*19700i3*_ga*OTk0Mjg4Njg4LjE2NDIwOTM2OTY.*_ga_KN80RDFSQK*MTY0OTI3NzAyMC4xNTAuMS4xNjQ5MjgzMjI1LjA.
[13]: https://docs.datadoghq.com/es/logs/explorer/