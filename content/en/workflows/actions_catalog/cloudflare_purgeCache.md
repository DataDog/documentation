---
bundle: com.datadoghq.cloudflare
bundle_title: Cloudflare
description: Granularly remove one or more files from Cloudflare's cache by specifying
  URLs. All tiers can purge by URL, however, FREE can only purge 1000 URLs per minute.
icon:
  integration_id: cloudflare
  type: integration_logo
input: '#/$defs/PurgeCacheInputs'
inputFieldOrder:
- zoneId
- files
output: '#/$defs/PurgeCacheOutputs'
permissions:
- '#cache_purge:edit'
source: cloudflare
title: Purge cache
---

Granularly remove one or more files from Cloudflare's cache by specifying URLs. All tiers can purge by URL, however, FREE can only purge 1000 URLs per minute.

{{< workflows >}}
