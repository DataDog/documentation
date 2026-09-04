---
description: En savoir plus sur le pack d'audit Google Cloud.
title: Google Cloud Audit
---
## Présentation {#overview}

{{< img src="observability_pipelines/packs/google_cloud_audit.png" alt="Le Google Cloud Audit pack" style="width:25%;" >}}

Les journaux d'audit Google Cloud capturent l'activité des administrateurs et les violations de politique.

Ce que fait ce pack :

- Extrait le principal, l'adresse IP de l'appelant et la méthode API
- Marque les modifications IAM, des secrets et du pare-feu comme étant à haut risque
- Échantillonne les opérations de routine en lecture seule