---
app_id: linux-audit-logs
app_uuid: 276c2367-72a9-4f50-95d6-998e4b2ca0df
assets:
  dashboards:
    Linux Audit Logs - Overview: assets/dashboards/linux_audit_logs_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    source_type_id: 42347665
    source_type_name: Logs de auditoría de Linux
  logs:
    source: linux-audit-logs
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
- https://github.com/DataDog/integrations-core/blob/master/linux_audit_logs/README.md
display_on_public_website: true
draft: false
git_integration_title: logs_auditoría_linux
integration_id: linux-audit-logs
integration_title: Logs de auditoría de Linux
integration_version: 1.0.0
is_public: true
manifest_version: 2.0.0
name: logs_auditoría_linux
public_title: Logs de auditoría de Linux
short_description: Obtén información sobre logs de auditoría de Linux.
supported_os:
- linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Sistema operativo compatible::Linux
  - Categoría::Recopilación de logs
  - Categoría::Seguridad
  - Categoría::Red
  - Oferta::Integración
  - Tipo de datos enviados::Logs
  configuration: README.md#Configuración
  description: Obtén información sobre logs de auditoría de Linux.
  media:
  - caption: Logs de auditoría de Linux - Información general
    image_url: images/linux_audit_logs_overview_1.png
    media_type: imagen
  - caption: Logs de auditoría de Linux - Información general
    image_url: images/linux_audit_logs_overview_2.png
    media_type: imagen
  - caption: Logs de auditoría de Linux - Información general
    image_url: images/linux_audit_logs_overview_3.png
    media_type: imagen
  - caption: Logs de auditoría de Linux - Información general
    image_url: images/linux_audit_logs_overview_4.png
    media_type: imagen
  overview: README.md#Información general
  support: README.md#Soporte
  title: Logs de auditoría de Linux
---

<!--  CON ORIGEN EN https://github.com/DataDog/integrations-core -->
## Información general

Los [logs de auditoría de Linux][1] registran información detallada sobre eventos del sistema, actividades de usuarios y acciones relacionadas con la seguridad. Son esenciales para controlar la integridad del sistema, detectar accesos no autorizados y garantizar el cumplimiento de las políticas y normativas de seguridad.

Esta integración proporciona un enriquecimiento y una visualización de varios tipos de logs, incluidos:
- Configuraciones y estado del **Control de acceso obligatorio (MAC)**
- **Políticas de MAC**
- **Roles**: asignación, supresión y cambio de roles de usuarios  
- **Auditorías**: cambios de configuración y eventos daemon de auditoría (como cancelaciones o cambios de configuración)
- **Autenticación de usuarios**: eventos de autenticación de usuarios
- **Cuentas de usuario**: modificaciones de credenciales de cuentas de usuarios
- **Usuarios y grupos**: activades de gestión de usuarios y grupos
- **Usuarios de SELinux**: errores de usuarios de SELinux
- **Access Vector Cache (AVC)**: logs de Access Vector Cache (AVC)

Es compatible con estos logs en los sistemas operativos **Red Hat**, **Ubuntu** y **CentOS** de Linux.

Esta integración recopila logs de auditoría de Linux y los envía a Datadog para su análisis. Proporciona información visual a través de los dashboards y el Explorador de logs predefinidos, y ayuda a monitorizar y a responder a las amenazas de seguridad mediante reglas de detección de Cloud SIEM listas para usar.

* [Explorador de logs][2]
* [Cloud SIEM][3]

## Configuración

### Instalación

Para instalar la integración de logs de auditoriía de Linux, ejecuta el siguiente comando de instalación del Agent. Para obtener más información, consulta [Gestión de integraciones][4].

**Nota**: Este paso no es necesario para versiones >= 7.66.0. del Agent.

Para Linux, ejecuta:
  ```shell
  sudo -u dd-agent -- datadog-agent integration install datadog-linux-audit-logs==1.0.0
  ```

### Configuración

#### Instalar el daemon de auditoría (`auditd`)

1. Instala `auditd` en Linux:
    - **Debian/Ubuntu:**

      ```shell
      sudo apt-get update
      sudo apt-get install auditd
      ```

    - **CentOS/RHEL:**

      ```shell
      sudo yum install audit
      ```

2. Inicia el daemon de auditoría:

    ```shell
    sudo systemctl start auditd
    ```

3. Activa el daemon de auditoría para que se inicie durante el arranque:
    ```shell
    sudo systemctl enable auditd
    ```

4. Comprueba el estado del daemon de auditoría:
    ```shell
    sudo systemctl status auditd
    ```

#### Configurar el daemon de auditoría (`auditd`)

1. Concede al usuario `dd-agent` permiso de lectura de los archivos de los de auditoría rotados:
    ```shell
    sudo grep -q "^log_group=" /etc/audit/auditd.conf && sudo sed -i 's/^log_group=.*/log_group=dd-agent/' /etc/audit/auditd.conf || echo "log_group=dd-agent" | sudo tee -a /etc/audit/auditd.conf
    ```

2. Reinicia el daemon de auditoría:
    ```shell
    sudo systemctl restart auditd
    ```

### Validación

[Ejecuta el subcomando de estado del Agent][5] y busca `linux_audit_logs` en la sección Checks.

## Datos recopilados

### Métricas

La integración de logs de auditoría de Linux no incluye métricas.

### Recopilación de logs

1. La recopilación de logs está desactivada por defecto en el Datadog Agent. Actívala en el archivo `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

2. Concede al usuario `dd-agent` acceso de lectura al archivo `audit.log`:

    ```shell
    sudo chown -R dd-agent:dd-agent /var/log/audit/audit.log
    ```

3. Añade este bloque de configuración a tu archivo `linux_audit_logs.d/conf.yaml` para empezar a recopilar logs de auditoría de Linux:

   Consulta el [ejemplo linux_audit_logs.d/conf.yaml][6] para conocer las opciones de configuración disponibles.

   ```yaml
   logs:
     - type: file
       path: /var/log/audit/audit.log
       service: linux-audit-logs
       source: linux-audit-logs
   ```
   **Nota**: No modifiques los valores `service` y `source`, ya que son esenciales para el correcto procesamiento de pipelines de logs.

4. [Reinicia el Agent][7].

### Eventos

La integración de logs de auditoría de Linux no incluye eventos.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][8].

[1]: https://linux.org/
[2]: https://docs.datadoghq.com/es/logs/explorer/
[3]: https://www.datadoghq.com/product/cloud-siem/
[4]: https://docs.datadoghq.com/es/agent/guide/integration-management/?tab=linux#install
[5]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[6]: https://github.com/DataDog/integrations-core/blob/master/linux_audit_logs/datadog_checks/linux_audit_logs/data/conf.yaml.example
[7]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[8]: https://docs.datadoghq.com/es/help/