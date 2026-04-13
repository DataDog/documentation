---
aliases:
- /fr/synthetics/cicd_integrations/troubleshooting
description: Découvrez les concepts Continuous Testing et CI/CD et comment résoudre
  les erreurs courantes.
further_reading:
- link: /synthetics/cicd_integrations/configuration
  tag: Documentation
  text: Découvrir comment configurer Continuous Testing et CI/CD
- link: https://www.datadoghq.com/blog/best-practices-datadog-continuous-testing/
  tag: GitHub
  text: Conseils à suivre pour effectuer des tests continus avec Datadog
title: Dépannage de Continuous Testing et CI/CD
---

## Présentation

Cette page fournit des informations pour vous aider à résoudre les problèmes liés à Continuous Testing et CI/CD. Si vous avez besoin d'aide supplémentaire, contactez l'[assistance Datadog][1].

## Termes

Batch CI 
: Le groupe de tests Continuous Testing déclenchés via un pipeline d'intégration continue ou de livraison continue (CI/CD) ou l'[API Datadog Synthetic Monitoring][2].

Exécution de test
: Une seule exécution d'un test Continuous Testing, qui peut être un [test API][7] ou un [test Browser][8]. Si vous avez configuré de nouvelles tentatives, elles comptent comme des exécutions de tests individuelles. Par exemple, un test avec deux nouvelles tentatives peut avoir jusqu'à trois exécutions de tests associées.

Test parallèle
: Un test Continuous Testing qui s'exécute en même temps qu'un autre test Continuous Testing dans votre pipeline CI/CD. Pour définir le nombre de tests que vous souhaitez exécuter en parallèle, configurez la parallélisation sur la [page des paramètres Continuous Testing][9].

Délai d'expiration du batch
: Un délai d'expiration du batch se produit lorsque votre batch ne se termine pas dans un délai raisonnable en fonction du [délai d'expiration d'interrogation][3] défini dans votre fichier de configuration.

Règle d'exécution
: Une [règle d'exécution][4] définit l'impact d'un échec de test sur un pipeline CI/CD, du plus impactant au moins impactant : `skipped`, `non_blocking` et `blocking`. Ces options sont pondérées et utilisent par défaut l'option la plus impactante. Si votre test est configuré comme `skipped` dans l'interface et `blocking` dans le fichier de configuration, il est ignoré lors de l'exécution du test. </br><br> Vous pouvez définir la règle d'exécution dans les propriétés de vos tests, le fichier de configuration global ou le fichier de remplacement d'un test individuel.

## Explorateur de résultats

### Les métadonnées CI n'apparaissent pas

Vérifiez si vous utilisez des endpoints d'API pour déclencher vos exécutions de tests CI/CD. Afin de remplir l'Explorateur de surveillance Synthetic et de tests en continu avec les métadonnées CI, vous devez utiliser l'une des [intégrations natives][5] de Datadog ou le [package NPM][6].

## Dans votre pipeline CI/CD

### Mes tests expirent dans mon pipeline CI

La première chose à vérifier est les flags de mode d'échec que vous transmettez dans votre [fichier de configuration global][3]. Pour les exécutions CI qui contiennent plusieurs tests, certains tests sont mis en file d'attente en fonction du paramètre de parallélisation défini sur la [page des paramètres Continuous Testing][9]. Vous devrez peut-être adapter à la fois votre configuration et votre parallélisation en fonction des besoins de votre organisation.

## Monitors Synthetic

La CI ne déclenche pas de monitors Synthetic et ne les intègre pas dans les évaluations de monitors ; cependant, les exécutions ayant échoué entraîneront l'affichage d'un statut rouge dans la CI.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/help/
[2]: /fr/api/latest/synthetics/#trigger-tests-from-cicd-pipelines
[3]: /fr/continuous_testing/cicd_integrations/configuration/?tab=npm#global-configuration-file-options
[4]: /fr/continuous_testing/cicd_integrations/configuration/?tab=npm#test-files
[5]: /fr/continuous_testing/cicd_integrations
[6]: /fr/continuous_testing/cicd_integrations#use-the-cli
[7]: /fr/synthetics/api_tests/
[8]: /fr/synthetics/browser_tests/?tab=requestoptions
[9]: /fr/continuous_testing/settings