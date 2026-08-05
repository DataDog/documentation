---
cascade:
  algolia:
    category: Guide
    rank: 20
    subcategory: Guides sur les logs
disable_toc: true

private: true
title: Guides sur les logs
---

{{< whatsnext desc="Logging Without Limits™" >}}
 {{< nextlink href="logs/guide/access-your-log-data-programmatically" >}}Programmation de l'accès aux données de log à l'aide de l'API Logs Search{{< /nextlink >}}
    {{< nextlink href="logs/guide/getting-started-lwl" >}}Guide de la fonctionnalité Logging Without Limits™{{< /nextlink >}}
    {{< nextlink href="logs/guide/correlate-logs-with-metrics" >}}Mettre en corrélation vos logs et vos métriques{{< /nextlink >}}
    {{< nextlink href="logs/guide/best-practices-for-log-management" >}}Meilleures pratiques pour Log Management{{< /nextlink >}}
{{< /whatsnext >}}

<br>

{{< whatsnext desc="Collecte de logs" >}}
    {{< nextlink href="/agent/logs/advanced_log_collection" >}}Configuration pour la collecte de logs avancée{{< /nextlink >}}
    {{< nextlink href="/logs/guide/send-aws-services-logs-with-the-datadog-kinesis-firehose-destination/" >}}Envoyer des logs de services AWS avec la destination Datadog pour Kinesis Firehose{{< /nextlink >}}
    {{< nextlink href="/logs/guide/sending-events-and-logs-to-datadog-with-amazon-eventbridge-api-destinations/" >}}Envoyer des événements et des logs à Datadog à l'aide des destinations API d'Amazon EventBridge{{< /nextlink >}}
    {{< nextlink href="/logs/guide/forwarder/" >}}Configurer le Forwarder Lambda Datadog{{< /nextlink >}}
    {{< nextlink href="/logs/guide/azure-logging-guide/" >}}Envoyer des logs Azure à Datadog{{< /nextlink >}}
    {{< nextlink href="/logs/guide/azure-native-logging-guide/" >}}Envoyer des logs Azure avec la ressource Datadog{{< /nextlink >}}    
    {{< nextlink href="logs/guide/collect-heroku-logs" >}}Recueillir des logs Heroku{{< /nextlink >}}
    {{< nextlink href="/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/" >}}Envoyer des logs de services AWS avec la fonction Lambda Datadog{{< /nextlink >}}
    {{< nextlink href="logs/guide/log-collection-troubleshooting-guide" >}}Dépannage pour la collecte de logs{{< /nextlink >}}
    {{< nextlink href="logs/guide/docker-logs-collection-troubleshooting-guide" >}}Guide de dépannage pour la collecte de logs Docker{{< /nextlink >}}
    {{< nextlink href="logs/guide/lambda-logs-collection-troubleshooting-guide" >}}Guide de dépannage pour la collecte de logs de la fonction Lambda{{< /nextlink >}}
    {{< nextlink href="logs/guide/setting-file-permissions-for-rotating-logs" >}}Définir les autorisations de fichier pour la rotation des logs (Linux){{< /nextlink >}}
    {{< nextlink href="/logs/guide/how-to-set-up-only-logs" >}}Utiliser l'Agent Datadog pour la collecte de logs uniquement{{< /nextlink >}}
    {{< nextlink href="logs/guide/increase-number-of-log-files-tailed" >}}Augmenter le nombre de fichiers de log suivis par l'Agent{{< /nextlink >}}
    {{< nextlink href="/logs/guide/container-agent-to-tail-logs-from-host" >}}Utiliser l'Agent de conteneur pour suivre des logs provenant du host{{< /nextlink >}}
    {{< nextlink href="/logs/guide/mechanisms-ensure-logs-not-lost" >}}Pratiques à suivre pour ne perdre aucun log{{< /nextlink >}}
    {{< nextlink href="/logs/guide/custom-log-file-with-heightened-read-permissions" >}}Envoyer des logs à partir d'un fichier de log personnalisé avec une élévation des autorisations de lecture{{< /nextlink >}}   
    {{< nextlink href="/logs/guide/aws-eks-fargate-logs-with-kinesis-data-firehose" >}}Envoyer des logs AWS EKS Fargate avec Kinesis Data Firehose{{< /nextlink >}}
{{< /whatsnext >}}

<br>

{{< whatsnext desc="Traitement des logs" >}}
    {{< nextlink href="logs/guide/log-parsing-best-practice" >}}Parsing de log : bonnes pratiques à adopter
 {{< /nextlink >}}
    {{< nextlink href="/logs/guide/commonly-used-log-processing-rules" >}}Règles de nettoyage de logs couramment utilisées{{< /nextlink >}}
    {{< nextlink href="/logs/guide/logs-not-showing-expected-timestamp" >}}Timestamp incorrect dans les logs{{< /nextlink >}}
    {{< nextlink href="/logs/guide/remap-custom-severity-to-official-log-status" >}}Remapper des valeurs de gravité personnalisées pour le statut officiel des logs{{< /nextlink >}}
    {{< nextlink href="logs/guide/logs-show-info-status-for-warnings-or-errors" >}}Logs avec un statut Info en cas d'avertissement ou d'erreur{{< /nextlink >}} 
{{< /whatsnext >}}

<br>

{{< whatsnext desc="Requêtes de log" >}}
    {{< nextlink href="logs/guide/collect-multiple-logs-with-pagination" >}}Recueillir de multiples logs avec l'API Log List et la pagination{{< /nextlink >}}
    {{< nextlink href="/logs/guide/build-custom-reports-using-log-analytics-api/?tab=table" >}}Créer des rapports personnalisés à l'aide de l'API Log Analytics{{< /nextlink >}}
    {{< nextlink href="/logs/guide/detect-unparsed-logs/" >}}Surveiller et interroger les logs non parsés{{< /nextlink >}}
{{< /whatsnext >}}

<br>

{{< whatsnext desc="Sensitive Data Management" >}}
    {{< nextlink href="logs/guide/logs-rbac" >}}Configuration du RBAC pour les logs{{< /nextlink >}}
   {{< nextlink href="logs/guide/logs-rbac-permissions" >}}En savoir plus sur les autorisations RBAC pour les logs{{< /nextlink >}}
    {{< nextlink href="/logs/guide/restrict-access-to-sensitive-data-with-rbac/" >}}Restreindre l'accès aux données sensibles avec les contrôles d'accès basés sur les requêtes{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="Intégrations Datadog" >}}
    {{< nextlink href="logs/guide/ease-troubleshooting-with-cross-product-correlation" >}}Diagnostics simplifiés grâce à la mise en corrélation entre produits{{< /nextlink >}}
{{< /whatsnext >}}