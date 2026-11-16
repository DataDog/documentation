---
description: Instale y configure Database Monitoring para Supabase con el Datadog
  Agent.
further_reading:
- link: /integrations/postgres/
  tag: Documentación
  text: Integración básica de Postgres
title: Configuración de Database Monitoring para Supabase autohospedado
---
Database Monitoring proporciona una visibilidad profunda de sus bases de datos Supabase al exponer métricas de consultas, muestras de consultas, planes de ejecución, estados de bases de datos, conmutaciones por error y eventos.

<div class="alert alert-info">Datadog recomienda configurar Database Monitoring a través del mosaico de integración de Supabase Cloud. No se requiere la instalación del Agent. Consulte <a href="/database_monitoring/setup_postgres/supabase/cloud">Supabase Cloud</a> para obtener instrucciones.</div>

El Agent recopila telemetría directamente de la base de datos iniciando sesión como un usuario de solo lectura. Realice la siguiente configuración para habilitar Database Monitoring con su base de datos Supabase:

1. [Otorgue al Agent acceso a la base de datos](#grant-the-agent-access)
1. [Instale el Agent](#install-the-agent)

## Antes de comenzar {#before-you-begin}

Versiones de PostgreSQL compatibles
: 9.6, 10, 11, 12, 13, 14, 15, 16, 17

Versiones de Agent compatibles
: 7.69.1+

Impacto en el rendimiento
: La configuración predeterminada del Agent para Database Monitoring es conservadora, pero puede ajustar configuraciones como el intervalo de recopilación y la tasa de muestreo de consultas para que se adapten mejor a sus necesidades. Para la mayoría de las cargas de trabajo, el Agent representa menos del uno por ciento del tiempo de ejecución de consultas en la base de datos y menos del uno por ciento de la CPU. <br/><br/>
Database Monitoring se ejecuta como una integración sobre el Agent base ([consulte las pruebas de rendimiento][2]).

Proxies, balanceadores de carga y agrupadores de conexiones
: El Datadog Agent debe conectarse directamente al servidor al que se está haciendo un seguimiento. Para bases de datos autohospedadas, se prefiere `127.0.0.1` o el socket. El Agent no debe conectarse a la base de datos a través de un proxy, balanceador de carga o agrupador de conexiones como el Dedicated Pooler (pgbouncer) o el Session Pooler (Supavisor) de Supabase. Si el Agent se conecta a diferentes servidores mientras se ejecuta (como en el caso de conmutación por error, equilibrio de carga, etc.), el Agent calcula la diferencia en las estadísticas entre dos servidores, lo que produce métricas inexactas.

Consideraciones de seguridad de los datos
: Consulte [Información confidencial][3] para obtener información sobre qué datos recopila el Agent de sus bases de datos y cómo garantizar que estén seguros.

## Otorgue al Agent acceso {#grant-the-agent-access}

El Datadog Agent requiere acceso de solo lectura al servidor de base de datos para recopilar estadísticas y consultas.

Los siguientes comandos SQL deben ejecutarse en el servidor de base de datos **principal** (el escritor) en el clúster si Supabase está replicado. Elija una base de datos de Supabase en el servidor de base de datos a la que se conectará el Agent. El Agent puede recopilar telemetría de todas las bases de datos en el servidor de base de datos independientemente de a cuál se conecte, por lo que una buena opción es usar la base de datos `postgres` predeterminada. Elija una base de datos diferente solo si necesita que el Agent ejecute [consultas personalizadas sobre datos exclusivos de esa base de datos][6].

Conéctese a la base de datos elegida como superusuario (u otro usuario con permisos suficientes). Por ejemplo, si su base de datos elegida es `postgres`, conéctese como el usuario `postgres`.

Navegue a la pestaña SQL Editor dentro de Supabase y ejecute:

```SQL
CREATE USER datadog WITH password '<PASSWORD>';
```

{{< tabs >}}

{{% tab "Postgres ≥ 15" %}}

Otorgue al usuario `datadog` permiso para las tablas relevantes:

```SQL
ALTER ROLE datadog INHERIT;
```

Cree el siguiente esquema **en cada base de datos**:

```SQL
CREATE SCHEMA datadog;
GRANT USAGE ON SCHEMA datadog TO datadog;
GRANT USAGE ON SCHEMA public TO datadog;
GRANT USAGE ON SCHEMA extensions TO datadog;
GRANT pg_monitor TO datadog;
```

Además, asegúrese de que la extensión `pg_stat_statements` esté habilitada para su proyecto en Supabase.```

{{% /tab %}}

{{% tab "Postgres ≥ 10" %}}

Cree el siguiente esquema **en cada base de datos**:

```SQL
CREATE SCHEMA datadog;
GRANT USAGE ON SCHEMA datadog TO datadog;
GRANT USAGE ON SCHEMA public TO datadog;
GRANT USAGE ON SCHEMA extensions TO datadog;
GRANT pg_monitor TO datadog;
```

Además, asegúrese de que la extensión `pg_stat_statements` esté habilitada para su proyecto en Supabase.```

{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-info">Para la recopilación de datos o métricas personalizadas que requieran consultar tablas adicionales, es posible que deba otorgar el <code>SELECT</code> permiso sobre esas tablas al <code>datadog</code> usuario. Ejemplo: <code>grant SELECT on &lt;TABLE_NAME&gt; to datadog;</code>. Consulte <a href="https://docs.datadoghq.com/integrations/faq/postgres-custom-metric-collection-explained/">Recopilación de métricas personalizadas de PostgreSQL</a> para obtener más información. </div>

Cree la siguiente función **en cada base de datos** para permitir que el Agent recopile planes de ejecución.

```SQL
CREATE OR REPLACE FUNCTION datadog.explain_statement(
   l_query TEXT,
   OUT explain JSON
)
RETURNS SETOF JSON AS
$$
DECLARE
curs REFCURSOR;
plan JSON;

BEGIN
   OPEN curs FOR EXECUTE pg_catalog.concat('EXPLAIN (FORMAT JSON) ', l_query);
   FETCH curs INTO plan;
   CLOSE curs;
   RETURN QUERY SELECT plan;
END;
$$
LANGUAGE 'plpgsql'
RETURNS NULL ON NULL INPUT
SECURITY DEFINER;
```

### Cree la función de estadísticas de columna {#create-the-column-statistics-function}

Cree la siguiente función **en cada base de datos** para permitir que el Agent recopile estadísticas de tablas a nivel de columna de `pg_stats`:

```SQL
CREATE OR REPLACE FUNCTION datadog.column_statistics()
RETURNS TABLE (
    schemaname name, tablename name, attname name,
    n_distinct real, avg_width integer, null_frac real,
    inherited boolean, correlation real, most_common_freqs real[]
) AS
$$ SELECT schemaname, tablename, attname, n_distinct, avg_width, null_frac,
          inherited, correlation, most_common_freqs
          FROM pg_catalog.pg_stats
          WHERE schemaname NOT IN ('pg_catalog', 'information_schema'); $$
LANGUAGE sql
SECURITY DEFINER
SET search_path = pg_catalog, pg_temp;
```

Una vez que exista la función, habilite la recopilación en la configuración de su instancia de Postgres:

```yaml
instances:
  - dbm: true
    ...
    collect_column_statistics:
      enabled: true
```

Para ver opciones de ajuste, consulte [Configuración avanzada][18].

### Almacene su contraseña de forma segura {#securely-store-your-password}

{{% dbm-secret %}}

### Verifique {#verify}

Para verificar que los permisos sean correctos, conéctese a la base de datos como el usuario `datadog` y ejecute los siguientes comandos. Por ejemplo, si su base de datos es `postgres`, conéctese como el usuario `datadog` usando [psql][7] y ejecute:

```shell
psql -h {SUPABASE_HOST} -U datadog postgres -A \
  -c "select * from pg_stat_database limit 1;" \
  && echo -e "\e[0;32mPostgres connection - OK\e[0m" \
  || echo -e "\e[0;31mCannot connect to Postgres\e[0m"
psql -h {SUPABASE_HOST} -U datadog postgres -A \
  -c "select * from pg_stat_activity limit 1;" \
  && echo -e "\e[0;32mPostgres pg_stat_activity read OK\e[0m" \
  || echo -e "\e[0;31mCannot read from pg_stat_activity\e[0m"
psql -h {SUPABASE_HOST} -U datadog postgres -A \
  -c "select * from pg_stat_statements limit 1;" \
  && echo -e "\e[0;32mPostgres pg_stat_statements read OK\e[0m" \
  || echo -e "\e[0;31mCannot read from pg_stat_statements\e[0m"
```

Cuando se le solicite una contraseña, use la contraseña que creó para el usuario `datadog`.

## Instale el Agent {#install-the-agent}

La instalación del Datadog Agent también instala la verificación de Postgres, que es necesaria para Database Monitoring en Supabase.
Si no ha instalado el Agent, consulte las [instrucciones de instalación del Agent][8]. Luego, regrese aquí para continuar con las instrucciones para su método de instalación.

<div class="alert alert-info">La cadena de conexión directa predeterminada de Supabase solo es válida en redes IPv6.
Para conectar el Agent a una instancia de Supabase mediante este método, asegúrese de que la máquina que ejecuta el Agent tenga habilitado IPv6. Consulte la documentación de su proveedor de nube para obtener más información.
Las instancias de Supabase en el plan Pro o superior admiten direcciones IPv4 como complemento.</div>

Edite el archivo `conf.d/postgres.d/conf.yaml` del Agent para que apunte a la instancia de Supabase de la que desea hacer un seguimiento. Para obtener una lista completa de las opciones de configuración, consulte el [archivo de ejemplo postgres.d/conf.yaml][9].

```yaml
init_config:
instances:
    - dbm: true
      host: <SUPABASE_INSTANCE_ENDPOINT>
      port: 5432
      username: datadog
      password: 'ENC[datadog_user_database_password]'

      ## Optional: Connect to a different database if needed for `custom_queries`
      # dbname: '<DB_NAME>'
```

**Nota**: Si su contraseña incluye caracteres especiales, enciérrela entre comillas simples.

[Reinicie el Agent][16] para aplicar los cambios.

### Validar {#validate}

[Ejecute el subcomando status del Agent][13] y busque `postgres` en la sección Checks. ¡O visite la página [Databases][14] para comenzar!

## Ejemplos de configuraciones de Agent {#example-agent-configurations}

### Con el agrupador de sesiones de Supavisor {#with-supavisors-session-pooler}

Aunque recomendamos tener una conexión directa a la base de datos en lugar de conectarse a través de un proxy, aún puede conectar el Agent a su instancia de Supabase si las opciones anteriores no están disponibles para usted. Esto funcionará mejor cuando solo tenga una instancia en su proyecto de Supabase.

Obtenga la cadena de conexión del agrupador de sesiones para su proyecto a través del cuadro de diálogo Connect y cópiela en su archivo de configuración del Agent:

```yaml
init_config:
instances:
    - dbm: true
      host: <SUPABASE_POOLER_ENDPOINT>
      port: 5432
      username: datadog.some-project-id
      password: 'ENC[datadog_user_database_password]'
```

{{% dbm-postgres-agent-config-examples %}}

## Solución de problemas {#troubleshooting}

Si ha instalado y configurado las integraciones y el Agent como se describe y no funciona como se espera, consulte [Solución de problemas][15]

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.postgresql.org/docs/current/contrib.html
[2]: /es/database_monitoring/agent_integration_overhead/?tab=postgres
[3]: /es/database_monitoring/data_collected/#sensitive-information
[4]: https://www.postgresql.org/docs/current/config-setting.html
[5]: https://www.postgresql.org/docs/current/pgstatstatements.html
[6]: /es/integrations/faq/postgres-custom-metric-collection-explained/
[7]: https://www.postgresql.org/docs/current/app-psql.html
[8]: https://app.datadoghq.com/account/settings/agent/latest
[9]: https://github.com/DataDog/integrations-core/blob/master/postgres/datadog_checks/postgres/data/conf.yaml.example
[10]: /es/agent/configuration/agent-commands/#start-stop-and-restart-the-agent
[11]: https://www.postgresql.org/docs/11/runtime-config-logging.html
[12]: https://www.postgresql.org/message-id/20100210180532.GA20138@depesz.com
[13]: /es/agent/configuration/agent-commands/#agent-status-and-information
[14]: https://app.datadoghq.com/databases
[15]: /es/database_monitoring/troubleshooting/?tab=postgres
[16]: /es/agent/configuration/agent-commands/#restart-the-agent
[17]: https://supabase.com/docs/guides/platform/ipv4-address
[18]: /es/database_monitoring/setup_postgres/advanced_configuration/#configuring-column-statistics-collection