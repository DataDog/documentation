---
app_id: suricata
app_uuid: d5d0689e-8684-4663-b31b-d1947b7ccefd
assets:
  dashboards:
    Suricata - Alert: assets/dashboards/suricata_alert.json
    Suricata - Anomaly: assets/dashboards/suricata_anomaly.json
    Suricata - DHCP: assets/dashboards/suricata_dhcp.json
    Suricata - DNs: assets/dashboards/suricata_dns.json
    Suricata - Flow: assets/dashboards/suricata_flow.json
    Suricata - Network Protocols: assets/dashboards/suricata_network_protocols.json
    Suricata - Overview: assets/dashboards/suricata_overview.json
    Suricata - SMB (DCERPC, NTLMSSP, Kerberos): assets/dashboards/suricata_smb.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 17124993
    source_type_name: suricata
  logs:
    source: suricata
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
- https://github.com/DataDog/integrations-core/blob/master/suricata/README.md
display_on_public_website: true
draft: false
git_integration_title: suricata
integration_id: suricata
integration_title: suricata
integration_version: 2.0.0
is_public: true
manifest_version: 2.0.0
name: suricata
public_title: suricata
short_description: Obtén información de logs de Suricata.
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
  description: Obtén información de logs de Suricata.
  media:
  - caption: 'Suricata: información general'
    image_url: images/suricata_overview.png
    media_type: imagen
  - caption: 'Suricata: alerta'
    image_url: images/suricata_alert.png
    media_type: imagen
  - caption: 'Suricata: anomalía'
    image_url: images/suricata_anomaly.png
    media_type: imagen
  - caption: 'Suricata: flujo'
    image_url: images/suricata_flow.png
    media_type: imagen
  - caption: 'Suricata: DNS'
    image_url: images/suricata_dns.png
    media_type: imagen
  - caption: 'Suricata: DHCP'
    image_url: images/suricata_dhcp.png
    media_type: imagen
  - caption: 'Suricata: protocolos de red'
    image_url: images/suricata_network_protocols.png
    media_type: imagen
  - caption: 'Suricata: SMB (DCERPC, NTLMSSP, Kerberos)'
    image_url: images/suricata_smb.png
    media_type: imagen
  overview: README.md#Overview
  support: README.md#Support
  title: suricata
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-core -->
## Información general

[Suricata][1] es un software de análisis de red y detección de amenazas de código abierto y alto rendimiento utilizado por la mayoría de las organizaciones públicas y privadas, e integrado por los principales proveedores para proteger sus activos.

Este integración proporciona enriquecimiento y visualización para tipos de logs Alert, Anomaly, HTTP, DNS, FTP, FTP_DATA, TLS, TFTP, SMB, SSH, Flow, RDP, DHCP y ARP. Ayuda a visualizar información detallada sobre alertas, anomalías, conexiones fr red, DNS y actividad DHCP, así como análisis detallados de protocolos de red en los dashboards predefinidos de la integración.

## Configuración

### Instalación

Para instalar la integración de Suricata, ejecuta el siguiente comando de instalación del Agent y sigue los pasos que se indican a continuación. Para obtener más información, consulta la documentación de [Gestión de integraciones][2].

**Nota**: Este paso no es necesario para las versiones del Agent >= 7.57.0.

Para Linux, ejecuta:
  ```shell
  sudo -u dd-agent -- datadog-agent integration install datadog-suricata==1.0.0
  ```

### Configuración

#### Recopilación de logs

1. La recopilación de logs está desactivada por defecto en el Datadog Agent. Actívala en el archivo `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

2. Añade este bloque de configuración a tu archivo `suricata.d/conf.yaml` para empezar a recopilar tus logs de Suricata.

   Consulta el [suricata.d/conf.yaml de ejemplo][3] para conocer las opciones disponibles de configuración.

   ```yaml
   logs:
     - type: file
       path: /var/log/suricata/eve.json
       service: suricata
       source: suricata
   ```
   **Nota**: Asegúrate de tener habilitado el registro de salida `eve-log` en el archivo `suricata.yaml` de la aplicación de Suricata, y de haber abordado los siguientes puntos:
   1. En el archivo `suricata.yaml`, mantén el parámetro `filetype` como `regular` en las configuraciones `eve-log`.
   2. La ruta predeterminada de los archivos de salida de Suricata es `/var/log/suricata` y el nombre de archivo predeterminado es `eve.json`. Si has cambiado la ruta y el nombre de archivo predeterminados, actualiza el parámetro `path` en tu archivo `conf.yaml` en consecuencia.

3. [Reinicia el Agent][4].

### Validación

[Ejecuta el subcomando de estado del Agent][5] y busca `suricata` en la sección Checks.

## Datos recopilados

### Logs

La integración de Suricata recopila los siguientes tipos de log.

| Formato     | Tipos de evento    |
| ---------  | -------------- |
| JSON | alert, anomaly, http, dns, ftp, ftp_data, tls. tftp, smb, ssh, flow, rdp, dhcp, arp|

### Métricas

La integración de Suricata no incluye ninguna métrica.

### Eventos

La integración de Suricata no incluye ningún evento.

### Checks de servicio

La integración de Suricata no incluye ningún check de servicio.

## Solucionar problemas

Si ves un error de **Permission denied** (Permiso denegado) durante la monitorización de los archivos de log, debes dar al usuario el permiso de lectura `dd-agent` sobre ellos.

  ```shell
  sudo chown -R dd-agent:dd-agent /var/log/suricata/eve.json
  ```

Si necesitas más ayuda, ponte en contacto con el [soporte de Datadog][6].

[1]: https://suricata.io/
[2]: https://docs.datadoghq.com/es/agent/guide/integration-management/?tab=linux#install
[3]: https://github.com/DataDog/integrations-core/blob/master/suricata/datadog_checks/suricata/data/conf.yaml.example
[4]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[6]: https://docs.datadoghq.com/es/help/