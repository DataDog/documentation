---
aliases:
- /fr/integrations/faq/for-snmp-does-datadog-have-a-list-of-commonly-used-compatible-oids

title: OID compatibles et couramment utilisés pour SNMP
---

Pour les appareils Cisco, vous pouvez utiliser la commande :

```text
show snmp-server oidlist
```

Pour découvrir les OID disponibles pour votre système, connectez-vous à votre compte Cisco et faites une recherche dans le navigateur d'objets : http://tools.cisco.com/Support/SNMP/do/BrowseOID.do?local=en

OID Linux (peuvent aussi fonctionner pour les périphériques réseau comme F5)

## Statistiques

### CPU

* Charge sur 1 minute : .1.3.6.1.4.1.2021.10.1.3.1
* Charge sur 5 minutes : .1.3.6.1.4.1.2021.10.1.3.2
* Charge sur 15 minutes : .1.3.6.1.4.1.2021.10.1.3.3
* Temps CPU utilisateur (en pourcentage) : .1.3.6.1.4.1.2021.11.9.0
* Temps CPU utilisateur brut : .1.3.6.1.4.1.2021.11.50.0
* Temps CPU système (en pourcentage) : .1.3.6.1.4.1.2021.11.10.0
* Temps CPU système brut : .1.3.6.1.4.1.2021.11.52.0
* Temps d'inactivité CPU (en pourcentage) : .1.3.6.1.4.1.2021.11.11.0
* Temps d'inactivité CPU brut : .1.3.6.1.4.1.2021.11.53.0
* Temps CPU nice brut : .1.3.6.1.4.1.2021.11.51.0

### Mémoire

* Taille totale de l'espace de swap : .1.3.6.1.4.1.2021.4.3.0
* Espace de swap disponible : .1.3.6.1.4.1.2021.4.4.0
* RAM totale de la machine : .1.3.6.1.4.1.2021.4.5.0
* RAM totale utilisée : .1.3.6.1.4.1.2021.4.6.0
* RAM totale libre : .1.3.6.1.4.1.2021.4.11.0
* RAM totale partagée : .1.3.6.1.4.1.2021.4.13.0
* RAM totale mise en tampon : .1.3.6.1.4.1.2021.4.14.0
* Mémoire cache totale : .1.3.6.1.4.1.2021.4.15.0

### Disque

* Chemin de montage du disque : .1.3.6.1.4.1.2021.9.1.2.1
* Chemin d'accès à la partition de l'appareil : .1.3.6.1.4.1.2021.9.1.3.1
* Taille totale du disque ou de la partition (Ko) : .1.3.6.1.4.1.2021.9.1.6.1
* Espace disponible sur le disque : .1.3.6.1.4.1.2021.9.1.7.1
* Espace utilisé sur le disque : .1.3.6.1.4.1.2021.9.1.8.1
* Espace utilisé sur le disque (en pourcentage) : .1.3.6.1.4.1.2021.9.1.9.1
* Inodes utilisés sur le disque (en pourcentage) : .1.3.6.1.4.1.2021.9.1.10.1

### Uptime

* Uptime système : .1.3.6.1.2.1.1.3.0