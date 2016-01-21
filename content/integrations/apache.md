---
title: Datadog-Apache Integration
integration_title: Apache
kind: integration
---

### Overview
{:#int-overview}

Get metrics from Apache in real time; graph them and correlate them with other relevant system metrics and events.

  * Visualize your web server performance
  * Correlate the performance of Apache with the rest of your applications


From the open-source Agent:

  * [Apache YAML example][1]
  * [Apache checks.d][2]

The following metrics are collected by default with the Apache integration:

    apache.net.bytes
    apache.net.bytes_per_s
    apache.net.hits
    apache.net.request_per_s
    apache.performance.busy_workers
    apache.performance.cpu_load
    apache.performance.idle_workers
    apache.performance.uptime


### Configuration
{:#int-configuration}

*To capture Apache metrics you need to install the Datadog agent.*

1. **Make sure that [`mod_status`][3] is installed on your Apache server** with `ExtendedStatus` set to `on`
2. Configure the agent to connect to Apache. Edit `/etc/dd-agent/conf.d/apache.yaml`

        init_config:

        instances:
          - apache_status_url: http://example.com/server-status?auto
            # apache_user: example_user
            # apache_password: example_password
            tags:
              - instance:foo
    {:.language-yaml}

3. Restart the agent

        sudo /etc/init.d/datadog-agent restart
    {:.language-shell}

4. Verification:

        sudo /etc/init.d/datadog-agent info
    {:.language-shell}


[1]: https://github.com/DataDog/dd-agent/blob/master/conf.d/apache.yaml.example
[2]: https://github.com/DataDog/dd-agent/blob/master/checks.d/apache.py
[3]: http://httpd.apache.org/docs/2.0/mod/mod_status.html
