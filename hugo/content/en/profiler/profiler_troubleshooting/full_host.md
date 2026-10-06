---
title: Full-Host Profiler Troubleshooting
private: true
further_reading:
    - link: 'profiler/enabling/full_host'
      tag: 'Documentation'
      text: 'Enabling the Full-Host Profiler'
    - link: 'profiler/enabling/full_host_deployment'
      tag: 'Documentation'
      text: 'Deploying the Full-Host Profiler'
---

## Find the Full-Host Profiler logs

Confirm that pods with the Full-Host Profiler are running on the expected nodes:

```shell
kubectl get pods -n <NAMESPACE> -o wide
```

If you use a Datadog Agent deployment path, the Full-Host Profiler runs as a sidecar in the Agent DaemonSet. If you use an OpenTelemetry deployment path, it runs in its own OpenTelemetry Collector DaemonSet.

Check the logs for the deployment path you used.

For Datadog Agent deployment paths, use the Full-Host Profiler sidecar container:

```shell
kubectl logs -n <NAMESPACE> <DATADOG_AGENT_POD_NAME> -c host-profiler
```

For OpenTelemetry deployment paths, the pod has a single container:

```shell
kubectl logs -n <NAMESPACE> <POD_NAME>
```

Look for API key errors, endpoint errors, network errors, permission errors, or Collector configuration validation failures.

## Pod does not start

Inspect the pod events:

```shell
kubectl describe pod -n <NAMESPACE> <POD_NAME>
```

Common causes:

- **Image pull errors**: Verify that the preview image tag in your values or manifests is correct and that the cluster can pull from `registry.datadoghq.com`.
- **Missing API key secret**: For the example OpenTelemetry deployment paths, make sure the `datadog-secret` Secret exists in the same namespace as the Full-Host Profiler and contains the `api-key` key. To check that the key exists without displaying its value:

  ```shell
  kubectl get secret -n <NAMESPACE> datadog-secret \
    -o jsonpath='{.data.api-key}' | wc -c
  ```

  A value greater than `0` means the encoded key is present.

- **Cluster security policy**: Host-wide eBPF profiling requires host-level access, including `hostPID: true`, host kernel mounts, and eBPF-related Linux capabilities. If your cluster uses Pod Security Admission, OPA Gatekeeper, Kyverno, or another admission controller, make sure it allows the settings from the deployment path you're using. The Full-Host Profiler doesn't run as a privileged container.
- **SELinux profile errors**: The deployment examples use the `spc_t` SELinux type. If that type isn't available in your environment, replace it with an equivalent type supported by your distribution and security policy. See [Deploying the Full-Host Profiler][1] for the `seLinuxOptions` setting for your deployment path. The replacement must allow the host and process access the Full-Host Profiler requires.
- **Seccomp or AppArmor profile errors**: In the OpenTelemetry deployment paths, an init container installs the seccomp profile automatically. If the pod is stuck in init, inspect the init container logs. In the Datadog Operator preview path, seccomp is optional and must be provisioned manually if you enable it. AppArmor is optional; if you enable it, make sure the profile is loaded on every node where the Full-Host Profiler can run.
- **Unsupported environment**: This preview requires Kubernetes nodes that support host-level DaemonSets. Serverless, virtual-node, and restricted-node environments aren't supported. See [Supported environments][2].

## Profiles do not appear in Datadog

Profiles usually appear on the [Datadog Profiler][3] page within a few minutes after the rollout completes.

If no profiles appear:

1. Confirm that the Full-Host Profiler pods are running on the nodes you expect.
2. Check the Full-Host Profiler logs for export or configuration errors.
3. Verify that `DD_SITE` matches your Datadog site. For example, use `datadoghq.com`, `datadoghq.eu`, or another supported [Datadog site][4].
4. Verify that the Datadog API key is available to the Full-Host Profiler. OpenTelemetry deployment paths read it from the configured secret. Datadog Agent deployment paths use the Agent configuration by default.
5. Make sure the cluster allows egress to `https://otlp.<DD_SITE>`. If you enabled NetworkPolicy or CiliumNetworkPolicy, confirm that it allows Datadog OTLP egress.
6. In the Datadog Profiler UI, check the selected time range, environment, service, and host filters.

## Profiles are missing or grouped under the wrong service

If profiles appear for some workloads but not for a specific process:

- Make sure the workload runs on a node where the Full-Host Profiler DaemonSet is scheduled.
- Make sure the process runs long enough to be sampled and exported. Very short-lived processes might not appear immediately.
- Set `OTEL_SERVICE_NAME` or `DD_SERVICE` on the workload so profiles appear under the expected service. If neither environment variable is set, the Full-Host Profiler infers the service name from the binary name, such as `java` or `python` for interpreted workloads.
- Set `DD_ENV` and `DD_VERSION` for richer filtering in the Datadog Profiler UI. Support for equivalent metadata from `OTEL_RESOURCE_ATTRIBUTES` is in progress.

## Function names are missing or hard to read

For compiled languages such as C, C++, Rust, and Go, debug symbols are required for readable function names.

The Full-Host Profiler uploads debug symbols to Datadog when they are available locally. If your production binaries are stripped, upload symbols from your build artifacts separately. See [Debug symbols][5].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /profiler/enabling/full_host_deployment/
[2]: /profiler/enabling/full_host/#supported-environments
[3]: https://app.datadoghq.com/profiling
[4]: /getting_started/site/
[5]: /profiler/enabling/full_host/#debug-symbols
