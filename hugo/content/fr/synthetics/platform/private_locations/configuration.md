---
aliases:
- /fr/synthetics/private_locations/configuration
description: Configurez vos emplacements privés.
further_reading:
- link: getting_started/synthetics/private_location
  tag: Documentation
  text: Débuter avec les emplacements privés
- link: synthetics/private_locations/dimensioning
  tag: Documentation
  text: Dimensionnez vos emplacements privés
- link: synthetics/platform/private_locations/network_security
  tag: Documentation
  text: Renforcement de la sécurité réseau des emplacements privés
title: Configuration des emplacements privés
---
## Présentation {#overview}

<div class="alert alert-warning">Les nouveaux emplacements privés bloquent les plages IP réservées par défaut. Les emplacements privés avec des fichiers de configuration plus anciens ne restreignent pas l'accès réseau sortant, sauf si vous le configurez. Pour examiner et restreindre l'accès, consultez <a href="/synthetics/platform/private_locations/network_security">Renforcement de la sécurité réseau des emplacements privés</a>.</div>

Les emplacements privés synthétiques sont fournis avec un ensemble d'options que vous pouvez configurer pour répondre aux exigences de votre environnement. Vous trouverez toutes les options du [worker d'emplacement privé][1] en exécutant la commande `help` :

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

Reportez-vous à l'exemple dans le [référentiel Helm Datadog][1].

[1]: https://github.com/DataDog/helm-charts/tree/main/charts/synthetics-private-location

{{% /tab %}}
{{< /tabs >}}

## Personnalisez votre emplacement privé {#customize-your-private-location}
Les paramètres disponibles sont listés ci-dessous.
Ces options de configuration pour les emplacements privés peuvent être transmises sous forme de **paramètres dans votre fichier de configuration JSON** ou de **arguments dans la commande de lancement**, par exemple :

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

Les arguments définis dans la commande de lancement ont priorité sur le fichier de configuration. Cependant, ces options ne sont pas stockées et ne sont par conséquent pertinentes que pour un lancement donné.

## Options de configuration principales {#top-configuration-options}

### Configuration du site Datadog {#datadog-site-configuration}

`site`
: **Type** : Chaîne <br>
**Par défaut** : `datadoghq.com`<br>
Site Datadog à partir duquel l'emplacement privé récupère la configuration du test et envoie les résultats du test. Votre `site` est {{< region-param key="dd_site" code="true" >}}.

### Configuration DNS {#dns-configuration}

Les paramètres suivants peuvent être utilisés pour personnaliser la résolution DNS sur vos tests d'API :

`dnsUseHost`
: **Type**: Booléen <br>
**Par défaut**: `true`<br>
Utilisez d'abord la configuration DNS locale du host (par exemple, la configuration de votre fichier `etc/resolv.conf`), puis les serveurs DNS spécifiés dans le paramètre `dnsServer`.

`dnsServer`
: **Type**: Tableau de chaînes <br>
**Par défaut**: `["8.8.8.8","1.1.1.1"]`<br>
Adresses IP des serveurs DNS à utiliser dans l'ordre indiqué (par exemple, `--dnsServer="8.8.4.4" --dnsServer="8.8.8.8"`).

Sur les tests de navigateur, la résolution DNS est effectuée directement par le navigateur, qui lit généralement les serveurs DNS du host. Vous pouvez également configurer la résolution DNS au niveau du conteneur (par exemple, à l'aide de l'indicateur `--dns` sur [Docker][1] ou de `dnsConfig.nameservers` sur [Kubernetes][2]).

### Configuration du proxy {#proxy-configuration}

Les paramètres suivants peuvent être utilisés pour configurer un proxy afin de se connecter à Datadog :

`proxyDatadog`
: **Type**: Chaîne <br>
**Par défaut**: `none`<br>
URL du proxy utilisée par l'emplacement privé pour envoyer des requêtes à Datadog (par exemple, `--proxyDatadog=http://<YOUR_USER>:<YOUR_PWD>@<YOUR_IP>:<YOUR_PORT>`).

`proxyIgnoreSSLErrors`
: **Type**: Booléen <br>
**Par défaut**: `false`<br>
Ignorez les erreurs SSL lorsque l'emplacement privé utilise un proxy pour envoyer des requêtes à Datadog.

`proxyEnableConnectTunnel`
: **Type**: Booléen <br>
**Par défaut**: `none`<br>
Activez le tunneling `HTTP CONNECT` pour les proxys HTTP. Lorsque cette option n'est pas définie, le tunneling `HTTP CONNECT` est uniquement utilisé pour les proxys HTTPS.

**Remarque :** Les proxys de transfert HTTP comme Squid peuvent nécessiter la requête `HTTP CONNECT` pour établir la connexion TCP initiale entre l'emplacement privé et Datadog. À ce titre, le paramètre `proxyEnableConnectTunnel` doit être défini sur `true`. Cependant, les proxys inverses comme HAProxy qui dirigent une requête `HTTP CONNECT` vers Datadog peuvent ne pas fonctionner avec cette option activée.

**Remarque :** Le paramètre `proxy` est obsolète et doit être remplacé par `proxyDatadog`.

Les paramètres suivants peuvent être utilisés pour configurer un proxy par défaut pour les tests de Synthetic Monitoring :

`proxyTestRequests`
: **Type**: Chaîne <br>
**Par défaut**: `none`<br>
URL du proxy utilisée par l'emplacement privé pour envoyer les requêtes de test vers l'endpoint. Cela prend en charge HTTP(S), SOCKS et les fichiers PAC avec la syntaxe suivante : `pac+http://...`, `pac+https://...`, `pac+file://...` ou `pac+data:...`.

`proxyTestRequestsBypassList`
: **Type** : Tableau de chaînes <br>
**Par défaut** : `none`<br>
Hosts pour lesquels le proxy défini avec `proxyTestRequests` n'est pas utilisé, par exemple : `--proxyTestRequestsBypassList="example.org" --proxyTestRequestsBypassList="*.com"`.

### Configuration avancée {#advanced-configuration}

`concurrency`
: **Type** : Nombre <br>
**Par défaut** : `10`<br>
Nombre maximal de tests exécutés en parallèle.

`maxNumberMessagesToFetch`
: **Type** : Nombre <br>
**Par défaut** : `10`<br>
Nombre maximal de tests récupérés depuis Datadog.

`maxAPIDownloadBodySize`
: **Type** : Nombre <br>
**Par défaut** : `52428800`<br>
Taille maximale du corps HTTP pour un téléchargement, en octets. La valeur par défaut est 50 Mo (50 * 1024 * 1024).

`maxAPIBodySizeIfProcessed`
: **Type** : Nombre <br>
**Par défaut** : `5242880`<br>
Taille maximale du corps HTTP pour une assertion, en octets. La valeur par défaut est 5 Mo (5 * 1024 * 1024).

`apiRequestMaxTimeout`
: **Type** : Nombre <br>
**Par défaut** : `60000`<br>
Durée maximale d'exécution des tests d'API, en millisecondes. La valeur par défaut est d'une minute (60 * 1000).

**Remarque** : Les conteneurs des emplacements privés envoient les journaux vers `stdout` et `stderr` sans les enregistrer dans le conteneur.

### Configuration de sécurité réseau {#network-security-configuration}

Un emplacement privé peut atteindre toute adresse réseau accessible par son host, sauf si sa configuration restreint le trafic sortant. Les fichiers de configuration générés pour les nouveaux emplacements privés définissent `enableDefaultBlockedIpRanges` sur `true`. La valeur par défaut du worker est `false`. Restreignez le trafic sortant avec les options suivantes :

`allowedIPRanges`, `blockedIPRanges`, `enableDefaultBlockedIpRanges`, `allowedDomainNames`, `blockedDomainNames`

Datadog recommande de conserver `enableDefaultBlockedIpRanges` réglé sur `true` et d'autoriser uniquement les adresses dont vos tests ont besoin. Pour consulter les paramètres recommandés et des exemples, reportez-vous à [Renforcement de la sécurité réseau des emplacements privés][6].

## Toutes les options de configuration {#all-configuration-options}

`--accessKey`
: **Type** : Chaîne <br>
**Par défaut** : `none`<br>
Clé d'accès pour l'authentification à Datadog API.

`--secretAccessKey`
: **Type** : Chaîne <br>
**Par défaut** : `none`<br>
Clé d'accès secrète pour l'authentification à Datadog API.

`--datadogApiKey`
: **Type** : Chaîne <br>
**Par défaut** : `none`<br>
Clé d'API pour Datadog API permettant d'envoyer les artefacts des tests de navigateur (tels que des captures d'écran).

`--privateKey`
: **Type** : Tableau <br>
**Par défaut** : `none`<br>
Clé privée utilisée pour déchiffrer les configurations de test.

`--publicKey`
: **Type** : Tableau <br>
**Par défaut** : `none`<br>
Clé publique utilisée par Datadog pour chiffrer les résultats de test. Composé de `--publicKey.pem`.

`--site`
: **Type** : Chaîne <br>
**Par défaut** : `datadoghq.com`<br>
Site Datadog à partir duquel l'emplacement privé récupère la configuration du test et envoie les résultats du test. Votre site est {{< region-param key="dd_site" code="true" >}}.

`--concurrency`
: **Type**: Nombre <br>
**Par défaut**: `10`<br>
Nombre maximal de tests exécutés en parallèle.

`--maxNumberMessagesToFetch`
: **Type**: Nombre <br>
**Par défaut**: `10`<br>
Nombre maximal de tests récupérés depuis Datadog.

`--proxyDatadog`
: **Type**: Chaîne <br>
**Par défaut**: `none`<br>
URL de proxy utilisée par l'emplacement privé pour envoyer des requêtes à Datadog (par exemple, `--proxyDatadog=http://<YOUR_USER>:<YOUR_PWD>@<YOUR_IP>:<YOUR_PORT>`).

`--dumpConfig`
: **Type**: Booléen <br>
**Par défaut**: `none`<br>
Affichez les paramètres de configuration du worker sans les secrets.

`--enableStatusProbes`
: **Type**: Booléen <br>
Active les sondes de disponibilité et de bon fonctionnement des emplacements privés. Cela active deux endpoints: `http://127.0.0.1:8080/liveness` et `http://127.0.0.1:8080/readiness`.

`--statusProbesPort`
: **Type**: Nombre <br>
**Par défaut**: `8080`<br>
Remplace le port pour les sondes d'état de l'emplacement privé.

`--config`
: **Type**: Chaîne <br>
**Par défaut**: `/etc/datadog/synthetics-check-runner.json`</br>
**Windows**: `C:\ProgramData\Datadog-Synthetics\worker-config.json`</br>
Chemin d'accès au fichier de configuration JSON.

`--proxyTestRequests`
: **Type**: Chaîne <br>
**Par défaut**: `none`<br>
URL du proxy utilisée par l'emplacement privé pour envoyer les requêtes de test vers l'endpoint. Les fichiers PAC sont pris en charge avec la syntaxe suivante : `pac+https://...` ou `pac+http://...`.

`proxyTestRequestsBypassList`
: **Type** : Tableau de chaînes <br>
**Par défaut** : `none`<br>
Hosts pour lesquels le proxy défini avec `proxyTestRequests` n'est pas utilisé, par exemple : `--proxyTestRequestsBypassList="example.org" --proxyTestRequestsBypassList="*.com"`.

`--proxyIgnoreSSLErrors`
: **Type** : Booléen <br>
**Par défaut** : `false`<br>
Ignorez les erreurs SSL lorsque l'emplacement privé utilise un proxy pour envoyer des requêtes à Datadog.

`--dnsUseHost`
: **Type** : Booléen <br>
**Par défaut** : `true`<br>
Utilisez d'abord la configuration DNS locale du host (par exemple, la configuration de votre fichier `etc/resolv.conf`), puis les serveurs DNS spécifiés dans le paramètre `dnsServer`.

`--dnsServer`
: **Type** : Tableau de chaînes <br>
**Par défaut** : `["8.8.8.8","1.1.1.1"]`<br>
Adresses IP des serveurs DNS à utiliser dans l'ordre indiqué (par exemple, `--dnsServer="8.8.4.4" --dnsServer="8.8.8.8"`).

`--variableOverride`
: **Type** : Chaîne <br>
Remplace les variables utilisées dans les tests s'exécutant sur l'emplacement privé. Format : `VARIABLE=value`.
Toutes les variables importées de cette manière sont masquées.

`--environmentVariableOverride`
: **Type** : Chaîne <br>
Remplace les variables utilisées dans les tests s'exécutant sur l'emplacement privé par des variables d'environnement. Cela nécessite que les variables d'environnement soient importées dans l'environnement conteneurisé.
Avec Docker, par exemple, `docker run --env VARIABLE gcr.io/datadoghq/synthetics-private-location-worker --environmentVariableOverride VARIABLE`.
Toutes les variables importées de cette manière sont masquées.

`--retryAPIErrors`
: **Type** : Booléen <br>
**Par défaut** : `false`<br>
Réessayez en cas d'erreur dans les tests d'API.

`--allowedIPRanges`
: **Type** : Tableau de chaînes <br>
**Par défaut** : `none`<br>
Autorisez l'accès à des adresses IP et/ou à des blocs CIDR spécifiques parmi les plages d'adresses IP bloquées via `--enableDefaultBlockedIpRanges` ou `blockedIPRanges` (par exemple, `"allowedIPRanges.4": "10.0.0.0/8"`). **Remarque :** `allowedIPRanges` a priorité sur `blockedIPRanges`. Voir [Renforcement de la Security réseau des emplacements privés][6].

`--blockedIPRanges`
: **Type** : Tableau de chaînes <br>
**Par défaut** : `none`<br>
Bloquez l'accès à des adresses IP et/ou à des blocs CIDR spécifiques, en plus ou non des plages d'adresses IP bloquées lorsque le paramètre `--enableDefaultBlockedIpRanges` est défini sur `true` (par exemple, `--blockedIPRanges.4="127.0.0.0/8" --blockedIPRanges.6="::1/128"`). Un nom de domaine autorisé, défini avec le paramètre `--allowedDomainNames`, contourne les plages d'adresses IP bloquées par `--blockedIPRanges`. Voir [Renforcement de la Security réseau des emplacements privés][6].

`--enableDefaultBlockedIpRanges`
: **Type** : Booléen <br>
**Par défaut** : `false`<br>
Empêchez les utilisateurs de créer des tests Synthetic sur des endpoints utilisant des plages d'adresses IP réservées (registre des adresses à usage spécial [IPv4][4] et [IPv6][5] de l'IANA), à l'exception de ceux explicitement définis avec les paramètres `--allowedIPRanges` ou `--allowedDomainNames`. Les fichiers de configuration générés pour les nouveaux emplacements privés définissent ce paramètre sur `true`. La valeur par défaut du worker est `false`. Voir [Renforcement de la Security réseau des emplacements privés][6].

`--allowedDomainNames`
: **Type** : Tableau <br>
**Par défaut** : `none`<br>
Autorisez l'accès aux noms de domaine dans les tests. A priorité sur `--blockedDomainNames`, par exemple : `--allowedDomainNames="*.example.com"`. Les noms de domaine correspondent au nom d'hôte complet et prennent en charge le caractère générique `*`. Un nom de domaine autorisé contourne la liste de blocage IP, y compris les plages d'adresses IP réservées bloquées par `--enableDefaultBlockedIpRanges`. Voir [Renforcement de la Security réseau des emplacements privés][6].

`--blockedDomainNames`
: **Type** : Tableau <br>
**Par défaut** : `none`<br>
Refusez l'accès aux noms de domaine dans les tests, par exemple : `--blockedDomainNames="example.org" --blockedDomainNames="*.com"`. Voir [Renforcement de la Security réseau des emplacements privés][6].

`--enableIPv6`
: **Type** : Booléen <br>
**Par défaut** : `false`<br>
Utilisez IPv6 pour effectuer des tests. **Remarque** : IPv6 dans Docker n'est pris en charge qu'avec un host Linux.

`--version`
: **Type** : Booléen <br>
**Par défaut** : `none`<br>
Affichez le numéro de version du worker.

`--logFormat`
: **Type** : Chaîne <br>
**Par défaut** : `pretty`<br>
Formatez la sortie des journaux selon l'un des formats `"compact"`, `"pretty"`, `"pretty-compact"` et `"json"`. Définir votre format de journal sur `json` permet l'analyse automatique de ces journaux lorsqu'ils sont collectés par Datadog.

`--verbosity`
: **Type** : Nombre <br>
**Par défaut** : `3`<br>
Niveau de verbosité de `1` (erreurs uniquement) à `4` (journaux de débogage et au-dessus). Le réglage de la verbosité depuis la ligne de commande s'effectue avec les arguments `-v`, `-vv`, `-vvv` et `-vvvv`.<br><br>
Niveau de verbosité | Argument CLI | Option de configuration JSON
-- | -- | --
DEBUG | `-vvvv` | `"verbosity": 4`
INFO (par défaut) | `-vvv` | `"verbosity": 3`
WARNING | `-vv` | `"verbosity": 2`
ERROR | `-v` | `"verbosity": 1`

`--help`
: **Type** : Booléen <br>
**Par défaut** : `none`<br>
Affichez la sortie de la commande d'aide.

## Variables d'environnement {#environment-variables}
Les options de commande peuvent également être définies à l'aide de variables d'environnement telles que `DATADOG_API_KEY="...", DATADOG_WORKER_CONCURRENCY="15", DATADOG_TESTS_DNS_USE_HOST="true"`. Pour les options acceptant plusieurs arguments, utilisez la notation de tableau de chaînes JSON (`DATADOG_TESTS_DNS_SERVER='["8.8.8.8", "1.1.1.1"]'`)
### Variables d'environnement prises en charge : {#supported-environment-variables}
`DATADOG_ACCESS_KEY`, `DATADOG_API_KEY`, `DATADOG_PRIVATE_KEY`, `DATADOG_PUBLIC_KEY_PEM`, `DATADOG_SECRET_ACCESS_KEY`, `DATADOG_SITE`, `DATADOG_WORKER_CONCURRENCY`, `DATADOG_WORKER_LOG_FORMAT`, `DATADOG_WORKER_LOG_VERBOSITY`, `DATADOG_WORKER_MAX_NUMBER_MESSAGES_TO_FETCH`, `DATADOG_WORKER_PROXY`, `DATADOG_TESTS_DNS_SERVER`, `DATADOG_TESTS_DNS_USE_HOST`, `DATADOG_TESTS_PROXY`, `DATADOG_TESTS_PROXY_ENABLE_CONNECT_TUNNEL`, `DATADOG_TESTS_PROXY_IGNORE_SSL_ERRORS`, `DATADOG_ALLOWED_IP_RANGES_4`, `DATADOG_ALLOWED_IP_RANGES_6`, `DATADOG_BLOCKED_IP_RANGES_4`, `DATADOG_BLOCKED_IP_RANGES_6`, `DATADOG_ENABLE_DEFAULT_WINDOWS_FIREWALL_RULES`, `DATADOG_ALLOWED_DOMAIN_NAMES`, `DATADOG_BLOCKED_DOMAIN_NAMES`, `DATADOG_WORKER_ENABLE_STATUS_PROBES`, `DATADOG_WORKER_STATUS_PROBES_PORT`

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://hub.docker.com/r/datadog/synthetics-private-location-worker
[2]: https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/#pod-dns-config
[3]: https://csrc.nist.gov/projects/cryptographic-module-validation-program/certificate/4282
[4]: https://www.iana.org/assignments/iana-ipv4-special-registry/iana-ipv4-special-registry.xhtml
[5]: https://www.iana.org/assignments/iana-ipv6-special-registry/iana-ipv6-special-registry.xhtml
[6]: /fr/synthetics/platform/private_locations/network_security