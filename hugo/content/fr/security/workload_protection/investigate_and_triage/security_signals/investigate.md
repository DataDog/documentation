---
description: Utilisez le panneau latéral des signaux pour reconstruire le scénario
  de l'attaque, évaluer l'impact et lire les données brutes du signal.
disable_toc: false
title: Enquêter sur les signaux de sécurité
---
Lorsque vous sélectionnez un signal Workload Protection dans le [Signals Explorer][1], le panneau latéral fournit des outils d'investigation pour reconstruire le scénario de l'attaque, comprendre l'impact et accéder aux données brutes du signal.

## Que s'est-il passé {#what-happened}

La section {{< ui >}}What Happened{{< /ui >}} vous donne un résumé du signal actuelA:

- {{< ui >}}Attack chain{{< /ui >}}A: Une description lisible par l'homme de l'activité détectée et de la façon dont elle s'intègre dans le scénario de menace plus large.
- {{< ui >}}Where{{< /ui >}}A: Le contexte de l'infrastructure où le signal s'est produit, incluant le fournisseur cloud, le compte, la région, le host, le cluster Kubernetes, l'espace de noms, le pod, le conteneur et l'image.
- {{< ui >}}Detection rule{{< /ui >}}A: La règle de détection backend qui a généré le signal, incluant son nom, sa gravité et l'expression de la règle.
- {{< ui >}}Agent rule{{< /ui >}}A: La règle Agent qui a correspondu à l'activité d'exécution sous-jacente, incluant le nom de la règle, le nom de l'événement et les politiques de déploiement.

## Graphique d'investigation {#investigation-graph}

L'onglet {{< ui >}}Investigation{{< /ui >}} affiche un graphique interactif qui cartographie les processus, les ressources et les événements d'exécution impliqués dans le signal. Le graphique d'investigation vous aide à visualiser le déroulement d'une attaque étape par étape.

{{< img src="security/workload_protection/investigate_and_triage/security_signals/signal_investigation_graph.png" alt="Graphique d'investigation montrant une chaîne d'attaque de l'attaquant au conteneur compromis, avec les processus corrélés et les actions suspectes" width="100%">}}

Depuis le graphique, vous pouvez pivoter vers d'autres sources de télémétrie, telles que Code Security ou Infrastructure Monitoring, pour valider les vulnérabilités du code ou obtenir plus d'informations sur la ressource spécifique.

### AÉvénements corrélés {#correlated-events}

Utilisez {{< ui >}}Correlated events{{< /ui >}} sur le graphique d'investigation pour étendre la vue au-delà du signal initial. Il utilise des [variables][2] pour regrouper l'activité d'exécution appartenant à la même lignée de processus ou chaîne d'exploitation.

Chaque événement détecté par Workload Protection est marqué avec une clé de corrélation qui l'associe à d'autres événements dans la même chaîne d'exécution. Ce regroupement vous aide à vous concentrer sur la tentative de compromission plus large au lieu de répondre à des alertes isolées.

Workload Protection prend en charge des couches de contexte d'exécution intégrées pour les scénarios d'exécution courants, notammentA:

- **Contexte cgroup générique**A: Contexte de secours pour les événements non liés.
- **Contexte auid générique**A: Regroupe les événements par session utilisateur.
- **Contexte de service**A: Isole l'activité d'exécution au sein des limites du service.
- **Contexte de shell interactif**A: Corrèle les commandes provenant de la même session shell.
- **Contexte de session utilisateur Kubernetes**A: Suit les actions des utilisateurs Kubernetes avec une corrélation précise.
- **IOC de logiciel malveillant**A: Regroupe les événements qui correspondent au même indicateur de logiciel malveillant provenant de [renseignements sur les menaces][5], tel qu'un hachage de fichier ou un domaine.

### Rayon d'impact {#blast-radius}

Utilisez {{< ui >}}Blast radius{{< /ui >}} sur le graphique d'investigation pour évaluer l'impact potentiel de la menace détectée. La vue du rayon d'impact met en évidence les ressources, les services et les dépendances qui pourraient être affectés si le compromis se propage au-delà du point de détection initial.

Cela vous aide à prioriser les efforts de réponse et à comprendre quelles charges de travail, quels hosts ou quels conteneurs adjacents nécessitent une surveillance ou un renforcement supplémentaire.

### Chronologie des événements {#events-timeline}

La {{< ui >}}Events timeline{{< /ui >}} présente un récit chronologique de chaque événement au sein d'une histoire de menace corrélée. Elle combine les événements corrélés, les statuts de triage, les réponses et les actions recommandées dans une vue unique. Utilisez-la pour retracer les mouvements d'un attaquant, de l'exploitation initiale aux actions ultérieures, sans changer de vue.

Chaque événement dans la chronologie inclut des détails contextuels et des liens vers des métriques, des logs et des traces corrélés.

## Contexte {#context}

L'onglet {{< ui >}}Context{{< /ui >}} résume les attributs clés du host où le signal a été déclenché et renvoie vers des métriques, des processus et d'autres informations connexes pour vous aider à évaluer la ressource affectée.

## JSON du signal {#signal-json}

L'onglet {{< ui >}}Signal JSON{{< /ui >}} affiche le contenu brut du signal. Le JSON du signal est la structure de données sous-jacente qui alimente le Signals Explorer, les dashboards et les requêtes programmatiques.

Utilisez le JSON du signal lorsque vous devez :

- Rédigez des requêtes complexes pour regrouper, compter ou corréler des signaux dans le [Signals Explorer][1] ou les [dashboards][3].
- Créez des automatisations ou des intégrations qui consomment des données de signal via la [Datadog API][4].
- Partagez la charge utile complète du signal avec vos collègues ou des outils externes lors d'une enquête.

<div class="alert alert-info">Le JSON du signal est surtout utile aux utilisateurs avancés qui souhaitent interroger les signaux par programmation. Pour la plupart des enquêtes, le graphique d'investigation, la chronologie et l'onglet Contexte fournissent les informations dont vous avez besoin.</div>

[1]: https://app.datadoghq.com/security/workload-protection/signals
[2]: /fr/security/workload_protection/detect_and_monitor/agent_rules/variables_and_actions
[3]: /fr/dashboards/
[4]: /fr/api/latest/security-monitoring/
[5]: /fr/security/workload_protection/detect_and_monitor/threat_intelligence