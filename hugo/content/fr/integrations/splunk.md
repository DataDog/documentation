---
categories:
- monitoring
- notification
ddtype: crawler
dependencies: []
description: Enregistrez des événements à partir de Splunk pour les superposer sur
  des graphiques de métriques clés.
doc_link: https://docs.datadoghq.com/integrations/splunk/
draft: false
git_integration_title: splunk
has_logo: true
integration_id: ''
integration_title: Splunk
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: splunk
public_title: Intégration Datadog/Splunk
short_description: Enregistrez des événements à partir de Splunk pour les superposer
  sur des graphiques de métriques clés.
team: web-integrations
version: '1.0'
---

## Présentation

Connectez votre système de surveillance de log Splunk pour :

- Être informé de vos rapports
- Corréler ces rapports avec vos autres métriques
- Collaborer avec votre équipe sur ces événements

## Configuration

### Installation

Pour recevoir vos rapports Splunk dans Datadog, la bibliothèque Python `datadog` doit être installée sur votre serveur Splunk :

```bash
pip install datadog
```

Ensuite, [obtenez votre clé d'API et une clé d'application][1] et ajoutez le script `dog-splunk.sh` suivant dans \$SPLUNK_HOME/bin/scripts

```bash

export API_KEY=VOTRECLÉAPI
export APP_KEY=VOTRECLÉAPI

dog --api-key $API_KEY --application-key $APP_KEY event post \
"Found $SPLUNK_ARG_1 events in splunk" \
"Matching $SPLUNK_ARG_2 based on $SPLUNK_ARG_5," \
" from report $SPLUNK_ARG_4. More details at $SPLUNK_ARG_6." \
 --aggregation_key $SPLUNK_ARG_3 --type splunk
```

Assurez-vous que l'utilisateur et le groupe `splunk` peuvent exécuter le script et qu'ils sont définis comme propriétaires.

Une fois le script en place, créez un rapport ou accédez à un rapport existant. Cliquez sur **Edit Schedule** et cochez la case **Schedule the Report** pour planifier un rapport. Lorsqu'apparaît l'option **Run a Script** pour exécuter un script, saisissez `dog-splunk.sh` dans la zone de texte Filename. Cliquez sur **Save** pour commencer à voir les résultats apparaître dans votre flux d'événements.

## Dépannage

Si vous voyez un code d'erreur à chaque exécution de `runshellscript` dans `splunkd.log`, essayez d'ajouter `> dog_splunk_trace.txt 2>&1` à la fin de la dernière commande. Cela crée un fichier `$SPLUNK_HOME/etc/apps/search/bin/dog_splunk_trace.txt` contenant de plus amples détails sur le problème.

Si le fichier de trace contient des explications quant à l'utilisation de la commande `dog`, suivies de `dog: error: unrecognized arguments: OR failed OR severe`, ajoutez des apostrophes autour de `\$SPLUNK_ARG_3` à la dernière ligne.

Si le fichier de trace contient un Traceback qui se termine par `pkg_resources.DistributionNotFound` ou une valeur semblable, ajoutez trois `unset` en haut de votre script `dog-splunk.sh` :

```bash
#!/bin/bash
unset PYTHONHOME
unset PYTHONPATH
unset LD_LIBRARY_PATH
export API_KEY=VOTRECLÉAPIICI
export APP_KEY=VOTRECLÉAPIICI

dog --api-key $API_KEY --application-key $APP_KEY event post \
"Found $SPLUNK_ARG_1 events in splunk" \
"Matching $SPLUNK_ARG_2 based on $SPLUNK_ARG_5," \
" from report $SPLUNK_ARG_4. More details at $SPLUNK_ARG_6." \
 --aggregation_key $SPLUNK_ARG_3 --type splunk
```

## Pour aller plus loin

### Base de connaissances

Le fichier du script utilise des variables proposées par Splunk. Si vous souhaitez personnaliser le message, consultez le tableau de variables suivant :

|                |                                                                             |
| :------------- | :-------------------------------------------------------------------------- |
| \$SPLUNK_ARG_0 | Nom du script                                                                 |
| \$SPLUNK_ARG_1 | Nombre d'événements renvoyés                                                   |
| \$SPLUNK_ARG_2 | Termes de recherche                                                                |
| \$SPLUNK_ARG_3 | Chaîne de requête complète                                                |
| \$SPLUNK_ARG_4 | Le nom de la recherche enregistrée                                                        |
| \$SPLUNK_ARG_5 | Motif du déclenchement (par exemple, « Le nombre d'événements était supérieur à 1 »)     |
| \$SPLUNK_ARG_6 | URL du navigateur pour consulter la recherche enregistrée                                        |
| \$SPLUNK_ARG_7 | _option retirée dans la version 3.6_                                             |
| \$SPLUNK_ARG_8 | Fichier dans lequel sont stockés les résultats de cette recherche (contient les résultats bruts) |

Vous pouvez modifier le texte de ces événements en utilisant par exemple le code @mention de Datadog pour informer des personnes de ces rapports.

---

_Cette documentation a été vérifiée le 28 octobre 2015 avec l'[AMI Splunk Enterprise sur AWS][2]_

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: https://aws.amazon.com/marketplace/pp/B00PUXWXNE/ref=sp_mpg_product_title?ie=UTF8&sr=0-3