---
title: Datadog-etcd Integration
kind: documentation
sidebar:
  nav:
    - header: Integrations
    - text: Back to Overview
      href: "/integrations/"
---

<div id="int-overview">
<h3>Overview</h3>

Capture etcd metrics in Datadog to:
<ul>
<li> Monitor the health of your etcd cluster.</li>
<li> Know when host configurations may be out of sync.</li>
<li> Correlate the performance of etcd with the rest of your applications. </li>
</ul>
</div>


From the open-source Agent:

* <a href="https://github.com/DataDog/dd-agent/blob/master/conf.d/etcd.yaml.example">
etcd YAML example</a>
* <a href="https://github.com/DataDog/dd-agent/blob/master/checks.d/etcd.py">
etcd checks.d</a>

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

