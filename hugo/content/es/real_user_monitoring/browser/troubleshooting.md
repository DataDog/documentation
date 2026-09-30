---
description: Solucionar problemas comunes con el SDK de RUM Browser incluyendo datos
  perdidos, bloqueadores de anuncios, restricciones de red y problemas de configuración.
further_reading:
- link: https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/
  tag: Blog
  text: Real User Monitoring (RUM)
- link: /integrations/content_security_policy_logs/
  tag: Documentación
  text: Política de seguridad de contenido
title: Solucionar problemas
---

Si experimentas algún comportamiento inesperado con Datadog Browser RUM, utiliza esta guía para resolver los problemas rápidamente. Si sigues teniendo problemas, contacta con el [equipo de asistencia de Datadog][1] para obtener más ayuda. Actualiza con regularidad el [SDK del RUM Browser][2] a la última versión, ya que cada nueva versión contiene mejoras y correcciones.

## Datos faltantes 

Si no puedes ver ningún dato en RUM o si faltan datos de algún usuario:

| Causas más frecuentes                                                                                               | Solución recomendada                                                                                                                                                                                          |
| ----------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Los bloqueadores de anuncios impiden que el SDK del RUM Browser se descargue o envíe datos a Datadog.     | Algunos bloqueadores de anuncios amplían sus restricciones a las herramientas de rastreo de rendimiento y marketing. Consulta los documentos [Instalar el SDK del RUM Browser con npm][3] y [reenviar los datos recopilados a través de un proxy][4]. |
| Las reglas de red, las VPN o el software antivirus pueden impedir que se descargue el SDK del RUM Browser o que se envíen datos a Datadog. | Permite el acceso a los endpoints necesarios para descargar el SDK del RUM Browser o para enviar datos. La lista de endpoints está disponible en la [documentación sobre la Política de seguridad de contenido][5].                                        |
| Los scripts, paquetes y clientes inicializados antes del SDK del RUM Browser pueden provocar que se pierdan logs, recursos y acciones del usuario. Por ejemplo, inicializar ApolloClient antes que el SDK del RUM Browser puede provocar que las solicitudes `graphql` no se registren como recursos XHR en el RUM Explorer. | Check dónde se inicializa el SDK de RUM Browser y plantéate adelantar este paso en la ejecución del código de tu aplicación.                                             |
| Si has configurado `trackViewsManually: true` y observas que no hay sesiones, es posible que la aplicación haya dejado de enviar información RUM repentinamente aunque no haya errores de red. | Asegúrate de iniciar una vista inicial una vez que hayas inicializado RUM para evitar cualquier pérdida de datos. Consulta [Configuración avanzada][6] para obtener más información.|

Lee las [directrices de la política de seguridad de contenido][5] y asegúrate de que tu sitio web permita el acceso al CDN del SDK del RUM Browser y al endpoint de ingesta.

## Problemas al ejecutar varias herramientas RUM en la misma aplicación

Datadog solo admite un SDK por aplicación. Para garantizar una recopilación de datos óptima y la plena funcionalidad de todas las características del SDK de Datadog RUM, utiliza únicamente el SDK de Datadog RUM.

### Inicialización del SDK del RUM Browser

Check si el SDK del RUM Browser se inicializa ejecutando `window.DD_RUM.getInternalContext()` en la consola de tu navegador y verifica que se devuelvan `application_id`, `session_id` y el objeto de vista:

{{< img src="real_user_monitoring/browser/troubleshooting/success_rum_internal_context.png" alt="El comando de obtención de contexto interno se ejecutó correctamente">}}

Si el SDK del RUM Browser no está instalado o si no se inicializa correctamente, puedes ver el error `ReferenceError: DD_RUM is not defined` como el que se muestra a continuación:

{{< img src="real_user_monitoring/browser/troubleshooting/error_rum_internal_context.png" alt="Error al obtener el comando de contexto interno">}}

También puedes check la consola de herramientas de desarrollo de tu navegador o la pestaña de red si observas algún error relacionado con la carga del SDK del RUM Browser.

**Nota**: Para garantizar resultados precisos, configura `sessionSampleRate` en 100. Para obtener más información, consulta [Configurar la configuración de Browser RUM y Browser RUM & Session Replay Sampling][9].

### Datos a la ingesta de Datadog


El SDK de RUM envía lotes de datos de eventos a la ingesta de Datadog cada vez que se cumple una de estas condiciones:

- Cada 30 segundos
- Cuando se hayan alcanzado 50 eventos 
- Cuando la carga útil sea >16 kB
- En `visibility:hidden` o `beforeUnload`

Si se están enviando datos, deberías ver las solicitudes de red dirigidas a `api/v2/rum` (la parte del origen de la URL puede diferir debido a la configuración de RUM) en la sección Red de las herramientas de desarrollo de tu navegador:

{{< img src="real_user_monitoring/browser/troubleshooting/network_intake-1.png" alt="Solicitudes de RUM a la entrada de Datadog">}}

## Cookies de RUM

El SDK del RUM Browser utiliza cookies para almacenar información de sesiones y seguir una [sesión de usuario][7] a través de diferentes páginas. Las cookies son de origen (se configuran en tu dominio) y no se utilizan para el rastreo entre sitios. Estas son las cookies configuradas por el SDK del RUM Browser.

| Nombre de la cookie        | Información                                                                                                                                                                                                                                                                                                  |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `_dd_s`             | Cookie utilizada para agrupar todos los eventos generados a partir de una única sesión de usuario a través de múltiples páginas. Contiene el ID de sesión actual, si la sesión está excluida debido al muestreo y la fecha de expiración de la sesión. La cookie se prolonga 15 minutos más cada vez que el usuario interactúa con el sitio web, hasta la duración máxima de la sesión de usuario (4 horas).|
| `dd_site_test_*`   | Cookie temporal utilizada para realizar un test de la compatibilidad con cookies. Caduca al instante.                                                                                                                                                                                                                                     |
| `dd_cookie_test_*` | Cookie temporal utilizada para realizar un test de la compatibilidad con cookies. Caduca al instante.                                                                                                                                                                                                                                     |

**Nota**: Las cookies `_dd_l`, `_dd_r` y `_dd` se han sustituido con la `_dd_s` en versiones recientes del SDK del RUM Browser.

## Identificadores de sesiones, cookies y aplicaciones RUM

Existe una relación de uno a uno entre una sesión RUM y la aplicación RUM a la que pertenece. Por lo tanto, el dominio configurado para la cookie `_dd_s` está totalmente dedicado a la aplicación RUM que está monitorizando y no puede monitorizar ninguna aplicación adicional.

## Limitaciones técnicas

Cada evento enviado por el SDK del RUM Browser se crea con lo siguiente:

- Contexto global del RUM
- Contexto del evento (si lo hay)
- Atributos específicos del evento

Ejemplo:

```javascript
window.DD_RUM && window.DD_RUM.setGlobalContextProperty('global', {'foo': 'bar'})
window.DD_RUM && window.DD_RUM.addAction('hello', {'action': 'qux'})
```

El código del ejemplo crea el siguiente evento de acción:

```json
{
  "type": "action",
  "context": {
    "global": {
      "foo": "bar"
    },
    "action": "qux"
  },
  "action": {
    "id": "xxx",
    "target": {
      "name": "hello"
    },
    "type": "custom"
  },
  ...
}
```

Si un evento o una solicitud supera alguna de las siguientes limitaciones, la ingesta de Datadog lo rechaza.

| Propiedad                                 | Limitación   |
| ---------------------------------------- | ------------ |
| Número máximo de atributos por evento   | 256          |
| Profundidad máxima de atributos por evento        | 20           |
| Tamaño máximo del evento                       | 256 KB       |
| Tamaño máximo de la carga útil de ingesta              | 5 MB         |

## Advertencia "Customer data exceeds the recommended threshold"

El SDK del navegador RUM permite configurar el [contexto global][10], la [información del usuario][11] y las [marcas de funciones][12] que luego se incluyen con los eventos recopilados.

Para minimizar el impacto en el ancho de banda del usuario, el SDK del navegador RUM limita los datos enviados a la ingesta de Datadog. Sin embargo, el envío de grandes volúmenes de datos puede afectar al rendimiento de los usuarios con conexiones a Internet lentas.

Para una mejor experiencia de usuario, Datadog recomienda mantener el tamaño del contexto global, la información del usuario y las marcas de funciones por debajo de 3 KiB. Si los datos superan este límite, se mostrará una advertencia: `The data exceeds the recommended 3KiB threshold.`

Desde v5.3.0, el SDK del RUM Browser admite la compresión de datos a través de `compressIntakeRequest` [parámetro de inicialización][13]. Cuando está activado, este límite recomendado se amplía de 3 KiB a 16 KiB.

## Advertencia de bloqueo de lectura de origen cruzado

En los navegadores de Chromium, cuando el SDK del RUM Browser envía datos a la ingesta de Datadog, se muestra una advertencia CORB en la consola: `Cross-Origin Read Blocking (CORB) blocked cross-origin response`.

La advertencia se muestra porque la ingesta devuelve un objeto JSON no vacío. Este comportamiento es un problema reportado [de Chromium][8]. No afecta al SDK del RUM Browser y se lo puede ignorar en forma segura.

## Advertencia "Deobfuscation failed"

Aparece una advertencia cuando falla el desenmascaramiento de un stack trace. Si el stack trace no está enmascarado para empezar, puedes ignorar esta advertencia. De lo contrario, utiliza la [página Símbolos de depuración de RUM][14] para ver todos tus mapas fuente subidos. Consulta [Investigar stack traces enmascarados con símbolos de depuración de RUM][15].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/help
[2]: https://github.com/DataDog/browser-sdk/blob/main/CHANGELOG.md
[3]: /es/real_user_monitoring/browser/setup/#npm
[4]: /es/real_user_monitoring/guide/proxy-rum-data/
[5]: /es/integrations/content_security_policy_logs/#use-csp-with-real-user-monitoring-and-session-replay
[6]: /es/real_user_monitoring/browser/advanced_configuration/?tab=npm#override-default-rum-view-names
[7]: /es/real_user_monitoring/browser/data_collected/?tab=session
[8]: https://bugs.chromium.org/p/chromium/issues/detail?id=1255707
[9]: /es/real_user_monitoring/guide/sampling-browser-plans/
[10]: /es/real_user_monitoring/browser/advanced_configuration/?tab=npm#global-context
[11]: /es/real_user_monitoring/browser/advanced_configuration/?tab=npm#user-session
[12]: /es/real_user_monitoring/guide/setup-feature-flag-data-collection/?tab=browser
[13]: /es/real_user_monitoring/browser/setup/#initialization-parameters
[14]: https://app.datadoghq.com/source-code/setup/rum
[15]: /es/real_user_monitoring/guide/debug-symbols