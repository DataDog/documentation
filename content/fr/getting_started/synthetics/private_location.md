---
title: Débuter avec les emplacements privés
kind: documentation
further_reading:
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

Les emplacements privés vous permettent de **surveiller des applications internes ou des URL privées** qui ne sont pas accessibles sur l’Internet public. Ils servent également à effectuer les actions suivantes :

* **Créer des emplacements personnalisés** dans des zones stratégiques pour votre entreprise.
* **Vérifier les performances des applications dans votre environnement d'intégration continue interne** avant de mettre en production de nouvelles fonctionnalités avec un [test d'intégration continue Synthetic][1].
* **Comparer les performances des applications** à l'intérieur et à l'extérieur de votre réseau interne.

Les emplacements privés sont des conteneurs Docker que vous pouvez installer partout où cela s'avère judicieux dans votre réseau privé. Une fois créés et installés, vous pouvez assigner des [tests Synthetic][2] à vos emplacements privés, comme vous le feriez pour un emplacement géré standard.

Votre worker d'emplacement privé récupère vos configurations de test à partir des serveurs Datadog via HTTPS, exécute le test selon un programme ou à la demande et renvoie les résultats du test aux serveurs Datadog. Vous pouvez ensuite visualiser les résultats des tests effectués sur vos emplacements privés exactement de la même façon que pour les tests exécutés à partir d'emplacements gérés :

{{< img src="synthetics/private_locations/test_results_pl.png" alt="Assigner un test Synthetic à un emplacement privé"  style="width:100%;">}}

Le worker d'emplacement privé est disponible sur Docker Hub :

| Docker Hub                                                                |
|---------------------------------------------------------------------------|
| [hub.docker.com/r/datadog/synthetics-private-location-worker][3]          |

## Créer votre emplacement privé

1. Configurez une [machine virtuelle Vagrant Ubuntu 16.04][2].
2. Installez [Docker][4] sur cette machine.
3. Dans l'application Datadog, passez votre curseur sur **[UX Monitoring][5]** et sélectionnez *Settings* -> *Private Locations*. Cliquez sur **Add Private Location**.
4. Renseignez les détails de votre emplacement privé (seuls les champs `Name` et `API key` sont obligatoires). Cliquez sur **Save Location and Generate Configuration File** pour générer le fichier de configuration associé à votre emplacement privé sur votre worker.
5. Indiquez l'URL proxy si le trafic entre votre emplacement privé et Datadog doit passer par un proxy. Vous pouvez également activer le bouton **Block reserved IPs** pour bloquer un ensemble de plages d'IP réservées par défaut ([Registre d'adresses IPv4][6] et [Registre d'adresses IPv6][7]).
6. Copiez et collez le fichier de configuration de votre emplacement privé dans votre répertoire de travail.

    **Remarque** : le fichier de configuration contient des secrets pour l'authentification de l'emplacement privé, le déchiffrement de la configuration de test et le chiffrement des résultats de test. Datadog ne conserve pas les secrets, veillez donc à les stocker localement avant de quitter l'écran Private Locations. **Vous devez pouvoir spécifier à nouveau ces secrets si vous décidez d’ajouter des workers, ou d’installer des workers sur un autre host.**

7. Lancez votre worker en tant que conteneur autonome à l'aide de la commande d'exécution Docker fournie et du fichier de configuration précédemment créé :

    ```shell
    docker run --rm -v $PWD/worker-config-<LOCATION_ID>.json:/etc/datadog/synthetics-check-runner.json datadog/synthetics-private-location-worker
    ```

8. Si votre emplacement privé communique normalement avec Datadog, le statut de santé `OK` s'affiche dans la liste de vos emplacements privés, spus la section **Settings** :

    {{< img src="synthetics/private_locations/pl_health.png" alt="Santé des emplacements privés"  style="width:100%;">}}

   Des logs semblables à l'exemple ci-dessous sont également générés pour votre emplacement privé :

    ```text
    2019-12-17 13:05:03 [info]: Fetching 10 messages from queue - 10 slots available
    2019-12-17 13:05:03 [info]: Fetching 10 messages from queue - 10 slots available
    2019-12-17 13:05:04 [info]: Fetching 10 messages from queue - 10 slots available
    ```

Vous pouvez désormais utiliser votre nouvel emplacement privé comme n'importe quel autre emplacement géré par Datadog pour exécuter vos tests Synthetic.

## Exécuter des tests Synthetic à partir d'un emplacement privé

1. Créez un test API ou Browser pour n'importe quel endpoint interne ou application que vous souhaitez surveiller.
2. Sélectionnez le nouvel emplacement privé dans **Private Locations** :

    {{< img src="synthetics/private_locations/assign_test_pl.png" alt="Assigner un test Synthetic à un emplacement privé"  style="width:75%;">}}

3. Procédez à la création de votre test.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/getting_started/synthetics/api_test/
[2]: https://app.vagrantup.com/ubuntu/boxes/xenial64
[3]: https://hub.docker.com/r/datadog/synthetics-private-location-worker
[4]: https://docs.docker.com/install/linux/docker-ce/ubuntu/#install-docker-ce
[5]: https://app.datadoghq.com/synthetics/list
[6]: https://www.iana.org/assignments/iana-ipv4-special-registry/iana-ipv4-special-registry.xhtml
[7]: https://www.iana.org/assignments/iana-ipv6-special-registry/iana-ipv6-special-registry.xhtml