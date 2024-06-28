Place the MongoDB Agent configuration file created in the previous step in `/etc/datadog-agent/conf.d/mongo.d/conf.yaml`. See the [sample conf file][4000] for all available configuration options.

Once all Agent configuration is complete, [restart the Datadog Agent][4003].

### Validate

[Run the Agent's status subcommand][4001] and look for `mongo` under the **Checks** section. Navigate to the [Databases][4002] page in Datadog to get started.

[4000]: https://github.com/DataDog/integrations-core/blob/master/mongo/datadog_checks/mongo/data/conf.yaml.example
[4001]: /agent/configuration/agent-commands/#agent-status-and-information
[4002]: https://app.datadoghq.com/databases
[4003]: /agent/configuration/agent-commands/?tab=agentv6v7#restart-the-agent