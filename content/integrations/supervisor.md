---
title: Datadog-Supervisor Integration
integration_title: Supervisor
kind: integration
newhlevel: true
git_integration_title: supervisord
---

# Overview

{{< img src="supervisorevent.png" >}}

Enable the supervisord check to monitor the states of your processes running under supervisord.

For more about using the Supervisor integration, read [the post on our blog](https://www.datadoghq.com/blog/supervisor-monitors-your-processes-datadog-monitors-supervisor/).

# Installation


There are two ways to get started with the supervisord check.

You can configure inet_http_server in /etc/supervisord.conf. Below is an example inet_http_server configuration:

    [inet_http_server]
    port:localhost:9001
    username:user  # optional
    password:pass  # optional

OR, you can use supervisorctl socket to communicate with supervisor. If supervisor is running as root, make sure chmod property is set to a permission accessible to non-root users. See the example below:

    [supervisorctl]
    serverurl=unix:///var/run//supervisor.sock

    [unix_http_server]
    file=/var/run/supervisor.sock
    chmod=777

Reload supervisor and specify the inet or unix socket server information
in the supervisord.yaml file along with an optional list of the processes you want
to monitor per instance.

See [the supervisor configuration docs](http://supervisord.org/configuration.html)for more information on configuring supervisord sockets and inet http servers.

# Configuration

1.  Configure the Agent to connect to the supervisor daemon. Edit conf.d/supervisord.yaml:




        init_config:

        instances:
          - name: server0
            host: localhost
            port: 9001
          - name: server1
            host: localhost
            port: 9002
          - name: server2
            socket: unix:///var/run//supervisor.sock
            host: http://127.0.0.1
    {:.language-yaml}

1.  Restart the Agent

## Configuration Options

* `name` (Required) - An arbitrary name to identify the supervisord server.
* `host` (Optional) - Defaults to localhost. The host where supervisord server is running.
* `port` (Optional) - Defaults to 9001. The port number.
* `user` (Optional) - Username
* `pass` (Optional) - Password
* `proc_names` (Optional) - Dictionary of process names to monitor
* `server_check` (Optional) - Defaults to true. Service check for connection to supervisord server.
* `socket` (Optional) - If using supervisorctl to communicate with supervisor, a socket is needed.

{{< insert-example-links conf="supervisord" check="supervisord" >}}

# Validation

Execute the info command and verify that the integration check has passed. The output of the command should contain a section similar to the following:

    Checks
    ======

      [...]

      supervisord
      -----------
          - instance #0 [OK]
          - Collected 2 metrics & 0 events

## Metrics

<%= get_metrics_from_git() %>
