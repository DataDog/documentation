---
title: Paramètres Synthetics
kind: documentation
further_reading:
  - link: 'https://www.datadoghq.com/blog/introducing-synthetic-monitoring/'
    tag: Blog
    text: "Présentation de Datadog\_Synthetics"
  - link: synthetics/api_tests
    tag: Documentation
    text: Configurer un test API
  - link: synthetics/browser_tests
    tag: Documentation
    text: Configurer un test Browser
  - link: synthetics/identify_synthetics_bots
    tag: Documentation
    text: Identifier les Bots Synthetics
---
Vous pouvez définir les paramètres suivants via la [page des paramètres Synthetics][1] :

* [Variables globales](#global-variables)
* [Localisations privées][2]
* [Paramètres par défaut](#default-settings)
  * [Localisations par défaut](#default-locations)
  * [Intégration APM pour les tests Browser](#apm-integration-for-browser-tests)

Seuls les [utilisateurs Admin et Standard][3] peuvent accéder à la page `Settings` de Synthetics.

## Variables globales

Les variables ont un fonctionnement global et peuvent être utilisées par plusieurs [tests API][4] et [tests Browser][5] à la fois. Pour créer une variable globale, accédez à l'onglet **Global Variables** de votre page **Settings**, puis cliquez sur **New Global Variable** en haut à droite.  
Choisissez le type de variable que vous souhaitez créer :

{{< tabs >}}
{{% tab "Valeur spécifiée" %}}

1. Donnez un nom à votre variable en renseignant le champ **Variable Name**. Ce nom peut uniquement contenir des lettres majuscules, des chiffres et des tirets bas.
2. Indiquez la valeur souhaitée dans le champ **Value**.
3. Indiquez si votre variable doit être sécurisée ou non. La valeur des variables sécurisées est obfusquée pour tous les utilisateurs dans les résultats de votre test.
4. Facultatif : sélectionnez les **tags** à associer à votre variable.
5. Facultatif : saisissez une **description** pour votre variable.

{{< img src="synthetics/settings/variable_specifyvalue.png" alt="Variable globale avec valeur spécifiée"  style="width:80%;">}}

{{% /tab %}}

{{% tab "Création à partir d'un test HTTP" %}}

Vous pouvez créer des variables à partir de vos tests HTTP existants en analysant les en-têtes ou le corps de leur réponse. Les variables sont mises à jour à la même fréquence que le test concerné :

1. Donnez un nom à votre variable en renseignant le champ **Variable Name**. Ce nom peut uniquement contenir des lettres majuscules, des chiffres et des tirets bas.
2. Sélectionnez le test à partir duquel vous souhaitez extraire votre variable.
3. Indiquez si votre variable doit être sécurisée ou non. La valeur des variables sécurisées est obfusquée pour tous les utilisateurs dans les résultats de votre test.
4. Facultatif : sélectionnez les **tags** à associer à votre variable.
5. Facultatif : saisissez une **description** pour votre variable.
6. Indiquez si la variable doit être extraite à partir des en-têtes ou du corps de la réponse.
    * Extraire la valeur à partir d'un **en-tête de réponse** : utilisez l'en-tête complet comme variable, ou parsez l'en-tête à l'aide d'une [expression régulière][1].
    * Extraire la valeur à partir du **corps de la réponse** : parsez le corps de la réponse de la requête avec une [expression régulière][1], ou utilisez le corps entier.

{{< img src="synthetics/settings/variable_from_http.png" alt="Variable depuis un test HTTP"  style="width:80%;">}}

[1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
{{% /tab %}}

{{< /tabs >}}

## Paramètres par défaut

### Localisations par défaut

Sélectionnez les localisations par défaut des informations de tests API et Browser. Les options comprennent toutes les localisations gérées disponibles proposées par Datadog et les localisations privées que vous avez configurées pour votre compte.

### Intégration APM pour les tests Browser

Ajoutez une URL pour inclure des en-têtes d'intégration APM dans cette URL. Les en-têtes d'intégration APM de Datadog permettent à Datadog de lier les tests Browser aux données d’APM. Définissez les endpoints devant recevoir les en-têtes APM en ajoutant une URL dans cette section.

Utilisez `*` pour inclure des noms de domaine entiers. Par exemple, ajoutez `https://*.datadoghq.com/*` pour inclure toutes les adresses `https://datadoghq.com/`.

Si l'endpoint est tracé et inclus dans la liste, les résultats du test Browser sont automatiquement liés à la trace correspondante.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/synthetics/settings
[2]: /fr/synthetics/private_locations
[3]: /fr/account_management/users/default_roles/
[4]: /fr/synthetics/api_tests/#use-global-variables
[5]: /fr/synthetics/browser_tests/#use-global-variables