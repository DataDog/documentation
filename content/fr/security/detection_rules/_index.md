---
aliases:
- /fr/security_monitoring/detection_rules/
- /fr/cloud_siem/detection_rules/
further_reading:
- link: /cloud_siem/default_rules
  tag: Documentation
  text: Explorer les règles de détection par défaut
- link: /security_platform/notifications/
  tag: Documentation
  text: En savoir plus sur les notifications de la plateforme de sécurité
- link: https://www.datadoghq.com/blog/detect-abuse-of-functionality-with-datadog/
  tag: Blog
  text: Détection des abus de fonctionnalité avec Datadog
- link: https://www.datadoghq.com/blog/impossible-travel-detection-rules/
  tag: Blog
  text: Détecter les activités de connexion suspectes grâce aux règles de détection
    de voyage impossible
kind: documentation
title: Règles de détection
---

## Présentation

Les règles de détection définissent la logique conditionnelle appliquée à l'ensemble des logs ingérés et des configurations du cloud. Lorsqu'un scénario d'une règle se réalise lors d'une période donnée, Datadog génère un signal de sécurité.

Chaque option de surveillance inclut des [règles de détection par défaut][1]. Il vous suffit de configurer une intégration pour pouvoir les utiliser.

- La solution [Cloud SIEM][2] tire profit de la détection des logs pour analyser en temps réel les logs ingérés. Vous pouvez également créer des [règles de détection personnalisées][3] pour répondre aux besoins de votre environnement.

- La solution [Cloud Security Posture Management][4] exploite des règles de détection de configuration cloud et d'infrastructure pour analyser l'intégrité de votre environnement cloud.

- Avec [Cloud Workload Security][5], l'Agent Datadog surveille activement l'activité système et procède à son évaluation sur la base d'un ensemble de règles de détection.

- [Application Security Monitoring][6] (ASM) tire profit de la solution [APM][7] Datadog, de l'[Agent Datadog][8] et des règles de détection afin d'identifier les menaces à l'encontre de l'environnement de votre application.

## Créer et gérer des règles de détection

La page [Detection Rules][9] vous permet d'effectuer des recherches parmi toutes les règles de détection en fonction d'un type de règle. Vous pouvez ainsi activer, désactiver, modifier, supprimer ou dupliquer en quelques secondes des règles. Pour créer une [règle de détection][3] personnalisée, cliquez sur le bouton **New Rule** en haut à droite de la page.

### Trouver des règles de détection

La recherche en texte libre filtre les règles de détection en fonction du texte figurant dans leur nom ou leur requête. Les résultats des requêtes se mettent à jour en temps réel lorsque vous modifiez une requête. Vous n'avez donc pas besoin de cliquer sur le moindre bouton pour lancer la recherche.

#### Filtrer par facette

Utilisez les facettes dans le volet de gauche pour restreindre une requête de recherche en fonction de sa valeur. Par exemple, si vous utilisez plusieurs types de règles, comme `log detection` ou `cloud configuration`, filtrez votre requête sur `only` pour afficher uniquement ces types de règles.

{{< img src="security_platform/security_monitoring/detection_rules/rule_type_filter.png" alt="Filtrage par type de règle, par exemple pour la détection de logs ou la configuration cloud, dans Datadog" style="width:80%;" >}}

Pour simplifier les processus d'enquête et de triage liés aux problèmes en cours, vous pouvez également appliquer un filtre basé sur des facettes, comme `source` et `severity`. Si vous souhaitez inclure toutes les facette d'une catégorie dans votre recherche, passez votre curseur sur une valeur dans le volet, puis cliquez sur **all**.

**Remarque** : par défaut, toutes les facettes sont sélectionnées.

### Tableau des règles

Les règles sont affichées dans le tableau des règles de détection. Cliquez sur l'option **Sort by** en haut à droite du tableau pour le trier. Vous pouvez par exemple utiliser l'option de tri **Highest Severity** pour afficher les problèmes de configuration et les menaces les plus dangereux.

#### Activation et désactivation d'une règle

Activez ou désactivez une règle à l'aide du bouton d'activation sur la droite.

#### Options relatives aux règles et aux signaux générés

Cliquez sur l'icône représentant trois points, en regard de l'option d'activation ou de désactivation d'une règle, puis sélectionnez l'une des options proposées : Edit, Clone, Delete ou View generated signals.

- Cliquez sur **Edit** pour modifier des requêtes, ajuster des déclencheurs, gérer les notifications ou mettre à jour la configuration de la règle.
  -  **Remarque** : pour modifier une règle prête à l'emploi, vous devez impérativement la dupliquer, puis modifier la règle dupliquée. Pour modifier une règle par défaut, cliquez sur **Edit** et faites défiler la page de configuration de la règle vers le bas. Cliquez sur **Clone**, puis modifiez la règle.
- La duplication d'une règle vous permet notamment d'apporter de légères modifications à ses paramètres afin de modifier la détection. Par exemple, vous pouvez dupliquer une règle de détection de logs en remplaçant son paramètre **Threshold** par **Anomaly**, afin d'ajouter une nouvelle dimension à la détection des menaces tout en conservant les mêmes requêtes et déclencheurs.
- L'option Delete est **uniquement** disponible pour les règles personnalisées. Il n'est pas possible de supprimer une règle prête à l'emploi, car elles sont intégrées nativement à la plateforme. Pour supprimer de façon définitive une règle personnalisée, cliquez sur **Delete**. Pour désactiver une règle prête à l'emploi, cliquez sur le bouton de désactivation.
- Cliquez sur **View generated signals** pour accéder au [Signals Explorer][6] et définir une requête basée sur l'ID d'une règle. Celle fonctionnalité est particulièrement utile pour mettre en corrélation des signaux avec différentes sources en fonction d'une règle spécifique, ou encore pour procéder à l'audit de plusieurs règles.

## Pour aller plus loin
{{< partial name="whats-next/whats-next.html" >}}


[1]: /fr/security_platform/default_rules/
[2]: /fr/security_platform/cloud_siem/
[3]: /fr/security_platform/cloud_siem/log_detection_rules/
[4]: /fr/security_platform/cspm/
[5]: /fr/security_platform/cloud_workload_security/
[6]: /fr/security_platform/explorer/
[7]: /fr/tracing/
[8]: /fr/agent/
[9]: https://app.datadoghq.com/security/configuration/rules