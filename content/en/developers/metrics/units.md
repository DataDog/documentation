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

## Overview

Metric units are displayed automatically on timeseries graphs, query value widgets, top lists, etc.

{{< img src="developers/metrics/units/redis_dash_metrics_units.png" alt="Redis dash metric units"  style="width:100%;">}}

On timeseries graphs, move your cursor over any graph to see the relevant units. The raw data is automatically converted to readable display units such as fractions of a second (ms) and millions of bytes per second (MiB/s).

Units are also displayed at the bottom of timeboard graphs, and metric descriptions are available by selecting **Metrics Info** from the gear dropdown:

{{< img src="developers/metrics/units/annotated_ops.png" alt="Annotated ops"  style="width:100%;">}}

To change a metric unit, navigate to the [metric summary][1] page and select a metric. Click **Edit** under **Metadata** and select a unit, such as `bit` or `byte` from the dropdown menu.

## Unit list

The following units may be associated with metrics submitted to Datadog:

| type        | unit(s)                                                                                                                                                                                                                                                                                                                    |
|-------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| BYTES       | bit / byte / kibibyte / mebibyte / gibibyte / tebibyte / pebibyte / exbibyte                                                                                                                                                                                                                                               |
| TIME        | nanosecond / microsecond / millisecond / second / minute / hour / day / week                                                                                                                                                                                                                                               |
| PERCENTAGE  | percent_nano / percent / apdex / fraction                                                                                                                                                                                                                                                                                  |
| NETWORK     | connection / request / packet / segment / response / message / payload / timeout / datagram / route / session                                                                                                                                                                                                              |
| SYSTEM      | process / thread / host / node / fault / service / instance / cpu                                                                                                                                                                                                                                                          |
| DISK        | file / inode / sector / block                                                                                                                                                                                                                                                                                              |
| GENERAL     | buffer / error / read / write / occurrence / event / time / unit / operation / item / task / worker / resource / garbage collection / email / sample / stage / monitor / location / check / attempt / device / update / method / job / container / execution / throttle / invocation / user / success / build / prediction / exception |
| DB          | table / index / lock / transaction / query / row / key / command / offset / record / object / cursor / assertion / scan / document / shard / flush / merge / refresh / fetch / column / commit / wait / ticket / question                                                                                                  |
| CACHE       | hit / miss / eviction / get / set                                                                                                                                                                                                                                                                                          |
| MONEY       | dollar / cent / microdollar / euro                                                                                                                                                                                                                                                                                         |
| MEMORY      | page / split                                                                                                                                                                                                                                                                                                               |
| FREQUENCY   | hertz / kilohertz / megahertz / gigahertz                                                                                                                                                                                                                                                                                  |
| LOGGING     | entry                                                                                                                                                                                                                                                                                                                      |
| TEMPERATURE | decidegree celsius / degree celsius / degree fahrenheit                                                                                                                                                                                                                                                                    |
| CPU         | nanocore / microcore / millicore / core / kilocore / megacore / gigacore / teracore / petacore / exacore                                                                                                                                                                                                                   |
| POWER       | nanowatt / microwatt / milliwatt / deciwatt / watt / kilowatt / megawatt / gigawatt / terrawatt                                                                                                                                                                                                                            |
| CURRENT     | milliampere / ampere                                                                                                                                                                                                                                                                                                       |
| POTENTIAL   | millivolt / volt                                                                                                                                                                                                                                                                                                           |
| APM         | span                                                                                                                                                                                                                                                                                                                       |

## Number formatting

### Unitless formatting

For unitless metrics, Datadog uses the [SI suffixes][2] `K`, `M`, `G`, and `T`. After `T`, numbers are converted to exponential notation, which is also used for very small numbers. By default, Datadog rounds to two decimal places. For exponential notation, the default is zero decimal places.

#### Examples

| Raw value              | Formatted |
|------------------------|-----------|
| 1                      | 1         |
| 2.7182818284           | 2.72      |
| 1337                   | 1.34K     |
| 31536000               | 31.54M    |
| 4294967296             | 4.29G     |
| 18446744073709552000   | 2e19      |
| 0.001                  | 1e-3      |
| 2.3283064365386963e-10 | 2e-10     |
| invalid                | N/A       |

### Unit handling

Units are automatically converted on your graphs into different units for readability.

#### Examples

| Unit       | Family    | Raw Value            | Formatted    |
|------------|-----------|----------------------|--------------|
| byte       | bytes     | 1                    | 1 B          |
| kibibyte   | bytes     | 1234235              | 1.18 GiB     |
| kibibyte   | bytes     | 45457878236741230000 | 40374.71 EiB |
| hertz      | frequency | 6345223              | 6.35 MHz     |
| cent       | money     | 1337                 | 13.37 $      |
| nanosecond | time      | 0                    | 0s           |
| second     | time      | 0.03212              | 32.12ms      |

### Time formatting

Time units between a minute and a year are split into multiple units to be more human-readable. The following conventions apply:

- Short times are formatted in decimal form.
- The smallest time unit is nanoseconds.
- Very long times are formatted as days in decimal form.


#### Examples

| Raw seconds | Formatted               |
|-------------|-------------------------|
| 0.00123     | 1.23ms                  |
| 0.00012345  | 123.45μs (microseconds) |
| 1.2345e-9   | 1.23ns                  |
| 95          | 1m 35s                  |
| 3671        | 1h 1m                   |
| 86390       | 1d                      |
| 96400       | 1d 3h                   |
| 52596400    | 608.75 days             |


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/metric/summary
[2]: https://en.wikipedia.org/wiki/International_System_of_Units
