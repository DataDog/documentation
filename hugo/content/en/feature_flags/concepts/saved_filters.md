---
title: Saved Filters
description: Learn how to create reusable targeting rules and lists with saved filters and apply them across multiple feature flags.
further_reading:
- link: "/feature_flags/concepts/targeting_rules"
  tag: "Documentation"
  text: "Targeting Rules and Filters"
- link: "/feature_flags/concepts/traffic_splitting"
  tag: "Documentation"
  text: "Traffic Splitting and Randomization"
- link: "/feature_flags/concepts/environments"
  tag: "Documentation"
  text: "Environments"
---

## Overview

A **saved filter** is a reusable set of targeting conditions that you define once and apply to the targeting rules of many feature flags. Instead of recreating the same conditions on each flag, you maintain the logic in one place and reference it wherever you need it.

When you update a saved filter, the change propagates to every flag that uses it. This makes saved filters useful for targeting logic that you expect to change over time or share across teams, such as an internal-users list, a set of beta accounts, or a regional rollout audience.

## Saved filter types

Datadog supports these types of saved filters:

| Type | Description |
|------|-------------|
| **Saved Rule** | A reusable targeting rule built from one or more conditions, combined with `AND` or `OR` logic. Use this for multi-attribute targeting, such as `country` **is one of** `US`, `CA` **and** `tier` **equals** `premium`. |
| **Saved List** | A reusable list of values for a single attribute, evaluated with **is one of** or **is not one of**. Use this for membership-style targeting, such as a list of user IDs or email addresses. You can import the values from a CSV file. |

Saved filters contain only attribute conditions and cannot be nested or reference other saved filters.

{{< img src="feature_flags/saved_filters/saved-filters-list.png" alt="The Saved Filters list page in Feature Flags settings." style="width:100%;" >}}

## Create a saved filter

1. In **Feature Flags**, go to **Settings > Saved Filters** and click **New Saved Filter**.
2. Enter a **Name** and an optional **Description**.
3. Choose a **Filter type**:
   - **Saved Rule**: Build your conditions in the rule editor. Each condition uses an attribute from your SDK's [evaluation context][1], an operator, and one or more values.
   - **Saved List**: Provide the attribute and its values. You can enter values directly or import them from a CSV file.
4. Click **Save**.

{{< img src="feature_flags/saved_filters/create-saved-filter.png" alt="The New Saved Filter modal showing the filter type toggle and rule editor." style="width:60%;" >}}

The saved filter is available to apply to any flag in your organization.

## Reuse a saved filter in a targeting rule

After you create a saved filter, reference it when you configure a flag's targeting rules:

1. Navigate to **Feature Flags** and select your flag.
2. Select the environment whose rules you want to modify.
3. Add or edit a targeting rule, then click **Add > Add Saved Filter**.
4. Select the saved filter you want to apply.

{{< img src="feature_flags/saved_filters/add-saved-filter-to-rule-2.png" alt="The Add menu in a targeting rule, showing the Add Saved Filter option." style="width:75%;" >}}

You can combine a saved filter with other conditions in the same rule. For details about how targeting rules are evaluated, see [Targeting Rules and Filters][2].

## Edit a saved filter and apply changes

To edit a saved filter, open it from **Settings > Saved Filters** and update its name, description, or conditions.

When you save changes to a filter's conditions, the update applies to every enabled flag that uses the filter. Those flags begin evaluating against the updated logic immediately. To see which flags are affected, review the **Flags** list in the filter's panel before saving.

{{< img src="feature_flags/saved_filters/saved-filter-panel.png" alt="The saved filter side panel showing its conditions and the list of flags that use it." style="width:85%;" >}}

<div class="alert alert-info">
A single edit can change targeting behavior across many flags at once.
</div>

## Permissions and approvals

Editing saved filters requires feature flag write access. Governance settings on the flags that use a filter can block some changes:

- **Permission restrictions on downstream flags**: If a saved filter is used by a flag with granular permission restrictions, you must be among the users or teams allowed to modify that flag. If you are not, you cannot edit the saved filter.
- **Change approvals on downstream flags**: If a saved filter is used by flags that require approval for changes, edits to the filter are blocked until those requirements are satisfied. This helps prevent an upstream filter change from bypassing approval on the flags that depend on it.

## Archive a saved filter

When a saved filter is no longer needed, archive it from its panel. An archived filter:

- Is hidden from the default Saved Filters list.
- Can no longer be edited.
- Cannot be assigned to any additional flags.

Flags that already use the filter continue to work. You can unarchive a filter at any time to edit or reuse it.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /feature_flags/concepts/targeting_rules/#filters-and-evaluation-context
[2]: /feature_flags/concepts/targeting_rules/
