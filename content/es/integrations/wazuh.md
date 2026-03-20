---
app_id: wazuh
app_uuid: 5b1e3f2f-419d-4d9d-bb00-002b58e28835
assets:
  dashboards:
    Wazuh - Cloud Security: assets/dashboards/wazuh_cloud_security.json
    Wazuh - File Integrity Monitoring: assets/dashboards/wazuh_file_integrity_monitoring.json
    Wazuh - MITRE ATT&CK: assets/dashboards/wazuh_MITRE_ATT&CK.json
    Wazuh - Malware Detection: assets/dashboards/wazuh_malware_detection.json
    Wazuh - Overview: assets/dashboards/wazuh_overview.json
    Wazuh - Security Operations: assets/dashboards/wazuh_security_operations.json
    Wazuh - System: assets/dashboards/wazuh_system.json
    Wazuh - Vulnerability Detection: assets/dashboards/wazuh_vulnerability_detection.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 26101213
    source_type_name: Wazuh
  logs:
    source: wazuh
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- events
- recopilación de logs
- seguridad
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/wazuh/README.md
display_on_public_website: true
draft: false
git_integration_title: wazuh
integration_id: wazuh
integration_title: Wazuh
integration_version: 1.0.0
is_public: true
manifest_version: 2.0.0
name: wazuh
public_title: Wazuh
short_description: Obtén información sobre las alertas de Wazuh.
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
  - Category::Alerting
  - Category::Log Collection
  - Category::Security
  - Offering::Integration
  - Submitted Data Type::Logs
  configuration: README.md#Setup
  description: Obtén información sobre las alertas de Wazuh.
  media:
  - caption: 'Wazuh: seguridad en la nube'
    image_url: images/wazuh-cloud-security.png
    media_type: imagen
  - caption: 'Wazuh: monitorización de la integridad de los archivos'
    image_url: images/wazuh-file-integrity-monitoring.png
    media_type: imagen
  - caption: 'Wazuh: detección de malware'
    image_url: images/wazuh-malware-detection.png
    media_type: imagen
  - caption: 'Wazuh: MITRE ATT&CK'
    image_url: images/wazuh-mitre-attack.png
    media_type: imagen
  - caption: 'Wazuh: información general'
    image_url: images/wazuh-overview.png
    media_type: imagen
  - caption: 'Wazuh: operaciones de seguridad'
    image_url: images/wazuh-security-operations.png
    media_type: imagen
  - caption: 'Wazuh: sistema'
    image_url: images/wazuh-system.png
    media_type: imagen
  - caption: 'Wazuh: detección de vulnerabilidades'
    image_url: images/wazuh-vulnerability-detection.png
    media_type: imagen
  overview: README.md#Overview
  support: README.md#Support
  title: Wazuh
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-core -->


## Información general

[Wazuh][1] proporciona una solución de seguridad integral que detecta, analiza y responde a las amenazas a través de múltiples capas de infraestructura de TI. Wazuh recopila telemetría de endpoints, dispositivos de red, cargas de trabajo en la nube, APIs de terceros y otras fuentes para la monitorización de una seguridad unificada y la protección.

Esta integración analiza los siguientes tipos de logs:
- **vulnerability-detector**: eventos de vulnerabilidad generados por Wazuh.
- **malware-detector**: eventos de rootcheck generados por Wazuh para detectar cualquier malware en el sistema.
- **file-integrity-monitoring**: eventos relacionados con los cambios de archivos como permiso, contenido, propiedad y atributos.
- **docker**: eventos de actividad de contenedor de Docker.
- **github**: eventos de logs de auditoría de organizaciones de github.
- **google-cloud**: eventos de seguridad relacionados con los servicios de la plataforma de Google Cloud.
- **amazon**: eventos de seguridad de servicios de Amazon AWS.
- **office365**: eventos de seguridad relacionados con office365.
- **system**: eventos de servicios como FTPD, PAM, SSHD, syslog, Windows, dpkg, yum, sudo, su, wazuh y ossec junto con eventos internos.

Visualiza información detallada de estos logs a través de dashboards predefinidos.

## Configuración

### Instalación

Para instalar la integración de Wazuh, ejecuta el siguiente comando de instalación del Agent y los pasos que se indican a continuación. Para más información, consulta la documentación de [gestión de la integración][2].

**Nota**: Este paso no es necesario para la versión 7.58.0 o posterior del Agent.

Comando de Linux
  ```shell
  sudo -u dd-agent -- datadog-agent integration install datadog-wazuh==1.0.0
  ```

### Configuración

#### Recopilación de logs

1. La recopilación de logs está desactivada por defecto en el Datadog Agent. Actívala en `datadog.yaml`:

    ```yaml
    logs_enabled: true
    ```
2. Añade este bloque de configuración a tu archivo `wazuh.d/conf.yaml` para empezar a recopilar tus logs.

    Utiliza el método UDP para recopilar los datos de las alertas de Wazuh.
    Ve el [wazuh.d/conf.yaml][3] de ejemplo para conocer las opciones disponibles de configuración.

    ```yaml
      logs:
      - type: udp
        port: <PORT>
        source: wazuh
        service: wazuh
    ```
    **Nota**: Es recomendado no cambiar los valores de servicio y fuente, ya que estos parámetros son parte integral de la operación del pipeline.

3. [Reinicia el Agent][4].

#### Configurar el reenvío de mensajes syslog desde Wazuh

  1. Inicia sesión en la interfaz de usuario de Wazuh. Navega hasta el menú de la izquierda.
  2. Ve a **Server management** > **Settings** (Gestión del servidor > Configuración).
  3. Haz clic en **Edit configuration** (Editar configuración).
  4. Añade el siguiente bloque de configuración:

      En este ejemplo, todas las alertas se envían a 1.1.1.1 en el puerto 8080 en formato JSON.
      ```xml
        <syslog_output>
          <server>1.1.1.1</server>
          <port>8080</port>
          <format>json</format>
        </syslog_output>
      ```

      * La etiqueta `server` debe contener la dirección IP donde se está ejecutando tu Datadog Agent.

      * La etiqueta `port` debe contener el puerto donde tu Datadog Agent está escuchando.

      Nota: El uso del formato JSON es obligatorio, ya que el pipeline de Wazuh analiza logs en formato JSON solamente.
  5. Pulsa el botón **Save** (Guardar).
  6. Después de guardar, haz clic en el botón **Restart Manager** (Reiniciar administrador).


### Validación

[Ejecuta el subcomando de estado del Agent][5] y busca `wazuh` en la sección Checks.

## Datos recopilados

### Log

| Formato     | Tipos de evento    |
| ---------  | -------------- |
| JSON | vulnerability-detector, file-integrity-monitoring, malware-detector, github, docker, amazon, office365, google-cloud, system y otros |

### Métricas

La integración de Wazuh no incluye ninguna métrica.

### Eventos

La integración de Wazuh no incluye ningún evento.

### Checks de servicio

La integración de Wazuh no incluye ningún check de servicio.

## Solucionar problemas

**Permission denied while port binding** (Permiso denegado en la vinculación de puertos):

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

A continuación, se explica cómo solucionar algunos posibles problemas.

**Data is not being collected** (No se están recopilando datos):

Asegúrate de que se evita el tráfico del puerto configurado si el firewall está activado.

**Port already in use** (Puerto ya en uso):

Si aparece el error **Port <PORT_NUMBER> Already in Use** (Puerto n.° ya en uso), consulta las siguientes instrucciones. El ejemplo siguiente es para el puerto 514:

- En los sistemas que utilizan Syslog, si el Agent escucha logs de Wazuh en el puerto 514, puede aparecer el siguiente error en los logs del Agent: `Can't start UDP Forwarder on port 514: listen udp :514: bind: address already in use`. Este error ocurre porque, por defecto, Syslog escucha en el puerto 514. Para resolver este error, toma **uno** de los siguientes pasos: 
    - Desactiva Syslog.
    - Configura el Agent para escuchar en un puerto diferente, disponible.


Para obtener más ayuda, ponte en contacto con el [soporte de Datadog][6].

[1]: https://wazuh.com/
[2]: https://docs.datadoghq.com/es/agent/guide/integration-management/?tab=linux#install
[3]: https://github.com/DataDog/integrations-core/blob/master/wazuh/datadog_checks/wazuh/data/conf.yaml.example
[4]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[6]: https://docs.datadoghq.com/es/help/