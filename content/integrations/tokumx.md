---
title: Datadog-TokuMX Integration
integration_title: TokuMX
kind: integration
git_integration_title: tokumx
newhlevel: true
---

# Overview

Capture TokuMX metrics in Datadog to:

* Visualize key TokuMX metrics.
* Correlate TokuMX performance with the rest of your applications.

# Installation

1.  Install the Python MongoDB module on your MongoDB server using the following command:

        sudo pip install --upgrade "pymongo<3.0"


2.  You can verify that the module is installed using this command:

        python -c "import pymongo" 2>&1 | grep ImportError && \
        echo -e "\033[0;31mpymongo python module - Missing\033[0m" || \
        echo -e "\033[0;32mpymongo python module - OK\033[0m"


3.  Start the mongo shell.
4.  Create a read-only admin user for datadog using the following command. Make sure you replace ```<UNIQUEPASSWORD>``` with a unique password for the user. Datadog needs admin rights to collect complete server statistics.

        use admin
        db.auth("admin", "admin-password")
        db.addUser("datadog", "<UNIQUEPASSWORD>", true)

5.  Verify that you created the user with the following command (not in the mongo shell).

        python -c 'from pymongo import Connection; print Connection().admin.authenticate("datadog", "<UNIQUEPASSWORD>")' | \
        grep True && \
        echo -e "\033[0;32mdatadog user - OK\033[0m" || \
        echo -e "\033[0;31mdatadog user - Missing\033[0m"

For more details about creating and managing users in MongoDB, refer to [the MongoDB documentation](http://www.mongodb.org/display/DOCS/Security+and+Authentication).

# Configuration

Configure the Agent to connect to your TokuMX instance using your new Datadog user.

1.  Edit the tokumx.yaml file in your Agent's conf.d directory:

        init_config:

        # Specify the MongoDB URI, with database to use for reporting (defaults to "admin")
        # E.g. mongodb://datadog:LnCbkX4uhpuLHSUrcayEoAZA@localhost:27017/my-db
        instances:
              -   server: mongodb://datadog:<UNIQUEPASSWORD>@localhost:27017
                  tags:
                      - mytag1
                      - mytag2
              -   server: mongodb://datadog:<UNIQUEPASSWORD>@localhost:27017
                  tags:
                      - mytag1
                      - mytag2


2.  Restart the Agent.

{{< insert-example-links >}}

# Validation

1.  To validate that your integration is working run the Agent's info command. You should see output similar to the following:


        Checks
        ======

          [...]

          tokumx
          ------
              - instance #0 [OK]
              - Collected 8 metrics & 0 events


# Metrics

{{< get-metrics-from-git >}}
