To configure the Agent to monitor a standalone MongoDB instance, use the following configuration block:

```yaml
init_config:
instances:
    ## @param hosts - required
    ## Specify the hostname, IP address, or UNIX domain socket
    ## of the standalone mongod instance. If the port number
    ## is not specified, the default port 27017 is used.
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

    ## @param collections_indexes_stats - boolean - optional
    ## Set to true to collect index statistics for the specified collections.
    ## Requires `collections` to be set.
    #
    collections_indexes_stats: true

    ## @param database_autodiscovery - mapping - optional
    ## Enable database autodiscovery to automatically collect metrics from all your MongoDB databases.
    #
    database_autodiscovery:
      ## @param enabled - boolean - required
      ## Enable database autodiscovery.
      #
      enabled: true

      ## @param include - list of strings - optional
      ## List of databases to include in the autodiscovery. Use regular expressions to match multiple databases.
      ## For example, to include all databases starting with "mydb", use "^mydb.*".
      ## By default, include is set to ".*" and all databases are included.
      #
      include:
        - "^mydb.*"

      ## @param exclude - list of strings - optional
      ## List of databases to exclude from the autodiscovery. Use regular expressions to match multiple databases.
      ## For example, to exclude all databases starting with "mydb", use "^mydb.*".
      ## When the exclude list conflicts with include list, the exclude list takes precedence.
      #
      exclude:
        - "^mydb2.*"
        - "admin$"

      ## @param max_databases - integer - optional
      ## Maximum number of databases to collect metrics from. The default value is 100.
      #
      max_databases: 100

      ## @param refresh_interval - integer - optional
      ## Interval in seconds to refresh the list of databases. The default value is 600 seconds.
      #
      refresh_interval: 600
```
