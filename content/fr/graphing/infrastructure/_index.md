---
title: Liste d'infrastructures
kind: documentation
aliases:
  - /fr/hostnames
  - /fr/infrastructure/
further_reading:
  - link: graphing/infrastructure/hostmap
    tag: Graphiques
    text: Observer tous vos hosts sur un seul écran avec la hostmap
  - link: graphing/infrastructure/livecontainers
    tag: Graphiques
    text: Consulter en temps réel tous les conteneurs de votre environnement
  - link: graphing/infrastructure/process
    tag: Graphiques
    text: Découvrir ce qui se passe à tous les niveaux de votre système
---
## Présentation

La page Infrastructure list affiche tous les hosts surveillés par votre application Datadog :

{{< img src="graphing/infrastructure/index/infrastructure_list.png" alt="Infrastructure list" responsive="true" >}}

Remarque : si un host n'a pas envoyé de données depuis 2 heures, celui-ci disparaît de votre liste d'infrastructures. Vous pouvez toujours l'interroger, mais il n'apparaîtra pas dans les listes déroulantes.

## Détails du host

Si vous cliquez sur un host, vous pouvez voir les tags qui lui sont associés :

{{< img src="graphing/infrastructure/index/infrastructure_list_host_details.png" alt="détails des hosts de la liste d'infrastructures" responsive="true" style="width:80%;">}}

### Hostnames de l'Agent

L'Agent Datadog recueille les hostnames potentiels à partir de plusieurs
sources. Pour afficher tous les noms détectés par l'Agent, [exécutez la commande status de l'Agent] [1] :

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

Un nom canonique est choisi pour le host à partir de ces noms. Il s'agit du nom que l'Agent
utilise principalement pour s'identifier auprès de Datadog. Les autres noms sont
également soumis, mais seulement comme candidats pour les [alias](#alias-de-host).

Le hostname canonique est choisi en fonction des règles suivantes. Le premier
résultat correspondant est sélectionné.

 1. `agent-hostname` : si un hostname est explicitement défini dans le fichier de configuration de l'Agent.
 2. `hostname` : si le hostname du DNS n'est pas défini sur EC2 par défaut (p. ex., `ip-192-0-0-1`).
 3. `instance-id` : si l'Agent peut atteindre l'endpoint de métadonnées EC2 à partir du host.
 4. `hostname` : revient au hostname du DNS, même s'il n'est pas défini sur EC2 par défaut.

Si le nom n'est manifestement pas unique (p. ex. `localhost.localdomain`),
la règle actuelle échoue et la règle suivante est appliquée.

**Remarque** : si une instance EC2 est un host ECS, Datadog utilise `instance-id` comme hostname, [même si le hostname du DNS n'est pas défini sur EC2 par défaut][2]. Si vous ne souhaitez pas utiliser l'`instance-id`, définissez le hostname dans le fichier de configuration de l'Agent.

<div class="alert alert-warning">
Les hostnames doivent être uniques au sein d'un même compte Datadog.<br>
Si vous ne respectez pas cette règle, vous risquez de rencontrer des incohérences sur les graphiques des métriques de votre host.
</div>

### Alias de host

Un host unique fonctionnant dans EC2 peut posséder un ID d'instance (`i-abcd1234`), un hostname générique fourni par EC2 basé sur l'adresse IP du host (`ip-192-0-0-1`) et un hostname significatif fourni par un serveur DNS interne ou un fichier de hosts géré par config (`myhost.mydomain`).

Datadog crée des alias pour les hostnames lorsqu'il existe plusieurs noms uniques identifiables pour un seul host. Les noms recueillis par l'Agent (plus de détails [ci-dessus](#noms-de-hosts-de-l-agent)) sont ajoutés en tant qu'alias pour le nom canonique choisi.

Vous pouvez consulter la liste de tous les hosts de votre compte depuis l'onglet Infrastructure
de Datadog. Le volet Inspect contient notamment la liste des alias associés à chaque host.

{{< img src="graphing/infrastructure/index/host_aliases.png" alt="alias hosts" responsive="true" style="width:80%;">}}

### Exporter votre liste d'infrastructures et les versions de l'Agent

Si vous avez besoin d'afficher ou d'exporter la liste des hôtes transmettant des données à Datadog, utilisez le permalien « API JSON » en bas de la liste d'infrastructures.

{{< img src="graphing/infrastructure/index/infrastructure_list.png" alt="inf list" responsive="true" style="width:80%;">}}

En cliquant sur ce lien, vous obtenez une liste au format JSON de tous vos hosts.

Il peut parfois s'avérer utile de vérifier les numéros de version actuels de vos Agents afin de vous assurer que vous exécutez bien la dernière version, ou de les mettre à jour après la publication d'une nouvelle version.

Pour y parvenir, il vous suffit par exemple d'utiliser le script suivant, qui tire parti du permalien JSON :

`https://github.com/DataDog/Miscellany/tree/master/get_hostname_agentversion`

Ce script exporte tous les agents en cours d'exécution et leurs numéros de version dans un document distinct. Vous pouvez également modifier le script afin de saisir le numéro de version de votre choix pour filtrer les Agents en cours d'exécution à partir de ce numéro. Vous pouvez également convertir les résultats JSON en un fichier CSV distinct afin de pouvoir vous y référer.

Une fois que vous avez déterminé les hosts que vous souhaitez mettre à jour, vous pouvez installer manuellement l'Agent à partir de la [page d'installation][3], ou utiliser une des intégrations d'automatisation Datadog comme [Chef][4], [Puppet][5] ou [Ansible][6].

### Liste des instances ec2 sans datadog-agent installé

La liste des hosts et toutes leurs informations sur la page [Infrastructure List][7] de Datadog sont disponibles via le permalien « API JSON » en bas de la page.

Vous pouvez programmer l'accès aux informations de host et obtenir les informations dont vous avez besoin. Par exemple, ce script python affiche la liste des hosts :

* pour lesquels Datadog reçoit des informations AWS EC2 de Cloudwatch, via notre intégration Datadog/AWS ;
* pour lesquels l'Agent n'a pas été installé

{{< img src="graphing/infrastructure/index/ec2_instances_without_dd_agent.png" alt="instances_ec2_sans_agent_dd" responsive="true" style="width:90%;">}}

[Consultez le script pour afficher la liste des hosts][8].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/agent/guide/agent-commands/#agent-status-and-information
[2]: https://github.com/DataDog/dd-agent/blob/5.14.1/utils/hostname.py#L104
[3]: https://app.datadoghq.com/account/settings#agent
[4]: /fr/integrations/chef
[5]: /fr/integrations/puppet
[6]: /fr/integrations/ansible
[7]: https://app.datadoghq.com/infrastructure
[8]: https://gist.github.com/Martiflex/2803a28ec562fc9a15d404a539f85d38