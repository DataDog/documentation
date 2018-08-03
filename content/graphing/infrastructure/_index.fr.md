---
title: Liste d'infrastructure
kind: documentation
aliases:
  - /fr/hostnames
  - /fr/infrastructure/
further_reading:
  - link: graphing/infrastructure/hostmap
    tag: Graphiques
    text: Observer tous vos hôte ensemble avec la hostmap
  - link: graphing/infrastructure/livecontainers
    tag: Graphiques
    text: >-
      Obtenir une visibilité en temps réel de tous les conteneurs dans votre
      environnement
  - link: graphing/infrastructure/process
    tag: Graphiques
    text: Comprendre ce qui se passe à n'importe quel niveau de votre système
---
## Aperçu

La page Infrastructure list affiche tous les hôte surveillés par votre application Datadog:

{{< img src="graphing/infrastructure/index/infrastructure_list.png" alt="Infrastructure list" responsive="true" >}}

Note: Un hôte qui n'a pas envoyé de données dans les dernières 24 heures disparaît de l'infrastructure list. Vous pouvez toujours lancer une requête dessus, mais il n'apparaîtra pas dans les listes déroulantes de vos widgets.

## Détails de l'host

Si vous cliquez sur un hôte, vous pouvez voir ses tags associés:

{{< img src="graphing/infrastructure/index/infrastructure_list_host_details.png" alt="Infrastructure list host details" responsive="true" style="width:80%;">}}

### Nom de l'host de l'Agent

L'agent Datadog collecte des noms d'host potentiels à partir de plusieurs sources. Pour voir tous les noms détectés par l'Agent, [exécutez la commande Agent info] [1]:

    $ sudo /etc/init.d/datadog-agent info

    ...

    Hostnames
    =========

      hostname: my.special.hostname
      agent-hostname: my.special.hostname
      ec2-hostname: ip-192-0-0-1.internal
      instance-id: i-deadbeef
      socket-hostname: myhost
      socket-fqdn: myhost.mydomain

    ...

De ces noms, un nom canonique est choisi pour l'hôte. C'est le nom que  l'Agent utilise principalement pour s'identifier auprès de Datadog. Les autres noms sont
soumis également, mais seulement comme candidats pour les [alias](#aliases-d-host).

Le nom d'hôte canonique est choisi en fonction des règles suivantes, La première
la correspondance qui est valide est sélectionnée.

 1. `agent-hostname`: Si un nom d'host est explicitement défini dans le fichier de configuration de l'agent.
 2. `hostname`: Si le nom d'hôte DNS n'est pas celui d'un EC2 par défaut (par exemple `ip-192-0-0-1`).
 3. `instance-id`: Si l'agent peut atteindre l'endpoint de métadonnées EC2 à partir de l'hôte.
 4. `hostname`: Fall back sur le nom d'hôte DNS même s'il s'agit d'un EC2 par défaut.

Si le nom est reconnu comme manifestement non unique (par exemple `localhost.localdomain`), la règle actuelle échoue et passe à la suivante.

**Note**: Si une instance EC2 est un hôte ECS, Datadog utilise l'`instance-id` comme nom d'host, [même si le nom d'hôte depuis le DNS n'est pas celui un EC2 par défaut][2]. Si vous ne souhaitez pas utiliser l'`instance-id`, définissez le nom de l'hôte dans le fichier de configuration de l'agent.

<div class="alert alert-warning">
Les noms d'hosts doivent être uniques au sein d'un compte Datadog.<br> 
Sinon, vous risquez de rencontrer des incohérences sur les graphiques des métriques de votre hôte.
</div>

### Alias de host

Un hôte unique fonctionnant dans EC2 peut avoir un ID d'instance (`i-abcd1234`), un nom d'host générique fourni par EC2 basé sur l'adresse IP de l'hôte (` ip-192-0-0-1`) et un nom d'host significatif fourni par un serveur DNS interne ou un fichier hôtes géré par config (`myhost.mydomain`).

Datadog crée des alias pour les noms d'hôtes lorsqu'il existe plusieurs noms uniques identifiables pour un seul hôte. Les noms collectés par l'Agent (détaillé [au dessus](#agent-host-names)) sont ajoutés en tant qu'alias pour le nom canonique choisi.

Vous pouvez voir la liste de tous les hôtes de votre compte depuis l'onglet Infrastructure
dans Datadog. Dans le panneau Inspect, vous pouvez voir (entre autres) la liste des alias associés à chaque hôte.

{{< img src="graphing/infrastructure/index/host_aliases.png" alt="host aliases" responsive="true" style="width:80%;">}}

### Exportez votre liste d'infrastructure et les versions de l'agent

Si vous avez besoin d'imprimer ou d'exporter la liste des hôtes rapportant à Datadog, utilisez le "JSON API permalink" au bas de la page Infrastructure List.

{{< img src="graphing/infrastructure/index/infrastructure_list.png" alt="inf list" responsive="true" style="width:80%;">}}

En cliquant sur ce lien, vous obtenez une liste au format JSON de tous vos hosts.

Parfois, il peut s'avérer utile d'auditer vos numéros de version d'agent actuels pour vous assurer que vous exécutez bien la dernière version de l'agent ou pour les mettre à jour après une nouvelle version.

Un moyen facile d'accomplir ceci serait d'utiliser le script suivant qui utilise le permalien JSON:

`https://github.com/DataDog/Miscellany/tree/master/get_hostname_agentversion`

Ce script affiche tous les agents en cours d'exécution et leurs numéros de version dans un document distinct. De plus, vous pouvez modifier le script pour entrer un numéro de version si vous souhaitez également que tous les agents en cours d'exécution soient sous un numéro de version particulier. Il existe également un fichier séparé si vous souhaitez convertir la sortie JSON dans un fichier CSV pour des examens ulterieurs.

Une fois que vous avez déterminé les hôte que vous souhaitiez mettre à jour, vous pouvez installer manuellement l'agent à partir de la [page d'installation][3], ou alors  grâce à une intégration comme [Chef][4], [Puppet][5], ou [Ansible][6].

### Liste des instances ec2 sans l'agent de Datadog installé

La liste des hôtes et toutes leurs informations sur la page [Infrastructure List][7] de Datadog sont disponibles via le lien permanent "API JSON" en bas de la page.

Vous pouvez accéder grâce à un script aux informations de l'hôte et obtenir les informations dont vous avez besoin, par exemple ce script python imprime la liste des hosts:

* pour lequel Datadog reçoit des informations AWS EC2 de Cloudwatch, via notre intégration AWS.
* mais qui n'ont pas l'Agent d'installé

{{< img src="graphing/infrastructure/index/ec2_instances_without_dd_agent.png" alt="ec2_instances_without_dd_agent" responsive="true" style="width:90%;">}}

[Consultez le script pour afficher la liste des hôtes][8].

## En apprendre plus

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/faq/agent-commands/#agent-status-and-information
[2]: https://github.com/DataDog/dd-agent/blob/5.14.1/utils/hostname.py#L104
[3]: https://app.datadoghq.com/account/settings#agent
[4]: /integrations/chef
[5]: /integrations/puppet
[6]: /integrations/ansible
[7]: https://app.datadoghq.com/infrastructure
[8]: https://gist.github.com/Martiflex/2803a28ec562fc9a15d404a539f85d38