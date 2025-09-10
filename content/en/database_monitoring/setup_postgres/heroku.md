---
title: Setting up Heroku Postgres for Database Monitoring
private: true
further_reading:
- link: "/agent/basic_agent_usage/heroku/"
  tag: "Documentation"
  text: "Datadog Heroku Buildpack"
---

This guide assumes that you have configured the [Datadog Heroku buildpack][1] in your application dynos.

[Datadog Database Monitoring][2] allows you to view query metrics and explain plans from all of your databases in a single place. This guide covers how to set up Database Monitoring for a [Heroku Postgres managed database][3].

*Note*: Only databases in the [Standard and Premium plans][4] publish metrics used by the integration. Not all the features of Database Monitoring are available when used with a Postgres instance in the Hobby plan.

## Preparing the Postgres Database

First, create a `datadog` user in your database:

``` bash
# Ensure that you are in the root directory of the application
heroku pg:credentials:create --name datadog

# Attach the new credential to the application
heroku addons:attach <database-name> --credential datadog
```

Attaching the new credential to the application creates a new environment variable in your application with the connection URL. Note that environment variable, as you will use it later.

Login to your Postgres database using the default credentials and give the `datadog` credential the right permissions:

``` bash
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

## Configuring the Postgres Integration

Finally, we configure the Datadog agent to enable the Postgres Integration, for this we have two options.

**Option A**: The buildpack will create a static Postgres configuration that customers cannot modify. Enables the Postgres Standard Integration and optionall, DBM.

**Option B**: Allows the customer to create their own Postgres configuration allowing them to enable additional features that aren’t available in Option A.

{{% collapse-content title="Option A: Static Configuration" level="h4" %}}
### Static Configuration

To enable the Postgres Integration to collect standard metrics, simply set `DD_ENABLE_HEROKU_POSTGRES` to true and rebuild the application:

``` bash
heroku config:set DD_ENABLE_HEROKU_POSTGRES=true
git commit --allow-empty -m "enabled postgres integration"
git push heroku main
```
 
To enabled the Postgres Integration with DBM enabled, you will need both `DD_ENABLE_HEROKU_POSTGRES` and `DD_ENABLE_DBM` set to true:

``` bash
heroku config:set DD_ENABLE_HEROKU_POSTGRES=true
heroku config:add DD_ENABLE_DBM=true
git commit --allow-empty -m "enabled postgres integration with DBM"
git push heroku main
```

At this point the Postgres Integration should be running and monitoring your Heroku Database.
{{% /collapse-content %}}

{{% collapse-content title="Option B: Custom Configuration" level="h4" %}}
### Custom Configuration

<div class="alert alert-warning">
<strong>Important</strong>: If you tried Option A first and need to remove the <code>DD_ENABLE_HEROKU_POSTGRES</code> and <code>DD_ENABLE_DBM</code> configurations, use the commands below:

``` bash
heroku config:unset DD_ENABLE_HEROKU_POSTGRES
heroku config:unset DD_ENABLE_DBM
```
</div>

First we need to find the connect string for the Datadog user to connect to Postgres. We can find that by running the heroku config command (`heroku config`) and scouting for a variable that looks like `HEROKU_POSTGRESQL_<COLOR>_URL`:

The `<COLOR>` might be different for you but you should see and output like below:

``` bash
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

Notice that the connection string for the Datadog user is stored in the Heroku Configuration called `HEROKU_POSTGRESQL_IVORY_URL`. Keep this in mind.

In the root of the project, create a directory for the postgres configuration called `datadog/conf.d/postgres.d` and then a file inside called `conf.yaml`.

``` bash
mkdir -p datadog/conf.d/postgres.d
touch datadog/conf.d/postgres.d/conf.yaml
```
 
Add the following to the `conf.yaml`

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
 
{{% collapse-content title="Manual Setup" level="h5" %}}
#### Manual Setup

Now replace those values using the `HEROKU_POSTGRESQL_<COLOR>_URL` connection string where the URL follows the structure:

`postgres://<DATADOG_USERNAME>:<DATADOG_USER_PASSWORD>@<DATABASE_ENDPOINT>:<PORT>/<DB_NAME>`.

At this point you can enable additional features found in the postgres [conf.yaml.example](https://github.com/DataDog/integrations-core/blob/master/postgres/datadog_checks/postgres/data/conf.yaml.example) like [schema collection][6]. 

Once you have made the necessary changes, you can redeploy the heroku application and agent with the commands below:

``` bash
git add .
git commit --allow-empty -m "enable postgres integration"
git push heroku main
```
{{% /collapse-content %}}

{{% collapse-content title="Prerun Script" level="h5" %}}

#### Prerun Script

Using a [prerun script][5] you can programatically replace those values before starting the Datadog Agent. If you don't have a prerun script yet, create a shell script called `prerun.sh` in the `datadog/` directory in the root for the project and add the following:

Below is an example where the Datadog user connection string in the Heroku Configuration was called `HEROKU_POSTGRESQL_IVORY_URL`:

``` bash
#!/usr/bin/env bash

# Update the Postgres configuration from above using the Heroku application environment variable
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

``` bash
git add .
git commit -m "Enable postgres integration"
git push heroku main
```

{{% /collapse-content %}}

{{% /collapse-content %}}

[1]: /agent/basic_agent_usage/heroku/
[2]: https://www.datadoghq.com/product/database-monitoring/
[3]: https://devcenter.heroku.com/articles/heroku-postgresql
[4]: https://devcenter.heroku.com/articles/heroku-postgres-plans
[5]: /agent/basic_agent_usage/heroku/#prerun-script
[6]: /database_monitoring/schema_explorer
