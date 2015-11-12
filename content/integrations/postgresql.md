---
title: Datadog-PostgreSQL Integration
integration_title: PostgreSQL
kind: integration
git_integration_title: postgres
---

###Overview
{: #int-overview}

Connect PostgreSQL to Datadog in order to:

* Visualize your database performance.
* Correlate the performance of PostgreSQL with the rest of your applications.

### Metrics

<%= get_metrics_from_git()%> 

You can learn more about how we collect these metrics by looking at the source [here](https://github.com/DataDog/dd-agent/blob/master/checks.d/postgres.py).

### Prerequisites
To get started with the PostgreSQL integration, create at least a read-only datadog user with proper access to your PostgreSQL Server. Start psql on your PostgreSQL database and run:

    create user datadog with password '<PASSWORD>'; 
    grant SELECT ON pg_stat_database to datadog;

To verify the correct permissions you can run the following command:

    psql -h localhost -U datadog postgres -c "select * from pg_stat_database LIMIT(1);"  
    && echo -e "\e[0;32mPostgres connection - OK\e[0m" || \ ||  
    echo -e "\e[0;31mCannot connect to Postgres\e[0m"

When it prompts for a password, enter the one used in the first command.

### Integration Configuration
Go to the datadog conf.d directory (if you aren't sure where this is, refer to [this guide](http://docs.datadoghq.com/guides/basic_agent_usage/)) and either create a new postgres.yaml file or copy postgres.yaml.example to postgres.yaml. It should look something like this:

    init_config:

    instances:
      - host: localhost
        port: 5432
    #    username: my_username
    #    password: my_password
    #    dbname: db_name
    #    tags:
    #      - optional_tag1
    #      - optional_tag2

    # Track per-relation (table) metrics
    # The list of relations/tables must be specified here.
    # Each relation generates many metrics (10 + 10 per index)
    #
    #    relations:
    #      - my_table
    #      - my_other_table


    # Custom metrics 
    # Below are some examples of commonly used metrics, 
    # which are implemented as custom metrics. Uncomment them 
    # if you want to use them as is, or use as an example for 
    # creating your own custom metrics. The format for describing 
    # custom metrics is identical with the one used for common 
    # metrics in postgres.py 
    # 
    # Be extra careful with ensuring proper custom metrics 
    # description format. If your custom metric does not work 
    # after an agent restart, look for errors in the output 
    # of "/etc/init.d/datadog-agent info" command, as well as 
    # /var/log/datadog/collector.log file. 
    #
    #    custom_metrics:
    #    - # Londiste 3 replication lag 
    #      descriptors: 
    #        - [consumer_name, consumer_name]
    #      metrics: 
    #         GREATEST(0, EXTRACT(EPOCH FROM lag)) as lag: [postgresql.londiste_lag, GAUGE]
    #         GREATEST(0, EXTRACT(EPOCH FROM lag)) as last_seen: [postgresql.londiste_last_seen, GAUGE]
    #         pending_events: [postgresql.londiste_pending_events, GAUGE]
    #      query: SELECT consumer_name, %s from pgq.get_consumer_info() where consumer_name !~ 'watermark$';
    #      relation: false

After you restart the agent, you should be able to run the ```info``` command which will now include a section like this if the PostgreSQL integration is working:

    Checks
    ======

      [...]

      postgres
      --------
          - instance #0 [OK]
          - Collected 8 metrics & 0 events



