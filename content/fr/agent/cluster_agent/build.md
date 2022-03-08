---
title: Créer l'image de l'Agent de cluster Datadog
kind: documentation
---

L'Agent de cluster Datadog doit être utilisé dans un écosystème conteneurisé. Procédez comme suit pour créer son image :

1. Dupliquez le [référentiel GitHub DataDog/datadog-agent][1].
2. Dans le dossier `datadog-agent/` téléchargé, générez le binaire en exécutant `inv -e cluster-agent.build`. Le binaire sera ajouté dans `./bin/datadog-cluster-agent/`
3. Depuis le même dossier, exécutez ensuite `inv -e cluster-agent.image-build`.

[1]: https://github.com/DataDog/datadog-agent/
