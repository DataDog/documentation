To monitor a MongoDB sharded cluster, the Agent needs to connect to the `mongos` router(s) and all members of the shards. If you have multiple `mongos` routers, you can configure the Agent to connect to them for load balancing.

Use the following configuration block as an example to configure the Agent to connect to a Mongos router:

```yaml
init_config:
instances:
    ## @param hosts - required
    ## For a sharded cluster, you need one check instance for each mongod instance in
    ## each shard (including the configsvr shard) as well as one additional check instance
    ## that connects to at least one mongos node.

    ## Specify the hostname, IP address, or UNIX domain socket of the mongod or mongos instance.

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
    password: <UNIQUE_PASSWORD>

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
    ## Set the reported database hostname for the connected MongoDB instance. 
    ## This value overrides the MongoDB hostname detected by 
    ## the Agent from the MongoDB admin command serverStatus.host.
    #
    reported_database_hostname: <DATABASE_HOSTNAME_OVERRIDE>
```

Refer to the Replica Set configuration for an example configuration for connecting to members in each shard and the config server.

An example configuration for a sharded cluster with 1 `mongos` router and 2 shards is as follows:

```yaml
init_config:
instances:
  ## mongos router
  - hosts:
      - <HOST_MONGOS>:<PORT>
    username: datadog
    password: <UNIQUE_PASSWORD>
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
    password: <UNIQUE_PASSWORD>
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
    password: <UNIQUE_PASSWORD>
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
    password: <UNIQUE_PASSWORD>
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
    password: <UNIQUE_PASSWORD>
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
    password: <UNIQUE_PASSWORD>
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
    password: <UNIQUE_PASSWORD>
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
    password: <UNIQUE_PASSWORD>
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
    password: <UNIQUE_PASSWORD>
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
    password: <UNIQUE_PASSWORD>
    database: config
    options:
      authSource: admin
    tls: true
    dbm: true
    cluster_name: <MONGO_CLUSTER_NAME>
```
