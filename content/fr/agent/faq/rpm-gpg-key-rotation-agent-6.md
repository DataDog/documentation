---

title: Rotation des clés GPG RPM
---

<div class="alert alert-warning">
Cette page traite de la rotation des clés pour 2019. Pour la rotation des clés pour 2022, consultez la documentation <a href="/agent/guide/linux-agent-2022-key-rotation">Rotation des clés de l'Agent Linux pour 2022</a>.
</div>


À compter de la version 6.14.0, les packages RPM de l'Agent sont signés à l'aide d'une clé GPG différente. Dans le cadre de ses pratiques de sécurité, Datadog met régulièrement à jour la clé GPG.

Les hosts utilisant des packages RPM issus du [référentiel Yum de Datadog][1] sont concernés par ce changement et doivent approuver la clé en important la clé publique associée dans leurs keyrings.

Toute tentative d'installation ou de mise à niveau du package de l'Agent sans avoir au préalable approuvé la clé entraînera des erreurs `NOKEY` lors de l'installation du package.

L'empreinte digitale de la clé publique associée est la suivante : `A4C0B90D7443CF6E4E8AA341F1068E14E09422B3`.

Si vous utilisez la dernière version de l'une des méthodes d'installation officiellement prises en charge suivantes, vos hosts approuveront la clé automatiquement et aucune autre action n'est requise.

* [Page d'installation de l'Agent][2]
* [Cookbook Chef][3]
* [Rôle Ansible][4]
* [Module Puppet][5]
* [Formule SaltStack][6]

## Vérifier si un host a approuvé la clé GPG

Pour vérifier si un host spécifique a approuvé la clé, exécutez la commande suivante sur ce dernier :

```bash
rpm -q gpg-pubkey-e09422b3
```

Si la clé a été approuvée, la commande génère un code de sortie 0 et indique ce qui suit :

```bash
gpg-pubkey-e09422b3-57744e9e
```

Si la clé n'a pas été approuvée, la commande génère un autre code de sortie et indique ce qui suit :

```bash
package gpg-pubkey-e09422b3 is not installed
```

## Approuver les clés GPG

Cette étape n'est pas requise si les hosts ont déjà approuvé les clés ou si une version récente d'une méthode d'installation officielle est utilisée.

### Commande import

Exécutez les commandes suivantes sur le host :

```bash
$ curl -o /tmp/DATADOG_RPM_KEY_CURRENT.public https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public
$ curl -o /tmp/DATADOG_RPM_KEY_FD4BF915.public https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
$ curl -o /tmp/DATADOG_RPM_KEY_E09422B3.public https://keys.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public

$ rpm --import /tmp/DATADOG_RPM_KEY_CURRENT.public
$ rpm --import /tmp/DATADOG_RPM_KEY_FD4BF915.public
$ rpm --import /tmp/DATADOG_RPM_KEY_E09422B3.public
```

Vérifiez ensuite que les clés ont été approuvées en suivant les étapes de la rubrique [Vérifier si un host a approuvé la clé GPG](#verifier-si-un-host-a-approuve-la-cle-gpg).

### Mise à jour du fichier du référentiel Yum

Sur CentOS, RHEL et Amazon Linux, si le fichier de votre référentiel Yum est utilisé pour définir le référentiel Datadog (`datadog.repo`), mettez-le à jour pour ajouter la clé en tant que clé approuvée :

{{< tabs >}}
{{% tab "Agent v7" %}}

```conf
[datadog]
name = Datadog, Inc.
baseurl = https://yum.datadoghq.com/stable/7/x86_64/
enabled=1
gpgcheck=1
repo_gpgcheck=1
gpgkey=https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public
       https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
       https://keys.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public
```

{{% /tab %}}
{{% tab "Agent v6" %}}

```conf
[datadog]
name = Datadog, Inc.
baseurl = https://yum.datadoghq.com/stable/6/x86_64/
enabled=1
gpgcheck=1
repo_gpgcheck=1
gpgkey=https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public
       https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
       https://keys.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public
       https://keys.datadoghq.com/DATADOG_RPM_KEY.public
```

{{% /tab %}}
{{< /tabs >}}

 **Remarque** : en raison d'un [bug dans dnf][7], utilisez `repo_gpgcheck=0` au lieu de `repo_gpgcheck=1` pour RHEL/CentOS 8.1.

**Remarque** : cette méthode ne fonctionne pas sur les systèmes basés sur SUSE. Utilisez la [commande import](#commande-import) à la place.

[1]: https://yum.datadoghq.com
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://github.com/DataDog/chef-datadog
[4]: https://github.com/DataDog/ansible-datadog
[5]: https://github.com/DataDog/puppet-datadog-agent
[6]: https://github.com/DataDog/datadog-formula
[7]: https://bugzilla.redhat.com/show_bug.cgi?id=1792506
