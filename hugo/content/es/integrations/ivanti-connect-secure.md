---
aliases:
- /es/integrations/ivanti_connect_secure
app_id: ivanti-connect-secure
categories:
- recopilación de logs
- seguridad
- red
custom_kind: integración
description: Obtén información sobre los logs de Ivanti Connect Secure.
integration_version: 1.0.0
media:
- caption: 'Ivanti Connect Secure: descripción general'
  image_url: images/ivanti_connect_secure_overview.png
  media_type: imagen
- caption: 'Ivanti Connect Secure: solicitudes web'
  image_url: images/ivanti_connect_secure_web_requests.png
  media_type: imagen
- caption: 'Ivanti Connect Secure: autenticación'
  image_url: images/ivanti_connect_secure_authentication.png
  media_type: imagen
- caption: 'Ivanti Connect Secure: conexión y túnel de VPN'
  image_url: images/ivanti_connect_secure_connection_and_vpn_tunneling.png
  media_type: imagen
- caption: 'Ivanti Connect Secure: actividades del administrador'
  image_url: images/ivanti_connect_secure_administrator_activities.png
  media_type: imagen
- caption: 'Ivanti Connect Secure: estadísticas y estado del sistema'
  image_url: images/ivanti_connect_secure_statistics_and_system_status.png
  media_type: imagen
supported_os:
- linux
- windows
- macos
title: Ivanti Connect Secure
---
## Información general

[Ivanti Connect Secure](https://www.ivanti.com/products/connect-secure-vpn) ofrece a los empleados, socios y clientes un acceso seguro y controlado a los datos y aplicaciones corporativos. Las aplicaciones incluyen servidores de archivos, servidores web, mensajería nativa y servidores alojados fuera de tu red de confianza.

Esta integración analiza los siguientes tipos de logs:

- **Solicitudes web**: los logs proporcionan información sobre las solicitudes de los clientes a los recursos basados en la web, incluidas las solicitudes realizadas con éxito, fallidas, bloqueadas, denegadas y no autenticadas.
- **Autenticación**: los logs proporcionan información sobre los eventos de inicio de sesión, los fallos de negociación SSL y los eventos de cambio de dirección remota.
- **Conexión**: los logs proporcionan información sobre las conexiones, incluidos detalles sobre los bytes transferidos, duración, nombre de host y direcciones IP.
- **Túnel VPN**: los logs proporcionan información sobre la actividad relacionada con ACL, así como los eventos relacionados con la sesión VPN.
- **Estadísticas**: los logs proporcionan información sobre el uso del sistema, incluidos los usuarios simultáneos y otras métricas de rendimiento.
- **Actividades de los administradores**: los logs proporcionan información sobre las acciones realizadas por los administradores, como inicios de sesión, cambios de configuración y tareas de gestión del sistema.

Visualiza información detallada sobre estos logs a través de los dashboards predefinidos. Además, dispones de reglas de detección de Cloud SIEM listas para usar para monitorizar y responder a posibles amenazas de seguridad con eficacia.

## Configuración

### Instalación

Para instalar la integración de Ivanti Connect Secure, ejecuta el siguiente comando de instalación del Agent en tu terminal y, a continuación, completa los pasos de configuración que se indican a continuación. Para obtener más información, consulta la documentación [Gestión de la integración](https://docs.datadoghq.com/agent/guide/integration-management/?tab=linux#install).

**Nota**: Este paso no es necesario para la versión del Agent >= 7.59.0.

```shell
sudo -u dd-agent -- datadog-agent integration install datadog-ivanti_connect_secure==1.0.0
```

### Configuración

#### Recopilación de logs

1. La recopilación de logs está desactivada por defecto en el Datadog Agent. Actívala en `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

1. Añade este bloque de configuración a tu archivo `ivanti_connect_secure.d/conf.yaml` para empezar a recopilar tus logs.

   Consulta el [ivanti_connect_secure.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/ivanti_connect_secure/datadog_checks/ivanti_connect_secure/data/conf.yaml.example) de ejemplo para conocer las opciones de configuración disponibles.

   ```yaml
   logs:
     - type: tcp # or 'udp'
       port: <PORT>
       source: ivanti-connect-secure
       service: ivanti-connect-secure
   ```

   **Nota**:

   - `PORT`: el puerto debe ser similar al puerto proporcionado en la sección **Configure syslog message forwarding from Ivanti Connect Secure** (Configurar el reenvío de mensajes syslog desde Ivanti Connect Secure).
   - Se recomienda no modificar los valores de servicio y fuente, ya que estos parámetros forman parte integrante del funcionamiento del pipeline.

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

#### Configurar el reenvío de mensajes syslog desde Ivanti Connect Secure

1. Inicia sesión en el portal de administración de Ivanti Connect Secure.
1. Ve a **System** > **Log/Monitoring** > **Events** (Sistema > Log/Monitorización > Eventos).
1. Haz clic en la pestaña **Settings** (Configuración).
1. En **Select Events to Log** (Seleccionar eventos a loguear), asegúrate de que están seleccionados todos los tipos de evento.
1. Haz clic en **Save Changes** (Guardar cambios) para aplicar la configuración.
1. Configura los detalles del servidor syslog en la sección **Syslog Servers** (Servidores syslog):
   - **Server name/IP** (Nombre del servidor/IP): introduce el nombre de dominio completo o la dirección IP del servidor syslog en el formato `<IP/DOMAIN>:<PORT>`.
   - **Type** (Tipo): selecciona **TCP** o **UDP** en el menú desplegable.
   - **Filter** (Filtro): elige **JSON: JSON** en el menú desplegable.
     <br>Una vez introducidos los detalles requeridos, haz clic en **Add** (Añadir).
1. Repite los pasos del 3 al 6 en las pestañas**User Access** (Acceso de usuario) y **Admin Access** (Acceso de administrador).

### Validación

[Ejecuta el subcomando de estado del Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `ivanti_connect_secure` en la sección Checks.

## Datos recopilados

### Log

| Formato | Tipos de evento                                                                                   |
| ------ | --------------------------------------------------------------------------------------------- |
| JSON   | Solicitudes web, Autenticación, Conexión, Túnel VPN, Estadísticas, Actividades del administrador |

### Métricas

La integración de Ivanti Connect Secure no incluye ninguna métrica.

### Eventos

La integración de Ivanti Connect Secure no incluye ningún evento.

### Checks de servicio

La integración de Ivanti Connect Secure no incluye ningún check de servicio.

## Solucionar problemas

**Permission denied while port binding** (Permiso denegado en la vinculación de puertos):

Si aparece un error de **Permission denied** (Permiso denegado) al vincular puertos en los logs del Agent:

1. La vinculación a un número de puerto inferior a 1024 requiere permisos elevados. Concede acceso al puerto mediante el comando `setcap`:

   ```shell
   sudo setcap CAP_NET_BIND_SERVICE=+ep /opt/datadog-agent/bin/agent/agent
   ```

1. Comprueba que la configuración es correcta ejecutando el comando `getcap`:

   ```shell
   sudo getcap /opt/datadog-agent/bin/agent/agent
   ```

   Con el resultado esperado:

   ```shell
   /opt/datadog-agent/bin/agent/agent = cap_net_bind_service+ep
   ```

   **Nota**: Vuelve a ejecutar este comando `setcap` cada vez que actualices el Agent.

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

**Data is not being collected** (No se están recopilando datos):

Asegúrate de que se omite el tráfico del puerto configurado si el cortafuegos está activado.

**Port already in use** (Puerto ya en uso):

Si aparece el error **Port \<PORT_NUMBER> Already in Use**, consulta las siguientes instrucciones. El siguiente ejemplo es para el puerto 514:

- En los sistemas que utilizan Syslog, si el Agent escucha eventos en el puerto 514, puede aparecer el siguiente error en los logs del Agent: `Can't start UDP forwarder on port 514: listen udp :514: bind: address already in use`. Este error se produce porque, por defecto, Syslog escucha en el puerto 514. Para resolver este error, sigue **uno** de los pasos siguientes:
  - Desactiva Syslog.
  - Configura el Agent para escuchar en un puerto diferente, disponible.

Para obtener más ayuda, ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).