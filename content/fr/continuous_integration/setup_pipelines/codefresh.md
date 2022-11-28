---
further_reading:
- link: /continuous_integration/explore_pipelines
  tag: Documentation
  text: Explorer les résultats et les performances de l'exécution du pipeline
- link: /continuous_integration/troubleshooting/
  tag: Documentation
  text: Dépannage CI
kind: documentation
title: Configurer le tracing sur les pipelines Codefresh
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">À l'heure actuelle, la solution CI Visibility n'est pas disponible pour le site que vous avez sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

## Configurer l'intégration Datadog

Voici la marche à suivre pour activer l'intégration Datadog pour [Codefresh][1] :

1. Accédez à **[Account Settings > Configuration > Integrations][2]** dans Codefresh et cliquez sur **CONFIGURE** sur la ligne Datadog.
2. Cliquez sur **ADD INTEGRATION**.
3. Renseignez les informations suivantes dans le formulaire :
   * **Datadog site** : sélectionnez {{< region-param key="dd_site" code="true" >}} dans la liste déroulante.
   * **Token** : ajoutez votre [clé d'API Datadog][3].
4. Cliquez sur **SAVE** pour enregistrer l'intégration.

## Visualiser des données de pipeline dans Datadog

Les pages [Pipelines][4] et [Pipeline Executions][5] affichent des données après l'exécution des pipelines.

**Remarque** : la page Pipelines affiche des données uniquement pour la branche par défaut de chaque référentiel.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://codefresh.io/
[2]: https://g.codefresh.io/account-admin/account-conf/integration/datadog
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: https://app.datadoghq.com/ci/pipelines
[5]: https://app.datadoghq.com/ci/pipeline-executions