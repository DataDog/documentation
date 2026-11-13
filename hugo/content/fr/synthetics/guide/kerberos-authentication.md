---
further_reading:
- link: https://www.datadoghq.com/blog/synthetic-private-location-monitoring-datadog
  tag: Blog
  text: Surveiller vos emplacements privés Synthetic avec Datadog
- link: https://www.datadoghq.com/blog/kerberos-synthetics/
  tag: Blog
  text: Surveillez de manière proactive les applications web et les API authentifiées
    par Kerberos avec Datadog Synthetics
- link: /synthetics/guide/browser-tests-passkeys
  tag: Guide
  text: Découvrez les Passkeys dans les tests de navigateur
products:
- icon: browser
  name: Test Browser
  url: /synthetics/browser_tests/
- icon: api
  name: Tests API
  url: /synthetics/api_tests/
title: Authentification Kerberos pour Synthetic Monitoring
---
{{< product-availability names="Browser Tests,API Tests" >}}

## Présentation {#overview}

Datadog Synthetic Monitoring permet une surveillance proactive des applications web et des API utilisant l'authentification SSO Kerberos avec Microsoft Active Directory. Cela permet de tester en continu les parcours utilisateur critiques et les endpoints HTTP sur vos sites Windows internes.

## Prérequis {#prerequisites}

- Un emplacement privé Windows (les emplacements gérés ne prennent pas en charge l'authentification Kerberos).
- Un site Windows avec authentification Kerberos intégrée à Active Directory (généralement hébergé sur IIS).
- Un serveur Windows joint au domaine Active Directory.
- Un compte utilisateur de domaine disposant d'un accès d'authentification Active Directory au site Windows.
- Les tests de Synthetic Monitoring doivent s'exécuter sur un emplacement privé Windows configuré pour s'authentifier auprès d'Active Directory. Pour en savoir plus, consultez la documentation sur les prérequis des [emplacements privés Windows][1].

## Installation {#installation}

1. Créez votre [emplacement privé Windows][2] sur le serveur Windows joint au domaine Active Directory.
2. Configurez le [worker d'emplacement privé Synthetic Monitoring][3] pour qu'il s'exécute en tant que service Windows.
3. Configurez le service d'emplacement privé pour utiliser les identifiants de votre compte de domaine Active Directory :
   - Ouvrez `services.msc`, accédez à {{< ui >}}Datadog Synthetics Worker{{< /ui >}} > {{< ui >}}Properties{{< /ui >}} > {{< ui >}}log on{{< /ui >}} > {{< ui >}}this account{{< /ui >}}, et saisissez les identifiants de votre compte de domaine.
4. Configurez vos tests :
   - **Tests de navigateur** : Enregistrez votre test à partir d'une session de navigateur s'exécutant directement sur un host Windows joint au domaine. Par exemple, connectez-vous à votre emplacement privé Windows via le protocole RDP (Remote Desktop Protocol) et effectuez l'enregistrement à partir de là. L'enregistrement depuis une machine située en dehors du domaine Active Directory envoie des requêtes sur l'Internet public sans aucun identifiant Kerberos associé, ce qui provoque l'affichage d'une invite de connexion.
   - **Tests d'API** : Renseignez le champ {{< ui >}}Domain{{< /ui >}} sous l'onglet {{< ui >}}Kerberos{{< /ui >}} avec le Service Principal Name (SPN) complet du service cible. Par exemple, `HTTP/targetsite.yourdomain.com`, ou `HTTP/targetsite.yourdomain.com:port` si le site est enregistré avec un port non standard.

{{< img src="synthetics/guide/kerberos-authentication/api_test_kerberos.png" alt="Création d'un test d'API avec les options avancées déployées, mettant en évidence l'onglet Authentification et le type d'authentification Kerberos" style="width:80%;" >}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/synthetics/platform/private_locations?tab=windows#prerequisites
[2]: /fr/synthetics/platform/private_locations?tab=windows#create-your-private-location
[3]: /fr/synthetics/platform/private_locations/?tab=windowsviagui#install-your-private-location