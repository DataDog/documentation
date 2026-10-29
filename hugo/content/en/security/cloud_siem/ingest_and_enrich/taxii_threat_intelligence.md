---
title: Ingest TAXII Threat Intelligence
description: Connect Cloud SIEM to TAXII 2.1 servers so Datadog polls your threat intelligence collections on a schedule and uses their indicators to enrich your logs.
disable_toc: false
further_reading:
- link: "/security/cloud_siem/ingest_and_enrich/threat_intelligence/"
  tag: "Documentation"
  text: "Bring your own threat intelligence to Cloud SIEM"
- link: "/security/cloud_siem/ingest_and_enrich/stix_threat_intelligence/"
  tag: "Documentation"
  text: "Ingest STIX Threat Intelligence"
- link: "/security/cloud_siem/triage_and_investigate/ioc_explorer/"
  tag: "Documentation"
  text: "Investigate indicators with the IOC Explorer"
---

## Overview

If your threat intelligence provider or Threat Intelligence Platform (TIP) publishes indicators through a [TAXII 2.1][1] server, you can connect Cloud SIEM to that server directly. Datadog polls the collections you choose on a schedule and uses their indicators to [enrich your logs][2].

Client certificates (mTLS), bearer tokens, and OAuth are not supported; a TAXII server must use basic authentication or no authentication.

To push indicators from your own scripts or jobs instead, see [Ingest STIX Threat Intelligence][3].

## How it works

A TAXII server hosts one or more collections, each of which is a feed of STIX 2.1 objects. After you add a server and its collections:

1. Datadog polls each collection that has polling enabled, at the interval you set for that collection, and fetches new objects incrementally.
2. Datadog uses the collection's indicators to enrich logs while polling is enabled.

A collection with a large backlog can take several polling cycles to complete its first sync. Enrichment applies to logs that Cloud SIEM receives after the indicators are available.

Each organization can have up to 20 collections with polling enabled at a time. You can still add more collections beyond that limit, but you must leave scheduled polling disabled for them; enabling polling on a collection once you're at the limit returns an error, and that collection's polling stays disabled until you disable polling on another one.

### Supported indicator types

| Indicator type | STIX pattern object |
|---|---|
| IP address | `ipv4-addr`, `ipv6-addr` |
| Domain | `domain-name` |
| SHA-256 file hash | `file:hashes.'SHA-256'` |

Datadog skips other indicator types. Datadog extracts exact values from `=` and `IN` comparisons in the STIX pattern, and also accepts `OR` expressions, importing each value as a separate indicator. `AND` between bracketed expressions, negation, ranges, wildcard matching, regular expression matching, subnet relations, existence checks, temporal qualifiers, and `FOLLOWEDBY` are not supported, and Datadog skips any indicator whose pattern uses an unsupported expression.

The optional `valid_until` field sets an expiration for the indicator, and Datadog removes the indicator after that time. An indicator published without `valid_until` does not expire automatically.

An indicator published with `"revoked": true` is deleted from the reference table.

## Prerequisites

- Cloud SIEM is enabled for your organization.
- One or both of the following [permissions][5]:
  - Integrations Read to view TAXII servers and collections
  - Integrations Manage to add, change, or delete them
- From your TIP: the server's API root URL, credentials if the server requires them, and the UUID of each collection you want to ingest.

## Add a TAXII server

<div class="alert alert-info">
<ul>
<li>Check the server's name, API root URL, and authentication method before you save it. You can't change these after saving.</li>
<li>Stored credentials aren't viewable, but you can replace them later. See <a href="#replace-credentials">Replace credentials</a>.</li>
<li>Datadog validates the API root URL and credentials when the first enabled collection is polled, not when you save the server.</li>
</ul>
</div>

1. In Datadog, go to {{< ui >}}Integrations{{< /ui >}} and open the {{< ui >}}TAXII{{< /ui >}} tile.
1. Click {{< ui >}}Configure{{< /ui >}}, then click {{< ui >}}New{{< /ui >}}.
1. Enter a {{< ui >}}Name{{< /ui >}} for the server; for example, `Production threat intelligence`.
1. Enter the {{< ui >}}TAXII API root URL{{< /ui >}}; for example, `https://taxii.example.com/api/taxii2/`. The URL must use HTTPS.
1. Under {{< ui >}}Authentication{{< /ui >}}, select {{< ui >}}Basic authentication{{< /ui >}} or {{< ui >}}None{{< /ui >}}. For basic authentication, enter the {{< ui >}}Username or API token{{< /ui >}} and {{< ui >}}Password{{< /ui >}} from your provider. If your provider issues a single API token, enter it in {{< ui >}}Password{{< /ui >}}.
1. Click {{< ui >}}Save{{< /ui >}}.

## Add a collection

1. Go to {{< ui >}}Integrations{{< /ui >}} > {{< ui >}}TAXII{{< /ui >}} > {{< ui >}}Configure{{< /ui >}}, select the server from the {{< ui >}}TAXII servers{{< /ui >}} list, then click {{< ui >}}Add Collection{{< /ui >}}.
1. Enter the {{< ui >}}Collection UUID{{< /ui >}} and a {{< ui >}}Display name{{< /ui >}}. Datadog does not discover a server's collections automatically, so get the UUID from your provider.
1. Set the {{< ui >}}Initial lookback (days){{< /ui >}}. The default is 30 days. The lookback is based on when objects were added to the collection, and you cannot change it later.
1. Select a {{< ui >}}Polling interval{{< /ui >}}: 30 minutes, 1 hour (default), 6 hours, or 24 hours.
1. Leave {{< ui >}}Enable scheduled polling{{< /ui >}} selected to start ingesting immediately.
1. Click {{< ui >}}Add Collection{{< /ui >}}.

## Collection status

Datadog shows each collection's status in the {{< ui >}}Collections{{< /ui >}} table on the server's page ({{< ui >}}Integrations{{< /ui >}} > {{< ui >}}TAXII{{< /ui >}} > {{< ui >}}Configure{{< /ui >}}, then select the server).

| Status | Meaning |
|---|---|
| {{< ui >}}Healthy{{< /ui >}} | The most recent poll succeeded. |
| {{< ui >}}Pending{{< /ui >}} | Polling is enabled, but no poll has completed yet. |
| {{< ui >}}Error{{< /ui >}} | The most recent poll failed, or no poll has succeeded within twice the polling interval. |
| {{< ui >}}Not polling{{< /ui >}} | Polling is disabled. |
| {{< ui >}}Enabling{{< /ui >}}, {{< ui >}}Disabling{{< /ui >}} | A polling change is being applied. |
| {{< ui >}}Deleting{{< /ui >}} | The collection and its indicators are being removed. |
| {{< ui >}}Delete failed{{< /ui >}} | The removal did not finish. Delete the collection again to retry. |

A server is {{< ui >}}Healthy{{< /ui >}} when at least one of its collections is healthy, {{< ui >}}Error{{< /ui >}} when none are healthy and at least one has an error, and {{< ui >}}Pending{{< /ui >}} otherwise.

## Disable or enable polling

On the server's page ({{< ui >}}Integrations{{< /ui >}} > {{< ui >}}TAXII{{< /ui >}} > {{< ui >}}Configure{{< /ui >}}), use the toggle in the {{< ui >}}Poll{{< /ui >}} column of the {{< ui >}}Collections{{< /ui >}} table to disable or enable polling.
- Disabling stops polling and removes the collection's indicators from Cloud SIEM enrichment, without deleting them.
- Enabling resumes polling and restores enrichment. Enabled collections count toward the limit of 20.

## Replace credentials

For servers that use basic authentication:
1. Go to {{< ui >}}Integrations{{< /ui >}} > {{< ui >}}TAXII{{< /ui >}} > {{< ui >}}Configure{{< /ui >}}, select the server, then click {{< ui >}}Replace Credentials{{< /ui >}}.
1. Enter the complete new username and password.
1. Click {{< ui >}}Save{{< /ui >}}.

The new credentials apply from the next poll. If they are invalid, the server's collections show {{< ui >}}Error{{< /ui >}}.

## Delete a collection or server

On the server's page ({{< ui >}}Integrations{{< /ui >}} > {{< ui >}}TAXII{{< /ui >}} > {{< ui >}}Configure{{< /ui >}}, then select the server), you can delete a collection or the entire server:

- {{< ui >}}Delete Collection{{< /ui >}}, under the collection's row in the {{< ui >}}Collections{{< /ui >}} table, stops polling, removes the collection's indicators, and stops enrichment. The server's other collections are not affected.
- {{< ui >}}Delete TAXII Server{{< /ui >}}, at the top of the page, deletes all of the server's collections and their indicators, then the server and its credentials.

To stop enrichment but keep the indicators, [disable polling](#disable-or-enable-polling) instead.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.oasis-open.org/cti/taxii/v2.1/taxii-v2.1.html
[2]: /security/cloud_siem/ingest_and_enrich/threat_intelligence/
[3]: /security/cloud_siem/ingest_and_enrich/stix_threat_intelligence/
[5]: /account_management/rbac/permissions/#integrations
