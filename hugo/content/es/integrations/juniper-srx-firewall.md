---
aliases:
- /es/integrations/juniper_srx_firewall
app_id: juniper-srx-firewall
categories:
- recopilación de logs
- seguridad
- red
custom_kind: integración
description: Obtén información sobre los logs del firewall SRX de Juniper
integration_version: 1.0.0
media:
- caption: Firewall SRX de Juniper - Información general
  image_url: images/juniper_srx_firewall_overview.png
  media_type: imagen
- caption: Firewall SRX de Juniper - Logs de sesión
  image_url: images/juniper_srx_firewall_session_logs.png
  media_type: imagen
- caption: Firewall SRX de Juniper - Logs de seguridad
  image_url: images/juniper_srx_firewall_security_logs.png
  media_type: imagen
- caption: Firewall SRX de Juniper - Logs de autenticación
  image_url: images/juniper_srx_firewall_authentication_logs.png
  media_type: imagen
supported_os:
- linux
- windows
- macos
title: Firewall SRX de Juniper
---
## Información general

[Firewall SRX de Juniper](https://www.juniper.net/us/en/products/security/srx-series.html) protege el perímetro de la red, el centro de datos y las aplicaciones de la nube mediante la detección y mitigación de intrusiones, malware y otras amenazas.

Esta integración analiza los siguientes tipos de logs:

- **Logs de sesión**: Rastrea el tráfico de red y las actividades de sesión, incluidas las sesiones iniciadas y denegadas, el tráfico relacionado con aplicaciones y los paquetes perdidos.
- **Logs de seguridad**: Monitoriza eventos de seguridad como detecciones de malware, intentos de intrusión, ataques DoS y actividades de filtrado de contenido.
- **Logs de autenticación**: Captura las actividades de autenticación, incluidos los intentos exitosos y fallidos de inicio de sesión.

Obtén una visibilidad detallada de estos logs con dashboards predefinidos y refuerza la seguridad con reglas de detección precompiladas en Cloud SIEM para una monitorización y respuesta proactivas a las amenazas.

## Configuración

### Instalación

Para instalar la integración del firewall SRX de Juniper, ejecuta el siguiente comando de instalación del Agent en tu terminal. Para obtener más información, consulta la documentación de [Gestión de la integración](https://docs.datadoghq.com/agent/guide/integration-management/?tab=linux#install).

**Nota**: Este step (UI) / paso (generic) no es necesario para el Agent versión >= 7.64.0.

```shell
sudo -u dd-agent -- datadog-agent integration install datadog-juniper_srx_firewall==1.0.0
```

### Configuración

#### Configurar la recopilación de logs

1. La recopilación de logs está desactivada en forma predeterminada en el Datadog Agent. Actívala en `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

1. Añade el siguiente bloque de configuración a tu archivo `juniper_srx_firewall.d/conf.yaml` para empezar a recopilar logs. Consulta el [ejemplo `conf.yaml`](https://github.com/DataDog/integrations-core/blob/master/juniper_srx_firewall/datadog_checks/juniper_srx_firewall/data/conf.yaml.example) para conocer las opciones de configuración disponibles.

   ```yaml
   logs:
     - type: udp
       port: <PORT>
       source: juniper-srx-firewall
       service: juniper-srx-firewall
   ```

   **Nota**:

   - `PORT`: Especifica el puerto UDP en el que escuchará Datadog (predeterminado: 514).
   - No modifiques los valores de `service` y `source`, ya que forman parte integrante del correcto procesamiento del pipeline de logs.

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

#### Configurar el reenvío de mensajes de syslog desde el firewall SRX de Juniper

1. Log en la CLI del firewall SRX de Juniper.

1. Entra en el modo de configuración:

   ```shell
   configure
   ```

1. Para enviar logs al Datadog Agent, ejecuta los siguientes comandos:

   ```shell
   set system syslog host <IP-ADDRESS> any any
   set system syslog host <IP-ADDRESS> port <PORT>
   set system syslog host <IP-ADDRESS> structured-data brief
   ```

   **Nota**:

   - Sustituye `<IP-ADDRESS>` por la dirección IP del Datadog Agent.
   - Sustituye `<PORT>` por el mismo puerto configurado en [Recopilación de logs](https://docs.datadoghq.com/integrations/juniper_srx_firewall/#configure-log-collection).

1. Comprueba si `Security Logging` está activado:

   ```shell
   show security log mode
   ```

   Si está activada, la salida mostrará `mode stream;` o `mode event-stream;`

1. Si `Security Logging` está activado, configura streaming de logs:

   ```shell
   set security log stream <NAME> format sd-syslog
   set security log stream <NAME> category all
   set security log stream <NAME> host <IP-ADDRESS>
   set security log stream <NAME> host port <PORT>
   set security log transport protocol udp
   ```

1. Aplicar y salir de la configuración:

   ```
   commit
   exit
   ```

### Validación

[Ejecuta el subcomando de estado del Agent(https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `juniper_srx_firewall` en la sección **Checks**.

## Datos recopilados

### Log

| Formato                    | Tipos de evento                                      |
| ------------------------- | ------------------------------------------------ |
| Datos estructurados (RFC 5424) | Logs de sesión, logs de seguridad, logs de autenticación |

### Métricas

La integración del firewall SRX de Juniper no incluye ninguna métrica.

### Eventos

La integración del firewall SRX de Juniper no incluye ningún evento.

### Checks de servicio

La integración del firewall SRX de Juniper no incluye ningún check de servicio.

## Solucionar problemas

### Permiso denegado durante la vinculación de puertos

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

### No se recopilan datos

Asegúrate de que la configuración del firewall permita el tráfico a través del puerto configurado.

### Puerto ya utilizado

En los sistemas que ejecutan Syslog, el Agent puede fallar al enlazar con el puerto 514 y mostrar el siguiente error:

```
Can't start UDP forwarder on port 514: listen udp :514: bind: address already in use
```

Este error se produce porque Syslog utiliza el puerto 514 en forma predeterminada.

Para resolverlo:

- Desactiva Syslog, O
- Configura el Agent para escuchar en un puerto diferente, disponible.

Si necesitas más ayuda, ponte en contacto con [asistencia técnica de Datadog](https://docs.datadoghq.com/help/).