---
title: Exécuter des tests Synthetics à partir d'emplacements privés
kind: documentation
description: Exécuter des tests API et Browser Synthetics à partir d'emplacements privés
beta: true
further_reading:
  - link: 'synthetics/#create-a-check'
    tag: Documentation
    text: Créer un API check ou un browser check
  - link: synthetics/browser_tests
    tag: Documentation
    text: Configurer un test Browser
  - link: synthetics/api_tests
    tag: Documentation
    text: Configurer un test API
---
{{< alert >}}
Cette fonctionnalité est en version bêta publique pour les tests API. La fonctionnalité équivalente pour les tests Browser est en version bêta privée. <a href="https://docs.datadoghq.com/help/">Contactez l'assistance Datadog</a> pour la tester.
{{< /alert >}}

## Présentation

Les emplacements privés vous permettent de surveiller des applications internes ou des URL privées qui ne sont pas accessibles sur l’Internet public. Ils servent également à créer un nouvel emplacement Synthetics personnalisé.

Par défaut, votre worker d'emplacement privé récupère chaque seconde vos configurations de test à partir des serveurs de Datadog via HTTPS, exécute le test en fonction de la fréquence définie dans la configuration du test et renvoie les résultats du test aux serveurs de Datadog.

Une fois votre emplacement privé créé, la configuration d'un [test Synthetics][1] à partir de celui-ci se fait exactement de la même façon qu'à partir d'un emplacement géré par Datadog.

## Prérequis

### Endpoints des emplacements privés Datadog

Pour extraire les configurations de test et renvoyer les résultats de test, le worker d'emplacement privé doit avoir accès à l'un des endpoints de l'API Datadog.

{{< site-region region="us" >}}

| Site Datadog    | Port | Endpoint                                                                                             |
| --------------- | ---- | ---------------------------------------------------------------------------------------------------- |
| Site américain de Datadog | 443  | `intake.synthetics.datadoghq.com` pour les versions 0.1.6+, `api.datadoghq.com/api/` pour les versions <0.1.5   |

**Remarque** : vérifiez si l'endpoint correspondant à votre `site` Datadog est disponible à partir du host exécutant le worker en utilisant `curl intake.synthetics.datadoghq.com` pour les versions 0.1.6+ (`curl https://api.datadoghq.com` pour les versions <0.1.5).

{{< /site-region >}}

{{< site-region region="eu" >}}

| Site Datadog    | Port | Endpoint                                                                                             |
| --------------- | ---- | ---------------------------------------------------------------------------------------------------- |
| Site européen de Datadog | 443  | `api.datadoghq.eu/api/`                                                                              |

*Remarque** : vérifiez si l'endpoint correspondant à votre `site` Datadog est disponible à partir du host exécutant le worker en utilisant `curl https://api.datadoghq.eu`.

{{< /site-region >}}

### Docker

Le worker de l'emplacement privé est envoyé en tant que conteneur Docker. Il peut s'exécuter sur un système d'exploitation basé sur Linux ou Windows si le [moteur Docker][2] est disponible sur votre host. Il peut également s'exécuter avec le mode conteneurs de Linux.

## Configuration des emplacements privés

### Créer un emplacement privé

Accédez à _Synthetics_ -> _Settings_ -> _Private Locations_ et créez un emplacement privé :

 {{< img src="synthetics/private_locations/create_private_location.png" alt="créer un emplacement privé"  style="width:90%;">}}

Renseignez les détails de l'emplacement, puis cliquez sur **Save and Generate** pour générer le fichier de configuration associé à votre emplacement privé sur votre worker.

**Remarque** : le fichier de configuration contient des secrets pour l'authentification de l'emplacement privé, le déchiffrement de la configuration de test et le chiffrement des résultats de test. Datadog ne conserve pas les secrets, veillez donc à les stocker localement avant de quitter l'écran Private Locations. **Vous devez pouvoir spécifier à nouveau ces secrets si vous décidez d’ajouter des workers, ou d’installer des workers sur un autre host.**

### Configurer votre emplacement privé

Le `synthetics-private-location-worker` dispose d'un grand nombre d'options. Définissez-les dans la commande lancement ou dans le fichier de configuration pour configurer vos emplacements privés. Les arguments définis dans la commande de lancement sont prioritaires sur le fichier de configuration. Cependant, ces options ne sont pas enregistrées et sont donc prioritaires uniquement pour un lancement donné.

| Option                   | Type             | Valeur par défaut                                              | Description                                                                                                                                                              |
| ------------------------ | ---------------- | ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `dnsServer`              | Tableau de chaînes | `["8.8.8.8","1.1.1.1"]`                              | Adresses IP du serveur DNS utilisées dans l'ordre donné (`--dnsServer="1.1.1.1" --dnsServer="8.8.8.8"`)                                                                                       |
| `dnsUseHost`             | Booléen          | `false`                                              | Utiliser la configuration DNS locale en plus de --dnsServer (valeur actuelle : `["<DEFAULT_DNS_IN_HOST_CONFIG>"]`).                                                                            |
| `whitelistedRange.4`     | Tableau de chaînes | `none`                                               | Autoriser l'accès à des plages d'IP IPv4 (ex. : `--whitelistedRange.4="10.0.0.0/8"` ou `--whitelistedRange.4={"10.0.0.0/8","0.0.0.0/8"}`, prioritaire sur `--blacklistedRange`) |
| `whitelistedRange.6`     | Tableau de chaînes | `none`                                               | Autoriser l'accès à des plages d'IP IPv6 (ex. : `--whitelistedRange.6="::/128"` ou `--whitelistedRange.6={"::/128","64:ff9b::/96"}`, prioritaire sur `--blacklistedRange`)      |
| `blacklistedRange.4`     | Tableau de chaînes | [Registre d'adresses à usage spécifique IANA IPv4/IPv6][3] | Bloquer l'accès à des plages d'IP IPv4 (ex. : `--blacklistedRange.4="127.0.0.0/8" --blacklisted.4="100.64.0.0/10"`)                                                                |
| `blacklistedRange.6`     | Tableau de chaînes | [Registre d'adresses à usage spécifique IANA IPv4/IPv6][3] | Bloquer l'accès à des plages d'IP IPv6 (ex. : `--blacklistedRange.6="::1/128"`)                                                                                                    |
| `site`                   | Chaîne           | `datadoghq.com`                                      | Site Datadog (`datadoghq.com` ou `datadoghq.eu`)                                                                                                                         |
| `proxy`                  | Chaîne           | `none`                                               | URL de proxy. Définissez l'option `proxy` sur l'URL de votre proxy comme pour curl, par exemple :  `--proxy=http://<VOTRE_UTILISATEUR>:<VOTRE_MOT_DE_PASSE>@<VOTRE_IP>:<VOTRE_PORT> URL`                  |
| `proxyIgnoreSSLErrors`   | Booléen          | `none`                                               | Ignorer les erreurs SSL lors de l'utilisation d'un proxy.                                                                                                                                 |
| `logFormat`              | Chaîne           | `pretty`                                             | Format des logs sortants [valeurs possibles : `"pretty"` ou `"json"`]. Le format de log `json` vous permet de parser automatiquement ces logs lors de leur collecte par Datadog.      |
| `concurrency`            | Nombre entier          | `10`                                                 | Nombre maximum de tests exécutés simultanément.                                                                                                                            |
| `maxTimeout`             | Nombre entier          | `60000`                                              | Durée maximum d'exécution d'un test, en millisecondes.                                                                                                                        |
| `maxBodySize`            | Nombre entier          | `5e+6`                                               | Taille maximale du corps HTTP pour le téléchargement, en octets.                                                                                                                           |
| `maxBodySizeIfProcessed` | Nombre entier          | `5e+6`                                               | Taille maximale du corps HTTP maximum pour les assertions, en octets.                                                                                                               |
| `regexTimeout`           | Nombre entier          | `500`                                                | Durée maximale d'exécution de l'expression régulière, en millisecondes.                                                                                                        |

**Remarque** : pour afficher ces options ainsi que d'autres paramètres supplémentaires, exécutez la commande help pour le worker Datadog :
```shell
docker run --rm datadog/synthetics-private-location-worker --help.
```

#### Configuration d'un proxy

Si le trafic entre votre emplacement privé et Datadog doit passer par un proxy, vous devez définir l'option `proxy` sur l'URL proxy comme pour curl (par exemple, `--proxy=http://<VOTRE_UTILISATEUR>:<VOTRE_MOT_DE_PASSE>@<VOTRE_IP>:<VOTRE_PORT> URL`). Avec cette méthode, votre proxy n'a besoin d'aucune configuration supplémentaire.

#### Configuration du DNS

Par défaut, les workers Datadog utilisent `8.8.8.8` pour la résolution de DNS. En cas d'échec, ils effectuent une deuxième tentative de communication avec `1.1.1.1`.
Si vous testez une URL interne et que vous souhaitez utiliser un serveur DNS interne, vous pouvez définir l'option `dnsServer` sur une adresse IP DNS spécifique. Vous pouvez également utiliser le paramètre `dnsUseHost` afin que votre worker récupère votre configuration DNS locale à partir du fichier `etc/resolv.conf`.

#### Autoriser des adresses IPv4 à usage spécifique

Si vous utilisez des emplacements privés pour surveiller des endpoints internes, il se peut que certains de vos serveurs utilisent des plages [IPv4 à usage spécifique][3]. Ces IP sont bloquées par défaut : si votre emplacement privé doit exécuter un test via l'une d'entre elles, vous devez donc d'abord l'autoriser à l'aide du paramètre `whitelistedRange`.

### Installer votre worker d'emplacement privé

Lancez votre worker sur :

{{< tabs >}}

{{% tab "Docker" %}}

Lancez votre worker en tant que conteneur autonome à l'aide de la commande d'exécution Docker fournie et du fichier de configuration précédemment créé :

```shell
docker run --rm -v $PWD/worker-config-<ID_EMPLACEMENT>.json:/etc/datadog/synthetics-check-runner.json datadog/synthetics-private-location-worker
```

{{% /tab %}}

{{% tab "Kubernetes" %}}

Créez une ConfigMap Kubernetes avec le fichier JSON précédemment créé en exécutant la commande suivante :

```shell
kubectl create configmap private-worker-config --from-file=<NOM_FICHIER_CONFIG_DU_WORKER>.json
```

Créez un fichier `private-worker-pod.yaml` contenant le bloc ci-dessous, puis remplacez `<NOM_FICHIER_CONFIG_DU_WORKER>.json` par le nom du fichier de configuration JSON de votre emplacement privé dans la section `subPath`.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: private-location-worker
  annotations:
    ad.datadoghq.com/datadog-private-location-worker.logs: '[{"source":"private-location-worker","service":"synthetics"}]'
spec:
  containers:
  - name: datadog-private-location-worker
    image: datadog/synthetics-private-location-worker
    args: ["-f=json"]
    volumeMounts:
    - mountPath: /etc/datadog/synthetics-check-runner.json
      name: worker-config
      subPath: <NOM_FICHIER_CONFIG_DU_WORKER>.json
    livenessProbe:
      initialDelaySeconds: 30
      periodSeconds: 10
      timeoutSeconds: 2
      exec:
        command:
          - /bin/sh
          - -c
          - "[ $(expr $(cat /tmp/liveness.date) + 120000) -gt $(date +%s%3N) ]"
  volumes:
  - name: worker-config
    configMap:
      name: private-worker-config
```

Exécutez la commande ci-dessous pour appliquer la configuration à votre pod :

```shell
kubectl apply -f private-worker-pod.yaml
```

{{% /tab %}}

{{< /tabs >}}

**Remarque** : assurez-vous de spécifier les [paramètres de configuration][4] requis dans votre fichier de configuration ou dans la commande avant de lancer votre worker.

### Exécuter des tests à partir de votre worker

Si votre emplacement privé transmet correctement les informations à Datadog, les statuts de santé correspondants s'affichent tant que l'emplacement privé a interrogé votre endpoint moins de 5 secondes avant de charger les paramètres ou de créer des pages de test :

Dans la liste de vos emplacements privés, section **Settings** :

{{< img src="synthetics/private_locations/private_location_pill.png" alt="statuts de santé des emplacements privés"  style="width:90%;">}}

Dans le formulaire de création d'un test, sous la section **Private Locations** :

{{< img src="synthetics/private_locations/private_locations_in_list.png" alt="liste des emplacements privés"  style="width:90%;">}}

Vous pouvez désormais utiliser votre nouvel emplacement privé comme n'importe quel autre emplacement géré par Datadog pour exécuter vos [tests Synthetics][1].

## Redimensionner votre emplacement privé

Pour redimensionner un emplacement privé :

-   Modifiez la valeur du paramètre `concurrency` afin de pouvoir effectuer plus de tests simultanés depuis un seul worker.
-   Ajoutez ou supprimez des workers associés à votre emplacement privé. Il est possible d'exécuter plusieurs conteneurs pour un même emplacement privé avec un seul fichier de configuration. Chaque worker demande alors à exécuter `N` tests en fonction du nombre de tests autorisés. Lorsque le worker 1 traite des tests, le worker 2 demande les tests suivants, etc.

## Sécurité

Les workers d'emplacement privé extraient uniquement les données des serveurs Datadog. Datadog ne transmet pas de données aux workers.
La clé d'accès secrète, utilisée pour authentifier le worker de votre emplacement privé auprès des serveurs Datadog, utilise un protocole interne basé sur le [protocole AWS Signature Version 4][5].

Les configurations de test sont chiffrées asymétriquement. La clé privée est utilisée pour déchiffrer les configurations de test récupérées par les workers depuis les serveurs Datadog. La clé publique sert à chiffrer les résultats des tests envoyés par les workers aux serveurs de Datadog.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/synthetics/
[2]: https://docs.docker.com/engine/install/
[3]: https://www.iana.org/assignments/iana-ipv4-special-registry/iana-ipv4-special-registry.xhtml
[4]: /fr/synthetics/private_locations/?tab=docker#configure-your-private-location
[5]: https://docs.aws.amazon.com/general/latest/gr/signature-version-4.html