To start collecting SQL Server telemetry, first [install the Datadog Agent][1].

Create the SQL Server Agent conf file `C:\ProgramData\Datadog\conf.d\sqlserver.d\conf.yaml`. See the [sample conf file][4] for all available configuration options.

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

To use [Windows Authentication][10] set `connection_string: "Trusted_Connection=yes"` and omit the `username` and `password` fields.

The `service` and `env` tags allow you to link your database telemetry to other telemetry through a common tagging scheme. To learn how these tags are used throughout Datadog, read the documentation on [unified service tagging][5].

### Supported Drivers

#### Microsoft ADO

The recommended [ADO][9] provider is [Microsoft OLE DB Driver][2]. Ensure the driver is installed on the host where the agent is running.
```yaml
connector: adodbapi
provider: MSOLEDBSQL
```

The other two providers, `SQLOLEDB` and `SQLNCLI`, are considered deprecated by Microsoft and should no longer be used.

#### ODBC

The recommended ODBC driver is [Microsoft ODBC Driver][3]. Ensure the driver is installed on the host where the Agent is running.

```yaml
connector: odbc
driver: {ODBC Driver 17 for SQL Server}
```

Once all Agent configuration is complete, [Restart the Datadog Agent][6].

### Validate

[Run the Agent's status subcommand][7] and look for `sqlserver` under the **Checks** section. Navigate to the [Databases][8] page in Datadog to get started.

[1]: https://app.datadoghq.com/account/settings#agent/windows
[2]: https://docs.microsoft.com/en-us/sql/connect/oledb/oledb-driver-for-sql-server
[3]: https://docs.microsoft.com/en-us/sql/connect/odbc/download-odbc-driver-for-sql-server
[4]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/datadog_checks/sqlserver/data/conf.yaml.example
[5]: /getting_started/tagging/unified_service_tagging
[6]: /agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: /agent/guide/agent-commands/#agent-status-and-information
[8]: https://app.datadoghq.com/databases
[9]: https://docs.microsoft.com/en-us/sql/ado/microsoft-activex-data-objects-ado
[10]: https://docs.microsoft.com/en-us/sql/relational-databases/security/choose-an-authentication-mode
