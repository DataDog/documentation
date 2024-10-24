---
title: Threat Detection for Linux Without eBPF Support
disable_toc: false
---

This guide describes how to set up the CMS Threats eBPF-free solution for eBPF disabled environments such as AWS Fargate. The eBPF-free solution uses a ptrace-based Datadog agent.

This guide also describes some advantages of the ptrace solution.

## Summary of agent options

CMS Threats includes two agent options for threat detection and response:

- eBPF solution
- eBPF-free solution with ptrace

{{% collapse-content title="eBPF solution" level="h4" %}}

Datadog has built all its security products around [eBPF (extended Berkeley Packet Filter)][1]. Some of the benfits of eBPF are:

- eBPF improves safety by validating each program through the Linux kernel verifier. This ensures that a program can’t crash, fall into infinite loops, harm the system, etc.
- eBPF is JIT (Just In Time) compiled and the output bytecode is executed on a eBPF VM sandbox. This prevents any kernel crash and provides competitive performance.
- Easy to debug and maintain, can dynamically load programs, and has access to all information needed to trace the user space.

The Datadog eBPF agent code is [fully open source][2].

{{% /collapse-content %}} 

{{% collapse-content title="eBPF-free solution with ptrace" level="h4" %}}
Some environments have eBPF disabled, such as serverless compute engines that abstract away the underlying infrastructure, including the kernel, like AWS Fargate. The ptrace solution is provided for these environments.

The ptrace solution has the same features as the eBPF agent:

- Security profiles, providing:
  - Anomaly detection
  - Auto-suppression of normal behavior for signal triaging
  - Malware detection
- Network detections

<div class="alert alert-info">The current implementation supports amd64 and arm64 architecture and ABIs but can be extended to 32-bit ABIs.</div>

### Advantages of ptrace solution

A ptrace-based solution achieves a balance between robust threat detection and unwavering service availability. Some of the advantages of the ptrace-based solution are:

- Precise process control: ptrace provides detailed inspection of memory and registers, safeguarding critical application workloads. This granular visibility is essential for identifying sophisticated threats. Our procfs (Process Filesystem) scanner monitors all system-wide executions, enabling the surgical termination of malicious processes. Together, these tools protect from malicious activity.
- Operational stability: Operating in user space, ptrace avoids the complexities and risks of kernel space, providing a safer and more manageable approach. In the event of a failure, a ptrace-based agent defaults to a fail-open state at the OS layer, keeping the system unaffected, even if the application hangs.
- Performance efficiency: Recent benchmarks conducted by Datadog's engineering team demonstrate that our ptrace-based implementation shows comparable performance to kernel-based solutions. Specifically, it introduces only a minimal overhead of around 3% for PostgreSQL workloads and negligible impacts for Redis operations, making it highly efficient for most use cases.
- Open source verification: We have open-sourced our ptrace-based and eBPF agent, allowing clients and the security community to verify its safety and effectiveness themselves, fostering transparency and trust in our solution.
{{% /collapse-content %}} 


## eBPF-free agent setup

You can set up the eBPF-free agent on various platforms, including Docker, Kubernetes, and Linux hosts.

This section covers Docker, Kubernetes, and Linux hosts. For steps on setting up an Amazon fargate environment where eBPF is disabled, see [AWS Fargate Configuration Guide for Datadog Security][3].

### eBPF-free agent requirements

- The eBPF-free agent is designed for environments where eBPF is disabled, using ptrace for runtime security, and supports arm64/amd64 architectures.
- Custom installation commands and configurations are required for deploying the eBPF-free agent. Specific instructions are provided in this section for Docker, Kubernetes, and Linux host installations.

The eBPF-free solution includes two tracing modes for applications:

- Wrap mode: Traces applications from the start.
- Attach mode: Attaches to already running applications but comes with more performance overhead and limitations.

### eBPF-free setup steps

{{< tabs >}}
{{% tab "Docker" %}}
An additional environment variable is required on Docker. Add the following line to your docker installation command:

```shell
-e DD_RUNTIME_SECURITY_CONFIG_EBPFLESS_ENABLED=true
```

Replace the used Docker image `gcr.io/datadoghq/agent:7` with `datadog/agent-dev:7-55-1-beta-host-ebpfless-v0`.

The corresponding command should be:

```shell
docker run -d --name dd-agent \
  --cgroupns host \
  --pid host \
  --security-opt apparmor:unconfined \
  --cap-add SYS_ADMIN \
  --cap-add SYS_RESOURCE \
  --cap-add SYS_PTRACE \
  --cap-add NET_ADMIN \
  --cap-add NET_BROADCAST \
  --cap-add NET_RAW \
  --cap-add IPC_LOCK \
  --cap-add CHOWN \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  -v /proc/:/host/proc/:ro \
  -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
  -v /etc/passwd:/etc/passwd:ro \
  -v /etc/group:/etc/group:ro \
  -v /:/host/root:ro \
  -v /sys/kernel/debug:/sys/kernel/debug \
  -v /etc/os-release:/etc/os-release \
  -e DD_COMPLIANCE_CONFIG_ENABLED=true \
  -e DD_COMPLIANCE_CONFIG_HOST_BENCHMARKS_ENABLED=true \
  -e DD_RUNTIME_SECURITY_CONFIG_ENABLED=true \
  -e DD_RUNTIME_SECURITY_CONFIG_REMOTE_CONFIGURATION_ENABLED=true \
  -e DD_RUNTIME_SECURITY_CONFIG_EBPFLESS_ENABLED=true \
  -e HOST_ROOT=/host/root \
  -e DD_API_KEY=<API KEY> \
  datadog/agent-dev:7-55-1-beta-host-ebpfless-v0
```
{{% /tab %}}

{{% tab "Kubernetes" %}}
Add the following changes to each of the Kubernetes files.

#### Datadog operator

Add the following sections to your datadog-agent.yaml file:

{{< code-block lang="yaml" filename="datadog-agent.yaml" disable_copy="false" collapsible="true" >}}
spec:
  override:
    nodeAgent:
      image:
        name: "datadog/agent-dev:7-55-1-beta-host-ebpfless-v0"
  features:
    # [...]
    # Enables Threat Detection
    cws:
      enabled: true
      ebpfless:
        enabled: true
{{< /code-block >}}


#### Helm

Add the following sections to your datadog-values.yaml file:

{{< code-block lang="yaml" filename="datadog-values.yaml" disable_copy="false" collapsible="true" >}}
datadog:
  # [...]
  ## Enable security agent and provide custom configs
  securityAgent:
    # [...]
    runtime:
      # datadog.securityAgent.runtime.enabled -- Set to true to enable Cloud Workload Security (CWS)
      enabled: true
      ebpfless:
        enabled: true
# [...]
agents:
  # [...]
  ## Define the Datadog image to work with
  image:
    name: agent-dev
    # agents.image.tag -- Define the Agent version to use
    tag: 7-55-1-beta-host-ebpfless-v0
{{< /code-block >}}

#### Daemonset

To enable the eBPF-Free mode, add the following environment variable in the `system-probe` section in the daemonset.yaml file. Replace all references to the Datadog Docker image with the correct version:

{{< code-block lang="yaml" filename="daemonset.yaml" disable_copy="false" collapsible="true" >}}
        - name: agent
          image: "datadog/agent-dev:7-55-1-beta-host-ebpfless-v0"
        # [...]
        - name: trace-agent
          image: "datadog/agent-dev:7-55-1-beta-host-ebpfless-v0"
        # [...]
        - name: process-agent
          image: "datadog/agent-dev:7-55-1-beta-host-ebpfless-v0"
        # [...]
        - name: system-probe
          image: "datadog/agent-dev:7-55-1-beta-host-ebpfless-v0"
          # [...]
          env:
            - name: DD_RUNTIME_SECURITY_CONFIG_EBPFLESS_ENABLED
              value: "true"
        # [...]
        - name: security-agent
          image: "datadog/agent-dev:7-55-1-beta-host-ebpfless-v0"
      # [...]
      initContainers:
        - name: init-volume
          image: "datadog/agent-dev:7-55-1-beta-host-ebpfless-v0"
        # [...]
        - name: init-config
          image: "datadog/agent-dev:7-55-1-beta-host-ebpfless-v0"
        # [...]
        - name: seccomp-setup
          image: "datadog/agent-dev:7-55-1-beta-host-ebpfless-v0"
{{< /code-block >}}
{{% /tab %}}
{{% tab "Linux host" %}}
To install the agent to a Linux host, use the following install script to install the custom build:

```shell
DD_API_KEY=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX DD_SITE="datadoghq.com" \
DD_RUNTIME_SECURITY_CONFIG_ENABLED=true \
DD_REPO_URL=datad0g.com \
DD_AGENT_MINOR_VERSION=55.1~beta~host~ebpfless~v0-1 \
DD_AGENT_DIST_CHANNEL=beta bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
```

Alternartively, to manually install the `.deb/.rmp` provided custom build packages, modify the `/etc/datadog-agent/system-probe.yaml` file to enable CWS and eBPF-free mode as follow:

{{< code-block lang="java" filename="system-probe.yaml" disable_copy="false" collapsible="true" >}}
runtime_security_config:
  enabled: true
  ebpfless:
    enabled: true
{{< /code-block >}}
{{% /tab %}}

{{< /tabs >}}





## Deploy eBPF-free agent

Ensure you perform the following configuration requirements before deploying the agent:

1. Customize the [Agent Installation Instructions][5] before proceeding with the installation.
2. Install/update the agent with CSM enabled. For steps, see [Setting up Cloud Security Management on the Agent][4]. 
3. Specify additional configurations from the previous **eBPF-free agent setup** sections to install the custom version and enable eBPF-free mode.


## Verify setup

To validate your agent installation and setup, connect to your Linux host, Docker container, or Kubernetes pod, and run:

```shell
sudo /opt/datadog-agent/embedded/bin/system-probe config|grep -A 1 ebpfless
```

You should see the output:

```
  ebpfless:
    enabled: true
```

## Set up application tracing with eBPF-free agent

Once the eBPF-free agent is installed and set up to use the eBPF-Free mode, you can set up how your application is traced. This section provides you two different methods:

- **Wrap mode:** (Recommended) In this mode, your application is launched by the Datadog wrapper that traces it from the beginning using ptrace.
  - All spawned children are traced also.
  - A seccomp profile is applied to drastically reduce the ptracing overhead.
- **Attach mode:** In this mode, you can specify a list of PIDs to attach to your application processes. This should be done as quickly as possible because your application is not ptraced until this is done. 
  - In this mode, a seccomp profile cannot be applied. Consequently, there is a small amount ptracing overhead.

Both modes use the **cws-instrumentation** binary packaged with the datadog agent, and located at `/opt/datadog-agent/embedded/bin/cws-instrumentation`.

NB: This tracer will communicate with system-probe (part of the datadog agent) on localhost on port 5678. The system-probe address could be configured with the “--probe-addr=host:port” cws-instrumentation option. The server-side address can be updated through the runtime_security_config.ebpfless.socket option of the /etc/datadog-agent/system-probe.yaml agent config file.

<div class="alert alert-info">
This tracer communicates with system-probe (part of the Datadog agent) on localhost using port 5678. The system-probe address can be configured with the <code>--probe-addr=host:port</code> cws-instrumentation option. The server-side address can be updated through the runtime_security_config.ebpfless.socket option of the <code>/etc/datadog-agent/system-probe.yaml</code> agent config file.
</div>

{{< tabs >}}
{{% tab "Wrap mode" %}}
In wrap mode, the Datadog wrapper launchs the application. Here is an example:

```shell
sudo /opt/datadog-agent/embedded/bin/cws-instrumentation trace -- /usr/bin/your_application
```

If your application rund as non-root, specify the uid/gid as numeric values:

```shell
sudo /opt/datadog-agent/embedded/bin/cws-instrumentation trace --uid 100 --gid 100 -- /usr/bin/your_application
```

<div class="alert alert-info">An application won’t start until cws-instrumentation has initialized its connection with the Datadog agent.</div>

The following examples show how the tracer can be integrated within applications for different deployment types.

<div class="alert alert-info">On older 3.4 kernels, the seccomp profile is not available and should be disabled with the <code>–disable-seccomp</code> option.</div>

#### Linux systemd service

If you already have an init script, here is a simple example of the required changes:

```shell
   [Unit]
   Description=My application
   After=datadog-agent-sysprobe.service

   [Service]
   ExecStart=/opt/datadog-agent/embedded/bin/cws-instrumentation trace -- /usr/bin/myapp
   Restart=on-failure

   [Install]
   WantedBy=multi-user.target
```

#### Linux sysvinit service

If you already have an init script, here is a simple example of the required changes:

```shell
#!/bin/sh
set -e
### BEGIN INIT INFO
# Provides:           my_app
# Required-Start:     $network
# Required-Stop:      $network
# Default-Start:      2 3 4 5
# Default-Stop:       0 1 6
# Short-Description:  My application
# Description: My application
### END INIT INFO

# Start the service
start() {
        echo "Starting my app"
        /opt/datadog-agent/embedded/bin/cws-instrumentation trace -- /usr/bin/myapp &
}


# Stop the service
stop() {
       echo "Stopping my app"
	pkill -f /usr/bin/myapp
}

### main logic ###
case "$1" in
  start)
        start
        ;;
  stop)
        stop
        ;;
  restart)
        stop
        start
        ;;
  *)
        echo $"Usage: $0 {start|stop|restart}"
        exit 1
esac

exit 0
```

#### Docker

For Docker application deployments, you should modify your Dockerfile to wrap your application like this:

```shell
FROM datadog/agent-dev:7-55-1-beta-host-ebpfless-v0 AS datadogagent

FROM ubuntu:latest

COPY --from=datadogagent /opt/datadog-agent/embedded/bin/cws-instrumentation .

ENTRYPOINT ["/cws-instrumentation", "trace", "--"]

CMD ["/bin/bash", "-c", "while true; do sleep 1; echo my app is running; done"]
```

When running your docker application, it’s important to give it an additional capability by adding `--cap-add=SYS_PTRACE` to your `docker run` command.

You also have to connect the container to Datadog on port 5678 by doing one of the following:

- Launch both containers with the `--network` host option.
- Use the [Docker network][6] feature to run both containers on the same bridge network.

#### Kubernetes

Here is an example of a values.yaml file used to deploy a wrapped application together with the Datadog eBPF-Free agent:

```shell
apiVersion: apps/v1
kind: Deployment
metadata:
 name: "my_app"
 namespace: default
spec:
 replicas: 1
 selector:
   matchLabels:
     app: "my_app"
 template:
   metadata:
     labels:
       app: "my_app"
     name: "my_pod"
   spec:
     initContainers:
     - name: cws-instrumentation-init
       image: public.ecr.aws/datadog/agent-dev:7-55-1-beta-host-ebpfless-v0
       command:
         - "/opt/datadog-agent/embedded/bin/cws-instrumentation"
         - "setup"
         - "--cws-volume-mount"
         - "/cws-instrumentation-volume"
       volumeMounts:
         - name: cws-instrumentation-volume
           mountPath: "/cws-instrumentation-volume"
       securityContext:
         runAsUser: 0
     containers:
     - name: "my_app"
       image: "my_image:latest"
       command:
         - "/cws-instrumentation-volume/cws-instrumentation"
         - "trace"
         - "--"
         - "my_entrypoint"
       volumeMounts:
         - name: cws-instrumentation-volume
           mountPath: "/cws-instrumentation-volume"
           readOnly: true
     - name: datadog-agent
       image: public.ecr.aws/datadog/agent-dev:7-55-1-beta-host-ebpfless-v0
       env:
         - name: DD_API_KEY
           value: "<DD_API_KEY>"
         - name: DD_RUNTIME_SECURITY_CONFIG_ENABLED
           value: "true"
         - name: DD_RUNTIME_SECURITY_CONFIG_EBPFLESS_ENABLED
           value: "true"
     volumes:
       - name: cws-instrumentation-volume
     serviceAccountName: datadog-agent
     shareProcessNamespace: true
```
{{% /tab %}}

{{% tab "Attach mode" %}}
The wrap mode is recommended because the attach mode has the following limitations: 

- It misses all initialization made by the application until Datadog attaches to it.
- More performance overhead.
- If the traced application restarts, Datadog must ensure that the tracer restarts also.

The attach mode differs from the wrap mode by attaching directly the tracer on an already running application, like this:

```shell
sudo /opt/datadog-agent/embedded/bin/cws-instrumentation trace --pid 2301
```

Several PIDs can be attached at once:

```shell
sudo /opt/datadog-agent/embedded/bin/cws-instrumentation trace --pid 2301 --pid 2302 --pid 2303
```

The following examples show how the tracer can be integrated within applications for different deployment types.

#### Linux systemd service

If you already have an init script, here is an example of how to integrate the wrapper using a new systemd service:

```shell
[Unit]
Description=Datadog CWS instrumentation attach to my application
After=datadog-agent-sysprobe.service my-app.service

[Service]
ExecStart=/bin/bash -c "/opt/datadog-agent/embedded/bin/cws-instrumentation trace $(for pid in $(pidof myapp); do echo --pid $pid; done)"
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

#### Linux sysvinit service

If you already have an init script, here is an example of how to integrate the tracer using a new sysvinit service:

```shell
#!/bin/sh
set -e
### BEGIN INIT INFO
# Provides:           dd_tracing_my_app
# Required-Start:     $network
# Required-Stop:      $network
# Default-Start:      2 3 4 5
# Default-Stop:       0 1 6
# Short-Description:  Datadog tracing of my application
# Description: Datadog tracing of my application
### END INIT INFO

# Start the service
start() {
        echo "Starting tracing my app"
        /opt/datadog-agent/embedded/bin/cws-instrumentation trace $(for pid in $(pidof myapp); do echo --pid $pid; done) &
}


# Stop the service
stop() {
       echo "Stopping my app"
	pkill -f /opt/datadog-agent/embedded/bin/cws-instrumentation
}

### main logic ###
case "$1" in
  start)
        start
        ;;
  stop)
        stop
        ;;
  restart)
        stop
        start
        ;;
  *)
        echo $"Usage: $0 {start|stop|restart}"
        exit 1
esac

exit 0
```

#### Docker

To attach the wrapper to a Docker image running an application, use this following Dockerfile:

```shell
FROM datadog/agent-dev:7-55-1-beta-host-ebpfless-v0

ENTRYPOINT ["/opt/datadog-agent/embedded/bin/cws-instrumentation", "trace", "--pid", "$PID"]
```

Next, provide the host PID for connecting to Docker as an environment variable.

To attach to an application, you’ll need the following:

- When running the Docker application, add the required capability by including `--cap-add=SYS_PTRACE` to your `docker run` command.
- Ensure the application container can reach the Datadog container on port 5678 using one of the following methods:
  - Launch both containers with the `--network` host option.
  - Use the [Docker network][6] feature to run both containers on the same bridge network.
- To ensure the application container is running on the host pid (just as the Datadog agent does), add these options: `--cgroupns host --pid host`.
{{% /tab %}}
{{< /tabs >}}



[1]: https://ebpf.io/what-is-ebpf/
[2]: https://github.com/DataDog/datadog-agent
[3]: /security/guide/aws_fargate_config_guide/?tab=amazonecs
[4]: /security/cloud_security_management/setup/agent
[5]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
[6]: https://docs.docker.com/network/