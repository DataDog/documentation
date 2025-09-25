---
title: Version History for Synthetic Monitoring

further_reading:
    - link: '/getting_started/synthetics/'
      tag: 'Documentation'
      text: 'Getting Started with Synthetic Monitoring'
    - link: "/account_management/audit_trail/"
      tag: "documentation"
      text: "Audit Trail Overview"
---

## Overview

Version History automatically tracks changes made to your Synthetic Monitoring tests and saves previous versions so you can see exactly what changed and who made the update. You can run a previous version of a test, restore your test to any saved version, or clone a version to create a new Synthetic Monitoring test.

Version History allows you to:

- **Troubleshoot failing tests**: Determine whether a recent change introduced the failure.
- **Collaborate with teammates**: See who made changes and what was updated.
- **Roll back tests**: Restore a previous version after a deployment rollback or incorrect update.
- **Clone tests**: Create test based on a previous version, without changing the current test.
- **Support multi-environment testing**: Deploy different test versions to match the code running in each environment, ensuring tests remain compatible with environment-specific deployments.

## Prerequisites

All Synthetic Monitoring tests retain 30 days worth of version history by default. In order to see any previous versions, an edit must be made within the last 30 days.

With [Audit Trail][1] enabled, the version history is extended from 30 days to 90 days. After enabling Audit Trail, you are able to see any edits made between 30 to 90 days ago on all existing Synthetic tests.

## View versions

From an individual Synthetic Monitoring test, click the settings menu on the top right of the page and select Version History. If there are no edits within the retention period, Version History is disabled.

{{< img src="/synthetics/guide/version_history/synthetics_version_history_2.png" alt="Synthetic Monitoring Version history menu" style="width:60%;" >}}

The Version History side panel shows changes in chronological order. Each entry displays the fields that were modified, the values before and after, the user who made the change, and timestamp. Use the context menu to restore, clone, or run any version.

## Restore a version

From the Version History side panel, after you choose the version to restore, click the kebab menu to the right of a user profile and select **Restore this test version**.

Restoring a version updates the test and creates a new version history entry documenting the restore action, displaying any steps that were added or removed to the test. Your existing change history remains intact, allowing you to restore any version within the retention period.

{{< img src="/synthetics/guide/version_history/synthetics_restore_version_2.png" alt="Synthetic Monitoring Version history menu, highlighting restore a version" style="width:60%;" >}}

## Clone a version

To create a new test based on a previous version without modifying your current test, you can clone any version from your history. In the Version History side panel, select the desired version, click the kebab menu next to the user profile, and choose **Clone to a new test**.

## Run any version

From the Version History side panel, after you choose the version to restore, click the kebab menu to the right of a user profile and select **Run this test version**.

{{< img src="/synthetics/guide/version_history/synthetics_run_version.png" alt="Synthetic Monitoring Version history menu, highlighting run this test version" style="width:60%;" >}}

Optionally, click **Copy version ID** to run the test version with the [Datadog CLI][2] or [Datadog API][3]:

{{< tabs >}}
{{% tab "Datadog CLI" %}}

Use the `<test_public_id>@<version_number>` pattern, for example:

```text
datadog-ci synthetics run-tests -p m8f-pfb-gkz@36
```

{{% /tab %}}

{{% tab "Datadog API" %}}

Use the optional field `version` to choose which version to run:

```json
POST https://api.datad0g.com/api/v1/synthetics/tests/trigger/ci
DD-API-KEY: {{api_key}}
DD-APPLICATION-KEY: {{app_key}}
Content-Type: application/json

{
  "tests": [
    {
        "public_id": "m8f-pfb-gkz",
        "version": 2
    },
    {
        "public_id": "xj3-i4r-zzr",
        "version": 16
    },
  ]
}
```

{{% /tab %}}
{{< /tabs >}}

   **Notes**:
   - When running tests through the CLI or API, you can combine the version parameter with other parameters. The additional parameters override the version's settings (consistent with non version pinned tests).

   - Versions used in CI runs are automatically retained for 16 months after their last execution to prevent deletion of actively used pipeline versions. While these extended versions remain hidden from the UI, they still follow the standard 30 and 90 day visibility rules.

## Version History retention
|                          | Retention Period    |
| -----------------------  | ------- |
| Audit Trail **Disabled** | 30 days |
| Audit Trail **Enabled**  | 90 days |

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/audit_trail/
[2]: https://github.com/DataDog/datadog-ci/tree/master/packages/plugin-synthetics#run-tests-command
[3]: /api/latest/synthetics/#trigger-tests-from-cicd-pipelines
