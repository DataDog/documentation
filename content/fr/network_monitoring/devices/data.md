---
title: Données NDM recueillies
aliases:
  - /fr/network_performance_monitoring/devices/data/
---
## Métriques

La solution Network Device Monitoring envoie des métriques spécifiques sous l'espace de nommage `snmp.*`. Les métriques recueillies dépendent du `[profil configuré]`.
Si les métriques qui vous intéressent ne figurent pas sur la liste suivante, cherchez l'OID et son nom dans la [base de données mondiale des OID][1] afin de les ajouter ajouter à vos profils.

{{< get-metrics-from-git "snmp" >}}

## Événements

La solution Network Device Monitoring n'inclut aucun événement.

## Checks de service

{{< get-service-checks-from-git "snmp" >}}

[1]: http://oidref.com