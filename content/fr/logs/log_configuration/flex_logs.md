---
aliases:
- /fr/logs/log_configuration/flex_log/
description: Solution économique permettant d'interroger en direct des logs conservés
  à long terme
further_reading:
- link: https://www.datadoghq.com/blog/flex-logging
  tag: Blog
  text: Stocker et analyser efficacement des logs volumineux grâce à Flex Logs
- link: /logs/log_configuration/indexes
  tag: Documentation
  text: Index de logs
- link: /logs/log_configuration/archives
  tag: Documentation
  text: Archives de logs
kind: documentation
title: Flex Logs
---

{{< callout url="https://docs.google.com/forms/d/15FJG6RTFMmp7c7aRE8bcTy6B1Tt8ia4OmiesQa_zkZ4/viewform?edit_requested=true" btn_hidden="false" header="Request Access!">}}
L'accès à la solution Flex Logs est actuellement limité, mais vous pouvez utiliser dès aujourd'hui ce formulaire pour demander à y accéder.
{{< /callout >}}

## Présentation

Flex Logs dissocie le stockage et l'interrogation des logs. Cela vous permet de stocker tous vos logs et de choisir librement les cas d'utilisation qui vous intéressent. Vous pouvez conserver des logs volumineux pendant de longues périodes et stocker tous vos logs dans Datadog, pour tous les cas d'utilisation et budgets.

Les équipes de sécurité, de conformité et d'ingénierie ont régulièrement besoin d'interroger des logs couvrant une large période de temps. Les failles de sécurité sont généralement détectées des semaines, voire des mois, après les incidents. De plus, la révision et l'audit de la conformité juridique impliquent parfois l'utilisation de logs enregistrés il y a plus d'un an. Les équipes de sécurité ne sont pas les seules à devoir analyser des données à long terme. En effet, il arrive que les équipes d'ingénierie effectuent des analyses d'une année à une autre à partir de données avec une forte cardinalité, par exemple des millions d'entités telles que des utilisateurs, des hosts et des adresses IP. À cette fin, il est plus efficace de travailler à partir des logs plutôt qu'avec des métriques. 

Cette présentation met en avant les fonctionnalités principales du stockage de niveau Flex, les différences entre les options de stockage Standard et Flex pour les données de vos logs, ainsi que les cas d'utilisation du stockage de niveau Flex.

## Configurer les niveaux de stockage

Flex Logs se configure sur la page de configuration des index de logs. Les [filtres d'index][1] qui s'appliquent à un index s'appliquent également aux logs Flex.

Configurez le niveau Flex sur la page [Logs Index Configuration][2] :

1. Accédez à [**Logs > Configuration > Indexes**][2].
2. Modifiez l'index pour lequel vous souhaitez activer Flex Logs ou créez un nouvel index.
3. Sélectionnez **Flex Tier** et définissez la période de rétention sous *Configure Storage Tier and Retention*.

{{< img src="logs/log_configuration/flex_logging/flex_configuration.png" alt="Options du stockage de niveau Flex dans la configuration de l'index" style="width:100%;" >}}

**Remarques** :
- Si les deux niveaux sont sélectionnés, les logs sont stockés selon le niveau Standard jusqu'à la fin de la période de rétention configurée avant d'être stockés selon le niveau Flex. Par exemple, si vous sélectionnez le niveau Standard avec une période de rétention de 3 jours et le niveau Flex avec une période de rétention de 90 jours, les logs de cet index sont d'abord stockés selon le niveau Standard pendant 3 jours, puis ils sont stockés selon le niveau Flex pendant les 87 jours restants, soit un total de 90 jours.
- L'ajout du niveau Standard à un index Flex s'applique aux nouveaux logs, pas aux logs pré-existants de l'index Flex.

## Effectuer une recherche dans les index Flex

{{< img src="logs/log_configuration/flex_logging/flex_toggle_search.png" alt="Activer la journalisation Flex sur la page Log Explorer" style="width:100%;" >}}

Dans le Log Explorer, activez l'option **Include Flex Indexes** pour inclure les logs des index Flex dans vos résultats de recherche. Cette option est affichée à côté du sélecteur d'intervalle. 

[Effectuez une recherche][3] en saisissant votre requête dans la barre de recherche ou en sélectionnant la facette correspondante dans le volet des facettes.

## Cas d'utilisation du stockage Flex

Le stockage de niveau Flex s'avère utile lorsque la possibilité de réaliser des enquêtes de sécurité/d'audit de longue durée, l'exhaustivité des données et le respect des exigences de conformité priment sur les temps de réponse. Voici quelques exemples de cas d'utilisation du stockage Flex :
- Conserver les logs pour les audits à long terme.
- Conserver les logs pour des raisons de conformité et juridiques.
- Disposer de l'ensemble des logs pour les enquêtes de sécurité.
- Pouvoir interroger des logs pour créer des rapports et effectuer des analyses à partir de données avec une forte cardinalité couvrant de longues périodes.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}


[1]: /fr/logs/log_configuration/indexes/#indexes-filters
[2]: https://app.datadoghq.com/logs/pipelines/indexes
[3]: https://app.datadoghq.com/logs