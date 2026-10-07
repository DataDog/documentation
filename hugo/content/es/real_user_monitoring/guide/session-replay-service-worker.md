---
aliases:
- /es/real_user_monitoring/faq/session_replay_service_worker/
description: Configure los permisos de servicio worker de terceros para Session Replay
  a fin de garantizar un rendimiento óptimo y la seguridad de los datos.
further_reading:
- link: /session_replay/
  tag: Documentación
  text: Obtenga más información sobre Session Replay
title: Permitir los servicios worker de terceros para Session Replay
---
## Descripción general {#overview}

Session Replay utiliza un servicio worker en otro dominio `session-replay-datadoghq.com` para brindar la mejor experiencia posible mientras protege su privacidad y garantiza la seguridad de sus datos.

Si ha bloqueado las cookies de terceros en la configuración de su navegador, o si su navegador las bloquea de forma predeterminada, esto impide que el servicio worker se registre correctamente.

### Permitir una excepción {#allow-an-exception}

Datadog recomienda que cree una excepción en el bloqueo de cookies de terceros para permitir que el servicio worker de Session Replay funcione correctamente.

Si utiliza Google Chrome, siga las instrucciones a continuación. Este flujo de trabajo de excepciones también se aplica a Firefox y otros navegadores de escritorio, incluidos Brave y Edge.

1. En su navegador web, haga clic en el icono {{< ui >}}Lock{{< /ui >}} a la izquierda de la URL de la página.
2. Haga clic en {{< ui >}}Cookies{{< /ui >}}. Aparece una ventana modal.

   {{< img src="real_user_monitoring/session_replay/allow-3p-serviceworker-1.png" alt="Permitir el servicio worker de terceros de Session Replay" >}}

3. Vaya a la pestaña {{< ui >}}Blocked{{< /ui >}} y seleccione `session-replay-datadoghq.com` de la lista de páginas.
4. Haga clic en {{< ui >}}Allow{{< /ui >}} y {{< ui >}}Done{{< /ui >}}.

   {{< img src="real_user_monitoring/session_replay/allow-3p-serviceworker-2.png" alt="Permitir el servicio worker de terceros de Session Replay" >}}

Una vez que haya actualizado la configuración de sus cookies, vuelva a cargar la página.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}