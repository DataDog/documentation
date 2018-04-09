---
title: Pourquoi ai-je des erreurs `[Errno 111] Connection refused`  dans mes logs?
kind: faq
---

Soit l'Agent de trace n'est pas en cours d'exécution, soit le traceur de votre application n'est pas configuré correctement. Par défaut, les traces des bibliothèques client sont soumises sur localhost sur le port 8126. Si ce n'est pas là où votre Agent de trace écoute (s'il est dans un conteneur Docker adjacent à votre conteneur d'application par exemple), pointez votre client tracer là où il s'exécute, par ex. `tracer.configure(hostname="172.17.0.1")`.

Si vous exécutez l'agent de trace dans un conteneur Docker, consultez la documentation [docker-dd-agent][1] pour plus d'informations.

[1]: https://github.com/DataDog/docker-dd-agent/#tracing--apm
