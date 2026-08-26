---
app_id: sap-hana
app_uuid: 53d66afa-de92-4f09-9514-778324f38f5c
assets:
  dashboards:
    SAP HANA Overview: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: sap_hana.uptime
      metadata_path: metadata.csv
      prefix: sap_hana.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10076
    source_type_name: SAP HANA
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- almacenes de datos
- sap
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/sap_hana/README.md
display_on_public_website: true
draft: false
git_integration_title: sap_hana
integration_id: sap-hana
integration_title: SAP HANA
integration_version: 5.1.0
is_public: true
manifest_version: 2.0.0
name: sap_hana
public_title: SAP HANA
short_description: Monitoriza métricas de memoria, red, volumen y otras métricas de
  tu sistema SAP HANA.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Data Stores
  - Categoría::SAP
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  configuration: README.md#Setup
  description: Monitoriza métricas de memoria, red, volumen y otras métricas de tu
    sistema SAP HANA.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: SAP HANA
---

<!--  FUENTE https://github.com/DataDog/integrations-core -->


## Información general

Este check monitoriza [SAP HANA][1] 2.0, SPS 2 a través del Datadog Agent.

## Configuración

### Instalación

El check de SAP HANA está incluido en el paquete del [Datadog Agent][2]. Para utilizar esta integración, es necesario instalar la librería [hdbcli][3] manualmente.


Para Unix:

```text
sudo -Hu dd-agent /opt/datadog-agent/embedded/bin/pip install hdbcli==2.21.28
```

Para Windows:

```text
"C:\Program Files\Datadog\Datadog Agent\embedded<PYTHON_MAJOR_VERSION>\python.exe" -m pip install hdbcli==2.21.28
```

#### Preparación de HANA

Para consultar determinadas vistas, se deben conceder privilegios específicos al usuario de monitorización HANA elegido. Para obtener más información, consulta [Concesión de privilegios](#granting-privileges).

Para saber cómo configurar el número de puerto para las bases de datos de inquilino, de inquilino único y de sistema HANA, consulta la [documentación Conexión a SAP][4].

##### Creación de usuarios

1. Conéctate a la base de datos del sistema y ejecuta el siguiente comando para crear un usuario:

   ```shell
   CREATE RESTRICTED USER <USER> PASSWORD <PASSWORD>;
   ```

2. Ejecuta el siguiente comando para permitir que el usuario se conecte al sistema:

   ```shell
   ALTER USER <USER> ENABLE CLIENT CONNECT;
   ```

3. (Opcional) Para evitar la interrupción del servicio es posible que prefieras que la contraseña sea duradera:

   ```shell
   ALTER USER <USER> DISABLE PASSWORD LIFETIME;
   ```

##### Concesión de privilegios

1. Ejecuta el siguiente comando para crear un rol de monitorización (denominado `DD_MONITOR` en estos ejemplos):

   ```shell
   CREATE ROLE DD_MONITOR;
   ```

2. Ejecuta el siguiente comando para conceder acceso de sólo lectura a todas las vistas del sistema:

   ```shell
   GRANT CATALOG READ TO DD_MONITOR;
   ```

3. A continuación, ejecuta los siguientes comandos para conceder privilegios de selección en cada vista del sistema:

   ```shell
   GRANT SELECT ON SYS.M_DATABASE TO DD_MONITOR;
   GRANT SELECT ON SYS.M_DATABASES TO DD_MONITOR;
   GRANT SELECT ON SYS_DATABASES.M_BACKUP_PROGRESS TO DD_MONITOR;
   GRANT SELECT ON SYS_DATABASES.M_CONNECTIONS TO DD_MONITOR;
   GRANT SELECT ON SYS_DATABASES.M_DISK_USAGE TO DD_MONITOR;
   GRANT SELECT ON SYS_DATABASES.M_LICENSES TO DD_MONITOR;
   GRANT SELECT ON SYS_DATABASES.M_RS_MEMORY TO DD_MONITOR;
   GRANT SELECT ON SYS_DATABASES.M_SERVICE_COMPONENT_MEMORY TO DD_MONITOR;
   GRANT SELECT ON SYS_DATABASES.M_SERVICE_MEMORY TO DD_MONITOR;
   GRANT SELECT ON SYS_DATABASES.M_SERVICE_STATISTICS TO DD_MONITOR;
   GRANT SELECT ON SYS_DATABASES.M_VOLUME_IO_TOTAL_STATISTICS TO DD_MONITOR;
   ```

4. Por último, ejecuta el siguiente comando para asignar el rol de monitorización al usuario elegido:

   ```shell
   GRANT DD_MONITOR TO <USER>;
   ```

### Configuración

1. Edita el archivo `sap_hana.d/conf.yaml`, que se encuentra en la carpeta `conf.d/` en la raíz del directorio de configuración de tu Agent para empezar a recopilar tus datos de rendimiento de SAP HANA. Para conocer todas las opciones de configuración disponibles, consulta el [sap_hana.d/conf.yaml de ejemplo][5].

2. [Reinicia el Agent][6].

#### Recopilación de logs

1. En tu base de datos SAP HANA, ejecuta el siguiente comando para asegurarte de que puedes leer logs de auditorías:

    ```shell
    GRANT AUDIT READ TO DD_MONITOR;
    GRANT SELECT ON SYS.AUDIT_LOG TO DD_MONITOR
    ```

1. La recopilación de logs está desactivada por defecto en el Datadog Agent. Actívala en `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

2. Añade este bloque de configuración a tu archivo `sap_hana.d/conf.yaml` para empezar a recopilar tus logs de SAP HANA ajustando los valores `path` y `service` para configurarlos para tu entorno:

   ```yaml
   logs:
     - type: integration
       source: sap_hana
       service: sap_hana
   ```

   Para conocer todas las opciones de configuración disponibles, consulta el [sap_hana.d/conf.yaml de ejemplo][5].

3. [Reinicia el Agent][6].

### Validación

Ejecuta el [subcomando de estado del Agent][7] y busca `sap_hana` en la sección **Checks**.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "sap-hana" >}}


### Eventos

SAP HANA no incluye eventos.

### Checks de servicio
{{< get-service-checks-from-git "sap-hana" >}}


## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [equipo de asistencia de Datadog][10].


[1]: https://www.sap.com/products/hana.html
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://pypi.org/project/hdbcli/
[4]: https://help.sap.com/viewer/0eec0d68141541d1b07893a39944924e/2.0.02/en-US/d12c86af7cb442d1b9f8520e2aba7758.html
[5]: https://github.com/DataDog/integrations-core/blob/master/sap_hana/datadog_checks/sap_hana/data/conf.yaml.example
[6]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-restart-the-agent
[7]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-core/blob/master/sap_hana/metadata.csv
[9]: https://github.com/DataDog/integrations-core/blob/master/sap_hana/assets/service_checks.json
[10]: https://docs.datadoghq.com/es/help/
