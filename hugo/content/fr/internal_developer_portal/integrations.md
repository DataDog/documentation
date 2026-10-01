---
aliases:
- /fr/tracing/software_catalog/integrations
- /fr/tracing/service_catalog/integrations
- /fr/service_catalog/integrations
- /fr/software_catalog/integrations
description: Connectez l'Internal Developer Portal avec des outils tiers, notamment
  PagerDuty, Opsgenie, GitHub, Jira et des plateformes CI/CD, pour enrichir les métadonnées
  du catalogue et automatiser les actions.
further_reading:
- link: /internal_developer_portal/catalog/entity_model/
  tag: Documentation
  text: En savoir plus sur l'API de définition de service
- link: /integrations/opsgenie/
  tag: Documentation
  text: En savoir plus sur l'intégration Opsgenie
- link: /integrations/pagerduty/
  tag: Documentation
  text: En savoir plus sur l'intégration PagerDuty
title: Integrations
---
{{% site-region region="gov,gov2" %}}
<div class="alert alert-danger">
Les intégrations PagerDuty et Opsgenie pour l'Internal Developer Portal ne sont pas prises en charge dans le site {{< region-param key=dd_datacenter code="true" >}} .
</div>
{{% /site-region %}}
  
## Présentation {#overview}

Lorsque vous configurez un compte de service pour une [intégration Datadog][1], vous pouvez incorporer des métadonnées provenant de vos intégrations dans les définitions d'entité du [Catalogue][16]. À partir de là, vous pouvez utiliser l'[Action Catalog][31] pour interroger des systèmes externes ou déclencher des actions (telles que la création d'incidents ou la mise à jour de tickets) sans quitter Datadog.

{{< callout url="https://forms.gle/PzXWxrnGaQPiVf9M8" header="Demandez une nouvelle intégration" >}}
{{< /callout >}}

## Collaboration, gestion des incidents et gestion des tickets {#collaboration-incident-management-and-ticketing}

| Intégration | Description | Exemples d'actions (Action Catalog) |
|--------------|----------------|----------------------------------|
| [PagerDuty][2] | Ajoutez des métadonnées PagerDuty à un service afin que le catalogue affiche et renvoie vers des informations telles que la personne d'astreinte et l'existence d'incidents PagerDuty actifs pour le service. | `Get current on-call`, `Trigger incident` <br> [Voir toutes les actions disponibles.][32] |
| [Opsgenie][3] | Ajoutez des métadonnées Opsgenie à un service afin que le catalogue affiche et renvoie vers des informations telles que la personne d'astreinte pour le service. | `Acknowledge alert`, `Get current on call` <br> [Voir toutes les actions disponibles.][33] |
| [StatusPage][4] | Créez, mettez à jour et récupérez des détails sur les incidents et les composants. | `Create an incident`, `Update component status` <br> [Voir toutes les actions disponibles.][34] |
| [Freshservice][5] | Créez, mettez à jour et interrogez des tickets Freshservice. | `List tickets`, `Update ticket` <br> [Voir toutes les actions disponibles.][35] |
| [Slack][6] | Envoyez des alertes ou des mises à jour d'incident vers des canaux Slack et gérez les canaux. | `Invite users to channel`, `Set channel topic` <br> [Voir toutes les actions disponibles.][36] |
| [Microsoft Teams][7] | Envoyez des messages ou des invites vers des canaux Teams pour la collaboration sur les incidents. | `Make a decision`, `Send a message` <br> [Voir toutes les actions disponibles.][37] |
| [Jira][8] | Créez et mettez à jour des problèmes directement depuis Datadog. | `Create issue`, `Add comment` <br> [Voir toutes les actions disponibles.][38] |
| [Asana][9] | Créez et mettez à jour des tâches Asana, assignez des utilisateurs et appliquez des tags. | `Add tag to task`, `Update task completed status` <br> [Voir toutes les actions disponibles.][39] |
| [LaunchDarkly][10] | Suivez les changements de feature flags, permettez aux développeurs d'effectuer des modifications sans quitter la plateforme et pilotez l'automatisation en fonction des changements. | `Add expire user target date`, `Toggle feature flag` <br> [Voir toutes les actions disponibles.][40] |

### Exemples de configuration {#setup-examples}

{{% collapse-content title="PagerDuty" level="h4" expanded=false id="pagerduty-setup" %}}

Vous pouvez connecter n'importe quel service de votre [répertoire de services PagerDuty][63]. Vous pouvez mapper un service PagerDuty à chaque service du catalogue.

1. Si ce n'est pas déjà fait, configurez l'[intégration Datadog PagerDuty][2].
1. Obtenez votre [clé d'accès API PagerDuty][61].
1. Collez la clé sur la page [Configuration de l'intégration PagerDuty][52].

   {{< img src="tracing/software_catalog/pagerduty-token.png" alt="Formulaire de configuration de l'intégration PagerDuty avec le champ de clé d'API mis en évidence." style="width:100%;" >}}

1. Ajoutez les informations PagerDuty à la [définition de l'entité][82] :
   ```
   ...
   integrations:
     pagerduty: https://www.pagerduty.com/service-directory/shopping-cart
   ...
   ```

{{% /collapse-content %}}

{{% collapse-content title="Opsgenie" level="h4" expanded=false id="opsgenie-setup" %}}

Pour ajouter des métadonnées Opsgenie à une définition de l'entité : 

1. Si ce n'est pas déjà fait, configurez l'[intégration Datadog Opsgenie][3].
1. Obtenez votre [clé d'accès API Opsgenie][62] et assurez-vous qu'elle dispose des autorisations **configuration access** et **read**.
3. En bas de la [tuile d'intégration][55], ajoutez un compte, collez votre clé d'accès API Opsgenie et sélectionnez la région correspondant à votre compte Opsgenie.

   {{< img src="tracing/software_catalog/create_account1.png" alt="Workflow Créer un nouveau compte dans la tuile d'intégration Opsgenie" style="width:80%;" >}}
   {{< img src="tracing/software_catalog/create_account2.png" alt="Workflow Créer un nouveau compte dans la tuile d'intégration Opsgenie" style="width:80%;" >}}

4. Mettez à jour la [définition de l'entité][82] avec les métadonnées Opsgenie. Exemple :

   ```yaml
   "integrations": {
     "opsgenie": {
           "service-url": "https://www.opsgenie.com/service/123e4567-x12y-1234-a456-123456789000",
           "region": "US"
     }
   }
   ```

Une fois ces étapes terminées, une zone d'information **On Call** apparaît dans l'onglet **Ownership** pour les services dans le Catalogue.

{{< img src="tracing/software_catalog/oncall_information.png" alt="Zone d'information On Call affichant les informations d'Opsgenie dans le Catalogue" style="width:85%;" >}}

{{% /collapse-content %}}


## Gestion du code source {#source-code-management}

| Intégration | Description | Exemples d'actions (Action Catalog) |
|--------------|----------------|----------------------------------|
| [GitHub][11] | Créez des issues ou des PR, gérez les fichiers du repo et automatisez l'accès des équipes. | `Add labels to pull request`, `Get team membership` <br> [Voir toutes les actions disponibles.][41] |
| [GitLab][12] | Gérez les issues, les demandes de fusion, les branches et les commits. | `Approve merge request`, `Cherry pick commit` <br> [Voir toutes les actions disponibles.][42] |
| Autre (Bitbucket, Azure Repos) | Interagissez avec des plateformes non prises en charge nativement dans le Catalogue Datadog ou l'Action Catalog. | N/A ; utilisez des actions et des requêtes HTTP pour appeler les API de la plateforme |

Vous pouvez également utiliser GitHub pour gérer les définitions d'entités et configurer l'intégration GitHub pour importer automatiquement les définitions dans le Catalogue. En savoir plus sur la [création de définitions d'entités et leur importation depuis GitHub][83].

## CI/CD {#cicd}

| Intégration | Description | Exemples d'actions (Action Catalog) |
|--------------|----------------|----------------------------------|
| [GitHub Actions][11] | Affichez, lancez et coordonnez des workflows CI/CD sur GitHub. | `Get latest workflow run`, `Trigger github actions workflow run` <br> [Voir toutes les actions disponibles.][47] |
| [GitLab Pipelines][12] | Gérez les pipelines de projet GitLab, annulez ou relancez des jobs et interrogez les résultats de pipeline. | `Get latest pipeline`, `Retry jobs in a pipeline` <br> [Voir toutes les actions disponibles.][48] |
| [Jenkins][13] |  Déclenchez et gérez des jobs Jenkins. | `Submit Jenkins job`, `Get Jenkins job status` <br> [Voir toutes les actions disponibles.][43] |
| [CircleCI][14] | Interagissez avec vos pipelines CI. | `Approve workflow job`, `Get job details` <br> [Voir toutes les actions disponibles.][44] |
| [Azure DevOps Pipelines (ADO)][15] | Déclenchez des pipelines et récupérez des données d'exécution — idéal pour lancer des déploiements ou des workflows de QA basés sur l'activité des monitors. | `Get pipeline`, `Run pipeline` <br> [Voir toutes les actions disponibles.][45] |

## CMDB et portails de développeurs internes {#cmdbs-and-internal-developer-portals}


Vous pouvez importer des entités depuis ServiceNow et Backstage dans le Catalogue Datadog. Consultez la documentation suivante pour plus de détails :

- [Importer des entrées depuis ServiceNow][84]
- [Importer des entrées depuis Backstage][85]


## Ressources cloud {#cloud-resources}

Les intégrations d'infrastructure de Datadog et le [Resource Catalog][54] fournissent un inventaire complet des intégrations sur AWS, Azure et GCP. Vous pouvez également tirer parti des plus de 1000 actions de Datadog dans l'[Action Catalog][31] pour créer des visualisations, des actions et des automatisations personnalisées.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/integrations/
[2]: /fr/integrations/pagerduty/
[3]: /fr/integrations/opsgenie
[4]: /fr/integrations/statuspage/
[5]: /fr/integrations/guide/freshservice-tickets-using-webhooks/
[6]: /fr/integrations/slack
[7]: /fr/integrations/microsoft_teams
[8]: /fr/integrations/jira
[9]: /fr/integrations/asana
[10]: /fr/integrations/launchdarkly
[11]: /fr/integrations/github
[12]: /fr/integrations/gitlab
[13]: /fr/integrations/jenkins
[14]: /fr/integrations/circleci
[15]: /fr/integrations/azure_devops/
[16]: /fr/internal_developer_portal/catalog/
[31]: /fr/actions/actions_catalog/
[32]: /fr/actions/actions_catalog/?search=pagerduty
[33]: /fr/actions/actions_catalog/?search=opsgenie
[34]: /fr/actions/actions_catalog/?search=statuspage
[35]: /fr/actions/actions_catalog/?search=freshservice
[36]: /fr/actions/actions_catalog/?search=slack
[37]: /fr/actions/actions_catalog/?search=microsoft+teams
[38]: /fr/actions/actions_catalog/?search=jira
[39]: /fr/actions/actions_catalog/?search=asana
[40]: /fr/actions/actions_catalog/?search=launchdarkly
[41]: /fr/actions/actions_catalog/?search=github
[42]: /fr/actions/actions_catalog/?search=gitlab
[43]: /fr/actions/actions_catalog/?search=jenkins
[44]: /fr/actions/actions_catalog/?search=circleci
[45]: /fr/actions/actions_catalog/?search=azure+devops
[47]: /fr/actions/actions_catalog/?search=github+actions
[48]: /fr/actions/actions_catalog/?search=gitlab+pipelines
[51]: https://app.datadoghq.com/services
[52]: https://app.datadoghq.com/integrations/pagerduty
[53]: https://app.datadoghq.com/integrations/github
[54]: https://app.datadoghq.com/infrastructure/catalog
[55]: https://app.datadoghq.com/integrations/opsgenie
[61]: https://support.pagerduty.com/docs/api-access-keys
[62]: https://support.atlassian.com/opsgenie/docs/api-key-management/
[63]: https://support.pagerduty.com/docs/service-directory
[82]: /fr/internal_developer_portal/catalog/entity_model
[83]: /fr/internal_developer_portal/catalog/set_up/create_entities#github-integration
[84]: /fr/internal_developer_portal/catalog/set_up/import_entities#import-from-servicenow
[85]: /fr/internal_developer_portal/catalog/set_up/import_entities#entities-from-backstage