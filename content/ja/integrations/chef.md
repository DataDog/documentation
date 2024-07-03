---
aliases:
- /ja/guides/chef/
categories:
- automation
- configuration & deployment
- issue tracking
- log collection
- provisioning
custom_kind: インテグレーション
dependencies: []
description: Chef クライアントの実行を追跡。失敗、成功、大きな変更を把握。
doc_link: https://docs.datadoghq.com/integrations/chef/
draft: false
git_integration_title: chef
has_logo: true
integration_id: chef
integration_title: Chef
integration_version: ''
is_public: true
manifest_version: '1.0'
name: chef
public_title: Datadog-Chef Integration
short_description: 'Track Chef client runs: know when they fail, succeed, or make
  big changes.'
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
{{< img src="integrations/chef/chefdashboard.png" alt="Chef Event" popup="true">}}

## Overview

Chef is a popular configuration management tool written in Ruby and Erlang.

Deploying Datadog with Chef is meant to be very simple, and provide you with a method of getting the value of monitoring across all of your infrastructure as simply as possible.

Datadog also provides a Chef [Execution and Report Handler][1] that can capture `chef-client` failures as well as metrics related to the Chef run, such as timing and resources updated.

## Setup

### Deploying the Agent

The [Datadog Chef cookbook][2] is available to automate your Datadog Agent installation and configuration.

Install the latest released version of the Datadog Chef cookbook from the [Supermarket][2] with knife, and upload to your Chef Server:

```text
knife cookbook site install datadog
knife cookbook upload datadog
```

And follow the instructions for your tool to upload the cookbook to your Chef Server.

Before adding the cookbook's recipe to your node's `run_list`, you must add your Datadog account credentials such as API keys using Chef attributes.

This is commonly done with `role` or `environment` files, or another cookbook declaring the attributes.

Here is an example of a `base.rb` role file, typically applied to every host in an organization.

```ruby
name 'base'
description 'base role, runs on every node'
run_list(
  'ntp',
  'datadog::dd-agent',
  'some_other_base_cookbook::recipe'
)
default_attributes(
  'datadog' => {
    'api_key' => "PUT_YOUR_API_KEY_HERE",
    'application_key' => "PUT_YOUR_APPLICATION_KEY_HERE"
  }
)
```

**Note**: There are two keys needed. Your Datadog [API key][3] and [application key][4].

Provide both values in the attributes as shown above.

Then upload your role file to Chef Server like so:

```text
knife role from file roles/base.rb
```

The next time Chef runs, it installs the Agent and sets the configuration file with the API and application keys.

**NOTE:** If you are using another cookbook to define these attributes, use a higher attribute precedence level than `default`.

### Report handler

Datadog offers a Chef report handler which reports metrics and events from your Chef runs to Datadog. Once installed the report handler submits metrics on Chef run timing and resource changes. Events are also created to allow tracking of Chef run success and failure rates.

This has the added value of bringing the output of a Chef run back to Datadog's Event stream, so failures can be highlighted quickly, discussed amongst the team, and resolved.

Successes are found under "Low" priority, whereas failures are of "Normal" priority, and when the same node passes the Chef run, then it is put pack into "Low" priority.

Adding the handler is very simple, as you can see in this role snippet:

```ruby
name 'base'
description 'base role, runs on every node'
run_list(
  'datadog::dd-handler',
  'ntp',
  'datadog::dd-agent',
  'some_other_base_cookbook::recipe'
)
default_attributes(
  'datadog' => {
    'api_key' => "<DATADOG_API_KEY>",
    'application_key' => "<DATADOG_APPLICATION>"
  }
)
```

 In this example, the `datadog::dd-handler` recipe was added to the beginning of the node's run list. Adding it to the beginning allows the handler to capture details about everything in it observes after being invoked, so if you added it to the end of the `run_list` and something failed prior to it being executed, you may not receive the full output.

Once set, upload the role to your Chef Server, and wait. After Chef has run on a few hosts, a new automatic Dashboard is created, with the relevant Chef metrics. You can find it in your [Dashboards List][5], on the right-hand side.

### Sending Chef metrics to Datadog.

1. If you are using Berkshelf, add the cookbook to your Berksfile:

    ```text
    cookbook 'datadog'
    ```

    Otherwise, install the cookbook in to your repository using Knife:

    ```text
    knife cookbook site install datadog
    ```

2. Set the Datadog-specific attributes in either a role, environment or another recipe:

    ```conf
    # Make sure you replace the API and application key below
    # with the ones for your account

    node.default['datadog']['<API_KEY>'] = "<DATADOG_API_KEY>"

    # Use an existing application key or create a new one for Chef
    node.default['datadog']['<APPLICATION_KEY>] ="<DATADOG_APP_KEY>"
    ```

3. Upload the updated cookbook to your Chef server

    ```bash
    berks upload
    # or
    knife cookbook upload datadog

    knife cookbook list | grep datadog && \
    echo -e "\033[0;32mdatadog cookbook - OK\033[0m" || \
    echo -e "\033[0;31mmissing datadog cookbook - OK\033[0m"
    ```

    The cookbook is ready to be applied to your nodes.

4. Once uploaded, add it to your node's run_list or role:

    ```conf
    "run_list": [
      "recipe[datadog::dd-handler]"
    ]
    ```

5. Wait for the next scheduled chef-client run.

### Log collection

Log collection is available with Agent v6.0+, see [attributes/default.rb][6] to enable it. For more details, see the [setup example](#customizations) below.

### Validation

From your [events stream][7], enter `sources:chef` in the search bar. Your Chef runs should appear.

## Data Collected

### Metrics

{{< get-metrics-from-git >}}

## Further Reading

### Customizations

The Datadog Chef Cookbook provides more integration-specific recipes.

Including one of these recipes in your run list installs any monitoring dependencies, such as any Python modules that are required to monitor that service, as well as write out the correct configuration file.

Here's an example of extending a `webserver.rb` role file to automatically monitor Apache with Datadog:

```ruby
name 'webserver'
description 'Webserver role, runs apache'
run_list(
  'apache2',
  'datadog::apache',
)
default_attributes(
  'apache' => {
    'ext_status' => true,
  }
  'datadog' => {
    'apache' => {
      'instances' => [
        { 'status_url' => 'http://localhost:8080/server-status/',
          'tags' => ['extra_tag', 'env:example'] }
      ],
      'logs' => [
        { 'type' => 'file',
          'path' => '/var/log/apache2/access.log',
          'source' => 'apache',
          'service' => 'myapp',
          'sourcecategory' => 'http_web_access',
          'tags' => ['extra_tag', 'env:example'] },
        { 'type' => 'file',
          'path' => '/var/log/apache2/error.log',
          'source' => 'apache',
          'service' => 'myapp',
          'sourcecategory' => 'http_web_access',
          'tags' => ['extra_tag', 'env:example'] }
      ]
    }
  }
)
```

In this example, the `datadog::apache` recipe was added to the run list along with some attributes to control what instances of Apache should be monitored by Datadog.

Read each recipe file for the exact details of the integration values to pass into the `instances` part of the attributes.

[1]: https://docs.chef.io/handlers.html
[2]: https://supermarket.chef.io/cookbooks/datadog
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: https://app.datadoghq.com/organization-settings/application-keys
[5]: https://app.datadoghq.com/dashboard/lists
[6]: https://github.com/DataDog/chef-datadog/blob/v2.15.0/attributes/default.rb#L383-L388
[7]: https://app.datadoghq.com/event/stream