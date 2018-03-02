---
categories:
- data store
ddtype: check
doc_link: https://docs.datadoghq.com/integrations/neo4j/
git_integration_title: neo4j
has_logo: false
integration_title: Neo4j
is_public: true
kind: integration
maintainer: help@neo4j.com
manifest_version: 0.1.0
max_agent_version: 6.0.0
min_agent_version: 5.6.3
name: neo4j
public_title: Datadog-Neo4j Integration
short_description: Integration with Neo4j Enterprise to monitor server performance.
support: contrib
version: 0.1.0
---



## Overview

Get metrics from neo4j service in real time to:

* Visualize and monitor neo4j states.
* Be notified about neo4j failovers and events.

## Setup
### Installation

Install the `dd-check-neo4j` package manually or with your favorite configuration manager.

### Configuration

Edit the `neo4j.yaml` file to configure the servers to monitor:

* neo4j_url: set to the url of the server (i.e http://ec2-54-85-23-10.compute-1.amazonaws.com)
* port: set to the http port used by neo4j. Default is 7474
* username: set to a valid neo4j username
* password: set to the password for the username
* connect_timeout: setting for the length of time to attempt to connect to the neo4j server
* server_name: set to what should be displayed in DataDog
* version: set to the neo4j versin

### Validation

[Run the Agent's `info` subcommand](https://docs.datadoghq.com/agent/faq/agent-status-and-information/), you should see something like the following:

    Checks
    ======

        neo4j
        -----------
          - instance #0 [OK]
          - Collected 39 metrics, 0 events & 7 service checks

## Compatibility

The Neo4j check is compatible with all major platforms.

## Data Collected
### Metrics
{{< get-metrics-from-git "neo4j" >}}


### Events
The Neo4j check does not include any events at this time.

### Service Checks
The Neo4j check does not include any service checks at this time.

## Troubleshooting
Need help? Contact [Datadog Support](http://docs.datadoghq.com/help/).

## Further Reading

Learn more about infrastructure monitoring and all our integrations on [our blog](https://www.datadoghq.com/blog/).
