Once you have installed the Host Agent, edit the Agent's `conf.d/postgres.d/conf.yaml` file to point to your `host` / `port` and set the hosts to monitor. See the [sample postgres.d/conf.yaml][1] for all available configuration options.

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

**Note**: Wrap your password in single quotes if a special character is present.

3. [Restart the Agent][2] so that the configurations are applied.

[1]: https://github.com/DataDog/integrations-core/blob/master/postgres/datadog_checks/postgres/data/conf.yaml.example
[2]: /agent/configuration/agent-commands/#start-stop-and-restart-the-agent
