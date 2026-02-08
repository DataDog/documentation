---
title: Setting up Heroku Postgres for Database Monitoring
private: true
aliases:
- /database_monitoring/guide/heroku-postgres/
further_reading:
- link: "/agent/basic_agent_usage/heroku/"
  tag: "Documentation"
  text: "Datadog Heroku Buildpack"
- link: "/database_monitoring/guide/parameterized_queries/"
  tag: "Documentation"
  text: "Capturing SQL Query Parameter Values"
---

This guide assumes that you have configured the [Datadog Heroku buildpack][1] in your application dynos.

[Datadog Database Monitoring][2] allows you to view query metrics and explain plans from all of your databases in a single place. This guide covers how to set up Database Monitoring for a [Heroku Postgres managed database][3].

*Note*: Only databases in the [Standard and Premium plans][4] publish metrics used by the integration. Not all the features of Database Monitoring are available when used with a Postgres instance in the Hobby plan.

## Preparing the Postgres Database

First, create a `datadog` user in your database:

``` shell
# Ensure that you are in the root directory of the application
heroku pg:credentials:create --name datadog

# Attach the new credential to the application
heroku addons:attach <database-name> --credential datadog
```

Attaching the new credential to the application creates a new environment variable in your application with the connection URL. Note that environment variable, as you will use it later.

Login to your Postgres database using the default credentials and give the `datadog` credential the right permissions:

``` shell
heroku pg:psql
```

Once in the psql terminal, create the following schema:

``` sql
CREATE SCHEMA datadog;
GRANT USAGE ON SCHEMA datadog TO datadog;
GRANT USAGE ON SCHEMA public TO datadog;
GRANT pg_monitor TO datadog;
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;
```

Create the following function in the database:

``` sql
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

Create the function **in every database** to enable the Agent to collect column statistics.

```SQL
CREATE OR REPLACE FUNCTION datadog.column_stats() RETURNS TABLE (
    schemaname name, tablename name, attname name,
    n_distinct real, avg_width integer, null_frac real
) AS
$$
  SELECT schemaname, tablename, attname, n_distinct, avg_width, null_frac
  FROM pg_stats;
$$
LANGUAGE sql
SECURITY DEFINER;
```

## Configuring the Postgres integration

Next, configure the Datadog agent to enable the Postgres integration, using one of the following two options.

**Option A**: Use a buildpack to create a static Postgres configuration that cannot be modified. In addition, Database Monitoring may be enabled through this method.

**Option B**: Create a custom Postgres configuration with the ability to enable additional features that aren’t available through the static configuration in Option A.

{{< tabs >}}
{{% tab "Option A: Static Configuration" %}}
### Static Configuration

To enable the Postgres integration to collect standard metrics, set `DD_ENABLE_HEROKU_POSTGRES` to true, then rebuild the application:

``` shell
heroku config:set DD_ENABLE_HEROKU_POSTGRES=true
git commit --allow-empty -m "enabled postgres integration"
git push heroku main
```

To enable both the Postgres integration and Database Monitoring, set `DD_ENABLE_HEROKU_POSTGRES` and `DD_ENABLE_DBM` to true:

``` shell
heroku config:set DD_ENABLE_HEROKU_POSTGRES=true
heroku config:add DD_ENABLE_DBM=true
git commit --allow-empty -m "enabled postgres integration with DBM"
git push heroku main
```

The Postgres integration and, if enabled, Database Monitoring, will begin collecting metrics.
{{% /tab %}}

{{% tab "Option B: Custom Configuration" %}}
### Custom Configuration

<div class="alert alert-danger">
<strong>Important</strong>: If you tried Option A first and need to remove the <code>DD_ENABLE_HEROKU_POSTGRES</code> and <code>DD_ENABLE_DBM</code> configurations, use the commands below:

``` shell
heroku config:unset DD_ENABLE_HEROKU_POSTGRES
heroku config:unset DD_ENABLE_DBM
```
</div>

First, find the connection string for the Datadog user to connect to Postgres by running `heroku config` and locating the `HEROKU_POSTGRESQL_<COLOR>_URL` variable.

The `<COLOR>` component of the variable name differs by user. In the sample output below, the `<COLOR>` component is `IVORY`. Copy or note the connection string found in your `HEROKU_POSTGRESQL_<COLOR>_URL` variable.

``` bash {hl_lines=[9]}
=== immense-scrubland-xxxxx Config Vars
DATABASE_URL:                   postgres://<ADMIN_USER>:<ADMIN_PASSWORD>@<DATABASE_ENDPOINT>:<PORT>/<DB_NAME>
DD_API_KEY:                     *****
DD_DYNO_HOST:                   true
DD_SITE:                        datadoghq.com
HEROKU_APP_DEFAULT_DOMAIN_NAME: immense-scrubland-xxxxx.herokuapp.com
HEROKU_APP_ID:                  9159bc31-f54f-xxxxx-99fc-876f51bfea94
HEROKU_APP_NAME:                immense-scrubland-xxxxx
HEROKU_POSTGRESQL_IVORY_URL:    postgres://<DATADOG_USERNAME>:<DATADOG_USER_PASSWORD>@<DATABASE_ENDPOINT>:<PORT>/<DB_NAME>
HEROKU_RELEASE_CREATED_AT:      2024-10-23T19:18:24Z
HEROKU_RELEASE_VERSION:         v17
HEROKU_SLUG_COMMIT:             383c7b6105fe2a11baeddb9b75703eb1660dd519
HEROKU_SLUG_DESCRIPTION:        Deploy 383c7b61
```

In the root of the project, create a directory for the Postgres configuration called `datadog/conf.d/postgres.d`, containing a file called `conf.yaml`:

``` shell
mkdir -p datadog/conf.d/postgres.d
touch datadog/conf.d/postgres.d/conf.yaml
```

Add the following to `conf.yaml`:

``` yaml
init_config:
instances:
  - dbm: true
    host: <DATABASE_ENDPOINT>
    port: <PORT>
    username: <DATADOG_USERNAME>
    password: <DATADOG_USER_PASSWORD>
    dbname: <DB_NAME>
    ssl: True
```

To manually locate the correct values for the placeholders in the YAML file, follow the [Manual Setup](#manual-setup). To programmatically replace them, follow the [Prerun Script](#prerun-script) instructions.

{{% collapse-content title="Manual Setup" level="h5" %}}
#### Manual Setup

Locate the`HEROKU_POSTGRESQL_<COLOR>_URL` connection string from above. If you need to locate the string again, run `heroku config`. The connection string follows the structure:

`postgres://<DATADOG_USERNAME>:<DATADOG_USER_PASSWORD>@<DATABASE_ENDPOINT>:<PORT>/<DB_NAME>`.

Using that structure, replace the `conf.yaml` placeholders, save the file, and redeploy the Heroku application and agent with the commands below:

``` shell
git add .
git commit --allow-empty -m "enable postgres integration"
git push heroku main
```
{{% /collapse-content %}}

{{% collapse-content title="Prerun Script" level="h5" %}}
#### Prerun Script

Using a [prerun script][5], you can programatically replace the placeholder `conf.yaml` values before starting the Datadog Agent. If you don't have a prerun script yet, create a shell script called `prerun.sh` in the `datadog/` directory in project root, and add the script below.

**Note:** In the below example, the Datadog user connection variable in the Heroku configuration is called `HEROKU_POSTGRESQL_IVORY_URL`. Replace `IVORY` with the component that appears as part of your connection variable.

``` shell
#!/usr/bin/env bash

# Update the Postgres configuration using the Heroku application environment variable
if [ -n "$HEROKU_POSTGRESQL_IVORY_URL" ]; then
  POSTGREGEX='^postgres://([^:]+):([^@]+)@([^:]+):([^/]+)/(.*)$'
  if [[ $HEROKU_POSTGRESQL_IVORY_URL =~ $POSTGREGEX ]]; then
    sed -i "s/<DATABASE_ENDPOINT>/${BASH_REMATCH[3]}/" "$DD_CONF_DIR/conf.d/postgres.d/conf.yaml"
    sed -i "s/<DATADOG_USERNAME>/${BASH_REMATCH[1]}/" "$DD_CONF_DIR/conf.d/postgres.d/conf.yaml"
    sed -i "s/<DATADOG_USER_PASSWORD>/${BASH_REMATCH[2]}/" "$DD_CONF_DIR/conf.d/postgres.d/conf.yaml"
    sed -i "s/<PORT>/${BASH_REMATCH[4]}/" "$DD_CONF_DIR/conf.d/postgres.d/conf.yaml"
    sed -i "s/<DB_NAME>/${BASH_REMATCH[5]}/" "$DD_CONF_DIR/conf.d/postgres.d/conf.yaml"
  fi
fi
```

Deploy to Heroku:

``` shell
git add .
git commit -m "Enable postgres integration"
git push heroku main
```

[5]: /agent/basic_agent_usage/heroku/#prerun-script
{{% /collapse-content %}}
{{% /tab %}}
{{< /tabs >}}

The database connection is now configured. To enable additional features, such as [schema collection][6], refer to the options available in the Postgres [conf.yaml.example][7] file.

[1]: /agent/basic_agent_usage/heroku/
[2]: https://www.datadoghq.com/product/database-monitoring/
[3]: https://devcenter.heroku.com/articles/heroku-postgresql
[4]: https://devcenter.heroku.com/articles/heroku-postgres-plans
[6]: /database_monitoring/schema_explorer
[7]: https://github.com/DataDog/integrations-core/blob/master/postgres/datadog_checks/postgres/data/conf.yaml.example
