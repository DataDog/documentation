---
aliases:
- /es/data_observability/datasets/?tab=snowflake
description: Conecte Snowflake a Datadog Data Observability para hacer un seguimiento
  de la calidad de los datos, hacer un seguimiento del uso y detectar problemas.
further_reading:
- link: /data_observability/
  tag: Documentación
  text: Descripción general de Data Observability
- link: /monitors/types/data_observability/
  tag: Documentación
  text: Monitores de Data Observability
title: Snowflake
---
## Descripción general {#overview}

La integración de Snowflake conecta Datadog a su cuenta de Snowflake para sincronizar metadatos, historial de consultas y métricas a nivel de tabla. Úsela para hacer un seguimiento de la frescura de los datos, detectar anomalías y rastrear el linaje a través de su almacén y herramientas aguas abajo.

## Requisitos previos {#prerequisites}

Antes de comenzar, asegúrese de tener:

- Acceso al rol `ACCOUNTADMIN` en Snowflake.
- Un par de claves RSA. Para obtener más información, consulte la [documentación de autenticación de par de claves de Snowflake][1].
- Si su cuenta de Snowflake restringe el acceso a la red por IP, las IP de webhook de Datadog deben incluirse en su lista de permitidos de política de red. Para obtener la lista de IPs, consulte la sección `webhooks` de la página [Rangos de IP][7].

  <div class="alert alert-warning">Los rangos de IP son diferentes para cada sitio de Datadog. En la página <a href="/api/latest/ip-ranges/">Rangos de IP</a>, utilice el selector de sitio en la parte superior derecha para confirmar que está obteniendo las IP del punto de conexión URL específico del sitio correcto.</div>

## Configure su cuenta en Snowflake {#set-up-your-account-in-snowflake}

Para configurar su cuenta en Snowflake:

1. Defina las siguientes variables:

   ```sql
   SET role_name      = 'DATADOG_ROLE';
   SET user_name      = 'DATADOG_USER';
   SET warehouse_name = 'DATADOG_WH';
   ```

2. Cree un rol, un almacén y un usuario autenticado mediante par de claves.

   ```sql
   USE ROLE ACCOUNTADMIN;

   -- Create monitoring role
   CREATE ROLE IF NOT EXISTS IDENTIFIER($role_name);

   -- Create an X-SMALL warehouse (auto-suspend after 30s)
   CREATE WAREHOUSE IF NOT EXISTS IDENTIFIER($warehouse_name)
   WAREHOUSE_SIZE       = XSMALL
   WAREHOUSE_TYPE       = STANDARD
   AUTO_SUSPEND         = 30
   AUTO_RESUME          = TRUE
   INITIALLY_SUSPENDED  = TRUE;

   -- Raise the statement timeout so large crawls and queries aren't cut off,
   -- and cap concurrency so this warehouse can't be monopolized.
   ALTER WAREHOUSE IDENTIFIER($warehouse_name) SET
   MAX_CONCURRENCY_LEVEL               = 8
   STATEMENT_TIMEOUT_IN_SECONDS        = 3600
   STATEMENT_QUEUED_TIMEOUT_IN_SECONDS = 1200
   AUTO_SUSPEND                        = 30
   AUTO_RESUME                         = TRUE;

   -- Create Datadog user—key-pair only (no password)
   -- Replace <PUBLIC_KEY> with your RSA public key (PEM, no headers/newlines)
   CREATE USER IF NOT EXISTS IDENTIFIER($user_name)
   LOGIN_NAME     = $user_name
   RSA_PUBLIC_KEY = '<PUBLIC_KEY>';

   GRANT ROLE IDENTIFIER($role_name) TO USER IDENTIFIER($user_name);

   ALTER USER IDENTIFIER($user_name) SET
   DEFAULT_ROLE            = $role_name
   DEFAULT_WAREHOUSE       = $warehouse_name
   DEFAULT_SECONDARY_ROLES = ();
   ```

3. Otorgue privilegios de hacer un seguimiento al rol.

   ```sql
   -- Warehouse usage
   GRANT USAGE ON WAREHOUSE IDENTIFIER($warehouse_name) TO ROLE IDENTIFIER($role_name);

   -- Account‐level monitoring (tasks, pipes, query history)
   GRANT MONITOR EXECUTION ON ACCOUNT TO ROLE IDENTIFIER($role_name);

   -- Snowflake account-usage views for metadata, usage, and governance
   -- metrics. These do not grant access to the contents of your data.
   GRANT DATABASE ROLE SNOWFLAKE.OBJECT_VIEWER TO ROLE IDENTIFIER($role_name);
   GRANT DATABASE ROLE SNOWFLAKE.USAGE_VIEWER TO ROLE IDENTIFIER($role_name);
   GRANT DATABASE ROLE SNOWFLAKE.GOVERNANCE_VIEWER TO ROLE IDENTIFIER($role_name);
   ```

   <div class="alert alert-info">Para evitar que se omitan las nuevas tablas, utilice concesiones futuras a nivel de esquema. Snowflake da prioridad a las concesiones a nivel de esquema sobre las de nivel de base de datos. Si Datadog solo tiene permisos a nivel de base de datos, pero otros roles tienen permisos a nivel de esquema en los mismos esquemas, es posible que las tablas nuevas no aparezcan en Datadog. Consulte la <a href="https://docs.snowflake.com/en/sql-reference/sql/grant-privilege#considerations">documentación de Snowflake</a> para obtener más detalles.</div>

4. Otorgue acceso de solo lectura a sus datos. `grant_database_access` otorga acceso a nivel de esquema (en lugar de a nivel de base de datos) para preservar la precedencia sobre los permisos de otros roles, como se indicó anteriormente, y acepta una matriz JSON para que pueda otorgar acceso a más de una base de datos en una sola llamada.

   ```sql
   -- A database must be selected in order to create a procedure. This can be
   -- any database.
   USE DATABASE SNOWFLAKE;

   CREATE OR REPLACE PROCEDURE grant_database_access(
       databaseNamesJson STRING,
       roleName STRING
   )
   RETURNS STRING
   LANGUAGE JAVASCRIPT
   EXECUTE AS CALLER
   AS
   $$
   function quoteIdentifier(name) {
       return '"' + name.replace(/"/g, '""') + '"';
   }

   var databaseNames;
   try {
       databaseNames = JSON.parse(DATABASENAMESJSON);
   } catch (error) {
       throw new Error("database_names_json must be a JSON array: " + error.message);
   }

   if (!Array.isArray(databaseNames) || databaseNames.length === 0) {
       throw new Error("database_names_json must contain at least one database");
   }

   // the role is always uppercased, so its name here matches regardless of
   // how it was entered when calling this procedure.
   var role = quoteIdentifier(String(ROLENAME).toUpperCase());

   // Grants on TABLE do not apply to dynamic tables, so they are listed
   // separately and additionally receive MONITOR, which dynamic tables need
   // to expose scheduling/lineage metadata.
   var selectKinds = [
       "TABLES",
       "VIEWS",
       "MATERIALIZED VIEWS",
       "EXTERNAL TABLES",
       "EVENT TABLES",
       "ICEBERG TABLES"
   ];

   var databaseCount = 0;
   var schemaCount = 0;

   for (var databaseIndex = 0;
        databaseIndex < databaseNames.length;
        databaseIndex++) {
       var database = quoteIdentifier(databaseNames[databaseIndex]);

       snowflake.execute({sqlText: "GRANT USAGE ON DATABASE " + database + " TO ROLE " + role});

       var schemaResultSet = snowflake.execute({
           sqlText:
               "SELECT SCHEMA_NAME " +
               "FROM " + database + ".INFORMATION_SCHEMA.SCHEMATA " +
               "WHERE SCHEMA_NAME <> 'INFORMATION_SCHEMA'"
       });

       while (schemaResultSet.next()) {
           var schema = quoteIdentifier(schemaResultSet.getColumnValue(1));
           var qualifiedSchema = database + "." + schema;

           snowflake.execute({sqlText: "GRANT USAGE ON SCHEMA " + qualifiedSchema + " TO ROLE " + role});

           for (var kindIndex = 0; kindIndex < selectKinds.length; kindIndex++) {
               var kind = selectKinds[kindIndex];
               snowflake.execute({sqlText: "GRANT SELECT ON ALL " + kind +
                       " IN SCHEMA " + qualifiedSchema + " TO ROLE " + role});
               snowflake.execute({sqlText: "GRANT SELECT ON FUTURE " + kind +
                       " IN SCHEMA " + qualifiedSchema + " TO ROLE " + role});
           }

           snowflake.execute({sqlText: "GRANT SELECT, MONITOR ON ALL DYNAMIC TABLES" +
                   " IN SCHEMA " + qualifiedSchema + " TO ROLE " + role});
           snowflake.execute({sqlText: "GRANT SELECT, MONITOR ON FUTURE DYNAMIC TABLES" +
                   " IN SCHEMA " + qualifiedSchema + " TO ROLE " + role});

           schemaCount++;
       }

       // Covers schemas created after onboarding. The schema-level future
       // grants above remain necessary because they take precedence
       // wherever both exist.
       snowflake.execute({sqlText: "GRANT USAGE ON FUTURE SCHEMAS IN DATABASE " + database +
               " TO ROLE " + role});

       for (var futureKindIndex = 0;
            futureKindIndex < selectKinds.length;
            futureKindIndex++) {
           snowflake.execute({sqlText: "GRANT SELECT ON FUTURE " + selectKinds[futureKindIndex] +
                   " IN DATABASE " + database + " TO ROLE " + role});
       }

       snowflake.execute({sqlText: "GRANT SELECT, MONITOR ON FUTURE DYNAMIC TABLES IN DATABASE " +
               database + " TO ROLE " + role});

       databaseCount++;
   }

   return (
       "Granted Datadog access to " + databaseCount +
       " database(s) and " + schemaCount +
       " existing schema(s)"
   );
   $$
   ;

   CALL grant_database_access('["<YOUR_DATABASE>"]', '<ROLE_NAME>');
   ```

   Ejecute la instrucción `CALL` nuevamente (con una lista de bases de datos actualizada) cada vez que desee otorgar acceso a una nueva base de datos, o [como parte de su configuración de CI][8] para que las bases de datos efímeras sigan siendo legibles.

5. (Opcional) Si su organización utiliza [tablas de eventos de Snowflake][2], puede otorgar acceso a ellas al rol de Datadog.

   ```sql
   -- Grant usage on the database, schema, and table of the event table
   GRANT USAGE ON DATABASE <EVENT_TABLE_DATABASE> TO ROLE IDENTIFIER($role_name);
   GRANT USAGE ON SCHEMA <EVENT_TABLE_DATABASE>.<EVENT_TABLE_SCHEMA> TO ROLE IDENTIFIER($role_name);
   GRANT SELECT ON TABLE <EVENT_TABLE_DATABASE>.<EVENT_TABLE_SCHEMA>.<EVENT_TABLE_NAME> TO ROLE IDENTIFIER($role_name);

   -- Snowflake-provided application roles for event logs
   GRANT APPLICATION ROLE SNOWFLAKE.EVENTS_VIEWER TO ROLE IDENTIFIER($role_name);
   GRANT APPLICATION ROLE SNOWFLAKE.EVENTS_ADMIN TO ROLE IDENTIFIER($role_name);
   ```

   Después de completar la configuración de Snowflake, configure la integración de Snowflake en Datadog.

## Configure la integración de Snowflake en Datadog {#configure-the-snowflake-integration-in-datadog}

Para configurar la integración de Snowflake en Datadog:

1. Navegue a [{{< ui >}}Datadog Data Observability{{< /ui >}} > {{< ui >}}Settings{{< /ui >}}][3].
2. Haga clic en el botón {{< ui >}}Configure{{< /ui >}} para la opción de Snowflake.

   {{< img src="data_observability/data-obs-settings-integrations.png" alt="Lista de integraciones de Data Observability en la página de Configuración" style="width:100%;" >}}

3. Siga el registrar para ingresar los detalles de su cuenta y cargar una clave privada.
4. Active {{< ui >}}Enable Data Observability for Snowflake tables{{< /ui >}}.
5. (Opcional) En {{< ui >}}Custom alias URLs{{< /ui >}}, registre cualquier nombre adicional que otras herramientas utilicen para hacer referencia a esta cuenta de Snowflake. Los ejemplos incluyen el identificador de cuenta configurado en dbt, la cadena de conexión utilizada por una herramienta de BI o una URL de AWS PrivateLink. Consulte [URLs de alias personalizadas](#custom-alias-urls) a continuación para saber cuándo es necesario.
6. Haga clic en {{< ui >}}Save & Test{{< /ui >}}.

### URLs de alias personalizadas {#custom-alias-urls}

Este campo es opcional. Úselo cuando el nombre de la cuenta de Snowflake al que se conecta Datadog no coincida con la forma en que otras herramientas hacen referencia a la misma cuenta.

Los eventos de linaje externos a Datadog incluyen emisores de OpenLineage, manifiestos de dbt e historial de consultas de otras herramientas. Estos eventos identifican el almacén utilizando cualquier nombre con el que se haya configurado la herramienta ascendente. Si esos nombres difieren de la URL de cuenta canónica que utiliza Datadog, el linaje de esas fuentes no se vincula a esta integración de Snowflake.

Registrar cada nombre alternativo como un {{< ui >}}Custom alias URL{{< /ui >}} le indica a Datadog que los trate como referencias a la misma cuenta de Snowflake. El linaje entre herramientas se resuelve correctamente. Los casos comunes incluyen:

- La cuenta se alcanza a través de una URL de AWS PrivateLink.
- Un proyecto de dbt, una herramienta de BI u otro conector está configurado con un identificador de cuenta que no coincide con la URL canónica.

Para agregar un alias, expanda {{< ui >}}Configure Data Observability{{< /ui >}} durante la configuración de la integración y haga clic en {{< ui >}}\+ Add Alias{{< /ui >}} bajo {{< ui >}}Custom alias URLs{{< /ui >}}. Agregue una entrada por cada nombre alternativo. Los alias se aplican solo a la cuenta de Snowflake que se está configurando; cada integración de Snowflake administra su propia lista de alias.

## Tareas de Snowflake y Snowpipes {#snowflake-tasks-and-snowpipes}

Datadog deriva el linaje de las tareas de Snowflake y los Snowpipes mediante el parseo de sus definiciones SQL.
- Para las tareas, esto incluye las dependencias entre tareas y el linaje hacia las tablas de destino.
- Para los Snowpipes, Datadog deriva el linaje desde la etapa de origen hasta la tabla de destino.

Ambas funciones requieren el permiso `GRANT MONITOR EXECUTION ON ACCOUNT` otorgado durante la configuración.

<div class="alert alert-info">Las trazas de tareas de Snowflake están en versión preliminar. Comuníquese con su representante de cuenta para habilitar esta función.</div>

Cuando se habilita, cada ejecución del gráfico de tareas aparece como una traza en APM con tareas individuales como tramos, incluyendo detalles de ejecución como estado, duración y errores. Para encontrarlos:
1. En Datadog, vaya a {{< ui >}}APM{{< /ui >}} > [{{< ui >}}Trace Explorer{{< /ui >}}][4].
2. Filtre el Explorer:
   - Para el tramo del gráfico de tareas de nivel superior, filtre por `operation_name:snowflake.task_graph`
   - Para tramos de tareas individuales, filtre por `operation_name:snowflake.task`

## Etiquetas de objeto {#object-tags}

Datadog ingiere [etiquetas de objeto de Snowflake][6] aplicadas a sus tablas y las adjunta a la tabla correspondiente en Data Observability. Las etiquetas se leen desde `SNOWFLAKE.ACCOUNT_USAGE.TAG_REFERENCES` utilizando el rol de base de datos `SNOWFLAKE.GOVERNANCE_VIEWER` otorgado durante la configuración, por lo que no se requieren permisos adicionales.

Las etiquetas ingeridas están disponibles como atributos en la fuente de datos **Data Observability Metrics**, junto con `database`, `schema`, `table` y `entity_id`. En el Metrics Explorer y en el editor de widgets de dashboards, puede usarlas para:

- Filtrar métricas de tabla por una dimensión de negocio (por ejemplo, `data_source` o `data_domain`).
- Agrupar métricas por un valor de etiqueta.
- Controlar variables de plantilla en dashboards.

Datadog ingiere hasta 50 etiquetas por tabla, que es el límite documentado de Snowflake. Las etiquetas se actualizan en cada rastreo, por lo que los cambios en Snowflake aparecen después de la siguiente sincronización.

## Próximos pasos {#next-steps}

Después de guardar, Datadog comienza a sincronizar su esquema de información e historial de consultas en segundo plano. Las sincronizaciones iniciales pueden tardar hasta varias horas dependiendo del tamaño de su implementación de Snowflake.

Una vez completada la sincronización inicial, cree un [Data Observability monitor][5] para comenzar a alertar sobre frescura, recuento de filas, métricas a nivel de columna y métricas SQL personalizadas.

## Solucionar problemas de permisos {#troubleshoot-permissions}

Si Datadog no puede ver las bases de datos, esquemas o tablas esperados en su cuenta de Snowflake, siga estos pasos para verificar que el rol de Datadog tenga el acceso correcto.

<div class="alert alert-info">La consola de Snowflake habilita los roles secundarios de forma predeterminada, lo que puede hacer parecer que un rol tiene más acceso del que realmente tiene. El paso 2 a continuación ayuda a garantizar que esté realizando pruebas solo con los permisos del rol de Datadog.</div>

1. Establezca el rol y el usuario como los mismos que se aprovisionaron para Datadog:
   ```sql
   USE ROLE DATADOG_ROLE;
   ```

2. Deshabilite los roles secundarios para que solo estén activos los permisos del rol de Datadog:
   ```sql
   USE SECONDARY ROLES NONE;
   ```

3. Verifique que el rol correcto esté establecido y que no haya roles secundarios en uso:
   ```sql
   SELECT CURRENT_ROLE(), CURRENT_SECONDARY_ROLES();
   ```

4. Liste las bases de datos a las que el rol de Datadog puede acceder:
   ```sql
   SELECT database_name FROM snowflake.information_schema.databases;
   ```

5. Verifique el acceso a esquemas o tablas específicos:
   ```sql
   SHOW SCHEMAS IN DATABASE "<DATABASE_NAME>";
   SHOW TABLES IN SCHEMA "<DATABASE_NAME>"."<SCHEMA_NAME>";
   ```

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.snowflake.com/en/user-guide/key-pair-auth#generate-the-private-key
[2]: https://docs.snowflake.com/en/developer-guide/logging-tracing/event-table-setting-up
[3]: https://app.datadoghq.com/data-obs/settings/integrations
[4]: https://app.datadoghq.com/apm/traces
[5]: /es/monitors/types/data_observability/
[6]: https://docs.snowflake.com/en/user-guide/object-tagging
[7]: /es/api/latest/ip-ranges/
[8]: /es/data_observability/cicd/#drift-detection