---
description: En savoir plus sur le pack Kube Proxy.
title: Kube Proxy
---
## Présentation {#overview}

{{< img src="observability_pipelines/packs/kube_proxy.png" alt="Le pack Kube Proxy" style="width:25%;" >}}

Ce pack conserve uniquement les erreurs et les avertissements de kube-proxy, en éliminant le bruit de synchronisation iptables de routine généré à chaque cycle.

Ce que fait ce pack :

- Conserve les échecs de synchronisation
- Élimine le bruit de synchronisation de routine
- Extrait le niveau de journalisation