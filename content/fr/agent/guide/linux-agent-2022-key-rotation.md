---
aliases:
- /fr/agent/faq/linux-agent-2022-key-rotation
kind: guide
title: Rotation des clés de l'Agent Linux pour 2022
---

Dans le cadre de ses pratiques de sécurité, Datadog effectue régulièrement la rotation des clés et certificats servant à signer les packages de l'Agent Datadog. Les clés GPG suivantes, qui servent à signer les packages RPM et DEB de l'Agent, atteignent leur fin de vie en juin 2022 et ont été remplacées en avril 2022 :

- La clé de signature avec le hash [`A4C0B90D7443CF6E4E8AA341F1068E14E09422B3`][1] a été remplacée le 11 avril 2022 à 14 h (heure de Paris) par la clé avec le hash [`C6559B690CA882F023BDF3F63F4D1729FD4BF915`][2]. Pour installer les premières versions de RPM qui ont publiées après ce changement (6.36 et 7.36), la nouvelle clé doit être approuvée.
- La clé de signature DEB avec le hash [`A2923DFF56EDA6E76E55E492D3A80E30382E94DE`][3] sera remplacée le 2 mai 2022 à 14 h (heure de Paris) par la clé avec le hash [`D75CEA17048B9ACBF186794B32637D44F14F620E`][4]. APT vérifie la signature des métadonnées du référentiel. Ainsi, à compter de cette date, si vous voulez installer une version existante ou future de l'Agent depuis `apt.datadoghq.com`, la nouvelle clé doit être approuvée.

Une fois la rotation effectuée, si vous utilisez des packages RPM ou DEB Datadog, vous devrez potentiellement importer manuellement la nouvelle clé dans vos systèmes, afin d'installer ou de mettre à niveau l'Agent.

<div class="alert alert-info">
<strong>Remarque </strong>: cette rotation n'a AUCUNE incidence sur le fonctionnement des Agents existants. Elle s'applique uniquement à l'installation d'une nouvelle version de l'Agent. De même, les Agents Linux Dockerisés, Windows et macOS ne sont pas concernés par ce changement de clé.
</div>

## Méthodes d'installation avec approbation automatique de la nouvelle clé GPG

Si vous utilisez l'une des méthodes d'installation suivantes, votre host approuve automatiquement la nouvelle clé (sans opération supplémentaire requise) :

- [Script d'installation de l'Agent][5], version 1.6.0 (publiée le 26 juillet 2021) ou ultérieure
- [Cookbook Chef][6], version 4.11.0 (publiée le 10 août 2021) ou ultérieure
- [Rôle Ansible][7], version 4.10.0 (publiée le 25 mai 2021) ou ultérieure
- [Module Puppet][8], version 3.13.0 (publiée le 11 août 2021) ou ultérieure
- [Formule SaltStack][9], version 3.4 (publiée le 12 août 2021) ou ultérieure
- [Buildpack Heroku][10], version 1.26 (publiée le 26 mai 2021) ou ultérieure
- Modèles de configuration [Elastic Beanstalk][11], mis à jour le 29 mars 2021 ou à une date ultérieure (doit inclure `DATADOG_RPM_KEY_FD4BF915.public` sous `gpgkey`)
- Agents conteneurisés (Docker/Kubernetes), toutes les versions
- Agents Windows/macOS, toutes les versions

En outre, si vous installez le package DEB de l'Agent v7.31.0+ via `apt` depuis le référentiel `apt.datadoghq.com`, le package `datadog-signing-keys` doit être installé sur vos hosts, afin d'ajouter automatiquement la nouvelle clé. Si vous avez installé la version 1.1.0 ou une version ultérieure du package `datadog-signing-keys`, aucune opération supplémentaire n'est requise. Si vous utilisez une version plus ancienne, vous devez installer la [version 1.1.0](#version-110-de-datadog-signing-keys) pour que vos hosts puissent gérer la rotation des clés.

Si vous installez le package DEB de l'Agent à partir d'un autre référentiel, ou si vous n'utilisez pas `apt` (ou tout autre outil similaire vérifiant les signatures des métadonnées d'un référentiel), votre système n'est pas tenu de connaître les clés de signature Datadog. Par conséquent, aucune opération supplémentaire n'est requise. Il peut toutefois s'avérer utile d'utiliser le [package `datadog-signing-keys`](#package-datadog-signing-keys).

Si vous ne savez pas si un host a approuvé la nouvelle clé de signature, vous pouvez [vérifier si c'est bien le cas](#verifier-si-un-host-a-approuve-la-nouvelle-cle-gpg).

Pour les hosts utilisant des versions trop anciennes des méthodes d'installation indiquées ci-dessous ou du package DEB, Datadog vous conseille d'installer la dernière version de la méthode d'installation. Les utilisateurs Debian et Ubuntu ont également la possibilité d'installer la version 7.31.0 ou une version ultérieure de l'Agent. Si vous ne souhaitez pas mettre à jour les versions, vous pouvez également [modifier manuellement](#modification-manuelle) la clé.

## Conséquences de la rotation en l'absence d'approbation de la nouvelle clé

{{< tabs >}}
{{% tab "Debian/Ubuntu" %}}

Si vous essayez d'installer ou de mettre à jour les packages d'Agent avec `apt` depuis `apt.datadoghq.com` sans avoir au préalable approuvé la nouvelle clé, vous obtenez des erreurs `NO_PUBKEY`. Ce comportement se vérifier à la fois pour les nouvelles versions et pour les versions existantes de l'Agent.

```
The following signatures couldn't be verified because the public key is not available: NO_PUBKEY
```


Cette rotation des clés n'a aucune incidence sur les installations qui ont été effectuées depuis des sources autres que `apt.datadoghq.com` ou via un téléchargement manuel du package depuis `apt.datadoghq.com`.

{{% /tab %}}
{{% tab "RedHat/CentOS/SUSE" %}}

L'installation des nouvelles versions de l'Agent publiées depuis avril 2022 entraîne des erreurs `NOKEY`. Vous pouvez néanmoins toujours installer les versions antérieures de l'Agent.

```
The GPG keys listed for the "Datadog, Inc." repository are already installed but they are not correct for this package.
Check that the correct key URLs are configured for this repository.
```

{{% /tab %}}
{{< /tabs >}}

## Modification manuelle

Datadog vous conseille d'utiliser l'une des [méthodes d'installation](#methodes-d-installation-avec-approbation-automatique-de-la-nouvelle-clé-GPG) ci-dessus, afin d'approuver automatiquement la nouvelle clé GPG ainsi que les prochaines clés. Si vous n'avez pas la possibilité de procéder ainsi, référez-vous aux instructions suivantes pour télécharger et approuver manuellement la nouvelle clé.

{{< tabs >}}
{{% tab "Debian/Ubuntu" %}}

Exécutez les commandes suivantes sur le host :

```bash
$ curl -o /tmp/DATADOG_APT_KEY_F14F620E https://keys.datadoghq.com/DATADOG_APT_KEY_F14F620E.public
$ sudo apt-key add /tmp/DATADOG_APT_KEY_F14F620E
$ sudo touch /usr/share/keyrings/datadog-archive-keyring.gpg
$ cat /tmp/DATADOG_APT_KEY_F14F620E | sudo gpg --import --batch --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg
$ sudo chmod a+r /usr/share/keyrings/datadog-archive-keyring.gpg
```

{{% /tab %}}
{{% tab "RedHat/CentOS/SUSE" %}}

Exécutez les commandes suivantes sur le host :

```
$ curl -o /tmp/DATADOG_RPM_KEY_FD4BF915 https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
$ sudo rpm --import /tmp/DATADOG_RPM_KEY_FD4BF915
```

{{% /tab %}}
{{< /tabs >}}

## Vérifier si un host a approuvé la nouvelle clé GPG

{{< tabs >}}
{{% tab "Debian/Ubuntu" %}}

Un host a approuvé la nouvelle clé si l'une des deux conditions suivantes se vérifie :

- Le fichier `/usr/share/keyrings/datadog-archive-keyring.gpg` est disponible et le fichier de liste des sources Datadog (généralement `/etc/apt/sources.list.d/datadog.list`) inclut l'option `[signed-by=/usr/share/keyrings/datadog-archive-keyring.gpg]`.
- Le fichier de liste des sources Datadog n'inclut pas l'option `signed-by`, mais la version 1.1.0 ou une version ultérieure de `datadog-signing-keys` est installée, ce qui fait que le fichier `/etc/apt/trusted.gpg.d/datadog-archive-keyring.gpg` est disponible.

Les fichiers `/usr/share/keyrings/datadog-archive-keyring.gpg` et `/etc/apt/trusted.gpg.d/datadog-archive-keyring.gpg` (ce dernier étant facultatif) sont créés avec l'une des [méthodes d'installation](#methodes-d-installation-avec-approbation-automatique-de-la-nouvelle-clé-GPG) prises en charge ou avec l'installation du [package `datadog-signing-keys`](#package-datadog-signing-keys). Vérifiez que vous avez installé la [version 1.1.0](#version-110-de-datadog-signing-keys) ou une version ultérieure de `datadog-signing-keys`, sauf si vous utilisez l'une des [versions des méthodes d'installation décrites plus haut dans ce guide](#methodes-d-installation-avec-approbation-automatique-de-la-nouvelle-clé-GPG).

{{% /tab %}}
{{% tab "RedHat/CentOS/SUSE" %}}

Exécutez la commande suivante sur le host :

```bash
$ rpm -qa | grep gpg-pubkey-fd4bf915
```

Si la clé a été approuvée, la commande génère un code de sortie 0 et indique ce qui suit :

```
gpg-pubkey-fd4bf915-5f573efe
```

Si la clé n'a pas été approuvée, la commande génère un autre code de sortie et n'affiche aucun message.

Vous avez également la possibilité de vérifier si votre fichier `datadog.repo` contient l'entrée `gpgkey` suivante : `https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public`. La nouvelle clé est ajoutée à ce fichier dès qu'elle est utilisée.

{{% /tab %}}
{{< /tabs >}}

## Package `datadog-signing-keys`

<div class="alert alert-info"><strong>Remarque :</strong> cette section s'applique uniquement aux personnes utilisant le package DEB de l'Agent.</div>

Depuis la version 6.31.0/7.31.0 de l'Agent, tous les packages DEB Datadog présentent une dépendance souple au package `datadog-signing-keys`.

Une fois installé, le package effectue les opérations suivantes :

- Il configure les clés APT dans le trousseau `/usr/share/keyrings/datadog-archive-keyring.gpg`, ainsi que dans le fichier `/etc/apt/trusted.gpg.d/datadog-archive-keyring.gpg` si nécessaire. **Cela permet d'approuver la prochaine clé de signature du référentiel APT.** Il est conseillé d'utiliser la [version 1.1.0 du package `datadog-signing-keys`](#version-110-de-datadog-signing-keys) pour garantir la gestion de la prochaine rotation des clés.
- Il définit une [stratégie `debsig-verify`][12] pour les packages Datadog. Cela vous permet de vérifier les signatures de chaque package DEB local.

Par exemple, pour vérifier qu'un package DEB téléchargé localement a été conçu et signé par Datadog, exécutez la commande suivante :

  ```bash
  $ debsig-verify datadog-dogstatsd_7.34.0-1_amd64.deb
  ```

Si la vérification fonctionne, `debsig-verify` génère le statut `0` et affiche le message `debsig: Verified package from 'Datadog, Inc.' (Datadog).`. Les packages DEB Datadog intègrent des signatures depuis la version 6.26.0/7.26.0. Ce processus de vérification ne fonctionne donc pas pour les versions antérieures.

Étant donné que la dépendance du package `datadog-signing-keys` aux versions 6.31.0+/7.31.0 de l'Agent est facultative, l'installation peut échouer si :

- vous avez téléchargé manuellement le package DEB de l'Agent et l'avez installé sans avoir configuré le référentiel Datadog en tant que source APT ;
- vous avez dupliqué le package DEB de l'Agent sur votre propre référentiel APT sans avoir également dupliqué le package `datadog-signing-keys` ;
- votre configuration APT a été définie de façon à ne pas installer les packages recommandés (avec la commande `apt` with ` --no-install-recommends` ou l'option `APT::Install-Recommends "0"` dans `apt.conf`).

Les deux premières méthodes ne nécessitant pas de vérification des métadonnées du référentiel Datadog, la rotation des clés n'a donc aucune incidence. Il peut toutefois être utile d'utiliser les fichiers de stratégie `debsig-verify` transmis avec le package `datadog-signing-keys`.

Pour la troisième méthode, si vous avez installé le package de l'Agent depuis `apt.datadoghq.com` via `apt`, vous devez explicitement installer le package `datadog-signing-keys`. Il est également possible d'utiliser l'une des [méthodes d'installation](#methodes-d-installation-avec-approbation-automatique-de-la-nouvelle-clé-GPG) prises en charge.

### Version 1.1.0 de datadog-signing-keys

<div class="alert alert-info"><strong>Remarque :</strong> cette section s'applique uniquement aux personnes utilisant le package DEB de l'Agent.</div>

Les versions antérieures de `datadog-signing-keys` ne prennent pas en charge les cas particuliers suivants :

* Sous Ubuntu 16+ et Debian 9+, seul `/usr/share/keyrings/datadog-archive-keyring.gpg` a été créé ; `/etc/apt/trusted.gpg.d/datadog-archive-keyring.gpg` n'a pas été créé.
* Si le fichier de liste de sources APT (p. ex., `/etc/apt/sources.list.d/datadog.list`) n'inclut pas l'option `[signed-by=/usr/share/keyrings/datadog-archive-keyring.gpg]`, APT ne sait pas qu'une nouvelle clé existe. Toute opération dans le référentiel Datadog échoue donc après la rotation.

La version 1.1.0 de `datadog-signing-keys` résout ces problèmes en créant `/etc/apt/trusted.gpg.d/datadog-archive-keyring.gpg` lorsque la liste `/etc/apt/sources.list.d/datadog.list` ne contient pas l'option `signed-by` adéquate. Ce comportement permet de couvrir les cas particuliers ci-dessus.

Les personnes utilisant les [méthodes d'installation](#methodes-d-installation-avec-approbation-automatique-de-la-nouvelle-clé-GPG) prises en charge et à jour à l'aide des sources Datadog par défaut disposent systématiquement de l'option `signed-by`. Ce problème ne les concerne donc pas. Datadog conseille fortement aux autres utilisateurs de passer à la version 1.1.0 de `datadog-signing-keys` pour garantir la gestion de la prochaine rotation des clés.

## Incidences pour la version 5 de l'Agent

Les personnes qui utilisent la version 5 de l'Agent sur des systèmes basés sur DEB (Debian/Ubuntu) doivent également approuver la nouvelle clé de signature afin de pouvoir installer ou mettre à jour l'Agent après la rotation. Les personnes qui utilisent la version 5 de l'Agent sur des systèmes basés sur RPM (RedHat/CentOS/SUSE) ne sont pas concernées par cette rotation.

**Remarque** : la version 5 de l'Agent repose sur Python 2, qui a atteint sa fin de vie le 1er janvier 2021. Datadog vous conseille de [passer à la version 7 de l'Agent][13].

[1]: https://keys.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public
[2]: https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
[3]: https://keys.datadoghq.com/DATADOG_APT_KEY_382E94DE.public
[4]: https://keys.datadoghq.com/DATADOG_APT_KEY_F14F620E.public
[5]: https://s3.amazonaws.com/dd-agent/scripts/install_script.sh
[6]: https://github.com/DataDog/chef-datadog
[7]: https://github.com/DataDog/ansible-datadog
[8]: https://github.com/DataDog/puppet-datadog-agent
[9]: https://github.com/DataDog/datadog-formula
[10]: https://github.com/DataDog/heroku-buildpack-datadog
[11]: https://docs.datadoghq.com/fr/integrations/amazon_elasticbeanstalk
[12]: https://manpages.ubuntu.com/manpages/jammy/man1/debsig-verify.1.html
[13]: https://app.datadoghq.com/account/settings#agent