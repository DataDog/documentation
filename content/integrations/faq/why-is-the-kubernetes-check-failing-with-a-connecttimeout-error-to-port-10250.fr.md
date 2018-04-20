---
title: Pourquoi le check de Kubernetes échoue-t-elle avec une erreur ConnectTimeout sur le port 10250?
kind: faq
---

[L'Agent de Datadog][1] suppose que l'API Kubelet est disponible sur la gateway par défaut du conteneur. Si ce n'est pas le cas cat vous utilisez un réseau défini par logiciel comme Calico ou Flannel, remplacez l'host kubelet par la variable d'environnement KUBERNETES_KUBELET_HOST.

```
          - name: KUBERNETES_KUBELET_HOST
            valueFrom:
              fieldRef:
                fieldPath: spec.nodeName
```

consultez [cette PR][2]

[1]: /agent
[2]: https://github.com/DataDog/dd-agent/pull/3051
