---
title: Tunnel de test Synthetic
kind: documentation
description: Exécutez des tests CI/CD en local et à distance avec le tunnel de test Synthetic de Datadog.
further_reading:
  - link: https://www.datadoghq.com/blog/datadog-synthetic-ci-cd-testing/
    tag: Blog
    text: Intégrer des tests Datadog Synthetic dans votre pipeline de CI/CD.
  - link: https://learn.datadoghq.com/enrol/index.php?id=37
    tag: Centre d'apprentissage
    text: Découvrir comment exécuter des tests Synthetic dans des pipelines de CI/CD
  - link: https://www.datadoghq.com/blog/internal-application-testing-with-datadog/
    tag: Blog
    text: Tester des applications internes avec le tunnel de test et les emplacements privés de Datadog
  - link: /synthetics/browser_tests/
    tag: Documentation
    text: Configurer un test Browser
  - link: /synthetics/api_tests/
    tag: Documentation
    text: Configurer un test API
---
<div class="alert alert-warning">
Cette fonctionnalité est en version bêta publique.
</div>

Le tunnel de test Synthetic vous permet de créer des connexions sécurisées de courte durée entre vos environnements internes et l'infrastructure de Datadog afin de déclencher des tests Synthetic rapidement sur vos applications privées.

Datadog recommande d'utiliser le tunnel de test si vous souhaitez lancer des tests Synthetic depuis votre pipeline CI/CD ou sur des versions locales de votre application sans avoir à déployer un système de test dédié et durable (comme les [emplacements privés][1]). Le tunnel de test peut également s'avérer utile si vous comptez déclencher des tests sur des environnements cloud éphémères.

## En quoi consiste un tunnel de test ?

Le tunnel de test est une fonctionnalité incluse dans le package NPM [@datadog/datadog-ci][2] ; elle fait partie des méthodes <span class="x x-first x-last">fournies</span> par Datadog pour intégrer vos tests Synthetic à vos pipelines CI/CD. Le tunnel de test crée un proxy HTTP chiffré de bout en bout entre votre infrastructure et Datadog, ce qui signifie que toute requête de test envoyée <span class="x x-first x-last">via</span> l'interface de ligne de commande passe automatiquement par le client `datadog-ci`<span class="x x-first x-last">. Datadog est ainsi en mesure</span> d'accéder à vos applications internes et de les tester.

{{< img src="synthetics/tunnel_diagram.png" alt="Schéma du tunnel de test Synthetic"  style="width:100%;">}}

`datadog-ci` reçoit d'abord une URL présignée de Datadog à des fins d'authentification. Il ouvre ensuite une connexion WebSocket Secure (wss) avec les emplacements gérés de Datadog à l'aide de l'URL présignée. En utilisant des connexions SSH via la connexion WebSocket, les tests sont déclenchés par `datadog-ci` et exécutés par le biais des emplacements gérés de Datadog.

Étant donné que la résolution DNS se fait via le tunnel, vous pouvez tester des applications avec des domaines internes, ou même sur le `localhost` de la machine exécutant `datadog-ci`.

**Remarque :** lorsque vous utilisez le tunnel de test, les emplacements de vos tests sont remplacés par un emplacement qui dépend de la région associée à votre compte Datadog.

## Comment utiliser le tunnel de test

Comme mentionné plus haut, le tunnel de test est inclus dans le package NPM [@datadog/datadog-ci][2] depuis la version [v0.11.0][3] de ce dernier. Consultez la rubrique [Synthetic et CI/CD][4] pour commencer.

Une fois que vous avez configuré votre client sur votre machine locale ou votre serveur CI, vous pouvez choisir de lancer vos tests avec le tunnel en ajoutant `--tunnel` à la commande utilisée pour lancer les tests. Par exemple, si vous utilisez un fichier de configuration globale, vous pouvez saisir la commande suivante :

```sh
datadog-ci synthetics run-tests --config <FICHIER_CONFIGURATION_GLOBALE>.json --tunnel
```

### Exigences relatives au pare-feu

<span class="x x-first x-last">Autorisez </span>les **connexions sortantes** pour les endpoints Datadog suivants :

{{< site-region region="us" >}}

| Port | Endpoint                                                                                             | Description                                                                                                                             |
| ---- | ---------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| 443  | `tunnel-us1.synthetics.datadoghq.com`   | Requis pour ouvrir une connexion wss depuis le client `datadog-ci` vers le service de tunnelisation. |
| 443  | `intake.synthetics.datadoghq.com` | Requis pour obtenir l'URL présignée et déclencher les tests Synthetic. |
| 443  | `api.datadoghq.com` | Requis pour rechercher des tests Synthetic, les récupérer et interroger leurs résultats. |

{{< /site-region >}}

{{< site-region region="eu" >}}

| Port | Endpoint                                                                                             | Description                                                                                                                             |
| ---- | ---------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| 443  | `tunnel-eu1.synthetics.datadoghq.com`   | Requis pour ouvrir une connexion wss depuis le client `datadog-ci` vers le service de tunnelisation. |
| 443  | `api.datadoghq.eu` | Requis pour obtenir l'URL présignée, rechercher des tests Synthetic, les récupérer, les déclencher et interroger leurs résultats. |

**Remarque **: bien que le domaine de premier niveau du service de tunnelisation ait une extension en `.com` (et pas `.eu`), l'endpoint se situe dans l'UE (région AWS Frankfurt).

{{< /site-region >}}

{{< site-region region="us3" >}}

| Port | Endpoint                                                                                             | Description                                                                                                                             |
| ---- | ---------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| 443  | `tunnel-us3.synthetics.datadoghq.com`   | Requis pour ouvrir une connexion wss depuis le client `datadog-ci` vers le service de tunnelisation. |
| 443  | `api.us3.datadoghq.com` | Requis pour obtenir l'URL présignée, rechercher des tests Synthetic, les récupérer, les déclencher et interroger leurs résultats. |

{{< /site-region >}}

{{< site-region region="us5" >}}

| Port | Endpoint                                                                                             | Description                                                                                                                             |
| ---- | ---------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| 443  | `tunnel-us5.synthetics.datadoghq.com`   | Requis pour ouvrir une connexion wss depuis le client `datadog-ci` vers le service de tunnelisation. |
| 443  | `api.us5.datadoghq.com` | Requis pour obtenir l'URL présignée, rechercher des tests Synthetic, les récupérer, les déclencher et interroger leurs résultats. |

{{< /site-region >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/synthetics/private_locations
[2]: https://www.npmjs.com/package/@datadog/datadog-ci
[3]: https://github.com/DataDog/datadog-ci/releases/tag/v0.11.0
[4]: /fr/synthetics/cicd_integrations#use-the-cli