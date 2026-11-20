---
description: Découvrez comment CD Visibility détecte les modifications de code.
further_reading:
- link: /continuous_delivery/deployments/
  tag: Documentation
  text: En savoir plus sur Deployment Visibility
- link: /continuous_delivery/explorer
  tag: Documentation
  text: Découvrez comment interroger et visualiser les déploiements
title: Détection des modifications de code
---
{{< callout btn_hidden="true" header="faux" >}}
CD Visibility est en préversion. L'accès est limité aux organisations déjà inscrites.
{{< /callout >}}

## Présentation {#overview}

Code Changes Detection permet à Datadog d'identifier les commits introduits dans le cadre d'un déploiement. Ceci est particulièrement utile pour :
- Comprendre où des modifications spécifiques ont été déployées, par exemple pour suivre le moment où les mises à jour atteignent l'environnement `production`.
- Diagnostiquer les incidents liés à un déploiement en offrant une visibilité sur les modifications exactes introduites. Cela aide les équipes à identifier rapidement les causes profondes potentielles et à accélérer le dépannage.

Pour détecter les modifications de code déployées, Datadog exécute le [`git log`][1] entre le SHA du commit de déploiement actuel et le SHA du commit de déploiement précédent. Les commits de fusion sont exclus du calcul.

Les modifications de code déployées sont visibles dans toute exécution de déploiement sur la [page Deployment Executions][2]. L'onglet {{< ui >}}Code Changes{{< /ui >}} affiche le déploiement précédent pris en compte, ainsi que les modifications de code détectées entre les deux.

{{< img src="continuous_delivery/features/code_changes_tab.png" alt="Onglet Code Changes pour la fonctionnalité Code Changes Detection" style="width:100%;">}}

De plus, la colonne {{< ui >}}Deployments{{< /ui >}} de la page [Recent Code Changes][3] affiche les détails du service et de l'environnement pour tous les déploiements incluant un commit spécifique. Cette vue permet de comprendre rapidement si vos modifications de code sont déployées et où elles le sont.
Le survol de la valeur du service révèle si le déploiement a atteint tous les environnements attendus, en fonction de l'endroit où le service est généralement déployé.

{{< img src="continuous_delivery/features/recent_code_changes_deployments.png" alt="Affichage des déploiements sur la page Recent Code Changes" style="width:100%;">}}

Les modifications de code ne sont détectées que pour les déploiements qui :
- Possèdent un service (`@deployment.service`) avec des spécifications de chemins de fichiers définies dans Catalog (voir les [instructions de configuration](#specify-service-file-path-patterns) pour plus d'informations).
- Possèdent un environnement (`@deployment.env`).
- Possèdent une URL de dépôt (`@deployment.git.repository_url`) et un SHA de commit (`@deployment.git.commit.sha`).

## Configuration {#setup}

Pour activer Code Changes Detection sur vos déploiements, deux étapes sont nécessaires :
1. [Synchronisez les métadonnées de votre dépôt avec Datadog](#synchronize-repository-metadata-to-datadog).
2. [Spécifiez le chemin d'accès aux fichiers de code source pour vos services](#specify-service-file-path-patterns).

### Synchronisez les métadonnées du dépôt avec Datadog {#synchronize-repository-metadata-to-datadog}

<!--
The Following tabs were mostly copied from the Source Code Integration docs until we find a way to document this in a shared page
https://docs.datadoghq.com/integrations/guide/source-code-integration/?tab=github#synchronize-your-repository-metadata
-->

{{< tabs >}}
{{% tab "GitHub" %}}

<div class="alert alert-danger">
Les workflows GitHub exécutés par le <a href="https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#pull_request"> <code>pull_request</code> déclencheur </a> ne sont pas pris en charge par l'intégration GitHub.
Si vous utilisez le <code>pull_request</code> déclencheur, utilisez la méthode alternative.
</div>

Si l'[intégration GitHub][1] n'est pas déjà installée, installez-la sur la [tuile d'intégration GitHub][2].

Lors de la configuration de l'application GitHub :
1. Sélectionnez au moins {{< ui >}}Read{{< /ui >}} autorisations de dépôt pour {{< ui >}}Contents{{< /ui >}} et {{< ui >}}Pull Requests{{< /ui >}}.
2. Abonnez-vous au moins aux événements {{< ui >}}Push{{< /ui >}}, {{< ui >}}PullRequest{{< /ui >}} et {{< ui >}}PullRequestReview{{< /ui >}}.

Pour confirmer que la configuration est valide, sélectionnez votre GitHub App dans la [tuile d'intégration GitHub][2] et vérifiez que, dans le tableau {{< ui >}}Datadog Features{{< /ui >}}, la fonctionnalité {{< ui >}}Pull Request Information{{< /ui >}} est marquée comme valide.

[1]: https://docs.datadoghq.com/fr/integrations/github/
[2]: https://app.datadoghq.com/integrations/github/
{{% /tab %}}

{{% tab "GitLab" %}}

Suivez le [parcours d'intégration dans l'application][1] pour configurer l'intégration GitLab Source Code.

**Remarque** : Le périmètre du jeton d'accès personnel du compte de service doit être au moins `read_api`.

[1]: https://app.datadoghq.com/integrations/gitlab-source-code?subPath=configuration
{{% /tab %}}

{{% tab "Autres fournisseurs Git" %}}

Vous pouvez télécharger les métadonnées de votre dépôt Git avec la commande [`datadog-ci git-metadata upload`][1].
Lorsque cette commande est exécutée, Datadog reçoit l'URL du dépôt, le SHA du commit de la branche actuelle et une liste des chemins de fichiers suivis.

Exécutez cette commande en CI pour chaque nouveau commit. Lorsqu'un déploiement est exécuté pour un SHA de commit spécifique, assurez-vous que la commande `datadog-ci git-metadata upload` est exécutée pour ce commit **avant** que l'événement de déploiement ne soit envoyé.

<div class="alert alert-danger">
Ne fournissez pas l'option <code>--no-gitsync</code> à la commande <code>datadog-ci git-metadata upload</code> .
Lorsque cette option est incluse, les informations sur le commit ne sont pas envoyées à Datadog et les modifications ne sont pas détectées.
</div>

Vous pouvez valider la configuration correcte de la commande en vérifiant la sortie de la commande. Un exemple de sortie correcte est :

```
Reporting commit 007f7f466e035b052415134600ea899693e7bb34 from repository git@github.com:organization/example-repository.git.
180 tracked file paths will be reported.
✅  Handled in 0.077 seconds.
```

[1]: https://github.com/DataDog/datadog-ci/tree/master/packages/base/src/commands/git-metadata
{{% /tab %}}
{{< /tabs >}}

### Spécifiez les modèles de chemins de fichiers du service {#specify-service-file-path-patterns}

Pour comprendre correctement les modifications de code introduites par un déploiement, seuls les commits affectant le service déployé doivent être pris en compte.

Cela peut être fait dans [Catalog][5] en spécifiant, pour les services concernés, les modèles de chemin de fichier glob du code source dans la [définition de service][4].

Si la définition de service contient une URL **complète** GitHub ou GitLab vers le dossier de l'application, un modèle de chemin unique est automatiquement utilisé. Le type de lien doit être **repo** et le nom du lien doit être soit « Source », soit le nom du service (`shopist` dans les exemples ci-dessous).

Si votre dépôt contient un seul service et que vous souhaitez que tous les répertoires soient pris en compte pour les modifications de code, vous pouvez ignorer cette étape. Si vous déployez deux services ou plus à partir d'un dépôt, vous devez spécifier les modèles de chemins de fichiers du code source.

**Exemple (version de schéma v2.2) :**

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

Code Changes Detection pour les déploiements du service `shopist` ne prend en compte que les commits Git qui incluent des modifications dans le chemin `src/apps/shopist/**`. Vous pouvez configurer un contrôle plus granulaire en utilisant `extensions[datadoghq.com/cd-visibility]` ou `extensions[datadoghq.com/dora-metrics]`. Si les deux extensions sont détectées, `extensions[datadoghq.com/cd-visibility]` est utilisé.**Exemple (version de schéma v2.2) :**

```yaml
extensions:
  datadoghq.com/cd-visibility:
    source_patterns:
      - src/apps/shopist/**
      - src/libs/utils/**
```

Code Changes Detection pour les déploiements du service `shopist` ne prend en compte que les commits Git qui incluent des modifications dans les chemins `src/apps/shopist/**` ou `src/libs/utils/**`.

Si les modèles de code source d'un service sont définis à la fois dans un lien et dans une extension, seule l'extension est prise en compte lors du filtrage des commits.

#### Utilisez des modèles de chemins de fichiers du service pour suivre les modifications dans l'ensemble du dépôt {#use-service-file-path-patterns-to-track-changes-across-the-entire-repository}
Pour détecter les modifications dans l'ensemble du dépôt, utilisez des modèles de chemins de fichiers appropriés. Par exemple, `"**"` correspond à tous les fichiers.**Exemple (version de schéma v2.2) :**

```yaml
extensions:
  datadoghq.com/cd-visibility:
    source_patterns:
      - "**"
```

Dans ce cas, Code Changes Detection pour les déploiements du service `shopist` prend en compte les commits Git qui incluent des modifications dans toute l'arborescence du dépôt.

<div class="alert alert-danger">Si un modèle est exactement <code>**</code> ou commence par celui-ci, mettez-le entre guillemets, car <code>*</code> est réservé dans YAML pour les ancres.</div>


## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://git-scm.com/docs/git-log
[2]: https://app.datadoghq.com/ci/deployments/executions
[3]: https://app.datadoghq.com/ci/commits
[4]: /fr/internal_developer_portal/catalog/entity_model/
[5]: /fr/internal_developer_portal/catalog/