---
title: Basic Agent Usage for Puppet
kind: documentation
platform: Puppet
---


## Installing on Puppet

**Requires puppet master/agent version 2.7 or higher**

1. Install the datadog_agent module from the puppet forge on your puppet master.

    ```
    puppet module install datadog-datadog_agent
    ```

    If it is already installed, ensure you get the latest version:
    ```
    puppet module upgrade datadog-datadog_agent
    ```

    If you were previously using a clone of our repository, [click here to see the upgrade instructions](https://forge.puppet.com/datadog/datadog_agent#upgrade-from-previous-git-manual-install-0x-unreleased).

2. To deploy the Datadog agent on nodes, add to your manifests this parametrized class with your API key:
    ```
    node "db1.mydomain.com" {
        class { "datadog_agent":
            api_key => "<YOUR_API_KEY>"
        }
    }
    ```

    The node names you use in your manifests, should be one of the hostnames the Datadog agent knows about (otherwise Datadog cannot group them together). You can check what hostnames the agent is getting by issuing this command (after you had the agent installed):
    ```
    service datadog-agent info
    ```
3. Enable reporting to Datadog on your puppet master, you will get metrics and events after puppet runs:
    ```
    # In your /etc/puppet/puppet.conf, add these parameters
    [master]
    report = true
    reports = datadog_reports
    pluginsync = true

    [agent]
    report = true
    pluginsync = true
    ```
    ```
    # In your manifest add the puppet_run_reports option to your master
    node "puppet" {
        class { "datadog_agent":
            api_key            => "<YOUR_API_KEY>",
            puppet_run_reports => true
        }
    }
    ```

    After that you can run puppet agent on your master and it will install the dependencies on your puppet master. Then restart your master and you will begin to receive puppet data in Datadog.

4. To use a specific agent check or integration on one your nodes, you can refer to each manifest for a sample usage. Here is an example for the elasticsearch integration:
    ```
    node "elastic-node1.mydomain.com" {
        class { "datadog_agent":
            api_key => "<YOUR_API_KEY>"
        }
        include "datadog_agent::integrations::elasticsearch"
    }
    ```