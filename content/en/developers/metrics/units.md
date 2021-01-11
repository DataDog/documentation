---
title: Metrics Units
kind: documentation
aliases:
- /developers/metrics/metrics_units
further_reading:
- link: "/dashboards/"
  tag: "Documentation"
  text: "Visualize your data to gain insight"
---

To eliminate ambiguity and help you make sense of your systems, the following units may be associated with metrics submitted to Datadog:

| type        | unit(s)                                                                                                                                                                                                                                                                                                                    |
|-------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| BYTES       | bit / byte / kibibyte / mebibyte / gibibyte / tebibyte / pebibyte / exbibyte                                                                                                                                                                                                                                               |
| TIME        | nanosecond / microsecond / millisecond / second / minute / hour / day / week                                                                                                                                                                                                                                               |
| PERCENTAGE  | percent_nano / percent / apdex / fraction                                                                                                                                                                                                                                                                                  |
| NETWORK     | connection / request / packet / segment / response / message / payload / timeout / datagram / route / session                                                                                                                                                                                                              |
| SYSTEM      | process / thread / host / node / fault / service / instance / cpu                                                                                                                                                                                                                                                          |
| DISK        | file / inode / sector / block                                                                                                                                                                                                                                                                                              |
| GENERAL     | buffer / error / read / write / occurrence / event / time / unit / operation / item / task / worker / resource / garbage collection / email / sample / stage / monitor / location / check / attempt / device / update / method / job / container / execution / throttle / invocation / user / success / build / prediction |
| DB          | table / index / lock / transaction / query / row / key / command / offset / record / object / cursor / assertion / scan / document / shard / flush / merge / refresh / fetch / column / commit / wait / ticket / question                                                                                                  |
| CACHE       | hit / miss / eviction / get / set                                                                                                                                                                                                                                                                                          |
| MONEY       | dollar / cent / microdollar / euro                                                                                                                                                                                                                                                                                               |
| MEMORY      | page / split                                                                                                                                                                                                                                                                                                               |
| FREQUENCY   | hertz / kilohertz / megahertz / gigahertz                                                                                                                                                                                                                                                                                  |
| LOGGING     | entry                                                                                                                                                                                                                                                                                                                      |
| TEMPERATURE | decidegree celsius / degree celsius / degree fahrenheit                                                                                                                                                                                                                                                                                         |
| CPU         | nanocore / microcore / millicore / core / kilocore / megacore / gigacore / teracore / petacore / exacore                                                                                                                                                                                                                   |
| POWER         | nanowatt / microwatt / milliwatt / deciwatt / watt / kilowatt / megawatt / gigawatt / terrawatt                                                                                                                                                                                                                   |
| CURRENT         | milliampere / ampere                                                                                                                                                                                    |
| POTENTIAL         | millivolt / volt                                                                                                                                                                                      |
| APM         | span                                                                                                                                                                                                                                                                                                                       |

Units are displayed automatically on timeseries graphs, query value widgets, and toplists, as shown in the following screenshot of a Redis dashboard:

{{< img src="developers/metrics/units/redis_dash_metrics_units.png" alt="Redis dash metric units"  style="width:70%;">}}

On timeseries graphs, move your cursor over any graph to see the relevant units. The raw data is automatically converted to readable display units (fractions of a second to ms, millions of bytes per second to MiB/s, etc.):

{{< img src="developers/metrics/units/postgres_commits.png" alt="postgres commits"  style="width:70%;">}}

Units are also displayed at the bottom of timeboard graphs, and metric descriptions are available by selecting **Metrics Info** from the gear dropdown:

{{< img src="developers/metrics/units/annotated_ops.png" alt="Annotated ops"  style="width:70%;">}}

To change a metric unit, navigate to the [metric summary][1] page and select a metric. Click **Edit** under **Metadata** and select a unit, such as `bit` or `byte` from the dropdown menu.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/metric/summary
