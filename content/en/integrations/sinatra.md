---
title: Sinatra
name: Sinatra
kind: integration
description: 'Gather Sinatra application logs.'
short_description: 'Gather Sinatra application logs.'
categories:
    - log collection
aliases:
    - logs/log_collection/nxlog
has_logo: true
integration_title: Sinatra
is_public: true
public_title: Datadog-Sinatra Integration
dependencies:
    ['https://github.com/DataDog/documentation/blob/master/content/en/integrations/sinatra.md']
supported_os:
    - linux
    - mac_os
    - windows
integration_id: "sinatra"
---

## Overview

This integration enables you to get web access logging from your [Sinatra][1] applications in order to monitor:

- Errors logs (4xx codes, 5xx codes)
- Web pages response time
- Number of requests
- Number of bytes exchanged

## Setup

### Installation

[Install the Agent][2] on the instance that runs your Sinatra application.

### Configuration

The default [Sinatra logging][3] feature logs to stdout. Datadog recommends that you use the [Rack][4] [Common Logger][5] in order to log to a file and in the console.

Here is a configuration example that generate logs in a file and the console. This can be set in the Rack configuration file (`config.ru`) or the configuration block for your Sinatra application.

```ruby
require 'sinatra'

configure do
  # logging is enabled by default in classic style applications,
  # so `enable :logging` is not needed
  file = File.new("/var/log/sinatra/access.log", 'a+')
  file.sync = true
  use Rack::CommonLogger, file
end

get '/' do
  'Hello World'
end
```

More details are available in the [Rack recipes documentation][6].

This logger uses the common Apache Access format and generates logs in the following format:

```text
127.0.0.1 - - [15/Jul/2018:17:41:40 +0000] "GET /uptime_status HTTP/1.1" 200 34 0.0004
127.0.0.1 - - [15/Jul/2018 23:40:31] "GET /uptime_status HTTP/1.1" 200 6997 1.8096
```

#### Log collection

_Available for Agent versions >6.0_

1. Collecting logs is disabled by default in the Datadog Agent. Enable it in your `datadog.yaml` file with:

    ```yaml
    logs_enabled: true
    ```

2. Add this configuration block to your `sinatra.d/conf.yaml` file at the root of your [Agent's configuration directory][7] to start collecting your Sinatra application logs:

    ```yaml
    logs:
      - type: file
        path: /var/log/sinatra/access.log
        source: sinatra
        service: webapp
    ```

      Change the `path` and `service` parameter values and configure them for your environment.

3. [Restart the Agent][8]

[1]: http://sinatrarb.com
[2]: https://app.datadoghq.com/account/settings#agent
[3]: http://sinatrarb.com/intro.html#Logging
[4]: http://rack.github.io
[5]: https://www.rubydoc.info/github/rack/rack/Rack/CommonLogger
[6]: http://recipes.sinatrarb.com/p/middleware/rack_commonlogger
[7]: /agent/guide/agent-configuration-files/#agent-configuration-directory
[8]: /agent/guide/agent-commands/#restart-the-agent
