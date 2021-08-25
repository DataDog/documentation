---
title: Ignoring Unwanted Resources in APM
kind: documentation
---

A service can handle a variety of requests, some of which you might not want traced or included in trace metrics. An example of this is, possibly, health checks in a web application.

There are two ways to specify that such an endpoint should be untraced and excluded from trace metrics: 

- [Trace Agent configuration](#trace-agent-configuration-options) (in Datadog Agent), or
- [Tracer configuration](#tracer-configuration).

**Note:** Following any of the options below to filter traces will remove these requests from [trace metrics][1]. From information on how to reduce ingestion without affecting the trace metrics, see [ingestion controls][2].

If you need assistance, contact [Datadog support][3] and we’ll be happy to help.


## Trace Agent configuration options

The Trace Agent component within the Datadog Agent has two methods to prevent certain traces from coming through. If traces are dropped due to these rules, the trace metrics will exclude these requests.

If you have application-specific requirements, use the [Tracer configuration](#tracer-configuration) method instead.

### Ignoring based on span tags

Available starting with Datadog Agent 6.27.0/7.27.0, the **filter tags** option drops traces with root spans that match specified span tags. This option applies to all services that send traces to this particular Datadog Agent. Traces that are dropped because of filter tags are not included in trace metrics.

The filter tags option requires an exact string match. If your use case requires ignoring by regex, see [Ignoring based on resources](#ignoring-based-on-resources).

#### Environment variables

`DD_APM_FILTER_TAGS_REQUIRE`
: Collects only traces that have root spans with an exact match for the specified span tags and values. If it does not match this rule, the trace is dropped.

`DD_APM_FILTER_TAGS_REJECT`
: Rejects traces that have root spans with and exact match for the specified span tags and values. If it matches this rule, the trace is dropped.

#### `datadog.yaml`

For example:

```
apm_config:
	filter_tags:
		require: ["db:sql", "db.instance:mysql"]
		reject: ["outcome:success"]
```

To ignore health checks where the `http.url` matches this endpoint:

```
apm_config:
  filter_tags:
    reject: ["http.url:http://localhost:5050/healthcheck"]
```

**Note**: Filtering traces this way removes these requests from [trace metrics][1]. From information on how to reduce ingestion without affecting the trace metrics, see [ingestion controls][2].

If you can programmatically identify a set of traces that you know you don't want sent Datadog, and no other option in this guide solves your requirement, you can considering adding a [custom span tag][4] so you can drop the traces. [Reach out to Support][3] to discuss your use case further so we can continue to expand this functionality.


### Ignoring based on resources

The **ignore resources** option allows resources to be excluded if the global root span of the trace matches certain criteria. See [Exclude resources from being collected][5]. This option applies to all services that send traces to this particular Datadog Agent. Traces that are dropped because of ignore resources are not included in trace metrics.

You can specify resources to ignore either in the Agent configuration file, `datadog.yaml`, or with the `DD_APM_IGNORE_RESOURCES` environment variable.

{{< code-block lang="yaml" filename="datadog.yaml" >}}
## @param ignore_resources - list of strings - optional
## A list of regular expressions can be provided to exclude certain traces based on their resource name.
## All entries must be surrounded by double quotes and separated by commas.
ignore_resources: ["(GET|POST) /healthcheck","API::NotesController#index"]

{{< /code-block >}}

**Notes**:
- Filtering traces removes these requests from [trace metrics][1]. For information on how to reduce ingestion without affecting the trace metrics, see [ingestion controls][2].
- The regex syntax that the Trace Agent accepts is evaluated by Go’s [regexp][6].
- Depending on your deployment strategy, you may have to adjust the regex by escaping special characters.
- If you use dedicated containers with Kubernetes, make sure that the environment variable for the ignore resource option is being applied to the **trace-agent** container.

#### Examples

{{< img src="tracing/guide/ignoring_apm_resources/ignoreresources.png" alt="Flamegraph"  style="width:90%;">}}

For example, let’s say this is the trace that contains calls to `/api/healthcheck` that you don’t want traces from.

Step 1: Note down the resource name of the global root span.

- Operation Name: rack.request
- Resource Name: Api::HealthchecksController#index
- Http.url: /api/healthcheck

To use the ignore resource option correctly, the regex rule written must match with  `Api::HealthchecksController#index`  .

Step 2: A few regex options are possible, but if you want to filter out traces from this resource exactly as is, a potential regex to use would be `Api::HealthchecksController#index$`  .

Depending on how you deploy, this syntax will look a little different.


#### Datadog.yaml

```
apm_config:
  ignore_resources: Api::HealthchecksController#index$
```

#### Docker compose

In the Datadog Agent container’s list of environment variables, add DD_APM_IGNORE_RESOURCES with a pattern like the below. Docker Compose has its own [variable substitution][7] that should be considered when using special characters like `$`.


    environment:
      // other Datadog Agent environment variables
      - DD_APM_IGNORE_RESOURCES=Api::HealthchecksController#index$$


#### Docker run

In your docker run command to spin up the Datadog Agent, add DD_APM_IGNORE_RESOURCES:

```
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
```

#### Kubernetes - Daemonset

In the dedicated trace-agent container, add the environment variable DD_APM_IGNORE_RESOURCES:

```
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
```


#### Kubernetes Helm

In the traceAgent section of the values.yaml, add DD_APM_IGNORE_RESOURCES in the env section, then [spin up helm as usual][8].

```
    traceAgent:
      # agents.containers.traceAgent.env -- Additional environment variables for the trace-agent container
      env:
        - name: DD_APM_IGNORE_RESOURCES
          value: Api::HealthchecksController#index$

```

Alternatively, if you prefer to modify in `helm install` command, you can also utilize setting `agents.containers.traceAgent.env` in the command line:

```
helm install dd-agent -f values.yaml --set datadog.apiKeyExistingSecret="datadog-secret" --set datadog.apm.enabled=true --set agents.containers.traceAgent.env[0].name=DD_APM_IGNORE_RESOURCES,agents.containers.traceAgent.env[0].value="Api::HealthchecksController#index$" datadog/datadog
```

#### AWS ECS Task Definition

If you use AWS ECS (such as on EC2), in your Datadog Agent container definition, add the environment variable `DD_APM_IGNORE_RESOURCES` with the values such that the JSON evaluates to something like this:

```
    "environment": [
	// other environment variables for the Datadog Agent
        {
          "name": "DD_APM_IGNORE_RESOURCES",
          "value": "Api::HealthchecksController#index$"
        }
     ]
```

## Tracer configuration options

The following tracers have an option to modify spans before they get sent over to the Datadog Agent.

**Notes**:

Following any of the options below to filter traces will remove these requests from [trace metrics][1]. From information on how to reduce ingestion without affecting the trace metrics, see [ingestion controls][2].
If the request is associated with a distributed trace, there may be sampling inaccuracy with the resulting trace if you drop portions of it due to these filtering rules.

This is a great option if you have application specific requirements and are using the languages listed below:

{{< programming-lang-wrapper langs="ruby,python,nodeJS,java" >}}

{{< programming-lang lang="ruby" >}}

The Ruby tracer has a post processing pipeline that deletes traces that meet certain criteria. More information and examples can be found in [Post-Processing Traces][1].

For example, if if the resource name is `Api::HealthchecksController#index`, then you can utilize the `trace.delete_if` method to delete traces that contain the maining resource name. This filter can also be used to match on other metadata available for the [span object][2].

```
Datadog::Pipeline.before_flush do |trace|
  trace.delete_if { |span| span.resource =~ /Api::HealthchecksController#index/ }
end
```
[1]: /tracing/setup_overview/custom_instrumentation/ruby/?tab=activespan#post-processing-traces
[2]: /tracing/setup_overview/setup/ruby/#manual-instrumentation-2
{{< /programming-lang >}}

{{< programming-lang lang="python" >}}

The Python tracer has a FilterRequestsOnUrl filter that can be configured to remove traces from certain endpoints. If you prefer, you can also write your own custom filter. More information can be found in the [Trace Filtering][1].

If the root span’s http.url span tag shows a value of  ‘http://<domain>/healthcheck', the following regex could be used to match against any endpoint ending in `healthcheck`:
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

Configure a blocklist on the [Http][1] plugin. Take note of what the blocklist matches on from the API docs. For example, Http matches on URLs, so if the trace’s `http.url` span tag is `http://<domain>/healthcheck`,  you would write a rule matching the healthcheck url like the below.

Note that the tracer configuration for the integration must be before that instrumented module is imported.

```
const tracer = require('dd-trace').init();
tracer.use('http', {
  blocklist: ["/healthcheck"]
})

//import http

```

[1]: https://datadoghq.dev/dd-trace-js/interfaces/plugins.connect.html#blocklist
{{< /programming-lang >}}

{{< programming-lang lang="java" >}}

The Java tracer has an option for a custom TraceInterceptor to filter out certain spans. See Extending Tracers.

For example, if your resource name is `GET /healthcheck`, you can write a trace interceptor that drops traces containing this resource name. You can also adjust the logic to meet your use case.

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

{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}


[1]: /tracing/guide/metrics_namespace/#overview
[2]: /tracing/trace_retention_and_ingestion/#ingestion-controls
[3]: /help/
[4]: /tracing/guide/add_span_md_and_graph_it/
[5]: /tracing/setup_overview/configure_data_security/?tab=mongodb#exclude-resources-from-being-collected
[6]: https://golang.org/pkg/regexp/
[7]: https://docs.docker.com/compose/compose-file/compose-file-v3/#variable-substitution
[8]: /agent/kubernetes/?tab=helm#installation
