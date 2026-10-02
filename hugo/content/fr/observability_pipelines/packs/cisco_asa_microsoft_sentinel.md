---
description: En savoir plus sur le pack Cisco ASA - Microsoft Sentinel.
title: Cisco ASA - Microsoft Sentinel
---
## Présentation {#overview}

{{< img src="observability_pipelines/packs/cisco_asa_microsoft_sentinel.png" alt="Le pack Cisco ASA - Microsoft Sentinel" style="width:25%;" >}}

Ce pack associe les événements syslog Cisco ASA analysés au schéma CommonSecurityLog dans Microsoft Sentinel.

Ce que fait ce pack :

- Associe quatre catégories de logs au CommonSecurityLog
- Déduit LogSeverity et DeviceAction à partir des codes ASA