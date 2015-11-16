---
title: Datadog-MongoDB Integration
integration_title: MongoDB
kind: integration
git_integration_title: mongodb
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

### Metrics

<%= get_metrics_from_git()%> 

Note: many of these metrics are described in the [MongoDB Manual 3.0](https://docs.mongodb.org/manual/reference/command/dbStats/)
