---
description: Aprenda a hacer un seguimiento de las aplicaciones de escritorio creadas
  con Electron a través del SDK de RUM para navegador.
further_reading:
- link: /real_user_monitoring/
  tag: Documentación
  text: Obtenga más información sobre Real User Monitoring
title: Haga un seguimiento de las aplicaciones de Electron mediante el SDK del navegador
---
<div class="alert alert-info">Para hacer un seguimiento tanto del proceso principal como de los procesos de renderizado, utilice el SDK de Electron en su lugar. Consulte <a href="/real_user_monitoring/application_monitoring/electron/">Monitoreo de Electron</a>.</div>

## Descripción general {#overview}

[Electron][1] es un framework de código abierto que se puede utilizar para crear aplicaciones de escritorio multiplataforma para macOS y Windows.

Puede instalar y configurar el SDK de navegador de Datadog para comenzar a hacer un seguimiento de las aplicaciones creadas con Electron.

**Nota**: El SDK de navegador solo permite hacer un seguimiento de los *procesos de renderizado* de una aplicación. No inicializa ni hace un seguimiento de nada instalado en el *proceso principal*. Para obtener más información, consulte la documentación de Electron sobre su [proceso de renderizado][3].

{{< img src="real_user_monitoring/guide/monitor-electron-applications-using-browser-sdk/diagram_electron-js-browser-rum.png" alt="El SDK de navegador de Datadog solo permite hacer un seguimiento de los procesos de renderizado de una aplicación de Electron" style="width:100%" >}}

## Instalación {#installation}

Para instalar el SDK de navegador de Datadog para admitir aplicaciones de Electron:

1. Configure e instale [RUM Browser Monitoring][2] dentro de **cada proceso de renderizado**, siguiendo los pasos para CDN sync, CDN async o npm.

2. Establezca el parámetro `sessionPersistence` en `"local-storage"` en la configuración de inicialización de RUM de cada proceso de renderizado, como se muestra a continuación. 

   **Nota**: Esta configuración permite a Datadog recopilar datos de RUM sin depender de las cookies del navegador.
   
   - Si se dirige a páginas **disponibles en internet** (utilizando el protocolo `https://`), **no** necesita este parámetro.
   - Si está integrando páginas **dentro de su aplicación** (utilizando el protocolo `file://`), Datadog necesita almacenar las sesiones en el almacenamiento local, ya que las cookies no están disponibles. 

   ```javascript
   datadogRum.init({
     applicationId: '<DATADOG_APPLICATION_ID>',
     clientToken: '<DATADOG_CLIENT_TOKEN>',
     site: '<DATADOG_SITE>',
     ...
     sessionPersistence: "local-storage"
     });
   ```
 
3. Una vez que haya configurado correctamente el SDK, sus datos aparecerán en el [RUM Explorer][4].

## Solución de problemas {#troubleshooting}

### Soporte para aplicaciones híbridas de Electron {#support-for-hybrid-electron-applications}
La política del mismo origen impide hacer un seguimiento de una aplicación en una misma sesión si se cargan páginas tanto de origen local (`file://`) como remoto (`http(s)://`).

Esto significa que una aplicación que utiliza Electron para integrar una página de inicio y luego redirige al usuario a un sitio web alojado en Internet crea dos sesiones para ese usuario: una para la página de inicio de la aplicación, integrada mediante archivos locales (`file://`), y otra para la parte remota (`https://` archivos disponibles en Internet).
   **Nota**: Las trazas de pila sin minificar no están disponibles cuando se hace un seguimiento de aplicaciones de Electron que cargan archivos locales integrados y cuyas trazas de pila comienzan con `file://`. Para obtener trazas de pila sin minificar en este escenario, debe sobrescribirlas manualmente mediante la [`beforeSend()` función de devolución de llamada][5]. Para obtener más asistencia, comuníquese con el [equipo de soporte de Datadog][6].

### Sesiones de corta duración para instancias con varias ventanas a la vez {#short-lived-sessions-for-instances-with-multiple-windows-at-once}
Un problema con la latencia de replicación del almacenamiento local entre ventanas puede causar que se cree una sesión de corta duración (<1 segundo). Para solucionar esto, asegúrese de que se creen e inicialicen varias ventanas con un intervalo de más de 10 ms.

## Lecturas adicionales {#further-reading}
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.electronjs.org/
[2]: /es/real_user_monitoring/application_monitoring/browser/setup/
[3]: https://www.electronjs.org/docs/latest/tutorial/process-model#the-renderer-process
[4]: /es/real_user_monitoring/explorer/
[5]: /es/real_user_monitoring/application_monitoring/browser/advanced_configuration/?tab=npm#enrich-and-control-rum-data
[6]: https://docs.datadoghq.com/es/help/