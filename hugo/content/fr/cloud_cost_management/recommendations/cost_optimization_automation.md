---
description: Configurez des automatisations qui agissent en continu sur les recommandations
  de coûts Cloud pour nettoyer les ressources Cloud inutilisées ou gaspillleuses selon
  un calendrier récurrent.
further_reading:
- link: /cloud_cost_management/
  tag: Documentation
  text: Cloud Cost Management
- link: /cloud_cost_management/recommendations/
  tag: Documentation
  text: Cloud Cost Recommendations
- link: /service_management/workflows/
  tag: Documentation
  text: Workflow Automation
title: Cost Optimization Automation
---
## Aperçu {#overview}

Cost Optimization Automation vous permet d'agir en continu sur [Cloud Cost Recommendations][1] sans nettoyage manuel. Vous définissez une **automatisation**, vous lui assignez le périmètre des comptes, régions et ressources souhaités, et Datadog exécute l'action recommandée selon un calendrier récurrent. Chaque exécution peut nécessiter une approbation humaine dans Slack ou Microsoft Teams avant que Datadog n'apporte des modifications, de sorte que votre équipe reste en contrôle de chaque changement.

Chaque automatisation cible un type de recommandation unique et comprend les éléments suivants :

- Un calendrier (hebdomadaire, bimensuel, tous les 30 jours ou tous les 90 jours)
- Un périmètre (compte AWS, région, étiquettes et un nombre maximum de ressources par exécution)
- Des mesures de protection spécifiques au type de recommandation (par exemple, un instantané avant suppression)
- Une étape d'approbation humaine optionnelle routée via Slack ou Microsoft Teams

Les recommandations traitées par une automatisation passent à {{< ui >}}Completed{{< /ui >}} automatiquement et contribuent aux économies réalisées sur la page [Cloud Cost Recommendations][1].

Cost Optimization Automation est différente des actions d'automatisation de flux de travail en un clic décrites dans [Recommendation action-taking][2]. Les actions en un clic exécutent un changement unique à la demande depuis le panneau latéral des recommandations. Les automatisations s'exécutent selon un calendrier récurrent et agissent sur chaque ressource correspondante dans le périmètre.

**Remarque** : Cost Optimization Automation utilise Datadog Workflows et entraîne des coûts supplémentaires. Pour des informations détaillées sur les prix, consultez la [Workflow Automation pricing page][3].

## Types de recommandations pris en charge {#supported-recommendation-types}

Cost Optimization Automation prend en charge les types de recommandations AWS suivants :

| Type de recommandation | Mesures de sécurité intégrées |
|---------------------|---------------------|
| Terminer le volume EBS non attaché | Un instantané EBS est pris avant que chaque volume ne soit supprimé. |
| Transitionner les objets S3 Standard vers Amazon S3 Intelligent-Tiering | Récupérable. La configuration du cycle de vie peut être supprimée à tout moment. |
| Terminer l'instance RDS inutilisée | Un instantané final RDS est pris avant que chaque instance ne soit terminée. |
| Supprimer les sauvegardes supplémentaires à la demande (DynamoDB) | Les deux sauvegardes les plus récentes sont conservées à chaque exécution. |
| Définir la politique de rétention des journaux CloudWatch | Récupérable. La période de rétention peut être ajustée ou supprimée à tout moment. |
| Supprimer les anciens instantanés EBS | Les instantanés référencés par un AMI sont ignorés. |

## Conditions préalables {#prerequisites}

- Un compte AWS configuré avec [Recommandations de coûts Cloud][4] et générant activement des recommandations.
- The **Cloud Cost Management - Cloud Cost Management Write** permission pour créer ou modifier une automatisation.
- Une [Workflow Automation connection][5] à chaque compte AWS sur lequel vous souhaitez qu'une automatisation agisse. Datadog utilise cette connexion pour assumer un rôle IAM avec les permissions d'écriture nécessaires pour l'action recommandée. Datadog accorde uniquement les permissions requises pour le type de recommandation sélectionné.
- (Optionnel) Une connexion Slack ou Microsoft Teams si vous souhaitez que les messages d'approbation soient acheminés vers un canal.

## Configurez une automatisation {#set-up-an-automation}

Pour configurer une automatisation sur un calendrier récurrent pour un type de recommandation :

1. Naviguer vers [{{< ui >}}Cloud Cost{{< /ui >}} > {{< ui >}}Optimize{{< /ui >}} > {{< ui >}}Automations{{< /ui >}}][6].
1. Sur le côté gauche de la page, sélectionnez le type de recommandation.
1. Cliquez sur **Créer une nouvelle automatisation**.
1. Dans le menu déroulant {{< ui >}}AWS Connection{{< /ui >}}, sélectionnez ou créez une [Workflow Automation connection][7]. Pour agir sur plusieurs comptes avec une seule automatisation, sélectionnez ou créez un [connection group][8].
1. Dans la section {{< ui >}}Define scope{{< /ui >}} :
    1. Entrez des tags pour restreindre l'automatisation aux ressources correspondant à ces tags, tels que `env`, `service` et `team`.
    1. Entrez le nombre maximum de ressources par exécution pour limiter le nombre de ressources sur lesquelles l'automatisation agit lors d'une seule exécution. L'automatisation priorise les ressources par les économies potentielles les plus élevées.
1. Dans la section {{< ui >}}Set schedule{{< /ui >}}, sélectionnez la fréquence d'automatisation et l'heure d'exécution.
1. (Optionnel) Activez le {{< ui >}}Require approval before execution{{< /ui >}} interrupteur pour exiger une révision humaine avant l'exécution. Si activé, sélectionnez {{< ui >}}Slack{{< /ui >}} ou {{< ui >}}Microsoft Teams{{< /ui >}}, et remplissez les champs de notification de canal. Voir [Mesures de sécurité](#safeguards).
1. Entrez un nom pour l'automatisation.
1. Cliquez sur {{< ui >}}Save Policy{{< /ui >}}.

### Mesures de sécurité {#safeguards}

Chaque type de recommandation a des mesures de sécurité intégrées. Par exemple, l'automatisation **Terminate Unattached EBS Volume** prend un instantané EBS avant de supprimer chaque volume. Examinez les mesures de sécurité énumérées dans le formulaire d'automatisation et activez celles qui sont optionnelles pour votre environnement.

Si {{< ui >}}Require approval before execution{{< /ui >}} est activé dans la [configuration de l'automatisation](#set-up-an-automation), Datadog publie dans le canal désigné un résumé des ressources ciblées à chaque exécution. L'automatisation ne s'exécute qu'après qu'un utilisateur approuve la demande dans le canal.

## Gérer les automatisations {#manage-automations}

La {{< ui >}}Automations{{< /ui >}} page répertorie chaque automatisation dans votre organisation, regroupée par type de recommandation. Depuis cette page, vous pouvez :

- Mettre en pause ou reprendre une automatisation
- Modifier la portée, le calendrier ou les mesures de sécurité d'une automatisation
- Renommer une automatisation
- Supprimer une automatisation

## Historique des exécutions {#execution-history}

Ouvrez une automatisation et sélectionnez l'onglet {{< ui >}}Activity{{< /ui >}} pour voir les exécutions passées et à venir. Chaque enregistrement d'exécution comprend :

- Heure d'exécution et statut (succès, échec ou en attente d'approbation)
- Les ressources sur lesquelles il a été agi
- Économies estimées réalisées par l'exécution
- Un lien vers l'exécution de l'automatisation de flux de travail sous-jacente

Utilisez les filtres en haut de la vue {{< ui >}}Activity{{< /ui >}} pour trouver des exécutions par statut, type de recommandation ou plage de dates.

## Historique des versions {#version-history}

Datadog enregistre une nouvelle version d'une automatisation chaque fois qu'elle est créée, modifiée, activée, désactivée ou supprimée. Ouvrez une automatisation et sélectionnez l'onglet {{< ui >}}History{{< /ui >}} pour voir qui a effectué chaque changement et ce qui a changé. Utilisez cette vue pour auditer les changements ou revenir à une version précédente.

## Statut de la recommandation {#recommendation-status}

Lorsqu'une automatisation agit avec succès sur une ressource, la recommandation correspondante passe à {{< ui >}}Completed{{< /ui >}} et est étiquetée comme complétée par l'automatisation. Ses économies comptent pour les totaux d'économies réalisées sur la page [Cloud Cost Recommendations][1].

Si vous définissez une recommandation à {{< ui >}}Dismissed{{< /ui >}}, les automatisations l'ignorent lors des prochaines exécutions jusqu'à ce que le rejet expire.

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/cloud_cost_management/recommendations/
[2]: /fr/cloud_cost_management/recommendations/#recommendation-action-taking
[3]: https://www.datadoghq.com/pricing/?product=workflow-automation#products
[4]: /fr/cloud_cost_management/recommendations/#prerequisites
[5]: /fr/service_management/workflows/connections/
[6]: https://app.datadoghq.com/cost/optimize/automations
[7]: /fr/actions/connections/
[8]: /fr/service_management/workflows/connections/#connection-groups