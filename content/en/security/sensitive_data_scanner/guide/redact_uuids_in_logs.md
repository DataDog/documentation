---
title: Redact Universal Unique IDs (UUIDs) in Logs
disable_toc: false
further_reading:
- link: "/security/sensitive_data_scanner/scanning_rules/custom_rules"
  tag: "Documentation"
  text: "Regex for custom scanning rules"
private: true
---

<div class="alert alert-warning">This guide has been deprecated and is no longer maintained</div>

## Overview

This guide goes over how to create a custom scanning rule using a regular expression (regex) pattern to match and redact a Universally Unique Identified (UUID). For example, your organization might have a UUID for internal identification, with additional information appended, such as the user's:
- User ID
- Department code
- Status code

If you want internal users to access these logs without exposing the UUID and user ID, you can create a custom scanning rule to redact the information.

## Set up a custom rule to match a UUID

For this guide, `01e2402104ca99-8641-43ba-b499-642610-0012` is the example internal identifier being used, where:
- `01e2402104ca99-8641-43ba-b499` is the UUID.
- `6462610` is a 6-digit value that represents the ID in byte format.
- `0012` is A 2-digit department code and 2-digit status code of a user:
    - `00` is used for an active user.
    - `12` for the department code.

In this example, you want to match the format of the example identifier (`01e2402104ca99-8641-43ba-b499-642610-0012`) and:
- Redact the UUID, user ID, and the ID in byte format.
- But not redact the department and status code of the user.

You can use the following basic regex to match the UUID and user ID that you want to redact:

```
[a-z0-9]{14}-\d{4}-[a-z0-9]{4}-[a-z0-9]{4}-\d{6}
```

1. Navigate to the [Sensitive Data Scanner settings][1] page.
1. Click **Add** and select **Add Scanning Rule**.
1. Click **Custom Rule**.
1. Select the scanning group to which you want to add this rule.
1. Enter a name for the rule.
1. Select the priority you want for the rule.
1. Enter a description for the rule.
1. In the **Match conditions** section, enter `[a-z0-9]{14}-\d{4}-[a-z0-9]{4}-[a-z0-9]{4}-\d{6}` in the regex field.
    {{< img src="sensitive_data_scanner/guides/regex_text_matched.png" alt="The regex test section showing that the UUID and user ID are matched" style="width:100%;" >}}
1. Use a keyword dictionary to refine detection accuracy and avoid false positives. For this example, you want to match within 10 characters of the word `user`:
    1. Enter `user` as a key word.
    1. Enter `10` for **Characters before match**.
1. In the **Action on Match** section and for this example:
1. Select **Entire Event** for how much of the event to scan. If you have the log parsed out using the Grok Parser, you can scan by specific attributes.
    1. Select **Redact** for the action on match.
    1. Enter `[removed]` for the replacement text.
    1. Enter `matched_on:user_id` for the **Add tags** field.
1. Click **Add rule**.

If this example log, which contains the different components of the UUID, is sent to Datadog:

```
2024-11-14 14:20:22 INFO [transaction-logger] 200 OK shoe:200.000, pen:42.95. iron, 221.55, tasty-sandwich:10.95, big-coffee:11.95, user.name:fred91, user.id:01e2402104ca99-8641-43ba-b499-642610-0012, user.email:fred.jones@scooby.com function:transaction-complete.js, payment.ccn:1111-1111-1111-1111, payment.ccexp:10/30}
```

The result is the `user.id` is redacted and replaced with `[removed]`:

{{< img src="sensitive_data_scanner/guides/redacted_log.png" alt="The log event with the UUID and user ID redacted and replaced with removed" style="width:100%;" >}}


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner/configuration