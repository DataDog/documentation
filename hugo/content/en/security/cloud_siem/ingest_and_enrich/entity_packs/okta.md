---
title: Okta Identity Entity Pack
description: Sync your Okta user directory into Cloud SIEM to add identity context to signals, risks, and investigations.
further_reading:
- link: "/security/cloud_siem/ingest_and_enrich/entity_packs/"
  tag: "Documentation"
  text: "Learn more about Entity Packs"
- link: "/security/cloud_siem/ingest_and_enrich/entity_packs/google_workspace/"
  tag: "Documentation"
  text: "Set up the Google Workspace Identity Entity Pack"
- link: "/security/cloud_siem/ingest_and_enrich/entity_packs/microsoft_entra_id/"
  tag: "Documentation"
  text: "Set up the Microsoft Entra ID Entity Pack"
- link: "/security/cloud_siem/triage_and_investigate/user_inventory/"
  tag: "Documentation"
  text: "Browse synced users in the User Inventory"
- link: "/security/cloud_siem/triage_and_investigate/entities_and_risk_scoring/"
  tag: "Documentation"
  text: "Explore entities and risk scoring with Entity Risks"
- link: "/integrations/okta/"
  tag: "Documentation"
  text: "Collect Okta logs with the Okta integration"
---

<!-- ===========================================================================
PRE-PUBLISH CHECKLIST — DELETE THIS BLOCK BEFORE COMMITTING
Finalized 2026-10-04. The page body below is complete and needs no further
drafting. The items under BLOCKERS and VERIFY are the only things outstanding.

BLOCKERS — cross-page conflicts found 2026-10-04, both need a decision
  [ ] 1. What the Entities count means. This page says the count "is the total
         number of users synced from this directory, which makes it the figure
         to compare against the size of your Okta directory."
         google_workspace.md now says "the entity count reflects the users
         synced within that range." Both cannot be true. The Google page is the
         newer of the two, and if it is right then this page sends readers to
         reconcile a range-scoped number against a directory headcount. Decide
         which is correct and align both pages in one pass.
  [ ] 2. Account Status capitalization. This page gives the normalized model as
         ACTIVE, SUSPENDED, DELETED. google_workspace.md writes the same values
         in title case — "other than Active, for example Suspended". The
         source captures show upper case in the Entities table, which favors
         this page, but the two must match before release.

VERIFY WITH ENGINEERING — currently asserted
  [ ] Two rows of "The connection test fails" are inferences, not observed
      failures: the SSWS-prefix row and the scheme-in-domain row. The SSWS row
      comes from the dialog placeholder showing a bare token value, plus the
      fact that raw Okta calls use an "Authorization: SSWS <token>" header, so
      readers will assume the prefix belongs in the field. The scheme row comes
      from the "e.g., mycompany.okta.com" placeholder. Neither was tested
      against Test Connection. A table that lists a non-cause sends readers to
      re-paste a token that was never the problem.
  [ ] Sync Duration by Credential units, and the Users Synced definition.
      entity_pack_okta_pre-activation.png labels the y-axis "Minutes" while
      google_workspace.md documents the same widget in milliseconds; one is
      wrong, or the widget auto-scales, and this page deliberately states no
      unit. The same capture shows Users Synced = 428 and Users by Credential =
      428 for a single credential, which reads like a full-directory count
      rather than the churn figure engineering described on 2026-10-02. Demo
      data on a first sync would explain it — every user is new, so every user
      is an update — but confirm, because the churn framing is the whole reason
      this page sends readers to Entities for the total.

SET CONSISTENCY — differences from the sibling pages, deliberate or not
  [ ] This page has no "The sync succeeds but no users appear" section;
      google_workspace.md does. The empty-directory fact now appears nowhere on
      this page, having been cut from Prerequisites and from Troubleshooting.
  [ ] This page omits the "To confirm that identity context is reaching your
      signals, open a signal attributed to a synced user..." sentence that both
      sibling pages carry at the end of Entities.
  [ ] Overview reads "Roll up user risk by user"; google_workspace.md now reads
      "Aggregate risk by user".
  [ ] This page says the token is never returned "in the interface";
      google_workspace.md says "in the UI". House style prefers "interface".
  [ ] This page says "Read-only access is all that is needed";
      google_workspace.md says "Datadog requests read-only access".
  [ ] Troubleshooting still names example.oktapreview.com and
      example.okta-emea.com, which the Okta domain section no longer
      introduces. Either reinstate the variants above or drop the row.

SETTLED — do not reopen
  - No ceiling. Per google_workspace.md: no directory size limit is known and
    none will be established before release. This page states no limit and must
    not acquire one speculatively.
  - No screenshots, by decision 2026-10-02. Every interface element is named in
    prose or in the tables. If revisited, note that both Okta captures in
    ../../source-material/ were taken in staging and show a Workday HRIS tile
    that is not in the release, and that no post-activation Okta capture exists.
  - Permissions follow entity_packs.md: SIEM Entities Admin to connect a
    directory, SIEM Entities Read to see the context.
  - One Okta org per credential, one API token per org. A token authenticates
    only against the org that issued it, so there is no shared-credential case.
  - Closed on review 2026-10-02: the API token is encrypted at rest; the Okta
    crawler runs continuously; Datadog's IP ranges are published per site; Okta
    statuses are normalized to the common status model.
  - Closed by edit 2026-10-04: the Okta domain section is scoped to the sign-in
    host only; the token-expiry "window before first use" paragraph, the
    Okta-side token verification paragraph, and the no-users-appear
    troubleshooting section were all cut.

REPO CONVENTIONS — verify with a git grep, GitHub was unreachable when drafting
  [ ] Whether the whats-next partial emits its own "Further reading" heading.
      All three pages in this set author one above it. If the partial emits one,
      remove the authored heading from all three pages together.
  [ ] Frontmatter field set and ordering, and whether reference-style link
      definitions are house convention.
  [ ] Four paths here are unverified because the pages do not exist yet:
      entity_packs/, entity_packs/google_workspace/,
      entity_packs/microsoft_entra_id/, and
      triage_and_investigate/user_inventory/. The sub-page slugs are owned by
      entity_packs.md; if they change there, they change here.
=========================================================================== -->

{{< site-region region="gov" >}}
<div class="alert alert-warning">Entity Packs are not available for the US1-FED Datadog site.</div>
{{< /site-region >}}

## Overview

The Okta Identity Entity Pack syncs your Okta user directory into Cloud SIEM. After you connect it, Cloud SIEM uses that directory to:

- Populate the [User Inventory][9] with your Okta users.
- Add a user pill to signals, so you can pivot from an event to the person behind it.
- Roll up user risk by user in [Entity Risks][1].

For what Entity Packs provide in general, and the permissions they require, see [Entity Packs][10].

Datadog reads your directory through the [Okta Users API][2], authenticating with an Okta API token that you create. Read-only access is all that is needed. Datadog never writes to your directory.

You configure one set of credentials per Okta org. To sync more than one, see [Connect additional Okta orgs](#connect-additional-okta-orgs).

## Prerequisites

Setup takes three values: a **Name**, your **Okta Domain**, and an **API Token**. You enter all three in the Entity Pack; the token is created in Okta.

Before you begin, make sure you have:

- An Okta admin role that can create an API token and read users. **Read-only Administrator** is enough, and broader admin roles work too. See Okta's [standard administrator roles and permissions][5].
- The **SIEM Entities Admin** permission in Datadog, which is required to connect a directory. Analysts who need the identity context it provides need at least **SIEM Entities Read**. See [Entity Packs][10].

### Create the API token

1. In the Okta Admin Console, go to **Security** > **API**.
1. Click the **Tokens** tab, then click **Create token**.
1. Name the token something that identifies Datadog as the consumer, for example `datadog-cloud-siem`.
1. From **API calls made with this token must originate from**, select **Any IP**. To restrict the token to Datadog's addresses instead, see [Network restrictions](#network-restrictions).
1. Click **Create token**, then copy the token value immediately. Okta shows it only once and stores a hash of it afterward.

For the full procedure and the other network zone options, see Okta's [Manage Okta API tokens][4].

<div class="alert alert-info">Create the token from a dedicated service account, such as <code>datadog-integration@example.com</code>, rather than from a person's account. A token inherits the permissions of the account that created it, and Okta rejects tokens from accounts that have been deactivated. If that account belongs to someone who leaves or loses their admin role, the sync stops, and the cause is hard to trace.</div>

### Token expiration

Okta API tokens are valid for 30 days, and every API request renews the token. An active Entity Pack therefore keeps its own token alive. A token left unused for more than 30 days is revoked permanently and cannot be reinstated.

### Network restrictions

Selecting **Any IP** is the simplest option. If your organization requires a restricted token, scope it to an Okta IP zone containing Datadog's published IP ranges.

Datadog publishes those ranges as JSON at a per-site endpoint. For the US1 site, that endpoint is `https://ip-ranges.datadoghq.com/`. Use the one that matches your own Datadog site, and refresh your zone whenever the ranges change — the response carries `version` and `modified` fields you can watch. For the full list of endpoints, see [IP Ranges][12].

Two Okta constraints apply if you take this route. SSWS tokens work only with IP-based zones, not dynamic ones, and they cannot be used with blocklist zones.

### Okta domain

Enter the host you sign in to, without a scheme or path — for example, `example.okta.com`.

## Setup

### Add credentials in Datadog

1. In Datadog, go to [Cloud SIEM > Content Packs][6].
1. Filter by **Entity Pack**, then open the **Okta Identity** Entity Pack. It is marked **AVAILABLE** until you connect a directory.
1. Click **Add Credentials**.
1. In the **Add credentials and activate content pack** dialog, complete the three fields:

   | Field | Description |
   | --- | --- |
   | **Name** | A display name for this set of credentials, for example `Production credentials`. Use a name that identifies the org if you plan to connect more than one. |
   | **Okta Domain** | The Okta org to sync, for example `example.okta.com`. Enter the host only, with no scheme or path. |
   | **API Token** | The token value you copied from Okta. Paste the value by itself, without the `SSWS` prefix used in raw API requests. |

1. Click **Test Connection**. Datadog validates the credentials against Okta before saving them. If validation fails, see [Troubleshooting](#troubleshooting).
1. When the connection test succeeds, save the credentials to activate the Entity Pack.

Datadog encrypts the API token at rest and never returns it in the interface or in API responses.

## Verify the sync

Synchronization is continuous. The first sync starts as soon as Datadog validates the credential, and each sync after that begins when the previous one finishes, so you never schedule or trigger a sync yourself.

That makes **Last synced** a health check in its own right. A healthy account is always recently synced, so a **Last synced** time that stops advancing means something is wrong.

Once a credential is validated, the Entity Pack is marked **ACTIVE**. Open its side panel in Cloud SIEM and check the following.

### Credentials

The **Credentials** section lists each connected account. Expand an account to see:

| Field | What it tells you |
| --- | --- |
| **Domain** | The Okta org this account syncs. |
| **Status** | Whether synchronization is **Enabled** or disabled for this account. Use the toggle to change it. |
| **Last updated** | When the credential itself was last modified. |
| **Sync status** | Whether the most recent sync completed, for example **Synced**. |
| **Last synced** | How long ago the most recent sync ran. |
| **Last sync duration** | How long that sync took. |

Each account also carries a validation badge:

| Badge | Meaning |
| --- | --- |
| **VALID** | Datadog can authenticate to Okta with these credentials. |
| **INVALID** | Datadog cannot authenticate. See [Troubleshooting](#troubleshooting). |

Through the API, a credential reports `initializing` after Datadog accepts it and before the first sync completes.

### Key Metrics

The **Key Metrics** dashboard shows four widgets:

- **Users Synced** — how many users a sync updated. This measures directory churn rather than directory size, so it normally reads far lower than your total user count. For the total, use the **Entities** section below.
- **Users by Credential** — the same count, broken out by connected account.
- **Sync History by Credential** — completed syncs over time. A gap means a sync failed or was skipped.
- **Sync Duration by Credential** — how long each sync took. An occasional spike is normal. A sustained climb usually means the directory is growing, or that Okta is rate limiting the calls.

Both per-credential widgets group by `credential_name`, which is derived from the **Name** you entered.

### Entities

The **Entities** section lists the users this Entity Pack synced. Each row shows **Display Name**, **Principal ID**, **User Type** (for example, `human` or `service_account`), and **Account Status** (for example, **ACTIVE**).

Cloud SIEM normalizes Okta's user statuses to the common status model it uses for every identity provider (**ACTIVE**, **SUSPENDED**, **DELETED**). The values here are not Okta's own status names.

The entity count is the total number of users synced from this directory, which makes it the figure to compare against the size of your Okta directory. The list covers a time range you can change. To see everything, click **View in User Inventory**.

## Connect additional Okta orgs

Each set of credentials syncs one Okta org. To sync another, create an API token in that org, then click **Add account** in the **Credentials** section of the Entity Pack side panel.

When you connect multiple orgs:

- Name each account after the org it syncs. The three per-credential widgets group by `credential_name`, a normalized form of the **Name** you enter, so vague names make those widgets hard to read.
- Use the per-account toggle under **Status** to pause synchronization for one org without removing its credential.
- Create a separate API token in each org. A token authenticates only against the org that issued it.

## Troubleshooting

### The connection test fails

Work through these causes in order:

| Cause | How to confirm | Fix |
| --- | --- | --- |
| Token value pasted with the `SSWS` prefix or surrounding whitespace | The value you pasted is longer than the token Okta displayed | Re-paste the token value by itself. |
| Okta domain entered with a scheme or path | The **Okta Domain** value starts with `https://`, or ends in `/admin` or a trailing slash | Enter the host only, for example `example.okta.com`. |
| Wrong Okta org host | The value uses `example.okta.com` for a preview org, or omits the `-emea` suffix for an EMEA org | Use the host you sign in to: `example.oktapreview.com` or `example.okta-emea.com`. |
| Token creator is not an admin, or cannot read users | The account that created the token has no admin role in the Okta Admin Console | Create the token from an account with **Read-only Administrator** or a broader admin role. |
| Token creator was deactivated | The account that created the token is no longer active in Okta | Create a new token from an active service account. Okta rejects tokens from deactivated users. |
| Token revoked or expired | The token is missing from the **Tokens** tab in Okta, or its last-used date is more than 30 days old | Create a new token and add it in Datadog. Okta permanently revokes tokens left unused for 30 days. |
| Token restricted to network zones that exclude Datadog | The token's **Token can be used from** setting is anything other than **Any IP** | Set the token to **Any IP**, or confirm the IP zone covers Datadog's published ranges. See [Network restrictions](#network-restrictions). |

### Credentials were working and are now invalid

The cause is usually a change on the Okta side:

- The account that created the token was deactivated, or lost the admin role that gave it read access to users. A token's permissions follow the creating account's, so a role change alone can break the sync. This is the common failure when the token belongs to a person rather than a service account.
- The token was revoked from the **Tokens** tab, or expired after 30 days without use.
- The token's network zone restrictions changed.

Okta logs token creation and revocation in the System Log as `API token created` and `API token revoked`. That is the fastest way to confirm whether a token was revoked, and by whom.

### Syncs are slow or intermittent

Okta applies API rate limits per org and returns `HTTP 429 Too Many Requests` once a limit is exceeded. Tokens created in the Okta Admin Console default to 50% of each rate limit, and any other integration calling with the same token draws on that same budget.

- In Okta, check **Reports** > **Rate Limits** for warnings and violations, which Okta also writes to the System Log.
- On the token's page in Okta, raise the **Token rate limits** percentage if the default is constraining the sync.
- Give Datadog its own token rather than reusing one that other integrations already call with.

See Okta's [rate limits overview][11].

### No user pill appears on signals

Cloud SIEM matches identity context to events by email address. If a synced user has no pill on their activity, check that the logs from that source populate the user email field, and that the source's OCSF pipeline is active. See [Open Cybersecurity Schema Framework][7].

An Entity Pack does not require the matching log integration, and the integration does not require the Entity Pack. If you are syncing the directory but see no Okta activity to attach it to, you may also need the [Okta log integration][3].

If you still need help, contact [Datadog support][8].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/cloud_siem/triage_and_investigate/entities_and_risk_scoring/
[2]: https://developer.okta.com/docs/api/openapi/okta-management/management/tags/user
[3]: /integrations/okta/
[4]: https://help.okta.com/en-us/content/topics/security/api.htm
[5]: https://help.okta.com/en-us/content/topics/security/administrators-admin-comparison.htm
[6]: https://app.datadoghq.com/security/siem/content-packs
[7]: /security/cloud_siem/ingest_and_enrich/open_cybersecurity_schema_framework/
[8]: /help/
[9]: /security/cloud_siem/triage_and_investigate/user_inventory/
[10]: /security/cloud_siem/ingest_and_enrich/entity_packs/
[11]: https://developer.okta.com/docs/reference/rate-limits/
[12]: /api/latest/ip-ranges/
