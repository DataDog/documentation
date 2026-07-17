---
further_reading:
- link: /security/code_security/iac_security/setup
  tag: Documentation
  text: Configurer la sécurité IaC
- link: /security/code_security/iac_security/configuration
  tag: Documentation
  text: Configurer la sécurité IaC
title: Règles de sécurité IaC
type: iac_security
---
{{% site-region region="gov,gov2" %}}
<div class="alert alert-danger">Ce produit n'est pas pris en charge pour le <a href="/getting_started/site">site Datadog sélectionné</a> ({{< region-param key="dd_site_name" >}}).</div>
{{% /site-region %}}

[La sécurité de l'infrastructure en tant que code (IaC)][1] identifie les mauvaises configurations et les risques de sécurité dans les fichiers d'infrastructure en tant que code avant le déploiement, aidant à garantir que les environnements cloud restent sécurisés et conformes.

<div class="alert alert-info">Pour que la résolution Helm fonctionne correctement, chaque répertoire de chart doit inclure les charts dont il dépend. Pour plus de détails, voir <a href="https://helm.sh/docs/topics/charts/#the-chart-file-structure">Structure du fichier Chart</a> dans la documentation Helm.</div>

[1]: /fr/security/code_security/iac_security/

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}