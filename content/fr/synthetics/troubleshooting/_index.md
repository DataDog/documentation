---
title: Dépannage de Synthetics
kind: documentation
description: Résolvez les problèmes courants rencontrés avec Synthetics.
further_reading:
  - link: 'https://www.datadoghq.com/synthetics/'
    tag: Documentation
    text: Gérer vos tests Synthetics
  - link: synthetics/browser_tests
    tag: Documentation
    text: Configurer un test Browser
  - link: synthetics/api_tests
    tag: Documentation
    text: Configurer un test API
---
Si vous rencontrez un problème durant la configuration de Synthetics, utilisez cette page pour effectuer un premier dépannage. Si votre problème persiste, [contactez notre formidable équipe d'assistance][1].

## Tests API

### Échec des requêtes vers un endpoint fonctionnel

Parfois, vous savez pertinemment que votre endpoint est fonctionnel car vous obtenez un code de statut `2xx` lorsque vous accédez à votre site depuis un navigateur (ou que vous faites un cURL sur l'URL). Pourtant, lorsque vous créez un test API sur cet endpoint ou que vous cliquez sur `Test URL` pour vérifier qu'elle fonctionne, vous obtenez un code de statut `5xx` ou `4xx`.

Ce problème survient parce que cURL définit automatiquement un `user-agent` en tant qu'en-tête de requête (en imitant votre navigateur), tandis que les tests API Datadog n'en définissent aucun automatiquement.
Étant donné que certains sites refusent les requêtes pour lesquelles aucun `user-agent` n'est défini, les tests API Datadog renvoient alors un code de statut `5xx` ou `4xx`.

Pour résoudre ce problème, vous devez définir un `user-agent` manuellement dans vos tests API. Définissez le `user-agent` dans votre test API en accédant à **Make a request** > **Advanced Options** > **Header** > **Request Header**. Définissez le champ **Name** sur `user-agent` et le champ **Value** sur n'importe quel `user-agent` valide, tel que `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/601.3.9 (KHTML, like Gecko) Version/9.0.2 Safari/601.3.9` pour un ordinateur tournant sous Mac OS X avec le navigateur Safari.


{{< img src="synthetics/user-agent.gif" alt="Page d'accueil de Synthetics" responsive="true">}}

## Tests API et tests Browser

### Erreurs Forbidden

Lorsque vous créez un test Synthetics, il est possible d'obtenir une erreur `403 Forbidden`. Cette erreur est causée par l'en-tête `Sec-Datadog: Request sent by a Datadog Synthetics Browser Test (https://docs.datadoghq.com/synthetics/) - test_id: <ID_TEST>` qui est automatiquement envoyé par Datadog.    
Vérifiez que vos serveurs ne rejettent pas automatiquement les requêtes contenant cet en-tête.
Vous devrez peut-être également autoriser les [plages d'IP utilisées par Datadog Synthetics][2] pour vous assurer que votre infrastructure accepte les requêtes envoyées par les serveurs Datadog.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/help
[2]: https://ip-ranges.datadoghq.com/synthetics.json