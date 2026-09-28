To start collecting SQL Server telemetry, first [install the Datadog Agent][1].

On Linux, the Agent includes Microsoft ODBC Driver 18 for SQL Server, so no extra driver setup is needed.

To use a different driver, such as a host install of the [Microsoft ODBC driver][2], register it in `embedded/etc/odbcinst.ini` inside the Agent install directory: `/opt/datadog-agent` for package installs, or `/opt/datadog-packages/datadog-agent/stable` for Fleet Automation installs. Starting with Agent 7.NN, this file already registers the bundled drivers, so add your driver's section instead of replacing the file.

Use the `odbc` connector and set `driver` to the driver's section name in `odbcinst.ini`.

Create the SQL Server Agent conf file `/etc/datadog-agent/conf.d/sqlserver.d/conf.yaml`. See the [sample conf file][3] for all available configuration options.

```yaml
init_config:
instances:
  - dbm: true
    host: '<HOSTNAME>,<PORT>'
    username: datadog
    password: 'ENC[datadog_user_database_password]'
    connector: odbc
    driver: '<Driver from the `odbcinst.ini` file>'
    # Optional: For additional tags
    tags:  
      - 'service:<CUSTOM_SERVICE>'
      - 'env:<CUSTOM_ENV>'
```

Use the `service` and `env` tags to link your database telemetry to other telemetry through a common tagging scheme. See [Unified Service Tagging][4] on how these tags are used throughout Datadog.

Once all Agent configuration is complete, [restart the Datadog Agent][5].

### Validate

[Run the Agent's status subcommand][6] and look for `sqlserver` under the **Checks** section. Navigate to the [Databases][7] page in Datadog to get started.

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.microsoft.com/en-us/sql/connect/odbc/linux-mac/installing-the-microsoft-odbc-driver-for-sql-server
[3]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/datadog_checks/sqlserver/data/conf.yaml.example
[4]: /getting_started/tagging/unified_service_tagging
[5]: /agent/configuration/agent-commands/#start-stop-and-restart-the-agent
[6]: /agent/configuration/agent-commands/#agent-status-and-information
[7]: https://app.datadoghq.com/databases
