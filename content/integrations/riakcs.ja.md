---
git_integration_title: riakcs
integration_title: RiakCS
kind: integration
placeholder: true
title: Datadog-RiakCS Integration
---

<div class='alert alert-info'><strong>NOTICE:</strong>アクセスいただきありがとうございます。こちらのページは現在英語のみのご用意となっております。引き続き日本語化の範囲を広げてまいりますので、皆様のご理解のほどよろしくお願いいたします。</div>



## Overview


Capture Riak CS (Cloud Storage) metrics in Datadog to:

* Visualize key RiakCS metrics.
* Correlate RiakCS performance with the rest of your applications.

## Configuration

To configure the RiakCS integration, copy `riakcs.yaml.example` if the conf.d directory to `riakcs.yaml` and make the appropriate changes.
{{< highlight yaml>}}
init_config:

instances:
  - access_id: access-key
    access_secret: access-secret
    #is_secure: True # Uncomment and change to false if you are not using ssl
    #host: localhost # Hostname/IP of your riakcs node
    #port: 8080 # port used by your riakcs node
    #s3_root: s3.amazonaws.com #
{{< /highlight >}}

{{< insert-example-links >}}

## Metrics

{{< get-metrics-from-git >}}
