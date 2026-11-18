---
description: Configurez des emplacements privés pour surveiller des applications internes
  et des URL privées. Créez des emplacements personnalisés pour les zones critiques
  et les environnements de test internes.
further_reading:
- link: https://www.datadoghq.com/blog/synthetic-private-location-monitoring-datadog/
  tag: Blog
  text: Surveiller vos emplacements privés Synthetic avec Datadog
- link: /synthetics/private_locations
  tag: Documentation
  text: En savoir plus sur les emplacements privés
- link: /synthetics/guide/kerberos-authentication/
  tag: Guide
  text: Authentification Kerberos pour Synthetic Monitoring
title: Débuter avec les emplacements privés
---
## Présentation {#overview}

Les emplacements privés vous permettent de **surveiller des applications internes** ou des URL privées qui ne sont pas accessibles depuis l'Internet public. 

{{< img src="synthetics/private_locations/private_locations_worker_1.png" alt="Schéma d'architecture du fonctionnement d'un emplacement privé dans Synthetic Monitoring" style="width:100%;">}}

Vous pouvez également utiliser les emplacements privés pour :

- **Créer des emplacements personnalisés** dans les zones critiques de votre entreprise.
- **Vérifier les performances des applications dans votre environnement de test interne** avant de déployer de nouvelles fonctionnalités en production avec des [tests Synthetic dans vos pipelines CI/CD][1].
- **Comparer les performances des applications** depuis l'intérieur et l'extérieur de votre réseau interne.
- **[Authentifier les tests de Synthetic Monitoring à l'aide de Kerberos SSO][16]** pour les sites et API internes basés sur Windows.

Les emplacements privés sont des conteneurs Docker ou des services Windows que vous pouvez installer n'importe où au sein de votre réseau privé. Récupérez l'image Docker sur [Docker Hub][2] ou téléchargez l'[installateur Windows][13].**\*** 

**Remarque** : les emplacements privés sur conteneurs Docker ne sont pris en charge que sur l'architecture amd64. Si vous avez des questions concernant la prise en charge d'arm64, contactez le [support Datadog][15].

**\*** **L'utilisation et le fonctionnement de ce logiciel sont régis par le contrat de licence utilisateur final disponible [ici][14].**

Une fois votre emplacement privé créé et installé, vous pouvez lui attribuer des [tests Synthetic][3] exactement comme vous le feriez avec un emplacement géré. 

Les résultats de test de vos emplacements privés s'affichent de la même manière que les résultats de test de vos emplacements gérés. 

{{< img src="synthetics/private_locations/test_results_pl.png" alt="Attribuez un test Synthetic à des emplacements privés" style="width:100%;">}}

## Créez votre emplacement privé {#create-your-private-location}

1. Sur le site Datadog, survolez {{< ui >}}Digital Experience{{< /ui >}} et sélectionnez {{< ui >}}Settings{{< /ui >}} > [{{< ui >}}Private Locations{{< /ui >}}][5]. 
2. Cliquez sur {{< ui >}}Add Private Location{{< /ui >}}.
3. Renseignez les informations relatives à votre emplacement privé. Seuls les champs {{< ui >}}Name{{< /ui >}} et {{< ui >}}API key{{< /ui >}} sont obligatoires.
4. Cliquez sur {{< ui >}}Save Location and Generate Configuration File{{< /ui >}} pour générer le fichier de configuration associé à votre emplacement privé sur votre worker. 
5. Selon l'endroit où vous avez installé votre emplacement privé, vous devrez peut-être saisir des paramètres supplémentaires dans votre fichier de configuration : 
    - Si vous utilisez un proxy, saisissez l'URL sous la forme `http://<YOUR_USER>:<YOUR_PWD>@<YOUR_IP>:<YOUR_PORT>`. 
    - {{< ui >}}Block reserved IPs{{< /ui >}} est activé par défaut, ce qui limite l'accès de l'emplacement privé aux IP réservées. Pour autoriser l'accès à des endpoints spécifiques, saisissez des plages d'IP et/ou des noms de domaine.  

    Pour plus d'informations, consultez [Options de configuration des emplacements privés][6], [Exécuter des tests Synthetic depuis des emplacements privés][7] et [Renforcement de la sécurité réseau des emplacements privés][17]. 

6. Copiez et collez votre fichier de configuration d'emplacement privé dans votre répertoire de travail.

    **Remarque** : le fichier de configuration contient des secrets pour l'authentification de l'emplacement privé, le déchiffrement de la configuration des tests et le chiffrement des résultats des tests. Datadog ne stocke pas les secrets, veillez donc à les enregistrer localement avant de quitter le formulaire de création {{< ui >}}Private Locations{{< /ui >}}. **Vous devez pouvoir accéder à nouveau à ces secrets pour ajouter d'autres workers à votre emplacement privé**. 
7. Lorsque vous êtes prêt, cliquez sur {{< ui >}}View Installation Instructions{{< /ui >}}.
8. Suivez les instructions d'installation en fonction de l'environnement dans lequel vous souhaitez exécuter le worker d'emplacement privé.
9. Si vous utilisez Docker, lancez votre worker en tant que conteneur autonome à l'aide de la commande Docker `run` et de votre fichier de configuration :

    ```shell
    docker run --rm -v $PWD/worker-config-<LOCATION_ID>.json:/etc/datadog/synthetics-check-runner.json datadog/synthetics-private-location-worker
    ```
    
    This command starts a Docker container and prepares your private location to run tests. Datadog recommends running the container in detached mode with proper restart policy.

    <div class="alert alert-info">Vous pouvez utiliser un autre runtime de conteneur tel que Podman. Pour plus d'informations, consultez la <a href="https://docs.datadoghq.com/synthetics/private_locations/?tab=podman#install-your-private-location">documentation sur les emplacements privés</a>.</div>
    
    If you are using Windows, [run the Synthetics Private Location Installer with a GUI][12] or run the `msiexec` command on the command line inside the directory where you downloaded the installer:

    ```shell
    msiexec /i datadog-synthetics-worker-{{< synthetics-worker-version "synthetics-windows-pl" >}}.amd64.msi
    ```

10. Si votre emplacement privé communique correctement avec Datadog, un état de santé `OK` s'affiche sous {{< ui >}}Private Location Status{{< /ui >}} et dans la liste {{< ui >}}Private Locations{{< /ui >}} sur la page {{< ui >}}Settings{{< /ui >}} :

    {{< img src="synthetics/private_locations/pl_health.png" alt="État de santé de l'emplacement privé" style="width:100%;">}}

    Additionally, you can see private location logs in your terminal:

    ```text
    2022-02-28 16:20:03 [info]: Fetching 10 messages from queue - 10 slots available
    2022-02-28 16:20:03 [info]: Fetching 10 messages from queue - 10 slots available
    2022-02-28 16:20:04 [info]: Fetching 10 messages from queue - 10 slots available
    ```
11. Une fois que vous avez terminé de tester votre endpoint interne, cliquez sur {{< ui >}}OK{{< /ui >}}.

## Exécutez des tests Synthetic avec votre emplacement privé {#run-synthetic-tests-with-your-private-location}

Utilisez votre nouvel emplacement privé exactement comme un emplacement géré dans vos tests Synthetic.

1. Créez un [test API][2], un [test API à plusieurs étapes][8] ou un [test de navigateur][9] sur tout endpoint ou toute application interne que vous souhaitez surveiller.
2. Sous {{< ui >}}Private Locations{{< /ui >}}, sélectionnez votre nouvel emplacement privé :

    {{< img src="synthetics/private_locations/assign-test-pl_3.png" alt="Attribuer un test Synthetic à un emplacement privé" style="width:100%;">}}

3. Continuez à configurer votre test !

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}



[1]: /fr/continuous_testing/cicd_integrations
[2]: https://hub.docker.com/r/datadog/synthetics-private-location-worker
[3]: /fr/getting_started/synthetics/
[4]: https://docs.docker.com/install/linux/docker-ce/ubuntu/#install-docker-ce
[5]: https://app.datadoghq.com/synthetics/settings/private-locations
[6]: /fr/synthetics/platform/private_locations/configuration/#all-configuration-options
[7]: /fr/synthetics/private_locations/?tab=docker#blocking-reserved-ips
[8]: /fr/getting_started/synthetics/api_test#create-a-multistep-api-test
[9]: /fr/getting_started/synthetics/browser_test
[10]: https://podman.io/
[11]: https://app.vagrantup.com/ubuntu/boxes/jammy64
[12]: /fr/synthetics/private_locations?tab=windows#install-your-private-location
[13]: https://ddsynthetics-windows.s3.amazonaws.com/datadog-synthetics-worker-{{< synthetics-worker-version "synthetics-windows-pl" >}}.amd64.msi
[14]: https://www.datadoghq.com/legal/eula/
[15]: https://www.datadoghq.com/support/
[16]: /fr/synthetics/guide/kerberos-authentication/
[17]: /fr/synthetics/platform/private_locations/network_security/