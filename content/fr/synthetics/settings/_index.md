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
Vous pouvez régler les paramètres suivants via la [page des paramètres Synthetics][1] :

- [Identifiants sécurisés](#secure-credentials)
- [Localisations privées][2]
- [Variables][3]
- [Paramètres par défaut](#default-settings)
    - [Localisations par défaut](#default-locations)
    - [Intégration APM pour les tests Browser](#apm-integration-for-browser-tests)

## Identifiants sécurisés

Les identifiants sécurisés sont une association sécurisée de noms d'utilisateur et de mots de passe qui peuvent être utilisés en tant que [variables][1] pour les tests Browser. Ces identifiants sont sécurisés par Datadog pour qu'uniquement un sous-ensemble d'utilisateurs choisis au sein de votre organisation puissent y accéder. Pour créer un nouvel identifiant sécurisé :

1. Cliquez sur *New Secure Credential* en haut à droite de la page des paramètres.
2. Saisissez le **nom d'un identifiant**.
3. Saisissez la paire `Username`/`Password` donnée.
4. Sélectionnez les **tags** à associer à votre identifiant.
5. Facultatif : saisissez une description pour votre identifiant.

{{< img src="synthetics/settings/credential.png" alt="Identifiant" responsive="true" style="width:80%;">}}

## Paramètres par défaut

### Localisations par défaut

Sélectionnez les localisations par défaut des informations de tests d'API et Browser. Les options comprennent toutes les localisations gérées disponibles proposées par Datadog et les localisations privées que vous avez configurées pour votre compte.

### Intégration APM pour les tests Browser

Permet d'autoriser les URL pour ajouter des en-têtes d'intégration APM à cette URL. Les en-têtes d'intégration APM de Datadog permettent à Datadog de lier les tests Browser avec l’APM. Définissez les endpoints à envoyer aux en-têtes APM en ajoutant une URL dans cette section.

Utilisez `*` pour autoriser des noms de domaine supplémentaires. Par exemple, ajoutez `https://*.datadoghq.com/*` pour autoriser toutes les adresses `https://datadoghq.com/`.

Si l'endpoint est tracé et autorisé, les résultats des tests Browser sont automatiquement liés à la trace correspondante.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}
[1]: https://app.datadoghq.com/synthetics/settings
[2]: /fr/synthetics/private_locations
[3]: /fr/synthetics/browser_tests/#variable