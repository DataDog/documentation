---
aliases:
- /fr/tracing/languages/php
- /fr/agent/apm/php/
- /fr/tracing/php/
- /fr/tracing/setup/php
- /fr/tracing/setup_overview/php
- /fr/tracing/setup_overview/setup/php
- /fr/tracing/faq/php-tracer-manual-installation/
- /fr/tracing/trace_collection/dd_libraries/php/
code_lang: php
code_lang_weight: 40
further_reading:
- link: /tracing/guide/trace-php-cli-scripts/
  tag: Guide
  text: Tracer des scripts CLI PHP
- link: https://www.datadoghq.com/blog/monitor-php-performance/
  tag: Blog
  text: Surveillance PHP avec APM et le tracing distribué de Datadog
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
## Exigences de compatibilité

La version minimale requise de PHP pour la dernière version de `dd-trace-php` est PHP 7. Si vous utilisez PHP 5, vous pouvez encore utiliser le traceur PHP jusqu'à la version [0.99] (https://github.com/Datadog/dd-tracer-PHP/releases/tagger/0.99.0). PHP 5 est en fin de cycle de vie à partir de la version 1.0 de la bibliothèque PHP.

Pour obtenir la liste complète des frameworks et versions PHP pris en charge (y compris les anciennes versions et les versions de maintenance), consultez la page relative aux [exigences de compatibilité][1].

## Prise en main

Avant de commencer, vérifiez que vous avez bien [installé et configuré l'Agent][14].

### Installer l'extension

Téléchargez le programme d'installation officiel :

```shell
curl -LO https://github.com/DataDog/dd-trace-php/releases/latest/download/datadog-setup.php
```

Pour Alpine Linux, vous devez installer `libgcc_s` avant d'exécuter le programme d'installation :

```shell
apk add libgcc
```

Exécutez le programme d'installation :

```shell
# Installation complète : APM + AAP + Profiling
php datadog-setup.php --php-bin=all --enable-appsec --enable-profiling

# APM uniquement
php datadog-setup.php --php-bin=all

# APM + AAP
php datadog-setup.php --php-bin=all --enable-appsec

# APM + Profiling
php datadog-setup.php --php-bin=all --enable-profiling
```

<div class="alert alert-warning">
<strong>Remarque</strong> : Windows ne prend en charge que l'APM. N'utilisez pas les marqueurs <code>--enable-appsec</code> et <code>--enable-profiling</code> lorsque vous tracez les applications PHP sur Windows.
</div>

Cette commande installe l'extension sur l'ensemble des binaires PHP détectés sur le host ou le conteneur. Si vous ne précisez pas `--php-bin` dans la commande, le programme d'installation s'exécute en mode interactif et vous demande de sélectionner les binaires pertinents pour l'installation. La valeur de `--php-bin` peut être définie sur le chemin d'un binaire spécifique si jamais `dd-trace-php` doit être uniquement installé sur ce binaire.

Redémarrez PHP (PHP-FPM ou le SAPI Apache), puis accédez à un endpoint de votre application pour lequel le tracing est activé. Pour afficher les traces générées, consultez la page relative aux [traces d'APM][5].

Si vous ne spécifiez pas `--enable-appsec`, l'extension AppSec se charge peu de temps après le démarrage et n'est pas activée par défaut. Cela entraîne immédiatement un court-circuit, avec une surcharge des performances négligeable.

<div class="alert alert-info">
<strong>Remarque :</strong>
quelques minutes peuvent s'écouler avant que les traces soient visibles dans l'interface. Si elles n'apparaissent toujours pas une fois ce délai passé, créez une page <a href="/tracing/troubleshooting/tracer_startup_logs?tab=php#php-info"><code>phpinfo()</code></a> depuis la machine du host et faites défiler jusqu'à la section `ddtrace`. Vous y trouverez les checks de diagnostic qui ont échoué, pour vous aider à identifier les éventuels problèmes.
</div>

<div class="alert alert-danger">
<strong>Apache ZTS :</strong>
si le binaire CLI PHP créé est de type NTS (non thread-safe), puisqu'Apache utilise une version ZTS (Zend thread-safe) de PHP, vous devez modifier manuellement le chargement de l'extension pour le binaire ZTS. Exécutez <code>/chemin/vers/zts-php --ini</code> pour déterminer l'emplacement du fichier <code>.ini</code> de Datadog, puis ajoutez le suffixe <code>-zts</code> du nom du fichier. Par exemple, remplacez <code>extension=ddtrace-20210902.so</code> par <code>extension=ddtrace-20210902-zts.so</code>.
</div>

<div class="alert alert-danger">
<strong>SELinux :</strong>
Si les stratégies httpd de SELinux sont configurées sur le host, la fonctionnalité du traceur peut être limitée, à moins que l'écriture et l'exécution de fichiers temporaires ne soient explicitement autorisées dans la configuration SELinux :

`allow httpd_t httpd_tmpfs_t:file { execute execute_no_trans };`

</div>

## Instrumentation automatique

Par défaut, le tracing est automatiquement activé. Une fois l'extension installée, **ddtrace** trace votre application et envoie les traces à l'Agent.

Par défaut, Datadog prend en charge tous les frameworks Web. L'instrumentation automatique fonctionne en modifiant l'exécution de PHP pour wrapper certaines fonctions et méthodes afin de les tracer. Le traceur PHP prend en charge l'instrumentation automatique pour plusieurs bibliothèques.

L'instrumentation automatique capture :

* Le temps d'exécution de la méthode
* Les données de trace pertinentes, telles que l'URL et les codes de réponse de statut pour les requêtes Web ou les requêtes SQL pour l'accès à la base de données
* Les exceptions non traitées, y compris les stack traces le cas échéant
* Le nombre total de traces (p. ex. les requêtes Web) transmises via le système

## Configuration

Au besoin, configurez la bibliothèque de tracing pour envoyer des données de télémétrie relatives aux performances de l'application, notamment en configurant le tagging de service unifié. Consultez la section [Configuration de la bibliothèque][6] pour en savoir plus.

## Tracer des scripts CLI à exécution courte et longue

Des étapes supplémentaires sont requises pour instrumenter les scripts CLI. Consultez la section [Tracer des scripts CLI PHP][7] pour en savoir plus.

## Mise à niveau

Pour mettre à niveau le traceur PHP, [téléchargez la dernière version][5] et suivez les mêmes étapes que lors de l'[installation de l'extension](#installer-l-extension).

Une fois l'installation terminée, redémarrez PHP (PHP-FPM ou le SAPI Apache).

**Remarque** : si vous utilisez une mise en cache secondaire dans OPcache en définissant le paramètre `opcache.file_cache`, supprimez le dossier de cache.

## Suppression

Pour supprimer le tracer PHP :

1. Pour php-fpm, arrêtez le service php-fpm ou le serveur Web Apache.
2. Dissociez les fichiers `98-ddtrace.ini` and `99-ddtrace-custom.ini` de votre dossier de configuration PHP.
3. Pour php-fpm, redémarrez le service php-fpm ou le serveur Web Apache.

**Remarque** : si vous utilisez une mise en cache secondaire dans OPcache en définissant le paramètre `opcache.file_cache`, supprimez le dossier de cache.

## Dépanner un crash d'application

Si jamais le traceur PHP entraîne le crash de votre application, généralement en raison d'une erreur de segmentation, il est préférable d'obtenir un core dump ou une trace Valgrind et de contacter l'assistance Datadog.

### Installer les symboles de debugging

Pour que les core dumps soient lisibles, les symboles de debugging pour les binaires PHP doivent être installés sur le système qui exécute PHP.

Pour vérifier si les symboles de debugging sont installés pour PHP ou PHP-FPM, utilisez `gdb`.

Installez `gdb` :

```
apt|yum install -y gdb
```

Exécutez `gdb` avec le binaire souhaité. Par exemple pour PHP-FPM :

```
gdb php-fpm
```

Si la sortie de `gdb` contient une ligne similaire au texte ci-dessous, alors les symboles de debugging sont déjà installés.

```
...
Reading symbols from php-fpm...Reading symbols from /usr/lib/debug/chemin/vers/un/fichier.debug...done.
...
```

Si la sortie de `gdb` contient une ligne similaire au texte ci-dessous, alors les symboles de debugging doivent être installés :

```
...
Reading symbols from php-fpm...(no debugging symbols found)...done.
...
```


#### Centos

Installez le package `yum-utils` qui fournit le programme `debuginfo-install` :

```
yum install -y yum-utils
```

Trouvez le nom du package pour vos binaires PHP. Celui-ci peut varier en fonction de la méthode d'installation de PHP :

```
yum list installed | grep php
```

Installez les symboles de debugging. Par exemple, pour le package `php-fpm` :

```
debuginfo-install -y php-fpm
```

**Remarque** : si le référentiel qui fournit les binaires PHP n'est pas activé par défaut, il peut être activé lors de l'exécution de la commande `debuginfo-install`. Par exemple :

```
debuginfo-install --enablerepo=remi-php74 -y php-fpm
```

#### Debian

##### PHP installé depuis la DPA Sury Debian

Si PHP a été installé depuis la [DPA Sury Debian][8], les symboles de debugging sont déjà disponibles à partir de la DPA. Par exemple, pour PHP-FPM 7.2 :

```
apt update
apt install -y php7.2-fpm-dbgsym
```

##### PHP installé depuis un autre package

Le projet Debian tient à jour une page wiki avec [des instructions pour installer les symboles de debugging][9].

Modifiez le fichier `/etc/apt/sources.list` :

```
# ... laisser tous les packages existants ici

# ajouter un `deb` deb http://deb.debian.org/debian-debug/ $RELEASE-debug main
# Par exemple, pour buster
deb http://deb.debian.org/debian-debug/ buster-debug main
```

Mettez à jour `apt` :

```
apt update
```

Essayez d'abord d'utiliser les noms canoniques des packages pour les symboles de debugging. Par exemple, si le nom du package est `php7.2-fpm`, essayez :

```
apt install -y php7.2-fpm-dbgsym

# Si la ligne ci-dessus ne fonctionne pas

apt install -y php7.2-fpm-dbg
```

Si les symboles de debugging sont introuvables, utilisez l'utilitaire `find-dbgsym-packages`. Installez le binaire :

```
apt install -y debian-goodies
```

Tentez de trouver les symboles de debugging à l'aide du chemin complet vers le binaire ou de l'ID d'un processus en cours d'exécution :

```
find-dbgsym-packages /usr/sbin/php-fpm7.2
```

Installez le package à l'aide du nom renvoyé, si vous l'avez trouvé :

```
apt install -y php7.2-fpm-{nom-du-package-renvoyé-par-les-packages-dbgsym}
```

#### Ubuntu

##### PHP installé depuis `ppa:ondrej/php`

Si PHP a été installé depuis [`ppa:ondrej/php`][10], modifiez le fichier source apt `/etc/apt/sources.list.d/ondrej-*.list` en ajoutant le composant `main/debug`.

Avant :

```deb http://ppa.launchpad.net/ondrej/php/ubuntu <version> main```

Après :

```deb http://ppa.launchpad.net/ondrej/php/ubuntu <version> main main/debug```

Mettez à jour et installez les symboles de debugging. Par exemple, pour PHP-FPM 7.2 :

```
apt update
apt install -y php7.2-fpm-dbgsym
```
##### PHP installé depuis un autre package

Trouvez le nom du package pour vos binaires PHP. Celui-ci peut varier en fonction de la méthode d'installation de PHP :

```
apt list --installed | grep php
```

**Remarque** : dans certains cas, `php-fpm` peut être un méta-package qui renvoie vers le vrai package, par exemple `php7.2-fpm` pour PHP-FPM 7.2. Dans ce cas, le nom est celui du vrai package.

Essayez d'abord d'utiliser les noms canoniques des packages pour les symboles de debugging. Par exemple, si le nom du package est `php7.2-fpm`, essayez :

```
apt install -y php7.2-fpm-dbgsym

# Si la ligne ci-dessus ne fonctionne pas

apt install -y php7.2-fpm-dbg
```

Si les packages `-dbg` et `-dbgsym` sont introuvables, activez les référentiels `ddebs`. Pour obtenir des instructions détaillées concernant l'[installation des symboles de debugging][11] depuis les `ddebs`, consultez la documentation Ubuntu.

Par exemple, pour Ubuntu 18.04+, activez le référentiel `ddebs` :

```
echo "deb http://ddebs.ubuntu.com $(lsb_release -cs) main restricted universe multiverse" | tee -a /etc/apt/sources.list.d/ddebs.list

echo "deb http://ddebs.ubuntu.com $(lsb_release -cs)-updates main restricted universe multiverse" | tee -a /etc/apt/sources.list.d/ddebs.list
```

Importez la clé de signature (assurez-vous qu'[elle est correcte][12]) :

```
apt install ubuntu-dbgsym-keyring
apt-key adv --keyserver keyserver.ubuntu.com --recv-keys <CLÉ DE SIGNATURE ISSUE DE LA DOCUMENTATION UBUNTU>
apt update
```

Essayez d'ajouter les noms canoniques des packages pour les symboles de debugging. Par exemple, si le nom du package est `php7.2-fpm`, essayez :

```
apt install -y php7.2-fpm-dbgsym

# Si la ligne ci-dessus ne fonctionne pas

apt install -y php7.2-fpm-dbg
```

Si les symboles de debugging sont introuvables, utilisez l'utilitaire `find-dbgsym-packages`. Installez le binaire :

```
apt install -y debian-goodies
```

Tentez de trouver les symboles de debugging à l'aide du chemin complet vers le binaire ou de l'ID d'un processus en cours d'exécution :

```
find-dbgsym-packages /usr/sbin/php-fpm7.2
```

Installez le package à l'aide du nom renvoyé, si vous l'avez trouvé :

```
apt install -y php7.2-fpm-{nom-du-package-renvoyé-par-les-packages-dbgsym}
```

### Obtenir un core dump

Il peut s'avérer difficile d'obtenir un core dump pour les applications PHP, notamment pour PHP-FPM. Voici quelques conseils pour vous aider :

1. Passez en revue le log d'erreur de l'application pour déterminer si PHP-FPM a généré un core dump :
   - Recherchez l'expression `(SIGSEGV - core dumped)`, afin de trouver un message confirmant l'enregistrement d'un core dump. Exemple : `WARNING: [pool www] child <pid> exited on signal 11 (SIGSEGV - core dumped) after <duration> seconds from start`.
   - Recherchez l'expression `(SIGSEGV)`, afin de trouver un message confirmant le non-enregistrement d'un core dump. Exemple : `WARNING: [pool www] child <pid> exited on signal 11 (SIGSEGV) after <duration> seconds from start`.
1. Accédez au core dump en exécutant `cat /proc/sys/kernel/core_pattern`. La valeur par défaut étant généralement `core`, un fichier `core` est donc généré dans le dossier racine Web.

Si aucun core dump n'a été généré, vérifiez les configurations suivantes et modifiez-les en fonction de vos besoins :

1. Si `/proc/sys/kernel/core_pattern` contient un chemin comprenant des répertoires imbriqués, assurez-vous que le chemin d'accès avec les répertoires complets existe.
1. Si l'utilisateur qui exécute les workers du pool PHP-FPM n'est pas `root` (`www-data` est généralement utilisé), attribuez à cet utilisateur des autorisations d'écriture dans le répertoire des core dumps.
1. Assurez-vous que la valeur de `/proc/sys/fs/suid_dumpable` n'est pas `0`. Définissez-la sur `1` ou `2`, sauf si vous exécutez le pool de workers PHP-FPM en tant que `root`. Vérifiez vos options avec votre administrateur système.
1. Assurez-vous que la valeur de `rlimit_core` est adéquate dans la configuration du pool PHP-FPM. Vous pouvez retirer cette limite, avec `rlimit_core = unlimited`.
1. Assurez-vous que la valeur de `ulimit` est adéquate dans votre système. Vous pouvez retirer cette limite, avec `ulimit -c unlimited`.
1. Si votre application s'exécute dans un conteneur Docker et que vous souhaitez modifier `/proc/sys/*`, vous devez effectuer les changements sur la machine du host. Contactez votre administrateur système pour découvrir les différentes options qui s'offrent à vous. Si vous le pouvez, essayez de reproduire le problème dans vos environnements staging ou test.

### Obtention d'un core dump à partir d'un site conteneur Docker

Utilisez les informations ci-dessous pour savoir comment obtenir un core dump dans un conteneur Docker :

1. Le site conteneur Docker doit être exécuté en tant que conteneur privilégié, et la valeur `ulimit` pour les fichiers du core doit être fixée à son maximum, comme indiqué dans les exemples ci-dessous.
   - Si vous utilisez la commande `docker run`, ajoutez les arguments `--privileged` et `--ulimit core=99999999999` 
   - Si vous utilisez `docker compose`, ajoutez ce qui suit au fichier `docker-compose.yml` :
```yaml
privileged: true
ulimits:
  core: 99999999999
```
2. Lorsque vous exécutez le conteneur (et avant de lancer l'application PHP ), vous devez exécuter les commandes suivantes :
```
ulimit -c unlimited
echo '/tmp/core' > /proc/sys/kernel/core_pattern
echo 1 > /proc/sys/fs/suid_dumpable
```

### Obtenir une trace Valgrind 

Pour obtenir des informations plus détaillées sur le crash, exécutez l'application avec Valgrind. Contrairement aux core dumps, cette méthode fonctionne toujours dans un conteneur sans privilège.

<div class="alert alert-warning">
<strong>Remarque</strong> : une application exécutée à travers Valgrind est considérablement plus lente que lorsqu'elle est exécutée nativement. Cette méthode est uniquement recommandée en dehors d'un environnement de production.
</div>

Installez Valgrind avec votre gestionnaire de package. Exécutez l'application avec Valgrind le temps de générer quelques requêtes.

Pour une application CLI, exécutez :
{{< code-block lang=shell >}}
USE_ZEND_ALLOC=0 valgrind -- php chemin/vers/script.php
{{< /code-block >}}
Si vous utilisez `php-fpm`, exécutez :
{{< code-block lang="shell" >}}
USE_ZEND_ALLOC=0 valgrind --trace-children=yes -- php-fpm -F --fpm-config <CHEMIN_VERS_FICHIER_CONFIG> <AUTRES_OPTIONS>
{{< /code-block >}}
Si vous utilisez Apache, exécutez :
{{< code-block lang="shell" >}}
(. /etc/apache2/envvars; USE_ZEND_ALLOC=0 valgrind --trace-children=yes -- apache2 -X)`
{{< /code-block >}}

Par défaut, la trace Valgrind obtenue est générée vers stderr ; suivez la [documentation officielle][13] (en anglais) pour la générer vers une autre cible. La sortie devrait ressembler à l'exemple ci-dessous pour un processus PHP-FPM :

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

### Obtenir une strace

Certains problèmes étant causés par des facteurs externes, il peut être utile d'obtenir une `strace`.

<div class="alert alert-warning">
<strong>Remarque</strong> : une application exécutée à travers <code>strace</code> est considérablement plus lente que lorsqu'elle est exécutée nativement. Cette méthode est uniquement recommandée en dehors d'un environnement de production.
</div>

Installez `strace` avec votre gestionnaire de package. Lorsque vous générez une `strace` afin de l'envoyer à l'assistance Datadog, assurez-vous d'utiliser l'option `-f` pour suivre les processus enfant.

Pour une application CLI, exécutez :
{{< code-block lang="shell" >}}
strace -f php chemin/vers/script.php
{{< /code-block >}}

Pour `php-fpm`, exécutez :
{{< code-block lang="shell" >}}
strace -f php-fpm -F --fpm-config <CHEMIN_VERS_FICHIER_CONFIG> <AUTRES_OPTIONS>
{{< /code-block >}}

Pour Apache, exécutez :
{{< code-block lang="shell" >}}
(. /etc/apache2/envvars; strace -f apache2 -X)
{{< /code-block >}}

## Pour aller plus loin

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