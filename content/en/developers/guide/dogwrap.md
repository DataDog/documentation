---
title: Dogwrap
description: "Call commands and generate events from their results with Dogwrap"
kind: guide
aliases:
- /developers/faq/can-i-call-scripts-and-generate-events-from-their-results
- /dashboards/faq/how-do-i-track-cron-jobs
---

The Dogwrap command line tool allows you to call commands and generate events from their results. In order to use Dogwrap, install the [Datadog Python Library][1]:

To install from pip:

```text
pip install datadog
```

To install from source:

1. Clone the [DataDog/datadogpy][1] repository.
2. Inside the root folder, run `python setup.py install`.

The minimum valid `dogwrap` command has the following layout:

{{< site-region region="us,gov,ap1" >}}
```bash
dogwrap -n <EVENT_TITLE> -k <DATADOG_API_KEY> "<COMMAND>"
```
{{< /site-region >}}

{{< site-region region="us3" >}}
```bash
dogwrap -n <EVENT_TITLE> -k <DATADOG_API_KEY> -s us3 "<COMMAND>"
```
{{< /site-region >}}

{{< site-region region="us5" >}}
```bash
dogwrap -n <EVENT_TITLE> -k <DATADOG_API_KEY> -s us5 "<COMMAND>"
```
{{< /site-region >}}

{{< site-region region="eu" >}}
```bash
dogwrap -n <EVENT_TITLE> -k <DATADOG_API_KEY> -s eu "<COMMAND>"
```
{{< /site-region >}}

**Note**: The `dogwrap` command sends data to the US Datadog site by default. If you need to send data to another site, you must include the `-s` option specifying a target site, such as `eu`, `us3`, `us5`, etc.

With the following placeholders:

* `<EVENT_TITLE>`: Title of the event to display in Datadog.
* `<DATADOG_API_KEY>`: [The Datadog API key associated with your organization][2].
* `<COMMAND>`: Command to wrap and generate events from. Enclose your called command in quotes to prevent Python from thinking the command line arguments belong to the Python command instead of the wrapped one.

**Note**: Use the Dogwrap help command `dogwrap --help` to discover all available options.

For an example of `dogwrap` in action, consider `cron`. If you have a cron script to vacuum a Postgres table every day:

```bash
0 0 * * * psql -c 'vacuum verbose my_table' >> /var/log/postgres_vacuums.log 2>&1
```

Vacuuming is particularly resource-intensive, so you might want Datadog events for each time they run to correlate metrics and other events with vacuums:

```bash
dogwrap -n "Vacuuming mytable" -k $DATADOG_API_KEY --submit_mode errors "psql -c 'vacuum verbose my_table' 2>&1 /var/log/postgres_vacuums.log"
```

This calls the command at the end of the script and, if it exits with a non-zero exit code (like an error), sends Datadog events. Using `--submit_mode all` sends events on every run of this command.

[1]: https://github.com/DataDog/datadogpy
[2]: https://app.datadoghq.com/organization-settings/api-keys
