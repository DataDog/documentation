---
categories:
- log collection
- web
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/documentation/blob/master/content/en/integrations/uwsgi.md
description: Collect uWSGI logs in order to track requests per second, bytes served,
  request status, and more.
doc_link: /integrations/uwsgi/
git_integration_title: uwsgi
has_logo: true
integration_id: uwsgi
integration_title: uWSGI
is_public: true
name: uwsgi
public_title: Integration Datadog-uWSGI
short_description: Collect logs to track requests per second, bytes served, request
  status, and more.
supported_os:
- linux
- mac_os
- windows
title: uWSGI
---

## Overview

Collect uWSGI logs in order to track requests per second, bytes served, request status (2xx, 3xx, 4xx, 5xx), service uptime, slowness, and more.

## Setup

### Installation

[Install the agent][1] on the instance that runs the uWSGI server.

### Configuration

By default uWSGI server logs to stdout. Run the following command to start logging to a file or follow [uWSGI instructions to log to a file][2]:

```text
uwsgi --socket :3031 --logger file:logfile=/var/log/uwsgi/uwsgi.log,maxsize=2000000
```

Create the `uwsgi.d/conf.yaml` file in the root of your Agent's configuration directory.

#### Log collection

_Available for Agent versions >6.0_

Collecting logs is disabled by default in the Datadog Agent. Enable it in your `datadog.yaml` file with:

```yaml
logs_enabled: true
```

Then add this configuration block to your `uwsgi.d/conf.yaml` file to start collecting your logs:

```yaml
logs:
    - type: file
      path: /var/log/uwsgi/uwsgi.log
      service: '<MY_APPLICATION>'
      source: uwsgi
```

Finally, [restart the agent][3].

By default the Datadog-uWSGI integration supports the [default uWSGI log format][4] and the [Apache-like combined format][5].

## Troubleshooting

Need help? Contact [Datadog Support][6].

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://uwsgi-docs.readthedocs.io/en/latest/Logging.html#logging-to-files
[3]: /ja/agent/guide/agent-commands/#start-stop-restart-the-agent
[4]: https://uwsgi-docs.readthedocs.io/en/latest/LogFormat.html#uwsgi-default-logging
[5]: https://uwsgi-docs.readthedocs.io/en/latest/LogFormat.html#apache-style-combined-request-logging
[6]: /ja/help/