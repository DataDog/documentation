---
title: Datadog-MongoDB Integration
integration_title: MongoDB
kind: integration
git_integration_title: mongodb
---
### Overview

Connect MongoDB to Datadog in order to:

* Visualize key MongoDB metrics.
* Correlate MongoDB performance with the rest of your applications.

From the open-source Agent:

* [ MongoDB YAML example][1]
* [ Code for the MongoDB check][2]

The user set in `mongo.yaml` must have the `clusterMonitor` role.

### Metrics

<%= get_metrics_from_git()%>

Note: many of these metrics are described in the [MongoDB Manual 3.0](https://docs.mongodb.org/manual/reference/command/dbStats/)

[1]: https://github.com/DataDog/dd-agent/blob/master/conf.d/mongo.yaml.example
[2]: https://github.com/DataDog/dd-agent/blob/master/checks.d/mongo.py


