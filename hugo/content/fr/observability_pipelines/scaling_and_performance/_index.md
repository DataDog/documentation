---
description: Trouvez des liens de documentation sur des sujets tels que l'exécution
  de plusieurs pipelines sur un host, la mise en mémoire tampon et la contre-pression,
  ainsi que les meilleures pratiques pour la mise à l'échelle des Observability Pipelines
  Workers.
disable_toc: false
title: Mise à l'échelle et performances
---
À mesure que vous mettez à l'échelle votre architecture Observability Pipelines pour couvrir vos différents cas d'utilisation :

- Si vous souhaitez exécuter plusieurs pipelines sur un host afin de pouvoir envoyer des données à partir de différentes sources, suivez les instructions dans [Run Multiple Pipelines on a Host][1].
- Observability Pipelines utilise des signaux de contre-pression et une mise en mémoire tampon pour gérer les situations où le système ne peut pas traiter les événements immédiatement après les avoir reçus. Consultez [Buffering and Backpressure][2] pour plus d'informations.
- Lorsque vous mettez à l'échelle Observability Pipelines Workers, chaque Worker fonctionne de manière indépendante. Consultez [Best Practices for Scaling Pipelines][3] pour l'architecture d'agrégateur recommandée.

[1]: /fr/observability_pipelines/configuration/install_the_worker/run_multiple_pipelines_on_a_host/
[2]: /fr/observability_pipelines/scaling_and_performance/buffering_and_backpressure/
[3]: /fr/observability_pipelines/scaling_and_performance/best_practices_for_scaling_observability_pipelines/