---
further_reading:
- link: https://trust.datadoghq.com/
  tag: Centre de confiance Datadog
  text: Découvrir la posture de sécurité de Datadog et consulter la documentation
    de sécurité
title: Conformité PCI DSS
---

## Présentation

La norme de sécurité des données (DSS) de l'industrie des cartes de paiement (PCI) impose des exigences strictes en matière de surveillance et de sécurité des données pour tous les commerçants, fournisseurs de services et institutions financières. Pour répondre à ces exigences, les organisations séparent souvent les données réglementées par PCI (telles que les données des titulaires de cartes) des données non réglementées dans différentes applications à des fins de surveillance et de conformité.

**Les outils et politiques de Datadog sont conformes à PCI v4.0**. Pour comprendre la portée complète de l'environnement Datadog et sa relation avec les responsabilités des clients dans le cadre des contrôles PCI-DSS pertinents, téléchargez la matrice des responsabilités des clients et l'attestation de conformité (AoC) depuis le [Centre de confiance Datadog][1].

L'attestation de conformité (AoC) de Datadog reflète les outils et politiques en place pour maintenir un environnement PCI connecté en tant que fournisseur de services. La plateforme Datadog prend en charge les connexions aux environnements de données des titulaires de cartes (CDE) en tant qu'environnement PCI connecté, mais ne sert pas elle-même de CDE pour le stockage, le traitement ou la transmission des données des titulaires de cartes (CHD).
Il vous incombe d'empêcher toute CHD d'entrer dans la plateforme Datadog.

## Outils recommandés pour la conformité PCI

Pour vous aider à maintenir la conformité PCI, **Datadog recommande vivement** l'utilisation des outils et processus suivants :
- [**Sensitive Data Scanner**][2] : découvrir, classifier et masquer les données sensibles des titulaires de cartes
- [**Audit Trail**][3] : rechercher et analyser des événements d'audit détaillés pendant jusqu'à 90 jours pour une conservation et un archivage à long terme
- [**File Integrity Monitoring**][4] : surveiller les modifications apportées aux fichiers et répertoires clés
- [**Cloud Security Management**][5] : suivre la conformité aux exigences des référentiels sectoriels et autres contrôles

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://trust.datadoghq.com/?itemUid=53e1508c-665e-45a8-9ce0-03fdf9ae1efb&source=click
[2]: /fr/security/sensitive_data_scanner/
[3]: /fr/account_management/audit_trail/
[4]: /fr/security/workload_protection/
[5]: /fr/security/cloud_security_management/#track-your-organizations-health