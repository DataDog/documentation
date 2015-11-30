---
title: Datadog-Riak Integration
integration_title: Riak

kind: integration
---

### Overview

Connect Riak to Datadog in order to:

  * Visualize Riak performance and utilization.
  * Correlate the performance of Riak with the rest of your applications.

From the open-source Agent:
* [ Riak YAML example][1]
* [ Riak checks.d][2]

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




[1]: https://github.com/DataDog/dd-agent/blob/master/conf.d/riak.yaml.example
[2]: https://github.com/DataDog/dd-agent/blob/master/checks.d/riak.py
