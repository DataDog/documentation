---
description: En savoir plus sur le pack Cisco IOS Traceback.
title: Cisco IOS Traceback
---
## Présentation {#overview}

{{< img src="observability_pipelines/packs/cisco_ios_traceback.png" alt="Le pack Cisco IOS Traceback" style="width:25%;" >}}

Les événements de traceback Cisco IOS signalent des erreurs logicielles, des défaillances de mémoire et des problèmes de CPU.

Ce que fait ce pack :

- Filtre les mnémoniques de crash et fault des journaux IOS
- Extrait le nom du processus, les adresses de traceback et l'utilisation du CPU
- Associe le mnémonique au niveau de gravité :