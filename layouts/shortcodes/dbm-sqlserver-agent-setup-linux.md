To start collecting SQL Server telemetry, first [install the Datadog Agent][1].

On Linux the Datadog Agent additionally requires an ODBC SQL Server driver to be installed, for example the [Microsoft ODBC driver][2]. Once installed, copy the `odbc.ini` and `odbcinst.ini` files into the `/opt/datadog-agent/embedded/etc` folder.

Use the `odbc` connector and specify the proper driver as indicated in the `odbcinst.ini` file.

Create the SQL Server agent conf file `/etc/datadog-agent/conf.d/sqlserver.d/conf.yaml`. See the [sample conf file][3] for all available configuration options.

```yaml
init_config:
instances:
  - dbm: true
    host: '<HOSTNAME>,<SQL_PORT>'
    username: datadog
    password: '<PASSWORD>'
    connector: odbc
    driver: '<Driver from the `odbcinst.ini` file>'
    tags:  # optional
      - 'service:<CUSTOM_SERVICE>'
      - 'env:<CUSTOM_ENV>'
```

The `service` and `env` tags allow you to link your database telemetry to other telemetry through a common tagging scheme. To learn how these tags are used throughout Datadog, read the documentation on [unified service tagging][4].

Once all agent configuration is complete, [Restart the Datadog Agent][5].

### Validate

[Run the Agent's status subcommand][6] and look for `sqlserver` under the **Checks** section. Navigate to the [Databases][7] page in Datadog to get started!

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.microsoft.com/en-us/sql/connect/odbc/linux-mac/installing-the-microsoft-odbc-driver-for-sql-server
[3]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/datadog_checks/sqlserver/data/conf.yaml.example
[4]: /getting_started/tagging/unified_service_tagging
[5]: /agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: /agent/guide/agent-commands/#agent-status-and-information
[7]: https://app.datadoghq.com/databases
