---
app_id: express
categories:
- lenguajes
custom_kind: integración
description: Express es un marco de aplicaciones web Node.js.
media: []
title: Express
---
{{< img src="integrations/expressjs/expressjs_graph.png" alt="Gráfico de ExpressJS" popup="true">}}

## Información general

<div class="alert alert-danger">La integración Express está obsoleta y ha sido sustituida por Datadog APM. Datadog APM genera las mismas <a href="https://docs.datadoghq.com/tracing/runtime_metrics/nodejs/">métricas</a> que la integración Express y además ofrece muchas otras características e integraciones. Datadog recomienda encarecidamente actualizar a <a href="https://docs.datadoghq.com/tracing/connect_logs_and_traces/nodejs/">APM</a>, ya que la integración Express no tendrá más actualizaciones.</div>

Añade el [connect-datadog middleware](https://www.npmjs.com/package/connect-datadog) de Datadog a tu aplicación para:

- Alertar sobre tus tiempos de respuesta
- Monitorizar tu código de respuesta

## Configuración

La integración Express requiere el servidor DogStatsD Datadog Agent para reenviar tus métricas recopiladas a Datadog.

Después de [instalar el Agent](https://app.datadoghq.com/account/settings/agent/latest) en tu host, consulta la [documentación de configuración de DogStatsD](https://docs.datadoghq.com/developers/dogstatsd/?tab=hostagent#setup) para activarlo.

### Configuración

1. Instalar el middleware

   ```shell
   npm install connect-datadog
   ```

1. Modifica tu código para añadir el middleware de Datadog:

   ```js
   var dd_options = {
     'response_code':true,
     'tags': ['app:my_app']
   }

   var connect_datadog = require('connect-datadog')(dd_options);

   // Add your other middleware
   app.use(...);

   // Add the datadog-middleware before your router
   app.use(connect_datadog);
   app.use(router);
   ```

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **node.express.router.response_code.100** <br>(rate) | Porcentaje de solicitudes que generan respuestas con un código de estado 100.<br>_Se muestra como respuesta_ |
| **node.express.router.response_code.101** <br>(rate) | Porcentaje de solicitudes que generan respuestas con un código de estado 101.<br>_Se muestra como respuesta_ |
| **node.express.router.response_code.102** <br>(rate) | Porcentaje de solicitudes que generan respuestas con un código de estado 102.<br>_Se muestra como respuesta_ |
| **node.express.router.response_code.200** <br>(rate) | Porcentaje de solicitudes que generan respuestas con un código de estado 200.<br>_Se muestra como respuesta_ |
| **node.express.router.response_code.201** <br>(rate) | Porcentaje de solicitudes que generan respuestas con un código de estado 201.<br>_Se muestra como respuesta_ |
| **node.express.router.response_code.202** <br>(rate) | Porcentaje de solicitudes que generan respuestas con un código de estado 202.<br>_Se muestra como respuesta_ |
| **node.express.router.response_code.203** <br>(rate) | Porcentaje de solicitudes que generan respuestas con un código de estado 203.<br>_Se muestra como respuesta_ |
| **node.express.router.response_code.204** <br>(rate) | Porcentaje de solicitudes que generan respuestas con un código de estado 204.<br>_Se muestra como respuesta_ |
| **node.express.router.response_code.205** <br>(rate) | Porcentaje de solicitudes que generan respuestas con un código de estado 205.<br>_Se muestra como respuesta_ |
| **node.express.router.response_code.206** <br>(rate) | Porcentaje de solicitudes que generan respuestas con un código de estado 206.<br>_Se muestra como respuesta_ |
| **node.express.router.response_code.207** <br>(rate) | Porcentaje de solicitudes que generan respuestas con un código de estado 207.<br>_Se muestra como respuesta_ |
| **node.express.router.response_code.208** <br>(rate) | Porcentaje de solicitudes que generan respuestas con un código de estado 208.<br>_Se muestra como respuesta_ |
| **node.express.router.response_code.226** <br>(rate) | Porcentaje de solicitudes que generan respuestas con un código de estado 226.<br>_Se muestra como respuesta_ |
| **node.express.router.response_code.300** <br>(rate) | Porcentaje de solicitudes que generan respuestas con un código de estado 300.<br>_Se muestra como respuesta_ |
| **node.express.router.response_code.301** <br>(rate) | Porcentaje de solicitudes que generan respuestas con un código de estado 301.<br>_Se muestra como respuesta_ |
| **node.express.router.response_code.302** <br>(rate) | Porcentaje de solicitudes que generan respuestas con un código de estado 302.<br>_Se muestra como respuesta_ |
| **node.express.router.response_code.303** <br>(rate) | Porcentaje de solicitudes que generan respuestas con un código de estado 303.<br>_Se muestra como respuesta_ |
| **node.express.router.response_code.304** <br>(rate) | Porcentaje de solicitudes que generan respuestas con un código de estado 304.<br>_Se muestra como respuesta_ |
| **node.express.router.response_code.305** <br>(rate) | Porcentaje de solicitudes que generan respuestas con un código de estado 305.<br>_Se muestra como respuesta_ |
| **node.express.router.response_code.306** <br>(rate) | Porcentaje de solicitudes que generan respuestas con un código de estado 306.<br>_Se muestra como respuesta_ |
| **node.express.router.response_code.307** <br>(rate) | Porcentaje de solicitudes que generan respuestas con un código de estado 307.<br>_Se muestra como respuesta_ |
| **node.express.router.response_code.308** <br>(rate) | Porcentaje de solicitudes que generan respuestas con un código de estado 308.<br>_Se muestra como respuesta_ |
| **node.express.router.response_code.400** <br>(rate) | Porcentaje de solicitudes que generan respuestas con un código de estado 400.<br>_Se muestra como respuesta_ |
| **node.express.router.response_code.401** <br>(rate) | Porcentaje de solicitudes que generan respuestas con un código de estado 401.<br>_Se muestra como respuesta_ |
| **node.express.router.response_code.402** <br>(rate) | Porcentaje de solicitudes que generan respuestas con un código de estado 402.<br>_Se muestra como respuesta_ |
| **node.express.router.response_code.403** <br>(rate) | Porcentaje de solicitudes que generan respuestas con un código de estado 403.<br>_Se muestra como respuesta_ |
| **node.express.router.response_code.404** <br>(rate) | Porcentaje de solicitudes que generan respuestas con un código de estado 404.<br>_Se muestra como respuesta_ |
| **node.express.router.response_code.405** <br>(rate) | Porcentaje de solicitudes que generan respuestas con un código de estado 405.<br>_Se muestra como respuesta_ |
| **node.express.router.response_code.406** <br>(rate) | Porcentaje de solicitudes que generan respuestas con un código de estado 406.<br>_Se muestra como respuesta_ |
| **node.express.router.response_code.407** <br>(rate) | Porcentaje de solicitudes que generan respuestas con un código de estado 407.<br>_Se muestra como respuesta_ |
| **node.express.router.response_code.408** <br>(rate) | Porcentaje de solicitudes que generan respuestas con un código de estado 408.<br>_Se muestra como respuesta_ |
| **node.express.router.response_code.409** <br>(rate) | Porcentaje de solicitudes que generan respuestas con un código de estado 409.<br>_Se muestra como respuesta_ |
| **node.express.router.response_code.410** <br>(rate) | Porcentaje de solicitudes que generan respuestas con un código de estado 410.<br>_Se muestra como respuesta_ |
| **node.express.router.response_code.411** <br>(rate) | Porcentaje de solicitudes que generan respuestas con un código de estado 411.<br>_Se muestra como respuesta_ |
| **node.express.router.response_code.412** <br>(rate) | Porcentaje de solicitudes que generan respuestas con un código de estado 412.<br>_Se muestra como respuesta_ |
| **node.express.router.response_code.413** <br>(rate) | Porcentaje de solicitudes que generan respuestas con un código de estado 413.<br>_Se muestra como respuesta_ |
| **node.express.router.response_code.414** <br>(rate) | Porcentaje de solicitudes que generan respuestas con un código de estado 414.<br>_Se muestra como respuesta_ |
| **node.express.router.response_code.415** <br>(rate) | Porcentaje de solicitudes que generan respuestas con un código de estado 415.<br>_Se muestra como respuesta_ |
| **node.express.router.response_code.416** <br>(rate) | Porcentaje de solicitudes que generan respuestas con un código de estado 416.<br>_Se muestra como respuesta_ |
| **node.express.router.response_code.417** <br>(rate) | Porcentaje de solicitudes que generan respuestas con un código de estado 417.<br>_Se muestra como respuesta_ |
| **node.express.router.response_code.421** <br>(rate) | Porcentaje de solicitudes que generan respuestas con un código de estado 421.<br>_Se muestra como respuesta_ |
| **node.express.router.response_code.422** <br>(rate) | Porcentaje de solicitudes que generan respuestas con un código de estado 422.<br>_Se muestra como respuesta_ |
| **node.express.router.response_code.423** <br>(rate) | Porcentaje de solicitudes que generan respuestas con un código de estado 423.<br>_Se muestra como respuesta_ |
| **node.express.router.response_code.424** <br>(rate) | Porcentaje de solicitudes que generan respuestas con un código de estado 424.<br>_Se muestra como respuesta_ |
| **node.express.router.response_code.425** <br>(rate) | Porcentaje de solicitudes que generan respuestas con un código de estado 425.<br>_Se muestra como respuesta_ |
| **node.express.router.response_code.426** <br>(rate) | Porcentaje de solicitudes que generan respuestas con un código de estado 426.<br>_Se muestra como respuesta_ |
| **node.express.router.response_code.428** <br>(rate) | Porcentaje de solicitudes que generan respuestas con un código de estado 428.<br>_Se muestra como respuesta_ |
| **node.express.router.response_code.429** <br>(rate) | Porcentaje de solicitudes que generan respuestas con un código de estado 429.<br>_Se muestra como respuesta_ |
| **node.express.router.response_code.431** <br>(rate) | Porcentaje de solicitudes que generan respuestas con un código de estado 431.<br>_Se muestra como respuesta_ |
| **node.express.router.response_code.451** <br>(rate) | Porcentaje de solicitudes que generan respuestas con un código de estado 451.<br>_Se muestra como respuesta_ |
| **node.express.router.response_code.500** <br>(rate) | Porcentaje de solicitudes que generan respuestas con un código de estado 500.<br>_Se muestra como respuesta_ |
| **node.express.router.response_code.501** <br>(rate) | Porcentaje de solicitudes que generan respuestas con un código de estado 501.<br>_Se muestra como respuesta_ |
| **node.express.router.response_code.502** <br>(rate) | Porcentaje de solicitudes que generan respuestas con un código de estado 502.<br>_Se muestra como respuesta_ |
| **node.express.router.response_code.503** <br>(rate) | Porcentaje de solicitudes que generan respuestas con un código de estado 503.<br>_Se muestra como respuesta_ |
| **node.express.router.response_code.504** <br>(rate) | Porcentaje de solicitudes que generan respuestas con un código de estado 504.<br>_Se muestra como respuesta_ |
| **node.express.router.response_code.505** <br>(rate) | Porcentaje de solicitudes que generan respuestas con un código de estado 505.<br>_Se muestra como respuesta_ |
| **node.express.router.response_code.506** <br>(rate) | Porcentaje de solicitudes que generan respuestas con un código de estado 506.<br>_Se muestra como respuesta_ |
| **node.express.router.response_code.507** <br>(rate) | Porcentaje de solicitudes que generan respuestas con un código de estado 507.<br>_Se muestra como respuesta_ |
| **node.express.router.response_code.508** <br>(rate) | Porcentaje de solicitudes que generan respuestas con un código de estado 508.<br>_Se muestra como respuesta_ |
| **node.express.router.response_code.510** <br>(rate) | Porcentaje de solicitudes que generan respuestas con un código de estado 510.<br>_Se muestra como respuesta_ |
| **node.express.router.response_code.511** <br>(rate) | Porcentaje de solicitudes que generan respuestas con un código de estado 511.<br>_Se muestra como respuesta_ |
| **node.express.router.response_code.all** <br>(rate) | Porcentaje de todas las solicitudes que reciben una respuesta.<br>_Se muestra como respuesta_ |
| **node.express.router.response_time.95percentile** <br>(gauge) | Percentil 95 del tiempo de respuesta.<br>_Se muestra en milisegundos_ |
| **node.express.router.response_time.avg** <br>(gauge) | Tiempo medio de respuesta.<br>_Se muestra en milisegundos_ |
| **node.express.router.response_time.count** <br>(rate) | Porcentaje de respuestas recibidas.<br>_Se muestra como respuesta_ |
| **node.express.router.response_time.max** <br>(gauge) | Tiempo máximo de respuesta.<br>_Se muestra en milisegundos_ |
| **node.express.router.response_time.median** <br>(gauge) | Mediana del tiempo de respuesta.<br>_Se muestra en milisegundos_ |

### Eventos

La integración Express no incluye eventos.

### Checks de servicio

La integración Express no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).