---
title: Kubernetes host installation
kind: documentation
---

Install the `dd-check-kubernetes` package manually or with your favorite configuration manager.

### Configuration

Edit the `kubernetes.yaml` file to point to your server and port, set the masters to monitor:

```yaml
instances:
    host: localhost
    port: 4194
    method: http
```

See the [example kubernetes.yaml](https://github.com/DataDog/integrations-core/blob/master/kubernetes/conf.yaml.example) for all available configuration options.

### Validation
#### Container Running

To verify the Datadog Agent is running in your environment as a daemonset, execute:

    kubectl get daemonset

If the Agent is deployed you will see output similar to the text below, where desired and current are equal to the number of nodes running in your cluster.

    NAME       DESIRED   CURRENT   NODE-SELECTOR   AGE
    dd-agent   3         3         <none>          11h

#### Agent check running

[Run the Agent's `info` subcommand](/agent/#agent-status-and-information) and look for `kubernetes` under the Checks section:

    Checks
    ======

        kubernetes
        -----------
          - instance #0 [OK]
          - Collected 39 metrics, 0 events & 7 service checks