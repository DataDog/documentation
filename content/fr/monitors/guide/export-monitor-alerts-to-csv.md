---
aliases:
- /fr/monitors/faq/comment-exporter-un-historique-d-alertes

title: Exporter des alertes de monitor au format CSV
---

Téléchargez l'historique des alertes de monitor via les [données horaires de monitor][1], qui génèrent un fichier CSV pour les 6 derniers mois (182 jours). Ce fichier CSV n'est **pas** en direct. il est mis à jour une fois par semaine, le lundi à 11 h 59 UTC.

**Remarques** :

- Cette fonction n'est disponible que pour le site américain de Datadog.
- Vous devez être un administrateur de votre organisation pour accéder au fichier CSV.

{{< site-region region="us" >}}

Pour récupérer le fichier CSV à l'aide de curl, procédez comme suit :

```shell
api_key=<DATADOG_API_KEY>
app_key=<DATADOG_APPLICATION_KEY>

curl -G \
    "https://app.datadoghq.com/report/hourly_data/monitor" \
    -d "api_key=${api_key}" \
    -d "application_key=${app_key}" \
```

Exemple de réponse :

```text
hour,host_name,alert_name,user,cnt

2022-10-23 20,example_host_name,"Host name: {{host.name}} Name name: {{name.name}}",<user_email>,67
```
{{< /site-region >}}

{{< site-region region="eu,gov,us3,us5,ap1" >}}

Cette fonctionnalité n'est pas prise en charge.

{{< /site-region >}}

[1]: https://app.datadoghq.com/report/hourly_data/monitor