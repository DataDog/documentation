---
title: Setting up Network Checks
kind: guide
listorder: 7
sidebar:
  nav:
    - header: Guide to Network Checks
    - text: Overview
      href: "#overview"
    - text: Setup
      href: "#setup"
    - text: Configuration
      href: "#config"
    - text: HTTP Check Configuration
      href: "#http_config"
    - text: TCP Check Configuration
      href: "#tcp_config"
---

<div class="alert alert-block" id="service_check_message" style="display:none">
"Service Checks" have been renamed to "Network Checks". Service Checks
now refers to statuses sent by the Agent. Refer to the
<a href="/guides/monitoring">Guide to Monitoring</a> for more information.
</div>

<!--
======================================================
OVERVIEW
======================================================
-->

<h3 id="overview">Overview</h3>

In this guide, we will show you how you can setup some service checks
to monitor your service and to be notified when one goes down.

Network checks run in the Agent and are called in the main loop but will be
processed in separate threads so they don't block the Agent.

A network check can be marked as either <b>UP</b> or <b>DOWN</b>.

Network checks produce statuses that can be monitored using the
monitor editor. Read the
<a href="/guides/monitoring#network"> guide to monitoring</a> for
further information on setting up Network service monitors.

<!--
======================================================
SETUP
======================================================
-->

<h3 id="setup">Setup</h3>

If you have not already setup the Agent, then you should check out the Agent
setup instructions available at: <a href="http://app.datadoghq.com/account/settings#agent">http://app.datadoghq.com/account/settings#agent</a>.
This page will guide you through installing the Agent for your particular OS.

If you run into any issues during the setup, don't hesistate to pop by our
chat room, <a href="irc://irc.freenode.net/datadog">#datadog on freenode</a>,
where we'll be happy to answer any questions you might have. (There's a
<a href="http://webchat.freenode.net/?randomnick=1&channels=datadog&prompt=1">
web chat client, too</a>.)

<!--
======================================================
CONFIGURATION
======================================================
-->

<h3 id="config">Configuration</h3>

There are currently two types of service checks:

- HTTP(S) checks
- TCP checks

As service checks are also Agent checks, they are configured <a href="http://docs.datadoghq.com/guides/agent_checks/#config">the same way</a>.

Each check will have a configuration file that will be placed in the `conf.d`
directory. Configuration is written using [YAML](http://www.yaml.org/).

HTTP(S) Check configuration file must be named http_check.yaml
TCP Check configuration file must be named tcp_check.yaml.

<!--
======================================================
HTTP CHECK CONFIGURATION
======================================================
-->

<h3 id="http_config">HTTP Check Configuration</h3>



The HTTP(S) Check configuration file has the following structure:

<%= snippet_code_block("guides-http_check-config.yaml", :nocomments => true) %>

<div class="alert alert-block">Note: Your YAML files must use spaces instead of tabs.</div>

#### instances

The *instances* section is a list of instances that this check will be run
against with the needed parameters.

List of parameters:

- name <b>(mandatory)</b>: A name that must be unique across all your HTTP checks
- url <b>(mandatory)</b>: The url you want to monitor (Only GET is supported at this time)
- username (optional): If you want to test pages protected by a basic authentication.
- password (optional): If you want to test pages protected by a basic authentication.
- timeout (optional): A timeout for the request, defaulting to 10 seconds.
A service will be marked as down if the request times out

#### Custom triggering:

Using the `window` and `threshold` parameters,
you can tell the service to <em>only</em> send a CRITICAL if the check fails `x` times within
the last `y` attempts where `x` is the `threshold` and `y` is the `window`.

For example, if you have the following configuration for window and threshold:

<%= snippet_code_block("guides-http_check-notify.yaml", :nocomments => true) %>

You will only be notified if the check fails 3 times within the last 5 tries.

A success is any valid HTTP code less than 400.

<!--
======================================================
TCP CHECK CONFIGURATION
======================================================
-->

<h3 id="tcp_config">TCP Check Configuration</h3>

The TCP Check configuration file has the following structure:

<%= snippet_code_block("guides-tcp_check-config.yaml", :nocomments => true) %>

#### instances

The *instances* section is a list of instances that this check will be run
against with the needed parameters.

List of parameters:

- name <b>(mandatory)</b>: A name that must be unique across all your TCP checks
- host <b>(mandatory)</b>: The hostname or IP (v4 or v6) address you want to monitor
- port <b>(mandatory)</b>: The port on which the check will try to connect to
- timeout (optional): A timeout for the request, defaulting to 10 seconds.
A service will be marked as down if the request times out

#### Custom triggering:

Using the `window` and `threshold` parameters,
you can tell the service to <em>only</em> send a CRITICAL if the check fails `x` times within
the last `y` attempts where `x` is the `threshold` and `y` is the `window`.

For example, if you have the following configuration for window and threshold:

<%= snippet_code_block("guides-tcp_check-notify.yaml", :nocomments => true) %>

You will only be notified if the check fails 3 times within the last 5 tries.


<% content_for :javascript do %>
<script>
  $(function() {
    // Show the name change message if redirected from the old service checks page.
    if (window.location.href.indexOf('?sc') > 0) {
      $('#service_check_message').show();
    }
  });
</script>
<% end %>

