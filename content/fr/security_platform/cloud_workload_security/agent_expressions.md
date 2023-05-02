---
description: Attributs et opérateurs des expressions d'Agent pour les règles Cloud Workload Security
disable_edit: true
further_reading:
- link: /security_platform/cloud_workload_security/getting_started/
  tag: Documentation
  text: Débuter avec Cloud Workload Security de Datadog
kind: documentation
title: Créer des règles d'Agent personnalisées
---
<!-- CE FICHIER EST GÉNÉRÉ AUTOMATIQUEMENT. VEUILLEZ LE MODIFIER DANS LE DOSSIER SCRIPTS/MODÈLES -->

## Syntaxe de l'expression d'Agent
Cloud Workload Security (CWS) commence par évaluer l'activité au sein de l'Agent Datadog en fonction des expressions d'Agent afin d'identifier l'activité à recueillir. Cette partie d'une règle CWS correspond à l'expression d'Agent. Les expressions d'Agent utilisent le langage de sécurité de Datadog (SECL). Vous trouverez ci-dessous le format standard d'une expression SECL :


{{< code-block lang="javascript" >}}
<type-événement>.<attribut-événement> <opérateur> <valeur> <attribut-événement> ...

{{< /code-block >}}

Voici à quoi ressemble une règle avec ce format :

{{< code-block lang="javascript" >}}
open.file.path == "/etc/shadow" && file.path not in ["/usr/sbin/vipw"]

{{< /code-block >}}

## Déclencheurs
Les déclencheurs sont des événements qui correspondent à des types d'activité détectés par le système. Les déclencheurs actuellement pris en charge sont les suivants :

| Événement SECL | Type | Définition | Version de l'Agent |
| ---------- | ---- | ---------- | ------------- |
| `bind` | Réseau | [Expérimental] Un bind a été exécuté | 7.37 |
| `bpf` | Kernel | Une commande BPF a été exécutée | 7.33 |
| `capset` | Processus | Un processus a modifié son ensemble de capacités | 7.27 |
| `chmod` | Fichier | Les autorisations d'un fichier ont été modifiées | 7.27 |
| `chown` | Fichier | Le fichier a changé de propriétaire | 7.27 |
| `dns` | Réseau | Une requête DNS a été envoyée | 7.36 |
| `exec` | Processus | Un processus a été exécuté ou forké | 7.27 |
| `exit` | Processus | Un processus a été interrompu | 7.38 |
| `link` | Fichier | Un nom/alias a été créé pour un fichier | 7.27 |
| `load_module` | Kernel | Un nouveau module kernel a été chargé | 7.35 |
| `mkdir` | Fichier | Un répertoire a été créé | 7.27 |
| `mmap` | Kernel | Une commande mmap a été exécutée | 7.35 |
| `mprotect` | Kernel | Une commande mprotect a été exécutée | 7.35 |
| `open` | Fichier | Un fichier a été ouvert | 7.27 |
| `ptrace` | Kernel | Une commande ptrace a été exécutée | 7.35 |
| `removexattr` | Fichier | Des attributs étendus ont été supprimés | 7.27 |
| `rename` | Fichier | Un fichier/répertoire a été renommé | 7.27 |
| `rmdir` | Fichier | Un répertoire a été supprimé | 7.27 |
| `selinux` | Kernel | Une opération SELinux a été exécutée | 7.30 |
| `setgid` | Processus | Un processus a modifié son GID effectif | 7.27 |
| `setuid` | Processus | Un processus a modifié son UID effectif | 7.27 |
| `setxattr` | Fichier | Des attributs étendus ont été définis | 7.27 |
| `signal` | Processus | Un signal a été envoyé | 7.35 |
| `splice` | Fichier | Une commande splice a été exécutée | 7.36 |
| `unlink` | Fichier | Un fichier a été supprimé | 7.27 |
| `unload_module` | Kernel | Un module kernel a été supprimé | 7.35 |
| `utimes` | Fichier | Les dates d'accès ou de modification d'un fichier ont été modifiées | 7.27 |

## Opérateurs
Les opérateurs SECL servent à combiner des attributs d'événement pour créer une expression complète. Les opérateurs disponibles sont les suivants :

| Opérateur SECL         | Types            |  Définition                              | Version de l'Agent |
|-----------------------|------------------|------------------------------------------|---------------|
| `==`                  | Processus          | Égal                                    | 7.27          |
| `!=`                  | Fichier             | Pas égal                                | 7.27          |
| `>`                   | Fichier             | Supérieur                                  | 7.27          |
| `>=`                  | Fichier             | Supérieur ou égal                         | 7.27          |
| `<`                   | Fichier             | Inférieur                                   | 7.27          |
| `<=`                  | Fichier             | Inférieur ou égal                          | 7.27          |
| `!`                   | Fichier             | Non                                      | 7.27          |
| `^`                   | Fichier             | Opérateur binaire NON                               | 7.27          |
| `in [elem1, ...]`     | Fichier             | La liste contient l'élément             | 7.27          |
| `not in [elem1, ...]` | Fichier             | La liste ne contient pas l'élément         | 7.27          |
| `=~`                  | Fichier             | Correspondance de chaîne                          | 7.27          |
| `!~`                  | Fichier             | Pas de correspondance de chaîne                      | 7.27          |
| `&`                   | Fichier             | Opérateur binaire ET                               | 7.27          |
| `\|`                  | Fichier             | Opérateur binaire OU                                | 7.27          |
| `&&`                  | Fichier             | Opérateur logique ET                              | 7.27          |
| `\|\|`                | Fichier             | Opérateur logique OU                               | 7.27          |
| `in CIDR`             | Réseau          | L'élément est compris dans la plage d'IP               | 7.37          |
| `not in CIDR`         | Réseau          | L'élément n'est pas compris dans la plage d'IP           | 7.37          |
| `allin CIDR`          | Réseau          | Tous les éléments sont compris dans la plage d'IP     | 7.37          |
| `in [CIDR1, ...]`     | Réseau          | L'élément est compris dans les plages d'IP              | 7.37          |
| `not in [CIDR1, ...]` | Réseau          | L'élément n'est pas compris dans les plages d'IP          | 7.37          |
| `allin [CIDR1, ...]`  | Réseau          | Tous les éléments sont compris dans les plages d'IP    | 7.37          |

## Patterns et expressions régulières
Des patterns ou des expressions régulières peuvent être utilisés dans les expressions SECL, avec les opérateurs `not in`, `=~` et `!~`.

| Format           |  Exemple             | Champs pris en charge   | Version de l'Agent |
|------------------|----------------------|--------------------|---------------|
| `~"pattern"`     | `~"httpd.*"`         | Tous                | 7.27          |
| `r"regexp"`      | `r"rc[0-9]+"`        | Tous sauf `.path` | 7.27          |

Les patterns sur les champs `.path` seront traités comme des expressions globales. Le wildcard `*` permet de récupérer les fichiers et dossiers au même niveau. Le wildcard `**`, disponible à partir de la version 7.34, peut être ajouté à la fin d'un chemin afin de récupérer tous les fichiers et sous-dossiers.

## Durée
Vous pouvez utiliser les expressions SECL pour écrire des règles basées sur des durées. Une telle règle se déclenchera si un événement survient pendant un intervalle donné, par exemple si la durée d'accès à un fichier secret est supérieure à une durée définie au terme de la création d'un processus.
Une règle de ce type peut être écrite comme suit :


{{< code-block lang="javascript" >}}
open.file.path == "/etc/secret" && process.file.name == "java" && process.created_at > 5s

{{< /code-block >}}

Les durées correspondent à des nombres suivis d'un suffixe d'unité. Les suffixes pris en charge sont les suivants : `s`, `m` et `h`.

## Variables
Les variables SECL sont prédéfinies et peuvent être utilisées en tant que valeurs ou en tant que partie de valeurs.

À titre d'exemple, voici à quoi ressemble une règle avec la variable `process.pid` :


{{< code-block lang="javascript" >}}
open.file.path == "/proc/${process.pid}/maps"

{{< /code-block >}}

Liste des variables disponibles :

| Variable SECL         |  Définition                           | Version de l'Agent |
|-----------------------|---------------------------------------|---------------|
| `process.pid`         | PID du processus                           | 7.33          |

## CIDR et plage d'IP
SECL permet de rechercher des CIDR et des IP. Il est possible d'utiliser des opérateurs (`in`, `not in` ou `allin`, par exemple) combinés à des syntaxes de CIDR ou d'IP.

Ces types de règles peuvent être écrites comme suit :


{{< code-block lang="javascript" >}}
dns.question.name == "example.com" && network.destination.ip in ["192.168.1.25", "10.0.0.0/24"]

{{< /code-block >}}

## Auxiliaires
SECL inclut des auxiliaires qui permettent aux utilisateurs d'écrire des règles avancées sans avoir à utiliser des techniques génériques, telles que des expressions régulières.

### Arguments de ligne de commande
*args_flags* et *args_options* sont des auxiliaires qui facilitent l'écriture de règles CWS en fonction d'arguments de ligne de commande.

*args_flags* sert à identifier les arguments qui commencent par un ou deux traits d'union, mais n'accepte aucune valeur associée.

Exemples :
* `version` fait partie de l'auxiliaire *args_flags* pour la commande `cat --version`
* `l` et `n` both font partie de l'auxiliaire *args_flags* pour la commande `netstat -ln`


*args_options* sert à identifier les arguments qui commencent par un ou deux traits d'union, et accepte une valeur spécifiée comme étant le même argument, mais séparée par le caractère ‘=’ ou spécifiée comme étant l'argument suivant.

Exemples :
* `T=8` et `width=8` font partie de l'auxiliaire *args_options* pour la commande `ls -T 8 --width=8`
* `exec.args_options ~= [ “s=.*\’” ]` peut servir à détecter le lancement de `sudoedit` avec l'argument `-s` et une commande se terminant par un `\`

### Droits sur les fichiers

L'attribut *file.rights* peut désormais être utilisé en complément de *file.mode*. Ce dernier peut contenir les valeurs définies par le kernel. L'attribut *file.rights*, lui, contient uniquement les valeurs définies par l'utilisateur. Il se peut que ces droits soient plus répandus, car ils se trouvent dans les commandes `chmod`.

## Types d'événements

### Commun à tous les types d'événements

| Propriété | Type | Définition | Constantes |
| -------- | ---- | ---------- | --------- |
| `async` | booléen | True si l'appel système était asynchrone |  |
| `container.id` | chaîne | ID du conteneur |  |
| `container.tags` | chaîne | Tags du conteneur |  |
| `network.destination.ip` | IP/CIDR | Adresse IP |  |
| `network.destination.port` | nombre entier | Numéro de port |  |
| `network.device.ifindex` | nombre entier | ifindex d'interface |  |
| `network.device.ifname` | chaîne | ifname d'interface |  |
| `network.l3_protocol` | nombre entier | Protocole L3 du paquet réseau | Protocoles L3 |
| `network.l4_protocol` | nombre entier | Protocole L4 du paquet réseau | Protocoles L4 |
| `network.size` | nombre entier | Taille du paquet réseau en octets |  |
| `network.source.ip` | IP/CIDR | Adresse IP |  |
| `network.source.port` | nombre entier | Numéro de port |  |
| `process.ancestors.args` | chaîne | Arguments du processus (sous forme de chaîne) |  |
| `process.ancestors.args_flags` | chaîne | Arguments du processus (sous forme de tableau) |  |
| `process.ancestors.args_options` | chaîne | Arguments du processus (sous forme de tableau) |  |
| `process.ancestors.args_truncated` | booléen | Indicateur d'arguments tronqués |  |
| `process.ancestors.argv` | chaîne | Arguments du processus (sous forme de tableau) |  |
| `process.ancestors.argv0` | chaîne | Premier argument du processus |  |
| `process.ancestors.cap_effective` | nombre entier | Ensemble de capacités effectives du processus | Constantes des capacités de kernel |
| `process.ancestors.cap_permitted` | nombre entier | Ensemble de capacités autorisées du processus | Constantes des capacités de kernel |
| `process.ancestors.comm` | chaîne | Attribut comm du processus |  |
| `process.ancestors.container.id` | chaîne | ID du conteneur |  |
| `process.ancestors.cookie` | nombre entier | Cookie du processus |  |
| `process.ancestors.created_at` | nombre entier | Timestamp de création du processus |  |
| `process.ancestors.egid` | nombre entier | GID effectif du processus |  |
| `process.ancestors.egroup` | chaîne | Groupe effectif du processus |  |
| `process.ancestors.envp` | chaîne | Variables d'environnement du processus |  |
| `process.ancestors.envs` | chaîne | Noms des variables d'environnement du processus |  |
| `process.ancestors.envs_truncated` | booléen | Indicateur de variables d'environnement tronquées |  |
| `process.ancestors.euid` | nombre entier | UID effectif du processus |  |
| `process.ancestors.euser` | chaîne | Utilisateur effectif du processus |  |
| `process.ancestors.file.change_time` | nombre entier | Date de modification du fichier |  |
| `process.ancestors.file.filesystem` | chaîne | Système de fichiers du fichier |  |
| `process.ancestors.file.gid` | nombre entier | GID du propriétaire du fichier |  |
| `process.ancestors.file.group` | chaîne | Groupe du propriétaire du fichier |  |
| `process.ancestors.file.in_upper_layer` | booléen | Indicateur de la couche de fichier, par exemple dans un OverlayFS |  |
| `process.ancestors.file.inode` | nombre entier | Inode du fichier |  |
| `process.ancestors.file.mode` | nombre entier | Mode/droits du fichier | Constantes du mode Chmod |
| `process.ancestors.file.modification_time` | nombre entier | Date de modification du fichier |  |
| `process.ancestors.file.mount_id` | nombre entier | ID de montage du fichier |  |
| `process.ancestors.file.name` | chaîne | Basename du fichier |  |
| `process.ancestors.file.name.length` | nombre entier | Longueur de la chaîne 'process.ancestors.file.name' |  |
| `process.ancestors.file.path` | chaîne | Chemin d'accès du fichier |  |
| `process.ancestors.file.path.length` | nombre entier | Longueur de la chaîne 'process.ancestors.file.path' |  |
| `process.ancestors.file.rights` | nombre entier | Mode/droits du fichier | Constantes du mode Chmod |
| `process.ancestors.file.uid` | nombre entier | UID du propriétaire du fichier |  |
| `process.ancestors.file.user` | chaîne | Utilisateur du propriétaire du fichier |  |
| `process.ancestors.fsgid` | nombre entier | GID du système de fichiers du processus |  |
| `process.ancestors.fsgroup` | chaîne | Groupe du système de fichiers du processus |  |
| `process.ancestors.fsuid` | nombre entier | UID du système de fichiers du processus |  |
| `process.ancestors.fsuser` | chaîne | Utilisateur du système de fichiers du processus |  |
| `process.ancestors.gid` | nombre entier | GID du processus |  |
| `process.ancestors.group` | chaîne | Groupe du processus |  |
| `process.ancestors.interpreter.file.change_time` | nombre entier | Date de modification du fichier |  |
| `process.ancestors.interpreter.file.filesystem` | chaîne | Système de fichiers du fichier |  |
| `process.ancestors.interpreter.file.gid` | nombre entier | GID du propriétaire du fichier |  |
| `process.ancestors.interpreter.file.group` | chaîne | Groupe du propriétaire du fichier |  |
| `process.ancestors.interpreter.file.in_upper_layer` | booléen | Indicateur de la couche de fichier, par exemple dans un OverlayFS |  |
| `process.ancestors.interpreter.file.inode` | nombre entier | Inode du fichier |  |
| `process.ancestors.interpreter.file.mode` | nombre entier | Mode/droits du fichier | Constantes du mode Chmod |
| `process.ancestors.interpreter.file.modification_time` | nombre entier | Date de modification du fichier |  |
| `process.ancestors.interpreter.file.mount_id` | nombre entier | ID de montage du fichier |  |
| `process.ancestors.interpreter.file.name` | chaîne | Basename du fichier |  |
| `process.ancestors.interpreter.file.name.length` | nombre entier | Longueur de la chaîne 'process.ancestors.interpreter.file.name' |  |
| `process.ancestors.interpreter.file.path` | chaîne | Chemin d'accès du fichier |  |
| `process.ancestors.interpreter.file.path.length` | nombre entier | Longueur de la chaîne 'process.ancestors.interpreter.file.path' |  |
| `process.ancestors.interpreter.file.rights` | nombre entier | Mode/droits du fichier | Constantes du mode Chmod |
| `process.ancestors.interpreter.file.uid` | nombre entier | UID du propriétaire du fichier |  |
| `process.ancestors.interpreter.file.user` | chaîne | Utilisateur du propriétaire du fichier |  |
| `process.ancestors.is_kworker` | booléen | Indique si le processus est un kworker |  |
| `process.ancestors.is_thread` | booléen | Indique si le processus est considéré comme un thread (autrement dit, un processus enfant n'ayant pas exécuté un autre programme) |  |
| `process.ancestors.pid` | nombre entier | Identifiant du processus (également appelé « identifiant du groupe de threads ») |  |
| `process.ancestors.ppid` | nombre entier | ID du processus parent |  |
| `process.ancestors.tid` | nombre entier | ID du thread |  |
| `process.ancestors.tty_name` | chaîne | Nom du TTY associé au processus |  |
| `process.ancestors.uid` | nombre entier | UID du processus |  |
| `process.ancestors.user` | chaîne | Utilisateur du processus |  |
| `process.args` | chaîne | Arguments du processus (sous forme de chaîne) |  |
| `process.args_flags` | chaîne | Arguments du processus (sous forme de tableau) |  |
| `process.args_options` | chaîne | Arguments du processus (sous forme de tableau) |  |
| `process.args_truncated` | booléen | Indicateur d'arguments tronqués |  |
| `process.argv` | chaîne | Arguments du processus (sous forme de tableau) |  |
| `process.argv0` | chaîne | Premier argument du processus |  |
| `process.cap_effective` | nombre entier | Ensemble de capacités effectives du processus | Constantes des capacités de kernel |
| `process.cap_permitted` | nombre entier | Ensemble de capacités autorisées du processus | Constantes des capacités de kernel |
| `process.comm` | chaîne | Attribut comm du processus |  |
| `process.container.id` | chaîne | ID du conteneur |  |
| `process.cookie` | nombre entier | Cookie du processus |  |
| `process.created_at` | nombre entier | Timestamp de création du processus |  |
| `process.egid` | nombre entier | GID effectif du processus |  |
| `process.egroup` | chaîne | Groupe effectif du processus |  |
| `process.envp` | chaîne | Variables d'environnement du processus |  |
| `process.envs` | chaîne | Noms des variables d'environnement du processus |  |
| `process.envs_truncated` | booléen | Indicateur de variables d'environnement tronquées |  |
| `process.euid` | nombre entier | UID effectif du processus |  |
| `process.euser` | chaîne | Utilisateur effectif du processus |  |
| `process.file.change_time` | nombre entier | Date de modification du fichier |  |
| `process.file.filesystem` | chaîne | Système de fichiers du fichier |  |
| `process.file.gid` | nombre entier | GID du propriétaire du fichier |  |
| `process.file.group` | chaîne | Groupe du propriétaire du fichier |  |
| `process.file.in_upper_layer` | booléen | Indicateur de la couche de fichier, par exemple dans un OverlayFS |  |
| `process.file.inode` | nombre entier | Inode du fichier |  |
| `process.file.mode` | nombre entier | Mode/droits du fichier | Constantes du mode Chmod |
| `process.file.modification_time` | nombre entier | Date de modification du fichier |  |
| `process.file.mount_id` | nombre entier | ID de montage du fichier |  |
| `process.file.name` | chaîne | Basename du fichier |  |
| `process.file.name.length` | nombre entier | Longueur de la chaîne 'process.file.name' |  |
| `process.file.path` | chaîne | Chemin d'accès du fichier |  |
| `process.file.path.length` | nombre entier | Longueur de la chaîne 'process.file.path' |  |
| `process.file.rights` | nombre entier | Mode/droits du fichier | Constantes du mode Chmod |
| `process.file.uid` | nombre entier | UID du propriétaire du fichier |  |
| `process.file.user` | chaîne | Utilisateur du propriétaire du fichier |  |
| `process.fsgid` | nombre entier | GID du système de fichiers du processus |  |
| `process.fsgroup` | chaîne | Groupe du système de fichiers du processus |  |
| `process.fsuid` | nombre entier | UID du système de fichiers du processus |  |
| `process.fsuser` | chaîne | Utilisateur du système de fichiers du processus |  |
| `process.gid` | nombre entier | GID du processus |  |
| `process.group` | chaîne | Groupe du processus |  |
| `process.interpreter.file.change_time` | nombre entier | Date de modification du fichier |  |
| `process.interpreter.file.filesystem` | chaîne | Système de fichiers du fichier |  |
| `process.interpreter.file.gid` | nombre entier | GID du propriétaire du fichier |  |
| `process.interpreter.file.group` | chaîne | Groupe du propriétaire du fichier |  |
| `process.interpreter.file.in_upper_layer` | booléen | Indicateur de la couche de fichier, par exemple dans un OverlayFS |  |
| `process.interpreter.file.inode` | nombre entier | Inode du fichier |  |
| `process.interpreter.file.mode` | nombre entier | Mode/droits du fichier | Constantes du mode Chmod |
| `process.interpreter.file.modification_time` | nombre entier | Date de modification du fichier |  |
| `process.interpreter.file.mount_id` | nombre entier | ID de montage du fichier |  |
| `process.interpreter.file.name` | chaîne | Basename du fichier |  |
| `process.interpreter.file.name.length` | nombre entier | Longueur de la chaîne 'process.interpreter.file.name' |  |
| `process.interpreter.file.path` | chaîne | Chemin d'accès du fichier |  |
| `process.interpreter.file.path.length` | nombre entier | Longueur de la chaîne 'process.interpreter.file.path' |  |
| `process.interpreter.file.rights` | nombre entier | Mode/droits du fichier | Constantes du mode Chmod |
| `process.interpreter.file.uid` | nombre entier | UID du propriétaire du fichier |  |
| `process.interpreter.file.user` | chaîne | Utilisateur du propriétaire du fichier |  |
| `process.is_kworker` | booléen | Indique si le processus est un kworker |  |
| `process.is_thread` | booléen | Indique si le processus est considéré comme un thread (autrement dit, un processus enfant n'ayant pas exécuté un autre programme) |  |
| `process.parent.args` | chaîne | Arguments du processus (sous forme de chaîne) |  |
| `process.parent.args_flags` | chaîne | Arguments du processus (sous forme de tableau) |  |
| `process.parent.args_options` | chaîne | Arguments du processus (sous forme de tableau) |  |
| `process.parent.args_truncated` | booléen | Indicateur d'arguments tronqués |  |
| `process.parent.argv` | chaîne | Arguments du processus (sous forme de tableau) |  |
| `process.parent.argv0` | chaîne | Premier argument du processus |  |
| `process.parent.cap_effective` | nombre entier | Ensemble de capacités effectives du processus | Constantes des capacités de kernel |
| `process.parent.cap_permitted` | nombre entier | Ensemble de capacités autorisées du processus | Constantes des capacités de kernel |
| `process.parent.comm` | chaîne | Attribut comm du processus |  |
| `process.parent.container.id` | chaîne | ID du conteneur |  |
| `process.parent.cookie` | nombre entier | Cookie du processus |  |
| `process.parent.created_at` | nombre entier | Timestamp de création du processus |  |
| `process.parent.egid` | nombre entier | GID effectif du processus |  |
| `process.parent.egroup` | chaîne | Groupe effectif du processus |  |
| `process.parent.envp` | chaîne | Variables d'environnement du processus |  |
| `process.parent.envs` | chaîne | Noms des variables d'environnement du processus |  |
| `process.parent.envs_truncated` | booléen | Indicateur de variables d'environnement tronquées |  |
| `process.parent.euid` | nombre entier | UID effectif du processus |  |
| `process.parent.euser` | chaîne | Utilisateur effectif du processus |  |
| `process.parent.file.change_time` | nombre entier | Date de modification du fichier |  |
| `process.parent.file.filesystem` | chaîne | Système de fichiers du fichier |  |
| `process.parent.file.gid` | nombre entier | GID du propriétaire du fichier |  |
| `process.parent.file.group` | chaîne | Groupe du propriétaire du fichier |  |
| `process.parent.file.in_upper_layer` | booléen | Indicateur de la couche de fichier, par exemple dans un OverlayFS |  |
| `process.parent.file.inode` | nombre entier | Inode du fichier |  |
| `process.parent.file.mode` | nombre entier | Mode/droits du fichier | Constantes du mode Chmod |
| `process.parent.file.modification_time` | nombre entier | Date de modification du fichier |  |
| `process.parent.file.mount_id` | nombre entier | ID de montage du fichier |  |
| `process.parent.file.name` | chaîne | Basename du fichier |  |
| `process.parent.file.name.length` | nombre entier | Longueur de la chaîne 'process.parent.file.name' |  |
| `process.parent.file.path` | chaîne | Chemin d'accès du fichier |  |
| `process.parent.file.path.length` | nombre entier | Longueur de la chaîne 'process.parent.file.path' |  |
| `process.parent.file.rights` | nombre entier | Mode/droits du fichier | Constantes du mode Chmod |
| `process.parent.file.uid` | nombre entier | UID du propriétaire du fichier |  |
| `process.parent.file.user` | chaîne | Utilisateur du propriétaire du fichier |  |
| `process.parent.fsgid` | nombre entier | GID du système de fichiers du processus |  |
| `process.parent.fsgroup` | chaîne | Groupe du système de fichiers du processus |  |
| `process.parent.fsuid` | nombre entier | UID du système de fichiers du processus |  |
| `process.parent.fsuser` | chaîne | Utilisateur du système de fichiers du processus |  |
| `process.parent.gid` | nombre entier | GID du processus |  |
| `process.parent.group` | chaîne | Groupe du processus |  |
| `process.parent.interpreter.file.change_time` | nombre entier | Date de modification du fichier |  |
| `process.parent.interpreter.file.filesystem` | chaîne | Système de fichiers du fichier |  |
| `process.parent.interpreter.file.gid` | nombre entier | GID du propriétaire du fichier |  |
| `process.parent.interpreter.file.group` | chaîne | Groupe du propriétaire du fichier |  |
| `process.parent.interpreter.file.in_upper_layer` | booléen | Indicateur de la couche de fichier, par exemple dans un OverlayFS |  |
| `process.parent.interpreter.file.inode` | nombre entier | Inode du fichier |  |
| `process.parent.interpreter.file.mode` | nombre entier | Mode/droits du fichier | Constantes du mode Chmod |
| `process.parent.interpreter.file.modification_time` | nombre entier | Date de modification du fichier |  |
| `process.parent.interpreter.file.mount_id` | nombre entier | ID de montage du fichier |  |
| `process.parent.interpreter.file.name` | chaîne | Basename du fichier |  |
| `process.parent.interpreter.file.name.length` | nombre entier | Longueur de la chaîne 'process.parent.interpreter.file.name' |  |
| `process.parent.interpreter.file.path` | chaîne | Chemin d'accès du fichier |  |
| `process.parent.interpreter.file.path.length` | nombre entier | Longueur de la chaîne 'process.parent.interpreter.file.path' |  |
| `process.parent.interpreter.file.rights` | nombre entier | Mode/droits du fichier | Constantes du mode Chmod |
| `process.parent.interpreter.file.uid` | nombre entier | UID du propriétaire du fichier |  |
| `process.parent.interpreter.file.user` | chaîne | Utilisateur du propriétaire du fichier |  |
| `process.parent.is_kworker` | booléen | Indique si le processus est un kworker |  |
| `process.parent.is_thread` | booléen | Indique si le processus est considéré comme un thread (autrement dit, un processus enfant n'ayant pas exécuté un autre programme) |  |
| `process.parent.pid` | nombre entier | Identifiant du processus (également appelé « identifiant du groupe de threads ») |  |
| `process.parent.ppid` | nombre entier | ID du processus parent |  |
| `process.parent.tid` | nombre entier | ID du thread |  |
| `process.parent.tty_name` | chaîne | Nom du TTY associé au processus |  |
| `process.parent.uid` | nombre entier | UID du processus |  |
| `process.parent.user` | chaîne | Utilisateur du processus |  |
| `process.pid` | nombre entier | Identifiant du processus (également appelé « identifiant du groupe de threads ») |  |
| `process.ppid` | nombre entier | ID du processus parent |  |
| `process.tid` | nombre entier | ID du thread |  |
| `process.tty_name` | chaîne | Nom du TTY associé au processus |  |
| `process.uid` | nombre entier | UID du processus |  |
| `process.user` | chaîne | Utilisateur du processus |  |

### Événement `bind`

_Ce type d'événement est expérimental et pourrait changer à l'avenir._

Un bind a été exécuté

| Propriété | Type | Définition | Constantes |
| -------- | ---- | ---------- | --------- |
| `bind.addr.family` | nombre entier | Famille d'adresses |  |
| `bind.addr.ip` | IP/CIDR | Adresse IP |  |
| `bind.addr.port` | nombre entier | Numéro de port |  |
| `bind.retval` | nombre entier | Valeur renvoyée de l'appel système | Constantes d'erreur |

### Événement `bpf`

Une commande BPF a été exécutée

| Propriété | Type | Définition | Constantes |
| -------- | ---- | ---------- | --------- |
| `bpf.cmd` | nombre entier | Nom de la commande BPF | Commandes BPF |
| `bpf.map.name` | chaîne | Nom de la carte eBPF (ajouté dans la version 7.35) |  |
| `bpf.map.type` | nombre entier | Type de carte eBPF | Types de carte BPF |
| `bpf.prog.attach_type` | nombre entier | Type d'association du programme eBPF | Types d'association BPF |
| `bpf.prog.helpers` | nombre entier | Auxiliaires eBPF utilisés par le programme eBPF (ajouté dans la version 7.35) | Fonctions des auxiliaires BPF |
| `bpf.prog.name` | chaîne | Nom du programme eBPF (ajouté dans la version 7.35) |  |
| `bpf.prog.tag` | chaîne | Hash (sha1) du programme eBPF (ajouté dans la version 7.35) |  |
| `bpf.prog.type` | nombre entier | Type de programme eBPF | Types de programme BPF |
| `bpf.retval` | nombre entier | Valeur renvoyée de l'appel système | Constantes d'erreur |

### Événement `capset`

Un processus a modifié son ensemble de capacités

| Propriété | Type | Définition | Constantes |
| -------- | ---- | ---------- | --------- |
| `capset.cap_effective` | nombre entier | Ensemble de capacités effectives du processus | Constantes des capacités de kernel |
| `capset.cap_permitted` | nombre entier | Ensemble de capacités autorisées du processus | Constantes des capacités de kernel |

### Événement `chmod`

Les autorisations d'un fichier ont été modifiées

| Propriété | Type | Définition | Constantes |
| -------- | ---- | ---------- | --------- |
| `chmod.file.change_time` | nombre entier | Date de modification du fichier |  |
| `chmod.file.destination.mode` | nombre entier | Nouveau mode/nouveaux droits du fichier sur lequel la commande chmod a été exécutée | Constantes du mode Chmod |
| `chmod.file.destination.rights` | nombre entier | Nouveau mode/nouveaux droits du fichier sur lequel la commande chmod a été exécutée | Constantes du mode Chmod |
| `chmod.file.filesystem` | chaîne | Système de fichiers du fichier |  |
| `chmod.file.gid` | nombre entier | GID du propriétaire du fichier |  |
| `chmod.file.group` | chaîne | Groupe du propriétaire du fichier |  |
| `chmod.file.in_upper_layer` | booléen | Indicateur de la couche de fichier, par exemple dans un OverlayFS |  |
| `chmod.file.inode` | nombre entier | Inode du fichier |  |
| `chmod.file.mode` | nombre entier | Mode/droits du fichier | Constantes du mode Chmod |
| `chmod.file.modification_time` | nombre entier | Date de modification du fichier |  |
| `chmod.file.mount_id` | nombre entier | ID de montage du fichier |  |
| `chmod.file.name` | chaîne | Basename du fichier |  |
| `chmod.file.name.length` | nombre entier | Longueur de la chaîne 'chmod.file.name' |  |
| `chmod.file.path` | chaîne | Chemin d'accès du fichier |  |
| `chmod.file.path.length` | nombre entier | Longueur de la chaîne 'chmod.file.path' |  |
| `chmod.file.rights` | nombre entier | Mode/droits du fichier | Constantes du mode Chmod |
| `chmod.file.uid` | nombre entier | UID du propriétaire du fichier |  |
| `chmod.file.user` | chaîne | Utilisateur du propriétaire du fichier |  |
| `chmod.retval` | nombre entier | Valeur renvoyée de l'appel système | Constantes d'erreur |

### Événement `chown`

Le fichier a changé de propriétaire

| Propriété | Type | Définition | Constantes |
| -------- | ---- | ---------- | --------- |
| `chown.file.change_time` | nombre entier | Date de modification du fichier |  |
| `chown.file.destination.gid` | nombre entier | Nouveau GID du propriétaire du fichier sur lequel la commande chown a été exécutée |  |
| `chown.file.destination.group` | chaîne | Nouveau groupe du propriétaire du fichier sur lequel la commande chown a été exécutée |  |
| `chown.file.destination.uid` | nombre entier | Nouvel UID du propriétaire du fichier sur lequel la commande chown a été exécutée |  |
| `chown.file.destination.user` | chaîne | Nouvel utilisateur du propriétaire du fichier sur lequel la commande chown a été exécutée |  |
| `chown.file.filesystem` | chaîne | Système de fichiers du fichier |  |
| `chown.file.gid` | nombre entier | GID du propriétaire du fichier |  |
| `chown.file.group` | chaîne | Groupe du propriétaire du fichier |  |
| `chown.file.in_upper_layer` | booléen | Indicateur de la couche de fichier, par exemple dans un OverlayFS |  |
| `chown.file.inode` | nombre entier | Inode du fichier |  |
| `chown.file.mode` | nombre entier | Mode/droits du fichier | Constantes du mode Chmod |
| `chown.file.modification_time` | nombre entier | Date de modification du fichier |  |
| `chown.file.mount_id` | nombre entier | ID de montage du fichier |  |
| `chown.file.name` | chaîne | Basename du fichier |  |
| `chown.file.name.length` | nombre entier | Longueur de la chaîne 'chown.file.name' |  |
| `chown.file.path` | chaîne | Chemin d'accès du fichier |  |
| `chown.file.path.length` | nombre entier | Longueur de la chaîne 'chown.file.path' |  |
| `chown.file.rights` | nombre entier | Mode/droits du fichier | Constantes du mode Chmod |
| `chown.file.uid` | nombre entier | UID du propriétaire du fichier |  |
| `chown.file.user` | chaîne | Utilisateur du propriétaire du fichier |  |
| `chown.retval` | nombre entier | Valeur renvoyée de l'appel système | Constantes d'erreur |

### Événement `dns`

Une requête DNS a été envoyée

| Propriété | Type | Définition | Constantes |
| -------- | ---- | ---------- | --------- |
| `dns.id` | nombre entier | [Expérimental] L'ID de la requête DNS |  |
| `dns.question.class` | nombre entier | La classe recherchée par la question DNS | Classes de requêtes DNS |
| `dns.question.count` | nombre entier | Le nombre total de questions au sein de la requête DNS |  |
| `dns.question.length` | nombre entier | La taille totale de la requête DNS en octets |  |
| `dns.question.name` | chaîne | Le nom de domaine interrogé |  |
| `dns.question.name.length` | nombre entier | Le nom de domaine interrogé |  |
| `dns.question.type` | nombre entier | Un code de deux octets spécifiant le type de question DNS | Types de requêtes DNS |

### Événement `exec`

Un processus a été exécuté ou forké

| Propriété | Type | Définition | Constantes |
| -------- | ---- | ---------- | --------- |
| `exec.args` | chaîne | Arguments du processus (sous forme de chaîne) |  |
| `exec.args_flags` | chaîne | Arguments du processus (sous forme de tableau) |  |
| `exec.args_options` | chaîne | Arguments du processus (sous forme de tableau) |  |
| `exec.args_truncated` | booléen | Indicateur d'arguments tronqués |  |
| `exec.argv` | chaîne | Arguments du processus (sous forme de tableau) |  |
| `exec.argv0` | chaîne | Premier argument du processus |  |
| `exec.cap_effective` | nombre entier | Ensemble de capacités effectives du processus | Constantes des capacités de kernel |
| `exec.cap_permitted` | nombre entier | Ensemble de capacités autorisées du processus | Constantes des capacités de kernel |
| `exec.comm` | chaîne | Attribut comm du processus |  |
| `exec.container.id` | chaîne | ID du conteneur |  |
| `exec.cookie` | nombre entier | Cookie du processus |  |
| `exec.created_at` | nombre entier | Timestamp de création du processus |  |
| `exec.egid` | nombre entier | GID effectif du processus |  |
| `exec.egroup` | chaîne | Groupe effectif du processus |  |
| `exec.envp` | chaîne | Variables d'environnement du processus |  |
| `exec.envs` | chaîne | Noms des variables d'environnement du processus |  |
| `exec.envs_truncated` | booléen | Indicateur de variables d'environnement tronquées |  |
| `exec.euid` | nombre entier | UID effectif du processus |  |
| `exec.euser` | chaîne | Utilisateur effectif du processus |  |
| `exec.file.change_time` | nombre entier | Date de modification du fichier |  |
| `exec.file.filesystem` | chaîne | Système de fichiers du fichier |  |
| `exec.file.gid` | nombre entier | GID du propriétaire du fichier |  |
| `exec.file.group` | chaîne | Groupe du propriétaire du fichier |  |
| `exec.file.in_upper_layer` | booléen | Indicateur de la couche de fichier, par exemple dans un OverlayFS |  |
| `exec.file.inode` | nombre entier | Inode du fichier |  |
| `exec.file.mode` | nombre entier | Mode/droits du fichier | Constantes du mode Chmod |
| `exec.file.modification_time` | nombre entier | Date de modification du fichier |  |
| `exec.file.mount_id` | nombre entier | ID de montage du fichier |  |
| `exec.file.name` | chaîne | Basename du fichier |  |
| `exec.file.name.length` | nombre entier | Longueur de la chaîne 'exec.file.name' |  |
| `exec.file.path` | chaîne | Chemin d'accès du fichier |  |
| `exec.file.path.length` | nombre entier | Longueur de la chaîne 'exec.file.path' |  |
| `exec.file.rights` | nombre entier | Mode/droits du fichier | Constantes du mode Chmod |
| `exec.file.uid` | nombre entier | UID du propriétaire du fichier |  |
| `exec.file.user` | chaîne | Utilisateur du propriétaire du fichier |  |
| `exec.fsgid` | nombre entier | GID du système de fichiers du processus |  |
| `exec.fsgroup` | chaîne | Groupe du système de fichiers du processus |  |
| `exec.fsuid` | nombre entier | UID du système de fichiers du processus |  |
| `exec.fsuser` | chaîne | Utilisateur du système de fichiers du processus |  |
| `exec.gid` | nombre entier | GID du processus |  |
| `exec.group` | chaîne | Groupe du processus |  |
| `exec.interpreter.file.change_time` | nombre entier | Date de modification du fichier |  |
| `exec.interpreter.file.filesystem` | chaîne | Système de fichiers du fichier |  |
| `exec.interpreter.file.gid` | nombre entier | GID du propriétaire du fichier |  |
| `exec.interpreter.file.group` | chaîne | Groupe du propriétaire du fichier |  |
| `exec.interpreter.file.in_upper_layer` | booléen | Indicateur de la couche de fichier, par exemple dans un OverlayFS |  |
| `exec.interpreter.file.inode` | nombre entier | Inode du fichier |  |
| `exec.interpreter.file.mode` | nombre entier | Mode/droits du fichier | Constantes du mode Chmod |
| `exec.interpreter.file.modification_time` | nombre entier | Date de modification du fichier |  |
| `exec.interpreter.file.mount_id` | nombre entier | ID de montage du fichier |  |
| `exec.interpreter.file.name` | chaîne | Basename du fichier |  |
| `exec.interpreter.file.name.length` | nombre entier | Longueur de la chaîne 'exec.interpreter.file.name' |  |
| `exec.interpreter.file.path` | chaîne | Chemin d'accès du fichier |  |
| `exec.interpreter.file.path.length` | nombre entier | Longueur de la chaîne 'exec.interpreter.file.path' |  |
| `exec.interpreter.file.rights` | nombre entier | Mode/droits du fichier | Constantes du mode Chmod |
| `exec.interpreter.file.uid` | nombre entier | UID du propriétaire du fichier |  |
| `exec.interpreter.file.user` | chaîne | Utilisateur du propriétaire du fichier |  |
| `exec.is_kworker` | booléen | Indique si le processus est un kworker |  |
| `exec.is_thread` | booléen | Indique si le processus est considéré comme un thread (autrement dit, un processus enfant n'ayant pas exécuté un autre programme) |  |
| `exec.pid` | nombre entier | Identifiant du processus (également appelé « identifiant du groupe de threads ») |  |
| `exec.ppid` | nombre entier | ID du processus parent |  |
| `exec.tid` | nombre entier | ID du thread |  |
| `exec.tty_name` | chaîne | Nom du TTY associé au processus |  |
| `exec.uid` | nombre entier | UID du processus |  |
| `exec.user` | chaîne | Utilisateur du processus |  |

### Événement `exit`

Un processus a été interrompu

| Propriété | Type | Définition | Constantes |
| -------- | ---- | ---------- | --------- |
| `exit.args` | chaîne | Arguments du processus (sous forme de chaîne) |  |
| `exit.args_flags` | chaîne | Arguments du processus (sous forme de tableau) |  |
| `exit.args_options` | chaîne | Arguments du processus (sous forme de tableau) |  |
| `exit.args_truncated` | booléen | Indicateur d'arguments tronqués |  |
| `exit.argv` | chaîne | Arguments du processus (sous forme de tableau) |  |
| `exit.argv0` | chaîne | Premier argument du processus |  |
| `exit.cap_effective` | nombre entier | Ensemble de capacités effectives du processus | Constantes des capacités de kernel |
| `exit.cap_permitted` | nombre entier | Ensemble de capacités autorisées du processus | Constantes des capacités de kernel |
| `exit.cause` | nombre entier | Cause de l'interruption du processus (événement EXITED, SIGNALED ou COREDUMPED) |  |
| `exit.code` | nombre entier | Code de sortie du processus ou numéro du signal ayant entraîné l'interruption du processus |  |
| `exit.comm` | chaîne | Attribut comm du processus |  |
| `exit.container.id` | chaîne | ID du conteneur |  |
| `exit.cookie` | nombre entier | Cookie du processus |  |
| `exit.created_at` | nombre entier | Timestamp de création du processus |  |
| `exit.egid` | nombre entier | GID effectif du processus |  |
| `exit.egroup` | chaîne | Groupe effectif du processus |  |
| `exit.envp` | chaîne | Variables d'environnement du processus |  |
| `exit.envs` | chaîne | Noms des variables d'environnement du processus |  |
| `exit.envs_truncated` | booléen | Indicateur de variables d'environnement tronquées |  |
| `exit.euid` | nombre entier | UID effectif du processus |  |
| `exit.euser` | chaîne | Utilisateur effectif du processus |  |
| `exit.file.change_time` | nombre entier | Date de modification du fichier |  |
| `exit.file.filesystem` | chaîne | Système de fichiers du fichier |  |
| `exit.file.gid` | nombre entier | GID du propriétaire du fichier |  |
| `exit.file.group` | chaîne | Groupe du propriétaire du fichier |  |
| `exit.file.in_upper_layer` | booléen | Indicateur de la couche de fichier, par exemple dans un OverlayFS |  |
| `exit.file.inode` | nombre entier | Inode du fichier |  |
| `exit.file.mode` | nombre entier | Mode/droits du fichier | Constantes du mode Chmod |
| `exit.file.modification_time` | nombre entier | Date de modification du fichier |  |
| `exit.file.mount_id` | nombre entier | ID de montage du fichier |  |
| `exit.file.name` | chaîne | Basename du fichier |  |
| `exit.file.name.length` | nombre entier | Longueur de la chaîne 'exit.file.name' |  |
| `exit.file.path` | chaîne | Chemin d'accès du fichier |  |
| `exit.file.path.length` | nombre entier | Longueur de la chaîne 'exit.file.path' |  |
| `exit.file.rights` | nombre entier | Mode/droits du fichier | Constantes du mode Chmod |
| `exit.file.uid` | nombre entier | UID du propriétaire du fichier |  |
| `exit.file.user` | chaîne | Utilisateur du propriétaire du fichier |  |
| `exit.fsgid` | nombre entier | GID du système de fichiers du processus |  |
| `exit.fsgroup` | chaîne | Groupe du système de fichiers du processus |  |
| `exit.fsuid` | nombre entier | UID du système de fichiers du processus |  |
| `exit.fsuser` | chaîne | Utilisateur du système de fichiers du processus |  |
| `exit.gid` | nombre entier | GID du processus |  |
| `exit.group` | chaîne | Groupe du processus |  |
| `exit.interpreter.file.change_time` | nombre entier | Date de modification du fichier |  |
| `exit.interpreter.file.filesystem` | chaîne | Système de fichiers du fichier |  |
| `exit.interpreter.file.gid` | nombre entier | GID du propriétaire du fichier |  |
| `exit.interpreter.file.group` | chaîne | Groupe du propriétaire du fichier |  |
| `exit.interpreter.file.in_upper_layer` | booléen | Indicateur de la couche de fichier, par exemple dans un OverlayFS |  |
| `exit.interpreter.file.inode` | nombre entier | Inode du fichier |  |
| `exit.interpreter.file.mode` | nombre entier | Mode/droits du fichier | Constantes du mode Chmod |
| `exit.interpreter.file.modification_time` | nombre entier | Date de modification du fichier |  |
| `exit.interpreter.file.mount_id` | nombre entier | ID de montage du fichier |  |
| `exit.interpreter.file.name` | chaîne | Basename du fichier |  |
| `exit.interpreter.file.name.length` | nombre entier | Longueur de la chaîne 'exit.interpreter.file.name' |  |
| `exit.interpreter.file.path` | chaîne | Chemin d'accès du fichier |  |
| `exit.interpreter.file.path.length` | nombre entier | Longueur de la chaîne 'exit.interpreter.file.path' |  |
| `exit.interpreter.file.rights` | nombre entier | Mode/droits du fichier | Constantes du mode Chmod |
| `exit.interpreter.file.uid` | nombre entier | UID du propriétaire du fichier |  |
| `exit.interpreter.file.user` | chaîne | Utilisateur du propriétaire du fichier |  |
| `exit.is_kworker` | booléen | Indique si le processus est un kworker |  |
| `exit.is_thread` | booléen | Indique si le processus est considéré comme un thread (autrement dit, un processus enfant n'ayant pas exécuté un autre programme) |  |
| `exit.pid` | nombre entier | Identifiant du processus (également appelé « identifiant du groupe de threads ») |  |
| `exit.ppid` | nombre entier | ID du processus parent |  |
| `exit.tid` | nombre entier | ID du thread |  |
| `exit.tty_name` | chaîne | Nom du TTY associé au processus |  |
| `exit.uid` | nombre entier | UID du processus |  |
| `exit.user` | chaîne | Utilisateur du processus |  |

### Événement `link`

Un nom/alias a été créé pour un fichier

| Propriété | Type | Définition | Constantes |
| -------- | ---- | ---------- | --------- |
| `link.file.change_time` | nombre entier | Date de modification du fichier |  |
| `link.file.destination.change_time` | nombre entier | Date de modification du fichier |  |
| `link.file.destination.filesystem` | chaîne | Système de fichiers du fichier |  |
| `link.file.destination.gid` | nombre entier | GID du propriétaire du fichier |  |
| `link.file.destination.group` | chaîne | Groupe du propriétaire du fichier |  |
| `link.file.destination.in_upper_layer` | booléen | Indicateur de la couche de fichier, par exemple dans un OverlayFS |  |
| `link.file.destination.inode` | nombre entier | Inode du fichier |  |
| `link.file.destination.mode` | nombre entier | Mode/droits du fichier | Constantes du mode Chmod |
| `link.file.destination.modification_time` | nombre entier | Date de modification du fichier |  |
| `link.file.destination.mount_id` | nombre entier | ID de montage du fichier |  |
| `link.file.destination.name` | chaîne | Basename du fichier |  |
| `link.file.destination.name.length` | nombre entier | Longueur de la chaîne 'link.file.destination.name' |  |
| `link.file.destination.path` | chaîne | Chemin d'accès du fichier |  |
| `link.file.destination.path.length` | nombre entier | Longueur de la chaîne 'link.file.destination.path' |  |
| `link.file.destination.rights` | nombre entier | Mode/droits du fichier | Constantes du mode Chmod |
| `link.file.destination.uid` | nombre entier | UID du propriétaire du fichier |  |
| `link.file.destination.user` | chaîne | Utilisateur du propriétaire du fichier |  |
| `link.file.filesystem` | chaîne | Système de fichiers du fichier |  |
| `link.file.gid` | nombre entier | GID du propriétaire du fichier |  |
| `link.file.group` | chaîne | Groupe du propriétaire du fichier |  |
| `link.file.in_upper_layer` | booléen | Indicateur de la couche de fichier, par exemple dans un OverlayFS |  |
| `link.file.inode` | nombre entier | Inode du fichier |  |
| `link.file.mode` | nombre entier | Mode/droits du fichier | Constantes du mode Chmod |
| `link.file.modification_time` | nombre entier | Date de modification du fichier |  |
| `link.file.mount_id` | nombre entier | ID de montage du fichier |  |
| `link.file.name` | chaîne | Basename du fichier |  |
| `link.file.name.length` | nombre entier | Longueur de la chaîne 'link.file.name' |  |
| `link.file.path` | chaîne | Chemin d'accès du fichier |  |
| `link.file.path.length` | nombre entier | Longueur de la chaîne 'link.file.path' |  |
| `link.file.rights` | nombre entier | Mode/droits du fichier | Constantes du mode Chmod |
| `link.file.uid` | nombre entier | UID du propriétaire du fichier |  |
| `link.file.user` | chaîne | Utilisateur du propriétaire du fichier |  |
| `link.retval` | nombre entier | Valeur renvoyée de l'appel système | Constantes d'erreur |

### Event `load_module`

Un nouveau module kernel a été chargé

| Propriété | Type | Définition | Constantes |
| -------- | ---- | ---------- | --------- |
| `load_module.file.change_time` | nombre entier | Date de modification du fichier |  |
| `load_module.file.filesystem` | chaîne | Système de fichiers du fichier |  |
| `load_module.file.gid` | nombre entier | GID du propriétaire du fichier |  |
| `load_module.file.group` | chaîne | Groupe du propriétaire du fichier |  |
| `load_module.file.in_upper_layer` | booléen | Indicateur de la couche de fichier, par exemple dans un OverlayFS |  |
| `load_module.file.inode` | nombre entier | Inode du fichier |  |
| `load_module.file.mode` | nombre entier | Mode/droits du fichier | Constantes du mode Chmod |
| `load_module.file.modification_time` | nombre entier | Date de modification du fichier |  |
| `load_module.file.mount_id` | nombre entier | ID de montage du fichier |  |
| `load_module.file.name` | chaîne | Basename du fichier |  |
| `load_module.file.name.length` | nombre entier | Longueur de la chaîne 'load_module.file.name' |  |
| `load_module.file.path` | chaîne | Chemin d'accès du fichier |  |
| `load_module.file.path.length` | nombre entier | Longueur de la chaîne 'load_module.file.path' |  |
| `load_module.file.rights` | nombre entier | Mode/droits du fichier | Constantes du mode Chmod |
| `load_module.file.uid` | nombre entier | UID du propriétaire du fichier |  |
| `load_module.file.user` | chaîne | Utilisateur du propriétaire du fichier |  |
| `load_module.loaded_from_memory` | booléen | Indique si le module kernel a été chargé à partir de la mémoire |  |
| `load_module.name` | chaîne | Nom du nouveau module kernel |  |
| `load_module.retval` | nombre entier | Valeur renvoyée de l'appel système | Constantes d'erreur |

### Événement `mkdir`

Un répertoire a été créé

| Propriété | Type | Définition | Constantes |
| -------- | ---- | ---------- | --------- |
| `mkdir.file.change_time` | nombre entier | Date de modification du fichier |  |
| `mkdir.file.destination.mode` | nombre entier | Mode/droits du nouveau répertoire | Constantes du mode Chmod |
| `mkdir.file.destination.rights` | nombre entier | Mode/droits du nouveau répertoire | Constantes du mode Chmod |
| `mkdir.file.filesystem` | chaîne | Système de fichiers du fichier |  |
| `mkdir.file.gid` | nombre entier | GID du propriétaire du fichier |  |
| `mkdir.file.group` | chaîne | Groupe du propriétaire du fichier |  |
| `mkdir.file.in_upper_layer` | booléen | Indicateur de la couche de fichier, par exemple dans un OverlayFS |  |
| `mkdir.file.inode` | nombre entier | Inode du fichier |  |
| `mkdir.file.mode` | nombre entier | Mode/droits du fichier | Constantes du mode Chmod |
| `mkdir.file.modification_time` | nombre entier | Date de modification du fichier |  |
| `mkdir.file.mount_id` | nombre entier | ID de montage du fichier |  |
| `mkdir.file.name` | chaîne | Basename du fichier |  |
| `mkdir.file.name.length` | nombre entier | Longueur de la chaîne 'mkdir.file.name' |  |
| `mkdir.file.path` | chaîne | Chemin d'accès du fichier |  |
| `mkdir.file.path.length` | nombre entier | Longueur de la chaîne 'mkdir.file.path' |  |
| `mkdir.file.rights` | nombre entier | Mode/droits du fichier | Constantes du mode Chmod |
| `mkdir.file.uid` | nombre entier | UID du propriétaire du fichier |  |
| `mkdir.file.user` | chaîne | Utilisateur du propriétaire du fichier |  |
| `mkdir.retval` | nombre entier | Valeur renvoyée de l'appel système | Constantes d'erreur |

### Événement `mmap`

Une commande mmap a été exécutée

| Propriété | Type | Définition | Constantes |
| -------- | ---- | ---------- | --------- |
| `mmap.file.change_time` | nombre entier | Date de modification du fichier |  |
| `mmap.file.filesystem` | chaîne | Système de fichiers du fichier |  |
| `mmap.file.gid` | nombre entier | GID du propriétaire du fichier |  |
| `mmap.file.group` | chaîne | Groupe du propriétaire du fichier |  |
| `mmap.file.in_upper_layer` | booléen | Indicateur de la couche de fichier, par exemple dans un OverlayFS |  |
| `mmap.file.inode` | nombre entier | Inode du fichier |  |
| `mmap.file.mode` | nombre entier | Mode/droits du fichier | Constantes du mode Chmod |
| `mmap.file.modification_time` | nombre entier | Date de modification du fichier |  |
| `mmap.file.mount_id` | nombre entier | ID de montage du fichier |  |
| `mmap.file.name` | chaîne | Basename du fichier |  |
| `mmap.file.name.length` | nombre entier | Longueur de la chaîne 'mmap.file.name' |  |
| `mmap.file.path` | chaîne | Chemin d'accès du fichier |  |
| `mmap.file.path.length` | nombre entier | Longueur de la chaîne 'mmap.file.path' |  |
| `mmap.file.rights` | nombre entier | Mode/droits du fichier | Constantes du mode Chmod |
| `mmap.file.uid` | nombre entier | UID du propriétaire du fichier |  |
| `mmap.file.user` | chaîne | Utilisateur du propriétaire du fichier |  |
| `mmap.flags` | nombre entier | Flags du segment de mémoire | Flags MMap |
| `mmap.protection` | nombre entier | Protection du segment de mémoire | Constantes de protection |
| `mmap.retval` | nombre entier | Valeur renvoyée de l'appel système | Constantes d'erreur |

### Événement `mprotect`

Une commande mprotect a été exécutée

| Propriété | Type | Définition | Constantes |
| -------- | ---- | ---------- | --------- |
| `mprotect.req_protection` | nombre entier | Nouvelle protection du segment de mémoire | Flags de la mémoire virtuelle |
| `mprotect.retval` | nombre entier | Valeur renvoyée de l'appel système | Constantes d'erreur |
| `mprotect.vm_protection` | nombre entier | Protection initiale du segment mémoire | Flags de la mémoire virtuelle |

### Événement `open`

Un fichier a été ouvert

| Propriété | Type | Définition | Constantes |
| -------- | ---- | ---------- | --------- |
| `open.file.change_time` | nombre entier | Date de modification du fichier |  |
| `open.file.destination.mode` | nombre entier | Mode du fichier créé | Constantes du mode Chmod |
| `open.file.filesystem` | chaîne | Système de fichiers du fichier |  |
| `open.file.gid` | nombre entier | GID du propriétaire du fichier |  |
| `open.file.group` | chaîne | Groupe du propriétaire du fichier |  |
| `open.file.in_upper_layer` | booléen | Indicateur de la couche de fichier, par exemple dans un OverlayFS |  |
| `open.file.inode` | nombre entier | Inode du fichier |  |
| `open.file.mode` | nombre entier | Mode/droits du fichier | Constantes du mode Chmod |
| `open.file.modification_time` | nombre entier | Date de modification du fichier |  |
| `open.file.mount_id` | nombre entier | ID de montage du fichier |  |
| `open.file.name` | chaîne | Basename du fichier |  |
| `open.file.name.length` | nombre entier | Longueur de la chaîne 'open.file.name' |  |
| `open.file.path` | chaîne | Chemin d'accès du fichier |  |
| `open.file.path.length` | nombre entier | Longueur de la chaîne 'open.file.path' |  |
| `open.file.rights` | nombre entier | Mode/droits du fichier | Constantes du mode Chmod |
| `open.file.uid` | nombre entier | UID du propriétaire du fichier |  |
| `open.file.user` | chaîne | Utilisateur du propriétaire du fichier |  |
| `open.flags` | nombre entier | Flags utilisés lors de l'ouverture du fichier | Flags d'ouverture |
| `open.retval` | nombre entier | Valeur renvoyée de l'appel système | Constantes d'erreur |

### Événement `ptrace`

Une commande ptrace a éé exécutée

| Propriété | Type | Définition | Constantes |
| -------- | ---- | ---------- | --------- |
| `ptrace.request` | nombre entier | Requête ptrace | Constantes ptrace |
| `ptrace.retval` | nombre entier | Valeur renvoyée de l'appel système | Constantes d'erreur |
| `ptrace.tracee.ancestors.args` | chaîne | Arguments du processus (sous forme de chaîne) |  |
| `ptrace.tracee.ancestors.args_flags` | chaîne | Arguments du processus (sous forme de tableau) |  |
| `ptrace.tracee.ancestors.args_options` | chaîne | Arguments du processus (sous forme de tableau) |  |
| `ptrace.tracee.ancestors.args_truncated` | booléen | Indicateur d'arguments tronqués |  |
| `ptrace.tracee.ancestors.argv` | chaîne | Arguments du processus (sous forme de tableau) |  |
| `ptrace.tracee.ancestors.argv0` | chaîne | Premier argument du processus |  |
| `ptrace.tracee.ancestors.cap_effective` | nombre entier | Ensemble de capacités effectives du processus | Constantes des capacités de kernel |
| `ptrace.tracee.ancestors.cap_permitted` | nombre entier | Ensemble de capacités autorisées du processus | Constantes des capacités de kernel |
| `ptrace.tracee.ancestors.comm` | chaîne | Attribut comm du processus |  |
| `ptrace.tracee.ancestors.container.id` | chaîne | ID du conteneur |  |
| `ptrace.tracee.ancestors.cookie` | nombre entier | Cookie du processus |  |
| `ptrace.tracee.ancestors.created_at` | nombre entier | Timestamp de création du processus |  |
| `ptrace.tracee.ancestors.egid` | nombre entier | GID effectif du processus |  |
| `ptrace.tracee.ancestors.egroup` | chaîne | Groupe effectif du processus |  |
| `ptrace.tracee.ancestors.envp` | chaîne | Variables d'environnement du processus |  |
| `ptrace.tracee.ancestors.envs` | chaîne | Noms des variables d'environnement du processus |  |
| `ptrace.tracee.ancestors.envs_truncated` | booléen | Indicateur de variables d'environnement tronquées |  |
| `ptrace.tracee.ancestors.euid` | nombre entier | UID effectif du processus |  |
| `ptrace.tracee.ancestors.euser` | chaîne | Utilisateur effectif du processus |  |
| `ptrace.tracee.ancestors.file.change_time` | nombre entier | Date de modification du fichier |  |
| `ptrace.tracee.ancestors.file.filesystem` | chaîne | Système de fichiers du fichier |  |
| `ptrace.tracee.ancestors.file.gid` | nombre entier | GID du propriétaire du fichier |  |
| `ptrace.tracee.ancestors.file.group` | chaîne | Groupe du propriétaire du fichier |  |
| `ptrace.tracee.ancestors.file.in_upper_layer` | booléen | Indicateur de la couche de fichier, par exemple dans un OverlayFS |  |
| `ptrace.tracee.ancestors.file.inode` | nombre entier | Inode du fichier |  |
| `ptrace.tracee.ancestors.file.mode` | nombre entier | Mode/droits du fichier | Constantes du mode Chmod |
| `ptrace.tracee.ancestors.file.modification_time` | nombre entier | Date de modification du fichier |  |
| `ptrace.tracee.ancestors.file.mount_id` | nombre entier | ID de montage du fichier |  |
| `ptrace.tracee.ancestors.file.name` | chaîne | Basename du fichier |  |
| `ptrace.tracee.ancestors.file.name.length` | nombre entier | Longueur de la chaîne 'ptrace.tracee.ancestors.file.name' |  |
| `ptrace.tracee.ancestors.file.path` | chaîne | Chemin d'accès du fichier |  |
| `ptrace.tracee.ancestors.file.path.length` | nombre entier | Longueur de la chaîne 'ptrace.tracee.ancestors.file.path' |  |
| `ptrace.tracee.ancestors.file.rights` | nombre entier | Mode/droits du fichier | Constantes du mode Chmod |
| `ptrace.tracee.ancestors.file.uid` | nombre entier | UID du propriétaire du fichier |  |
| `ptrace.tracee.ancestors.file.user` | chaîne | Utilisateur du propriétaire du fichier |  |
| `ptrace.tracee.ancestors.fsgid` | nombre entier | GID du système de fichiers du processus |  |
| `ptrace.tracee.ancestors.fsgroup` | chaîne | Groupe du système de fichiers du processus |  |
| `ptrace.tracee.ancestors.fsuid` | nombre entier | UID du système de fichiers du processus |  |
| `ptrace.tracee.ancestors.fsuser` | chaîne | Utilisateur du système de fichiers du processus |  |
| `ptrace.tracee.ancestors.gid` | nombre entier | GID du processus |  |
| `ptrace.tracee.ancestors.group` | chaîne | Groupe du processus |  |
| `ptrace.tracee.ancestors.interpreter.file.change_time` | nombre entier | Date de modification du fichier |  |
| `ptrace.tracee.ancestors.interpreter.file.filesystem` | chaîne | Système de fichiers du fichier |  |
| `ptrace.tracee.ancestors.interpreter.file.gid` | nombre entier | GID du propriétaire du fichier |  |
| `ptrace.tracee.ancestors.interpreter.file.group` | chaîne | Groupe du propriétaire du fichier |  |
| `ptrace.tracee.ancestors.interpreter.file.in_upper_layer` | booléen | Indicateur de la couche de fichier, par exemple dans un OverlayFS |  |
| `ptrace.tracee.ancestors.interpreter.file.inode` | nombre entier | Inode du fichier |  |
| `ptrace.tracee.ancestors.interpreter.file.mode` | nombre entier | Mode/droits du fichier | Constantes du mode Chmod |
| `ptrace.tracee.ancestors.interpreter.file.modification_time` | nombre entier | Date de modification du fichier |  |
| `ptrace.tracee.ancestors.interpreter.file.mount_id` | nombre entier | ID de montage du fichier |  |
| `ptrace.tracee.ancestors.interpreter.file.name` | chaîne | Basename du fichier |  |
| `ptrace.tracee.ancestors.interpreter.file.name.length` | nombre entier | Longueur de la chaîne 'ptrace.tracee.ancestors.interpreter.file.name' |  |
| `ptrace.tracee.ancestors.interpreter.file.path` | chaîne | Chemin d'accès du fichier |  |
| `ptrace.tracee.ancestors.interpreter.file.path.length` | nombre entier | Longueur de la chaîne 'ptrace.tracee.ancestors.interpreter.file.path' |  |
| `ptrace.tracee.ancestors.interpreter.file.rights` | nombre entier | Mode/droits du fichier | Constantes des modes Chmod |
| `ptrace.tracee.ancestors.interpreter.file.uid` | nombre entier | UID du propriétaire du fichier |  |
| `ptrace.tracee.ancestors.interpreter.file.user` | chaîne | Utilisateur du propriétaire du fichier |  |
| `ptrace.tracee.ancestors.is_kworker` | booléen | Indique si le processus est un kworker |  |
| `ptrace.tracee.ancestors.is_thread` | booléen | Indique si le processus est considéré comme un thread (autrement dit, un processus enfant n'ayant pas exécuté un autre programme) |  |
| `ptrace.tracee.ancestors.pid` | nombre entier | Identifiant du processus (également appelé « identifiant du groupe de threads ») |  |
| `ptrace.tracee.ancestors.ppid` | nombre entier | ID du processus parent |  |
| `ptrace.tracee.ancestors.tid` | nombre entier | ID du thread |  |
| `ptrace.tracee.ancestors.tty_name` | chaîne | Nom du TTY associé au processus |  |
| `ptrace.tracee.ancestors.uid` | nombre entier | UID du processus |  |
| `ptrace.tracee.ancestors.user` | chaîne | Utilisateur du processus |  |
| `ptrace.tracee.args` | chaîne | Arguments du processus (sous forme de chaîne) |  |
| `ptrace.tracee.args_flags` | chaîne | Arguments du processus (sous forme de tableau) |  |
| `ptrace.tracee.args_options` | chaîne | Arguments du processus (sous forme de tableau) |  |
| `ptrace.tracee.args_truncated` | booléen | Indicateur d'arguments tronqués |  |
| `ptrace.tracee.argv` | chaîne | Arguments du processus (sous forme de tableau) |  |
| `ptrace.tracee.argv0` | chaîne | Premier argument du processus |  |
| `ptrace.tracee.cap_effective` | nombre entier | Ensemble de capacités effectives du processus | Constantes des capacités de kernel |
| `ptrace.tracee.cap_permitted` | nombre entier | Ensemble de capacités autorisées du processus | Constantes des capacités de kernel |
| `ptrace.tracee.comm` | chaîne | Attribut comm du processus |  |
| `ptrace.tracee.container.id` | chaîne | ID du conteneur |  |
| `ptrace.tracee.cookie` | nombre entier | Cookie du processus |  |
| `ptrace.tracee.created_at` | nombre entier | Timestamp de création du processus |  |
| `ptrace.tracee.egid` | nombre entier | GID effectif du processus |  |
| `ptrace.tracee.egroup` | chaîne | Groupe effectif du processus |  |
| `ptrace.tracee.envp` | chaîne | Variables d'environnement du processus |  |
| `ptrace.tracee.envs` | chaîne | Noms des variables d'environnement du processus |  |
| `ptrace.tracee.envs_truncated` | booléen | Indicateur de variables d'environnement tronquées |  |
| `ptrace.tracee.euid` | nombre entier | UID effectif du processus |  |
| `ptrace.tracee.euser` | chaîne | Utilisateur effectif du processus |  |
| `ptrace.tracee.file.change_time` | nombre entier | Date de modification du fichier |  |
| `ptrace.tracee.file.filesystem` | chaîne | Système de fichiers du fichier |  |
| `ptrace.tracee.file.gid` | nombre entier | GID du propriétaire du fichier |  |
| `ptrace.tracee.file.group` | chaîne | Groupe du propriétaire du fichier |  |
| `ptrace.tracee.file.in_upper_layer` | booléen | Indicateur de la couche de fichier, par exemple dans un OverlayFS |  |
| `ptrace.tracee.file.inode` | nombre entier | Inode du fichier |  |
| `ptrace.tracee.file.mode` | nombre entier | Mode/droits du fichier | Constantes du mode Chmod |
| `ptrace.tracee.file.modification_time` | nombre entier | Date de modification du fichier |  |
| `ptrace.tracee.file.mount_id` | nombre entier | ID de montage du fichier |  |
| `ptrace.tracee.file.name` | chaîne | Basename du fichier |  |
| `ptrace.tracee.file.name.length` | nombre entier | Longueur de la chaîne 'ptrace.tracee.file.name' |  |
| `ptrace.tracee.file.path` | chaîne | Chemin d'accès du fichier |  |
| `ptrace.tracee.file.path.length` | nombre entier | Longueur de la chaîne 'ptrace.tracee.file.path' |  |
| `ptrace.tracee.file.rights` | nombre entier | Mode/droits du fichier | Constantes du mode Chmod |
| `ptrace.tracee.file.uid` | nombre entier | UID du propriétaire du fichier |  |
| `ptrace.tracee.file.user` | chaîne | Utilisateur du propriétaire du fichier |  |
| `ptrace.tracee.fsgid` | nombre entier | GID du système de fichiers du processus |  |
| `ptrace.tracee.fsgroup` | chaîne | Groupe du système de fichiers du processus |  |
| `ptrace.tracee.fsuid` | nombre entier | UID du système de fichiers du processus |  |
| `ptrace.tracee.fsuser` | chaîne | Utilisateur du système de fichiers du processus |  |
| `ptrace.tracee.gid` | nombre entier | GID du processus |  |
| `ptrace.tracee.group` | chaîne | Groupe du processus |  |
| `ptrace.tracee.interpreter.file.change_time` | nombre entier | Date de modification du fichier |  |
| `ptrace.tracee.interpreter.file.filesystem` | chaîne | Système de fichiers du fichier |  |
| `ptrace.tracee.interpreter.file.gid` | nombre entier | GID du propriétaire du fichier |  |
| `ptrace.tracee.interpreter.file.group` | chaîne | Groupe du propriétaire du fichier |  |
| `ptrace.tracee.interpreter.file.in_upper_layer` | booléen | Indicateur de la couche de fichier, par exemple dans un OverlayFS |  |
| `ptrace.tracee.interpreter.file.inode` | nombre entier | Inode du fichier |  |
| `ptrace.tracee.interpreter.file.mode` | nombre entier | Mode/droits du fichier | Constantes du mode Chmod |
| `ptrace.tracee.interpreter.file.modification_time` | nombre entier | Date de modification du fichier |  |
| `ptrace.tracee.interpreter.file.mount_id` | nombre entier | ID de montage du fichier |  |
| `ptrace.tracee.interpreter.file.name` | chaîne | Basename du fichier |  |
| `ptrace.tracee.interpreter.file.name.length` | nombre entier | Longueur de la chaîne 'ptrace.tracee.interpreter.file.name' |  |
| `ptrace.tracee.interpreter.file.path` | chaîne | Chemin d'accès du fichier |  |
| `ptrace.tracee.interpreter.file.path.length` | nombre entier | Longueur de la chaîne 'ptrace.tracee.interpreter.file.path' |  |
| `ptrace.tracee.interpreter.file.rights` | nombre entier | Mode/droits du fichier | Constantes du mode Chmod |
| `ptrace.tracee.interpreter.file.uid` | nombre entier | UID du propriétaire du fichier |  |
| `ptrace.tracee.interpreter.file.user` | chaîne | Utilisateur du propriétaire du fichier |  |
| `ptrace.tracee.is_kworker` | booléen | Indique si le processus est un kworker |  |
| `ptrace.tracee.is_thread` | booléen | Indique si le processus est considéré comme un thread (autrement dit, un processus enfant n'ayant pas exécuté un autre programme) |  |
| `ptrace.tracee.parent.args` | chaîne | Arguments du processus (sous forme de chaîne) |  |
| `ptrace.tracee.parent.args_flags` | chaîne | Arguments du processus (sous forme de tableau) |  |
| `ptrace.tracee.parent.args_options` | chaîne | Arguments du processus (sous forme de tableau) |  |
| `ptrace.tracee.parent.args_truncated` | booléen | Indicateur d'arguments tronqués |  |
| `ptrace.tracee.parent.argv` | chaîne | Arguments du processus (sous forme de tableau) |  |
| `ptrace.tracee.parent.argv0` | chaîne | Premier argument du processus |  |
| `ptrace.tracee.parent.cap_effective` | nombre entier | Ensemble de capacités effectives du processus | Constantes des capacités de kernel |
| `ptrace.tracee.parent.cap_permitted` | nombre entier | Ensemble de capacités autorisées du processus | Constantes des capacités de kernel |
| `ptrace.tracee.parent.comm` | chaîne | Attribut comm du processus |  |
| `ptrace.tracee.parent.container.id` | chaîne | ID du conteneur |  |
| `ptrace.tracee.parent.cookie` | nombre entier | Cookie du processus |  |
| `ptrace.tracee.parent.created_at` | nombre entier | Timestamp de création du processus |  |
| `ptrace.tracee.parent.egid` | nombre entier | GID effectif du processus |  |
| `ptrace.tracee.parent.egroup` | chaîne | Groupe effectif du processus |  |
| `ptrace.tracee.parent.envp` | chaîne | Variables d'environnement du processus |  |
| `ptrace.tracee.parent.envs` | chaîne | Noms des variables d'environnement du processus |  |
| `ptrace.tracee.parent.envs_truncated` | booléen | Indicateur de variables d'environnement tronquées |  |
| `ptrace.tracee.parent.euid` | nombre entier | UID effectif du processus |  |
| `ptrace.tracee.parent.euser` | chaîne | Utilisateur effectif du processus |  |
| `ptrace.tracee.parent.file.change_time` | nombre entier | Date de modification du fichier |  |
| `ptrace.tracee.parent.file.filesystem` | chaîne | Système de fichiers du fichier |  |
| `ptrace.tracee.parent.file.gid` | nombre entier | GID du propriétaire du fichier |  |
| `ptrace.tracee.parent.file.group` | chaîne | Groupe du propriétaire du fichier |  |
| `ptrace.tracee.parent.file.in_upper_layer` | booléen | Indicateur de la couche de fichier, par exemple dans un OverlayFS |  |
| `ptrace.tracee.parent.file.inode` | nombre entier | Inode du fichier |  |
| `ptrace.tracee.parent.file.mode` | nombre entier | Mode/droits du fichier | Constantes du mode Chmod |
| `ptrace.tracee.parent.file.modification_time` | nombre entier | Date de modification du fichier |  |
| `ptrace.tracee.parent.file.mount_id` | nombre entier | ID de montage du fichier |  |
| `ptrace.tracee.parent.file.name` | chaîne | Basename du fichier |  |
| `ptrace.tracee.parent.file.name.length` | nombre entier | Longueur de la chaîne 'ptrace.tracee.parent.file.name' |  |
| `ptrace.tracee.parent.file.path` | chaîne | Chemin d'accès du fichier |  |
| `ptrace.tracee.parent.file.path.length` | nombre entier | Longueur de la chaîne 'ptrace.tracee.parent.file.path' |  |
| `ptrace.tracee.parent.file.rights` | nombre entier | Mode/droits du fichier | Constantes du mode Chmod |
| `ptrace.tracee.parent.file.uid` | nombre entier | UID du propriétaire du fichier |  |
| `ptrace.tracee.parent.file.user` | chaîne | Utilisateur du propriétaire du fichier |  |
| `ptrace.tracee.parent.fsgid` | nombre entier | GID du système de fichiers du processus |  |
| `ptrace.tracee.parent.fsgroup` | chaîne | Groupe du système de fichiers du processus |  |
| `ptrace.tracee.parent.fsuid` | nombre entier | UID du système de fichiers du processus |  |
| `ptrace.tracee.parent.fsuser` | chaîne | Utilisateur du système de fichiers du processus |  |
| `ptrace.tracee.parent.gid` | nombre entier | GID du processus |  |
| `ptrace.tracee.parent.group` | chaîne | Groupe du processus |  |
| `ptrace.tracee.parent.interpreter.file.change_time` | nombre entier | Date de modification du fichier |  |
| `ptrace.tracee.parent.interpreter.file.filesystem` | chaîne | Système de fichiers du fichier |  |
| `ptrace.tracee.parent.interpreter.file.gid` | nombre entier | GID du propriétaire du fichier |  |
| `ptrace.tracee.parent.interpreter.file.group` | chaîne | Groupe du propriétaire du fichier |  |
| `ptrace.tracee.parent.interpreter.file.in_upper_layer` | booléen | Indicateur de la couche de fichier, par exemple dans un OverlayFS |  |
| `ptrace.tracee.parent.interpreter.file.inode` | nombre entier | Inode du fichier |  |
| `ptrace.tracee.parent.interpreter.file.mode` | nombre entier | Mode/droits du fichier | Constantes du mode Chmod |
| `ptrace.tracee.parent.interpreter.file.modification_time` | nombre entier | Date de modification du fichier |  |
| `ptrace.tracee.parent.interpreter.file.mount_id` | nombre entier | ID de montage du fichier |  |
| `ptrace.tracee.parent.interpreter.file.name` | chaîne | Basename du fichier |  |
| `ptrace.tracee.parent.interpreter.file.name.length` | nombre entier | Longueur de la chaîne 'ptrace.tracee.parent.interpreter.file.name' |  |
| `ptrace.tracee.parent.interpreter.file.path` | chaîne | Chemin d'accès du fichier |  |
| `ptrace.tracee.parent.interpreter.file.path.length` | nombre entier | Longueur de la chaîne 'ptrace.tracee.parent.interpreter.file.path' |  |
| `ptrace.tracee.parent.interpreter.file.rights` | nombre entier | Mode/droits du fichier | Constantes du mode Chmod |
| `ptrace.tracee.parent.interpreter.file.uid` | nombre entier | UID du propriétaire du fichier |  |
| `ptrace.tracee.parent.interpreter.file.user` | chaîne | Utilisateur du propriétaire du fichier |  |
| `ptrace.tracee.parent.is_kworker` | booléen | Indique si le processus est un kworker |  |
| `ptrace.tracee.parent.is_thread` | booléen | Indique si le processus est considéré comme un thread (autrement dit, un processus enfant n'ayant pas exécuté un autre programme) |  |
| `ptrace.tracee.parent.pid` | nombre entier | Identifiant du processus (également appelé « identifiant du groupe de threads ») |  |
| `ptrace.tracee.parent.ppid` | nombre entier | ID du processus parent |  |
| `ptrace.tracee.parent.tid` | nombre entier | ID du thread |  |
| `ptrace.tracee.parent.tty_name` | chaîne | Nom du TTY associé au processus |  |
| `ptrace.tracee.parent.uid` | nombre entier | UID du processus |  |
| `ptrace.tracee.parent.user` | chaîne | Utilisateur du processus |  |
| `ptrace.tracee.pid` | nombre entier | Identifiant du processus (également appelé « identifiant du groupe de threads ») |  |
| `ptrace.tracee.ppid` | nombre entier | ID du processus parent |  |
| `ptrace.tracee.tid` | nombre entier | ID du thread |  |
| `ptrace.tracee.tty_name` | chaîne | Nom du TTY associé au processus |  |
| `ptrace.tracee.uid` | nombre entier | UID du processus |  |
| `ptrace.tracee.user` | chaîne | Utilisateur du processus |  |

### Événement `removexattr`

Entraîne la suppression des attributs étendus

| Propriété | Type | Définition | Constantes |
| -------- | ---- | ---------- | --------- |
| `removexattr.file.change_time` | nombre entier | Date de modification du fichier |  |
| `removexattr.file.destination.name` | chaîne | Nom de l'attribut étendu |  |
| `removexattr.file.destination.namespace` | chaîne | Espace de nommage de l'attribut étendu |  |
| `removexattr.file.filesystem` | chaîne | Système de fichiers du fichier |  |
| `removexattr.file.gid` | nombre entier | GID du propriétaire du fichier |  |
| `removexattr.file.group` | chaîne | Groupe du propriétaire du fichier |  |
| `removexattr.file.in_upper_layer` | booléen | Indicateur de la couche de fichier, par exemple dans un OverlayFS |  |
| `removexattr.file.inode` | nombre entier | Inode du fichier |  |
| `removexattr.file.mode` | nombre entier | Mode/droits du fichier | Constantes du mode Chmod |
| `removexattr.file.modification_time` | nombre entier | Date de modification du fichier |  |
| `removexattr.file.mount_id` | nombre entier | ID de montage du fichier |  |
| `removexattr.file.name` | chaîne | Basename du fichier |  |
| `removexattr.file.name.length` | nombre entier | Longueur de la chaîne 'removexattr.file.name' |  |
| `removexattr.file.path` | chaîne | Chemin d'accès du fichier |  |
| `removexattr.file.path.length` | nombre entier | Longueur de la chaîne 'removexattr.file.path' |  |
| `removexattr.file.rights` | nombre entier | Mode/droits du fichier | Constantes du mode Chmod |
| `removexattr.file.uid` | nombre entier | UID du propriétaire du fichier |  |
| `removexattr.file.user` | chaîne | Utilisateur du propriétaire du fichier |  |
| `removexattr.retval` | nombre entier | Valeur renvoyée de l'appel système | Constantes d'erreur |

### Événement `rename`

Un fichier/répertoire a été renommé

| Propriété | Type | Définition | Constantes |
| -------- | ---- | ---------- | --------- |
| `rename.file.change_time` | nombre entier | Date de modification du fichier |  |
| `rename.file.destination.change_time` | nombre entier | Date de modification du fichier |  |
| `rename.file.destination.filesystem` | chaîne | Système de fichiers du fichier |  |
| `rename.file.destination.gid` | nombre entier | GID du propriétaire du fichier |  |
| `rename.file.destination.group` | chaîne | Groupe du propriétaire du fichier |  |
| `rename.file.destination.in_upper_layer` | booléen | Indicateur de la couche de fichier, par exemple dans un OverlayFS |  |
| `rename.file.destination.inode` | nombre entier | Inode du fichier |  |
| `rename.file.destination.mode` | nombre entier | Mode/droits du fichier | Constantes du mode Chmod |
| `rename.file.destination.modification_time` | nombre entier | Date de modification du fichier |  |
| `rename.file.destination.mount_id` | nombre entier | ID de montage du fichier |  |
| `rename.file.destination.name` | chaîne | Basename du fichier |  |
| `rename.file.destination.name.length` | nombre entier | Longueur de la chaîne 'rename.file.destination.name' |  |
| `rename.file.destination.path` | chaîne | Chemin d'accès du fichier |  |
| `rename.file.destination.path.length` | nombre entier | Longueur de la chaîne 'rename.file.destination.path' |  |
| `rename.file.destination.rights` | nombre entier | Mode/droits du fichier | Constantes du mode Chmod |
| `rename.file.destination.uid` | nombre entier | UID du propriétaire du fichier |  |
| `rename.file.destination.user` | chaîne | Utilisateur du propriétaire du fichier |  |
| `rename.file.filesystem` | chaîne | Système de fichiers du fichier |  |
| `rename.file.gid` | nombre entier | GID du propriétaire du fichier |  |
| `rename.file.group` | chaîne | Groupe du propriétaire du fichier |  |
| `rename.file.in_upper_layer` | booléen | Indicateur de la couche de fichier, par exemple dans un OverlayFS |  |
| `rename.file.inode` | nombre entier | Inode du fichier |  |
| `rename.file.mode` | nombre entier | Mode/droits du fichier | Constantes du mode Chmod |
| `rename.file.modification_time` | nombre entier | Date de modification du fichier |  |
| `rename.file.mount_id` | nombre entier | ID de montage du fichier |  |
| `rename.file.name` | chaîne | Basename du fichier |  |
| `rename.file.name.length` | nombre entier | Longueur de la chaîne 'rename.file.name' |  |
| `rename.file.path` | chaîne | Chemin d'accès du fichier |  |
| `rename.file.path.length` | nombre entier | Longueur de la chaîne 'rename.file.path' |  |
| `rename.file.rights` | nombre entier | Mode/droits du fichier | Constantes du mode Chmod |
| `rename.file.uid` | nombre entier | UID du propriétaire du fichier |  |
| `rename.file.user` | chaîne | Utilisateur du propriétaire du fichier |  |
| `rename.retval` | nombre entier | Valeur renvoyée de l'appel système | Constantes d'erreur |

### Événement `rmdir`

Un répertoire a été supprimé

| Propriété | Type | Définition | Constantes |
| -------- | ---- | ---------- | --------- |
| `rmdir.file.change_time` | nombre entier | Date de modification du fichier |  |
| `rmdir.file.filesystem` | chaîne | Système de fichiers du fichier |  |
| `rmdir.file.gid` | nombre entier | GID du propriétaire du fichier |  |
| `rmdir.file.group` | chaîne | Groupe du propriétaire du fichier |  |
| `rmdir.file.in_upper_layer` | booléen | Indicateur de la couche de fichier, par exemple dans un OverlayFS |  |
| `rmdir.file.inode` | nombre entier | Inode du fichier |  |
| `rmdir.file.mode` | nombre entier | Mode/droits du fichier | Constantes du mode Chmod |
| `rmdir.file.modification_time` | nombre entier | Date de modification du fichier |  |
| `rmdir.file.mount_id` | nombre entier | ID de montage du fichier |  |
| `rmdir.file.name` | chaîne | Basename du fichier |  |
| `rmdir.file.name.length` | nombre entier | Longueur de la chaîne 'rmdir.file.name' |  |
| `rmdir.file.path` | chaîne | Chemin d'accès du fichier |  |
| `rmdir.file.path.length` | nombre entier | Longueur de la chaîne 'rmdir.file.path' |  |
| `rmdir.file.rights` | nombre entier | Mode/droits du fichier | Constantes du mode Chmod |
| `rmdir.file.uid` | nombre entier | UID du propriétaire du fichier |  |
| `rmdir.file.user` | chaîne | Utilisateur du propriétaire du fichier |  |
| `rmdir.retval` | nombre entier | Valeur renvoyée de l'appel système | Constantes d'erreur |

### Événement `selinux`

Une opération SELinux a été exécutée

| Propriété | Type | Définition | Constantes |
| -------- | ---- | ---------- | --------- |
| `selinux.bool.name` | chaîne | Nom du booléen SELinux |  |
| `selinux.bool.state` | chaîne | Nouvelle valeur du booléen SELinux |  |
| `selinux.bool_commit.state` | booléen | Indicateur d'une opération de commit du booléen SELinux |  |
| `selinux.enforce.status` | chaîne | Statut de l'application de SELinux ("enforcing", "permissive" ou "disabled") |  |

### Événement `setgid`

Un processus a modifié son GID effectif

| Propriété | Type | Définition | Constantes |
| -------- | ---- | ---------- | --------- |
| `setgid.egid` | nombre entier | Nouveau GID effectif du processus |  |
| `setgid.egroup` | chaîne | Nouveau groupe effectif du processus |  |
| `setgid.fsgid` | nombre entier | Nouveau GID du système de fichiers du processus |  |
| `setgid.fsgroup` | chaîne | Nouveau groupe du système de fichiers du processus |  |
| `setgid.gid` | nombre entier | Nouveau GID du processus |  |
| `setgid.group` | chaîne | Nouveau groupe du processus |  |

### Événement `setuid`

Un processus a modifié son UID effectif

| Propriété | Type | Définition | Constantes |
| -------- | ---- | ---------- | --------- |
| `setuid.euid` | nombre entier | Nouvel UID effectif du processus |  |
| `setuid.euser` | chaîne | Nouvel utilisateur effectif du processus |  |
| `setuid.fsuid` | nombre entier | Nouvel UID du système de fichiers du processus |  |
| `setuid.fsuser` | chaîne | Nouvel utilisateur du système de fichiers du processus |  |
| `setuid.uid` | nombre entier | Nouvel UID du processus |  |
| `setuid.user` | chaîne | Nouvel utilisateur du processus |  |

### Événement `setxattr`

Des attributs étendus ont été définis

| Propriété | Type | Définition | Constantes |
| -------- | ---- | ---------- | --------- |
| `setxattr.file.change_time` | nombre entier | Date de modification du fichier |  |
| `setxattr.file.destination.name` | chaîne | Nom de l'attribut étendu |  |
| `setxattr.file.destination.namespace` | chaîne | Espace de nommage de l'attribut étendu |  |
| `setxattr.file.filesystem` | chaîne | Système de fichiers du fichier |  |
| `setxattr.file.gid` | nombre entier | GID du propriétaire du fichier |  |
| `setxattr.file.group` | chaîne | Groupe du propriétaire du fichier |  |
| `setxattr.file.in_upper_layer` | booléen | Indicateur de la couche de fichier, par exemple dans un OverlayFS |  |
| `setxattr.file.inode` | nombre entier | Inode du fichier |  |
| `setxattr.file.mode` | nombre entier | Mode/droits du fichier | Constantes du mode Chmod |
| `setxattr.file.modification_time` | nombre entier | Date de modification du fichier |  |
| `setxattr.file.mount_id` | nombre entier | ID de montage du fichier |  |
| `setxattr.file.name` | chaîne | Basename du fichier |  |
| `setxattr.file.name.length` | nombre entier | Longueur de la chaîne 'setxattr.file.name' |  |
| `setxattr.file.path` | chaîne | Chemin d'accès du fichier |  |
| `setxattr.file.path.length` | nombre entier | Longueur de la chaîne 'setxattr.file.path' |  |
| `setxattr.file.rights` | nombre entier | Mode/droits du fichier | Constantes du mode Chmod |
| `setxattr.file.uid` | nombre entier | UID du propriétaire du fichier |  |
| `setxattr.file.user` | chaîne | Utilisateur du propriétaire du fichier |  |
| `setxattr.retval` | nombre entier | Valeur renvoyée de l'appel système | Constantes d'erreur |

### Événement `signal`

Un signal a été envoyé

| Propriété | Type | Définition | Constantes |
| -------- | ---- | ---------- | --------- |
| `signal.pid` | nombre entier | PID cible |  |
| `signal.retval` | nombre entier | Valeur renvoyée de l'appel système | Constantes d'erreur |
| `signal.target.ancestors.args` | chaîne | Arguments du processus (sous forme de chaîne) |  |
| `signal.target.ancestors.args_flags` | chaîne | Arguments du processus (sous forme de tableau) |  |
| `signal.target.ancestors.args_options` | chaîne | Arguments du processus (sous forme de tableau) |  |
| `signal.target.ancestors.args_truncated` | booléen | Indicateur d'arguments tronqués |  |
| `signal.target.ancestors.argv` | chaîne | Arguments du processus (sous forme de tableau) |  |
| `signal.target.ancestors.argv0` | chaîne | Premier argument du processus |  |
| `signal.target.ancestors.cap_effective` | nombre entier | Ensemble de capacités effectives du processus | Constantes des capacités de kernel |
| `signal.target.ancestors.cap_permitted` | nombre entier | Ensemble de capacités autorisées du processus | Constantes des capacités de kernel |
| `signal.target.ancestors.comm` | chaîne | Attribut comm du processus |  |
| `signal.target.ancestors.container.id` | chaîne | ID du conteneur |  |
| `signal.target.ancestors.cookie` | nombre entier | Cookie du processus |  |
| `signal.target.ancestors.created_at` | nombre entier | Timestamp de création du processus |  |
| `signal.target.ancestors.egid` | nombre entier | GID effectif du processus |  |
| `signal.target.ancestors.egroup` | chaîne | Groupe effectif du processus |  |
| `signal.target.ancestors.envp` | chaîne | Variables d'environnement du processus |  |
| `signal.target.ancestors.envs` | chaîne | Noms des variables d'environnement du processus |  |
| `signal.target.ancestors.envs_truncated` | booléen | Indicateur de variables d'environnement tronquées |  |
| `signal.target.ancestors.euid` | nombre entier | UID effectif du processus |  |
| `signal.target.ancestors.euser` | chaîne | Utilisateur effectif du processus |  |
| `signal.target.ancestors.file.change_time` | nombre entier | Date de modification du fichier |  |
| `signal.target.ancestors.file.filesystem` | chaîne | Système de fichiers du fichier |  |
| `signal.target.ancestors.file.gid` | nombre entier | GID du propriétaire du fichier |  |
| `signal.target.ancestors.file.group` | chaîne | Groupe du propriétaire du fichier |  |
| `signal.target.ancestors.file.in_upper_layer` | booléen | Indicateur de la couche de fichier, par exemple dans un OverlayFS |  |
| `signal.target.ancestors.file.inode` | nombre entier | Inode du fichier |  |
| `signal.target.ancestors.file.mode` | nombre entier | Mode/droits du fichier | Constantes du mode Chmod |
| `signal.target.ancestors.file.modification_time` | nombre entier | Date de modification du fichier |  |
| `signal.target.ancestors.file.mount_id` | nombre entier | ID de montage du fichier |  |
| `signal.target.ancestors.file.name` | chaîne | Basename du fichier |  |
| `signal.target.ancestors.file.name.length` | nombre entier | Longueur de la chaîne 'signal.target.ancestors.file.name' |  |
| `signal.target.ancestors.file.path` | chaîne | Chemin d'accès du fichier |  |
| `signal.target.ancestors.file.path.length` | nombre entier | Longueur de la chaîne 'signal.target.ancestors.file.path' |  |
| `signal.target.ancestors.file.rights` | nombre entier | Mode/droits du fichier | Constantes du mode Chmod |
| `signal.target.ancestors.file.uid` | nombre entier | UID du propriétaire du fichier |  |
| `signal.target.ancestors.file.user` | chaîne | Utilisateur du propriétaire du fichier |  |
| `signal.target.ancestors.fsgid` | nombre entier | GID du système de fichiers du processus |  |
| `signal.target.ancestors.fsgroup` | chaîne | Groupe du système de fichiers du processus |  |
| `signal.target.ancestors.fsuid` | nombre entier | UID du système de fichiers du processus |  |
| `signal.target.ancestors.fsuser` | chaîne | Utilisateur du système de fichiers du processus |  |
| `signal.target.ancestors.gid` | nombre entier | GID du processus |  |
| `signal.target.ancestors.group` | chaîne | Groupe du processus |  |
| `signal.target.ancestors.interpreter.file.change_time` | nombre entier | Date de modification du fichier |  |
| `signal.target.ancestors.interpreter.file.filesystem` | chaîne | Système de fichiers du fichier |  |
| `signal.target.ancestors.interpreter.file.gid` | nombre entier | GID du propriétaire du fichier |  |
| `signal.target.ancestors.interpreter.file.group` | chaîne | Groupe du propriétaire du fichier |  |
| `signal.target.ancestors.interpreter.file.in_upper_layer` | booléen | Indicateur de la couche de fichier, par exemple dans un OverlayFS |  |
| `signal.target.ancestors.interpreter.file.inode` | nombre entier | Inode du fichier |  |
| `signal.target.ancestors.interpreter.file.mode` | nombre entier | Mode/droits du fichier | Constantes du mode Chmod |
| `signal.target.ancestors.interpreter.file.modification_time` | nombre entier | Date de modification du fichier |  |
| `signal.target.ancestors.interpreter.file.mount_id` | nombre entier | ID de montage du fichier |  |
| `signal.target.ancestors.interpreter.file.name` | chaîne | Basename du fichier |  |
| `signal.target.ancestors.interpreter.file.name.length` | nombre entier | Longueur de la chaîne 'signal.target.ancestors.interpreter.file.name' |  |
| `signal.target.ancestors.interpreter.file.path` | chaîne | Chemin d'accès du fichier |  |
| `signal.target.ancestors.interpreter.file.path.length` | nombre entier | Longueur de la chaîne 'signal.target.ancestors.interpreter.file.path' |  |
| `signal.target.ancestors.interpreter.file.rights` | nombre entier | Mode/droits du fichier | Constantes du mode Chmod |
| `signal.target.ancestors.interpreter.file.uid` | nombre entier | UID du propriétaire du fichier |  |
| `signal.target.ancestors.interpreter.file.user` | chaîne | Utilisateur du propriétaire du fichier |  |
| `signal.target.ancestors.is_kworker` | booléen | Indique si le processus est un kworker |  |
| `signal.target.ancestors.is_thread` | booléen | Indique si le processus est considéré comme un thread (autrement dit, un processus enfant n'ayant pas exécuté un autre programme) |  |
| `signal.target.ancestors.pid` | nombre entier | Identifiant du processus (également appelé « identifiant du groupe de threads ») |  |
| `signal.target.ancestors.ppid` | nombre entier | ID du processus parent |  |
| `signal.target.ancestors.tid` | nombre entier | ID du thread |  |
| `signal.target.ancestors.tty_name` | chaîne | Nom du TTY associé au processus |  |
| `signal.target.ancestors.uid` | nombre entier | UID du processus |  |
| `signal.target.ancestors.user` | chaîne | Utilisateur du processus |  |
| `signal.target.args` | chaîne | Arguments du processus (sous forme de chaîne) |  |
| `signal.target.args_flags` | chaîne | Arguments du processus (sous forme de tableau) |  |
| `signal.target.args_options` | chaîne | Arguments du processus (sous forme de tableau) |  |
| `signal.target.args_truncated` | booléen | Indicateur d'arguments tronqués |  |
| `signal.target.argv` | chaîne | Arguments du processus (sous forme de tableau) |  |
| `signal.target.argv0` | chaîne | Premier argument du processus |  |
| `signal.target.cap_effective` | nombre entier | Ensemble de capacités effectives du processus | Constantes des capacités de kernel |
| `signal.target.cap_permitted` | nombre entier | Ensemble de capacités autorisées du processus | Constantes des capacités de kernel |
| `signal.target.comm` | chaîne | Attribut comm du processus |  |
| `signal.target.container.id` | chaîne | ID du conteneur |  |
| `signal.target.cookie` | nombre entier | Cookie du processus |  |
| `signal.target.created_at` | nombre entier | Timestamp de création du processus |  |
| `signal.target.egid` | nombre entier | GID effectif du processus |  |
| `signal.target.egroup` | chaîne | Groupe effectif du processus |  |
| `signal.target.envp` | chaîne | Variables d'environnement du processus |  |
| `signal.target.envs` | chaîne | Noms des variables d'environnement du processus |  |
| `signal.target.envs_truncated` | booléen | Indicateur de variables d'environnement tronquées |  |
| `signal.target.euid` | nombre entier | UID effectif du processus |  |
| `signal.target.euser` | chaîne | Utilisateur effectif du processus |  |
| `signal.target.file.change_time` | nombre entier | Date de modification du fichier |  |
| `signal.target.file.filesystem` | chaîne | Système de fichiers du fichier |  |
| `signal.target.file.gid` | nombre entier | GID du propriétaire du fichier |  |
| `signal.target.file.group` | chaîne | Groupe du propriétaire du fichier |  |
| `signal.target.file.in_upper_layer` | booléen | Indicateur de la couche de fichier, par exemple dans un OverlayFS |  |
| `signal.target.file.inode` | nombre entier | Inode du fichier |  |
| `signal.target.file.mode` | nombre entier | Mode/droits du fichier | Constantes du mode Chmod |
| `signal.target.file.modification_time` | nombre entier | Date de modification du fichier |  |
| `signal.target.file.mount_id` | nombre entier | ID de montage du fichier |  |
| `signal.target.file.name` | chaîne | Basename du fichier |  |
| `signal.target.file.name.length` | nombre entier | Longueur de la chaîne 'signal.target.file.name' |  |
| `signal.target.file.path` | chaîne | Chemin d'accès du fichier |  |
| `signal.target.file.path.length` | nombre entier | Longueur de la chaîne 'signal.target.file.path' |  |
| `signal.target.file.rights` | nombre entier | Mode/droits du fichier | Constantes du mode Chmod |
| `signal.target.file.uid` | nombre entier | UID du propriétaire du fichier |  |
| `signal.target.file.user` | chaîne | Utilisateur du propriétaire du fichier |  |
| `signal.target.fsgid` | nombre entier | GID du système de fichiers du processus |  |
| `signal.target.fsgroup` | chaîne | Groupe du système de fichiers du processus |  |
| `signal.target.fsuid` | nombre entier | UID du système de fichiers du processus |  |
| `signal.target.fsuser` | chaîne | Utilisateur du système de fichiers du processus |  |
| `signal.target.gid` | nombre entier | GID du processus |  |
| `signal.target.group` | chaîne | Groupe du processus |  |
| `signal.target.interpreter.file.change_time` | nombre entier | Date de modification du fichier |  |
| `signal.target.interpreter.file.filesystem` | chaîne | Système de fichiers du fichier |  |
| `signal.target.interpreter.file.gid` | nombre entier | GID du propriétaire du fichier |  |
| `signal.target.interpreter.file.group` | chaîne | Groupe du propriétaire du fichier |  |
| `signal.target.interpreter.file.in_upper_layer` | booléen | Indicateur de la couche de fichier, par exemple dans un OverlayFS |  |
| `signal.target.interpreter.file.inode` | nombre entier | Inode du fichier |  |
| `signal.target.interpreter.file.mode` | nombre entier | Mode/droits du fichier | Constantes du mode Chmod |
| `signal.target.interpreter.file.modification_time` | nombre entier | Date de modification du fichier |  |
| `signal.target.interpreter.file.mount_id` | nombre entier | ID de montage du fichier |  |
| `signal.target.interpreter.file.name` | chaîne | Basename du fichier |  |
| `signal.target.interpreter.file.name.length` | nombre entier | Longueur de la chaîne 'signal.target.interpreter.file.name' |  |
| `signal.target.interpreter.file.path` | chaîne | Chemin d'accès du fichier |  |
| `signal.target.interpreter.file.path.length` | nombre entier | Longueur de la chaîne 'signal.target.interpreter.file.path' |  |
| `signal.target.interpreter.file.rights` | nombre entier | Mode/droits du fichier | Constantes du mode Chmod |
| `signal.target.interpreter.file.uid` | nombre entier | UID du propriétaire du fichier |  |
| `signal.target.interpreter.file.user` | chaîne | Utilisateur du propriétaire du fichier |  |
| `signal.target.is_kworker` | booléen | Indique si le processus est un kworker |  |
| `signal.target.is_thread` | booléen | Indique si le processus est considéré comme un thread (autrement dit, un processus enfant n'ayant pas exécuté un autre programme) |  |
| `signal.target.parent.args` | chaîne | Arguments du processus (sous forme de chaîne) |  |
| `signal.target.parent.args_flags` | chaîne | Arguments du processus (sous forme de tableau) |  |
| `signal.target.parent.args_options` | chaîne | Arguments du processus (sous forme de tableau) |  |
| `signal.target.parent.args_truncated` | booléen | Indicateur d'arguments tronqués |  |
| `signal.target.parent.argv` | chaîne | Arguments du processus (sous forme de tableau) |  |
| `signal.target.parent.argv0` | chaîne | Premier argument du processus |  |
| `signal.target.parent.cap_effective` | nombre entier | Ensemble de capacités effectives du processus | Constantes des capacités de kernel |
| `signal.target.parent.cap_permitted` | nombre entier | Ensemble de capacités autorisées du processus | Constantes des capacités de kernel |
| `signal.target.parent.comm` | chaîne | Attribut comm du processus |  |
| `signal.target.parent.container.id` | chaîne | ID du conteneur |  |
| `signal.target.parent.cookie` | nombre entier | Cookie du processus |  |
| `signal.target.parent.created_at` | nombre entier | Timestamp de création du processus |  |
| `signal.target.parent.egid` | nombre entier | GID effectif du processus |  |
| `signal.target.parent.egroup` | chaîne | Groupe effectif du processus |  |
| `signal.target.parent.envp` | chaîne | Variables d'environnement du processus |  |
| `signal.target.parent.envs` | chaîne | Noms des variables d'environnement du processus |  |
| `signal.target.parent.envs_truncated` | booléen | Indicateur de variables d'environnement tronquées |  |
| `signal.target.parent.euid` | nombre entier | UID effectif du processus |  |
| `signal.target.parent.euser` | chaîne | Utilisateur effectif du processus |  |
| `signal.target.parent.file.change_time` | nombre entier | Date de modification du fichier |  |
| `signal.target.parent.file.filesystem` | chaîne | Système de fichiers du fichier |  |
| `signal.target.parent.file.gid` | nombre entier | GID du propriétaire du fichier |  |
| `signal.target.parent.file.group` | chaîne | Groupe du propriétaire du fichier |  |
| `signal.target.parent.file.in_upper_layer` | booléen | Indicateur de la couche de fichier, par exemple dans un OverlayFS |  |
| `signal.target.parent.file.inode` | nombre entier | Inode du fichier |  |
| `signal.target.parent.file.mode` | nombre entier | Mode/droits du fichier | Constantes du mode Chmod |
| `signal.target.parent.file.modification_time` | nombre entier | Date de modification du fichier |  |
| `signal.target.parent.file.mount_id` | nombre entier | ID de montage du fichier |  |
| `signal.target.parent.file.name` | chaîne | Basename du fichier |  |
| `signal.target.parent.file.name.length` | nombre entier | Longueur de la chaîne 'signal.target.parent.file.name' |  |
| `signal.target.parent.file.path` | chaîne | Chemin d'accès du fichier |  |
| `signal.target.parent.file.path.length` | nombre entier | Longueur de la chaîne 'signal.target.parent.file.path' |  |
| `signal.target.parent.file.rights` | nombre entier | Mode/droits du fichier | Constantes du mode Chmod |
| `signal.target.parent.file.uid` | nombre entier | UID du propriétaire du fichier |  |
| `signal.target.parent.file.user` | chaîne | Utilisateur du propriétaire du fichier |  |
| `signal.target.parent.fsgid` | nombre entier | GID du système de fichiers du processus |  |
| `signal.target.parent.fsgroup` | chaîne | Groupe du système de fichiers du processus |  |
| `signal.target.parent.fsuid` | nombre entier | UID du système de fichiers du processus |  |
| `signal.target.parent.fsuser` | chaîne | Utilisateur du système de fichiers du processus |  |
| `signal.target.parent.gid` | nombre entier | GID du processus |  |
| `signal.target.parent.group` | chaîne | Groupe du processus |  |
| `signal.target.parent.interpreter.file.change_time` | nombre entier | Date de modification du fichier |  |
| `signal.target.parent.interpreter.file.filesystem` | chaîne | Système de fichiers du fichier |  |
| `signal.target.parent.interpreter.file.gid` | nombre entier | GID du propriétaire du fichier |  |
| `signal.target.parent.interpreter.file.group` | chaîne | Groupe du propriétaire du fichier |  |
| `signal.target.parent.interpreter.file.in_upper_layer` | booléen | Indicateur de la couche de fichier, par exemple dans un OverlayFS |  |
| `signal.target.parent.interpreter.file.inode` | nombre entier | Inode du fichier |  |
| `signal.target.parent.interpreter.file.mode` | nombre entier | Mode/droits du fichier | Constantes du mode Chmod |
| `signal.target.parent.interpreter.file.modification_time` | nombre entier | Date de modification du fichier |  |
| `signal.target.parent.interpreter.file.mount_id` | nombre entier | ID de montage du fichier |  |
| `signal.target.parent.interpreter.file.name` | chaîne | Basename du fichier |  |
| `signal.target.parent.interpreter.file.name.length` | nombre entier | Longueur de la chaîne 'signal.target.parent.interpreter.file.name' |  |
| `signal.target.parent.interpreter.file.path` | chaîne | Chemin d'accès du fichier |  |
| `signal.target.parent.interpreter.file.path.length` | nombre entier | Longueur de la chaîne 'signal.target.parent.interpreter.file.path' |  |
| `signal.target.parent.interpreter.file.rights` | nombre entier | Mode/droits du fichier | Constantes du mode Chmod |
| `signal.target.parent.interpreter.file.uid` | nombre entier | UID du propriétaire du fichier |  |
| `signal.target.parent.interpreter.file.user` | chaîne | Utilisateur du propriétaire du fichier |  |
| `signal.target.parent.is_kworker` | booléen | Indique si le processus est un kworker |  |
| `signal.target.parent.is_thread` | booléen | Indique si le processus est considéré comme un thread (autrement dit, un processus enfant n'ayant pas exécuté un autre programme) |  |
| `signal.target.parent.pid` | nombre entier | Identifiant du processus (également appelé « identifiant du groupe de threads ») |  |
| `signal.target.parent.ppid` | nombre entier | ID du processus parent |  |
| `signal.target.parent.tid` | nombre entier | ID du thread |  |
| `signal.target.parent.tty_name` | chaîne | Nom du TTY associé au processus |  |
| `signal.target.parent.uid` | nombre entier | UID du processus |  |
| `signal.target.parent.user` | chaîne | Utilisateur du processus |  |
| `signal.target.pid` | nombre entier | Identifiant du processus (également appelé « identifiant du groupe de threads ») |  |
| `signal.target.ppid` | nombre entier | ID du processus parent |  |
| `signal.target.tid` | nombre entier | ID du thread |  |
| `signal.target.tty_name` | chaîne | Nom du TTY associé au processus |  |
| `signal.target.uid` | nombre entier | UID du processus |  |
| `signal.target.user` | chaîne | Utilisateur du processus |  |
| `signal.type` | nombre entier | Type de signal (p. ex., SIGHUP, SIGINT, SIGQUIT, etc.) | Constantes de signal |

### Événement `splice`

Une commande splice a été exécutée

| Propriété | Type | Définition | Constantes |
| -------- | ---- | ---------- | --------- |
| `splice.file.change_time` | nombre entier | Date de modification du fichier |  |
| `splice.file.filesystem` | chaîne | Système de fichiers du fichier |  |
| `splice.file.gid` | nombre entier | GID du propriétaire du fichier |  |
| `splice.file.group` | chaîne | Groupe du propriétaire du fichier |  |
| `splice.file.in_upper_layer` | booléen | Indicateur de la couche de fichier, par exemple dans un OverlayFS |  |
| `splice.file.inode` | nombre entier | Inode du fichier |  |
| `splice.file.mode` | nombre entier | Mode/droits du fichier | Constantes du mode Chmod |
| `splice.file.modification_time` | nombre entier | Date de modification du fichier |  |
| `splice.file.mount_id` | nombre entier | ID de montage du fichier |  |
| `splice.file.name` | chaîne | Basename du fichier |  |
| `splice.file.name.length` | nombre entier | Longueur de la chaîne 'splice.file.name' |  |
| `splice.file.path` | chaîne | Chemin d'accès du fichier |  |
| `splice.file.path.length` | nombre entier | Longueur de la chaîne 'splice.file.path' |  |
| `splice.file.rights` | nombre entier | Mode/droits du fichier | Constantes du mode Chmod |
| `splice.file.uid` | nombre entier | UID du propriétaire du fichier |  |
| `splice.file.user` | chaîne | Utilisateur du propriétaire du fichier |  |
| `splice.pipe_entry_flag` | nombre entier | Flag d'entrée du canal « fd_out » transmis à l'appel système splice | Flags du buffer du canal |
| `splice.pipe_exit_flag` | nombre entier | Flag de sortie du canal « fd_out » transmis à l'appel système splice | Flags du buffer du canal |
| `splice.retval` | nombre entier | Valeur renvoyée de l'appel système | Constantes d'erreur |

### Événement `unlink`

Un fichier a été supprimé

| Propriété | Type | Définition | Constantes |
| -------- | ---- | ---------- | --------- |
| `unlink.file.change_time` | nombre entier | Date de modification du fichier |  |
| `unlink.file.filesystem` | chaîne | Système de fichiers du fichier |  |
| `unlink.file.gid` | nombre entier | GID du propriétaire du fichier |  |
| `unlink.file.group` | chaîne | Groupe du propriétaire du fichier |  |
| `unlink.file.in_upper_layer` | booléen | Indicateur de la couche de fichier, par exemple dans un OverlayFS |  |
| `unlink.file.inode` | nombre entier | Inode du fichier |  |
| `unlink.file.mode` | nombre entier | Mode/droits du fichier | Constantes du mode Chmod |
| `unlink.file.modification_time` | nombre entier | Date de modification du fichier |  |
| `unlink.file.mount_id` | nombre entier | ID de montage du fichier |  |
| `unlink.file.name` | chaîne | Basename du fichier |  |
| `unlink.file.name.length` | nombre entier | Longueur de la chaîne 'unlink.file.name' |  |
| `unlink.file.path` | chaîne | Chemin d'accès du fichier |  |
| `unlink.file.path.length` | nombre entier | Longueur de la chaîne 'unlink.file.path' |  |
| `unlink.file.rights` | nombre entier | Mode/droits du fichier | Constantes du mode Chmod |
| `unlink.file.uid` | nombre entier | UID du propriétaire du fichier |  |
| `unlink.file.user` | chaîne | Utilisateur du propriétaire du fichier |  |
| `unlink.flags` | nombre entier |  | Flags unlink |
| `unlink.retval` | nombre entier | Valeur renvoyée de l'appel système | Constantes d'erreur |

### Événement `unload_module`

Un module kernel a été supprimé

| Propriété | Type | Définition | Constantes |
| -------- | ---- | ---------- | --------- |
| `unload_module.name` | chaîne | Nom du module kernel ayant été supprimé |  |
| `unload_module.retval` | nombre entier | Valeur renvoyée de l'appel système | Constantes d'erreur |

### Événement `utimes`

Dates d'accès/de modification du fichier

| Propriété | Type | Définition | Constantes |
| -------- | ---- | ---------- | --------- |
| `utimes.file.change_time` | nombre entier | Date de modification du fichier |  |
| `utimes.file.filesystem` | chaîne | Système de fichiers du fichier |  |
| `utimes.file.gid` | nombre entier | GID du propriétaire du fichier |  |
| `utimes.file.group` | chaîne | Groupe du propriétaire du fichier |  |
| `utimes.file.in_upper_layer` | booléen | Indicateur de la couche de fichier, par exemple dans un OverlayFS |  |
| `utimes.file.inode` | nombre entier | Inode du fichier |  |
| `utimes.file.mode` | nombre entier | Mode/droits du fichier | Constantes du mode Chmod |
| `utimes.file.modification_time` | nombre entier | Date de modification du fichier |  |
| `utimes.file.mount_id` | nombre entier | ID de montage du fichier |  |
| `utimes.file.name` | chaîne | Basename du fichier |  |
| `utimes.file.name.length` | nombre entier | Longueur de la chaîne 'utimes.file.name' |  |
| `utimes.file.path` | chaîne | Chemin d'accès du fichier |  |
| `utimes.file.path.length` | nombre entier | Longueur de la chaîne 'utimes.file.path' |  |
| `utimes.file.rights` | nombre entier | Mode/droits du fichier | Constantes du mode Chmod |
| `utimes.file.uid` | nombre entier | UID du propriétaire du fichier |  |
| `utimes.file.user` | chaîne | Utilisateur du propriétaire du fichier |  |
| `utimes.retval` | nombre entier | Valeur renvoyée de l'appel système | Constantes d'erreur |


## Constantes

Les constantes sont utilisées pour améliorer la lisibilité de vos règles. Certaines sont communes à toutes les architectures et d'autres sont propres à des architectures spécifiques.

### `Types d'association BPF`

Ces constantes correspondent aux types d'association du programme eBPF pris en charge.

| Name | Architectures |
| ---- |---------------|
| `BPF_CGROUP_INET_INGRESS` | Toutes |
| `BPF_CGROUP_INET_EGRESS` | Toutes |
| `BPF_CGROUP_INET_SOCK_CREATE` | Toutes |
| `BPF_CGROUP_SOCK_OPS` | Toutes |
| `BPF_SK_SKB_STREAM_PARSER` | Toutes |
| `BPF_SK_SKB_STREAM_VERDICT` | Toutes |
| `BPF_CGROUP_DEVICE` | Toutes |
| `BPF_SK_MSG_VERDICT` | Toutes |
| `BPF_CGROUP_INET4_BIND` | Toutes |
| `BPF_CGROUP_INET6_BIND` | Toutes |
| `BPF_CGROUP_INET4_CONNECT` | Toutes |
| `BPF_CGROUP_INET6_CONNECT` | Toutes |
| `BPF_CGROUP_INET4_POST_BIND` | Toutes |
| `BPF_CGROUP_INET6_POST_BIND` | Toutes |
| `BPF_CGROUP_UDP4_SENDMSG` | Toutes |
| `BPF_CGROUP_UDP6_SENDMSG` | Toutes |
| `BPF_LIRC_MODE2` | Toutes |
| `BPF_FLOW_DISSECTOR` | Toutes |
| `BPF_CGROUP_SYSCTL` | Toutes |
| `BPF_CGROUP_UDP4_RECVMSG` | Toutes |
| `BPF_CGROUP_UDP6_RECVMSG` | Toutes |
| `BPF_CGROUP_GETSOCKOPT` | Toutes |
| `BPF_CGROUP_SETSOCKOPT` | Toutes |
| `BPF_TRACE_RAW_TP` | Toutes |
| `BPF_TRACE_FENTRY` | Toutes |
| `BPF_TRACE_FEXIT` | Toutes |
| `BPF_MODIFY_RETURN` | Toutes |
| `BPF_LSM_MAC` | Toutes |
| `BPF_TRACE_ITER` | Toutes |
| `BPF_CGROUP_INET4_GETPEERNAME` | Toutes |
| `BPF_CGROUP_INET6_GETPEERNAME` | Toutes |
| `BPF_CGROUP_INET4_GETSOCKNAME` | Toutes |
| `BPF_CGROUP_INET6_GETSOCKNAME` | Toutes |
| `BPF_XDP_DEVMAP` | Toutes |
| `BPF_CGROUP_INET_SOCK_RELEASE` | Toutes |
| `BPF_XDP_CPUMAP` | Toutes |
| `BPF_SK_LOOKUP` | Toutes |
| `BPF_XDP` | Toutes |
| `BPF_SK_SKB_VERDICT` | Toutes |

### `Commandes BPF`

Ces constantes sont utilisées pour spécifier une commande vers un appel système bpf.

| Name | Architectures |
| ---- |---------------|
| `BPF_MAP_CREATE` | Toutes |
| `BPF_MAP_LOOKUP_ELEM` | Toutes |
| `BPF_MAP_UPDATE_ELEM` | Toutes |
| `BPF_MAP_DELETE_ELEM` | Toutes |
| `BPF_MAP_GET_NEXT_KEY` | Toutes |
| `BPF_PROG_LOAD` | Toutes |
| `BPF_OBJ_PIN` | Toutes |
| `BPF_OBJ_GET` | Toutes |
| `BPF_PROG_ATTACH` | Toutes |
| `BPF_PROG_DETACH` | Toutes |
| `BPF_PROG_TEST_RUN` | Toutes |
| `BPF_PROG_RUN` | Toutes |
| `BPF_PROG_GET_NEXT_ID` | Toutes |
| `BPF_MAP_GET_NEXT_ID` | Toutes |
| `BPF_PROG_GET_FD_BY_ID` | Toutes |
| `BPF_MAP_GET_FD_BY_ID` | Toutes |
| `BPF_OBJ_GET_INFO_BY_FD` | Toutes |
| `BPF_PROG_QUERY` | Toutes |
| `BPF_RAW_TRACEPOINT_OPEN` | Toutes |
| `BPF_BTF_LOAD` | Toutes |
| `BPF_BTF_GET_FD_BY_ID` | Toutes |
| `BPF_TASK_FD_QUERY` | Toutes |
| `BPF_MAP_LOOKUP_AND_DELETE_ELEM` | Toutes |
| `BPF_MAP_FREEZE` | Toutes |
| `BPF_BTF_GET_NEXT_ID` | Toutes |
| `BPF_MAP_LOOKUP_BATCH` | Toutes |
| `BPF_MAP_LOOKUP_AND_DELETE_BATCH` | Toutes |
| `BPF_MAP_UPDATE_BATCH` | Toutes |
| `BPF_MAP_DELETE_BATCH` | Toutes |
| `BPF_LINK_CREATE` | Toutes |
| `BPF_LINK_UPDATE` | Toutes |
| `BPF_LINK_GET_FD_BY_ID` | Toutes |
| `BPF_LINK_GET_NEXT_ID` | Toutes |
| `BPF_ENABLE_STATS` | Toutes |
| `BPF_ITER_CREATE` | Toutes |
| `BPF_LINK_DETACH` | Toutes |
| `BPF_PROG_BIND_MAP` | Toutes |

### `Fonctions des auxiliaires BPF`

Ces constantes correspondent aux fonctions des auxiliaires BPF prises en charge.

| Name | Architectures |
| ---- |---------------|
| `BPF_UNSPEC` | Toutes |
| `BPF_MAP_LOOKUP_ELEM` | Toutes |
| `BPF_MAP_UPDATE_ELEM` | Toutes |
| `BPF_MAP_DELETE_ELEM` | Toutes |
| `BPF_PROBE_READ` | Toutes |
| `BPF_KTIME_GET_NS` | Toutes |
| `BPF_TRACE_PRINTK` | Toutes |
| `BPF_GET_PRANDOM_U32` | Toutes |
| `BPF_GET_SMP_PROCESSOR_ID` | Toutes |
| `BPF_SKB_STORE_BYTES` | Toutes |
| `BPF_L3_CSUM_REPLACE` | Toutes |
| `BPF_L4_CSUM_REPLACE` | Toutes |
| `BPF_TAIL_CALL` | Toutes |
| `BPF_CLONE_REDIRECT` | Toutes |
| `BPF_GET_CURRENT_PID_TGID` | Toutes |
| `BPF_GET_CURRENT_UID_GID` | Toutes |
| `BPF_GET_CURRENT_COMM` | Toutes |
| `BPF_GET_CGROUP_CLASSID` | Toutes |
| `BPF_SKB_VLAN_PUSH` | Toutes |
| `BPF_SKB_VLAN_POP` | Toutes |
| `BPF_SKB_GET_TUNNEL_KEY` | Toutes |
| `BPF_SKB_SET_TUNNEL_KEY` | Toutes |
| `BPF_PERF_EVENT_READ` | Toutes |
| `BPF_REDIRECT` | Toutes |
| `BPF_GET_ROUTE_REALM` | Toutes |
| `BPF_PERF_EVENT_OUTPUT` | Toutes |
| `BPF_SKB_LOAD_BYTES` | Toutes |
| `BPF_GET_STACKID` | Toutes |
| `BPF_CSUM_DIFF` | Toutes |
| `BPF_SKB_GET_TUNNEL_OPT` | Toutes |
| `BPF_SKB_SET_TUNNEL_OPT` | Toutes |
| `BPF_SKB_CHANGE_PROTO` | Toutes |
| `BPF_SKB_CHANGE_TYPE` | Toutes |
| `BPF_SKB_UNDER_CGROUP` | Toutes |
| `BPF_GET_HASH_RECALC` | Toutes |
| `BPF_GET_CURRENT_TASK` | Toutes |
| `BPF_PROBE_WRITE_USER` | Toutes |
| `BPF_CURRENT_TASK_UNDER_CGROUP` | Toutes |
| `BPF_SKB_CHANGE_TAIL` | Toutes |
| `BPF_SKB_PULL_DATA` | Toutes |
| `BPF_CSUM_UPDATE` | Toutes |
| `BPF_SET_HASH_INVALID` | Toutes |
| `BPF_GET_NUMA_NODE_ID` | Toutes |
| `BPF_SKB_CHANGE_HEAD` | Toutes |
| `BPF_XDP_ADJUST_HEAD` | Toutes |
| `BPF_PROBE_READ_STR` | Toutes |
| `BPF_GET_SOCKET_COOKIE` | Toutes |
| `BPF_GET_SOCKET_UID` | Toutes |
| `BPF_SET_HASH` | Toutes |
| `BPF_SETSOCKOPT` | Toutes |
| `BPF_SKB_ADJUST_ROOM` | Toutes |
| `BPF_REDIRECT_MAP` | Toutes |
| `BPF_SK_REDIRECT_MAP` | Toutes |
| `BPF_SOCK_MAP_UPDATE` | Toutes |
| `BPF_XDP_ADJUST_META` | Toutes |
| `BPF_PERF_EVENT_READ_VALUE` | Toutes |
| `BPF_PERF_PROG_READ_VALUE` | Toutes |
| `BPF_GETSOCKOPT` | Toutes |
| `BPF_OVERRIDE_RETURN` | Toutes |
| `BPF_SOCK_OPS_CB_FLAGS_SET` | Toutes |
| `BPF_MSG_REDIRECT_MAP` | Toutes |
| `BPF_MSG_APPLY_BYTES` | Toutes |
| `BPF_MSG_CORK_BYTES` | Toutes |
| `BPF_MSG_PULL_DATA` | Toutes |
| `BPF_BIND` | Toutes |
| `BPF_XDP_ADJUST_TAIL` | Toutes |
| `BPF_SKB_GET_XFRM_STATE` | Toutes |
| `BPF_GET_STACK` | Toutes |
| `BPF_SKB_LOAD_BYTES_RELATIVE` | Toutes |
| `BPF_FIB_LOOKUP` | Toutes |
| `BPF_SOCK_HASH_UPDATE` | Toutes |
| `BPF_MSG_REDIRECT_HASH` | Toutes |
| `BPF_SK_REDIRECT_HASH` | Toutes |
| `BPF_LWT_PUSH_ENCAP` | Toutes |
| `BPF_LWT_SEG6_STORE_BYTES` | Toutes |
| `BPF_LWT_SEG6_ADJUST_SRH` | Toutes |
| `BPF_LWT_SEG6_ACTION` | Toutes |
| `BPF_RC_REPEAT` | Toutes |
| `BPF_RC_KEYDOWN` | Toutes |
| `BPF_SKB_CGROUP_ID` | Toutes |
| `BPF_GET_CURRENT_CGROUP_ID` | Toutes |
| `BPF_GET_LOCAL_STORAGE` | Toutes |
| `BPF_SK_SELECT_REUSEPORT` | Toutes |
| `BPF_SKB_ANCESTOR_CGROUP_ID` | Toutes |
| `BPF_SK_LOOKUP_TCP` | Toutes |
| `BPF_SK_LOOKUP_UDP` | Toutes |
| `BPF_SK_RELEASE` | Toutes |
| `BPF_MAP_PUSH_ELEM` | Toutes |
| `BPF_MAP_POP_ELEM` | Toutes |
| `BPF_MAP_PEEK_ELEM` | Toutes |
| `BPF_MSG_PUSH_DATA` | Toutes |
| `BPF_MSG_POP_DATA` | Toutes |
| `BPF_RC_POINTER_REL` | Toutes |
| `BPF_SPIN_LOCK` | Toutes |
| `BPF_SPIN_UNLOCK` | Toutes |
| `BPF_SK_FULLSOCK` | Toutes |
| `BPF_TCP_SOCK` | Toutes |
| `BPF_SKB_ECN_SET_CE` | Toutes |
| `BPF_GET_LISTENER_SOCK` | Toutes |
| `BPF_SKC_LOOKUP_TCP` | Toutes |
| `BPF_TCP_CHECK_SYNCOOKIE` | Toutes |
| `BPF_SYSCTL_GET_NAME` | Toutes |
| `BPF_SYSCTL_GET_CURRENT_VALUE` | Toutes |
| `BPF_SYSCTL_GET_NEW_VALUE` | Toutes |
| `BPF_SYSCTL_SET_NEW_VALUE` | Toutes |
| `BPF_STRTOL` | Toutes |
| `BPF_STRTOUL` | Toutes |
| `BPF_SK_STORAGE_GET` | Toutes |
| `BPF_SK_STORAGE_DELETE` | Toutes |
| `BPF_SEND_SIGNAL` | Toutes |
| `BPF_TCP_GEN_SYNCOOKIE` | Toutes |
| `BPF_SKB_OUTPUT` | Toutes |
| `BPF_PROBE_READ_USER` | Toutes |
| `BPF_PROBE_READ_KERNEL` | Toutes |
| `BPF_PROBE_READ_USER_STR` | Toutes |
| `BPF_PROBE_READ_KERNEL_STR` | Toutes |
| `BPF_TCP_SEND_ACK` | Toutes |
| `BPF_SEND_SIGNAL_THREAD` | Toutes |
| `BPF_JIFFIES64` | Toutes |
| `BPF_READ_BRANCH_RECORDS` | Toutes |
| `BPF_GET_NS_CURRENT_PID_TGID` | Toutes |
| `BPF_XDP_OUTPUT` | Toutes |
| `BPF_GET_NETNS_COOKIE` | Toutes |
| `BPF_GET_CURRENT_ANCESTOR_CGROUP_ID` | Toutes |
| `BPF_SK_ASSIGN` | Toutes |
| `BPF_KTIME_GET_BOOT_NS` | Toutes |
| `BPF_SEQ_PRINTF` | Toutes |
| `BPF_SEQ_WRITE` | Toutes |
| `BPF_SK_CGROUP_ID` | Toutes |
| `BPF_SK_ANCESTOR_CGROUP_ID` | Toutes |
| `BPF_RINGBUF_OUTPUT` | Toutes |
| `BPF_RINGBUF_RESERVE` | Toutes |
| `BPF_RINGBUF_SUBMIT` | Toutes |
| `BPF_RINGBUF_DISCARD` | Toutes |
| `BPF_RINGBUF_QUERY` | Toutes |
| `BPF_CSUM_LEVEL` | Toutes |
| `BPF_SKC_TO_TCP6_SOCK` | Toutes |
| `BPF_SKC_TO_TCP_SOCK` | Toutes |
| `BPF_SKC_TO_TCP_TIMEWAIT_SOCK` | Toutes |
| `BPF_SKC_TO_TCP_REQUEST_SOCK` | Toutes |
| `BPF_SKC_TO_UDP6_SOCK` | Toutes |
| `BPF_GET_TASK_STACK` | Toutes |
| `BPF_LOAD_HDR_OPT` | Toutes |
| `BPF_STORE_HDR_OPT` | Toutes |
| `BPF_RESERVE_HDR_OPT` | Toutes |
| `BPF_INODE_STORAGE_GET` | Toutes |
| `BPF_INODE_STORAGE_DELETE` | Toutes |
| `BPF_D_PATH` | Toutes |
| `BPF_COPY_FROM_USER` | Toutes |
| `BPF_SNPRINTF_BTF` | Toutes |
| `BPF_SEQ_PRINTF_BTF` | Toutes |
| `BPF_SKB_CGROUP_CLASSID` | Toutes |
| `BPF_REDIRECT_NEIGH` | Toutes |
| `BPF_PER_CPU_PTR` | Toutes |
| `BPF_THIS_CPU_PTR` | Toutes |
| `BPF_REDIRECT_PEER` | Toutes |
| `BPF_TASK_STORAGE_GET` | Toutes |
| `BPF_TASK_STORAGE_DELETE` | Toutes |
| `BPF_GET_CURRENT_TASK_BTF` | Toutes |
| `BPF_BPRM_OPTS_SET` | Toutes |
| `BPF_KTIME_GET_COARSE_NS` | Toutes |
| `BPF_IMA_INODE_HASH` | Toutes |
| `BPF_SOCK_FROM_FILE` | Toutes |
| `BPF_CHECK_MTU` | Toutes |
| `BPF_FOR_EACH_MAP_ELEM` | Toutes |
| `BPF_SNPRINTF` | Toutes |

### `Types de carte BPF`

Ces constantes correspondent aux types de cartes eBPF.

| Name | Architectures |
| ---- |---------------|
| `BPF_MAP_TYPE_UNSPEC` | Toutes |
| `BPF_MAP_TYPE_HASH` | Toutes |
| `BPF_MAP_TYPE_ARRAY` | Toutes |
| `BPF_MAP_TYPE_PROG_ARRAY` | Toutes |
| `BPF_MAP_TYPE_PERF_EVENT_ARRAY` | Toutes |
| `BPF_MAP_TYPE_PERCPU_HASH` | Toutes |
| `BPF_MAP_TYPE_PERCPU_ARRAY` | Toutes |
| `BPF_MAP_TYPE_STACK_TRACE` | Toutes |
| `BPF_MAP_TYPE_CGROUP_ARRAY` | Toutes |
| `BPF_MAP_TYPE_LRU_HASH` | Toutes |
| `BPF_MAP_TYPE_LRU_PERCPU_HASH` | Toutes |
| `BPF_MAP_TYPE_LPM_TRIE` | Toutes |
| `BPF_MAP_TYPE_ARRAY_OF_MAPS` | Toutes |
| `BPF_MAP_TYPE_HASH_OF_MAPS` | Toutes |
| `BPF_MAP_TYPE_DEVMAP` | Toutes |
| `BPF_MAP_TYPE_SOCKMAP` | Toutes |
| `BPF_MAP_TYPE_CPUMAP` | Toutes |
| `BPF_MAP_TYPE_XSKMAP` | Toutes |
| `BPF_MAP_TYPE_SOCKHASH` | Toutes |
| `BPF_MAP_TYPE_CGROUP_STORAGE` | Toutes |
| `BPF_MAP_TYPE_REUSEPORT_SOCKARRAY` | Toutes |
| `BPF_MAP_TYPE_PERCPU_CGROUP_STORAGE` | Toutes |
| `BPF_MAP_TYPE_QUEUE` | Toutes |
| `BPF_MAP_TYPE_STACK` | Toutes |
| `BPF_MAP_TYPE_SK_STORAGE` | Toutes |
| `BPF_MAP_TYPE_DEVMAP_HASH` | Toutes |
| `BPF_MAP_TYPE_STRUCT_OPS` | Toutes |
| `BPF_MAP_TYPE_RINGBUF` | Toutes |
| `BPF_MAP_TYPE_INODE_STORAGE` | Toutes |
| `BPF_MAP_TYPE_TASK_STORAGE` | Toutes |

### `Types de programme BPF`

Ces constantes correspondent aux types de programme eBPF pris en charge.

| Name | Architectures |
| ---- |---------------|
| `BPF_PROG_TYPE_UNSPEC` | Toutes |
| `BPF_PROG_TYPE_SOCKET_FILTER` | Toutes |
| `BPF_PROG_TYPE_KPROBE` | Toutes |
| `BPF_PROG_TYPE_SCHED_CLS` | Toutes |
| `BPF_PROG_TYPE_SCHED_ACT` | Toutes |
| `BPF_PROG_TYPE_TRACEPOINT` | Toutes |
| `BPF_PROG_TYPE_XDP` | Toutes |
| `BPF_PROG_TYPE_PERF_EVENT` | Toutes |
| `BPF_PROG_TYPE_CGROUP_SKB` | Toutes |
| `BPF_PROG_TYPE_CGROUP_SOCK` | Toutes |
| `BPF_PROG_TYPE_LWT_IN` | Toutes |
| `BPF_PROG_TYPE_LWT_OUT` | Toutes |
| `BPF_PROG_TYPE_LWT_XMIT` | Toutes |
| `BPF_PROG_TYPE_SOCK_OPS` | Toutes |
| `BPF_PROG_TYPE_SK_SKB` | Toutes |
| `BPF_PROG_TYPE_CGROUP_DEVICE` | Toutes |
| `BPF_PROG_TYPE_SK_MSG` | Toutes |
| `BPF_PROG_TYPE_RAW_TRACEPOINT` | Toutes |
| `BPF_PROG_TYPE_CGROUP_SOCK_ADDR` | Toutes |
| `BPF_PROG_TYPE_LWT_SEG6LOCAL` | Toutes |
| `BPF_PROG_TYPE_LIRC_MODE2` | Toutes |
| `BPF_PROG_TYPE_SK_REUSEPORT` | Toutes |
| `BPF_PROG_TYPE_FLOW_DISSECTOR` | Toutes |
| `BPF_PROG_TYPE_CGROUP_SYSCTL` | Toutes |
| `BPF_PROG_TYPE_RAW_TRACEPOINT_WRITABLE` | Toutes |
| `BPF_PROG_TYPE_CGROUP_SOCKOPT` | Toutes |
| `BPF_PROG_TYPE_TRACING` | Toutes |
| `BPF_PROG_TYPE_STRUCT_OPS` | Toutes |
| `BPF_PROG_TYPE_EXT` | Toutes |
| `BPF_PROG_TYPE_LSM` | Toutes |
| `BPF_PROG_TYPE_SK_LOOKUP` | Toutes |

### `Constantes de mode Chmod`

Ces constantes correspondent aux modes pris en charge pour l'appel système chmod.

| Name | Architectures |
| ---- |---------------|
| `S_IFBLK` | Toutes |
| `S_IFCHR` | Toutes |
| `S_IFDIR` | Toutes |
| `S_IFIFO` | Toutes |
| `S_IFLNK` | Toutes |
| `S_IFMT` | Toutes |
| `S_IFREG` | Toutes |
| `S_IFSOCK` | Toutes |
| `S_IRGRP` | Toutes |
| `S_IROTH` | Toutes |
| `S_IRUSR` | Toutes |
| `S_IRWXG` | Toutes |
| `S_IRWXO` | Toutes |
| `S_IRWXU` | Toutes |
| `S_ISGID` | Toutes |
| `S_ISUID` | Toutes |
| `S_ISVTX` | Toutes |
| `S_IWGRP` | Toutes |
| `S_IWOTH` | Toutes |
| `S_IWUSR` | Toutes |
| `S_IXGRP` | Toutes |
| `S_IXOTH` | Toutes |
| `S_IXUSR` | Toutes |

### `Classes de requêtes DNS`

Ces constantes correspondent aux classes de requêtes DNS prises en charge.

| Name | Architectures |
| ---- |---------------|
| `CLASS_INET` | Toutes |
| `CLASS_CSNET` | Toutes |
| `CLASS_CHAOS` | Toutes |
| `CLASS_HESIOD` | Toutes |
| `CLASS_NONE` | Toutes |
| `CLASS_ANY` | Toutes |

### `Types de requêtes DNS`

Ces constantes correspondent aux types de requêtes DNS pris en charge.

| Name | Architectures |
| ---- |---------------|
| `None` | Toutes |
| `A` | Toutes |
| `NS` | Toutes |
| `MD` | Toutes |
| `MF` | Toutes |
| `CNAME` | Toutes |
| `SOA` | Toutes |
| `MB` | Toutes |
| `MG` | Toutes |
| `MR` | Toutes |
| `NULL` | Toutes |
| `PTR` | Toutes |
| `HINFO` | Toutes |
| `MINFO` | Toutes |
| `MX` | Toutes |
| `TXT` | Toutes |
| `RP` | Toutes |
| `AFSDB` | Toutes |
| `X25` | Toutes |
| `ISDN` | Toutes |
| `RT` | Toutes |
| `NSAPPTR` | Toutes |
| `SIG` | Toutes |
| `KEY` | Toutes |
| `PX` | Toutes |
| `GPOS` | Toutes |
| `AAAA` | Toutes |
| `LOC` | Toutes |
| `NXT` | Toutes |
| `EID` | Toutes |
| `NIMLOC` | Toutes |
| `SRV` | Toutes |
| `ATMA` | Toutes |
| `NAPTR` | Toutes |
| `KX` | Toutes |
| `CERT` | Toutes |
| `DNAME` | Toutes |
| `OPT` | Toutes |
| `APL` | Toutes |
| `DS` | Toutes |
| `SSHFP` | Toutes |
| `RRSIG` | Toutes |
| `NSEC` | Toutes |
| `DNSKEY` | Toutes |
| `DHCID` | Toutes |
| `NSEC3` | Toutes |
| `NSEC3PARAM` | Toutes |
| `TLSA` | Toutes |
| `SMIMEA` | Toutes |
| `HIP` | Toutes |
| `NINFO` | Toutes |
| `RKEY` | Toutes |
| `TALINK` | Toutes |
| `CDS` | Toutes |
| `CDNSKEY` | Toutes |
| `OPENPGPKEY` | Toutes |
| `CSYNC` | Toutes |
| `ZONEMD` | Toutes |
| `SVCB` | Toutes |
| `HTTPS` | Toutes |
| `SPF` | Toutes |
| `UINFO` | Toutes |
| `UID` | Toutes |
| `GID` | Toutes |
| `UNSPEC` | Toutes |
| `NID` | Toutes |
| `L32` | Toutes |
| `L64` | Toutes |
| `LP` | Toutes |
| `EUI48` | Toutes |
| `EUI64` | Toutes |
| `URI` | Toutes |
| `CAA` | Toutes |
| `AVC` | Toutes |
| `TKEY` | Toutes |
| `TSIG` | Toutes |
| `IXFR` | Toutes |
| `AXFR` | Toutes |
| `MAILB` | Toutes |
| `MAILA` | Toutes |
| `ANY` | Toutes |
| `TA` | Toutes |
| `DLV` | Toutes |
| `Reserved` | Toutes |

### `Constantes d'erreur`

Ces constantes correspondent aux constantes d'erreur prises en charge.

| Name | Architectures |
| ---- |---------------|
| `E2BIG` | Toutes |
| `EACCES` | Toutes |
| `EADDRINUSE` | Toutes |
| `EADDRNOTAVAIL` | Toutes |
| `EADV` | Toutes |
| `EAFNOSUPPORT` | Toutes |
| `EAGAIN` | Toutes |
| `EALREADY` | Toutes |
| `EBADE` | Toutes |
| `EBADF` | Toutes |
| `EBADFD` | Toutes |
| `EBADMSG` | Toutes |
| `EBADR` | Toutes |
| `EBADRQC` | Toutes |
| `EBADSLT` | Toutes |
| `EBFONT` | Toutes |
| `EBUSY` | Toutes |
| `ECANCELED` | Toutes |
| `ECHILD` | Toutes |
| `ECHRNG` | Toutes |
| `ECOMM` | Toutes |
| `ECONNABORTED` | Toutes |
| `ECONNREFUSED` | Toutes |
| `ECONNRESET` | Toutes |
| `EDEADLK` | Toutes |
| `EDEADLOCK` | Toutes |
| `EDESTADDRREQ` | Toutes |
| `EDOM` | Toutes |
| `EDOTDOT` | Toutes |
| `EDQUOT` | Toutes |
| `EEXIST` | Toutes |
| `EFAULT` | Toutes |
| `EFBIG` | Toutes |
| `EHOSTDOWN` | Toutes |
| `EHOSTUNREACH` | Toutes |
| `EIDRM` | Toutes |
| `EILSEQ` | Toutes |
| `EINPROGRESS` | Toutes |
| `EINTR` | Toutes |
| `EINVAL` | Toutes |
| `EIO` | Toutes |
| `EISCONN` | Toutes |
| `EISDIR` | Toutes |
| `EISNAM` | Toutes |
| `EKEYEXPIRED` | Toutes |
| `EKEYREJECTED` | Toutes |
| `EKEYREVOKED` | Toutes |
| `EL2HLT` | Toutes |
| `EL2NSYNC` | Toutes |
| `EL3HLT` | Toutes |
| `EL3RST` | Toutes |
| `ELIBACC` | Toutes |
| `ELIBBAD` | Toutes |
| `ELIBEXEC` | Toutes |
| `ELIBMAX` | Toutes |
| `ELIBSCN` | Toutes |
| `ELNRNG` | Toutes |
| `ELOOP` | Toutes |
| `EMEDIUMTYPE` | Toutes |
| `EMFILE` | Toutes |
| `EMLINK` | Toutes |
| `EMSGSIZE` | Toutes |
| `EMULTIHOP` | Toutes |
| `ENAMETOOLONG` | Toutes |
| `ENAVAIL` | Toutes |
| `ENETDOWN` | Toutes |
| `ENETRESET` | Toutes |
| `ENETUNREACH` | Toutes |
| `ENFILE` | Toutes |
| `ENOANO` | Toutes |
| `ENOBUFS` | Toutes |
| `ENOCSI` | Toutes |
| `ENODATA` | Toutes |
| `ENODEV` | Toutes |
| `ENOENT` | Toutes |
| `ENOEXEC` | Toutes |
| `ENOKEY` | Toutes |
| `ENOLCK` | Toutes |
| `ENOLINK` | Toutes |
| `ENOMEDIUM` | Toutes |
| `ENOMEM` | Toutes |
| `ENOMSG` | Toutes |
| `ENONET` | Toutes |
| `ENOPKG` | Toutes |
| `ENOPROTOOPT` | Toutes |
| `ENOSPC` | Toutes |
| `ENOSR` | Toutes |
| `ENOSTR` | Toutes |
| `ENOSYS` | Toutes |
| `ENOTBLK` | Toutes |
| `ENOTCONN` | Toutes |
| `ENOTDIR` | Toutes |
| `ENOTEMPTY` | Toutes |
| `ENOTNAM` | Toutes |
| `ENOTRECOVERABLE` | Toutes |
| `ENOTSOCK` | Toutes |
| `ENOTSUP` | Toutes |
| `ENOTTY` | Toutes |
| `ENOTUNIQ` | Toutes |
| `ENXIO` | Toutes |
| `EOPNOTSUPP` | Toutes |
| `EOVERFLOW` | Toutes |
| `EOWNERDEAD` | Toutes |
| `EPERM` | Toutes |
| `EPFNOSUPPORT` | Toutes |
| `EPIPE` | Toutes |
| `EPROTO` | Toutes |
| `EPROTONOSUPPORT` | Toutes |
| `EPROTOTYPE` | Toutes |
| `ERANGE` | Toutes |
| `EREMCHG` | Toutes |
| `EREMOTE` | Toutes |
| `EREMOTEIO` | Toutes |
| `ERESTART` | Toutes |
| `ERFKILL` | Toutes |
| `EROFS` | Toutes |
| `ESHUTDOWN` | Toutes |
| `ESOCKTNOSUPPORT` | Toutes |
| `ESPIPE` | Toutes |
| `ESRCH` | Toutes |
| `ESRMNT` | Toutes |
| `ESTALE` | Toutes |
| `ESTRPIPE` | Toutes |
| `ETIME` | Toutes |
| `ETIMEDOUT` | Toutes |
| `ETOOMANYREFS` | Toutes |
| `ETXTBSY` | Toutes |
| `EUCLEAN` | Toutes |
| `EUNATCH` | Toutes |
| `EUSERS` | Toutes |
| `EWOULDBLOCK` | Toutes |
| `EXDEV` | Toutes |
| `EXFULL` | Toutes |

### `Constantes des capacités de kernel`

Ces constantes correspondent aux capacités de kernel Linux prises en charge.

| Name | Architectures |
| ---- |---------------|
| `CAP_AUDIT_CONTROL` | Toutes |
| `CAP_AUDIT_READ` | Toutes |
| `CAP_AUDIT_WRITE` | Toutes |
| `CAP_BLOCK_SUSPEND` | Toutes |
| `CAP_BPF` | Toutes |
| `CAP_CHECKPOINT_RESTORE` | Toutes |
| `CAP_CHOWN` | Toutes |
| `CAP_DAC_OVERRIDE` | Toutes |
| `CAP_DAC_READ_SEARCH` | Toutes |
| `CAP_FOWNER` | Toutes |
| `CAP_FSETID` | Toutes |
| `CAP_IPC_LOCK` | Toutes |
| `CAP_IPC_OWNER` | Toutes |
| `CAP_KILL` | Toutes |
| `CAP_LAST_CAP` | Toutes |
| `CAP_LEASE` | Toutes |
| `CAP_LINUX_IMMUTABLE` | Toutes |
| `CAP_MAC_ADMIN` | Toutes |
| `CAP_MAC_OVERRIDE` | Toutes |
| `CAP_MKNOD` | Toutes |
| `CAP_NET_ADMIN` | Toutes |
| `CAP_NET_BIND_SERVICE` | Toutes |
| `CAP_NET_BROADCAST` | Toutes |
| `CAP_NET_RAW` | Toutes |
| `CAP_PERFMON` | Toutes |
| `CAP_SETFCAP` | Toutes |
| `CAP_SETGID` | Toutes |
| `CAP_SETPCAP` | Toutes |
| `CAP_SETUID` | Toutes |
| `CAP_SYSLOG` | Toutes |
| `CAP_SYS_ADMIN` | Toutes |
| `CAP_SYS_BOOT` | Toutes |
| `CAP_SYS_CHROOT` | Toutes |
| `CAP_SYS_MODULE` | Toutes |
| `CAP_SYS_NICE` | Toutes |
| `CAP_SYS_PACCT` | Toutes |
| `CAP_SYS_PTRACE` | Toutes |
| `CAP_SYS_RAWIO` | Toutes |
| `CAP_SYS_RESOURCE` | Toutes |
| `CAP_SYS_TIME` | Toutes |
| `CAP_SYS_TTY_CONFIG` | Toutes |
| `CAP_WAKE_ALARM` | Toutes |

### `Protocoles L3`

Ces constantes correspondent aux protocoles Layer 3 pris en charge.

| Name | Architectures |
| ---- |---------------|
| `ETH_P_LOOP` | Toutes |
| `ETH_P_PUP` | Toutes |
| `ETH_P_PUPAT` | Toutes |
| `ETH_P_TSN` | Toutes |
| `ETH_P_IP` | Toutes |
| `ETH_P_X25` | Toutes |
| `ETH_P_ARP` | Toutes |
| `ETH_P_BPQ` | Toutes |
| `ETH_P_IEEEPUP` | Toutes |
| `ETH_P_IEEEPUPAT` | Toutes |
| `ETH_P_BATMAN` | Toutes |
| `ETH_P_DEC` | Toutes |
| `ETH_P_DNADL` | Toutes |
| `ETH_P_DNARC` | Toutes |
| `ETH_P_DNART` | Toutes |
| `ETH_P_LAT` | Toutes |
| `ETH_P_DIAG` | Toutes |
| `ETH_P_CUST` | Toutes |
| `ETH_P_SCA` | Toutes |
| `ETH_P_TEB` | Toutes |
| `ETH_P_RARP` | Toutes |
| `ETH_P_ATALK` | Toutes |
| `ETH_P_AARP` | Toutes |
| `ETH_P_8021_Q` | Toutes |
| `ETH_P_ERSPAN` | Toutes |
| `ETH_P_IPX` | Toutes |
| `ETH_P_IPV6` | Toutes |
| `ETH_P_PAUSE` | Toutes |
| `ETH_P_SLOW` | Toutes |
| `ETH_P_WCCP` | Toutes |
| `ETH_P_MPLSUC` | Toutes |
| `ETH_P_MPLSMC` | Toutes |
| `ETH_P_ATMMPOA` | Toutes |
| `ETH_P_PPPDISC` | Toutes |
| `ETH_P_PPPSES` | Toutes |
| `ETH_P__LINK_CTL` | Toutes |
| `ETH_P_ATMFATE` | Toutes |
| `ETH_P_PAE` | Toutes |
| `ETH_P_AOE` | Toutes |
| `ETH_P_8021_AD` | Toutes |
| `ETH_P_802_EX1` | Toutes |
| `ETH_P_TIPC` | Toutes |
| `ETH_P_MACSEC` | Toutes |
| `ETH_P_8021_AH` | Toutes |
| `ETH_P_MVRP` | Toutes |
| `ETH_P_1588` | Toutes |
| `ETH_P_NCSI` | Toutes |
| `ETH_P_PRP` | Toutes |
| `ETH_P_FCOE` | Toutes |
| `ETH_P_IBOE` | Toutes |
| `ETH_P_TDLS` | Toutes |
| `ETH_P_FIP` | Toutes |
| `ETH_P_80221` | Toutes |
| `ETH_P_HSR` | Toutes |
| `ETH_P_NSH` | Toutes |
| `ETH_P_LOOPBACK` | Toutes |
| `ETH_P_QINQ1` | Toutes |
| `ETH_P_QINQ2` | Toutes |
| `ETH_P_QINQ3` | Toutes |
| `ETH_P_EDSA` | Toutes |
| `ETH_P_IFE` | Toutes |
| `ETH_P_AFIUCV` | Toutes |
| `ETH_P_8023_MIN` | Toutes |
| `ETH_P_IPV6_HOP_BY_HOP` | Toutes |
| `ETH_P_8023` | Toutes |
| `ETH_P_AX25` | Toutes |
| `ETH_P_ALL` | Toutes |
| `ETH_P_8022` | Toutes |
| `ETH_P_SNAP` | Toutes |
| `ETH_P_DDCMP` | Toutes |
| `ETH_P_WANPPP` | Toutes |
| `ETH_P_PPPMP` | Toutes |
| `ETH_P_LOCALTALK` | Toutes |
| `ETH_P_CAN` | Toutes |
| `ETH_P_CANFD` | Toutes |
| `ETH_P_PPPTALK` | Toutes |
| `ETH_P_TR8022` | Toutes |
| `ETH_P_MOBITEX` | Toutes |
| `ETH_P_CONTROL` | Toutes |
| `ETH_P_IRDA` | Toutes |
| `ETH_P_ECONET` | Toutes |
| `ETH_P_HDLC` | Toutes |
| `ETH_P_ARCNET` | Toutes |
| `ETH_P_DSA` | Toutes |
| `ETH_P_TRAILER` | Toutes |
| `ETH_P_PHONET` | Toutes |
| `ETH_P_IEEE802154` | Toutes |
| `ETH_P_CAIF` | Toutes |
| `ETH_P_XDSA` | Toutes |
| `ETH_P_MAP` | Toutes |

### `Protocoles L4`

Ces constantes correspondent aux protocoles Layer 4 pris en charge.

| Name | Architectures |
| ---- |---------------|
| `IP_PROTO_IP` | Toutes |
| `IP_PROTO_ICMP` | Toutes |
| `IP_PROTO_IGMP` | Toutes |
| `IP_PROTO_IPIP` | Toutes |
| `IP_PROTO_TCP` | Toutes |
| `IP_PROTO_EGP` | Toutes |
| `IP_PROTO_IGP` | Toutes |
| `IP_PROTO_PUP` | Toutes |
| `IP_PROTO_UDP` | Toutes |
| `IP_PROTO_IDP` | Toutes |
| `IP_PROTO_TP` | Toutes |
| `IP_PROTO_DCCP` | Toutes |
| `IP_PROTO_IPV6` | Toutes |
| `IP_PROTO_RSVP` | Toutes |
| `IP_PROTO_GRE` | Toutes |
| `IP_PROTO_ESP` | Toutes |
| `IP_PROTO_AH` | Toutes |
| `IP_PROTO_ICMPV6` | Toutes |
| `IP_PROTO_MTP` | Toutes |
| `IP_PROTO_BEETPH` | Toutes |
| `IP_PROTO_ENCAP` | Toutes |
| `IP_PROTO_PIM` | Toutes |
| `IP_PROTO_COMP` | Toutes |
| `IP_PROTO_SCTP` | Toutes |
| `IP_PROTO_UDPLITE` | Toutes |
| `IP_PROTO_MPLS` | Toutes |
| `IP_PROTO_RAW` | Toutes |

### `Flags MMap`

Ces constantes correspondent aux flags pris en charge pour l'appel système mmap.

| Name | Architectures |
| ---- |---------------|
| `MAP_SHARED` | Toutes |
| `MAP_PRIVATE` | Toutes |
| `MAP_SHARED_VALIDATE` | Toutes |
| `MAP_ANON` | Toutes |
| `MAP_ANONYMOUS` | Toutes |
| `MAP_DENYWRITE` | Toutes |
| `MAP_EXECUTABLE` | Toutes |
| `MAP_FIXED` | Toutes |
| `MAP_FIXED_NOREPLACE` | Toutes |
| `MAP_GROWSDOWN` | Toutes |
| `MAP_HUGETLB` | Toutes |
| `MAP_LOCKED` | Toutes |
| `MAP_NONBLOCK` | Toutes |
| `MAP_NORESERVE` | Toutes |
| `MAP_POPULATE` | Toutes |
| `MAP_STACK` | Toutes |
| `MAP_SYNC` | Toutes |
| `MAP_UNINITIALIZED` | Toutes |
| `MAP_HUGE_16KB` | Toutes |
| `MAP_HUGE_64KB` | Toutes |
| `MAP_HUGE_512KB` | Toutes |
| `MAP_HUGE_1MB` | Toutes |
| `MAP_HUGE_2MB` | Toutes |
| `MAP_HUGE_8MB` | Toutes |
| `MAP_HUGE_16MB` | Toutes |
| `MAP_HUGE_32MB` | Toutes |
| `MAP_HUGE_256MB` | Toutes |
| `MAP_HUGE_512MB` | Toutes |
| `MAP_HUGE_1GB` | Toutes |
| `MAP_HUGE_2GB` | Toutes |
| `MAP_HUGE_16GB` | Toutes |
| `MAP_32BIT` | amd64 |

### `Constantes des familles d'adresses réseau`

Ces constantes correspondent aux familles d'adresses réseau prises en charge.

| Name | Architectures |
| ---- |---------------|
| `AF_UNSPEC` | Toutes |
| `AF_LOCAL` | Toutes |
| `AF_UNIX` | Toutes |
| `AF_FILE` | Toutes |
| `AF_INET` | Toutes |
| `AF_AX25` | Toutes |
| `AF_IPX` | Toutes |
| `AF_APPLETALK` | Toutes |
| `AF_NETROM` | Toutes |
| `AF_BRIDGE` | Toutes |
| `AF_ATMPVC` | Toutes |
| `AF_X25` | Toutes |
| `AF_INET6` | Toutes |
| `AF_ROSE` | Toutes |
| `AF_DECnet` | Toutes |
| `AF_NETBEUI` | Toutes |
| `AF_SECURITY` | Toutes |
| `AF_KEY` | Toutes |
| `AF_NETLINK` | Toutes |
| `AF_ROUTE` | Toutes |
| `AF_PACKET` | Toutes |
| `AF_ASH` | Toutes |
| `AF_ECONET` | Toutes |
| `AF_ATMSVC` | Toutes |
| `AF_RDS` | Toutes |
| `AF_SNA` | Toutes |
| `AF_IRDA` | Toutes |
| `AF_PPPOX` | Toutes |
| `AF_WANPIPE` | Toutes |
| `AF_LLC` | Toutes |
| `AF_IB` | Toutes |
| `AF_MPLS` | Toutes |
| `AF_CAN` | Toutes |
| `AF_TIPC` | Toutes |
| `AF_BLUETOOTH` | Toutes |
| `AF_IUCV` | Toutes |
| `AF_RXRPC` | Toutes |
| `AF_ISDN` | Toutes |
| `AF_PHONET` | Toutes |
| `AF_IEEE802154` | Toutes |
| `AF_CAIF` | Toutes |
| `AF_ALG` | Toutes |
| `AF_NFC` | Toutes |
| `AF_VSOCK` | Toutes |
| `AF_KCM` | Toutes |
| `AF_QIPCRTR` | Toutes |
| `AF_SMC` | Toutes |
| `AF_XDP` | Toutes |
| `AF_MAX` | Toutes |

### `Flags d'ouverture`

Ces constantes correspondent aux flags pris en charge pour l'appel système open.

| Name | Architectures |
| ---- |---------------|
| `O_RDONLY` | Toutes |
| `O_WRONLY` | Toutes |
| `O_RDWR` | Toutes |
| `O_APPEND` | Toutes |
| `O_CREAT` | Toutes |
| `O_EXCL` | Toutes |
| `O_SYNC` | Toutes |
| `O_TRUNC` | Toutes |
| `O_ACCMODE` | Toutes |
| `O_ASYNC` | Toutes |
| `O_CLOEXEC` | Toutes |
| `O_DIRECT` | Toutes |
| `O_DIRECTORY` | Toutes |
| `O_DSYNC` | Toutes |
| `O_FSYNC` | Toutes |
| `O_NDELAY` | Toutes |
| `O_NOATIME` | Toutes |
| `O_NOCTTY` | Toutes |
| `O_NOFOLLOW` | Toutes |
| `O_NONBLOCK` | Toutes |
| `O_RSYNC` | Toutes |

### `Flags du buffer du canal`

Ces constantes correspondent aux flags pris en charge pour le buffer d'un canal.

| Name | Architectures |
| ---- |---------------|
| `PIPE_BUF_FLAG_LRU` | Toutes |
| `PIPE_BUF_FLAG_ATOMIC` | Toutes |
| `PIPE_BUF_FLAG_GIFT` | Toutes |
| `PIPE_BUF_FLAG_PACKET` | Toutes |
| `PIPE_BUF_FLAG_CAN_MERGE` | Toutes |
| `PIPE_BUF_FLAG_WHOLE` | Toutes |
| `PIPE_BUF_FLAG_LOSS` | Toutes |

### `Constantes de protection`

Ces constantes correspondent aux protections prises en charge pour l'appel système mmap.

| Name | Architectures |
| ---- |---------------|
| `PROT_NONE` | Toutes |
| `PROT_READ` | Toutes |
| `PROT_WRITE` | Toutes |
| `PROT_EXEC` | Toutes |
| `PROT_GROWSDOWN` | Toutes |
| `PROT_GROWSUP` | Toutes |

### `Constantes ptrace`

Ces constantes correspondent aux commandes ptrace prises en charge pour l'appel système ptrace.

| Name | Architectures |
| ---- |---------------|
| `PTRACE_TRACEME` | Toutes |
| `PTRACE_PEEKTEXT` | Toutes |
| `PTRACE_PEEKDATA` | Toutes |
| `PTRACE_PEEKUSR` | Toutes |
| `PTRACE_POKETEXT` | Toutes |
| `PTRACE_POKEDATA` | Toutes |
| `PTRACE_POKEUSR` | Toutes |
| `PTRACE_CONT` | Toutes |
| `PTRACE_KILL` | Toutes |
| `PTRACE_SINGLESTEP` | Toutes |
| `PTRACE_ATTACH` | Toutes |
| `PTRACE_DETACH` | Toutes |
| `PTRACE_SYSCALL` | Toutes |
| `PTRACE_SETOPTIONS` | Toutes |
| `PTRACE_GETEVENTMSG` | Toutes |
| `PTRACE_GETSIGINFO` | Toutes |
| `PTRACE_SETSIGINFO` | Toutes |
| `PTRACE_GETREGSET` | Toutes |
| `PTRACE_SETREGSET` | Toutes |
| `PTRACE_SEIZE` | Toutes |
| `PTRACE_INTERRUPT` | Toutes |
| `PTRACE_LISTEN` | Toutes |
| `PTRACE_PEEKSIGINFO` | Toutes |
| `PTRACE_GETSIGMASK` | Toutes |
| `PTRACE_SETSIGMASK` | Toutes |
| `PTRACE_SECCOMP_GET_FILTER` | Toutes |
| `PTRACE_SECCOMP_GET_METADATA` | Toutes |
| `PTRACE_GET_SYSCALL_INFO` | Toutes |
| `PTRACE_GETFPREGS` | amd64, arm |
| `PTRACE_SETFPREGS` | amd64, arm |
| `PTRACE_GETFPXREGS` | amd64 |
| `PTRACE_SETFPXREGS` | amd64 |
| `PTRACE_OLDSETOPTIONS` | amd64, arm |
| `PTRACE_GET_THREAD_AREA` | amd64, arm |
| `PTRACE_SET_THREAD_AREA` | amd64 |
| `PTRACE_ARCH_PRCTL` | amd64 |
| `PTRACE_SYSEMU` | amd64, arm64 |
| `PTRACE_SYSEMU_SINGLESTEP` | amd64, arm64 |
| `PTRACE_SINGLEBLOCK` | amd64 |
| `PTRACE_GETCRUNCHREGS` | arm |
| `PTRACE_GETFDPIC` | arm |
| `PTRACE_GETFDPIC_EXEC` | arm |
| `PTRACE_GETFDPIC_INTERP` | arm |
| `PTRACE_GETHBPREGS` | arm |
| `PTRACE_GETVFPREGS` | arm |
| `PTRACE_GETWMMXREGS` | arm |
| `PTRACE_SETCRUNCHREGS` | arm |
| `PTRACE_SETHBPREGS` | arm |
| `PTRACE_SETVFPREGS` | arm |
| `PTRACE_SETWMMXREGS` | arm |
| `PTRACE_SET_SYSCALL` | arm |
| `PTRACE_PEEKMTETAGS` | arm64 |
| `PTRACE_POKEMTETAGS` | arm64 |

### `Constantes SecL`

Ces constantes correspondent aux constantes SecL génériques prises en charge.

| Name | Architectures |
| ---- |---------------|
| `true` | Toutes |
| `false` | Toutes |

### `Constantes de signal`

Ces constantes correspondent aux signaux pris en charge pour l'appel système kill.

| Name | Architectures |
| ---- |---------------|
| `SIGHUP` | Toutes |
| `SIGINT` | Toutes |
| `SIGQUIT` | Toutes |
| `SIGILL` | Toutes |
| `SIGTRAP` | Toutes |
| `SIGABRT` | Toutes |
| `SIGIOT` | Toutes |
| `SIGBUS` | Toutes |
| `SIGFPE` | Toutes |
| `SIGKILL` | Toutes |
| `SIGUSR1` | Toutes |
| `SIGSEGV` | Toutes |
| `SIGUSR2` | Toutes |
| `SIGPIPE` | Toutes |
| `SIGALRM` | Toutes |
| `SIGTERM` | Toutes |
| `SIGSTKFLT` | Toutes |
| `SIGCHLD` | Toutes |
| `SIGCONT` | Toutes |
| `SIGSTOP` | Toutes |
| `SIGTSTP` | Toutes |
| `SIGTTIN` | Toutes |
| `SIGTTOU` | Toutes |
| `SIGURG` | Toutes |
| `SIGXCPU` | Toutes |
| `SIGXFSZ` | Toutes |
| `SIGVTALRM` | Toutes |
| `SIGPROF` | Toutes |
| `SIGWINCH` | Toutes |
| `SIGIO` | Toutes |
| `SIGPOLL` | Toutes |
| `SIGPWR` | Toutes |
| `SIGSYS` | Toutes |

### `Flags unlink`

Ces constantes correspondent aux flags pris en charge pour l'appel système unlink.

| Name | Architectures |
| ---- |---------------|
| `AT_REMOVEDIR` | Toutes |

### `Flags de la mémoire virtuelle`

Ces constantes définissent la protection d'un segment de mémoire virtuelle.

| Name | Architectures |
| ---- |---------------|
| `VM_NONE` | Toutes |
| `VM_READ` | Toutes |
| `VM_WRITE` | Toutes |
| `VM_EXEC` | Toutes |
| `VM_SHARED` | Toutes |
| `VM_MAYREAD` | Toutes |
| `VM_MAYWRITE` | Toutes |
| `VM_MAYEXEC` | Toutes |
| `VM_MAYSHARE` | Toutes |
| `VM_GROWSDOWN` | Toutes |
| `VM_UFFD_MISSING` | Toutes |
| `VM_PFNMAP` | Toutes |
| `VM_UFFD_WP` | Toutes |
| `VM_LOCKED` | Toutes |
| `VM_IO` | Toutes |
| `VM_SEQ_READ` | Toutes |
| `VM_RAND_READ` | Toutes |
| `VM_DONTCOPY` | Toutes |
| `VM_DONTEXPAND` | Toutes |
| `VM_LOCKONFAULT` | Toutes |
| `VM_ACCOUNT` | Toutes |
| `VM_NORESERVE` | Toutes |
| `VM_HUGETLB` | Toutes |
| `VM_SYNC` | Toutes |
| `VM_ARCH_1` | Toutes |
| `VM_WIPEONFORK` | Toutes |
| `VM_DONTDUMP` | Toutes |
| `VM_SOFTDIRTY` | Toutes |
| `VM_MIXEDMAP` | Toutes |
| `VM_HUGEPAGE` | Toutes |
| `VM_NOHUGEPAGE` | Toutes |
| `VM_MERGEABLE` | Toutes |



{{< partial name="whats-next/whats-next.html" >}}