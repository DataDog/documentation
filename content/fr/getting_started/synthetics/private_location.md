---
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
title: Débuter avec les emplacements privés
---

<div class="alert alert-info">
Pour être ajouté à la version bêta des emplacements privés Windows, contactez l'<a href="https://docs.datadoghq.com/help/">assistance Datadog</a>.
</div>

## Présentation

Les emplacements privés vous permettent de **surveiller des applications internes** ou des URL privées qui ne sont pas accessibles sur l'Internet public.

{{< img src="getting_started/synthetics/pl-list.png" alt="Liste des emplacements privés dans votre page Settings" style="width:100%;">}}

Vous pouvez également les utiliser pour :

- **Créer des emplacements personnalisés** dans des zones stratégiques de votre entreprise
- **Vérifier les performances des applications dans votre environnement de test interne**, avant de mettre en production de nouvelles fonctionnalités, avec les [tests Synthetic dans vos pipelines de CI/CD][1]
- **Comparer les performances des applications** à l'intérieur et à l'extérieur de votre réseau interne

Les emplacements privés sont des conteneurs Docker que vous pouvez installer où que vous le souhaitiez, tant que vous restez dans votre réseau privé. Vous pouvez accéder à l'[image du worker d'emplacement privé][2] dans Google Container Registry.

Une fois votre emplacement privé créé et installé, vous pouvez lui attribuer des [tests Synthetic][3] tout comme avec un emplacement géré.

Les résultats des tests de vos emplacements privés s'affichent de la même façon que ceux de vos emplacements gérés.

{{< img src="synthetics/private_locations/test_results_pl.png" alt="Attribuer un test Synthetic à des emplacements privés" style="width:100%;">}}

## Créer votre emplacement privé

1. Installez [Docker][4] sur une machine avec un système d'exploitation similaire à Unix, ou utilisez un autre runtime de conteneur, comme [Podman][10].

   Pour gagner du temps, vous pouvez installer Docker sur une machine virtuelle telle que [Vagrant Ubuntu 22.04][11].

2. Sur le site Datadog, passez votre curseur sur **[UX Monitoring][5]** et sélectionnez **Settings** > **Private Locations**. 
3. Cliquez sur **Add Private Location**.
4. Renseignez les détails de votre emplacement privé. Seuls les champs `Name` et `API key` sont requis. Si vous configurez un emplacement privé pour Windows, cochez la case **This is a Windows Private Location**.
5. Cliquez sur **Save Location and Generate Configuration File** pour générer le fichier de configuration associé à votre emplacement privé sur votre worker.
6. Selon l'endroit où vous avez installé votre emplacement privé, vous devrez potentiellement ajouter des paramètres supplémentaires à votre fichier de configuration :
    - Si vous utilisez un proxy, saisissez l'URL comme suit : `http://<VOTRE_UTILISATEUR>:<VOTRE_MOT_DE_PASSE>@<VOTRE_IP>:<VOTRE_PORT>`.
    - Pour bloquer les IP réservées, activez l'option **Block reserved IPs** et saisissez des plages d'IP.

   Pour en savoir plus, consultez la rubrique [Options de configuration][6] et la section [Exécuter des tests Synthetic à partir d'emplacements privés][7].
7. Copiez et collez le fichier de configuration de votre emplacement privé dans votre répertoire de travail.

    **Remarque** : le fichier de configuration contient des secrets pour l'authentification de l'emplacement privé, le déchiffrement des configurations des tests et le chiffrement des résultats des tests. Comme Datadog ne conserve pas les secrets, veillez à les stocker localement avant de quitter le formulaire de création **Private Locations**. **Vous aurez à nouveau besoin de ces secrets pour ajouter d'autres workers à votre emplacement privé**. 
8. Pour commencer l'installation, cliquez sur **View Installation Instructions**.
9. Suivez les instructions d'installation en fonction de l'environnement dans lequel vous souhaitez exécuter le worker d'emplacement privé.
10. Par exemple, pour Docker, lancez votre worker en tant que conteneur autonome à l'aide de la commande `run` Docker et de votre fichier de configuration :

    ```shell
    docker run --rm -v $PWD/worker-config-<LOCATION_ID>.json:/etc/datadog/synthetics-check-runner.json datadog/synthetics-private-location-worker
    ```

    Cette commande lance un conteneur Docker et configure votre emplacement privé afin qu'il puisse exécuter des tests. Datadog vous conseille d'exécuter le conteneur en mode détaché avec la stratégie de redémarrage adéquate.

    <div class="alert alert-info">Vous pouvez utiliser un autre runtime de conteneur, par exemple Podman. Pour en savoir plus, consultez la <a href="https://docs.datadoghq.com/synthetics/private_locations/?tab=podman#installer-votre-emplacement-prive">documentation relative aux emplacements privés</a>.</div>

11. Si votre emplacement privé communique normalement avec Datadog, le statut de santé `OK` s'affiche sous **Private Location Status** et dans la liste **Private Locations** de la page **Settings** :

    {{< img src="synthetics/private_locations/pl_health.png" alt="Santé des emplacements privés" style="width:100%;">}}

    Vous pouvez également afficher les logs de votre emplacement privé dans votre terminal :

    ```text
    2022-02-28 16:20:03 [info]: Fetching 10 messages from queue - 10 slots available
    2022-02-28 16:20:03 [info]: Fetching 10 messages from queue - 10 slots available
    2022-02-28 16:20:04 [info]: Fetching 10 messages from queue - 10 slots available
    ```
12. Après avoir testé votre endpoint interne, cliquez sur **OK**.
## Exécuter des tests Synthetic à partir d'un emplacement privé

Utilisez votre nouvel emplacement privé de la même manière qu'un emplacement géré pour exécuter vos tests Synthetic.

1. Créez un [test API][2], un [test API à plusieurs étapes][8] ou un [test Browser][9] pour n'importe quel endpoint interne ou n'importe quelle application que vous souhaitez surveiller.
2. Sous **Private Locations**, sélectionnez votre nouvel emplacement privé :

    {{< img src="synthetics/private_locations/assign-test-pl-2.png" alt="Attribuer un test Synthetic à un emplacement privé" style="width:100%;">}}

3. Il ne vous reste plus qu'à configurer votre test.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/continuous_testing/cicd_integrations
[2]: https://console.cloud.google.com/gcr/images/datadoghq/GLOBAL/synthetics-private-location-worker?pli=1
[3]: /fr/getting_started/synthetics/
[4]: https://docs.docker.com/install/linux/docker-ce/ubuntu/#install-docker-ce
[5]: https://app.datadoghq.com/synthetics/list
[6]: /fr/synthetics/private_locations/configuration/#configuration-options
[7]: /fr/synthetics/private_locations/?tab=docker#blocking-reserved-ips
[8]: /fr/getting_started/synthetics/api_test#create-a-multistep-api-test
[9]: /fr/getting_started/synthetics/browser_test
[10]: https://podman.io/
[11]: https://app.vagrantup.com/ubuntu/boxes/jammy64