If you are running tests on an on-premises CI provider, such as Jenkins or self-managed GitLab CI, install the Datadog Agent on each worker node by following the [Agent installation instructions][101].
This is the recommended option as it allows you to automatically link test results to [logs][105] and [underlying host metrics][106].

If you are using a Kubernetes executor, Datadog recommends using the [Datadog Operator][102].
The operator includes [Datadog Admission Controller][103] which can automatically [inject the tracer library][104] into the build pods.
**Note:** If you use the Datadog Operator, there is no need to download and inject the tracer library since the Admission Controller can do this for you, so you can skip the corresponding step below.
However, you still need to make sure that your pods set the environment variables or command-line parameters necessary to enable Test Visibility.

If you are not using Kubernetes or can't use the Datadog Admission Controller and the CI provider is using a container-based executor, set the `DD_TRACE_AGENT_URL` environment variable (which defaults to `http://localhost:8126`) in the build container running the tracer to an endpoint that is accessible from within that container. **Note:**  Using `localhost` inside the build references the container itself and not the underlying worker node or any container where the Agent might be running in.

`DD_TRACE_AGENT_URL` includes the protocol and port (for example, `http://localhost:8126`) and takes precedence over `DD_AGENT_HOST` and `DD_TRACE_AGENT_PORT`, and is the recommended configuration parameter to configure the Datadog Agent's URL for CI Visibility.

If you still have issues connecting to the Datadog Agent, use the [Agentless Mode](?tab=cloudciprovideragentless#configuring-reporting-method).
**Note:** When using this method, tests are not correlated with [logs][105] and [infrastructure metrics][106].

[101]: /agent/
[102]: /containers/datadog_operator/
[103]: /agent/cluster_agent/admission_controller/
[104]: /tracing/trace_collection/library_injection_local/?tab=kubernetes
[105]: /tracing/other_telemetry/connect_logs_and_traces/
[106]: /infrastructure/
