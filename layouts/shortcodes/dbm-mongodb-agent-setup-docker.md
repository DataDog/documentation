To configure the Database Monitoring Agent running in a Docker container, set the [Autodiscovery Integration Templates][1] as Docker labels on your Agent container.

The MongoDB check is included in the Datadog Agent. No additional installation is necessary.

**Note**: The Agent must have read permission on the Docker socket for Autodiscovery of labels to work.

Replace the values to match your account and environment. See the [sample conf file][2] for all available configuration options.

{{< tabs >}}
{{% tab "Standalone" %}}

To configure the Agent to monitor a standalone MongoDB instance, use the following configuration block:

```shell
export DD_API_KEY=<DD_API_KEY>
export DD_AGENT_VERSION=7.55.0~dbm~mongo~0.1

docker run -e "DD_API_KEY=${DD_API_KEY}" \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  -l com.datadoghq.ad.checks='{
    "mongo": {
      "init_config": [{}],
      "instances": [{
        "hosts": ["<HOST>:<PORT>"],
        "username": "datadog",
        "password": "<UNIQUEPASSWORD>",
        "database": "<DATABASE>",
        "options": {
          "authSource": "admin"
        },
        "dbm": true,
        "cluster_name": "<MONGO_CLUSTER_NAME>",
        "reported_database_hostname": "<DATABASE_HOSTNAME_OVERRIDE>"
      }]
    }
  }' \
  datadog/agent-dev:${DD_AGENT_VERSION}
```

{{% /tab %}}
{{% tab "Replica Set" %}}

To configure the Agent to monitor a MongoDB replica set, the agent needs to connect to all members (including arbiter) of the replica set.
Use the following configuration block as an example to configure the Agent to connect to a replica set member:

```shell
export DD_API_KEY=<DD_API_KEY>
export DD_AGENT_VERSION=7.55.0~dbm~mongo~0.1

docker run -e "DD_API_KEY=${DD_API_KEY}" \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  -l com.datadoghq.ad.checks='{
    "mongo": {
      "init_config": [{}],
      "instances": [{
        "hosts": ["<HOST>:<PORT>"],
        "username": "datadog",
        "password": "<UNIQUEPASSWORD>",
        "database": "<DATABASE>",
        "options": {
          "authSource": "admin"
        },
        "tls": true,
        "dbm": true,
        "cluster_name": "<MONGO_CLUSTER_NAME>",
        "reported_database_hostname": "<DATABASE_HOSTNAME_OVERRIDE>",
        "additional_metrics": ["metrics.commands", "tcmalloc", "top", "collection"],
        "collections": [],
        "collections_indexes_stats": true
      }]
    }
  }' \
  datadog/agent-dev:${DD_AGENT_VERSION}
```

An example configuration for a replica set with 1 primary and 2 secondaries is as follows:

```shell
export DD_API_KEY=<DD_API_KEY>
export DD_AGENT_VERSION=7.55.0~dbm~mongo~0.1

docker run -e "DD_API_KEY=${DD_API_KEY}" \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  -l com.datadoghq.ad.checks='{
    "mongo": {
      "init_config": [{}],
      "instances": [{
        "hosts": ["<HOST_REPLICA_1>:<PORT>"],
        "username": "datadog",
        "password": "<UNIQUEPASSWORD>",
        "database": "<DATABASE>",
        "options": {
          "authSource": "admin"
        },
        "tls": true,
        "dbm": true,
        "cluster_name": "<MONGO_CLUSTER_NAME>",
        "reported_database_hostname": "<DATABASE_HOSTNAME_OVERRIDE>",
        "additional_metrics": ["metrics.commands", "tcmalloc", "top", "collection"],
        "collections": [],
        "collections_indexes_stats": true
      },
      {
        "hosts": ["<HOST_REPLICA_2>:<PORT>"],
        "username": "datadog",
        "password": "<UNIQUEPASSWORD>",
        "database": "<DATABASE>",
        "options": {
          "authSource": "admin"
        },
        "tls": true,
        "dbm": true,
        "cluster_name": "<MONGO_CLUSTER_NAME>",
        "reported_database_hostname": "<DATABASE_HOSTNAME_OVERRIDE>",
        "additional_metrics": ["metrics.commands", "tcmalloc", "top", "collection"],
        "collections": [],
        "collections_indexes_stats": true
      },
      {
        "hosts": ["<HOST_REPLICA_3>:<PORT>"],
        "username": "datadog",
        "password": "<UNIQUEPASSWORD>",
        "database": "<DATABASE>",
        "options": {
          "authSource": "admin"
        },
        "tls": true,
        "dbm": true,
        "cluster_name": "<MONGO_CLUSTER_NAME>",
        "reported_database_hostname": "<DATABASE_HOSTNAME_OVERRIDE>",
        "additional_metrics": ["metrics.commands", "tcmalloc", "top", "collection"],
        "collections": [],
        "collections_indexes_stats": true
      }]
    }
  }' \
  datadog/agent-dev:${DD_AGENT_VERSION}
```

{{% /tab %}}
{{% tab "Sharded Cluster" %}}

To configure the Agent to monitor a MongoDB sharded cluster, the agent needs to connect to the Mongos router(s) and all members of the shards. If you have multiple Mongos routers, you can configure the Agent to connect to them for load balancing.
Use the following configuration block as an example to configure the Agent to connect to a Mongos router:

```shell
export DD_API_KEY=<DD_API_KEY>
export DD_AGENT_VERSION=7.55.0~dbm~mongo~0.1

docker run -e "DD_API_KEY=${DD_API_KEY}" \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  -l com.datadoghq.ad.checks='{
    "mongo": {
      "init_config": [{}],
      "instances": [{
        "hosts": ["<HOST>:<PORT>"],
        "username": "datadog",
        "password": "<UNIQUEPASSWORD>",
        "database": "<DATABASE>",
        "options": {
          "authSource": "admin"
        },
        "tls": true,
        "dbm": true,
        "cluster_name": "<MONGO_CLUSTER_NAME>",
        "reported_database_hostname": "<DATABASE_HOSTNAME_OVERRIDE>",
      }]
    }
  }' \
  datadog/agent-dev:${DD_AGENT_VERSION}
```

Refer to the Replica Set configuration for an example configuration for connecting to members in each shard and the config server.

An example configuration for a sharded cluster with 1 Mongos router and 2 shards is as follows:

```shell
export DD_API_KEY=<DD_API_KEY>
export DD_AGENT_VERSION=7.55.0~dbm~mongo~0.1

docker run -e "DD_API_KEY=${DD_API_KEY}" \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  -l com.datadoghq.ad.checks='{
    "mongo": {
      "instances": [{
        "hosts": ["<HOST_MONGOS>:<PORT>"],
        "username": "datadog",
        "password": "<UNIQUEPASSWORD>",
        "options": {
          "authSource": "admin"
        },
        "tls": true,
        "dbm": true,
        "cluster_name": "<MONGO_CLUSTER_NAME>",
        "reported_database_hostname": "<DATABASE_HOSTNAME_OVERRIDE>",
      },
      {
        "hosts": ["<HOST_SHARD1_1>:<PORT>"],
        "username": "datadog",
        "password": "<UNIQUEPASSWORD>",
        "database": "<DATABASE>",
        "options": {
          "authSource": "admin"
        },
        "tls": true,
        "dbm": true,
        "cluster_name": "<MONGO_CLUSTER_NAME>",
        "reported_database_hostname": "<DATABASE_HOSTNAME_OVERRIDE>",
        "additional_metrics": ["metrics.commands", "tcmalloc", "top", "collection"],
        "collections": [],
        "collections_indexes_stats": true
      },
      {
        "hosts": ["<HOST_SHARD1_2>:<PORT>"],
        "username": "datadog",
        "password": "<UNIQUEPASSWORD>",
        "database": "<DATABASE>",
        "options": {
          "authSource": "admin"
        },
        "tls": true,
        "dbm": true,
        "cluster_name": "<MONGO_CLUSTER_NAME>",
        "reported_database_hostname": "<DATABASE_HOSTNAME_OVERRIDE>",
        "additional_metrics": ["metrics.commands", "tcmalloc", "top", "collection"],
        "collections": [],
        "collections_indexes_stats": true
      },
      {
        "hosts": ["<HOST_SHARD1_3>:<PORT>"],
        "username": "datadog",
        "password": "<UNIQUEPASSWORD>",
        "database": "<DATABASE>",
        "options": {
          "authSource": "admin"
        },
        "tls": true,
        "dbm": true,
        "cluster_name": "<MONGO_CLUSTER_NAME>",
        "reported_database_hostname": "<DATABASE_HOSTNAME_OVERRIDE>",
        "additional_metrics": ["metrics.commands", "tcmalloc", "top", "collection"],
        "collections": [],
        "collections_indexes_stats": true
      },
      {
        "hosts": ["<HOST_SHARD2_1>:<PORT>"],
        "username": "datadog",
        "password": "<UNIQUEPASSWORD>",
        "database": "<DATABASE>",
        "options": {
          "authSource": "admin"
        },
        "tls": true,
        "dbm": true,
        "cluster_name": "<MONGO_CLUSTER_NAME>",
        "reported_database_hostname": "<DATABASE_HOSTNAME_OVERRIDE>",
        "additional_metrics": ["metrics.commands", "tcmalloc", "top", "collection"],
        "collections": [],
        "collections_indexes_stats": true
      },
      {
        "hosts": ["<HOST_SHARD2_2>:<PORT>"],
        "username": "datadog",
        "password": "<UNIQUEPASSWORD>",
        "database": "<DATABASE>",
        "options": {
          "authSource": "admin"
        },
        "tls": true,
        "dbm": true,
        "cluster_name": "<MONGO_CLUSTER_NAME>",
        "reported_database_hostname": "<DATABASE_HOSTNAME_OVERRIDE>",
        "additional_metrics": ["metrics.commands", "tcmalloc", "top", "collection"],
        "collections": [],
        "collections_indexes_stats": true
      },
      {
        "hosts": ["<HOST_SHARD2_3>:<PORT>"],
        "username": "datadog",
        "password": "<UNIQUEPASSWORD>",
        "database": "<DATABASE>",
        "options": {
          "authSource": "admin"
        },
        "tls": true,
        "dbm": true,
        "cluster_name": "<MONGO_CLUSTER_NAME>",
        "reported_database_hostname": "<DATABASE_HOSTNAME_OVERRIDE>",
        "additional_metrics": ["metrics.commands", "tcmalloc", "top", "collection"],
        "collections": [],
        "collections_indexes_stats": true
      },
      {
        "hosts": ["<HOST_CONFIG_1>:<PORT>"],
        "username": "datadog",
        "password": "<UNIQUEPASSWORD>",
        "database": "config",
        "options": {
          "authSource": "admin"
        },
        "tls": true,
        "dbm": true,
        "cluster_name": "<MONGO_CLUSTER_NAME>",
        "reported_database_hostname": "<DATABASE_HOSTNAME_OVERRIDE>",
      },
      {
        "hosts": ["<HOST_CONFIG_2>:<PORT>"],
        "username": "datadog",
        "password": "<UNIQUEPASSWORD>",
        "database": "config",
        "options": {
          "authSource": "admin"
        },
        "tls": true,
        "dbm": true,
        "cluster_name": "<MONGO_CLUSTER_NAME>",
        "reported_database_hostname": "<DATABASE_HOSTNAME_OVERRIDE>",
      },
      {
        "hosts": ["<HOST_CONFIG_3>:<PORT>"],
        "username": "datadog",
        "password": "<UNIQUEPASSWORD>",
        "database": "config",
        "options": {
          "authSource": "admin"
        },
        "tls": true,
        "dbm": true,
        "cluster_name": "<MONGO_CLUSTER_NAME>",
        "reported_database_hostname": "<DATABASE_HOSTNAME_OVERRIDE>",
      }]
    }
  }' \
  datadog/agent-dev:${DD_AGENT_VERSION}
```

{{% /tab %}}
{{< /tabs >}}

### Validate

[Run the Agent's status subcommand][3] and look for `mongo` under the **Checks** section. Navigate to the [Databases][4] page in Datadog to get started.

[1]: /agent/faq/template_variables/
[2]: https://github.com/DataDog/integrations-core/blob/master/mongo/datadog_checks/mongo/data/conf.yaml.example
[3]: /agent/configuration/agent-commands/#agent-status-and-information
[4]: https://app.datadoghq.com/databases
