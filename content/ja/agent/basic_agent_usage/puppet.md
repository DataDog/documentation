---
dependencies:
- "https://github.com/DataDog/puppet-datadog-agent/blob/main/README.md"
title: Puppet
---
This module installs the Datadog Agent and sends Puppet reports to Datadog.

### Requirements

The Datadog Puppet module supports Linux and Windows and is compatible with Puppet >= 4.6.x or Puppet Enterprise version >= 2016.4. For detailed information on compatibility, check the [module page on Puppet Forge][1].

### Installation

Install the [datadog_agent][1] Puppet module in your Puppet master's module path:

```shell
puppet module install datadog-datadog_agent
```

#### Upgrading

- By default Datadog Agent v7.x is installed. To use an earlier Agent version, change the setting `agent_major_version`.
- `agent5_enable` is no longer used, as it has been replaced by `agent_major_version`.
- `agent6_extra_options` has been renamed to `agent_extra_options` since it applies to both Agent v6 and v7.
- `agent6_log_file` has been renamed to `agent_log_file` since it applies to both Agent v6 and v7.
- `agent5_repo_uri` and `agent6_repo_uri` become `agent_repo_uri` for all Agent versions.
- `conf_dir` and `conf6_dir` become `conf_dir` for all Agent versions.
- The repository file created on Linux is named `datadog` for all Agent versions instead of `datadog5`/`datadog6`.

### Configuration

Once the `datadog_agent` module is installed on your `puppetserver`/`puppetmaster` (or on a masterless host), follow these configuration steps:

1. Obtain your [Datadog API key][2].
2. Add the Datadog class to your node manifests (eg: `/etc/puppetlabs/code/environments/production/manifests/site.pp`).

    ```conf
    class { 'datadog_agent':
        api_key => "<YOUR_DD_API_KEY>",
    }
    ```

    If using a Datadog site other than the default 'datadoghq.com', set it here as well:

    ```conf
    class { 'datadog_agent':
        api_key => "<YOUR_DD_API_KEY>",
        datadog_site => "datadoghq.eu",
    }
    ```

    For CentOS/RHEL versions <7.0 and for Ubuntu < 15.04, specify the service provider as `upstart`:

    ```conf
    class { 'datadog_agent':
        api_key => "<YOUR_DD_API_KEY>",
        service_provider => 'upstart'
    }
    ```

    See the [Configuration variables](#configuration-variables) section for list of arguments you can use here.

4. (Optional) Include any integrations you want to use with the Agent. The following example installs the mongo integration:

    ```conf
    class { 'datadog_agent::integrations::mongo':
        # integration arguments go here
    }
    ```

    See the [comments in code][6] for all arguments available for a given integration.

    If an integration does not have a [manifest with a dedicated class][7], you can still add a configuration for it. Below is an example for the `ntp` check:

    ```conf
    class { 'datadog_agent':
        api_key      => "<YOUR_DD_API_KEY>",
        integrations => {
            "ntp" => {
                init_config => {},
                instances => [{
                    offset_threshold => 30,
                }],
            },
        },
    }
    ```

5. (Optional) To collect metrics and events about Puppet itself, see the section about [Reporting](#reporting).

### Upgrading integrations

To install and pin specific integration versions, use `datadog_agent::install_integration`. This calls the `datadog-agent integration` command to ensure a specific integration is installed or uninstalled, for example:

```conf
datadog_agent::install_integration { "mongo-1.9":
    ensure => present,
    integration_name => 'datadog-mongo',
    version => '1.9.0',
    third_party => false,
}
```

The `ensure` argument can take two values:

- `present` (default)
- `absent` (removes a previously pinned version of an integration)

To install a third-party integration (eg: from the marketplace) set the `third_party` argument to `true`.

Note it's not possible to downgrade an integration to a version older than the one bundled with the Agent.

### Reporting

To enable reporting of Puppet runs to your Datadog timeline, enable the report processor on your Puppet master and reporting for your clients. The clients send a run report after each check-in back to the master.

1. Set the `puppet_run_reports` option to true in the node configuration manifest for your master:

    ```ruby
    class { 'datadog-agent':
      api_key            => '<YOUR_DD_API_KEY>',
      puppet_run_reports => true
      # ...
    }
    ```

    The dogapi gem is automatically installed. Set `manage_dogapi_gem` to false if you want to customize the installation.

2. Add these configuration options to the Puppet master config (eg: `/etc/puppetlabs/puppet/puppet.conf`):

    ```ini
    [main]
    # No modification needed to this section
    # ...

    [master]
    # Enable reporting to Datadog
    reports=datadog_reports
    # If you use other reports, add datadog_reports to the end,
    # for example: reports=store,log,datadog_reports
    # ...

    [agent]
    # ...
    report=true
    ```

With the [`ini_setting` module](https://forge.puppet.com/modules/puppetlabs/inifile):

```puppet
  ini_setting { 'puppet_conf_master_report_datadog_puppetdb':
    ensure  => present,
    path    => '/etc/puppetlabs/puppet/puppet.conf',
    section => 'master',
    setting => 'reports',
    value   => 'datadog_reports,puppetdb',
    notify  => [
      Service['puppet'],
      Service['puppetserver'],
    ],
  }
```

3. On all of your Puppet client nodes, add the following in the same location:

    ```ini
    [agent]
    # ...
    report=true
    ```

With the [`ini_setting` module](https://forge.puppet.com/modules/puppetlabs/inifile):

```puppet
  ini_setting { 'puppet_conf_agent_report_true':
    ensure  => present,
    path    => '/etc/puppetlabs/puppet/puppet.conf',
    section => 'agent',
    setting => 'report',
    value   => 'true',
    notify  => [
      Service['puppet'],
    ],
  }
```

4. (Optional) Enable tagging of reports with facts:

    You can add tags to reports that are sent to Datadog as events. These tags can be sourced from Puppet facts for the given node the report is regarding. These should be 1:1 and not involve structured facts (hashes, arrays, etc.) to ensure readability. To enable regular fact tagging, set the parameter `datadog_agent::reports::report_fact_tags` to the array value of facts—for example `["virtual","operatingsystem"]`. To enable trusted fact tagging, set the parameter `datadog_agent::reports::report_trusted_fact_tags` to the array value of facts—for example `["certname","extensions.pp_role","hostname"]`.

    NOTE: Changing these settings requires a restart of pe-puppetserver (or puppetserver) to re-read the report processor. Ensure the changes are deployed prior to restarting the service(s).

    Tips:
    - Use dot index to specify a target fact; otherwise, the entire fact data set becomes the value as a string (not very useful)
    - Do not duplicate common data from monitoring like hostname, uptime, memory, etc.
    - Coordinate core facts like role, owner, template, datacenter, etc., that help you build meaningful correlations to the same tags from metrics

5. Verify your Puppet data is in Datadog by searching for `sources:puppet` in the [Event Stream][5].

### NPM setup

To enable the Datadog Agent Network Performance Monitoring (NPM) features follow these steps:

1. (Windows only) If the Agent is already installed, uninstall it by passing `win_ensure => absent` to the main class and removing other classes' definitions.
2. (Windows only) Pass the `windows_npm_install` option with value `true` to the `datadog::datadog_agent` class. Remove `win_ensure` if added on previous step.
3. Use the `datadog_agent::system_probe` class to properly create the configuration file:

```conf
class { 'datadog_agent::system_probe':
    network_enabled => true,
}
```

### USM setup

To enable the Datadog Agent Universal Service Monitoring (USM) use the `datadog_agent::system_probe` class to properly create the configuration file:

```conf
class { 'datadog_agent::system_probe':
    service_monitoring_enabled => true,
}
```

### Troubleshooting

You can run the Puppet Agent manually to check for errors in the output:

    ```shell
    sudo systemctl restart puppetserver
    sudo puppet agent --onetime --no-daemonize --no-splay --verbose
    ```

     Example response:

    ```text
    info: Retrieving plugin
    info: Caching catalog for alq-linux.dev.datadoghq.com
    info: Applying configuration version '1333470114'
    notice: Finished catalog run in 0.81 seconds
    ```

If you see the following error, ensure `reports=datadog_reports` is defined in `[master]`, not `[main]`.

    ```text
    err: Could not send report:
    Error 400 on SERVER: Could not autoload datadog_reports:
    Class Datadog_reports is already defined in Puppet::Reports
    ```

If you don't see any reports coming in, check your Puppet server logs.

### Masterless Puppet

1. The Datadog module and its dependencies have to be installed on all nodes running masterless.
2. Add this to each node's `site.pp` file:
    ```conf
    class { "datadog_agent":
        api_key            => "<YOUR_DD_API_KEY>",
        puppet_run_reports => true
    }
   ```

3. Run puppet in masterless configuration:
    ```shell
    puppet apply --modulepath <path_to_modules> <path_to_site.pp>
    ```

### Tagging client nodes

The Datadog Agent configuration file is recreated from the template every Puppet run. If you need to tag your nodes, add an array entry in Hiera:

```conf
datadog_agent::tags:
- 'keyname:value'
- 'anotherkey:%{factname}'
```
To generate tags from custom facts classify your nodes with Puppet facts as an array to the ```facts_to_tags``` paramter either through the Puppet Enterprise console or Hiera. Here is an example:

```conf
class { "datadog_agent":
  api_key            => "<YOUR_DD_API_KEY>",
  facts_to_tags      => ["os.family","networking.domain","my_custom_fact"],
}
```

Tips:

1. For structured facts index into the specific fact value otherwise the entire array comes over as a string and ultimately be difficult to use.
2. Dynamic facts such as CPU usage, Uptime, and others that are expected to change each run are not ideal for tagging. Static facts that are expected to stay for the life of a node are best candidates for tagging.

### Configuration variables

These variables can be set in the `datadog_agent` class to control settings in the Agent. See the [comments in code][8] for the full list of supported arguments.

| variable name                           | description                                                                                                                                                                                      |
|-----------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `agent_major_version`                   | The version of the Agent to install: either 5, 6 or 7 (default: 7).                                                                                                                              |
| `agent_version`                         | Lets you pin a specific minor version of the Agent to install, for example: `1:7.16.0-1`. Leave empty to install the latest version.                                                             |
| `collect_ec2_tags`                      | Collect an instance's custom EC2 tags as Agent tags by using `true`.                                                                                                                             |
| `collect_instance_metadata`             | Collect an instance's EC2 metadata as Agent tags by using `true`.                                                                                                                                |
| `datadog_site`                          | The Datadog site to report to (Agent v6 and v7 only). Defaults to `datadoghq.com`, eg: `datadoghq.eu` or `us3.datadoghq.com`.                                                          |
| `dd_url`                                | The Datadog intake server URL. You are unlikely to need to change this. Overrides `datadog_site`                                                                                                 |
| `host`                                  | Overrides the node's host name.                                                                                                                                                                  |
| `local_tags`                            | An array of `<KEY:VALUE>` strings that are set as tags for the node.                                                                                                                             |
| `non_local_traffic`                     | Allow other nodes to relay their traffic through this node.                                                                                                                                      |
| `apm_enabled`                           | A boolean to enable the APM Agent (defaults to false).                                                                                                                                           |
| `process_enabled`                       | A boolean to enable the process Agent (defaults to false).                                                                                                                                       |
| `scrub_args`                            | A boolean to enable the process cmdline scrubbing (defaults to true).                                                                                                                            |
| `custom_sensitive_words`                | An array to add more words beyond the default ones used by the scrubbing feature (defaults to `[]`).                                                                                             |
| `logs_enabled`                          | A boolean to enable the logs Agent (defaults to false).                                                                                                                                          |
| `windows_npm_install`                   | A boolean to enable the Windows NPM driver installation (defaults to false).                                                                                                                     |
| `win_ensure`                            | An enum (present/absent) to ensure the presence/absence of the Datadog Agent on Windows (defaults to present)                                                                                    |
| `container_collect_all`                 | A boolean to enable logs collection for all containers.                                                                                                                                          |
| `agent_extra_options`<sup>1</sup>       | A hash to provide additional configuration options (Agent v6 and v7 only).                                                                                                                       |
| `hostname_extraction_regex`<sup>2</sup> | A regex used to extract the hostname captured group to report the run in Datadog instead of reporting the Puppet nodename, for example:<br>`'^(?<hostname>.*\.datadoghq\.com)(\.i-\w{8}\..*)?$'` |

(1) `agent_extra_options` is used to provide a fine grain control of additional Agent v6/v7 config options. A deep merge is performed that may override options provided in the `datadog_agent` class parameters. For example:

```
class { "datadog_agent":
    < your other arguments to the class >,
    agent_extra_options => {
        use_http => true,
        use_compression => true,
        compression_level => 6,
    },
}
```

(2) `hostname_extraction_regex` is useful when the Puppet module and the Datadog Agent are reporting different host names for the same host in the infrastructure list.

[1]: https://forge.puppet.com/datadog/datadog_agent
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://github.com/DataDog/dogapi-rb
[4]: https://app.datadoghq.com/account/settings#integrations
[5]: https://app.datadoghq.com/event/stream
[6]: https://github.com/DataDog/puppet-datadog-agent/blob/master/manifests/integrations/mongo.pp
[7]: https://github.com/DataDog/puppet-datadog-agent/tree/master/manifests/integrations
[8]: https://github.com/DataDog/puppet-datadog-agent/blob/master/manifests/init.pp
