---
title: Why is the Kubernetes check failing with a ConnectTimeout error to port 10250?
kind: faq
---

[The Datadog Agent][1] assumes that the kubelet API is available at the default gateway of the container. If that's not the case because you are using a software defined network like Calico or Flannel, override the kubelet host with the KUBERNETES_KUBELET_HOST environment variable.

```
          - name: KUBERNETES_KUBELET_HOST
            valueFrom:
              fieldRef:
                fieldPath: spec.nodeName
```

See [this PR][2]

[1]: /agent
[2]: https://github.com/DataDog/dd-agent/pull/3051
