---
description: Connectez vos dépôts Git à Datadog via les intégrations de fournisseurs
  de gestion de code source (SCM).
further_reading:
- link: /integrations/github/
  tag: Documentation
  text: En savoir plus sur l'intégration GitHub
- link: /integrations/gitlab-source-code/
  tag: Documentation
  text: En savoir plus sur l'intégration du code source GitLab
- link: /integrations/azure-devops-source-code/
  tag: Documentation
  text: En savoir plus sur l'intégration du code source Azure DevOps
- link: /integrations/bitbucket/
  tag: Documentation
  text: En savoir plus sur l'intégration du code source Bitbucket
title: Fournisseurs de gestion de code source
---
## Présentation {#overview}

Pour utiliser la plupart des fonctionnalités liées au code source, vous devez connecter vos dépôts Git à Datadog via les intégrations de gestion de code source natives de Datadog. Après avoir connecté vos dépôts, Datadog peut stocker le contenu de vos dépôts pendant jusqu'à 7 jours afin de réduire les requêtes répétées vers le dépôt et d'améliorer la performance des fonctionnalités.

## Fournisseurs de gestion de code source {#source-code-management-providers}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">L'intégration du code source GitLab n'est pas prise en charge sur le site que vous avez sélectionné ({{< region-param key="dd_site_name" >}}). Sur GovCloud, utilisez l'intégration <a href="/integrations/github/">GitHub</a> pour la connectivité du code source.</div>
{{< /site-region >}}

Datadog prend en charge les fonctionnalités suivantes pour les fournisseurs SCM listés ci-dessous. Consultez [Fonctionnalités][1] pour plus de détails sur chaque fonctionnalité :

| Fonctionnalité | GitHub | GitLab | Azure DevOps | Bitbucket |
|---|---|---|---|---|
| **Connecter une instance SaaS** | Oui <br />(GitHub.com et GitHub Enterprise Cloud) | Oui <br />(GitLab.com) | Oui <br />(Azure DevOps Services) | Oui <br />(Bitbucket Cloud Premium) |
| **Connecter une instance sur site** | Oui <br />(GitHub Enterprise Server) | Oui <br />(GitLab Self-Managed ou Dedicated) | Non <br />(Azure DevOps Server) | Non <br />(Bitbucket Data Center ou Server)|
| **Liens contextuels** | Oui | Oui | Oui | Oui |
| **Extraits de code** | Oui | Oui | Oui | Oui |
| **Commentaires sur les PR** | Oui | Oui | Oui | Oui |

{{< tabs >}}
{{% tab "GitHub (SaaS et sur site)" %}}

<div class="alert alert-info">
Les dépôts provenant d'instances GitHub sont pris en charge pour GitHub.com, GitHub Enterprise Cloud (SaaS) et GitHub Enterprise Server (sur site). Pour GitHub Enterprise Server, votre instance doit être accessible depuis Internet. Si nécessaire, vous pouvez ajouter les <a href="https://docs.datadoghq.com/api/latest/ip-ranges/">adresses IP <code>webhooks</code> de Datadog</a> à la liste d'autorisation pour permettre à Datadog de se connecter à votre instance.</br>Si votre instance est hébergée sur un réseau interne/privé mais exposée via un alias DNS public (recommandé), configurez l'intégration en utilisant le nom de host public, puis <a href="/help">contactez le support Datadog</a> avec le nom de host public et le nom de host interne pour activer l'alias de nom de host.
</div>

Installez l'[intégration GitHub][101] de Datadog en utilisant la [tuile d'intégration][102] ou lors de l'intégration d'autres produits Datadog pour vous connecter à vos dépôts GitHub.

[101]: https://docs.datadoghq.com/fr/integrations/github/
[102]: https://app.datadoghq.com/integrations/github/

{{% /tab %}}
{{% tab "GitLab (SaaS et sur site)" %}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">L'intégration du code source GitLab n'est pas prise en charge sur le site que vous avez sélectionné ({{< region-param key="dd_site_name" >}}). Sur GovCloud, utilisez l'intégration <a href="/integrations/github/">GitHub</a> pour la connectivité du code source.</div>
{{< /site-region >}}

<div class="alert alert-info">
Les dépôts des instances GitLab sont pris en charge pour GitLab.com (SaaS) et GitLab Self-Managed/Dedicated (sur site). Pour GitLab Self-Managed, votre instance doit être accessible depuis Internet. Si nécessaire, vous pouvez ajouter les <a href="https://docs.datadoghq.com/api/latest/ip-ranges/">adresses IP <code>webhooks</code> de Datadog</a> à la liste d'autorisation pour permettre à Datadog de se connecter à votre instance.</br>Si votre instance est hébergée sur un réseau interne/privé mais exposée via un alias DNS public (recommandé), configurez l'intégration en utilisant le nom de host public, puis <a href="/help">contactez le support Datadog</a> avec le nom de host public et le nom de host interne pour activer l'alias de nom de host.
</div>

Installez l'[intégration du code source GitLab][101] de Datadog en utilisant la [tuile d'intégration][102] ou lors de l'intégration d'autres produits Datadog pour vous connecter à vos dépôts GitLab.

[101]: https://docs.datadoghq.com/fr/integrations/gitlab-source-code/
[102]: https://app.datadoghq.com/integrations/gitlab-source-code/

{{% /tab %}}
{{% tab "Azure DevOps (SaaS uniquement)" %}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">L'intégration du code source Azure DevOps n'est pas prise en charge sur le site sélectionné ({{< region-param key="dd_site_name" >}}). Sur GovCloud, utilisez l'intégration <a href="/integrations/github/">GitHub</a> pour la connectivité du code source.</div>
{{< /site-region >}}

<div class="alert alert-warning">
Les dépôts des organisations Azure DevOps sont pris en charge pour Azure DevOps Services (SaaS). Azure DevOps Server (sur site) n'est <strong>pas</strong> pris en charge.
</div>

Installez l'intégration du code source Azure DevOps de Datadog en utilisant la [tuile d'intégration][101] ou lors de l'intégration d'autres produits Datadog pour vous connecter à vos dépôts Azure DevOps.

[101]: https://app.datadoghq.com/integrations/azure-devops-source-code/

{{% /tab %}}
{{% tab "Bitbucket (SaaS uniquement)" %}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">L'intégration du code source Bitbucket Cloud n'est pas prise en charge sur le site sélectionné ({{< region-param key="dd_site_name" >}}). Sur GovCloud, utilisez l'intégration <a href="/integrations/github/">GitHub</a> pour la connectivité du code source.</div>
{{< /site-region >}}

<div class="alert alert-warning">
Les dépôts des espaces de travail Bitbucket sont pris en charge pour Bitbucket Cloud (SaaS). Bitbucket Server et Bitbucket Data Center (sur site) ne sont <strong>pas</strong> pris en charge.
</div>

Installez l'intégration du code source [Bitbucket Cloud][102] de Datadog en utilisant la [tuile d'intégration][101] ou lors de l'intégration d'autres produits Datadog pour vous connecter à vos dépôts Bitbucket Cloud.

[101]: https://app.datadoghq.com/integrations/bitbucket-source-code/
[102]: /fr/integrations/bitbucket/

{{% /tab %}}
{{% tab "Autres fournisseurs SCM" %}}

<div class="alert alert-danger">
Les dépôts sur des instances auto-hébergées ou des URL privées ne sont pas pris en charge par défaut. Pour activer cette fonctionnalité, <a href="/help">contactez Support</a>.
</div>

Si vous utilisez un autre fournisseur SCM, vous pouvez toujours lier manuellement la télémétrie à votre code source. Pour ce faire, téléchargez les métadonnées de votre dépôt avec la commande [`datadog-ci git-metadata upload`][1]. `datadog-ci v2.10.0` ou une version ultérieure est requise.

Lorsque vous exécutez `datadog-ci git-metadata upload` dans un dépôt Git, Datadog reçoit l'URL du dépôt, le SHA du commit de la branche actuelle et une liste des chemins de fichiers suivis.

Exécutez cette commande pour chaque commit que vous devez synchroniser avec Datadog.

### Validation {#validation}

Pour vous assurer que les données sont collectées, exécutez `datadog-ci git-metadata upload` dans votre pipeline CI.

Vous devriez obtenir une sortie similaire à ce qui suit :

```
Reporting commit 007f7f466e035b052415134600ea899693e7bb34 from repository git@my-git-server.com:my-org/my-repository.git.
180 tracked file paths will be reported.
Successfully uploaded tracked files in 1.358 seconds.
Syncing GitDB...
Successfully synced git DB in 3.579 seconds.
✅ Uploaded in 5.207 seconds.
```

[1]: https://github.com/DataDog/datadog-ci/tree/master/packages/base/src/commands/git-metadata
{{% /tab %}}
{{< /tabs >}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/source_code/features/