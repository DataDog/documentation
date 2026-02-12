---
app_id: akamai_mpulse
categories:
- nube
custom_kind: integración
description: Integra Akamai mPulse con Datadog.
further_reading:
- link: https://www.datadoghq.com/blog/integrate-akamai-mpulse-real-user-monitoring-with-datadog/
  tag: Blog
  text: Integrar Real User Monitoring de Akamai mPulse con Datadog
title: Akamai mPulse
---
## Información general

Conecta Datadog con Akamai mPulse para recopilar métricas de Real User Monitoring (RUM) y obtener visibilidad sobre cómo perciben los usuarios finales el rendimiento de un sitio web. Obtén una visibilidad completa de todo tu stack tecnológico web al analizar y correlacionar métricas de RUM con los datos de rendimiento de tu CDN e infraestructura de backend.

Utiliza el dashboard predefinido de Datadog y monitores para:

- Obtener una visión general de métricas clave como la tasa de rebote, las sesiones de usuario y los tiempos de carga de la página.
- Investigar el origen de la ralentización a la que se enfrenta el usuario, ya sea frontend o backend.
- Monitorizar los tiempos de carga y grupos de páginas

Correlaciona métricas con datos en tiempo real de [Akamai DataStream 2](https://docs.datadoghq.com/integrations/akamai_datastream_2/), [NGINX](https://docs.datadoghq.com/integrations/nginx/), [MYSQL](https://docs.datadoghq.com/integrations/mysql/) y más de otras 600 tecnologías para obtener una vista de frontend a backend de tu stack tecnológico web.

## Configuración

### Instalación

Instala la integración con el [cuadro de integración de Akamai mPulse](https://app.datadoghq.com/integrations/akamai-mpulse) de Datadog.

### Configuración

Para configurar la integración de Akamai mPulse se necesitan una `apiKey` y un `apiToken`.

#### Generar una clave de API

La `apiKey` es un valor autogenerado que identifica de forma única los datos de tu sitio (balizas) que se encuentran en tu portal mPulse.

<div class="alert alert-warning">
La opción de menú "Apps" (Aplicaciones) y el atributo `apiKey` solo son visibles para los administradores de aplicaciones. 
</div>

1. Encuentra tu `apiKey` navegando hasta la página "Central".
1. Haz clic en **Apps** (Aplicaciones) en el panel izquierdo.
1. Selecciona el nombre de la aplicación que deseas monitorizar para abrir una página de configuración que contenga tu `apiKey`.

#### Generar un token de API

Consulta la [documentación de Akamai sobre el token de API](https://community.akamai.com/customers/s/article/mPulse-API-Login-Changes?language=en_US) y:

1. Inicia sesión en `mpulse.soasta.com`.
1. Ve a My Settings (Mis ajustes) en el panel de la izquierda.
1. Haz clic en "Generate" (Generar) en el área de token de API.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **akamai.mpulse.bouncerate** <br>(gauge) | Porcentaje de visitantes que entran en el sitio y luego lo abandonan<br>_Se muestra como porcentaje_ |
| **akamai.mpulse.clientroundtriptime.p50** <br>(gauge) | Percentil 50 del tiempo de ida y vuelta entre el navegador y el servidor edge de Akamai (el más cercano al usuario final)<br>_Se muestra como milisegundos_ |
| **akamai.mpulse.clientroundtriptime.p95** <br>(gauge) | Percentil 95 del tiempo de ida y vuelta entre el navegador y el servidor edge de Akamai (el más cercano al usuario final)<br>_Se muestra como milisegundos_ |
| **akamai.mpulse.dns.p50** <br>(gauge) | Percentil 50 del tiempo de resolución DNS<br>_Se muestra como milisegundos_ |
| **akamai.mpulse.dns.p95** <br>(gauge) | Percentil 95 del tiempo de resolución DNS<br>_Se muestra como milisegundos_ |
| **akamai.mpulse.domload.p50** <br>(gauge) | Percentil 50 de domLoading - navigationStart<br>_Se muestra como milisegundos_ |
| **akamai.mpulse.domload.p95** <br>(gauge) | Percentil 95 de domLoading - navigationStart<br>_Se muestra como milisegundos_ |
| **akamai.mpulse.domready.p50** <br>(gauge) | Percentil 50 de domComplete - navigationStart<br>_Se muestra como milisegundos_ |
| **akamai.mpulse.domready.p95** <br>(gauge) | Percentil 95 de domComplete - navigationStart<br>_Se muestra como milisegundos_ |
| **akamai.mpulse.firstbyte.p50** <br>(gauge) | Percentil 50 del tiempo transcurrido desde el inicio de la navegación hasta el primer byte<br>_Se muestra como milisegundos_ |
| **akamai.mpulse.firstbyte.p95** <br>(gauge) | Percentil 95 del tiempo transcurrido desde el inicio de la navegación hasta el primer byte<br>_Se muestra como milisegundos_ |
| **akamai.mpulse.firstcontentfulpaint.p50** <br>(gauge) | Percentil 50 del tiempo en el que el navegador muestra el contenido por primera vez<br>_Se muestra como milisegundos_ |
| **akamai.mpulse.firstcontentfulpaint.p95** <br>(gauge) | Percentil 95 del tiempo en el que el navegador muestra el contenido por primera vez<br>_Se muestra como milisegundos_ |
| **akamai.mpulse.firstinputdelay.p50** <br>(gauge) | Percentil 50 de la rapidez con la que la página fue capaz de responder a la primera interacción del usuario<br>_Se muestra como milisegundos_ |
| **akamai.mpulse.firstinputdelay.p95** <br>(gauge) | Percentil 95 de la rapidez con la que la página fue capaz de responder a la primera interacción del usuario<br>_Se muestra como milisegundos_ |
| **akamai.mpulse.firstlastbyte.p50** <br>(gauge) | Percentil 50 del tiempo transcurrido desde el primer byte de la carga (o cuando se considere que la página está lista)<br>_Se muestra como milisegundos_ |
| **akamai.mpulse.firstlastbyte.p95** <br>(gauge) | Percentil 95 del tiempo transcurrido desde el primer byte de la carga (o cuando se considere que la página está lista)<br>_Se muestra como milisegundos_ |
| **akamai.mpulse.firstpaint.p50** <br>(gauge) | Percentil 50 del tiempo en que el navegador renderizó por primera vez después de la navegación<br>_Se muestra como milisegundos_ |
| **akamai.mpulse.firstpaint.p95** <br>(gauge) | Percentil 95 del tiempo en que el navegador renderizó por primera vez después de la navegación<br>_Se muestra como milisegundos_ |
| **akamai.mpulse.longtaskstime.p50** <br>(gauge) | Percentil 50 de la suma de la cantidad de tiempo de LongTasks, que son tareas del navegador que tardan más de 50 ms<br>_Se muestra como milisegundos_ |
| **akamai.mpulse.longtaskstime.p95** <br>(gauge) | Percentil 95 de la suma de la cantidad de tiempo de LongTasks, que son tareas del navegador que tardan más de 50 ms<br>_Se muestra como milisegundos_ |
| **akamai.mpulse.pageload.p50** <br>(gauge) | Percentil 50 del tiempo de carga de la página<br>_Se muestra como milisegundos_ |
| **akamai.mpulse.pageload.p95** <br>(gauge) | Percentil 95 del tiempo de carga de la página<br>_Se muestra como milisegundos_ |
| **akamai.mpulse.pageviews** <br>(count) | Número de vistas de página<br>_Se muestra como vistas_ |
| **akamai.mpulse.sessions** <br>(count) | Número de sesiones de usuario<br>_Se muestra como sesión_ |
| **akamai.mpulse.ssl.p50** <br>(gauge) | Percentil 50 del tiempo de handshake SSL<br>_Se muestra como milisegundos_ |
| **akamai.mpulse.ssl.p95** <br>(gauge) | Percentil 95 del tiempo de handshake SSL<br>_Se muestra como milisegundos_ |
| **akamai.mpulse.tcp.p50** <br>(gauge) | Percentil 50 del tiempo de conexión TCP<br>_Se muestra como milisegundos_ |
| **akamai.mpulse.tcp.p95** <br>(gauge) | Percentil 95 del tiempo de conexión TCP<br>_Se muestra como milisegundos_ |
| **akamai.mpulse.timetofirstinteraction.p50** <br>(gauge) | Percentil 50 del tiempo en que el usuario intenta interactuar por primera vez con la página<br>_Se muestra como milisegundos_ |
| **akamai.mpulse.timetofirstinteraction.p95** <br>(gauge) | Percentil 95 del tiempo en que el usuario intenta interactuar por primera vez con la página<br>_Se muestra como milisegundos_ |
| **akamai.mpulse.timetointeractive.p50** <br>(gauge) | Percentil 50 del tiempo que el usuario interactúa con la página<br> _Se muestra como milisegundos_ |
| **akamai.mpulse.timetointeractive.p95** <br>(gauge) | Percentil 95 del tiempo que el usuario interactúa con la página<br> _Se muestra como milisegundos_ |
| **akamai.mpulse.timetovisuallyready.p50** <br>(gauge) | Percentil 50 del tiempo en que la vista de la página está lista para usar<br>_Se muestra como milisegundos_ |
| **akamai.mpulse.timetovisuallyready.p95** <br>(gauge) | Percentil 95 del tiempo en que la vista de la página está lista para usar<br>_Se muestra como milisegundos_ |

### Eventos

La integración de Akamai mPulse no incluye ningún evento.

### Checks de servicio

La integración de Akamai mPulse no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}