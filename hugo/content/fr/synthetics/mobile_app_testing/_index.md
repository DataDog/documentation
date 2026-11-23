---
aliases:
- /fr/mobile_testing
- /fr/mobile_app_testing
- /fr/mobile_app_testing/mobile_app_tests/
cascade:
  algolia:
    tags:
    - mobile_testing
description: Créez des tests mobiles intelligents et autonomes pour garantir que les
  parties les plus critiques de vos applications mobiles restent opérationnelles sur
  des dispositifs réels.
further_reading:
- link: /synthetics/mobile_app_testing/
  tag: Documentation
  text: Apprenez à créer des tests d'applications mobiles Synthetic
- link: /synthetics/mobile_app_testing/settings
  tag: Documentation
  text: Apprenez à téléverser vos applications mobiles iOS ou Android.
- link: /continuous_testing/
  tag: Documentation
  text: En savoir plus sur Continuous Testing et CI/CD
- link: /synthetics/guide/version_history/
  tag: Guide
  text: Historique des versions de Synthetic Monitoring
- link: /synthetics/guide/mobile-test-auth-tokens/
  tag: Guide
  text: Injectez et actualisez automatiquement les jetons d'authentification dans
    les tests d'application mobile
- link: https://www.datadoghq.com/blog/simplifying-troubleshooting-with-synthetic-monitoring
  tag: Blog
  text: Simplifier le dépannage tout au long du parcours utilisateur avec Datadog
    Synthetic Monitoring
- link: https://www.datadoghq.com/blog/test-creation-best-practices/
  tag: Blog
  text: Bonnes pratiques pour la création de tests de bout en bout
- link: https://www.datadoghq.com/blog/mobile-apps-synthetic-tests/
  tag: Blog
  text: Comment créer des tests Synthetic fiables et précis pour vos applications
    mobiles
- link: /api/latest/synthetics/#create-or-clone-a-test
  tag: API
  text: API Synthetics
title: Tests d'applications mobiles et surveillance
---
## Présentation {#overview}

La solution Mobile Application Testing vous permet de tester et de surveiller des flux commerciaux clés pour vos applications Android et iOS au moyen d'appareils physiques réels.
Datadog exécute ces tests sur des appareils réels pour fournir une représentation réaliste, étape par étape, des workflows clés de l'application, des captures d'écran de chaque étape et des résultats détaillés de réussite ou d'échec afin que votre équipe puisse rapidement visualiser ce qui n'a pas fonctionné.
Les tests d'applications mobiles peuvent être exécutés selon un planning, à la demande ou directement au sein de vos [pipelines CI/CD][1].

Optionnellement, liez les données de test mobile Synthetic avec les données mobiles RUM si le [SDK RUM][15] est utilisé au sein de l'application testée. 

Vous pouvez créer des tests d'applications mobiles dans Datadog en accédant à [{{< ui >}}Digital Experience{{< /ui >}} > {{< ui >}}New Test{{< /ui >}}][12] et en sélectionnant {{< ui >}}Mobile Application Test{{< /ui >}}.

{{< img src="mobile_app_testing/new_test_2.png" alt="Créer un test mobile Synthetic" style="width:50%;">}}

## Configuration {#configuration}

Vous pouvez créer un test en utilisant l'une des options suivantes :

### Créer un test à partir d'un modèle {#create-a-test-from-a-template}

  1. Survolez l'un des modèles pré-remplis et cliquez sur {{< ui >}}View Template{{< /ui >}}. Cela ouvre un panneau latéral affichant des informations de configuration pré-remplies, notamment : Détails du test, Détails de la requête, Conditions d'alerte et Étapes.
  2. Cliquez sur {{< ui >}}\+ Create Test{{< /ui >}} pour ouvrir la page de configuration, où vous pouvez examiner et modifier les options de configuration pré-remplies. Les champs présentés sont identiques à ceux disponibles lors de la création d'un test à partir de zéro.
  3. Cliquez sur {{< ui >}}Save & Quit{{< /ui >}} dans le coin supérieur droit pour soumettre votre test d'application mobile.<br /><br>
       {{< img src="/mobile_app_testing/templates_mobile_app.mp4" alt="Vidéo de la page d'accueil des tests d'application mobile avec des modèles" video="true" >}}

### Créer un test à partir de zéro {#build-a-test-from-scratch}

  1. Cliquez sur le modèle {{< ui >}}\+{{< /ui >}}, puis sélectionnez une application mobile dans le menu déroulant. Si vous ne l'avez pas encore fait, créez une application mobile dans la section [{{< ui >}}Applications List{{< /ui >}}][2] sur la page [{{< ui >}}Synthetic Monitoring & Continuous Testing Settings{{< /ui >}}][3]. 
  1. Sélectionnez une {{< ui >}}version{{< /ui >}} ou cliquez sur {{< ui >}}Always run the latest version{{< /ui >}} pour utiliser la dernière version de votre application mobile chaque fois que votre test est exécuté.
  1. Ajoutez un {{< ui >}}name{{< /ui >}} pour votre test.
  1. Sélectionnez les {{< ui >}}environment and additional tags{{< /ui >}} qui se rapportent à votre test. Utilisez le format `<KEY>:<VALUE>` pour filtrer sur un `<VALUE>` pour un `<KEY>` donné.
  1. Sélectionnez les [{{< ui >}}devices{{< /ui >}}](#devices) sur lesquels exécuter votre test.
  1. Définissez [les conditions de nouvelle tentative](#test-retries) pour votre test.
  1. Définissez les [{{< ui >}}test frequency{{< /ui >}}](#scheduling-and-alerts) en cliquant sur des intervalles de temps de base ou en personnalisant la fréquence de votre test et {{< ui >}}alert conditions{{< /ui >}} pour votre monitor de test. 
  1. Saisissez un nom pour le monitor de test, sélectionnez un service ou un membre de l'équipe à notifier, et ajoutez une notification par message.
  1. Cliquez sur {{< ui >}}Save & Edit Recording{{< /ui >}} pour soumettre votre test d'application mobile.

### Extraits {#snippets}

Lors de la configuration d'un nouveau test d'application mobile, utilisez des extraits pour renseigner automatiquement vos versions d'OS, tailles d'appareil, fabricants et temps de disponibilité, au lieu de sélectionner manuellement ces options. Les extraits suivants sont disponibles :

* {{< ui >}}Device Size{{< /ui >}} : Effectuez automatiquement vos tests d'application mobile sur un écran de taille spécifique à travers différents appareils :

  - {{< ui >}}Multi-screen size{{< /ui >}}
  - {{< ui >}}Tablet{{< /ui >}}
  - {{< ui >}}Large Screen (iOS only){{< /ui >}}
  - {{< ui >}}Standard Screen (iOS only){{< /ui >}}
  - {{< ui >}}Small Screen (iOS only){{< /ui >}}

* {{< ui >}}OS Version{{< /ui >}} : Testez automatiquement vos applications iOS ou Android sur plusieurs versions. Cette sélection bascule vers iOS ou Android selon le choix de votre application mobile.

* {{< ui >}}Device Manufacturer (Android only){{< /ui >}} : Testez automatiquement vos applications Android sur plusieurs fabricants d'appareils.

* {{< ui >}}Uptime{{< /ui >}} : Configurez automatiquement un test avec la fréquence la plus courte disponible (toutes les 15 minutes).

<br/>
  {{< img src="mobile_app_testing/mobile_app_snippets_2.png" alt="Capture d'écran du côté gauche de la création d'un test d'application mobile, montrant les exemples d'extraits" width="70%" >}}

### Options avancées {#advanced-options}

Vous pouvez configurer des options avancées lors de la création d'un test mobile pour ajuster dynamiquement le comportement de l'application sans modifier votre code. Par exemple, vous pouvez accepter automatiquement les alertes, autoriser les plantages d'application et capturer les ressources réseau. Ces configurations sont accessibles dans la {{< ui >}}Advanced Options{{< /ui >}} section de votre test mobile.

#### Options de comportement du test: {#test-behavior-options}

{{< ui >}}Auto-accept alerts{{< /ui >}}
: Lorsqu'elle est activée, cette option accepte automatiquement toutes les alertes système du système d'exploitation pendant l'exécution du test.

{{< ui >}}Allow application crash{{< /ui >}}
: Lorsqu'elle est activée, cette option empêche l'échec du test si un plantage de l'application est détecté. Vous devez inclure une étape pour redémarrer l'application après le plantage attendu afin de poursuivre le test.

{{< ui >}}Capture network resources{{< /ui >}}
: Lorsqu'elle est activée, cette option collecte les requêtes et réponses réseau pour chaque étape du test et les affiche dans les résultats. </br>
**Remarque** : Ce paramètre peut avoir un impact sur les performances de l'application et pourrait empêcher l'application de démarrer.

#### Arguments de l'application : {#application-arguments}

Vous pouvez transmettre des paires `key:value` à votre application au démarrage du test, ce qui vous permet de modifier par programmation le comportement de l'application. Le code de votre application doit être configuré pour lire et traiter explicitement ces paires clé-valeur. 

Par exemple, [injectez un jeton d'authentification à actualisation automatique][17] pour ignorer le flux de connexion de votre application.

**Exemples :**

{{< tabs >}}
{{% tab "Android (Extras d'intention initiaux)" %}}

Pour les tests Android, ajoutez les paires `key:value` appropriées dans la section Options avancées de votre test :

```json
{
  "username": "example_user",
  "password": "{{ EXAMPLE_VARIABLE }}"
}
```

{{< img src="mobile_app_testing/advanced/mobile_app_advanced_android.png" alt="Page de création de test d'application mobile, montrant un exemple d'option avancée pour un appareil Android." style="width:100%;" >}}
{{% /tab %}}

{{% tab "iOS (Arguments de processus)" %}}

Pour les tests iOS, ajoutez les paires `key:value` appropriées dans la section Options avancées :

```json
{
  "username": "example_user",
  "password": "{{ EXAMPLE_VARIABLE }}",
  "enable_feature_x": "true"
}
```

{{< img src="mobile_app_testing/advanced/mobile_app_advanced_iOS.png" alt="Page de création de test d'application mobile, montrant un exemple d'option avancée pour un appareil iOS." style="width:100%;" >}}
    
{{% /tab %}}
{{< /tabs >}}

## Appareils {#devices}

Sur l'écran de sélection des appareils, vous pouvez choisir de tester des appareils mobiles situés soit en Europe (UE), soit aux États-Unis (US). 
Pour configurer un test mobile afin d'utiliser des appareils hébergés dans l'UE ou aux États-Unis :

1. Ouvrez la page de modification de test pour un test mobile existant ou créez-en un nouveau.
2. Développez la {{< ui >}}Devices{{< /ui >}} section et choisissez l'emplacement ou les emplacements des appareils pour votre test :
   - {{< ui >}}All locations{{< /ui >}} : Exécute les tests dans l'UE et aux États-Unis.
   - {{< ui >}}EU{{< /ui >}} : Exécute les tests uniquement dans l'UE.
   - {{< ui >}}US{{< /ui >}} : Exécute les tests uniquement aux États-Unis.
3. Utilisez le {{< ui >}}Select Device(s){{< /ui >}} menu déroulant pour sélectionner les appareils sur lesquels vous souhaitez effectuer des tests.
4. Cliquez sur {{< ui >}}Save & Edit Recording{{< /ui >}} pour enregistrer votre configuration de test.

**Remarques** : 
- Les tests exécutés sur des appareils hébergés aux États-Unis sont lancés depuis AWS US West (Oregon). De même, les tests sur des appareils hébergés dans l'UE sont lancés depuis AWS Allemagne (Francfort).
- Tous les appareils ne sont pas disponibles à la fois dans l'UE et aux États-Unis. Pour plus de détails, consultez la liste des [appareils pris en charge][16].

{{< img src="mobile_app_testing/mobile_app_devices_EU.mp4" alt="Sélection d'un ou plusieurs appareils mobiles dans les régions États-Unis et UE" video=true >}}

### Familles d'appareils mobiles {#mobile-device-families}

Une famille d'appareils mobiles représente un ensemble d'appareils partageant des caractéristiques communes, telles qu'une gamme de modèles ou une version d'OS. Au lieu de choisir un seul appareil spécifique, vous pouvez choisir une famille. Lorsqu'un test s'exécute, Datadog le lance sur l'un des appareils disponibles dans la famille à ce moment-là. Choisir une famille augmente la disponibilité de vos résultats de test, car le test peut s'exécuter sur n'importe quel appareil disponible dans la famille plutôt que de dépendre d'un seul appareil spécifique.

Datadog fournit des familles intégrées qui apparaissent aux côtés des appareils individuels dans le menu déroulant **Sélectionner le(s) appareil(s)**. Par exemple :

- **Dernière famille iPhone sur la dernière version d'iOS** (iOS)
- **Tout iPhone Pro** (iOS)
- **Dernière famille Pixel sur la dernière version d'Android** (Android)
- **Tout appareil Samsung** (Android)

Sélectionnez une famille de la même manière que vous sélectionnez un appareil individuel. Un seul test peut cibler des appareils individuels, des familles, ou les deux.

## Tentatives de test {#test-retries}

Vous pouvez définir le nombre de fois qu'un test doit échouer avant de déclencher une notification d'alerte.

* Réessayer `X` fois après `Y` ms en cas d'échec.

{{< img src="mobile_app_testing/retry_condition.png" alt="Étape de condition de nouvelle tentative, indiquant que le test est relancé 0 fois après 300 ms en cas d'échec" width="90%" >}}

## Planification et alertes {#scheduling-and-alerts}

Par défaut, les tests d'applications mobiles sont configurés pour des tests à la demande, ce qui signifie que ces tests peuvent s'exécuter [directement dans un pipeline CI](#run-tests-in-ci).

{{< img src="mobile_app_testing/alerting_rules.png" alt="Conditions de planification et d'alerte pour un test mobile" style="width:90%" >}}

Vous pouvez définir des conditions d'alertes personnalisées afin de spécifier la fréquence d'envoi d'une alerte ainsi que les circonstances dans lesquelles vous souhaitez qu'un test envoie une notification d'alerte.

* Une alerte est déclenchée si une assertion échoue pendant `X` minutes.

<div class="alert alert-info">
Pour plus d'informations sur la façon dont les notifications de Synthetic Monitoring évaluent les résultats des tests et déclenchent des alertes, consultez <a href="/synthetics/guide/how-synthetics-monitors-trigger-alerts/">Comprendre Synthetic Monitor Alerting</a>.
</div>

{{% synthetics-downtimes %}}

### Configurer le monitor de test {#configure-the-test-monitor}

Une notification est envoyée selon l'ensemble des conditions d'alerte. Utilisez cette section pour définir la manière et le contenu du message à adresser à vos équipes.

1. Saisissez un {{< ui >}}message{{< /ui >}} ou utilisez des messages de monitor pré-remplis pour le test d'application mobile. Ce champ autorise le formatage [Markdown][5] standard et prend en charge les [variables conditionnelles][6] suivantes :

    | Variable conditionnelle       | Description                                                         |
    |----------------------------|---------------------------------------------------------------------|
    | `{{#is_alert}}`            | Show when the monitor alerts.                                       |
    | `{{^is_alert}}`            | Show unless the monitor alerts.                                     |
    | `{{#is_recovery}}`         | Show when the monitor recovers from `alert`.                          |
    | `{{^is_recovery}}`         | Show unless the monitor recovers from `alert`.                        |
    | `{{#is_renotify}}`         | Show when the monitor renotifies.                                   |
    | `{{^is_renotify}}`         | Show unless the monitor renotifies.                                 |
    | `{{#is_priority}}`         | Show when the monitor matches priority (P1 to P5).                  |
    | `{{^is_priority}}`         | Afficher sauf si le monitor correspond à la priorité (P1 à P5).                |

    Notification messages include the {{< ui >}}message{{< /ui >}} defined in this section and information about the failing locations. Pre-filled monitor messages are included in the message body section:

    {{< img src="/mobile_app_testing/mobile_app_synthetic_monitor.png" alt="Section de surveillance des tests d'applications mobiles, mettant en évidence les messages de monitor pré-remplis" style="width:100%;" >}}

    For example, to create a monitor that iterates over steps extracting variables for mobile tests, add the following to the monitor message:

      ```text
      {{! Lister les variables extraites de toutes les étapes réussies }}
      # Variables extraites
      {{#each synthetics.attributes.result.steps}}
      {{#if extractedValue}}
      * **Nom** : `{{extractedValue.name}}`
      **Valeur :** {{#if extractedValue.secure}}*Obfusqué (valeur masquée)*{{else}}`{{{extractedValue.value}}}`{{/if}}
      {{/if}}
      {{/each}}
      ```

2. Choisissez les membres de l'équipe et les services à notifier.
3. Spécifiez une fréquence de renvoi de notification. Pour éviter les renvois de notification sur les tests en échec, cochez l'option {{< ui >}}Stop re-notifying on X occurrences{{< /ui >}}.
4. Cliquez sur {{< ui >}}Save & Edit Recording{{< /ui >}} pour enregistrer votre configuration de test et enregistrer les étapes de test de votre application mobile.

Pour plus d'informations, consultez [Synthetic Monitoring notifications][7].

## Instabilité {#flakiness}

L'instabilité est une source de difficultés dans les tests de bout en bout. Les échecs de test sont parfois causés par des changements de code frontend valides qui impactent un identifiant, et non par un problème réel de l'application.

Pour éviter les tests instables, Datadog utilise un algorithme qui exploite un ensemble de localisateurs pour cibler des éléments dans les tests d'application mobile. Un petit changement dans l'interface utilisateur peut modifier un élément (par exemple, en le déplaçant vers un autre emplacement). Le test d'application mobile localise automatiquement l'élément à nouveau en se basant sur des points de référence qui ne sont pas affectés par le changement. 

Lorsque le test s'exécute avec succès, le test d'application mobile recalcule (ou « s'auto-répare ») tous les localisateurs rompus avec des valeurs mises à jour. Cela garantit que vos tests ne sont pas interrompus par de simples mises à jour de l'interface utilisateur et que vos tests s'adaptent automatiquement à l'interface utilisateur de votre application mobile. 

## Exécutez des tests en CI {#run-tests-in-ci}

Vous pouvez exécuter des tests d'application mobile dans un pipeline CI en définissant l'option `mobileApplicationVersionFilePath` dans un [fichier de test `synthetics.json`][13] et un [fichier de configuration globale `synthetics-ci.config`][14] selon vos besoins. Les options du fichier de configuration globale prévalent sur les options du fichier de configuration de test.

Dans cet exemple, le test `aaa-aaa-aaa` s'exécute avec la version d'application de remplacement trouvée dans `application/path`.

```json
// myTest.synthetics.json
{
  "tests": [
    {
      "id": "aaa-aaa-aaa",
      "testOverrides": {
        "mobileApplicationVersionFilePath": "application/path"
      }
    }
  ]
}
```

Ensuite, exécutez `$ datadog-ci synthetics run-tests --config synthetics-ci.config`.

Pour en savoir plus, consultez la section [Continuous Testing et CI/CD][1].

## Autorisations {#permissions}

Par défaut, seuls les utilisateurs disposant des rôles Datadog Admin et Datadog Standard peuvent créer, modifier et supprimer des tests d'application mobile Synthetic. Pour obtenir un accès de création, de modification et de suppression aux tests d'application mobile Synthetic, mettez à niveau votre utilisateur vers l'un de ces deux [rôles par défaut][8].

Si vous utilisez la [fonctionnalité de rôle personnalisé][9], ajoutez votre utilisateur à tout rôle personnalisé incluant les autorisations `synthetics_read` et `synthetics_write`.

### Restreindre l'accès {#restrict-access}

{{% synthetics_grace_permissions %}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/continuous_testing/cicd_integrations/
[2]: https://app.datadoghq.com/synthetics/settings/mobile-applications
[3]: /fr/mobile_app_testing/settings/
[4]: /fr/synthetics/settings/?tab=specifyvalue#global-variables
[5]: https://daringfireball.net/projects/markdown/syntax
[6]: /fr/monitors/notify/variables/?tab=is_alert#conditional-variables
[7]: /fr/synthetics/notifications/
[8]: /fr/account_management/rbac/?tab=datadogapplication#datadog-default-roles
[9]: /fr/account_management/rbac/?tab=datadogapplication#custom-roles
[11]: /fr/mobile_app_testing/mobile_app_tests/steps/
[12]: https://app.datadoghq.com/synthetics/mobile/create
[13]: /fr/continuous_testing/cicd_integrations/configuration?tab=npm#test-files
[14]: /fr/continuous_testing/cicd_integrations/configuration/?tab=npm#global-configuration-file-options
[15]: /fr/real_user_monitoring/application_monitoring/
[16]: /fr/synthetics/mobile_app_testing/devices
[17]: /fr/synthetics/guide/mobile-test-auth-tokens/