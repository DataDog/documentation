---
title: Exécuter des tests Synthetics à partir d'emplacements privés
kind: documentation
description: Exécuter des tests API et Browser Synthetics à partir d'emplacements privés
beta: true
further_reading:
  - link: 'https://www.datadoghq.com/synthetics/'
    tag: Documentation
    text: Gérer vos checks
  - link: synthetics/browser_tests
    tag: Documentation
    text: Configurer un test Browser
  - link: synthetics/api_tests
    tag: Documentation
    text: Configurer un test API
---
<div class="alert alert-warning">
Cette fonctionnalité est en version bêta publique et disponible uniquement pour les tests API.
</div>

## Présentation

Les emplacements privés vous permettent de surveiller des applications internes ou des URL privées qui ne sont pas accessibles sur l’Internet public. Ils servent également à créer un nouvel emplacement Synthetics personnalisé.

## Implémentation

Le worker de l'emplacement privé est envoyé en tant que conteneur Docker. Il peut donc s'exécuter sur un système d'exploitation basé sur Linux ou Windows si le moteur Docker est disponible sur votre host. Il peut également s'exécuter avec le mode conteneurs de Linux.

Par défaut, votre worker d'emplacement privé extrait chaque seconde vos configurations de test à partir des serveurs de Datadog via HTTPS, exécute le test en fonction de la fréquence définie dans la configuration du test et renvoie les résultats du test aux serveurs de Datadog.

Une fois votre emplacement privé créé, pour configurer un test API Synthetics à partir d'un emplacement privé, il vous suffit de suivre les étapes de configuration des emplacements gérés par Datadog.

### Créer un emplacement privé

1. Accédez à *Synthetics* -> *Settings* -> *Emplacements privés* et créez un emplacement privé :

    {{< img src="synthetics/private_locations/create_private_location.png" alt="créer un emplacement privé"  style="width:70%;">}}

2. Renseignez les détails de l'emplacement, puis cliquez sur **Save and Generate** pour générer le fichier de configuration associé à votre emplacement privé sur votre worker.

    **Remarque** : le fichier de configuration contient des secrets pour l'authentification de l'emplacement privé, le déchiffrement de la configuration de test et le chiffrement des résultats de test. Datadog ne conserve pas les secrets, veillez donc à les stocker localement avant de quitter l'écran Private Locations.
    **Vous devez pouvoir spécifier à nouveau ces secrets si vous décidez d’ajouter des workers, ou d’installer des workers sur un autre host.**

3. Lancez votre worker en tant que conteneur autonome à l'aide de la commande d'exécution Docker fournie et du fichier de configuration précédemment créé :

    ```
    docker run --init --rm -v $PWD/worker-config-<LOCATION_ID>.json:/etc/datadog/synthetics-check-runner.json datadog/synthetics-private-location-worker
    ```

   Pour redimensionner un emplacement privé :
      * Modifiez la valeur du paramètre `concurrency` afin de pouvoir effectuer plus de tests simultanés depuis un seul worker.
      * Ajoutez ou supprimez des workers sur votre host. Il est possible d'ajouter plusieurs workers à un emplacement privé avec un seul fichier de configuration. Chaque worker demande alors à exécuter `N` tests en fonction du nombre de tests autorisés. Lorsque le worker 1 traite des tests, le worker 2 demande les tests suivants, etc.

4. Pour extraire les configurations de test et renvoyer les résultats de test, le worker de l'emplacement privé doit avoir accès à l'un des endpoints de l'API Datadog :

    * Si vous utilisez le site américain de Datadog : pour les versions 0.1.6+, utilisez `intake.synthetics.datadoghq.com` ( `api.datadoghq.com/api/` pour les versions <0.1.5).
    * Si vous utilisez le site européen de Datadog : `api.datadoghq.eu/api/`.

    Vérifiez si l'endpoint correspondant à votre `site` Datadog est disponible à partir du host exécutant le worker :

    * Si vous utilisez le site américain de Datadog : pour les versions 0.1.6+, utilisez `curl intake.synthetics.datadoghq.com` (`curl https://api.datadoghq.com` pour les versions <0.1.5) .
    * Si vous utilisez le site européen de Datadog :  `curl https://api.datadoghq.eu`.

**Remarque** : vous devez autoriser le trafic sortant sur le port `443`, car la récupération des configurations de test et la transmission des résultats s'effectuent via HTTPS.

5. Si votre emplacement privé transmet correctement les informations à Datadog, les statuts de santé correspondants s'affichent tant que l'emplacement privé a interrogé votre endpoint moins de 5 secondes avant de charger les paramètres ou de créer des pages de test :

  * Dans votre liste d'emplacements privés, dans la section Settings :

    {{< img src="synthetics/private_locations/private_location_pill.png" alt="statuts de santé des emplacements privés"  style="width:70%;">}}

  * Dans le formulaire de création d'un test, sous la section Private Locations :

    {{< img src="synthetics/private_locations/private_locations_in_list.png" alt="liste des emplacements privés"  style="width:70%;">}}

6. Vous pouvez désormais utiliser votre nouvel emplacement privé comme n'importe quel autre emplacement géré par Datadog pour vos [tests API Synthetics][1].

## Configuration

Le `synthetics-private-location-worker` dispose d'un grand nombre d'options. Définissez-les à l'aide de la commande lancement ou du fichier de configuration pour configurer vos emplacements privés. Les arguments définis dans la commande de lancement sont prioritaires sur le fichier de configuration. Cependant, ces options ne sont pas enregistrées et sont donc prioritaires uniquement pour un lancement donné :

| Option                   | Type             | Default                                              | Description                                                                                                                                                         |
|--------------------------|------------------|------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `dnsServer`              | Tableau de chaînes | `["8.8.8.8","1.1.1.1"]`                              | Adresses IP du serveur DNS utilisées dans l'ordre donné (`--dnsServer="1.1.1.1" --dnsServer="8.8.8.8"`)                                                                                  |
| `dnsUseHost`             | Booléen          | `false`                                              | Utiliser la configuration DNS locale en plus de --dnsServer (valeur actuelle : `["<DEFAULT_DNS_IN_HOST_CONFIG>"]`).                                                                       |
| `whitelistedRange.4`       | Tableau de chaînes | `none`                                               | Autoriser l'accès à des plages d'IP IPv4 (ex. : `--whitelistedRange.4="10.0.0.0/8"` ou `--whitelistedRange.4={"10.0.0.0/8","0.0.0.0/8"}`, prioritaire sur `--blacklistedRange`)                                                                                                |
| `whitelistedRange.6`       | Tableau de chaînes | `none`                                               | Autoriser l'accès à des plages d'IP IPv6 (ex. : `--whitelistedRange.6="::/128"` ou `--whitelistedRange.6={"::/128","64:ff9b::/96"}`, prioritaire sur `--blacklistedRange`)                                                                                                |
| `blacklistedRange.4`       | Tableau de chaînes | [Registre d'adresses à usage spécifique IANA IPv4/IPv6][2] | Bloquer l'accès à des plages d'IP IPv4 (ex. : `--blacklistedRange.4="127.0.0.0/8" --blacklisted.4="100.64.0.0/10"`)                                                                 |
| `blacklistedRange.6`       | Tableau de chaînes | [Registre d'adresses à usage spécifique IANA IPv4/IPv6][2] | Bloquer l'accès à des plages d'IP IPv6 (ex. : `--blacklistedRange.6="::1/128"`)                                                                 |
| `site`                   | Chaîne           | `datadoghq.com`                                      | Site Datadog (`datadoghq.com` ou `datadoghq.eu`)                                                                                                                    |
| `proxy`                  | Chaîne           | `none`                                               | URL de proxy                                                                                                                                                           |
| `proxyIgnoreSSLErrors`                  | Booléen           | `none`                                               | Ignorer les erreurs SSL lors de l'utilisation d'un proxy.                                                                                                                                                           |
| `logFormat`              | Chaîne           | `pretty`                                             | Formate la sortie de log [valeurs possibles : `"pretty"` ou `"json"`]. Le format de log `json` vous permet d'analyser automatiquement ces logs lors de leur collecte par Datadog. |
| `concurrency`            | Nombre entier          | `10`                                                 | Nombre maximum de tests exécutés simultanément.                                                                                                                       |
| `maxTimeout`             | Nombre entier          | `60000`                                              | Durée maximum d'exécution d'un test, en millisecondes.                                                                                                                   |
| `maxBodySize`            | Nombre entier          | `5e+6`                                               | Taille maximale du corps HTTP pour le téléchargement, en octets.                                                                                                                      |
| `maxBodySizeIfProcessed` | Nombre entier          | `5e+6`                                               | Taille maximale du corps HTTP maximum pour les assertions, en octets.                                                                                                                |
| `regexTimeout`           | Nombre entier          | `500`                                                | Durée maximale d'exécution de l'expression régulière, en millisecondes.                                                                                                              |

**Remarque** : pour afficher ces options ainsi que d'autres paramètres supplémentaires, exécutez la commande help pour le worker Datadog `docker run --rm datadog/synthetics-private-location-worker --help`.

### Configuration de proxy

Si le trafic doit passer par un proxy, vous devez définir l'option `proxy` sur l'URL proxy, comme pour curl (p. ex., `--proxy=http://<VOTRE_UTILISATEUR>:<VOTRE_MOT_DE_PASSE>@<VOTRE_IP>:<VOTRE_PORT> URL`). Avec cette méthode, votre proxy n'a besoin d'aucune configuration supplémentaire.

### Configuration DNS

Par défaut, les workers Datadog utilisent `8.8.8.8` pour la résolution de DNS. En cas d'échec, ils effectuent une deuxième tentative de communication avec `1.1.1.1`.

Si vous testez une URL interne et que vous souhaitez utiliser un serveur DNS interne, vous pouvez définir l'option `dnsServer` sur une adresse IP DNS spécifique. Vous pouvez également utiliser le paramètre `dnsUseHost` afin que votre worker récupère votre configuration DNS locale à partir du fichier `etc/resolv.conf`.

### Autoriser des adresses IPv4 à usage spécifique

Si vous utilisez des emplacements privés pour surveiller des endpoints internes, il se peut que certains de vos serveurs utilisent des plages [IPv4 à usage spécifique][2]. Ces IP sont bloquées par défaut : si votre emplacement privé doit exécuter un test via l'une d'entre elles, vous devez donc d'abord l'autoriser à l'aide du paramètre `whitelistedRange`.

## Sécurité

Les workers d'emplacement privé extraient uniquement les données des serveurs Datadog. Datadog ne transmet pas de données aux workers.
La clé d'accès secrète, utilisée pour authentifier le worker de votre emplacement privé auprès des serveurs Datadog, utilise un protocole interne basé sur le [protocole AWS Signature Version 4][3].

Les configurations de test sont chiffrées asymétriquement. La clé privée est utilisée pour déchiffrer les configurations de test récupérées par les workers depuis les serveurs Datadog. La clé publique sert à chiffrer les résultats des tests envoyés par les workers aux serveurs de Datadog.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/synthetics/api_tests
[2]: https://www.iana.org/assignments/iana-ipv4-special-registry/iana-ipv4-special-registry.xhtml
[3]: https://docs.aws.amazon.com/general/latest/gr/signature-version-4.html