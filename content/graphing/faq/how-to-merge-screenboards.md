---
title: How to Merge Screenboards ?
kind: faq
---

If you want to merge screenboards together, you will first have to get the ID of each of them (The ID can be found in the URL of the dashboards).

Then use the [script here](https://github.com/DataDog/Miscellany/blob/master/merge_screenboards.py), it relies on the API [get](/api/#screenboards-get) and [push](/api/#screenboards-post) for screenboards.

The usage is very simple, run the following:
```
python merge_screenboard.py [screenboard1,screenboard2...,screenboardN] 
orientation
```

**orientation** is a number, you can select 0 if you want your dashboards to be merged vertically or 1 if you want them horizontally.

By default, the template variables are added uniquely to the new dashboard, but in the code you can add new ones in the dict_tem_var. (examples are listed below as comments).

By default the title is Merged Screenboard but you can change it in the title variable.

The output of the script will be the URL of your merged screenboard.

Note: You can merge integration dashboards, but you first have to clone them so you can have an ID.

You have to enter your API and APP keys in the script for it to work.