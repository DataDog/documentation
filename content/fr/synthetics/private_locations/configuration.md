---
description: Configurer vos emplacements privés
further_reading:
- link: getting_started/synthetics/private_location
  tag: Documentation
  text: Débuter avec les emplacements privés
- link: synthetics/private_locations/dimensioning
  tag: Documentation
  text: Dimensionner vos emplacements privés
kind: documentation
title: Configuration des emplacements privés
---

## Présentation

Les emplacements privés Synthetic proposent un certain nombre d'options configurables en fonction des exigences de votre environnement. Pour énumérer ces options, exécutez la commande `help` ci-dessous :

```shell
docker run --rm datadog/synthetics-private-location-worker --help
```

Les options de configuration des emplacements privés peuvent ensuite être passées en tant que **paramètres à votre fichier de configuration JSON** ou en tant qu'**arguments dans la commande de lancement**, comme suit :

```shell
docker run --rm -v $PWD/<NOM_FICHIER_CONFIGURATION_WORKER>.json:/etc/datadog/synthetics-check-runner.json datadog/synthetics-private-location-worker:latest --logFormat=json
```

**Remarque :** les arguments définis dans la commande de lancement sont prioritaires sur le fichier de configuration. Cependant, ces options ne sont pas enregistrées et sont donc prioritaires uniquement pour un lancement donné.

## Options de configuration

### Configuration du site Datadog

`site`
: **Type** : chaîne <br>
**Valeur par défaut** : `datadoghq.com`<br>
Site Datadog à partir duquel l'emplacement privé récupère la configuration de test et vers lequel il envoie les résultats du test. Votre `site` est {{< region-param key="dd_site" code="true" >}}.

### Configuration du DNS

Les deux paramètres ci-dessous peuvent être utilisés pour personnaliser la résolution DNS de vos **tests API** :

`dnsUseHost`
: **Type** : booléen <br>
**Valeur par défaut** : `true`<br>
Utilise la configuration DNS locale du host en priorité (par exemple, la configuration définie dans votre fichier `etc/resolv.conf`), puis les serveurs DNS spécifiés dans le paramètre `dnsServer` (le cas échéant).

`dnsServer`
: **Type** : tableau de chaînes <br>
**Valeur par défaut** : `["8.8.8.8","1.1.1.1"]`<br>
Adresses IP des serveurs DNS utilisées dans l'ordre donné (par exemple, `--dnsServer="8.8.4.4" --dnsServer="8.8.8.8"`).

Pour les **tests Browser**, la résolution DNS est effectuée directement par le navigateur. Ce dernier accède généralement aux serveurs DNS à partir du host. Vous avez également la possibilité de configurer la résolution DNS au niveau des conteneurs (par exemple, à l'aide du flag `--dns` pour [Docker][1] ou de `dnsConfig.nameservers` pour [Kubernetes][2]).

### Configuration des IP réservées

`enableDefaultBlockedIpRanges`
: **Type** : booléen <br>
**Valeur par défaut** : `false`<br>
Empêche les utilisateurs de créer des tests Synthetic sur des endpoints qui utilisent des plages d'IP réservées (Registre d'adresses à usage spécifique IANA [IPv4][3] et [IPv6][4]), sauf si la plage a été explicitement autorisée avec le paramètre `allowedIPRanges`.

`allowedIPRanges`
: **Type** : tableau de chaînes <br>
**Valeur par défaut** : `none`<br>
Autorise l'accès à des adresses IP et/ou à des CIDR spécifiques parmi les plages d'IP bloquées via le paramètre `enableDefaultBlockedIpRanges` ou `blockedIPRanges` (par exemple, `"allowedIPRanges.4": "10.0.0.0/8"`). **Remarque :** `allowedIPRanges` est prioritaire sur `blockedIPRanges`.

`blockedIPRanges`
: **Type** : tableau de chaînes <br>
**Valeur par défaut** : `none`<br>
Bloque l'accès à des adresses IP et/ou à des CIDR spécifiques en plus (ou non) des plages d'adresses IP bloquées lorsque le paramètre `enableDefaultBlockedIpRanges` est défini sur `true` (par exemple, `--blockedIPRanges.4="127.0.0.0/8" --blockedIPRanges.6="::1/128"`).

**Remarque :** les paramètres `whitelistedRange` et `blacklistedRange` sont obsolètes et doivent être remplacés par ceux spécifiés ci-dessus.

### Configuration d'un proxy

`proxyDatadog`
: **Type** : chaîne <br>
**Valeur par défaut** : `none`<br>
URL de proxy utilisée par l'emplacement privé pour envoyer des requêtes à Datadog (par exemple, `--proxyDatadog=http://<VOTRE_UTILISATEUR>:<VOTRE_MOT_DE_PASSE>@<VOTRE_IP>:<VOTRE_PORT>`).

`proxyTestRequests`
: **Type** : chaîne <br>
**Valeur par défaut** : `none`<br>
URL de proxy utilisée par l'emplacement privé pour envoyer les requêtes de test à l'endpoint.

`proxyIgnoreSSLErrors`
: **Type** : booléen <br>
**Valeur par défaut** : `false`<br>
Ignore les erreurs SSL lorsque l'emplacement privé utilise un proxy pour envoyer des requêtes à Datadog.

**Remarque :** le paramètre `proxy` est obsolète et doit être remplacé par `proxyDatadog`.

### Configuration avancée

`concurrency`
: **Type** : nombre <br>
**Valeur par défaut** : `10`<br>
Nombre maximum de tests exécutés simultanément.

`enableStatusProbes`
: **Type** : booléen <br>
Active l'aptitude et l'activité des probes des emplacements privés, avec les endpoints http://127.0.0.1:8080/liveness et http://127.0.0.1:8080/readiness.

`maxTimeout`
: **Type** : nombre <br>
**Valeur par défaut** : `60000`<br>
Durée maximum d'exécution des tests API (en millisecondes).

`statusProbesPort`
: **Type** : nombre <br>
**Valeur par défaut** : `8080`<br>
Remplace le port des probes de statut des emplacements privés.

## Certificat racine privés

Vous pouvez importer des certificats racine privés dans vos emplacements privés pour que vos tests API et Browser effectuent une liaison SSL à l'aide de vos propres fichiers `.pem`. Lors du lancement de vos conteneurs d'emplacement privé, montez les fichiers de certificat `.pem` adéquats sur `/etc/datadog/certs`, de la même façon que votre fichier de configuration d'emplacement privé. Ces certificats sont alors considérés comme des autorités de certification fiables et sont utilisés lors de l'exécution de tests à cette fin.

**Remarque** : cette fonctionnalité est prise en charge par les versions 1.5.3 et ultérieures de l'image Docker d'emplacement privé.

## Administration des emplacements privés

`config`
: **Type** : chaîne <br>
**Valeur par défaut** : `/etc/datadog/synthetics-check-runner.json`<br>
Chemin du fichier de configuration JSON.

`logFormat`
: **Type** : chaîne <br>
**Valeur par défaut** : `pretty`<br>
Format des logs sortants (`"pretty"` ou `"json"`). Le format de log `json` vous permet de parser automatiquement ces logs lors de leur collecte par Datadog.

`verbosity`
: **Type** : nombre <br>
**Valeur par défaut** : `3`<br>
Niveau de verbosité (par exemple, `-v`, `-vv`, `-vvv`, etc.).

`dumpConfig`
: **Type** : booléen <br>
**Valeur par défaut** : `none`<br>
Affiche les paramètres de configuration du worker sans les secrets.

`dumpFullConfig`
: **Type** : booléen <br>
**Valeur par défaut** : `none`<br>
Affiche les paramètres de configuration du worker complets.

`help`
: **Type** : booléen <br>
**Valeur par défaut** : `none`<br>
Affiche les informations d'aide.

**Remarque** : les conteneurs d'emplacement privé écrivent les logs dans stdout/stderr sans les enregistrer dans le conteneur.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.docker.com/config/containers/container-networking/#dns-services
[2]: https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/#pod-dns-config
[3]: https://www.iana.org/assignments/iana-ipv4-special-registry/iana-ipv4-special-registry.xhtml
[4]: https://www.iana.org/assignments/iana-ipv6-special-registry/iana-ipv6-special-registry.xhtml