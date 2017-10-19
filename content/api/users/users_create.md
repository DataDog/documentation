---
title: Create User
type: apicontent
order: 16.1
---

## Create User
##### ARGUMENTS

<ul class="arguments">
    {{< argument name="handle" description="The user handle, must be a valid email." >}}
    {{< argument name="name" description="The name of the user." default="None" >}}
    {{< argument name="access_role" description="The access role of the user. Choose from <code>'st'</code> (standard user), <code>'adm'</code> (admin user), or <code>'ro'</code> (read-only user). <em>Note: users can be created with admin access role only with application keys belonging to administrators.</em>" default="st" >}}
</ul>
