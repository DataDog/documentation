---
algolia:
  rank: 80
  tags:
  - fips
  - proxy fips
  - compliance
  - fedramp
  - govcloud
alias:
- /agent/guide/agent-fips-proxy
disable_toc: false
further_reading:
- link: agent/configuration/proxy
  tag: Documentation
  text: Configuration de l'Agent pour un proxy
- link: https://www.datadoghq.com/blog/datadog-fips-enabled-agent/
  tag: Blog
  text: Surveiller des workloads hautement régulés avec l'Agent FIPS de Datadog
title: Conformité de Datadog à la norme FIPS
---

{{< site-region region="us,us3,us5,eu,ap1" >}}
<div class="alert alert-warning">Le proxy FIPS de l'Agent Datadog est disponible uniquement pour la région US1-FED.</a></div>
{{< /site-region >}}

Le proxy FIPS de l'Agent Datadog permet de garantir l'utilisation d'un chiffrement conforme à la norme FIPS lorsque l'Agent Datadog communique avec Datadog.

Le proxy FIPS de l'Agent Datadog est un composant distribué séparément que vous déployez sur le même host que l'Agent Datadog. Le proxy fait office d'intermédiaire entre l'Agent et l'admission Datadog. L'Agent communique avec le proxy FIPS de l'Agent Datadog, qui chiffre les charges utiles au moyen d'une cryptographie validée par la norme FIPS 140-2 et transmet les charges utiles à Datadog.

## Plateformes prises en charge et limites

La conformité du proxy FIPS de l'Agent Datadog repose sur son utilisation du [certificat nº 4282 du module cryptographique][1] validé par la norme FIPS 140-2. Consultez la [stratégie de sécurité][2] associée pour en savoir plus sur les restrictions et environnements d'exploitation validés.

**Il vous incombe de veiller à la conformité de l'environnement d'exploitation avec la stratégie de sécurité et les directives générales de la norme FIPS.**

Plateformes prises en charge (64 bits, x86 uniquement) :

|||
| ---  | ----------- |
| Serveurs physiques et machines virtuelles| RHEL >= 7<br>Debian >= 8<br>Ubuntu >= 14.04|
| Cloud et conteneur| Amazon ECS<br>AWS EKS (Helm)|

**Remarque :** l'architecture arm64 est disponible en version bêta.

Produits pris en charge (Agent 7.45 ou version ultérieure) :

- Métriques
- Logs
- Traces APM
- Profils APM
- Télémétrie d'instrumentation
- Processus
- Orchestrator Explorer
- Runtime Security

Le proxy FIPS de l'Agent Datadog ne prend **pas** en charge ce qui suit :

- La surveillance sans serveur
- La communication entre l'Agent de cluster et les Agents de nœud
- Les intégrations de l'Agent
- Les communications sortantes vers tout environnement autre que GovCloud

## Prérequis

- Plage de ports TCP disponible : 9803 à 9818
- Agent Datadog 7.41 ou version ultérieure

## Installer l'Agent avec le proxy FIPS

{{< tabs >}}
{{% tab "Host ou VM" %}}

### Installer l'Agent sur un nouveau host

Pour installer l'Agent Datadog avec le proxy FIPS de l'Agent Datadog, ajoutez `DD_FIPS_MODE=1` aux instructions de l'installation en une seule étape figurant sur la page [Intégration de l'Agent Datadog][1]. Par exemple :

```shell
DD_API_KEY=<DD_API_KEY> \
DD_SITE="ddog-gov.com" \
DD_FIPS_MODE=1 \
bash -c "$(curl -L \
   https://install.datadoghq.com/scripts/install_script_agent7.sh)"
```

Définissez la variable d'environnement `DD_FIPS_MODE` pour installer le package FIPS avec l'Agent et configurer ce dernier de sorte qu'il utilise le proxy. Aucune autre étape de configuration n'est requise si vous utilisez cette méthode. Nous vous conseillons toutefois de [vérifier l'installation](#verifier-votre-installation).

### Ajouter le proxy FIPS de l'Agent Datadog à un Agent existant

Suivez les étapes ci-dessous pour ajouter le proxy FIPS de l'Agent Datadog à l'installation d'un Agent existant.

#### Installer le package du proxy FIPS de l'Agent Datadog

1. Exécutez les commandes suivantes pour installer le proxy FIPS de l'Agent Datadog :

   Debian :
   ```shell
   apt-get update && apt-get install datadog-fips-proxy
   ```
   RHEL et Fedora :
   ```shell
   yum makecache && yum install datadog-fips-proxy
   ```
   SLES :
   ```shell
   zypper refresh datadog && zypper install datadog-fips-proxy
   ```

1. La première fois que vous effectuerez une mise à niveau, copiez l'exemple de fichier de configuration et collez-le à l'emplacement adéquat, puis redémarrez le proxy. Vous n'aurez plus besoin de copier et coller ce fichier de configuration lors des mises à niveau ultérieures, sauf en cas de modifications majeures au niveau de la configuration du proxy en amont :
   ```shell
   sudo cp /etc/datadog-fips-proxy/datadog-fips-proxy.cfg.example \
      /etc/datadog-fips-proxy/datadog-fips-proxy.cfg
   sudo chown dd-agent:dd-agent \
      /etc/datadog-fips-proxy/datadog-fips-proxy.cfg
   sudo chmod 640 /etc/datadog-fips-proxy/datadog-fips-proxy.cfg
   sudo systemctl restart datadog-fips-proxy
   ```

#### Configurer l'Agent pour qu'il utilise le proxy FIPS de l'Agent Datadog

Le package du proxy FIPS de l'Agent Datadog est préconfiguré pour être utilisé avec le centre de données US1-FED. Si vous mettez à niveau un Agent Datadog existant, vous **devez** configurer l'Agent de sorte qu'il utilise le proxy.

Pour ce faire, définissez `fips.enabled` sur `true` et `fips.https` sur `false` dans le [fichier de configuration de l'Agent][2] :

```yaml
fips:
  enabled: true
  https: false
```

Le paramètre `fips` est disponible dans l'Agent 7.41 et les versions ultérieures. Lorsque ce paramètre est activé, l'Agent Datadog Agent redirige toutes ses communications vers le proxy FIPS de l'Agent Datadog pour les produits pris en charge. Les options d'URL personnalisées telles que `dd_url` sont ignorées.

L'option `https` est définie sur `false`, car l'Agent utilise le protocole HTTP pour communiquer avec le proxy. Le proxy FIPS de l'Agent Datadog s'exécute sur le même host que l'Agent et dépend donc de la sécurité de ce host pour la protection des communications.

**La sécurité du host et le renforcement des mesures de sécurité relèvent de votre responsabilité.**

<div class="alert alert-warning">Le paramètre <code>fips.enabled</code> prend la valeur <code>false</code> par défaut dans l'Agent. Il doit être défini sur <code>true</code> pour veiller à ce que toutes les communications passent par le proxy FIPS de l'Agent Datadog.<br><br><strong>Si le paramètre <code>fips.enabled</code> n'est pas défini sur <code>true</code>, l'Agent n'est pas conforme à la norme FIPS</strong>.</div>

### Vérifier votre installation

Vérifiez que les métriques, traces et logs s'affichent correctement dans l'application.

Pour les métriques, exécutez la commande de diagnostic de connectivité et vérifiez qu'aucun check n'a échoué :

```shell
sudo -u dd-agent datadog-agent diagnose --include connectivity-datadog-core-endpoints
# Pour l'Agent 7.48 et les versions antérieures, exécutez la commande suivante :
# sudo -u dd-agent datadog-agent diagnose datadog-connectivity
```

Si l'application n'affiche pas vos métriques, traces ou logs, consultez la section [Dépannage](#depannage-d-une-installation-vm-ou-physique)

### Afficher les logs

```shell
sudo journalctl -u datadog-fips-proxy
```

#### Configuration des logs journald

Si vous utilisez [Log Management][3] et souhaitez envoyer les logs du proxy FIPS de l'Agent Datadog vers Datadog, configurez l'Agent Datadog de manière à ce qu'il lise les logs depuis journald.

1. Dans le [fichier de configuration][2] de l'Agent, définissez `logs_enabled` sur `true` pour activer l'Agent de logs. Dans le [répertoire de configuration][4], créez un fichier `fips_proxy.d/conf.yaml` et ajoutez ce qui suit :

   ```yaml
   logs:
     - type: journald
       source: datadog-fips-proxy
       include_units:
         - datadog-fips-proxy.service
   ```

1. Assurez-vous que l'utilisateur `dd-agent` se trouve dans le groupe `systemd-journal`. Pour en savoir plus, consultez la documentation relative à l'[intégration journald][5].
1. [Redémarrez l'Agent][6].

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: /fr/agent/configuration/agent-configuration-files/#agent-main-configuration-file
[3]: /fr/logs/
[4]: /fr/agent/configuration/agent-configuration-files/#agent-configuration-directory
[5]: /fr/integrations/journald/#configuration
[6]: /fr/agent/configuration/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}

{{% tab "Helm sur Amazon EKS" %}}
Définissez les valeurs suivantes dans votre fichier `values.yaml` :

```yaml
fips:
  enabled: true
  use_https: false
```

Le paramètre `fips` est disponible dans l'Agent 7.41 et les versions ultérieures. S'il est activé, l'Agent Datadog redirige toutes ses communications vers le proxy FIPS de l'Agent Datadog pour les produits pris en charge. Ce paramètre ignore les options d'URL personnalisées, telles que `dd_url`.

L'option `use_https` est définie sur `false`, car l'Agent utilise le protocole HTTP pour communiquer avec le proxy. Le proxy FIPS de l'Agent Datadog s'exécute sur le même host que l'Agent Datadog et dépend donc de la sécurité de cet host pour la protection de la communication.

**La sécurité de l'host et le renforcement des mesures de sécurité relèvent de votre responsabilité.**

<div class="alert alert-warning">Le paramètre <code>fips.enabled</code> prend la valeur <code>false</code> par défaut dans l'Agent. Il doit être défini sur <code>true</code> pour veiller à ce que toutes les communications passent par le proxy FIPS de l'Agent Datadog.<br><br><strong>Si le paramètre <code>fips.enabled</code> n'est pas défini sur <code>true</code>, l'Agent n'est pas conforme à la norme FIPS</strong>.</div>


{{% /tab %}}

{{% tab "Amazon ECS" %}}

Pour découvrir comment installer le proxy FIPS sur Amazon ECS, consultez la section [Proxy FIPS pour les environnements GOVCLOUD][1].

[1]: /fr/containers/amazon_ecs/#fips-proxy-for-govcloud-environments
{{% /tab %}}

{{< /tabs >}}

## Dépanner l'installation sur un host ou une VM

Pour dépanner le proxy FIPS de l'Agent Datadog, vérifiez ce qui suit :
- L'Agent Datadog et le proxy FIPS de l'Agent Datadog s'exécutent.
- L'Agent Datadog peut communiquer avec le proxy FIPS de l'Agent Datadog.
- Le proxy FIPS de l'Agent Datadog peut communiquer avec les endpoints d'admission de Datadog.

### Vérifier le statut du proxy

Pour obtenir des informations concernant l'état du proxy FIPS de l'Agent Datadog, exécutez la commande suivante :

```shell
sudo systemctl status datadog-fips-proxy
```

Si le proxy est en cours d'exécution, vous devriez obtenir un résultat similaire à ce qui suit :
```text
- datadog-fips-proxy.service - Datadog FIPS Proxy
  Loaded: loaded
    (/lib/systemd/system/datadog-fips-proxy.service;
      enabled; vendor preset: enabled)
  Active: active (running) since Tue 2022-07-19 16:21:15 UTC; 1min 6s ago
```

Si le statut du proxy indique `inactive (dead)`, lancez le proxy FIPS de l'Agent Datadog :

```shell
sudo systemctl start datadog-fips-proxy
```

Si le statut du proxy indique `failed`, il se peut qu'une erreur empêche le lancement du proxy FIPS de l'Agent Datadog. Exécutez la commande suivante et analysez les logs du proxy pour voir s'ils comportent des erreurs :

```shell
sudo journalctl -u datadog-fips-proxy --no-pager
```

### Échec de liaison d'un socket par le proxy

Si les logs du proxy comportent une erreur de type `bind socket`, cela signifie que le proxy tente d'utiliser un port qui est déjà utilisé sur l'host. Le proxy FIPS de l'Agent Datadog utilise une plage de ports TCP comprise entre 9803 et 9818. Les ports compris dans cette plage doivent être disponibles sur l'host et ne peuvent pas être utilisés par d'autres services.

Dans l'exemple qui suit, le proxy FIPS de l'Agent Datadog n'est pas en mesure de lier un socket sur le port `9804`, car ce dernier est déjà utilisé :

```text
[ALERT] (4518) : Starting frontend metrics-forwarder: cannot bind socket (Address already in use) [0.0.0.0:9804]
[ALERT] (4518) : [/opt/datadog-fips-proxy/embedded/sbin/haproxy.main()] Some protocols failed to start their listeners! Exiting.
```

### Échec de la connexion de l'Agent au proxy

Pour rechercher des problèmes de réseau, consultez les logs dans `/var/log/datadog/agent.log`, ou exécutez la commande suivante :

```shell
datadog-agent diagnose --include connectivity-datadog-core-endpoints
# Pour l'Agent 7.48 et les versions antérieures, exécutez la commande suivante :
# datadog-agent diagnose datadog-connectivity
```

Recherchez des erreurs telles que :
```text
connect: connection refused, context deadline exceeded (Client.Timeout exceeded while awaiting headers), or connection reset by peer
```

- Suivez les étapes décrites dans la section [Vérifier le statut du proxy](#verifier-le-statut-du-proxy) pour vérifier que le proxy FIPS de l'Agent Datadog est bien en cours d'exécution.
- Vérifiez que la plage de ports du proxy correspond à celle de l'Agent.

Si le proxy s'exécute et que la plage de ports est correcte, il se peut qu'un pare-feu local sur la machine empêche l'Agent d'accéder au proxy. Configurez votre pare-feu afin qu'il autorise les connexions aux ports TCP compris entre 9804 et 9818.

Vous pouvez utiliser `curl` pour vérifier que le proxy est accessible :

```shell
curl http://localhost:9804/
```

Pour obtenir de l'aide, consultez la section [Dépannage de l'Agent][3].

### Le proxy FIPS de l'Agent Datadog ne parvient pas à se connecter à l'endpoint d'admission Datadog

En cas d'erreurs HTTP telles que `502` ou `503`, ou si le proxy renvoie une réponse vide, il se peut que le proxy FIPS de l'Agent Datadog ne puisse pas transmettre le trafic vers le backend Datadog.

Vérifiez les logs du proxy FIPS de l'Agent Datadog avec la commande suivante :

```shell
sudo journalctl -u datadog-fips-proxy --no-pager
```

Recherchez des erreurs dans les logs, comme :

```text
haproxy[292759]: [WARNING] (292759) : Server
datadog-api/mothership3 is DOWN, reason: Layer4 timeout, vcheck duration: 2000ms. 0 active and 0 backup servers left. 0 sessions active, 0 requeued, 0 remaining in queue.
[ALERT] (292759) : backend 'datadog-api' has no server available!
```

ou

```text
haproxy[1808]: [WARNING] (1808) : Server
datadog-metrics/mothership2 is DOWN, reason: Layer4
connection problem, info: "Connection refused", check duration: 0ms. 0 active and 0 backup servers left. 0
sessions active, 0 requeued, 0 remaining in queue.
haproxy[1808]: [ALERT] (1808) : backend 'datadog-metrics' has no server available!
```

Ces erreurs indiquent que le proxy FIPS de l'Agent Datadog ne parvient pas à contacter les systèmes backend, probablement parce qu'il est bloqué par un pare-feu ou en raison d'un autre problème de réseau. Le proxy FIPS de l'Agent Datadog doit pouvoir accéder aux endpoints d'admission Datadog via Internet. Trouvez les adresses IP pour ces endpoints [via l'API][4].

Pour en savoir plus sur les connexions sortantes provenant de l'Agent, consultez le guide [Trafic réseau][5].

Si vous n'avez toujours pas résolu votre problème, contactez l'[assistance Datadog][6].

## Questions fréquentes

**1. L'Agent Datadog et le proxy FIPS de l'Agent Datadog doivent-ils être sur le même host ?**

Oui, vous ne serez plus conforme à la norme FIPS si le proxy FIPS de l'Agent Datadog et l'Agent Datadog ne sont pas sur le même réseau.
Vous ne maintiendrez pas non plus la conformité si l'option `fips.enabled` n'est pas définie sur `true` dans `datadog.yaml`.

**2. Qui est tenu de renforcer la sécurité de l'host ?**

En tant que client Datadog, vous êtes responsable de la sécurité du host et de la mise en œuvre de mesures renforcées.

**3. Les images du proxy FIPS de l'Agent Datadog font-elles l'objet d'une sécurité renforcée ?**

Bien que la sécurité ait fait l'objet d'une attention toute particulière lors la création des images fournies, ces dernières n'ont pas été évaluées sur la base des recommandations des benchmarks CIS ou des normes DISA STIG.

**4. Le proxy FIPS sécurise-t-il toutes les communications entrantes et sortantes de l'Agent ?**

Le proxy FIPS de l'Agent Datadog sécurise uniquement les communications provenant de l'Agent et ciblant les endpoints de l'API d'admission Datadog. Autrement dit, cette solution ne peut pas assurer la conformité des autres formes de communication réceptionnées par l'Agent ou provenant de celui-ci à la norme FIPS.

**5. Le proxy FIPS sécurise-t-il toutes les communications entre l'Agent de cluster et les Agents de nœud ?**

Le proxy FIPS de l'Agent Datadog sécurise uniquement les communications provenant de l'Agent de cluster et ciblant les endpoints de l'API d'admission Datadog. Autrement dit, cette solution ne peut pas assurer la conformité des autres formes de communication réceptionnées par l'Agent de cluster ou provenant de celui-ci à la norme FIPS.

**6. La conformité à la norme FIPS est-elle maintenue en cas de modification du build ou de la configuration du proxy FIPS de l'Agent Datadog pour qu'il réponde à nos besoins en matière de déploiement ou de test ?**

Bien qu'il soit possible, d'un point de vue purement technique, de modifier ou de reconfigurer le proxy FIPS de l'Agent Datadog, Datadog ne peut garantir la conformité à la norme  FIPS si le proxy FIPS de l'Agent Datadog n'est pas utilisé tel qu'expliqué dans la documentation.

**7. Bien que je n'aie pas suivi toutes les étapes d'installation décrites ci-dessus, mon Agent Datadog envoie correctement les données. Ma configuration est-elle conforme à la norme FIPS ?**

Datadog ne peut garantir la conformité à la norme FIPS si le proxy FIPS de l'Agent Datadog n'est pas utilisé tel qu'expliqué dans la documentation.
Pour que votre configuration soit opérationnelle, vous devez d'une part définir l'option `fips.enabled` pour que votre Agent Datadog puisse communiquer avec le proxy FIPS de l'Agent Datadog, et d'autre part faire en sorte que le proxy FIPS de l'Agent Datadog s'exécute.

**8. Les numéros de version de l'Agent Datadog sont-ils liés aux numéros de version du proxy FIPS de l'Agent Datadog ?**

Non, les numéros de version du proxy FIPS de l'Agent Datadog sont distincts de ceux de l'Agent Datadog. Utilisez les versions les plus récentes de l'Agent Datadog et du proxy FIPS de l'Agent Datadog pour que tous les produits disponibles soient pris en charge par l'Agent Datadog et le proxy FIPS de l'Agent Datadog.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://csrc.nist.gov/projects/cryptographic-module-validation-program/certificate/4282
[2]: https://csrc.nist.gov/CSRC/media/projects/cryptographic-module-validation-program/documents/security-policies/140sp4282.pdf
[3]: /fr/agent/troubleshooting/
[4]: https://ip-ranges.ddog-gov.com/
[5]: /fr/agent/configuration/network/#destinations
[6]: /fr/help/