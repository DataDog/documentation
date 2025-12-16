---
title: Sumo Logic Hosted Collector
disable_toc: false
---

Use Observability Pipelines' Sumo Logic Hosted Collector source to receive logs sent to your Sumo Logic Hosted Collector. Select and set up this source when you [set up a pipeline][1].

## Prerequisites

{{% observability_pipelines/prerequisites/sumo_logic %}}

## Set up the source in the pipeline UI

Select and set up this source when you [set up a pipeline][1]. The information below is for the source settings in the pipeline UI.

- Enter the identifier for your Sumo Logic address.
    - **Note**: Only enter the identifier for the address. Do **not** enter the actual address.
    - If left blank, the default is used: `DD_OP_SOURCE_SUMO_LOGIC_ADDRESS`.

### Optional settings

In the **Decoding** dropdown menu, select whether your input format is raw **Bytes**, **JSON**, Graylog Extended Log Format (**Gelf**), or **Syslog**. If no decoding is selected, the decoding defaults to JSON.

## Set the environment variables

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/sumo_logic %}}

{{% observability_pipelines/log_source_configuration/sumo_logic %}}

[1]: /observability_pipelines/configuration/set_up_pipelines/