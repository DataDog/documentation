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
    adoprovider: MSOLEDBSQL
    include_ao_metrics: true  # Optional: For AlwaysOn users
    tags:  # Optional
      - 'service:<CUSTOM_SERVICE>'
      - 'env:<CUSTOM_ENV>'
```

To use [Windows Authentication][10], set `connection_string: "Trusted_Connection=yes"` and omit the `username` and `password` fields.

The agent supports [SQL Server Browser Service][11] in versions 7.41+. To enable SSBS, provide a port of `0` in the host string: `<HOSTNAME>,0`.

Use the `service` and `env` tags to link your database telemetry to other telemetry through a common tagging scheme. See [Unified Service Tagging][5] on how these tags are used throughout Datadog.

### Supported Drivers

#### Microsoft ADO

The recommended [ADO][9] provider is [Microsoft OLE DB Driver][2]. Ensure the driver is installed on the host where the agent is running.
```yaml
connector: adodbapi
adoprovider: MSOLEDBSQL19  # Replace with MSOLEDBSQL for versions 18 and lower
```

The other two providers, `SQLOLEDB` and `SQLNCLI`, are considered deprecated by Microsoft and should no longer be used.

#### ODBC

The recommended ODBC driver is [Microsoft ODBC Driver][3]. Ensure the driver is installed on the host where the Agent is running.

```yaml
connector: odbc
driver: '{ODBC Driver 18 for SQL Server}'
```

Once all Agent configuration is complete, [restart the Datadog Agent][6].

### Validate

[Run the Agent's status subcommand][7] and look for `sqlserver` under the **Checks** section. Navigate to the [Databases][8] page in Datadog to get started.

[1]: https://app.datadoghq.com/account/settings#agent/windows
[2]: https://docs.microsoft.com/en-us/sql/connect/oledb/oledb-driver-for-sql-server
[3]: https://docs.microsoft.com/en-us/sql/connect/odbc/download-odbc-driver-for-sql-server
[4]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/datadog_checks/sqlserver/data/conf.yaml.example
[5]: /getting_started/tagging/unified_service_tagging
[6]: /agent/configuration/agent-commands/#start-stop-and-restart-the-agent
[7]: /agent/configuration/agent-commands/#agent-status-and-information
[8]: https://app.datadoghq.com/databases
[9]: https://docs.microsoft.com/en-us/sql/ado/microsoft-activex-data-objects-ado
[10]: https://docs.microsoft.com/en-us/sql/relational-databases/security/choose-an-authentication-mode
[11]: https://learn.microsoft.com/en-us/sql/tools/configuration-manager/sql-server-browser-service
