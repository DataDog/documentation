---
title: Getting Started with CloudPrem
description: Learn about CloudPrem architecture, components, and prerequisites before deployment
private: true
---

<div class="alert alert-warning">CloudPrem is in Preview.</div>

## Overview

This section provides foundational knowledge to help you understand how CloudPrem works.

## Key concepts

### Data residency and security
CloudPrem keeps your log data within your infrastructure boundaries while providing integration with the Datadog platform for analysis and visualization.

### Decoupled architecture
CloudPrem separates compute (indexing and searching) from storage, enabling simplified management and independent scaling of indexers and searchers.

### Highly cost efficient
CloudPrem is optimized for logs and has a very low infrastructure costs per TB, around $10 per TB using AWS on-demand price. CloudPrem can significantly reduce your self-hosted log management costs, especially for high-volume environments.

## Next steps

{{< whatsnext >}}
   {{< nextlink href="/cloudprem/architecture/" >}}Architecture{{< /nextlink >}}
   {{< nextlink href="/cloudprem/install/prerequisites/" >}}Prerequisites{{< /nextlink >}}
{{< /whatsnext >}}
