---
disable_toc: false
further_reading:
- link: https://docs.datadoghq.com/getting_started/security/cloud_siem/
  tag: Documentation
  text: Débuter avec Cloud SIEM
- link: https://www.datadoghq.com/blog/monitoring-cloudtrail-logs/
  tag: Blog
  text: Bonnes pratiques pour la surveillance des logs AWS CloudTrail
- link: https://www.datadoghq.com/blog/how-to-monitor-authentication-logs/
  tag: Blog
  text: Bonnes pratiques pour la surveillance des logs d'authentification
- link: https://www.datadoghq.com/blog/ocsf-common-data-model//
  tag: Blog
  text: Normalisez vos données avec le modèle de données commun OCSF dans Datadog
    Cloud SIEM
title: Ingérer et enrichir
---
## Présentation {#overview}

Les règles de détection Cloud SIEM analysent les logs et les données de sécurité pour générer des signaux de sécurité lorsque des menaces sont détectées. Une fois Cloud SIEM activé, configurez Datadog pour ingérer et enrichir les logs provenant des sources que vous souhaitez surveiller.

## Ingérez des données de sécurité {#ingest-security-data}
Le moyen le plus simple d'envoyer des données à Datadog consiste à utiliser les [Content Packs][1], qui sont des intégrations spécifiquement conçues pour Cloud SIEM. Chaque Content Pack contient des instructions sur la façon de configurer l'intégration pour ingérer ces logs et fournit des informations sur les éléments inclus, notamment :

- Règles de détection
- Dashboards interactifs prêts à l'emploi
- Parsers
- Workflows SOAR

Les [Content Packs][1] sont disponibles pour de nombreuses technologies de sécurité populaires.

Si vous disposez de logs personnalisés ou d'une source de données non répertoriée sur la page [Content Pack][2] de Cloud SIEM, vérifiez si l'intégration est disponible dans la vaste [bibliothèque d'intégrations][3] de Datadog. Si elle n'est pas disponible, vous pouvez envoyer ces logs en tant que [logs personnalisés][4] à Cloud SIEM pour analyse.

## Enrichissez les logs {#enrich-logs}

### Renseignement sur les menaces {#threat-intelligence}

Datadog fournit une [Threat Intelligence][5] intégrée pour les logs Cloud SIEM et prend également en charge l'enrichissement et la recherche à l'aide d'indicateurs de compromission (IoCs) issus du renseignement sur les menaces et stockés dans les tables de référence Datadog. Consultez [Bring Your Own Threat Intelligence][6] pour plus d'informations.

### Indicateurs ignorés {#muted-indicators}

Si un indicateur de renseignement sur les menaces est bénin pour votre organisation, vous pouvez l'ignorer afin que Cloud SIEM le classe comme `benign` dans l'enrichissement des logs et IOC Explorer. Datadog gère également une liste en lecture seule d'indicateurs connus comme bénins qui sont ignorés pour chaque organisation. Consultez [Muted Indicators][7] pour plus d'informations.

### Open Cybersecurity Framework (OCSF) {#open-cybersecurity-framework-ocsf}

[Open Cybersecurity Framework (OCSF)][8] est intégré directement dans Cloud SIEM, de sorte que les logs de sécurité entrants sont automatiquement enrichis avec des attributs conformes à OCSF via des pipelines prêts à l'emploi.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/security/cloud_siem/content_packs/
[2]: https://app.datadoghq.com/security/siem/content-packs
[3]: /fr/integrations/
[4]: /fr/logs/log_collection/
[5]: /fr/security/threat_intelligence/#threat-intelligence-sources
[6]: /fr/security/cloud_siem/threat_intelligence#bring-your-own-threat-intelligence
[7]: /fr/security/cloud_siem/ingest_and_enrich/muted_indicators/
[8]: /fr/security/cloud_siem/open_cybersecurity_schema_framework