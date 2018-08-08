---
doclevel: basic
git_integration_title: go_expvar
integration_title: Go Expvar
kind: integration
placeholder: true
title: Datadog-Go Expvar Integration
---

<div class='alert alert-info'><strong>NOTICE:</strong>アクセスいただきありがとうございます。こちらのページは現在英語のみのご用意となっております。引き続き日本語化の範囲を広げてまいりますので、皆様のご理解のほどよろしくお願いいたします。</div>

{{< img src="integrations/goexpvar/go_graph.png" alt="Go Graph" >}}

## Overview

Use the Datadog Expvar Agent check to:

* Get information and monitor into your application memory usage
* Instrument your own metrics
* An example configration file for GO Expvar can be found [here](https://github.com/DataDog/integrations-core/blob/master/go_expvar/datadog_checks/go_expvar/data/conf.yaml.example)

## Configuration 
The Go Expvar integration requires the Datadog Agent.

1. Use Go's expvar package to expose your memory information
{{< highlight go >}}
package ...

import (
    ...
    "net/http"
    "expvar"
    ...
)

// If your application has no http server running for the DefaultServeMux,
// you'll have to have a http server running for expvar to use, for example
// by adding the following to your init function
func init() {
    go http.ListenAndServe(":8080", nil)
}

...

// You can also expose variables that are specific to your application
// See http://golang.org/pkg/expvar/ for more information

var (
    exp_points_processed = expvar.NewInt("points_processed")
)

func processPoints(p RawPoints) {
    points_processed, err := parsePoints(p)
    exp_points_processed.Add(points_processed)
    ...
}

...
{{< /highlight >}}

2. Configure the Agent to connect to your application's expvar and specify the metrics you want to collect, edit `conf.d/go_expvar.yaml`
{{< highlight yaml>}}
init_config:
instances:
   -   expvar_url: http://localhost:8080/debug/vars
       tags:
           - optionaltag1
           - optionaltag2
       metrics:
           - path: memstats/PauseTotalNs
             alias: go_expvar.gc.pause_time_in_ns
             type: rate                  # default is a gauge
           - path: memstats/Alloc        # will be reported as go_expvar.memstats.alloc
           - path: points_processed
             type: rate
{{< /highlight >}}

3. Restart the Agent

{{< insert-example-links conf="go_expvar" check="go_expvar" >}}

## Validation

Execute the info command and verify that the integration check has passed. The output of the command should contain a section similar to the following:
{{< highlight shell >}}
Checks
======

  [...]

  go_expvar
  ---------
      - instance #0 [OK]
      - Collected 8 metrics & 0 events
{{< /highlight >}}

## Metrics

{{< get-metrics-from-git >}}
