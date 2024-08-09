---
description: Activez l'écoute des traps SNMP.
further_reading:
- link: https://www.datadoghq.com/blog/diagnose-network-performance-with-snmp-trap-monitoring/
  tag: Blog
  text: Surveiller et résoudre des problèmes de performances réseau avec des interruptions
    SNMP
title: Traps SNMP
---

## Présentation

Les traps SNMP sont des notifications envoyées par un périphérique compatible SNMP à un gestionnaire SNMP. Lorsqu'une activité inhabituelle est identifiée sur un périphérique réseau, comme un changement d'état soudain sur un équipement, le périphérique déclenche un événement Trap SNMP.

La surveillance des traps SNMP vous permet de détecter les problèmes qui seraient normalement passés inaperçus en raison de l'instabilité du périphérique. Par exemple, si une interface ne cesse d'osciller entre un état disponible et un état de panne toutes les 15 secondes, une évaluation toutes les 60 secondes ne sera pas suffisante pour déterminer à quel point le réseau est instable. Les traps offrent également une visibilité sur la santé de certains composants matériels tels que la batterie ou le châssis d'un périphérique, qu'il n'est normalement pas possible de surveiller.

L'écoute des traps SNMP est disponible à partir de la version v7.37 de l'Agent Datadog, vous permettant ainsi de configurer des [monitors][1] pour des événements Trap spécifiques.

## Configuration

Pour activer l'écoute des traps SNMP, ajoutez les lignes suivantes à votre fichier `datadog.yaml` :

```yaml
network_devices:
  namespace: <ESPACE_DE_NOMMAGE> # facultatif, valeur par défaut : default
  snmp_traps:
    enabled: true
    port: 9162 # ports d'écoute des traps
    community_strings: # community strings à autoriser pour les traps v2
      - <STRING_1>
      - <STRING_2>
    bind_host: 0.0.0.0
    users: # limité à un seul utilisateur v3
      - username: 'user'
        authKey: 'fakeKey'
        authProtocol: 'SHA' # valeurs possibles : MD5, SHA, SHA224, SHA256, SHA384, SHA512
        privKey: 'fakePrivKey'
        privProtocol: 'AES' # valeurs possibles : DES, AES (128 bits), AES192, AES192C, AES256, AES256C
```

**Remarque** : il n'est pas possible de définir plusieurs utilisateurs et mots de passe v3. Si votre environnement nécessite plusieurs utilisateurs v3, contactez l'[assistance Datadog][2].

## Espaces de nommage des périphériques

Tout comme pour la solution [Network Device Monitoring][3], les espaces de nommage peuvent être utilisés en tant que tags pour différencier divers périphériques réseau qui utilisent une même IP privée. Imaginons par exemple que deux routeurs, un à New York et un à Paris, partagent la même IP privée. Un Agent est normalement installé dans le centre de données de New York, et un autre Agent dans le centre de données de Paris. Vous pouvez alors appliquer les tags respectifs `namespace: nyc` et `namespace: paris`.

L'espace de nommage peut ensuite être utilisé pour passer d'un trap SNMP au périphérique qui en est à l'origine, ou du périphérique à un trap.

Il est essentiel d'harmoniser les configurations de vos différents Agents. Par exemple, si vous avez configuré deux Agents (un pour la collecte des traps et un autre pour les métriques), vous devez vous assurer que les espaces de nommage existent dans chacun des deux (ou qu'ils n'existent dans aucun des deux).

## Résolution

Chaque trap SNMP respecte un format basé sur un OID spécifique. L'Agent Datadog effectue une étape de _résolution_ pour convertir les OID en chaînes lisibles.

Un trap SNMP est constitué des éléments suivants :
- Informations sur l'émetteur (par exemple, l'IP du périphérique)
- Un OID qui définit le type de trap
- Des « variables », c'est-à-dire une liste de paires (`OID:value`) qui offrent des informations de contexte supplémentaires sur le trap.

Le décodage se fait côté Agent à l'aide d'un fichier de mappage stocké à l'emplacement `$<CHEMIN_VERS_CONF.D_AGENT>/snmp.d/traps_db/dd_traps_db.json.gz`. Datadog prend en charge plus de 11 000 MIB (Managed Information Bases) différentes.

### Format de mappage

Les mappages sont stockés sous forme de fichiers TrapsDB et peuvent être au format YAML ou JSON.

#### Exemples

{{< tabs >}}
{{% tab "YAML" %}}
```yaml
mibs:
- NET-SNMP-EXAMPLES-MIB
traps:
  1.3.6.1.4.1.8072.2.3.0.1:
    mib: NET-SNMP-EXAMPLES-MIB
    name: netSnmpExampleHeartbeatNotification
vars:
  1.3.6.1.4.1.8072.2.3.2.1:
    name: netSnmpExampleHeartbeatRate
```
{{% /tab %}}
{{% tab "JSON" %}}
```json
{
  "mibs": [
    "NET-SNMP-EXAMPLES-MIB"
  ],
  "traps": {
    "1.3.6.1.4.1.8072.2.3.0.1": {
      "mib": "NET-SNMP-EXAMPLES-MIB",
      "name": "netSnmpExampleHeartbeatNotification"
    }
  },
  "vars": {
    "1.3.6.1.4.1.8072.2.3.2.1": {
      "name": "netSnmpExampleHeartbeatRate"
    }
  }
}
```
{{% /tab %}}
{{< /tabs >}}

### Étendre les capacités de l'Agent

Pour étendre les capacités de l'Agent, créez vos propres mappages et placez-les dans le répertoire `$<CHEMIN_VERS_CONF.D_AGENT>/snmp.d/traps_db/`.

Vous pouvez écrire ces mappages à la main ou les générer depuis une liste de MIB à l'aide du kit de développement [`ddev`][4] de Datadog.

#### Générer un fichier TrapsDB à partir d'une liste de MIB

**Prérequis** :
- Python 3
- [`ddev`][4] (`pip3 install "datadog-checks-dev[cli]"`)
- [`pysmi`][5] (`pip3 install pysmi`)

Placez tous vos MIB dans un dossier dédié. Ensuite, exécutez :
`ddev meta snmp generate-traps-db -o ./output_dir/ /chemin/vers/mon/mib1 /chemin/vers/mon/mib2 /chemin/vers/mon/mib3 ...`

Si vos MIB ont des dépendances, `ddev` tente de les récupérer en ligne. Vous pouvez également placer toutes vos dépendances dans un dossier séparé et utiliser le paramètre `--mib-sources` pour spécifier ce dossier.



[1]: /fr/monitors/
[2]: /fr/help/
[3]: /fr/network_monitoring/devices
[4]: /fr/developers/integrations/new_check_howto/?tab=configurationtemplate#developer-toolkit
[5]: https://pypi.org/project/pysmi/