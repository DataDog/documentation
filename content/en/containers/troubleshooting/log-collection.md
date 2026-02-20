---
title: Container Log Collection Troubleshooting
description: Troubleshoot common issues with log collection in containerized environments
aliases:
- /logs/guide/docker-logs-collection-troubleshooting-guide/
further_reading:
- link: "/containers/kubernetes/log"
  tag: "Documentation"
  text: "Kubernetes Log Collection"
- link: "/containers/docker/log"
  tag: "Documentation"
  text: "Docker Log Collection"
---

## Overview

Containerized applications write logs to the Standard Output and Error (`stdout` / `stderr`) streams, which the container runtime and orchestrator capture and handle in a variety of ways. The Datadog Agent relies on Docker and Kubernetes' default file based handling to manage these log files. As the Datadog Agent monitors the containers on its host, it discovers, tails, tags, and reports those logs up to Datadog for each container.

This documentation covers the troubleshooting steps for **Docker** and **Kubernetes** log collection. For the full context and general setup steps for containerized log collection, see the [Docker][1] and [Kubernetes][2] documentation.

For [**ECS Fargate**][3] and [**EKS Fargate**][4] based log collection, see their dedicated setup and troubleshooting documentation. 

## Understanding log collection in Docker and Kubernetes

In containerized environments, logs are collected by the Datadog Agent in two main ways, **file based** collection and **socket based** collection through the Docker API.

The Docker and Kubernetes documentation default to file based collection as it offers better performance and reliability. Socket based collection can be used in Docker environments as a fallback option. In Kubernetes clusters, socket based collections requires Docker runtime, which is largely is deprecated in most Kubernetes distributions.

In containerized environments, Datadog recommends logging to the `stdout` / `stderr` streams instead of writing to log files that are isolated in the application containers. These streams allow for more automated and reliable collection.

### Log files

With Docker's default `json-file` log driver, the `stdout`/`stderr` logs are stored in `/var/lib/docker/containers`. These logs can be collected by mounting `/var/lib/docker/containers` (`c:/programdata/docker/containers` on Windows) into the Agent container. For example:

```bash
/var/lib/docker/containers/68f21cd4e1e703c8b9ecdab67a5a9e359f1fb46ae1ed2e86f9b4f1f243a0a47d/68f21cd4e1e703c8b9ecdab67a5a9e359f1fb46ae1ed2e86f9b4f1f243a0a47d-json.log. 
```

If this mount point does not exist, the Agent falls back to socket based collection. Accessing the Docker API through the socket at `/var/run/docker.sock`.

In Kubernetes, `stdout`/`stderr` logs are stored in `/var/log/pods` by default. The folder structure is setup per unique pod and container within that pod. For example:

```bash
/var/log/pods/default_my-deployment-55d847444b-2fkch_342819ce-4419-435b-9881-4a3deff618cc/my-container/0.log
```

If the container in the pod restarts in Kubernetes, it automatically increments the filename (`0.log` -> `1.log`) which the Agent automatically accounts for. See [Kubernetes log collection][2] for more information.

As the Agent discovers the corresponding containers on the host, it looks up their log files based on the expected folder and file structure per environment.

### Agent autodiscovery

By default, the Agent only collects logs from containers when log collection is enabled and either:

- `logs_config.container_collect_all` is enabled to collect logs from all discovered containers
- The container is configured for log collection from an Autodiscovery based integration

The Agent also takes into account any container exclusion/inclusion rules you have configured from [Container Discovery Management][5]. 

Lastly, the Agent is responsible for collecting the logs from the containers on the same host as itself. 

It is important to take these rules into account to understand how log collection is setup for your containers. If you do not see logs for a given container you should check:

- Has the Agent been enabled for log collection?
- Is the container enabled for log collection relative to the discovery rules?
- Is the Agent running on the same host as the desired container?

#### Container collect all configuration

For comprehensive instructions on how to enable log collection, see the [Docker][1] and [Kubernetes][2] log collection documentation. For quick reference you can see samples on how to configure the Agent to enable log collection and enable the `container_collect_all` feature, which defaults to false. 

{{< tabs >}}
{{% tab "Datadog Operator" %}}

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
  #(...)
spec:
  #(...)
  features:
    logCollection:
      enabled: true
      containerCollectAll: true
```

{{% k8s-operator-redeploy %}}
{{% /tab %}}

{{% tab "Helm" %}}

```yaml
datadog:
  #(...)
  logs:
    enabled: true
    containerCollectAll: true
```

{{% k8s-helm-redeploy %}}
{{% /tab %}}

{{% tab "Containerized Agent" %}}

```bash
DD_LOGS_ENABLED=true
DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL=true
```

{{% /tab %}}
{{< /tabs >}}

When using `container_collect_all`, the Agent will collect all logs from discovered containers and tag them with the `source` and `service` tags, matching the `short_image` tag of the discovered container. 

If `container_collect_all` is not enabled, you need to individually enable log collection per container with autodiscovery based configurations.

#### Autodiscovery configuration

Autodiscovery allows you to configure which containers the Agent collects logs from. Datadog recommends using [container labels in Docker][6] or [Pod annotations in Kubernetes][7]. These are JSON based log configurations placed on the corresponding container/pod emitting those logs. See the following minimal example:

{{< tabs >}}
{{% tab "Kubernetes" %}}

The Kubernetes annotations should be set on the pod, not the parent workload creating it. The annotation should be adjusted to match your container name.

```yaml
spec:
  template:
    metadata:
      annotations:
        ad.datadoghq.com/<CONTAINER_NAME>.logs: |
          [{
            "source": "example-source",
            "service": "example-service"
          }]
    spec:
      containers:
      - name: <CONTAINER_NAME>
        image: <CONTAINER_IMAGE>
```

{{% /tab %}}
{{% tab "Docker" %}}

The Docker labels can be set in the docker run command, the Docker Compose file, or baked in the container image.

For example in a run command:

```
-l com.datadoghq.ad.logs='[{"source":"example-source","service":"example-service"}]'
```

See more examples in [Docker Log Collection](/containers/docker/log/?tab=dockerfile#log-integrations).

{{% /tab %}}
{{< /tabs >}}

With both of these setups ensure that your configuration:
- Has at least the source and service set 
- Is valid JSON
- Is set on your corresponding Kubernetes pod or Docker container
- Uses the right key name to trigger the log configuration, you do not need to adjust the key name based on your [Datadog site][8]. 

For more examples of how to set your log configuration, see [Advanced Log Collection Configurations][9].

### Tagging

The Agent automatically assigns tags to your logs at the “high” level of [tag cardinality][10] for each environment. You can view the out-of-the-box [Docker tags here][11] and [Kubernetes tags here][12]. This also includes any tags collected by [Unified Service Tagging][13] or different tag extraction rules from container metadata.

To customize these tags, change the log collection rules, or enable log collection in general, you can apply Autodiscovery Labels or Annotations to the respective containers.

Tags on your logs can also come from [host tag inheritance][14]. All data, including logs, coming into Datadog goes through this process. On Datadog intake the logs inherit all the host-level tags that are associated with that host. You can see these tags on the Infrastructure List for you host. These are most commonly set by:

- The Datadog Agent and its automatic discovery or manual set of `DD_TAGS` provided
- The cloud provider integrations collecting and setting tags for your hosts

For example, the tags `pod_name` and `short_image` come from the Agent setting this tag on submission. Other tags like `region` and `kube_cluster_name` come from host tag inheritance on intake.

## Troubleshooting container log collection with Agent commands

The Datadog Agent running on the same node as your application container is responsible for collecting that container’s logs. When running these commands, especially in Kubernetes environments, ensure you are working with the correct Agent pod for your desired application container.

For a list of helpful troubleshooting commands, see [Agent Commands][15].

### Agent status

You can run the Agent status command to see if the logging Agent is experiencing any issues

{{< tabs >}}
{{% tab "Kubernetes" %}}

```
kubectl exec -it <AGENT_POD> -- agent status
```

{{% /tab %}}
{{% tab "Docker" %}}

```
docker exec -it <CONTAINER_NAME> agent status
```

{{% /tab %}}
{{< /tabs >}}

This command shows you the status of the Logs Agent in general and the log collector for each container that the Agent is monitoring:

```text
==========
Logs Agent
==========
    Reliable: Sending compressed logs in HTTPS to agent-http-intake.logs.datadoghq.com on port 443
    BytesSent: 8.60922316e+08
    EncodedBytesSent: 3.9744538e+07
    LogsProcessed: 604328
    LogsSent: 60431
  
  ============
  Integrations
  ============
  
  default/my-deployment-55d847444b-2fkch/my-container
  ---------------------------------------------------
    - Type: file
      Identifier: ba778eaff01fc3555b6ad4a809e78949065bd34ebe2c42522a1bdd1d3b684fb5
      Path: /var/log/pods/default_my-deployment-55d847444b-2fkch_342819ce-4419-435b-9881-4a3deff618cc/my-container/*.log
      Service: example-service
      Source: example-source
      Status: OK
        1 files tailed out of 1 files matching
      Inputs:
        /var/log/pods/default_my-deployment-55d847444b-2fkch_342819ce-4419-435b-9881-4a3deff618cc/my-container/0.log  
      Bytes Read: 5075   
      Pipeline Latency:
        Average Latency (ms): 0
        24h Average Latency (ms): 0
        Peak Latency (ms): 0
        24h Peak Latency (ms): 0
```

If the Logs Agent Status doesn’t look like the above, see the troubleshooting tips in the following sections.

Each individual log collector provides detailed information about how the Agent is collecting logs for a specific container. Using the Kubernetes example above, this output tells us:

- **Collector name** (`default/my-deployment-55d847444b-2fkch/my-container`) identifies namespace, pod, and container.
- **Identifier** (`ba778eaff...`) is the individual container ID being monitored.
- **Path** and **Inputs** show the locations where the Agent searched for and identified the container's log files.
- **Service** and **Source** summarize the tags used.

In Docker the output is largely the same, just the individual log collector name is different.

If you see the following message when you run the Agent status command:

```
==========
Logs Agent
==========

  Logs Agent is not running
```
This means that you did not enable log collection in the Agent.

If the Logs Agent Status shows no Integrations and you see `LogsProcessed: 0` and `LogsSent: 0`:
```
==========
Logs Agent
==========

    LogsProcessed: 0
    LogsSent: 0
```
This status means that logs are enabled but you haven’t specified which containers the Agent should collect from.

### Agent configcheck

You can run the `agent configcheck` command to print all configurations loaded and resolved in a running Agent.

{{< tabs >}}
{{% tab "Kubernetes" %}}

```
kubectl exec -it <AGENT_POD> -- agent configcheck
```

{{% /tab %}}
{{% tab "Docker" %}}

```
docker exec -it <CONTAINER_NAME> agent configcheck
```

{{% /tab %}}
{{< /tabs >}}

This command shows you the configuration of the log collector, using the `Configuration source` referencing the container ID. This can be used to match up with the `agent status` output.

```
===  check ===
Configuration provider: kubernetes-container-allinone
Configuration source: container:containerd://ba778eaff01fc3555b6ad4a809e78949065bd34ebe2c42522a1bdd1d3b684fb5
Log Config:
[{"service":"example-service","source":"example-source"}]
Autodiscovery IDs:
* containerd://ba778eaff01fc3555b6ad4a809e78949065bd34ebe2c42522a1bdd1d3b684fb5
```

The `Log Config` applied from Autodiscovery provides custom `service` and `source` tags shown as `[{"service":"example-service","source":"example-source"}]`. The `configcheck` output is useful for verifying how the Agent setup log collection for a given container based on its container ID.

When using `logs_config.container_collect_all` if no unique configuration is provided you will see this default to `[{}]` for the container.


### Agent stream-logs

You can run the `agent stream-logs` command to stream logs to the console that the Agent is seeing in real time, along with the associated metadata and the log content.

{{< tabs >}}
{{% tab "Kubernetes" %}}

```
kubectl exec -it <AGENT_POD> -- agent stream-logs

# Stream logs relative to "Namespace/Pod Name/Container Name" based name
kubectl exec -it <Agent Pod> -- agent stream-logs --name <NAME>
```

{{% /tab %}}
{{% tab "Docker" %}}

```
docker exec -it <CONTAINER_NAME> agent stream-logs
```

{{% /tab %}}
{{< /tabs >}}

You can filter this output with the `--name` flag, which matches the Kubernetes naming format (Namespace/Pod Name/Container). Alternatively, you can filter based on applied tags with the `--service` or `--source` flag. 

To find the `<NAME>`, use the `agent status` command. For example, `default/my-deployment-55d847444b-2fkch/my-container`:

```
==========
Logs Agent
==========
    ...  
  ============
  Integrations
  ============
  default/my-deployment-55d847444b-2fkch/my-container
  ---------------------------------------------------
    ...
```
This command will continuously print your logs as reported by the Agent:

```text
$ agent stream-logs --name default/my-deployment-55d847444b-2fkch/my-container
...
Integration Name: default/my-deployment-55d847444b-2fkch/my-container | Type: file | Status: info | Timestamp: 2025-05-12 23:45:09.016005644 +0000 UTC | Hostname: example-0002 | Service: example-service | Source: example-source | Tags: filename:0.log,dirname:/var/log/pods/default_my-deployment-55d847444b-2fkch_342819ce-4419-435b-9881-4a3deff618cc/my-container,image_name:busybox,short_image:busybox,image_tag:latest,kube_namespace:default,kube_qos:BestEffort,kube_container_name:my-container,kube_ownerref_kind:replicaset,image_id:docker.io/library/busybox@sha256:9e2bbca079387d7965c3a9cee6d0c53f4f4e63ff7637877a83c4c05f2a666112,kube_deployment:my-deployment,kube_replica_set:my-deployment-55d847444b,pod_phase:running,pod_name:my-deployment-55d847444b-2fkch,kube_ownerref_name:my-deployment-55d847444b,container_id:ba778eaff01fc3555b6ad4a809e78949065bd34ebe2c42522a1bdd1d3b684fb5,display_container_name:my-container_my-deployment-55d847444b-2fkch,container_name:my-container | Message: 2025-11-20T23:45:08 INFO Sample Info Log
Integration Name: default/my-deployment-55d847444b-2fkch/my-container | Type: file | Status: info | Timestamp: 2025-05-12 23:45:09.016049347 +0000 UTC | Hostname: example-0002 | Service: example-service | Source: example-source | Tags: filename:0.log,dirname:/var/log/pods/default_my-deployment-55d847444b-2fkch_342819ce-4419-435b-9881-4a3deff618cc/my-container,image_name:busybox,short_image:busybox,image_tag:latest,kube_namespace:default,kube_qos:BestEffort,kube_container_name:my-container,kube_ownerref_kind:replicaset,image_id:docker.io/library/busybox@sha256:9e2bbca079387d7965c3a9cee6d0c53f4f4e63ff7637877a83c4c05f2a666112,kube_deployment:my-deployment,kube_replica_set:my-deployment-55d847444b,pod_phase:running,pod_name:my-deployment-55d847444b-2fkch,kube_ownerref_name:my-deployment-55d847444b,container_id:ba778eaff01fc3555b6ad4a809e78949065bd34ebe2c42522a1bdd1d3b684fb5,display_container_name:my-container_my-deployment-55d847444b-2fkch,container_name:my-container | Message: 2025-11-20T23:45:08 ERROR Sample Error Log
```

Each line should provide the integration name, type, status, timestamp, hostname, service, source, container tags, and the message. This shows what logs the Agent is collecting, what metadata is associated with those logs, and what message is sent.

Hit `Ctrl + C` to exit the stream process.

### Capturing the raw log file

To check if the Agent is tailing the logs correctly, you can copy the log file over and examine it using the [`agent status` command](#agent-status).

Run the `agent status` command and check through the “Logs Agent” section for the container in question. For example, for a Pod named `my-deployment-98878c5d8-mc2sk` with the container `my-container`, it may look like this:

```text
  default/my-deployment-98878c5d8-mc2sk/my-container
  --------------------------------------------------
    - Type: file
      Identifier: fa54113fffebc83ffef4bd863c8c1012bd5cfb19311a4dcd7d8e9b5271dc29fe
      Path: /var/log/pods/default_my-deployment-98878c5d8-mc2sk_3d602ae0-a0ef-4fe2-b703-3975d2af6947/my-container/*.log
      Service: busybox
      Source: busybox
      Status: OK
        1 files tailed out of 1 files matching
      Inputs:
        /var/log/pods/default_my-deployment-98878c5d8-mc2sk_3d602ae0-a0ef-4fe2-b703-3975d2af6947/my-container/0.log  
```

We can see the `Path` for where the Agent is searching and the `Inputs` showing the discovered log file as `/var/log/pods/default_my-deployment-98878c5d8-mc2sk_3d602ae0-a0ef-4fe2-b703-3975d2af6947/my-container/0.log`. 

Since the link is open in the Agent Pod, you can copy this file over from the Agent Pod to your local machine, using a `kubectl cp` command: 

```
kubectl cp <Agent Pod>:<Log Input Path> <Desired Filename>
```

If the Agent Pod in the example was named `datadog-agent-xxxxx` it would look like:

```text
kubectl cp datadog-agent-xxxxx:/var/log/pods/default_my-deployment-98878c5d8-mc2sk_3d602ae0-a0ef-4fe2-b703-3975d2af6947/my-container/0.log my-container.log
```
You can review the copied file to see the exact logs that the Agent sees to identify if the necessary logs are captured by Kubernetes. The same can be done for Docker containers in their `/var/lib/docker/containers` path and a docker cp command.

## Common issues

There are common issues that can get in the way when sending logs to Datadog in containerized environments. If you experience issues sending logs to Datadog, review the common issues below. If you continue to have trouble, contact our support team for further assistance.

### Hostname preprocessing

A common problem occurs if the raw logs have a JSON attribute for a `host`, `hostname`, or `syslog.hostname`. For example:

{{< img src="logs/troubleshooting/hostname_preprocessing.png" alt="hostname preprocessing example" >}}

JSON formatted logs go through a set of pre-processing rules relative to the reserved attributes, such as `timestamp` or `level` to set the official timestamp or log level of the log. One of these reserved attributes is for [host pre-processing][16], where a JSON attribute of `host`, `hostname`, or `syslog.hostname` becomes the official `host` of the log. This results in those log statements being attributed to the “wrong” host and as a result not inheriting the expected host-level tags of the “original” host.

You can query for the logs matching the JSON attribute of `@host:* OR @hostname:* OR @syslog.hostname:*` to show what logs are actively using this pre-processing.

There are a few options to fix this issue.
- If possible, update the application to avoid logging a `host` or `hostname` JSON attribute, either removing it or changing it to some other key.
- Update your [global pre-processing rules][17] to skip this behavior. However, any logs dependent on this would lose out on that functionality.
- Add an Autodiscovery configuration to create a [custom log configuration that masks the host keyword][18].

{{< tabs >}}
{{% tab "Kubernetes" %}}

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: '<POD_NAME>'
  annotations:
    ad.datadoghq.com/<CONTAINER_NAME>.logs: |-
      [{
        "source": "example-source",
        "service": "example-service",
        "log_processing_rules": [{
          "type": "mask_sequences",
          "name": "replace_host_key",
          "replace_placeholder": "\"app_host\"",
          "pattern": "\"host\""
        }]
      }]
spec:
  containers:
    - name: <CONTAINER_NAME>
      image: <CONTAINER_IMAGE>
```

{{% /tab %}}
{{% tab "Docker" %}}

```yaml
  labels:
    com.datadoghq.ad.logs: >-
      [{
        "source": "example-source",
        "service": "example-service",
        "log_processing_rules": [{
          "type": "mask_sequences",
          "name": "replace_host_key",
          "replace_placeholder": "\"app_host\"",
          "pattern": "\"host\""
        }]
      }]
```

{{% /tab %}}
{{< /tabs >}}

These above rules search for the string `"host"` (quotes included) and replace them with `"app_host"` to retain the JSON structure. Replace the pattern with `hostname` if necessary for your logs.

You can also add a [global processing rule][19] for the Agent to mask keywords across all the logs it is processing using the environment variable `DD_LOGS_CONFIG_PROCESSING_RULES`.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  override:
    nodeAgent:
      env:
        - name: DD_LOGS_CONFIG_PROCESSING_RULES
          value: '[{"type":"mask_sequences","name":"replace_host_key","replace_placeholder":"\"app_host\"","pattern":"\"host\""}]'
```

{{% /tab %}}
{{% tab "Helm" %}}

```yaml
datadog:
  env:
    - name: DD_LOGS_CONFIG_PROCESSING_RULES
      value: '[{"type":"mask_sequences","name":"replace_host_key","replace_placeholder":"\"app_host\"","pattern":"\"host\""}]'
```

{{% /tab %}}

{{% tab "Environment Variable" %}}
```
DD_LOGS_CONFIG_PROCESSING_RULES='[{"type":"mask_sequences","name":"replace_host_key","replace_placeholder":"\"app_host\"","pattern":"\"host\""}]'
```
{{% /tab %}}
{{< /tabs >}}


### Missing host-level tags on new hosts or nodes

When sending logs to Datadog from a newly created host or node, it can take a few minutes for host-level tags to be [inherited][20]. As a result, host-level tags may be missing from these logs. 

To remediate this issue, you can use the environment variable `DD_LOGS_CONFIG_EXPECTED_TAGS_DURATION` to configure a duration (in minutes). The Datadog Agent manually attaches the host-level tags that it knows about to each sent log for this duration. After this duration, the Agent reverts to relying on tag inheritance at intake.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  override:
    nodeAgent:
      env:
        - name: DD_LOGS_CONFIG_EXPECTED_TAGS_DURATION
          value: "10m"
```

{{% /tab %}}
{{% tab "Helm" %}}

```yaml
datadog:
  env:
    - name: DD_LOGS_CONFIG_EXPECTED_TAGS_DURATION
      value: "10m"
```

{{% /tab %}}

{{% tab "Environment Variable" %}}
```
DD_LOGS_CONFIG_EXPECTED_TAGS_DURATION='10m'
```
{{% /tab %}}
{{< /tabs >}}

### Missing tags on new containers or pods

When sending logs to Datadog from newly created containers or Pods, the Datadog Agent’s internal tagger may not yet have the related container/pod tags. As a result, tags may be missing from these logs.

To remediate this issue, you can use the environment variable `DD_LOGS_CONFIG_TAGGER_WARMUP_DURATION` to configure a duration (in seconds) for the Datadog Agent to wait before it begins to send logs from newly created containers and Pods. The default value is `0`.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  override:
    nodeAgent:
      env:
        - name: DD_LOGS_CONFIG_TAGGER_WARMUP_DURATION
          value: "5"
```

{{% /tab %}}
{{% tab "Helm" %}}

```yaml
datadog:
  env:
    - name: DD_LOGS_CONFIG_TAGGER_WARMUP_DURATION
      value: "5"
```

{{% /tab %}}

{{% tab "Environment Variable" %}}
```
DD_LOGS_CONFIG_TAGGER_WARMUP_DURATION='5'
```
{{% /tab %}}
{{< /tabs >}}

### Short lived pods

By default the Agent looks every 5 seconds for new containers. For Agent v6.12+, short lived container logs (stopped or crashed) are automatically collected when using the file log collection method. This also includes the collection of init container logs. As long as those files still exist.

In Kubernetes most pods and their containers logs are retained log enough for the Agent to report them, even for short lived processes. Kubernetes CronJobs & Jobs by default will retain the pod long enough for the Agent to report its logs, even for completed containers. However, if you specify a [Job cleanup rule][21] `ttlSecondsAfterFinished`, Datadog recommends at least 15 seconds to allow the Agent to handle those.

### Docker log collection from file issues

The Agent collects Docker logs from the log files on disk by default in versions 6.33.0/7.33.0+ so long as the log files on disk are accessible by the Agent. `DD_LOGS_CONFIG_DOCKER_CONTAINER_USE_FILE` can be set to `false` to disable this behavior.

When collecting Docker container logs from file, the Agent falls back on collection from the Docker socket if it cannot read from the directory where Docker container logs are stored (`/var/lib/docker/containers` on Linux). To diagnose this, check the Logs Agent status and look for a file type entry showing an error similar to the following:

```
- Type: docker
    Service: stable
    Source: stable
    Status: OK
    The log file tailer could not be made, falling back to socket
    Inputs:
    68f21cd4e1e703c8b9ecdab67a5a9e359f1fb46ae1ed2e86f9b4f1f243a0a47d  
    Bytes Read: 160973 
```

This status means that the Agent is unable to find a log file for a given container. To resolve this issue, check that the folder containing Docker container logs is correctly exposed to the Datadog Agent container. On Linux, it corresponds to `-v /var/lib/docker/containers:/var/lib/docker/containers:ro` on the command line starting the Agent container, whereas on Windows it corresponds to `-v c:/programdata/docker/containers:c:/programdata/docker/containers:ro`. 

Note that the directory relative to the underlying host may be different due to specific configuration of the Docker daemon—this is not an issue pending a correct Docker volume mapping. For example, use `-v /data/docker/containers:/var/lib/docker/containers:ro` if the Docker data directory has been relocated to `/data/docker` on the underlying host.

If logs are collected but single lines appear to be split, check that the Docker daemon is using the [JSON logging driver](#different-docker-log-driver).

### Host based Agent

If you are installing the Agent on the host as opposed to running in a Docker container, the user `dd-agent` needs to be added to the Docker group to have permission to read from the Docker socket. If you see the following error logs from the agent:

```text
<TIMESTAMP> UTC | CORE | INFO | (pkg/autodiscovery/autoconfig.go:360 in initListenerCandidates) | docker listener cannot start, will retry: temporary failure in dockerutil, will retry later: could not determine docker server API version: Got permission denied while trying to connect to the Docker daemon socket at unix:///var/run/docker.sock: Get http://%2Fvar%2Frun%2Fdocker.sock/version: dial unix /var/run/docker.sock: connect: permission denied
<TIMESTAMP> UTC | CORE | ERROR | (pkg/autodiscovery/config_poller.go:123 in collect) | Unable to collect configurations from provider docker: temporary failure in dockerutil, will retry later: could not determine docker server API version: Got permission denied while trying to connect to the Docker daemon socket at unix:///var/run/docker.sock: Get http://%2Fvar%2Frun%2Fdocker.sock/version: dial unix /var/run/docker.sock: connect: permission denied
```

Add the Agent to the Docker user group, perform the following command:
```
usermod -a -G docker dd-agent
```
**Note:** When you install the Agent on the host, the Agent does not have permission to access` /var/lib/docker/containers` as these require root access. As a result it will collect logs from the Docker socket.


### Different Docker log driver

Docker’s default is the [json-file logging driver][23] so the Agent tries to read from this structure first. If your containers are set to use a different logging driver, the Logs Agent will indicate that it is able to successfully find your containers but it isn’t able to collect their logs from the file. In Docker environments, Datadog recommends using the `json-file` log driver for the optimal Agent experience. However, the Agent can also be configured to read from the `journald` logging driver.

1. If you’re unsure of which logging driver your containers are using, use `docker inspect <CONTAINER_NAME>` to see what logging driver you have set. The following block appears in the Docker Inspect when the container is using the JSON logging driver

   ```
   "LogConfig": {
       "Type": "json-file",
       "Config": {}
   },
   ```

2. If the container is set to the journald logging driver the following block appears in the Docker Inspect:
   ```
   "LogConfig": {
       "Type": "journald",
       "Config": {}
   },
   ```

3. To collect logs from the journald logging driver, set up the journald integration [following the Datadog-Journald documentation][24].
4. Mount the YAML file into your container following the instructions in the [Docker Agent documentation][25]. For more information on setting log drivers for Docker containers, [see this documentation][26].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /containers/docker/log/
[2]: /containers/kubernetes/log/
[3]: /integrations/aws-fargate/?tab=webui#log-collection
[4]: /integrations/eks_fargate/?tab=admissioncontrollerdatadogoperator#log-collection
[5]: /containers/guide/container-discovery-management
[6]: /containers/docker/log/?tab=dockerfile#log-integrations
[7]: /containers/kubernetes/log/?tab=datadogoperator#autodiscovery-annotations
[8]: /getting_started/site/
[9]: /agent/logs/advanced_log_collection/?tab=configurationfile
[10]: /getting_started/tagging/assigning_tags/?tab=containerizedenvironments#tags-cardinality
[11]: /containers/docker/tag/?tab=containerizedagent#out-of-the-box-tagging
[12]: /containers/kubernetes/tag/?tab=datadogoperator
[13]: /getting_started/tagging/unified_service_tagging/?tab=kubernetes
[14]: /getting_started/tagging/#tag-inheritance
[15]: /agent/configuration/agent-commands/
[16]: /logs/log_configuration/pipelines/?tab=host#preprocessing
[17]: https://app.datadoghq.com/logs/pipelines
[18]: /agent/logs/advanced_log_collection/?tab=kubernetes#scrub-sensitive-data-from-your-logs
[19]: /agent/logs/advanced_log_collection/?tab=environmentvariable#global-processing-rules
[20]: /getting_started/tagging/assigning_tags/?tab=noncontainerizedenvironments#integration-inheritance
[21]: https://kubernetes.io/docs/concepts/workloads/controllers/ttlafterfinished/#cleanup-for-finished-jobs
[22]: /logs/guide/docker-logs-collection-troubleshooting-guide/#your-containers-are-not-using-the-json-logging-driver
[23]: https://docs.docker.com/engine/logging/drivers/json-file/
[24]: /integrations/journald/?tab=host#setup
[25]: /containers/docker/#mounting-conf-d
[26]: https://docs.docker.com/engine/logging/drivers/journald/