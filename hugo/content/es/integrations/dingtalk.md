---
categories:
- colaboración
- notificaciones
custom_kind: integración
dependencies: []
description: Envía alertas y gráficos de Datadog al grupo DingTalk de tu equipo.
doc_link: https://docs.datadoghq.com/integrations/dingtalk/
draft: false
git_integration_title: dingtalk
has_logo: true
integration_id: dingtalk
integration_title: DingTalk
integration_version: ''
is_public: true
manifest_version: '1.0'
name: dingtalk
public_title: Integración de Datadog y DingTalk
short_description: Envía alertas y gráficos de Datadog al grupo DingTalk de tu equipo.
version: '1.0'
---

<!--  EXTRAÍDO DE https://github.com/DataDog/dogweb -->
## Información general

Aprovecha la integración con DingTalk para:

-   Recibir notificaciones de alertas y eventos de Datadog en DingTalk
-   Compartir mensajes y gráficos con tu grupo DingTalk

## Instalación

La integración DingTalk se instala con el [cuadro de la integración DingTalk][1] de Datadog.

## Configurar

Para integrar Datadog en un grupo DingTalk:

1. En la aplicación DingTalk, ve a Messages (Mensajes) y luego haz clic en el grupo en el que quieres añadir una integración con Datadog.
2. En la esquina superior derecha, haz clic en el icono Group Settings (Configuración de grupo) (se parece a una elipsis) y selecciona Group Robot (Robot del grupo).
3. En el menú Group Robot (Robot del grupo), selecciona Datadog y haz clic en `Add`.
4. Introduce un nombre para el robot y haz clic en `Finished`. Esta acción devuelve una dirección de webhook.
5. Copia la dirección del webhook y haz clic en `Finished`.
6. En el [cuadro de la integración][1] DingTalk introduce el grupo DingTalk en el que has añadido la integración Datadog, en el campo Group Name (Nombre del grupo), y pega la dirección del webhook en el campo Group Robot Webhook (Webhook del robot del grupo). Los nombres de grupo pueden contener letras, dígitos y guiones bajos.
7. Haz clic en Install Configuration (Instalar configuración) (o en Update Configuration (Actualizar configuración)).

Después de instalar o actualizar la integración, puedes utilizar la [función `@-notification` ][2] con el nombre de tu grupo DingTalk.

## Datos recopilados

### Métricas

La integración DingTalk no proporciona métricas.

### Eventos

La integración DingTalk no no incluye eventos.

### Checks de servicio

La integración DingTalk no no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con [asistencia técnica de Datadog][3].

[1]: https://app.datadoghq.com/integrations/dingtalk
[2]: https://docs.datadoghq.com/es/monitors/notifications/#notification
[3]: https://docs.datadoghq.com/es/help/