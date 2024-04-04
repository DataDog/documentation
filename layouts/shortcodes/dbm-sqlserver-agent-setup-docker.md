To configure the Database Monitoring Agent running in a Docker container, set the [Autodiscovery Integration Templates][1] as Docker labels on your Agent container.

**Note**: The Agent must have read permission on the Docker socket for Autodiscovery of labels to work.

Replace the values to match your account and environment. See the [sample conf file][2] for all available configuration options.

```bash
export DD_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
export DD_AGENT_VERSION=7.35.0

docker run -e "DD_API_KEY=${DD_API_KEY}" \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  -l com.datadoghq.ad.check_names='["sqlserver"]' \
  -l com.datadoghq.ad.init_configs='[{}]' \
  -l com.datadoghq.ad.instances='[{
    "dbm": true,
    "host": "<HOSTNAME>",
    "port": <SQL_PORT>,
    "connector": "odbc",
    "driver": "FreeTDS",
    "username": "datadog",
    "password": "<PASSWORD>",
    "include_ao_metrics": true,  # Optional: For AlwaysOn users
    "tags": [
      "service:<CUSTOM_SERVICE>"
      "env:<CUSTOM_ENV>"
    ]
  }]' \
  gcr.io/datadoghq/agent:${DD_AGENT_VERSION}
```

Use the `service` and `env` tags to link your database telemetry to other telemetry through a common tagging scheme. See [Unified Service Tagging][3] on how these tags are used throughout Datadog.

### Validate

[Run the Agent's status subcommand][4] and look for `sqlserver` under the **Checks** section. Alternatively, navigate to the [Databases][5] page in Datadog to get started.

[1]: /agent/faq/template_variables/
[2]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/datadog_checks/sqlserver/data/conf.yaml.example
[3]: /getting_started/tagging/unified_service_tagging
[4]: /agent/configuration/agent-commands/#agent-status-and-information
[5]: https://app.datadoghq.com/databases
