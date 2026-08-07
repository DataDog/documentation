---
description: Dépannage de la solution Database Monitoring
title: Dépannage de la configuration de Database Monitoring pour MongoDB
---

Cette page explique comment résoudre les problèmes courants liés à la configuration et à l'utilisation de Database Monitoring avec MongoDB. Datadog recommande d'utiliser la dernière version stable de l'Agent Datadog et de suivre la dernière [documentation de configuration][1], car celle-ci peut évoluer avec les nouvelles versions de l'Agent Datadog.

## Diagnostiquer les problèmes courants

### Nom de cluster contenant des majuscules ou des espaces

Le `cluster_name` MongoDB doit respecter les [conventions de nommage des tags Datadog][2].
Si votre `cluster_name` MongoDB contient des majuscules ou des espaces, l'Agent Datadog normalise le nom du cluster en minuscules et remplace les espaces par des underscores. Par exemple, si le nom de votre cluster est `My Cluster`, l'Agent Datadog le normalise en `my_cluster`.
Pour éviter les incohérences et les comportements inattendus, veillez à ce que votre `cluster_name` respecte les conventions de nommage des tags Datadog.

### ServerSelectionTimeoutError lors de la connexion à un cluster MongoDB Atlas

Si vous utilisez MongoDB Atlas, vous pourriez rencontrer une erreur `ServerSelectionTimeoutError` lors de la connexion au cluster. Cette erreur se produit lorsque l'Agent Datadog ne parvient pas à se connecter au cluster MongoDB Atlas en raison d'un problème réseau ou d'une mauvaise configuration TLS. Pour résoudre ce problème, vérifiez que `tls` est défini sur `true` dans le fichier de configuration de l'intégration. Si le problème persiste, vérifiez la configuration des accès réseau du cluster MongoDB Atlas afin de vous assurer que l'adresse IP de l'Agent Datadog est autorisée à se connecter au cluster.
 
 
 
 
 


[1]: /fr/database_monitoring/setup_mongodb/
[2]: /fr/extend/guide/what-best-practices-are-recommended-for-naming-metrics-and-tags/#rules-and-best-practices-for-naming-tags