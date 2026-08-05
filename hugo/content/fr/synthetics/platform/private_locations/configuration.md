---
aliases:
- /fr/synthetics/private_locations/configuration
description: Configurez vos emplacements privés.
further_reading:
- link: getting_started/incident_management/
  tag: Documentation
  text: Débuter avec les emplacements privés
- link: synthetics/private_locations/dimensioning
  tag: Documentation
  text: Dimensionner vos emplacements privés
title: Configuration des emplacements privés
---

## Présentation

Les emplacements privés Synthetic proposent un ensemble d'options configurables pour répondre aux besoins de votre environnement. Toutes les options du [worker d'emplacement privé][1] sont disponibles en exécutant la commande `help` :


{{< tabs >}}
{{% tab "Docker" %}}

```shell
docker run --rm datadog/synthetics-private-location-worker --help
```
{{% /tab %}}
{{% tab "Windows" %}}
```
synthetics-pl-worker.exe --help
```
{{% /tab %}}
{{% tab "Kubernetes" %}}

Consultez l'exemple dans le [référentiel Helm de Datadog][1].

[1]: https://github.com/DataDog/helm-charts/tree/main/charts/synthetics-private-location

{{% /tab %}}
{{< /tabs >}}

## Personnaliser votre emplacement privé
Consultez la liste des paramètres disponibles ci-dessous.
Ces options de configuration pour les emplacements privés peuvent être transmises comme **paramètres dans votre fichier de configuration JSON** ou comme **arguments dans la commande de lancement**, par exemple :

{{< tabs >}}
{{% tab "Docker" %}}
```shell
docker run -d --restart always -v $PWD/<MY_WORKER_CONFIG_FILE_NAME>.json:/etc/datadog/synthetics-check-runner.json datadog/synthetics-private-location-worker:latest --logFormat=json
```
{{% /tab %}}
{{% tab "Windows" %}}
```cmd
synthetics-pl-worker.exe --config=<PathToYourConfiguration> --logFormat=json
```
{{% /tab %}}
{{< /tabs >}}

Les arguments définis dans la commande de lancement ont la priorité sur le fichier de configuration. Cependant, ces options ne sont pas enregistrées et ne s'appliquent donc qu'à un lancement donné.

## Principales options de configuration

### Configuration du site Datadog

`site`
: **Type** : chaîne <br>
**Valeur par défaut** : `datadoghq.com`<br>
Site Datadog à partir duquel l'emplacement privé récupère la configuration de test et vers lequel il envoie les résultats du test. Votre `site` est {{< region-param key="dd_site" code="true" >}}.

### Configuration du DNS

Les paramètres suivants peuvent être utilisés pour personnaliser la résolution DNS sur vos tests API :

`dnsUseHost`
: **Type** : Boolean <br>
**Valeur par défaut** : `true`<br>
Utiliser en priorité la configuration DNS locale du host (par exemple, la configuration de votre fichier `etc/resolv.conf`), puis les serveurs DNS spécifiés dans le paramètre `dnsServer`.

`dnsServer`
: **Type** : tableau de chaînes <br>
**Valeur par défaut** : `["8.8.8.8","1.1.1.1"]`<br>
Adresses IP des serveurs DNS utilisées dans l'ordre donné (par exemple, `--dnsServer="8.8.4.4" --dnsServer="8.8.8.8"`).

Pour les tests Browser, la résolution DNS est effectuée directement par le navigateur. Ce dernier accède généralement aux serveurs DNS à partir du host. Vous avez également la possibilité de configurer la résolution DNS au niveau des conteneurs (par exemple, à l'aide du flag `--dns` pour [Docker][1] ou de `dnsConfig.nameservers` pour [Kubernetes][2]).

### Configuration d'un proxy

Les paramètres suivants peuvent être utilisés pour configurer un proxy afin de se connecter à Datadog :

`proxyDatadog`
: **Type** : chaîne <br>
**Valeur par défaut** : `none`<br>
URL de proxy utilisée par l'emplacement privé pour envoyer des requêtes à Datadog (par exemple, `--proxyDatadog=http://<VOTRE_UTILISATEUR>:<VOTRE_MOT_DE_PASSE>@<VOTRE_IP>:<VOTRE_PORT>`).

`proxyIgnoreSSLErrors`
: **Type** : booléen <br>
**Valeur par défaut** : `false`<br>
Ignore les erreurs SSL lorsque l'emplacement privé utilise un proxy pour envoyer des requêtes à Datadog.

`proxyEnableConnectTunnel`
: **Type** : Boolean <br>
**Valeur par défaut** : `none`<br>
Activer le tunneling `HTTP CONNECT` pour les proxies HTTP. Lorsque cette option n'est pas définie, le tunneling `HTTP CONNECT` est uniquement utilisé pour les proxies HTTPS.

**Remarque :** Les proxies HTTP de transfert comme Squid peuvent nécessiter la requête `HTTP CONNECT` pour établir la connexion TCP initiale entre l'emplacement privé et Datadog. Le paramètre `proxyEnableConnectTunnel` doit donc être défini sur `true`. Cependant, les proxies inverses comme HAProxy qui dirigent une requête `HTTP CONNECT` vers Datadog peuvent ne pas fonctionner avec cette option activée.

**Remarque :** le paramètre `proxy` est obsolète et doit être remplacé par `proxyDatadog`.

Les paramètres suivants peuvent être utilisés pour configurer un proxy par défaut à utiliser pour les tests Synthetic Monitoring :

`proxyTestRequests`
: **Type** : String <br>
**Valeur par défaut** : `none`<br>
URL du proxy utilisée par l'emplacement privé pour envoyer les requêtes de test à l'endpoint. Prend en charge les fichiers HTTP(S), SOCKS et PAC avec la syntaxe suivante : `pac+http://...`, `pac+https://...`, `pac+file://...` ou `pac+data:...`.

`proxyTestRequestsBypassList`
: **Type** : Array of Strings <br>
**Valeur par défaut** : `none`<br>
Hosts pour lesquels le proxy défini avec `proxyTestRequests` n'est pas utilisé, par exemple : `--proxyTestRequestsBypassList="example.org" --proxyTestRequestsBypassList="*.com"`.

### Configuration avancée

`concurrency`
: **Type** : nombre <br>
**Valeur par défaut** : `10`<br>
Nombre maximum de tests exécutés simultanément.

`maxNumberMessagesToFetch`
: **Type** : Number <br>
**Valeur par défaut** : `10`<br>
Nombre maximum de tests récupérés depuis Datadog.

`maxAPIDownloadBodySize`
: **Type** : Number <br>
**Valeur par défaut** : `52428800`<br>
Taille maximale du corps HTTP pour un téléchargement, en octets. La valeur par défaut est de 50 Mo (50 * 1024 * 1024).

`maxAPIBodySizeIfProcessed`
: **Type** : Number <br>
**Valeur par défaut** : `5242880`<br>
Taille maximale du corps HTTP pour une assertion, en octets. La valeur par défaut est de 5 Mo (5 * 1024 * 1024).

`apiRequestMaxTimeout`
: **Type** : Number <br>
**Valeur par défaut** : `60000`<br>
Durée maximale d'exécution d'un test API, en millisecondes. La valeur par défaut est d'une minute (60 * 1000).

**Remarque :** Les conteneurs d'emplacement privé envoient les logs vers `stdout` et `stderr` sans les enregistrer dans le conteneur.

## Toutes les options de configuration

`--accessKey`
: **Type** : String <br>
**Valeur par défaut** : `none`<br>
Clé d'accès pour l'authentification auprès de l'API Datadog.

`--secretAccessKey`
: **Type** : String <br>
**Valeur par défaut** : `none`<br>
Clé d'accès secrète pour l'authentification auprès de l'API Datadog.

`--datadogApiKey`
: **Type** : String <br>
**Valeur par défaut** : `none`<br>
Clé d'API Datadog pour envoyer les artefacts des tests Browser (comme les captures d'écran).

`--privateKey`
: **Type** : Array <br>
**Valeur par défaut** : `none`<br>
Clé privée utilisée pour déchiffrer les configurations de test.

`--publicKey`
: **Type** : Array <br>
**Valeur par défaut** : `none`<br>
Clé publique utilisée par Datadog pour chiffrer les résultats de test. Composée de `--publicKey.pem`.

`--site`
: **Type** : String <br>
**Valeur par défaut** : `datadoghq.com`<br>
Site Datadog depuis lequel l'emplacement privé récupère la configuration de test et envoie les résultats de test. Votre site est {{< region-param key="dd_site" code="true" >}}.

`--concurrency`
: **Type** : Number <br>
**Valeur par défaut** : `10`<br>
Nombre maximum de tests exécutés en parallèle.

`--maxNumberMessagesToFetch`
: **Type** : Number <br>
**Valeur par défaut** : `10`<br>
Nombre maximum de tests récupérés depuis Datadog.

`--proxyDatadog`
: **Type** : String <br>
**Valeur par défaut** : `none`<br>
URL du proxy utilisée par l'emplacement privé pour envoyer des requêtes à Datadog (par exemple, `--proxyDatadog=http://<YOUR_USER>:<YOUR_PWD>@<YOUR_IP>:<YOUR_PORT>`).

`--dumpConfig`
: **Type** : Boolean <br>
**Valeur par défaut** : `none`<br>
Afficher les paramètres de configuration du worker sans les secrets.

`--enableStatusProbes`
: **Type** : Boolean <br>
Activer les sondes de disponibilité et d'activité de l'emplacement privé. Cela active deux endpoints : `http://127.0.0.1:8080/liveness` et `http://127.0.0.1:8080/readiness`.

`--statusProbesPort`
: **Type** : Number <br>
**Valeur par défaut** : `8080`<br>
Remplacer le port des sondes de statut de l'emplacement privé.

`--config`
: **Type** : String <br>
**Valeur par défaut** : `/etc/datadog/synthetics-check-runner.json`</br>
**Windows** : `C:\ProgramData\Datadog-Synthetics\worker-config.json`</br>
Chemin vers le fichier de configuration JSON.

`--proxyTestRequests`
: **Type** : String <br>
**Valeur par défaut** : `none`<br>
URL du proxy utilisée par l'emplacement privé pour envoyer les requêtes de test à l'endpoint. Les fichiers PAC sont pris en charge avec la syntaxe suivante : `pac+https://...` ou `pac+http://...`.

`proxyTestRequestsBypassList`
: **Type** : Array of Strings <br>
**Valeur par défaut** : `none`<br>
Hosts pour lesquels le proxy défini avec `proxyTestRequests` n'est pas utilisé, par exemple : `--proxyTestRequestsBypassList="example.org" --proxyTestRequestsBypassList="*.com"`.

`--proxyIgnoreSSLErrors`
: **Type** : Boolean <br>
**Valeur par défaut** : `false`<br>
Ignorer les erreurs SSL lorsque l'emplacement privé utilise un proxy pour envoyer des requêtes à Datadog.

`--dnsUseHost`
: **Type** : Boolean <br>
**Valeur par défaut** : `true`<br>
Utiliser en priorité la configuration DNS locale du host (par exemple, la configuration de votre fichier `etc/resolv.conf`), puis les serveurs DNS spécifiés dans le paramètre `dnsServer`.

`--dnsServer`
: **Type** : Array of Strings <br>
**Valeur par défaut** : `["8.8.8.8","1.1.1.1"]`<br>
Adresses IP des serveurs DNS à utiliser dans l'ordre indiqué (par exemple, `--dnsServer="8.8.4.4" --dnsServer="8.8.8.8"`).

`--variableOverride`
: **Type** : String <br>
Remplacer les variables utilisées dans les tests s'exécutant sur l'emplacement privé. Format : `VARIABLE=value`.
Toutes les variables importées de cette façon sont masquées.

`--environmentVariableOverride`
: **Type** : String <br>
Remplacer les variables utilisées dans les tests s'exécutant sur l'emplacement privé par des variables d'environnement. Les variables d'environnement doivent être importées dans l'environnement conteneurisé.
Avec Docker, par exemple : `docker run --env VARIABLE gcr.io/datadoghq/synthetics-private-location-worker --environmentVariableOverride VARIABLE`.
Toutes les variables importées de cette façon sont masquées.

`--retryAPIErrors`
: **Type** : Boolean <br>
**Valeur par défaut** : `false`<br>
Réessayer en cas d'erreur dans les tests API

`--allowedIPRanges`
: **Type** : Array of Strings <br>
**Valeur par défaut** : `none`<br>
Autoriser l'accès à des adresses IP et/ou des plages CIDR spécifiques parmi les plages d'adresses IP bloquées via `--enableDefaultBlockedIpRanges` ou `blockedIPRanges` (par exemple, `"allowedIPRanges.4": "10.0.0.0/8"`). **Remarque :** `allowedIPRanges` a la priorité sur `blockedIPRanges`.

`--blockedIPRanges`
: **Type** : Array of Strings <br>
**Valeur par défaut** : `none`<br>
Bloquer l'accès à des adresses IP et/ou des plages CIDR spécifiques, en plus ou non des plages d'adresses IP bloquées lorsque le paramètre `--enableDefaultBlockedIpRanges` est défini sur `true` (par exemple, `--blockedIPRanges.4="127.0.0.0/8" --blockedIPRanges.6="::1/128"`.)

`--enableDefaultBlockedIpRanges`
: **Type** : Boolean <br>
**Valeur par défaut** : `false`<br>
Empêcher les utilisateurs de créer des tests Synthetic sur des endpoints utilisant des plages d'adresses IP réservées (registre d'adresses à usage spécial IANA [IPv4][4] et [IPv6][5]), à l'exception de celles explicitement définies avec le paramètre `--allowedIPRanges`.

`--allowedDomainNames`
: **Type** : Array <br>
**Valeur par défaut** : `none`<br>
Autoriser l'accès aux noms de domaine dans les tests. A la priorité sur --blockedDomainNames, par exemple : `--allowedDomainNames="*.example.com"`.

`--blockedDomainNames`
: **Type** : Array <br>
**Valeur par défaut** : `none`<br>
Refuser l'accès aux noms de domaine dans les tests, par exemple : `--blockedDomainNames="example.org" --blockedDomainNames="*.com"`.

`--enableIPv6`
: **Type** : Boolean <br>
**Valeur par défaut** : `false`<br>
Utiliser IPv6 pour effectuer des tests. **Remarque** : IPv6 dans Docker n'est pris en charge qu'avec un host Linux.

`--version`
: **Type** : Boolean <br>
**Valeur par défaut** : `none`<br>
Show version number of the worker.

`--logFormat`
: **Type** : String <br>
**Valeur par défaut** : `pretty`<br>
Formater la sortie des logs entre `"compact"`, `"pretty"`, `"pretty-compact"` et `"json"`. Définir le format des logs sur `json` permet d'analyser automatiquement ces logs lors de leur collecte par Datadog.

`--verbosity`
: **Type** : Number <br>
**Valeur par défaut** : `3`<br>
Niveau de verbosité de `1` (erreurs uniquement) à `4` (logs de débogage et plus). Pour définir le niveau de verbosité depuis la ligne de commande, utilisez les arguments `-v`, `-vv`, `-vvv` et `-vvvv`.<br><br>
Niveau de verbosité | Argument CLI | Option de configuration JSON
-- | -- | --
DEBUG | `-vvvv` | `"verbosity": 4`
INFO (par défaut) | `-vvv` | `"verbosity": 3`
WARNING | `-vv` | `"verbosity": 2`
ERROR | `-v` | `"verbosity": 1`

`--help`
: **Type** : Boolean <br>
**Valeur par défaut** : `none`<br>
Afficher la sortie de la commande help.

## Variables d'environnement
Les options de commande peuvent également être définies à l'aide de variables d'environnement, par exemple `DATADOG_API_KEY="...", DATADOG_WORKER_CONCURRENCY="15", DATADOG_TESTS_DNS_USE_HOST="true"`. Pour les options acceptant plusieurs arguments, utilisez la notation de tableau de chaînes JSON (`DATADOG_TESTS_DNS_SERVER='["8.8.8.8", "1.1.1.1"]'`)
### Variables d'environnement prises en charge :
`DATADOG_ACCESS_KEY`, `DATADOG_API_KEY`, `DATADOG_PRIVATE_KEY`, `DATADOG_PUBLIC_KEY_PEM`, `DATADOG_SECRET_ACCESS_KEY`, `DATADOG_SITE`, `DATADOG_WORKER_CONCURRENCY`, `DATADOG_WORKER_LOG_FORMAT`, `DATADOG_WORKER_LOG_VERBOSITY`, `DATADOG_WORKER_MAX_NUMBER_MESSAGES_TO_FETCH`, `DATADOG_WORKER_PROXY`, `DATADOG_TESTS_DNS_SERVER`, `DATADOG_TESTS_DNS_USE_HOST`, `DATADOG_TESTS_PROXY`, `DATADOG_TESTS_PROXY_ENABLE_CONNECT_TUNNEL`, `DATADOG_TESTS_PROXY_IGNORE_SSL_ERRORS`, `DATADOG_ALLOWED_IP_RANGES_4`, `DATADOG_ALLOWED_IP_RANGES_6`, `DATADOG_BLOCKED_IP_RANGES_4`, `DATADOG_BLOCKED_IP_RANGES_6`, `DATADOG_ENABLE_DEFAULT_WINDOWS_FIREWALL_RULES`, `DATADOG_ALLOWED_DOMAIN_NAMES`, `DATADOG_BLOCKED_DOMAIN_NAMES`, `DATADOG_WORKER_ENABLE_STATUS_PROBES`, `DATADOG_WORKER_STATUS_PROBES_PORT`

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://hub.docker.com/r/datadog/synthetics-private-location-worker
[2]: https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/#pod-dns-config
[3]: https://csrc.nist.gov/projects/cryptographic-module-validation-program/certificate/4282
[4]: https://www.iana.org/assignments/iana-ipv4-special-registry/iana-ipv4-special-registry.xhtml
[5]: https://www.iana.org/assignments/iana-ipv6-special-registry/iana-ipv6-special-registry.xhtml