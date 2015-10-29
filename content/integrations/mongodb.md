---
title: Datadog-MongoDB Integration
integration_title: MongoDB
kind: integration
---

<div id="int-overview">
<h3>Overview</h3>

Connect MongoDB to Datadog in order to:
<ul>
<li>Visualize key MongoDB metrics.</li>
<li>Correlate MongoDB performance with the rest of your applications.</li>
</ul>
</div>

From the open-source Agent:

* <a href="https://github.com/DataDog/dd-agent/blob/master/conf.d/mongo.yaml.example">
MongoDB YAML example</a>
* <a href="https://github.com/DataDog/dd-agent/blob/master/checks.d/mongo.py">
Code for the MongoDB check</a>

The user set in <code>mongo.yaml</code> must have the <code>clusterMonitor</code> role.

The following metrics are collected by default with the MongoDB integration:

    mongo.asserts.msg
    mongo.asserts.regular
    mongo.asserts.rollovers
    mongo.asserts.user
    mongo.asserts.warning
    mongo.connections.available
    mongo.connections.current
    mongo.connections.totalCreated
    mongo.cursors.timedOut
    mongo.cursors.totalOpen
    mongo.extra_info.heap_usage_bytes
    mongo.extra_info.page_faults
    mongo.globalLock.activeClients.readers
    mongo.globalLock.activeClients.total
    mongo.globalLock.activeClients.writers
    mongo.globalLock.currentQueue.readers
    mongo.globalLock.currentQueue.total
    mongo.globalLock.currentQueue.writers
    mongo.globalLock.lockTime
    mongo.globalLock.ratio
    mongo.globalLock.totalTime
    mongo.indexCounters.accesses
    mongo.indexCounters.btree.accesses
    mongo.indexCounters.btree.hits
    mongo.indexCounters.btree.missRatio
    mongo.indexCounters.btree.misses
    mongo.indexCounters.hits
    mongo.indexCounters.missRatio
    mongo.indexCounters.misses
    mongo.indexCounters.resets
    mongo.mem.bits
    mongo.mem.mapped
    mongo.mem.mappedWithJournal
    mongo.mem.resident
    mongo.mem.virtual
    mongo.metrics.document.deleted
    mongo.metrics.document.inserted
    mongo.metrics.document.returned
    mongo.metrics.document.updated
    mongo.metrics.getLastError.wtime.num
    mongo.metrics.getLastError.wtime.totalMillis
    mongo.metrics.getLastError.wtimeouts
    mongo.metrics.operation.fastmod
    mongo.metrics.operation.idhack
    mongo.metrics.operation.scanAndOrder
    mongo.metrics.queryExecutor.scanned
    mongo.metrics.record.moves
    mongo.metrics.repl.apply.batches.num
    mongo.metrics.repl.apply.batches.totalMillis
    mongo.metrics.repl.apply.ops
    mongo.metrics.repl.buffer.count
    mongo.metrics.repl.buffer.maxSizeBytes
    mongo.metrics.repl.buffer.sizeBytes
    mongo.metrics.repl.network.bytes
    mongo.metrics.repl.network.getmores.num
    mongo.metrics.repl.network.getmores.totalMillis
    mongo.metrics.repl.network.ops
    mongo.metrics.repl.network.readersCreated
    mongo.metrics.repl.oplog.insert.num
    mongo.metrics.repl.oplog.insert.totalMillis
    mongo.metrics.repl.oplog.insertBytes
    mongo.metrics.repl.preload.indexes.num
    mongo.metrics.repl.preload.indexes.totalMillis
    mongo.metrics.ttl.deletedDocuments
    mongo.metrics.ttl.passes
    mongo.opcounters.command
    mongo.opcounters.delete
    mongo.opcounters.getmore
    mongo.opcounters.insert
    mongo.opcounters.query
    mongo.opcounters.update
    mongo.opcountersRepl.command
    mongo.opcountersRepl.delete
    mongo.opcountersRepl.getmore
    mongo.opcountersRepl.insert
    mongo.opcountersRepl.query
    mongo.opcountersRepl.update
    mongo.replSet.health
    mongo.replSet.replicationLag
    mongo.replSet.state
    mongo.stats.avgObjSize
    mongo.stats.collections
    mongo.stats.dataSize
    mongo.stats.fileSize
    mongo.stats.indexSize
    mongo.stats.indexes
    mongo.stats.nsSizeMB
    mongo.stats.numExtents
    mongo.stats.objects
    mongo.stats.storageSize
    mongo.uptime

Note: many of these metrics are described in the [MongoDB Manual 3.0](https://docs.mongodb.org/manual/reference/command/dbStats/)