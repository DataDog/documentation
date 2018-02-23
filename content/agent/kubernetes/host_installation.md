---
title: Kubernetes host installation
kind: documentation
---

## Installation

Install the latest version of the Datadog Agent from [the Datadog agent integration page](https://app.datadoghq.com/account/settings#agent)

### Configuration

Enable the kubelet check & optionnaly the docker check if your kubernetes is using the docker runtime:

```shell
mv /etc/datadog-agent/conf.d/kubelet.d/conf.yaml.example /etc/datadog-agent/conf.d/kubelet.d/conf.yaml.default
```

Edit the `datadog.yaml` file to point to activate autodiscovery features for the kubelet (discovery through annotations):

```yaml
config_providers:
  - name: kubelet
    polling: true
listeners:
  - name: kubelet
```

You may now start/restart the agent to enable the new configuration settings.

#### Docker check

Optionally if you're using the docker runtime on your cluster you might want to activate the docker check as well:

```shell
mv /etc/datadog-agent/conf.d/docker.d/conf.yaml.example /etc/datadog-agent/conf.d/docker.d/conf.yaml.default
```

For the docker check to run properly you'll need to add the `dd-agent` user to the docker group using `adduser dd-agent docker`

### Validation
#### Container Running

To verify the Datadog Agent is running in your environment as a daemonset, execute:

    kubectl get daemonset

If the Agent is deployed you will see output similar to the text below, where desired and current are equal to the number of nodes running in your cluster.

    NAME            DESIRED   CURRENT   READY     UP-TO-DATE   AVAILABLE   NODE SELECTOR   AGE
    datadog-agent   2         2         2         2            2           <none>          16h

#### Agent check running

[Run the Agent's `status` subcommand](/agent/#agent-status-and-information) and look for `kubelet` under the Checks section:

    Checks
    ======

        kubelet
        -----------
          - instance #0 [OK]
          - Collected 39 metrics, 0 events & 7 service checks
