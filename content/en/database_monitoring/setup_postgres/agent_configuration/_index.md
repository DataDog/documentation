---
title: Setting Up the Datadog Agent for Postgres Database Monitoring
description: Configure the Datadog Agent for Postgres Database Monitoring 
further_reading:
- link: "/integrations/postgres/"
  tag: "Documentation"
  text: "DBM Postgres Integration"
---

Your Postgres database should now be ready for monitoring. If you haven't set it up yet, go to the [Postgres Setup Page](/database_monitoring/setup_postgres/) and follow the steps for your hosting type.

Installing the Datadog Agent also installs the Postgres check, which is required for Database Monitoring on Postgres. 
If you haven't installed the Agent, see the [Agent installation instructions][8]. Then, return here to continue with the instructions for your installation method.

### Setup instructions by hosting type

To learn how to set up Database Monitoring on a Postgres database, select your hosting type:

{{< partial name="dbm/dbm-setup-postgres-agent-configuration" >}}

### Autodiscover Postgres Instances

Have multiple Postgres instances you would like to monitor? Try one of our Autodiscovery options below:

- [Amazon Aurora Autodiscovery][1]

- [Amazon RDS Autodiscovery][2]

<br>

[1]: /database_monitoring/guide/aurora_autodiscovery?tab=postgres
[2]: /database_monitoring/guide/rds_autodiscovery/?tab=postgres