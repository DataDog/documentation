---
title: Setting up Heroku Postgres for Database Monitoring
kind: guide
private: true
further_reading:
- link: /agent/basic_agent_usage/heroku/
  tag: Documentation
  text: Datadog Heroku Buildpack
---

This guide assumes that you have configured the [Datadog Heroku buildpack][1] in your application dynos.

[Datadog Database Monitoring][2] allows you to view query metrics and explain plans from all of your databases in a single place. This guide covers how to set up Database Monitoring for a [Heroku Postgres managed database][3].

*Note*: Only databases in the [Standard and Premium plans][4] publish metrics used by the integration. Not all the features of Database Monitoring are available when used with a Postgres instance in the Hobby plan.

First, create a `datadog` user in your database:

```shell
# Ensure that you are in the root directory of the application
heroku pg:credentials:create --name datadog

# Attach the new credential to the application
heroku addons:attach <database-name> --credential datadog
```

Attaching the new credential to the application creates a new environment variable in your application with the connection URL. Note that environment variable, as you will use it later.

Login to your Postgres database using the default credentials and give the `datadog` credential the right permissions:

```shell
heroku pg:psql
```

Once in the psql terminal, create the following schema:

```
CREATE SCHEMA datadog;
GRANT USAGE ON SCHEMA datadog TO datadog;
GRANT USAGE ON SCHEMA public TO datadog;
GRANT pg_monitor TO datadog;
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;
```

Create the following function in the database:

```
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

Finally, we configure the Datadog agent to enable the Postgres check using the new credentials:

```shell
# Ensure that you are in the root directory of your application
# Create the folder for the integrations configuration in your application code
mkdir -p datadog/conf.d/
```

Create a configuration file called `postgres.yaml` with the following contents (do not replace with your credentials, as this is done as part of the prerun script):

```yaml
init_config:

instances:
  - dbm: true
    host: <YOUR HOSTNAME>
    port: <YOUR PORT>
    username: <YOUR USERNAME>
    password: <YOUR PASSWORD>
    dbname: <YOUR DBNAME>
    ssl: True
```

Using the environment variable that was created when the `datadog` credential was attached to the application (in the example below, this is assumed to be `HEROKU_POSTGRESQL_PINK_URL`) add the following to the [prerun script][5] to replace those values before starting the Datadog Agent:

```bash
#!/usr/bin/env bash

# Update the Postgres configuration from above using the Heroku application environment variable
if [ -n "$HEROKU_POSTGRESQL_PINK_URL" ]; then
  POSTGREGEX='^postgres://([^:]+):([^@]+)@([^:]+):([^/]+)/(.*)$'
  if [[ $HEROKU_POSTGRESQL_PINK_URL =~ $POSTGREGEX ]]; then
    sed -i "s/<YOUR HOSTNAME>/${BASH_REMATCH[3]}/" "$DD_CONF_DIR/conf.d/postgres.d/conf.yaml"
    sed -i "s/<YOUR USERNAME>/${BASH_REMATCH[1]}/" "$DD_CONF_DIR/conf.d/postgres.d/conf.yaml"
    sed -i "s/<YOUR PASSWORD>/${BASH_REMATCH[2]}/" "$DD_CONF_DIR/conf.d/postgres.d/conf.yaml"
    sed -i "s/<YOUR PORT>/${BASH_REMATCH[4]}/" "$DD_CONF_DIR/conf.d/postgres.d/conf.yaml"
    sed -i "s/<YOUR DBNAME>/${BASH_REMATCH[5]}/" "$DD_CONF_DIR/conf.d/postgres.d/conf.yaml"
  fi
fi
```

Deploy to Heroku:

```shell
# Deploy to Heroku
git add .
git commit -m "Enable postgres integration"
git push heroku main
```

[1]: /agent/basic_agent_usage/heroku/
[2]: https://www.datadoghq.com/product/database-monitoring/
[3]: https://devcenter.heroku.com/articles/heroku-postgresql
[4]: https://devcenter.heroku.com/articles/heroku-postgres-plans
[5]: /agent/basic_agent_usage/heroku/#prerun-script
