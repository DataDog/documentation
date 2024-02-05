---
aliases:
- /fr/mobile_testing/mobile_app_tests
description: Découvrez comment commencer à surveiller vos flux commerciaux clés grâce
  aux tests d'application mobile.
further_reading:
- link: /mobile_app_testing/settings
  tag: Documentation
  text: En savoir plus sur les paramètres des tests mobiles
- link: /synthetics/browser_tests
  tag: Documentation
  text: Apprendre à créer des tests Browser Synthetic
- link: https://www.datadoghq.com/blog/test-maintenance-best-practices/
  tag: Blog
  text: Pratiques recommandées pour la gestion de tests de bout en bout
kind: documentation
title: Tests d'application mobile
---

{{< site-region region="us3,us5,gov,eu,ap1" >}}
<div class="alert alert-warning">La solution Mobile Application Testing n'est pas prise en charge pour ce site.</div>
{{< /site-region >}}

{{< site-region region="us" >}}
<div class="alert alert-info">L'accès à la solution Mobile Application Testing est actuellement limité ; elle est disponible uniquement sur le site Datadog US1.</div>
{{< /site-region >}}

## Présentation

La solution Mobile Application Testing vous permet de tester et de surveiller des flux commerciaux clés pour vos applications Android et iOS au moyen d'appareils physiques réels.

Les tests d'application mobile peuvent être exécutés selon un programme, à la demande ou directement dans vos [pipelines de CI/CD][1].

Pour créer des tests d'application mobile dans Datadog, accédez à [**UX Monitoring** > **New Test**][12], puis sélectionnez **Mobile Application Test**.

{{< img src="mobile_app_testing/new_test.png" alt="Créer un test mobile Synthetic" style="width:50%;">}}

### Irrégularité

L'un des points faibles du testing de bout en bout réside dans la fragilité des tests, qui peuvent échouer par moment. En effet, lorsqu'une équipe frontend implémente un changement, il arrive qu'un identifiant dans votre test génère une alerte relative à cet événement alors que votre application ne rencontre aucun problème.

Pour éviter les tests irréguliers, l'algorithme Datadog exploite un ensemble de localisateurs permettant de cibler des éléments dans les tests d'application mobile. Si un léger changement d'interface entraîne la modification d'un élément (par exemple, si celui-ci est déplacé vers un autre emplacement), le test repère automatiquement l'élément, en se basant sur les points de référence qui n'ont pas été modifiés par le changement d'interface.

Lorsque le test d'application mobile se termine sans échouer, il recalcule les localisateurs non fonctionnels en leur attribuant une nouvelle valeur. On parle alors de réparation spontanée. Ainsi, vos tests continuent à fonctionner même après un simple changement d'interface. Ils peuvent donc s'adapter automatiquement aux différentes modifications apportées à l'interface de votre application mobile.

## Configuration

Définissez la configuration de votre test d'application mobile.

1. Sélectionnez une application mobile dans le menu déroulant. Si vous ne disposez pas encore d'applications mobiles, créez-en une depuis la [liste des applications][2] en suivant les instructions de la [section Paramètres de Mobile Application Testing][3]. 
2. Sélectionnez une **version** ou cliquez sur **Always run the latest version** pour utiliser la version la plus récente de votre application mobile lors de chaque exécution de votre test.
3. Attribuez un **nom** à votre test.
4. Sélectionnez des **tags d'environnement et des tags supplémentaires** associés à votre test. Utilisez le format `<KEY>:<VALUE>` pour filtrer une valeur `<VALUE>` pour une clé `<KEY>` donnée.
4. Sélectionnez les **appareils** sur lesquels votre test doit s'exécuter.
5. Définissez les conditions devant être remplies pour déclencher une nouvelle tentative de test.
6. Définissez la **fréquence de test** en cliquant sur l'intervalle de base ou en personnalisant la fréquence de votre test ainsi que les **conditions d'alerte** pour votre monitor de test.
7. Saisissez un nom pour le monitor de test, sélectionnez le service ou le membre de l'équipe à prévenir, puis ajoutez un message de notification.

{{% synthetics-variables %}}

### Utiliser des variables globales

Les [variables globales définies dans les **paramètres**][4] peuvent être utilisées dans les sections **Starting URL** et **Advanced Options** des détails de votre test d'application mobile, ainsi que dans votre enregistrement de test pour définir des variables locales. Pour afficher la liste des variables disponibles, saisissez `{{` dans le champ souhaité.

Définissez les variables que vous souhaitez incorporer dans le parcours utilisateur avant de commencer l'enregistrement.

Vous pouvez injecter les variables auxquelles vous avez accès pendant l'enregistrement. Pour découvrir comment utiliser des variables dans votre enregistrement de test mobile, consultez la section [Étapes des tests d'application mobile][11].

## Nouvelles tentatives de test

Vous pouvez définir le nombre de fois qu'un test doit échouer avant de déclencher une notification.

* Réessayez `X` fois le test après `Y` ms en cas d'échec.

## Planification et alertes

Par défaut, les tests d'application mobile sont configurés pour être exécutés à la demande. Autrement dit, ces tests peuvent être exécutés [directement dans un pipeline de CI](#executer-des-tests-dans-un-pipeline-de-ci).

{{< img src="mobile_app_testing/alerting_rules.png" alt="Planification et conditions d'alerte d'un test mobile" style="width:90%" >}}

Vous pouvez définir des conditions d'alertes personnalisées afin de spécifier la fréquence d'envoi d'une alerte ainsi que les circonstances dans lesquelles vous souhaitez qu'un test envoie une notification.

* Une alerte se déclenche en cas d'échec d'une assertion pendant `X` minutes.

### Configurer le monitor de test

Votre test envoie une notification selon les conditions d'alerte définies. Cette section vous permet de définir les conditions et le message à envoyer à vos équipes.

1. Saisissez un **message** pour le test d'application mobile. Ce champ accepte l'utilisation du [format Markdown][5] standard ainsi que les [variables conditionnelles][6] suivantes :

    | Variable conditionnelle       | Description                                                         |
    |----------------------------|---------------------------------------------------------------------|
    | `{{#is_alert}}`            | S'affiche lorsque le monitor envoie une alerte.                                       |
    | `{{^is_alert}}`            | S'affiche lorsque le monitor n'envoie pas d'alerte.                                     |
    | `{{#is_recovery}}`         | S'affiche lorsque le monitor est rétabli depuis un état `alert`.                          |
    | `{{^is_recovery}}`         | S'affiche lorsque le monitor n'est pas rétabli depuis un état `alert`.                        |
    | `{{#is_renotify}}`         | S'affiche lorsque le monitor renvoie des notifications.                                   |
    | `{{^is_renotify}}`          | S'affiche lorsque le monitor ne renvoie pas de notification.                                   |
    | `{{#is_priority}}`         | S'affiche lorsque le monitor correspond à la priorité (P1 à P5).                  |
    | `{{^is_priority}}`         | S'affiche lorsque le monitor ne correspond pas à la priorité (P1 à P5).                  |

    Les messages de notification comprennent le **message** défini dans cette section ainsi que des informations sur les emplacements fautifs.

2. Choisissez les services et les membres d'équipe auxquels les notifications doivent être envoyées.
3. Indiquez une fréquence de renvoi de notifications. Pour éviter de renvoyer des notifications pour les tests qui ont échoué, gardez l'option `Never renotify if the monitor has not been resolved`.
4. Cliquez sur **Save & Edit Recording** pour valider votre configuration de test et enregistrer vos étapes de test d'application mobile.

Pour en savoir plus, consultez la section [Utiliser des monitors de test Synthetic][7].

## Exécuter des tests dans un pipeline de CI

Pour exécuter des tests d'application mobile dans un pipeline de CI, vous devez définir l'option `mobileApplicationVersionFilePath` dans un [fichier de test `synthetics.json`][13] et dans un [fichier de configuration globale `synthetics-ci.config`][14], au besoin. Les options du fichier de configuration globale sont prioritaires sur celles du fichier de configuration du test.

Dans cet exemple, le test `aaa-aaa-aaa` est exécuté avec la version d'application de remplacement située dans `application/path`.

```json
// myTest.synthetics.json
{
  "tests": [
    {
      "id": "aaa-aaa-aaa",
      "config": {
        "mobileApplicationVersionFilePath": "application/path"
      }
    }
  ]
}
```

Exécutez ensuite `$ datadog-ci synthetics run-tests --config synthetics-ci.config`.

Pour en savoir plus, consultez la section [Tests continus et CI/CD][1].

## Autorisations

Par défaut, seuls les utilisateurs disposant des rôles Admin ou Standard Datadog peuvent créer, modifier et supprimer des tests d'application mobile Synthetic. Pour que votre utilisateur puisse effectuer ces opérations, vous devez donc lui accorder l'un de ces deux [rôles par défaut][8].

Si vous utilisez des [rôles personnalisés][9], attribuez à votre utilisateur un rôle personnalisé disposant des autorisations `synthetics_read` et `synthetics_write`.

### Restreindre l'accès

Les clients qui ont configuré des [rôles personnalisés][10] sur leur compte peuvent utiliser la fonctionnalité de restriction d'accès.

Vous pouvez limiter l'accès d'un test d'application mobile à certains rôles de votre organisation. Lors de la création du test d'application mobile, choisissez les rôles (en plus de votre utilisateur) auxquels vous souhaitez attribuer des autorisations de lecture/écriture pour votre test.

{{< img src="synthetics/settings/restrict_access_1.png" alt="Définir des autorisations pour votre test" style="width:70%;" >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/continuous_testing/cicd_integrations/
[2]: https://app.datadoghq.com/synthetics/settings/mobile-applications
[3]: /fr/mobile_app_testing/settings/
[4]: /fr/synthetics/settings/?tab=specifyvalue#global-variables
[5]: https://daringfireball.net/projects/markdown/syntax
[6]: /fr/monitors/notify/variables/?tab=is_alert#conditional-variables
[7]: /fr/synthetics/guide/synthetic-test-monitors/
[8]: /fr/account_management/rbac/?tab=datadogapplication#datadog-default-roles
[9]: /fr/account_management/rbac/?tab=datadogapplication#custom-roles
[10]: /fr/account_management/rbac/?tab=datadogapplication#create-a-custom-role
[11]: /fr/mobile_app_testing/mobile_app_tests/steps/
[12]: https://app.datadoghq.com/synthetics/mobile/create
[13]: /fr/continuous_testing/cicd_integrations/configuration?tab=npm#test-files
[14]: /fr/continuous_testing/cicd_integrations/configuration/?tab=npm#global-configuration-file-options