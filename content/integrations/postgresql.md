---
title: Datadog-PostgreSQL Integration
integration_title: PostgreSQL
kind: integration
git_integration_title: postgres
newhlevel: true
---

## Overview

{{< img src="pggraph.png" >}}
Connect PostgreSQL to Datadog in order to:

* Visualize your database performance.
* Correlate the performance of PostgreSQL with the rest of your applications.

## Installation

To get started with the PostgreSQL integration, create at least a read-only datadog user with proper access to your PostgreSQL Server. Start psql on your PostgreSQL database and run:

    create user datadog with password '<PASSWORD>';
    grant SELECT ON pg_stat_database to datadog;


To verify the correct permissions you can run the following command:

    psql -h localhost -U datadog postgres -c \
    "select * from pg_stat_database LIMIT(1);"
    && echo -e "\e[0;32mPostgres connection - OK\e[0m" || \
    || echo -e "\e[0;31mCannot connect to Postgres\e[0m"


When it prompts for a password, enter the one used in the first command.

## Configuration

1.  Configure the Agent to connect to PostgreSQL. Edit conf.d/postgres.yaml:

        init_config:

        instances:
          - host: localhost
            port: 5432


1.  Restart the agent.

### Configuration Options

* `username` (Optional)
* `password` (Optional)
* `dbname` (Optional) - Name of the database you want to monitor
* `ssl` (Optional) - Defaults to False. Whether to use SSL to connect.
* `tags` (Optional) - Dictionary of tags
* `relations` (Optional) - Dictionary of per-relation (table) metrics that you want to track. Each relation generates 10 metrics + 10 metrics per index.

  By default all schemas are included. To track relations from specific schemas only, use the following syntax:

      relations:
        - relation_name: another_table
          schemas:
            - public
            - prod

* `collect_function_metrics` (Optional) - Collect metrics regarding PL/pgSQL functions from pg_stat_user_functions
* `collect_count_metrics` (Optional) - Collect count metrics, default value is True for backward compatibility but they migth be slow, suggested value is False.


### Custom metrics

Below are some examples of commonly used metrics, which are implemented as custom metrics. Uncomment them if you want to use them as is, or use as an example for creating your own custom metrics.

The format for describing custome metrics is identical with the one used for common metrics in `postgres.py`. Be extra careful with ensuring proper custom metrics description format. If your custom metric does not work after an agent restart, look for errors in the output of `/etc/init.d/datadog-agent info` command, as well as `/var/log/datadog/collector.log` file.

    custom_metrics:
    - # Londiste 3 replication lag
      descriptors:
        - [consumer_name, consumer_name]
      metrics:
        >
          GREATEST(0, EXTRACT(EPOCH FROM lag)) as lag:
          [postgresql.londiste_lag, GAUGE]
        >
          GREATEST(0, EXTRACT(EPOCH FROM lag)) as last_seen:
          [postgresql.londiste_last_seen, GAUGE]
        pending_events: [postgresql.londiste_pending_events, GAUGE]
      query:
        >
          SELECT consumer_name, %s from pgq.get_consumer_info()
          where consumer_name !~ 'watermark$';
      relation: false
    collect_function_metrics: False
    collect_count_metrics: False



{{< insert-example-links conf="postgres" check="postgres" >}}

## Validation


After you restart the agent, you should be able to run the ```info``` command which will now include a section like this if the PostgreSQL integration is working:

    Checks
    ======

      [...]

      postgres
      --------
          - instance #0 [OK]
          - Collected 47 metrics & 0 events




## Metrics

{{< get-metrics-from-git >}}