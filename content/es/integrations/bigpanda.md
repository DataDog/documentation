---
aliases: []
categories:
- notificaciones
- ia/ml
custom_kind: integración
dependencies: []
description: Correlaciona las alertas de Datadog y crea incidentes procesables con
  BigPanda.
doc_link: https://docs.datadoghq.com/integrations/bigpanda/
draft: false
git_integration_title: bigpanda
has_logo: true
integration_id: ''
integration_title: BigPanda
integration_version: ''
is_public: true
manifest_version: '1.0'
name: bigpanda
public_title: Integración de Datadog y BigPanda
short_description: Envía alertas de Datadog a tu cuenta de BigPanda.
version: '1.0'
---

<!--  EXTRAÍDO DE https://github.com/DataDog/dogweb -->
## Información general

Conecta BigPanda a Datadog para ayudar a tu equipo al:

- Correlacionar la información mediante la recepción de alertas de Datadog.

## Configuración

### Instalación

La integración de BigPanda se instala utilizando el [cuadro de integración][1] en el sitio de Datadog.

### Configuración

1. En tu cuenta de BigPanda, ve a la página Integrations y selecciona New Integration.
2. Haz clic en _Datadog_ --> _Add Integration_, y luego crea la clave de aplicación.
3. La URL del webhook proporcionada contiene el token de acceso y la clave de aplicación necesarios.
4. Ve al cuadro BigPanda en Datadog y haz clic en _New Account_.
5. Añade un **Nombre de cuenta de BigPanda** de tu elección. Este será el nombre del identificador de notificaciones.
6. Pegue el **token de acceso** y la **clave de aplicación** en los campos correspondientes.
7. Selecciona un **tipo de endpoint**. Puedes elegir una región para la cuenta o configurar una URL personalizada.
8. Haz clic en _Save_.

**Nota**:
- El número máximo de cuentas de BigPanda admitidas actualmente es 5.
- Para habilitar la opción **Route All Monitor Events** y enviar automáticamente todos los eventos del monitor a BigPanda, contacta con el [equipo de asistencia de Datadog][2]. De manera predeterminada, solo se envían los eventos del monitor que contienen **@bigpanda-<account-name>**.

### Utilización

BigPanda crea incidentes a medida que comienza a recibir eventos de Datadog. Los incidentes mantienen información relevante, como el nombre del monitor que se activó y la condición que causó la alerta. 
Los incidentes pueden pasar de Activos a Resueltos a medida que los monitores experimentan cambios de transición. Para evitar que Datadog envíe alertas a BigPanda, elimina la cuenta deseada desde el cuadro de integración.

## Datos recopilados

### Métricas

La integración BigPanda no proporciona métricas.

### Eventos

La integración BigPanda no incluye eventos.

### Checks de servicios

La integración BigPanda no incluye checks de servicio.

## Resolución de problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][2].

[1]: https://app.datadoghq.com/integrations/bigpanda
[2]: https://docs.datadoghq.com/es/help/