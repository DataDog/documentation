---
title: Can I install the agent on my Kubernetes master node(s)
kind: faq
customnav: integrationsnav
---

Yes!

Since Kubernetes 1.6, the concept of [Taints and Tolerances](http://blog.kubernetes.io/2017/03/advanced-scheduling-in-kubernetes.html) was introduced. Now rather than the master being off limits, it's simply tainted. If you add the required tolerance to the pod, it runs. 

You can simply add the following to your Deployment (or Daemonset if you are running a multi-master setup):
```
spec:
 tolerations: 
 - key: node-role.kubernetes.io/master
   effect: NoSchedule
```

Thanks to [Jon Davis @TrueAccord](https://github.com/ShakataGaNai) for bringing this up to our attention!