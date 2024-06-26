---
dependencies:
- https://github.com/ansible-collections/Datadog/blob/main/README.md
title: Ansible
---
## Información general

La colección Ansible de Datadog, `datadog.dd`, es la colección oficial de contenido de Datadog relacionado con Ansible. Por el momento, solo contiene el [rol de Ansible Datadog](https://github.com/DataDog/ansible-datadog/). Se puede acceder a este rol como `datadog.dd.agent`, lo que permite instalar y configurar el Datadog Agent y las integraciones. La versión 7 del Agent se encuentra instalada por defecto.

## Python

### Requisitos

- Requiere Ansible 2.10 o una versión posterior.
- Compatible con la mayoría de las distribuciones de Linux basadas en RHEL, SUSE y Debian, con macOS y Windows.
- Cuando se utiliza para gestionar hosts de Windows, requiere que la colección `ansible.windows` se encuentre instalada:

  ```shell
  ansible-galaxy collection install ansible.windows
  ```
- Cuando se utiliza para gestionar hosts de openSUSE/SLES, requiere que la colección `community.general` se encuentre instalada:

  ```shell
  ansible-galaxy collection install community.general
  ```

### Sensitive Data Scanner

Para instalar desde Ansible Galaxy, ejecuta:

```shell
ansible-galaxy collection install datadog.dd
```

La colección Ansible de Datadog también se encuentra disponible a través de [Red Hat Automation Hub](https://console.redhat.com/ansible/automation-hub/repo/published/datadog/dd/), donde está certificada oficialmente por Red Hat.

### API

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

Nota para los usuarios que instalen la colección a través de Ansible Automation Hub: la funcionalidad de OpenSUSE/SLES depende de una colección de la comunidad `community.general`. El equipo de asistencia de Red Hat no ofrece soporte para ningún problema relacionado con el contenido de la comunidad. Por lo tanto, todos los problemas de soporte de OpenSUSE/SLES se deben dirigir al equipo de asistencia de Datadog.

### Lista de roles de la colección

- `datadog.dd.agent`: instalación y configuración del Datadog Agent.
  - Consulta [la documentación oficial del rol](https://docs.datadoghq.com/agent/guide/ansible_standalone_role/#setup).
  - Consulta [el repositorio del rol independiente](https://github.com/DataDog/ansible-datadog#readme).

## Leer más

Más enlaces, artículos y documentación útiles:

- [Automatiza la instalación del Agent con la colección Ansible de Datadog](https://www.datadoghq.com/blog/datadog-ansible-collection/)