---
title: Content Security Policy (CSP)
kind: faq
further_reading:
    - link: '/logs/log_collection/javascript/'
      tag: 'Get Started'
      text: 'Browser Log Collection'
---

If you are using [Content Security Policy (CSP)][1] on your websites, add the following URLs to your existing directives depending on how you setup your Real User Monitoring or browser log collection:


## CDN async setup

If you have the CDN async setup for [Real User Monitoring][2] or [browser log collection][3]:

1. Add the `connect-src` depending of your Datadog Site:

    {{< tabs >}}
    {{% tab "US" %}}

```txt
connect-src https://*.logs.datadoghq.com
```

    {{% /tab %}}
    {{% tab "EU" %}}

```txt
connect-src https://*.logs.datadoghq.eu
```

    {{% /tab %}}
    {{< /tabs >}}

2. Then add the `script-src` directive:

    ```txt
    script-src https://www.datadoghq-browser-agent.com
    ```

## CDN sync setup

If you have the CDN sync setup for [Real User Monitoring][4] or [browser log collection][5]:

1. Add the `connect-src` depending of your Datadog Site:

    {{< tabs >}}
    {{% tab "US" %}}

```txt
connect-src https://*.logs.datadoghq.com
```

    {{% /tab %}}
    {{% tab "EU" %}}

```txt
connect-src https://*.logs.datadoghq.eu
```

    {{% /tab %}}
    {{< /tabs >}}

2. Then add the `script-src` directive:

    ```txt
    script-src https://www.datadoghq-browser-agent.com
    ```

## NPM setup

If you have the NPM setup for [Real User Monitoring][6] or [browser log collection][7], add only the `connect-src` directive:

{{< tabs >}}
{{% tab "US" %}}

```txt
connect-src https://*.logs.datadoghq.com
```

{{% /tab %}}
{{% tab "EU" %}}

```txt
connect-src https://*.logs.datadoghq.eu
```

{{% /tab %}}
{{< /tabs >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy
[2]: /real_user_monitoring/browser/#cdn-async
[3]: /logs/log_collection/javascript/#cdn-async
[4]: /real_user_monitoring/browser/#cdn-sync
[5]: /logs/log_collection/javascript/#cdn-sync
[6]: /real_user_monitoring/browser/#npm
[7]: /logs/log_collection/javascript/#npm-setup
