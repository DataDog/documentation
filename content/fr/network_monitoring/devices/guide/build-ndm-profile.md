---
title: Créer un profil NDM
kind: guide
aliases:
  - /fr/network_performance_monitoring/devices/guide/build-ndm-profile
further_reading:
  - link: 'https://datadoghq.dev/integrations-core/tutorials/snmp/profile-format/'
    tag: Documentation
    text: Référence pour le format des profils
  - link: 'https://datadoghq.dev/integrations-core/tutorials/snmp/sim-format/'
    tag: Documentation
    text: Référence pour le format des données de simulation
---
La solution Network Device Monitoring (NDM) Datadog utilise des profils pour recueillir des métriques à partir de périphériques réseau. Ces profils sont définis de façon précise par une MIB ou permettent de recueillir des métriques à partir d'un modèle et d'une marque précis de périphérique. Ce tutoriel indique les étapes à suivre pour créer un profil NDM de base qui recueille des métriques OID à partir des périphériques HP iLO4.

Les profils NDM reposent sur des concepts SNMP. Pour mieux comprendre le fonctionnement de base de SNMP, consultez la [terminologie][1] employée.

<div class="alert alert-warning">
Ce guide s'adresse à des utilisateurs chevronnés. La plupart des périphériques peuvent être configurés à l'aide des <a href="/network_monitoring/devices/profiles#metric-definition-by-profile">profils Datadog</a>.
</div>

## Recherche

Avant de créer un profil NDM, vous devez tout d'abord recueillir des informations sur le périphérique et identifier les métriques que vous souhaitez recueillir.

### Informations sur le périphérique

Consultez le site Web du fabricant ou effectuez une recherche sur Internet pour obtenir les informations suivantes :

- Le nom du périphérique, le fabricant et le [sysOID][1].

- Le mode de fonctionnement du périphérique et ses cas d'utilisation. Les métriques varient selon les routeurs, commutateurs, ponts, etc. Par exemple, d'après la [page Wikipedia de la gamme HP iLO][2], les périphériques iLO4 sont utilisés par les administrateurs système afin de gérer à distance des serveurs intégrés.

- Les versions disponibles du périphérique, ainsi que les versions que vous ciblez. Par exemple, il existe de nombreuses versions des périphériques HP iLO. Ce tutoriel vise uniquement à recueillir des données à partir du modèle HP iLO4.

- Les MIB compatibles (ASN1, au format textuel), les OID et les fichiers MIB associés. Par exemple, HP fournit un package MIB pour les périphériques iLO sur [leur site Web][3]. **Remarque** : un profil peut recueillir des métriques sans MIB.

**Remarque** : pour en savoir plus sur les cas d'utilisation des périphériques, consultez la page [Équipement d'interconnexion de réseau information][4].

### Sélection des métriques

Choisissez ensuite les métriques que vous souhaitez recueillir. Les périphériques exposent généralement des milliers de métriques et d'OID, qui concernent des dizaines de MIB.

Voici quelques conseils à suivre pour choisir les bonnes métriques :

- Choisissez entre 10 et 40 métriques.
- Parcourez les profils de base pour identifier ceux qui pourraient s'appliquer au périphérique.
- Consultez les fichiers MIB du fabricant afin de rechercher les métriques suivantes :
    - Santé générale : jauges de statut
    - Trafic réseau : débits d'entrée et de sortie en octets, nombres d'erreurs entrantes et sortantes
    - CPU et utilisation de la mémoire
    - Température : capteurs de température, conditions thermiques
    - Alimentation : mise en tension/hors tension ou branche totale

## Mise en œuvre

### Ajouter un profil

Commencez par ajouter un profil en créant un fichier `.yaml` avec le `sysobjectid` et les métriques. Exemple :

```yaml
sysobjectid: 1.3.6.1.4.1.232.9.4.10

metrics:
  - MIB: CPQHLTH-MIB
    symbol:
      OID: 1.3.6.1.4.1.232.6.2.8.1.0
      name: cpqHeSysUtilLifeTime
```

**Remarque** : `sysobjectid` peut avoir pour valeur un wildcard, afin d'inclure une sous-arborescence de périphérique. Exemple : `1.3.6.1.131.12.4.*`.

## Tester le profil

Testez ensuite le profil en ciblant une adresse IP d'un périphérique qui utilisera le profil.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}


[1]: /fr/network_monitoring/devices/troubleshooting#terminology
[2]: https://en.wikipedia.org/wiki/HP_Integrated_Lights-Out
[3]: https://support.hpe.com/hpsc/swd/public/detail?swItemId=MTX_53293d026fb147958b223069b6
[4]: https://en.wikipedia.org/wiki/Networking_hardware