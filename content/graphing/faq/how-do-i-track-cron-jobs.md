---
title: How do I track cron jobs?
kind: faq
customnav: graphingnav
---

Often, you set cron jobs that trigger some meaningful script that you want to monitor and
correlate with other metrics. For example, you might have a cron'd script to vacuum a Postgres table every day:

    0 0 * * * psql -c 'vacuum verbose my_table' >> /var/log/postgres_vacuums.log 2>&1

Vacuum is particularly resource-intensive though, so you might want Datadog events for
each time they run so you can correlate metrics and other events with vacuums.
You can do this with the dogwrap command line tool provided by the [datadog python client library](https://github.com/DataDog/datadogpy/):

    0 0 * * * /path/to/dogwrap -n "Vacuuming mytable" -k $API_KEY --submit_mode errors "psql -c 'vacuum verbose my_table' 2>&1 /var/log/postgres_vacuums.log"


This will call the command at the end of the script and
send Datadog events if it exits with a non-zero exit code (i.e. an error). `--submit_mode all`
will send events on every run.

(To get the python client lib you can install it with `pip install datadog`).