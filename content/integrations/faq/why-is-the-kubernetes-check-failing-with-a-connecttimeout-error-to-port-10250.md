---
title: Why is the Kubernetes check failing with a ConnectTimeout error to port 10250?
kind: faq
customnav: integrationsnav
---

The agent assumes that the kubelet API is available at the default gateway of the container. If that's not the case because you are using a software defined networks like Calico or Flannel, the agent needs to be specified using an environment variable:
```
          - name: KUBERNETES_KUBELET_HOST
            valueFrom:
              fieldRef:
                fieldPath: spec.nodeName
```
See [this PR](https://github.com/DataDog/dd-agent/pull/3051)