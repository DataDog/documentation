---
aliases:
- /fr/security/cloud_siem/detect_and_monitor/critical_assets/
further_reading:
- link: /security/cloud_siem/detect_and_monitor/suppressions/
  tag: Documentation
  text: Suppressions
products:
- icon: siem
  name: Cloud SIEM
  url: /security/cloud_siem/
- icon: cloud-security-management
  name: Workload Protection
  url: /security/workload_protection/
- icon: app-sec
  name: Protection des applications et des API
  url: /security/application_security/
title: Sévérité dynamique
---
{{< product-availability >}}

## Présentation {#overview}

La sévérité dynamique vous permet d'ajuster la sévérité des signaux de sécurité en fonction des actifs qu'ils affectent. Cela aide les analystes à hiérarchiser les signaux en fonction de l'importance commerciale de l'actif impacté en augmentant, en diminuant ou en maintenant la sévérité par défaut. Pour chaque actif, vous pouvez ajuster les niveaux de sévérité, appliquer des tags personnalisés et isoler les changements sur des règles spécifiques.

### Fonctionnement {#how-it-works}

- Si plusieurs règles de sévérité dynamique sont définies pour ajuster les niveaux de sévérité d'un signal de sécurité, le signal adopte automatiquement le niveau de sévérité le plus élevé. Par exemple, si une règle de sévérité dynamique définit la sévérité sur `MEDIUM` et qu'une autre la définit sur `HIGH`, la sévérité est `HIGH`.
- Si plusieurs règles de sévérité dynamique sont définies pour effectuer la même action sur les niveaux de sévérité d'un signal de sécurité, l'action ne s'applique qu'une seule fois. Par exemple, si deux règles de sévérité dynamique distinctes sont définies pour augmenter le niveau de sévérité d'un signal réglé sur `MEDIUM`, il n'augmente qu'une seule fois à `HIGH`, et non à nouveau à `CRITICAL`.

## Créer une règle de sévérité dynamique {#create-a-dynamic-severity-rule}

1. Dans Datadog, accédez à {{< ui >}}Security{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > [{{< ui >}}Dynamic Severity{{< /ui >}}][1], puis cliquez sur {{< ui >}}Create Dynamic Severity Rule{{< /ui >}}. La fenêtre Créer une règle de sévérité dynamique s'ouvre.
1. Sous {{< ui >}}Define Asset{{< /ui >}}, saisissez une requête pour définir l'actif.
1. Sous {{< ui >}}Choose Severity Adjustment{{< /ui >}}, choisissez comment vous souhaitez ajuster la sévérité des signaux de sécurité associés à l'actif.
   - Choisissez {{< ui >}}Increase{{< /ui >}} ou {{< ui >}}Decrease{{< /ui >}} pour commencer avec le niveau de sévérité par défaut, puis augmentez ou diminuez la sévérité d'un niveau.
   - Choisissez {{< ui >}}Maintain{{< /ui >}} pour conserver le niveau de sévérité par défaut.
   - Choisissez un niveau de sévérité spécifique pour appliquer systématiquement ce niveau, indépendamment de la sévérité initiale associée au signal.
1. (Facultatif) Sous {{< ui >}}Details{{< /ui >}}, ajoutez une description, des tags et des équipes à appliquer à la règle de sévérité dynamique.
1. Sous {{< ui >}}Select Detection Rules{{< /ui >}}, saisissez des règles de détection spécifiques pour restreindre les changements de la sévérité. Pour appliquer les changements à toutes les règles de détection, définissez la requête sur `*`.
1. Cliquez sur {{< ui >}}Save{{< /ui >}}. La fenêtre Créer une règle de sévérité dynamique se ferme et votre règle de sévérité dynamique apparaît dans le tableau, où vous pouvez l'activer ou la désactiver, ou exporter la configuration sous forme de fichiers Terraform ou JSON.

## Afficher les signaux affectés par une règle de sévérité dynamique {#view-the-signals-a-dynamic-severity-rule-affected}

1. Dans Datadog, accédez à {{< ui >}}Security{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > [{{< ui >}}Dynamic Severity{{< /ui >}}][1].
1. À côté d'une règle de sévérité dynamique, cliquez sur l'icône {{< ui >}}More Options{{< /ui >}} {{< img src="icons/kebab.png" inline="true" style="height:1em" >}}, puis cliquez sur {{< ui >}}Signals affected{{< /ui >}}. Le Signals Explorer, pré-rempli avec une requête pour afficher les signaux affectés, s'ouvre dans un nouvel onglet.

## Afficher les données de sévérité dynamique dans les signaux de sécurité {#view-dynamic-severity-data-in-security-signals}

Dans chaque signal de sécurité qu'une règle de sévérité dynamique a modifié, un indicateur {{< ui >}}Adjusted Severity{{< /ui >}} affiche à la fois le niveau de sévérité d'origine et le niveau ajusté. Vous pouvez survoler cet indicateur pour voir quel ajustement la règle de sévérité dynamique a appliqué :
{{< img src="security/security_monitoring/critical_assets_pill.png" alt="Indicateur de sévérité ajustée et fenêtre contextuelle, indiquant que la sévérité d'un signal CloudTrail a été augmentée de Faible à Moyenne" style="width:50%;" >}}

Sur l'onglet {{< ui >}}JSON{{< /ui >}} d'un signal de sécurité, vous pouvez également trouver l'objet `critical_assets_data`, qui inclut des informations sur les règles de sévérité dynamique qui lui sont associées et sur la manière dont elles ont affecté la sévérité du signal.
<div class="alert alert-info">Si le niveau de sévérité d'une règle de sévérité dynamique a été remplacé par un niveau de sévérité supérieur, il peut ne pas apparaître dans l' <code>critical_assets_data</code> objet.</div>

## Restreindre les autorisations de modification {#restrict-edit-permissions}

{{% security-products/dynamic-severity-granular-access %}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/configuration/dynamic-severity