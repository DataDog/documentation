---
aliases:
- /es/real_user_monitoring/faq/session_replay_service_worker/
further_reading:
- link: /real_user_monitoring/session_replay/browser/
  tag: Documentación
  text: Más información sobre Session Replay
title: Permitir service workers de terceros en Session Replay
---

## Información general

Session Replay utiliza un service worker en otro dominio `session-replay-datadoghq.com` para proporcionar la mejor experiencia posible y, al mismo tiempo, proteger tu privacidad y garantizar la seguridad de tus datos.

Si has bloqueado las cookies de terceros en los parámetros de tu navegador o si tu navegador las bloquea por defecto, esto impide que el service worker se registre correctamente.

### Permitir una excepción

Datadog recomienda hacer una excepción en el bloqueo de cookies de terceros para permitir que el service worker de Session Replay funcione correctamente.

Si utilizas Google Chrome, sigue las instrucciones que se indican a continuación. Este flujo (flow) de trabajo de excepción también se aplica a Firefox y otros navegadores de escritorio, incluidos Brave y Edge.

1. En tu navegador, haz clic en el icono **Bloqueo** situado a la izquierda de la URL de la página.
2. Haz clic en **Cookies**. Aparecerá una ventana emergente.

   {{< img src="real_user_monitoring/session_replay/allow-3p-serviceworker-1.png" alt="Permitir service workers de terceros en Session Replay" >}}

3. Ve a la pestaña **Bloqueados** y selecciona `session-replay-datadoghq.com` en la lista de páginas.
4. Haz clic en **Permitir** y **Listo**.

   {{< img src="real_user_monitoring/session_replay/allow-3p-serviceworker-2.png" alt="Permitir service workers de terceros en Session Replay" >}}

Una vez que hayas actualizado la configuración de las cookies, vuelve a cargar la página.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}