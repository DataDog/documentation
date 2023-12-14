---
title: Sensitive Data Scanner Transform
kind: documentation
disable_toc: false
private: true
is_beta: true
further_reading:
- link: "/observability_pipelines/setup/"
  tag: "Documentation"
  text: "Set up Observability Pipelines"
- link: "/observability_pipelines/working_with_data/"
  tag: "Documentation"
  text: "Working with data in Observability Pipelines"
---

{{< callout url="https://docs.google.com/forms/d/e/1FAIpQLSfnNnV823zAgOCowCYuXJE5cDtRqIipKsYcNpaOo1LKpGfppA/viewform" btn_hidden="false" header="Request Access!">}}
The <code>sensitive_data_scanner</code> transform is in private beta.
{{< /callout >}}

## Overview

Sensitive data, such as credit card numbers, bank routing numbers, and API keys, can be revealed unintentionally in your logs, which can expose your organization to financial and privacy risks. Use the Observability Pipelines `sensitive_data_scanner` transform to identify, tag, and optionally redact or hash sensitive information before routing data to different destinations. You can use out-of-the-box scanning rules to detect common patterns such as email addresses, credit card numbers, API keys, authorization tokens, and more. Or, create custom scanning rules using regex patterns to match sensitive information.

## Set up the `sensitive_data_scanner` transform

1. Navigate to [Observability Pipelines][1].
1. Click on your pipeline.
1. Click **Edit as Draft**.
1. Click **+ Add Component**.
1. Select the **Transforms** tab.
1. Click the **Sensitive Data Scanner** tile.
1. Enter a name for the component.
1. Select one or more inputs for the transform.
1. Click **Add a New Item** to add a scanning rule, which determines what sensitive information to match within the data.
1. Enter a name for the rule.
1. In the **Define action on match** section, select the action you want to take for the matched information. Redaction, partial redaction, and hashing are all irreversible actions.  
    - If you are redacting the information, specify the text to replace the matched data.  
    - If you are partially redacting the information, specify the number of characters you want to redact and which part of the matched data to redact.  
    - **Note:** If you select hashing, the UTF-8 bytes of the match is hashed with the 64-bit fingerprint of farmhash.
1. In the **Pattern** section:  
    - To create a custom scanning rule:  
        a. Select **Custom** in the **type** dropdown menu.  
        b. In the **Define regex** field, enter the regex pattern to check against the data. See [Using regex for custom rules](#using-regex-for-custom-rules) for more information.  
    - To use an out-of-the-box scanning rule:  
        a. Select **Library** in the **type** dropdown menu.  
        b. Select the scanning rule you want to use in the **Name** dropdown menu.
1. In the **Scan entire event or portion of it** section:  
    a. Select if you want to scan the **Entire Event** or **Specific Attributes** in the **Target** dropdown menu.
    - If you are scanning the entire event, you can optionally exclude specific attributes from getting scanned.
    - If you are scanning specific attributes, specify which attributes you want to scan.
1. Optionally, add one or more tags to associate with the matched events.
1. If you want to add another rule, click **Add a New Item** and follow steps 10 to 14.
1. Click **Save**.

**Note**: Any rules that you add or update only affect data coming into Observability Pipelines after the rule was defined.

### Using regex for custom rules

The `sensitive_data_scanner` transform supports Perl Compatible RegEx (PCRE2), but the following patterns are not supported:
  - Backreferences and capturing sub-expressions (lookarounds)
  - Arbitrary zero-width assertions
  - Subroutine references and recursive patterns
  - Conditional patterns
  - Backtracking control verbs
  - The \C "single-byte" directive (which breaks UTF-8 sequences)
  - The \R newline match
  - The \K start of match reset directive
  - Callouts and embedded code
  - Atomic grouping and possessive quantifiers

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/observability-pipelines