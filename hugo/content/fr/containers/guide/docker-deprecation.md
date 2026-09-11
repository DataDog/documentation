---
aliases:
- /fr/agent/guide/docker-deprecation
title: Obsolescence de Docker dans Kubernetes
---

Kubernetes a abandonné le runtime Docker depuis la version 1.20, et certains fournisseurs cloud en font de même dans leurs images.

- AKS 1.19 [Docker obsolète ; containerd utilisé par défaut][1]

- GKE 1.19 [Docker obsolète ; containerd utilisé par défaut sur les nouveaux nœuds][2].

- EKS 1.22 [Docker obsolète ; containerd utilisé par défaut][3]

- OKE 1.20 [Docker obsolète ; CRI-O utilisé par défaut][4]

Si vous utilisez une version de Kubernetes pour laquelle Docker est obsolète, le socket Docker n'est plus disponible, ou ne dispose pas d'informations à propos des conteneurs exécutés par Kubernetes, et le check Docker ne fonctionne plus. Consultez le site [kubernetes.io][5] pour en savoir plus sur le runtime Docker. Vous devez donc activer le check [containerd][6] ou [CRI-O][7], en fonction du runtime que vous utilisez pour vos conteneurs. Les métriques relatives aux conteneurs qui sont recueillies à partir du nouveau runtime de conteneur remplacent les métriques Docker.

Depuis la version 7.27 de l'Agent Datadog, l'Agent détecte automatiquement l'environnement en cours d'exécution. Vous n'avez donc pas besoin de modifier la configuration.

**Si vous utilisez une version de l'Agent antérieure à la 7.27, vous devez spécifier le chemin du socket du runtime de conteneur :**

**Remarque** : vous devrez peut-être mettre à jour vos monitors, dashboards et SLO existants, en raison de la modification du nom des métriques. Par exemple, `docker.*` est remplacé par `containerd.*`.

{{< tabs >}}
{{% tab "Helm" %}}
Définssez le chemin du socket de votre runtime de conteneur avec le paramètre `datadog.criSocketPath` dans le [chart Helm][1].

Par exemple :

```
criSocketPath:  /var/run/containerd/containerd.sock
```

[1]: https://github.com/DataDog/helm-charts/blob/d8817b4401b75b1a064481da989c451633249ea9/charts/datadog/values.yaml#L262-L263
{{% /tab %}}
{{% tab "DaemonSet" %}}

Supprimez les références au socket Docker, ainsi que les montages de volume du socket Docker.

Utilisez la variable d'environnement `DD_CRI_SOCKET_PATH` pour pointer vers le chemin du socket de votre runtime de conteneur. Définissez cette variable pour tous les conteneurs d'Agent si vous utilisez des conteneurs distincts :

```
env:
  - name: DD_CRI_SOCKET_PATH
    value: /var/run/containerd/containerd.sock
```

Montez le socket depuis votre host vers le conteneur de l'Agent :

```
volumeMounts:
  - name: containerdsocket
    mountPath: /var/run/containerd/containerd.sock
  - mountPath: /host/var/run
    name: var-run
    readOnly: true
volumes:
  - hostPath:
      path: /var/run/containerd/containerd.sock
    name: containerdsocket
  - hostPath:
      path: /var/run
    name: var-run
```

{{% /tab %}}
{{< /tabs >}}

[1]: https://github.com/Azure/AKS/releases/tag/2020-11-16
[2]: https://cloud.google.com/kubernetes-engine/docs/release-notes#December_08_2020
[3]: https://aws.amazon.com/blogs/containers/amazon-eks-1-21-released/
[4]: https://docs.oracle.com/en-us/iaas/releasenotes/changes/52d34150-0cb8-4a0f-95f3-924dec5a3c83/
[5]: https://kubernetes.io/docs/tasks/administer-cluster/migrating-from-dockershim/check-if-dockershim-deprecation-affects-you/#role-of-dockershim
[6]: /fr/integrations/containerd/
[7]: /fr/integrations/crio/