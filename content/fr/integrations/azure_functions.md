---
app_id: azure_functions
categories:
- azure
- cloud
- provisioning
custom_kind: integration
description: Surveillez des métriques clés d'Azure Functions.
title: Microsoft Azure Functions
---
## Section Overview

Azure Functions est une plateforme de calcul sans serveur basée sur les événements qui peut aussi résoudre des problèmes d’orchestration complexes. Créez et débuguez localement sans configuration supplémentaire, procédez au déploiement et opérez à l’échelle dans le cloud, et intégrez des services à l’aide de déclencheurs et de liaisons.

Recueillez des métriques d'Azure Functions pour :

- Visualiser les performances et l'utilisation de vos fonctions
- Corréler les performances de vos fonctions Azure avec vos autres applications

## Configuration

### Installation

Si vous ne l'avez pas encore fait, configurez d'abord l'[intégration Microsoft Azure] (https://docs.datadoghq.com/integrations/azure/). Il n'y a pas d'autres étapes d'installation.

## Données collectées

### Métriques

| | |
| --- | --- |
| **azure.functions.average_memory_working_set** <br>(gauge) | Ensemble de travail de la mémoire moyenne<br>_Affichage par octet_. |
| **azure.functions.average_response_time** <br>(gauge) | Le temps moyen pris par l'application pour servir les requêtes, en secondes.<br>_Shown as second_ (affiché en secondes) |
| **azure.functions.bytes_received** <br>(gauge) | Données sur<br>_Affichées sous forme d'octets_. |
| **azure.functions.bytes_sent** <br>(gauge) | Sortie de données<br>_Affichée sous forme d'octet_. |
| **azure.functions.connections** <br>(gauge) | Connexions<br>_Constitution d'une connexion_ |
| **azure.functions.current_assemblies** <br>(gauge) | Assemblées actuelles|
| **azure.functions.function_execution_count** <br>(count) | Nombre d'exécutions de la fonction|
| **azure.functions.function_execution_units** <br>(count) | Unités d'exécution des fonctions|
| **azure.functions.function_execution_units.max** <br>(count) | Unités d'exécution de fonction maximales (agrégées maximales)|
| **azure.functions.gen_0_garbage_collections** <br>(gauge) | Gen 0 Collecte des ordures ménagères|
| **azure.functions.gen_1_garbage_collections** <br>(gauge) | Gen 1 Collecte des ordures ménagères|
| **azure.functions.gen_2_garbage_collections** <br>(gauge) | Gen 2 Collecte des ordures ménagères|
| **azure.functions.handle_count** <br>(count) | Nombre de poignées|
| **azure.functions.http101** <br>(count) | Le nombre de requêtes aboutissant à un code d'état HTTP 101.|
| **azure.functions.http2xx** <br>(count) | Le nombre de requêtes ayant un code d'état HTTP = 200 mais \< 300.|
| **azure.functions.http3xx** <br>(count) | Le nombre de requêtes aboutissant à un code d'état HTTP = 300 mais \< 400.|
| **azure.functions.http401** <br>(count) | Le nombre de requêtes aboutissant au code d'état HTTP 401.|
| **azure.functions.http403** <br>(count) | Le nombre de requêtes aboutissant à un code d'état HTTP 403.|
| **azure.functions.http404** <br>(count) | Le nombre de requêtes aboutissant au code d'état HTTP 404.|
| **azure.functions.http406** <br>(count) | Le nombre de requêtes ayant abouti à un code d'état HTTP 406.|
| **azure.functions.http4xx** <br>(count) | Le nombre de requêtes aboutissant à un code d'état HTTP = 400 mais \< 500.|
| **azure.functions.http5xx** <br>(count) | Erreurs du serveur Http|
| **azure.functions.io_autres_octets_par_seconde** <br>(taux) | IO Autres octets par seconde<br>_Indiqué en octets_. |
| **azure.functions.io_other_operations_per_second** <br>(rate) | IO Autres opérations par seconde|
| **azure.functions.io_read_bytes_per_second** <br>(rate) | IO Read Bytes Per Second<br>_Constitué d'un octet_. |
| **azure.functions.io_read_operations_per_second** <br>(rate) | Opérations de lecture IO par seconde|
| **azure.functions.io_write_bytes_per_second** <br>(rate) | Octets d'écriture IO par seconde<br>_Constitué d'un octet_. |
| **azure.functions.io_write_operations_per_second** <br>(rate) | Opérations d'écriture IO par seconde|
| **azure.functions.memory_working_set** <br>(gauge) | Ensemble de travail de la mémoire<br>_Constitué d'un octet_. |
| **azure.functions.private_bytes** <br>(gauge) | Octets privés<br>_Constitué d'octets_ |
| **azure.functions.requests_in_application_queue** <br>(count) | Demandes dans la file d'attente<br>_Affichage sous forme de demande_. |
| **azure.functions.thread_count** <br>(count) | Nombre de fils|
| **azure.functions.total_app_domains** <br>(gauge) | Total des domaines d'application|
| **azure.functions.total_app_domains_unloaded** <br>(gauge) | Total des domaines d'application déchargés|
| **azure.functions.file_system_usage** <br>(gauge) | Pourcentage du quota du système de fichiers consommé par l'application.<br>_Affiché sous forme d'octet_. |
| **azure.functions.health_check_status** <br>(gauge) | État du bilan de santé.|
| **azure.functions.response_time** <br>(gauge) | Le temps nécessaire à l'application pour servir les requêtes, en secondes.<br>_Shown as second_ (affiché en secondes) |
| **azure.functions.requests** <br>(count) | Le nombre total de requêtes, quel que soit le code d'état HTTP qui en résulte.|
| **azure.functions.count** <br>(gauge) | Le nombre de ressources des fonctions azur|

### Événements

L'intégration Azure Functions n'inclut aucun événement.

### Checks de service

L'intégration Azure Functions n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez l'[assistance Datadog](https://docs.datadoghq.com/help/).