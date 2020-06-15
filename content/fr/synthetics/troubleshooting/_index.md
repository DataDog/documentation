---
title: Dépannage de Synthetics
kind: documentation
description: Résolvez les problèmes courants rencontrés avec Synthetics.
further_reading:
  - link: /synthetics/
    tag: Documentation
    text: Gérer vos tests Synthetics
  - link: /synthetics/browser_tests/
    tag: Documentation
    text: Configurer un test Browser
  - link: /synthetics/api_tests/
    tag: Documentation
    text: Configurer un test API
---
Si vous rencontrez un problème durant la configuration de Synthetics, utilisez cette page pour effectuer un premier dépannage. Si votre problème persiste, [contactez notre formidable équipe d'assistance][1].

## Tests Browser

### Je ne vois pas la page de connexion dans l'outil d'enregistrement. Que se passe-t-il ?

Par défaut, l'iframe/la fenêtre de l'outil d'enregistrement utilise votre propre navigateur. Cela signifie que si vous êtes déjà connecté à votre application, il est possible que l'iframe/la fenêtre affiche directement la page qui suit l'écran de connexion, vous empêchant alors d'enregistrer vos étapes de connexion sans vous déconnecter au préalable.

Pour enregistrer vos étapes de connexion sans vous déconnecter de votre application, utilisez simplement le **mode navigation privée** de l'outil d'enregistrement :

{{< img src="synthetics/incognito_mode.mp4" alt="Utiliser le mode navigation privée dans un test Browser" video="true"  width="90%" >}}

L'option **Open pop up in Incognito mode** vous permet de démarrer l'enregistrement de votre test depuis l'URL de départ configurée et dans une session entièrement distincte de la session principale de votre navigateur.

La fenêtre de navigation privée qui s'ouvre alors ignore toutes vos anciennes données de navigation (cookies, données locales, etc.). Ainsi, vous êtes automatiquement déconnecté de votre compte et pouvez enregistrer vos étapes de connexion comme si vous consultiez votre site pour la première fois.

## Tests API et tests Browser

### Erreurs Forbidden

Lorsque vous créez un test Synthetics, il est possible d'obtenir une erreur `403 Forbidden`. Cette erreur est causée par l'en-tête `Sec-Datadog: Request sent by a Datadog Synthetics Browser Test (https://docs.datadoghq.com/synthetics/) - test_id: <ID_TEST>` qui est automatiquement envoyé par Datadog.
Vérifiez que vos serveurs ne rejettent pas automatiquement les requêtes contenant cet en-tête.
Vous devrez peut-être également autoriser les [plages d'IP utilisées par Datadog Synthetics][2] pour vous assurer que votre infrastructure accepte les requêtes envoyées par les serveurs Datadog.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/help/
[2]: https://ip-ranges.datadoghq.com/synthetics.json