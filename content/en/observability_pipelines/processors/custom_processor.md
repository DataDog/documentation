---
title: Custom Processor
disable_toc: false
further_reading:
- link: "/observability_pipelines/guide/remap_reserved_attributes/"
  tag: "documentation"
  text: "Remap reserved attributes"
products:
- name: Logs
  icon: logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
---

{{< product-availability >}}

## Overview

Use this processor with Vector Remap Language (VRL) to modify and enrich your logs. VRL is an expression-oriented, domain specific language designed for transforming logs. It features built-in functions for observability use cases. You can use custom functions in the following ways:

- Manipulate [arrays](#array), [strings](#string), and other data types.
- Encode and decode values using [Codec](#codec).
- [Encrypt](#encrypt) and [decrypt](#decrypt) values.
- [Coerce](#coerce) one datatype to another datatype (for example, from an integer to a string).
- [Convert syslog values](#convert) to read-able values.
- Enrich values by using [enrichment tables](#enrichment).
- [Manipulate IP values](#ip).
- [Parse](#parse) values with custom rules (for example, grok, regex, and so on) and out-of-the-box functions (for example, syslog, apache, VPC flow logs, and so on).
- Manipulate event [metadata](#event) and [paths](#path).

See [Custom functions][1] for the full list of available functions.

See [Remap Reserved Attributes][2] on how to use the Custom Processor to manually and dynamically remap attributes.

## Setup

To set up this processor:

- If you have not created any functions yet, click **Add custom processor** and follow the instructions in [Add a function](#add-a-function) to create a function.
- If you have already added custom functions, click **Manage custom processors**. Click on a function in the list to edit or delete it. You can use the search bar to find a function by its name. Click **Add Custom Processor** to [add a function](#add-a-function).

##### Add a function

1. Enter a name for your custom processor.
1. Add your script to modify your logs using [custom functions][1]. You can also click **Autofill with Example** and select one of the common use cases to get started. Click the copy icon for the example script and paste it into your script. See [Get Started with the Custom Processor][3] for more information.
1. Optionally, check **Drop events on error** if you want to drop events that encounter an error during processing.
1. Enter a sample log event.
1. Click **Run** to preview how the functions process the log. After the script has run, you can see the output for the log.
1. Click **Save**.

[1]: /observability_pipelines/processors/custom_processor#custom-functions
[2]: /observability_pipelines/guide/remap_reserved_attributes
[3]: /observability_pipelines/guide/get_started_with_the_custom_processor

## Custom functions

{{< whatsnext desc="The functions are organized into the following categories:" >}}
    {{< nextlink href="observability_pipelines/processors/custom_processor/#array" >}}Array{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/custom_processor/#codec" >}}Codec{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/custom_processor/#convert" >}}Convert{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/custom_processor/#cryptography" >}}Cryptography{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/custom_processor/#debug" >}}Debug{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/custom_processor/#enrichment" >}}Enrichment{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/custom_processor/#ip" >}}IP{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/custom_processor/#number" >}}Number{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/custom_processor/#object" >}}Object{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/custom_processor/#parse" >}}Parse{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/custom_processor/#path" >}}Path{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/custom_processor/#random" >}}Random{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/custom_processor/#string" >}}String{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/custom_processor/#system" >}}System{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/custom_processor/#timestamp" >}}Timestamp{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/custom_processor/#type" >}}Type{{< /nextlink >}}
{{< /whatsnext >}}

{{< vrl-functions >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
