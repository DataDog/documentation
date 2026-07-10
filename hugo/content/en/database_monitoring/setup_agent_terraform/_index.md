---
title: Provision the Datadog Agent with Terraform
description: Provision the Datadog Agent for Database Monitoring with Terraform across managed and self-hosted databases.
further_reading:
- link: "/database_monitoring/data_collected/"
  tag: "Documentation"
  text: "Database Monitoring data collected"
- link: "https://github.com/DataDog/dd-database-monitoring-example"
  tag: "Source code"
  text: "dd-database-monitoring-example on GitHub"
---

Use Terraform to provision the Datadog Agent for Database Monitoring (DBM) on AWS. The Terraform examples are available in [`DataDog/dd-database-monitoring-example`][1] and cover the Agent side of the setup — each example deploys the Agent and wires it to your database. They do not provision the database itself or configure database-side parameters.

Select your database to get started:

{{< partial name="dbm/dbm-setup-agent-terraform" >}}

[1]: https://github.com/DataDog/dd-database-monitoring-example
