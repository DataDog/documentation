---
description: Configurez des automatisations qui agissent en continu sur les recommandations
  de Cloud Cost pour nettoyer les ressources cloud inutilisées ou inutiles selon un
  planning récurrent.
further_reading:
- link: /cloud_cost_management/
  tag: Documentation
  text: Cloud Cost Management
- link: /cloud_cost_management/recommendations/
  tag: Documentation
  text: Cloud Cost Recommendations
- link: /cloud_cost_management/recommendations/notifications/
  tag: Documentation
  text: Notifications
- link: /actions/workflows/
  tag: Documentation
  text: Workflow Automation
title: Automatisations d'optimisation des coûts
---
## Présentation {#overview}

Les automatisations d'optimisation des coûts vous permettent d'agir en continu sur les [Cloud Cost Recommendations][1] sans nettoyage manuel. Dans la page {{< ui >}}Automations{{< /ui >}}, elles se trouvent sous l'onglet {{< ui >}}Remediation{{< /ui >}}. Vous définissez une **automatisation**, vous en délimitez le périmètre aux comptes, régions et ressources souhaités, et Datadog exécute l'action recommandée selon un planning récurrent. Chaque exécution peut nécessiter une approbation humaine dans Slack ou Microsoft Teams avant que Datadog n'effectue des modifications, afin que votre équipe garde le contrôle sur chaque changement.

Chaque automatisation cible un seul type de recommandation et inclut les éléments suivants :

- Un planning (hebdomadaire, toutes les deux semaines, tous les 30 jours ou tous les 90 jours)
- Un périmètre (compte, région, tags et un nombre maximal de ressources par exécution)
- Des garanties spécifiques au type de recommandation (par exemple, un instantané avant la suppression)
- Une étape d'approbation humaine facultative acheminée via Slack ou Microsoft Teams

Les recommandations traitées par une automatisation sont automatiquement déplacées vers {{< ui >}}Completed{{< /ui >}} et contribuent aux économies réalisées sur la page [Cloud Cost Recommendations][1].

Les automatisations sont différentes des actions Workflow Automation en 1 clic décrites dans [Prise d'action sur les recommandations][2]. Les actions en 1 clic exécutent une modification unique à la demande depuis le panneau latéral des recommandations. Les automatisations s'exécutent selon un planning récurrent et agissent sur chaque ressource correspondante dans le périmètre.

Les automatisations sont également différentes des [Notifications][8], qui envoient un résumé récurrent des recommandations correspondantes sur Slack ou Microsoft Teams mais n'effectuent aucune action.

**Remarque** : Les automatisations utilisent les workflows Datadog et entraînent des coûts supplémentaires. Pour des informations détaillées sur la tarification, consultez la [page de tarification de Workflow Automation][3].

## Types de recommandations pris en charge {#supported-recommendation-types}

L'onglet {{< ui >}}Remediation{{< /ui >}} prend en charge les types de recommandations suivants :

| Fournisseur | Type de recommandation | Garanties intégrées |
|----------|---------------------|---------------------|
| AWS | Supprimer le volume EBS non attaché | (Facultatif) Effectue un instantané EBS avant la suppression de chaque volume. |
| AWS | Migrer le volume EBS de gp2 vers gp3 | Réversible. La migration n'entraîne aucune perte de données. |
| AWS | Supprimer les instantanés EBS inutilisés | Les instantanés référencés par une AMI sont ignorés. |
| AWS | Supprimer les sauvegardes à la demande supplémentaires (DynamoDB) | Les deux sauvegardes les plus récentes sont conservées à chaque exécution. |
| AWS | Migrer la table DynamoDB vers la classe de table Infrequent Access | Réversible. La classe de table peut être modifiée à tout moment. |
| AWS | Supprimer la table DynamoDB inutilisée | Une sauvegarde est effectuée avant la suppression de chaque table. |
| AWS | Définir la politique de rétention des logs CloudWatch | Réversible. La période de rétention peut être ajustée ou supprimée à tout moment. |
| AWS | Supprimer l'instance RDS inutilisée | Un instantané RDS final est effectué avant la suppression de chaque instance. |
| AWS | Supprimer la passerelle NAT inutilisée | Aucun. La suppression est irréversible. |
| AWS | Transférer les objets S3 Standard vers Amazon S3 Intelligent-Tiering | Réversible. Les règles de cycle de vie existantes sont conservées et la règle ajoutée peut être supprimée à tout moment. |
| AWS | Supprimer l'instance EC2 inutilisée | (Facultatif) Crée une AMI avant la suppression de chaque instance. |
| AWS | Supprimer le cluster Redshift inutilisé | Un instantané final est effectué avant la suppression de chaque cluster. |
| GCP | Supprimer le disque Compute Engine non attaché | (Facultatif) Effectue un instantané avant la suppression de chaque disque. |
| GCP | Activer Autoclass sur un bucket Cloud Storage | Réversible. Autoclass peut être désactivé à tout moment. |
| Azure | Supprimer le disque géré non attaché | (Facultatif) Effectue un instantané avant la suppression de chaque disque. |
| Azure | Supprimer la base de données SQL inutilisée | Aucun. La suppression est irréversible. |

Les mesures de protection marquées (Facultatif) sont activées par défaut et peuvent être désactivées dans le formulaire d'automatisation. Toutes les autres mesures de protection listées sont toujours appliquées et ne peuvent pas être désactivées.

## Prérequis {#prerequisites}

- Un compte AWS, GCP ou Azure configuré avec [Cloud Cost Recommendations][4] et générant activement des recommandations.
- L'autorisation **Cloud Cost Management - Cloud Cost Management Write** pour accéder à la page {{< ui >}}Automations{{< /ui >}}, et l'autorisation **App Builder & Workflow Automation - Workflows Write** pour créer ou modifier une automatisation.
- Une connexion à chaque compte sur lequel vous souhaitez qu'une automatisation agisse, configurée à partir de {{< ui >}}Manage Connections{{< /ui >}} sur la page {{< ui >}}Automations{{< /ui >}}. Datadog utilise cette connexion pour assumer un rôle avec les autorisations d'écriture nécessaires pour l'action recommandée, et n'accorde que les autorisations requises pour le type de recommandation sélectionné. Pour agir sur plusieurs comptes avec une seule automatisation, créez un [groupe de connexion][7].
- (Facultatif) Une connexion Slack ou Microsoft Teams si vous souhaitez que les messages d'approbation soient acheminés vers un canal.

## Configurer une automatisation {#set-up-an-automation}

Pour configurer une automatisation selon un planning récurrent pour un type de recommandation :

1. Accédez à [{{< ui >}}Cloud Cost{{< /ui >}} > {{< ui >}}Optimize{{< /ui >}} > {{< ui >}}Automations{{< /ui >}}][6].
1. Sélectionnez l'onglet {{< ui >}}Remediation{{< /ui >}}.
1. Sur le côté gauche de la page, sélectionnez le type de recommandation.
1. Cliquez sur {{< ui >}}Create New Automation{{< /ui >}}.
1. Dans le menu déroulant {{< ui >}}Connection{{< /ui >}}, sélectionnez une connexion ou un groupe de connexions configuré dans [{{< ui >}}Manage Connections{{< /ui >}}][5].
1. Dans la section {{< ui >}}Define scope{{< /ui >}} :
    1. Saisissez des tags pour limiter l'automatisation aux ressources correspondant à ces tags, tels que `env`, `service` et `team`.
    1. Saisissez le nombre maximal de ressources par exécution pour limiter le nombre de ressources sur lesquelles l'automatisation agit lors d'une seule exécution. L'automatisation hiérarchise les ressources en fonction des économies potentielles les plus élevées.
1. Dans la section {{< ui >}}Set schedule{{< /ui >}}, sélectionnez la fréquence d'automatisation et l'heure d'exécution.
1. (Facultatif) Activez le bouton {{< ui >}}Require approval before execution{{< /ui >}} pour exiger une intervention humaine avant l'exécution. Si cette option est activée, sélectionnez {{< ui >}}Slack{{< /ui >}} ou {{< ui >}}Microsoft Teams{{< /ui >}} et remplissez les champs de notification du canal. Voir [Mesures de protection](#safeguards).
1. Saisissez un nom pour l'automatisation.
1. Cliquez sur {{< ui >}}Save Automation{{< /ui >}}.

### Mesures de protection {#safeguards}

Chaque type de recommandation dispose de mesures de protection intégrées. Par exemple, l'automatisation **Supprimer un volume EBS non attaché** peut effectuer un instantané EBS avant de supprimer chaque volume. Consultez [Types de recommandations pris en charge](#supported-recommendation-types) pour obtenir la liste complète des mesures de protection par type de recommandation.

Si {{< ui >}}Require approval before execution{{< /ui >}} est activé dans la [configuration de l'automatisation](#set-up-an-automation), Datadog publie dans le canal désigné un résumé des ressources ciblées à chaque exécution. L'automatisation ne s'exécute qu'après qu'un utilisateur a approuvé la demande dans le canal.

## Gérer les automatisations {#manage-automations}

L'onglet {{< ui >}}Remediation{{< /ui >}} répertorie toutes les automatisations de votre organisation, regroupées par type de recommandation. Les automatisations sont étiquetées **politiques** dans cette vue. Utilisez les filtres {{< ui >}}Provider{{< /ui >}}, {{< ui >}}Resource Type{{< /ui >}} et {{< ui >}}Recommendation Type{{< /ui >}} en haut de la page pour restreindre la liste. Depuis cette page, vous pouvez :

- Suspendre ou reprendre une automatisation
- Modifier le périmètre, le planning ou les mesures de protection d'une automatisation
- Renommer une automatisation
- Supprimer une automatisation

## Historique d'exécution {#execution-history}

Ouvrez une automatisation et sélectionnez l'onglet {{< ui >}}Activity{{< /ui >}} pour voir les exécutions passées et à venir. Chaque enregistrement d'exécution comprend :

- Heure et statut de l'exécution (succès, échec ou approbation en attente)
- Les ressources sur lesquelles une action a été effectuée
- Économies estimées réalisées par l'exécution
- Un lien vers l'exécution de Workflow Automation sous-jacente

Utilisez les filtres en haut de la vue {{< ui >}}Activity{{< /ui >}} pour trouver les exécutions par statut, type de recommandation ou plage de dates.

## Historique des versions {#version-history}

Datadog enregistre une nouvelle version d'une automatisation à chaque fois qu'elle est créée, modifiée, activée, désactivée ou supprimée. Ouvrez une automatisation et sélectionnez l'onglet {{< ui >}}History{{< /ui >}} pour voir qui a effectué chaque modification et ce qui a été modifié. Utilisez cette vue pour auditer les modifications ou revenir à une version précédente.

## Statut de la recommandation {#recommendation-status}

Lorsqu'une automatisation agit avec succès sur une ressource, la recommandation correspondante passe à {{< ui >}}Completed{{< /ui >}} et est marquée comme terminée par l'automatisation. Ses économies sont comptabilisées dans le total des économies réalisées sur la page [Cloud Cost Recommendations][1].

Si vous attribuez à une recommandation le statut {{< ui >}}Dismissed{{< /ui >}}, les automatisations l'ignorent lors des exécutions futures jusqu'à l'expiration du rejet.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/cloud_cost_management/recommendations/
[2]: /fr/cloud_cost_management/recommendations/#recommendation-action-taking
[3]: https://www.datadoghq.com/pricing/?product=workflow-automation#products
[4]: /fr/cloud_cost_management/recommendations/#prerequisites
[5]: /fr/actions/connections/
[6]: https://app.datadoghq.com/cost/optimize/automations
[7]: /fr/actions/connections/#connection-groups
[8]: /fr/cloud_cost_management/recommendations/notifications/