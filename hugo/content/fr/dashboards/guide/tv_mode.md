---
description: Affichez les dashboards sur de grands écrans ou des téléviseurs pour
  présenter les métriques clés de performance pour la visibilité et la surveillance
  de l'équipe.
further_reading:
- link: /dashboards/configure/
  tag: Documentation
  text: En savoir plus sur la configuration des dashboards
title: Utiliser le mode TV pour les dashboards
---

## Présentation

Le mode TV est conçu pour afficher les dashboards Datadog sur de grands écrans en garantissant que tous les widgets sont visibles sans nécessiter de défilement. Ce guide fournit des instructions détaillées sur la configuration d'un dashboard pour le mode TV, présente les limitations à connaître et propose des solutions pour un affichage optimal.

## Configurer votre dashboard pour le mode TV

Pour vous assurer que votre dashboard s'affiche correctement sur un téléviseur, suivez ces étapes :
1. **Concevoir votre dashboard** : Commencez par créer votre dashboard dans Datadog. Concentrez-vous sur l'arrangement de vos widgets dans la disposition en grille de 12 colonnes utilisée par les dashboards Datadog. Gardez à l'esprit que le ratio d'aspect de vos widgets et du dashboard global affecte la façon dont ils sont affichés en mode TV. 
2. **Activer le mode TV** : Lorsque votre dashboard est prêt, activez le mode TV. Faites-le pendant que votre écran est connecté au téléviseur et en mode plein écran. Cette étape garantit que le dashboard s'ajuste automatiquement pour s'adapter à l'écran du téléviseur sans nécessiter de redimensionnement manuel.  
    {{< img src="/dashboards/guide/tv_mode/tv_mode_config_option.png" alt="Activer l'option de mode TV via le menu Configure du dashboard" style="width:100%;" >}} 
3. **Optimiser les paramètres d'affichage** : Si le contenu de votre dashboard ne remplit pas les bords de l'écran, vous pouvez simuler un grand écran en effectuant un zoom avant ou arrière. Utilisez les raccourcis clavier pour ajuster l'affichage du navigateur avant de réactiver le mode TV, `CMD/CTRL + +(plus)` pour zoomer et `CMD/CTRL + -(moins)` pour dézoomer. **Remarque** : cette solution présente des inconvénients en termes de lisibilité ; elle peut rendre certaines polices plus petites et difficiles à lire à distance.

## Comprendre les limitations du mode TV

Bien que le mode TV offre un moyen pratique d'afficher les dashboards, il existe certaines limitations et considérations :
- **Restriction de la grille de 12 colonnes** : Les dashboards en mode TV adhèrent à une grille fixe de 12 colonnes. Cela peut limiter la flexibilité pour étirer le contenu afin de remplir toute la largeur de l'écran. En mode haute densité, le dashboard est divisé en deux grilles de 12 colonnes, et plus de widgets étendront le dashboard verticalement.
- **Contraintes de ratio d'aspect** : Le mode TV réduit le dashboard pour que tout tienne à l'écran sans défilement, ce qui signifie un ratio d'aspect imposé. Si la hauteur et la largeur du dashboard sont disproportionnées, cela peut entraîner des espaces blancs sur les bords et les widgets peuvent apparaître minimisés (zoom arrière). Pour minimiser cela, concevez votre dashboard avec un ratio d'aspect qui correspond étroitement à l'affichage de votre téléviseur.  
- **Centrage du contenu** : Le contenu peut être centré sur l'écran plutôt que de s'étendre jusqu'aux bords. Ce comportement est souvent dû au système de grille fixe et au ratio d'aspect. Pour un dashboard qui utilise pleinement la largeur de l'écran, envisagez de passer à un screenboard, qui permet un contrôle plus fin du positionnement des widgets.

## Solutions alternatives et recommandations

Si les contraintes de la grille de 12 colonnes rendent difficile l'obtention de la disposition souhaitée en mode TV, envisagez les alternatives suivantes :  
- **Screenboards pour plus de flexibilité** : Contrairement aux dashboards, les screenboards offrent un positionnement au pixel près, vous permettant de créer une disposition qui s'adapte mieux au ratio d'aspect de votre téléviseur. Cela peut aider à éliminer les espaces blancs sur les bords et à utiliser pleinement l'espace d'écran disponible.  
- **Suivi et signalement des problèmes** : Si vous rencontrez des problèmes persistants avec le mode TV, comme un contenu qui ne s'affiche pas correctement, signalez-les comme des bugs dans Datadog. Cela aidera à suivre et potentiellement à résoudre ces limitations dans les futures mises à jour. 

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}