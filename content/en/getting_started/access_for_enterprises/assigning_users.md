---
title: Assigning Users to Roles and Teams
description: Learn the distinction between Roles and Teams and how to assign users at scale.
further_reading:
- link: "/getting_started/teams/"
  tag: "Documentation"
  text: "Getting Started with Teams"
- link: "/account_management/saml/"
  tag: "Documentation"
  text: "SAML Configuration"
- link: "/account_management/scim/"
  tag: "Documentation"
  text: "SCIM Provisioning"
- link: "/api/latest/teams/"
  tag: "Documentation"
  text: "Teams API Reference"
---

## Overview

With the [permission model and starter roles][1] defined, the next step is assigning users to the right Roles and Teams. This section covers the distinction between Roles and Teams for access control, how they work together, and practical guidance on assignment.

## Roles vs. Teams

In Datadog, users can be assigned one or more roles and be added to one or more teams. Both can be used to scope permissions, but they serve different purposes.

**Roles** define what features a user has access to and which feature capabilities they can access. For access, this could mean:

- Who should be able to manage other users' permissions in Datadog
- Who is never able to see any Logs data
- Who is able to view Monitors, but not edit any
- Who can see sensitive data within a given Team (for example, which Team members can see personally identifiable information or PII)

**Teams** define users who work in the same problem space, on the same technical or product areas (such as services or repos), or need similar Monitor alerts. For access, this could mean:

- Who is able to edit a set of Monitors, because they own the underlying infrastructure
- Who is able to see sensitive Logs that are related to that Team's work
- Who is able to see any data related to a sensitive service owned by that Team

## How to use Roles and Teams together

Best practices for Roles and Teams include the following:

- Use **Roles** to define broad permission tiers (what a user *can do* across the platform).
- Use **Teams** to define ownership boundaries (what resources and data a user *is responsible for*).
- Where a specific Team needs elevated permissions, use **Team-linked Roles** (in Preview) to assign the role to the Team rather than to individual users. When you assign a role to a Team, each member receives the role.

## Request Access (Preview)

Datadog offers Request Access (in Preview) for situations where users need temporary or elevated access beyond their standard role, such as responding to an urgent incident or debugging a production issue in another team's domain. This allows end users to request access to resources they don't have, with approval workflows for administrators.

## Recommendations

- **Use Roles for what users *can do*, and Teams for what users *are responsible for*.** Don't conflate the two.
- **Establish an admin override team** before you begin restricting resources to specific teams. See [Permissions and Feature Access][1] for details.
- **Automate provisioning.** Map your IdP groups to Datadog Roles and Teams. Manual user management does not scale.
- **Audit role and team assignments periodically.** Look for users with more permissions than they need, roles with no users, and stale team memberships.

## Next steps

Restrict who can edit or view Dashboards, Monitors, and other assets. See common patterns in [Protecting Assets][2].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /getting_started/access_for_enterprises/permissions/
[2]: /getting_started/access_for_enterprises/protecting_assets/
