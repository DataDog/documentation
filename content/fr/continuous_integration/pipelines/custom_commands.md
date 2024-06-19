---
aliases:
- /fr/continuous_integration/setup_pipelines/custom_commands/
further_reading:
- link: /continuous_integration/pipelines/custom_commands/
  tag: Documentation
  text: Dépannage CI
title: Ajouter des commandes personnalisées à des traces de pipeline
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">La solution CI Visibility n'est pas disponible pour le site que vous avez sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

Les commandes personnalisées vous permettent de tracer des commandes individuelles dans vos pipelines de CI. Vous pouvez ainsi mesurer la durée de votre commande, sans tenir compte des actions de configuration ou de nettoyage que la tâche peut comporter (par exemple, le temps passé à télécharger des images Docker ou à attendre un nœud disponible dans une infrastructure basée sur Kubernetes). Ces spans s'affichent dans la trace du pipeline :

{{< img src="ci/ci-custom-spans.png" alt="Détails d'un pipeline avec des commandes personnalisées" style="width:100%;">}}

## Compatibilité

Les commandes personnalisées sont compatibles avec les fournisseurs de CI suivants :

- Jenkins avec le plug-in Datadog v3.2.0+
- CircleCI

## Installer l'interface de ligne de commande Datadog CI

Installez l'interface de ligne de commande [`datadog-ci`][1] (>=v0.17.0) de façon globale avec `npm` :

{{< code-block lang="shell" >}}
npm install -g @datadog/datadog-ci
{{< /code-block >}}

## Tracer une commande

Pour tracer une commande, exécutez ce qui suit :

{{< code-block lang="shell" >}}
datadog-ci trace [--name <nom>] -- <commande>
{{< /code-block >}}

Indiquez une [clé d'API Datadog][2] valide dans la variable d'environnement `DATADOG_API_KEY`. Exemple :

{{< site-region region="us,us3,eu,ap1" >}}
<pre>
<code>
DATADOG_API_KEY=&lt;key&gt; DATADOG_SITE={{< region-param key="dd_site" >}} datadog-ci trace \
--name "Greet" \
-- \
echo "Hello World"
</code>
</pre>
{{< /site-region >}}
{{< site-region region="us5,gov" >}}
<div class="alert alert-warning">La solution CI Visibility n'est pas disponible pour le site que vous avez sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

## Paramètres de configuration

Les options ci-dessous sont disponibles pour la commande `datadog-ci trace` :

`--name`
: Nom d'affichage de la commande personnalisée.<br/>
**Valeur par défaut** : même valeur que `<commande>`<br/>
**Exemple** : `Wait for DB to be reachable`

`--tags`
: Paires key/value au format `key:value` à associer à la commande personnalisée (le paramètre `--tags` peut être fourni plusieurs fois). Lorsque vous spécifiez des tags avec `DD_TAGS`, séparez-les par des virgules (par exemple, `team:backend,priority:high`).<br/>
**Variable d'environnement** : `DD_TAGS`<br/>
**Valeur par défaut** : (aucune)<br/>
**Exemple** : `team:backend`<br/>
**Remarque** : les tags spécifiés avec `--tags` et avec la variable d'environnement `DD_TAGS` sont fusionnés. Si `--tags` et `DD_TAGS` comportent la même clé, la valeur de `DD_TAGS` est prioritaire.

`--no-fail`
: Empêche tout échec de datadog-ci, même en cas d'exécution dans un fournisseur de CI non pris en charge. Dans ce cas, la commande est exécutée et aucune donnée n'est transmise à Datadog.<br/>
**Valeur par défaut** : `false`

Arguments positionnels
: La commande qui est lancée et tracée.

Les variables d'environnement suivantes sont prises en charge :

`DATADOG_API_KEY` (requis)
: La [clé d'API Datadog][2] utilisée pour authentifier les requêtes.<br/>
**Valeur par défaut** : (aucune)

{{< site-region region="us3,us5,eu,ap1" >}}
En outre, configurez le site Datadog sur le site sélectionné ({{< region-param key="dd_site_name" >}}) :

`DATADOG_SITE`
: Le site Datadog vers lequel télécharger les résultats.<br/>
**Valeur par défaut** : `datadoghq.com`<br/>
**Site sélectionné** : {{< region-param key="dd_site" code="true" >}}
{{< /site-region >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.npmjs.com/package/@datadog/datadog-ci
[2]: https://app.datadoghq.com/organization-settings/api-keys