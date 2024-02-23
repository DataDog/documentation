To start collecting SQL Server telemetry, first [install the Datadog Agent][1].

On Linux, the Datadog Agent additionally requires an ODBC SQL Server driver to be installed—for example, the [Microsoft ODBC driver][2]. Once an ODBC SQL Server is installed, copy the `odbc.ini` and `odbcinst.ini` files into the `/opt/datadog-agent/embedded/etc` folder.

Use the `odbc` connector and specify the proper driver as indicated in the `odbcinst.ini` file.

Create the SQL Server Agent conf file `/etc/datadog-agent/conf.d/sqlserver.d/conf.yaml`. See the [sample conf file][3] for all available configuration options.

```yaml
init_config:
instances:
  - dbm: true
    host: '<HOSTNAME>,<SQL_PORT>'
    username: datadog
    password: '<PASSWORD>'
    connector: odbc
    driver: '<Driver from the `odbcinst.ini` file>'
    include_ao_metrics: true  # Optional: For AlwaysOn users
    tags:  # Optional
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
