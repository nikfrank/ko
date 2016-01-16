ko is a project generator written in bash

the name comes from the game of go, where ko is a rule
which disallows infinite repitions. I like that name for this.


I use bash to copy files around and replace parts of them

so why would I write an automator for that in bad OO js?

and why would I require user interaction in an automator?


these are just a few problems I have with current solutions.


---

we want to be able to set constants in our project

and then use those constants to render files (one dir at a time usually)

into our project


first step:

a generator with a dir structure of

package.json
/:command/{package.json, sourcefile.template.*}


would allow us to issue the commands

ko command subcommand cli-param --option

where options are listed in the package.json[ko]

ie

ko directive ko-table-paginator ko

which would make a directive called ko-table-paginator in components/ko/

((the generator command has ./components as a default directory))

---

later

also commands can have nicknames which are lazier to type

ko d ko-table-paginator ko

and maybe a smart generator would use the namespace to place the files!

---

this first generator I'm writing is for angular es6

and the rendering will be done by bash itself

frankly, anything more would be overkill.