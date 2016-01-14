---
title: Datadog-TokuMX Integration
integration_title: TokuMX
kind: integration
---

### Overview

Capture TokuMX metrics in Datadog to:

* Visualize key TokuMX metrics.
* Correlate TokuMX performance with the rest of your applications.

### Installation

1.  Install the Python MongoDB module on your MongoDB server using the following command:

        sudo pip install --upgrade "pymongo<3.0"
    {:.language-shell}

2.  You can verify that the module is installed using this command:

        python -c "import pymongo" 2>&1 | grep ImportError && \
        echo -e "\033[0;31mpymongo python module - Missing\033[0m" || \
        echo -e "\033[0;32mpymongo python module - OK\033[0m"
    {:.language-shell}

3.  Start the mongo shell.
4.  Create a read-only admin user for datadog using the following command. Make sure you replace ```<UNIQUEPASSWORD>``` with a unique password for the user. Datadog needs admin rights to collect complete server statistics.

        use admin
        db.auth("admin", "admin-password")
        db.addUser("datadog", "<UNIQUEPASSWORD>", true)

5.  Verify that you created the user with the following command (not in the mongo shell).

        python -c 'from pymongo import Connection; print Connection().admin.authenticate("datadog", "<UNIQUEPASSWORD>")' | \
        grep True && \
        echo -e "\033[0;32mdatadog user - OK\033[0m" || \
        echo -e "\033[0;31mdatadog user - Missing\033[0m"

For more details about creating and managing users in MongoDB, refer to [the MongoDB documentation](http://www.mongodb.org/display/DOCS/Security+and+Authentication).

### Configuration

Configure the Agent to connect to your TokuMX instance using your new Datadog user.

1.  Edit the tokumx.yaml file in your Agent's conf.d directory:

        init_config:

        instances:
              -   server: mongodb://datadog:<UNIQUEPASSWORD>@localhost:27017
                  tags:
                      - mytag1
                      - mytag2
              -   server: mongodb://datadog:<UNIQUEPASSWORD>@localhost:27017
                  tags:
                      - mytag1
                      - mytag2
    {:.language-yaml}

2.  Restart the Agent.

### Validation

1.  To validate that your integration is working run the Agent's info command. You should see output similar to the following:


        Checks
        ======

          [...]

          tokumx
          ------
              - instance #0 [OK]
              - Collected 8 metrics & 0 events


### Metrics

| TokuMX Metrics |
|-------------------|
| tokumx.asserts.msgps |
| tokumx.asserts.regularps |
| tokumx.asserts.rolloversps |
| tokumx.asserts.userps |
| tokumx.asserts.warningps |
| tokumx.connections.available |
| tokumx.connections.current |
| tokumx.cursors.timedOut |
| tokumx.cursors.totalOpen |
| tokumx.ft.alerts.checkpointFailures |
| tokumx.ft.alerts.locktreeRequestsPending |
| tokumx.ft.alerts.longWaitEvents.cachePressure.countps |
| tokumx.ft.alerts.longWaitEvents.cachePressure.timeps |
| tokumx.ft.alerts.longWaitEvents.checkpointBegin.countps |
| tokumx.ft.alerts.longWaitEvents.checkpointBegin.timeps |
| tokumx.ft.alerts.longWaitEvents.fsync.countps |
| tokumx.ft.alerts.longWaitEvents.fsync.timeps |
| tokumx.ft.alerts.longWaitEvents.locktreeWait.countps |
| tokumx.ft.alerts.longWaitEvents.locktreeWait.timeps |
| tokumx.ft.alerts.longWaitEvents.locktreeWaitEscalation.countps |
| tokumx.ft.alerts.longWaitEvents.locktreeWaitEscalation.timeps |
| tokumx.ft.alerts.longWaitEvents.logBufferWaitps |
| tokumx.ft.cachetable.evictions.full.leaf.clean.bytesps |
| tokumx.ft.cachetable.evictions.full.leaf.clean.countps |
| tokumx.ft.cachetable.evictions.full.leaf.dirty.bytesps |
| tokumx.ft.cachetable.evictions.full.leaf.dirty.countps |
| tokumx.ft.cachetable.evictions.full.leaf.dirty.timeps |
| tokumx.ft.cachetable.evictions.full.nonleaf.clean.bytesps |
| tokumx.ft.cachetable.evictions.full.nonleaf.clean.countps |
| tokumx.ft.cachetable.evictions.full.nonleaf.dirty.bytesps |
| tokumx.ft.cachetable.evictions.full.nonleaf.dirty.countps |
| tokumx.ft.cachetable.evictions.full.nonleaf.dirty.timeps |
| tokumx.ft.cachetable.evictions.partial.leaf.clean.bytesps |
| tokumx.ft.cachetable.evictions.partial.leaf.clean.countps |
| tokumx.ft.cachetable.evictions.partial.nonleaf.clean.bytesps |
| tokumx.ft.cachetable.evictions.partial.nonleaf.clean.countps |
| tokumx.ft.cachetable.miss.countps |
| tokumx.ft.cachetable.miss.full.countps |
| tokumx.ft.cachetable.miss.full.timeps |
| tokumx.ft.cachetable.miss.partial.countps |
| tokumx.ft.cachetable.miss.partial.timeps |
| tokumx.ft.cachetable.miss.timeps |
| tokumx.ft.cachetable.size.current |
| tokumx.ft.cachetable.size.limit |
| tokumx.ft.cachetable.size.writing |
| tokumx.ft.checkpoint.begin.timeps |
| tokumx.ft.checkpoint.countps |
| tokumx.ft.checkpoint.lastComplete.time |
| tokumx.ft.checkpoint.timeps |
| tokumx.ft.checkpoint.write.leaf.bytes.compressedps |
| tokumx.ft.checkpoint.write.leaf.bytes.uncompressedps |
| tokumx.ft.checkpoint.write.leaf.countps |
| tokumx.ft.checkpoint.write.leaf.timeps |
| tokumx.ft.checkpoint.write.nonleaf.bytes.compressedps |
| tokumx.ft.checkpoint.write.nonleaf.bytes.uncompressedps |
| tokumx.ft.checkpoint.write.nonleaf.countps |
| tokumx.ft.checkpoint.write.nonleaf.timeps |
| tokumx.ft.compressionRatio.leaf |
| tokumx.ft.compressionRatio.nonleaf |
| tokumx.ft.compressionRatio.overall |
| tokumx.ft.fsync.countps |
| tokumx.ft.fsync.timeps |
| tokumx.ft.locktree.size.current |
| tokumx.ft.locktree.size.limit |
| tokumx.ft.log.bytesps |
| tokumx.ft.log.countps |
| tokumx.ft.log.timeps |
| tokumx.ft.serializeTime.leaf.compressps |
| tokumx.ft.serializeTime.leaf.decompressps |
| tokumx.ft.serializeTime.leaf.deserializeps |
| tokumx.ft.serializeTime.leaf.serializeps |
| tokumx.ft.serializeTime.nonleaf.compressps |
| tokumx.ft.serializeTime.nonleaf.decompressps |
| tokumx.ft.serializeTime.nonleaf.deserializeps |
| tokumx.ft.serializeTime.nonleaf.serializeps |
| tokumx.mem.resident |
| tokumx.mem.virtual |
| tokumx.metrics.document.deletedps |
| tokumx.metrics.document.insertedps |
| tokumx.metrics.document.returnedps |
| tokumx.metrics.document.updatedps |
| tokumx.metrics.getLastError.wtime.numps |
| tokumx.metrics.getLastError.wtime.totalMillisps |
| tokumx.metrics.getLastError.wtimeoutsps |
| tokumx.metrics.operation.idhackps |
| tokumx.metrics.operation.scanAndOrderps |
| tokumx.metrics.queryExecutor.scannedps |
| tokumx.metrics.repl.apply.batches.numps |
| tokumx.metrics.repl.apply.batches.totalMillisps |
| tokumx.metrics.repl.apply.opsps |
| tokumx.metrics.repl.buffer.count |
| tokumx.metrics.repl.buffer.sizeBytes |
| tokumx.metrics.repl.network.bytesps |
| tokumx.metrics.repl.network.getmores.numps |
| tokumx.metrics.repl.network.getmores.totalMillisps |
| tokumx.metrics.repl.network.opsps |
| tokumx.metrics.repl.network.readersCreatedps |
| tokumx.metrics.repl.oplog.insert.numps |
| tokumx.metrics.repl.oplog.insert.totalMillisps |
| tokumx.metrics.repl.oplog.insertBytesps |
| tokumx.metrics.ttl.deletedDocumentsps |
| tokumx.metrics.ttl.passesps |
| tokumx.opcounters.commandps |
| tokumx.opcounters.deleteps |
| tokumx.opcounters.getmoreps |
| tokumx.opcounters.insertps |
| tokumx.opcounters.queryps |
| tokumx.opcounters.updateps |
| tokumx.opcountersRepl.commandps |
| tokumx.opcountersRepl.deleteps |
| tokumx.opcountersRepl.getmoreps |
| tokumx.opcountersRepl.insertps |
| tokumx.opcountersRepl.queryps |
| tokumx.opcountersRepl.updateps |
| tokumx.stats.coll.count.95percentile |
| tokumx.stats.coll.count.avg |
| tokumx.stats.coll.count.count |
| tokumx.stats.coll.count.max |
| tokumx.stats.coll.count.median |
| tokumx.stats.coll.nindexes.95percentile |
| tokumx.stats.coll.nindexes.avg |
| tokumx.stats.coll.nindexes.count |
| tokumx.stats.coll.nindexes.max |
| tokumx.stats.coll.nindexes.median |
| tokumx.stats.coll.nindexesbeingbuilt.95percentile |
| tokumx.stats.coll.nindexesbeingbuilt.avg |
| tokumx.stats.coll.nindexesbeingbuilt.count |
| tokumx.stats.coll.nindexesbeingbuilt.max |
| tokumx.stats.coll.nindexesbeingbuilt.median |
| tokumx.stats.coll.size.95percentile |
| tokumx.stats.coll.size.avg |
| tokumx.stats.coll.size.count |
| tokumx.stats.coll.size.max |
| tokumx.stats.coll.size.median |
| tokumx.stats.coll.storageSize.95percentile |
| tokumx.stats.coll.storageSize.avg |
| tokumx.stats.coll.storageSize.count |
| tokumx.stats.coll.storageSize.max |
| tokumx.stats.coll.storageSize.median |
| tokumx.stats.coll.totalIndexSize.95percentile |
| tokumx.stats.coll.totalIndexSize.avg |
| tokumx.stats.coll.totalIndexSize.count |
| tokumx.stats.coll.totalIndexSize.max |
| tokumx.stats.coll.totalIndexSize.median |
| tokumx.stats.coll.totalIndexStorageSize.95percentile |
| tokumx.stats.coll.totalIndexStorageSize.avg |
| tokumx.stats.coll.totalIndexStorageSize.count |
| tokumx.stats.coll.totalIndexStorageSize.max |
| tokumx.stats.coll.totalIndexStorageSize.median |
| tokumx.stats.dataSize |
| tokumx.stats.db.avgObjSize |
| tokumx.stats.db.collections |
| tokumx.stats.db.dataSize |
| tokumx.stats.db.indexes |
| tokumx.stats.db.indexSize |
| tokumx.stats.db.indexStorageSize |
| tokumx.stats.db.objects |
| tokumx.stats.db.storageSize |
| tokumx.stats.idx.avgObjSize.95percentile |
| tokumx.stats.idx.avgObjSize.avg |
| tokumx.stats.idx.avgObjSize.count |
| tokumx.stats.idx.avgObjSize.max |
| tokumx.stats.idx.avgObjSize.median |
| tokumx.stats.idx.count.95percentile |
| tokumx.stats.idx.count.avg |
| tokumx.stats.idx.count.count |
| tokumx.stats.idx.count.max |
| tokumx.stats.idx.count.median |
| tokumx.stats.idx.size.95percentile |
| tokumx.stats.idx.size.avg |
| tokumx.stats.idx.size.count |
| tokumx.stats.idx.size.max |
| tokumx.stats.idx.size.median |
| tokumx.stats.idx.storageSize.95percentile |
| tokumx.stats.idx.storageSize.avg |
| tokumx.stats.idx.storageSize.count |
| tokumx.stats.idx.storageSize.max |
| tokumx.stats.idx.storageSize.median |
| tokumx.stats.indexes |
| tokumx.stats.indexSize |
| tokumx.stats.objects |
| tokumx.stats.storageSize |
| tokumx.statsd.idx.queries.95percentile |
| tokumx.statsd.idx.queries.avg |
| tokumx.statsd.idx.queries.count |
| tokumx.statsd.idx.queries.max |
| tokumx.statsd.idx.queries.median |
| tokumx.uptime |
{:.table}
