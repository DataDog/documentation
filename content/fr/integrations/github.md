---
categories:
- Source Control
- Collaboration
- Issue Tracking
dependencies: []
description: Associez GitHub à Datadog pour surveiller les commits et les pull requests
  qui affectent les performances de vos services.
doc_link: https://docs.datadoghq.com/integrations/github/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/collect-github-audit-logs-alerts-datadog/
  tag: Blog
  text: Collecter les logs d'audit et les alertes d'analyse GitHub avec Datadog
- link: https://www.datadoghq.com/blog/github-source-code-integration/
  tag: Blog
  text: Utiliser les intégrations GitHub et du code source de Datadog pour simplifier
    le dépannage
- link: https://docs.datadoghq.com/fr/integrations/guide/source-code-integration/
  tag: Documentation
  text: En savoir plus sur l'intégration du code source de Datadog
- link: https://docs.datadoghq.com/fr/tracing/service_catalog/setup/#store-and-edit-service-definitions-in-github
  tag: Documentation
  text: Apprendre à utiliser l'intégration GitHub dans le Service Catalog
- link: https://docs.datadoghq.com/fr/serverless/configuration/?tab=serverlessframework#link-errors-to-your-source-code
  tag: Documentation
  text: Apprendre à utiliser l'intégration GitHub dans le cadre de la surveillance
    sans serveur
git_integration_title: github
has_logo: true
integration_id: github
integration_title: GitHub
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: github
public_title: Intégration GitHub
short_description: Associez GitHub à Datadog.
team: web-integrations
version: '1.0'
---

## Présentation

Configurez l'intégration GitHub pour configurer GitHub Apps et GitHub Actions, sécuriser l'accès à vos référentiels et collecter des données de télémétrie avancées (comme les logs d'audit, les rapports de vulnérabilités, l'analyse des secrets et les statistiques sur les référentiels). 

{{< img src="integrations/github/repo_configuration.png" alt="L'onglet Repository Configuration du carré d'intégration GitHub" popup="true" style="width:100%;">}}

Vous pouvez utiliser l'[intégration du code source][1] de Datadog pour afficher des extraits de code dans vos stack traces, lier des stack traces au code source dans GitHub pour vos [fonctions Lambda][2], afficher les résumés des résultats de test issus des commentaires des pull requests dans [CI Visibility][3], et accéder à de multiples définitions de service dans GitHub depuis le [Service Catalog][4]. 

## Configuration

<div class="alert alert-info">
Suivez ces instructions pour installer GitHub Apps et accorder des autorisations à Datadog. Selon les autorisations accordées, vous pouvez configurer l'intégration du code source, afficher des extraits de code dans les stack traces, consulter les données de télémétrie collectées, comme les logs d'audit, accéder à GitHub Actions dans CI Visibility, et plus encore.
</div>

### Lier un référentiel dans le compte de votre organisation ou votre compte personnel

Si vous êtes administrateur de votre organisation GitHub, vous pouvez configurer GitHub Apps.

1. Dans le [carré d'intégration GitHub][5], accédez à l'onglet **Repo Configuration**.
2. Cliquez sur **Link GitHub Account** pour créer une application GitHub.
3. Dans **Configure**, sélectionnez **Organization** et puis saisissez un nom pour votre organisation, ou sélectionnez **Personal Account**.

   Si vous le souhaitez, indiquez l'URL de votre instance GitHub Enterprise Server (version 2.22 ou ultérieure) et assurez-vous que les serveurs Datadog peuvent se connecter à votre instance Enterprise. Les adresses IP des serveurs sont disponibles dans la section Webhooks des [plages d'IP][6].

4. Dans **Edit Permissions**, activez les autorisations de lecture Datadog pour les problèmes, pull requests et contenus. Vous devez sélectionner au moins une autorisation.
5. Cliquez sur **Create App in GitHub**. Vous êtes alors invité à saisir un nom d'application GitHub dans GitHub.
6. Saisissez un nom d'application GitHub dans le champ correspondant, puis cliquez sur **Create GitHub App**.
7. Dans l'onglet **Configuration**, cliquez sur **Install GitHub App** et **Install & Authorize**.

Votre application GitHub s'affiche dans le carré d'intégration. Pour activer les extraits de code directement dans les stack traces, consultez la section relative à la [configuration de l'intégration du code source][1].

### Notebooks

Si vous avez accordé à votre application GitHub les autorisations de lecture pour les problèmes et les pull requests, les problèmes et pull requests GitHub génèrent automatiquement une fenêtre d'aperçu comportant notamment l'historique des commits, l'auteur et la date dans les [notebooks][7].

{{< img src="integrations/guide/github_apps/notebooks-links-to-git.png" alt="Liens vers Git" style="width:90%;">}}

1. Accédez à **Notebooks** > **New Notebook**.
2. Ajoutez une cellule **Text** et renseignez un problème ou une pull request sur GitHub dans le champ **Edit**. Exemple : `https://github.com/project/repository/pull/#`.
3. Cliquez sur **Done**. L'icône GitHub s'affiche alors à côté du problème ou de la pull request associé(e).
4. Cliquez sur **Connect to Preview** et **Authorize**.
5. Passez le curseur sur le problème ou la pull request associé(e) pour afficher un aperçu descriptif.

### Audit Logs

Les logs d'audit incluent l'ensemble des activités et des événements d'une organisation GitHub. Lors de l'installation d'une application, définissez les autorisations **Organization Administration** de sorte à accorder l'accès en lecture. Cela permet à l'application de commencer à collecter le flux d'audit de GitHub sous forme de logs pour le compte de l'organisation GitHub. 

Pour désactiver la collecte des logs d'audit, recherchez l'organisation correspondante dans l'onglet **Telemetery** du carré d'intégration GitHub, cliquez sur le bouton **Audit Log collection**, puis sur **Update Account**.

Pour en savoir plus sur les logs d'audit, consultez la documentation GitHub relative aux [actions du journal d'audit][8] et à la [configuration du streaming vers Datadog][9].

## Données collectées

### Métriques

L'intégration GitHub collecte les métriques relatives aux alertes d'analyse du code et des secrets. Ces métriques fournissent un aperçu de l'état des alertes de l'organisation en les classant par état, référentiel et type de secret. Elles permettent également d'obtenir des informations à long terme sur les tendances des alertes et leur processus général. 

{{< get-metrics-from-git "github_telemetry" >}}

Pour commencer à collecter ces métriques, sélectionnez les autorisations appropriées pour accorder l'accès en lecture lors de l'installation de l'application. Pour désactiver la collecte des métriques d'analyse du code et des secrets, recherchez l'organisation correspondante dans l'onglet **Telemetery** du carré d'intégration, cliquez sur le bouton des sections concernées, puis sur **Update Account**.

### Événements

<div class="alert alert-info">
Suivez ces instructions pour configurer des webhooks dans GitHub et Datadog, afin de permettre l'affichage des événements dans l'Events Explorer. 
</div>

#### Ajouter un webhook dans GitHub

1. Dans votre projet GitHub, accédez à **Settings** > **Webhooks**.
2. Cliquez sur **Add webhook**.
3. Saisissez l'URL suivante dans le champ **Payload URL** : `https://{{< region-param key="dd_full_site" code="true" >}}/intake/webhook/github?api_key=<CLÉ_API_DATADOG>`. N'oubliez pas de remplacer `<CLÉ_API_DATADOG>` par [votre clé d'API Datadog][10].
4. Sélectionnez `application/json` dans le menu déroulant **Content type**.
5. Si vous le souhaitez, saisissez un secret dans le champ **Secret**.
6. Dans la section **Which events would you like to trigger this webhook?**, cliquez sur **Let me select individual events.** et sélectionnez parmi les options prises en charge suivantes les événements à envoyer à Datadog :

   | Nom de l'événement                   |
   |------------------------------|
   | Pushes                       |
   | Branch or tag creation       |
   | Pull requests                |
   | Issues                       |
   | Issue comments               |
   | Commit comments              |
   | Pull request review comments |
   | Repositories                 |
   | Security and analyses        |
   | Team adds                    |

7. Sélectionnez **Active** pour recevoir les détails de l'événement lorsque le hook est déclenché.
8. Cliquez sur **Add webhook** pour enregistrer le webhook.

#### Ajouter un webhook dans Datadog

1. Dans le [carré d'intégration GitHub][5], accédez à l'onglet **Webhooks**.
2. Indiquez les référentiels et les branches que vous souhaitez surveiller pour chaque référentiel. Pour ajouter tous les référentiels d'un utilisateur ou d'une organisation, utilisez des wildcards (`*`). Vous pouvez également utiliser ces derniers pour les noms des branches. Par exemple, `dev-*` désigne toutes les branches commençant par `dev-`.

   Pour recueillir tous les événements concernant la branche `master` du référentiel GitHub `DataDog/documentation`, vous pouvez saisir `DataDog/documentation` dans le champ **Repository** et `master` dans le champ **Branches**. 

   Pour recueillir tous les événements concernant **toutes** les branches `master` de l'organisation DataDog, saisissez `DataDog/*` dans le champ **Repository** et `master` dans le champ **Branches**.

3. Cochez les cases **Commits** et **Issues** pour recevoir des alertes pour ces événements.
4. Cliquez sur **Update Configuration** pour enregistrer la configuration du webhook.

Une fois que vous avez ajouté des webhooks dans l'onglet **Webhooks** du carré d'intégration, les événements survenant dans les référentiels GitHub que vous avez indiqués commencent à apparaître dans l'[Events Explorer][11]. Pour en savoir plus, consultez la [documentation relative à l'Events Explorer][12].

Pour filtrer les événements provenant de GitHub, sélectionnez **Github** dans le menu des facettes **Source** sous **Core**, ou saisissez `source:github` dans la requête de recherche. Le graphique à barres des événements s'actualise automatiquement à mesure que vous modifiez la requête de recherche. 

### Checks de service

L'intégration GitHub n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][13].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/fr/integrations/guide/source-code-integration/
[2]: https://docs.datadoghq.com/fr/serverless/configuration/?tab=serverlessframework#link-errors-to-your-source-code
[3]: https://docs.datadoghq.com/fr/continuous_integration/guides/pull_request_comments/
[4]: https://docs.datadoghq.com/fr/tracing/service_catalog/setup/#store-and-edit-service-definitions-in-github
[5]: https://app.datadoghq.com/integrations/github/
[6]: https://docs.datadoghq.com/fr/api/latest/ip-ranges/
[7]: https://app.datadoghq.com/notebook
[8]: https://docs.github.com/en/organizations/keeping-your-organization-secure/managing-security-settings-for-your-organization/reviewing-the-audit-log-for-your-organization#audit-log-actions
[9]: https://docs.github.com/en/enterprise-cloud@latest/admin/monitoring-activity-in-your-enterprise/reviewing-audit-logs-for-your-enterprise/streaming-the-audit-log-for-your-enterprise#setting-up-streaming-to-datadog
[10]: https://app.datadoghq.com/organization-settings/api-keys
[11]: https://app.datadoghq.com/event/explorer/
[12]: https://docs.datadoghq.com/fr/events/explorer/
[13]: https://docs.datadoghq.com/fr/help/