---
title: Comment fusionner des Screenboards ?
kind: faq
---

Si vous voulez fusionner des Screenboards ensemble, vous devrez d'abord obtenir l'ID de chacun d'entre eux (L'ID peut être trouvé dans l'URL des tableaux de bord).

Ensuite, utilisez [ce script](https://github.com/DataDog/Miscellany/blob/master/merge_screenboards.py), il repose sur l'utilisation de l'API  [get](/api/#screenboards-get) et [push](/api/#screenboards-post) des Screenboards.

L'utilisation est très simple, exécutez ce qui suit:
```
python merge_screenboard.py [screenboard1,screenboard2...,screenboardN] 
orientation
```

**orientation** est un nombre, vous pouvez sélectionner 0 si vous voulez que vos tableaux de bord soient fusionnés verticalement ou 1 si vous les voulez fusionnés horizontalement.

Par défaut, les Template variables sont ajoutées uniquement au nouveau dashboard, mais vous pouvez en ajouter de nouvelles directement dans le code dans le dict_tem_var. (Des exemples sont listés ci-dessous comme commentaires).

Par défaut, le titre est "Merged Screenboard" mais vous pouvez le changer dans la variable titre.

La sortie du script sera l'URL de votre Screenboard fusionné.

Note: Vous pouvez fusionner les dashboards d'intégration, mais vous devez d'abord les cloner pour pouvoir avoir un ID.

Vous devez entrer vos clés API et d'application (APP) dans le script pour que cela fonctionne.