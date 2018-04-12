---
description: Integration with Neo4j Enterprise to monitor server performance.
doclevel: basic
integration_title: Neo4j
kind: integration
placeholder: true
title: Datadog-Neo4j Integration
---

<div class='alert alert-info'><strong>NOTICE:</strong>アクセスいただきありがとうございます。こちらのページは現在英語のみのご用意となっております。引き続き日本語化の範囲を広げてまいりますので、皆様のご理解のほどよろしくお願いいたします。</div>

## Overview

Get metrics from neo4j service in real time to:

* Visualize and monitor neo4j states
* Be notified about neo4j failovers and events.

## Installation

Install the `dd-check-neo4j` package manually or with your favorite configuration manager

## Configuration

Edit the `neo4j.yaml` file to configure the servers to monitor:

* neo4j_url: set to the url of the server (i.e http://ec2-54-85-23-10.compute-1.amazonaws.com)
* port: set to the http port used by neo4j. Default is 7474
* username: set to a valid neo4j username
* password: set to the password for the username
* connect_timeout: setting for the length of time to attempt to connect to the neo4j server
* server_name: set to what should be displayed in DataDog
* version: set to the neo4j version

## Validation

When you run `datadog-agent info` you should see something like the following:

    Checks
    ======

        neo4j
        -----------
          - instance #0 [OK]
          - Collected 39 metrics, 0 events & 0 service checks

## Compatibility

The neo4j check is compatible with all major platforms

## Data Collected
### Metrics
||||
|:---|:---|:---|
|**Metric name** | **Metric type** | **Description**|
|neo4j.arraystore.size | gauge | The size of the array store|
|neo4j.bytes.read|gauge|The total number of bytes read|
|neo4j.bytes.written|gauge|The total number of bytes written|
|neo4j.dbms.memory.pagecache.size|gauge|Memory Pagecache Size|
|neo4j.page.cache.evictionexceptions|gauge|The total number of eviction exceptions|
|neo4j.page.cache.evictions|gauge|The total number of page evictions executed by the page cache.|
|neo4j.page.cache.faults|gauge|The total number of faults.|
|neo4j.page.cache.filemappings|gauge|The total number of file mappings.|
|neo4j.page.cache.fileunmappings|gauge|The total number of file unmappings.|
|neo4j.page.cache.flushes|gauge|The total number of flushes executed by the page cache.|
|neo4j.ha.pull_interval|gauge|The HA Pull Time Interval|
|neo4j.kernel.starttime|gauge|second|Time when the kernel started|
|neo4j.kernel.version|gauge|The kernel version|
|neo4j.last.committed.transaction.id|gauge|The last committed transaction id.|
|neo4j.locks|gauge|The total number of locks.|
|neo4j.logicallog.size|gauge|The logical log size setting.|
|neo4j.memorypools|gauge|The size of memory pools.|
|neo4j.node.store.size|gauge|The size of the node store.|
|neo4j.averteddeadlocks|gauge|The total number of averted deadlocks.|
|neo4j.committedtransactions|gauge|The total number of committed transactions.|
|neo4j.nodeidsinuse|gauge|The total number of node ids in use.|
|neo4j.opened.transactions|gauge|The total number of opened transactions.|
|neo4j.open.transactions|gauge|The total number of open transactions.|
|neo4j.property.ids.inuse|gauge|The total number of property ids in use.|
|neo4j.relationship.ids.inuse|gauge|The total number of relationship ids in use.|
|neo4j.relationshiptype.ids.inuse|gauge|The total number of relationship type ides in use.|
|neo4j.peak.rolledback.transactions|gauge|The total number of rolled back transactions.|
|neo4j.peak.concurrenttransactions|gauge|The peak number of concurrent transactions.|
|neo4j.pins|gauge|The total number of page pins executed by the page cache.|
|neo4j.property.store.size|gauge|The poperty store size.|
|neo4j.relationship.store.size|gauge|The relationship store size.|
|neo4j.store.creationdate|gauge|The store creation date.|
|neo4j.storeid|gauge|The store id.|
|neo4j.store.log.version|gauge|The store log version.|
|neo4j.string.store.size|gauge|The string store size.|
|neo4j.total.store.size|gauge|The total store size.|

### Events
The neo4j check does not include any events at this time.

### Service Checks
The neo4j check does not include any service checks at this time.

## Troubleshooting
Need help? Contact [Datadog Support](http://docs.datadoghq.com/help/).

## Further Reading
Learn more about infrastructure monitoring and all our integrations on [our blog](https://www.datadoghq.com/blog/)
