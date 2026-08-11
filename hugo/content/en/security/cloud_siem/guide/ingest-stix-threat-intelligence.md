---
title: Ingest STIX Threat Intelligence
description: Send your own threat intelligence to Cloud SIEM as STIX 2.1 bundles. Covers the ingestion endpoint, authentication, supported indicator types and patterns, the reference tables Datadog generates for each indicator type, and how to configure or remove them.
disable_toc: false
further_reading:
- link: "/security/cloud_siem/ingest_and_enrich/threat_intelligence/"
  tag: "Documentation"
  text: "Bring your own threat intelligence to Cloud SIEM"
- link: "/security/threat_intelligence/"
  tag: "Documentation"
  text: "Threat intelligence in Datadog Security"
- link: "/security/cloud_siem/triage_and_investigate/ioc_explorer/"
  tag: "Documentation"
  text: "Investigate indicators with the IOC Explorer"
- link: "/reference_tables/"
  tag: "Documentation"
  text: "Create and manage reference tables"
---

{{< callout btn_hidden="true" >}}
STIX ingestion is in Preview.
{{< /callout >}}

## Overview

If your organization maintains threat intelligence in a Threat Intelligence Platform (TIP), you can send it to Cloud SIEM as [STIX 2.1][1] bundles. Cloud SIEM uses the ingested indicators to [enrich your logs][2] and displays them in the [IOC Explorer][3].

Use STIX ingestion when your platform already produces STIX, or when you want a script or scheduled job to push incremental updates. To upload indicators as CSV files or sync them from cloud storage instead, see [Bring your own threat intelligence to Cloud SIEM][2].

## How it works

After you send a STIX 2.1 bundle to the [ingestion endpoint](#send-indicators), Datadog processes it as follows. No configuration in Datadog is required beforehand.

1. Datadog identifies the feed from the required `ti_vendor` header.
2. Datadog generates one [reference table][4] for each indicator type in your feed, named `threat_intel_stix_<TI_VENDOR>_<INDICATOR_TYPE>`. Because one bundle can contain several indicator types, a single request can populate several tables.
3. Datadog registers each generated table and enables it for Cloud SIEM enrichment automatically.
4. Later requests for the same `ti_vendor` update the existing tables and preserve the configuration choices you make.

For example, a feed sent with `ti_vendor: acme` that contains IP address, domain, and SHA-256 indicators produces the following tables:

| Indicator type | Generated reference table |
|---|---|
| IP address | `threat_intel_stix_acme_ip_address` |
| Domain | `threat_intel_stix_acme_domain` |
| SHA-256 file hash | `threat_intel_stix_acme_sha256` |

Tables become available a few minutes after your first request. Enrichment applies to logs that Cloud SIEM receives after a table is enabled, so it does not apply to logs received earlier.

## Prerequisites

- Cloud SIEM is enabled for your organization.
- A Datadog [API key][5] and an [application key][6]. The application key must have the Reference Tables Write permission.

## Send indicators

`POST https://api.{{< region-param key="dd_site" >}}/api/v2/security/threat-intel/stix`

<div class="alert alert-info">The endpoint URL varies by site. Use the correct Datadog site for your organization.</div>

### Headers

| Header | Required | Description |
|---|---|---|
| `DD-API-KEY` | Yes | Your Datadog API key. |
| `DD-APPLICATION-KEY` | Yes | An application key with the Reference Tables Write permission. |
| `ti_vendor` | Yes | Identifies the feed; for example, the name of your platform. Use 10 characters or fewer, with only lowercase letters and digits. |
| `Content-Type` | Yes | `application/json` |
| `Content-Encoding` | No | Set to `gzip` to send a compressed body. No other encodings are supported. |

### Request body

The body is a STIX 2.1 `bundle` of STIX objects. Each request is an incremental batch, and a bundle can mix indicators of different types.

```json
{
  "type": "bundle",
  "id": "bundle--0cde353c-ea5b-4668-9f68-9c3a0e2a0a0e",
  "objects": [
    {
      "type": "indicator",
      "spec_version": "2.1",
      "id": "indicator--a932fcc6-e032-476c-826f-cb970a5a1fff",
      "pattern_type": "stix",
      "pattern": "[ipv4-addr:value = '198.51.100.1']",
      "indicator_types": ["malicious-activity"],
      "valid_from": "2026-01-01T00:00:00Z",
      "valid_until": "2026-12-31T00:00:00Z"
    }
  ]
}
```

The endpoint has the following requirements and limits:

- The bundle must be STIX 2.1. If the bundle contains a `spec_version` other than `2.1`, Datadog rejects the request. If an individual object contains a `spec_version` other than `2.1`, Datadog skips that object.
- The maximum request body size is 50 MB.

### Supported indicator types and patterns

Datadog reads the STIX `pattern` on each indicator to determine its type and value. Cloud SIEM ingests IP addresses (both IPv4 and IPv6), domains, and SHA-256 file hashes.

Datadog extracts exact values from `=` and `IN` comparisons. It also accepts `OR` expressions and imports each value as a separate indicator. `AND` between bracketed expressions is not supported.

```json
"pattern": "[ipv4-addr:value = '198.51.100.1'] OR [domain-name:value IN ('example.com', 'example.net')]"
```

Patterns that use negation, ranges, wildcard matching, regular expression matching, subnet relations, existence checks, temporal qualifiers, or `FOLLOWEDBY` are unsupported. If any part of a pattern uses an unsupported expression, Datadog skips the indicator object.

The response counts unsupported objects as `unsupported` and unparseable patterns as `invalid`. Check these counts to confirm how much of your feed ingested.

### How STIX fields map to reference table columns

| Reference table column | Populated from |
|---|---|
| Indicator value | The value extracted from the indicator's `pattern`. |
| `intention` | The `indicator_types` field. `malicious-activity` maps to `malicious`; `benign` maps to `benign`; and any other value, or an absent field, maps to `suspicious`. |
| `source` | The `ti_vendor` header, stored as `{"name": "<TI_VENDOR>"}`. |
| `category` | Set to `custom`. |
| `additional_data` | The STIX fields that have no dedicated column, including `stix_id`, `created`, `modified`, `valid_from`, `confidence`, `labels`, `indicator_types`, `object_marking_refs`, `kill_chain_phases`, and `external_references`. |

The optional `valid_until` field sets an expiration for the indicator, and Datadog removes the indicator after that time. An indicator sent without `valid_until` does not expire automatically.

### Update and revoke indicators

- To update an indicator's details, send the indicator again with the updated fields. Datadog overwrites the existing row for that indicator value.
- To remove an indicator, send it with `"revoked": true`. Datadog deletes the indicator from the reference table.

Sending the same bundle more than once does not create duplicate rows.

### Response

A successful request returns `200 OK` and a summary of how Datadog processed the bundle:

```json
{
  "data": {
    "type": "threat-intel-stix-ingest",
    "id": "acme",
    "attributes": {
      "added": 3,
      "unsupported": 1,
      "invalid": 0
    }
  }
}
```

| Attribute | Description |
|---|---|
| `added` | The number of indicator objects that Datadog ingested. One object can produce more than one indicator when its pattern uses `IN` or `OR`. |
| `unsupported` | The number of indicator objects that Datadog skipped because their type, pattern, or object-level STIX version is not supported. |
| `invalid` | The number of indicator objects whose pattern Datadog could not parse. |

A `200` response means that Datadog accepted the bundle. Unsupported and invalid indicators appear in these counts instead of causing the request to fail. Check the counts to confirm that your feed ingested as expected.

### Example request

```shell
curl -X POST "https://api.{{< region-param key="dd_site" code="true" >}}/api/v2/security/threat-intel/stix" \
  --header "DD-API-KEY: <DATADOG_API_KEY>" \
  --header "DD-APPLICATION-KEY: <DATADOG_APP_KEY>" \
  --header "Content-Type: application/json" \
  --header "ti_vendor: acme" \
  --data '{
    "type": "bundle",
    "id": "bundle--0cde353c-ea5b-4668-9f68-9c3a0e2a0a0e",
    "objects": [
      {
        "type": "indicator",
        "spec_version": "2.1",
        "id": "indicator--a932fcc6-e032-476c-826f-cb970a5a1fff",
        "pattern_type": "stix",
        "pattern": "[ipv4-addr:value = '198.51.100.1']",
        "indicator_types": ["malicious-activity"],
        "valid_from": "2026-01-01T00:00:00Z"
      }
    ]
  }'
```

To send a large feed more efficiently, compress the body and set `Content-Encoding: gzip`.

### Rate limits

The endpoint accepts 10 requests per second for each API key. Requests beyond that limit receive a `429 Too Many Requests` response.

### Error responses

| Status | Reason |
|---|---|
| `400 Bad Request` | The body is not valid JSON, the bundle contains a `spec_version` other than `2.1`, the `ti_vendor` header is missing or invalid, or the `Content-Encoding` is not supported. |
| `401 Unauthorized` | The request does not contain valid credentials. |
| `403 Forbidden` | The application key does not have the Reference Tables Write permission. |
| `413 Request Entity Too Large` | The request body is larger than 50 MB. |
| `429 Too Many Requests` | The request exceeded the rate limit for the API key. |

## Configure the generated reference tables

Manage the tables that ingestion generates on the [Threat Intelligence][7] configuration page. Each table has a toggle that controls whether Cloud SIEM uses it to enrich logs. Use that page to review which feeds are active, to disable a feed temporarily, or to enable a table that ingestion left disabled.

Your enrichment settings take precedence over ingestion. After a table exists, later requests add and update indicators, but never change the enrichment toggle. A table that you disable stays disabled until you enable it again.

STIX ingestion manages the rows in generated reference tables. Manual changes to those rows are not preserved and are overwritten by later ingestion requests. To add, update, or remove indicators, send the changes through the STIX ingestion endpoint.

To inspect the ingested indicators, open the table from [Reference Tables][8], or search for the indicators in the [IOC Explorer][3].

### If you reach the reference table limit

Cloud SIEM enriches logs with up to 10 threat intelligence reference tables at a time. If ingestion generates a table while your organization is already at that limit, Datadog still creates and populates the table. It does not enable the table for enrichment automatically, and the table appears on the [Threat Intelligence][7] page in a disabled state.

To enable such a table, disable a table you no longer need on the [Threat Intelligence][7] page, then enable the new one.

## Stop ingesting a feed

Your requests drive ingestion, so removing a feed requires two steps, in this order:

1. Stop sending bundles for that `ti_vendor`.
2. Delete the reference tables that Datadog generated for the feed from [Reference Tables][8].

Complete the steps in that order. If you delete a table while requests for the same `ti_vendor` are still arriving, the next request generates the table again.

To stop enriching logs without deleting anything, disable the tables on the [Threat Intelligence][7] page instead. This keeps the ingested indicators available for the IOC Explorer and lets you resume enrichment later.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.oasis-open.org/cti/stix/v2.1/os/stix-v2.1-os.html
[2]: /security/cloud_siem/ingest_and_enrich/threat_intelligence/
[3]: /security/cloud_siem/triage_and_investigate/ioc_explorer/
[4]: /reference_tables/
[5]: /account_management/api-app-keys/#api-keys
[6]: /account_management/api-app-keys/#application-keys
[7]: https://app.datadoghq.com/security/configuration/threat-intel
[8]: https://app.datadoghq.com/reference-tables
