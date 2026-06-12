---
app_id: google_hangouts_chat
categories:
- colaboración
- notificaciones
custom_kind: integración
description: Envía alertas y gráficos de Datadog al espacio de Google Chat de tu equipo.
further_reading:
- link: https://www.datadoghq.com/blog/google-hangouts-chat-integration/
  tag: Blog
  text: Integrar Datadog con Google Chat
- link: https://developers.google.com/hangouts/chat/
  tag: Documentación externa
  text: Google Chat
title: Google Chat
---
## Información general

Conecta Google Chat a Datadog y ayuda a tu equipo a colaborar:

- Compartiendo gráficos con tus compañeros en los espacios privados o públicos de tu equipo.
- Recibiendo alertas y notificaciones de Datadog dentro de Google Chat.

## Configuración

### Instalación

La integración de Google Chat se instala con su [cuadro de integración](https://app.datadoghq.com/integrations/google_hangouts_chat) en el sitio de Datadog y añadiendo el bot a tu espacio de Google Chat.

### Configuración

1. Añade la aplicación de Datadog a tu espacio de Google Chat con `@Datadog`. **Nota:** [Agrega a la lista de permitido a Datadog Chatbot](https://support.google.com/a/answer/6089179) para añadirlo a tu espacio.
1. Instala la aplicación Datadog en tu espacio de Google Chat escribiendo `@Datadog install`. **Nota:** Para instalar para sitios distintos del dominio predeterminado (`app.datadoghq.com`), añade el dominio a este comando, como por ejemplo `@Datadog install mydomain.datadoghq.eu`
1. Sigue las instrucciones del bot para iniciar sesión en tu cuenta de Datadog y configuralo a través del sitio Datadog.
1. Añade las direcciones `names` y `urls` de las salas en las que quieres que el bot pueda publicar con la [función `@-notification`](https://docs.datadoghq.com/monitors/notifications/#notification).

{{% site-region region="us" %}}

### Resumen de los comandos del chatbot de Datadog

| Comando                            | Descripción                                                                                                                                                                                                                                   |
|------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `@Datadog install (domain)`        | Inicia el flujo de trabajo de instalación. **Nota:** Si perteneces a más de una cuenta de Datadog, aparecerá una página de **Selección de cuenta** durante el flujo de trabajo de instalación.                                                                                |
| `@Datadog list installed accounts` | Devuelve un lista de todas las cuentas que tienen instalado Google Chat.                                                                                                                                                                               |
| `@Datadog remove account`          | Inicia el flujo de trabajo para eliminar Google Chat de una cuenta específica de Datadog. Se devuelve una tarjeta con enlaces de desinstalación para todas las cuentas instaladas. Haz clic en la cuenta que quieres desinstalar y el chatbot de Datadog responderá con el nombre de la cuenta eliminada. |

{{% /site-region %}}

## Desinstalación en cuentas de Datadog 

{{% site-region region="us" %}}

Existen tres formas de desinstalar Google Chat de una cuenta de Datadog:

1. El comando `@Datadog remove account` permite a los miembros del espacio desinstalar el chatbot de una cuenta de Datadog seleccionada.
1. Dentro de una cuenta de Datadog, elimina un espacio del cuadro de la integración Google Chat.
1. Al eliminar el chatbot de un espacio también se desinstala de cualquier cuenta instalada.

{{% /site-region %}}

{{% site-region region="ap2,ap1,us5,us3,eu,gov" %}}

Dentro de una cuenta de Datadog, elimina un espacio del cuadro de la integración Google Chat.

{{% /site-region %}}

## Datos recopilados

### Métricas

La integración Google Chat no incluye métricas.

### Eventos

La integración Google Chat no incluye eventos.

### Checks de servicio

La integración Google Chat no incluye checks de servicio.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}