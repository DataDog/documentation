---
title: Release Notes
---

<% rn = sorted_release_notes %>
<% rn.each do |r| %>
  <% unless r.identifier == "/relnotes/" %>

[<%= r[:title] %>](<%= r.identifier %>)

  <% end %>
<% end%>
