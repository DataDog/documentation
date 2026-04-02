---
app_id: lighthouse
categories:
- herramientas de desarrollo
custom_kind: integración
description: Estadísticas de auditoría de Google Lighthouse
integration_version: 2.2.0
media: []
supported_os:
- linux
title: Lighthouse
---
## Información general

Obtén métricas de [Google Chrome Lighthouse](https://developers.google.com/web/tools/lighthouse) en tiempo real para:

- Visualizar y monitorizar estadísticas de Lighthouse.
- Realizar un seguimiento y auditar las puntuaciones de accesibilidad de tus sitios web, las prácticas recomendadas, el rendimiento, las PWA y las puntuaciones de auditorías SEO.

## Configuración

El check de Lighthouse no está incluido en el paquete del [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest), por lo que necesitas instalarlo.

### Instalación

Para el Agent v7.21/v6.21 o posteriores, sigue las instrucciones a continuación para instalar el check de Lighthouse en tu host. Consulta el [uso de integraciones de la comunidad](https://docs.datadoghq.com/agent/guide/use-community-integrations/) para instalar con el Docker Agent o versiones anteriores del Agent.

1. Ejecuta el siguiente comando para instalar la integración del Agent:

   ```shell
   datadog-agent integration install -t datadog-lighthouse==<INTEGRATION_VERSION>
   ```

1. Configura tu integración de forma similar a las [integraciones] centrales (https://docs.datadoghq.com/getting_started/integrations/).

### Configuración

1. Edita el archivo `lighthouse.d/conf.yaml`, en la carpeta `conf.d/` en la raíz de tu [directorio de configuración del Agent](https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory) para empezar a recopilar tus [métricas](#metrics) de Lighthouse.
   Consulta el [ejemplo de lighthouse.d/conf.yaml](https://github.com/DataDog/integrations-extras/blob/master/lighthouse/datadog_checks/lighthouse/data/conf.yaml.example) para conocer todas las opciones de configuración disponibles.

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent)

### Requisitos

1. Node.js LTS (8.9 o posterior).

   - Verifica si Node.js y npm están instalados:

   ```shell
   node -v
   npm -v
   ```

   - Si no, [instala Node.js y npm](https://nodejs.org/en/download).

1. [Lighthouse](https://github.com/GoogleChrome/lighthouse):

   - Verifica si está instalado.

   ```shell
   # example
   root@hostname:~# npm list -g --depth=0 | grep 'lighthouse'
   |_ lighthouse@5.6.0
   ```

   - Si no lo está, instálalo (no hay resultado del comando anterior):

   ```shell
   npm install -g lighthouse
   ```

1. Google Chrome/Chromium o Puppeteer.

   - [Chromium](https://www.chromium.org/)

     - Debian/Ubuntu

     ```shell
     sudo apt-get update
     sudo apt-get install -y chromium-browser
     ```

     - RHEL/CentOS

     ```shell
     sudo yum install -y epel-release
     sudo yum install -y chromium
     ```

     **Nota**: Esta integración ejecuta Chrome/Chromium en modo headless. Chrome/Chromium puede requerir kernel 4.4 o posterior en RHEL/CentOS para que el modo headless funcione correctamente.

   - [Puppeteer](https://github.com/GoogleChrome/puppeteer)

     - Verifica si está instalado.

     ```shell
     # example
     root@hostname:~# npm list -g --depth=0 | grep 'puppeteer'
     |_ puppeteer@1.12.2
     ```

     - Si no lo está, instálalo (no hay resultado del comando anterior):

     ```shell
     npm install -g puppeteer --unsafe-perm=true
     ```

1. Verifica si el usuario `dd-agent` puede ejecutar la CLI de Lighthouse.

   ```shell
   sudo -u dd-agent lighthouse <WEB_URL> --output json --quiet --chrome-flags='--headless'
   ```

### Validación

[Ejecuta el subcomando de estado del Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `lighthouse` en la sección Checks.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **lighthouse.accessibility** <br>(gauge) | Puntuación de la accesibilidad de Google Chrome Lighthouse<br>_Se muestra como porcentaje_ |
| **lighthouse.best_practices** <br>(gauge) | Puntuación de las prácticas recomendadas de Google Chrome Lighthouse<br>_Se muestra como porcentaje_ |
| **lighthouse.performance** <br>(gauge) | Puntuación del rendimiento de Google Chrome Lighthouse<br>_Se muestra como porcentaje_ |
| **lighthouse.pwa** <br>(gauge) | Puntuación de la aplicación web progresiva (PWA) de Google Chrome Lighthouse<br>_Se muestra como porcentaje_ |
| **lighthouse.seo** <br>(gauge) | Puntuación de la optimización para motores de búsqueda (SEO) de Google Chrome Lighthouse<br>_Se muestra como porcentaje_ |
| **lighthouse.largest_contentful_paint** <br>(gauge) | Largest Contentful Paint marca el momento en el que se pinta el texto o la imagen más grande.<br>_Se muestra como milisegundo_ |
| **lighthouse.first_contentful_paint** <br>(gauge) | First Contentful Paint marca el momento en que se pinta el primer texto o imagen.<br>_Se muestra como milisegundo_ |
| **lighthouse.cumulative_layout_shift** <br>(gauge) | Cumulative Layout Shift mide el movimiento de los elementos visibles dentro de la ventana gráfica.<br>_Se muestra como unidad_ |
| **lighthouse.max_potential_fid** <br>(gauge) | El máximo retraso potencial en la primera entrada que podrían experimentar los usuarios es la duración de la tarea más larga.<br>_Se muestra como milisegundo_ |
| **lighthouse.time_to_interactive** <br>(gauge) | El tiempo de interactividad es el tiempo que tarda la página en ser totalmente interactiva.<br>_Se muestra como milisegundo_ |
| **lighthouse.mainthread_work_breakdown** <br>(gauge) | Considera la posibilidad de reducir el tiempo dedicado a analizar, compilar y ejecutar JS. Es posible que la entrega de cargas útiles JS más pequeñas te ayude a conseguirlo.<br>_Se muestra como milisegundo_ |
| **lighthouse.unused_javascript** <br>(gauge) | Reduce el JavaScript no utilizado y aplaza la carga de scripts hasta que sean necesarios para disminuir los bytes consumidos por la actividad de red.<br>_Se muestra como milisegundo_ |
| **lighthouse.unused_css_rules** <br>(gauge) | Reduce las reglas no utilizadas de las hojas de estilo y aplaza las hojas de estilo en cascada (CSS) que no se utilicen para el contenido por encima del pliegue para disminuir los bytes consumidos por la actividad de red.<br>_Se muestra como milisegundo_ |
| **lighthouse.modern_image_formats** <br>(gauge) | Los formatos de imagen como WebP y AVIF suelen ofrecer una mejor compresión que PNG o JPEG, lo que se traduce en descargas más rápidas y un menor consumo de datos.<br>_Se muestra como milisegundo_ |
| **lighthouse.uses_optimized_images** <br>(gauge) | Las imágenes optimizadas se cargan más rápido y consumen menos datos móviles.<br>_Se muestra como milisegundo_ |
| **lighthouse.render_blocking_resources** <br>(gauge) | Los recursos están bloqueando la primera pintura de tu página. Considera entregar JS/CSS críticos en línea y diferir todos los JS/estilos no críticos.<br>_Se muestra como milisegundo_ |
| **lighthouse.bootup_time** <br>(gauge) | Considera la posibilidad de reducir el tiempo dedicado a analizar, compilar y ejecutar JS. Es posible que la entrega de cargas útiles JS más pequeñas te ayude a conseguirlo.<br>_Se muestra como milisegundo_ |
| **lighthouse.server_response_time** <br>(gauge) | Mantén reducido el tiempo de respuesta del servidor al documento principal porque todas las demás solicitudes dependen de él.<br>_Se muestra como milisegundo_ |
| **lighthouse.speed_index** <br>(gauge) | Número de milisegundos que tarda en poblarse visiblemente el contenido de una página.<br>_Se muestra como milisegundo_ |
| **lighthouse.dom_size** <br>(gauge) | Tamaño actual del DOM. Un DOM grande aumentará el uso de memoria, causará cálculos de estilo más largos y producirá costosos reflujos de diseño.|
| **lighthouse.total_blocking_time** <br>(gauge) | Suma de todos los periodos de tiempo entre FCP y Time to Interactive en los que la duración de la tarea superó los 50 ms expresada en milisegundos.<br>_Se muestra como milisegundo_ |

### Eventos

La integración de Lighthouse no incluye eventos.

### Checks de servicio

La integración de Lighthouse no incluye checks de servicios.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).