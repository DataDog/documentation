---
title: Débuter avec les emplacements privés
kind: documentation
further_reading:
  - link: https://www.datadoghq.com/blog/synthetic-private-location-monitoring-datadog/
    tag: Blog
    text: Surveiller vos emplacements privés Synthetic avec Datadog
  - link: /getting_started/synthetics/api_test
    tag: Documentation
    text: Créer votre premier test API
  - link: /getting_started/synthetics/browser_test
    tag: Documentation
    text: Créer votre premier test Browser
  - link: /synthetics/private_locations
    tag: Documentation
    text: En savoir plus sur les emplacements privés
---
<div class="alert alert-warning">
L'accès à cette fonctionnalité est restreint. Si vous n'êtes pas autorisé à y accéder, contactez l'<a href="https://docs.datadoghq.com/help/">assistance Datadog</a>.
</div>

## Présentation

Les emplacements privés vous permettent de **surveiller des applications internes** ou des URL privées qui ne sont pas accessibles sur l'Internet public. 

Vous pouvez également les utiliser pour effectuer les actions suivantes :

- **Créer des emplacements privés** dans des zones stratégiques de votre entreprise.
- **Vérifier les performances des applications dans votre environnement de test interne** avant de mettre en production de nouvelles fonctionnalités avec les [tests Synthetic dans vos pipelines de CI/CD][1].
- **Comparer les performances des applications** à l'intérieur et à l'extérieur de votre réseau interne.

Les emplacements privés sont des conteneurs Docker que vous pouvez installer où vous voulez à l'intérieur de votre réseau privé. Vous pouvez accéder à l'[image du worker d'emplacement privé][2] dans Google Container Registry.

Une fois votre emplacement privé créé et installé, vous pouvez lui assigner des [tests Synthetic][3] tout comme avec un emplacement géré. Les résultats des tests de vos emplacements privés s'affichent de la même façon que ceux de vos emplacements gérés.

{{< img src="synthetics/private_locations/test_results_pl.png" alt="Assigner un test Synthetic à des emplacements privés" style="width:100%;">}}

## Créer votre emplacement privé

1. Installez [Docker][4] sur une machine. Pour gagner du temps, vous pouvez installer Docker sur une machine virtuelle telle que [Vagrant Ubuntu 16.04][2].
2. Sur le site Datadog, passez votre curseur sur **[UX Monitoring][5]** et sélectionnez **Settings** > **Private Locations**. 
3. Cliquez sur **Add Private Location**.
4. Renseignez les détails de votre emplacement privé (seuls les champs `Name` et `API key` sont obligatoires). Vous devrez peut-être configurer des paramètres supplémentaires en fonction de l'endroit où vous avez installé votre emplacement privé (par exemple, derrière un proxy). Pour en savoir plus, consultez la section sur les [options de configuration des emplacements privés][6]. 
5. Cliquez sur **Save Location and Generate Configuration File** pour générer le fichier de configuration associé à votre emplacement privé sur votre worker.
6. Copiez et collez le fichier de configuration de votre emplacement privé dans votre répertoire de travail.

    **Remarque** : le fichier de configuration contient des secrets pour l'authentification de l'emplacement privé, le déchiffrement de la configuration de test et le chiffrement des résultats de test. Comme Datadog ne conserve pas les secrets, veillez à les stocker localement avant de quitter la page **Private Locations**. **Vous aurez à nouveau besoin de ces secrets pour ajouter d'autres workers à votre emplacement privé**. 

7. Lancez votre worker en tant que conteneur autonome à l'aide de la commande `run` Docker et du fichier de configuration précédemment créé :

    ```shell
    docker run --rm -v $PWD/worker-config-<LOCATION_ID>.json:/etc/datadog/synthetics-check-runner.json datadog/synthetics-private-location-worker
    ```

8. Si votre emplacement privé communique normalement avec Datadog, le statut de santé `OK` s'affiche dans votre liste **Private Locations** sous **Settings** :

    {{< img src="synthetics/private_locations/pl_health.png" alt="Santé des emplacements privés" style="width:100%;">}}

    Vous devriez également recevoir des logs d'emplacements privés sur votre terminal :

    ```text
    2019-12-17 13:05:03 [info]: Fetching 10 messages from queue - 10 slots available
    2019-12-17 13:05:03 [info]: Fetching 10 messages from queue - 10 slots available
    2019-12-17 13:05:04 [info]: Fetching 10 messages from queue - 10 slots available
    ```

Vous pouvez utiliser votre nouvel emplacement privé de la même manière qu'un emplacement géré pour exécuter vos tests Synthetic.

## Exécuter des tests Synthetic à partir d'un emplacement privé

1. Créez un [test API][2], un [test API à plusieurs étapes][7] ou un [test Browser][8] pour n'importe quel endpoint interne ou n'importe quelle application interne que vous souhaitez surveiller.
2. Sous **Private Locations**, sélectionnez votre nouvel emplacement privé :

    {{< img src="synthetics/private_locations/assign-test-pl-2.png" alt="Assigner un test Synthetic à un emplacement privé" style="width:100%;">}}

3. Continuez en renseignant les informations relatives à votre test.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/synthetics/cicd_integrations
[2]: https://console.cloud.google.com/gcr/images/datadoghq/GLOBAL/synthetics-private-location-worker?pli=1
[3]: /fr/getting_started/synthetics/
[4]: https://docs.docker.com/install/linux/docker-ce/ubuntu/#install-docker-ce
[5]: https://app.datadoghq.com/synthetics/list
[6]: /fr/synthetics/private_locations/configuration/#configuration-options
[7]: /fr/getting_started/synthetics/api_test#create-a-multistep-api-test
[8]: /fr/getting_started/synthetics/browser_test