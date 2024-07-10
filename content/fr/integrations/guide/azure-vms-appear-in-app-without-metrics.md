---
aliases:
- /fr/integrations/faq/azure-vms-are-showing-up-in-the-app-but-not-reporting-metrics

title: Les métriques des machines virtuelles Azure n'apparaissent pas dans l'application
---

Après avoir installé l'intégration Azure comme il se doit dans Datadog, vous commencerez à recevoir les métriques de vos machines virtuelles Azure et d'autres services au bout de 15 minutes environ.

Si après ce délai, vos VM Azure sont affichées dans votre liste d'infrastructures, mais qu'aucune métrique n'est transmise, procédez aux vérifications suivantes.

1. Assurez-vous de rechercher les bonnes métriques.
    Les métriques des machines virtuelles **classiques** commencent par l'espace de nommage azure.vm, tandis que celles déployées avec ARM commencent par l'espace de nommage `azure.compute_virtualmachines`.

2. Si aucun de ces espaces de nommage ne génère de métriques, vérifiez si l'option **Diagnostics** est activée pour les machines virtuelles dans le portail Azure. Remarque : seules les options Boot diagnostics et Basic metrics sont requises.
    * Pour les machines virtuelles **classiques** :
    {{< img src="integrations/guide/azure_vms_appearing_in_the_app_without_metrics/classic_vm.png" alt="Portail Azure affichant la vue Diagnostics d'une machine virtuelle classique dont le statut est défini sur On"  >}}

    * Pour les machines virtuelles déployées avec ARM :
    {{< img src="integrations/guide/azure_vms_appearing_in_the_app_without_metrics/arm_deployed_vm.png" alt="Portail Azure affichant la fenêtre Diagnostics settings d'une machine virtuelle dont le statut est défini sur On" >}}

3. Assurez-vous que la machine virtuelle est en cours d'exécution.
    L'intégration ne recueille aucune métrique de performance pour les machines arrêtées/désallouées. Cependant, la métrique `azure.vm.status` a pour valeur `1` si la machine est en cours d'exécution ou arrêtée (ce qui entraîne l'affichage des machines virtuelles arrêtées dans la liste des infrastructures). Le tag status associé vous permet de différencier les hosts en cours d'exécution des hosts arrêtés. Assurez-vous que le host concerné inclut le tag `status:running` et s'exécute dans le portail Azure.
    {{< img src="integrations/guide/azure_vms_appearing_in_the_app_without_metrics/azure_vm_running.png" alt="Deux graphiques de série temporelle dans l'application Datadog. Le premier représente la somme des métriques azure.vm.status avec le tag status:running, tandis que le deuxième représente la somme des métriques azure.vm.status avec le tag status:not_running"  >}}