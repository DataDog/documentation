---
title: Can I install the Agent on my Kubernetes master node(s)
kind: faq
---

Yes!

Since Kubernetes 1.6, the concept of [Taints and Tolerances][1] was introduced. Now rather than the master being off limits, it's tainted. If you add the required tolerance to the pod, it runs.

Add the following to your Deployment (or Daemonset if you are running a multi-master setup):

```yaml
spec:
 tolerations:
 - key: node-role.kubernetes.io/master
   effect: NoSchedule
```

Thanks to [Jon Davis @TrueAccord][2] for bringing this up to our attention!

[1]: http://blog.kubernetes.io/2017/03/advanced-scheduling-in-kubernetes.html
[2]: https://github.com/ShakataGaNai
