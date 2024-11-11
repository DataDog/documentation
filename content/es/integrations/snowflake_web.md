---
app_id: snowflake-web
app_uuid: 49ad5ddd-6cc2-4aa0-bd81-3a5c7186657f
assets:
  dashboards:
    Snowflake-Event-Tables-Overview: assets/dashboards/Snowflake-Event-Tables-Overview_dashboard.json
    Snowflake-Overview: assets/dashboards/Snowflake-Overview_dashboard.json
  integration:
    auto_install: false
    events:
      creates_events: false
    metrics:
      check:
      - snowflake.organization.balance.free_usage
      - snowflake.logins.fail.count
      metadata_path: metadata.csv
      prefix: snowflake.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10436
    source_type_name: Snowflake Web
  monitors:
    A High Volume of Snowflake Queries are Failing: assets/monitors/high_volume_queries_failing.json
    Failed Login Attempts are Increasing: assets/monitors/increased_failed_login_attempts.json
    High volume of Error or Fatal Snowflake Event Table Logs: assets/monitors/high_volume_event_table_logs_errors.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- ia/ml
- gestión de costes
- almacenes de datos
- métricas
- recopilación de logs
- seguridad
custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: snowflake_web
integration_id: snowflake-web
integration_title: Snowflake
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: snowflake_web
public_title: Snowflake
short_description: Identifica consultas de larga duración o fallidas, reduce costes,
  detecta amenazas de seguridad y monitoriza las cargas de trabajo de Snowpark.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::AI/ML
  - Category::Cost Management
  - Category::Data Stores
  - Category::Metrics
  - Category::Log Collection
  - Category::Security
  - Submitted Data Type::Metrics
  - Submitted Data Type::Logs
  - Offering::Integration
  configuration: README.md#Configuración
  description: Identifica consultas de larga duración o fallidas, reduce costes, detecta
    amenazas de seguridad y monitoriza las cargas de trabajo de Snowpark.
  media: []
  overview: README.md#Información general
  resources:
  - resource_type: Blog
    url: https://www.datadoghq.com/blog/snowflake-monitoring-datadog/
  - resource_type: Blog
    url: https://www.datadoghq.com/blog/snowflake-snowpark-monitoring-datadog/
  - resource_type: Blog
    url: https://www.datadoghq.com/blog/data-observability-monitoring/
  support: README.md#Soporte
  title: Snowflake
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->
## Información general

<div class="alert alert-info">La nueva integración de Snowflake reemplaza la integración de Snowflake basada en el Agent de Datadog y ofrece funciones adicionales. Después de configurar la nueva integración de Snowflake, se recomienda desinstalar la integración de Snowflake basada en el Agent para reducir el volumen de llamadas a la API para Snowflake.</div>

Puede resultar difícil monitorizar y optimizar eficazmente la infraestructura y la recuperación de datos de Snowflake. Surgen problemas que pueden derivar en una utilización ineficiente de los recursos, mayores costes y una experiencia del cliente degradada.

Con la integración de Snowflake de Datadog, puedes detectar consultas de larga duración para mejorar el rendimiento y reducir costes, identificar amenazas de seguridad en tiempo real y monitorizar tus cargas de trabajo de Snowpark.

Después de analizar los datos de Snowflake, Datadog completa el [dashboard de información general listo para usar][1] con información sobre todos los recursos recopilados. También ofrece monitores recomendados para ayudarte a comenzar a generar alertas sobre ejecuciones fallidas de Snowpark o una cantidad anormal de intentos de inicio de sesión.

<div class="alert alert-info"><strong>Nota</strong>: Las métricas se recopilan mediante consultas a Snowflake. Las consultas realizadas mediante la integración de Datadog se facturan a través de Snowflake.</div>

## Configuración

### Instalación

No se requiere ningún paso de instalación.

### Configuración

#### Conecta tu cuenta de Snowflake

1. Busca la [URL de tu cuenta de Snowflake][2]. 

{{< img src="integrations/snowflake/snowflake_account_url.png" alt="El menú de la cuenta con la opción de copiar URL de cuenta seleccionada en la interfaz de usuario de Snowflake" popup="true">}}

2. En el [cuadro de la integración de Snowflake][3], ingresa la URL de la cuenta de Snowflake en el campo **Account URL**.

3. En la pestaña **Resource Collection**, activa los recursos que te interese recopilar:

##### Métricas de uso de cuentas y organizaciones

La tabla siguiente describe los tipos de métricas recopilados y sus prefijos de métrica asociados.

| **Tipo** | **Descripción** | **Prefijos de métricas recopilados**  |  
|------|-------------|-----------------------------|                                                                                            
| **Uso de la cuenta**      | Uso de almacenamiento, consumo de crédito y métricas de consulta a nivel de cuenta.<br>_Recopilados por hora_.              | `snowflake.auto_recluster`<br>`snowflake.billing`<br>`snowflake.data_transfer`<br>`snowflake.logins`<br>`snowflake.pipe`<br>`snowflake.query`<br>`snowflake.replication`<br>`snowflake.storage`<br>`snowflake.storage.database`<br>`snowflake.storage.table` |
| **Uso de la organización** | Consumo de crédito, historial de transferencia de datos y métricas de presupuesto a nivel de organización.<br>_Recopilados por día_. | `snowflake.organization` |

##### Logs

La siguiente tabla describe los tipos de logs recopilados y qué tablas de Snowflake están incluidas.

<table>
  <tr>
    <td style="width:10%;"><strong>Tipo</strong></td>
    <td><strong>Descripción</strong></td>
    <td><strong>Tablas necesarias</strong></td>
  </tr>
  <tr>
    <td style="width:10%;">Historial de consultas</td>
    <td>Historial de ejecuciones de consultas. Los logs del historial de consultas se pueden enriquecer con logs del historial de acceso para brindar más información sobre cómo se utilizan los datos a través de las consultas y su linaje.</td>
    <td><a href="https://docs.snowflake.com/en/sql-reference/account-usage/query_history">SNOWFLAKE.ACCOUNT_USAGE.QUERY_HISTORY</a></td>
  </tr>
  <tr>
    <td style="width:10%;">Seguridad</td>
    <td>Utiliza estos logs con <a href="https://app.datadoghq.com/security/home">Cloud SIEM</a> para detectar y responder mejor a las amenazas de seguridad en tu entorno.</td>
    <td> <a href="https://docs.snowflake.com/en/sql-reference/account-usage/login_history">SNOWFLAKE.ACCOUNT_USAGE.LOGIN_HISTORY</a> <br> <a href="https://docs.snowflake.com/en/sql-reference/account-usage/sessions">SNOWFLAKE.ACCOUNT_USAGE.SESSIONS</a> <br> <a href="https://docs.snowflake.com/en/sql-reference/account-usage/grants_to_users">SNOWFLAKE.ACCOUNT_USAGE.GRANTS_TO_USERS</a> <br> <a href="https://docs.snowflake.com/en/sql-reference/account-usage/data_transfer_history">SNOWFLAKE.ACCOUNT_USAGE.DATA_TRANSFER_HISTORY</a> <br> <a href="https://docs.snowflake.com/en/sql-reference/account-usage/stages">SNOWFLAKE.ACCOUNT_USAGE.STAGES</a></td>
  </tr>
  <tr>
    <td style="width:10%;">Tabla de eventos</td>
    <td>Datos de mensajes y eventos generados por tus funciones y procedimientos. Requiere privilegios GRANT adicionales.</td>
    <td>Tu <a href="https://docs.snowflake.com/en/developer-guide/logging-tracing/event-table-columns">tabla de eventos</a> personalizada</td>
  </tr>
</table>

##### Cloud Cost Management

Habilita Cloud Cost Management para recibir métricas de costes de Snowflake agregadas desde la tabla [SNOWFLAKE.ORGANIZATION_USAGE.USAGE_IN_CURRENCY_DAILY][4]. Puedes usar estas métricas con [Cloud Cost Management][5] para obtener información adicional sobre tus costes y uso.

4. Crea un rol y un usuario específicos de Datadog para monitorizar Snowflake. Ejecuta la serie de comandos que se indican a continuación en tu entorno de Snowflake para crear un usuario al que Datadog pueda acceder.

<div class="alert alert-info">

**Configuración recomendada para el almacén**
- Crea un almacén XS con un tiempo de suspensión automática de 30 segundos.
- De manera opcional, la alternativa más rentable puede ser utilizar un almacén XS existente que esté activo durante todo el día. **Nota**: Las consultas realizadas desde esta integración pueden afectar potencialmente el rendimiento de un almacén existente. No se recomienda ejecutar la integración en un almacén donde el rendimiento de las consultas sea fundamental.
</div>

{{< code-block lang="bash" filename="" disable_copy="false" collapsible="true" >}}

 -- Crea un nuevo rol destinado a monitorizar el uso de Snowflake. El nombre del rol es personalizable.
create role DATADOG;

-- Concede privilegios en la base de datos SNOWFLAKE al nuevo rol.
grant imported privileges on database SNOWFLAKE to role DATADOG;

-- Concede el uso de tu almacén predeterminado al rol DATADOG.
grant usage on warehouse <WAREHOUSE> to role DATADOG;

-- Concede las siguientes vistas ACCOUNT_USAGE al nuevo rol. Haz esto si deseas recopilar logs y métricas de uso de la cuenta de Snowflake.
grant database role SNOWFLAKE.OBJECT_VIEWER to role DATADOG;
grant database role SNOWFLAKE.USAGE_VIEWER to role DATADOG;
grant database role SNOWFLAKE.GOVERNANCE_VIEWER to role DATADOG;
grant database role SNOWFLAKE.SECURITY_VIEWER to role DATADOG;

-- Concede ORGANIZATION_USAGE_VIEWER al nuevo rol. Haz esto si deseas recopilar métricas de uso de la organización de Snowflake.
grant database role SNOWFLAKE.ORGANIZATION_USAGE_VIEWER to role DATADOG;

-- Concede ORGANIZATION_BILLING_VIEWER al nuevo rol. Haz esto si deseas recopilar datos de costes de Snowflake.
grant database role SNOWFLAKE.ORGANIZATION_BILLING_VIEWER to role DATADOG;

-- Conceder uso en la base de datos, esquema y tabla de la tabla del evento.
conceder uso en la base de datos <EVENT_TABLE_DATABASE> al rol de Datadog;
conceder uso en el esquema <EVENT_TABLE_DATABASE>.<EVENT_TABLE_SCHEMA> al rol de Datadog;
conceder selección en la tabla <EVENT_TABLE_DATABASE>.<EVENT_TABLE_SCHEMA>.<EVENT_TABLE_NAME> al rol de Datadog;
conceder rol de aplicación SNOWFLAKE.EVENTS_VIEWER al rol de DATADOG;
conceder rol de aplicación SNOWFLAKE.EVENTS_ADMIN al rol de DATADOG;

-- Crea un usuario.
create user <USERNAME>
LOGIN_NAME = <USERNAME>
password = '<PASSWORD>'
default_warehouse =<WAREHOUSE>
default_role = DATADOG;

-- Concede el rol de monitor al usuario.
grant role DATADOG to user <USERNAME>
{{< /code-block >}}

5. Configura la autenticación por par de claves. La clave pública se asigna al usuario creado anteriormente y la clave privada se carga en Datadog, lo que permite que Datadog se conecte a tu cuenta de Snowflake.
    a. Crea y carga una clave privada siguiendo las [instrucciones de Snowflake][6]. Actualmente, Datadog solo admite claves privadas sin cifrar.
    b. Crea una clave pública siguiendo las [instrucciones de Snowflake][7].
    c. Asigna la clave pública al usuario creado anteriormente siguiendo las [instrucciones de Snowflake][8].

<div class="alert alert-info">
Ciertos prefijos de direcciones IP deben estar en la lista de permitidos para que Datadog recopile datos de tu cuenta de Snowflake. La lista de prefijos de IP que pertenecen a Datadog se puede encontrar en la <a href="https://ip-ranges.datadoghq.com/">página IP Ranges</a>, y el rango a permitir se puede encontrar en <strong>webhooks</strong>.
</div>

#### Métricas personalizadas

La integración de Snowflake admite consultas personalizadas para recopilar métricas personalizadas. Los usuarios pueden escribir consultas SQL personalizadas para extraer datos específicos y verlos como métricas y etiquetas (tags) de métricas en Datadog.

Por defecto, la integración se conecta a la base de datos compartida `SNOWFLAKE` y al esquema `ACCOUNT_USAGE`. Si estás consultando una tabla fuera del esquema `ACCOUNT_USAGE`, asegúrate de que tu rol configurado tenga los permisos apropiados para acceder a la tabla.

La tabla siguiente describe los campos utilizados para definir métricas personalizadas.

| Campo | Descripción | Obligatorio |
| -------------  | ----------- | --- |
| Custom Metric Identifier | Se trata de un identificador para la métrica personalizada, que se utiliza para vincular diferentes métricas personalizadas a sus respectivas consultas personalizadas en cada cuenta.   | Sí |
| Consulta | Esta es la consulta SQL que se debe ejecutar. Puede ser una sentencia simple o un script de varias líneas. Se evalúan todas las filas de los resultados.  | Sí |
| Columnas de metadatos | Se trata de una lista que representa cada columna ordenada secuencialmente de izquierda a derecha. Hay dos campos obligatorios para cada columna:<br> - **Nombre de columna personalizado**:<br>este es el sufijo que se añade a `metric_prefix` para formar el nombre completo de la métrica. Por ejemplo, `my_custom_metric.count` da como resultado el nombre completo de la métrica `snowflake.my_custom_metric.count`. Si el tipo se especifica como `Tag Key`, la columna se aplica como una etiqueta a cada métrica recopilada por esta consulta.<br> - **Tipo de metadatos**: <br>este es el método de envío (por ejemplo, gauge, recuento o tasa). También se puede establecer para etiquetar cada métrica de la fila con el nombre y el valor (`<NAME>:<ROW_VALUE>`) del elemento de esta columna. | Sí |


**Notas**:
   - Al menos un elemento en las columnas definidas debe ser un tipo de métrica (gauge, count, tasa, distribución).
   - El número de elementos en las columnas debe ser igual a la cantidad de columnas devueltas en la consulta.
   - El orden en que se definen los elementos en las columnas debe ser el mismo orden en que se devuelven en la consulta.

**Ejemplo**:

{{< img src="integrations/snowflake/custom_query.png" alt="Pestaña de métricas personalizadas en el cuadro de la integración de Snowflake" popup="true">}}

#### Validación

Para verificar el resultado, busca las métricas utilizando el resumen de métricas:

{{< img src="integrations/snowflake/snowflake_metrics.png" alt="Métricas de Snowflake en la página de resumen de métricas" popup="true">}}

## Datos recopilados

### Métricas
{{< get-metrics-from-git "snowflake_web" >}}


### Eventos

La integración de Snowflake Web no incluye ningún evento.

### Checks de servicio

La integración de Snowflake Web no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Contacta con el [equipo de asistencia de Datadog][11].

## Check del Agent: Snowflake

<div class="alert alert-danger">El check del Agent de Snowflake ya no es compatible; se recomienda cambiar a la nueva integración de Snowflake para obtener funciones adicionales y un menor volumen de llamadas a la API para Snowflake.</div>

## Agent: información general

Este check monitoriza [Snowflake][12] a través del Datadog Agent. Snowflake es un almacén de datos analíticos SaaS y se ejecuta completamente en la infraestructura de la nube.
Esta integración monitoriza el uso de crédito, la facturación, el almacenamiento, las métricas de consulta y más.

<div class="alert alert-info"><bold>Nota</bold>: Las métricas se recopilan mediante consultas a Snowflake. Las consultas realizadas mediante la integración de Datadog se facturan a través de Snowflake.</div>

## Agent: configuración

Sigue las instrucciones a continuación para instalar y configurar este check para un Agent que se ejecuta en un host.

### Agent: instalación

El check de Snowflake está incluido en el paquete del [Datadog Agent][13].

**Nota**: El check de Snowflake no está disponible en el Datadog Agent v6 con Python 2. Para usar Snowflake en el Agent v6, consulta [Usar Python 3 con el Datadog Agent v6][14] o actualiza al Agent v7.

### Agent: configuración

<div class="alert alert-warning">Snowflake recomienda otorgar permisos a un rol alternativo como `SYSADMIN`. Lee más sobre cómo controlar el <a href="https://docs.snowflake.com/en/user-guide/security-access-control-considerations.html#control-the-assignment-of-the-accountadmin-role-to-users">rol ACCOUNTADMIN</a> para obtener más información.</div>

1. Crea un rol y un usuario específicos de Datadog para monitorizar Snowflake. En Snowflake, ejecuta lo siguiente para crear un rol personalizado con acceso al esquema ACCOUNT_USAGE.

    Nota: Por defecto, esta integración monitoriza la base de datos `SNOWFLAKE` y el esquema `ACCOUNT_USAGE`. Consulta "Recopilación de datos de la organización" para obtener información sobre cómo monitorizar el esquema `ORGANIZATION_USAGE`.
    Esta base de datos está disponible por defecto y solo la pueden ver los usuarios con el rol `ACCOUNTADMIN` o [cualquier rol otorgado por el ACCOUNTADMIN][15].


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


2. Edita el archivo `snowflake.d/conf.yaml`, en la carpeta `conf.d/` en la raíz del directorio de configuración de tu Agent para comenzar a recopilar los datos de rendimiento de Snowflake. Consulta el [ejemplo snowflake.d/conf.yaml][16] para conocer todas las opciones de configuración disponibles.

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
        # Generic tags such as `cluster` will be replaced by <INTEGRATION_NAME>_cluster to avoid
        # getting mixed with other integration tags.
        # disable_generic_tags: true
    ```

    <div class="alert alert-info">In the default `conf.yaml`, the <code>min_collection_interval</code> is 1 hour. 
    Snowflake metrics are aggregated by day, you can increase the interval to reduce the number of queries.<br>
    <bold>Note</bold>: Snowflake ACCOUNT_USAGE views have a <a href="https://docs.snowflake.com/en/sql-reference/account-usage.html#data-latency">known latency</a> of 45 minutes to 3 hours.</div>

3. [Reinicia el Agent][17].

#### Recopilación de datos de la organización

Por defecto, esta integración monitoriza el esquema `ACCOUNT_USAGE`, pero se puede configurar para monitorizar métricas a nivel de la organización.

Para recopilar métricas de la organización, cambia el campo del esquema a `ORGANIZATION_USAGE` y aumenta `min_collection_interval` a 43200 en la configuración de la integración. Esto reduce el número de consultas a Snowflake, ya que la mayoría de las consultas de la organización tienen una latencia de hasta 24 horas.

**Nota**: Para monitorizar las métricas de la organización, tu `user` debe tener el rol `ORGADMIN`.

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

Snowflake recomienda configurar [variables de entorno para la configuración de proxy][18].

También puedes configurar `proxy_host`, `proxy_port`, `proxy_user` y `proxy_password` bajo `init_config` en [snowflake.d/conf.yaml][16].

**Nota**: Snowflake formatea automáticamente las configuraciones de proxy y establece [variables de entorno de proxy estándar][19].
Estas variables también afectan todas las solicitudes de integraciones, incluidos los orquestadores como Docker, ECS y Kubernetes.

#### Conectividad privada a la configuración de Snowflake

Si la [conectividad privada][20] (como [AWS PrivateLink][21]) está habilitada en Snowflake, puedes configurar la integración de Snowflake actualizando la opción de configuración `account` con el siguiente formato:

  ```yaml
        - account: <ACCOUNT>.<REGION_ID>.privatelink
  ```

### Consultas personalizadas de Snowflake

La integración de Snowflake admite consultas personalizadas. De forma predeterminada, la integración se conecta a la base de datos compartida `SNOWFLAKE` y al esquema `ACCOUNT_USAGE`.

Para ejecutar consultas personalizadas en un esquema o una base de datos diferentes, añade otra instancia al [ejemplo snowflake.d/conf.yaml][16] y especifica las opciones `database` y `schema`.
Asegúrate de que el usuario y el rol tengan acceso a la base de datos o al esquema especificados.

#### Opciones de configuración
La opción `custom_queries` tiene las siguientes opciones:

| Opción        | Obligatorio | Descripción                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
|---------------|----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| query         | Sí      | Este es el SQL que se va a ejecutar. Puede ser una sentencia simple o un script de varias líneas. Se evalúan todas las filas de los resultados. Utiliza la barra vertical si requieres un script de varias líneas.                                                                                                                                                                                                                                                                                                                                                                                                                              |
| columns       | Sí      | Se trata de una lista que representa cada columna ordenada secuencialmente de izquierda a derecha.<br><br>Hay 2 datos necesarios:<br> -`name`**: es el sufijo que se añade a `metric_prefix` para formar el nombre completo de la métrica. Si se especifica `type` como `tag`, la columna se aplica como una etiqueta a cada métrica recopilada por esta consulta.<br> - **`type`**: este es el método de envío (`gauge`, `count`, `rate`, etc.). También se puede establecer como `tag` para etiquetar cada métrica de la fila con el nombre y el valor (`<NAME>:<ROW_VALUE>`) del elemento de esta columna. |
| tags          | No       | Una lista de etiquetas (tags) estáticas que pueden aplicarse a las métricas.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
##### Notas:
- Al menos uno de los elementos definidos en `columns` debería ser un tipo de métrica (`gauge`, `count`, `rate`).

- El número de elementos en las columnas debe ser igual a la cantidad de columnas devueltas en la consulta.
- El orden en que se definen los elementos en `columns` debe ser el mismo orden en que se devuelven en la consulta.

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
##### Configuración de una consulta personalizada

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


### Agent: validación

[Ejecuta el subcomando de estado del Agent][23] y busca `snowflake` en la sección Checks.

## Agent: datos recopilados

<div class="alert alert-info"><bold>Nota</bold>: Por defecto, solo están habilitadas las métricas de los siguientes grupos de métricas: <code>snowflake.query.*</code>, <code>snowflake.billing.*</code>, <code>snowflake.storage.*</code> y <code>snowflake.logins.*</code>.

Si deseas recopilar métricas de otros grupos de métricas, consulta <a href="https://github.com/DataDog/integrations-core/blob/master/snowflake/datadog_checks/snowflake/data/conf.yaml.example">el archivo de configuración de ejemplo para esta integración</a>.
</div>

### Agent: métricas

Consulta [Métricas](#metrics) para obtener una lista de las métricas que proporciona este check.

### Agent: eventos

Snowflake no incluye ningún evento.

### Agent: checks de servicio

**snowflake.can_connect**  
Devuelve `CRITICAL` si el check no puede autenticar las credenciales de Snowflake. De lo contrario, devuelve `OK`.  
*Estados: ok, critical*

## Agent: solucionar problemas

¿Necesitas ayuda? Contacta con el [equipo de asistencia de Datadog][11].

## Referencias adicionales

Más enlaces, artículos y documentación útiles:

- [Monitorización de Snowflake con Datadog][24]
- [Monitorización de Snowflake Snowpark con Datadog][25]

[1]: https://app.datadoghq.com/dash/integration/31321/snowflake-overview
[2]: https://docs.snowflake.com/en/user-guide/organizations-connect
[3]: https://app.datadoghq.com/integrations/snowflake-web
[4]: https://docs.snowflake.com/en/sql-reference/organization-usage/usage_in_currency_daily
[5]: https://app.datadoghq.com/cost/overview
[6]: https://docs.snowflake.com/en/user-guide/key-pair-auth#generate-the-private-key
[7]: https://docs.snowflake.com/en/user-guide/key-pair-auth#generate-a-public-key
[8]: https://docs.snowflake.com/en/user-guide/key-pair-auth#assign-the-public-key-to-a-snowflake-user
[9]: https://github.com/DataDog/integrations-internal-core/blob/main/snowflake_web/metadata.csv
[10]: https://github.com/DataDog/integrations-internal-core/blob/main/snowflake_web/assets/logs/snowflake.yaml
[11]: https://docs.datadoghq.com/es/help
[12]: https://www.snowflake.com/
[13]: https://app.datadoghq.com/account/settings/agent/latest
[14]: https://docs.datadoghq.com/es/agent/guide/agent-v6-python-3/?tab=hostagent
[15]: https://docs.snowflake.com/en/sql-reference/account-usage.html#enabling-account-usage-for-other-roles
[16]: https://github.com/DataDog/integrations-core/blob/master/snowflake/datadog_checks/snowflake/data/conf.yaml.example
[17]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[18]: https://docs.snowflake.com/en/user-guide/python-connector-example.html#using-a-proxy-server
[19]: https://github.com/snowflakedb/snowflake-connector-python/blob/d6df58f1c338b255393571a08a1f9f3a71d8f7b6/src/snowflake/connector/proxy.py#L40-L41
[20]: https://docs.snowflake.com/en/user-guide/private-snowflake-service.html
[21]: https://docs.snowflake.com/en/user-guide/admin-security-privatelink.html
[22]: https://docs.snowflake.com/en/sql-reference/account-usage/query_history.html
[23]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[24]: https://www.datadoghq.com/blog/snowflake-monitoring-datadog/
[25]: https://www.datadoghq.com/blog/snowflake-snowpark-monitoring-datadog/