---
title: Datadog-Sentry Integration
integration_title: Sentry
kind: integration
doclevel: basic
---

{{< img src="integrations/sentry/sentry.png" alt="sentry event" >}}

## Overview

Connect Sentry to Datadog to:

* See exceptions in the stream, in real time
* Search for exceptions in your graphs
* Discuss exceptions with your team


## Installation

Setting up Sentry integration

1. Go into Sentry's settings

2. Check "Webhooks" and click "Save Changes" to install the plugin

3. Click on "WebHooks" and enter this URL in "Repository Name":
https://app.datadoghq.com/intake/webhook/sentry?api_key=<YOUR_DATADOG_API_KEY>

Every time a new exception occurs (or a closed exception re-occurs), it will appear in your stream.

## Adding a host name to Sentry errors (Optional)

Occasionally, the server name which Sentry reports may not match the host name recognized by Datadog. To overcome this, you can manually add the proper host name to use when initializing the Raven client. Datadog looks for a hostname tag first, then falls back to server_name.

### Python

By default, Sentry gets the server_name tag by making a call to socket.gethostname(). To change server_name, add a name keyword when you initialize the Sentry client:
{{< highlight python >}}
client = raven.Client(dsn=dsn, name='host01')
{{< /highlight >}}
To use a different host name while preserving Sentry's server_name, add a tags parameter to the client intialization. This must be a dictionary containing the key hostname and a corresponding host name string. For example:
{{< highlight python >}}
tags = {'hostname': 'host01'}
client = raven.Client(dsn=dsn, tags=tags)
{{< /highlight >}}

### Ruby

To configure an alternate server_name tag for every event, add the tags property like so:
{{< highlight ruby >}}
Raven.configure do |config|
  config.tags = { server_name: "host01" }
end
{{< /highlight >}}
To preserve Sentry's server_name while adding another host name for Sentry, add instead, a hostname key inside tags:
{{< highlight ruby >}}
Raven.configure do |config|
  config.tags = { hostname: "host01" }
end
{{< /highlight >}}