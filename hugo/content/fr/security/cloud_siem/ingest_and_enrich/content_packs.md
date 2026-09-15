---
aliases:
- /fr/security/cloud_siem/content_packs
disable_toc: true
further_reading:
- link: /security/cloud_siem/detection_rules
  tag: Documentation
  text: Créez des règles de détection de logs
- link: security/cloud_siem/investigator
  tag: Documentation
  text: En savoir plus sur l'Investigator
- link: /security/cloud_siem/triage_and_investigate/investigate_security_signals
  tag: Documentation
  text: Enquêtez sur les signaux de sécurité
- link: https://www.datadoghq.com/blog/cloud-siem-content-packs-whats-new-2024-09/
  tag: Blog
  text: 'Nouveautés dans Cloud SIEM Content Packs : septembre 2024'
- link: https://www.datadoghq.com/blog/microsoft-365-detections/
  tag: Blog
  text: Comment les attaquants tirent parti des services Microsoft 365
- link: https://www.datadoghq.com/blog/google-workspace-detections/
  tag: Blog
  text: Détectez les activités malveillantes dans les applications Google Workspace
    avec Datadog Cloud SIEM
- link: https://www.datadoghq.com/blog/ocsf-common-data-model/
  tag: Blog
  text: Normalisez vos données avec le modèle de données commun OCSF dans Datadog
    Cloud SIEM
- link: https://www.datadoghq.com/blog/cloud-siem-whats-new-rsa-2026
  tag: Blog
  text: 'Nouveautés dans Cloud SIEM : enquêtes assistées par IA, renseignement sur
    les menaces amélioré et opérations de sécurité évolutives'
- link: https://www.datadoghq.com/blog/cloud-siem-enterprise-security
  tag: Blog
  text: 'Datadog Cloud SIEM : stimuler l''innovation dans les opérations de sécurité'
- link: https://www.datadoghq.com/blog/oci-content-pack
  tag: Blog
  text: Surveillez les logs d'audit OCI avec Datadog Cloud SIEM
title: Paquets de contenu
---
## Présentation {#overview}

[Cloud SIEM Content Packs][1] fournissent du contenu prêt à l'emploi pour les intégrations de sécurité clés. Selon l'intégration, un Content Pack peut inclure les éléments suivants :

- [Detection Rules][2] pour assurer une couverture complète de votre environnement
- Un dashboard interactif avec des informations détaillées sur l'état des logs et des signaux de sécurité pour le Content Pack
- [Investigator][3], une interface graphique interactive pour enquêter sur les activités suspectes d'un utilisateur ou d'une ressource
- [Workflow Automation][4], pour automatiser les actions et accélérer l'investigation et la remédiation des problèmes
- Guides de configuration
- [OCSF pipelines][5] pour normaliser les logs de l'intégration vers le modèle de données commun Open Cybersecurity Schema Framework
- Alertes tierces provenant de l'intégration, mappées sur les signaux de sécurité Cloud SIEM

Vous pouvez filtrer les Content Packs par les types suivants :
- **Content Packs**: intégrations regroupant du contenu lié à la sécurité, tel que des règles de détection, des workflows SOAR (Security Orchestration, Automation, and Response) et des outils personnalisés.
- **Enrichment Packs**: contenu permettant d'ajouter un contexte précieux à l'analyse SIEM, comme des vulnérabilités ou des informations tierces, afin d'améliorer les investigations.
- **Integration Packs**: contenu sélectionné dans le catalogue Datadog pour être pertinent avec Cloud SIEM.
<!-- - **Entity Packs**: Integrations and bundled content that power UEBA (User and Entity Behavior Analytics) by modeling normal activity for users and entities and surfacing risky anomalies in Cloud SIEM -->

En plus des Content Packs listés sur cette page, Cloud SIEM inclut **Always-On Content Packs** : des enrichissements de threat intelligence que Datadog applique automatiquement à vos logs et signaux de sécurité, sans aucune installation ni configuration requise.

{{% cloud-siem-content-packs %}}

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/siem/content-packs
[2]: /fr/security/detection_rules/
[3]: /fr/security/cloud_siem/triage_and_investigate/investigator
[4]: /fr/actions/workflows/
[5]: /fr/security/cloud_siem/ingest_and_enrich/open_cybersecurity_schema_framework/