---
title: Comment transformer un Timeboard en un Screenboard ou vice versa?
kind: faq
---

Pour transformer un Timeboard en un Screenboard utilisez [ce script](https://github.com/DataDog/Miscellany/blob/master/dashconverter.py).

L'utilisation est très simple, vous fournissez l'ID dashboard que vous voulez convertir, et la sortie est l'URL du dashboard converti.

Cela s'appuie sur l'API get et post pout mes [TimeBoards](/api/#timeboards) et les [ScreenBoards](/api/#screenboards). 

Tout d'abord, récupérer l'ID du dashboard, vous pouvez le trouver dans l'URL du dashboard

{{< img src="graphing/dashboards/faq/id_dashboard.png" alt="ID dashboard" responsive="true" popup="true">}}

Ici l'ID est 66234

Une fois que vous avez l'ID, utilisez le script comme suit:

```
python dashconverter.py dashboard_ID 
```

Cela détecte automatiquement si vous avez utilisé l'id un Screenboard ou un Timeboard et le convertir à l'autre.

Note: Comme les widgets disponibles sur les deux types de dashboards sont différents, vous avez une liste de widgets qui ne sont pas convertis, cette liste comprend:

```
['free_text','alert_value','check_status','event_timeline','event_stream','image','note','alert_graph','iframe']
```

Parce que les widgets des Screenboards ont des fenêtres temporelles individuelles, lors de la conversion d'un Timeboard en Screenboard, tous les widgets sont définis sur 4h. Cela peut être changé avec l'horizon temporel. En outre, la taille des widgets est définie à la taille par défaut, vous pouvez modifier cela avec les variables hauteur et largeur.

Vous devez entrer vos clés API et d'application (APP) dans le script pour que cela fonctionne.

Un cas d'utilisation concret pour cela est de transformer ceci:

{{< img src="graphing/dashboards/faq/screenboard_1.png" alt="screenboard 1" responsive="true" popup="true">}}

en

{{< img src="graphing/dashboards/faq/timeboard_1.gif" alt="timeboard 1" responsive="true" popup="true">}}

Ou avec ce qui suit:

{{< img src="graphing/dashboards/faq/example_1.png" alt="example 1" responsive="true" popup="true">}}

transforme ceci:

{{< img src="graphing/dashboards/faq/timeboard_2.gif" alt="timeboard 2" responsive="true" popup="true">}}

en cela

{{< img src="graphing/dashboards/faq/screenboard_2.gif" alt="screenboard 2" responsive="true" popup="true">}}

Ensuite, vous aurez la possibilité de supprimer le dashboard d'origine.

Note: Si vous clonez un OTB dashboard, certains widgets peuvent avoir un ancien format qui ne respecte pas le code. Vous verrez alors un avertissement dans la sortie du script et le widget obsolète ne sera pas converti.
Si vous voulez éviter cela, il suffit d'ouvrir le widget obsolète (le titre est donné dans l'avertissement) et enregistrez-le (pas besoin de modifier quoi que ce soit).
Ensuite, exécutez le script à nouveau. Même si vous aviez plusieurs avertissements, mettre à jour un des widgets obsolètes devrait suffire à tous les régler.
Si vous voyez cet avertissement, et que vous souhaitez convertir tout le dashboard, ne le supprimez pas tout de suite, assurez-vous qu'il est correctement mis à jour en premier.