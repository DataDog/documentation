---
app_id: chatwork
categories:
- colaboración
- notificaciones
custom_kind: integración
description: ChatWork es una plataforma de comunicación diseñada para empresas y equipos.
media: []
title: ChatWork
---
{{< img src="integrations/chatwork/chatwork_event.png" alt="Evento de Chatwork" popup="true">}}

## Información general

Utiliza la integración con Chatwork para:

- Recibir notificaciones cuando alguien publica en tu flujo (stream).
- Recibir una notificación cuando se active una alerta de métrica.

## Configuración

### Instalación

1. Primero, crea un usuario de Datadog en tu cuenta de organización de Chatwork para publicar actualizaciones de Datadog.

1. La API de Chatwork está aún en vista previa, por lo que tienes que [solicitar acceso](https://www.chatwork.com/login.php?redirect=apply_beta&package=chatwork&subpackage=api&args=).

1. Espera el correo electrónico de confirmación (puede tardar hasta 2 días).

1. Sigue [estas instrucciones](http://developer.chatwork.com/ja/authenticate.html) para obtener un token.

1. Cópialo en este [campo](https://app.datadoghq.com/integrations/chatwork).

1. Ingresa los nombres y los identificadores de los chats a los que deseas acceder (los identificadores se pueden encontrar en la URL de las salas de chat).

1. Marca la casilla si deseas recibir una notificación por cada comentario; de lo contrario, utiliza `@chatwork-chat_namesyntax`.
   {{< img src="integrations/chatwork/chatwork_tile.png" alt="Chatwork tile" popup="true">}}

1. [Guarda la configuración](https://app.datadoghq.com/integrations/chatwork).

## Datos recopilados

### Métricas

La integración Chatwork no incluye métricas.

### Eventos

La integración Chatwork no incluye eventos.

### Checks de servicio

La integración Chatwork no incluye checks de servicios.

## Solucionar problemas

¿Necesita ayuda? Póngase en contacto con [Datadog support](https://docs.datadoghq.com/help/).