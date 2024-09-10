---
aliases:
- /es/real_user_monitoring/session_replay/troubleshooting
description: Aprende a solucionar problemas con Session Replay.
further_reading:
- link: https://github.com/DataDog/browser-sdk
  tag: Código fuente
  text: Código fuente browser-sdk
- link: /real_user_monitoring/session_replay
  tag: Documentación
  text: Más información sobre Session Replay
- link: /integrations/content_security_policy_logs
  tag: Documentación
  text: Detectar y agregar infracciones de CSP con Datadog
title: Solucionar problemas del Navegador Session Replay
---

## Información general

Si experimentas algún comportamiento inesperado con Datadog Session Replay, utiliza esta página para ayudarte a solucionar los problemas. Si sigues teniendo problemas, ponte en contacto con el [servicio de asistencia de Datadog][1] para obtener más ayuda. Actualiza con regularidad el [SDK del Navegador RUM][2] a la última versión, ya que cada nueva versión contiene mejoras y correcciones.

## Grabador de Session Replay

### Algunos elementos HTML no son visibles durante la reproducción

Session Replay no es compatible con:

- Los siguientes elementos HTML: `iframe`, `video`, `audio` o `canvas`
  - Para reproducir iframes en Session Replay, puedes instrumentar el código del iframe por separado. Para iframes que abarcan subdominios, utiliza `trackSessionAcrossSubdomains: true`. Después de una correcta instrumentación, los iframes y sus ventanas principales aparecen como páginas separadas en la misma sesión. No se admite la integración de repeticiones de iframe directamente en tu ventana principal.
- La [API de animaciones web][7]

Session Replay requiere que utilices una conexión HTTPS. Si no utilizas una conexión segura, los recursos se agotarán y no podrás ver las imágenes ni algunos elementos de la página.

### Las fuentes o imágenes no se muestran correctamente

Una reproducción de sesión no es un vídeo, sino un iframe real reconstruido a partir de snapshots de DOM. Por tanto, la repetición depende de los distintos recursos de la página: fuentes e imágenes.

Los recursos pueden no estar disponibles en el momento de la reproducción por las siguientes razones:

- El recurso ya no existe. Por ejemplo, formaba parte de un despliegue anterior.
- El recurso es inaccesible. Por ejemplo, es posible que se requiera autenticación o que sólo se pueda acceder al recurso desde una red interna.
- El recurso está bloqueado por el navegador debido a CORS (normalmente fuentes web).
   - La reproducción que se muestra en el dominio de prueba `session-replay-datadoghq.com` y las solicitudes de recursos están sujetas a los checks de seguridad entre orígenes de tu navegador. Si el recurso no está autorizado para el dominio, tu navegador bloquea la solicitud.
   - Autoriza `session-replay-datadoghq.com` a través de la cabecera [`Access-Control-Allow-Origin`][3] para cualquier recurso de fuente o de imagen del que dependa tu sitio web, para asegurarte de que estos recursos son accesibles para su repetición. Para obtener más información, consulta [Uso compartido de recursos entre orígenes][4].

### Las reglas CSS no se aplican correctamente/no se reproduce el desplazamiento del cursor

A diferencia de las fuentes y las imágenes, el grabador intenta agrupar las distintas reglas CSS aplicadas como parte de los datos de grabación, aprovechando la interfaz [CSSStyleSheet][5]. Si esto no es posible, vuelve a registrar los enlaces a los archivos CSS.

Para una adecuada compatibilidad del desplazamiento del cursor, las reglas CSS deben ser accesibles a través de la interfaz CSSStyleSheet.

Si las hojas de estilo están alojadas en un dominio diferente al de la página web, el acceso a las reglas CSS está sujeto a los checks de seguridad entre orígenes del navegador y debe indicarse al navegador que cargue la hoja de estilo aprovechando CORS, mediante el atributo [crossorigin][6].

Por ejemplo, si tu aplicación está en el dominio `example.com` y depende de un archivo CSS en `assets.example.com` a través de un elemento de enlace, el atributo `crossorigin` debe definirse como `anonymous`, a menos que se requieran credenciales:

```html
<link rel="stylesheet" crossorigin="anonymous"
      href="https://assets.example.com/style.css">
```

Además, autoriza el dominio `example.com` en el `assets.example.com`. Esto permite que el archivo de recursos cargue el recurso, configurando la cabecera [`Access-Control-Allow-Origin`][3].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/help
[2]: https://github.com/DataDog/browser-sdk/blob/main/CHANGELOG.md
[3]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Origin
[4]: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
[5]: https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleSheet
[6]: https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/crossorigin
[7]: https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API/Using_the_Web_Animations_API