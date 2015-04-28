---
last_modified: 2015/03/31
translation_status: original
language: ja
title: Datadog-Memcached Integration
---

<div id="int-overview">
<h3>Overview</h3>

Connect Memcached to Datadog in order to:
<ul>
<li> Visualize its performance</li>
<li> Correlate the performance of Memcached with the rest of your applications</li>
</ul>
</div>

From the open-source Agent:

* <a href="https://github.com/DataDog/dd-agent/blob/master/conf.d/mcache.yaml.example">
Memcache YAML example</a>
* <a href="https://github.com/DataDog/dd-agent/blob/master/checks.d/mcache.py">
Memcache checks.d</a>

The following metrics are collected by default with the Memcache integration:

    memcache.bytes
    memcache.bytes_read
    memcache.bytes_written
    memcache.cmd_get
    memcache.cmd_set
    memcache.connection_structures
    memcache.curr_connections
    memcache.curr_items
    memcache.evictions
    memcache.get_hits
    memcache.get_misses
    memcache.limit_maxbytes
    memcache.pointer_size
    memcache.rusage_system
    memcache.rusage_user
    memcache.threads
    memcache.total_connections
    memcache.total_items
