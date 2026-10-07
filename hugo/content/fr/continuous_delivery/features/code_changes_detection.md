---
description: Découvrez comment CD Visibility détecte les changements de code.
further_reading:
- link: /continuous_delivery/deployments/
  tag: Documentation
  text: En savoir plus sur Deployment Visibility
- link: /continuous_delivery/explorer
  tag: Documentation
  text: Découvrir comment interroger et visualiser les déploiements
title: Détection des changements de code
---

{{< callout url="https://docs.google.com/forms/d/e/1FAIpQLScNhFEUOndGHwBennvUp6-XoA9luTc27XBwtSgXhycBVFM9yA/viewform?usp=sf_link" btn_hidden="false" header="Rejoignez la version Preview !" >}}
CD Visibility est en version Preview. Si cette fonctionnalité vous intéresse, remplissez le formulaire pour demander l'accès.
{{< /callout >}}

## Présentation

La détection des changements de code permet à Datadog d'identifier les commits appliqués dans le cadre d'un déploiement. Cette fonctionnalité présente plusieurs avantages :
- Elle permet de comprendre où des changements spécifiques ont été déployés, par exemple en surveillant le moment où les mises à jour sont appliquées à l'environnement `production`.
- Elle permet de diagnostiquer les incidents liés à un déploiement en fournissant des données sur les changements précis appliqués, afin que les équipes puissent identifier rapidement les causes fondamentales potentielles et ainsi résoudre plus rapidement les problèmes.

Pour détecter les changements de code déployés, Datadog exécute [`git log`][1] entre le SHA du commit de déploiement actuel et celui du déploiement précédent. Les commits de fusion sont exclus du calcul.

Les changements de code déployés sont affichés dans toutes les exécutions de déploiement de la [page Deployment Executions][2]. L'onglet **Code Changes** indique le déploiement précédent pris en compte ainsi que les changements de code détectés entre les deux déploiements.

{{< img src="continuous_delivery/features/code_changes_tab.png" alt="Onglet Code Changes de la fonctionnalité de détection des changements" style="width:100%;">}}

En outre, la colonne **Deployments** de la page [Recent Code Changes][3] affiche les détails du service et de l'environnement pour tous les déploiements qui incluent un commit spécifique. Cette vue permet de comprendre rapidement si (et où) des changements de code ont été appliqués.
Survolez la valeur de service pour découvrir si le déploiement a atteint tous les environnements prévus, en fonction des emplacements où le service est généralement déployé.

{{< img src="continuous_delivery/features/recent_code_changes_deployments.png" alt="Affichage des déploiements sur la page Recent Code Changes" style="width:100%;">}}

Les changements de code ne sont détectés que pour les déploiements qui :
- possèdent un service (`@deployment.service`) avec des spécifications de chemin de fichier définies dans le Software Catalog (voir les [instructions de configuration](#specifier-des-patterns-de-chemin-de-fichier-de-service) pour en savoir plus) ;
- possèdent un environnement (`@deployment.env`) ;
- possèdent une URL de référentiel (`@deployment.git.repository_url`) et un SHA de commit (`@deployment.git.commit.sha`).

## Configuration

Pour autoriser la détection des changements de code pour vos déploiements, vous devez suivre deux étapes :
1. [Synchronisez vos métadonnées de référentiel avec Datadog](#synchroniser-vos-metadonnees-de-referentiel-avec-datadog).
2. [Spécifiez le chemin du fichier de code source pour vos services](#specifier-des-patterns-de-chemin-de-fichier-de-service).

### Synchroniser vos métadonnées de référentiel avec Datadog

<!--
The Following tabs were mostly copied from the Source Code Integration docs until we find a way to document this in a shared page
https://docs.datadoghq.com/integrations/guide/source-code-integration/?tab=github#synchronize-your-repository-metadata
-->

{{< tabs >}}
{{% tab "GitHub" %}}

<div class="alert alert-danger">
Les workflows GitHub exécutant le <a href="https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#pull_request">déclencheur <code>pull_request</code></a> ne sont pas pris en charge par l'intégration GitHub.
Si vous utilisez le déclencheur <code>pull_request</code>, utilisez l'autre méthode.
</div>

Si vous n'avez pas encore installé l'[intégration GitHub][1], installez-la depuis le [carré d'intégration GitHub][2].

Lors de la configuration de l'application GitHub :
1. Sélectionnez au minimum les autorisations de référentiel **Read** pour **Contents** et **Pull Requests**.
2. Abonnez-vous au moins aux événements **Push**, **PullRequest** et **PullRequestReview**.

Pour confirmer que la configuration est valide, sélectionnez votre application GitHub dans le [carré d'intégration GitHub][2] et vérifiez que, dans le tableau **Datadog Features**, la fonctionnalité **Pull Request Information** est indiquée comme valide.

[1]: https://docs.datadoghq.com/fr/integrations/github/
[2]: https://app.datadoghq.com/integrations/github/
{{% /tab %}}

{{% tab "GitLab" %}}

Suivez le processus [d'intégration dans l'application][1] pour configurer l'intégration du code source GitLab.

**Remarque** : la portée du token d'accès personnel du compte de service doit être au minimum définie sur `read_api`.

[1]: https://app.datadoghq.com/integrations/gitlab-source-code?subPath=configuration
{{% /tab %}}

{{% tab "Autres fournisseurs Git" %}}

Vous pouvez télécharger vos métadonnées de référentiel Git avec la commande [`datadog-ci git-metadata upload`][1]. À l'exécution de cette commande, Datadog reçoit l'URL du référentiel, le SHA de commit de la branche actuelle et la liste des chemins de fichier suivis.

Exécutez cette commande dans CI pour chaque nouveau commit. Lorsqu'un déploiement est exécuté pour un SHA de commit spécifique, assurez-vous que la commande `datadog-ci git-metadata upload` est exécutée pour ce commit **avant** que l'événement de déploiement ne soit envoyé.

<div class="alert alert-danger">
Ne spécifiez pas l'option <code>--no-gitsync</code> dans la commande <code>datadog-ci git-metadata upload</code>. Lorsqu'elle est incluse, cette option annule l'envoi des informations de commit à Datadog, ce qui empêche la détection des changements.
</div>

Vous pouvez vérifier que la configuration de la commande est correcte en consultant la sortie de la commande. Voici un exemple de sortie correcte :
```
Reporting commit 007f7f466e035b052415134600ea899693e7bb34 from repository git@github.com:organization/example-repository.git.
180 tracked file paths will be reported.
✅  Handled in 0.077 seconds.
```

[1]: https://github.com/DataDog/datadog-ci/tree/master/packages/base/src/commands/git-metadata
{{% /tab %}}
{{< /tabs >}}

### Spécifier des patterns de chemin de fichier de service

Pour pouvoir comprendre les changements de code introduits par un déploiement, vous devez uniquement prendre en compte les commits affectant le service déployé.

Pour y parvenir dans le [Software Catalog][5], spécifiez, pour les services pertinents, des patterns de chemin de fichier globaux pour le code source dans la [définition du service][4].

Si la définition du service contient une URL GitHub ou GitLab **complète** vers le dossier de l'application, un pattern de chemin unique est automatiquement utilisé. Le type de lien doit être défini sur **repo** et le nom du lien doit correspondre à « Source » ou au nom du service (`shopist` dans les exemples ci-dessous).

Si votre référentiel contient un seul service et que vous souhaitez que tous les répertoires soient pris en compte pour la détection des changements de code, vous pouvez ignorer cette étape. Si vous déployez plusieurs services à partir d'un référentiel, il est nécessaire de spécifier des patterns de chemin de code source.

**Exemple (schéma v2.2) :**

{{< tabs >}}
{{% tab "GitHub" %}}

```yaml
links:
  - name: shopist
    type: repo
    provider: github
    url: https://github.com/organization/example-repository/tree/main/src/apps/shopist
```

{{% /tab %}}

{{% tab "GitLab" %}}

```yaml
links:
  - name: shopist
    type: repo
    provider: gitlab
    url: https://gitlab.com/organization/example-repository/-/tree/main/src/apps/shopist?ref_type=heads
```

{{% /tab %}}
{{< /tabs >}}

La détection des changements de code pour les déploiements du service `shopist` ne prend en compte que les commits Git qui incluent des changements dans le chemin `src/apps/shopist/**`. Vous pouvez configurer un contrôle plus granulaire avec `extensions[datadoghq.com/cd-visibility]` ou `extensions[datadoghq.com/dora-metrics]`. Si les deux extensions sont détectées, l'extension `extensions[datadoghq.com/cd-visibility]` est utilisée.

**Exemple (schéma v2.2) :**

```yaml
extensions:
  datadoghq.com/cd-visibility:
    source_patterns:
      - src/apps/shopist/**
      - src/libs/utils/**
```

La détection des changements de code pour les déploiements du service `shopist` ne prend en compte que les commits Git qui incluent des changements dans le chemin `src/apps/shopist/**` ou le chemin `src/libs/utils/**`.

Si des patterns de code source pour un service sont définis à la fois dans un lien et dans une extension, seule l'extension est prise en compte lors du filtrage des commits.

#### Utiliser des patterns de chemins de fichier de service pour suivre les modifications dans l'ensemble du référentiel
Pour détecter les changements dans l'ensemble du référentiel, utilisez des patterns de chemin de fichier appropriés. Par exemple, `"**"` renvoie tous les fichiers.

**Exemple (schéma v2.2) :**

```yaml
extensions:
  datadoghq.com/cd-visibility:
    source_patterns:
      - "**"
```

Dans cet exemple, la détection des changements de code pour les déploiements du service `shopist` prend en compte les commits Git qui incluent des changements dans l'ensemble de l'arborescence du référentiel.

<div class="alert alert-danger">Si un pattern correspond exactement à <code>**</code> ou commence par ces caractères, ajoutez des guillemets autour des astérisques, car le caractère <code>*</code> est réservé aux ancres dans YAML.</div>


## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://git-scm.com/docs/git-log
[2]: https://app.datadoghq.com/ci/deployments/executions
[3]: https://app.datadoghq.com/ci/commits
[4]: /fr/tracing/software_catalog/adding_metadata
[5]: /fr/tracing/software_catalog