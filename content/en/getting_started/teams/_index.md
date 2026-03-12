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
- You already have team data spread across multiple systems. The systems may include IdP groups, SAML attributes, GitHub teams/CODEOWNERS, internal tools, Terraform, spreadsheets, Slack, and others.
- Your organization wants to adopt Datadog Teams without breaking existing workflows.

This guide does not provide UI instructions. Instead, it focuses on decisions, sequencing, and common failure modes.

## Purpose of Datadog Teams

Datadog Teams helps you create a single model of ownership inside Datadog that can be referenced consistently across products and workflows.

Teams answers the following operational questions:

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

- GitHub teams and CODEOWNERS file
- Developer portal software such as Backstage, Port, or Cortex
- Internal ownership registries or catalogs

Be aware of the following common problems with GitHub data:
- GitHub teams often have extra members
- CODEOWNERS files become inaccurate over time due to reorgs 

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

### IdP-driven sync (Okta or Entra)

Use IdP-driven sync if your organization has the following characteristics:

- Your top priority is automatically capturing the accurate membership life cycle, including joiners and leavers.
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
Use SAML mapping as practical, temporary solution when SCIM team creation isn't available or you want provisioning without building a full pipeline.

### GitHub-driven teams (teams, hierarchy, CODEOWNERS)

Use GitHub to sync Datadog Teams if your organization has the following characteristics:

- GitHub teams closely reflect your real org structure
- CODEOWNERS is your best ownership signal and you want Datadog to reflect it
- You care about hierarchy and nested teams

In Datadog's [GitHub provisioning flow][5], you can choose between two modes:
- Team enrichment only links existing teams.
- Full provisioning and membership management creates teams in Datadog based on the existing teams in GitHub, preserving hierarchy and membership.
Both modes of GitHub provisioning can use CODEOWNERS for richer ownership signals.

#### Common issues

- GitHub teams often diverge from actual org structure due to stale membership or ad-hoc team creation.
  - You can use the "partial selection" flow to indicate which parts of your GitHub org you want to provision into Datadog.
- GitHub-based membership usually reflects the way that engineers work together. GitHub may not accurately reflect the company's formal organization structure or its IT life cycle.

#### Best practices
Use GitHub as your authority for code ownership and hierarchy, while another system remains the authority for identity life cycle.

### API-driven / Terraform management (custom source of truth)

Use the API or Terraform when:

- You have internal tools that already model teams
- You need custom logic (merge, aliasing, special naming)
- You want to centrally control Team structure and membership and feed different systems (Datadog included)

Tradeoffs:

- You must define and maintain your own "desired state" to avoid drift.

**Best use:** a stable backbone for platform teams, metadata standards, and controlled rollout.

## Recommended starting paths

Pick a path that matches your *current* reality. You can change later, but starting cleanly matters.

### Path 1: Start with your IdP, then enrich with GitHub

Choose this if you want a clean membership life cycle first.

1. Sync or map teams from Okta, Entra, or SAML (membership baseline).
2. Treat membership as managed—avoid manual overrides that get reverted.
3. Add GitHub connections for ownership enrichment (CODEOWNERS, repo signals) after the team list is stable.

**Why this works:** you stabilize "who is on the team" first, then layer "what they own."

### Path 2: Start with GitHub when code ownership is the driver

Choose this if CODEOWNERS is already how you route issues/ownership.

1. Link Datadog Teams to GitHub teams (initially often by name/handle match).
2. Use CODEOWNERS to enrich ownership signals in Datadog.
3. Add IdP-driven membership later if you need life cycle correctness.

**Why this works:** you get immediate value for ownership routing, even if your IdP groups aren't ready.

### Path 3: Start with Terraform for platform teams (then expand outward)

Choose this if your platform team needs tight control and auditability.

1. Define a small set of foundational teams (platform, SRE, security, shared services).
2. Use Terraform to establish stable identifiers and required metadata standards.
3. Expand to product teams through IdP or GitHub after conventions are proven.

**Why this works:** you prevent the "wild west" phase where everyone creates teams inconsistently.

## Common pitfalls and how to avoid them

### Pitfall 1: Conflicting sources fighting over the same field

Symptoms:

- Membership "snaps back" after you edit it
- Teams duplicate ("platform" vs "platform_github")
- Ownership points to one team name while identity points to another

How to avoid:

- Decide who owns what:
  - **IdP owns membership**
  - **GitHub owns code ownership/hierarchy**
  - **Terraform/API owns metadata standards**
- When you must combine sources, combine them by **enrichment**, not by co-managing the same attribute.

### Pitfall 2: Over-syncing (turning every group into a team)

Symptoms:

- Hundreds/thousands of Teams with unclear purpose
- Teams used for permissions leak into ownership workflows

How to avoid:

- Sync a curated subset first ("real teams" only).
- Create a naming convention and eligibility rule (for example, only groups with a prefix, or only groups in an allowlist).
- Pilot with one org unit, then expand.

### Pitfall 3: Unclear ownership of "team hygiene"

Symptoms:

- Nobody knows who updates team metadata
- Reorgs create churn and stale records (especially around renames)

How to avoid:

- Assign a clear operational owner per team (even if membership is automated).
- Expect renames and plan: customers frequently flag that renames and downstream handle changes are costly, especially with CODEOWNERS.

### Pitfall 4: SAML provisioning complexity surprises

Symptoms:

- You can't fully automate what you expected through SAML
- You end up with manual mapping steps

How to avoid:

- Validate your SAML assertion early and keep the mapping model straightforward.
- If you already automate roles through SAML mapping, explicitly test whether your desired team automation is supported end-to-end.

## What to do next

### 1) Validate your model (before scaling)

- Pick 5-10 teams and validate:
  - Membership correctness
  - Ownership correctness (CODEOWNERS, repo signals, service mapping)
  - Metadata usefulness (contacts, runbooks, channels)

### 2) Expand in controlled iterations

- Add one source or one org unit at a time.
- Measure drift: where do teams differ between IdP and GitHub, and why?
- Establish change control (Terraform/API) for fields that must be stable.

### 3) Plan for "next sources," but don't block on them

Design your Teams foundation so you can attach other sources later as enrichment, not as a required first step.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /account_management/scim/
[2]: /account_management/saml/
[3]: /api/latest/teams/
[4]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/team
[5]: /account_management/teams/github/
