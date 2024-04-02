---
title: Connect Session Replay To Your Third-Party Tools
kind: guide
further_reading:
- link: '/real_user_monitoring/session_replay/browser/'
  tag: 'Documentation'
  text: 'Learn about Session Replay'
---

## Overview

Session Replay provides visual insights to complement user analytics data. If you are using third-party tools for customer experience, website analytics, and more, you can connect them to Session Replay. This guide walks you through how to access the Session Replay URL to use in integrations, live from the browser where the session is taking place. 

## Use cases

You may want to connect a third-party tool with Session Replay for a more comprehensive view of user experience indicators such as the following:

- Form survey results
- Customer experience tools
- Data analytics

## Get the Session Replay link

To fetch the URL for the current user session's recording, use the following snippet, depending on the installation method you used to set up RUM:

**Note**: Providing a value for `subdomain` when fetching the user session's recording URL is optional, but must be provided if you're accessing Datadog through a custom subdomain and want to see the custom domain in the URL that gets returned.

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.init({
    ...,
    // optional, only needed if using a custom domain name
    subdomain: ''
    ...
});

const url = datadogRum.getSessionReplayLink();
```

{{% /tab %}}

{{% tab "CDN async" %}}

```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
        ...,
        // optional, only needed if using a custom domain name
        subdomain: ''
        ...
    })
    const url = DD_RUM.getSessionReplayLink();
})

```

{{% /tab %}}

{{% tab "CDN sync" %}}

```javascript
window.DD_RUM &&
    window.DD_RUM.init({
        ...,
         // optional, only needed if using a custom domain name
        subdomain: ''
        ...
    });
const url = DD_RUM && DD_RUM.getSessionReplayLink();
```

{{% /tab %}}

{{< /tabs >}}

## Send link to a third-party tool

Once you retrieve the link through the snippet above, you have a few different ways to pass the data, depending on what option(s) your third-party tool offers:

- As a hidden form field.
- As a JSON field.
- Through a URL parameter.
- Directly in your integration of choice in JavaScript.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
