---
"app_id": "openldap"
"app_uuid": "ea3487c9-2c55-417c-bed5-17a42bdf71cf"
"assets":
  "dashboards":
    "OpenLDAP Overview": assets/dashboards/openldap_overview.json
  "integration":
    "auto_install": true
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": false
    "metrics":
      "check": openldap.connections.current
      "metadata_path": metadata.csv
      "prefix": openldap.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10040"
    "source_type_name": OpenLDAP
"author":
  "homepage": "https://www.datadoghq.com"
  "name": Datadog
  "sales_email": info@datadoghq.com
  "support_email": help@datadoghq.com
"categories":
- data stores
- log collection
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/openldap/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "openldap"
"integration_id": "openldap"
"integration_title": "OpenLDAP"
"integration_version": "1.12.0"
"is_public": true
"manifest_version": "2.0.0"
"name": "openldap"
"public_title": "OpenLDAP"
"short_description": "Collect metrics from your OpenLDAP server using the cn=monitor backend"
"supported_os":
- linux
- macos
- windows
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Supported OS::Linux"
  - "Supported OS::macOS"
  - "Supported OS::Windows"
  - "Category::Data Stores"
  - "Category::Log Collection"
  "configuration": "README.md#Setup"
  "description": Collect metrics from your OpenLDAP server using the cn=monitor backend
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": OpenLDAP
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Overview

Use the OpenLDAP integration to get metrics from the `cn=Monitor` backend of your OpenLDAP servers.

## Setup

### Installation

The OpenLDAP integration is packaged with the Agent. To start gathering your OpenLDAP metrics:

1. Have the `cn=Monitor` backend configured on your OpenLDAP servers.
2. [Install the Agent][1] on your OpenLDAP servers.

### Configuration

#### Prepare OpenLDAP

If the `cn=Monitor` backend is not configured on your server, follow these steps:

1. Check if monitoring is enabled on your installation:

   ```shell
    sudo ldapsearch -Y EXTERNAL -H ldapi:/// -b cn=module{0},cn=config
   ```

   If you see a line with `olcModuleLoad: back_monitor.la`, monitoring is already enabled, go to step 3.

2. Enable monitoring on your server:

   ```text
       cat <<EOF | sudo ldapmodify -Y EXTERNAL -H ldapi:///
       dn: cn=module{0},cn=config
       changetype: modify
       add: olcModuleLoad
       olcModuleLoad: back_monitor.la
       EOF
   ```

3. Create an encrypted password with `slappasswd`.
4. Add a new user:

   ```text
       cat <<EOF | ldapadd -H ldapi:/// -D <YOUR BIND DN HERE> -w <YOUR PASSWORD HERE>
       dn: <USER_DISTINGUISHED_NAME>
       objectClass: simpleSecurityObject
       objectClass: organizationalRole
       cn: <COMMON_NAME_OF_THE_NEW_USER>
       description: LDAP monitor
       userPassword:<PASSWORD>
       EOF
   ```

5. Configure the monitor database:

   ```text
       cat <<EOF | sudo ldapadd -Y EXTERNAL -H ldapi:///
       dn: olcDatabase=Monitor,cn=config
       objectClass: olcDatabaseConfig
       objectClass: olcMonitorConfig
       olcDatabase: Monitor
       olcAccess: to dn.subtree='cn=Monitor' by dn.base='<USER_DISTINGUISHED_NAME>' read by * none
       EOF
   ```

#### Configure the OpenLDAP integration

{{< tabs >}}
{{% tab "Host" %}}

#### Host

To configure this check for an Agent running on a host:

###### Metric collection

1. Edit your `openldap.d/conf.yaml` in the `conf.d` folder at the root of your Agent's configuration directory. See the [sample openldap.d/conf.yaml][1] for all available configuration options.

   ```yaml
   init_config:

   instances:
     ## @param url - string - required
     ## Full URL of your ldap server. Use `ldaps` or `ldap` as the scheme to
     ## use TLS or not, or `ldapi` to connect to a UNIX socket.
     #
     - url: ldaps://localhost:636

       ## @param username - string - optional
       ## The DN of the user that can read the monitor database.
       #
       username: "<USER_DISTINGUISHED_NAME>"

       ## @param password - string - optional
       ## Password associated with `username`
       #
       password: "<PASSWORD>"
   ```

2. [Restart the Agent][2].

###### Log collection

_Available for Agent versions >6.0_

1. Collecting logs is disabled by default in the Datadog Agent. Enable it in your `datadog.yaml` file:

   ```yaml
   logs_enabled: true
   ```

2. Add this configuration block to your `openldap.d/conf.yaml` file to start collecting your OpenLDAP logs:

   ```yaml
   logs:
     - type: file
       path: /var/log/slapd.log
       source: openldap
       service: "<SERVICE_NAME>"
   ```

    Change the `path` and `service` parameter values and configure them for your environment. See the [sample openldap.d/conf.yaml][1] for all available configuration options.

3. [Restart the Agent][2].

[1]: https://github.com/DataDog/integrations-core/blob/master/openldap/datadog_checks/openldap/data/conf.yaml.example
[2]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Containerized" %}}

#### Containerized

###### Metric collection

For containerized environments, see the [Autodiscovery Integration Templates][1] for guidance on applying the parameters below.

| Parameter            | Value                                                                                           |
| -------------------- | ----------------------------------------------------------------------------------------------- |
| `<INTEGRATION_NAME>` | `openldap`                                                                                      |
| `<INIT_CONFIG>`      | blank or `{}`                                                                                   |
| `<INSTANCE_CONFIG>`  | `{"url":"ldaps://%%host%%:636","username":"<USER_DISTINGUISHED_NAME>","password":"<PASSWORD>"}` |

###### Log collection

_Available for Agent versions >6.0_

Collecting logs is disabled by default in the Datadog Agent. To enable it, see [Kubernetes Log Collection][2].

| Parameter      | Value                                                 |
| -------------- | ----------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "openldap", "service": "<SERVICE_NAME>"}` |

[1]: https://docs.datadoghq.com/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### Validation

[Run the Agent's status subcommand][2] and look for `openldap` under the Checks section.

## Compatibility

The check is compatible with all major platforms.

## Data Collected

### Metrics
{{< get-metrics-from-git "openldap" >}}


### Events

The openldap check does not include any events.

### Service Checks
{{< get-service-checks-from-git "openldap" >}}


## Troubleshooting

Need help? Contact [Datadog support][3].



[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[3]: https://docs.datadoghq.com/help/
