---
"app_id": "tokumx"
"app_uuid": "8169c714-555c-4e00-9be0-c6604cf1e858"
"assets":
  "dashboards":
    "tokumx": "assets/dashboards/tokumx_dashboard.json"
  "integration":
    "auto_install": true
    "configuration":
      "spec": "assets/configuration/spec.yaml"
    "events":
      "creates_events": true
    "metrics":
      "check": "tokumx.uptime"
      "metadata_path": "metadata.csv"
      "prefix": "tokumx."
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_id": !!int "74"
    "source_type_name": "TokuMX"
  "saved_views":
    "tokumx_processes": "assets/saved_views/tokumx_processes.json"
"author":
  "homepage": "https://www.datadoghq.com"
  "name": "Datadog"
  "sales_email": "info@datadoghq.com"
  "support_email": "help@datadoghq.com"
"categories":
- "caching"
- "data stores"
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/tokumx/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "tokumx"
"integration_id": "tokumx"
"integration_title": "TokuMX"
"integration_version": "3.2.0"
"is_public": true
"manifest_version": "2.0.0"
"name": "tokumx"
"public_title": "TokuMX"
"short_description": "Track metrics for opcounters, replication lag, cache table size, and more."
"supported_os":
- "linux"
- "windows"
- "macos"
"tile":
  "changelog": "CHANGELOG.md"
  "classifier_tags":
  - "Category::Caching"
  - "Category::Data Stores"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": "Track metrics for opcounters, replication lag, cache table size, and more."
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": "TokuMX"
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Overview

This check collects TokuMX metrics, including:

- Opcounters.
- Replication lag.
- Cache table utilization and storage size.

## Setup

### Installation

The TokuMX check is included in the [Datadog Agent][1] package. No additional installation is needed on your server.

### Configuration

#### Prepare TokuMX

1. Install the Python MongoDB module on your MongoDB server using the following command:

   ```shell
   sudo pip install --upgrade "pymongo<3.0"
   ```

2. You can verify that the module is installed using this command:

   ```shell
   python -c "import pymongo" 2>&1 | grep ImportError && \
   echo -e "\033[0;31mpymongo python module - Missing\033[0m" || \
   echo -e "\033[0;32mpymongo python module - OK\033[0m"
   ```

3. Start the Mongo shell. In the shell, create a read-only user for the Datadog Agent in the `admin` database:

   ```shell
   # Authenticate as the admin user.
   use admin
   db.auth("admin", "<YOUR_TOKUMX_ADMIN_PASSWORD>")
   # Add a user for Datadog Agent
   db.addUser("datadog", "<UNIQUEPASSWORD>", true)
   ```

4. Verify that you created the user with the following command (not in the Mongo shell).

   ```shell
   python -c 'from pymongo import Connection; print Connection().admin.authenticate("datadog", "<UNIQUEPASSWORD>")' | \
   grep True && \
   echo -e "\033[0;32mdatadog user - OK\033[0m" || \
   echo -e "\033[0;31mdatadog user - Missing\033[0m"
   ```

For more details about creating and managing users in MongoDB, see the [MongoDB Security documentation][2].

{{< tabs >}}
{{% tab "Host" %}}

#### Host

To configure this check for an Agent running on a host:

1. Edit the `tokumx.d/conf.yaml` file in the `conf.d/` folder at the root of your [Agent's configuration directory][1].
   See the [sample tokumx.d/conf.yaml][2] for all available configuration options:

   ```yaml
   init_config:

   instances:
     - server: "mongodb://<USER>:<PASSWORD>@localhost:27017"
   ```

2. [Restart the Agent][3] to start sending TokuMX metrics to Datadog.

[1]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/tokumx/datadog_checks/tokumx/data/conf.yaml.example
[3]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Containerized" %}}

#### Containerized

For containerized environments, see the [Autodiscovery Integration Templates][1] for guidance on applying the parameters below.

| Parameter            | Value                                                      |
| -------------------- | ---------------------------------------------------------- |
| `<INTEGRATION_NAME>` | `tokumx`                                                   |
| `<INIT_CONFIG>`      | blank or `{}`                                              |
| `<INSTANCE_CONFIG>`  | `{"server": "mongodb://<USER>:<PASSWORD>@%%host%%:27017"}` |

[1]: https://docs.datadoghq.com/agent/kubernetes/integrations/
{{% /tab %}}
{{< /tabs >}}

### Validation

[Run the Agent's `status` subcommand][3] and look for `tokumx` under the Checks section.

## Data Collected

### Metrics
{{< get-metrics-from-git "tokumx" >}}


### Events

**Replication state changes**:

This check emits an event each time a TokuMX node has a change in its replication state.

### Service Checks
{{< get-service-checks-from-git "tokumx" >}}


## Troubleshooting

Need help? Contact [Datadog support][4].

## Further Reading

- [Monitor key TokuMX metrics for MongoDB applications][5].


[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.mongodb.com/manual/security/
[3]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.datadoghq.com/help/
[5]: https://www.datadoghq.com/blog/monitor-key-tokumx-metrics-mongodb-applications
