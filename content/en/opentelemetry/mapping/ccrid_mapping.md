---
title: Mapping Canonical Cloud Resources ID to OpenTelemetry resource attributes
aliases:
further_reading:
- link: "/opentelemetry/"
  tag: "Documentation"
  text: "OpenTelemetry Support in Datadog"
---

<div class="alert alert-info">
This feature is in Preview. If you have any feedback, contact <a href="/help/">Datadog support</a>.
</div>

## Overview
Canonical Cloud Resource IDs (CCRIDs) are cloud provider-assigned resource IDs that uniquely identify a cloud resource. CCRIDs, once added across different observability types, can be used to easily and consistently link different types of data for a given cloud resource. CCRIDs can be added in the same format across all cloud resource types. Widespread addition and adoption of CCRIDs will unlock a variety of use cases across customers and internal teams.

Enable to seamlessly jump between resources and their associated metrics, traces and logs for all resource types, eliminating context switching and giving users an end-to-end view of their resources within the same workflow.

The Datadog exporter supports sending CCRID information to Datadog. 
This is supported under any [deployment pattern][1] including gateway deploys.

<div class="alert alert-danger">Only metadata sent through the Datadog Exporter will populate the Infrastructure Host List. Metadata sent using the direct OTLP ingest endpoint does not support this feature.</div>

## Requirements
- Datadog Distribution of OpenTelemetry Collector v**TODO** or greater

## Opting in to the feature
To use this feature, set the `datadog.ccrid` resource attribute to value of CCRID in all OTLP payloads.

See below for the list of identifier formats per-cloud:
| Cloud   | Identifier Type    | Example                                                                                                                                      |
|---------|--------------------|----------------------------------------------------------------------------------------------------------------------------------------------|
| AWS     | ARN                | `arn:aws:sns:us-east-1:123456789012:example-sns-topic-name`                                                                                  |
| Azure   | Resource ID        | `/subscriptions/0b62a232-b8db-4380-9da6-640f7272ed6d/resourcegroups/lfotriggertest/providers/microsoft.web/sites/resources-task-19cb7afdcbbc`|
| GCP     | CAI Resource Name  | `//file.googleapis.com/projects/datadog-sandbox/locations/us-central1/backups/kevin-test-backup`                                             |
| OCI     | OCID               | `ocid1.bucket.oc1.eu-frankfurt-1.aaaaaaaa5b5d7phlob22x4xin2lopq33ugriqiglek2ecxecrjx2awceb7eq`                                               |


For example, to set AWS CCRID for all resources in metrics, traces, and logs, use the [transform processor][2] with the following configuration:
```yaml
processors:
  transform:
    metric_statements:
      - context: resource
        statements:
          - set(attributes["datadog.ccrid"], "arn:aws:sns:us-east-1:123456789012:example-sns-topic-name")
    trace_statements:
      - context: resource
        statements:
          - set(attributes["datadog.ccrid"], "arn:aws:sns:us-east-1:123456789012:example-sns-topic-name")
    log_statements:
      - context: resource
        statements:
          - set(attributes["datadog.ccrid"], "arn:aws:sns:us-east-1:123456789012:example-sns-topic-name")
```

## Further reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://opentelemetry.io/docs/collector/deployment/
[2]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/transformprocessor#transform-processor
