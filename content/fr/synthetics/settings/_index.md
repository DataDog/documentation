---
further_reading:
- link: https://www.datadoghq.com/blog/introducing-synthetic-monitoring/
  tag: Blog
  text: Présentation de la surveillance Synthetic Datadog
- link: /synthetics/api_tests/
  tag: Documentation
  text: Configurer un test API
- link: /synthetics/browser_tests/
  tag: Documentation
  text: Configurer un test Browser
- link: /synthetics/identify_synthetics_bots/
  tag: Documentation
  text: Identifier les bots Synthetic
- link: /synthetics/guide/browser-tests-totp
  tag: Documentation
  text: Mots de passe à usage unique basés sur le temps (TOTP) pour l'authentification
    multifacteur dans des tests Browser
- link: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/synthetics_global_variable
  tag: Terraform
  text: Créer et gérer des variables globales Synthetic avec Terraform
kind: documentation
title: Paramètres de la surveillance Synthetic
---

La [page des paramètres de la surveillance Synthetic][1] vous permet de définir les paramètres suivants :

* [Variables globales](#variables-globales)
* [Emplacements privés][2]
* [Paramètres par défaut](#parametres-par-defaut)

## Variables globales

Les variables globales sont des variables accessibles à partir de l'ensemble de vos tests Synthetic. Elles peuvent être utilisées dans tous les [tests API uniques][3] et [à plusieurs étapes][4], ainsi que dans les [tests Browser][5] de votre collection de tests. Pour créer une variable globale, accédez à l'onglet [Global variables][6] de la page **Settings**, puis cliquez sur **New Global Variable** en haut à droite.

Choisissez le type de variable que vous souhaitez créer :

{{< tabs >}}
{{% tab "Valeur spécifiée" %}}

1. Donnez un nom à votre variable en renseignant le champ **Variable Name**. Ce nom peut uniquement contenir des lettres majuscules, des chiffres et des underscores. Aucune autre variable globale ne doit utiliser ce nom.
2. Saisissez une **description** pour votre variable (facultatif).
3. Sélectionnez les **tags** à associer à votre variable (facultatif).
4. Saisissez la  **valeur** que vous souhaitez attribuer à votre variable.
5. Activez l'obfuscation de votre variable pour masquer sa valeur dans les résultats du test (facultatif).

{{< img src="synthetics/settings/variable_value_2.png" alt="Variable globale avec valeur spécifiée" style="width:100%;">}}

{{% /tab %}}

{{% tab "Création à partir d'un test HTTP" %}}

Vous pouvez créer des variables à partir de vos [tests HTTP][1] existants en parsant les en-têtes et le corps de la réponse associée.

1. Donnez un nom à votre variable en renseignant le champ **Variable Name**. Ce nom peut uniquement contenir des lettres majuscules, des chiffres et des tirets bas.
2. Saisissez une **description** pour votre variable (facultatif).
3. Sélectionnez les **tags** à associer à votre variable (facultatif).
4. Sélectionnez le **[test HTTP][1]** à partir duquel vous souhaitez extraire votre variable.
5. Activez l'obfuscation de votre variable pour masquer sa valeur dans les résultats du test (facultatif).
6. Indiquez si la variable doit être extraite à partir des en-têtes ou du corps de la réponse.
    * Extraire la valeur à partir d'un **en-tête de réponse** : utilisez l'en-tête complet comme variable, ou parsez l'en-tête à l'aide d'une [`regex`][2].
    * Extraire la valeur à partir du **corps de la réponse** : parsez le corps de la réponse de la requête avec une expression [`regex`][2], [`jsonpath`][3] ou [`xpath`][4], ou utilisez le corps entier.

{{< img src="synthetics/settings/variable_fromhttp_3.png" alt="Variable depuis un test HTTP" style="width:80%;">}}

**Remarque** : les valeurs des variables sont mises à jour lors de chaque exécution du test à partir duquel elles sont extraites.

[1]: /fr/synthetics/api_tests/http_tests/
[2]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
[3]: https://restfulapi.net/json-jsonpath/
[4]: https://www.w3schools.com/xml/xpath_syntax.asp
{{% /tab %}}

{{% tab "Token MFA" %}}  

Pour générer et utiliser un TOTP dans vos tests, créez une variable globale et ajoutez-y une clé de secret ou importez un code QR fourni par votre fournisseur d'authentification.

1. Sous **Choose variable type**, sélectionnez **MFA Token**.
2. Sous *Define Variable**, donnez un nom à votre variable en renseignant le champ **Variable Name**. Ce nom peut uniquement contenir des lettres majuscules, des chiffres et des tirets bas.
3. Saisissez une **description** pour votre variable (facultatif).
4. Sélectionnez les **tags** à associer à votre variable (facultatif).
5. Saisissez la **clé du secret** de votre variable ou importez une image de code QR.
6. Cliquez sur **+ Generate** pour créer un OTP. Vous pouvez copier l'OTP généré à l'aide de l'icône **Copier**.

{{< img src="synthetics/guide/browser-tests-totp/new-variable-totp.png" alt="Créer un token MFA" style="width:100%;" >}}

**Remarque** : pour en savoir plus sur l'authentification multifacteur basée sur un TOTP dans un test Browser, consultez le [guide TOTP][1].

[1]: /fr/synthetics/guide/browser-tests-totp
{{% /tab %}}

{{< /tabs >}}

Une fois les variables globales créées, elles peuvent être utilisées dans tous les tests Synthetic. Pour ce faire, saisissez `{{` dans le champ de votre choix et sélectionnez votre variable globale. Pour en savoir plus, consultez les ressources suivantes : [Test HTTP][7], [Test API à plusieurs étapes][8], [Configuration des tests Browser][9] et [Documentation relative aux étapes][10].

### Autorisations

Par défaut, seuls les utilisateurs disposant des [rôles Admin ou Standard Datadog][11] peuvent accéder à la page **Variables globales** de la surveillance Synthetic. Pour que votre utilisateur puisse consulter la page **Variables globales**, vous devez donc lui accorder l'un de ces deux [rôles par défaut][11]. 

Si vous utilisez des [rôles personnalisés][12], ajoutez votre utilisateur à un rôle personnalisé disposant des autorisations `synthetics_global_variable_read` et `synthetics_global_variable_write`.

#### Restreindre l'accès

Les clients qui ont configuré des [rôles personnalisés][13] sur leur compte peuvent utiliser la fonctionnalité de restriction d'accès.

Vous pouvez faire en sorte que certaines rôles au sein de votre organisation ne puissent pas accéder à une variable globale. Lors de la création d'une variable globale, choisissez les rôles (en plus des utilisateurs) disposant des autorisations de lecture/écriture sur votre variable globale dans **Permissions settings**. 

{{< img src="synthetics/settings/restrict_access.png" alt="Restreindre l'accès à une variable globale" style="width:100%;" >}}

## Paramètres par défaut

### Emplacements par défaut

Choisissez les emplacements par défaut pour les détails relatifs à votre [test API][3], [test API à plusieurs étapes][4] ou [test Browser][5].

Les options comprennent tous les emplacements gérés disponibles proposés par Datadog, ainsi que les emplacements privés que vous avez configurés pour votre compte.

### Intégration APM pour les tests Browser

Autorisez une URL pour inclure des en-têtes d'intégration APM dans cette URL. Les en-têtes d'intégration APM de Datadog permettent à Datadog de lier les tests Browser aux données d'APM. 

Définissez les endpoints devant recevoir les en-têtes APM en ajoutant une URL dans cette section.

Utilisez `*` pour inclure des noms de domaine entiers. Par exemple, ajoutez `https://*.datadoghq.com/*` pour inclure toutes les adresses `https://datadoghq.com/`.

Si l'endpoint est tracé et inclus dans la liste, les résultats du test Browser sont automatiquement liés à la trace correspondante.

### Application des tags

<div class="alert alert-warning">
L'application des tags est une fonctionnalité avancée incluse dans la formule Enterprise. Pour toutes les autres formules, contactez votre chargé de compte ou envoyez un e-mail à <a href="mailto:success@datadoghq.com">success@datadoghq.com</a> pour demander l'activation de cette fonctionnalité.
</div>

Cette fonctionnalité vous permet d'appliquer des tags spécifiques aux tests Synthetic. Vous pouvez visualiser les coûts et l'utilisation par équipes, applications ou services.

Pour appliquer des tags, cliquez sur **Enforce tags for usage attributions on all tests**. 

{{< img src="synthetics/settings/tag_enforcement.png" alt="Appliquer des tags pour les attributions d'utilisation sur tous les tests" style="width:100%;">}}

Pour en savoir plus, consultez la section [Attribution de l'utilisation][14].

### Autorisations

Par défaut, seuls les utilisateurs disposant des [rôles Admin ou Standard Datadog][11] peuvent accéder à la page **Paramètres par défaut** de la surveillance Synthetic. Pour que votre utilisateur puisse consulter la page **Paramètres par défaut**, vous devez donc lui accorder l'un de ces deux [rôles par défaut][11]. 

Si vous utilisez des [rôles personnalisés][12], ajoutez votre utilisateur à un rôle personnalisé disposant des autorisations `synthetics_default_settings_read` et `synthetics_default_settings_write`.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/synthetics/settings
[2]: /fr/synthetics/private_locations/
[3]: /fr/synthetics/api_tests/
[4]: /fr/synthetics/multistep/
[5]: /fr/synthetics/browser_tests/
[6]: https://app.datadoghq.com/synthetics/settings/variables
[7]: /fr/synthetics/api_tests/http_tests?tab=requestoptions#use-variables
[8]: /fr/synthetics/multistep?tab=requestoptions#use-variables
[9]: /fr/synthetics/browser_tests/?tab=requestoptions#use-global-variables
[10]: /fr/synthetics/browser_tests/actions#using-variables
[11]: /fr/account_management/rbac/?tab=datadogapplication#datadog-default-roles
[12]: /fr/account_management/rbac/?tab=datadogapplication#custom-role
[13]: /fr/account_management/rbac/#create-a-custom-role
[14]: /fr/account_management/billing/usage_attribution