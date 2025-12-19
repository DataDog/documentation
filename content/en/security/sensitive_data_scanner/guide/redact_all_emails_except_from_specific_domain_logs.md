---
title: Redact All Emails Except Those from a Specific Domain in Logs
disable_toc: false
aliases:
  - /sensitive_data_scanner/guide/redact_all_emails_except_from_specific_domain_logs
further_reading:
- link: "/sensitive_data_scanner/"
  tag: "Documentation"
  text: "Set up Sensitive Data Scanner"
private: true
---

<div class="alert alert-warning">This guide has been deprecated. See <a href="/security/sensitive_data_scanner/setup/telemetry_data/?tab=logs#suppress-specific-matches-to-ignore-risk-accepted-data">Suppress specific matches to ignore risk-accepted data</a> to redact emails from a specific domain.</div>

## Overview

This guide walks you through how to redact all emails, except the ones from a specific email domain (for example, `@test.com`), in your logs.

## Set up a grok parser in your logs pipeline

If the email domain you do not want redacted is not an existing log attribute, set up a grok parser to identify all logs with the email domain and add it as an attribute.

1. Navigate to [Log Pipeline][1].
1. Select your pipeline.
1. Click **Add processor**.
1. Select **Grok Parser**.
1. Enter a name for the grok parser.
1. Define the parsing rules to identify all logs with the email address. For example, if these are the log messages that contain email addresses with the domain:
    ```
    message successfully sent to 123@test.com
    ```
    ```
    message successfully received from 256@test.com
    ```
    Then use the following parsing rules:
    ```
    MyParsingRule1 message successfully sent to %{notSpace:user_handle}@%{notSpace:domain}

    MyParsingRule2 message successfully received from %{notSpace:user_handle}@%{notSpace:domain}
    ```
    **Note:** You don't need to keep the username. For example, if you want to redact all emails with the domain `test.com`, then for an email like `hello@test.com`, discard the username `hello` and just keep the domain `test.com`.
1. Click **Save**.

Navigate to [Log Explorer][2] to confirm that new logs coming in with those emails are getting processed as expected.

{{< img src="sensitive_data_scanner/guides/domain_attribute.png" alt="The domain attribute in log side panel" style="width:80%;" >}}

## Add the email domain attribute as a facet

1. In [Log Explorer][2], select a log that contains an email with the specified domain.
1. Click on the cog next to the domain attribute you just created.
1. Select **Create facet for...**.
1. Optionally, add the facet to a group in the **Advanced Options** section.
1. Click **Add**.

## Configure the Sensitive Data Scanner scanning group to filter out logs with your domain attribute

Update your Sensitive Data Scanner's scanning group to filter out logs with the domain attribute that you created, so only logs that do not have that email domain are redacted.

1. Navigate to the Sensitive Data Scanner [Configuration][3] page.
1. Click the pencil icon to the left of the scanning group you want to update.
1. In the **Filter** field, add the domain attribute so that logs with that attribute are filtered out. For example, to filter out logs with the email domain `test.com`, add `-@domain:test.com` to the filter query.
{{< img src="sensitive_data_scanner/guides/scanning_group_filter_domain.png" alt="The scanning group's filter query with -@domain:test.com" style="width:100%;" >}}
1. Click **Update**.

Navigate to [Log Explorer][2] to confirm that the new logs coming in do not have emails with the specified domain redacted.

{{< img src="sensitive_data_scanner/guides/log_explorer_domain.png" alt="The Log Explorer showing logs with redacted email addresses and one log showing the test.com email unredacted" style="width:100%;" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/logs/pipelines
[2]: https://app.datadoghq.com/logs
[3]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner/configuration