---
description: Aprende cómo monitorizar aplicaciones multiplataforma creadas con Capacitor
  a través del SDK RUM del navegador.
further_reading:
- link: /real_user_monitoring/
  tag: Documentación
  text: Más información sobre Real User Monitoring
title: Monitorizar aplicaciones Capacitor con el SDK del navegador
---

## Información general

[Capacitor][1] es un tiempo de ejecución nativo de código abierto para crear aplicaciones web nativas que se ejecutan de forma nativa en iOS, Android y aplicaciones web progresivas con JavaScript, HTML y CSS.

Puedes instalar y configurar el SDK del navegador Datadog para empezar a monitorizar las aplicaciones que creaste con Capacitor. La configuración te proporciona visibilidad de la porción JavaScript de tu aplicación (excluye la visibilidad de la aplicación nativa).

**Nota**: Las aplicaciones envueltas por Capacitor para ejecutar un objetivo **iOS** utilizan `capacitor://` como esquema por defecto para servir recursos locales.

## Instalación

Para instalar el SDK del navegador Datadog para que sea compatible con las aplicaciones Capacitor:

1. Configura e instala la [monitorización del navegador RUM][3], siguiendo los pasos para CDN sínc., CDN asínc. o npm.
2. Configura el parámetro `sessionPersistence` como `"local-storage"` en la configuración de inicialización de RUM.

   **Nota**: Esta configuración permite a Datadog recopilar datos RUM sin depender de las cookies del navegador.

   ```javascript
   datadogRum.init({
     applicationId: '<DATADOG_APPLICATION_ID>',
     clientToken: '<DATADOG_CLIENT_TOKEN>',
     site: '<DATADOG_SITE>',
     ...
     sessionPersistence: "local-storage"
   });
   ```

3. Una vez que hayas configurado el SDK correctamente, tus datos rellenarán el [Explorador RUM][3].

## Solucionar problemas

### Sólo tengo visibilidad de la porción JavaScript de mi aplicación, pero no de la porción nativa

Este es el comportamiento esperado. La porción nativa de una aplicación Capacitor, ya sea mediante el uso de complementos o código personalizado, no se monitoriza. Por lo general, los complementos envían un estado de respuesta que puede ser rastreado desde el lado JavaScript de la aplicación. Sin embargo, si un complemento se bloquea o si toda la aplicación se bloquea debido a problemas de código nativo, esto no se informa a Datadog.

### ¿Por qué no puedo hacer un seguimiento de las aplicaciones Capacitor híbridas que apuntan tanto a recursos locales como remotos?

La política de igual origen impide el seguimiento (utilizando la misma sesión) de una aplicación que carga páginas tanto locales (`capacitor://`) como remotas (`http(s)://`).

Esto significa que cualquier aplicación que utilice Capacitor para integrar una página de inicio y luego redirija al usuario a un sitio web alojado en Internet, puede ver **dos** sesiones creadas para ese usuario:

- Uno para la porción de inicio (integrada) de la aplicación
- Uno para la porción remota de la aplicación

## Referencias adicionales
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://capacitorjs.com/
[2]: /es/real_user_monitoring/browser/setup/
[3]: /es/real_user_monitoring/explorer/