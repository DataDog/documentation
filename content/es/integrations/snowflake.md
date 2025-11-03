---
app_id: snowflake
app_uuid: 23e9084d-5801-4a71-88fe-f62b7c1bb289
assets:
  dashboards:
    Snowflake: assets/dashboards/snowflake.json
    Snowflake Organization Metrics: assets/dashboards/organization_metrics.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: snowflake.storage.storage_bytes.total
      metadata_path: metadata.csv
      prefix: snowflake.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10123
    source_type_name: Snowflake
  monitors:
    Snowflake failed logins: assets/monitors/snowflake_failed_logins.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- nube
- almacenes de datos
- gestión de costes
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/snowflake/README.md
display_on_public_website: true
draft: false
git_integration_title: snowflake
integration_id: snowflake
integration_title: Snowflake
integration_version: 5.6.0
is_public: true
manifest_version: 2.0.0
name: snowflake
public_title: Snowflake
short_description: Monitoriza métricas clave para uso de crédito, almacenamiento,
  consulta, historial de usuario y mucho más.
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::Cloud
  - Category::Data Stores
  - Category::Cost Management
  configuration: README.md#Setup
  description: Monitoriza métricas clave para uso de crédito, almacenamiento, consulta,
    historial de usuario y mucho más.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Snowflake
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-core -->


## Información general

Este check monitoriza [Snowflake][1] a través del Datadog Agent. Snowflake es un almacén de datos analíticos SaaS y se ejecuta completamente en la infraestructura de la nube.
Esta integración monitoriza el uso de crédito, la facturación, el almacenamiento, las métricas de consulta y más.

<div class="alert alert-info"><bold>Nota</bold>: Las métricas se recopilan mediante consultas a Snowflake. Las consultas realizadas mediante la integración de Datadog se facturan a través de Snowflake.</div>

## Configuración

Sigue las instrucciones a continuación para instalar y configurar este check para un Agent que se ejecuta en un host.

### Instalación

El check de Snowflake está incluido en el paquete del [Datadog Agent][2].

**Nota**: El check de Snowflake no está disponible en el Datadog Agent v6 con Python 2. Para usar Snowflake en el Agent v6, consulta [Usar Python 3 con el Datadog Agent v6][3] o actualiza al Agent v7.

### Configuración
<div class="alert alert-danger">Snowflake recomienda otorgar permisos a un rol alternativo como `SYSADMIN`. Lee más sobre cómo controlar el <a href="https://docs.snowflake.com/en/user-guide/security-access-control-considerations.html#control-the-assignment-of-the-accountadmin-role-to-users">rol ACCOUNTADMIN</a> para obtener más información.</div>

1. Crea un rol y un usuario específicos de Datadog para monitorizar Snowflake. En Snowflake, ejecuta lo siguiente para crear un rol personalizado con acceso al esquema ACCOUNT_USAGE.

    Nota: Por defecto, esta integración monitoriza la base de datos `SNOWFLAKE` y el esquema `ACCOUNT_USAGE`. Consulta "Recopilación de datos de la organización" para obtener información sobre cómo monitorizar el esquema `ORGANIZATION_USAGE`.
    Esta base de datos está disponible por defecto y solo la pueden ver los usuarios con el rol `ACCOUNTADMIN` o [cualquier rol otorgado por el ACCOUNTADMIN][4].


    ```text
    use role ACCOUNTADMIN;
    grant imported privileges on database snowflake to role SYSADMIN;

    use role SYSADMIN;

    ```


    Como alternativa, puedes crear un rol personalizado `DATADOG` con acceso a `ACCOUNT_USAGE`.


    ```text
    -- Crea un nuevo rol destinado a monitorizar el uso de Snowflake.
    create role DATADOG;

    -- Concede privilegios en la base de datos SNOWFLAKE al nuevo rol.
    grant imported privileges on database SNOWFLAKE to role DATADOG;

    -- Concede el uso de tu almacén predeterminado al rol DATADOG.
   grant usage on warehouse <WAREHOUSE> to role DATADOG;

    -- Crea un usuario; omite este paso si estás utilizando un usuario existente.
    create user DATADOG_USER
    LOGIN_NAME = DATADOG_USER
    password = '<PASSWORD>'
    default_warehouse = <WAREHOUSE>
    default_role = DATADOG
    default_namespace = SNOWFLAKE.ACCOUNT_USAGE;

    -- Concede el rol de monitor al usuario.
    grant role DATADOG to user <USER>;
    ```


2. Edita el archivo `snowflake.d/conf.yaml`, en la carpeta `conf.d/` en la raíz del directorio de configuración de tu Agent para comenzar a recopilar los datos de rendimiento de Snowflake. Consulta el [ejemplo snowflake.d/conf.yaml][5] para conocer todas las opciones de configuración disponibles.

    ```yaml
        ## @param account - string - required
        ## Name of your account (provided by Snowflake), including the platform and region if applicable.
        ## For more information on Snowflake account names,
        ## see https://docs.snowflake.com/en/user-guide/connecting.html#your-snowflake-account-name
        #
      - account: <ORG_NAME>-<ACCOUNT_NAME>

        ## @param username - string - required
        ## Login name for the user.
        #
        username: <USER>

        ## @param password - string - required
        ## Password for the user
        #
        password: <PASSWORD>

        ## @param role - string - required
        ## Name of the role to use.
        ##
        ## By default, the SNOWFLAKE database is only accessible by the ACCOUNTADMIN role. Snowflake recommends
        ## configuring a role specific for monitoring:
        ## https://docs.snowflake.com/en/sql-reference/account-usage.html#enabling-account-usage-for-other-roles
        #
        role: <ROLE>

        ## @param min_collection_interval - number - optional - default: 15
        ## This changes the collection interval of the check. For more information, see:
        ## https://docs.datadoghq.com/developers/write_agent_check/#collection-interval
        ##
        ## NOTE: Most Snowflake ACCOUNT_USAGE views are populated on an hourly basis,
        ## so to minimize unnecessary queries, set the `min_collection_interval` to 1 hour.
        #
        min_collection_interval: 3600

        # @param disable_generic_tags - boolean - optional - default: false
        # Generic tags such as `cluster` will be replaced by <integration_name>_cluster to avoid
        # getting mixed with other integration tags.
        # disable_generic_tags: true
    ```

    <div class="alert alert-info">In the default `conf.yaml`, the <code>min_collection_interval</code> is 1 hour.
    Snowflake metrics are aggregated by day, you can increase the interval to reduce the number of queries.<br>
    <bold>Note</bold>: Snowflake ACCOUNT_USAGE views have a <a href="https://docs.snowflake.com/en/sql-reference/account-usage.html#data-latency">known latency</a> of 45 minutes to 3 hours.</div>

3. [Reinicia el Agent][6].

#### Recopilación de datos de la organización

Por defecto, esta integración monitoriza el esquema `ACCOUNT_USAGE`, pero se puede configurar para monitorizar métricas a nivel de la organización.

Para recopilar métricas de la organización, cambia el campo del esquema a `ORGANIZATION_USAGE` y aumenta `min_collection_interval` a 43200 en la configuración de la integración. Esto reduce el número de consultas a Snowflake, ya que la mayoría de las consultas de la organización tienen una latencia de hasta 24 horas.

Nota: Para monitorizar métricas de organización, tu `user` debe tener el rol `ORGADMIN`.

  ```yaml
      - schema: ORGANIZATION_USAGE
        min_collection_interval: 43200
  ```

De forma predeterminada, solo se habilitan algunas métricas de la organización. Para recopilar todas las métricas de la organización disponibles, utiliza la opción de configuración `metric_groups`:

  ```yaml
      metric_groups:
        - snowflake.organization.warehouse
        - snowflake.organization.currency
        - snowflake.organization.credit
        - snowflake.organization.storage
        - snowflake.organization.contracts
        - snowflake.organization.balance
        - snowflake.organization.rate
        - snowflake.organization.data_transfer
  ```

Además, puedes monitorizar las métricas de la cuenta y de la organización al mismo tiempo:

  ```yaml
      instances:
      - account: example-inc
        username: DATADOG_ORG_ADMIN
        password: '<PASSWORD>'
        role: SYSADMIN
        schema: ORGANIZATION_USAGE
        database: SNOWFLAKE
        min_collection_interval: 43200

      - account: example-inc
        username: DATADOG_ACCOUNT_ADMIN
        password: '<PASSWORD>'
        role: DATADOG_ADMIN
        schema: ACCOUNT_USAGE
        database: SNOWFLAKE
        min_collection_interval: 3600
  ```

#### Recopilación de datos para múltiples entornos

Si deseas recopilar datos para varios entornos de Snowflake, añade cada entorno como una instancia en tu archivo `snowflake.d/conf.yaml`. Por ejemplo, si necesitas recopilar datos para dos usuarios llamados `DATADOG_SYSADMIN` y `DATADOG_USER`:

```yaml
instances:
  - account: example-inc
    username: DATADOG_SYSADMIN
    password: '<PASSWORD>'
    role: SYSADMIN
    database: EXAMPLE-INC

  - account: example-inc
    username: DATADOG_USER
    password: '<PASSWORD>'
    role: DATADOG_USER
    database: EXAMPLE-INC
```

#### Configuración de proxy

Snowflake recomienda configurar [variables de entorno para la configuración de proxy][7].

También puedes configurar `proxy_host`, `proxy_port`, `proxy_user` y `proxy_password` bajo `init_config` en [snowflake.d/conf.yaml][5].

**NOTA**: Snowflake formatea automáticamente las configuraciones de proxy y establece [variables de entorno de proxy estándar][8].
Estas variables también afectan todas las solicitudes de integraciones, incluidos los orquestadores como Docker, ECS y Kubernetes.

#### Conectividad privada a la configuración de Snowflake

Si la [conectividad privada][9] (como [AWS PrivateLink][10]) está habilitada en Snowflake, puedes configurar la integración de Snowflake actualizando la opción de configuración `account` con el siguiente formato:

  ```yaml
        - account: <ACCOUNT>.<REGION_ID>.privatelink
  ```

### Consultas personalizadas de Snowflake

La integración de Snowflake admite consultas personalizadas. De forma predeterminada, la integración se conecta a la base de datos compartida `SNOWFLAKE` y al esquema `ACCOUNT_USAGE`.

Para ejecutar consultas personalizadas en un esquema o una base de datos diferentes, añade otra instancia al [ejemplo snowflake.d/conf.yaml][5] y especifica las opciones `database` y `schema`.
Asegúrate de que el usuario y el rol tengan acceso a la base de datos o al esquema especificados.

#### Opciones de configuración
La opción `custom_queries` tiene las siguientes opciones:

| Opción        | Obligatorio | Descripción                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
|---------------|----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| query         | Sí      | Este es el SQL que se va a ejecutar. Puede ser una sentencia simple o un script de varias líneas. Se evalúan todas las filas de los resultados. Utiliza la barra vertical si requieres un script de varias líneas.                                                                                                                                                                                                                                                                                                                                                                                                                              |
| columns       | Sí      | Esta es una lista que representa cada columna ordenada de forma secuencial de izquierda a derecha.<br><br>Hay 2 datos necesarios:<br> - **`name`**: este es el sufijo que hay que anexar a metric_prefix para formar el nombre completo de la métrica. Si `type` se especifica como `tag`, la columna se aplica como etiqueta a las métricas que recoge esta consulta.<br> - **`type`**: este es el método de envío (`gauge`, `count`, `rate`, etc.). También puede configurarse como `tag` para etiquetar las métricas de la fila con el nombre y el valor (`<name>:<row_value>`) del elemento en esta columna. |
| tags          | No       | Una lista de etiquetas (tags) estáticas que pueden aplicarse a las métricas.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |


##### Notas
- Al menos uno de los elementos definidos en `columns` debería ser un tipo de métrica (`gauge`, `count`, `rate`, etc.).
- El número de elementos en las columnas debe ser igual a la cantidad de columnas devueltas en la consulta.
- El orden en que se definen los elementos en `columns` debe ser el mismo orden en que se devuelven en la consulta

```yaml
custom_queries:
  - query: select F3, F2, F1 from Table;
    columns:
      - name: f3_metric_alias
        type: gauge
      - name: f2_tagkey
        type: tag
      - name: f1_metric_alias
        type: count
    tags:
      - test:snowflake
```

#### Ejemplo
El siguiente ejemplo es una consulta que cuenta todas las consultas de la [vista `QUERY_HISTORY`][22] etiquetadas por nombres de base de datos, esquema y almacén.

```TEXT
select count(*), DATABASE_NAME, SCHEMA_NAME, WAREHOUSE_NAME from QUERY_HISTORY group by 2, 3, 4;
```

##### Configuración

La configuración de una consulta personalizada en `instances` tiene el siguiente aspecto:

```yaml
custom_queries:
  - query: select count(*), DATABASE_NAME, SCHEMA_NAME, WAREHOUSE_NAME from QUERY_HISTORY group by 2, 3, 4;
    columns:
      - name: query.total
        type: gauge
      - name: database_name
        type: tag
      - name: schema_name
        type: tag
      - name: warehouse_name
        type: tag
    tags:
      - test:snowflake
```

##### Validación

Para verificar el resultado, busca las métricas utilizando el [Resumen de métricas][12]:

![Resumen de métricas de Snowflake][13]


### Validación

[Ejecuta el subcomando de estado del Agent][14] y busca `snowflake` en la sección Checks.

## Datos recopilados

<div class="alert alert-info"><bold>Nota</bold>: Por defecto, solo están habilitadas las métricas de los siguientes grupos de métricas: <code>snowflake.query.*</code>, <code>snowflake.billing.*</code>, <code>snowflake.storage.*</code> y <code>snowflake.logins.*</code>.

Si deseas recopilar métricas de otros grupos de métricas, consulta <a href="https://github.com/DataDog/integrations-core/blob/master/snowflake/datadog_checks/snowflake/data/conf.yaml.example">el archivo de configuración de ejemplo para esta integración</a>.
</div>

### Métricas
{{< get-metrics-from-git "snowflake-web" >}}


### Eventos

Snowflake no incluye ningún evento.

### Checks de servicio
{{< get-service-checks-from-git "snowflake-web" >}}


## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][17].

## Lectura adicional

Más enlaces, artículos y documentación útiles:

- [Monitorización de Snowflake con Datadog][18]


[1]: https://www.snowflake.com/
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/es/agent/guide/agent-v6-python-3/?tab=hostagent
[4]: https://docs.snowflake.com/en/sql-reference/account-usage.html#enabling-account-usage-for-other-roles
[5]: https://github.com/DataDog/integrations-core/blob/master/snowflake/datadog_checks/snowflake/data/conf.yaml.example
[6]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.snowflake.com/en/user-guide/python-connector-example.html#using-a-proxy-server
[8]: https://github.com/snowflakedb/snowflake-connector-python/blob/d6df58f1c338b255393571a08a1f9f3a71d8f7b6/src/snowflake/connector/proxy.py#L40-L41
[9]: https://docs.snowflake.com/en/user-guide/private-snowflake-service.html
[10]: https://docs.snowflake.com/en/user-guide/admin-security-privatelink.html
[11]: https://docs.snowflake.com/en/sql-reference/account-usage/query_history.html
[12]: https://docs.datadoghq.com/es/metrics/summary/
[13]: https://raw.githubusercontent.com/DataDog/integrations-core/master/snowflake/images/custom_query.png
[14]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[15]: https://github.com/DataDog/integrations-core/blob/master/snowflake/metadata.csv
[16]: https://github.com/DataDog/integrations-core/blob/master/snowflake/assets/service_checks.json
[17]: https://docs.datadoghq.com/es/help/
[18]: https://www.datadoghq.com/blog/snowflake-monitoring-datadog/
