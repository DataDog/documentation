---
title: Comment fusionner des Screenboards ?
kind: faq
---

Si vous voulez fusionner des Screenboards ensemble, vous devrez d'abord obtenir l'ID de chacun d'entre eux (L'ID peut être trouvé dans l'URL des tableaux de bord).

Ensuite, utilisez [ce script][1] il repose sur l'utilisation de l'API [get][2] et [push][3] des Screenboards.

L'utilisation est très simple, exécutez ce qui suit:
```
python merge_screenboard.py [screenboard1,screenboard2...,screenboardN] 
orientation
```

**orientation** est un nombre, vous pouvez sélectionner 0 si vous voulez que vos dashboards soient fusionnés verticalement ou 1 si vous les voulez horizontalement.

Par défaut, les Template variables sont ajoutées uniquement au nouveau dashboard, mais vous pouvez en ajouter de nouvelles directement dans le code dans le dict_tem_var. (Des exemples sont listés ci-dessous comme commentaires).

Par défaut, le titre est "Merged Screenboard" mais vous pouvez le changer dans la variable titre.

La sortie du script sera l'URL de votre Screenboard fusionné.

Note: Vous pouvez fusionner des dashboards d'intégration, mais vous devez d'abord les cloner pour pouvoir avoir un ID.

Vous devez entrer vos clés API et d'application (APP) dans le script pour que cela fonctionne.

[1]: https://github.com/DataDog/Miscellany/blob/master/merge_screenboards.py
[2]: /api/#screenboards-get
[3]: /api/#screenboards-post
