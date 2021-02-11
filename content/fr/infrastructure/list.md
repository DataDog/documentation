---
title: Liste des infrastructures
kind: documentation
aliases:
  - /fr/hostnames
  - /fr/graphing/infrastructure/list/
further_reading:
  - link: /infrastructure/hostmap/
    tag: Documentation
    text: Hostmap
  - link: /infrastructure/livecontainers/
    tag: Documentation
    text: Container map
  - link: /infrastructure/process/
    tag: Documentation
    text: Surveillance des Live Processes
---
## Présentation

La liste des infrastructures affiche l'ensemble des hosts surveillés par Datadog actifs au cours des 2 dernières heures. Vous pouvez y rechercher des hosts, les regrouper par tags, ou trier la liste en cliquant sur le titre d'une colonne.

{{< img src="infrastructure/index/infrastructure_list.png" alt="Liste des infrastructures" >}}

## Hosts

La liste des infrastructures affiche les informations suivantes sur vos hosts :

| Colonne   | Description                                                                                         |
|----------|-----------------------------------------------------------------------------------------------------|
| Hostname | L'alias préféré pour le hostname (utilisez le menu déroulant pour visualiser le nom cloud ou l'ID d'instance).                  |
| Status   | Affiche `UP` lorsque Datadog reçoit les métriques attendues et `???` lorsqu'aucune métrique n'est reçue. |
| CPU      | La charge CPU (idle exclu).                                                      |
| IOWait   | La charge CPU consacrée à l'attente de l'exécution des opérations de lecture/écriture (non communiquée par toutes les plateformes).                        |
| Load 15  | La charge système au cours des 15 dernières minutes.                                                           |
| Apps     | Les intégrations Datadog qui transmettent des métriques à partir du host.                                            |

### Hostname

L'Agent Datadog recueille les hostnames potentiels à partir de plusieurs sources. Pour en savoir plus, consultez la section [Comment Datadog détermine-t-il le hostname de l'Agent ?][1].

Les hostnames doivent être uniques au sein d'un même compte Datadog. Si vous ne respectez pas cette règle, vous risquez de rencontrer des incohérences sur les graphiques de votre host.

### Inspection

Cliquez sur un host pour afficher les détails associés, tels que ses [alias](#alias), ses [tags][2] et ses [logs][3] (si activés) :

{{< img src="infrastructure/index/infrastructure_list_host_details.png" alt="Liste des infrastructures - Détails d'un host" style="width:90%;">}}

#### Alias

Datadog crée des alias pour les hostnames lorsqu'il existe plusieurs noms uniques identifiables pour un seul host. Les noms recueillis par l'Agent sont ajoutés en tant qu'alias pour le nom canonique choisi. Par exemple, un host unique fonctionnant dans EC2 peut posséder un ID d'instance (`i-abcd1234`), un hostname générique fourni par EC2 basé sur l'adresse IP du host (`ip-192-0-0-1`) et un hostname significatif fourni par un serveur DNS interne ou un fichier hosts géré par config (`myhost.mydomain`).

{{< img src="infrastructure/index/host_aliases.png" alt="alias de host" style="width:90%;">}}

### Exportation

Pour obtenir la liste au format JSON des hosts transmettant des données à Datadog, vous pouvez utiliser :

* Le **permalien API JSON** en bas de la liste des infrastructures
* L'[endpoint d'API pour la recherche de hosts][4] (référez-vous au [guide de développement][5] pour consulter un exemple).

#### Version de l'Agent

Il peut également s'avérer utile de passer en revue les versions de vos Agents pour vérifier qu'ils sont tous bien à jour. Pour ce faire, utilisez le [script get_host_agent_list][6] avec le permalien JSON pour obtenir la liste des Agents en cours d'exécution et leur version. Un script `json_to_csv` est également disponible pour convertir la sortie JSON en fichier CSV.

#### Agent non installé

L'exportation au format JSON permet également d'obtenir la liste des instances AWS EC2 sur lesquelles aucun Agent n'est installé. Pour faire apparaître ces instances dans la liste des infrastructures, configurez votre compte AWS dans le carré de l'intégration Datadog/AWS. Vous pouvez vous référer à cet [exemple de script][7].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/agent/faq/how-datadog-agent-determines-the-hostname/
[2]: /fr/getting_started/tagging/
[3]: /fr/logs/
[4]: /fr/api/v1/hosts/#get-the-total-number-of-active-hosts
[5]: /fr/developers/guide/query-the-infrastructure-list-via-the-api/
[6]: https://github.com/DataDog/Miscellany/tree/master/get_hostname_agentversion
[7]: https://gist.github.com/Martiflex/2803a28ec562fc9a15d404a539f85d38