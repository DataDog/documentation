---
title: Paramètres Synthetics
kind: documentation
disable_toc: true
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

- [Variables globales](#global-variables)
- [Localisations privées][2]
- [Paramètres par défaut](#default-settings)
    - [Localisations par défaut](#default-locations)
    - [Intégration APM pour les tests Browser](#apm-integration-for-browser-tests)

## Variables globales

Les variables sont globales et peuvent être utilisées par plusieurs [tests API][3] et [tests Browser][4] à la fois. Pour créer une variable globale, accédez à l'onglet **Global Variables** de votre page **Settings**, puis cliquez sur **New Global Variable** en haut à droite.  
Choisissez le type de variable que vous souhaitez créer :

{{< tabs >}}
{{% tab "Spécifier une valeur" %}}

1. Donnez un nom à votre variable en renseignant le champ **Variable Name**. Ce nom peut uniquement contenir des lettres majuscules, des chiffres et des tirets bas.
2. Indiquez la valeur souhaitée dans le champ **Value**.
3. Indiquez si votre variable doit être sécurisée ou non. Les variables sécurisées ne sont accessibles que par les membres de votre organisation que vous choisissez.
4. Facultatif : sélectionnez les **tags** à associer à votre variable.
5. Facultatif : saisissez une **description** pour votre variable.

{{< img src="synthetics/settings/variable_specifyvalue.png" alt="Variable globale avec valeur spécifiée"  style="width:80%;">}}

{{% /tab %}}

{{% tab "Créer à partir d'un test HTTP" %}}

<div class="alert alert-warning">
Cette fonctionnalité est en version bêta privée. <a href="/help">Contactez l'assistance Datadog</a> afin d'activer cette fonctionnalité pour votre compte.
</div>

1. Donnez un nom à votre variable en renseignant le champ **Variable Name**. Ce nom peut uniquement contenir des lettres majuscules, des chiffres et des tirets bas.
2. Sélectionnez le test à partir duquel vous souhaitez extraire votre variable.
3. Indiquez si votre variable doit être sécurisée ou non. Les variables sécurisées ne sont accessibles que par les membres de votre organisation que vous choisissez.
4. Facultatif : sélectionnez les **tags** à associer à votre variable.
5. Facultatif : saisissez une **description** pour votre variable.
6. Indiquez si la variable doit être extraite à partir des en-têtes ou du corps de la réponse.
    * Extraire la valeur à partir d'un **en-tête de réponse** : utiliser l'en-tête complet comme variable, ou parser l'en-tête à l'aide d'une [expression régulière][1].
    * Extraire la valeur à partir du **corps de la réponse** : parser le corps de la réponse de la requête avec un chemin JSON ou une [expression régulière][1], ou utiliser le corps entier.

{{< img src="synthetics/settings/variable_fromhttp.png" alt="Identifiant"  style="width:80%;">}}

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
[3]: /fr/synthetics/api_tests#use-global-variables
[4]: /fr/synthetics/browser_tests#use-global-variables