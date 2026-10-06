---
further_reading:
- link: /security/automation_pipelines/modify_severity/
  tag: Documentation
  text: Règles de modification de la gravité
products:
- icon: cloud-security-management
  name: Cloud Security
  url: /security/cloud_security_management/
- icon: security-code-security
  name: Code Security
  url: /security/code_security/
- icon: app-sec
  name: Protection des applications et des API
  url: /security/application_security/
- icon: security-workload-security
  name: Workload Protection
  url: /security/workload_protection/
title: Ajustement de la gravité
---
{{< product-availability >}}

Ajustez manuellement la gravité d'une constatation pour refléter le contexte commercial de votre organisation, sans créer de [severity modifier rule][1].

## Produits pris en charge {#supported-products}

Vous pouvez ajuster manuellement la gravité des constatations dans les produits suivants :

- [Cloud Security][2]
- [Code Security][3]
- [App and API Protection][4]
- [Workload Protection][5]

## Autorisations {#permissions}

Pour ajuster la gravité des constatations, vous devez disposer de l'autorisation `security_monitoring_findings_write` ou `appsec_vm_write`. Consultez [Role Based Access Control][6] pour plus d'informations sur les rôles par défaut de Datadog et les autorisations de contrôle d'accès granulaire basé sur les rôles.

## Ajuster la gravité d'une constatation {#adjust-the-severity-of-a-finding}

{{< img src="security/manual_severity_adjustment/finding_side_panel_button.png" alt="Panneau latéral d'une constatation avec l'option Ajuster la gravité mise en surbrillance dans le menu de débordement" style="width:100%;" >}}

1. Ouvrez une constatation.
2. Cliquez sur {{< ui >}}Adjust Severity{{< /ui >}}. La boîte de dialogue **Ajuster la gravité** s'ouvre.
3. Sélectionnez la nouvelle gravité, par exemple **Critique**.
4. Saisissez une description facultative.
5. Cliquez sur {{< ui >}}Adjust Severity{{< /ui >}}.

Pour ajuster automatiquement la gravité des constatations qui répondent à certains critères, consultez [Severity Modifier Rules][1].

## Ajustez la gravité de plusieurs constatations {#adjust-the-severity-of-multiple-findings}

Pour ajuster la gravité de plusieurs constatations à la fois :

1. Dans le Findings Explorer, sélectionnez jusqu'à 50 constatations.
2. Cliquez sur {{< ui >}}Severity{{< /ui >}}. La boîte de dialogue **Ajuster la gravité** s'ouvre.
3. Sélectionnez la nouvelle gravité, par exemple **Critique**.
4. Saisissez une description facultative.
5. Cliquez sur {{< ui >}}Adjust Severity{{< /ui >}}.

## Identifier les résultats modifiés {#identify-modified-findings}

Les constatations dont la gravité a été ajustée manuellement affichent un indicateur visuel dans les vues de liste de l'Explorer et dans l'en-tête du panneau latéral de la constatation. Survolez l'indicateur pour voir qui a ajusté la gravité et toute description saisie.

{{< img src="security/manual_severity_adjustment/severity_pill_popover.png" alt="Une pastille de gravité indiquant une augmentation de la gravité, avec une fenêtre contextuelle affichant qui a ajusté la gravité et la description saisie" style="width:65%;" >}}

Pour les résultats disposant d'un score CVSS (vulnérabilité d'image de conteneur, vulnérabilité de host, vulnérabilité de bibliothèque et vulnérabilité de code d'exécution), la section de gravité du panneau latéral inclut également une répartition indiquant :
- Le niveau de gravité d'origine, le score CVSS et le vecteur CVSS avant l'ajustement.
- Le nom de l'utilisateur qui a effectué l'ajustement et toute description saisie.
- Le niveau de gravité résultant et le score CVSS ajusté.

{{< img src="security/manual_severity_adjustment/severity_breakdown.png" alt="Le panneau latéral d'une constatation affichant la répartition de la gravité, avec la gravité d'origine, le score CVSS et le vecteur CVSS ; l'utilisateur qui a effectué l'ajustement ; et le niveau de gravité résultant ainsi que le score CVSS ajusté" style="width:100%;" >}}

## Résultats de vulnérabilité et scores CVSS {#vulnerability-findings-and-cvss-scores}

Pour les constatations de vulnérabilité qui ont un score CVSS ajusté par Datadog, l'ajustement manuel de la gravité met également à jour le score ajusté stocké dans `@severity_details.user_adjusted`. Le score mis à jour est défini approximativement sur le point médian de la plage CVSS v3 de la gravité cible :

| Target severity | CVSS v3 range |
|---|---|
| None | 0.0 |
| Low | 0.1–3.9 |
| Medium | 4.0–6.9 |
| High | 7.0–8.9 |
| Critical | 9.0–10.0 |

Le vecteur CVSS d'origine n'est jamais modifié. Aucun vecteur synthétique n'est généré pour correspondre au score ajusté.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/security/automation_pipelines/modify_severity/
[2]: https://app.datadoghq.com/security/compliance
[3]: https://app.datadoghq.com/security/code-security
[4]: https://app.datadoghq.com/security/appsec/inventory/finding
[5]: https://app.datadoghq.com/security/workload-protection/findings
[6]: /fr/account_management/rbac/permissions/#cloud-security-platform