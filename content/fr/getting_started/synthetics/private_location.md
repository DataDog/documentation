---
title: Débuter avec les emplacements privés
kind: documentation
further_reading:
  - link: /getting_started/synthetics/api_test
    tag: Documentation
    text: Créer votre premier test API
  - link: /synthetics/private_locations
    tag: Documentation
    text: En savoir plus sur les emplacements privés
---
<div class="alert alert-warning">
Cette fonctionnalité est en version bêta publique et disponible uniquement pour les tests API.
</div>

## Présentation

Les emplacements privés vous permettent de surveiller des applications internes ou des URL privées qui ne sont pas accessibles sur l’Internet public. Ils servent également à créer un nouvel emplacement Synthetics personnalisé.

Le worker de l'emplacement privé est envoyé en tant que conteneur Docker. Il peut donc s'exécuter sur un système d'exploitation basé sur Linux ou Windows si le moteur Docker est disponible sur votre host. Il peut également s'exécuter avec le mode conteneurs de Linux.

Par défaut, votre worker d'emplacement privé récupère chaque seconde vos configurations de test à partir des serveurs de Datadog via HTTPS, exécute le test en fonction de la fréquence définie dans la configuration du test et renvoie les résultats du test aux serveurs de Datadog.

Une fois votre emplacement privé créé, la configuration d'un [test API Synthetics][1] à partir de celui-ci se fait exactement de la même façon qu'à partir d'un emplacement géré par Datadog.

## Créer votre emplacement privé

1. Configurez une [machine virtuelle Vagrant Ubuntu 16.04][2].
2. Installez [Docker][3] sur la machine.
3. Dans l'application Datadog, passez votre curseur sur **[UX Monitoring][4]** et sélectionnez **Settings** -> **Private Locations**. Ajoutez ensuite un nouvel emplacement privé :
4. Renseignez les détails de l'emplacement, puis cliquez sur **Save and Generate** pour générer le fichier de configuration associé à votre emplacement privé sur votre worker.

5. Faites un copier-coller de la première infobulle pour créer le fichier de configuration de votre emplacement privé.

    **Remarque** : le fichier de configuration contient des secrets pour l'authentification de l'emplacement privé, le déchiffrement de la configuration de test et le chiffrement des résultats de test. Datadog ne conserve pas les secrets, veillez donc à les stocker localement avant de quitter l'écran Private Locations. **Vous devez pouvoir spécifier à nouveau ces secrets si vous décidez d’ajouter des workers, ou d’installer des workers sur un autre host.**

6. Lancez votre worker en tant que conteneur autonome à l'aide de la commande d'exécution Docker fournie et du fichier de configuration précédemment créé :

    ```shell
    docker run --rm -v $PWD/worker-config-<LOCATION_ID>.json:/etc/datadog/synthetics-check-runner.json datadog/synthetics-private-location-worker
    ```

7. Si votre emplacement privé communique normalement avec Datadog, les statuts de santé correspondants s'affichent tant que l'emplacement privé a interrogé votre endpoint moins de 5 secondes avant de charger les paramètres ou de créer des pages de test :

   Dans la liste de vos emplacements privés, section **Settings** :

   {{< img src="synthetics/private_locations/private_location_pill.png" alt="statuts de santé des emplacements privés"  style="width:100%;">}}

   Sur le formulaire de création d'un test, section Private Locations :

   {{< img src="synthetics/private_locations/private_locations_in_list.png" alt="Liste des emplacements privés"  style="width:75%;">}}

   Des logs semblables à l'exemple ci-dessous sont également générés pour votre emplacement privé :

    ```text
    2019-12-17 13:05:03 [info]: Fetching 10 messages from queue - 10 slots available
    2019-12-17 13:05:03 [info]: Fetching 10 messages from queue - 10 slots available
    2019-12-17 13:05:04 [info]: Fetching 10 messages from queue - 10 slots available
    ```

Vous pouvez désormais utiliser votre nouvel emplacement privé comme n'importe quel autre emplacement géré par Datadog pour vos tests API Synthetics. Cette fonctionnalité est particulièrement utile pour surveiller des endpoints internes.

## Exécuter des tests à partir d'un emplacement privé

1. Créez un test API pour n'importe quel endpoint (même interne) que vous souhaitez surveiller. Si vous ne savez pas par où commencer, faites un test avec l'application Web `https://www.shopist.io`.
2. Sélectionnez votre nouvel emplacement privé dans **Private Locations**.
3. Cliquez sur le bouton **Save Test**.

Pour accéder à des options plus avancées, utilisez la commande suivante et consultez la page `En savoir plus sur les emplacements privés` ci-dessous :

```shell
docker run --rm datadog/synthetics-private-location-worker --help and check
```

<div class="alert alert-warning">
<b>Remarque</b> : si vous utilisez des emplacements privés pour surveiller des endpoints exposés sur des <a href="https://www.iana.org/assignments/iana-ipv4-special-registry/iana-ipv4-special-registry.xhtml">adresses IP à usage spécifique</a>, comme 10.0.0.0/8 ou encore 192.0.0.0/24, vous devez les autoriser. Pour en savoir plus,  consultez la section relative aux <a href="https://docs.datadoghq.com/synthetics/private_locations/?tab=docker#special-purpose-ipv4-whitelisting">emplacements privés</a> de la documentation.
</div>

{{< whatsnext desc="Une fois votre emplacement privé créé :">}}
{{< nextlink href="/getting_started/synthetics/api_test" tag="Documentation" >}}Créer votre premier test API{{< /nextlink >}}
{{< nextlink href="/synthetics/private_locations" tag="Documentation" >}}En savoir plus sur les emplacements privés{{< /nextlink >}}
{{< /whatsnext >}}

[1]: /fr/getting_started/synthetics/api_test/
[2]: https://app.vagrantup.com/ubuntu/boxes/xenial64
[3]: https://docs.docker.com/install/linux/docker-ce/ubuntu/#install-docker-ce
[4]: https://app.datadoghq.com/synthetics/list