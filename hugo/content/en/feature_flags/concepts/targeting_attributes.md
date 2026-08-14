---
title: Targeting Attributes
description: Define reusable targeting attributes so you get autocomplete suggestions and type-aware operators when building targeting rules.
further_reading:
- link: "/feature_flags/concepts/targeting_rules"
  tag: "Documentation"
  text: "Targeting Rules and Filters"
- link: "/feature_flags/concepts/environments"
  tag: "Documentation"
  text: "Environments"
---

## Overview

A **targeting attribute** is a reusable definition for a value your application sends in its evaluation context, such as `country` or `user_role`. Defining an attribute once lets you reuse it across targeting rules with autocomplete suggestions and type-aware operators, instead of retyping the attribute name and manually picking a compatible operator every time.

Each targeting attribute includes the following:

- **Attribute key**: The identifier you reference in targeting rules, for example `country` or `user.plan`. Keys are unique within your organization and are case-sensitive.
- **Data type**: `Boolean`, `String`, `Number`, or `Semver`. The data type determines which operators are available when you use the attribute in a targeting rule.
- **Distribution channel**: Which SDKs report this attribute in their evaluation context: **Client and Server**, **Client Only**, or **Server Only**. Semver attributes are only available for client SDKs.
- **Description** (optional): Notes for other users about what the attribute represents.

Targeting attributes are organization-wide: after they're defined, an attribute is available to targeting rules across all flags and environments.

## Manage targeting attributes

To view and manage your organization's targeting attributes:

1. Navigate to **{{< prodname >}}Feature Flags{{< /prodname >}}** > **Settings** > **Targeting Attributes**.
2. Click **Create Attribute** to define a new one, or select an existing attribute to edit it.

For each attribute, configure:

- **Attribute key**: A short, descriptive identifier. Datadog automatically removes unsupported characters when you save.
- **Data type**: Choose Boolean, String, Number, or Semver.
- **Distribution channel (which SDKs include this attribute in their evaluation context?)**: Choose Client and Server, Client Only, or Server Only.
- **Description** (optional): Add context so other users know what the attribute represents and how it's populated.

You can't create two attributes with the same key in your organization. Archiving an attribute (instead of deleting it) removes it from future autocomplete suggestions, but doesn't change any targeting rules that already reference it.

## Attribute autocomplete in targeting rules

When you build a filter on a targeting rule and start typing in the attribute field, Datadog suggests attributes from three sources:

- **Saved targeting attributes** from your organization's catalog, shown with their data type and description.
- **Attributes observed in evaluation data**: attributes your SDKs have actually sent in the last 7 days that aren't yet saved to the catalog. These appear without a data type.
- **Create a new attribute**: if you type a name that doesn't match an existing or observed attribute, you can select **Create new attribute** to define it without leaving the targeting rule editor.

{{< img src="feature_flags/concepts/targeting-attributes-autocomplete.png" alt="Attribute field in a targeting rule showing autocomplete suggestions and a Create new attribute option." style="width:70%;" >}}

Creating an attribute this way saves it to your organization's catalog with the **Client and Server** distribution channel and no data type. You can leave the data type unset, or edit the attribute from **Settings** > **Targeting Attributes** to set one later.

Click **View all attributes** above the filter to go to the Targeting Attributes settings page.

## How data type affects operators

After you select an attribute in a targeting rule, the operators offered are filtered to match its data type:

| Data type | Available operators |
|-----------|---------------------|
| **Boolean** | is, is null |
| **String** | is, matches, does not match, is one of, is not one of, is null |
| **Number** | is, is one of, is not one of, less than, less than or equal to, greater than, greater than or equal to, is null |
| **Semver** | is, is one of, is not one of, is null, semver equals, semver not equals, semver less than, semver less than or equal to, semver greater than, semver greater than or equal to |

If you change a condition's attribute to one with an incompatible data type, Datadog resets the operator and value to defaults for the new type. Attributes that haven't been saved to the catalog yet (only observed in evaluation data) don't restrict the available operators.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
