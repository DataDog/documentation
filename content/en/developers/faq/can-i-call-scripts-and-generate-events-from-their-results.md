---
title: Can I call scripts and generate events from their results?
kind: faq
---

## Dogwrap

This is accomplished via the dogwrap command line tool provided by the dogapi client library:

For an example of dogwrap in action, let's use cron. You might have a cron'd script to vacuum a Postgres table every day:

```
0 0 * * * psql -c 'vacuum verbose my_table' >> /var/log/postgres_vacuums.log 2>&1
```

Vacuum is particularly resource-intensive though, so you might want Datadog events for each time they run so you can correlate metrics and other events with vacuums.

```
dogwrap -n "Vacuuming mytable" -k $API_KEY --submit_mode errors "psql -c 'vacuum verbose my_table' 2>&1 /var/log/postgres_vacuums.log
```

This calls the command at the end of the script and send Datadog events if it exits with a non-zero exit code (i.e. an error). `--submit_mode all` sends events on every run.

(To get the python client lib you can install it with easy_install dogapi).

## Cronner

Another option to consider is cronner, a command line utility that wraps periodic (cron) jobs for statistics gathering and success monitoring written by PagerDuty:

https://gowalker.org/github.com/PagerDuty/cronner

