To configure the Database Monitoring Agent running in a Docker container, you have a couple methods available, they are all covered in detail in the [Docker Configuration Documentation][4].

Below are some examples of how you can set the [Autodiscovery Integration Templates][1] as Docker labels on your agent container.

**Note**: The Agent must have read permission on the Docker socket for Autodiscovery of labels to work.

### Command line

Get up and running quickly by executing the following command to run the agent from your [command line][5]. Replace the values to match your account and environment:

```bash
export DD_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
export DD_AGENT_VERSION=7.63.3

docker run -e "DD_API_KEY=${DD_API_KEY}" \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  -l com.datadoghq.ad.checks='{"postgres": {
    "init_config": {},
    "instances": [{
      "dbm": true,
      "host": "<HOST>",
      "port": 5432,
      "username": "datadog",
      "password": "ENC[datadog_user_database_password]",
    }]
  }}' \
  gcr.io/datadoghq/agent:${DD_AGENT_VERSION}
```

For Postgres 9.6, add the following settings to the instance config where host and port are specified:

```json
"pg_stat_statements_view": "datadog.pg_stat_statements()",
"pg_stat_activity_view": "datadog.pg_stat_activity()",
```

### Dockerfile

Labels can also be specified in a `Dockerfile`, so you can build and deploy a custom agent without changing any infrastructure configuration:

```Dockerfile
FROM gcr.io/datadoghq/agent:7.63.3

LABEL "com.datadoghq.ad.check_names"='["postgres"]'
LABEL "com.datadoghq.ad.init_configs"='[{}]'
LABEL "com.datadoghq.ad.instances"='[{"dbm": true, "host": "<HOST>", "port": 5432,"username": "datadog","password": "ENC[datadog_user_database_password]"}]'
```

For Postgres 9.6, add the following settings to the instance config where host and port are specified:

```json
"pg_stat_statements_view": "datadog.pg_stat_statements()", "pg_stat_activity_view": "datadog.pg_stat_activity()",
```

To avoid exposing the `datadog` user's password in plain text, use the Agent's [secret management package][2] and declare the password using the `ENC[]` syntax, or see the [Autodiscovery template variables documentation][3] to learn how to pass the password as an environment variable.

[1]: /agent/docker/integrations/?tab=docker
[2]: /agent/configuration/secrets-management
[3]: /agent/faq/template_variables/
[4]: /containers/docker/integrations/?tab=labels#configuration
[5]: /containers/docker/integrations/?tab=labels#using-docker-run-nerdctl-run-or-podman-run

