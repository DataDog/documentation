---
title: "Fluent\_Bit"
name: fluentbit
custom_kind: integration
description: "Configurez Fluent\_Bit pour recueillir, analyser et transmettre des données de log provenant de plusieurs sources."
short_description: Recueillez, analysez et transmettez des données de log provenant de plusieurs sources.
categories:
  - log collection
doc_link: /integrations/fluentbit/
dependencies:
  - https://github.com/DataDog/documentation/blob/master/content/en/integrations/fluentbit.md
has_logo: true
integration_title: "Fluent\_Bit"
is_public: true
public_title: "Intégration Datadog/Fluent\_Bit"
further_reading:
  - link: https://www.datadoghq.com/blog/fluentbit-integration-announcement/
    tag: Blog
    text: "Centraliser vos logs avec Datadog et Fluent\_Bit"
integration_id: fluentbit
---
## Présentation

Configurez Fluent Bit pour recueillir, analyser et transmettre des données de log provenant de plusieurs sources différentes à Datadog à des fins de surveillance. Fluent Bit occupe peu de mémoire (~450 ko), ce qui vous permet de l'utiliser pour recueillir des logs dans des environnements avec des ressources limitées, tels que des services conteneurisés et des systèmes Linux intégrés. Le [plug-in de sortie Fluent Bit de Datadog][1] prend en charge Fluent Bit v1.3.0+.

## Configuration

Les instructions ci-dessous concernent la configuration de Fluent Bit sur un host. Pour AWS ECS, consultez la [documentation relative à Fluent Bit et FireLens sur ECS][2].

### Collecte de logs

Avant de commencer, vous devez avoir un [compte Datadog][3] et une [clé d'API Datadog][4]. Assurez-vous également d'avoir [activé Datadog Log Management][5].

1. [Installez][6] et [configurez][7] Fluent Bit en utilisant un fichier de configuration (la méthode recommandée officiellement).
2. Modifiez votre [fichier de configuration Fluent Bit][8] pour ajouter Datadog en tant que plug-in de sortie. Pour plus d'informations sur les paramètres de configuration, consultez le [tableau des paramètres de configuration](#parametres-de-configuration). Pour voir un exemple de section de configuration `[OUTPUT]`, consultez l'[exemple de fichier de configuration](#exemple-de-fichier-de-configuration).
3. Lorsque vous commencez à envoyer des logs à partir de Fluent Bit, vérifiez qu'ils apparaissent sur la [page Log Explorer de Datadog][9].

#### Paramètres de configuration

| Clé            | Description                                                                                                              | Valeur par défaut                                                                     |
| -------------- | ------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------- |
| Host           | _Obligatoire_ - Le serveur Datadog vers lequel vous envoyez vos logs.                                                         | {{< region-param key="http_endpoint" code="true" >}} |
| TLS            | _Obligatoire_ - Protocole de communication sécurisée de bout en bout. Datadog vous conseille de définir ce paramètre sur `on`.              | `off`                                                                       |
| apikey         | _Obligatoire_ - Votre [clé d'API Datadog][4].                                                                                  |                                                                             |
| compress       | _Conseillé_ - Compresse la charge utile au format GZIP. Datadog prend en charge et recommande le format `gzip`.           |                                                                             |
| dd_service     | _Recommandé_ - Le nom lisible du service qui génère vos logs (nom de votre application ou base de données). |                                                                             |
| dd_source      | _Recommandé_ - Le nom lisible de la technologie sous-jacente de votre service. Par exemple, `postgres` ou `nginx`. |                                                                             |
| dd_message_key | _Recommandé_ - Définit l'attribut à utiliser pour stocker votre message de log.                                                      |                                                                             |
| dd_tags        | _Facultatif_ - Les [tags][10] que vous souhaitez attribuer à vos logs dans Datadog.                                                  |                                                                             |
| provider       | _Facultatif_ - Le fournisseur à utiliser. Définissez ce paramètre sur `ecs` pour envoyer les logs de vos tâches Fargate à Datadog.         |                                                                             |

#### Exemple de fichier de configuration

```text
[OUTPUT]
    Name              datadog
    Match             *
    Host              http-intake.logs.datadoghq.com
    TLS               on
    compress          gzip
    apikey            <CLÉ_API_DATADOG>
    dd_service        <SERVICE_APPLICATION>
    dd_source         <SOURCE>
    dd_message_key    log
    dd_tags           env:dev,<CLÉ_TAG>:<VALEUR_TAG>
```

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][11].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.fluentbit.io/manual/output/datadog
[2]: /fr/integrations/ecs_fargate/#fluent-bit-and-firelens
[3]: https://app.datadoghq.com/signup
[4]: /fr/account_management/api-app-keys/
[5]: https://app.datadoghq.com/logs/activation
[6]: https://docs.fluentbit.io/manual/installation/sources/build-and-install
[7]: https://docs.fluentbit.io/manual/administration/configuring-fluent-bit
[8]: https://docs.fluentbit.io/manual/administration/configuring-fluent-bit/configuration-file
[9]: https://app.datadoghq.com/logs
[10]: /fr/getting_started/tagging/
[11]: /fr/help/