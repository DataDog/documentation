---
app_id: ivanti-connect-secure
app_uuid: 6fbaf2b3-bcc9-49b1-bcb6-67239f17a1e0
assets:
  dashboards:
    Ivanti Connect Secure - Administrator Activities: assets/dashboards/ivanti_connect_secure_administrator_activities.json
    Ivanti Connect Secure - Authentication: assets/dashboards/ivanti_connect_secure_authentication.json
    Ivanti Connect Secure - Connection and VPN Tunneling: assets/dashboards/ivanti_connect_secure_connection_and_vpn_tunneling.json
    Ivanti Connect Secure - Overview: assets/dashboards/ivanti_connect_secure_overview.json
    Ivanti Connect Secure - Statistics and System Status: assets/dashboards/ivanti_connect_secure_statistics_and_system_status.json
    Ivanti Connect Secure - Web Requests: assets/dashboards/ivanti_connect_secure_web_requests.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 33282127
    source_type_name: Ivanti Connect Secure
  logs:
    source: ivanti-connect-secure
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- recopilación de logs
- seguridad
- network
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/ivanti_connect_secure/README.md
display_on_public_website: true
draft: false
git_integration_title: ivanti_connect_secure
integration_id: ivanti-connect-secure
integration_title: Ivanti Connect Secure
integration_version: 1.0.0
is_public: true
manifest_version: 2.0.0
name: ivanti_connect_secure
public_title: Ivanti Connect Secure
short_description: Obtén información sobre los logs de Ivanti Connect Secure.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Category::Log Collection
  - Category::Security
  - Category::Network
  - Offering::Integration
  - Submitted Data Type::Logs
  configuration: README.md#Setup
  description: Obtén información sobre los logs de Ivanti Connect Secure.
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
  - caption: 'Ivanti Connect Secure: conexión y túnel VPN'
    image_url: images/ivanti_connect_secure_connection_and_vpn_tunneling.png
    media_type: imagen
  - caption: 'Ivanti Connect Secure: actividades del administrador'
    image_url: images/ivanti_connect_secure_administrator_activities.png
    media_type: imagen
  - caption: 'Ivanti Connect Secure: estadísticas y estado del sistema'
    image_url: images/ivanti_connect_secure_statistics_and_system_status.png
    media_type: imagen
  overview: README.md#Overview
  support: README.md#Support
  title: Ivanti Connect Secure
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-core -->
## Información general

[Ivanti Connect Secure][1] ofrece a los empleados, socios y clientes un acceso seguro y controlado a los datos y aplicaciones corporativos. Las aplicaciones incluyen servidores de archivos, servidores web, mensajería nativa y servidores alojados fuera de tu red de confianza.

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

Para instalar la integración de Ivanti Connect Secure, ejecuta el siguiente comando de instalación del Agent en tu terminal y, luego, sigue los pasos de configuración que se indican a continuación. Para obtener más información, consulta la documentación de [Gestión de integraciones][2].

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

2. Añade este bloque de configuración a tu archivo `ivanti_connect_secure.d/conf.yaml` para empezar a recopilar tus logs.

   Consulta el [ivanti_connect_secure.d/conf.yaml][3] de ejemplo para ver las opciones disponibles de configuración.

   ```yaml
   logs:
     - type: tcp # or 'udp'
       port: <PORT>
       source: ivanti-connect-secure
       service: ivanti-connect-secure
   ```

   **Nota**:

   - `PORT`: el puerto debe ser similar al puerto proporcionado en la sección **Configure syslog message forwarding from Ivanti Connect Secure** (Configurar el reenvío de mensajes syslog desde Ivanti Connect Secure).
   - Es recomendado no cambiar los valores de servicio y fuente, ya que estos parámetros son parte integral del funcionamiento del pipeline.

3. [Reinicia el Agent][4].

#### Configurar el reenvío de mensajes syslog desde Ivanti Connect Secure

1. Inicia sesión en el portal de administración de Ivanti Connect Secure.
2. Ve a **System** > **Log/Monitoring** > **Events** (Sistema > Log/Monitorización > Eventos).
3. Haz clic en la pestaña **Settings** (Configuración).
4. En **Select Events to Log** (Seleccionar eventos a loguear), asegúrate de que están seleccionados todos los tipos de evento.
5. Haz clic en **Save Changes** (Guardar cambios) para aplicar la configuración.
6. Configura los detalles del servidor syslog en la sección **Syslog Servers** (Servidores syslog):
   - **Server name/IP** (Nombre del servidor/IP): introduce el nombre de dominio completo o la dirección IP del servidor syslog en el formato `<IP/DOMAIN>:<PORT>`.
   - **Type** (Tipo): selecciona **TCP** o **UDP** en el menú desplegable.
   - **Filter** (Filtro): elige **JSON: JSON** en el menú desplegable.
     <br>Una vez introducidos los detalles requeridos, haz clic en **Add** (Añadir).
7. Repite los pasos del 3 al 6 en las pestañas**User Access** (Acceso de usuario) y **Admin Access** (Acceso de administrador).

### Validación

[Ejecuta el subcomando de estado del Agent][5] y busca `ivanti_connect_secure` en la sección de Checks.

## Datos recopilados

### Log

| Formato | Tipos de eventos                                                                                   |
| ------ | --------------------------------------------------------------------------------------------- |
| JSON   | Solicitudes web, Autenticación, Conexión, Túnel VPN, Estadísticas, Actividades del administrador |

### Métricas

La integración de Ivanti Connect Secure no incluye ninguna métrica.

### Eventos

La integración de Ivanti Connect Secure no incluye ningún evento.

### Checks de servicio

La integración de Ivanti Connect Secure no incluye ningún check de servicio.

## Solucionar problemas

**Permiso denegado mientras se vincula el puerto:**

Si aparece un error **Permission denied** (Permiso denegado) al vincular puertos en los logs del Agent:

1. La vinculación a un número de puerto inferior a 1024 requiere permisos elevados. Concede acceso al puerto mediante el comando `setcap`:

   ```shell
   sudo setcap CAP_NET_BIND_SERVICE=+ep /opt/datadog-agent/bin/agent/agent
   ```

2. Comprueba que la configuración es correcta ejecutando el comando `getcap`:

   ```shell
   sudo getcap /opt/datadog-agent/bin/agent/agent
   ```

   Con el resultado esperado:

   ```shell
   /opt/datadog-agent/bin/agent/agent = cap_net_bind_service+ep
   ```

   **Nota**: Vuelve a ejecutar este comando `setcap` cada vez que actualices el Agent.

3. [Reinicia el Agent][4].

**No se están recopilando datos:**

Asegúrate de que se evita el tráfico del puerto configurado si el firewall está activado.

**Puerto ya en uso:**

Si aparece el error **Port <PORT_NUMBER> Already in Use** (Puerto ya en uso), consulta las siguientes instrucciones. El siguiente ejemplo es para el puerto 514:

- En los sistemas que utilizan Syslog, si el Agent escucha eventos en el puerto 514, puede aparecer el siguiente error en los logs del Agent: `Can't start UDP forwarder on port 514: listen udp :514: bind: address already in use`. Este error se produce porque, por defecto, Syslog escucha en el puerto 514. Para resolver este error, sigue **uno** de los pasos siguientes:
  - Desactiva Syslog.
  - Configura el Agent para escuchar en un puerto diferente, disponible.

Para obtener más ayuda, ponte en contacto con el [soporte de Datadog][6].

[1]: https://www.ivanti.com/products/connect-secure-vpn
[2]: https://docs.datadoghq.com/es/agent/guide/integration-management/?tab=linux#install
[3]: https://github.com/DataDog/integrations-core/blob/master/ivanti_connect_secure/datadog_checks/ivanti_connect_secure/data/conf.yaml.example
[4]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[6]: https://docs.datadoghq.com/es/help/