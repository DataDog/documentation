---
title: Configuration des emplacements privés
kind: documentation
description: Configurer vos emplacements privés
further_reading:
- link: getting_started/synthetics/private_location
  tag: Documentation
  text: Débuter avec les emplacements privés
- link: /synthetics/private_locations/
  tag: Documentation
  text: Exécuter des tests Synthetics à partir d'emplacements privés
---

## Présentation

Les emplacements privés Synthetics proposent un certain nombre d'options configurables en fonction des exigences de votre environnement. Pour énumérer ces options, exécutez la commande `help` ci-dessous :

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

| Option | Type | Valeur par défaut | Description |
| ------ | ---- | ------- | ----------- |
| `site` | Chaîne | `datadoghq.com` | Site Datadog à partir duquel l'emplacement privé récupère la configuration de test et vers lequel il envoie les résultats du test. Doit être configuré sur `datadoghq.eu` pour les utilisateurs du site européen de Datadog. |

### Configuration du DNS

| Option | Type | Valeur par défaut | Description |
| ------ | ---- | ------- | ----------- |
| `dnsUseHost` | Booléen | `true` | Utilise la configuration DNS locale du host en priorité (p. ex., la configuration définie dans votre fichier `etc/resolv.conf`), puis les serveurs DNS spécifiés dans le paramètre `dnsServer` (le cas échéant). |
| `dnsServer` | Tableau de chaînes | `["8.8.8.8","1.1.1.1"]` | Adresses IP des serveurs DNS utilisées dans l'ordre donné (p. ex., `--dnsServer="8.8.4.4" --dnsServer="8.8.8.8"`). |

### Configuration des IP réservées

| Option | Type | Valeur par défaut | Description |
| -------| ---- | ------- | ----------- |
| `enableDefaultBlockedIpRanges`| Booléen | `false` | Empêcher les utilisateurs de créer des tests Synthetics sur des endpoints qui utilisent des plages d'IP réservées (Registre d'adresses à usage spécifique IANA [IPv4][1] et [IPv6][2]), sauf si la plage a été explicitement autorisée avec le paramètre `allowedIPRanges`. |
| `allowedIPRanges` | Tableau de chaînes | `none` | Autoriser l'accès à des IP et/ou CIDR spécifiques parmi les plages d'IP bloquées via le paramètre `enableDefaultBlockedIpRanges` ou `blockedIPRanges` (p. ex., `"allowedIPRanges.4": "10.0.0.0/8"`). **Remarque :** `allowedIPRanges` est prioritaire sur `blockedIPRanges`.
| `blockedIPRanges` | Tableau de chaînes | `none` | Bloquer l'accès à des IP et/ou CIDR spécifiques en plus (ou non) des plages d'IP bloquées lorsque le paramètre `enableDefaultBlockedIpRanges` est défini sur `true` (p. ex. `--blockedIPRanges.4="127.0.0.0/8" --blockedIPRanges.6="::1/128"`.)

**Remarque :** les paramètres `whitelistedRange` et `blacklistedRange` sont désormais obsolètes et doivent être remplacés par ceux spécifiés ci-dessus.

### Configuration du proxy

| Option | Type | Valeur par défaut | Description |
| -------| ---- | ------- | ----------- |
| `proxyDatadog` | Chaîne | `none` | URL de proxy utilisée par l'emplacement privé pour envoyer des requêtes à Datadog (p. ex., `--proxyDatadog=http://<VOTRE_UTILISATEUR>:<VOTRE_MOT_DE_PASSE>@<VOTRE_IP>:<VOTRE_PORT>`). |
| `proxyTestRequests` | Chaîne | `none` | URL de proxy utilisée par l'emplacement privé pour envoyer les requêtes de test à l'endpoint. |
| `proxyIgnoreSSLErrors` | Booléen | `false` | Ignorer les erreurs SSL lorsque l'emplacement privé utilise un proxy pour envoyer des requêtes à Datadog. |

**Remarque :** le paramètre `proxy` est désormais obsolète et doit être remplacé par `proxyDatadog`.

### Configuration avancée

| Option | Type | Valeur par défaut | Description |
| -------| ---- | ------- | ----------- |
| `concurrency` | Nombre | `10` | Nombre maximum de tests exécutés simultanément. |
| `maxTimeout` | Nombre | `60000` | Durée maximum d'exécution d'un test API (en millisecondes). |

## Administration des emplacements privés

| Option | Type | Valeur par défaut | Description |
| -------| ---- | ------- | ----------- |
| `logFormat` | Chaîne | `pretty` | Format des logs sortants (`"pretty"` ou `"json"`). Le format de log `json` vous permet de parser automatiquement ces logs lors de leur collecte par Datadog. |
| `verbosity` | Nombre | `3` | Niveau de verbosité (p. ex. `-v`, `-vv`, `-vvv`, etc.). |
| `dumpConfig` | Booléen | `none` | Afficher les paramètres de configuration du worker sans les secrets. |
| `dumpFullConfig` | Booléen | `none` | Afficher les paramètres de configuration du worker complets. |
| `help` | Booléen | `none` | Afficher les informations d'aide. |

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.iana.org/assignments/iana-ipv4-special-registry/iana-ipv4-special-registry.xhtml
[2]: https://www.iana.org/assignments/iana-ipv6-special-registry/iana-ipv6-special-registry.xhtml
