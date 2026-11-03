---
description: En savoir plus sur le pack Cisco ACI.
title: Cisco ACI
---
## Présentation {#overview}

{{< img src="observability_pipelines/packs/cisco_aci.png" alt="Le pack Cisco ACI" style="width:25%;" >}}

Les événements syslog Cisco ACI capturent l'état de santé de la fabric, les déplacements d'endpoints et l'activité administrative.

Ce que fait ce pack :

- Analyse les codes d'erreur ACI et les champs DN
- Génère des métriques par gravité et par nom d'événement
- Supprime les défaillances résolues et celles de faible importance
- Marque les événements de nœud, de politique et d'endpoint