---
title: Decoder Processor
description: "Translate binary-to-text encoded string fields into their original representation"
processor_type: decoder-processor
further_reading:
- link: "/logs/log_configuration/pipelines"
  tag: "Documentation"
  text: "Discover Datadog Pipelines"
---

## Overview

The Decoder processor translates binary-to-text encoded string fields (such as Base64 or Hex/Base16) into their original representation. This allows the data to be interpreted in its native context, whether as a UTF-8 string, ASCII command, or a numeric value (for example, an integer derived from a hex string). The Decoder processor is especially useful for analyzing encoded commands, logs from specific systems, or evasion techniques used by threat actors.

**Notes**:

- Truncated strings: The processor handles partially truncated Base64/Base16 strings gracefully by trimming or padding as needed.

- Hex format: Hex input can be decoded into either a string (UTF-8) or an integer.

- Failure handling: If decoding fails (because of invalid input), the processor skips the transformation, and the log remains unchanged

## Setup

1. Set the source attribute: Provide the attribute path that contains the encoded string, such as `encoded.base64`.
2. Select the source encoding: Choose the binary-to-text encoding of the source: `base64` or `base16/hex`.
2. For `Base16/Hex`: Choose the output format: `string (UTF-8)` or `integer`.
3. Set the target attribute: Enter the attribute path to store the decoded result.

{{< img src="logs/log_configuration/processor/decoder-processor.png" alt="Decoder processor - Append" style="width:80%;" >}}

<!-- ## Use cases

## Before and after state of logs

## API -->

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

