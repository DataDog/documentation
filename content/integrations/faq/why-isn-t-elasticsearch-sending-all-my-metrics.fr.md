---
title: Pourquoi Elasticsearch n'envoie pas toutes mes métriques?
kind: faq
---

Si vous avez configuré l'intégration d'Elasticsearch mais que vous n'avez pas reçu toutes les métriques disponibles, c'est peut-être parce que votre cluster est hébergé en externe.
Si c'est le cas, changez votre fichier de configuration `elastic.yaml` pour inclure` is_external: true`. Ce paramètre est défini par défaut sur false pour les clients pointant alors vers localhost.

Assurez-vous de [redémarrer votre agent][1] après avoir mis à jour la configuration, et vous devriez voir plus de métriques provenant de cette configuration.

[1]: /agent/faq/agent-commands/#start-stop-restart-the-agent
