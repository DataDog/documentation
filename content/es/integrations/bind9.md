---
app_id: bind9
app_uuid: b37533b0-6f0e-4259-9971-083f08086fac
assets:
  dashboards:
    Bind9 - Details: assets/dashboards/bind9_details.json
    Bind9 - Overview: assets/dashboards/bind9_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: bind9.nsstat_AuthQryRej
      metadata_path: metadata.csv
      prefix: bind9.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10222
    source_type_name: BIND 9
  logs:
    source: bind9
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- la red
- recopilación de logs
- métricas
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/bind9/README.md
display_on_public_website: true
draft: false
git_integration_title: bind9
integration_id: bind9
integration_title: Bind 9
integration_version: 1.1.0
is_public: true
manifest_version: 2.0.0
name: bind9
public_title: Bind 9
short_description: Una integración de Datadog para recopilar logs y métricas de servidor
  de bind9
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
  - Category::Network
  - Category::Log Collection
  - Category::Metrics
  - Offering::Integration
  - Submitted Data Type::Logs
  - Submitted Data Type::Metrics
  configuration: README.md#Setup
  description: Una integración de Datadog para recopilar logs y métricas de servidor
    de bind9
  media:
  - caption: Bind9 - Información general
    image_url: images/bind9_overview.png
    media_type: imagen
  - caption: Bind9 - Detalles
    image_url: images/bind9_details.png
    media_type: imagen
  overview: README.md#Overview
  support: README.md#Support
  title: Bind 9
---

<!--  FUENTE https://github.com/DataDog/integrations-extras -->
## Información general

[Bind 9][1] es una implementación completa y altamente portable del protocolo Sistema de Nombres de Dominio (DNS). El servidor de nombres de Bind 9 (con nombre), puede actuar como servidor de nombres autoritativo, solucionador recursivo, DNS Forwarder, o las tres cosas simultáneamente.


Esta integración proporciona enriquecimiento y visualización para los tipos de logs Query, Query Errors, Network, Lame Servers, Notify y Security. Ayuda a visualizar información detallada sobre patrones de solicitud DNS, comunicación DNS, configuraciones de servidor adecuadas y ataques DNS, asegurando un entorno de DNS robusto y fiable a través de dashboards predefinidos. Además, esta integración proporciona reglas de detección predefinidas. También recopilará estadísticas de Bind 9 en forma de métricas que pueden utilizarse para visualizaciones según sea necesario.


## Configuración

### Instalación

Para instalar la integración de Bind 9, ejecuta el siguiente comando de instalación del Agent y los pasos que se indican a continuación. Para obtener más información, consulta la documentación de [Gestión de la integración][2].

**Nota**: Este paso no es necesario para el Agent versión >= 7.58.0.

Comando de Linux
  ```shell
  sudo -u dd-agent -- datadog-agent integration install datadog-bind9==1.1.0
  ```

#### Recopilación de logs

#### Monitorización de archivos

1. Inicia sesión en tu dispositivo de Bind 9.
2. Abre el archivo `named.conf` para añadir una cláusula de registro:
    ```
    logging {
     channel <example_channel> {
          file "/folder_path/file_name.log" versions <unlimited | <integer>> size <size> suffix <increment | timestamp>;
          print-time (yes | local | iso8601 | iso8601-utc);
          print-category yes;
          print-severity yes;
     };
     category <example-category> { <example_channel>; };
    }
    ```
    **NOTA**: El valor recomendado para `print-time` es `iso8601-utc` porque Datadog espera que todos los logs estén en la zona horaria UTC por defecto. Si la zona horaria de tus logs de Bind 9 no es UTC, asegúrate de seguir [los pasos para utilizar una zona horaria diferente][3]. Además, [consulta las categorías definidas por Bind 9][4].

    Ejemplo de canal de registro:
    ```
    logging {
     channel default_log {
          file "/var/log/named/query.log" versions 3 size 10m;
          print-time iso8601-utc;
          print-category yes;
          print-severity yes;
     };
       category default { default_log; };
    }
    ```
3. Guarda y sal del archivo.
4. Reinicia el servicio
    ```
    service named restart
    ```

#### Syslog
1. Inicia sesión en tu dispositivo de Bind 9.
2. Abre el archivo `named.conf` para añadir una cláusula de registro:
    ```
    logging {
     channel <example_channel> {
          syslog <syslog_facility>;
          severity (critical | error | warning | notice | info | debug [level ] | dynamic);
          print-time (yes | local | iso8601 | iso8601-utc);
          print-category yes;
          print-severity yes;
     };
     category <example-category> { <example_channel>; };
    }
    ```
    **NOTA**: El valor recomendado para `print-time` es `iso8601-utc` porque Datadog espera que todos los logs estén en la zona horaria UTC por defecto. Si la zona horaria de tus logs de Bind 9 no es UTC, asegúrate de seguir [los pasos para utilizar una zona horaria diferente][3]. Además, [consulta las categorías definidas por Bind 9][4].

    Ejemplo de canal de registro:
    ```
    logging {
     channel default_log {
          syslog local3;
          print-time iso8601-utc;
          print-category yes;
          print-severity yes;
     };
       category default { default_log; };
    }
    ```

3. Guarda y sal del archivo.
4. Edita la configuración de syslog/rsyslog para loguear en Datadog utilizando la instalación que seleccionaste en Bind 9:
    ```
    <syslog_facility>.* @@<DATADOG_AGENT_IP_ADDRESS>:<PORT>
    ```
5. Reinicia los siguientes servicios.
    ```
    service syslog/rsyslog restart
    service named restart
    ```

**Nota**: Asegúrate de que `print-category` y `print-severity` están configurados como `yes` en la configuración de los canales para la aplicación Bind 9.

### Configuración

#### Recopilación de métricas

1. Edita el archivo `bind9.d/conf.yaml`, que se encuentra en la carpeta `conf.d/` en la raíz del [directorio de configuración de tu Agent][5], para empezar a recopilar tus [métricas][6] de Bind9. Para conocer todas las opciones de configuración disponibles, consulta el [bind9.d/conf.yaml de ejemplo][7].

   ```yaml
   init_config:

   instances:
     - url: "<BIND_9_STATS_URL>"
   ```

2. [Reiniciar el Agent][8]

#### Recopilación de logs

1. La recopilación de logs está desactivada por defecto en el Datadog Agent. Actívala en el archivo `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

#### Monitorización de archivos

1. Añade este bloque de configuración a tu archivo `bind9.d/conf.yaml` para empezar a recopilar tus logs de Bind 9:

   Para conocer todas las opciones de configuración disponibles, consulta el [bind9.d/conf.yaml de ejemplo][7].

   ```yaml
   logs:
     - type: file
       path: /var/log/named/*.log
       service: bind9
       source: bind9
   ```
   **Nota**: Cambia la variable `path` en `conf.yaml` a la misma ruta configurada en el parámetro `file` en canales para la aplicación de Bind 9.

3. [Reinicia el Agent][8].

#### Syslog
1. Añade este bloque de configuración a tu archivo `bind9.d/conf.yaml` para empezar a recopilar tus logs de Bind 9:

   Para conocer todas las opciones de configuración disponibles, consulta el [bind9.d/conf.yaml de ejemplo][7].

   ```yaml
   logs:
     - type: tcp
       port: <PORT>
       service: bind9
       source: bind9
   ```
   **Nota**: El valor de `port` debe ser el mismo que el mencionado en `syslog.conf/rsyslog.conf`.

3. [Reinicia el Agent][8].

<h4 id="timezone-steps"> Especifica una zona horaria distinta de UTC en el pipeline de logs de Bind 9 Datadog</h4>

Datadog espera que todos los logs estén en la zona horaria UTC por defecto. Si la zona horaria de tus logs de Bind 9 no es UTC, especifica la zona horaria correcta en el pipeline de Bind 9 Datadog.

Para cambiar la zona horaria en el pipeline de Bind 9:

  1. Ve a la página [Pipelines][9] de la aplicación de Datadog. 

  2. Introduce "Bind 9" en la casilla **Filter Pipelines** (Filtrar pipelines).

  3. Pasa el ratón por encima del pipeline de Bind 9 y haz clic en el botón **clone** (clonar). Esto creará un clon editable del pipeline de Bind 9.

  4. Edita el Parser Grok siguiendo los siguientes pasos:
      - En el pipeline clonado, busca un procesador con el nombre "Grok Parser: Parsing Bind 9 common log format" y haz clic en el botón `Edit` pasando el ratón por encima del pipeline.
      - En **Define parsing rules** (Definir reglas de parseo),
        - cambia la cadena `UTC` por el [identificador de TZ][10] de la zona horaria de tu servidor Bind 9. Por ejemplo, si tu zona horaria es IST, cambia el valor a`Asia/Calcutta`.
      - Pulsa el botón **update** (actualizar).

### Validación

[Ejecuta el subcomando de estado del Agent][11] y busca `bind9` en la sección Checks.

## Compatibilidad

El check es compatible con las principales plataformas.

## Datos recopilados

### Logs

La integración de Bind 9 recopila los siguientes tipos de log.

| Tipos de eventos    |
| -------------- |
| Query, Query Errors, Lame Servers, Notify, Security|

### Métricas
{{< get-metrics-from-git "bind9" >}}


### Eventos

El check de Bind 9 no incluye ningún evento.

### Checks de servicio
{{< get-service-checks-from-git "bind9" >}}


## Resolución de problemas

Si ves un error de **Permission denied** (Permiso denegado) durante la monitorización de los archivos de log, da al usuario `dd-agent` el permiso de lectura sobre ellos.

  ```shell
  sudo chown -R dd-agent:dd-agent /var/log/named/
  ```

Si necesitas más ayuda, ponte en contacto con el [soporte de Datadog][14].


[1]: https://www.isc.org/bind/
[2]: https://docs.datadoghq.com/es/agent/guide/integration-management/?tab=linux#install
[3]: https://docs.datadoghq.com/es/integrations/bind9/#timezone-steps
[4]: https://downloads.isc.org/isc/bind9/9.18.29/doc/arm/html/reference.html#namedconf-statement-category
[5]: https://docs.datadoghq.com/es/agent/guide/agent-configuration-files/#agent-configuration-directory
[6]: https://docs.datadoghq.com/es/integrations/bind9/#metrics
[7]: https://github.com/DataDog/integrations-extras/blob/master/bind9/datadog_checks/bind9/data/conf.yaml.example
[8]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[9]: https://app.datadoghq.com/logs/pipelines
[10]: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
[11]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[12]: https://github.com/DataDog/integrations-extras/blob/master/bind9/metadata.csv
[13]: https://github.com/DataDog/integrations-extras/blob/master/bind9/assets/service_checks.json
[14]: https://docs.datadoghq.com/es/help/