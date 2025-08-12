---
app_id: checkpoint-quantum-firewall
app_uuid: 4b6b8ef9-e079-4ee4-877e-8f4aafbf8a1d
assets:
  dashboards:
    'Checkpoint Quantum Firewall: Anti Bot': assets/dashboards/checkpoint_quantum_firewall_anti_bot.json
    'Checkpoint Quantum Firewall: Anti Exploit': assets/dashboards/checkpoint_quantum_firewall_anti_exploit.json
    'Checkpoint Quantum Firewall: Anti Malware': assets/dashboards/checkpoint_quantum_firewall_anti_malware.json
    'Checkpoint Quantum Firewall: Anti Ransomware': assets/dashboards/checkpoint_quantum_firewall_anti_ransomware.json
    'Checkpoint Quantum Firewall: Anti Spam & Email Security': assets/dashboards/checkpoint_quantum_firewall_anti_spam_and_email_security.json
    'Checkpoint Quantum Firewall: Anti Virus': assets/dashboards/checkpoint_quantum_firewall_anti_virus.json
    'Checkpoint Quantum Firewall: Application Control': assets/dashboards/checkpoint_quantum_firewall_application_control.json
    'Checkpoint Quantum Firewall: Audit': assets/dashboards/checkpoint_quantum_firewall_audit.json
    'Checkpoint Quantum Firewall: DLP': assets/dashboards/checkpoint_quantum_firewall_dlp.json
    'Checkpoint Quantum Firewall: Firewall': assets/dashboards/checkpoint_quantum_firewall_firewall.json
    'Checkpoint Quantum Firewall: HTTPS Inspection': assets/dashboards/checkpoint_quantum_firewall_https_inspection.json
    'Checkpoint Quantum Firewall: IPS': assets/dashboards/checkpoint_quantum_firewall_ips.json
    'Checkpoint Quantum Firewall: Identity Awareness': assets/dashboards/checkpoint_quantum_firewall_identity_awareness.json
    'Checkpoint Quantum Firewall: Threat Emulation': assets/dashboards/checkpoint_quantum_firewall_threat_emulation.json
    'Checkpoint Quantum Firewall: URL Filtering': assets/dashboards/checkpoint_quantum_firewall_url_filtering.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 6852689
    source_type_name: checkpoint-quantum-firewall
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- seguridad
- la red
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/checkpoint_quantum_firewall/README.md
display_on_public_website: true
draft: false
git_integration_title: checkpoint_quantum_firewall
integration_id: checkpoint-quantum-firewall
integration_title: Checkpoint Quantum Firewall
integration_version: 1.0.0
is_public: true
manifest_version: 2.0.0
name: checkpoint_quantum_firewall
public_title: Checkpoint Quantum Firewall
short_description: Obtén información sobre los logs de Checkpoint Quantum Firewall
supported_os:
- windows
- linux
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Windows
  - Supported OS::Linux
  - Supported OS::macOS
  - Category::Security
  - Category::Network
  - Offering::Integration
  - Submitted Data Type::Logs
  configuration: README.md#Setup
  description: Obtén información sobre los logs de Checkpoint Quantum Firewall
  media:
  - caption: Checkpoint Quantum Firewall - Audit
    image_url: images/checkpoint_quantum_firewall_audit.png
    media_type: imagen
  - caption: Checkpoint Quantum Firewall - Application Control
    image_url: images/checkpoint_quantum_firewall_application_control.png
    media_type: imagen
  - caption: Checkpoint Quantum Firewall - URL Filtering
    image_url: images/checkpoint_quantum_firewall_url_filtering.png
    media_type: imagen
  - caption: Checkpoint Quantum Firewall - Identity Awareness
    image_url: images/checkpoint_quantum_firewall_identity_awareness.png
    media_type: imagen
  - caption: Checkpoint Quantum Firewall - IPS
    image_url: images/checkpoint_quantum_firewall_ips.png
    media_type: imagen
  - caption: Checkpoint Quantum Firewall - Firewall
    image_url: images/checkpoint_quantum_firewall_firewall.png
    media_type: imagen
  - caption: Checkpoint Quantum Firewall - Threat Emulation
    image_url: images/checkpoint_quantum_firewall_threat_emulation.png
    media_type: imagen
  - caption: Checkpoint Quantum Firewall - Anti Bot
    image_url: images/checkpoint_quantum_firewall_anti_bot.png
    media_type: imagen
  overview: README.md#Overview
  support: README.md#Support
  title: Checkpoint Quantum Firewall
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-core -->
## Información general

[Check Point Next Generation Firewall][1] es una gateway de seguridad que incluye control de aplicaciones y protección IPS, con una gestión integrada de los eventos de seguridad. Entre otras funciones se incluyen Identity Awareness, URL Filtering, Anti-Bot, Anti-Virus y Anti-Spam.

Esta integración ingiere los logs de URL Filtering logs, Anti Bot logs, Application Control, Firewall, Identity Awareness, IPS, Threat Emulation y eventos misceláneos con el pipeline de logs de la integración para enriquecer los logs y normaliza los datos según los atributos estándar de Datadog. Esta integración ofrece visualizaciones de dashboard con información detallada sobre URL permitidas o bloqueadas, detalles de bots, información sobre datos de aplicaciones a las que se ha accedido, eventos generados por el cortafuegos, asignación entre identidades de ordenadores y direcciones IP de máquinas, y mucho más.

## Configuración

### Instalación

Para instalar la integración Checkpoint Quantum Firewall, sigue los pasos que se indican a continuación:

**Nota**: Este paso no es necesario para el Agent versión >= 7.52.0.

1. [Instala][2] la versión 1.0 (`checkpoint_quantum_firewall==1.0.0`).

### Configuración

#### Recopilación de logs

**Checkpoint Quantum Firewall:**

1. La recopilación de logs está desactivada por defecto en el Datadog Agent. Actívala en el archivo `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

2. Añade este bloque de configuración a tu archivo `checkpoint_quantum_firewall.d/conf.yaml` para empezar a recopilar tus logs de Checkpoint Quantum Firewall.

   Consulta el [checkpoint_quantum_firewall.d/conf.yaml de ejemplo][3] para conocer las opciones disponibles de configuración.

   ```yaml
   logs:
     - type: tcp/udp
       port: <PORT>
       service: checkpoint-quantum-firewall
       source: checkpoint-quantum-firewall
   ```

3. [Reinicia el Agent][4].

4. Configura el reenvío de mensajes de Syslog desde Checkpoint Quantum Firewall:
   1. Conéctate a la línea de comandos del servidor de gestión/servidor de log.
   2. Accede al modo experto. Ingresa tus credenciales administrativas (tras introducir las credenciales, el modo experto estará activado).
   3. Para configurar un nuevo objetivo para los logs exportados, introduce los siguientes comandos:
      ```yaml
      cp_log_export add name <Name of Log Exporter Configuration> target-server <HostName or IP address of Target Server> target-port <Port on Target Server> protocol {tcp | udp} format json
      ```
      - En los comandos anteriores, especifica los siguientes detalles del servidor Syslog:

        - name: el nombre del servidor syslog. Por ejemplo: `datadog_syslog`.
        - target-server: el destino al que deseas enviar los logs de Checkpoint Quantum Firewall.
        - target-port: el puerto en el que escucha el servidor syslog (normalmente 514).
        - protocol: el nombre del protocolo, o qué protocolo se utilizará para enviar logs (TCP/UDP).
        - format: el formato debe ser 'json'.
   4. Para guardar y añadir la configuración del servidor syslog, utiliza el siguiente comando:
      ```yaml
      cp_log_export restart name <Name of Log Exporter Configuration>
      ```
   5. Para obtener más información sobre la configuración de syslog, consulta la [documentación oficial de Checkpoint][5].

### Validación

[Ejecuta el subcomando de estado del Agent][6] y busca `checkpoint_quantum_firewall` en la sección Checks.

## Datos recopilados

### Logs

La integración de Checkpoint Quantum Firewall integración recopila logs de Firewall, URL Filtering, IPS, Identity Awareness, Application Control, Threat Emulation, Audit, Anti Ransomware, Anti Spam, Email Security, Anti Exploit, Anti Bot, Anti Virus, HTTPS Inspection, DLP y Anti Malware.

### Métricas

La integración de Checkpoint Quantum Firewall no incluye ninguna métrica.

### Eventos

La integración de Checkpoint Quantum Firewall no incluye ningún evento.

### Checks de servicios

La integración de Checkpoint Quantum Firewall no incluye ningún check de servicio.

## Solucionar problemas

**Checkpoint Quantum Firewall:**

#### Permiso denegado durante la vinculación de puertos

Si ves un error de **Permission denied** (Permiso denegado) mientras vinculas puertos en los logs del Agent, consulta las siguientes instrucciones:

1.  La vinculación a un número de puerto inferior a 1024 requiere permisos elevados. Sigue las instrucciones a continuación para configurarlo.

    - Concede acceso al puerto mediante el comando `setcap`:

      ```
      sudo setcap CAP_NET_BIND_SERVICE=+ep /opt/datadog-agent/bin/agent/agent
      ```

    - Comprueba que la configuración es correcta ejecutando el comando `getcap`:

      ```
      sudo getcap /opt/datadog-agent/bin/agent/agent
      ```

      Con el resultado esperado:

      ```
      /opt/datadog-agent/bin/agent/agent = cap_net_bind_service+ep
      ```

      **Nota**: Vuelve a ejecutar este comando `setcap` cada vez que actualices el Agent.

2.  [Reinicia el Agent][4].

#### No se recopilan datos

Asegúrate de que se evita el tráfico del puerto configurado si el cortafuegos está activado.

#### Puerto ya utilizado

Si aparece el error **Port <PORT-NO\> Already in Use** (Puerto <PORT-NO\> ya utilizado), consulta las siguientes instrucciones. El ejemplo siguiente es para PORT-NO = 514:

En los sistemas que utilizan Syslog, si el Agent escucha logs de Checkpoint Quantum Firewall en el puerto 514, puede aparecer el siguiente error en los logs del Agent: `Can't start UDP forwarder on port 514: listen udp :514: bind: address already in use`.

Este error se produce porque, por defecto, Syslog escucha en el puerto 514. Para resolver este error, sigue **uno** de los pasos siguientes:

- Desactivar Syslog
- Configurar el Agent para escuchar en un puerto diferente, disponible

Para obtener más ayuda, ponte en contacto con el [soporte de Datadog][7].

[1]: https://www.checkpoint.com/quantum/next-generation-firewall/
[2]: https://docs.datadoghq.com/es/agent/guide/integration-management/?tab=linux#install
[3]: https://github.com/DataDog/integrations-core/blob/master/checkpoint_quantum_firewall/datadog_checks/checkpoint_quantum_firewall/data/conf.yaml.example
[4]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://sc1.checkpoint.com/documents/R81.20/WebAdminGuides/EN/CP_R81.20_LoggingAndMonitoring_AdminGuide/Content/Topics-LMG/Log-Exporter-Configuration-in-CLI-Basic.htm?tocpath=Log%20Exporter%7CConfiguring%20Log%20Exporter%20in%20CLI%7C_____1
[6]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[7]: https://docs.datadoghq.com/es/help/