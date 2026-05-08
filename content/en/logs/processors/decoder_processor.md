---
title: Decoder Processor
processor_name: decoder-processor
further_reading:
- link: "logs/processing/pipelines"
  tag: "Documentation"
  text: "Log processing pipelines"
- link: "/logs/guide/manage_logs_and_metrics_with_terraform/"
  tag: "Guide"
  text: "Manage Logs and Metrics with Terraform"
---

## Overview

The Decoder processor translates binary-to-text encoded string fields (such as Base64 or Hex/Base16) into their original representation. This allows the data to be interpreted in its native context, whether as a UTF-8 string, ASCII command, or a numeric value (for example, an integer derived from a hex string). The Decoder processor is especially useful for analyzing encoded commands, logs from specific systems, or evasion techniques used by threat actors.

**Notes**:

- Truncated strings: The processor handles partially truncated Base64/Base16 strings gracefully by trimming or padding as needed.

- Hex format: Hex input can be decoded into either a string (UTF-8) or an integer.

- Failure handling: If decoding fails (because of invalid input), the processor skips the transformation, and the log remains unchanged

## Use cases

## API

{{< log-processor-api >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

