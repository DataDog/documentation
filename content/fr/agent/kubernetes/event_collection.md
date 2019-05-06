---
title: Collecte d'événements Kubernetes
kind: documentation
aliases:
  - /fr/integrations/faq/gathering-kubernetes-events
---
Tout comme la version 5 de l'Agent, l'Agent v6 peut recueillir des événements à partir du serveur d'API Kubernetes.

Définissez la variable `collect_kubernetes_events` sur `true` dans le fichier `datadog.yaml`. Pour y parvenir, vous pouvez utiliser la variable d'environnement `DD_COLLECT_KUBERNETES_EVENTS`, qui est résolue au démarrage.

Remarque : vous devrez accorder certains droits à l'Agent pour activer cette fonctionnalité : consultez la section [RBAC][1].

Une [ConfigMap][2] peut être utilisée pour stocker le `event.tokenKey` et le `event.tokenTimestamp`. Elle doit être déployée dans le même espace de nommage que les ressources, y compris l'Agent. L'espace de nommage des ressources peut être configuré avec `DD_KUBE_RESOURCES_NAMESPACE`.

Vous pouvez exécuter `kubectl create configmap datadogtoken --from-literal="event.tokenKey"="0"`. Vous pouvez également utiliser l'exemple dans `manifests/datadog_configmap.yaml`.

Lorsque vous utilisez une ConfigMap, si l'Agent en charge (via l'[élection de leader][3]) de la collecte d'événements échoue, le prochain leader élu utilise la ConfigMap pour identifier les derniers événements récupérés. Ainsi, aucun événement recueilli n'est dupliqué et le serveur d'API fait l'objet de moins de requêtes.

## Élection de leader

L'Agent v6 propose une option d'élection de leader intégrée pour le collecteur d'événements Kubernetes et les checks Kubernetes associés aux clusters (p. ex., le check de service relatif au plan de contrôle).

Cette fonctionnalité repose sur des `Endpoints`. Définissez la variable d'environnement `DD_LEADER_ELECTION` sur `true` pour l'activer. L'Agent doit pouvoir effectuer un ensemble d'actions avant son déploiement : consultez la section [RBAC][1] pour en savoir plus. Attention : ces entités RBAC **doivent** avoir été créées avant de définir l'option.

Les Agents s'organisent en élisant un leader parmi les membres du DaemonSet Datadog via Kubernetes afin de veiller à ce qu'une seule instance d'Agent leader à la fois rassemble des événements.

Cette fonctionnalité est désactivée par défaut. L'activation de la collecte de logs entraîne l'activation de cette fonctionnalité, afin d'éviter la collecte d'événements dupliqués et l'envoi d'un trop grand nombre de requêtes au serveur d'API.

`leaderLeaseDuration` correspond à la durée de validité de l'élection du leader. Elle est définie par défaut sur 60 secondes, et doit être supérieure à 30 secondes. Plus elle est longue, moins vos Agents envoient des requêtes au serveur d'API. Cependant, si le leader échoue, les événements ne seront pas recueillis jusqu'à ce que le bail expire et qu'un nouveau leader soit élu.
`leaderLeaseDuration` peut être configuré avec la variable d'environnement `DD_LEADER_LEASE_DURATION`.

[1]: /fr/agent/kubernetes#rbac
[2]: /fr/agent/kubernetes/integrations#configmap
[3]: /fr/agent/kubernetes/event_collection#leader-election