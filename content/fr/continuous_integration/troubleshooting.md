---
further_reading:
- link: /continuous_integration/tests
  tag: Documentation
  text: Découvrir comment surveiller vos tests CI
- link: /continuous_integration/pipelines
  tag: Documentation
  text: Découvrir comment surveiller vos pipelines CI
- link: /continuous_integration/intelligent_test_runner
  tag: Documentation
  text: En savoir plus sur la fonctionnalité Intelligent Test Runner
title: Dépannage de CI Visibility
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">La solution CI Visibility n'est pas encore disponible pour le site que vous avez sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

## Présentation

Le contenu de cette page vous aide à résoudre les problèmes que vous pouvez rencontrer avec CI Visibility. Contactez [l'assistance Datadog][2] si vous avez besoin d'aide supplémentaire.

## Votre instance Jenkins est instrumentée, mais Datadog n'affiche aucune donnée

1. Vérifiez que l'exécution d'au moins un pipeline est terminée. Les informations sur l'exécution des pipelines sont uniquement envoyées une fois le processus terminé.
2. Vérifiez que le host de l'Agent Datadog est correctement configuré et que le plug-in Datadog parvient à communiquer avec lui. Pour tester la connectivité, cliquez sur le bouton **Check connectivity with the Datadog Agent** dans l'interface de la configuration du plug-in Jenkins.
3. Recherchez d'éventuelles erreurs dans les logs Jenkins. Vous pouvez activer des logs de debugging pour le plug-in Datadog en [créant un fichier `logging.properties`][1] et en ajoutant la ligne `org.datadog.level = ALL`.

## Message « Pipeline not found »

Pour les [fournisseurs CI qui ne prennent pas en charge les pipelines `running`][15], le message « Pipeline not found » s'affiche lorsque vous cliquez sur des données incomplètes provenant d'un pipeline en cours d'exécution. Les données sont transmises au fur et à mesure pour les étapes, tâches ou commandes personnalisées. Patientez jusqu'à la fin de l'exécution du pipeline, puis réessayez.

## Pipelines manquants sur la page Pipelines

La page Pipelines affiche uniquement les pipelines sans informations Git ainsi que les pipelines dont les informations Git relèvent de la branche par défaut du référentiel Git.

## Étapes ou tâches manquantes dans les tableaux récapitulatifs

S'il manque des étapes ou des tâches sur la page _Pipeline Details_, cela peut être causé par un problème de configuration. Vérifiez que le nom du pipeline qui est stocké dans les exécutions d'étape ou de tâche est **identique** au nom du pipeline parent. Si vous utilisez des pipelines personnalisés, consultez la [spécification de l'endpoint d'API public][15].

### Limites s'appliquant aux pipelines en cours d'exécution

#### Envoi des événements de webhook non garanti par les fournisseurs CI

La prise en charge des pipelines en cours d'exécution repose sur les données sur le statut d'exécution envoyées par les fournisseurs CI. Si ces données ne sont pas disponibles, les exécutions de type `Running` dans Datadog sont peut-être déjà terminées.

#### Durée d'exécution maximale d'un pipeline

L'exécution d'un pipeline peut conserver le statut `Running` pendant une durée maximale de trois jours. Passé ce délai, l'exécution du pipeline ne s'affiche plus dans CI Visibility. Si une exécution de pipeline se termine après trois jours, elle est affichée dans CI Visibility avec le statut final pertinent (`Success`, `Error`, `Canceled` ou `Skipped`) et la bonne durée.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.jenkins.io/doc/book/system-administration/viewing-logs/
[2]: /fr/help/
[3]: /fr/continuous_integration/tests/
[4]: https://app.datadoghq.com/ci/test-runs
[5]: https://app.datadoghq.com/ci/test-services
[6]: /fr/tracing/troubleshooting/tracer_debug_logs
[7]: /fr/continuous_integration/tests/containers/
[8]: /fr/continuous_integration/tests/junit_upload/?tabs=linux#collecting-environment-configuration-metadata
[9]: https://app.datadoghq.com/ci/settings/repository
[10]: /fr/continuous_integration/intelligent_test_runner/
[11]: https://developer.harness.io/kb/continuous-integration/articles/using_git_credentials_from_codebase_connector_in_ci_pipelines_run_step/
[12]: https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork#syncing-a-fork-branch-from-the-web-ui
[13]: /fr/api/latest/ci-visibility-pipelines/#send-pipeline-event
[14]: /fr/continuous_integration/tests/#supported-features
[15]: /fr/continuous_integration/pipelines/#supported-features