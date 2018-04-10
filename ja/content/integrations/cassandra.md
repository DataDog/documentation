---
last_modified: 2015/07/05
translation_status: complete
language: ja
title: Datadog-Cassandra Integration
integration_title: Cassandras
kind: integration
doclevel: complete
git_integration_title: cassandra
---

<!-- For information on Cassandra, please see [here](http://docs.datadoghq.com/integrations/java/).

The following metrics are collected by default with the Cassandra integration:

    cassandra.ActiveCount
    cassandra.BloomFilterDiskSpaceUsed
    cassandra.BloomFilterFalsePositives
    cassandra.BloomFilterFalseRatio
    cassandra.Capacity
    cassandra.CompletedTasks
    cassandra.CompletedTasks
    cassandra.CompressionRatio
    cassandra.CurrentlyBlockedTasks
    cassandra.ExceptionCount
    cassandra.Hits
    cassandra.LiveDiskSpaceUsed
    cassandra.LiveSSTableCount
    cassandra.Load
    cassandra.MaxRowSize
    cassandra.MeanRowSize
    cassandra.MemtableColumnsCount
    cassandra.MemtableDataSize
    cassandra.MemtableSwitchCount
    cassandra.MinRowSize
    cassandra.PendingTasks
    cassandra.ReadCount
    cassandra.RecentHitRate
    cassandra.Requests
    cassandra.Size
    cassandra.TotalBlockedTasks
    cassandra.TotalDiskSpaceUsed
    cassandra.TotalReadLatencyMicros
    cassandra.TotalTimeouts
    cassandra.TotalWriteLatencyMicros
    cassandra.UpdateInterval
    cassandra.WriteCount -->

## 概要

Cassandraに関する情報に関しては、次の[「JMX Checks」](http://docs.datadoghq.com/ja/integrations/java/)を参照してください。

Cassandraインテグレーションがデフォルトで取得しているメトリクス:

    cassandra.ActiveCount
    cassandra.BloomFilterDiskSpaceUsed
    cassandra.BloomFilterFalsePositives
    cassandra.BloomFilterFalseRatio
    cassandra.Capacity
    cassandra.CompletedTasks
    cassandra.CompletedTasks
    cassandra.CompressionRatio
    cassandra.CurrentlyBlockedTasks
    cassandra.ExceptionCount
    cassandra.Hits
    cassandra.LiveDiskSpaceUsed
    cassandra.LiveSSTableCount
    cassandra.Load
    cassandra.MaxRowSize
    cassandra.MeanRowSize
    cassandra.MemtableColumnsCount
    cassandra.MemtableDataSize
    cassandra.MemtableSwitchCount
    cassandra.MinRowSize
    cassandra.PendingTasks
    cassandra.ReadCount
    cassandra.RecentHitRate
    cassandra.Requests
    cassandra.Size
    cassandra.TotalBlockedTasks
    cassandra.TotalDiskSpaceUsed
    cassandra.TotalReadLatencyMicros
    cassandra.TotalTimeouts
    cassandra.TotalWriteLatencyMicros
    cassandra.UpdateInterval
    cassandra.WriteCount
