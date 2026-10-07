---
aliases:
- /fr/synthetics/settings
further_reading:
- link: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/synthetics_global_variable
  tag: Site externe
  text: Créer et gérer des variables globales Synthetic avec Terraform
- link: /synthetics/api_tests/
  tag: Documentation
  text: Configurer un test API
- link: /synthetics/multistep/
  tag: Documentation
  text: Configurer un test API à plusieurs étapes
- link: /synthetics/browser_tests/
  tag: Documentation
  text: Configurer un test de navigateur
- link: /mobile_app_testing/
  tag: Documentation
  text: Configurer un test mobile
- link: /synthetics/private_locations/
  tag: Documentation
  text: Créer un emplacement privé
- link: /synthetics/platform/rum/
  tag: Documentation
  text: Connecter RUM à Synthetic Monitoring
title: Paramètres de test Synthetic et de surveillance
---
## Présentation {#overview}

Depuis la page [Synthetic Monitoring & Continuous Testing Settings][1], vous pouvez consulter et modifier les paramètres et fonctionnalités ci-dessous :

* [Paramètres par défaut](#default-settings)
* [Downtimes][25]
* [Emplacements privés](#private-locations)
* [Variables globales](#global-variables)
* [Paramètres d'intégration](#integration-settings)
* [Paramètres de Continuous Testing][2]
* [Paramètres des applications mobiles][18]

## Paramètres par défaut {#default-settings}

### Paramètres des tags imposés {#enforced-tags-settings}

#### Imposer des tags pour **l'attribution de l'utilisation** sur tous les tests {#enforce-tags-for-usage-attribution-on-all-tests}

Sur la page Attribution de l'utilisation, vous pouvez configurer jusqu'à trois tags pour ventiler les coûts et les attributs d'utilisation. Sélectionnez {{< ui >}}Enforce tags for usage attribution on all tests{{< /ui >}} pour exiger que les utilisateurs saisissent tous les tags d'attribution de l'utilisation configurés lors de la création ou de la modification de tests Synthetic. Lorsque ce paramètre est activé, les utilisateurs ne peuvent pas enregistrer de tests sans saisir tous les tags requis.

#### Imposer des **politiques de tags de monitor** requises sur tous les tests {#enforce-required-monitor-tag-policies-on-all-tests}

Sur la page [Synthetic Monitoring and Testing settings][20], sélectionnez {{< ui >}}Enforce required monitor tag policies on all tests{{< /ui >}} pour exiger que les politiques de tags de monitor définies par l'utilisateur soient appliquées aux tests Synthetic. Lorsque ce paramètre est activé, les utilisateurs ne peuvent pas enregistrer de tests sans saisir tous les tags requis.

  <br>

  1. Configurez les tags de monitor sur la page [{{< ui >}}Monitors{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Policies{{< /ui >}}][21] :

  <br>

   {{< img src="synthetics/settings/monitor_tag_policy.png" alt="Page Monitor Settings, affichant les tags de politique de monitor configurés" style="width:80%;">}}

  2. Créez un test de navigateur Synthetic et ajoutez les tags de politique requis :

  <br>

  {{< img src="synthetics/settings/monitor_tags.png" alt="Nouvelle page de test Synthetics, mettant en évidence la fonctionnalité des tags de politique" style="width:80%;">}}

### Emplacements par défaut {#default-locations}

Choisissez les emplacements par défaut pour les détails relatifs à votre [test API][4], [test API à plusieurs étapes][5] ou [test de navigateur][6].

Les options comprennent tous les emplacements gérés disponibles proposés par Datadog, ainsi que les emplacements privés que vous avez configurés pour votre compte.

Lorsque vous avez terminé de sélectionner les emplacements, cliquez sur {{< ui >}}Save Default Locations{{< /ui >}}.

### Navigateurs et appareils par défaut {#default-browsers-and-devices}

Choisissez les types d'appareils et de navigateurs par défaut pour les détails relatifs à votre [test de navigateur][6].

Vos options pour les navigateurs incluent Google Chrome, Mozilla Firefox et Microsoft Edge. Vos options pour les appareils incluent un grand ordinateur portable, une tablette et un petit appareil mobile.

Lorsque vous avez terminé de sélectionner les navigateurs et les appareils, cliquez sur {{< ui >}}Save Default Browsers & Devices{{< /ui >}}.

### Tags par défaut {#default-tags}

Choisissez ou ajoutez les tags par défaut pour les détails relatifs à votre [test API][4], [test API à plusieurs étapes][5] ou [test de navigateur][6].

Lorsque vous avez terminé de sélectionner les tags associés, cliquez sur {{< ui >}}Save Default Tags{{< /ui >}}.

### Délai d'expiration par défaut {#default-timeout}

Ajoutez les délais d'expiration par défaut pour les détails de votre [test API][4].

Lorsque vous avez terminé de saisir les nouveaux délais d'expiration, cliquez sur {{< ui >}}Save Default Timeouts{{< /ui >}}.

### Fréquence par défaut {#default-frequency}

Choisissez ou ajoutez les fréquences par défaut pour les détails de votre [test API][4], [test de navigateur][6] ou [test mobile][17].

Lorsque vous avez terminé de sélectionner les tags associés, cliquez sur {{< ui >}}Save Default Frequencies{{< /ui >}}.

### Tentatives par défaut {#default-retries}

Choisissez ou ajoutez le nombre de fois par défaut que vous souhaitez que votre test soit relancé en cas d'échec pour les détails de votre [test API][4], [test de navigateur][6] ou [test mobile][17].

Lorsque vous avez terminé de saisir les valeurs de tentative par défaut, cliquez sur {{< ui >}}Save Default Retries{{< /ui >}}.

### Appareils mobiles par défaut {#default-mobile-devices}

Choisissez ou ajoutez les appareils mobiles par défaut que vous souhaitez utiliser dans les détails de votre [test mobile][17].

Une fois la saisie des appareils mobiles par défaut terminée, cliquez sur {{< ui >}}Save Default Devices{{< /ui >}}.

### Autorisations {#permissions}

Par défaut, seuls les utilisateurs disposant des [rôles Datadog Admin et Datadog Standard][11] peuvent accéder à la page {{< ui >}}Default Settings{{< /ui >}} de Synthetic Monitoring. Pour accéder à la {{< ui >}}Default Settings{{< /ui >}} page, mettez à niveau votre utilisateur vers l'un de ces deux [rôles par défaut][11].

Si vous utilisez la [fonctionnalité de rôle personnalisé][12], ajoutez votre utilisateur à tout rôle personnalisé incluant les autorisations `synthetics_default_settings_read` et `synthetics_default_settings_write`.

## Downtimes {#downtimes}

Pour plus d'informations, consultez [Downtime planifié][25].

## Emplacements privés {#private-locations}

Pour en savoir plus, consultez la section [Exécuter des tests Synthetic à partir d'emplacements privés][3].

## Variables globales {#global-variables}

Les variables globales sont des variables accessibles depuis tous vos tests Synthetic. Ils peuvent être utilisés dans tous les [tests uniques][4], [tests d'API en plusieurs étapes][5], [tests de navigateur][6] et [tests d'applications mobiles][17] de votre collection de tests.

Pour créer une variable globale, accédez à l'onglet {{< ui >}}Global Variables{{< /ui >}} sur la [page {{< ui >}}Synthetic Monitoring & Continuous Testing{{< /ui >}} > {{< ui >}}Settings{{< /ui >}}][7] et cliquez sur {{< ui >}}\+ New Global Variable{{< /ui >}}.

Choisissez le type de variable que vous souhaitez créer :

{{< tabs >}}
{{% tab "Spécifier la valeur" %}}

1. Saisissez un {{< ui >}}Variable Name{{< /ui >}}. Le nom de votre variable ne peut contenir que des lettres majuscules, des chiffres et des traits de soulignement. Ce nom doit être unique parmi vos variables globales.
2. Facultativement, saisissez une {{< ui >}}Description{{< /ui >}} et sélectionnez {{< ui >}}Tags{{< /ui >}} à associer à votre variable.
3. Saisissez la {{< ui >}}Value{{< /ui >}} que vous souhaitez attribuer à votre variable.
4. Facultativement, utilisez les fonctions intégrées pour attribuer des valeurs à votre variable. Par exemple, cliquez sur la fonction intégrée `{{ alphabetic(n) }} pour remplir le champ {{< ui >}}Value{{< /ui >}} avec un exemple de valeur alphabétique.
5. Facultativement, activez l'obfuscation de votre variable pour masquer sa valeur dans les résultats de test.

{{< img src="synthetics/settings/variable_value_3.png" alt="Spécifier la valeur de la variable globale" style="width:100%;">}}

Les fonctions intégrées suivantes sont disponibles :

&#x7b;&#x7b; numeric(n) &#x7d;&#x7d;
: Génère une chaîne numérique avec `n` chiffres.

&#x7b;&#x7b; alphabetic(n) &#x7d;&#x7d;
: Génère une chaîne alphabétique avec `n` lettres.

&#x7b;&#x7b; alphanumeric(n) &#x7d;&#x7d;
: Génère une chaîne alphanumérique avec `n` caractères.

&#x7b;&#x7b; date(n unit, format) &#x7d;&#x7d;
: Génère une date dans l'un des formats acceptés par Datadog avec une valeur correspondant à la date UTC à laquelle le test est lancé, plus ou moins `n` unités.

&#x7b;&#x7b; timestamp(n, unit) &#x7d;&#x7d;
: Génère un horodatage dans l'une des unités acceptées par Datadog avec une valeur correspondant à l'horodatage UTC au moment du lancement du test, plus ou moins `n` unités.

&#x7b;&#x7b; uuid &#x7d;&#x7d;
: Génère un identifiant unique universel (UUID) de version 4.

&#x7b;&#x7b; public-id &#x7d;&#x7d;
: Injecte l'ID public de votre test.

&#x7b;&#x7b; result-id &#x7d;&#x7d;
: Injecte l'ID de résultat de votre exécution de test.

{{% /tab %}}

{{% tab "Créer à partir du test" %}}

Vous pouvez créer des variables à partir de vos [tests HTTP][1] existants, en parsant leur corps et leurs en-têtes de réponse associés, ou à partir de vos [tests API à plusieurs étapes][2] existants, à l'aide de leurs variables extraites.

{{< img src="synthetics/settings/global_variable.png" alt="Variables disponibles que vous pouvez extraire d'un test API à plusieurs étapes" style="width:100%;" >}}

1. Saisissez un {{< ui >}}Variable Name{{< /ui >}}. Le nom de votre variable ne peut contenir que des lettres majuscules, des chiffres et des traits de soulignement.
2. Facultativement, saisissez une {{< ui >}}Description{{< /ui >}} et sélectionnez {{< ui >}}Tags{{< /ui >}} à associer à votre variable.
3. Activez l'obfuscation de votre variable pour masquer sa valeur dans les résultats de test (facultatif).
4. Sélectionnez le **test** à partir duquel vous souhaitez extraire une variable.
5. Si vous utilisez un test API à plusieurs étapes, extrayez votre variable locale du test. Si vous utilisez un test HTTP, choisissez d'extraire votre variable de l'en-tête de réponse ou du corps de la réponse.

    * Extraire la valeur de {{< ui >}}Response Header{{< /ui >}} : Utilisez l'en-tête de réponse complet pour votre variable ou analysez-le avec un [`regex`][3].
    * Extraire la valeur de {{< ui >}}Response Body{{< /ui >}} : Analysez le corps de la réponse de la requête avec un [`regex`][3], un [`jsonpath`][4], un [`xpath`][5], ou utilisez le corps de la réponse complet.
    * Extraire la valeur du {{< ui >}}Response Status Code{{< /ui >}}.

Il est non seulement possible d'extraire une valeur à partir d'une regex, mais également d'utiliser une [regex][3] afin d'appliquer les logiques de parsing suivantes :

  - Faire correspondre non seulement la première instance d'un motif, mais aussi toutes les instances du motif fourni
  - Ignorer la casse du motif de correspondance
  - Faire correspondre les chaînes sur plusieurs lignes
  - Traiter le motif regex transmis comme unicode
  - Autoriser les symboles de point à identifier les nouvelles lignes
  - Faire correspondre à partir d'un index donné dans un motif regex
  - Remplacer le motif correspondant par une valeur fournie

{{< img src="synthetics/settings/parsing_regex_field.png" alt="Analyser le corps de la réponse d'un test HTTP avec une expression régulière" style="width:80%;">}}

Les valeurs des variables sont mises à jour lors de chaque exécution du test à partir duquel elles sont extraites.

[1]: /fr/synthetics/api_tests/http_tests/
[2]: /fr/synthetics/multistep/
[3]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
[4]: https://restfulapi.net/json-jsonpath/
[5]: https://www.w3schools.com/xml/xpath_syntax.asp
{{% /tab %}}

{{% tab "Jeton MFA" %}}

Pour générer et utiliser un TOTP dans vos tests, créez une variable globale et ajoutez-y une clé de secret ou importez un code QR fourni par votre fournisseur d'authentification. **Remarque :** Actuellement, seul l'algorithme de hachage SHA1 est pris en charge pour TOTP.

1. Dans {{< ui >}}Choose variable type{{< /ui >}}, sélectionnez {{< ui >}}MFA Token{{< /ui >}}.
2. Dans {{< ui >}}Define Variable{{< /ui >}}, saisissez un {{< ui >}}Variable Name{{< /ui >}}. Le nom de votre variable ne peut contenir que des lettres majuscules, des chiffres et des traits de soulignement.
3. Facultativement, entrez une {{< ui >}}Description{{< /ui >}} et sélectionnez {{< ui >}}Tags{{< /ui >}} à associer à votre variable.
4. Entrez la {{< ui >}}Secret Key{{< /ui >}} de votre variable ou téléversez une image de code QR.
5. Cliquez sur {{< ui >}}\+ Generate{{< /ui >}} pour créer un OTP. Vous pouvez copier l'OTP généré avec l'icône {{< ui >}}Copy{{< /ui >}}.

{{< img src="synthetics/guide/browser-tests-totp/new-variable-totp.png" alt="Créer un jeton MFA" style="width:100%;" >}}

**Remarque** : Si votre jeton TOTP fonctionne dans Google Authenticator, il est probablement compatible avec Datadog.
Certains codes QR sont limités à des méthodes de vérification spécifiques et peuvent ne pas fonctionner sur toutes les plateformes. Pour garantir la compatibilité, utilisez un code QR ou un secret qui respecte les protocoles TOTP standard.

Pour en savoir plus sur l'autorisation multifacteur basée sur un TOTP dans un test de navigateur, consultez la section [Mots de passe à usage unique basés sur le temps (TOTP) pour l'authentification multifacteur dans des tests de navigateur][1].

[1]: /fr/synthetics/guide/browser-tests-totp
{{% /tab %}}
{{% tab "Authentificateur virtuel" %}}

Pour effectuer un parcours utilisateur avec une clé d'accès dans vos tests Synthetics, créez une variable globale d'authentificateur virtuel. Cette variable globale est utilisée pour générer et stocker des clés d'accès pour tous vos tests de navigateur Synthetics. Pour plus d'informations, consultez [Utilisation des clés d'accès dans les tests de navigateur][1].

1. Accédez à l'onglet {{< ui >}}Global Variables{{< /ui >}} dans [{{< ui >}}Synthetic Monitoring & Continuous Testing{{< /ui >}} > {{< ui >}}Settings{{< /ui >}}][1] et cliquez sur {{< ui >}}\+ New Global Variable{{< /ui >}}.

1. Dans la section {{< ui >}}Choose variable type{{< /ui >}}, sélectionnez {{< ui >}}Virtual Authenticator{{< /ui >}}.
2. Dans la section {{< ui >}}Specify variable details{{< /ui >}}, entrez une {{< ui >}}Variable Name{{< /ui >}}. Le nom de votre variable ne peut contenir que des lettres majuscules, des chiffres et des traits de soulignement.
3. Optionnellement, entrez une {{< ui >}}Description{{< /ui >}} et sélectionnez {{< ui >}}Tags{{< /ui >}} pour l'associer à votre variable. Datadog crée alors un authentificateur virtuel utilisé pour générer et stocker vos clés d'accès.
4. Dans la section {{< ui >}}Permissions settings{{< /ui >}}, restreignez l'accès à votre variable en fonction des rôles dans votre organisation. Pour plus d'informations sur les rôles, consultez la [documentation RBAC][2].

{{< img src="synthetics/guide/browser-tests-passkeys/new-variable-virtual-authenticator.png" alt="Créer un authentificateur virtuel" style="width:80%;" >}}

[1]: /fr/synthetics/guide/browser-tests-passkeys
[2]: /fr/account_management/rbac/?tab=datadogapplication#custom-roles
{{% /tab %}}
{{< /tabs >}}

Une fois créées, les variables globales peuvent être utilisées dans tous les tests Synthetic. Pour importer vos variables globales dans votre test, cliquez sur {{< ui >}}\+ Variables{{< /ui >}}, saisissez `{{` dans un champ où vous souhaitez ajouter la variable, puis sélectionnez votre variable globale.


Pour en savoir plus sur les variables, consultez la documentation relative aux [tests HTTP][8], aux [tests API à plusieurs étapes][9], aux [tests de navigateur][10], aux [tests d'application mobile][19] ainsi qu'aux [étapes des tests de navigateur][16].

### Autorisations {#permissions-1}

Par défaut, seuls les utilisateurs disposant des [rôles Datadog Admin et Datadog Standard][11] peuvent accéder à la page {{< ui >}}Global Variables{{< /ui >}} de Synthetic Monitoring. Vous pouvez obtenir l'accès à la page {{< ui >}}Global Variables{{< /ui >}} en faisant passer votre utilisateur à l'un de ces deux [rôles par défaut][11].

Si vous utilisez la [fonctionnalité de rôle personnalisé][12], ajoutez votre utilisateur à tout rôle personnalisé incluant les autorisations `synthetics_default_settings_read` et `synthetics_default_settings_write`.

### Restreindre l'accès {#restrict-access}

Utilisez le [contrôle d'accès granulaire][22] pour limiter l'accès à votre test en fonction des rôles, des équipes ou des utilisateurs individuels :

1. Ouvrez la section des autorisations du formulaire.
2. Cliquez sur {{< ui >}}Edit Access{{< /ui >}}.
  {{< img src="synthetics/settings/grace_2.png" alt="Définissez les autorisations pour votre test à partir du formulaire de configuration des emplacements privés" style="width:100%;" >}}
3. Cliquez sur {{< ui >}}Restrict Access{{< /ui >}}.
4. Sélectionnez des équipes, des rôles ou des utilisateurs.
5. Cliquez sur {{< ui >}}Add{{< /ui >}}.
6. Sélectionnez le niveau d'accès que vous souhaitez associer à chacun d'eux.
7. Cliquez sur {{< ui >}}Done{{< /ui >}}.

<div class="alert alert-info">Vous pouvez consulter les résultats d'une Private Location même sans accès Viewer à cette Private Location.</div>

| Niveau d'accès | Voir la valeur de la variable globale | Voir les métadonnées de la variable globale | Utiliser la variable globale dans un test | Modifier la valeur/les métadonnées de la variable globale  |
| ------------ | --------------| ---------------- | -------------- | ----------------------- |
| Aucun accès    |               |                  |                |                         |
| Viewer       | {{< X >}}     | {{< X >}}        | {{< X >}}      |                         |
| Editor       | {{< X >}}     | {{< X >}}        | {{< X >}}      | {{< X >}}               |

**Remarque** : Restreindre une variable empêche les autres utilisateurs de l'ajouter à un test et de l'utiliser ; cela ne masque pas le nom de la variable si elle est déjà utilisée dans un test existant.

## Paramètres d'intégration {#integration-settings}

{{< img src="synthetics/settings/integration_settings.png" alt="Page Paramètres d'intégration" style="width:100%;">}}

### Intégration APM pour les tests de navigateur {#apm-integration-for-browser-tests}

Autorisez les URL à ajouter des en-têtes d'intégration APM à ces URL. Les en-têtes des intégrations APM Datadog permettent à Datadog d'associer des tests de navigateur à APM.

Définissez les endpoints vers lesquels vous souhaitez envoyer les en-têtes APM en saisissant une URL dans le champ {{< ui >}}Value{{< /ui >}}. Si l'endpoint est tracé et inclus dans la liste, les résultats du test de navigateur sont automatiquement liés à la trace correspondante.

Utilisez `*` pour autoriser des noms de domaine plus larges. Par exemple, l'ajout de `https://*.datadoghq.com/*` autorise tout ce qui se trouve sur `https://datadoghq.com/`. Une fois que vous avez terminé d'ajouter des URL, cliquez sur {{< ui >}}Save APM Integration Settings{{< /ui >}}.

Pour en savoir plus, consultez la section [APM Synthetic][15].

### Collecte de données de test de navigateur Synthetic et applications RUM {#synthetic-browser-test-data-collection-and-rum-applications}

Pour permettre à Datadog de collecter des données RUM à partir de vos exécutions de tests de navigateur, cliquez sur {{< ui >}}Enable Synthetic RUM data collection{{< /ui >}}. Si cette option est désactivée, vous ne pouvez pas modifier le paramètre RUM dans l'enregistreur de tests de navigateur. Une fois l'activation de la collecte de données terminée, cliquez sur {{< ui >}}Save RUM Data Collection{{< /ui >}}.

Sélectionnez une application RUM dans le menu déroulant {{< ui >}}Default Application{{< /ui >}} qui collecte les données de test de navigateur. Une fois la spécification d'une application par défaut terminée, cliquez sur {{< ui >}}Save RUM Data Applications{{< /ui >}}.

Pour plus d'informations, consultez [Connect RUM to Synthetic Monitoring][14].

### Collecte de données de test d'application mobile Synthetic {#synthetic-mobile-application-test-data-collection}

Pour permettre à Datadog de collecter des données RUM à partir de vos exécutions de tests d'application mobile, configurez et packagez le [SDK iOS][23] ou le [SDK Android][24] RUM avec votre fichier `.ipa` ou `.apk`. Cela associe automatiquement les données RUM, vous offrant une observabilité de bout en bout des exécutions de tests.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/synthetics/settings
[2]: /fr/continuous_testing/settings/
[3]: /fr/synthetics/private_locations/
[4]: /fr/synthetics/api_tests/
[5]: /fr/synthetics/multistep/
[6]: /fr/synthetics/browser_tests/
[7]: https://app.datadoghq.com/synthetics/settings/variables
[8]: /fr/synthetics/api_tests/http_tests?tab=requestoptions#use-variables
[9]: /fr/synthetics/multistep?tab=requestoptions#use-variables
[10]: /fr/synthetics/browser_tests/?tab=requestoptions#use-global-variables
[11]: /fr/account_management/rbac/?tab=datadogapplication#datadog-default-roles
[12]: /fr/account_management/rbac/?tab=datadogapplication#custom-roles
[13]: /fr/account_management/billing/usage_attribution
[14]: /fr/synthetics/platform/rum/
[15]: /fr/synthetics/apm/#prerequisites
[16]: /fr/synthetics/browser_tests/test_steps/#use-variables
[17]: /fr/synthetics/mobile_app_testing/
[18]: /fr/synthetics/mobile_app_testing/settings/
[19]: /fr/synthetics/mobile_app_testing/#use-global-variables
[20]: https://app.datadoghq.com/synthetics/settings/default
[21]: https://app.datadoghq.com/monitors/settings/policies
[22]: /fr/account_management/rbac/granular_access
[23]: https://docs.datadoghq.com/fr/real_user_monitoring/application_monitoring/ios/setup?tab=swiftpackagemanagerspm
[24]: https://docs.datadoghq.com/fr/real_user_monitoring/application_monitoring/android/setup?tab=rum
[25]: /fr/synthetics/platform/downtime/