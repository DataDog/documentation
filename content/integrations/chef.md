---
title: Datadog-Chef Integration
integration_title: Chef
kind: integration
git_integration_title: chef
newhlevel: true
updated_for_agent: 5.8.5
aliases:
  - /guides/chef/
description: "Track Chef client runs including metrics on completion times, analytics on resource changes, and success rates."
---

{{< img src="integrations/chef/chefdashboard.png" alt="Chef Event" responsive="true" >}}

## Overview

Chef is a popular configuration management tool written in Ruby and Erlang. 

Deploying Datadog with Chef is meant to be very simple, and provide you with a method of getting the value of monitoring across all of your infrastructure as simply as possible.

We also provide a Chef [Execution and Report Handler](https://docs.chef.io/handlers.html) that can capture `chef-client` failures as well as metrics related to the Chef run, such as timing and resources updated.

## Setup
### Deploying the Agent

The [Datadog Chef cookbook](https://supermarket.chef.io/cookbooks/datadog) is available to automate your Datadog Agent installation and configuration.

Install the latest released version of the Datadog Chef cookbook from the [Supermarket](https://supermarket.chef.io/cookbooks/datadog) via knife, and upload to your Chef Server:

    knife cookbook site install datadog
    knife cookbook upload datadog

And follow the instructions for your tool to upload the cookbook to your Chef Server.

Before adding the cookbook's recipe to your node's `run_list`, you must add your Datadog account credentials such as API keys via Chef attributes.

This is commonly done via `role` or `environment` files, or another cookbook declaring the attributes.

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

Note that there are two keys needed. Your API Key can be found in Datadog, under the Integrations => API menu item, or click [this link](https://app.datadoghq.com/account/settings#api) to log in and go there directly.

Then, on the same page, you must create an Application Key for use with Chef. You may name the key whatever you wish, we recommend something like 'chef_appkey' or something of that nature.

Provide both values in the attributes as shown above.

Then upload your role file to Chef Server like so:

    knife role from file roles/base.rb

The next time Chef runs, it will install the Agent and set the configuration file with the API and application keys.

**NOTE:** If you are using another cookbook to define these attributes, use a higher attribute precedence level than `default`.

### Report Handler

Datadog offers a Chef Report Handler which reports metrics and events from your Chef runs to Datadog. Once installed the report handler will submit metrics on Chef run timing and resource changes. Events are also created to allow tracking of Chef run success and failure rates.

This has the added value of bringing the output of a Chef run back to Datadog's Event stream, so failures can be highlighted quickly, discussed amongst the team, and resolved.

Success will be found in the "Low" priority, whereas failures are of "Normal" priority, and when the same node passes the Chef run, then it is put pack into "Low" priority.

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
    'api_key' => "PUT_YOUR_API_KEY_HERE",
    'application_key' => "PUT_YOUR_APPLICATION_KEY_HERE"
  }
)
```

All we've done is add the `datadog::dd-handler` recipe to the beginning of the node's run list. Adding it to the beginning allows the handler to capture details about everything in it observes after being invoked, so if you added it to the end of the `run_list` and something failed prior to it being executed, you may not receive the full output.

Once set, upload the role to your Chef Server, and wait. After Chef has run on a few hosts, a new automatic Dashboard will be created, with the relevant Chef Metrics. You can find it in your [Dashboards List](https://app.datadoghq.com/dash/list), on the right-hand side.


### Sending Chef metrics to Datadog.

1.  If you are using Berkshelf, add the cookbook to your Berksfile:

        cookbook 'datadog'

    Otherwise, install the cookbook in to your repository using Knife:

        knife cookbook site install datadog

1.  Set the Datadog-specific attributes in either a role, environment or another recipe:

        # Make sure you replace the API and application key below
        # with the ones for your account

        node.default['datadog']['api_key'] = "9775a026f1ca7d1c6c5af9d94d9595a4"

        # Use an existing application key or create a new one for Chef
        node.default['datadog']['application_key'] ="87ce4a24b5553d2e482ea8a8500e71b8ad4554ff"

1.  Upload the updated cookbook to your Chef server

        berks upload
        # or
        knife cookbook upload datadog

        knife cookbook list | grep datadog && \
        echo -e "\033[0;32mdatadog cookbook - OK\033[0m" || \
        echo -e "\033[0;31mmissing datadog cookbook - OK\033[0m"

    The cookbook is now ready to be applied to your nodes.

1.  Once uploaded, add it to your node's run_list or role:

        "run_list": [
          "recipe[datadog::dd-handler]"
        ]

1.  Wait for the next scheduled chef-client run.

### Validation

From your [events stream](https://app.datadoghq.com/event/stream), enter `sources:chef` in the search bar. Your Chef runs should appear.

## Data Collected
### Metrics

{{< get-metrics-from-git >}}

## Furter Reading
### Customizations

The Datadog Chef Cookbook provides more integration-specific recipes.

Including one of these recipes in your run list will install any monitoring dependencies, such as any Python modules that are required to monitor that service, as well as write out the correct configuration file.

Here's an example of how we've extended a `webserver.rb` role file to automatically monitor Apache via Datadog:

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
      ]
    }
  }
)
```

As you can see, we've added the `datadog::apache` recipe to the run list, and provided some attributes to control what instances of Apache should be monitored by Datadog.

Read each recipe file for the exact details of the integration values to pass into the `instances` part of the attributes.