---
title: Troubleshooting
private: true
further_reading:
- link: "/cloudprem/overview/architecture/"
  tag: "Documentation"
  text: "CloudPrem Architecture"
---

If you experience unexpected behavior with CloudPrem, there are a few common issues you can investigate. If you continue to have trouble, reach out to [Datadog support][1] for further assistance.

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
