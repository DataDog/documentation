---
aliases:
- /fr/agent/autodiscovery/template_variables
- /fr/agent/faq/template_variables
- /fr/agent/guide/template_variables
further_reading:
- link: /agent/kubernetes/integrations/
  tag: Documentation
  text: Créer et charger un modèle d'intégration Autodiscovery
- link: /agent/guide/ad_identifiers/
  tag: Documentation
  text: Associer un conteneur au modèle d'intégration correspondant
- link: /agent/guide/autodiscovery-management/
  tag: Documentation
  text: Gérer les conteneurs à inclure dans Autodiscovery avec l'Agent
title: Template variables Autodiscovery
---

Utilisez les template variables suivantes lors de la configuration d'Autodiscovery afin d'attribuer de façon dynamique les valeurs de votre conteneur :

| Template variable           | Description                                                                                                                                                                                                 |
| --------------------------  | ---                                                                                                                                                                                                         |
| `"%%host%%"`                | Détecte automatiquement le réseau. Dans le cas des conteneurs à réseau unique, cette template variable renvoie l'adresse IP correspondante.                                                                                                                   |
| `"%%host_<NOM_RÉSEAU>%%"` | Indique le nom du réseau à utiliser, en cas d'association à plusieurs réseaux.                                                                                                                                      |
| `"%%port%%"`                | Utilise le port exposé le plus élevé lorsque les ports sont **triés numériquement par ordre croissant**.<br>Exemple : `8443` pour un conteneur qui expose les ports `80`, `443` et `8443`.                                    |
| `"%%port_<NOMBRE_X>%%"`     | Utilise le port `<NOMBRE_X>` **trié numériquement par ordre croissant**.<br> Exemple : si un conteneur expose les ports `80`, `443` et `8443`, `"%%port_0%%` correspond au port `80` et `"%%port_1%%"` au port `443`. |
| `"%%port_<NOM>%%"`     | Utilise le port associé au nom du port `<NOM>`.                                                                                                                                                           |
| `"%%pid%%"`                 | Récupère l'ID du processus de conteneur renvoyé par `docker inspect --format '{{.State.Pid}}' <NOM_CONTENEUR>`.                                                                                              |
| `"%%hostname%%"`            | Récupère la valeur `hostname` à partir de la configuration du conteneur. À n'utiliser que lorsque la variable `"%%host%%"` ne parvient pas à récupérer une adresse IP fiable (par exemple :  [ECS en mode AWSVPC][1]).                                       |
| `"%%env_<VAR_ENV>%%"`       | Utilise le contenu de la variable d'environnement `$<VAR_ENV>` **comme l'indique le processus de l'Agent**.                                                                                                                |
| `"%%kube_namespace%%"`      | Détecte automatiquement l'espace de nommage Kubernetes. |
| `"%%kube_pod_name%%"`       | Détecte automatiquement le nom du pod Kubernetes.  |
| `"%%kube_pod_uid%%"`        | Détecte automatiquement l'UID du pod Kubernetes.   |

**Alternative** :

* Pour `"%%host%%"` : si l'Agent n'est pas capable de la trouver, l'IP de réseau `bridge` est utilisée comme valeur alternative pour cette template variable.
* Pour `"%%host_<NOM_RÉSEAU>%%" : si le `<NOM_RÉSEAU>` spécifié n'a pas été trouvé, cette template variable se comporte comme `"%%host%%"`.

Les template variables ne sont pas toutes prises en charge, selon votre plateforme :

| Plateforme    | Identificateurs Auto-discovery  | Host | Port | Tag | Pid | Env | Hostname | Espace de nommage Kube | Nom du pod | UID du pod |
| ----------- | ---                         | ---  | ---  | --- | --- | --- | ---      | ---            | ---      | ---     |
| Docker      | ✅                          | ✅   | ✅   | ✅  | ✅  | ✅  | ✅      | ❌      | ❌      | ❌      |
| ECS Fargate | ✅                          | ✅   | ❌   | ✅  | ❌  | ✅  | ❌      | ❌      | ❌      | ❌      |
| Kubernetes  | ✅                          | ✅   | ✅   | ✅  | ❌  | ✅  | ❌      | ✅      | ✅      | ✅      |

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task-networking.html