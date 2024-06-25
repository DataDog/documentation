---
aliases:
- /fr/security_platform/cloud_workload_security/guide/tuning-rules/
- /fr/security_platform/cloud_security_management/guide/tuning-rules/
title: Ajuster les signaux de sécurité CSM Threats
---

## Présentation

La solution Cloud Security Management Threats (CSM Threats) surveille les activités suspectes au niveau de vos workloads. Il peut arriver que certaines activités sans danger soient considérées comme malveillantes, en raison de paramètres spécifiques à l'environnement de l'utilisateur. Lorsqu'une activité inoffensive déclenche un signal, vous pouvez supprimer le déclencheur de l'activité pour éviter de recevoir des alertes inutiles.

Ce guide décrit les meilleures pratiques à adopter ainsi que les étapes à suivre pour adapter votre stratégie de suppression de signaux.

## Stratégie de suppression

Avant de supprimer des patterns non dangereux, commencez par identifier les caractéristiques communes des signaux selon le type de l'activité détectée. Plus votre combinaison d'attributs est spécifique, plus la suppression est efficace.

En termes de gestion du risque, toute suppression basée sur un faible nombre d'attributs augmente la probabilité d'ignorer de réelles activités malveillantes. Pour ajuster efficacement les signaux tout en continuant à détecter les comportements malveillants, prenez en compte les attributs de clé communs de la liste suivante, qui sont classés par type d'activité :

### Activités liées aux processus

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

Pour vérifier si un processus est légitime ou non, consultez les processus en amont pour mieux comprendre le flux d'exécution. L'arborescence représente toutes les étapes d'un processus, jusqu'à son origine.

Généralement, il suffit de baser votre suppression sur le processus parent et sur les attributs indésirables du processus.

Exemples de combinaisons :
- `@process.args`
- `@process.executable.group`
- `@process.parent.executable.comm`
- `@process.parent.executable.args`
- `@process.user`

Si vous choisissez de baser votre suppression sur un large intervalle, évitez d'utiliser des processus dont les arguments possèdent des valeurs temporaires. En effet, la suppression perd en efficacité dès lors que les valeurs changent.

Par exemple, lorsqu'ils redémarrent ou s'exécutent, certains programmes utilisent des fichiers temporaires (`/tmp`). Ces valeurs ne permettent pas de supprimer efficacement les activités connexes détectées.

Imaginons que vous souhaitiez supprimer complètement les alertes inutiles générées par tous les signaux liés à une activité spécifique sur un conteneur. Vous choisissez ainsi dans l'arborescence du processus la commande complète qui initie le lancement du conteneur par le processus. Durant l'exécution du processus, celui-ci accès aux fichiers présents durant tout le cycle de vie du conteneur. Si le comportement ciblé est lié à la logique de votre workload, une définition de suppression basée sur des instances de processus éphémères ne permet pas d'ignorer efficacement les activités similaires sur d'autres conteneurs.

### Activités liées aux fichiers

Pour personnaliser la suppression en lien avec les activités des fichiers, focalisez-vous sur des attributs qui comportent des informations précises sur vos workloads, le fichier en question et le processus accédant au fichier.

Clés communes :
- Tags de workload :
  - `kube_container_name`
  - `kube_service`
  - `host`
  - `env`
- Processus :
  - `@process.args`
  - `@process.executable.path`
  - `@process.executable.user`
  - `@process.group`
  - `@process.args`
  - `@process.parent.comm`
  - `@process.parent.args`
  - `@process.parent.executable.path`
  - `@process.user`
- Fichier :
  - `@file.path` 
  - `@file.inode`
  - `@file.mode`

Pour déterminer si une activité est effectivement malveillante lors de l'inspection d'un signal, vérifiez si le processus accède au fichier et le modifie dans des circonstances attendues. Pour éviter de supprimer des comportements attendus dans des fichiers de l'ensemble de votre infrastructure, choisissez systématiquement une combinaison qui comporte toutes les informations de contexte pertinentes provenant des clés communes répertoriées ci-dessus.

Exemples de combinaisons :
  - `@process.args`
  - `@process.executable.path`
  - `@process.user`
  - `@file.path`
  - `kube_service`
  - `host`
  - `kube_container_name`

### Activités liées au DNS réseau

La surveillance de l'activité réseau analyse le trafic DNS. Elle vise à détecter les comportements suspects qui pourraient compromettre votre réseau de serveurs. La recherche des requêtes transmises à votre serveur DNS par certaines adresses IP peut accorder un accès légitime à un ensemble connu d'adresses IP, par exemple celles d'un réseau privé ou cloud.

Clés communes :
- Processus :
  - `@process.args`
  - `@process.executable.group`
  - `@process.executable.path`
  - `@process.parent.executable.comm`
  - `@process.parent.executable.args`
  - `@process.user`
- Réseau/DNS :
  - `@dns.question.name`
  - `@network.destination.ip/port`
  - `@network.ip/port`

Lorsqu'une application locale établit des connexions pour résoudre un nom DNS, il convient de vérifier en priorité la liste des adresses IP qui ont provoqué la recherche, ainsi que la requête DNS.

Exemples de combinaisons :
  - `@network.ip/port`
  - `@network.destination.ip/port`
  - `@dns.question.*`

### Activités liées au kernel

Pour les signaux en lien avec le kernel, les alertes inutiles proviennent généralement de la logique de votre workload ou des vulnérabilités associées à une certaine version du kernel. Analysez les attributs suivants avant de configurer une suppression :

Clés communes :
- Processus
  - `@process.args`
  - `@process.executable.group`
  - `@process.executable.path`
  - `@process.parent.executable.comm`
  - `@process.parent.executable.args`
  - `@process.user`
- Fichier
  - `@file.path`
  - `@file.inode`
  - `@file.mode`

La définition d'une combinaison pour ce type d'activité suit la même logique que pour les activités liées à un fichier ou à un processus. Il existe néanmoins certaines spécificités en lien avec l'appel système utilisé pour l'attaque.

Par exemple, l'exploit Dirty Pipe est une vulnérabilité liée à une élévation des privilèges. Puisqu'elle devient dangereuse lorsque les utilisateurs locaux élèvent leurs privilèges sur le système se servant de cette attaque, il convient de supprimer les alertes inutiles créées par les utilisateurs root exécutant les processus attendus.
- `@process.executable.user`
- `@process.executable.uid`

Il est possible que des signaux soient créés même lorsque certaines des machines exécutent une version du kernel patchée (par exemple, les versions 5.16.11, 5.15.25 et 5.10 de Linux, qui corrigent cette vulnérabilité). Si c'est le cas, ajoutez à votre combinaison un tag au niveau des workloads, par exemple `host`, `kube_container_name` ou `kube_service`. Sachez toutefois que l'utilisation d'un tag ou attribut au niveau des workloads concerne un large éventail de candidats. Ainsi, cela limite la couverture de votre surveillance, ainsi que les résultats affichés. Pour éviter cela, combinez toujours un tag au niveau des workloads à un attribut reposant sur un fichier ou un processus, afin de définir des critères de suppression plus précis.

## Ajouter une suppression depuis un signal

Lorsque vous analysez une menace potentielle signalée par les règles de détection de CSM Threats, vous pouvez tomber sur des signaux qui concernent des comportements connus anodins qui sont spécifiques à votre environnement.

Prenons l'exemple d'un exploit basé sur un utilitaire de processus Java. Une personne malveillante cible volontairement des vulnérabilités dans le code de votre application qui exécute des processus Java. Ce type d'attaque implique un accès persistent à votre application, grâce à la création de son propre utilitaire shell Java.

Il peut arriver que les règles CSM Threats détectent également des activités non suspectes, liées par exemple à votre équipe de sécurité effectuant un test d'intrusion pour évaluer la résistance de vos applications. Dans ce cas, vous pouvez étudier la pertinence des alertes transmises et supprimer celles qui sont inutiles.

Ouvrez le volet latéral des détails du signal et parcourez les onglets pour mieux comprendre le contexte du signal, y compris les métadonnées clés du processus, telles que les arguments de ligne de commande et les clés des variables d'environnement. Pour les workloads conteneurisés, ces informations comprennent l'image pertinente, le pod, le cluster Kubernetes, etc.

{{< img src="/security/cws/guide/cws-tuning-rules.png" alt="Le volet latéral d'un signal, avec les événements, logs et autres données associés au signal." width="75%">}}

Pour définir vos critères de suppression, cliquez sur la valeur d'un attribut, puis sélectionnez **Never trigger signals for**.

Pour cet exemple, consultez l'arborescence du processus pour vérifier si l'utilisation de ces variables d'environnement a été précédée par des opérations d'élévation de privilèges. Les tags peuvent indiquer l'emplacement de votre infrastructure auquel l'opération a eu lieu. Ils vous aident à réduire la gravité d'une opération. Grâce à toutes ces informations, vous pouvez choisir d'ajuster la règle de l'un des processus qui a hérité de ces variables d'environnement.

Si vous choisissez de réduire la portée d'une règle, la combinaison de certains attributs dans vos signaux améliore l'efficacité de la suppression. Les clés communes suivantes permettent généralement d'améliorer la pertinence de vos règles :

- `@process.parent.comm` : le contexte au sein duquel le processus à l'origine du signal a été appelé. Cette clé vous aide à déterminer si l'exécution du processus était attendue. Généralement, le processus parent fournit des informations de contexte sur l'exécution : tenez-en compte pour ne plus détecter les comportements anodins similaires.
- `@process.parent.path` : tout comme la clé précédente, l'ajout du chemin du binaire du processus parent spécifie l'emplacement concerné et permet donc d'améliorer la suppression.
- `host` : si le host concerné ne s'exécute pas dans un environnement vulnérable, par exemple un environnement intermédiaire, vous pouvez annuler le déclenchement des signaux lorsque des événements proviennent du host.
- `container.id` : pour une efficacité accrue, il est conseillé d'ajouter des attributs liés à vos workloads. Par exemple, si vous savez qu'un conteneur est dédié à une activité sans danger, ajoutez son nom ou son ID pour réduire considérablement le volume d'alertes inutiles.
- `@user.id` : si vous savez qu'un utilisateur correspond à un membre réel de votre équipe, vous pouvez supprimer les activités liées à cet utilisateur.

Les attributs suivants fournissent des informations à propos des processus en amont dans la chaîne d'exécution, pour une granularité encore plus forte. Ils se trouvent sous le préfixe `@process.ancestors.*` :
- `file.name`
- `args`
- `file.path`

## Ajouter une suppression depuis l'éditeur de règle

Les signaux renvoient le contexte pertinent au sein d'alertes de sécurité. Bien que vous puissiez vous servir des données d'événement pour vos filtres de suppression, il peut être encore plus pertinent d'utiliser les données d'observabilité sur lesquelles la règle de détection se base.

Dans CSM Threats, les logs runtime de l'Agent sont générés à partir des événements kernel recueillis. Vous pouvez prévisualiser les logs dans le volet latéral des signaux, sans avoir à changer d'interface.

1. Accédez au volet latéral des détails d'un signal, puis cliquez sur l'onglet Event.
2. Cliquez sur **View in Log Explorer** pour accéder à la solution Log Management, qui affiche la liste complète des logs qui ont déclenché ce signal.
   Cette liste peut comporter un grand volume de logs. Pour cette raison, le volet latéral du signal combine ces logs, ainsi que leurs attributs communs, au sein d'une structure JSON.
3. Revenez à l'onglet Event, puis faites défiler jusqu'à la fin de la page. Développez le menu JSON pour accéder à tous les attributs de log contenus dans les événements runtime de l'Agent.
4. Identifiez des paires key/value pour supprimer des signaux en fonction de clés communes, par exemple `@process.args`, `@process.group`, `@process.ancestors.comm` ou `@process.ancestors.args`.
5. Ouvrez la règle dans l'éditeur dédié et dans la section **Exclude benign activity with suppression queries**. Ajoutez la liste des paires key/value qui vous semblent pertinentes.

Prenons l'exemple d'une règle `Java process spawned shell/utility` pour laquelle vous souhaitez supprimer la combinaison des attributs suivants :
- `@process.args:+x`
- `@process.executable.group:exec`
- `@process.ancestors.executable.comm:root`
- `@process.ancestors.executable.args:init`

Saisissez ces valeurs de clé sous **This rule will not generate a signal if there is a match** pour supprimer les signaux indésirables.

Si vous souhaitez tout de même déclencher ces signaux sous certaines conditions, avec un ensemble d'attributs spécifiques, définissez la combinaison sous **Only generate a signal if there is a match**.