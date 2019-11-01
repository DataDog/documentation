---
title: "Fluent\_Bit"
name: fluentbit
kind: integration
description: "Configurez Fluent\_Bit pour recueillir, analyser et transmettre des données de log provenant de plusieurs sources différentes à Datadog à des fins de surveillance."
short_description: 'Recueillez, analysez et transmettez des données de log provenant de plusieurs sources différentes à Datadog à des fins de surveillance.'
categories:
  - log collection
doc_link: /integrations/fluentbit/
has_logo: true
integration_title: "Fluent\_Bit"
is_public: true
public_title: "Intégration Datadog/Fluent\_Bit"
further_reading:
  - link: 'https://www.datadoghq.com/blog/fluentbit-integration-announcement/'
    tag: Blog
    text: "Centraliser vos logs avec Datadog et Fluent\_Bit"
---
## Présentation

Configurez Fluent Bit pour recueillir, analyser et transmettre des données de log provenant de plusieurs sources différentes à Datadog à des fins de surveillance. Fluent Bit occupe peu de mémoire (~450 ko), ce qui vous permet de l'utiliser pour recueillir des logs dans des environnements avec des ressources limitées, tels que des services conteneurisés et des systèmes Linux intégrés. Le [plug-in de sortie Fluent Bit de Datadog][1] prend en charge Fluent Bit v1.3.0+.

## Implémentation
### Collecte de logs

Avant de commencer, vous devez avoir un [compte Datadog][2] et une [clé d'API Datadog][3]. Assurez-vous également d'avoir [activé Datadog Log Management][4].

1. [Installez][5] et [configurez][6] Fluent Bit en utilisant un fichier de configuration (la méthode recommandée officiellement).
2. Mettez à jour votre [fichier de configuration Fluent Bit][7] pour ajouter Datadog en tant que plug-in de sortie. Pour plus d'informations sur les paramètres de configuration, consultez le [tableau des paramètres de configuration](#parametres-de-configuration). Pour voir un exemple de section de configuration `[OUTPUT]`, consultez l'[exemple de fichier de configuration](#exemple-de-fichier-de-configuration).
3. Lorsque vous commencez à envoyer des logs à partir de Fluent Bit, vérifiez qu'ils apparaissent sur la [page Log Explorer de Datadog][8].

#### Paramètres de configuration

| Clé | Description | Valeur par défaut |
|-------------|--------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------|
| Host | _Obligatoire_ - Le serveur Datadog vers lequel vous envoyez vos logs. | Site américain : `http-intake.logs.datadoghq.com` - Site européen : `http-intake.logs.datadoghq.eu` |
| TLS | _Obligatoire_ - Protocole de communication sécurisée de bout en bout. Datadog vous conseille de laisser ce paramètre sur `on`. | `on` |
| apikey | _Obligatoire_ - Votre [clé d'API Datadog][3]. |  |
| dd\_service | _Recommandé_ - Le nom lisible du service qui génère vos logs (nom de votre application ou base de données). |  |
| dd\_source | _Recommandé_ - Le nom lisible de la technologie sous-jacente de votre service. Par exemple, `postgres` ou `nginx`. |  |
| dd\_tags | _Facultatif_ - Les [tags][9] que vous souhaitez attribuer à vos logs dans Datadog. |  |

#### Exemple de fichier de configuration

```text
[OUTPUT]
    Name        datadog
    Match       *
    Host        http-intake.logs.datadoghq.com
    TLS         on
    apikey      <ma-clé-api-datadog>
    dd_service  <mon-service-app>
    dd_source   <ma-source-app>
    dd_tags     team:logs,foo:bar
```

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][10].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.fluentbit.io/manual/output/datadog
[2]: https://app.datadoghq.com/signup
[3]: /fr/account_management/api-app-keys
[4]: https://app.datadoghq.com/logs/activation
[5]: https://docs.fluentbit.io/manual/installation
[6]: https://docs.fluentbit.io/manual/configuration
[7]: https://docs.fluentbit.io/manual/configuration/file
[8]: https://app.datadoghq.com/logs
[9]: /fr/tagging
[10]: /fr/help
