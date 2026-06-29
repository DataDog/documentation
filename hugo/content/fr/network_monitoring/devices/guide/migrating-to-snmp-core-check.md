---
further_reading:
- link: network_monitoring/devices/setup
  tag: Documentation
  text: En savoir plus sur la configuration de NDM
title: Migration depuis les checks basés sur Python vers les checks SNMP Core (en
  Go)
---

## Présentation

La version 7.27.0 de l'Agent Datadog prend en charge une nouvelle version des checks SNMP en Go. Celle-ci améliore la mémoire et les performances de l'Agent lors de la surveillance d'appareils avec SNMP. Ce guide vise à vous aider à migrer vers ces nouveaux checks core.

### Nouveautés de l'Agent v7.27.0

- Autodiscovery est désormais un processus de base de l'Agent. Il doit être chargé dans le principal check de l'intégration SNMP avec `loader:core`, sous `init_config`, et configuré dans le fichier principal `datadog.yaml` de l'Agent Datadog.

- Il n'est désormais plus possible de faire référence à une MIB en indiquant son nom lisible uniquement. Ainsi, toutes les références aux OID doivent inclure leur adresse numérique, ainsi que leur nom lisible. Tous les profils fournis par Datadog ont été mis à jour. Toutefois, vous devez modifier les profils personnalisés. Des exemples de migration sont fournis ci-dessous.

- Pour les checks Core, il n'est pas possible de compiler manuellement les MIB à utiliser en tant que profil. Par conséquent, les paramètres ci-dessous ne sont plus pris en charge :
  - `mibs_folder`
  - `optimize_mib_memory_usage`
  - `enforce_mib_constraints`
  - `bulk_threshold` (supprimé pour conserver d'autres fonctions `GET`)

## Instructions

1. Mettez à jour l'Agent Datadog en installant la version 7.27+ pour la plate-forme correspondante.

2. Modifiez la section `init_config` dans le check SNMP afin d'indiquer le nouveau check core dans `snmp.d/conf.yaml`.

``` yaml
  init_config:
      loader: core
```
3. Uniquement si vous utilisez Autodiscovery ou l'analyse de sous-réseaux : déplacez la configuration de chaque instance (sous-réseau) depuis la configuration du check SNMP vers le fichier principal `datadog.yaml` de l'Agent Datadog.

{{< tabs >}}
{{% tab "SNMPv2" %}}

```yaml
listeners:
  - name: snmp
snmp_listener:
  workers: 100  # nombre de workers utilisés pour découvrir simultanément des périphériques
  discovery_interval: 3600  # intervalle entre chaque processus Autodiscovery en secondes
  loader: core  # utiliser l'implémentation de check de base pour l'intégration SNMP, conseillé
  use_device_id_as_hostname: true  # conseillé
  configs:
    - network_address: 10.10.0.0/24  # sous-réseau CIDR
      snmp_version: 2
      port: 161
      community_string: '***'  # mettre la valeur entre des guillemets simples
      tags:
      - "key1:val1"
      - "key2:val2"
    - network_address: 10.20.0.0/24
      snmp_version: 2
      port: 161
      community_string: '***'
      tags:
      - "key1:val1"
      - "key2:val2"
```

{{% /tab %}}

{{% tab "SNMPv3" %}}

```yaml
listeners:
  - name: snmp
snmp_listener:
  workers: 100  # nombre de workers utilisés pour découvrir simultanément des périphériques
  discovery_interval: 3600  # intervalle entre chaque processus Autodiscovery en secondes
  loader: core  # utiliser l'implémentation de check de base pour l'intégration SNMP, conseillé
  use_device_id_as_hostname: true  # conseillé
  configs:
    - network_address: 10.10.0.0/24  # sous-réseau CIDR
      snmp_version: 3
      user: 'user'
      authProtocol: 'SHA256'  # Valeurs possibles : MD5, SHA, SHA224, SHA256, SHA384, SHA512
      authKey: 'fakeKey'  # mettre la valeur entre des guillemets simples
      privProtocol: 'AES256'  # valeurs possibles : DES, AES (128 bits), AES192, AES192C, AES256, AES256C
      privKey: 'fakePrivKey'  # mettre la valeur entre des guillemets simples
      tags:
        - 'key1:val1'
        - 'key2:val2'
    - network_address: 10.20.0.0/24
      snmp_version: 3
      user: 'user'
      authProtocol: 'SHA256'
      authKey: 'fakeKey'
      privProtocol: 'AES256'
      privKey: 'fakePrivKey'
      tags:
        - 'key1:val1'
        - 'key2:val2'
```

{{% /tab %}}
{{< /tabs >}}

### Migration des profils personnalisés (distincts du déploiement)

Il n'est plus possible de faire référence à des OID en indiquant uniquement leur nom lisible. Vous pouvez spécifier leur adresse (nom de table et index) ou l'adresse de l'entrée MIB. Si vous avez créé des profils ou modifié des profils existants, migrez-les vers le nouveau format. Voici des exemples de migration :

#### Symboles scalaires

**Avant l'Agent v7.27.0 :**

{{< code-block lang="yaml" filename="scalar_symbols.yaml" >}}
metrics:
  - MIB: HOST-RESOURCES-MIB
    symbol: hrSystemUptime
{{< /code-block >}}

**Avec l'Agent v7.27.0 :**

{{< code-block lang="yaml" filename="scalar_symbols_7_27.yaml" >}}
metrics:
  - MIB: HOST-RESOURCES-MIB
    symbol:
      OID: 1.3.6.1.2.1.25.1.1.0
      name: hrSystemUptime
{{< /code-block >}}

#### Symboles de table

**Avant l'Agent v7.27.0 :**

{{< code-block lang="yaml" filename="table_symbols.yaml" >}}

metrics:
  - MIB: HOST-RESOURCES-MIB
    table: hrStorageTable
    symbols:
      - hrStorageAllocationUnits
      - hrStoageSize
    metrics_tags:
      - tag: storagedec
        column: hrStorageDescr

{{< /code-block >}}


**Avec l'Agent v7.27.0 :**

{{< code-block lang="yaml" filename="table_symbols_7_27.yaml" >}}
metrics:
  - MIB: HOST-RESOURCES-MIB
    table:
      OID: 1.3.6.1.2.1.25.2.3
      name: hrStorageTable
    symbols:
      - OID: 1.3.6.1.2.1.25.2.3.1.4
        name: hrStorageAllocationUnits
      - OID: 1.3.6.1.2.1.25.2.3.1.5
        name: hrStoageSize
    metrics_tags:
      - tag: storagedec
        column:
          OID: 1.3.6.1.2.1.25.2.3.1.3
          name: hrStorageDescr
{{< /code-block >}}


#### Tags de métriques

**Avant l'Agent v7.27.0 :**

{{< code-block lang="yaml" filename="metrics_tags.yaml" >}}
metrics_tags:
  - symbol: sysName
    tag: snmp_host
{{< /code-block >}}

**Avec l'Agent v7.27.0 :**

{{< code-block lang="yaml" filename="metrics_tags_7_27.yaml" >}}
metrics_tags:
  - OID: 1.3.6.1.2.1.1.5.0
    symbol: sysName
    tag: snmp_host
{{< /code-block >}}