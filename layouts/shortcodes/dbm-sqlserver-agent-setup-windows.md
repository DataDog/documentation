To start collecting SQL Server telemetry, first [install the Datadog Agent][1].

On Windows the Datadog Agent can connect to SQL Server using one of the following connectors:
* **Microsoft ADO**: set `connector: adodbapi` and `adoprovider` to one of the supported drivers. To use the recommended [Microsoft OLE DB Driver][2] set `adoprovider: MSOLEDBSQL` and ensure the driver is installed on the host where the agent is running. The other two drivers, `SQLOLEDB` and `SQLNCLI`, are considered deprecated by Microsoft and should no longer be used.
* **ODBC**: set `connector: odbc`, `driver: {ODBC Driver 17 for SQL Server}`, and ensure the [Microsoft ODBC Driver][3] is installed on the host where the agent is running.

Create the SQL Server agent conf file `C:\ProgramData\Datadog\conf.d\sqlserver.d\conf.yaml`. See the [sample conf file][4] for all available configuration options.

```yaml
init_config:
instances:
  - dbm: true
    host: '<HOSTNAME>,<SQL_PORT>'
    username: datadog
    password: '<PASSWORD>'
    connector: adodbapi
    provider: MSOLEDBSQL
    tags:  # optional
      - 'service:<CUSTOM_SERVICE>'
      - 'env:<CUSTOM_ENV>'
```

To use **Windows Authentication** set `connection_string: "Trusted_Connection=yes"` and omit the `username` and `password` fields.

The `service` and `env` tags allow you to link your database telemetry to other telemetry through a common tagging scheme. To learn how these tags are used throughout Datadog, read the documentation on [unified service tagging][5].

Once all agent configuration is complete, [Restart the Datadog Agent][6].

### Validate

[Run the Agent's status subcommand][7] and look for `sqlserver` under the **Checks** section. Navigate to the [Databases][8] page in Datadog to get started!

[1]: https://app.datadoghq.com/account/settings#agent/windows
[2]: https://docs.microsoft.com/en-us/sql/connect/oledb/oledb-driver-for-sql-server
[3]: https://docs.microsoft.com/en-us/sql/connect/odbc/download-odbc-driver-for-sql-server
[4]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/datadog_checks/sqlserver/data/conf.yaml.example
[5]: /getting_started/tagging/unified_service_tagging
[6]: /agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: /agent/guide/agent-commands/#agent-status-and-information
[8]: https://app.datadoghq.com/databases
