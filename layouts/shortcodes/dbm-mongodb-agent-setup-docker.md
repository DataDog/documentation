To configure the Database Monitoring Agent running in a Docker container, set the [Autodiscovery Integration Templates][1000] as Docker labels on your Agent container.

The MongoDB check is included in the Datadog Agent. No additional installation is necessary.

**Note**: The Agent must have read permission on the Docker socket for autodiscovery of labels to work.

Add the configuration details for the MongoDB check from the previous step in the `com.datadoghq.ad.checks` label. See the [sample conf file][1001] for all available configuration options.

```shell
export DD_API_KEY=<DD_API_KEY>
export DD_AGENT_VERSION=7.55.0-dbm-mongo-1.0

docker run -e "DD_API_KEY=${DD_API_KEY}" \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  -l com.datadoghq.ad.checks='{
    "mongo": {
      "init_config": [{}],
      "instances": [{
        "hosts": ["<HOST>:<PORT>"],
        "username": "datadog",
        "password": "<UNIQUE_PASSWORD>",
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
  datadog/agent:${DD_AGENT_VERSION}
```

### Validate

[Run the Agent's status subcommand][1002] and look for `mongo` under the **Checks** section. Navigate to the [Databases][1003] page in Datadog to get started.

[1000]: /agent/faq/template_variables/
[1001]: https://github.com/DataDog/integrations-core/blob/master/mongo/datadog_checks/mongo/data/conf.yaml.example
[1002]: /agent/configuration/agent-commands/#agent-status-and-information
[1003]: https://app.datadoghq.com/databases
