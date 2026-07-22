---
title: Ingest Threat Intelligence with STIX
disable_toc: false
further_reading:
- link: "/security/cloud_siem/ingest_and_enrich/threat_intelligence/"
  tag: "Documentation"
  text: "Bring Your Own Threat Intelligence for Cloud SIEM"
- link: "/security/threat_intelligence/"
  tag: "Documentation"
  text: "Threat Intelligence"
- link: "/security/cloud_siem/triage_and_investigate/ioc_explorer/"
  tag: "Documentation"
  text: "Investigate indicators with the IOC Explorer"
---

<div class="alert alert-warning">STIX ingestion is in Preview.</div>

## Overview

The STIX ingestion endpoint lets you push your own threat intelligence to Cloud SIEM programmatically from any Threat Intelligence Platform (TIP) or script that emits [STIX 2.1][1]. You send a STIX 2.1 bundle of `indicator` objects, and Datadog normalizes them into [reference tables][2] that Cloud SIEM uses to [enrich logs][3] and that appear in the [IOC Explorer][4].

This complements the CSV and cloud-storage [Bring Your Own Threat Intelligence][3] workflow. Use STIX ingestion when your platform already emits STIX, or when you want to push incremental feed updates automatically instead of uploading files.

## Prerequisites

- Cloud SIEM is enabled for your organization.
- A Datadog [API key][5] and an [application key][6]. The application key must have the **Reference Tables Write** permission.

## Send a STIX bundle

Send indicators by POSTing a STIX 2.1 bundle to the ingestion endpoint:

`POST {{< region-param key="dd_api" >}}/api/v2/security/threat-intel/stix`

<div class="alert alert-info">The endpoint URL varies by region. Ensure you're using the correct Datadog site for your organization.</div>

### Headers

| Header | Required | Description |
|---|---|---|
| `DD-API-KEY` | Yes | Your Datadog API key. |
| `DD-APPLICATION-KEY` | Yes | An application key with the **Reference Tables Write** permission. |
| `ti_vendor` | Yes | Names the source of the feed (for example, your TIP or team). The value is lowercased, non-alphanumeric characters are replaced with underscores, and it is limited to 64 characters. The normalized value names the generated reference tables and is stored as the indicator source. |
| `Content-Type` | Yes | `application/json`. |
| `Content-Encoding` | No | Set to `gzip` to send a gzip-compressed body. No other encodings are supported. |

### Request body

The body is a STIX 2.1 `bundle` containing one or more `indicator` objects. Each request is one incremental batch, and a single bundle can mix indicators of different types.

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

Requirements and limits:

- Only `indicator` objects are processed. Other STIX objects (such as `identity`, `malware`, `observed-data`, and `relationship`) are ignored.
- The bundle must be STIX 2.1. If the bundle's `spec_version` is present and is not `2.1`, the request is rejected. An individual object whose `spec_version` is not `2.1` is skipped.
- The maximum request body size is 50 MB.

### Supported indicators and patterns

Datadog extracts the indicator type and value from each indicator's STIX `pattern`. The following observable types are supported:

| STIX pattern | Ingested as |
|---|---|
| `[ipv4-addr:value = '...']`, `[ipv6-addr:value = '...']` | IP address |
| `[network-traffic:src_ref.value = '...']`, `[network-traffic:dst_ref.value = '...']` | IP address |
| `[domain-name:value = '...']` | Domain |
| `[file:hashes.'SHA-256' = '...']` | SHA-256 file hash |

Supported pattern operators are `=`, `IN` (which fans out to one indicator per value), and `OR`.

The following are accepted but skipped, and reported in the `unsupported` count: URLs (`url:value`), email addresses (`email-addr:value`), MD5 and SHA-1 file hashes, and patterns that use other operators or constructs (for example `!=`, `<`, `>`, `LIKE`, `MATCHES`, or `AND` across observations). Indicators whose pattern cannot be parsed are reported in the `invalid` count.

### How STIX fields are mapped

| Field in Datadog | Source |
|---|---|
| Indicator value | Extracted from the indicator's `pattern`. |
| `intention` | Derived from `indicator_types`: `malicious-activity` maps to *malicious*, `benign` maps to *benign*, and anything else (or an absent value) maps to *suspicious*. |
| `source` | The `ti_vendor` header, stored as `{"name": "<ti_vendor>"}`. |
| `category` | Set to `custom`. |
| Expiration | Set from `valid_until` when present. Without `valid_until`, the indicator does not expire automatically; it persists until it is revoked or removed. |
| `additional_data` | A catch-all for STIX fields that are not mapped to a dedicated column, including `stix_id`, `created`, `modified`, `valid_from`, `confidence`, `labels`, `indicator_types`, `object_marking_refs`, `kill_chain_phases`, and `external_references`. |

### Update and revoke indicators

- Re-sending an indicator with the same STIX `id` updates the stored indicator only if the incoming object's `modified` timestamp is newer. This makes ingestion idempotent and order-independent, so the latest version always wins.
- An indicator sent with `"revoked": true` is deleted.

### Response

A successful request returns `200 OK` with a summary of how the bundle was processed:

```json
{
  "data": {
    "type": "threat-intel-stix-ingest",
    "id": "my_tip",
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
| `added` | Indicator objects that were ingested. A single object can produce more than one indicator when its pattern uses `IN` or `OR`. |
| `unsupported` | Indicator objects that were skipped because their type, pattern, or object-level version is not supported. |
| `invalid` | Indicator objects whose pattern could not be parsed. |

A `200` response means the bundle was accepted. Indicators that are unsupported or invalid are reported in the counts rather than failing the request.

### Example

```shell
curl -X POST "https://api.{{< region-param key="dd_site" code="true" >}}/api/v2/security/threat-intel/stix" \
  -H "DD-API-KEY: <YOUR_API_KEY>" \
  -H "DD-APPLICATION-KEY: <YOUR_APPLICATION_KEY>" \
  -H "Content-Type: application/json" \
  -H "ti_vendor: my_tip" \
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

To send a large bundle more efficiently, gzip the body and set `Content-Encoding: gzip`.

### Rate limits

The endpoint is rate limited to 10 requests per second per API key. Requests over the limit receive a `429 Too Many Requests` response.

### Error responses

| Status | Reason |
|---|---|
| `400 Bad Request` | The body is not valid JSON, the bundle's `spec_version` is not `2.1`, the `ti_vendor` header is missing, or the `Content-Encoding` is not supported. |
| `401 Unauthorized` | The request is missing valid authentication. |
| `403 Forbidden` | The application key does not have the **Reference Tables Write** permission. |
| `413 Request Entity Too Large` | The request body is larger than 50 MB. |
| `429 Too Many Requests` | The per-API-key rate limit was exceeded. |

## After ingestion

Ingested indicators are written to per-type reference tables named `threat_intel_stix_<ti_vendor>_<type>`. Within a few minutes, Datadog materializes each reference table and, the first time it sees a new `ti_vendor`, registers the tables for Cloud SIEM log enrichment.

From then on, you own the feed: you can enable or disable each table on the [Threat Intelligence configuration page][7], and subsequent ingestion requests do not override that choice. Enabled indicators enrich matching Cloud SIEM logs and are searchable in the [IOC Explorer][4].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.oasis-open.org/cti/stix/v2.1/os/stix-v2.1-os.html
[2]: /integrations/guide/reference-tables/
[3]: /security/cloud_siem/ingest_and_enrich/threat_intelligence/
[4]: /security/cloud_siem/triage_and_investigate/ioc_explorer/
[5]: https://app.datadoghq.com/organization-settings/api-keys
[6]: https://app.datadoghq.com/organization-settings/application-keys
[7]: https://app.datadoghq.com/security/configuration/threat-intel
