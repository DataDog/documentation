---
aliases:
- /fr/agent/autodiscovery/template_variables
- /fr/agent/faq/template_variables
- /fr/agent/guide/template_variables
description: Guide de référence pour les variables de modèle disponibles dans la configuration
  d'intégration Autodiscovery pour les environnements de conteneurs dynamiques
further_reading:
- link: /containers/kubernetes/integrations/
  tag: Documentation
  text: Configurer les intégrations avec Autodiscovery sur Kubernetes
- link: /containers/docker/integrations/
  tag: Documentation
  text: Configurer les intégrations avec Autodiscovery sur Docker
- link: /agent/guide/ad_identifiers/
  tag: Documentation
  text: Associer un conteneur au modèle d'intégration correspondant
- link: /agent/guide/autodiscovery-management/
  tag: Documentation
  text: Gérer les conteneurs à inclure dans Autodiscovery avec l'Agent
title: Template variables Autodiscovery
---

[Autodiscovery][1] vous permet de définir des configurations statiques pour des ressources dynamiques comme les conteneurs.

Vous pouvez utiliser les variables de modèle suivantes pour attribuer dynamiquement les valeurs de votre conteneur :

| Template variable | Rôle |
| --------------------------  | ---    |
| `"%%host%%"`                | L'adresse IP réseau du conteneur. |
| `"%%host_<NETWORK NAME>%%"` | Lorsque le conteneur est attaché à plusieurs réseaux, renvoie le nom de réseau à utiliser. |
| `"%%port%%"`                | Le port exposé le plus élevé **trié numériquement et par ordre croissant**.<br>Par exemple, renvoie `8443` pour un conteneur qui expose les ports `80`, `443` et `8443`. |
| `"%%port_<NUMBER_X>%%"`     | Le port `<NUMBER_X>` **trié numériquement et par ordre croissant**.<br>Par exemple, si un conteneur expose les ports `80`, `443` et `8443`, `"%%port_0%%` fait référence au port `80` et `"%%port_1%%"` fait référence au port `443`. |
| `"%%port_<NAME>%%"`     | Le port associé au nom de port `<NAME>`. |
| `"%%pid%%"`                 | L'ID de processus du conteneur, tel que renvoyé par `docker inspect --format '{{.State.Pid}}' <CONTAINER_NAME>`. |
| `"%%hostname%%"`            | La valeur `hostname` de la configuration du conteneur. Utilisez cette variable uniquement si la variable `"%%host%%"` ne peut pas récupérer une adresse IP fiable (par exemple, en [mode ECS awsvpc][2]).                                       |
| `"%%env_<ENV_VAR>%%"`       | Le contenu de la variable d'environnement `$<ENV_VAR>` **tel que vu par le processus de l'Agent**.  |
| `"%%kube_namespace%%"`      | L'espace de nommage Kubernetes. |
| `"%%kube_pod_name%%"`       | Le nom de pod Kubernetes.  |
| `"%%kube_pod_uid%%"`        | L'UID de pod Kubernetes.   |

**Alternative** :

* Pour la variable de modèle `"%%host%%"` : si l'Agent n'est pas en mesure de trouver l'adresse IP, cette variable de modèle revient à l'adresse IP du réseau `bridge`.
* Pour `"%%host_<NETWORK NAME>%%"` : si le `<NETWORK_NAME>` spécifié est introuvable, cette variable de modèle se comporte comme `"%%host%%"`.

Les template variables ne sont pas toutes prises en charge, selon votre plateforme :

| Plateforme    | Identificateurs Auto-discovery  | Host | Port | Tag | Pid | Env | Hostname | Espace de nommage Kube | Nom du pod | UID du pod |
| ----------- | ---                         | ---  | ---  | --- | --- | --- | ---      | ---            | ---      | ---     |
| Docker      | ✅                          | ✅   | ✅   | ✅  | ✅  | ✅  | ✅      | ❌      | ❌      | ❌      |
| ECS Fargate | ✅                          | ✅   | ❌   | ✅  | ❌  | ✅  | ❌      | ❌      | ❌      | ❌      |
| Kubernetes  | ✅                          | ✅   | ✅   | ✅  | ❌  | ✅  | ❌      | ✅      | ✅      | ✅      |

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/getting_started/containers/autodiscovery
[2]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task-networking.html