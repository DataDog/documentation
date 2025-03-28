To configure an integration for an Agent running in a Docker container, you have a couple methods available. All of which are covered in detail in the [Docker Configuration Documentation][1].

The examples below show how to use [Docker Labels][2] and [Autodiscovery Templates][3] to configure the Postgres integration.

**Note**: The Agent must have read permission on the Docker socket for Autodiscovery of labels to work.

### Command line

Get up and running quickly by executing the following command to run the agent from your [command line][4]. Replace the values to match your account and environment:

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
      "password": "ENC[datadog_user_database_password]"
    }]
  }}' \
  gcr.io/datadoghq/agent:${DD_AGENT_VERSION}
```

**Note**: For Postgres 9.6, add the following lines to the instance config:

```json
"pg_stat_statements_view": "datadog.pg_stat_statements()",
"pg_stat_activity_view": "datadog.pg_stat_activity()",
```

### Dockerfile

You can also specify labels in a `Dockerfile`, allowing you to build and deploy a custom Agent without modifying your infrastructure configuration:

```Dockerfile
FROM gcr.io/datadoghq/agent:7.63.3

LABEL "com.datadoghq.ad.checks"='{"postgres": {"init_config": {}, "instances": [{"dbm": true, "host": "<HOST>", "port": 5432, "username": "datadog", "password": "ENC[datadog_user_database_password]"}]}}'
```

**Note**: For Postgres 9.6, add the following lines to the instance config where host and port are specified:

```json
"pg_stat_statements_view": "datadog.pg_stat_statements()", "pg_stat_activity_view": "datadog.pg_stat_activity()",
```

To avoid exposing the `datadog` user's password in plain text, use the Agent's [secret management package][5] and declare the password using the `ENC[]` syntax. Alternatively, see the [Autodiscovery template variables documentation][6] to provide the password as an environment variable.

[1]: /containers/docker/integrations/?tab=labels#configuration
[2]: https://docs.docker.com/engine/manage-resources/labels/
[3]: /getting_started/containers/autodiscovery/
[4]: /containers/docker/integrations/?tab=labels#using-docker-run-nerdctl-run-or-podman-run
[5]: /agent/configuration/secrets-management
[6]: /agent/faq/template_variables/
