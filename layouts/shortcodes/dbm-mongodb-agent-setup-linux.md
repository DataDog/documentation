To start collecting MongoDB telemetry, first [install the Datadog Agent][1].

The MongoDB check is included in the Datadog Agent. No additional installation is necessary.

Create the MongoDB Agent conf file `/etc/datadog-agent/conf.d/mongo.d/conf.yaml`. See the [sample conf file][2] for all available configuration options.

```yaml
init_config:
instances:
    ## The host (and optional port number) where the mongod instance (or mongos instances for
    ## a sharded cluster) is running. You can specify a hostname, IP address, or UNIX domain
    ## socket. Specify as many hosts as appropriate for your deployment topology:

    ##   - For a standalone, specify the hostname of the standalone mongod instance.
    ##   - For a replica set, specify the hostname of a mongod instance as listed in
    ##     the replica set configuration. You need one check instance per mongod instance
    ##     in order to collect replication metrics and events.
    ##   - For a sharded cluster, you need one check instance for each mongod instance in
    ##     each shard (including the configsvr shard) as well as one additional check instance
    ##     that connects to one (or more) mongos node.

    ## If the port number is not specified, the default port 27017 is used.

    ## DO NOT specify more than one host here unless you are connecting to a mongos instance
    ## and you want to balance requests performed by the agent to multiple mongos instances.
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
    ## The name of the cluster to which the monitored MongoDB instance belongs.
    ## Used to group MongoDB instances in a MongoDB cluster.
    ## Required when `dbm` is enabled.
    #
    cluster_name: <MONGO_CLUSTER_NAME>

    ## @param reported_database_hostname - string - optional
    ## Set the reported database hostname for the connected mongodb instance. This value overrides the mongodb hostname
    ## detected by the Agent from mongodb admin command serverStatus.
    #
    reported_database_hostname: <DATABASE_HOSTNAME_OVERRIDE>
```

Once all Agent configuration is complete, [restart the Datadog Agent][5].

### Validate

[Run the Agent's status subcommand][4] and look for `mongo` under the **Checks** section. Navigate to the [Databases][5] page in Datadog to get started.

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://github.com/DataDog/integrations-core/blob/master/mongo/datadog_checks/mongo/data/conf.yaml.example
[3]: /agent/configuration/agent-commands/#start-stop-and-restart-the-agent
[4]: /agent/configuration/agent-commands/#agent-status-and-information
[5]: https://app.datadoghq.com/databases
