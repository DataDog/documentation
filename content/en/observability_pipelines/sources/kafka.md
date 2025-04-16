---
title: Kafka Source
disable_toc: false
---

Use Observability Pipelines' Kafka source to receive logs from your Kafka topics. Select and set up this source when you [set up a pipeline][1]. The Kafka source uses [librdkafka][2].

## Prerequisites

{{% observability_pipelines/prerequisites/kafka %}}

## Set up the source in the pipeline UI

Select and set up this source when you [set up a pipeline][1]. The information below is for the source settings in the pipeline UI.

{{% observability_pipelines/source_settings/kafka %}}

[1]: /observability_pipelines/set_up_pipelines/
[2]: https://github.com/confluentinc/librdkafka/tree/master