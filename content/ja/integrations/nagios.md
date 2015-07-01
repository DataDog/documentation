---
last_modified: 2015/03/31
translation_status: original
language: ja
title: Datadog-Nagios Integration
integration_title: Nagios
kind: integration
doclevel:
---

### Overview
{:#int-overview}

Capture Nagios activity in Datadog to:

- Identify trends in service failures at a glance.
- Recall issue resolutions with a single click.
- Discuss service failures with your team.


Set up information collection for Nagios in the file
[datadog.conf](https://github.com/DataDog/dd-agent/blob/master/datadog.conf.example#L120-L140).

After having Nagios reporting to Datadog for a week, an interactive report on alerting checks can be found [here](https://app.datadoghq.com/report/nagios).

To integrate with Icinga, because it is a fork of Nagios, you should be able to use the Nagios integration to pull in Icinga events. In your datadog.conf, just set:

    nagios_log: /var/log/icinga/icinga.log

Or where ever the Icinga server log lives, if you moved it from the standard location.
