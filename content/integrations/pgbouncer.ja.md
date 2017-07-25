---
git_integration_title: pgbouncer
integration_title: PGBouncer
kind: integration
placeholder: true
title: Datadog-PGBouncer Integration
---

<div class='alert alert-info'><strong>NOTICE:</strong>アクセスいただきありがとうございます。こちらのページは現在英語のみのご用意となっております。引き続き日本語化の範囲を広げてまいりますので、皆様のご理解のほどよろしくお願いいたします。</div>


## Overview

Connect your PGBouncer to Datadog in order to:

* Visualize your pools of connections.
* Monitor the traffic between PostgreSQL and your applications.
* Be notified about pgbouncer failovers and events.


## Configuration

To configure the PGBouncer integration, copy `pgbouncer.yaml.example` to `pgbouncer.yaml` and make the appropriate changes.

{{< highlight yaml >}}
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
{{< /highlight >}}

{{< insert-example-links >}}

## Validation

When you run `/etc/init.d/datadog-agent info` you should see something like the following:
{{< highlight shell >}}
Checks
======

    pgbouncer
    -----------
      - instance #0 [OK]
      - Collected 39 metrics, 0 events & 1 service check
{{< /highlight >}}

## Metrics

{{< get-metrics-from-git >}}

## Service Checks

**pgbouncer.can_connect**
: Agent is able to connect to the pgbouncer instance
