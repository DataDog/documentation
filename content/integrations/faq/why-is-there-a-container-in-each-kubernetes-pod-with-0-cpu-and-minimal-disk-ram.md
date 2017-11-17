---
title: Why is there a container in each Kubernetes pod with 0% CPU and minimal disk/ram?
kind: faq
customnav: integrationsnav
---

These are pause containers (docker_image:gcr.io/google_containers/pause.*) that K8s injects into every pod to keep it populated even if the "real” container is restarting/stopped. 

The docker_daemon check ignores them through a default exclusion list, but they will show up for K8s metrics like *kubernetes.cpu.usage.total* and *kubernetes.filesystem.usage*.