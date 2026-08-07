---
description: Guía para la monitorización de aplicaciones Next.js con RUM.
further_reading:
- link: /monitors/create/types/real_user_monitoring/
  tag: Documentación
  text: Más información sobre monitores RUM
title: Monitorizar tu aplicación Next.js con RUM
---

## Información general

[Next.js][1] es un marco de JavaScript creado por [Vercel][8] que se utiliza para crear páginas web React.js y APIs Node.js. Puedes integrar Next.js con RUM para monitorizar tus aplicaciones frontend y backend para las métricas relacionadas con el navegador que te dan una visión del rendimiento y el comportamiento del usuario.

## Configuración

Sigue los pasos que se indican a continuación para configurar la monitorización de navegador de Datadog RUM.

### Crear una aplicación

1. Ve a **[Digital Experience > Performance Summary][2]**. (Experiencia digital > Resumen de rendimiento).
2. Haz clic en el botón **New Application** (Nueva aplicación).
3. Asegúrate de que JS está seleccionado, introduce un nombre para tu aplicación y haz clic en **Create New RUM Application** (Crear nueva aplicación RUM). `clientToken` y `applicationId` se generan automáticamente para tu aplicación.

<div class="alert alert-info">Cuando se utiliza `.env.local`, solo las variables prefijadas con `NEXT_PUBLIC_` se incluyen en el paquete del cliente. Consulta <a href="https://nextjs.org/docs/pages/building-your-application/configuring/environment-variables#bundling-environment-variables-for-the-browser" target="_blank">Agrupación de variables de entorno para el navegador</a> en la documentación de Next.js.</div>

### Instrumentar la solicitud

1. Elige tu tipo de instrumentación y, a continuación, copia y pega el fragmento de código de la interfaz de usuario de Datadog RUM en el archivo correspondiente en función del tipo de instrumentación.

   {{< tabs >}}
   {{% tab "npm" %}}

   Si utilizas npm, deberás realizar unos pequeños cambios en el fragmento de código de la interfaz de usuario de Datadog RUM antes de pegarlo en el archivo raíz `layout.tsx` o en el archivo personalizado `_app.tsx` (Datadog admite ambos):

   - Si tu aplicación depende del **nuevo** [enrutador de aplicación][1] de Next.js (versiones 13+), Datadog recomienda usar la instrumentación de CDN RUM para asegurar que la inicialización de RUM ocurre en el cliente. Si deseas utilizar el paquete npm, el código de inicialización debe ejecutarse en un [componente de cliente][5] para que RUM pueda recopilar telemetría del cliente. Puedes lograr esto sin hacer que tu archivo [`layout.tsx`][2] sea en sí mismo un componente de cliente, siguiendo este ejemplo para crear un componente `<DatadogInit />` vacío con el código de inicialización de RUM, y luego renderizando ese componente `<DatadogInit />` en tu `layout.tsx`.
   - Si tu aplicación Next.js depende del [enrutador de página][3] de Next.js **más antiguo**, puedes pegar el fragmento de inicialización en el archivo personalizado [`_app.tsx`][4] sin la directiva `"use client"` y sin un componente `<DatadogInit />` independiente.

   {{< code-block lang="javascript" filename="datadog-init.tsx" disable_copy="false" collapsible="true" >}}
   // Obligatorio si se utiliza App Router para asegurar que este archivo se ejecuta en el cliente
   "use client";

    import { datadogRum } from "@datadog/browser-rum";

    datadogRum.init({
      applicationId: "<YOUR_APPLICATION_ID>",
      clientToken: "<CLIENT_TOKEN>",
      site: "datadoghq.com",
      service: "<SERVICE_NAME>",
      env: "<ENV_NAME>",
      // Especifica un número de versión para identificar la versión desplegada de tu aplicación en Datadog
      // version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 20,
      trackUserInteractions: true,
      trackResources: true,
      trackLongTasks: true,
      defaultPrivacyLevel: "mask-user-input",
      // Especificar URL para propagar cabeceras de trazas (traces) para la conexión entre RUM y traza de backend
      allowedTracingUrls: [
        { match: "https://example.com/api/", propagatorTypes: ["tracecontext"] },
      ],
    });

    export default function DatadogInit() {
      // No renderizar nada; este componente solo se incluye para que el código init
      // anterior se ejecute en el lado del cliente
      return null;
    }
   {{< /code-block >}}

   {{< code-block lang="javascript" filename="layout.tsx or _app.tsx" disable_copy="false" collapsible="true" >}}
    import DatadogInit from "@/components/datadog-init";

    export default function RootLayout({
      children,
    }: {
      children: React.ReactNode;
    }) {
      return (
        <html lang="en">
          <body>
            <DatadogInit />
            {children}
          </body>
        </html>
      );
    }

   {{< /code-block >}}

   [1]: https://nextjs.org/docs/app
   [2]: https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#root-layout-required
   [3]: https://nextjs.org/docs/pages
   [4]: https://nextjs.org/docs/pages/building-your-application/routing/custom-app#usage
   [5]: https://nextjs.org/docs/app/building-your-application/rendering/client-components#using-client-components-in-nextjs

   {{% /tab %}}
   {{% tab "CDN asíncrona" %}}

Si utilizas CDN asíncrona, deberás realizar unos pequeños cambios en el fragmento de código de la interfaz de usuario de Datadog RUM antes de pegarlo en el archivo raíz `layout.tsx` o en el archivo personalizado `_app.tsx` (Datadog admite ambos):

   - Si tu aplicación depende del [enrutador de aplicación][1] **nuevo** de Next.js (versiones 13+), pega el fragmento en el archivo raíz [`layout.tsx`][2].
   - Si tu aplicación de Next.js depende del [enrutador de página][3] **más antiguo** de Next.js, pega el fragmento en el archivo personalizado [`_app.tsx`][4].
   - Los scripts externos de Next.js necesitan ser cargados como en [esta página][5].

   **Nota**: Los scripts de Next.js incluyen líneas de importación y exportación, e incluyen llaves y puntos suspensivos entre `Script id`, donde todas las instancias de `Script` están en mayúsculas.

   {{< code-block lang="javascript" filename="layout.tsx or _app.tsx" disable_copy="false" collapsible="true" >}}

   import Script from "next/script";

   export default function RootLayout({
     children,
   }: {
     children: React.ReactNode;
   }) {
     return (
       <html lang="en">
         <Script id="datadog-rum">
           {`
             (function(h,o,u,n,d) {
               h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
               d=o.createElement(u);d.async=1;d.src=n
               n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
             })(window,document,'script','https://www.datadoghq-browser-agent.com/us1/v6/datadog-rum.js','DD_RUM')
             window.DD_RUM.onReady(function() {
               window.DD_RUM.init({
                 clientToken: '<CLIENT_TOKEN>',
                 applicationId: '<YOUR_APPLICATION_ID>',
                 site: 'datadoghq.com',
                 service: 'next-app-router-rum',
                 env: '<ENV_NAME>',
                 // Especificar un número de versión para identificar la versión desplegada de tu aplicación en Datadog
                 // versión: '1.0.0',
                 sessionSampleRate: 100,
                 sessionReplaySampleRate: 100,
               });
             })
           `}
         </Script>
         <body>{children}</body>
       </html>
     );
   }

   {{< /code-block >}}

   [1]: https://nextjs.org/docs/app
   [2]: https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#root-layout-required
   [3]: https://nextjs.org/docs/pages
   [4]: https://nextjs.org/docs/pages/building-your-application/routing/custom-app#usage
   [5]: https://nextjs.org/docs/messages/next-script-for-ga#using-analyticsjs-legacy

   {{% /tab %}}
   {{% tab "CDN síncrono" %}}

Si utilizas CDN síncrona, deberás realizar unos pequeños cambios en el fragmento de código de la interfaz de usuario de Datadog RUM antes de pegarlo en el archivo raíz `layout.tsx` o en el archivo personalizado `_app.tsx` (Datadog admite ambos):

   - Si tu aplicación depende del [enrutador de aplicación][1] **nuevo** de Next.js (versiones 13+), pega el fragmento en el archivo raíz [`layout.tsx`][2].
   - Si tu aplicación de Next.js depende del [enrutador de página][3] **más antiguo** de Next.js, pega el fragmento en el archivo personalizado [`_app.tsx`][4].
   - Los scripts externos de Next.js necesitan ser cargados como en [esta página][5].

   **Nota**: Los scripts de Next.js incluyen líneas de importación y exportación, e incluyen llaves y puntos suspensivos entre `Script id`, donde todas las instancias de `Script` están en mayúsculas.

   {{< code-block lang="javascript" filename="layout.tsx or _app.tsx" disable_copy="false" collapsible="true" >}}

   import Script from "next/script";

   export default function RootLayout({
     children,
   }: {
     children: React.ReactNode;
   }) {
     return (
       <html lang="en">
         <body>
           <Script
             id="dd-rum-sync"
             src="https://www.datadoghq-browser-agent.com/us1/v6/datadog-rum.js"
             type="text/javascript"
             strategy="beforeInteractive"
           />
           <Script id="datadog-rum">
             {`
               window.DD_RUM && window.DD_RUM.init({
                 clientToken: '<CLIENT_TOKEN>',
                 applicationId: '<YOUR_APPLICATION_ID>',
                 site: 'datadoghq.com',
                 service: 'rum-cdn-async',
                 env: '<ENV_NAME>',
                 // Especificar un número de versión para identificar la versión desplegada de tu aplicación en Datadog
                 // versión: '1.0.0',
                 sessionSampleRate: 100,
                 sessionReplaySampleRate: 100,
               });
             `}
           </Script>
           {children}
         </body>
       </html>
     );
   }

   {{< /code-block >}}

   [1]: https://nextjs.org/docs/app
   [2]: https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#root-layout-required
   [3]: https://nextjs.org/docs/pages
   [4]: https://nextjs.org/docs/pages/building-your-application/routing/custom-app#usage
   [5]: https://nextjs.org/docs/messages/next-script-for-ga#using-analyticsjs-legacy

   {{% /tab %}}
   {{< /tabs >}}

3. Sigue los pasos dentro de la aplicación para verificar la instalación.
4. Despliega los cambios en tu aplicación. Una vez activado el despliegue, Datadog recopilará eventos de los navegadores de tus usuarios.
5. Puedes visualizar los [datos recopilados][3] en tu aplicación Next.js utilizando [dashboards][4].

## Monitorización de backend

Para iniciar la monitorización del backend de tus aplicaciones Next.js:

1. Sigue los pasos de configuración del navegador para [conectar RUM y trazas][6].
2. Sigue los pasos de configuración del navegador para [soporte de OpenTelemetry][7] para conectarse con APM.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://nextjs.org/
[2]: https://app.datadoghq.com/rum/performance-monitoring?_gl=1*il22i*_gcl_aw*R0NMLjE2OTAzMDM5MzcuQ2owS0NRanc1ZjJsQmhDa0FSSXNBSGVUdmxqb3ZQX1YyMFRsV1o1UlJLVHNUNHNITll2ZEJ0bTZONnlxdVM1X3lzY2NOejE4QzVON1ktOGFBcHpYRUFMd193Y0I.*_gcl_au*MjMxOTI4ODMzLjE2OTAyMjI1NTA.*_ga*MTIwMTk2NTA5Ny4xNjY2NzEzMjY2*_ga_KN80RDFSQK*MTY5MTc5ODE4OS4xMzYuMS4xNjkxNzk4NTQyLjAuMC4w*_fplc*RnA3SEVTb1BoTG9ndDI0OFQ5TERxRWRtMjNwTWVrTWZ3VGNGeWRaYm9HRkpJSXBxVHdVdFNTcURCWW1rZENHUldmU2EyTzhtZ3NXVzRUR0JUTzRnSGdPeGRkVVpWYVA5V0x4JTJGeTFRNWo5djNqYmNwQnJpckdHUU93M08xU3clM0QlM0Q
[3]: /es/real_user_monitoring/browser/data_collected/
[4]: /es/real_user_monitoring/platform/dashboards/
[5]: https://nextjs.org/docs/messages/next-script-for-ga#using-analyticsjs-legacy
[6]: /es/real_user_monitoring/correlate_with_other_telemetry/apm/?tab=browserrum#setup-rum
[7]: /es/real_user_monitoring/correlate_with_other_telemetry/apm/?tab=browserrum#opentelemetry-support
[8]: https://vercel.com