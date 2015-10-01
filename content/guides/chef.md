---
title: Deploying the Agent with Chef
kind: guide
listorder: 8
sidebar:
  nav:
    - header: Guide to Chef
    - text: Overview
      href: "#overview"
    - text: Deploying the Agent
      href: "#deployagent"
    - text: Deploying the Handler
      href: "#deployhandler"
    - text: Customizations
      href: "#customizations"
---

<!--
======================================================
OVERVIEW
======================================================
-->

<h3 id="overview">Overview</h3>

In this guide, we will explore how to leverage [Chef](https://www.chef.io/chef/)
to automate installation of the Datadog Agent

Deploying Datadog with Chef is meant to be very simple, and provide you with a method of getting the value of monitoring across all of your infrastructure as simply as possible.

We also provide a Chef [Execution and Report Handler](https://docs.chef.io/handlers.html) that can capture `chef-client` failures as well as metrics related to the Chef run, such as timing and resources updated.

<!--
======================================================
DEPLOYING THE AGENT
======================================================
-->

<h3 id="deployagent">Deploying the Agent</h3>

We created a cookbook to assist with Agent deployment.

Install the latest released version of the Datadog Chef cookbook from the [Community Site](https://supermarket.chef.io/cookbooks/datadog) via knife, and upload to your Chef Server:

    knife cookbook site install datadog
    knife cookbook upload datadog

You may also be using another tool to manage your cookbook workflow, such as [Berkshelf](http://berkshelf.com/) or [Librarian Chef](https://github.com/applicationsonline/librarian-chef), in which case you will need to add a line like this to your Berksfile/Cheffile:

    cookbook 'datadog'

And follow the instructions for your tool to upload the cookbook to your Chef Server.

Before adding the cookbook's recipe to your node's `run_list`, you need to add account-specific details to be provided to the Agent configuration file.

This is commonly done via `role` or `environment` files, or another cookbook declaring the attributes.

Here is an example of a `base.rb` role file, typically applied to every host in an organization.

<%= snippet_code_block("guides-chef-base-role-agent.rb") %>

Note that there are two keys needed. Your API Key can be found in Datadog, under the Integrations => API menu item, or click [this link](https://app.datadoghq.com/account/settings#api) to log in and go there directly.

Then, on the same page, you must create an Application Key for use with Chef. You may name the key whatever you wish, we recommend something like 'chef_appkey' or something of that nature.

Provide both values in the attributes as shown above.

Then upload your role file to Chef Server like so:

    knife role from file roles/base.rb

The next time Chef runs, it should install the Agent and set the configuration file with the API and application keys.

**NOTE:** If you are using another cookbook to define these attributes, use a higher attribute precedence level than `default`.

<!--
======================================================
DEPLOYING THE HANDLER
======================================================
-->

<h3 id="deployhandler">Deploying the Handler</h3>

In order to further raise the visibility of your Chef runs, you may use the Datadog Chef Handler to monitor your Chef execution.

This has the added value of bringing the output of a Chef run back to Datadog's Event stream, so failures can be highlighted quickly, discussed amongst the team, and resolved.

Successes typically will be found in the "Low" priority, whereas failures are of "Normal" priority, and when the same node passes the Chef run, then it is put pack into "Low" priority.

Adding the handler is very simple, as you can see in this role snippet:

<%= snippet_code_block("guides-chef-base-role-handler.rb") %>

All we've done is add the `datadog::dd-handler` recipe to the beginning of the node's run list. Adding it to the beginning allows the handler to capture details about everything in it observes after being invoked, so if you added it to the end of the `run_list` and something failed prior to it being executed, you may not receive the full output.

Once set, upload the role to your Chef Server, and wait. After Chef has run on a few hosts, a new automatic Dashboard will be created, with the relevant Chef Metrics. You can find it in your [Dashboards List](https://app.datadoghq.com/dash/list), on the right-hand side.

<!--
======================================================
CUSTOMIZATIONS
======================================================
-->

<h3 id="customizations">Customizations</h3>

The Datadog Chef Cookbook provides more integration-specific recipes.

Including one of these recipes in your run list will install any monitoring dependencies, such as any Python modules that are required to monitor that service, as well as write out the correct configuration file.

Here's an example of how we've extended a `webserver.rb` role file to automatically monitor Apache via Datadog:

<%= snippet_code_block("guides-chef-integration-apache.rb", :nocomments => true) %>

As you can see, we've added the `datadog::apache` recipe to the run list, and provided some attributes to control what instances of Apache should be monitored by Datadog.

Read each recipe file for the exact details of the integration values to pass into the `instances` part of the attributes.
