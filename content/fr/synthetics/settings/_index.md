---
further_reading:
- link: https://www.datadoghq.com/blog/introducing-synthetic-monitoring/
  tag: Blog
  text: Présentation de la surveillance Synthetic Datadog
- link: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/synthetics_global_variable
  tag: Terraform
  text: Créer et gérer des variables globales Synthetic avec Terraform
- link: /synthetics/api_tests/
  tag: Documentation
  text: Configurer un test API
- link: /synthetics/multistep/
  tag: Documentation
  text: Configurer un test API à plusieurs étapes
- link: /synthetics/browser_tests/
  tag: Documentation
  text: Configurer un test Browser
- link: /mobile_app_testing/mobile_app_tests
  tag: Documentation
  text: Configurer un test mobile
- link: /synthetics/private_locations/
  tag: Documentation
  text: Créer un emplacement privé
- link: /synthetics/guide/explore-rum-through-synthetics/
  tag: Documentation
  text: Explorer vos données RUM et Session Replay dans Synthetics
- link: /synthetics/guide/browser-tests-totp
  tag: Documentation
  text: Mots de passe à usage unique basés sur le temps (TOTP) pour l'authentification
    multifacteur dans des tests Browser
kind: documentation
title: Paramètres de la surveillance Synthetic
---

## Présentation

Depuis la page [Synthetic Monitoring & Continuous Testing Settings][1], vous pouvez consulter et modifier les paramètres et fonctionnalités ci-dessous :

* [Paramètres par défaut](#parametres-par-defaut)
* [Emplacements privés](#emplacements-prives)
* [Variables globales](#variables-globales)
* [Paramètres d'intégration](#parametres-d-integration)
* [Paramètres des tests continus][2]
* [Paramètres des applications mobiles][18]

## Paramètres par défaut

### Paramètres des tags obligatoires

Depuis la page Usage Attribution, vous pouvez configurer jusqu'à trois tags servant à répartir les attributs de coût et d'utilisation. Sélectionnez l'option **Enforce tags for usage attribution on all tests** pour forcer les utilisateurs à saisir tous les tags d'attribution d'utilisation lors de la création ou de la modification de tests Synthetic. Lorsque ce paramètre est activé, il n'est pas possible d'enregistrer un test ne comportant pas tous les tags requis.

### Emplacements par défaut

Choisissez les emplacements par défaut pour les détails relatifs à votre [test API][4], [test API à plusieurs étapes][5] ou [test Browser][6].

Les options comprennent tous les emplacements gérés disponibles proposés par Datadog, ainsi que les emplacements privés que vous avez configurés pour votre compte.

Une fois les emplacements sélectionnés, cliquez sur **Save Default Locations**.

### Appareils et navigateurs par défaut

Choisissez les types d'appareils et de navigateurs par défaut pour les détails relatifs à votre [test Browser][6].

Les navigateurs Google Chrome, Mozilla Firefox et Microsoft Edge sont disponibles. Pour les navigateurs, vous pouvez choisir parmi un grand ordinateur portable, une tablette et un petit appareil mobile.

Une fois vos navigateurs et appareils sélectionnés, cliquez sur **Save Default Browsers & Devices**.

### Tags par défaut

Choisissez ou ajoutez les tags par défaut pour les détails relatifs à votre [test API][4], [test API à plusieurs étapes][5] ou [test Browser][6].

Une fois les tags associés sélectionnés, cliquez sur **Save Default Tags**.

### Autorisations

Par défaut, seuls les utilisateurs disposant des [rôles Admin ou Standard Datadog][11] peuvent accéder à la page **Paramètres par défaut** de la surveillance Synthetic. Pour que votre utilisateur puisse consulter la page **Paramètres par défaut**, vous devez donc lui accorder l'un de ces deux [rôles par défaut][11]. 

Si vous utilisez des [rôles personnalisés][12], ajoutez votre utilisateur à un rôle personnalisé disposant des autorisations `synthetics_default_settings_read` et `synthetics_default_settings_write`.

## Paramètres d'intégration

{{< img src="synthetics/settings/integration_settings.png" alt="Page Integration Settings" style="width:100%;">}}

### Intégration APM pour les tests Browser

Les en-têtes des intégrations APM Datadog permettent à Datadog d'associer des tests Browser à APM.

Pour définir les endpoints vers lesquels vous souhaitez envoyer les en-têtes APM, ajoutez des URL à la liste **Value**. Si les endpoints sont tracés et autorisés, les résultats de votre test Browser sont automatiquement associés à la trace correspondante.

Utilisez le caractère `*` pour inclure des noms de domaine entiers. Par exemple, ajoutez `https://*.datadoghq.com/*` pour inclure toutes les adresses `https://datadoghq.com/`. Une fois les URL ajoutées, cliquez sur **Save APM Integration Settings**.

Pour en savoir plus, consultez la section [APM Synthetic][15].

### Collecte de données Synthetic et applications RUM

Pour autoriser Datadog à recueillir les données RUM de vos exécutions de test, cliquez sur **Enable Synthetic RUM data collection**. Lorsque cette option est désactivée, vous ne pouvez pas modifier les paramètres RUM dans l'outil d'enregistrement de test Browser. Pour appliquer vos modifications, cliquez sur **Save RUM Data Collection**.

Sélectionnez l'application par défaut à laquelle les nouveaux tests Browser doivent envoyer les données. Utilisez le menu déroulant **Default Application** pour sélectionner une application RUM qui recueille les données de test Browser. Pour appliquer vos modifications, cliquez sur **Save RUM Data Applications**.

Pour en savoir plus, consultez la section [Explorer vos données RUM et Session Replay dans Synthetics][14].

## Emplacements privés

Pour en savoir plus, consultez la section [Exécuter des tests Synthetic à partir d'emplacements privés][3].

## Variables globales

Les variables globales sont accessibles depuis l'ensemble de vos tests Synthetic. Vous pouvez les utiliser dans tous les [tests uniques][4], [tests API à plusieurs étapes][5], [tests Browser][6] et [tests d'application mobile][17] de votre collection de tests.

Pour créer une variable globale, accédez à l'onglet **Global Variables** depuis [**Synthetic Monitoring & Continuous Testing** > **Settings**][7], puis cliquez sur **+ New Global Variable**.

Choisissez le type de variable que vous souhaitez créer :

{{< tabs >}}
{{% tab "Valeur spécifiée" %}}

1. Donnez un nom à votre variable en renseignant le champ **Variable Name**. Ce nom peut uniquement contenir des lettres majuscules, des chiffres et des underscores. Aucune autre variable globale ne doit utiliser ce nom.
2. Si vous le souhaitez, saisissez une **description**, puis sélectionnez des **tags** à associer à votre variable.
3. Saisissez la **valeur** que vous souhaitez attribuer à votre variable.
4. Activez l'obfuscation de votre variable pour masquer sa valeur dans les résultats du test (facultatif).

{{< img src="synthetics/settings/variable_value_2.png" alt="Variable globale avec valeur spécifiée" style="width:100%;">}}

{{% /tab %}}

{{% tab "Création à partir d'un test" %}}

Vous pouvez créer des variables à partir de vos [tests HTTP][1] existants, en parsant leur corps et leurs en-têtes de réponse associés, ou à partir de vos [tests API à plusieurs étapes][2] existants, à l'aide de leurs variables extraites.

{{< img src="synthetics/settings/global_variable.png" alt="Variables disponibles pouvant être extraites à partir d'un test API à plusieurs étapes" style="width:100%;" >}}

1. Donnez un nom à votre variable en renseignant le champ **Variable Name**. Ce nom peut uniquement contenir des lettres majuscules, des chiffres et des tirets bas.
2. Si vous le souhaitez, saisissez une **description**, puis sélectionnez des **tags** à associer à votre variable.
3. Activez l'obfuscation de votre variable pour masquer sa valeur dans les résultats du test (facultatif).
4. Sélectionnez le **test** à partir duquel vous souhaitez extraire une variable.
5. Pour un test API à plusieurs étapes, extrayez votre variable locale à partir du test. Pour un test HTTP, choisissez si vous souhaitez extraire la variable à partir de l'en-tête ou du corps de la réponse.

    * Pour extraire la valeur à partir d'un **en-tête de réponse** : utilisez l'en-tête complet comme variable, ou parsez l'en-tête à l'aide d'une expression [`regex`][3].
    * Pour extraire la valeur à partir du **corps de la réponse** : parsez le corps de la réponse de la requête avec une expression [`regex`][3], [`jsonpath`][4] ou [`xpath`][5], ou utilisez le corps entier.
    * Extrayez la valeur à partir du **code de statut de la réponse**.

Il est non seulement possible d'extraire une valeur à partir d'une regex, mais également d'utiliser une [regex][3] afin d'appliquer les logiques de parsing suivantes :

  - Ne pas renvoyer simplement la première instance d'un pattern, mais toutes ses instances
  - Ignorer la casse du pattern
  - Renvoyer des chaînes réparties sur plusieurs lignes
  - Considérer le pattern de regex passé comme de l'unicode
  - Autoriser les symboles de point pour l'identification de nouvelles lignes
  - Renvoyer des résultats provenant d'un index donné au seni d'un pattern de regex
  - Remplacer le pattern de recherche par une valeur spécifique

{{< img src="synthetics/settings/parsing_regex_field.png" alt="Parser le corps de réponse d'un test HTTP avec une regex" style="width:80%;">}}

Les valeurs des variables sont mises à jour lors de chaque exécution du test à partir duquel elles sont extraites.

[1]: /fr/synthetics/api_tests/http_tests/
[2]: /fr/synthetics/multistep/
[3]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
[4]: https://restfulapi.net/json-jsonpath/
[5]: https://www.w3schools.com/xml/xpath_syntax.asp
{{% /tab %}}

{{% tab "Token MFA" %}}  

Pour générer et utiliser un TOTP dans vos tests, créez une variable globale et ajoutez-y une clé de secret ou importez un code QR fourni par votre fournisseur d'authentification.

1. Sous **Choose variable type**, sélectionnez **MFA Token**.
2. Sous **Define Variable**, donnez un nom à votre variable en renseignant le champ **Variable Name**. Ce nom peut uniquement contenir des lettres majuscules, des chiffres et des tirets bas.
3. Si vous le souhaitez, saisissez une **description**, puis sélectionnez des **tags** à associer à votre variable.
4. Saisissez la **clé du secret** de votre variable ou importez une image de code QR.
5. Cliquez sur **+ Generate** pour créer un OTP. Vous pouvez copier l'OTP généré à l'aide de l'icône **Copier**.

{{< img src="synthetics/guide/browser-tests-totp/new-variable-totp.png" alt="Créer un token MFA" style="width:100%;" >}}

Pour en savor plus sur l'autorisation multifacteur basée sur un TOTP dans un test Browser, consultez la section [Mots de passe à usage unique basés sur le temps (TOTP) pour l'authentification multifacteur dans des tests Browser][1].

[1]: /fr/synthetics/guide/browser-tests-totp
{{% /tab %}}
{{% tab "Authentificateur virtuel" %}}

Pour terminer un parcours utilisateur avec une clé d'accès dans vos tests Synthetic, créez une variable globale de type Authentificateur virtuel. Cette variable globale permet de générer et de stocker des clés d'accès pour l'ensemble de vos tests Browser Synthetic. Pour en savoir plus, consultez la section [Utiliser des clés d'accès (FIDO2) dans des tests Browser][1].

1. Accédez à l'onglet **Global Variables** depuis [**Synthetic Monitoring & Continuous Testing** > **Settings**][1], puis cliquez sur **+ New Global Variable**.

1. Depuis la section **Choose variable type**, sélectionnez **Virtual Authenticator**.
2. Depuis la section **Specify variable details**, saisissez un **nom de variable**. Votre nom de variable peut uniquement contenir des lettres majuscules, des chiffres et des underscores.
3. Si vous le souhaitez, saisissez une **description**, puis sélectionnez des **tags** à associer à votre variable. Datadog crée alors un authentificateur virtuel permettant de générer et de stocker vos clés d'accès.
4. Depuis la section **Permissions settings**, limitez l'accès à votre variable à certains rôles de votre organisation. Pour en savoir plus sur les rôles, consultez la [documentation relative au RBAC][2].

{{< img src="synthetics/guide/browser-tests-passkeys/new-variable-virtual-authenticator.png" alt="Créer un authentificateur virtuel" style="width:80%;" >}}

[1]: /fr/synthetics/guide/browser-tests-passkeys
[2]: /fr/account_management/rbac/?tab=datadogapplication#custom-roles
{{% /tab %}}
{{< /tabs >}}

Une fois vos variables globales créées, vous pouvez les utiliser dans n'importe quel test Synthetic. Pour importer une variable globale dans un test, cliquez sur **+ Variables**, saisissez `{{` dans le champ où vous souhaitez ajouter la variable, puis sélectionnez votre variable globale.


Pour en savoir plus sur les variables, consultez la documentation relative aux [tests HTTP][8], aux [tests API à plusieurs étapes][9], aux [tests Browser][10], aux [tests d'application mobile][19] ainsi qu'aux [étapes des tests Browser][16].

### Autorisations

Par défaut, seuls les utilisateurs disposant des [rôles Admin ou Standard Datadog][11] peuvent accéder à la page **Variables globales** de la surveillance Synthetic. Pour que votre utilisateur puisse consulter la page **Variables globales**, vous devez donc lui accorder l'un de ces deux [rôles par défaut][11].

Si vous utilisez des [rôles personnalisés][12], ajoutez votre utilisateur à un rôle personnalisé disposant des autorisations `synthetics_default_settings_read` et `synthetics_default_settings_write`.

### Restreindre l'accès

Les clients qui ont configuré des [rôles personnalisés][11] sur leur compte peuvent utiliser la fonctionnalité de restriction d'accès. Si vous utilisez des [rôles personnalisés][12], ajoutez votre utilisateur à un rôle personnalisé disposant des autorisations `synthetics_global_variable_read` et `synthetics_global_variable_write`.

Vous pouvez faire en sorte que certains rôles au sein de votre organisation ne puissent pas accéder à une variable globale. Lors de la création d'une variable globale, choisissez les rôles (en plus des utilisateurs) disposant des autorisations de lecture/écriture sur votre variable globale dans **Permissions settings**. 

{{< img src="synthetics/settings/restrict_access_1.png" alt="Restreindre l'accès à une variable globale" style="width:100%;" >}}

## Paramètres d'intégration

{{< img src="synthetics/settings/integration_settings.png" alt="Page Integration Settings" style="width:100%;">}}

### Intégration APM pour les tests Browser

Autorisez des URL pour inclure des en-têtes d'intégration APM dans ces URL. Les en-têtes d'intégration APM de Datadog permettent à Datadog d'associer des tests Browser à APM. 

Pour définir les endpoints vers lesquels vous souhaitez envoyer les en-têtes APM, saisissez des URL dans le champ **Value**. Si les endpoints sont tracés et autorisés, les résultats de votre test Browser sont automatiquement associés à la trace correspondante.

Utilisez le caractère `*` pour inclure des noms de domaine entiers. Par exemple, ajoutez `https://*.datadoghq.com/*` pour inclure toutes les adresses `https://datadoghq.com/`. Une fois les URL ajoutées, cliquez sur **Save APM Integration Settings**. 

Pour en savoir plus, consultez la section [APM Synthetic][15].

### Collecte de données Synthetic et applications RUM

Pour autoriser Datadog à recueillir les données RUM de vos exécutions de test, cliquez sur **Enable Synthetic RUM data collection**. Lorsque cette option est désactivée, vous ne pouvez pas modifier les paramètres RUM dans l'outil d'enregistrement de test Browser. Une fois la collecte de données activée, cliquez sur **Save RUM Data Collection**.

Depuis le menu déroulant **Default Application**, sélectionnez une application RUM qui recueille les données de test Browser. Une fois l'application par défaut définie, cliquez sur **Save RUM Data Applications**.

Pour en savoir plus, consultez la section [Explorer vos données RUM et Session Replay dans Synthetics][14].

## Pour aller plus loin

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
[14]: /fr/synthetics/guide/explore-rum-through-synthetics/
[15]: /fr/synthetics/apm/#prerequisites
[16]: /fr/synthetics/browser_tests/actions/#use-variables
[17]: /fr/mobile_app_testing/mobile_app_tests/
[18]: /fr/mobile_app_testing/settings/
[19]: /fr/mobile_app_testing/mobile_app_tests/#use-global-variables