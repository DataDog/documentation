<!--
Host Profiler profiler setup — self-contained.
Branches on $mode: bundled (Datadog Agent) or standalone (OTel, no Agent).
-->

{% alert level="warning" %}
The host profiler is in Preview and subject to change.
{% /alert %}

Host profiling collects CPU and memory profiles at the OS level across all processes, regardless of language or runtime.

Select the mode that matches your infrastructure:

- **Bundled**: the host profiler runs alongside the Datadog Agent, which forwards profiles to Datadog. Choose this mode if you already run the Agent or are willing to deploy it.
- **Standalone**: the host profiler exports profiles through OpenTelemetry (OTel) with no Datadog Agent required. Choose this mode if your stack is fully OTel-based (Helm charts or the OTel Operator).

## Requirements

Supported operating systems
: Linux (kernel 5.10+)

Supported architecture
: `amd64` or `arm64` processors

Serverless
: The host profiler is not supported on serverless platforms such as AWS Lambda.

Kubernetes restrictions
: The host profiler is not supported on GKE Autopilot or GKE GDC.

Debugging information
: For compiled languages (C, C++, Rust, Go), symbols must be available locally or uploaded with `datadog-ci`. See [Debug symbols](#debug-symbols).

{% if equals($mode, "bundled") %}

## Bundled mode

In bundled mode, the host profiler runs as a sidecar container inside the Datadog Agent DaemonSet. The Agent collects and forwards profiles to Datadog.

### Installation

{% tabs %}

{% tab label="Datadog Operator" %}

1. Add the `agent.datadoghq.com/host-profiler-enabled: "true"` annotation to your `DatadogAgent` resource:

   ```yaml
   apiVersion: datadoghq.com/v2alpha1
   kind: DatadogAgent
   metadata:
     name: datadog
     annotations:
       agent.datadoghq.com/host-profiler-enabled: "true"
   spec:
     global:
       credentials:
         apiKey: <DATADOG_API_KEY>
   ```

2. Apply the manifest:

   ```bash
   kubectl apply -f datadog-agent.yaml
   ```

The Operator configures the host profiler sidecar with the required Linux capabilities (`BPF`, `PERFMON`, `SYS_PTRACE`, `SYS_RESOURCE`, `DAC_READ_SEARCH`, `SYSLOG`, `CHECKPOINT_RESTORE`), mounts `/sys/kernel/tracing`, and installs the seccomp profile.

{% /tab %}

{% tab label="Helm" %}

1. Add the following to your Helm values file:

   ```yaml
   datadog:
     apiKey: <DATADOG_API_KEY>
     site: <DATADOG_SITE>
     hostProfiler:
       enabled: true
   ```

2. Deploy or upgrade the chart:

   ```bash
   helm upgrade --install datadog-agent datadog/datadog \
     -f values.yaml
   ```

The chart deploys the host profiler as a sidecar container in the Agent DaemonSet and configures the required capabilities and seccomp profile.

{% alert %}
Replace `<DATADOG_SITE>` with your Datadog site (for example, `datadoghq.com`). See [Datadog sites][1].
{% /alert %}

{% /tab %}

{% /tabs %}

### Configuration

**Log level**

{% tabs %}

{% tab label="Datadog Operator" %}

```yaml
spec:
  override:
    nodeAgent:
      containers:
        host-profiler:
          env:
            - name: DD_LOG_LEVEL
              value: debug
```

{% /tab %}

{% tab label="Helm" %}

```yaml
agents:
  containers:
    hostProfiler:
      logLevel: debug
```

{% /tab %}

{% /tabs %}

**Resource limits**

{% tabs %}

{% tab label="Helm" %}

```yaml
agents:
  containers:
    hostProfiler:
      resources:
        requests:
          cpu: 100m
          memory: 200Mi
        limits:
          cpu: 200m
          memory: 400Mi
```

{% /tab %}

{% /tabs %}

{% /if %}

{% if equals($mode, "standalone") %}

## Standalone mode

In standalone mode, the host profiler runs as an OpenTelemetry Collector DaemonSet and exports profiles directly to Datadog without a Datadog Agent.

### Prerequisites

Provision the seccomp profile onto every node before deploying the host profiler. The seccomp profile allows the host profiler to run without `privileged: true`.

1. Create a namespace and a ConfigMap containing the seccomp profile:

   ```yaml
   apiVersion: v1
   kind: Namespace
   metadata:
     name: ebpf-profiler
   ---
   apiVersion: v1
   kind: ConfigMap
   metadata:
     name: ebpf-profiler-seccomp
     namespace: ebpf-profiler
   data:
     ebpf-profiler: |
       {
         "defaultAction": "SCMP_ACT_ERRNO",
         "architectures": [
           "SCMP_ARCH_X86_64",
           "SCMP_ARCH_AARCH64"
         ],
         "syscalls": [
           {
             "names": [
               "accept4", "access", "arch_prctl", "bind", "bpf", "brk",
               "clone", "clone3", "close", "connect", "dup3",
               "epoll_create1", "epoll_ctl", "epoll_pwait", "epoll_wait",
               "eventfd2", "execve", "exit", "exit_group", "faccessat2",
               "fcntl", "fstat", "fstatfs", "fsync", "futex", "getcwd",
               "getdents64", "getpeername", "getpid", "getrandom",
               "getrlimit", "getsockname", "getsockopt", "gettid", "ioctl",
               "listen", "lseek", "madvise", "mmap", "mprotect", "munmap",
               "nanosleep", "newfstatat", "openat", "openat2",
               "perf_event_open", "pidfd_open", "pidfd_send_signal", "pipe2",
               "prctl", "pread64", "prlimit64", "process_vm_readv", "read",
               "readlinkat", "recvmsg", "restart_syscall", "rseq",
               "rt_sigaction", "rt_sigprocmask", "rt_sigreturn",
               "sched_getaffinity", "sched_yield", "sendto",
               "set_robust_list", "set_tid_address", "setrlimit",
               "setsockopt", "sigaltstack", "socket", "statfs", "statx",
               "sysinfo", "tgkill", "uname", "waitid", "write"
             ],
             "action": "SCMP_ACT_ALLOW"
           },
           {
             "names": ["kill"],
             "action": "SCMP_ACT_ALLOW",
             "args": [{"index": 1, "value": 0, "op": "SCMP_CMP_EQ"}],
             "comment": "allow process liveness check via kill(pid, 0)"
           }
         ]
       }
   ```

   Apply it:

   ```bash
   kubectl apply -f ebpf-profiler-seccomp.yaml
   ```

2. Deploy a DaemonSet that copies the seccomp profile to each node:

   ```yaml
   apiVersion: apps/v1
   kind: DaemonSet
   metadata:
     name: ebpf-profiler-seccomp-installer
     namespace: ebpf-profiler
   spec:
     selector:
       matchLabels:
         app: ebpf-profiler-seccomp-installer
     template:
       metadata:
         labels:
           app: ebpf-profiler-seccomp-installer
       spec:
         initContainers:
           - name: install-seccomp
             image: busybox:1.36
             securityContext:
               privileged: true
             command:
               - cp
               - /profile/ebpf-profiler
               - /host-seccomp/ebpf-profiler
             volumeMounts:
               - name: profile
                 mountPath: /profile
                 readOnly: true
               - name: host-seccomp
                 mountPath: /host-seccomp
         containers:
           - name: pause
             image: gcr.io/google-containers/pause:3.1
         volumes:
           - name: profile
             configMap:
               name: ebpf-profiler-seccomp
           - name: host-seccomp
             hostPath:
               path: /var/lib/kubelet/seccomp
               type: DirectoryOrCreate
   ```

   ```bash
   kubectl apply -f ebpf-profiler-seccomp-installer.yaml
   ```

   This DaemonSet copies the seccomp profile to `/var/lib/kubelet/seccomp/ebpf-profiler` on each node.

### Installation

{% tabs %}

{% tab label="OTel Operator" %}

1. Install the OpenTelemetry Operator if not already deployed:

   ```bash
   helm repo add open-telemetry https://open-telemetry.github.io/opentelemetry-helm-charts
   helm install opentelemetry-operator open-telemetry/opentelemetry-operator \
     --namespace opentelemetry-operator-system \
     --create-namespace
   ```

2. Create an `OpenTelemetryCollector` resource in DaemonSet mode:

   ```yaml
   apiVersion: opentelemetry.io/v1beta1
   kind: OpenTelemetryCollector
   metadata:
     name: datadog-host-profiler
     namespace: ebpf-profiler
   spec:
     mode: daemonset
     image: ghcr.io/open-telemetry/opentelemetry-collector-releases/opentelemetry-collector-ebpf-profiler:latest
     hostPID: true
     securityContext:
       privileged: false
       readOnlyRootFilesystem: true
       allowPrivilegeEscalation: false
       capabilities:
         add:
           - BPF
           - PERFMON
           - SYS_PTRACE
           - SYS_RESOURCE
           - DAC_READ_SEARCH
           - SYSLOG
           - CHECKPOINT_RESTORE
         drop:
           - ALL
       seccompProfile:
         type: Localhost
         localhostProfile: ebpf-profiler
     env:
       - name: DD_API_KEY
         valueFrom:
           secretKeyRef:
             name: datadog-secret
             key: api-key
       - name: DD_SITE
         value: <DATADOG_SITE>
     volumeMounts:
       - name: tmpdir
         mountPath: /tmp
     volumes:
       - name: tmpdir
         emptyDir: {}
     config:
       receivers:
         profiling: {}
       exporters:
         otlphttp:
           profiles_endpoint: https://intake.profile.${env:DD_SITE}/v1development/profiles
           metrics_endpoint: https://otlp.${env:DD_SITE}/v1/metrics
           headers:
             dd-api-key: ${env:DD_API_KEY}
       service:
         pipelines:
           profiles:
             receivers: [profiling]
             exporters: [otlphttp]
   ```

3. Apply the manifest:

   ```bash
   kubectl apply -f host-profiler-collector.yaml
   ```

{% /tab %}

{% tab label="Helm" %}

1. Add the OpenTelemetry Helm repository:

   ```bash
   helm repo add open-telemetry https://open-telemetry.github.io/opentelemetry-helm-charts
   helm repo update
   ```

2. Create a values file (`values-host-profiler.yaml`):

   ```yaml
   mode: daemonset

   image:
     repository: ghcr.io/open-telemetry/opentelemetry-collector-releases/opentelemetry-collector-ebpf-profiler

   command:
     name: otelcol-ebpf-profiler
     extraArgs:
       - --feature-gates=+service.profilesSupport

   presets:
     profiling:
       enabled: true
     kubernetesAttributes:
       enabled: true

   hostPID: true

   securityContext:
     privileged: false
     readOnlyRootFilesystem: true
     allowPrivilegeEscalation: false
     capabilities:
       add:
         - BPF
         - PERFMON
         - SYS_PTRACE
         - SYS_RESOURCE
         - DAC_READ_SEARCH
         - SYSLOG
         - CHECKPOINT_RESTORE
       drop:
         - ALL
     seccompProfile:
       type: Localhost
       localhostProfile: ebpf-profiler

   initContainers:
     - name: install-seccomp
       image: busybox:1.36
       securityContext:
         readOnlyRootFilesystem: true
         allowPrivilegeEscalation: false
         capabilities:
           drop: ["ALL"]
       command:
         - cp
         - /profile/ebpf-profiler
         - /host-seccomp/ebpf-profiler
       volumeMounts:
         - name: seccomp-profile
           mountPath: /profile
           readOnly: true
         - name: host-seccomp
           mountPath: /host-seccomp

   extraVolumeMounts:
     - name: tmpdir
       mountPath: /tmp

   extraVolumes:
     - name: tmpdir
       emptyDir: {}
     - name: seccomp-profile
       configMap:
         name: ebpf-profiler-seccomp
     - name: host-seccomp
       hostPath:
         path: /var/lib/kubelet/seccomp
         type: DirectoryOrCreate

   extraEnvs:
     - name: DD_API_KEY
       valueFrom:
         secretKeyRef:
           name: datadog-secret
           key: api-key
     - name: DD_SITE
       value: <DATADOG_SITE>

   config:
     receivers:
       profiling:
         symbol_uploader:
           enabled: true
           symbol_endpoints:
             - site: ${env:DD_SITE}
               api_key: ${env:DD_API_KEY}
     exporters:
       otlphttp:
         profiles_endpoint: https://intake.profile.${env:DD_SITE}/v1development/profiles
         metrics_endpoint: https://otlp.${env:DD_SITE}/v1/metrics
         headers:
           dd-api-key: ${env:DD_API_KEY}
     service:
       pipelines:
         profiles:
           receivers: [profiling]
           exporters: [otlphttp]
   ```

3. Store your Datadog API key as a Kubernetes secret:

   ```bash
   kubectl create secret generic datadog-secret \
     --from-literal=api-key=<DATADOG_API_KEY> \
     --namespace ebpf-profiler
   ```

4. Deploy the chart:

   ```bash
   helm install datadog-host-profiler open-telemetry/opentelemetry-collector \
     --namespace ebpf-profiler \
     -f values-host-profiler.yaml
   ```

{% alert %}
Replace `<DATADOG_SITE>` with your Datadog site (for example, `datadoghq.com`). See [Datadog sites][1].
{% /alert %}

{% /tab %}

{% /tabs %}

{% /if %}

## Service naming

The host profiler collects profiles from every process on the host and determines each process's service name from its `DD_SERVICE` environment variable.

If `DD_SERVICE` is not set, the profiler infers the service name from the binary name. For interpreted languages, this is the interpreter name (for example, `java` for a Java process). If multiple services share the same interpreter and none set `DD_SERVICE`, their profiles are grouped under the same inferred name.

Set `DD_SERVICE` on each workload to identify separately:

```yaml
env:
  - name: DD_SERVICE
    value: my-service
```

Set `DD_ENV` and `DD_VERSION` for richer filtering in the Profiler UI.

## Debug symbols

For compiled languages (C, C++, Rust, Go), the host profiler uploads local debug symbols to Datadog for symbolization. Binaries must include debug symbols (not stripped) for function names to appear in profiles.

To upload symbols from stripped binaries:

1. Install the [datadog-ci CLI][2].
2. Set your API key and site:
   ```bash
   export DD_API_KEY=<DATADOG_API_KEY>
   export DD_SITE=<DATADOG_SITE>
   ```
3. Upload symbols:
   ```bash
   DD_BETA_COMMANDS_ENABLED=1 datadog-ci elf-symbols upload /path/to/build/symbols/
   ```

## Verification

After deploying the host profiler, profiles appear on the [Datadog Profiler page][3] within a few minutes. If profiles do not appear, see the [Profiler Troubleshooting][4] guide.

[1]: /getting_started/site/
[2]: https://github.com/DataDog/datadog-ci
[3]: https://app.datadoghq.com/profiling
[4]: /profiler/profiler_troubleshooting/
