---
categories:
- recopilación de logs
- seguridad
custom_kind: integración
dependencies: []
description: Recopila logs del Centro de alertas de Google Workspace.
doc_link: https://docs.datadoghq.com/integrations/google_workspace_alert_center/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/google-workspace-monitoring
  tag: Blog
  text: Monitorización de Google Workspace con Datadog
git_integration_title: google_workspace_alert_center
has_logo: true
integration_id: ''
integration_title: Centro de alertas de Google Workspace
integration_version: ''
is_public: true
manifest_version: '1.0'
name: google_workspace_alert_center
public_title: Centro de alertas de Google Workspace
short_description: Recopila logs del Centro de alertas de Google Workspace.
team: integraciones-web
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Información general

El Centro de alertas ofrece una vista completa de las alertas, las acciones y las notificaciones relacionadas con la seguridad,
en todo Google Workspace. Realiza la integración del Centro de alertas de Google Workspace con
Datadog para:

- Visualiza y analiza tus logs de alertaa utilizando [productos de logs de Datadog][1].
- Configura [monitores][2] para [<txprotected>eventos</txprotected>][3] de tu dominio Google Workspace.
- Aprovecha la [Plataforma de seguridad][4] de Datadog para monitorizar y detectar amenazas en todo tu dominio Google Workspace.

## Configuración

### Instalación

La integración del Centro de alertas de Google Workspace en Datadog utiliza cuentas de servicio para crear
una conexión API entre Google y Datadog. A continuación se ofrecen instrucciones para crear una cuenta
de servicio y proporcionar a Datadog las credenciales de esa cuenta de servicio, para que comience a realizar llamadas a la API.
en tu nombre.

**Nota**: Asegúrate de haber activado la [API del Centro de alertas de Google Workspace][5].

1. Sigue las [instrucciones para la creación y la autorización de cuentas de servicio][6]. Necesitas
   acceso de superadministrador para completar estos pasos. Anota la ubicación en que guardas el archivo JSON de clave privada como parte de este proceso. Delega autoridad en todo el dominio a la cuenta de servicio, como se ha descrito, concediendo el contexto `https://www.googleapis.com/auth/apps.alerts` en el proceso. 
 1. En la página `Service account details` de tu consola GCP, haz clic en el botón `Create Google Workspace Marketplace-Compatible OAuth Client` situado en la parte inferior de la sección `Advanced settings`.
2. Ve al [cuadro de la integración del Centro de alertas de Google Workspace en Datadog][7].
3. En la pestaña **Configuración**, selecciona Upload Private Key File (Cargar archivo de clave privada) para integrar este proyecto.
   con Datadog. Selecciona el archivo JSON de clave privada que guardaste en el primer paso.
4. Introduce el Correo electrónico del asunto, que es la dirección de correo electrónico de una cuenta de usuario o robot con
   acceso al Centro de Alertas. No utilices la dirección de correo electrónico asociada a la propia cuenta de servicio. 
   La integración se hace pasar por este usuario al realizar llamadas a la API.

Si quieres monitorizar varios proyectos, puedes repetir el proceso anterior para utilizar varias
cuentas de servicio.

### Configuración

También se pueden especificar etiquetas (tags) personalizadas por cada proyecto. Estas etiquetas se añaden a cada evento de log
de ese proyecto en Datadog.

### Resultados

Espera al menos cinco minutos hasta que veas aparecer [logs][1] debajo de la fuente `google.workspace.alert.center`. Puede que tengas que esperar
más tiempo, si tu entorno genera alertas del Centro de alertas con poca frecuencia.

## Datos recopilados

### Métricas

Este Centro de alertas de Google Workspace no incluye datos de métricas.

### Eventos

Para obtener la lista completa de los eventos de logs, consulta la [documentación del Centro de alertas de Google Workspace][8].

### Checks de servicio

La integración del Centro de alertas de Google Workspace no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? [Consulta el servicio de asistencia de Datadog][9].

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/logs/
[2]: /es/monitors/monitor_types/
[3]: /es/events/
[4]: /es/security_platform/
[5]: https://developers.google.com/admin-sdk/alertcenter/reference/rest
[6]: https://developers.google.com/identity/protocols/oauth2/service-account
[7]: http://app.datadoghq.com/integrations/google-workspace-alert-center
[8]: https://support.google.com/a/answer/9104586?hl=en&ref_topic=9105077
[9]: https://docs.datadoghq.com/es/help/