---
title: Rates
kind: documentation
further_reading:
- link: "developers/metrics"
  tag: "Documentation"
  text: "Learn more about Metrics"
- link: "developers/libraries"
  tag: "Documentation"
  text: "Official and Community-contributed API and DogStatsD client libraries"
---

## Overview

Rates represent the derivative of a metric, it's the value variation of a metric on a defined time interval.

## Submission

### Agent check

{{% table responsive="true" %}}

|Method | Overview |
|:---|:---|
|self.rate(...)|Submit the sampled raw value of your counter. Don't normalize the values to a rate, or calculate the deltas before submitting - the Agent does both for you:<ul><li>Should only be called once during a check.</li><li>Throws away any value that is less than a previously submitted value. IE the counter should be monotonically increasing.</li><li>Stored as a GAUGE type in the Datadog web application. Each value in the stored timeseries is a time-normalized delta of the counter's value between samples.</li></ul>|
{{% /table %}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
