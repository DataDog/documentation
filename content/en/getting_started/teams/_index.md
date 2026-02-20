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

## Who this guide is for

This guide is for Datadog Org Admins who:

- Want Datadog Teams to be dependable enough to power ownership workflows (routing, visibility, governance, access), not a directory.
- Already have "team" data spread across multiple systems (IdP groups, SAML attributes, GitHub teams/CODEOWNERS, internal tools, Terraform, spreadsheets, Slack, and others).
- Are early in Datadog Teams adoption and want a practical way to get to a reliable model without breaking existing workflows.

This guide is not a UI walkthrough. It focuses on decisions, sequencing, and common failure modes.

## What problem Datadog Teams solves

Datadog Teams helps you create a **single, usable model of ownership** inside Datadog that can be referenced consistently across products and workflows, without requiring you to manually manage it.

Think of Teams as the place where you can answer, operationally:

- *Who owns this service/monitor/error?*
- *How do you contact them (channel, email, runbook)?*
- *How does ownership roll up (team to org unit / platform group)?*
- *Who has access, or can grant access, to this resource?*

## Before you start: assess your existing sources of team data

You move faster (and avoid rework) if you inventory your sources first. In practice, admins commonly pull "team truth" from a mix of identity, collaboration, and operational tools.

The following sources are some of the most common. For each source, trace it upstream to identify the ultimate source of truth.

### Identity sources (membership and life cycle)

These sources answer "who is in which group, today?". Often the best source for joiners/leavers and for permissioning purposes.

- Okta / Entra groups / other IdP
- Workday / Rippling / other HR system
- Spreadsheet / notepad / slide (when everything else failed, this is what you use to track how people work)

### Ownership sources (code and service accountability)

These sources answer "who owns this service?":

- GitHub teams and CODEOWNERS file
- Backstage / Port / Cortex
- Internal ownership registries or catalogs

**Things to note:**

- Whether GitHub teams are "clean" enough to be authoritative
- How CODEOWNERS changes are maintained consistently during reorgs (this is frequently painful)

### Operational sources (how teams are actually used)

These sources drive workflow impact:

- On-call tools such as PagerDuty or OpsGenie, incident response (ServiceNow), alert routing
- Slack/MS Teams channels, email lists

## How Datadog Teams fits into a multi-source reality

**Datadog Teams works best as a consolidation and enrichment layer.** You can keep different sources responsible for different parts of the team model, and still have one consolidated view in Datadog Teams.

## Choosing your sync strategy

Datadog supports managing or syncing Teams data through:

- Identity providers (Okta, Entra) through [SCIM][1]-managed teams
- [SAML][2] attribute mapping to Teams
- Datadog [public APIs][3]
- [Terraform provider][4]
- [GitHub teams][5] and CODEOWNERS-driven enrichment and provisioning
- PagerDuty

Below is how to choose, with the tradeoffs that usually matter.

### Option A: IdP-driven sync (Okta/Entra)

Use IdP-driven sync when:

- Your top priority is automated and accurate membership life cycle (joiners/leavers)
- You want IT or platform to "own membership hygiene" centrally
- You can map groups to real teams without exploding your team list

How it behaves:

- Teams created from IdP groups are **externally managed** ("managed teams"): membership is kept in-sync with the IdP group.
- Practically, for managed teams, you typically **don't edit membership manually in Datadog**.

Important notes:

- As of February 2026, **team provisioning through SCIM is unavailable in Entra** due to a Microsoft freeze on third-party app updates.
- Okta does not support hierarchical relationships between groups.

**Best use:** make IdP your authority for **membership**, then enrich ownership/metadata elsewhere.

### Option B: SAML attribute mapping

Use SAML mapping when:

- You already have SAML configured for log in
- You want team assignment to happen as part of authentication-based provisioning
- You need a low-effort way to start without building custom sync or asking another team in your org to help you set up

Tradeoff to plan for:

- SAML mappings take effect during login. So if a user was moved from Team A to Team B, this is reflected in Datadog only after the user re-logs in.

**Best use:** a pragmatic bridge when SCIM team creation isn't available or you want provisioning without building a full pipeline.

### Option C: GitHub-driven teams (teams, hierarchy, CODEOWNERS)

Use GitHub when:

- GitHub teams already reflect your real org structure (or close enough)
- CODEOWNERS is your best ownership signal and you want Datadog to reflect it
- You care about hierarchy and nested teams

In Datadog's [GitHub provisioning flow][5] you can choose between Team enrichment only (link existing teams) or full provisioning and membership management (create teams in Datadog based on the existing Teams in GitHub) while preserving hierarchy, membership, and use CODEOWNERS for richer ownership signals.

What to watch:

- GitHub teams often diverge from actual org structure due to stale membership or ad-hoc team creation.
  - You can use the "partial selection" flow to indicate which parts of your GitHub org you want to provision into Datadog.
- GitHub-based membership usually reflects engineering reality, not necessarily HR/IT life cycle reality.

**Best use:** make GitHub your authority for **code ownership and hierarchy**, while another system remains the authority for identity life cycle.

### Option D: API-driven / Terraform management (custom source of truth)

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

1. Sync or map teams from Okta/Entra/SAML (membership baseline).
2. Treat membership as managed-avoid manual overrides that get reverted.
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


[1]: /account_management/scim/
[2]: /account_management/saml/
[3]: /api/latest/teams/
[4]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/team
[5]: /account_management/teams/github/
