---
title: Update User
type: apicontent
order: 16.4
---

## Update User
Can only be used with application keys belonging to administrators.

##### ARGUMENTS
<ul class="arguments">
    {{< argument name="handle" description="The handle of the user." >}}
    {{< argument name="name" description="The new name of the user." default="None" >}}
    {{< argument name="email" description="The new email of the user." default="None" >}}
    {{< argument name="disabled" description="The new disabled status of the user." default="None" >}}
    {{< argument name="access_role" description="The new access role of the user. Choose from <code>'st'</code> (standard user), <code>'adm'</code> (admin user), or <code>'ro'</code> (read-only user)." default="st" >}}
</ul>
