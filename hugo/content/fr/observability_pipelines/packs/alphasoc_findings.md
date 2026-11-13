---
description: En savoir plus sur le pack AlphaSOC Findings.
title: AlphaSOC Findings
---
## Présentation {#overview}

{{< img src="observability_pipelines/packs/alphasoc_findings.png" alt="Le pack AlphaSOC Findings" style="width:25%;" >}}

AlphaSOC Findings signale les menaces DNS et IP détectées sur votre réseau.

Ce que fait ce pack :

- Extrait les catégories de menaces, le score et l'adresse IP source
- Associe les scores de gravité AlphaSOC au statut du log
- Supprime les findings à faible niveau de confiance dont le score est inférieur à 3