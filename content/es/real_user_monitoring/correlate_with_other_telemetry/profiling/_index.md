---
further_reading:
- link: https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/
  tag: Blog
  text: Real User Monitoring
- link: https://www.datadoghq.com/blog/modern-frontend-monitoring/
  tag: Blog
  text: Para empezar a monitorizar aplicaciones de una sola página
- link: /tracing/
  tag: Documentación
  text: APM y rastreo distribuido
title: Correlacionar RUM y perfiles
---
{{< callout url="https://www.datadoghq.com/product-preview/browser-profiler/" btn_hidden="false" header="Join the Preview!" >}}
Browser Profiling está en Vista previa.
{{< /callout >}}

{{< img src="real_user_monitoring/browser/optimizing_performance/browser_profiler.png" alt="Ejemplo de perfil de navegador cuando se analiza un ejemplo de evento." style="width:100%;" >}}

## Información general

La creación de perfiles de navegador proporciona visibilidad sobre cómo se comporta tu aplicación en los navegadores de tus usuarios, ayudándote a comprender las causas de fondo de las aplicaciones que no responden (tanto si la falta de respuesta se produce en la carga de la page (página), como si se produce más adelante en el ciclo de vida de la page (página)). El uso de datos de perfiles junto con la información de RUM te permite ver qué código se ejecuta durante un [fotograma de animación largo (LoAF)][1], comprendiendo cómo la ejecución de JavaScript y las tareas de representación afectan al rendimiento percibido por el usuario.

Para empezar, asegúrate de que la creación de perfiles del navegador está activada en la configuración del SDK de RUM. Cuando la creación de perfiles del navegador está activada, puedes hacer clic en una muestra de evento perfilado para ver una sección de perfil.

## Utilización

### Configuración de RUM
1. Configura [Monitorización del navegador RUM][2].

2. Inicializa el SDK RUM y configura `profilingSampleRate`, que establece el porcentaje de navegaciones de la page (página) que se perfilan.
    ```javascript
    import { datadogRum } from '@datadog/browser-rum'

    datadogRum.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      site: 'datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      profilingSampleRate: 100,
      trackLongTasks: true,
      trackUserInteractions: true,
    })
    ```

3. Configura tus servidores web para servir páginas HTML con el encabezado de respuesta HTTP `Document-Policy: js-profiling`:
    ```javascript
        app.get("/", (request, response) => {
            ... 
            response.set("Document-Policy", "js-profiling");
            ...
        });
    ```

4. Configura Cross-Origin Resource Sharing (CORS) si es necesario.

    Este step (UI) / paso (generic) sólo es necesario si tus archivos JavaScript se sirven desde un origen diferente. Por ejemplo, un documento HTML se sirve desde `cdn.com` y los archivos JavaScript se sirven desde `static.cdn.com`. En este caso, debes activar CORS; si no lo haces, tus archivos JavaScript serán invisibles para el perfilador. En forma predeterminada, tu navegador carga JavaScript en modo `no-cors`. Para obtener más información, consulta la sección [Perfiles del navegador y CORS](#cors).

    Para activar CORS:

    - Añade un atributo `crossorigin="anonymous"` a las tags (etiquetas) `<script/>` 
    - Asegúrate de que la respuesta JavaScript incluya el encabezado HTTP `Access-Control-Allow-Origin: *` (o el valor de origen correcto)

       ```javascript
       app.get("/", (request, response) => {
           ... 
           response.header("Access-Control-Allow-Origin", "*");
           response.header("Access-Control-Allow-Headers",
           ...
       });
       ```

{{% collapse-content title="Browser profiling and CORS" level="h4" expanded=false id="cors" %}}
#### ¿Por qué tendría que configurar CORS?

Para que la información sobre la ejecución o la atribución de un script aparezca en las entradas de rendimiento (y, por tanto, se capture en el perfil del navegador), el recurso (por ejemplo, un archivo JavaScript) debe obtenerse con encabezados CORS que permitan explícitamente que se comparta con el origen que realiza la medición (tu aplicación).

Resumiendo:

- Si un script se carga desde un mismo source (fuente) de origen, entonces se permite la atribución y puedes ver los datos de perfil atribuidos a este script.
- Si un script se carga a través del origen _sin_ una política CORS permisiva (como `Access-Control-Allow-Origin` que permite el origen de la page (página) ), entonces se bloquea la atribución y no se ven los datos de perfil atribuidos a este script.

Esta política CORS garantiza que sólo los scripts explícitamente destinados a ser perfilados por otros orígenes puedan ser perfilados.

#### ¿Qué relación hay entre CORS y la elaboración de perfiles de navegador?

Cuando se inicia el perfilador del navegador de Datadog (que utiliza la [API de autoperfilado de JS][3]), el perfilador puede capturar traces (trazas) de stack tecnológico de la ejecución de JavaScript, pero sólo incluye la _atribución_ (nombres de funciones, URL, etc.) de los siguientes scripts:

- Scripts que tienen el mismo origen que la page (página) que inicia el perfilado
- Scripts cross-origin que optan explícitamente por el uso de CORS

Esto protege el contenido de terceros y a los usuarios de la filtración de detalles de ejecución a través de los límites de seguridad.

#### ¿Por qué es necesario el atributo crossorigin="anonymous"?

Sin el atributo `crossorigin="anonymous"`, el navegador no realiza una solicitud activada por CORS para el script. El navegador obtiene el script sin CORS, es decir:

- No se aplica la política CORS.
- No se envían credenciales (cookies,  autorizaciones HTTP, etc.).
- El script recuperado no cumple con los requisitos para una atribución detallada en entradas de rendimiento ni traces (trazas) de stack tecnológico. Estos marcos de stack tecnológico se muestran como "(anonymous)" o sin atribución.

Para proteger la privacidad de las secuencias de comandos de origen cruzado, _ambas_ partes deben estar de acuerdo en compartir la información:
- la page (página) debe solicitar explícitamente una búsqueda habilitada para CORS, con `crossorigin="anonymous"`.
- El servidor debe permitirlo, con un encabezado `Access-Control-Allow-Origin` en la respuesta.

Un script cumple los requisitos para la atribución en la API de autoperfilado JS sólo cuando se cumplen las dos condiciones anteriores.

{{% /collapse-content %}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/real_user_monitoring/guide/browser-sdk-upgrade/#collect-long-animation-frames-as-long-tasks
[2]: /es/real_user_monitoring/browser/setup/
[3]: https://developer.mozilla.org/en-US/docs/Web/API/JS_Self-Profiling_API