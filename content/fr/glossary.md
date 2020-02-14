---
title: Glossaire
kind: Documentation
disable_toc: true
---
#### Agent

L'Agent est une application légère qui s'exécute sur les hosts. Il lance des checks et gère le flux d'informations circulant du host vers la plateforme Datadog. L'Agent est un outil open source, et les binaires compilés peuvent être utilisés sur Windows, macOS et de nombreuses distributions Linux.

Consultez la [documentation relative à l'Agent][1] pour en savoir plus.

#### API

Datadog fournit une API HTTP afin d'interagir avec la plateforme à l'aide de programmes. Toutes les fonctionnalités, toutes les ressources et tous les mécanismes sont accessibles via l'API. Il est conseillé d'interagir manuellement avec l'API pour bien comprendre le fonctionnement intrinsèque de Datadog. Toutefois, en production, vous utiliserez un outil, une bibliothèque ou une interface spécialement conçus à cet effet (comme le produit Datadog) en tant que couche d'abstraction entre vous et l'API.

Consultez la [documentation relative à l'API][2] pour en savoir plus.

#### Check

Les checks sont de petits programmes Python qui sont régulièrement exécutés par l'Agent. Un check effectue une action, puis recueille ses résultats. Ils sont alors stockés par l'Agent et envoyés à la plateforme Datadog. Ces programmes disposent d'une certaine liberté et sont généralement utilisés pour recueillir des métriques à partir d'environnements ou d'applications personnalisés.

Notez que le terme « check » sans majuscule fait référence à la prise générale d'une mesure.

#### Bibliothèque client

Vous disposez d'un certain nombre de bibliothèques dans une variété de langues pour instrumenter vos applications directement avec Datadog. Nous vous proposons des bibliothèques officielles pour C#, Golang, Java, PHP, Python et Ruby. Les bibliothèques dans d'autres langues sont fournies par la communauté et sont entretenues dans la mesure du possible.

Les bibliothèques sont conçues pour interagir avec l'API ou DogStatsD, bien que certaines d'entre elles les prennent tous les deux en charge.

Consultez la [documentation relative aux bibliothèques][3] pour en savoir plus.

#### Dashboard

Les dashboards représentent l'un des principaux outils de visualisation de vos données. Il existe deux types de dashboards : les screenboards et les timeboards.

Les [screenboards][4] sont des dashboards libres qui peuvent inclure de nombreux objets comme des images, des graphiques et des logs. Ils sont généralement utilisés pour représenter des statuts ou pour une réelle mise en récit et peuvent être mis à jour en temps réel. Ils peuvent également inclure un ou plusieurs points fixes historiques.

Les [timeboards][5] possèdent une disposition automatique. Ils représentent un seul point (fixe ou en temps réel) sur l'ensemble du dashboard. Ils sont généralement utilisés pour le dépannage, la corrélation et l'exploration globale des données.

#### DogStatsD

Le terme DogStatsD est utilisé pour désigner deux notions : le protocole basé sur [StatsD][6] et l'application de transmission de métriques qui implémente ce protocole. Le protocole DogStatsD est une extension du protocole StatsD comprenant quelques modifications spécifiques à la plateforme Datadog. L'application DogStatsD est un service fourni avec l'Agent et utilisé comme système léger de transfert de données.

Consultez la [documentation relative à DogStatsD][7] pour en savoir plus.

#### Intégration

Une intégration permet de récupérer les données de vos systèmes et de les transmettre à Datadog. Les intégrations recueillent des données à partir d'une source de donnée, s'assurent que ces données sont correctement organisées et fournissent d'autres ressources facilitant la configuration et l'exploitation. Les sources de données peuvent être, entre autres, des daemons sur un serveur, des services cloud ou encore des API tierces.

Consultez la [documentation relative aux intégrations][8] pour en savoir plus.

#### Comptes multiorganisations (« multi-org »)

Les comptes multi-org permettent à une organisation parent de créer plusieurs organisations enfant. Ils sont souvent utilisés par les prestataires de services gérés dotés de nombreux clients. Chaque client a besoin d'une organisation qui n'est pas accessible aux autres clients. La facturation des comptes multi-org est effectuée par l'organisation parent, et les rapports d'utilisation de l'organisation parent comprennent des données sur l'utilisation des organisations enfant.

#### Traceur

Datadog prend en charge le tracing distribué via l'intégration de l'APM. Cela vous permet d'instrumenter votre code existant et de consulter les requêtes transmises à tous vos systèmes en temps réel. Le tracing est pris en charge par différents langages, bases de données et frameworks RPC. De nombreux langages [sont nativement pris en charge][9]. Toutefois, les développeurs peuvent ajouter leur propre prise en charge de langue en créant des shippers personnalisés.

Consultez la [documentation relative au tracing][10] pour en savoir plus.

[1]: /fr/agent
[2]: /fr/api
[3]: /fr/developers/libraries
[4]: /fr/dashboards/screenboard
[5]: /fr/dashboards/timeboard
[6]: https://www.datadoghq.com/blog/statsd
[7]: /fr/developers/dogstatsd
[8]: /fr/developers/integrations
[9]: /fr/developers/libraries/#apm-distributed-tracing-client-libraries
[10]: /fr/tracing