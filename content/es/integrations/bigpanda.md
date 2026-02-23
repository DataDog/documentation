---
app_id: bigpanda
categories:
- notificaciones
- ia/ml
custom_kind: integración
description: Conectarse a BigPanda
media: []
title: BigPanda
---
## Información general

Conecta BigPanda a Datadog para ayudar a tu equipo al:

- Correlacionar la información mediante la recepción de alertas de Datadog.

## Configuración

### Instalación

La integración de BigPanda se instala utilizando el [cuadro de la integración](https://app.datadoghq.com/integrations/bigpanda) en el sitio Datadog.

### Configuración

1. En tu cuenta de BigPanda, ve a la página Integrations y selecciona New Integration.
1. Haz clic en _Datadog_ --> _Add Integration_, y luego crea la clave de aplicación.
1. La URL del webhook proporcionada contiene el token de acceso y la clave de aplicación necesarios.
1. Ve al cuadro BigPanda en Datadog y haz clic en _New Account_.
1. Añade un **Nombre de cuenta de BigPanda** de tu elección. Este será el nombre del identificador de notificaciones.
1. Pegue el **token de acceso** y la **clave de aplicación** en los campos correspondientes.
1. Selecciona un **tipo de endpoint**. Puedes elegir una región para la cuenta o configurar una URL personalizada.
1. Haz clic en _Save_.

**Nota**:

- El número máximo de cuentas de BigPanda admitidas actualmente es 5.
- Para habilitar la opción **Route All Monitor Events** (Enrutar todos los eventos de monitor) y enviar automáticamente todos los eventos del monitor a BigPanda, ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/). Por defecto, sólo se envían los eventos de monitor que contienen **@bigpanda-<account-name>**.

### Utilización

BigPanda crea incidentes a medida que comienza a recibir eventos de Datadog. Los incidentes mantienen información relevante, como el nombre del monitor activado y la condición que causó la alerta. 
Los incidentes pueden pasar de Activos a Resueltos a medida que los monitores experimentan cambios de transición. Para evitar que Datadog envíe alertas a BigPanda, elimina la cuenta deseada desde el cuadro de la integración.

## Datos recopilados

### Métricas

La integración BigPanda no proporciona métricas.

### Eventos

La integración BigPanda no incluye eventos.

### Checks de servicio

La integración BigPanda no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).