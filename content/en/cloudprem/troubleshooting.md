---
title: Troubleshooting
further_reading:
- link: "/cloudprem/"
  tag: "Documentation"
  text: "Learn more about CloudPrem"
- link: "/cloudprem/installation/"
  tag: "Documentation"
  text: "Installation"
- link: "/cloudprem/ingress/"
  tag: "Documentation"
  text: "Ingress Configuration"
- link: "/cloudprem/cluster/"
  tag: "Documentation"
  text: "Cluster Sizing and Operations"
- link: "/cloudprem/advanced/"
  tag: "Documentation"
  text: "Advanced Configurations"
---

If you experience unexpected behavior with CloudPrem, there are a few common issues you can investigate. If you continue to have trouble, reach out to [Datadog support][1] for further assistance.

## Access permissions

The most common errors come from access permissions to the object storage or to the metastore. The easiest way to troubleshoot this is to use `kubectl` and verify logs from CloudPrem components: indexer pods, metastore pods, searcher pods.

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

[1]: /getting_started/support/