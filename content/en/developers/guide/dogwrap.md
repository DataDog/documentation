---
title: Dogwrap
description: "Call commands and generate events from their results with Dogwrap"
kind: guide
disable_toc: true
aliases:
- /developers/faq/can-i-call-scripts-and-generate-events-from-their-results
---

The Dogwrap command line tool allows you to call commands and generate events from their results. In order to use Dogwrap, install the [Datadog Python Library][1]:

To install from pip:

```
pip install datadog
```

To install from source:

1. Clone the [DataDog/datadogpy][1] repository
2. Inside the root folder run: `python setup.py install`


The minimum valid `dogwrap` command has the following layout:

```bash
dogwrap -n <EVENT_TITLE> -k <DATADOG_API_KEY> --submit_mode <SUBMIT_MODE> "<COMMAND>"
```

With the following placeholders:

* `<EVENT_TITLE>`: Title of the Event to display in Datadog
* `<DATADOG_API_KEY>`: [The Datadog API key associated with your organization][2]
* `<SUBMIT_MODE>`: Defines when to send an event depending of the output of the wrapped script:
    * `all`: send events on every run
    * `errors`: send events if the script exits with a non-zero exit code
* `<COMMAND>`: Command to wrap and generate events from. You must enclose your called command in quotes to prevent python from thinking the command line arguments belong to the python command instead of the wrapped one.

**Note**: Use the dogwrap help command line `dogwrap help` to discover all available options.

For an example of `dogwrap` in action, consider `cron`. Let's say you have a cron script to vacuum a Postgres table every day:

```bash
0 0 * * * psql -c 'vacuum verbose my_table' >> /var/log/postgres_vacuums.log 2>&1
```

Vacuuming is particularly resource-intensive though, so you might want Datadog events for each time they run to correlate metrics and other events with vacuums:

```bash
dogwrap -n "Vacuuming mytable" -k $DATADOG_API_KEY --submit_mode errors "psql -c 'vacuum verbose my_table' 2>&1 /var/log/postgres_vacuums.log"
```
[1]: https://github.com/DataDog/datadogpy
[2]: https://app.datadoghq.com/account/settings#api
