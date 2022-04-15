---
title: Universal Service Monitoring
kind: documentation
further_reading:
- link: "https://www.datadoghq.com/blog/universal-service-monitoring-datadog/"
  tag: "Blog"
  text: "Golden signals in seconds with Universal Service Monitoring"
- link: "/getting_started/tagging/unified_service_tagging/"
  tag: "Documentation"
  text: "Unified Service Tagging"
- link: "/tracing/visualization/services_list/"
  tag: "Documentation"
  text: "Discover the list of services reporting to Datadog"
- link: "/tracing/visualization/service/"
  tag: "Documentation"
  text: "Learn more about services in Datadog"
- link: "/tracing/visualization/services_map/"
  tag: "Documentation"
  text: "Read about the Service Map"
---

{{< beta-callout url="http://d-sh.io/universal" d-toggle="modal" d_target="#signupModal" custom_class="sign-up-trigger">}}
  Universal Service Monitoring (USM) is in private beta. There is currently no billing impact for enabling and using USM. Let us know if you would like to access it.
{{< /beta-callout >}}

Universal Service Monitoring (USM) provides visibility into your service health metrics universally across your entire stack _without having to instrument your code_. It relies solely on the presence of a configured Datadog Agent and [Unified Service Tagging][1], and brings performance data about your uninstrumented services into APM views such as the Services List, Service details, and Service Map. USM also works with [Deployment Tracking][2], Monitors, Dashboards, and SLOs.

{{< img src="tracing/universal_service_monitoring/service_overview.mp4" alt="Video demonstrating Universal Service Monitoring. An overview of a service is accessed by clicking on a service on the Service Map and selecting View service overview." video="true" >}}

### Supported versions and compatibility

Required Agent version
: Universal Service Monitoring requires that the Datadog Agent installed alongside your service be at least version 7.32.

Supported platforms
: Linux kernel 4.4 and greater<br/>
CentOS or RHEL 8.0 and greater<br/>

Supported application-layer protocols
: HTTP<br/>
HTTPS (OpenSSL)

<div class="alert alert-info">
If you have feedback about what platforms and protocols you'd like to see supported, <a href="/help/">contact Support</a>.
</div>

### Prerequisites

- Datadog Agent 7.32 or higher is installed alongside your service. Installing a tracing library is _not_ required.
- [Unified Service Tagging][1] tags for `env` and `service` have been applied to your deployment. The `version` tag is optional.

**Note**: For non-container single-tenant setups where one service runs on a host, you must apply Unified Service Tags to the host itself. USM does not currently support monitoring multiple services on a single host without containers, nor on a single host where Unified Service Tags are applied via environment variables.

## Enabling Universal Service Monitoring

Enable Universal Service Monitoring in your Agent by using one of the following methods depending on how your service is deployed and your Agent configured:

{{< tabs >}}
{{% tab "Helm" %}}

Add the following to your values file:

```
agents:
  ...
  containers:
    ...
    processAgent:
      env:
        - name: DD_SYSTEM_PROBE_SERVICE_MONITORING_ENABLED
          value: "true"
    systemProbe:
      env:
        - name: DD_SYSTEM_PROBE_SERVICE_MONITORING_ENABLED
          value: "true"
```

{{% /tab %}}
{{% tab "Kubernetes without Helm" %}}

1. Add the annotation `container.apparmor.security.beta.kubernetes.io/system-probe: unconfined` on the `datadog-agent` template:

   ```
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

   ```
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
   ```
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

   ```
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
   ```
   And add the following volumes to your manifest:
   ```
   volumes:
     - name: sysprobe-socket-dir
       emptyDir: {}
     - name: debugfs
       hostPath:
         path: /sys/kernel/debug
   ```
5. For optional HTTPS support, add the following to the `system-probe` container:

   ```
   env:
     - name: HOST_ROOT
       value: /host/root
   volumeMounts:
     - name: hostroot
       mountPath: /host/root
       readOnly: true
   ```

   And add the following volumes to your manifest:
   ```
   volumes:
     - name: hostroot
       hostPath:
       path: /
   ```

{{% /tab %}}
{{% tab "Docker" %}}

Add the following to your `docker run` command:

```
-v /sys/kernel/debug:/sys/kernel/debug \
-e DD_SYSTEM_PROBE_SERVICE_MONITORING_ENABLED=true \
--security-opt apparmor:unconfined \
--cap-add=SYS_ADMIN \
--cap-add=SYS_RESOURCE \
--cap-add=SYS_PTRACE \
--cap-add=NET_ADMIN \
--cap-add=NET_BROADCAST \
--cap-add=NET_RAW \
--cap-add=IPC_LOCK \
--cap-add=CHOWN
```

For optional HTTPS support, also add:
```
-e HOST_ROOT=/host/root \
-v /:/host/root:ro
```

{{% /tab %}}
{{% tab "Docker Compose" %}}

Add the following to your `docker-compose.yml` file:

```
services:
  ...
  datadog:
    ...
    environment:
     - DD_SYSTEM_PROBE_SERVICE_MONITORING_ENABLED: 'true'
    volumes:
     - /sys/kernel/debug:/sys/kernel/debug
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

```
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
{{% tab "Configuration files" %}}

If you are not using Helm Charts or environment variables, set the following in your `system-probe.yaml` file:

```
service_monitoring_config:
  enabled: true
```

{{% /tab %}}
{{% tab "Environment variables" %}}

If you configure the `system-probe` with environment variables, as is common with Docker and ECS installations, pass the following environment variable to **both** the `process-agent` and `system-probe`:

```
DD_SYSTEM_PROBE_SERVICE_MONITORING_ENABLED=true
```

{{% /tab %}}
{{< /tabs >}}

## Exploring your services

After you configure the Agent, wait about five minutes for your service to appear in the APM Services List. Click the service to see the APM service details page. An operation name of `universal.http.server` or `universal.http.client` in the upper left indicates that the service telemetry comes from Universal Service Monitoring.

The `universal.http.server` operation name captures health metrics for inbound traffic to your service. The corresponding `universal.http.client` operation name represents outbound traffic to other destinations.

{{< img src="tracing/universal_service_monitoring/select_service_operation.png" alt="The operation drop-down menu on the Services tab shows the available operation names" style="width:100%;" >}}

After enabling Universal Service Monitoring, you can:


- Navigate to **APM > Service Map** to [visualize your services and their dependencies][3] in one place.

- Click into specific Service pages to see golden signal metrics (requests, errors, and duration), and correlate these against recent code changes with [Deployment Tracking][4]. 

- Create [monitors][5], [dashboards][6], and [SLOs][7] using the `trace.universal.http.*` metrics.


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /getting_started/tagging/unified_service_tagging
[2]: https://docs.datadoghq.com/tracing/deployment_tracking/
[3]: /tracing/visualization/services_map/
[4]: /tracing/deployment_tracking/
[5]: /monitors/create/types/apm/?tab=apmmetrics
[6]: /dashboards/
[7]: /monitors/service_level_objectives/metric/
