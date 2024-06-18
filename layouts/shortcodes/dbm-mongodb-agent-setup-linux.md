To start collecting MongoDB telemetry, first [install the Datadog Agent][1].

The MongoDB check is included in the Datadog Agent. No additional installation is necessary.

Create the MongoDB Agent conf file `/etc/datadog-agent/conf.d/mongo.d/conf.yaml`. See the [sample conf file][2] for all available configuration options.

{{< tabs >}}
{{% tab "Standalone" %}}

To configure the Agent to monitor a standalone MongoDB instance, use the following configuration block:

```yaml
init_config:
instances:
    ## @param hosts - required
    ## Specify the hostname, IP address or UNIX domain socket of the standalone mongod instance.
    ## If the port number is not specified, the default port 27017 is used.
    #
  - hosts:
      - <HOST>:<PORT>

    ## @param username - string - optional
    ## The username to use for authentication.
    #
    username: datadog

    ## @param password - string - optional
    ## The password to use for authentication.
    #
    password: <UNIQUEPASSWORD>

    ## @param database - string - optional
    ## The database to collect metrics from.
    #
    database: <DATABASE>

    ## @param options - mapping - optional
    ## Connection options. For a complete list, see:
    ## https://docs.mongodb.com/manual/reference/connection-string/#connections-connection-options
    #
    options:
      authSource: admin

    ## @param tls - boolean - optional
    ## Set to true to connect to the MongoDB instance using TLS.
    #
    tls: true

    ## @param dbm - boolean - optional
    ## Set to true to enable Database Monitoring.
    #
    dbm: true

    ## @param cluster_name - string - optional
    ## The unique name of the cluster to which the monitored MongoDB instance belongs.
    ## Used to group MongoDB instances in a MongoDB cluster.
    ## Required when `dbm` is enabled.
    #
    cluster_name: <MONGO_CLUSTER_NAME>

    ## @param reported_database_hostname - string - optional
    ## Set the reported database hostname for the connected mongodb instance. This value overrides the mongodb hostname
    ## detected by the Agent from mongodb admin command serverStatus.host.
    #
    reported_database_hostname: <DATABASE_HOSTNAME_OVERRIDE>

    ## @param additional_metrics - list of strings - optional
    ## List of additional metrics to collect. Available options are:
    ## - metrics.commands - Use of database commands
    ## - tcmalloc -  TCMalloc memory allocator
    ## - top - Usage statistics for each collection
    ## - collection - Metrics of the specified collections
    #
    additional_metrics: ["metrics.commands", "tcmalloc", "top", "collection"]

    ## @param collections - list of strings - optional
    ## List of collections to collect metrics from.
    #
    collections: []

    ## @param collections_indexes_stats - boolean - optional
    ## Set to true to collect index statistics for the specified collections.
    ## Requires `collections` to be set.
    #
    collections_indexes_stats: true
```

{{% /tab %}}
{{% tab "Replica Set" %}}

To configure the Agent to monitor a MongoDB replica set, the agent needs to connect to all members (including arbiter) of the replica set.
Use the following configuration block as an example to configure the Agent to connect to a replica set member:

```yaml
init_config:
instances:
    ## @param hosts - required
    ## Specify the hostname, IP address or UNIX domain socket of
    ## a mongod instance as listed in the replica set configuration.
    ## If the port number is not specified, the default port 27017 is used.
    #
  - hosts:
      - <HOST>:<PORT>  # Primary node

    ## @param username - string - optional
    ## The username to use for authentication.
    #
    username: datadog

    ## @param password - string - optional
    ## The password to use for authentication.
    #
    password: <UNIQUEPASSWORD>

    ## @param database - string - optional
    ## The database to collect metrics from.
    #
    database: <DATABASE>

    ## @param options - mapping - optional
    ## Connection options. For a complete list, see:
    ## https://docs.mongodb.com/manual/reference/connection-string/#connections-connection-options
    #
    options:
      authSource: admin

    ## @param tls - boolean - optional
    ## Set to true to connect to the MongoDB instance using TLS.
    #
    tls: true

    ## @param dbm - boolean - optional
    ## Set to true to enable Database Monitoring.
    #
    dbm: true

    ## @param cluster_name - string - optional
    ## The unique name of the cluster to which the monitored MongoDB instance belongs.
    ## Used to group MongoDB instances in a MongoDB cluster.
    ## Required when `dbm` is enabled.
    #
    cluster_name: <MONGO_CLUSTER_NAME>

    ## @param reported_database_hostname - string - optional
    ## Set the reported database hostname for the connected mongodb instance. This value overrides the mongodb hostname
    ## detected by the Agent from mongodb admin command serverStatus.host.
    #
    reported_database_hostname: <DATABASE_HOSTNAME_OVERRIDE>


    ## @param additional_metrics - list of strings - optional
    ## List of additional metrics to collect. Available options are:
    ## - metrics.commands - Use of database commands
    ## - tcmalloc -  TCMalloc memory allocator
    ## - top - Usage statistics for each collection
    ## - collection - Metrics of the specified collections
    #
    additional_metrics: ["metrics.commands", "tcmalloc", "top", "collection"]

    ## @param collections - list of strings - optional
    ## List of collections to collect metrics from.
    #
    collections: []

    ## @param collections_indexes_stats - boolean - optional
    ## Set to true to collect index statistics for the specified collections.
    ## Requires `collections` to be set.
    #
    collections_indexes_stats: true
```

An example configuration for a replica set with 1 primary and 2 secondaries is as follows:

```yaml
init_config:
instances:
  - hosts:
      - <HOST_REPLICA_1>:<PORT>  # Primary node
    username: datadog
    password: <UNIQUEPASSWORD>
    database: <DATABASE>
    options:
      authSource: admin
    tls: true
    dbm: true
    cluster_name: <MONGO_CLUSTER_NAME>
    reported_database_hostname: <DATABASE_HOSTNAME_OVERRIDE>
    additional_metrics: ["metrics.commands", "tcmalloc", "top", "collection"]
    collections: []
    collections_indexes_stats: true
  - hosts:
      - <HOST_REPLICA_2>:<PORT>  # Secondary node
    username: datadog
    password: <UNIQUEPASSWORD>
    database: <DATABASE>
    options:
      authSource: admin
    tls: true
    dbm: true
    cluster_name: <MONGO_CLUSTER_NAME>
    reported_database_hostname: <DATABASE_HOSTNAME_OVERRIDE>
    additional_metrics: ["metrics.commands", "tcmalloc", "top", "collection"]
    collections: []
    collections_indexes_stats: true
  - hosts:
      - <HOST_REPLICA_3>:<PORT>  # Secondary node
    username: datadog
    password: <UNIQUEPASSWORD>
    database: <DATABASE>
    options:
      authSource: admin
    tls: true
    dbm: true
    cluster_name: <MONGO_CLUSTER_NAME>
    reported_database_hostname: <DATABASE_HOSTNAME_OVERRIDE>
    additional_metrics: ["metrics.commands", "tcmalloc", "top", "collection"]
    collections: []
    collections_indexes_stats: true
```

{{% /tab %}}
{{% tab "Sharded Cluster" %}}

To configure the Agent to monitor a MongoDB sharded cluster, the agent needs to connect to the Mongos router(s) and all members of the shards. If you have multiple Mongos routers, you can configure the Agent to connect to them for load balancing.
Use the following configuration block as an example to configure the Agent to connect to a Mongos router:

```yaml
init_config:
instances:
    ## @param hosts - required
    ## For a sharded cluster, you need one check instance for each mongod instance in
    ## each shard (including the configsvr shard) as well as one additional check instance
    ## that connects to one (or more) mongos node.

    ## Specify the hostname, IP address or UNIX domain socket of the mongod or mongos instance.

    ## If the port number is not specified, the default port 27017 is used.
  - hosts:
      - <HOST>:<PORT>

    ## @param username - string - optional
    ## The username to use for authentication.
    #
    username: datadog

    ## @param password - string - optional
    ## The password to use for authentication.
    #
    password: <UNIQUEPASSWORD>

    ## @param options - mapping - optional
    ## Connection options. For a complete list, see:
    ## https://docs.mongodb.com/manual/reference/connection-string/#connections-connection-options
    #
    options:
      authSource: admin

    ## @param tls - boolean - optional
    ## Set to true to connect to the MongoDB instance using TLS.
    #
    tls: true

    ## @param dbm - boolean - optional
    ## Set to true to enable Database Monitoring.
    #
    dbm: true

    ## @param cluster_name - string - optional
    ## The unique name of the cluster to which the monitored MongoDB instance belongs.
    ## Used to group MongoDB instances in a MongoDB cluster.
    ## Required when `dbm` is enabled.
    #
    cluster_name: <MONGO_CLUSTER_NAME>

    ## @param reported_database_hostname - string - optional
    ## Set the reported database hostname for the connected mongodb instance. This value overrides the mongodb hostname
    ## detected by the Agent from mongodb admin command serverStatus.host.
    #
    reported_database_hostname: <DATABASE_HOSTNAME_OVERRIDE>
```

Refer to the Replica Set configuration for an example configuration for connecting to members in each shard and the config server.

An example configuration for a sharded cluster with 1 Mongos router and 2 shards is as follows:

```yaml
init_config:
instances:
  ## Mongos router
  - hosts:
      - <HOST_MONGOS>:<PORT>
    username: datadog
    password: <UNIQUEPASSWORD>
    options:
      authSource: admin
    tls: true
    dbm: true
    cluster_name: <MONGO_CLUSTER_NAME>
    reported_database_hostname: <DATABASE_HOSTNAME_OVERRIDE>
    additional_metrics: ["metrics.commands", "tcmalloc", "top", "collection", "jumbo_chunks"]
  ## Shard1
  - hosts:
      - <HOST_SHARD1_1>:<PORT>  # Primary node
    username: datadog
    password: <UNIQUEPASSWORD>
    database: <DATABASE>
    options:
      authSource: admin
    tls: true
    dbm: true
    cluster_name: <MONGO_CLUSTER_NAME>
    reported_database_hostname: <DATABASE_HOSTNAME_OVERRIDE>
    additional_metrics: ["metrics.commands", "tcmalloc", "top", "collection"]
    collections: []
    collections_indexes_stats: true
  - hosts:
      - <HOST_SHARD1_2>:<PORT>  # Secondary node
    username: datadog
    password: <UNIQUEPASSWORD>
    database: <DATABASE>
    options:
      authSource: admin
    tls: true
    dbm: true
    cluster_name: <MONGO_CLUSTER_NAME>
    reported_database_hostname: <DATABASE_HOSTNAME_OVERRIDE>
    additional_metrics: ["metrics.commands", "tcmalloc", "top", "collection"]
    collections: []
    collections_indexes_stats: true
  - hosts:
      - <HOST_SHARD1_3>:<PORT>  # Secondary node
    username: datadog
    password: <UNIQUEPASSWORD>
    database: <DATABASE>
    options:
      authSource: admin
    tls: true
    dbm: true
    cluster_name: <MONGO_CLUSTER_NAME>
    reported_database_hostname: <DATABASE_HOSTNAME_OVERRIDE>
    additional_metrics: ["metrics.commands", "tcmalloc", "top", "collection"]
    collections: []
    collections_indexes_stats: true
  ## Shard 2
  - hosts:
      - <HOST_SHARD2_1>:<PORT>  # Primary node
    username: datadog
    password: <UNIQUEPASSWORD>
    database: <DATABASE>
    options:
      authSource: admin
    tls: true
    dbm: true
    cluster_name: <MONGO_CLUSTER_NAME>
    reported_database_hostname: <DATABASE_HOSTNAME_OVERRIDE>
    additional_metrics: ["metrics.commands", "tcmalloc", "top", "collection"]
    collections: []
    collections_indexes_stats: true
  - hosts:
      - <HOST_SHARD2_2>:<PORT>  # Secondary node
    username: datadog
    password: <UNIQUEPASSWORD>
    database: <DATABASE>
    options:
      authSource: admin
    tls: true
    dbm: true
    cluster_name: <MONGO_CLUSTER_NAME>
    reported_database_hostname: <DATABASE_HOSTNAME_OVERRIDE>
    additional_metrics: ["metrics.commands", "tcmalloc", "top", "collection"]
    collections: []
    collections_indexes_stats: true
  - hosts:
      - <HOST_SHARD2_3>:<PORT>  # Secondary node
    username: datadog
    password: <UNIQUEPASSWORD>
    database: <DATABASE>
    options:
      authSource: admin
    tls: true
    dbm: true
    cluster_name: <MONGO_CLUSTER_NAME>
    reported_database_hostname: <DATABASE_HOSTNAME_OVERRIDE>
    additional_metrics: ["metrics.commands", "tcmalloc", "top", "collection"]
    collections: []
    collections_indexes_stats: true
  ## Config server
  - hosts:
      - <HOST_CONFIG_1>:<PORT>  # Primary node
    username: datadog
    password: <UNIQUEPASSWORD>
    database: config
    options:
      authSource: admin
    tls: true
    dbm: true
    cluster_name: <MONGO_CLUSTER_NAME>
    reported_database_hostname: <DATABASE_HOSTNAME_OVERRIDE>
  - hosts:
      - <HOST_CONFIG_2>:<PORT>  # Secondary node
    username: datadog
    password: <UNIQUEPASSWORD>
    database: config
    options:
      authSource: admin
    tls: true
    dbm: true
    cluster_name: <MONGO_CLUSTER_NAME>
    reported_database_hostname: <DATABASE_HOSTNAME_OVERRIDE>
  - hosts:
      - <HOST_CONFIG_3>:<PORT>  # Secondary node
    username: datadog
    password: <UNIQUEPASSWORD>
    database: config
    options:
      authSource: admin
    tls: true
    dbm: true
    cluster_name: <MONGO_CLUSTER_NAME>
```

{{% /tab %}}
{{< /tabs >}}

Once all Agent configuration is complete, [restart the Datadog Agent][5].

### Validate

[Run the Agent's status subcommand][4] and look for `mongo` under the **Checks** section. Navigate to the [Databases][5] page in Datadog to get started.

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://github.com/DataDog/integrations-core/blob/master/mongo/datadog_checks/mongo/data/conf.yaml.example
[3]: /agent/configuration/agent-commands/#start-stop-and-restart-the-agent
[4]: /agent/configuration/agent-commands/#agent-status-and-information
[5]: https://app.datadoghq.com/databases
