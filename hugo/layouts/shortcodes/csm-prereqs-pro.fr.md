L'Agent Datadog version `7.46` ou ultérieure doit être installé sur vos hosts ou conteneurs.

### CSM Vulnerabilities

| Composant                | Version/prérequis                     |
| ------------------------ | ----------------------------------------|
| [Chart Helm][102]            | v3.49.6 ou version ultérieure (Kubernetes uniquement)      |
| [containerd][103]              | v1.5.6 ou version ultérieure (Kubernetes et hosts uniquement)|

**Remarque** : CSM Vulnerabilities n'est **pas** disponible pour les environnements suivants.

  - Windows
  - AWS Fargate 
  - Runtime CRI-O
  - Runtime podman

[102]: /containers/kubernetes/installation/?tab=helm
[103]: https://kubernetes.io/docs/tasks/administer-cluster/migrating-from-dockershim/find-out-runtime-you-use/