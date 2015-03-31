---
last_modified: 2015/03/31
translation_status: original
language: ja
title: Datadog-Riak Integration
sidebar:
  nav:
    - header: Integrations
    - text: Back to Overview
      href: "/ja/integrations/"
---

<div id="int-overview">
<h3>Overview</h3>

Connect Riak to Datadog in order to:
<ul>
<li> Visualize Riak performance and utilization.</li>
<li> Correlate the performance of Riak with the rest of your applications.</li>
</ul>
</div>

From the open-source Agent:

* <a href="https://github.com/DataDog/dd-agent/blob/master/conf.d/riak.yaml.example">
Riak YAML example</a>
* <a href="https://github.com/DataDog/dd-agent/blob/master/checks.d/riak.py">
Riak checks.d</a>

The following metrics are collected by default with the Riak integration:

    riak.memory_atom
    riak.memory_atom_used
    riak.memory_binary
    riak.memory_code
    riak.memory_ets
    riak.memory_processes
    riak.memory_processes_used
    riak.memory_total
    riak.node_get_fsm_objsize
    riak.node_get_fsm_siblings
    riak.node_get_fsm_time
    riak.node_gets
    riak.node_put_fsm_time
    riak.node_puts
    riak.pbc_active
    riak.pbc_connects
    riak.read_repairs
    riak.vnode_gets
    riak.vnode_index_deletes
    riak.vnode_index_reads
    riak.vnode_index_writes
    riak.vnode_puts
