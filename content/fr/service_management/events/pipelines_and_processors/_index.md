---
title: Pipelines et processeurs
---

## Présentation

Event Management offre la possibilité d'ajouter du processing à un événement avec des pipelines et des processeurs. 


### Cas d'utilisation courants
- Enrichir vos événements avec des informations supplémentaires provenant de votre CMDB
- Normaliser les tags sur les événements
- Créer des tags à partir du contenu des événements 


### Prise en main

Pour commencer, vous devez d'abord créer un pipeline, qui vous permet de filtrer les événements qui vous intéressent, comme une source ou un tag. Une fois que vous avez créé un pipeline, vous pouvez ajouter des processeurs. Les processeurs disponibles sont les suivants : 

- [Processeur arithmétique][1]
- [Remappeur de dates][2]
- [Processeur de catégories][3]
- [Parser Grok][4]
- [Processeur de correspondances][5]
- [Remappeur][6]
- [Remappeur de services][7]
- [Remappeur de statuts][8]
- [Processeur de générateur de chaînes][9]




[1]: /fr/service_management/events/pipelines_and_processors/arithmetic_processor
[2]: /fr/service_management/events/pipelines_and_processors/date_remapper
[3]: /fr/service_management/events/pipelines_and_processors/category_processor
[4]: /fr/service_management/events/pipelines_and_processors/grok_parser
[5]: /fr/service_management/events/pipelines_and_processors/lookup_processor
[6]: /fr/service_management/events/pipelines_and_processors/remapper
[7]: /fr/service_management/events/pipelines_and_processors/service_remapper
[8]: /fr/service_management/events/pipelines_and_processors/status_remapper
[9]: /fr/service_management/events/pipelines_and_processors/string_builder_processor