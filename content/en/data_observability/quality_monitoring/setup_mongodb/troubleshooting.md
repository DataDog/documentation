---
title: Troubleshoot Database Monitoring setup for MongoDB
description: Troubleshoot Database Monitoring setup
aliases:
- /database_monitoring/setup_mongodb/troubleshooting/
---

This page explains how to resolve common issues with setting up and using Database Monitoring with MongoDB. Datadog recommends staying on the latest stable Agent version and adhering to the latest [setup documentation][1], as it can change with Agent version releases.

## Diagnosing common problems

### Cluster name with uppercase characters or spaces

MongoDB `cluster_name` should follow [Datadog tag naming conventions][2].
If your MongoDB `cluster_name` contains uppercase characters or spaces, the Agent normalizes the cluster name to lowercase and replaces spaces with underscores. For example, if your cluster name is `My Cluster`, the Agent normalizes it to `my_cluster`.
To avoid inconsistencies and unexpected behavior, ensure that your `cluster_name` follows Datadog tag naming conventions.

### ServerSelectionTimeoutError when connecting to MongoDB Atlas cluster

If you are using MongoDB Atlas, you might encounter a `ServerSelectionTimeoutError` when connecting to the cluster. This error occurs when the Agent is unable to connect to the MongoDB Atlas cluster due to a network issue or TLS misconfiguration. To resolve this issue, ensure that `tls` is set to `true` in the integration configuration file. If you are still encountering issues, check the MongoDB Atlas cluster's network access configuration to ensure that the Agent's IP address is allowed to connect to the cluster.

[1]: /database_monitoring/setup_mongodb/
[2]: /developers/guide/what-best-practices-are-recommended-for-naming-metrics-and-tags/#rules-and-best-practices-for-naming-tags
