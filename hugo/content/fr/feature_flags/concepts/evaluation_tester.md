---
description: Simulez comment un feature flag s'évalue pour une clé de ciblage donnée
  et des attributs, sans affecter les données de production.
further_reading:
- link: /feature_flags/concepts/targeting_rules
  tag: Documentation
  text: Règles de ciblage et filtres
- link: /feature_flags/concepts/saved_filters
  tag: Documentation
  text: Filtres enregistrés
- link: /feature_flags/concepts/environments
  tag: Documentation
  text: Environnements
- link: /feature_flags/concepts/evaluation_results
  tag: Documentation
  text: Résultats de l’évaluation des Feature Flags
title: Testeur d'évaluation
---
## Présentation {#overview}

Le testeur d'évaluation vous permet de simuler comment un feature flag s'évaluerait pour une clé de ciblage donnée et un ensemble d'attributs, sans appeler le SDK de votre application. Utilisez-le pour répondre à des questions telles que : « Quelle variante cet utilisateur verrait-il ? » ou « Pourquoi cette règle de ciblage n'a-t-elle pas correspondu ? » avant de déployer une modification.

Les évaluations effectuées via le testeur d'évaluation sont des simulations. Elles n'émettent pas d'événements d'exposition, ne sont pas comptabilisées dans les métriques ou les graphiques d'évaluation et n'affectent pas les statistiques d'expérience.

## Ouvrez le testeur d'évaluation {#open-the-evaluation-tester}

1. Accédez à [{{< ui >}}Feature Flags{{< /ui >}}][1] et sélectionnez un feature flag.
1. Sélectionnez l'onglet de l'[environnement][4] que vous souhaitez tester, par exemple {{< ui >}}Production{{< /ui >}} ou {{< ui >}}Staging{{< /ui >}}.
1. Sur la carte {{< ui >}}Targeting rules{{< /ui >}}, cliquez sur {{< ui >}}Test Rule Evaluation{{< /ui >}} pour ouvrir le panneau latéral {{< ui >}}Evaluation tester{{< /ui >}}.

{{< img src="feature_flags/concepts/evaluation-tester-canvas.png" alt="Bouton Tester l'évaluation des règles sur le canevas des règles de ciblage pour un feature flag." style="width:100%;" >}}

## Fournissez un contexte de ciblage {#provide-a-targeting-context}

Le testeur d'évaluation évalue les [règles de ciblage][3] de votre feature flag par rapport à un contexte de ciblage : une clé de ciblage et, éventuellement, un ensemble d'[attributs][2].

- Clé de ciblage (Obligatoire) : l'identifiant utilisé pour le compartimentage déterministe (par exemple, un identifiant utilisateur). La modification de la clé de ciblage peut changer la variante attribuée lorsqu'une règle utilise une répartition du trafic basée sur un pourcentage.
- Attributs (Facultatif) : valeurs utilisées pour évaluer les filtres de vos règles de ciblage, telles que `country`, `email` ou `tier`. En savoir plus sur les [Attributs de ciblage][2].

Vous pouvez fournir des valeurs pour la clé de ciblage et les attributs de deux manières :

- {{< ui >}}Form{{< /ui >}} : Datadog génère un champ de saisie pour la clé de ciblage et chaque attribut référencé par les règles de ciblage dans l'environnement sélectionné. Chaque champ d'attribut répertorie les règles qui y font référence. Si aucune règle de ciblage dans l'environnement ne fait référence à des attributs, le formulaire affiche uniquement la clé de ciblage.
- {{< ui >}}JSON{{< /ui >}} : Saisissez un objet JSON brut composé d'une clé de ciblage et d'attributs. Utilisez le mode JSON lorsque vous devez tester des valeurs d'attribut autres que des chaînes, telles que des nombres, des booléens, des tableaux ou des objets imbriqués.

Le [résultat de l'évaluation](#understand-the-result) se met à jour automatiquement à mesure que vous modifiez la clé de ciblage ou les attributs.

{{< img src="feature_flags/concepts/evaluation-tester-panel.png" alt="Panneau latéral du testeur d'évaluation avec une clé de ciblage, un attribut et un résultat." style="width:60%;" >}}

## Comprendre le résultat {#understand-the-result}

La section {{< ui >}}Result{{< /ui >}} affiche la variante qui serait attribuée pour le [contexte de ciblage](#provide-a-targeting-context) fourni, ainsi que le nom de la règle de ciblage qui a correspondu.

Développez {{< ui >}}How did I get this result?{{< /ui >}} pour voir une répartition règle par règle de l'évaluation :

- Les règles sont répertoriées dans l'ordre dans lequel elles sont évaluées.
- Chaque règle indique si elle a correspondu, si elle a été contournée (c'est-à-dire que le sujet ne correspondait pas au filtre de la règle, l'évaluation s'est donc poursuivie avec la règle suivante) ou si elle a été sautée (c'est-à-dire qu'elle était inaccessible compte tenu du résultat d'une règle précédente).
- Pour les règles avec un filtre, la répartition explique quelle condition a correspondu ou non (par exemple, `country matched US` ou `browser did not match is one of Chrome, Safari`).

{{< img src="feature_flags/concepts/evaluation-tester-breakdown.png" alt="Répartition détaillée de l'évaluation montrant quelle règle a correspondu et pourquoi." style="width:60%;" >}}

La règle correspondante est également mise en surbrillance sur le canevas {{< ui >}}Targeting rules{{< /ui >}}, afin que vous puissiez voir visuellement le chemin d'évaluation.

## Test d'un feature flag désactivé {#testing-a-disabled-flag}

Si le feature flag est désactivé dans l'environnement sélectionné, le testeur d'évaluation montre ce qu'un sujet recevrait si le feature flag était activé. Cette simulation diffère du comportement du SDK au moment de l'exécution : les SDK côté client et côté serveur renvoient la valeur par défaut fournie par votre application pour les feature flags désactivés. Rapport d'évaluations détaillées `ERROR` avec `FLAG_NOT_FOUND`. Pour plus d'informations, consultez [Flag Evaluation Results][5].

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/feature-flags
[2]: /fr/feature_flags/concepts/targeting_attributes/
[3]: /fr/feature_flags/concepts/targeting_rules/
[4]: /fr/feature_flags/concepts/environments/
[5]: /fr/feature_flags/concepts/evaluation_results/