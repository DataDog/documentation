---
aliases:
- /fr/tracing/languages/php
- /fr/agent/apm/php/
- /fr/tracing/php/
- /fr/tracing/setup/php
- /fr/tracing/setup_overview/php
- /fr/tracing/setup_overview/setup/php
- /fr/tracing/faq/php-tracer-manual-installation/
- /fr/tracing/trace_collection/automatic_instrumentation/dd_libraries/php
code_lang: php
code_lang_weight: 40
further_reading:
- link: /tracing/guide/trace-php-cli-scripts/
  tag: Guide
  text: Tracer des scripts CLI PHP
- link: https://www.datadoghq.com/blog/monitor-php-performance/
  tag: Blog
  text: Surveillance PHP avec l'APM et le tracing distribué de Datadog
- link: https://github.com/DataDog/dd-trace-php
  tag: Code source
  text: Code source
- link: https://github.com/DataDog/dd-trace-php/blob/master/CONTRIBUTING.md
  tag: Code source
  text: Contribuer au projet open source
- link: /tracing/glossary/
  tag: Documentation
  text: Explorer vos services, ressources et traces
title: Tracer des applications PHP
type: multi-code-lang
---
## Exigences de compatibilité {#compatibility-requirements}

La version minimale requise de PHP pour la dernière version de `dd-trace-php` est PHP 7. Si vous utilisez PHP 5, vous pouvez toujours utiliser le traceur PHP jusqu'à la version [0.99](https://github.com/DataDog/dd-trace-php/releases/tag/0.99.0). PHP 5 est en fin de vie depuis la version 1.0 de la bibliothèque PHP.

Pour obtenir la liste complète des frameworks et versions PHP pris en charge (y compris les anciennes versions et les versions de maintenance), consultez la page relative aux [exigences de compatibilité][1].

## Commencer {#getting-started}

Avant de commencer, vérifiez que vous avez bien [installé et configuré l'Agent][14].

### Installer l'extension {#install-the-extension}

Téléchargez le programme d'installation officiel :

```shell
curl -LO https://github.com/DataDog/dd-trace-php/releases/latest/download/datadog-setup.php
```

Si vous utilisez Alpine Linux, vous devez installer `libgcc_s` avant d'exécuter l'installateur :

```shell
apk add libgcc
```

Exécutez le programme d'installation :

```shell
# Full installation: APM + AAP + Profiling
php datadog-setup.php --php-bin=all --enable-appsec --enable-profiling

# APM only
php datadog-setup.php --php-bin=all

# APM + AAP
php datadog-setup.php --php-bin=all --enable-appsec

# APM + Profiling
php datadog-setup.php --php-bin=all --enable-profiling
```

<div class="alert alert-warning">
<strong>Remarque</strong> : Seul APM est pris en charge sur Windows. Ne pas utiliser les <code>--enable-appsec</code> et <code>--enable-profiling</code> drapeaux lors du traçage des applications PHP sur Windows.
</div>

Cette commande installe l'extension sur tous les binaires PHP trouvés sur l'hôte ou dans le conteneur. Si `--php-bin` est omis, l'installateur s'exécute en mode interactif et demande à l'utilisateur de sélectionner les binaires à installer. La valeur de `--php-bin` peut être un chemin vers un binaire spécifique si `dd-trace-php` doit être installé uniquement sur ce binaire.

Redémarrez PHP (PHP-FPM ou le SAPI Apache) et visitez un point de terminaison activé pour le traçage de votre application. Pour voir les traces générées, allez à la [page des traces APM][4].

Lorsque vous ne spécifiez pas `--enable-appsec`, l'extension AppSec se charge brièvement au démarrage et n'est pas activée par défaut. Elle court-circuite immédiatement, entraînant une surcharge de performance négligeable.

<div class="alert alert-info">
Il peut falloir quelques minutes avant que les traces n'apparaissent dans l'interface utilisateur. Si les traces n'apparaissent toujours pas après quelques minutes, créez un <a href="/tracing/troubleshooting/tracer_startup_logs?tab=php#php-info"><code>phpinfo()</code></a> page depuis la machine hôte et faites défiler vers le bas jusqu'au `ddtrace`. Les vérifications de diagnostic échouées apparaissent dans cette section pour aider à identifier d'éventuels problèmes.
</div>

<div class="alert alert-danger">
<strong>Apache ZTS :</strong>
Si le binaire PHP CLI est construit en tant que NTS (non thread-safe), tandis qu'Apache utilise une version ZTS (Zend thread-safe) de PHP, vous devez modifier manuellement le chargement de l'extension pour le binaire ZTS. Exécution <code>/path/to/php-zts --ini</code> pour trouver où se trouve le fichier de Datadog, <code>.ini</code> ajoutez ensuite le <code>-zts</code> suffixe du nom de fichier. Par exemple, à partir de <code>extension=ddtrace-20210902.so</code> par <code>extension=ddtrace-20210902-zts.so</code>.
</div>

<div class="alert alert-danger">
<strong>SELinux :</strong>
Si les politiques SELinux httpd sont configurées sur l'hôte, la fonctionnalité du SDK peut être limitée, à moins que l'écriture et l'exécution de fichiers temporaires ne soient explicitement autorisées dans la configuration SELinux :

`allow httpd_t httpd_tmpfs_t:file { execute execute_no_trans };`

</div>

## Instrumentation automatique {#automatic-instrumentation}

Le traçage est automatiquement activé par défaut. Une fois l'extension installée, **ddtrace** trace votre application et envoie les traces à l'Agent.

Datadog prend en charge tous les frameworks web dès le départ. L'instrumentation automatique fonctionne en modifiant l'exécution de PHP pour envelopper certaines fonctions et méthodes afin de les tracer. Le traceur PHP prend en charge l'instrumentation automatique pour plusieurs bibliothèques.

L'instrumentation automatique capture :

* Temps d'exécution de la méthode
* Données de trace pertinentes, telles que l'URL et les codes de réponse d'état pour les requêtes web ou les requêtes SQL pour l'accès à la base de données
* Exceptions non gérées, y compris les traces de pile si disponibles
* Un nombre total de traces (par exemple, des requêtes web) circulant dans le système

## Configuration {#configuration}

Si nécessaire, configurez le SDK pour envoyer des données de télémétrie de performance d'application comme vous le souhaitez, y compris la configuration du Tagging de Service Unifié. Consultez [Configuration de la bibliothèque][6] pour plus de détails.

Pour contrôler l'ingestion des traces par service ou ressource (y compris l'utilisation de caractères génériques dans les noms de ressources), voir [Contrôler l'ingestion des traces avec un échantillonnage basé sur les ressources][15].

## Traçage des scripts CLI à exécution courte et longue {#tracing-short-and-long-running-cli-scripts}

Des étapes supplémentaires sont nécessaires pour instrumenter les scripts CLI. Consultez [Tracer les scripts PHP CLI][7] pour plus d'informations.

## Mise à niveau {#upgrading}

Pour mettre à niveau le traceur PHP, [téléchargez la dernière version][5] et suivez les mêmes étapes que [pour installer l'extension](#install-the-extension).

Une fois l'installation terminée, redémarrez PHP (PHP-FPM ou le SAPI Apache).

**Remarque** : Si vous utilisez la mise en cache de deuxième niveau dans OPcache en définissant le paramètre `opcache.file_cache`, supprimez le dossier de cache.

## Suppression {#removing}

Pour supprimer le tracer PHP :

1. Pour php-fpm, arrêtez le service php-fpm, sinon arrêtez le serveur web Apache.
2. Dissociez les fichiers `98-ddtrace.ini` et `99-ddtrace-custom.ini` de votre dossier de configuration PHP.
3. Pour php-fpm, redémarrez le service php-fpm, sinon redémarrez le serveur web Apache.

**Remarque** : Si vous utilisez la mise en cache de deuxième niveau dans OPcache en définissant le paramètre `opcache.file_cache`, supprimez le dossier de cache.

## Résolution des problèmes d'un plantage d'application {#troubleshooting-an-application-crash}

Si jamais le traceur PHP entraîne le crash de votre application, généralement en raison d'une erreur de segmentation, il est préférable d'obtenir un core dump ou une trace Valgrind et de contacter l'assistance Datadog.

### Installez les symboles de débogage {#install-debug-symbols}

Pour que les core dumps soient lisibles, les symboles de débogage pour les binaires PHP doivent être installés sur le système qui exécute PHP.

Pour vérifier si les symboles de débogage sont installés pour PHP ou PHP-FPM, utilisez `gdb`.

Installez `gdb` :

```
apt|yum install -y gdb
```

Exécutez `gdb` avec le binaire d'intérêt. Par exemple, pour PHP-FPM :

```
gdb php-fpm
```

Si la sortie de `gdb` contient une ligne similaire au texte ci-dessous, alors les symboles de débogage sont déjà installés.

```
...
Reading symbols from php-fpm...Reading symbols from /usr/lib/debug/path/to/some/file.debug...done.
...
```

Si la sortie `gdb` contient une ligne similaire au texte ci-dessous, alors les symboles de débogage doivent être installés :

```
...
Reading symbols from php-fpm...(no debugging symbols found)...done.
...
```


#### Centos {#centos}

Installez le paquet `yum-utils` qui fournit le programme `debuginfo-install` :

```
yum install -y yum-utils
```

Trouvez le nom du package pour vos binaires PHP, il peut varier en fonction de la méthode d'installation de PHP :

```
yum list installed | grep php
```

Installez les symboles de débogage. Par exemple pour le paquet `php-fpm` :

```
debuginfo-install -y php-fpm
```

**Note** : Si le dépôt qui fournit les binaires PHP n'est pas activé par défaut, il peut être activé lors de l'exécution de la commande `debuginfo-install`. Exemple :

```
debuginfo-install --enablerepo=remi-php74 -y php-fpm
```

#### Debian {#debian}

##### PHP installé à partir du DPA Debian Sury {#php-installed-from-the-sury-debian-dpa}

Si PHP a été installé à partir du [DPA Debian Sury][8], les symboles de débogage sont déjà disponibles à partir du DPA. Par exemple, pour PHP-FPM 7.2 :

```
apt update
apt install -y php7.2-fpm-dbgsym
```

##### PHP installé à partir d'un autre paquet {#php-installed-from-a-different-package}

Le projet Debian tient à jour une page wiki avec [des instructions pour installer les symboles de debugging][9].

Éditez le fichier `/etc/apt/sources.list` :

```
# ... leave here all the pre-existing packages

# add a `deb` deb http://deb.debian.org/debian-debug/ $RELEASE-debug main
# For example for buster
deb http://deb.debian.org/debian-debug/ buster-debug main
```

Mettez à jour `apt` :

```
apt update
```

Essayez d'abord les noms de paquets canoniques pour les symboles de débogage. Par exemple, si le nom du paquet est `php7.2-fpm`, essayez :

```
apt install -y php7.2-fpm-dbgsym

# if the above does not work

apt install -y php7.2-fpm-dbg
```

Si les symboles de débogage ne peuvent pas être trouvés, utilisez l'outil utilitaire `find-dbgsym-packages`. Installez le binaire :

```
apt install -y debian-goodies
```

Tentez de trouver les symboles de débogage soit depuis le chemin complet vers le binaire, soit depuis l'id d'un processus en cours d'exécution :

```
find-dbgsym-packages /usr/sbin/php-fpm7.2
```

Installez le nom du package résultant, si trouvé :

```
apt install -y php7.2-fpm-{package-name-returned-by-find-dbgsym-packages}
```

#### Ubuntu {#ubuntu}

##### PHP installé à partir de `ppa:ondrej/php` {#php-installed-from-ppaondrejphp}

Si PHP a été installé à partir de [`ppa:ondrej/php`][10], éditez le fichier source apt `/etc/apt/sources.list.d/ondrej-*.list` en ajoutant le composant `main/debug`.

Avant :

```deb http://ppa.launchpad.net/ondrej/php/ubuntu <version> main```

Après :

```deb http://ppa.launchpad.net/ondrej/php/ubuntu <version> main main/debug```

Mettez à jour et installez les symboles de débogage. Par exemple, pour PHP-FPM 7.2 :

```
apt update
apt install -y php7.2-fpm-dbgsym
```
##### PHP installé à partir d'un autre paquet {#php-installed-from-a-different-package-1}

Trouvez le nom du package pour vos binaires PHP, il peut varier en fonction de la méthode d'installation de PHP :

```
apt list --installed | grep php
```

**Remarque** : Dans certains cas, `php-fpm` peut être un méta-paquet qui fait référence au véritable paquet, par exemple `php7.2-fpm` dans le cas de PHP-FPM 7.2. Dans ce cas, le nom du paquet est ce dernier.

Essayez d'abord les noms de paquets canoniques pour les symboles de débogage. Par exemple, si le nom du paquet est `php7.2-fpm` essayez :

```
apt install -y php7.2-fpm-dbgsym

# if the above does not work

apt install -y php7.2-fpm-dbg
```

Si les paquets `-dbg` et `-dbgsym` ne peuvent pas être trouvés, activez les dépôts `ddebs`. Des informations détaillées sur la façon d'[installer les symboles de débogage][11] à partir de `ddebs` peuvent être trouvées dans la documentation d'Ubuntu.

Par exemple, pour Ubuntu 18.04+, activez le dépôt `ddebs` :

```
echo "deb http://ddebs.ubuntu.com $(lsb_release -cs) main restricted universe multiverse" | tee -a /etc/apt/sources.list.d/ddebs.list

echo "deb http://ddebs.ubuntu.com $(lsb_release -cs)-updates main restricted universe multiverse" | tee -a /etc/apt/sources.list.d/ddebs.list
```

Importez la clé de signature (assurez-vous qu'[elle est correcte][12]) :

```
apt install ubuntu-dbgsym-keyring
apt-key adv --keyserver keyserver.ubuntu.com --recv-keys <SIGNING KEY FROM UBUNTU DOCUMENTATION>
apt update
```

Essayez d'ajouter les noms de paquets canoniques pour les symboles de débogage. Par exemple, si le nom du paquet est `php7.2-fpm` essayez :

```
apt install -y php7.2-fpm-dbgsym

# if the above does not work

apt install -y php7.2-fpm-dbg
```

Dans le cas où les symboles de débogage ne peuvent pas être trouvés, utilisez l'outil utilitaire `find-dbgsym-packages`. Installez le binaire :

```
apt install -y debian-goodies
```

Tentez de trouver les symboles de débogage soit depuis le chemin complet vers le binaire, soit depuis l'id d'un processus en cours d'exécution :

```
find-dbgsym-packages /usr/sbin/php-fpm7.2
```

Installez le nom du package résultant, si trouvé :

```
apt install -y php7.2-fpm-{package-name-returned-by-find-dbgsym-packages}
```

### Obtention d'un vidage mémoire {#obtaining-a-core-dump}

Obtenir un vidage mémoire pour les applications PHP peut être délicat, surtout sur PHP-FPM. Voici quelques conseils pour vous aider à obtenir un vidage mémoire :

1. Déterminez si PHP-FPM a généré un vidage mémoire en consultant le journal des erreurs de l'application :
   - Recherchez `(SIGSEGV - core dumped)` car un message comme celui-ci signifie qu'il a été vidé : `WARNING: [pool www] child <pid> exited on signal 11 (SIGSEGV - core dumped) after <duration> seconds from start`.
   - Recherchez `(SIGSEGV)` car un message comme celui-ci indique que le cœur n'a pas été vidé : `WARNING: [pool www] child <pid> exited on signal 11 (SIGSEGV) after <duration> seconds from start`.
1. Localisez le vidage mémoire en exécutant `cat /proc/sys/kernel/core_pattern`. La valeur par défaut est généralement `core`, ce qui signifie qu'un fichier nommé `core` sera généré dans le dossier racine du web.

Si aucun vidage système n'a été généré, vérifiez les configurations suivantes et modifiez-les en fonction de vos besoins :

1. Si `/proc/sys/kernel/core_pattern` contient un chemin incluant des répertoires imbriqués, assurez-vous que le chemin complet du répertoire existe.
1. Si l'utilisateur exécutant les travailleurs de pool PHP-FPM est autre que `root` (un nom d'utilisateur courant est `www-data`), donnez à cet utilisateur des permissions d'écriture dans le répertoire des vidages mémoire.
1. Assurez-vous que la valeur de `/proc/sys/fs/suid_dumpable` n'est pas `0`. Réglez-le sur `1` ou `2` à moins que vous n'exécutiez le pool de travailleurs PHP-FPM en tant que `root`. Vérifiez vos options avec votre administrateur système.
1. Assurez-vous d'avoir un `rlimit_core` approprié dans la section de configuration du pool PHP-FPM. Vous pouvez le définir sur illimité : `rlimit_core = unlimited`.
1. Assurez-vous d'avoir un `ulimit` approprié configuré dans votre système. Vous pouvez le définir sur illimité : `ulimit -c unlimited`.
1. Si votre application s'exécute dans un conteneur Docker, les modifications de `/proc/sys/*` doivent être effectuées sur la machine hôte. Contactez votre administrateur système pour connaître les options qui s'offrent à vous. Si vous le pouvez, essayez de recréer le problème dans vos environnements de test ou de staging.

### Obtenir un vidage mémoire depuis un conteneur Docker {#obtaining-a-core-dump-from-within-a-docker-container}

Utilisez les informations ci-dessous pour savoir comment obtenir un core dump dans un conteneur Docker :

1. Le conteneur Docker doit s'exécuter en tant que conteneur privilégié, et la valeur `ulimit` pour les fichiers de vidage mémoire doit être définie à son maximum comme indiqué dans les exemples ci-dessous.
   - Si vous utilisez la commande `docker run`, ajoutez les arguments `--privileged` et `--ulimit core=99999999999`
   - Si vous utilisez `docker compose`, ajoutez ce qui suit au fichier `docker-compose.yml` :

```yaml
privileged: true
ulimits:
  core: 99999999999
```
2. Lors de l'exécution du conteneur (et avant de démarrer l'application PHP), vous devez exécuter les commandes suivantes :

```
ulimit -c unlimited
echo '/tmp/core' > /proc/sys/kernel/core_pattern
echo 1 > /proc/sys/fs/suid_dumpable
```

### Obtenir une trace Valgrind {#obtaining-a-valgrind-trace}

Pour obtenir plus de détails sur le crash, exécutez l'application avec Valgrind. Contrairement aux vidages mémoire, cette approche fonctionne toujours dans un conteneur non privilégié.

<div class="alert alert-warning">
<strong>Remarque</strong> : Une application qui s'exécute via Valgrind est de plusieurs ordres de grandeur plus lente que lorsqu'elle s'exécute nativement. Cette méthode est recommandée pour les environnements non productifs.
</div>

Installez Valgrind avec votre gestionnaire de paquets. Exécutez l'application avec Valgrind de manière à générer quelques requêtes.

Pour une application CLI, exécutez :
{{< code-block lang=shell >}}
USE_ZEND_ALLOC=0 valgrind -- php path/to/script.php
{{< /code-block >}}
Lors de l'exécution de `php-fpm`, exécutez :
{{< code-block lang="shell" >}}
USE_ZEND_ALLOC=0 valgrind --trace-children=yes -- php-fpm -F --fpm-config <CONFIG_FILE_PATH> <MORE_OPTIONS>
{{< /code-block >}}
Lors de l'utilisation d'Apache, exécutez :
{{< code-block lang="shell" >}}
(. /etc/apache2/envvars; USE_ZEND_ALLOC=0 valgrind --trace-children=yes -- apache2 -X)`
{{< /code-block >}}

La trace Valgrind résultante est imprimée par défaut sur l'erreur standard, suivez la [documentation officielle][13] pour imprimer sur une cible différente. La sortie attendue est similaire à l'exemple ci-dessous pour un processus PHP-FPM :

```
==322== Conditional jump or move depends on uninitialised value(s)
==322==    at 0x41EE82: zend_string_equal_val (zend_string.c:403)
==322==    ...
==322==    ...
==322==
==322== Process terminating with default action of signal 11 (SIGSEGV): dumping core
==322==    at 0x73C8657: kill (syscall-template.S:81)
==322==    by 0x1145D0F2: zif_posix_kill (posix.c:468)
==322==    by 0x478BFE: ZEND_DO_ICALL_SPEC_RETVAL_UNUSED_HANDLER (zend_vm_execute.h:1269)
==322==    by 0x478BFE: execute_ex (zend_vm_execute.h:53869)
==322==    by 0x47D9B0: zend_execute (zend_vm_execute.h:57989)
==322==    by 0x3F6782: zend_execute_scripts (zend.c:1679)
==322==    by 0x394F0F: php_execute_script (main.c:2658)
==322==    by 0x1FFE18: main (fpm_main.c:1939)
==322==
==322== Process terminating with default action of signal 11 (SIGSEGV)
==322==    ...
==322==    ...
==322==
==322== HEAP SUMMARY:
==322==     in use at exit: 3,411,619 bytes in 22,428 blocks
==322==   total heap usage: 65,090 allocs, 42,662 frees, 23,123,409 bytes allocated
==322==
==322== LEAK SUMMARY:
==322==    definitely lost: 216 bytes in 3 blocks
==322==    indirectly lost: 951 bytes in 32 blocks
==322==      possibly lost: 2,001,304 bytes in 16,840 blocks
==322==    still reachable: 1,409,148 bytes in 5,553 blocks
==322==                       of which reachable via heuristic:
==322==                         stdstring          : 384 bytes in 6 blocks
==322==         suppressed: 0 bytes in 0 blocks
==322== Rerun with --leak-check=full to see details of leaked memory
==322==
==322== Use --track-origins=yes to see where uninitialised values come from
==322== For lists of detected and suppressed errors, rerun with: -s
==322== ERROR SUMMARY: 18868 errors from 102 contexts (suppressed: 0 from 0)
```

### Obtention d'un strace {#obtaining-a-strace}

Certains problèmes sont causés par des facteurs externes, il peut donc être utile d'avoir un `strace`.

<div class="alert alert-warning">
<strong>Remarque</strong> : Une application qui s'exécute via <code>strace</code> est plusieurs ordres de grandeur plus lente que lorsqu'elle s'exécute nativement. Cette méthode est recommandée pour les environnements non productifs.
</div>

Installez `strace` avec votre gestionnaire de paquets. Lors de la génération d'un `strace` à envoyer au support Datadog, assurez-vous d'utiliser l'option `-f` pour suivre les processus enfants.

Pour une application CLI, exécutez :
{{< code-block lang="shell" >}}
strace -f php path/to/script.php
{{< /code-block >}}

Pour `php-fpm`, exécutez :
{{< code-block lang="shell" >}}
strace -f php-fpm -F --fpm-config <CONFIG_FILE_PATH> <MORE_OPTIONS>
{{< /code-block >}}

Pour Apache, exécutez :
{{< code-block lang="shell" >}}
(. /etc/apache2/envvars; strace -f apache2 -X)
{{< /code-block >}}

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/compatibility_requirements/php
[2]: https://app.datadoghq.com/apm/service-setup
[3]: /fr/tracing/glossary/
[4]: https://app.datadoghq.com/apm/traces
[5]: https://github.com/DataDog/dd-trace-php/releases
[6]: /fr/tracing/trace_collection/library_config/php/
[7]: /fr/tracing/guide/trace-php-cli-scripts/
[8]: https://packages.sury.org/php/
[9]: https://wiki.debian.org/HowToGetABacktrace
[10]: https://launchpad.net/~ondrej/+archive/ubuntu/php
[11]: https://wiki.ubuntu.com/Debug%20Symbol%20Packages
[12]: https://wiki.ubuntu.com/Debug%20Symbol%20Packages#Getting_-dbgsym.ddeb_packages
[13]: https://valgrind.org/docs/manual/manual-core.html#manual-core.comment
[14]: /fr/tracing/trace_collection/automatic_instrumentation/?tab=datadoglibraries#install-and-configure-the-agent
[15]: /fr/tracing/guide/resource_based_sampling/