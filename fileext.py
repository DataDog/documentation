import os,sys
folder = 'content/ja/guides/basic_agent_usage'
for filename in os.listdir(folder):
       infilename = os.path.join(folder,filename)
       if not os.path.isfile(infilename): continue
       oldbase = os.path.splitext(filename)
       newname = infilename.replace('.md', '.ja.md')
       output = os.rename(infilename, newname)
