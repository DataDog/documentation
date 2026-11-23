---
title: Scheduled Downtime
description: Pause Synthetic test execution during planned maintenance windows to keep availability metrics accurate and reduce unnecessary test runs.
further_reading:
- link: "/synthetics/platform/settings/"
  tag: "Documentation"
  text: "Synthetic Monitoring Settings"
- link: "/synthetics/browser_tests/"
  tag: "Documentation"
  text: "Configure a Browser Test"
- link: "/synthetics/api_tests/"
  tag: "Documentation"
  text: "Configure an API Test"
- link: "/synthetics/test_suites/"
  tag: "Documentation"
  text: "Test Suites"
- link: "/api/latest/synthetics/#list-synthetics-downtimes"
  tag: "API"
  text: "Synthetics Downtimes API"
---

## Overview

Synthetic Monitoring Scheduled Downtime lets you pause Synthetic test execution during planned maintenance windows. Unlike the [Downtime feature for monitors][1], which mutes alerts but allows tests to continue running, Synthetic Monitoring Scheduled Downtime stops test execution entirely. This keeps your availability and performance metrics accurate and prevents unnecessary test runs and associated costs during expected outages.

**Note**: All downtime references on this page apply to Synthetic Monitoring only. For monitor-level downtime behavior, see [Downtimes][1].

{{< img src="synthetics/settings/synthetics_downtimes_updated.png" alt="The Downtimes page in Synthetic Monitoring Settings showing a list of configured downtimes on the left with a monthly calendar view of their scheduled time slots on the right" style="width:100%;" >}}

With Synthetic Monitoring Scheduled Downtime, you can:

- Pause tests during deployments, infrastructure updates, or third-party outages.
- Prevent availability and performance metrics from being skewed by planned maintenance.
- Reduce costs by stopping test executions during known downtime windows.
- Apply downtime to individual tests, multiple tests, or test suites in bulk.
- Resume tests automatically when the downtime window ends.

## Create a downtime

1. Navigate to [{{< ui >}}Digital Experience{{< /ui >}} > {{< ui >}}Synthetic Monitoring & Testing{{< /ui >}} > {{< ui >}}Settings{{< /ui >}}][2] and click {{< ui >}}Downtimes{{< /ui >}} in the left sidebar.
2. Click {{< ui >}}\+ New Downtime{{< /ui >}}.
3. Enter a name for the downtime.
4. Define one or more time slots to support recurring or multi-window schedules.
5. Select the Synthetic tests the downtime applies to.
6. Optionally, assign tags, environment, or team metadata.
7. Click {{< ui >}}Save{{< /ui >}}.

Downtimes can be saved in an enabled or disabled state and modified at any time.

## Manage downtimes

The {{< ui >}}Downtimes{{< /ui >}} page provides a list and calendar view of all configured downtimes. Use the calendar to see how scheduled time slots are distributed across the month.

{{< img src="synthetics/settings/synthetics_downtimes_updated.png" alt="The Downtimes page in Synthetic Monitoring Settings showing a list of configured downtimes on the left with a monthly calendar view of their scheduled time slots on the right" style="width:90%;" >}}

Use the filters at the top of the page to find specific downtimes:

- {{< ui >}}Tag{{< /ui >}}: Filter by associated tags.
- {{< ui >}}Environment{{< /ui >}}: Filter by environment.
- {{< ui >}}Team{{< /ui >}}: Filter by team.
- {{< ui >}}Status{{< /ui >}}: Filter by enabled or disabled status.

To modify or disable a downtime without deleting it, click the three-dot menu next to a downtime row.

## Apply downtime to tests

### During test creation

When creating a new Synthetic test, you can attach an existing downtime from the test configuration form:

1. In the test creation form, navigate to the {{< ui >}}Downtimes{{< /ui >}} section.
2. Click {{< ui >}}Select downtimes{{< /ui >}} and choose an existing downtime.

The test automatically pauses during the downtime's scheduled time slots.

**Note**: You cannot create a downtime from the test creation form. To create one, navigate to [{{< ui >}}Settings{{< /ui >}} > {{< ui >}}Downtimes{{< /ui >}}][2].

{{< img src="synthetics/settings/add_downtime_to_test_2.png" alt="The Downtimes section in the test creation form showing a Select downtimes dropdown expanded with available downtimes listed and a Manage downtimes link" style="width:90%;" >}}

### From the Tests or Test Suites page

To apply an existing downtime to multiple tests or test suites at once:

1. Navigate to [{{< ui >}}Digital Experience{{< /ui >}} > {{< ui >}}Synthetic Monitoring & Testing{{< /ui >}}][3].
2. Select one or more tests or test suites using the checkboxes.
3. Click {{< ui >}}Add to Downtime{{< /ui >}} in the bulk actions bar.
4. Select an existing downtime from the list.

{{< img src="synthetics/settings/bulk_add_downtimes.png" alt="The Synthetic Monitoring Tests page with two tests selected and the Add to Downtime button highlighted in the bulk actions bar" style="width:90%;" >}}

## Permissions

<!-- TO CONFIRM: Which default roles get these permissions? Draft assumes Admin and Standard get read and write, and Read Only gets read. -->

Downtimes have their own permissions, separate from Synthetic tests and default settings:

- `synthetics_downtime_read`: View downtimes.
- `synthetics_downtime_write`: Create, edit, and delete downtimes.

By default, users with the [Datadog Admin and Datadog Standard roles][5] have both permissions. If you use [custom roles][6], add `synthetics_downtime_read` and `synthetics_downtime_write` to the roles that need access to downtimes.

The `synthetics_downtime_read` permission also gives access to the Synthetic Monitoring {{< ui >}}Settings{{< /ui >}} page, where you manage downtimes.

<!-- TO CONFIRM: Cutoff date, and whether the docs should state it. The ticket says enforcement happens after January 31, 2027. -->

<div class="alert alert-warning">Until [CUTOFF DATE], Datadog also accepts the <code>synthetics_read</code> and <code>synthetics_write</code> permissions for downtimes. After that date, only <code>synthetics_downtime_read</code> and <code>synthetics_downtime_write</code> grant access. Update your custom roles before the cutoff date.</div>

### Restrict access

Use [granular access control][7] to limit who can view or edit a downtime based on roles, teams, or individual users. Downtimes support two access levels:

- {{< ui >}}Viewer{{< /ui >}}: View the downtime and add it to tests you can edit.
- {{< ui >}}Editor{{< /ui >}}: Edit or delete the downtime, and add tests to it or remove tests from it.

Downtimes you don't have {{< ui >}}Viewer{{< /ui >}} access to are hidden from you.

<!-- TO CONFIRM: Where the permissions modal opens from (downtime form, three-dot menu, or both) and the exact button labels. Add a screenshot of the downtime permissions modal. -->
<!-- TO CONFIRM: Do new downtimes default to the author's team? -->

1. Open the downtime from the {{< ui >}}Downtimes{{< /ui >}} page.
2. Click {{< ui >}}Edit Access{{< /ui >}}.
3. Click {{< ui >}}Restrict Access{{< /ui >}}.
4. Select teams, roles, or users.
5. Click {{< ui >}}Add{{< /ui >}}.
6. Select the access level for each team, role, or user.
7. Click {{< ui >}}Done{{< /ui >}}.

### Access required for each action

Downtimes and tests each have their own access settings. The following table lists the access each action requires, in addition to the RBAC permissions above.

<!-- TO CONFIRM: Editing or deleting a downtime. Option 1 (test focus) also requires Editor access to every test already associated with the downtime. Option 4 (independent after association) requires only Editor access to the downtime. Draft uses Option 4. -->
<!-- TO CONFIRM: Does the bulk "Add to Downtime" action on the Tests page follow the same rules as the test form? -->

| Action | Downtime access | Test access |
|--------|-----------------|-------------|
| View a downtime | Viewer | None |
| Create a downtime with tests | None (requires `synthetics_downtime_write`) | Editor on each selected test |
| Edit or delete a downtime | Editor | None |
| Add a test from the downtime form | Editor | Editor on the test you add |
| Remove a test from the downtime form | Editor | None |
| Add a downtime from the test form | Viewer | Editor |
| Remove a downtime from the test form | None | Editor |

Adding a downtime to your test doesn't require access to other tests already associated with that downtime.

**Note**: A user with {{< ui >}}Editor{{< /ui >}} access to a downtime can change when its associated tests run, even without access to those tests. Restrict access to downtimes that apply to critical tests.

## Best practices

- Use consistent tagging to simplify applying downtime across groups of tests.
- When viewing the calendar with multiple downtimes configured, filter by a specific downtime to avoid a crowded view.
- For complex recurrence patterns, split requirements into multiple time slots within the same downtime.

## Manage downtimes programmatically

You can create, update, list, and delete Synthetic Monitoring downtimes through the [Synthetics API][4]. Use the API to integrate downtime management into your deployment pipelines or automation scripts.

<!-- TO CONFIRM: Exact resource type name for restriction policies, and whether Terraform supports it at launch. -->

To manage access to a downtime programmatically, use the [Restriction Policies API][8] with the `synthetics-downtime` resource type.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /monitors/downtimes/
[2]: https://app.datadoghq.com/synthetics/settings/downtimes
[3]: https://app.datadoghq.com/synthetics/tests
[4]: /api/latest/synthetics/#list-synthetics-downtimes
[5]: /account_management/rbac/#datadog-default-roles
[6]: /account_management/rbac/#custom-roles
[7]: /account_management/rbac/granular_access/
[8]: /api/latest/restriction-policies/
