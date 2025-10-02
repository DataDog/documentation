---
title: Version History for Synthetic Monitoring
description: Datadog, the leading service for cloud-scale monitoring.
breadcrumbs: >-
  Docs > Synthetic Testing and Monitoring > Synthetic Monitoring Guides >
  Version History for Synthetic Monitoring
sourceUrl: https://docs.datadoghq.com/synthetics/guide/version_history/index.html
---

# Version History for Synthetic Monitoring

## Overview{% #overview %}

Version History automatically tracks changes made to your Synthetic Monitoring tests and saves previous versions so you can see exactly what changed and who made the update. You can run a previous version of a test, restore your test to any saved version, or clone a version to create a new Synthetic Monitoring test.

Version History allows you to:

- **Troubleshoot failing tests**: Determine whether a recent change introduced the failure.
- **Collaborate with teammates**: See who made changes and what was updated.
- **Roll back tests**: Restore a previous version after a deployment rollback or incorrect update.
- **Clone tests**: Create test based on a previous version, without changing the current test.
- **Support multi-environment testing**: Deploy different test versions to match the code running in each environment, ensuring tests remain compatible with environment-specific deployments.

## Prerequisites{% #prerequisites %}

All Synthetic Monitoring tests retain 30 days worth of version history by default. In order to see any previous versions, an edit must be made within the last 30 days.

With [Audit Trail](https://docs.datadoghq.com/account_management/audit_trail/) enabled, the version history is extended from 30 days to 90 days. After enabling Audit Trail, you are able to see any edits made between 30 to 90 days ago on all existing Synthetic tests.

## View versions{% #view-versions %}

From an individual Synthetic Monitoring test, click the settings menu on the top right of the page and select Version History. If there are no edits within the retention period, Version History is disabled.

{% image
   source="https://datadog-docs.imgix.net/images/synthetics/guide/version_history/synthetics_version_history_2.bacc74f4317057b1b90c954b15401446.png?auto=format"
   alt="Synthetic Monitoring Version history menu" /%}

The Version History side panel shows changes in chronological order. Each entry displays the fields that were modified, the values before and after, the user who made the change, and timestamp. Use the context menu to restore, clone, or run any version.

## Restore a version{% #restore-a-version %}

From the Version History side panel, after you choose the version to restore, click the kebab menu to the right of a user profile and select **Restore this test version**.

Restoring a version updates the test and creates a new version history entry documenting the restore action, displaying any steps that were added or removed to the test. Your existing change history remains intact, allowing you to restore any version within the retention period.

{% image
   source="https://datadog-docs.imgix.net/images/synthetics/guide/version_history/synthetics_restore_version_2.8ea65d3133e181587eae7c5b73cd305a.png?auto=format"
   alt="Synthetic Monitoring Version history menu, highlighting restore a version" /%}

## Clone a version{% #clone-a-version %}

To create a new test based on a previous version without modifying your current test, you can clone any version from your history. In the Version History side panel, select the desired version, click the kebab menu next to the user profile, and choose **Clone to a new test**.

## Run any version{% #run-any-version %}

From the Version History side panel, after you choose the version to restore, click the kebab menu to the right of a user profile and select **Run this test version**.

{% image
   source="https://datadog-docs.imgix.net/images/synthetics/guide/version_history/synthetics_run_version.8afe338092fb90ad5c8b0e80d9f8ed49.png?auto=format"
   alt="Synthetic Monitoring Version history menu, highlighting run this test version" /%}

Optionally, click **Copy version ID** to run the test version with the [Datadog CLI](https://github.com/DataDog/datadog-ci/tree/master/packages/plugin-synthetics#run-tests-command) or [Datadog API](https://docs.datadoghq.com/api/latest/synthetics/#trigger-tests-from-cicd-pipelines):

{% tab title="Datadog CLI" %}
Use the `<test_public_id>@<version_number>` pattern, for example:

```text
datadog-ci synthetics run-tests -p m8f-pfb-gkz@36
```

{% /tab %}

{% tab title="Datadog API" %}
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

{% /tab %}

**Notes**:

- When running tests through the CLI or API, you can combine the version parameter with other parameters. The additional parameters override the version's settings (consistent with non version pinned tests).

- Versions used in CI runs are automatically retained for 16 months after their last execution to prevent deletion of actively used pipeline versions. While these extended versions remain hidden from the UI, they still follow the standard 30 and 90 day visibility rules.

## Version History retention{% #version-history-retention %}

| Retention Period         |
| ------------------------ |
| Audit Trail **Disabled** | 30 days |
| Audit Trail **Enabled**  | 90 days |

## Further Reading{% #further-reading %}

- [Getting Started with Synthetic Monitoring](https://docs.datadoghq.com/getting_started/synthetics/)
- [Audit Trail Overview](https://docs.datadoghq.com/account_management/audit_trail/)
