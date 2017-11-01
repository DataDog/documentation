---
title: Graphing FAQ
kind: documentation
autotocdepth: 2
customnav: graphingnav
---


### How do I do arithmetic with grouped metrics?


To graph the sum of `app.foo.bar{env:staging}` and `app.foo.baz{env:staging}`
grouped `by {host}`, write a graph query that looks like:

```
metric.foo.bar{env:staging} by {host} + metric.foo.baz{env:staging} by {host}
```

### What's the syntax to sum multiple datapoints into a single line?


You can switch commas separating the queries into plus signs, from:

```
"q": "sum:system.io.rkb_s{device:sda}*1024, sum:system.io.rkb_s{device:sdb}
*1024, sum:system.io.rkb_s{device: sdc}*1024"
```

to:

```
"q": "sum:system.io.rkb_s{device:sda}*1024 + sum:system.io.rkb_s{device:sdb}
*1024 + sum:system.io.rkb_s{device: sdc}*1024"
```

### How do I do graph smoothing?

You can apply smoothing averages to your series by droping to the JSON editor and
adding ‘ewma’, for example:
add any of ewma_x(…) where x can be 5, 10, 20 around your series, e.g.
`ewma_20(exception.invalid{*})`.
ewma stands for exponentially-moving average and the full list of functions
you can apply is [here][graphing-1].

### Can I stack CPU metrics on the same graph?


Check out our documentation on [stacked series][graphing-2].
The metric explorer just does one metric per graph, but you can see a stacked CPU graph
on the overview page by clicking any host [here][graphing-3].

### Is there a way to share graphs?


There are two ways to share a graph or screenboard

* In a time board, pick a graph on a dashboard and click on the pencil to edit it.
Under step 2, "Choose metrics and events," you’ll find the “share” tab that will
generate an IFRAME of just that graph.
* In a custom screenboard, click the settings cog in the upper right of the screen,
then click the "Generate public URL" option. This will create a URL which gives
live and read-only access to just the contents of that screenboard.

### How do I track cron jobs?

Often, you set cron jobs that trigger some meaningful script that you want to monitor and
correlate with other metrics. For example, you might have a cron'd script to vacuum a Postgres table every day:

    0 0 * * * psql -c 'vacuum verbose my_table' >> /var/log/postgres_vacuums.log 2>&1

Vacuum is particularly resource-intensive though, so you might want Datadog events for
each time they run so you can correlate metrics and other events with vacuums.
You can do this with the dogwrap command line tool provided by the [datadog python client library][graphing-4]:

    0 0 * * * /path/to/dogwrap -n "Vacuuming mytable" -k $API_KEY --submit_mode errors "psql -c 'vacuum verbose my_table' 2>&1 /var/log/postgres_vacuums.log"


This will call the command at the end of the script and
send Datadog events if it exits with a non-zero exit code (i.e. an error). `--submit_mode all`
will send events on every run.

(To get the python client lib you can install it with `pip install datadog`).

[graphing-1]: /graphing/miscellaneous/functions/
[graphing-2]: /graphing/
[graphing-3]: http://app.datadoghq.com/infrastructure/
[graphing-4]: https://github.com/DataDog/datadogpy/
