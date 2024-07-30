---
title: Metrics Units
aliases:
- /developers/metrics/metrics_units
- /developers/metrics/units/
further_reading:
- link: "/dashboards/"
  tag: "Documentation"
  text: "Visualize your data to gain insight"
- link: "/dashboards/guide/unit-override/"
  tag: "Documentation"
  text: "Customize your visualizations with unit override"
---

## Overview

Metric units are displayed in places such as on timeseries graphs, query value widgets, and top lists.

{{< img src="metrics/units/redis_dash_metrics_units.png" alt="Redis dash metric units" style="width:100%;">}}

On timeseries graphs, you can hover your cursor over any graph to see the relevant units. Units must be specified manually, but if no unit is set, order-of-magnitude notation (for example: K, M, and G for thousands, millions, and billions, respectively) is used. If a unit is set, the raw data is automatically converted to readable display units using their relevant orders of magnitude.

For example, if you have a data point that is 3,000,000,000:

* If you haven't specified a unit for this data point, "3G" is displayed.
* If you specified this data point is in bytes, "3GB" is displayed.

Units are also displayed at the bottom of timeboard graphs, and metric descriptions are available by selecting **Metrics Info** from the gear dropdown:

{{< img src="metrics/units/annotated_ops.png" alt="Annotated ops" style="width:100%;">}}

To change a metric unit, navigate to the [metric summary][1] page and select a metric. Click **Edit** under **Metadata** and select a unit, such as `bit` or `byte` from the dropdown menu.

## Unit list

The following units may be associated with metrics submitted to Datadog:

| type        | unit(s)                                                                                                                                                                                                                                                                                                                    |
|-------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| BYTES       | bit / byte (b) / kibibyte(KiB) / mebibyte (MiB) / gibibyte (GB) / tebibyte (TiB) / pebibyte (PiB) / exbibyte (EiB)                                                                                                                                                                                                         |
| TIME        | nanosecond (ns) / microsecond (μs) / millisecond (ms) / second (s) / minute (min) / hour (hr) / day / week (wk)                                                                                                                                                                                                            |
| PERCENTAGE  | percent_nano (n%) / percent (%) / apdex / fraction                                                                                                                                                                                                                                                                         |
| NETWORK     | connection (conn) / request (req) / packet (pkt) / segment (seg) / response (rsp) / message (msg) / payload / timeout / datagram / route / session / hop                                                                                                                                                                   |
| SYSTEM      | process (proc) / thread / host / node / fault / service (svc) / instance / cpu                                                                                                                                                                                                                                             |
| DISK        | file / inode / sector / block (blk)                                                                                                                                                                                                                                                                                        |
| GENERAL     | buffer / error (err) / read (rd) / write (wr) / occurrence / event / time / unit / operation (op) / item / task / worker / resource (res) / garbage collection (gc) / email / sample (smpl) / stage / monitor / location / check / attempt / device (dev) / update (up) / method (mthd) / job / container / execution / throttle / invocation / user / success / build / prediction / exception |
| DB          | table / index (idx) / lock / transaction (tx) / query / row / key / command (cmd) / offset / record / object / cursor / assertion (assert) / scan / document / shard / flush / merge / refresh / fetch / column (col) / commit / wait / ticket / question                                                                  |
| CACHE       | hit / miss / eviction / get / set                                                                                                                                                                                                                                                                                          |
| MONEY       | dollar ($) / cent (¢) / microdollar (μ$) / euro (€) / pound (£) / pence (p) / yen (¥)                                                                                                                                                                                                                                      |
| MEMORY      | page (pg) / split                                                                                                                                                                                                                                                                                                          |
| FREQUENCY   | hertz (Hz) / kilohertz (kHz) / megahertz (MHz) / gigahertz (GHz)                                                                                                                                                                                                                                                           |
| LOGGING     | entry                                                                                                                                                                                                                                                                                                                      |
| TEMPERATURE | decidegree celsius (d°C) / degree celsius (°C) / degree fahrenheit (°F)                                                                                                                                                                                                                                                    |
| CPU         | nanocore (ncores) / microcore (μcores) / millicore (mcores) / core / kilocore (Kcores) / megacore (Mcores) / gigacore (Gcores) / teracore (Tcores) / petacore (Pcores) / exacore (Ecores)                                                                                                                                  |
| POWER       | nanowatt (nW) / microwatt (μW) / milliwatt (mW) / deciwatt (dW) / watt / kilowatt / megawatt / gigawatt / terrawatt                                                                                                                                                                                                        |
| CURRENT     | milliampere (mA) / ampere (A)                                                                                                                                                                                                                                                                                              |
| POTENTIAL   | millivolt (mV) / volt (V)                                                                                                                                                                                                                                                                                                  |
| APM         | span                                                                                                                                                                                                                                                                                                                       |
| SYNTHETICS  | run / step                                                                                                                                                                                                                                                                                                                 |

## Number formatting

### Unitless formatting

For unitless metrics, Datadog uses the [SI prefixes][2] `K`, `M`, `G`, and `T`. After `T`, numbers are converted to exponential notation, which is also used for tiny numbers. By default, Datadog rounds to two decimal places. For exponential notation, the default is zero decimal places.

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

Units are automatically formatted on your graphs for readability.

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
- Long times are formatted as days in decimal form.


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
[2]: https://en.wikipedia.org/wiki/Metric_prefix#List_of_SI_prefixes
