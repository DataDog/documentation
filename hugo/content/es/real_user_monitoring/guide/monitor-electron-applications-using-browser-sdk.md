---
description: Aprende cómo monitorizar aplicaciones de escritorio creadas con Electron
  a través del SDK RUM del Navegador.
further_reading:
- link: /real_user_monitoring/
  tag: Documentación
  text: Más información sobre Real User Monitoring
title: Monitorización de aplicaciones Electron con el SDK del Navegador
---

## Información general

[Electron][1] es un marco de código abierto que puede utilizarse para crear aplicaciones de escritorio multiplataforma para macOS y Windows.

Puedes instalar y configurar el SDK del navegador Datadog para iniciar aplicaciones de monitorización creadas con Electron.

**Nota**: El SDK del navegador sólo admite la monitorización de *procesos de renderizado* de una aplicación. No inicializa o monitoriza nada instalado en el *proceso principal*. Para obtener más información, consulta la documentación del [proceso de renderizado][3] de Electron.

{{< img src="real_user_monitoring/guide/monitor-electron-applications-using-browser-sdk/diagram_electron-js-browser-rum.png" alt="El SDK del navegador Datadog sólo admite la monitorización de procesos de renderizado de una aplicación Electron" style="width:100%" >}}

## Instalación

Para instalar el SDK del navegador Datadog para que sea compatible con aplicaciones Electron:

1. Configura e instala la [monitorización del Navegador RUM][2] dentro de **cada proceso de renderizado**, siguiendo los pasos para CDN sínc, CDN asínc, o NPM.

2. Configura el parámetro `sessionPersistence` como `"local-storage"` en la configuración de la inicialización de RUM de cada proceso de renderizado, como se muestra a continuación.

   **Nota**: Esta configuración permite a Datadog recopilar datos RUM sin depender de las cookies del navegador.

   - Si tu objetivo son páginas **disponibles en Internet** (mediante el protocolo `https://`), **no** necesitas este parámetro.
   - Si está integrando páginas **dentro de tu aplicación** (utilizando el protocolo `file://`), Datadog necesita almacenar las sesiones de forma local, ya que las cookies no están disponibles. 

   ```javascript
   datadogRum.init({
     applicationId: '<DATADOG_APPLICATION_ID>',
     clientToken: '<DATADOG_CLIENT_TOKEN>',
     site: '<DATADOG_SITE>',
     ...
     sessionPersistence: "local-storage"
     });
   ```

3. Una vez que hayas configurado el SDK correctamente, tus datos rellenarán el [Explorador RUM][4].

## Solucionar problemas

### Soporte para aplicaciones Electron híbridas
La política del mismo origen impide el seguimiento de una aplicación en una misma sesión en la que las páginas se cargan tanto de forma local (`file://`) como remota (`http(s)://`).

Esto significa que una aplicación que utiliza Electron para integrar una página de inicio y más tarde redirige al usuario a un sitio web alojado en Internet resulta en la creación de dos sesiones para ese usuario: una para la parte de inicio de los archivos locales incrustados (`file://`) de la aplicación y otra para la parte remota (archivos `https://` disponibles en Internet).
   **Nota**: Las trazas (traces) de stack tecnológico sin minificar no están disponibles cuando se monitorizan aplicaciones Electron que cargan archivos locales incrustados donde las trazas de stack tecnológico comienzan con `file://`. Para obtener trazas de stack tecnológico sin minificar en este escenario, debes sobrescribirlas manualmente utilizando la [callback `beforeSend()`][5]. Para obtener más ayuda, ponte en contacto con el [equipo de asistencia de Datadog][6].

### Sesiones de corta duración para instancias con varias ventanas activas a la vez
Un problema con la latencia de replicación del almacenamiento local entre ventanas puede provocar la creación de una sesión de corta duración (menos de 1 segundo). Para solucionar este problema, asegúrate de que se crean e inicializan varias ventanas con un intervalo de más de 10 ms.

## Referencias adicionales
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.electronjs.org/
[2]: /es/real_user_monitoring/browser/setup/
[3]: https://www.electronjs.org/docs/latest/tutorial/process-model#the-renderer-process
[4]: /es/real_user_monitoring/explorer/
[5]: /es/real_user_monitoring/browser/advanced_configuration/?tab=npm#enrich-and-control-rum-data
[6]: https://docs.datadoghq.com/es/help/