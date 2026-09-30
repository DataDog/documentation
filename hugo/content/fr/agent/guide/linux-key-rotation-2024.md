---
description: Consultez des informations sur la rotation des clés GPG 2024 pour les
  packages RPM et DEB de Datadog et découvrez comment mettre à jour vos systèmes.
title: Rotation des clés Linux pour 2024
---

Dans le cadre de ses meilleures pratiques, Datadog procède à une rotation périodique des clés et des certificats utilisés pour signer les packages de l'Agent Datadog. Les packages Datadog comprennent :

- les différents types d'Agent (`datadog-agent`, `datadog-iot-agent`, `datadog-heroku-agent` et `datadog-dogstatsd`)
- des packages supplémentaires, comme le worker Observability Pipelines (`observability-pipelines-worker`), le proxy FIPS (`datadog-fips-proxy`) et les bibliothèques d'injection et de tracing APM pour Java, Python, .NET, Ruby et Node.js (tous les packages `datadog-apm-*`).

Les clés GPG suivantes, qui servent à signer les packages RPM et DEB ci-dessus, ont atteint leur fin de vie en septembre 2024. Leur rotation a eu lieu en juin 2024 :

RPM
: Hash de l'ancienne clé approuvée : [`C6559B690CA882F023BDF3F63F4D1729FD4BF915`][1]
: Hash de la nouvelle clé approuvée : [`7408BFD56BC5BF0C361AAAE85D88EEA3B01082D3`][2]
: À compter de juin 2024, installez la nouvelle clé approuvée avant d'installer toute version de RPM publiée après cette date.

DEB
: Hash de l'ancienne clé approuvée : [`D75CEA17048B9ACBF186794B32637D44F14F620E`][3]
: Hash de la nouvelle clé approuvée : [`5F1E256061D813B125E156E8E6266D4AC0962C7D`][4]
: APT vérifie la signature des métadonnées du référentiel. À compter de juin 2024, installez la nouvelle clé approuvée avant d'installer toute version d'APT provenant de `apt.datadoghq.com` et publiée après cette date.

Si vous utilisez des packages RPM ou DEB de Datadog, vous devrez peut-être importer manuellement la nouvelle clé dans vos systèmes pour installer ou mettre à niveau les packages de l'Agent après la rotation.

<div class="alert alert-info">
La rotation des clés n'affecte pas le fonctionnement des Agents en cours d'exécution. Elle limite uniquement l'installation d'une nouvelle version de l'Agent.<br><br>Les Agents Linux, Windows ou macOS dockerisés ne sont pas concernés.
</div>

## Méthodes d'installation avec approbation automatique de la nouvelle clé GPG

Si vous utilisez l'une des méthodes d'installation suivantes, votre host approuve automatiquement la nouvelle clé, et aucune opération supplémentaire n'est requise :

- [Script d'installation de l'Agent][5], version 1.18.0 (publiée le 27 juin 2023) ou ultérieure
- [Cookbook Chef][6], version 4.18.0 (publiée le 26 juillet 2023) ou ultérieure
- [Rôle Ansible][7], version 4.20.0 (publiée le 18 juillet 2023) ou ultérieure
- [Collection Ansible][14], version 5.0.0 (publiée le 18 juillet 2023) ou ultérieure
- [Module Puppet][8], version 3.21.0 (publiée le 5 juillet 2023) ou ultérieure
- [Formule SaltStack][9], version 3.6 (publiée le 10 août 2023) ou ultérieure
- [Buildpack Heroku][10], version 2.11 (publiée le 15 juin 2023) ou ultérieure
- Modèles de configuration [Elastic Beanstalk][11] mis à jour le 27 juin 2023 ou à une date ultérieure (ils doivent contenir `source: https://install.datadoghq.com/scripts/install_script_agent7.sh`)
- Agents conteneurisés (Docker/Kubernetes), toutes les versions
- Agents Windows/macOS, toutes les versions

En outre, l'installation du package de l'Agent DEB v6.48.0+ ou v7.48.0+ via `apt` depuis le référentiel `apt.datadoghq.com` entraîne l'installation de la version 1.3.1 du [package `datadog-signing-keys`](#package-datadog-signing-keys). Le package `datadog-signing-keys` permet de s'assurer que votre host approuve automatiquement la nouvelle clé. Si vous avez installé la version 1.3.1 ou une version ultérieure de `datadog-signing-keys`, aucune opération supplémentaire n'est requise. Si vous utilisez une version plus ancienne que la version 1.3.1, il n'est pas garanti que la rotation des clés soit automatiquement gérée.

Si vous avez installé le worker Observability Pipelines ou les bibliothèques de tracing APM **à l'aide des méthodes d'installation ci-dessus**, les clés les plus récentes sont déjà configurées. Aucune opération supplémentaire n'est requise.

Si vous installez le package DEB de l'Agent à partir d'un autre référentiel, ou si vous n'utilisez pas `apt` (ou tout autre outil similaire vérifiant les signatures des métadonnées d'un référentiel), votre système n'est pas tenu de connaître les clés de signature Datadog. Par conséquent, aucune opération supplémentaire n'est requise. Il peut toutefois s'avérer utile d'utiliser le [package `datadog-signing-keys`](#package-datadog-signing-keys).

Si vous ne savez pas si un host a approuvé la nouvelle clé de signature, vous pouvez [vérifier si c'est bien le cas](#verifier-si-un-host-a-approuve-la-nouvelle-cle-gpg).

Pour les hosts utilisant des versions trop anciennes des méthodes d'installation indiquées ci-dessous ou du package DEB, Datadog vous conseille d'utiliser la dernière version de la méthode d'installation. Les utilisateurs Debian et Ubuntu ont également la possibilité d'installer la version 7.48.0 ou une version ultérieure de l'Agent. Si vous ne souhaitez pas mettre à jour les versions, vous pouvez également [modifier manuellement](#modification-manuelle) la clé.

## Conséquences de la rotation en l'absence d'approbation de la nouvelle clé

Si vous essayez d'installer ou de mettre à niveau les packages de l'Agent via `apt`, `yum`, `dnf` ou `zypper` depuis `apt.datadoghq.com` ou `yum.datadoghq.com` sans approuver la nouvelle clé, cela entraîne une erreur.

Voici quelques exemples des erreurs générées :

```
E: The repository 'https://apt.datadoghq.com stable Release' is not signed.
```
```
E: Package 'datadog-agent' has no installation candidate
```
```
The following signatures couldn't be verified because the public key is not available: NO_PUBKEY
```
```
The GPG keys listed for the "Datadog, Inc." repository are already installed but they are not correct for this package.
Check that the correct key URLs are configured for this repository.
```
```
Public key for datadog-agent-7.57.1-1.x86_64.rpm is not installed. Failing package is: datadog-agent-1:7.57.1-1.x86_64
```
```
Error: GPG check FAILED
```

Pour `apt`, ces erreurs s'appliquent aux nouvelles versions et aux versions existantes de l'Agent. Pour `yum`, `dnf` ou `zypper`, il est tout de même possible d'installer les versions existantes de l'Agent, tant que `repo_gpgcheck=0` est défini dans le fichier `datadog.repo` ou `datadog-observability-pipelines-worker.repo`.

Cette rotation des clés n'a aucune incidence sur les installations reposant sur le téléchargement manuel des packages et l'utilisation de `dpkg` ou `rpm`. Il est possible qu'un avertissement soit généré pour `rpm`.

## Modification manuelle

Datadog vous conseille d'utiliser l'une des [méthodes d'installation](#methodes-d-installation-avec-approbation-automatique-de-la-nouvelle-clé-GPG) ci-dessus, afin d'approuver automatiquement la nouvelle clé GPG ainsi que les prochaines clés. Si vous n'avez pas la possibilité de procéder ainsi, référez-vous aux instructions suivantes pour télécharger et approuver manuellement la nouvelle clé.

{{< tabs >}}
{{% tab "Debian/Ubuntu" %}}

Exécutez les commandes suivantes sur le host :

```bash
$ sudo touch /usr/share/keyrings/datadog-archive-keyring.gpg
$ sudo chmod a+r /usr/share/keyrings/datadog-archive-keyring.gpg
$ curl https://keys.datadoghq.com/DATADOG_APT_KEY_C0962C7D.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
$ curl https://keys.datadoghq.com/DATADOG_APT_KEY_C0962C7D.public | sudo apt-key add -
```

{{% /tab %}}
{{% tab "RedHat/CentOS/SUSE" %}}

Exécutez la commande suivante sur le host :

```
$ sudo rpm --import https://keys.datadoghq.com/DATADOG_RPM_KEY_B01082D3.public
```

{{% /tab %}}
{{< /tabs >}}

## Vérifier si un host a approuvé la nouvelle clé GPG

{{< tabs >}}
{{% tab "Debian/Ubuntu" %}}

Un host a approuvé la nouvelle clé si l'une des deux conditions suivantes se vérifie :

- Le fichier `/usr/share/keyrings/datadog-archive-keyring.gpg` est disponible et le fichier de liste des sources Datadog inclut l'option `[signed-by=/usr/share/keyrings/datadog-archive-keyring.gpg]`.
  - Pour les installations d'Agent, le fichier de liste des sources s'intitule généralement `/etc/apt/sources.list.d/datadog.list`.
  - Pour les installations du worker Observability Pipelines, le fichier de liste des sources s'intitule généralement `/etc/apt/sources.list.d/datadog-observability-pipelines-worker.list`.
- Le fichier de liste des sources Datadog n'inclut pas l'option `signed-by`, mais la version 1.3.1 ou une version ultérieure de `datadog-signing-keys` est installée, ce qui fait que le fichier `/etc/apt/trusted.gpg.d/datadog-archive-keyring.gpg` est disponible.

Les fichiers `/usr/share/keyrings/datadog-archive-keyring.gpg` et `/etc/apt/trusted.gpg.d/datadog-archive-keyring.gpg` (ce dernier étant facultatif) sont créés avec l'une des [méthodes d'installation](#methodes-d-installation-avec-approbation-automatique-de-la-nouvelle-cle-GPG) prises en charge ou avec l'installation du [package `datadog-signing-keys`](#package-datadog-signing-keys). Vérifiez que vous avez installé la version 1.3.1] ou une version ultérieure de `datadog-signing-keys`, sauf si vous utilisez l'une des [versions des méthodes d'installation décrites plus haut dans ce guide](#methodes-d-installation-avec-approbation-automatique-de-la-nouvelle-cle-GPG).

{{% /tab %}}
{{% tab "RedHat/CentOS/SUSE" %}}

Exécutez la commande suivante sur le host :

```bash
$ rpm -qa | grep gpg-pubkey-b01082d3
```

Si la clé a été approuvée, la commande génère un code de sortie 0 et indique ce qui suit :

```
gpg-pubkey-b01082d3-644161ac
```

Si la clé n'a pas été approuvée, la commande génère un autre code de sortie et n'affiche aucun message.

Sinon, vérifiez si votre fichier repo contient l'entrée `gpgkey` `https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public`. Ce fichier s'intitule généralement `datadog.repo` pour les installations d'Agent ou `datadog-observability-pipelines-worker.repo` pour le worker Observability Pipelines. Dès que la nouvelle clé est utilisée, elle est ajoutée au fichier de clés `CURRENT`.

{{% /tab %}}
{{< /tabs >}}

## Package `datadog-signing-keys`

<div class="alert alert-info">Cette section s'applique uniquement aux personnes utilisant le package DEB de l'Agent.</div>

Depuis les versions 6.31.0 et 7.31.0 de l'Agent, tous les packages DEB Datadog présentent une dépendance souple au package `datadog-signing-keys`. Les versions suivantes des packages de l'Agent possèdent une dépendance souple à la version `1.3.1` du package `datadog-signing-keys` :
- datadog-agent, datadog-iot-agent, datadog-heroku-agent, datadog-dogstatsd, datadog-agent-dbg v6.48.1+ et v7.48.1+
- datadog-fips-proxy v0.5.4+
- observability-pipelines-worker v1.3.1+
- datadog-apm-inject v0.10.7+
- datadog-apm-library-python v1.18.0+
- datadog-apm-library-java v1.19.1+
- datadog-apm-library-dotnet v2.36.0+
- datadog-apm-library-js v4.11.0+
- datadog-apm-library-all v0.3+

Une fois installé, le package effectue les opérations suivantes :

- Il configure les clés APT dans le trousseau `/usr/share/keyrings/datadog-archive-keyring.gpg`, ainsi que dans le fichier `/etc/apt/trusted.gpg.d/datadog-archive-keyring.gpg` si nécessaire. **Cela permet d'approuver la prochaine clé de signature du référentiel APT.** Il est conseillé d'utiliser la version 1.3.1 du package `datadog-signing-keys` pour garantir la gestion de la prochaine rotation des clés.
- Il définit une [stratégie `debsig-verify`][12] pour les packages Datadog. Cela vous permet de vérifier les signatures de chaque package DEB local.

Par exemple, pour vérifier qu'un package DEB téléchargé localement a été conçu et signé par Datadog, exécutez la commande suivante :

  ```bash
  $ debsig-verify datadog-dogstatsd_7.51.0-1_amd64.deb
  ```

Si la vérification fonctionne, `debsig-verify` génère le statut `0` et affiche le message `debsig: Verified package from 'Datadog, Inc.' (Datadog).`. Les packages DEB Datadog intègrent des signatures depuis la version 6.26.0/7.26.0. Ce processus de vérification ne fonctionne donc pas pour les versions antérieures.

Étant donné que la dépendance du package `datadog-signing-keys` aux versions 6.48.0+/7.48.0 de l'Agent est facultative, l'installation peut échouer si :

- vous avez téléchargé manuellement le package DEB de l'Agent et l'avez installé sans avoir configuré le référentiel Datadog en tant que source APT ;
- vous avez dupliqué le package DEB de l'Agent sur votre propre référentiel APT sans avoir également dupliqué le package `datadog-signing-keys` ;
- votre configuration APT a été définie de façon à ne pas installer les packages recommandés (avec la commande `apt` with ` --no-install-recommends` ou l'option `APT::Install-Recommends "0"` dans `apt.conf`).

Les deux premières méthodes ne nécessitant pas de vérification des métadonnées du référentiel Datadog, la rotation des clés n'a donc aucune incidence. Il peut toutefois être utile d'utiliser les fichiers de stratégie `debsig-verify` transmis avec le package `datadog-signing-keys`.

Pour la troisième méthode, si vous avez installé le package de l'Agent depuis `apt.datadoghq.com` via `apt`, vous devez explicitement installer le package `datadog-signing-keys`. Il est également possible d'utiliser l'une des [méthodes d'installation](#methodes-d-installation-avec-approbation-automatique-de-la-nouvelle-clé-GPG) prises en charge.

## Incidences pour la version 5 de l'Agent

Les personnes qui utilisent la version 5 de l'Agent sur des systèmes basés sur DEB (Debian/Ubuntu) doivent également approuver la nouvelle clé de signature afin de pouvoir installer ou mettre à jour l'Agent après la rotation. Les personnes qui utilisent la version 5 de l'Agent sur des systèmes basés sur RPM (RedHat/CentOS/SUSE) ne sont pas concernées par cette rotation.

**Remarque** : la version 5 de l'Agent repose sur Python 2, qui a atteint sa fin de vie le 1er janvier 2020. Datadog vous conseille de [passer à la version 7 de l'Agent][13].

[1]: https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
[2]: https://keys.datadoghq.com/DATADOG_RPM_KEY_B01082D3.public
[3]: https://keys.datadoghq.com/DATADOG_APT_KEY_F14F620E.public
[4]: https://keys.datadoghq.com/DATADOG_APT_KEY_C0962C7D.public
[5]: https://install.datadoghq.com/scripts/install_script_agent7.sh
[6]: https://github.com/DataDog/chef-datadog
[7]: https://github.com/DataDog/ansible-datadog
[8]: https://github.com/DataDog/puppet-datadog-agent
[9]: https://github.com/DataDog/datadog-formula
[10]: https://github.com/DataDog/heroku-buildpack-datadog
[11]: https://docs.datadoghq.com/fr/integrations/amazon_elasticbeanstalk
[12]: https://manpages.ubuntu.com/manpages/jammy/man1/debsig-verify.1.html
[13]: https://app.datadoghq.com/account/settings/agent/latest
[14]: https://github.com/ansible-collections/Datadog