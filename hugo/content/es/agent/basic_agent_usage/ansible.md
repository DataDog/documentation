---
dependencies:
- https://github.com/ansible-collections/Datadog/blob/main/README.md
title: Ansible
---
## Descripción

La colección de Ansible en Datadog, `datadog.dd`, es la colección oficial de contenidos de Datadog relacionados con Ansible. Contiene el [rol Datadog Ansible](https://github.com/DataDog/ansible-datadog/), al que se puede acceder como `datadog.dd.agent`, lo que te permite instalar y configurar el Datadog Agent y sus integraciones. El Agent versión 7 está instalado por defecto.

## Requisitos

- Ansible v2.10 o posterior.
- Compatible con la mayoría de las distribuciones de Linux basadas en RHEL, SUSE y Debian, con macOS y Windows.
- Para gestionar hosts de Windows, instala la colección `ansible.windows`:

  ```shell
  ansible-galaxy collection install ansible.windows
  ```
- Cuando gestiones hosts openSUSE/SLES, instala la colección `community.general`:

  ```shell
  ansible-galaxy collection install community.general
  ```

## Instalación

Para utilizar esta colección, debes instalarla utilizando la herramienta de línea de comandos Ansible Galaxy:

```
ansible-galaxy collection install datadog.dd
```

Como alternativa, inclúyela en un archivo `requirements.yml` e instálala con `ansible-galaxy collection install -r requirements.yml`. Incluye lo siguiente en `requirments.yml`:


```yaml
collections:
  - name: datadog.dd
```

**Nota**: Si instalas la colección desde Ansible Galaxy, no se actualizará automáticamente cuando se actualice el paquete Ansible. 
Para actualizar la colección a la última versión disponible, ejecuta el siguiente comando:

```
ansible-galaxy collection install datadog.dd --upgrade
```

Puedes instalar una versión específica de la colección, por ejemplo, si necesitas volver a una versión anterior cuando hay errores en la última versión (infórmanos cualquier problema en este repositorio). La siguiente sintaxis muestra cómo instalar la versión 5.0.0:

```
ansible-galaxy collection install datadog.dd:==5.0.0
```

Para obtener más detalles, consulta el [uso de colecciones de Ansible](https://docs.ansible.com/ansible/devel/user_guide/collections_using.html).

La colección Ansible en Datadog también se encuentra disponible a través de [Red Hat Automation Hub](https://console.redhat.com/ansible/automation-hub/repo/published/datadog/dd/), donde está certificada oficialmente por Red Hat.

## Casos de uso

Para desplegar el Datadog Agent en hosts, añade el rol de Datadog y tu clave de API a tu cuaderno de estrategias:

```yaml
- hosts: servers
  tasks:
    - name: Import the Datadog Agent role from the Datadog collection
      import_role:
        name: datadog.dd.agent
  vars:
    datadog_api_key: "<YOUR_DD_API_KEY>"
```

**Nota**: Si instalas la colección a través del Ansible Automation Hub, la funcionalidad openSUSE/SLES dependerá de una colección de la comunidad `community.general`. Red Hat no ofrece asistencia para problemas relacionados con contenidos de la comunidad. En caso de problemas de soporte para OpenSUSE/SLES, ponte en contacto con el [servicio de asistencia de Datadog][1].


## Tests

La colección de Datadog se ha probado en CentOS, Debian, Rocky Linux, openSUSE, Windows y macOS. Los tests se ejecutan con la última versión de `ansible-lint` y los checks de estado con Python v3.9 a Python v3.12.

## Soporte

Si necesitas ayuda, puedes crear un ticket en el repositorio GitHub de `ansible-collections` o puedes ponerte en contacto con el [servicio de asistencia de Datadog][1].

## Notas de publicación

Puedes seguir los cambios en el archivo [CHANGELOG][2].

## Leer más

- [Automatización de la instalación del Agent con la colección de Ansible en Datadog][6]
- Rol de la colección: `datadog.dd.agent`: Instalación y configuración del Datadog Agent.
  - Consulta [la documentación oficial del rol][3].
  - Consulta [el repositorio del rol independiente][4].

## Información sobre la licencia

La colección de Ansible en Datadog se publica bajo [Apache License 2.0][5].

[1]: https://docs.datadoghq.com/es/help/
[2]: https://github.com/ansible-collections/Datadog/blob/main/CHANGELOG.rst
[3]: https://docs.datadoghq.com/es/agent/guide/ansible_standalone_role/#setup
[4]: https://github.com/DataDog/ansible-datadog#readme
[5]: https://github.com/ansible-collections/Datadog/blob/main/LICENSE
[6]: https://www.datadoghq.com/blog/datadog-ansible-collection/