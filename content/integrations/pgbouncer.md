---
title: Datadog-PGBouncer Integration
integration_title: PGBouncer
git_integration_title: pgbouncer
kind: integration

---
### Overview

Connect your PGBouncer to Datadog in order to:

* Visualize your pools of connections.
* Monitor the traffic between PostgreSQL and your applications.
* Be notified about pgbouncer failovers and events.


### Configuration

To configure the PGBouncer integration, copy `pgbouncer.yaml.example` to `pgbouncer.yaml` and make the appropriate changes.


    init_config:

    instances:
      - host: localhost
        port: 15433
        username: my_username
        password: my_password
        tags:
          - env:prod
      - database_url: postgresql://user:pass@host:5432/dbname?sslmode=require
        tags:
          - role:main


<%= insert_example_links%>

### Validation

When you run datadog-agent info you should see something like the following:

    Checks
    ======

        pgbouncer
        -----------
          - instance #0 [OK]
          - Collected 39 metrics, 0 events & 1 service check
### Metrics

<%= get_metrics_from_git() %>

### Service Checks

**pgbouncer.can_connect**
: Agent is able to connect to the pgbouncer instance