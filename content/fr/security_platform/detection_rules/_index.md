---
title: Règles de sécurité
kind: documentation
aliases:
  - /fr/security_monitoring/detection_rules/
further_reading:
  - link: security_monitoring/default_rules
    tag: Documentation
    text: Explorer les règles de sécurité par défaut
  - link: https://www.datadoghq.com/blog/detect-abuse-of-functionality-with-datadog/
    tag: Blog
    text: Détection des abus de fonctionnalité avec Datadog
---
## Présentation

Les règles de détection définissent la logique conditionnelle appliquée à l'ensemble des logs ingérés et des configurations du cloud. Lorsqu'un scénario d'une règle se réalise lors d'une période donnée, Datadog génère un signal de sécurité.

{{< img src="security_platform/security_monitoring/detection_rules/detection_rules.png" alt="Règles de détection" width="75%">}}

Chaque option de surveillance inclut des [règles de détection par défaut][1]. Il vous suffit de configurer une intégration pour pouvoir les utiliser.

- La solution [Security Monitoring][2] tire profit de la détection des logs pour analyser en temps réel les logs ingérés. Vous pouvez également créer des [règles personnalisées][3] pour répondre aux besoins de votre environnement.

- La solution [Cloud Security Posture Management][4] exploite des règles de configuration de cloud et d'infrastructure pour analyser l'intégrité de votre environnement cloud.

- Avec [Cloud Workload Security][5], l'Agent Datadog surveille activement l'activité système et procède à son évaluation sur la base d'un ensemble de règles.

## Créer et gérer des règles

La page [Security Rules][6] vous permet d'effectuer des recherches sur l'ensemble de vos règles de détection. Vous pouvez ainsi activer, désactiver, modifier, supprimer, dupliquer ou consulter en quelques secondes les signaux générés par l'une de vos règles. Pour créer une règle de [sécurité][3] personnalisée, cliquez sur le bouton **New Rule** dans le coin supérieur droit de la page.

**Remarque** : les règles personnalisées sont uniquement disponibles pour Security Monitoring.

### Isoler des règles

La recherche en texte libre filtre les règles de détection en fonction du texte figurant dans leur nom ou leur requête. Les résultats des requêtes se mettent à jour en temps réel lorsque vous modifiez une requête. Vous n'avez donc pas besoin de cliquer sur le moindre bouton pour lancer la recherche.

#### Filtrer par facette

{{< img src="security_platform/security_monitoring/detection_rules/facets_panel.png" alt="Volet des facettes" width="75%">}}

Utilisez les facettes dans le volet situé à gauche pour restreindre une requête par valeur. Par exemple, si vos règles proviennent de plusieurs sources et que vous avez besoin de dépanner les règles provenant d'une source spécifique, passez le curseur sur la valeur source dans le volet, telle que `cloudtrail` ou `kubernetes`, et cliquez sur **only** pour restreindre la recherche à cette source.

Par défaut, toutes les facettes sont sélectionnées. Pour exclure une facette de la recherche, décochez la case correspondante.

### Tableau des règles

{{< img src="security_platform/security_monitoring/detection_rules/rules_table2.png" alt="Tableau des règles"  >}}

Les règles sont affichées dans le tableau.

Vous pouvez ajouter ou supprimer des colonnes depuis le menu des options.

Les règles sont triées par ordre alphabétique. Vous pouvez inverser leur tri en fonction de leur nom, du nom de leur requête, de leur date de création ou de leur ID.

#### Activation et désactivation d'une règle

Activez ou désactivez une règle à l'aide du bouton d'activation sur la droite.

#### Modification d'une règle

Passez le curseur sur une règle et appuyez sur le bouton **Edit** pour la modifier.

#### Recherche de signaux générés par une règle

Passez le curseur sur une règle et cliquez sur le bouton **View Generated Signals** pour rechercher les signaux qu'elle a générés.

#### Duplication d'une règle

Passez le curseur sur une règle et appuyez sur le bouton **Clone** pour la dupliquer.

#### Suppression d'une règle

Passez le curseur sur une règle et appuyez sur le bouton **Delete** pour la supprimer.

## Pour aller plus loin
{{< partial name="whats-next/whats-next.html" >}}


[1]: /fr/security_platform/default_rules/
[2]: /fr/security_platform/security_monitoring/
[3]: /fr/security_platform/security_monitoring/log_detection_rules/
[4]: /fr/security_platform/cspm/
[5]: /fr/security_platform/cloud_workload_security/
[6]: https://app.datadoghq.com/security/configuration/rules