---
title: Examples
kind: Documentation
---
In this section you will find examples of configurations from across the entire product. Each example may include screenshots, code, output, and/or data. If there is something missing you would like to see, let us know.

<ul>
<% tag_set(@items.select { |i| i[:kind] == "example" }).sort().each do |tag| %>
<li><a href="/examples/<%= tag.downcase %>/"><%= tag %></a> - (<%=count_tags()[tag] %>)</li>
<% end %>
</ul>
