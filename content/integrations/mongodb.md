---
title: Datadog-MongoDB Integration
integration_title: MongoDB
kind: integration
git_integration_title: mongodb
newhlevel: true
---
# Overview

Connect MongoDB to Datadog in order to:

* Visualize key MongoDB metrics.
* Correlate MongoDB performance with the rest of your applications.

From the open-source Agent:

* [ MongoDB YAML example][1]
* [ Code for the MongoDB check][2]


# Installation

1.  To capture MongoDB metrics you need to install the Datadog Agent.
2.  Create a read-only admin user for Datadog (Admin rights are needed to collect complete server statistics). In the mongo shell, run:

        use admin
        db.auth("admin", "admin-password")
        db.addUser("datadog", "<UNIQUEPASSWORD>", true)
        # Note: if using MongoDB 3.0 or higher, use this addUser command instead
        db.createUser({"user":"datadog", "pwd": "<UNIQUEPASSWORD>", "roles" : [ 'read', 'clusterMonitor']})

# Configuration

1.  Edit your conf.d/mongodb.yaml file as follows:

        init_config:

        instances:
          # The format for the server entry below is:
          # server: mongodb://username:password@host:port/database where database will default to admin
          - server: mongodb://admin:datadog@localhost:27017/admin

2.  Restart the agent

# Validation

To validate that the integration is working, run ```datadog-agent info```. You should see results similar to the following:

        Checks
        ======

          mongo
          -----
            - instance #0 [OK]
            - Collected 89 metrics, 0 events & 2 service checks
            - Dependencies:
                - pymongo: 2.8

# Metrics

<%= get_metrics_from_git()%>

Note: many of these metrics are described in the [MongoDB Manual 3.0](https://docs.mongodb.org/manual/reference/command/dbStats/)

[1]: https://github.com/DataDog/dd-agent/blob/master/conf.d/mongo.yaml.example
[2]: https://github.com/DataDog/dd-agent/blob/master/checks.d/mongo.py


