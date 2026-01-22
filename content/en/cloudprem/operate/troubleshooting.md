---
title: Troubleshooting
aliases:
- /cloudprem/troubleshooting/
further_reading:
- link: "/cloudprem/architecture/"
  tag: "Documentation"
  text: "CloudPrem Architecture"
---

{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="CloudPrem is in Preview" >}}
  Join the CloudPrem Preview to access new self-hosted log management features.
{{< /callout >}}

## Overview

This page provides troubleshooting guidance for common issues you may encounter when deploying or operating Datadog CloudPrem. It includes typical error messages, diagnostic steps, and tips for resolving problems related to access permissions, storage configuration, and component health. Use this guide to quickly diagnose issues or to gather context before reaching out to [Datadog support][1].


## Access permissions

The most common errors come from access permissions to the object storage or to the metastore. The easiest way to troubleshoot this is to use `kubectl` and verify logs from CloudPrem components: indexer pods, metastore pods, and searcher pods.

## Storage errors

If you set the wrong AWS credentials, you will see this error message with `Unauthorized` in the logs of your indexers:

```
Command failed: Another error occurred. `Metastore error`. Cause: `StorageError(kind=Unauthorized, source=failed to fetch object: s3://my-bucket/datadog-index/some-id.split)`
```

If you put the wrong region, you will see this error:

```
Command failed: Another error occurred. `Metastore error`. Cause: `StorageError(kind=Internal, source=failed to fetch object: s3://my-bucket/datadog-index/some-id.split)`
```

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /help/
