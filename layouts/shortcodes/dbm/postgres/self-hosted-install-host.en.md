After you've installed the Host Agent, edit the Agent's `conf.d/postgres.d/conf.yaml` file to point the Postgres instance you want to monitor. For a complete list of configuration options, see the [sample postgres.d/conf.yaml][1].

   ```yaml
   init_config:
   instances:
     - dbm: true
       host: localhost
       port: 5432
       username: datadog
       password: 'ENC[datadog_user_database_password]'

      ## Required for Postgres 9.6: Uncomment these lines to use the functions created in the setup
      # pg_stat_statements_view: datadog.pg_stat_statements()
      # pg_stat_activity_view: datadog.pg_stat_activity()

      ## Optional: Connect to a different database if needed for `custom_queries`
      # dbname: '<DB_NAME>'

   ```

**Note**: If your password includes special characters, wrap it in single quotes.

[Restart the Agent][2] to apply the changes.

[1]: https://github.com/DataDog/integrations-core/blob/master/postgres/datadog_checks/postgres/data/conf.yaml.example
[2]: /agent/configuration/agent-commands/#start-stop-and-restart-the-agent
