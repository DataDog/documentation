---
aliases:
- /fr/security/threats/investigate_agent_events
- /fr/security/workload_protection/investigate_agent_events
description: Recherchez et analysez l'activité d'exécution que Datadog Agent envoie
  à Datadog en tant qu'événements d'agent.
disable_toc: false
further_reading:
- link: /security/workload_protection/detect_and_monitor/detection_and_finding_rules/detection_rules
  tag: Documentation
  text: Explorez les règles de détection de Workload Protection
- link: /security/notifications/
  tag: Documentation
  text: En savoir plus sur les notifications de sécurité
title: Événements d'agent
---
Datadog Agent évalue l'activité système sur l'hôte de l'agent. Lorsqu'une activité correspond à une expression de règle d'agent, l'agent génère un événement et le transmet au backend Datadog.

Avec [Agent Events Explorer][13], vous pouvez examiner les événements d'agent séparément des signaux. Examinez ce qui s'est passé, où cela s'est produit et quelle règle d'agent correspondait en utilisant le panneau latéral de l'événement. Vous pouvez également explorer le graphe d'investigation, l'arborescence des processus et la charge utile JSON brute, et consulter les instructions de triage et de réponse pour la règle correspondante.

## Examinez les événements d'agent {#investigate-agent-events}

Pour examiner un événement d'agent :

1. Accédez à [Agent Events Explorer][13]. Les événements d'agent sont interrogés et affichés à l'aide des contrôles d'explorateur standard dans l'[Explorateur d'événements][14] de Datadog.
2. Sélectionnez un événement d'agent. Le panneau latéral s'ouvre avec des onglets qui vous aident à examiner l'événement.

### Présentation {#overview}

L'onglet {{< ui >}}Overview{{< /ui >}} résume l'événement et constitue souvent le meilleur point de départ pour votre enquête.

{{< img src="security/workload_protection/investigate_and_triage/agent_events/agent_event_overview.png" alt="Onglet Vue d'ensemble du panneau latéral des événements d'agent montrant les sections Quoi, Où, Règle d'agent et Graphe d'investigation" width="100%">}}

L'onglet Vue d'ensemble comprend les sections suivantes :

- {{< ui >}}What{{< /ui >}} : Une description en langage clair de l'activité détectée. Par exemple, *Un utilisateur a exécuté la commande clang sur l'hôte i-0d85f97942d947ca9*.
- {{< ui >}}Where{{< /ui >}} : Le contexte de l'infrastructure où l'événement s'est produit, incluant le fournisseur cloud, le compte, la région, l'hôte, le cluster Kubernetes, l'espace de noms, le pod, le conteneur et l'image.
- {{< ui >}}Agent rule{{< /ui >}} : La règle d'agent correspondant à l'événement, incluant le nom de la règle, le nom de l'événement, les politiques de déploiement, la version de la politique et l'expression de la règle.
- {{< ui >}}Investigation graph{{< /ui >}} : Un aperçu du graphe d'investigation en bas de l'onglet Vue d'ensemble.
- {{< ui >}}Process tree{{< /ui >}} : La lignée complète des processus, du processus init système jusqu'au processus ayant déclenché l'événement.

#### Graphe d'investigation {#investigation-graph}

Le {{< ui >}}Investigation graph{{< /ui >}} est une visualisation interactive qui cartographie l'infrastructure et les processus impliqués dans l'événement. Il fournit une vue d'ensemble compacte de la chaîne d'attaque en mettant en évidence les entités et les processus les plus pertinents.

{{< img src="security/workload_protection/investigate_and_triage/agent_events/agent_event_investigation_graph.png" alt="Graphe d'investigation montrant l'hôte, le pod Kubernetes, le conteneur, l'image et le chemin d'exécution du processus principal" width="100%">}}

Le graphe retrace l'événement depuis l'hôte à travers l'infrastructure environnante — telle que le pod Kubernetes, le replica set, le conteneur et l'image de conteneur — et jusqu'au chemin d'exécution du processus. Les processus principaux impliqués dans l'événement sont affichés individuellement, tandis que les processus moins pertinents sont agrégés dans des nœuds groupés (par exemple, **+7 processus**) pour garder la vue concentrée sur l'activité suspecte.

Utilisez le graphe d'investigation pour comprendre comment l'activité détectée s'inscrit dans le contexte d'exécution plus large sans avoir à examiner chaque processus sur l'hôte.

#### Arborescence des processus {#process-tree}

Le {{< ui >}}Process tree{{< /ui >}} liste la lignée complète des processus, du processus init système jusqu'au processus ayant déclenché l'événement.

{{< img src="security/workload_protection/investigate_and_triage/agent_events/agent_event_process_tree.png" alt="Arborescence des processus listant la chaîne complète des processus, de systemd au processus ayant déclenché l'événement" width="100%">}}

Pour chaque processus de la chaîne, l'arborescence des processus affiche :

- {{< ui >}}Path{{< /ui >}} : Le chemin de l'exécutable et les arguments de la ligne de commande.
- {{< ui >}}PID{{< /ui >}} : L'identifiant du processus.
- {{< ui >}}PPID{{< /ui >}} : L'identifiant du processus parent.
- {{< ui >}}User{{< /ui >}} : Le contexte utilisateur sous lequel le processus a été exécuté.

L'arborescence des processus montre l'ascendance complète de l'événement, en commençant par `systemd` et en continuant à travers les processus intermédiaires — tels que `containerd`, `runc` et les processus spécifiques à la charge de travail — jusqu'à la commande correspondant à la règle Agent. Cela vous aide à reconstruire le chemin d'exécution exact qui a conduit à la détection.

### JSON {#json}

L'onglet {{< ui >}}JSON{{< /ui >}} affiche la charge utile brute de l'événement avec l'ensemble complet des attributs d'événement collectés par l'Agent. Utilisez le format JSON lorsque vous avez besoin de la vue la plus détaillée des données d'événement, par exemple pour rédiger des requêtes avancées dans [Agent Events Explorer][13], ou pour partager la charge utile complète de l'événement lors d'une enquête. Pour inclure ou exclure n'importe quel champ par filtrage, vous pouvez cliquer dessus depuis le JSON.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[13]: https://app.datadoghq.com/security/agent-events
[14]: /fr/events/explorer/