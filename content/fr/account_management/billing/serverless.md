---
title: Facturation des fonctions sans serveur
kind: documentation
---
## Présentation

Achetez des fonctions sans serveur avec les [offres Pro et Enterprise de Datadog][1]. La facturation Datadog repose sur le nombre moyen de fonctions par heure sur un mois pour l'ensemble de vos comptes. Les offres Pro et Enterprise prévoient 40 métriques custom par fonction facturée. Contactez le [service commercial][2] ou votre [chargé de compte][3] pour en savoir plus sur l'ajout de fonctions sans serveur pour votre compte.

## Fonctions sans serveur

Chaque heure, Datadog enregistre le nombre de fonctions exécutées une ou plusieurs fois et surveillées par votre compte Datadog. À la fin du mois, Datadog détermine le montant à facturer en calculant la moyenne horaire du nombre de fonctions enregistrées.

Le nombre de fonctions facturées est la plupart du temps considérablement moins élevé que la valeur affichée sur la page Serverless ou dans votre console AWS, en raison du système de mesure des moyennes horaires. Les fonctions qui s'exécutent peu fréquemment sont moins susceptibles d'augmenter vos coûts. Une hausse soudaine de leur trafic n'aura qu'une faible incidence financière.

Pour en savoir plus sur le tarif des fonctions sans serveur, consultez la section Infrastructure de la [page de tarification de Datadog][1].

## Surveillance de l'utilisation

Vous pouvez surveiller le nombre de fonctions sans serveur facturables de votre compte en consultant la [page Datadog Usage][4]. Vous pouvez consulter le résumé du mois en cours, ainsi que l'évolution de l'utilisation.

Pour contrôler le nombre de fonctions surveillées par Datadog, excluez des fonctions spécifiques en appliquant un tri par tag dans [l'IU](#iu) ou à l'aide de l'[API](#api).

### IU

Pour utiliser l'IU afin de contrôler le nombre de fonctions surveillées par Datadog, accédez à la [page de l'intégration AWS][5] et ajoutez des tags sous la forme d'ensembles `key:value` dans le champ **to Lambdas with tag:**.

Ajoutez `!` devant la clé d'un tag pour l'exclure. Par exemple :

`!env:staging,!env:test1`

Ce filtre exclut tout le contenu avec le tag `env:staging` ou `env:test1`.

### API

L'API AWS fonctionne uniquement avec l'endpoint du site américain.

**Affichage des règles actuelles de filtrage des tags**
```
curl -X GET 'https://app.datadoghq.com/api/v1/integration/aws/filtering?api_key=<clé_api>&application_key=<clé_app>' --data '{"account_id": "<id_compte_aws>"}'

>{"filters":[{"tag_filter_str":"!copper:educated","namespace":"application_elb"}]}
```

**Définition d'une règle de filtrage de tags pour un espace de nommage** : les espaces de nommage autorisés sont `"application_elb"`, `"elb"`, `"lambda"`, `"network_elb"`, `"rds"`, `"sqs"` et `"custom"`.

```
curl -X POST 'https://app.datadoghq.com/api/v1/integration/aws/filtering?api_key=<clé_api>&application_key=<clé_app>' --data '{"account_id": "<id_compte_aws>", "namespace": "application_elb", "tag_filter_str": "!copper:educated"}'  -H "Content-Type: text/plain"
```

**Suppression d'une règle de filtrage de tags pour un espace de nommage**

```
curl -X DELETE 'https://app.datadoghq.com/api/v1/integration/aws/filtering?api_key=<clé_api>&application_key=<clé_app>'  --data '{"account_id": "<id_compte_aws>","namespace":"<espacedenommage>"}'
```

## Dépannage

Pour toute question technique, contactez [l'assistance Datadog][6].

Pour toute question concernant la facturation, contactez votre [chargé de compte][3].

[1]: https://www.datadoghq.com/pricing/#section-infrastructure
[2]: mailto:sales@datadoghq.com
[3]: mailto:success@datadoghq.com
[4]: https://app.datadoghq.com/account/usage
[5]: https://app.datadoghq.com/account/settings#integrations/amazon-web-services
[6]: /fr/help