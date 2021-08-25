---
title: Ignoring Unwanted Resources in APM
kind: documentation
---

A service can handle a variety of requests, some of which you might not want traced or included in trace metrics. An example of this is, possibly, health checks in a web application.

There are two ways to specify that such an endpoint should be untraced and excluded from trace metrics: 

- [Trace Agent configuration](#trace-agent-configuration-options) (in Datadog Agent), or
- [Tracer configuration](#tracer-configuration-options).

<div class="alert alert-warning"><strong>Note</strong>: Filtering traces using any of the following options removes these requests from <a href="/tracing/guide/metrics_namespace/">trace metrics</a>. For information on how to reduce ingestion without affecting the trace metrics, see <a href="/tracing/trace_retention_and_ingestion/#ingestion-controls">ingestion controls</a>.</div>

If you need assistance, contact [Datadog support][1].


## Trace Agent configuration options

The Trace Agent component within the Datadog Agent has two methods to prevent certain traces from coming through: ignoring span tags or ignoring resources. If traces are dropped due to these settings, the trace metrics exclude these requests.

Configuring the Trace Agent to ignore certain spans or resources applies to all services that send traces to this particular Datadog Agent. If you have application-specific requirements, use the [Tracer configuration](#tracer-configuration) method instead.

### Ignoring based on span tags

Starting with Datadog Agent 6.27.0/7.27.0, the **filter tags** option drops traces with root spans that match specified span tags. This option applies to all services that send traces to this particular Datadog Agent. Traces that are dropped because of filter tags are not included in trace metrics.

If you can programmatically identify a set of traces that you know you don't want sent Datadog, and no other option in this guide solves your requirement, you can considering adding a [custom span tag][2] so you can drop the traces. [Reach out to Support][1] to discuss your use case further so we can continue to expand this functionality.

The filter tags option requires an exact string match. If your use case requires ignoring by regex, see [Ignoring based on resources](#ignoring-based-on-resources).

You can specify span tags to require or reject by using environment variables:

`DD_APM_FILTER_TAGS_REQUIRE`
: Collects only traces that have root spans with an exact match for the specified span tags and values. If it does not match this rule, the trace is dropped.

`DD_APM_FILTER_TAGS_REJECT`
: Rejects traces that have root spans with and exact match for the specified span tags and values. If it matches this rule, the trace is dropped.

Or you can set them in the Agent configuration file:

{{< code-block lang="yaml" filename="datadog.yaml" >}}
apm_config:
  filter_tags:
    require: ["db:sql", "db.instance:mysql"]
    reject: ["outcome:success"]
{{< /code-block >}}

For example, to ignore health checks where the `http.url` matches this endpoint:

{{< code-block lang="yaml" filename="datadog.yaml" >}}
apm_config:
  filter_tags:
    reject: ["http.url:http://localhost:5050/healthcheck"]
{{< /code-block >}}

<div class="alert alert-warning"><strong>Note</strong>: Filtering traces this way removes these requests from <a href="/tracing/guide/metrics_namespace/">trace metrics</a>. For information on how to reduce ingestion without affecting the trace metrics, see <a href="/tracing/trace_retention_and_ingestion/#ingestion-controls">ingestion controls</a>.</div>


### Ignoring based on resources

The **ignore resources** option allows resources to be excluded if the global root span of the trace matches certain criteria. See [Exclude resources from being collected][3]. This option applies to all services that send traces to this particular Datadog Agent. Traces that are dropped because of ignore resources are not included in trace metrics.

You can specify resources to ignore either in the Agent configuration file, `datadog.yaml`, or with the `DD_APM_IGNORE_RESOURCES` environment variable. See examples below.

{{< code-block lang="yaml" filename="datadog.yaml" >}}
## @param ignore_resources - list of strings - optional
## A list of regular expressions can be provided to exclude certain traces based on their resource name.
## All entries must be surrounded by double quotes and separated by commas.

  ignore_resources: ["(GET|POST) /healthcheck","API::NotesController#index"]
{{< /code-block >}}

**Notes**:
- The regex syntax that the Trace Agent accepts is evaluated by Go’s [regexp][4].
- Depending on your deployment strategy, you may have to adjust the regex by escaping special characters.
- If you use dedicated containers with Kubernetes, make sure that the environment variable for the ignore resource option is being applied to the **trace-agent** container.

#### Example

Consider a trace that contains calls to `/api/healthcheck` that you don’t want traces from:

{{< img src="tracing/guide/ignoring_apm_resources/ignoreresources.png" alt="Flame graph of a resource you want the tracer to ignore" style="width:90%;">}}

Take note of the resource name of the global root span.

- Operation name: `rack.request`
- Resource name: `Api::HealthchecksController#index`
- Http.url: `/api/healthcheck`

To use the ignore resource option correctly, the regex rule written must match with the resource name, `Api::HealthchecksController#index`. A few regex options are possible, but to filter out traces from this resource exactly as is, a potential regex to use is `Api::HealthchecksController#index$`.

Depending on how you deploy, the syntax looks a little different:

{{< tabs >}}
{{% tab "datadog.yaml" %}}

{{< code-block lang="yaml" filename="datadog.yaml" >}}
apm_config:
  ignore_resources: Api::HealthchecksController#index$
{{< /code-block >}}

{{% /tab %}}
{{% tab "Docker compose" %}}

In the Datadog Agent container’s list of environment variables, add `DD_APM_IGNORE_RESOURCES` with a pattern like the example below. Docker Compose has its own [variable substitution][1] to consider when you use special characters like `$`.

{{< code-block lang="yaml" >}}
    environment:
      // other Datadog Agent environment variables
      - DD_APM_IGNORE_RESOURCES=Api::HealthchecksController#index$$
{{< /code-block >}}

[1]: https://docs.docker.com/compose/compose-file/compose-file-v3/#variable-substitution
{{% /tab %}}
{{% tab "Docker run" %}}

In your docker run command to spin up the Datadog Agent, add `DD_APM_IGNORE_RESOURCES`:

{{< code-block lang="bash" >}}
docker run -d --name datadog-agent \
              -v /var/run/docker.sock:/var/run/docker.sock:ro \
              -v /proc/:/host/proc/:ro \
              -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
              -e DD_API_KEY=<> \
        -e DD_APM_IGNORE_RESOURCES="Api::HealthchecksController#index$" \
              -e DD_APM_ENABLED=true \
        -e DD_LOG_LEVEL=TRACE \
              -e DD_APM_NON_LOCAL_TRAFFIC=true \
              datadog/agent:latest
{{< /code-block >}}

{{% /tab %}}
{{% tab "Kubernetes daemonset" %}}

In the dedicated trace-agent container, add the environment variable `DD_APM_IGNORE_RESOURCES`:

{{< code-block lang="yaml" >}}
    - name: trace-agent
        image: "gcr.io/datadoghq/agent:latest"
        imagePullPolicy: IfNotPresent
        command: ["trace-agent", "-config=/etc/datadog-agent/datadog.yaml"]
        resources: {}
        ports:
        - containerPort: 8126
          hostPort: 8126
          name: traceport
          protocol: TCP
        env:
        - name: DD_API_KEY
          valueFrom:
            secretKeyRef:
              name: "datadog-secret"
              key: api-key
        - name: DD_KUBERNETES_KUBELET_HOST
          valueFrom:
            fieldRef:
              fieldPath: status.hostIP
        - name: KUBERNETES
          value: "yes"
        - name: DOCKER_HOST
          value: unix:///host/var/run/docker.sock
        - name: DD_LOG_LEVEL
          value: "INFO"
        - name: DD_APM_ENABLED
          value: "true"
        - name: DD_APM_NON_LOCAL_TRAFFIC
          value: "true"
        - name: DD_APM_RECEIVER_PORT
          value: "8126"
        - name: DD_KUBELET_TLS_VERIFY
          value: "false"
        - name: DD_APM_IGNORE_RESOURCES
          value: "Api::HealthchecksController#index$"
{{< /code-block >}}

{{% /tab %}}
{{% tab "Kubernetes Helm" %}}

In the `traceAgent` section of the `values.yaml` file, add `DD_APM_IGNORE_RESOURCES` in the `env` section, then [spin up helm as usual][1].

{{< code-block lang="yaml" filename="values.yaml" >}}
    traceAgent:
      # agents.containers.traceAgent.env -- Additional environment variables for the trace-agent container
      env:
        - name: DD_APM_IGNORE_RESOURCES
          value: Api::HealthchecksController#index$

{{< /code-block >}}

Alternatively, you can set `agents.containers.traceAgent.env` in the `helm install` command:

{{< code-block lang="bash" >}}
helm install dd-agent -f values.yaml \
  --set datadog.apiKeyExistingSecret="datadog-secret" \
  --set datadog.apm.enabled=true \
  --set agents.containers.traceAgent.env[0].name=DD_APM_IGNORE_RESOURCES, \
    agents.containers.traceAgent.env[0].value="Api::HealthchecksController#index$" \
  datadog/datadog
{{< /code-block >}}

[1]: /agent/kubernetes/?tab=helm#installation
{{% /tab %}}
{{% tab "AWS ECS Task Definition" %}}

If you use AWS ECS (such as on EC2), in your Datadog Agent container definition, add the environment variable `DD_APM_IGNORE_RESOURCES` with the values such that the JSON evaluates to something like this:

{{< code-block lang="json" >}}
    "environment": [
	// other environment variables for the Datadog Agent
        {
          "name": "DD_APM_IGNORE_RESOURCES",
          "value": "Api::HealthchecksController#index$"
        }
     ]
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-warning"><strong>Note</strong>: Filtering traces this way removes these requests from <a href="/tracing/guide/metrics_namespace/">trace metrics</a>. For information on how to reduce ingestion without affecting the trace metrics, see <a href="/tracing/trace_retention_and_ingestion/#ingestion-controls">ingestion controls</a>.</div>

## Tracer configuration options

Some of the language-specific tracers have an option to modify spans before they are sent to the Datadog Agent. Use this option if you have application-specific requirements and are using the languages listed below.

<div class="alert alert-danger"><strong>Important</strong>: If the request is associated with a distributed trace, the resulting trace can have sampling inaccuracy if you drop portions of it due to these filtering rules.</div>


{{< programming-lang-wrapper langs="ruby,python,nodeJS,java" >}}

{{< programming-lang lang="ruby" >}}

The Ruby tracer has a post-processing pipeline that deletes traces that meet certain criteria. More information and examples can be found in [Post-processing traces][1].

For example, if the resource name is `Api::HealthchecksController#index`, use the `trace.delete_if` method to delete traces that contain the resource name. This filter can also be used to match on other metadata available for the [span object][2].

```
Datadog::Pipeline.before_flush do |trace|
  trace.delete_if { |span| span.resource =~ /Api::HealthchecksController#index/ }
end
```

[1]: /tracing/setup_overview/custom_instrumentation/ruby/?tab=activespan#post-processing-traces
[2]: /tracing/setup_overview/setup/ruby/#manual-instrumentation-2
{{< /programming-lang >}}

{{< programming-lang lang="python" >}}

The Python tracer has a `FilterRequestsOnUrl` filter you can configure to remove traces from certain endpoints. Alternatively, you can write a custom filter. See [Trace Filtering][1] for more information.

Suppose the root span’s `http.url` span tag has a value of `http://<domain>/healthcheck`. Use the following regex to match against any endpoint ending in `healthcheck`:

```
from ddtrace import tracer
from ddtrace.filters import FilterRequestsOnUrl
tracer.configure(settings={
    'FILTERS': [
        FilterRequestsOnUrl(r'http://.*/healthcheck$'),
    ],
})
```

[1]: https://ddtrace.readthedocs.io/en/stable/advanced_usage.html#ddtrace.filters.FilterRequestsOnUrl
{{< /programming-lang >}}

{{< programming-lang lang="nodeJS" >}}

Configure a blocklist on the [Http][1] plugin. Take note of what the blocklist matches on from the API docs. For example, Http matches on URLs, so if the trace’s `http.url` span tag is `http://<domain>/healthcheck`, write a rule that matches the `healthcheck` URL:


```
const tracer = require('dd-trace').init();
tracer.use('http', {
  blocklist: ["/healthcheck"]
})

//import http

```
<div class="alert alert-info"><strong>Note</strong>: The tracer configuration for the integration must come <em>before</em> that instrumented module is imported.</div>

[1]: https://datadoghq.dev/dd-trace-js/interfaces/plugins.connect.html#blocklist
{{< /programming-lang >}}

{{< programming-lang lang="java" >}}

The Java tracer has an option for a custom `TraceInterceptor` to filter out certain spans. See [Extending Tracers][1].

For example, if your resource name is `GET /healthcheck`, write a trace interceptor that drops traces containing this resource name. Adjust the logic to meet your use case.

```
public class GreetingController {
   static {
       // In a class static block to avoid initializing multiple times.
       GlobalTracer.get().addTraceInterceptor(new TraceInterceptor() {
           @Override
           public Collection<? extends MutableSpan> onTraceComplete(Collection<? extends MutableSpan> trace) {
               for (MutableSpan span : trace) {
                   if ("GET /healthcheck".contentEquals(span.getResourceName())) {
                       return Collections.emptyList();
                   }
               }
               return trace;
           }
           @Override
           public int priority() {
               return 200;  // Some unique number
           }
       });
   }
}
```

[1]: /tracing/setup_overview/custom_instrumentation/java/#extending-tracers
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

<div class="alert alert-warning"><strong>Note</strong>: Filtering traces this way removes these requests from <a href="/tracing/guide/metrics_namespace/">trace metrics</a>. For information on how to reduce ingestion without affecting the trace metrics, see <a href="/tracing/trace_retention_and_ingestion/#ingestion-controls">ingestion controls</a>.</div>

[1]: /help/
[2]: /tracing/guide/add_span_md_and_graph_it/
[3]: /tracing/setup_overview/configure_data_security/?tab=mongodb#exclude-resources-from-being-collected
[4]: https://golang.org/pkg/regexp/
