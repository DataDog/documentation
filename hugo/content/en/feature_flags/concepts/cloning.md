---
title: Cloning Feature Flags
description: Create a feature flag from an existing flag's variants, targeting rules, and settings.
further_reading:
- link: "/feature_flags/concepts/targeting_rules/"
  tag: "Documentation"
  text: "Targeting Rules and Filters"
- link: "/feature_flags/concepts/permissions/"
  tag: "Documentation"
  text: "Permissions and Access Control"
- link: "/feature_flags/concepts/flag_history/"
  tag: "Documentation"
  text: "Feature Flag History"
---

Clone a feature flag to reuse its configuration for another feature. For example, use an existing flag as a template for variants and targeting rules across your environments.

## Permissions

To clone a flag in Datadog, you need the following [organization-level permissions][1]:

- **Feature Flag Config Read**
- **Feature Flag Config Write**
- **Feature Flag Environment Config Read**

You must also have access to view the source flag.

The clone copies the source flag's [granular access controls][4], including access granted to users, service accounts, roles, and teams. Datadog adds the person creating the clone as an **Editor** on the clone. If the source has no granular access restrictions, the clone has none.

## Clone a flag

1. Open the [Feature Flags list][2].
2. Open the flag's actions menu and select **Clone**.

   {{< img src="feature_flags/concepts/clone-flag-from-overview.png" alt="Feature Flags overview with a flag's actions menu open and the Clone option highlighted." style="width:100%;" >}}

   Alternatively, open the flag's details page, click the ellipsis (**...**) next to **Implementation**, and select **Clone**.

   {{< img src="feature_flags/concepts/clone-flag-from-details.png" alt="Feature flag details page with the actions menu open next to Implementation and the Clone option highlighted." style="width:100%;" >}}

3. Enter a name for the clone. Datadog generates a flag key from the name. To customize the key, click the pencil icon next to it and confirm your change. The key must not belong to an active flag, and it cannot be changed after creation. To reuse an archived flag's key, confirm when prompted.
4. Review the variants, targeting rules, and default variant for each environment. Only the name and key are editable in this dialog.
5. Click **Clone flag**.

Datadog opens the cloned flag's details page. The clone starts disabled in every environment. Review its configuration before enabling it. Its [version history][3] identifies the source flag by key.

## Copied configuration

The clone copies the following configuration from the source flag:

| Configuration | Copied settings |
|---------------|-----------------|
| Variants | Variant type, names, keys, values, and JSON schema, if defined. |
| Flag settings | Description, tags, SDK distribution channel, temporary or permanent lifetime, and approval setting. |
| Environment settings | Targeting rules in evaluation order, default variants, and variant overrides for each environment. |
| Rollouts | Progressive rollout and canary configurations, including rollout steps and guardrail metrics. |
| Notifications | Notification channels. |
| Permissions | Granular access controls for users, service accounts, roles, and teams. The person creating the clone also receives **Editor** access. |

Copied variant overrides take precedence over targeting rules and default variants, as they do on the source flag.

## Rollouts, schedules, and experiments

- **Progressive rollouts and canaries** are copied without their progress or scheduled start times. Start them from the cloned flag's details page.
- **Scheduled targeting rules** lose their scheduled start times and take effect when you enable the clone in their environment.
- **A/B experiments and their holdout rules** are not copied.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /feature_flags/concepts/permissions/#organization-level-permissions
[2]: https://app.datadoghq.com/feature-flags
[3]: /feature_flags/concepts/flag_history/
[4]: /feature_flags/concepts/permissions/#granular-access-on-individual-flags
