---
title: Amazon Data Firehose Source
disable_toc: false
---

Use Observability Pipelines' Amazon Data Firehose source to receive logs from Amazon Data Firehose. Select and set up this source when you [set up a pipeline][1].

## Prerequisites

{{% observability_pipelines/prerequisites/amazon_data_firehose %}}

## Set up the source in the pipeline UI

Select and set up this source when you [set up a pipeline][1]. The information below is for the source settings in the pipeline UI.

{{% observability_pipelines/source_settings/amazon_data_firehose %}}

## Set the environment variables

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/amazon_data_firehose %}}

## Send logs to the Observability Pipelines Worker over Amazon Data Firehose

{{% observability_pipelines/log_source_configuration/amazon_data_firehose %}}

## AWS Authentication

{{% observability_pipelines/aws_authentication/instructions %}}

### Permissions

{{% observability_pipelines/aws_authentication/amazon_s3_source/permissions %}}

[1]: /observability_pipelines/configuration/set_up_pipelines/