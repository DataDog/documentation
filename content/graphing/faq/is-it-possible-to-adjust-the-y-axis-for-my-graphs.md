---
title: Is it possible to adjust the y-axis for my graphs?
kind: faq
---

The Datadog y-axis controls are available via the UI and the JSON editor. They allow you to:

* Clip y-axis to specific ranges
* Remove outliers either by specifying a percentage or an absolute value to remove outliers
* Change y-axis scale from linear to log, sqrt or power scale

There are three configuration settings:

* Min/max (optional): Specifies minimum (and/or maximum) value to show on y-axis. It takes a number, or "auto" for default behvior. Default value is "auto".
* Scale (optional): Specifies the scale type. Possible values: "linear", "log", "sqrt", "pow##" (eg. pow2, pow0.5, 2 is used if only "pow" was provided"). Default scale is "linear".
* Include zero: Specifies whether or not to always include zero or fit the axis to the data range. Default is to always include zero.

In the graph editor, click "Show Y-Axis Controls" to expose these options. Below are JSON examples.

Note: as the mathematical log function doesn't accept negative values, our log scale only works if values are of the same sign (everything > 0 or everything < 0). Otherwise an empty graph is returned.

**Examples**:
```json
{
 "requests": [
 {
 "q": "avg:metric.name{*}",
 "type": "line",
 "conditional_formats": [],
 "aggregator": "avg"
 }
 ],
 "viz": "timeseries",
 "yaxis": {
 "min": "auto",
 "max": 100,
 "scale": "log"
 }
}
```

```json
{
 "requests": [
 {
 "q": "avg:metric.name{*}",
 "type": "line",
 "conditional_formats": [],
 "aggregator": "avg"
 }
 ],
 "viz": "timeseries",
 "yaxis": {
 "min": "auto",
 "max": 100,
 "scale": "sqrt"
 }
}
```

```json
{
 "requests": [
 {
 "q": "avg:metric.name{*}",
 "type": "line",
 "conditional_formats": [],
 "aggregator": "avg"
 }
 ],
 "viz": "timeseries",
 "yaxis": {
 "min": 9000,
 "max": 10000,
 "scale": "sqrt"
 }
}
```

```json
{
 "requests": [
 {
 "q": "avg:metric.name{*}",
 "type": "line",
 "conditional_formats": [],
 "aggregator": "avg"
 }
 ],
 "viz": "timeseries",
 "yaxis": {
 "scale": "pow0.1"
 }
}
```

```json
{
 "requests": [
 {
 "q": "avg:metric.name{*}",
 "type": "line",
 "conditional_formats": [],
 "aggregator": "avg"
 }
 ],
 "viz": "timeseries",
 "yaxis": {
 "scale": "pow3"
 }
}
```
