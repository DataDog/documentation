---
title: Datadog-Nagios Integration
integration_title: Nagios
kind: integration
doclevel: basic
---

## Overview

Capture Nagios activity in Datadog to:

  * Identify trends in service failures at a glance.
  * Recall issue resolutions with a single click.
  * Discuss service failures with your team.

Set up information collection for Nagios by editing the given YAML configuration file [nagios.yaml.example][1] and renaming it as nagios.yaml After having Nagios reporting to Datadog for a week, an interactive report on alerting checks can be found [here][2]. To integrate with the Icinga fork of Nagios, you should be able to use the Nagios integration to pull in Icinga events. Just link to the Icinga configuration instead of the Nagios one.

{{< insert-example-links >}}

   [1]: https://github.com/DataDog/integrations-core/blob/master/nagios/conf.yaml.example
   [2]: https://app.datadoghq.com/report/nagios
