<%
import os

h2 = "##"
h3 = '###'

branch = os.environ["branch"]
%>

${h2} Preview links (active after the `build_preview` check completes)

% if added:
${h3} New or renamed files
% for filename in added:
* https://docs-staging.datadoghq.com/${branch}/${filename}
% endfor
% endif

% if deleted:
${h3} Removed or renamed files (these should redirect)
% for filename in deleted:
* https://docs-staging.datadoghq.com/${branch}/${filename}
% endfor
% endif

% if renamed:
${h3} Renamed files
% for filename in renamed:
* https://docs-staging.datadoghq.com/${branch}/${filename}
% endfor
% endif

% if modified:
${h3} Modified Files
% for filename in modified:
* https://docs-staging.datadoghq.com/${branch}/${filename}
% endfor
% endif