---
title: Ingest TAXII Threat Intelligence
description: Connect Cloud SIEM to TAXII 2.1 servers so Datadog polls your threat intelligence collections on a schedule and uses their indicators to enrich your logs.
disable_toc: false
further_reading:
- link: "/security/cloud_siem/ingest_and_enrich/threat_intelligence/"
  tag: "Documentation"
  text: "Bring your own threat intelligence to Cloud SIEM"
- link: "/security/cloud_siem/guide/ingest-stix-threat-intelligence/"
  tag: "Documentation"
  text: "Ingest STIX Threat Intelligence"
- link: "/security/cloud_siem/triage_and_investigate/ioc_explorer/"
  tag: "Documentation"
  text: "Investigate indicators with the IOC Explorer"
---

## Overview

If your threat intelligence provider or Threat Intelligence Platform (TIP) publishes indicators through a [TAXII 2.1][1] server, you can connect Cloud SIEM to that server directly. Datadog polls the collections you choose on a schedule and uses their indicators to [enrich your logs][2].

To push indicators from your own scripts or jobs instead, see [Ingest STIX Threat Intelligence][3].

## How it works

A TAXII server hosts one or more collections, and each collection is a feed of STIX 2.1 objects. After you add a server and its collections:

1. Datadog polls each collection that has polling enabled, at the interval you set for that collection.
2. The first poll fetches the objects added to the collection during the initial lookback period. Later polls fetch only the objects added since the previous poll.
3. Cloud SIEM uses the collection's indicators to enrich logs while polling is enabled.

A collection with a large backlog can take several polling cycles to complete its first sync. Enrichment applies to logs that Cloud SIEM receives after the indicators are available.

### Supported indicator types

| Indicator type | STIX pattern object |
|---|---|
| IP address | `ipv4-addr`, `ipv6-addr` |
| Domain | `domain-name` |
| SHA-256 file hash | `file:hashes.'SHA-256'` |

Datadog skips other indicator types. Patterns, expiration (`valid_until`), and revocation (`revoked`) are handled the same way as [STIX ingestion][4].

## Prerequisites

- Cloud SIEM is enabled for your organization.
- The Integrations Manage permission to add, change, or delete TAXII servers and collections. The Integrations Read permission is enough to view them.
- From your provider: the server's API root URL, credentials if the server requires them, and the ID (a UUID) of each collection you want to ingest.

Each organization can have up to 20 collections with polling enabled. TAXII collections do not count toward the [limit of 10 threat intelligence reference tables][5] that Cloud SIEM enriches with.

## Add a TAXII server

<!-- TODO: confirm UI with FE -->

## Add a collection

<!-- TODO: confirm UI with FE -->

## Collection status

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

<!-- TODO: confirm UI with FE --> 

## Replace credentials

<!-- TODO: confirm UI with FE --> 

## Delete a collection or server
<!-- TODO: confirm UI with FE -->
- {{< ui >}}Delete collection{{< /ui >}} stops polling, removes the collection's indicators, and stops enrichment. The server's other collections are not affected.
- {{< ui >}}Delete TAXII server{{< /ui >}} deletes all of the server's collections and their indicators, then the server and its credentials.

To stop enrichment but keep the indicators, [disable polling](#disable-or-enable-polling) instead.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.oasis-open.org/cti/taxii/v2.1/taxii-v2.1.html
[2]: /security/cloud_siem/ingest_and_enrich/threat_intelligence/
[3]: /security/cloud_siem/guide/ingest-stix-threat-intelligence/
[4]: /security/cloud_siem/guide/ingest-stix-threat-intelligence/#supported-indicator-types-and-patterns
[5]: /security/cloud_siem/guide/ingest-stix-threat-intelligence/#if-you-reach-the-reference-table-limit