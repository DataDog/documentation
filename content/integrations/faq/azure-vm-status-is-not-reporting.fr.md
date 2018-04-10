---
title: Le statut de la machine virtuelle Azure n'est pas reporté.
kind: faq
---

Les machines virtuelles Azure surveillées par Datadog envoie une métrique azure.vm.status qui détermine si la machine est en cours d'exécution ou non.

Si vous avez des ordinateurs virtuels qui ne signalent pas azure.vm.status, mais qui signalent avec succès des mesures de performances (c.-à-d. Utilisation du processeur, données réseau, etc.), il est probable que votre abonnement Azure doit enregistrer le fournisseur Azure Resource Health .

Cela est très facile avec l'interface en ligne de commande Azure.

Ouvrez un terminal et suivez les commandes ci-dessous. Après l'exécution de la connexion azure, connectez-vous à l'utilisateur Azure associé à votre compte Datadog.
```
azure login
azure config mode arm
azure provider register Microsoft.ResourceHealth
```

Et c'est tout. La métrique azure.vm.status devrait commencer à reporter à Datadog en 5 à 10 minutes.



