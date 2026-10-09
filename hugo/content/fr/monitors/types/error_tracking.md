---
aliases:
- /fr/monitors/create/types/error_tracking/
description: Découvrez le type de monitor Error Tracking.
further_reading:
- link: /error_tracking/issue_states/
  tag: Documentation
  text: Découvrez les états d'Error Tracking et leur impact sur les monitors
- link: /error_tracking/
  tag: Documentation
  text: Découvrez Error Tracking pour le Web, le Mobile et le Backend
- link: /monitors/notify/
  tag: Documentation
  text: Configurer les notifications de vos monitors
- link: /monitors/downtimes/
  tag: Documentation
  text: Planifier un downtime pour désactiver un monitor
- link: /monitors/status/
  tag: Documentation
  text: Vérifier le statut de votre monitor
title: Monitor Error Tracking
---
## Présentation {#overview}

Datadog [Error Tracking][1] regroupe automatiquement toutes vos erreurs en problèmes dans vos applications web, mobiles et backend. Visualiser les erreurs regroupées en problèmes vous aide à prioriser et à trouver les problèmes les plus impactants, facilitant ainsi la réduction des temps d'arrêt des services et la frustration des utilisateurs.

Avec Error Tracking activé pour votre organisation, vous pouvez créer un monitor Error Tracking pour vous alerter lorsqu'un problème dans votre application web ou mobile, votre service backend ou vos logs est nouveau, lorsqu'il a un impact élevé ou lorsqu'il commence à régresser.

## Créer un monitor Error Tracking {#create-an-error-tracking-monitor}

Pour créer un monitor Error Tracking dans Datadog, accédez à [{{< ui >}}Monitors{{< /ui >}} > {{< ui >}}New Monitor{{< /ui >}} > {{< ui >}}Error Tracking{{< /ui >}}][3].

<div class="alert alert-info">Il existe une limite par défaut de 1000 monitors Error Tracking par compte. <a href="/help/">Contactez le support</a> pour augmenter cette limite pour votre compte.</div>

### Sélectionnez la condition d'alerte {#select-the-alerting-condition}

Il existe deux types de conditions d'alerte avec lesquelles vous pouvez configurer votre monitor Error Tracking :

| Condition d'alerte     | Description    |
| ---  | ----------- |
|Nouveau problème| Alertez lorsqu'un problème survient pour la première fois ou qu'une régression se produit. Par exemple, alertez pour votre service chaque fois que plus de 2 utilisateurs sont impactés par une nouvelle erreur. |
|Impact élevé| Alertez sur les problèmes ayant un nombre élevé d'utilisateurs finaux impactés. Par exemple, alertez pour votre service chaque fois que plus de 500 utilisateurs sont impactés par cette erreur. |

### Définir les conditions d'alerte {#define-alert-conditions}

{{< tabs >}}

{{% tab "Nouveau problème" %}}
#### Problèmes sur lesquels alerter {#issues-to-alert-on}

Les nouveaux monitors de problèmes alertent sur les problèmes qui sont dans l'état {{< ui >}}For Review{{< /ui >}} et qui répondent à vos conditions d'alerte. Les régressions sont automatiquement transférées vers l'état À examiner, elles sont donc surveillées par défaut avec les monitors de nouveaux problèmes. Pour plus d'informations sur les états, consultez [États des problèmes][1].

Sélectionnez les problèmes {{< ui >}}All{{< /ui >}}, {{< ui >}}Browser{{< /ui >}}, {{< ui >}}Mobile{{< /ui >}} ou {{< ui >}}Backend{{< /ui >}} et construisez une requête de recherche en utilisant la même logique que la [recherche dans l'Error Tracking Explorer][2] pour les occurrences d'erreurs des problèmes.

<div class="alert alert-info">Les monitors de nouveaux problèmes ne prennent en compte que les problèmes créés ou ayant régressé après la création ou la dernière modification du monitor. Ces monitors ont une période de rétrospection de 24 heures.</div>

#### Définir le seuil d'alerte {#define-alert-threshold}

Choisissez l'une des options suivantes :

{{% collapse-content title="Alerter sur tous les nouveaux problèmes" level="p" %}}


Le monitor se déclenche lorsqu'un nouveau problème est détecté (le nombre d'erreurs est supérieur à 0 au cours de la journée écoulée).

{{% /collapse-content %}}

{{% collapse-content title="Définissez votre métrique d'alerte" level="p" %}}

1. Choisissez la métrique que vous souhaitez surveiller. Il existe trois options de filtrage suggérées pour accéder aux facettes les plus fréquemment utilisées :

    - {{< ui >}}Error Occurrences{{< /ui >}} : Se déclenche lorsque le nombre d'erreurs est `above`.
    - {{< ui >}}Impacted Users{{< /ui >}} : Se déclenche lorsque le nombre d'e-mails d'utilisateurs impactés est `above`.
    - {{< ui >}}Impacted Sessions{{< /ui >}} : Se déclenche lorsque le nombre d'ID de session impactés est `above`.

    Si vous sélectionnez {{< ui >}}All{{< /ui >}} ou {{< ui >}}Backend{{< /ui >}} problèmes, seule l'option {{< ui >}}Error Occurrences{{< /ui >}} est disponible.

    Vous pouvez également spécifier une mesure personnalisée que vous souhaitez utiliser pour la surveillance. Si vous sélectionnez une mesure personnalisée, le monitor alerte lorsque le nombre de valeurs uniques de la facette est `above`.

2. Recevez une notification pour chaque problème correspondant à votre requête et regroupez les résultats par tout autre attribut souhaité (par exemple, recevez une notification pour chaque problème correspondant à la requête, et par environnement).

3. Interrogez les données sur le dernier jour (par défaut) ou sur toute autre fenêtre temporelle à chaque évaluation.

4. Choisissez un seuil pour le déclenchement du monitor (par défaut 0 - se déclenche dès la première occurrence).

{{% /collapse-content %}}


#### Gestion programmatique {#programmatic-management}

Si vous utilisez Terraform ou des scripts personnalisés via nos API publiques pour gérer vos monitors, vous devez spécifier certaines clauses dans la requête du monitor :
* Ajoutez la source que vous souhaitez cibler entre les problèmes {{< ui >}}All{{< /ui >}}, {{< ui >}}Browser{{< /ui >}}, {{< ui >}}Mobile{{< /ui >}} et {{< ui >}}Backend{{< /ui >}}. Utilisez la clause `.source()` avec `"all"`, `"browser"`, `"mobile"` ou `"backend"` juste après votre filtre. **Remarque** : vous ne pouvez en utiliser qu'une à la fois.
* Assurez-vous d'utiliser la clause `.new()` pour les monitors de nouveaux problèmes.

Exemple :

```yaml
error-tracking("{filter}").source("backend").new().rollup("count").by("issue.id").last("1d") > 0
```

[1]: /fr/error_tracking/issue_states
[2]: /fr/error_tracking/explorer
[3]: /fr/monitors/configuration/#alert-grouping/
{{% /tab %}}

{{% tab "Impact élevé" %}}
#### Problèmes sur lesquels alerter {#issues-to-alert-on-1}

Les monitors à impact élevé alertent sur les problèmes qui sont {{< ui >}}For Review{{< /ui >}} ou {{< ui >}}Reviewed{{< /ui >}} et qui répondent à vos conditions d'alerte. En savoir plus sur les [États des problèmes][1].

Sélectionnez les problèmes {{< ui >}}All{{< /ui >}}, {{< ui >}}Browser{{< /ui >}}, {{< ui >}}Mobile{{< /ui >}} ou {{< ui >}}Backend{{< /ui >}} et construisez une requête de recherche en utilisant la même logique que la [recherche dans l'Error Tracking Explorer][2] pour les occurrences d'erreurs des problèmes.

#### Définir le seuil d'alerte{#define-alert-threshold-1}
1. Choisissez la métrique que vous souhaitez surveiller. Il existe trois options de filtrage suggérées pour accéder aux facettes les plus fréquemment utilisées :

    - {{< ui >}}Error Occurrences{{< /ui >}} : Se déclenche lorsque le nombre d'erreurs est `above`.
    - {{< ui >}}Impacted Users{{< /ui >}} : Se déclenche lorsque le nombre d'e-mails d'utilisateurs impactés est `above`.
    - {{< ui >}}Impacted Sessions{{< /ui >}} : Se déclenche lorsque le nombre d'ID de session impactés est `above`.

    Si vous sélectionnez {{< ui >}}All{{< /ui >}} ou {{< ui >}}Backend{{< /ui >}} problèmes, seule l'option {{< ui >}}Error Occurrences{{< /ui >}} est disponible.

    Vous pouvez également spécifier une mesure personnalisée que vous souhaitez utiliser pour la surveillance. Si vous sélectionnez une mesure personnalisée, le monitor alerte lorsque le nombre de valeurs uniques de la facette est `above`.

2. Recevez une notification pour chaque problème correspondant à votre requête et regroupez les résultats par tout autre attribut requis (par exemple, recevez une notification pour chaque problème correspondant à la requête, et pour chaque environnement).

3. Interrogez les données sur le dernier jour (par défaut) ou sur toute autre fenêtre temporelle à chaque évaluation.

4. Choisissez un seuil pour le déclenchement du monitor (par défaut 0 - se déclenche dès la première occurrence).

#### Gestion programmatique {#programmatic-management-1}

Si vous utilisez Terraform ou des scripts personnalisés via nos API publiques pour gérer vos monitors, vous devez spécifier certaines clauses dans la requête du monitor :
* Ajoutez la source que vous souhaitez cibler entre les problèmes {{< ui >}}All{{< /ui >}}, {{< ui >}}Browser{{< /ui >}}, {{< ui >}}Mobile{{< /ui >}} et {{< ui >}}Backend{{< /ui >}}. Utilisez la clause `.source()` avec `"all"`, `"browser"`, `"mobile"` ou `"backend"` juste après votre filtre. **Remarque** : vous ne pouvez en utiliser qu'une à la fois.
* Assurez-vous d'utiliser la clause `.impact()` pour les monitors à impact élevé.

Exemple :

```yaml
error-tracking("{filter}").source("browser").impact().rollup("count").by("issue.id").last("1d") > 0
```

[1]: /fr/error_tracking/issue_states
[2]: /fr/error_tracking/explorer
{{% /tab %}}
{{< /tabs >}}

### Notifications {#notifications}

Pour afficher les tags de déclenchement dans le titre de la notification, cliquez sur {{< ui >}}Include triggering tags in notification title{{< /ui >}}.

En plus des [variables d'attributs correspondantes][7], les variables spécifiques à Error Tracking suivantes sont disponibles
pour les notifications de message d'alerte :

* `{{issue.attributes.error.type}}`
* `{{issue.attributes.error.message}}`
* `{{issue.attributes.error.stack}}`
* `{{issue.attributes.error.file}}`
* `{{issue.attributes.error.is_crash}}`
* `{{issue.attributes.error.category}}`
* `{{issue.attributes.error.handling}}`

Pour plus d'informations sur la section {{< ui >}}Configure notifications and automations{{< /ui >}}, consultez [Notifications][5].

Sélectionnez l'alerte multiple pour recevoir une notification par problème. Ceci est l'expérience prévue pour les monitors Error Tracking.

### Mise en sourdine des monitors {#muting-monitors}
Les monitors Error Tracking utilisent les [états des problèmes][2] pour garantir que vos alertes restent concentrées sur les questions hautement prioritaires, réduisant ainsi les distractions causées par des problèmes non critiques.

{{< ui >}}Ignored{{< /ui >}} Les problèmes sont des erreurs ne nécessitant aucune investigation ou action supplémentaire. En marquant les problèmes comme {{< ui >}}Ignored{{< /ui >}}, ces problèmes sont automatiquement mis en sourdine dans les notifications du monitor.

## Dépannage {#troubleshooting}

### Les monitors de nouveaux problèmes ne prennent pas en compte l'ancienneté du problème {#new-issue-monitors-do-not-take-into-account-issue-age}
`issue.age` et `issue.regression.age` ne sont pas ajoutés par défaut car ils peuvent entraîner des alertes manquées. Par exemple, si un problème apparaît pour la première fois dans `env:staging` puis, une semaine plus tard, apparaît dans `env:prod` pour la première fois, le problème serait considéré comme ayant une semaine d'ancienneté et ne déclencherait pas d'alerte dans `env:prod` pour la première fois.

Par conséquent, Datadog ne recommande pas l'utilisation de `issue.age` et `issue.regression.age`. Cependant, si le comportement du monitor basé sur l'état ne vous convient pas, ces filtres peuvent toujours être utilisés s'ils sont spécifiés manuellement.

**Remarque** : Si vous prévoyez d'utiliser `issue.age` et `issue.regression.age` dans votre monitor, cette clé de filtre n'est pas cohérente entre les produits. Par exemple, il pourrait s'agir de `@issue.age` ou `issue.age`.

### Les monitors de nouveaux problèmes génèrent trop de bruit {#new-issue-monitors-are-generating-too-much-noise}
Les monitors de nouveaux problèmes déclenchent des alertes sur les problèmes marqués {{< ui >}}For Review{{< /ui >}} qui répondent à vos critères d'alerte. Si les problèmes ne sont pas correctement triés (marqués comme {{< ui >}}Reviewed{{< /ui >}}, {{< ui >}}Ignored{{< /ui >}} ou {{< ui >}}Resolved{{< /ui >}}), un monitor de nouveaux problèmes peut se déclencher plus d'une fois pour le même problème si celui-ci fluctue entre les états OK et ALERT.

Si vos monitors génèrent trop de bruit, envisagez les ajustements suivants :
- **Triez vos alertes** : définissez les problèmes sur {{< ui >}}Reviewed{{< /ui >}}, {{< ui >}}Ignored{{< /ui >}} ou {{< ui >}}Resolved{{< /ui >}} lorsque cela est approprié
- **Étendez la fenêtre temporelle d'évaluation** : la fenêtre d'évaluation par défaut est de 1 jour. Si les erreurs se produisent rarement (par exemple, un jour sur deux), le monitor peut basculer entre les états OK et ALERT. L'extension de la fenêtre permet d'éviter les redéclenchements et maintient le monitor dans l'état ALERT.
- **Augmentez le seuil d'alerte** : le seuil par défaut est défini sur `0`, ce qui signifie que les alertes se déclenchent dès la première occurrence d'un nouveau problème. Pour réduire le bruit causé par des erreurs ponctuelles ou sporadiques, augmentez le seuil pour n'alerter qu'après plusieurs occurrences d'une erreur

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/error_tracking/issue_states
[2]: /fr/error_tracking/explorer
[3]: https://app.datadoghq.com/monitors/create/error-tracking
[4]: /fr/monitors/configuration/#advanced-alert-conditions
[5]: /fr/monitors/notify/
[6]: /fr/logs/
[7]: /fr/monitors/notify/variables/#matching-attributetag-variables