---
title: Setting up Universal Service Monitoring
further_reading:
- link: "/universal_service_monitoring/"
  tag: "Documentation"
  text: "Learn about Universal Service Monitoring"
- link: "https://www.datadoghq.com/blog/universal-service-monitoring-datadog/"
  tag: "Blog"
  text: "Golden signals in seconds with Universal Service Monitoring"
---


## Supported versions and compatibility

Required Agent version
: Universal Service Monitoring requires that the Datadog Agent installed alongside your containerized service be at least version 6.40 or 7.40. As noted below, some beta features require higher versions.

Supported Linux platforms
: Linux Kernel 4.14 and greater<br/>
CentOS or RHEL 8.0 and greater

Supported Windows platforms
: IIS on Windows 2012 R2 and greater

Supported application-layer protocols
: HTTP<br/>
HTTPS (OpenSSL)

Known limitations
: Universal Service Monitoring requires the use of Datadog's `system-probe`, which is not supported on Google Kubernetes Engine (GKE) Autopilot.

<div class="alert alert-info">
Additional protocols and traffic encryption methods are supported in <a href="/universal_service_monitoring/additional_protocols/">private beta</a>. If you have feedback about what platforms and protocols you'd like to see supported, <a href="/help/">contact Support</a>.
</div>

## Prerequisites

- If on Linux:
    - Your service is running in a container.
    - **Beta:** For non-containerized services see the [instructions here](#additional-configuration).
- If on Windows IIS:
    - Your service is running on a virtual machine.
- Datadog Agent is installed alongside your service. Installing a tracing library is _not_ required.
- The `env` tag for [Unified Service Tagging][1] has been applied to your deployment. The `service` and `version` tags are optional.

## Enabling Universal Service Monitoring

Enable Universal Service Monitoring in your Agent by using one of the following methods depending on how your service is deployed and your Agent configured:

{{< tabs >}}
{{% tab "Helm" %}}

Using the Datadog chart version >= 2.26.2, add the following to your values file:

```
datadog:
  ...
  serviceMonitoring:
    enabled: true
```

If your cluster is running Google Container-Optimized OS (COS), add the following to your values file as well:

```
providers:
  gke:
    cos: true
```

{{% /tab %}}
{{% tab "Operator" %}}

Datadog Operator v1.0.0 or greater is required.

To enable Universal Service Monitoring with the [Datadog Operator][1], update your `datadog-agent.yaml` manifest. In the `DatadogAgent` resource, set `spec.features.usm.enabled` to `true`:

   ```yaml
   apiVersion: datadoghq.com/v2alpha1
   kind: DatadogAgent
   metadata:
     name: datadog
   spec:
     global:
       credentials:
        apiSecret:
           secretName: datadog-secret
           keyName: api-key
        appSecret:
         secretName: datadog-secret
         keyName: app-key
     features:
       usm:
         enabled: true
   ```


[1]: https://github.com/DataDog/datadog-operator

{{% /tab %}}
{{% tab "Kubernetes without Helm" %}}

1. Add the annotation `container.apparmor.security.beta.kubernetes.io/system-probe: unconfined` on the `datadog-agent` template:

   ```yaml
   spec:
     selector:
       matchLabels:
         app: datadog-agent
     template:
       metadata:
         labels:
           app: datadog-agent
         name: datadog-agent
         annotations:
           container.apparmor.security.beta.kubernetes.io/system-probe: unconfined
    ```
2. Enable Universal Service Monitoring with the following environment variables in the Agent daemonset. If you are running a container per Agent process, add the following environment variables to the `process-agent` container. Otherwise, add them to the `agent` container.

   ```yaml
   ...
     env:
       ...
       - name: DD_SYSTEM_PROBE_SERVICE_MONITORING_ENABLED
         value: 'true'
       - name: DD_SYSTEM_PROBE_EXTERNAL
         value: 'true'
       - name: DD_SYSPROBE_SOCKET
         value: /var/run/sysprobe/sysprobe.sock
   ```

3. Mount the following extra volumes into the `datadog-agent` container:
   ```yaml
   ...
   spec:
     serviceAccountName: datadog-agent
     containers:
       - name: datadog-agent
         image: 'gcr.io/datadoghq/agent:latest'
         ...
     volumeMounts:
       ...
       - name: sysprobe-socket-dir
       mountPath: /var/run/sysprobe
   ```

4. Add a new `system-probe` container as a sidecar to the Agent:

   ```yaml
   ...
   spec:
     serviceAccountName: datadog-agent
     containers:
       - name: datadog-agent
         image: 'gcr.io/datadoghq/agent:latest'
         ...
       - name: system-probe
         image: 'gcr.io/datadoghq/agent:latest'
         imagePullPolicy: Always
         securityContext:
           capabilities:
             add:
               - SYS_ADMIN
               - SYS_RESOURCE
               - SYS_PTRACE
               - NET_ADMIN
               - NET_BROADCAST
               - NET_RAW
               - IPC_LOCK
               - CHOWN
         command:
           - /opt/datadog-agent/embedded/bin/system-probe
         env:
           - name: DD_SYSTEM_PROBE_SERVICE_MONITORING_ENABLED
             value: 'true'
           - name: DD_SYSPROBE_SOCKET
             value: /var/run/sysprobe/sysprobe.sock
         resources: {}
         volumeMounts:
           - name: procdir
             mountPath: /host/proc
             readOnly: true
           - name: cgroups
             mountPath: /host/sys/fs/cgroup
             readOnly: true
           - name: debugfs
             mountPath: /sys/kernel/debug
           - name: sysprobe-socket-dir
             mountPath: /var/run/sysprobe
           - name: modules
             mountPath: /lib/modules
             readOnly: true
           - name: src
             mountPath: /usr/src
             readOnly: true
           - name: runtime-compiler-output-dir
             mountPath: /var/tmp/datadog-agent/system-probe/build
           - name: kernel-headers-download-dir
             mountPath: /var/tmp/datadog-agent/system-probe/kernel-headers
             readOnly: false
           - name: apt-config-dir
             mountPath: /host/etc/apt
             readOnly: true
           - name: yum-repos-dir
             mountPath: /host/etc/yum.repos.d
             readOnly: true
           - name: opensuse-repos-dir
             mountPath: /host/etc/zypp
             readOnly: true
           - name: public-key-dir
             mountPath: /host/etc/pki
             readOnly: true
           - name: yum-vars-dir
             mountPath: /host/etc/yum/vars
             readOnly: true
           - name: dnf-vars-dir
             mountPath: /host/etc/dnf/vars
             readOnly: true
           - name: rhel-subscription-dir
             mountPath: /host/etc/rhsm
             readOnly: true
   ```

5. Add the following volumes to your manifest:
   ```yaml
   volumes:
     - name: sysprobe-socket-dir
       emptyDir: {}
     - name: procdir
       hostPath:
         path: /proc
     - name: debugfs
       hostPath:
         path: /sys/kernel/debug
     - hostPath:
         path: /lib/modules
       name: modules
     - hostPath:
         path: /usr/src
       name: src
     - hostPath:
         path: /var/tmp/datadog-agent/system-probe/build
       name: runtime-compiler-output-dir
     - hostPath:
         path: /var/tmp/datadog-agent/system-probe/kernel-headers
       name: kernel-headers-download-dir
     - hostPath:
         path: /etc/apt
       name: apt-config-dir
     - hostPath:
         path: /etc/yum.repos.d
       name: yum-repos-dir
     - hostPath:
         path: /etc/zypp
       name: opensuse-repos-dir
     - hostPath:
         path: /etc/pki
       name: public-key-dir
     - hostPath:
         path: /etc/yum/vars
       name: yum-vars-dir
     - hostPath:
         path: /etc/dnf/vars
       name: dnf-vars-dir
     - hostPath:
         path: /etc/rhsm
       name: rhel-subscription-dir

   ```

    **Note**: If your cluster runs on Google Container-Optimized OS (COS), remove the `src` mount by removing the following from your container definition:
   ```yaml
    - name: src
      mountPath: /usr/src
      readOnly: true
   ```
    And removing the following from your manifest:
   ```yaml
    - hostPath:
        path: /usr/src
      name: src
   ```

6. For optional HTTPS support, add the following to the `system-probe` container:

   ```yaml
   env:
     - name: HOST_ROOT
       value: /host/root
   volumeMounts:
     - name: hostroot
       mountPath: /host/root
       readOnly: true
   ```

   And add the following volumes to your manifest:
   ```yaml
   volumes:
     - name: hostroot
       hostPath:
       path: /
   ```

{{% /tab %}}
{{% tab "Docker" %}}

Add the following to your `docker run` command:

```shell
docker run --cgroupns host \
--pid host \
-e DD_API_KEY="<DATADOG_API_KEY>" \
-e DD_SYSTEM_PROBE_SERVICE_MONITORING_ENABLED=true \
-v /var/run/docker.sock:/var/run/docker.sock:ro \
-v /proc/:/host/proc/:ro \
-v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
-v /sys/kernel/debug:/sys/kernel/debug \
-v /lib/modules:/lib/modules:ro \
-v /usr/src:/usr/src:ro \
-v /var/tmp/datadog-agent/system-probe/build:/var/tmp/datadog-agent/system-probe/build \
-v /var/tmp/datadog-agent/system-probe/kernel-headers:/var/tmp/datadog-agent/system-probe/kernel-headers \
-v /etc/apt:/host/etc/apt:ro \
-v /etc/yum.repos.d:/host/etc/yum.repos.d:ro \
-v /etc/zypp:/host/etc/zypp:ro \
-v /etc/pki:/host/etc/pki:ro \
-v /etc/yum/vars:/host/etc/yum/vars:ro \
-v /etc/dnf/vars:/host/etc/dnf/vars:ro \
-v /etc/rhsm:/host/etc/rhsm:ro \
-e DD_SYSTEM_PROBE_SERVICE_MONITORING_ENABLED=true \
-e HOST_ROOT=/host/root \
--security-opt apparmor:unconfined \
--cap-add=SYS_ADMIN \
--cap-add=SYS_RESOURCE \
--cap-add=SYS_PTRACE \
--cap-add=NET_ADMIN \
--cap-add=NET_BROADCAST \
--cap-add=NET_RAW \
--cap-add=IPC_LOCK \
--cap-add=CHOWN \
gcr.io/datadoghq/agent:latest
```

{{% /tab %}}
{{% tab "Docker Compose" %}}

Add the following to your `docker-compose.yml` file:

```yaml
services:
  ...
  datadog:
    ...
    environment:
     - DD_SYSTEM_PROBE_SERVICE_MONITORING_ENABLED='true'
    volumes:
     - /var/run/docker.sock:/var/run/docker.sock:ro
     - /proc/:/host/proc/:ro
     - /sys/fs/cgroup/:/host/sys/fs/cgroup:ro
     - /sys/kernel/debug:/sys/kernel/debug
     - /lib/modules:/lib/modules
     - /usr/src:/usr/src
     - /var/tmp/datadog-agent/system-probe/build:/var/tmp/datadog-agent/system-probe/build
     - /var/tmp/datadog-agent/system-probe/kernel-headers:/var/tmp/datadog-agent/system-probe/kernel-headers
     - /etc/apt:/host/etc/apt
     - /etc/yum.repos.d:/host/etc/yum.repos.d
     - /etc/zypp:/host/etc/zypp
     - /etc/pki:/host/etc/pki
     - /etc/yum/vars:/host/etc/yum/vars
     - /etc/dnf/vars:/host/etc/dnf/vars
     - /etc/rhsm:/host/etc/rhsm
    cap_add:
     - SYS_ADMIN
     - SYS_RESOURCE
     - SYS_PTRACE
     - NET_ADMIN
     - NET_BROADCAST
     - NET_RAW
     - IPC_LOCK
     - CHOWN
    security_opt:
     - apparmor:unconfined
```

For optional HTTPS support, also add:

```yaml
services:
  ...
  datadog:
    ...
    environment:
     - HOST_ROOT: '/host/root'
    volumes:
     - /:/host/root:ro
```

{{% /tab %}}
{{% tab "Docker Swarm" %}}

As `Docker Swarm` does not yet support the changing of `security_opt`, the operating system
must not have a running `apparmor` instance.

If the operating system does not have a running `apparmor` instance, use the same `docker-compose.yml` file from the `Docker-Compose` [section][1] beside the field `security_opt`.

[1]: /universal_service_monitoring/setup/?tab=dockercompose#enabling-universal-service-monitoring

{{% /tab %}}
{{% tab "Configuration files (Linux)" %}}

If you are not using Helm Charts or environment variables, set the following in your `system-probe.yaml` file:

```yaml
service_monitoring_config:
  enabled: true
```

{{% /tab %}}
{{% tab "Environment variables (Linux)" %}}

If you configure the `system-probe` with environment variables, as is common with Docker and ECS installations, pass the following environment variable to **both** the `process-agent` and `system-probe`:

```yaml
DD_SYSTEM_PROBE_SERVICE_MONITORING_ENABLED=true
```

{{% /tab %}}
{{% tab "Chef" %}}

Set the following attributes on your nodes:

```rb
node["datadog"]["system_probe"]["service_monitoring_enabled"] = true
```

{{% /tab %}}
{{% tab "Puppet" %}}

Set `service_monitoring_enabled`:

```conf
class { 'datadog_agent::system_probe':
    service_monitoring_enabled => true,
}
```

{{% /tab %}}
{{% tab "Ansible" %}}

Add the following attributes in your playbook:

```yaml
service_monitoring_config:
  enabled: true
```

{{% /tab %}}

{{% tab "ECS" %}}

For ECS, enable USM and the system probe with the following JSON task definition. Deploy the task definition as a [daemon service][1].

```json
{
  "containerDefinitions": [
    {
      "name": "datadog-agent",
      "image": "public.ecr.aws/datadog/agent:7",
      "cpu": 500,
      "memory": 1024,
      "essential": true,
      "mountPoints": [
        ...
        {
          "containerPath": "/sys/kernel/debug",
          "sourceVolume": "sys_kernel_debug"
        },
        {
          "containerPath": "/host/proc",
          "sourceVolume": "proc"
        },
        {
          "containerPath": "/var/run/docker.sock",
          "sourceVolume": "var_run_docker_sock"
        },
        {
          "containerPath": "/host/sys/fs/cgroup",
          "sourceVolume": "sys_fs_cgroup"
        },
        {
          "readOnly": true,
          "containerPath": "/var/lib/docker/containers",
          "sourceVolume": "var_lib_docker_containers"
        },
        {
          "containerPath": "/lib/modules",
          "sourceVolume": "lib_modules"
        },
        {
          "containerPath": "/usr/src",
          "sourceVolume": "usr_src"
        },
        {
          "containerPath": "/var/tmp/datadog-agent/system-probe/build",
          "sourceVolume": "var_tmp_datadog_agent_system_probe_build"
        },
        {
          "containerPath": "/var/tmp/datadog-agent/system-probe/kernel-headers",
          "sourceVolume": "var_tmp_datadog_agent_system_probe_kernel_headers"
        },
        {
          "containerPath": "/host/etc/apt",
          "sourceVolume": "etc_apt"
        },
        {
          "containerPath": "/host/etc/yum.repos.d",
          "sourceVolume": "etc_yum_repos_d"
        },
        {
          "containerPath": "/host/etc/zypp",
          "sourceVolume": "etc_zypp"
        },
        {
          "containerPath": "/host/etc/pki",
          "sourceVolume": "etc_pki"
        },
        {
          "containerPath": "/host/etc/yum/vars",
          "sourceVolume": "etc_yum_vars"
        },
        {
          "containerPath": "/host/etc/dnf/vars",
          "sourceVolume": "etc_dnf_vars"
        },
        {
          "containerPath": "/host/etc/rhsm",
          "sourceVolume": "etc_rhsm"
        }
      ],
      "environment": [
        {
          "name": "DD_API_KEY",
          "value": "<YOUR_DATADOG_API_KEY>"
        },
        ...
        {
          "name": "DD_SYSTEM_PROBE_SERVICE_MONITORING_ENABLED",
          "value": "true"
        }
      ],
      "linuxParameters": {
        "capabilities": {
          "add": [
            "SYS_ADMIN",
            "SYS_RESOURCE",
            "SYS_PTRACE",
            "NET_ADMIN",
            "NET_BROADCAST",
            "NET_RAW",
            "IPC_LOCK",
            "CHOWN"
          ]
        }
      }
    }
  ],
  "requiresCompatibilities": [
    "EC2"
  ],
  "volumes": [
    ...
    {
      "host": {
        "sourcePath": "/sys/kernel/debug"
      },
      "name": "sys_kernel_debug"
    },
    {
      "host": {
        "sourcePath": "/proc/"
      },
      "name": "proc"
    },
    {
      "host": {
        "sourcePath": "/var/run/docker.sock"
      },
      "name": "var_run_docker_sock"
    },
    {
      "host": {
        "sourcePath": "/sys/fs/cgroup/"
      },
      "name": "sys_fs_cgroup"
    },
    {
      "host": {
        "sourcePath": "/var/lib/docker/containers/"
      },
      "name": "var_lib_docker_containers"
    },
    {
      "host": {
        "sourcePath": "/lib/modules"
      },
      "name": "lib_modules"
    },
    {
      "host": {
        "sourcePath": "/usr/src"
      },
      "name": "usr_src"
    },
    {
      "host": {
        "sourcePath": "/var/tmp/datadog-agent/system-probe/build"
      },
      "name": "var_tmp_datadog_agent_system_probe_build"
    },
    {
      "host": {
        "sourcePath": "/var/tmp/datadog-agent/system-probe/kernel-headers"
      },
      "name": "var_tmp_datadog_agent_system_probe_kernel_headers"
    },
    {
      "host": {
        "sourcePath": "/etc/apt"
      },
      "name": "etc_apt"
    },
    {
      "host": {
        "sourcePath": "/etc/yum.repos.d"
      },
      "name": "etc_yum_repos_d"
    },
    {
      "host": {
        "sourcePath": "/etc/zypp"
      },
      "name": "etc_zypp"
    },
    {
      "host": {
        "sourcePath": "/etc/pki"
      },
      "name": "etc_pki"
    },
    {
      "host": {
        "sourcePath": "/etc/yum/vars"
      },
      "name": "etc_yum_vars"
    },
    {
      "host": {
        "sourcePath": "/etc/dnf/vars"
      },
      "name": "etc_dnf_vars"
    },
    {
      "host": {
        "sourcePath": "/etc/rhsm"
      },
      "name": "etc_rhsm"
    }
  ],
  "family": "datadog-agent-task"
}
```

If the operating system image is Ubuntu or Debian, add the following after `environment`:

```yaml
"dockerSecurityOptions": [
  "apparmor:unconfined"
]
```

For optional HTTPS support, also add:

```yaml
"mountPoints": [
  ...
  {
    "containerPath": "/host/root",
    "sourceVolume": "host_root"
  },
  ...
]
...
"volumes": [
  ...
  {
    "host": {
      "sourcePath": "/"
    },
    "name": "host_root"
  },
  ...
]
```

If you use load balancers with your services, enable additional cloud integrations to allow Universal Service Monitoring to discover cloud-managed entities:

1. Install the [AWS Integration][2] for visibility in AWS Load Balancer.
2. Enable ENI and EC2 metric collection.
3. Add the following tags to each load balancer:
   ```conf
   ENV=<env>
   SERVICE=<service>
   ```

[1]: /containers/amazon_ecs/?tab=awscli#run-the-agent-as-a-daemon-service
[2]: /integrations/amazon_web_services/
{{% /tab %}}

{{% tab "Windows" %}}

**For services running on IIS:**

1. Install the [Datadog Agent][1] (version 6.41 or 7.41 and later) with the network kernel device driver component enabled.
   For Agent version 7.44 or earlier, you must pass `ADDLOCAL="MainApplication,NPM"` to the `msiexec` command during installation, or select **Network Performance Monitoring** when running the Agent installation through the GUI.

2. Edit `C:\ProgramData\Datadog\system-probe.yaml` to set the enabled flag to `true`:

   ```yaml
   service_monitoring_config:
     enabled: true
   ```
[1]: /agent/basic_agent_usage/windows/?tab=commandline
{{% /tab %}}

{{< /tabs >}}

## Additional configuration

The following systems or services require additonal configuration due to limited or beta support:

{{< collapse-content title="Non-containerized services on Linux" level="h4" >}}
<div class="alert alert-info">
Universal Service Monitoring is available in <strong>beta</strong> to monitor services running bare-metal on Linux virtual machines.
</div>

Requires Agent version 7.42 or greater.

{{< tabs >}}
{{% tab "Configuration file" %}}

Add the following configuration to the `system-probe.yaml`:

```yaml
service_monitoring_config:
  enabled: true
  process_service_inference:
    enabled: true
```

{{% /tab %}}
{{% tab "Environment variable" %}}

```conf
DD_SYSTEM_PROBE_PROCESS_SERVICE_INFERENCE_ENABLED=true
```
{{% /tab %}}

{{< /tabs >}}
{{< /collapse-content >}} 

{{< collapse-content title="Go TLS Monitoring" level="h4" >}}
<div class="alert alert-info">
Universal Service Monitoring is available in <strong>beta</strong> to monitor TLS encrypted traffic from services implemented in Golang.
</div>

<strong>Note</strong>:
<br>
<ul role="list">
  <li>Go HTTPS servers can upgrade HTTP1.1 protocol to HTTP/2 which is supported in private beta. Reach out to your account manager for details.</li>
  <li>Requires Agent version 7.51 or greater.</li>
</ul>

{{< tabs >}}
{{% tab "Configuration file" %}}

Add the following configuration to the `system-probe.yaml`:

```yaml
service_monitoring_config:
  enabled: true
  tls:
    go:
      enabled: true
```

{{% /tab %}}
{{% tab "Environment variable" %}}

```conf
DD_SERVICE_MONITORING_CONFIG_TLS_GO_ENABLED=true
```
{{% /tab %}}

{{% tab "Helm" %}}

```conf
agents:
  containers:
    systemProbe:
      env:
        - name: DD_SERVICE_MONITORING_CONFIG_TLS_GO_ENABLED
          value: "true"
```
{{% /tab %}}

{{< /tabs >}}
{{< /collapse-content >}} 

{{< collapse-content title="NodeJS TLS Monitoring" level="h4" >}}

<div class="alert alert-info">
Universal Service Monitoring is available in <strong>beta</strong> to monitor HTTP, HTTP/2, and gRPC requests from services implemented in NodeJS.
</div>

Requires Agent version 7.54 or greater.

{{< tabs >}}
{{% tab "Configuration file" %}}

Add the following configuration to the `system-probe.yaml`:

```yaml
service_monitoring_config:
  enabled: true
  tls:
    nodejs:
      enabled: true
```

{{% /tab %}}
{{% tab "Environment variable" %}}

```conf
DD_SERVICE_MONITORING_CONFIG_TLS_NODEJS_ENABLED=true
```
{{% /tab %}}

{{% tab "Helm" %}}

```conf
agents:
  containers:
    systemProbe:
      env:
        - name: DD_SERVICE_MONITORING_CONFIG_TLS_NODEJS_ENABLED
          value: "true"
```
{{% /tab %}}

{{< /tabs >}}
{{< /collapse-content >}} 

{{< collapse-content title="Istio Monitoring" level="h4" >}}

Universal Service Monitoring is available to monitor services behind <a href="https://istio.io/latest/docs/tasks/security/authentication/mtls-migration/">Istio mTLS</a> and to capture encrypted HTTPs, HTTP/2, and gRPC traffic.

Requires Agent version 7.50 or greater.

{{< tabs >}}
{{% tab "Configuration file" %}}

Add the following configuration to the `system-probe.yaml`:

```yaml
service_monitoring_config:
  enabled: true
  tls:
    istio:
      enabled: true
```

{{% /tab %}}
{{% tab "Environment variable" %}}

```conf
DD_SERVICE_MONITORING_CONFIG_TLS_ISTIO_ENABLED=true
```
{{% /tab %}}

{{% tab "Helm" %}}

```conf
agents:
  containers:
    systemProbe:
      env:
        - name: DD_SERVICE_MONITORING_CONFIG_TLS_ISTIO_ENABLED
          value: "true"
```
{{% /tab %}}

{{< /tabs >}}
{{< /collapse-content >}} 

{{< collapse-content title="HTTP/2 monitoring" level="h4" >}}
Universal Service Monitoring can capture HTTP/2 and gRPC traffic.

<strong>Note</strong>:
<br>
<ul role="list">
  <li>Requires Linux Kernel version 5.2 or later.</li>
  <li>Requires Agent version 7.53 or greater.</li>
</ul>

{{< tabs >}}
{{% tab "Configuration file" %}}

Add the following configuration to the `system-probe.yaml`:

```yaml
service_monitoring_config:
  enable_http2_monitoring: true
```

{{% /tab %}}
{{% tab "Environment variable" %}}

```conf
DD_SERVICE_MONITORING_CONFIG_ENABLE_HTTP2_MONITORING=true
```
{{% /tab %}}
{{% tab "Helm" %}}

```conf
agents:
  containers:
    systemProbe:
      env:
        - name: DD_SERVICE_MONITORING_CONFIG_ENABLE_HTTP2_MONITORING
          value: "true"
```
{{% /tab %}}

{{< /tabs >}}
{{< /collapse-content >}}

{{< collapse-content title="Kafka Monitoring (Private Beta)" level="h4" >}}

<div class="alert alert-info">
Kafka Monitoring is available in <strong>Private beta</strong>.
</div>

<strong>Note</strong>:
<br>
<ul role="list">
  <li>Producers and consumers require Linux Kernel version 5.2 or later.</li>
  <li>Producers and consumers must be interfacing with Kafka <strong>without</strong> TLS.</li>
  <li>Requires Agent version 7.53 or greater.</li>
</ul>

{{< tabs >}}
{{% tab "Configuration file" %}}

Add the following configuration to the `system-probe.yaml`:

```yaml
service_monitoring_config:
  enabled: true
  enable_kafka_monitoring: true
```

{{% /tab %}}
{{% tab "Environment variable" %}}

```conf
DD_SERVICE_MONITORING_CONFIG_ENABLE_KAFKA_MONITORING=true
```
{{% /tab %}}

{{% tab "Helm" %}}

```conf
datadog:
  ...
  serviceMonitoring:
    enabled: true

agents:
  ...
  containers:
    systemProbe:
      env:
        - name: DD_SERVICE_MONITORING_CONFIG_ENABLE_KAFKA_MONITORING
          value: "true"
```
{{% /tab %}}

{{< /tabs >}}
{{< /collapse-content >}}


## Path exclusion and replacement

Use `http_replace_rules` or `DD_SYSTEM_PROBE_NETWORK_HTTP_REPLACE_RULES` to configure the Agent to drop HTTP endpoints that match a regex, or to convert matching endpoints into a different format.

{{< tabs >}}
{{% tab "Configuration file" %}}

Add the following configuration to the `system-probe`:

```yaml
network_config:
  http_replace_rules:
    - pattern: "<exclusion rule>"
      repl: ""
    - pattern: "<replacement rule>"
      repl: "<new format>"
```

For example, the following configuration drops endpoints that start with `/api/`, such as `/api/v1/users`. However, it does not drop `/api` or `/users/api`:

```yaml
network_config:
  http_replace_rules:
    - pattern: "/api/.*"
      repl: ""
```

The following configuration replaces an endpoint `/api/users` to match a new format of `/api/v1/users`:

```yaml
network_config:
  http_replace_rules:
    - pattern: "/api/users"
      repl: "/api/v1/users"
```

{{% /tab %}}
{{% tab "Environment variable" %}}
Add the following entry:

```conf
DD_SYSTEM_PROBE_NETWORK_HTTP_REPLACE_RULES=[{"pattern":"<drop regex>","repl":""},{"pattern":"<replace regex>","repl":"<replace pattern>"}]
```
{{% /tab %}}
{{% tab "Helm" %}}

The following example drops the endpoint `/my-api` and replaces `/my-api-2` with `/new-version`.

```yaml
agents:
  containers:
    systemProbe:
      env:
        - name: DD_SYSTEM_PROBE_NETWORK_HTTP_REPLACE_RULES
          value: '[{"pattern":"/my-api","repl":""},{"pattern":"/my-api-2","repl":"/new-version"}]'
```

{{% /tab %}}
{{< /tabs >}}


<div class="alert alert-info"><strong>Support for additional protocols and encryption methods</strong><p>USM has beta support for discovering cloud services and for decoding additional protocols and traffic encryption methods. For more information and to request access to the private beta, read <a href="/universal_service_monitoring/additional_protocols/">Cloud Service Discovery and Additional Protocols</a>.</p></div>


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /getting_started/tagging/unified_service_tagging
