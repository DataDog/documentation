---
app_id: juniper-srx-firewall
app_uuid: 0451c670-94dc-490e-86b7-b23b5a7cdceb
assets:
  dashboards:
    Juniper SRX Firewall - Authentication Logs: assets/dashboards/juniper_srx_firewall_authentication_logs.json
    Juniper SRX Firewall - Overview: assets/dashboards/juniper_srx_firewall_overview.json
    Juniper SRX Firewall - Security Logs: assets/dashboards/juniper_srx_firewall_security_logs.json
    Juniper SRX Firewall - Session Logs: assets/dashboards/juniper_srx_firewall_session_logs.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    source_type_id: 40625309
    source_type_name: Juniper SRX Firewall
  logs:
    source: juniper-srx-firewall
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- recopilación de logs
- seguridad
- red
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/juniper_srx_firewall/README.md
display_on_public_website: true
draft: false
git_integration_title: juniper_srx_firewall
integration_id: juniper-srx-firewall
integration_title: Juniper SRX Firewall
integration_version: 1.0.0
is_public: true
manifest_version: 2.0.0
name: juniper_srx_firewall
public_title: Juniper SRX Firewall
short_description: Obtener información sobre logs de Juniper SRX Firewall
supported_os:
- linux
- windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Sistema operativo compatible::macOS
  - Categoría::Recopilación de logs
  - Categoría::Seguridad
  - Categoría::Red
  - Oferta::Integración
  - Tipo de datos enviados::Logs
  configuration: README.md#Configuración
  description: Obtener información sobre logs de Juniper SRX Firewall
  media:
  - caption: Juniper SRX Firewall - Información general
    image_url: images/juniper_srx_firewall_overview.png
    media_type: imagen
  - caption: Juniper SRX Firewall - Logs de sesión
    image_url: images/juniper_srx_firewall_session_logs.png
    media_type: imagen
  - caption: Juniper SRX Firewall - Logs de seguridad
    image_url: images/juniper_srx_firewall_security_logs.png
    media_type: imagen
  - caption: Juniper SRX Firewall - Logs de autenticación
    image_url: images/juniper_srx_firewall_authentication_logs.png
    media_type: imagen
  overview: README.md#Información general
  support: README.md#Soporte
  title: Juniper SRX Firewall
---

<!--  CON ORIGEN EN https://github.com/DataDog/integrations-core -->
## Información general

[Juniper SRX Firewall][1] protege tu borde de red, centro de datos y aplicaciones de nube mediante la detección y mitigación de intrusiones, software malicioso y otras amenazas.

Esta integración analiza los siguientes tipos de logs:

- **Logs de sesión**: Realiza un seguimiento del tráfico de red y las actividades de sesión, incluidas las sesiones iniciadas y denegadas, el tráfico relacionado con aplicaciones y los paquetes descartados.
- **Logs de seguridad**: Monitoriza eventos de seguridad como detecciones de software malicioso, intentos de intrusión, ataques DoS y actividades de filtrado de contenidos.
- **Logs de autenticación**: Captura las actividades de autenticación, incluidos los intentos exitosos y fallidos de inicio de sesión.

Obtén una visibilidad detallada de estos logs mediante dashboards predefinidos y refuerza la seguridad con reglas de detección Cloud SIEM preconfiguradas para una monitorización y una respuesta proactiva en caso de amenazas.

## Configuración

### Instalación

Para instalar la integración Juniper SRX Firewall, ejecuta el siguiente comando de instalación del Agent en tu terminal. Para obtener más información, consulta la documentación [Gestión de integraciones][2].

**Nota**: Este paso no es necesario para versiones >= 7.64.0 del Agent.

```shell
sudo -u dd-agent -- datadog-agent integration install datadog-juniper_srx_firewall==1.0.0
```

### Configuración

#### Configurar la recopilación de log

1. La recopilación de logs está desactivada por defecto en el Datadog Agent. Actívala en el archivo `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

2. Añade el siguiente bloque de configuración a tu archivo `juniper_srx_firewall.d/conf.yaml` para empezar a recopilar logs. Consulta el [ejemplo `conf.yaml`][3] para ver las opciones de configuración disponibles.

   ```yaml
   logs:
     - type: udp
       port: <PORT>
       source: juniper-srx-firewall
       service: juniper-srx-firewall
   ```

   **Nota**:

   - `PORT`: Especifica el puerto UDP en el que escuchará Datadog (por defecto: 514).
   - No modifiques los valores de `service` y `source`, ya que forman parte integrante del correcto procesamiento de pipelines de logs.

3. [Reinicia el Agent][4].

#### Configurar el reenvío de mensajes Syslog desde Juniper SRX Firewall

1. Inicia sesión en la CLI de Juniper SRX Firewall.

2. Ingresa en el modo de configuración:
   ```shell
   configure
   ```

3. Para enviar logs al Datadog Agent, ejecute los siguientes comandos:
   ```shell
   set system syslog host <IP-ADDRESS> any any
   set system syslog host <IP-ADDRESS> port <PORT>
   set system syslog host <IP-ADDRESS> structured-data brief
   ```
   **Nota**:
   - Sustituye `<IP-ADDRESS>` por la dirección IP del Datadog Agent.
   - Sustituye `<PORT>` por el mismo puerto configurado en [Recopilación de logs][5].

4. Comprueba si `Security Logging` está activado:
   ```shell
   show security log mode
   ```
   Si está activado, el resultado mostrará `mode stream;` o `mode event-stream;`

5. Si `Security Logging` está activado, configura la transmisión de logs:
   ```shell
   set security log stream <NAME> format sd-syslog
   set security log stream <NAME> category all
   set security log stream <NAME> host <IP-ADDRESS>
   set security log stream <NAME> host port <PORT>
   set security log transport protocol udp
   ```

6. Aplica los cambios y sal de la configuración:
   ```
   commit
   exit
   ```

### Validación

[Ejecuta el subcomando de estado del Agent][6] y busca `juniper_srx_firewall` en la sección Checks.

## Datos recopilados

### Log

| Formato                    | Tipos de evento                                      |
| ------------------------- | ------------------------------------------------ |
| Structured-Data(RFC 5424) | Logs de sesión, logs de seguridad, logs de autenticación |

### Métricas

La integración Juniper SRX Firewall no incluye métricas.

### Eventos

La integración Juniper SRX Firewall no incluye eventos.

### Checks de servicio

La integración Juniper SRX Firewall no incluye checks de servicios.

## Solucionar problemas

### Permiso denegado durante la vinculación de puertos

Si aparece un error de **Permission denied** (Permiso denegado) al vincular puertos en los logs del Agent:

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

### No se recopilan datos

Asegúrate de que la configuración del cortafuegos permite el tráfico a través del puerto configurado.

### Puerto ya utilizado

En los sistemas que ejecutan Syslog, el Agent puede fallar al intentar vincularse con el puerto 514 y mostrar el siguiente error: 

    Can't start UDP forwarder on port 514: listen udp :514: bind: address already in use

Este error se produce porque Syslog utiliza el puerto 514 por defecto. 

Para resolverlo:
  - Desactivar Syslog, O
  - Configura el Agent para escuchar en un puerto diferente, disponible.

Para obtener más ayuda, ponte en contacto con el [soporte de Datadog][7].

[1]: https://www.juniper.net/us/en/products/security/srx-series.html
[2]: https://docs.datadoghq.com/es/agent/guide/integration-management/?tab=linux#install
[3]: https://github.com/DataDog/integrations-core/blob/master/juniper_srx_firewall/datadog_checks/juniper_srx_firewall/data/conf.yaml.example
[4]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/es/integrations/juniper_srx_firewall/#configure-log-collection
[6]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[7]: https://docs.datadoghq.com/es/help/