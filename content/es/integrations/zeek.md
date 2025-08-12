---
app_id: zeek
app_uuid: 81ba5f4a-0e85-48c3-9ba3-2e5ea37b1ed2
assets:
  dashboards:
    Corelight Suricata: assets/dashboards/corelight_suricata.json
    Zeek - Connections: assets/dashboards/zeek_connections.json
    Zeek - DHCP: assets/dashboards/zeek_dhcp.json
    Zeek - DNS: assets/dashboards/zeek_dns.json
    Zeek - Datared: assets/dashboards/zeek_datared.json
    Zeek - Detection: assets/dashboards/zeek_detection.json
    Zeek - Diagnostics: assets/dashboards/zeek_diagnostics.json
    Zeek - Files: assets/dashboards/zeek_files.json
    Zeek - Miscellaneous: assets/dashboards/zeek_miscellaneous.json
    Zeek - Network Observations: assets/dashboards/zeek_network_observations.json
    Zeek - Network Protocols: assets/dashboards/zeek_network_protocols.json
    Zeek - Network Protocols (NTP, SNMP, SSL): assets/dashboards/zeek_network_protocols_ntp_snmp_ssl.json
    Zeek - Syslog: assets/dashboards/zeek_syslog.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 6777560
    source_type_name: zeek
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- recopilación de logs
- seguridad
- la red
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/zeek/README.md
display_on_public_website: true
draft: false
git_integration_title: zeek
integration_id: zeek
integration_title: Zeek
integration_version: 1.0.0
is_public: true
manifest_version: 2.0.0
name: zeek
public_title: Zeek
short_description: Obtén información sobre los logs de Zeek. Conéctate a Cloud SIEM
supported_os:
- linux
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Category::Log Collection
  - Category::Security
  - Category::Network
  - Offering::Integration
  - Submitted Data Type::Logs
  configuration: README.md#Setup
  description: Obtén información sobre los logs de Zeek. Conéctate a Cloud SIEM
  media:
  - caption: 'Zeek: conexiones'
    image_url: images/zeek_connections.png
    media_type: imagen
  - caption: 'Zeek: DHCP'
    image_url: images/zeek_dhcp.png
    media_type: imagen
  - caption: 'Zeek: DNS'
    image_url: images/zeek_dns.png
    media_type: imagen
  - caption: 'Zeek: protocolos de red'
    image_url: images/zeek_network_protocols.png
    media_type: imagen
  - caption: 'Zeek: detección'
    image_url: images/zeek_detection.png
    media_type: imagen
  - caption: 'Zeek: diagnóstico'
    image_url: images/zeek_diagnostics.png
    media_type: imagen
  - caption: 'Zeek: archivos'
    image_url: images/zeek_files.png
    media_type: imagen
  - caption: 'Zeek: observaciones de red'
    image_url: images/zeek_network_observations.png
    media_type: imagen
  overview: README.md#Overview
  support: README.md#Support
  title: Zeek
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-core -->
## Información general

[Zeek][1] es una plataforma de monitorización de la seguridad de red. Interpreta lo que ve y crea logs de transacciones y contenido de archivos compactos y de alta fidelidad. Puede crear resultados totalmente personalizados, adecuados para su revisión manual en disco o en una herramienta más fácil de utilizar por los analistas, como un sistema de gestión de la seguridad y la información de eventos (SIEM).

Esta integración ingiere los siguientes logs:
- Logs de conexión
- Logs de DNS y DHCP
- Protocolos de red
- Archivos
- Detecciones
- Miscelánea de tipos de eventos

Visualiza información detallada sobre las conexiones de red, la actividad DNS y DHCP, el análisis detallado de protocolos de red, el análisis de archivos y certificados, la detección y observación de la seguridad y la monitorización del cumplimiento de normativas a través de los dashboards predefinidos.

## Configuración

### Instalación

Para instalar la integración de Zeek, ejecuta el siguiente comando de instalación del Agent y los pasos que se indican a continuación. Para obtener más información, consulta la documentación de [Gestión de la integración][2].

**Nota**: Este paso no es necesario para el Agent versión >= 7.52.0.

Comando de Linux
  ```shell
  sudo -u dd-agent -- datadog-agent integration install datadog-zeek==1.0.0
  ```

#### Zeek de código abierto
1. [Instala el Agent][3] en tu máquina de Zeek.
2. Instala el [complemento de Corelight Zeek][4] para el registro de JSON.
    ```
    /opt/zeek/bin/zkg install corelight/json-streaming-logs
    ```
3. Carga paquetes ZKG.
    ```
    echo -e "\n# Load ZKG packages\n@load packages" >> /opt/zeek/share/zeek/site/local.zeek
    ```
4. Reinicia Zeek.
    ```
    /opt/zeek/bin/zeekctl install
    ```
    ```
    /opt/zeek/bin/zeekctl restart
    ```

#### Corelight Zeek
* Debes tener instalado y funcionando el [Datadog Agent][3].

### Configuración

#### Zeek de código abierto
1. La recopilación de logs está desactivada por defecto en el Datadog Agent. Actívala en `datadog.yaml`:
    ```yaml
    logs_enabled: true
    ```

2. Añade este bloque de configuración a tu archivo `zeek.d/conf.yaml` para empezar a recopilar tus logs de Zeek.

    Consulta el [zeek.d/conf.yaml de ejemplo][5] para conocer las opciones disponibles de configuración.

   ```yaml
    logs:
    - type: file
      path: /opt/zeek/logs/current/*.log
      exclude_paths:
        - /opt/zeek/logs/current/*.*.log
      service: zeek
      source: zeek
   ```

    **Nota**: Incluye las rutas de los archivos de log en el parámetro `exclude_paths` para evitar la ingesta de archivos de log no compatibles o no deseados durante el proceso de monitorización.


   ```yaml
    # Example of excluded paths
    exclude_paths:
      - /opt/zeek/logs/current/ntlm.log
      - /opt/zeek/logs/current/radius.log
      - /opt/zeek/logs/current/rfb.log
   ```

3. [Reinicia el Agent][6].

#### Corelight Zeek
1. La recopilación de logs está desactivada por defecto en el Datadog Agent. Actívala en datadog.yaml:
    ```yaml
    logs_enabled: true
    ```

2. Añade este bloque de configuración a tu archivo `zeek.d/conf.yaml` para empezar a recopilar tus logs.
    ```yaml
    logs:
    - type: tcp
      port: <PORT>
      service: corelight
      source: zeek
    ```

3. [Reinicia el Agent][6].

4. Configuración del reenvío de mensajes de Syslog desde corelight
    1. Abre un navegador web y navega hasta la dirección IP o el nombre de host de tu sensor de Corelight.
    2. Inicia sesión con tus credenciales administrativas.
    3. Navega hasta la página de configuración de Zeek. La ruta exacta puede variar dependiendo de la versión de firmware de tu sensor.
    4. Busca opciones relacionadas con "Zeek" o "Registro". Las rutas comunes incluyen:
      - Configuración > Registro
      - Configuración > Zeek > Registro
    5. Localiza la opción para habilitar la salida de syslog para logs de Zeek y selecciona la casilla de verificación o el conmutador para activarla.
    6. Especifica los detalles del servidor de Syslog. Proporciona la siguiente información:
       - **Dirección IP del servidor de syslog**: el destino al que deseas enviar los logs de Zeek.
       - **Puerto de syslog**: el puerto en el que escucha el servidor de syslog (normalmente 514).
       - **Instalación**: la instalación de syslog a utilizar.
       - **Nivel de gravedad**: la gravedad mínima de eventos a enviar.
    7. Pulsa el botón **Save** (Guardar) o **Apply** (Aplicar) para confirmar los cambios en la configuración.


### Validación

[Ejecuta el subcomando de estado de Agent[7] y busca `zeek` en la sección de checks.

## Datos recopilados

### Logs

La integración de Zeek recopila los siguientes tipos de logs.

| Formato     | Tipos de eventos    |
| ---------  | -------------- |
| Zeek de código abierto: formato JSON | conn, dhcp, dns, ftp, http, ntp, rdp, smtp, snmp, socks, ssh, ssl, syslog, tunnel, files, pe, intel, notice, signatures, traceroute, known-certs, known-modbus, known-services, known-hosts, software, x509, dpd, weird, captureloss, reporter, ldap, ldap-search, smb-files, smb-mappings |
| Corelight Zeek: formato Syslog RFC 3164 (legacy) | conn, dhcp, dns, ftp, http, ntp, rdp, smtp, snmp, socks, ssh, ssl, syslog, tunnel, files, pe, intel, notice, signatures, traceroute, known-certs, known-modbus, known-services, known-hosts, software, x509, dpd, weird, captureloss, reporter, ldap, ldap-search, smb-files, smb-mappings, conn-long, conn-red, encrypted-dns, generic-dns-tunnels, smtp-links, suricata-corelight |

### Métricas

La integración de Zeek no incluye ninguna métrica.

### Eventos

La integración de Zeek no incluye ningún evento.

### Checks de servicio

La integración de Zeek no incluye ningún check de servicio.

## Solucionar problemas

### Zeek de código abierto:

Si ves un error de **Permission denied** (Permiso denegado) durante la monitorización de los archivos de log, debes dar al usuario el permiso de lectura `dd-agent` sobre ellos.

  ```shell
  sudo chown -R dd-agent:dd-agent /opt/zeek/current/
  ```

### Corelight Zeek:

**Permiso denegado mientras se vincula el puerto:**

Si ves un error de **Permission denied** (Permiso denegado) mientras vinculas puertos en logs del Agent, consulta las siguientes instrucciones:

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

3. [Reinicia el Agent][6].

**No se están recopilando datos:**

Asegúrate de que se evita el tráfico del puerto configurado si el cortafuegos está activado.

**Puerto ya en uso:**

Si aparece el error **Port <PORT-NO\> Already in Use**, consulte las siguientes instrucciones. El ejemplo siguiente es para PORT-NO = 514:

En los sistemas que utilizan Syslog, si el Agent escucha logs de Zeek en el puerto 514, puede aparecer el siguiente error en los logs del Agent: `Can't start UDP forwarder on port 514: listen udp :514: bind: address already in use`.

Este error se produce porque, por defecto, Syslog escucha en el puerto 514. Para resolver este error, sigue **uno** de los pasos siguientes:
- Desactivar Syslog
- Configurar el Agent para escuchar en un puerto diferente, disponible

Si necesitas más ayuda, ponte en contacto con el [soporte de Datadog][8].

[1]: https://zeek.org/
[2]: https://docs.datadoghq.com/es/agent/guide/integration-management/?tab=linux#install
[3]: https://docs.datadoghq.com/es/agent/
[4]: https://github.com/corelight/json-streaming-logs
[5]: https://github.com/DataDog/integrations-core/blob/master/cisco_secure_firewall/datadog_checks/cisco_secure_firewall/data/conf.yaml.example
[6]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[8]: https://docs.datadoghq.com/es/help/