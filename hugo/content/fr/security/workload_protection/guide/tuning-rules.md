---
aliases:
- /fr/security_platform/cloud_workload_security/guide/tuning-rules/
- /fr/security_platform/cloud_security_management/guide/
- /fr/security/cloud_security_management/guide/tuning-rules
description: Meilleures pratiques pour créer des suppressions de signaux qui réduisent
  le bruit de Workload Protection sans perdre la couverture de détection.
title: Bonnes pratiques pour le réglage des signaux de sécurité de Workload Protection
---
Workload Protection surveille les activités suspectes se produisant au niveau de la charge de travail. Cependant, dans certains cas, des activités bénignes sont signalées comme malveillantes en raison de paramètres particuliers dans l'environnement de l'utilisateur. Lorsqu'une activité bénigne attendue génère un signal, vous pouvez désactiver le déclenchement sur cette activité afin de limiter le bruit.

Ce guide fournit des considérations sur les meilleures pratiques et des étapes pour affiner la suppression des signaux.

## Stratégie de suppression {#suppression-strategy}

Avant de supprimer des modèles bénins, identifiez les caractéristiques communes des signaux en fonction du type d'activité de détection. Plus les combinaisons d'attributs sont spécifiques, plus la suppression est précise.

Du point de vue de la gestion des risques, une suppression basée sur un nombre réduit d'attributs augmente le risque de ne pas détecter des activités réellement malveillantes. Pour affiner les suppressions efficacement et sans perdre la couverture des comportements malveillants, prenez en compte la liste suivante d'attributs clés courants, classés par type d'activité :

### Activité de processus {#process-activity}

Clés communes :
- `@process.args`
- `@process.executable.name`
- `@process.group`
- `@process.args`
- `@process.envs`
- `@process.parent.comm`
- `@process.parent.args`
- `@process.parent.executable.path`
- `@process.executable.user`
- `@process.ancestors.executable.user`
- `@process.ancestors.executable.path`
- `@process.ancestors.executable.envs`

Pour déterminer si un processus est légitime, examinez son processus parent dans l'arborescence des processus. L'arborescence des processus retrace un processus jusqu'à son origine, fournissant ainsi un contexte pour son flux d'exécution. Cela aide à comprendre la séquence d'événements menant au processus actuel.

Généralement, il suffit de baser votre suppression sur le processus parent et sur les attributs indésirables du processus.

Exemples de combinaisons :
- `@process.args`
- `@process.executable.group`
- `@process.parent.executable.comm`
- `@process.parent.executable.args`
- `@process.user`

Lors d'une suppression sur une large période, évitez les processus dont les arguments contiennent des valeurs temporaires, car la suppression cesse d'être efficace lorsque la valeur change.

Par exemple, certains programmes utilisent des fichiers temporaires lors du redémarrage ou de l'exécution (`/tmp`). La création de suppressions basées sur ces valeurs n'est pas efficace si une activité similaire est détectée.

Supposons que vous souhaitiez supprimer complètement le bruit de tous les signaux provenant d'une activité particulière sur un conteneur. Vous choisissez la commande complète dans l'arborescence des processus qui lance le processus de démarrage du conteneur. Pendant son exécution, le processus accède à des fichiers qui existent tant que le conteneur existe. Si le comportement que vous souhaitez cibler est plutôt lié à la logique de votre charge de travail, la définition de suppression basée sur des instances de processus éphémères devient inefficace pour éliminer des activités similaires sur d'autres conteneurs.

### Activité de fichier {#file-activity}

Pour personnaliser la suppression en lien avec les activités des fichiers, focalisez-vous sur des attributs qui comportent des informations précises sur vos charges de travail, le fichier en question et le processus accédant au fichier.

Clés communes :
- Étiquettes de charge de travail :
  - `kube_container_name`
  - `kube_service`
  - `host`
  - `env`
- Processus :
  - `@process.args`
  - `@process.executable.path`
  - `@process.executable.user`
  - `@process.group`
  - `@process.args`
  - `@process.parent.comm`
  - `@process.parent.args`
  - `@process.parent.executable.path`
  - `@process.user`
- Fichier :
  - `@file.path`
  - `@file.inode`
  - `@file.mode`

Pour déterminer une activité malveillante réelle lors de l'inspection d'un signal, vérifiez si le contexte dans lequel le processus accède au fichier et le modifie est attendu. Pour éviter de supprimer des comportements voulus sur des fichiers dans l'ensemble de votre infrastructure, vous devriez toujours disposer d'une combinaison qui rassemble toutes les informations contextuelles pertinentes à partir des clés communes listées ci-dessus.

Exemples de combinaisons :
  - `@process.args`
  - `@process.executable.path`
  - `@process.user`
  - `@file.path`
  - `kube_service `
  - `host`
  - `kube_container_name`

### Activité réseau basée sur le DNS {#network-dns-based-activity}

La surveillance de l'activité réseau vérifie le trafic DNS et vise à détecter les comportements suspects susceptibles de compromettre votre réseau de serveurs. Lors de la vérification des requêtes effectuées auprès de votre serveur DNS par certaines adresses IP, il peut être déclenché par des accès bénins provenant d'un ensemble connu d'adresses IP, telles que des adresses IP de réseau privé ou des adresses IP de réseau cloud.

Clés communes :
- Processus :
  - `@process.args`
  - `@process.executable.group`
  - `@process.executable.path`
  - `@process.parent.executable.comm`
  - `@process.parent.executable.args`
  - `@process.user`
- Lié au réseau/DNS :
  - `@dns.question.name`
  - `@network.destination.ip/port`
  - `@network.ip/port`

Lorsqu'une application locale établit des connexions pour résoudre un nom DNS, il convient de vérifier en priorité la liste des adresses IP qui ont provoqué la recherche, ainsi que la requête DNS.

Exemples de combinaisons :
  - `@network.ip/port`
  - `@network.destination.ip/port`
  - `@dns.question.*`

### Activité du noyau {#kernel-activity}

Avec les signaux liés au noyau, le bruit provient généralement de la logique de votre charge de travail ou de vulnérabilités associées à une certaine version du noyau. Prenez en compte les attributs suivants avant de décider ce qu'il faut supprimer :

Clés communes :
- Processus
  - `@process.args`
  - `@process.executable.group`
  - `@process.executable.path`
  - `@process.parent.executable.comm`
  - `@process.parent.executable.args`
  - `@process.user`
- Fichier
  - `@file.path `
  - `@file.inode`
  - `@file.mode`

La définition d'une combinaison pour ce type d'activité suit la même logique que pour les activités liées à un fichier ou à un processus. Il existe néanmoins certaines spécificités en lien avec l'appel système utilisé pour l'attaque.

Par exemple, l'exploitation Dirty Pipe est une vulnérabilité d'élévation de privilèges. Comme cela devient critique si des utilisateurs locaux élèvent leurs privilèges sur le système en utilisant cette attaque, il est logique de supprimer le bruit créé par les utilisateurs root exécutant des processus attendus.
- `@process.executable.user`
- `@process.executable.uid`

De plus, vous remarquerez peut-être que des signaux sont créés même lorsque certaines de vos machines exécutent des versions de noyau corrigées (par exemple, les versions Linux 5.16.11, 5.15.25 et 5.10 qui sont corrigées pour la vulnérabilité Dirty Pipe). Dans ce cas, ajoutez une étiquette de niveau de charge de travail telle que `host`, `kube_container_name` ou `kube_service` à la combinaison. Cependant, lorsque vous utilisez un attribut ou une étiquette de niveau de charge de travail, sachez qu'il s'applique à un large éventail de candidats, ce qui réduit votre surface de détection et votre couverture. Pour éviter que cela ne se produise, combinez toujours une étiquette de charge de travail avec des attributs basés sur les processus ou les fichiers afin de définir des critères de suppression plus granulaires.