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


# Installation

1.  To capture MongoDB metrics you need to install the Datadog Agent.
2.  Create a read-only admin user for Datadog (Admin rights are needed to collect complete server statistics). In the mongo shell, run:

        # Authenticate as the admin user.
        use admin
        db.auth("admin", "admin-password")

        # On MongoDB 2.x, use the addUser command.
        db.addUser("datadog", "<UNIQUEPASSWORD>", true)

        # On MongoDB 3.x or higher, use the createUser command.
        db.createUser({
          "user":"datadog",
          "pwd": "<UNIQUEPASSWORD>",
          "roles" : [
            {role: 'read', db: 'admin' },
            {role: 'clusterMonitor', db: 'admin'},
            {role: 'read', db: 'local' }
          ]
        })

# Configuration

1.  Edit your conf.d/mongo.yaml file as follows:

        init_config:

        instances:
          # The format for the server entry below is:
          # server: mongodb://username:password@host:port/database where database will default to admin
          - server: mongodb://admin:datadog@localhost:27017/admin
            tags:
              - mytag1
              - mytag2
            additional_metrics:
              - durability
              - locks
              - top

2.  Restart the agent

<%= insert_example_links(conf:"mongo", check:"mongo")%>

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
