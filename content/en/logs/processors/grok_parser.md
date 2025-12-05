---
title: Grok Parser
processor_name: grok-parser
further_reading:
- link: "logs/processing/pipelines"
  tag: "Documentation"
  text: "Log processing pipelines"
---

## Overview

Create custom grok rules to parse the full message or a specific attribute of your raw event. For more information, see the [parsing section][2]. As a best practice, it is recommended to use at most 10 parsing rules within a grok processor.

Define the Grok processor on the [**Pipelines** page][1]:

{{< img src="logs/log_configuration/processor/grok_parser.png" alt="Grok Parser" style="width:80%;" >}}

Click **Parse my logs** to kickstart a set of three parsing rules for the logs flowing through the underlying pipeline. Refine attribute naming from there, and add new rules for other type of logs if needed. This feature requires that the corresponding logs are being indexed, and actually flowing in—you can temporarily deactivate or sample down exclusion filters to make this work for you.

Select a sample by clicking on it to trigger its evaluation against the parsing rule and display the result at the bottom of the screen.

Up to five samples can be saved with the processor, and each sample can be up to 5000 characters in length. All samples show a status (`match` or `no match`), which highlights if one of the parsing rules of the grok parser matches the sample.

## Before and after processing

TBD

## API

{{< log-processor-api >}}

## Terraform

TBD

## Troubleshooting

TBD

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/logs/pipelines
[2]: /logs/log_configuration/parsing/
[3]: /api/v1/logs-pipelines/
