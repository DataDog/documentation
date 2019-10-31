---
title: Exécuter l'Agent sur un host avec Kubernetes
kind: documentation
further_reading:
  - link: agent/autodiscovery
    tag: documentation
    text: Autodiscovery avec l'Agent Docker
  - link: agent/kubernetes/host_setup
    tag: documentation
    text: Exécuter l'Agent sur un host avec Kubernetes
  - link: agent/kubernetes/integrations
    tag: documentation
    text: Intégrations personnalisées
---
L'installation de l'Agent directement sur votre host (au lieu de son exécution dans un pod) offre une visibilité supplémentaire sur votre écosystème, indépendamment de Kubernetes.

Pour recueillir vos métriques kube-state :

1. Téléchargez le [dossier des manifestes Kube-State][1].

2. Appliquez-les à votre cluster Kubernetes :
  ```
  kubectl apply -f <NAME_OF_THE_KUBE_STATE_MANIFESTS_FOLDER>
  ```

## Configurer l'intégration kube-dns
### Configuration

Depuis l'[Agent v6][2], l'intégration Kubernetes DNS fonctionne automatiquement avec l'[Autodiscovery][3].

Remarque : ces métriques ne sont pas disponibles pour Azure Kubernetes Service (AKS). 

## Recueillir des logs de conteneur

**Disponible à partir des versions > 6.0 de l'Agent**

Vous pouvez recueillir vos logs depuis des conteneurs s'exécutant dans Kubernetes de deux façons différentes :

- Par l'intermédiaire du socket Docker
- Par l'intermédiaire des fichiers de log Kubernetes

Si vous n'utilisez pas Docker ou si vous utilisez plus de 10 conteneurs par pod, il est conseillé de passer par les fichiers de log Kubernetes.

Nous vous conseillons également de tirer parti des DaemonSets pour [déployer automatiquement l'Agent Datadog sur l'ensemble de vos nœuds][4].
Pour activer manuellement la collecte de logs à partir d'un nœud spécifique, ajoutez les paramètres suivants dans le fichier `datadog.yaml` :

```
logs_enabled: true
listeners:
  - name: kubelet
config_providers:
  - name: kubelet
    polling: true
logs_config:
  container_collect_all: true
```

[Redémarrez l'Agent][7].

Utilisez [Autodiscovery avec les annotations de pod][8] pour configurer la collecte de logs de façon à ajouter des règles de traitement multiligne ou pour personnaliser les attributs `source` et `service`.

## Pour aller plus loin
Pour mieux comprendre comment (et pourquoi) intégrer votre service Kubernetes, consultez la série d'[articles de blog de Datadog][6].

[1]: https://github.com/kubernetes/kube-state-metrics/tree/master/examples/standard
[2]: /fr/agent
[3]: /fr/agent/autodiscovery
[4]: https://app.datadoghq.com/account/settings#agent/kubernetes
[5]: https://docs.datadoghq.com/fr/agent/basic_agent_usage/kubernetes/#log-collection-setup
[6]: https://www.datadoghq.com/blog/monitoring-kubernetes-era
[7]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[8]: https://docs.datadoghq.com/fr/agent/autodiscovery/integrations/?tab=kubernetes