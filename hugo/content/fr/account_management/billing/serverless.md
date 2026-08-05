---
title: Facturation des fonctions sans serveur
---

## Gestion de l'utliisation

Vous pouvez surveiller l'utilisation facturable et totale des fonctions sans serveur de votre compte en consultant la page Datadog Usage. Vous y trouverez le résumé du mois en cours, ainsi que l'évolution de l'utilisation.

La facturation de la surveillance sans serveur Datadog tient à la fois compte des invocations et des fonctions Lambda actives qui sont suivies et surveillées dans Datadog. Selon votre offre, les métriques pertinentes sont indiquées dans l'onglet Serverless de la page Plan and Usage (sous le [filtre Billable][1]). Pour en savoir plus sur votre offre et votre utilisation, contactez votre [chargé de compte][3].

Les fonctions Lambda peuvent être surveillées avec l'[intégration Datadog/AWS][10] ou par l'intermédiaire d'une instrumentation directe des couches de l'[extension Lambda][11] et du [Forwarder][12].

## Intégration

Pour choisir les fonctions qui sont surveillées à partir de l'intégration, vous pouvez utiliser les contrôles de collecte de métriques de l'[intégration Lambda][13] dans l'interface ou via l'API.

### Interface

Pour utiliser l'interface afin de contrôler les fonctions AWS Lambda surveillées par Datadog, accédez à la [page de l'intégration AWS][5]. Dans le volet latéral de gauche, sélectionnez le compte AWS pertinent, puis accédez à l'**onglet Metric Collection**. Faites défiler la page vers le bas jusqu'à atteindre l'en-tête **Limit Metric Collection to Specific Resources**, puis sélectionnez l'option Lambda dans la liste déroulante **Select AWS Service**. Vous pouvez alors ajouter des tags sous la forme d'ensembles `key:value` dans le champ sur la droite.

Consultez la rubrique [Tags](#tags) ci-dessous pour obtenir plus de détails sur l'utilisation des tags dans ce champ.

### API

Pour utiliser l'API afin de contrôler les fonctions AWS Lambda surveillées par Datadog, veuillez vous référer à la [documentation relative à l'API d'ajout de filtre de tag][6].

### Tags

Datadog accepte une liste de tags séparés par des virgules, au format `key:value`. Cette liste définit le filtre utilisé lors de la collecte de métriques à partir du service AWS associé. Ces paires `key:value` permettent à la fois d'inclure et d'exclure des tags. Pour exclure des tags, ajoutez le signe `!` avant la clé des tags. Il est également possible d'utiliser des wildcards, comme `?` (pour un seul caractère) et `*` (pour plusieurs caractères).

Le filtre exclut uniquement les ressources qui ne comportent aucun des tags autorisés, à savoir lorsque la liste des tags autorisés constitue une condition « OR ». 

Exemple : `datadog:monitored,env:production`

Ce filtre recueille uniquement les instances EC2 qui contiennent le tag `datadog:monitored` ou le tag `env:production`.

Si vous ajoutez une exclusion de tag à la liste, celle-ci est prioritaire. Ainsi, le tag en question ajoute une condition « AND ».

Exemple : `datadog:monitored,env:production,instance-type:c1.*,!region:us-east-1`

Ce filtre recueille uniquement les instances EC2 qui contiennent le tag `datadog:monitored` OU le tag `env:production` OU un tag instance-type avec pour valeur `c1.*`, ET qui ne contiennent PAS de tag `region:us-east-1`.

## Instrumentation

Datadog propose une [extension Lambda][14] ainsi que plusieurs couches Lambda permettant de tracer et de surveiller vos fonctions selon votre runtime. Les fonctions actives qui sont instrumentées et surveillées à l'aide de ces bibliothèques contribuent à l'utilisation facturée, même lorsque l'intégration AWS est désactivée.

Datadog fournit plusieurs outils afin de gérer l'installation et la configuration de ces bibliothèques. Ils permettent de faire évoluer et d'automatiser l'installation ou la gestion des bibliothèques Lambda Datadog. Pour en savoir plus, consultez la section [Installer la surveillance sans serveur pour AWS Lambda][15]. 

## Définition d'une fonction active

La facturation Datadog repose sur le nombre moyen de fonctions par heure sur un mois pour l'ensemble de vos comptes. Chaque heure, Datadog enregistre le nombre de fonctions exécutées une ou plusieurs fois et surveillées par votre compte Datadog. À la fin du mois, Datadog détermine le montant à facturer en calculant la moyenne horaire du nombre de fonctions enregistrées. Les offres Pro et Enterprise comprennent cinq métriques custom par fonction facturable. Une fonction facturable est définie par un ARN de fonction unique. Pour les fonctions Lambda@Edge, chaque fonction d'une région différente représente une fonction facturable distincte.

La facturation pour APM sans serveur dépend du nombre total d'invocations AWS Lambda associées aux spans APM ingérées sur un mois donné. Vous payez également pour le nombre total de [spans indexées][4] qui sont envoyées au service APM Datadog et qui dépassent la quantité incluse avec votre offre à la fin du mois. Les [hosts APM][4] ne sont pas facturés pour la surveillance sans serveur.

## Dépannage

Pour toute question d'ordre technique, contactez l'[assistance Datadog][7]. Pour obtenir davantage d'informations sur votre facturation ou sur votre offre et votre utilisation, contactez votre [chargé de compte][3].

[1]: https://app.datadoghq.com/billing/usage?category=serverless&data_source=billable
[2]: mailto:sales@datadoghq.com
[3]: mailto:success@datadoghq.com
[4]: https://app.datadoghq.com/account/usage
[5]: https://app.datadoghq.com/account/settings#integrations/amazon-web-services
[6]: /fr/api/latest/aws-integration/#set-an-aws-tag-filter
[7]: /fr/help/
[8]: https://app.datadoghq.com/functions
[9]: https://app.datadoghq.com/metric/explorer?exp_metric=aws.lambda.invocations&exp_group=functionname&exp_agg=sum
[10]: /fr/integrations/amazon_billing/
[11]: /fr/serverless/libraries_integrations/extension/
[12]: /fr/logs/guide/forwarder/
[13]: /fr/integrations/amazon_lambda/
[14]: /fr/serverless/aws_lambda
[15]: /fr/serverless/installation/