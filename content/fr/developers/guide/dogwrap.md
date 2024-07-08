---
aliases:
- /fr/developers/faq/can-i-call-scripts-and-generate-events-from-their-results
- /fr/dashboards/faq/how-do-i-track-cron-jobs
description: Appeler des commandes et générer des événements à partir des résultats
  avec Dogwrap

title: Dogwrap
---

L'outil de ligne de commande Dogwrap vous permet d'appeler des commandes et de générer des événements à partir des résultats. Pour pouvoir utiliser Dogwrap, vous devez installer la [bibliothèque Python de Datadog][1] :

Pour l'installer avec pip :

```text
pip install datadog
```

Pour l'installer depuis les sources :

1. Dupliquez le référentiel [DataDog/datadogpy][1].
2. Au sein du dossier racine, exécutez `python setup.py install`.

Pour être valide, une commande `dogwrap` doit au moins disposer des éléments suivants :

{{< site-region region="us,gov,ap1" >}}
```bash
dogwrap -n <TITRE_ÉVÉNEMENT> -k <CLÉ_API_DATADOG> "<COMMANDE>"
```
{{< /site-region >}}

{{< site-region region="us3" >}}
```bash
dogwrap -n <EVENT_TITLE> -k <DATADOG_API_KEY> -s us3 "<COMMAND>"
```
{{< /site-region >}}

{{< site-region region="us5" >}}
```bash
dogwrap -n <EVENT_TITLE> -k <DATADOG_API_KEY> -s us5 "<COMMAND>"
```
{{< /site-region >}}

{{< site-region region="eu" >}}
```bash
dogwrap -n <EVENT_TITLE> -k <DATADOG_API_KEY> -s eu "<COMMAND>"
```
{{< /site-region >}}

**Remarque** : La commande `dogwrap` envoie des données au site américain de Datadog par défaut. Si vous souhaitez envoyer des données vers un autre site, vous devez inclure `-s` option specifying a target site, such as `eu`, `us3`, `us5`, etc.

Voici l'explication des paramètres fictifs de la commande :

* `<TITRE_ÉVÉNEMENT>` : titre de l'événement à afficher dans Datadog.
* `<CLÉ_API_DATADOG>` : [la clé d'API Datadog associée à votre organisation][2].
* `<COMMANDE>` : commande à incorporer et à utiliser pour générer les événements. Ajoutez des guillemets autour de la commande pour éviter que Python considère que les arguments appartiennent à la commande Python, et non à la commande incorporée.

**Remarque** : utilisez la commande d'aide de Dogwrap `dogwrap --help` pour afficher toutes les options disponibles.

Pour voir comment fonctionne `dogwrap`, jetez un œil à `cron`. Si vous utilisez un script cron pour nettoyer une table Postgres tous les jours avec « vacuum » :

```bash
0 0 * * * psql -c 'vacuum verbose ma_table' >> /var/log/postgres_vacuums.log 2>&1
```

Cette opération nécessite beaucoup de ressources. Il est donc conseillé de générer des événements Datadog à chaque nettoyage afin de corréler les métriques et autres événements avec les « vacuums » :

```bash
dogwrap -n "Nettoyage matable" -k $DATADOG_API_KEY --submit_mode errors "psql -c 'vacuum verbose ma_table' 2>&1 /var/log/postgres_vacuums.log"
```

Cela appelle la commande à la fin du script. Si celle-ci génère un code de sortie différent de zéro (comme une erreur), des événements Datadog sont alors envoyés. `--submit_mode all` envoie des événements à chaque exécution de cette commande.

[1]: https://github.com/DataDog/datadogpy
[2]: https://app.datadoghq.com/organization-settings/api-keys