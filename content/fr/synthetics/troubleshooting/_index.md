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

### Erreurs Unauthorized

Si l'un de vos tests Synthetics renvoie une erreur 401, c'est probablement qu'il ne parvient pas à s'authentifier auprès de l'endpoint. Lorsque vous configurez votre test Synthetics, assurez-vous d'utiliser la même méthode d'authentification que celle que vous utilisez en dehors de Datadog.

* Votre endpoint utilise-t-il une **authentification par en-têtes** ?
  * **Authentification basique** : spécifiez les identifiants requis dans les **Advanced options** de votre [test HTTP][2] ou [test Browser][3].
  * **Authentification par token** : commencez par extraire votre token avec un premier [test HTTP][2], créez une [variable globale][4] en parsant la réponse de ce premier test, et réinjectez cette variable dans un second [test HTTP][5] ou [test Browser][6] nécessitant le token d'authentification.
  * **Authentification par session** : ajoutez les en-têtes ou cookies requis dans les **Advanced options** de votre [test HTTP][2] ou [test Browser][3].

* L'endpoint utilise-t-il les **paramètres de requête pour l'authentification** ? (Avez-vous besoin d'ajouter une clé d'API spécifique dans vos paramètres d'URL ?)

* L'endpoint utilise-t-il une **authentification en fonction de l'IP** ? Dans ce cas, vous devrez peut-être autoriser une partie ou l'ensemble des [IP à l'origine des tests Synthetics][7].

### Erreurs Forbidden

Lorsque vous créez un test Synthetics, il est possible d'obtenir une erreur `403 Forbidden`. Cette erreur est causée par l'en-tête `Sec-Datadog: Request sent by a Datadog Synthetics Browser Test (https://docs.datadoghq.com/synthetics/) - test_id: <ID_TEST>` qui est automatiquement envoyé par Datadog.
Vérifiez que vos serveurs ne rejettent pas automatiquement les requêtes contenant cet en-tête.
Vous devrez peut-être également autoriser les [plages d'IP utilisées par Datadog Synthetics][7] pour vous assurer que votre infrastructure accepte les requêtes envoyées par les serveurs Datadog.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/help/
[2]: /fr/synthetics/api_tests/?tab=httptest#make-a-request
[3]: /fr/synthetics/browser_tests/#test-details
[4]: /fr/synthetics/settings/?tab=createfromhttptest#global-variables
[5]: /fr/synthetics/api_tests/?tab=httptest#use-global-variables
[6]: /fr/synthetics/browser_tests/#use-global-variables
[7]: https://ip-ranges.datadoghq.com/synthetics.json