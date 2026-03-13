---
title: Getting Started with Teams
description: Build a reliable ownership model by syncing team data from identity providers, GitHub, and other sources into Datadog Teams.
further_reading:
- link: "/account_management/teams/"
  tag: "Documentation"
  text: "Datadog Teams"
- link: "/account_management/teams/manage/"
  tag: "Documentation"
  text: "Manage Teams"
- link: "/account_management/teams/github/"
  tag: "Documentation"
  text: "GitHub Teams Integration"
---

## Overview

This guide provides recommendations to Datadog organization administrators on how to use Datadog Teams effectively. It applies to the following situations:

- You want to use Datadog Teams to drive ownership workflows (including routing, visibility, governance, and access), not only as a directory.
- You already have team data spread across multiple systems. The systems may include Identity Provider (IdP) groups, SAML attributes, GitHub teams and CODEOWNERS files, internal tools, Terraform, spreadsheets, or Slack.
- Your organization wants to adopt Datadog Teams without breaking existing workflows.

This guide does not provide UI instructions. Instead, it focuses on decisions, sequencing, and common failure modes.

## Purpose of Datadog Teams

Datadog Teams helps you create a single model of ownership inside Datadog that can be referenced consistently across products and workflows.

Using Teams lets you answer the following operational questions:

- Who owns this service, monitor, or error?
- After finding the owner, how do you contact them?
- What is the ownership hierarchy?
- Who has access, or can grant access, to this resource?

## Assess your sources of team data

Before getting started with Datadog teams, inventory your existing sources of team data.
A combination of identity, collaboration, and operational tools commonly contribute to the full picture of team membership and areas of responsibility at an organization.

The following sources are some of the most common. For each source, trace it upstream to identify the ultimate source of truth.

### Identity sources

These sources answer the question of who is in which group. Identity sources provide the most accurate information on additions and removals, and for access permissions.

- IdP, such as Okta or Entra groups
- HR systems, including Workday or Rippling
- As a last resort, informal documents such as spreadsheets, text files, or presentation decks

### Ownership sources

These sources provide information about who owns which service:

- GitHub teams and CODEOWNERS files
- Developer portal software such as Backstage, Port, or Cortex
- Internal ownership registries or catalogs

Be aware of the following common problems with GitHub data:
- GitHub teams often have extra members
- CODEOWNERS files become inaccurate over time due to organizational changes

### Operational sources

Operational sources describe how the organization uses teams. These sources drive workflow impact:
- On-call tools such as PagerDuty or OpsGenie
- Incident response tools, including ServiceNow
- Alert routing
- Slack or Microsoft Teams channels
- Email lists

## Using Datadog Teams with multiple sources

**Datadog Teams works best as a consolidation and enrichment layer.** You can keep different sources responsible for different parts of the team model, and still have one consolidated view in Datadog Teams.

## Choosing your sync strategy

Datadog supports managing or syncing Teams data through the following:

- Identity providers (Okta, Entra) through [SCIM][1]-managed teams
- [SAML][2] attribute mapping to Teams
- Datadog [public APIs][3]
- [Terraform provider][4]
- [GitHub teams][5] and CODEOWNERS-driven enrichment and provisioning
- PagerDuty

The following sections describe the tradeoffs between the available strategies.

### IdP-driven sync
You can sync teams from Okta or Entra IdPs. Use IdP-driven sync if your organization has the following characteristics:
- You prioritize automatically capturing the accurate membership life cycle, including joiners and leavers.
- You want IT or the platform team to control team membership
- You can map groups to real teams without making your team list unmanageably large

When you sync Datadog Teams to your IdP, those teams are managed external to Datadog. You don't use Datadog to manually edit team membership.

#### Limitations
- Team provisioning through SCIM is unavailable in Entra due to a Microsoft freeze on third-party app updates.
- Okta does not support hierarchical relationships between groups.

#### Best practices
Make the IdP the authority for membership, then enrich ownership and metadata using other sources.

### SAML attribute mapping

Use SAML mapping to sync Datadog Teams if your organization has the following characteristics:

- You already have SAML configured for login
- You want team assignment to happen as part of authentication-based provisioning
- You need a low-effort way to start using teams without building a custom sync

**Note:** SAML mappings take effect during login. Suppose a user moves from Team A to Team B during an active login session. The team change is reflected in Datadog only after the user logs out and logs back in.

#### Best practices
Use SAML mapping as a practical, temporary solution when SCIM team creation isn't available, or you want provisioning without building a full pipeline.

### GitHub-driven teams
From GitHub, Datadog Teams can apply GitHub teams, hierarchy, and CODEOWNERS information. Use GitHub to sync Datadog Teams if your organization has the following characteristics:
- GitHub teams closely reflect your real organizational structure
- CODEOWNERS is your best ownership signal and you want Datadog to reflect it
- You care about hierarchy and nested teams

In Datadog's [GitHub provisioning flow][5], you can choose between two modes:
- Team enrichment only links existing teams.
- Full provisioning and membership management creates teams in Datadog based on the existing teams in GitHub, preserving hierarchy and membership.

Both modes of GitHub provisioning can use CODEOWNERS for richer ownership signals.

#### Common issues

- GitHub teams often diverge from actual organizational structure due to stale membership or ad-hoc team creation.
  - You can use the partial selection flow to indicate which parts of your GitHub organization you want to provision into Datadog.
- GitHub-based membership usually reflects the way that engineers work together. GitHub may not accurately reflect the company's formal organization structure or its IT life cycle.

#### Best practices
Use GitHub as your authority for code ownership and hierarchy, while another system remains the authority for identity life cycle.

### API-driven or Terraform management
Using API endpoints or Terraform to manage teams lets you provide a custom source of truth.

Use the API or Terraform if your organization has the following characteristics:
- You have internal tools that model teams
- You need custom logic (for example, merging, aliasing, or special naming)
- You want to centrally control team structure and membership and feed different systems, including Datadog included

#### Limitations
When manually provisioning teams through the API or Terraform, you must define and maintain your own desired state to avoid drift.

#### Best practices
Use API endpoints or Terraform to configure a stable backbone for platform teams, metadata standards, and controlled rollout.

## Recommended starting paths

Select the path that best matches your organization's existing infrastructure. As your setup matures, you can make adjustments.

### Start with your IdP, then enrich with GitHub

Use this path to establish a clean membership life cycle before adding code ownership signals.

1. Sync or map teams from Okta, Entra, or SAML to establish a membership baseline.
2. Treat membership as managed, and avoid manual overrides that can be reverted.
3. After the team list is stable, add GitHub connections (for example, CODEOWNERS or repo signals) to enrich ownership information.

This approach stabilizes team membership before layering in ownership data.

### Start with GitHub when code ownership is the driver

Use this path if CODEOWNERS is already how your organization routes issues and ownership.

1. Link Datadog Teams to GitHub teams (usually by matching handle to name).
2. Use CODEOWNERS to enrich ownership signals in Datadog.
3. Add IdP-driven membership later if you need life cycle correctness.

This approach delivers immediate value for ownership routing, independent of IdP group readiness.

### Start with Terraform for platform teams, then expand outward

Use this path if your platform team requires tight control and auditability.

1. Define a small set of foundational teams (for example, platform, SRE, security, and shared services).
2. Use Terraform to establish stable identifiers and required metadata standards.
3. Expand to product teams through IdP or GitHub after people are comfortable with the foundational teams.

This approach enforces consistency before broader adoption, reducing the risk of fragmented or conflicting team definitions.

## Common pitfalls

### Conflicting sources managing the same field

Symptoms:
- Membership reverts to a previous state after manual edits
- Duplicate teams appear (for example, `platform` and `platform_github`)
- Ownership and identity point to different team names

How to avoid:
- Assign clear ownership per field:
  - IdP owns membership
  - GitHub owns code ownership and hierarchy
  - Terraform or the API owns metadata standards
- When combining sources, use enrichment. Do not co-manage the same attribute across multiple sources.

### Over-syncing, or creating a team for every group

Symptoms:

- Hundreds or thousands of Datadog Teams without a clear purpose
- Teams used for permissions leak into ownership workflows

How to avoid:
- Sync a curated subset first consisting of operational teams only.
- Define a naming convention and eligibility rule (for example, only groups with a specific prefix, or groups in an allowlist).
- Pilot with one organizational unit, then expand.

### No clear owner for team hygiene

Symptoms:
- No defined owner for team metadata updates
- Reorganizations create churn and stale records, particularly around renames

How to avoid:
- Assign an operational owner per team, even when membership is automated.
- Account for renames in your operational plan. Renames and downstream handle changes carry significant cost, especially with CODEOWNERS.

### Unexpected SAML provisioning limitations

Symptoms:

- The features you expected to automate through SAML are not fully supported
- You add manual mapping steps

How to avoid:

- Validate your SAML assertion early, and keep the mapping model straightforward.
- If you automate roles through SAML mapping, explicitly test whether your desired team automation is supported end-to-end before committing to that approach.

## Next steps

### Validate your model before scaling

Select 5-10 teams and validate the following:
- Membership correctness
- Ownership correctness (using CODEOWNERS, repo signals, or service mapping)
- Metadata usefulness (using contacts, runbooks, and channels)

### Expand in controlled iterations

- Add one source or one organizational unit at a time.
- Measure drift: identify where teams differ between IdP and GitHub and investigate the cause.
- Establish change control (Terraform or API) for fields that must remain stable.

### 3 Plan for future sources

Build your Teams foundation so additional sources can be added later as enrichment, without requiring a full rebuild.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /account_management/scim/
[2]: /account_management/saml/
[3]: /api/latest/teams/
[4]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/team
[5]: /account_management/teams/github/
