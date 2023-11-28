If you are running tests on an on-premises CI provider, such as Jenkins or self-managed GitLab CI, install the Datadog Agent on each worker node by following the [Agent installation instructions][101].
This is the recommended option as it allows to automatically link test results to [logs][104] and [underlying host metrics][105].

If you are using a Kubernetes executor, Datadog recommends using the [Datadog Admission Controller][102], which automatically [injects the tracer library][103] into the build pods.
_If you use the Admission Controller, there is no need to download and inject the tracer library since the controller does this for you, so you can skip the corresponding step below.
However, you still need to make sure that your pods set the environment variables or command-line parameters necessary to enable Test Visibility._

If you are not using Kubernetes or can't use [Datadog Admission Controller][102] and the CI provider is using a container-based executor, set the `DD_TRACE_AGENT_URL` environment variable (which defaults to `http://localhost:8126`) in the build container running the tracer to an endpoint that is accessible from within that container. _Note that using `localhost` inside the build references the container itself and not the underlying worker node or any container where the Agent might be running_.

`DD_TRACE_AGENT_URL` includes the protocol and port (for example, `http://localhost:8126`) and takes precedence over `DD_AGENT_HOST` and `DD_TRACE_AGENT_PORT`, and is the recommended configuration parameter to configure the Datadog Agent's URL for CI Visibility.

If you still have issues connecting to the Datadog Agent, use the [Agentless Mode](?tab=cloudciprovideragentless#configuring-reporting-method).
**Note**: When using this method, tests will not be correlated with [logs][104] and [infrastructure metrics][105].

[101]: /agent/
[102]: /agent/cluster_agent/admission_controller/
[103]: /tracing/trace_collection/library_injection_local/?tab=kubernetes
[104]: /tracing/other_telemetry/connect_logs_and_traces/
[105]: /infrastructure/
