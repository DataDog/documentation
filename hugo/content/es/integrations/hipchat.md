---
app_id: hipchat
categories:
- colaboración
- notificaciones
custom_kind: integración
description: HipChat es un chat de grupo y mensajería instantánea para empresas y
  equipos.
media: []
title: Hipchat
---
{{< img src="integrations/hipchat/hipchat_graph.png" alt="Gráfico de Hipchat" popup="true">}}

## Información general

La integración Hipchat permite a Datadog enviar notificaciones a tu sala de HipChat o identificador individual. Puede enviar:

- Mensajes y gráficos cuando se activan tus monitores Datadog.
- Mensajes sobre la actividad del flujo (stream) de eventos (por ejemplo, comentarios de compañeros de equipo).

## Configuración

### Configuración

1. [Crear un nuevo token de acceso](https://www.hipchat.com/admin/api) para Datadog. Solo se requiere acceso a nivel de notificación.

1. Copia tu clave e introdúcela en el [cuadro de integración de HipChat](https://app.datadoghq.com/integrations/hipchat).

1. Introduce los nombres de las salas a las que quieres que Datadog pueda enviar mensajes.
   Marca la casilla si quieres recibir notificaciones por cada comentario, en todas las salas configuradas. Si no la marcas, las personas que envían comentarios deberán incluir `@hipchat-<CHAT_NAME>` en cada mensaje que quieran enviar a HipChat.

1. Guarda tu configuración.

También puedes compartir gráficos o enviar alertas de monitor a salas de HipChat utilizando `@hipchat-<CHAT_NAME>`.

<div class="alert alert-warning">
Si utilizas un token de la API V1 de HipChat y el identificador de tu chat contiene caracteres especiales, como comas o corchetes, no es necesario que los escapes al introducir el identificador, ya que el cuadro de autocompletar lo hace por ti.
</div>

#### Servidor HipChat

Si alojas tu propio servidor de HipChat, introduce el nombre de host del servidor en el [cuadro de Datadog-Hipchat](https://app.datadoghq.com/integrations/hipchat). El servidor debe ser accesible desde Internet.

Marca la casilla **Ignore SSL** (Ignorar SSL= SÓLO si el certificado de tu servidor HipChat es autofirmado.

{{< img src="integrations/hipchat/hipchat_hostname.png" alt="Nombre de host de Hipchat" popup="true">}}

## Datos recopilados

### Métricas

La integración Hipchat no incluye métricas.

### Eventos

La integración Hipchat no incluye eventos.

### Checks de servicio

La integración Hipchat no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).