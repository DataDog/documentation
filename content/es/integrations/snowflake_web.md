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
custom_kind: integración
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

Con la integración Snowflake de Datadog, puedes detectar consultas de larga duración para mejorar el rendimiento y reducir los costes, identificar amenazas de seguridad en tiempo real y monitorizar tus cargas de trabajo de Snowpark.

Después de analizar los datos de Snowflake, Datadog completa el [dashboard de información general listo para usar][1] con información sobre todos los recursos recopilados. También ofrece monitores recomendados para ayudarte a comenzar a generar alertas sobre ejecuciones fallidas de Snowpark o una cantidad anormal de intentos de inicio de sesión.

<div class="alert alert-info"><strong>Nota</strong>: Las métricas se recopilan mediante consultas a Snowflake. Las consultas realizadas mediante la integración de Datadog se facturan a través de Snowflake.</div>

## Configuración

### Instalación

No se requiere ningún paso de instalación.

### Configuración
<div class="alert alert-danger">Nota: Las cuentas de Snowflake conectadas a través de PrivateLink no son compatibles actualmente con la integración Snowflake.
Se recomienda la integración del Snowflake original con el Agent para configuraciones de PrivateLink.</div>

#### Conecta tu cuenta de Snowflake

1. Busca la [URL de tu cuenta de Snowflake][2]. 

![Menú de la cuenta con la opción de copiar URL de la cuenta seleccionada en la interfaz de Snowflake][3]

2. En el [cuadro de la integración de Snowflake][4], ingresa la URL de la cuenta de Snowflake en el campo **URL de la cuenta**.

3. En la pestaña **Recopilación de recursos**, activa los recursos que quieres recopilar:

##### Métricas de uso de cuentas y organizaciones

En la siguiente tabla se describen los tipos de métricas recopiladas y sus prefijos de métricas asociados.

| **Tipo**               | **Descripción**                                                                                               | **Prefijos de métricas recopilados**                                                                                                                                                                                                                                |
| ---------------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Uso de la cuenta**      | Uso de almacenamiento, consumo de crédito y métricas de consulta a nivel de cuenta.<br>_Recopilados por hora_.              | `snowflake.auto_recluster`<br>`snowflake.billing`<br>`snowflake.data_transfer`<br>`snowflake.logins`<br>`snowflake.pipe`<br>`snowflake.query`<br>`snowflake.replication`<br>`snowflake.storage`<br>`snowflake.storage.database`<br>`snowflake.storage.table` |
| **Uso de la organización** | Consumo de crédito, historial de transferencia de datos y métricas de presupuesto a nivel de organización.<br>_Recopilados por día_. | `snowflake.organization`                                                                                                                                                                                                                                     |

Estas métricas pueden recopilarse en uno de dos periodos:
- **Últimas 24 horas**: Recopila las métricas agregadas por las últimas 24 horas. Ejemplo: 1-01-25 04:00:00 a 1-02-25 04:00:00.
- **Día actual**: Recopila las métricas agregadas por el día actual. Ejemplo: 1-02-25 00:00:00 a 1-02-25 04:00:00.

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

Estos logs pueden recopilarse en varios periodos en función del caso de uso. Pueden configurarse en el [cuadro de la integración Snowflake][4].

##### Cloud Cost Management

Activa Cloud Cost Management para recibir las métricas de costes de Snowflake agregadas desde la tabla [SNOWFLAKE.ORGANIZATION_USAGE.USAGE_IN_CURRENCY_DAILY][5]. Puedes utilizar estas métricas con [Cloud Cost Management][6] para obtener información adicional sobre tus costes y tu uso.

4. Crea un rol y un usuario específicos de Datadog para monitorizar Snowflake. Ejecuta la serie de comandos que se indican a continuación en tu entorno de Snowflake para crear un usuario al que Datadog pueda acceder.

<div class="alert alert-info">

**Configuración de almacén recomendada**

- Crea un almacén XS con un tiempo de suspensión automática de 30 segundos.
- Opcionalmente, utilizar un almacén XS existente que suela estar activo a lo largo del día puede ser la opción más rentable. **Nota**: Las consultas realizadas desde esta integración pueden afectar potencialmente al rendimiento de un almacén existente. No se recomienda ejecutar la integración en un almacén donde el rendimiento de las consultas es crítica.
</div>

```bash

-- Create a new role intended to monitor Snowflake usage. The name of the role is customizable.
create role DATADOG;

-- Grant privileges on the SNOWFLAKE database to the new role.
grant imported privileges on database SNOWFLAKE to role DATADOG;

-- Grant usage to your default warehouse to the role DATADOG.
grant usage on warehouse <WAREHOUSE> to role DATADOG;

-- Grant the following ACCOUNT_USAGE views to the new role. Do this if you wish to collect Snowflake account usage logs and metrics.
grant database role SNOWFLAKE.OBJECT_VIEWER to role DATADOG;
grant database role SNOWFLAKE.USAGE_VIEWER to role DATADOG;
grant database role SNOWFLAKE.GOVERNANCE_VIEWER to role DATADOG;
grant database role SNOWFLAKE.SECURITY_VIEWER to role DATADOG;

-- Grant ORGANIZATION_USAGE_VIEWER to the new role. Do this if you wish to collect Snowflake organization usage metrics.
grant database role SNOWFLAKE.ORGANIZATION_USAGE_VIEWER to role DATADOG;

-- Grant ORGANIZATION_BILLING_VIEWER to the new role. Do this if you wish to collect Snowflake cost data.
grant database role SNOWFLAKE.ORGANIZATION_BILLING_VIEWER to role DATADOG;

-- Grant usage on the database, schema, and table of the event table.
grant usage on database <EVENT_TABLE_DATABASE> to role DATADOG;
grant usage on schema <EVENT_TABLE_DATABASE>.<EVENT_TABLE_SCHEMA> to role DATADOG;
grant select on table <EVENT_TABLE_DATABASE>.<EVENT_TABLE_SCHEMA>.<EVENT_TABLE_NAME> to role DATADOG;
grant application role SNOWFLAKE.EVENTS_VIEWER to role DATADOG;
grant application role SNOWFLAKE.EVENTS_ADMIN to role DATADOG;

-- Grant usage on the database, schema, and table of your tables for metric collection of your custom queries.
grant usage on database <CUSTOM_QUERY_DATABASE> to role DATADOG;
grant usage on schema <CUSTOM_QUERY_DATABASE>.<CUSTOM_QUERY_SCHEMA> to role DATADOG;
grant select on table <CUSTOM_QUERY_DATABASE>.<CUSTOM_QUERY_SCHEMA>.<CUSTOM_QUERY_TABLE> to role DATADOG;

-- Create a user.
create user <USERNAME>
LOGIN_NAME = <USERNAME>
password = '<PASSWORD>'
default_warehouse =<WAREHOUSE>
default_role = DATADOG;

-- Grant the monitor role to the user.
grant role DATADOG to user <USERNAME>
```

5. Configura la autenticación por par de claves. La clave pública se asigna al usuario creado anteriormente y la clave privada se carga en Datadog, lo que permite que Datadog se conecte a tu cuenta de Snowflake.
   a. Crea y carga una clave privada siguiendo las [instrucciones de Snowflake][7]. Actualmente, Datadog solo admite claves privadas sin cifrar.
   b. Crea una clave pública siguiendo las [instrucciones de Snowflake][8].
   c. Asigna la clave pública al usuario creado anteriormente siguiendo las [instrucciones de Snowflake][9].

<div class="alert alert-info">
Ciertos prefijos de direcciones IP deben estar en la lista de permitidos para que Datadog recopile datos de tu cuenta de Snowflake. La lista de prefijos de IP que pertenecen a Datadog se puede encontrar en la {{< region-param key="ip_ranges_url" link="true" text="página de rangos IP">}} y el rango permitido se puede encontrar en <strong>Webhooks</strong>.
</div>

#### Métricas personalizadas

La integración Snowflake admite consultas personalizadas para recopilar métricas personalizadas. Los usuarios pueden escribir consultas SQL personalizadas para extraer datos específicos y verlos como métricas y etiquetas (tags) de métricas en Datadog. Las consultas con varias líneas deben tener cada consulta en su propia línea.

Por defecto, la integración se conecta a la base de datos compartida `SNOWFLAKE` y al esquema `ACCOUNT_USAGE`. Si estás consultando una tabla fuera del esquema `ACCOUNT_USAGE`, asegúrate de que tu rol configurado tenga los permisos apropiados para acceder a la tabla.

La tabla siguiente describe los campos utilizados para definir métricas personalizadas.

| Campo                    | Descripción                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Obligatorio |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| Custom Metric Identifier | Se trata de un identificador para la métrica personalizada, que se utiliza para vincular diferentes métricas personalizadas a sus respectivas consultas personalizadas en cada cuenta.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Sí      |
| Consulta                    | Esta es la consulta SQL que se debe ejecutar. Puede ser una sentencia simple o un script de varias líneas. Se evalúan todas las filas de los resultados.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Sí      |
| Columnas de metadatos         | Se trata de una lista que representa cada columna ordenada secuencialmente de izquierda a derecha. Hay dos campos obligatorios para cada columna:<br> - **Nombre de columna personalizado**:<br>este es el sufijo que se añade a `metric_prefix` para formar el nombre completo de la métrica. Por ejemplo, `my_custom_metric.count` da como resultado el nombre completo de la métrica `snowflake.my_custom_metric.count`. Si el tipo se especifica como `Tag Key`, la columna se aplica como una etiqueta a cada métrica recopilada por esta consulta.<br> - **Tipo de metadatos**: <br>este es el método de envío (por ejemplo, gauge, recuento o tasa). También se puede establecer para etiquetar cada métrica de la fila con el nombre y el valor (`<NAME>:<ROW_VALUE>`) del elemento de esta columna. | Sí      |

**Notas**:

- Al menos un elemento en las columnas definidas debe ser un tipo de métrica (gauge, count, tasa, distribución).
- El número de elementos en las columnas debe ser igual a la cantidad de columnas devueltas en la consulta.
- El orden en que se definen los elementos en las columnas debe ser el mismo orden en que se devuelven en la consulta.

**Ejemplo**:

![Pestaña Métricas personalizadas en el cuadro de la integración Snowflake][10]

#### Validación

Para verificar el resultado, busca las métricas utilizando el resumen de métricas:

![Métricas de Snowflake en la página Resumen de métricas][11]

### Tablas de referencia

Las [tablas de referencia][12] te permiten enriquecer y unir automáticamente tu telemetría con campos adicionales de tus tablas de Snowflake. Al asignar campos de valor a una clave primaria, puedes añadir automáticamente estos campos a logs o eventos que contengan esa clave.

#### Activar la ingesta de tablas de referencia

1. Ve a tu **espacio de trabajo de Snowflake**.
2. Identifica el nombre de la **tabla de Snowflake** que se utilizará en Datadog.
3. Concede a Datadog **permisos de lectura** de la tabla ejecutando el siguiente comando en tu espacio de trabajo.

   ```sql
   GRANT USAGE ON DATABASE <REFERENCE_TABLE_DATABASE> TO ROLE DATADOG;
   GRANT USAGE ON SCHEMA <REFERENCE_TABLE_DATABASE>.<REFERENCE_TABLE_SCHEMA> TO ROLE DATADOG;
   GRANT SELECT ON TABLE <REFERENCE_TABLE_DATABASE>.<REFERENCE_TABLE_SCHEMA>.<REFERENCE_TABLE_NAME> TO ROLE DATADOG;
   ```

   - Si te encuentras con el error **_Insufficient Privileges_** (Privilegios insuficientes), ponte en contacto con el administrador de Snowflake de tu organización para que te conceda estos permisos. Datadog no podrá ingerir tu tabla de Snowflake en tablas de referencia sin los permisos anteriores concedidos en tu tabla de Snowflake.

4. Copia el **nombre de la tabla** y la **clave principal** para utilizarlos en la configuración de la tabla de referencia en el paso 6.
5. En Datadog, ve al cuadro de Snowflake y haz clic en la pestaña **Tablas de referencia** de la cuenta de la que quieres ingerir tablas. Si no tienes ninguna cuenta configurada, sigue las instrucciones de la sección [Configuración](#configuration).
6. Haz clic en el botón **Add New Reference Table** (Añadir nueva tabla de referencia). Cuando se abra el formulario, rellena los siguientes campos:

- **Nombre de la tabla de Datadog**, para identificar la tabla en el producto Tablas de referencia de Datadog. El nombre de tu tabla de Datadog debe contener caracteres y guiones bajos para separar varias palabras (por ejemplo, `my_reference_table`). Asegúrate de que el nombre de tu tabla de referencia de Datadog es único en tu organización.
- **Nombre de la tabla de Snowflake** que quieres ingerir, copiada del paso 4.
- **Clave primaria** de la tabla de Snowflake copiada del paso 4.

7. Haz clic en **Save** (Guardar).
8. Puedes esperar ver datos de servicio rellenados en Datadog, varios minutos después de las ejecuciones programadas de tus consultas.
   Cualquier error de ingesta se notificará mediante eventos visibles en tu [Explorador de eventos][13], buscando `source:snowflake`.
9. Ve a Tablas de referencia y busca la tabla que acabas de crear, utilizando el nombre de la tabla de Datadog.
10. Revisa el estado de tu tabla de Snowflake que se encuentra en la sección **Archivo**. Si aparece algún error, resuélvelo en Snowflake.

## Prácticas recomendadas para la ingesta de tablas de Snowflake en tablas de referencia de Datadog 

Al integrar datos de Snowflake en Datadog, es importante estructurar las tablas de forma eficiente para optimizar el rendimiento y los costes. Esta sección te ofrece recomendaciones sobre cómo preparar tus tablas de Snowflake para la ingesta.

### Cómo Datadog ingiere tus datos

Datadog ejecuta la siguiente consulta **cada hora** en la tabla de Snowflake especificada:

```sql
SELECT * FROM your_table;
```

Dado que esta operación recupera todas las columnas y filas, Datadog recomienda especialmente **crear una vista** que incluya sólo los campos necesarios requeridos para la monitorización en Datadog. Esto ayuda a reducir la transferencia innecesaria de datos y los costes de procesamiento.

#### Utilizar una vista para limitar los datos

En lugar de exponer una tabla completa, crea una **vista** que seleccione sólo las columnas necesarias:

```sql
CREATE VIEW my_datadog_view AS
SELECT my_column_1, my_column_2
FROM my_raw_table;
```

Para obtener más información, consulta la [documentación de las vistas de Snowflake][14].

### Consideraciones relativas al rendimiento y los costes

En algunos casos, una **vista** estándar puede no ser la opción más eficaz, sobre todo si:

- La consulta es compleja (por ejemplo, implica uniones, agregaciones o subconsultas).
- El tiempo de ejecución de `SELECT *` es de varios minutos o más.
- La frecuencia de ingesta se traduce en elevados costes de computación. Para monitorizar tus costes de Snowflake, te recomendamos utilizar [Snowflake Cloud Cost Management][15].

Para mejorar la eficiencia, considera alternativas como **vistas materializadas, tablas dinámicas o tablas precalculadas**.

#### Elegir la estructura de tabla adecuada

| **Opción**                                 | **Cuándo utilizarlo**                                                   | **Compensaciones**                                                               |
| ------------------------------------------ | -------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| **Vista materializada**                      | La consulta es costosa desde el punto de vista informático y el rendimiento es crítico. | Mejora la velocidad de consulta, pero aumenta los costes de almacenamiento y requiere una lógica de actualización. |
| **Tabla dinámica**                          | La relevancia de los datos es importante, y se necesitan actualizaciones automáticas.       | Snowflake gestiona las actualizaciones, pero los costes dependen de la frecuencia de las actualizaciones.   |
| **Tabla precalculada (mediante DBT, ETL, etc.)**. | Se requiere un control total sobre las actualizaciones de datos y el rendimiento.          | Proporciona la máxima eficacia, pero añade complejidad a la gestión de datos.          |

#### Utilizar una vista materializada

Una **vista materializada** precalcula y almacena los resultados de las consultas, lo que agiliza considerablemente la recuperación de datos.

```sql
CREATE MATERIALIZED VIEW my_fast_view AS
SELECT important_column_1, important_column_2
FROM my_raw_table;
```

Las vistas materializadas **consumen almacenamiento adicional** y deben actualizarse para mantener los datos al día. Puedes encontrar más información en la [documentación de las vistas materializadas][16].

#### Utilizar una tabla dinámica

Si los datos cambian con frecuencia y las actualizaciones completas son demasiado lentas, una **tabla dinámica** permite a Snowflake gestionar las actualizaciones incrementales:

```sql
CREATE DYNAMIC TABLE my_dynamic_table
TARGET_LAG = '10 MINUTES'
WAREHOUSE = my_warehouse
AS SELECT important_column_1, important_column_2 FROM my_raw_table;
```

Snowflake gestiona automáticamente las actualizaciones incrementales en función de la configuración de `TARGET_LAG`. Puedes encontrar más información en la [documentación de las tablas dinámicas][17].

### Principales conclusiones

- **Utilizar una vista** para restringir los datos enviados a Datadog y optimizar el rendimiento de las consultas.
- **Para consultas lentas**, considerar el uso de una **vista materializada, tabla dinámica o tabla precalculada** para mejorar la eficiencia.
- **Evaluar las compensaciones de costes y rendimiento** antes de elegir una estrategia.

Siguiendo estas prácticas recomendadas, puedes garantizar una integración eficiente y rentable entre Snowflake y Datadog. Si necesitas ayuda para determinar la mejor opción para tu organización, ponte en contacto con el [servicio de asistencia de Snowflake][18].

### Solucionar problemas en tablas de referencia de Snowflake

- Los nombres de las tablas de referencia deben ser únicos en Datadog.
- Datadog no valida los nombres de tablas de Snowflake. Si tu tabla no aparece en Tablas de referencia, asegúrate de haber ingresado correctamente el nombre de la tabla de Snowflake.
- Si tu tabla sigue sin aparecer, revisa la sección [Limitaciones][19] de la documentación de la tabla de referencia para asegurarte de que tu tabla no corresponde a ninguna de esas categorías.
- En caso de problemas con la ingesta de Datadog, ponte en contacto con el [servicio de asistencia de Datadog][20]. Si tienes problemas con tu tabla de Snowflake, ponte en contacto con el [servicio de asistencia de Snowflake][18].

## Datos recopilados

### Métricas
{{< get-metrics-from-git "snowflake_web" >}}


### Eventos

La integración de Snowflake Web no incluye ningún evento.

### Checks de servicio

La integración de Snowflake Web no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][20].

## Check del Agent: Snowflake

<div class="alert alert-warning">El check del Agent de Snowflake ya no es compatible; se recomienda cambiar a la nueva integración de Snowflake para obtener funciones adicionales y un menor volumen de llamadas a la API para Snowflake.</div>

## Agent: información general

Este check monitoriza [Snowflake][23] a través del Datadog Agent. Snowflake es un almacén de datos analíticos SaaS y se ejecuta completamente en la infraestructura de la nube.
Esta integración monitoriza el uso de crédito, la facturación, el almacenamiento, las métricas de consulta y más.

<div class="alert alert-info"><bold>Nota</bold>: Las métricas se recopilan mediante consultas a Snowflake. Las consultas realizadas mediante la integración de Datadog se facturan a través de Snowflake.</div>

## Agent: configuración

Sigue las instrucciones a continuación para instalar y configurar este check para un Agent que se ejecuta en un host.

### Agent: instalación

El check de Snowflake está incluido en el paquete del [Datadog Agent][24].

**Nota**: El check de Snowflake no está disponible en el Datadog Agent v6 con Python 2. Para utilizar Snowflake en el Agent v6, consulta [Uso de Python 3 con el Datadog Agent v6][25] o actualiza al Agent v7.

### Agent: configuración

<div class="alert alert-danger">Snowflake recomienda otorgar permisos a un rol alternativo como `SYSADMIN`. Lee más sobre cómo controlar el <a href="https://docs.snowflake.com/en/user-guide/security-access-control-considerations.html#control-the-assignment-of-the-accountadmin-role-to-users">rol ACCOUNTADMIN</a> para obtener más información.</div>

1. Crea un rol y un usuario específicos de Datadog para monitorizar Snowflake. En Snowflake, ejecuta lo siguiente para crear un rol personalizado con acceso al esquema ACCOUNT_USAGE.

   Nota: Por defecto, esta integración monitoriza la base de datos `SNOWFLAKE` y el esquema `ACCOUNT_USAGE`. Consulta "Recopilación de datos de la organización" para obtener información sobre cómo monitorizar el esquema `ORGANIZATION_USAGE`.
   Esta base de datos está disponible por defecto y solo la pueden ver los usuarios con el rol `ACCOUNTADMIN` o [cualquier rol otorgado por el ACCOUNTADMIN][26].

   ```text
   use role ACCOUNTADMIN;
   grant imported privileges on database snowflake to role SYSADMIN;

   use role SYSADMIN;

   ```

   También puedes crear un rol `DATADOG` personalizado con acceso a `ACCOUNT_USAGE`.

   ```text
   -- Create a new role intended to monitor Snowflake usage.
   create role DATADOG;

   -- Grant privileges on the SNOWFLAKE database to the new role.
   grant imported privileges on database SNOWFLAKE to role DATADOG;

   -- Grant usage to your default warehouse to the role DATADOG.
   grant usage on warehouse <WAREHOUSE> to role DATADOG;

   -- Create a user, skip this step if you are using an existing user.
   create user DATADOG_USER
   LOGIN_NAME = DATADOG_USER
   password = '<PASSWORD>'
   default_warehouse = <WAREHOUSE>
   default_role = DATADOG
   default_namespace = SNOWFLAKE.ACCOUNT_USAGE;

   -- Grant the monitor role to the user.
   grant role DATADOG to user <USER>;
   ```

2. Edita el archivo `snowflake.d/conf.yaml`, que se encuentra en la carpeta `conf.d/` en la raíz del directorio de configuración del Agent, para empezar a recopilar tus datos de rendimiento de Snowflake. Para conocer todas las opciones de configuración disponibles, consulta el [snowflake.d/conf.yaml de ejemplo][27].

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

3. [Reinicia el Agent][28].

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
    password: "<PASSWORD>"
    role: SYSADMIN
    schema: ORGANIZATION_USAGE
    database: SNOWFLAKE
    min_collection_interval: 43200

  - account: example-inc
    username: DATADOG_ACCOUNT_ADMIN
    password: "<PASSWORD>"
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
    password: "<PASSWORD>"
    role: SYSADMIN
    database: EXAMPLE-INC

  - account: example-inc
    username: DATADOG_USER
    password: "<PASSWORD>"
    role: DATADOG_USER
    database: EXAMPLE-INC
```

#### Configuración del proxy

Snowflake recomienda configurar [variables de entorno para configuraciones de proxy][29].

También puedes configurar `proxy_host`, `proxy_port`, `proxy_user` y `proxy_password` bajo `init_config` en [snowflake.d/conf.yaml][27].

**Nota**: Snowflake formatea automáticamente las configuraciones de proxy y configura [variables de entorno de proxy estándar][30].
Estas variables también afectan todas las solicitudes de integraciones, incluidos los orquestadores como Docker, ECS y Kubernetes.

#### Conectividad privada a la configuración de Snowflake

Si la [conectividad privada][31] (como [AWS PrivateLink][32]) está habilitada en Snowflake, puedes configurar la integración Snowflake actualizando la opción de configuración `account` con el siguiente formato:

```yaml
- account: <ACCOUNT>.<REGION_ID>.privatelink
```

### Consultas personalizadas de Snowflake

La integración Snowflake admite consultas personalizadas. Por defecto, la integración se conecta a la base de datos compartida `SNOWFLAKE` y al esquema `ACCOUNT_USAGE`.

Para ejecutar consultas personalizadas en un esquema o una base de datos diferentes, añade otra instancia al [snowflake.d/conf.yaml de ejemplo][27] y especifica las opciones `database` y `schema`.
Asegúrate de que el usuario y el rol tienen acceso a la base de datos o al esquema especificados.

#### Opciones de configuración

La opción `custom_queries` tiene las siguientes opciones:

| Opción  | Obligatorio | Descripción                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| ------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| query   | Sí      | Este es el SQL que se va a ejecutar. Puede ser una sentencia simple o un script de varias líneas. Se evalúan todas las filas de los resultados. Utiliza la barra vertical si requieres un script de varias líneas.                                                                                                                                                                                                                                                                                                                                                                                                  |
| columns | Sí      | Se trata de una lista que representa cada columna ordenada secuencialmente de izquierda a derecha.<br><br>Hay 2 datos necesarios:<br> -`name`**: es el sufijo que se añade a `metric_prefix` para formar el nombre completo de la métrica. Si se especifica `type` como `tag`, la columna se aplica como una etiqueta a cada métrica recopilada por esta consulta.<br> - **`type`**: este es el método de envío (`gauge`, `count`, `rate`, etc.). También se puede definir como `tag` para etiquetar cada métrica de la fila con el nombre y el valor (`<NAME>:<ROW_VALUE>`) del elemento de esta columna. |
| tags    | No       | Una lista de etiquetas estáticas que pueden aplicarse a las métricas.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |

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

El siguiente ejemplo es una consulta que cuenta todas las consultas de la [vista `QUERY_HISTORY`][33], etiquetadas por nombres de base de datos, esquema y almacén.

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

[Ejecuta el subcomando de estado del Agent][34] y busca `snowflake` en la sección Checks.

## Agent: datos recopilados

<div class="alert alert-info"><bold>Nota</bold>: Por defecto, sólo están activadas las métricas de los siguientes grupos de métricas: <code>snowflake.query.*</code>, <code>snowflake.billing.*</code>, <code>snowflake.storage.*</code> y <code>snowflake.logins.*</code>.

Si quieres recopilar métricas de otros grupos de métricas, consulta el <a href="https://github.com/DataDog/integrations-core/blob/master/snowflake/datadog_checks/snowflake/data/conf.yaml.example">archivo de configuración de ejemplo de esta integración</a>.

</div>

### Agent: métricas

Consulta [Métricas](#metrics) para obtener una lista de las métricas que proporciona este check.

### Agent: eventos

Snowflake no incluye ningún evento.

### Agent: checks de servicio

**snowflake.can_connect**  
Devuelve `CRITICAL` si el check no puede autenticar las credenciales de Snowflake. En caso contrario, devuelve `OK`.  
_Estados: ok, crítico_

## Agent: solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][20].

## Referencias adicionales

Documentación útil adicional, enlaces y artículos:

- [Monitorizar Snowflake con Datadog][35]
- [Monitorizar Snowflake Snowpark con Datadog][36]
- [Métricas clave para monitorizar los costes y la calidad de los datos Snowflake][37]
- [Herramientas para recopilar y monitorizar métricas clave de Snowflake][38]
- [Monitorizar el rendimiento y la calidad de los datos de Snowflake con Datadog][39]

[1]: https://app.datadoghq.com/dash/integration/31355/snowflake-overview
[2]: https://docs.snowflake.com/en/user-guide/organizations-connect
[3]: images/snowflake_account_url.png
[4]: https://app.datadoghq.com/integrations/snowflake-web
[5]: https://docs.snowflake.com/en/sql-reference/organization-usage/usage_in_currency_daily
[6]: https://app.datadoghq.com/cost/overview
[7]: https://docs.snowflake.com/en/user-guide/key-pair-auth#generate-the-private-key
[8]: https://docs.snowflake.com/en/user-guide/key-pair-auth#generate-a-public-key
[9]: https://docs.snowflake.com/en/user-guide/key-pair-auth#assign-the-public-key-to-a-snowflake-user
[10]: images/custom_query.png
[11]: images/snowflake_metrics.png
[12]: https://docs.datadoghq.com/es/reference_tables/?tab=manualupload
[13]: https://docs.datadoghq.com/es/service_management/events/explorer/
[14]: https://docs.snowflake.com/en/user-guide/views-introduction
[15]: https://www.datadoghq.com/product/cloud-cost-management/
[16]: https://docs.snowflake.com/en/user-guide/views-materialized
[17]: https://docs.snowflake.com/en/user-guide/dynamic-tables-about
[18]: https://www.snowflake.com/en/support/
[19]: https://docs.datadoghq.com/es/reference_tables/?tab=manualupload#reference-table-limits
[20]: https://docs.datadoghq.com/es/help
[21]: https://github.com/DataDog/integrations-internal-core/blob/main/snowflake_web/metadata.csv
[22]: https://github.com/DataDog/integrations-internal-core/blob/main/snowflake_web/assets/logs/snowflake.yaml
[23]: https://www.snowflake.com/
[24]: https://app.datadoghq.com/account/settings/agent/latest
[25]: https://docs.datadoghq.com/es/agent/guide/agent-v6-python-3/?tab=hostagent
[26]: https://docs.snowflake.com/en/sql-reference/account-usage.html#enabling-account-usage-for-other-roles
[27]: https://github.com/DataDog/integrations-core/blob/master/snowflake/datadog_checks/snowflake/data/conf.yaml.example
[28]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[29]: https://docs.snowflake.com/en/user-guide/python-connector-example.html#using-a-proxy-server
[30]: https://github.com/snowflakedb/snowflake-connector-python/blob/d6df58f1c338b255393571a08a1f9f3a71d8f7b6/src/snowflake/connector/proxy.py#L40-L41
[31]: https://docs.snowflake.com/en/user-guide/private-snowflake-service.html
[32]: https://docs.snowflake.com/en/user-guide/admin-security-privatelink.html
[33]: https://docs.snowflake.com/en/sql-reference/account-usage/query_history.html
[34]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[35]: https://www.datadoghq.com/blog/snowflake-monitoring-datadog/
[36]: https://www.datadoghq.com/blog/snowflake-snowpark-monitoring-datadog/
[37]: https://www.datadoghq.com/blog/snowflake-metrics/
[38]: https://www.datadoghq.com/blog/snowflake-monitoring-tools/
[39]: https://www.datadoghq.com/blog/monitor-snowflake-with-datadog/