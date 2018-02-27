---
title: Kubernetes process collection
kind: documentation
further_reading:
- link: "/agent/process_collection/kubernetes_process_collection"
  tag: "Documentation"
  text: Send your kubernetes processes
- link: "/graphing/infrastructure/process"
  tag: "Documentation"
  text: Analyse your process in Datadog
---

### Kubernetes Daemonset

In the [dd-agent.yaml](https://app.datadoghq.com/account/settings#agent/kubernetes) manifest used to create the daemonset, add the following environmental variables, volume mount, and volume:

```
 env:
    - name: DD_PROCESS_AGENT_ENABLED
      value: "true"
  volumeMounts:
    - name: passwd
      mountPath: /etc/passwd
      readOnly: true
  volumes:
    - hostPath:
        path: /etc/passwd
      name: passwd    
```

Refer to the standard [daemonset installation](/integrations/kubernetes/#installation-via-daemonsets-kubernetes-110) and the [docker-dd-agent](https://github.com/DataDog/docker-dd-agent) information pages for further documentation.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}