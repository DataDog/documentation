---
app_id: sonicwall-firewall
app_uuid: f29dd27d-2c3b-46f0-a872-7e0d861aff54
assets:
  dashboards:
    Sonicwall Firewall - Anti Spam: assets/dashboards/sonicwall_firewall_anti_spam.json
    Sonicwall Firewall - Network: assets/dashboards/sonicwall_firewall_network.json
    Sonicwall Firewall - Overview: assets/dashboards/sonicwall_firewall_overview.json
    Sonicwall Firewall - Security Services: assets/dashboards/sonicwall_firewall_security_services.json
    Sonicwall Firewall - User: assets/dashboards/sonicwall_firewall_user.json
    Sonicwall Firewall - VPN: assets/dashboards/sonicwall_firewall_vpn.json
    Sonicwall Firewall and Firewall Settings: assets/dashboards/sonicwall_firewall_and_firewall_settings.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 27315184
    source_type_name: Cortafuegos Sonicwall
  logs:
    source: sonicwall-firewall
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
- https://github.com/DataDog/integrations-core/blob/master/sonicwall_firewall/README.md
display_on_public_website: true
draft: false
git_integration_title: sonicwall_firewall
integration_id: sonicwall-firewall
integration_title: Cortafuegos Sonicwall
integration_version: 1.0.0
is_public: true
manifest_version: 2.0.0
name: sonicwall_firewall
public_title: Cortafuegos Sonicwall
short_description: Obtén información sobre logs de cortafuegos Sonicwall.
supported_os:
- Linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Sistema operativo compatible::macOS
  - Categoría::Recopilación de logs
  - Categoría::Seguridad
  - Oferta::Integración
  - Tipo de datos enviados::Logs
  configuration: README.md#Configuración
  description: Obtén información sobre logs de cortafuegos Sonicwall.
  media:
  - caption: Cortafuegos Sonicwall - Información general
    image_url: images/sonicwall_firewall_overview.png
    media_type: imagen
  - caption: Cortafuegos Sonicwall - Red
    image_url: images/sonicwall_firewall_network.png
    media_type: imagen
  - caption: Cortafuegos Sonicwall - Servicios de seguridad
    image_url: images/sonicwall_firewall_security_services.png
    media_type: imagen
  - caption: Cortafuegos Sonicwall - Usuario
    image_url: images/sonicwall_firewall_user.png
    media_type: imagen
  - caption: Cortafuegos Sonicwall - VPN
    image_url: images/sonicwall_firewall_vpn.png
    media_type: imagen
  - caption: Cortafuegos Sonicwall - Antispam
    image_url: images/sonicwall_firewall_anti_spam.png
    media_type: imagen
  - caption: Cortafuegos Sonicwall - Cortafuegos y configuración de cortafuegos
    image_url: images/sonicwall_firewall_and_firewall_settings.png
    media_type: imagen
  overview: README.md#Información general
  support: README.md#Soporte
  title: Cortafuegos Sonicwall
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-core -->
## Información general

El [cortafuegos SonicWall][1] es una solución de seguridad de red diseñada para proteger a las organizaciones de una amplia gama de ciberamenazas. Ofrece funciones de seguridad avanzadas, alto rendimiento y escalabilidad, lo que la hace adecuada para empresas de todos los tamaños. El cortafuegos SonicWall es conocido por su capacidad para proporcionar protección en tiempo real contra las amenazas emergentes, al tiempo que garantiza una gestión segura y eficiente del tráfico de red.

Esta integración ofrece el enriquecimiento y una visualización de todos los tipos de logs compartidos por el cortafuegos SonicWall a través de Syslog. La información detallada de los logs recibida por Syslog se visualiza en dashboards y reglas de detección predefinidos.


## Configuración

### Instalación

Para instalar la integración del cortafuegos SonicWall, ejecuta el siguiente comando de Linux para instalar el Agent. 

**Nota**: Este paso no es necesario para la versión 7.58.0 o posterior del Agent.

  ```shell
  sudo -u dd-agent -- datadog-agent integration install datadog-sonicwall-firewall==1.0.0
  ```

Para obtener más información, consulta la documentación [Gestión de integraciones][2].

### Configuración

#### Recopilación de logs

1.  La recopilación de logs está desactivada por defecto en el Datadog Agent. Actívala en el archivo `datadog.yaml`:
    ```yaml
    logs_enabled: true
    ```

2. Añade este bloque de configuración a tu archivo `sonicwall_firewall.d/conf.yaml` para empezar a recopilar tus logs del cortafuegos SonicWall.

    ```yaml
    logs:
      - type: udp
        port: <udp_port>
        source: sonicwall-firewall
    ```

    Para conocer todas las opciones de configuración disponibles, consulta el [sonicwall_firewall.d/conf.yaml de ejemplo][3].

    **NOTA**: Configura un [servidor Syslog][4] en un cortafuegos SonicWall con `<udp_port>`.

    Configura un servidor Syslog en tu cortafuegos utilizando las siguientes opciones:

    - **Nombre o dirección IP**: La dirección del Datadog Agent que ejecuta esta integración.
    - **Puerto**: El puerto Syslog (UDP) configurado en esta integración.
    - **Tipo de servidor**: Servidor Syslog.
    - **Formato Syslog**: Syslog mejorado.
    - **ID de Syslog**: Cambia este (cortafuegos) predeterminado si necesitas diferenciar varios cortafuegos.

    Establece la hora por defecto como UTC:

    - En **Device** > **Log** > **Syslog** (Dispositivo > Log > Syslog), selecciona la pestaña **Configuración de Syslog** y habilita **Mostrar marca de tiempo de Syslog en UTC**. Haz clic en **Accept** (Aceptar) para establecer la hora en UTC.

    Configuración adicional:

    - En **Device** > **Log** > **Settings** (Dispositivo > Log > Configuración), puedes seleccionar el **Nivel de generación de logs** y el **Nivel de alerta** para obtener diferentes tipos de logs.

3. [Reinicia el Agent][5].

#### Especificar una zona horaria distinta de UTC en el cortafuegos SonicWall y en el pipeline de logs de Datadog
Datadog espera que todos los logs estén en la zona horaria UTC de forma predeterminada. Si la zona horaria de los logs de tu cortafuegos SonicWall no está en UTC, especifica la zona horaria correcta en el pipeline Datadog del cortafuegos SonicWall.

Para cambiar la zona horaria del pipeline del cortafuegos SonicWall:

1. Ve a la página [**Pipelines**][6] de la aplicación Datadog.

2. Introduce `SonicWall Firewall` en el cuadro de búsqueda **Filtrar pipelines**.

3. Pasa el puntero del ratón sobre el pipeline del cortafuegos SonicWall y haz clic en **clone** (clonar). De este modo se crea un clon editable del pipeline del cortafuegos SonicWall.

4. Edita el analizador Grok siguiendo los siguientes pasos:

   - En el pipeline clonado, busca el procesador con el nombre **Analizador Grok: tiempo de análisis del cortafuegos Sonicwall**. Pasa el puntero del ratón sobre los pipelines y haz clic en **Edit** (Editar).
   - En **Definir reglas de análisis**:
      - Modifica la regla y proporciona el [identificador TZ][7] de la zona horaria del servidor de tu cortafuegos SonicWall. Por ejemplo, si tu zona horaria es IST, sustituye `' z'` por `Asia/Calcutta`.
      - Por ejemplo, si esta es la regla existente:

          ```shell
          rule %{date("yyyy-MM-dd HH:mm:ss z"):timestamp}
          ```

        La regla modificada para la zona horaria IST es:

          ```shell
          rule %{date("yyyy-MM-dd HH:mm:ss", "Asia/Calcutta"):timestamp}
          ```

      - Para actualizar la muestra de logs existente, en **muestras de logs**:
        - Elimina UTC del valor existente.
        - Por ejemplo, si el valor existente es:

              ```shell
              2024-09-11 06:30:00 UTC
              ```

              The updated value is:
              ```shell
              2024-09-11 06:30:00
              ```

    - Haz clic en **Update** (Actualizar).

### Validación

[Ejecuta el subcomando de estado del Agent][8] y busca`sonicwall_firewall` en la sección **Checks**.

## Datos recopilados

### Logs

|         Formato          | Tipos de logs    |
| --------------------    | -------------- |
| CEF (Syslog mejorado)   | Todos          |

### Métricas

La integración del cortafuegos SonicWall no incluye métricas.

### Eventos

La integración del cortafuegos SonicWall no incluye eventos.

### Checks de servicios
{{< get-service-checks-from-git "sonicwall-firewall" >}}


## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [equipo de asistencia de Datadog][10].

[1]: https://www.sonicwall.com/
[2]: https://docs.datadoghq.com/es/agent/guide/integration-management/?tab=linux#install
[3]: https://github.com/DataDog/integrations-core/blob/master/sonicwall_firewall/datadog_checks/sonicwall_firewall/data/conf.yaml.example
[4]: https://www.sonicwall.com/support/knowledge-base/how-can-i-configure-a-syslog-server-on-a-sonicwall-firewall/170505984096810
[5]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://app.datadoghq.com/logs/pipelines
[7]: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
[8]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[9]: https://github.com/DataDog/integrations-core/blob/master/sonicwall_firewall/assets/service_checks.json
[10]: https://docs.datadoghq.com/es/help/