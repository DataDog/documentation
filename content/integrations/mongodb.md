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
    mongo.cursors.timedOut
    mongo.cursors.totalOpen
    mongo.globalLock.ratio
    mongo.indexCounters.btree.accesses
    mongo.indexCounters.btree.hits
    mongo.indexCounters.btree.misses
    mongo.indexCounters.btree.missRatio
    mongo.mem.mapped
    mongo.mem.resident
    mongo.mem.virtual
    mongo.opcounters.command
    mongo.opcounters.delete
    mongo.opcounters.getmore
    mongo.opcounters.inserts
    mongo.opcounters.query
    mongo.opcounters.update
    mongo.replSet.health
    mongo.replSet.replicationLag
    mongo.replSet.state
    mongo.stats.dataSize
    mongo.stats.indexes
    mongo.stats.indexSize
    mongo.stats.objects
    mongo.stats.storageSize
    mongo.uptime
