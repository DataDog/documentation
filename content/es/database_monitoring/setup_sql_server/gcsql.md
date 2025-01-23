---
description: Instala y configura Database Monitoring para SQL Server gestionado por
  Google Cloud SQL.
further_reading:
- link: /integrations/sqlserver/
  tag: Documentación
  text: Integración SQL Server básica
- link: /database_monitoring/guide/sql_deadlock/
  tag: Documentación
  text: Configurar la monitorización de interbloqueos
title: Configuración de Database Monitoring para SQL Server gestionado por Google
  Cloud SQL
---

Database Monitoring te proporciona una amplia visibilidad de tus bases de datos Microsoft SQL Server mediante la exposición de métricas de consultas, muestras de consultas, explain-plans, estados de bases de datos, conmutaciones por error y eventos.

Sigue los siguientes pasos para habilitar Database Monitoring con tu base de datos:

1. [Concede al Agent acceso a la base de datos](#grant-the-agent-access).
2. [Instala y configura el Agent](#install-and-configure-the-agent).
3. [Instala la integración Cloud SQL](#install-the-cloud-sql-integration).

## Antes de empezar

Versiones de SQL Server compatibles
: 2014, 2016, 2017, 2019, 2022

{{% dbm-sqlserver-before-you-begin %}}

## Conceder acceso al Agent

El Datadog Agent requiere acceso de sólo lectura al servidor de la base de datos para recopilar estadísticas y consultas.

Crea un usuario `datadog` [en la instancia de Cloud SQL][1].

Para mantener un acceso de sólo lectura para el Agent, elimina el usuario `datadog` del `CustomerDbRootRole` predeterminado. En su lugar, concede únicamente los permisos explícitos requeridos por el Agent.

```SQL
GRANT VIEW SERVER STATE to datadog as CustomerDbRootRole;
GRANT VIEW ANY DEFINITION to datadog as CustomerDbRootRole;
ALTER SERVER ROLE CustomerDbRootRole DROP member datadog;
```

Crea el usuario `datadog` en cada base de datos de aplicaciones adicional:
```SQL
USE [database_name];
CREATE USER datadog FOR LOGIN datadog;
```

Esto es necesario porque Google Cloud SQL no permite conceder el permiso `CONNECT ANY DATABASE`. El Datadog Agent necesita conectarse a cada base de datos para recopilar estadísticas de E/S de archivos específicas de la base de datos.

## Instalación y configuración del Agent

Dado que Google Cloud no permite el acceso directo al host, el Datadog Agent debe instalarse en un host distinto donde pueda comunicarse con el host de SQL Server. Existen varias opciones para instalar y ejecutar el Agent.

{{< tabs >}}
{{% tab "Host Windows" %}}
Para empezar a recopilar telemetría de SQL Server, primero [instala el Datadog Agent][1].

Crea el archivo de configuración de SQL Server Agent `C:\ProgramData\Datadog\conf.d\sqlserver.d\conf.yaml`. Para ver todas las opciones de configuración disponibles, consulta el [archivo de configuración de ejemplo][2].

```yaml
init_config:
instances:
  - dbm: true
    host: '<HOSTNAME>,<SQL_PORT>'
    username: datadog
    password: '<PASSWORD>'
    connector: adodbapi
    provider: MSOLEDBSQL
    tags:  # Opcional
      - 'service:<CUSTOM_SERVICE>'
      - 'env:<CUSTOM_ENV>'
    # Después de añadir tu proyecto y tu instancia, configura la integración Datadog Google Cloud (GCP) para extraer datos de nube adicionales, como CPU, memoria, etc.
    gcp:
      project_id: '<PROJECT_ID>'
      instance_id: '<INSTANCE_ID>'
```

Para obtener información adicional sobre la configuración de los campos `project_id` y `instance_id`, consulta las [especificaciones para la integración SQL Server][3].

Para utilizar la [autenticación de Windows][4], configura `connection_string: "Trusted_Connection=yes"` y omite los campos `username` y `password`.

Utiliza las etiquetas (tags) `service` y `env` para vincular la telemetría de tu base de datos a otras telemetrías mediante un esquema de etiquetado común. Para saber cómo se utilizan estas etiquetas en Datadog, consulta [Etiquetado unificado de servicios][5].

### Guarda tu contraseña de forma segura
{{% dbm-secret %}}

### Controladores compatibles

#### Microsoft ADO

El proveedor [ADO][6] recomendado es el [controlador de Microsoft OLE DB][7]. Asegúrate de que el controlador está instalado en el host donde se ejecuta el Agent.
```yaml
connector: adodbapi
adoprovider: MSOLEDBSQL19  # Sustituye por MSOLEDBSQL para las versiones 18 y anteriores
```

Los otros dos proveedores, `SQLOLEDB` y `SQLNCLI`, se consideran obsoletos por Microsoft y ya no deben ser utilizados.

#### ODBC

El controlador ODBC recomendado es [Microsoft ODBC][8]. A partir del Agent v7.51, el controlador ODBC 18 para SQL Server se incluye en el Agent para Linux. Para Windows, asegúrate de que el controlador está instalado en el host donde se ejecuta el Agent.

```yaml
connector: odbc
driver: '{ODBC Driver 18 for SQL Server}'
```

Una vez terminada la configuración del Agent, [reinicia el Datadog Agent][9].

### Validar

[Ejecuta el subcomando de estado del Agent][10] y busca `sqlserver` en la sección **Checks** o visita la página [Bases de datos][11] de Datadog para empezar.


[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=windows
[2]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/datadog_checks/sqlserver/data/conf.yaml.example
[3]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/assets/configuration/spec.yaml#L324-L351
[4]: https://docs.microsoft.com/en-us/sql/relational-databases/security/choose-an-authentication-mode
[5]: /es/getting_started/tagging/unified_service_tagging
[6]: https://docs.microsoft.com/en-us/sql/ado/microsoft-activex-data-objects-ado
[7]: https://docs.microsoft.com/en-us/sql/connect/oledb/oledb-driver-for-sql-server
[8]: https://docs.microsoft.com/en-us/sql/connect/odbc/download-odbc-driver-for-sql-server
[9]: /es/agent/configuration/agent-commands/#start-stop-and-restart-the-agent
[10]: /es/agent/configuration/agent-commands/#agent-status-and-information
[11]: https://app.datadoghq.com/databases
{{% /tab %}}
{{% tab "Host Linux" %}}
Para empezar a recopilar telemetría de SQL Server, primero [instala el Datadog Agent][1].

En Linux, el Datadog Agent requiere además la instalación de un controlador ODBC SQL Server, por ejemplo, el [controlador ODBC de Microsoft][2]. Una vez instalado el controlador ODBC SQL Server, copia los archivos `odbc.ini` y `odbcinst.ini` en la carpeta `/opt/datadog-agent/embedded/etc`.

Utiliza el conector `odbc` y especifica el controlador adecuado, como se indica en el archivo `odbcinst.ini`.

Crea el archivo de configuración de SQL Server Agent `/etc/datadog-agent/conf.d/sqlserver.d/conf.yaml`. Para ver todas las opciones de configuración disponibles, consulta el [archivo de configuración de ejemplo][3].

```yaml
init_config:
instances:
  - dbm: true
    host: '<HOSTNAME>,<SQL_PORT>'
    username: datadog
    password: 'ENC[datadog_user_database_password]'
    connector: odbc
    driver: '<Driver from the `odbcinst.ini` file>'
    tags:  # Opcional
      - 'service:<CUSTOM_SERVICE>'
      - 'env:<CUSTOM_ENV>'
    # Después de añadir tu proyecto y tu instancia, configura la integración Datadog Google Cloud (GCP) para extraer datos de nube adicionales, como CPU, memoria, etc.
    gcp:
      project_id: '<PROJECT_ID>'
      instance_id: '<INSTANCE_ID>'
```

Para obtener información adicional sobre la configuración de los campos `project_id` y `instance_id`, consulta las [especificaciones para la integración SQL Server][4].

Utiliza las etiquetas (tags) `service` y `env` para vincular la telemetría de tu base de datos a otras telemetrías mediante un esquema de etiquetado común. Para saber cómo se utilizan estas etiquetas en Datadog, consulta [Etiquetado unificado de servicios][5].

Una vez terminada la configuración del Agent, [reinicia el Datadog Agent][6].

### Validar

[Ejecuta el subcomando de estado del Agent][7] y busca `sqlserver` en la sección **Checks** o visita la página [Bases de datos][8] de Datadog para empezar.


[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.microsoft.com/en-us/sql/connect/odbc/linux-mac/installing-the-microsoft-odbc-driver-for-sql-server
[3]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/datadog_checks/sqlserver/data/conf.yaml.example
[4]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/assets/configuration/spec.yaml#L324-L351
[5]: /es/getting_started/tagging/unified_service_tagging
[6]: /es/agent/configuration/agent-commands/#start-stop-and-restart-the-agent
[7]: /es/agent/configuration/agent-commands/#agent-status-and-information
[8]: https://app.datadoghq.com/databases
{{% /tab %}}
{{% tab "Docker" %}}
Para configurar el Database Monitoring Agent que se ejecuta en un contenedor Docker, configura las [plantillas de integración Autodiscovery][1] como etiquetas (labels) de Docker en el contenedor de tu Agent.

**Nota**: El Agent debe tener permiso de lectura en el socket Docker para que las etiquetas de Autodiscovery funcionen.

Sustituye los valores para que coincidan con tu cuenta y tu entorno. Para ver todas las opciones de configuración disponibles, consulta el [archivo de configuración de ejemplo][2].

```bash
export DD_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
export DD_AGENT_VERSION=7.51.0

docker run -e "DD_API_KEY=${DD_API_KEY}" \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  -l com.datadoghq.ad.check_names='["sqlserver"]' \
  -l com.datadoghq.ad.init_configs='[{}]' \
  -l com.datadoghq.ad.instances='[{
    "dbm": true,
    "host": "<HOSTNAME>",
    "port": <SQL_PORT>,
    "connector": "odbc",
    "driver": "ODBC Driver 18 for SQL Server",
    "username": "datadog",
    "password": "<PASSWORD>",
    "tags": [
      "service:<CUSTOM_SERVICE>"
      "env:<CUSTOM_ENV>"
    ],
    "gcp": {
      "project_id": "<PROJECT_ID>",
      "instance_id": "<INSTANCE_ID>"
    }
  }]' \
  gcr.io/datadoghq/agent:${DD_AGENT_VERSION}
```

Para obtener información adicional sobre la configuración de los campos `project_id` y `instance_id`, consulta las [especificaciones para la integración SQL Server][3].

Utiliza las etiquetas (tags) `service` y `env` para vincular la telemetría de tu base de datos a otras telemetrías mediante un esquema de etiquetado común. Para saber cómo se utilizan estas etiquetas en Datadog, consulta [Etiquetado unificado de servicios][4].

### Validar

[Ejecuta el subcomando de estado del Agent][5] y busca `sqlserver` en la sección **Checks** o visita la página [Bases de datos][6] de Datadog para empezar.

[1]: /es/agent/faq/template_variables/
[2]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/datadog_checks/sqlserver/data/conf.yaml.example
[3]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/assets/configuration/spec.yaml#L324-L351
[4]: /es/getting_started/tagging/unified_service_tagging
[5]: /es/agent/configuration/agent-commands/#agent-status-and-information
[6]: https://app.datadoghq.com/databases
{{% /tab %}}
{{% tab "Kubernetes" %}}
Si tienes un clúster Kubernetes, utiliza el [Datadog Cluster Agent][1] para Database Monitoring.

Si los checks de clúster no están habilitados en tu clúster de Kubernetes, sigue las instrucciones para [habilitar checks de clúster][2]. Puedes configurar el Cluster Agent ya sea con archivos estáticos montados en el contenedor de Cluster Agent o utilizando anotaciones de servicios de Kubernetes:

### Helm

Realiza los siguientes pasos para instalar el [Datadog Cluster Agent][1] en tu clúster Kubernetes. Sustituye los valores para que coincidan con tu cuenta y tu entorno.

1. Sigue las [instrucciones de instalación del Datadog Agent][3] para Helm.
2. Actualiza tu archivo de configuración YAML (`datadog-values.yaml` en las instrucciones de instalación del Cluster Agent) para incluir lo siguiente:
    ```yaml
    clusterAgent:
      confd:
        sqlserver.yaml: |-
          cluster_check: true
          init_config:
          instances:
          - dbm: true
            host: <HOSTNAME>
            port: 1433
            username: datadog
            password: 'ENC[datadog_user_database_password]'
            connector: 'odbc'
            driver: '{ODBC Driver 18 for SQL Server}'
            tags:  # Optional
              - 'service:<CUSTOM_SERVICE>'
              - 'env:<CUSTOM_ENV>'
            gcp:
              project_id: '<PROJECT_ID>'
              instance_id: '<INSTANCE_ID>'

    clusterChecksRunner:
      enabled: true
    ```

3. Despliega el Agent con el archivo de configuración anterior desde la línea de comandos:
    ```shell
    helm install datadog-agent -f datadog-values.yaml datadog/datadog
    ```

<div class="alert alert-info">
For Windows, append <code>--set targetSystem=windows</code> to the <code>helm install</code> command.
</div>

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /es/getting_started/site
[3]: /es/containers/kubernetes/installation/?tab=helm#installation

### Configuración con archivos integrados

Para configurar un check de clúster con un archivo de configuración montado, monta el archivo de configuración del contenedor del Cluster Agent en la ruta: `/conf.d/sqlserver.yaml`:

```yaml
cluster_check: true  # Asegúrate de incluir esta marca
init_config:
instances:
  - dbm: true
    host: '<HOSTNAME>'
    port: <SQL_PORT>
    username: datadog
    password: 'ENC[datadog_user_database_password]'
    connector: "odbc"
    driver: '{ODBC Driver 18 for SQL Server}'
    tags:  # Opcional
      - 'service:<CUSTOM_SERVICE>'
      - 'env:<CUSTOM_ENV>'
    # Después de añadir tu proyecto e instancia, configura la integración de Datadog con Google Cloud (GCP) para extraer datos de nube adicionales, como CPU y memoria, entre otros.
    gcp:
      project_id: '<PROJECT_ID>'
      instance_id: '<INSTANCE_ID>'
```

### Configuración con anotaciones de servicios de Kubernetes

En lugar de integrar un archivo, puedes declarar la configuración de la instancia como servicio de Kubernetes. Para configurar este check en un Agent que se ejecuta en Kubernetes, crea un servicio en el mismo espacio de nombres que el Datadog Cluster Agent:


```yaml
apiVersion: v1
kind: Service
metadata:
  name: sqlserver-datadog-check-instances
  annotations:
    ad.datadoghq.com/service.check_names: '["sqlserver"]'
    ad.datadoghq.com/service.init_configs: '[{}]'
    ad.datadoghq.com/service.instances: |
      [
        {
          "dbm": true,
          "host": "<HOSTNAME>",
          "port": <SQL_PORT>,
          "username": "datadog",
          "password": "ENC[datadog_user_database_password]",
          "connector": "odbc",
          "driver": "ODBC Driver 18 for SQL Server",
          "tags": ["service:<CUSTOM_SERVICE>", "env:<CUSTOM_ENV>"],  # Opcional
          "gcp": {
            "project_id": "<PROJECT_ID>",
            "instance_id": "<INSTANCE_ID>"
          }
        }
      ]
spec:
  ports:
  - port: 1433
    protocol: TCP
    targetPort: 1433
    name: sqlserver
```

Para obtener información adicional sobre la configuración de los campos `project_id` y `instance_id`, consulta las [especificaciones para la integración SQL Server][4].

El Cluster Agent registra automáticamente esta configuración y comienza a ejecutar el check de SQL Server.

Para evitar exponer la contraseña del usuario `datadog` en texto simple, utiliza el [paquete de gestión de secretos][5] del Agent y declara la contraseña utilizando la sintaxis `ENC[]`.

[1]: /es/agent/cluster_agent
[2]: /es/agent/cluster_agent/clusterchecks/
[3]: https://helm.sh
[4]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/assets/configuration/spec.yaml#L324-L351
[5]: /es/agent/configuration/secrets-management
{{% /tab%}}
{{< /tabs>}}

## Configuraciones del Agent de ejemplo
{{% dbm-sqlserver-agent-config-examples %}}

## Instalar la integración Google Cloud SQL

Para recopilar métricas de base de datos más completas de Google Cloud SQL, instala la [integración Google Cloud SQL][2].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://cloud.google.com/sql/docs/sqlserver/create-manage-users#creating
[2]: /es/integrations/google_cloudsql