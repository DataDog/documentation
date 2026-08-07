---
app_id: ossec-security
app_uuid: 595fcf0f-a306-43bf-a282-a729764961fa
assets:
  dashboards:
    OSSEC - Audit/Internal: assets/dashboards/ossec_audit_internal.json
    OSSEC - FTPD: assets/dashboards/ossec_ftpd.json
    OSSEC - Firewall: assets/dashboards/ossec_firewall.json
    OSSEC - Overview: assets/dashboards/ossec_overview.json
    OSSEC - PAM: assets/dashboards/ossec_pam.json
    OSSEC - SSHD: assets/dashboards/ossec_sshd.json
    OSSEC - Syslog: assets/dashboards/ossec_syslog.json
    OSSEC - Web: assets/dashboards/ossec_web.json
    OSSEC - Windows: assets/dashboards/ossec_windows.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 19889856
    source_type_name: ossec-security
  logs:
    source: ossec-security
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
- https://github.com/DataDog/integrations-core/blob/master/ossec_security/README.md
display_on_public_website: true
draft: false
git_integration_title: ossec_security
integration_id: ossec-security
integration_title: ossec-security
integration_version: 2.0.0
is_public: true
manifest_version: 2.0.0
name: ossec_security
public_title: ossec-security
short_description: Obtén información sobre las alertas OSSEC.
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
  description: Obtén información sobre las alertas OSSEC.
  media:
  - caption: 'OSSEC: auditoría interna'
    image_url: images/ossec_audit_internal.png
    media_type: imagen
  - caption: 'OSSEC: firewall'
    image_url: images/ossec_firewall.png
    media_type: imagen
  - caption: 'OSSEC: información general'
    image_url: images/ossec_overview.png
    media_type: imagen
  - caption: 'OSSEC: PAM'
    image_url: images/ossec_pam.png
    media_type: imagen
  - caption: 'OSSEC: SSHD'
    image_url: images/ossec_sshd.png
    media_type: imagen
  - caption: 'OSSEC: Syslog'
    image_url: images/ossec_syslog.png
    media_type: imagen
  - caption: 'OSSEC: web'
    image_url: images/ossec_web.png
    media_type: imagen
  - caption: 'OSSEC: Windows'
    image_url: images/ossec_windows.png
    media_type: imagen
  overview: README.md#Overview
  support: README.md#Support
  title: ossec-security
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-core -->


## Información general

[OSSEC][1] es un sistema de detección de intrusiones de código abierto basado en host. Realiza análisis de logs, comprobación de integridad, monitorización de registros de Windows, detección de rootkits, alertas en tiempo real y respuesta activa. Ayuda a monitorizar y gestionar los eventos de seguridad en varias infraestructuras de TI.

Esta integración ingiere los siguientes tipos de logs:
- FTPD
- Firewall
- Sistema
- Syslog
- SSHD
- PAM
- Windows
- Acceso web

Visualiza información detallada de estos logs a través de dashboards predefinidos.

## Configuración

### Instalación

Para instalar la integración de OSSEC Security, ejecuta el siguiente comando de instalación del Agent y los pasos que se indican a continuación. Para más información, consulta la documentación [Gestión de integraciones][2].

**Nota**: Este paso no es necesario para el Agent versión >= 7.57.0.

Comando de Linux
  ```shell
  sudo -u dd-agent -- datadog-agent integration install datadog-ossec_security==1.0.0
  ```

### Configuración

#### Recopilación de logs

1. La recopilación de logs está desactivada por defecto en el Datadog Agent. Actívala en `datadog.yaml`:

    ```yaml
    logs_enabled: true
    ```
2. Añade este bloque de configuración a tu archivo `ossec_security.d/conf.yaml` para empezar a recopilar tus logs.

    Utiliza el método UDP para recopilar los datos de las alertas OSSEC.
    Consulta el [ossec_security.d/conf.yaml de ejemplo][3] para ver las opciones disponibles de configuración.

    ```yaml
      logs:
      - type: udp
        port: <PORT>
        source: ossec-security
        service: ossec-security
    ```
    **Nota**: Es recomendado no cambiar los valores de servicio y fuente, ya que estos parámetros son parte integral de la operación del pipeline.

3. [Reinicia el Agent][4].

#### Configurar reenvío de mensajes de syslog desde OSSEC
  1. Añade la siguiente configuración en `/var/ossec/etc/ossec.conf`.

      En este ejemplo, todas las alertas se envían a 1.1.1.1 en el puerto 8080 en formato JSON.
      ```xml
        <syslog_output>
          <server>1.1.1.1</server>
          <port>8080</port>
          <format>json</format>
        </syslog_output>
      ```

      * La etiqueta `server` debe contener la dirección IP donde se está ejecutando tu Datadog Agent.

      * La etiqueta `port` debe contener el puerto en el que tu Datadog Agent está escuchando.

      Nota: Es necesario utilizar el formato JSON, ya que el pipeline de OSSEC Security sólo analiza logs en formato JSON.

  2. Activar el proceso client-syslog:
      ```shell
      /var/ossec/bin/ossec-control enable client-syslog
      ```

  3. Reiniciar el servicio de OSSEC :
      ```shell
      /var/ossec/bin/ossec-control restart
      ```

#### Activar la recopilación de logs de firewall (opcional):
Por defecto, el servidor de OSSEC no reenvía los logs de alerta de firewall. Para reenviar los logs de alerta de firewall a través del servidor de OSSEC, sigue estos pasos.

  1. Localiza el archivo `firewall_rules.xml` en `/var/ossec/rules/firewall_rules.xml`.

  2. Edita `firewall_rules.xml` para eliminar todas las apariciones de la siguiente línea del archivo:
  ```xml
  <options>no_log</options>
  ``` 

  3. Reiniciar tu servidor de OSSEC:
  ```shell
  /var/ossec/bin/ossec-control restart
  ```

#### Especificar una zona horaria distinta de UTC en el pipeline de log de OSSEC Security Datadog

Datadog espera que todos los logs estén en la zona horaria UTC por defecto. Si la zona horaria de tus logs de OSSEC no es UTC, especifica la zona horaria correcta en el pipeline de OSSEC Security Datadog.

Para cambiar la zona horaria en el pipeline de OSSEC Security:

  1. Ve a la [página **Pipelines**][5] de la aplicación de Datadog. 

  2. Introduce "OSSEC Security" en la casilla de búsqueda **Filter Pipelines** (Filtrar pipelines).

  3. Pasa el ratón por encima del pipeline de OSSEC Security y haz clic en el botón **clone** (clonar). Esto creará un clon editable del pipeline de OSSEC Security.

  4. Edita el Grok Parser siguiendo los siguientes pasos:
      - En el pipeline clonado, busca un procesador con el nombre "Grok Parser: Parsing OSSEC alerts" y haz clic en el botón `Edit` pasando el ratón por encima del pipeline.
      - En**Define parsing rules** (Definir reglas de parseo):
        - Cambia la cadena `UTC` por el [identificador TZ][6] de la zona horaria de tu servidor de OSSEC. Por ejemplo, si tu zona horaria es IST, cambiarías el valor a`Asia/Calcutta`.
      - Pulsa el botón **update** (actualizar).



### Validación

[Ejecuta el subcomando de estado de Agent[7] y busca `ossec_security` en la sección Checks.

## Datos recopilados

### Log

| Formato     | Tipos de evento    |
| ---------  | -------------- |
| JSON | syslog, sshd, pam, ossec, windows, firewall, ftpd, web_access |

### Métricas

La integración de OSSEC Security no incluye ninguna métrica.

### Eventos

La integración de OSSEC Security no incluye ningún evento.

### Checks de servicio

La integración de OSSEC Security no incluye ningún check de servicio.

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

**Data is not being collected** (No se están recopilando datos):

Asegúrate de que se evita el tráfico del puerto configurado si el firewall está activado.

**Port already in use** (Puerto ya en uso):

- Si aparece el error **Port <PORT_NUMBER> Already in Use** (Puerto n.° ya en uso), consulta las siguientes instrucciones. El ejemplo siguiente es para el puerto 514:

- En los sistemas que utilizan Syslog, si el Agent escucha logs de OSSEC en el puerto 514, puede aparecer el siguiente error en los logs del Agent: `Can't start UDP forwarder on port 514: listen udp :514: bind: address already in use`. Este error se produce porque, por defecto, Syslog escucha en el puerto 514. Para resolver este error, sigue **uno** de los pasos siguientes: 

    - Desactiva Syslog.
    - Configura el Agent para escuchar en un puerto diferente, disponible.


Para obtener más ayuda, ponte en contacto con el [soporte de Datadog][8].

[1]: https://www.ossec.net/
[2]: https://docs.datadoghq.com/es/agent/guide/integration-management/?tab=linux#install
[3]: https://github.com/DataDog/integrations-core/blob/master/ossec_security/datadog_checks/ossec_security/data/conf.yaml.example
[4]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://app.datadoghq.com/logs/pipelines
[6]: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
[7]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[8]: https://docs.datadoghq.com/es/help/