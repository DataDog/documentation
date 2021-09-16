---
title: Content Security Policy (CSP)
kind: faq
further_reading:
    - link: '/logs/log_collection/javascript/'
      tag: 'Get Started'
      text: 'Browser Log Collection'
---

If you are using [Content Security Policy (CSP)][1] on your websites, add the following URLs to your existing directives depending on how you setup your Real User Monitoring or browser log collection:

## Intake URLs

Depending on the `site` option used to initialize [Real User Monitoring][2] or [browser logs collection][3], add the appropriate `connect-src` entry:

{{< site-region region="us" >}}

```txt
connect-src https://*.logs.datadoghq.com https://*.browser-intake-datadoghq.com
```

{{< /site-region >}}


{{< site-region region="eu" >}}

```txt
connect-src https://*.logs.datadoghq.eu https://*.browser-intake-datadoghq.eu
```

{{< /site-region >}}


{{< site-region region="us3" >}}

```txt
connect-src https://*.browser-intake-us3-datadoghq.com
```

{{< /site-region >}}


{{< site-region region="gov" >}}

```txt
connect-src https://*.browser-intake-ddog-gov.com
```

{{< /site-region >}}

## Session Replay worker

If you are using Session Replay, make sure to allow Workers with `blob:` URI schemes by adding the following `worker-src` entry:

```txt
worker-src: blob:;
```

## CDN bundle URL

If you are using the CDN async or CDN sync setup for [Real User Monitoring][4] or [browser log collection][5], you should also add the following `script-src` entry:

```txt
script-src https://www.datadoghq-browser-agent.com
```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy
[2]: /real_user_monitoring/browser/#initialization-parameters
[3]: /logs/log_collection/javascript/#initialization-parameters
[4]: /real_user_monitoring/browser/#setup
[5]: /logs/log_collection/javascript/#setup
