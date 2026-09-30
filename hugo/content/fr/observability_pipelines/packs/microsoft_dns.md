---
description: En savoir plus sur le pack Microsoft DNS.
title: Microsoft DNS
---
## Présentation {#overview}

{{< img src="observability_pipelines/packs/microsoft_dns.png" alt="Le pack Microsoft DNS" style="width:25%;" >}}

Ce pack analyse le journal de débogage texte classique du serveur DNS Windows (dns.log) et décode les noms de requête ainsi que les codes de réponse.

Ce que fait ce pack :

- Décode les noms de requête
- Analyse Snd/Rcv et RCODE
- Échantillonne les réponses nettoyées