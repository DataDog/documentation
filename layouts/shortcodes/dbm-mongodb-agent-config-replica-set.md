To monitor a MongoDB replica set, the Agent needs to connect to all members (including the arbiter) of the replica set.

Use the following configuration block as an example to configure the Agent to connect to a replica set member:

```yaml
init_config:
instances:
    ## @param hosts - required
    ## Specify the hostname, IP address, or UNIX domain socket of
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
    password: <UNIQUE_PASSWORD>

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
    ## Set the reported database hostname for the connected MongoDB instance. 
    ## This value overrides the MongoDB hostname detected by the Agent 
    ## from the MongoDB admin command serverStatus.host.
    #
    reported_database_hostname: <DATABASE_HOSTNAME_OVERRIDE>


    ## @param additional_metrics - list of strings - optional
    ## List of additional metrics to collect. Available options are:
    ## - metrics.commands: Use of database commands
    ## - tcmalloc: TCMalloc memory allocator
    ## - top: Usage statistics for each collection
    ## - collection: Metrics of the specified collections
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
      - <HOST_REPLICA_2>:<PORT>  # Secondary node
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
      - <HOST_REPLICA_3>:<PORT>  # Secondary node
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
```
