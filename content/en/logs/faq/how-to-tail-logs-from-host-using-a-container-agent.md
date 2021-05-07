---
title: How to tail logs from host using the Container Agent
kind: faq
further_reading:
- link: "/docker/log"
  tag: "Documentation"
  text: "Logging with Docker"
- link: "/agent/docker/log/?tab=containerinstallation"
  tag: "Documentation"
  text: "Logging with Kubernetes"
- link: "https://www.datadoghq.com/blog/docker-logging/"
  tag: "Blog"
  text: "Docker Logging Best Practices"
---

<div class="alert alert-info">Datadog recommends using <b>STDOUT/STDERR</b> to collect container logs.</div>

## Overview

Pods/containers have no access to host files by default, which also applies to the Agent. If you try to configure your container Agent to collect logs from host files, you will see a similar error message to the one below:

```
  syslog
  ------
    Type: file
    Path: /var/log/messages
    Status: Error: file /var/log/messages does not exist

```

To give the container Agent access to host files, mount the file or its directory to the container Agent. Review the list of [Agent configuration files and directories][1] for which host file and directory to mount based your OS.

Here are some examples for Kubernetes and Docker:

{{< tabs >}}
{{% tab "Kubernetes" %}}

To mount the log files in your host to the Agent container, set the host log directory in the volumes section of your Agent manifest and the container log directory in `volumeMounts` section:

```
        volumeMounts:
          - name: customlogs
            ## The desired log directory inside the agent container:
            mountPath: /container/var/test-dir/logs/

      volumes:
        - name: customlogs
          hostPath:
            ## The directory in your host containing the log files.
            path: /var/test-dir/logs/
```

Next, configure the Agent to tail the files for log collection. To do this, you can mount a custom logs config into `/conf.d/`. The file name can be anything, as long as it has a `.yaml` extension.

It is preferable to use a ConfigMap to store configurations rather than mounting a host file directly. Here's a sample ConfigMap manifest that has a `logs.yaml` file:

```
kind: ConfigMap
apiVersion: v1
metadata:
     name: ddagent-logs-configmap
     namespace: default
data:
     logs.yaml: |-
           logs:
             - type: file
               service: syslog
               source: os
               ## Use the container log directory you set in the agent manifest
               path: /container/var/test-dir/logs/*.log
```

Create the ConfigMap object using the command:

```bash
kubectl create -f <configmap manifest>
```

Then, mount it under `/conf.d/`:

```
        volumeMounts:
          - name: cm-logs
            mountPath: /conf.d/

      volumes:
        - name: cm-logs
          configMap:
            name: ddagent-logs-configmap
```

{{% /tab %}}
{{% tab "Docker" %}}

To mount the host log file, add a volume parameter in your Agent's `docker run` command:

```
-v /<host log directory>/:<container log directory>/
```

Then, create a custom logs config locally:

```
logs:
  - type: file
    service: syslog
    source: os
    path: <container log path>/*.log
```

and mount it into `/conf.d/`. The file name can be anything:

```
-v <absolute path>/logs.yaml:/conf.d/logs.yaml
```

Your Agent’s Docker installation command should look like this:

```
DOCKER_CONTENT_TRUST=1 docker run -d \
           --name datadog-agent \
           -e DD_API_KEY=<DATADOG_API_KEY> \
           -e DD_LOGS_ENABLED=true \
           -v /var/run/docker.sock:/var/run/docker.sock:ro \
           -v /proc/:/host/proc/:ro \
           -v /opt/datadog-agent/run:/opt/datadog-agent/run:rw \
           -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
           -v /<host log directory>/:<container log directory>/ \
           -v /<config location>/logs.yaml:/conf.d/logs.yaml \
           datadog/agent
```
{{% /tab %}}
{{< /tabs >}}

## Verification

After you have set this all up, you can now deploy the Agent. You should be able to see something like the below when you run `docker exec -it datadog-agent agent status`:

```
==========
Logs Agent
==========

    Sending compressed logs in HTTPS to agent-http-intake.logs.datadoghq.com on port 443
    BytesSent: 10605
    EncodedBytesSent: 2144
    LogsProcessed: 32
    LogsSent: 31

  logs
  ----
    Type: file
    Path: /container/var/test-dir/logs/*.log
    Status: OK
      1 files tailed out of 1 files matching
    Inputs: /container/var/test-dir/logs/722bfb2cb35cc627-json.log

```

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/guide/agent-configuration-files/?tab=agentv6v7
