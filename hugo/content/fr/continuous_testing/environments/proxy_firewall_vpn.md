---
description: Découvrez comment configurer Continuous Testing sur un environnement
  privé.
further_reading:
- link: https://www.datadoghq.com/blog/datadog-synthetic-ci-cd-testing/
  tag: Blog
  text: Intégrer vos tests continus Datadog dans votre pipeline de CI/CD
- link: https://www.datadoghq.com/blog/internal-application-testing-with-datadog/
  tag: Blog
  text: Tester des applications internes avec le tunnel de test et les emplacements
    privés de Datadog
- link: /continuous_testing/cicd_integrations
  tag: Documentation
  text: En savoir plus sur les tests continus et CI/CD
title: Tester avec des proxies, des pare-feu ou des VPN
---

## Présentation

La majeure partie du cycle de développement se déroule au sein de réseaux privés, qui sont généralement inaccessibles aux tests Synthetic. Avec l'aide de [`datadog-ci`][2], vous pouvez établir un tunnel Continuous Testing qui permet aux Workers Synthetics d'atteindre les environnements sur lesquels votre application est déployée pendant le cycle de développement, tels que votre ordinateur portable de développement, une tâche CI ou un environnement de staging privé.

Datadog recommande d'utiliser le tunnel de test si vous avez besoin de lancer des tests Continuous Testing sur des versions locales de votre application sans déployer un système de test dédié et durable tel qu'un [emplacement privé][1]. Vous pouvez également utiliser le tunnel de test pour déclencher des tests sur des environnements en nuage de courte durée.

## En quoi consiste un tunnel de test ?

Le tunnel de tests est une fonctionnalité fournie avec le package NPM [@datadog/datadog-ci][2], qui est l'une des méthodes que Datadog propose pour inclure vos tests Synthetic dans vos pipelines CI/CD.

Le tunnel de tests crée des connexions sécurisées éphémères entre vos environnements internes et l'infrastructure Datadog, vous permettant de déclencher rapidement des tests Synthetic HTTP et Browser sur vos applications privées. Cela permet à Datadog d'accéder à vos applications internes et de les tester.

{{< img src="continuous_testing/testing_tunnel.png" alt="Le tunnel Continuous Testing permet au Worker Synthetics d'atteindre vos applications privées" width="100%" >}}

Tout d'abord, `datadog-ci` obtient une URL pré-signée auprès de Datadog pour l'authentification. Ensuite, il ouvre une connexion WebSocket sécurisée (WSS) vers les emplacements gérés de Datadog à l'aide de l'URL pré-signée. En utilisant des connexions SSH via la connexion WebSocket, les tests sont déclenchés par `datadog-ci` et exécutés via les emplacements gérés de Datadog.

Étant donné que la résolution DNS est effectuée via le tunnel de tests, vous pouvez tester des applications avec des domaines internes ou même sur le `localhost` de la machine exécutant `datadog-ci`.

Lorsque vous utilisez le tunnel de test, les emplacements de vos tests sont remplacés par un emplacement qui dépend de la région associée à votre compte Datadog.

## Comment utiliser le tunnel de test

Comme mentionné ci-dessus, le tunnel de tests est fourni avec le package NPM [`@datadog/datadog-ci`][2] et est disponible dans les versions `>=v0.11.0` du package. Pour commencer, consultez la section [Continuous Testing et CI/CD][3].

Une fois que vous avez configuré votre client sur votre machine locale ou votre serveur CI, vous pouvez lancer vos tests HTTP et Browser avec le tunnel de tests en ajoutant `--tunnel` à la commande utilisée pour lancer les tests.

Par exemple, si vous utilisez un fichier de configuration globale, vous pouvez utiliser ce qui suit :

```sh
datadog-ci synthetics run-tests --config <FICHIER_CONFIGURATION_GLOBALE>.json --tunnel
```

### Exigences relatives au pare-feu

Autoriser les **connexions sortantes** pour les endpoints Datadog suivants :

{{< site-region region="us" >}}

| Port | Endpoint                                                                                             | Rôle                                                                                                                             |
| ---- | ---------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| 443 | {{< region-param key="synthetics_tunnel_endpoint" code="true" >}}   | Requis pour ouvrir la connexion WSS depuis le client `datadog-ci` vers le service de tunnel. |
| 443 | `intake.synthetics.datadoghq.com` | Requis pour obtenir l'URL présignée et déclencher les tests Synthetic. |
| 443 | {{< region-param key="api_endpoint" code="true" >}} | Requis pour rechercher des tests Synthetic, les récupérer et interroger leurs résultats. |

{{< /site-region >}}
{{< site-region region="us3,us5,eu,ap1,ap2" >}}

| Port | Endpoint                                                                                             | Description                                                                                                                             |
| ---- | ---------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| 443 | {{< region-param key="synthetics_tunnel_endpoint" code="true" >}}   | Requis pour ouvrir la connexion WSS depuis le client `datadog-ci` vers le service de tunnel. |
| 443 | {{< region-param key="api_endpoint" code="true" >}} | Requis pour obtenir l'URL présignée, rechercher des tests Synthetic, les récupérer, les déclencher et interroger leurs résultats. |

{{< /site-region >}}
{{< site-region region="eu" >}}

**Remarque **: bien que le domaine de premier niveau du service de tunnelisation ait une extension en `.com` (et pas `.eu`), l'endpoint se situe dans l'UE (région AWS Frankfurt).

{{< /site-region >}}

## Utiliser le tunnel de tests avec plusieurs environnements

Le tunnel de tests peut être configuré pour fonctionner avec plusieurs environnements, y compris `localhost`, en utilisant les champs `startUrl`, `startUrlSubstitutionRegex` et `resourceUrlSubstitutionRegexes`. Ces champs vous permettent de substituer des parties de l'URL de départ et des URL de ressources en fonction des expressions régulières fournies, vous permettant de rediriger les requêtes vers différents environnements pendant l'exécution du test.

Par exemple, vous pouvez réutiliser le test programmé en production pour l'exécuter sur votre environnement de développement avec `startUrl` et `startUrlSubstitutionRegex`. Vous pouvez également rediriger les requêtes de ressources frontend vers un environnement de développement local tout en conservant la page principale et les appels d'API servis par l'environnement de production. Cela est utile pour tester des modifications de manière isolée sans avoir besoin de déployer l'ensemble de l'application.

Pour utiliser ces options, spécifiez les valeurs appropriées dans les champs `startUrl`, `startUrlSubstitutionRegex` et `resourceUrlSubstitutionRegexes`. Les champs `startUrl` et `startUrlSubstitutionRegex` vous permettent de modifier l'URL de départ, tandis que le champ `resourceUrlSubstitutionRegexes` vous permet de modifier les URL de toutes les requêtes de ressources suivantes.

Pour `resourceUrlSubstitutionRegexes`, spécifiez un tableau de chaînes, chacune contenant deux parties séparées par un caractère pipe `|` : `<regex>|<rewriting rule>`. La première partie est le regex à appliquer à l'URL de ressource, et la seconde est l'expression pour réécrire l'URL.

Exemple :

```text
https://prod.my-app.com/assets/(.*)|http://localhost:3000/assets/$1
```

Cette expression régulière capture le chemin de l'URL de ressource et la réécrit pour pointer vers l'environnement de développement local. Étant donné l'URL `https://prod.my-app.com/assets/js/chunk-123.js`, elle serait réécrite en `http://localhost:3000/assets/js/chunk-123.js`.

Cette fonctionnalité vous permet de tester des parties spécifiques de votre application dans différents environnements, y compris `localhost`, garantissant que les modifications sont correctement validées avant d'être déployées en production.

Vous pouvez en savoir plus sur ces options dans la section [Tester plusieurs environnements][4].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/synthetics/private_locations
[2]: https://www.npmjs.com/package/@datadog/datadog-ci
[3]: /fr/continuous_testing/cicd_integrations#use-the-cli
[4]: /fr/continuous_testing/environments/multiple_env