---
title: Datadog-etcd Integration
integration_title: etcd
kind: integration
---

### Overview

Capture etcd metrics in Datadog to:

* Monitor the health of your etcd cluster.
* Know when host configurations may be out of sync.
* Correlate the performance of etcd with the rest of your applications.

From the open-source Agent:

* [ etcd YAML example][1]
* [ etcd checks.d][2]



The following metrics are collected by default with the etcd integration:

    etcd.store.gets.success
    etcd.store.gets.fail
    etcd.store.sets.success
    etcd.store.sets.fail
    etcd.store.delete.success
    etcd.store.delete.fail
    etcd.store.update.success
    etcd.store.update.fail
    etcd.store.create.success
    etcd.store.create.fail
    etcd.store.compareandswap.success
    etcd.store.compareandswap.fail
    etcd.store.compareanddelete.success
    etcd.store.compareanddelete.fail
    etcd.store.expire.count
    etcd.store.watchers
    etcd.self.recv.appendrequest.count
    etcd.self.send.appendrequest.count

Plus the following metrics for leader nodes (note that these values will be undefined for single-member clusters):

    etcd.self.send.pkgrate
    etcd.self.send.bandwidthrate

And these metrics for follower nodes:

    etcd.self.recv.pkgrate
    etcd.self.recv.bandwidthrate

Furthermore, etcd metrics are tagged with `etcd_state:leader` or `etcd_state:follower`, depending on the node status, so you can easily aggregate metrics by status.

[1]: https://github.com/DataDog/dd-agent/blob/master/conf.d/etcd.yaml.example
[2]: https://github.com/DataDog/dd-agent/blob/master/checks.d/etcd.py
