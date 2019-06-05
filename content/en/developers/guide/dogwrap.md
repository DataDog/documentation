---
title: Dogwrap
description: "Call scripts and generate events from their results with Dogwrap"
kind: guide
disable_toc: true
aliases:
- /developers/faq/can-i-call-scripts-and-generate-events-from-their-results
---

The Dogwrap command line tool allows you to call scripts and generate events from their results.

In order to use Dogwrap, install the [Datadog Python Library](https://github.com/DataDog/datadogpy):

To install from pip:

```
pip install datadog
```

To install from source:

1. Clone the [DataDog/datadogpy](https://github.com/DataDog/datadogpy) repository
2. Inside the root folder run: `python setup.py install`

For an example of `dogwrap` in action, consider `cron`. Let's say you have a cron script to vacuum a Postgres table every day:

```
0 0 * * * psql -c 'vacuum verbose my_table' >> /var/log/postgres_vacuums.log 2>&1
```

Vacuuming is particularly resource-intensive though, so you might want Datadog events for each time they run to correlate metrics and other events with vacuums:

```
dogwrap -n "Vacuuming mytable" -k $API_KEY --submit_mode errors "psql -c 'vacuum verbose my_table' 2>&1 /var/log/postgres_vacuums.log
```

This calls the command at the end of the script and, if it exits with a non-zero exit code (i.e. an error), sends Datadog events.

**Note**: `--submit_mode all` would send events on every run and not just errors as in the previous example.
