---
aliases:
- /fr/continuous_integration/setup_pipelines/codefresh
further_reading:
- link: /continuous_integration/pipelines
  tag: Documentation
  text: Explorer les résultats et les performances de l'exécution du pipeline
- link: /continuous_integration/troubleshooting/
  tag: Documentation
  text: Dépannage de CI Visibility
title: Configurer le tracing sur les pipelines Codefresh
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">La solution CI Visibility n'est pas encore disponible pour le site que vous avez sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

## Présentation

[Codefresh][1] est une plateforme dʼintégration et de livraison en continu conçue pour Kubernetes. Elle propose des fonctions d'automatisation qui rationalisent la création, le testing et le déploiement de vos applications. 

Configurez le traçage dans Codefresh pour recueillir des données sur chacune des étapes de vos pipelines, analyser les goulots d'étranglement des performances, résoudre les problèmes opérationnels et surveiller vos flux de déploiement.

### Compatibilité

| Pipeline Visibility | Plateforme | Définition |
|---|---|---|
| [Tentatives partielles][7] | Pipelines partiels | Consultez les exécutions de pipelines faisant lʼobjet de nouvelles tentatives. |
| [Étapes manuelles][8] | Étapes manuelles | Consultez les pipelines déclenchés manuellement. |
| [Paramètres][9] | Des paramètres | Définissez des paramètres personnalisés (par exemple, des [variables Codefresh][6]) lorsqu'un pipeline est déclenché. |
| [Raisons de la défaillance dʼun pipeline][10] | Raisons de la défaillance d'un pipeline | Identifiez les raisons de la défaillance dʼun pipeline en vous basant sur les messages d'erreur. |

## Configurer l'intégration Datadog

Pour activer l'intégration Datadog pour [Codefresh][1] :

1. Accédez à **[Account Settings > Configuration > Integrations][2]** dans Codefresh et cliquez sur **CONFIGURE** sur la ligne Datadog.
2. Cliquez sur **ADD INTEGRATION**.
3. Renseignez les informations suivantes dans le formulaire :
   * **Datadog site** : sélectionnez {{< region-param key="dd_site" code="true" >}} dans la liste déroulante.
   * **Token** : ajoutez votre [clé d'API Datadog][3].
4. Cliquez sur **SAVE** pour enregistrer l'intégration.

## Visualiser des données de pipeline dans Datadog

Les pages [**Liste des pipelines Ci**][4] et [**Exécutions**][5] affichent des données après l'exécution des pipelines.

La page **Liste des pipelines Ci** affiche des données uniquement pour la branche par défaut de chaque référentiel.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://codefresh.io/
[2]: https://g.codefresh.io/account-admin/account-conf/integration/datadog
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: https://app.datadoghq.com/ci/pipelines
[5]: https://app.datadoghq.com/ci/pipeline-executions
[6]: https://codefresh.io/docs/docs/codefresh-yaml/variables/#user-provided-variables
[7]: /fr/glossary/#partial-retry
[8]: /fr/glossary/#manual-step
[9]: /fr/glossary/#parameter
[10]: /fr/glossary/#pipeline-failure