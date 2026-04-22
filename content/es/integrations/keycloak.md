---
app_id: keycloak
categories:
- recopilación de logs
- seguridad
custom_kind: integración
description: Obtener información sobre los eventos de Keycloak
integration_version: 1.0.0
media:
- caption: 'Keycloak: información general'
  image_url: images/keycloak-overview.png
  media_type: imagen
- caption: 'Keycloak: eventos de usuarios'
  image_url: images/keycloak-user-events.png
  media_type: imagen
- caption: 'Keycloak: eventos de administrador'
  image_url: images/keycloak-admin-events.png
  media_type: imagen
supported_os:
- linux
- windows
- macos
title: Keycloak
---
## Información general

[Keycloak](https://www.keycloak.org/) es una herramienta abierta de gestión de identidades y accesos de código abierto. Ayuda a añadir autenticación a las aplicaciones y servicios seguros con el mínimo esfuerzo. Keycloak proporciona federación de usuarios, autenticación robusta, gestión de usuarios, autorización detallada y mucho más.

Esta integración analiza los siguientes tipos de logs:

- **user-event**: eventos generados a partir de la actividad de los usuarios, como la autenticación y las actualizaciones de perfil.
- **admin-event**: eventos generados a partir de la actividad del administrador.

Visualiza información detallada sobre estos logs a través de los dashboards predefinidos. Además, dispone de reglas de detección predefinidas que te ayudarán a monitorizar y a responder a posibles amenazas de seguridad con eficacia.

## Configuración

### Instalación

Para instalar la integración de Keycloak, ejecuta el siguiente comando de instalación del Agent y los pasos que se indican a continuación. Para obtener más información, consulta la documentación de [Gestión de la integración](https://docs.datadoghq.com/agent/guide/integration-management/?tab=linux#install).

**Nota**: Este paso no es necesario para el Agent versión >= 7.63.0.

Comando de Linux

```shell
sudo -u dd-agent -- datadog-agent integration install datadog-keycloak==1.0.0
```

### Configuración

#### Recopilación de logs

1. La recopilación de logs está desactivada por defecto en el Datadog Agent. Actívala en`datadog.yaml`:

   ```yaml
     logs_enabled: true
   ```

1. Añade este bloque de configuración a tu archivo `keycloak.d/conf.yaml` para empezar a recopilar tus logs.

   Consulta el [keycloak.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/keycloak/datadog_checks/keycloak/data/conf.yaml.example) de ejemplo para conocer las opciones de configuración disponibles. El protocolo apropiado (TCP o UDP) debe elegirse basándose en la configuración de reenvío desyslog de Keycloak. Por defecto, Keycloak utiliza TCP.

   - **TCP**: si se utiliza el protocolo TCP para el reenvío del syslog, establece el tipo en `tcp`.
   - **UDP**: si se utiliza el protocolo UDP para el reenvío del syslog, modifica el tipo a `udp`.

   ```yaml
     logs:
     - type: <tcp/udp>
       port: <PORT>
       source: keycloak
       service: keycloak
   ```

   **Nota**:

   - `PORT`: el puerto debe ser similar al puerto proporcionado en la sección **Configure syslog message forwarding from keycloak**.
   - Se recomienda no modificar los valores de servicio y fuente, ya que estos parámetros forman parte integrante del funcionamiento del pipeline.

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

#### Configurar el reenvío de mensajes syslog desde keycloak

1. Conéctate a la máquina remota donde está instalado Keycloak.
1. Navega hasta el directorio donde está instalado Keycloak (normalmente se encuentra en `/opt/keycloak`, dependiendo de la configuración).
1. Añade las siguientes opciones en el comando start para configurar Keycloak para reenviar logs en el servidor del Datadog Agent y ejecuta las mismas opciones en el terminal del servidor de Keycloak.

```
  --log="syslog"
  --log-level=org.keycloak.events:debug
  --log-syslog-endpoint=<IP Address>:<Port>
  --log-syslog-output=json
```

Opcional: Para utilizar UDP en lugar de TCP para el reenvío de syslog, incluye la siguiente opción en el comando start de Keycloak:

```
  --log-syslog-protocol=udp
```

4. Después de añadir la opción de configuración anterior, el comando de inicio tendría el siguiente aspecto:

```shell
  bin/kc.[sh|bat] start --log="syslog" --log-syslog-endpoint=<IP Address>:<Port> --log-level=org.keycloak.events:debug --log-syslog-output=json
```

`IP ADDRESS`: dirección IP donde se ejecuta tu Datadog Agent.

`PORT`: número de puerto para enviar mensajes syslog.

Referencia: [Keycloak Syslog Configuration](https://www.keycloak.org/server/logging)

### Validación

[Ejecuta el subcomando de estado del Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `keycloak` en la sección Checks.

## Datos recopilados

### Log

| Formato     | Tipos de evento    |
| ---------  | -------------- |
| JSON | user-event, admin-event |

### Métricas

La integración de Keycloak no incluye ninguna métrica.

### Eventos

La integración de Keycloak no incluye ningún evento.

### Checks de servicio

La integración de Keycloak no incluye ningún check de servicio.

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

Asegúrate de que se evita el tráfico del puerto configurado si el firewall está activado.

**Port already in use** (Puerto ya en uso):

Si aparece el error **Port \<PORT_NUMBER> Already in Use**, consulta las siguientes instrucciones. El siguiente ejemplo es para el puerto 514:

- En los sistemas que utilizan Syslog, si el Agent escucha eventos en el puerto 514, puede aparecer el siguiente error en los logs del Agent: `Can't start UDP forwarder on port 514: listen udp :514: bind: address already in use`. Este error se produce porque, por defecto, Syslog escucha en el puerto 514. Para resolver este error, sigue **uno** de los siguientes pasos:
  - Desactiva Syslog.
  - Configura el Agent para escuchar en un puerto diferente, disponible.

Si necesitas más ayuda, ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).