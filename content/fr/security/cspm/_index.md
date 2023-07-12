---
algolia:
  tags:
  - cspm
aliases:
- /fr/security_platform/cspm/
- /fr/security/cspm/#glossary
kind: documentation
title: Cloud Security Posture Management
---

{{< site-region region="gov" >}}

<div class="alert alert-warning">À l'heure actuelle, la solution Cloud Security Posture Management n'est pas disponible pour ce site.</div>

{{< /site-region >}}

La solution Cloud Security Posture Management (CSPM) de Datadog vous permet d'évaluer et de visualiser facilement la posture de sécurité actuelle et historique de vos ressources cloud, d'automatiser la collecte de preuves pour les audits, et de remédier aux problèmes de configuration susceptibles de rendre votre organisation vulnérable aux attaques. En détectant en permanence les problèmes de sécurité issus de mauvaises configurations, vos équipes pourront limiter les risques tout en optimisant votre conformité aux normes de l'industrie.

## Détecter les problèmes de configuration liés à vos ressources cloud

Renforcez votre posture de sécurité et optimisez en permanence votre conformité en détectant, en priorisant et en corrigeant les erreurs de configuration sur l'ensemble de vos ressources cloud à l'aide des [règles de conformité prêtes à l'emploi](#gerer-les-regles-de-conformite-pretes-a-l-emploi-et-personnalisées) de Datadog.

Consultez votre posture de sécurité globale depuis la [page Overview][1]. Visualisez les résultats détaillés des analyses et examinez vos anciennes configurations à l'aide du [Security Findings Explorer][2].

{{< img src="security/cspm/overview_page.png" alt="Page d'aperçu de Cloud Security Posture Management" width="100%">}}

## Assurer votre conformité aux frameworks et benchmarks de l'industrie

CSPM intègre plus de 400 règles de conformité prêtes à l'emploi qui sont mises à jour par une équipe d'experts en sécurité. Chaque règle est liée à des contrôles et à des exigences au sein des normes de conformité et des benchmarks de l'industrie, tels que les frameworks de conformité PCI et SOC2.

[Consultez des rapports de conformité][3] pour vérifier si vous respectez les différents contrôles au sein d'un framework de conformité. Ces rapports affichent notamment les ressources qui ont généré le plus d'échecs, une analyse détaillée du nombre de ressources ayant généré un finding Pass ou Fail, ainsi que les trois principales règles de sécurité non respectées.

{{< img src="security/cspm/compliance_frameworks.png" alt="Frameworks de conformité Cloud Security Posture Management" width="100%">}}

## Gérer les règles de conformité prêtes à l'emploi et personnalisées

Les [règles de conformité prêtes à l'emploi][4] identifient les risques majeurs pour vous permettre d'intervenir sans attendre. Datadog développe sans cesse de nouvelles règles par défaut, qui sont automatiquement importées dans votre compte. [Personnalisez les règles][5] en définissant comment chaque règle doit scanner votre environnement, [créez des règles personnalisées][6] et [configurez des notifications en temps réel lorsqu'un problème est détecté](#configurer-des-notifications-en-temps-reel).

{{< img src="security/cspm/detection_rules.png" alt="Règles de conformité Cloud Security Posture Management" width="100%">}}

## Configurer des notifications en temps réel

[Envoyez des notifications en temps réel][7] lorsqu'un nouveau problème de configuration est détecté dans votre environnement pour que vos équipes puissent mettre en place des mesures de remédiation. Les notifications peuvent être envoyées [par e-mail, sur Slack, sur PagerDuty, via un webhook, et plus encore][8].

Utilisez des template variables et le format Markdown pour [personnaliser les messages de notification][9]. Modifiez, désactivez et supprimez des règles de notification existantes, ou créez-en d'autres en définissant une logique d'envoi de notification personnalisée en fonction de la gravité et du type de règle.

{{< img src="security/cspm/rule_notification_setup.png" alt="Page de configuration des notifications d'une règle Cloud Security Posture Management" width="100%">}}

## Examiner et corriger les problèmes de conformité

Effectuez une analyse approfondie à l'aide du [Security Findings Explorer][10]. Visualisez des informations détaillées sur une ressource, telles que sa configuration, ses règles de conformité ainsi que les tags associés pour déterminer le propriétaire de la ressource et l'endroit où elle se situe dans votre environnement. Si un finding ne vous intéresse pas ou si vous acceptez le risque associé, vous pouvez [le désactiver][13] pendant la durée de votre choix.

{{< img src="security/cspm/security_findings_explorer.png" alt="Security Findings Explorer de Cloud Security Posture Management" width="100%">}}

## Prise en main

{{< whatsnext >}}
  {{< nextlink href="/security/cspm/setup">}}Configurer CSPM{{< /nextlink >}}
  {{< nextlink href="/getting_started/cloud_security_management">}}Débuter avec Cloud Security Management{{< /nextlink >}}
  {{< nextlink href="/account_management/rbac/permissions/#cloud-security-platform">}}Autorisations des rôles Datadog pour CSPM{{< /nextlink >}}
  {{< nextlink href="/security/default_rules/#cat-posture-management-cloud">}}Règles de détection Posture Management prêtes à l'emploi pour le cloud{{< /nextlink >}}
  {{< nextlink href="/security/default_rules/#cat-posture-management-infra">}}Règles de détection Posture Management prêtes à l'emploi pour l'infrastructure{{< /nextlink >}}
  {{< nextlink href="/security/cspm/findings">}}Présentation des findings Cloud Security Posture Management{{< /nextlink >}}
  {{< nextlink href="https://www.datadoghq.com/blog/cspm-for-azure-with-datadog/">}}Surveiller la posture de sécurité et de conformité de votre environnement Azure{{< /nextlink >}}
  {{< nextlink href="https://www.datadoghq.com/blog/cspm-for-gcp-with-datadog/">}}Améliorer la posture de sécurité et de conformité de votre environnement Google Cloud{{< /nextlink >}}
{{< /whatsnext >}}

[1]: https://app.datadoghq.com/security/compliance/homepage
[2]: https://app.datadoghq.com/security/compliance
[3]: /fr/security/cspm/frameworks_and_benchmarks
[4]: /fr/security/default_rules/#cat-posture-management-cloud
[5]: /fr/security/cspm/frameworks_and_benchmarks#customize-how-your-environment-is-scanned-by-each-rule
[6]: /fr/security/cspm/custom_rules
[7]: /fr/security/cspm/frameworks_and_benchmarks#set-notification-targets-for-detection-rules
[8]: /fr/security/notifications/
[9]: /fr/security/notifications/#detection-rule-notifications
[10]: /fr/security/cspm/findings
[11]: /fr/security/default_rules/#cat-posture-management-infra
[12]: https://www.pcisecuritystandards.org/pci_security/maintaining_payment_security
[13]: /fr/security/cspm/findings#mute-findings