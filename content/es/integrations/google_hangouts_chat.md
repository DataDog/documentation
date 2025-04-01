---
categories:
- colaboración
- notificaciones
custom_kind: integración
dependencies: []
description: Envía alertas y gráficos de Datadog al espacio de Google Chat de tu equipo.
doc_link: https://docs.datadoghq.com/integrations/google_hangouts_chat/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/google-hangouts-chat-integration/
  tag: Blog
  text: Integrar Datadog con Google Chat
- link: https://developers.google.com/hangouts/chat/
  tag: Documentación externa
  text: Google Chat
git_integration_title: google_hangouts_chat
has_logo: true
integration_id: google-hangouts-chat
integration_title: Google Chat
integration_version: ''
is_public: true
manifest_version: '1.0'
name: google_hangouts_chat
public_title: Integración de Datadog y Google Chat
short_description: Envía alertas y gráficos de Datadog al espacio de Google Chat de
  tu equipo.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Información general

Conecta Google Chat a Datadog y ayuda a tu equipo a colaborar:

- Compartiendo gráficos con tus compañeros en los espacios privados o públicos de tu equipo.
- Recibiendo alertas y notificaciones de Datadog dentro de Google Chat.

## Configuración

### Instalación

La integración Google Chat se instala utilizando su [cuadro de integración][1] del sitio Datadog y añadiendo el bot a tu espacio de Google Chat.

### Configuración

1. Añade la aplicación Datadog a tu espacio de Google Chat con `@Datadog`. **Nota:** [Autoriza el chatbot de Datadog ][2] para añadirlo a tu sala.
2. Instala la aplicación Datadog en tu espacio de Google Chat escribiendo `@Datadog install`. **Nota:** Para instalar para sitios distintos del dominio predeterminado (`app.datadoghq.com`), añade el dominio a este comando, como por ejemplo `@Datadog install mydomain.datadoghq.eu`
3. Sigue las instrucciones del bot para iniciar sesión en tu cuenta de Datadog y configuralo a través del sitio Datadog.
4. Añade los `names` y las `urls` de las salas en las que quieres que el bot pueda publicar con la [función `@-notification`][3].

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
2. Dentro de una cuenta de Datadog, elimina un espacio del cuadro de la integración Google Chat.
3. Al eliminar el chatbot de un espacio también se desinstala de cualquier cuenta instalada.
{{% /site-region %}}

{{% site-region region="ap1,us5,us3,eu,gov" %}}
Dentro de una cuenta de Datadog, elimina un espacio del cuadro de la integración Google Chat.
{{% /site-region %}}

## Datos recopilados

### Métricas

La integración Google Chat no incluye métricas.

### Eventos

La integración Google Chat no incluye eventos.

### Checks de servicio

La integración Google Chat no incluye checks de servicio.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/integrations/google_hangouts_chat
[2]: https://support.google.com/a/answer/6089179
[3]: https://docs.datadoghq.com/es/monitors/notifications/#notification