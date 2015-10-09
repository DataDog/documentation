---
title: Datadog-Consul Integration
integration_title: Consul
kind: integration
---

### Overview

Connect Consul to Datadog in order to:  
<ul>
	<li> Correlate the performance of Consul with the rest of your applications</li>  
	<li> Monitor the health of your Consul cluster</li>  
</ul>

From the open-source Agent:  

* <a href="https://github.com/DataDog/dd-agent/blob/master/conf.d/consul.yaml.example">Consul YAML Example</a>
* <a href="https://github.com/DataDog/dd-agent/blob/master/checks.d/consul.py">Consul checks.d</a>
 
The following metrics are collected by default with the Consul integration:
	
	consul.peers
	consul.catalog.nodes_up
	consul.consul.rpc.query
	consul.raft.apply
	consul.raft.barrier
	consul.raft.commitTime.avg
	consul.raft.commitTime.count
	consul.raft.commitTime.max
	consul.raft.commitTime.median
	consul.raft.compactLogs.avg
	consul.raft.compactLogs.count
	consul.raft.compactLogs.max
	consul.raft.compactLogs.median
	consul.raft.leader.dispatchLog.avg
	consul.raft.leader.dispatchLog.count
	consul.raft.leader.dispatchLog.max
	consul.raft.leader.dispatchLog.95percentile
	consul.raft.lastContact.avg
	consul.raft.lastContact.count
	consul.raft.lastContact.max
	consul.raft.lastContact.median
	consul.raft.lastContact.95percentile
	consul.raft.rpc.appendEntries.avg
	consul.raft.rpc.appendEntries.count
	consul.raft.rpc.appendEntries.max
	consul.raft.rpc.appendEntries.median
	consul.raft.rpc.appendEntries.95percentile
	consul.raft.rpc.processHeartbeat.avg
	consul.raft.rpc.processHeartbeat.count
	consul.raft.rpc.processHeartbeat.max
	consul.raft.rpc.processHeartbeat.median
	consul.raft.rpc.processHeartbeat.95percentile
	consul.raft.verify_leader
	consul.serf.events
	consul.serf.member.join
	consul.serf.member.left
	consul.catalog.services_up
	consul.consul.acl.cache_miss
	consul.consul.acl.fault.avg
	consul.consul.acl.fault.count
	consul.consul.acl.fault.max
	consul.consul.acl.fault.median
	consul.consul.acl.resolveToken.avg
	consul.consul.acl.resolveToken.max
	consul.consul.catalog.register.avg
	consul.consul.catalog.register.max
	consul.consul.fsm.deregister.avg
	consul.consul.fsm.deregister.count
	consul.consul.fsm.deregister.max
	consul.consul.fsm.deregister.median
	consul.consul.fsm.kvs.set.avg
	consul.consul.fsm.kvs.set.count
	consul.consul.fsm.kvs.set.max
	consul.consul.fsm.kvs.set.median
	consul.consul.fsm.persist.avg
	consul.consul.fsm.persist.count
	consul.consul.fsm.persist.max
	consul.consul.fsm.persist.median
	consul.consul.fsm.register.count
	consul.consul.fsm.register.max
	consul.consul.fsm.register.median
	consul.consul.kvs.apply.avg
	consul.consul.kvs.apply.count
	consul.consul.kvs.apply.max
	consul.consul.kvs.apply.median
	consul.consul.leader.barrier.avg
	consul.consul.leader.barrier.count
	consul.consul.leader.barrier.max
	consul.consul.leader.barrier.median
	consul.consul.leader.reapTombstones.avg
	consul.consul.leader.reapTombstones.count
	consul.consul.leader.reapTombstones.max
	consul.consul.leader.reapTombstones.median
	consul.consul.leader.reapTombstones.95percentile
	consul.consul.leader.reconcile.avg
	consul.consul.leader.reconcile.count
	consul.consul.leader.reconcile.max
	consul.consul.leader.reconcile.median
	consul.consul.leader.reconcile.95percentile
	consul.consul.leader.reconcileMember.avg
	consul.consul.leader.reconcileMember.count
	consul.consul.leader.reconcileMember.max
	consul.consul.leader.reconcileMember.median
	consul.consul.leader.reconcileMember.95percentile
	consul.consul.rpc.accept_conn
	consul.consul.rpc.raft_handoff
	consul.consul.rpc.request
	consul.consul.session.apply.avg
	consul.consul.session.apply.count
	consul.consul.session.apply.max
	consul.consul.session.apply.median
	consul.consul.session.renew.avg
	consul.consul.session.renew.count
	consul.consul.session.renew.max
	consul.consul.session.renew.median
	consul.serf.queue.Event.avg
	consul.serf.queue.Event.count
	consul.serf.queue.Event.max
	consul.serf.queue.Event.median
	consul.serf.queue.Event.95percentile
	consul.serf.queue.Intent.avg
	consul.serf.queue.Intent.count
	consul.serf.queue.Intent.max
	consul.serf.queue.Intent.median
	consul.serf.queue.Intent.95percentile
	consul.serf.queue.Query.avg
	consul.serf.queue.Query.count
	consul.serf.queue.Query.max
	consul.serf.queue.Query.95percentile
	

Once you’ve registered a health check, the Datadog Agent will automatically tag each service-level check with a tag of the service name (whatever name is given in the check itself), allowing you to monitor group membership at the service level. Each tag is prefixed with `consul_service_id:` followed by the name of the service (e.g. `consul_service_id:redis`, `consul_service_id:cassandra`). All Consul servers have the tag `consul_service_id:consul`. Read more about health checks [here](https://www.consul.io/docs/agent/checks.html).  


Furthermore, Consul metrics are tagged with `mode:leader` or `mode:follower`, depending on the node status, so you can easily aggregate metrics by status.