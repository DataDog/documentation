---
title: Troubleshooting DBM Setup for Amazon DocumentDB
description: Troubleshoot Database Monitoring setup for Amazon DocumentDB
---

This page details common issues with setting up and using Database Monitoring with Amazon DocumentDB, and how to resolve them. Datadog recommends staying on the latest stable Agent version and adhering to the latest [setup documentation][1], as it can change with Agent version releases.

## Amazon DocumentDB known limitations

### Incompatible metrics

The following metrics are not supported for Amazon DocumentDB

| Metric Name                                           |
| ----------------------------------------------------- |
| `mongodb.asserts.msgps`                               |
| `mongodb.asserts.regularps`                           |
| `mongodb.asserts.rolloversps`                         |
| `mongodb.asserts.userps`                              |
| `mongodb.asserts.warningps`                           |
| `mongodb.extra_info.heap_usage_bytesps`               |
| `mongodb.extra_info.page_faultsps`                    |
| `mongodb.globallock.activeclients.readers`            |
| `mongodb.globallock.activeclients.total`              |
| `mongodb.globallock.activeclients.writers`            |
| `mongodb.globallock.currentqueue.readers`             |
| `mongodb.globallock.currentqueue.total`               |
| `mongodb.globallock.currentqueue.writers`             |
| `mongodb.globallock.locktime`                         |
| `mongodb.globallock.ratio`                            |
| `mongodb.globallock.totaltime`                        |
| `mongodb.mem.bits`                                    |
| `mongodb.mem.mapped`                                  |
| `mongodb.mem.mappedwithjournal`                       |
| `mongodb.mem.resident`                                |
| `mongodb.mem.virtual`                                 |
| `mongodb.metrics.repl.apply.batches.numps`            |
| `mongodb.metrics.repl.apply.batches.totalmillisps`    |
| `mongodb.metrics.repl.apply.opsps`                    |
| `mongodb.metrics.repl.buffer.count`                   |
| `mongodb.metrics.repl.buffer.maxsizebytes`            |
| `mongodb.metrics.repl.buffer.sizebytes`               |
| `mongodb.metrics.repl.network.bytesps`                |
| `mongodb.metrics.repl.network.getmores.numps`         |
| `mongodb.metrics.repl.network.getmores.totalmillisps` |
| `mongodb.metrics.repl.network.opsps`                  |
| `mongodb.metrics.repl.network.readerscreatedps`       |
| `mongodb.metrics.repl.preload.docs.numps`             |
| `mongodb.metrics.repl.preload.docs.totalmillisps`     |
| `mongodb.metrics.repl.preload.indexes.numps`          |
| `mongodb.metrics.repl.preload.indexes.totalmillisps`  |
| `mongodb.network.bytesinps`                           |
| `mongodb.network.bytesoutps`                          |
| `mongodb.network.numrequestsps`                       |
| `mongodb.oplatencies.commands.latency`                |
| `mongodb.oplatencies.commands.latency.avg`            |
| `mongodb.oplatencies.commands.latencyps`              |
| `mongodb.oplatencies.reads.latency`                   |
| `mongodb.oplatencies.reads.latency.avg`               |
| `mongodb.oplatencies.reads.latencyps`                 |
| `mongodb.oplatencies.writes.latency`                  |
| `mongodb.oplatencies.writes.latency.avg`              |
| `mongodb.oplatencies.writes.latencyps`                |
| `mongodb.oplog.logsizemb`                             |
| `mongodb.oplog.timediff`                              |
| `mongodb.oplog.usedsizemb`                            |
| `mongodb.replset.optime_lag`                          |
| `mongodb.replset.replicationlag`                      |
| `mongodb.stats.datasize`                              |
| `mongodb.stats.freestoragesize`                       |
| `mongodb.stats.indexfreestoragesize`                  |
| `mongodb.stats.totalfreestoragesize`                  |
| `mongodb.usage.readlock.count`                        |
| `mongodb.usage.readlock.countps`                      |
| `mongodb.usage.readlock.time`                         |
| `mongodb.usage.writelock.count`                       |
| `mongodb.usage.writelock.countps`                     |
| `mongodb.usage.writelock.time`                        |

[1]: /database_monitoring/setup_documentdb/