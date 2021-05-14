---
title: Facturation des fonctions sans serveur
kind: documentation
---
## Présentation

Achetez des appels de fonction sans serveur avec les [offres Pro et Enterprise de Datadog][1]. La facturation Datadog repose sur la somme d'appels Lambda AWS sur un mois pour l'ensemble de vos comptes. Les offres Pro et Enterprise prévoient 150 000 spans indexées et 5 métriques custom par million d'appels facturés. Contactez le [service commercial][2] ou votre [chargé de compte][3] pour en savoir plus sur l'ajout de fonctions sans serveur pour votre compte.

**Remarque :** si vous utilisez un ancien modèle de facturation pour la surveillance de fonctions sans serveur Datadog, et souhaitez migrer vers une facturation basée sur les appels, contactez votre [chargé de compte][3].

**Remarque :** les spans indexées étaient auparavant désignées par le terme de « spans analysées ». Le changement de dénomination a eu lieu à l'occasion du lancement de Tracing Without Limits le 20 octobre 2020.

## Appels de fonction sans serveur

Pour sa facturation, Datadog calcule la somme de vos appels de fonction Lambda AWS à la fin de chaque mois.

Pour en savoir plus sur le tarif des fonctions sans serveur, consultez la [page de tarification de Datadog][1].

## Surveillance de l'utilisation

Vous pouvez surveiller le nombre d'appels de fonction sans serveur facturables de votre compte en consultant la [page Datadog Usage][4]. Vous pouvez consulter le résumé du mois en cours, ainsi que l'évolution de l'utilisation.

Pour contrôler le nombre de fonctions dont les appels sont surveillés par Datadog, excluez des fonctions spécifiques en appliquant un tri par tag dans [l'interface](#interface) ou à l'aide de l'[API](#api).

### Interface

Pour utiliser l'interface afin de contrôler les fonctions Lambda AWS surveillées par Datadog, accédez à la [page de l'intégration AWS][5] et ajoutez des tags sous la forme d'ensembles `key:value` dans le champ **to Lambdas with tag:**.

Pour exclure des fonctions avec un certain tag, ajoutez `!` devant la clé du tag. Exemple :

`!env:staging,!env:test1`

Ce filtre exclut tout le contenu avec le tag `env:staging` ou `env:test1`.

### API

Pour utiliser l'API pour contrôler la limite de fonctions Lambda AWS surveillées par Datadog, consultez la [documentation relative aux filtres de tags][6].

## Dépannage

Pour toute question technique, contactez [l'assistance Datadog][7].

Pour toute question concernant la facturation, contactez votre [chargé de compte][3].

[1]: https://www.datadoghq.com/pricing/?product=serverless#serverless
[2]: mailto:sales@datadoghq.com
[3]: mailto:success@datadoghq.com
[4]: https://app.datadoghq.com/account/usage
[5]: https://app.datadoghq.com/account/settings#integrations/amazon-web-services
[6]: /fr/api/latest/aws-integration/#set-an-aws-tag-filter
[7]: /fr/help/