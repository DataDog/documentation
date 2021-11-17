---
title: Données NDM recueillies
kind: documentation
aliases:
  - /fr/network_performance_monitoring/devices/data/
---
## Métriques

La solution Network Device Monitoring envoie des métriques spécifiques sous l'espace de nommage `snmp.*`. Les métriques recueillies sont déterminées par le `[profil configuré]`. 

{{< get-metrics-from-git "snmp" >}}

## Événements

La solution Network Device Monitoring n'inclut aucun événement.

## Checks de service

**snmp.can_check** :<br>
Renvoie `CRITICAL` si l'Agent ne parvient pas à recueillir les métriques SNMP. Si ce n'est pas le cas, renvoie `OK`.