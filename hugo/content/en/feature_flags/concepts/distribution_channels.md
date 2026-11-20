---
title: Distribution Channels
description: Control which SDKs receive your feature flag configuration with distribution channels.
further_reading:
- link: "/feature_flags/concepts/variants_and_flag_types"
  tag: "Documentation"
  text: "Variants and Flag Types"
- link: "/feature_flags/client/"
  tag: "Documentation"
  text: "Client-Side SDKs"
- link: "/feature_flags/server/"
  tag: "Documentation"
  text: "Server-Side SDKs"
---

## Overview

Distribution channels control which SDKs receive your flag configuration. When you create or edit a flag, you can set distribution channels to **Client**, **Server**, or both.

## Why use distribution channels

Use distribution channels to protect sensitive configuration and reduce payload size.

### Protect sensitive configuration

Client-side SDKs fetch flag configuration over the network. Flag keys and variant values sent to client SDKs can be visible in API requests. Restrict server-only flags to the **Server** distribution channel to avoid exposing sensitive flag keys or variant values to client SDKs.

### Reduce payload size

If you work with a large number of feature flags, limiting which flags each SDK type receives can reduce the size of the configuration payload. This can improve performance for client and server SDK initialization.

## Configure distribution channels

When you [create a feature flag][1], select which distribution channels should receive the flag:

- **Client**: Client-side SDKs only (browser and mobile)
- **Server**: Server-side SDKs only
- **Both**: All SDK types

You can also update distribution channels on an existing flag from the **Manage Implementation & Variants** section of the flag details page.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/feature-flags/create
