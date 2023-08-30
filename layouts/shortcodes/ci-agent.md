If you are running tests on an on-premises CI provider, such as Jenkins or self-managed GitLab CI, install the Datadog Agent on each worker node by following the [Agent installation instructions][101]. This is the recommended option as test results are then automatically linked to the underlying host metrics.

If you are using a Kubernetes executor, Datadog recommends using the [Datadog Admission Controller][102], which automatically sets the environment variables in the build pods to communicate with the local Datadog Agent.

If you are not using Kubernetes or can't use [Datadog Admission Controller][102] and the CI provider is using a container-based executor, set the `DD_TRACE_AGENT_URL` environment variable (which defaults to `http://localhost:8126`) in the build container running the tracer to an endpoint that is accessible from within that container. _Note that using `localhost` inside the build references the container itself and not the underlying worker node or any container where the Agent might be running_.

`DD_TRACE_AGENT_URL` includes the protocol and port (for example, `http://localhost:8126`) and takes precedence over `DD_AGENT_HOST` and `DD_TRACE_AGENT_PORT`, and is the recommended configuration parameter to configure the Datadog Agent's URL for CI Visibility.

If you still have issues connecting to the Datadog Agent, use the [Agentless Mode](?tab=cloudciprovideragentless#configuring-reporting-method). **Note**: By using this method, there will be no correlation between tests and infrastructure metrics.

[101]: /agent/
[102]: /agent/cluster_agent/admission_controller/