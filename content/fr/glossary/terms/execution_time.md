---
core_product:
- apm
title: temps d'exécution
---
Dans lʼAPM, le temps dʼexécution est le temps total pendant lequel une span est considérée comme active, c.-à-d. qu'elle n'attend pas la finalisation d'une span enfant.

La durée d'exécution est calculée à partir de la durée d'activité d'une span (à savoir, lorsqu'elle n'a aucune span enfant). Pour les tâches qui ne sont pas simultanées, ce calcul est relativement simple. Dans l'image suivante, la durée d'exécution de la span 1 est calculé comme suit : $\D1 + \D2 + \D3$. La durée d'exécution des spans 2 et 3 correspond à leur largeur respective.

{{< img src="tracing/visualization/execution-time1.png" style="width:50%;" alt="Durée d'exécution" >}}

Lorsque des spans enfant sont exécutées simultanément, la durée d'exécution est obtenue en divisant le temps partagé entre plusieurs spans par le nombre de spans simultanément actives. Dans l'image suivante, les spans 2 et 3 sont exécutées simultanément (elles sont toutes les deux les spans enfant de la span 1) et les durées se chevauchent donc. Ainsi, la durée d'exécution de la span 2 est égale à $\D2 ÷ 2 + \D3$, tandis que celle de la span 3 est égale à $\D2 ÷ 2$.  

{{< img src="tracing/visualization/execution-time2.png" style="width:50%;" alt="Durée d'exécution pour les tâches simultanées" >}}