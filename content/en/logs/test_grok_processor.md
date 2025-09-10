---
title: Grok Parser Processor
processor_type: CreateLogsPipeline
processor_name: grok-parser
---

# Grok Parser Processor

This processor parses logs using Grok patterns.

## API

{{< log-processor-api >}}

## Usage Examples

You can also use the shortcode without specifying a processor name to see the full pipeline API:

{{< log-processor-api >}}

## Expected Output

The shortcode should now extract the specific grok-parser processor information from the API data and display:

1. **Model tab**: The processor schema table with parameters like `type`, `name`, `is_enabled`, `source`, `samples`, `grok.match_rules`, `grok.support_rules`
2. **Example tab**: The actual JSON example from the API data showing the grok-parser structure

This matches the format you showed in the processors.md file!