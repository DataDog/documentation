---
aliases:
- /fr/security_monitoring/detection_rules/
- /fr/cloud_siem/detection_rules/
- /fr/security_platform/detection_rules/
further_reading:
- link: /cloud_siem/default_rules
  tag: Documentation
  text: Explorer les règles de détection par défaut
- link: /security/notifications/
  tag: Documentation
  text: En savoir plus sur les notifications de sécurité
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

- La solution [Cloud Security Posture Misconfigurations][4] exploite des règles de détection de configuration cloud et d'infrastructure pour analyser l'intégrité de votre environnement cloud.

- Avec [Cloud Security Management Threats][5], l'Agent Datadog surveille activement l'activité système et procède à son évaluation sur la base d'un ensemble de règles de détection.

- [Application Security Management][6] (ASM) tire profit de la solution [APM][7] Datadog, de l'[Agent Datadog][8] et des règles de détection afin d'identifier les menaces à l'encontre de l'environnement de votre application.

## Créer et gérer des règles de détection

La page [Detection Rules][9] vous permet d'effectuer des recherches parmi toutes les règles de détection en fonction d'un type de règle. Vous pouvez ainsi activer, désactiver, modifier, supprimer ou dupliquer en quelques secondes des règles. Pour créer une [règle de détection][3] personnalisée, cliquez sur le bouton **New Rule** en haut à droite de la page.

### Trouver des règles de détection

La recherche en texte libre filtre les règles de détection en fonction du texte figurant dans leur nom ou leur requête. Les résultats des requêtes se mettent à jour en temps réel lorsque vous modifiez une requête. Vous n'avez donc pas besoin de cliquer sur le moindre bouton pour lancer la recherche.

#### Filtrer par facette

Utilisez les facettes dans le volet de gauche pour restreindre une requête de recherche en fonction de sa valeur. Par exemple, si vous utilisez plusieurs types de règles, comme `log detection` ou `cloud configuration`, filtrez votre requête sur `only` pour afficher uniquement ces types de règles.

{{< img src="security/security_monitoring/detection_rules/rule_type_filter.png" alt="Filtrage par type de règle, par exemple pour la détection de logs ou la configuration cloud, dans Datadog" style="width:80%;" >}}

Pour simplifier les processus d'enquête et de triage liés aux problèmes en cours, vous pouvez également appliquer un filtre basé sur des facettes, comme `source` et `severity`. Si vous souhaitez inclure toutes les facette d'une catégorie dans votre recherche, passez votre curseur sur une valeur dans le volet, puis cliquez sur **all**.

**Remarque** : par défaut, toutes les facettes sont sélectionnées.

### Tableau des règles

Les règles sont affichées dans le tableau des règles de détection. Cliquez sur l'option **Sort by** en haut à droite du tableau pour le trier. Vous pouvez par exemple utiliser l'option de tri **Highest Severity** pour afficher les problèmes de configuration et les menaces les plus dangereux.

#### Activer ou désactiver des règles

Pour activer ou désactiver une règle, cliquez sur le bouton en regard de la règle en question.

Vous pouvez également activer ou désactiver plusieurs règles à la fois :

1. Cliquez sur **Select Rules**.
1. Sélectionnez les règles à activer ou désactiver.
1. Cliquez sur le menu déroulant **Edit Rules**.
1. Sélectionnez **Enable Rules** pour activer les règles ou **Disable Rules** pour les désactiver.

#### Options relatives aux règles et aux signaux générés

Cliquez sur l'icône représentant trois points, en regard de l'option d'activation ou de désactivation d'une règle, puis sélectionnez l'une des options proposées : Edit, Clone, Delete ou View generated signals.

- Cliquez sur **Edit** pour modifier des requêtes, ajuster des déclencheurs, gérer les notifications ou mettre à jour la configuration de la règle.
  -  **Remarque** : pour modifier une règle prête à l'emploi, vous devez impérativement la dupliquer, puis modifier la règle dupliquée. Pour modifier une règle par défaut, cliquez sur **Edit** et faites défiler la page de configuration de la règle vers le bas. Cliquez sur **Clone**, puis modifiez la règle.
- La duplication d'une règle vous permet notamment d'apporter de légères modifications à ses paramètres afin de modifier la détection. Par exemple, vous pouvez dupliquer une règle de détection de logs en remplaçant son paramètre **Threshold** par **Anomaly**, afin d'ajouter une nouvelle dimension à la détection des menaces tout en conservant les mêmes requêtes et déclencheurs.
- L'option Delete est **uniquement** disponible pour les règles personnalisées. Il n'est pas possible de supprimer une règle prête à l'emploi, car elles sont intégrées nativement à la plateforme. Pour supprimer de façon définitive une règle personnalisée, cliquez sur **Delete**. Pour désactiver une règle prête à l'emploi, cliquez sur le bouton de désactivation.
- Cliquez sur **View generated signals** pour accéder au [Signals Explorer][6] et définir une requête basée sur l'ID d'une règle. Celle fonctionnalité est particulièrement utile pour mettre en corrélation des signaux avec différentes sources en fonction d'une règle spécifique, ou encore pour procéder à l'audit de plusieurs règles.

#### Limite les modifications des règles

Par défaut, tous les utilisateurs ont accès à l'ensemble des paramètres des règles de sécurité.

Utilisez les contrôles d'accès granulaires pour limiter les [rôles][10] capables de modifier une règle :
1. Cliquez sur les trois points en regard de la règle.
1. Sélectionnez **Permissions**.
1. Cliquez sur **Restrict Access**.
1. La boîte de dialogue affiche alors les membres de votre organisation disposant de l'autorisation **Viewer** par défaut.
1. Depuis la liste déroulante, sélectionnez les rôles, équipes (bêta) ou utilisateurs (bêta) autorisés à modifier la règle de sécurité.
1. Cliquez sur **Add**.
1. La boîte de dialogue indique alors que le rôle sélectionné possède l'autorisation **Editor**.
1. Cliquez sur **Save**.
**Remarque** : afin de toujours pouvoir modifier la règle, vous devez inclure au moins un de vos rôles avant d'enregistrer vos modifications.

Pour rétablir les autorisations globales d'une règle restreinte, procédez comme suit :
1. Cliquez sur les trois points à droite de la règle.
1. Sélectionnez **Permissions**.
1. Cliquez sur **Restore Full Access**.
1. Cliquez sur **Save**.

## Obsolescence des règles

Toutes les règles de détection font régulièrement l'objet de contrôles, afin de garantir la pertinence de leurs signaux. Lorsqu'une règle est considérée comme obsolète, elle est remplacée par une nouvelle version.

Le processus d'obsolescence des règles suit les étapes suivantes : 

1. Un avertissement avec la date d'obsolescence est ajouté à la règle. Cet avertissement s'affiche à différents endroits de l'interface :
    - Dans la section **Rule Details > Playbook** du volet latéral des signaux
    - Dans le volet latéral des findings (CSM Misconfigurations uniquement)
    - Dans l'[éditeur de règle](#options-relatives-aux-regles-et-aux-signaux-generes) de la règle en question
2. Une fois la règle obsolète, elle reste disponible pendant 15 mois avant d'être supprimée, car les signaux sont conservés pendant 15 mois. Durant cette période, vous pouvez réactiver la règle en [la dupliquant](#options-relatives-aux-regles-et-aux-signaux-generes) dans l'interface.
3. Après que la règle a été supprimée, vous ne pouvez plus la dupliquer ni la réactiver.

## Pour aller plus loin
{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/security/default_rules/
[2]: /fr/security/cloud_siem/
[3]: /fr/security/cloud_siem/log_detection_rules/
[4]: /fr/security/cspm/
[5]: /fr/security/cloud_workload_security/
[6]: /fr/security/application_security/
[7]: /fr/tracing/
[8]: /fr/agent/
[9]: https://app.datadoghq.com/security/configuration/rules
[10]: /fr/account_management/rbac/