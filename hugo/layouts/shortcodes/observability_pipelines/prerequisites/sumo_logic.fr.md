Pour utiliser la source Sumo Logic des pipelines d'observabilité, vous devez posséder des applications qui envoient des données à Sumo Logic dans le [format attendu][101].

Pour utiliser la destination Sumo Logic des pipelines d'observabilité, vous devez disposer d'un collector hébergé Sumo Logic avec une source de logs HTTP et les informations suivantes :
- L'adresse bind que votre worker de pipelines d'observabilité analysera pour recevoir des logs. Par exemple, `0.0.0.0:80`.
- L'URL de la source HTTP des logs de Sumo Logic vers laquelle le worker enverra les logs traités. Cette URL est fournie par Sumo Logic une fois que vous avez configuré votre Collector hébergé et mis en place une source HTTP des logs et des métriques.

Consultez la section [Configurer des sources HTTP de logs avec Sumo Logic][102] pour en savoir plus.

[101]: https://help.sumologic.com/docs/send-data/hosted-collectors/http-source/logs-metrics/upload-logs/
[102]: https://help.sumologic.com/docs/send-data/hosted-collectors/http-source/logs-metrics/