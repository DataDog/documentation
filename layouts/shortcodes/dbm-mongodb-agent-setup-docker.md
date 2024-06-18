To configure the Database Monitoring Agent running in a Docker container, set the [Autodiscovery Integration Templates][1] as Docker labels on your Agent container.

The MongoDB check is included in the Datadog Agent. No additional installation is necessary.

**Note**: The Agent must have read permission on the Docker socket for Autodiscovery of labels to work.

Replace the values to match your account and environment. See the [sample conf file][2] for all available configuration options.

```bash
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

### Validate

[Run the Agent's status subcommand][3] and look for `mongo` under the **Checks** section. Navigate to the [Databases][4] page in Datadog to get started.

[1]: /agent/faq/template_variables/
[2]: https://github.com/DataDog/integrations-core/blob/master/mongo/datadog_checks/mongo/data/conf.yaml.example
[3]: /agent/configuration/agent-commands/#agent-status-and-information
[4]: https://app.datadoghq.com/databases
