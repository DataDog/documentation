---
further_reading:
- link: https://trust.datadoghq.com/
  tag: Datadog Trust Center
  text: Découvrez la posture de sécurité de Datadog et consultez la documentation
    de sécurité
title: Conformité PCI DSS
---
## Présentation {#overview}

La norme de sécurité des données de l'industrie des cartes de paiement (PCI DSS) impose des exigences rigoureuses en matière de surveillance et de sécurité des données pour tous les commerçants, fournisseurs de services et institutions financières. Pour répondre à ces exigences, les organisations séparent souvent les données réglementées par la norme PCI (telles que les données des titulaires de carte) des données non réglementées dans différentes applications à des fins de surveillance et de Compliance.

**Les outils et politiques de Datadog sont conformes à la norme PCI v4.0.1**. Pour comprendre le périmètre complet de l'environnement Datadog et la manière dont il se rapporte aux responsabilités du client dans le cadre des contrôles PCI-DSS pertinents, téléchargez la Customer Responsibility Matrix et l'Attestation of Compliance (AoC) depuis le [Datadog Trust Center][1].

L'Attestation of Compliance (AoC) de Datadog reflète les outils et politiques que nous avons mis en place pour maintenir un environnement Connected PCI en tant que fournisseur de services. La plateforme Datadog prend en charge les connexions aux environnements de données de titulaires de carte (CDE) en tant qu'environnement Connected PCI, mais ne sert pas elle-même de CDE pour stocker, traiter ou transmettre des données de titulaires de carte (CHD).
Il est de votre responsabilité d'empêcher toute donnée CHD d'entrer dans la plateforme Datadog. 

## Outils recommandés pour la Compliance PCI {#recommended-tools-for-pci-compliance}

Pour vous aider à maintenir la Compliance PCI, **Datadog recommande vivement** l'utilisation des outils et du processus suivants :
- [**Sensitive Data Scanner**][2] : découvrez, classifiez et masquez les données de titulaire de carte sensibles
- [**Audit Trail**][3] : recherchez et analysez des événements d'audit détaillés conservés jusqu'à 90 jours à des fins de conservation et d'archivage à long terme
- [**File Integrity Monitoring**][4] : surveillez les modifications apportées aux fichiers et répertoires clés
- [**Cloud Security**][5] : suivez la conformité aux exigences des benchmarks du secteur et d'autres contrôles

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://trust.datadoghq.com/?itemUid=53e1508c-665e-45a8-9ce0-03fdf9ae1efb&source=click
[2]: /fr/security/sensitive_data_scanner/
[3]: /fr/account_management/audit_trail/
[4]: /fr/security/workload_protection/
[5]: /fr/security/cloud_security_management/#track-your-organizations-health