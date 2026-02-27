---
title: Sensitive Data Scanner Processor
disable_toc: false
further_reading:
- link: "/logs/guide/regex_log_parsing/"
  tag: "guide"
  text: "Writing Effective Grok Parsing Rules with Regular Expressions"
products:
- name: Logs
  icon: logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
---

{{< product-availability >}}

## Overview

The Sensitive Data Scanner processor scans logs to detect and redact or hash sensitive information such as PII, PCI, and custom sensitive data. You can pick from Datadog's library of predefined rules, or input custom Regex rules to scan for sensitive data.

## Set up the processor in the UI

To set up the processor:

1. Define a filter query. Only logs that match the specified filter query are scanned and processed. All logs are sent to the next step in the pipeline, regardless of whether they match the filter query. See [Search Syntax][1] for more information.
1. Click **Add Scanning Rule**.
1. Select one of the following:

{{% collapse-content title="Add rules from the library" level="h5" %}}

1. In the dropdown menu, select the library rule you want to use.
1. Recommended keywords are automatically added based on the library rule selected. After the scanning rule has been added, you can [add additional keywords or remove recommended keywords](#add-additional-keywords).
1. In the **Define rule target and action** section, select if you want to scan the **Entire Event**, **Specific Attributes**, or **Exclude Attributes** in the dropdown menu.
    - If you are scanning the entire event, you can optionally exclude specific attributes from getting scanned. Use [path notation](#path-notation-example-lib) (`outer_key.inner_key`) to access nested keys. For specified attributes with nested data, all nested data is excluded.
    - If you are scanning specific attributes, specify which attributes you want to scan. Use [path notation](#path-notation-example-lib) (`outer_key.inner_key`) to access nested keys. For specified attributes with nested data, all nested data is scanned.
1. For **Define actions on match**, select the action you want to take for the matched information. **Note**: Redaction, partial redaction, and hashing are all irreversible actions.
    - **Redact**: Replaces all matching values with the text you specify in the **Replacement text** field.
    - **Partially Redact**: Replaces a specified portion of all matched data. In the **Redact** section, specify the number of characters you want to redact and which part of the matched data to redact.
    - **Hash**: Replaces all matched data with a unique identifier. The UTF-8 bytes of the match are hashed with the 64-bit fingerprint of FarmHash.
1. Optionally, click **Add Field** to add tags you want to associate with the matched events.
1. Add a name for the scanning rule.
1. Optionally, add a description for the rule.
1. Click **Save**.

### Path notation example {#path-notation-example-lib}

 For the following message structure:

```json
{
    "outer_key": {
        "inner_key": "inner_value",
        "a": {
            "double_inner_key": "double_inner_value",
            "b": "b value"
        },
        "c": "c value"
    },
    "d": "d value"
}
```

- Use `outer_key.inner_key` to refer to the key with the value `inner_value`.
- Use `outer_key.inner_key.double_inner_key` to refer to the key with the value `double_inner_value`.

### Add additional keywords

After adding scanning rules from the library, you can edit each rule separately and add additional keywords to the keyword dictionary.

1. Navigate to your [pipeline][2].
1. In the Sensitive Data Scanner processor with the rule you want to edit, click **Manage Scanning Rules**.
1. Toggle **Use recommended keywords** if you want the rule to use them. Otherwise, add your own keywords to the **Create keyword dictionary** field. You can also require that these keywords be within a specified number of characters of a match. By default, keywords must be within 30 characters before a matched value.
1. Click **Update**.

{{% /collapse-content %}}
{{% collapse-content title="Add a custom rule" level="h5" %}}

1. In the **Define match conditions** section, specify the regex pattern to use for matching against events in the **Define the regex** field. Enter sample data in the **Add sample data** field to verify that your regex pattern is valid. See [Writing Effective Grok Parsing Rules with Regular Expressions][3] for information.
    Sensitive Data Scanner supports Perl Compatible Regular Expressions (PCRE), but the following patterns are not supported:
    - Backreferences and capturing sub-expressions (lookarounds)
    - Arbitrary zero-width assertions
    - Subroutine references and recursive patterns
    - Conditional patterns
    - Backtracking control verbs
    - The `\C` "single-byte" directive (which breaks UTF-8 sequences)
    - The `\R` newline match
    - The `\K` start of match reset directive
    - Callouts and embedded code
    - Atomic grouping and possessive quantifiers
1. For **Create keyword dictionary**, add keywords to refine detection accuracy when matching regex conditions. For example, if you are scanning for a sixteen-digit Visa credit card number, you can add keywords like `visa`, `credit`, and `card`. You can also require that these keywords be within a specified number of characters of a match. By default, keywords must be within 30 characters before a matched value.
1. In the **Define rule target and action** section, select if you want to scan the **Entire Event**, **Specific Attributes**, or **Exclude Attributes** in the dropdown menu.
    - If you are scanning the entire event, you can optionally exclude specific attributes from getting scanned. Use [path notation](#path-notation-example-custom) (`outer_key.inner_key`) to access nested keys. For specified attributes with nested data, all nested data is excluded.
    - If you are scanning specific attributes, specify which attributes you want to scan. Use [path notation](#path-notation-example-custom) (`outer_key.inner_key`) to access nested keys. For specified attributes with nested data, all nested data is scanned.
1. For **Define actions on match**, select the action you want to take for the matched information. **Note**: Redaction, partial redaction, and hashing are all irreversible actions.
    - **Redact**: Replaces all matching values with the text you specify in the **Replacement text** field.
    - **Partially Redact**: Replaces a specified portion of all matched data. In the **Redact** section, specify the number of characters you want to redact and which part of the matched data to redact.
    - **Hash**: Replaces all matched data with a unique identifier. The UTF-8 bytes of the match is hashed with the 64-bit fingerprint of FarmHash.
1. Optionally, click **Add Field** to add tags you want to associate with the matched events.
1. Add a name for the scanning rule.
1. Optionally, add a description for the rule.
1. Click **Add Rule**.

### Path notation example {#path-notation-example-custom}

 For the following message structure:

```json
{
    "outer_key": {
        "inner_key": "inner_value",
        "a": {
            "double_inner_key": "double_inner_value",
            "b": "b value"
        },
        "c": "c value"
    },
    "d": "d value"
}
```

- Use `outer_key.inner_key` to refer to the key with the value `inner_value`.
- Use `outer_key.inner_key.double_inner_key` to refer to the key with the value `double_inner_value`.

{{% /collapse-content %}}

## Set up processor using Terraform

You can use the [Datadog Observability Pipeline Terraform resource][4] to set up a pipeline with the Sensitive Data Scanner processor. To add a rule to the Sensitive Data Scanner processor using Terraform:

1. Use the [Datadog Sensitive Data Scanner Standard Pattern][5] data resource to retrieve the rule ID of the Sensitive Data Scanner [library rule][6].

   ```terraform
   data "datadog_sensitive_data_scanner_standard_pattern" "<RULE_IDENTIFIER>" {
     filter = "<RULE_NAME>"
   }
   ```

   Replace the placeholders:

   - `<RULE_IDENTIFIER>` with a name that is used later when you set up the Sensitive Data Scanner processor in the Observability Pipeline resource.
   - `<RULE_NAME>` with the exact name of the rule. See [Library Rules][6] for the full list of rules, including the rule name to use for the data source `filter`.

   For example, if you want to use the [AWS Access Key ID Scanner][7] and [US Social Security Number Scanner][8] rules, configure the data source as follows:

   ```terraform
   data "datadog_sensitive_data_scanner_standard_pattern" "aws_access_key" {
     filter = "AWS Access Key ID Scanner"
   }
   data "datadog_sensitive_data_scanner_standard_pattern" "us_ssn" {
     filter = "US Social Security Number Scanner"
   }
   ```

1. Add a [rule][9] block in your Observability Pipeline resource for the library rule.

   ```terraform
   ...
     sensitive_data_scanner {
       rule {
         name = "<YOUR_RULE_NAME>"
         tags = []
         on_match {
           redact {
             replace = "***"
           }
         }
         pattern {
           library {
             id                       = data.datadog_sensitive_data_scanner_standard_pattern.<RULE_IDENTIFIER>.id
             use_recommended_keywords = true
           }
         }
         scope {
           all = true
         }
       }
     }
   }
   ```

   Replace the placeholders:

   - `<YOUR_RULE_NAME>` with a name for the rule. This name is shown in the Pipelines UI.
   - `<RULE_IDENTIFIER>` with the rule identifier you used in the data source in step 1.

   For example, if you want to use the [AWS Access Key ID Scanner][7] data source from step 1:

   ```terraform
   ...
     sensitive_data_scanner {
       rule {
         name = "Redact AWS Access Key IDs"
         tags = []
         on_match {
           redact {
             replace = "***"
           }
         }
         pattern {
           library {
             id                       = data.datadog_sensitive_data_scanner_standard_pattern.aws_access_key.id
             use_recommended_keywords = true
           }
         }
         scope {
           all = true
         }
       }
     }
   }
   ```

   See [Sensitive Data Scanner configuration example](#sensitive-data-scanner-configuration-example) for a full configuration example.

1. Repeat steps 1 and 2 for all library rules you want to add.

### Sensitive Data Scanner configuration example

In this example, the Sensitive Data Scanner processor scans for AWS Access Key IDs and US Social Security Numbers, and redacts the data with the string `***`. The [Observability Pipelines resource configuration example](#configuration-example):

1. Uses the [Datadog Sensitive Data Scanner Standard Pattern][5] data source to retrieve the AWS Access Key ID Scanner's rule ID and US Social Security Number Scanner's rule ID.
1. Uses the Sensitive Data Scanner rules defined in the data source in the [Datadog Observability Pipeline][4] resource's Sensitive Data Scanner processor.

#### Configuration example {#configuration-example}

```terraform
data "datadog_sensitive_data_scanner_standard_pattern" "aws_access_key" {
  filter = "AWS Access Key ID Scanner"
}
data "datadog_sensitive_data_scanner_standard_pattern" "us_ssn" {
  filter = "US Social Security Number Scanner"
}

resource "datadog_observability_pipeline" "sensitive_data_pipeline" {
  name = "Sensitive Data Pipeline"

  config {
    source {
      id = "source-0"
      datadog_agent {}
    }

    processor_group {
      display_name = "Processors"
      enabled      = true
      id           = "group-0"
      include      = "*"
      inputs       = ["source-0"]

      processor {
        display_name = "Sensitive Data Scanner"
        enabled      = true
        id           = "processor-sds-0"
        include      = "*"

        sensitive_data_scanner {
          rule {
            name = "Redact AWS Access Key IDs"
            tags = []
            on_match {
              redact {
                replace = "***"
              }
            }
            pattern {
              library {
                id                       = data.datadog_sensitive_data_scanner_standard_pattern.aws_access_key.id
                use_recommended_keywords = true
              }
            }
            scope {
              all = true
            }
          }
          rule {
            name = "Redact US SSNs"
            tags = []
            on_match {
              redact {
                replace = "***"
              }
            }
            pattern {
              library {
                id                       = data.datadog_sensitive_data_scanner_standard_pattern.us_ssn.id
                use_recommended_keywords = true
              }
            }
            scope {
              all = true
            }
          }
        }
      }
    }

    destination {
      id     = "destination-0"
      inputs = ["group-0"]
      datadog_logs {}
    }
  }
}
```

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /observability_pipelines/search_syntax/logs/
[2]: https://app.datadoghq.com/observability-pipelines
[3]: /logs/guide/regex_log_parsing/
[4]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/observability_pipeline
[5]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/data-sources/sensitive_data_scanner_standard_pattern
[6]: /security/sensitive_data_scanner/scanning_rules/library_rules/
[7]: /security/sensitive_data_scanner/scanning_rules/library_rules/?search=AWS+Access+Key+ID+Scanner
[8]: /security/sensitive_data_scanner/scanning_rules/library_rules/?search=US+Social+Security+Number+Scanner
[9]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/observability_pipeline#nested-schema-for-configprocessor_groupprocessorsensitive_data_scanner