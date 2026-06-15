---
title: Sentry SDK
description: Start using Datadog Error Tracking today without changing your existing setup with the Sentry SDK
further_reading:
- link: "/error_tracking/manage_data_collection"
  tag: "Documentation"
  text: "Manage Data Collection"
---
<div class="alert alert-danger">
Using the Sentry SDK with Error Tracking helps you migrate to Datadog. However, to get the most out of Error Tracking, it is recommended to use the Datadog SDKs. See <a href="/error_tracking/frontend">Frontend Error Tracking</a> and <a href="/error_tracking/backend">Backend Error Tracking</a>.
</div>

## Overview
You can use [Sentry SDKs][1] to send your events to Datadog, so you can start using Error Tracking on existing applications that are instrumented using Sentry SDKs.

Setting up the Sentry SDK with Datadog requires a minimal code change to point the SDK to a Datadog Data Source Name (DSN).

[Events][6] and non-error events (messages) appear in Datadog as logs in the [log explorer][12]. Other item types (traces, attachments, sessions, etc.) are not supported.

## Supported SDKs

The following Sentry SDKs are verified to work with Error Tracking:

| Platform   | Tested version                                    |
| ---------- | ------------------------------------------------- |
| JavaScript | `@sentry/node@9.13.0`<br>`@sentry/browser@9.13.0` |
| Python     | `sentry-sdk==2.26.1`                              |
| Java       | `io.sentry:sentry:8.6.0`                          |
| .NET       | `Sentry 5.5.1`                                    |
| Go         | `sentry-go v0.32.0`                               |
| Ruby       | `sentry-ruby 5.23.0`                              |

## Setup
### Prerequisites
Sentry SDK events are sent into Datadog as logs. You must have [Error Tracking for Logs][2] enabled for errors to show up in Error Tracking.

**Note:** By default, enabling Error Tracking for Logs enables Error Tracking on **all** of your logs. You can use [rules][9] to configure Error Tracking for Logs to **only** collect errors from the Sentry SDK. To do this, create a rule for logs with scope `source:sentry-sdk`, and create an exclusion rule for all other logs.

{{< img src="error_tracking/sentry-sdk-rules.png" alt="Error Tracking rules including only Logs from the Sentry SDK" style="width:70%;" >}}

### Service configuration
To configure the Sentry SDK to send events into Datadog:
1. Configure a Datadog Data Source Name (DSN). Follow the [in-app instructions][3] to generate your unique DSN.
2. Set a `service` tag on all events. This is used to separate errors and is shown in the Datadog UI:

{{< tabs >}}

  {{% tab "JavaScript" %}}
  {{< code-block lang="javascript" >}}
  Sentry.init({
      dsn: 'https://<TOKEN>@sentry-intake.<DD_SITE>/1',
      initialScope: {
          tags: {
              service: 'my-app'
          }
      }
  });
  {{< /code-block >}}
  {{% /tab %}}

  {{% tab "Python" %}}
  {{< code-block lang="python" >}}
  sentry_sdk.init(
      dsn="https://<TOKEN>@sentry-intake.<DD_SITE>/1",
  )
  sentry_sdk.set_tag("service", "my-app")
  {{< /code-block >}}
  {{% /tab %}}

  {{% tab "Java" %}}
  {{< code-block lang="java" >}}
  Sentry.init(options -> {
      options.setDsn("https://<TOKEN>@sentry-intake.<DD_SITE>/1");
  });
  Sentry.configureScope(scope -> {
      scope.setTag("service", "my-app");
  });
  {{< /code-block >}}
  {{% /tab %}}

  {{% tab "C#" %}}
  {{< code-block lang="csharp">}}
  SentrySdk.Init(options =>
  {
      options.Dsn = "https://<TOKEN>@sentry-intake.<DD_SITE>/1";
      options.SetBeforeSend((sentryEvent, hint) => {
          sentryEvent.SetTag("service", "my-app");
          return sentryEvent;
      });
  });
  {{< /code-block >}}
  {{% /tab %}}

  {{% tab "Go" %}}
  {{< code-block lang="go">}}
  sentry.Init(sentry.ClientOptions{
      Dsn: "https://<TOKEN>@sentry-intake.<DD_SITE>/1",
  })
  sentry.ConfigureScope(func(scope *sentry.Scope) {
      scope.SetTag("service", "my-app");
  })
  {{< /code-block >}}
  {{% /tab %}}

  {{% tab "Ruby" %}}
  {{< code-block lang="ruby">}}
  Sentry.init do |config|
      config.dsn = https://<TOKEN>@sentry-intake.<DD_SITE>/1'
  end
  Sentry.set_tags('service': 'my-app')
  {{< /code-block >}}
  {{% /tab %}}

{{< /tabs >}}

### Upload JavaScript source maps

If your frontend JavaScript source code is minified, you can upload source maps to Datadog to deobfuscate stack traces in Error Tracking. See [Upload JavaScript Source Maps][4].

The `version` on source maps is matched with the `release` [configured][11] on the Sentry SDK.

### Source code integration

[Datadog Source Code Integration][5] allows you to connect your telemetry with your Git repositories. It works with Sentry SDKs by configuring telemetry tags:

{{< tabs >}}

{{% tab "JavaScript" %}}
{{< code-block lang="javascript" >}}
Sentry.setTag("git.commit.sha", "<commitSha>");
Sentry.setTag("git.repository_url", "<git-provider.example/me/my-repo>");
{{< /code-block >}}
{{% /tab %}}

{{% tab "Python" %}}
{{< code-block lang="python" >}}
sentry_sdk.set_tag("git.commit.sha", "<commitSha>")
sentry_sdk.set_tag("git.repository_url", "<git-provider.example/me/my-repo>")
{{< /code-block >}}
{{% /tab %}}

{{% tab "Java" %}}
{{< code-block lang="java" >}}
Sentry.configureScope(scope -> {
    scope.setTag("git.commit.sha", "<commitSha>");
    scope.setTag("git.repository_url", "<git-provider.example/me/my-repo>");
});
{{< /code-block >}}
{{% /tab %}}

{{% tab "C#" %}}
{{< code-block lang="csharp" >}}
SentrySdk.ConfigureScope(scope =>
{
    scope.SetTag("git.commit.sha", "<commitSha>");
    scope.SetTag("git.repository_url", "<git-provider.example/me/my-repo>");
});
{{< /code-block >}}
{{% /tab %}}

{{% tab "Go" %}}
{{< code-block lang="go" >}}
sentry.ConfigureScope(func(scope *sentry.Scope) {
    scope.SetTag("git.commit.sha", "<commitSha>");
    scope.SetTag("git.repository_url", "<git-provider.example/me/my-repo>");
})
{{< /code-block >}}
{{% /tab %}}

{{% tab "Ruby" %}}
{{< code-block lang="ruby" >}}
Sentry.set_tags('git.commit.sha', '<commitSha>')
Sentry.set_tags('git.repository_url', '<git-provider.example/me/my-repo>')
{{< /code-block >}}
{{% /tab %}}

{{< /tabs >}}

## Migrate to the recommended setup

To get the most out of Error Tracking, Datadog recommends migrating to the Datadog SDK and/or Agent-based setups. See [Backend Error Tracking][7] and [Frontend Error Tracking][8] for more information.

The Sentry SDK setup can be used simultaneously with the recommended setup. Errors may be reported twice.

## Send events to both Sentry and Datadog
Events can be sent to both Sentry (or any other Sentry-compatible backend) and Datadog. This allows you to start using Datadog while also keeping your current solution. There are a couple of ways to achieve this:
- [Using the Sentry SDK](#using-the-sentry-sdk)
- [Using Sentry Mirror](#using-sentry-mirror)

### Using the Sentry SDK
You can configure Sentry SDKs to send events to multiple DSNs at once. On most Sentry SDKs, you can override the default transport to achieve this.

{{< tabs >}}

{{% tab "JavaScript" %}}
{{< code-block lang="javascript" >}}
// Change to import from "@sentry/react", "@sentry/nextjs", etc. as needed
import * as Sentry from "@sentry/browser";
import { makeFetchTransport } from "@sentry/browser"; // import { makeNodeTransport } from "@sentry/node" for Node.js
import { makeMultiplexedTransport } from "@sentry/core";

const sentryDsn = '<SENTRY_DSN>';
const datadogDsn = '<DATADOG_DSN>';

Sentry.init({
  dsn: sentryDsn,
  transport: makeMultiplexedTransport(makeFetchTransport, () => [sentryDsn, datadogDsn]),
  // ...
});
Sentry.setTag('service', 'my-app');
{{< /code-block >}}
{{% /tab %}}

{{% tab "Python" %}}
1. Copy the following function into your code:
{{< code-block lang="python" >}}
from sentry_sdk.transport import Transport, make_transport
def make_multi_transport(dsns):
    class MultiTransport(Transport):
        def __init__(self, options):
            super().__init__(options)
            self.transports = [
                make_transport({**options, "dsn": dsn, "transport": None}) for dsn in dsns
            ]
        def capture_envelope(self, *args, **kwargs):
            for transport in self.transports:
                transport.capture_envelope(*args, **kwargs)
        def flush(self, *args, **kwargs):
            for transport in self.transports:
                transport.flush(*args, **kwargs)
        def kill(self):
            for transport in self.transports:
                transport.kill()
        def record_lost_event(self, *args, **kwargs):
            for transport in self.transports:
                transport.record_lost_event(*args, **kwargs)
    return MultiTransport
{{< /code-block >}}

2. Use as follows:
{{< code-block lang="python" >}}
_SENTRY_DSN = "<SENTRY_DSN>"
_DATADOG_DSN = "<DATADOG_DSN>"
sentry_sdk.init(
    dsn=_SENTRY_DSN,
    transport=make_multi_transport([_SENTRY_DSN, _DATADOG_DSN]),
    # ...
)
sentry_sdk.set_tag("service", "my-app")
{{< /code-block >}}
{{% /tab %}}

{{% tab "Java" %}}
1. Copy the following class into your code. Make sure to define it in the **io.sentry** package.
{{< code-block lang="java" >}}
package io.sentry;

public record MultiTransportFactory(List<String> dsns) implements ITransportFactory {
  @Override
  public ITransport create(final SentryOptions options, final RequestDetails requestDetails) {
    final var transports = dsns.stream()
        .map(dsn -> {
          var requestOptions = new SentryOptions();
          requestOptions.setDsn(dsn);
          requestOptions.setSentryClientName(options.getSentryClientName());
          return new AsyncHttpTransportFactory().
              create(options, new RequestDetailsResolver(requestOptions).resolve());
        })
        .toList();
    return new ITransport() {
      @Override
      public void send(SentryEnvelope envelope, Hint hint) throws IOException {
        for (ITransport transport : transports) {
          transport.send(envelope, hint);
        }
      }

      @Override
      public boolean isHealthy() {
        return transports.stream().allMatch(ITransport::isHealthy);
      }

      @Override
      public void flush(long timeoutMillis) {
        transports.forEach(transport -> transport.flush(timeoutMillis));
      }

      @Override
      public RateLimiter getRateLimiter() {
        return null;
      }

      @Override
      public void close(boolean isRestarting) throws IOException {
        for (ITransport transport : transports) {
          transport.close(isRestarting);
        }
      }

      @Override
      public void close() throws IOException {
        for (ITransport transport : transports) {
          transport.close();
        }
      }
    };
  }
}
{{< /code-block >}}

2. Use as follows:
{{< code-block lang="java" >}}
final var sentryDsn = "<SENTRY_DSN>"
final var datadogDsn = "<DATADOG_DSN>"

Sentry.init(options -> {
  options.setDsn(sentryDsn);
  options.setTransportFactory(new MultiTransportFactory(List.of(sentryDsn, datadogDsn)));
});
Sentry.setTag("service", "my-app");
{{< /code-block >}}
{{% /tab %}}

{{% tab "Go" %}}
1. Copy the following snippet into your code:
{{< code-block lang="go" >}}
type MultiTransport struct {
	dsns       []string
	transports []*sentry.HTTPTransport
}

func NewMultiTransport(dsns []string) *MultiTransport {
	transports := make([]*sentry.HTTPTransport, len(dsns))
	for i := range dsns {
		transports[i] = sentry.NewHTTPTransport()
	}
	return &MultiTransport{
		dsns:       dsns,
		transports: transports,
	}
}

func (mt *MultiTransport) Configure(options sentry.ClientOptions) {
	for i := range mt.dsns {
		options.Dsn = mt.dsns[i]
		if options.EnableTracing {
			// Replicating the default behavior:
			// https://github.com/getsentry/sentry-go/blob/v0.32.0/client.go#L358
			mt.transports[i].BufferSize = 1000
		}
		mt.transports[i].Configure(options)
	}
}

func (mt *MultiTransport) Flush(timeout time.Duration) bool {
	allDone := true
	for _, t := range mt.transports {
		if ok := t.Flush(timeout); !ok {
			allDone = false
		}
	}
	return allDone
}

func (mt *MultiTransport) SendEvent(event *sentry.Event) {
	for _, t := range mt.transports {
		t.SendEvent(event)
	}
}

func (mt *MultiTransport) Close() {
	for _, t := range mt.transports {
		t.Close()
	}
}
{{< /code-block >}}

2. Use as follows:
{{< code-block lang="go" >}}
sentryDSN := "<SENTRY_DSN>"
datadogDSN := "<DATADOG_DSN>"

err := sentry.Init(sentry.ClientOptions{
	Dsn: sentryDSN,
	Transport: NewMultiTransport([]string{sentryDSN, datadogDSN}),
})
// ...
sentry.ConfigureScope(func(scope *sentry.Scope) {
	scope.SetTag("service", "my-app")
})
{{< /code-block >}}
{{% /tab %}}

{{< /tabs >}}

### Using Sentry Mirror
[Sentry Mirror][10] is a proxy that replicates traffic to multiple DSNs. You run in it your own environment, and point your applications to Sentry Mirror's inbound DSN.

Sentry Mirror is configured using a YAML file:
{{< code-block lang="yaml" >}}
ip: 0.0.0.0
port: 3000
keys:
  - inbound: http://1234567890abcdef1234567890abcdef@my-domain.example/123
    outbound:
      - <SENTRY_DSN>
      - <DATADOG_DSN>
{{< /code-block >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.sentry.io/
[2]: https://app.datadoghq.com/error-tracking/settings
[3]: https://app.datadoghq.com/error-tracking/settings/setup/sentry
[4]: /real_user_monitoring/guide/upload-javascript-source-maps
[5]: /integrations/guide/source-code-integration/
[6]: https://develop.sentry.dev/sdk/data-model/envelope-items/#event
[7]: /error_tracking/backend
[8]: /error_tracking/frontend
[9]: /error_tracking/manage_data_collection#rules
[10]: https://github.com/getsentry/sentry-mirror
[11]: https://docs.sentry.io/product/releases/setup/
[12]: https://app.datadoghq.com/logs
