---
title: Using tolerations with Datadog Operator
kind: faq
further_reading:
	- link: 'agent/kubernetes/log'
	  tag: 'Documentation'
	  text: 'Datadog and Kubernetes'
---

### Tolerations

Update your `datadog-agent.yaml` file with the following configuration to add the toleration in the `Daemonset.spec.template` of your `DaemonSet` :

```yaml
apiVersion: datadoghq.com/v1alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  credentials:
    apiKey: "<DATADOG_API_KEY>"
    appKey: "<DATADOG_APP_KEY>"
  agent:
    image:
      name: "datadog/agent:latest"
    config:
      tolerations:
       - operator: Exists
```

Apply this new configuration:

```shell
$ kubectl apply -f datadog-agent.yaml
datadogagent.datadoghq.com/datadog updated
```

The DaemonSet update can be validated by looking at the new desired pod value:

```shell
$ kubectl get -n $DD_NAMESPACE daemonset
NAME            DESIRED   CURRENT   READY   UP-TO-DATE   AVAILABLE   NODE SELECTOR   AGE
datadog-agent   3         3         3       3            3           <none>          7m31s

$ kubectl get -n $DD_NAMESPACE pod
NAME                                         READY   STATUS     RESTARTS   AGE
agent-datadog-operator-d897fc9b-7wbsf        1/1     Running    0          15h
datadog-agent-5ctrq                          1/1     Running    0          7m43s
datadog-agent-lkfqt                          0/1     Running    0          15s
datadog-agent-zvdbw                          1/1     Running    0          8m1s
```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
