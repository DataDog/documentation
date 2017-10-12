---
title: Edit Metric Metadata
type: apicontent
order: 5.5
---
## Edit Metric Metadata

The metrics metadata endpoint allows you to edit fields of a metric's metadata.

ARGUMENTS

type [optional, default=None]
metric type such as 'gauge' or 'rate'
description [optional, default=None]
string description of the metric
short_name [optional, default=None]
short name string of the metric
unit [optional, default=None]
primary unit of the metric such as 'byte' or 'operation'
per_unit [optional, default=None]
'per' unit of the metric such as 'second' in 'bytes per second'
statsd_interval [optional, default=None]
if applicable, statds flush interval in seconds for the metric