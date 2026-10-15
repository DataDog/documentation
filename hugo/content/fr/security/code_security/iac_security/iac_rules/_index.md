---
further_reading:
- link: /security/code_security/iac_security/setup
  tag: Documentation
  text: Configurez IaC Security
- link: /security/code_security/iac_security/configuration
  tag: Documentation
  text: Configurez IaC Security
- link: /security/code_security/iac_security/custom_rules/
  tag: Documentation
  text: Règles personnalisées IaC
- link: https://www.datadoghq.com/blog/github-actions-iac-security/
  tag: Blog
  text: 'Repérez les erreurs de configuration CI/CD avant que les bots ne le fassent
    : sécurisez GitHub Actions avec Datadog IaC Security.'
title: Règles de IaC Security
type: iac_security
---
{{% site-region region="gov,gov2" %}}
<div class="alert alert-danger">Ce produit n'est pas pris en charge pour votre <a href="/getting_started/site">site Datadog</a> sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{% /site-region %}}

[Infrastructure as Code (IaC) Security][1] identifie les erreurs de configuration et les risques de sécurité dans les fichiers d'infrastructure en tant que code avant le déploiement, ce qui permet de garantir que les environnements cloud restent sécurisés et conformes.

<div class="alert alert-info">Pour que la résolution Helm fonctionne correctement, chaque répertoire de chart doit inclure les charts dont il dépend. Pour plus de détails, consultez <a href="https://helm.sh/docs/topics/charts/#the-chart-file-structure">Chart File Structure</a> dans la documentation Helm.</div>

Pour appliquer des exigences spécifiques à votre organisation, consultez [IaC Custom Rules][2].

[1]: /fr/security/code_security/iac_security/
[2]: /fr/security/code_security/iac_security/custom_rules/

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}