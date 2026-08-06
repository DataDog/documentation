---
app_id: symantec-endpoint-protection
app_uuid: e334ac09-0038-408b-8666-cba88c3217e6
assets:
  dashboards:
    Symantec Endpoint Protection - Application Control: assets/dashboards/symantec_endpoint_protection_application_control.json
    Symantec Endpoint Protection - Overview: assets/dashboards/symantec_endpoint_protection_overview.json
    Symantec Endpoint Protection - Risk: assets/dashboards/symantec_endpoint_protection_risk.json
    Symantec Endpoint Protection - Scan: assets/dashboards/symantec_endpoint_protection_scan.json
    Symantec Endpoint Protection - Security: assets/dashboards/symantec_endpoint_protection_security.json
    Symantec Endpoint Protection - System: assets/dashboards/symantec_endpoint_protection_system.json
    Symantec Endpoint Protection - Traffic: assets/dashboards/symantec_endpoint_protection_traffic.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 26728495
    source_type_name: Symantec Endpoint Protection
  logs:
    source: symantec-endpoint-protection
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- recopilación de logs
- seguridad
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/symantec_endpoint_protection/README.md
display_on_public_website: true
draft: false
git_integration_title: symantec_endpoint_protection
integration_id: symantec-endpoint-protection
integration_title: Symantec Endpoint Protection
integration_version: 1.0.0
is_public: true
manifest_version: 2.0.0
name: symantec_endpoint_protection
public_title: Symantec Endpoint Protection
short_description: Obtén información sobre los logs de Symantec Endpoint Protection.
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
  - Offering::Integration
  - Submitted Data Type::Logs
  configuration: README.md#Setup
  description: Obtén información sobre los logs de Symantec Endpoint Protection.
  media:
  - caption: 'Symantec Endpoint Protection: información general'
    image_url: images/symantec_endpoint_protection_overview.png
    media_type: imagen
  - caption: 'Symantec Endpoint Protection: análisis'
    image_url: images/symantec_endpoint_protection_scan.png
    media_type: imagen
  - caption: 'Symantec Endpoint Protection: riesgos'
    image_url: images/symantec_endpoint_protection_risk.png
    media_type: imagen
  - caption: 'Symantec Endpoint Protection: control de aplicaciones'
    image_url: images/symantec_endpoint_protection_application_control.png
    media_type: imagen
  - caption: 'Symantec Endpoint Protection: seguridad'
    image_url: images/symantec_endpoint_protection_security.png
    media_type: imagen
  - caption: 'Symantec Endpoint Protection: sistema'
    image_url: images/symantec_endpoint_protection_system.png
    media_type: imagen
  - caption: 'Symantec Endpoint Protection: tráfico'
    image_url: images/symantec_endpoint_protection_traffic.png
    media_type: imagen
  overview: README.md#Overview
  support: README.md#Support
  title: Symantec Endpoint Protection
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-core -->
## Información general

[Symantec Endpoint Protection][1] es una solución cliente-servidor que protege los equipos portátiles, los equipos de escritorio y los servidores de tu red contra malware, riesgos y vulnerabilidades. Symantec Endpoint Protection combina la protección antivirus con la protección avanzada frente a amenazas para proteger de forma proactiva los equipos cliente frente a amenazas conocidas y desconocidas, como virus, gusanos, troyanos y adware. Symantec Endpoint Protection ofrece protección incluso contra los ataques más sofisticados que evaden las medidas de seguridad tradicionales, como rootkits, ataques de día cero y spyware que muta.

Esta integración enriquece e ingiere los siguientes logs de Symantec Endpoint Protection:

- **Logs de auditoría**: registra los cambios en las políticas, tales como actualizaciones de políticas, asignaciones de políticas y más.
- **Logs de riesgos**: rastrea y registra los posibles riesgos de seguridad detectados en los endpoints, incluido el malware, las vulnerabilidades y las actividades sospechosas.
- **Logs de análisis**: registra los resultados de los análisis antivirus, incluido el malware detectado, la configuración del análisis y la información del usuario.
- **Logs del sistema**: registra todas las actividades administrativas, actividades de clientes, actividades de servidores y actividades de `client_server`.
- **Logs de seguridad**: registra los eventos relacionados con la seguridad, incluidos los ataques, el cumplimiento y el control de dispositivos.
- **Logs de control de aplicaciones**: registra eventos relacionados con el control de aplicaciones, como aplicaciones bloqueadas o permitidas.
- **Logs de tráfico**: registra el tráfico de red eventos, incluidas las conexiones entrantes y salientes, los protocolos y los puertos.

También puedes visualizar información detallada en los logs mencionados con los dashboards predefinidos. Una vez instalada la integración, puedes buscar dashboards escribiendo "symantec-endpoint-protection" en la lista de dashboards.

## Configuración

### Instalación

Para instalar la integración de Symantec Endpoint Protection, ejecuta el siguiente comando de instalación del Agent y los pasos que se indican a continuación. Para obtener más información, consulta la [Documentación de gestión de la integración][2].

**Nota**: Este paso no es necesario para el Agent versión >= 7.52.0.

Comando de Linux:

  ```shell
  sudo -u dd-agent -- datadog-agent integration install datadog-symantec_endpoint_protection==1.0.0
  ```

### Configuración

#### Recopilación de logs

1. La recopilación de logs está desactivada por defecto en el Datadog Agent. Actívala en `datadog.yaml`:

    ```yaml
    logs_enabled: true
    ```

2. Añade este bloque de configuración a tu archivo `symantec_endpoint_protection.d/conf.yaml` para comenzar a recopilar tus logs de Symantec Endpoint Protection.

    Consulta el [archivo de ejemplo symantec_endpoint_protection.d/conf.yaml][2] para ver las opciones de configuración disponibles.

      ```yaml
      logs:
       - type: udp
         port: <PORT>
         service: symantec-endpoint-protection
         source: symantec-endpoint-protection
      ```

3. [Reinicia el Agent][3].

4. Configura el reenvío de mensajes de Syslog desde Symantec Endpoint Protection Server:

    1. Inicia sesión en **Symantec Endpoint Protection Server**.
    2. Haz clic en **Admin** (Administrar).
    3. Haz clic en **servers** (servidores) en el panel **administrative** (administrativo).
    4. Selecciona los **sites** (sitios) para los que deseas reenviar logs.
    5. Haz clic en **Configure external logging** (Configurar logging externo).
    6. Activa la transmisión de logs a un servidor Syslog.
    7. Indica la **syslog server IP** (IP del servidor syslog).
    8. Selecciona el protocolo red como **UDP**.
    9. Indica el **PORT** (Puerto) al que deseas reenviar los logs.

### Validación

[Ejecuta el subcomando de estado del Agent][4] y busca `symantec_endpoint_protection` en la sección Checks.

## Datos recopilados

### Logs

La integración de Symantec Endpoint Protection recopila datos de auditoría, riesgos, análisis, seguridad, tráfico, control de aplicaciones y logs del sistema.

### Métricas

La integración de Symantec Endpoint Protection no incluye métricas.

### Eventos

La integración de Symantec Endpoint Protection no incluye ningún evento.

### Checks de servicio

La integración de Symantec Endpoint Protection no incluye ningún check de servicio.

## Solucionar problemas

### Permiso denegado durante la vinculación de puertos

Si ves un error de **Permission denied** (Permiso denegado) mientras vinculas puertos en logs del Agent, consulta las siguientes instrucciones:

   1. La vinculación a un número de puerto inferior a 1024 requiere permisos elevados. Concede acceso al puerto mediante el comando `setcap`:

      - Concede acceso al puerto mediante el comando `setcap`:

         ```shell
         sudo setcap CAP_NET_BIND_SERVICE=+ep /opt/datadog-agent/bin/agent/agent
         ```

      - Comprueba que la configuración es correcta mediante la ejecución del comando `getcap`:

         ```shell
         sudo getcap /opt/datadog-agent/bin/agent/agent
         ```

         Con el resultado esperado:

         ```shell
         /opt/datadog-agent/bin/agent/agent = cap_net_bind_service+ep
         ```

         **Nota**: Vuelve a ejecutar este comando `setcap` cada vez que actualices el Agent.

   2. [Reinicia el Agent][3].

### No se recopilan datos

Asegúrate de que se evita el tráfico del puerto configurado si el firewall está activado.

### Puerto ya utilizado

Si aparece el error **Port <PORT-NO\> Already in Use**, consulta las siguientes instrucciones. El ejemplo siguiente es para PORT-NO = 514:

En los sistemas que utilizan Syslog, si el Agent escucha logs de Cisco Secure Firewall en el puerto 514, puede aparecer el siguiente error en los logs del Agent: `Can't start UDP forwarder on port 514: listen udp :514: bind: address already in use`.

Este error se produce porque, por defecto, Syslog escucha en el puerto 514. Para resolver este error, sigue **uno** de los pasos siguientes:

- Desactiva Syslog.
- Configura el Agent para escuchar en un puerto diferente disponible.

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][5].

[1]: https://techdocs.broadcom.com/us/en/symantec-security-software/endpoint-security-and-management/endpoint-protection/all/what-is-v45096464-d43e1648.html
[2]: https://docs.datadoghq.com/es/agent/guide/integration-management/?tab=linux#install
[3]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[4]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[5]: https://docs.datadoghq.com/es/help/