---
app_id: google_workspace_alert_center
categories:
- recopilación de logs
- seguridad
custom_kind: integración
description: Recopila logs del Centro de alertas de Google Workspace.
further_reading:
- link: https://www.datadoghq.com/blog/google-workspace-monitoring
  tag: Blog
  text: Monitorización de Google Workspace con Datadog
title: Centro de alertas de Google Workspace
---
## Información general

El Centro de alertas ofrece una vista completa de las alertas, las acciones y las notificaciones relacionadas con la seguridad,
en todo Google Workspace. Realiza la integración del Centro de alertas de Google Workspace con
Datadog para:

- Ve y analiza tus logs de alerta utilizando el [producto Logs de Datadog](https://app.datadoghq.com/logs/).
- Establece [monitores](https://app.datadoghq.com/monitors/monitor_types/) en [eventos](https://app.datadoghq.com/events/) desde tu dominio de Google Workspace.
- Aprovecha la [Plataforma de seguridad] de Datadog(https://app.datadoghq.com/security_platform/) para monitorizar y detectar amenazas en todo tu dominio de Google Workspace.

## Configuración

### Instalación

La integración del Centro de alertas de Google Workspace en Datadog utiliza cuentas de servicio para crear
una conexión API entre Google y Datadog. A continuación se ofrecen instrucciones para crear una cuenta
de servicio y proporcionar a Datadog las credenciales de esa cuenta de servicio, para que comience a realizar llamadas a la API.
en tu nombre.

**Nota**: Asegúrate de que has activado la [API de Google Workspace Alert Center](https://developers.google.com/admin-sdk/alertcenter/reference/rest).

1. Sigue las [instrucciones de creación y autorización de cuentas de servicio](https://developers.google.com/identity/protocols/oauth2/service-account). Necesitas
   acceso de superadministrador para completar estos pasos. Ten en cuenta la ubicación en la que guardas el archivo JSON de la clave privada como parte de ese proceso. Delega autoridad en todo el dominio a la cuenta de servicio como se ha descrito, concediendo el alcance `https://www.googleapis.com/auth/apps.alerts` en el proceso.
1. En la página `Service account details` de tu consola GCP, haz clic en el botón `Create Google Workspace Marketplace-Compatible OAuth Client` situado en la parte inferior de la sección `Advanced settings`.
1. Navega hasta el cuadro [de integración de Datadog Google Workspace Alert Center](http://app.datadoghq.com/integrations/google-workspace-alert-center).
1. En la pestaña **Configuración**, selecciona Upload Private Key File (Cargar archivo de clave privada) para integrar este proyecto.
   con Datadog. Selecciona el archivo JSON de clave privada que guardaste en el primer paso.
1. Introduce el Correo electrónico del asunto, que es la dirección de correo electrónico de una cuenta de usuario o robot con
   Acceso a Alert Center. No utilices la dirección de correo electrónico asociada a la propia cuenta de servicio.
   La integración se hace pasar por este usuario al realizar llamadas a la API.

Si deseas monitorizar múltiples proyectos, puedes repetir el proceso anterior para utilizar múltiples
cuentas de servicio.

### Configuración

También se pueden especificar etiquetas (tags) personalizadas por cada proyecto. Estas etiquetas se añaden a cada evento de log
de ese proyecto en Datadog.

### Resultados

Espera al menos cinco minutos para ver los [logs](https://app.datadoghq.com/logs/) debajo de la fuente `google.workspace.alert.center` . Puede que tengas que esperar
más tiempo si tu entorno genera alertas de Alert Center con poca frecuencia.

## Datos recopilados

### Métricas

Este Centro de alertas de Google Workspace no incluye datos de métricas.

### Eventos

Para obtener la lista completa de eventos de log, consulta la [documentación de Google Workspace Alert Center](https://support.google.com/a/answer/9104586?hl=en&ref_topic=9105077).

### Checks de servicio

La integración del Centro de alertas de Google Workspace no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}