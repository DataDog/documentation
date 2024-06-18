Place the MongoDB Agent conf file created from previous step in `/etc/datadog-agent/conf.d/mongo.d/conf.yaml`. See the [sample conf file][2] for all available configuration options.

Once all Agent configuration is complete, [restart the Datadog Agent][5].

### Validate

[Run the Agent's status subcommand][4] and look for `mongo` under the **Checks** section. Navigate to the [Databases][5] page in Datadog to get started.

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://github.com/DataDog/integrations-core/blob/master/mongo/datadog_checks/mongo/data/conf.yaml.example
[3]: /agent/configuration/agent-commands/#start-stop-and-restart-the-agent
[4]: /agent/configuration/agent-commands/#agent-status-and-information
[5]: https://app.datadoghq.com/databases
